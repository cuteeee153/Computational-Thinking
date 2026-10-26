// 幕 28–30｜犬小病毒：俗稱小病毒、可能致命、幼犬和沒打完疫苗的成犬；1–2 天惡化；還沒症狀就會傳染。
K.scene('28', 1, {
  enter: 'push',
  visuals: ['左邊：「疾病 03」＋大字「犬小病毒腸炎」', '大字下方兩個標籤：藍色「俗稱：小病毒」、橘色「可能致命」', '右邊兩張卡「特別容易發生在」：幼犬、沒完成疫苗的成犬（打哈欠的黑柴＋被紅色斜線槓掉的針筒）'],
  mount: () => K.disHead('dh28', 3, '犬小病毒腸炎', { size: 112 }) +
    `<div class="pl b" id="p28" style="left:140px;top:450px">俗稱：小病毒</div>` +
    `<div class="pl o" id="sp28" style="left:440px;top:450px">可能致命</div>` +
    `<div class="note" id="n28" style="left:1000px;top:250px;font-size:28px;font-weight:700;color:#7C7772">特別容易發生在</div>` +
    `<div class="cd" id="c280" style="left:1000px;top:310px;width:360px;height:520px;padding:30px;text-align:center"><div style="height:330px;position:relative">${K.dog('sit', { x: 95, y: 110, w: 150 })}</div><div class="t">幼犬</div></div>` +
    `<div class="cd" id="c281" style="left:1400px;top:310px;width:380px;height:520px;padding:30px;text-align:center"><div style="height:330px;position:relative">${K.dog('yawn', { x: 60, y: 70, w: 150 })}<div class="ico" style="left:220px;top:20px;width:110px;height:110px">${K.ic('Syringe')}<i style="position:absolute;left:50%;top:-6px;width:10px;height:122px;margin-left:-5px;border-radius:5px;background:#E5484D;transform:rotate(45deg)"></i></div></div><div class="t" style="font-size:34px">沒完成疫苗的<br>成犬</div></div>`,
  init() { gsap.set('#dh28n', { yPercent: 110 }); },
  animate(S) {
    S.fromTo('#dh28', { opacity: 0 }, { opacity: 1, duration: .3 }, S.at(0));
    S.to('#dh28n', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '「犬小病毒腸炎」大字冒出');
    K.pop(S, '#p28', S.word('小病毒', 1), '念到「小病毒」：大字下方藍色標籤「俗稱：小病毒」');
    K.pop(S, '#sp28', S.word('致命', 0, -.2), '旁邊橘色標籤「可能致命」', { sfx: 'pop-card' });
    K.fadeIn(S, '#n28', S.word('特別容易'));
    K.rise(S, '#c280', S.word('幼犬'), '卡片「幼犬」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c281', S.word('沒有完成'), '卡片「沒完成疫苗的成犬」浮上', { sfx: 'pop-card' });
  },
});
K.scene('29', 1, {
  enter: 'wipe', bg: 'mint',
  visuals: ['問句「為什麼這麼危險？」（灰）→ 大標「病毒會嚴重破壞腸道」', '時間軸：左卡「一開始：沒精神、不太吃、發燒」→ 中間時鐘（在虛線上方）、虛線下方「1–2 天內」→ 右卡加橘框「嘔吐、帶血的便便」'],
  mount: () => K.h('h29', ['~為什麼這麼危險？', '病毒會嚴重破壞<b class="o">腸道</b>'], { x: 140, y: 180, size: 76 }) +
    `<div class="cd" id="c290" style="left:140px;top:480px;width:560px;height:330px;padding:44px"><div class="k" style="color:#9A9590">一開始</div><div class="t" style="margin-top:14px;line-height:1.5">沒精神<br>不太吃東西<br>發燒</div></div>` +
    `<div class="abs" id="m29" style="left:760px;top:455px;width:400px;text-align:center;z-index:2"><div style="width:150px;height:150px;margin:0 auto">${K.ic('Clock')}</div><div class="big" style="font-size:64px;margin-top:52px">1–2<span style="font-family:'Noto Sans TC';font-size:36px;font-weight:900"> 天內</span></div></div>` +
    `<svg class="abs" style="left:700px;top:620px;overflow:visible;z-index:0" width="520" height="40"><path id="ar29" d="M10 20 H500" stroke="#F97316" stroke-width="6" stroke-dasharray="14 12" fill="none"/></svg>` +
    `<div class="cd" id="c291" style="left:1220px;top:480px;width:560px;height:330px;padding:44px;box-shadow:${K.RING}"><div class="k">之後</div><div class="t" style="margin-top:14px;line-height:1.5;color:var(--or)">嘔吐<br>拉出帶血的便便</div></div>`,
  init() { K.hideLines('h29', 2); gsap.set('#ar29', { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h29', 1, S.at(0), '問句「為什麼這麼危險？」');
    S.to('#h291', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.word('因為病毒'), '念到「因為病毒」就出現大標「病毒會嚴重破壞腸道」');
    K.rise(S, '#c290', S.word('一開始'), '左卡「一開始：沒精神、不太吃、發燒」', { sfx: 'pop-card' });
    S.to('#ar29', { opacity: 1, duration: .3 }, S.word('一到兩天'));
    K.pop(S, '#m29', S.word('一到兩天'), '中間時鐘「1–2 天內」', { sfx: 'tick-soft' });
    K.rise(S, '#c291', S.word('嘔吐'), '右卡「嘔吐、拉出帶血的便便」加橘框', { sfx: 'pop-card' });
  },
});
K.scene('30', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['大標「還沒出現症狀」／「就可能傳染給其他狗」', '左邊開心玩球的狗（看起來沒事，身上藏著小病毒），箭頭傳到右邊兩隻狗（柯基、黃金獵犬），牠們身上冒出病毒', '下方：幼犬保護力還沒建立完整 → 少接觸其他狗（橘）'],
  mount: () => K.h('h30', ['還沒出現症狀', '~就可能傳染給其他狗'], { y: 170, size: 76 }) +
    K.dog('ball', { id: 'dg300', x: 140, y: 440, w: 300 }) + `<div class="pl" id="p30" style="left:150px;top:380px;font-size:26px;padding:10px 22px">看起來沒事</div>` +
    `<div class="ico" id="v300" style="left:350px;top:540px;width:80px;height:80px">${K.ic('Virus')}</div>` +
    K.arrow('w300', { x: 450, y: 480, w: 420, h: 160, d: 'M10 120 C 140 20, 280 20, 400 90' }) +
    K.dog('corgi', { id: 'dg301', x: 880, y: 430, w: 230 }) + K.dog('golden', { id: 'dg302', x: 1170, y: 400, w: 260 }) +
    `<div class="ico" id="v301" style="left:1010px;top:520px;width:80px;height:80px">${K.ic('Virus')}</div><div class="ico" id="v302" style="left:1330px;top:500px;width:80px;height:80px">${K.ic('Virus')}</div>` +
    `<div class="abs" id="r30" style="left:140px;top:860px;display:flex;gap:18px;align-items:center;font-size:34px;font-weight:900;white-space:nowrap"><span class="pl bt" style="position:static">幼犬：保護力還沒建立完整</span>→<span class="pl o" style="position:static">少接觸其他狗</span></div>`,
  init() { K.hideLines('h30', 2); gsap.set(['#dg300', '#dg301', '#dg302'], { opacity: 0, y: 40 }); gsap.set(['#v301', '#v302'], { opacity: 0 }); },
  animate(S) {
    K.lines(S, 'h30', 2, S.at(0), '大標先出「還沒出現症狀／就可能傳染給其他狗」');
    S.to(['#dg300', '#dg301', '#dg302'], { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.6)', stagger: .15 }, S.word('不一定要等到'), '下面三隻狗才依序出來');
    S.sfx(S.word('不一定要等到'), 'bounce', '狗出來：咚咚咚');
    K.pop(S, '#p30', S.word('出現症狀'), '左邊開心的狗：「看起來沒事」', { sfx: 'pop' });
    K.pop(S, '#v300', S.word('牠就可能'), '念到「牠就可能已經把病毒傳給其他狗狗了」：玩球的狗身上出現小病毒', { sfx: 'pop-low' });
    K.draw(S, '#w300', S.word('把病毒傳給', 0, -.3), '畫出箭頭');
    const tv = S.word('傳給其他狗狗', 0, -.1);
    S.fromTo('#v301', { opacity: 1, left: 350, top: 540 }, { left: 1010, top: 520, duration: 1, ease: 'power1.inOut', immediateRender: false }, tv, '小病毒順著箭頭傳給其他狗（玩球的狗身上的病毒留著）');
    S.fromTo('#v302', { opacity: 1, left: 350, top: 540 }, { left: 1330, top: 500, duration: 1.3, ease: 'power1.inOut', immediateRender: false }, tv + .15);
    S.sfx(tv, 'whoosh', '病毒傳過去：「咻」', { gain: .5 });
    S.sfx(tv + 1.2, 'pop-low', '傳到了：低音啵');
    K.rise(S, '#r30', S.word('幼犬在疫苗'), '下方：幼犬保護力還沒建立完整 → 少接觸其他狗');
  },
});
