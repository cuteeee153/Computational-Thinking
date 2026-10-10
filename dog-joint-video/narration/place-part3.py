# 第二步、第三步（2:40 之後）的旁白：照停頓設定放好位置，並把動畫的設計時間對到真正念到的時間。
# 用法：python3 place-part3.py <輸出旁白.wav>
# 讀：audio-part3/narration-1.5x.wav、audio-part3/timeline.json（align.py 對時結果，offset 0）、
#     part3-anchors.json（每個短句在設計時間裡的位置＝動畫照著排的時間；開口前留白與轉場停頓）、
#     ../src/video/timing/warp.json
# 寫：<輸出旁白.wav>（從 W(160) 開始的這段旁白，48kHz 立體聲）、audio-part3/timeline-placed.json（成片時間）、
#     warp.json 裡設計時間 160～end 的對照點（每個短句一個：設計時間 → 真正開口的成片時間）
import json, sys, wave, os
import numpy as np
here = os.path.dirname(os.path.abspath(__file__))
out = sys.argv[1]
tl = json.load(open(f'{here}/audio-part3/timeline.json'))
cfg = json.load(open(f'{here}/part3-anchors.json'))
wp = f'{here}/../src/video/timing/warp.json'
warp = json.load(open(wp))
anchors = [a for a in warp['anchors'] if a[0] <= cfg['start']]
later = [a for a in warp['anchors'] if a[0] >= cfg['end'] + .1]   # 品種對照表（設計時間 245 之後，place-part4.py 產生）原樣保留
assert anchors[-1][0] == cfg['start'], 'warp.json 要有設計時間 160 的對照點'
P0 = anchors[-1][1]
# 停頓：lead＝第一句前的留白；gaps＝在哪裡開口前多停幾秒
#       （{line: N, add} 在第 N 行開口前；{before: "短句", add} 在這個短句開口前）
gl = {g['line']: g['add'] for g in cfg['gaps'] if 'line' in g}
gp = {g['before']: g['add'] for g in cfg['gaps'] if 'before' in g}
w = wave.open(f'{here}/audio-part3/{tl["audio"]}'); sr = w.getframerate()
x = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16)
parts, cur, shift = [np.zeros(int(cfg['lead'] * sr), np.int16)], 0, cfg['lead']
used = set()
for l in tl['lines']:
    for k, p in enumerate(l['phrases']):
        add = (gl.get(l['line'], 0) if k == 0 else 0) + gp.get(p['text'], 0)
        if p['text'] in gp: used.add(p['text'])
        if add:
            cut = int(max(0, p['t0'] - .1) * sr)       # 在這個短句開口前一點點切開、插入空白
            parts += [x[cur:cut], np.zeros(int(add * sr), np.int16)]; cur = cut; shift += add
        p['t0'], p['t1'] = round(P0 + shift + p['t0'], 3), round(P0 + shift + p['t1'], 3)
    l['t0'], l['t1'] = l['phrases'][0]['t0'], l['phrases'][-1]['t1']
assert used == set(gp), f'gaps 裡的短句找不到：{set(gp) - used}'
parts.append(x[cur:])
y = np.concatenate(parts)
o = wave.open(out, 'wb'); o.setnchannels(2); o.setsampwidth(2); o.setframerate(sr); o.writeframes(np.repeat(y[:, None], 2, axis=1).tobytes()); o.close()
tl['placedAt'] = P0; tl['lead'] = cfg['lead']; tl['gaps'] = cfg['gaps']
json.dump(tl, open(f'{here}/audio-part3/timeline-placed.json', 'w'), ensure_ascii=False, indent=1)
# 對照點：短句依序配對（文字要和旁白稿一致）
ph = [p for l in tl['lines'] for p in l['phrases']]
assert [p['text'] for p in ph] == [a[0] for a in cfg['phrases']], '旁白稿的短句和 part3-anchors.json 對不起來'
anchors += [[d, p['t0']] for (_, d), p in zip(cfg['phrases'], ph)]
anchors.append([cfg['end'], round(anchors[-1][1] + cfg['end'] - anchors[-1][0], 3)])   # 這一段的結尾（part3.html 的 duration）
for a, b in zip(anchors, anchors[1:]): assert b[0] > a[0] and b[1] > a[1], f'對照點要遞增：{a} {b}'
warp['anchors'] = anchors + later
json.dump(warp, open(wp, 'w'), ensure_ascii=False, indent=1)
print(f'第二、三步旁白：{len(y) / sr:.2f} 秒，從成片 {P0:.2f} 秒開始；最後一句結束於 {ph[-1]["t1"]:.2f} 秒；對照點 {len(ph)} 個')
