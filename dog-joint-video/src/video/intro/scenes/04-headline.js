// 幕 04｜大標：「滑了三篇文章，三個答案。」
// 聊天卡片滑到右側，左邊打出小標，兩行大標由下往上冒出，接著第一行說明文字。
Intro.scene({
  id: '04', title: '大標「滑了三篇文章，三個答案」', start: 9.2, end: 13.0,
  narration: [[9.4, 13.0, '你滑完三篇文章，數字完全對不上，']],
  mount: [
    { into: '#A-text', html: `
      <div class="abs" style="left:72px;top:250px;width:1000px">
        <div class="eyebrow" id="aEye" data-text="01 ／ 你是不是也這樣"></div>
        <div class="h" style="font-size:118px;margin-top:30px">
          <span class="ln"><span id="aH1">滑了三篇文章，</span></span>
          <span class="ln"><span id="aH2" class="o">三個答案。</span></span>
        </div>
        <div class="lead" id="aLead" style="margin-top:44px"><div id="aL1">七歲？五歲？三到五歲？</div></div>
      </div>` },
  ],
  init() {
    gsap.set(['#aH1', '#aH2'], { yPercent: 110 });
    gsap.set('#aL1', { opacity: 0, y: 14 });
  },
  animate({ L, E, type }) {
    L('#chat', { x: 0, duration: 1.1, ease: 'power3.inOut' }, 9.2);
    type('#aEye', 9.6, .7);
    L('#aH1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 10.0);
    L('#aH2', { yPercent: 0, duration: .8, ease: 'power4.out' }, 10.9);
    L('#aL1', { opacity: 1, y: 0, duration: .6, ease: E }, 11.8);
  },
});
