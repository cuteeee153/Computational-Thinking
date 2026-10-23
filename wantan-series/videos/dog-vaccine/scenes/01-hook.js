// 幕 01｜開場：先問「你的狗狗打疫苗了嗎？」（歪頭黑柴），停一下；黑柴退場、大標移到上方，五個問題條列出來，每問完一題停一下。
K.CHAPTERS = ['基本觀念', '四種疾病', '法律規定', '看懂幾合一', '施打時程', '重點整理'];
const Q01 = [
  { at: '要打哪些', t: '要打哪些？' },
  { at: '預防什麼', t: '這些疫苗到底在預防什麼？' },
  { at: '多久打一次', t: '多久打一次？' },
  { at: '每隻狗狗', t: '哪些是每隻狗狗都建議打的？' },
  { at: '八合一', t: '八合一跟十合一，又差在哪裡？', o: true },
];
K.scene('01', -1, {
  enter: 'cut', bg: 'mint',
  visuals: ['淡綠底；左邊大標「你的狗狗」／「打疫苗了嗎？」（灰），右邊歪頭的黏土黑柴', '問完停一下：黑柴退場，大標縮小移到上方', '五個問題條列出來（編號＋問題），念到哪題出現哪題、加橘框，每題之間停一下；最後一題「八合一跟十合一，又差在哪裡？」橘底白字', '右邊疫苗手冊、針筒兩塊圖示磚'],
  mount: () => `<div class="abs" id="hw01" style="left:140px;top:380px;width:1500px;white-space:nowrap;transform-origin:0 0">` + K.h('h01', ['你的狗狗', '~打疫苗了嗎？'], { x: 0, y: 0, size: 112 }) + `</div>` +
    K.dog('tilt', { id: 'dg01', x: 1100, y: 300, w: 450 }) +
    Q01.map((q, k) => `<div class="cd" id="q01${k}" style="left:140px;top:${330 + k * 122}px;width:1100px;height:100px;padding:0 34px;display:flex;align-items:center;gap:24px${q.o ? ';background:var(--or-b);color:#fff' : ''}"><span class="big" style="font-size:44px;color:${q.o ? '#fff' : 'var(--or)'};width:56px">${k + 1}</span><span style="font-size:38px;font-weight:900">${q.t}</span></div>`).join('') +
    K.tile('VaccineBook', { id: 't010', x: 1400, y: 360, size: 200, rot: -6 }) + K.tile('Syringe', { id: 't011', x: 1560, y: 620, size: 200, rot: 5 }),
  init() { K.hideLines('h01', 2); gsap.set('#dg01', { opacity: 0, y: 40 }); gsap.set(['#t010', '#t011'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h01', 2, S.at(0), '大標「你的狗狗／打疫苗了嗎？」冒出');
    S.to('#dg01', { opacity: 1, y: 0, duration: .7, ease: 'back.out(1.6)' }, S.at(0) + .2, '黑柴歪頭跳出來');
    S.sfx(S.at(0) + .2, 'boing', '黑柴跳出：小彈簧');
    const t = S.atEnd(0) + .8;
    S.to('#dg01', { opacity: 0, x: 120, duration: .5, ease: 'power2.in' }, t, '停一下之後：黑柴退場');
    S.to('#hw01', { top: 150, scale: .58, duration: .7, ease: 'power3.inOut' }, t, '大標縮小移到上方');
    S.sfx(t, 'whoosh', '換版面：「咻」', { gain: .6 });
    K.pop(S, ['#t010', '#t011'], t + .4, '右邊兩塊圖示磚', { stagger: .15, sfx: false });
    Q01.forEach((q, k) => {
      const tq = S.at(k + 1) - .1;
      if (k) K.ring(S, '#q01' + (k - 1), tq, false);
      K.rise(S, '#q01' + k, tq, k ? '' : '念到哪題，那題條列出來、加橘框', { dx: -40, dy: 0, sfx: q.o ? 'pop-card' : 'slide' });
      if (!q.o) K.ring(S, '#q01' + k, tq + .2);
    });
  },
});
