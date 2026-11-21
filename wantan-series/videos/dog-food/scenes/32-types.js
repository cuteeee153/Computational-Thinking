// 幕 32–44｜第二步：乾糧、濕糧、鮮食，哪一種才是最好的？

// ---------- 幕 32｜章節卡 ----------
const T32 = [['FoodBag', '乾糧'], ['Can', '濕糧'], ['Fresh', '市售鮮食']];
K.scene('32', 2, {
  enter: 'iris', irisAt: [1400, 450], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；章節卡「STEP 02｜第二步」，大標「乾糧、濕糧、鮮食，」／「哪一種才是最好的？」（橘）', '右邊三塊圖示磚：乾糧、濕糧、市售鮮食；念到「都有可能成為狗狗適合的主食」：三塊都打勾', '念到「重點是」：左下橘字「重點：營養完整、符合需求」', '念到「先從最常見的乾糧開始」：乾糧那塊加橘框'],
  mount: () => K.chap('32', 2, ['乾糧、濕糧、鮮食，', '<b class="o">哪一種才是最好的？</b>'], { size: 84 }) +
    T32.map(([ic, t], k) => K.tile(ic, { id: 't32' + k, x: 1120 + k * 240, y: 300, size: 190 }) +
      `<div class="abs" id="l32${k}" style="left:${1120 + k * 240 - 25}px;top:510px;width:240px;text-align:center;font-size:32px;font-weight:900">${t}</div>` +
      `<div class="abs" id="c32${k}" style="left:${1120 + k * 240 + 150}px;top:280px">${K.chk().replace('class="chk"', 'class="chk" style="width:56px;height:56px;margin:0"')}</div>`).join('') +
    K.concl('cn32', '重點：<span style="color:#16130F">營養完整、符合需求</span>', { y: 680, size: 60 }),
  init() { K.hideLines('h32', 2); gsap.set(['#cn32', '#c320', '#c321', '#c322'], { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '32', S.at(0));
    T32.forEach(([, t], k) => K.pop(S, ['#t32' + k, '#l32' + k], S.word(t === '市售鮮食' ? '鮮食' : t, 0, -.1), k ? '' : '念到時右邊三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
    K.pop(S, ['#c320', '#c321', '#c322'], S.word('都有可能', 0, -.1), '三塊都打勾', { stagger: .15 });
    K.showConcl(S, '#cn32', S.word('重點是', 0, -.2), '左下橘字「重點：營養完整、符合需求」');
    S.to('#t320', { boxShadow: K.RING, duration: .3 }, S.word('最常見的乾糧', 0, -.1), '念到「先從最常見的乾糧開始」：乾糧那塊加橘框');
    S.sfx(S.word('最常見的乾糧', 0, -.1), 'ding-soft', '亮起：輕「叮」');
  },
});

// ---------- 幕 33｜真實畫面：乾糧（直拍在右，左邊字卡） ----------
const PT33 = [
  { ic: 'FoodBag', t: '乾糧：方便保存、餵食容易', at: '最大的優點' },
  { ic: 'Kibble', t: '照包裝建議分配餵食量', at: '依照包裝建議' },
  { ic: 'Label', t: '還是要看：營養、生命階段、品質', at: '回到前面' },
];
K.scene('33', 2, {
  enter: 'slide',
  visuals: ['右邊直式影片框（真實畫面：用量杯舀乾糧倒進狗碗，狗狗低頭吃）', '左邊字卡依序滑入、加橘框：乾糧：方便保存、餵食容易／照包裝建議分配餵食量／還是要看：營養、生命階段、品質'],
  mount: S => S.footage() + PT33.map((p, k) => K.bar('f33' + k, { x: 140, y: 220 + k * 210, w: 1020, h: 170, ic: p.ic, t: p.t, ts: 40 })).join(''),
  init() { gsap.set(PT33.map((_, k) => '#f33' + k), { opacity: 0 }); },
  animate(S) {
    PT33.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f33' + (k - 1), t, false);
      K.rise(S, '#f33' + k, t, `字卡 ${k + 1} 由左滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f33' + k, t + .2);
    });
  },
});

// ---------- 幕 34–35｜濕糧 ----------
K.scene('34', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「濕糧」，大標「口感和含水量不同，」／「不代表營養比較好」（橘）', '念到「罐頭和餐包」：右邊罐頭、餐包兩塊圖示磚彈出', '念到「狗狗比較喜歡」：愛心圖示彈出；念到「濕潤的口感」：開心的黑柴跳出來'],
  mount: () => K.kicker('k34', 'WET', '濕糧', { y: 150 }) + K.h('h34', ['口感和含水量不同，', '<b class="o">不代表營養比較好</b>'], { y: 210, size: 80 }) +
    K.tile('Can', { id: 't340', x: 1140, y: 200, size: 200 }) + K.tile('Fresh', { id: 't341', x: 1400, y: 200, size: 200 }) +
    ['罐頭', '餐包'].map((t, k) => `<div class="abs" id="l34${k}" style="left:${1140 + k * 260}px;top:415px;width:200px;text-align:center;font-size:32px;font-weight:900">${t}</div>`).join('') +
    K.dog('happy', { id: 'dg34', x: 1480, y: 500, w: 250 }) + K.icon('hr34', 'Heart', 1330, 560, 140),
  init() { K.hideLines('h34', 2); gsap.set(['#dg34', '#l340', '#l341'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k34', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h34', 2, S.at(0) + .1, '大標「口感和含水量不同，不代表營養比較好」');
    K.pop(S, ['#t340', '#l340'], S.word('罐頭', 0, -.1), '右邊罐頭圖示磚', { sfx: 'pop-card' });
    K.pop(S, ['#t341', '#l341'], S.word('餐包', 0, -.1), '餐包圖示磚', { sfx: 'pop-card', pitch: 1.1 });
    K.pop(S, '#hr34', S.word('比較喜歡', 0, -.2), '念到「狗狗比較喜歡」：愛心圖示彈出', { sfx: 'boing' });
    K.dogIn(S, '#dg34', S.word('濕潤的口感', 0, -.2), '開心的黑柴跳出來');
  },
});
K.scene('35', 2, {
  enter: 'none',
  visuals: ['（接續）念到「完整營養配方」：左下橘色標籤「可以當主食」；念到「補充品或零食」：白底橘框標籤「只能當補充品、零食」', '念到「不是每一款罐頭」：罐頭圖示磚上打一個問號標籤「不是每款都能當主食」', '念到「有肉、有湯汁」：下方橘字「有肉有湯汁 ≠ 營養完整」'],
  mount: () => K.pill('p350', '可以當主食', 140, 500, 'o', { fs: 38 }) + K.pill('p351', '只能當補充品、零食', 450, 500, 'ob', { fs: 38 }) +
    K.pill('p352', '不是每款都能當主食', 1100, 130, 'bt', { fs: 30 }) +
    K.concl('cn35', '有肉有湯汁 <span style="color:#16130F">≠</span> 營養完整', { y: 700, size: 60 }),
  init() { gsap.set(['#p350', '#p351', '#p352', '#cn35'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#p350', S.word('完整營養配方', 0, -.2), '橘色標籤「可以當主食」', { sfx: 'pop-card' });
    K.pop(S, '#p351', S.word('補充品或零食', 0, -.2), '白底橘框標籤「只能當補充品、零食」', { sfx: 'pop-card' });
    K.pop(S, '#p352', S.word('每一款罐頭', 0, -.2), '罐頭上方藍色標籤「不是每款都能當主食」', { sfx: 'pop-card' });
    S.to('#t340', { boxShadow: K.RING, duration: .3 }, S.word('每一款罐頭', 0, -.2));
    K.showConcl(S, '#cn35', S.word('有湯汁', 0, -.3), '下方橘字「有肉有湯汁 ≠ 營養完整」');
  },
});

// ---------- 幕 36｜市售鮮食：看起來新鮮 ----------
K.scene('36', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「市售鮮食」，大標「看起來新鮮，」／「不代表營養一定完整」（橘）', '右邊一盒鮮食（大圖示磚），念到「原型食材」：旁邊肉、蔬菜圖示彈出，藍色手寫「看得到原型食材」', '念到「更天然、更健康」：兩個白底橘框標籤「更天然？」「更健康？」'],
  mount: () => K.kicker('k36', 'FRESH', '市售鮮食', { y: 150 }) + K.h('h36', ['看起來新鮮，', '<b class="o">不代表營養一定完整</b>'], { y: 210, size: 80 }) +
    K.tile('Fresh', { id: 't36', x: 1250, y: 420, size: 300 }) + K.tile('Meat', { id: 'm36', x: 1130, y: 300, size: 150 }) + K.tile('Veg', { id: 'v36', x: 1580, y: 330, size: 150 }) +
    K.anno('an36', '', '看得到原型食材', { x: 1270, y: 750, ss: 38 }) +
    K.pill('g360', '更天然？', 140, 560, 'ob', { fs: 40 }) + K.pill('g361', '更健康？', 440, 560, 'ob', { fs: 40 }),
  init() { K.hideLines('h36', 2); gsap.set(['#an36', '#g360', '#g361', '#m36', '#v36'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k36', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h36', 2, S.at(0) + .1, '大標「看起來新鮮，不代表營養一定完整」');
    K.pop(S, '#t36', S.word('鮮食', 0, -.1), '右邊一盒鮮食', { sfx: 'pop-card' });
    K.pop(S, ['#m36', '#v36'], S.word('原型食材', 0, -.2), '肉、蔬菜圖示彈出', { stagger: .12 });
    K.fadeIn(S, '#an36', S.word('原型食材', 0, .1), '藍色手寫「看得到原型食材」');
    K.pop(S, '#g360', S.word('更天然', 0, -.1), '白底橘框標籤「更天然？」', { sfx: 'pop-card' });
    K.pop(S, '#g361', S.word('更健康', 0, -.1), '白底橘框標籤「更健康？」', { sfx: 'pop-card', pitch: 1.1 });
  },
});

// ---------- 幕 37｜食材豐富 ≠ 營養完整 ----------
K.scene('37', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「食材豐富，」／「跟營養完整是兩回事」（橘）', '念到「有肉、蔬菜和其他食材」：一排圖示磚：肉 ＋ 蔬菜 ＋ 其他食材', '念到「也不代表」：後面接上橘色「≠」和卡片「狗狗需要的全部營養」', '念到「看清楚產品標示」：下方標示圖示＋橘字「確認是不是完整營養的主食」'],
  mount: () => K.h('h37', ['食材豐富，', '<b class="o">跟營養完整是兩回事</b>'], { y: 160, size: 84 }) +
    [['Meat', '肉'], ['Veg', '蔬菜'], ['Grain', '其他食材']].map(([ic, t], k) => K.tile(ic, { id: 't37' + k, x: 140 + k * 280, y: 400, size: 180 }) +
      `<div class="abs" id="l37${k}" style="left:${140 + k * 280 - 30}px;top:595px;width:240px;text-align:center;font-size:30px;font-weight:900">${t}</div>` +
      (k < 2 ? `<div class="abs big" id="pl37${k}" style="left:${345 + k * 280}px;top:440px;font-size:80px;color:#A29D97">+</div>` : '')).join('') +
    `<div class="abs big" id="ne37" style="left:960px;top:420px;font-size:110px;color:var(--or)">≠</div>` +
    `<div class="cd" id="c37" style="left:1120px;top:380px;width:620px;height:240px;padding:40px;display:flex;align-items:center;gap:30px"><div style="width:150px;height:150px;flex:none">${K.ic('Label')}</div><div class="t" style="font-size:44px">狗狗需要的<br>全部營養</div></div>` +
    K.concl('cn37', '看清楚標示：<span style="color:#16130F">是不是完整營養的主食</span>', { y: 760, size: 54 }),
  init() { K.hideLines('h37', 2); gsap.set(['#ne37', '#c37', '#cn37', '#l370', '#l371', '#l372', '#pl370', '#pl371'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h37', 2, S.at(0), '大標「食材豐富，跟營養完整是兩回事」');
    [['有肉', 0], ['蔬菜', 1], ['其他食材', 2]].forEach(([w, k]) => {
      const t = S.word(w, 0, -.1);
      K.pop(S, ['#t37' + k, '#l37' + k], t, k ? '' : '念到時一排圖示磚：肉 ＋ 蔬菜 ＋ 其他食材', { pitch: 1 + k * .1 });
      if (k) S.to('#pl37' + (k - 1), { opacity: 1, duration: .2 }, t - .1);
    });
    const t = S.word('也不代表', 0, -.1);
    K.pop(S, '#ne37', t, '橘色「≠」', { sfx: 'pop-low' });
    K.rise(S, '#c37', S.word('全部營養', 0, -.4), '卡片「狗狗需要的全部營養」', { sfx: 'pop-card' });
    K.showConcl(S, '#cn37', S.word('產品標示', 0, -.3), '下方橘字「看清楚標示：是不是完整營養的主食」');
  },
});

// ---------- 幕 39｜自製鮮食：自己準備最安心 ----------
K.scene('39', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「自製鮮食」，大標「自己準備食材最安心，」／「也會考慮自製鮮食」（橘）', '右邊一鍋飯（鍋子圖示磚）＋站起來拜託的黑柴'],
  mount: () => K.kicker('k39', 'HOMEMADE', '自製鮮食', { y: 150 }) + K.h('h39', ['自己準備食材最安心，', '<b class="o">也會考慮自製鮮食</b>'], { y: 210, size: 84 }) +
    K.tile('Pot', { id: 't39', x: 1150, y: 430, size: 260 }) + K.dog('beg', { id: 'dg39', x: 1500, y: 400, w: 240 }),
  init() { K.hideLines('h39', 2); gsap.set(['#dg39'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k39', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h39', 2, S.word('最安心', 0, -1), '大標「自己準備食材最安心，也會考慮自製鮮食」', .5);
    K.pop(S, '#t39', S.word('準備食材', 0, -.2), '右邊一鍋飯（鍋子圖示磚）');
    K.dogIn(S, '#dg39', S.word('自製鮮食', 0, -.2), '站起來拜託的黑柴');
  },
});

// ---------- 幕 40｜UC Davis：200 份食譜，95% 至少缺一種 ----------
const dots40 = Array.from({ length: 200 }, (_, k) => `<i id="d40_${k}"></i>`).join('');
K.scene('40', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「美國加州大學戴維斯分校獸醫學院｜2013 年」，大標「分析 200 份」／「狗狗自製食譜」（橘）', '右邊 200 個圓點（一點＝一份食譜）；念到「書籍、網站和獸醫教科書」：下方三個標籤', '念到「95%」：圓點有 190 個變橘，左邊大數字跑到 95%「至少缺少一種必需營養素」', '念到「83%」：其中 166 個變深橘，左邊大數字 83%「缺少多種營養素」'],
  mount: () => K.ey('k40', '美國加州大學戴維斯分校獸醫學院｜2013 年', 140, 150, { fs: 24 }) + K.h('h40', ['分析 200 份', '<b class="o">狗狗自製食譜</b>'], { y: 200, size: 80 }) +
    `<div class="dots200" id="g40" style="left:1000px;top:210px">${dots40}</div>` +
    ['書籍', '網站', '獸醫教科書'].map((t, k) => K.pill('s40' + k, t, [1000, 1180, 1360][k], 640, '', { fs: 30 })).join('') +
    [['95', '至少缺少一種必需營養素', 'n400'], ['83', '缺少多種營養素', 'n401']].map(([, d, id], k) => `<div class="abs" id="b40${k}" style="left:140px;top:${440 + k * 220}px;display:flex;align-items:baseline;gap:20px"><span class="big" style="font-size:150px;color:${k ? '#B4470A' : 'var(--or)'}">${k ? '' : '<small style="font-size:48px;font-family:Noto Sans TC;letter-spacing:0">約 </small>'}<span id="${id}">0</span>%</span><span style="font-size:36px;font-weight:900">${d}</span></div>`).join(''),
  init() { K.hideLines('h40', 2); gsap.set(['#b400', '#b401', '#s400', '#s401', '#s402'], { opacity: 0 }); gsap.set('#g40 i', { opacity: 0, scale: .3 }); },
  animate(S) {
    K.eyIn(S, 'k40', S.at(0));
    K.lines(S, 'h40', 2, S.at(0) + .1, '大標「分析 200 份狗狗自製食譜」');
    S.to('#g40 i', { opacity: 1, scale: 1, duration: .25, stagger: .006 }, S.word('200', 0, -.2), '右邊 200 個圓點（一點＝一份食譜）');
    S.sfx(S.word('200', 0, -.2), 'pop', '圓點：連續「啵」', { gain: .5 });
    ['書籍', '網站', '獸醫教科書'].forEach((w, k) => K.pop(S, '#s40' + k, S.word(w, 0, -.1), k ? '' : '下方三個標籤：書籍、網站、獸醫教科書', { pitch: 1 + k * .1 }));
    const t1 = S.word('95', 0, -.2);
    K.rise(S, '#b400', t1, '左邊大數字「95%」', { sfx: false });
    K.count(S, '#n400', 0, 95, t1, 1, '數字從 0 跑到 95');
    S.to(Array.from({ length: 190 }, (_, k) => '#d40_' + k), { backgroundColor: '#F97316', duration: .2, stagger: .004 }, t1, '190 個圓點變橘');
    S.sfx(t1 + .9, 'tick', '95%：「叮咚」');
    const t2 = S.word('83', 0, -.2);
    K.rise(S, '#b401', t2, '左邊大數字「83%」', { sfx: false });
    K.count(S, '#n401', 0, 83, t2, 1, '數字從 0 跑到 83');
    S.to(Array.from({ length: 166 }, (_, k) => '#d40_' + k), { backgroundColor: '#B4470A', duration: .2, stagger: .004 }, t2, '其中 166 個變深橘');
    S.sfx(t2 + .9, 'tick', '83%：「叮咚」');
  },
});

// ---------- 幕 41｜自製不一定不好；長期自製先找獸醫營養專科（原本的 41、42 合併） ----------
K.scene('41', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「自製鮮食，」／「不一定不好」（橘）', '念到「長期幫狗狗準備自製鮮食」：左邊鍋子圖示磚「長期自製」→ 藍色箭頭 → 右邊動物醫院圖示磚「獸醫營養專科」', '念到「尋求獸醫營養專科的協助」：右卡加橘框，下方橘字「長期自製，先和獸醫討論」'],
  mount: () => K.h('h41', ['自製鮮食，', '<b class="o">不一定不好</b>'], { y: 180, size: 96 }) +
    K.vcard('c410', { x: 300, y: 440, w: 520, h: 330, ic: 'Pot', t: '長期自製', ts: 44, is: 140 }) +
    K.arrow('a41', { x: 860, y: 570, w: 200, h: 60, d: 'M10 30 C 70 10 130 10 190 30' }) +
    K.vcard('c411', { x: 1100, y: 440, w: 520, h: 330, ic: 'Clinic', t: '獸醫營養專科', ts: 44, is: 140 }) +
    K.concl('cn41', '長期自製，<span style="color:#16130F">先和獸醫討論</span>', { y: 820, size: 56, center: true }),
  init() { K.hideLines('h41', 2); gsap.set(['#c410', '#c411', '#cn41'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h41', 2, S.at(0), '大標「自製鮮食，不一定不好」');
    K.rise(S, '#c410', S.word('長期', 0, -.2), '左卡「長期自製」浮上', { sfx: 'pop-card' });
    K.draw(S, '#a41', S.word('獸醫討論', 0, -.5), '藍色箭頭', .4);
    K.rise(S, '#c411', S.word('獸醫營養專科', 0, -.4), '右卡「獸醫營養專科」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c411', S.word('獸醫營養專科', 0, 0));
    K.showConcl(S, '#cn41', S.word('協助', 0, -.3), '下方橘字「長期自製，先和獸醫討論」');
  },
});

// ---------- 幕 43｜那到底該怎麼選？ ----------
const CH43 = [
  { ic: 'FoodBag', t: '希望方便、好保存', a: '合適的乾糧', at: '方便' },
  { ic: 'Can', t: '狗狗喜歡濕潤的口感', a: '合適的濕糧', at: '濕潤的口感' },
  { ic: 'Fresh', t: '偏好鮮食', a: '有完整營養標示的市售鮮食', at: '偏好鮮食' },
  { ic: 'Pot', t: '自製鮮食', a: '由營養專業人員設計', at: '至於自製' },
];
K.scene('43', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「那到底該怎麼選？」', '念到時四條選項卡依序滑入，右邊橘色標籤是建議：希望方便、好保存 → 合適的乾糧／狗狗喜歡濕潤的口感 → 合適的濕糧／偏好鮮食 → 有完整營養標示的市售鮮食／自製鮮食 → 由營養專業人員設計'],
  mount: () => K.h('h43', ['那到底<b class="o">該怎麼選？</b>'], { y: 140, size: 76 }) +
    CH43.map((c, k) => K.bar('o43' + k, { x: 140, y: 290 + k * 140, w: 1640, h: 118, ic: c.ic, t: c.t, ts: 40, tail: `<span class="pl o" id="a43${k}" style="position:static;font-size:32px;padding:12px 26px">→ ${c.a}</span>` })).join(''),
  init() { K.hideLines('h43', 1); gsap.set(CH43.map((_, k) => '#o43' + k).concat(CH43.map((_, k) => '#a43' + k)), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h43', 1, S.at(0), '大標「那到底該怎麼選？」');
    CH43.forEach((c, k) => {
      const t = S.word(c.at, 0, -.3);
      if (k) K.ring(S, '#o43' + (k - 1), t, false);
      K.rise(S, '#o43' + k, t, k ? '' : '念到時選項卡依序滑入、加橘框', { dx: -50, dy: 0 });
      K.ring(S, '#o43' + k, t + .2);
      K.pop(S, '#a43' + k, t + .8, k ? '' : '右邊橘色標籤：建議', { sfx: 'pop-card', pitch: 1 + k * .06 });
    });
  },
});

// ---------- 幕 44｜沒有標準答案 ----------
K.scene('44', 2, {
  enter: 'zoom', bg: 'sky',
  visuals: ['淡藍底；置中大標「沒有一個」／「適用所有狗狗的標準答案」（橘）', '念到時兩步驟卡依序浮上、中間藍色箭頭：1 先確認營養完整 → 2 選最符合生活方式的形式（橘框亮起時「叮」一聲）'],
  mount: () => K.h('h44', ['沒有一個', '<b class="o">適用所有狗狗的標準答案</b>'], { y: 140, size: 84, w: 1640, center: true }) +
    K.bar('s440', { x: 140, y: 470, w: 760, h: 170, n: 1, ic: 'Label', t: '先確認營養完整', ts: 42 }) +
    K.arrow('a44', { x: 915, y: 525, w: 90, h: 60, d: 'M8 30 C 30 16 60 16 82 30' }) +
    K.bar('s441', { x: 1020, y: 470, w: 760, h: 170, n: 2, ic: 'House', t: '選最符合生活方式的形式', ts: 42 }),
  init() { K.hideLines('h44', 2); gsap.set(['#s440', '#s441'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h44', 2, S.at(0), '大標「沒有一個適用所有狗狗的標準答案」');
    K.rise(S, '#s440', S.word('先確認', 0, -.2), '步驟 1「先確認營養完整」浮上', { sfx: 'pop-card' });
    K.ring(S, '#s440', S.word('先確認'));
    K.draw(S, '#a44', S.word('再選擇', 0, -.4), '藍色箭頭', .35);
    K.ring(S, '#s440', S.word('再選擇', 0, -.1), false);
    K.rise(S, '#s441', S.word('再選擇', 0, -.1), '步驟 2「選最符合生活方式的形式」浮上', { sfx: 'pop-card' });
    K.ring(S, '#s441', S.word('生活方式'));
    S.sfx(S.word('生活方式'), 'ding', '橘框亮起：「叮」');
  },
});
