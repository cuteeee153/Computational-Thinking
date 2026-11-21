// 這支影片共用的小工具＋幕 00–04 開場。
K.CHAPTERS = ['基本觀念', '先看四件事', '乾糧濕糧鮮食', '幼犬到老犬', '餵食和零食', '廣告詞', '重點整理'];
K.NAV_FROM = 0;   // 基本觀念＝0，第一步＝1…（和 STEP 編號一致）

// 白色橫條卡：左邊圖示、標題＋一行說明（o.n 編號、o.ic 圖示、o.w 寬、o.h 高、o.ts 標題字級、o.tail 右邊附加）
K.bar = (id, o) => `<div class="cd" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w || 1000}px;height:${o.h || 130}px;padding:0 40px;display:flex;align-items:center;gap:30px">` +
  (o.n ? `<span class="big" style="font-size:64px;color:var(--or);width:50px;flex:none">${o.n}</span>` : '') +
  (o.ic ? `<div style="width:${(o.h || 130) - 40}px;height:${(o.h || 130) - 40}px;flex:none">${K.ic(o.ic)}</div>` : '') +
  `<div style="flex:1;min-width:0"><div class="t" style="font-size:${o.ts || 40}px;white-space:nowrap">${o.t}</div>${o.d ? `<div class="d" style="font-size:${o.ds || 27}px;margin-top:4px;white-space:nowrap">${o.d}</div>` : ''}</div>` +
  (o.tail || '') + `</div>`;
// 直式卡：上面圖示、標題、一行說明
K.vcard = (id, o) => `<div class="cd" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w || 400}px;height:${o.h || 420}px;padding:40px 30px;text-align:center">` +
  (o.n ? `<div class="k" style="margin-bottom:6px">${o.n}</div>` : '') +
  `<div class="ic" style="margin:0 auto;width:${o.is || 150}px;height:${o.is || 150}px">${o.img || K.ic(o.ic)}</div><div class="t" style="margin-top:22px;font-size:${o.ts || 40}px">${o.t}</div>${o.d ? `<div class="d" style="font-size:${o.ds || 26}px">${o.d}</div>` : ''}</div>`;
K.icon = (id, name, x, y, s, o = {}) => `<div class="ico" id="${id}" style="left:${x}px;top:${y}px;width:${s}px;height:${s}px${o.style ? ';' + o.style : ''}">${K.ic(name)}</div>`;
K.pill = (id, text, x, y, cls = '', o = {}) => `<div class="pl ${cls}" id="${id}" style="left:${x}px;top:${y}px${o.fs ? `;font-size:${o.fs}px` : ''}${o.style ? ';' + o.style : ''}">${text}</div>`;
// 圖示＋文字的標籤（圖示在左）
K.ipill = (id, ic, text, x, y, cls = '', o = {}) => K.pill(id, K.ic(ic) + text, x, y, cls, o);
// 結論：橘色大字（一行；要兩行就放 <br>）
K.concl = (id, html, o = {}) => `<div class="abs concl" id="${id}" style="left:${o.x ?? 140}px;top:${o.y ?? 830}px;font-size:${o.size || 54}px${o.center ? ';width:1640px;text-align:center' : ''}">${html}</div>`;
K.showConcl = (S, sel, t, label) => { K.rise(S, sel, t, label, { sfx: false, dy: 30 }); S.sfx(t, 'tick', `${label.replace(/：.*/, '')}：「叮咚」`); };
// 章節卡：STEP 0N＋兩行大標（第二行橘）
K.KICK = ['基本觀念', '第一步', '第二步', '第三步', '第四步', '第五步'];
K.chap = (id, step, lines, o = {}) => K.kicker('k' + id, `STEP 0${step}`, o.kick || K.KICK[step], { y: o.ky ?? 230 }) + K.h('h' + id, lines, { y: o.y ?? 290, size: o.size || 96 });
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
// 小標（不是章節卡用的）：灰色 Space Mono
K.ey = (id, text, x, y, o = {}) => `<div class="eyebrow abs" id="${id}" style="left:${x}px;top:${y}px;font-size:${o.fs || 26}px">${text}</div>`;
K.eyIn = (S, id, t) => S.fromTo('#' + id, { opacity: 0 }, { opacity: 1, duration: .4 }, t);
// 手機畫面跟著換幕滑上來
K.phoneIn = (S, sel) => { S.to(sel, { y: 0, duration: .8, ease: 'power3.out' }, S.start, '手機畫面跟著換幕滑上來'); S.sfx(S.start, 'whoosh', '手機滑上來：「咻」', { gain: .6 }); };
// 打叉（紅色 X）：o.s 大小
K.xm = (id, x, y, s = 100) => `<div class="x" id="${id}" style="left:${x}px;top:${y}px;transform:scale(${s / 100})"></div>`;
K.xIn = (S, sel, t, label) => {
  gsap.set(sel, { opacity: 0 });
  S.to(sel, { opacity: 1, duration: .25, ease: 'back.out(3)' }, t, label);
  S.sfx(t, 'shake', label ? `${label.replace(/：.*/, '')}：喀喀` : '打叉：喀喀');
};
// 飼料包裝（白色大卡，上面橘色色帶）：inner 放在包裝裡
K.bag = (id, inner, o = {}) => `<div class="cd bag" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w || 560}px;height:${o.h || 700}px">` +
  `<div class="band">${o.title || ''}</div>${inner}</div>`;

// ---------- 幕 00｜片名 ----------
const T00 = [['FoodBag', '乾糧'], ['Can', '濕糧'], ['Fresh', '鮮食']];
K.scene('00', -1, {
  enter: 'cut', bg: 'mint',
  visuals: ['淡綠底；大標「狗飼料怎麼挑」／「才不踩雷？」（橘）', '念到時三塊圖示磚依序彈出：乾糧（飼料袋）、濕糧（罐頭）、鮮食（餐盒）', '念到「幼犬到老犬」：橘色標籤「幼犬到老犬一次看懂！」；右邊吃飯的黑柴'],
  mount: () => K.h('h00', ['狗飼料怎麼挑', '<b class="o">才不踩雷？</b>'], { y: 210, size: 116 }) +
    T00.map(([ic, t], k) => K.tile(ic, { id: 't00' + k, x: 140 + k * 200, y: 560 }) +
      `<div class="abs" id="l00${k}" style="left:${140 + k * 200 - 25}px;top:725px;width:200px;text-align:center;font-size:30px;font-weight:700">${t}</div>`).join('') +
    K.pill('p00', '幼犬到老犬一次看懂！', 780, 600, 'o', { fs: 40 }) +
    K.dog('food', { id: 'dg00', x: 1360, y: 280, w: 400 }),
  init() { K.hideLines('h00', 2); },
  animate(S) {
    K.lines(S, 'h00', 2, S.at(0), '大標「狗飼料怎麼挑，才不踩雷？」');
    T00.forEach(([, t], k) => K.pop(S, ['#t00' + k, '#l00' + k], S.word(t, 0, -.1), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1 }));
    K.dogIn(S, '#dg00', S.at(0) + .4, '右邊吃飯的黑柴跳出來');
    K.pop(S, '#p00', S.word('幼犬到老犬', 0, -.2), '橘色標籤「幼犬到老犬一次看懂！」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 01–01b｜每一包都說自己最好 → 你是不是也有這樣的疑問 → 三個疑問 ----------
const BAG01 = [[1030, 200, 'FoodBag'], [1270, 270, 'FoodBagBlue'], [1510, 200, 'FoodBag'], [1150, 490, 'FoodBagGreen'], [1400, 510, 'FoodBagBlue']];
const Q01 = [
  { ic: 'FoodBag', t: '乾糧、濕糧，還是鮮食？', at: '乾糧' },
  { ic: 'Coins', t: '價格越貴，營養越完整？', at: '價格越貴' },
  { ic: 'Pot', t: '自己煮，要注意什麼？', at: '自己煮' },
];
K.scene('01', -1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「每一包都說自己最好，」／「到底該相信誰？」（橘），右邊五包飼料（兩包橘色、兩包藍色、一包綠色）都冒出對話框「最好！」', '念到「你是不是也有這樣的疑問」：飼料退場，大標下方多一行「你是不是也有這樣的疑問：」'],
  mount: () => K.h('h01a', ['每一包都說自己最好，', '<b class="o">到底該相信誰？</b>'], { y: 160, size: 84 }) +
    BAG01.map(([x, y, ic], k) => K.tile(ic, { id: 't01' + k, x, y, size: 180 }) + `<div class="pl" id="b01${k}" style="left:${x + 120}px;top:${y - 36}px;font-size:26px;padding:8px 18px">最好！</div>`).join('') +
    K.h('h01c', ['你是不是也有這樣的疑問：'], { y: 390, size: 60 }),
  init() { K.hideLines('h01a', 2); K.hideLines('h01c', 1); gsap.set(BAG01.map((_, k) => '#b01' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h01a', 2, S.at(0), '大標「每一包都說自己最好，到底該相信誰？」');
    K.pop(S, BAG01.map((_, k) => '#t01' + k), S.at(0) + .2, '右邊五包飼料依序彈出（兩包橘色、兩包藍色、一包綠色）', { stagger: .1 });
    K.pop(S, BAG01.map((_, k) => '#b01' + k), S.word('最好', 0, -.1), '每一包都冒出對話框「最好！」', { stagger: .1, sfx: 'pop-card' });
    const t = S.word('你是不是', 0, -.3);
    S.to(BAG01.map((_, k) => '#t01' + k).concat(BAG01.map((_, k) => '#b01' + k)), { opacity: 0, scale: .6, duration: .35, stagger: .04 }, t, '飼料退場');
    K.lines(S, 'h01c', 1, t + .2, '大標下方多一行「你是不是也有這樣的疑問：」');
  },
});
K.scene('01b', -1, {
  enter: 'none',
  visuals: ['（接續）念到時三張疑問卡依序浮上、加橘框：乾糧、濕糧，還是鮮食？／價格越貴，營養越完整？／自己煮，要注意什麼？'],
  mount: () => Q01.map((q, k) => K.vcard('q01' + k, { x: 140 + k * 560, y: 520, w: 520, h: 330, n: 'Q' + (k + 1), ic: q.ic, t: q.t, ts: 36, is: 120 })).join(''),
  init() { gsap.set(['#q010', '#q011', '#q012'], { opacity: 0 }); },
  animate(S) {
    Q01.forEach((q, k) => {
      const tk = S.word(q.at, 0, -.2);
      if (k) K.ring(S, '#q01' + (k - 1), tk, false);
      K.rise(S, '#q01' + k, tk, k ? '' : '念到時三張疑問卡依序浮上、加橘框', { sfx: 'pop-card' });
      K.ring(S, '#q01' + k, tk + .2);
    });
  },
});

// ---------- 幕 02｜不用研究每種原料、不用買最貴、不只看品牌價格廣告詞 → 先確認兩件事 ----------
const G02 = [['研究每一種原料', 'Magnifier', 200, 260, 48], ['追求最貴的產品', 'Coins', 900, 260, 48], ['品牌', 'Tag', 260, 480, 42], ['價格', 'Coins', 640, 480, 42], ['廣告詞', 'Chat', 1020, 480, 42]];
K.scene('02', -1, {
  enter: 'rise', bg: 'mint',
  visuals: ['淡綠底；念到時依序出現五個白底橘框標籤（附圖示）：研究每一種原料、追求最貴的產品、品牌、價格、廣告詞', '念到「更重要的是」：五個標籤一起往下掉出畫面，大標「更重要的是」／「先確認這兩件事」（橘）', '念到時兩張打勾卡依序浮上、加橘框：這包飼料的營養完整嗎？／適合我家狗狗現在的年紀嗎？；右邊坐著的黑柴'],
  mount: () => G02.map(([t, ic, x, y, fs], k) => K.ipill('g02' + k, ic, t, x, y, 'ob', { fs, style: 'padding:20px 40px' })).join('') +
    K.h('h02', ['更重要的是', '<b class="o">先確認這兩件事</b>'], { y: 180, size: 88 }) +
    [['Label', '這包飼料的營養完整嗎？'], ['Calendar', '適合我家狗狗現在的年紀嗎？']].map(([ic, t], k) =>
      K.bar('ok02' + k, { x: 140, y: 480 + k * 190, w: 1080, h: 160, ic, t, ts: 44, tail: K.chk() })).join('') +
    K.dog('sit', { id: 'dg02', x: 1400, y: 360, w: 360 }),
  init() { K.hideLines('h02', 2); gsap.set(['#ok020', '#ok021', '#dg02'], { opacity: 0 }); },
  animate(S) {
    [['研究每一種原料', 0], ['最貴的產品', 1], ['品牌', 2], ['價格', 3], ['廣告詞', 4]].forEach(([w, k]) =>
      K.pop(S, '#g02' + k, S.word(w, 0, -.3), k ? '' : '念到時五個白底橘框標籤依序出現', { sfx: 'pop-card', pitch: 1 + k * .06 }));
    const t = S.word('更重要的是', 0, -.3);
    G02.forEach((_, k) => S.to('#g02' + k, { y: 900, opacity: 0, rotate: [-14, 10, -8, 16, -12][k], duration: .7, ease: 'power2.in' }, t, k ? '' : '五個標籤一起往下掉出畫面'));
    S.sfx(t, 'fall', '掉下去：「咻」');
    K.lines(S, 'h02', 2, t + .5, '大標「更重要的是，先確認這兩件事」');
    K.dogIn(S, '#dg02', t + .8, '坐著的黑柴');
    [['營養完整嗎', 0], ['年紀嗎', 1]].forEach(([w, k]) => {
      const tk = S.word(w, 0, -.6);
      if (k) K.ring(S, '#ok020', tk, false);
      K.rise(S, '#ok02' + k, tk, k ? '' : '念到時兩張打勾卡依序浮上、加橘框', { sfx: 'pop-card' });
      K.ring(S, '#ok02' + k, tk + .2);
    });
  },
});

// ---------- 幕 03–04｜今天的路線：五件事，黑柴沿路走 ----------
const ST03 = [
  { x: 330, ic: 'Label', t: '包裝和廠商資訊' }, { x: 650, ic: 'FoodBag', t: '乾糧、濕糧、鮮食' }, { x: 970, ic: 'Calendar', t: '幼犬到老犬' },
  { x: 1290, ic: 'Jerky', t: '餵幾餐、零食' }, { x: 1610, ic: 'Grain', t: '天然、無穀、頂級' },
];
const RY = 580;
K.walk03 = (S, x, t, label) => {
  S.to('#dg03', { left: x - 250, duration: 1.1, ease: 'power2.inOut' }, t, label);
  S.to('#dg03', { y: -14, duration: .18, yoyo: true, repeat: 5, ease: 'sine.inOut' }, t);
  S.sfx(t, 'whoosh', '黑柴走到下一站：「咻」', { gain: .5 });
};
K.st03 = (S, k, t, label) => { K.pop(S, '#st03' + k, t, label, { sfx: 'pop-card', pitch: 1 + k * .06 }); K.rise(S, '#sl03' + k, t + .15, '', { sfx: false, dy: 20 }); };
K.scene('03', -1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「今天的路線」、大標「一套方法，搞懂五件事」', '一條虛線路，五個站：01 包裝和廠商資訊、02 乾糧、濕糧、鮮食、03 幼犬到老犬、04 餵幾餐、零食、05 天然、無穀、頂級（白色圖示磚＋站名）', '黑柴（側站）從左邊出發，念到哪一站走到哪一站，那一站亮起（這一幕走到第 03 站）'],
  mount: () => K.ey('k03', '今天的路線', 140, 170) + K.h('h03', ['一套方法，搞懂<b class="o">五件事</b>'], { y: 220, size: 72 }) +
    `<svg class="abs" style="left:0;top:0" width="1920" height="1080"><path id="rd03" d="M150 ${RY + 40} C 500 ${RY - 20}, 800 ${RY + 90}, 1150 ${RY + 30} S 1650 ${RY + 10}, 1800 ${RY + 40}" fill="none" stroke="#C9D6E8" stroke-width="10" stroke-dasharray="2 26" stroke-linecap="round" pathLength="1000"/></svg>` +
    ST03.map((s, k) => K.tile(s.ic, { id: 'st03' + k, x: s.x - 75, y: RY - 200 }) +
      `<div class="abs" id="sl03${k}" style="left:${s.x - 160}px;top:${RY + 90}px;width:320px;text-align:center;font-size:30px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:8px">0${k + 1}</span>${s.t}</div>`).join('') +
    K.dog('stand-side', { id: 'dg03', x: 0, y: RY - 150, w: 190, flip: true }),
  init() { K.hideLines('h03', 1); gsap.set('#rd03', { strokeDashoffset: 1000 }); gsap.set('#dg03', { opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k03', S.at(0));
    K.lines(S, 'h03', 1, S.at(0), '大標「一套方法，搞懂五件事」');
    S.to('#rd03', { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, S.at(0) + .3, '虛線路由左往右畫出來');
    S.sfx(S.at(0) + .3, 'draw', '畫出路線：筆刷聲', { dur: 1.2, gain: .5 });
    ST03.forEach((s, k) => { gsap.set(['#st03' + k, '#sl03' + k], { opacity: 0 }); S.to(['#st03' + k, '#sl03' + k], { opacity: .25, duration: .4 }, S.at(0) + .6 + k * .12); });
    S.to('#dg03', { opacity: 1, duration: .4 }, S.at(0) + .8);
    [['包裝和廠商', 0], ['自製食物', 1], ['成犬和老犬', 2]].forEach(([w, k]) => {
      K.walk03(S, ST03[k].x, S.word(w, 0, -.9), k ? '' : '黑柴依序走到念到的那一站');
      K.st03(S, k, S.word(w, 0, .1), k ? '' : '念到的那一站亮起');
    });
  },
});
K.scene('04', -1, {
  enter: 'none',
  visuals: ['（接續路線圖）念到「一天該餵幾餐」：黑柴走到第 04 站；念到「天然、無穀、頂級」：走到第 05 站', '念到「那我們就從最重要的觀念開始吧」：五站一起亮橘框'],
  animate(S) {
    [['幾餐', 3], ['天然', 4]].forEach(([w, k]) => {
      K.walk03(S, ST03[k].x, S.word(w, 0, -1), k === 3 ? '黑柴走到第 04、05 站' : '');
      K.st03(S, k, S.word(w, 0, .1), k === 3 ? '念到的那一站亮起' : '');
    });
    const t = S.word('開始吧', 0, -.6);
    S.to(ST03.map((_, k) => '#st03' + k), { boxShadow: K.RING, scale: 1, opacity: 1, duration: .3 }, t, '念到「開始吧」：五站同時亮橘框');
    S.sfx(t, 'ding-soft', '出發：輕「叮」');
  },
});
