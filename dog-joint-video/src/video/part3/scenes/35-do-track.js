// 幕 35｜「有風險因子、但還沒有徵兆：提早開始更密集的健檢追蹤……和獸醫討論需不需要提早介入」
// 左邊卡片變淡，中間卡片浮上來，四行重點隨旁白依序滑入。
Intro.scene({
  id: '35', title: '有風險因子・無徵兆', start: 212.5, end: 224.9,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 224.5,
  visuals: ["中間卡片：淡橘標籤「有風險因子・無徵兆」", "中間卡片標題：「提早追蹤」（橘），右上角放大鏡圖示", "重點一：「✓ 更密集的健檢追蹤」", "重點二：「✓ 年輕成犬就建立「基準值」」", "重點三：「✓ 做好體重管理」", "重點四：「✓ 和獸醫討論是否提早介入」", "左邊卡片變淡"],
  motions: ["212.7 秒｜左邊卡片變淡", "212.8 秒｜中間卡片浮上來", "215.0 秒｜重點一由左滑入", "216.9 秒｜重點二由左滑入", "220.4 秒｜重點三由左滑入", "221.7 秒｜重點四由左滑入"],
  sfx: [
    [212.8, "pop-card", "中間卡片浮上：「啵」", { pitch: 1.12 }],
    [215.0, "tick-soft", "重點一：輕點"],
    [216.9, "tick-soft", "重點二：輕點", { pitch: 1.06 }],
    [220.4, "tick-soft", "重點三：輕點", { pitch: 1.12 }],
    [221.7, "tick-soft", "重點四：輕點", { pitch: 1.19 }],
  ],
  mount: [
    { into: '#dos', html: `
      <div class="do card" id="do1" style="left:676px">
        <div class="tag" style="background:#FDE6D5;color:var(--or)">有風險因子・無徵兆</div>
        <div class="ttl o">提早追蹤</div>
        <div class="ic" id="doi1"></div>
        ${['更密集的健檢追蹤', '年輕成犬就建立「基準值」', '做好體重管理', '和獸醫討論是否提早介入'].map((t, i) => `<div class="bl" id="do1b${i}"><i style="background:var(--or-b);color:#fff">✓</i>${t}</div>`).join('')}
      </div>` },
  ],
  assets() {
    doi1.innerHTML = iconMagnifier('do1');
  },
  init() {
    gsap.set('#do1', { opacity: 0, y: 60 });
    gsap.set('[id^=do1b]', { opacity: 0, x: -20 });
  },
  animate({ L, E }) {
    L('#do0', { opacity: .5, duration: .5 }, 212.7);
    L('#do1', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 212.8);
    [215.0, 216.9, 220.4, 221.7].forEach((t, i) => L('#do1b' + i, { opacity: 1, x: 0, duration: .5, ease: E }, t));
  },
});
