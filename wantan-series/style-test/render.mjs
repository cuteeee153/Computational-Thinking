// 清新亮色風格樣張：把 fresh.html 的三張截成 fresh-1.png～fresh-3.png（1920×1080）。用法：node render.mjs
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + dir + '/fresh.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
for (const [i, id] of ['f1', 'f2', 'f3'].entries()) {
  await p.evaluate(id => document.querySelectorAll('#stage>section').forEach(s => s.classList.toggle('on', s.id === id)), id);
  await p.screenshot({ path: `${dir}/fresh-${i + 1}.png` });
}
await b.close();
