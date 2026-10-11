// 幕 00｜開場痛點：「想照顧好狗狗的關節，你是不是也有這些困擾？一、……二、……三、……」
// 米色畫面，頻道名稱淡入；大標兩行冒出；三張困擾卡隨旁白「一、二、三」依序浮上來，念到的那張加橘框；
// 念完後卡片和大標淡出，只留頻道名稱，接幕 01 的聊天卡片。
// 設計時間從 400 開始（見 narration/part0-anchors.json；成片裡這一頁在 0 秒）。
const PAINS = [
  { ic: () => iconPill('pn0'), b: '花了不少錢買保健食品，', s: '卻不知道狗狗到底需不需要' },
  { ic: () => '<img src="assets/dogs/stand-side.png" alt="">', b: '以為狗狗還年輕、走路正常，', s: '就不用擔心關節問題' },
  { ic: () => iconStopwatch('pn2'), b: '不知道什麼時候該開始保養，', s: '怕太早浪費錢、太晚又來不及' },
];
const PAIN_T = [403.94, 408.04, 411.97];
Intro.scene({
  id: '00', title: '開場：你是不是也有這些困擾？', start: 400, end: 417.933,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 415.8,
  visuals: ["米色背景，左上角頻道 logo 與名稱「汪探｜WanTan」", "大標：「想照顧好狗狗的關節，」（黑）／「你是不是也有這些困擾？」（橘）", "困擾卡 01：保健品罐圖示＋「花了不少錢買保健食品，」／「卻不知道狗狗到底需不需要」", "困擾卡 02：站著的年輕狗狗＋「以為狗狗還年輕、走路正常，」／「就不用擔心關節問題」", "困擾卡 03：碼錶圖示＋「不知道什麼時候該開始保養，」／「怕太早浪費錢、太晚又來不及」"],
  motions: ["400.1 秒｜頻道名稱由上往下淡入", "400.8 秒｜大標第一行冒出", "402.3 秒｜大標第二行冒出", "403.94 秒｜念到「一、」時困擾卡 01 浮上來、加橘框", "408.04 秒｜困擾卡 02 浮上來、橘框移到這張", "411.97 秒｜困擾卡 03 浮上來、橘框移到這張", "416.1 秒｜大標和卡片淡出，只留頻道名稱，接幕 01"],
  sfx: [
    [403.94, "pop-card", "困擾卡 01 浮上：「啵」"],
    [408.04, "pop-card", "困擾卡 02 浮上：「啵」", { pitch: 1.12 }],
    [411.97, "pop-card", "困擾卡 03 浮上：「啵」", { pitch: 1.26 }],
    [416.1, "whoosh", "淡出：「咻」", { gain: 0.6 }],
  ],
  mount: [
    { into: '#chrome', html: `<div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>` },
    { into: '#P0', html: `
      <div class="h abs" style="left:72px;top:170px;font-size:100px" id="h0"><span class="ln"><span id="h01">想照顧好狗狗的關節，</span></span><span class="ln"><span id="h02" class="o">你是不是也有這些困擾？</span></span></div>
      ${PAINS.map((p, k) => `<div class="pain card" id="pn${k}" style="left:${72 + k * 608}px"><div class="num">0${k + 1}</div><div class="ic" id="pni${k}"></div><b>${p.b}</b><span>${p.s}</span></div>`).join('')}` },
  ],
  assets() {
    PAINS.forEach((p, k) => { document.getElementById('pni' + k).innerHTML = p.ic(); });
  },
  init() {
    gsap.set('#logo', { opacity: 0, y: -12 });
    gsap.set(['#h01', '#h02'], { yPercent: 110 });
    gsap.set('.pain', { opacity: 0, y: 60 });
  },
  animate({ L, E }) {
    const ring = '0 0 0 5px #F97316,0 50px 90px -40px rgba(107,74,42,.35)';
    const plain = '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)';
    L('#logo', { opacity: 1, y: 0, duration: .6, ease: E }, 400.1);
    L('#h01', { yPercent: 0, duration: .8, ease: 'power4.out' }, 400.8);
    L('#h02', { yPercent: 0, duration: .8, ease: 'power4.out' }, 402.3);
    PAIN_T.forEach((t, k) => {
      if (k > 0) L('#pn' + (k - 1), { boxShadow: plain, duration: .4 }, t);
      L('#pn' + k, { opacity: 1, y: 0, boxShadow: ring, duration: .6, ease: 'back.out(1.6)' }, t);
    });
    L('#pn2', { boxShadow: plain, duration: .4 }, 415.9);
    L(['#h0', '.pain'], { opacity: 0, y: -20, duration: .6, ease: 'power2.in' }, 416.1);
  },
});
