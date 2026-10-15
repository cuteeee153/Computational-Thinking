// 幕 27｜深色幕：突然站不起來、走不動、後腳無力 → 請立即就醫；不確定是哪一階段 → 先讓獸醫確認原因（原 28 併入）
WT.scene('27', {
  enter: 'slide', dark: true,
  visuals: ['深色背景', '三張卡依序浮上：「突然站不起來」「突然走不動」「突然後腳明顯無力」，「突然」是橘字', '橘色大字：「請立即就醫」＋灰字「不要先花時間挑輔具」', '下方一行：「不確定是哪一個階段？→ 先讓獸醫確認原因」（後半橘色）'],
  mount: () => `
    ${[['站不起來'], ['走不動'], ['後腳明顯無力']].map(([s], k) => `<div class="box card" id="c27${k}" style="left:${120 + k * 570}px;top:170px;width:530px;height:200px;display:flex;align-items:center"><b style="font-size:50px"><span style="color:var(--or-b)">突然</span>${s}</b></div>`).join('')}
    <div class="big" id="b27" style="left:120px;top:420px;font-size:140px;color:var(--or-b)">請立即就醫</div>
    <div class="note" id="n27" style="left:120px;top:615px;font-size:42px">不要先花時間挑輔具</div>
    <div class="abs" id="u27" style="left:120px;top:740px;width:1680px;padding-top:40px;border-top:2px solid rgba(255,248,239,.15);font-size:56px;font-weight:900;letter-spacing:-.03em">不確定是哪一個階段？→ <span id="u27b" style="color:var(--or-b)">先讓獸醫確認原因</span></div>`,
  init() { gsap.set('[id^=c27]', { opacity: 0, y: 50 }); gsap.set('#b27', { opacity: 0, scale: .8, transformOrigin: '0 50%' }); gsap.set('#n27', { opacity: 0 }); gsap.set('#u27', { opacity: 0, y: 30 }); gsap.set('#u27b', { opacity: 0 }); },
  animate(S) {
    [['突然站不起來', 0], ['突然走不動', 1], ['突然出現', 2]].forEach(([w, k]) => L.pop(S, '#c27' + k, S.word(w), `卡片 0${k + 1} 浮上`, 1 + k * .12));
    S.to('#b27', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, S.word('立即就醫'), '橘色大字「請立即就醫」彈出'); S.sfx(S.word('立即就醫'), 'thud', '「咚」');
    S.to('#n27', { opacity: 1, duration: .5 }, S.word('不要先'), '灰字淡入');
    S.to('#u27', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('如果你不確定'), '下方一行浮上'); S.sfx(S.word('如果你不確定'), 'slide', '輕「咻」');
    S.to('#u27b', { opacity: 1, duration: .4 }, S.word('先讓獸醫'), '念到時「先讓獸醫確認原因」才出現'); L.ding(S, S.word('先讓獸醫'), '先讓獸醫確認原因');
  },
});
