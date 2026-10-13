// 幕 34｜「沒有風險因子、也沒有徵兆：均衡飲食、適齡適量的運動，幼犬期避免高強度的衝擊，維持正常的健檢頻率就好」
// 三張「該做的事」卡的第一張（左）浮上來，四行重點隨旁白依序滑入。卡片外框在這裡放好，另外兩張在第 35、36 幕。
Intro.scene({
  id: '34', title: '無風險因子・無徵兆', start: 203.6, end: 212.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 212.0,
  visuals: ["左邊卡片：灰色標籤「無風險因子・無徵兆」", "左邊卡片標題：「基礎保養」，右上角飯碗圖示", "重點一：「✓ 均衡飲食」", "重點二：「✓ 適齡適量運動」", "重點三：「✓ 幼犬期避免高強度衝擊」", "重點四：「✓ 維持正常健檢頻率」"],
  motions: ["203.9 秒｜左邊卡片浮上來", "206.0 秒｜重點一由左滑入", "206.8 秒｜重點二由左滑入", "208.0 秒｜重點三由左滑入", "209.7 秒｜重點四由左滑入"],
  sfx: [
    [203.9, "pop-card", "左邊卡片浮上：「啵」"],
    [206.0, "tick-soft", "重點一：輕點"],
    [206.8, "tick-soft", "重點二：輕點", { pitch: 1.06 }],
    [208.0, "tick-soft", "重點三：輕點", { pitch: 1.12 }],
    [209.7, "tick-soft", "重點四：輕點", { pitch: 1.19 }],
  ],
  mount: [
    { into: '#dos', html: `
      <div class="do card" id="do0" style="left:72px">
        <div class="tag">無風險因子・無徵兆</div>
        <div class="ttl">基礎保養</div>
        <div class="ic" id="doi0"></div>
        ${['均衡飲食', '適齡適量運動', '幼犬期避免高強度衝擊', '維持正常健檢頻率'].map((t, i) => `<div class="bl" id="do0b${i}"><i style="background:#DCF2E3;color:#2E9E5B">✓</i>${t}</div>`).join('')}
      </div>` },
  ],
  assets() {
    doi0.innerHTML = iconBowl('do0');
  },
  init() {
    gsap.set('#do0', { opacity: 0, y: 60 });
    gsap.set('[id^=do0b]', { opacity: 0, x: -20 });
  },
  animate({ L, E }) {
    L('#do0', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 203.9);
    [206.0, 206.8, 208.0, 209.7].forEach((t, i) => L('#do0b' + i, { opacity: 1, x: 0, duration: .5, ease: E }, t));
  },
});
