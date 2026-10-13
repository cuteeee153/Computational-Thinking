# 旁白對時：把錄好的旁白加速，用離線語音辨識找出每一個字在什麼時候念到，再對回旁白稿。
# 用法：python3 align.py <旁白.mp3> <旁白稿.txt> <輸出資料夾> [--speed 1.5] [--offset 0.3] [--model <sherpa-onnx paraformer 資料夾>]
# 輸出：narration-1.5x.wav（加速後）、timeline.json（每一句、每一個短句的成片時間）、recognized.txt（辨識結果，檢查用）
#
# 做法：
#   1. 用 ffmpeg silencedetect 把原速錄音依停頓切成一小段一小段
#   2. 每一段用 sherpa-onnx 的中文 Paraformer 模型辨識（離線），段內的字平均分配時間
#   3. 辨識結果（簡體）和旁白稿（轉成簡體）逐字比對（difflib），旁白稿每個字都對到一個時間；
#      沒對上的字（辨識錯字）用前後對上的字內插
#   4. 時間除以加速倍率、加上開頭留白，就是成片時間
# 需要：pip install sherpa-onnx opencc-python-reimplemented；模型：
#   https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-paraformer-zh-small-2024-03-09.tar.bz2
import difflib, glob, json, re, subprocess, sys, wave
import numpy as np
import sherpa_onnx
from opencc import OpenCC

args = sys.argv[1:]
mp3, txt, outdir = args[:3]
opt = lambda k, d: args[args.index(k) + 1] if k in args else d
speed, offset = float(opt('--speed', 1.5)), float(opt('--offset', 0.3))
model = opt('--model', '/tmp/asr/sherpa-onnx-paraformer-zh-small-2024-03-09')
SR = 16000

# 加速版（成片用）
wav_out = f'{outdir}/narration-{speed:g}x.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp3, '-af', f'atempo={speed}', '-ar', '48000', '-ac', '1', wav_out], check=True)
# 原速 16k（辨識用）
raw = f'{outdir}/_asr16k.wav'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp3, '-ar', str(SR), '-ac', '1', raw], check=True)
w = wave.open(raw); audio = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float32) / 32768; dur = len(audio) / SR

# 1. 依停頓切段
log = subprocess.run(['ffmpeg', '-hide_banner', '-i', raw, '-af', 'silencedetect=noise=-40dB:d=0.15', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]
se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
segs, cur = [], 0.0
for s, e in zip(ss, se + [dur]):
    if s - cur > .12: segs.append([cur, s])
    cur = e
if dur - cur > .12: segs.append([cur, dur])

# 2. 每段辨識
m = [x for x in glob.glob(model + '/*.onnx') if 'int8' in x] or glob.glob(model + '/*.onnx')
rec = sherpa_onnx.OfflineRecognizer.from_paraformer(paraformer=m[0], tokens=model + '/tokens.txt', num_threads=4)
heard = []   # [(字, 開始, 結束)]（原速秒數）
lines_out = []
for a, b in segs:
    pad = int(.08 * SR)
    st = rec.create_stream(); st.accept_waveform(SR, audio[max(0, int(a * SR) - pad):int(b * SR) + pad]); rec.decode_stream(st)
    chars = [c for c in st.result.text if re.match(r'[一-鿿A-Za-z0-9]', c)]
    lines_out.append(f'{a:7.2f}–{b:7.2f}  {st.result.text}')
    for i, c in enumerate(chars):
        heard.append((c.lower(), a + (b - a) * i / len(chars), a + (b - a) * (i + 1) / len(chars)))
open(f'{outdir}/recognized.txt', 'w').write('\n'.join(lines_out) + '\n')

# 3. 旁白稿逐字對到辨識結果
cc = OpenCC('t2s')
lines = [l.strip() for l in open(txt, encoding='utf-8').read().splitlines()]
script = []   # [(行號, 行內位置, 字)] 只收要念的字
for li, l in enumerate(lines):
    for ci, c in enumerate(l):
        if re.match(r'[一-鿿A-Za-z0-9]', c): script.append((li, ci, cc.convert(c).lower()))
sm = difflib.SequenceMatcher(None, [s[2] for s in script], [h[0] for h in heard], autojunk=False)
t0 = [None] * len(script); t1 = [None] * len(script)
for blk in sm.get_matching_blocks():
    for k in range(blk.size):
        t0[blk.a + k], t1[blk.a + k] = heard[blk.b + k][1], heard[blk.b + k][2]
matched = sum(x is not None for x in t0)
# 沒對上的字：前後對上的字之間內插
known = [i for i, x in enumerate(t0) if x is not None]
for i in range(len(script)):
    if t0[i] is None:
        prev = max([k for k in known if k < i], default=None); nxt = min([k for k in known if k > i], default=None)
        if prev is None: t0[i] = t1[i] = t0[nxt]
        elif nxt is None: t0[i] = t1[i] = t1[prev]
        else:
            f = (i - prev) / (nxt - prev); t0[i] = t1[prev] + (t0[nxt] - t1[prev]) * f; t1[i] = t0[i]
            t1[i] = t1[prev] + (t0[nxt] - t1[prev]) * (i - prev + 1) / (nxt - prev)

# 4. 短句（依標點切）→ 成片時間
pos = {(s[0], s[1]): i for i, s in enumerate(script)}
out = []
for li, l in enumerate(lines):
    if not l: continue
    phrases = []; ci = 0
    for p in re.findall(r'[^，。、：；？！,]+[，。、：；？！,]?', l):
        idx = [pos[(li, ci + k)] for k in range(len(p)) if (li, ci + k) in pos]; ci += len(p)
        if not p.strip() or not idx: continue
        phrases.append({'text': p.strip(), 't0': round(t0[idx[0]] / speed + offset, 3), 't1': round(t1[idx[-1]] / speed + offset, 3)})
    out.append({'line': li + 1, 'text': l, 't0': phrases[0]['t0'], 't1': phrases[-1]['t1'], 'phrases': phrases})
json.dump({'speed': speed, 'offset': offset, 'audio': wav_out.split('/')[-1], 'audioSeconds': round(dur / speed, 3),
           'method': 'sherpa-onnx paraformer-zh-small + difflib', 'matchedChars': matched, 'totalChars': len(script), 'lines': out},
          open(f'{outdir}/timeline.json', 'w'), ensure_ascii=False, indent=1)
subprocess.run(['rm', '-f', raw])
print(f'切成 {len(segs)} 段；旁白稿 {len(script)} 字，對上 {matched} 字（{matched / len(script):.0%}）；加速後 {dur / speed:.1f} 秒')
for l in out: print(f"  {l['t0']:7.2f}–{l['t1']:7.2f}  {l['text']}")
