// 幕 50–55｜多出來的那幾種：犬舍咳相關、鉤端螺旋體（兩份指引看法不同、台灣資料不足）、犬冠狀病毒（WSAVA 不建議常規施打）。
const EX50 = [['Cough', '犬舍咳相關'], ['Bacteria', '鉤端螺旋體'], ['Virus', '犬冠狀病毒']];
K.scene('50', 3, {
  enter: 'push',
  visuals: ['大標「多出來的疫苗，」／「有什麼作用？」（灰）', '三張卡念到時依序浮上：犬舍咳相關、鉤端螺旋體、犬冠狀病毒（編號 1、2、3）', '下方：要不要打 → 生活方式＋感染風險＋獸醫評估；藍色便條「國際指引看法不完全相同，一個一個看」'],
  mount: () => K.h('h50', ['多出來的疫苗，', '~有什麼作用？'], { y: 160, size: 72 }) +
    EX50.map(([ic, t], k) => `<div class="cd" id="c50${k}" style="left:${140 + k * 400}px;top:400px;width:360px;height:340px;padding:34px;text-align:center"><div class="big abs" style="left:24px;top:16px;font-size:50px;color:var(--or)">${k + 1}</div><div class="ic" style="margin:20px auto 0;width:160px;height:160px">${K.ic(ic)}</div><div class="t" style="margin-top:18px">${t}</div></div>`).join('') +
    `<div class="abs" id="r50" style="left:140px;top:800px;display:flex;gap:16px;align-items:center;font-size:30px;font-weight:900;white-space:nowrap">要不要打 →<span class="pl bt" style="position:static">生活方式</span>＋<span class="pl bt" style="position:static">感染風險</span>＋<span class="pl ot" style="position:static">獸醫評估</span></div>` +
    `<div class="cd" id="n50" style="left:1400px;top:420px;width:380px;padding:30px;transform:rotate(3deg);background:#EAF1FC;box-shadow:0 20px 40px -24px rgba(40,60,100,.4)"><div style="font-size:30px;font-weight:900;color:#1F55B8;line-height:1.4">國際指引看法<br>不完全相同</div><div style="font-size:26px;font-weight:700;color:#5E7DB5;margin-top:8px">一個一個來看 →</div></div>`,
  init() { K.hideLines('h50', 2); },
  animate(S) {
    K.lines(S, 'h50', 2, S.at(0), '大標「多出來的疫苗，有什麼作用？」');
    EX50.forEach(([, w], k) => K.rise(S, '#c50' + k, S.word(w.slice(0, 3), 0, -.1), k ? '' : '念到時三張卡依序浮上', { sfx: 'pop-card', dy: 60 }));
    K.rise(S, '#r50', S.word('要不要打'), '下方：要不要打 → 生活方式＋感染風險＋獸醫評估');
    S.fromTo('#n50', { opacity: 0, y: 30, rotate: -6 }, { opacity: 1, y: 0, rotate: 3, duration: .5, ease: 'back.out(1.6)' }, S.word('不完全相同'), '藍色便條「國際指引看法不完全相同」');
    S.sfx(S.word('不完全相同'), 'flip', '便條：「啪」');
  },
});
K.scene('51', 3, {
  enter: 'zoom', bg: 'mint',
  visuals: ['小標「1」＋大標「犬舍咳相關疫苗」，說明「會讓狗狗咳嗽的呼吸道傳染病」', '右邊：一大群狗狗大頭貼擠在一起（收容所），幾隻冒出「咳」', '下方兩列（WSAVA 指引）：一般家犬 → 依風險評估；收容所等高密度環境 → 可能需要更積極的保護（橘）'],
  mount: () => K.anno('a51', '1', '', { x: 140, y: 150, bs: 100 }) + K.h('h51', ['犬舍咳相關疫苗'], { x: 240, y: 170, size: 76 }) +
    `<div class="sub" id="s51" style="left:140px;top:300px">會讓狗狗<b>咳嗽</b>的呼吸道傳染病</div>` +
    `<div class="cd" id="c51" style="left:1080px;top:200px;width:700px;height:440px;padding:30px;overflow:hidden"><div class="k">收容所｜狗狗密集的地方</div>` +
    [...Array(15)].map((_, k) => `<img id="av51${k}" src="assets/dogs/clay/avatar.png" style="position:absolute;left:${40 + (k % 5) * 128 + (Math.floor(k / 5) % 2) * 40}px;top:${70 + Math.floor(k / 5) * 118}px;width:120px;height:120px;border-radius:50%;background:#F1EDE8">`).join('') +
    [2, 8, 12].map((k, i) => `<div class="ico" id="cg51${i}" style="left:${80 + (k % 5) * 128 + (Math.floor(k / 5) % 2) * 40}px;top:${40 + Math.floor(k / 5) * 118}px;width:90px;height:90px">${K.ic('Cough')}</div>`).join('') + `</div>` +
    `<div class="pl bt" id="w51" style="left:140px;top:430px;font-size:26px;padding:8px 20px">WSAVA 指引</div>` +
    `<div class="cd" id="r510" style="left:140px;top:500px;width:860px;height:120px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;font-size:34px;font-weight:900"><span>一般家犬</span><span class="bl">→ 依風險評估</span></div>` +
    `<div class="cd" id="r511" style="left:140px;top:650px;width:860px;height:120px;padding:0 40px;display:flex;align-items:center;justify-content:space-between;font-size:34px;font-weight:900;box-shadow:${K.RING}"><span>收容所等高密度環境</span><span class="o">→ 更積極保護</span></div>`,
  init() { K.hideLines('h51', 1); gsap.set('[id^=av51]', { opacity: 0, scale: .4 }); },
  animate(S) {
    K.pop(S, '#a51', S.at(0), '', { sfx: false });
    K.lines(S, 'h51', 1, S.at(0), '大標「犬舍咳相關疫苗」');
    K.rise(S, '#s51', S.word('咳嗽', 0, -.3), '說明「會讓狗狗咳嗽的呼吸道傳染病」', { dy: 16 });
    K.rise(S, '#c51', S.word('密集'), '右邊卡片：收容所', { sfx: 'pop-card' });
    S.to('[id^=av51]', { opacity: 1, scale: 1, duration: .35, ease: 'back.out(2)', stagger: .05 }, S.word('密集', 0, .2), '一大群狗狗大頭貼擠進來');
    S.sfx(S.word('密集', 0, .2), 'bounce', '擠進來：咚咚咚');
    K.pop(S, ['#cg510', '#cg511', '#cg512'], S.word('收容所'), '幾隻冒出「咳」', { stagger: .2, sfx: 'pop-low' });
    K.pop(S, '#w51', S.word('依照'), '');
    K.rise(S, '#r510', S.word('一般家犬'), '一般家犬 → 依風險評估', { dx: -40, dy: 0 });
    K.rise(S, '#r511', S.word('住在收容所'), '收容所等高密度環境 → 更積極保護', { dx: -40, dy: 0 });
  },
});
K.scene('52', 3, {
  enter: 'push', bg: 'sky',
  visuals: ['小標「2」＋大標「鉤端螺旋體疫苗」；細菌圖示磚，說明「一種細菌」＋老鼠、野生動物可能帶有', '四個風險標籤念到時彈出：戶外活動、接觸積水、寵物旅館、狗狗安親班', '藍色標籤「也可能傳染給人：人畜共通」＋人的圖示'],
  mount: () => K.anno('a52', '2', '', { x: 140, y: 150, bs: 100 }) + K.h('h52', ['鉤端螺旋體疫苗'], { x: 240, y: 170, size: 76 }) +
    K.tile('Bacteria', { id: 't520', x: 140, y: 330, size: 200, rot: -4 }) + K.tile('Rat', { id: 't521', x: 380, y: 360, size: 170, rot: 5 }) +
    `<div class="sub" id="s52" style="left:140px;top:580px;font-size:32px">一種<b>細菌</b>，老鼠和其他野生動物<br>可能帶有</div>` +
    [['Mountain', '戶外活動', 940, 230], ['Water', '接觸積水', 1360, 230], ['Hotel', '寵物旅館', 940, 480], ['Park', '狗狗安親班', 1360, 480]].map(([ic, t, x, y], k) => `<div class="cd" id="r52${k}" style="left:${x}px;top:${y}px;width:390px;height:210px;padding:30px;display:flex;align-items:center;gap:22px"><div style="width:120px;height:120px;flex:none">${K.ic(ic)}</div><div class="t" style="font-size:34px">${t}</div></div>`).join('') +
    `<div class="pl b" id="p52" style="left:940px;top:760px;font-size:34px">${K.ic('Person')}也可能傳染給人：人畜共通</div>`,
  init() { K.hideLines('h52', 1); },
  animate(S) {
    K.pop(S, '#a52', S.at(0), '', { sfx: false });
    K.lines(S, 'h52', 1, S.at(0), '大標「鉤端螺旋體疫苗」');
    K.pop(S, '#t520', S.word('細菌'), '細菌圖示磚', { sfx: 'pop-card' });
    K.pop(S, '#t521', S.word('老鼠'), '老鼠圖示磚', { sfx: 'pop-card', pitch: 1.1 });
    K.rise(S, '#s52', S.word('老鼠'), '說明「一種細菌，老鼠和野生動物可能帶有」', { dy: 16, sfx: false });
    [['戶外活動', 0], ['積水', 1], ['寵物旅館', 2], ['安親班', 3]].forEach(([w, k]) => K.pop(S, '#r52' + k, S.word(w, 0, -.1), k ? '' : '念到時四個風險卡彈出', { sfx: 'pop-card', pitch: 1 + k * .07 }));
    K.pop(S, '#p52', S.word('傳染給人'), '「也可能傳染給人：人畜共通」', { sfx: 'ding-soft' });
  },
});
K.scene('53', 3, {
  enter: 'wipe',
  visuals: ['大標「那到底需不需要打？」／「兩份指引看法不同」（灰）', '美國動物醫院協會 AAHA 的時間軸：2022 年版「非核心」（灰卡）→ 箭頭 → 2024 年更新「核心疫苗：所有狗狗都建議」（橘框）'],
  mount: () => K.h('h53', ['那到底需不需要打？', '~兩份指引看法不同'], { y: 160, size: 72 }) +
    `<div class="pl" id="p53" style="left:140px;top:400px;font-size:30px">${K.ic('Globe')}AAHA｜美國動物醫院協會</div>` +
    `<div class="cd" id="c530" style="left:140px;top:520px;width:640px;height:300px;padding:44px"><div class="big" style="font-size:80px;color:#9A9590">2022</div><div class="t" style="margin-top:10px;color:#7C7772">列為非核心疫苗</div></div>` +
    K.arrow('w53', { x: 800, y: 620, w: 200, h: 80, d: 'M10 40 C 70 10, 130 10, 185 40' }) +
    `<div class="cd" id="c531" style="left:1020px;top:520px;width:760px;height:300px;padding:44px;box-shadow:${K.RING}"><div class="big" style="font-size:80px;color:var(--or)">2024 <span style="font-family:'Noto Sans TC';font-size:34px;font-weight:900">更新</span></div><div class="t" style="margin-top:10px">改列核心疫苗：<span class="o">所有狗狗都建議</span></div></div>`,
  init() { K.hideLines('h53', 2); },
  animate(S) {
    K.lines(S, 'h53', 2, S.at(0), '大標「那到底需不需要打？／兩份指引看法不同」', 1.2);
    K.rise(S, '#p53', S.word('AAHA', 0, -.3), '標籤「AAHA｜美國動物醫院協會」', { dy: 16 });
    K.rise(S, '#c530', S.word('2022', 0, -.2), '左卡「2022：非核心」', { sfx: 'pop-card' });
    K.draw(S, '#w53', S.word('不過'), '箭頭往右');
    K.rise(S, '#c531', S.word('2024', 0, -.2), '右卡「2024 更新：改列核心疫苗」加橘框', { sfx: 'pop-card' });
    S.sfx(S.word('核心疫苗', 0, -.3), 'tick', '改列核心：「叮咚」');
  },
});
K.scene('54', 3, {
  enter: 'push', bg: 'mint',
  visuals: ['左邊 WSAVA（世界小動物獸醫協會）：三個條件依序打勾——當地有這種病、知道流行的型別、有合適的疫苗 → 符合才列核心', '右邊台灣卡：「資料不足，無法直接下結論」（灰）→ 橘色「把生活習慣告訴獸醫，一起討論」'],
  mount: () => `<div class="pl" id="p54" style="left:140px;top:170px;font-size:30px">${K.ic('Globe')}WSAVA｜世界小動物獸醫協會</div>` +
    `<div class="cd" id="c54" style="left:140px;top:280px;width:820px;height:560px;padding:44px"><div class="k">要符合這些條件</div>` +
    ['當地存在這種疾病', '知道當地流行的型別', '有適合的疫苗'].map((t, k) => `<div class="row" id="r54${k}" style="display:flex;align-items:center;gap:20px;margin-top:30px;font-size:36px;font-weight:900">${K.chk()}${t}</div>`).join('') +
    `<div class="pl o" id="o54" style="left:44px;top:440px;font-size:32px">→ 才列為核心疫苗</div></div>` +
    `<div class="cd" id="c541" style="left:1040px;top:280px;width:740px;height:560px;padding:44px"><div class="k" style="color:#9A9590">那台灣呢？</div><div class="t" style="margin-top:16px;color:#7C7772;font-size:38px">這次整理的資料<br>沒有找到足夠的台灣官方建議</div><div class="d">無法直接下結論</div>` +
    `<div class="ic" style="width:120px;height:120px;margin-top:30px">${K.ic('Clinic')}</div><div class="t" id="t541" style="margin-top:14px;font-size:38px;color:var(--or)">把生活習慣告訴獸醫<br>一起討論要不要打</div></div>`,
  animate(S) {
    K.rise(S, '#p54', S.at(0), '標籤「WSAVA｜世界小動物獸醫協會」', { dy: 16 });
    K.rise(S, '#c54', S.at(0) + .2, '左卡「要符合這些條件」', { sfx: 'pop-card' });
    [['存在這種疾病', 0], ['哪些型別', 1], ['適合的疫苗', 2]].forEach(([w, k]) => K.rise(S, '#r54' + k, S.word(w, 0, -.2), k ? '' : '三個條件依序打勾', { dx: -30, dy: 0, sfx: 'tick-soft' }));
    K.pop(S, '#o54', S.word('列為核心'), '「→ 才列為核心疫苗」', { sfx: 'ding-soft' });
    K.rise(S, '#c541', S.word('台灣目前'), '右卡「那台灣呢？資料不足，無法直接下結論」', { sfx: 'pop-card' });
    K.rise(S, '#t541', S.word('生活習慣告訴獸醫'), '「把生活習慣告訴獸醫，一起討論」', { dy: 16 });
    K.ring(S, '#c541', S.word('生活習慣告訴獸醫'));
  },
});
K.scene('55', 3, {
  enter: 'push',
  visuals: ['小標「3」＋大標「犬冠狀病毒疫苗」', '藍色印章「WSAVA：不建議常規施打」', '說明卡：證據不足以顯示，它是造成成犬重要疾病的主要原因', '右下對話泡泡：「有沒有更適合我家狗狗的組合？」→ 問獸醫'],
  mount: () => K.anno('a55', '3', '', { x: 140, y: 150, bs: 100 }) + K.h('h55', ['犬冠狀病毒疫苗'], { x: 240, y: 170, size: 76 }) +
    `<div class="stamp b" id="sp55" style="left:150px;top:330px">WSAVA：不建議常規施打</div>` +
    `<div class="cd" id="c55" style="left:140px;top:500px;width:900px;padding:44px"><div class="k" style="color:#9A9590">原因</div><div class="t" style="font-size:36px;margin-top:10px">證據不足以顯示，它是造成<br>成犬重要疾病的主要原因</div></div>` +
    K.dog('tilt', { id: 'dg55', x: 1450, y: 450, w: 330 }) +
    `<div class="cd" id="q55" style="left:1120px;top:240px;width:640px;padding:30px 36px;border-radius:34px 34px 34px 8px;display:flex;align-items:center;gap:20px"><div style="width:90px;height:90px;flex:none">${K.ic('Chat')}</div><div style="font-size:32px;font-weight:900;line-height:1.4">有沒有更適合<br>我家狗狗的組合？</div></div>`,
  init() { K.hideLines('h55', 1); },
  animate(S) {
    K.pop(S, '#a55', S.at(0), '', { sfx: false });
    K.lines(S, 'h55', 1, S.at(0), '大標「犬冠狀病毒疫苗」');
    K.stamp(S, '#sp55', S.word('不建議'), '藍色印章「WSAVA：不建議常規施打」');
    K.rise(S, '#c55', S.word('主要原因'), '說明卡「證據不足…」', { sfx: 'pop-card' });
    S.fromTo('#dg55', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.word('所以'));
    K.pop(S, '#q55', S.word('詢問獸醫'), '對話泡泡「有沒有更適合我家狗狗的組合？」', { sfx: 'pop-card' });
  },
});
