// 幕 01｜開場：「你的狗狗打疫苗了嗎？」問題泡泡一個個冒出來，圍著歪頭的黑柴；最後「八合一 vs 十合一」橘色大泡泡。
const Q01 = [
  { at: '要打哪些', t: '要打哪些？', x: 760, y: 200, r: -4 },
  { at: '預防什麼', t: '在預防什麼？', x: 1440, y: 150, r: 3 },
  { at: '多久打一次', t: '多久打一次？', x: 1560, y: 380, r: -2 },
  { at: '每隻狗狗', t: '每隻都建議打？', x: 700, y: 760, r: 2 },
];
K.scene('01', -1, {
  enter: 'cut', bg: 'mint',
  visuals: ['淡綠底；左邊大標「你的狗狗」／「打疫苗了嗎？」（灰）', '中間歪頭的黏土黑柴', '念到每個問題時，白色問題泡泡一個個冒出來圍著狗：要打哪些？在預防什麼？多久打一次？每隻都建議打？', '最後橘色大泡泡「八合一 vs 十合一？」'],
  mount: () => K.h('h01', ['你的狗狗', '~打疫苗了嗎？'], { y: 380, size: 112 }) +
    K.dog('tilt', { id: 'dg01', x: 1060, y: 330, w: 430 }) +
    Q01.map((q, k) => `<div class="pl" id="q01${k}" style="left:${q.x}px;top:${q.y}px;transform:rotate(${q.r}deg)">${K.ic('Chat')}${q.t}</div>`).join('') +
    `<div class="pl o" id="q01x" style="left:1430px;top:760px;font-size:44px;padding:22px 40px;transform:rotate(-3deg)"><span class="big" style="font-size:60px">8</span>合一 <span style="opacity:.75;font-size:30px">vs</span> <span class="big" style="font-size:60px">10</span>合一？</div>`,
  init() { K.hideLines('h01', 2); gsap.set('#dg01', { opacity: 0, y: 40 }); },
  animate(S) {
    K.lines(S, 'h01', 2, S.at(0), '大標兩行冒出');
    S.to('#dg01', { opacity: 1, y: 0, duration: .7, ease: 'back.out(1.6)' }, S.at(0) + .2, '黑柴歪頭跳出來');
    S.sfx(S.at(0) + .2, 'boing', '黑柴跳出：小彈簧');
    Q01.forEach((q, k) => K.pop(S, '#q01' + k, S.word(q.at, 0, -.1), k ? '' : '念到每個問題時，問題泡泡一個個冒出來', { pitch: 1 + k * .08 }));
    K.pop(S, '#q01x', S.word('八合一', 0, -.1), '「八合一 vs 十合一？」橘色大泡泡彈出', { sfx: 'pop-card' });
    S.to('#dg01', { rotate: -4, duration: .4, yoyo: true, repeat: 1, ease: 'sine.inOut' }, S.word('八合一'));
  },
});
