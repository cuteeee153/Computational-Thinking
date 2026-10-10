// 幕 38｜「這邊幫你整理好了 AAHA 關節照護指引中列出的好發品種風險資料表……需不需要提早進入加強留意組」（接在幕 23「一、屬於特定的好發品種」之後）
// 新的米色畫面由右往左蓋過五類風險因子，小標「風險因子 01 ／ 特定的好發品種」打出，大標冒出；
// 表格的四列（體型）依序浮上來，品種頭貼和要留意的項目在第 39–42 幕隨旁白加入。
// 表格內容整理自 AAHA 關節照護指引列出的好發品種（文章的「體型 × 品種對照表」）。
const TABLE = [
  { g: 'small', size: '小型犬', risk: '髕骨脫臼' },
  { g: 'hip', size: '中大型犬', risk: '髖關節發育不良' },
  { g: 'ocd', size: '大型／運動型犬', risk: '肩關節剝離性骨軟骨炎' },
  { g: 'elbow', size: '大型／工作犬種', risk: '肘關節發育不良' },
];
Intro.scene({
  id: '38', title: '體型 × 品種對照表', start: 245, end: 255.4,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 255.2,
  visuals: ["米色畫面（由右邊蓋進來）", "小標「風險因子 01 ／ 特定的好發品種」", "大標：「哪些狗狗，」（黑）＋「該提早留意？」（橘）", "右上角來源標籤：「SOURCE ／ AAHA《Mobility Matters》」", "四列表格（白色長條），左邊是體型：小型犬／中大型犬／大型／運動型犬／大型／工作犬種"],
  motions: ["245.0 秒｜米色畫面由右往左蓋過五類風險因子，約 0.85 秒", "245.6 秒｜小標逐字打出", "246.3 秒｜大標冒出（念到「這邊幫你整理好了」）", "247.6 秒｜來源標籤淡入（念到「AAHA」）", "250.9 秒｜四列表格依序浮上來（念到「幫助你快速對照」）"],
  sfx: [
    [245.0, "whoosh-big", "米色畫面由右蓋進來：大「咻」"],
    [247.6, "slide", "來源標籤：輕「咻」", { gain: 0.6 }],
    [250.9, "pop-card", "表格第 1 列浮上：「啵」"],
    [251.02, "pop-card", "表格第 2 列浮上：「啵」", { pitch: 1.12 }],
    [251.14, "pop-card", "表格第 3 列浮上：「啵」", { pitch: 1.26 }],
    [251.26, "pop-card", "表格第 4 列浮上：「啵」", { pitch: 1.34 }],
  ],
  mount: [
    { into: '#chrome', html: `<div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>` },
    { into: '#S7-text', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e7" data-text="風險因子 01 ／ 特定的好發品種"></div></div>
      <div class="src lt" id="src7">SOURCE ／ AAHA《Mobility Matters》</div>
      <div class="h abs" style="left:72px;top:190px;font-size:84px" id="h7t"><span class="ln"><span id="h7t1">哪些狗狗，<span class="o">該提早留意？</span></span></span></div>` },
    { into: '#tbl', html: TABLE.map((r, k) => `
      <div class="trow card" id="tr${k}" style="top:${318 + k * 164}px">
        <div class="sz"><b>${r.size}</b><span class="rk" id="rk${k}">要留意：${r.risk}</span></div>
        <div class="hd">${BREEDS[r.g].map(([f, zh], i) => `<div class="bh" id="bh${k}-${i}"><i><img src="assets/breeds/${f}" alt=""></i><span>${zh}</span></div>`).join('')}</div>
      </div>`).join('') },
  ],
  init() {
    gsap.set('#S7', { xPercent: 100 });
    gsap.set('#h7t1', { yPercent: 110 });
    gsap.set('#src7', { opacity: 0, y: -10 });
    gsap.set('.trow', { opacity: 0, y: 40 });
    gsap.set('.trow .rk', { opacity: 0, x: -14 });
    gsap.set('.bh', { opacity: 0, scale: .5, y: 14 });
  },
  animate({ L, E, type }) {
    L('#S7', { xPercent: 0, duration: .85, ease: 'power3.inOut' }, 245.0);
    type('#e7', 245.6, .7);
    L('#h7t1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 246.3);
    L('#src7', { opacity: 1, y: 0, duration: .5, ease: E }, 247.6);
    for (let k = 0; k < 4; k++) L('#tr' + k, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, 250.9 + k * .12);
  },
});
// 第 39–42 幕共用：這一列亮起（橘框）、要留意的項目滑入、品種頭貼一個個彈出；前一列的橘框收掉
function tableRow(L, E, k, { tRow, tHeads, tRisk }) {
  if (k > 0) L('#tr' + (k - 1), { boxShadow: '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)', duration: .4 }, tRow);
  L('#tr' + k, { boxShadow: '0 0 0 4px #F97316,0 50px 90px -40px rgba(107,74,42,.35)', duration: .4, ease: E }, tRow);
  BREEDS[TABLE[k].g].forEach((_, i) => L(`#bh${k}-${i}`, { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'back.out(2.2)' }, tHeads + i * .09));
  L('#rk' + k, { opacity: 1, x: 0, duration: .45, ease: E }, tRisk);
}
function rowSfx(k, { tRow, tHeads, tRisk }) {
  const n = BREEDS[TABLE[k].g].length;
  return [[tRow, 'ding-soft', `第 ${k + 1} 列亮起：輕「叮」`],
    ...Array.from({ length: n }, (_, i) => [tHeads + i * .09, 'pop', `頭貼 ${i + 1} 彈出：「啵」`, { gain: .45, pitch: 1 + i * .05 }]),
    [tRisk, 'tick', `「要留意：${TABLE[k].risk}」滑入：「叮咚」`]];
}
