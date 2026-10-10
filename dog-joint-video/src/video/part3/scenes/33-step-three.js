// 幕 33｜3:20 第三步：「第三步：依照你家狗狗的狀況，判斷你該做什麼事」
// 新的米色畫面由下往上蓋過第二步；念到「第三步」時三步驟總覽浮上來、STEP 03 亮起，收起後小標「06 ／ 判斷第三步」打出，大標兩行冒出。
Intro.scene({
  id: '33', title: '第三步：該做的事', start: 200.0, end: 203.6,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 203.2,
  visuals: ["米色畫面（由下往上蓋進來）", "三步驟總覽：STEP 01、02 打勾，STEP 03 亮起（橘框、稍微放大）", "小標「06 ／ 判斷第三步」", "大標第一行：「依照你家狗狗的狀況，」（黑）", "大標第二行：「判斷你該做什麼事？」（橘）"],
  motions: ["200.0 秒｜米色畫面由下往上蓋過第二步，約 0.85 秒", "200.9 秒｜三張步驟卡依序浮上來", "201.3 秒｜念到「第三步」時 STEP 03 亮起", "201.62 秒｜三張卡往上收起", "201.7 秒｜小標逐字打出", "201.85 秒｜大標第一行冒出", "202.55 秒｜大標第二行冒出"],
  sfx: [
    [200.0, "whoosh-big", "米色畫面由下往上蓋上來：大「咻」"],
    [200.9, "pop-card", "步驟卡浮上：「啵」"],
    [201.3, "ding-soft", "STEP 03 亮起：輕「叮」"],
    [201.62, "whoosh", "步驟卡收起：「咻」", { gain: 0.6 }],
  ],
  mount: [
    { into: '#S6-text', html: `
      ${stepsHTML('ov3', 3)}
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e6" data-text="06 ／ 判斷第三步"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:104px" id="h6"><span class="ln"><span id="h61">依照你家狗狗的狀況，</span></span><span class="ln"><span id="h62" class="o">判斷你該做什麼事？</span></span></div>` },
  ],
  init() {
    gsap.set('#S6', { yPercent: 100 });
    stepsInit('ov3');
    gsap.set(['#h61', '#h62'], { yPercent: 110 });
  },
  animate({ L, type }) {
    L('#S6', { yPercent: 0, duration: .85, ease: 'power3.inOut' }, 200.0);
    stepsAnim(L, 'ov3', 3, { tIn: 200.9, tLight: 201.3, tOut: 201.62 });
    type('#e6', 201.7, .6);
    L('#h61', { yPercent: 0, duration: .8, ease: 'power4.out' }, 201.85);
    L('#h62', { yPercent: 0, duration: .8, ease: 'power4.out' }, 202.55);
  },
});
