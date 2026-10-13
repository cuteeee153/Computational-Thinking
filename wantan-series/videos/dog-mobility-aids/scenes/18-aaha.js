// 幕 18｜美國動物醫院協會（AAHA）高齡犬貓照護指引：合身有襯墊的胸背帶；止滑墊、坡道、復健
WT.scene('18', {
  enter: 'slide',
  visuals: ['來源卡：「美國動物醫院協會 AAHA」＋灰字「高齡犬貓照護指引」', '白卡：輔助帶插畫＋「合身、有襯墊的胸背帶」→ 橘字「幫飼主扶起大型犬」', '下方「也可以一起考慮」＋三個標籤：止滑墊、坡道、復健'],
  mount: () => `
    <div class="src card" id="sc18" style="top:150px;width:1180px"><div class="k">資料來源</div><b>美國動物醫院協會 AAHA</b><span>高齡犬貓照護指引</span></div>
    <div class="box card" id="c18" style="left:72px;top:440px;width:1180px;height:300px;display:flex;align-items:center;gap:40px"><div style="width:200px;flex:none">${L.dev('harness')}</div><div><b>合身、有襯墊的胸背帶</b><b class="o" id="o18" style="color:var(--or)">→ 幫飼主扶起大型犬</b></div></div>
    <div class="abs" id="r18" style="left:72px;top:790px;display:flex;gap:20px;align-items:center"><span style="font-size:34px;font-weight:900;color:var(--mute);margin-right:10px">也可以一起考慮</span>
      ${['止滑墊', '坡道', '復健'].map((t, k) => `<span class="tag" id="t18${k}">${t}</span>`).join('')}</div>`,
  init() { gsap.set('#sc18', { opacity: 0, y: -30 }); gsap.set('#c18', { opacity: 0, y: 50 }); gsap.set('#o18', { opacity: 0, x: -20 }); gsap.set('#r18 > span:first-child', { opacity: 0 }); gsap.set('[id^=t18]', { opacity: 0, scale: .6 }); },
  animate(S) {
    S.to('#sc18', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('美國動物醫院協會'), '來源卡浮上'); S.sfx(S.word('美國動物醫院協會'), 'slide', '來源卡：輕「咻」');
    L.pop(S, '#c18', S.word('合身'), '胸背帶卡浮上');
    S.to('#o18', { opacity: 1, x: 0, duration: .5 }, S.word('扶起'), '「幫飼主扶起大型犬」滑入'); S.sfx(S.word('扶起'), 'slide', '輕「咻」');
    S.to('#r18 > span:first-child', { opacity: 1, duration: .4 }, S.word('止滑墊'));
    [['止滑墊', 0], ['坡道', 1], ['復健', 2]].forEach(([w, k]) => { S.to('#t18' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤「${w}」彈出`); S.sfx(S.word(w), 'pop', `${w}：「啵」`, { pitch: 1 + k * .12 }); });
  },
});
