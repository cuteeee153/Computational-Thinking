// 旁白字幕 → SRT（時間是成片時間，來自 timing/narration.json；由 build-timing.mjs 產生）
// 用法：node build-srt.mjs intro > ../../video/intro-0000-0045.srt   （0:00 到 0:45 轉場）
//       node build-srt.mjs part2 > ../../video/part2-0045-0240.srt   （0:45 轉場之後，時間從 0 開始）
//       node build-srt.mjs all   > ../../video/full-0000-0240.srt    （整支）
// 字幕編號整支連續。
import { W, NARR } from './timing/timing.mjs';

const part = process.argv.slice(2).find(a => !a.startsWith('--')) || 'all';
const cut = W(45);
const ts = t => {
  const ms = Math.round(Math.max(0, t) * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const rows = NARR.captions.map((c, i) => [i + 1, ...c])
  .filter(([, a]) => part === 'all' || (part === 'intro' ? a < cut : a >= cut));
const shift = part === 'part2' ? cut : 0;
process.stdout.write(rows.map(([n, a, b, text]) => `${n}\n${ts(a - shift)} --> ${ts(b - shift)}\n${text}\n`).join('\n'));
