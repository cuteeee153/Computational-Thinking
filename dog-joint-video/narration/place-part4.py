# 品種對照表（幕 38–43）的旁白：插在幕 23「屬於特定的好發品種、」之後。
# 用法：python3 place-part4.py <輸出旁白.wav>
# 讀：audio-part4/narration-1.5x.wav、audio-part4/timeline.json（align.py 對時結果，offset 0）、part4-anchors.json、
#     gaps.json、../src/video/timing/warp.json
# 寫：<輸出旁白.wav>（這一段的旁白，從插入點開始，長度＝整段長度）、audio-part4/timeline-placed.json（成片時間）、
#     gaps.json 裡插入點那一筆（add＝整段長度）、warp.json：
#       [after, H]、[after+0.01, H＋整段長度]（幕 23 在插入點停住，品種表播完再接著走）、
#       設計時間 after 之後（到第二、三步結束）的對照點跟著平移、[245, H]（品種表從 H 開始）
#     H＝插入點的成片時間。整段長度改變時（重錄）重跑這支，之後再跑 place-part3.py、place.py
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
FPS = 30
tl = json.load(open(f'{here}/audio-part4/timeline.json'))
cfg = json.load(open(f'{here}/part4-anchors.json'))
gp = f'{here}/gaps.json'; gaps = json.load(open(gp))
wp = f'{here}/../src/video/timing/warp.json'; warp = json.load(open(wp))
w = wave.open(f'{here}/audio-part4/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
gl = {g['line']: g['add'] for g in cfg['gaps']}
parts, cur, shift = [np.zeros(int(cfg['lead'] * sr), np.int16)], 0, cfg['lead']
for l in tl['lines']:
    add = gl.get(l['line'], 0)
    if add:
        cut = int(max(0, l['phrases'][0]['t0'] - .1) * sr)
        parts += [x[cur:cut], np.zeros(int(add * sr), np.int16)]; cur = cut; shift += add
    for p in l['phrases']: p['t0'], p['t1'] = p['t0'] + shift, p['t1'] + shift
parts.append(x[cur:])
y = np.concatenate(parts)
G = round((len(y) / sr + cfg['tail']) * FPS) / FPS      # 整段長度（對齊影格）
y = np.pad(y, (0, int(G * sr) - len(y)))
# 插入點：gaps.json 裡 at 相同的那一筆（沒有就新增）
g = next((g for g in gaps['gaps'] if abs(g['at'] - cfg['at']) < 1e-3), None)
old = g['add'] if g else 0
if not g:
    g = {'at': cfg['at'], 'add': G, 'why': '「屬於特定的好發品種、」之後：插入品種對照表（幕 38–43，長度由 place-part4.py 算）'}
    gaps['gaps'].append(g); gaps['gaps'].sort(key=lambda g: g['at'])
g['add'] = G
json.dump(gaps, open(gp, 'w'), ensure_ascii=False, indent=1)
# H：插入點的成片時間（加上開頭留白之前的停頓）
H = round((cfg['at'] + sum(q['add'] for q in gaps['gaps'] if q['at'] < cfg['at'])) * FPS) / FPS
A = cfg['after']
an = [a for a in warp['anchors'] if a[0] < A]
rest = [a for a in warp['anchors'] if A + .01 < a[0] < cfg['start']]
if old == 0: assert all(a[0] > A + .01 for a in rest)
an += [[A, H], [A + .01, round(H + G, 4)]] + [[a[0], round(a[1] + G - old, 4)] for a in rest] + [[cfg['start'], H]]
warp['anchors'] = an
json.dump(warp, open(wp, 'w'), ensure_ascii=False, indent=1)
for l in tl['lines']:
    for p in l['phrases']: p['t0'], p['t1'] = round(H + p['t0'], 3), round(H + p['t1'], 3)
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
tl['placedAt'] = H; tl['length'] = G; tl['lead'] = cfg['lead']; tl['gaps'] = cfg['gaps']
json.dump(tl, open(f'{here}/audio-part4/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.repeat(y[:, None], 2, axis=1).tobytes()); o.close()
print(f'品種對照表：從成片 {H:.3f} 秒開始，長 {G:.3f} 秒（設計時間 {cfg["start"]}–{cfg["start"] + G:.2f}）')
for l in tl['lines']:
    for p in l['phrases']: print(f'  設計 {cfg["start"] + p["t0"] - H:7.2f}  成片 {p["t0"]:7.2f}  {p["text"]}')
