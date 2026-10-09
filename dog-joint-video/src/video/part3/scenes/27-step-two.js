// 幕 27｜2:40 第二步：「我的狗狗，現在有沒有任何蛛絲馬跡？」
// 新的米色畫面由右往左蓋過第一步，小標「05 ／ 判斷第二步」打出，大標兩行冒出；右上角放大鏡彈出，下面一串腳印。
Intro.scene({
  id: '27', title: '第二步：有蛛絲馬跡嗎？', start: 160, end: 166.3,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 165.8,
  visuals: ["米色畫面（由右邊蓋進來）", "小標「05 ／ 判斷第二步」", "大標第一行：「我的狗狗，」（黑）", "大標第二行：「有沒有蛛絲馬跡？」（橘）", "右上角的放大鏡", "放大鏡下面一串腳印"],
  motions: ["160.0 秒｜米色畫面由右往左蓋過第一步，約 0.85 秒", "160.7 秒｜小標逐字打出", "162.9 秒｜大標第一行冒出", "163.7 秒｜大標第二行冒出", "164.3 秒｜放大鏡彈出", "164.5 秒｜腳印一個個出現", "165.0 秒起｜放大鏡左右輕輕晃"],
  sfx: [],
  mount: [
    { into: '#chrome', html: `
      <div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>
      <div class="tagline">不是幾歲．是風險等級</div>` },
    { into: '#S5-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e5" data-text="05 ／ 判斷第二步"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:104px" id="h5"><span class="ln"><span id="h51">我的狗狗，</span></span><span class="ln"><span id="h52" class="o">有沒有蛛絲馬跡？</span></span></div>
      <div class="abs" style="left:1340px;top:120px;width:300px;height:300px" id="mag"></div>
      <div id="paws">${[[1230, 400, 70], [1380, 440, 70], [1530, 392, 70], [1680, 436, 70]].map(([x, y, r], i) =>
        `<div class="abs" style="left:${x}px;top:${y}px;width:54px;height:54px;transform:rotate(${r}deg)" id="pw${i}"></div>`).join('')}</div>` },
  ],
  assets() {
    mag.innerHTML = iconMagnifier('mg5');
    for (let i = 0; i < 4; i++) document.querySelector('#pw' + i).innerHTML = iconPaw(i === 2 ? '#F97316' : '#D9CCBB');
  },
  init() {
    gsap.set('#S5', { xPercent: 100 });
    gsap.set(['#h51', '#h52'], { yPercent: 110 });
    gsap.set('#mag', { opacity: 0, scale: .6, rotation: -20 });
    gsap.set('[id^=pw]', { opacity: 0, scale: .4 });
  },
  animate({ tl, L, type }) {
    L('#S5', { xPercent: 0, duration: .85, ease: 'power3.inOut' }, 160.0);
    type('#e5', 160.7, .6);
    L('#h51', { yPercent: 0, duration: .8, ease: 'power4.out' }, 162.9);
    L('#h52', { yPercent: 0, duration: .8, ease: 'power4.out' }, 163.7);
    L('#mag', { opacity: 1, scale: 1, rotation: 0, duration: .6, ease: 'back.out(2)' }, 164.3);
    for (let i = 0; i < 4; i++) L('#pw' + i, { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2.5)' }, 164.5 + i * .15);
    tl.to('#mag', { rotation: 8, x: -14, duration: .9, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 165.0);
  },
});
