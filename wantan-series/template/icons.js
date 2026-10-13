// 柔軟 3D 圖示：奶油色主體＋橘色重點，對齊參考截圖的質感
function _defs(id) {
  return `<defs>
    <linearGradient id="${id}-cream" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFFCF7"/><stop offset="1" stop-color="#E6DACB"/></linearGradient>
    <linearGradient id="${id}-cream2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F4ECE1"/><stop offset="1" stop-color="#D9CCBB"/></linearGradient>
    <linearGradient id="${id}-or" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFA24D"/><stop offset="1" stop-color="#E5600C"/></linearGradient>
    <linearGradient id="${id}-or2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F57E2A"/><stop offset="1" stop-color="#C9520A"/></linearGradient>
    <filter id="${id}-sh" x="-30%" y="-30%" width="160%" height="170%"><feDropShadow dx="0" dy="10" stdDeviation="9" flood-color="#6B4A2A" flood-opacity=".22"/></filter>
  </defs>`;
}
function iconClipboard(id) {
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="46" y="34" width="112" height="146" rx="16" fill="url(#${id}-cream2)"/>
    <rect x="42" y="30" width="112" height="146" rx="16" fill="url(#${id}-cream)"/>
    <rect x="74" y="18" width="48" height="26" rx="9" fill="url(#${id}-or2)"/>
    <rect x="72" y="16" width="48" height="24" rx="9" fill="url(#${id}-or)"/>
    <circle cx="96" cy="26" r="4" fill="#FFF2E4"/>
    ${[66, 100, 134].map((y, i) => `
      <rect x="60" y="${y}" width="22" height="22" rx="6" fill="${i === 0 ? `url(#${id}-or)` : '#F1E8DC'}" stroke="${i === 0 ? 'none' : '#DCCFBE'}" stroke-width="2"/>
      ${i === 0 ? `<path d="M65 ${y + 11} l5 5 l9 -10" stroke="#fff" stroke-width="3.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
      <rect x="92" y="${y + 5}" width="${i === 1 ? 44 : 50}" height="10" rx="5" fill="#E7DCCD"/>`).join('')}
  </g></svg>`;
}
function iconMagnifier(id) {
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M126 126 L164 164" stroke="url(#${id}-or2)" stroke-width="24" stroke-linecap="round"/>
    <path d="M124 124 L160 160" stroke="url(#${id}-or)" stroke-width="20" stroke-linecap="round"/>
    <circle cx="88" cy="88" r="52" fill="url(#${id}-cream2)"/>
    <circle cx="86" cy="86" r="52" fill="url(#${id}-cream)"/>
    <circle cx="86" cy="86" r="36" fill="#F6F0E7" stroke="#E2D6C6" stroke-width="3"/>
    <path d="M64 74 Q72 58 90 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".9"/>
    <g fill="#E5600C" opacity=".85"><ellipse cx="86" cy="96" rx="11" ry="9"/><circle cx="72" cy="82" r="5"/><circle cx="82" cy="75" r="5"/><circle cx="92" cy="75" r="5"/><circle cx="101" cy="82" r="5"/></g>
  </g></svg>`;
}
function iconFlag(id) {
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <ellipse cx="80" cy="168" rx="44" ry="13" fill="url(#${id}-cream2)"/>
    <ellipse cx="80" cy="164" rx="44" ry="12" fill="url(#${id}-cream)"/>
    <rect x="72" y="28" width="14" height="138" rx="7" fill="url(#${id}-cream2)"/>
    <rect x="70" y="26" width="13" height="138" rx="6.5" fill="url(#${id}-cream)"/>
    <circle cx="77" cy="24" r="10" fill="url(#${id}-or)"/>
    <path d="M84 38 C110 30 126 50 158 40 L150 72 L158 100 C128 110 110 90 84 98 Z" fill="url(#${id}-or2)"/>
    <path d="M84 36 C110 28 126 48 156 38 L148 70 L156 96 C126 106 110 86 84 94 Z" fill="url(#${id}-or)"/>
    <path d="M92 48 C108 44 118 54 136 50" stroke="#FFD1A8" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>
  </g></svg>`;
}
function iconNote(id) {
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)" transform="rotate(-12 100 100)">
    <rect x="38" y="40" width="120" height="130" rx="8" fill="#D9CCBB"/>
    <rect x="34" y="36" width="120" height="130" rx="8" fill="url(#${id}-cream)"/>
    ${[68, 88, 108, 128].map((y, i) => `<path d="M52 ${y} q10 -6 20 0 t20 0 t20 0 ${i % 2 ? '' : 't18 0'}" stroke="#B9AB98" stroke-width="3" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M44 22 L44 62 Q44 72 52 72 Q60 72 60 62 L60 30" stroke="url(#${id}-or)" stroke-width="5" fill="none" stroke-linecap="round"/>
  </g></svg>`;
}
function iconPaw(c) {
  return `<svg viewBox="0 0 40 40"><g fill="${c || '#fff'}"><ellipse cx="20" cy="25" rx="8" ry="6.5"/><circle cx="11" cy="16" r="3.4"/><circle cx="17" cy="11" r="3.4"/><circle cx="24" cy="11" r="3.4"/><circle cx="30" cy="16" r="3.4"/></g></svg>`;
}
// ---- 第一步：五類風險因子 ----
function iconTag(id) { // 品種
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M100 18 C96 40 88 50 76 58" stroke="#CDBFAE" stroke-width="5" fill="none" stroke-linecap="round"/>
    <g transform="rotate(-14 100 110)">
      <rect x="48" y="58" width="108" height="120" rx="30" fill="url(#${id}-cream2)"/>
      <rect x="44" y="54" width="108" height="120" rx="30" fill="url(#${id}-cream)"/>
      <circle cx="98" cy="76" r="9" fill="#E3D6C5"/><circle cx="98" cy="76" r="5" fill="#fff"/>
      <g fill="url(#${id}-or)"><ellipse cx="98" cy="134" rx="17" ry="14"/><circle cx="76" cy="114" r="7.5"/><circle cx="90" cy="104" r="7.5"/><circle cx="106" cy="104" r="7.5"/><circle cx="120" cy="114" r="7.5"/></g>
    </g></g></svg>`;
}
function iconScale(id) { // 體重
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="34" y="62" width="136" height="112" rx="32" fill="url(#${id}-cream2)"/>
    <rect x="30" y="56" width="136" height="112" rx="32" fill="url(#${id}-cream)"/>
    <path d="M62 112 A36 36 0 0 1 134 112 Z" fill="#F4ECE1" stroke="#DCCFBE" stroke-width="3"/>
    ${[0, 1, 2, 3, 4].map(i => { const a = Math.PI * (1 - i / 4); return `<line x1="${98 + 30 * Math.cos(a)}" y1="${112 - 30 * Math.sin(a)}" x2="${98 + 24 * Math.cos(a)}" y2="${112 - 24 * Math.sin(a)}" stroke="#C7B9A6" stroke-width="3" stroke-linecap="round"/>`; }).join('')}
    <line x1="98" y1="112" x2="124" y2="90" stroke="url(#${id}-or)" stroke-width="6" stroke-linecap="round"/>
    <circle cx="98" cy="112" r="7" fill="url(#${id}-or)"/>
    <rect x="66" y="132" width="64" height="12" rx="6" fill="#E7DCCD"/>
  </g></svg>`;
}
function iconBandage(id) { // 受傷
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)" transform="rotate(-35 100 100)">
    <rect x="26" y="70" width="152" height="66" rx="33" fill="url(#${id}-cream2)"/>
    <rect x="22" y="66" width="152" height="66" rx="33" fill="url(#${id}-cream)"/>
    <rect x="72" y="70" width="52" height="58" rx="10" fill="url(#${id}-or)"/>
    ${[[84, 86], [100, 86], [112, 86], [84, 108], [100, 108], [112, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3.2" fill="#FFE2C8"/>`).join('')}
    ${[[44, 90], [44, 108], [152, 90], [152, 108]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#D9CCBB"/>`).join('')}
  </g></svg>`;
}
function iconFamily(id) { // 家族病史
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M100 74 L100 102 M56 102 L144 102 M56 102 L56 124 M144 102 L144 124" stroke="#CDBFAE" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="100" cy="50" r="28" fill="url(#${id}-or2)"/><circle cx="98" cy="47" r="27" fill="url(#${id}-or)"/>
    <circle cx="56" cy="148" r="26" fill="url(#${id}-cream2)"/><circle cx="54" cy="145" r="25" fill="url(#${id}-cream)"/>
    <circle cx="144" cy="148" r="26" fill="url(#${id}-cream2)"/><circle cx="142" cy="145" r="25" fill="url(#${id}-cream)"/>
    <g fill="#fff" opacity=".9"><ellipse cx="98" cy="54" rx="8" ry="6.5"/><circle cx="88" cy="44" r="3.6"/><circle cx="95" cy="39" r="3.6"/><circle cx="102" cy="39" r="3.6"/><circle cx="109" cy="44" r="3.6"/></g>
  </g></svg>`;
}
function iconBowl(id) { // 幼犬期生長與營養
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <ellipse cx="96" cy="110" rx="62" ry="16" fill="#C9A27C"/>
    ${[[70, 104], [86, 98], [102, 96], [118, 102], [80, 110], [96, 108], [112, 110], [128, 108], [64, 112]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="9" ry="7" fill="#B9875A"/>`).join('')}
    <path d="M30 110 L162 110 L148 160 Q146 170 134 170 L58 170 Q46 170 44 160 Z" fill="url(#${id}-or2)"/>
    <path d="M32 108 L160 108 L147 156 Q145 166 133 166 L59 166 Q47 166 45 156 Z" fill="url(#${id}-or)"/>
    <path d="M52 124 L140 124" stroke="#FFC08E" stroke-width="5" stroke-linecap="round" opacity=".6"/>
    <g transform="translate(148 30)"><circle r="24" fill="url(#${id}-cream)"/><path d="M0 12 L0 -10 M-9 -2 L0 -11 L9 -2" stroke="#E5600C" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
  </g></svg>`;
}
// ---- 第二步：五種蛛絲馬跡 ----
function _paw(x, y, r, fill, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${r / 20})"><ellipse cx="0" cy="8" rx="13" ry="11" fill="${fill}"/><circle cx="-14" cy="-8" r="5.6" fill="${fill}"/><circle cx="-5" cy="-16" r="5.6" fill="${fill}"/><circle cx="6" cy="-16" r="5.6" fill="${fill}"/><circle cx="15" cy="-8" r="5.6" fill="${fill}"/></g>`;
}
function iconLimp(id) { // 走路一拐一拐：一排腳印，其中一個歪掉、變橘
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    ${_paw(42, 150, 17, `url(#${id}-cream)`, 70)}${_paw(84, 118, 17, `url(#${id}-cream)`, 70)}
    ${_paw(122, 140, 19, `url(#${id}-or)`, 105)}${_paw(162, 92, 17, `url(#${id}-cream)`, 70)}
    <path d="M110 92 q6 -10 0 -20 M126 94 q8 -12 2 -24" stroke="#E5600C" stroke-width="4.5" fill="none" stroke-linecap="round" opacity=".8"/>
  </g></svg>`;
}
function iconStairs(id) { // 上下車、上下樓梯猶豫：樓梯＋問號泡泡
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M28 176 L28 140 L70 140 L70 110 L112 110 L112 80 L154 80 L154 176 Z" fill="url(#${id}-cream2)" transform="translate(4 4)"/>
    <path d="M28 176 L28 140 L70 140 L70 110 L112 110 L112 80 L154 80 L154 176 Z" fill="url(#${id}-cream)"/>
    <path d="M28 140 L70 140 M70 110 L112 110 M112 80 L154 80" stroke="#DCCFBE" stroke-width="4" stroke-linecap="round"/>
    <g transform="translate(58 62)"><circle r="26" fill="url(#${id}-or)"/><path d="M-10 18 L-20 30 L-2 24 Z" fill="#E86A14"/>
      <path d="M-7 -6 q0 -10 8 -10 q9 0 9 8 q0 6 -8 9 l0 5" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/><circle cx="2" cy="15" r="3.4" fill="#fff"/></g>
  </g></svg>`;
}
function iconSlowRise(id) { // 起身變慢：軟墊＋慢慢往上的虛線箭頭＋時鐘
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <ellipse cx="94" cy="156" rx="70" ry="22" fill="url(#${id}-cream2)"/>
    <ellipse cx="92" cy="150" rx="70" ry="22" fill="url(#${id}-cream)"/>
    <ellipse cx="92" cy="146" rx="46" ry="11" fill="#EFE5D8"/>
    <path d="M92 132 L92 64" stroke="url(#${id}-or)" stroke-width="9" stroke-linecap="round" stroke-dasharray="2 16"/>
    <path d="M74 76 L92 56 L110 76" stroke="url(#${id}-or)" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <g transform="translate(150 60)"><circle r="26" fill="url(#${id}-cream)"/><circle r="26" fill="none" stroke="#DCCFBE" stroke-width="3"/><path d="M0 0 L0 -15 M0 0 L10 6" stroke="#E5600C" stroke-width="5" stroke-linecap="round"/></g>
  </g></svg>`;
}
function iconPlayTime(id) { // 玩耍時間縮短：球＋只剩一小格的計時圈
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <circle cx="80" cy="118" r="50" fill="url(#${id}-or2)"/><circle cx="77" cy="114" r="49" fill="url(#${id}-or)"/>
    <path d="M34 98 Q77 128 122 96 M40 140 Q78 112 116 142" stroke="#FFE3C9" stroke-width="7" fill="none" stroke-linecap="round"/>
    <g transform="translate(146 62)"><circle r="32" fill="url(#${id}-cream)"/>
      <path d="M0 0 L0 -24 A24 24 0 0 1 20.8 -12 Z" fill="#E5600C"/><circle r="24" fill="none" stroke="#DCCFBE" stroke-width="3"/></g>
  </g></svg>`;
}
function iconOddPose(id) { // 休息時姿勢怪怪的：軟墊＋大問號
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="30" y="112" width="144" height="58" rx="29" fill="url(#${id}-cream2)" transform="translate(3 4)"/>
    <rect x="30" y="112" width="144" height="58" rx="29" fill="url(#${id}-cream)"/>
    <rect x="48" y="122" width="108" height="22" rx="11" fill="#EFE5D8"/>
    <g transform="translate(102 62) rotate(10)"><circle r="40" fill="url(#${id}-or)"/>
      <path d="M-12 -10 q0 -16 13 -16 q14 0 14 13 q0 10 -13 14 l0 8" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="2" cy="24" r="5" fill="#fff"/></g>
  </g></svg>`;
}
// ---- 幕 30、37 ----
function iconStopwatch(id) { // 只有幾秒鐘
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="86" y="14" width="30" height="20" rx="6" fill="url(#${id}-or)"/>
    <path d="M150 46 l14 -14" stroke="url(#${id}-or)" stroke-width="11" stroke-linecap="round"/>
    <circle cx="104" cy="112" r="72" fill="url(#${id}-cream2)"/><circle cx="100" cy="108" r="72" fill="url(#${id}-cream)"/>
    <circle cx="100" cy="108" r="54" fill="#F6F0E7" stroke="#E2D6C6" stroke-width="3"/>
    <path d="M100 108 L100 54 A54 54 0 0 1 146.8 81 Z" fill="url(#${id}-or)" opacity=".9"/>
    <circle cx="100" cy="108" r="7" fill="#C9520A"/>
  </g></svg>`;
}
function iconPill(id) { // 保健品罐＋膠囊
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="52" y="62" width="92" height="118" rx="20" fill="url(#${id}-cream2)" transform="translate(4 4)"/>
    <rect x="52" y="62" width="92" height="118" rx="20" fill="url(#${id}-cream)"/>
    <rect x="58" y="34" width="80" height="34" rx="10" fill="url(#${id}-or)"/>
    <rect x="66" y="98" width="64" height="48" rx="8" fill="#F1E8DC"/>
    <g transform="translate(150 150) rotate(-35)"><rect x="-30" y="-13" width="60" height="26" rx="13" fill="url(#${id}-cream)"/><path d="M0 -13 L-17 -13 A13 13 0 0 0 -17 13 L0 13 Z" fill="url(#${id}-or)"/></g>
  </g></svg>`;
}
