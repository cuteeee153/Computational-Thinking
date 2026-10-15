// 幕 23｜第一階段先改善環境：左邊三張說明卡（念到時依序滑入、加橘框），右邊黑柴趴著
const P23 = [
  { at: '可以先改善', t: '先改善家裡環境', d: '鋪上<b>止滑墊</b>、減少<b>上下樓梯</b>' },
  { at: '再調整', t: '調整運動量', d: '減少<b>散步、跑跳</b>' },
  { at: '如果還沒', t: '找獸醫檢查', d: '找出<b>動作變慢</b>的原因' },
];
WT.scene('23', {
  enter: 'slide',
  visuals: [...P23.map((p, k) => `左邊字卡 0${k + 1}：「${p.t}」＋「${p.d.replace(/<\/?b>/g, '')}」`), '右邊：黑柴趴著'],
  mount: () => P23.map((p, k) =>
    `<div class="pt card" id="p23${k}" style="top:${200 + k * 240}px"><div class="nb">0${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl">${p.d}</div></div></div>`).join('') +
    `<div class="abs" id="d23" style="left:1290px;top:440px;width:560px">${WT.dog('lying')}</div>`,
  init() { gsap.set('[id^=p23]', { opacity: 0, x: -40 }); gsap.set('#d23', { opacity: 0, y: 30 }); },
  animate(S) {
    S.to('#d23', { opacity: 1, y: 0, duration: .6 }, S.at(0), '黑柴趴著淡入');
    P23.forEach((p, k) => {
      const t = S.word(p.at, 0, -.15);
      L.ring(S, '#p23' + k, t, k ? '#p23' + (k - 1) : null);
      S.to('#p23' + k, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由左滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
