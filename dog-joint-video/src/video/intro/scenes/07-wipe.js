// 幕 07｜轉場：從送出鍵展開的圓形擦除
// 核心段（圖層 B）以送出鍵為圓心，用 clip-path 圓形放大蓋滿畫面；游標同時淡出。
Intro.scene({
  id: '07', title: '轉場：圓形擦除', start: 18.9, end: 20.2,
  narration: [],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 19.5,
  visuals: ["下一段的米色畫面，從送出鍵的位置展開"],
  motions: ["18.9 秒｜以送出鍵為圓心，圓形向外擴大蓋滿畫面，約 1.1 秒", "19.2 秒｜游標淡出"],
  init() {
    gsap.set('#B', { clipPath: 'circle(0px at 1767px 902px)' });
  },
  animate({ L }) {
    L('#cursor', { opacity: 0, duration: .3 }, 19.2);
    L('#B', { clipPath: 'circle(2300px at 1767px 902px)', duration: 1.1, ease: 'power3.in' }, 18.9);
  },
});
