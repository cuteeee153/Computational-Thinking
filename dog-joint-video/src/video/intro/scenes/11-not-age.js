// 幕 11｜「要不要開始，從來不是看年齡」
// 「判斷框架」文件卡從右滑入、橘色折角彈開，出現「✕ 年齡」方塊，「年齡」被一條線劃掉後變淡。
Intro.scene({
  id: '11', title: '不是年齡', start: 26.9, end: 30.5,
  narration: [[27.0, 30.3, '要不要開始，從來不是看年齡，']],
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 30.2,
  visuals: ["右側文件卡，右上角橘色折角", "卡片標籤「判斷框架 ・ 3 STEPS」", "灰色方塊「✕ 年齡」", "說明文字（緊接在大標下方）：「要不要開始，從來不是看年齡。」"],
  motions: ["26.9 秒｜文件卡從右側滑入", "27.4 秒｜卡片標籤逐字打出；說明文字淡入", "27.5 秒｜橘色折角彈開", "27.9 秒｜「✕ 年齡」方塊浮現", "29.0 秒｜「年齡」被一條線劃掉，方塊變淡"],
  sfx: [
    [26.9, "slide", "文件卡滑入：輕「咻」"],
    [27.5, "flip", "橘色折角彈開：「啪」"],
    [29.0, "scribble", "「年齡」被劃掉：筆刷聲"],
  ],
  mount: [
    { into: '#bLead', html: `<div id="bL2">要不要開始，從來不是看年齡。</div>` },
    { into: '#B-doc', html: `
      <div class="doc" id="doc" style="left:1110px;top:220px;width:740px">
        <div class="fold" id="fold"></div>
        <div class="k" style="height:28px" id="docK" data-text="判斷框架 ・ 3 STEPS"></div>
        <div id="boxes" style="display:flex;gap:18px;margin:26px 0 34px">
          <div id="boxNo" style="flex:1;padding:20px 24px;border-radius:18px;background:#F4EBDF;display:flex;align-items:center;gap:14px"><div class="ck" style="background:#E5DBCD;color:#A79A8B">✕</div><div><div style="font-size:30px;font-weight:700;color:#A79A8B;position:relative;display:inline-block">年齡<span id="strike" class="abs" style="left:-4px;right:-4px;top:52%;height:4px;border-radius:2px;background:#A79A8B;transform-origin:0 50%"></span></div></div></div>
        </div>
      </div>` },
  ],
  init() {
    gsap.set('#bL2', { opacity: 0, y: 14 });
    gsap.set('#doc', { opacity: 0, x: 120 });
    gsap.set('#fold', { scale: 0 });
    gsap.set('#boxNo', { opacity: 0, y: 16 });
    gsap.set('#strike', { scaleX: 0 });
  },
  animate({ L, E, type }) {
    L('#doc', { opacity: 1, x: 0, duration: .9, ease: E }, 26.9);
    L('#fold', { scale: 1, duration: .5, ease: 'back.out(2)' }, 27.5);
    type('#docK', 27.4, .8);
    L('#bL2', { opacity: 1, y: 0, duration: .6, ease: E }, 27.4);
    L('#boxNo', { opacity: 1, y: 0, duration: .5, ease: E }, 27.9);
    L('#strike', { scaleX: 1, duration: .45, ease: 'power2.inOut' }, 29.0);
    L('#boxNo', { opacity: .75, duration: .4 }, 29.4);
  },
});
