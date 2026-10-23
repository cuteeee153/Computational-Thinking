// 幕 06｜章節卡：開始之前，三個基本觀念。大大的「3」＋三塊圖示磚飛進來。
K.scene('06', 0, {
  enter: 'iris', irisAt: [960, 540], bg: 'mint',
  visuals: ['淡綠底，圓形轉場擴開', '左邊小標「01｜基本觀念」，超大數字「3」＋「個基本觀念」', '右邊三塊圖示磚依序飛進來：針筒（疫苗是什麼）、盾牌（核心 vs 非核心疫苗）、藥罐（疫苗 vs 預防藥）；開心的黑柴'],
  mount: () => `<div class="chap">${K.kicker('k06', '01', '基本觀念', { y: 300 })}<div class="num" id="n06" style="left:130px;top:370px">3</div>` +
    K.h('h06', ['個基本觀念'], { x: 390, y: 560, size: 104 }) +
    [['Syringe', '疫苗是什麼'], ['Shield', '核心 vs 非核心疫苗'], ['Pill', '疫苗 vs 預防藥']].map(([ic, t], k) =>
      K.tile(ic, { id: 't06' + k, x: 1060 + k * 210, y: 270 + (k % 2) * 60, rot: [-5, 4, -3][k] }) + `<div class="abs" id="l06${k}" style="left:${1010 + k * 210}px;top:${450 + (k % 2) * 60}px;width:250px;text-align:center;font-size:24px;font-weight:700;color:#7C7772">${t}</div>`).join('') +
    K.dog('happy', { id: 'dg06', x: 1290, y: 600, w: 230 }) + `</div>`,
  init() { K.hideLines('h06', 1); gsap.set('#n06', { opacity: 0, scale: .6, transformOrigin: '30% 70%' }); gsap.set('#dg06', { opacity: 0, y: 40 }); },
  animate(S) {
    S.fromTo('#k06', { opacity: 0 }, { opacity: 1, duration: .4 }, S.start + .3);
    S.to('#n06', { opacity: 1, scale: 1, duration: .7, ease: 'back.out(1.8)' }, S.word('三'), '大數字「3」彈出');
    S.sfx(S.word('三'), 'pop-card', '大數字：「啵」');
    K.lines(S, 'h06', 1, S.word('三', 0, .15), '「個基本觀念」冒出');
    [0, 1, 2].forEach(k => { K.rise(S, ['#t06' + k, '#l06' + k], S.word('三', 0, .3 + k * .18), k ? '' : '三塊圖示磚依序飛進來', { dx: 120, dy: 0, sfx: k ? false : 'whoosh' }); });
    S.to('#dg06', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.8)' }, S.word('觀念', 0, .3), '開心的黑柴跳出');
    S.sfx(S.word('觀念', 0, .3), 'boing', '黑柴：小彈簧');
  },
});
