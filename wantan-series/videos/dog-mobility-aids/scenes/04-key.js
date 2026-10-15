// 幕 04｜最重要的不是價格（劃掉），這句縮小往上推 → 橘色大字：後腳還能不能支撐身體、走路
WT.scene('04', {
  enter: 'slide',
  visuals: ['米白背景', '大字「選輔具，最重要的不是價格」，「價格」被橘線劃掉；講完縮小往上推', '橘色大字兩行（緊接在下面）：「而是狗狗的後腳」／「還能不能支撐身體、走路」'],
  mount: () => `
    <div class="big" id="b41" style="left:120px;top:400px;font-size:84px">選輔具，最重要的不是 <span class="strike" style="color:#B9AC9E">價格<i id="s4"></i></span></div>
    ${L.h('h4', [['而是狗狗的後腳', 'o'], ['還能不能支撐身體、走路', 'o']], { left: 120, top: 360, size: 110 })}`,
  init() { L.hInit('h4', 2); gsap.set('#b41', { opacity: 0, y: 30, transformOrigin: '0 0' }); gsap.set('#s4', { scaleX: 0 }); },
  animate(S) {
    S.to('#b41', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.at(0), '「選輔具，最重要的不是價格」浮上');
    S.to('#s4', { scaleX: 1, duration: .4 }, S.wordEnd('價格'), '「價格」被劃掉'); S.sfx(S.wordEnd('價格'), 'scribble', '劃掉：筆刷聲');
    S.to('#b41', { y: -190, scale: .62, duration: .6, ease: 'power3.inOut' }, S.word('而是', 0, -.35), '這句縮小往上推');
    S.sfx(S.word('而是', 0, -.35), 'whoosh', '往上推：「咻」', { gain: .5 });
    L.hLine(S, '#h41', S.word('而是'), '橘色大字第一行'); L.hLine(S, '#h42', S.word('還能不能'), '橘色大字第二行');
    L.ding(S, S.word('還能不能'), '結論');
  },
});
