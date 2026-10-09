// 幕 29｜「起身變慢、玩耍時間縮短，或是休息時的姿勢變得怪怪的」
// 徵兆卡 03～05 接在前兩張右邊浮上來，五張排滿一整排。
Intro.scene({
  id: '29', title: '五種蛛絲馬跡（03–05）', start: 171.5, end: 176.4,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 176.0,
  visuals: ["卡片 03：軟墊＋慢慢往上的箭頭＋時鐘圖示，「起身變慢」", "卡片 04：球＋計時圈圖示，「玩耍時間縮短」", "卡片 05：軟墊＋問號圖示，「休息姿勢怪怪的」"],
  motions: ["171.6 秒｜卡片 03 浮上來", "172.3 秒｜卡片 04 浮上來", "173.4 秒｜卡片 05 浮上來"],
  sfx: [],
  mount: [
    { into: '#sg', html: `
      <div class="rf card" id="sg2" style="left:792px"><div class="num">03</div><div class="ic" id="sgi2"></div><div class="tt" id="sgt2">起身<br>變慢</div></div>
      <div class="rf card" id="sg3" style="left:1152px"><div class="num">04</div><div class="ic" id="sgi3"></div><div class="tt" id="sgt3">玩耍時間<br>縮短</div></div>
      <div class="rf card" id="sg4" style="left:1512px"><div class="num">05</div><div class="ic" id="sgi4"></div><div class="tt" id="sgt4">休息姿勢<br>怪怪的</div></div>` },
  ],
  assets() {
    sgi2.innerHTML = iconSlowRise('sg2');
    sgi3.innerHTML = iconPlayTime('sg3');
    sgi4.innerHTML = iconOddPose('sg4');
  },
  init() {
    gsap.set(['#sg2', '#sg3', '#sg4'], { opacity: 0, y: 60 });
  },
  animate({ L }) {
    L('#sg2', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 171.6);
    L('#sg3', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 172.3);
    L('#sg4', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 173.4);
  },
});
