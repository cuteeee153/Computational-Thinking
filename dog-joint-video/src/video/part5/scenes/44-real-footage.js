// 幕 44｜真實畫面：「我自己養的是一隻還在青壯年階段的狗……而不是等牠自己走路一拐一拐才驚覺」
// 這一段要換成拍攝者的真實影片（長度見 narration/part5-anchors.json 的 length）。
// 還沒拿到影片前先放深色佔位卡；三件事念到時，左下角出現白色標籤（換成真實影片後也打算保留這三個標籤）。
Intro.scene({
  id: '44', title: '真實畫面：我家狗狗的日常保養（佔位）', start: 310, end: 351.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 346.0,
  visuals: ["（佔位）深色畫面，中間大字「真實畫面」，小字「這裡放你拍的狗狗影片（41.5 秒）」，右上角虛線標籤「PLACEHOLDER」", "左下角白色標籤：「1 維持適齡運動量」", "左下角白色標籤：「2 控制體重在標準範圍」", "左下角白色標籤：「3 固定觀察清單」"],
  motions: ["310.0 秒｜回顧畫面淡出，換成真實畫面（佔位）", "322.66 秒｜念到「一、」時標籤 1 由左滑入", "332.93 秒｜換成標籤 2", "341.55 秒｜換成標籤 3", "350.5 秒｜標籤收起"],
  sfx: [
    [322.66, "slide", "標籤 1 滑入：輕「咻」", { gain: 0.6 }],
    [332.93, "slide", "標籤 2 滑入：輕「咻」", { gain: 0.6 }],
    [341.55, "slide", "標籤 3 滑入：輕「咻」", { gain: 0.6 }],
  ],
  mount: [
    { into: '#chrome', html: `<div class="logo" id="logo" style="color:#FFF6EC"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>` },
    { into: '#S8', html: `
      <div class="tag">PLACEHOLDER</div>
      <div class="ph"><b>真實畫面</b><span>這裡放你拍的狗狗影片（41.5 秒）</span></div>
      <div class="lt" id="lt0"><i>1</i>維持適齡運動量</div>
      <div class="lt" id="lt1"><i>2</i>控制體重在標準範圍</div>
      <div class="lt" id="lt2"><i>3</i>固定觀察清單</div>` },
  ],
  init() {
    gsap.set(['#S8', '#logo'], { opacity: 0 });
    gsap.set(['#lt0', '#lt1', '#lt2'], { opacity: 0, x: -40 });
  },
  animate({ L, E }) {
    L(['#S8', '#logo'], { opacity: 1, duration: .6 }, 310);
    L('#lt0', { opacity: 1, x: 0, duration: .5, ease: E }, 322.66);
    L('#lt0', { opacity: 0, x: -40, duration: .35 }, 332.6);
    L('#lt1', { opacity: 1, x: 0, duration: .5, ease: E }, 332.93);
    L('#lt1', { opacity: 0, x: -40, duration: .35 }, 341.2);
    L('#lt2', { opacity: 1, x: 0, duration: .5, ease: E }, 341.55);
    L('#lt2', { opacity: 0, x: -40, duration: .35 }, 350.5);
  },
});
