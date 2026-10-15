// 幕 22、24～26 共用：左上四階小樓梯（目前這階亮橘），標題「第○階段」＋一行狀況；左邊狀況清單逐條浮上；右邊建議卡
function stageScene(id, { no, title, syms, rec, notes = [] }) {
  WT.scene(id, {
    enter: 'slide',
    visuals: [`左上角四階小樓梯，第 ${no} 階亮橘`, `小標「第${'一二三四'[no - 1]}階段」，大標「${title[0]}」`, ...syms.map((s, k) => `狀況 ${k + 1}：「${s[0]}」`),
      ...(rec ? [`右邊建議卡：「${rec.label}」＋${rec.kind ? L.DEV_NAME[rec.kind] + '插畫' : '黑柴'}＋橘色「${rec.name}」`] : []), ...notes.map(n => `接在狀況下面的深色卡（白字）：「${n[0]}」`)],
    mount: () => `
      <div class="steps">${[0, 1, 2, 3].map(k => `<i class="${k === no - 1 ? 'on' : ''}" style="height:${30 + k * 26}px"></i>`).join('')}</div>
      <div class="stg"><div class="k" id="k${id}" data-text="第${'一二三四'[no - 1]}階段"></div><h2 id="t${id}">${title[0]}</h2></div>
      <div class="syms" style="top:${notes.length ? 330 : 400}px">${syms.map((s, k) => `<div class="sym2 card" id="sy${id}${k}"><em></em>${s[0]}</div>`).join('')}${notes.map((n, k) => `<div class="sym2 card dk" id="nt${id}${k}"><span class="mk ok" style="width:48px;height:48px;font-size:28px">!</span>${n[0]}</div>`).join('')}</div>
      ${rec ? `<div class="rec card" id="rc${id}" style="top:${notes.length ? 260 : 330}px"><div class="k">${rec.label}</div>${rec.kind ? L.dev(rec.kind) : `<div class="dv">${WT.dog(rec.dog)}</div>`}<b>${rec.name}</b></div>` : ''}
`,
    init() { gsap.set('#t' + id, { opacity: 0, y: 30 }); gsap.set(`[id^=sy${id}]`, { opacity: 0, x: -40 }); gsap.set(`[id^=rc${id}]`, { opacity: 0, y: 50 }); gsap.set(`[id^=nt${id}]`, { opacity: 0, x: -40 }); },
    animate(S) {
      S.type('#k' + id, S.at(0), .5, '小標逐字打出');
      S.to('#t' + id, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.at(1), '大標浮上'); S.sfx(S.at(1), 'pop-card', '大標：「啵」');
      syms.forEach((s, k) => L.pop(S, `#sy${id}${k}`, S.word(s[1]), `狀況 ${k + 1} 由左滑入`, 1, 'slide'));
      if (rec) { const t = rec.atEnd ? S.wordEnd(rec.atEnd, 0, .3) : S.word(rec.at); L.pop(S, '#rc' + id, t, '建議卡浮上、加橘框'); S.to('#rc' + id, { boxShadow: L.RING, duration: .4 }, t); L.ding(S, t + .3, '建議'); }
      notes.forEach((n, k) => L.pop(S, `#nt${id}${k}`, S.word(n[1]), '深色提醒卡接在狀況下面滑入', 1, 'slide'));
    },
  });
}
stageScene('22', { no: 1, title: ['起身比較慢，但走路大致正常'],
  syms: [['早上起床時有點僵硬', '有點僵硬'], ['站起來比較慢', '站起來比較慢'], ['站穩之後，走路和上下樓梯還算正常', '站穩之後'], ['沒有明顯跛腳或跌倒', '沒有明顯']],
  rec: { label: '這個階段', dog: 'senior-sit', name: '先別急著買', at: '這時候' } });
