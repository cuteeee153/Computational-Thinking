// 幕 31｜「美國動物醫院協會特別提醒：飼主最容易自我安慰，把早期警訊當成只是撞到、只是玩瘋了」
// 背景轉成深色（和 0:45 深色段同一種），上一幕的內容淡出，出現來源標籤與新的大標；
// 下方卡片裡兩個飼主常說的話泡泡，被劃掉後指向「其實可能是早期警訊」。離開這一幕時背景變回米色。
Intro.scene({
  id: '31', title: '別自我安慰', start: 182.4, end: 189.7,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 189.5,
  visuals: ["深色背景（格線），頻道名稱變白字", "右上角來源標籤：「SOURCE ／ AAHA《Mobility Matters》」", "大標第一行：「AAHA 特別提醒：」（白）", "大標第二行：「飼主最容易自我安慰」（橘）", "下方白色卡片", "泡泡：「只是撞到而已啦」", "泡泡：「只是玩瘋了吧」", "兩個泡泡被橘線劃掉", "右邊橘色字：「其實可能是」／「早期警訊」，旁邊驚嘆號圓圈"],
  motions: ["182.4 秒｜碼錶、狗、印章、上方卡片排淡出，背景轉成深色、頻道名稱變白", "189.7 秒｜背景變回米色、頻道名稱變回黑字", "182.7 秒｜來源標籤淡入", "182.8 秒｜大標第一行冒出", "184.7 秒｜大標第二行冒出", "185.2 秒｜下方卡片浮上來", "186.2 秒｜「只是撞到而已啦」彈出", "187.9 秒｜「只是玩瘋了吧」彈出", "188.6 秒｜兩個泡泡被劃掉、變淡", "189.0 秒｜「其實可能是早期警訊」由右滑入，之後停約 2 秒再轉場"],
  sfx: [
    [182.4, "whoosh", "背景轉成深色：「咻」", { gain: 0.7 }],
    [185.2, "slide", "卡片浮上：輕「咻」"],
    [186.2, "pop", "「只是撞到而已啦」：「啵」"],
    [187.9, "pop", "「只是玩瘋了吧」：「啵」", { pitch: 1.12 }],
    [188.6, "scribble", "兩個泡泡被劃掉：筆刷聲"],
    [189.0, "ding-soft", "「早期警訊」滑入：輕「叮」", { pitch: 0.9 }],
  ],
  mount: [
    { into: '#S5-text', html: `
      <div class="src" id="src31">SOURCE ／ AAHA《Mobility Matters》</div>
      <div class="h abs" style="left:72px;top:196px;font-size:96px" id="h53"><span class="ln"><span id="h531" style="color:#FFF6EC">AAHA 特別提醒：</span></span><span class="ln"><span id="h532" style="color:var(--or-l)">飼主最容易自我安慰</span></span></div>` },
    { into: '#S5-mid', html: `
      <div class="panel card" style="top:480px;height:470px" id="pan31">
        <div class="say" style="left:110px;top:110px" id="say1">只是撞到而已啦<span class="x" id="sx1"></span></div>
        <div class="say" style="left:250px;top:270px" id="say2">只是玩瘋了吧<span class="x" id="sx2"></span></div>
        <svg class="abs" style="left:0;top:0" width="1776" height="470"><path id="arr31" d="M760 235 L960 235 M934 213 L960 235 L934 257" stroke="#F97316" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <div class="abs" style="left:1010px;top:120px;display:flex;align-items:center;gap:30px" id="warn">
          <div style="width:130px;height:130px;border-radius:50%;background:var(--or-b);color:#fff;font-size:84px;font-weight:900;display:flex;align-items:center;justify-content:center">!</div>
          <div><div style="font-size:40px;font-weight:700;color:var(--mute)">其實可能是</div><div style="font-size:92px;font-weight:900;letter-spacing:-.04em;color:var(--or);line-height:1.1">早期警訊</div></div>
        </div>
      </div>` },
  ],
  init() {
    gsap.set('#src31', { opacity: 0, y: -10 });
    gsap.set(['#h531', '#h532'], { yPercent: 110 });
    gsap.set('#pan31', { opacity: 0, y: 60 });
    gsap.set(['#say1', '#say2'], { opacity: 0, scale: .7, y: 10 });
    gsap.set(['#sx1', '#sx2'], { scaleX: 0 });
    gsap.set('#arr31', { strokeDasharray: 300, strokeDashoffset: 300 });
    gsap.set('#warn', { opacity: 0, x: 40 });
  },
  animate({ L, E }) {
    L(['#mid30', '#sg', '#sgLbl'], { opacity: 0, duration: .9 }, 182.4);
    L('#S5dark', { opacity: 1, duration: .9 }, 182.4);
    L('#logo', { color: '#FFF6EC', duration: .9 }, 182.4);
    L('#e5', { color: '#E9DCCB', duration: .9 }, 182.4);
    // 離開這一幕：背景變回米色（第 32 幕開始時）
    L('#S5dark', { opacity: 0, duration: .9 }, 189.7);
    L('#logo', { color: '#231B15', duration: .9 }, 189.7);
    L('#e5', { color: '#E2620E', duration: .9 }, 189.7);
    L('#src31', { opacity: 1, y: 0, duration: .5, ease: E }, 182.7);
    L('#h531', { yPercent: 0, duration: .8, ease: 'power4.out' }, 182.8);
    L('#h532', { yPercent: 0, duration: .8, ease: 'power4.out' }, 184.7);
    L('#pan31', { opacity: 1, y: 0, duration: .6, ease: E }, 185.2);
    L('#say1', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 186.2);
    L('#say2', { opacity: 1, scale: 1, y: 0, duration: .5, ease: 'back.out(2)' }, 187.9);
    L(['#sx1', '#sx2'], { scaleX: 1, duration: .35, ease: 'power2.inOut', stagger: .15 }, 188.6);
    L(['#say1', '#say2'], { opacity: .55, duration: .4 }, 188.9);
    L('#arr31', { strokeDashoffset: 0, duration: .4, ease: 'power2.inOut' }, 188.9);
    L('#warn', { opacity: 1, x: 0, duration: .5, ease: E }, 189.0);
  },
});
