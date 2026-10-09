// 幕 02｜文章 B：「大型犬五歲」
// 第二個答案泡泡跳出，卡片右上方的背景浮出「5 歲？」標籤。
Intro.scene({
  id: '02', title: '文章 B（五歲）', start: 2.8, end: 5.8,
  narration: [[2.8, 5.6, '大型犬五歲就要吃保健品？']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 5.0,
  visuals: ["回答泡泡：「文章 B：大型犬五歲就要吃保健品。」", "卡片右上方背景的標籤「5 歲？」"],
  motions: ["2.9 秒｜文章 B 泡泡彈出", "3.6 秒｜背景標籤「5 歲？」彈出，之後緩慢上下漂移"],
  mount: [
    { into: '#answers', html: `<div class="bub" id="bB">文章 B：大型犬<b style="color:var(--or)">五歲</b>就要吃保健品。</div>` },
    { into: '#A-bg', html: `<div class="bigchip" id="c5" style="left:1420px;top:200px"><b>5</b>歲？</div>` },
  ],
  init() {
    gsap.set('#bB', { opacity: 0, scale: .85, y: 16 });
    gsap.set('#c5', { opacity: 0, scale: .6, rotation: 5 });
  },
  animate({ L, E }) {
    L('#bB', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.5)' }, 2.9);
    L('#c5', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 3.6);
    L('#c5', { y: -18, duration: 4.9, ease: 'none' }, 4.1);
  },
});
