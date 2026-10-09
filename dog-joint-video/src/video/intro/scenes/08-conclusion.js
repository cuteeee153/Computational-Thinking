// 幕 08｜「先講結論」
// 核心段的版面骨架就位，小標「02 ／ 怎麼判斷？」逐字打出；大標與說明文字的容器先留空，由後面的幕填入。
Intro.scene({
  id: '08', title: '先講結論', start: 20.2, end: 21.7,
  narration: [[20.3, 21.6, '先講結論。']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 21.5,
  visuals: ["左側小標「02 ／ 怎麼判斷？」（橘色）"],
  motions: ["20.2 秒｜小標逐字打出"],
  sfx: [],
  mount: [
    { into: '#B-text', html: `
      <div class="abs" style="left:72px;top:250px;width:1000px">
        <div class="eyebrow" id="bEye" data-text="02 ／ 怎麼判斷？"></div>
        <div class="h" id="bHead" style="font-size:110px;margin-top:30px"></div>
        <div class="lead" id="bLead" style="margin-top:24px"></div>
      </div>` },
  ],
  animate({ type }) {
    type('#bEye', 20.2, .6);
  },
});
