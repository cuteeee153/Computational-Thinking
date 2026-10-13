// 幕 03｜先了解狀況，再挑產品（打勾）；看到熱門就買（打叉）
WT.scene('03', {
  enter: 'slide',
  visuals: ['大標：「怎麼選才不會買錯？」', '左邊白卡（打勾）：「先了解狗狗現在的狀況」→「再挑適合的產品」', '右邊灰卡（打叉）：「看到哪個熱門就先買」，字被橘線劃掉'],
  mount: () => `
    ${L.h('h3', [['怎麼選才'], ['不會買錯？', 'o']], { top: 150, size: 96 })}
    <div class="box card" id="b31" style="left:72px;top:430px;width:1000px;height:330px;display:flex;gap:34px;align-items:center;padding:0 56px"><span class="mk ok">✓</span><div><b>先了解狗狗現在的狀況</b><b class="o" id="b31b" style="color:var(--or)">→ 再挑適合的產品</b></div></div>
    <div class="box card" id="b32" style="left:1120px;top:430px;width:730px;height:330px;display:flex;gap:34px;align-items:center;padding:0 56px;background:#EFE6DA"><span class="mk no">✕</span><div><b class="strike" style="color:#8F8377">看到哪個熱門<br>就先買<i id="s32"></i></b></div></div>`,
  init() { L.hInit('h3', 2); gsap.set(['#b31', '#b32'], { opacity: 0, y: 50 }); gsap.set('#b31b', { opacity: 0, x: -20 }); gsap.set('#s32', { scaleX: 0 }); },
  animate(S) {
    L.hLine(S, '#h31', S.at(0) - .3, '大標第一行冒出'); L.hLine(S, '#h32', S.at(0), '大標第二行冒出');
    L.pop(S, '#b31', S.word('先了解'), '打勾卡浮上、加橘框'); S.to('#b31', { boxShadow: L.RING, duration: .4 }, S.word('先了解'));
    S.to('#b31b', { opacity: 1, x: 0, duration: .5 }, S.word('再來挑'), '「再挑適合的產品」滑入');
    S.sfx(S.word('再來挑'), 'slide', '輕「咻」');
    L.pop(S, '#b32', S.word('而不是'), '打叉卡浮上', .8, 'pop-low');
    S.to('#s32', { scaleX: 1, duration: .5, ease: 'power2.inOut' }, S.word('熱門'), '「熱門就先買」被橘線劃掉');
    S.sfx(S.word('熱門'), 'scribble', '劃掉：筆刷聲');
  },
});
