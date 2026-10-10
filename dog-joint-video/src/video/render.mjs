// 用法：PAGE=intro.html node render.mjs stills 1 5 10 ...   （輸出指定秒數的靜態檢查圖）
//       T0=… T1=… …video：只算成片時間 T0～T1 這一段
//       NOCAP=1 …stills：截圖不含字幕（給下一段當底圖用）
//       PAGE=intro.html node render.mjs video out.mp4 [fps]  （逐格擷取，範圍取頁面的 START～DURATION）
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
import { spawn } from 'node:child_process';
import path from 'node:path';
const dir = path.dirname(new URL(import.meta.url).pathname);
const [, , mode, ...rest] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
const page = process.env.PAGE || 'intro.html';
await p.goto('file://' + dir + '/' + page);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(500);
if (mode === 'stills') {
  if (process.env.NOCAP) await p.evaluate(() => { window.CAPTIONS.length = 0; });
  for (const s of rest) {
    await p.evaluate(t => seek(t), +s);
    await p.screenshot({ path: `${dir}/still-${page.replace('.html', '')}-${s}.png` });
  }
} else {
  const out = rest[0], fps = +(rest[1] || 30);
  let [t0, t1] = await p.evaluate(() => [window.START || 0, DURATION]);
  if (process.env.T0) t0 = +process.env.T0;   // 只算一段（成片時間）：T0=… T1=…
  if (process.env.T1) t1 = +process.env.T1;
  const n = Math.round((t1 - t0) * fps);
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let i = 0; i < n; i++) {
    await p.evaluate(t => seek(t), t0 + i / fps);
    const buf = await p.screenshot({ type: 'png' });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
}
await b.close();
