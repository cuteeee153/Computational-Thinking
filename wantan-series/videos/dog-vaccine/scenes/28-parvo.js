// 幕 28–30｜犬小病毒：俗稱小病毒、可能致命、幼犬和沒打完疫苗的成犬；1–2 天惡化；還沒症狀就會傳染。
K.scene('28', 1, {
  enter: 'push',
  visuals: ['左邊：「疾病 03」＋大字「犬小病毒腸炎」，貼一張藍色標籤「俗稱：小病毒」', '橘色印章「可能致命」', '右邊兩張卡「特別容易發生在」：幼犬、沒完成疫苗的成犬（針筒）'],
  mount: () => K.disHead('dh28', 3, '犬小病毒腸炎', { sub: '病毒感染', size: 112 }) +
    `<div class="pl b" id="p28" style="left:610px;top:200px;transform:rotate(4deg);font-size:34px">俗稱：小病毒</div>` +
    `<div class="stamp" id="sp28" style="left:150px;top:470px">可能致命</div>` +
    `<div class="note" id="n28" style="left:1000px;top:250px;font-size:28px;font-weight:700;color:#7C7772">特別容易發生在</div>` +
    `<div class="cd" id="c280" style="left:1000px;top:310px;width:360px;height:520px;padding:30px;text-align:center"><div style="height:330px;position:relative">${K.dog('sit', { x: 95, y: 110, w: 150 })}</div><div class="t">幼犬</div></div>` +
    `<div class="cd" id="c281" style="left:1400px;top:310px;width:380px;height:520px;padding:30px;text-align:center"><div style="height:330px;position:relative">${K.dog('stand-side', { x: 30, y: 60, w: 260 })}<div class="ico" style="left:220px;top:20px;width:110px;height:110px">${K.ic('Syringe')}</div></div><div class="t" style="font-size:34px">沒完成疫苗的<br>成犬</div></div>`,
  init() { gsap.set('#dh28n', { yPercent: 110 }); },
  animate(S) {
    S.fromTo('#dh28', { opacity: 0 }, { opacity: 1, duration: .3 }, S.at(0));
    S.to('#dh28n', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '「犬小病毒腸炎」大字冒出');
    S.fromTo('#p28', { opacity: 0, scale: .4, rotate: -10 }, { opacity: 1, scale: 1, rotate: 4, duration: .5, ease: 'back.out(2)' }, S.word('俗稱'), '藍色標籤「俗稱：小病毒」貼上');
    S.sfx(S.word('俗稱'), 'pop', '標籤：「啵」');
    K.stamp(S, '#sp28', S.word('致命', 0, -.2), '印章「可能致命」');
    K.fadeIn(S, '#n28', S.word('特別容易'));
    K.rise(S, '#c280', S.word('幼犬'), '卡片「幼犬」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c281', S.word('沒有完成'), '卡片「沒完成疫苗的成犬」浮上', { sfx: 'pop-card' });
  },
});
K.scene('29', 1, {
  enter: 'wipe', bg: 'mint',
  visuals: ['問句「為什麼這麼危險？」（灰）→ 大標「病毒會嚴重破壞腸道」＋腸道圖示', '時間軸：左卡「一開始：沒精神、不太吃、發燒」→ 中間時鐘「1–2 天內」→ 右卡加橘框「嘔吐、帶血的便便」'],
  mount: () => K.tile('Gut', { id: 't29', x: 140, y: 200, size: 190, rot: -4 }) + K.h('h29', ['~為什麼這麼危險？', '病毒會嚴重破壞<b class="o">腸道</b>'], { x: 370, y: 180, size: 76 }) +
    `<div class="cd" id="c290" style="left:140px;top:480px;width:560px;height:330px;padding:44px"><div class="k" style="color:#9A9590">一開始</div><div class="t" style="margin-top:14px;line-height:1.5">沒精神<br>不太吃東西<br>發燒</div></div>` +
    `<div class="abs" id="m29" style="left:760px;top:520px;width:400px;text-align:center"><div style="width:150px;height:150px;margin:0 auto">${K.ic('Clock')}</div><div class="big" style="font-size:64px;margin-top:10px">1–2<span style="font-family:'Noto Sans TC';font-size:36px;font-weight:900"> 天內</span></div></div>` +
    `<svg class="abs" style="left:700px;top:620px;overflow:visible" width="520" height="40"><path id="ar29" d="M10 20 H500" stroke="#F97316" stroke-width="6" stroke-dasharray="14 12" fill="none"/></svg>` +
    `<div class="cd" id="c291" style="left:1220px;top:480px;width:560px;height:330px;padding:44px;box-shadow:${K.RING}"><div class="k">之後</div><div class="t" style="margin-top:14px;line-height:1.5;color:var(--or)">嘔吐<br>拉出帶血的便便</div></div>`,
  init() { K.hideLines('h29', 2); gsap.set('#ar29', { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#t29', S.word('腸道'), '腸道圖示磚彈出', { sfx: 'pop-card' });
    K.lines(S, 'h29', 1, S.at(0), '問句「為什麼這麼危險？」');
    S.to('#h291', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('腸道', 0, -.4), '大標「病毒會嚴重破壞腸道」');
    K.rise(S, '#c290', S.word('一開始'), '左卡「一開始：沒精神、不太吃、發燒」', { sfx: 'pop-card' });
    S.to('#ar29', { opacity: 1, duration: .3 }, S.word('一到兩天'));
    K.pop(S, '#m29', S.word('一到兩天'), '中間時鐘「1–2 天內」', { sfx: 'tick-soft' });
    K.rise(S, '#c291', S.word('嘔吐'), '右卡「嘔吐、拉出帶血的便便」加橘框', { sfx: 'pop-card' });
  },
});
K.scene('30', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['大標「還沒出現症狀」／「就可能傳染給其他狗」', '左邊開心的狗（看起來沒事，身上藏著小病毒），箭頭傳到右邊兩隻狗，牠們身上冒出病毒', '下方：幼犬保護力還沒建立完整 → 少接觸其他狗（橘）'],
  mount: () => K.h('h30', ['還沒出現症狀', '~就可能傳染給其他狗'], { y: 170, size: 76 }) +
    K.dog('happy', { id: 'dg300', x: 180, y: 430, w: 230 }) + `<div class="pl" id="p30" style="left:150px;top:380px;font-size:26px;padding:10px 22px">看起來沒事</div>` +
    `<div class="ico" id="v300" style="left:330px;top:560px;width:80px;height:80px">${K.ic('Virus')}</div>` +
    K.arrow('w300', { x: 450, y: 480, w: 420, h: 160, d: 'M10 120 C 140 20, 280 20, 400 90' }) +
    K.dog('sit', { id: 'dg301', x: 880, y: 420, w: 220 }) + K.dog('tilt', { id: 'dg302', x: 1180, y: 410, w: 230 }) +
    `<div class="ico" id="v301" style="left:1010px;top:520px;width:80px;height:80px">${K.ic('Virus')}</div><div class="ico" id="v302" style="left:1330px;top:500px;width:80px;height:80px">${K.ic('Virus')}</div>` +
    `<div class="abs" id="r30" style="left:140px;top:860px;display:flex;gap:18px;align-items:center;font-size:34px;font-weight:900;white-space:nowrap"><span class="pl bt" style="position:static">幼犬：保護力還沒建立完整</span>→<span class="pl o" style="position:static">少接觸其他狗</span></div>`,
  init() { K.hideLines('h30', 2); gsap.set(['#dg301', '#dg302'], { opacity: .25 }); },
  animate(S) {
    K.lines(S, 'h30', 2, S.word('不一定要等到'), '大標「還沒出現症狀／就可能傳染給其他狗」');
    K.pop(S, '#p30', S.word('出現症狀'), '左邊開心的狗：「看起來沒事」', { sfx: 'pop' });
    K.pop(S, '#v300', S.word('出現症狀', 0, .4), '牠身上藏著小病毒', { sfx: 'pop-low' });
    K.draw(S, '#w300', S.word('傳染給其他狗'), '箭頭傳到右邊兩隻狗');
    S.to(['#dg301', '#dg302'], { opacity: 1, duration: .4 }, S.word('傳染給其他狗', 0, .3));
    K.pop(S, ['#v301', '#v302'], S.word('把病毒傳給'), '右邊兩隻狗身上也冒出病毒', { stagger: .2, sfx: 'pop-low' });
    K.rise(S, '#r30', S.word('幼犬在疫苗'), '下方：幼犬保護力還沒建立完整 → 少接觸其他狗');
  },
});
