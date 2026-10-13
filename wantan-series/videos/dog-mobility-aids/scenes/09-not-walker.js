// 幕 09｜注意：吊帶是托住狗狗身體的，不是人用的助行器
WT.scene('09', {
  enter: 'slide',
  visuals: ['小標「注意」', '左卡（打勾、橘框）：黑柴＋助行吊帶插畫，「托住狗狗身體的吊帶」', '右卡（打叉、灰）：人用四腳助行器線稿，「不是人用的助行器」'],
  mount: () => `
    <div class="abs" style="left:72px;top:150px"><div class="eyebrow" id="e9" data-text="注意"></div></div>
    <div class="dcard card" id="c90" style="left:200px;top:230px;width:680px"><div style="width:330px;margin:0 auto">${L.dev('sling')}</div><b><span class="mk ok" style="width:54px;height:54px;font-size:30px;vertical-align:middle;margin-right:14px">✓</span>托住狗狗身體的吊帶</b></div>
    <div class="dcard card" id="c91" style="left:1040px;top:230px;width:680px;background:#EFE6DA"><div style="width:300px;margin:0 auto;padding:15px 0">${L.walker()}</div><b style="color:#8F8377"><span class="mk no" style="width:54px;height:54px;font-size:30px;vertical-align:middle;margin-right:14px">✕</span>不是人用的助行器</b></div>`,
  init() { gsap.set(['#c90', '#c91'], { opacity: 0, y: 50 }); },
  animate(S) {
    S.type('#e9', S.at(0), .3, '小標逐字打出');
    L.pop(S, '#c90', S.word('托住'), '左卡浮上、加橘框'); S.to('#c90', { boxShadow: L.RING, duration: .4 }, S.word('托住'));
    L.pop(S, '#c91', S.word('不是人用'), '右卡（打叉）浮上', .8, 'pop-low');
  },
});
