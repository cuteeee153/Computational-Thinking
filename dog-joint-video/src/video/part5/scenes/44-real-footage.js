// 幕 44｜真實畫面：「我自己養的是一隻還在青壯年階段的狗……而不是等牠自己走路一拐一拐才驚覺」
// 畫面是拍攝者的真實影片（assets/footage/footage.json 剪接、build-footage.py 輸出 footage.mp4，長度＝narration/part5-anchors.json 的 length）。
// 這一頁用 OVERLAY 模式輸出（去掉深色佔位卡），只把頻道名稱、三個標籤和字幕疊在真實影片上；
// 單獨打開這一頁時看到的深色「真實畫面」卡只是佔位。三件事念到時，左下角出現白色標籤。
Intro.scene({
  id: '44', title: '真實畫面：我家狗狗的日常保養', start: 310, end: 351.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 346.0, keyFromVideo: true,   // 分鏡板的關鍵畫面從成片截（頁面上只有佔位卡）
  visuals: ["真實影片（直拍放中間、兩側模糊填滿）：木平台上吐舌頭 → 沙發上坐著 → 地板曬太陽 → 林間步道 → 草地奔跑三段 → 牽繩散步 → 草地走路（側面） → 沙發上休息兩段 → 床上睡覺（橫拍）", "左上角頻道名稱（白字）", "左下角白色標籤：「1 維持適齡運動量」", "左下角白色標籤：「2 控制體重在標準範圍」", "左下角白色標籤：「3 固定觀察清單」"],
  motions: ["310.0 秒｜回顧畫面淡出，換成真實影片（約 0.5 秒）", "322.66 秒｜念到「一、」時標籤 1 由左滑入", "332.93 秒｜換成標籤 2", "341.55 秒｜換成標籤 3", "350.5 秒｜標籤收起"],
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
