// 幕 05–17｜基本觀念：先看懂三件事（營養完整、AAFCO 和 FEDIAF、主食和零食）

// ---------- 幕 05｜章節卡 ----------
const T05 = [['Label', '營養完整'], ['Seal', '營養標準'], ['Jerky', '主食和零食']];
K.scene('05', 0, {
  enter: 'iris', irisAt: [1400, 520], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；章節卡「STEP 00｜基本觀念」，大標「先看懂三件事，」／「才知道飼料怎麼挑」（橘）', '念到「三件事」：右邊三塊圖示磚依序彈出：1 營養完整、2 營養標準、3 主食和零食'],
  mount: () => K.chap('05', 0, ['先看懂三件事，', '<b class="o">才知道飼料怎麼挑</b>'], { size: 88 }) +
    T05.map(([ic, t], k) => K.tile(ic, { id: 't05' + k, x: 1180 + k * 230, y: 420, size: 190 }) +
      `<div class="abs" id="l05${k}" style="left:${1180 + k * 230 - 30}px;top:630px;width:250px;text-align:center;font-size:30px;font-weight:900"><span class="big" style="font-size:30px;color:var(--or);margin-right:6px">${k + 1}</span>${t}</div>`).join(''),
  init() { K.hideLines('h05', 2); },
  animate(S) {
    K.chapIn(S, '05', S.at(0));
    T05.forEach((_, k) => K.pop(S, ['#t05' + k, '#l05' + k], S.word('三件事', 0, -.2 + k * .25), k ? '' : '右邊三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
  },
});

// ---------- 幕 06｜第一件事：吃得飽 ≠ 營養夠 ----------
K.scene('06', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「第一件事」，大標「吃得飽，」／「不代表營養夠」（橘）', '右邊一碗飼料，念到「有肉、有蔬菜」：肉和蔬菜圖示彈出；念到「先問大家一個問題」：藍色手寫大問號', '念到「每天的主食」：標籤「可以當每天的主食？」；念到「不一定喔」：蓋上橘色印章「不一定！」'],
  mount: () => K.kicker('k06', '01', '第一件事', { y: 230 }) + K.h('h06', ['吃得飽，', '<b class="o">不代表營養夠</b>'], { y: 290, size: 96 }) +
    K.tile('Kibble', { id: 't06', x: 1210, y: 240, size: 260 }) + K.tile('Meat', { id: 'm06', x: 1020, y: 330, size: 150 }) + K.tile('Veg', { id: 'v06', x: 1510, y: 330, size: 150 }) +
    K.anno('q06', '?', '先問一個問題', { x: 1690, y: 160, bs: 180, ss: 32 }) +
    K.pill('p06', '可以當每天的主食？', 1150, 590, '', { fs: 38 }) +
    `<div class="stamp" id="s06" style="left:1250px;top:700px">不一定！</div>`,
  init() { K.hideLines('h06', 2); gsap.set(['#q06', '#p06'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k06', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h06', 2, S.at(0) + .1, '大標「吃得飽，不代表營養夠」');
    K.pop(S, '#t06', S.word('一包飼料', 0, -.2), '右邊一碗飼料彈出');
    K.pop(S, '#m06', S.word('有肉', 0, -.1), '肉、蔬菜圖示彈出', { pitch: 1.1 });
    K.pop(S, '#v06', S.word('有蔬菜', 0, -.1), '', { pitch: 1.2 });
    K.pop(S, '#q06', S.word('一個問題', 0, -.3), '藍色手寫大問號', { sfx: 'boing' });
    S.to('#q06', { opacity: 0, duration: .3 }, S.word('每天的主食', 0, -.6));
    K.rise(S, '#p06', S.word('每天的主食', 0, -.4), '標籤「可以當每天的主食？」', { sfx: 'pop-card' });
    K.stamp(S, '#s06', S.word('不一定', 0, -.2), '蓋上橘色印章「不一定！」');
  },
});

// ---------- 幕 07｜營養素：不只蛋白質和脂肪 ----------
const NU07 = [['蛋白質', '蛋白質'], ['脂肪', '脂肪'], ['維生素', '維生素'], ['礦物質', '礦物質'], ['其他營養素', '其他']];
K.scene('07', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「營養不只」／「蛋白質和脂肪」（橘）', '右邊五條營養長條，念到哪一種亮哪一種：蛋白質、脂肪、維生素、礦物質、其他營養素', '念到「長期不足」：「維生素」那條停在很低、變紅，藍色手寫「長期不足」；念到「比例不適合」：「礦物質」那條衝過頭', '念到「也不代表」：左下橘字「吃得很飽 ≠ 營養完整」'],
  mount: () => K.h('h07', ['營養不只', '<b class="o">蛋白質和脂肪</b>'], { y: 250, size: 96 }) +
    NU07.map(([t], k) => `<div class="abs" id="n07${k}" style="left:980px;top:${200 + k * 120}px;width:800px"><div style="font-size:30px;font-weight:900;margin-bottom:12px">${t}</div><div class="bar" style="position:relative;width:640px;height:40px"><i id="b07${k}" style="width:100%;background:#F97316;transform:scaleX(0)"></i></div></div>`).join('') +
    `<div class="abs" style="left:1620px;top:200px;width:4px;height:590px;border-left:4px dashed #CFD8E6" id="g07"></div>` +
    K.anno('an07', '', '長期不足', { x: 1240, y: 438, ss: 34, align: 'left' }) + K.anno('an07b', '', '比例不適合', { x: 1660, y: 560, ss: 30, align: 'left' }) +
    K.concl('cn07', '吃得很飽 <span style="color:#16130F">≠</span> 營養完整', { y: 620, size: 60 }),
  init() { K.hideLines('h07', 2); gsap.set(['#an07', '#an07b', '#cn07', '#g07'], { opacity: 0 }); gsap.set(NU07.map((_, k) => '#n07' + k), { opacity: .25 }); },
  animate(S) {
    K.lines(S, 'h07', 2, S.at(0), '大標「營養不只蛋白質和脂肪」');
    S.to('#g07', { opacity: 1, duration: .3 }, S.word('蛋白質', 0, -.4));
    NU07.forEach(([n, w], k) => {
      const t = S.word(w, 0, -.15);
      S.to('#n07' + k, { opacity: 1, duration: .25 }, t, k ? '' : '念到哪一種，那一條長條亮起、填到需要的量');
      S.to('#b07' + k, { scaleX: k === 2 || k === 3 ? .2 : .85, duration: .6, ease: 'power2.out' }, t);
      S.sfx(t, 'pop', `${n}：「啵」`, { pitch: 1 + k * .08, gain: .7 });
    });
    const t1 = S.word('長期不足', 0, -.2);
    S.to('#b07' + 2, { backgroundColor: '#E5484D', duration: .3 }, t1, '「維生素」停在很低、變紅');
    K.fadeIn(S, '#an07', t1 + .2, '藍色手寫「長期不足」');
    S.sfx(t1, 'pop-low', '不足：低音「啵」');
    const t2 = S.word('比例不適合', 0, -.2);
    S.to('#b07' + 3, { scaleX: 1.12, backgroundColor: '#E5484D', duration: .5, ease: 'back.out(2)' }, t2, '「礦物質」衝過虛線（比例不適合）');
    K.fadeIn(S, '#an07b', t2 + .2, '藍色手寫「比例不適合」');
    K.showConcl(S, '#cn07', S.word('也不代表', 0, -.3), '左邊橘字「吃得很飽 ≠ 營養完整」');
  },
});

// ---------- 幕 08｜營養完整：Complete and Balanced ----------
K.scene('08', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「一個重要的概念」，大標「營養完整」（橘）', '右邊一包飼料（白色包裝、橘色色帶）；念到「Complete」：包裝上浮出標籤「Complete」，念到「Complete and Balanced」：擴成「Complete and Balanced」', '念到「特定生命階段」：藍色手寫「特定生命階段所需」；念到「日常主食」：蓋上印章「可以當主食」'],
  mount: () => K.ey('k08', '一個重要的概念', 140, 250) + K.h('h08', ['<b class="o">營養完整</b>'], { y: 300, size: 140 }) +
    `<div class="sub" id="s08" style="left:140px;top:520px">按照營養標準設計<br>提供特定生命階段需要的<b>完整營養</b></div>` +
    K.bag('bg08', `<div style="height:150px;display:flex;align-items:center;justify-content:center"><div style="width:120px;height:120px">${K.ic('Paw')}</div></div>` +
      `<div style="padding:0 40px"><div class="ln2" style="width:80%"></div><div class="ln2" style="width:60%"></div></div>` +
      `<div class="stm" id="cb08" style="text-align:center;font-family:'Bricolage Grotesque';font-size:38px;font-weight:800;letter-spacing:-.02em;white-space:nowrap;border-color:#F97316;color:#B4470A;background:#FFF6EE"><span id="cb08a">Complete</span><span id="cb08b"> and Balanced</span></div>`,
      { x: 1100, y: 180, w: 600, h: 640, title: 'DOG FOOD' }) +
    K.anno('an08', '', '特定生命階段所需', { x: 1170, y: 840, ss: 34 }) +
    `<div class="stamp" id="sp08" style="left:1250px;top:620px">可以當主食</div>`,
  init() { K.hideLines('h08', 1); gsap.set(['#s08', '#cb08', '#an08'], { opacity: 0 }); gsap.set('#cb08b', { opacity: 0 }); gsap.set('#bg08', { y: 60, opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k08', S.at(0));
    S.to('#bg08', { y: 0, opacity: 1, duration: .7, ease: 'power3.out' }, S.at(0) + .2, '右邊一包飼料浮上');
    S.sfx(S.at(0) + .2, 'slide', '飼料浮上：輕「咻」');
    K.lines(S, 'h08', 1, S.word('營養完整', 0, -.3), '大標「營養完整」');
    S.sfx(S.word('營養完整', 0, -.3), 'tick', '營養完整：「叮咚」');
    K.pop(S, '#cb08', S.word('Complete', 0, -.1), '包裝上浮出標籤「Complete」', { sfx: 'pop-card' });
    S.to('#cb08b', { opacity: 1, duration: .3 }, S.word('Balanced', 0, -.2), '擴成「Complete and Balanced」');
    S.sfx(S.word('Balanced', 0, -.2), 'pop', '「啵」', { pitch: 1.2 });
    K.rise(S, '#s08', S.word('簡單來說', 0, -.1), '左邊說明「按照營養標準設計，提供特定生命階段需要的完整營養」');
    K.fadeIn(S, '#an08', S.word('特定生命階段', 0, -.2), '藍色手寫「特定生命階段所需」');
    K.stamp(S, '#sp08', S.word('日常主食', 0, -.2), '蓋上印章「可以當主食」');
  },
});

// ---------- 幕 09｜補充品、零食、短期餵食：不能當唯一的食物 ----------
const C09 = [['Pill', '補充品', '補充品'], ['Jerky', '零食', '零食'], ['Clock', '短期、間歇性餵食', '短期']];
K.scene('09', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「這些產品，」／「不能當唯一的食物」（橘）', '念到時三張卡依序浮上：補充品、零食、短期、間歇性餵食；念到「唯一的食物」：三張卡一起打叉', '念到「除非有獸醫」：藍色標籤「特殊情況：獸醫指導」', '念到「下次買飼料時」：下方橘字「不只看有多少肉，確認是完整營養配方」'],
  mount: () => K.h('h09', ['這些產品，', '<b class="o">不能當唯一的食物</b>'], { y: 150, size: 80 }) +
    C09.map(([ic, t], k) => K.vcard('c09' + k, { x: 140 + k * 440, y: 380, w: 400, h: 330, ic, t, ts: k === 2 ? 34 : 40, is: 130 }) + K.xm('x09' + k, 440 + k * 440, 360, 80)).join('') +
    K.ipill('p09', 'Clinic', '特殊情況：獸醫指導', 1470, 480, 'bt', { fs: 32 }) +
    K.concl('cn09', '不只看有多少肉，<span style="color:#16130F">確認是完整營養配方</span>', { y: 800, size: 54 }),
  init() { K.hideLines('h09', 2); gsap.set(['#c090', '#c091', '#c092', '#p09', '#cn09'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h09', 2, S.at(0), '大標「這些產品，不能當唯一的食物」');
    C09.forEach(([, , w], k) => K.rise(S, '#c09' + k, S.word(w, 0, -.2), k ? '' : '念到時三張卡依序浮上', { sfx: 'pop-card' }));
    const t = S.word('唯一的食物', 0, -.3);
    C09.forEach((_, k) => K.xIn(S, '#x09' + k, t + k * .15, k ? '' : '三張卡一起打叉'));
    K.pop(S, '#p09', S.word('除非有獸醫', 0, -.2), '藍色標籤「特殊情況：獸醫指導」', { sfx: 'pop-card' });
    K.showConcl(S, '#cn09', S.word('下次買飼料', 0, -.2), '下方橘字「不只看有多少肉，確認是完整營養配方」');
  },
});

// ---------- 幕 10｜第二件事：AAFCO 和 FEDIAF 是什麼？ ----------
K.scene('10', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「第二件事」，大標「AAFCO 和 FEDIAF」／「是什麼？」（橘）', '右邊一包進口飼料，念到時包裝上依序出現標籤「AAFCO」「FEDIAF」', '念到「重要參考來源」：藍色手寫「營養標準的參考來源」＋箭頭指向兩個標籤；歪頭的黑柴'],
  mount: () => K.kicker('k10', '02', '第二件事', { y: 230 }) + K.h('h10', ['AAFCO 和 FEDIAF', '<b class="o">是什麼？</b>'], { y: 290, size: 96 }) +
    K.bag('bg10', `<div style="height:200px;display:flex;align-items:center;justify-content:center"><div style="width:150px;height:150px">${K.ic('Globe')}</div></div>` +
      `<div style="padding:0 40px"><div class="ln2" style="width:80%"></div><div class="ln2" style="width:55%"></div></div>`, { x: 1180, y: 200, w: 520, h: 600, title: 'IMPORTED' }) +
    K.pill('a10', 'AAFCO', 1240, 600, 'o', { fs: 40 }) + K.pill('f10', 'FEDIAF', 1450, 690, 'b', { fs: 40 }) +
    K.anno('an10', '', '營養標準的參考來源', { x: 300, y: 650, ss: 40, align: 'left' }) +
    K.arrow('ar10', { x: 760, y: 560, w: 440, h: 160, d: 'M10 120 C 150 150 300 120 430 60' }) +
    K.dog('tilt', { id: 'dg10', x: 140, y: 700, w: 200, shadow: false }),
  init() { K.hideLines('h10', 2); gsap.set(['#a10', '#f10', '#an10', '#dg10'], { opacity: 0 }); gsap.set('#bg10', { opacity: 0, y: 60 }); },
  animate(S) {
    S.fromTo('#k10', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h10', 2, S.at(0) + .1, '大標「AAFCO 和 FEDIAF 是什麼？」');
    S.to('#bg10', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, S.word('進口飼料', 0, -.3), '右邊一包進口飼料浮上');
    S.sfx(S.word('進口飼料', 0, -.3), 'slide', '飼料浮上：輕「咻」');
    K.pop(S, '#a10', S.word('AAFCO', 1, -.1), '包裝上出現標籤「AAFCO」', { sfx: 'pop-card' });
    K.pop(S, '#f10', S.word('FEDIAF', 1, -.1), '包裝上出現標籤「FEDIAF」', { sfx: 'pop-card', pitch: 1.12 });
    K.dogIn(S, '#dg10', S.word('到底是什麼', 0, -.2), '歪頭的黑柴');
    K.fadeIn(S, '#an10', S.word('重要參考來源', 0, -.6), '藍色手寫「營養標準的參考來源」');
    K.draw(S, '#ar10', S.word('重要參考來源', 0, -.4), '箭頭指向兩個標籤');
  },
});

// ---------- 幕 11｜美國、歐洲；依生命階段訂標準（手機畫面） ----------
const ROW11 = [['AAFCO', '美國飼料管理協會', '美國飼料管理協會'], ['FEDIAF', '歐洲寵物食品工業聯合會', '歐洲寵物食品'], ['標準', '依不同生命階段訂定', '訂定']];
K.scene('11', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「營養標準」／「依生命階段訂定」（橘）', '右邊手機畫面「兩個營養標準」，念到時三張資料卡依序滑入：AAFCO 美國飼料管理協會、FEDIAF 歐洲寵物食品工業聯合會、標準 依不同生命階段訂定', '念到「幼犬正在成長」：左下兩張卡：幼犬（成長）≠ 成犬（維持健康）', '念到「哪個階段設計的」：藍色手寫「確認是按哪個階段設計」'],
  mount: () => K.h('h11', ['營養標準', '<b class="o">依生命階段訂定</b>'], { y: 200, size: 88 }) +
    K.phone('ph11', `<div class="rows">${ROW11.map(([a, b], k) => `<div class="row" id="r11${k}"><span class="when" style="width:140px;font-family:'Space Mono';font-weight:700">${a}</span><span class="what" style="font-size:29px">${b}</span></div>`).join('')}</div>`, { title: '兩個營養標準' }) +
    [['ball', '幼犬', '成長'], ['sit', '成犬', '維持健康']].map(([p, t, d], k) => `<div class="cd" id="c11${k}" style="left:${140 + k * 500}px;top:470px;width:420px;height:330px;padding:30px;text-align:center"><div style="height:190px;position:relative">${K.dog(p, { x: 115, y: 10, w: 130, shadow: false })}</div><div class="t" style="font-size:40px;margin-top:6px">${t}</div><div class="d">${d}</div></div>`).join('') +
    `<div class="abs big" id="ne11" style="left:590px;top:560px;font-size:110px;color:var(--or)">≠</div>` +
    K.anno('an11', '', '確認是按哪個階段設計', { x: 140, y: 840, ss: 36, align: 'left' }),
  init() { K.hideLines('h11', 2); gsap.set('#ph11', { y: 900 }); gsap.set(['#c110', '#c111', '#ne11', '#an11'], { opacity: 0 }); },
  animate(S) {
    K.phoneIn(S, '#ph11');
    K.lines(S, 'h11', 2, S.at(0), '大標「營養標準，依生命階段訂定」');
    ROW11.forEach(([, , w], k) => {
      const t = S.word(w, 0, -.3);
      if (k) S.to('#r11' + (k - 1), { boxShadow: K.ROW0, duration: .3 }, t);
      K.rise(S, '#r11' + k, t, k ? '' : '念到時三張資料卡依序滑入、加橘框', { dx: 60, dy: 0 });
      S.to('#r11' + k, { boxShadow: K.ROW1, duration: .3 }, t + .2);
    });
    K.rise(S, '#c110', S.word('幼犬正在成長', 0, -.2), '左下：幼犬（成長）', { sfx: 'pop-card' });
    K.rise(S, '#c111', S.word('成犬維持', 0, -.2), '成犬（維持健康）', { sfx: 'pop-card' });
    K.pop(S, '#ne11', S.word('不完全相同', 0, -.2), '中間橘色「≠」', { sfx: 'pop-low' });
    K.fadeIn(S, '#an11', S.word('哪個階段', 0, -.3), '藍色手寫「確認是按哪個階段設計」');
  },
});
K.ROW0 = '0 0 0 0px #F97316,0 10px 24px -16px rgba(30,40,80,.35)'; K.ROW1 = '0 0 0 4px #F97316,0 10px 24px -16px rgba(30,40,80,.35)';

// ---------- 幕 12｜營養聲明是重要線索；但不等於適合每一隻 ----------
const F12 = [['Scale', '體重'], ['PlayTime', '活動量'], ['Heart', '健康狀況']];
K.scene('12', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「包裝上的營養聲明，」／「是重要線索」（橘），下方聲明卡「符合 AAFCO 某個生命階段的營養標準」＋放大鏡', '念到「不過」：大標換成「符合標準，」／「不等於適合每一隻」，聲明卡退場', '念到時三塊圖示磚依序彈出：體重、活動量、健康狀況；右邊三隻不同的狗（柯基、黑柴、黃金獵犬）'],
  mount: () => K.h('h12a', ['包裝上的營養聲明，', '<b class="o">是重要線索</b>'], { y: 180, size: 84 }) +
    K.bar('st12', { x: 140, y: 520, w: 1100, h: 170, ic: 'Magnifier', t: '符合 AAFCO 某個生命階段的營養標準', ts: 42 }) +
    K.h('h12b', ['符合標準，', '<b class="o">不等於適合每一隻</b>'], { y: 180, size: 84 }) +
    F12.map(([ic, t], k) => K.tile(ic, { id: 't12' + k, x: 140 + k * 230, y: 520, size: 180 }) +
      `<div class="abs" id="l12${k}" style="left:${140 + k * 230 - 20}px;top:720px;width:220px;text-align:center;font-size:32px;font-weight:900">${t}</div>`).join('') +
    K.dog('corgi', { id: 'd120', x: 1000, y: 470, w: 250 }) + K.dog('sit', { id: 'd121', x: 1260, y: 420, w: 260 }) + K.dog('golden', { id: 'd122', x: 1540, y: 380, w: 280 }),
  init() { K.hideLines('h12a', 2); K.hideLines('h12b', 2); gsap.set(['#st12', '#d120', '#d121', '#d122'], { opacity: 0 }); gsap.set(F12.map((_, k) => '#t12' + k).concat(F12.map((_, k) => '#l12' + k)), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h12a', 2, S.at(0), '大標「包裝上的營養聲明，是重要線索」');
    K.rise(S, '#st12', S.word('AAFCO', 0, -.3), '聲明卡「符合 AAFCO 某個生命階段的營養標準」', { sfx: 'pop-card' });
    K.ring(S, '#st12', S.word('重要線索', 0, -.2));
    const t = S.word('不過', 0, -.2);
    S.to('#st12', { opacity: 0, y: 30, duration: .35 }, t, '聲明卡退場');
    K.swapH(S, 'h12a', 2, 'h12b', 2, t, '大標換成「符合標準，不等於適合每一隻」');
    [0, 1, 2].forEach(k => K.dogIn(S, '#d12' + k, S.word('每一隻狗狗', 0, -.3 + k * .15), k ? '' : '右邊三隻不同的狗跳出來'));
    F12.forEach(([, w], k) => K.pop(S, ['#t12' + k, '#l12' + k], S.word(w, 0, -.15), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
  },
});

// ---------- 幕 13｜台灣還沒有自己的標準；法案進度時間軸 ----------
const TL13 = [
  { x: 300, b: '2025.5', s: '送行政院審議', at: '2025' },
  { x: 740, b: '2026.7', s: '通過行政院初審', at: '初審' },
  { x: 1180, b: '現在', s: '等院會排審', at: '排審' },
  { x: 1620, b: '之後', s: '送立法院', at: '立法院' },
];
const TLY = 640;
K.scene('13', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「台灣還沒有」／「自己的營養標準」（橘）', '念到「《寵物食品管理法》」：橘色標籤「《寵物食品管理法》草案」，下方時間軸畫出來', '念到時四個節點依序亮起：2025.5 送行政院審議 → 2026.7 通過行政院初審 → 現在 等院會排審 → 之後 送立法院（虛線、還沒到）'],
  mount: () => K.h('h13', ['台灣還沒有', '<b class="o">自己的營養標準</b>'], { y: 150, size: 84 }) +
    K.pill('p13', '《寵物食品管理法》草案', 1120, 230, 'o', { fs: 38 }) +
    `<div class="abs" id="ln13" style="left:300px;top:${TLY - 3}px;width:1320px;height:6px;border-radius:3px;background:linear-gradient(90deg,#F97316 0,#F97316 66%,transparent 66%),repeating-linear-gradient(90deg,#C9D6E8 0 18px,transparent 18px 30px);transform-origin:0 50%"></div>` +
    TL13.map((n, k) => `<div class="tl-node${k < 3 ? ' on' : ''}" id="nd13${k}" style="left:${n.x}px;top:${TLY}px"></div><div class="tl-lab" id="lb13${k}" style="left:${n.x}px;top:${k % 2 ? TLY - 190 : TLY + 50}px"><b${k === 3 ? ' style="color:#A29D97"' : ''}>${n.b}</b><span>${n.s}</span></div>`).join(''),
  init() { K.hideLines('h13', 2); gsap.set(['#p13'], { opacity: 0 }); gsap.set('#ln13', { scaleX: 0 }); gsap.set(TL13.map((_, k) => '#nd13' + k).concat(TL13.map((_, k) => '#lb13' + k)), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h13', 2, S.at(0), '大標「台灣還沒有自己的營養標準」');
    const t = S.word('寵物食品管理法', 0, -.3);
    K.pop(S, '#p13', t, '橘色標籤「《寵物食品管理法》草案」', { sfx: 'pop-card' });
    S.to('#ln13', { scaleX: 1, duration: 1, ease: 'power2.inOut' }, t + .3, '下方時間軸畫出來');
    S.sfx(t + .3, 'draw', '畫出時間軸：筆刷聲', { dur: .9, gain: .5 });
    TL13.forEach((n, k) => {
      const tk = S.word(n.at, 0, -.2);
      K.pop(S, '#nd13' + k, tk, k ? '' : '念到時節點依序亮起', { pitch: 1 + k * .08 });
      K.rise(S, '#lb13' + k, tk + .1, '', { sfx: false, dy: 20 });
    });
  },
});

// ---------- 幕 14｜未來參考 AAFCO＋FEDIAF；出爐之前先看這兩個 ----------
K.scene('14', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「未來台灣的標準，」／「參考兩者的共同標準」（橘）', '右邊：「AAFCO」「FEDIAF」兩個標籤，兩支藍色箭頭往下匯到「台灣未來的標準」卡片', '念到「最新公告」：藍色手寫「進度以農業部最新公告為準」', '念到「在台灣標準出爐之前」：大標換成「標準出爐之前，」／「先看這兩個」，兩個標籤加橘框'],
  mount: () => K.h('h14a', ['未來台灣的標準，', '<b class="o">參考兩者的共同標準</b>'], { y: 200, size: 80 }) +
    K.h('h14b', ['標準出爐之前，', '<b class="o">先看這兩個</b>'], { y: 200, size: 80 }) +
    K.pill('a14', 'AAFCO', 1120, 240, 'o', { fs: 44 }) + K.pill('f14', 'FEDIAF', 1480, 240, 'b', { fs: 44 }) +
    K.arrow('ar140', { x: 1180, y: 330, w: 220, h: 200, d: 'M30 10 C 40 90 120 150 200 180' }) +
    K.arrow('ar141', { x: 1420, y: 330, w: 220, h: 200, d: 'M190 10 C 180 90 100 150 20 180' }) +
    `<div class="cd" id="c14" style="left:1120px;top:540px;width:600px;height:200px;padding:30px;display:flex;align-items:center;gap:24px"><div style="width:130px;height:130px;flex:none">${K.ic('Flag')}</div><div class="t" style="font-size:40px">台灣未來的標準</div></div>` +
    K.anno('an14', '', '進度以農業部最新公告為準', { x: 140, y: 560, ss: 36, align: 'left' }),
  init() { K.hideLines('h14a', 2); K.hideLines('h14b', 2); gsap.set(['#a14', '#f14', '#c14', '#an14'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h14a', 2, S.at(0), '大標「未來台灣的標準，參考兩者的共同標準」');
    K.pop(S, '#a14', S.word('AAFCO', 0, -.1), '標籤「AAFCO」', { sfx: 'pop-card' });
    K.pop(S, '#f14', S.word('FEDIAF', 0, -.1), '標籤「FEDIAF」', { sfx: 'pop-card', pitch: 1.12 });
    K.draw(S, '#ar140', S.word('共同標準', 0, -.4), '兩支藍色箭頭往下匯合', .5);
    K.draw(S, '#ar141', S.word('共同標準', 0, -.3), '', .5);
    K.rise(S, '#c14', S.word('共同標準', 0, .1), '卡片「台灣未來的標準」浮上', { sfx: 'pop-card' });
    K.fadeIn(S, '#an14', S.word('最新公告', 0, -.4), '藍色手寫「進度以農業部最新公告為準」');
    const t = S.word('出爐之前', 0, -.4);
    K.swapH(S, 'h14a', 2, 'h14b', 2, t, '大標換成「標準出爐之前，先看這兩個」');
    S.to('#an14', { opacity: 0, duration: .3 }, t);
    S.to(['#a14', '#f14'], { boxShadow: '0 0 0 6px #F97316,0 14px 30px -16px rgba(30,40,80,.35)', scale: 1.08, duration: .35, stagger: .1 }, S.word('AAFCO', 1, -.1), '兩個標籤加橘框、放大');
    S.sfx(S.word('AAFCO', 1, -.1), 'ding-soft', '亮起：輕「叮」');
  },
});

// ---------- 幕 15｜第三件事：主食和零食 ----------
const C15 = [['Kibble', '主食', '每天主要的營養來源', '主食是'], ['Jerky', '零食', '獎勵、訓練、偶爾補充', '零食則是']];
K.scene('15', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「第三件事」，大標「主食和零食，」／「不能混為一談」（橘）', '念到時右邊兩張卡依序浮上：主食（狗碗）每天主要的營養來源、零食（肉乾）獎勵、訓練、偶爾補充'],
  mount: () => K.kicker('k15', '03', '第三件事', { y: 230 }) + K.h('h15', ['主食和零食，', '<b class="o">不能混為一談</b>'], { y: 290, size: 88 }) +
    C15.map(([ic, t, d], k) => K.vcard('c15' + k, { x: 960 + k * 440, y: 280, w: 400, h: 460, ic, t, d, ts: 52, is: 170 })).join(''),
  init() { K.hideLines('h15', 2); gsap.set(['#c150', '#c151'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k15', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h15', 2, S.at(0) + .1, '大標「主食和零食，不能混為一談」');
    C15.forEach(([, , , w], k) => {
      const t = S.word(w, 0, -.2);
      if (k) K.ring(S, '#c150', t, false);
      K.rise(S, '#c15' + k, t, k ? '' : '念到時兩張卡依序浮上、加橘框', { sfx: 'pop-card' });
      K.ring(S, '#c15' + k, t + .2);
    });
  },
});

// ---------- 幕 16｜零食占掉每日熱量額度 ----------
const TR16 = [['肉乾', 'Jerky'], ['訓練小零食', 'Paw'], ['潔牙骨', 'DentalBone'], ['人類食物', 'Meat']];
const BW = 1640, MAIN = 1360, TW = 130;
K.scene('16', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「零食也會」／「占掉熱量額度」（橘）', '中間一條「每天的熱量額度」長條：主食先填滿大部分', '念到時四個零食標籤依序彈出，每個都往長條後面塞一段：肉乾、訓練小零食、潔牙骨、人類食物 → 超出額度的紅色虛線', '念到「吃不下主食」：主食那段縮短；念到「比例失衡」：藍色手寫「營養比例失衡」；下方橘字「零食太多，反而影響健康」'],
  mount: () => K.h('h16', ['零食也會', '<b class="o">占掉熱量額度</b>'], { y: 140, size: 80 }) +
    TR16.map(([t, ic], k) => K.ipill('tr16' + k, ic, t, 140 + k * 360, 400, '', { fs: 32 })).join('') +
    `<div class="abs" style="left:140px;top:540px;font-size:26px;font-weight:700;color:#9A9590" id="lb16">每天的熱量額度</div>` +
    `<div class="abs" id="bar16" style="left:140px;top:590px;width:${BW}px;height:96px;border-radius:30px;background:#ECEAE7"></div>` +
    `<div class="abs" id="mn16" style="left:140px;top:590px;width:${MAIN}px;height:96px;border-radius:30px 0 0 30px;background:linear-gradient(90deg,#FFB070,#F97316);color:#fff;font-size:34px;font-weight:900;display:flex;align-items:center;padding-left:40px;transform-origin:0 50%">主食</div>` +
    TR16.map((_, k) => `<div class="abs sg16" id="sg16${k}" style="left:${140 + MAIN + k * TW}px;top:590px;width:${TW - 6}px;height:96px;border-radius:14px;background:#C9734F"></div>`).join('') +
    `<div class="abs" id="lim16" style="left:${140 + BW}px;top:560px;height:156px;border-left:5px dashed #E5484D"></div>` +
    K.anno('an16', '', '營養比例失衡', { x: 1400, y: 730, ss: 36 }) +
    K.concl('cn16', '零食太多，<span style="color:#16130F">反而影響健康</span>', { y: 800, size: 56 }),
  init() { K.hideLines('h16', 2); gsap.set(['#an16', '#cn16', '#lim16'], { opacity: 0 }); gsap.set('#mn16', { scaleX: 0 }); gsap.set('.sg16', { opacity: 0, x: 120 }); gsap.set(TR16.map((_, k) => '#tr16' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h16', 2, S.at(0), '大標「零食也會占掉熱量額度」');
    S.to('#mn16', { scaleX: 1, duration: .8, ease: 'power2.out' }, S.at(0) + .3, '「每天的熱量額度」長條：主食先填滿大部分');
    S.sfx(S.at(0) + .3, 'slide', '長條填滿：輕「咻」');
    TR16.forEach(([w], k) => {
      const t = S.word(w, 0, -.15);
      K.pop(S, '#tr16' + k, t, k ? '' : '念到時零食標籤依序彈出，往長條後面塞一段', { pitch: 1 + k * .08 });
      S.to('#sg16' + k, { opacity: 1, x: 0, duration: .45, ease: 'back.out(1.6)' }, t + .1);
    });
    K.fadeIn(S, '#lim16', S.word('熱量額度', 0, -.3), '超出額度：紅色虛線', .3);
    const t1 = S.word('吃不下主食', 0, -.3);
    S.to('#mn16', { scaleX: .72, duration: .6, ease: 'power2.inOut' }, t1, '主食那段縮短（吃不下主食）');
    TR16.forEach((_, k) => S.to('#sg16' + k, { x: -MAIN * .28, duration: .6, ease: 'power2.inOut' }, t1));
    S.sfx(t1, 'whimper', '吃不下：小嗚咽', { gain: .5 });
    K.fadeIn(S, '#an16', S.word('比例失衡', 0, -.2), '藍色手寫「營養比例失衡」');
    K.showConcl(S, '#cn16', S.word('影響健康', 0, -.5), '下方橘字「零食太多，反而影響健康」');
  },
});

// ---------- 幕 17｜記住順序：營養 → 年紀 → 形式 ----------
const ST17 = [['Label', '營養是否完整', '營養是否完整'], ['Calendar', '適合哪個年紀', '哪個年紀'], ['FoodBag', '喜歡的飼料形式', '飼料形式']];
K.scene('17', 0, {
  enter: 'rise', bg: 'mint',
  visuals: ['淡綠底；大標「記住這個順序」', '念到時三張步驟卡依序浮上、中間藍色箭頭：1 營養是否完整 → 2 適合哪個年紀 → 3 喜歡的飼料形式', '念到「接下來」：右下坐著的黑柴，橘色標籤「下一步：實際買飼料怎麼判斷」'],
  mount: () => K.h('h17', ['記住這個<b class="o">順序</b>'], { y: 160, size: 84 }) +
    ST17.map(([ic, t], k) => K.vcard('c17' + k, { x: 140 + k * 580, y: 320, w: 480, h: 400, n: 'STEP ' + (k + 1), ic, t, ts: 42 })).join('') +
    [0, 1].map(k => K.arrow('a17' + k, { x: 625 + k * 580, y: 490, w: 90, h: 60, d: 'M8 30 C 30 16 60 16 82 30' })).join('') +
    K.pill('p17', '下一步：實際買飼料怎麼判斷', 140, 800, 'o', { fs: 38 }),
  init() { K.hideLines('h17', 1); gsap.set(['#c170', '#c171', '#c172', '#p17'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h17', 1, S.at(0), '大標「記住這個順序」');
    ST17.forEach(([, , w], k) => {
      const t = S.word(w, 0, -.3);
      if (k) { K.draw(S, '#a17' + (k - 1), t - .3, k === 1 ? '中間藍色箭頭' : '', .35); K.ring(S, '#c17' + (k - 1), t, false); }
      K.rise(S, '#c17' + k, t, k ? '' : '念到時三張步驟卡依序浮上、加橘框', { sfx: 'pop-card' });
      K.ring(S, '#c17' + k, t + .2);
    });
    K.pop(S, '#p17', S.word('接下來', 0, -.1), '橘色標籤「下一步：實際買飼料怎麼判斷」', { sfx: 'pop-card' });
  },
});
