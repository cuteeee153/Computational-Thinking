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
function iconSyringe(id) { // 疫苗針筒
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)" transform="rotate(-40 100 100)">
    <rect x="86" y="8" width="28" height="16" rx="6" fill="url(#${id}-or)"/><rect x="95" y="22" width="10" height="26" fill="#DCCFBE"/>
    <rect x="64" y="44" width="72" height="16" rx="8" fill="url(#${id}-cream2)"/>
    <rect x="72" y="58" width="56" height="94" rx="14" fill="url(#${id}-cream2)" transform="translate(3 3)"/>
    <rect x="72" y="58" width="56" height="94" rx="14" fill="url(#${id}-cream)"/>
    <rect x="80" y="96" width="40" height="50" rx="9" fill="url(#${id}-or)" opacity=".85"/>
    <path d="M82 72h14M82 84h14" stroke="#D6C8B6" stroke-width="4" stroke-linecap="round"/>
    <rect x="92" y="152" width="16" height="12" rx="3" fill="#DCCFBE"/><rect x="98" y="164" width="4" height="30" rx="2" fill="#BFB09D"/>
  </g></svg>`;
}
function iconVaccineBook(id) { // 疫苗手冊（封面腳印）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="52" y="28" width="112" height="150" rx="16" fill="url(#${id}-cream2)"/>
    <rect x="42" y="22" width="112" height="150" rx="16" fill="url(#${id}-or)"/>
    <rect x="42" y="22" width="20" height="150" rx="10" fill="#C9520A" opacity=".45"/>
    <g fill="#FFF6EC"><ellipse cx="108" cy="104" rx="21" ry="18"/><circle cx="84" cy="78" r="9"/><circle cx="100" cy="64" r="9"/><circle cx="118" cy="64" r="9"/><circle cx="133" cy="79" r="9"/></g>
    <rect x="78" y="140" width="62" height="10" rx="5" fill="#FFF6EC" opacity=".75"/>
  </g></svg>`;
}
function iconCalendar(id) { // 月曆（橘色一格＝打針日）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="30" y="40" width="144" height="136" rx="22" fill="url(#${id}-cream2)" transform="translate(4 4)"/>
    <rect x="30" y="40" width="144" height="136" rx="22" fill="url(#${id}-cream)"/>
    <path d="M30 62a22 22 0 0 1 22-22h100a22 22 0 0 1 22 22v14H30z" fill="url(#${id}-or)"/>
    ${[0, 1, 2, 3].map(i => `<rect x="${58 + i * 28}" y="24" width="10" height="32" rx="5" fill="#A8998A"/>`).join('')}
    ${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<rect x="${50 + c * 28}" y="${94 + r * 24}" width="18" height="15" rx="4" fill="${r === 1 && c === 2 ? `url(#${id}-or)` : '#EADFD1'}"/>`).join('')).join('')}
  </g></svg>`;
}
function iconShield(id) { // 保護力（盾牌＋勾）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M104 22 L168 44 V98 C168 140 138 166 104 182 C70 166 40 140 40 98 V44 Z" fill="url(#${id}-cream2)"/>
    <path d="M100 18 L164 40 V94 C164 136 134 162 100 178 C66 162 36 136 36 94 V40 Z" fill="url(#${id}-cream)"/>
    <path d="M100 38 L146 54 V94 C146 124 126 144 100 156 C74 144 54 124 54 94 V54 Z" fill="url(#${id}-or)"/>
    <path d="M76 98 L94 116 L126 80" fill="none" stroke="#fff" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"/>
  </g></svg>`;
}

// ---------- 疫苗主題（第三集起）：病菌、身體、地點、法規 ----------
// 粉色漸層：器官、愛心用
function _pink(id) {
  return `<defs><linearGradient id="${id}-pk" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFC4B8"/><stop offset="1" stop-color="#E9806F"/></linearGradient>
    <linearGradient id="${id}-pk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F09A8A"/><stop offset="1" stop-color="#C9604F"/></linearGradient></defs>`;
}
function iconVirus(id, c = 'or') { // 病菌：圓球＋觸角
  const sp = [...Array(10)].map((_, k) => { const a = k * Math.PI / 5, x = 100 + Math.cos(a) * 62, y = 102 + Math.sin(a) * 62, x2 = 100 + Math.cos(a) * 80, y2 = 102 + Math.sin(a) * 80;
    return `<line x1="${x}" y1="${y}" x2="${x2}" y2="${y2}" stroke="#C9520A" stroke-width="9" stroke-linecap="round"/><circle cx="${x2}" cy="${y2}" r="11" fill="url(#${id}-${c})"/>`; }).join('');
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">${sp}
    <circle cx="100" cy="102" r="62" fill="url(#${id}-${c})"/><circle cx="84" cy="88" r="12" fill="#FFD2A8" opacity=".75"/><circle cx="118" cy="120" r="9" fill="#C9520A" opacity=".35"/><circle cx="96" cy="128" r="6" fill="#C9520A" opacity=".35"/>
  </g></svg>`;
}
function iconAntibody(id) { // 抗體：Y 字
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)" stroke-linecap="round">
    <path d="M100 178 V104 L52 50 M100 104 L148 50" fill="none" stroke="#D9CCBB" stroke-width="34" transform="translate(4 4)"/>
    <path d="M100 178 V104 L52 50 M100 104 L148 50" fill="none" stroke="url(#${id}-cream)" stroke-width="34"/>
    <circle cx="52" cy="50" r="22" fill="url(#${id}-or)"/><circle cx="148" cy="50" r="22" fill="url(#${id}-or)"/>
  </g></svg>`;
}
function iconGlobe(id) { // 國際指引：地球
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <circle cx="104" cy="104" r="74" fill="url(#${id}-cream2)"/><circle cx="100" cy="100" r="74" fill="url(#${id}-cream)"/>
    <path d="M58 64 q20 -8 34 6 q-4 18 -22 22 q-8 14 2 30 q-20 2 -30 -14 q0 -26 16 -44z M118 40 q26 6 40 30 q-14 4 -22 -4 q-12 6 -22 -6z M120 116 q20 -6 36 4 q-6 30 -30 44 q-10 -20 -6 -48z" fill="url(#${id}-or)" opacity=".9"/>
    <ellipse cx="100" cy="100" rx="74" ry="28" fill="none" stroke="#E2D6C6" stroke-width="3"/>
  </g></svg>`;
}
function iconGavel(id) { // 法律：法槌
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="40" y="154" width="120" height="22" rx="10" fill="url(#${id}-cream2)"/><rect x="58" y="140" width="84" height="20" rx="8" fill="url(#${id}-cream)"/>
    <g transform="rotate(-38 100 90)"><rect x="92" y="78" width="16" height="96" rx="8" fill="url(#${id}-or2)"/>
      <rect x="54" y="38" width="92" height="44" rx="14" fill="url(#${id}-or)"/><rect x="50" y="42" width="12" height="36" rx="5" fill="#FFF2E4"/><rect x="138" y="42" width="12" height="36" rx="5" fill="#FFF2E4"/></g>
  </g></svg>`;
}
function iconCertificate(id) { // 注射證明書
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="34" y="34" width="136" height="140" rx="12" fill="url(#${id}-cream2)" transform="translate(4 4)"/><rect x="34" y="34" width="136" height="140" rx="12" fill="url(#${id}-cream)"/>
    <rect x="54" y="56" width="96" height="12" rx="6" fill="url(#${id}-or)"/>
    ${[84, 104, 124].map(y => `<rect x="54" y="${y}" width="${y === 124 ? 50 : 96}" height="8" rx="4" fill="#E7DCCD"/>`).join('')}
    <circle cx="136" cy="146" r="22" fill="url(#${id}-or)"/><path d="M126 166 l-6 22 l16 -8 l16 8 l-6 -22" fill="url(#${id}-or2)"/><circle cx="136" cy="146" r="11" fill="#FFF2E4" opacity=".8"/>
  </g></svg>`;
}
function iconDogTag(id) { // 證明牌（骨頭形狗牌）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <circle cx="100" cy="30" r="14" fill="none" stroke="#BFB09D" stroke-width="6"/>
    <path d="M58 70 a20 20 0 1 1 22 -14 h40 a20 20 0 1 1 22 14 v50 a20 20 0 1 1 -22 14 h-40 a20 20 0 1 1 -22 -14z" fill="url(#${id}-or)"/>
    <rect x="72" y="80" width="56" height="10" rx="5" fill="#FFF2E4"/><rect x="78" y="100" width="44" height="8" rx="4" fill="#FFF2E4" opacity=".7"/>
  </g></svg>`;
}
function iconCoins(id) { // 罰鍰：一疊硬幣
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    ${[140, 118, 96, 74].map((y, k) => `<ellipse cx="${92 + (k % 2) * 6}" cy="${y + 14}" rx="54" ry="18" fill="#C9520A"/><ellipse cx="${92 + (k % 2) * 6}" cy="${y}" rx="54" ry="18" fill="url(#${id}-or)"/>`).join('')}
    <ellipse cx="98" cy="74" rx="34" ry="10" fill="none" stroke="#FFF2E4" stroke-width="4" opacity=".7"/>
    <circle cx="150" cy="150" r="30" fill="url(#${id}-cream)"/><text x="150" y="162" font-size="34" font-weight="900" text-anchor="middle" fill="#C9520A" font-family="Bricolage Grotesque,sans-serif">$</text>
  </g></svg>`;
}
function iconHouse(id) { // 家
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="48" y="90" width="108" height="86" rx="10" fill="url(#${id}-cream2)" transform="translate(4 4)"/><rect x="48" y="90" width="108" height="86" rx="10" fill="url(#${id}-cream)"/>
    <path d="M30 100 L102 36 L174 100" fill="none" stroke="url(#${id}-or)" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="86" y="122" width="32" height="54" rx="8" fill="url(#${id}-or)"/>
  </g></svg>`;
}
function iconMountain(id) { // 山區、爬山、露營
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M10 172 L80 56 L150 172z" fill="url(#${id}-cream2)"/><path d="M80 56 L102 92 L90 88 L80 100 L68 88 L58 92z" fill="#fff"/>
    <path d="M70 172 L132 80 L194 172z" fill="url(#${id}-or)"/><path d="M132 80 L150 108 L138 104 L132 112 L124 104 L114 108z" fill="#FFF2E4"/>
  </g></svg>`;
}
function iconTent(id) { // 露營帳篷
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M24 168 L100 44 L176 168z" fill="url(#${id}-or)"/><path d="M100 44 L176 168 L120 168z" fill="#C9520A" opacity=".35"/>
    <path d="M78 168 L100 112 L122 168z" fill="url(#${id}-cream)"/><rect x="16" y="166" width="168" height="12" rx="6" fill="#D9CCBB"/>
  </g></svg>`;
}
function iconHotel(id) { // 寵物旅館、安親班（屋頂有腳印）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="40" y="56" width="120" height="122" rx="12" fill="url(#${id}-cream2)" transform="translate(4 4)"/><rect x="40" y="56" width="120" height="122" rx="12" fill="url(#${id}-cream)"/>
    <rect x="32" y="40" width="136" height="30" rx="12" fill="url(#${id}-or)"/>
    ${_paw(100, 55, 9, '#FFF2E4')}
    ${[0, 1].map(r => [0, 1, 2].map(c => `<rect x="${56 + c * 32}" y="${88 + r * 30}" width="22" height="18" rx="5" fill="#EADFD1"/>`).join('')).join('')}
    <rect x="86" y="146" width="28" height="32" rx="6" fill="url(#${id}-or)"/>
  </g></svg>`;
}
function iconPark(id) { // 狗公園：樹＋柵欄
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="96" y="96" width="14" height="60" rx="5" fill="#B88A5E"/><circle cx="103" cy="72" r="46" fill="url(#${id}-or)"/><circle cx="86" cy="58" r="14" fill="#FFD2A8" opacity=".55"/>
    ${[30, 62, 138, 170].map(x => `<rect x="${x - 7}" y="122" width="14" height="52" rx="6" fill="url(#${id}-cream)"/>`).join('')}
    <rect x="18" y="134" width="164" height="10" rx="5" fill="url(#${id}-cream2)"/><rect x="18" y="156" width="164" height="10" rx="5" fill="url(#${id}-cream2)"/>
  </g></svg>`;
}
function iconWater(id) { // 溪邊、積水：水窪＋水滴
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <ellipse cx="100" cy="156" rx="80" ry="24" fill="#BFD6EE"/><ellipse cx="94" cy="150" rx="54" ry="12" fill="#E3EEF9"/>
    <path d="M100 20 C 128 62 140 82 140 102 a40 40 0 0 1 -80 0 C 60 82 72 62 100 20z" fill="url(#${id}-cream)" stroke="#9FC0E6" stroke-width="6"/>
    <path d="M84 96 a18 18 0 0 0 16 22" fill="none" stroke="#9FC0E6" stroke-width="7" stroke-linecap="round"/>
  </g></svg>`;
}
function iconDroplets(id) { // 飛沫
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    ${[[60, 70, 26], [120, 50, 18], [140, 110, 28], [80, 136, 20], [40, 120, 12], [160, 160, 12]].map(([x, y, r]) =>
      `<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}-cream)" stroke="#E2D6C6" stroke-width="3"/><circle cx="${x - r * .3}" cy="${y - r * .3}" r="${r * .28}" fill="#fff"/>`).join('')}
  </g></svg>`;
}
function iconThermometer(id) { // 發燒
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)" transform="rotate(30 100 100)">
    <rect x="80" y="18" width="40" height="130" rx="20" fill="url(#${id}-cream2)" transform="translate(4 4)"/><rect x="80" y="18" width="40" height="130" rx="20" fill="url(#${id}-cream)"/>
    <rect x="92" y="60" width="16" height="90" rx="8" fill="url(#${id}-or)"/><circle cx="100" cy="158" r="28" fill="url(#${id}-or)"/>
    ${[40, 58, 76].map(y => `<rect x="108" y="${y}" width="10" height="4" rx="2" fill="#D6C8B6"/>`).join('')}
  </g></svg>`;
}
function iconLungs(id) { // 肺
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <rect x="93" y="22" width="14" height="60" rx="7" fill="url(#${id}-cream2)"/><path d="M100 76 l-26 18 M100 76 l26 18" stroke="url(#${id}-cream2)" stroke-width="12" stroke-linecap="round"/>
    <path d="M84 70 C 50 60 26 110 30 150 C 34 178 70 178 84 162 C 92 150 92 96 84 70z" fill="url(#${id}-pk)"/>
    <path d="M116 70 C 150 60 174 110 170 150 C 166 178 130 178 116 162 C 108 150 108 96 116 70z" fill="url(#${id}-pk)"/>
    <path d="M50 120 q12 8 22 0 M128 120 q12 8 22 0" stroke="#C9604F" stroke-width="4" fill="none" opacity=".5" stroke-linecap="round"/>
  </g></svg>`;
}
function iconBrain(id) { // 腦部、神經
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <path d="M100 40 C 70 26 36 44 38 76 C 22 92 28 124 50 132 C 56 158 88 166 100 150 C 112 166 144 158 150 132 C 172 124 178 92 162 76 C 164 44 130 26 100 40z" fill="url(#${id}-pk)"/>
    <path d="M100 42 V150 M64 70 q14 8 10 24 q-14 6 -10 24 M136 70 q-14 8 -10 24 q14 6 10 24" stroke="#C9604F" stroke-width="5" fill="none" stroke-linecap="round" opacity=".55"/>
  </g></svg>`;
}
function iconGut(id) { // 腸道
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <path d="M40 60 H160 M160 60 V96 M160 96 H52 M52 96 V132 M52 132 H148 M148 132 V164 H100" fill="none" stroke="url(#${id}-pk2)" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40 60 H160 M160 60 V96 M160 96 H52 M52 96 V132 M52 132 H148 M148 132 V164 H100" fill="none" stroke="#FFC4B8" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" opacity=".55"/>
  </g></svg>`;
}
function iconLiver(id) { // 肝臟
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <path d="M24 92 C 24 56 80 44 130 48 C 170 52 182 76 172 100 C 160 126 120 132 96 150 C 70 168 40 150 30 128 C 26 118 24 104 24 92z" fill="url(#${id}-pk2)"/>
    <path d="M110 52 C 104 90 100 118 96 148" stroke="#A9493B" stroke-width="5" fill="none" opacity=".5"/>
    <ellipse cx="70" cy="86" rx="22" ry="12" fill="#FFC4B8" opacity=".5"/>
  </g></svg>`;
}
function iconPerson(id) { // 人（人畜共通）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M40 182 C 40 132 66 112 100 112 C 134 112 160 132 160 182z" fill="url(#${id}-or)"/>
    <circle cx="100" cy="70" r="40" fill="url(#${id}-cream2)" transform="translate(3 3)"/><circle cx="100" cy="70" r="40" fill="url(#${id}-cream)"/>
    <path d="M62 62 C 66 30 134 30 138 62 C 120 50 80 50 62 62z" fill="#5A463A"/>
  </g></svg>`;
}
function iconCat(id) { // 貓
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M44 70 L52 18 L88 50 H112 L148 18 L156 70 C 168 130 140 170 100 170 C 60 170 32 130 44 70z" fill="url(#${id}-or)"/>
    <ellipse cx="100" cy="128" rx="40" ry="30" fill="url(#${id}-cream)"/><circle cx="78" cy="96" r="7" fill="#3B2A20"/><circle cx="122" cy="96" r="7" fill="#3B2A20"/>
    <path d="M94 116 l6 6 l6 -6z" fill="#C9520A"/><path d="M60 122 h-30 M60 132 h-28 M140 122 h30 M140 132 h28" stroke="#BFB09D" stroke-width="3" stroke-linecap="round"/>
  </g></svg>`;
}
function iconRat(id) { // 老鼠
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M150 140 C 182 140 186 172 160 176" fill="none" stroke="#C9B6A4" stroke-width="7" stroke-linecap="round"/>
    <path d="M30 128 C 40 92 70 76 104 78 C 140 80 160 108 156 140 C 150 160 110 166 70 160 C 46 156 26 146 30 128z" fill="url(#${id}-cream2)"/>
    <circle cx="72" cy="80" r="22" fill="url(#${id}-cream)"/><circle cx="72" cy="80" r="11" fill="#F5B7A8"/>
    <circle cx="52" cy="112" r="6" fill="#3B2A20"/><circle cx="30" cy="128" r="7" fill="#E9806F"/>
  </g></svg>`;
}
function iconBadger(id) { // 鼬獾：長身、白色臉斑
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M170 120 C 192 112 196 140 176 146" fill="none" stroke="#8A7462" stroke-width="12" stroke-linecap="round"/>
    <path d="M40 120 C 44 92 80 82 120 84 C 158 86 178 104 172 132 C 166 154 120 158 82 154 C 54 152 36 140 40 120z" fill="#8A7462"/>
    <path d="M60 156 v14 M90 158 v14 M130 158 v14 M156 152 v14" stroke="#6E5A4A" stroke-width="12" stroke-linecap="round"/>
    <path d="M12 110 C 14 88 38 78 58 84 C 74 90 76 116 60 126 C 44 134 14 130 12 110z" fill="#6E5A4A"/>
    <path d="M14 108 C 26 100 44 98 58 90 C 48 104 30 112 14 108z" fill="#FFF6EC"/><path d="M30 86 C 40 92 52 94 62 88" stroke="#FFF6EC" stroke-width="6" fill="none" stroke-linecap="round"/>
    <circle cx="40" cy="98" r="4" fill="#1E1611"/><circle cx="12" cy="112" r="5" fill="#1E1611"/><circle cx="54" cy="80" r="8" fill="#8A7462"/>
  </g></svg>`;
}
function iconClinic(id) { // 動物醫院
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <rect x="36" y="56" width="128" height="120" rx="14" fill="url(#${id}-cream2)" transform="translate(4 4)"/><rect x="36" y="56" width="128" height="120" rx="14" fill="url(#${id}-cream)"/>
    <rect x="28" y="40" width="144" height="30" rx="12" fill="url(#${id}-or)"/>
    <rect x="88" y="84" width="24" height="56" rx="5" fill="url(#${id}-or)"/><rect x="72" y="100" width="56" height="24" rx="5" fill="url(#${id}-or)"/>
    <rect x="84" y="150" width="32" height="26" rx="5" fill="#EADFD1"/>
  </g></svg>`;
}
function iconChat(id) { // 問題對話框
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M30 50 a24 24 0 0 1 24 -24 h92 a24 24 0 0 1 24 24 v58 a24 24 0 0 1 -24 24 h-56 l-34 30 v-30 h-2 a24 24 0 0 1 -24 -24z" fill="url(#${id}-cream)"/>
    <text x="100" y="104" font-size="70" font-weight="900" text-anchor="middle" fill="#E5600C" font-family="Bricolage Grotesque,sans-serif">?</text>
  </g></svg>`;
}
function iconWarning(id) { // 注意
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M100 24 L180 166 H20z" fill="url(#${id}-or)" stroke="url(#${id}-or)" stroke-width="18" stroke-linejoin="round"/>
    <rect x="91" y="72" width="18" height="52" rx="9" fill="#FFF2E4"/><circle cx="100" cy="146" r="11" fill="#FFF2E4"/>
  </g></svg>`;
}
function iconWorm(id) { // 寄生蟲
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M30 140 C 50 90 80 160 100 110 C 120 60 150 130 172 70" fill="none" stroke="url(#${id}-cream2)" stroke-width="26" stroke-linecap="round" transform="translate(3 3)"/>
    <path d="M30 140 C 50 90 80 160 100 110 C 120 60 150 130 172 70" fill="none" stroke="url(#${id}-cream)" stroke-width="26" stroke-linecap="round"/>
    <circle cx="168" cy="68" r="4" fill="#3B2A20"/>
  </g></svg>`;
}
function iconBacteria(id) { // 細菌（螺旋）
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M24 100 C 40 50 60 50 72 100 C 84 150 104 150 116 100 C 128 50 148 50 160 100 C 166 124 172 132 180 132" fill="none" stroke="url(#${id}-or2)" stroke-width="22" stroke-linecap="round"/>
    <path d="M24 100 C 40 50 60 50 72 100 C 84 150 104 150 116 100 C 128 50 148 50 160 100 C 166 124 172 132 180 132" fill="none" stroke="#FFB070" stroke-width="8" stroke-linecap="round" opacity=".7"/>
  </g></svg>`;
}
function iconCough(id) { // 咳嗽：衝擊泡泡
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M100 20 l16 30 l34 -12 l-8 34 l34 14 l-30 20 l18 30 l-36 -2 l-4 36 l-24 -26 l-24 26 l-4 -36 l-36 2 l18 -30 l-30 -20 l34 -14 l-8 -34 l34 12z" fill="url(#${id}-cream)" stroke="#E2D6C6" stroke-width="4" stroke-linejoin="round"/>
    <text x="100" y="118" font-size="40" font-weight="900" text-anchor="middle" fill="#E5600C" font-family="Noto Sans TC,sans-serif">咳</text>
  </g></svg>`;
}
function iconMilk(id) { // 媽媽的初乳：奶瓶＋愛心
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <rect x="84" y="14" width="32" height="26" rx="12" fill="url(#${id}-or)"/><rect x="72" y="36" width="56" height="16" rx="6" fill="url(#${id}-or2)"/>
    <rect x="62" y="50" width="76" height="128" rx="24" fill="url(#${id}-cream)"/><rect x="66" y="100" width="68" height="74" rx="20" fill="#FFF8EE"/>
    <path d="M100 150 C 84 136 82 124 92 120 C 98 118 100 124 100 126 C 100 124 102 118 108 120 C 118 124 116 136 100 150z" fill="url(#${id}-pk)"/>
  </g></svg>`;
}
function iconClock(id) { // 時間
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <circle cx="104" cy="104" r="72" fill="url(#${id}-cream2)"/><circle cx="100" cy="100" r="72" fill="url(#${id}-cream)"/>
    <circle cx="100" cy="100" r="56" fill="#F6F0E7" stroke="#E2D6C6" stroke-width="3"/>
    <path d="M100 100 V60 M100 100 L128 116" stroke="url(#${id}-or)" stroke-width="10" stroke-linecap="round"/><circle cx="100" cy="100" r="8" fill="#C9520A"/>
  </g></svg>`;
}
function iconDoc(id) { // 公告、文件
  return `<svg viewBox="0 0 200 200">${_defs(id)}<g filter="url(#${id}-sh)">
    <path d="M46 24 h80 l34 34 v116 a10 10 0 0 1 -10 10 h-104 a10 10 0 0 1 -10 -10 v-140 a10 10 0 0 1 10 -10z" fill="url(#${id}-cream)"/>
    <path d="M126 24 v26 a8 8 0 0 0 8 8 h26z" fill="url(#${id}-or)"/>
    ${[78, 98, 118, 138].map((y, k) => `<rect x="58" y="${y}" width="${k === 3 ? 50 : 84}" height="9" rx="4.5" fill="${k ? '#E7DCCD' : `url(#${id}-or)`}"/>`).join('')}
  </g></svg>`;
}
function iconHeart(id) { // 生命
  return `<svg viewBox="0 0 200 200">${_defs(id)}${_pink(id)}<g filter="url(#${id}-sh)">
    <path d="M100 172 C 40 128 20 96 32 64 C 44 34 84 30 100 60 C 116 30 156 34 168 64 C 180 96 160 128 100 172z" fill="url(#${id}-pk2)"/>
    <ellipse cx="62" cy="68" rx="14" ry="9" fill="#fff" opacity=".45" transform="rotate(-30 62 68)"/>
  </g></svg>`;
}
