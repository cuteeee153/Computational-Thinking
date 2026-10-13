// 幕 38｜真實畫面（直拍放右邊）：② 尺寸合身比功能多更重要；左邊三張說明卡
const P38 = [
  { at: '第二', t: '尺寸合身，比功能多更重要', d: '比預算更重要的<b>第二件事</b>' },
  { at: '尺寸不合', t: '尺寸不合：磨傷皮膚、姿勢不自然', d: '可能讓狗狗用<b>不自然的姿勢</b>走路' },
  { at: '所以購買前', t: '先量尺寸、確認體重', d: '不要只看<b>體型或品種</b>' },
];
WT.scene('38', {
  enter: 'slide',
  visuals: ['米色背景；右邊直式影片框（真實畫面）', ...P38.map((p, k) => `左邊字卡 0${k + 1}：「${p.t}」＋「${p.d.replace(/<\/?b>/g, '')}」`)],
  mount: S => S.footage() + P38.map((p, k) =>
    `<div class="pt card" id="p38${k}" style="top:${190 + k * 250}px"><div class="nb">0${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl">${p.d}</div></div></div>`).join(''),
  init() { gsap.set('[id^=p38]', { opacity: 0, x: -40 }); },
  animate(S) {
    P38.forEach((p, k) => {
      const t = S.word(p.at, 0, -.15);
      L.ring(S, '#p38' + k, t, k ? '#p38' + (k - 1) : null);
      S.to('#p38' + k, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由左滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
