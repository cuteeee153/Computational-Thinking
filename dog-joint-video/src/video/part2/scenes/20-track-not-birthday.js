// 幕 20｜「有風險因子的狗，從年輕成犬健檢起就該被追蹤，而不是看生日」
// 方塊 02 被橘框圈起並浮起，其他方塊變淡；狗跳到方塊 02 上，上方出現「從年輕成犬健檢起就追蹤」，
// 右邊出現「看生日」並被一條橘線劃掉。
Intro.scene({
  id: '20', title: '追蹤，而不是看生日', start: 76.7, end: 87.6,
  narration: [[76.79, 78.25, '它的邏輯是，'], [78.55, 83.61, '有風險因子的狗，從年輕成犬健檢起就該被追蹤，'], [83.91, 85.62, '而不是看生日。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 86.5,
  visuals: ["方塊 02 加上橘色外框並浮起，其他三個方塊變淡", "方塊 02 上站著一隻狗", "放大鏡＋橘字標籤：「從年輕成犬健檢起就追蹤」", "右上灰字標籤「看生日」，被一條橘線劃掉"],
  motions: ["78.6 秒｜方塊 02 圈起浮起，其他方塊變淡", "78.9 秒｜狗從上方落到方塊 02 上（彈跳）", "79.8 秒｜「從年輕成犬健檢起就追蹤」淡入", "83.9 秒｜「看生日」淡入", "84.5 秒｜「看生日」被劃掉"],
  mount: [
    { into: '#LB', html: `
      <div class="abs" style="left:578px;top:146px;width:112px" id="dB"></div>
      <div class="qp" style="left:470px;top:30px;display:flex;align-items:center;gap:12px;border-color:#F3A46B;color:var(--or);font-weight:700" id="track"><span style="width:44px;height:44px" id="trackIc"></span>從年輕成犬健檢起就追蹤</div>
      <div class="qp" style="left:1300px;top:60px;color:#A79A8B;font-weight:700" id="bday"><span style="position:relative">看生日<span class="abs" id="bdayStrike" style="left:-6px;right:-6px;top:52%;height:4px;border-radius:2px;background:#E2620E;transform-origin:0 50%"></span></span></div>` },
  ],
  assets() {
    Intro.dog('#dB', { id: 'b', mood: 'determined', tilt: 4 });
    trackIc.innerHTML = iconMagnifier('tm');
  },
  init() {
    gsap.set('#dB', { opacity: 0, y: -40 });
    gsap.set(['#track', '#bday'], { opacity: 0, y: 10 });
    gsap.set('#bdayStrike', { scaleX: 0 });
  },
  animate({ L, E }) {
    L('#b2', { boxShadow: '0 0 0 5px #F97316, 0 30px 50px -20px rgba(249,115,22,.5)', y: -10, duration: .5, ease: E }, 78.55);
    L(['#b1', '#b3', '#b4'], { opacity: .45, duration: .5 }, 78.55);
    L('#dB', { opacity: 1, y: -10, duration: .6, ease: 'bounce.out' }, 78.85);
    L('#track', { opacity: 1, y: 0, duration: .5, ease: E }, 79.75);
    L('#bday', { opacity: 1, y: 0, duration: .4, ease: E }, 83.91);
    L('#bdayStrike', { scaleX: 1, duration: .4, ease: 'power2.inOut' }, 84.51);
  },
});
