// 幕 57–68｜第五步：該看獸醫的狀況、無麻醉洗牙；重點整理＋片尾。

// ---------- 幕 57–58｜章節卡：買瓶潔牙水就能改善口臭？ ----------
K.scene('57', 4, {
  enter: 'iris', irisAt: [1500, 500], bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底，圓形轉場；章節卡「STEP 05｜第五步」，大標「出現這些狀況」／「別只靠潔牙產品」（橘）', '右邊手機對話：口臭圖示＋飼主的藍色泡泡「那我買一瓶潔牙水，應該就能改善了吧？」'],
  mount: () => K.chap('57', 5, ['出現這些狀況', '<b class="o">別只靠潔牙產品</b>'], { size: 92 }) +
    K.phone('ph57', `<div class="abs" style="left:28px;right:28px;top:270px;display:flex;flex-direction:column;gap:22px;align-items:flex-end">` +
      `<div id="br57" style="width:150px;height:150px;align-self:center">${K.ic('Breath')}</div>` +
      `<div class="qb" id="qb57">那我買一瓶潔牙水，應該就能改善了吧？</div></div>`, { title: '狗狗有口臭…' }),
  init() { K.hideLines('h57', 2); gsap.set('#ph57', { y: 900 }); gsap.set(['#br57', '#qb57'], { opacity: 0 }); },
  animate(S) {
    S.to('#ph57', { y: 0, duration: .8, ease: 'power3.out' }, S.start + .3, '手機畫面滑上來');
    S.sfx(S.start + .3, 'whoosh', '手機滑上來：「咻」', { gain: .6 });
    K.chapIn(S, '57', S.at(0));
    K.pop(S, '#br57', S.word('口臭', 0, -.2), '口臭圖示彈出', { sfx: 'pop-low' });
    K.rise(S, '#qb57', S.word('買一瓶', 0, -.3), '飼主的藍色泡泡「那我買一瓶潔牙水，應該就能改善了吧？」', { sfx: 'pop', dy: 30 });
  },
});
const CA58 = [['牙菌斑', 'Plaque'], ['牙周病', 'Gum'], ['其他口腔問題', 'Tooth'], ['其他健康狀況', 'Thermometer']];
K.scene('58', 4, {
  enter: 'push',
  visuals: ['（這一幕還沒有錄音）', '大標「口臭」／「可能不只是牙齒髒」（橘）', '念到時四個標籤依序彈出：牙菌斑、牙周病、其他口腔問題、其他健康狀況', '下方結論「明顯異常：別只靠潔牙產品」'],
  mount: () => K.h('h58', ['口臭', '<b class="o">可能不只是牙齒髒</b>'], { y: 170, size: 96 }) +
    CA58.map(([t, ic], k) => K.pill('c58' + k, `${K.ic(ic)}${t}`, 140 + k * 420, 500, '', { fs: 34 })).join('') +
    K.concl('cn58', '明顯異常：<b style="color:#16130F">別只靠潔牙產品</b>', { y: 720, size: 60 }),
  init() { K.hideLines('h58', 2); gsap.set(CA58.map((_, k) => '#c58' + k).concat('#cn58'), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h58', 2, S.at(0), '大標「口臭可能不只是牙齒髒」');
    [['牙菌斑', 0], ['牙周病', 1], ['其他口腔問題', 2], ['其他健康狀況', 3]].forEach(([w, k]) => K.pop(S, '#c58' + k, S.word(w, 0, -.1), k ? '' : '念到時四個標籤依序彈出', { sfx: 'pop-card', pitch: 1 + k * .06 }));
    K.showConcl(S, '#cn58', S.word('明顯的口腔異常', 0, -.2), '結論「明顯異常：別只靠潔牙產品」');
  },
});

// ---------- 幕 59｜四種情況要看獸醫 ----------
const SG59 = [['Breath', '口臭明顯，持續沒改善'], ['Tartar', '大量黃褐色、硬硬的牙結石'], ['Gum', '牙齦紅腫、流血、碰了會痛'], ['Tooth', '牙齦萎縮、牙齒鬆動']];
K.scene('59', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「這四種情況」／「帶去看獸醫」（橘）', '2×2 四張卡，念到「第一」到「第四」時依序浮上、加橘框：口臭明顯，持續沒改善；大量黃褐色、硬硬的牙結石；牙齦紅腫、流血、碰了會痛；牙齦萎縮、牙齒鬆動'],
  mount: () => K.h('h59', ['這四種情況', '<b class="o">帶去看獸醫</b>'], { y: 130, size: 80 }) +
    SG59.map(([ic, t], k) => K.bar('s59' + k, { x: 140 + (k % 2) * 840, y: 400 + Math.floor(k / 2) * 230, w: 800, h: 200, n: k + 1, ic, t, ts: 36 })).join(''),
  init() { K.hideLines('h59', 2); gsap.set(SG59.map((_, k) => '#s59' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h59', 2, S.at(0), '大標「這四種情況，帶去看獸醫」');
    ['第一', '第二', '第三', '第四'].forEach((w, k) => {
      const t = S.word(w, 0, -.2);
      if (k) K.ring(S, '#s59' + (k - 1), t, false);
      K.rise(S, '#s59' + k, t, k ? '' : '念到「第一」到「第四」時依序浮上、加橘框', { sfx: 'pop-card', dy: 40 });
      K.ring(S, '#s59' + k, t + .2);
    });
  },
});

// ---------- 幕 60｜吃東西的變化也要注意 ----------
const EA60 = [['不太願意吃東西', '願意吃東西'], ['咀嚼方式改變', '咀嚼方式'], ['吃東西時不舒服', '不舒服']];
K.scene('60', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「吃東西的變化」／「也要特別留意」（橘）', '右邊吃飼料的黑柴（狗碗入鏡）', '左邊三個標籤念到時依序彈出：不太願意吃東西、咀嚼方式改變、吃東西時不舒服', '念到「默默地少吃一點」「只用某一側咀嚼」：藍色手寫標註＋箭頭指向黑柴', '下方加橘框「讓獸醫檢查，不是換一款產品」'],
  mount: () => K.h('h60', ['吃東西的變化', '<b class="o">也要特別留意</b>'], { y: 150, size: 84 }) +
    EA60.map(([t], k) => K.pill('e60' + k, t, 140 + k * 360, 420, '', { fs: 32 })).join('') +
    K.anno('a600', '', '默默少吃一點', { x: 1080, y: 230, ss: 36 }) + K.anno('a601', '', '只用一側咀嚼', { x: 1080, y: 560, ss: 36 }) +
    K.arrow('ar600', { x: 1180, y: 280, w: 200, h: 140, d: 'M10 10 C 60 60 120 100 190 120' }) + K.arrow('ar601', { x: 1180, y: 480, w: 200, h: 100, d: 'M10 80 C 60 50 120 30 190 20' }) +
    K.d('eat', { id: 'dg60', x: 1360, y: 330, w: 430 }) +
    K.bar('r60', { x: 140, y: 720, w: 1100, h: 130, ic: 'Clinic', t: '讓獸醫檢查，<span class="o">不是換一款產品</span>', ts: 40 }),
  init() { K.hideLines('h60', 2); gsap.set(['#e600', '#e601', '#e602', '#a600', '#a601', '#r60', '#dg60'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h60', 2, S.at(0), '大標「吃東西的變化，也要特別留意」');
    K.dogIn(S, '#dg60', S.at(0) + .3, '右邊吃飼料的黑柴（狗碗入鏡）');
    EA60.forEach(([, w], k) => K.pop(S, '#e60' + k, S.word(w, 0, -.2), k ? '' : '念到時三個標籤依序彈出', { sfx: 'pop-card', pitch: 1 + k * .08 }));
    K.fadeIn(S, '#a600', S.word('少吃一點', 0, -.4), '藍色手寫「默默少吃一點」');
    K.draw(S, '#ar600', S.word('少吃一點', 0, -.2), '箭頭指向黑柴', .5);
    K.fadeIn(S, '#a601', S.word('某一側', 0, -.3), '藍色手寫「只用一側咀嚼」');
    K.draw(S, '#ar601', S.word('某一側', 0, -.1), '箭頭指向黑柴', .5);
    K.rise(S, '#r60', S.word('觀察到', 0, -.2), '「讓獸醫檢查，不是換一款產品」浮上、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#r60', S.word('獸醫檢查', 0, -.1));
  },
});

// ---------- 幕 61–62｜無麻醉洗牙 ----------
K.scene('61', 4, {
  enter: 'push',
  visuals: ['大標「不用麻醉的洗牙」／「可以嗎？」（橘）', '兩個灰色虛線標籤（聽起來的好處）：少掉麻醉風險、比較方便', '念到「美國獸醫牙科學院」：卡片浮上「美國獸醫牙科學院：不建議當成完整的牙科清潔」，蓋上紅色印章「不建議」'],
  mount: () => K.h('h61', ['不用麻醉的洗牙', '<b class="o">可以嗎？</b>'], { y: 170, size: 90 }) +
    K.pill('g610', '少掉麻醉風險？', 140, 450, 'gh', { fs: 34 }) + K.pill('g611', '比較方便？', 560, 450, 'gh', { fs: 34 }) +
    `<div class="cd" id="c61" style="left:140px;top:600px;width:1300px;height:200px;padding:0 50px;display:flex;align-items:center;gap:34px"><div style="width:130px;height:130px;flex:none">${K.ic('Clinic')}</div><div><div class="t" style="font-size:42px">美國獸醫牙科學院</div><div class="d" style="font-size:32px">不建議當成完整的牙科清潔方式</div></div></div>` +
    `<div class="stamp" id="sp61" style="left:1300px;top:560px;border-color:#E5484D;color:#E5484D">不建議</div>`,
  init() { K.hideLines('h61', 2); gsap.set(['#g610', '#g611', '#c61'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h61', 2, S.at(0), '大標「不用麻醉的洗牙，可以嗎？」');
    K.pop(S, '#g610', S.word('麻醉風險', 0, -.2), '灰色虛線標籤「少掉麻醉風險？」', { sfx: 'pop-card' });
    K.pop(S, '#g611', S.word('比較方便', 0, -.2), '灰色虛線標籤「比較方便？」', { sfx: 'pop-card' });
    K.rise(S, '#c61', S.word('美國獸醫牙科學院', 0, -.2), '卡片「美國獸醫牙科學院：不建議當成完整的牙科清潔方式」浮上');
    K.stamp(S, '#sp61', S.word('不建議', 0, -.1), '在卡片上蓋紅色印章「不建議」');
  },
});
K.scene('62', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「看起來乾淨」／「≠ 牙周問題處理好了」（橘）', '右邊大牙齒＋紅色牙齦，一條虛線分開「牙齦上方」和「牙齦下方」', '念到時兩列依序浮上：看得到的表面：清得比較乾淨（打勾）；牙齦下方：很難檢查和清潔（紅叉）', '念到「X 光」：X 光片圖示＋「也無法取代 X 光評估」'],
  mount: () => K.h('h62', ['看起來乾淨', '<b class="o">≠ 牙周問題處理好了</b>'], { y: 150, size: 84 }) +
    [['看得到的表面：清得比較乾淨', 0], ['牙齦下方：很難檢查和清潔', 1], ['也無法取代 X 光評估', 2]].map(([t, x], k) =>
      `<div class="cd" id="r62${k}" style="left:140px;top:${410 + k * 140}px;width:1050px;height:115px;padding:0 34px;display:flex;align-items:center;gap:22px">${x === 0 ? K.chk().replace('class="chk"', 'class="chk" style="margin:0"') : x === 1 ? `<div style="position:relative;width:44px;height:44px;flex:none"><div class="x" style="left:-28px;top:-28px;transform:scale(.6)"></div></div>` : `<div style="width:70px;height:70px;flex:none">${K.ic('Xray')}</div>`}<span style="font-size:36px;font-weight:900">${t}</span></div>`).join('') +
    K.icon('tt62', 'Gum', 1300, 330, 460) +
    `<svg class="abs" id="ln62" style="left:1240px;top:525px" width="580" height="10"><path d="M0 5 L580 5" stroke="#2E6BD8" stroke-width="5" stroke-dasharray="14 10"/></svg>` +
    K.anno('ab62', '', '牙齦上方', { x: 1775, y: 470, ss: 28 }) + K.anno('bl62', '', '牙齦下方', { x: 1775, y: 545, ss: 28 }),
  init() { K.hideLines('h62', 2); gsap.set(['#r620', '#r621', '#r622', '#ln62', '#ab62', '#bl62'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h62', 1, S.at(0), '大標第一行「看起來乾淨」');
    S.to('#h621', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('也就是說', 0, -.1), '念到「也就是說」：第二行「≠ 牙周問題處理好了」');
    S.sfx(S.word('也就是說', 0, -.1), 'tick', '結論：「叮咚」');
    K.fadeIn(S, ['#ln62', '#ab62', '#bl62'], S.at(0) + .3, '右邊牙齒畫出虛線：牙齦上方／牙齦下方');
    K.rise(S, '#r620', S.word('看得到的', 0, -.2), '「看得到的表面：清得比較乾淨」浮上', { dx: -40, dy: 0 });
    K.rise(S, '#r621', S.word('牙齦下方', 0, -.3), '「牙齦下方：很難檢查和清潔」浮上', { dx: -40, dy: 0, sfx: 'shake' });
    K.rise(S, '#r622', S.word('X 光', 0, -.4), '「也無法取代 X 光評估」浮上', { dx: -40, dy: 0 });
  },
});

// ---------- 幕 63｜擔心麻醉：直接問獸醫三個問題 ----------
const Q63 = [['術前會進行哪些檢查？', '術前'], ['目前的健康狀況適不適合麻醉？', '適不適合'], ['麻醉過程會如何監測？', '如何監測']];
K.scene('63', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「擔心麻醉？」／「直接問獸醫」（橘），下方拿著口鏡和探針的黑柴', '右邊手機對話「問獸醫」：念到時三個藍色泡泡依序出現：術前會進行哪些檢查？目前的健康狀況適不適合麻醉？麻醉過程會如何監測？', '最後左下方橘字「讓獸醫依個別狀況評估」'],
  mount: () => K.h('h63', ['擔心麻醉？', '<b class="o">直接問獸醫</b>'], { y: 230, size: 100 }) + K.d('tools', { id: 'dg63', x: 200, y: 500, w: 260 }) +
    K.phone('ph63', `<div class="abs" style="left:28px;right:28px;top:260px;display:flex;flex-direction:column;gap:20px">` + Q63.map(([t], k) => `<div class="qb" id="q63${k}">${t}</div>`).join('') + `</div>`, { title: '問獸醫' }) +
    K.concl('cn63', '讓獸醫<b style="color:#16130F">依個別狀況評估</b>', { x: 520, y: 760, size: 46 }),
  init() { K.hideLines('h63', 2); gsap.set('#ph63', { y: 900 }); gsap.set(['#q630', '#q631', '#q632', '#cn63', '#dg63'], { opacity: 0 }); },
  animate(S) {
    S.to('#ph63', { y: 0, duration: .8, ease: 'power3.out' }, S.start, '手機畫面跟著換幕滑上來');
    S.sfx(S.start, 'whoosh', '手機滑上來：「咻」', { gain: .6 });
    K.lines(S, 'h63', 2, S.at(0), '大標「擔心麻醉？直接問獸醫」');
    K.dogIn(S, '#dg63', S.word('詢問獸醫', 0, -.3), '拿著口鏡和探針的黑柴');
    Q63.forEach(([, w], k) => K.rise(S, '#q63' + k, S.word(w, 0, -.3), k ? '' : '念到時三個藍色泡泡依序出現', { sfx: 'pop', dy: 30 }));
    K.showConcl(S, '#cn63', S.word('個別狀況', 0, -.3), '橘字「讓獸醫依個別狀況評估」');
  },
});

// ---------- 幕 64｜最後再提醒一次 ----------
K.scene('64', 4, {
  enter: 'rise',
  visuals: ['小標「最後再提醒一次」；左邊兩塊圖示磚：牙結石、牙周病（牙齦紅腫）', '大字「已經有牙結石或牙周病」', '念到「潔牙骨、潔牙水和潔牙粉」：三塊圖示磚依序出現、變灰、打紅叉；下方橘字「都不能取代獸醫處置」'],
  mount: () => `<div class="eyebrow abs" id="k64" style="left:140px;top:170px;font-size:26px">最後再提醒一次</div>` +
    K.tile('Tartar', { id: 't640', x: 140, y: 260, size: 170 }) + K.tile('Gum', { id: 't641', x: 340, y: 260, size: 170 }) +
    `<div class="abs" id="tx64" style="left:570px;top:300px;font-size:64px;font-weight:900;letter-spacing:-.04em">已經有牙結石或牙周病</div>` +
    ['DentalBone', 'Water', 'Powder'].map((ic, k) => K.tile(ic, { id: 'p64' + k, x: 140 + k * 230, y: 560, size: 190 }) + `<div class="x" id="x64${k}" style="left:${250 + k * 230}px;top:530px"></div>`).join('') +
    K.concl('cn64', '都不能取代<b style="color:#16130F">必要的獸醫處置</b>', { x: 860, y: 610, size: 60 }),
  init() { gsap.set(['#k64', '#t640', '#t641', '#tx64', '#cn64', '#p640', '#p641', '#p642', '#x640', '#x641', '#x642'], { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#k64', S.at(0), '小標「最後再提醒一次」');
    K.pop(S, ['#t640', '#t641'], S.word('牙結石', 0, -.2), '兩塊圖示磚：牙結石、牙周病', { stagger: .15 });
    K.fadeIn(S, '#tx64', S.word('牙結石', 0, 0), '大字「已經有牙結石或牙周病」');
    [['潔牙骨', 0], ['潔牙水', 1], ['潔牙粉', 2]].forEach(([w, k]) => K.pop(S, '#p64' + k, S.word(w, 0, -.1), k ? '' : '念到時三塊圖示磚依序出現', { pitch: 1 + k * .1 }));
    const t = S.word('不能取代', 0, -.2);
    S.to(['#p640', '#p641', '#p642'], { opacity: .4, duration: .3 }, t, '三塊圖示磚變灰、打紅叉');
    S.to(['#x640', '#x641', '#x642'], { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)', stagger: .1 }, t);
    S.sfx(t, 'shake', '打叉：喀喀');
    K.showConcl(S, '#cn64', t + .2, '橘字「都不能取代必要的獸醫處置」');
  },
});

// ---------- 幕 65–67｜重點整理：記住這三件事 ----------
const TK = [
  { n: '1', ic: 'Seal', t: '先查 VOHC 認證', d: '核對產品名稱、版本和標章種類', at: '第一' },
  { n: '2', ic: 'Toothbrush', t: '每天刷牙最重要', d: '寵物專用牙膏；刷不了再用輔助產品', at: '第二' },
  { n: '3', ic: 'Clinic', t: '牙結石、牙周病看獸醫', d: '口臭、紅腫、流血、鬆動，先檢查', at: '第三' },
];
K.scene('65', 5, {
  enter: 'iris', irisAt: [960, 540], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；小標「重點整理」，大標「幫狗狗挑潔牙產品」／「記住這三件事」（橘）', '三張大卡先空著；念到「第一」：第一張卡翻上來、加橘框：1 先查 VOHC 認證＋核對產品名稱、版本和標章種類'],
  mount: () => K.kicker('k65', 'SUMMARY', '重點整理', { y: 120 }) + K.h('h65', ['幫狗狗挑潔牙產品，', '<b class="o">記住這三件事</b>'], { y: 160, size: 72 }) +
    TK.map((c, k) => `<div class="cd" id="tk${k}" style="left:${140 + k * 560}px;top:400px;width:520px;height:470px;padding:40px"><div style="display:flex;align-items:center;justify-content:space-between"><span class="big" style="font-size:130px;color:var(--or)">${c.n}</span><div style="width:130px;height:130px">${K.ic(c.ic)}</div></div><div class="t" style="margin-top:26px;font-size:42px">${c.t}</div><div class="d" style="font-size:27px;margin-top:16px">${c.d}</div></div>`).join(''),
  init() { K.hideLines('h65', 2); gsap.set(['#tk0', '#tk1', '#tk2'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k65', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h65', 2, S.at(0) + .1, '大標「幫狗狗挑潔牙產品，記住這三件事」');
    S.sfx(S.at(0), 'chime', '重點整理：叮鈴');
    const t = S.word('第一', 0, -.2);
    S.fromTo('#tk0', { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, t, '第一張卡翻上來、加橘框');
    K.ring(S, '#tk0', t + .2);
    S.sfx(t, 'flip', '翻卡：「啪」');
  },
});
[1, 2].forEach(k => K.scene(String(65 + k), 5, {
  enter: 'none',
  visuals: [`（接續）念到「${TK[k].at}」：第 ${k + 1} 張卡翻上來、加橘框：${TK[k].n} ${TK[k].t}＋${TK[k].d}`],
  animate(S) {
    const t = S.word(TK[k].at, 0, -.2);
    K.ring(S, '#tk' + (k - 1), t, false);
    S.fromTo('#tk' + k, { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, t, `第 ${k + 1} 張卡翻上來、加橘框`);
    K.ring(S, '#tk' + k, t + .2);
    S.sfx(t, 'flip', '翻卡：「啪」');
  },
}));

// ---------- 幕 68｜現在開始也不晚＋片尾 ----------
K.scene('68', -1, {
  enter: 'zoom', bg: 'mint',
  visuals: ['淡綠底；大標「現在開始照顧牙齒，」／「一點也不晚」（橘），右邊露齒笑的黑柴＋閃亮的牙齒圖示磚', '念到「每天多花一點時間」：下方橘色標籤「每天一點點，就是很好的開始」', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」，停格到結尾'],
  mount: () => K.h('h68', ['現在開始照顧牙齒，', '<b class="o">一點也不晚</b>'], { y: 300, size: 88 }) +
    K.d('grin', { id: 'dg68', x: 1340, y: 290, w: 380 }) + K.tile('Tooth', { id: 't68', x: 1180, y: 240, size: 200 }) +
    K.pill('p68', '每天一點點，就是很好的開始', 140, 620, 'o', { fs: 40 }) +
    `<div class="endcard" id="end68" style="z-index:1000"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() { K.hideLines('h68', 2); gsap.set(['#dg68', '#t68', '#p68', '#end68'], { opacity: 0 }); gsap.set('#end68 i', { scale: .7 }); },
  animate(S) {
    K.lines(S, 'h68', 2, S.word('完全不晚', 0, -1), '大標「現在開始照顧牙齒，一點也不晚」', .5);
    K.dogIn(S, '#dg68', S.at(0) + .3, '露齒笑的黑柴');
    K.pop(S, '#t68', S.word('口腔健康', 0, -.2), '閃亮的牙齒圖示磚', { sfx: 'ding-soft' });
    K.pop(S, '#p68', S.word('每天多花', 0, -.2), '橘色標籤「每天一點點，就是很好的開始」', { sfx: 'pop-card' });
    S.sfx(S.word('更簡單', 0, -.2), 'chime', '收尾：叮鈴');
    const e = S.narrEnd + 1.2;
    S.to(['#logo', '#nav'], { opacity: 0, duration: .5 }, e);
    S.to('#end68', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end68 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
