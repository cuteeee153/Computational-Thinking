# 把重錄的句子剪進原本的錄音：依 splice.json 接成新的 mp3（原速），之後再用 align.py 對時。
# 用法：python3 splice.py
import json, os, subprocess
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
SR = 48000
def load(f):
    raw = subprocess.run(['ffmpeg', '-loglevel', 'error', '-i', f'{here}/{f}', '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.int16)
cache = {}
for out, segs in json.load(open(f'{here}/splice.json'))['outputs'].items():
    parts = []
    for s in segs:
        if isinstance(s, dict): parts.append(np.zeros(int(s['silence'] * SR), np.int16)); continue
        f, a, b = s[:3]
        x = cache.setdefault(f, load(f))
        y = x[int(a * SR):int(b * SR)].astype(np.float32)
        n = int(.01 * SR); y[:n] *= np.linspace(0, 1, n); y[-n:] *= np.linspace(1, 0, n)   # 切點淡入淡出 10 毫秒，避免爆音
        parts.append(y.astype(np.int16))
    y = np.concatenate(parts)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-f', 's16le', '-ar', str(SR), '-ac', '1', '-i', '-', '-c:a', 'libmp3lame', '-b:a', '192k', f'{here}/{out}'], input=y.tobytes(), check=True)
    print(f'{out}：{len(y) / SR:.2f} 秒（{len(segs)} 段）')
