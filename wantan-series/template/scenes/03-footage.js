// 幕 03｜真實畫面（系列固定版型）：直拍影片放右邊的框，左邊說明字卡（每張卡只有一行說明），念到時依序浮上來、加橘框。
// 還沒收到影片時，框裡顯示「真實畫面待補」和需要的秒數。
const POINTS = [
  { at: '青壯年', t: '我家狗狗：青壯年、無風險因子', d: '目前<b>沒有</b>用關節保健品' },
  { at: '一、維持', t: '一、維持適齡運動量', d: '避免硬地面<b>急停急轉</b>' },
  { at: '二、控制', t: '二、控制體重在標準範圍', d: '摸得到肋骨、看得到<b>腰身</b>' },
];
WT.scene('03', {
  enter: 'slide',
  visuals: ['米色背景；右邊直式影片框（真實畫面）', ...POINTS.map((p, k) => `左邊字卡 0${k + 1}：「${p.t}」＋「${p.d.replace(/<\/?b>/g, '')}」`)],
  mount: S => S.footage() + POINTS.map((p, k) =>
    `<div class="pt card" id="pt${k}" style="top:${170 + k * 250}px"><div class="nb">0${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl">${p.d}</div></div></div>`).join(''),
  init() { gsap.set('.pt', { opacity: 0, x: -40 }); },
  animate(S) {
    const ring = '0 0 0 5px #F97316,0 50px 90px -40px rgba(107,74,42,.35)';
    const plain = '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)';
    POINTS.forEach((p, k) => {
      const t = S.word(p.at, 0, -.15);
      if (k > 0) S.to('#pt' + (k - 1), { boxShadow: plain, duration: .4 }, t);
      S.to('#pt' + k, { opacity: 1, x: 0, boxShadow: ring, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由左滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
