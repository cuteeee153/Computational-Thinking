// 幕 28｜「像是走路一拐一拐，就算只有幾秒鐘；上下車、上下樓梯變得猶豫」
// 下方的徵兆卡隨旁白一張張浮上來（這一幕是 01、02）；卡片 01 加上「哪怕只有幾秒」標籤。
// 卡片的外框在這裡放好，03～05 在第 29 幕加入。
Intro.scene({
  id: '28', title: '五種蛛絲馬跡（01–02）', start: 166.3, end: 171.5,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 171.3,
  visuals: ["卡片 01：腳印圖示＋「走路一拐一拐」", "卡片 01 右上角橘色小標籤：「哪怕只有幾秒」", "卡片 02：樓梯問號圖示＋「上下車、上下樓梯猶豫」"],
  motions: ["166.5 秒｜卡片 01 浮上來", "167.8 秒｜「哪怕只有幾秒」標籤彈出", "169.2 秒｜卡片 02 浮上來"],
  sfx: [],
  mount: [
    { into: '#sg', html: `
      <div class="rf card" id="sg0" style="left:72px"><div class="num">01</div><div class="badge" id="sgb">哪怕只有幾秒</div><div class="ic" id="sgi0"></div><div class="tt" id="sgt0">走路<br>一拐一拐</div></div>
      <div class="rf card" id="sg1" style="left:432px"><div class="num">02</div><div class="ic" id="sgi1"></div><div class="tt" id="sgt1">上下車、<br>上下樓梯猶豫</div></div>` },
  ],
  assets() {
    sgi0.innerHTML = iconLimp('sg0');
    sgi1.innerHTML = iconStairs('sg1');
  },
  init() {
    gsap.set(['#sg0', '#sg1'], { opacity: 0, y: 60 });
    gsap.set('#sgb', { opacity: 0, scale: .6 });
  },
  animate({ L }) {
    L('#sg0', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 166.5);
    L('#sgb', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.5)' }, 167.8);
    L('#sg1', { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, 169.2);
  },
});
