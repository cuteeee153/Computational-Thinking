// 幕 07–08｜觀念一：疫苗讓身體先認識病菌（通緝海報）→ 產生抗體 → 抗體＝防衛部隊，真的病菌來了被擋回去。
K.scene('07', 0, {
  enter: 'wipe',
  visuals: ['小標「觀念一」；大標「疫苗讓身體」／「先認識病菌」（灰）', '中間一張白色通緝海報：病菌圖示＋「病菌」，藍色手寫標註「先認識」', '右邊坐著的黑柴；念到「抗體」時，三個 Y 字抗體在狗身邊冒出來，橘色標籤「抗體」'],
  mount: () => K.kicker('k07', '01', '觀念一｜疫苗和抗體', { y: 250 }) + K.h('h07', ['疫苗讓身體', '~先認識病菌'], { y: 310, size: 96 }) +
    `<div class="cd" id="ps07" style="left:820px;top:250px;width:330px;height:420px;padding:34px;text-align:center;transform:rotate(-3deg)"><div class="k">WANTED</div><div class="ic" style="width:210px;height:210px;margin:20px auto 10px">${K.ic('Virus')}</div><div class="t">病菌</div></div>` +
    K.anno('a07', '', '先認識', { x: 860, y: 720, ss: 40 }) + K.arrow('w07', { x: 960, y: 690, w: 120, h: 60, d: 'M10 50 C 30 10, 70 8, 100 30' }) +
    K.dog('sit', { id: 'dg07', x: 1330, y: 380, w: 380 }) +
    [[1250, 300, -20], [1690, 360, 18], [1700, 650, 30]].map(([x, y, r], k) => `<div class="ico" id="ab07${k}" style="left:${x}px;top:${y}px;width:120px;height:120px;transform:rotate(${r}deg)">${K.ic('Antibody')}</div>`).join('') +
    `<div class="pl o" id="p07" style="left:1460px;top:240px">抗體</div>`,
  init() { K.hideLines('h07', 2); gsap.set('#ps07', { opacity: 0, rotate: -18, y: 60 }); gsap.set('#a07', { opacity: 0 }); gsap.set('#dg07', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k07', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h07', 2, S.word('疫苗的作用'), '大標冒出');
    S.to('#dg07', { opacity: 1, duration: .5 }, S.at(0) + .3);
    S.to('#ps07', { opacity: 1, rotate: -3, y: 0, duration: .7, ease: 'back.out(1.6)' }, S.word('認識', 0, -.2), '通緝海報「病菌」甩進來');
    S.sfx(S.word('認識', 0, -.2), 'flip', '海報：「啪」');
    K.draw(S, '#w07', S.word('認識', 0, .2), '藍色手寫「先認識」');
    S.to('#a07', { opacity: 1, duration: .3 }, S.word('認識', 0, .2));
    K.pop(S, ['#ab070', '#ab071', '#ab072'], S.word('抗體', 0, -.1), '三個抗體在狗身邊冒出', { stagger: .12 });
    K.pop(S, '#p07', S.word('抗體', 0, .2), '「抗體」橘色標籤', { sfx: 'ding-soft' });
  },
});
K.scene('08', 0, {
  enter: 'none',
  visuals: ['（接續）狗身邊出現藍色虛線防護圈，「抗體＝防衛部隊」標籤', '一隻真的病菌從右邊衝過來，撞到防護圈被彈開、打叉', '下方橘色字「更快對抗它」'],
  mount: () => `<div class="abs" id="ring08" style="left:1290px;top:400px;width:470px;height:470px;border-radius:50%;border:6px dashed var(--blue)"></div>` +
    `<div class="pl b" id="p08" style="left:1240px;top:900px">抗體＝防衛部隊</div>` +
    `<div class="ico" id="v08" style="left:1960px;top:560px;width:150px;height:150px">${K.ic('Virus')}</div><div class="x" id="x08" style="left:1800px;top:580px"></div>` +
    `<div class="sub" id="s08" style="left:140px;top:640px;font-size:48px;font-weight:900"><b>更快對抗它</b></div>`,
  init() { gsap.set('#ring08', { scale: .3, opacity: 0 }); gsap.set('#x08', { opacity: 0, scale: .4 }); },
  animate(S) {
    S.to('#ring08', { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.4)' }, S.word('防衛部隊', 0, -.2), '狗身邊出現藍色防護圈');
    S.to('#ab070', { left: 1300, top: 430, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    S.to('#ab071', { left: 1650, top: 430, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    S.to('#ab072', { left: 1660, top: 700, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    K.pop(S, '#p08', S.word('防衛部隊'), '「抗體＝防衛部隊」標籤', { sfx: 'pop-card' });
    S.to('#v08', { left: 1720, duration: .7, ease: 'power2.in' }, S.word('真正的病菌'), '真的病菌從右邊衝過來');
    S.sfx(S.word('真正的病菌'), 'whoosh', '病菌衝過來：「咻」');
    S.to('#v08', { left: 1830, rotate: 60, duration: .5, ease: 'power2.out' }, S.word('真正的病菌', 0, .7), '撞到防護圈被彈開');
    S.sfx(S.word('真正的病菌', 0, .7), 'shake', '彈開：喀喀');
    S.to('#x08', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('更快'), '病菌被打叉');
    S.to('#v08', { opacity: .35, duration: .3 }, S.word('更快'));
    K.rise(S, '#s08', S.word('更快'), '橘色字「更快對抗它」');
  },
});
