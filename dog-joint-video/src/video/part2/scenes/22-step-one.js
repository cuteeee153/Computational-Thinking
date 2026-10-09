// 幕 22｜1:40 第一步：「我的狗有風險因子嗎？」
// 米色畫面由下往上蓋過深色段，頻道名稱變回黑字，小標「04 ／ 第一步」打出，大標兩行冒出。
Intro.scene({
  id: '22', title: '第一步：有風險因子嗎？', start: 98.7, end: 108.1,
  narration: [[100.6, 102.51, '第一步，問自己：'], [102.81, 105.54, '我的狗有風險因子嗎？']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 106.0,
  visuals: ["米色背景，頻道名稱變回黑字", "小標「04 ／ 第一步」", "大標第一行：「我的狗，」（黑）", "大標第二行：「有風險因子嗎？」（橘）"],
  motions: ["98.7 秒｜米色畫面由下往上蓋過深色段，約 0.85 秒", "99.2 秒｜頻道名稱變黑", "99.6 秒｜小標逐字打出", "100.9 秒｜大標第一行冒出", "102.9 秒｜大標第二行冒出"],
  mount: [
    { into: '#S4-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e4" data-text="04 ／ 第一步"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:104px" id="h4"><span class="ln"><span id="h41">我的狗，</span></span><span class="ln"><span id="h42" class="o">有風險因子嗎？</span></span></div>` },
  ],
  init() {
    gsap.set('#S4', { yPercent: 100 });
    gsap.set(['#h41', '#h42'], { yPercent: 110 });
  },
  animate({ L, type }) {
    L('#S4', { yPercent: 0, duration: .85, ease: 'power3.inOut' }, 98.7);
    L('#logo', { color: '#231B15', duration: .3 }, 99.2);
    type('#e4', 99.6, .6);
    L('#h41', { yPercent: 0, duration: .8, ease: 'power4.out' }, 100.9);
    L('#h42', { yPercent: 0, duration: .8, ease: 'power4.out' }, 102.91);
  },
});
