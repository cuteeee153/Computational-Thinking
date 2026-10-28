// 幕 05–14｜第一步：牙菌斑和牙結石；居家潔牙 vs 獸醫洗牙。

// ---------- 幕 05｜章節卡 ----------
K.scene('05', 0, {
  enter: 'iris', irisAt: [960, 540], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；章節卡「STEP 01｜第一步」', '大標「先搞懂」／「牙菌斑和牙結石」（橘）', '右邊兩顆牙齒圖示：牙菌斑（黃色薄膜）、牙結石（黃褐色硬塊）', '念到「聽起來很像」：中間出現「≈」；念到「不太一樣」：變成橘色「≠」', '歪頭的黑柴'],
  mount: () => K.chap('05', 1, ['先搞懂', '<b class="o">牙菌斑和牙結石</b>'], { y: 300, size: 100 }) +
    K.vcard('c050', { x: 1000, y: 230, w: 340, h: 400, ic: 'Plaque', is: 180, t: '牙菌斑' }) +
    K.vcard('c051', { x: 1480, y: 230, w: 340, h: 400, ic: 'Tartar', is: 180, t: '牙結石' }) +
    `<div class="abs big" id="eq05" style="left:1345px;top:350px;width:130px;text-align:center;font-size:110px;color:#A29D97">≈</div>` +
    `<div class="abs big" id="ne05" style="left:1345px;top:350px;width:130px;text-align:center;font-size:110px;color:var(--or)">≠</div>` +
    K.d('mirror', { id: 'dg05', x: 170, y: 560, w: 215 }),
  init() { K.hideLines('h05', 2); gsap.set(['#eq05', '#ne05', '#dg05'], { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '05', S.at(0));
    K.rise(S, '#c050', S.word('牙菌斑', 1, -.1), '念到「牙菌斑」：牙菌斑卡浮上', { sfx: 'pop-card' });
    K.rise(S, '#c051', S.word('牙結石', 1, -.1), '念到「牙結石」：牙結石卡浮上', { sfx: 'pop-card' });
    K.pop(S, '#eq05', S.word('很像'), '中間出現「≈」（聽起來很像）');
    S.to('#eq05', { opacity: 0, scale: .5, duration: .25 }, S.word('不太一樣', 0, -.1));
    K.pop(S, '#ne05', S.word('不太一樣', 0, -.05), '變成橘色「≠」（其實不太一樣）', { sfx: 'tick' });
    K.dogIn(S, '#dg05', S.word('很像', 0, .2), '歪頭的黑柴');
  },
});

// ---------- 幕 06–07｜牙菌斑＝細菌薄膜 → 礦物化、變硬＝牙結石 ----------
const BAC06 = [[1080, 220], [1560, 200], [1650, 420], [1040, 470], [1600, 650], [1100, 690]];
K.scene('06', 0, {
  enter: 'wipe',
  visuals: ['大標「牙菌斑＝」／「一層細菌薄膜」（橘）', '右邊一顆乾淨的大牙齒', '念到「細菌」：牙齒四周冒出細菌；念到「累積」：細菌一隻隻黏到牙齒上', '念到「形成牙菌斑」：牙齒表面變成黃色薄膜，藍色手寫標註「牙菌斑」＋箭頭'],
  mount: () => K.h('h06', ['牙菌斑＝', '<b class="o">一層細菌薄膜</b>'], { y: 330, size: 96 }) +
    K.icon('tA06', 'Tooth', 1150, 240, 480) + K.icon('tB06', 'Plaque', 1150, 240, 480) + K.icon('tC06', 'Tartar', 1150, 240, 480) +
    BAC06.map(([x, y], k) => K.icon('b06' + k, 'Bacteria', x, y, 110, { style: `transform:rotate(${k * 37}deg)` })).join('') +
    K.anno('an06', '', '牙菌斑', { x: 1690, y: 210, ss: 44 }) + K.arrow('ar06', { x: 1560, y: 250, w: 160, h: 120, d: 'M140 20 C 120 70 80 90 20 100' }),
  init() { K.hideLines('h06', 2); gsap.set(['#tB06', '#tC06', '#an06'], { opacity: 0 }); gsap.set(BAC06.map((_, k) => '#b06' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h06', 2, S.word('牙菌斑', 1, -.3), '大標「牙菌斑＝一層細菌薄膜」');
    K.fadeIn(S, '#tA06', S.at(0), '右邊一顆乾淨的大牙齒');
    K.pop(S, BAC06.map((_, k) => '#b06' + k), S.word('細菌', 0, -.2), '牙齒四周冒出細菌', { stagger: .1, sfx: 'pop-low' });
    const ta = S.word('累積', 0, -.3);
    BAC06.forEach((_, k) => S.to('#b06' + k, { left: 1270 + (k % 3) * 90, top: 300 + Math.floor(k / 3) * 70, scale: .45, duration: .6, ease: 'power2.in' }, ta + k * .08, k ? '' : '念到「累積」：細菌一隻隻黏到牙齒上'));
    S.sfx(ta, 'pop', '黏上去：連續「啵」', { gain: .5 });
    const tf = S.word('形成牙菌斑', 0, -.2);
    S.to(BAC06.map((_, k) => '#b06' + k), { opacity: 0, duration: .3 }, tf);
    S.to('#tB06', { opacity: 1, duration: .5 }, tf, '牙齒表面變成黃色薄膜');
    K.fadeIn(S, '#an06', tf + .2, '藍色手寫標註「牙菌斑」');
    K.draw(S, '#ar06', tf + .2, '箭頭指向黃色薄膜');
  },
});
K.scene('07', 0, {
  enter: 'none',
  visuals: ['（接續）大標換成「牙菌斑變硬」／「就是牙結石」（橘）', '念到「礦物化、變硬」：牙齒抖一下，黃色薄膜變成黃褐色硬塊，標註改成「牙結石」', '下方三個標籤依序出現：牙菌斑 → 礦物化、變硬 → 牙結石'],
  mount: () => K.h('h07', ['牙菌斑變硬', '<b class="o">就是牙結石</b>'], { y: 330, size: 96 }) +
    K.anno('an07', '', '牙結石', { x: 1690, y: 210, ss: 44 }) +
    `<div class="abs" id="fl07" style="left:140px;top:640px;display:flex;align-items:center;gap:22px">` +
    ['牙菌斑', '→', '礦物化、變硬', '→', '<b class="o">牙結石</b>'].map((t, k) => k % 2 ? `<span id="fa07${k}" style="font-size:44px;font-weight:900;color:var(--or)">${t}</span>` : `<span class="pl" id="fp07${k}" style="position:static;font-size:34px">${t}</span>`).join('') + `</div>`,
  init() { K.hideLines('h07', 2); gsap.set('#an07', { opacity: 0 }); gsap.set('#fl07 > span', { opacity: 0 }); },
  animate(S) {
    K.swapH(S, 'h06', 2, 'h07', 2, S.at(0), '大標換成「牙菌斑變硬，就是牙結石」');
    K.rise(S, '#fp070', S.at(0) + .3, '下方標籤：牙菌斑', { dx: -30, dy: 0 });
    const tm = S.word('礦物化', 0, -.1);
    K.rise(S, ['#fa071', '#fp072'], tm, '→ 礦物化、變硬', { dx: -30, dy: 0, stagger: .1 });
    S.to('#tA06,#tB06', { x: -8, duration: .06, yoyo: true, repeat: 5 }, S.word('變硬', 0, -.2), '牙齒抖一下');
    S.to('#tC06', { opacity: 1, duration: .6 }, S.word('變硬'), '黃色薄膜變成黃褐色硬塊');
    S.sfx(S.word('變硬', 0, -.2), 'shake', '變硬：喀喀');
    S.to('#an06', { opacity: 0, duration: .25 }, S.word('牙結石', 0, -.4));
    K.fadeIn(S, '#an07', S.word('牙結石', 0, -.2), '標註改成「牙結石」');
    K.rise(S, ['#fa073', '#fp074'], S.word('牙結石', 0, -.2), '→ 牙結石', { dx: -30, dy: 0, stagger: .1 });
  },
});

// ---------- 幕 08｜刷牙清得掉牙菌斑，清不掉牙結石 ----------
K.scene('08', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「記住一件事」', '兩張大卡：左「牙菌斑｜刷牙可以清除」（藍色打勾），右「牙結石｜多刷幾下也清不掉」（紅叉）', '念到「刷牙清除」：牙刷在左邊的牙齒上來回刷，黃色薄膜消失', '念到「變硬的牙結石」：牙刷移到右邊來回刷，牙結石刷不掉，打紅叉'],
  mount: () => `<div class="eyebrow abs" id="k08" style="left:140px;top:170px;font-size:26px">記住一件事</div>` +
    `<div class="cd" id="c080" style="left:140px;top:240px;width:800px;height:640px"><div style="position:absolute;left:250px;top:50px;width:300px;height:300px">${K.ic('Tooth')}</div><div id="pq08" style="position:absolute;left:250px;top:50px;width:300px;height:300px">${K.ic('Plaque')}</div>` +
    `<div class="t" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:52px">牙菌斑</div><div class="d" style="position:absolute;left:0;right:0;top:490px;text-align:center;font-size:36px;display:flex;justify-content:center;gap:16px;align-items:center" id="r080">${K.chk().replace('class="chk"', 'class="chk" style="margin:0"')}<span style="color:#2A2622">刷牙可以清除</span></div></div>` +
    `<div class="cd" id="c081" style="left:980px;top:240px;width:800px;height:640px"><div style="position:absolute;left:250px;top:50px;width:300px;height:300px">${K.ic('Tartar')}</div>` +
    `<div class="t" style="position:absolute;left:0;right:0;top:400px;text-align:center;font-size:52px">牙結石</div><div class="d" style="position:absolute;left:0;right:0;top:490px;text-align:center;font-size:36px" id="r081"><span class="o">多刷幾下也清不掉</span></div></div>` +
    `<div class="x" id="x08" style="left:1560px;top:270px"></div>` +
    K.icon('tb08', 'Toothbrush', 560, 200, 200),
  init() { gsap.set(['#c080', '#c081', '#r080', '#r081', '#x08', '#tb08'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k08', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.rise(S, '#c080', S.word('牙菌斑', 0, -.3), '左卡「牙菌斑」浮上', { sfx: 'pop-card' });
    const tb = S.word('刷牙', 0, -.2);
    S.to('#tb08', { opacity: 1, duration: .2 }, tb);
    S.to('#tb08', { x: 90, duration: .16, yoyo: true, repeat: 7, ease: 'sine.inOut' }, tb, '念到「刷牙清除」：牙刷在牙齒上來回刷');
    S.sfx(tb, 'brush', '刷牙聲', { dur: 1.3 });
    S.to('#pq08', { opacity: 0, duration: 1.2 }, tb + .1, '黃色薄膜被刷掉');
    K.pop(S, '#r080', S.word('清除', 0, -.1), '打勾「刷牙可以清除」', { sfx: 'ding-soft' });
    K.rise(S, '#c081', S.word('牙結石', 0, -.5), '右卡「牙結石」浮上', { sfx: 'pop-card' });
    const tc = S.word('多刷幾下', 0, -.3);
    S.to('#tb08', { left: 1400, duration: .4, ease: 'power2.inOut' }, tc - .45, '牙刷移到右邊來回刷');
    S.to('#tb08', { x: 0, duration: 0 }, tc - .45);
    S.to('#tb08', { x: 90, duration: .16, yoyo: true, repeat: 7, ease: 'sine.inOut' }, tc);
    S.sfx(tc, 'brush', '刷牙聲', { dur: 1.3 });
    K.fadeIn(S, '#r081', tc, '「多刷幾下也清不掉」');
    S.to('#tb08', { opacity: 0, duration: .3 }, S.word('解決', 0, -.2));
    S.to('#x08', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('解決', 0, -.2), '牙結石刷不掉：打紅叉');
    S.sfx(S.word('解決', 0, -.2), 'shake', '打叉：喀喀');
  },
});

// ---------- 幕 09｜牙菌斑會造成牙周病 ----------
const PER09 = [['牙齦', 'Gum'], ['支撐牙齒的組織', 'Tooth'], ['骨頭', 'HardBone']];
K.scene('09', 0, {
  enter: 'push',
  visuals: ['大標「牙菌斑不只是髒髒的」／「還會造成牙周病」（橘）', '右邊大大的「牙齦紅腫」牙齒圖示', '念到「牙齦、支撐牙齒的組織、骨頭」：左邊三張小卡依序浮上', '念到「發炎和破壞」：右邊蓋上紅色印章「發炎、破壞」'],
  mount: () => K.h('h09', ['牙菌斑不只是髒髒的', '<b class="o">還會造成牙周病</b>'], { y: 220, size: 84 }) +
    PER09.map(([t, ic], k) => K.bar('c09' + k, { x: 140, y: 500 + k * 140, w: 760, h: 120, ic, t, ts: 40 })).join('') +
    K.icon('g09', 'Gum', 1130, 240, 520) +
    `<div class="stamp" id="sp09" style="left:1250px;top:760px;border-color:#E5484D;color:#E5484D">發炎、破壞</div>`,
  init() { K.hideLines('h09', 2); gsap.set(PER09.map((_, k) => '#c09' + k), { opacity: 0 }); gsap.set('#g09', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h09', 1, S.at(0), '大標第一行「牙菌斑不只是髒髒的」');
    S.to('#h091', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('牙周病', 0, -.3), '念到「牙周病」：第二行「還會造成牙周病」');
    K.pop(S, '#g09', S.word('牙周病', 0, -.1), '右邊大大的牙齦紅腫牙齒', { sfx: 'pop-card' });
    [['牙齦', 0], ['支撐牙齒的組織', 0], ['骨頭', 0]].forEach(([w, n], k) => {
      const t = S.word(w, n, -.2);
      if (k) K.ring(S, '#c09' + (k - 1), t, false);
      K.rise(S, '#c09' + k, t, k ? '' : '念到時三張小卡依序浮上、加橘框', { dx: -40, dy: 0 });
      K.ring(S, '#c09' + k, t + .2);
    });
    K.stamp(S, '#sp09', S.word('發炎', 0, -.1), '蓋上紅色印章「發炎、破壞」');
  },
});

// ---------- 幕 10｜兩歲時多達八成 ----------
K.scene('10', 0, {
  enter: 'zoom', bg: 'mint',
  visuals: ['淡綠底；大標「狗狗到了兩歲」／「多達八成有牙周病」（橘）', '十隻黑柴大頭貼排兩排；念到「八成」：其中八隻依序加橘框，藍色手寫大字「八成」', '小字出處「資料來源：默克獸醫手冊」', '念到「年輕的狗狗」：下方橘字「年輕狗狗也可能有口腔問題」'],
  mount: () => K.h('h10', ['狗狗到了兩歲', '<b class="o">多達八成有牙周病</b>'], { y: 190, size: 84 }) +
    `<div class="abs" id="gr10" style="left:140px;top:450px;width:900px;display:grid;grid-template-columns:repeat(5,160px);gap:24px 25px">` +
    Array.from({ length: 10 }, (_, k) => `<div class="cd" id="a10${k}" style="position:relative;width:160px;height:160px;border-radius:50%;overflow:hidden"><img src="assets/dogs/clay/avatar.png" style="width:100%;height:100%;object-fit:cover"></div>`).join('') + `</div>` +
    K.anno('an10', '八成', '兩歲時', { x: 1240, y: 470, bs: 200, ss: 40 }) +
    `<div class="note" id="src10" style="left:140px;top:860px">資料來源：默克獸醫手冊</div>` +
    K.concl('cn10', '年輕狗狗也可能有口腔問題', { x: 1100, y: 800, size: 46 }),
  init() { K.hideLines('h10', 2); gsap.set('#gr10 .cd', { opacity: 0, scale: .6 }); gsap.set(['#an10', '#src10', '#cn10'], { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#src10', S.word('默克獸醫手冊'), '小字出處「資料來源：默克獸醫手冊」');
    K.lines(S, 'h10', 2, S.word('兩歲', 0, -.3), '大標「狗狗到了兩歲，多達八成有牙周病」');
    S.to('#gr10 .cd', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)', stagger: .05 }, S.word('兩歲', 0, .2), '十隻黑柴大頭貼排兩排');
    S.sfx(S.word('兩歲', 0, .2), 'pop', '大頭貼：連續「啵」', { gain: .6 });
    const t8 = S.word('八成', 0, -.2);
    S.to(Array.from({ length: 8 }, (_, k) => '#a10' + k), { boxShadow: K.RING, duration: .25, stagger: .08 }, t8, '其中八隻依序加橘框');
    S.sfx(t8, 'tick', '八成：「叮咚」');
    K.pop(S, '#an10', t8, '藍色手寫大字「八成」', { sfx: false });
    S.to(['#a108', '#a109'], { opacity: .35, duration: .3 }, t8 + .6);
    K.showConcl(S, '#cn10', S.word('年輕的狗狗', 0, -.1), '橘字「年輕狗狗也可能有口腔問題」');
  },
});

// ---------- 幕 11｜先知道要處理什麼問題 ----------
K.scene('11', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「先知道你要處理」／「什麼問題」（橘）', '兩張卡依序浮上：左「想減少牙菌斑｜選有助於控制牙菌斑的清潔方式」，右「牙結石很明顯｜不能只靠潔牙骨、潔牙水」'],
  mount: () => K.h('h11', ['先知道你要處理', '<b class="o">什麼問題</b>'], { y: 200, size: 84 }) +
    `<div class="cd" id="c110" style="left:140px;top:480px;width:800px;height:310px;padding:44px"><div style="display:flex;align-items:center;gap:26px"><div style="width:130px;height:130px">${K.ic('Plaque')}</div><div class="t" style="font-size:46px">想減少牙菌斑</div></div><div class="d" style="font-size:32px;margin-top:34px;color:#2A2622">選<b class="o">有助於控制牙菌斑</b>的清潔方式</div></div>` +
    `<div class="cd" id="c111" style="left:980px;top:480px;width:800px;height:310px;padding:44px"><div style="display:flex;align-items:center;gap:26px"><div style="width:130px;height:130px">${K.ic('Tartar')}</div><div class="t" style="font-size:46px">牙結石很明顯</div></div><div class="d" style="font-size:32px;margin-top:34px;color:#2A2622"><b class="o">不能只靠</b>潔牙骨、潔牙水</div></div>`,
  init() { K.hideLines('h11', 2); gsap.set(['#c110', '#c111'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h11', 2, S.word('什麼問題', 0, -.6), '大標「先知道你要處理什麼問題」');
    K.rise(S, '#c110', S.word('想減少牙菌斑', 0, -.2), '左卡「想減少牙菌斑」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c110', S.word('想減少牙菌斑'));
    K.ring(S, '#c110', S.word('牙結石', 0, -.2), false);
    K.rise(S, '#c111', S.word('牙結石', 0, -.2), '右卡「牙結石很明顯」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c111', S.word('牙結石'));
  },
});

// ---------- 幕 12–14｜居家潔牙 vs 獸醫洗牙 ----------
const HOME12 = [['Toothbrush', '刷牙', '刷牙'], ['DentalBone', '潔牙骨', '潔牙骨'], ['Water', '潔牙水', '潔牙水']];
const VET13 = [['Syringe', '麻醉下清除牙結石', '麻醉'], ['Mirror', '檢查牙齦下方', '檢查牙齦下方'], ['Xray', '牙科 X 光', 'X 光']];
const col = (id, x, ic, title) => `<div class="cd" id="${id}" style="left:${x}px;top:200px;width:780px;height:560px"><div style="position:absolute;left:40px;top:34px;display:flex;align-items:center;gap:22px"><div class="tile" style="position:static;width:110px;height:110px;border-radius:30px">${K.ic(ic)}</div><div class="t" style="font-size:52px">${title}</div></div></div>`;
const item = (id, x, y, ic, t) => `<div class="abs" id="${id}" style="left:${x}px;top:${y}px;display:flex;align-items:center;gap:20px;font-size:34px;font-weight:700"><div style="width:90px;height:90px">${K.ic(ic)}</div>${t}</div>`;
K.scene('12', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「第二個觀念」', '兩欄大卡：左「居家潔牙」（房子），右「獸醫洗牙」（診所，先變淡），中間橘色「≠」', '念到「刷牙、潔牙骨、潔牙水」：左欄依序出現三個項目', '念到「減少牙菌斑累積」：左欄下方橘字「減少牙菌斑、延緩牙結石」'],
  mount: () => `<div class="eyebrow abs" id="k12" style="left:140px;top:130px;font-size:26px">第二個觀念</div>` +
    col('c120', 140, 'House', '居家潔牙') + col('c121', 1000, 'Clinic', '獸醫洗牙') +
    `<div class="abs big" id="ne12" style="left:905px;top:400px;width:110px;text-align:center;font-size:100px;color:var(--or)">≠</div>` +
    HOME12.map(([ic, t], k) => item('h12' + k, 200, 360 + k * 115, ic, t)).join('') +
    `<div class="abs" id="g12" style="left:200px;top:700px;font-size:30px;font-weight:900;color:var(--or)">減少牙菌斑、延緩牙結石</div>`,
  init() { gsap.set(['#c120', '#c121', '#ne12', '#g12'], { opacity: 0 }); gsap.set(HOME12.map((_, k) => '#h12' + k), { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k12', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.rise(S, '#c120', S.word('居家潔牙', 0, -.2), '左欄「居家潔牙」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c121', S.word('獸醫洗牙', 0, -.2), '右欄「獸醫洗牙」浮上（先變淡）', { sfx: 'pop-card' });
    S.to('#c121', { opacity: .45, duration: .3 }, S.word('兩件不同的事', 0, .2));
    K.pop(S, '#ne12', S.word('兩件不同的事'), '中間橘色「≠」');
    K.ring(S, '#c120', S.word('在家', 0, -.2));
    HOME12.forEach(([, , w], k) => K.rise(S, '#h12' + k, S.word(w, 0, -.15), k ? '' : '念到時左欄依序出現：刷牙、潔牙骨、潔牙水', { dx: -30, dy: 0 }));
    K.showConcl(S, '#g12', S.word('減少牙菌斑累積', 0, -.1), '左欄下方橘字「減少牙菌斑、延緩牙結石」');
  },
});
K.scene('13', 0, {
  enter: 'none',
  visuals: ['（接續）左欄橘框拿掉、變淡；右欄「獸醫洗牙」亮起、加橘框', '念到「麻醉下清除牙結石、檢查牙齦下方、牙科 X 光」：右欄依序出現三個項目', '右欄下方橘字「專業檢查和治療」'],
  mount: () => VET13.map(([ic, t], k) => item('v13' + k, 1060, 360 + k * 115, ic, t)).join('') +
    `<div class="abs" id="g13" style="left:1060px;top:700px;font-size:30px;font-weight:900;color:var(--or)">牙結石、牙齦發炎的檢查和治療</div>`,
  init() { gsap.set(VET13.map((_, k) => '#v13' + k), { opacity: 0 }); gsap.set('#g13', { opacity: 0 }); },
  animate(S) {
    const t = S.word('獸醫', 0, -.3);
    K.ring(S, '#c120', t, false);
    S.to(['#c120', '#h120', '#h121', '#h122', '#g12'], { opacity: .45, duration: .3 }, t, '左欄變淡');
    S.to('#c121', { opacity: 1, duration: .3 }, t, '右欄「獸醫洗牙」亮起、加橘框');
    K.ring(S, '#c121', t);
    S.sfx(t, 'ding-soft', '亮起：輕「叮」');
    VET13.forEach(([, , w], k) => K.rise(S, '#v13' + k, S.word(w, 0, -.15), k ? '' : '念到時右欄依序出現：麻醉下清除牙結石、檢查牙齦下方、牙科 X 光', { dx: 30, dy: 0 }));
    K.showConcl(S, '#g13', S.word('確認牙根', 0, -.1), '右欄下方橘字「牙結石、牙齦發炎的檢查和治療」');
  },
});
K.scene('14', 0, {
  enter: 'none',
  visuals: ['（接續）兩欄都亮起，標題下方各加一個標籤：左「日常保養」、右「專業檢查和治療」', '下方結論橘字「認真刷牙，也要定期給獸醫檢查」'],
  mount: () => K.pill('p140', '日常保養', 640, 236, 'ot', { fs: 30 }) + K.pill('p141', '專業檢查和治療', 1470, 236, 'ot', { fs: 30 }) +
    K.concl('cn14', '認真刷牙，<b style="color:#16130F">也要定期給獸醫檢查</b>', { y: 820, size: 58, center: true }),
  init() { gsap.set(['#p140', '#p141', '#cn14'], { opacity: 0 }); },
  animate(S) {
    S.to(['#c120', '#h120', '#h121', '#h122', '#g12'], { opacity: 1, duration: .3 }, S.at(0), '兩欄都亮起');
    K.ring(S, '#c121', S.at(0), false);
    K.pop(S, '#p140', S.word('日常保養', 0, -.2), '左欄標籤「日常保養」', { sfx: 'pop-card' });
    K.pop(S, '#p141', S.word('專業檢查', 0, -.2), '右欄標籤「專業檢查和治療」', { sfx: 'pop-card' });
    K.showConcl(S, '#cn14', S.word('就算你', 0, -.1), '結論「認真刷牙，也要定期給獸醫檢查」');
  },
});
