// 幕 21｜「七歲、五歲，只是某個體型平均比較容易出現風險的年紀，不是起跑槍」
// 示意圖換成 0–14 歲的年齡軸，「7」「5」兩根大頭針掉下來，中間畫出一段橘色區間並加上說明，
// 最後蓋上「年齡不是判斷依據」印章。
Intro.scene({
  id: '21', title: '七歲、五歲不是起跑槍', start: 87.6, end: 98.7,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 98.0,
  visuals: ["大標第一行：「不是看年齡，」（白）", "大標第二行：「而是看有沒有風險因子。」（橘）", "0 到 14 歲的年齡軸，每 7 歲一根長刻度", "年齡軸上兩根橘色大頭針「5」和「7」", "5 到 7 歲之間的淡橘色區間，下方說明：「只是某個體型平均比較容易出現風險的年紀」", "右上方歪斜的橘框印章：「年齡不是判斷依據」"],
  motions: ["87.6 秒｜上一個大標往上退出，示意圖淡出", "88.2 秒｜年齡軸出現", "88.4 秒｜大標第一行冒出", "88.7 秒｜「7」大頭針掉下來（彈跳）", "89.3 秒｜「5」大頭針掉下來", "91.5 秒｜5～7 歲區間由左往右畫出", "91.9 秒｜區間說明淡入", "96.4 秒｜大標第二行冒出", "96.7 秒｜「年齡不是判斷依據」印章蓋下"],
  sfx: [
    [87.62, "whoosh", "大標退場：「咻」", { gain: 0.7 }],
    [88.72, "bounce", "「7」大頭針掉下：彈跳聲", { pitch: 1.1 }],
    [89.32, "bounce", "「5」大頭針掉下：彈跳聲"],
    [91.48, "draw", "5～7 歲區間畫出：鉛筆沙沙聲", { dur: 0.7, gain: 0.8 }],
    [96.7, "thud", "「年齡不是判斷依據」印章：「咚」"],
  ],
  mount: [
    { into: '#S3-text', html: `<div class="h abs" style="left:72px;top:196px;font-size:92px" id="h3c"><span class="ln"><span id="h3c1">不是看年齡，</span></span><span class="ln"><span id="h3c2" class="o">而是看有沒有風險因子。</span></span></div>` },
    { into: '#LC', html: `
      <div class="abs" style="left:140px;top:328px;width:1500px;height:5px;border-radius:3px;background:#E7DCCD"></div>
      <div id="ticks"></div>
      <div class="abs" style="left:676px;top:318px;width:214px;height:25px;border-radius:13px;background:#F9731633;transform-origin:0 50%" id="band"></div>
      <div class="pin" style="left:676px" id="p5"><b>5</b><i></i></div>
      <div class="pin" style="left:890px" id="p7"><b>7</b><i></i></div>
      <div class="abs" style="left:783px;top:420px;transform:translateX(-50%);font-size:28px;font-weight:700;color:var(--or);white-space:nowrap" id="bandLbl">只是某個體型平均比較容易出現風險的年紀</div>
      <div class="abs" style="left:1130px;top:140px;padding:18px 34px;border:5px solid #E2620E;border-radius:20px;font-size:52px;font-weight:900;color:#E2620E;letter-spacing:-.02em;transform:rotate(-7deg)" id="stamp">年齡不是判斷依據</div>` },
  ],
  assets() {
    // 年齡軸刻度：0～14 歲，0、7、14 歲是長刻度
    ticks.innerHTML = [...Array(15)].map((_, a) => {
      const x = 140 + a * 1500 / 14;
      return `<div class="abs" style="left:${x - 1}px;top:${a % 7 ? 320 : 312}px;width:2px;height:${a % 7 ? 20 : 36}px;background:#CDBFAE"></div><div class="stop" style="left:${x}px;top:${a % 7 ? 352 : 360}px;font-size:${a % 7 ? 18 : 22}px">${a}${a === 14 ? ' 歲' : ''}</div>`;
    }).join('');
  },
  init() {
    gsap.set('#LC', { opacity: 0 });
    gsap.set(['#h3c1', '#h3c2'], { yPercent: 110 });
    gsap.set(['#p5', '#p7'], { opacity: 0, y: -60 });
    gsap.set('#band', { scaleX: 0 });
    gsap.set('#bandLbl', { opacity: 0, y: 10 });
    gsap.set('#stamp', { opacity: 0, scale: 1.6 });
  },
  animate({ L, E }) {
    L(['#h3b1', '#h3b2'], { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .08 }, 87.62);
    L('#LB', { opacity: 0, duration: .5 }, 87.72);
    L('#LC', { opacity: 1, duration: .3 }, 88.22);
    L('#h3c1', { yPercent: 0, duration: .8, ease: 'power4.out' }, 88.42);
    L('#p7', { opacity: 1, y: 0, duration: .6, ease: 'bounce.out' }, 88.72);
    L('#p5', { opacity: 1, y: 0, duration: .6, ease: 'bounce.out' }, 89.32);
    L('#band', { scaleX: 1, duration: .7, ease: 'power2.inOut' }, 91.48);
    L('#bandLbl', { opacity: 1, y: 0, duration: .5, ease: E }, 91.88);
    L('#h3c2', { yPercent: 0, duration: .8, ease: 'power4.out' }, 96.4);
    L('#stamp', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2.2)' }, 96.7);
  },
});
