// 幕 14｜深色幕（原 14＋15 合併）：最上方固定「美國犬關節衛教組織 CARE」；輪椅多用在神經問題癱瘓、嚴重無力 → 關節炎：輪椅不是優先選擇，盡量用自己的腿
WT.scene('14', {
  enter: 'slide', dark: true,
  visuals: ['深色背景；最上方來源卡：「美國犬關節衛教組織 CARE」（整幕都在）', '大字「輪椅比較常用在」＋兩個橘色標籤：「神經問題而癱瘓」「嚴重無力」',
    '念到關節炎：左卡（灰）輪椅插畫＋「關節炎」／「輪椅不是優先選擇」', '右卡（橘框）：黑柴側站＋「盡量使用自己的腿」＋標籤「維持關節活動」「維持肌肉力量」'],
  mount: () => `
    <div class="src card" id="sc14" style="top:140px;width:900px"><div class="k">資料來源</div><b>美國犬關節衛教組織 CARE</b></div>
    <div class="abs" id="r14" style="left:72px;top:330px;display:flex;align-items:center;gap:22px"><span class="big" id="b14" style="position:static;font-size:60px">輪椅比較常用在</span>
      <span class="tag" id="t140" style="font-size:40px">神經問題而癱瘓</span><span class="tag" id="t141" style="font-size:40px">嚴重無力</span></div>
    <div class="box card" id="c150" style="left:72px;top:470px;width:800px;height:470px;background:rgba(255,248,239,.06);text-align:center"><div style="width:200px;margin:0 auto;opacity:.7">${L.dev('wheel')}</div><b style="color:#B9AC9E;margin-top:14px;font-size:46px">關節炎<br>輪椅不是優先選擇</b></div>
    <div class="box card" id="c151" style="left:920px;top:470px;width:930px;height:470px;text-align:center"><div style="width:200px;margin:0 auto">${WT.dog('stand-side')}</div><b style="color:var(--or-b);margin-top:8px;font-size:52px">盡量使用自己的腿</b>
      <div style="display:flex;gap:18px;justify-content:center;margin-top:20px"><span class="tag" id="t150">維持關節活動</span><span class="tag" id="t151">維持肌肉力量</span></div></div>`,
  init() { gsap.set('#sc14', { opacity: 0, y: -30 }); gsap.set('#b14', { opacity: 0, y: 30 }); gsap.set('[id^=t14]', { opacity: 0, scale: .6 }); gsap.set(['#c150', '#c151'], { opacity: 0, y: 50 }); gsap.set('[id^=t15]', { opacity: 0, scale: .6 }); },
  animate(S) {
    S.to('#sc14', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.at(0), '來源卡浮上（整幕都在）'); S.sfx(S.at(0), 'slide', '來源卡：輕「咻」');
    S.to('#b14', { opacity: 1, y: 0, duration: .6 }, S.word('輪椅'), '「輪椅比較常用在」浮上');
    [['神經問題', 0], ['嚴重無力', 1]].forEach(([w, k]) => { S.to('#t14' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤 0${k + 1} 彈出`); S.sfx(S.word(w), 'pop', `標籤 0${k + 1}：「啵」`, { pitch: 1 + k * .12 }); });
    S.to('#r14', { opacity: .45, duration: .5 }, S.word('至於'), '上一行變淡');
    L.pop(S, '#c150', S.word('不建議'), '左卡（輪椅不是優先選擇）浮上', .8, 'pop-low');
    L.pop(S, '#c151', S.word('自己的腿'), '右卡浮上、加橘框'); S.to('#c151', { boxShadow: L.RING, duration: .4 }, S.word('自己的腿'));
    [['關節活動', 0], ['肌肉力量', 1]].forEach(([w, k]) => { S.to('#t15' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤「維持${w}」彈出`); S.sfx(S.word(w), 'pop', `${w}：「啵」`, { pitch: 1 + k * .12 }); });
  },
});
