// 幕 01｜開場痛點（系列固定版型）：大標兩行＋三張困擾卡，念到「一、二、三」時依序浮上來，念到的那張加橘框。
// 換主題時改 PAINS 的圖示和文字，念到的關鍵字改 at。
const PAINS = [
  { ic: () => iconPill('pn0'), b: '花了不少錢買保健食品，', s: '卻不知道狗狗到底需不需要', at: '一、花了' },
  { ic: () => WT.dog('stand-side'), b: '以為狗狗還年輕、走路正常，', s: '就不用擔心關節問題', at: '二、以為' },
  { ic: () => iconStopwatch('pn2'), b: '不知道什麼時候該開始保養，', s: '怕太早浪費錢、太晚又來不及', at: '三、不知道' },
];
WT.scene('01', {
  visuals: ['米色背景，左上角頻道 logo 與名稱「汪探｜WanTan」', '大標：「想照顧好狗狗的關節，」（黑）／「你是不是也有這些困擾？」（橘）',
    ...PAINS.map((p, k) => `困擾卡 0${k + 1}：「${p.b}」／「${p.s}」`)],
  mount: () => `
    <div class="h abs" style="left:72px;top:170px;font-size:100px"><span class="ln"><span id="h01">想照顧好狗狗的關節，</span></span><span class="ln"><span id="h02" class="o">你是不是也有這些困擾？</span></span></div>
    ${PAINS.map((p, k) => `<div class="pain card" id="pn${k}" style="left:${72 + k * 608}px"><div class="num">0${k + 1}</div><div class="ic" id="pni${k}"></div><b>${p.b}</b><span>${p.s}</span></div>`).join('')}`,
  assets() { PAINS.forEach((p, k) => { document.getElementById('pni' + k).innerHTML = p.ic(); }); },
  init() {
    gsap.set(['#h01', '#h02'], { yPercent: 110 });
    gsap.set('.pain', { opacity: 0, y: 60 });
  },
  animate(S) {
    const ring = '0 0 0 5px #F97316,0 50px 90px -40px rgba(107,74,42,.35)';
    const plain = '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)';
    S.to('#h01', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '大標第一行冒出');
    S.to('#h02', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(1), '大標第二行冒出');
    PAINS.forEach((p, k) => {
      const t = S.word(p.at);
      if (k > 0) S.to('#pn' + (k - 1), { boxShadow: plain, duration: .4 }, t);
      S.to('#pn' + k, { opacity: 1, y: 0, boxShadow: ring, duration: .6, ease: 'back.out(1.6)' }, t, `念到「${p.at.slice(0, 1)}」時困擾卡 0${k + 1} 浮上來、加橘框`);
      S.sfx(t, 'pop-card', `困擾卡 0${k + 1} 浮上：「啵」`, { pitch: [1, 1.12, 1.26][k] });
    });
    S.to('#pn2', { boxShadow: plain, duration: .4 }, S.narrEnd + .2);
  },
});
