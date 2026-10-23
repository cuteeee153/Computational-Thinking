// 幕 21–24｜狂犬病：幾乎都會死亡、人畜共通；台灣有嗎？有（鼬獾，超過 1,000 例）；爬山露營要注意，待在家也不能忽略。
K.disHead = (id, n, name, o = {}) => `<div class="abs" id="${id}" style="left:${o.x ?? 140}px;top:${o.y ?? 200}px"><div class="eyebrow kick">疾病 0${n}</div>` +
  `<div class="h" style="font-size:${o.size || 140}px;margin-top:20px"><span class="ln"><span id="${id}n">${name}</span></span></div></div>`;
K.scene('21', 1, {
  enter: 'push',
  visuals: ['左邊：「疾病 01」＋超大字「狂犬病」，下方橘色大字「非常嚴重的病毒感染」', '橘色印章「發病後幾乎都會死亡」', '右邊：黑柴和揮手的飼主，中間一來一回兩支箭頭，下方藍色標籤「人畜共通傳染病」'],
  mount: () => K.disHead('dh21', 1, '狂犬病') + `<div class="abs" id="o21" style="left:140px;top:420px;font-size:56px;font-weight:900;color:var(--or)">非常嚴重的病毒感染</div>` +
    `<div class="stamp" id="sp21" style="left:150px;top:580px">發病後幾乎都會死亡</div>` +
    K.dog('sit', { id: 'dg21', x: 1000, y: 360, w: 300 }) + `<img class="abs" id="t21" src="assets/people/man-leash.png" style="left:1560px;top:250px;height:600px">` +
    K.arrow('w210', { x: 1290, y: 380, w: 240, h: 120, d: 'M10 90 C 70 20, 160 20, 225 80' }) + K.arrow('w211', { x: 1290, y: 700, w: 240, h: 120, d: 'M230 20 C 170 100, 80 100, 15 40' }) +
    `<div class="pl b" id="p21" style="left:1180px;top:860px">人畜共通傳染病</div>`,
  init() { gsap.set('#dh21n', { yPercent: 110 }); gsap.set(['#dg21', '#t21'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#dh21', { opacity: 0 }, { opacity: 1, duration: .3 }, S.at(0));
    S.to('#dh21n', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '「狂犬病」大字冒出');
    K.rise(S, '#o21', S.word('非常嚴重'), '橘色大字「非常嚴重的病毒感染」', { dy: 20 });
    K.stamp(S, '#sp21', S.word('幾乎都會死亡', 0, -.2), '印章「發病後幾乎都會死亡」');
    K.pop(S, '#dg21', S.word('感染狗狗'), '黑柴出現', { sfx: 'pop-card' });
    K.pop(S, '#t21', S.word('傳染給人'), '揮手的飼主出現', { sfx: 'pop-card', pitch: 1.1 });
    K.draw(S, '#w210', S.word('傳染給人', 0, .2), '一來一回兩支箭頭');
    K.draw(S, '#w211', S.word('傳染給人', 0, .5), '');
    K.pop(S, '#p21', S.word('人畜共通'), '「人畜共通傳染病」藍色標籤', { sfx: 'ding-soft' });
  },
});
K.scene('22', 1, {
  enter: 'wipe', bg: 'mint',
  visuals: ['大標「台灣有狂犬病嗎？」，念到「有」時後面接上橘色大字「有。」', '資料來源標籤「農業部監測資料」，念到年份時接上「2013–2025」', '左下：鼬獾圖示磚＋「鼬獾」大字＋「生活在野外、常見於山區的小型哺乳動物」'],
  mount: () => K.h('h22', ['台灣有狂犬病嗎？<span id="y22" class="o" style="display:inline-block">有。</span>'], { y: 170, size: 84 }) +
    `<div class="pl bt" id="p22" style="left:140px;top:310px;font-size:28px;padding:12px 26px">農業部監測資料<span id="yr22">｜2013–2025</span></div>` +
    K.tile('Badger', { id: 't22', x: 140, y: 470, size: 280, rot: -4 }) +
    `<div class="abs" id="b22" style="left:470px;top:500px;width:560px"><div class="h" style="font-size:96px">鼬獾</div><div class="sub" style="position:static;margin-top:16px;font-size:32px">生活在野外、常見於山區的<br>小型哺乳動物</div></div>`,
  init() { K.hideLines('h22', 1); gsap.set('#y22', { opacity: 0, scale: .4 }); gsap.set('#yr22', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h22', 1, S.at(0), '大標「台灣有狂犬病嗎？」');
    S.to('#y22', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.4)' }, S.word('有', 1), '念到「有」：問號後面接上橘色「有。」');
    S.sfx(S.word('有', 1), 'tick', '有：「叮咚」');
    K.rise(S, '#p22', S.word('農業部'), '資料來源標籤「農業部監測資料」', { dy: 20 });
    S.to('#yr22', { opacity: 1, duration: .3 }, S.word('2013', 0, -.1), '念到年份時接上「2013–2025」');
    K.pop(S, '#t22', S.word('鼬獾'), '鼬獾圖示磚彈出', { sfx: 'pop-card' });
    K.rise(S, '#b22', S.word('鼬獾', 0, .2), '「鼬獾」大字＋說明');
  },
});
K.scene('23', 1, {
  enter: 'none',
  visuals: ['（接續）右邊大卡：數字由 0 跑到「1,000+」（橘），「累計確診（例）」', '下方兩列：白鼻心等野生動物｜也有確診；狗｜1 隻'],
  mount: () => `<div class="cd" id="c23" style="left:1140px;top:300px;width:650px;height:340px;padding:44px 50px"><div class="k">累計確診</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:10px"><span class="big" id="n23" style="font-size:190px;color:var(--or)">0</span><span class="big" style="font-size:120px;color:var(--or)">+</span><span style="font-size:40px;font-weight:900">例</span></div><div class="d">2013–2025｜主要是鼬獾</div></div>` +
    [['白鼻心等野生動物', '也有確診'], ['狗', '1 隻']].map(([a, b], k) => `<div class="cd" id="r23${k}" style="left:1140px;top:${680 + k * 110}px;width:650px;height:90px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;font-size:32px;font-weight:700"><span style="color:#7C7772">${a}</span><b style="font-weight:900">${b}</b></div>`).join(''),
  animate(S) {
    K.rise(S, '#c23', S.at(0), '右邊大卡浮上', { sfx: 'pop-card' });
    K.count(S, '#n23', 0, 1000, S.word('超過'), 1.4, '數字由 0 跑到 1,000+');
    S.sfx(S.word('超過'), 'typing', '數字跳動：滴答', { dur: 1.3, chars: 12, gain: .5 });
    S.sfx(S.word('一千例', 0, .6), 'ding-soft', '跑到 1,000+：輕「叮」');
    K.rise(S, '#r230', S.word('白鼻心'), '「白鼻心等野生動物｜也有確診」', { dx: 40, dy: 0 });
    K.rise(S, '#r231', S.word('一隻狗狗'), '「狗｜1 隻」', { dx: 40, dy: 0 });
  },
});
K.scene('24', 1, {
  enter: 'wipe',
  visuals: ['左邊山區場景：山、帳篷、鼬獾、穿著胸背帶走在山路上的黑柴，藍色手寫標註「可能接觸到帶病毒的野生動物」', '念到「即使…待在家裡」：右邊房子圖示＋趴著的黑柴，大字「即使待在家裡」／「也不能忽略」／「狂犬病疫苗」（橘）'],
  mount: () => `<div class="sub" id="s24" style="left:140px;top:170px;font-size:34px">目前疫情主要在<b>野生動物</b>身上</div>` +
    K.tile('Mountain', { id: 't240', x: 150, y: 300, size: 230, rot: -4 }) + K.tile('Tent', { id: 't241', x: 420, y: 330, size: 170, rot: 5 }) +
    K.dog('harness-walk', { id: 'dg24', x: 250, y: 560, w: 330, flip: true }) +
    `<div class="ico" id="i24" style="left:640px;top:640px;width:200px;height:200px">${K.ic('Badger')}</div>` +
    K.anno('a24', '', '可能接觸到<br>帶病毒的野生動物', { x: 600, y: 410, ss: 34 }) + K.arrow('w24', { x: 700, y: 520, w: 80, h: 120, d: 'M30 10 C 10 50, 30 80, 50 110' }) +
    `<div class="abs" id="v24" style="left:1000px;top:200px;width:4px;height:700px;background:#E4E1DC;border-radius:2px"></div>` +
    K.tile('House', { id: 't242', x: 1180, y: 300, size: 230, rot: -3 }) + K.dog('rest', { id: 'dg242', x: 1420, y: 380, w: 360 }) +
    K.h('h24', ['即使待在家裡', '<b class="o">也不能忽略</b>', '<b class="o">狂犬病疫苗</b>'], { x: 1100, y: 610, size: 64 }),
  init() { K.hideLines('h24', 3); gsap.set('#a24', { opacity: 0 }); },
  animate(S) {
    K.fadeIn(S, '#s24', S.at(0), '小字「目前疫情主要在野生動物身上」');
    K.pop(S, '#t240', S.word('爬山'), '念到爬山、露營：山和帳篷磚彈出', { sfx: 'pop-card' });
    K.pop(S, '#t241', S.word('露營'), '', { sfx: 'pop-card', pitch: 1.1 });
    S.fromTo('#dg24', { opacity: 0, x: -160 }, { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }, S.word('山區'), '黑柴走上山路');
    K.pop(S, '#i24', S.word('野生動物', 1, -.3), '鼬獾冒出來', { sfx: 'pop-low' });
    S.to('#a24', { opacity: 1, duration: .3 }, S.word('帶有病毒'), '藍色手寫標註「可能接觸到帶病毒的野生動物」');
    K.draw(S, '#w24', S.word('帶有病毒'), '');
    K.fadeIn(S, '#v24', S.word('即使'));
    K.pop(S, '#t242', S.word('即使'), '右邊房子＋趴著的黑柴', { sfx: 'pop-card' });
    S.fromTo('#dg242', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: .6 }, S.word('待在家裡'));
    K.lines(S, 'h24', 3, S.word('也不能忽略', 0, -.4), '大字「即使待在家裡／也不能忽略／狂犬病疫苗」');
    S.sfx(S.word('重要性'), 'tick', '重點：「叮咚」');
  },
});
