// 幕 35｜不是越貴越好，也不是一定要照順序一路升級
WT.scene('35', {
  enter: 'slide',
  visuals: ['左卡：「越貴、功能越多就越好」被橘線劃掉', '右卡：三種輔具排成往上的階梯＋「一定要照順序一路升級」被橘線劃掉'],
  mount: () => `
    ${L.h('h35', [['所以，這三種'], ['不是升級關係', 'o']], { top: 150, size: 92 })}
    <div class="box card" id="c350" style="left:72px;top:440px;width:820px;height:440px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
      <div style="width:180px;height:180px">${iconTag('i35')}</div><b class="strike" style="margin-top:20px">越貴、功能越多<br>就越好<i id="s350"></i></b></div>
    <div class="box card" id="c351" style="left:950px;top:440px;width:900px;height:440px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center">
      <div style="display:flex;align-items:flex-end;gap:16px;height:180px">${['harness', 'sling', 'wheel'].map((k, i) => `<div style="width:${110 + i * 25}px">${L.dev(k)}</div>`).join('<span style="font-size:40px;color:#CDBFAE;font-weight:900">›</span>')}</div>
      <b class="strike" style="margin-top:20px">一定要照順序<br>一路升級<i id="s351"></i></b></div>`,
  init() { L.hInit('h35', 2); gsap.set(['#c350', '#c351'], { opacity: 0, y: 50 }); gsap.set(['#s350', '#s351'], { scaleX: 0 }); },
  animate(S) {
    L.hLine(S, '#h351', S.at(0)); L.hLine(S, '#h352', S.at(0, 0) + .4, '大標第二行（橘）');
    L.pop(S, '#c350', S.word('越貴'), '左卡浮上');
    S.to('#s350', { scaleX: 1, duration: .4 }, S.wordEnd('越好'), '「越貴越好」被劃掉'); S.sfx(S.wordEnd('越好'), 'scribble', '劃掉：筆刷聲');
    L.pop(S, '#c351', S.word('照順序'), '右卡浮上', 1.12);
    S.to('#s351', { scaleX: 1, duration: .4 }, S.wordEnd('升級'), '「一路升級」被劃掉'); S.sfx(S.wordEnd('升級'), 'scribble', '劃掉：筆刷聲');
  },
});
