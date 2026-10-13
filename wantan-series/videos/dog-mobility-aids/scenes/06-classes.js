// 幕 06｜名稱不統一，依使用方式分三類；這不是正式醫學分類
WT.scene('06', {
  enter: 'slide',
  visuals: ['小標「先提醒」', '三個灰色標籤歪歪的散在上方：「胸背帶？」「吊帶？」「助行器？」（名稱不統一）', '大標：「依實際使用方式，分成三類」', '三張小卡：輔助帶、助行吊帶、輪椅', '下方灰字＋圖示：方便選購的分類，不是正式的醫學分類'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e6" data-text="先提醒"></div></div>
    <div class="abs" style="left:1100px;top:150px;width:760px;height:200px">
      <span class="tag g abs" id="t60" style="left:0;top:40px;transform:rotate(-6deg)">胸背帶？</span>
      <span class="tag g abs" id="t61" style="left:270px;top:0;transform:rotate(4deg)">吊帶？</span>
      <span class="tag g abs" id="t62" style="left:470px;top:90px;transform:rotate(-3deg)">助行器？</span></div>
    ${L.h('h6', [['依實際使用方式，'], ['分成三類', 'o']], { top: 210, size: 92 })}
    ${['harness', 'sling', 'wheel'].map((k, i) => `<div class="abs card" id="c6${i}" style="left:${72 + i * 600}px;top:520px;width:560px;height:270px;border-radius:30px;display:flex;align-items:center;gap:24px;padding:0 36px"><div style="width:190px;flex:none">${L.dev(k)}</div><b style="font-size:46px;font-weight:900">${L.DEV_NAME[k]}</b></div>`).join('')}
    <div class="note" id="n6" style="left:72px;top:850px">ⓘ 方便選購的分類，<b style="color:var(--ink)">不是正式的醫學分類</b></div>`,
  init() { L.hInit('h6', 2); gsap.set('[id^=t6]', { opacity: 0, scale: .6 }); gsap.set('[id^=c6]', { opacity: 0, y: 50 }); gsap.set('#n6', { opacity: 0, y: 20 }); },
  animate(S) {
    S.type('#e6', S.at(0), .4, '小標逐字打出');
    [0, 1, 2].forEach(i => { S.to('#t6' + i, { opacity: 1, scale: 1, duration: .4, ease: 'back.out(2)' }, S.word('不太統一', 0, i * .2), i ? '' : '念到「不太統一」三個灰色名稱標籤彈出');
      S.sfx(S.word('不太統一', 0, i * .2), 'pop-low', `名稱標籤 ${i + 1}：低音「啵」`, { pitch: 1 + i * .1 }); });
    L.hLine(S, '#h61', S.word('實際的使用方式'), '大標第一行'); L.hLine(S, '#h62', S.word('分成三類'), '大標第二行（橘）');
    [0, 1, 2].forEach(i => L.pop(S, '#c6' + i, S.word('分成三類', 0, .3 + i * .3), `分類卡 0${i + 1} 浮上`, [1, 1.12, 1.26][i]));
    S.to('#n6', { opacity: 1, y: 0, duration: .5 }, S.word('方便大家'), '下方灰字浮上');
    S.sfx(S.word('方便大家'), 'slide', '輕「咻」');
  },
});
