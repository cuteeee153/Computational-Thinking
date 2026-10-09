// 幕 10｜「是問題問錯了」
// 三顆年齡標籤一起翻落出畫面，大標第一行「問題問錯了。」冒出，接著第一行說明文字。
Intro.scene({
  id: '10', title: '問題問錯了', start: 24.7, end: 26.9,
  narration: [[24.8, 26.6, '是問題問錯了。']],
  mount: [
    { into: '#bHead', html: `<span class="ln"><span id="bH1">問題問錯了。</span></span>` },
    { into: '#bLead', html: `<div id="bL1">會這麼亂，不是誰在騙你。</div>` },
  ],
  init() {
    gsap.set('#bH1', { yPercent: 110 });
    gsap.set('#bL1', { opacity: 0, y: 14 });
  },
  animate({ L, E }) {
    L('#k7', { y: 640, rotation: -28, opacity: 0, duration: .8, ease: 'power2.in' }, 24.7);
    L('#k5', { y: 640, rotation: 20, opacity: 0, duration: .8, ease: 'power2.in' }, 24.78);
    L('#k3', { y: 640, rotation: -14, opacity: 0, duration: .8, ease: 'power2.in' }, 24.86);
    L('#bH1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 25.0);
    L('#bL1', { opacity: 1, y: 0, duration: .6, ease: E }, 25.9);
  },
});
