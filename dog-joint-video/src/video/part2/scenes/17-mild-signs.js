// 幕 17｜「徵兆太輕微，常被當成玩過頭或扭到」
// 青壯年、中年、老年三隻狗連同年齡標字往右側推出畫面，只留下幼犬；幼犬晃了晃，旁邊冒出兩個問句泡泡。
Intro.scene({
  id: '17', title: '徵兆太輕微', start: 54.0, end: 61.6,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 60.0,
  visuals: ["時間軸上只留下幼犬（青壯年、中年、老年被推出畫面）", "問句泡泡：「只是玩過頭？」", "問句泡泡：「扭到而已？」"],
  motions: ["54.1 秒｜青壯年、中年、老年三隻狗與年齡標字依序往右推出畫面，約 0.8 秒", "56.5 秒｜「只是玩過頭？」彈出", "56.6 秒｜幼犬左右晃兩下", "57.9 秒｜「扭到而已？」彈出"],
  sfx: [
    [54.13, "whoosh", "三隻狗被推出畫面：「咻」"],
    [56.47, "pop", "「只是玩過頭？」：「啵」"],
    [57.87, "pop", "「扭到而已？」：「啵」", { pitch: 1.12 }],
  ],
  mount: [
    { into: '#LA', html: `
      <div class="qp" style="left:330px;top:150px" id="qp1">只是玩過頭？</div>
      <div class="qp" style="left:430px;top:250px" id="qp2">扭到而已？</div>` },
  ],
  init() {
    gsap.set(['#qp1', '#qp2'], { opacity: 0, scale: .7, y: 10 });
  },
  animate({ tl, L }) {
    // 由右而左推出：老年先走，青壯年最後
    [['#dS', '#st4'], ['#dM', '#st3'], ['#dY', '#st2']].forEach((g, i) =>
      L(g, { x: 1500, opacity: 0, duration: .8, ease: 'power3.in' }, 54.13 + i * .12));
    L('#qp1', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 56.47);
    L('#qp2', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 57.87);
    tl.to('#dP', { rotation: -8, transformOrigin: '50% 90%', duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 56.57);
  },
});
