# 旁白音軌：照 timing/timing.json，把每一幕的錄音片段（narration/work/ 裡加速後的錄音）放到它在成片裡的位置。
# 用法：python3 narration/build-narration.py <輸出.wav>
# 片段頭尾各做 10ms 淡入淡出，避免接點有爆音；還沒錄音的幕是靜音。
import json, os, sys, wave
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
T = json.load(open(f'{here}/../timing/timing.json', encoding='utf-8'))
SR = 48000
y = np.zeros(int(T['total'] * SR) + SR, np.float32)
cache, n = {}, 0
for sc in T['scenes']:
    a = sc.get('audio')
    if not a: continue
    if a['src'] not in cache:
        w = wave.open(f'{here}/work/{a["src"]}'); assert w.getframerate() == SR
        cache[a['src']] = np.frombuffer(w.readframes(w.getnframes()), np.int16).astype(np.float32) / 32768
    for g in a.get('segs') or [a]:   # 有停頓的幕會切成好幾段
        x = cache[a['src']][int(g['cut'][0] * SR):int(g['cut'][1] * SR)].copy()
        f = int(.01 * SR); x[:f] *= np.linspace(0, 1, f); x[-f:] *= np.linspace(1, 0, f)
        o = int(g['at'] * SR); y[o:o + len(x)] += x[:len(y) - o]
    n += 1
y = y[:int(T['total'] * SR)]
o = wave.open(sys.argv[1], 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(SR)
o.writeframes(np.repeat((np.clip(y, -1, 1) * 32767).astype('<i2')[:, None], 2, axis=1).tobytes()); o.close()
print(f'旁白：{n} 幕有錄音 → {sys.argv[1]}')
