# 真實畫面（幕 44）的旁白：放在第三步回顧之後，並寫好 warp.json 的對照點。
# 用法：python3 place-part5.py <輸出旁白.wav>    （要在 place-part3.py 之後跑：用到 part3 結尾的成片時間）
# 讀：audio-part5/narration-1.5x.wav、audio-part5/timeline.json（align.py 對時結果，offset 0）、part5-anchors.json、
#     ../src/video/timing/warp.json
# 寫：<輸出旁白.wav>（這一段的旁白，從 part3 結尾開始，長 length 秒）、audio-part5/timeline-placed.json（成片時間）、
#     warp.json：[start, P]（P＝part3 結尾的成片時間；之後的設計時間一秒對一秒，收尾幕也照這個走）
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
tl = json.load(open(f'{here}/audio-part5/timeline.json'))
cfg = json.load(open(f'{here}/part5-anchors.json'))
wp = f'{here}/../src/video/timing/warp.json'; warp = json.load(open(wp))
P = [a for a in warp['anchors'] if abs(a[0] - cfg['after']) < 1e-6][0][1]
w = wave.open(f'{here}/audio-part5/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
assert cfg['lead'] + len(x) / sr < cfg['length'] - .5, '旁白比真實畫面長，請把 length 調長'
y = np.concatenate([np.zeros(int(cfg['lead'] * sr), np.int16), x]); y = np.pad(y, (0, int(cfg['length'] * sr) - len(y)))
for l in tl['lines']:
    for p in l['phrases']: p['t0'], p['t1'] = round(P + cfg['lead'] + p['t0'], 3), round(P + cfg['lead'] + p['t1'], 3)
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
tl['placedAt'] = P; tl['length'] = cfg['length']; tl['lead'] = cfg['lead']
json.dump(tl, open(f'{here}/audio-part5/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
warp['anchors'] = [a for a in warp['anchors'] if a[0] < cfg['start']] + [[cfg['start'], P]]
json.dump(warp, open(wp, 'w'), ensure_ascii=False, indent=1)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.repeat(y[:, None], 2, axis=1).tobytes()); o.close()
print(f'真實畫面：從成片 {P:.3f} 秒開始，長 {cfg["length"]} 秒（設計時間 {cfg["start"]}–{cfg["start"] + cfg["length"]}）')
for p in tl['lines'][0]['phrases']: print(f'  設計 {cfg["start"] + p["t0"] - P:7.2f}  {p["text"]}')
