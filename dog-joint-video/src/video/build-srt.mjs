// 旁白字幕 → SRT（時間是成片時間，來自 timing/narration.json；由 build-timing.mjs 產生）
// 用法：node build-srt.mjs > ../../video/full.srt   （整支；品種對照表插在第一步中間，所以不再分段輸出）
import { NARR } from './timing/timing.mjs';

const ts = t => {
  const ms = Math.round(Math.max(0, t) * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
process.stdout.write(NARR.captions.map(([a, b, text], i) => `${i + 1}\n${ts(a)} --> ${ts(b)}\n${text}\n`).join('\n'));
