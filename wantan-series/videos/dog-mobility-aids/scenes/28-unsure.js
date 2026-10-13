// 幕 28｜不確定是哪一階段 → 先讓獸醫確認原因
WT.scene('28', {
  enter: 'slide',
  visuals: ['左邊：黑柴歪頭坐，旁邊四階小樓梯每階都有問號', '大標：「不確定是哪一個階段？」（黑）／「先讓獸醫確認原因」（橘）', '灰字：「不要勉強自己判斷」'],
  mount: () => `
    <div class="abs" id="d28" style="left:120px;top:330px;width:380px">${WT.dog('sit-tilt')}</div>
    <div class="abs" id="q28" style="left:520px;top:520px;display:flex;align-items:flex-end;gap:12px">${[0, 1, 2, 3].map(k => `<div style="width:70px;height:${70 + k * 50}px;border-radius:14px;background:#EFE6DA;display:flex;align-items:flex-start;justify-content:center;padding-top:10px;font:900 40px 'Noto Sans TC';color:#B9AC9E">?</div>`).join('')}</div>
    ${L.h('h28', [['不確定是哪一個階段？'], ['先讓獸醫確認原因', 'o']], { left: 900, top: 330, size: 84 })}
    <div class="note" id="n28" style="left:900px;top:600px;font-size:40px">不要勉強自己判斷</div>`,
  init() { L.hInit('h28', 2); gsap.set(['#d28', '#q28'], { opacity: 0, y: 30 }); gsap.set('#n28', { opacity: 0 }); },
  animate(S) {
    S.to(['#d28', '#q28'], { opacity: 1, y: 0, duration: .6, stagger: .15 }, S.at(0), '黑柴和問號樓梯淡入'); S.sfx(S.at(0), 'pop-card', '「啵」');
    L.hLine(S, '#h281', S.at(0), '大標第一行');
    S.to('#n28', { opacity: 1, duration: .5 }, S.word('勉強'), '灰字淡入');
    L.hLine(S, '#h282', S.word('先讓獸醫'), '大標第二行（橘）'); L.ding(S, S.word('先讓獸醫'), '結論');
  },
});
