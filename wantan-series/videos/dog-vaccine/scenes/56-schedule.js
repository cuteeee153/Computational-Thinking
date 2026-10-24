// 幕 56–62｜第四步：什麼時候打？媽媽給的抗體會干擾疫苗 → 所以要連打好幾劑；幼犬時間表（手機）；和國際指引相近；打完之前能出門嗎？
K.scene('56', 4, {
  enter: 'iris', irisAt: [1400, 600], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 04」', '大標「什麼時候打？」／「長大後多久打一次？」（灰）', '右邊：小黑柴 → 箭頭「從小到大」→ 大黑柴', '兩個問題標籤：到底要打幾次？多久補打一次？'],
  mount: () => K.kicker('k56', 'STEP 04', '第四步', { y: 230 }) + K.h('h56', ['什麼時候打？', '~長大後多久打一次？'], { y: 280, size: 84 }) +
    `<div class="abs" id="r56" style="left:140px;top:560px;display:flex;flex-direction:column;gap:18px;align-items:flex-start"><span class="pl" style="position:static" id="q560">${K.ic('Chat')}到底要打幾次？</span><span class="pl" style="position:static" id="q561">${K.ic('Chat')}多久補打一次？</span></div>` +
    K.dog('sit', { id: 'dg560', x: 1100, y: 620, w: 170 }) + K.arrow('w56', { x: 1290, y: 640, w: 200, h: 120, d: 'M10 90 C 60 20, 130 20, 185 70' }) + `<div class="note" id="n56" style="left:1330px;top:770px;font-weight:700;color:var(--blue);font-size:26px">從小到大</div>` +
    K.dog('stand-side', { id: 'dg561', x: 1480, y: 520, w: 320, flip: true }),
  init() { K.hideLines('h56', 2); gsap.set(['#dg560', '#dg561', '#n56'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k56', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    S.sfx(S.at(0), 'chime', '新章節：叮鈴');
    K.lines(S, 'h56', 2, S.at(0) + .2, '大標兩行冒出', 1);
    S.to('#dg560', { opacity: 1, duration: .4 }, S.word('從小到大'), '小黑柴 → 「從小到大」→ 大黑柴');
    K.draw(S, '#w56', S.word('從小到大', 0, .2), '');
    S.to(['#dg561', '#n56'], { opacity: 1, duration: .4 }, S.word('從小到大', 0, .6));
    K.rise(S, '#q560', S.word('打幾次'), '問題標籤「到底要打幾次？」', { dx: -30, dy: 0, sfx: 'pop' });
    K.rise(S, '#q561', S.word('多久補打'), '問題標籤「多久補打一次？」', { dx: -30, dy: 0, sfx: 'pop' });
  },
});
K.scene('57', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['大標「小狗為什麼要連打好幾劑？」', '左邊趴著的狗媽媽＋奶瓶圖示（初乳）；初乳先飛向小狗，變成三個抗體圍繞在小狗周圍，小狗正上方藍字「媽媽給的抗體」', '念到「干擾疫苗」：針筒才從右邊飛進來，針頭對準小狗的背，被抗體擋住、打叉，橘色字「可能干擾疫苗的效果」'],
  mount: () => K.h('h57', ['小狗為什麼要', '~連打好幾劑？'], { y: 170, size: 76 }) +
    K.dog('rest', { id: 'dg570', x: 120, y: 520, w: 460 }) + K.tile('Milk', { id: 't57', x: 520, y: 400, size: 150, rot: 6 }) +
    K.dog('sit', { id: 'dg571', x: 1030, y: 520, w: 220 }) +
    [[930, 600, -20], [1260, 560, 18], [1230, 780, 30]].map(([x, y, r], k) => `<div class="ico" id="ab57${k}" style="left:${x}px;top:${y}px;width:100px;height:100px;transform:rotate(${r}deg)">${K.ic('Antibody')}</div>`).join('') +
    K.anno('a57', '', '媽媽給的抗體', { x: 1030, y: 450, ss: 36 }) +
    `<div class="ico" id="sy57" style="left:1760px;top:380px;width:170px;height:170px">${K.ic('Syringe')}</div><div class="x" id="x57" style="left:1380px;top:560px"></div>` +
    `<div class="sub" id="s57" style="left:1050px;top:300px;font-size:44px;font-weight:900;width:760px"><b>可能干擾疫苗的效果</b></div>`,
  init() { K.hideLines('h57', 2); gsap.set(['#ab570', '#ab571', '#ab572', '#a57', '#x57', '#sy57'], { opacity: 0 }); gsap.set('#sy57', { rotate: 75 }); },
  animate(S) {
    K.lines(S, 'h57', 2, S.at(0), '大標「小狗為什麼要連打好幾劑？」');
    S.fromTo('#dg570', { opacity: 0, x: -60 }, { opacity: 1, x: 0, duration: .6 }, S.word('剛出生'), '狗媽媽和小狗出現');
    S.fromTo('#dg571', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .6 }, S.word('剛出生', 0, .2));
    K.pop(S, '#t57', S.word('初乳'), '奶瓶圖示（初乳）', { sfx: 'pop-card' });
    const ta = S.word('抗體');
    S.to('#t57', { left: 1080, top: 600, scale: .5, rotate: 0, duration: .9, ease: 'power2.inOut' }, ta - .3, '初乳先飛向小狗');
    S.sfx(ta - .3, 'whoosh', '初乳飛過去：「咻」', { gain: .5 });
    S.to('#t57', { opacity: 0, scale: .2, duration: .3 }, ta + .6);
    K.pop(S, ['#ab570', '#ab571', '#ab572'], ta + .6, '變成三個抗體，圍繞在小狗周圍', { stagger: .15 });
    S.to('#a57', { opacity: 1, duration: .3 }, ta + 1.1, '小狗正上方藍字「媽媽給的抗體」');
    S.to('#sy57', { opacity: 1, left: 1400, top: 420, duration: .7, ease: 'power2.in' }, S.word('干擾', 0, -.6), '針筒才飛進來，針頭對準小狗的背');
    S.to('#sy57', { left: 1560, top: 340, rotate: 95, duration: .4, ease: 'power2.out' }, S.word('干擾', 0, .1), '被抗體擋住、打叉');
    S.to('#x57', { opacity: 1, duration: .2 }, S.word('干擾', 0, .1));
    S.sfx(S.word('干擾', 0, .1), 'shake', '擋住：喀喀');
    K.rise(S, '#s57', S.word('干擾'), '橘色字「可能干擾疫苗的效果」');
  },
});
K.scene('58', 4, {
  enter: 'push',
  visuals: ['折線圖卡：三條線（小狗 A、B、C）代表媽媽給的抗體，往下掉的速度都不一樣，圖中右上的空白處標註「每隻消失的時間不一樣」', '下方依序出現第 1、2、3 劑三個針筒；最後一劑旁打勾「至少有一劑能成功」', '左邊說明：獸醫沒辦法只靠年齡判斷哪天打一定有效 → 所以要連打好幾劑（橘，大字）'],
  mount: () => `<div class="abs" id="t58" style="left:140px;top:170px;width:620px"><div class="sub" style="position:static;font-size:34px">獸醫沒辦法只靠年齡<br>判斷哪一天打一定有效</div><div class="h" style="font-size:80px;margin-top:30px">所以要<br><b class="o" style="font-size:112px">連打好幾劑</b></div></div>` +
    `<div class="cd" id="c58" style="left:820px;top:170px;width:960px;height:700px;padding:40px"><div class="k">示意｜媽媽給的抗體</div>
      <svg width="880" height="520" style="overflow:visible;margin-top:10px"><path d="M40 20 V470 H860" fill="none" stroke="#D9D5D0" stroke-width="4"/>
      ${[['M40 60 C 200 70, 260 360, 420 450', '#9A9590'], ['M40 90 C 300 90, 380 380, 600 455', '#7DA3E0'], ['M40 120 C 380 110, 520 400, 800 460', '#F3A46B']].map(([d, c], k) => `<path id="cv58${k}" pathLength="1" d="${d}" fill="none" stroke="${c}" stroke-width="9" stroke-linecap="round"/>`).join('')}
      </svg><div class="abs" style="left:60px;top:570px;font-size:24px;color:#9A9590;font-weight:700">小狗年齡 →</div>
      ${[['A', 470, 470], ['B', 640, 470], ['C', 830, 470]].map(([n, x, y], k) => `<div class="abs" id="lb58${k}" style="left:${x}px;top:${y}px;font:800 30px 'Bricolage Grotesque';color:${['#9A9590', '#7DA3E0', '#F3A46B'][k]}">${n}</div>`).join('')}
      ${[300, 520, 740].map((x, k) => `<div class="abs" id="dz58${k}" style="left:${x}px;top:590px;text-align:center;width:120px"><div style="width:80px;height:80px;margin:0 auto">${K.ic('Syringe')}</div><div style="font-size:22px;font-weight:900">第 ${k + 1} 劑</div></div>`).join('')}
    </div>` + K.anno('a58', '', '每隻消失的時間<br>不一樣', { x: 1400, y: 300, ss: 36 }) +
    `<div class="pl o" id="p58" style="left:1350px;top:900px;font-size:30px">至少有一劑能成功</div>`,
  init() { gsap.set(['#cv580', '#cv581', '#cv582'], { strokeDasharray: 1, strokeDashoffset: 1 }); gsap.set(['#lb580', '#lb581', '#lb582', '#a58', '#t58'], { opacity: 0 }); },
  animate(S) {
    K.rise(S, '#c58', S.at(0), '折線圖卡浮上', { sfx: 'pop-card' });
    [0, 1, 2].forEach(k => { S.to('#cv58' + k, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, S.word('抗體消失') + k * .3, k ? '' : '三條線往下掉，速度都不一樣'); S.to('#lb58' + k, { opacity: 1, duration: .3 }, S.word('抗體消失') + k * .3 + 1); });
    S.sfx(S.word('抗體消失'), 'draw', '畫線：筆刷聲', { dur: 1.6, gain: .5 });
    S.to('#a58', { opacity: 1, duration: .3 }, S.word('也不一樣'), '藍色標註「每隻消失的時間不一樣」');
    S.to('#t58', { opacity: 1, duration: .5 }, S.word('獸醫沒辦法'), '左邊說明出現');
    [0, 1, 2].forEach(k => K.pop(S, '#dz58' + k, S.word('分次接種', 0, k * .3), k ? '' : '下方依序出現第 1、2、3 劑', { sfx: 'pop-card', pitch: 1 + k * .1 }));
    K.pop(S, '#p58', S.word('至少有一劑'), '「至少有一劑能成功」', { sfx: 'tick' });
  },
});
K.scene('60', 4, {
  enter: 'rise', bg: 'sky',
  visuals: ['左邊大標「幼犬疫苗時間表」，小字「台灣常見的安排」；坐著的黑柴', '右邊手機「疫苗手冊」：念到時一列列出現——約 2 個月：第 1 劑綜合疫苗；約 3 個月：第 2 劑＋開始打狂犬病（依法）；約 4 個月：第 3 劑（部分資料建議狂犬病這時一起打）；完成後：依獸醫安排補強', '「台灣常見的安排」底下：標籤「完成三劑後再帶出門（部分動物醫院建議）」'],
  mount: () => K.h('h60', ['幼犬疫苗時間表'], { y: 200, size: 80 }) + `<div class="note" id="n60" style="left:140px;top:320px;font-size:30px;font-weight:700">台灣常見的安排（資料整理）</div>` +
    K.dog('sit', { id: 'dg60', x: 760, y: 600, w: 240 }) +
    K.phone('ph60', `<div class="rows" style="top:220px">${[['約 2 個月', '第 1 劑綜合疫苗', ''], ['約 3 個月', '第 2 劑綜合疫苗', '＋開始打狂犬病（依法）'], ['約 4 個月', '第 3 劑綜合疫苗', '部分資料：狂犬病這時一起打'], ['完成後', '依獸醫安排補強', '']].map(([a, b, c], k) => `<div class="row" id="rw60${k}"><span class="when">${a}</span><span class="what">${b}${c ? `<small>${c}</small>` : ''}</span>${k < 3 ? K.chk() : K.chk(true)}</div>`).join('')}</div>`, { title: '幼犬疫苗時間表' }) +
    `<div class="pl ot" id="p60" style="left:140px;top:390px;font-size:28px">完成三劑後再帶出門（部分動物醫院建議）</div>`,
  init() { K.hideLines('h60', 1); gsap.set('#ph60', { y: 500 }); },
  animate(S) {
    K.lines(S, 'h60', 1, S.at(0), '大標「幼犬疫苗時間表」');
    K.fadeIn(S, '#n60', S.at(0) + .3);
    S.to('#ph60', { y: 0, duration: .8, ease: 'power3.out' }, S.start + .1, '右邊手機跟著換幕直接滑上來');
    S.sfx(S.start + .1, 'whoosh', '手機滑上來：「咻」');
    S.fromTo('#dg60', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.at(0) + .4);
    [['兩個月', 0], ['三個月', 1], ['四個月', 2], ['完成幼犬階段', 3]].forEach(([w, k]) => {
      K.rise(S, '#rw60' + k, S.word(w, 0, -.2), k ? '' : '念到時時間表一列列出現、加橘框', { dy: 24, sfx: 'pop-card' });
      S.to('#rw60' + k, { boxShadow: '0 0 0 4px #F97316,0 10px 24px -16px rgba(30,40,80,.35)', duration: .3 }, S.word(w));
      if (k) S.to('#rw60' + (k - 1), { boxShadow: '0 0 0 0px #F97316,0 10px 24px -16px rgba(30,40,80,.35)', duration: .3 }, S.word(w));
    });
    K.rise(S, '#p60', S.word('完成三劑'), '標籤「完成三劑後再帶出門」');
  },
});
K.scene('61', 4, {
  enter: 'none',
  visuals: ['（接續）左邊浮上一張卡：「台灣：2、3、4 個月各一劑」≈「國際指引方向」（≈ 橘色）', '小字「實際次數和時間，看狗狗狀況和獸醫規劃」'],
  mount: () => `<div class="cd" id="c61" style="left:140px;top:420px;width:960px;height:340px;padding:44px;z-index:5"><div class="k">和國際指引比一比</div>
    <div style="display:flex;align-items:center;gap:26px;margin-top:24px;font-size:36px;font-weight:900;white-space:nowrap"><span class="pl ot" style="position:static">台灣：2、3、4 個月各一劑</span><span class="big" style="font-size:80px;color:var(--or)">≈</span><span class="pl bt" style="position:static">國際指引方向</span></div>
    <div class="d" id="d61" style="margin-top:30px;font-size:30px">實際次數和時間，看狗狗狀況和獸醫規劃</div></div>`,
  animate(S) {
    S.to(['#dg60', '#p60'], { opacity: 0, duration: .3 }, S.at(0));
    K.rise(S, '#c61', S.word('國際指引在幼犬'), '左邊卡片：台灣 2、3、4 個月 ≈ 國際指引方向', { sfx: 'pop-card' });
    K.rise(S, '#d61', S.word('實際施打'), '小字「實際次數和時間，看狗狗狀況和獸醫規劃」', { dy: 16, sfx: false });
  },
});
K.scene('62', 4, {
  enter: 'push', bg: 'mint',
  visuals: ['左邊：站起來拜託的黑柴（想出門）', '大標「保護力可能還不完整」／「打完之前，能出門嗎？」（灰，一行）', '右邊卡「先和獸醫討論」：✓ 哪些活動可以進行（和下一列對齊）；⚠ 避開：大量其他犬隻、可能受污染的環境'],
  mount: () => K.dog('beg', { id: 'dg62', x: 230, y: 360, w: 340 }) +
    K.h('h62', ['保護力可能還不完整', '~打完之前，能出門嗎？'], { x: 760, y: 170, size: 76 }) +
    `<div class="cd" id="c62" style="left:760px;top:420px;width:1020px;height:440px;padding:44px"><div class="k" style="display:flex;align-items:center;gap:14px">先和獸醫討論</div>
      <div class="row" id="r620" style="display:flex;align-items:center;gap:18px;margin-top:24px;font-size:34px;font-weight:900">${K.chk()}哪些活動可以進行</div>
      <div class="row" id="r621" style="display:flex;align-items:center;gap:18px;margin-top:24px;font-size:34px;font-weight:900"><span style="width:44px;height:44px">${K.ic('Warning')}</span>避開高風險環境：</div>
      <div id="r622" style="display:flex;gap:16px;margin:16px 0 0 62px"><span class="pl ot" style="position:static">大量其他犬隻</span><span class="pl ot" style="position:static">可能受污染的環境</span></div></div>`,
  init() { K.hideLines('h62', 2); },
  animate(S) {
    S.fromTo('#dg62', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)' }, S.at(0) + .3, '站起來拜託的黑柴');
    K.lines(S, 'h62', 1, S.word('保護力'), '大標第一句「保護力可能還不完整」');
    S.to('#h621', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('完全不能出門'), '第二句「打完之前，能出門嗎？」');
    K.rise(S, '#c62', S.word('和獸醫討論'), '右卡「先和獸醫討論」', { sfx: 'pop-card' });
    K.rise(S, '#r620', S.word('哪些活動'), '✓ 哪些活動可以進行', { dx: -30, dy: 0, sfx: 'tick-soft' });
    K.rise(S, '#r621', S.word('高風險'), '⚠ 避開高風險環境', { dx: -30, dy: 0 });
    K.rise(S, '#r622', S.word('大量其他犬隻'), '大量其他犬隻、可能受污染的環境', { dy: 16, sfx: false });
  },
});
