# 片頭結尾的兩聲狗吠「汪汪」：用程式合成（不需要音效素材，沒有授權問題），輸出 48kHz 立體聲 WAV。
# 用法：python3 build-bark.py <輸出.wav>
# 做法：聲帶脈衝（音高先升後降）＋氣音 → 三個共振峰帶通 → 快起慢收的音量包絡 → 一點點房間殘響。
import sys, numpy as np
SR = 48000
rng = np.random.default_rng(7)

def bandpass(x, fc, bw):
    # 二階帶通（RBJ biquad），跑兩次＝四階
    w = 2 * np.pi * fc / SR; q = fc / bw; al = np.sin(w) / (2 * q); c = np.cos(w); a0 = 1 + al
    b0, b2, a1, a2 = al / a0, -al / a0, -2 * c / a0, (1 - al) / a0
    for _ in range(2):
        y = np.zeros_like(x); x1 = x2 = y1 = y2 = 0.
        for i, v in enumerate(x):
            o = b0 * v + b2 * x2 - a1 * y1 - a2 * y2; x2, x1, y2, y1 = x1, v, y1, o; y[i] = o
        x = y
    return x

def bark(f_lo, f_hi, dur):
    n = int(dur * SR); t = np.arange(n) / SR; p = t / dur
    f0 = np.where(p < .3, f_lo + (f_hi - f_lo) * (p / .3) ** .7, f_hi - (f_hi - f_lo * .8) * np.clip((p - .3) / .7, 0, 1) ** 1.3)
    f0 *= 1 + .03 * rng.standard_normal(n).cumsum() / np.sqrt(np.arange(1, n + 1))   # 一點音高抖動
    ph = 2 * np.pi * np.cumsum(f0) / SR
    src = sum(np.sin(k * ph) / k ** 1.1 for k in range(1, 24))                         # 帶限鋸齒波 ≈ 聲帶脈衝
    src *= 1 + .35 * np.sin(ph / 2)                                                     # 次諧波，帶一點沙啞感
    src = src / np.abs(src).max() + .35 * rng.standard_normal(n)                        # 氣音
    out = np.zeros(n)
    for fc, bw, g in [(750, 260, 1), (1500, 380, .7), (2700, 600, .35), (4200, 1200, .12)]:
        out += g * bandpass(src, fc, bw)
    env = np.minimum(1, t / .008) * np.where(p < .45, 1, np.exp(-(p - .45) * dur / .035)) * np.minimum(1, (dur - t) / .02)
    burst = bandpass(rng.standard_normal(n), 3000, 3000) * np.exp(-t / .012) * .5
    return (out * env + burst) / np.abs(out * env + burst).max()

total = np.zeros(int(.9 * SR))
for start, args in [(0, (380, 680, .2)), (.27, (420, 720, .22))]:
    b = bark(*args); i = int(start * SR); total[i:i + len(b)] += b * (.9 if start else 1)
# 小房間殘響：幾道衰減的延遲
rev = total.copy()
for d, g in [(.023, .25), (.041, .18), (.067, .12), (.097, .08)]:
    k = int(d * SR); rev[k:] += g * total[:-k]
rev = rev / np.abs(rev).max() * .7
st = np.stack([rev, np.roll(rev, 24) * .97], 1)
import wave
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((st * 32767).astype('<i2').tobytes())
