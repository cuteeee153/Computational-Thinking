// 幕 45｜收尾：「最後提醒，這支影片是保養方向的參考，不能取代獸醫診斷。如果你的狗已經有跛行、僵硬、上下車遲疑，
//          請先帶去檢查。保健品和居家保養，永遠是診斷之後的第二步。」（旁白還沒錄，時間是預估）
// 米色畫面由右蓋過真實畫面，小標「最後提醒」打出、大標兩行冒出；下方卡片：三個症狀 → 「先帶去檢查」；
// 最後一行「永遠是診斷之後的第二步」；之後全部淡出，中間出現頻道 logo 停格。
Intro.scene({
  id: '45', title: '最後提醒＋片尾', start: 351.5, end: 368.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 364.5,
  visuals: ["米色畫面（由右邊蓋進來），頻道名稱變回黑字", "小標「最後提醒」", "大標：「這支影片是保養方向的參考，」（黑）／「不能取代獸醫診斷。」（橘）", "白色卡片：「如果你的狗已經有」＋三個橘色標籤「跛行」「僵硬」「上下車遲疑」→ 橘色按鈕「請先帶去檢查」", "下方一行大字：「保健品和居家保養，永遠是診斷之後的」＋橘底白字「第二步」", "片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」"],
  motions: ["351.5 秒｜米色畫面由右往左蓋過來，約 0.85 秒", "352.3 秒｜小標逐字打出", "353.45 秒｜大標第一行冒出", "355.3 秒｜大標第二行冒出", "356.86 秒｜卡片浮上來", "357.9 秒起｜三個症狀標籤依序彈出", "359.8 秒｜「請先帶去檢查」滑入", "361.09 秒｜最後一行由下浮上", "363.6 秒｜「第二步」橘底彈出", "365.2 秒｜全部淡出，片尾 logo 出現，停格到結尾"],
  sfx: [
    [351.5, "whoosh-big", "米色畫面蓋上來：大「咻」"],
    [356.86, "slide", "卡片浮上：輕「咻」"],
    [357.9, "pop-card", "跛行：「啵」"],
    [358.44, "pop-card", "僵硬：「啵」", { pitch: 1.12 }],
    [358.91, "pop-card", "上下車遲疑：「啵」", { pitch: 1.26 }],
    [359.8, "tick", "請先帶去檢查：「叮咚」"],
    [363.6, "ding-soft", "第二步：輕「叮」"],
    [365.2, "whoosh", "片尾：「咻」", { gain: 0.6 }],
  ],
  mount: [
    { into: '#S9', html: `
      <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e9" data-text="最後提醒"></div></div>
      <div class="h abs" style="left:72px;top:196px;font-size:96px"><span class="ln"><span id="h91">這支影片是保養方向的參考，</span></span><span class="ln"><span id="h92" class="o">不能取代獸醫診斷。</span></span></div>
      <div class="vet card" id="vet"><span class="lb">如果你的狗已經有</span><span class="sym" id="sy0">跛行</span><span class="sym" id="sy1">僵硬</span><span class="sym" id="sy2">上下車遲疑</span><span class="ar" id="var">→</span><span class="go" id="vgo">請先帶去檢查</span></div>
      <div class="last" id="last">保健品和居家保養，永遠是診斷之後的<span class="two" id="two">第二步</span></div>
      <div id="S9end"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>` },
  ],
  init() {
    gsap.set('#S9', { xPercent: 100 });
    gsap.set(['#h91', '#h92'], { yPercent: 110 });
    gsap.set('#vet', { opacity: 0, y: 50 });
    gsap.set(['#sy0', '#sy1', '#sy2'], { opacity: 0, scale: .6 });
    gsap.set(['#var', '#vgo'], { opacity: 0, x: -20 });
    gsap.set('#last', { opacity: 0, y: 40 });
    gsap.set('#two', { scale: .6, opacity: 0 });
    gsap.set('#S9end', { opacity: 0 });
    gsap.set('#S9end i', { scale: .7 });
  },
  animate({ L, E, type }) {
    L('#S9', { xPercent: 0, duration: .85, ease: 'power3.inOut' }, 351.5);
    L('#logo', { color: '#231B15', duration: .4 }, 351.7);
    type('#e9', 352.3, .5);
    L('#h91', { yPercent: 0, duration: .8, ease: 'power4.out' }, 353.45);
    L('#h92', { yPercent: 0, duration: .8, ease: 'power4.out' }, 355.3);
    L('#vet', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 356.86);
    L('#sy0', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 357.9);
    L('#sy1', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 358.44);
    L('#sy2', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, 358.91);
    L(['#var', '#vgo'], { opacity: 1, x: 0, duration: .5, ease: E, stagger: .1 }, 359.8);
    L('#last', { opacity: 1, y: 0, duration: .6, ease: E }, 361.09);
    L('#two', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2.4)' }, 363.6);
    L('#logo', { opacity: 0, duration: .5 }, 365.2);
    L('#S9end', { opacity: 1, duration: .7 }, 365.2);
    L('#S9end i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, 365.2);
  },
});
