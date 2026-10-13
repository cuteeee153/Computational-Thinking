// 幕 43b｜「如果你的狗狗同時符合『體型偏大』＋『表列品種』＋『曾快速生長或曾受傷』這三項，
//          建議把健檢追蹤頻率提前到年輕成犬階段就開始，而不是等到出現跛行才行動」
// 「不是診斷」提醒卡收起，換成「表格判讀提醒」卡：三個條件隨旁白一個個彈出，接著出現「→ 年輕成犬階段就開始健檢追蹤」；
// 停一下之後米色畫面往右滑出，露出五類風險因子（幕 23 停住的畫面），接幕 23b。
// 整段的結尾（part4.html 的 duration）＝245＋place-part4.py 算出的整段長度。
Intro.scene({
  id: '43b', title: '表格判讀提醒', start: 295.42, end: 309.533,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 306.92,
  visuals: ["表格維持變淡", "中間的白色提醒卡（橘框）：小字「表格判讀提醒」，大字「如果你的狗狗同時符合這三項」", "三個橘色條件標籤：「體型偏大」＋「表列品種」＋「曾快速生長或曾受傷」", "下方建議：橘色箭頭＋橘色大字「年輕成犬階段就開始健檢追蹤」，下方小字「不要等到出現跛行才行動」", "最後米色畫面往右滑出，回到五類風險因子"],
  motions: ["295.42 秒｜「不是診斷」提醒卡往下淡出", "295.72 秒｜「表格判讀提醒」卡浮上來", "297.77 秒｜「體型偏大」彈出", "298.72 秒｜「表列品種」彈出", "300.17 秒｜「曾快速生長或曾受傷」彈出", "302.41 秒｜建議由左滑入（念到「建議把健檢追蹤頻率提前」）", "308.07 秒｜米色畫面往右滑出，約 0.85 秒"],
  sfx: [
    [295.42, "whoosh", "提醒卡收起：「咻」", { gain: 0.6 }],
    [295.72, "slide", "判讀提醒卡浮上：輕「咻」"],
    [297.77, "pop-card", "條件 1 彈出：「啵」"],
    [298.72, "pop-card", "條件 2 彈出：「啵」", { pitch: 1.12 }],
    [300.17, "pop-card", "條件 3 彈出：「啵」", { pitch: 1.26 }],
    [302.41, "tick", "建議滑入：「叮咚」"],
    [308.07, "whoosh-big", "米色畫面往右滑出：大「咻」", { gain: 0.8 }],
  ],
  mount: [
    { into: '#S7-note', html: `
      <div class="tip card" id="tip">
        <div class="k">表格判讀提醒</div>
        <div class="t">如果你的狗狗<span class="o">同時符合</span>這三項</div>
        <div class="row"><span class="chip" id="tc0">體型偏大</span><span class="plus" id="tp0">＋</span><span class="chip" id="tc1">表列品種</span><span class="plus" id="tp1">＋</span><span class="chip" id="tc2">曾快速生長或曾受傷</span></div>
        <div class="res" id="tres"><div class="ar">→</div><div><b class="o">年輕成犬階段就開始健檢追蹤</b><span>不要等到出現跛行才行動</span></div></div>
      </div>` },
  ],
  init() {
    gsap.set('#tip', { opacity: 0, y: 50 });
    gsap.set(['#tc0', '#tc1', '#tc2'], { opacity: 0, scale: .6 });
    gsap.set(['#tp0', '#tp1'], { opacity: 0 });
    gsap.set('#tres', { opacity: 0, x: -24 });
  },
  animate({ L, E }) {
    L('#note', { opacity: 0, y: 30, duration: .45, ease: 'power2.in' }, 295.42);
    L('#tip', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 295.72);
    L('#tc0', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 297.77);
    L(['#tp0', '#tc1'], { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 298.72);
    L(['#tp1', '#tc2'], { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 300.17);
    L('#tres', { opacity: 1, x: 0, duration: .5, ease: E }, 302.41);
    L('#S7', { xPercent: 100, duration: .85, ease: 'power3.inOut' }, 308.07);
  },
});
