// 幕 25｜收成一排 → 「一個都沒有，是基礎預防組」
// 大標與「5 類」退場，五張卡縮小排到上方成一排（問「你家狗符合幾項？」），狗出現在左邊；
// 往左下畫出灰色分岔線「一項都沒有」，出現「基礎預防組」卡片與兩行重點。
Intro.scene({
  id: '25', title: '基礎預防組（0 項）', start: 128.7, end: 142.4,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 141.0,
  visuals: ["五張風險因子卡縮小成一排，排在畫面上方（只留放大的編號和圖示）", "卡片上方小字：「數一數你家狗狗符合幾項？」", "左上方一隻狗", "往左下的灰色分岔線，標籤「一項都沒有」", "左下卡片：「基礎預防組」，右下角飯碗圖示", "重點一：「✓ 不需要額外保健品」", "重點二：「✓ 把資源放在飲食與運動管理」"],
  motions: ["128.7 秒｜大標往上退出，「5 類」淡出，卡片文字淡出", "128.9 秒｜五張卡縮小移到上方排成一排，編號和圖示同時放大", "129.6 秒｜「數一數你家狗狗符合幾項？」淡入", "129.7 秒｜狗從下方彈出", "130.1 秒｜灰色分岔線往左下畫出", "130.4 秒｜「一項都沒有」彈出", "130.7 秒｜「基礎預防組」卡片浮上來", "133.7 秒｜重點一由左滑入", "136.5 秒｜重點二由左滑入"],
  sfx: [
    [128.94, "whoosh", "五張卡收成一排：「咻」"],
    [129.74, "boing", "狗彈出：小彈簧聲"],
    [130.14, "draw", "灰色分岔線畫出：鉛筆沙沙聲", { dur: 0.8, gain: 0.7 }],
    [130.44, "pop", "「一項都沒有」：「啵」"],
    [130.74, "slide", "基礎預防組卡片浮上：輕「咻」"],
    [133.71, "tick-soft", "重點一：輕點"],
    [136.46, "tick-soft", "重點二：輕點", { pitch: 1.12 }],
  ],
  mount: [
    { into: '#S4-text', html: `<div class="abs k" style="left:0;right:0;top:132px;text-align:center;font-size:22px" id="stripLbl">數一數你家狗狗符合幾項？</div>` },
    { into: '#S4-flow', html: `
      <svg class="abs" style="left:0;top:0" width="1920" height="1080" id="branches">
        <path id="brL" d="M960 392 L960 420 Q960 440 940 440 L530 440 Q510 440 510 460 L510 530" stroke="#CDBFAE" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brl" style="left:735px;top:440px" id="brlL">一項都沒有</div>
      <div class="grp card" id="gA" style="left:100px">
        <div class="ttl">基礎預防組</div>
        <div class="bl" id="a1"><i style="background:#F1E8DC;color:#9A8C7C">✓</i>不需要額外保健品</div>
        <div class="bl" id="a2"><i style="background:#F1E8DC;color:#9A8C7C">✓</i>把資源放在飲食與運動管理</div>
        <div class="abs" style="right:40px;bottom:36px;width:140px" id="gAic"></div>
      </div>
      <div class="abs" style="left:400px;top:197px;width:120px" id="d4"></div>` },
  ],
  assets() {
    Intro.dog('#d4', { pose: 'sit-tilt' });
    gAic.innerHTML = iconBowl('ga');
  },
  init() {
    gsap.set('#stripLbl', { opacity: 0 });
    gsap.set('#brL', { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set('#brlL', { opacity: 0, scale: .7 });
    gsap.set('#gA', { opacity: 0, y: 40 });
    gsap.set(['#a1', '#a2'], { opacity: 0, x: -20 });
    gsap.set('#d4', { opacity: 0, y: 30 });
  },
  animate({ L, E }) {
    L(['#h41', '#h42'], { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .08 }, 128.74);
    L('#five', { opacity: 0, x: 40, duration: .5 }, 128.74);
    L('[id^=rft]', { opacity: 0, duration: .3 }, 128.74);
    for (let i = 0; i < 5; i++)
      L('#rf' + i, { x: (553 + i * 165) - (72 + i * 360), y: 180 - 520, scale: .46, duration: .9, ease: 'power3.inOut' }, 128.94 + i * .04);
    // 縮小後編號和圖示要看得清楚：卡片內同步放大
    L('.rf .num', { fontSize: 52, duration: .9, ease: 'power3.inOut' }, 128.94);
    L('.rf .ic', { width: 250, height: 250, duration: .9, ease: 'power3.inOut' }, 128.94);
    L('#stripLbl', { opacity: 1, duration: .5 }, 129.64);
    L('#d4', { opacity: 1, y: 0, duration: .6, ease: 'back.out(2)' }, 129.74);
    L('#brL', { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, 130.14);
    L('#brlL', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 130.44);
    L('#gA', { opacity: 1, y: 0, duration: .6, ease: E }, 130.74);
    L('#a1', { opacity: 1, x: 0, duration: .5, ease: E }, 133.71);
    L('#a2', { opacity: 1, x: 0, duration: .5, ease: E }, 136.46);
  },
});
