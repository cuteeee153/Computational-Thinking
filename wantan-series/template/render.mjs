// 逐格輸出動畫（1920×1080）。
// 用法：node render.mjs video <輸出.mp4> [fps]        整支（從片頭之後到結尾）；T0=… T1=… 只輸出這一段（成片秒數）
//       node render.mjs stills <資料夾> 12.3 45 …     指定秒數的截圖（NOCAP=1 不含字幕）
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const dir = path.dirname(new URL(import.meta.url).pathname);
const [, , mode, out, ...rest] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
p.on('pageerror', e => { console.error('頁面錯誤：', e.message); process.exit(1); });
await p.goto('file://' + dir + '/video.html');
await p.waitForFunction(() => window.SCENES);
if (process.env.NOCAP) await p.evaluate(() => { window.CAPTIONS.length = 0; });
if (mode === 'stills') {
  for (const s of rest) { await p.evaluate(t => seek(t), +s); await p.screenshot({ path: `${out}/still-${s}.png` }); }
} else {
  const fps = +(rest[0] || 30);
  let [t0, t1] = await p.evaluate(() => [START, DURATION]);
  if (process.env.T0) t0 = +process.env.T0;
  if (process.env.T1) t1 = +process.env.T1;
  const n = Math.round((t1 - t0) * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => seek(t), t0 + i / fps);
    const buf = await p.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 300 === 0) console.log(`${path.basename(out)} ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await b.close();
