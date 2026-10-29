# 旁白對時：把 narration/rec/ 裡的錄音加速，用離線語音辨識找出每個字什麼時候念到，再對回 script.json 的每一幕。
# 用法：python3 narration/align.py [--model <sherpa-onnx paraformer 資料夾>]
# 輸出：narration/aligned.json（每一幕：用哪個錄音檔、剪哪一段、每個短句的時間）
#       narration/work/<檔名>-<倍率>x.wav（加速後的錄音）、narration/work/<檔名>.recognized.txt（辨識結果，檢查用）
#
# 錄音檔怎麼放（narration/rec/）：
#   - 一個檔可以是整支影片、或其中幾幕（例如 part1.mp3、part2.mp3），檔名隨意；每一幕自動找念得最完整的那個檔。
#   - 某一幕重錄：檔名取成幕號（例如 07.mp3），這一幕就固定用它。
# 做法：
#   1. ffmpeg silencedetect 依停頓切段，每段用 sherpa-onnx 中文 Paraformer 辨識（離線），段內的字平均分配時間
#   2. 辨識結果和稿子（都轉簡體）逐字比對（difflib）；一幕裡沒對上的字用前後對上的字內插
#   3. 時間除以加速倍率（script.json 的 speed）
#   4. 不是旁白的短聲音（狗吠等，辨識成「嗯、汪」或認不出字）不剪掉：在兩幕之間的併進前一幕的結尾，檔案開頭的併進第一幕
# 需要：pip install sherpa-onnx opencc-python-reimplemented numpy；模型見 setup.sh
import difflib, glob, json, os, re, subprocess, sys, wave
import numpy as np

here = os.path.dirname(os.path.abspath(__file__))
root = os.path.dirname(here)
args = sys.argv[1:]
model = args[args.index('--model') + 1] if '--model' in args else os.path.expanduser('~/asr/sherpa-onnx-paraformer-zh-small-2024-03-09')
import sherpa_onnx
from opencc import OpenCC
cc = OpenCC('t2s')
SR = 16000
script = json.load(open(f'{root}/script.json', encoding='utf-8'))
speed = script.get('speed', 1.5)
scenes = script['scenes']
SPOKEN = re.compile(r'[一-鿿A-Za-z0-9]')
NOISE = set('嗯啊汪哦呃唔哈呵噢來来')   # 旁白裡的狗吠聲辨識起來常變成這些字
PHRASE = re.compile(r'[^，。、：；？！,|]+[，。、：；？！,|]?')

m = [x for x in glob.glob(model + '/*.onnx') if 'int8' in x] or glob.glob(model + '/*.onnx')
if not m: sys.exit(f'找不到語音辨識模型：{model}（先跑 setup.sh）')
rec = sherpa_onnx.OfflineRecognizer.from_paraformer(paraformer=m[0], tokens=model + '/tokens.txt', num_threads=4)
os.makedirs(f'{here}/work', exist_ok=True)

def hear(path, name):
    """回傳 [(字, 開始, 結束)]（原速秒數）、錄音長度"""
    raw = f'{here}/work/_16k.wav'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-ar', str(SR), '-ac', '1', raw], check=True)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', path, '-af', f'atempo={speed}', '-ar', '48000', '-ac', '1', f'{here}/work/{name}-{speed:g}x.wav'], check=True)
    w = wave.open(raw); audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; dur = len(audio) / SR
    log = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw, '-af', 'silencedetect=noise=-40dB:d=0.15', '-f', 'null', '-'], capture_output=True, text=True).stderr
    ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
    se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
    segs, cur = [], 0.0
    for s, e in zip(ss, se + [dur]):
        if s - cur > .12: segs.append([cur, s])
        cur = e
    if dur - cur > .12: segs.append([cur, dur])
    heard, lines, noises = [], [], []
    for a, b in segs:
        pad = int(.08 * SR)
        st = rec.create_stream(); st.accept_waveform(SR, audio[max(0, int(a * SR) - pad):int(b * SR) + pad]); rec.decode_stream(st)
        chars = [c for c in st.result.text if SPOKEN.match(c)]
        lines.append(f'{a:7.2f}–{b:7.2f}  {st.result.text}')
        # 不是旁白的短聲音（狗吠等）：辨識不出字或只認成「嗯、啊、汪」→ 記下來，剪接時保留
        if b - a < 2.5 and all(c in NOISE for c in st.result.text if SPOKEN.match(c)): noises.append((a, b, st.result.text))
        for i, c in enumerate(chars): heard.append((c.lower(), a + (b - a) * i / len(chars), a + (b - a) * (i + 1) / len(chars)))
    open(f'{here}/work/{name}.recognized.txt', 'w').write('\n'.join(lines) + '\n')
    os.remove(raw)
    return heard, dur, noises

def match(heard, which):
    """稿子（which 這幾幕）逐字對到辨識結果；回傳 {幕索引: [(開始, 結束) 或 None, ...]}"""
    chars = [(si, cc.convert(c).lower()) for si in which for c in scenes[si]['text'] if SPOKEN.match(c)]
    sm = difflib.SequenceMatcher(None, [c for _, c in chars], [h[0] for h in heard], autojunk=False)
    t = [None] * len(chars)
    for blk in sm.get_matching_blocks():
        for k in range(blk.size): t[blk.a + k] = heard[blk.b + k][1:]
    out = {si: [] for si in which}
    for (si, _), x in zip(chars, t): out[si].append(x)
    return out

files = sorted(f for f in glob.glob(f'{here}/rec/*') if re.search(r'\.(mp3|wav|m4a|aac|flac)$', f, re.I))
if not files: sys.exit('narration/rec/ 裡沒有錄音檔')
ids = [s['id'] for s in scenes]
best = {}   # 幕索引 → (比例, 檔名, 時間表, 長度)
noises = {}  # 檔名 → [(開始, 結束, 辨識結果)]（原速秒數）：不是旁白的聲音
for f in files:
    name = os.path.splitext(os.path.basename(f))[0]
    heard, dur, noises[name] = hear(f, name)
    which = [ids.index(name)] if name in ids else range(len(scenes))
    for si, ts in match(heard, which).items():
        ratio = sum(x is not None for x in ts) / max(1, len(ts))
        forced, cur = name in ids, best.get(si)
        if forced or cur is None or (not cur[4] and ratio > cur[0]):
            best[si] = (ratio, name, ts, dur / speed, forced)
    print(f'{os.path.basename(f)}：{dur:.1f} 秒（加速後 {dur / speed:.1f} 秒）')

out, report, kept = {}, [], []
for si, sc in enumerate(scenes):
    if si not in best or best[si][0] < .6:
        report.append(f'  幕 {sc["id"]}：沒有錄音' + (f'（最像的是 {best[si][1]}，只對上 {best[si][0]:.0%}）' if si in best else '')); continue
    ratio, name, ts, dur, _ = best[si]
    known = [i for i, x in enumerate(ts) if x is not None]
    per = .22   # 開頭／結尾沒對上時，一個字大約 0.22 秒（原速）
    full = []
    for i, x in enumerate(ts):
        if x is not None: full.append(x); continue
        p = max([k for k in known if k < i], default=None); n = min([k for k in known if k > i], default=None)
        if p is None: full.append((ts[n][0] - per * (n - i), ts[n][0] - per * (n - i - 1)))
        elif n is None: full.append((ts[p][1] + per * (i - p - 1), ts[p][1] + per * (i - p)))
        else:
            a, b = ts[p][1], ts[n][0]; w = (b - a) / (n - p - 1)
            full.append((a + w * (i - p - 1), a + w * (i - p)))
    # 短句時間（加速後）
    phrases, k = [], 0
    for p in PHRASE.findall(sc['text']):
        n = len(SPOKEN.findall(p))
        if not n: continue
        phrases.append({'text': p.strip().rstrip('|'), 't0': full[k][0] / speed, 't1': full[k + n - 1][1] / speed}); k += n
    first, last = phrases[0]['t0'], phrases[-1]['t1']
    # 剪哪一段：前後各留一點氣口，但不吃到同一個檔裡前後幕的字
    a, b = max(0, first - .12), min(dur, last + .25)
    for sj, x in best.items():
        if sj == si or x[1] != name or x[0] < .6: continue
        oth = [y for y in x[2] if y is not None]
        if not oth: continue
        o0, o1 = oth[0][0] / speed, oth[-1][1] / speed
        if o1 <= first: a = max(a, (o1 + first) / 2)
        if o0 >= last: b = min(b, (last + o0) / 2)
    if name == sc['id']: b = dur   # 用幕號命名的錄音整個檔都是這一幕：結尾不剪（裡面可能有狗吠聲）
    # 製作人的旁白裡可能有狗吠聲，不能剪掉：緊接在這一幕最後一個字後面（1 秒內、在下一幕之前）的非旁白聲音，併進這一幕；檔案開頭緊接在第一個字前面的，併進第一幕
    nxt = min([y[0][0] / speed for sj, x in best.items() if sj != si and x[1] == name and x[0] >= .6 for y in [[z for z in x[2] if z is not None]] if y and y[0][0] / speed >= last], default=dur)
    prv = max([y[-1][1] / speed for sj, x in best.items() if sj != si and x[1] == name and x[0] >= .6 for y in [[z for z in x[2] if z is not None]] if y and y[-1][1] / speed <= first], default=None)
    for n0, n1, txt in noises.get(name, []):
        n0, n1 = n0 / speed, n1 / speed
        if last <= n0 < min(nxt, last + 1): b = max(b, min(n1 + .15, nxt - .12)); kept.append(f'  幕 {sc["id"]}：保留結尾的非旁白聲音（{name} 原速 {n0 * speed:.1f} 秒，辨識成「{txt}」，可能是狗吠）')
        elif prv is None and first - 1 < n1 <= first: a = min(a, max(0, n0 - .1)); kept.append(f'  幕 {sc["id"]}：保留開頭的非旁白聲音（{name} 原速 {n0 * speed:.1f} 秒，辨識成「{txt}」，可能是狗吠）')
    out[sc['id']] = {'text': sc['text'], 'src': f'{name}-{speed:g}x.wav', 'ratio': round(ratio, 3),
                     'cut': [round(a, 3), round(b, 3)], 'lead': round(first - a, 3), 'length': round(last - first, 3),
                     'phrases': [{'text': p['text'], 't0': round(p['t0'] - first, 3), 't1': round(p['t1'] - first, 3)} for p in phrases]}
    if ratio < .9: report.append(f'  幕 {sc["id"]}：只對上 {ratio:.0%}，可能念的和稿子不一樣（看 work/{name}.recognized.txt）')
json.dump({'speed': speed, 'method': 'sherpa-onnx paraformer-zh-small + difflib', 'scenes': out},
          open(f'{here}/aligned.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print(f'對時完成：{len(out)}／{len(scenes)} 幕有錄音')
for r in report: print(r)
for r in kept: print(r)
