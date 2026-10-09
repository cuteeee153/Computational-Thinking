# 旁白對時：把錄好的旁白加速、依停頓切段，再和旁白稿逐句對齊，輸出每一句在影片裡的時間。
# 用法：python3 align.py <旁白.mp3> <旁白稿.txt> <輸出資料夾> [--speed 1.5] [--offset 0.3]
# 輸出：narration-1.5x.wav（加速後、未墊時間）、timeline.json（每一句的開始／結束秒數，以成片時間計）
# 對齊方法（沒有語音辨識）：
#   1. 用 ffmpeg silencedetect 找出說話段落（停頓 ≥ 0.12 秒）
#   2. 旁白稿依標點切成短句
#   3. 動態規劃：每個說話段落對應連續幾個短句，讓「段落長度」和「字數 ÷ 語速」最接近；
#      錄音若只錄到前面一部分，只對齊錄到的那部分，其餘標成「尚未錄音」
import json, re, subprocess, sys
args = sys.argv[1:]
mp3, txt, outdir = args[:3]
speed = float(args[args.index('--speed') + 1]) if '--speed' in args else 1.5
offset = float(args[args.index('--offset') + 1]) if '--offset' in args else 0.3
wav = f'{outdir}/narration-{speed:g}x.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp3, '-af', f'atempo={speed}', '-ar', '48000', '-ac', '1', wav], check=True)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', wav], capture_output=True, text=True).stdout)
log = subprocess.run(['ffmpeg', '-hide_banner', '-i', wav, '-af', 'silencedetect=noise=-38dB:d=0.12', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
# 說話段落 = 停頓之間
edges = sorted([(s, 'start') for s in ss] + [(e, 'end') for e in se])
chunks, cur = [], 0.0
for t, kind in edges:
    if kind == 'start':
        if t - cur > .1: chunks.append([cur, t])
    else: cur = t
if dur - cur > .1: chunks.append([cur, dur])

# 旁白稿 → 行（空行是段落）→ 短句（依標點切）
lines = [l.strip() for l in open(txt, encoding='utf-8').read().splitlines()]
phrases = []
for li, l in enumerate(lines):
    if not l: continue
    for p in re.findall(r'[^，。、：；？！,]+[，。、：；？！,]?', l):
        if p.strip(): phrases.append({'line': li, 'text': p.strip()})
clen = lambda p: len(re.sub(r'[，。、：；？！,\s]', '', p['text'].replace('COAST', 'XX')))

# 動態規劃：cost[i][j] = 前 i 段對齊前 j 個短句的最小誤差
nC, nP = len(chunks), len(phrases)
best = None
for jEnd in range(nC, min(nP, nC * 4) + 1):
    rate = sum(clen(p) for p in phrases[:jEnd]) / sum(b - a for a, b in chunks)
    # 語速要合理：中文配音原速約每秒 3.5～6 字，加速後乘上倍率
    if not 3.5 * speed <= rate <= 6 * speed: continue
    INF = 1e9; cost = [[INF] * (jEnd + 1) for _ in range(nC + 1)]; back = [[0] * (jEnd + 1) for _ in range(nC + 1)]
    cost[0][0] = 0
    for i in range(1, nC + 1):
        d = chunks[i - 1][1] - chunks[i - 1][0]
        for j in range(1, jEnd + 1):
            for k in range(max(0, j - 4), j):
                c = cost[i - 1][k] + (d - sum(clen(p) for p in phrases[k:j]) / rate) ** 2 / max(d, .3)
                if c < cost[i][j]: cost[i][j], back[i][j] = c, k
    score = cost[nC][jEnd] / nC
    if best is None or score < best[0]: best = (score, jEnd, back, rate)
score, jEnd, back, rate = best
# 回推：每個段落內的短句依字數分配時間
j, assign = jEnd, []
for i in range(nC, 0, -1):
    k = back[i][j]; assign.append((i - 1, k, j)); j = k
for ci, k, j2 in reversed(assign):
    a, b = chunks[ci]; group = phrases[k:j2]; tot = sum(clen(p) for p in group) or 1; t = a
    for p in group:
        d = (b - a) * clen(p) / tot
        p['t0'], p['t1'] = round(t + offset, 3), round(t + d + offset, 3); t += d
# 每一行的時間＝行內短句的頭尾
out = []
for li, l in enumerate(lines):
    if not l: continue
    ps = [p for p in phrases if p['line'] == li]
    rec = [p for p in ps if 't0' in p]
    out.append({'line': li + 1, 'text': l, 't0': rec[0]['t0'] if rec else None, 't1': rec[-1]['t1'] if len(rec) == len(ps) else None,
                'phrases': [{'text': p['text'], 't0': p.get('t0'), 't1': p.get('t1')} for p in ps]})
json.dump({'speed': speed, 'offset': offset, 'audio': wav.split('/')[-1], 'audioSeconds': round(dur, 3), 'rate': round(rate, 2),
           'recordedPhrases': jEnd, 'totalPhrases': nP, 'lines': out}, open(f'{outdir}/timeline.json', 'w'), ensure_ascii=False, indent=1)
print(f'說話段落 {nC} 段，對齊到第 {jEnd}/{nP} 個短句，語速 {rate:.1f} 字/秒，平均誤差 {score:.3f}')
for p in phrases[:jEnd]: print(f"  {p['t0']:6.2f}–{p['t1']:6.2f}  {p['text']}")
