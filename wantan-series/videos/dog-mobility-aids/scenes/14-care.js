// 幕 14｜CARE：輪椅比較常用在神經問題造成癱瘓、或嚴重無力的狗
WT.scene('14', {
  enter: 'slide',
  visuals: ['來源卡：「美國犬關節衛教組織 CARE」', '大字：「輪椅比較常用在」', '兩個橘色標籤：「神經問題而癱瘓」「嚴重無力」', '右邊：黑柴趴著'],
  mount: () => `
    <div class="src card" id="sc14" style="top:150px;width:900px"><div class="k">資料來源</div><b>美國犬關節衛教組織 CARE</b></div>
    <div class="big" id="b14" style="left:72px;top:440px;font-size:76px">輪椅比較常用在</div>
    <div class="abs" style="left:72px;top:580px;display:flex;gap:22px"><span class="tag" id="t140" style="font-size:46px;padding:20px 36px">神經問題而癱瘓</span><span class="tag" id="t141" style="font-size:46px;padding:20px 36px">嚴重無力</span></div>
    <div class="abs" id="d14" style="left:1260px;top:560px;width:560px">${WT.dog('lying')}</div>`,
  init() { gsap.set('#sc14', { opacity: 0, y: -30 }); gsap.set('#b14', { opacity: 0, y: 30 }); gsap.set('[id^=t14]', { opacity: 0, scale: .6 }); gsap.set('#d14', { opacity: 0 }); },
  animate(S) {
    S.to('#sc14', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.at(0), '來源卡浮上'); S.sfx(S.at(0), 'slide', '來源卡：輕「咻」');
    S.to('#b14', { opacity: 1, y: 0, duration: .6 }, S.word('輪椅'), '「輪椅比較常用在」浮上');
    S.to('#d14', { opacity: 1, duration: .6 }, S.word('輪椅'), '黑柴趴著淡入');
    [['神經問題', 0], ['嚴重無力', 1]].forEach(([w, k]) => { S.to('#t14' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤 0${k + 1} 彈出`); S.sfx(S.word(w), 'pop', `標籤 0${k + 1}：「啵」`, { pitch: 1 + k * .12 }); });
  },
});
