// 幕 43｜「這張表只是提早留意的參考，不是診斷；混種犬一樣可能有風險，還是要由獸醫評估」
// 表格變淡、第 4 列的橘框收掉，中間浮上一張橘框提醒卡，三行重點隨旁白滑入；
// 停一下之後米色畫面往右滑出，露出五類風險因子（幕 23 停住的畫面），接幕 23b。
// 整段的結尾（part4.html 的 duration）＝245＋place-part4.py 算出的整段長度。
Intro.scene({
  id: '43', title: '不是診斷，請獸醫評估', start: 283.0, end: 291.833,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 289.8,
  visuals: ["表格變淡", "中間的白色提醒卡（橘框）：大字「這張表是「提早留意」的參考」", "重點一：「! 不是診斷」", "重點二：「! 混種犬、表上沒有的品種一樣可能有風險」", "重點三：「✓ 實際狀況請由獸醫評估」", "最後米色畫面往右滑出，回到五類風險因子"],
  motions: ["283.0 秒｜表格變淡、第 4 列橘框收掉", "283.1 秒｜提醒卡浮上來", "285.3 秒｜重點一由左滑入", "286.19 秒｜重點二由左滑入", "288.39 秒｜重點三由左滑入", "290.45 秒｜米色畫面往右滑出，約 0.85 秒"],
  sfx: [
    [283.0, "whoosh", "表格變淡：「咻」", { gain: 0.6 }],
    [283.1, "slide", "提醒卡浮上：輕「咻」"],
    [285.3, "tick-soft", "重點一：輕點"],
    [286.19, "tick-soft", "重點二：輕點", { pitch: 1.12 }],
    [288.39, "tick", "重點三：「叮咚」"],
    [290.45, "whoosh-big", "米色畫面往右滑出：大「咻」", { gain: 0.8 }],
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
    L('#tbl', { opacity: .18, duration: .6 }, 283.0);
    L('#tr3', { boxShadow: '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)', duration: .4 }, 283.0);
    L('#note', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 283.1);
    L('#nl0', { opacity: 1, x: 0, duration: .5, ease: E }, 285.3);
    L('#nl1', { opacity: 1, x: 0, duration: .5, ease: E }, 286.19);
    L('#nl2', { opacity: 1, x: 0, duration: .5, ease: E }, 288.39);
    L('#S7', { xPercent: 100, duration: .85, ease: 'power3.inOut' }, 290.45);
  },
});
