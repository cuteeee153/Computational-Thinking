// 幕 63–69｜長大後：每年？還是三年？台灣常見做法 vs 國際指引；保護期不一樣；綁在同一針；直接問獸醫；狂犬病每年都要打。
K.scene('63', 4, {
  enter: 'zoom', bg: 'mint',
  visuals: ['大標「長大以後」；左右兩張大卡：「每年一次？」（月曆）、「三年一次？」（時鐘），中間歪頭的黑柴＋問號', '左卡小字「動物醫院常說」，右卡小字「國際指引說」'],
  mount: () => K.h('h63', ['長大以後，多久補打一次？'], { y: 150, size: 64 }) +
    `<div class="cd" id="c630" style="left:140px;top:300px;width:640px;height:560px;padding:50px"><div class="ic" style="width:150px;height:150px">${K.ic('Calendar')}</div><div class="t" style="font-size:72px;margin-top:20px"><span class="big" style="font-size:110px">1</span> 年一次？</div><div class="d" id="d630">動物醫院常說</div></div>` +
    `<div class="cd" id="c631" style="left:1140px;top:300px;width:640px;height:560px;padding:50px"><div class="ic" style="width:150px;height:150px">${K.ic('Clock')}</div><div class="t" style="font-size:72px;margin-top:20px"><span class="big" style="font-size:110px">3</span> 年一次？</div><div class="d" id="d631">國際指引說</div></div>` +
    K.dog('tilt', { id: 'dg63', x: 820, y: 480, w: 280 }) + `<div class="big abs" id="q63" style="left:900px;top:280px;font-size:170px;color:var(--or)">?</div>`,
  init() { K.hideLines('h63', 1); gsap.set(['#d630', '#d631'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h63', 1, S.at(0), '大標「長大以後，多久補打一次？」');
    K.pop(S, '#c630', S.word('每年打一次'), '左卡「1 年一次？」', { sfx: 'pop-card' });
    K.pop(S, '#c631', S.word('三年打一次'), '右卡「3 年一次？」', { sfx: 'pop-card', pitch: 1.1 });
    S.fromTo('#dg63', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.word('困惑'), '中間歪頭的黑柴');
    K.pop(S, '#q63', S.word('困惑', 0, .2), '橘色問號', { sfx: 'boing' });
    S.to('#d630', { opacity: 1, duration: .3 }, S.word('動物醫院說'));
    S.to('#d631', { opacity: 1, duration: .3 }, S.word('國際指引說'));
  },
});
K.scene('64', 4, {
  enter: 'none',
  visuals: ['（接續）左卡加橘框，寫上「台灣常見做法」：橘色「每年追加綜合疫苗」、藍色「每年打狂犬病疫苗」兩個標籤排在同一行'],
  mount: () => [{ into: '#c630', html: `<div id="d64" style="margin-top:20px;display:flex;gap:12px;align-items:center"><span class="pl ot" style="position:static;font-size:24px;padding:12px 20px">每年追加綜合疫苗</span><span class="pl bt" style="position:static;font-size:24px;padding:12px 20px">每年打狂犬病疫苗</span></div>` }],
  animate(S) {
    S.to(['#q63'], { opacity: 0, duration: .3 }, S.at(0));
    K.ring(S, '#c630', S.word('台灣常見'));
    S.sfx(S.word('台灣常見'), 'tick-soft', '左卡亮起：輕點');
    S.to('#d630', { color: '#16130F', duration: .3 }, S.word('台灣常見'), '左卡加橘框：台灣常見做法');
    K.rise(S, '#d64', S.word('每年追加'), '「每年追加綜合疫苗」「每年打狂犬病疫苗」', { dy: 16 });
  },
});
K.scene('65', 4, {
  enter: 'none',
  visuals: ['（接續）右卡加藍框：橘色「三種核心疫苗」、藍色「可每 3 年補強一次」兩個標籤排在同一行'],
  mount: () => [{ into: '#c631', html: `<div id="d65" style="margin-top:20px;display:flex;gap:12px;align-items:center"><span class="pl ot" style="position:static;font-size:26px;padding:12px 22px">三種核心疫苗</span><span class="pl b" style="position:static;font-size:26px;padding:12px 22px">可每 3 年補強一次</span></div>` }],
  animate(S) {
    K.ring(S, '#c630', S.word('國際指引'), false);
    S.to('#c631', { boxShadow: '0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)', duration: .35 }, S.word('國際指引'), '右卡加藍框：國際指引建議');
    S.sfx(S.word('國際指引'), 'tick-soft', '右卡亮起：輕點');
    S.to('#d631', { color: '#16130F', duration: .3 }, S.word('國際指引'));
    K.rise(S, '#d65', S.word('三種核心疫苗'), '「三種核心疫苗」「可每 3 年補強一次」', { dy: 16 });
  },
});
K.scene('66', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['大標「為什麼不一樣？」／「保護期不一樣」（橘）', '時間軸 1、2、3 年；兩條長條：核心疫苗（國際指引）長到 3 年「每 3 年補強」（橘）；鉤端螺旋體疫苗只到 1 年「每年補強」（藍）；字放在長條裡面、最上層（白字）'],
  mount: () => K.h('h66', ['為什麼不一樣？', '<b class="o">保護期不一樣</b>'], { y: 150, size: 72 }) +
    `<div class="cd" id="c66" style="left:140px;top:380px;width:1640px;height:330px;padding:40px 50px">
      <div style="position:relative;margin-left:340px;height:30px;font:800 26px 'Bricolage Grotesque';color:#9A9590">${[1, 2, 3].map(k => `<span class="abs" style="left:${k * 380 - 40}px">${k} 年</span>`).join('')}</div>
      ${[['核心疫苗', '#F97316', '每 3 年補強', 3], ['鉤端螺旋體疫苗', '#2E6BD8', '每年補強', 1]].map(([t, c, l, n], k) => `<div style="display:flex;align-items:center;margin-top:${k ? 30 : 20}px"><div style="width:340px;font-size:32px;font-weight:900">${t}</div><div class="bar" style="position:relative;width:1180px"><i id="br66${k}" style="width:${n * 380}px;background:${c}"></i><span id="bl66${k}" style="position:absolute;z-index:2;right:${1180 - n * 380 + 24}px;top:10px;font-size:26px;font-weight:900;color:#fff;white-space:nowrap">${l}</span></div></div>`).join('')}</div>`,
  init() { K.hideLines('h66', 2); gsap.set(['#br660', '#br661'], { scaleX: 0 }); gsap.set(['#bl660', '#bl661'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h66', 2, S.at(0), '大標「為什麼不一樣？／保護期不一樣」', 1.2);
    K.rise(S, '#c66', S.word('保護期'), '長條圖卡浮上', { sfx: 'pop-card' });
    S.to('#br660', { scaleX: 1, duration: 1.2, ease: 'power2.out' }, S.word('保護期', 0, .3), '核心疫苗長條長到 3 年');
    S.to('#bl660', { opacity: 1, duration: .3 }, S.word('保護期', 0, 1.3));
    S.to('#br661', { scaleX: 1, duration: .6, ease: 'power2.out' }, S.word('鉤端螺旋體'), '鉤端螺旋體長條只到 1 年');
    S.to('#bl661', { opacity: 1, duration: .3 }, S.word('每年補強', 0, -.2));
    S.sfx(S.word('每年補強'), 'ding-soft', '每年補強：輕「叮」');
  },
});
K.scene('67', 4, {
  enter: 'none',
  visuals: ['（接續）下方：一支綜合疫苗（七合一以上）裡面裝著核心疫苗＋鉤端螺旋體 → 每年打這一針 → 核心疫苗也跟著每年打', '兩個灰色小標籤：不代表七合一以上組成都一樣、不代表每隻狗都要每年打同一組'],
  mount: () => `<div class="cd" id="c67" style="left:140px;top:740px;width:1640px;height:130px;padding:0 40px;display:flex;align-items:center;gap:20px;font-size:30px;font-weight:900;white-space:nowrap">
      <span style="width:90px;height:90px;flex:none">${K.ic('Syringe')}</span><span>七合一以上</span><span class="pl ot" style="position:static;font-size:24px;padding:8px 16px">核心疫苗</span>＋<span class="pl bt" style="position:static;font-size:24px;padding:8px 16px">鉤端螺旋體</span>
      <span style="color:#A29D97">→ 每年打</span><span class="o" id="o67">→ 核心疫苗也跟著每年打</span></div>` +
    `<div class="abs" id="r67" style="left:140px;top:900px;display:flex;gap:16px"><span class="pl gh" style="position:static;font-size:24px;padding:8px 18px">不代表七合一以上組成都一樣</span><span class="pl gh" style="position:static;font-size:24px;padding:8px 18px">不代表每隻狗都要每年打同一組</span></div>`,
  init() { gsap.set('#o67', { opacity: 0 }); },
  animate(S) {
    K.rise(S, '#c67', S.word('七合一'), '下方：七合一以上＝核心疫苗＋鉤端螺旋體', { sfx: 'pop-card' });
    S.to('#o67', { opacity: 1, duration: .4 }, S.word('也可能跟著'), '「→ 核心疫苗也跟著每年打」');
    S.sfx(S.word('也可能跟著'), 'tick', '跟著每年打：「叮咚」');
    K.rise(S, '#r67', S.word('不過'), '兩個灰色標籤：不代表組成都一樣、不代表每隻都要每年打同一組', { dy: 16 });
  },
});
K.scene('68', 4, {
  enter: 'rise', bg: 'mint',
  visuals: ['左邊大標「你可以直接問獸醫」，歪頭的黑柴', '右邊手機「看診前想問的事」：輸入框打出問題，送出後變成藍色泡泡——「我家狗狗需要每年補打鉤端螺旋體疫苗嗎？」「如果需要，核心疫苗有沒有可能改成三年補強一次？」', '左下（大字）：「了解每一種疫苗的用途」「和獸醫一起討論適合的安排」'],
  mount: () => K.h('h68', ['你可以', '<b class="o">直接問獸醫</b>'], { y: 220, size: 96 }) + K.dog('tilt', { id: 'dg68', x: 820, y: 470, w: 250 }) +
    `<div class="pl ot" id="p68" style="left:140px;top:540px;font-size:42px;padding:20px 36px">了解每一種疫苗的用途</div><div class="pl ot" id="p681" style="left:140px;top:670px;font-size:42px;padding:20px 36px">和獸醫一起討論適合的安排</div>` +
    K.phone('ph68', `<div style="position:absolute;left:0;right:0;top:210px;display:flex;justify-content:center;gap:18px"><span class="chip"><i style="width:40px;height:40px;display:inline-block">${K.ic('Syringe')}</i>疫苗</span><span class="chip"><i style="width:40px;height:40px;display:inline-block">${K.ic('Calendar')}</i>補強時間</span></div>
      <div style="position:absolute;left:34px;right:34px;top:400px;display:flex;flex-direction:column;gap:22px"><div class="qb" id="qb680">我家狗狗需要每年補打鉤端螺旋體疫苗嗎？</div><div class="qb" id="qb681">如果需要，核心疫苗有沒有可能改成三年補強一次？</div></div>
      <div class="qin" style="bottom:130px"><span id="ty68" data-text="核心疫苗可以三年補強一次嗎？"></span><span class="go"><svg width="30" height="30" viewBox="0 0 24 24"><path d="M12 19 V5 M6 11 L12 5 L18 11" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>`, { title: '看診前想問的事' }),
  init() { K.hideLines('h68', 2); gsap.set('#ph68', { y: 500 }); gsap.set(['#qb680', '#qb681'], { opacity: 0, y: 30 }); },
  animate(S) {
    K.lines(S, 'h68', 2, S.at(0), '大標「你可以直接問獸醫」');
    S.to('#ph68', { y: 0, duration: .8, ease: 'power3.out' }, S.start + .1, '右邊手機跟著換幕直接滑上來');
    S.sfx(S.start + .1, 'whoosh', '手機：「咻」');
    S.fromTo('#dg68', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.at(0) + .4);
    S.to('#qb680', { opacity: 1, y: 0, duration: .4, ease: 'back.out(1.6)' }, S.word('我家狗狗'), '第一個問題泡泡送出');
    S.sfx(S.word('我家狗狗'), 'pop', '送出：「啵」');
    K.type(S, '#ty68', S.word('如果需要', 0, -.2), '輸入框打字');
    S.to('#qb681', { opacity: 1, y: 0, duration: .4, ease: 'back.out(1.6)' }, S.word('三年補強'), '第二個問題泡泡送出');
    S.sfx(S.word('三年補強'), 'pop', '送出：「啵」', { pitch: 1.1 });
    S.to('#ty68', { opacity: 0, duration: .2 }, S.word('三年補強'));
    K.rise(S, '#p68', S.word('用途'), '「了解每一種疫苗的用途」', { dy: 16 });
    K.rise(S, '#p681', S.word('一起討論'), '「和獸醫一起討論適合的安排」', { dy: 16 });
  },
});
K.scene('69', 4, {
  enter: 'zoom',
  visuals: ['左邊小卡：「每 3 年補強」只講部分核心疫苗，不能套用到所有疫苗（灰、打叉）', '右邊大印章（藍）：「狂犬病｜台灣法律規定，每年接種」，旁邊黑柴和貓'],
  mount: () => K.kicker('k69', 'NOTE', '最後要特別強調', { y: 200 }) +
    `<div class="cd" id="c69" style="left:140px;top:300px;width:760px;height:420px;padding:44px"><div class="k" style="color:#9A9590">國際的補強建議</div><div class="t" style="margin-top:14px">每 3 年補強<br><span style="font-size:32px;color:#7C7772">只講部分核心疫苗</span></div><div class="pl gh" id="p69" style="position:static;margin-top:30px;font-size:28px">不能套用到所有疫苗</div></div>` +
    `<div class="cd" id="c691" style="left:980px;top:300px;width:800px;height:420px;padding:44px;box-shadow:0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)"><div class="ic" style="width:130px;height:130px">${K.ic('Gavel')}</div><div class="t" style="font-size:64px;margin-top:10px">狂犬病</div><div class="t bl" style="font-size:40px">台灣法律規定，每年接種</div></div>` +
    `<div class="stamp b" id="sp69" style="left:1330px;top:760px">每年都要打</div>` + K.dog('sit', { id: 'dg69', x: 1000, y: 740, w: 170, shadow: false }) + K.tile('Cat', { id: 't69', x: 1180, y: 800, size: 120 }),
  animate(S) {
    S.fromTo('#k69', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.rise(S, '#c69', S.word('國際補強'), '左卡：每 3 年補強只講部分核心疫苗', { sfx: 'pop-card' });
    K.pop(S, '#p69', S.word('不能直接套用'), '「不能套用到所有疫苗」', { sfx: 'pop-low' });
    K.rise(S, '#c691', S.word('而狂犬病'), '右卡藍框「狂犬病｜台灣法律規定，每年接種」', { sfx: 'pop-card' });
    K.pop(S, ['#dg69', '#t69'], S.word('狗狗和貓咪'), '黑柴和貓', { stagger: .15, sfx: 'pop' });
    K.stamp(S, '#sp69', S.word('每年接種'), '藍色印章「每年都要打」（擺正）', { straight: true });
  },
});
K.scene('70', 4, {
  enter: 'push', bg: 'sky',
  visuals: ['大標「打疫苗前後，」／「主動告訴獸醫」（橘）', '左邊圓角框播放實拍（橫拍）：飼主抱著柴犬，醫師打針、打完摸摸頭（醫師和護理師的臉已模糊），左上角小標籤「實拍｜打疫苗那天」', '右邊三張字卡（念到時依序滑入、加橘框）：01 以前打完不舒服 → 提前說明；02 生病、懷孕、吃藥 → 讓獸醫評估接種時機；03 打完有異常 → 盡快聯絡獸醫，下次看診也要說'],
  mount: S => K.h('h70', ['打疫苗前後，', '<b class="o">主動告訴獸醫</b>'], { y: 130, size: 64 }) + S.footage() +
    `<div class="pl" id="lb70" style="left:170px;top:350px;font-size:24px;padding:10px 20px;z-index:3">實拍｜打疫苗那天</div>` +
    [['以前打完不舒服', '一定要<b>提前說明</b>'], ['正在生病、懷孕、吃藥', '讓獸醫<b>評估接種時機</b>'], ['打完出現任何異常', '<b>盡快聯絡獸醫</b><br>下次看診也要說']].map(([t, d], k) =>
      `<div class="pt card" id="pt70${k}" style="left:1230px;top:${330 + k * 200}px;width:550px;min-height:175px;padding:26px 30px"><div class="nb">0${k + 1}</div><div><div class="tt" style="font-size:34px">${t}</div><div class="dl" style="font-size:26px;white-space:normal">${d}</div></div></div>`).join(''),
  init() { K.hideLines('h70', 2); gsap.set('.pt', { opacity: 0, x: 40 }); gsap.set('#lb70', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h70', 2, S.at(0), '大標「打疫苗前後，主動告訴獸醫」');
    S.fromTo('#vf-70', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .7, ease: 'power3.out' }, S.start + .2, '實拍框跟著換幕浮上來，開始播放');
    S.to('#lb70', { opacity: 1, duration: .4 }, S.start + .7);
    [['第一', 0], ['第二', 1], ['第三', 2]].forEach(([w, k]) => {
      const t = S.word(w, 0, -.15);
      if (k) K.ring(S, '#pt70' + (k - 1), t, false);
      S.to('#pt70' + k, { opacity: 1, x: 0, boxShadow: K.RING, duration: .6, ease: 'power3.out' }, t, `字卡 0${k + 1} 由右滑入、加橘框`);
      S.sfx(t, 'slide', `字卡 0${k + 1}：輕「咻」`);
    });
  },
});
