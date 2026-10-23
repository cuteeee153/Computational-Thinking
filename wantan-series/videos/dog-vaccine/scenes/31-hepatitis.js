// 幕 31–35｜犬傳染性肝炎：第一型犬腺病毒、口腔攝入；康復後尿液帶病毒 6 個月；少見但不能忽略；四種病的共同點；有症狀看獸醫。
K.scene('31', 1, {
  enter: 'push',
  visuals: ['左邊：「疾病 04」＋大字「犬傳染性肝炎」，病毒標籤「第一型犬腺病毒」', '右邊三個來源標籤：尿液、糞便、口水 → 箭頭指向黑柴的嘴「經由口腔」'],
  mount: () => K.disHead('dh31', 4, '犬傳染性肝炎', { size: 112 }) +
    `<div class="pl ot" id="p31" style="left:140px;top:470px">${K.ic('Virus')}第一型犬腺病毒</div>` + K.tile('Liver', { id: 't31', x: 640, y: 440, size: 150, rot: 6 }) +
    ['尿液', '糞便', '口水'].map((t, k) => `<div class="pl" id="s31${k}" style="left:${980}px;top:${300 + k * 130}px;font-size:34px">${t}</div>`).join('') +
    K.arrow('w31', { x: 1150, y: 330, w: 240, h: 260, d: 'M10 130 C 90 130, 150 120, 225 110' }) +
    `<div class="pl b" id="p312" style="left:1100px;top:720px">經由口腔吃進病毒</div>` +
    K.dog('sit', { id: 'dg31', x: 1400, y: 300, w: 380 }),
  init() { gsap.set('#dh31n', { yPercent: 110 }); },
  animate(S) {
    S.fromTo('#dh31', { opacity: 0 }, { opacity: 1, duration: .3 }, S.at(0));
    S.to('#dh31n', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(0), '「犬傳染性肝炎」大字冒出');
    K.pop(S, '#t31', S.word('第四種'), '肝臟圖示磚', { sfx: 'pop-card' });
    K.pop(S, '#p31', S.word('第一型'), '病毒標籤「第一型犬腺病毒」', { sfx: 'pop' });
    ['尿液', '糞便', '口水'].forEach((w, k) => K.pop(S, '#s31' + k, S.word(w), k ? '' : '念到時三個來源標籤依序彈出', { pitch: 1 + k * .1 }));
    K.draw(S, '#w31', S.word('口腔', 0, -.3), '箭頭指向黑柴的嘴');
    K.pop(S, '#p312', S.word('口腔'), '「經由口腔吃進病毒」', { sfx: 'ding-soft' });
  },
});
K.scene('32', 1, {
  enter: 'push', bg: 'mint',
  visuals: ['左邊：月曆磚＋「康復後，尿液仍可能帶病毒」＋大字「至少 6 個月」（數字跑上去）', '右邊：症狀程度長條，由「輕微發燒」漸層到「死亡」；下方標籤「年紀很小的幼犬風險最高」'],
  mount: () => K.tile('Calendar', { id: 't32', x: 140, y: 200, size: 170, rot: -4 }) +
    `<div class="abs" id="b32" style="left:140px;top:420px;width:760px"><div style="font-size:34px;font-weight:900;color:#7C7772">康復後，尿液仍可能帶病毒</div><div style="display:flex;align-items:baseline;gap:14px;margin-top:10px"><span style="font-size:52px;font-weight:900">至少</span><span class="big" id="n32" style="font-size:220px;color:var(--or)">0</span><span style="font-size:52px;font-weight:900">個月</span></div></div>` +
    `<div class="cd" id="c32" style="left:1000px;top:250px;width:780px;height:440px;padding:46px"><div class="k">感染之後的症狀</div>
      <div style="position:relative;margin-top:60px;height:60px;border-radius:30px;background:#ECEAE7;overflow:hidden"><i id="br32" style="position:absolute;left:0;top:0;bottom:0;width:100%;border-radius:30px;background:linear-gradient(90deg,#FFD9B8,#F97316 60%,#B83A0B)"></i></div>
      <div style="display:flex;justify-content:space-between;margin-top:20px;font-size:30px;font-weight:900"><span>輕微發燒</span><span class="o">嚴重疾病・死亡</span></div></div>` +
    `<div class="pl o" id="p32" style="left:1000px;top:740px">年紀很小的幼犬風險最高</div>`,
  init() { gsap.set('#br32', { scaleX: 0, transformOrigin: '0 50%' }); },
  animate(S) {
    K.pop(S, '#t32', S.word('康復'), '月曆圖示磚', { sfx: 'pop-card' });
    K.rise(S, '#b32', S.word('康復'), '「康復後，尿液仍可能帶病毒」');
    K.count(S, '#n32', 0, 6, S.word('六個月', 0, -.3), .8, '數字跑到「至少 6 個月」');
    S.sfx(S.word('六個月'), 'ding-soft', '6 個月：輕「叮」');
    K.rise(S, '#c32', S.word('感染之後'), '右邊症狀程度卡浮上', { sfx: 'pop-card' });
    S.to('#br32', { scaleX: 1, duration: 1.6, ease: 'power2.inOut' }, S.word('輕微發燒'), '長條由「輕微發燒」長到「死亡」');
    K.pop(S, '#p32', S.word('幼犬風險'), '「年紀很小的幼犬風險最高」', { sfx: 'pop-card' });
  },
});
K.scene('33', 1, {
  enter: 'rise',
  visuals: ['左卡藍框「好消息」：疫苗接種普及的地區，已經比較少見（盾牌）', '右卡橘框「不過」：還是有零星病例，不能忽略（注意圖示）'],
  mount: () => `<div class="cd" id="c330" style="left:140px;top:280px;width:780px;height:460px;padding:50px;box-shadow:0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)"><div class="k" style="color:var(--blue)">好消息</div><div class="ic" style="width:150px;height:150px;margin-top:20px">${K.ic('Shield')}</div><div class="t" style="margin-top:20px">疫苗接種普及的地區<br>已經<span class="bl">比較少見</span></div></div>` +
    `<div class="cd" id="c331" style="left:1000px;top:280px;width:780px;height:460px;padding:50px;box-shadow:${K.RING}"><div class="k">不過</div><div class="ic" style="width:150px;height:150px;margin-top:20px">${K.ic('Warning')}</div><div class="t" style="margin-top:20px">還是有零星病例<br><span class="o">不能完全忽略</span></div></div>`,
  animate(S) {
    K.rise(S, '#c330', S.word('好消息'), '左卡「好消息：比較少見」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c331', S.word('不過'), '右卡「不過：零星病例，不能忽略」浮上', { sfx: 'pop-card' });
  },
});
K.scene('34', 1, {
  enter: 'zoom', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）四張疾病卡回到一排，上方愛心＋大標「共同點：都可能危及生命」', '下方括號：三張 → 核心疫苗（橘）；狂犬病 → 台灣法律規定（藍）'],
  mount: () => K.tile('Heart', { id: 't34', x: 140, y: 170, size: 150, rot: -6 }) + K.h('h34', ['共同點：<b class="o">都可能危及生命</b>'], { x: 330, y: 200, size: 76 }) +
    [3, 0, 1, 2].map((k, i) => K.disCard('d34' + i, k, X17[i] + (i ? 80 : 0), 400, 300)).join('') +
    `<div class="abs" id="b340" style="left:600px;top:720px;width:960px;height:50px;border:5px solid var(--or-b);border-top:none;border-radius:0 0 24px 24px"></div><div class="pl o" id="p340" style="left:900px;top:790px">核心疫苗</div>` +
    `<div class="abs" id="b341" style="left:140px;top:720px;width:300px;height:50px;border:5px solid var(--blue);border-top:none;border-radius:0 0 24px 24px"></div><div class="pl b" id="p341" style="left:150px;top:790px">台灣法律規定</div>`,
  init() { K.hideLines('h34', 1); gsap.set(['#b340', '#b341'], { scaleX: 0 }); },
  animate(S) {
    [0, 1, 2, 3].forEach(i => K.rise(S, '#d34' + i, S.at(0) + i * .12, i ? '' : '四張疾病卡回到一排', { sfx: i ? false : 'whoosh', dy: 60 }));
    K.pop(S, '#t34', S.word('共同點'), '愛心圖示磚', { sfx: 'pop-card' });
    K.lines(S, 'h34', 1, S.word('都可能造成'), '大標「共同點：都可能危及生命」');
    S.sfx(S.word('生命'), 'tick', '重點：「叮咚」');
    S.to('#b340', { scaleX: 1, duration: .6, ease: 'power3.out' }, S.word('這也是為什麼'), '三張下方畫出橘色括號「核心疫苗」');
    K.pop(S, '#p340', S.word('核心疫苗'), '', { sfx: 'ding-soft' });
    S.to('#b341', { scaleX: 1, duration: .6, ease: 'power3.out' }, S.word('狂犬病在台灣', 0, -.2), '狂犬病下方藍色括號「台灣法律規定」');
    K.pop(S, '#p341', S.word('法律規定'), '', { sfx: 'ding-soft' });
  },
});
K.scene('35', 1, {
  enter: 'rise', bg: 'mint',
  visuals: ['（這一幕還沒有錄音）小標「最後提醒」；大標「出現症狀，別自己判斷」／「盡快帶去看獸醫」（橘）', '右邊：動物醫院圖示＋趴著的黑柴；橘色按鈕「看獸醫」'],
  mount: () => K.kicker('k35', 'NOTE', '最後提醒一下', { y: 260 }) + K.h('h35', ['出現症狀，別自己判斷', '<b class="o">盡快帶去看獸醫</b>'], { y: 320, size: 84 }) +
    `<div class="note" id="n35" style="left:140px;top:560px;font-size:30px;font-weight:700;color:#7C7772">尤其是還沒打完疫苗的幼犬</div>` +
    K.tile('Clinic', { id: 't35', x: 1300, y: 260, size: 260, rot: -4 }) + K.dog('rest', { id: 'dg35', x: 1260, y: 580, w: 420 }),
  init() { K.hideLines('h35', 2); },
  animate(S) {
    S.fromTo('#k35', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.fadeIn(S, '#n35', S.word('尤其是'), '小字「尤其是還沒打完疫苗的幼犬」');
    K.lines(S, 'h35', 2, S.word('不要自己判斷'), '大標「出現症狀，別自己判斷／盡快帶去看獸醫」', .9);
    K.pop(S, '#t35', S.word('看獸醫', 0, -.3), '動物醫院圖示磚', { sfx: 'pop-card' });
    S.fromTo('#dg35', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.word('看獸醫'));
  },
});
