// 幕 23｜「所謂的風險因子一共有五大類：屬於特定的好發品種、」
// 右上角出現大大的「5 類」，下方的風險因子卡 01 浮上來、加上橘框；接著轉到品種對照表（幕 38–43）。
// 卡片 01～03 的外框都在這裡放好，圖示在 assets 填入；02、03 在幕 23b（品種表之後）浮上來，04、05 在第 24 幕加入。
// 設計時間 112.0 之後畫面停住，等品種表播完（timing/warp.json 的 [112.0]→[112.01] 那一段）。
Intro.scene({
  id: '23', title: '五類風險因子：01 好發品種', start: 108.1, end: 112.0,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 111.9,
  visuals: ["右上角大大的橘色「5」，旁邊「類」與小字「你該注意的風險因子」", "卡片 01：標籤圖示＋「特定的好發品種」", "卡片 01 加上橘框（接著轉到品種對照表）"],
  motions: ["108.2 秒｜「5 類」由右滑入", "110.0 秒｜卡片 01 浮上來", "111.2 秒｜卡片 01 加上橘框"],
  sfx: [
    [108.24, "slide", "「5 類」滑入：輕「咻」"],
    [110.01, "pop-card", "卡片 01 浮上：「啵」"],
    [111.2, "ding-soft", "卡片 01 加上橘框：輕「叮」"],
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
    L('#rf0', { boxShadow: '0 0 0 5px #F97316,0 50px 90px -40px rgba(107,74,42,.35)', duration: .4, ease: E }, 111.2);
  },
});
