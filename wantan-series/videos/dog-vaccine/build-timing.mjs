// 算出整支影片的時間：每一幕從幾秒到幾秒、每一句旁白什麼時候念、字幕。
// 用法：node build-timing.mjs
// 讀：script.json（逐字稿拆成的幕）
//     narration/aligned.json（錄音對時結果，narration/align.py 產生；沒有的幕照語速估，標記為預估）
//     assets/footage/<幕號>/meta.json（真實畫面剪好之後，build-footage.py 產生）
// 寫：timing/timing.json（給 node 腳本）、timing/timing.js（給 video.html）
//
// 排法：片頭 → 依序每一幕。一幕的長度＝前留白 pre＋旁白＋後留白 post＋hold（想多停一下的秒數）；
//       有真實畫面的幕至少要 footage.seconds 秒。
// 字幕：每一幕的短句（依標點切）合併成一則最多 18 字；句號、問號、驚嘆號、冒號、分號之後一定斷開；
//       稿子裡的「|」是強制斷開的位置（不念、不顯示）；字幕不顯示句尾標點和「」『』。
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const rd = f => JSON.parse(fs.readFileSync(path.join(here, f), 'utf8'));
const script = rd('script.json');
const aligned = fs.existsSync(path.join(here, 'narration/aligned.json')) ? rd('narration/aligned.json').scenes : {};
const FPS = 30, fr = t => Math.round(t * FPS) / FPS;
const nchar = s => (s.match(/[一-鿿A-Za-z0-9]/g) || []).length;
const SPLIT = /[^，。、：；？！,|]+[，。、：；？！,|]?/g;
const phrasesOf = text => (text.match(SPLIT) || []).map(p => p.trim()).filter(p => nchar(p));
const D = { pre: .6, post: .7, hold: 0, ...script.defaults };

let t = script.bumper?.length || 0;
const start = t, scenes = [], captions = [];
const files = fs.readdirSync(path.join(here, 'scenes')).filter(f => f.endsWith('.js'));
let group = null;
for (const sc of script.scenes) {
  if (sc.group) group = sc.group;
  const o = { ...D, ...sc };
  const texts = phrasesOf(sc.text);
  let rel, est = false, len;
  const a = aligned[sc.id];
  if (a && a.text === sc.text) { rel = a.phrases.map(p => [p.t0, p.t1]); len = a.length; }
  else {   // 還沒錄音（或稿子改過、要重錄）：照語速估
    est = true; let dt = 0; rel = [];
    for (const p of texts) {
      const t0 = dt; dt += nchar(p) / script.rate; rel.push([t0, dt]);
      dt += /[。？！；：]$/.test(p) ? script.stopGap : script.commaGap;
    }
    len = rel.length ? rel[rel.length - 1][1] : 0;
  }
  const s0 = t, n0 = fr(s0 + o.pre);
  let end = fr(n0 + len + o.post + o.hold);
  if (sc.footage?.seconds) end = Math.max(end, fr(s0 + sc.footage.seconds));
  if (sc.minLength) end = Math.max(end, fr(s0 + sc.minLength));
  const phrases = texts.map((p, k) => ({ text: p.replace(/\|$/, ''), t0: +(n0 + rel[k][0]).toFixed(3), t1: +(n0 + rel[k][1]).toFixed(3), brk: /\|$/.test(p) }));
  scenes.push({ id: sc.id, title: sc.title, group, text: sc.text, start: +s0.toFixed(3), end: +end.toFixed(3), narrStart: n0, narrEnd: +(n0 + len).toFixed(3),
    est, music: sc.music || null, footage: sc.footage || null, file: files.find(f => f.startsWith(sc.id + '-')) || null,
    audio: est ? null : { src: a.src, cut: a.cut, at: +(n0 - a.lead).toFixed(3) }, phrases: phrases.map(({ text, t0, t1 }) => ({ text, t0, t1 })) });
  // 字幕
  const show = s => s.replace(/[「」『』|]/g, '').replace(/[，。、：；,]+$/, '');
  let cur = null;
  const push = () => { if (cur) captions.push(cur); cur = null; };
  for (const p of phrases) {
    // 太長的短句平均切開（優先在頓號）
    const pieces = []; const n = nchar(p.text);
    if (show(p.text).length <= 18) pieces.push([p.text, p.t0, p.t1]);
    else {
      const k = Math.ceil(show(p.text).length / 18), chars = [...p.text]; let acc = '', cnt = 0, from = p.t0;
      for (const ch of chars) {
        acc += ch; if (/[一-鿿A-Za-z0-9]/.test(ch)) cnt++;
        if (pieces.length < k - 1 && cnt >= Math.round(n * (pieces.length + 1) / k)) { const to = p.t0 + (p.t1 - p.t0) * cnt / n; pieces.push([acc, from, to]); acc = ''; from = to; }
      }
      if (acc) pieces.push([acc, from, p.t1]);
    }
    pieces.forEach(([txt, a0, a1], i) => {
      const forced = i > 0;
      if (cur && !forced && !cur.stop && (show(cur.text) + txt).length <= 18) { cur.text += txt; cur.t1 = a1; }
      else { push(); cur = { t0: a0, t1: a1, text: txt }; }
      if (i === pieces.length - 1) { cur.stop = /[。？！；：]$/.test(txt) || p.brk; if (cur.stop) push(); }
    });
  }
  push();
  t = end;
}
captions.forEach((c, i) => { const nx = captions[i + 1]; c.t1 = Math.min(c.t1 + .35, nx ? nx.t0 - .04 : Infinity); });
const caps = captions.map(c => [+c.t0.toFixed(3), +c.t1.toFixed(3), c.text.replace(/[「」『』|]/g, '').replace(/[，。、：；,]+$/, '')]);

const footage = {};
for (const sc of scenes) {
  const m = path.join(here, 'assets/footage', sc.id, 'meta.json');
  if (fs.existsSync(m)) footage[sc.id] = { dir: sc.id, ...JSON.parse(fs.readFileSync(m, 'utf8')) };
}
const out = { title: script.title, style: script.style || 'classic', start, total: +t.toFixed(3), bumper: script.bumper || null, scenes, captions: caps };
fs.mkdirSync(path.join(here, 'timing'), { recursive: true });
fs.writeFileSync(path.join(here, 'timing/timing.json'), JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(here, 'timing/timing.js'), '// 自動產生（node build-timing.mjs），不要手改\n' +
  `window.TIMING = ${JSON.stringify({ ...out, captions: undefined })};\nwindow.CAPTIONS = ${JSON.stringify(caps)};\nwindow.FOOTAGE = ${JSON.stringify(footage)};\n` +
  `window.SCENE_FILES = ${JSON.stringify(scenes.map(s => s.file).filter(Boolean))};\n`);
const m = s => { const d = Math.round(s * 10); return `${Math.floor(d / 600)}:${((d % 600) / 10).toFixed(1).padStart(4, '0')}`; };
console.log(`${script.title}：${scenes.length} 幕，總長 ${m(t)}（片頭 ${start} 秒）；字幕 ${caps.length} 則`);
for (const s of scenes) console.log(`  幕 ${s.id.padEnd(4)} ${m(s.start)}–${m(s.end)}  ${s.est ? '預估' : '錄音'}${s.footage ? `  真實畫面${footage[s.id] ? '' : '（待補）'}` : ''}${s.file ? '' : '  （還沒做畫面）'}  ${s.title}`);
