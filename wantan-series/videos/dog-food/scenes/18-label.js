// 幕 18–31｜第一步：挑飼料先看這四件事（參考 WSAVA 選購指引）＋台灣買得到的飼料

// ---------- 幕 18｜章節卡 ----------
const F18 = [['Label', '營養聲明'], ['Calendar', '生命階段'], ['Flame', '熱量'], ['Factory', '廠商資訊']];
K.scene('18', 1, {
  enter: 'iris', irisAt: [1400, 500], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 01｜第一步」，大標「挑飼料先看這四件事，」／「不要只看成分表」（橘）', '念到「四件事」：右邊四塊圖示磚依序彈出：營養聲明、生命階段、熱量、廠商資訊', '念到「世界小動物獸醫協會」：下方標籤「參考：世界小動物獸醫協會（WSAVA）選購指引」'],
  mount: () => K.chap('18', 1, ['挑飼料先看這四件事，', '<b class="o">不要只看成分表</b>'], { size: 80 }) +
    F18.map(([ic, t], k) => K.tile(ic, { id: 't18' + k, x: 1100 + (k % 2) * 330, y: 240 + Math.floor(k / 2) * 280, size: 180 }) +
      `<div class="abs" id="l18${k}" style="left:${1100 + (k % 2) * 330 - 35}px;top:${435 + Math.floor(k / 2) * 280}px;width:250px;text-align:center;font-size:30px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:6px">${k + 1}</span>${t}</div>`).join('') +
    K.ipill('p18', 'Globe', '參考：世界小動物獸醫協會（WSAVA）選購指引', 140, 760, 'bt', { fs: 32 }),
  init() { K.hideLines('h18', 2); gsap.set('#p18', { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '18', S.at(0));
    F18.forEach((_, k) => K.pop(S, ['#t18' + k, '#l18' + k], S.word('四件事', 0, -.2 + k * .2), k ? '' : '右邊四塊圖示磚依序彈出', { pitch: 1 + k * .08, sfx: 'pop-card' }));
    K.rise(S, '#p18', S.word('世界小動物', 0, -.2), '下方標籤「參考：世界小動物獸醫協會（WSAVA）選購指引」');
  },
});

// ---------- 幕 19–20｜一、營養完整的聲明（包裝背面） ----------
const backRows = `<div style="padding:20px 40px 0"><div class="k" style="color:#9A9590">成分</div>
  <div id="ing19" style="display:flex;gap:14px;margin:12px 0 16px">${['Meat', 'Veg', 'Grain'].map(ic => `<div style="width:84px;height:84px;border-radius:22px;background:#F4F3F1;padding:10px">${K.ic(ic)}</div>`).join('')}<div style="flex:1"><div class="ln2" style="width:90%;margin-top:14px"></div><div class="ln2" style="width:70%"></div></div></div>
  <div class="k" style="color:#9A9590">營養成分</div><div style="margin-top:12px"><div class="ln2" style="width:100%"></div><div class="ln2" style="width:85%"></div><div class="ln2" style="width:92%"></div></div></div>`;
K.scene('19', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「第一件事」，大標「看有沒有」／「營養完整的聲明」（橘）', '右邊一包飼料的背面：成分（肉、蔬菜、穀物）、營養成分、最下面一格聲明', '念到「先不要急著看它用了什麼肉」：成分那一區變淡', '念到「生命階段的營養標準」：聲明格亮起、加橘框，放大鏡移過去；念到「AAFCO 成犬維持」：聲明格打字「符合 AAFCO 成犬維持營養標準」'],
  mount: () => K.kicker('k19', '01', '第一件事', { y: 230 }) + K.h('h19', ['看有沒有', '<b class="o">營養完整的聲明</b>'], { y: 290, size: 96 }) +
    K.bag('bg19', backRows + `<div class="stm" id="st19" style="margin-top:6px"><span class="k">營養聲明</span><span id="ty19" data-text="符合 AAFCO 成犬維持營養標準"></span></div>`, { x: 1100, y: 150, w: 640, h: 760, title: '包裝背面' }) +
    K.icon('mg19', 'Magnifier', 1560, 330, 200),
  init() { K.hideLines('h19', 2); gsap.set('#bg19', { opacity: 0, y: 60 }); gsap.set('#mg19', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k19', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h19', 2, S.at(0) + .1, '大標「看有沒有營養完整的聲明」');
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

// ---------- 幕 21–21b｜二、適合哪個生命階段 ----------
const AG21 = [['ball', '幼犬', '幼犬'], ['sit', '成犬', '成犬'], ['rest', '老犬', '老犬']];
const agCard = (id, pose, t, x, y, w = 400) => `<div class="cd" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:360px;padding:30px;text-align:center"><div style="height:220px;position:relative">${K.dog(pose, { x: (w - 60 - (pose === 'rest' ? 240 : 170)) / 2, y: pose === 'rest' ? 50 : 0, w: pose === 'rest' ? 240 : 170, shadow: false })}</div><div class="t" style="font-size:44px;margin-top:10px">${t}</div></div>`;
K.scene('21', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「第二件事」，大標「看它適合」／「哪個生命階段」（橘）', '念到時三張卡依序浮上：幼犬（玩球的黑柴）、成犬（坐著）、老犬（趴著），卡片之間「≠」', '念到「正在成長的幼犬」：幼犬卡加橘框，下面橘色標籤「成長期的完整營養」'],
  mount: () => K.kicker('k21', '02', '第二件事', { y: 130 }) + K.h('h21', ['看它適合<b class="o">哪個生命階段</b>'], { y: 180, size: 84 }) +
    AG21.map(([p, t], k) => agCard('c21' + k, p, t, 140 + k * 560, 340)).join('') +
    [0, 1].map(k => `<div class="abs big ne21" id="ne21${k}" style="left:${575 + k * 560}px;top:440px;font-size:100px;color:var(--or)">≠</div>`).join('') +
    K.pill('p210', '成長期的完整營養', 175, 740, 'ot', { fs: 34 }),
  init() { K.hideLines('h21', 1); gsap.set(['#c210', '#c211', '#c212', '#ne210', '#ne211', '#p210'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k21', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h21', 1, S.at(0) + .1, '大標「看它適合哪個生命階段」');
    AG21.forEach(([, , w], k) => K.rise(S, '#c21' + k, S.word(w, 0, -.15), k ? '' : '念到時三張卡依序浮上', { sfx: 'pop-card', pitch: 1 + k * .08 }));
    K.pop(S, ['#ne210', '#ne211'], S.word('不完全相同', 0, -.2), '卡片之間「≠」', { stagger: .1, sfx: 'pop-low' });
    K.ring(S, '#c210', S.word('正在成長', 0, -.2));
    K.rise(S, '#p210', S.word('成長期的完整營養', 0, -.2), '幼犬卡加橘框，下面標籤「成長期的完整營養」', { sfx: 'pop-card', dy: 20 });
  },
});
K.scene('21b', 1, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）', '（接續）念到「成犬則要依照」：成犬卡加橘框，下面標籤「依生命階段和健康狀況」', '念到「很有名」：三張卡退場，換成兩個灰色虛線標籤「很有名」「朋友家的狗狗吃得很好」被打叉', '念到「別人的狗狗適合」：下方橘字「別人家適合，不代表你家也適合」'],
  mount: () => K.pill('p211', '依生命階段和健康狀況', 700, 740, 'ot', { fs: 34 }) +
    K.pill('g210', '很有名', 360, 460, 'gh', { fs: 44 }) + K.pill('g211', '朋友家的狗狗吃得很好', 760, 460, 'gh', { fs: 44 }) +
    K.xm('x21', 1300, 440) +
    K.concl('cn21', '別人家適合，<span style="color:#16130F">不代表你家也適合</span>', { y: 840, size: 56, center: true }),
  init() { gsap.set(['#p211', '#g210', '#g211', '#x21', '#cn21'], { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#c210', S.word('成犬', 0, -.2), false);
    K.ring(S, '#c211', S.word('成犬', 0, -.2));
    K.rise(S, '#p211', S.word('健康狀況', 0, -.4), '成犬卡加橘框，下面標籤「依生命階段和健康狀況」', { sfx: 'pop-card', dy: 20 });
    const t = S.word('很有名', 0, -.3);
    K.ring(S, '#c211', t, false);
    S.to(['#c210', '#c211', '#c212', '#ne210', '#ne211', '#p210', '#p211'], { opacity: 0, duration: .4 }, t, '三張卡退場');
    K.pop(S, '#g210', t + .1, '灰色虛線標籤「很有名」', { sfx: 'pop-low' });
    K.pop(S, '#g211', S.word('朋友家', 0, -.1), '灰色虛線標籤「朋友家的狗狗吃得很好」', { sfx: 'pop-low' });
    K.xIn(S, '#x21', S.word('直接買給', 0, -.1), '打叉');
    K.showConcl(S, '#cn21', S.word('別人的狗狗', 0, -.2), '下方橘字「別人家適合，不代表你家也適合」');
  },
});

// ---------- 幕 22｜三、熱量是多少 ----------
K.scene('22', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底；小標「第三件事」，大標「看熱量」／「是多少」（橘）；右邊熱量火焰圖示磚', '念到「你可能會想」：對話泡泡「我買的是飼料，又不是減肥食品」', '念到「吃太多」：體重計圖示＋藍色手寫「吃太多 → 體重增加」', '念到「只有美國」：兩個標籤：「美國：一定要寫」（藍）、「其他地方：不一定有」（灰色虛線）'],
  mount: () => K.kicker('k22', '03', '第三件事', { y: 230 }) + K.h('h22', ['看熱量', '<b class="o">是多少</b>'], { y: 290, size: 110 }) +
    K.tile('Flame', { id: 't22', x: 1500, y: 180, size: 240 }) +
    `<div class="qb" id="q22" style="position:absolute;left:700px;top:260px;font-size:34px;max-width:640px">我買的是飼料，又不是減肥食品，<br>為什麼要看熱量？</div>` +
    K.icon('sc22', 'Scale', 1060, 470, 200) + K.anno('an22', '', '吃太多 → 體重增加', { x: 1290, y: 540, ss: 40, align: 'left' }) +
    K.pill('us22', '美國：一定要寫', 140, 760, 'b', { fs: 38 }) + K.pill('ot22', '其他地方：不一定有', 560, 760, 'gh', { fs: 38 }),
  init() { K.hideLines('h22', 2); gsap.set(['#q22', '#sc22', '#an22', '#us22', '#ot22'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k22', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h22', 2, S.at(0) + .1, '大標「看熱量是多少」');
    K.pop(S, '#t22', S.word('熱量', 0, -.1), '右邊熱量火焰圖示磚');
    K.pop(S, '#q22', S.word('你可能會想', 0, -.1), '對話泡泡「我買的是飼料，又不是減肥食品，為什麼要看熱量？」', { sfx: 'pop-card', from: .8 });
    S.to('#q22', { opacity: .35, duration: .3 }, S.word('吃太多', 0, -.3));
    K.pop(S, '#sc22', S.word('吃太多', 0, -.2), '體重計圖示');
    K.fadeIn(S, '#an22', S.word('體重增加', 0, -.3), '藍色手寫「吃太多 → 體重增加」');
    K.pop(S, '#us22', S.word('只有美國', 0, -.1), '藍色標籤「美國：一定要寫」', { sfx: 'pop-card' });
    K.pop(S, '#ot22', S.word('其他地方', 0, -.1), '灰色虛線標籤「其他地方：不一定有」', { sfx: 'pop-low' });
  },
});

// ---------- 幕 23｜包裝熱量 × 餵食量；建議餵食量只是起點（手機畫面） ----------
K.scene('23', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底；左邊大標「包裝熱量 × 餵食量」／「估算實際攝取」（橘）', '右邊手機畫面「算算熱量」：念到時三張資料卡依序滑入：包裝標示 每公斤、每杯或每份的熱量 → × 每天的餵食量 → ＝ 實際攝取多少熱量', '念到「沒有標示」：藍色標籤「沒標示 → 問廠商」', '念到「只是起點」：大標換成「建議餵食量」／「只是起點」，三個標籤：體態、活動量、體重變化；最後橘字「觀察後再調整」'],
  mount: () => K.h('h23a', ['包裝熱量 × 餵食量', '<b class="o">估算實際攝取</b>'], { y: 200, size: 80 }) +
    K.h('h23b', ['建議餵食量', '<b class="o">只是起點</b>'], { y: 200, size: 80 }) +
    K.phone('ph23', `<div class="rows">${[['包裝標示', '每公斤、每杯或每份的熱量'], ['×', '每天的餵食量'], ['＝', '實際攝取多少熱量']].map(([a, b], k) => `<div class="row" id="r23${k}"><span class="when" style="width:120px">${a}</span><span class="what">${b}</span></div>`).join('')}</div>`, { title: '算算熱量' }) +
    K.ipill('p23', 'Chat', '沒標示 → 問廠商', 140, 470, 'bt', { fs: 34 }) +
    ['體態', '活動量', '體重變化'].map((t, k) => K.pill('o23' + k, t, 140 + k * 250, 520, '', { fs: 38 })).join('') +
    K.concl('cn23', '觀察後，再做調整', { y: 700, size: 60 }),
  init() { K.hideLines('h23a', 2); K.hideLines('h23b', 2); gsap.set('#ph23', { y: 900 }); gsap.set(['#p23', '#o230', '#o231', '#o232', '#cn23'], { opacity: 0 }); },
  animate(S) {
    K.phoneIn(S, '#ph23');
    K.lines(S, 'h23a', 2, S.at(0), '大標「包裝熱量 × 餵食量，估算實際攝取」');
    [['每公斤', 0], ['餵食量', 1], ['實際攝取', 2]].forEach(([w, k]) => {
      const t = S.word(w, 0, -.3);
      if (k) S.to('#r23' + (k - 1), { boxShadow: K.ROW0, duration: .3 }, t);
      K.rise(S, '#r23' + k, t, k ? '' : '念到時三張資料卡依序滑入、加橘框', { dx: 60, dy: 0 });
      S.to('#r23' + k, { boxShadow: K.ROW1, duration: .3 }, t + .2);
    });
    K.pop(S, '#p23', S.word('沒有標示', 0, -.1), '藍色標籤「沒標示 → 問廠商」', { sfx: 'pop-card' });
    const t = S.word('只是起點', 0, -.6);
    S.to('#p23', { opacity: 0, duration: .3 }, t);
    S.to('#r232', { boxShadow: K.ROW0, duration: .3 }, t);
    K.swapH(S, 'h23a', 2, 'h23b', 2, t, '大標換成「建議餵食量，只是起點」');
    ['體態', '活動量', '體重變化'].forEach((w, k) => K.pop(S, '#o23' + k, S.word(w, 0, -.1), k ? '' : '三個標籤依序彈出：體態、活動量、體重變化', { pitch: 1 + k * .1 }));
    K.showConcl(S, '#cn23', S.word('再做調整', 0, -.4), '橘字「觀察後，再做調整」');
  },
});

// ---------- 幕 24–25｜四、廠商願不願意提供資訊 ----------
const Q25 = [['Person', '誰設計的？', '誰設計'], ['Factory', '怎麼製造？', '怎麼製造'], ['Flask', '有沒有品質檢驗？', '品質檢驗']];
K.scene('24', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底；小標「第四件事」，大標「看廠商願不願意」／「提供相關資訊」（橘）；右邊工廠圖示磚', '念到「容易忽略」：藍色手寫「很多人忽略這一點」＋箭頭指向工廠'],
  mount: () => K.kicker('k24', '04', '第四件事', { y: 150 }) + K.h('h24', ['看廠商願不願意', '<b class="o">提供相關資訊</b>'], { y: 210, size: 88 }) +
    K.tile('Factory', { id: 't24', x: 1450, y: 200, size: 260 }) +
    K.anno('an24', '', '很多人忽略這一點', { x: 1060, y: 520, ss: 38, align: 'left' }) +
    K.arrow('ar24', { x: 1380, y: 420, w: 160, h: 120, d: 'M10 110 C 60 100 110 70 140 20' }),
  init() { K.hideLines('h24', 2); gsap.set(['#an24'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k24', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h24', 2, S.at(0) + .1, '大標「看廠商願不願意提供相關資訊」');
    K.pop(S, '#t24', S.word('廠商', 0, -.1), '右邊工廠圖示磚');
    K.fadeIn(S, '#an24', S.word('容易忽略', 0, -.3), '藍色手寫「很多人忽略這一點」');
    K.draw(S, '#ar24', S.word('容易忽略', 0, -.1), '箭頭指向工廠', .4);
  },
});
K.scene('25', 1, {
  enter: 'none',
  visuals: ['（接續）念到「研究成分表」：灰色標籤「常常研究：成分表」', '念到時三塊圖示磚依序彈出（附問號）：誰設計的？、怎麼製造？、有沒有品質檢驗？', '念到「非常重要」：三塊一起加橘框'],
  mount: () => K.ipill('g25', 'Label', '常常研究：成分表', 140, 480, 'gh', { fs: 34 }) +
    Q25.map(([ic, t], k) => K.tile(ic, { id: 't25' + k, x: 140 + k * 320, y: 600, size: 170 }) +
      `<div class="abs" id="l25${k}" style="left:${140 + k * 320 - 50}px;top:790px;width:270px;text-align:center;font-size:32px;font-weight:900">${t}</div>`).join(''),
  init() { gsap.set(['#g25'].concat(Q25.map((_, k) => '#l25' + k)), { opacity: 0 }); },
  animate(S) {
    S.to('#an24', { opacity: 0, duration: .3 }, S.at(0));
    S.to('#ar24', { opacity: 0, duration: .3 }, S.at(0));
    K.pop(S, '#g25', S.word('研究成分表', 0, -.2), '灰色標籤「常常研究：成分表」', { sfx: 'pop-low' });
    Q25.forEach(([, , w], k) => K.pop(S, ['#t25' + k, '#l25' + k], S.word(w, 0, -.15), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
    S.to(Q25.map((_, k) => '#t25' + k), { boxShadow: K.RING, duration: .3, stagger: .08 }, S.word('非常重要', 0, -.2), '念到「非常重要」：三塊一起加橘框');
    S.sfx(S.word('非常重要', 0, -.2), 'ding-soft', '亮起：輕「叮」');
  },
});

// ---------- 幕 26–27｜WSAVA 建議問廠商四個問題（手機畫面） ----------
const Q26 = [
  ['配方有合格的動物營養專業人員參與設計嗎？', '第一'], ['配方是由誰負責？', '第二'],
  ['原料和成品有品質控管嗎？', '第三'], ['有做營養研究、發表成果嗎？', '第四'],
];
K.scene('26', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；左邊大標「WSAVA 建議」／「問廠商這四個問題」（橘），下方歪頭的黑柴', '右邊手機畫面「問廠商」，念到「第一」「第二」：問題 1、2 依序滑入、加橘框：配方有合格的動物營養專業人員參與設計嗎？／配方是由誰負責？'],
  mount: () => K.h('h26', ['WSAVA 建議', '<b class="o">問廠商這四個問題</b>'], { y: 220, size: 84 }) + K.dog('tilt', { id: 'dg26', x: 300, y: 520, w: 280 }) +
    K.phone('ph26', `<div class="rows" style="top:250px">${Q26.map(([q], k) => `<div class="row" id="r26${k}"><span class="big" style="font-size:52px;color:var(--or);width:46px;flex:none">${k + 1}</span><span class="what" style="font-size:29px">${q}</span></div>`).join('')}</div>`, { title: '問廠商' }),
  init() { K.hideLines('h26', 2); gsap.set('#ph26', { y: 900 }); gsap.set('#dg26', { opacity: 0 }); gsap.set(Q26.map((_, k) => '#r26' + k), { opacity: 0 }); },
  animate(S) {
    K.phoneIn(S, '#ph26');
    K.lines(S, 'h26', 2, S.at(0), '大標「WSAVA 建議，問廠商這四個問題」');
    K.dogIn(S, '#dg26', S.at(0) + .5, '歪頭的黑柴');
    [0, 1].forEach(k => {
      const t = S.word(Q26[k][1], 0, -.2);
      if (k) S.to('#r26' + (k - 1), { boxShadow: K.ROW0, duration: .3 }, t);
      K.rise(S, '#r26' + k, t, `念到「${Q26[k][1]}」：問題 ${k + 1} 滑入、加橘框`, { dx: 60, dy: 0, sfx: 'pop-card' });
      S.to('#r26' + k, { boxShadow: K.ROW1, duration: .3 }, t + .2);
    });
  },
});
K.scene('27', 1, {
  enter: 'none',
  visuals: ['（接續手機畫面）念到「第三」「第四」：問題 3、4 依序滑入、加橘框：原料和成品有品質控管嗎？／有做營養研究、發表成果嗎？'],
  animate(S) {
    [2, 3].forEach(k => {
      const t = S.word(Q26[k][1], 0, -.2);
      S.to('#r26' + (k - 1), { boxShadow: K.ROW0, duration: .3 }, t);
      K.rise(S, '#r26' + k, t, `念到「${Q26[k][1]}」：問題 ${k + 1} 滑入、加橘框`, { dx: 60, dy: 0, sfx: 'pop-card' });
      S.to('#r26' + k, { boxShadow: K.ROW1, duration: .3 }, t + .2);
    });
  },
});

// ---------- 幕 28｜說得出來 vs 答不出來 → 保持謹慎 ----------
K.scene('28', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「不用查得一清二楚，」／「重點是廠商說不說得出來」（橘）', '念到「重視產品品質」：左卡浮上、打勾：工廠「說得出怎麼設計、管理」', '念到「答不出來」：右卡浮上：對話框「答不出來、不願意提供」', '念到「保持謹慎」：右卡蓋上印章「保持謹慎」'],
  mount: () => K.h('h28', ['不用查得一清二楚，', '<b class="o">重點是廠商說不說得出來</b>'], { y: 160, size: 76 }) +
    K.vcard('c280', { x: 200, y: 400, w: 700, h: 400, ic: 'Factory', t: '說得出怎麼設計、管理', ts: 42 }) +
    `<div class="abs" id="k280" style="left:820px;top:380px">${K.chk().replace('class="chk"', 'class="chk" style="width:70px;height:70px;margin:0"')}</div>` +
    K.vcard('c281', { x: 1020, y: 400, w: 700, h: 400, ic: 'Chat', t: '答不出來、不願意提供', ts: 42 }) +
    `<div class="stamp" id="sp28" style="left:1240px;top:690px">保持謹慎</div>`,
  init() { K.hideLines('h28', 2); gsap.set(['#c280', '#c281', '#k280'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h28', 2, S.at(0), '大標「不用查得一清二楚，重點是廠商說不說得出來」');
    K.rise(S, '#c280', S.word('重視產品品質', 0, -.2), '左卡「說得出怎麼設計、管理」浮上', { sfx: 'pop-card' });
    K.pop(S, '#k280', S.word('設計和管理', 0, -.1), '左卡打勾');
    K.rise(S, '#c281', S.word('答不出來', 0, -.2), '右卡「答不出來、不願意提供」浮上', { sfx: 'pop-card' });
    K.stamp(S, '#sp28', S.word('保持謹慎', 0, -.2), '右卡蓋上印章「保持謹慎」');
  },
});

// ---------- 幕 29–30｜台灣的中文標示（包裝標示清單） ----------
const LB29 = ['品名', '重量', '主要原料和添加物', '營養成分及含量', '製造業者', '有效日期', '適用的寵物種類'];
K.scene('29', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「台灣買得到的飼料」，大標「也能用這套方法」（橘）', '念到「可以，但有一點要特別注意」：藍色手寫「但有一點要注意」', '念到「《動物保護法》」：橘色標籤「依《動物保護法》」', '右邊一張中文標示清單，念到哪一項打勾哪一項：品名、重量、主要原料和添加物、營養成分及含量、製造業者、有效日期、適用的寵物種類'],
  mount: () => K.ey('k29', '台灣買得到的飼料', 140, 200) + K.h('h29', ['也能用', '<b class="o">這套方法</b>'], { y: 250, size: 100 }) +
    K.anno('an29', '', '但有一點要注意', { x: 140, y: 530, ss: 38, align: 'left' }) +
    K.pill('p29', '依《動物保護法》', 140, 620, 'o', { fs: 38 }) +
    K.bag('lb29', LB29.map((t, k) => `<div class="lrow" id="lr29${k}">${t}${K.chk()}</div>`).join('') +
      `<div class="lrow" id="lr29x" style="color:#A29D97;border:3px dashed #E5484D;border-radius:16px;margin:8px 20px;height:70px;padding:0 20px">營養是否完整：沒有要求標示</div>`, { x: 1060, y: 130, w: 720, h: 780, title: '中文標示' }),
  init() { K.hideLines('h29', 2); gsap.set(['#an29', '#p29', '#lr29x'], { opacity: 0 }); gsap.set('#lb29', { opacity: 0, y: 60 }); gsap.set('#lb29 .chk', { opacity: 0, scale: .4 }); gsap.set(LB29.map((_, k) => '#lr29' + k), { opacity: .3 }); },
  animate(S) {
    K.eyIn(S, 'k29', S.at(0));
    K.lines(S, 'h29', 2, S.word('可以', 0, -.3), '念到「可以」：大標「也能用這套方法」');
    K.fadeIn(S, '#an29', S.word('特別注意', 0, -.3), '藍色手寫「但有一點要注意」');
    const t = S.word('動物保護法', 0, -.3);
    K.pop(S, '#p29', t, '橘色標籤「依《動物保護法》」', { sfx: 'pop-card' });
    S.to('#lb29', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, t + .1, '右邊一張中文標示清單浮上');
    S.sfx(t + .1, 'slide', '清單浮上：輕「咻」');
    LB29.forEach((w, k) => {
      const tk = S.word(w === '主要原料和添加物' ? '主要原料' : w === '適用的寵物種類' ? '寵物種類' : w, 0, -.1);
      S.to('#lr29' + k, { opacity: 1, duration: .2 }, tk, k ? '' : '念到哪一項，那一項亮起、打勾');
      S.to(`#lr29${k} .chk`, { opacity: 1, scale: 1, duration: .3, ease: 'back.out(2.5)' }, tk + .05);
      S.sfx(tk + .05, 'pop', '打勾：「啵」', { pitch: 1 + k * .06, gain: .7 });
    });
  },
});
K.scene('30', 1, {
  enter: 'none',
  visuals: ['（接續標示清單）念到「沒有統一的格式」：「營養成分及含量」那一行標藍色手寫「沒有統一格式」', '念到「沒有要求標示營養是否完整」：清單最下面多一行紅色虛線「營養是否完整：沒有要求標示」', '念到「不一定能判斷」：左下橘字「只看中文標示，不一定能判斷營養完整」'],
  mount: () => K.anno('an30', '', '← 沒有統一格式', { x: 1340, y: 480, ss: 28, align: 'left' }) +
    K.concl('cn30', '只看中文標示，<br><span style="color:#16130F">不一定能判斷營養完整</span>', { y: 760, size: 50 }),
  init() { gsap.set(['#an30', '#cn30'], { opacity: 0 }); },
  animate(S) {
    const t = S.word('統一的格式', 0, -.3);
    S.to(['#an29', '#p29'], { opacity: 0, duration: .3 }, t);
    S.to('#lr293', { backgroundColor: '#E6EEFB', duration: .3 }, t, '「營養成分及含量」那一行變淡藍');
    K.fadeIn(S, '#an30', t + .1, '藍色手寫「沒有統一格式」');
    K.rise(S, '#lr29x', S.word('營養是否完整', 0, -.4), '清單最下面多一行紅色虛線「營養是否完整：沒有要求標示」', { dy: 20, sfx: 'pop-low' });
    K.showConcl(S, '#cn30', S.word('不一定能判斷', 0, -.3), '左下橘字「只看中文標示，不一定能判斷營養完整」');
  },
});

// ---------- 幕 31｜直接問廠商三個問題（手機對話） ----------
const Q31 = [['請問這款產品是依照哪一種營養標準設計的？', '哪一種營養標準'], ['適合哪個生命階段？', '適合哪個生命階段'], ['有沒有完整營養的相關資料可以參考？', '相關資料']];
K.scene('31', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「包裝沒寫清楚？」／「直接問廠商」（橘）', '念到「國產飼料」「沒有清楚寫出」：兩個灰色虛線標籤：國產飼料、包裝沒寫營養標準', '右邊手機對話畫面「問廠商」，念到時三個藍色泡泡依序冒出：請問這款產品是依照哪一種營養標準設計的？／適合哪個生命階段？／有沒有完整營養的相關資料可以參考？', '念到「行銷文案」：左下橘字「比看行銷文案，更能了解產品」'],
  mount: () => K.h('h31', ['包裝沒寫清楚？', '<b class="o">直接問廠商</b>'], { y: 200, size: 88 }) +
    K.pill('g310', '國產飼料', 140, 480, 'gh', { fs: 34 }) + K.pill('g311', '包裝沒寫營養標準', 420, 480, 'gh', { fs: 34 }) +
    K.phone('ph31', `<div style="position:absolute;left:30px;right:30px;top:260px;display:flex;flex-direction:column;gap:22px">${Q31.map(([q], k) => `<div class="qb" id="qb31${k}" style="font-size:30px">${q}</div>`).join('')}</div>`, { title: '問廠商' }) +
    K.concl('cn31', '比看行銷文案，<br><span style="color:#16130F">更能了解產品</span>', { y: 640, size: 56 }),
  init() { K.hideLines('h31', 2); gsap.set('#ph31', { y: 900 }); gsap.set(['#g310', '#g311', '#cn31'].concat(Q31.map((_, k) => '#qb31' + k)), { opacity: 0 }); },
  animate(S) {
    K.phoneIn(S, '#ph31');
    K.lines(S, 'h31', 2, S.at(0), '大標「包裝沒寫清楚？直接問廠商」');
    K.pop(S, '#g310', S.word('國產飼料', 0, -.1), '灰色虛線標籤「國產飼料」', { sfx: 'pop-low' });
    K.pop(S, '#g311', S.word('沒有清楚寫出', 0, -.1), '灰色虛線標籤「包裝沒寫營養標準」', { sfx: 'pop-low' });
    Q31.forEach(([, w], k) => {
      const t = S.word(w, 0, -.6);
      gsap.set('#qb31' + k, { transformOrigin: '100% 100%' });
      S.fromTo('#qb31' + k, { opacity: 0, scale: .6 }, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)' }, t, k ? '' : '念到時藍色泡泡依序冒出');
      S.sfx(t, 'pop', '泡泡：「啵」', { pitch: 1 + k * .1 });
    });
    K.showConcl(S, '#cn31', S.word('行銷文案', 0, -.3), '左下橘字「比看行銷文案，更能了解產品」');
  },
});
