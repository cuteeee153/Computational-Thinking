// 成片時間的共用工具（給 node 腳本用；頁面用 build-timing.mjs 產生的 timing.js）
//   W(t)：設計時間 → 成片時間（依 warp.json 的對照點線性換算，最後一點之後平移，再加上開場頁長度 LEAD）
//   NARR：narration.json（字幕與各幕旁白，都是成片時間）
import fs from 'node:fs';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const warpJson = JSON.parse(fs.readFileSync(path.join(here, 'warp.json'), 'utf8'));
// LEAD：最前面插入的開場痛點頁（幕 00）長度；warp.json 的對照點不含它，成片時間＝對照點換算＋LEAD
export const LEAD = warpJson.lead || 0;
export const WARP = warpJson.anchors.map(([d, o]) => [d, o + LEAD]);
export const WI = t => W(t) - LEAD;   // 不含開場頁的時間（narration/ 的 place*.py 用這個時間軸）
export function W(t) {
  const a = WARP;
  if (t <= a[0][0]) return t - a[0][0] + a[0][1];
  for (let i = 1; i < a.length; i++)
    if (t <= a[i][0]) return a[i - 1][1] + (t - a[i - 1][0]) * (a[i][1] - a[i - 1][1]) / (a[i][0] - a[i - 1][0]);
  return t - a[a.length - 1][0] + a[a.length - 1][1];
}
export const NARR = fs.existsSync(path.join(here, 'narration.json')) ? JSON.parse(fs.readFileSync(path.join(here, 'narration.json'), 'utf8')) : { captions: [], scenes: {} };
