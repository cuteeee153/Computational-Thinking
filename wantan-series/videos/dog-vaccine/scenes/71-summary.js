// 幕 71–77｜重點整理：四種疾病總表；只記得三件事；最後提醒；片尾。
const SUM = [
  { n: '狂犬病', ic: 'Badger', k: '發病後幾乎都會死亡，人也會被傳染', v: '另外打（單一疫苗）｜法律規定每年打', b: true, at: '發病後' },
  { n: '犬瘟熱', ic: 'Brain', k: '傳染力很強，可能影響全身和神經', v: '綜合疫苗都有｜核心疫苗', at: '犬瘟熱' },
  { n: '犬小病毒', ic: 'Gut', k: '破壞腸道、嘔吐血便，幼犬最危險', v: '綜合疫苗都有｜核心疫苗', at: '犬小病毒' },
  { n: '犬傳染性肝炎', ic: 'Liver', k: '輕微發燒到死亡都有，幼犬風險高', v: '綜合疫苗都有｜核心疫苗', at: '犬傳染性肝炎' },
];
K.sumRow = (r, i) => `<div class="cd" id="sm${i}" style="left:140px;top:${290 + i * 160}px;width:1640px;height:140px;padding:0 40px;display:flex;align-items:center;gap:30px${r.b ? ';box-shadow:0 0 0 4px #2E6BD8,0 30px 60px -36px rgba(40,60,100,.32)' : ''}">
  <div style="width:90px;height:90px;flex:none">${K.ic(r.ic)}</div><div style="width:290px;font-size:40px;font-weight:900">${r.n}</div>
  <div style="flex:1;font-size:28px;font-weight:700;color:#4A4540">${r.k}</div><span class="pl ${r.b ? 'b' : 'ot'}" style="position:static;font-size:26px">${r.v}</span></div>`;
K.scene('71', 5, {
  enter: 'iris', irisAt: [960, 540], bg: 'mint',
  visuals: ['淡綠底，圓形轉場；小標「重點整理」、大標「台灣飼主一定要認識的四種疾病」', '總表欄位：疾病｜你需要知道的事｜疫苗在哪裡', '第一列「狂犬病」（藍框）：發病後幾乎都會死亡，人也會被傳染｜另外打，法律規定每年打'],
  mount: () => K.kicker('k71', 'SUMMARY', '重點整理', { y: 130 }) + K.h('h71', ['台灣飼主一定要認識的四種疾病'], { y: 170, size: 56 }) +
    `<div class="abs" id="hd71" style="left:180px;top:250px;display:flex;gap:30px;font-size:22px;font-weight:900;color:#9A9590;letter-spacing:.1em"><span style="width:410px;padding-left:120px">疾病</span><span style="width:780px">你需要知道的事</span><span>疫苗在哪裡</span></div>` +
    K.sumRow(SUM[0], 0),
  init() { K.hideLines('h71', 1); },
  animate(S) {
    S.fromTo('#k71', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h71', 1, S.word('四種疾病'), '大標「台灣飼主一定要認識的四種疾病」');
    K.fadeIn(S, '#hd71', S.word('疾病', 1), '欄位名稱：疾病｜你需要知道的事｜疫苗在哪裡');
    K.rise(S, '#sm0', S.word('發病後', 0, -.6), '第一列「狂犬病」浮上', { sfx: 'pop-card', dx: -60, dy: 0 });
  },
});
K.scene('72', 5, {
  enter: 'none',
  visuals: ['（接續總表）第二列「犬瘟熱」、第三列「犬小病毒」依序浮上：綜合疫苗都有｜核心疫苗'],
  mount: () => K.sumRow(SUM[1], 1) + K.sumRow(SUM[2], 2),
  animate(S) {
    K.rise(S, '#sm1', S.word('犬瘟熱', 0, -.2), '第二列「犬瘟熱」浮上', { sfx: 'pop-card', dx: -60, dy: 0 });
    K.rise(S, '#sm2', S.word('犬小病毒', 0, -.2), '第三列「犬小病毒」浮上', { sfx: 'pop-card', dx: -60, dy: 0 });
  },
});
K.scene('73', 5, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）（接續總表）第四列「犬傳染性肝炎」浮上；三列核心疾病右邊的標籤一起亮一下'],
  mount: () => K.sumRow(SUM[3], 3),
  animate(S) {
    K.rise(S, '#sm3', S.word('犬傳染性肝炎', 0, -.2), '第四列「犬傳染性肝炎」浮上', { sfx: 'pop-card', dx: -60, dy: 0 });
    S.to(['#sm1', '#sm2', '#sm3'], { boxShadow: K.RING, duration: .3, yoyo: true, repeat: 1 }, S.word('核心疫苗', 1, -.2), '三列核心疾病一起亮橘框');
    S.sfx(S.word('核心疫苗', 1, -.2), 'ding-soft', '亮起：輕「叮」');
  },
});
const TAKE = [
  { n: '1', t: '三種核心疫苗＋狂犬病', d: '犬瘟熱、犬小病毒、犬傳染性肝炎是核心疫苗；狂犬病是台灣法律規定', at: '第一' },
  { n: '2', t: '幾合一：不是數字越大越好', d: '看實際包含哪些疫苗，再依生活方式和感染風險選', at: '第二' },
  { n: '3', t: '長大後不一定每年都打', d: '保護期、補強間隔不一樣，和獸醫討論', at: '第三' },
];
K.scene('74', 5, {
  enter: 'push', bg: 'sky',
  visuals: ['（這一幕還沒有錄音）大標「如果只記得三件事」', '三張大卡，念到時依序翻上來：1 三種核心疫苗＋狂犬病；2 幾合一不是數字越大越好；3 長大後不一定每年都打'],
  mount: () => K.h('h74', ['如果只記得<b class="o">三件事</b>'], { y: 160, size: 76 }) +
    TAKE.map((c, k) => `<div class="cd" id="tk${k}" style="left:${140 + k * 560}px;top:330px;width:520px;height:560px;padding:44px"><div class="big" style="font-size:150px;color:var(--or)">${c.n}</div><div class="t" style="margin-top:20px;font-size:40px">${c.t}</div><div class="d" style="font-size:28px;margin-top:20px">${c.d}</div></div>`).join(''),
  init() { K.hideLines('h74', 1); },
  animate(S) {
    K.lines(S, 'h74', 1, S.at(0), '大標「如果只記得三件事」');
    S.fromTo('#tk0', { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, S.word('第一', 0, -.2), '第一張卡翻上來，加橘框');
    K.ring(S, '#tk0', S.word('第一'));
    S.sfx(S.word('第一', 0, -.2), 'flip', '翻卡：「啪」');
    gsap.set(['#tk1', '#tk2'], { opacity: 0 });
  },
});
K.scene('75', 5, {
  enter: 'none',
  visuals: ['（這一幕還沒有錄音）（接續）第二、第三張卡依序翻上來、加橘框'],
  animate(S) {
    [1, 2].forEach(k => {
      const t = S.word(TAKE[k].at, 0, -.2);
      K.ring(S, '#tk' + (k - 1), t, false);
      S.fromTo('#tk' + k, { opacity: 0, rotateY: -80 }, { opacity: 1, rotateY: 0, duration: .7, ease: 'power3.out' }, t, `第 ${k + 1} 張卡翻上來，加橘框`);
      K.ring(S, '#tk' + k, t + .2);
      S.sfx(t, 'flip', '翻卡：「啪」');
    });
  },
});
K.scene('76', -1, {
  enter: 'rise',
  visuals: ['小標「最後提醒」；大標「這是疫苗知識的整理，」／「不是施打時程建議」（灰）', '卡片：每隻狗狗的 年齡、健康狀況、接種紀錄、生活環境 都不一樣 → 橘色按鈕「和獸醫一起決定」'],
  mount: () => K.kicker('k76', 'NOTE', '最後提醒', { y: 170 }) + K.h('h76', ['這是疫苗知識的整理，', '~不是施打時程建議'], { y: 220, size: 84 }) +
    `<div class="vet card" id="vet76" style="top:560px"><span class="lb">每隻狗狗的</span>${['年齡', '健康狀況', '接種紀錄', '生活環境'].map((s, k) => `<span class="sym" id="sy76${k}">${s}</span>`).join('')}<span class="lb">都不一樣</span><span class="ar" id="ar76">→</span><span class="go" id="go76">和獸醫一起決定</span></div>`,
  init() { K.hideLines('h76', 2); gsap.set(['#ar76', '#go76'], { opacity: 0, x: -20 }); },
  animate(S) {
    S.fromTo('#k76', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h76', 2, S.word('建立基本'), '大標「這是疫苗知識的整理，不是施打時程建議」', 1.4);
    K.rise(S, '#vet76', S.word('每隻狗狗'), '卡片浮上', { sfx: 'pop-card' });
    ['年齡', '健康狀況', '接種紀錄', '生活環境'].forEach((w, k) => K.pop(S, '#sy76' + k, S.word(w), k ? '' : '念到時四個橘色標籤依序彈出', { pitch: 1 + k * .08, sfx: 'pop-card' }));
    S.to(['#ar76', '#go76'], { opacity: 1, x: 0, duration: .5, ease: 'power3.out', stagger: .1 }, S.word('和獸醫一起決定'), '「和獸醫一起決定」滑入');
    S.sfx(S.word('和獸醫一起決定'), 'tick', '和獸醫一起決定：「叮咚」');
  },
});
K.scene('77', -1, {
  enter: 'zoom', bg: 'mint',
  visuals: ['疫苗手冊圖示磚＋開心的黑柴；大標「下次拿到疫苗手冊，」／「不再對幾合一一頭霧水」（橘）', '片尾：全部淡出，中間大大的頻道 logo＋「汪探｜WanTan」，停格到結尾'],
  mount: () => K.tile('VaccineBook', { id: 't77', x: 1180, y: 280, size: 240, rot: -6 }) + K.dog('happy', { id: 'dg77', x: 1420, y: 330, w: 330 }) +
    K.h('h77', ['下次拿到疫苗手冊，', '<b class="o">不再對幾合一一頭霧水</b>'], { y: 330, size: 76 }) +
    `<div class="endcard" id="end77" style="z-index:1000"><i><img src="brand/wantan-logo.svg" alt=""></i><b>汪探<span class="sep">｜</span>WanTan</b></div>`,
  init() { K.hideLines('h77', 2); gsap.set('#end77', { opacity: 0 }); gsap.set('#end77 i', { scale: .7 }); },
  animate(S) {
    K.pop(S, '#t77', S.word('疫苗手冊'), '疫苗手冊圖示磚', { sfx: 'pop-card' });
    S.fromTo('#dg77', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5, ease: 'back.out(1.8)' }, S.word('疫苗手冊', 0, .2), '開心的黑柴');
    K.lines(S, 'h77', 2, S.word('一頭霧水', 0, -1), '大標「下次拿到疫苗手冊，不再對幾合一一頭霧水」', .5);
    S.sfx(S.word('健康防護'), 'chime', '收尾：叮鈴');
    const e = S.narrEnd + 1.2;
    S.to(['#logo', '#nav'], { opacity: 0, duration: .5 }, e);
    S.to('#end77', { opacity: 1, duration: .7 }, e, '全部淡出，片尾 logo 出現，停格到結尾');
    S.to('#end77 i', { scale: 1, duration: .9, ease: 'back.out(1.8)' }, e);
    S.sfx(e, 'whoosh', '片尾：「咻」', { gain: .6 });
  },
  key: S => S.narrEnd - .3,
});
