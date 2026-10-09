// 幕 14｜「幫你找到家裡那隻現在的位置」＋停格到 0:45
// 狗從卡片旁彈出，STEP 01 亮起（底色＋左側橘條）表示「你現在在這裡」，補上來源註記，
// 之後狗輕輕上下晃，停格交給 0:45 的下一段。
Intro.scene({
  id: '14', title: '你家狗的位置＋停格', start: 35.6, end: 45,
  narration: [[35.6, 39.0, '幫你找到家裡那隻現在的位置。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 40.0,
  visuals: ["文件卡左側的狗", "STEP 01 整列淡橘底色，左側一條橘線（代表「你在這裡」）", "卡片下方來源註記：「參考：AAHA《Mobility Matters》、COAST 國際共識（Cachon 等，2023）／完整來源見說明欄」"],
  motions: ["35.7 秒｜狗從下方彈出", "36.6 秒｜STEP 01 亮起", "37.6 秒｜來源註記淡入", "38.4 秒起｜狗輕輕上下晃，停格到 0:45"],
  mount: [
    { into: '#r1', at: 'afterbegin', html: `<div class="hl" id="r1hl"></div><div class="bar" id="r1bar"></div>` },
    { into: '#B-fg', html: `
      <div class="fn" id="fn" style="left:1110px;top:822px">參考：AAHA《Mobility Matters》、COAST 國際共識（Cachon 等，2023）<br>完整來源見說明欄</div>
      <div class="abs" style="left:915px;top:592px;width:170px" id="dogB"></div>` },
  ],
  assets() {
    Intro.dog('#dogB', { id: 'db', tilt: 8, mood: 'curious' });
  },
  init() {
    gsap.set('#fn', { opacity: 0, y: 14 });
    gsap.set('#r1hl', { scaleX: 0 });
    gsap.set('#r1bar', { scaleY: 0 });
    gsap.set('#dogB', { opacity: 0, y: 60 });
  },
  animate({ tl, L, E }) {
    L('#dogB', { opacity: 1, y: 0, duration: .7, ease: 'back.out(1.8)' }, 35.7);
    L('#r1hl', { scaleX: 1, duration: .6, ease: 'power3.inOut' }, 36.6);
    L('#r1bar', { scaleY: 1, duration: .4, ease: E }, 36.9);
    L('#fn', { opacity: 1, y: 0, duration: .6, ease: E }, 37.6);
    tl.to('#dogB', { y: -8, duration: .9, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 38.4);
  },
});
