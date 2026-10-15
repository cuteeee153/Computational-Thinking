// 幕 21｜先提醒：這是我整理的選購參考，不是正式分期；神經問題由獸醫或復健師判斷
WT.scene('21', {
  enter: 'slide',
  visuals: ['小標「先提醒」', '左卡（打勾）：「我整理的選購參考」', '右卡（打叉、灰）：「不是 AAHA、CARE 或其他機構的正式分期」', '下方：「實際適合哪一種 → 由獸醫評估」', '最下方：標籤「椎間盤疾病」「退化性脊髓病變」＋「神經問題 → 由獸醫或復健師判斷」（橘）'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e21" data-text="先提醒"></div></div>
    <div class="box card" id="c210" style="left:72px;top:220px;width:820px;height:200px;display:flex;gap:28px;align-items:center"><span class="mk ok">✓</span><b>我整理的選購參考</b></div>
    <div class="box card" id="c211" style="left:930px;top:220px;width:920px;height:200px;display:flex;gap:28px;align-items:center;background:#EFE6DA"><span class="mk no">✕</span><b style="color:#8F8377;font-size:38px">不是 AAHA、CARE 或<br>其他機構的正式分期</b></div>
    <div class="big" id="b21" style="left:72px;top:480px;font-size:56px">實際適合哪一種 → <span class="o">由獸醫評估</span></div>
    <div class="box card" id="c212" style="left:72px;top:620px;width:1776px;height:200px;display:flex;align-items:center;gap:22px">
      <span class="tag" id="t210">椎間盤疾病</span><span class="tag" id="t211">退化性脊髓病變</span><span id="n21a" style="font-size:40px;font-weight:900;margin-left:16px">等神經問題 →</span><span id="n21b" style="font-size:46px;font-weight:900;color:var(--or)">由獸醫或復健師判斷</span></div>`,
  init() { gsap.set(['#c210', '#c211', '#c212'], { opacity: 0, y: 40 }); gsap.set('#b21', { opacity: 0, y: 30 }); gsap.set('[id^=t21]', { opacity: 0, scale: .6 }); gsap.set(['#n21a', '#n21b'], { opacity: 0, x: -20 }); },
  animate(S) {
    S.type('#e21', S.at(0), .4, '小標逐字打出');
    L.pop(S, '#c210', S.word('我整理'), '左卡（打勾）浮上');
    L.pop(S, '#c211', S.word('不是'), '右卡（打叉）浮上', .8, 'pop-low');
    S.to('#b21', { opacity: 1, y: 0, duration: .6 }, S.word('實際'), '「實際適合哪一種 → 由獸醫評估」浮上'); L.ding(S, S.word('獸醫評估'), '由獸醫評估');
    L.pop(S, '#c212', S.word('尤其'), '下方神經問題卡浮上、加橘框'); S.to('#c212', { boxShadow: L.RING, duration: .4 }, S.word('尤其'));
    [['椎間盤', 0], ['退化性', 1]].forEach(([w, k]) => { S.to('#t21' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤 0${k + 1} 彈出`); S.sfx(S.word(w), 'pop', `標籤 0${k + 1}：「啵」`, { pitch: 1 + k * .12 }); });
    S.to('#n21a', { opacity: 1, x: 0, duration: .45 }, S.word('神經問題'), '「等神經問題 →」滑入'); S.sfx(S.word('神經問題'), 'slide', '輕「咻」');
    S.to('#n21b', { opacity: 1, x: 0, duration: .45 }, S.word('復健師'), '「由獸醫或復健師判斷」滑入'); L.ding(S, S.word('復健師'), '由獸醫或復健師判斷');
  },
});
