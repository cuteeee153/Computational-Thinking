// 幕 06｜名稱不統一（三個名稱標籤放大在中間，接著掉下去）→ 依使用方式分三類；這不是正式醫學分類
WT.scene('06', {
  enter: 'slide',
  visuals: ['一開始畫面中間三個放大的灰色標籤，歪歪的：「胸背帶？」「吊帶？」「助行器？」（名稱不統一）', '標籤往下掉出畫面', '大標一行：「依實際使用方式，分成三類」（「分成三類」橘色）', '三張大卡：輔助帶、助行吊帶、輪椅', '下方灰字＋圖示：方便選購的分類，不是正式的醫學分類'],
  mount: () => `
    <div class="abs" id="tg6" style="left:580px;top:380px;width:760px;height:200px">
      <span class="tag g abs" id="t60" style="left:0;top:40px;transform:rotate(-6deg)">胸背帶？</span>
      <span class="tag g abs" id="t61" style="left:270px;top:0;transform:rotate(4deg)">吊帶？</span>
      <span class="tag g abs" id="t62" style="left:470px;top:90px;transform:rotate(-3deg)">助行器？</span></div>
    ${L.h('h6', [['依實際使用方式，<span class="o">分成三類</span>']], { top: 170, size: 92 })}
    ${['harness', 'sling', 'wheel'].map((k, i) => `<div class="abs card" id="c6${i}" style="left:${72 + i * 600}px;top:380px;width:576px;height:380px;border-radius:34px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px"><div style="width:230px">${L.dev(k)}</div><b style="font-size:52px;font-weight:900">${L.DEV_NAME[k]}</b></div>`).join('')}
    <div class="note" id="n6" style="left:72px;top:820px;font-size:34px">ⓘ 方便選購的分類，<b style="color:var(--ink)">不是正式的醫學分類</b></div>`,
  init() { L.hInit('h6', 1); gsap.set('#tg6', { scale: 1.7 }); gsap.set('[id^=t6]', { opacity: 0, scale: .6 }); gsap.set('[id^=c6]', { opacity: 0, y: 50 }); gsap.set('#n6', { opacity: 0, y: 20 }); },
  animate(S) {
    [0, 1, 2].forEach(i => { S.to('#t6' + i, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('不太統一', 0, i * .2), i ? '' : '念到「不太統一」三個放大的名稱標籤在中間彈出');
      S.sfx(S.word('不太統一', 0, i * .2), 'pop-low', `名稱標籤 ${i + 1}：低音「啵」`, { pitch: 1 + i * .1 }); });
    const drop = S.word('實際的使用方式', 0, -.7);
    [0, 1, 2].forEach(i => S.to('#t6' + i, { y: 900, rotation: [-25, 18, -12][i], duration: .7, ease: 'power2.in' }, drop + i * .06, i ? '' : '三個標籤往下掉出畫面'));
    S.sfx(drop, 'fall', '掉下去：往下滑音');
    L.hLine(S, '#h61', S.word('實際的使用方式'), '大標冒出（一行）');
    [0, 1, 2].forEach(i => L.pop(S, '#c6' + i, S.word('分成三類', 0, .3 + i * .3), `分類卡 0${i + 1} 浮上`, [1, 1.12, 1.26][i]));
    S.to('#n6', { opacity: 1, y: 0, duration: .5 }, S.word('方便大家'), '下方灰字浮上');
    S.sfx(S.word('方便大家'), 'slide', '輕「咻」');
  },
});
