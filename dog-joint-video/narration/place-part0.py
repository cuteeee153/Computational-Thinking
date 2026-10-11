# 開場痛點頁（幕 00）的旁白：放在整支影片最前面，並把整段長度寫進 warp.json 的 lead。
# 用法：python3 place-part0.py <輸出旁白.wav>    （最後跑：在 place-part5.py、place-part6.py 之後）
# 讀：audio-part0/narration-1.5x.wav、audio-part0/timeline.json、part0-anchors.json、../src/video/timing/warp.json
# 寫：<輸出旁白.wav>（從成片 0 秒開始，長＝整段長度）、audio-part0/timeline-placed.json、
#     warp.json：lead＝整段長度；[after, …]（part5 結尾）、[start, －lead]（這一段從成片 0 秒開始；warp.json 的時間不含 lead）
#     （成片時間＝warp.json 換算＋lead，見 src/video/timing/timing.mjs）
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
FPS = 30
tl = json.load(open(f'{here}/audio-part0/timeline.json'))
cfg = json.load(open(f'{here}/part0-anchors.json'))
wp = f'{here}/../src/video/timing/warp.json'; warp = json.load(open(wp))
w = wave.open(f'{here}/audio-part0/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
L = round((cfg['lead'] + len(x) / sr + cfg['tail']) * FPS) / FPS
y = np.concatenate([np.zeros(int(cfg['lead'] * sr), np.int16), x]); y = np.pad(y, (0, int(L * sr) - len(y)))
an = [a for a in warp['anchors'] if a[0] < cfg['after'] - 1e-6]
last = an[-1]
an += [[cfg['after'], round(last[1] + cfg['after'] - last[0], 4)], [cfg['start'], -L]]
warp['anchors'] = an; warp['lead'] = L
json.dump(warp, open(wp, 'w'), ensure_ascii=False, indent=1)
for l in tl['lines']:
    for p in l['phrases']: p['t0'], p['t1'] = round(-L + cfg['lead'] + p['t0'], 3), round(-L + cfg['lead'] + p['t1'], 3)   # warp.json 的時間軸（不含 lead）
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
tl['placedAt'] = -L; tl['length'] = L
json.dump(tl, open(f'{here}/audio-part0/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.repeat(y[:, None], 2, axis=1).tobytes()); o.close()
print(f'開場痛點頁：長 {L:.3f} 秒（設計時間 {cfg["start"]}–{cfg["start"] + L:.2f}），其他段落往後挪 {L:.3f} 秒')
for p in tl['lines'][0]['phrases']: print(f'  設計 {cfg["start"] + p["t0"] + L:7.2f}  {p["text"]}')
