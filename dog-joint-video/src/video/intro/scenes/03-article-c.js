// 幕 03｜文章 C：「三歲」＋三個數字打架
// 第三個答案跳出後，卡片右下方的背景浮出「3 歲？」；三顆背景標籤互相撞擊抖動，幕尾淡出，準備換大標。
Intro.scene({
  id: '03', title: '文章 C（三歲）＋數字打架', start: 5.8, end: 9.2,
  narration: [[5.8, 9.0, '還有人說，三到五歲就開始退化。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 8.0,
  visuals: ["回答泡泡：「文章 C：三歲就開始退化。」", "卡片右下方背景的標籤「3 歲？」"],
  motions: ["6.0 秒｜文章 C 泡泡彈出", "6.9 秒｜背景標籤「3 歲？」彈出", "7.7 秒｜三顆背景標籤互相撞擊抖動，約 0.5 秒", "9.0 秒｜三顆背景標籤淡出"],
  sfx: [
    [6.0, "pop", "文章 C 泡泡彈出：「啵」", { pitch: 1.12 }],
    [6.9, "pop-low", "背景標籤「3 歲？」：低音「啵」", { pitch: 1.26 }],
    [7.7, "shake", "三顆標籤互撞：「喀喀喀」"],
  ],
  mount: [
    { into: '#answers', html: `<div class="bub" id="bC">文章 C：<b style="color:var(--or)">三歲</b>就開始退化。</div>` },
    { into: '#A-bg', html: `<div class="bigchip" id="c3" style="left:1400px;top:620px"><b>3</b>歲？</div>` },
  ],
  init() {
    gsap.set('#bC', { opacity: 0, scale: .85, y: 16 });
    gsap.set('#c3', { opacity: 0, scale: .6, rotation: -4 });
  },
  animate({ tl, L, E }) {
    L('#bC', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.5)' }, 6.0);
    L('#c3', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 6.9);
    // 打架：三顆標籤錯開 0.04 秒互撞
    tl.to('#c7', { x: 10, rotation: -4, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.7);
    tl.to('#c5', { x: -8, rotation: 4, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.74);
    tl.to('#c3', { x: 8, rotation: -3, duration: .08, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 7.78);
    L(['#c7', '#c5', '#c3'], { opacity: 0, duration: .8, ease: 'power2.in' }, 9.0);
  },
});
