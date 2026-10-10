// 幕 43｜「這張表只是提早留意的參考，不是診斷；混種犬一樣可能有風險，還是要由獸醫評估」
// 表格變淡、第 4 列的橘框收掉，中間浮上一張橘框提醒卡，三行重點隨旁白滑入；
// 接著換成「表格判讀提醒」卡（幕 43b）。
Intro.scene({
  id: '43', title: '不是診斷，請獸醫評估', start: 287.7, end: 295.0,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 294.8,
  visuals: ["表格變淡", "中間的白色提醒卡（橘框）：大字「這張表是「提早留意」的參考」", "重點一：「! 不是診斷」", "重點二：「! 混種犬、表上沒有的品種一樣可能有風險」", "重點三：「✓ 實際狀況請由獸醫評估」"],
  motions: ["287.7 秒｜表格變淡、第 4 列橘框收掉", "287.8 秒｜提醒卡浮上來", "290.04 秒｜重點一由左滑入", "290.94 秒｜重點二由左滑入", "293.14 秒｜重點三由左滑入"],
  sfx: [
    [287.7, "whoosh", "表格變淡：「咻」", { gain: 0.6 }],
    [287.8, "slide", "提醒卡浮上：輕「咻」"],
    [290.04, "tick-soft", "重點一：輕點"],
    [290.94, "tick-soft", "重點二：輕點", { pitch: 1.12 }],
    [293.14, "tick", "重點三：「叮咚」"],
  ],
  mount: [
    { into: '#S7-note', html: `
      <div class="note card" id="note">
        <div class="t">這張表是<span class="o">「提早留意」</span>的參考</div>
        <div class="l" id="nl0"><i>!</i>不是診斷</div>
        <div class="l" id="nl1"><i>!</i>混種犬、表上沒有的品種一樣可能有風險</div>
        <div class="l" id="nl2"><i style="background:var(--or-b);color:#fff">✓</i>實際狀況請由獸醫評估</div>
      </div>` },
  ],
  init() {
    gsap.set('#note', { opacity: 0, y: 50 });
    gsap.set(['#nl0', '#nl1', '#nl2'], { opacity: 0, x: -20 });
  },
  animate({ L, E }) {
    L('#tbl', { opacity: .18, duration: .6 }, 287.7);
    L('#tr3', { boxShadow: '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)', duration: .4 }, 287.7);
    L('#note', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 287.8);
    L('#nl0', { opacity: 1, x: 0, duration: .5, ease: E }, 290.04);
    L('#nl1', { opacity: 1, x: 0, duration: .5, ease: E }, 290.94);
    L('#nl2', { opacity: 1, x: 0, duration: .5, ease: E }, 293.14);
  },
});
