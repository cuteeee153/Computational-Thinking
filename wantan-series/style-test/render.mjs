// 把 index.html 的三張樣張各截成一張 1920×1080 PNG：node render.mjs
import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import path from 'path';
const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PW || 'playwright');
const dir = path.dirname(fileURLToPath(import.meta.url));
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1200 } });
await p.goto('file://' + dir + '/index.html');
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(300);
for (const id of ['f1', 'f2', 'f3']) await p.locator('#' + id).screenshot({ path: `${dir}/${id}.png` });
await b.close();
