// 這支影片共用的小工具：大標、卡片浮上、三種輔具的插畫（側站的黑柴＋輔具線稿）。
// 各幕在 scenes/ 裡用 L.xxx 呼叫。
const L = {};
L.RING = '0 0 0 5px #F97316,0 50px 90px -40px rgba(107,74,42,.35)';
L.PLAIN = '0 1px 0 #fff inset,0 50px 90px -40px rgba(107,74,42,.35),0 0 0 1px rgba(107,74,42,.05)';

// 大標：lines＝[['文字', 'o'（橘色）或 ''], ...]，每行一個 id：<prefix>1、<prefix>2…
L.h = (prefix, lines, { left = 72, top = 150, size = 92, extra = '' } = {}) =>
  `<div class="h abs" style="left:${left}px;top:${top}px;font-size:${size}px;${extra}">${lines.map(([t, c], k) =>
    `<span class="ln"><span id="${prefix}${k + 1}" class="${c || ''}">${t}</span></span>`).join('')}</div>`;
L.hInit = (prefix, n) => gsap.set([...Array(n)].map((_, k) => `#${prefix}${k + 1}`), { yPercent: 110 });
L.hLine = (S, sel, t, label = '大標冒出') => S.to(sel, { yPercent: 0, duration: .8, ease: 'power4.out' }, t, label);

// 卡片浮上（加「啵」）
L.pop = (S, sel, t, label, pitch = 1, sfx = 'pop-card') => {
  S.to(sel, { opacity: 1, y: 0, x: 0, scale: 1, duration: .6, ease: 'back.out(1.6)' }, t, label);
  S.sfx(t, sfx, `${label.replace(/[，、].*$/, '')}：${sfx === 'slide' ? '輕「咻」' : '「啵」'}`, { pitch });
};
// 念到的那張加橘框，上一張拿掉
L.ring = (S, sel, t, prev) => {
  if (prev) S.to(prev, { boxShadow: L.PLAIN, duration: .4 }, t);
  S.to(sel, { boxShadow: L.RING, duration: .4 }, t);
};
// 結論：叮咚
L.ding = (S, t, label) => S.sfx(t, 'tick', `${label}：「叮咚」`);

// 三種輔具：側站的黑柴（朝右）疊上輔具線稿。座標和 stand-side.png 一樣（276×340）。
const OR = '#F97316', ORD = '#C9520A', INK = '#3B2A20';
const DEV_SVG = {
  // 輔助帶：胸前一圈、後腰一圈，背上有提把
  harness: `
    <path d="M86 122 Q104 76 126 120" fill="none" stroke="${ORD}" stroke-width="13" stroke-linecap="round"/>
    <path d="M86 122 Q104 76 126 120" fill="none" stroke="${OR}" stroke-width="8" stroke-linecap="round"/>
    <path d="M62 132 Q148 118 176 128" fill="none" stroke="${OR}" stroke-width="12" stroke-linecap="round"/>
    <path d="M168 122 Q160 172 178 222" fill="none" stroke="${OR}" stroke-width="16" stroke-linecap="round"/>
    <path d="M70 128 Q60 170 78 212" fill="none" stroke="${OR}" stroke-width="16" stroke-linecap="round"/>
    <circle cx="170" cy="126" r="7" fill="#FFE2C8" stroke="${ORD}" stroke-width="3"/><circle cx="70" cy="130" r="7" fill="#FFE2C8" stroke="${ORD}" stroke-width="3"/>`,
  // 助行吊帶：寬布從肚子下面托住，兩條帶子往上接到手把
  sling: `
    <path d="M78 196 L104 34 M156 204 L118 34" stroke="${OR}" stroke-width="7" stroke-linecap="round"/>
    <rect x="92" y="18" width="40" height="24" rx="10" fill="${OR}" stroke="${ORD}" stroke-width="3"/>
    <path d="M66 190 Q112 238 166 196 L170 214 Q112 262 62 210 Z" fill="${OR}" stroke="${ORD}" stroke-width="3" stroke-linejoin="round"/>
    <path d="M78 214 Q112 240 154 216" fill="none" stroke="#FFE2C8" stroke-width="3" stroke-dasharray="6 6"/>`,
  // 輪椅：後半身架在支架上，兩個輪子
  wheel: `
    <path d="M24 154 Q90 142 128 150" fill="none" stroke="#6E6257" stroke-width="10" stroke-linecap="round"/>
    <path d="M34 156 L58 268 M110 152 L64 268" stroke="#6E6257" stroke-width="8" stroke-linecap="round"/>
    <path d="M62 128 Q50 176 72 214" fill="none" stroke="${OR}" stroke-width="14" stroke-linecap="round"/>
    <circle cx="60" cy="270" r="58" fill="none" stroke="${INK}" stroke-width="11"/>
    <circle cx="60" cy="270" r="58" fill="none" stroke="#6E6257" stroke-width="5"/>
    <g stroke="#9B8F82" stroke-width="3">${[0, 45, 90, 135].map(a => `<line x1="${60 + 50 * Math.cos(a * Math.PI / 180)}" y1="${270 + 50 * Math.sin(a * Math.PI / 180)}" x2="${60 - 50 * Math.cos(a * Math.PI / 180)}" y2="${270 - 50 * Math.sin(a * Math.PI / 180)}"/>`).join('')}</g>
    <circle cx="60" cy="270" r="11" fill="${OR}" stroke="${ORD}" stroke-width="3"/>`,
};
L.DEV_NAME = { harness: '輔助帶', sling: '助行吊帶', wheel: '輪椅' };
// 輔具插畫（寬度由外層決定）
L.dev = kind => `<div class="dv"><img src="assets/dogs/stand-side.png" alt=""><svg viewBox="0 0 276 340">${DEV_SVG[kind]}</svg></div>`;
// 人用的四腳助行器（第 09 幕的對照）
L.walker = () => `<svg viewBox="0 0 276 340" style="width:100%;height:auto;display:block">
  <g fill="none" stroke="#9B8F82" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">
  <path d="M60 320 L80 90 L196 90 L216 320"/><path d="M110 320 L118 110 M166 320 L158 110"/><path d="M70 200 L206 200"/></g>
  <rect x="62" y="70" width="40" height="34" rx="12" fill="#CDBFAE"/><rect x="174" y="70" width="40" height="34" rx="12" fill="#CDBFAE"/></svg>`;
