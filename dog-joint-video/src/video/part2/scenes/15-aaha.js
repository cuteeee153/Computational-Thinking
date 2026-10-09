// 幕 15｜0:45 轉入深色段：AAHA 指引
// 深色畫面由下往上蓋過前段的最後一格，小標「03 ／ 為什麼問錯」打出，右上角出現來源標籤，
// 大標第一行冒出，下方的示意圖卡片浮上來，畫出「狗的一生」時間軸與四隻不同年紀的狗。
Intro.scene({
  id: '15', title: '轉入深色段：AAHA 指引', start: 45.0, end: 49.4,
  narration: [[45.8, 49.18, '美國動物醫院協會的指引指出，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 49.2,
  visuals: ["深色背景，淡淡的方格線", "左上角頻道名稱變成白字", "小標「03 ／ 為什麼問錯」", "右上角來源標籤「SOURCE ／ AAHA《Mobility Matters》」", "大標第一行：「關節的基礎，」（白）", "下方示意圖卡片，左上角標籤「示意圖 ・ 狗的一生」", "時間軸上四隻狗：幼犬、青壯年、中年、老年"],
  motions: ["45.0 秒｜深色畫面由下往上蓋過前一格，約 0.85 秒", "45.4 秒｜頻道名稱變白", "45.7 秒｜小標逐字打出", "46.0 秒｜來源標籤淡入", "46.3 秒｜大標第一行冒出", "46.7 秒｜示意圖卡片浮上來", "47.1 秒｜時間軸由左往右畫出", "47.4 秒｜四隻狗依序彈出，下方年齡標字淡入"],
  mount: [
    { into: '#chrome', html: `
      <div class="logo" id="logo"><i id="paw"></i>狗關節保養</div>
      <div class="tagline">不是幾歲．是風險等級</div>` },
    { into: '#S3-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e3" data-text="03 ／ 為什麼問錯"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:92px" id="h3a"><span class="ln"><span id="h3a1">關節的基礎，</span></span></div>
      <div class="src" id="src1">SOURCE ／ AAHA《Mobility Matters》</div>` },
    { into: '#LA', html: `
      <div class="k plabel">示意圖 ・ 狗的一生</div>
      <div class="abs" style="left:140px;top:328px;width:1500px;height:5px;border-radius:3px;background:#E7DCCD" id="axisA"></div>
      <div class="abs" style="left:175px;top:236px;width:90px" id="dP"></div>
      <div class="abs" style="left:590px;top:180px;width:140px" id="dY"></div>
      <div class="abs" style="left:1028px;top:172px;width:148px" id="dM"></div>
      <div class="abs" style="left:1466px;top:172px;width:148px" id="dS"></div>
      <div class="stop" style="left:220px" id="st1">幼犬</div><div class="stop" style="left:660px" id="st2">青壯年</div><div class="stop" style="left:1100px" id="st3">中年</div><div class="stop" style="left:1540px" id="st4">老年</div>` },
  ],
  assets() {
    paw.innerHTML = '<div style="width:24px;height:24px">' + iconPaw('#fff') + '</div>';
    Intro.dog('#dP', { id: 'p', mood: 'happy' });
    Intro.dog('#dY', { id: 'y', mood: 'happy', tilt: 4 });
    Intro.dog('#dM', { id: 'm', mood: 'curious', tilt: -4 });
    Intro.dog('#dS', { id: 's', mood: 'curious', tilt: -10 });
  },
  init() {
    gsap.set('#S3', { yPercent: 100 });
    gsap.set('#h3a1', { yPercent: 110 });
    gsap.set('#src1', { opacity: 0, y: -10 });
    gsap.set('#panel', { opacity: 0, y: 60 });
    gsap.set(['#dP', '#dY', '#dM', '#dS'], { opacity: 0, y: 20 });
    gsap.set(['#st1', '#st2', '#st3', '#st4'], { opacity: 0 });
    gsap.set('#axisA', { scaleX: 0, transformOrigin: '0 50%' });
  },
  animate({ L, E, type }) {
    L('#S3', { yPercent: 0, duration: .85, ease: 'power3.inOut' }, 45.0);
    L('#logo', { color: '#FFF6EC', duration: .3 }, 45.4);
    type('#e3', 45.7, .7);
    L('#src1', { opacity: 1, y: 0, duration: .5, ease: E }, 46.0);
    L('#h3a1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 46.3);
    L('#panel', { opacity: 1, y: 0, duration: .9, ease: E }, 46.7);
    L('#axisA', { scaleX: 1, duration: 1.2, ease: 'power2.inOut' }, 47.1);
    ['#dP', '#dY', '#dM', '#dS'].forEach((d, i) => L(d, { opacity: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 47.4 + i * .25));
    ['#st1', '#st2', '#st3', '#st4'].forEach((d, i) => L(d, { opacity: 1, duration: .4 }, 47.5 + i * .25));
  },
});
