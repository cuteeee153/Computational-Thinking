// 幕 36｜「已經出現任何徵兆，不論輕重：先預約獸醫評估，排除神經或其他問題之後，再來談保養和保健品」
// 中間卡片變淡，右邊橘色卡片浮上來，三個步驟編號隨旁白依序滑入。
Intro.scene({
  id: '36', title: '出現任何徵兆', start: 224.9, end: 232.8,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 232.4,
  visuals: ["右邊卡片：橘底白字標籤「出現任何徵兆」", "右邊卡片標題：「先看獸醫」（橘），右上角夾板圖示，橘色外框", "步驟 1：「預約獸醫評估」", "步驟 2：「排除神經或其他問題」", "步驟 3：「再談保養與保健品」", "中間卡片變淡"],
  motions: ["225.1 秒｜中間卡片變淡", "225.2 秒｜右邊卡片浮上來", "227.5 秒｜步驟 1 由左滑入", "228.6 秒｜步驟 2 由左滑入", "230.3 秒｜步驟 3 由左滑入"],
  sfx: [],
  mount: [
    { into: '#dos', html: `
      <div class="do card" id="do2" style="left:1280px;box-shadow:0 0 0 4px #F97316,0 50px 90px -40px rgba(107,74,42,.35)">
        <div class="tag" style="background:var(--or-b);color:#fff">出現任何徵兆</div>
        <div class="ttl o">先看獸醫</div>
        <div class="ic" id="doi2"></div>
        ${['預約獸醫評估', '排除神經或其他問題', '再談保養與保健品'].map((t, i) => `<div class="bl" id="do2b${i}"><i style="background:#231B15;color:#fff;font-family:'Space Mono'">${i + 1}</i>${t}</div>`).join('')}
      </div>` },
  ],
  assets() {
    doi2.innerHTML = iconClipboard('do2');
  },
  init() {
    gsap.set('#do2', { opacity: 0, y: 60 });
    gsap.set('[id^=do2b]', { opacity: 0, x: -20 });
  },
  animate({ L, E }) {
    L('#do1', { opacity: .5, duration: .5 }, 225.1);
    L('#do2', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 225.2);
    [227.5, 228.6, 230.3].forEach((t, i) => L('#do2b' + i, { opacity: 1, x: 0, duration: .5, ease: E }, t));
  },
});
