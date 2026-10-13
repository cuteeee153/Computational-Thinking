// 幕 04｜最後提醒＋片尾（系列固定版型）：小標「最後提醒」、大標兩行、症狀卡 → 「請先帶去檢查」、最後一行「第二步」，
// 之後全部淡出，中間出現頻道 logo 停格到結尾（script.json 這一幕的 post 留 3.6 秒給片尾）。
const SYMS = ['跛行', '僵硬', '上下車遲疑'];
WT.scene('04', {
  enter: 'slide',
  visuals: ['小標「最後提醒」', '大標：「這支影片是保養方向的參考，」（黑）／「不能取代獸醫診斷。」（橘）',
    `白色卡片：「如果你的狗已經有」＋三個橘色標籤${SYMS.map(s => `「${s}」`).join('')} → 橘色按鈕「請先帶去檢查」`,
    '下方一行大字：「保健品和居家保養，永遠是診斷之後的」＋橘底白字「第二步」', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」'],
  mount: () => `
    <div class="abs" style="left:72px;top:140px"><div class="eyebrow" id="e4" data-text="最後提醒"></div></div>
    <div class="h abs" style="left:72px;top:196px;font-size:96px"><span class="ln"><span id="h41">這支影片是保養方向的參考，</span></span><span class="ln"><span id="h42" class="o">不能取代獸醫診斷。</span></span></div>
    <div class="vet card" id="vet"><span class="lb">如果你的狗已經有</span>${SYMS.map((s, k) => `<span class="sym" id="sy${k}">${s}</span>`).join('')}<span class="ar" id="var">→</span><span class="go" id="vgo">請先帶去檢查</span></div>
    <div class="last" id="last">保健品和居家保養，永遠是診斷之後的<span class="two" id="two">第二步</span></div>
    <div class="endcard" id="end4"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() {
    gsap.set(['#h41', '#h42'], { yPercent: 110 });
    gsap.set('#vet', { opacity: 0, y: 50 });
    gsap.set(SYMS.map((_, k) => '#sy' + k), { opacity: 0, scale: .6 });
    gsap.set(['#var', '#vgo'], { opacity: 0, x: -20 });
    gsap.set('#last', { opacity: 0, y: 40 });
    gsap.set('#two', { scale: .6, opacity: 0 });
    gsap.set('#end4', { opacity: 0 });
    gsap.set('#end4 i', { scale: .7 });
  },
  animate(S) {
    S.type('#e4', S.at(0), .5, '小標逐字打出');
    S.to('#h41', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(1), '大標第一行冒出');
    S.to('#h42', { yPercent: 0, duration: .8, ease: 'power4.out' }, S.at(2), '大標第二行冒出');
    S.to('#vet', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.word('如果'), '卡片浮上來');
    S.sfx(S.word('如果'), 'slide', '卡片浮上：輕「咻」');
    SYMS.forEach((s, k) => {
      S.to('#sy' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(s), k ? '' : '念到症狀時標籤依序彈出');
      S.sfx(S.word(s), 'pop-card', `${s}：「啵」`, { pitch: [1, 1.12, 1.26][k] });
    });
    S.to(['#var', '#vgo'], { opacity: 1, x: 0, duration: .5, ease: 'power3.out', stagger: .1 }, S.word('請先'), '「請先帶去檢查」滑入');
    S.sfx(S.word('請先'), 'tick', '請先帶去檢查：「叮咚」');
    S.to('#last', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word('保健品'), '最後一行由下浮上');
    S.to('#two', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2.4)' }, S.word('第二步'), '「第二步」橘底彈出');
    S.sfx(S.word('第二步'), 'ding-soft', '第二步：輕「叮」');
    const e = S.narrEnd + 1.2;
    S.to('#logo', { opacity: 0, duration: .5 }, e);
    S.to('#end4', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end4 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
