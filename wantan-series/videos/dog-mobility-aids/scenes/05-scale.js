// 幕 05｜從輕微到需要更多支撐：一條由淺到深的橘色軸，三種輔具依序站上去
const D5 = ['harness', 'sling', 'wheel'];
WT.scene('05', {
  enter: 'slide',
  visuals: ['畫面中間偏下一條淺橘到深橘的軸，左端「比較輕微」、右端「需要更多支撐」', '三種輔具（輔助帶、助行吊帶、輪椅）置中，由左到右站上軸'],
  mount: () => `
    ${D5.map((k, i) => `<div class="abs" id="d5${i}" style="left:${810 + (i - 1) * 560}px;top:250px;width:300px;text-align:center">${L.dev(k)}<div style="margin-top:6px;font-size:38px;font-weight:900">${L.DEV_NAME[k]}</div></div>`).join('')}
    <div class="axis" id="ax5" style="top:720px"></div>
    <div class="axl" id="al5" style="left:150px;top:760px">比較輕微</div><div class="axl" id="ar5" style="right:150px;top:760px;color:var(--or)">需要更多支撐</div>`,
  init() { gsap.set('#ax5', { scaleX: 0 }); gsap.set(['#al5', '#ar5'], { opacity: 0 }); gsap.set('[id^=d5]', { opacity: 0, y: 40 }); },
  animate(S) {
    S.to('#ax5', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, S.word('比較輕微'), '橘色軸由左往右畫出');
    S.sfx(S.word('比較輕微'), 'draw', '畫線：沙沙', { dur: 1.3 });
    S.to('#al5', { opacity: 1, duration: .4 }, S.word('比較輕微', 0, .3));
    S.to('#ar5', { opacity: 1, duration: .4 }, S.word('更多支撐'));
    const t = S.word('三種輔具');
    D5.forEach((k, i) => L.pop(S, '#d5' + i, t + i * .35, `${L.DEV_NAME[k]}站上軸`, [1, 1.12, 1.26][i]));
  },
});
