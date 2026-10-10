// 旁白字幕 → SRT（時間是成片時間，來自 timing/narration.json；由 build-timing.mjs 產生）
// 用法：node build-srt.mjs intro > ../../video/intro-0000-0045.srt   （0:00 到 0:45 轉場）
//       node build-srt.mjs part2 > ../../video/part2-0045-0240.srt   （0:45 轉場之後，時間從 0 開始）
//       node build-srt.mjs part3 > ../../video/part3-0240-0405.srt   （2:40 轉場之後，時間從 0 開始；旁白還沒錄，時間是預估）
//       node build-srt.mjs part4 > ../../video/part4-0405-0430.srt   （4:05 之後）
//       node build-srt.mjs all   > ../../video/full-0000-0430.srt    （整支）
// 字幕編號整支連續。
import { W, NARR } from './timing/timing.mjs';

const part = process.argv.slice(2).find(a => !a.startsWith('--')) || 'all';
const cut = W(45), cut2 = W(160), cut3 = W(245);
const ts = t => {
  const ms = Math.round(Math.max(0, t) * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};
const rows = NARR.captions.map((c, i) => [i + 1, ...c])
  .filter(([, a]) => part === 'all' || (part === 'intro' ? a < cut : part === 'part2' ? a >= cut && a < cut2 : part === 'part3' ? a >= cut2 && a < cut3 : a >= cut3));
const shift = { part2: cut, part3: cut2, part4: cut3 }[part] || 0;
process.stdout.write(rows.map(([n, a, b, text]) => `${n}\n${ts(a - shift)} --> ${ts(b - shift)}\n${text}\n`).join('\n'));
