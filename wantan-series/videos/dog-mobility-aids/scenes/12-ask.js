// 幕 12｜買之前先問自己：還能自己站起來嗎？還能走幾步嗎？還是後半身要人扶？
const Q12 = [['還能自己站起來嗎？', '還能自己站'], ['還能靠自己的力量走幾步嗎？<br>還是後半身已經需要別人扶著，才能移動？', '牠還能']];
WT.scene('12', {
  enter: 'slide',
  visuals: ['大標：「買之前，」（黑）／「先問自己兩個問題」（橘）', ...Q12.map((q, k) => `問句卡 0${k + 1}：「${q[0].replace('<br>', '」／「')}」`), '右邊：黑柴歪頭坐'],
  mount: () => `
    ${L.h('h12', [['買之前，'], ['先問自己兩個問題', 'o']], { top: 150, size: 88 })}
    ${Q12.map((q, k) => `<div class="pt card" id="q12${k}" style="top:${440 + k * 190}px;width:1240px"><div class="nb">0${k + 1}</div><div class="tt">${q[0]}</div></div>`).join('')}
    <div class="abs" id="d12" style="left:1440px;top:420px;width:340px">${WT.dog('sit-tilt')}</div>`,
  init() { L.hInit('h12', 2); gsap.set('[id^=q12]', { opacity: 0, x: -40 }); gsap.set('#d12', { opacity: 0, y: 30 }); },
  animate(S) {
    L.hLine(S, '#h121', S.at(0), '大標第一行'); L.hLine(S, '#h122', S.at(1), '大標第二行（橘）');
    S.to('#d12', { opacity: 1, y: 0, duration: .6 }, S.at(1), '黑柴歪頭坐淡入');
    Q12.forEach((q, k) => { const t = S.word(q[1]); L.pop(S, '#q12' + k, t, `問句卡 0${k + 1} 由左滑入、加橘框`, 1, 'slide'); L.ring(S, '#q12' + k, t, k ? '#q12' + (k - 1) : null); });
  },
});
