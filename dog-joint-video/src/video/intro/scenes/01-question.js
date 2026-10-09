// 幕 01｜開場：一個問題，第一個答案「七歲」
// 聊天卡片從畫面中央浮上來，使用者問「到底幾歲開始？」，輸入中的三個點跳動後，跳出文章 A。
Intro.scene({
  id: '01', title: '開場：問題與文章 A（七歲）', start: 0, end: 2.8,
  narration: [[0.5, 2.6, '七歲才要顧關節？']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 2.6,
  visuals: ["左上角頻道名稱「狗關節保養」，右上角標語「不是幾歲．是風險等級」", "畫面中央一張聊天卡片，標題「我家這隻的關節」，左邊是狗的大頭貼", "使用者泡泡：「狗關節保養，到底幾歲開始？」", "回答泡泡：「文章 A：老狗七歲才要開始顧。」", "小標籤「7 歲？」", "背景左側淡淡的大數字 7"],
  motions: ["0.1 秒｜頻道名稱和標語由上往下淡入", "0.15 秒｜聊天卡片從下方浮上來", "0.45 秒｜使用者泡泡彈出", "0.85 秒｜出現「輸入中」三個點並跳動", "1.55 秒｜文章 A 泡泡彈出；背景大數字 7 浮現並緩慢漂移", "2.1 秒｜「7 歲？」標籤彈出", "2.3 秒｜卡片小字從「正在搜尋⋯」換成「搜尋了 3 篇文章」"],
  mount: [
    { into: '#chrome', html: `
      <div class="logo" id="logo"><i id="paw"></i>狗關節保養</div>
      <div class="tagline" id="tagline">不是幾歲．是風險等級</div>` },
    { into: '#A-bg', html: `<div class="ghost" id="g7" style="left:120px;top:120px;font-size:760px">7</div>` },
    { into: '#A-card', html: `
      <div class="card abs" id="chat" style="left:1110px;top:150px;width:740px;height:830px">
        <div style="display:flex;align-items:center;gap:22px;padding:34px 40px;border-bottom:1.5px solid var(--line)">
          <div style="width:76px;height:76px;border-radius:50%;background:#F6E3CC;overflow:hidden;display:flex;align-items:flex-end;justify-content:center"><div style="width:84px;margin-bottom:-26px" id="dogA"></div></div>
          <div style="position:relative"><div style="font-weight:700;font-size:32px">我家這隻的關節</div>
            <div id="subs" style="font-size:22px;color:var(--mute);margin-top:4px;height:32px;position:relative"><span id="sub1" class="abs" style="left:0;top:0;white-space:nowrap">正在搜尋⋯</span><span id="sub2" class="abs" style="left:0;top:0;white-space:nowrap">搜尋了 3 篇文章</span></div></div>
        </div>
        <div style="padding:36px 40px;display:flex;flex-direction:column;gap:22px">
          <div style="align-self:flex-end" class="bub me" id="q">狗關節保養，到底幾歲開始？</div>
          <div style="display:flex;gap:18px;align-items:flex-start"><div class="av" id="av"></div>
            <div id="answers" style="display:flex;flex-direction:column;gap:16px;position:relative">
              <div class="dots abs" id="dots" style="left:0;top:0"><i></i><i></i><i></i></div>
              <div class="bub" id="bA">文章 A：老狗<b style="color:var(--or)">七歲</b>才要開始顧。</div>
            </div></div>
          <div id="chips" style="display:flex;gap:14px;margin-left:80px">
            <span class="pill" id="c7"><b>7</b>歲？</span>
          </div>
        </div>
        <div style="position:absolute;left:40px;right:40px;bottom:36px" class="input" id="inp"><span id="inpText" data-text=""></span><span class="caret" id="caret"></span><div class="send" id="send">↑</div></div>
      </div>` },
  ],
  assets() {
    Intro.dog('#dogA', { id: 'da', tilt: -10, mood: 'curious' });
    paw.innerHTML = '<div style="width:24px;height:24px">' + iconPaw('#fff') + '</div>';
    av.innerHTML = '<div style="width:32px;height:32px">' + iconPaw('#fff') + '</div>';
  },
  init() {
    gsap.set(['#logo', '#tagline'], { opacity: 0, y: -12 });
    gsap.set('#chat', { x: -520, y: 60, opacity: 0 });         // 先停在畫面中央（第 04 幕才移到右邊）
    gsap.set(['#q', '#bA'], { opacity: 0, scale: .85, y: 16 });
    gsap.set('#dots', { opacity: 0 });
    gsap.set('#c7', { opacity: 0, scale: .6 });
    gsap.set('#g7', { opacity: 0, scale: .9 });
    gsap.set('#sub2', { opacity: 0, y: 10 });
  },
  animate({ tl, L, E }) {
    L(['#logo', '#tagline'], { opacity: 1, y: 0, duration: .6, ease: E }, 0.1);
    L('#chat', { opacity: 1, y: 0, duration: .8, ease: E }, 0.15);
    L('#q', { opacity: 1, scale: 1, y: 0, duration: .45, ease: 'back.out(1.6)' }, 0.45);
    // 輸入中…
    L('#dots', { opacity: 1, duration: .2 }, 0.85);
    tl.fromTo('#dots i', { y: 0 }, { y: -8, duration: .22, yoyo: true, repeat: 3, stagger: .08, ease: 'sine.inOut' }, 0.9);
    L('#dots', { opacity: 0, duration: .15 }, 1.55);
    // 文章 A：七歲
    L('#bA', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.5)' }, 1.55);
    L('#g7', { opacity: 1, scale: 1, duration: 1.2, ease: E }, 1.55);
    L('#c7', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 2.1);
    L('#sub1', { opacity: 0, y: -10, duration: .3 }, 2.3);
    L('#sub2', { opacity: 1, y: 0, duration: .3 }, 2.4);
    L('#g7', { x: -30, y: 20, duration: 9, ease: 'none' }, 1.55);   // 背景大數字緩慢漂移
  },
});
