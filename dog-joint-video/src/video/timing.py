# 依旁白字數排時間軸：同一份表輸出動畫用的 timing.js 與 SRT
import re, json, sys
SEGS = [
  # (window start, window end, lines)  行尾加 '|' 表示段落停頓
  (45.8, 99.2, [
    "美國動物醫院協會的指引指出，", "狗的骨關節炎，基礎常在幼犬時期就埋下，", "只是徵兆太輕微，", "常被當成玩過頭，或扭到而已。|",
    "另一份國際共識，叫做 COAST，", "把狗分成四個階段：", "沒有風險因子、", "有風險因子但沒症狀、", "輕度、中重度。|",
    "它的邏輯是，", "有風險因子的狗，從年輕成犬健檢起就該被追蹤，", "而不是看生日。|",
    "所以七歲、五歲這些數字，", "只是某個體型平均比較容易出現風險的年紀，", "不是起跑槍。"]),
  (100.6, 158.6, [
    "第一步，問自己：", "我的狗有風險因子嗎？|", "一共五類。", "特定品種的好發疾病、", "體重過重或骨架偏大、",
    "曾經關節或韌帶受傷、", "家族有髖關節或肘關節發育不良，", "還有幼犬期快速生長或營養失衡。|",
    "一個都沒有，是基礎預防組：", "不需要額外保健品，", "把資源放在飲食與運動管理。|",
    "有一項以上，是加強留意組：", "就算現在完全沒跛，", "也建議提早、更頻繁地健檢追蹤。"]),
]
def weight(s):
    s = re.sub(r'[A-Za-z]+', 'XX', s)
    return len(re.sub(r'[，。、：？！\s|]', '', s))
def ts(t):
    ms = round(t * 1000); return f"{ms//3600000:02}:{ms//60000%60:02}:{ms//1000%60:02},{ms%1000:03}"
out = []
for a, b, lines in SEGS:
    durs = [weight(l) / 4.3 + .25 for l in lines]
    gaps = [(.9 if l.endswith('|') else .3) for l in lines[:-1]]
    slack = (b - a) - sum(durs) - sum(gaps)
    big = [i for i, l in enumerate(lines[:-1]) if l.endswith('|')]
    per = min(slack / len(big), 1.8)
    for i in big: gaps[i] += per
    rest = slack - per * len(big)
    k = 1 + (rest * .5) / sum(durs)          # 剩下的一半放慢語速，一半留給結尾停格
    durs = [d * k for d in durs]
    t = a; seg = []
    for i, l in enumerate(lines):
        seg.append([round(t, 2), round(t + durs[i], 2), l.rstrip('|')]); t += durs[i] + (gaps[i] if i < len(gaps) else 0)
    out.append(seg)
    print(f"segment {a}-{b}: slack {slack:.1f}s, ends {seg[-1][1]}", file=sys.stderr)
open('timing.js', 'w').write('window.T=' + json.dumps(out, ensure_ascii=False) + ';\n')
def srt(segs, start=1):
    r = []; n = start
    for seg in segs:
        for s, e, l in seg: r.append(f"{n}\n{ts(s)} --> {ts(e)}\n{l}\n"); n += 1
    return '\n'.join(r)
open('part2.srt', 'w').write(srt(out, 14))
