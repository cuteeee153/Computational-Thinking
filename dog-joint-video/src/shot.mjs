import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';
const [,, file, out, ...clips] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 } });
await p.goto('file://' + file);
await p.evaluate(() => document.fonts.ready);
await p.waitForTimeout(400);
if (clips.length) {
  for (let i = 0; i < clips.length; i++) {
    await p.screenshot({ path: out.replace('.png', `-${clips[i]}.png`), clip: { x: 0, y: i * 1080, width: 1920, height: 1080 } , fullPage: true});
  }
} else await p.screenshot({ path: out, fullPage: true });
await b.close();
