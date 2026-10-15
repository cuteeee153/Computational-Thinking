// 幕 02｜上網找輔具越看越困惑：搜尋列打字，三種輔具卡依序浮上，最後問「到底該從哪一種開始？」
const D2 = [['harness', '穿在身上的', '穿在身上'], ['sling', '從肚子下面托住', '肚子下面'], ['wheel', '直接裝上輪子', '輪子']];
WT.scene('02', {
  visuals: ['上方搜尋列，打出「狗狗輔具」', ...D2.map(([k, s], i) => `輔具卡 0${i + 1}：黑柴＋${L.DEV_NAME[k]}插畫，下方一行「${s}」`), '最後三張卡變淡，中間橘色大字「價格差很多，該從哪一種開始？」'],
  mount: () => `
    <div class="search" id="sr2"><svg viewBox="0 0 40 40"><circle cx="17" cy="17" r="11" fill="none" stroke="#E2620E" stroke-width="4"/><path d="M25 25 L35 35" stroke="#E2620E" stroke-width="4" stroke-linecap="round"/></svg><span id="sq2" data-text="狗狗輔具"></span><span class="caret"></span></div>
    ${D2.map(([k, s], i) => `<div class="dcard card" id="dc2${i}" style="left:${72 + i * 628}px;top:330px"><div class="dv-wrap">${L.dev(k)}</div><b>${s}</b></div>`).join('')}
    <div class="big o" id="q2" style="left:0;right:0;top:420px;text-align:center;font-size:96px">價格差很多，<br>到底該從哪一種開始？</div>`,
  init() { gsap.set('#sr2', { opacity: 0, y: -20 }); gsap.set('.dcard', { opacity: 0, y: 60 }); gsap.set('#q2', { opacity: 0, scale: .85 }); },
  animate(S) {
    S.to('#sr2', { opacity: 1, y: 0, duration: .5 }, S.at(0), '念到「想買狗狗輔具」搜尋列出現');
    S.type('#sq2', S.word('狗狗輔具'), .7, '打出「狗狗輔具」');
    S.sfx(S.word('狗狗輔具'), 'typing', '打字聲', { chars: 4 });
    D2.forEach(([k, s, w], i) => L.pop(S, '#dc2' + i, S.word(w), `輔具卡 0${i + 1} 浮上`, [1, 1.12, 1.26][i]));
    const t = S.word('價格');
    S.to('.dcard', { opacity: .12, duration: .5 }, t, '三張卡變淡');
    S.to('#q2', { opacity: 1, scale: 1, duration: .6, ease: 'back.out(1.8)' }, t, '橘色大字彈出：價格差很多，到底該從哪一種開始？');
    S.sfx(t, 'pop', '問題彈出：「啵」');
  },
});
