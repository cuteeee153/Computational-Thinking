// 幕 72–75｜重點整理：記住這三個原則＋結尾、片尾

// ---------- 幕 72–74｜三個原則 ----------
const TK72 = [
  { n: '1', ic: 'Label', t: '先看營養完整，再看年紀', d: '能不能當主食、為哪個生命階段設計', at: '第一' },
  { n: '2', ic: 'FoodBag', t: '種類沒有絕對的好壞', d: '重點是營養和需求', at: '第二' },
  { n: '3', ic: 'Jerky', t: '別忽略餵食量和零食', d: '零食不超過每日熱量的 10%', at: '第三' },
];
K.scene('72', 6, {
  enter: 'iris', irisAt: [960, 540], bg: 'sky',
  visuals: ['（這一幕還沒有錄音）', '淡藍底，圓形轉場；小標「重點整理」，大標「記住這三個原則，」／「不再被廣告牽著走」（橘）', '三張大卡；念到「第一」：第一張卡翻上來、加橘框：1 先看營養完整，再看年紀＋能不能當主食、為哪個生命階段設計'],
  mount: () => K.kicker('k72', 'SUMMARY', '重點整理', { y: 120 }) + K.h('h72', ['記住這三個原則，', '<b class="o">不再被廣告牽著走</b>'], { y: 160, size: 72 }) +
    TK72.map((c, k) => `<div class="cd" id="tk${k}" style="left:${140 + k * 560}px;top:400px;width:520px;height:460px;padding:40px"><div style="display:flex;align-items:center;justify-content:space-between"><span class="big" style="font-size:130px;color:var(--or)">${c.n}</span><div style="width:130px;height:130px">${K.ic(c.ic)}</div></div><div class="t" style="margin-top:26px;font-size:40px">${c.t}</div><div class="d" style="font-size:26px;margin-top:16px">${c.d}</div></div>`).join(''),
  init() { K.hideLines('h72', 2); gsap.set(['#tk0', '#tk1', '#tk2'], { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k72', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h72', 2, S.at(0) + .1, '大標「記住這三個原則，不再被廣告牽著走」');
    S.sfx(S.at(0), 'chime', '重點整理：叮鈴');
    const t = S.word('第一', 0, -.2);
    S.fromTo('#tk0', { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, t, '第一張卡翻上來、加橘框');
    K.ring(S, '#tk0', t + .2);
    S.sfx(t, 'flip', '翻卡：「啪」');
  },
});
[1, 2].forEach(k => K.scene(String(72 + k), 6, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）', `（接續）念到「${TK72[k].at}」：第 ${k + 1} 張卡翻上來、加橘框：${TK72[k].n} ${TK72[k].t}＋${TK72[k].d}`],
  animate(S) {
    const t = S.word(TK72[k].at, 0, -.2);
    K.ring(S, '#tk' + (k - 1), t, false);
    S.fromTo('#tk' + k, { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, t, `第 ${k + 1} 張卡翻上來、加橘框`);
    K.ring(S, '#tk' + k, t + .2);
    S.sfx(t, 'flip', '翻卡：「啪」');
  },
}));

// ---------- 幕 75｜不一定要買最貴的＋片尾 ----------
K.scene('75', -1, {
  enter: 'zoom', bg: 'mint',
  visuals: ['淡綠底；大標「不一定要買最貴的，」／「選營養完整、適合牠的」（橘）；右邊吃飯的黑柴', '念到「持續觀察」：橘色標籤「持續觀察體態和健康狀況」', '念到「飼料牆前」：左下一排小飼料袋；念到「先確認哪些資訊」：最前面那包加橘框、打勾', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」，停格到結尾'],
  mount: () => K.h('h75', ['不一定要買最貴的，', '<b class="o">選營養完整、適合牠的</b>'], { y: 220, size: 84 }) +
    K.dog('food', { id: 'dg75', x: 1380, y: 300, w: 380 }) +
    K.pill('p75', '持續觀察體態和健康狀況', 140, 480, 'o', { fs: 40 }) +
    `<div class="abs" id="wl75" style="left:140px;top:620px;display:flex;gap:20px">${[0, 1, 2, 3, 4, 5].map(k => `<div class="tile" id="wb75${k}" style="position:relative;width:130px;height:130px;border-radius:34px">${K.ic('FoodBag')}</div>`).join('')}</div>` +
    `<div class="abs" id="ck75" style="left:225px;top:600px">${K.chk().replace('class="chk"', 'class="chk" style="width:56px;height:56px;margin:0"')}</div>` +
    `<div class="endcard" id="end75" style="z-index:1000"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() { K.hideLines('h75', 2); gsap.set(['#dg75', '#p75', '#ck75', '#end75'], { opacity: 0 }); gsap.set('#wl75 .tile', { opacity: 0, y: 30 }); gsap.set('#end75 i', { scale: .7 }); },
  animate(S) {
    K.lines(S, 'h75', 2, S.at(0), '大標「不一定要買最貴的，選營養完整、適合牠的」', .5);
    K.dogIn(S, '#dg75', S.at(0) + .3, '右邊吃飯的黑柴');
    K.pop(S, '#p75', S.word('持續觀察', 0, -.2), '橘色標籤「持續觀察體態和健康狀況」', { sfx: 'pop-card' });
    S.to('#wl75 .tile', { opacity: 1, y: 0, duration: .4, stagger: .08, ease: 'back.out(1.6)' }, S.word('飼料牆', 0, -.3), '左下一排小飼料袋（飼料牆）');
    S.sfx(S.word('飼料牆', 0, -.3), 'pop', '飼料袋：連續「啵」', { gain: .6 });
    const t = S.word('先確認', 0, -.2);
    S.to('#wb750', { boxShadow: K.RING, duration: .3 }, t, '最前面那包加橘框、打勾');
    K.pop(S, '#ck75', t + .1, '', { sfx: false });
    S.sfx(t, 'chime', '收尾：叮鈴');
    const e = S.narrEnd + 1.2;
    S.to(['#logo', '#nav'], { opacity: 0, duration: .5 }, e);
    S.to('#end75', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end75 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
