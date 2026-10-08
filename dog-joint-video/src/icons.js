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
