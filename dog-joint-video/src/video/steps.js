// 三步驟總覽卡（幕 21b、27、33 共用；樣式在 part2/core.css 的 .step，幕 37 的回顧也用同一組樣式）
//   stepsHTML(p, active)：三張卡的版面；p 是 id 前綴，active 是這次要亮起的步驟（1–3）
//     已經走過的步驟顯示橘色 ✓，這次的步驟是橘色編號，還沒到的是灰色編號
//   stepsAnim(L, p, active, { tIn, tLight, tOut, stag })：卡片依序浮上（間隔 stag，預設 0.12 設計秒）→ 這一步亮起（其他變淡）→ 往上收起
//     旁白很密、設計時間被壓縮的地方（幕 21b）把 stag 調小，成片裡的間隔才不會被拉長
const STEP_TEXT = ['有風險因子嗎？', '有任何徵兆嗎？', '下一步該做什麼？'];
function stepsHTML(p, active, top = 390) {
  return `<div class="abs k" style="left:0;right:0;top:${top - 58}px;text-align:center;font-size:22px" id="${p}lbl">判斷三步驟</div>` +
    STEP_TEXT.map((t, i) => {
      const n = i + 1, mark = n < active ? '✓' : n, bg = n <= active ? 'var(--or-b)' : '#E5DBCD', fg = n <= active ? '#fff' : '#A79A8B';
      return `<div class="step card" id="${p}c${i}" style="left:${72 + i * 604}px;top:${top}px"><div class="ck" style="background:${bg};color:${fg};font-family:'Space Mono'">${mark}</div><div><div class="n">STEP 0${n}</div><div class="t">${t}</div></div></div>`;
    }).join('');
}
function stepsInit(p) {
  gsap.set([0, 1, 2].map(i => `#${p}c${i}`), { opacity: 0, y: 50 });
  gsap.set(`#${p}lbl`, { opacity: 0 });
}
function stepsAnim(L, p, active, { tIn, tLight, tOut, stag = .12 }) {
  const cards = [0, 1, 2].map(i => `#${p}c${i}`);
  L(`#${p}lbl`, { opacity: 1, duration: .4 }, tIn);
  cards.forEach((c, i) => L(c, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, tIn + i * stag));
  cards.forEach((c, i) => {
    if (i === active - 1) L(c, { scale: 1.06, boxShadow: '0 0 0 5px #F97316, 0 50px 90px -40px rgba(107,74,42,.35)', duration: .4, ease: 'back.out(2)' }, tLight);
    else L(c, { opacity: .45, duration: .4 }, tLight);
  });
  L([`#${p}lbl`, ...cards], { opacity: 0, y: -40, duration: .45, ease: 'power3.in', stagger: .05 }, tOut);
}
