// 幕 07–08｜觀念一：針筒打進黑柴身體（哭哭）→ 身體認識病菌（通緝海報、掃描虛線）→ 一個個產生抗體；
// 08：海報翻成「抗體＝防衛部隊」卡，大標換成「抗體讓病菌更快被擊退」，真的病菌衝過來被防護圈彈開。
K.scene('07', 0, {
  enter: 'wipe',
  visuals: ['小標「觀念一」；大標「疫苗讓身體」／「先認識病菌」（橘）', '右邊哭哭的黑柴；針筒飛過來打進牠的背', '中間一張白色通緝海報「病菌」，一條藍色虛線從海報掃到狗的頭（身體在認識病菌）', '接著三個 Y 字抗體一個接一個在狗身邊冒出來，橘色標籤「抗體」'],
  mount: () => K.kicker('k07', '01', '觀念一｜疫苗和抗體', { y: 250 }) + K.h('h07', ['疫苗讓身體', '<b class="o">先認識病菌</b>'], { y: 310, size: 96 }) +
    K.dog('vaccine-cry', { id: 'dg07', x: 1240, y: 330, w: 440 }) +
    `<div class="ico" id="sy07" style="left:1720px;top:300px;width:200px;height:200px">${K.ic('Syringe')}</div>` +
    `<div class="cd" id="ps07" style="left:780px;top:250px;width:330px;height:420px;padding:34px;text-align:center;transform:rotate(-3deg)"><div class="k">WANTED</div><div class="ic" style="width:210px;height:210px;margin:20px auto 10px">${K.ic('Virus')}</div><div class="t">病菌</div></div>` +
    `<svg class="abs" style="left:0;top:0;overflow:visible" width="1920" height="1080"><path id="sc07" d="M1110 420 C 1200 380, 1280 380, 1370 430" fill="none" stroke="#2E6BD8" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/></svg>` +
    [[1180, 620, -20], [1660, 300, 18], [1690, 700, 30]].map(([x, y, r], k) => `<div class="ico" id="ab07${k}" style="left:${x}px;top:${y}px;width:120px;height:120px;transform:rotate(${r}deg)">${K.ic('Antibody')}</div>`).join('') +
    `<div class="pl o" id="p07" style="left:1440px;top:230px">抗體</div>`,
  init() { K.hideLines('h07', 2); gsap.set('#ps07', { opacity: 0, rotate: -18, y: 60 }); gsap.set('#dg07', { opacity: 0 }); gsap.set('#sy07', { opacity: 0 }); gsap.set('#sc07', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k07', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h07', 2, S.word('疫苗的作用'), '大標「疫苗讓身體／先認識病菌」');
    S.to('#dg07', { opacity: 1, duration: .5 }, S.at(0) + .3, '右邊出現黑柴');
    const ti = S.word('疫苗的作用');
    S.to('#sy07', { opacity: 1, left: 1500, top: 360, rotate: -20, duration: .7, ease: 'power2.out' }, ti, '針筒飛過來、打進黑柴的背');
    S.sfx(ti, 'whoosh', '針筒飛過來：「咻」', { gain: .6 });
    S.to('#dg07', { x: -10, duration: .07, yoyo: true, repeat: 5 }, ti + .7, '黑柴哭哭抖一下');
    S.sfx(ti + .7, 'pop-low', '打進去：低音啵');
    S.to('#sy07', { opacity: 0, left: 1720, top: 280, duration: .5 }, ti + 1.4);
    S.to('#ps07', { opacity: 1, rotate: -3, y: 0, duration: .7, ease: 'back.out(1.6)' }, S.word('認識', 0, -.2), '通緝海報「病菌」甩進來');
    S.sfx(S.word('認識', 0, -.2), 'flip', '海報：「啪」');
    S.to('#sc07', { opacity: 1, duration: .2 }, S.word('某種病菌'), '藍色虛線從海報掃到狗的頭：身體在認識病菌');
    S.fromTo('#sc07', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1.2, ease: 'none' }, S.word('某種病菌'));
    S.sfx(S.word('某種病菌'), 'marker', '掃描：「唰」', { gain: .6 });
    const ta = S.word('產生', 0, .1);
    K.pop(S, ['#ab070', '#ab071', '#ab072'], ta, '身體一個接一個產生抗體', { stagger: .35 });
    K.pop(S, '#p07', ta + 1.1, '「抗體」橘色標籤', { sfx: 'ding-soft' });
  },
});
K.scene('08', 0, {
  enter: 'none',
  visuals: ['（接續）大標換成「抗體讓病菌」／「更快被擊退」（橘）', '通緝海報翻面，變成抗體卡：Y 字抗體＋「防衛部隊」標籤', '狗身邊出現藍色虛線防護圈；一隻真的病菌從右邊衝過來，撞到防護圈被彈開、打叉'],
  mount: () => K.h('h08', ['抗體讓病菌', '<b class="o">更快被擊退</b>'], { y: 310, size: 96 }) +
    `<div class="cd" id="ac08" style="left:780px;top:250px;width:330px;height:420px;padding:34px;text-align:center;transform:rotate(-3deg)"><div class="k">ANTIBODY</div><div class="ic" style="width:200px;height:200px;margin:20px auto 10px">${K.ic('Antibody')}</div><div class="t">抗體</div><div class="pl b" style="position:static;margin-top:12px;font-size:28px;padding:10px 22px">防衛部隊</div></div>` +
    `<div class="abs" id="ring08" style="left:1220px;top:380px;width:500px;height:500px;border-radius:50%;border:6px dashed var(--blue)"></div>` +
    `<div class="ico" id="v08" style="left:1960px;top:560px;width:150px;height:150px">${K.ic('Virus')}</div><div class="x" id="x08" style="left:1790px;top:580px"></div>`,
  init() { K.hideLines('h08', 2); gsap.set('#ac08', { opacity: 0, rotateY: -90 }); gsap.set('#ring08', { scale: .3, opacity: 0 }); gsap.set('#x08', { opacity: 0, scale: .4 }); },
  animate(S) {
    S.to(['#h070', '#h071'], { yPercent: -110, duration: .5, ease: 'power3.in' }, S.at(0), '舊大標往上收起');
    K.lines(S, 'h08', 2, S.at(0) + .4, '大標換成「抗體讓病菌／更快被擊退」');
    S.to(['#ps07', '#sc07', '#p07'], { opacity: 0, duration: .3 }, S.at(0));
    S.to('#ps07', { rotateY: 90, duration: .3 }, S.at(0), '通緝海報翻面');
    S.to('#ac08', { opacity: 1, rotateY: 0, duration: .45, ease: 'back.out(1.6)' }, S.at(0) + .3, '翻成抗體卡「防衛部隊」');
    S.sfx(S.at(0), 'flip', '翻面：「啪」');
    S.to('#ring08', { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.4)' }, S.word('防衛部隊', 0, -.2), '狗身邊出現藍色防護圈');
    S.sfx(S.word('防衛部隊', 0, -.2), 'pop-card', '防護圈：「啵」');
    S.to('#ab070', { left: 1240, top: 420, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    S.to('#ab071', { left: 1600, top: 400, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    S.to('#ab072', { left: 1620, top: 720, rotate: 0, duration: .6 }, S.word('防衛部隊', 0, -.2));
    S.to('#v08', { left: 1720, duration: .7, ease: 'power2.in' }, S.word('真正的病菌'), '真的病菌從右邊衝過來');
    S.sfx(S.word('真正的病菌'), 'whoosh', '病菌衝過來：「咻」');
    S.to('#v08', { left: 1830, rotate: 60, duration: .5, ease: 'power2.out' }, S.word('真正的病菌', 0, .7), '撞到防護圈被彈開');
    S.sfx(S.word('真正的病菌', 0, .7), 'shake', '彈開：喀喀');
    S.to('#x08', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('更快'), '病菌被打叉');
    S.to('#v08', { opacity: .35, duration: .3 }, S.word('更快'));
    S.sfx(S.word('更快'), 'tick', '擊退：「叮咚」');
  },
});
