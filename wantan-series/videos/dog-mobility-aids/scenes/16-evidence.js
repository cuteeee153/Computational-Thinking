// 幕 16｜深色幕：太早用輪椅 → 肌肉萎縮更快？ 證據不足
WT.scene('16', {
  enter: 'slide', dark: true,
  visuals: ['深色背景，小標「特別說明」', '大字：「太早使用輪椅」→「肌肉萎縮得更快？」', '灰字：「沒有找到足夠的直接研究可以證明」'],
  mount: () => `
    <div class="abs" style="left:120px;top:170px"><div class="eyebrow" id="e16" data-text="特別說明"></div></div>
    <div class="big" id="b160" style="left:120px;top:300px;font-size:84px">太早使用輪椅</div>
    <div class="big" id="b161" style="left:120px;top:430px;font-size:84px">→ 肌肉萎縮得更快？</div>
    <div class="note" id="n16" style="left:120px;top:560px;font-size:40px">目前沒有找到足夠的直接研究可以證明</div>`,
  init() { gsap.set(['#b160', '#b161'], { opacity: 0, y: 30 }); gsap.set('#n16', { opacity: 0 }); },
  animate(S) {
    S.type('#e16', S.at(0), .5, '小標逐字打出');
    S.to('#b160', { opacity: 1, y: 0, duration: .6 }, S.word('太早'), '「太早使用輪椅」浮上');
    S.to('#b161', { opacity: 1, y: 0, duration: .6 }, S.word('肌肉'), '「肌肉萎縮得更快？」浮上');
    S.to('#n16', { opacity: 1, duration: .5 }, S.word('沒有找到'), '灰字淡入'); S.sfx(S.word('沒有找到'), 'tick-soft', '輕點');
  },
});
