// 幕 05｜「只想知道一件事」：輸入框打出「所以……到底要聽誰的？」
// 游標出現，逐字打字，打完後游標閃爍。
Intro.scene({
  id: '05', title: '輸入框「到底要聽誰的？」', start: 13.0, end: 15.4,
  narration: [[13.2, 15.2, '只想知道一件事：']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 15.2,
  visuals: ["卡片底部輸入框：「所以⋯⋯到底要聽誰的？」", "橘色打字游標"],
  motions: ["13.0 秒｜打字游標出現", "13.3 秒｜逐字打出，約 1.6 秒", "15.0 秒｜游標開始閃爍"],
  init() {
    document.querySelector('#inpText').dataset.text = '所以⋯⋯到底要聽誰的？';
    gsap.set('#caret', { opacity: 0 });
  },
  animate({ tl, L, type }) {
    L('#caret', { opacity: 1, duration: .1 }, 13.0);
    type('#inpText', 13.3, 1.6);
    tl.to('#caret', { opacity: 0, duration: .01, repeat: 9, yoyo: true, repeatDelay: .25 }, 15.0);
  },
});
