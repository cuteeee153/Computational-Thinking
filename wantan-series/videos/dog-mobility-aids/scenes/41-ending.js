// 幕 41｜最後提醒（系列固定版型）：小標「最後提醒」、大標兩行；下方兩個聲明標籤
WT.scene('41', {
  enter: 'slide',
  visuals: ['小標「最後提醒」', '大標：「這支影片是一般選購參考，」（黑）／「不能取代獸醫或復健師的診斷與建議。」（橘）', '白卡兩項聲明：「沒有特定品牌推薦」「沒有聯盟行銷連結」'],
  mount: () => `
    <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e41" data-text="最後提醒"></div></div>
    <div class="h abs" style="left:72px;top:196px;font-size:84px"><span class="ln"><span id="h411">這支影片是一般選購參考，</span></span><span class="ln"><span id="h412" class="o">不能取代獸醫或復健師的診斷與建議。</span></span></div>
    <div class="vet card" id="vet41" style="top:560px"><span class="lb">本片</span><span class="sym" id="sy410">沒有特定品牌推薦</span><span class="sym" id="sy411">沒有聯盟行銷連結</span></div>`,
  init() { L.hInit('h41', 2); gsap.set('#vet41', { opacity: 0, y: 50 }); gsap.set('[id^=sy41]', { opacity: 0, scale: .6 }); },
  animate(S) {
    S.type('#e41', S.at(0) - .3, .5, '小標逐字打出');
    L.hLine(S, '#h411', S.at(0), '大標第一行'); L.hLine(S, '#h412', S.at(1), '大標第二行（橘）');
    S.to('#vet41', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.word('另外'), '聲明卡浮上'); S.sfx(S.word('另外'), 'slide', '輕「咻」');
    [['品牌', 0], ['聯盟', 1]].forEach(([w, k]) => { S.to('#sy41' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `聲明 0${k + 1} 彈出`); S.sfx(S.word(w), 'pop-card', `聲明 0${k + 1}：「啵」`, { pitch: 1 + k * .12 }); });
  },
});
