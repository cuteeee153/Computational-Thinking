// 幕 19｜四個階段逐一上色
// 旁白念到哪個階段，那個方塊就上色，顏色由淺到深（沒有風險因子 → 中重度臨床徵象）。
Intro.scene({
  id: '19', title: '四個階段上色', start: 67.8, end: 76.7,
  narration: [[67.9, 69.6, '沒有風險因子、'], [69.9, 72.32, '有風險因子但沒症狀、'], [72.62, 74.09, '輕度、中重度。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 76.0,
  visuals: ["方塊 01 變成淺米色、黑字", "方塊 02 變成淡橘、深橘字", "方塊 03 變成橘、褐字", "方塊 04 變成深橘、白字"],
  motions: ["67.9 秒｜方塊 01 上色", "69.9 秒｜方塊 02 上色", "72.6 秒｜方塊 03 上色", "73.4 秒｜方塊 04 上色"],
  animate({ L }) {
    L('#b1', { backgroundColor: '#EADFD1', color: '#231B15', duration: .4 }, 67.9);
    L('#b2', { backgroundColor: '#FBE3CF', color: '#B6500C', duration: .4 }, 69.9);
    L('#b3', { backgroundColor: '#F8C59B', color: '#8A3A06', duration: .4 }, 72.62);
    L('#b4', { backgroundColor: '#F08A43', color: '#FFFFFF', duration: .4 }, 73.42);
  },
});
