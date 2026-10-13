// 幕 12｜「而是看風險因子」
// 文件卡出現「✓ 風險因子」方塊，打勾彈出；念到「為什麼是用風險因子來判斷」時方塊放大一下。
Intro.scene({
  id: '12', title: '而是風險因子', start: 30.5, end: 33.2,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 32.8,
  visuals: ["橘色方塊「✓ 風險因子」"],
  motions: ["30.7 秒｜「✓ 風險因子」方塊浮現", "31.0 秒｜打勾彈出", "32.55 秒｜念到「風險因子來判斷」時，方塊放大一下再縮回"],
  sfx: [
    [31.0, "tick", "打勾彈出：「叮咚」"],
    [32.55, "pop", "方塊放大：「啵」", { gain: 0.7 }],
  ],
  mount: [
    { into: '#boxes', html: `
      <div id="boxYes" style="flex:1;padding:20px 24px;border-radius:18px;background:#FDE6D5;display:flex;align-items:center;gap:14px"><div class="ck" id="tick" style="background:var(--or-b);color:#fff">✓</div><div><div style="font-size:30px;font-weight:700;color:var(--or)">風險因子</div></div></div>` },
  ],
  init() {
    gsap.set('#boxYes', { opacity: 0, y: 16 });
    gsap.set('#tick', { scale: 0 });
  },
  animate({ L, E }) {
    L('#boxYes', { opacity: 1, y: 0, duration: .5, ease: E }, 30.7);
    L('#tick', { scale: 1, duration: .5, ease: 'back.out(3)' }, 31.0);
    L('#boxYes', { scale: 1.12, duration: .3, ease: 'back.out(2.5)' }, 32.55);
    L('#boxYes', { scale: 1, duration: .4, ease: 'power2.inOut' }, 33.3);
  },
});
