// 幕 36–41｜第二步：法律規定。狂犬病有法律義務、其他三種是國際指引建議（同一幕）；各縣市公告；滿 3 個月、每年一次、證明書和證明牌；免打與罰則；查你的縣市。
K.scene('36', 2, {
  enter: 'iris', irisAt: [1500, 560], bg: 'sky',
  visuals: ['淡藍底，圓形轉場；章節卡「STEP 02」', '大標「台灣的法律規定」／「狂犬病疫苗每年都要打」（灰）；右邊藍色標籤「飼主有法律義務」', '下方左卡藍框「狂犬病」：法槌、「法律規定，一定要打」', '下方右卡「犬瘟熱、犬小病毒、犬傳染性肝炎」：地球、「沒有相同的強制規定」→「但國際指引建議每隻都打」（橘），加橘框'],
  mount: () => K.kicker('k36', 'STEP 02', '第二步', { y: 150 }) + K.h('h36', ['台灣的法律規定', '~狂犬病疫苗每年都要打'], { y: 200, size: 76 }) +
    `<div class="pl b" id="p36" style="left:1100px;top:290px;font-size:36px">飼主有法律義務</div>` +
    `<div class="cd" id="c370" style="left:140px;top:440px;width:700px;height:420px;padding:44px 50px;box-shadow:0 0 0 5px #2E6BD8,0 50px 90px -40px rgba(40,60,100,.32)"><div class="ic" style="width:130px;height:130px">${K.ic('Gavel')}</div><div class="t" style="font-size:60px;margin-top:20px">狂犬病</div><div class="d" style="font-size:34px;color:var(--blue);font-weight:900">法律規定，一定要打</div></div>` +
    `<div class="cd" id="c371" style="left:920px;top:440px;width:860px;height:420px;padding:40px 50px"><div class="ic" style="width:130px;height:130px">${K.ic('Globe')}</div><div class="t" style="font-size:44px;margin-top:16px">犬瘟熱、犬小病毒<br>犬傳染性肝炎</div><div class="d" id="d371" style="font-size:30px">沒有相同的強制規定</div><div class="d" id="d372" style="font-size:34px;color:var(--or);font-weight:900;margin-top:0">但國際指引建議每隻都打</div></div>`,
  init() { K.hideLines('h36', 2); },
  animate(S) {
    S.fromTo('#k36', { opacity: 0 }, { opacity: 1, duration: .4 }, S.at(0));
    S.sfx(S.at(0), 'chime', '新章節：叮鈴');
    K.lines(S, 'h36', 2, S.at(0) + .2, '大標兩行冒出', .9);
    K.rise(S, '#c370', S.word('特別之處', 0, -.2), '念到「狂犬病有一個特別之處」：左卡「狂犬病：法律規定，一定要打」', { sfx: 'pop-card' });
    K.pop(S, '#p36', S.word('法律義務'), '「飼主有法律義務」', { sfx: 'ding-soft' });
    K.rise(S, '#c371', S.word('犬瘟熱'), '念到「犬瘟熱」：右卡「三種核心疾病」', { sfx: 'pop-card' });
    K.rise(S, '#d371', S.word('強制接種'), '「沒有相同的強制規定」', { dy: 16, sfx: false });
    K.rise(S, '#d372', S.word('國際指引'), '「但國際指引建議每隻都打」（橘）', { dy: 16 });
    K.ring(S, '#c371', S.word('國際指引'));
  },
});
K.scene('38', 2, {
  enter: 'push', bg: 'mint',
  visuals: ['大標「狂犬病疫苗怎麼打、多久打一次？」', '左邊文件卡《動物傳染病防治條例》，箭頭分到右邊三張「縣市政府公告」'],
  mount: () => K.h('h38', ['狂犬病疫苗', '~怎麼打、多久打一次？'], { y: 160, size: 72 }) +
    `<div class="cd" id="c38" style="left:140px;top:420px;width:560px;height:250px;padding:40px;display:flex;gap:24px;align-items:center"><div class="ic" style="width:130px;height:130px;flex:none">${K.ic('Doc')}</div><div class="t" style="font-size:36px">《動物傳染病<br>防治條例》</div></div>` +
    K.arrow('w38', { x: 720, y: 400, w: 300, h: 300, d: 'M10 150 C 120 150, 160 60, 280 50' }) + K.arrow('w38b', { x: 720, y: 420, w: 300, h: 300, d: 'M10 130 C 120 130, 160 230, 280 250' }) +
    [0, 1, 2].map(k => `<div class="cd" id="g38${k}" style="left:${1060 + k * 40}px;top:${380 + k * 50}px;width:560px;height:200px;padding:36px;transform:rotate(${[-4, 2, -1][k]}deg)"><div class="k">ANNOUNCEMENT</div><div class="t" style="font-size:40px;margin-top:10px">縣市政府公告</div></div>`).join(''),
  init() { K.hideLines('h38', 2); },
  animate(S) {
    K.lines(S, 'h38', 2, S.at(0), '大標「狂犬病疫苗怎麼打、多久打一次？」');
    K.rise(S, '#c38', S.word('動物傳染病'), '文件卡《動物傳染病防治條例》', { sfx: 'pop-card' });
    K.draw(S, '#w38', S.word('發布'), '箭頭分出去');
    K.draw(S, '#w38b', S.word('發布', 0, .15), '');
    [0, 1, 2].forEach(k => K.rise(S, '#g38' + k, S.word('公告', 0, k * .15), k ? '' : '三張「縣市政府公告」疊上來', { sfx: k ? false : 'flip' }));
  },
});
K.scene('39', 2, {
  enter: 'push',
  visuals: ['上方兩個標籤：✓ 主要規定大致相同（藍）；⚠ 細節、實施日期可能不同（橘），念到時出現', '左邊兩張數字卡：「滿 3 個月」、「每年 1 次」（橘）', '右邊：注射證明書、證明牌兩塊一樣大的圖示磚並排、對齊，念到時彈出；念到「特別是注射證明書」注射證明書亮橘框', '兩塊圖示磚中間：橘色印章「妥善保管」（擺正）；小字「證明書不要隨手丟，查驗時要用」'],
  mount: () => `<div class="abs" id="r38" style="left:140px;top:150px;display:flex;gap:24px;font-size:32px;font-weight:900"><span class="pl bt" id="r380" style="position:static">✓ 主要規定大致相同</span><span class="pl ot" id="r381" style="position:static">⚠ 細節、實施日期可能不同</span></div>` +
    `<div class="abs" id="h39" style="left:140px;top:280px;font-size:40px;font-weight:900">狗狗和貓咪</div>` +
    [['滿', '3', '個月大'], ['每年', '1', '次']].map(([a, n, b], k) => `<div class="cd" id="c39${k}" style="left:140px;top:${350 + k * 280}px;width:700px;height:240px;padding:30px 50px;display:flex;align-items:baseline;gap:16px"><span style="font-size:52px;font-weight:900">${a}</span><span class="big" style="font-size:190px;color:var(--or)">${n}</span><span style="font-size:52px;font-weight:900">${b}</span></div>`).join('') +
    `<div class="abs" style="left:960px;top:290px;font-size:32px;font-weight:900;color:#7C7772" id="h39b">打完之後要拿到</div>` +
    K.tile('Certificate', { id: 't390', x: 1000, y: 370, size: 240 }) + `<div class="abs" id="l390" style="left:950px;top:630px;width:340px;text-align:center;font-size:36px;font-weight:900">注射證明書</div>` +
    K.tile('DogTag', { id: 't391', x: 1540, y: 370, size: 240 }) + `<div class="abs" id="l391" style="left:1490px;top:630px;width:340px;text-align:center;font-size:36px;font-weight:900">證明牌<br><span style="font-size:26px;color:#9A9590">掛在狗狗脖子上</span></div>` +
    `<div class="stamp" id="sp39" style="left:1272px;top:445px">妥善保管</div><div class="note" id="n39" style="left:1060px;top:790px;width:720px;text-align:center;font-size:28px;font-weight:700">證明書不要隨手丟，查驗時要用</div>`,
  animate(S) {
    K.rise(S, '#r380', S.at(0), '念到「主要規定大致相同」：藍色標籤', { dy: 16 });
    K.rise(S, '#r381', S.word('細節'), '「細節、實施日期可能不同」（橘）', { dy: 16 });
    K.fadeIn(S, '#h39', S.word('狗狗和貓咪'));
    K.rise(S, '#c390', S.word('三個月'), '數字卡「滿 3 個月大」', { sfx: 'pop-card' });
    K.rise(S, '#c391', S.word('每年接種'), '數字卡「每年 1 次」', { sfx: 'pop-card' });
    K.fadeIn(S, '#h39b', S.word('打完之後'));
    K.pop(S, '#t390', S.word('注射證明書'), '注射證明書圖示磚彈出', { sfx: 'pop-card' }); K.fadeIn(S, '#l390', S.word('注射證明書'));
    K.pop(S, '#t391', S.word('證明牌'), '證明牌圖示磚彈出', { sfx: 'pop-card', pitch: 1.1 }); K.fadeIn(S, '#l391', S.word('證明牌'));
    K.stamp(S, '#sp39', S.word('妥善保管'), '兩塊圖示磚中間蓋上印章「妥善保管」（擺正）', { straight: true });
    K.ring(S, '#t390', S.word('特別是'));
    S.sfx(S.word('特別是'), 'ding-soft', '注射證明書亮橘框：「叮」');
    K.fadeIn(S, '#n39', S.word('隨手丟掉'), '小字「證明書不要隨手丟」');
  },
});
K.scene('40', 2, {
  enter: 'wipe', bg: 'sky',
  visuals: ['左右兩條路：左邊「獸醫診斷不適合＋證明文件 → 可以免打」（藍）', '右邊「沒有按規定接種 → 可處罰鍰」：硬幣圖示，數字跑到「NT$ 30,000～150,000」（橘）'],
  mount: () => `<div class="cd" id="c400" style="left:140px;top:220px;width:780px;height:600px;padding:50px"><div class="ic" style="width:150px;height:150px">${K.ic('Clinic')}</div><div class="t" style="margin-top:20px;font-size:38px">獸醫診斷不適合接種</div><div class="t" style="font-size:38px">＋獸醫開立的證明文件</div><div class="pl b" id="p400" style="position:static;margin-top:40px;font-size:40px">可以免打</div></div>` +
    `<div class="cd" id="c401" style="left:1000px;top:220px;width:780px;height:600px;padding:50px"><div class="ic" style="width:150px;height:150px">${K.ic('Coins')}</div><div class="t" style="margin-top:20px;font-size:38px">沒有按規定接種</div><div class="d" style="font-size:30px">可處新臺幣罰鍰</div>` +
    `<div id="m401" style="margin-top:20px;display:flex;align-items:baseline;gap:10px;color:var(--or);white-space:nowrap"><span class="big" style="font-size:38px">NT$</span><span class="big" id="n401" style="font-size:84px">0</span><span class="big" style="font-size:56px">～</span><span class="big" id="n402" style="font-size:84px">0</span></div></div>`,
  animate(S) {
    K.rise(S, '#c400', S.at(0), '左卡「獸醫診斷不適合＋證明文件」', { sfx: 'pop-card' });
    K.pop(S, '#p400', S.word('免予施打'), '「可以免打」藍色標籤', { sfx: 'ding-soft' });
    K.rise(S, '#c401', S.word('沒有按規定'), '右卡「沒有按規定接種」', { sfx: 'pop-card' });
    K.count(S, '#n401', 0, 30000, S.word('三萬元'), .9, '罰鍰數字跑到 30,000～150,000');
    K.count(S, '#n402', 0, 150000, S.word('十五萬元'), .9, '');
    S.sfx(S.word('三萬元'), 'typing', '數字跳動', { dur: 1.6, chars: 14, gain: .5 });
    K.ring(S, '#c401', S.word('罰鍰'));
    S.sfx(S.word('罰鍰'), 'thud', '罰鍰：「咚」');
  },
});
K.scene('41', 2, {
  enter: 'zoom', bg: 'mint',
  visuals: ['中間一張公告卡「你居住縣市的最新公告」，放大鏡在上面移動', '左邊歪頭的黑柴；小字「各縣市實施細節不完全相同」'],
  mount: () => `<div class="note" id="n41" style="left:140px;top:200px;font-size:34px;font-weight:700;color:#7C7772">各縣市實施細節不完全相同</div>` +
    K.dog('tilt', { id: 'dg41', x: 180, y: 380, w: 380 }) +
    `<div class="cd" id="c41" style="left:760px;top:300px;width:880px;height:440px;padding:56px"><div class="k">ANNOUNCEMENT</div><div class="t" style="font-size:60px;margin-top:20px">你居住縣市的<br><span class="o">最新公告</span></div><div style="margin-top:30px;display:flex;flex-direction:column;gap:14px">${[80, 60].map(w => `<i style="display:block;height:14px;width:${w}%;border-radius:7px;background:#EAE6E1"></i>`).join('')}</div></div>` +
    `<div class="ico" id="i41" style="left:1400px;top:520px;width:240px;height:240px">${K.ic('Magnifier')}</div>`,
  animate(S) {
    K.fadeIn(S, '#n41', S.at(0), '小字「各縣市實施細節不完全相同」');
    S.fromTo('#dg41', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: .5 }, S.at(0));
    K.rise(S, '#c41', S.word('查一下'), '公告卡「你居住縣市的最新公告」', { sfx: 'pop-card' });
    S.fromTo('#i41', { opacity: 0, x: 200, y: 100 }, { opacity: 1, x: -380, y: -150, duration: 1.4, ease: 'power2.inOut' }, S.word('最新公告', 0, -.3), '放大鏡在公告上移動');
    S.sfx(S.word('最新公告', 0, -.3), 'whoosh', '放大鏡：「咻」', { gain: .5 });
  },
});
