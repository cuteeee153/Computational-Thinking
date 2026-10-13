// 幕 13｜「直接買輪椅不就好了？」→ 其實，還是要先看原因
WT.scene('13', {
  enter: 'slide',
  visuals: ['左邊：飼主頭像＋對話泡泡「既然後腳沒力，那我直接買輪椅，不就好了？」', '右邊：黑柴＋輪椅插畫', '最後橘色大字：「其實，還是要先看原因」'],
  mount: () => `
    <div class="abs" id="bb13" style="left:72px;top:250px;display:flex;gap:22px;align-items:flex-start"><div class="av" style="width:90px;height:90px;font-size:50px;font-weight:900;color:#fff">?</div><div class="bub" style="font-size:48px;font-weight:900;padding:34px 44px;line-height:1.4">既然後腳沒力，<br>那我直接買輪椅，不就好了？</div></div>
    <div class="abs" id="d13" style="left:1360px;top:230px;width:420px">${L.dev('wheel')}</div>
    <div class="big o" id="a13" style="left:72px;top:700px;font-size:100px">其實，還是要先看原因</div>`,
  init() { gsap.set('#bb13', { opacity: 0, scale: .9, transformOrigin: '0 50%' }); gsap.set('#d13', { opacity: 0, x: 60 }); gsap.set('#a13', { opacity: 0, y: 40 }); },
  animate(S) {
    S.to('#bb13', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, S.at(0), '對話泡泡彈出'); S.sfx(S.at(0), 'pop', '泡泡：「啵」');
    S.to('#d13', { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, S.word('輪椅'), '輪椅插畫滑入'); S.sfx(S.word('輪椅'), 'slide', '輕「咻」');
    S.to('#d13', { opacity: .25, duration: .4 }, S.word('其實'));
    S.to('#a13', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.word('其實'), '橘色大字浮上'); L.ding(S, S.word('先看原因'), '先看原因');
  },
});
