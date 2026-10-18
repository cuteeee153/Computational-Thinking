// 幕 17–20｜第一步：四種疾病。四張疾病卡一排：狂犬病（台灣法律）＋三種核心疫苗；第五張虛線卡「鉤端螺旋體」等第三步再說。
const ORDER17 = [3, 0, 1, 2], X17 = [140, 520, 850, 1180];
K.scene('17', 1, {
  enter: 'iris', irisAt: [960, 600], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 01」', '大標「台灣飼主一定要先認識的」／「四種疾病」（灰）', '念到「四種疾病」：四張疾病卡依序浮上——狂犬病（鼬獾）、犬瘟熱（腦）、犬小病毒（腸）、犬傳染性肝炎（肝）'],
  mount: () => K.kicker('k17', 'STEP 01', '第一步', { y: 150 }) + K.h('h17', ['台灣飼主一定要先認識的', '~四種疾病'], { y: 200, size: 84 }) +
    ORDER17.map((k, i) => K.disCard('d17' + i, k, X17[i], 470, 300)).join(''),
  init() { K.hideLines('h17', 2); },
  animate(S) {
    S.fromTo('#k17', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h17', 2, S.at(0) + .2, '大標冒出');
    S.sfx(S.at(0), 'chime', '新章節：叮鈴');
    ORDER17.forEach((k, i) => K.rise(S, '#d17' + i, S.word('四種疾病', 1, -.3 + i * .18), i ? '' : '四張疾病卡依序浮上', { sfx: 'pop-card', dy: 80 }));
  },
});
K.scene('18', 1, {
  enter: 'none',
  visuals: ['（接續）狂犬病卡加藍框，下方兩個標籤：人也可能感染、台灣法律規定', '其他三張卡變淡'],
  mount: () => `<div class="pl bt" id="p180" style="left:140px;top:800px;font-size:26px;padding:10px 22px">人也可能感染</div><div class="pl b" id="p181" style="left:140px;top:870px;font-size:26px;padding:10px 22px">台灣法律規定</div>`,
  animate(S) {
    S.to('#d170', { boxShadow: '0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)', y: -16, duration: .4 }, S.word('狂犬病'), '狂犬病卡加藍框、往上浮');
    S.to(['#d171', '#d172', '#d173'], { opacity: .35, duration: .4 }, S.word('狂犬病'), '其他三張變淡');
    S.sfx(S.word('狂犬病'), 'tick-soft', '亮起：輕點');
    K.rise(S, '#p180', S.word('人也可能'), '標籤「人也可能感染」', { dy: 20 });
    K.rise(S, '#p181', S.word('法律規定'), '標籤「台灣法律規定」', { dy: 20 });
  },
});
K.scene('19', 1, {
  enter: 'none',
  visuals: ['（接續）三張核心疾病卡亮起、加橘框；上方橘色括號＋「核心疫苗｜WSAVA、AAHA 都列入」', '下方橘色字「每隻狗狗都建議打」'],
  mount: () => `<div class="abs" id="b19" style="left:520px;top:400px;width:960px;height:50px;border:5px solid var(--or-b);border-bottom:none;border-radius:24px 24px 0 0"></div><div class="pl o" id="p19" style="left:740px;top:364px;font-size:28px;padding:10px 26px">核心疫苗｜WSAVA、AAHA 都列入</div>` +
    `<div class="sub" id="s19" style="left:520px;top:810px;font-weight:900;font-size:40px"><b>每隻狗狗都建議打</b></div>`,
  init() { gsap.set('#b19', { scaleX: 0 }); },
  animate(S) {
    S.to('#d170', { boxShadow: K.PLAIN, y: 0, opacity: .45, duration: .4 }, S.word('另外三種'));
    ['#d171', '#d172', '#d173'].forEach((c, i) => S.to(c, { opacity: 1, boxShadow: K.RING, duration: .4 }, S.word(['犬瘟熱', '犬小病毒', '肝炎'][i]), i ? '' : '念到時三張核心疾病卡依序亮起、加橘框'));
    S.sfx(S.word('另外三種'), 'tick-soft', '亮起：輕點');
    S.to('#b19', { scaleX: 1, duration: .6, ease: 'power3.out' }, S.word('核心疫苗', 0, -.4), '上方畫出橘色括號');
    K.pop(S, '#p19', S.word('核心疫苗'), '「核心疫苗」標籤', { sfx: 'ding-soft' });
    K.rise(S, '#s19', S.word('每隻狗狗'), '「每隻狗狗都建議打」', { dy: 20 });
  },
});
K.scene('20', 1, {
  enter: 'none',
  visuals: ['（接續）最右邊冒出第五張虛線卡「鉤端螺旋體」（細菌圖示）', '貼一張藍色便條「兩份指引看法不同｜第三步再說明」'],
  mount: () => `<div class="cd" id="d20" style="left:1540px;top:470px;width:300px;height:300px;padding:30px;text-align:center;background:rgba(255,255,255,.6);box-shadow:none;border:4px dashed #BFC9D8"><div class="ic" style="margin:0 auto;width:140px;height:140px">${K.ic('Bacteria')}</div><div class="t" style="margin-top:20px;font-size:36px;color:#7C7772">鉤端螺旋體</div></div>` +
    `<div class="cd" id="n20" style="left:1460px;top:790px;width:390px;padding:22px 28px;transform:rotate(3deg);background:#EAF1FC;box-shadow:0 20px 40px -24px rgba(40,60,100,.4)"><div style="font-size:26px;font-weight:900;color:#1F55B8">兩份指引看法不同</div><div style="font-size:24px;font-weight:700;color:#5E7DB5;margin-top:4px">第三步再說明 →</div></div>`,
  animate(S) {
    S.to(['#d171', '#d172', '#d173'], { boxShadow: K.PLAIN, opacity: .55, duration: .4 }, S.word('還有一種'));
    S.to(['#s19', '#p180', '#p181'], { opacity: 0, duration: .3 }, S.word('還有一種'));
    K.pop(S, '#d20', S.word('鉤端螺旋體'), '第五張虛線卡「鉤端螺旋體」冒出', { sfx: 'pop-card' });
    S.fromTo('#n20', { opacity: 0, y: 30, rotate: -6 }, { opacity: 1, y: 0, rotate: 3, duration: .5, ease: 'back.out(1.6)' }, S.word('兩份國際指引'), '藍色便條「兩份指引看法不同｜第三步再說明」貼上');
    S.sfx(S.word('兩份國際指引'), 'flip', '便條：「啪」');
  },
});
