// 產生「分鏡修改板」要用的素材：每一幕的資料、關鍵畫面、預覽短片。
// 用法：node build-storyboard.mjs <整支 0:00–2:40 影片.mp4> <輸出資料夾> [版本說明]
// 涵蓋兩段：intro/scenes/（0:00–0:45，intro.html）與 part2/scenes/（0:45–2:40，part2.html）
// 輸出：storyboard.json、frames/NN.jpg（960×540）、clips/NN.mp4（960×540，含音效）
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { execFileSync } from 'node:child_process';
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const [, , video, out, note = ''] = process.argv;
if (!video || !out) { console.error('用法：node build-storyboard.mjs <影片.mp4> <輸出資料夾> [版本說明]'); process.exit(1); }
fs.mkdirSync(path.join(out, 'frames'), { recursive: true });
fs.mkdirSync(path.join(out, 'clips'), { recursive: true });

const PARTS = [
  { id: 'intro', label: '0:00–0:45　開場', page: 'intro.html', start: 0, end: 45 },
  { id: 'part2', label: '0:45–2:40　為什麼問錯・第一步', page: 'part2.html', start: 45, end: 160 },
];

// 讀各幕設定（只取資料，不跑動畫）
const scenes = [];
for (const part of PARTS) {
  const dir = path.join(here, part.id, 'scenes');
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
    vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { Intro: { scene: d => scenes.push({ ...d, file: `${part.id}/scenes/${f}`, part: part.id }) } });
}
scenes.sort((a, b) => a.start - b.start);

// 關鍵畫面：直接從各段的動畫頁截圖（半解析度）
const b = await chromium.launch();
for (const part of PARTS) {
  const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: .5 });
  await p.goto('file://' + path.join(here, part.page));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(500);
  for (const s of scenes.filter(s => s.part === part.id)) {
    await p.evaluate(t => seek(t), s.key);
    await p.screenshot({ path: path.join(out, 'frames', s.id + '.jpg'), type: 'jpeg', quality: 86 });
  }
  await p.close();
}
await b.close();

// 預覽短片：從成品影片切出每一幕
for (const s of scenes)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(s.start), '-to', String(s.end), '-i', video,
    '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
    path.join(out, 'clips', s.id + '.mp4')]);

const prev = fs.existsSync(path.join(out, 'storyboard.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'storyboard.json'))) : null;
const data = {
  version: (prev?.version || 0) + 1,
  updatedAt: new Date().toISOString(),
  note,
  parts: PARTS.map(({ id, label, start, end }) => ({ id, label, start, end })),
  scenes: scenes.map(({ id, title, start, end, narration, visuals, motions, sfx = [], file, part }) =>
    ({ id, title, start, end, file, part, sfx: sfx.map(([t, kind, label]) => `${t.toFixed(1)} 秒｜${label}`), narration: narration.map(n => n[2]).join(''), narrationTimes: narration, visuals, motions })),
};
fs.writeFileSync(path.join(out, 'storyboard.json'), JSON.stringify(data, null, 1));
// 分鏡頁：把資料直接寫進頁面，打開就是完整內容
const tpl = fs.readFileSync(path.join(here, 'storyboard.template.html'), 'utf8');
fs.writeFileSync(path.join(out, 'index.html'), tpl.replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c')));
console.log(`分鏡資料 v${data.version}：${scenes.length} 幕 → ${out}`);
