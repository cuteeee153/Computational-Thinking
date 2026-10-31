// 幕 15–27｜第二步：VOHC 認證。
// 製作人指定的幕（15、16、26）用製作人給的 VOHC 標章圖（assets/logos/vohc-accepted.png），其他地方維持通用的認證圖示。
// 網頁畫面（16、22）是示意的查詢頁，網址列標「示意畫面」。
K.vohc = (id, x, y, w, o = {}) => `<div class="cd" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:${Math.round(w * .62)}px;display:flex;align-items:center;justify-content:center;border-radius:${o.r || 30}px"><img src="assets/logos/vohc-accepted.png" alt="" style="width:${Math.round(w * .86)}px;display:block"></div>`;
K.web = (id, inner, o) => `<div class="web" id="${id}" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px"><div class="wbar"><i></i><i></i><i></i><div class="url">${o.url || 'VOHC 官方網站'}<span class="tag">示意畫面</span></div></div>` +
  `<div class="site"><b>VOHC</b><span>Veterinary Oral Health Council</span><em>${o.page || ''}</em></div><div class="pg">${inner}</div></div>`;

// ---------- 幕 15｜章節卡：每一款都說自己有效，到底該相信誰？ ----------
const PR15 = [['DentalBone', 1060, 250], ['Toothpaste', 1360, 220], ['Water', 1100, 520], ['Powder', 1400, 500]];
K.scene('15', 1, {
  enter: 'iris', irisAt: [1400, 500], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 02｜第二步」，大標「潔牙產品怎麼挑？」／「先認識 VOHC 認證」（橘）', '右邊四個潔牙產品圖示，念到「都說自己有效」：每個都冒出對話框「有效！」', '念到「該相信誰」：藍色手寫大問號', '念到「叫做 VOHC」：產品退到旁邊，中間蓋下大大的 VOHC 標章（製作人給的標章圖）'],
  mount: () => K.chap('15', 2, ['潔牙產品怎麼挑？', '<b class="o">先認識 VOHC 認證</b>'], { size: 88 }) +
    PR15.map(([ic, x, y], k) => K.tile(ic, { id: 't15' + k, x, y, size: 180 }) + `<div class="pl" id="b15${k}" style="left:${x + 120}px;top:${y - 40}px;font-size:26px;padding:8px 18px">有效！</div>`).join('') +
    K.anno('q15', '?', '該相信誰', { x: 1640, y: 320, bs: 200, ss: 36 }) +
    K.vohc('sl15', 1080, 290, 560),
  init() { K.hideLines('h15', 2); gsap.set(['#q15', '#sl15'], { opacity: 0 }); gsap.set(PR15.map((_, k) => '#b15' + k), { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '15', S.at(0));
    K.pop(S, PR15.map((_, k) => '#t15' + k), S.word('潔牙產品這麼多', 0, -.2), '右邊四個潔牙產品圖示彈出', { stagger: .1 });
    K.pop(S, PR15.map((_, k) => '#b15' + k), S.word('有效', 0, -.2), '每個產品都冒出「有效！」對話框', { stagger: .12, sfx: 'pop-card' });
    K.pop(S, '#q15', S.word('相信誰', 0, -.2), '藍色手寫大問號「該相信誰」', { sfx: 'boing' });
    const t = S.word('VOHC', 1, -.3);
    S.to(['#q15', ...PR15.map((_, k) => '#b15' + k)], { opacity: 0, duration: .25 }, t - .2);
    S.to(PR15.map((_, k) => '#t15' + k), { opacity: .3, scale: .8, duration: .4 }, t - .2, '產品退到旁邊變淡');
    K.stamp(S, '#sl15', t, '中間蓋下大大的 VOHC 標章（製作人給的標章圖）', { straight: true });
  },
});

// ---------- 幕 16｜VOHC 是什麼（示意的 VOHC 介紹網頁） ----------
K.ROW0 = '0 0 0 0px #F97316'; K.ROW1 = '0 0 0 4px #F97316';
const ROW16 = [['全名', 'Veterinary Oral Health Council', 'Veterinary'], ['中文', '獸醫口腔健康委員會', '獸醫口腔健康委員會'], ['是什麼', '協助評估寵物口腔保健產品', '機制']];
K.scene('16', 1, {
  enter: 'push',
  visuals: ['左邊大標「VOHC」／「是什麼？」（橘），下方 VOHC 標章（製作人給的標章圖）', '右邊網頁查詢畫面（示意的 VOHC 介紹頁：網址列「VOHC 官方網站」、頁首 VOHC、分頁「關於我們」）', '念到時三列資料依序滑入、加橘框：全名 Veterinary Oral Health Council、中文 獸醫口腔健康委員會、是什麼 協助評估寵物口腔保健產品'],
  mount: () => K.h('h16', ['VOHC', '<b class="o">是什麼？</b>'], { y: 230, size: 120 }) + K.vohc('lg16', 140, 560, 480) +
    K.web('wb16', ROW16.map(([a, b], k) => `<div class="wrow" id="r16${k}"><span class="lb">${a}</span><span style="font-size:${k ? 32 : 28}px">${b}</span></div>`).join(''), { x: 900, y: 200, w: 900, h: 640, page: '關於我們' }),
  init() { K.hideLines('h16', 2); gsap.set('#wb16', { y: 900 }); gsap.set('#lg16', { opacity: 0 }); gsap.set(ROW16.map((_, k) => '#r16' + k), { opacity: 0 }); },
  animate(S) {
    S.to('#wb16', { y: 0, duration: .8, ease: 'power3.out' }, S.start, '網頁畫面跟著換幕滑上來');
    S.sfx(S.start, 'whoosh', '網頁滑上來：「咻」', { gain: .6 });
    K.lines(S, 'h16', 2, S.at(0), '大標「VOHC 是什麼？」');
    K.pop(S, '#lg16', S.at(0) + .4, '下方 VOHC 標章', { sfx: 'pop-card', from: .7 });
    ROW16.forEach(([, , w], k) => {
      const t = S.word(w, 0, k === 2 ? -1.6 : -.2);
      if (k) S.to('#r16' + (k - 1), { boxShadow: K.ROW0, duration: .3 }, t);
      K.rise(S, '#r16' + k, t, k ? '' : '念到時三列資料依序滑入、加橘框', { dx: 60, dy: 0 });
      S.to('#r16' + k, { boxShadow: K.ROW1, duration: .3 }, t + .2);
    });
  },
});

// ---------- 幕 17｜廠商送審 → 取得標章 ----------
const FL17 = [['Clipboard', '廠商', '廠商'], ['Magnifier', '照規定的方法測試', '試驗方法'], ['Doc', '送交審查', '送交審查'], ['Seal', '通過，取得標章', '通過評估']];
K.scene('17', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「通過評估」／「才能拿到標章」（橘）', '四塊圖示磚由左到右：廠商 → 照規定的方法測試 → 送交審查 → 通過，取得標章；念到哪一步出現哪一步，中間畫藍色箭頭', '念到「取得」：最後一塊「取得標章」加橘框＋「叮咚」'],
  mount: () => K.h('h17', ['通過評估', '<b class="o">才能拿到標章</b>'], { y: 170, size: 80 }) +
    FL17.map(([ic, t], k) => K.tile(ic, { id: 't17' + k, x: 215 + k * 430, y: 470, size: 190 }) +
      `<div class="abs" id="l17${k}" style="left:${110 + k * 430}px;top:690px;width:400px;text-align:center;font-size:34px;font-weight:900">${t}</div>`).join('') +
    [0, 1, 2].map(k => K.arrow('a17' + k, { x: 420 + k * 430, y: 540, w: 200, h: 60, d: 'M10 30 C 70 10 130 10 190 30' })).join(''),
  init() { K.hideLines('h17', 2); gsap.set(FL17.map((_, k) => '#t17' + k).concat(FL17.map((_, k) => '#l17' + k)), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h17', 2, S.at(0), '大標「通過評估，才能拿到標章」');
    FL17.forEach(([, , w], k) => {
      const t = S.word(w, 0, -.2);
      if (k) K.draw(S, '#a17' + (k - 1), t - .3, k === 1 ? '中間畫藍色箭頭' : '', .4);
      K.pop(S, ['#t17' + k, '#l17' + k], t, k ? '' : '念到哪一步出現哪一步', { pitch: 1 + k * .08, sfx: 'pop-card' });
    });
    S.to('#t173', { boxShadow: K.RING, duration: .35 }, S.word('取得', 0, -.1), '念到「取得」：「取得標章」加橘框');
    S.sfx(S.word('取得', 0, -.1), 'tick', '念到「取得」：「叮咚」');
  },
});

// ---------- 幕 18–21｜三個重點 ----------
const PT = (k, n, ic, t, inner) => `<div class="cd" id="pt${k}" style="left:${140 + k * 560}px;top:290px;width:520px;height:480px;padding:40px 36px;text-align:center"><div class="k">${n}</div>` +
  (ic ? `<div style="width:150px;height:150px;margin:22px auto 0">${K.ic(ic)}</div>` : '') + `<div class="t" style="margin-top:20px;font-size:42px">${t}</div>${inner}</div>`;
K.scene('18', 1, {
  enter: 'rise', bg: 'sky',
  visuals: ['淡藍底；大標「VOHC 的三個重點」，三個位置先空著', '念到「第一」：第一張卡浮上、加橘框：放大鏡＋「只審查，不做實驗」＋「審查廠商提交的試驗結果」'],
  mount: () => K.h('h18', ['VOHC 的<b class="o">三個重點</b>'], { y: 150, size: 76 }) +
    [0, 1, 2].map(k => `<div class="abs" id="ph18${k}" style="left:${140 + k * 560}px;top:290px;width:520px;height:480px;border-radius:34px;border:4px dashed #CFD8E6"></div>`).join('') +
    PT(0, '重點 1', 'Magnifier', '只審查，不做實驗', `<div class="d" style="font-size:28px;margin-top:14px">審查廠商提交的試驗結果</div>`),
  init() { K.hideLines('h18', 1); gsap.set('#pt0', { opacity: 0 }); gsap.set(['#ph180', '#ph181', '#ph182'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h18', 1, S.at(0), '大標「VOHC 的三個重點」');
    S.to(['#ph180', '#ph181', '#ph182'], { opacity: 1, duration: .3, stagger: .1 }, S.word('三個重點', 0, .1), '三個位置先空著（虛線框）');
    K.rise(S, '#pt0', S.word('第一', 0, -.2), '念到「第一」：第一張卡浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#pt0', S.word('第一'));
  },
});
K.scene('19', 1, {
  enter: 'none',
  visuals: ['（接續）第二張卡浮上、加橘框：「效果門檻」＋大數字從 0 跑到「至少 20%」，跳到 20% 時變成綠色（通過）＋「牙菌斑或牙結石累積減少」'],
  mount: () => PT(1, '重點 2', '', '效果門檻', `<div class="big" style="font-size:150px;color:var(--or);margin-top:34px"><span style="font-size:44px;letter-spacing:0;font-family:'Noto Sans TC'">至少 </span><span id="g19"><span id="n19">0</span><span style="font-size:90px">%</span></span></div><div class="d" style="font-size:28px;margin-top:30px">牙菌斑或牙結石累積減少</div>`),
  init() { gsap.set('#pt1', { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#pt0', S.word('第二', 0, -.2), false);
    K.rise(S, '#pt1', S.word('第二', 0, -.2), '第二張卡浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#pt1', S.word('第二'));
    K.count(S, '#n19', 0, 20, S.word('至少', 0, -.1), .9, '念到「至少 20%」：橘色大數字從 0 跑到 20');
    S.fromTo('#g19', { color: '#E2620E' }, { color: '#1E9E5A', duration: .3 }, S.word('至少', 0, .8), '跳到 20% 時數字變成綠色（通過）');
    S.sfx(S.word('至少', 0, .8), 'tick', '20%：「叮咚」');
  },
});
K.scene('20', 1, {
  enter: 'none',
  visuals: ['（接續）第三張卡浮上、加橘框：「標章分兩種」，念到時兩個標籤依序出現：幫助控制牙菌斑、幫助控制牙結石；最後小字「也有兩種都通過」'],
  mount: () => PT(2, '重點 3', '', '標章分兩種', `<div style="display:flex;flex-direction:column;align-items:center;gap:18px;margin-top:40px">` +
    `<div class="pl ot" id="k200" style="position:static;font-size:32px">${K.ic('Plaque')}幫助控制牙菌斑</div><div class="pl ot" id="k201" style="position:static;font-size:32px">${K.ic('Tartar')}幫助控制牙結石</div></div><div class="d" id="k202" style="font-size:28px;margin-top:26px">也有兩種都通過</div>`),
  init() { gsap.set(['#pt2', '#k200', '#k201', '#k202'], { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#pt1', S.word('第三', 0, -.2), false);
    K.rise(S, '#pt2', S.word('第三', 0, -.2), '第三張卡浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#pt2', S.word('第三'));
    K.pop(S, '#k200', S.word('幫助控制牙菌斑', 0, -.1), '標籤「幫助控制牙菌斑」');
    K.pop(S, '#k201', S.word('幫助控制牙結石', 0, -.1), '標籤「幫助控制牙結石」', { pitch: 1.1 });
    K.fadeIn(S, '#k202', S.word('兩種都通過', 0, -.2), '小字「也有兩種都通過」');
  },
});
K.scene('21', 1, {
  enter: 'none',
  visuals: ['（接續）念到「牙菌斑是造成牙周病的重要原因」：「幫助控制牙菌斑」標籤變成橘底白字、彈一下', '下方結論橘字「挑產品時，確認通過哪一種評估」'],
  mount: () => K.concl('cn21', '挑產品時，<b style="color:#16130F">確認通過哪一種評估</b>', { y: 830, size: 54, center: true }),
  init() { gsap.set('#cn21', { opacity: 0 }); },
  animate(S) {
    const t = S.word('牙周病', 0, -.4);
    S.to('#k200', { backgroundColor: '#F97316', color: '#FFFFFF', scale: 1.08, duration: .35, ease: 'back.out(2)' }, t, '「幫助控制牙菌斑」標籤變成橘底白字、彈一下');
    S.sfx(t, 'ding-soft', '亮起：輕「叮」');
    K.showConcl(S, '#cn21', S.word('哪一種評估', 0, -.6), '結論「挑產品時，確認通過哪一種評估」');
  },
});

// ---------- 幕 22｜可以公開查證（示意的 VOHC 網站：犬用產品接受清單） ----------
const COL22 = [['產品名稱', '產品名稱'], ['品牌', '品牌'], ['標章種類', '標章種類']];
const bars = w => `<i style="display:block;height:16px;width:${w}px;border-radius:8px;background:#E4E1DD"></i>`;
K.scene('22', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「為什麼先看 VOHC？」／「可以公開查證」（橘）', '右邊網頁查詢畫面（示意的 VOHC 網站，分頁「犬用產品接受清單」）；搜尋框打字「犬用產品接受清單」', '念到「產品名稱、品牌、標章種類」：清單的三個欄位依序亮起（淡橘底）、欄名旁打勾', '念到「獸醫推薦」「有效減少牙結石」：左邊兩個灰色虛線標籤（包裝上寫的），第二個標籤正下方藍字「比較難自己核對」', '念到「更容易」：整個 VOHC 網站亮一下（綠色外框、放大一點點）'],
  mount: () => K.h('h22', ['為什麼先看 VOHC？', '<b class="o">可以公開查證</b>'], { y: 230, size: 80 }) +
    K.pill('g220', '包裝寫：獸醫推薦', 140, 520, 'gh', { fs: 32 }) + K.pill('g221', '包裝寫：有效減少牙結石', 140, 620, 'gh', { fs: 32 }) +
    K.anno('an22', '', '比較難自己核對', { x: 150, y: 720, ss: 36, align: 'left' }) +
    K.web('wb22', `<div class="srch"><span id="ty22" data-text="犬用產品接受清單"></span><span class="go"><svg width="26" height="26" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#fff" stroke-width="3"/><path d="M15 15 L20 20" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg></span></div>` +
      `<div class="tbl">` + COL22.map(([t], k) => `<div class="th c${k}" id="h22${k}">${t}${K.chk().replace('class="chk"', `class="chk" id="ck22${k}" style="margin:0 0 0 10px;width:34px;height:34px"`)}</div>`).join('') +
      [0, 1, 2].map(r => [bars([200, 170, 230][r]), bars([110, 140, 90][r]), r === 1 ? `<span class="pl ot" style="position:static;font-size:20px;padding:5px 12px">牙結石</span>` : `<span class="pl ot" style="position:static;font-size:20px;padding:5px 12px">牙菌斑</span>${r ? '' : ` <span class="pl ot" style="position:static;font-size:20px;padding:5px 12px">牙結石</span>`}`].map((h, k) => `<div class="td c${k}">${h}</div>`).join('')).join('') + `</div>`,
      { x: 900, y: 190, w: 900, h: 660, page: '犬用產品接受清單' }),
  init() { K.hideLines('h22', 2); gsap.set('#wb22', { y: 900 }); gsap.set(['#g220', '#g221', '#an22'], { opacity: 0 }); gsap.set('#wb22 .chk', { opacity: 0, scale: .4 }); },
  animate(S) {
    S.to('#wb22', { y: 0, duration: .8, ease: 'power3.out' }, S.start, '網頁畫面跟著換幕滑上來');
    S.sfx(S.start, 'whoosh', '網頁滑上來：「咻」', { gain: .6 });
    K.lines(S, 'h22', 1, S.at(0), '大標第一行「為什麼先看 VOHC？」');
    S.to('#h221', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('公開查證', 0, -.3), '念到「公開查證」：第二行「可以公開查證」');
    K.type(S, '#ty22', S.word('官方網站', 0, -.4), '搜尋框打字「犬用產品接受清單」');
    COL22.forEach(([, w], k) => {
      const t = S.word(w, 0, -.1);
      if (k) S.to('#wb22 .c' + (k - 1), { backgroundColor: 'rgba(253,235,221,0)', duration: .3 }, t);
      S.to('#wb22 .c' + k, { backgroundColor: 'rgba(253,235,221,1)', duration: .3 }, t, k ? '' : '念到時清單欄位依序亮起（淡橘底）、欄名旁打勾');
      S.to('#ck22' + k, { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2.5)' }, t + .1);
      S.sfx(t + .1, 'pop', '打勾：「啵」', { pitch: 1 + k * .1 });
    });
    S.to('#wb22 .c2', { backgroundColor: 'rgba(253,235,221,0)', duration: .3 }, S.word('這比', 0, -.1));
    K.rise(S, '#g220', S.word('獸醫推薦', 0, -.2), '灰色虛線標籤「包裝寫：獸醫推薦」', { dx: -30, dy: 0 });
    K.rise(S, '#g221', S.word('有效減少牙結石', 0, -.2), '灰色虛線標籤「包裝寫：有效減少牙結石」', { dx: -30, dy: 0 });
    const tg = S.word('更容易', 0, -.1);
    S.to('#wb22', { boxShadow: '0 0 0 8px #1E9E5A,0 0 60px 10px rgba(30,158,90,.35)', scale: 1.03, duration: .35, yoyo: true, repeat: 1, ease: 'power2.out' }, tg, '念到「更容易」：整個 VOHC 網站亮一下（綠色外框、放大一點點）');
    S.sfx(tg, 'ding-soft', '網站亮起：輕「叮」');
    K.fadeIn(S, '#an22', S.word('自行核對', 0, -.4), '第二個標籤下方藍字「比較難自己核對」');
  },
});

// ---------- 幕 23–25｜三個很重要的提醒 ----------
const RM = [
  { t: '沒有認證 <span class="o">≠</span> 一定沒效', d: '可能沒送審，或還沒通過評估', ic: 'Seal', w: '第一' },
  { t: '有認證 <span class="o">≠</span> 不會得牙周病', d: '刷牙、輔助產品、獸醫檢查都還是很重要', ic: 'Gum', w: '第二' },
  { t: '同品牌 <span class="o">≠</span> 每款都有認證', d: '有些只有特定尺寸、特定地區的版本通過', ic: 'DentalBone', w: '第三' },
];
K.scene('23', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「不過」、大標「三個很重要的提醒」', '念到「第一」：第一條提醒浮上、加橘框：「沒有認證 ≠ 一定沒效」＋「可能沒送審，或還沒通過評估」'],
  mount: () => `<div class="eyebrow abs" id="k23" style="left:140px;top:130px;font-size:26px">不過</div>` + K.h('h23', ['三個很重要的<b class="o">提醒</b>'], { y: 170, size: 76 }) +
    RM.map((r, k) => K.bar('rm' + k, { x: 140, y: 330 + k * 175, w: 1640, h: 150, n: k + 1, ic: r.ic, t: r.t, d: r.d, ts: 46, ds: 28 })).join(''),
  init() { K.hideLines('h23', 1); gsap.set(['#rm0', '#rm1', '#rm2'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k23', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h23', 1, S.at(0) + .2, '大標「三個很重要的提醒」');
    K.rise(S, '#rm0', S.word('第一', 0, -.2), '念到「第一」：第一條提醒浮上、加橘框', { sfx: 'pop-card', dx: -60, dy: 0 });
    K.ring(S, '#rm0', S.word('第一'));
  },
});
[1, 2].forEach(k => K.scene(String(23 + k), 1, {
  enter: 'none',
  visuals: [`（接續）念到「${RM[k].w}」：第${k + 1}條提醒浮上、加橘框：「${RM[k].t.replace(/<[^>]+>/g, '')}」＋「${RM[k].d}」`],
  animate(S) {
    const t = S.word(RM[k].w, 0, -.2);
    K.ring(S, '#rm' + (k - 1), t, false);
    K.rise(S, '#rm' + k, t, `第${k + 1}條提醒浮上、加橘框`, { sfx: 'pop-card', dx: -60, dy: 0 });
    K.ring(S, '#rm' + k, t + .2);
  },
}));

// ---------- 幕 26–26b｜最好的做法：看標章＋查官方清單；官網放資訊欄 ----------
K.scene('26', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「最好的做法」', '兩步驟卡：1 看包裝上的 VOHC 標章（製作人給的標章圖）→ 2 到官方清單核對名稱和版本（放大鏡＋清單），中間藍色箭頭'],
  mount: () => K.h('h26', ['最好的<b class="o">做法</b>'], { y: 170, size: 80 }) +
    `<div class="cd" id="s260" style="left:200px;top:330px;width:640px;height:420px;padding:40px 30px;text-align:center"><div class="k" style="margin-bottom:14px">STEP 1</div><img src="assets/logos/vohc-accepted.png" alt="" style="height:150px;display:block;margin:0 auto"><div class="t" style="margin-top:22px;font-size:40px">看包裝上的 VOHC 標章</div></div>` +
    K.vcard('s261', { x: 1080, y: 330, w: 640, h: 420, n: 'STEP 2', ic: 'Magnifier', t: '到官方清單核對名稱和版本', ts: 38 }) +
    K.arrow('a26', { x: 860, y: 500, w: 200, h: 60, d: 'M10 30 C 70 10 130 10 190 30' }),
  init() { K.hideLines('h26', 1); gsap.set(['#s260', '#s261'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h26', 1, S.at(0), '大標「最好的做法」');
    K.rise(S, '#s260', S.word('包裝上的', 0, -.2), '步驟 1「看包裝上的 VOHC 標章」浮上', { sfx: 'pop-card' });
    K.ring(S, '#s260', S.word('包裝上的'));
    K.draw(S, '#a26', S.word('官方清單', 0, -.5), '藍色箭頭', .4);
    K.ring(S, '#s260', S.word('官方清單', 0, -.2), false);
    K.rise(S, '#s261', S.word('官方清單', 0, -.2), '步驟 2「到官方清單核對名稱和版本」浮上', { sfx: 'pop-card' });
    K.ring(S, '#s261', S.word('官方清單'));
  },
});
K.scene('26b', 1, {
  enter: 'none',
  visuals: ['（接續）下方橘色標籤「VOHC 官網連結放在影片資訊欄」＋往下的箭頭'],
  mount: () => K.pill('p26b', 'VOHC 官網連結放在影片資訊欄 ↓', 560, 810, 'o', { fs: 38 }),
  init() { gsap.set('#p26b', { opacity: 0 }); },
  animate(S) {
    K.ring(S, '#s261', S.at(0), false);
    K.pop(S, '#p26b', S.word('資訊欄', 0, -.3), '橘色標籤「VOHC 官網連結放在影片資訊欄 ↓」', { sfx: 'pop-card' });
    S.to('#p26b', { y: 10, duration: .4, yoyo: true, repeat: 3, ease: 'sine.inOut' }, S.word('資訊欄', 0, .3));
  },
});

// ---------- 幕 27｜過場：哪一種方法最有效？ ----------
K.scene('27', 1, {
  enter: 'zoom', bg: 'sky',
  visuals: ['淡藍底；置中大標「想讓牙齒保持乾淨」／「哪一種方法最有效？」（橘）', '下方三塊圖示磚輪流跳一下：牙刷、潔牙骨、潔牙水；歪頭的黑柴'],
  mount: () => K.h('h27', ['想讓牙齒保持乾淨', '<b class="o">哪一種方法最有效？</b>'], { y: 220, size: 96, w: 1640, center: true }) +
    [['Toothbrush', 560], ['DentalBone', 860], ['Water', 1160]].map(([ic, x], k) => K.tile(ic, { id: 't27' + k, x, y: 560, size: 200 })).join('') +
    K.d('mirror', { id: 'dg27', x: 1450, y: 540, w: 260 }),
  init() { K.hideLines('h27', 2); gsap.set('#dg27', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h27', 1, S.word('牙齒保持乾淨', 0, -.6), '大標第一行「想讓牙齒保持乾淨」');
    S.to('#h271', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('最有效', 0, -.8), '第二行「哪一種方法最有效？」');
    K.pop(S, ['#t270', '#t271', '#t272'], S.word('更重要的問題', 0, -.2), '三塊圖示磚彈出：牙刷、潔牙骨、潔牙水', { stagger: .12 });
    [0, 1, 2].forEach(k => S.to('#t27' + k, { y: -30, duration: .2, yoyo: true, repeat: 1, ease: 'power2.out' }, S.word('哪一種', 0, k * .25), k ? '' : '三塊圖示磚輪流跳一下'));
    K.dogIn(S, '#dg27', S.word('最有效', 0, -.3), '歪頭的黑柴');
  },
});
