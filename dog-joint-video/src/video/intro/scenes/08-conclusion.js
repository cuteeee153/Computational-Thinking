// 幕 08｜「先講結論」
// 核心段的版面骨架就位，小標「02 ／ 先講結論」逐字打出；大標與說明文字的容器先留空，由後面的幕填入。
Intro.scene({
  id: '08', title: '先講結論', start: 20.2, end: 21.7,
  narration: [[20.3, 21.6, '先講結論。']],
  mount: [
    { into: '#B-text', html: `
      <div class="abs" style="left:72px;top:250px;width:1000px">
        <div class="eyebrow" id="bEye" data-text="02 ／ 先講結論"></div>
        <div class="h" id="bHead" style="font-size:110px;margin-top:30px"></div>
        <div class="lead" id="bLead" style="margin-top:40px"></div>
      </div>` },
  ],
  animate({ type }) {
    type('#bEye', 20.2, .6);
  },
});
