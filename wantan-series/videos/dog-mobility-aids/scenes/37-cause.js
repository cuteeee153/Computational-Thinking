// 幕 37｜比預算更重要的三件事 ①：先找出走不好的原因（關節、神經、脊椎）
const TABS = ['先找原因', '尺寸合身', '搭配其他照護'];
const tabs = n => `<div class="tabs">${TABS.map((t, k) => `<span class="${k === n ? 'on' : ''}">0${k + 1} ${t}</span>`).join('')}</div>`;
WT.scene('37', {
  enter: 'slide',
  visuals: ['大標：「有三件事，」（黑）／「比價格更重要」（橘）', '三個頁籤：01 先找原因（亮橘）、02 尺寸合身、03 搭配其他照護', '三張卡：關節、神經、脊椎（念到時浮上）', '橘字：「不同原因，處理方式不一樣」'],
  mount: () => `
    <div id="tb37">${tabs(0)}</div>
    ${L.h('h37', [['有三件事，'], ['比價格更重要', 'o']], { top: 240, size: 84 })}
    ${['關節', '神經', '脊椎'].map((t, k) => `<div class="box card" id="c37${k}" style="left:${72 + k * 380}px;top:560px;width:340px;height:200px;display:flex;align-items:center;justify-content:center"><b style="font-size:60px">${t}</b></div>`).join('')}
    <div class="big o" id="o37" style="left:72px;top:820px;font-size:56px">不同原因，處理方式不一樣</div>
    <div class="abs" id="d37" style="left:1300px;top:420px;width:400px">${iconMagnifier('i37')}</div>`,
  init() { L.hInit('h37', 2); gsap.set('#tb37', { opacity: 0, y: -20 }); gsap.set('[id^=c37]', { opacity: 0, y: 40 }); gsap.set('#o37', { opacity: 0, y: 30 }); gsap.set('#d37', { opacity: 0, scale: .7 }); },
  animate(S) {
    L.hLine(S, '#h371', S.at(0)); L.hLine(S, '#h372', S.word('比價格'), '大標第二行（橘）');
    S.to('#tb37', { opacity: 1, y: 0, duration: .5 }, S.word('第一'), '頁籤出現，01 亮橘'); S.sfx(S.word('第一'), 'tick-soft', '輕點');
    S.to('#d37', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, S.word('原因'), '放大鏡彈出'); S.sfx(S.word('原因'), 'pop', '「啵」');
    ['關節', '神經', '脊椎'].forEach((w, k) => L.pop(S, '#c37' + k, S.word(w), `「${w}」卡浮上`, 1 + k * .12));
    S.to('#o37', { opacity: 1, y: 0, duration: .6 }, S.word('不同原因'), '橘字浮上'); L.ding(S, S.word('不同原因'), '結論');
  },
});
