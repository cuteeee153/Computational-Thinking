// 幕 43–56｜第四步：輔助產品（潔牙骨、潔牙水、潔牙粉、潔牙飼料、濕紙巾／凝膠／噴劑）怎麼選。

// 喝水的黑柴：新圖本身就有藍色水碗；還在用暫代圖時，另外放水碗圖示，讓狗碗入鏡
K.drinkDog = (id, x, y, w) => K.d('drink', { id, x, y, w }) + (K.POSE.drink ? K.icon(id + 'b', 'WaterBowl', x - w * .25, y + w * .62, w * .55) : '');
K.typeHead = (id, n, name, o = {}) => K.kicker('k' + id, `TYPE 0${n}`, `第${'一二三四五'[n - 1]}種`, { y: o.ky ?? 170 }) + K.h('h' + id, [name], { y: o.y ?? 215, size: o.size || 96 });

// ---------- 幕 43｜章節卡 ----------
K.scene('43', 3, {
  enter: 'iris', irisAt: [1400, 560], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 04｜第四步」，大標「潔牙骨、潔牙水、潔牙粉」／「到底怎麼選？」（橘）', '念到時三塊圖示磚依序彈出：潔牙骨、潔牙水、潔牙粉', '右邊啃潔牙骨的黑柴'],
  mount: () => K.chap('43', 4, ['潔牙骨、潔牙水、潔牙粉', '<b class="o">到底怎麼選？</b>'], { size: 88 }) +
    [['DentalBone', '潔牙骨'], ['Water', '潔牙水'], ['Powder', '潔牙粉']].map(([ic], k) => K.tile(ic, { id: 't43' + k, x: 140 + k * 220, y: 580, size: 180 })).join('') +
    K.d('chew', { id: 'dg43', x: 1250, y: 400, w: 420 }),
  init() { K.hideLines('h43', 2); gsap.set('#dg43', { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '43', S.at(0));
    ['潔牙骨', '潔牙水', '潔牙粉'].forEach((w, k) => K.pop(S, '#t43' + k, S.word(w, 0, -.1), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1 }));
    K.dogIn(S, '#dg43', S.word('輔助產品', 0, -.3), '右邊啃潔牙骨的黑柴');
  },
});

// ---------- 幕 44｜先提醒：不能取代刷牙；依使用方式分五種 ----------
const TY44 = [['DentalBone', '啃咬'], ['WaterBowl', '加進飲水'], ['Powder', '加進食物'], ['Bowl', '潔牙飼料'], ['Wipe', '擦拭、塗抹']];
K.scene('44', 3, {
  enter: 'rise',
  visuals: ['小標「先提醒」；三列：「協助控制牙菌斑、牙結石累積」（藍色打勾）、「不能直接取代刷牙」（紅叉）、「不能清除已經形成的牙結石」（紅叉）', '念到「分成幾種類型」：下方五塊圖示磚依序彈出：啃咬、加進飲水、加進食物、潔牙飼料、擦拭塗抹'],
  mount: () => `<div class="eyebrow abs" id="k44" style="left:140px;top:150px;font-size:26px">先提醒</div>` +
    [['協助控制牙菌斑、牙結石累積', 0], ['不能直接取代刷牙', 1], ['不能清除已經形成的牙結石', 1]].map(([t, x], k) =>
      `<div class="cd" id="r44${k}" style="left:140px;top:${200 + k * 125}px;width:1100px;height:105px;padding:0 36px;display:flex;align-items:center;gap:24px">${x ? `<div style="position:relative;width:44px;height:44px;flex:none"><div class="x" style="left:-28px;top:-28px;transform:scale(.6)"></div></div>` : K.chk().replace('class="chk"', 'class="chk" style="margin:0"')}<span style="font-size:38px;font-weight:900">${t}</span></div>`).join('') +
    TY44.map(([ic, t], k) => K.tile(ic, { id: 'ty44' + k, x: 140 + k * 340, y: 620, size: 160 }) + `<div class="abs" id="tl44${k}" style="left:${140 + k * 340 - 70}px;top:795px;width:300px;text-align:center;font-size:32px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:8px">${k + 1}</span>${t}</div>`).join(''),
  init() { gsap.set(['#k44', '#r440', '#r441', '#r442'], { opacity: 0 }); gsap.set(TY44.map((_, k) => '#tl44' + k), { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#k44', S.at(0), '小標「先提醒」');
    [['協助控制', 0], ['取代刷牙', 1], ['清除已經形成', 2]].forEach(([w, k]) => K.rise(S, '#r44' + k, S.word(w, 0, -.2), k ? '' : '念到時三列依序浮上：協助控制（打勾）、不能取代刷牙、不能清除牙結石（紅叉）', { dx: -40, dy: 0, sfx: k ? 'shake' : 'slide' }));
    const t = S.word('幾種類型', 0, -.8);
    TY44.forEach((_, k) => K.pop(S, ['#ty44' + k, '#tl44' + k], t + k * .15, k ? '' : '下方五塊圖示磚依序彈出：啃咬、加進飲水、加進食物、潔牙飼料、擦拭塗抹', { pitch: 1 + k * .06, sfx: k ? false : 'pop' }));
  },
});

// ---------- 幕 45｜第一種：潔牙骨（真實畫面） ----------
const PT45 = [
  { ic: 'DentalBone', t: '第一種：<span class="o">潔牙骨、潔牙零食</span>', at: '第一種' },
  { ic: 'Tooth', t: '透過啃咬，清潔牙齒表面', at: '啃咬' },
  { ic: 'Seal', t: '部分產品經過 VOHC 評估', at: 'VOHC' },
];
K.scene('45', 3, {
  enter: 'slide',
  visuals: ['右邊直式影片框（真實畫面：拿出潔牙骨、狗狗跑過來啃）', '左邊字卡依序滑入、加橘框：第一種：潔牙骨、潔牙零食；透過啃咬，清潔牙齒表面；部分產品經過 VOHC 評估'],
  mount: S => S.footage() + PT45.map((p, k) => K.bar('f45' + k, { x: 140, y: 200 + k * 210, w: 1020, h: 170, ic: p.ic, t: p.t, ts: 40 })).join(''),
  init() { gsap.set(PT45.map((_, k) => '#f45' + k), { opacity: 0 }); },
  animate(S) {
    PT45.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f45' + (k - 1), t, false);
      K.rise(S, '#f45' + k, t, `字卡 ${k + 1} 滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f45' + k, t + .2);
    });
  },
});

// ---------- 幕 46｜注意一：尺寸要合適 ----------
K.scene('46', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「選購注意兩件事」', '第一列「尺寸要適合體重和體型」（體重計）浮上、加橘框', '下方：小小的潔牙骨＋藍色標註「太小：吞嚥風險」；大大的潔牙骨＋藍色標註「太大：不一定適合」；中間微笑的黑柴'],
  mount: () => K.h('h46', ['選購注意<b class="o">兩件事</b>'], { y: 150, size: 80 }) +
    K.bar('c46', { x: 140, y: 300, w: 1640, h: 130, n: 1, ic: 'Scale', t: '尺寸要適合體重和體型', ts: 44 }) +
    K.icon('bs46', 'DentalBone', 330, 600, 120) + K.anno('as46', '', '太小：吞嚥風險', { x: 250, y: 760, ss: 38 }) +
    K.d('smile', { id: 'dg46', x: 800, y: 460, w: 225 }) +
    K.icon('bl46', 'DentalBone', 1250, 460, 360) + K.anno('al46', '', '太大：不一定適合', { x: 1290, y: 800, ss: 38 }),
  init() { K.hideLines('h46', 1); gsap.set(['#c46', '#dg46', '#as46', '#al46'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h46', 1, S.at(0), '大標「選購注意兩件事」');
    K.rise(S, '#c46', S.word('第一', 0, -.2), '第一列「尺寸要適合體重和體型」浮上、加橘框', { dx: -60, dy: 0, sfx: 'pop-card' });
    K.ring(S, '#c46', S.word('第一'));
    K.dogIn(S, '#dg46', S.word('體型', 0, -.2), '中間微笑的黑柴');
    K.pop(S, '#bs46', S.word('太小', 0, -.2), '小小的潔牙骨', { pitch: 1.3 });
    K.fadeIn(S, '#as46', S.word('太小', 0, .1), '藍色標註「太小：吞嚥風險」');
    K.pop(S, '#bl46', S.word('太大', 0, -.2), '大大的潔牙骨', { pitch: .8, sfx: 'pop-low' });
    K.fadeIn(S, '#al46', S.word('太大', 0, .1), '藍色標註「太大：不一定適合」');
  },
});

// ---------- 幕 47–48｜注意二：越硬不一定越好；太硬可能咬斷牙齒 ----------
K.scene('47', 3, {
  enter: 'push',
  visuals: ['小標「注意二」；大標「潔牙骨」／「不能只看硬不硬」（橘）', '念到時三個標籤依序出現、中間箭頭：越硬 → 啃得越久 → 效果越好？', '念到「其實有風險」：蓋上紅色印章「其實有風險」'],
  mount: () => `<div class="eyebrow abs" id="k47" style="left:140px;top:170px;font-size:26px">注意二</div>` + K.h('h47', ['潔牙骨', '<b class="o">不能只看硬不硬</b>'], { y: 220, size: 96 }) +
    `<div class="abs" id="fl47" style="left:140px;top:560px;display:flex;align-items:center;gap:24px">` +
    ['越硬', '→', '啃得越久', '→', '效果越好？'].map((t, k) => k % 2 ? `<span id="f47${k}" style="font-size:52px;font-weight:900;color:var(--blue)">${t}</span>` : `<span class="pl" id="f47${k}" style="position:static;font-size:44px;padding:20px 38px">${t}</span>`).join('') + `</div>` +
    `<div class="stamp" id="sp47" style="left:1180px;top:700px;border-color:#E5484D;color:#E5484D">其實有風險</div>`,
  init() { K.hideLines('h47', 2); gsap.set(['#k47'], { opacity: 0 }); gsap.set('#fl47 > span', { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#k47', S.at(0), '小標「注意二」');
    K.lines(S, 'h47', 2, S.at(0) + .1, '大標「潔牙骨不能只看硬不硬」');
    K.rise(S, '#f470', S.word('越硬', 0, -.1), '念到時三個標籤依序出現：越硬 → 啃得越久 → 效果越好？', { dx: -30, dy: 0 });
    K.rise(S, ['#f471', '#f472'], S.word('啃得越久', 0, -.2), '', { dx: -30, dy: 0, stagger: .1 });
    K.rise(S, ['#f473', '#f474'], S.word('效果', 0, -.2), '', { dx: -30, dy: 0, stagger: .1 });
    K.stamp(S, '#sp47', S.word('有風險', 0, -.3), '蓋上紅色印章「其實有風險」', { straight: true });
  },
});
const HD48 = [['牛蹄', '牛蹄'], ['鹿角', '鹿角'], ['天然硬骨頭', '天然硬骨頭'], ['很硬的尼龍玩具', '尼龍']];
K.scene('48', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「太硬」／「可能咬斷牙齒」（橘）', '左邊四個標籤念到時依序出現：牛蹄、鹿角、天然硬骨頭、很硬的尼龍玩具', '右邊大牙齒，念到「斷裂」：紅色裂痕畫下去、牙齒抖一下', '下方結論橘字「安全性 > 能啃多久」'],
  mount: () => K.h('h48', ['太硬', '<b class="o">可能咬斷牙齒</b>'], { y: 150, size: 90 }) +
    HD48.map(([t], k) => K.pill('p48' + k, `${K.ic('HardBone')}${t}`, 140 + (k % 2) * 460, 430 + Math.floor(k / 2) * 120, '', { fs: 34 })).join('') +
    K.icon('tt48', 'Tooth', 1250, 250, 440) +
    `<svg class="abs" id="ck48" style="left:1250px;top:250px;overflow:visible" width="440" height="440"><path d="M230 70 L200 150 L250 210 L205 290" fill="none" stroke="#E5484D" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" pathLength="1"/></svg>` +
    K.concl('cn48', '安全性 <b style="color:#16130F">&gt;</b> 能啃多久', { x: 140, y: 760, size: 64 }),
  init() { K.hideLines('h48', 2); gsap.set(HD48.map((_, k) => '#p48' + k), { opacity: 0 }); gsap.set('#ck48 path', { strokeDasharray: 1, strokeDashoffset: 1 }); gsap.set('#cn48', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h48', 2, S.at(0), '大標「太硬，可能咬斷牙齒」');
    HD48.forEach(([, w], k) => K.pop(S, '#p48' + k, S.word(w, 0, -.1), k ? '' : '念到時四個標籤依序出現：牛蹄、鹿角、天然硬骨頭、很硬的尼龍玩具', { sfx: 'pop-card', pitch: 1 + k * .06 }));
    const t = S.word('斷裂', 0, -.2);
    S.to('#ck48 path', { strokeDashoffset: 0, duration: .35, ease: 'power2.in' }, t, '念到「斷裂」：紅色裂痕畫下去');
    S.to('#tt48', { x: -10, duration: .06, yoyo: true, repeat: 5 }, t + .3, '牙齒抖一下');
    S.sfx(t + .3, 'shake', '裂開：喀喀');
    K.showConcl(S, '#cn48', S.word('安全性', 0, -.1), '結論「安全性 > 能啃多久」');
  },
});

// ---------- 幕 49–51｜第二種：潔牙水 ----------
K.scene('49', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「TYPE 02｜第二種」，大標「潔牙水」', '右邊喝水的黑柴和藍色水碗', '念到時兩張字卡依序浮上：「加進狗狗的飲用水」（水碗）、「喝水時，接觸口腔保健成分」（牙齒）'],
  mount: () => K.typeHead('49', 2, '<b class="o">潔牙水</b>', { size: 120 }) +
    K.bar('r490', { x: 140, y: 470, w: 1000, h: 150, ic: 'WaterBowl', t: '加進狗狗的飲用水', ts: 42 }) +
    K.bar('r491', { x: 140, y: 650, w: 1000, h: 150, ic: 'Tooth', t: '喝水時，接觸口腔保健成分', ts: 42 }) +
    K.drinkDog('dg49', 1350, 330, 420),
  init() { K.hideLines('h49', 1); gsap.set(['#r490', '#r491', '#dg49', '#dg49b'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k49', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h49', 1, S.at(0) + .1, '大標「潔牙水」');
    K.dogIn(S, ['#dg49', '#dg49b'], S.at(0) + .4, '右邊喝水的黑柴和藍色水碗');
    K.rise(S, '#r490', S.word('飲用水', 0, -.3), '字卡「加進狗狗的飲用水」浮上、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#r490', S.word('飲用水'));
    K.ring(S, '#r490', S.word('日常喝水', 0, -.2), false);
    K.rise(S, '#r491', S.word('日常喝水', 0, -.2), '字卡「喝水時，接觸口腔保健成分」浮上、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#r491', S.word('日常喝水'));
  },
});
K.scene('50', 3, {
  enter: 'push',
  visuals: ['大標「潔牙水」／「不是每款都一樣」（橘）', '兩張卡依序浮上：「先確認標章種類」（標章，下方兩個標籤：牙菌斑、牙結石）、「照包裝指示使用」（說明書）'],
  mount: () => K.h('h50', ['潔牙水', '<b class="o">不是每款都一樣</b>'], { y: 150, size: 84 }) +
    `<div class="cd" id="c500" style="left:200px;top:400px;width:700px;height:420px;padding:40px;text-align:center"><div style="width:150px;height:150px;margin:0 auto">${K.ic('Seal')}</div><div class="t" style="margin-top:16px;font-size:44px">先確認標章種類</div><div style="display:flex;gap:16px;justify-content:center;margin-top:22px"><span class="pl ot" style="position:static;font-size:28px">牙菌斑</span><span class="pl ot" style="position:static;font-size:28px">牙結石</span></div></div>` +
    K.vcard('c501', { x: 1020, y: 400, w: 700, h: 420, ic: 'Doc', t: '照包裝指示使用', ts: 44 }),
  init() { K.hideLines('h50', 2); gsap.set(['#c500', '#c501'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h50', 2, S.word('不是所有', 0, -.2), '大標「潔牙水不是每款都一樣」');
    K.rise(S, '#c500', S.word('選購前', 0, -.2), '左卡「先確認標章種類」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c500', S.word('選購前'));
    K.ring(S, '#c500', S.word('包裝指示', 0, -.3), false);
    K.rise(S, '#c501', S.word('包裝指示', 0, -.3), '右卡「照包裝指示使用」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c501', S.word('包裝指示'));
  },
});
K.scene('51', 3, {
  enter: 'rise', bg: 'sky',
  visuals: ['淡藍底；大標「狗狗不肯喝水？」／「那就不要加」（橘）', '左邊喝水的黑柴和藍色水碗', '念到「維持正常飲水量」：右下橘字「正常喝水也很重要」'],
  mount: () => K.drinkDog('dg51', 300, 330, 420) +
    K.h('h51', ['狗狗不肯喝水？', '<b class="o">那就不要加</b>'], { x: 860, y: 280, size: 96 }) +
    K.concl('cn51', '正常喝水<b style="color:#16130F">也很重要</b>', { x: 860, y: 620, size: 60 }),
  init() { K.hideLines('h51', 2); gsap.set(['#dg51', '#dg51b', '#cn51'], { opacity: 0 }); },
  animate(S) {
    K.dogIn(S, ['#dg51', '#dg51b'], S.at(0), '左邊喝水的黑柴和藍色水碗');
    K.lines(S, 'h51', 1, S.word('不願意喝水', 0, -.4), '大標「狗狗不肯喝水？」');
    S.to('#h511', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('就不要', 0, -.2), '第二行「那就不要加」');
    K.showConcl(S, '#cn51', S.word('飲水量', 0, -.5), '橘字「正常喝水也很重要」');
  },
});

// ---------- 幕 52｜第三種：潔牙粉 ----------
const PW52 = [
  { t: '方便，不用牙刷碰牙齒', at: '比較方便', ok: 1 }, { t: '方便 ≠ 可以取代刷牙', at: '取代刷牙' },
  { t: '確認犬用、照說明使用', at: '犬用產品', ok: 1 }, { t: '慢性病、治療中、特殊飲食：先問獸醫', at: '慢性疾病', o: 1 },
];
K.scene('52', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「TYPE 03｜第三種」，大標「潔牙粉」', '右邊吃飼料的黑柴（狗碗入鏡），念到「加入每天的食物中」：潔牙粉罐子飛過來、往碗裡撒粉', '左邊四列念到時依序浮上：方便，不用牙刷碰牙齒（打勾）；方便 ≠ 可以取代刷牙（紅叉）；確認犬用、照說明使用（打勾）；慢性病、治療中、特殊飲食：先問獸醫（橘框）'],
  mount: () => K.typeHead('52', 3, '<b class="o">潔牙粉</b>', { size: 110 }) +
    PW52.map((p, k) => `<div class="cd" id="r52${k}" style="left:140px;top:${400 + k * 125}px;width:1050px;height:105px;padding:0 34px;display:flex;align-items:center;gap:22px">` +
      (p.o ? `<span class="big" style="font-size:44px;color:var(--or);width:44px;text-align:center">!</span>` : p.ok ? K.chk().replace('class="chk"', 'class="chk" style="margin:0"') : `<div style="position:relative;width:44px;height:44px;flex:none"><div class="x" style="left:-28px;top:-28px;transform:scale(.6)"></div></div>`) +
      `<span style="font-size:36px;font-weight:900${p.o ? ';color:var(--or)' : ''}">${p.t}</span></div>`).join('') +
    K.d('eat', { id: 'dg52', x: 1330, y: 360, w: 450 }) + K.icon('pw52', 'Powder', 1660, 160, 190),
  init() { K.hideLines('h52', 1); gsap.set(PW52.map((_, k) => '#r52' + k), { opacity: 0 }); gsap.set(['#dg52', '#pw52'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k52', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h52', 1, S.at(0) + .1, '大標「潔牙粉」');
    K.dogIn(S, '#dg52', S.at(0) + .4, '右邊吃飼料的黑柴（狗碗入鏡）');
    const tp = S.word('食物中', 0, -.6);
    S.fromTo('#pw52', { opacity: 0, x: 120, rotate: 0 }, { opacity: 1, x: 0, rotate: -40, duration: .6, ease: 'power2.out' }, tp, '潔牙粉罐子飛過來、往碗裡撒粉');
    S.to('#pw52', { rotate: -55, duration: .15, yoyo: true, repeat: 5 }, tp + .6);
    S.sfx(tp, 'whoosh', '罐子飛過來：「咻」', { gain: .5 });
    S.sfx(tp + .6, 'shake', '撒粉：沙沙', { gain: .4 });
    S.to('#pw52', { opacity: 0, duration: .3 }, tp + 2.2);
    PW52.forEach((p, k) => {
      const t = S.word(p.at, 0, -.3);
      K.rise(S, '#r52' + k, t, k ? '' : '左邊四列念到時依序浮上', { dx: -40, dy: 0, sfx: p.ok || p.o ? 'slide' : 'shake' });
    });
    K.ring(S, '#r523', S.word('慢性疾病', 0, -.1));
  },
});

// ---------- 幕 53｜第四種：潔牙飼料 ----------
K.scene('53', 3, {
  enter: 'push',
  visuals: ['小標「TYPE 04｜第四種」，大標「潔牙飼料」', '右邊吃飼料的黑柴（狗碗入鏡）；藍色手寫標註「特別設計 顆粒的形狀、大小、質地」', '念到「一般日常飲食」「獸醫處方飲食」：兩個標籤依序出現', '下方加橘框「換主食前，先和獸醫討論」'],
  mount: () => K.typeHead('53', 4, '<b class="o">潔牙飼料</b>', { size: 110 }) +
    `<div class="abs" id="kb53" style="left:140px;top:420px;display:flex;gap:16px">${['形狀', '大小', '質地'].map((t, k) => `<span class="pl bt" id="kb53${k}" style="position:static;font-size:34px">顆粒${t}</span>`).join('')}</div>` +
    K.anno('an53', '', '咀嚼時，幫忙清潔牙齒表面', { x: 140, y: 520, ss: 34, align: 'left' }) +
    K.pill('p530', '一般日常飲食', 140, 620, '', { fs: 34 }) + K.pill('p531', '獸醫處方飲食', 470, 620, 'ot', { fs: 34 }) +
    K.bar('r53', { x: 140, y: 760, w: 1050, h: 120, ic: 'Clinic', t: '換主食前，<span class="o">先和獸醫討論</span>', ts: 40 }) +
    K.d('eat', { id: 'dg53', x: 1330, y: 360, w: 450 }),
  init() { K.hideLines('h53', 1); gsap.set(['#kb530', '#kb531', '#kb532', '#an53', '#p530', '#p531', '#r53', '#dg53'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k53', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h53', 1, S.at(0) + .1, '大標「潔牙飼料」');
    K.dogIn(S, '#dg53', S.at(0) + .4, '右邊吃飼料的黑柴（狗碗入鏡）');
    [['形狀', 0], ['大小', 1], ['質地', 2]].forEach(([w, k]) => K.pop(S, '#kb53' + k, S.word(w, 0, -.1), k ? '' : '念到時三個藍色標籤依序彈出：顆粒形狀、大小、質地', { pitch: 1 + k * .1 }));
    K.fadeIn(S, '#an53', S.word('咀嚼', 0, -.1), '藍色手寫「咀嚼時，幫忙清潔牙齒表面」');
    K.pop(S, '#p530', S.word('一般日常', 0, -.2), '標籤「一般日常飲食」', { sfx: 'pop-card' });
    K.pop(S, '#p531', S.word('處方飲食', 0, -.4), '標籤「獸醫處方飲食」', { sfx: 'pop-card' });
    K.rise(S, '#r53', S.word('主食', 0, -.3), '「換主食前，先和獸醫討論」浮上、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#r53', S.word('先和獸醫', 0, -.1));
  },
});

// ---------- 幕 54–54b｜第五種：濕紙巾、凝膠、噴劑 ----------
K.scene('54', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「TYPE 05｜第五種」，大標「濕紙巾、凝膠、噴劑」', '兩張卡念到時依序浮上：濕紙巾「擦拭牙齒」、凝膠和噴劑「照說明塗抹在口腔」'],
  mount: () => K.typeHead('54', 5, '<b class="o">濕紙巾、凝膠、噴劑</b>', { size: 90 }) +
    K.vcard('c540', { x: 140, y: 360, w: 800, h: 380, ic: 'Wipe', is: 170, t: '濕紙巾：擦拭牙齒', ts: 42 }) +
    K.vcard('c541', { x: 980, y: 360, w: 800, h: 380, ic: 'Spray', is: 170, t: '凝膠、噴劑：塗抹在口腔', ts: 42 }),
  init() { K.hideLines('h54', 1); gsap.set(['#c540', '#c541'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k54', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h54', 1, S.at(0) + .1, '大標「濕紙巾、凝膠、噴劑」');
    K.rise(S, '#c540', S.word('擦拭牙齒', 0, -.3), '左卡「濕紙巾：擦拭牙齒」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c541', S.word('塗抹', 0, -.3), '右卡「凝膠、噴劑：塗抹在口腔」浮上', { sfx: 'pop-card' });
  },
});
K.scene('54b', 3, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）', '（接續）下方三個標籤依序出現：「還不習慣牙刷時的輔助」（打勾）、「≠ 完整刷牙」（紅字）、「不是每款都有 VOHC 認證：確認名稱和版本」'],
  mount: () => `<div class="pl" id="p54b0" style="left:140px;top:790px;font-size:32px">${K.chk().replace('class="chk"', 'class="chk" style="margin:0;width:38px;height:38px"')}還不習慣牙刷時的輔助</div>` +
    `<div class="pl" id="p54b1" style="left:700px;top:790px;font-size:32px;color:#E5484D">≠ 完整刷牙</div>` +
    `<div class="pl ot" id="p54b2" style="left:1000px;top:790px;font-size:32px">不是每款都有 VOHC 認證</div>`,
  init() { gsap.set(['#p54b0', '#p54b1', '#p54b2'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#p54b0', S.word('輔助選項', 0, -.3), '標籤「還不習慣牙刷時的輔助」', { sfx: 'pop-card' });
    K.pop(S, '#p54b1', S.word('完整刷牙', 0, -.2), '紅字標籤「≠ 完整刷牙」', { sfx: 'shake' });
    K.pop(S, '#p54b2', S.word('VOHC', 0, -.2), '標籤「不是每款都有 VOHC 認證」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 55–56｜到底該選哪一種？ ----------
K.scene('55', 3, {
  enter: 'zoom', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底；大標「這麼多產品」／「到底該選哪一種？」（橘）', '中間問題卡「狗狗願意每天刷牙嗎？」，往下分兩條藍色箭頭', '左「願意：先把刷牙做好，其他當補充」；右「暫時不願意：選牠能接受的輔助產品」，念到時依序浮上、加橘框'],
  mount: () => K.h('h55', ['這麼多產品', '<b class="o">到底該選哪一種？</b>'], { y: 130, size: 76 }) +
    `<div class="pl b" id="q55" style="left:660px;top:360px;font-size:40px;padding:20px 44px">狗狗願意每天刷牙嗎？</div>` +
    K.arrow('a550', { x: 520, y: 450, w: 300, h: 120, d: 'M280 10 C 220 40 120 60 40 110' }) + K.arrow('a551', { x: 1100, y: 450, w: 300, h: 120, d: 'M20 10 C 80 40 180 60 260 110' }) +
    K.vcard('c550', { x: 140, y: 570, w: 780, h: 290, ic: 'Toothbrush', is: 110, t: '願意：先把刷牙做好', d: '其他產品當補充', ts: 42, ds: 30 }) +
    K.vcard('c551', { x: 1000, y: 570, w: 780, h: 290, ic: 'DentalBone', is: 110, t: '暫時不願意：選牠能接受的', d: '潔牙骨、潔牙水、潔牙粉…', ts: 42, ds: 30 }),
  init() { K.hideLines('h55', 2); gsap.set(['#q55', '#c550', '#c551'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h55', 2, S.at(0), '大標「這麼多產品，到底該選哪一種？」');
    K.pop(S, '#q55', S.word('願意每天刷牙', 0, -.5), '中間問題卡「狗狗願意每天刷牙嗎？」', { sfx: 'pop-card' });
    K.draw(S, '#a550', S.word('願意每天刷牙', 0, .1), '往左下畫藍色箭頭', .5);
    K.rise(S, '#c550', S.word('先把刷牙做好', 0, -.3), '左卡「願意：先把刷牙做好」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c550', S.word('先把刷牙做好'));
    K.draw(S, '#a551', S.word('暫時不願意', 0, -.3), '往右下畫藍色箭頭', .5);
    K.ring(S, '#c550', S.word('暫時不願意'), false);
    K.rise(S, '#c551', S.word('暫時不願意', 0, .1), '右卡「暫時不願意：選牠能接受的」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c551', S.word('暫時不願意', 0, .3));
  },
});
K.scene('56', 3, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）', '（接續）兩張卡橘框拿掉；上方問題卡換成橘色結論「無論選哪一種：定期讓獸醫檢查口腔」', '下方灰色小字「產品是日常保養，不保證不會出現口腔疾病」'],
  mount: () => `<div class="pl o" id="q56" style="left:330px;top:360px;font-size:40px;padding:20px 44px">${K.ic('Clinic')}無論選哪一種：定期讓獸醫檢查口腔</div>` +
    `<div class="note" id="nt56" style="left:140px;top:890px;width:1640px;text-align:center;font-size:28px">產品是日常保養，不保證不會出現口腔疾病</div>`,
  init() { gsap.set(['#q56', '#nt56'], { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#c551', S.at(0), false);
    S.to(['#q55', '#a550', '#a551'], { opacity: 0, duration: .3 }, S.at(0));
    K.pop(S, '#q56', S.word('定期讓獸醫', 0, -.4), '橘色結論「無論選哪一種：定期讓獸醫檢查口腔」', { sfx: 'tick' });
    K.fadeIn(S, '#nt56', S.word('日常保養', 0, -.2), '灰色小字「產品是日常保養，不保證不會出現口腔疾病」');
  },
});
