// 產生「分鏡修改板」要用的素材：每一幕的資料、關鍵畫面、預覽短片。
// 用法：node build-storyboard.mjs <0:00–0:45 影片.mp4> <輸出資料夾> [版本說明]
// 輸出：storyboard.json、frames/NN.jpg（960×540）、clips/NN.mp4（960×540，無聲）
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

// 讀各幕設定（只取資料，不跑動畫）
const scenes = [];
const dir = path.join(here, 'intro/scenes');
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
  vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { Intro: { scene: d => scenes.push({ ...d, file: f }) } });
scenes.sort((a, b) => a.start - b.start);

// 關鍵畫面：直接從動畫頁截圖（半解析度）
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: .5 });
await p.goto('file://' + path.join(here, 'intro.html'));
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(500);
for (const s of scenes) {
  await p.evaluate(t => seek(t), s.key);
  await p.screenshot({ path: path.join(out, 'frames', s.id + '.jpg'), type: 'jpeg', quality: 86 });
}
await b.close();

// 預覽短片：從成品影片切出每一幕
for (const s of scenes)
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(s.start), '-to', String(s.end), '-i', video,
    '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-an', '-movflags', '+faststart',
    path.join(out, 'clips', s.id + '.mp4')]);

const prev = fs.existsSync(path.join(out, 'storyboard.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'storyboard.json'))) : null;
const data = {
  version: (prev?.version || 0) + 1,
  updatedAt: new Date().toISOString(),
  note,
  scenes: scenes.map(({ id, title, start, end, narration, visuals, motions, file }) =>
    ({ id, title, start, end, file, narration: narration.map(n => n[2]).join(''), narrationTimes: narration, visuals, motions })),
};
fs.writeFileSync(path.join(out, 'storyboard.json'), JSON.stringify(data, null, 1));
// 分鏡頁：把資料直接寫進頁面，打開就是完整內容
const tpl = fs.readFileSync(path.join(here, 'storyboard.template.html'), 'utf8');
fs.writeFileSync(path.join(out, 'index.html'), tpl.replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c')));
console.log(`分鏡資料 v${data.version}：${scenes.length} 幕 → ${out}`);
