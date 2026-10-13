// 幕 36｜反過來說：已經無法好好移動，就不要硬撐；該不該用、什麼時候用，和獸醫一起決定
WT.scene('36', {
  enter: 'slide',
  visuals: ['小標「但反過來說」', '左邊：黑柴＋輪椅插畫', '大字：「已經無法好好移動，」（黑）／「不要一直勉強支撐」（橘）', '下方橘框卡：「該不該用、什麼時候用 → 和獸醫一起決定」'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e36" data-text="但反過來說"></div></div>
    <div class="abs" id="w36" style="left:150px;top:200px;width:380px">${L.dev('wheel')}</div>
    ${L.h('h36', [['已經無法好好移動，'], ['不要一直勉強支撐', 'o']], { left: 720, top: 260, size: 80 })}
    <div class="note" id="n36" style="left:720px;top:470px;font-size:36px">不用因為擔心太早用輪椅，就一直撐著</div>
    <div class="box card" id="c36" style="left:72px;top:720px;width:1776px;padding:34px 50px;display:flex;align-items:center;gap:28px"><span class="mk ok">✓</span><b>該不該用、什麼時候用 → <span style="color:var(--or)">和獸醫一起決定</span></b></div>`,
  init() { L.hInit('h36', 2); gsap.set('#w36', { opacity: 0, y: 30 }); gsap.set('#n36', { opacity: 0 }); gsap.set('#c36', { opacity: 0, y: 40 }); },
  animate(S) {
    S.type('#e36', S.at(0), .5, '小標逐字打出');
    L.hLine(S, '#h361', S.word('無法好好'), '大字第一行');
    S.to('#w36', { opacity: 1, y: 0, duration: .6 }, S.word('輪椅'), '輪椅插畫淡入'); S.to('#n36', { opacity: 1, duration: .5 }, S.word('擔心'), '灰字淡入');
    L.hLine(S, '#h362', S.word('勉強支撐'), '大字第二行（橘）'); S.sfx(S.word('勉強支撐'), 'slide', '輕「咻」');
    L.pop(S, '#c36', S.word('該不該用'), '下方卡浮上、加橘框'); S.to('#c36', { boxShadow: L.RING, duration: .4 }, S.word('該不該用'));
    L.ding(S, S.word('獸醫一起'), '和獸醫一起決定');
  },
});
