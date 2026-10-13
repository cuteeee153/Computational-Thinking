// 幕 20｜四個階段：四階樓梯由低到高
const ST20 = ['起身比較慢', '偶爾跛腳、打滑', '走沒幾步就沒力', '後腳幾乎無法支撐'];
WT.scene('20', {
  enter: 'slide',
  visuals: ['大標：「常見狀況整理成」（黑）／「四個階段」（橘）', '四階樓梯由左下往右上，每階一張卡：第一～四階段＋一行狀況（' + ST20.join('／') + '）'],
  mount: () => `
    ${L.h('h20', [['常見狀況整理成'], ['四個階段', 'o']], { top: 150, size: 92 })}
    ${ST20.map((s, k) => `<div class="abs card" id="st20${k}" style="left:${72 + k * 450}px;top:${720 - k * 110}px;width:430px;height:${240 + k * 110}px;border-radius:30px;padding:30px 32px;background:${['#FFF3E8', '#FDE1C8', '#FBC79C', '#F7A266'][k]}">
      <div class="k" style="color:#B4470A">第${'一二三四'[k]}階段</div><b style="display:block;margin-top:10px;font-size:38px;font-weight:900;line-height:1.3">${s}</b></div>`).join('')}`,
  init() { L.hInit('h20', 2); gsap.set('[id^=st20]', { opacity: 0, y: 80 }); },
  animate(S) {
    L.hLine(S, '#h201', S.at(0)); L.hLine(S, '#h202', S.word('四個階段'), '大標第二行（橘）');
    ST20.forEach((_, k) => { const t = S.word('四個階段', 0, .3 + k * .35); S.to('#st20' + k, { opacity: 1, y: 0, duration: .55, ease: 'back.out(1.6)' }, t, k ? '' : '四階樓梯由左到右依序升起'); S.sfx(t, 'note', `第${k + 1}階：木琴音`, { pitch: [1, 1.12, 1.26, 1.5][k] }); });
  },
});
