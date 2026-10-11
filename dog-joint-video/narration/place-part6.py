# 收尾幕（幕 45）的旁白：放在真實畫面之後（設計時間＝draft-part6.json 的 start，開口前留白＝pre）。
# 用法：python3 place-part6.py <輸出旁白.wav>    （要在 place-part5.py 之後跑）
# 讀：audio-part6/narration-1.5x.wav、audio-part6/timeline.json（align.py 對時結果，offset 0）、draft-part6.json、warp.json
# 寫：<輸出旁白.wav>（從收尾幕開始）、audio-part6/timeline-placed.json（成片時間）
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
tl = json.load(open(f'{here}/audio-part6/timeline.json'))
d = json.load(open(f'{here}/draft-part6.json')); lead = d['scenes'][0]['pre']
a = json.load(open(f'{here}/../src/video/timing/warp.json'))['anchors'][-1]
assert d['start'] >= a[0]
P = round(a[1] + d['start'] - a[0], 4)      # 最後一個對照點之後，設計時間一秒對一秒
w = wave.open(f'{here}/audio-part6/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
y = np.concatenate([np.zeros(int(lead * sr), np.int16), x])
for l in tl['lines']:
    for p in l['phrases']: p['t0'], p['t1'] = round(P + lead + p['t0'], 3), round(P + lead + p['t1'], 3)
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
tl['placedAt'] = P; tl['lead'] = lead
json.dump(tl, open(f'{here}/audio-part6/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.repeat(y[:, None], 2, axis=1).tobytes()); o.close()
print(f'收尾旁白：從成片 {P:.3f} 秒開始（設計時間 {d["start"]}），長 {len(y) / sr:.2f} 秒')
for p in tl['lines'][0]['phrases']: print(f'  設計 {d["start"] + p["t0"] - P:7.2f}  {p["text"]}')
