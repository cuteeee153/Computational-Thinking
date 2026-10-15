// 幕 18｜深色幕（原 18＋19 合併）：最上方固定來源卡「美國動物醫院協會 AAHA｜高齡犬貓照護指引」。
// 前半：合身有襯墊的胸背帶 → 幫飼主扶起大型犬；止滑墊、坡道、復健。後半（念到「這份指引」）換成：不是買一件輔具就結束 → 輔具＋環境＋照護方式。
WT.scene('18', {
  enter: 'slide', dark: true,
  visuals: ['深色背景；最上方來源卡：「美國動物醫院協會 AAHA」＋「高齡犬貓照護指引」（整幕都在）', '卡片：輔助帶插畫＋「合身、有襯墊的胸背帶」→ 橘字「幫飼主扶起大型犬」', '「也可以一起考慮」＋三個標籤：止滑墊、坡道、復健',
    '念到「這份指引」：上面內容淡出，換成灰字「這份指引並沒有直接討論輪椅」', '大標：「照顧狗狗的行動力，」／「不是買一件輔具就結束」（橘）', '三張卡：「輔具」＋「適合的環境」＋「照護方式」，中間有加號'],
  mount: () => `
    <div class="src card" id="sc18" style="top:140px;width:1180px"><div class="k">資料來源</div><b>美國動物醫院協會 AAHA</b><span style="background:rgba(255,248,239,.1);color:#CDBFAE">高齡犬貓照護指引</span></div>
    <div id="g18a">
      <div class="box card" id="c18" style="left:72px;top:420px;width:1180px;height:280px;display:flex;align-items:center;gap:40px"><div style="width:190px;flex:none">${L.dev('harness')}</div><div><b>合身、有襯墊的胸背帶</b><b id="o18" style="color:var(--or-b)">→ 幫飼主扶起大型犬</b></div></div>
      <div class="abs" id="r18" style="left:72px;top:760px;display:flex;gap:20px;align-items:center"><span style="font-size:34px;font-weight:900;color:#B9AC9E;margin-right:10px">也可以一起考慮</span>
        ${['止滑墊', '坡道', '復健'].map((t, k) => `<span class="tag" id="t18${k}">${t}</span>`).join('')}</div>
    </div>
    <div id="g18b">
      <div class="note" id="n19" style="left:72px;top:395px">ⓘ 這份指引並沒有直接討論輪椅</div>
      ${L.h('h19', [['照顧狗狗的行動力，'], ['不是買一件輔具就結束', 'o']], { top: 448, size: 70 })}
      ${[['輔具', () => `<div style="width:130px">${L.dev('harness')}</div>`], ['適合的環境', () => iconStairs('i19a')], ['照護方式', () => iconBandage('i19b')]].map(([t, ic], k) =>
        `<div class="box card" id="c19${k}" style="left:${72 + k * 620}px;top:650px;width:540px;height:290px;text-align:center;display:flex;flex-direction:column;align-items:center;justify-content:center"><div style="width:150px;height:160px;display:flex;align-items:center;justify-content:center">${ic()}</div><b style="margin-top:10px">${t}</b></div>`
        + (k < 2 ? `<div class="abs" id="pl19${k}" style="left:${612 + k * 620}px;top:745px;width:80px;text-align:center;font:800 100px/1 'Bricolage Grotesque';color:var(--or-b)">+</div>` : '')).join('')}
    </div>`,
  init() {
    gsap.set('#sc18', { opacity: 0, y: -30 }); gsap.set('#c18', { opacity: 0, y: 50 }); gsap.set('#o18', { opacity: 0, x: -20 }); gsap.set('#r18 > span:first-child', { opacity: 0 }); gsap.set('[id^=t18]', { opacity: 0, scale: .6 });
    L.hInit('h19', 2); gsap.set('#n19', { opacity: 0 }); gsap.set('[id^=c19]', { opacity: 0, y: 50 }); gsap.set('[id^=pl19]', { opacity: 0, scale: .4 });
  },
  animate(S) {
    S.to('#sc18', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('美國動物醫院協會'), '來源卡浮上（整幕都在）'); S.sfx(S.word('美國動物醫院協會'), 'slide', '來源卡：輕「咻」');
    L.pop(S, '#c18', S.word('合身'), '胸背帶卡浮上');
    S.to('#o18', { opacity: 1, x: 0, duration: .5 }, S.word('扶起'), '「幫飼主扶起大型犬」滑入'); S.sfx(S.word('扶起'), 'slide', '輕「咻」');
    S.to('#r18 > span:first-child', { opacity: 1, duration: .4 }, S.word('止滑墊'));
    [['止滑墊', 0], ['坡道', 1], ['復健', 2]].forEach(([w, k]) => { S.to('#t18' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤「${w}」彈出`); S.sfx(S.word(w), 'pop', `${w}：「啵」`, { pitch: 1 + k * .12 }); });
    const t = S.word('這份指引', 0, -.2);
    S.to('#g18a', { opacity: 0, y: -20, duration: .4 }, t, '前半內容淡出');
    S.to('#n19', { opacity: 1, duration: .5 }, t + .3, '灰字淡入');
    L.hLine(S, '#h191', S.word('照顧狗狗')); L.hLine(S, '#h192', S.word('不是買'), '大標第二行（橘）');
    L.pop(S, '#c190', S.word('不是買', 0, .4), '「輔具」卡浮上');
    S.to('#pl190', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('搭配'));
    L.pop(S, '#c191', S.word('環境', 0), '「適合的環境」卡浮上', 1.12);
    S.to('#pl191', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('照護方式', 0, -.2));
    L.pop(S, '#c192', S.word('照護方式'), '「照護方式」卡浮上', 1.26);
    L.ding(S, S.wordEnd('照護方式'), '三塊拼齊');
  },
});
