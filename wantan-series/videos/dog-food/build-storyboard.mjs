// 產生「分鏡修改板」：每一幕的資料、關鍵畫面、預覽短片，寫成一個資料夾（index.html＋frames/＋clips/），直接發布成 Artifact。
// 用法：node build-storyboard.mjs <整支影片.mp4> <輸出資料夾> [版本說明]
//       加上 --upto <秒>：影片只輸出到這裡（例如 make.sh part 的第一段），只更新這之前的幕的預覽短片，後面的幕保留上一版的短片
//       加上 --from <秒>：影片從成片的這一秒開始（make.sh part／seg 輸出的中間某一段），只更新這段裡的幕
//       --seg <K>：只更新第 K 段（script.json 的 segments），影片預設用 out/preview-720p-K.mp4，例如 node build-storyboard.mjs --seg 2 board "v5：第二段"
// 每一幕的畫面說明、動畫、音效都直接從動畫頁讀（video.html 跑起來之後的 window.SCENES），秒數一律是成片時間。
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { chromium } from '/opt/node-tools/node_modules/playwright/index.mjs';

const here = path.dirname(new URL(import.meta.url).pathname);
const argv = process.argv.slice(2), opt = k => { const i = argv.indexOf(k); return i >= 0 ? argv.splice(i, 2)[1] : null; };
const T = JSON.parse(fs.readFileSync(path.join(here, 'timing/timing.json'), 'utf8'));
// 分段：script.json 的 segments 是每一段第一幕的幕號（沒寫就整支一段）
const SEGIDS = JSON.parse(fs.readFileSync(path.join(here, 'script.json'), 'utf8')).segments || [T.scenes[0].id];
const segRange = k => { const i = T.scenes.findIndex(s => s.id === SEGIDS[k - 1]), j = k < SEGIDS.length ? T.scenes.findIndex(s => s.id === SEGIDS[k]) : -1;
  return [k === 1 ? 0 : T.scenes[i].start, j >= 0 ? T.scenes[j].start : T.total]; };
const SEG = opt('--seg');
const up = opt('--upto');
let FROM = +(opt('--from') || 0), UPTO = up != null ? +up : Infinity;
if (SEG) [FROM, UPTO] = segRange(+SEG);
if (SEG && !/\.mp4$/i.test(argv[0] || '')) argv.unshift(path.join(here, `out/preview-720p-${SEG}.mp4`));
const [video, out, note = ''] = argv;
if (!video || !out) { console.error('用法：node build-storyboard.mjs <影片.mp4> <輸出資料夾> [版本說明]'); process.exit(1); }
const PARTIAL = FROM > 0 || UPTO < Infinity;
for (const d of PARTIAL ? ['frames'] : ['frames', 'clips']) { fs.rmSync(path.join(out, d), { recursive: true, force: true }); fs.mkdirSync(path.join(out, d), { recursive: true }); }
fs.mkdirSync(path.join(out, 'clips'), { recursive: true });   // 第一版只用分段輸出時，clips 資料夾還不存在
const fmtM = t => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`;

// 關鍵畫面：從動畫頁截圖（半解析度）
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: .5 });
await p.goto('file://' + path.join(here, 'video.html'));
await p.waitForFunction(() => window.SCENES);
const scenes = await p.evaluate(() => window.SCENES);
for (const s of scenes) {
  await p.evaluate(t => seek(t), s.key);
  await p.screenshot({ path: path.join(out, 'frames', s.id + '.jpg'), type: 'jpeg', quality: 86 });
}
await b.close();
// 預覽短片：從成品影片切出每一幕
// 只更新部分時：刪掉已經不存在的幕的短片
if (PARTIAL) for (const f of fs.readdirSync(path.join(out, 'clips'))) if (!scenes.some(s => s.id + '.mp4' === f)) fs.rmSync(path.join(out, 'clips', f));
for (const s of scenes.filter(s => s.start >= FROM - .05 && s.end <= UPTO + .05))
  execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-ss', String(Math.max(0, s.start - FROM)), '-to', String(s.end - FROM), '-i', video,
    '-vf', 'scale=960:-2', '-c:v', 'libx264', '-crf', '27', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart',
    path.join(out, 'clips', s.id + '.mp4')]);

// 分組：script.json 裡寫了 group 的幕開始一組新的
const parts = [];
for (const s of scenes) {
  const g = s.group || '影片';
  if (!parts.length || parts[parts.length - 1].title !== g) parts.push({ id: 'g' + parts.length, title: g, start: parts.length ? s.start : 0, end: s.end });
  else parts[parts.length - 1].end = s.end;
  s.part = parts[parts.length - 1].id;
}
const segs = SEGIDS.map((id, k) => { const [a, z] = segRange(k + 1), in_ = scenes.filter(s => s.start >= a - .05 && s.end <= z + .05);
  in_.forEach(s => { s.seg = k + 1; }); return { n: k + 1, first: in_[0]?.id, last: in_.at(-1)?.id, start: a, end: z, label: `${fmtM(a)}–${fmtM(z)}` }; });
const prev = fs.existsSync(path.join(out, 'storyboard.json')) ? JSON.parse(fs.readFileSync(path.join(out, 'storyboard.json'))) : null;
const data = {
  version: (prev?.version || 0) + 1, updatedAt: new Date().toISOString(), note, title: T.title,
  segments: segs,
  parts: parts.map(({ id, title, start, end }) => ({ id, label: `${fmtM(start)}–${fmtM(end)}　${title}`, start, end })),
  scenes: scenes.map(s => ({ id: s.id, title: s.title, start: +s.start.toFixed(2), end: +s.end.toFixed(2), file: s.draft ? '（還沒做畫面）' : `scenes/${s.id}`,
    part: s.part, seg: s.seg, visuals: s.visuals, motions: s.motions, sfx: s.sfx, narration: s.narration, narrationTimes: s.narrationTimes })),
};
fs.writeFileSync(path.join(out, 'storyboard.json'), JSON.stringify(data, null, 1));
const tpl = fs.readFileSync(path.join(here, 'storyboard.template.html'), 'utf8');
fs.writeFileSync(path.join(out, 'index.html'), tpl.replaceAll('__TITLE__', T.title).replaceAll('__LENGTH__', fmtM(T.total))
  .replace('/*__DATA__*/null', JSON.stringify(data).replace(/</g, '\\u003c')));
// 發布用的檔案清單（Artifact 的 files 參數）
fs.writeFileSync(path.join(out, 'files.json'), JSON.stringify(Object.fromEntries(['frames', 'clips'].flatMap(d => fs.readdirSync(path.join(out, d)).sort().map(f => [`${d}/${f}`, `${d}/${f}`])))));
console.log(`分鏡板 v${data.version}：${scenes.length} 幕 → ${out}`);
