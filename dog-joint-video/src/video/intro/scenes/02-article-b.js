// 幕 02｜文章 B：「大型犬五歲」
// 第二個答案泡泡跳出，背景右上浮出大數字 5，下方多一顆「5 歲？」標籤。
Intro.scene({
  id: '02', title: '文章 B（五歲）', start: 2.8, end: 5.8,
  narration: [[2.8, 5.6, '大型犬五歲就要吃保健品？']],
  mount: [
    { into: '#A-bg', html: `<div class="ghost" id="g5" style="left:1380px;top:60px;font-size:640px">5</div>` },
    { into: '#answers', html: `<div class="bub" id="bB">文章 B：大型犬<b style="color:var(--or)">五歲</b>就要吃保健品。</div>` },
    { into: '#chips', html: `<span class="pill" id="c5"><b>5</b>歲？</span>` },
  ],
  init() {
    gsap.set('#bB', { opacity: 0, scale: .85, y: 16 });
    gsap.set('#c5', { opacity: 0, scale: .6 });
    gsap.set('#g5', { opacity: 0, scale: .9 });
  },
  animate({ L, E }) {
    L('#bB', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(1.5)' }, 2.9);
    L('#g5', { opacity: 1, scale: 1, duration: 1.2, ease: E }, 2.9);
    L('#c5', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)' }, 3.6);
    L('#g5', { x: 24, y: -16, duration: 7, ease: 'none' }, 2.9);
  },
});
