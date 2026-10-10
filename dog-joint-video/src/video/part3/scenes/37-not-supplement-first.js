// 幕 37｜「這時候的保健品，不是先吃再說，而是要看獸醫評估後的分期建議」＋三步驟回顧，停格到 4:05
// 左、中卡片退場，「先看獸醫」卡移到左邊；右邊出現保健品罐「先吃再說」被劃掉，下面「依獸醫評估後的分期建議」。
// 接著全部退場，大標換成「狗狗關節保養該從什麼時候開始，三個步驟帶你判斷：」，下方三步驟一張張打勾，停格到 4:05（這段沒有旁白）。
Intro.scene({
  id: '37', title: '保健品不是先吃再說＋回顧', start: 232.8, end: 245,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 244.0,
  visuals: ["右上：保健品罐圖示＋灰字「保健品：先吃再說」（被橘線劃掉）", "右下橘框：夾板圖示＋「依獸醫評估後的」／「分期建議」", "回顧大標第一行：「狗狗關節保養該從什麼時候開始，」（黑）", "回顧大標第二行：「三個步驟帶你判斷：」（橘）", "三張步驟卡：STEP 01 有風險因子嗎？／STEP 02 有任何徵兆嗎？／STEP 03 下一步該做什麼？，各有橘色打勾圓圈"],
  motions: ["232.9 秒｜左、中卡片往下淡出", "233.1 秒｜「先看獸醫」卡移到左邊", "233.4 秒｜保健品罐與「保健品：先吃再說」出現", "234.4 秒｜「先吃再說」被劃掉、變淡", "235.3 秒｜「依獸醫評估後的分期建議」浮上來", "238.3 秒｜大標、卡片全部退場", "238.8 秒｜回顧大標第一行冒出", "239.1 秒｜回顧大標第二行冒出", "239.6 秒｜三張步驟卡依序浮上來", "240.5 秒｜三個勾勾依序彈出", "241.5 秒起｜停格到 4:05"],
  sfx: [
    [232.9, "whoosh", "左、中卡片退場：「咻」", { gain: 0.7 }],
    [233.4, "slide", "保健品罐出現：輕「咻」"],
    [234.4, "scribble", "「先吃再說」被劃掉：筆刷聲"],
    [235.3, "pop-card", "「分期建議」浮上：「啵」", { pitch: 1.12 }],
    [238.3, "whoosh", "全部退場：「咻」"],
    [239.6, "pop-card", "STEP 01 卡浮上：「啵」"],
    [239.9, "pop-card", "STEP 02 卡浮上：「啵」", { pitch: 1.12 }],
    [240.2, "pop-card", "STEP 03 卡浮上：「啵」", { pitch: 1.26 }],
    [240.5, "tick", "勾勾 1：「叮咚」"],
    [240.85, "tick", "勾勾 2：「叮咚」", { pitch: 1.12 }],
    [241.2, "tick", "勾勾 3：「叮咚」", { pitch: 1.26 }],
  ],
  mount: [
    { into: '#S6-mid', html: `
      <div id="mid37">
        <div class="abs" style="left:720px;top:470px;display:flex;align-items:center;gap:26px" id="pill37">
          <div style="width:170px;height:170px" id="pillIc"></div>
          <div style="position:relative;font-size:50px;font-weight:900;color:var(--mute);white-space:nowrap" id="pillTx">保健品：先吃再說<span class="abs" id="pillX" style="left:-6px;right:-6px;top:52%;height:6px;border-radius:3px;background:#E2620E;transform-origin:0 50%"></span></div>
        </div>
        <div class="abs card" style="left:720px;top:700px;width:1128px;height:250px;display:flex;align-items:center;gap:30px;padding:0 44px;box-shadow:0 0 0 4px #F97316,0 50px 90px -40px rgba(107,74,42,.35)" id="adv37">
          <div style="width:150px;height:150px;flex:none" id="advIc"></div>
          <div><div style="font-size:40px;font-weight:700">依獸醫評估後的</div><div style="font-size:76px;font-weight:900;letter-spacing:-.04em;color:var(--or);line-height:1.1">分期建議</div></div>
        </div>
      </div>
      <div class="h abs" style="left:72px;top:196px;font-size:96px" id="h7"><span class="ln"><span id="h71">狗狗關節保養該從什麼時候開始，</span></span><span class="ln"><span id="h72" class="o">三個步驟帶你判斷：</span></span></div>
      ${[['STEP 01', '有風險因子嗎？'], ['STEP 02', '有任何徵兆嗎？'], ['STEP 03', '下一步該做什麼？']].map(([n, t], i) =>
        `<div class="step card" id="rc${i}" style="left:${72 + i * 604}px"><div class="ck" id="rcck${i}">✓</div><div><div class="n">${n}</div><div class="t">${t}</div></div></div>`).join('')}` },
  ],
  assets() {
    pillIc.innerHTML = iconPill('pl37');
    advIc.innerHTML = iconClipboard('ad37');
  },
  init() {
    gsap.set(['#pill37', '#adv37'], { opacity: 0, y: 40 });
    gsap.set('#pillX', { scaleX: 0 });
    gsap.set(['#h71', '#h72'], { yPercent: 110 });
    gsap.set(['#rc0', '#rc1', '#rc2'], { opacity: 0, y: 50 });
    gsap.set(['#rcck0', '#rcck1', '#rcck2'], { scale: 0 });
  },
  animate({ L, E }) {
    L(['#do0', '#do1'], { opacity: 0, y: 60, duration: .5, ease: 'power3.in' }, 232.9);
    L('#do2', { x: 72 - 1280, duration: .8, ease: 'power3.inOut' }, 233.1);
    L('#pill37', { opacity: 1, y: 0, duration: .6, ease: E }, 233.4);
    L('#pillX', { scaleX: 1, duration: .4, ease: 'power2.inOut' }, 234.4);
    L('#pillTx', { opacity: .6, duration: .4 }, 234.7);
    L('#adv37', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 235.3);
    // 回顧
    L(['#h61', '#h62'], { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .08 }, 238.3);
    L(['#mid37', '#do2'], { opacity: 0, y: 40, duration: .5, ease: 'power3.in' }, 238.3);
    L('#h71', { yPercent: 0, duration: .8, ease: 'power4.out' }, 238.8);
    L('#h72', { yPercent: 0, duration: .8, ease: 'power4.out' }, 239.1);
    [0, 1, 2].forEach(i => L('#rc' + i, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 239.6 + i * .3));
    [0, 1, 2].forEach(i => L('#rcck' + i, { scale: 1, duration: .45, ease: 'back.out(3)' }, 240.5 + i * .35));
  },
});
