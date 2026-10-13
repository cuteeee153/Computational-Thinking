// 幕 30｜「這些訊號，哪怕只出現幾秒鐘、狗狗看起來馬上就恢復正常，也不代表沒事」
// 大標往上退出、放大鏡和腳印淡出，五張徵兆卡縮小排到上方（「這些都是訊號」）；
// 中間依序出現碼錶「只出現幾秒鐘」→ 狗「看起來馬上恢復正常」，最後蓋上「不代表沒事」印章。
Intro.scene({
  id: '30', title: '幾秒鐘也不代表沒事', start: 176.4, end: 182.4,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 182.0,
  visuals: ["五張徵兆卡縮小成一排，排在畫面上方（只留放大的編號和圖示）", "卡片上方小字：「這些都是訊號」", "左邊碼錶，下方「只出現幾秒鐘」", "中間站著的狗，下方「看起來馬上恢復正常」", "碼錶和狗之間的灰色箭頭", "右邊歪斜的橘框印章：「不代表沒事」"],
  motions: ["176.5 秒｜大標往上退出，放大鏡、腳印、卡片文字淡出", "176.6 秒｜五張卡縮小移到上方排成一排，編號和圖示同時放大", "177.2 秒｜「這些都是訊號」淡入", "177.4 秒｜碼錶彈出", "177.6 秒｜「只出現幾秒鐘」淡入", "178.7 秒｜箭頭畫出", "178.9 秒｜狗彈出", "179.2 秒｜「看起來馬上恢復正常」淡入", "180.5 秒｜「不代表沒事」印章蓋下"],
  sfx: [
    [176.6, "whoosh", "五張卡收成一排：「咻」"],
    [177.4, "tick", "碼錶彈出：「叮咚」"],
    [178.7, "slide", "箭頭畫出：輕「咻」", { gain: 0.7 }],
    [178.9, "boing", "狗彈出：小彈簧聲"],
    [180.5, "thud", "「不代表沒事」印章：「咚」"],
  ],
  mount: [
    { into: '#S5-text', html: `<div class="abs k" style="left:0;right:0;top:132px;text-align:center;font-size:22px" id="sgLbl">這些都是訊號</div>` },
    { into: '#S5-mid', html: `
      <div id="mid30">
        <div class="abs" style="left:250px;top:470px;width:270px;height:270px" id="watch"></div>
        <div class="lbl" style="left:385px;top:800px" id="watchLbl">只出現幾秒鐘</div>
        <svg class="abs" style="left:0;top:0" width="1920" height="1080"><path id="arr30" d="M580 610 L760 610 M736 590 L760 610 L736 630" stroke="#CDBFAE" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="abs" style="left:820px;top:470px;width:250px" id="d30"></div>
        <div class="lbl" style="left:945px;top:800px" id="d30Lbl">看起來馬上恢復正常</div>
        <div class="stamp" style="left:1250px;top:560px;transform:rotate(-7deg)" id="stamp30">不代表沒事</div>
      </div>` },
  ],
  assets() {
    watch.innerHTML = iconStopwatch('sw30');
    Intro.dog('#d30', { pose: 'stand-side' });
  },
  init() {
    gsap.set('#sgLbl', { opacity: 0 });
    gsap.set('#watch', { opacity: 0, scale: .6 });
    gsap.set(['#watchLbl', '#d30Lbl'], { opacity: 0, y: 10 });
    gsap.set('#arr30', { strokeDasharray: 300, strokeDashoffset: 300 });
    gsap.set('#d30', { opacity: 0, y: 30 });
    gsap.set('#stamp30', { opacity: 0, scale: 1.6 });
  },
  animate({ L, E }) {
    L(['#h51', '#h52'], { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .08 }, 176.5);
    L(['#mag', '#paws'], { opacity: 0, duration: .4 }, 176.5);
    L(['[id^=sgt]', '#sgb'], { opacity: 0, duration: .3 }, 176.5);
    for (let i = 0; i < 5; i++)
      L('#sg' + i, { x: (553 + i * 165) - (72 + i * 360), y: 180 - 520, scale: .46, duration: .9, ease: 'power3.inOut' }, 176.6 + i * .04);
    L('#sg .num', { fontSize: 52, duration: .9, ease: 'power3.inOut' }, 176.6);
    L('#sg .ic', { width: 250, height: 250, duration: .9, ease: 'power3.inOut' }, 176.6);
    L('#sgLbl', { opacity: 1, duration: .5 }, 177.2);
    L('#watch', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 177.4);
    L('#watchLbl', { opacity: 1, y: 0, duration: .4, ease: E }, 177.6);
    L('#arr30', { strokeDashoffset: 0, duration: .4, ease: 'power2.inOut' }, 178.7);
    L('#d30', { opacity: 1, y: 0, duration: .6, ease: 'back.out(2)' }, 178.9);
    L('#d30Lbl', { opacity: 1, y: 0, duration: .4, ease: E }, 179.2);
    L('#stamp30', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.2)' }, 180.5);
  },
});
