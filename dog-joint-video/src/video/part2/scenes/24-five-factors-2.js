// 幕 24｜後兩類風險因子
// 卡片 04、05 接在前三張右邊浮上來，五張排滿一整排。
Intro.scene({
  id: '24', title: '五類風險因子（04–05）', start: 118.9, end: 128.7,
  narration: [[118.99, 123.07, '家族有髖關節或肘關節發育不良，'], [123.37, 127.44, '還有幼犬期快速生長或營養失衡。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 128.0,
  visuals: ["卡片 04：家族圖示＋「家族髖、肘關節發育不良」", "卡片 05：飯碗圖示＋「幼犬期快速生長或營養失衡」"],
  motions: ["119.1 秒｜卡片 04 浮上來", "123.5 秒｜卡片 05 浮上來"],
  mount: [
    { into: '#rfs', html: `
      <div class="rf card" id="rf3" style="left:1152px"><div class="num">04</div><div class="ic" id="rfi3"></div><div class="tt" id="rft3">家族髖、肘關節<br>發育不良</div></div>
      <div class="rf card" id="rf4" style="left:1512px"><div class="num">05</div><div class="ic" id="rfi4"></div><div class="tt" id="rft4">幼犬期快速生長<br>或營養失衡</div></div>` },
  ],
  assets() {
    rfi3.innerHTML = iconFamily('rf3');
    rfi4.innerHTML = iconBowl('rf4');
  },
  init() {
    gsap.set(['#rf3', '#rf4'], { opacity: 0, y: 60 });
  },
  animate({ L }) {
    L('#rf3', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 119.09);
    L('#rf4', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 123.47);
  },
});
