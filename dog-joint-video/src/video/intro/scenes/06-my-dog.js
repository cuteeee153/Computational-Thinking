// 幕 06｜「我家這隻，現在到底要不要開始？」＋按下送出
// 第二行說明文字出現，手繪箭頭從大標畫向卡片，卡片上的狗歪頭、小字變成「現在要開始嗎？」，
// 最後游標移到送出鍵按下去。
Intro.scene({
  id: '06', title: '我家這隻要開始嗎？＋送出', start: 15.4, end: 18.9,
  narration: [[15.4, 19.2, '我家這隻，現在到底要不要開始？']],
  mount: [
    { into: '#aLead', html: `<div id="aL2">你只想知道：我家這隻，現在要開始嗎？</div>` },
    { into: '#A-text', html: `
      <svg class="abs" id="arrow" style="left:900px;top:600px" width="200" height="170" viewBox="0 0 200 170"><path id="arrP1" d="M10 160 C30 70 90 20 180 40" stroke="#E2620E" stroke-width="5" fill="none" stroke-linecap="round"/><path id="arrP2" d="M150 18 L182 40 L148 62" stroke="#E2620E" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>` },
    { into: '#subs', html: `<span id="sub3" class="abs" style="left:0;top:0;white-space:nowrap;color:var(--or)">現在要開始嗎？</span>` },
    { into: '#A-fg', html: `
      <svg class="abs" id="cursor" style="left:0;top:0;width:54px;height:54px;z-index:5" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15.5 L12.5 22.5 L15.5 21 L12 14 L19 14 Z" fill="#231B15" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>` },
  ],
  init() {
    gsap.set('#aL2', { opacity: 0, y: 14 });
    gsap.set('#sub3', { opacity: 0, y: 10 });
    gsap.set(['#arrP1', '#arrP2'], { strokeDasharray: 400, strokeDashoffset: 400 });
    gsap.set('#cursor', { x: 1500, y: 1120, opacity: 0 });
  },
  animate({ tl, L, E }) {
    L('#aL2', { opacity: 1, y: 0, duration: .6, ease: E }, 15.4);
    // 手繪箭頭：先畫弧線，再畫箭頭
    L('#arrP1', { strokeDashoffset: 0, duration: .7, ease: 'power2.inOut' }, 15.6);
    L('#arrP2', { strokeDashoffset: 0, duration: .3, ease: 'power2.out' }, 16.25);
    L('#sub2', { opacity: 0, y: -10, duration: .3 }, 15.6);
    L('#sub3', { opacity: 1, y: 0, duration: .3 }, 15.7);
    tl.to('#dogA', { rotation: -6, transformOrigin: '50% 90%', duration: .35, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 15.8);
    // 游標 → 送出鍵
    L('#cursor', { opacity: 1, duration: .2 }, 17.2);
    L('#cursor', { x: 1758, y: 892, duration: 1.2, ease: 'power3.inOut' }, 17.2);
    tl.to('#send', { scale: .86, background: '#F97316', color: '#fff', duration: .12 }, 18.55);
    tl.to('#send', { scale: 1, duration: .25, ease: 'back.out(3)' }, 18.67);
    tl.to('#cursor', { scale: .85, duration: .1, yoyo: true, repeat: 1 }, 18.5);
  },
});
