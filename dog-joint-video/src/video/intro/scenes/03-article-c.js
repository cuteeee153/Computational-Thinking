// 幕 03｜文章 C：「三到五歲」＋三個數字打架
// 第三個答案跳出後，三顆「歲？」標籤互相撞擊抖動；幕尾背景大數字淡出，準備換大標。
Intro.scene({
  id: '03', title: '文章 C（三到五歲）＋數字打架', start: 5.8, end: 9.2,
  narration: [[5.8, 9.0, '還有人說，三到五歲就開始退化。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 8.0,
  visuals: ["回答泡泡：「文章 C：三到五歲就開始退化。」", "小標籤「3 歲？」", "背景右下淡淡的大數字 3"],
  motions: ["6.0 秒｜文章 C 泡泡彈出；大數字 3 浮現", "6.9 秒｜「3 歲？」標籤彈出", "7.7 秒｜三顆標籤互相撞擊抖動，約 0.5 秒", "9.0 秒｜背景三個大數字淡出"],
  mount: [
    { into: '#A-bg', html: `<div class="ghost" id="g3" style="left:1340px;top:420px;font-size:600px">3</div>` },
    { into: '#answers', html: `<div class="bub" id="bC">文章 C：<b style="color:var(--or)">三到五歲</b>就開始退化。</div>` },
    { into: '#chips', html: `<span class="pill" id="c3"><b>3</b>歲？</span>` },
  ],
  init() {
    gsap.set('#bC', { opacity: 0, scale: .85, y: 16 });
    gsap.set('#c3', { opacity: 0, scale: .6 });
    gsap.set('#g3', { opacity: 0, scale: .9 });
  },
  animate({ tl, L, E }) {
    L('#bC', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.5)' }, 6.0);
    L('#g3', { opacity: 1, scale: 1, duration: 1.2, ease: E }, 6.0);
    L('#c3', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 6.9);
    // 打架：三顆標籤錯開 0.04 秒互撞
    tl.to('#c7', { x: 10, rotation: -4, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.7);
    tl.to('#c5', { x: -8, rotation: 4, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.74);
    tl.to('#c3', { x: 8, rotation: -3, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.78);
    L('#g3', { x: 30, y: 24, duration: 5, ease: 'none' }, 6.0);
    L(['#g7', '#g5', '#g3'], { opacity: 0, duration: .8, ease: 'power2.in' }, 9.0);
  },
});
