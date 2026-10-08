// 用法：PAGE=intro.html node render.mjs stills 1 5 10 ...   （輸出指定秒數的靜態檢查圖）
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
  for (const s of rest) {
    await p.evaluate(t => seek(t), +s);
    await p.screenshot({ path: `${dir}/still-${page.replace('.html', '')}-${s}.png` });
  }
} else {
  const out = rest[0], fps = +(rest[1] || 30);
  const [t0, t1] = await p.evaluate(() => [window.START || 0, DURATION]);
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
