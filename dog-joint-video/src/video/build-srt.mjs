// 從 intro/scenes/ 每一幕的 narration 產生 SRT，字幕和動畫共用同一份時間。
// 用法：node build-srt.mjs > ../../video/intro-0000-0045.srt
//       node build-srt.mjs --table    列出每一幕的時間與旁白
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const dir = path.join(path.dirname(new URL(import.meta.url).pathname), 'intro/scenes');
const scenes = [];
const sandbox = { Intro: { scene: def => scenes.push(def) } };
for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.js')).sort())
  vm.runInNewContext(fs.readFileSync(path.join(dir, f), 'utf8'), sandbox, { filename: f });
scenes.sort((a, b) => a.start - b.start);

const ts = t => {
  const ms = Math.round(t * 1000), p = (n, w = 2) => String(n).padStart(w, '0');
  return `${p(Math.floor(ms / 3600000))}:${p(Math.floor(ms / 60000) % 60)}:${p(Math.floor(ms / 1000) % 60)},${p(ms % 1000, 3)}`;
};

if (process.argv.includes('--table')) {
  for (const s of scenes)
    console.log(`幕 ${s.id}  ${s.start.toFixed(1).padStart(4)}–${String(s.end.toFixed(1)).padEnd(4)}  ${s.title}` +
      (s.narration.length ? `\n         🎙 ${s.narration.map(n => n[2]).join('')}` : ''));
} else {
  let i = 0;
  const out = scenes.flatMap(s => s.narration).map(([a, b, text]) => `${++i}\n${ts(a)} --> ${ts(b)}\n${text}\n`);
  process.stdout.write(out.join('\n'));
}
