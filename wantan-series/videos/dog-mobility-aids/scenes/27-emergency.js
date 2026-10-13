// 幕 27｜深色幕：突然站不起來、走不動、後腳無力 → 請立即就醫
WT.scene('27', {
  enter: 'slide', dark: true,
  visuals: ['深色背景，小標「最後特別提醒」', '三張卡依序浮上：「突然站不起來」「突然走不動」「突然後腳明顯無力」，「突然」是橘字', '橘色大字：「請立即就醫」＋灰字「不要先花時間挑輔具」'],
  mount: () => `
    <div class="abs" style="left:120px;top:160px"><div class="eyebrow" id="e27" data-text="最後特別提醒"></div></div>
    ${[['站不起來', '突然站不起來'], ['走不動', '突然走不動'], ['後腳明顯無力', '突然出現']].map(([s], k) => `<div class="box card" id="c27${k}" style="left:${120 + k * 570}px;top:260px;width:530px;height:220px;display:flex;align-items:center"><b style="font-size:50px"><span style="color:var(--or-b)">突然</span>${s}</b></div>`).join('')}
    <div class="big" id="b27" style="left:120px;top:560px;font-size:150px;color:var(--or-b)">請立即就醫</div>
    <div class="note" id="n27" style="left:120px;top:770px;font-size:44px">不要先花時間挑輔具</div>`,
  init() { gsap.set('[id^=c27]', { opacity: 0, y: 50 }); gsap.set('#b27', { opacity: 0, scale: .8, transformOrigin: '0 50%' }); gsap.set('#n27', { opacity: 0 }); },
  animate(S) {
    S.type('#e27', S.at(0), .6, '小標逐字打出');
    [['突然站不起來', 0], ['突然走不動', 1], ['突然出現', 2]].forEach(([w, k]) => L.pop(S, '#c27' + k, S.word(w), `卡片 0${k + 1} 浮上`, 1 + k * .12));
    S.to('#b27', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, S.word('立即就醫'), '橘色大字「請立即就醫」彈出'); S.sfx(S.word('立即就醫'), 'thud', '「咚」');
    S.to('#n27', { opacity: 1, duration: .5 }, S.word('不要先'), '灰字淡入');
  },
});
