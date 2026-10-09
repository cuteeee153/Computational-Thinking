// 幕 17｜「徵兆太輕微，常被當成玩過頭或扭到」
// 橘色軌跡從幼犬沿著時間軸往後延伸（越來越淡），青壯年的狗晃了晃，旁邊冒出兩個問句泡泡。
Intro.scene({
  id: '17', title: '徵兆太輕微', start: 54.0, end: 61.6,
  narration: [[54.13, 56.07, '只是徵兆太輕微，'], [56.37, 59.52, '常被當成玩過頭，或扭到而已。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 60.0,
  visuals: ["時間軸上一條由橘轉淡的軌跡，從幼犬延伸到老年", "問句泡泡：「只是玩過頭？」", "問句泡泡：「扭到而已？」"],
  motions: ["54.1 秒｜橘色軌跡沿時間軸往右延伸，約 2.2 秒", "56.5 秒｜「只是玩過頭？」彈出", "56.6 秒｜青壯年的狗左右晃兩下", "57.9 秒｜「扭到而已？」彈出"],
  mount: [
    { into: '#axisA', at: 'afterend', html: `<div class="abs" style="left:220px;top:327px;width:1320px;height:7px;border-radius:4px;background:linear-gradient(90deg,#F97316,#F9731633);transform-origin:0 50%" id="trail"></div>` },
    { into: '#LA', html: `
      <div class="qp" style="left:380px;top:200px" id="qp1">只是玩過頭？</div>
      <div class="qp" style="left:820px;top:236px" id="qp2">扭到而已？</div>` },
  ],
  init() {
    gsap.set('#trail', { scaleX: 0 });
    gsap.set(['#qp1', '#qp2'], { opacity: 0, scale: .7, y: 10 });
  },
  animate({ tl, L }) {
    L('#trail', { scaleX: 1, duration: 2.2, ease: 'power1.inOut' }, 54.13);
    L('#qp1', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 56.47);
    L('#qp2', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 57.87);
    tl.to('#dY', { rotation: -8, transformOrigin: '50% 90%', duration: .3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 56.57);
  },
});
