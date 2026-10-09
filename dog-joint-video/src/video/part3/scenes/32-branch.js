// 幕 32｜「如果完全沒有任何徵兆，就留在第一步判斷出的分組，持續觀察；只要出現任何徵兆……都直接跳到第三步」
// 大標、來源與卡片退場；上方出現「STEP 02 有蛛絲馬跡嗎？」，往左下畫灰線「完全沒有」→「留在原本的分組」，
// 往右下畫橘線「出現任何徵兆」→「直接跳到第三步」（橘色折角），最後右邊卡片浮起加上橘框。
Intro.scene({
  id: '32', title: '有徵兆就跳到第三步', start: 189.7, end: 200.0,
  // ↓ 給分鏡修改板看的白話說明（改動畫時一起更新）
  key: 199.5,
  visuals: ["上方深色膠囊：「STEP 02　有蛛絲馬跡嗎？」", "往左下的灰色分岔線，標籤「完全沒有」", "左下卡片：「留在原本的分組」，右下角夾板圖示", "左邊重點一：「✓ 第一步判斷出的分組」", "左邊重點二：「✓ 持續觀察」", "往右下的橘色分岔線，標籤「出現任何徵兆」（橘字）", "右下卡片：「直接跳到第三步」（橘），右上角橘色折角", "右邊重點一：「! 哪怕很輕微」", "右邊重點二：「! 不管年紀多小」"],
  motions: ["189.7 秒｜大標往上退出，來源標籤和卡片淡出", "189.9 秒｜「STEP 02 有蛛絲馬跡嗎？」彈出", "190.1 秒｜灰色分岔線往左下畫出", "190.4 秒｜「完全沒有」彈出", "190.6 秒｜「留在原本的分組」卡片浮上來", "191.6 秒｜左邊重點一由左滑入", "193.5 秒｜左邊重點二由左滑入", "194.4 秒｜左邊卡片變淡，橘色分岔線往右下畫出", "194.7 秒｜「出現任何徵兆」彈出", "194.9 秒｜「直接跳到第三步」卡片浮上來，折角彈開", "195.8 秒｜右邊重點一由左滑入", "196.7 秒｜右邊重點二由左滑入", "197.7 秒｜右邊卡片浮起、加上橘框"],
  sfx: [],
  mount: [
    { into: '#S5-flow', html: `
      <div class="node" id="node32"><b>STEP 02</b>有蛛絲馬跡嗎？</div>
      <svg class="abs" style="left:0;top:0" width="1920" height="1080">
        <path id="br32L" d="M960 300 L960 340 Q960 360 940 360 L530 360 Q510 360 510 380 L510 520" stroke="#CDBFAE" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="br32R" d="M960 300 L960 340 Q960 360 980 360 L1390 360 Q1410 360 1410 380 L1410 520" stroke="#F97316" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div class="brl" style="left:735px;top:360px" id="brl32L">完全沒有</div>
      <div class="brl" style="left:1185px;top:360px;color:var(--or);border-color:#F3A46B" id="brl32R">出現任何徵兆</div>
      <div class="grp card" id="g32A" style="left:100px;top:520px">
        <div class="ttl">留在原本的分組</div>
        <div class="bl" id="g32a1"><i style="background:#F1E8DC;color:#9A8C7C">✓</i>第一步判斷出的分組</div>
        <div class="bl" id="g32a2"><i style="background:#F1E8DC;color:#9A8C7C">✓</i>持續觀察</div>
        <div class="abs" style="right:40px;bottom:36px;width:140px" id="g32Aic"></div>
      </div>
      <div class="grp card" id="g32B" style="left:1000px;top:520px">
        <div class="fold" id="g32fold"></div>
        <div class="ttl o">直接跳到第三步</div>
        <div class="bl" id="g32b1"><i style="background:#FDE6D5;color:var(--or)">!</i>哪怕很輕微</div>
        <div class="bl" id="g32b2"><i style="background:#FDE6D5;color:var(--or)">!</i>不管年紀多小</div>
        <div class="abs" style="right:40px;bottom:36px;width:140px" id="g32Bic"></div>
      </div>` },
  ],
  assets() {
    g32Aic.innerHTML = iconClipboard('g32a');
    g32Bic.innerHTML = iconFlag('g32b');
  },
  init() {
    gsap.set('#node32', { opacity: 0, scale: .7 });
    gsap.set(['#br32L', '#br32R'], { strokeDasharray: 1000, strokeDashoffset: 1000 });
    gsap.set(['#brl32L', '#brl32R'], { opacity: 0, scale: .7 });
    gsap.set(['#g32A', '#g32B'], { opacity: 0, y: 40 });
    gsap.set('#g32fold', { scale: 0 });
    gsap.set(['#g32a1', '#g32a2', '#g32b1', '#g32b2'], { opacity: 0, x: -20 });
  },
  animate({ L, E }) {
    L(['#h531', '#h532'], { yPercent: -110, duration: .6, ease: 'power3.in', stagger: .08 }, 189.7);
    L(['#src31', '#pan31'], { opacity: 0, duration: .4 }, 189.7);
    L('#node32', { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2)' }, 189.9);
    L('#br32L', { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, 190.1);
    L('#brl32L', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 190.4);
    L('#g32A', { opacity: 1, y: 0, duration: .6, ease: E }, 190.6);
    L('#g32a1', { opacity: 1, x: 0, duration: .5, ease: E }, 191.6);
    L('#g32a2', { opacity: 1, x: 0, duration: .5, ease: E }, 193.5);
    L('#g32A', { opacity: .55, duration: .5 }, 194.4);
    L('#br32R', { strokeDashoffset: 0, duration: .8, ease: 'power2.inOut' }, 194.4);
    L('#brl32R', { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, 194.7);
    L('#g32B', { opacity: 1, y: 0, duration: .6, ease: E }, 194.9);
    L('#g32fold', { scale: 1, duration: .5, ease: 'back.out(2)' }, 195.2);
    L('#g32b1', { opacity: 1, x: 0, duration: .5, ease: E }, 195.8);
    L('#g32b2', { opacity: 1, x: 0, duration: .5, ease: E }, 196.7);
    L('#g32B', { y: -8, boxShadow: '0 0 0 4px #F97316, 0 50px 90px -40px rgba(107,74,42,.35)', duration: .5, ease: E }, 197.7);
  },
});
