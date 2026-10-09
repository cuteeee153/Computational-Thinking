// 幕 15｜0:45 轉入深色段：AAHA 指引
// 深色畫面由下往上蓋過前段的最後一格，小標「03 ／ 為什麼問錯」打出，右上角出現來源標籤，
// 大標第一行冒出，下方的示意圖卡片浮上來，畫出「狗的一生」時間軸與四隻不同年紀的狗。
Intro.scene({
  id: '15', title: '轉入深色段：AAHA 指引', start: 45.0, end: 49.4,
  narration: [[45.8, 49.18, '美國動物醫院協會的指引指出，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 49.2,
  visuals: ["深色背景，淡淡的方格線", "左上角頻道名稱「汪探｜WanTan」變成白字（logo 在米色圓底上）", "小標「03 ／ 為什麼問題問錯了？」", "右上角來源標籤「SOURCE ／ AAHA《Mobility Matters》」", "大標第一行：「美國動物醫院協會（AAHA）關節照護指引」（白）", "下方示意圖卡片", "時間軸上四隻黑柴：幼犬（坐）、青壯年（側站）、中年（正面站）、老年（坐）"],
  motions: ["45.0 秒｜深色畫面由下往上蓋過前一格，約 0.85 秒", "45.4 秒｜頻道名稱變白", "45.7 秒｜小標逐字打出", "46.0 秒｜來源標籤淡入", "46.3 秒｜大標第一行冒出", "46.7 秒｜示意圖卡片浮上來", "47.1 秒｜時間軸由左往右畫出", "47.4 秒｜四隻狗依序彈出，下方年齡標字淡入"],
  sfx: [
    [45.0, "whoosh-big", "深色畫面蓋上來：大「咻」"],
    [46.7, "slide", "示意圖卡片浮上來：輕「咻」"],
    [47.1, "draw", "時間軸畫出：鉛筆沙沙聲", { dur: 1.1, gain: 0.8 }],
    [47.4, "pop", "幼犬彈出：「啵」", { pitch: 1.4 }],
    [47.65, "pop", "青壯年彈出：「啵」", { pitch: 1.2 }],
    [47.9, "pop", "中年彈出：「啵」", { pitch: 1.05 }],
    [48.15, "pop", "老年彈出：「啵」", { pitch: 0.92 }],
  ],
  mount: [
    { into: '#chrome', html: `
      <div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>
      <div class="tagline">不是幾歲．是風險等級</div>` },
    { into: '#S3-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e3" data-text="03 ／ 為什麼問題問錯了？"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:80px" id="h3a"><span class="ln"><span id="h3a1">美國動物醫院協會（AAHA）關節照護指引</span></span></div>
      <div class="src" id="src1">SOURCE ／ AAHA《Mobility Matters》</div>` },
    { into: '#LA', html: `
      <div class="abs" style="left:140px;top:328px;width:1500px;height:5px;border-radius:3px;background:#E7DCCD" id="axisA"></div>
      <div class="abs" style="left:172px;top:238px;width:96px" id="dP"></div>
      <div class="abs" style="left:585px;top:149px;width:150px" id="dY"></div>
      <div class="abs" style="left:1040px;top:117px;width:120px" id="dM"></div>
      <div class="abs" style="left:1465px;top:119px;width:150px" id="dS"></div>
      <div class="stop" style="left:220px" id="st1">幼犬</div><div class="stop" style="left:660px" id="st2">青壯年</div><div class="stop" style="left:1100px" id="st3">中年</div><div class="stop" style="left:1540px" id="st4">老年</div>` },
  ],
  assets() {
    Intro.dog('#dP', { pose: 'puppy-sit' });
    Intro.dog('#dY', { pose: 'stand-side' });
    Intro.dog('#dM', { pose: 'stand-front' });
    Intro.dog('#dS', { pose: 'senior-sit' });
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
