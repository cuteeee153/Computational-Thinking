// 幕 23｜「一共五類」＋前三類風險因子
// 右上角出現大大的「5 類」，下方的風險因子卡隨旁白一張張浮上來（這一幕是 01～03）。
// 卡片的外框在這裡放好，圖示在 assets 填入；04、05 兩張在第 24 幕加入。
Intro.scene({
  id: '23', title: '五類風險因子（01–03）', start: 108.1, end: 118.9,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 118.5,
  visuals: ["右上角大大的橘色「5」，旁邊「類」與小字「你該注意的風險因子」", "卡片 01：標籤圖示＋「特定的好發品種」", "卡片 02：體重計圖示＋「體重過重或骨架偏大」", "卡片 03：繃帶圖示＋「曾經關節或韌帶受傷」"],
  motions: ["108.2 秒｜「5 類」由右滑入", "110.0 秒｜卡片 01 浮上來", "113.0 秒｜卡片 02 浮上來", "116.1 秒｜卡片 03 浮上來"],
  sfx: [
    [108.24, "slide", "「5 類」滑入：輕「咻」"],
    [110.01, "pop-card", "卡片 01 浮上：「啵」"],
    [113.04, "pop-card", "卡片 02 浮上：「啵」", { pitch: 1.12 }],
    [116.06, "pop-card", "卡片 03 浮上：「啵」", { pitch: 1.26 }],
  ],
  mount: [
    { into: '#S4-text', html: `
      <div class="abs" style="right:72px;top:150px;display:flex;align-items:flex-end;gap:20px" id="five">
        <div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:250px;line-height:.8;color:var(--or);letter-spacing:-.05em">5</div>
        <div style="padding-bottom:10px"><div style="font-size:60px;font-weight:900;letter-spacing:-.04em">類</div><div class="k" style="font-size:18px;margin-top:6px">你該注意的風險因子</div></div>
      </div>` },
    { into: '#rfs', html: `
      <div class="rf card" id="rf0" style="left:72px"><div class="num">01</div><div class="ic" id="rfi0"></div><div class="tt" id="rft0">特定的<br>好發品種</div></div>
      <div class="rf card" id="rf1" style="left:432px"><div class="num">02</div><div class="ic" id="rfi1"></div><div class="tt" id="rft1">體重過重<br>或骨架偏大</div></div>
      <div class="rf card" id="rf2" style="left:792px"><div class="num">03</div><div class="ic" id="rfi2"></div><div class="tt" id="rft2">曾經關節<br>或韌帶受傷</div></div>` },
  ],
  assets() {
    rfi0.innerHTML = iconTag('rf0');
    rfi1.innerHTML = iconScale('rf1');
    rfi2.innerHTML = iconBandage('rf2');
  },
  init() {
    gsap.set('#five', { opacity: 0, x: 40 });
    gsap.set(['#rf0', '#rf1', '#rf2'], { opacity: 0, y: 60 });
  },
  animate({ L, E }) {
    L('#five', { opacity: 1, x: 0, duration: .7, ease: E }, 108.24);
    L('#rf0', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 110.01);
    L('#rf1', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 113.04);
    L('#rf2', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 116.06);
  },
});
