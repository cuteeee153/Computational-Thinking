// 幕 23｜真實畫面（直拍放右邊）：第一階段先改善環境；左邊三張說明卡
const P23 = [
  { at: '不一定', t: '不一定需要馬上買輔具', d: '第一階段：先從<b>環境</b>開始' },
  { at: '鋪上', t: '鋪止滑墊、減少上下樓梯', d: '再<b>調整運動量</b>' },
  { at: '如果還沒', t: '還沒看過獸醫？先檢查', d: '找出<b>動作變慢</b>的原因' },
];
WT.scene('23', {
  enter: 'slide',
  visuals: ['米色背景；右邊直式影片框（真實畫面）', ...P23.map((p, k) => `左邊字卡 0${k + 1}：「${p.t}」＋「${p.d.replace(/<\/?b>/g, '')}」`)],
  mount: S => S.footage() + P23.map((p, k) =>
    `<div class="pt card" id="p23${k}" style="top:${190 + k * 250}px"><div class="nb">0${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl">${p.d}</div></div></div>`).join(''),
  init() { gsap.set('[id^=p23]', { opacity: 0, x: -40 }); },
  animate(S) {
    P23.forEach((p, k) => {
      const t = S.word(p.at, 0, -.15);
      L.ring(S, '#p23' + k, t, k ? '#p23' + (k - 1) : null);
      S.to('#p23' + k, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由左滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
