// 幕 09｜「會這麼亂，不是誰在騙你」：三個年齡標籤浮在空中
// 從鉤子段延續過來的 7／5／3，放大成三顆大標籤，依序彈出後輕輕上下漂浮。
Intro.scene({
  id: '09', title: '三個年齡浮起', start: 21.7, end: 24.7,
  narration: [[21.8, 24.6, '會這麼亂，不是誰在騙你，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 23.5,
  visuals: ["畫面中間三顆大標籤：「7 歲？」「5 歲？」「3 歲？」"],
  motions: ["21.7 秒起｜三顆標籤依序彈出，間隔 0.25 秒", "22.4 秒起｜三顆標籤輕輕上下漂浮"],
  sfx: [
    [21.7, "pop-low", "標籤 1 彈出：低音「啵」"],
    [21.95, "pop-low", "標籤 2 彈出", { pitch: 1.12 }],
    [22.2, "pop-low", "標籤 3 彈出", { pitch: 1.26 }],
  ],
  mount: [
    { into: '#B-bg', html: `
      <div class="bigchip" id="k7" style="left:470px;top:430px"><b>7</b>歲？</div>
      <div class="bigchip" id="k5" style="left:830px;top:520px"><b>5</b>歲？</div>
      <div class="bigchip" id="k3" style="left:1190px;top:420px"><b>3</b>歲？</div>` },
  ],
  init() {
    gsap.set(['#k7', '#k5', '#k3'], { opacity: 0, scale: .6, y: 40 });
  },
  animate({ L }) {
    L('#k7', { opacity: 1, scale: 1, y: 0, duration: .6, ease: 'back.out(1.8)' }, 21.7);
    L('#k5', { opacity: 1, scale: 1, y: 0, duration: .6, ease: 'back.out(1.8)' }, 21.95);
    L('#k3', { opacity: 1, scale: 1, y: 0, duration: .6, ease: 'back.out(1.8)' }, 22.2);
    L('#k7', { y: -14, rotation: -3, duration: 1.2, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 22.4);
    L('#k5', { y: 12, rotation: 2, duration: 1.1, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 22.6);
    L('#k3', { y: -10, rotation: 3, duration: 1.3, yoyo: true, repeat: 1, ease: 'sine.inOut' }, 22.8);
  },
});
