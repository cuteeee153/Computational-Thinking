// 幕 18–31｜第一步：挑飼料先看這四件事（參考 WSAVA 選購指引）＋台灣買得到的飼料

// ---------- 幕 18｜章節卡 ----------
const F18 = [['Label', '營養聲明'], ['Calendar', '生命階段'], ['Flame', '熱量'], ['Factory', '廠商資訊']];
K.scene('18', 1, {
  enter: 'iris', irisAt: [1400, 500], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 01｜第一步」，大標「挑飼料先看這四件事，」／「不要只看成分表」（橘）', '念到「四件事」：右邊四塊圖示磚依序彈出：營養聲明、生命階段、熱量、廠商資訊', '念到「世界小動物獸醫協會」：大標下方標籤「參考：世界小動物獸醫協會（WSAVA）選購指引」'],
  mount: () => K.chap('18', 1, ['挑飼料先看這四件事，', '<b class="o">不要只看成分表</b>'], { size: 80 }) +
    F18.map(([ic, t], k) => K.tile(ic, { id: 't18' + k, x: 1100 + (k % 2) * 330, y: 240 + Math.floor(k / 2) * 280, size: 180 }) +
      `<div class="abs" id="l18${k}" style="left:${1100 + (k % 2) * 330 - 35}px;top:${435 + Math.floor(k / 2) * 280}px;width:250px;text-align:center;font-size:30px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:6px">${k + 1}</span>${t}</div>`).join('') +
    K.ipill('p18', 'Globe', '參考：世界小動物獸醫協會（WSAVA）選購指引', 140, 520, 'bt', { fs: 32 }),
  init() { K.hideLines('h18', 2); gsap.set('#p18', { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '18', S.at(0));
    F18.forEach((_, k) => K.pop(S, ['#t18' + k, '#l18' + k], S.word('四件事', 0, -.2 + k * .2), k ? '' : '右邊四塊圖示磚依序彈出', { pitch: 1 + k * .08, sfx: 'pop-card' }));
    K.rise(S, '#p18', S.word('世界小動物', 0, -.2), '大標下方標籤「參考：世界小動物獸醫協會（WSAVA）選購指引」');
  },
});

// ---------- 幕 18b｜正式開始前，先釐清幾個重要觀念 ----------
K.scene('18b', 1, {
  enter: 'zoom', bg: 'mint',
  visuals: ['淡綠底；置中大標「正式開始前，」／「先釐清幾個重要觀念」（橘）', '下方三塊圖示磚依序彈出：營養完整、營養標準、台灣的規定'],
  mount: () => K.h('h18b', ['正式開始前，', '<b class="o">先釐清幾個重要觀念</b>'], { y: 230, size: 96, w: 1640, center: true }) +
    [['Label', '營養完整'], ['Seal', '營養標準'], ['Flag', '台灣的規定']].map(([ic, t], k) => K.tile(ic, { id: 't18b' + k, x: 600 + k * 270, y: 560, size: 180 }) +
      `<div class="abs" id="l18b${k}" style="left:${600 + k * 270 - 35}px;top:755px;width:250px;text-align:center;font-size:30px;font-weight:900">${t}</div>`).join(''),
  init() { K.hideLines('h18b', 2); },
  animate(S) {
    K.lines(S, 'h18b', 2, S.at(0), '置中大標「正式開始前，先釐清幾個重要觀念」');
    [0, 1, 2].forEach(k => K.pop(S, ['#t18b' + k, '#l18b' + k], S.word('重要觀念', 0, -.3 + k * .2), k ? '' : '下方三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
  },
});

// ---------- 幕 19–20｜一、營養完整的聲明（包裝背面） ----------
const backRows = `<div style="padding:20px 40px 0"><div class="k" style="color:#9A9590">成分</div>
  <div id="ing19" style="display:flex;gap:14px;margin:12px 0 16px">${['Meat', 'Veg', 'Grain'].map(ic => `<div style="width:84px;height:84px;border-radius:22px;background:#F4F3F1;padding:10px">${K.ic(ic)}</div>`).join('')}<div style="flex:1"><div class="ln2" style="width:90%;margin-top:14px"></div><div class="ln2" style="width:70%"></div></div></div>
  <div class="k" style="color:#9A9590">營養成分</div><div style="margin-top:12px"><div class="ln2" style="width:100%"></div><div class="ln2" style="width:85%"></div><div class="ln2" style="width:92%"></div></div></div>`;
K.scene('19', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；念到「第一件事」：小標「第一件事」；念到「營養完整的聲明」：大標「看有沒有」／「營養完整的聲明」（橘）'],
  mount: () => K.kicker('k19', '01', '第一件事', { y: 230 }) + K.h('h19', ['看有沒有', '<b class="o">營養完整的聲明</b>'], { y: 290, size: 96 }) +
    K.bag('bg19', backRows + `<div class="stm" id="st19" style="margin-top:6px"><span class="k">營養聲明</span><span id="ty19" data-text="符合 AAFCO 成犬維持營養標準"></span></div>`, { x: 1100, y: 150, w: 640, h: 760, title: '包裝背面' }) +
    K.icon('mg19', 'Magnifier', 1560, 330, 200),
  init() { K.hideLines('h19', 2); gsap.set('#bg19', { opacity: 0, y: 60 }); gsap.set('#mg19', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k19', { opacity: 0 }, { opacity: 1, duration: .4 }, S.word('第一件事', 0, -.2));
    K.lines(S, 'h19', 2, S.word('營養完整的聲明', 0, -.6), '念到「營養完整的聲明」：大標「看有沒有營養完整的聲明」');
  },
});
K.scene('19b', 1, {
  enter: 'none',
  visuals: ['（接續）右邊一包飼料的背面：成分（肉、蔬菜、穀物）、營養成分、最下面一格聲明', '念到「先不要急著看它用了什麼肉」：成分那一區變淡', '念到「生命階段的營養標準」：聲明格亮起、加橘框，放大鏡移過去；念到「AAFCO 成犬維持」：聲明格打字「符合 AAFCO 成犬維持營養標準」'],
  animate(S) {
    S.to('#bg19', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, S.word('拿起一包飼料', 0, -.3), '右邊一包飼料的背面浮上');
    S.sfx(S.word('拿起一包飼料', 0, -.3), 'slide', '包裝浮上：輕「咻」');
    S.to('#ing19', { opacity: .3, duration: .4 }, S.word('先不要急著', 0, -.1), '成分那一區變淡');
    const t = S.word('生命階段的營養標準', 0, -.3);
    S.to('#st19', { borderColor: '#F97316', backgroundColor: '#FFF6EE', duration: .3 }, t, '聲明格亮起、加橘框');
    S.fromTo('#mg19', { opacity: 0, x: 0, y: 0 }, { opacity: 1, x: -10, y: 360, duration: .8, ease: 'power2.inOut' }, t, '放大鏡移到聲明格上');
    S.sfx(t, 'whoosh', '放大鏡：「咻」', { gain: .5 });
    K.type(S, '#ty19', S.word('AAFCO', 0, -.3), '聲明格打字「符合 AAFCO 成犬維持營養標準」');
  },
});
K.scene('20', 1, {
  enter: 'none',
  visuals: ['（接續包裝背面）左下兩個標籤：確認方式「實際餵食試驗」「依配方計算」', '念到「沒有寫清楚」：聲明格變成灰色虛線「沒寫清楚？」；念到時兩個藍色標籤：查原廠包裝、直接問廠商'],
  mount: () => `<div class="abs" id="w20" style="left:140px;top:560px;font-size:28px;font-weight:700;color:#9A9590">確認方式</div>` +
    K.ipill('a200', 'Bowl', '實際餵食試驗', 140, 610, '', { fs: 34 }) + K.ipill('a201', 'Doc', '依配方計算', 520, 610, '', { fs: 34 }) +
    `<div class="abs" id="w20b" style="left:140px;top:740px;font-size:28px;font-weight:700;color:#9A9590">沒寫清楚？</div>` +
    K.ipill('b200', 'Magnifier', '查原廠包裝', 140, 790, 'bt', { fs: 34 }) + K.ipill('b201', 'Chat', '直接問廠商', 520, 790, 'bt', { fs: 34 }),
  init() { gsap.set(['#w20', '#a200', '#a201', '#w20b', '#b200', '#b201'], { opacity: 0 }); },
  animate(S) {
    S.to('#mg19', { opacity: 0, duration: .3 }, S.at(0));
    K.fadeIn(S, '#w20', S.word('實際餵食試驗', 0, -.5), '小字「確認方式」', .3);
    K.pop(S, '#a200', S.word('實際餵食試驗', 0, -.1), '標籤「實際餵食試驗」');
    K.pop(S, '#a201', S.word('配方計算', 0, -.1), '標籤「依配方計算」', { pitch: 1.1 });
    const t = S.word('沒有寫清楚', 0, -.2);
    S.to('#st19', { borderColor: '#CFCAC4', borderStyle: 'dashed', backgroundColor: '#FFFFFF', color: '#A29D97', duration: .3 }, t, '聲明格變成灰色虛線');
    K.fadeIn(S, '#w20b', t, '小字「沒寫清楚？」', .3);
    K.pop(S, '#b200', S.word('原廠包裝', 0, -.1), '藍色標籤「查原廠包裝」', { sfx: 'pop-card' });
    K.pop(S, '#b201', S.word('詢問廠商', 0, -.1), '藍色標籤「直接問廠商」', { sfx: 'pop-card', pitch: 1.1 });
  },
});

// ---------- 幕 21–21b｜二、適合哪個生命階段（同一個畫面） ----------
const AG21 = [['ball', '幼犬', '幼犬'], ['sit', '成犬', '成犬'], ['rest', '老犬', '老犬']];
const agCard = (id, pose, t, x, y, w = 400) => `<div class="cd" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:330px;padding:26px;text-align:center"><div style="height:210px;position:relative">${K.dog(pose, { x: (w - 52 - (pose === 'rest' ? 200 : 120)) / 2, y: pose === 'rest' ? 60 : 10, w: pose === 'rest' ? 200 : 120, shadow: false })}</div><div class="t" style="font-size:42px;margin-top:8px">${t}</div></div>`;
K.scene('21', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「第二件事」，大標「看它適合哪個生命階段」（後半橘）', '念到時三張卡依序浮上：幼犬（玩球的黑柴）、成犬（坐著）、老犬（趴著），卡片之間「≠」', '念到「正在成長的幼犬」：幼犬卡加橘框，卡片下面白底橘框標籤「成長期的完整營養」'],
  mount: () => K.kicker('k21', '02', '第二件事', { y: 130 }) + K.h('h21', ['看它適合<b class="o">哪個生命階段</b>'], { y: 180, size: 84 }) +
    `<div class="abs" id="w21" style="left:0;top:0;width:1920px;height:1080px;transform-origin:140px 330px">` +
    AG21.map(([p, t], k) => agCard('c21' + k, p, t, 140 + k * 560, 330, 480)).join('') +
    [0, 1].map(k => `<div class="abs big ne21" id="ne21${k}" style="left:${635 + k * 560}px;top:420px;font-size:90px;color:var(--or)">≠</div>`).join('') +
    K.pill('p210', '成長期的完整營養', 200, 690, 'ob', { fs: 34 }) + K.pill('p211', '依生命階段和健康狀況', 730, 690, 'ob', { fs: 34 }) + `</div>`,
  init() { K.hideLines('h21', 1); gsap.set(['#c210', '#c211', '#c212', '#ne210', '#ne211', '#p210', '#p211'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k21', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h21', 1, S.at(0) + .1, '大標「看它適合哪個生命階段」');
    AG21.forEach(([, , w], k) => K.rise(S, '#c21' + k, S.word(w, 0, -.15), k ? '' : '念到時三張卡依序浮上', { sfx: 'pop-card', pitch: 1 + k * .08 }));
    K.pop(S, ['#ne210', '#ne211'], S.word('不完全相同', 0, -.2), '卡片之間「≠」', { stagger: .1, sfx: 'pop-low' });
    K.ring(S, '#c210', S.word('正在成長', 0, -.2));
    K.rise(S, '#p210', S.word('成長期的完整營養', 0, -.2), '幼犬卡加橘框，下面白底橘框標籤「成長期的完整營養」', { sfx: 'pop-card', dy: 20 });
  },
});
K.scene('21b', 1, {
  enter: 'none',
  visuals: ['（接續）念到「成犬則要依照」：成犬卡加橘框，下面白底橘框標籤「依生命階段和健康狀況」', '念到「很有名」：三張卡縮小、移到大標下方，下面出現兩個白底橘框標籤「很有名」「朋友家的狗狗吃得很好」，念到「直接買給自己的狗狗」：兩個標籤被打叉', '念到「別人的狗狗適合」：下方橘字「別人家適合，不代表你家也適合」'],
  mount: () => K.ipill('g210', 'Seal', '很有名', 140, 640, 'ob', { fs: 44, style: 'padding:20px 40px' }) + K.ipill('g211', 'Family', '朋友家的狗狗吃得很好', 560, 640, 'ob', { fs: 44, style: 'padding:20px 40px' }) +
    K.xm('x210', 380, 615, 90) + K.xm('x211', 1080, 615, 90) +
    K.concl('cn21', '別人家適合，<span style="color:#16130F">不代表你家也適合</span>', { y: 830, size: 56 }),
  init() { gsap.set(['#g210', '#g211', '#cn21'], { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#c210', S.word('成犬', 0, -.2), false);
    K.ring(S, '#c211', S.word('成犬', 0, -.2));
    K.rise(S, '#p211', S.word('健康狀況', 0, -.4), '成犬卡加橘框，下面白底橘框標籤「依生命階段和健康狀況」', { sfx: 'pop-card', dy: 20 });
    const t = S.word('很有名', 0, -.4);
    K.ring(S, '#c211', t, false);
    S.to('#w21', { scale: .55, x: 0, y: -20, duration: .6, ease: 'power3.inOut' }, t, '三張卡縮小、移到大標下方');
    S.to(['#p210', '#p211'], { opacity: 0, duration: .3 }, t);
    S.sfx(t, 'whoosh', '縮小：「咻」', { gain: .5 });
    K.pop(S, '#g210', S.word('很有名', 0, -.1), '白底橘框標籤「很有名」', { sfx: 'pop-card' });
    K.pop(S, '#g211', S.word('朋友家', 0, -.1), '白底橘框標籤「朋友家的狗狗吃得很好」', { sfx: 'pop-card', pitch: 1.1 });
    K.xIn(S, '#x210', S.word('直接買給', 0, -.1), '兩個標籤被打叉');
    K.xIn(S, '#x211', S.word('直接買給', 0, .1));
    K.showConcl(S, '#cn21', S.word('別人的狗狗', 0, -.2), '下方橘字「別人家適合，不代表你家也適合」');
  },
});

// ---------- 幕 22–23｜三、熱量是多少（同一個畫面；錄音裡念了兩次的「WSAVA 指出」剪掉前面那次） ----------
K.scene('22', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「第三件事」，大標「看熱量是多少」（後半橘）；右上熱量火焰圖示磚', '念到「吃太多」：體重計圖示＋橘色標籤「吃太多 → 體重增加」'],
  mount: () => K.kicker('k22', '03', '第三件事', { y: 130 }) + K.h('h22a', ['看熱量<b class="o">是多少</b>'], { y: 180, size: 88 }) +
    K.h('h22b', ['建議餵食量，<b class="o">只是起點</b>'], { y: 180, size: 88 }) +
    K.tile('Flame', { id: 't22', x: 1560, y: 150, size: 200 }) +
    `<div class="abs" id="w22" style="left:140px;top:420px;display:flex;align-items:center;gap:30px"><div style="width:180px;height:180px">${K.ic('Scale')}</div><span class="pl ob" style="position:static;font-size:44px;padding:20px 40px">吃太多 → 體重增加</span></div>`,
  init() { K.hideLines('h22a', 1); K.hideLines('h22b', 1); gsap.set('#w22', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k22', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h22a', 1, S.at(0) + .1, '大標「看熱量是多少」');
    K.pop(S, '#t22', S.word('熱量', 0, -.1), '右上熱量火焰圖示磚');
    K.rise(S, '#w22', S.word('吃太多', 0, -.2), '體重計＋橘框標籤「吃太多 → 體重增加」', { sfx: 'pop-card' });
  },
});
const EQ23 = [['Label', '包裝標示的熱量', '每公斤／每杯／每份', '每公斤'], ['Kibble', '每天的餵食量', '', '餵食量'], ['Flame', '實際攝取的熱量', '', '實際攝取']];
K.scene('23', 1, {
  enter: 'none',
  visuals: ['（接續）念到「如果包裝有標示」：體重計退場，換成一排算式卡：包裝標示的熱量（每公斤／每杯／每份）× 每天的餵食量 ＝ 實際攝取的熱量', '念到「WSAVA 指出」：算式變淡，下方兩個標籤：美國：一定要寫（藍）、其他地方：不一定有（白底橘框）；念到「沒有標示」：藍色標籤「沒標示：問廠商」', '念到「只是起點」：大標換成「建議餵食量，只是起點」，算式和標籤退場，三個標籤：體態、活動量、體重變化；最後橘字「觀察後，再做調整」'],
  mount: () => `<div class="abs" id="eq23" style="left:140px;top:400px;display:flex;align-items:center;gap:22px">` +
    EQ23.map(([ic, t, d], k) => (k ? `<span class="big" style="font-size:72px;color:var(--blue)">${k === 1 ? '×' : '＝'}</span>` : '') +
      `<div class="cd" id="e23${k}" style="position:relative;width:470px;height:250px;padding:28px;text-align:center"><div style="width:100px;height:100px;margin:0 auto">${K.ic(ic)}</div><div class="t" style="font-size:38px;margin-top:12px">${t}</div>${d ? `<div class="d" style="font-size:26px;margin-top:2px">${d}</div>` : ''}</div>`).join('') + `</div>` +
    K.pill('us23', '美國：一定要寫', 140, 720, 'b', { fs: 38 }) + K.pill('ot23', '其他地方：不一定有', 520, 720, 'ob', { fs: 38 }) + K.ipill('ask23', 'Chat', '沒標示：問廠商', 1000, 720, 'bt', { fs: 38 }) +
    ['體態', '活動量', '體重變化'].map((t, k) => K.pill('o23' + k, t, 140 + k * 280, 440, 'ob', { fs: 44, style: 'padding:20px 40px' })).join('') +
    K.concl('cn23', '觀察後，再做調整', { y: 640, size: 64 }),
  init() { gsap.set(['#e230', '#e231', '#e232', '#us23', '#ot23', '#ask23', '#o230', '#o231', '#o232', '#cn23'], { opacity: 0 }); gsap.set('#eq23 .big', { opacity: 0 }); },
  animate(S) {
    const t0 = S.word('每公斤', 0, -.6);
    S.to('#w22', { opacity: 0, y: -30, duration: .35 }, t0 - .2, '體重計退場');
    EQ23.forEach(([, , , w], k) => {
      const t = S.word(w, 0, -.3);
      if (k) S.to(`#eq23 .big:nth-of-type(${k})`, { opacity: 1, duration: .2 }, t - .1);
      K.rise(S, '#e23' + k, t, k ? '' : '念到時一排算式卡依序浮上：包裝標示的熱量 × 每天的餵食量 ＝ 實際攝取的熱量', { sfx: 'pop-card', pitch: 1 + k * .08 });
    });
    S.to('#eq23 .big', { opacity: 1, duration: .2 }, S.word('實際攝取', 0, -.3));
    const t1 = S.word('WSAVA', 0, -.2);
    S.to('#eq23', { opacity: .3, duration: .3 }, t1, '算式變淡');
    K.pop(S, '#us23', S.word('只有美國', 0, -.1), '藍色標籤「美國：一定要寫」', { sfx: 'pop-card' });
    K.pop(S, '#ot23', S.word('其他地方', 0, -.1), '白底橘框標籤「其他地方：不一定有」', { sfx: 'pop-card', pitch: 1.1 });
    K.pop(S, '#ask23', S.word('沒有標示', 0, -.1), '藍色標籤「沒標示：問廠商」', { sfx: 'pop-card', pitch: 1.2 });
    const t2 = S.word('只是起點', 0, -.6);
    S.to(['#eq23', '#us23', '#ot23', '#ask23'], { opacity: 0, y: 30, duration: .35 }, t2, '算式和標籤退場');
    K.swapH(S, 'h22a', 1, 'h22b', 1, t2, '大標換成「建議餵食量，只是起點」');
    S.to('#t22', { opacity: 0, duration: .3 }, t2);
    ['體態', '活動量', '體重變化'].forEach((w, k) => K.pop(S, '#o23' + k, S.word(w, 0, -.1), k ? '' : '三個標籤依序彈出：體態、活動量、體重變化', { pitch: 1 + k * .1 }));
    K.showConcl(S, '#cn23', S.word('再做調整', 0, -.4), '橘字「觀察後，再做調整」');
  },
});

// ---------- 幕 24｜四、廠商願不願意提供資訊（原本的 24、25 合併） ----------
const Q25 = [['Person', '誰設計的？', '誰設計'], ['Factory', '怎麼製造？', '怎麼製造'], ['Flask', '有沒有品質檢驗？', '品質檢驗']];
K.scene('24', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「第四件事」，大標「看廠商願不願意」／「提供相關資訊」（橘）；右邊工廠圖示磚', '念到「研究成分表」：白底橘框標籤「常常研究：成分表」', '念到時三塊圖示磚依序彈出：誰設計的？、怎麼製造？、有沒有品質檢驗？', '念到「非常重要」：三塊一起加橘框'],
  mount: () => K.kicker('k24', '04', '第四件事', { y: 150 }) + K.h('h24', ['看廠商願不願意', '<b class="o">提供相關資訊</b>'], { y: 210, size: 88 }) +
    K.tile('Factory', { id: 't24', x: 1450, y: 200, size: 260 }) +
    K.ipill('g25', 'Label', '常常研究：成分表', 140, 480, 'ob', { fs: 34 }) +
    Q25.map(([ic, t], k) => K.tile(ic, { id: 't25' + k, x: 140 + k * 320, y: 600, size: 170 }) +
      `<div class="abs" id="l25${k}" style="left:${140 + k * 320 - 50}px;top:790px;width:270px;text-align:center;font-size:32px;font-weight:900">${t}</div>`).join(''),
  init() { K.hideLines('h24', 2); gsap.set(['#g25'].concat(Q25.map((_, k) => '#l25' + k)), { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k24', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h24', 2, S.at(0) + .1, '大標「看廠商願不願意提供相關資訊」');
    K.pop(S, '#t24', S.word('廠商', 0, -.1), '右邊工廠圖示磚');
    S.to('#t24', { boxShadow: K.RING, duration: .3 }, S.word('容易忽略', 0, -.2), '念到「容易忽略」：工廠加橘框');
    S.to('#t24', { boxShadow: K.PLAIN, duration: .3 }, S.word('研究成分表', 0, -.4));
    K.pop(S, '#g25', S.word('研究成分表', 0, -.2), '白底橘框標籤「常常研究：成分表」', { sfx: 'pop-card' });
    Q25.forEach(([, , w], k) => K.pop(S, ['#t25' + k, '#l25' + k], S.word(w, 0, -.15), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
    S.to(Q25.map((_, k) => '#t25' + k), { boxShadow: K.RING, duration: .3 }, S.word('非常重要', 0, -.2), '念到「非常重要」：三塊一起加橘框');
    S.sfx(S.word('非常重要', 0, -.2), 'ding-soft', '亮起：輕「叮」');
  },
});

// ---------- 幕 26–27｜WSAVA 建議問廠商四個問題（手機對話：飼料廠商） ----------
const Q26 = [
  ['配方有合格的動物營養專業人員參與設計嗎？', '第一'], ['配方是由誰負責？', '第二'],
  ['原料和成品有品質控管嗎？', '第三'], ['有做營養研究、發表成果嗎？', '第四'],
];
K.scene('26', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；左邊大標「WSAVA 建議」／「問廠商這四個問題」（橘），下方歪頭的黑柴', '右邊手機對話畫面（暖橘色頂部），標題「飼料廠商」；念到「第一」「第二」：問題 1、2 依序以對話泡泡冒出：配方有合格的動物營養專業人員參與設計嗎？／配方是由誰負責？'],
  mount: () => K.h('h26', ['WSAVA 建議', '<b class="o">問廠商這四個問題</b>'], { y: 220, size: 84 }) + K.dog('tilt', { id: 'dg26', x: 300, y: 520, w: 280 }) +
    K.phone('ph26', `<div style="position:absolute;left:30px;right:30px;top:250px;display:flex;flex-direction:column;gap:22px">${Q26.map(([q], k) => `<div class="qb" id="r26${k}" style="font-size:30px"><b style="font-family:'Bricolage Grotesque';margin-right:10px">${k + 1}</b>${q}</div>`).join('')}</div>`, { title: '飼料廠商' }).replace('class="phone"', 'class="phone warm"'),
  init() { K.hideLines('h26', 2); gsap.set('#ph26', { y: 900 }); gsap.set('#dg26', { opacity: 0 }); gsap.set(Q26.map((_, k) => '#r26' + k), { opacity: 0, transformOrigin: '100% 100%' }); },
  animate(S) {
    K.phoneIn(S, '#ph26');
    K.lines(S, 'h26', 2, S.at(0), '大標「WSAVA 建議，問廠商這四個問題」');
    K.dogIn(S, '#dg26', S.at(0) + .5, '歪頭的黑柴');
    [0, 1].forEach(k => {
      const t = S.word(Q26[k][1], 0, -.2);
      S.fromTo('#r26' + k, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)' }, t, `念到「${Q26[k][1]}」：問題 ${k + 1} 的對話泡泡冒出`);
      S.sfx(t, 'pop', '泡泡：「啵」', { pitch: 1 + k * .1 });
    });
  },
});
K.scene('27', 1, {
  enter: 'none',
  visuals: ['（接續手機對話）念到「第三」「第四」：問題 3、4 的對話泡泡依序冒出：原料和成品有品質控管嗎？／有做營養研究、發表成果嗎？'],
  animate(S) {
    [2, 3].forEach(k => {
      const t = S.word(Q26[k][1], 0, -.2);
      S.fromTo('#r26' + k, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)' }, t, `念到「${Q26[k][1]}」：問題 ${k + 1} 的對話泡泡冒出`);
      S.sfx(t, 'pop', '泡泡：「啵」', { pitch: 1 + k * .1 });
    });
  },
});

// ---------- 幕 28｜說得出來 vs 答不出來 → 保持謹慎 ----------
K.scene('28', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「不用查得一清二楚，」／「重點是廠商說不說得出來」（橘）', '念到「重視產品品質」：左卡浮上：工廠「說得出怎麼設計、管理」；念到「設計和管理」：右上角大大的綠色打勾', '念到「答不出來」：右卡浮上：對話框「答不出來、不願意提供」', '念到「保持謹慎」：右卡蓋上擺正的印章「保持謹慎」'],
  mount: () => K.h('h28', ['不用查得一清二楚，', '<b class="o">重點是廠商說不說得出來</b>'], { y: 160, size: 76 }) +
    K.vcard('c280', { x: 200, y: 400, w: 700, h: 400, ic: 'Factory', t: '說得出怎麼設計、管理', ts: 42 }) +
    `<div class="abs" id="k280" style="left:800px;top:360px">${K.chk().replace('class="chk"', 'class="chk" style="width:110px;height:110px;margin:0"').replace('width="22" height="22"', 'width="60" height="60"')}</div>` +
    K.vcard('c281', { x: 1020, y: 400, w: 700, h: 400, ic: 'Chat', t: '答不出來、不願意提供', ts: 42 }) +
    `<div class="stamp" id="sp28" style="left:1240px;top:690px">保持謹慎</div>`,
  init() { K.hideLines('h28', 2); gsap.set(['#c280', '#c281', '#k280'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h28', 2, S.at(0), '大標「不用查得一清二楚，重點是廠商說不說得出來」');
    K.rise(S, '#c280', S.word('重視產品品質', 0, -.2), '左卡「說得出怎麼設計、管理」浮上', { sfx: 'pop-card' });
    K.pop(S, '#k280', S.word('設計和管理', 0, -.1), '左卡右上角大大的綠色打勾');
    K.rise(S, '#c281', S.word('答不出來', 0, -.2), '右卡「答不出來、不願意提供」浮上', { sfx: 'pop-card' });
    K.stamp(S, '#sp28', S.word('保持謹慎', 0, -.2), '右卡蓋上擺正的印章「保持謹慎」', { straight: true });
  },
});

// ---------- 幕 29–30｜台灣買得到的飼料：中文標示清單 ----------
const LB29 = ['品名', '重量', '主要原料和添加物', '營養成分及含量', '製造業者', '有效日期', '適用的寵物種類'];
K.scene('29', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「台灣買得到的飼料，」／「也能用這套方法」（橘）'],
  mount: () => K.h('h29', ['台灣買得到的飼料，', '<b class="o">也能用這套方法</b>'], { y: 200, size: 76 }) +
    K.pill('p29', '依《動物保護法》', 140, 560, 'o', { fs: 38 }) +
    K.bag('lb29', LB29.map((t, k) => `<div class="lrow" id="lr29${k}">${t}${K.chk()}</div>`).join('') +
      `<div class="lrow" id="lr29x" style="color:#A29D97;border:3px dashed #E5484D;border-radius:16px;margin:8px 20px;height:70px;padding:0 20px">沒有要求標示營養是否完整</div>`, { x: 1060, y: 130, w: 720, h: 780, title: '中文標示' }),
  init() { K.hideLines('h29', 2); gsap.set(['#p29', '#lr29x'], { opacity: 0 }); gsap.set('#lb29', { opacity: 0, y: 60 }); gsap.set('#lb29 .chk', { opacity: 0, scale: .4 }); gsap.set(LB29.map((_, k) => '#lr29' + k), { opacity: .3 }); },
  animate(S) {
    K.lines(S, 'h29', 2, S.at(0), '大標「台灣買得到的飼料，也能用這套方法」');
  },
});
K.scene('29b', 1, {
  enter: 'none',
  visuals: ['（接續）念到「《動物保護法》」：橘色標籤「依《動物保護法》」，右邊一張中文標示清單浮上', '念到哪一項，那一項亮起、打綠色勾：品名、重量、主要原料和添加物、營養成分及含量、製造業者、有效日期、適用的寵物種類'],
  animate(S) {
    const t = S.word('動物保護法', 0, -.3);
    K.pop(S, '#p29', t, '橘色標籤「依《動物保護法》」', { sfx: 'pop-card' });
    S.to('#lb29', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, t + .1, '右邊一張中文標示清單浮上');
    S.sfx(t + .1, 'slide', '清單浮上：輕「咻」');
    LB29.forEach((w, k) => {
      const tk = S.word(w === '主要原料和添加物' ? '主要原料' : w === '適用的寵物種類' ? '寵物種類' : w, 0, -.1);
      S.to('#lr29' + k, { opacity: 1, duration: .2 }, tk, k ? '' : '念到哪一項，那一項亮起、打綠色勾');
      S.to(`#lr29${k} .chk`, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2.5)' }, tk + .05);
      S.sfx(tk + .05, 'pop', '打勾：「啵」', { pitch: 1 + k * .06, gain: .7 });
    });
  },
});
K.scene('30', 1, {
  enter: 'none',
  visuals: ['（接續標示清單）念到「沒有統一的格式」：「營養成分及含量」那一行變淡藍，旁邊藍色手寫「← 沒有統一格式」', '念到「沒有要求標示營養是否完整」：清單最下面多一行紅色虛線「沒有要求標示營養是否完整」', '念到「不一定能判斷」：左下橘字「只看中文標示，不一定能判斷營養完整」'],
  mount: () => K.anno('an30', '', '← 沒有統一格式', { x: 1340, y: 480, ss: 28, align: 'left' }) +
    K.concl('cn30', '只看中文標示，<br><span style="color:#16130F">不一定能判斷營養完整</span>', { y: 700, size: 50 }),
  init() { gsap.set(['#an30', '#cn30'], { opacity: 0 }); },
  animate(S) {
    const t = S.word('統一的格式', 0, -.3);
    S.to('#p29', { opacity: 0, duration: .3 }, t);
    S.to('#lr293', { backgroundColor: '#E6EEFB', duration: .3 }, t, '「營養成分及含量」那一行變淡藍');
    K.fadeIn(S, '#an30', t + .1, '藍色手寫「← 沒有統一格式」');
    K.rise(S, '#lr29x', S.word('營養是否完整', 0, -.4), '清單最下面多一行紅色虛線「沒有要求標示營養是否完整」', { dy: 20, sfx: 'pop-low' });
    K.showConcl(S, '#cn30', S.word('不一定能判斷', 0, -.3), '左下橘字「只看中文標示，不一定能判斷營養完整」');
  },
});

// ---------- 幕 31｜直接問廠商三個問題（手機對話：飼料廠商） ----------
const Q31 = [['請問這款產品是依照哪一種營養標準設計的？', '哪一種營養標準'], ['適合哪個生命階段？', '適合哪個生命階段'], ['有沒有完整營養的相關資料可以參考？', '相關資料']];
K.scene('31', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「包裝沒寫清楚？」／「直接問廠商」（橘）', '念到「國產飼料」「沒有清楚寫出」：兩個白底橘框標籤：國產飼料、包裝沒寫營養標準', '右邊手機對話畫面（暖橘色頂部，和幕 26 一樣），標題「飼料廠商」；念到時三個藍色泡泡依序冒出：請問這款產品是依照哪一種營養標準設計的？／適合哪個生命階段？／有沒有完整營養的相關資料可以參考？', '念到「行銷文案」：左下橘字「比看行銷文案，更能了解產品」'],
  mount: () => K.h('h31', ['包裝沒寫清楚？', '<b class="o">直接問廠商</b>'], { y: 200, size: 88 }) +
    K.pill('g310', '國產飼料', 140, 480, 'ob', { fs: 34 }) + K.pill('g311', '包裝沒寫營養標準', 420, 480, 'ob', { fs: 34 }) +
    K.phone('ph31', `<div style="position:absolute;left:30px;right:30px;top:260px;display:flex;flex-direction:column;gap:22px">${Q31.map(([q], k) => `<div class="qb" id="qb31${k}" style="font-size:30px">${q}</div>`).join('')}</div>`, { title: '飼料廠商' }).replace('class="phone"', 'class="phone warm"') +
    K.concl('cn31', '比看行銷文案，<br><span style="color:#16130F">更能了解產品</span>', { y: 640, size: 56 }),
  init() { K.hideLines('h31', 2); gsap.set('#ph31', { y: 900 }); gsap.set(['#g310', '#g311', '#cn31'].concat(Q31.map((_, k) => '#qb31' + k)), { opacity: 0 }); },
  animate(S) {
    K.phoneIn(S, '#ph31');
    K.lines(S, 'h31', 2, S.at(0), '大標「包裝沒寫清楚？直接問廠商」');
    K.pop(S, '#g310', S.word('國產飼料', 0, -.1), '白底橘框標籤「國產飼料」', { sfx: 'pop-card' });
    K.pop(S, '#g311', S.word('沒有清楚寫出', 0, -.1), '白底橘框標籤「包裝沒寫營養標準」', { sfx: 'pop-card', pitch: 1.1 });
    Q31.forEach(([, w], k) => {
      const t = S.word(w, 0, -.6);
      gsap.set('#qb31' + k, { transformOrigin: '100% 100%' });
      S.fromTo('#qb31' + k, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)' }, t, k ? '' : '念到時藍色泡泡依序冒出');
      S.sfx(t, 'pop', '泡泡：「啵」', { pitch: 1 + k * .1 });
    });
    K.showConcl(S, '#cn31', S.word('行銷文案', 0, -.3), '左下橘字「比看行銷文案，更能了解產品」');
  },
});
