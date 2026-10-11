// 幕 44｜真實畫面：「我自己養的是一隻還在青壯年階段的狗……而不是等牠自己走路一拐一拐才驚覺」
// 米色畫面：右邊是拍攝者的直拍影片（assets/footage/footage.json 剪接、build-footage.py 輸出 footage.mp4），
// 左邊是說明字卡：大標「我家的狗狗：無風險因子、無徵兆」→ 小字「沒有用任何關節保健品，重點放在三件事」→
// 三張重點卡依序浮上來，念到哪一件就亮起（橘框），補充說明出現。
// 成片時這一頁分兩層輸出（render.mjs LAYER=base／top），真實影片疊在右邊的影片框裡；單獨打開這一頁時，影片框是空的。
const POINTS = [
  { t: '維持適齡運動量', d: '不安排<b>高強度衝刺、跳躍</b>' },
  { t: '控制體重在標準範圍', d: '<b>摸得到肋骨、看得到腰身</b>' },
  { t: '固定觀察清單', d: '<b>跛行、起身變慢、玩耍時間縮短</b>' },
];
// 每一張卡：亮起的時間、補充說明出現的時間（設計時間＝310＋這段開始後的秒數，對到旁白）
const PT = [[322.66, 325.64], [332.93, 335.91], [341.55, 343.38]];
Intro.scene({
  id: '44', title: '真實畫面：我家狗狗的日常保養', start: 310, end: 351.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 346.0, keyFromVideo: true,   // 分鏡板的關鍵畫面從成片截（頁面上影片框是空的）
  visuals: ["米色背景；右邊圓角影片框放直拍的真實影片：木平台上吐舌頭 → 沙發上坐著 → 地板曬太陽 → 林間步道 → 草地奔跑三段 → 牽繩散步 → 草地走路（側面） → 沙發上休息兩段 → 床上睡覺", "小標「真實案例 ／ 我家的狗狗」", "大標：「我家的狗狗：」（黑）／「無風險因子、無徵兆」（橘）", "小字：「沒有用任何關節保健品，重點放在三件事：」", "重點卡 1：「維持適齡運動量」＋「不安排高強度衝刺、跳躍」", "重點卡 2：「控制體重在標準範圍」＋「摸得到肋骨、看得到腰身」", "重點卡 3：「固定觀察清單」＋「跛行、起身變慢、玩耍時間縮短」"],
  motions: ["310.0 秒｜米色畫面淡入，影片框淡入開始播放", "310.4 秒｜小標逐字打出", "311.0 秒｜大標第一行冒出", "313.6 秒｜大標第二行冒出", "318.9 秒｜小字淡入", "320.8 秒｜三張重點卡依序浮上來（先變淡）", "322.66 秒｜重點卡 1 亮起，補充說明在 325.6 秒出現", "332.93 秒｜卡 1 的數字變橘，重點卡 2 亮起，補充說明在 335.9 秒出現", "341.55 秒｜卡 2 的數字變橘，重點卡 3 亮起，補充說明在 343.4 秒出現"],
  sfx: [
    [320.84, "pop-card", "重點卡 1 浮上：「啵」"],
    [320.96, "pop-card", "重點卡 2 浮上：「啵」", { pitch: 1.12 }],
    [321.08, "pop-card", "重點卡 3 浮上：「啵」", { pitch: 1.26 }],
    [322.66, "ding-soft", "重點 1 亮起：輕「叮」"],
    [332.93, "ding-soft", "重點 2 亮起：輕「叮」", { pitch: 1.12 }],
    [341.55, "ding-soft", "重點 3 亮起：輕「叮」", { pitch: 1.26 }],
  ],
  mount: [
    { into: '#chrome', html: `<div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>` },
    { into: '#S8', html: `
      <div class="vframe">真實影片</div>
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e8" data-text="真實案例 ／ 我家的狗狗"></div></div>
      <div class="h abs" style="left:72px;top:190px;font-size:72px"><span class="ln"><span id="h81">我家的狗狗：</span></span><span class="ln"><span id="h82" class="o">無風險因子、無徵兆</span></span></div>
      <div class="sub8" id="sub8">沒有用任何<b>關節保健品</b>，重點放在三件事：</div>
      ${POINTS.map((p, k) => `<div class="pt card" id="pt${k}" style="top:${450 + k * 168}px"><div class="nb" id="nb${k}">${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl" id="dl${k}">${p.d}</div></div></div>`).join('')}` },
  ],
  init() {
    gsap.set(['#S8', '#logo'], { opacity: 0 });
    gsap.set(['#h81', '#h82'], { yPercent: 110 });
    gsap.set('#sub8', { opacity: 0, y: 14 });
    gsap.set('.pt', { opacity: 0, y: 40 });
    gsap.set('.pt .dl', { opacity: 0, x: -14 });
  },
  animate({ L, E, type }) {
    L(['#S8', '#logo'], { opacity: 1, duration: .6 }, 310);
    type('#e8', 310.4, .6);
    L('#h81', { yPercent: 0, duration: .8, ease: 'power4.out' }, 311.0);
    L('#h82', { yPercent: 0, duration: .8, ease: 'power4.out' }, 313.6);
    L('#sub8', { opacity: 1, y: 0, duration: .5, ease: E }, 318.9);
    for (let k = 0; k < 3; k++) L('#pt' + k, { opacity: .5, y: 0, duration: .5, ease: 'back.out(1.6)' }, 320.84 + k * .12);
    PT.forEach(([on, d0], k) => {
      if (k > 0) {   // 上一張打勾、回到一般樣式
        L('#pt' + (k - 1), { opacity: .75, boxShadow: '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)', duration: .4 }, on);
        L('#nb' + (k - 1), { backgroundColor: '#F97316', color: '#fff', duration: .3 }, on);
      }
      L('#pt' + k, { opacity: 1, boxShadow: '0 0 0 4px #F97316,0 50px 90px -40px rgba(107,74,42,.35)', duration: .4, ease: E }, on);
      L('#nb' + k, { backgroundColor: '#FDE6D5', color: '#E2620E', duration: .3 }, on);
      L('#dl' + k, { opacity: 1, x: 0, duration: .45, ease: E }, d0);
    });
  },
});
