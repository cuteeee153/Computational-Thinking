// 產生「分鏡修改板」要用的素材：每一幕的資料、關鍵畫面、預覽短片。
// 用法：node build-storyboard.mjs <整支影片.mp4> <輸出資料夾> [版本說明]
// 涵蓋四段動畫頁：intro、part2、part3、part4（品種對照表，影片裡插在幕 23 和 23b 之間），各自的 .html
// （分鏡板依影片順序分組；每一幕的秒數都是成片時間）
// 輸出：storyboard.json、frames/NN.jpg（960×540）、clips/NN.mp4（960×540，有聲音的段落含旁白、音效、音樂）
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { W, NARR } from './timing/timing.mjs';
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const [, , video, out, note = ''] = process.argv;
if (!video || !out) { console.error('用法：node build-storyboard.mjs <影片.mp4> <輸出資料夾> [版本說明]'); process.exit(1); }
fs.mkdirSync(path.join(out, 'frames'), { recursive: true });
fs.mkdirSync(path.join(out, 'clips'), { recursive: true });

// 各段的動畫頁（設計時間）
const PARTS = [
  { id: 'intro', page: 'intro.html', start: 0, end: 45 },
  { id: 'part2', page: 'part2.html', start: 45, end: 160 },
  { id: 'part3', page: 'part3.html', start: 160, end: 244.9 },
  { id: 'part4', page: 'part4.html', start: 245, end: 291.833 },
];
// 分鏡板上的分組：照影片裡的順序（品種對照表 part4 插在幕 23 和 23b 之間）；設計時間範圍 → 標題
const GROUPS = [
  { id: 'intro', title: '開場', start: 0, end: 45 },
  { id: 'part2', title: '為什麼問錯・第一步', start: 45, end: 112.0 },
  { id: 'breeds', title: '品種對照表', start: 245, end: 291.833 },
  { id: 'part2b', title: '第一步（續）', start: 112.01, end: 160 },
  { id: 'part3', title: '第二步・第三步', start: 160, end: 244.9 },
];
const fmtM = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

// 讀各幕設定（只取資料，不跑動畫）
const scenes = [];
// 同一段的各幕在同一個環境裡依序執行（後面的幕可以用前面的幕定義的函式）
const BREEDS = JSON.parse(fs.readFileSync(path.join(here, 'assets/breeds/breeds.json'), 'utf8'));
for (const part of PARTS) {
  const dir = path.join(here, part.id, 'scenes'); let cur = '';
  const ctx = vm.createContext({ BREEDS, Intro: { scene: d => scenes.push({ ...d, file: `${part.id}/scenes/${cur}`, part: part.id }) } });
  vm.runInContext(fs.readFileSync(path.join(here, 'steps.js'), 'utf8'), ctx);   // 三步驟總覽的版面函式
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort()) { cur = f; vm.runInContext(fs.readFileSync(path.join(dir, f), 'utf8'), ctx); }
}
scenes.sort((a, b) => W(a.start) - W(b.start));
const groupOf = s => GROUPS.find(g => s.start >= g.start && s.start < g.end).id;

// 關鍵畫面：直接從各段的動畫頁截圖（半解析度）
const b = await chromium.launch();
for (const part of PARTS) {
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: .5 });
  await p.goto('file://' + path.join(here, part.page));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  for (const s of scenes.filter(s => s.part === part.id)) {
    await p.evaluate(t => seek(t), W(s.key));
    await p.screenshot({ path: path.join(out, 'frames', s.id + '.jpg'), type: 'jpeg', quality: 86 });
  }
  await p.close();
}
await b.close();

// 預覽短片：從成品影片切出每一幕
for (const s of scenes)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(W(s.start)), '-to', String(W(s.end)), '-i', video,
    '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
    path.join(out, 'clips', s.id + '.mp4')]);

const prev = fs.existsSync(path.join(out, 'storyboard.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'storyboard.json'))) : null;
const data = {
  version: (prev?.version || 0) + 1,
  updatedAt: new Date().toISOString(),
  note,
  parts: GROUPS.map(({ id, title, start, end }) => ({ id, label: `${fmtM(W(start))}–${fmtM(W(end))}　${title}`, start: W(start), end: W(end) })),
  // 分鏡板上顯示的秒數一律是成片時間（動畫、音效說明開頭的「X 秒」也換算）
  scenes: scenes.map(({ id, title, start, end, visuals, motions, sfx = [], file, part }) => {
    const narr = (NARR.scenes[id] || []);
    return {
      id, title, start: +W(start).toFixed(2), end: +W(end).toFixed(2), file, part: groupOf({ start }), visuals,
      motions: motions.map(m => m.replace(/^([\d.]+) 秒/, (_, t) => `${W(+t).toFixed(1)} 秒`)),
      sfx: sfx.map(([t, kind, label]) => `${W(t).toFixed(1)} 秒｜${label}`),
      narration: narr.map(n => n[2]).join(''), narrationTimes: narr,
    };
  }),
};
fs.writeFileSync(path.join(out, 'storyboard.json'), JSON.stringify(data, null, 1));
// 分鏡頁：把資料直接寫進頁面，打開就是完整內容
const tpl = fs.readFileSync(path.join(here, 'storyboard.template.html'), 'utf8');
fs.writeFileSync(path.join(out, 'index.html'), tpl.replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c')));
console.log(`分鏡資料 v${data.version}：${scenes.length} 幕 → ${out}`);
