// 幕 22｜1:40 第一步：「我的狗有風險因子嗎？」
// 三步驟總覽收起之後（米色畫面在第 21b 幕蓋上來），小標「04 ／ 判斷第一步」打出，大標兩行緊接著冒出；念到「我的狗狗，有風險因子嗎？」時大標放大一下。
Intro.scene({
  id: '22', title: '第一步：有風險因子嗎？', start: 99.85, end: 108.1,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 106.0,
  visuals: ["小標「04 ／ 判斷第一步」", "大標第一行：「我的狗狗，」（黑）", "大標第二行：「有風險因子嗎？」（橘）"],
  motions: ["99.9 秒｜小標逐字打出", "100.1 秒｜大標第一行冒出", "100.25 秒｜大標第二行冒出", "101.23 秒｜念到「的狗狗，有風險因子嗎？」時大標放大一下", "104.4 秒｜大標縮回"],
  sfx: [
    [101.23, "pop", "大標放大：「啵」", { gain: 0.7 }],
  ],
  mount: [
    { into: '#S4-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e4" data-text="04 ／ 判斷第一步"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:104px" id="h4"><span class="ln"><span id="h41">我的狗狗，</span></span><span class="ln"><span id="h42" class="o">有風險因子嗎？</span></span></div>` },
  ],
  init() {
    gsap.set(['#h41', '#h42'], { yPercent: 110 });
  },
  animate({ L, type }) {
    type('#e4', 99.9, .6);
    L('#h41', { yPercent: 0, duration: .8, ease: 'power4.out' }, 100.1);
    L('#h42', { yPercent: 0, duration: .8, ease: 'power4.out' }, 100.25);
    L('#h4', { scale: 1.08, transformOrigin: '0% 50%', duration: .4, ease: 'back.out(2)' }, 101.23);
    L('#h4', { scale: 1, duration: .5, ease: 'power2.inOut' }, 104.4);
  },
});
