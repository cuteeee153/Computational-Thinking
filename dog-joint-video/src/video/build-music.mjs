// 背景音樂：輕柔的 lo-fi 木琴小曲，全部用程式合成（無素材、無授權問題）。
// 用法：node build-music.mjs <輸出.wav>
//
// 一小節約 2.83 秒（85 BPM 左右），小節長度＝0:45 轉場的成片時間 ÷ 16，讓段落切換落在影片的轉場上
// （以下時間是設計時間，實際依 timing/warp.json 換算）：
//   第 1–7 小節（0:00–0:19.7）     鉤子段：只有電鋼琴和弦＋木琴，溫暖安靜
//   第 8–16 小節（0:19.7–0:45）    知識段：加入輕鼓、貝斯、沙鈴，節奏出來
//   第 17–35 小節（0:45–1:38.4）   深色段：改成小調和弦，鼓只留大鼓，木琴降八度、音變少
//   第 36–55 小節（1:38.4–2:34.7） 第一步：回到大調，完整節奏，旋律變化版
//   第 56 小節起（2:34.7–2:40）    最後一個和弦延音、淡出
// 每一句旁白（timing/narration.json 的字幕時間）出現時，音樂自動降低約 6 dB（ducking），讓出旁白。
import fs from 'node:fs';
import path from 'node:path';
import { W, NARR } from './timing/timing.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const out = process.argv[2];
if (!out) { console.error('用法：node build-music.mjs <輸出.wav>'); process.exit(1); }
const SR = 48000, LEN = Math.ceil(W(160) * 100) / 100, BAR = W(45) / 16, BEAT = BAR / 4, E8 = BEAT / 2, SWING = .09;
const L = new Float32Array(LEN * SR), R = new Float32Array(LEN * SR);

let seed = 777;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);
const noise = () => rnd() * 2 - 1;
const hz = m => 440 * 2 ** ((m - 69) / 12);
// 放進左右聲道：pan -1（左）～ 1（右）
function put(buf, at, g = 1, pan = 0) {
  const o = Math.round(at * SR), gl = g * Math.cos((pan + 1) * Math.PI / 4), gr = g * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < buf.length && o + i < L.length; i++) { if (o + i < 0) continue; L[o + i] += buf[i] * gl; R[o + i] += buf[i] * gr; }
}
const onePole = (fc) => { let y = 0; const a = Math.exp(-2 * Math.PI * fc / SR); return x => (y = (1 - a) * x + a * y); };

// ---------- 樂器 ----------
// 木琴：基音＋4 倍、10 倍泛音（泛音衰減得快），起音帶一點敲擊噪音
function marimba(m, vel = 1) {
  const f = hz(m), n = Math.round(1.6 * SR), b = new Float32Array(n);
  for (let i = 0; i < n; i++) {
    const t = i / SR, att = Math.min(1, t / .003);
    b[i] = att * vel * (Math.sin(2 * Math.PI * f * t) * Math.exp(-t / .42)
      + .28 * Math.sin(2 * Math.PI * f * 3.98 * t) * Math.exp(-t / .07)
      + .05 * Math.sin(2 * Math.PI * f * 9.9 * t) * Math.exp(-t / .02))
      + (t < .006 ? noise() * .05 * vel * (1 - t / .006) : 0);
  }
  return b;
}
// 電鋼琴和弦墊底：慢起音、輕微顫音，低通讓它軟一點；左右聲道各自微走音做出寬度
function epChord(notes, dur, bright = 1) {
  const n = Math.round((dur + .8) * SR), l = new Float32Array(n), r = new Float32Array(n);
  const lpL = onePole(1400 * bright), lpR = onePole(1400 * bright);
  for (let i = 0; i < n; i++) {
    const t = i / SR, env = Math.min(1, t / .35) * (t < dur ? 1 : Math.exp(-(t - dur) / .25)) * (1 + .06 * Math.sin(2 * Math.PI * 4.2 * t));
    let vl = 0, vr = 0;
    for (const m of notes) {
      const f = hz(m);
      vl += Math.sin(2 * Math.PI * f * 0.9985 * t) + .22 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t / .6);
      vr += Math.sin(2 * Math.PI * f * 1.0015 * t) + .22 * Math.sin(4 * Math.PI * f * t) * Math.exp(-t / .6);
    }
    l[i] = lpL(vl * env / notes.length); r[i] = lpR(vr * env / notes.length);
  }
  return [l, r];
}
function bass(m, dur) {
  const f = hz(m), n = Math.round((dur + .2) * SR), b = new Float32Array(n), lp = onePole(380);
  for (let i = 0; i < n; i++) { const t = i / SR; b[i] = lp((Math.sin(2 * Math.PI * f * t) + .3 * Math.sin(4 * Math.PI * f * t)) * Math.min(1, t / .01) * Math.exp(-t / (dur * .9))); }
  return b;
}
function kick() { const n = Math.round(.35 * SR), b = new Float32Array(n); let ph = 0; for (let i = 0; i < n; i++) { const t = i / SR; ph += 2 * Math.PI * (45 + 80 * Math.exp(-t / .03)) / SR; b[i] = Math.sin(ph) * Math.exp(-t / .11); } return b; }
function snare() { const n = Math.round(.25 * SR), b = new Float32Array(n), lp = onePole(2600); for (let i = 0; i < n; i++) { const t = i / SR; b[i] = lp(noise()) * Math.exp(-t / .06) * 1.6 + Math.sin(2 * Math.PI * 190 * t) * Math.exp(-t / .03) * .3; } return b; }
function hat() { const n = Math.round(.06 * SR), b = new Float32Array(n), lp = onePole(9000); let prev = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = noise(); const hp = x - prev; prev = x; b[i] = lp(hp) * Math.exp(-t / .015); } return b; }
const KICK = kick(), SNARE = snare(), HAT = hat();

// ---------- 曲子 ----------
const MAJOR = [ // Fmaj7 – Em7 – Dm7 – Cmaj9（各一小節）
  { pad: [53, 57, 60, 64], root: 41 }, { pad: [52, 55, 59, 62], root: 40 },
  { pad: [50, 53, 57, 60], root: 38 }, { pad: [48, 55, 59, 62], root: 36 },
];
const MINOR = [ // Am7 – Fmaj7 – Dm7 – Em7（深色段）
  { pad: [57, 60, 64, 67], root: 45 }, { pad: [53, 57, 60, 64], root: 41 },
  { pad: [50, 53, 57, 60], root: 38 }, { pad: [52, 55, 59, 62], root: 40 },
];
// 旋律：每四小節一句，[小節內第幾個八分音, MIDI, 力度]
const MEL_A = [
  [[1, 69, .8], [3, 72, .9], [4, 76, .7], [6, 74, .8]],
  [[1, 67, .8], [3, 71, .7], [5, 74, .9]],
  [[1, 69, .8], [2, 72, .6], [4, 74, .9], [7, 76, .6]],
  [[2, 67, .8], [4, 64, .7], [5, 67, .5]],
];
const MEL_B = [
  [[0, 72, .9], [2, 69, .6], [3, 72, .7], [6, 79, .8]],
  [[1, 76, .8], [3, 74, .7], [4, 71, .6]],
  [[0, 74, .8], [2, 77, .7], [3, 76, .6], [5, 72, .8]],
  [[1, 71, .7], [3, 72, .9], [6, 67, .5]],
];
const MEL_DARK = [ // 深色段：低八度、音少
  [[1, 64, .7], [4, 67, .6]],
  [[2, 65, .6], [5, 64, .5]],
  [[1, 62, .6], [4, 65, .6]],
  [[3, 64, .7]],
];
const eighth = (bar, k) => bar * BAR + k * E8 + (k % 2 ? SWING * E8 * 2 : 0);

for (let bar = 0; bar < 57; bar++) {
  const sec = bar < 7 ? 'hook' : bar < 16 ? 'core' : bar < 35 ? 'dark' : bar < 55 ? 'step' : 'end';
  const prog = sec === 'dark' ? MINOR : MAJOR, ch = prog[bar % 4], t0 = bar * BAR;
  // 和弦墊底
  if (sec === 'end') { const [l, r] = epChord([48, 55, 59, 62, 64], 4.2, .9); put(l, t0, .15, -.5); put(r, t0, .15, .5); continue; }
  const [l, r] = epChord(ch.pad, BAR, sec === 'dark' ? .6 : 1);
  put(l, t0, .14, -.5); put(r, t0, .14, .5);
  // 旋律
  const mel = sec === 'dark' ? MEL_DARK : (sec === 'step' && Math.floor(bar / 4) % 2 ? MEL_B : (sec === 'core' && bar % 8 >= 4 ? MEL_B : MEL_A));
  const vol = sec === 'hook' ? .17 : sec === 'dark' ? .13 : .16;
  for (const [k, m, v] of mel[bar % 4]) put(marimba(m, v), eighth(bar, k), vol, .15);
  // 鉤子段最後一小節：木琴往上爬，帶進節奏
  if (bar === 6) [72, 74, 76, 79].forEach((m, i) => put(marimba(m, .6 + i * .1), eighth(bar, 4 + i), .13, .2));
  // 節奏（鉤子段沒有）
  if (sec === 'hook') continue;
  put(KICK, t0, .32); put(KICK, t0 + 2 * BEAT + (sec === 'dark' ? 0 : E8 + SWING * E8 * 2), sec === 'dark' ? .22 : .26);
  if (sec !== 'dark') {
    put(SNARE, t0 + BEAT, .07, .1); put(SNARE, t0 + 3 * BEAT, .07, .1);
    for (let k = 0; k < 8; k++) put(HAT, eighth(bar, k), k % 2 ? .035 : .05, -.3);
    put(bass(ch.root, BEAT * 1.6), t0, .2); put(bass(ch.root, BEAT * .8), t0 + 2.5 * BEAT, .14); put(bass(ch.root + 7, BEAT), t0 + 3 * BEAT, .12);
  } else {
    put(bass(ch.root, BEAT * 3.5), t0, .17);
    for (let k = 0; k < 8; k += 2) put(HAT, eighth(bar, k), .02, -.3);
  }
}

// 黑膠底噪：極小聲的沙沙聲＋偶爾一顆小爆音
{ const lp = onePole(3000); for (let i = 0; i < L.length; i++) { const c = lp(noise()) * .004 + (rnd() < .00004 ? noise() * .05 : 0); L[i] += c; R[i] += c; } }

// ---------- 旁白時自動降音量、頭尾淡入淡出 ----------
const duck = new Float32Array(L.length).fill(1);
for (const [a, b] of NARR.captions) for (let i = Math.round((a - .25) * SR); i < Math.round((b + .3) * SR) && i < duck.length; i++) if (i >= 0) duck[i] = .5;
let g = 1;
for (let i = 0; i < L.length; i++) {
  g += (duck[i] - g) * .00012;                       // 約 0.2 秒平滑
  const t = i / SR, fade = Math.min(1, t / 1.2) * Math.min(1, (LEN - t) / 4.5);
  L[i] = Math.tanh(L[i] * g * fade * 1.4) * .45; R[i] = Math.tanh(R[i] * g * fade * 1.4) * .45;   // .45：當背景墊底的音量
}

const n = L.length, data = Buffer.alloc(n * 4);
for (let i = 0; i < n; i++) { data.writeInt16LE(Math.max(-1, Math.min(1, L[i])) * 32767 | 0, i * 4); data.writeInt16LE(Math.max(-1, Math.min(1, R[i])) * 32767 | 0, i * 4 + 2); }
const h = Buffer.alloc(44);
h.write('RIFF', 0); h.writeUInt32LE(36 + data.length, 4); h.write('WAVE', 8); h.write('fmt ', 12);
h.writeUInt32LE(16, 16); h.writeUInt16LE(1, 20); h.writeUInt16LE(2, 22); h.writeUInt32LE(SR, 24);
h.writeUInt32LE(SR * 4, 28); h.writeUInt16LE(4, 32); h.writeUInt16LE(16, 34); h.write('data', 36); h.writeUInt32LE(data.length, 40);
fs.writeFileSync(out, Buffer.concat([h, data]));
console.log(`背景音樂 ${LEN.toFixed(2)} 秒 → ${out}`);
