// 幕 15｜關節炎的狗：輪椅不是優先選擇 → 盡量用自己的腿，維持關節活動和肌肉力量
WT.scene('15', {
  enter: 'slide',
  visuals: ['小標「關節炎的狗狗」', '灰卡：輪椅插畫＋「不是優先選擇」，灰字「除非其他方式已經不太可行」', '右邊橘框卡：黑柴側站＋「盡量使用自己的腿」', '下方兩個標籤：「維持關節活動」「維持肌肉力量」'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e15" data-text="關節炎的狗狗"></div></div>
    <div class="box card" id="c150" style="left:72px;top:230px;width:780px;height:600px;background:#EFE6DA;text-align:center"><div style="width:260px;margin:0 auto;opacity:.75">${L.dev('wheel')}</div><b style="color:#8F8377;margin-top:10px">輪椅：不是優先選擇</b><span class="s" id="s150">除非其他方式已經不太可行</span></div>
    <div class="box card" id="c151" style="left:920px;top:230px;width:930px;height:600px;text-align:center"><div style="width:260px;margin:0 auto">${WT.dog('stand-side')}</div><b class="o" style="color:var(--or);margin-top:10px;font-size:54px">盡量使用自己的腿</b>
      <div style="display:flex;gap:18px;justify-content:center;margin-top:24px"><span class="tag" id="t150">維持關節活動</span><span class="tag" id="t151">維持肌肉力量</span></div></div>`,
  init() { gsap.set(['#c150', '#c151'], { opacity: 0, y: 50 }); gsap.set('#s150', { opacity: 0 }); gsap.set('[id^=t15]', { opacity: 0, scale: .6 }); },
  animate(S) {
    S.type('#e15', S.at(0), .5, '小標逐字打出');
    L.pop(S, '#c150', S.word('不建議'), '灰卡（輪椅不是優先選擇）浮上', .8, 'pop-low');
    S.to('#s150', { opacity: 1, duration: .5 }, S.word('除非'), '灰字補充淡入');
    L.pop(S, '#c151', S.word('自己的腿'), '右卡浮上、加橘框'); S.to('#c151', { boxShadow: L.RING, duration: .4 }, S.word('自己的腿'));
    [['關節活動', 0], ['肌肉力量', 1]].forEach(([w, k]) => { S.to('#t15' + k, { opacity: 1, scale: 1, duration: .45, ease: 'back.out(2.2)' }, S.word(w), `標籤「維持${w}」彈出`); S.sfx(S.word(w), 'pop', `${w}：「啵」`, { pitch: 1 + k * .12 }); });
  },
});
