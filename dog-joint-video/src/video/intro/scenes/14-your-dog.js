// 幕 14｜「幫你找到家裡那隻現在的位置」＋停格到 0:45
// STEP 01 亮起（底色＋左側橘條）表示「你現在在這裡」，補上來源註記，
// 之後停格交給 0:45 的下一段。
Intro.scene({
  id: '14', title: '你家狗的位置＋停格', start: 35.6, end: 45,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 40.0,
  visuals: ["STEP 01 整列淡橘底色，左側一條橘線（代表「你在這裡」）", "卡片下方來源註記：「參考：AAHA《Mobility Matters》、COAST 國際共識（Cachon 等，2023）／完整來源見說明欄」"],
  motions: ["36.6 秒｜STEP 01 亮起", "37.6 秒｜來源註記淡入", "38.4 秒起｜停格到 0:45"],
  sfx: [
    [36.6, "marker", "STEP 01 亮起：「唰」", { gain: 0.8 }],
    [36.9, "ding-soft", "你在這裡：輕「叮」"],
  ],
  mount: [
    { into: '#r1', at: 'afterbegin', html: `<div class="hl" id="r1hl"></div><div class="bar" id="r1bar"></div>` },
    { into: '#B-fg', html: `
      <div class="fn" id="fn" style="left:1110px;top:822px">參考：AAHA《Mobility Matters》、COAST 國際共識（Cachon 等，2023）<br>完整來源見說明欄</div>` },
  ],
  init() {
    gsap.set('#fn', { opacity: 0, y: 14 });
    gsap.set('#r1hl', { scaleX: 0 });
    gsap.set('#r1bar', { scaleY: 0 });
  },
  animate({ L, E }) {
    L('#r1hl', { scaleX: 1, duration: .6, ease: 'power3.inOut' }, 36.6);
    L('#r1bar', { scaleY: 1, duration: .4, ease: E }, 36.9);
    L('#fn', { opacity: 1, y: 0, duration: .6, ease: E }, 37.6);
  },
});
