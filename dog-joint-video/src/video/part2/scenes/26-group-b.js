// 幕 26｜「有一項以上，是加強留意組」＋停格到 2:40
// 基礎預防組變淡，往右下畫出橘色分岔線「一項以上」，出現「加強留意組」卡片（橘色折角）與兩行重點，
// 卡片被橘框圈起；狗歪頭後輕輕上下晃，停格到 2:40。
Intro.scene({
  id: '26', title: '加強留意組（≥ 1 項）＋停格', start: 142.4, end: 160,
  narration: [[142.7, 145.97, '有一項以上，是加強留意組：'], [146.27, 148.72, '就算現在完全沒跛，'], [149.02, 152.83, '也建議提早、更頻繁地健檢追蹤。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 154.0,
  visuals: ["往右下的橘色分岔線，標籤「一項以上」（橘字）", "右下卡片：「GROUP B ・ ≥ 1 項」「加強留意組」（橘），右上角橘色折角，右下角放大鏡圖示", "重點一：「! 就算現在完全沒跛，」", "重點二：「✓ 也建議提早、更頻繁地健檢追蹤」", "左邊的基礎預防組卡片變淡"],
  motions: ["142.5 秒｜基礎預防組變淡", "142.7 秒｜橘色分岔線往右下畫出", "142.9 秒｜狗往右歪頭", "143.0 秒｜「一項以上」彈出", "143.3 秒｜「加強留意組」卡片浮上來", "143.7 秒｜橘色折角彈開", "146.3 秒｜重點一由左滑入", "149.0 秒｜重點二由左滑入", "149.6 秒｜加強留意組卡片浮起、加上橘框", "150.5 秒起｜狗輕輕上下晃，停格到 2:40"],
  mount: [
    { into: '#branches', html: `<path id="brR" d="M960 372 L960 420 Q960 440 980 440 L1390 440 Q1410 440 1410 460 L1410 530" stroke="#F97316" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` },
    { into: '#S4-flow', html: `
      <div class="brl" style="left:1185px;top:440px;color:var(--or);border-color:#F3A46B" id="brlR">一項以上</div>
      <div class="grp card" id="gB" style="left:1000px">
        <div class="fold" id="gBfold"></div>
        <div class="k">GROUP B ・ ≥ 1 項</div>
        <div class="ttl o">加強留意組</div>
        <div class="bl" id="b1x"><i style="background:#FDE6D5;color:var(--or)">!</i>就算現在完全沒跛，</div>
        <div class="bl" id="b2x"><i style="background:var(--or-b);color:#fff">✓</i>也建議提早、更頻繁地健檢追蹤</div>
        <div class="abs" style="right:40px;bottom:36px;width:140px" id="gBic"></div>
      </div>` },
  ],
  assets() {
    gBic.innerHTML = iconMagnifier('gb');
  },
  init() {
    gsap.set('#brR', { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set('#brlR', { opacity: 0, scale: .7 });
    gsap.set('#gB', { opacity: 0, y: 40 });
    gsap.set('#gBfold', { scale: 0 });
    gsap.set(['#b1x', '#b2x'], { opacity: 0, x: -20 });
  },
  animate({ tl, L, E }) {
    L('#gA', { opacity: .55, duration: .5 }, 142.5);
    L('#brR', { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, 142.7);
    L('#brlR', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 143.0);
    L('#gB', { opacity: 1, y: 0, duration: .6, ease: E }, 143.3);
    L('#gBfold', { scale: 1, duration: .5, ease: 'back.out(2)' }, 143.7);
    tl.to('#d4', { rotation: 14, transformOrigin: '50% 90%', duration: .5, ease: 'sine.inOut' }, 142.9);
    L('#b1x', { opacity: 1, x: 0, duration: .5, ease: E }, 146.27);
    L('#b2x', { opacity: 1, x: 0, duration: .5, ease: E }, 149.02);
    L('#gB', { y: -8, boxShadow: '0 0 0 4px #F97316, 0 50px 90px -40px rgba(107,74,42,.35)', duration: .5, ease: E }, 149.62);
    tl.to('#d4', { y: -8, duration: .8, yoyo: true, repeat: 5, ease: 'sine.inOut' }, 150.52);
  },
});
