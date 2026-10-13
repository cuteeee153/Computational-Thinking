# 把加速後的旁白依 gaps.json 插入停頓，輸出成片用的旁白音軌與成片時間軸。
# 用法：python3 place.py <輸出旁白.wav> <總長秒數>
# 讀：audio/narration-1.5x.wav、audio/timeline.json、gaps.json
# 寫：<輸出旁白.wav>（48kHz 立體聲，從 0 秒開始，已含開頭留白與插入的停頓）、audio/timeline-placed.json
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out, total = sys.argv[1], float(sys.argv[2])
tl = json.load(open(f'{here}/audio/timeline.json'))
gaps = sorted(json.load(open(f'{here}/gaps.json'))['gaps'], key=lambda g: g['at'])
w = wave.open(f'{here}/audio/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
shift = lambda t: t + sum(g['add'] for g in gaps if g['at'] <= t)
# 音軌：開頭留白 offset，之後每到一個停頓點就插入空白
parts, cur = [np.zeros(int(tl['offset'] * sr), np.int16)], 0
for g in gaps:
    cut = int((g['at'] - tl['offset']) * sr)
    parts += [x[cur:cut], np.zeros(int(g['add'] * sr), np.int16)]; cur = cut
parts.append(x[cur:])
y = np.concatenate(parts)
n = int(total * sr); y = np.pad(y, (0, max(0, n - len(y))))[:n]
st = np.repeat(y[:, None], 2, axis=1)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(st.tobytes()); o.close()
for l in tl['lines']:
    for p in l['phrases']: p['t0'], p['t1'] = round(shift(p['t0']), 3), round(shift(p['t1']), 3)
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
tl['gaps'] = gaps
json.dump(tl, open(f'{here}/audio/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
print(f'旁白音軌 {total:.2f} 秒（插入 {len(gaps)} 個停頓，共 {sum(g["add"] for g in gaps):.1f} 秒）→ {out}；最後一句結束於 {tl["lines"][-1]["t1"]:.2f} 秒')
