// 幕 41｜最後提醒（系列固定版型）＋片尾：大標兩行；聲明標籤；完整來源在說明欄；最後一句；片尾 logo 停格
WT.scene('41', {
  enter: 'slide',
  visuals: ['小標「最後提醒」', '大標：「這支影片是一般選購參考，」（黑）／「不能取代獸醫或復健師的診斷與建議。」（橘）', '白卡：「本片」＋標籤「沒有特定品牌推薦」',
    '橘字：「AAHA、CARE 完整來源 → 影片說明欄」', '最後一行：「希望幫你做出」＋橘底白字「更適合牠的選擇」', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」'],
  mount: () => `
    <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e41" data-text="最後提醒"></div></div>
    <div class="h abs" style="left:72px;top:196px;font-size:84px"><span class="ln"><span id="h411">這支影片是一般選購參考，</span></span><span class="ln"><span id="h412" class="o">不能取代獸醫或復健師的診斷與建議。</span></span></div>
    <div class="vet card" id="vet41" style="top:470px;width:auto;padding:30px 44px"><span class="lb">本片</span><span class="sym" id="sy41">沒有特定品牌推薦</span></div>
    <div class="big" id="o41" style="left:72px;top:640px;font-size:52px">AAHA、CARE 完整來源 → <span class="o">影片說明欄</span></div>
    <div class="last" id="last41" style="top:790px">希望幫你做出<span class="two">更適合牠的選擇</span></div>
    <div class="abs" id="d41" style="left:1460px;top:430px;width:340px">${WT.dog('young-sit')}</div>
    <div class="endcard" id="end41"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() { L.hInit('h41', 2); gsap.set('#vet41', { opacity: 0, y: 50 }); gsap.set('#sy41', { opacity: 0, scale: .6 }); gsap.set('#o41', { opacity: 0, y: 30 }); gsap.set('#last41', { opacity: 0, y: 40 }); gsap.set('#d41', { opacity: 0, y: 30 }); gsap.set('#end41', { opacity: 0 }); gsap.set('#end41 i', { scale: .7 }); },
  animate(S) {
    S.type('#e41', S.at(0) - .3, .5, '小標逐字打出');
    L.hLine(S, '#h411', S.at(0), '大標第一行'); L.hLine(S, '#h412', S.at(1), '大標第二行（橘）');
    S.to('#vet41', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.word('另外'), '聲明卡浮上'); S.sfx(S.word('另外'), 'slide', '輕「咻」');
    S.to('#sy41', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word('品牌'), '「沒有特定品牌推薦」彈出'); S.sfx(S.word('品牌'), 'pop-card', '聲明：「啵」');
    S.to('#o41', { opacity: 1, y: 0, duration: .5 }, S.word('AAHA'), '「完整來源 → 影片說明欄」浮上'); S.sfx(S.word('說明欄'), 'tick-soft', '輕點');
    S.to('#d41', { opacity: 1, y: 0, duration: .6 }, S.word('希望'), '黑柴坐著淡入');
    S.to('#last41', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('希望'), '最後一行由下浮上'); S.sfx(S.word('更適合'), 'ding-soft', '輕「叮」');
    const e = S.narrEnd + 1.2;
    S.to('#logo', { opacity: 0, duration: .5 }, e);
    S.to('#end41', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end41 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
