// 幕 45–56｜第三步：幼犬、成犬、老犬，挑飼料的重點不一樣

// ---------- 幕 45｜章節卡 ----------
const AG45 = [['ball', '幼犬', 190, 300], ['sit', '成犬', 220, 260], ['rest', '老犬', 280, 360]];
K.scene('45', 3, {
  enter: 'iris', irisAt: [1400, 520], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 03｜第三步」，大標「幼犬、成犬、老犬，」／「挑飼料的重點不一樣」（橘）', '念到時右邊三隻黑柴依序跳出來：幼犬（玩球）、成犬（坐著）、老犬（趴著），下面標名字'],
  mount: () => K.chap('45', 3, ['幼犬、成犬、老犬，', '<b class="o">挑飼料的重點不一樣</b>'], { size: 84 }) +
    AG45.map(([p, t, w], k) => K.dog(p, { id: 'dg45' + k, x: 1000 + k * 290, y: k === 2 ? 470 : 360, w }) +
      `<div class="abs" id="l45${k}" style="left:${1000 + k * 290}px;top:690px;width:${w}px;text-align:center;font-size:36px;font-weight:900">${t}</div>`).join(''),
  init() { K.hideLines('h45', 2); gsap.set(AG45.map((_, k) => '#l45' + k), { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '45', S.at(0));
    AG45.forEach(([, t], k) => { K.dogIn(S, '#dg45' + k, S.word(t, 0, -.15), k ? '' : '念到時三隻黑柴依序跳出來'); K.fadeIn(S, '#l45' + k, S.word(t, 0, 0), '', .3); });
  },
});

// ---------- 幕 46–46b｜幼犬：成長期；大型犬 32 公斤 ----------
K.scene('46', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「幼犬」，大標「除了看成長期，」／「還要注意是不是大型犬」（橘）', '右邊玩球的幼犬，念到「正在成長」：藍色手寫「正在成長」＋往上的箭頭'],
  mount: () => K.kicker('k46', 'PUPPY', '幼犬', { y: 150 }) + K.h('h46', ['除了看成長期，', '<b class="o">還要注意是不是大型犬</b>'], { y: 210, size: 76 }) +
    K.dog('ball', { id: 'dg46', x: 1120, y: 520, w: 230 }) +
    K.anno('an46', '', '正在成長', { x: 1140, y: 440, ss: 36 }) + K.arrow('ar46', { x: 1340, y: 420, w: 80, h: 140, d: 'M40 130 C 30 90 40 50 40 10' }),
  init() { K.hideLines('h46', 2); gsap.set(['#an46', '#dg46'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k46', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h46', 2, S.at(0) + .1, '大標「除了看成長期，還要注意是不是大型犬」');
    K.dogIn(S, '#dg46', S.word('先說幼犬', 0, -.2), '右邊玩球的幼犬');
    K.fadeIn(S, '#an46', S.word('正在成長', 0, -.2), '藍色手寫「正在成長」');
    K.draw(S, '#ar46', S.word('正在成長', 0, 0), '往上的箭頭', .4);
  },
});
K.scene('46b', 3, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）', '（接續）念到「成長期」「全生命階段」：左下兩個打勾標籤：適合成長期、適合全生命階段', '念到「大型犬飼主」：右邊黃金獵犬跳出來；念到「32 公斤」：藍色手寫大數字從 0 跑到 32「公斤以上：要多確認一項資訊」'],
  mount: () => K.pill('p460', K.chk() + '適合成長期', 140, 520, '', { fs: 38, style: 'gap:16px' }) + K.pill('p461', K.chk() + '適合全生命階段', 140, 630, '', { fs: 38, style: 'gap:16px' }) +
    K.dog('golden', { id: 'dg46b', x: 1460, y: 420, w: 300 }) +
    `<div class="anno row" id="an46b" style="left:1420px;top:180px"><b style="font-size:130px"><i id="n46b" style="font-style:normal">0</i></b><span style="font-size:36px">公斤以上</span></div>` +
    K.pill('p462', '要再多確認一項資訊', 140, 770, 'o', { fs: 36 }),
  init() { gsap.set(['#p460', '#p461', '#dg46b', '#an46b', '#p462'], { opacity: 0 }); },
  animate(S) {
    S.to(['#an46', '#ar46'], { opacity: 0, duration: .3 }, S.at(0));
    K.rise(S, '#p460', S.word('成長期', 0, -.1), '打勾標籤「適合成長期」', { sfx: 'pop-card', dx: -40, dy: 0 });
    K.rise(S, '#p461', S.word('全生命階段', 0, -.1), '打勾標籤「適合全生命階段」', { sfx: 'pop-card', dx: -40, dy: 0 });
    K.dogIn(S, '#dg46b', S.word('大型犬飼主', 0, -.2), '右邊黃金獵犬跳出來');
    const t = S.word('32', 0, -.3);
    K.fadeIn(S, '#an46b', t, '藍色手寫大數字', .3);
    K.count(S, '#n46b', 0, 32, t, .9, '數字從 0 跑到 32「公斤以上」');
    S.sfx(t + .8, 'tick', '32 公斤：「叮咚」');
    K.pop(S, '#p462', S.word('多確認一項', 0, -.2), '橘色標籤「要再多確認一項資訊」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 47｜AAFCO 2016：包含 / 不包含大型犬的成長期 ----------
K.scene('47', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底；小標「AAFCO｜2016 年起」，大標「大型幼犬，」／「選標示包含的那一種」（橘）', '左邊一張成長期飼料的標示卡，念到「包含」「不包含」：兩行依序出現：包含大型犬的成長期／不包含大型犬的成長期', '念到「要選標示包含的那一種」：「包含」那一行打勾、加橘框，「不包含」那一行變灰；右邊黃金獵犬'],
  mount: () => K.ey('k47', 'AAFCO｜2016 年起', 140, 150) + K.h('h47', ['大型幼犬，', '<b class="o">選標示包含的那一種</b>'], { y: 200, size: 80 }) +
    `<div class="cd" id="c47" style="left:140px;top:440px;width:1100px;height:420px;padding:40px 50px"><div class="k">成長期飼料的標示</div>` +
    [['包含', '大型犬的成長期'], ['不包含', '大型犬的成長期']].map(([a, b], k) => `<div class="cd" id="r47${k}" style="position:relative;margin-top:30px;height:120px;border-radius:26px;display:flex;align-items:center;gap:24px;padding:0 36px;font-size:42px;font-weight:900"><span class="${k ? '' : 'o'}">${a}</span><span>${b}</span>${k ? '' : K.chk().replace('class="chk"', 'class="chk" id="k47" style="width:64px;height:64px"')}</div>`).join('') + `</div>` +
    K.dog('golden', { id: 'dg47', x: 1400, y: 400, w: 340 }),
  init() { K.hideLines('h47', 2); gsap.set(['#c47', '#r470', '#r471', '#dg47', '#k47'], { opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k47', S.at(0));
    K.lines(S, 'h47', 2, S.at(0) + .1, '大標「大型幼犬，選標示包含的那一種」');
    K.rise(S, '#c47', S.word('成長期的飼料', 0, -.2), '左邊成長期飼料的標示卡浮上', { sfx: 'pop-card' });
    K.dogIn(S, '#dg47', S.word('成長期的飼料', 0, .2), '右邊黃金獵犬');
    K.rise(S, '#r470', S.word('包含', 0, -.1), '「包含大型犬的成長期」', { dx: -40, dy: 0 });
    K.rise(S, '#r471', S.word('不包含', 0, -.1), '「不包含大型犬的成長期」', { dx: -40, dy: 0 });
    const t = S.word('包含', 2, -.3);
    S.to('#r470', { boxShadow: K.RING, duration: .3 }, t, '「包含」那一行加橘框、打勾；「不包含」變灰');
    K.pop(S, '#k47', t + .1, '', { sfx: false });
    S.to('#r471', { opacity: .35, duration: .3 }, t);
    S.sfx(t, 'tick', '選這個：「叮咚」');
  },
});

// ---------- 幕 48｜鈣上限 2.5% → 1.8% ----------
K.scene('48', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底；大標「鈣不是」／「補得越多越好」（橘）', '念到「骨骼和身體發育」：左下鈣（骨頭）圖示磚＋說明「骨骼發育需要適當的營養比例」', '右邊兩根長條：念到「2.5%」：灰色長條「修訂前 2.5%」；念到「1.8%」：橘色長條「修訂後：大型幼犬 1.8%」，中間藍色箭頭往下', '下方小字「以扣掉水分之後的重量計算」'],
  mount: () => K.ey('k48', 'AAFCO｜2016 年修訂｜鈣含量上限', 1000, 160, { fs: 24 }) + K.h('h48', ['鈣不是', '<b class="o">補得越多越好</b>'], { y: 200, size: 96 }) +
    K.tile('Calcium', { id: 't48', x: 140, y: 520, size: 180 }) + `<div class="sub" id="s48" style="left:360px;top:560px">骨骼發育<br>需要<b>適當的營養比例</b></div>` +
    `<div class="abs" style="left:1060px;top:300px;width:700px;height:520px">` +
    [['2.5', '修訂前', 500, '#D9D5D0', '#7C7772'], ['1.8', '大型幼犬（修訂後）', 360, 'linear-gradient(180deg,#FFB070,#F97316)', 'var(--or)']].map(([v, l, h, bg, c], k) => `<div class="vbar" id="vb48${k}" style="left:${60 + k * 360}px;height:${h}px;background:${bg}"></div><div class="abs big" id="vn48${k}" style="left:${10 + k * 360}px;top:${520 - h - 120}px;width:280px;text-align:center;font-size:100px;color:${c}">${v}%</div><div class="abs" id="vl48${k}" style="left:${k * 360 - 20}px;top:540px;width:340px;text-align:center;font-size:30px;font-weight:900">${l}</div>`).join('') + `</div>` +
    K.arrow('ar48', { x: 1340, y: 240, w: 180, h: 140, d: 'M10 20 C 80 10 140 50 170 120' }) +
    `<div class="note" id="nt48" style="left:1060px;top:900px;font-size:26px">以扣掉水分之後的重量計算</div>`,
  init() { K.hideLines('h48', 2); gsap.set(['#s48', '#vn480', '#vn481', '#vl480', '#vl481', '#nt48'], { opacity: 0 }); gsap.set(['#vb480', '#vb481'], { scaleY: 0 }); gsap.set('#k48', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h48', 2, S.at(0), '大標「鈣不是補得越多越好」');
    K.pop(S, '#t48', S.word('骨骼', 0, -.2), '左下鈣（骨頭）圖示磚');
    K.rise(S, '#s48', S.word('營養比例', 0, -.3), '說明「骨骼發育需要適當的營養比例」');
    K.eyIn(S, 'k48', S.word('修訂標準', 0, -.3));
    const t1 = S.word('2.5', 0, -.2);
    S.to('#vb480', { scaleY: 1, duration: .6, ease: 'power2.out' }, t1, '灰色長條「修訂前 2.5%」');
    S.to(['#vn480', '#vl480'], { opacity: 1, duration: .3 }, t1 + .3);
    S.sfx(t1, 'slide', '長條長出來：輕「咻」');
    const t2 = S.word('1.8', 0, -.2);
    K.draw(S, '#ar48', t2 - .3, '藍色箭頭往下', .4);
    S.to('#vb481', { scaleY: 1, duration: .6, ease: 'power2.out' }, t2, '橘色長條「修訂後：大型幼犬 1.8%」');
    S.to(['#vn481', '#vl481'], { opacity: 1, duration: .3 }, t2 + .3);
    S.sfx(t2 + .5, 'tick', '1.8%：「叮咚」');
    K.fadeIn(S, '#nt48', S.word('扣掉水分', 0, -.2), '下方小字「以扣掉水分之後的重量計算」');
  },
});

// ---------- 幕 49｜不能只看幼犬專用；23 公斤更保守 ----------
const AX0 = 200, AX1 = 1720, KG = kg => AX0 + (AX1 - AX0) * kg / 40;
K.scene('49', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底；大標「不能只看」／「幼犬專用」（橘），灰色虛線標籤「幼犬專用」被打叉', '下方一條體重尺（0–40 公斤）：先標出 32 公斤（橘，大型犬）；念到「23 公斤」：再標出 23 公斤（藍，更保守的分界）', '念到「詢問獸醫」：藍色標籤「體型不確定：問獸醫」'],
  mount: () => K.h('h49', ['不能只看', '<b class="o">幼犬專用</b>'], { y: 180, size: 96 }) +
    K.pill('g49', '幼犬專用', 780, 260, 'gh', { fs: 44 }) + K.xm('x49', 990, 230) +
    K.pill('p49b', K.chk() + '標示包含大型犬成長期', 780, 380, '', { fs: 36, style: 'gap:16px' }) +
    `<div class="abs" id="ax49" style="left:${AX0}px;top:640px;width:${AX1 - AX0}px;height:14px;border-radius:7px;background:#E3E0DC"></div>` +
    [0, 10, 20, 30, 40].map(v => `<div class="abs" style="left:${KG(v) - 40}px;top:670px;width:80px;text-align:center;font:700 24px 'Space Mono';color:#A29D97">${v}</div>`).join('') +
    `<div class="abs" id="m4932" style="left:${KG(32) - 8}px;top:560px;width:16px;height:100px;border-radius:8px;background:var(--or-b)"></div><div class="abs" id="t4932" style="left:${KG(32) - 160}px;top:470px;width:320px;text-align:center;font-size:30px;font-weight:900;color:var(--or)">32 公斤：大型犬</div>` +
    `<div class="abs" id="m4923" style="left:${KG(23) - 8}px;top:560px;width:16px;height:100px;border-radius:8px;background:var(--blue)"></div><div class="anno" id="t4923" style="left:${KG(23) - 200}px;top:720px;width:400px"><b style="font-size:80px">23</b><span>公斤：更保守的分界</span></div>` +
    K.ipill('p49', 'Clinic', '體型不確定：問獸醫', 140, 850, 'b', { fs: 36 }),
  init() { K.hideLines('h49', 2); gsap.set(['#g49', '#p49b', '#m4932', '#t4932', '#m4923', '#t4923', '#p49', '#ax49'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h49', 2, S.at(0), '大標「不能只看幼犬專用」');
    K.pop(S, '#g49', S.word('幼犬專用', 0, -.2), '灰色虛線標籤「幼犬專用」', { sfx: 'pop-low' });
    K.xIn(S, '#x49', S.word('直接購買', 0, -.1), '打叉');
    K.rise(S, '#p49b', S.word('包含大型犬', 0, -.2), '打勾標籤「標示包含大型犬成長期」', { sfx: 'pop-card' });
    const t0 = S.word('塔夫茨', 0, -.2);
    S.to('#ax49', { opacity: 1, duration: .4 }, t0, '下方體重尺（0–40 公斤），標出 32 公斤（大型犬）');
    S.to(['#m4932', '#t4932'], { opacity: 1, duration: .3 }, t0 + .3);
    S.sfx(t0, 'slide', '體重尺：輕「咻」');
    const t = S.word('23', 0, -.3);
    S.fromTo('#m4923', { opacity: 0, scaleY: 0 }, { opacity: 1, scaleY: 1, duration: .4, ease: 'back.out(2)' }, t, '再標出 23 公斤（更保守的分界）');
    K.fadeIn(S, '#t4923', t + .2, '');
    S.sfx(t, 'ding-soft', '23 公斤：輕「叮」');
    K.pop(S, '#p49', S.word('詢問獸醫', 0, -.2), '藍色標籤「體型不確定：問獸醫」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 50｜成犬：吃對份量 ----------
const F50 = [['PlayTime', '活動量'], ['Scale', '體重'], ['Flame', '熱量需求']];
K.scene('50', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底；小標「成犬」，大標「最重要的是」／「吃對份量」（橘）；右邊坐著的黑柴', '念到「成犬維持」「全生命階段」：兩個打勾標籤', '念到「不代表」：藍色手寫「照包裝數字餵 ≠ 一定沒問題」', '念到時三塊圖示磚依序彈出：活動量、體重、熱量需求「每隻都不一樣」'],
  mount: () => K.kicker('k50', 'ADULT', '成犬', { y: 150 }) + K.h('h50', ['最重要的是', '<b class="o">吃對份量</b>'], { y: 210, size: 96 }) +
    K.dog('sit', { id: 'dg50', x: 1500, y: 150, w: 250 }) +
    K.pill('p500', K.chk() + '成犬維持', 140, 470, '', { fs: 36, style: 'gap:16px' }) + K.pill('p501', K.chk() + '全生命階段', 440, 470, '', { fs: 36, style: 'gap:16px' }) +
    K.anno('an50', '', '照包裝數字餵 ≠ 一定沒問題', { x: 140, y: 580, ss: 38, align: 'left' }) +
    F50.map(([ic, t], k) => K.tile(ic, { id: 't50' + k, x: 1000 + k * 250, y: 600, size: 170 }) +
      `<div class="abs" id="l50${k}" style="left:${1000 + k * 250 - 30}px;top:785px;width:230px;text-align:center;font-size:32px;font-weight:900">${t}</div>`).join(''),
  init() { K.hideLines('h50', 2); gsap.set(['#dg50', '#p500', '#p501', '#an50'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k50', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h50', 2, S.at(0) + .1, '大標「最重要的是吃對份量」');
    K.dogIn(S, '#dg50', S.at(0) + .5, '右邊坐著的黑柴');
    K.rise(S, '#p500', S.word('成犬維持', 0, -.1), '打勾標籤「成犬維持」', { sfx: 'pop-card' });
    K.rise(S, '#p501', S.word('全生命階段', 0, -.1), '打勾標籤「全生命階段」', { sfx: 'pop-card' });
    K.fadeIn(S, '#an50', S.word('不代表', 0, -.1), '藍色手寫「照包裝數字餵 ≠ 一定沒問題」');
    F50.forEach(([, w], k) => K.pop(S, ['#t50' + k, '#l50' + k], S.word(w, 0, -.1), k ? '' : '念到時三塊圖示磚依序彈出', { pitch: 1 + k * .1, sfx: 'pop-card' }));
  },
});

// ---------- 幕 51｜真實畫面：觀察體態和體重 ----------
const PT51 = [
  { ic: 'Jerky', t: '零食吃很多 → 調整主食份量', at: '很多零食' },
  { ic: 'PlayTime', t: '活動量比較少 → 調整主食份量', at: '活動量' },
  { ic: 'Scale', t: '定期觀察體態和體重', at: '定期觀察' },
];
K.scene('51', 3, {
  enter: 'slide',
  visuals: ['右邊直式影片框（真實畫面：用廚房秤量一餐的飼料；摸狗狗的肋骨、從上往下看腰身）', '左邊字卡依序滑入、加橘框：零食吃很多 → 調整主食份量／活動量比較少 → 調整主食份量／定期觀察體態和體重'],
  mount: S => S.footage() + PT51.map((p, k) => K.bar('f51' + k, { x: 140, y: 220 + k * 210, w: 1020, h: 170, ic: p.ic, t: p.t, ts: 40 })).join(''),
  init() { gsap.set(PT51.map((_, k) => '#f51' + k), { opacity: 0 }); },
  animate(S) {
    PT51.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f51' + (k - 1), t, false);
      K.rise(S, '#f51' + k, t, `字卡 ${k + 1} 由左滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f51' + k, t + .2);
    });
  },
});

// ---------- 幕 52｜老犬：AAFCO 沒有統一標準 ----------
K.scene('52', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「老犬」，大標「老狗需求因狗而異，」／「不一定要換老犬飼料」（橘）', '念到「老犬專用飼料」：右邊三包飼料，標籤分別是老犬、熟齡、老犬', '念到「AAFCO 並沒有」：左下灰色虛線標籤「AAFCO：沒有老犬專屬的統一標準」', '念到「很大的差異」：三包飼料大小高低變得不一樣，藍色手寫「營養組成差很多」'],
  mount: () => K.kicker('k52', 'SENIOR', '老犬', { y: 150 }) + K.h('h52', ['老狗需求因狗而異，', '<b class="o">不一定要換老犬飼料</b>'], { y: 210, size: 76 }) +
    ['老犬', '熟齡', '老犬'].map((t, k) => `<div class="abs" id="b52${k}" style="left:${1080 + k * 250}px;top:460px;width:200px;text-align:center">${K.tile('FoodBag', { x: 0, y: 0, size: 200 }).replace('style="left:0px', 'style="position:relative;left:0px')}<div class="pl ot" style="position:relative;margin-top:16px;font-size:30px">${t}</div></div>`).join('') +
    K.ipill('g52', 'Seal', 'AAFCO：沒有老犬專屬的統一標準', 140, 520, 'gh', { fs: 34 }) +
    K.anno('an52', '', '營養組成差很多', { x: 1210, y: 820, ss: 38 }) +
    K.dog('rest', { id: 'dg52', x: 160, y: 680, w: 300 }),
  init() { K.hideLines('h52', 2); gsap.set(['#g52', '#an52', '#b520', '#b521', '#b522', '#dg52'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k52', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h52', 2, S.at(0) + .1, '大標「老狗需求因狗而異，不一定要換老犬飼料」');
    K.dogIn(S, '#dg52', S.word('年紀大了', 0, -.2), '左下趴著的老犬');
    K.pop(S, ['#b520', '#b521', '#b522'], S.word('老犬專用飼料', 0, -.2), '右邊三包飼料：老犬、熟齡、老犬', { stagger: .12, sfx: 'pop-card' });
    K.rise(S, '#g52', S.word('並沒有', 0, -.2), '灰色虛線標籤「AAFCO：沒有老犬專屬的統一標準」');
    const t = S.word('很大的差異', 0, -.3);
    [[.75, 30], [1.12, -20], [.9, 10]].forEach(([sc, y], k) => S.to('#b52' + k, { scale: sc, y, duration: .5, ease: 'back.out(2)' }, t + k * .08, k ? '' : '三包飼料大小高低變得不一樣'));
    S.sfx(t, 'bounce', '變形：彈一下');
    K.fadeIn(S, '#an52', t + .3, '藍色手寫「營養組成差很多」');
  },
});

// ---------- 幕 53｜塔夫茨 2011：約 40 款，熱量 246–408 大卡，磷相差三倍 ----------
K.scene('53', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；小標「塔夫茨大學｜2011 年｜約 40 款市售老犬飼料」，大標「市售老犬飼料，」／「差異相當大」（橘）', '右上卡「每杯熱量」：念到時兩個數字依序跑出來：約 246 大卡 → 408 大卡，中間一條範圍線', '右下卡「磷含量」：一短一長兩條長條，念到「相差三倍」：橘字「最多相差三倍」', '左下小字「2011 年資料，市售產品可能已有變化」'],
  mount: () => K.ey('k53', '塔夫茨大學｜2011 年｜約 40 款', 140, 150) + K.h('h53', ['市售老犬飼料，', '<b class="o">差異相當大</b>'], { y: 200, size: 84 }) +
    `<div class="cd" id="c530" style="left:960px;top:200px;width:820px;height:300px;padding:36px 46px"><div class="k">每杯熱量</div>` +
    `<div style="display:flex;align-items:baseline;justify-content:space-between;margin-top:20px"><span><span class="big" id="n530" style="font-size:110px;color:#7C7772">0</span><span style="font-size:32px;font-weight:900"> 大卡</span></span><span><span class="big" id="n531" style="font-size:110px;color:var(--or)">0</span><span style="font-size:32px;font-weight:900"> 大卡</span></span></div>` +
    `<div style="position:relative;height:16px;border-radius:8px;background:#ECEAE7;margin-top:16px"><i id="r53" style="position:absolute;left:0;top:0;bottom:0;width:100%;border-radius:8px;background:linear-gradient(90deg,#D9D5D0,#F97316);transform-origin:0 50%"></i></div></div>` +
    `<div class="cd" id="c531" style="left:960px;top:540px;width:820px;height:300px;padding:36px 46px"><div class="k">磷含量</div>` +
    `<div style="margin-top:30px"><div id="p530" style="height:46px;width:200px;border-radius:23px;background:#D9D5D0;transform-origin:0 50%"></div><div id="p531" style="height:46px;width:600px;border-radius:23px;background:#F97316;margin-top:18px;transform-origin:0 50%"></div></div>` +
    `<div class="abs" id="x53" style="right:46px;top:30px;font-size:36px;font-weight:900;color:var(--or)">最多相差三倍</div></div>` +
    `<div class="note" id="nt53" style="left:140px;top:820px;font-size:26px">2011 年資料，市售產品可能已有變化</div>`,
  init() { K.hideLines('h53', 2); gsap.set(['#c530', '#c531', '#x53', '#nt53'], { opacity: 0 }); gsap.set(['#r53', '#p530', '#p531'], { scaleX: 0 }); },
  animate(S) {
    K.eyIn(S, 'k53', S.at(0));
    K.lines(S, 'h53', 2, S.word('差異相當大', 0, -1.2), '大標「市售老犬飼料，差異相當大」');
    K.fadeIn(S, '#nt53', S.word('40', 0, -.2), '左下小字「2011 年資料，市售產品可能已有變化」');
    K.rise(S, '#c530', S.word('熱量', 0, -.2), '右上卡「每杯熱量」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c531', S.word('磷含量', 0, -.2), '右下卡「磷含量」浮上', { sfx: 'pop-card' });
    K.count(S, '#n530', 0, 246, S.word('246', 0, -.2), .8, '數字跑到「約 246 大卡」');
    K.count(S, '#n531', 0, 408, S.word('408', 0, -.2), .8, '數字跑到「408 大卡」');
    S.to('#r53', { scaleX: 1, duration: .8, ease: 'power2.out' }, S.word('408', 0, -.2), '範圍線由左往右長出來');
    S.sfx(S.word('408', 0, .5), 'tick', '408：「叮咚」');
    const t = S.word('相差三倍', 0, -.6);
    S.to('#p530', { scaleX: 1, duration: .4 }, t, '磷含量：一短一長兩條長條');
    S.to('#p531', { scaleX: 1, duration: .6, ease: 'power2.out' }, t + .2);
    K.pop(S, '#x53', S.word('三倍', 0, -.1), '橘字「最多相差三倍」', { sfx: 'pop-card' });
  },
});

// ---------- 幕 54｜2025 研究：老犬專用 ≠ 一定更適合 ----------
K.scene('54', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；小標「2025 年研究（探索性）」，大標「老犬飼料和成犬飼料，」／「沒有一致的營養差異」（橘）', '右邊兩包飼料「成犬」「老犬」，中間藍色手寫「沒有一致規律」', '念到「老犬專用」：左下灰色虛線標籤「老犬專用 ≠ 一定更適合」；趴著的老犬'],
  mount: () => K.ey('k54', '2025 年研究（探索性）', 140, 150) + K.h('h54', ['老犬飼料和成犬飼料，', '<b class="o">沒有一致的營養差異</b>'], { y: 200, size: 76 }) +
    ['成犬', '老犬'].map((t, k) => `<div class="abs" id="b54${k}" style="left:${1100 + k * 460}px;top:470px;width:220px;text-align:center">${K.tile('FoodBag', { x: 0, y: 0, size: 220 }).replace('style="left:0px', 'style="position:relative;left:0px')}<div class="pl ${k ? 'ot' : 'bt'}" style="position:relative;margin-top:16px;font-size:32px">${t}</div></div>`).join('') +
    K.anno('an54', '≈ ?', '沒有一致規律', { x: 1340, y: 500, bs: 90, ss: 30 }) +
    K.pill('g54', '老犬專用 ≠ 一定更適合', 140, 520, 'gh', { fs: 40 }) +
    K.dog('rest', { id: 'dg54', x: 160, y: 680, w: 300 }),
  init() { K.hideLines('h54', 2); gsap.set(['#b540', '#b541', '#an54', '#g54', '#dg54'], { opacity: 0 }); },
  animate(S) {
    K.eyIn(S, 'k54', S.at(0));
    K.lines(S, 'h54', 2, S.at(0) + .1, '大標「老犬飼料和成犬飼料，沒有一致的營養差異」');
    K.pop(S, ['#b540', '#b541'], S.word('老犬飼料和成犬飼料', 0, -.2), '右邊兩包飼料「成犬」「老犬」', { stagger: .15, sfx: 'pop-card' });
    K.fadeIn(S, '#an54', S.word('一致的營養差異', 0, -.2), '中間藍色手寫「沒有一致規律」');
    K.rise(S, '#g54', S.word('老犬專用', 0, -.2), '灰色虛線標籤「老犬專用 ≠ 一定更適合」');
    K.dogIn(S, '#dg54', S.word('年紀大的狗狗', 0, -.3), '趴著的老犬');
  },
});

// ---------- 幕 55｜每隻老狗不一樣；慢性病、體重改變先問獸醫 ----------
K.scene('55', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「每隻老狗，」／「需求都不一樣」（橘）', '念到時右邊兩張卡依序浮上：有的需要更多蛋白質和熱量（肉）／有的則不需要（狗碗）', '念到「請跟獸醫討論」：藍色標籤「要不要換、換哪一種：請跟獸醫討論」', '念到「腎臟、心臟」「體重明顯改變」：兩個警示標籤；念到「先和獸醫討論」：蓋上印章「先和獸醫討論」'],
  mount: () => K.h('h55', ['每隻老狗，', '<b class="o">需求都不一樣</b>'], { y: 180, size: 88 }) +
    K.vcard('c550', { x: 1000, y: 160, w: 380, h: 380, ic: 'Meat', t: '有的需要更多', d: '蛋白質和熱量', ts: 38, is: 130 }) +
    K.vcard('c551', { x: 1410, y: 160, w: 380, h: 380, ic: 'Kibble', t: '有的則不需要', ts: 38, is: 130 }) +
    K.ipill('p55', 'Clinic', '要不要換、換哪一種：請跟獸醫討論', 140, 450, 'bt', { fs: 34 }) +
    K.ipill('w550', 'Warning', '腎臟、心臟等慢性疾病', 140, 620, '', { fs: 36 }) + K.ipill('w551', 'Scale', '體重明顯改變', 140, 740, '', { fs: 36 }) +
    `<div class="stamp" id="sp55" style="left:1100px;top:660px">先和獸醫討論</div>`,
  init() { K.hideLines('h55', 2); gsap.set(['#c550', '#c551', '#p55', '#w550', '#w551'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h55', 2, S.at(0), '大標「每隻老狗，需求都不一樣」');
    K.rise(S, '#c550', S.word('更多蛋白質', 0, -.3), '右卡「有的需要更多蛋白質和熱量」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c551', S.word('則不需要', 0, -.2), '右卡「有的則不需要」浮上', { sfx: 'pop-card' });
    K.pop(S, '#p55', S.word('請跟獸醫', 0, -.2), '藍色標籤「要不要換、換哪一種：請跟獸醫討論」', { sfx: 'pop-card' });
    K.rise(S, '#w550', S.word('腎臟', 0, -.2), '警示標籤「腎臟、心臟等慢性疾病」', { sfx: 'pop-low', dx: -40, dy: 0 });
    K.rise(S, '#w551', S.word('體重明顯改變', 0, -.2), '標籤「體重明顯改變」', { sfx: 'pop-low', dx: -40, dy: 0 });
    K.stamp(S, '#sp55', S.word('先和獸醫', 0, -.2), '蓋上印章「先和獸醫討論」', { straight: true });
  },
});

// ---------- 幕 56｜這一段的重點：幼犬、成犬、老犬 ----------
const SM56 = [
  { p: 'ball', t: '幼犬', a: '看成長需求', b: '大型幼犬：看專屬標示', at: '幼犬要看' },
  { p: 'sit', t: '成犬', a: '注意餵食量', b: '', at: '成犬要注意' },
  { p: 'rest', t: '老犬', a: '看個別健康狀況', b: '不一定要換老犬飼料', at: '老犬則要看' },
];
K.scene('56', 3, {
  enter: 'rise', bg: 'sky',
  visuals: ['淡藍底；小標「這一段的重點」', '念到時三張卡依序浮上、加橘框：幼犬 看成長需求（大型幼犬：看專屬標示）／成犬 注意餵食量／老犬 看個別健康狀況（不一定要換老犬飼料）'],
  mount: () => K.h('h56', ['這一段的<b class="o">重點</b>'], { y: 140, size: 76 }) +
    SM56.map((c, k) => `<div class="cd" id="c56${k}" style="left:${140 + k * 560}px;top:290px;width:520px;height:560px;padding:36px;text-align:center"><div style="height:240px;position:relative">${K.dog(c.p, { x: (448 - (c.p === 'rest' ? 230 : 135)) / 2, y: c.p === 'rest' ? 80 : 10, w: c.p === 'rest' ? 230 : 135, shadow: false })}</div>` +
      `<div class="t" style="font-size:48px;margin-top:10px">${c.t}</div><div style="font-size:38px;font-weight:900;color:var(--or);margin-top:10px">${c.a}</div>${c.b ? `<div class="d" style="font-size:28px;margin-top:14px">${c.b}</div>` : ''}</div>`).join(''),
  init() { K.hideLines('h56', 1); gsap.set(SM56.map((_, k) => '#c56' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h56', 1, S.at(0), '大標「這一段的重點」');
    SM56.forEach((c, k) => {
      const t = S.word(c.at, 0, -.2);
      if (k) K.ring(S, '#c56' + (k - 1), t, false);
      K.rise(S, '#c56' + k, t, k ? '' : '念到時三張卡依序浮上、加橘框', { sfx: 'pop-card' });
      K.ring(S, '#c56' + k, t + .2);
    });
  },
});
