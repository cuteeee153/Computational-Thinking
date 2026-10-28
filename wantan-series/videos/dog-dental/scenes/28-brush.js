// 幕 28–42｜第三步：每天刷牙；牙刷、牙膏怎麼挑；狗狗不讓刷時循序漸進。

// ---------- 幕 28｜章節卡 ----------
K.scene('28', 2, {
  enter: 'iris', irisAt: [1500, 560], bg: 'mint',
  visuals: ['（這一幕還沒有錄音）', '淡綠底，圓形轉場；章節卡「STEP 03｜第三步」，大標「比起買潔牙產品」／「每天刷牙更重要」（橘）', '右邊被刷牙的黑柴', '念到「答案是」：左下方蓋上橘色印章「最重要的居家口腔保健」'],
  mount: () => K.chap('28', 3, ['比起買潔牙產品', '<b class="o">每天刷牙更重要</b>'], { size: 92 }) +
    K.d('brush', { id: 'dg28', x: 1260, y: 300, w: 420 }) + K.icon('tb28', 'Toothbrush', 1560, 330, 200) +
    `<div class="stamp" id="sp28" style="left:140px;top:620px">最重要的居家口腔保健</div>`,
  init() { K.hideLines('h28', 2); gsap.set(['#dg28', '#tb28'], { opacity: 0 }); },
  animate(S) {
    K.chapIn(S, '28', S.at(0));
    K.dogIn(S, '#dg28', S.at(0) + .4, '右邊被刷牙的黑柴');
    K.pop(S, '#tb28', S.word('每天刷牙', 0, -.2), '牙刷圖示');
    S.to('#tb28', { x: 30, duration: .16, yoyo: true, repeat: 5 }, S.word('每天刷牙', 0, .3));
    S.sfx(S.word('每天刷牙', 0, .3), 'brush', '刷牙聲', { dur: 1 });
    K.stamp(S, '#sp28', S.word('最重要', 0, -.2), '蓋上橘色印章「最重要的居家口腔保健」', { straight: true });
  },
});

// ---------- 幕 29｜「我家狗狗根本不讓我碰嘴巴」（手機對話） ----------
K.scene('29', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底；左邊大標「刷不了牙」／「怎麼辦？」（橘），下方歪頭的黑柴', '右邊手機對話：飼主的藍色泡泡「我家狗狗根本不讓我碰嘴巴，哪有辦法每天刷牙？」', '念到「別擔心」：黑柴大頭貼回覆白色泡泡「別擔心，等一下會聊到替代方案」', '最後左下方橘字「先了解：為什麼刷牙這麼重要」'],
  mount: () => K.h('h29', ['刷不了牙', '<b class="o">怎麼辦？</b>'], { y: 240, size: 110 }) + K.d('mirror', { id: 'dg29', x: 200, y: 560, w: 230 }) +
    K.phone('ph29', `<div class="abs" style="left:28px;right:28px;top:260px;display:flex;flex-direction:column;gap:22px">` +
      `<div class="qb" id="qb29">我家狗狗根本不讓我碰嘴巴，哪有辦法每天刷牙？</div>` +
      `<div id="qa29" style="display:flex;gap:14px;align-items:flex-end"><img src="assets/dogs/clay/avatar.png" style="width:64px;height:64px;border-radius:50%;object-fit:cover;background:#fff"><div class="qa">別擔心，等一下會聊到替代方案</div></div></div>`, { title: '飼主的煩惱' }) +
    K.concl('cn29', '先了解：<b style="color:#16130F">為什麼刷牙這麼重要</b>', { x: 520, y: 760, size: 42 }),
  init() { K.hideLines('h29', 2); gsap.set('#ph29', { y: 900 }); gsap.set(['#qb29', '#qa29', '#cn29', '#dg29'], { opacity: 0 }); },
  animate(S) {
    S.to('#ph29', { y: 0, duration: .8, ease: 'power3.out' }, S.start, '手機畫面跟著換幕滑上來');
    S.sfx(S.start, 'whoosh', '手機滑上來：「咻」', { gain: .6 });
    K.lines(S, 'h29', 2, S.at(0), '大標「刷不了牙，怎麼辦？」');
    K.dogIn(S, '#dg29', S.at(0) + .4, '歪頭的黑柴');
    K.rise(S, '#qb29', S.word('我家狗狗', 0, -.2), '飼主的藍色泡泡「我家狗狗根本不讓我碰嘴巴…」', { sfx: 'pop', dy: 30 });
    K.rise(S, '#qa29', S.word('別擔心', 0, -.1), '黑柴回覆「別擔心，等一下會聊到替代方案」', { sfx: 'pop', dy: 30 });
    K.showConcl(S, '#cn29', S.word('為什麼刷牙', 0, -.2), '左下方橘字「先了解：為什麼刷牙這麼重要」');
  },
});

// ---------- 幕 30–30b｜真實畫面：刷牙（直拍在右，左邊字卡） ----------
const PT30 = [
  { ic: 'Toothbrush', t: '物理摩擦，直接清除牙菌斑', at: '物理摩擦' },
  { ic: 'DentalBone', t: '比只靠啃潔牙骨更針對牙齒表面', at: '相較於' },
];
K.scene('30', 2, {
  enter: 'slide',
  visuals: ['（這一幕還沒有錄音）', '右邊直式影片框（真實畫面：幫狗狗刷牙）', '左邊字卡依序滑入、加橘框：牙刷「物理摩擦，直接清除牙菌斑」、潔牙骨「比只靠啃潔牙骨更針對牙齒表面」'],
  mount: S => S.footage() + PT30.map((p, k) => K.bar('f30' + k, { x: 140, y: 200 + k * 210, w: 1020, h: 170, ic: p.ic, t: p.t, ts: 40 })).join(''),
  init() { gsap.set(['#f300', '#f301'], { opacity: 0 }); },
  animate(S) {
    PT30.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f30' + (k - 1), t, false);
      K.rise(S, '#f30' + k, t, `字卡 ${k + 1} 由左滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f30' + k, t + .2);
    });
  },
});
K.scene('30b', 2, {
  enter: 'none',
  visuals: ['（接續）第三張字卡滑入：「願意配合 → 每天的固定習慣」（橘字）'],
  mount: () => K.bar('f302', { x: 140, y: 620, w: 1020, h: 170, ic: 'Calendar', t: '願意配合 → <span class="o">每天的固定習慣</span>', ts: 40 }),
  init() { gsap.set('#f302', { opacity: 0 }); },
  animate(S) {
    const t = S.word('願意配合', 0, -.2);
    K.ring(S, '#f301', t, false);
    K.rise(S, '#f302', t, '字卡 3「願意配合 → 每天的固定習慣」滑入、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#f302', t + .2);
    S.sfx(S.word('固定習慣', 0, -.1), 'tick', '固定習慣：「叮咚」');
  },
});

// ---------- 幕 31–32｜牙刷要寵物專用嗎？ ----------
const BR31 = [['Toothbrush', '柔軟的刷毛', '柔軟的刷毛'], ['Paw', '適合嘴巴大小', '嘴巴大小'], ['Gum', '清得到牙齦邊緣', '靠近牙齦']];
K.scene('31', 2, {
  enter: 'push',
  visuals: ['大標「牙刷一定要」／「寵物專用？」（橘）', '念到「不一定」：右上蓋上藍色印章「不一定」', '三張卡依序浮上：柔軟的刷毛、適合嘴巴大小、清得到牙齦邊緣'],
  mount: () => K.h('h31', ['牙刷一定要', '<b class="o">寵物專用？</b>'], { y: 150, size: 84 }) +
    `<div class="stamp b" id="sp31" style="left:760px;top:230px">不一定</div>` +
    BR31.map(([ic, t], k) => K.vcard('b31' + k, { x: 140 + k * 560, y: 390, w: 520, h: 360, ic, t, ts: 40 })).join(''),
  init() { K.hideLines('h31', 2); gsap.set(BR31.map((_, k) => '#b31' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h31', 2, S.word('牙刷一定要', 0, -.2), '大標「牙刷一定要寵物專用？」');
    K.stamp(S, '#sp31', S.word('不一定', 0, -.1), '蓋上藍色印章「不一定」', { straight: true });
    BR31.forEach(([, , w], k) => K.rise(S, '#b31' + k, S.word(w, 0, -.2), k ? '' : '念到時三張卡依序浮上', { sfx: 'pop-card' }));
  },
});
K.scene('32', 2, {
  enter: 'none',
  visuals: ['（接續）下方結論橘字「適合狗狗、用得順手才是重點」', '最下方灰色小字「VOHC 清單也列有符合美國牙醫學會相關標準的軟毛平頭牙刷」'],
  mount: () => K.concl('cn32', '適合狗狗、<b style="color:#16130F">用得順手才是重點</b>', { y: 800, size: 54, center: true }) +
    `<div class="note" id="nt32" style="left:140px;top:890px;width:1640px;text-align:center;font-size:26px">VOHC 清單也列有符合美國牙醫學會相關標準的軟毛平頭牙刷</div>`,
  init() { gsap.set(['#cn32', '#nt32'], { opacity: 0 }); },
  animate(S) {
    K.showConcl(S, '#cn32', S.word('用得順手', 0, -.8), '結論「適合狗狗、用得順手才是重點」');
    K.fadeIn(S, '#nt32', S.word('美國牙醫學會', 0, -.3), '灰色小字：VOHC 清單也列有軟毛平頭牙刷');
  },
});

// ---------- 幕 33｜牙膏：寵物專用 vs 人類牙膏 ----------
K.scene('33', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；大標「牙膏一定要」／「寵物專用」（橘）', '兩張卡：左「寵物專用牙膏」（藍色打勾、加橘框），右「人類牙膏」（灰色、紅叉）'],
  mount: () => K.h('h33', ['牙膏一定要', '<b class="o">寵物專用</b>'], { y: 150, size: 84 }) +
    `<div class="cd" id="c330" style="left:240px;top:380px;width:640px;height:420px;text-align:center;padding-top:50px"><div style="width:200px;height:200px;margin:0 auto">${K.ic('Toothpaste')}</div><div class="t" style="margin-top:20px;font-size:46px;display:flex;gap:14px;align-items:center;justify-content:center">${K.chk().replace('class="chk"', 'class="chk" style="margin:0"')}寵物專用牙膏</div></div>` +
    `<div class="cd" id="c331" style="left:1040px;top:380px;width:640px;height:420px;text-align:center;padding-top:50px"><div class="gray" style="width:200px;height:200px;margin:0 auto">${K.ic('Toothpaste')}</div><div class="t" style="margin-top:20px;font-size:46px;color:#9A9590">人類牙膏</div></div><div class="x" id="x33" style="left:1560px;top:380px"></div>`,
  init() { K.hideLines('h33', 2); gsap.set(['#c330', '#c331', '#x33'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h33', 2, S.at(0), '大標「牙膏一定要寵物專用」');
    K.rise(S, '#c331', S.word('人的牙膏', 0, -.2), '右卡「人類牙膏」浮上（灰色）', { sfx: 'pop-card' });
    K.rise(S, '#c330', S.word('寵物專用牙膏', 0, -.2), '左卡「寵物專用牙膏」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c330', S.word('寵物專用牙膏'));
    S.to('#x33', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('人類的牙膏', 0, -.1), '右卡打紅叉');
    S.sfx(S.word('人類的牙膏', 0, -.1), 'shake', '打叉：喀喀');
  },
});

// ---------- 幕 34｜狗狗不會吐泡沫，會吞下去 ----------
K.scene('34', 2, {
  enter: 'push',
  visuals: ['大標「狗狗不會吐泡沫」／「會把牙膏吞下去」（橘）', '三列依序浮上：人「刷完會吐掉」、狗狗「沒辦法吐，會吞下去」、腸胃「某些成分可能造成腸胃不適」（加橘框）'],
  mount: () => K.h('h34', ['狗狗不會吐泡沫', '<b class="o">會把牙膏吞下去</b>'], { y: 160, size: 84 }) +
    K.bar('r340', { x: 140, y: 420, w: 1100, h: 130, ic: 'Person', t: '人：刷完會吐掉', ts: 40 }) +
    K.bar('r341', { x: 140, y: 575, w: 1100, h: 130, ic: 'Paw', t: '狗狗：沒辦法吐，會吞下去', ts: 40 }) +
    K.bar('r342', { x: 140, y: 730, w: 1100, h: 130, ic: 'Gut', t: '某些成分可能造成<span class="o">腸胃不適</span>', ts: 40 }) +
    K.d('brush', { id: 'dg34', x: 1380, y: 400, w: 380 }),
  init() { K.hideLines('h34', 2); gsap.set(['#r340', '#r341', '#r342', '#dg34'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h34', 2, S.word('不是設計給狗狗', 0, -.3), '大標「狗狗不會吐泡沫，會把牙膏吞下去」');
    K.dogIn(S, '#dg34', S.at(0) + .3, '右邊被刷牙的黑柴');
    K.rise(S, '#r340', S.word('像人一樣', 0, -.2), '第一列「人：刷完會吐掉」', { dx: -40, dy: 0 });
    K.rise(S, '#r341', S.word('吞下去', 1, -.3), '第二列「狗狗：沒辦法吐，會吞下去」', { dx: -40, dy: 0 });
    K.rise(S, '#r342', S.word('腸胃不適', 0, -.4), '第三列「某些成分可能造成腸胃不適」、加橘框', { dx: -40, dy: 0 });
    K.ring(S, '#r342', S.word('腸胃不適', 0, -.2));
  },
});

// ---------- 幕 35｜木糖醇對狗有毒 ----------
K.scene('35', 2, {
  enter: 'rise', bg: 'sky',
  visuals: ['淡藍底；小標「部分人類牙膏含有」，大標「木糖醇」／「對狗有毒」（橘）', '右邊大大的警告圖示磚', '念到時兩列依序浮上：嚴重低血糖、肝損傷'],
  mount: () => `<div class="eyebrow abs" id="k35" style="left:140px;top:200px;font-size:26px">部分人類牙膏含有</div>` +
    K.h('h35', ['木糖醇', '<b class="o">對狗有毒</b>'], { y: 250, size: 120 }) +
    K.bar('r350', { x: 140, y: 590, w: 860, h: 130, ic: 'Droplets', t: '嚴重低血糖', ts: 44 }) +
    K.bar('r351', { x: 140, y: 745, w: 860, h: 130, ic: 'Liver', t: '肝損傷', ts: 44 }) +
    K.tile('Warning', { id: 't35', x: 1240, y: 280, size: 440 }),
  init() { K.hideLines('h35', 2); gsap.set(['#r350', '#r351', '#k35'], { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#k35', S.at(0), '小標「部分人類牙膏含有」');
    K.lines(S, 'h35', 1, S.word('木糖醇', 0, -.2), '大標「木糖醇」');
    S.to('#h351', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('有毒', 0, -.3), '念到「有毒」：第二行「對狗有毒」');
    K.pop(S, '#t35', S.word('有毒', 0, -.3), '右邊大大的警告圖示磚', { sfx: 'thud' });
    K.rise(S, '#r350', S.word('低血糖', 0, -.3), '「嚴重低血糖」浮上', { dx: -40, dy: 0 });
    K.rise(S, '#r351', S.word('肝損傷', 0, -.3), '「肝損傷」浮上', { dx: -40, dy: 0 });
  },
});

// ---------- 幕 36｜天然、無糖、溫和、小蘇打也不行 ----------
const NO36 = [['標榜天然', '天然'], ['無糖', '無糖'], ['味道溫和', '溫和'], ['小蘇打', '小蘇打']];
K.scene('36', 2, {
  enter: 'push',
  visuals: ['大標「看到這些字」／「也不要給狗狗用」（橘）', '四個標籤念到時依序出現、被紅線劃掉：標榜天然、無糖、味道溫和、小蘇打', '下方「吞下去也可能造成腸胃問題」（腸胃圖示）'],
  mount: () => K.h('h36', ['看到這些字', '<b class="o">也不要給狗狗用</b>'], { y: 160, size: 84 }) +
    NO36.map(([t], k) => `<div class="pl" id="n36${k}" style="left:${140 + k * 420}px;top:470px;font-size:42px;padding:22px 40px"><span class="strike" id="s36${k}">${t}</span></div>`).join('') +
    K.bar('r36', { x: 140, y: 680, w: 1100, h: 130, ic: 'Gut', t: '吞下去也可能造成<span class="o">腸胃問題</span>', ts: 40 }),
  init() { K.hideLines('h36', 2); gsap.set(NO36.map((_, k) => '#n36' + k), { opacity: 0 }); gsap.set('#r36', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h36', 2, S.at(0), '大標「看到這些字，也不要給狗狗用」');
    NO36.forEach(([, w], k) => {
      const t = S.word(w, 0, -.2);
      K.pop(S, '#n36' + k, t, k ? '' : '念到時標籤依序出現、被紅線劃掉', { sfx: 'pop-card' });
      S.to('#s36' + k, { '--s': 1, duration: .3, ease: 'power2.out' }, t + .5);
      S.sfx(t + .5, 'marker', '劃掉：「唰」', { gain: .5 });
    });
    K.rise(S, '#r36', S.word('同樣可能', 0, -.2), '下方「吞下去也可能造成腸胃問題」', { dx: -40, dy: 0 });
  },
});

// ---------- 幕 37｜寵物牙膏怎麼挑（手機打勾清單） ----------
const CK37 = [['狗狗專用', '專門給狗狗'], ['看接受度＋獸醫建議', '接受程度'], ['雞肉、牛肉口味', '雞肉']];
K.scene('37', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；左邊大標「寵物牙膏」／「怎麼挑？」（橘），下方微笑的黑柴', '右邊手機清單「寵物牙膏怎麼挑」，念到時三項依序打勾：狗狗專用、看接受度＋獸醫建議、雞肉、牛肉口味'],
  mount: () => K.h('h37', ['寵物牙膏', '<b class="o">怎麼挑？</b>'], { y: 260, size: 110 }) + K.d('smile', { id: 'dg37', x: 420, y: 540, w: 215 }) +
    K.phone('ph37', `<div class="rows">${CK37.map(([t], k) => `<div class="row" id="r37${k}" style="justify-content:flex-start;gap:20px">${K.chk().replace('class="chk"', `class="chk" id="ck37${k}" style="margin:0"`)}<span class="what" style="font-size:32px">${t}</span></div>`).join('')}</div>`, { title: '寵物牙膏怎麼挑' }),
  init() { K.hideLines('h37', 2); gsap.set('#ph37', { y: 900 }); gsap.set('#dg37', { opacity: 0 }); gsap.set(CK37.map((_, k) => '#r37' + k), { opacity: .35 }); gsap.set(CK37.map((_, k) => '#ck37' + k), { scale: 0 }); },
  animate(S) {
    S.to('#ph37', { y: 0, duration: .8, ease: 'power3.out' }, S.start, '手機畫面跟著換幕滑上來');
    S.sfx(S.start, 'whoosh', '手機滑上來：「咻」', { gain: .6 });
    K.lines(S, 'h37', 2, S.at(0), '大標「寵物牙膏怎麼挑？」');
    K.dogIn(S, '#dg37', S.at(0) + .4, '微笑的黑柴');
    CK37.forEach(([, w], k) => {
      const t = S.word(w, 0, -.1);
      S.to('#r37' + k, { opacity: 1, duration: .25 }, t, k ? '' : '念到時清單依序亮起、打勾');
      S.to('#ck37' + k, { scale: 1, duration: .35, ease: 'back.out(2.5)' }, t + .1);
      S.sfx(t + .1, 'pop', '打勾：「啵」', { pitch: 1 + k * .1 });
    });
  },
});

// ---------- 幕 38｜VOHC 可以參考；最重要是適合的產品＋正確刷法 ----------
K.scene('38', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；兩個標籤：「VOHC 認證：可以參考」、「沒有認證 ≠ 一定無效」', '念到「最重要的是」：牙膏＋牙刷兩塊圖示磚，大字「適合的產品」（橘）＋「正確的刷牙方式」'],
  mount: () => K.pill('p380', `${K.ic('Seal')}VOHC 認證：可以參考`, 140, 220, 'ot', { fs: 36 }) + K.pill('p381', '沒有認證 <span class="o">≠</span> 一定無效', 780, 220, '', { fs: 36 }) +
    K.tile('Toothpaste', { id: 't380', x: 300, y: 420, size: 260 }) + `<div class="abs big" id="pl38" style="left:600px;top:470px;font-size:140px;color:var(--or)">＋</div>` + K.tile('Toothbrush', { id: 't381', x: 790, y: 420, size: 260 }) +
    `<div class="abs" id="tx38" style="left:1140px;top:430px;font-size:68px;font-weight:900;letter-spacing:-.04em;line-height:1.35"><span class="o">適合的產品</span><br>正確的刷牙方式</div>` +
    `<div class="abs" id="tg38" style="left:1140px;top:360px;font-size:30px;font-weight:700;color:#9A9590">最重要的是</div>`,
  init() { gsap.set(['#p380', '#p381', '#t380', '#t381', '#pl38', '#tx38', '#tg38'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#p380', S.word('VOHC', 0, -.2), '標籤「VOHC 認證：可以參考」', { sfx: 'pop-card' });
    K.pop(S, '#p381', S.word('沒有認證', 0, -.2), '標籤「沒有認證 ≠ 一定無效」', { sfx: 'pop-card' });
    const t = S.word('最重要', 0, -.2);
    K.fadeIn(S, '#tg38', t, '小字「最重要的是」');
    K.pop(S, '#t380', S.word('適合狗狗的產品', 0, -.2), '牙膏圖示磚');
    K.fadeIn(S, '#tx38', S.word('適合狗狗的產品', 0, -.1), '大字「適合的產品＋正確的刷牙方式」');
    K.pop(S, ['#pl38', '#t381'], S.word('正確的刷牙', 0, -.2), '＋牙刷圖示磚', { stagger: .1 });
    S.sfx(S.word('正確的刷牙', 0, .3), 'tick', '結論：「叮咚」');
  },
});

// ---------- 幕 39｜不讓刷牙：先不要硬來，拆成小步驟 ----------
K.scene('39', 2, {
  enter: 'push',
  visuals: ['大標「不讓刷牙？」／「先不要硬來」（橘）', '右邊不太開心的黑柴，念到時旁邊冒出三個標籤：躲起來、掙扎、緊張', '念到「拆成幾個小步驟」：下方出現四階小樓梯 1→2→3→4'],
  mount: () => K.h('h39', ['不讓刷牙？', '<b class="o">先不要硬來</b>'], { y: 200, size: 110 }) +
    K.dog('sick', { id: 'dg39', x: 1300, y: 230, w: 330 }) +
    [['躲起來', 1120, 260], ['掙扎', 1660, 330], ['緊張', 1140, 470]].map(([t, x, y], k) => K.pill('e39' + k, t, x, y, 'gh', { fs: 32 })).join('') +
    [0, 1, 2, 3].map(k => `<div class="cd" id="sp39${k}" style="left:${140 + k * 230}px;top:${820 - (k + 1) * 70}px;width:220px;height:${(k + 1) * 70}px;border-radius:18px;display:flex;align-items:flex-start;justify-content:center;padding-top:8px"><span class="big" style="font-size:52px;color:var(--or)">${k + 1}</span></div>`).join('') +
    `<div class="abs" id="lb39" style="left:1100px;top:720px;font-size:44px;font-weight:900">拆成<span class="o">幾個小步驟</span></div>`,
  init() { K.hideLines('h39', 2); gsap.set(['#e390', '#e391', '#e392', '#lb39'], { opacity: 0 }); gsap.set([0, 1, 2, 3].map(k => '#sp39' + k), { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h39', 1, S.at(0), '大標「不讓刷牙？」');
    S.to('#h391', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('硬來', 0, -.4), '念到「先不要硬來」：第二行');
    S.fromTo('#dg39', { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: .5 }, S.at(0) + .3, '右邊不太開心的黑柴');
    [['躲起來', 0], ['掙扎', 1], ['緊張', 2]].forEach(([w, k]) => K.pop(S, '#e39' + k, S.word(w, 0, -.1), k ? '' : '念到時冒出標籤：躲起來、掙扎、緊張', { sfx: 'pop-low' }));
    const t = S.word('小步驟', 0, -.6);
    S.to([0, 1, 2, 3].map(k => '#sp39' + k), { opacity: 1, y: 0, duration: .4, stagger: .15, ease: 'back.out(1.6)' }, t, '下方四階小樓梯 1→2→3→4 依序長出來');
    S.sfx(t, 'pop', '樓梯：連續「啵」', { gain: .6 });
    K.fadeIn(S, '#lb39', t + .3, '「拆成幾個小步驟」');
  },
});

// ---------- 幕 40｜真實畫面：循序漸進四小步 ----------
const ST40 = [
  { ic: 'Paw', t: '輕輕碰觸嘴巴', at: '碰觸嘴巴' }, { ic: 'Tooth', t: '掀起嘴唇、看看牙齒', at: '掀起嘴唇' },
  { ic: 'Toothbrush', t: '聞牙刷、碰幾顆牙', at: '聞一聞' }, { ic: 'Clock', t: '慢慢增加範圍和時間', at: '增加' },
];
K.scene('40', 2, {
  enter: 'slide',
  visuals: ['右邊直式影片框（真實畫面：練習刷牙的小步驟）', ...ST40.map((p, k) => `左邊字卡 ${k + 1}：「${p.t}」，念到時滑入、加橘框`)],
  mount: S => S.footage() + ST40.map((p, k) => K.bar('f40' + k, { x: 140, y: 150 + k * 190, w: 1020, h: 160, n: k + 1, ic: p.ic, t: p.t, ts: 40 })).join(''),
  init() { gsap.set(ST40.map((_, k) => '#f40' + k), { opacity: 0 }); },
  animate(S) {
    ST40.forEach((p, k) => {
      const t = S.word(p.at, 0, -.2);
      if (k) K.ring(S, '#f40' + (k - 1), t, false);
      K.rise(S, '#f40' + k, t, `字卡 ${k + 1}「${p.t}」滑入、加橘框`, { dx: -40, dy: 0 });
      K.ring(S, '#f40' + k, t + .2);
    });
  },
});

// ---------- 幕 41｜每次不用久；痛就先看獸醫 ----------
K.scene('41', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['淡綠底；兩張大卡', '左「每次練習不用很久」（時鐘）＋「讓狗狗有時間適應」', '右「疼痛、紅腫、流血」（牙齦紅腫）＋橘字「不要勉強，先看獸醫」，加橘框'],
  mount: () => K.vcard('c410', { x: 200, y: 230, w: 700, h: 520, ic: 'Clock', is: 200, t: '每次練習不用很久', d: '讓狗狗有時間適應', ts: 46, ds: 30 }) +
    K.vcard('c411', { x: 1020, y: 230, w: 700, h: 520, ic: 'Gum', is: 200, t: '疼痛、紅腫、流血', d: '<b class="o">不要勉強，先看獸醫</b>', ts: 46, ds: 34 }),
  init() { gsap.set(['#c410', '#c411'], { opacity: 0 }); },
  animate(S) {
    K.rise(S, '#c410', S.at(0), '左卡「每次練習不用很久」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c411', S.word('明顯疼痛', 0, -.3), '右卡「疼痛、紅腫、流血」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c411', S.word('明顯疼痛'));
    S.sfx(S.word('看獸醫', 0, -.2), 'tick', '先看獸醫：「叮咚」');
  },
});

// ---------- 幕 42｜VCA 參考；還是不願意 → 輔助產品 ----------
const AID42 = ['DentalBone', 'Water', 'Powder', 'Wipe'];
K.scene('42', 2, {
  enter: 'push', bg: 'sky',
  visuals: ['淡藍底；左上灰色小字「練習方式參考：VCA 動物醫院衛教資料」', '大標「還是不願意配合？」／「來看看輔助產品」（橘）', '念到「輔助產品」：四塊圖示磚依序彈出：潔牙骨、潔牙水、潔牙粉、潔牙濕紙巾；啃潔牙骨的黑柴'],
  mount: () => `<div class="note" id="nt42" style="left:140px;top:150px;font-size:26px">練習方式參考：VCA 動物醫院衛教資料</div>` +
    K.h('h42', ['還是不願意配合？', '<b class="o">來看看輔助產品</b>'], { y: 230, size: 92 }) +
    AID42.map((ic, k) => K.tile(ic, { id: 't42' + k, x: 140 + k * 230, y: 600, size: 190 })).join('') +
    K.d('chew', { id: 'dg42', x: 1250, y: 430, w: 400 }),
  init() { K.hideLines('h42', 2); gsap.set(['#nt42', '#dg42'], { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#nt42', S.word('VCA', 0, -.2), '灰色小字「練習方式參考：VCA 動物醫院衛教資料」');
    K.lines(S, 'h42', 1, S.word('嘗試過', 0, -.3), '大標第一行「還是不願意配合？」');
    S.to('#h421', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('輔助產品', 0, -.6), '第二行「來看看輔助產品」');
    K.pop(S, AID42.map((_, k) => '#t42' + k), S.word('輔助產品', 0, -.3), '四塊圖示磚依序彈出：潔牙骨、潔牙水、潔牙粉、潔牙濕紙巾', { stagger: .12 });
    K.dogIn(S, '#dg42', S.word('輔助產品', 0, .2), '啃潔牙骨的黑柴');
  },
});
