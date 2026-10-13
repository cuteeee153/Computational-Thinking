// 幕 17｜不能畫上等號：CARE 的照護建議 ≠ 已證實的結果
WT.scene('17', {
  enter: 'slide',
  visuals: ['大標：「不能直接畫上等號」', '左卡：「CARE 提供的照護建議」', '中間大大的橘色「≠」', '右卡（灰）：「已經證實輪椅會造成這樣的結果」'],
  mount: () => `
    ${L.h('h17', [['這兩件事，'], ['不能直接畫上等號', 'o']], { top: 150, size: 88 })}
    <div class="box card" id="c170" style="left:72px;top:480px;width:740px;height:340px;display:flex;flex-direction:column;justify-content:center"><div class="k">CARE</div><b>提供的是<br>照護上的建議</b></div>
    <div class="abs" id="ne17" style="left:830px;top:520px;width:260px;text-align:center;font:800 220px/1 'Bricolage Grotesque';color:var(--or-b)">≠</div>
    <div class="box card" id="c171" style="left:1108px;top:480px;width:740px;height:340px;display:flex;flex-direction:column;justify-content:center;background:#EFE6DA"><div class="k" style="color:#8F8377">還沒有</div><b style="color:#8F8377">已經證實輪椅<br>會造成這樣的結果</b></div>`,
  init() { L.hInit('h17', 2); gsap.set(['#c170', '#c171'], { opacity: 0, y: 50 }); gsap.set('#ne17', { opacity: 0, scale: .4 }); },
  animate(S) {
    L.hLine(S, '#h171', S.at(0)); L.hLine(S, '#h172', S.word('不能直接'), '大標第二行（橘）');
    L.pop(S, '#c170', S.word('CARE'), '左卡浮上');
    S.to('#ne17', { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2.4)' }, S.word('不代表'), '「≠」彈出'); S.sfx(S.word('不代表'), 'pop', '≠：「啵」');
    L.pop(S, '#c171', S.word('已經證實'), '右卡（灰）浮上', .8, 'pop-low');
  },
});
