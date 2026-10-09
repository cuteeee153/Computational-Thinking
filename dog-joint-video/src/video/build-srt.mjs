// 從每一幕的 narration 產生 SRT，字幕和動畫共用同一份時間。
// 用法：node build-srt.mjs intro > ../../video/intro-0000-0045.srt   （0:00–0:45，intro/scenes/）
//       node build-srt.mjs part2 > ../../video/part2-0045-0240.srt   （0:45–2:40，part2/scenes/）
//       node build-srt.mjs all   > ../../video/full-0000-0240.srt    （整支）
//       加上 --table              列出每一幕的時間與旁白
// 字幕編號整支連續（part2 從 intro 的最後一號接下去）。
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const here = path.dirname(new URL(import.meta.url).pathname);
const part = process.argv.slice(2).find(a => !a.startsWith('--')) || 'intro';
const scenes = [];
for (const name of ['intro', 'part2']) {
  const dir = path.join(here, name, 'scenes');
  const sandbox = { Intro: { scene: def => scenes.push({ ...def, part: name }) } };
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
    vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
}
scenes.sort((a, b) => a.start - b.start);
const keep = s => part === 'all' || s.part === part;

const ts = t => {
  const ms = Math.round(t * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};

if (process.argv.includes('--table')) {
  for (const s of scenes.filter(keep))
    console.log(`幕 ${s.id}  ${s.start.toFixed(1).padStart(4)}–${String(s.end.toFixed(1)).padEnd(4)}  ${s.title}` +
      (s.narration.length ? `\n         🎙 ${s.narration.map(n => n[2]).join('')}` : ''));
} else {
  let i = 0;
  const out = scenes.flatMap(s => s.narration.map(n => [++i, s, ...n]))
    .filter(([, s]) => keep(s)).map(([n, , a, b, text]) => `${n}\n${ts(a)} --> ${ts(b)}\n${text}\n`);
  process.stdout.write(out.join('\n'));
}
