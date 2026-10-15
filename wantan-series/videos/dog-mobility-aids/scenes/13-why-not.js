// 幕 13｜「直接買輪椅不就好了？」→ 其實，還是要先看原因
WT.scene('13', {
  enter: 'slide',
  visuals: ['左邊：飼主頭像＋對話泡泡「既然後腳沒力，那我直接買輪椅，不就好了？」', '右邊回覆泡泡（黑柴頭像）：橘字「其實，還是要先看原因」'],
  mount: () => `
    <div class="abs" id="bb13" style="left:72px;top:250px;display:flex;gap:22px;align-items:flex-start"><div class="av" style="width:90px;height:90px;font-size:50px;font-weight:900;color:#fff">?</div><div class="bub" style="font-size:48px;font-weight:900;padding:34px 44px;line-height:1.4">既然後腳沒力，<br>那我直接買輪椅，不就好了？</div></div>
    <div class="abs" id="a13" style="right:72px;top:600px;display:flex;flex-direction:row-reverse;gap:22px;align-items:flex-start"><div class="av" style="width:90px;height:90px;background:#FFF6EA;overflow:hidden"><img src="assets/dogs/avatar.png" style="width:100%"></div><div class="bub me" style="font-size:64px;font-weight:900;padding:34px 48px;color:var(--or)">其實，還是要先看原因</div></div>`,
  init() { gsap.set('#bb13', { opacity: 0, scale: .9, transformOrigin: '0 50%' }); gsap.set('#a13', { opacity: 0, scale: .9, transformOrigin: '100% 50%' }); },
  animate(S) {
    S.to('#bb13', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, S.at(0), '對話泡泡彈出'); S.sfx(S.at(0), 'pop', '泡泡：「啵」');
    S.to('#a13', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, S.word('其實'), '右邊回覆泡泡彈出（黑柴頭像，橘字）'); S.sfx(S.word('其實'), 'pop', '泡泡：「啵」', { pitch: 1.15 }); L.ding(S, S.word('先看原因'), '先看原因');
  },
});
