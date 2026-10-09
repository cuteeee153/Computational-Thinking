// 幕 13｜「這支影片用三步驟」
// STEP 01–03 依序從左滑進文件卡；越後面的步驟越淡，暗示「還沒走到」。
Intro.scene({
  id: '13', title: '三步驟', start: 33.2, end: 35.6,
  narration: [[33.2, 35.4, '這支影片用三步驟，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 35.2,
  visuals: ["文件卡內三列：STEP 01 有風險因子嗎？／STEP 02 有蛛絲馬跡嗎？／STEP 03 下一步該做什麼？", "越後面的步驟顏色越淡"],
  motions: ["33.3 秒｜STEP 01 從左滑入", "33.7 秒｜STEP 02 滑入", "34.1 秒｜STEP 03 滑入"],
  sfx: [
    [33.3, "tick-soft", "STEP 01 滑入：輕點"],
    [33.7, "tick-soft", "STEP 02 滑入：輕點", { pitch: 1.12 }],
    [34.1, "tick-soft", "STEP 03 滑入：輕點", { pitch: 1.26 }],
  ],
  mount: [
    { into: '#doc', html: `
      <div class="row" id="r1"><div class="k" style="width:110px">STEP 01</div><div class="t">有風險因子嗎？</div></div>
      <div class="row" id="r2"><div class="k" style="width:110px">STEP 02</div><div class="t">有蛛絲馬跡嗎？</div></div>
      <div class="row" id="r3" style="padding-bottom:0"><div class="k" style="width:110px">STEP 03</div><div class="t">下一步該做什麼？</div></div>` },
  ],
  init() {
    gsap.set(['#r1', '#r2', '#r3'], { opacity: 0, x: -30 });
  },
  animate({ L, E }) {
    L('#r1', { opacity: 1, x: 0, duration: .5, ease: E }, 33.3);
    L('#r2', { opacity: .55, x: 0, duration: .5, ease: E }, 33.7);
    L('#r3', { opacity: .35, x: 0, duration: .5, ease: E }, 34.1);
  },
});
