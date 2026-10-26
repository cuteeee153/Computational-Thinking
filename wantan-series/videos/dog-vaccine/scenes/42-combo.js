// 幕 42–49｜第三步：看懂幾合一。單一疫苗 vs 綜合疫苗；四種組合表；三件事（核心都一樣／差在哪幾項／不是統一規格）；請獸醫寫在手冊上。
K.ROWS = ['犬瘟熱', '犬小病毒', '犬傳染性肝炎', '犬舍咳相關', '鉤端螺旋體', '犬冠狀病毒'];
K.COMBO = [{ n: '5', v: ['✓', '✓', '✓', '✓', '', ''] }, { n: '7', v: ['✓', '✓', '✓', '✓', '2 種', ''] }, { n: '8', v: ['✓', '✓', '✓', '✓', '2 種', '✓'] }, { n: '10', v: ['✓', '✓', '✓', '✓', '4 種', '✓'] }];
// 表格的第 a～b 列外面畫框（照實際位置量）
K.band = (sel, a, b) => {
  const st = document.getElementById('stage').getBoundingClientRect(), r0 = document.getElementById('rw45' + a).getBoundingClientRect(), r1 = document.getElementById('rw45' + b).getBoundingClientRect(), m = document.getElementById('mx45').getBoundingClientRect();
  Object.assign(document.querySelector(sel).style, { left: m.left - st.left - 18 + 'px', top: r0.top - st.top - 10 + 'px', width: m.width + 36 + 'px', height: r1.bottom - r0.top + 20 + 'px' });
};
K.scene('42', 3, {
  enter: 'iris', irisAt: [1400, 500], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；章節卡「STEP 03」', '大標「這些疫苗在哪一針？」／「一次看懂幾合一」（橘）', '右邊四個大數字 5、7、8、10（合一），念到五合一、八合一、十合一時一個個跳出來，最後一個大問號'],
  mount: () => K.kicker('k42', 'STEP 03', '第三步', { y: 230 }) + K.h('h42', ['這些疫苗在哪一針？', '<b class="o">一次看懂幾合一</b>'], { y: 280, size: 84 }) +
    [['5', 1050, 520], ['7', 1330, 380], ['8', 1560, 560], ['10', 1290, 690]].map(([n, x, y], k) => `<div class="cd" id="n42${k}" style="left:${x}px;top:${y}px;width:${n.length > 1 ? 280 : 230}px;height:200px;display:flex;align-items:baseline;justify-content:center;padding-top:40px;transform:rotate(${[-5, 4, -3, 3][k]}deg)"><span class="big" style="font-size:130px">${n}</span><span style="font-size:36px;font-weight:900">合一</span></div>`).join('') +
    `<div class="big abs" id="q42" style="left:1660px;top:250px;font-size:240px;color:var(--or)">?</div>`,
  init() { K.hideLines('h42', 2); },
  animate(S) {
    S.fromTo('#k42', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    S.sfx(S.at(0), 'chime', '新章節：叮鈴');
    K.lines(S, 'h42', 2, S.at(0) + .2, '大標兩行冒出', 1.2);
    K.pop(S, '#n420', S.word('五合一'), '念到時數字卡一個個跳出：5、7、8、10', { sfx: 'bounce' });
    K.pop(S, ['#n421', '#n422'], S.word('八合一'), '', { sfx: 'bounce', stagger: .2 });
    K.pop(S, '#n423', S.word('十合一'), '', { sfx: 'bounce', pitch: 1.2 });
    K.pop(S, '#q42', S.word('差在哪裡'), '橘色大問號', { sfx: 'boing' });
  },
});
K.scene('43', 3, {
  enter: 'push',
  visuals: ['大標「綜合疫苗和單一疫苗，有什麼不同？」', '念到「在台灣的動物醫院」兩張卡片浮現；左卡「單一疫苗」：藍色針筒（藍色藥劑、推桿）＋一個藍色標籤「狂犬病」，小字「另外打，不在綜合疫苗裡」', '右卡「綜合疫苗」先灰色等待'],
  mount: () => K.h('h43', ['綜合疫苗和單一疫苗，<b class="o">有什麼不同？</b>'], { y: 160, size: 64 }) +
    `<div class="cd" id="c430" style="left:140px;top:280px;width:780px;height:640px;padding:50px"><div class="k">SINGLE</div><div class="t" style="font-size:60px">單一疫苗</div><div class="d" id="d430s">一針只針對一種病</div><div class="ic" id="i430" style="width:200px;height:200px;margin:30px 0 0 10px">${K.ic('SyringeBlue')}</div>` +
    `<div class="pl b" id="p430" style="left:280px;top:400px;font-size:40px">狂犬病</div><div class="d" id="d430" style="position:absolute;left:50px;bottom:50px;font-size:30px;color:#16130F">另外打，<b class="o">不在綜合疫苗裡</b></div></div>` +
    `<div class="cd" id="c431" style="left:1000px;top:280px;width:780px;height:640px;padding:50px;opacity:.45"><div class="k" id="k431" style="color:#A29D97">COMBO</div><div class="t" id="t431" style="font-size:60px;color:#A29D97">綜合疫苗</div></div>`,
  init() { K.hideLines('h43', 1); },
  animate(S) {
    K.lines(S, 'h43', 1, S.at(0), '大標「綜合疫苗和單一疫苗，有什麼不同？」');
    K.rise(S, ['#c430', '#c431'], S.word('在台灣的動物醫院'), '念到「在台灣的動物醫院」兩張卡片浮現（右卡「綜合疫苗」先灰色等待）', { sfx: 'pop-card', stagger: .15 });
    K.ring(S, '#c430', S.word('第一種'));
    K.rise(S, ['#d430s', '#i430'], S.word('針對特定疾病'), '念到「針對特定疾病的疫苗」：「一針只針對一種病」和藍色針筒才浮現', { dy: 20, stagger: .15 });
    K.pop(S, '#p430', S.word('例如狂犬病'), '藍色標籤「狂犬病」', { sfx: 'pop-card' });
    K.rise(S, '#d430', S.word('不包含'), '「另外打，不在綜合疫苗裡」', { dy: 16 });
  },
});
K.scene('44', 3, {
  enter: 'none',
  visuals: ['（接續）右卡「綜合疫苗」亮起（字變黑）、改加橘框：一針裝很多種，四個標籤五合一、七合一、八合一、十合一', '「一針預防多種，不用每種病打一針」', '三個核心疾病標籤（橘）飛進針筒裡'],
  mount: () => [{ into: '#c431', html: `<div class="d" id="d440">多種疫苗組合在同一劑</div><div class="ic" style="width:200px;height:200px;margin:30px 0 0 10px" id="i44">${K.ic('Syringe')}</div>` +
    `<div id="r44" style="position:absolute;left:290px;top:250px;display:grid;grid-template-columns:1fr 1fr;gap:14px">${['五合一', '七合一', '八合一', '十合一'].map((t, k) => `<span class="pl" id="p44${k}" style="position:static;font-size:30px;padding:12px 24px">${t}</span>`).join('')}</div>` +
    `<div class="d" id="d441" style="position:absolute;left:50px;bottom:120px;font-size:30px;color:#16130F">一針預防多種，<b class="o">不用每種病打一針</b></div>` +
    `<div id="r441" style="position:absolute;left:50px;bottom:40px;display:flex;gap:12px">${K.ROWS.slice(0, 3).map((t, k) => `<span class="pl ot" id="q44${k}" style="position:static;font-size:26px;padding:8px 18px">${t}</span>`).join('')}</div>` }],
  init() { gsap.set(['#d440', '#i44'], { opacity: 0 }); },
  animate(S) {
    S.to('#c431', { opacity: 1, duration: .4 }, S.word('綜合疫苗'), '右卡「綜合疫苗」亮起，字變成黑色');
    S.to('#t431', { color: '#16130F', duration: .4 }, S.word('綜合疫苗'));
    S.to('#k431', { color: '#F97316', duration: .4 }, S.word('綜合疫苗'));
    K.ring(S, '#c430', S.word('綜合疫苗'), false); K.ring(S, '#c431', S.word('綜合疫苗'));
    S.to(['#d440', '#i44'], { opacity: 1, duration: .4 }, S.word('多種疫苗'));
    ['五合一', '七合一', '八合一', '十合一'].forEach((w, k) => K.pop(S, '#p44' + k, S.word(w), k ? '' : '念到時四個「幾合一」標籤依序彈出', { pitch: 1 + k * .08 }));
    K.rise(S, '#d441', S.word('不需要'), '「一針預防多種，不用每種病打一針」', { dy: 16 });
    K.rise(S, '#q440', S.word('犬瘟熱'), '三個核心疾病標籤依序出現', { dy: 16 });
    K.rise(S, '#q441', S.word('犬小病毒'), '', { dy: 16, sfx: false });
    K.rise(S, '#q442', S.word('肝炎'), '', { dy: 16, sfx: false });
    S.to('#i44', { scale: 1.12, duration: .25, yoyo: true, repeat: 1 }, S.word('包含在'), '針筒「吸進」核心疫苗、抖一下');
    S.sfx(S.word('包含在'), 'pop-low', '裝進去：低音啵');
  },
});
K.scene('45', 3, {
  enter: 'wipe', bg: 'sky',
  visuals: ['大表：左邊一欄疾病名（犬瘟熱、犬小病毒、犬傳染性肝炎、犬舍咳相關、鉤端螺旋體、犬冠狀病毒），右邊四欄 5／7／8／10 合一，一欄一欄由左往右長出來', '下方小字來源；橘色標籤「有三件事你一定要知道」'],
  mount: () => `<div class="mx" id="mx45" style="left:140px;top:200px;grid-template-columns:330px repeat(4,300px)">` +
    `<div class="c hd"></div>${K.COMBO.map((c, j) => `<div class="c col" id="hd45${j}"><b>${c.n}</b>合一</div>`).join('')}` +
    K.ROWS.map((r, i) => `<div class="c hd" id="rw45${i}">${r}</div>` + K.COMBO.map((c, j) => `<div class="c ${c.v[i] ? (i < 3 ? 'core' : i > 3 ? 'tab' : '') : 'no'} cl45${j}">${c.v[i] || '—'}</div>`).join('')).join('') + `</div>` +
    `<div class="note" id="n45" style="left:140px;top:870px;width:1000px">整理自台灣動物醫院衛教、寵物品牌文章等網路資料；實際內容依產品而定</div>` +
    `<div class="pl o" id="p45" style="left:1260px;top:850px;font-size:34px">有三件事你一定要知道</div>`,
  animate(S) {
    K.rise(S, K.ROWS.map((_, i) => '#rw45' + i), S.at(0), '左邊疾病名一列列出現', { stagger: .06, dx: -30, dy: 0 });
    K.COMBO.forEach((c, j) => K.rise(S, ['#hd45' + j, '.cl45' + j], S.word(['五合一', '七合一', '八合一', '十合一'][j]), j ? '' : '念到時四欄依序長出來', { stagger: .04, sfx: 'pop-card', dy: 30 }));
    K.fadeIn(S, '#n45', S.word('我們整理'), '下方小字來源');
    K.pop(S, '#p45', S.word('三件事'), '「有三件事你一定要知道」', { sfx: 'ding-soft' });
  },
});
K.scene('46', 3, {
  enter: 'none',
  visuals: ['（接續表格）前三列（核心疫苗）被橘色框框起來；橘色手寫標註「1｜核心疫苗每一種都有」放大、放在表格右上方（「病毒項目」上方），不壓到框線', '下方兩個標籤：數字小 ≠ 比較不好、數字大 ≠ 比較適合'],
  mount: () => `<div class="abs" id="bd46" style="left:120px;top:278px;width:1580px;height:248px;border:5px solid var(--or-b);border-radius:26px"></div>` +
    K.anno('a46', '1', '核心疫苗每一種都有', { x: 480, y: 70, bs: 110, ss: 48, row: true, color: 'var(--or)' }) +
    `<div class="abs" id="r46" style="left:140px;top:850px;display:flex;gap:20px;font-size:34px;font-weight:900;background:#F1F3F7;padding:10px 0"><span class="pl" style="position:static">數字小 <b class="o">≠</b> 比較不好</span><span class="pl" style="position:static">數字大 <b class="o">≠</b> 比較適合</span></div>`,
  assets() { K.band('#bd46', 0, 2); },
  init() { gsap.set('#bd46', { opacity: 0, scale: 1.05 }); },
  animate(S) {
    S.to(['#n45', '#p45'], { opacity: 0, duration: .3 }, S.at(0));
    S.to('#bd46', { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' }, S.word('三種核心疫苗'), '前三列框上橘框');
    S.sfx(S.word('三種核心疫苗'), 'marker', '框起來：「唰」');
    K.pop(S, '#a46', S.word('三種核心疫苗', 0, .3), '橘色手寫「1｜核心疫苗每一種都有」', { sfx: false });
    K.rise(S, '#r46', S.word('數字比較小'), '下方標籤：數字小≠比較不好、數字大≠比較適合');
  },
});
K.scene('47', 3, {
  enter: 'none',
  visuals: ['（接續表格）橘框和橘色手寫留在原位（不變淡）；最後兩列（鉤端螺旋體、犬冠狀病毒）變藍、被藍框框起來', '表格下方藍色手寫「2｜差別主要在這裡」（字放大）', '小字「實際內容還是要看產品」'],
  mount: () => `<div class="abs" id="bd47" style="left:120px;top:668px;width:1580px;height:170px;border:5px solid var(--blue);border-radius:26px"></div>` +
    K.anno('a47', '2', '差別主要在這裡', { x: 1190, y: 750, bs: 100, ss: 52, row: true }) +
    `<div class="pl bt" id="p47" style="left:140px;top:870px;font-size:30px">這只是常見組合的整理，實際內容還是要看產品</div>`,
  assets() { K.band('#bd47', 4, 5); },
  init() { gsap.set('#bd47', { opacity: 0, scale: 1.05 }); },
  animate(S) {
    S.to('#r46', { opacity: 0, duration: .3 }, S.at(0));
        S.to('.mx .c.tab', { backgroundColor: '#E6EEFB', color: '#1F55B8', duration: .4 }, S.word('鉤端螺旋體'), '最後兩列變藍');
    S.to('#bd47', { opacity: 1, scale: 1, duration: .5, ease: 'power3.out' }, S.word('鉤端螺旋體'), '藍框框起來');
    S.sfx(S.word('鉤端螺旋體'), 'marker', '框起來：「唰」');
    K.pop(S, '#a47', S.word('鉤端螺旋體', 0, .3), '表格下方藍色手寫「2｜差別主要在這裡」', { sfx: false });
    K.rise(S, '#p47', S.word('不過'), '「實際內容還是要看產品」');
  },
});
K.scene('48', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['大數字「3」（和兩行大標一樣高）＋大標「幾合一」／「不是全世界統一的規格」（橘）', '中間示意：一個標籤「犬腺病毒」分裂成「第一型」「第二型」，旁邊大數字由 7 變成 8（示意：算法不同，名稱和數字也不同）', '下方：不同廠牌、不同產品，組成可能不一樣'],
  mount: () => K.anno('a48', '3', '', { x: 140, y: 120, bs: 250 }) + K.h('h48', ['幾合一', '<b class="o">不是全世界統一的規格</b>'], { x: 330, y: 160, size: 76 }) +
    `<div class="cd" id="c48" style="left:140px;top:430px;width:1100px;height:380px;padding:44px"><div class="k">示意｜同一種疫苗，不同的算法</div>
      <div class="pl ot" id="p480" style="left:60px;top:150px;font-size:40px">犬腺病毒</div>
      <div class="pl ot" id="p481" style="left:500px;top:100px;font-size:36px">第一型犬腺病毒</div><div class="pl ot" id="p482" style="left:500px;top:230px;font-size:36px">第二型犬腺病毒</div>
      <svg class="abs" style="left:300px;top:120px;overflow:visible" width="200" height="200"><path id="sp48" d="M10 70 C 80 70, 100 20, 190 20 M10 70 C 80 70, 100 140, 190 150" fill="none" stroke="#F97316" stroke-width="5" stroke-dasharray="10 8"/></svg></div>` +
    `<div class="cd" id="c481" style="left:1320px;top:430px;width:460px;height:380px;padding:44px;text-align:center"><div class="k" style="color:#9A9590">名稱上的數字</div><div style="position:relative;height:220px"><span class="big abs" id="n480" style="left:0;right:0;top:20px;font-size:220px">7</span><span class="big abs" id="n481" style="left:0;right:0;top:20px;font-size:220px;color:var(--or)">8</span></div></div>` +
    `<div class="note" id="n48" style="left:140px;top:850px;font-size:30px;font-weight:700;color:#7C7772">不同廠牌、不同產品，組成可能不一樣</div>`,
  init() { K.hideLines('h48', 2); gsap.set(['#p481', '#p482', '#sp48', '#n481'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#a48', S.at(0), '大數字「3」', { sfx: false });
    K.lines(S, 'h48', 2, S.at(0) + .1, '大標「幾合一／不是全世界統一的規格」');
    K.fadeIn(S, '#n48', S.word('不同廠牌'), '小字「不同廠牌、不同產品，組成可能不一樣」');
    K.rise(S, ['#c48', '#c481'], S.word('例如'), '示意卡：犬腺病毒＋名稱上的數字 7', { stagger: .15, sfx: 'pop-card' });
    S.to('#sp48', { opacity: 1, duration: .3 }, S.word('分開計算', 0, -.3));
    K.pop(S, ['#p481', '#p482'], S.word('分開計算', 0, -.2), '「犬腺病毒」分成第一型、第二型', { stagger: .15 });
    S.to('#p480', { opacity: .35, duration: .3 }, S.word('分開計算'));
    S.to('#n480', { opacity: 0, y: -60, duration: .4 }, S.word('名稱和數字'), '數字由 7 變成 8');
    S.fromTo('#n481', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: .4, ease: 'back.out(2)' }, S.word('名稱和數字'));
    S.sfx(S.word('名稱和數字'), 'tick', '7 → 8：「叮咚」');
  },
});
K.scene('49', 3, {
  enter: 'rise', bg: 'sky',
  visuals: ['左邊大標「打之前，直接問獸醫」／「請獸醫記在疫苗手冊上」（橘）', '右邊手機「疫苗手冊」：今天這一針包含的項目一列列打勾出現', '下方：八合一、十合一兩個標籤被劃掉，「別只看名稱」'],
  mount: () => K.h('h49', ['打之前，直接問獸醫', '<b class="o">請獸醫記在疫苗手冊上</b>'], { y: 300, size: 72 }) +
    `<div class="abs" id="r49" style="left:140px;top:600px;display:flex;gap:20px;align-items:center;font-size:34px;font-weight:900">${['八合一', '十合一'].map((t, k) => `<span class="pl" style="position:static;position:relative">${t}<i class="abs" id="sl49${k}" style="left:14px;right:14px;top:50%;height:6px;border-radius:3px;background:#E5484D;transform-origin:0 50%"></i></span>`).join('')}<span style="color:#7C7772">別只看名稱</span></div>` +
    K.phone('ph49', `<div class="rows">${['犬瘟熱', '犬小病毒', '犬傳染性肝炎', '犬舍咳相關', '鉤端螺旋體'].map((t, k) => `<div class="row" id="rr49${k}"><span class="what">${t}</span>${K.chk()}</div>`).join('')}</div>`, { title: '疫苗手冊｜今天這一針' }),
  init() { K.hideLines('h49', 2); gsap.set('[id^=sl49]', { scaleX: 0 }); gsap.set('#ph49', { y: 400 }); },
  animate(S) {
    K.lines(S, 'h49', 2, S.word('直接問獸醫'), '大標「打之前，直接問獸醫／請獸醫記在疫苗手冊上」', 1.4);
    S.to('#ph49', { y: 0, duration: .8, ease: 'power3.out' }, S.at(0), '右邊手機「疫苗手冊」一開始就直接滑上來');
    S.sfx(S.at(0), 'whoosh', '手機滑上來：「咻」');
    [0, 1, 2, 3, 4].forEach(k => K.rise(S, '#rr49' + k, S.word('包含哪些項目', 0, k * .3), k ? '' : '這一針包含的項目一列列打勾出現', { dy: 20, sfx: 'tick-soft' }));
    K.rise(S, '#r49', S.word('不要只看'), '下方：八合一、十合一');
    S.to(['#sl490', '#sl491'], { scaleX: 1, duration: .3, stagger: .15 }, S.word('就認定'), '兩個名稱被劃掉');
    S.sfx(S.word('就認定'), 'scribble', '劃掉：筆刷');
  },
});
