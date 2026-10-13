# 從品種頭貼素材圖（4 欄 × 3 列）切出每一顆頭：找出每格裡和紙張底色不同的範圍，裁成正方形
# 用法：python3 cut.py <素材.jpg> <輸出前綴>   → <前綴>-r{列}c{欄}.png（列、欄從 1 開始）
import sys, numpy as np
from PIL import Image
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int)
H, W = a.shape[:2]
paper = np.median(a.reshape(-1, 3), axis=0)
ink = (np.abs(a - paper).sum(axis=2) > 60)
# 列的分界：找整列幾乎沒有墨的地方
rows = ink.sum(axis=1) > 6
bands, inb = [], False
for y in range(H):
    if rows[y] and not inb: y0 = y; inb = True
    if not rows[y] and inb:
        if y - y0 > 120: bands.append((y0, y))
        inb = False
if inb: bands.append((y0, H))
for r, (y0, y1) in enumerate(bands):
    cols = ink[y0:y1].sum(axis=0) > 3
    segs, ins = [], False
    for x in range(W):
        if cols[x] and not ins: x0 = x; ins = True
        if not cols[x] and ins:
            if x - x0 > 120: segs.append((x0, x))
            ins = False
    if ins: segs.append((x0, W))
    for c, (x0, x1) in enumerate(segs):
        ys = np.where(ink[y0:y1, x0:x1].sum(axis=1) > 2)[0]
        top, bot = y0 + ys[0], y0 + ys[-1]
        cx, side = (x0 + x1) / 2, max(x1 - x0, bot - top) + 16
        cy = (top + bot) / 2
        box = (int(cx - side / 2), int(cy - side / 2), int(cx + side / 2), int(cy + side / 2))
        Image.open(src).convert('RGB').crop(box).resize((320, 320), Image.LANCZOS).save(f'{out}-r{r + 1}c{c + 1}.png')
    print(r + 1, len(segs), (y0, y1))
