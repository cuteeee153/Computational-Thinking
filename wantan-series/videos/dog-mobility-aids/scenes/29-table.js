// 幕 29～34｜五個重點比較表：29 先畫出表頭（三種輔具）和五個比較項目，30～34 接著用同一張表（不換底），念到哪一列就填哪一列、那一列的項目變橘。
const ROWS = ['什麼時候用', '你自己的體力', '家裡的環境', '尺寸合不合', '能不能配合照護'];
WT.scene('29', {
  enter: 'slide',
  visuals: ['比較表：上方三欄表頭（黑柴小插畫＋輔助帶／助行吊帶／輪椅）', '左邊五個比較項目：' + ROWS.map((r, k) => `0${k + 1} ${r}`).join('、'), '內容格先空白，之後每一幕填一列'],
  mount: () => `<div class="tbl" id="tbl">
    <div class="tr"><div></div>${['harness', 'sling', 'wheel'].map((k, i) => `<div class="th" id="th${i}"><div style="width:110px">${L.dev(k)}</div>${L.DEV_NAME[k]}</div>`).join('')}</div>
    ${ROWS.map((r, k) => `<div class="tr" id="tr${k}"><div class="tl" id="tl${k}"><span class="n">0${k + 1}</span>${r}</div><div id="cells${k}" style="display:contents"></div></div>`).join('')}</div>`,
  init() { gsap.set('[id^=th]', { opacity: 0, y: -30 }); gsap.set('[id^=tl]', { opacity: 0, x: -40 }); },
  animate(S) {
    [0, 1, 2].forEach(i => { S.to('#th' + i, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, S.word('三種輔具', 0, i * .2), i ? '' : '表頭三種輔具依序浮上'); S.sfx(S.word('三種輔具', 0, i * .2), 'pop-card', `表頭 ${i + 1}：「啵」`, { pitch: 1 + i * .12 }); });
    ROWS.forEach((_, k) => S.to('#tl' + k, { opacity: 1, x: 0, duration: .4, ease: 'power3.out' }, S.word('五個重點', 0, k * .15), k ? '' : '左邊五個比較項目由上往下滑入'));
    S.sfx(S.word('五個重點'), 'slide', '項目滑入：輕「咻」');
  },
});
// 30～34 共用：填一列。cells：三格內容（[文字]）或一格跨三欄（{span:文字}）；ats：每格念到的字
function rowScene(id, k, cells, ats) {
  WT.scene(id, {
    enter: 'none',
    visuals: [`比較表第 0${k + 1} 列「${ROWS[k]}」：項目變橘底白字`, ...(cells.span ? [`一格橫跨三欄：「${cells.span.replace(/<\/?b>/g, '')}」`] : cells.map((c, i) => `${['輔助帶', '助行吊帶', '輪椅'][i]}：「${c.replace(/<\/?b>/g, '')}」`))],
    mount: () => [{ into: '#cells' + k, html: cells.span ? `<div class="td span" id="td${k}0"><span>${cells.span}</span></div>` : cells.map((c, i) => `<div class="td" id="td${k}${i}"><span>${c}</span></div>`).join('') }],
    init() { gsap.set(`[id^=td${k}]`, { opacity: 0, scale: .9 }); },
    animate(S) {
      if (k > 0) S.to('#tl' + (k - 1), { backgroundColor: '#EFE6DA', color: '#231B15', duration: .3 }, S.at(0));
      if (k > 0) S.to('#tl' + (k - 1) + ' .n', { color: '#E2620E', duration: .3 }, S.at(0));
      S.to('#tl' + k, { backgroundColor: '#F97316', color: '#fff', duration: .3 }, S.at(0), `第 0${k + 1} 列項目變橘`);
      S.to('#tl' + k + ' .n', { color: '#fff', duration: .3 }, S.at(0));
      S.sfx(S.at(0), 'tick-soft', `第 0${k + 1} 列：輕點`);
      (cells.span ? [0] : [0, 1, 2]).forEach(i => { const t = S.word(ats[i]); S.to(`#td${k}${i}`, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(1.8)' }, t, `第 0${k + 1} 列第 ${i + 1} 格出現`); S.sfx(t, 'pop', '格子：「啵」', { pitch: 1 + i * .12 }); });
    },
  });
}
