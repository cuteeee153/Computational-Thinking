// 幕 12｜「而是看風險因子」
// 大標第二行（橘色）「要看風險因子。」冒出，文件卡出現「而是 風險等級」方塊，打勾彈出。
Intro.scene({
  id: '12', title: '而是風險因子', start: 30.5, end: 33.2,
  narration: [[30.5, 32.6, '而是看風險因子。']],
  mount: [
    { into: '#bHead', html: `<span class="ln"><span id="bH2" class="o">要看風險因子。</span></span>` },
    { into: '#boxes', html: `
      <div id="boxYes" style="flex:1;padding:20px 24px;border-radius:18px;background:#FDE6D5;display:flex;align-items:center;gap:14px"><div class="ck" id="tick" style="background:var(--or-b);color:#fff">✓</div><div><div class="k" style="font-size:15px">而是</div><div style="font-size:30px;font-weight:700;color:var(--or)">風險等級</div></div></div>` },
  ],
  init() {
    gsap.set('#bH2', { yPercent: 110 });
    gsap.set('#boxYes', { opacity: 0, y: 16 });
    gsap.set('#tick', { scale: 0 });
  },
  animate({ L, E }) {
    L('#bH2', { yPercent: 0, duration: .8, ease: 'power4.out' }, 30.5);
    L('#boxYes', { opacity: 1, y: 0, duration: .5, ease: E }, 30.7);
    L('#tick', { scale: 1, duration: .5, ease: 'back.out(3)' }, 31.0);
  },
});
