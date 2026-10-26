// 幕 02–04｜今天的路線：一條路上五個站（基本觀念 → 四種疾病 → 法律規定 → 看懂幾合一 → 施打時程），黑柴沿路走到念到的那一站。
const ST = [
  { x: 330, ic: 'Syringe', t: '基本觀念' }, { x: 650, ic: 'Virus', t: '四種疾病' }, { x: 970, ic: 'Gavel', t: '法律規定' },
  { x: 1290, ic: 'VaccineBook', t: '看懂幾合一' }, { x: 1610, ic: 'Calendar', t: '施打時程' },
];
K.ROUTE_Y = 560;
K.walk = (S, x, t, label) => {
  S.to('#dg02', { left: x - 250, duration: 1.1, ease: 'power2.inOut' }, t, label);
  S.to('#dg02', { y: -14, duration: .18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t);
  S.sfx(t, 'whoosh', '黑柴走到下一站：「咻」', { gain: .5 });
};
K.station = (S, k, t, label) => {
  K.pop(S, '#st02' + k, t, label, { sfx: 'pop-card', pitch: 1 + k * .06 });
  K.rise(S, '#sl02' + k, t + .15, '', { sfx: false, dy: 20 });
};
K.scene('02', -1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；上方橘色小標「今天的路線」、大標「從最基本的觀念開始」', '一條虛線路，五個站：00 基本觀念、01 四種疾病、02 法律規定、03 看懂幾合一、04 施打時程（白色圖示磚＋站名）', '黑柴（側站）從左邊出發，走到第一站「基本觀念」', '第一站下方依序出現三個小標籤：疫苗是什麼、每隻都建議打的疫苗、疫苗 vs 預防藥'],
  mount: () => `<div class="eyebrow abs" id="k02" style="left:140px;top:170px;font-size:26px">今天的路線</div>` + K.h('h02', ['從最基本的觀念開始'], { y: 220, size: 72 }) +
    `<svg class="abs" style="left:0;top:0" width="1920" height="1080"><path id="rd02" d="M150 ${K.ROUTE_Y + 40} C 500 ${K.ROUTE_Y - 20}, 800 ${K.ROUTE_Y + 90}, 1150 ${K.ROUTE_Y + 30} S 1650 ${K.ROUTE_Y + 10}, 1800 ${K.ROUTE_Y + 40}" fill="none" stroke="#C9D6E8" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round" pathLength="1000"/></svg>` +
    ST.map((s, k) => K.tile(s.ic, { id: 'st02' + k, x: s.x - 75, y: K.ROUTE_Y - 200 }) +
      `<div class="abs" id="sl02${k}" style="left:${s.x - 150}px;top:${K.ROUTE_Y + 90}px;width:300px;text-align:center;font-size:32px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:8px">0${k}</span>${s.t}</div>`).join('') +
    K.dog('stand-side', { id: 'dg02', x: 0, y: K.ROUTE_Y - 150, w: 190, flip: true }) +
    ['疫苗是什麼', '每隻都建議打的疫苗', '疫苗 vs 預防藥'].map((t, k) => `<div class="pl ot" id="c02${k}" style="left:${200}px;top:${K.ROUTE_Y + 160 + k * 74}px;font-size:26px;padding:10px 24px">${t}</div>`).join(''),
  init() { K.hideLines('h02', 1); gsap.set('#rd02', { strokeDashoffset: 1000 }); gsap.set('#dg02', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k02', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h02', 1, S.at(0), '大標冒出');
    S.to('#rd02', { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, S.at(0) + .3, '虛線路由左往右畫出來');
    S.sfx(S.at(0) + .3, 'draw', '畫出路線：筆刷聲', { dur: 1.2, gain: .5 });
    ST.forEach((s, k) => { gsap.set(['#st02' + k, '#sl02' + k], { opacity: 0 }); S.to(['#st02' + k, '#sl02' + k], { opacity: .25, duration: .4 }, S.at(0) + .6 + k * .12); });
    S.to('#dg02', { opacity: 1, duration: .4 }, S.at(0) + .8);
    K.walk(S, ST[0].x, S.word('三個基本觀念', 0, -.6), '黑柴走到第一站');
    K.station(S, 0, S.word('三個基本觀念'), '第一站「基本觀念」亮起');
    K.rise(S, '#c020', S.word('疫苗是什麼'), '三個小標籤依序出現', { dy: 20 });
    K.rise(S, '#c021', S.word('哪些疫苗'), '', { dy: 20 });
    K.rise(S, '#c022', S.word('預防藥'), '', { dy: 20 });
  },
});
K.scene('03', -1, {
  enter: 'none',
  visuals: ['（接續路線圖）念到時黑柴依序走到第二站「四種疾病」、第三站「法律規定」、第四站「看懂幾合一」，每站亮起'],
  animate(S) {
    [['四種疾病', 1], ['狂犬病疫苗規定', 2], ['五合一', 3]].forEach(([w, k]) => {
      K.walk(S, ST[k].x, S.word(w, 0, -.9), k === 1 ? '黑柴依序走到念到的那一站' : '');
      K.station(S, k, S.word(w, 0, .1), k === 1 ? '念到的那一站亮起' : '');
    });
  },
});
K.scene('04', -1, {
  enter: 'none',
  visuals: ['（接續路線圖）黑柴走到最後一站「施打時程」，下方出現兩個小標籤：哪些要補打、多久補打一次'],
  mount: () => ['哪些要補打', '多久補打一次'].map((t, k) => `<div class="pl ot" id="c04${k}" style="left:${1500}px;top:${K.ROUTE_Y + 160 + k * 74}px;font-size:26px;padding:10px 24px">${t}</div>`).join(''),
  animate(S) {
    K.walk(S, ST[4].x, S.word('施打時程', 0, -.9), '黑柴走到最後一站');
    K.station(S, 4, S.word('施打時程', 0, .1), '「施打時程」亮起');
    K.rise(S, '#c040', S.word('補打'), '兩個小標籤出現', { dy: 20 });
    K.rise(S, '#c041', S.word('多久'), '', { dy: 20 });
  },
});
