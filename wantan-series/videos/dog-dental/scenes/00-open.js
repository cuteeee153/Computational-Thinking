// 這支影片共用的小工具＋幕 00–04 開場。
K.CHAPTERS = ['牙菌斑和牙結石', 'VOHC 認證', '每天刷牙', '輔助產品', '看獸醫', '重點整理'];

// 黏土黑柴：製作人九格圖的新姿勢（刷牙、啃潔牙骨、喝水、拿口鏡、吃飼料、露齒笑…）還沒去背前，先用現有的姿勢頂替。
// 去背好的圖放進 assets/dogs/clay/ 之後，把這裡對應的那一行刪掉就會換成新圖。
K.POSE = {
  brush: 'yawn',      // 被刷牙（嘴巴張開）
  chew: 'ball',       // 啃潔牙骨
  drink: 'stand-side',// 喝水（藍色水碗另外放圖示）
  mirror: 'tilt',     // 拿著口鏡
  tools: 'wave',      // 兩手拿口鏡和探針
  eat: 'food',        // 吃飼料（狗碗入鏡）
  smile: 'happy',     // 坐著微笑
  grin: 'happy',      // 露出整排牙齒笑
};
K.d = (pose, o) => K.dog(K.POSE[pose] || pose, o);

// 白色橫條卡：左邊圖示、標題＋一行說明（o.n 編號、o.ic 圖示、o.w 寬、o.h 高、o.ts 標題字級）
K.bar = (id, o) => `<div class="cd" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w || 1000}px;height:${o.h || 130}px;padding:0 40px;display:flex;align-items:center;gap:30px">` +
  (o.n ? `<span class="big" style="font-size:64px;color:var(--or);width:50px;flex:none">${o.n}</span>` : '') +
  (o.ic ? `<div style="width:${(o.h || 130) - 40}px;height:${(o.h || 130) - 40}px;flex:none">${K.ic(o.ic)}</div>` : '') +
  `<div style="flex:1;min-width:0"><div class="t" style="font-size:${o.ts || 40}px;white-space:nowrap">${o.t}</div>${o.d ? `<div class="d" style="font-size:${o.ds || 27}px;margin-top:4px;white-space:nowrap">${o.d}</div>` : ''}</div>` +
  (o.tail || '') + `</div>`;
// 直式卡：上面圖示、標題、一行說明
K.vcard = (id, o) => `<div class="cd" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w || 400}px;height:${o.h || 420}px;padding:40px 30px;text-align:center">` +
  (o.n ? `<div class="k" style="margin-bottom:6px">${o.n}</div>` : '') +
  `<div class="ic" style="margin:0 auto;width:${o.is || 150}px;height:${o.is || 150}px">${K.ic(o.ic)}</div><div class="t" style="margin-top:22px;font-size:${o.ts || 40}px">${o.t}</div>${o.d ? `<div class="d" style="font-size:${o.ds || 26}px">${o.d}</div>` : ''}</div>`;
K.icon = (id, name, x, y, s, o = {}) => `<div class="ico" id="${id}" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px${o.style ? ';' + o.style : ''}">${K.ic(name)}</div>`;
K.pill = (id, text, x, y, cls = '', o = {}) => `<div class="pl ${cls}" id="${id}" style="left:${x}px;top:${y}px${o.fs ? `;font-size:${o.fs}px` : ''}${o.style ? ';' + o.style : ''}">${text}</div>`;
// 結論：橘色大字一行
K.concl = (id, html, o = {}) => `<div class="abs concl" id="${id}" style="left:${o.x ?? 140}px;top:${o.y ?? 830}px;font-size:${o.size || 54}px${o.center ? ';width:1640px;text-align:center' : ''}">${html}</div>`;
K.showConcl = (S, sel, t, label) => { K.rise(S, sel, t, label, { sfx: false, dy: 30 }); S.sfx(t, 'tick', `${label.replace(/：.*/, '')}：「叮咚」`); };
// 章節卡：STEP 0N＋兩行大標（第二行橘）
K.chap = (id, step, lines, o = {}) => K.kicker('k' + id, `STEP 0${step}`, o.kick || `第${'一二三四五'[step - 1]}步`, { y: o.ky ?? 230 }) + K.h('h' + id, lines, { y: o.y ?? 290, size: o.size || 96 });
K.chapIn = (S, id, t, n = 2) => {
  S.fromTo('#k' + id, { opacity: 0 }, { opacity: 1, duration: .4 }, t);
  K.lines(S, 'h' + id, n, t + .15, '章節大標冒出');
  S.sfx(t, 'chime', '新章節：叮鈴');
};
K.dogIn = (S, sel, t, label = '黑柴跳出來') => {
  S.fromTo(sel, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.7)' }, t, label);
  S.sfx(t, 'boing', '黑柴：小彈簧');
};
// 舊大標往上收起、新大標冒出
K.swapH = (S, from, n1, to, n2, t, label) => {
  S.to(Array.from({ length: n1 }, (_, k) => '#' + from + k), { yPercent: -110, duration: .45, ease: 'power3.in' }, t);
  K.lines(S, to, n2, t + .35, label);
};

// ---------- 幕 00｜片名 ----------
K.scene('00', -1, {
  enter: 'cut', bg: 'mint',
  visuals: ['淡綠底；大標「狗狗潔牙骨、牙膏、潔牙水」／「真的有用嗎？」（橘）', '下方三塊圖示磚：潔牙骨、牙膏、潔牙水', '念到「VOHC 認證」：橘色標籤「先看有沒有 VOHC 認證！」；右邊露齒笑的黑柴'],
  mount: () => K.h('h00', ['狗狗潔牙骨、牙膏、潔牙水', '<b class="o">真的有用嗎？</b>'], { y: 230, size: 96 }) +
    [['DentalBone', '潔牙骨'], ['Toothpaste', '牙膏'], ['Water', '潔牙水']].map(([ic, t], k) => K.tile(ic, { id: 't00' + k, x: 140 + k * 200, y: 560 }) +
      `<div class="abs" id="l00${k}" style="left:${140 + k * 200 - 25}px;top:725px;width:200px;text-align:center;font-size:28px;font-weight:700">${t}</div>`).join('') +
    K.pill('p00', '先看有沒有 VOHC 認證！', 760, 600, 'o', { fs: 40 }) +
    K.d('grin', { id: 'dg00', x: 1420, y: 270, w: 310 }),
  init() { K.hideLines('h00', 2); },
  animate(S) {
    K.lines(S, 'h00', 2, S.at(0), '大標「狗狗潔牙骨、牙膏、潔牙水／真的有用嗎？」');
    [0, 1, 2].forEach(k => K.pop(S, ['#t00' + k, '#l00' + k], S.word(['潔牙骨', '牙膏', '潔牙水'][k], 0, -.1), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1 }));
    K.dogIn(S, '#dg00', S.at(0) + .4, '右邊露齒笑的黑柴跳出來');
    K.pop(S, '#p00', S.word('VOHC', 0, -.2), '橘色標籤「先看有沒有 VOHC 認證！」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 01｜買了一堆潔牙產品 → 天天吃潔牙骨，牙齒還是黃黃的、口臭 ----------
const PROD01 = [['DentalBone', 1080, 300], ['Toothpaste', 1300, 250], ['Powder', 1520, 320], ['Spray', 1180, 520], ['Wipe', 1420, 540]];
K.scene('01', -1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「買了一堆潔牙產品，」／「真的有用嗎？」（橘），右邊一堆潔牙產品圖示（潔牙骨、牙膏、潔牙粉、噴劑、濕紙巾）', '念到「你以為」：大標換成「天天吃潔牙骨，」／「牙齒就會越來越乾淨？」，產品退場，啃潔牙骨的黑柴出現', '黑柴下方一週七天的小潔牙骨依序亮起（天天吃）', '念到「黃黃的」：旁邊冒出黃褐色牙結石的牙齒，藍色手寫標註「還是黃黃的」；念到「口臭」：口臭圖示彈出'],
  mount: () => K.h('h01a', ['買了一堆潔牙產品，', '<b class="o">真的有用嗎？</b>'], { y: 330, size: 92 }) +
    PROD01.map(([ic, x, y], k) => K.tile(ic, { id: 't01' + k, x, y, size: 170 })).join('') +
    K.h('h01b', ['天天吃潔牙骨，', '<b class="o">牙齒就會越來越乾淨？</b>'], { y: 230, size: 88 }) +
    `<div class="abs" id="wk01" style="left:140px;top:560px;display:flex;gap:16px">${'一二三四五六日'.split('').map((d, k) => `<div class="cd" id="wd01${k}" style="position:relative;width:110px;height:140px;padding:14px 0;text-align:center"><div style="font-size:24px;font-weight:700;color:#9A9590">${d}</div><div style="width:70px;height:70px;margin:8px auto 0">${K.ic('DentalBone')}</div></div>`).join('')}</div>` +
    K.d('chew', { id: 'dg01', x: 1100, y: 400, w: 380 }) +
    K.icon('tt01', 'Tartar', 1600, 250, 200) + K.anno('an01', '', '還是黃黃的', { x: 1590, y: 465, ss: 38 }) +
    K.icon('br01', 'Breath', 1620, 570, 170) + K.pill('pb01', '口臭', 1650, 750, 'ot', { fs: 30 }),
  init() { K.hideLines('h01a', 2); K.hideLines('h01b', 2); gsap.set(['#dg01', '#tt01', '#an01', '#br01', '#pb01'], { opacity: 0 }); gsap.set('#wk01 .cd', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h01a', 2, S.at(0), '大標「買了一堆潔牙產品，真的有用嗎？」');
    K.pop(S, PROD01.map((_, k) => '#t01' + k), S.at(0) + .3, '右邊一堆潔牙產品依序彈出', { stagger: .12 });
    const t = S.word('你以為', 0, -.2);
    S.to(PROD01.map((_, k) => '#t01' + k), { opacity: 0, scale: .6, duration: .35, stagger: .05 }, t, '產品退場');
    K.swapH(S, 'h01a', 2, 'h01b', 2, t, '大標換成「天天吃潔牙骨，牙齒就會越來越乾淨？」');
    K.dogIn(S, '#dg01', t + .4, '啃潔牙骨的黑柴出現');
    S.to('#wk01 .cd', { opacity: 1, duration: .3, stagger: .12 }, S.word('每天', 0, -.1), '一週七天的小潔牙骨依序亮起');
    S.sfx(S.word('每天', 0, -.1), 'pop', '七天：連續「啵」', { gain: .6 });
    K.pop(S, '#tt01', S.word('黃黃的', 0, -.3), '黃褐色牙結石的牙齒冒出來', { sfx: 'pop-low' });
    K.fadeIn(S, '#an01', S.word('黃黃的'), '藍色手寫標註「還是黃黃的」');
    K.pop(S, ['#br01', '#pb01'], S.word('口臭', 0, -.2), '口臭圖示彈出', { stagger: .1, sfx: 'pop-low' });
  },
});

// ---------- 幕 02｜不是買不夠多，是沒挑對 ----------
K.scene('02', -1, {
  enter: 'rise',
  visuals: ['兩張大卡：左「買得不夠多」（灰、被打叉），右「還沒挑對方式」（橘框）', '歪頭的黑柴'],
  mount: () => K.vcard('c020', { x: 200, y: 260, w: 560, h: 460, ic: 'Coins', t: '買得不夠多', d: '再多買幾樣？' }) + `<div class="x" id="x02" style="left:640px;top:250px"></div>` +
    K.vcard('c021', { x: 860, y: 260, w: 560, h: 460, ic: 'Magnifier', t: '<span class="o">還沒挑對方式</span>', d: '先學會怎麼挑' }) +
    K.d('mirror', { id: 'dg02', x: 1500, y: 380, w: 330 }),
  init() { gsap.set(['#c020', '#c021', '#x02', '#dg02'], { opacity: 0 }); },
  animate(S) {
    K.rise(S, '#c020', S.word('買得不夠多', 0, -.4), '左卡「買得不夠多」浮上', { sfx: 'pop-card' });
    S.to('#x02', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('而是', 0, -.1), '左卡被打叉、變淡');
    S.to('#c020', { opacity: .45, duration: .3 }, S.word('而是', 0, -.1));
    S.sfx(S.word('而是', 0, -.1), 'shake', '打叉：喀喀');
    K.rise(S, '#c021', S.word('挑對方式', 0, -.3), '右卡「還沒挑對方式」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c021', S.word('挑對方式'));
    K.dogIn(S, '#dg02', S.word('挑對方式', 0, .2), '歪頭的黑柴');
  },
});

// ---------- 幕 03–04｜今天的路線：五站（牙菌斑 → VOHC → 刷牙 → 輔助產品 → 看獸醫），黑柴沿路走 ----------
const ST03 = [
  { x: 330, ic: 'Plaque', t: '牙菌斑和牙結石' }, { x: 650, ic: 'Seal', t: 'VOHC 認證' }, { x: 970, ic: 'Toothbrush', t: '每天刷牙' },
  { x: 1290, ic: 'DentalBone', t: '輔助產品' }, { x: 1610, ic: 'Clinic', t: '看獸醫' },
];
const RY = 560;
K.walk03 = (S, x, t, label) => {
  S.to('#dg03', { left: x - 250, duration: 1.1, ease: 'power2.inOut' }, t, label);
  S.to('#dg03', { y: -14, duration: .18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t);
  S.sfx(t, 'whoosh', '黑柴走到下一站：「咻」', { gain: .5 });
};
K.st03 = (S, k, t, label) => { K.pop(S, '#st03' + k, t, label, { sfx: 'pop-card', pitch: 1 + k * .06 }); K.rise(S, '#sl03' + k, t + .15, '', { sfx: false, dy: 20 }); };
K.scene('03', -1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「今天的路線」、大標「從最重要的判斷標準開始」', '一條虛線路，五個站：01 牙菌斑和牙結石、02 VOHC 認證、03 每天刷牙、04 輔助產品、05 看獸醫（白色圖示磚＋站名）', '黑柴（側站）從左邊出發，念到哪一站走到哪一站，那一站亮起'],
  mount: () => `<div class="eyebrow abs" id="k03" style="left:140px;top:170px;font-size:26px">今天的路線</div>` + K.h('h03', ['從最重要的<b class="o">判斷標準</b>開始'], { y: 220, size: 72 }) +
    `<svg class="abs" style="left:0;top:0" width="1920" height="1080"><path id="rd03" d="M150 ${RY + 40} C 500 ${RY - 20}, 800 ${RY + 90}, 1150 ${RY + 30} S 1650 ${RY + 10}, 1800 ${RY + 40}" fill="none" stroke="#C9D6E8" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round" pathLength="1000"/></svg>` +
    ST03.map((s, k) => K.tile(s.ic, { id: 'st03' + k, x: s.x - 75, y: RY - 200 }) +
      `<div class="abs" id="sl03${k}" style="left:${s.x - 160}px;top:${RY + 90}px;width:320px;text-align:center;font-size:32px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:8px">0${k + 1}</span>${s.t}</div>`).join('') +
    K.dog('stand-side', { id: 'dg03', x: 0, y: RY - 150, w: 190, flip: true }),
  init() { K.hideLines('h03', 1); gsap.set('#rd03', { strokeDashoffset: 1000 }); gsap.set('#dg03', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k03', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h03', 1, S.at(0), '大標「從最重要的判斷標準開始」');
    S.to('#rd03', { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, S.at(0) + .3, '虛線路由左往右畫出來');
    S.sfx(S.at(0) + .3, 'draw', '畫出路線：筆刷聲', { dur: 1.2, gain: .5 });
    ST03.forEach((s, k) => { gsap.set(['#st03' + k, '#sl03' + k], { opacity: 0 }); S.to(['#st03' + k, '#sl03' + k], { opacity: .25, duration: .4 }, S.at(0) + .6 + k * .12); });
    S.to('#dg03', { opacity: 1, duration: .4 }, S.at(0) + .8);
    [['判斷標準', 0], ['VOHC', 1], ['刷牙', 2], ['潔牙骨', 3]].forEach(([w, k]) => {
      K.walk03(S, ST03[k].x, S.word(w, 0, -.9), k ? '' : '黑柴依序走到念到的那一站');
      K.st03(S, k, S.word(w, 0, .1), k ? '' : '念到的那一站亮起');
    });
  },
});
K.scene('04', -1, {
  enter: 'none',
  visuals: ['（接續路線圖）念到「看獸醫」：黑柴走到最後一站「看獸醫」', '念到「那我們就開始吧」：五站一起亮橘框'],
  animate(S) {
    K.walk03(S, ST03[4].x, S.word('看獸醫', 0, -1), '黑柴走到最後一站');
    K.st03(S, 4, S.word('看獸醫', 0, .1), '「看獸醫」亮起');
    const t = S.word('開始吧', 0, -.3);
    S.to(ST03.map((_, k) => '#st03' + k), { boxShadow: K.RING, duration: .3, stagger: .08 }, t, '念到「那我們就開始吧」：五站一起亮橘框');
    S.sfx(t, 'ding-soft', '出發：輕「叮」');
  },
});
