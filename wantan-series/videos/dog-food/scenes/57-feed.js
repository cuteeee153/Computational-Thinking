// 幕 57–63｜第四步：一天餵幾餐？零食可以給多少？

// ---------- 幕 57｜章節卡 ----------
K.scene('57', 4, {
  enter: 'iris', irisAt: [1400, 500], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；章節卡「STEP 04｜第四步」，大標「一天餵幾餐？」／「零食可以給多少？」（橘）', '右邊吃飯的黑柴；念到「第一」「第二」：兩張問題卡依序浮上：1 零食到底可以給多少？（肉乾）／2 一天到底該餵幾餐？（時鐘）'],
  mount: () => K.chap('57', 4, ['一天餵幾餐？', '<b class="o">零食可以給多少？</b>'], { size: 88 }) +
    K.dog('food', { id: 'dg57', x: 1440, y: 150, w: 330 }) +
    [['Jerky', '零食到底可以給多少？'], ['Clock', '一天到底該餵幾餐？']].map(([ic, t], k) => K.bar('q57' + k, { x: 140, y: 560 + k * 170, w: 900, h: 140, n: k + 1, ic, t, ts: 40 })).join(''),
  init() { K.hideLines('h57', 2); gsap.set(['#q570', '#q571', '#dg57'], { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '57', S.at(0));
    K.dogIn(S, '#dg57', S.word('飼料挑好了', 0, -.2), '右邊吃飯的黑柴');
    ['第一', '第二'].forEach((w, k) => {
      const t = S.word(w, 0, -.2);
      if (k) K.ring(S, '#q570', t, false);
      K.rise(S, '#q57' + k, t, k ? '' : '念到「第一」「第二」：兩張問題卡依序浮上、加橘框', { sfx: 'pop-card', dx: -40, dy: 0 });
      K.ring(S, '#q57' + k, t + .2);
    });
  },
});

// ---------- 幕 58｜零食不超過每日熱量的 10% ----------
const R58 = 200, C58 = 2 * Math.PI * R58;
const TR58 = [['訓練小點心', 'Paw'], ['肉乾', 'Jerky'], ['潔牙骨', 'DentalBone'], ['人類食物', 'Meat']];
K.scene('58', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「零食」，大標「不要超過」／「每日熱量的 10%」（橘）', '右邊一個圓餅：每天的總熱量；念到「10% 以內」：橘色那一塊長出來，中間大數字跑到 10%', '念到「WSAVA 和塔夫茨大學」：左邊藍色標籤「WSAVA、塔夫茨大學都建議」', '念到時四個標籤依序彈出：訓練小點心、肉乾、潔牙骨、人類食物，藍色手寫「都算零食」'],
  mount: () => K.kicker('k58', 'TREATS', '零食', { y: 150 }) + K.h('h58', ['不要超過', '<b class="o">每日熱量的 10%</b>'], { y: 210, size: 88 }) +
    `<svg class="abs donut" id="dn58" style="left:1220px;top:250px" width="480" height="480" viewBox="0 0 480 480"><circle cx="240" cy="240" r="${R58}" stroke="#E6EEFB" stroke-width="70"/><circle id="sl58" cx="240" cy="240" r="${R58}" stroke="#F97316" stroke-width="70" stroke-dasharray="0 ${C58}" transform="rotate(-90 240 240)" stroke-linecap="butt"/></svg>` +
    `<div class="abs" id="ct58" style="left:1220px;top:400px;width:480px;text-align:center"><div class="big" style="font-size:120px;color:var(--or)"><i id="n58" style="font-style:normal">0</i>%</div><div style="font-size:28px;font-weight:700;color:#9A9590">每日總熱量</div></div>` +
    K.ipill('p58', 'Globe', 'WSAVA、塔夫茨大學都建議', 140, 450, 'bt', { fs: 34 }) +
    TR58.map(([t, ic], k) => K.ipill('tr58' + k, ic, t, 140 + (k % 2) * 400, 590 + Math.floor(k / 2) * 120, '', { fs: 34 })).join('') +
    K.anno('an58', '', '都算零食', { x: 860, y: 660, ss: 40, align: 'left' }),
  init() { K.hideLines('h58', 2); gsap.set(['#p58', '#an58'].concat(TR58.map((_, k) => '#tr58' + k)), { opacity: 0 }); gsap.set(['#dn58', '#ct58'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k58', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h58', 2, S.at(0) + .1, '大標「不要超過每日熱量的 10%」');
    S.to(['#dn58', '#ct58'], { opacity: 1, duration: .5 }, S.at(0) + .4, '右邊一個圓餅：每天的總熱量');
    K.pop(S, '#p58', S.word('WSAVA', 0, -.2), '藍色標籤「WSAVA、塔夫茨大學都建議」', { sfx: 'pop-card' });
    const t = S.word('10', 1, -.3);
    S.to('#sl58', { strokeDasharray: `${C58 * .1} ${C58}`, duration: .9, ease: 'power2.out' }, t, '橘色 10% 那一塊長出來');
    K.count(S, '#n58', 0, 10, t, .9, '中間大數字跑到 10%');
    S.sfx(t + .8, 'tick', '10%：「叮咚」');
    TR58.forEach(([w], k) => K.pop(S, '#tr58' + k, S.word(w, 0, -.15), k ? '' : '念到時四個零食標籤依序彈出', { pitch: 1 + k * .08 }));
    K.fadeIn(S, '#an58', S.word('人類食物', 0, .2), '藍色手寫「都算零食」');
  },
});

// ---------- 幕 59｜塔夫茨的例子：約 4.5 公斤、約 300 大卡 → 零食約 30 大卡 ----------
K.scene('59', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「塔夫茨大學的例子」，大標「舉個例子」', '念到時三張卡依序出現：約 4.5 公斤的狗（小柯基）→ 每天約 300 大卡 → × 10% ＝ 零食約 30 大卡（橘框、數字跑動）', '念到「比想像中少很多」：歪頭的黑柴＋藍色手寫「比想像中少很多」'],
  mount: () => K.ey('k59', '塔夫茨大學的例子', 140, 150) + K.h('h59', ['舉個<b class="o">例子</b>'], { y: 200, size: 84 }) +
    `<div class="cd" id="c590" style="left:140px;top:380px;width:440px;height:360px;padding:30px;text-align:center"><div style="height:180px;position:relative">${K.dog('corgi', { x: 140, y: 0, w: 100, shadow: false })}</div><div class="big" style="font-size:80px;margin-top:6px">約 4.5</div><div class="d">公斤</div></div>` +
    `<div class="cd" id="c591" style="left:700px;top:380px;width:500px;height:360px;padding:40px;text-align:center"><div style="width:120px;height:120px;margin:0 auto">${K.ic('Flame')}</div><div class="big" style="font-size:96px;margin-top:20px">約 <i id="n591" style="font-style:normal">0</i></div><div class="d">每天平均需要的大卡</div></div>` +
    `<div class="cd" id="c592" style="left:1320px;top:380px;width:460px;height:360px;padding:40px;text-align:center"><div style="width:120px;height:120px;margin:0 auto">${K.ic('Jerky')}</div><div class="big" style="font-size:96px;margin-top:20px;color:var(--or)">約 <i id="n592" style="font-style:normal">0</i></div><div class="d">每天的零食額度（大卡）</div></div>` +
    K.arrow('a590', { x: 595, y: 530, w: 90, h: 60, d: 'M8 30 C 30 16 60 16 82 30' }) +
    `<div class="abs big" id="m59" style="left:1205px;top:500px;font-size:44px;color:var(--blue)">×10%</div>` +
    K.anno('an59', '', '比想像中少很多', { x: 1320, y: 790, ss: 40, align: 'left' }) + K.dog('tilt', { id: 'dg59', x: 1120, y: 760, w: 170, shadow: false }),
  init() { K.hideLines('h59', 1); gsap.set(['#c590', '#c591', '#c592', '#m59', '#an59', '#dg59'], { opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k59', S.at(0));
    K.lines(S, 'h59', 1, S.at(0), '大標「舉個例子」');
    K.rise(S, '#c590', S.word('4.5', 0, -.3), '卡片「約 4.5 公斤」（小柯基）', { sfx: 'pop-card' });
    K.draw(S, '#a590', S.word('每天平均', 0, -.3), '箭頭', .35);
    K.rise(S, '#c591', S.word('每天平均', 0, -.1), '卡片「每天約 300 大卡」', { sfx: 'pop-card' });
    K.count(S, '#n591', 0, 300, S.word('300', 0, -.3), .8, '數字跑到 300');
    K.pop(S, '#m59', S.word('10', 0, -.2), '藍色「×10%」', { sfx: 'pop-low' });
    K.rise(S, '#c592', S.word('零食額度', 0, -.2), '卡片「零食約 30 大卡」、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c592', S.word('零食額度', 0, 0));
    K.count(S, '#n592', 0, 30, S.word('30', 1, -.3), .8, '數字跑到 30');
    S.sfx(S.word('30', 1, .4), 'tick', '30 大卡：「叮咚」');
    K.fadeIn(S, '#an59', S.word('少很多', 0, -.4), '藍色手寫「比想像中少很多」');
    K.dogIn(S, '#dg59', S.word('少很多', 0, -.4), '歪頭的黑柴');
  },
});

// ---------- 幕 60｜真實畫面：零食熱量要一起算 ----------
const PT60 = [
  { ic: 'Scale', t: '數字只是示範：看體態、活動量、健康', at: '只是示範', ts: 36 },
  { ic: 'Jerky', t: '零食熱量一起算 → 調整主食份量', at: '一起算進去', ts: 38 },
  { ic: 'Paw', t: '小型犬：幾塊零食就占不少額度', at: '體型比較小', ts: 38 },
];
K.scene('60', 4, {
  enter: 'slide',
  visuals: ['右邊直式影片框（真實畫面：手上拿幾塊肉乾或小零食，一塊一塊給狗狗）', '左邊字卡依序滑入、加橘框：數字只是示範：看體態、活動量、健康／零食熱量一起算 → 調整主食份量／小型犬：幾塊零食就占不少額度'],
  mount: S => S.footage() + PT60.map((p, k) => K.bar('f60' + k, { x: 140, y: 220 + k * 210, w: 1020, h: 170, ic: p.ic, t: p.t, ts: p.ts })).join(''),
  init() { gsap.set(PT60.map((_, k) => '#f60' + k), { opacity: 0 }); },
  animate(S) {
    PT60.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f60' + (k - 1), t, false);
      K.rise(S, '#f60' + k, t, `字卡 ${k + 1} 由左滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f60' + k, t + .2);
    });
  },
});

// ---------- 幕 61｜一天一餐比較健康？Dog Aging Project ----------
K.scene('61', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「一天只吃一餐，」／「比較健康？」（橘）', '念到「一種說法」：對話泡泡「狗狗一天只吃一餐，比較健康！」；念到「從哪裡來」：藍色手寫問號', '念到「Dog Aging Project」：右邊研究卡「Dog Aging Project｜2022 年」，數字跑到「20,000+ 隻狗」', '念到「比較有利的關聯」：研究卡下方標籤「一天一餐：某些健康指標比較有利（關聯）」'],
  mount: () => K.h('h61', ['一天只吃一餐，', '<b class="o">比較健康？</b>'], { y: 180, size: 88 }) +
    `<div class="quote" id="qt61" style="left:140px;top:470px"><small>常聽到的說法</small>狗狗一天只吃一餐，比較健康！</div>` +
    K.anno('an61', '?', '這個說法從哪裡來', { x: 300, y: 640, bs: 120, ss: 32 }) +
    `<div class="cd" id="c61" style="left:1080px;top:200px;width:700px;height:440px;padding:44px 50px"><div style="display:flex;align-items:center;gap:24px"><div style="width:110px;height:110px">${K.ic('Chart')}</div><div><div style="font-family:'Bricolage Grotesque';font-weight:800;font-size:46px;letter-spacing:-.02em">Dog Aging Project</div><div class="d" style="margin-top:0">2022 年發表</div></div></div>` +
    `<div style="display:flex;align-items:baseline;gap:14px;margin-top:40px"><span class="big" style="font-size:130px;color:var(--or)"><i id="n61" style="font-style:normal">0</i>+</span><span style="font-size:36px;font-weight:900">隻狗的資料</span></div></div>` +
    K.pill('p61', '一天一餐：某些健康指標比較有利（關聯）', 1080, 690, 'ot', { fs: 30 }),
  init() { K.hideLines('h61', 2); gsap.set(['#qt61', '#an61', '#c61', '#p61'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h61', 2, S.at(0), '大標「一天只吃一餐，比較健康？」');
    K.pop(S, '#qt61', S.word('一種說法', 0, -.1), '對話泡泡「狗狗一天只吃一餐，比較健康！」', { sfx: 'pop-card', from: .8 });
    K.pop(S, '#an61', S.word('從哪裡來', 0, -.2), '藍色手寫問號「這個說法從哪裡來」', { sfx: 'boing' });
    const t = S.word('Dog', 0, -.3);
    S.to('#an61', { opacity: 0, duration: .3 }, t);
    K.rise(S, '#c61', t, '右邊研究卡「Dog Aging Project｜2022 年」', { sfx: 'pop-card' });
    K.count(S, '#n61', 0, 20000, S.word('兩萬多', 0, -.2), 1, '數字跑到「20,000+ 隻狗的資料」');
    S.sfx(S.word('兩萬多', 0, .7), 'tick', '兩萬多隻：「叮咚」');
    K.rise(S, '#p61', S.word('比較有利', 0, -.3), '標籤「一天一餐：某些健康指標比較有利（關聯）」', { sfx: 'pop-card', dy: 20 });
  },
});

// ---------- 幕 62｜觀察性研究：只看得出關聯 ----------
K.scene('62', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「觀察性研究，」／「只看得出關聯」（橘）', '中間兩塊圖示磚：一天一餐 —— 健康指標，念到「存在關聯」：中間藍色虛線＋「關聯 ✓」', '念到「不能直接證明」：下面一支箭頭「是原因？」被打叉', '念到「例如」：右邊生病的黑柴＋兩個標籤：需要分多餐餵食、要配合服藥'],
  mount: () => K.h('h62', ['觀察性研究，', '<b class="o">只看得出關聯</b>'], { y: 150, size: 84 }) +
    K.tile('Kibble', { id: 't620', x: 140, y: 450, size: 180 }) + K.tile('Heart', { id: 't621', x: 760, y: 450, size: 180 }) +
    `<div class="abs" id="l620" style="left:110px;top:645px;width:240px;text-align:center;font-size:32px;font-weight:900">一天一餐</div><div class="abs" id="l621" style="left:730px;top:645px;width:240px;text-align:center;font-size:32px;font-weight:900">健康指標</div>` +
    `<div class="abs" id="ln62" style="left:340px;top:536px;width:400px;border-top:6px dashed var(--blue);transform-origin:0 50%"></div>` +
    `<div class="abs" id="lb62" style="left:340px;top:470px;width:400px;text-align:center;font-size:32px;font-weight:900;color:var(--blue)">關聯 ✓</div>` +
    `<div class="abs" id="ca62" style="left:340px;top:740px;width:400px;text-align:center"><div style="font-size:32px;font-weight:900;color:#7C7772">是原因？</div><div style="height:6px;background:#7C7772;border-radius:3px;margin-top:10px"></div></div>` + K.xm('x62', 700, 715) +
    K.dog('sick', { id: 'dg62', x: 1240, y: 300, w: 260 }) +
    K.ipill('p620', 'Clock', '需要分多餐餵食', 1100, 690, '', { fs: 34 }) + K.ipill('p621', 'Pill', '要配合服藥', 1100, 800, '', { fs: 34 }),
  init() { K.hideLines('h62', 2); gsap.set(['#lb62', '#ca62', '#dg62', '#p620', '#p621', '#l620', '#l621'], { opacity: 0 }); gsap.set('#ln62', { scaleX: 0 }); },
  animate(S) {
    K.lines(S, 'h62', 2, S.at(0), '大標「觀察性研究，只看得出關聯」');
    K.pop(S, ['#t620', '#l620'], S.word('兩件事', 0, -.3), '圖示磚「一天一餐」');
    K.pop(S, ['#t621', '#l621'], S.word('兩件事', 0, 0), '圖示磚「健康指標」', { pitch: 1.1 });
    const t = S.word('存在關聯', 0, -.3);
    S.to('#ln62', { scaleX: 1, duration: .5, ease: 'power2.out' }, t, '中間藍色虛線＋「關聯 ✓」');
    K.fadeIn(S, '#lb62', t + .3, '', .3);
    S.sfx(t, 'draw', '畫線：筆刷聲', { dur: .5, gain: .5 });
    K.rise(S, '#ca62', S.word('不能直接證明', 0, -.2), '下面一支箭頭「是原因？」', { sfx: false });
    K.xIn(S, '#x62', S.word('原因', 0, -.1), '打叉');
    K.dogIn(S, '#dg62', S.word('身體狀況不好', 0, -.3), '右邊生病的黑柴');
    K.pop(S, '#p620', S.word('多餐餵食', 0, -.2), '標籤「需要分多餐餵食」');
    K.pop(S, '#p621', S.word('配合服藥', 0, -.2), '標籤「要配合服藥」', { pitch: 1.1 });
  },
});

// ---------- 幕 63｜研究團隊：不應拿來決定怎麼餵 → 跟獸醫討論 ----------
K.scene('63', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；上方引述卡：「研究團隊也明確表示」＋「這項結果不應該拿來決定狗狗該怎麼餵」', '念到「一天一餐比一天兩餐或更多餐」：三塊圖示磚：一天一餐、一天兩餐、更多餐，下方灰色標籤「不能認定哪個更好」', '念到「年紀、健康狀況和生活需求」：三個標籤依序彈出；念到「與獸醫討論」：蓋上印章「與獸醫討論」'],
  mount: () => `<div class="cd" id="c63" style="left:140px;top:150px;width:1640px;height:200px;padding:36px 50px"><div class="k">研究團隊也明確表示</div><div class="t" style="font-size:50px;margin-top:14px">這項結果<span class="o">不應該</span>拿來決定狗狗該怎麼餵</div></div>` +
    [['一天一餐', 1], ['一天兩餐', 2], ['更多餐', 3]].map(([t, n], k) => `<div class="cd" id="m63${k}" style="left:${140 + k * 300}px;top:420px;width:260px;height:230px;padding:26px;text-align:center"><div style="display:flex;justify-content:center;gap:8px;height:90px;align-items:center">${Array.from({ length: n }, () => `<div style="width:${n > 2 ? 56 : 76}px;height:${n > 2 ? 56 : 76}px">${K.ic('Kibble')}</div>`).join('')}</div><div class="t" style="font-size:36px;margin-top:20px">${t}</div></div>`).join('') +
    K.pill('g63', '不能認定哪個更好', 290, 690, 'gh', { fs: 36 }) +
    ['年紀', '健康狀況', '生活需求'].map((t, k) => K.pill('f63' + k, t, 140 + k * 230, 830, '', { fs: 36 })).join('') +
    K.tile('Clinic', { id: 't63', x: 1300, y: 460, size: 240 }) +
    `<div class="stamp" id="sp63" style="left:1240px;top:760px">與獸醫討論</div>`,
  init() { gsap.set(['#c63', '#m630', '#m631', '#m632', '#g63', '#f630', '#f631', '#f632', '#t63'], { opacity: 0 }); },
  animate(S) {
    K.rise(S, '#c63', S.at(0), '上方引述卡「研究團隊也明確表示：這項結果不應該拿來決定狗狗該怎麼餵」', { sfx: 'pop-card' });
    K.ring(S, '#c63', S.word('不應該', 0, -.1));
    const t = S.word('一天一餐', 0, -.3);
    K.ring(S, '#c63', t, false);
    K.pop(S, ['#m630', '#m631', '#m632'], t, '三塊：一天一餐、一天兩餐、更多餐', { stagger: .2, sfx: 'pop-card' });
    K.pop(S, '#g63', S.word('更多餐更好', 0, -.1), '灰色標籤「不能認定哪個更好」', { sfx: 'pop-low' });
    ['年紀', '健康狀況', '生活需求'].forEach((w, k) => K.pop(S, '#f63' + k, S.word(w, 0, -.15), k ? '' : '三個標籤依序彈出：年紀、健康狀況、生活需求', { pitch: 1 + k * .1 }));
    K.pop(S, '#t63', S.word('與獸醫', 0, -.4), '右邊動物醫院圖示磚');
    K.stamp(S, '#sp63', S.word('與獸醫', 0, -.2), '蓋上印章「與獸醫討論」', { straight: true });
  },
});
