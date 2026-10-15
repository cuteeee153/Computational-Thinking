// 幕 37｜比預算更重要的三件事：三個頁籤先放大在中間依序出現（第一、第二、第三），念到「一，先找原因」時縮小移到上方、01 亮橘
const TABS = ['先找原因', '尺寸合身', '搭配其他照護'];
const tabs = n => `<div class="tabs">${TABS.map((t, k) => `<span class="${k === n ? 'on' : ''}">0${k + 1} ${t}</span>`).join('')}</div>`;
WT.scene('37', {
  enter: 'slide',
  visuals: ['大標：「有三件事，」（黑）／「比價格更重要」（橘）', '畫面中間三個放大的頁籤，念到第一、第二、第三時依序出現：01 先找原因、02 尺寸合身、03 搭配其他照護',
    '念到「一，先找原因」：大標淡出，頁籤縮小移到上方，01 亮橘', '三張卡：關節、神經、脊椎（念到時浮上）；右邊放大鏡', '橘字：「不同原因，處理方式不一樣」'],
  mount: () => `
    <div id="tb37">${tabs(-1)}</div>
    ${L.h('h37', [['有三件事，'], ['比價格更重要', 'o']], { top: 150, size: 84 })}
    ${['關節', '神經', '脊椎'].map((t, k) => `<div class="box card" id="c37${k}" style="left:${72 + k * 380}px;top:330px;width:340px;height:200px;display:flex;align-items:center;justify-content:center"><b style="font-size:60px">${t}</b></div>`).join('')}
    <div class="big o" id="o37" style="left:72px;top:600px;font-size:60px">不同原因，處理方式不一樣</div>
    <div class="abs" id="d37" style="left:1300px;top:300px;width:400px">${iconMagnifier('i37')}</div>`,
  init() {
    L.hInit('h37', 2);
    const el = document.querySelector('#tb37 .tabs'), w = el.offsetWidth, k = 1.8;
    gsap.set(el, { transformOrigin: '0 0', scale: k, x: (1920 - w * k) / 2 - 72, y: 400 });
    gsap.set('#tb37 span', { opacity: 0, y: 30 });
    gsap.set('[id^=c37]', { opacity: 0, y: 40 }); gsap.set('#o37', { opacity: 0, y: 30 }); gsap.set('#d37', { opacity: 0, scale: .7 });
  },
  animate(S) {
    L.hLine(S, '#h371', S.at(0)); L.hLine(S, '#h372', S.word('比價格'), '大標第二行（橘）');
    ['第一', '第二', '第三'].forEach((w, k) => { S.to(`#tb37 span:nth-child(${k + 1})`, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.8)' }, S.word(w), `念到「${w}」頁籤 0${k + 1} 在中間浮上`); S.sfx(S.word(w), 'pop-card', `頁籤 0${k + 1}：「啵」`, { pitch: 1 + k * .12 }); });
    const t = S.word('一，先找原因', 0, -.2);
    S.to(['#h371', '#h372'], { opacity: 0, duration: .4 }, t, '大標淡出');
    S.to('#tb37 .tabs', { scale: 1, x: 0, y: 0, duration: .8, ease: 'power3.inOut' }, t, '頁籤縮小移到上方');
    S.to('#tb37 span:first-child', { backgroundColor: '#F97316', color: '#fff', duration: .3 }, t + .5, '01 先找原因亮橘');
    S.sfx(t, 'whoosh', '移到上方：「咻」', { gain: .6 }); S.sfx(t + .5, 'tick-soft', '亮橘：輕點');
    S.to('#d37', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(1.8)' }, t + .6, '放大鏡彈出');
    ['關節', '神經', '脊椎'].forEach((w, k) => L.pop(S, '#c37' + k, S.word(w), `「${w}」卡浮上`, 1 + k * .12));
    S.to('#o37', { opacity: 1, y: 0, duration: .6 }, S.word('不同原因'), '橘字浮上'); L.ding(S, S.word('不同原因'), '結論');
  },
});
