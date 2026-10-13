// 幕 18｜「另一份國際共識 COAST，把狗分成四個階段」
// 大標與時間軸退場，來源標籤換成 COAST，新大標兩行冒出，示意圖換成由低到高的四個階梯方塊（先是灰色）。
Intro.scene({
  id: '18', title: 'COAST 國際共識', start: 61.6, end: 67.8,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 67.5,
  visuals: ["右上角來源標籤「SOURCE ／ COAST 國際共識（Cachon 等，2023）」", "大標第一行：「由國際獸醫專家團隊提出」（白）", "大標第二行：「COAST 犬骨關節炎分期工具：」（橘）", "示意圖卡片標籤「COAST 分期概念」", "四個由低到高的灰色階梯方塊：01 沒有風險因子／02 有風險因子・沒症狀／03 輕度臨床徵象／04 中重度臨床徵象"],
  motions: ["61.6 秒｜上一個大標往上退出", "61.8 秒｜舊來源標籤與時間軸淡出", "62.3 秒｜新來源標籤淡入；示意圖換成階梯；大標第一行冒出", "65.6 秒｜大標第二行冒出", "65.8 秒｜「COAST 分期概念」標籤和四個方塊一起出來（方塊由左到右依序浮上來）"],
  sfx: [
    [61.62, "whoosh", "大標退場：「咻」", { gain: 0.7 }],
    [65.82, "note", "方塊 01 浮上：木琴 Do"],
    [65.97, "note", "方塊 02：Mi", { pitch: 1.26 }],
    [66.12, "note", "方塊 03：Sol", { pitch: 1.5 }],
    [66.27, "note", "方塊 04：高音 Do", { pitch: 2 }],
  ],
  mount: [
    { into: '#S3-text', html: `
      <div class="h abs" style="left:72px;top:196px;font-size:92px" id="h3b"><span class="ln"><span id="h3b1">由國際獸醫專家團隊提出</span></span><span class="ln"><span id="h3b2" class="o">COAST 犬骨關節炎分期工具：</span></span></div>
      <div class="src" id="src2">SOURCE ／ COAST 國際共識（Cachon 等，2023）</div>` },
    { into: '#LB', html: `
      <div class="k plabel" id="pl18">COAST 分期概念</div>
      <div class="blk" id="b1" style="left:140px;height:140px"><div class="n">01</div><div class="t">沒有風險因子</div></div>
      <div class="blk" id="b2" style="left:520px;height:200px"><div class="n">02</div><div class="t">有風險因子・沒症狀</div></div>
      <div class="blk" id="b3" style="left:900px;height:260px"><div class="n">03</div><div class="t">輕度臨床徵象</div></div>
      <div class="blk" id="b4" style="left:1280px;height:320px"><div class="n">04</div><div class="t">中重度臨床徵象</div></div>` },
  ],
  init() {
    gsap.set('#LB', { opacity: 0 });
    gsap.set(['#h3b1', '#h3b2'], { yPercent: 110 });
    gsap.set('#src2', { opacity: 0, y: -10 });
    gsap.set(['#pl18', '#b1', '#b2', '#b3', '#b4'], { opacity: 0, y: 30 });
  },
  animate({ L, E }) {
    L(['#h3a1', '#h3a2'], { yPercent: -110, duration: .9, ease: 'power3.in', stagger: .08 }, 61.62);
    L('#src1', { opacity: 0, duration: .6 }, 61.82);
    L('#src2', { opacity: 1, y: 0, duration: .8, ease: E }, 62.32);
    L('#LA', { opacity: 0, duration: .8 }, 61.82);
    L('#LB', { opacity: 1, duration: .6 }, 62.32);
    L('#h3b1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 62.32);
    L('#h3b2', { yPercent: 0, duration: .8, ease: 'power4.out' }, 65.62);
    L('#pl18', { opacity: 1, y: 0, duration: .5, ease: E }, 65.82);
    ['#b1', '#b2', '#b3', '#b4'].forEach((b, i) => L(b, { opacity: 1, y: 0, duration: .5, ease: E }, 65.82 + i * .15));
  },
});
