// 幕 04｜深色幕：最重要的不是價格（劃掉）→ 橘色大字：後腳還能不能自己支撐身體、走路
WT.scene('04', {
  enter: 'slide', dark: true,
  visuals: ['深色背景，小標「記住一個重點」', '白字「選輔具，最重要的不是」＋「價格」被橘線劃掉', '橘色大字兩行：「而是狗狗的後腳」／「還能不能自己支撐身體、走路」'],
  mount: () => `
    <div class="abs" style="left:120px;top:200px"><div class="eyebrow" id="e4" data-text="記住一個重點"></div></div>
    <div class="big" id="b41" style="left:120px;top:270px;font-size:80px">選輔具，最重要的不是 <span class="strike" style="color:#B9AC9E">價格<i id="s4"></i></span></div>
    ${L.h('h4', [['而是狗狗的後腳', 'o'], ['還能不能自己支撐身體、走路', 'o']], { left: 120, top: 480, size: 104 })}`,
  init() { L.hInit('h4', 2); gsap.set('#b41', { opacity: 0, y: 30 }); gsap.set('#s4', { scaleX: 0 }); },
  animate(S) {
    S.type('#e4', S.at(0), .6, '小標逐字打出'); S.sfx(S.at(0), 'typing', '打字聲', { chars: 6 });
    S.to('#b41', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.at(1), '「選輔具，最重要的不是價格」浮上');
    S.to('#s4', { scaleX: 1, duration: .4 }, S.wordEnd('價格'), '「價格」被劃掉'); S.sfx(S.wordEnd('價格'), 'scribble', '劃掉：筆刷聲');
    L.hLine(S, '#h41', S.word('而是'), '橘色大字第一行'); L.hLine(S, '#h42', S.word('還能不能'), '橘色大字第二行');
    L.ding(S, S.word('還能不能'), '結論');
  },
});
