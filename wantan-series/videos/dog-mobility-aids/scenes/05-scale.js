// 幕 05｜從輕微到需要更多支撐：一條由淺到深的橘色軸，三種輔具依序站上去
const D5 = ['harness', 'sling', 'wheel'];
WT.scene('05', {
  enter: 'slide',
  visuals: ['大標：「從比較輕微，」（黑）／「一路講到需要更多支撐」（橘）', '下方一條淺橘到深橘的軸，左端「比較輕微」、右端「需要更多支撐」', '三種輔具卡（輔助帶、助行吊帶、輪椅）由左到右站上軸'],
  mount: () => `
    ${L.h('h5', [['從比較輕微，'], ['一路講到需要更多支撐', 'o']], { top: 140, size: 84 })}
    ${D5.map((k, i) => `<div class="abs" id="d5${i}" style="left:${300 + i * 560}px;top:${470}px;width:300px;text-align:center">${L.dev(k)}<div style="margin-top:6px;font-size:38px;font-weight:900">${L.DEV_NAME[k]}</div></div>`).join('')}
    <div class="axis" id="ax5" style="top:900px"></div>
    <div class="axl" id="al5" style="left:150px;top:940px">比較輕微</div><div class="axl" id="ar5" style="right:150px;top:940px;color:var(--or)">需要更多支撐</div>`,
  init() { L.hInit('h5', 2); gsap.set('#ax5', { scaleX: 0 }); gsap.set(['#al5', '#ar5'], { opacity: 0 }); gsap.set('[id^=d5]', { opacity: 0, y: 40 }); },
  animate(S) {
    L.hLine(S, '#h51', S.word('比較輕微'), '大標第一行'); 
    S.to('#ax5', { scaleX: 1, duration: 1.4, ease: 'power2.inOut' }, S.word('比較輕微'), '橘色軸由左往右畫出');
    S.sfx(S.word('比較輕微'), 'draw', '畫線：沙沙', { dur: 1.3 });
    S.to('#al5', { opacity: 1, duration: .4 }, S.word('比較輕微', 0, .3));
    L.hLine(S, '#h52', S.word('一路講到'), '大標第二行（橘）');
    S.to('#ar5', { opacity: 1, duration: .4 }, S.word('更多支撐'));
    const t = S.word('三種輔具');
    D5.forEach((k, i) => L.pop(S, '#d5' + i, t + i * .35, `${L.DEV_NAME[k]}站上軸`, [1, 1.12, 1.26][i]));
  },
});
