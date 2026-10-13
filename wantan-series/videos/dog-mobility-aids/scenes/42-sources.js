// 幕 42｜資料來源（都有業界贊助背景，完整來源在說明欄）＋祝福一句＋片尾 logo 停格（系列固定）
WT.scene('42', {
  enter: 'slide',
  visuals: ['小標「資料來源」', '來源卡 01：「美國動物醫院協會 AAHA｜2023 高齡犬貓照護指引」＋灰標籤「業界贊助」', '來源卡 02：「CARE｜關節炎狗狗的輔具衛教頁」＋灰標籤「業界贊助」', '橘字：「完整來源 → 影片說明欄」', '最後一行：「希望幫你做出更適合牠的選擇」', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e42" data-text="資料來源"></div></div>
    <div class="src card" id="s420" style="top:220px"><div class="k">01</div><b>美國動物醫院協會 AAHA｜2023 高齡犬貓照護指引</b><span>業界贊助</span></div>
    <div class="src card" id="s421" style="top:480px"><div class="k">02</div><b>CARE｜關節炎狗狗的輔具衛教頁</b><span>業界贊助</span></div>
    <div class="big o" id="o42" style="left:72px;top:730px;font-size:54px">完整來源 → 影片說明欄</div>
    <div class="abs" id="d42" style="left:1380px;top:300px;width:400px">${WT.dog('young-sit')}</div>
    <div class="last" id="last42" style="top:840px">希望幫你做出<span class="two">更適合牠的選擇</span></div>
    <div class="endcard" id="end42"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() { gsap.set(['#s420', '#s421'], { opacity: 0, x: -40 }); gsap.set('#o42', { opacity: 0, y: 20 }); gsap.set('#d42', { opacity: 0, y: 30 }); gsap.set('#last42', { opacity: 0, y: 40 }); gsap.set('#end42', { opacity: 0 }); gsap.set('#end42 i', { scale: .7 }); },
  animate(S) {
    S.type('#e42', S.at(0) - .3, .5, '小標逐字打出');
    [['AAHA', 0], ['CARE', 1]].forEach(([w, k]) => { S.to('#s42' + k, { opacity: 1, x: 0, duration: .6, ease: 'power3.out' }, S.word(w), `來源卡 0${k + 1} 由左滑入`); S.sfx(S.word(w), 'slide', `來源卡 0${k + 1}：輕「咻」`); });
    S.to('#o42', { opacity: 1, y: 0, duration: .5 }, S.word('說明欄'), '「完整來源 → 影片說明欄」浮上'); S.sfx(S.word('說明欄'), 'tick-soft', '輕點');
    S.to('#d42', { opacity: 1, y: 0, duration: .6 }, S.word('希望'), '黑柴坐著淡入');
    S.to('#last42', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('希望'), '最後一行由下浮上'); S.sfx(S.word('更適合'), 'ding-soft', '輕「叮」');
    const e = S.narrEnd + 1.2;
    S.to('#logo', { opacity: 0, duration: .5 }, e);
    S.to('#end42', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end42 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
