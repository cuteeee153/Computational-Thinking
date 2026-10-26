// 幕 25–27｜犬瘟熱：傳染力強、影響全身、飛沫傳染 → 症狀地圖 → 腦部和神經，好轉後仍可能惡化，可能致命。
K.scene('25', 1, {
  enter: 'push', bg: 'sky',
  visuals: ['左邊：「疾病 02」＋超大字「犬瘟熱」', '大字下方一排標籤，念到時依序出現：傳染力很強（橘）→ 可能影響全身 → 飛沫傳染（藍）', '右邊大黑柴；念到「全身」時全身亮起橘色光暈', '念到「飛沫」：「可能影響全身」下方打噴嚏的狗噴出一顆顆飛沫，飄向右邊的狗'],
  mount: () => K.disHead('dh25', 2, '犬瘟熱') +
    `<div class="pl o" id="p250" style="left:140px;top:470px">傳染力很強</div>` +
    K.dog('sit', { id: 'dg25', x: 1340, y: 300, w: 400 }) + `<div class="pl ot" id="p251" style="left:400px;top:470px">可能影響全身</div>` +
    K.dog('sneeze', { id: 'dg25b', x: 400, y: 580, w: 250 }) + `<div class="note" id="n25" style="left:430px;top:950px">生病的狗</div>` +
    [0, 1, 2, 3, 4, 5].map(k => `<div class="ico" id="dp25${k}" style="left:680px;top:${640 + (k % 3) * 60}px;width:${70 + (k % 2) * 30}px;height:${70 + (k % 2) * 30}px">${K.ic('Droplets')}</div>`).join('') +
    `<div class="pl b" id="p252" style="left:690px;top:470px">飛沫傳染</div>`,
  init() { gsap.set('#dh25n', { yPercent: 110 }); gsap.set(['#dg25b', '#n25'], { opacity: 0 }); gsap.set('[id^=dp25]', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#dh25', { opacity: 0 }, { opacity: 1, duration: .3 }, S.at(0));
    S.to('#dh25n', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '「犬瘟熱」大字冒出');
    K.pop(S, '#p250', S.word('傳染力很強'), '「傳染力很強」橘色標籤', { sfx: 'pop-card' });
    S.fromTo('#dg25 img', { filter: 'drop-shadow(0 0 0px rgba(249,115,22,0))' }, { filter: 'drop-shadow(0 0 40px rgba(249,115,22,.85))', duration: .6, yoyo: true, repeat: 1 }, S.word('全身'), '念到「全身」黑柴全身亮起橘色光暈');
    K.pop(S, '#p251', S.word('全身'), '「可能影響全身」標籤', { sfx: 'ding-soft' });
    S.to(['#dg25b', '#n25'], { opacity: 1, duration: .4 }, S.word('生病動物', 0, -.1), '念到「生病動物」：「可能影響全身」標籤下方出現打噴嚏的狗');
    [0, 1, 2, 3, 4, 5].forEach(k => {
      const t = S.word('飛沫', 0, -.2) + k * .18;
      S.fromTo('#dp25' + k, { opacity: 0, x: 0, y: 0, scale: .5 }, { opacity: 1, x: 560 + k * 30, y: -200 + (k % 3) * 40, scale: 1, duration: 2.2, ease: 'sine.inOut' }, t, k ? '' : '飛沫一顆顆從生病的狗飄向右邊的狗');
    });
    S.sfx(S.word('飛沫', 0, -.2), 'whoosh', '飛沫飄過去：「咻」', { gain: .5 });
    K.pop(S, '#p252', S.word('飛沫'), '「飛沫傳染」藍色標籤', { sfx: 'pop-card' });
    S.to('#dg25', { x: -12, duration: .08, yoyo: true, repeat: 5 }, S.word('受到感染'), '右邊的狗抖一下（被感染）');
  },
});
const SYM26 = [
  { at: '發燒', t: '發燒', ic: 'Thermometer', x: 260, y: 220, px: 920, py: 330 },
  { at: '分泌物', t: '眼睛、鼻子有分泌物', ic: 'Droplets', x: 1270, y: 220, px: 1000, py: 420 },
  { at: '拉肚子', t: '拉肚子', ic: 'Gut', x: 260, y: 620, px: 930, py: 760 },
  { at: '肺部發炎', t: '肺部發炎', ic: 'Lungs', x: 1270, y: 620, px: 990, py: 600 },
];
K.scene('26', 1, {
  enter: 'zoom',
  visuals: ['中間大大的黑柴，四周四個症狀標籤，念到時依序出現、拉一條線指到身上：發燒、眼睛鼻子有分泌物、拉肚子、肺部發炎'],
  mount: () => `<div class="abs" style="left:0;top:150px;width:1920px;text-align:center;font-size:40px;font-weight:900" id="h26">感染後會出現什麼症狀？</div>` +
    `<svg class="abs" style="left:0;top:0" width="1920" height="1080">${SYM26.map((s, k) => `<path id="ln26${k}" d="M${s.x < 900 ? s.x + 330 : s.x} ${s.y + 70} L${s.px} ${s.py}" stroke="#16130F" stroke-width="3" stroke-dasharray="8 8" fill="none"/><circle id="pt26${k}" cx="${s.px}" cy="${s.py}" r="12" fill="#F97316" stroke="#fff" stroke-width="4"/>`).join('')}</svg>` +
    K.dog('sick', { id: 'dg26', x: 755, y: 230, w: 430 }) +
    SYM26.map((s, k) => `<div class="cd" id="s26${k}" style="left:${s.x}px;top:${s.y}px;width:330px;padding:24px 28px;display:flex;align-items:center;gap:18px"><div style="width:84px;height:84px;flex:none">${K.ic(s.ic)}</div><div style="font-size:${s.t.length > 6 ? 26 : 34}px;font-weight:900;line-height:1.3">${s.t}</div></div>`).join(''),
  init() { SYM26.forEach((_, k) => gsap.set(['#ln26' + k, '#pt26' + k], { opacity: 0 })); },
  animate(S) {
    K.fadeIn(S, '#h26', S.at(0), '標題「感染後會出現什麼症狀？」');
    SYM26.forEach((s, k) => {
      const t = S.word(s.at, 0, -.2);
      K.pop(S, '#s26' + k, t, k ? '' : '念到時症狀卡依序彈出、拉線指到狗身上', { sfx: 'pop-card', pitch: 1 + k * .07 });
      S.to(['#ln26' + k, '#pt26' + k], { opacity: 1, duration: .3 }, t + .2);
    });
  },
});
K.scene('27', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['左邊：腦的圖示磚＋大標「還可能影響」／「腦部和神經系統」（橘）', '右邊折線圖：症狀先好轉往下；念到「之後仍可能出現神經方面的問題」橘線往上，「神經問題／持續惡化」同時浮現', '最後橘色印章「沒打疫苗：犬瘟熱可能致命」'],
  mount: () => K.tile('Brain', { id: 't27', x: 140, y: 230, size: 220, rot: -5 }) + K.h('h27', ['還可能影響', '<b class="o">腦部和神經系統</b>'], { y: 500, size: 76 }) +
    `<div class="cd" id="c27" style="left:1000px;top:220px;width:780px;height:520px;padding:40px">
      <svg width="700" height="440" style="overflow:visible"><path d="M20 400 H690" stroke="#E4E1DC" stroke-width="4"/>
        <path id="g27a" pathLength="1" d="M30 80 C 120 90, 200 300, 300 320" fill="none" stroke="#9A9590" stroke-width="10" stroke-linecap="round"/>
        <path id="g27b" pathLength="1" d="M300 320 C 400 330, 480 220, 560 150 S 660 60, 690 40" fill="none" stroke="#F97316" stroke-width="10" stroke-linecap="round"/>
        <circle id="g27c" cx="300" cy="320" r="14" fill="#9A9590"/></svg>
      <div class="abs" id="g27l1" style="left:250px;top:390px;font-size:28px;font-weight:900;color:#7C7772">症狀好轉</div>
      <div class="abs" id="g27l2" style="left:400px;top:110px;font-size:28px;font-weight:900;color:var(--or)">神經問題<br>持續惡化</div></div>` +
    `<div class="stamp" id="sp27" style="left:1040px;top:790px">沒打疫苗：犬瘟熱可能致命</div>`,
  init() { K.hideLines('h27', 2); gsap.set(['#g27a', '#g27b'], { strokeDasharray: 1, strokeDashoffset: 1 }); gsap.set(['#g27c', '#g27l1', '#g27l2'], { opacity: 0 }); },
  animate(S) {
    K.pop(S, '#t27', S.word('腦部'), '腦的圖示磚彈出', { sfx: 'pop-card' });
    K.lines(S, 'h27', 2, S.word('腦部', 0, .1), '大標「還可能影響／腦部和神經系統」');
    K.rise(S, '#c27', S.word('有些狗狗'), '右邊折線圖卡浮上', { sfx: 'pop-card' });
    S.to('#g27a', { strokeDashoffset: 0, duration: 1, ease: 'power2.inOut' }, S.word('好轉', 0, -.4), '灰線往下：症狀好轉');
    S.to(['#g27c', '#g27l1'], { opacity: 1, duration: .3 }, S.word('好轉', 0, .4));
    S.sfx(S.word('好轉', 0, -.4), 'draw', '畫線：筆刷聲', { dur: 1, gain: .5 });
    S.to('#g27b', { strokeDashoffset: 0, duration: 1, ease: 'power2.out' }, S.word('之後仍可能', 0, -.15), '念到「之後仍可能出現神經方面的問題」：橘線往上，字同時浮現');
    S.fromTo('#g27l2', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: .5 }, S.word('之後仍可能'));
    S.sfx(S.word('之後仍可能'), 'draw', '畫線：筆刷聲', { dur: 1.4, gain: .5 });
    K.stamp(S, '#sp27', S.word('致命', 0, -.3), '橘色印章「沒打疫苗：犬瘟熱可能致命」');
  },
});
