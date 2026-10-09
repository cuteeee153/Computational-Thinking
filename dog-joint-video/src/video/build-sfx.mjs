// 音效：讀每一幕的 sfx 清單，用程式合成每個音效、照秒數混成一條音軌（48kHz 立體聲 WAV）。
// 用法：node build-sfx.mjs <輸出.wav> [--list]
//   每一幕的寫法：sfx: [[秒數, '種類', '給分鏡板看的說明', { gain, pitch, dur }], ...]
//   種類見下方 SOUNDS；gain 是音量倍率（預設 1），pitch 是音高倍率，dur 只給 typing 用（打字長度）。
// 全部音效都是當場合成的，不需要任何音效素材檔，也沒有授權問題。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const here = path.dirname(new URL(import.meta.url).pathname);
const args = process.argv.slice(2), flag = args.find(a => a === '--list'), out = args.find(a => a !== '--list');
const SR = 48000, LEN = 160;

const scenes = [];
for (const part of ['intro', 'part2']) {
  const dir = path.join(here, part, 'scenes');
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
    vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), { Intro: { scene: d => scenes.push(d) } });
}
scenes.sort((a, b) => a.start - b.start);
const cues = scenes.flatMap(s => (s.sfx || []).map(([t, kind, label, o = {}]) => ({ scene: s.id, t, kind, label, ...o })));
if (flag === '--list') { for (const c of cues) console.log(`幕 ${c.scene}  ${c.t.toFixed(2).padStart(6)}  ${c.kind.padEnd(10)} ${c.label}`); process.exit(0); }
if (!out) { console.error('用法：node build-sfx.mjs <輸出.wav> [--list]'); process.exit(1); }

// ---------- 合成用的小工具 ----------
let seed = 12345;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const buf = sec => new Float32Array(Math.ceil(sec * SR));
// 二階帶通／低通（RBJ biquad），中心頻率可以逐點變化
function biquad(type) {
  let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
  return (x, f, q = .9) => {
    const w = 2 * Math.PI * Math.min(f, SR * .45) / SR, al = Math.sin(w) / (2 * q), c = Math.cos(w);
    let b0, b1, b2; const a0 = 1 + al, a1 = -2 * c, a2 = 1 - al;
    if (type === 'bp') { b0 = al; b1 = 0; b2 = -al; } else { b0 = (1 - c) / 2; b1 = 1 - c; b2 = (1 - c) / 2; }
    const y = (b0 * x + b1 * x1 + b2 * x2 - a1 * y1 - a2 * y2) / a0;
    x2 = x1; x1 = x; y2 = y1; y1 = y; return y;
  };
}
const hump = p => Math.sin(Math.PI * Math.min(1, Math.max(0, p))) ** 1.5;
// 正弦滑音：頻率由 f0 指數滑到 f1，振幅指數衰減
function tone(f0, f1, dur, tau, { att = .002, partials = [[1, 1]] } = {}) {
  const b = buf(dur); let ph = 0;
  for (let i = 0; i < b.length; i++) {
    const t = i / SR, f = f0 * (f1 / f0) ** Math.min(1, t / dur);
    ph += 2 * Math.PI * f / SR;
    const env = Math.min(1, t / att) * Math.exp(-t / tau);
    let v = 0; for (const [m, a] of partials) v += a * Math.sin(ph * m);
    b[i] = v * env;
  }
  return b;
}
function noiseSweep(dur, f0, f1, { q = .8, shape = hump, type = 'bp' } = {}) {
  const b = buf(dur), flt = biquad(type), lp1 = biquad('lp'), lp2 = biquad('lp');
  for (let i = 0; i < b.length; i++) {
    const p = i / b.length, f = f0 * (f1 / f0) ** p;
    // 帶通之後再接兩段低通，把高頻嘶聲壓掉，聽起來比較圓
    b[i] = lp2(lp1(flt(noise(), f, q), f * 2.2, .7), f * 2.2, .7) * shape(p) * 2.4;
  }
  return b;
}
// 緩慢變化的隨機量（做鉛筆的顆粒感），每 18ms 換一個目標值再平滑過去
function grainy(depth = .35) {
  let cur = 1, target = 1, k = 0;
  return () => { if (k++ % 864 === 0) target = 1 - depth * rnd(); cur += (target - cur) * .002; return cur; };
}
function mixInto(dst, src, at = 0, g = 1) { const o = Math.round(at * SR); for (let i = 0; i < src.length && o + i < dst.length; i++) dst[o + i] += src[i] * g; return dst; }
function click(f = 2400, g = 1) {
  const b = buf(.03), flt = biquad('bp');
  for (let i = 0; i < b.length; i++) { const t = i / SR; b[i] = (flt(noise(), 3500, 1.2) * 2 + Math.sin(2 * Math.PI * f * t) * .5) * Math.exp(-t / .006) * g; }
  return b;
}

// ---------- 音效種類 ----------
const SOUNDS = {
  pop: (o) => mixInto(tone(760 * o.pitch, 330 * o.pitch, .12, .035), click(2600, .25), 0, 1),             // 泡泡彈出：啵
  'pop-low': (o) => tone(430 * o.pitch, 190 * o.pitch, .18, .055, { partials: [[1, 1], [2, .15]] }),     // 背景標籤：低音啵
  'pop-card': (o) => mixInto(tone(560 * o.pitch, 250 * o.pitch, .16, .045, { partials: [[1, 1], [2, .2]] }), noiseSweep(.06, 900, 500, { type: 'lp' }), 0, .25), // 卡片浮上：較厚的啵
  slide: () => noiseSweep(.42, 500, 1700, { q: .7 }),                                                  // 卡片滑入：輕咻
  whoosh: () => noiseSweep(.62, 320, 2400, { q: .6 }),                                                 // 移動：咻
  'whoosh-big': () => {                                                                                // 轉場：大咻
    const b = noiseSweep(1.05, 160, 1900, { q: .55, shape: p => Math.sin(Math.PI * Math.min(1, p * 1.25)) ** 1.2 });
    return mixInto(b, tone(70, 45, 1.0, .5, { att: .25 }), 0, .35);
  },
  typing: (o) => {                                                                                     // 打字：一個字一聲鍵盤
    const b = buf(o.dur + .1), n = Math.max(2, Math.round(o.dur / .2));
    for (let k = 0; k < n; k++) mixInto(b, click(1700 + rnd() * 900, .55 + rnd() * .35), k * o.dur / n + rnd() * .03);
    return b;
  },
  click: () => mixInto(click(2200, 1), tone(1400, 900, .04, .01), 0, .4),                              // 滑鼠按下：喀
  ding: (o) => tone(1568 * o.pitch, 1568 * o.pitch, 1.4, .38, { partials: [[1, 1], [2, .28], [2.76, .14]] }), // 送出：叮
  'ding-soft': (o) => tone(1046 * o.pitch, 1046 * o.pitch, 1.0, .28, { partials: [[1, 1], [2, .2]] }),  // 亮起：輕叮
  tick: (o) => mixInto(tone(988 * o.pitch, 988 * o.pitch, .25, .07, { partials: [[1, 1], [3, .1]] }),   // 打勾：叮咚（上揚）
    tone(1319 * o.pitch, 1319 * o.pitch, .4, .1, { partials: [[1, 1], [3, .1]] }), .075),
  'tick-soft': (o) => tone(1175 * o.pitch, 1175 * o.pitch, .25, .05, { partials: [[1, 1], [2, .15]] }), // 輕點
  marker: () => {                                                                                      // 螢光筆／亮起：唰
    const b = noiseSweep(.5, 1800, 3200, { q: 1.1, shape: p => Math.min(1, p * 6) * (1 - p) ** .6 });
    return b;
  },
  scribble: () => {                                                                                    // 劃掉：筆刷來回
    const b = noiseSweep(.45, 2600, 3400, { q: 1.4, shape: p => hump(p) * (.55 + .45 * Math.sin(2 * Math.PI * 22 * p * .45)) });
    return b;
  },
  draw: (o) => { const g = grainy(.5); return noiseSweep(o.dur || .9, 2600, 3400, { q: 1.6, shape: p => Math.min(1, p * 8) * Math.min(1, (1 - p) * 5) * g() }); }, // 畫線：鉛筆沙沙
  shake: () => { const b = buf(.4); [0, .08, .16, .27].forEach((t, k) => mixInto(b, mixInto(click(900, 1), tone(700 - k * 60, 500, .05, .015), 0, .8), t, 1 - k * .15)); return b; }, // 互撞：喀喀喀
  fall: () => tone(880, 240, .6, .35, { att: .02, partials: [[1, 1], [2, .12]] }),                      // 掉落：往下滑音
  flip: () => mixInto(noiseSweep(.06, 1200, 2200, { q: 1 }), tone(480, 900, .09, .03), 0, .7),          // 折角彈開：啪
  boing: (o) => {                                                                                      // 狗彈出：小彈簧
    const b = buf(.5); let ph = 0;
    for (let i = 0; i < b.length; i++) {
      const t = i / SR, f = (t < .1 ? 240 * (2.1 ** (t / .1)) : 504 * (1 + .05 * Math.sin(2 * Math.PI * 9 * t) * Math.exp(-t / .2))) * o.pitch;
      ph += 2 * Math.PI * f / SR; b[i] = Math.sin(ph) * Math.min(1, t / .004) * Math.exp(-t / .16);
    }
    return b;
  },
  bounce: (o) => { const b = buf(.6); [[0, 1], [.17, .5], [.29, .25]].forEach(([t, g]) => mixInto(b, tone(380 * o.pitch, 190 * o.pitch, .12, .04), t, g)); return b; }, // 彈跳：咚咚咚
  chime: () => { const b = buf(1.4); [2093, 2637, 3136].forEach((f, k) => mixInto(b, tone(f, f, 1.2, .4, { partials: [[1, 1], [2.4, .1]] }), k * .07, .6)); return b; }, // 閃一下：叮鈴
  thud: () => mixInto(tone(120, 42, .4, .13, { att: .003 }), noiseSweep(.07, 700, 300, { type: 'lp', q: .7 }), 0, .6), // 印章：咚
  note: (o) => tone(523 * o.pitch, 523 * o.pitch, .5, .14, { partials: [[1, 1], [4, .18], [10, .04]] }), // 木琴一個音
  brush: () => noiseSweep(.38, 500, 1200, { type: 'lp', q: .7 }),                                       // 上色：輕刷
};

// ---------- 混音 ----------
const mix = new Float32Array(LEN * SR);
for (const c of cues) {
  const make = SOUNDS[c.kind];
  if (!make) throw new Error(`幕 ${c.scene}：不認得的音效種類 ${c.kind}`);
  mixInto(mix, make({ pitch: c.pitch || 1, dur: c.dur || 1 }), c.t, .4 * (c.gain ?? 1));   // .4：整體音量留空間給之後的旁白
}
// 柔性限幅，避免爆音
for (let i = 0; i < mix.length; i++) mix[i] = Math.tanh(mix[i] * 1.1) * .9;

// ---------- 寫 WAV（16-bit 立體聲） ----------
const n = mix.length, data = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) { const v = Math.max(-1, Math.min(1, mix[i])) * 32767 | 0; data.writeInt16LE(v, i * 4); data.writeInt16LE(v, i * 4 + 2); }
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
fs.writeFileSync(out, Buffer.concat([h, data]));
console.log(`音效：${cues.length} 個 → ${out}`);
