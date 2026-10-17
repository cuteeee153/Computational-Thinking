// 幕 38｜② 尺寸合身：上方三個頁籤（02 亮橘）；左邊兩張說明卡；右邊黑柴正面站
const P38 = [
  { at: '尺寸不合', t: '尺寸不合：磨傷皮膚、姿勢不自然', d: '可能讓狗狗用<b>不自然的姿勢</b>走路' },
  { at: '所以購買前', t: '先量尺寸、確認體重', d: '不要只看<b>體型或品種</b>' },
];
WT.scene('38', {
  enter: 'slide',
  visuals: ['上方三個頁籤，02 尺寸合身亮橘', '大字：「尺寸合身，比功能多更重要」', ...P38.map((p, k) => `字卡 0${k + 1}：「${p.t}」＋「${p.d.replace(/<\/?b>/g, '')}」`), '右邊：黑柴側站（另一張）'],
  mount: () => `${tabs(1)}
    <div class="big" id="b38" style="left:72px;top:250px;font-size:72px">尺寸合身，<span class="o">比功能多更重要</span></div>` + P38.map((p, k) =>
    `<div class="pt card" id="p38${k}" style="top:${430 + k * 230}px"><div class="nb">0${k + 1}</div><div><div class="tt">${p.t}</div><div class="dl">${p.d}</div></div></div>`).join('') +
    `<div class="abs" id="d38" style="left:1400px;top:360px;width:420px">${WT.dog('stand-side-2')}</div>`,
  init() { gsap.set('#b38', { opacity: 0, y: 30 }); gsap.set('[id^=p38]', { opacity: 0, x: -40 }); gsap.set('#d38', { opacity: 0, y: 30 }); },
  animate(S) {
    S.to('#b38', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.at(0), '大字浮上'); S.sfx(S.at(0), 'pop-card', '「啵」');
    S.to('#d38', { opacity: 1, y: 0, duration: .6 }, S.at(0), '黑柴淡入');
    P38.forEach((p, k) => {
      const t = S.word(p.at, 0, -.15);
      L.ring(S, '#p38' + k, t, k ? '#p38' + (k - 1) : null);
      S.to('#p38' + k, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由左滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
