# 從白底素材圖切出每一隻狗：從邊緣灌水找出背景白（狗身上被線圍住的白毛保留），再找出各個連通塊
import sys, numpy as np
from PIL import Image, ImageDraw, ImageFilter
from collections import deque
src, out = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB'); a = np.asarray(im).astype(int)
W, H = im.size
white = (a.min(axis=2) > 228) & ((a.max(axis=2) - a.min(axis=2)) < 22)
# 灌水：從四邊連到的白色才是背景
bg = np.zeros_like(white); q = deque()
for x in range(W):
    for y in (0, H - 1):
        if white[y, x] and not bg[y, x]: bg[y, x] = 1; q.append((y, x))
for y in range(H):
    for x in (0, W - 1):
        if white[y, x] and not bg[y, x]: bg[y, x] = 1; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1,0),(-1,0),(0,1),(0,-1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < H and 0 <= nx < W and white[ny, nx] and not bg[ny, nx]:
            bg[ny, nx] = 1; q.append((ny, nx))
fg = ~bg.astype(bool)
# 連通塊（4 倍縮小找框）
s = 4; small = fg.reshape(H // s, s, W // s, s).any(axis=(1, 3))
h, w = small.shape; lab = np.zeros(small.shape, int); n = 0; boxes = []
for y0 in range(h):
    for x0 in range(w):
        if small[y0, x0] and not lab[y0, x0]:
            n += 1; lab[y0, x0] = n; q = deque([(y0, x0)]); ys = [y0]; xs = [x0]; cnt = 0
            while q:
                y, x = q.popleft(); cnt += 1
                for dy in (-2,-1,0,1,2):
                    for dx in (-2,-1,0,1,2):
                        ny, nx = y + dy, x + dx
                        if 0 <= ny < h and 0 <= nx < w and small[ny, nx] and not lab[ny, nx]:
                            lab[ny, nx] = n; q.append((ny, nx)); ys.append(ny); xs.append(nx)
            if cnt > 150: boxes.append((min(xs)*s, min(ys)*s, (max(xs)+1)*s, (max(ys)+1)*s, cnt, n))
# 透明度：背景 0，邊緣依亮度柔化
alpha = np.where(bg, 0, 255).astype(np.uint8)
am = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(.7))
rgba = im.copy(); rgba.putalpha(am)
# 每一塊只留自己的像素（把框裡鄰居的尾巴、腳和小雜點去掉）
full = np.kron(lab, np.ones((s, s), int))
for i, (x0, y0, x1, y1, c, k) in enumerate(sorted(boxes, key=lambda b: (b[1] // 200, b[0]))):
    pad = 6
    box = (max(0, x0 - pad), max(0, y0 - pad), min(W, x1 + pad), min(H, y1 + pad))
    own = Image.fromarray(np.where(full == k, 255, 0).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
    a2 = np.minimum(np.asarray(am), np.asarray(own))
    one = im.copy(); one.putalpha(Image.fromarray(a2))
    one.crop(box).save(f'{out}-{i:02d}.png')
    print(i, box, c)
