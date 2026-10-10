// 由旁白對時結果產生影片要用的時間資料。
// 用法：node build-timing.mjs
// 讀：../../narration/audio/timeline-placed.json（align.py 對時＋place.py 插入停頓後，每一句旁白的成片時間）
//     ../../narration/scene-map.json（旁白稿每一段屬於哪一幕）
//     timing/warp.json（設計時間 → 成片時間的對照點）
//     ../../narration/draft-part3.json、draft-part4.json（2:40 之後的旁白稿，一幕一行）＋ audio-partN/timeline-placed.json（錄音對時結果；沒有的話照語速推算、標記為預估）
// 寫：timing/narration.json（字幕、各幕旁白）與 timing/timing.js（給 intro.html／part2.html 載入）
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert';

const here = path.dirname(new URL(import.meta.url).pathname);
const N = path.join(here, '../../narration');
const tl = JSON.parse(fs.readFileSync(path.join(N, 'audio/timeline-placed.json'), 'utf8'));
const map = JSON.parse(fs.readFileSync(path.join(N, 'scene-map.json'), 'utf8')).scenes;
const warp = JSON.parse(fs.readFileSync(path.join(here, 'timing/warp.json'), 'utf8')).anchors;

// 短句（依序）＋它在全文中的字元位置（只數要念的字，標點不算，所以改標點不會影響對時）
const nchar = t => (t.match(/[一-鿿A-Za-z0-9]/g) || []).length;
const phrases = []; let pos = 0;
for (const l of tl.lines) for (const p of l.phrases) { phrases.push({ ...p, line: l.line, a: pos, b: pos + nchar(p.text) }); pos += nchar(p.text); }

// 字幕一定要斷開的位置：幕和幕的交界（字幕不跨幕），加上 caption-breaks.json 指定的地方（after＝這段字之後斷開）
const cuts = new Set(); { let q = 0; map.forEach((m, i) => { q += nchar(m.text); if (map[i + 1] && map[i + 1].scene !== m.scene) cuts.add(q); }); }
const fullText = tl.lines.flatMap(l => l.phrases.map(p => p.text)).join('');
const brkFile = path.join(N, 'caption-breaks.json');
const breaks = fs.existsSync(brkFile) ? JSON.parse(fs.readFileSync(brkFile, 'utf8')).breaks : [];
for (const { after } of breaks) {
  if (!fullText.includes(after)) continue;   // 2:40 之後的旁白（下面處理）
  const i = fullText.indexOf(after); assert(i >= 0, `caption-breaks.json：旁白裡找不到「${after}」`);
  cuts.add(nchar(fullText.slice(0, i + after.length)));
}
// 短句在斷開的位置切成小段（時間依字數平分）
const segs = [];
for (const p of phrases) {
  if (p.t0 == null) continue;
  const n = p.b - p.a; let k = 0, txt = '', start = 0, brk = cuts.has(p.a) || p === phrases.find(x => x.line === p.line);
  for (const ch of p.text) {
    txt += ch; if (/[一-鿿A-Za-z0-9]/.test(ch)) k++;
    if (k < n && cuts.has(p.a + k) && /[一-鿿A-Za-z0-9]/.test(ch)) {
      segs.push({ line: p.line, text: txt, t0: p.t0 + (p.t1 - p.t0) * start / n, t1: p.t0 + (p.t1 - p.t0) * k / n, brk });
      txt = ''; start = k; brk = true;
    }
  }
  segs.push({ line: p.line, text: txt, t0: p.t0 + (p.t1 - p.t0) * start / n, t1: p.t1, brk });
}
// 字幕：同一行裡連續的小段合併，一則最多 18 字（遇到斷開的位置不合併）；句尾的逗號、句號、冒號、分號不顯示
const strip = s => s.replace(/[，。、：；,]+$/, '');
const captions = [];
let cur = null;
for (const g of segs) {
  if (cur && !g.brk && g.line === cur.line && (strip(cur.text) + g.text).length <= 18) { cur.text += g.text; cur.t1 = g.t1; }
  else { if (cur) captions.push(cur); cur = { t0: g.t0, t1: g.t1, text: g.text, line: g.line }; }
}
if (cur) captions.push(cur);
// 2:40 之後：每一段有自己的旁白稿（draft-partN.json，一幕一行）；錄好音之後（place-part3.py 產生 audio-partN/timeline-placed.json）
// 改用真正的時間，還沒錄音的照語速推算（標記為預估）
const W = t => { const a = warp; if (t <= a[0][0]) return t - a[0][0] + a[0][1];
  for (let i = 1; i < a.length; i++) if (t <= a[i][0]) return a[i - 1][1] + (t - a[i - 1][0]) * (a[i][1] - a[i - 1][1]) / (a[i][0] - a[i - 1][0]);
  return t - a[a.length - 1][0] + a[a.length - 1][1]; };
const estScenes = {}; let estimatedFrom = null;
for (const part of ['part3', 'part4']) {
  const draft = JSON.parse(fs.readFileSync(path.join(N, `draft-${part}.json`), 'utf8'));
  const placed = path.join(N, `audio-${part}/timeline-placed.json`);
  const rec = fs.existsSync(placed) ? JSON.parse(fs.readFileSync(placed, 'utf8')).lines : null;
  if (rec) assert(rec.length === draft.scenes.length && rec.every((l, i) => l.text === draft.scenes[i].text), `audio-${part} 的對時結果和 draft-${part}.json 的旁白不一致，請重新對時`);
  else if (estimatedFrom == null) estimatedFrom = +W(draft.start).toFixed(3);
  let dt = draft.start;
  for (const [si, sc] of draft.scenes.entries()) {
    dt += sc.pre; let cur = null; const ph = [];
    // 錄音：一個短句太長時，在 caption-breaks.json 指定的地方切開（時間依字數分），切開的兩段不再合併
    if (rec) for (const p of rec[si].phrases) {
      let rest = p.text, t = p.t0; const per = (p.t1 - p.t0) / Math.max(1, nchar(p.text)); let brk = false;
      for (const { after } of breaks) {
        const i = rest.indexOf(after); if (i < 0 || i + after.length >= rest.length) continue;
        const head = rest.slice(0, i + after.length), t1 = t + nchar(head) * per;
        ph.push([t, t1, head.trim(), brk]); rest = rest.slice(i + after.length); t = t1; brk = true;
      }
      ph.push([t, p.t1, rest.trim(), brk]);
    }
    else for (const p of sc.text.match(/[^，。、：；？！]+[，。、：；？！]?/g) || []) {
      const t0 = dt; dt += (p.match(/[一-鿿A-Za-z0-9]/g) || []).length / draft.rate; ph.push([W(t0), W(dt), p]);
      dt += /[。？！；：]$/.test(p) ? draft.stopGap : draft.commaGap;
    }
    for (const [t0, t1, text, brk] of ph) {
      if (cur && !brk && !/[：。？！；]$/.test(cur.text) && (strip(cur.text) + text).length <= 18) { cur.text += text; cur.t1 = t1; }
      else { if (cur) captions.push(cur); cur = { t0, t1, text, est: !rec }; }
    }
    if (cur) captions.push(cur);
    estScenes[sc.scene] = [[+ph[0][0].toFixed(3), +ph[ph.length - 1][1].toFixed(3), sc.text, ...(rec ? [] : ['est'])]];
  }
}
captions.sort((a, b) => a.t0 - b.t0);   // 品種對照表（part4）插在 part2 中間，依成片時間排
captions.forEach((c, i) => {
  const next = captions[i + 1];
  c.t1 = Math.min(c.t1 + .35, next ? next.t0 - .04 : Infinity);
  c.text = strip(c.text);
});

// 各幕旁白：scene-map 的每一段對到短句，算出開始／結束時間（還沒錄音的段落時間是 null）
const scenes = {}; pos = 0;
for (const m of map) {
  const a = pos, b = pos + nchar(m.text); pos = b;
  const ps = phrases.filter(p => p.a < b && p.b > a);
  const rec = ps.filter(p => p.t0 != null);
  (scenes[m.scene] ||= []).push([rec.length ? rec[0].t0 : null, rec.length === ps.length && rec.length ? rec[rec.length - 1].t1 : null, m.text]);
}

Object.assign(scenes, estScenes);
const out = { estimatedFrom, speed: tl.speed, offset: tl.offset, recordedUntil: Math.max(0, ...captions.filter(c => !c.est).map(c => c.t1)), captions: captions.map(c => [+c.t0.toFixed(3), +c.t1.toFixed(3), c.text]), scenes };
fs.writeFileSync(path.join(here, 'timing/narration.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(here, 'timing/timing.js'),
  `// 自動產生（node build-timing.mjs），不要手改：改 timing/warp.json 或重新對時\n` +
  `window.WARP = ${JSON.stringify(warp)};\n` +
  `window.CAPTIONS = ${JSON.stringify(out.captions)};\n`);
console.log(`字幕 ${captions.length} 則（錄音到 ${out.recordedUntil.toFixed(1)} 秒）；${Object.keys(scenes).length} 幕有旁白`);
for (const c of out.captions) console.log(`  ${c[0].toFixed(2)}–${c[1].toFixed(2)}  ${c[2]}`);
