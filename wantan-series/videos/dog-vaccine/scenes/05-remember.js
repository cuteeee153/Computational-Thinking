// 幕 05｜先記住一句話：四張疾病卡，三張（核心疫苗）一組、狂犬病（台灣法律）一組；最後「其他疫苗 → 看生活環境、感染風險，和獸醫討論」。
K.DIS = [
  { t: '犬瘟熱', ic: 'Brain' }, { t: '犬小病毒', ic: 'Gut' }, { t: '犬傳染性肝炎', ic: 'Liver' }, { t: '狂犬病', ic: 'Badger' },
];
K.disCard = (id, k, x, y, w = 330) => `<div class="cd" id="${id}" style="left:${x}px;top:${y}px;width:${w}px;height:300px;padding:30px;text-align:center"><div class="ic" style="margin:0 auto;width:140px;height:140px">${K.ic(K.DIS[k].ic)}</div><div class="t" style="margin-top:20px;font-size:${K.DIS[k].t.length > 4 ? 36 : 42}px">${K.DIS[k].t}</div></div>`;
K.scene('05', -1, {
  enter: 'rise',
  visuals: ['小標「先記住一句話」；大標「台灣飼主一定要先認識」／「四種疾病」（灰）', '四張疾病卡依序浮上：犬瘟熱（腦）、犬小病毒（腸）、犬傳染性肝炎（肝）、狂犬病（鼬獾）', '前三張上方橘色括號「核心疫苗｜WSAVA、AAHA 都列入」；狂犬病上方藍色括號「台灣法律｜每年都要打」', '下方一排：其他疫苗 → 生活環境＋感染風險 → 和獸醫討論'],
  mount: () => K.kicker('k05', 'TIP', '先記住一句話', { y: 150 }) + K.h('h05', ['台灣飼主一定要先認識', '~四種疾病'], { y: 196, size: 76 }) +
    K.DIS.map((d, k) => K.disCard('d05' + k, k, 140 + k * 370 + (k === 3 ? 80 : 0), 520)).join('') +
    `<div class="abs" id="b05a" style="left:140px;top:440px;width:1070px;height:56px;border:5px solid var(--or-b);border-bottom:none;border-radius:24px 24px 0 0"></div><div class="pl o" id="p05a" style="left:400px;top:404px;font-size:28px;padding:10px 26px">核心疫苗｜WSAVA、AAHA 都列入</div>` +
    `<div class="abs" id="b05b" style="left:1330px;top:440px;width:330px;height:56px;border:5px solid var(--blue);border-bottom:none;border-radius:24px 24px 0 0"></div><div class="pl b" id="p05b" style="left:1330px;top:404px;font-size:28px;padding:10px 26px">台灣法律｜每年都要打</div>` +
    `<div class="abs" id="r05" style="left:140px;top:868px;display:flex;align-items:center;gap:18px;font-size:30px;font-weight:700;white-space:nowrap"><span class="pl gh" style="position:static">其他疫苗</span><span>→</span><span class="pl bt" style="position:static">生活環境</span><span>＋</span><span class="pl bt" style="position:static">感染風險</span><span>→</span><span class="pl ot" style="position:static">和獸醫一起討論</span></div>`,
  init() { K.hideLines('h05', 2); gsap.set(['#b05a', '#b05b'], { scaleX: 0 }); },
  animate(S) {
    S.fromTo('#k05', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h05', 2, S.at(1), '大標冒出');
    [['犬瘟熱', 0], ['犬小病毒', 1], ['肝炎', 2], ['狂犬病', 3]].forEach(([w, k]) => K.rise(S, '#d05' + k, S.word(w), k ? '' : '念到時四張疾病卡依序浮上', { sfx: 'pop-card' }));
    S.to('#b05a', { scaleX: 1, duration: .6, ease: 'power3.out' }, S.word('前三種'), '前三張上方畫出橘色括號');
    K.pop(S, '#p05a', S.word('核心疫苗'), '「核心疫苗」標籤彈出', { sfx: 'ding-soft' });
    S.to('#b05b', { scaleX: 1, duration: .6, ease: 'power3.out' }, S.word('狂犬病則是'), '狂犬病上方畫出藍色括號');
    K.pop(S, '#p05b', S.word('法律規定'), '「台灣法律｜每年都要打」標籤彈出', { sfx: 'ding-soft' });
    K.rise(S, '#r05', S.word('其他疫苗'), '下方一排：其他疫苗 → 生活環境＋感染風險 → 和獸醫討論');
  },
});
