// 幕 06｜「我家這隻，現在到底要不要開始？」＋按下送出
// 重點句「我家這隻，現在該開始嗎？」放大加粗出現，螢光筆底色由左往右刷過，再輕輕跳一下；
// 卡片上的狗歪頭、小字變成「現在要開始嗎？」，最後游標移到送出鍵按下去。
Intro.scene({
  id: '06', title: '我家這隻要開始嗎？＋送出', start: 15.4, end: 18.9,
  narration: [[15.4, 19.2, '我家這隻，現在到底要不要開始？']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 18.4,
  visuals: ["引言小字「你只想知道：」", "重點句「我家這隻，現在該開始嗎？」：大字粗體，底下有淡橘色螢光筆底色", "卡片小字變成橘色「現在要開始嗎？」", "滑鼠游標"],
  motions: ["15.4 秒｜引言與重點句由下往上浮現", "15.75 秒｜螢光筆底色由左往右刷過重點句，約 0.6 秒", "16.5 秒｜重點句輕輕放大再回來一次", "15.7 秒｜卡片小字換成「現在要開始嗎？」", "15.8 秒｜狗大頭貼左右歪頭兩次", "17.2 秒｜游標從右下角移到送出鍵，約 1.2 秒", "18.5 秒｜按下送出：游標縮一下，送出鍵變橘色"],
  mount: [
    { into: '#aLead', html: `
      <div id="aL2" style="margin-top:18px">
        <div>你只想知道：</div>
        <div id="aL2k" style="position:relative;display:inline-block;margin-top:2px;font-size:58px;font-weight:900;letter-spacing:-.035em;line-height:1.25;color:var(--ink)"><span id="aL2hl" class="abs" style="left:-10px;right:-10px;bottom:4px;height:28px;border-radius:8px;background:#FBD0AE;z-index:-1;transform-origin:0 50%"></span>我家這隻，現在該開始嗎？</div>
      </div>` },
    { into: '#subs', html: `<span id="sub3" class="abs" style="left:0;top:0;white-space:nowrap;color:var(--or)">現在要開始嗎？</span>` },
    { into: '#A-fg', html: `
      <svg class="abs" id="cursor" style="left:0;top:0;width:54px;height:54px;z-index:5" viewBox="0 0 24 24"><path d="M4 2 L4 20 L9 15.5 L12.5 22.5 L15.5 21 L12 14 L19 14 Z" fill="#231B15" stroke="#fff" stroke-width="1.4" stroke-linejoin="round"/></svg>` },
  ],
  init() {
    gsap.set('#aL2', { opacity: 0, y: 14 });
    gsap.set('#sub3', { opacity: 0, y: 10 });
    gsap.set('#aL2hl', { scaleX: 0 });
    gsap.set('#cursor', { x: 1500, y: 1120, opacity: 0 });
  },
  animate({ tl, L, E }) {
    L('#aL2', { opacity: 1, y: 0, duration: .6, ease: E }, 15.4);
    // 重點句：螢光筆刷過，再輕輕跳一下
    L('#aL2hl', { scaleX: 1, duration: .6, ease: 'power2.out' }, 15.75);
    tl.to('#aL2k', { scale: 1.05, transformOrigin: '0% 60%', duration: .25, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 16.5);
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
