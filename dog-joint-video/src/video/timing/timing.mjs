// 成片時間的共用工具（給 node 腳本用；頁面用 build-timing.mjs 產生的 timing.js）
//   W(t)：設計時間 → 成片時間（依 warp.json 的對照點線性換算，最後一點之後平移）
//   NARR：narration.json（字幕與各幕旁白，都是成片時間）
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
export const WARP = JSON.parse(fs.readFileSync(path.join(here, 'warp.json'), 'utf8')).anchors;
export function W(t) {
  const a = WARP;
  if (t <= a[0][0]) return t - a[0][0] + a[0][1];
  for (let i = 1; i < a.length; i++)
    if (t <= a[i][0]) return a[i - 1][1] + (t - a[i - 1][0]) * (a[i][1] - a[i - 1][1]) / (a[i][0] - a[i - 1][0]);
  return t - a[a.length - 1][0] + a[a.length - 1][1];
}
export const NARR = fs.existsSync(path.join(here, 'narration.json')) ? JSON.parse(fs.readFileSync(path.join(here, 'narration.json'), 'utf8')) : { captions: [], scenes: {} };
