// 幕 64–71｜第五步：成分表上的天然、無穀、頂級，真的代表比較好嗎？

// ---------- 幕 64｜章節卡 ----------
K.scene('64', 5, {
  enter: 'iris', irisAt: [1400, 500], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 05｜第五步」，大標「天然、無穀、頂級，」／「真的代表比較好嗎？」（橘）', '右邊一包飼料，念到時包裝上依序貼上三張貼紙：天然、無穀、頂級', '念到「廣告詞」：藍色手寫「包裝上的廣告詞」'],
  mount: () => K.chap('64', 5, ['天然、無穀、頂級，', '<b class="o">真的代表比較好嗎？</b>'], { size: 84 }) +
    K.bag('bg64', `<div style="height:300px;display:flex;align-items:center;justify-content:center"><div style="width:180px;height:180px">${K.ic('Paw')}</div></div>`, { x: 1200, y: 200, w: 500, h: 600, title: 'DOG FOOD' }) +
    [['天然', 1140, 360, -8], ['無穀', 1520, 480, 6], ['頂級', 1220, 640, -4]].map(([t, x, y, r], k) => `<div class="stamp" id="sk64${k}" style="left:${x}px;top:${y}px;transform:rotate(${r}deg);background:#fff">${t}</div>`).join('') +
    K.anno('an64', '', '包裝上的廣告詞', { x: 1250, y: 850, ss: 38 }),
  init() { K.hideLines('h64', 2); gsap.set(['#an64', '#sk640', '#sk641', '#sk642'], { opacity: 0 }); gsap.set('#bg64', { opacity: 0, y: 60 }); },
  animate(S) {
    K.chapIn(S, '64', S.at(0));
    S.to('#bg64', { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, S.at(0) + .3, '右邊一包飼料浮上');
    ['天然', '無穀', '頂級'].forEach((w, k) => {
      const t = S.word(w, 0, -.1);
      S.fromTo('#sk64' + k, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: .3, ease: 'power4.in' }, t, k ? '' : '念到時包裝上依序貼上貼紙：天然、無穀、頂級');
      S.sfx(t + .25, 'thud', '貼上：「咚」', { pitch: 1 + k * .08 });
    });
    K.fadeIn(S, '#an64', S.word('廣告詞', 0, -.3), '藍色手寫「包裝上的廣告詞」');
  },
});

// ---------- 幕 65｜頂級、天然、全方位：沒有法規定義 ----------
const W65 = [['頂級', 1050, 220, 'o'], ['天然', 1420, 260, 'o'], ['全方位', 1150, 390, 'o'], ['Premium', 1460, 420, 'b'], ['Holistic', 1250, 560, 'b']];
K.scene('65', 5, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「頂級、天然、全方位，」／「一定比較好嗎？」（橘）', '念到時右邊依序冒出五個標籤：頂級、天然、全方位、Premium、Holistic', '念到「冷靜一下」：打哈欠的黑柴', '念到「沒有明確的法規定義」：標籤上蓋印章「沒有法規定義」，標籤變淡', '念到「包裝寫得很漂亮」：下方橘字「包裝漂亮 ≠ 營養比較完整」'],
  mount: () => K.h('h65', ['頂級、天然、全方位，', '<b class="o">一定比較好嗎？</b>'], { y: 200, size: 80 }) +
    W65.map(([t, x, y, c], k) => K.pill('w65' + k, t, x, y, c, { fs: 44 })).join('') +
    K.dog('yawn', { id: 'dg65', x: 140, y: 470, w: 230 }) +
    `<div class="stamp" id="sp65" style="left:1200px;top:680px">沒有法規定義</div>` +
    K.concl('cn65', '包裝漂亮 <span style="color:#16130F">≠</span> 營養比較完整', { y: 800, size: 60 }),
  init() { K.hideLines('h65', 2); gsap.set(['#dg65', '#cn65'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h65', 2, S.at(0), '大標「頂級、天然、全方位，一定比較好嗎？」');
    K.pop(S, '#w650', S.word('頂級', 0, -.1), '念到時右邊依序冒出標籤', { sfx: 'pop-card' });
    K.pop(S, '#w651', S.word('天然', 0, -.1), '', { sfx: 'pop-card', pitch: 1.08 });
    K.pop(S, '#w652', S.word('全方位', 0, -.1), '', { sfx: 'pop-card', pitch: 1.16 });
    K.pop(S, '#w653', S.word('Premium', 0, -.1), '', { sfx: 'pop-card', pitch: 1.24 });
    K.pop(S, '#w654', S.word('Holistic', 0, -.1), '', { sfx: 'pop-card', pitch: 1.32 });
    K.dogIn(S, '#dg65', S.word('冷靜一下', 0, -.3), '打哈欠的黑柴（冷靜一下）');
    const t = S.word('法規定義', 0, -.4);
    S.to(W65.map((_, k) => '#w65' + k), { opacity: .4, duration: .3 }, t, '標籤變淡');
    K.stamp(S, '#sp65', t, '蓋上印章「沒有法規定義」');
    K.showConcl(S, '#cn65', S.word('很漂亮', 0, -.3), '下方橘字「包裝漂亮 ≠ 營養比較完整」');
  },
});

// ---------- 幕 66｜台灣的標示和廣告規範 ----------
const RL66 = [
  { ic: 'Tag', t: '標示無添加、不使用', a: '要說明沒有添加什麼', at: '無添加' },
  { ic: 'Certificate', t: '宣稱檢驗、認證、推薦', a: '要能提出證明', at: '檢驗' },
  { ic: 'Trophy', t: '寫著獲獎', a: '要說明頒獎單位、時間、獎項', at: '獲獎' },
];
K.scene('66', 5, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；大標「台灣的標示和廣告，」／「也有相關規範」（橘）', '念到時三條規範卡依序滑入，右邊橘色標籤：標示無添加、不使用 → 要說明沒有添加什麼／宣稱檢驗、認證、推薦 → 要能提出證明／寫著獲獎 → 要說明頒獎單位、時間、獎項'],
  mount: () => K.h('h66', ['台灣的標示和廣告，', '<b class="o">也有相關規範</b>'], { y: 140, size: 76 }) +
    RL66.map((r, k) => K.bar('r66' + k, { x: 140, y: 380 + k * 170, w: 1640, h: 140, ic: r.ic, t: r.t, ts: 40, tail: `<span class="pl o" id="a66${k}" style="position:static;font-size:32px;padding:12px 26px">→ ${r.a}</span>` })).join(''),
  init() { K.hideLines('h66', 2); gsap.set(RL66.map((_, k) => '#r66' + k).concat(RL66.map((_, k) => '#a66' + k)), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h66', 2, S.at(0), '大標「台灣的標示和廣告，也有相關規範」');
    RL66.forEach((r, k) => {
      const t = S.word(r.at, 0, -.3);
      if (k) K.ring(S, '#r66' + (k - 1), t, false);
      K.rise(S, '#r66' + k, t, k ? '' : '念到時規範卡依序滑入、加橘框', { dx: -50, dy: 0 });
      K.ring(S, '#r66' + k, t + .2);
      K.pop(S, '#a66' + k, S.word(['說明沒有添加', '相應的證明', '頒獎單位'][k], 0, -.2), k ? '' : '右邊橘色標籤：要怎麼做', { sfx: 'pop-card', pitch: 1 + k * .06 });
    });
  },
});

// ---------- 幕 67｜不用立刻相信，也不用一概當假的 → 確認可以查證的資訊 ----------
K.scene('67', 5, {
  enter: 'zoom', bg: 'mint',
  visuals: ['淡綠底；兩個灰色標籤依序出現：不用立刻相信、也不用一概當假的', '念到「比較好的做法」：中間放大鏡圖示磚＋橘色大字「確認有沒有具體、可以查證的資訊」'],
  mount: () => K.pill('g670', '不用立刻相信', 420, 250, 'gh', { fs: 44 }) + K.pill('g671', '也不用一概當假的', 980, 250, 'gh', { fs: 44 }) +
    K.tile('Magnifier', { id: 't67', x: 840, y: 400, size: 240 }) +
    K.concl('cn67', '確認有沒有<span style="color:#16130F">具體、可以查證</span>的資訊', { y: 720, size: 64, center: true }),
  init() { gsap.set(['#g670', '#g671', '#cn67'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#g670', S.word('立刻相信', 0, -.3), '灰色標籤「不用立刻相信」', { sfx: 'pop-low' });
    K.pop(S, '#g671', S.word('一概認為', 0, -.3), '灰色標籤「也不用一概當假的」', { sfx: 'pop-low', pitch: 1.1 });
    K.pop(S, '#t67', S.word('比較好的做法', 0, -.2), '中間放大鏡圖示磚', { sfx: 'pop-card' });
    K.showConcl(S, '#cn67', S.word('具體', 0, -.3), '橘色大字「確認有沒有具體、可以查證的資訊」');
  },
});

// ---------- 幕 68｜無穀飼料比較健康嗎？ ----------
K.scene('68', 5, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「無穀飼料」，大標「無穀飼料，」／「比較健康嗎？」（橘）', '右邊兩包飼料：無穀（穀物被畫掉）、含穀（穀物）', '念到「比較天然」「對狗狗比較好」：兩個灰色虛線標籤', '念到「沒有足夠證據」：蓋上印章「證據不足」'],
  mount: () => K.kicker('k68', 'GRAIN-FREE', '無穀飼料', { y: 150 }) + K.h('h68', ['無穀飼料，', '<b class="o">比較健康嗎？</b>'], { y: 210, size: 96 }) +
    [['無穀', 1080], ['含穀', 1480]].map(([t, x], k) => `<div class="cd" id="b68${k}" style="left:${x}px;top:200px;width:320px;height:420px;padding:36px;text-align:center"><div style="width:180px;height:180px;margin:0 auto;position:relative">${K.ic('Grain')}${k ? '' : '<div class="x" style="left:40px;top:40px"></div>'}</div><div class="t" style="font-size:48px;margin-top:30px">${t}</div></div>`).join('') +
    K.pill('g680', '比較天然？', 140, 520, 'gh', { fs: 40 }) + K.pill('g681', '對狗狗比較好？', 460, 520, 'gh', { fs: 40 }) +
    `<div class="stamp" id="sp68" style="left:1260px;top:660px">證據不足</div>`,
  init() { K.hideLines('h68', 2); gsap.set(['#b680', '#b681', '#g680', '#g681'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k68', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h68', 2, S.at(0) + .1, '大標「無穀飼料，比較健康嗎？」');
    K.rise(S, '#b680', S.word('無穀飼料', 1, -.2), '右邊卡「無穀」浮上', { sfx: 'pop-card' });
    K.rise(S, '#b681', S.word('無穀飼料', 1, .3), '右邊卡「含穀」浮上', { sfx: 'pop-card' });
    K.pop(S, '#g680', S.word('比較天然', 0, -.1), '灰色虛線標籤「比較天然？」', { sfx: 'pop-low' });
    K.pop(S, '#g681', S.word('對狗狗比較好', 0, -.1), '灰色虛線標籤「對狗狗比較好？」', { sfx: 'pop-low', pitch: 1.1 });
    K.stamp(S, '#sp68', S.word('足夠證據', 0, -.2), '蓋上印章「證據不足」');
  },
});

// ---------- 幕 69–70｜FDA 調查擴張型心肌病 → 不足以證明因果 ----------
K.scene('69', 5, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「美國食品藥物管理局（FDA）｜2018 年起」，大標「FDA 曾調查」／「擴張型心肌病」（橘）', '念到「心肌病」：右邊愛心圖示磚＋放大鏡；念到「某些寵物食品」：飼料袋圖示磚', '念到「標示為無穀」：飼料袋貼上「無穀」；念到「豌豆、扁豆」：豆類圖示磚＋說明「較多豌豆、扁豆等豆類」'],
  mount: () => K.ey('k69', '美國食品藥物管理局（FDA）｜2018 年起', 140, 150) + K.h('h69', ['FDA 曾調查', '<b class="o">擴張型心肌病</b>'], { y: 200, size: 88 }) +
    K.tile('Heart', { id: 't690', x: 1040, y: 200, size: 200 }) + K.icon('mg69', 'Magnifier', 1170, 300, 130) +
    K.tile('FoodBag', { id: 't691', x: 1330, y: 200, size: 200 }) + K.pill('p69', '無穀', 1440, 170, 'o', { fs: 32 }) +
    K.tile('Peas', { id: 't692', x: 1600, y: 200, size: 200 }) +
    `<div class="abs" id="l692" style="left:1520px;top:420px;width:360px;text-align:center;font-size:28px;font-weight:900">較多豌豆、扁豆等豆類</div>`,
  init() { K.hideLines('h69', 2); gsap.set(['#mg69', '#p69', '#l692'], { opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k69', S.at(0));
    K.lines(S, 'h69', 2, S.at(0) + .1, '大標「FDA 曾調查擴張型心肌病」');
    K.pop(S, '#t690', S.word('心肌病', 0, -.4), '右邊愛心圖示磚');
    K.pop(S, '#mg69', S.word('心肌病', 0, -.1), '放大鏡', { sfx: false });
    K.pop(S, '#t691', S.word('寵物食品', 0, -.2), '飼料袋圖示磚', { pitch: 1.1 });
    K.stamp(S, '#p69', S.word('標示為無穀', 0, -.1), '飼料袋貼上「無穀」');
    K.pop(S, ['#t692', '#l692'], S.word('豌豆', 0, -.2), '豆類圖示磚＋說明「較多豌豆、扁豆等豆類」', { pitch: 1.2 });
  },
});
K.scene('70', 5, {
  enter: 'none',
  visuals: ['（接續）念到「2022 年 12 月」：左下藍色標籤「2022 年 12 月：FDA 表示」', '念到「不足以證明」：右邊三塊圖示磚上蓋印章「不足以證明因果」', '念到「停止定期發布」：灰色小字「後續停止定期發布調查進度」'],
  mount: () => K.ipill('p70', 'Doc', '2022 年 12 月：FDA 表示', 140, 520, 'bt', { fs: 36 }) +
    `<div class="sub" id="s70" style="left:140px;top:620px">單靠通報的案例數量，<br><b>不足以證明</b>食品和疾病有因果關係</div>` +
    `<div class="stamp" id="sp70" style="left:1180px;top:480px">不足以證明因果</div>` +
    `<div class="note" id="nt70" style="left:140px;top:800px;font-size:28px">後續停止定期發布調查進度</div>`,
  init() { gsap.set(['#p70', '#s70', '#nt70'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#p70', S.word('2022', 0, -.2), '左下藍色標籤「2022 年 12 月：FDA 表示」', { sfx: 'pop-card' });
    K.rise(S, '#s70', S.word('通報的案例', 0, -.2), '說明「單靠通報的案例數量，不足以證明食品和疾病有因果關係」');
    K.stamp(S, '#sp70', S.word('不足以證明', 0, -.2), '右邊蓋印章「不足以證明因果」');
    K.fadeIn(S, '#nt70', S.word('停止定期', 0, -.2), '灰色小字「後續停止定期發布調查進度」');
  },
});

// ---------- 幕 71｜不能只憑無穀兩個字判斷；考慮改吃、心臟病好發品種先問獸醫 ----------
K.scene('71', 5, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底；大標「不能只憑無穀兩個字，」／「判斷好壞」（橘）', '念到「證據仍不足」：灰色標籤「證據不足以支持簡單的因果結論」', '念到時兩條情況卡依序滑入：考慮讓狗狗改吃無穀飼料（穀物）／心臟疾病的好發品種（愛心）', '念到「先和獸醫討論」：右邊蓋上印章「先和獸醫討論」'],
  mount: () => K.h('h71', ['不能只憑無穀兩個字，', '<b class="o">判斷好壞</b>'], { y: 160, size: 80 }) +
    K.pill('g71', '證據不足以支持簡單的因果結論', 140, 410, 'gh', { fs: 36 }) +
    K.bar('c710', { x: 140, y: 540, w: 1080, h: 140, ic: 'Grain', t: '考慮讓狗狗改吃無穀飼料', ts: 40 }) +
    K.bar('c711', { x: 140, y: 710, w: 1080, h: 140, ic: 'Heart', t: '心臟疾病的好發品種', ts: 40 }) +
    K.tile('Clinic', { id: 't71', x: 1440, y: 480, size: 220 }) +
    `<div class="stamp" id="sp71" style="left:1350px;top:740px">先和獸醫討論</div>`,
  init() { K.hideLines('h71', 2); gsap.set(['#g71', '#c710', '#c711', '#t71'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h71', 2, S.at(0), '大標「不能只憑無穀兩個字，判斷好壞」');
    K.pop(S, '#g71', S.word('證據仍不足', 0, -.2), '灰色標籤「證據不足以支持簡單的因果結論」', { sfx: 'pop-low' });
    K.rise(S, '#c710', S.word('考慮讓狗狗', 0, -.2), '情況卡「考慮讓狗狗改吃無穀飼料」滑入', { dx: -50, dy: 0 });
    K.rise(S, '#c711', S.word('心臟疾病', 0, -.2), '情況卡「心臟疾病的好發品種」滑入', { dx: -50, dy: 0 });
    K.pop(S, '#t71', S.word('先和獸醫', 0, -.5), '右邊動物醫院圖示磚');
    K.stamp(S, '#sp71', S.word('先和獸醫', 0, -.2), '蓋上印章「先和獸醫討論」', { straight: true });
  },
});
