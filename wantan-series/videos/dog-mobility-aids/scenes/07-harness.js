// 幕 07～10 共用：左邊大插畫，右邊「第幾種」＋名稱＋使用時機標籤＋一行重點
function heroScene(id, { kind, no, tags, one, s, at }) {
  WT.scene(id, {
    enter: 'slide',
    visuals: [`左邊白卡：大大的黑柴＋${L.DEV_NAME[kind]}插畫，右上角淡淡的大數字 0${no}`, `右邊小標「第${'一二三'[no - 1]}種」，大字「${L.DEV_NAME[kind]}」`,
      ...(tags.length ? [`標籤：${tags.map(t => t[0]).join('、')}`] : []), `橘字一行：「${one[0]}」` + (s ? `；灰字：「${s[0]}」` : '')],
    mount: () => `
      <div class="hero card" id="hr${id}"><div class="ghost">0${no}</div>${L.dev(kind)}</div>
      <div class="info"><div class="k" id="k${id}" data-text="第${'一二三'[no - 1]}種"></div><h2 id="n${id}">${L.DEV_NAME[kind]}</h2>
        <div class="tags">${tags.map((t, k) => `<span class="tag" id="tg${id}${k}">${t[0]}</span>`).join('')}</div>
        <div class="one" id="o${id}">${one[0]}</div>${s ? `<div class="s" id="s${id}">${s[0]}</div>` : ''}</div>`,
    init() { gsap.set('#hr' + id, { opacity: 0, x: -60 }); gsap.set('#n' + id, { opacity: 0, y: 30 }); gsap.set(`[id^=tg${id}]`, { opacity: 0, scale: .6 }); gsap.set(['#o' + id, '#s' + id].filter(x => document.querySelector(x)), { opacity: 0, y: 24 }); },
    animate(S) {
      S.type('#k' + id, S.at(0), .4, '小標逐字打出');
      S.to('#hr' + id, { opacity: 1, x: 0, duration: .7, ease: 'power3.out' }, S.at(0), '插畫卡由左滑入');
      S.sfx(S.at(0), 'slide', '插畫卡：輕「咻」');
      S.to('#n' + id, { opacity: 1, y: 0, duration: .6, ease: 'back.out(1.6)' }, S.at(1), `「${L.DEV_NAME[kind]}」浮上`);
      S.sfx(S.at(1), 'pop-card', '名稱：「啵」');
      tags.forEach((t, k) => { S.to(`#tg${id}${k}`, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(t[1]), `標籤「${t[0]}」彈出`); S.sfx(S.word(t[1]), 'pop', `${t[0]}：「啵」`, { pitch: 1 + k * .12 }); });
      S.to('#o' + id, { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.word(one[1]), '橘字重點浮上'); L.ding(S, S.word(one[1]), '重點');
      if (s) S.to('#s' + id, { opacity: 1, y: 0, duration: .5 }, S.word(s[1]), '灰字補充浮上');
    },
  });
}
heroScene('07', { kind: 'harness', no: 1, tags: [['起身', '起身'], ['上下車', '上下車'], ['跨越小階梯', '小階梯']], one: ['幫忙托住，不用自己承受全部重量', '不用自己'] });
