// 幕 16｜「基礎常在幼犬時期就埋下」
// 大標第二行（橘）冒出；時間軸最左邊（幼犬）亮起一顆橘點，外圈擴散，旁邊標出「可能在這裡就埋下」。
Intro.scene({
  id: '16', title: '幼犬期埋下基礎', start: 49.4, end: 54.0,
  narration: [[49.48, 53.83, '狗的骨關節炎，基礎常在幼犬時期就埋下，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 53.0,
  visuals: ["大標第二行：「狗的骨關節炎，常在幼犬時期就埋下。」（橘）", "時間軸最左邊（幼犬）一顆橘點，外圈一圈圈擴散", "橘點下方標註：「可能在這裡就埋下」"],
  motions: ["51.1 秒｜大標第二行冒出", "51.7 秒｜橘點彈出", "51.8 秒｜外圈擴散四次，每次約 1.1 秒", "52.0 秒｜標註由左滑入"],
  mount: [
    { into: '#h3a', html: `<span class="ln"><span id="h3a2" class="o">狗的骨關節炎，常在幼犬時期就埋下。</span></span>` },
    { into: '#LA', html: `
      <div class="abs" style="left:208px;top:318px;width:24px;height:24px;border-radius:50%;background:#F97316" id="seed"></div>
      <div class="abs" style="left:196px;top:306px;width:48px;height:48px;border-radius:50%;border:3px solid #F97316" id="ring"></div>
      <div class="abs" style="left:120px;top:418px;display:flex;align-items:center;gap:12px;font-size:26px;font-weight:700;color:var(--or)" id="seedLbl"><span style="width:28px;height:2px;background:var(--or)"></span>可能在這裡就埋下</div>` },
  ],
  init() {
    gsap.set('#h3a2', { yPercent: 110 });
    gsap.set(['#seed', '#ring'], { scale: 0 });
    gsap.set('#seedLbl', { opacity: 0, x: -10 });
  },
  animate({ tl, L, E }) {
    L('#h3a2', { yPercent: 0, duration: .8, ease: 'power4.out' }, 51.08);
    L('#seed', { scale: 1, duration: .5, ease: 'back.out(3)' }, 51.68);
    tl.fromTo('#ring', { scale: .6, opacity: 1 }, { scale: 2.2, opacity: 0, duration: 1.1, repeat: 3, ease: 'power1.out' }, 51.78);
    L('#seedLbl', { opacity: 1, x: 0, duration: .5, ease: E }, 51.98);
  },
});
