// 幕 09–13｜觀念二：兩個國際組織把疫苗分成「核心」和「非核心」；非核心看生活習慣；指引不是法律。
K.scene('09', 0, {
  enter: 'push', bg: 'sky',
  visuals: ['小標「觀念二」；大標「核心疫苗？」／「非核心疫苗？」（灰）', '左邊兩張組織卡（地球圖示）：世界小動物獸醫協會 WSAVA、美國動物醫院協會 AAHA', '念到「分成兩大類」：箭頭指向右邊兩張空卡「核心疫苗」（橘）、「非核心疫苗」（藍）'],
  mount: () => K.kicker('k09', '02', '觀念二｜核心與非核心', { y: 150 }) + K.h('h09', ['核心疫苗？', '~非核心疫苗？'], { y: 200, size: 76 }) +
    [['世界小動物獸醫協會', 'WSAVA'], ['美國動物醫院協會', 'AAHA']].map(([t, e], k) =>
      `<div class="cd" id="o09${k}" style="left:140px;top:${470 + k * 230}px;width:640px;height:200px;padding:34px 40px;display:flex;gap:30px;align-items:center"><div class="ic" style="width:130px;height:130px;flex:none">${K.ic('Globe')}</div><div><div class="t" style="font-size:38px">${t}</div><div class="big" style="font-size:48px;color:var(--or);margin-top:8px">${e}</div></div></div>`).join('') +
    K.arrow('w09', { x: 800, y: 500, w: 260, h: 300, d: 'M10 150 C 120 150, 150 60, 240 40' }) + K.arrow('w09b', { x: 800, y: 560, w: 260, h: 300, d: 'M10 110 C 120 110, 150 230, 240 250' }) +
    `<div class="note" id="n09" style="left:850px;top:420px;color:var(--blue);font-weight:700;font-size:26px">依疾病風險</div>` +
    `<div class="cd" id="c090" style="left:1080px;top:440px;width:640px;height:170px;padding:40px;display:flex;align-items:center;gap:24px;box-shadow:0 0 0 5px #F97316,0 50px 90px -40px rgba(40,60,100,.32)"><span class="big" style="font-size:80px;color:var(--or)">A</span><div class="t" style="font-size:48px">核心疫苗</div></div>` +
    `<div class="cd" id="c091" style="left:1080px;top:690px;width:640px;height:170px;padding:40px;display:flex;align-items:center;gap:24px;box-shadow:0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)"><span class="big" style="font-size:80px;color:var(--blue)">B</span><div class="t" style="font-size:48px">非核心疫苗</div></div>`,
  init() { K.hideLines('h09', 2); gsap.set('#n09', { opacity: 0 }); },
  animate(S) {
    S.fromTo('#k09', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h09', 2, S.word('核心疫苗'), '大標兩行冒出', .9);
    K.rise(S, '#o090', S.word('世界小動物'), '組織卡 WSAVA 浮上', { sfx: 'pop-card' });
    K.rise(S, '#o091', S.word('美國動物醫院'), '組織卡 AAHA 浮上', { sfx: 'pop-card' });
    K.draw(S, '#w09', S.word('依照疾病'), '兩支藍色箭頭往右分出去');
    K.draw(S, '#w09b', S.word('依照疾病', 0, .2), '');
    S.to('#n09', { opacity: 1, duration: .3 }, S.word('依照疾病'));
    K.pop(S, '#c090', S.word('兩大類', 0, -.1), '右邊兩張卡「核心疫苗」「非核心疫苗」彈出', { sfx: 'pop-card' });
    K.pop(S, '#c091', S.word('兩大類', 0, .15), '', { sfx: 'pop-card', pitch: 1.12 });
  },
});
K.scene('10', 0, {
  enter: 'zoom', bg: 'mint',
  visuals: ['畫面拉近到「核心疫苗」：小標「第一種」、大標「核心疫苗」（橘）', '橘色大標籤「每隻狗狗都建議打」', '一個大框，框上標籤「預防疾病」，三個重點依序浮進框裡：傳染力強、可能造成嚴重疾病、甚至死亡', '右邊開心的黑柴'],
  mount: () => K.kicker('k10', 'A', '第一種', { y: 220 }) + K.h('h10', ['<b class="o">核心疫苗</b>'], { y: 270, size: 130 }) +
    `<div class="pl o" id="p10" style="left:140px;top:470px;font-size:40px;padding:20px 40px">每隻狗狗都建議打</div>` +
    `<div class="abs" id="bx10" style="left:140px;top:620px;width:1040px;height:200px;border:4px solid #E3DFDA;border-radius:30px;background:rgba(255,255,255,.55)"><span class="pl ot" style="left:30px;top:-30px;font-size:28px;padding:8px 22px">預防疾病</span></div>` +
    ['傳染力強', '可能造成嚴重疾病', '甚至死亡'].map((t, k) => `<div class="pl" id="c10${k}" style="left:${180 + [0, 280, 720][k]}px;top:690px"><span class="big" style="color:var(--or);font-size:34px">0${k + 1}</span>${t}</div>`).join('') +
    K.dog('happy', { id: 'dg10', x: 1380, y: 330, w: 340 }),
  init() { K.hideLines('h10', 1); },
  animate(S) {
    S.fromTo('#k10', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h10', 1, S.word('核心疫苗'), '「核心疫苗」大字冒出');
    K.fadeIn(S, '#bx10', S.word('主要預防', 0, -.3), '大框「預防疾病」出現');
    K.pop(S, '#p10', S.word('每隻狗狗'), '「每隻狗狗都建議打」橘色標籤', { sfx: 'ding-soft' });
    [['傳染力強', 0], ['嚴重疾病', 1], ['死亡', 2]].forEach(([w, k]) => K.rise(S, '#c10' + k, S.word(w, 0, -.15), k ? '' : '念到時三個重點依序浮上', { dy: 30 }));
  },
});
K.scene('11', 0, {
  enter: 'push', bg: 'mint',
  visuals: ['小標「第二種」、大標「非核心疫苗」（藍）', '依序出現：生活方式 → 感染風險 → 畫箭頭 → 再決定要不要打', '右邊跳起來的黑柴'],
  mount: () => K.kicker('k11', 'B', '第二種', { y: 220 }) + K.h('h11', ['<span class="bl">非核心疫苗</span>'], { y: 270, size: 120 }) +
    `<div class="abs" id="r11" style="left:140px;top:450px;display:flex;gap:16px;align-items:center;font-size:36px;font-weight:900"><span class="pl bt" id="r110" style="position:static">生活方式</span><span id="r111">＋</span><span class="pl bt" id="r112" style="position:static">感染風險</span><svg id="r113" width="110" height="40" style="overflow:visible"><path pathLength="1" d="M8 20 H92" fill="none" stroke="#2E6BD8" stroke-width="6" stroke-linecap="round"/><path pathLength="1" class="hd" d="M76 6 L96 20 L76 34" fill="none" stroke="#2E6BD8" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg><span class="pl b" id="r114" style="position:static">再決定要不要打</span></div>` +
    K.dog('jump', { id: 'dg11', x: 1240, y: 380, w: 480 }),
  init() { K.hideLines('h11', 1); gsap.set('#dg11', { opacity: 0, x: 200 }); },
  animate(S) {
    S.fromTo('#k11', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    K.lines(S, 'h11', 1, S.word('非核心疫苗'), '「非核心疫苗」大字冒出');
    S.to('#dg11', { opacity: 1, x: 0, duration: .8, ease: 'power3.out' }, S.word('非核心疫苗', 0, .2), '黑柴從右邊走進來');
    K.pop(S, '#r110', S.word('生活方式'), '先出「生活方式」標籤');
    K.fadeIn(S, '#r111', S.word('感染風險', 0, -.2));
    K.pop(S, '#r112', S.word('感染風險'), '再出「感染風險」標籤', { pitch: 1.1 });
    K.draw(S, '#r113', S.word('再決定', 0, -.3), '畫出箭頭', .4);
    K.pop(S, '#r114', S.word('再決定', 0, .1), '跑出「再決定要不要打」', { sfx: 'ding-soft' });
  },
});
const LIFE = [['Hotel', '寵物旅館', '寵物旅館', 160, 580], ['Park', '狗公園', '狗公園', 410, 580], ['Mountain', '戶外活動', '戶外活動', 660, 580], ['Water', '溪邊、積水', '溪邊', 910, 580]];
K.scene('12', 0, {
  enter: 'none',
  visuals: ['（接續）在「生活方式＋感染風險 → 再決定要不要打」下面，四個地點圖示磚依序排出來：寵物旅館、狗公園、戶外活動、溪邊和積水', '最後一行：生活習慣 → 影響疫苗的選擇（橘）'],
  mount: () => LIFE.map(([ic, t, , x, y], k) => K.tile(ic, { id: 't12' + k, x, y, size: 160, rot: [-5, 4, -3, 5][k] }) + `<div class="abs" id="l12${k}" style="left:${x - 45}px;top:${y + 172}px;width:250px;text-align:center;font-size:28px;font-weight:900">${t}</div>`).join('') +
    `<div class="abs" id="r12" style="left:140px;top:850px;display:flex;gap:18px;align-items:center;font-size:40px;font-weight:900">生活習慣<span style="color:#A29D97">→</span><span class="o">影響疫苗的選擇</span></div>`,
  animate(S) {
    LIFE.forEach(([, , w], k) => { K.pop(S, '#t12' + k, S.word(w, 0, -.1), k ? '' : '念到時地點圖示磚一個個冒出來', { pitch: 1 + k * .08 }); K.fadeIn(S, '#l12' + k, S.word(w)); });
    K.rise(S, '#r12', S.word('生活習慣'), '「生活習慣 → 影響疫苗的選擇」');
  },
});
K.scene('13', 0, {
  enter: 'wipe',
  visuals: ['上方兩張組織卡（地球）：世界小動物獸醫協會 WSAVA、美國動物醫院協會 AAHA', '左卡「專業指引」（文件）：寫給獸醫參考；右卡「台灣法律」（法槌）：打叉', '下方放大的重點流程：台灣獸醫參考指引＋本地的疾病風險 → 安排適合的疫苗（橘）'],
  mount: () => [['世界小動物獸醫協會', 'WSAVA'], ['美國動物醫院協會', 'AAHA']].map(([t, e], k) => `<div class="pl" id="o13${k}" style="left:${140 + k * 640}px;top:160px;font-size:28px">${K.ic('Globe')}${t} <b class="big" style="color:var(--or);font-size:30px">${e}</b></div>`).join('') +
    `<div class="cd" id="c130" style="left:140px;top:290px;width:780px;height:300px;padding:44px;display:flex;gap:34px;align-items:center"><div class="ic" style="width:170px;height:170px;flex:none">${K.ic('Doc')}</div><div><div class="k">GUIDELINE</div><div class="t" style="font-size:56px">專業指引</div><div class="d">寫給獸醫參考</div></div></div>` +
    `<div class="cd" id="c131" style="left:1000px;top:290px;width:780px;height:300px;padding:44px;display:flex;gap:34px;align-items:center"><div class="ic" style="width:170px;height:170px;flex:none;opacity:.55">${K.ic('Gavel')}</div><div><div class="k" style="color:#A29D97">LAW</div><div class="t" style="font-size:56px;color:#A29D97">台灣法律</div><div class="d">不是法律規定</div></div><div class="x" id="x13" style="left:640px;top:110px"></div></div>` +
    `<div class="abs" id="f13" style="left:140px;top:650px;display:flex;gap:22px;align-items:center;font-size:46px;font-weight:900;white-space:nowrap">${K.ic('Clinic').replace('<svg', '<svg width="170" height="170"')}<span class="pl bt" style="position:static;font-size:40px;padding:20px 36px" id="f130">台灣獸醫參考指引</span><span>＋</span><span class="pl bt" style="position:static;font-size:40px;padding:20px 36px" id="f131">本地的疾病風險</span><span>→</span><span class="pl o" style="position:static;font-size:44px;padding:22px 40px" id="f132">安排適合的疫苗</span></div>`,
  init() { gsap.set('#x13', { opacity: 0, scale: .3 }); },
  animate(S) {
    K.pop(S, ['#o130', '#o131'], S.at(0), '念到「它們發布的」：兩張組織卡 WSAVA、AAHA 跑出來', { stagger: .2, sfx: 'pop-card' });
    K.rise(S, '#c130', S.word('專業指引'), '左卡「專業指引」浮上', { sfx: 'pop-card' });
    K.rise(S, '#c131', S.word('法律規定', 0, -.3), '右卡「台灣法律」浮上', { sfx: 'pop-card' });
    S.to('#x13', { opacity: 1, scale: 1, duration: .3, ease: 'back.out(3)' }, S.word('不是台灣'), '「台灣法律」被打叉');
    S.sfx(S.word('不是台灣'), 'scribble', '打叉：筆刷');
    K.fadeIn(S, '#f13', S.word('台灣的獸醫', 0, -.2));
    gsap.set(['#f130', '#f131', '#f132'], { opacity: 0 });
    K.pop(S, '#f130', S.word('台灣的獸醫'), '下方流程依序出現：獸醫參考指引＋本地風險 → 適合的疫苗');
    K.pop(S, '#f131', S.word('本地'), '', { pitch: 1.1 });
    K.pop(S, '#f132', S.word('適合的疫苗'), '', { sfx: 'ding-soft' });
  },
});
