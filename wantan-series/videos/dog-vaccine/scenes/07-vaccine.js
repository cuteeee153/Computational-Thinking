// 幕 07–08｜觀念一：針筒打進黑柴身體（哭哭）→ 身體認識病菌（通緝海報、掃描虛線）→ 一個個產生抗體；
// 08：海報翻成「抗體＝防衛部隊」卡，大標換成「抗體讓病菌更快被擊退」，真的病菌衝過來被防護圈彈開。
K.scene('07', 0, {
  enter: 'wipe',
  visuals: ['小標「觀念一」；大標「疫苗讓身體」／「先認識病菌」（橘）', '右邊笑著的黑柴；針筒飛過來，針頭對準牠的背打進去', '中間一張白色通緝海報「病菌」，一條藍色虛線箭頭從海報指向狗（身體在認識病菌）', '產生抗體時海報消失，三個 Y 字抗體一個接一個在狗身邊冒出來，橘色標籤「抗體」'],
  mount: () => K.kicker('k07', '00', '觀念一｜疫苗和抗體', { y: 250 }) + K.h('h07', ['疫苗讓身體', '<b class="o">先認識病菌</b>'], { y: 310, size: 96 }) +
    K.dog('happy', { id: 'dg07', x: 1290, y: 330, w: 400 }) +
    `<div class="ico" id="sy07" style="left:1760px;top:400px;width:200px;height:200px">${K.ic('Syringe')}</div>` +
    `<div class="cd" id="ps07" style="left:780px;top:250px;width:330px;height:420px;padding:34px;text-align:center;transform:rotate(-3deg)"><div class="k">WANTED</div><div class="ic" style="width:210px;height:210px;margin:20px auto 10px">${K.ic('Virus')}</div><div class="t">病菌</div></div>` +
    `<svg class="abs" id="sc07" style="left:0;top:0;overflow:visible" width="1920" height="1080"><path id="sc07p" d="M1115 430 C 1190 390, 1260 390, 1330 440" fill="none" stroke="#2E6BD8" stroke-width="5" stroke-dasharray="12 10" stroke-linecap="round"/><path d="M1310 418 L1334 443 L1302 452" fill="none" stroke="#2E6BD8" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>` +
    [[1180, 620, -20], [1660, 300, 18], [1690, 700, 30]].map(([x, y, r], k) => `<div class="ico" id="ab07${k}" style="left:${x}px;top:${y}px;width:120px;height:120px;transform:rotate(${r}deg)">${K.ic('Antibody')}</div>`).join('') +
    `<div class="pl o" id="p07" style="left:1440px;top:230px">抗體</div>`,
  init() { K.hideLines('h07', 2); gsap.set('#ps07', { opacity: 0, rotate: -18, y: 60 }); gsap.set('#dg07', { opacity: 0 }); gsap.set('#sy07', { opacity: 0 }); gsap.set('#sc07', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k07', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h07', 2, S.word('疫苗的作用'), '大標「疫苗讓身體／先認識病菌」');
    S.to('#dg07', { opacity: 1, duration: .5 }, S.at(0) + .3, '右邊出現黑柴');
    const ti = S.word('疫苗的作用');
    gsap.set('#sy07', { rotate: 75 });
    S.to('#sy07', { opacity: 1, left: 1600, top: 600, duration: .7, ease: 'power2.out' }, ti, '針筒飛過來，針頭對準黑柴的背打進去');
    S.sfx(ti, 'whoosh', '針筒飛過來：「咻」', { gain: .6 });
    S.to('#dg07', { x: -10, duration: .07, yoyo: true, repeat: 5 }, ti + .7, '黑柴笑著抖一下');
    S.sfx(ti + .7, 'pop-low', '打進去：低音啵');
    S.to('#sy07', { opacity: 0, left: 1720, top: 280, duration: .5 }, ti + 1.4);
    S.to('#ps07', { opacity: 1, rotate: -3, y: 0, duration: .7, ease: 'back.out(1.6)' }, S.word('認識', 0, -.2), '通緝海報「病菌」甩進來');
    S.sfx(S.word('認識', 0, -.2), 'flip', '海報：「啪」');
    S.to('#sc07', { opacity: 1, duration: .2 }, S.word('某種病菌'), '藍色虛線箭頭從海報指向狗：身體在認識病菌');
    S.fromTo('#sc07p', { strokeDashoffset: 300 }, { strokeDashoffset: 0, duration: 1.2, ease: 'none' }, S.word('某種病菌'));
    S.sfx(S.word('某種病菌'), 'marker', '掃描：「唰」', { gain: .6 });
    const ta = S.word('產生', 0, .1);
    S.to(['#ps07', '#sc07'], { opacity: 0, scale: .8, duration: .35 }, ta - .1, '產生抗體時，病菌海報和虛線消失');
    K.pop(S, ['#ab070', '#ab071', '#ab072'], ta, '身體一個接一個產生抗體', { stagger: .35 });
    K.pop(S, '#p07', ta, '念到「產生」：「抗體」橘色標籤', { sfx: 'ding-soft' });
  },
});
K.scene('08', 0, {
  enter: 'none',
  visuals: ['（接續）大標換成「抗體讓病菌」／「更快被擊退」（橘）', '念到「防衛部隊」：狗身邊出現藍色虛線防護圈，圍著狗的抗體變成盾牌，藍色標籤「防衛部隊」', '一隻真的病菌從右邊衝過來，撞到防護圈被彈開、打叉'],
  mount: () => K.h('h08', ['抗體讓病菌', '<b class="o">更快被擊退</b>'], { y: 310, size: 96 }) +
    [[1250, 420], [1610, 400], [1630, 720]].map(([x, y], k) => `<div class="ico" id="sh08${k}" style="left:${x}px;top:${y}px;width:120px;height:120px;z-index:2">${K.ic('Shield')}</div>`).join('') +
    `<div class="pl b" id="p08" style="left:1360px;top:240px">防衛部隊</div>` +
    `<div class="abs" id="ring08" style="left:1220px;top:380px;width:500px;height:500px;border-radius:50%;border:6px dashed var(--blue)"></div>` +
    `<div class="ico" id="v08" style="left:1960px;top:560px;width:150px;height:150px">${K.ic('Virus')}</div><div class="x" id="x08" style="left:1790px;top:580px"></div>`,
  init() { K.hideLines('h08', 2); gsap.set(['#sh080', '#sh081', '#sh082'], { opacity: 0, scale: .3 }); gsap.set('#p08', { opacity: 0 }); gsap.set('#ring08', { scale: .3, opacity: 0 }); gsap.set('#x08', { opacity: 0, scale: .4 }); },
  animate(S) {
    S.to(['#h070', '#h071'], { yPercent: -110, duration: .5, ease: 'power3.in' }, S.at(0), '舊大標往上收起');
    K.lines(S, 'h08', 2, S.at(0) + .4, '大標換成「抗體讓病菌／更快被擊退」');
    S.to('#p07', { opacity: 0, duration: .3 }, S.at(0));
    S.to('#ring08', { scale: 1, opacity: 1, duration: .7, ease: 'back.out(1.4)' }, S.word('防衛部隊', 0, -.2), '狗身邊出現藍色防護圈');
    S.sfx(S.word('防衛部隊', 0, -.2), 'pop-card', '防護圈：「啵」');
    const tf = S.word('防衛部隊', 0, -.1);
    S.to('#ab070', { left: 1250, top: 420, rotate: 0, duration: .5 }, tf - .1);
    S.to('#ab071', { left: 1610, top: 400, rotate: 0, duration: .5 }, tf - .1);
    S.to('#ab072', { left: 1630, top: 720, rotate: 0, duration: .5 }, tf - .1);
    S.to(['#ab070', '#ab071', '#ab072'], { opacity: 0, scale: .3, duration: .3 }, tf + .4, '念到「防衛部隊」：圍著狗的抗體變成盾牌');
    S.to(['#sh080', '#sh081', '#sh082'], { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)', stagger: .1 }, tf + .55);
    S.sfx(tf + .55, 'pop-card', '變成盾牌：「啵」');
    S.to('#p08', { opacity: 1, duration: .3 }, tf + .6);
    S.to('#v08', { left: 1720, duration: .7, ease: 'power2.in' }, S.word('真正的病菌'), '真的病菌從右邊衝過來');
    S.sfx(S.word('真正的病菌'), 'whoosh', '病菌衝過來：「咻」');
    S.to('#v08', { left: 1830, rotate: 60, duration: .5, ease: 'power2.out' }, S.word('真正的病菌', 0, .7), '撞到防護圈被彈開');
    S.sfx(S.word('真正的病菌', 0, .7), 'shake', '彈開：喀喀');
    S.to('#x08', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('更快'), '病菌被打叉');
    S.to('#v08', { opacity: .35, duration: .3 }, S.word('更快'));
    S.sfx(S.word('更快'), 'tick', '擊退：「叮咚」');
  },
});
