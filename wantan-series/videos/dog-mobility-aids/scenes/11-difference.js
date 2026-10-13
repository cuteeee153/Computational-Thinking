// 幕 11｜三種最大的差別：兩個問題卡
WT.scene('11', {
  enter: 'slide',
  visuals: ['大標：「三種最大的差別」', '問題卡 01：「你需要在什麼時候幫忙」（時鐘圖示）', '問題卡 02：「狗狗還能靠自己的力量做到多少」（黑柴側站）'],
  mount: () => `
    ${L.h('h11', [['簡單來說，'], ['三種最大的差別', 'o']], { top: 150, size: 92 })}
    <div class="pain card" id="q110" style="left:72px;top:450px;width:860px;height:440px"><div class="num">01</div><div class="ic">${iconStopwatch('q11a')}</div><b style="font-size:48px">你需要在什麼時候幫忙</b></div>
    <div class="pain card" id="q111" style="left:988px;top:450px;width:860px;height:440px"><div class="num">02</div><div class="ic">${WT.dog('stand-side')}</div><b style="font-size:48px">狗狗還能靠自己的力量<br>做到多少</b></div>`,
  init() { L.hInit('h11', 2); gsap.set(['#q110', '#q111'], { opacity: 0, y: 60 }); },
  animate(S) {
    L.hLine(S, '#h111', S.at(0), '大標第一行'); L.hLine(S, '#h112', S.at(1), '大標第二行（橘）');
    L.pop(S, '#q110', S.word('你需要'), '問題卡 01 浮上、加橘框'); L.ring(S, '#q110', S.word('你需要'));
    L.pop(S, '#q111', S.word('狗狗還能'), '問題卡 02 浮上、加橘框', 1.12); L.ring(S, '#q111', S.word('狗狗還能'), '#q110');
  },
});
