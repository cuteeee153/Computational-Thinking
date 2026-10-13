// 幕 01｜開場鉤子：狗狗想站起來，後腳一滑跌坐下去；右邊大標跟著旁白出現。
WT.scene('01', {
  visuals: ['米色背景，左邊一塊地板，黑柴側站', '右邊小標「某天早上」，大標「起床變得很吃力，」（黑）／「後腳一滑，跌坐在地上」（橘）', '念到「後腳一滑」黑柴往後滑，接著換成坐下的黑柴'],
  mount: () => `
    <div class="abs" style="left:110px;top:880px;width:760px;height:16px;border-radius:8px;background:#E6D9C8"></div>
    <div class="abs" id="d1a" style="left:250px;top:430px;width:380px">${WT.dog('stand-side')}</div>
    <div class="abs" id="d1b" style="left:280px;top:420px;width:330px">${WT.dog('senior-sit')}</div>
    <div class="abs" style="left:960px;top:300px"><div class="eyebrow" id="e1" data-text="某天早上"></div></div>
    ${L.h('h1', [['起床變得很吃力，'], ['後腳一滑，', 'o'], ['跌坐在地上', 'o']], { left: 960, top: 360, size: 104 })}`,
  init() { L.hInit('h1', 3); gsap.set('#d1b', { opacity: 0 }); gsap.set('#d1a', { opacity: 0, y: 30 }); },
  animate(S) {
    S.to('#d1a', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, S.start + .2, '黑柴淡入');
    S.type('#e1', S.at(0), .5, '小標逐字打出');
    S.sfx(S.at(0), 'typing', '小標打字聲', { chars: 4 });
    L.hLine(S, '#h11', S.at(1), '大標第一行冒出');
    const slip = S.word('一滑');
    S.to('#d1a', { rotation: -10, x: -40, duration: .35, ease: 'power2.in', transformOrigin: '80% 100%' }, slip, '念到「一滑」黑柴往後滑');
    S.sfx(slip, 'fall', '後腳滑：往下滑音');
    L.hLine(S, '#h12', slip, '大標第二行冒出（橘）');
    const sit = S.word('跌坐');
    S.to('#d1a', { opacity: 0, duration: .15 }, sit);
    S.fromTo('#d1b', { opacity: 1, y: -30 }, { y: 0, duration: .35, ease: 'bounce.out' }, sit, '換成坐下的黑柴，往下一頓');
    S.sfx(sit, 'thud', '跌坐：「咚」');
    L.hLine(S, '#h13', sit, '大標第三行冒出（橘）');
  },
});
