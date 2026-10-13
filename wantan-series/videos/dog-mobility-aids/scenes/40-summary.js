// 幕 40｜總結：不是先看價格、不是功能越多越好 → 先看狗狗還能自己做到多少 → 找適合的輔助方式；行動力明顯下降先看獸醫
WT.scene('40', {
  enter: 'slide',
  visuals: ['小標「總結」', '兩張灰卡（打叉）：「先看價格」「功能越多越好」', '橘框大卡（打勾）：「先看狗狗還能自己做到多少」→「再找適合的輔助方式」', '下方：「行動力明顯下降 → 先讓獸醫確認原因」'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e40" data-text="總結"></div></div>
    ${['先看價格', '功能越多越好'].map((t, k) => `<div class="box card" id="x40${k}" style="left:${72 + k * 520}px;top:220px;width:480px;height:150px;display:flex;align-items:center;gap:22px;background:#EFE6DA"><span class="mk no">✕</span><b style="color:#8F8377;font-size:40px">${t}</b></div>`).join('')}
    <div class="box card" id="c40" style="left:72px;top:420px;width:1776px;height:250px;display:flex;align-items:center;gap:30px;padding:0 56px"><span class="mk ok">✓</span><div><b style="font-size:56px">先看狗狗還能自己做到多少</b><b id="o40" style="font-size:48px;color:var(--or)">→ 再找適合的輔助方式</b></div></div>
    <div class="big" id="b40" style="left:72px;top:740px;font-size:52px">行動力明顯下降 → <span class="o">先讓獸醫確認原因</span></div>`,
  init() { gsap.set('[id^=x40]', { opacity: 0, y: 30 }); gsap.set('#c40', { opacity: 0, y: 50 }); gsap.set('#o40', { opacity: 0, x: -20 }); gsap.set('#b40', { opacity: 0, y: 30 }); },
  animate(S) {
    S.type('#e40', S.at(0), .4, '小標逐字打出');
    L.pop(S, '#x400', S.word('先看價格'), '打叉卡 01 浮上', .8, 'pop-low');
    L.pop(S, '#x401', S.word('功能越多'), '打叉卡 02 浮上', .9, 'pop-low');
    L.pop(S, '#c40', S.word('先看狗狗'), '打勾大卡浮上、加橘框'); S.to('#c40', { boxShadow: L.RING, duration: .4 }, S.word('先看狗狗'));
    S.to('#o40', { opacity: 1, x: 0, duration: .5 }, S.word('再找'), '「再找適合的輔助方式」滑入'); S.sfx(S.word('再找'), 'slide', '輕「咻」');
    S.to('#b40', { opacity: 1, y: 0, duration: .6 }, S.word('行動力'), '下方一行浮上'); L.ding(S, S.word('先讓獸醫'), '先讓獸醫確認原因');
  },
});
