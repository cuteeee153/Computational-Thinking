// 幕 14–16｜觀念三：疫苗 ≠ 預防藥。左右兩張大卡對照；心絲蟲貼紙「不是疫苗」。
K.scene('14', 0, {
  enter: 'iris', irisAt: [1500, 500], bg: 'sky',
  visuals: ['淡藍底，圓形轉場', '小標「觀念三」；超大字「疫苗 ≠ 預防藥」（≠ 橘色）', '下方：針筒和藥罐兩塊圖示磚，藍色手寫標註「有些打針、吃藥，其實是預防藥」'],
  mount: () => K.kicker('k14', '03', '觀念三｜疫苗和預防藥', { y: 220 }) +
    `<div class="h abs" style="left:140px;top:280px;font-size:150px"><span class="ln"><span id="h140">疫苗 <b class="o">≠</b> <span class="g">預防藥</span></span></span></div>` +
    K.tile('Syringe', { id: 't140', x: 1150, y: 560, size: 190, rot: -6 }) + K.tile('Pill', { id: 't141', x: 1420, y: 600, size: 190, rot: 5 }) +
    K.anno('a14', '', '有些打針、吃藥<br>其實是預防藥', { x: 600, y: 620, ss: 42, align: 'right' }) + K.arrow('w14', { x: 930, y: 600, w: 220, h: 120, d: 'M10 70 C 80 20, 150 30, 205 70' }) +
    K.dog('tilt', { id: 'dg14', x: 1610, y: 300, w: 210, shadow: false }),
  init() { K.hideLines('h14', 1); gsap.set('#a14', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k14', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h14', 1, S.word('疫苗和預防藥'), '「疫苗 ≠ 預防藥」大字冒出');
    S.sfx(S.word('不一樣'), 'tick', '不一樣：「叮咚」');
    K.pop(S, '#t140', S.word('打針'), '念到「打針」針筒磚彈出', { sfx: 'pop-card' });
    K.pop(S, '#t141', S.word('吃藥'), '念到「吃藥」藥罐磚彈出', { sfx: 'pop-card', pitch: 1.1 });
    S.to('#a14', { opacity: 1, duration: .3 }, S.word('預防藥', 1, -.6), '藍色手寫標註「其實是預防藥」');
    K.draw(S, '#w14', S.word('預防藥', 1, -.6), '');
  },
});
K.scene('15', 0, {
  enter: 'wipe',
  visuals: ['左右兩張大卡對照；左卡「疫苗」先亮：抗體圖示、「讓身體建立免疫反應」、小流程「遇到病原體 → 更快防禦」', '右卡「預防藥」先是灰色等待'],
  mount: () => `<div class="abs" id="h15" style="left:140px;top:170px;font-size:44px;font-weight:900">兩者最大的差別</div>` +
    `<div class="cd" id="c150" style="left:140px;top:270px;width:790px;height:660px;padding:56px"><div class="k">VACCINE</div><div class="t" style="font-size:72px;margin-top:6px">疫苗</div><div class="ic" style="position:absolute;right:50px;top:50px;width:170px;height:170px">${K.ic('Antibody')}</div>` +
    `<div class="d" id="d150" style="font-size:38px;color:#16130F;margin-top:60px;font-weight:900">讓身體<b class="o">建立免疫反應</b></div>` +
    `<div id="d151" style="margin-top:46px;display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700"><span class="pl bt" style="position:static">遇到病原體</span>→<span class="pl o" style="position:static">更快防禦</span></div></div>` +
    `<div class="cd" id="c151" style="left:990px;top:270px;width:790px;height:660px;padding:56px;opacity:.45"><div class="k" style="color:#A29D97">MEDICINE</div><div class="t" style="font-size:72px;margin-top:6px;color:#A29D97">預防藥</div></div>`,
  animate(S) {
    K.fadeIn(S, '#h15', S.at(0), '小標「兩者最大的差別」');
    K.rise(S, '#c150', S.word('疫苗', 0, -.2), '左卡「疫苗」浮上、加橘框', { sfx: 'pop-card' });
    K.ring(S, '#c150', S.word('疫苗'));
    K.rise(S, '#c151', S.word('疫苗', 0, -.1), '右卡「預防藥」灰色等待', { sfx: false });
    K.rise(S, '#d150', S.word('建立免疫'), '「讓身體建立免疫反應」', { dy: 20 });
    K.rise(S, '#d151', S.word('病原體'), '小流程：遇到病原體 → 更快防禦', { dy: 20 });
  },
});
K.scene('16', 0, {
  enter: 'none',
  visuals: ['（接續）右卡「預防藥」亮起、移到橘框：藥罐＋寄生蟲圖示、「直接預防或清除寄生蟲」、「要定期使用」（時鐘）', '念到心絲蟲：一張貼紙蓋上來「心絲蟲｜長效預防針劑」＋橘色印章「不是疫苗」'],
  mount: () => [{ into: '#c151', html: `<div class="ic" style="position:absolute;right:50px;top:50px;width:170px;height:170px" id="i16">${K.ic('Worm')}</div>` +
      `<div class="d" id="d160" style="font-size:38px;color:#16130F;margin-top:60px;font-weight:900">直接預防或<b class="o">清除寄生蟲</b></div>` +
      `<div id="d161" style="margin-top:46px;display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700"><span style="width:80px;height:80px;display:inline-block">${K.ic('Clock')}</span><span class="pl ot" style="position:static">要定期使用</span></div>` }, { into: '#sc-16', html:
      `<div class="cd" id="st16" style="left:1080px;top:600px;width:640px;padding:36px 44px;transform:rotate(-4deg);box-shadow:0 0 0 5px #2E6BD8,0 50px 90px -30px rgba(40,60,100,.45)"><div class="k" style="color:var(--blue)">台灣常聽到的</div><div class="t" style="font-size:46px">心絲蟲一年一針</div><div class="d">＝長效預防針劑</div></div>` +
      `<div class="stamp" id="sp16" style="left:1450px;top:540px">不是疫苗</div>` }],
  init() { gsap.set(['#i16', '#d160', '#d161'], { opacity: 0 }); },
  animate(S) {
    S.to('#c151', { opacity: 1, duration: .4 }, S.word('預防藥'), '右卡「預防藥」亮起');
    K.ring(S, '#c150', S.word('預防藥'), false); K.ring(S, '#c151', S.word('預防藥'));
    S.sfx(S.word('預防藥'), 'pop-card', '右卡亮起：「啵」');
    K.pop(S, '#i16', S.word('寄生蟲', 0, -.3), '寄生蟲圖示彈出', { sfx: false });
    K.rise(S, '#d160', S.word('直接預防'), '「直接預防或清除寄生蟲」', { dy: 20 });
    K.rise(S, '#d161', S.word('定期使用'), '時鐘＋「要定期使用」', { dy: 20 });
    S.fromTo('#st16', { opacity: 0, y: 80, rotate: 6 }, { opacity: 1, y: 0, rotate: -4, duration: .6, ease: 'back.out(1.5)' }, S.word('心絲蟲'), '貼紙蓋上來「心絲蟲一年一針＝長效預防針劑」');
    S.sfx(S.word('心絲蟲'), 'flip', '貼紙：「啪」');
    K.stamp(S, '#sp16', S.word('不是疫苗'), '橘色印章「不是疫苗」');
  },
});
