// 背景音樂：輕快的木琴小曲（lo-fi 底），全部用程式合成（無素材、無授權問題）。
// 用法：node build-music.mjs <輸出.wav>
//
// 一小節約 2.46 秒（98 BPM 左右），小節長度＝0:45 轉場的成片時間 ÷ 整數小節，讓段落切換落在影片的轉場上
// （以下時間是設計時間，實際依 timing/warp.json 換算）：
//   鉤子段（0:00–0:19.7）  電鋼琴和弦＋木琴＋彈指、沙鈴，輕快但不吵
//   知識段（0:19.7–0:45）  加入鼓、拍手、跳動的八分音符貝斯，節奏出來
//   深色段（0:45–1:38.4）  改成小調和弦，鼓組簡化但保持律動，木琴降八度
//   第一步（1:38.4–2:40）  回到大調，完整節奏＋十六分音符沙鈴，旋律變化版
//   第二步（2:40–3:20）    像知識段的節奏；幕 31（深色背景）那幾小節改回小調
//   第三步（3:20–結尾）    木琴往上爬帶進來，完整節奏，到最後的回顧
//   最後一個和弦延音、淡出
// 每一句旁白（timing/narration.json 的字幕時間）出現時，音樂自動降低約 6 dB（ducking），讓出旁白。
import fs from 'node:fs';
import path from 'node:path';
import { W, NARR } from './timing/timing.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const out = process.argv[2];
if (!out) { console.error('用法：node build-music.mjs <輸出.wav>'); process.exit(1); }
const SR = 48000, LEN = Math.ceil(W(245) * 100) / 100;
// 小節長度：讓 0:45（深色段）轉場剛好落在小節線上，速度維持在 98 BPM 左右
const DARK_BAR = Math.round(W(45) / 2.45), BAR = W(45) / DARK_BAR, BEAT = BAR / 4, E8 = BEAT / 2, SWING = .04;
// 段落切換（成片時間 → 小節）：鉤子段結束、深色段開始、第一步開始、最後一個和弦
const CORE_BAR = Math.round(W(19.7) / BAR), STEP_BAR = Math.round(W(98.4) / BAR), END_BAR = Math.floor((LEN - 4.5) / BAR);
// 第二步、幕 31 深色、第三步
const S2_BAR = Math.round(W(160) / BAR), D2_BAR = Math.round(W(182.4) / BAR), D2_END = Math.round(W(189.7) / BAR), S3_BAR = Math.round(W(200) / BAR);
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
function clap() { const n = Math.round(.2 * SR), b = new Float32Array(n), lp = onePole(3500); let prev = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = noise(), hp = x - prev; prev = x; const burst = [0, .008, .016].reduce((s, d) => s + (t >= d ? Math.exp(-(t - d) / (d < .016 ? .004 : .05)) : 0), 0); b[i] = lp(hp) * burst; } return b; }
function snap() { const n = Math.round(.08 * SR), b = new Float32Array(n), lp = onePole(5000); let prev = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = noise(), hp = x - prev; prev = x; b[i] = lp(hp) * Math.exp(-t / .012) * 1.4 + Math.sin(2 * Math.PI * 1800 * t) * Math.exp(-t / .006) * .3; } return b; }
function shaker() { const n = Math.round(.09 * SR), b = new Float32Array(n), lp = onePole(7000); let prev = 0; for (let i = 0; i < n; i++) { const t = i / SR, x = noise(), hp = x - prev; prev = x; b[i] = lp(hp) * Math.min(1, t / .02) * Math.exp(-t / .03); } return b; }
const KICK = kick(), SNARE = snare(), HAT = hat(), CLAP = clap(), SNAP = snap(), SHAKER = shaker();

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

for (let bar = 0; bar <= END_BAR; bar++) {
  const sec = bar >= END_BAR ? 'end' : bar < CORE_BAR ? 'hook' : bar < DARK_BAR ? 'core' : bar < STEP_BAR ? 'dark' : bar < S2_BAR ? 'step'
    : bar < D2_BAR ? 'core' : bar < D2_END ? 'dark' : bar < S3_BAR ? 'core' : 'step';
  const prog = sec === 'dark' ? MINOR : MAJOR, ch = prog[bar % 4], t0 = bar * BAR;
  // 和弦墊底
  if (sec === 'end') { const [l, r] = epChord([48, 55, 59, 62, 64], 4.2, .9); put(l, t0, .15, -.5); put(r, t0, .15, .5); continue; }
  const [l, r] = epChord(ch.pad, BAR, sec === 'dark' ? .6 : 1);
  put(l, t0, .14, -.5); put(r, t0, .14, .5);
  // 旋律
  const mel = sec === 'dark' ? MEL_DARK : (sec === 'step' && Math.floor(bar / 4) % 2 ? MEL_B : (sec === 'core' && bar % 8 >= 4 ? MEL_B : MEL_A));
  const vol = sec === 'hook' ? .17 : sec === 'dark' ? .13 : .16;
  for (const [k, m, v] of mel[bar % 4]) put(marimba(m, v), eighth(bar, k), vol, .15);
  // 知識段、第一步：每個旋律音後面跟一個高八度的小回音，聽起來更跳
  if (sec === 'core' || sec === 'step') for (const [k, m, v] of mel[bar % 4]) put(marimba(m + 12, v * .6), eighth(bar, k) + E8, vol * .35, -.25);
  // 鉤子段最後一小節：木琴往上爬，帶進節奏
  if (bar === CORE_BAR - 1 || bar === S3_BAR - 1) [72, 74, 76, 79].forEach((m, i) => put(marimba(m, .6 + i * .1), eighth(bar, 4 + i), .13, .2));
  const S16 = BEAT / 4;
  // 鉤子段：彈指在 2、4 拍，沙鈴八分音符，輕輕把節奏帶起來
  if (sec === 'hook') {
    if (bar >= 2) { put(SNAP, t0 + BEAT, .1, .25); put(SNAP, t0 + 3 * BEAT, .1, .25); }
    if (bar >= 4) for (let k = 0; k < 8; k++) put(SHAKER, eighth(bar, k), k % 2 ? .04 : .025, -.35);
    if (bar >= 4) put(bass(ch.root, BEAT * 1.6), t0, .14);
    continue;
  }
  if (sec !== 'dark') {
    // 大鼓：1、2&、3、4& 的跳躍型；小鼓＋拍手在 2、4 拍
    put(KICK, t0, .34); put(KICK, t0 + BEAT + E8, .2); put(KICK, t0 + 2 * BEAT, .3); put(KICK, t0 + 3 * BEAT + E8, .18);
    put(SNARE, t0 + BEAT, .09, .1); put(SNARE, t0 + 3 * BEAT, .09, .1);
    put(CLAP, t0 + BEAT, .12, -.1); put(CLAP, t0 + 3 * BEAT, .12, -.1);
    for (let k = 0; k < 8; k++) put(HAT, eighth(bar, k), k % 2 ? .04 : .055, -.3);
    if (sec === 'step') for (let k = 0; k < 16; k++) put(SHAKER, t0 + k * S16, k % 4 === 2 ? .045 : .025, .35);
    // 貝斯：八分音符根音、八度跳動
    [0, 1, 2, 3, 4, 5, 6, 7].forEach(k => put(bass(ch.root + (k % 4 === 3 ? 12 : k === 6 ? 7 : 0), E8 * .85), eighth(bar, k), k % 2 ? .12 : .17));
  } else {
    put(KICK, t0, .3); put(KICK, t0 + 2 * BEAT + E8, .22);
    put(SNAP, t0 + BEAT, .07, .2); put(SNAP, t0 + 3 * BEAT, .07, .2);
    put(bass(ch.root, BEAT * 1.6), t0, .17); put(bass(ch.root + 7, BEAT * .8), t0 + 2.5 * BEAT, .11);
    for (let k = 0; k < 8; k++) put(HAT, eighth(bar, k), k % 2 ? .02 : .03, -.3);
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
