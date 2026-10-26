# 真實畫面的人臉模糊：依 assets/footage/blur.json 的位置（每 0.5 秒標一次，中間內插），把原檔裡的人臉用柔邊橢圓模糊。
# 用法：python3 blur-faces.py            → assets/footage/source/<原檔名>-blur.mp4（footage.json 改用這個檔）
#       python3 blur-faces.py --check    → out/blur-check-<原檔名>.jpg（每 0.25 秒一格的對照圖，檢查有沒有漏掉）
# 需要：pip install opencv-python-headless numpy
import json, os, subprocess, sys
import cv2, numpy as np
here = os.path.dirname(os.path.abspath(__file__))
F = f'{here}/assets/footage'
cfg = json.load(open(f'{F}/blur.json', encoding='utf-8'))

def box(seg, t):
    k = seg['keys']
    if t <= k[0][0]: return k[0][1:]
    for a, b in zip(k, k[1:]):
        if a[0] <= t <= b[0]:
            p = (t - a[0]) / (b[0] - a[0] or 1)
            return [a[i] + (b[i] - a[i]) * p for i in range(1, 5)]
    return k[-1][1:]

for name, segs in cfg.items():
    if name.startswith('_'): continue
    src = f'{F}/source/{name}'; base = os.path.splitext(name)[0]
    cap = cv2.VideoCapture(src); fps = cap.get(cv2.CAP_PROP_FPS); W = int(cap.get(3)); H = int(cap.get(4))
    check = '--check' in sys.argv
    if not check:
        dst = f'{F}/source/{base}-blur.mp4'
        ff = subprocess.Popen(['ffmpeg', '-y', '-loglevel', 'error', '-f', 'rawvideo', '-pix_fmt', 'bgr24', '-s', f'{W}x{H}', '-r', str(fps), '-i', '-',
                               '-i', src, '-map', '0:v', '-map', '1:a?', '-c:v', 'libx264', '-crf', '16', '-preset', 'slow', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-shortest', dst], stdin=subprocess.PIPE)
    tiles, i = [], 0
    while True:
        ok, f = cap.read()
        if not ok: break
        t = i / fps
        for seg in segs:
            if not (seg['from'] <= t <= seg['to']): continue
            cx, cy, w, h = box(seg, t)
            mask = np.zeros((H, W), np.float32)
            cv2.ellipse(mask, (int(cx), int(cy)), (int(w / 2), int(h / 2)), 0, 0, 360, 1, -1)
            mask = cv2.GaussianBlur(mask, (0, 0), 18)[..., None]
            small = cv2.resize(f, (W // 16, H // 16), interpolation=cv2.INTER_AREA)
            blurred = cv2.GaussianBlur(cv2.resize(small, (W, H), interpolation=cv2.INTER_LINEAR), (0, 0), 12)
            f = (f * (1 - mask) + blurred * mask).astype(np.uint8)
        if check:
            if i % round(fps / 4) == 0:
                g = cv2.resize(f, (480, 270)); cv2.putText(g, f'{t:.2f}s', (10, 260), 0, .9, (0, 0, 255), 2); tiles.append(g)
        else:
            ff.stdin.write(f.tobytes())
        i += 1
    if check:
        os.makedirs(f'{here}/out', exist_ok=True)
        for s in range(0, len(tiles), 24):
            blk = tiles[s:s + 24]; blk += [np.zeros_like(tiles[0])] * (24 - len(blk))
            cv2.imwrite(f'{here}/out/blur-check-{base}-{s // 24}.jpg', np.vstack([np.hstack(blk[r * 4:r * 4 + 4]) for r in range(6)]))
        print(f'{name}：對照圖 out/blur-check-{base}-*.jpg')
    else:
        ff.stdin.close(); ff.wait(); print(f'{name} → source/{base}-blur.mp4')
