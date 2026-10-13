// 幕 19｜輔具只是照護的一環：輔具＋環境＋照護方式，三塊拼在一起
WT.scene('19', {
  enter: 'slide',
  visuals: ['灰字小標：「這份指引並沒有直接討論輪椅」', '大標：「不是買一件輔具就結束」（黑）', '三張卡由左到右：「輔具」＋「適合的環境」＋「照護方式」，中間有加號', '橘色大字：「要搭配適合的環境和照護方式」'],
  mount: () => `
    <div class="note" id="n19" style="left:72px;top:150px">ⓘ 這份指引並沒有直接討論輪椅</div>
    ${L.h('h19', [['照顧狗狗的行動力，'], ['不是買一件輔具就結束', 'o']], { top: 220, size: 88 })}
    ${[['輔具', () => `<div style="width:170px">${L.dev('harness')}</div>`], ['適合的環境', () => iconStairs('i19a')], ['照護方式', () => iconBandage('i19b')]].map(([t, ic], k) =>
      `<div class="box card" id="c19${k}" style="left:${72 + k * 620}px;top:520px;width:540px;height:380px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:190px;height:200px;display:flex;align-items:center;justify-content:center">${ic()}</div><b style="margin-top:14px">${t}</b></div>`
      + (k < 2 ? `<div class="abs" id="pl19${k}" style="left:${612 + k * 620}px;top:650px;width:80px;text-align:center;font:800 100px/1 'Bricolage Grotesque';color:var(--or-b)">+</div>` : '')).join('')}`,
  init() { L.hInit('h19', 2); gsap.set('#n19', { opacity: 0 }); gsap.set('[id^=c19]', { opacity: 0, y: 50 }); gsap.set('[id^=pl19]', { opacity: 0, scale: .4 }); },
  animate(S) {
    S.to('#n19', { opacity: 1, duration: .5 }, S.at(0), '灰字小標淡入');
    L.hLine(S, '#h191', S.word('照顧狗狗')); L.hLine(S, '#h192', S.word('不是買'), '大標第二行（橘）');
    L.pop(S, '#c190', S.word('不是買', 0, .4), '「輔具」卡浮上');
    S.to('#pl190', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('搭配'));
    L.pop(S, '#c191', S.word('環境'), '「適合的環境」卡浮上', 1.12);
    S.to('#pl191', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('照護方式', 0, -.2));
    L.pop(S, '#c192', S.word('照護方式'), '「照護方式」卡浮上', 1.26);
    L.ding(S, S.wordEnd('照護方式'), '三塊拼齊');
  },
});
