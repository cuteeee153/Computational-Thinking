// 由旁白對時結果產生影片要用的時間資料。
// 用法：node build-timing.mjs
// 讀：../../narration/audio/timeline.json（align.py 的輸出：每一句旁白的成片時間）
//     ../../narration/scene-map.json（旁白稿每一段屬於哪一幕）
//     timing/warp.json（設計時間 → 成片時間的對照點）
// 寫：timing/narration.json（字幕、各幕旁白）與 timing/timing.js（給 intro.html／part2.html 載入）
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const N = path.join(here, '../../narration');
const tl = JSON.parse(fs.readFileSync(path.join(N, 'audio/timeline.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.join(N, 'scene-map.json'), 'utf8')).scenes;
const warp = JSON.parse(fs.readFileSync(path.join(here, 'timing/warp.json'), 'utf8')).anchors;

// 短句（依序）＋它在全文中的字元位置
const phrases = []; let pos = 0;
for (const l of tl.lines) for (const p of l.phrases) { phrases.push({ ...p, line: l.line, a: pos, b: pos + p.text.length }); pos += p.text.length; }

// 字幕：同一行裡連續的短句合併，一則最多 18 字；句尾的逗號、句號、冒號、分號不顯示
const strip = s => s.replace(/[，。、：；,]+$/, '');
const captions = [];
for (const l of tl.lines) {
  const rec = phrases.filter(p => p.line === l.line && p.t0 != null);
  let cur = null;
  for (const p of rec) {
    if (cur && (strip(cur.text) + p.text).length <= 18) { cur.text += p.text; cur.t1 = p.t1; }
    else { if (cur) captions.push(cur); cur = { t0: p.t0, t1: p.t1, text: p.text }; }
  }
  if (cur) captions.push(cur);
}
captions.forEach((c, i) => {
  const next = captions[i + 1];
  c.t1 = Math.min(c.t1 + .35, next ? next.t0 - .04 : Infinity);
  c.text = strip(c.text);
});

// 各幕旁白：scene-map 的每一段對到短句，算出開始／結束時間（還沒錄音的段落時間是 null）
const scenes = {}; pos = 0;
for (const m of map) {
  const a = pos, b = pos + m.text.length; pos = b;
  const ps = phrases.filter(p => p.a < b && p.b > a);
  const rec = ps.filter(p => p.t0 != null);
  (scenes[m.scene] ||= []).push([rec.length ? rec[0].t0 : null, rec.length === ps.length && rec.length ? rec[rec.length - 1].t1 : null, m.text]);
}

const out = { speed: tl.speed, offset: tl.offset, recordedUntil: captions.length ? captions[captions.length - 1].t1 : 0, captions: captions.map(c => [+c.t0.toFixed(3), +c.t1.toFixed(3), c.text]), scenes };
fs.writeFileSync(path.join(here, 'timing/narration.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(here, 'timing/timing.js'),
  `// 自動產生（node build-timing.mjs），不要手改：改 timing/warp.json 或重新對時\n` +
  `window.WARP = ${JSON.stringify(warp)};\n` +
  `window.CAPTIONS = ${JSON.stringify(out.captions)};\n`);
console.log(`字幕 ${captions.length} 則（錄音到 ${out.recordedUntil.toFixed(1)} 秒）；${Object.keys(scenes).length} 幕有旁白`);
for (const c of out.captions) console.log(`  ${c[0].toFixed(2)}–${c[1].toFixed(2)}  ${c[2]}`);
