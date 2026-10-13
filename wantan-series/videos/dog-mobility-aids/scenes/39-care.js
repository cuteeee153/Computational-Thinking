// 幕 39｜③ 輔具要搭配其他照護：買了還是走不舒服 → 回頭看三件事
WT.scene('39', {
  enter: 'slide',
  visuals: ['三個頁籤，03 搭配其他照護亮橘', '大標：「買了輔具，還是走不舒服？」（黑）／「回頭看看」（橘）', '三張卡：「疼痛沒有控制好」「地板太滑」「還需要其他復健協助」'],
  mount: () => `
    <div id="tb39">${tabs(2)}</div>
    ${L.h('h39', [['買了輔具，還是走不舒服？'], ['回頭看看', 'o']], { top: 240, size: 84 })}
    ${[['疼痛沒有控制好', () => iconPill('i39a')], ['地板太滑', () => iconStairs('i39b')], ['還需要其他復健協助', () => iconBandage('i39c')]].map(([t, ic], k) =>
      `<div class="pain card" id="c39${k}" style="left:${72 + k * 608}px;top:520px;height:400px"><div class="num">0${k + 1}</div><div class="ic">${ic()}</div><b>${t}</b></div>`).join('')}`,
  init() { L.hInit('h39', 2); gsap.set('#tb39', { opacity: 0, y: -20 }); gsap.set('[id^=c39]', { opacity: 0, y: 60 }); },
  animate(S) {
    S.to('#tb39', { opacity: 1, y: 0, duration: .5 }, S.at(0), '頁籤出現，03 亮橘'); S.sfx(S.at(0), 'tick-soft', '輕點');
    L.hLine(S, '#h391', S.word('如果買了'), '大標第一行'); L.hLine(S, '#h392', S.word('回頭看看'), '大標第二行（橘）');
    [['疼痛', 0], ['地板太滑', 1], ['其他復健', 2]].forEach(([w, k]) => { L.pop(S, '#c39' + k, S.word(w), `卡片 0${k + 1} 浮上、加橘框`, 1 + k * .12); L.ring(S, '#c39' + k, S.word(w), k ? '#c39' + (k - 1) : null); });
  },
});
