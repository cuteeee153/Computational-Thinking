// 幕 10｜「是問題問錯了」
// 三顆年齡標籤一起翻落出畫面，大標「一開始，」（黑）「問題就問錯了。」（橘）兩行依序冒出。
Intro.scene({
  id: '10', title: '問題問錯了', start: 24.7, end: 26.9,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 26.6,
  visuals: ["大標第一行：「一開始，」（黑）", "大標第二行：「問題就問錯了。」（橘）"],
  motions: ["24.7 秒｜三顆標籤旋轉著掉出畫面", "25.0 秒｜大標第一行由下往上冒出", "25.5 秒｜大標第二行冒出"],
  sfx: [
    [24.7, "fall", "三顆標籤掉出畫面：往下滑音"],
  ],
  mount: [
    { into: '#bHead', html: `<span class="ln"><span id="bH1">一開始，</span></span><span class="ln"><span id="bH1b" class="o">問題就問錯了。</span></span>` },
  ],
  init() {
    gsap.set(['#bH1', '#bH1b'], { yPercent: 110 });
  },
  animate({ L, E }) {
    L('#k7', { y: 640, rotation: -28, opacity: 0, duration: .8, ease: 'power2.in' }, 24.7);
    L('#k5', { y: 640, rotation: 20, opacity: 0, duration: .8, ease: 'power2.in' }, 24.78);
    L('#k3', { y: 640, rotation: -14, opacity: 0, duration: .8, ease: 'power2.in' }, 24.86);
    L('#bH1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 25.0);
    L('#bH1b', { yPercent: 0, duration: .8, ease: 'power4.out' }, 25.5);
  },
});
