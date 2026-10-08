// 統一插畫狗角色：同一組幾何，三種渲染模式（ink 繪本 / line 編輯線稿 / clay 軟萌立體）
// viewBox 0 0 300 340
function dogSVG(o) {
  o = Object.assign({
    id: 'd', mode: 'ink', tilt: 0, mood: 'curious',
    body: '#E9A866', dark: '#B86A35', light: '#FFF4E2', nose: '#3B2A20',
    collar: '#2F7F7A', tag: '#F2C14E', stroke: '#3B2A20', sw: 5, blush: '#F5927A'
  }, o);
  const id = o.id, m = o.mode;
  const line = m === 'line';
  const S = line ? `stroke="${o.stroke}" stroke-width="${o.sw}" stroke-linejoin="round" stroke-linecap="round"` :
            m === 'ink' ? `stroke="${o.stroke}" stroke-width="${o.sw}" stroke-linejoin="round" stroke-linecap="round"` : '';
  const f = (c, g) => line ? `fill="${c === 'collar' ? o.collar : (c === 'nose' ? o.stroke : '#fff')}"` :
                       m === 'clay' ? `fill="url(#${id}-${g || c})"` : `fill="${o[c]}"`;
  let defs = '';
  if (m === 'clay') {
    const rg = (n, c1, c2, cx = '35%', cy = '30%') =>
      `<radialGradient id="${id}-${n}" cx="${cx}" cy="${cy}" r="75%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`;
    defs = `<defs>
      ${rg('body', shade(o.body, 18), shade(o.body, -14))}
      ${rg('dark', shade(o.dark, 16), shade(o.dark, -12))}
      ${rg('light', '#ffffff', shade(o.light, -6))}
      ${rg('nose', shade(o.nose, 40), o.nose)}
      ${rg('collar', shade(o.collar, 25), shade(o.collar, -12))}
      ${rg('tag', shade(o.tag, 30), shade(o.tag, -10))}
      <filter id="${id}-soft" x="-20%" y="-20%" width="140%" height="140%"><feDropShadow dx="0" dy="6" stdDeviation="6" flood-color="#5a3d7a" flood-opacity=".18"/></filter>
    </defs>`;
  }
  if (m === 'ink') {
    defs = `<defs><filter id="${id}-wob"><feTurbulence type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="3.2"/></filter></defs>`;
  }
  const grp = m === 'clay' ? `filter="url(#${id}-soft)"` : m === 'ink' ? `filter="url(#${id}-wob)"` : '';
  const eyeR = o.mood === 'happy' ? null : 1;
  const eyes = o.mood === 'happy'
    ? `<path d="M112 122 Q122 110 132 122 M168 122 Q178 110 188 122" fill="none" stroke="${o.nose}" stroke-width="6" stroke-linecap="round"/>`
    : `<ellipse cx="122" cy="120" rx="10" ry="12" fill="${o.nose}"/><ellipse cx="178" cy="120" rx="10" ry="12" fill="${o.nose}"/>
       <circle cx="125.5" cy="115" r="3.6" fill="#fff"/><circle cx="181.5" cy="115" r="3.6" fill="#fff"/>`;
  const brows = o.mood === 'curious'
    ? `<path d="M108 98 Q120 90 132 96" fill="none" stroke="${o.nose}" stroke-width="4.5" stroke-linecap="round"/><path d="M168 92 Q180 86 192 94" fill="none" stroke="${o.nose}" stroke-width="4.5" stroke-linecap="round"/>`
    : o.mood === 'determined'
    ? `<path d="M110 100 L132 104" fill="none" stroke="${o.nose}" stroke-width="5" stroke-linecap="round"/><path d="M190 100 L168 104" fill="none" stroke="${o.nose}" stroke-width="5" stroke-linecap="round"/>`
    : '';
  const mouth = o.mood === 'curious'
    ? `<path d="M150 160 L150 167" stroke="${o.nose}" stroke-width="4" stroke-linecap="round"/><ellipse cx="150" cy="174" rx="5.5" ry="6" fill="${o.nose}"/>`
    : `<path d="M150 159 L150 167 M150 167 Q141 176 132 169 M150 167 Q159 176 168 169" fill="none" stroke="${o.nose}" stroke-width="4" stroke-linecap="round"/>
       <path d="M143 173 Q150 190 157 173 Z" fill="#F07A7A" ${line ? S : ''}/>`;
  const highlight = m === 'clay'
    ? `<ellipse cx="120" cy="90" rx="26" ry="12" fill="#fff" opacity=".35" transform="rotate(-20 120 90)"/>` : '';
  return `<svg viewBox="0 0 300 340" xmlns="http://www.w3.org/2000/svg" style="overflow:visible">${defs}
  <g ${grp}>
    ${m === 'ink' ? `<path d="M200 285 C248 280 268 236 248 200" fill="none" stroke="${o.stroke}" stroke-width="${24 + o.sw * 2}" stroke-linecap="round"/>` : ''}
    <path d="M200 285 C248 280 268 236 248 200" fill="none" stroke="${line ? o.stroke : (m === 'clay' ? shade(o.body, -8) : o.body)}" stroke-width="${line ? o.sw : 24}" stroke-linecap="round"/>
    <ellipse cx="98" cy="292" rx="34" ry="28" ${f('body')} ${S}/>
    <ellipse cx="202" cy="292" rx="34" ry="28" ${f('body')} ${S}/>
    <path d="M92 312 C86 238 116 188 150 188 C184 188 214 238 208 312 Q150 324 92 312 Z" ${f('body')} ${S}/>
    <path d="M128 202 C138 232 140 262 150 286 C160 262 162 232 172 202 Q150 194 128 202 Z" ${f('light')} ${line ? '' : ''}/>
    <rect x="120" y="244" width="24" height="68" rx="12" ${f('body')} ${S}/>
    <rect x="156" y="244" width="24" height="68" rx="12" ${f('body')} ${S}/>
    <ellipse cx="132" cy="312" rx="17" ry="10" ${f('light')} ${S}/>
    <ellipse cx="168" cy="312" rx="17" ry="10" ${f('light')} ${S}/>
    <g transform="rotate(${o.tilt} 150 150)">
      <path d="M106 186 Q150 206 194 186 L188 204 Q150 224 112 204 Z" ${f('collar')} ${S}/>
      <circle cx="150" cy="216" r="11" ${f('tag')} ${S}/>
      <path d="M92 86 C58 88 44 140 58 172 C68 190 92 182 98 154 Z" ${f('dark')} ${S}/>
      <ellipse cx="150" cy="130" rx="80" ry="68" ${f('body')} ${S}/>
      <ellipse cx="179" cy="117" rx="25" ry="23" ${line ? `fill="${o.stroke}" opacity=".12"` : f('dark')}/>
      <path d="M204 78 C232 56 260 80 248 116 C240 138 220 132 212 112 Z" ${f('dark')} ${S}/>
      <ellipse cx="150" cy="160" rx="42" ry="31" ${f('light')} ${line ? '' : ''}/>
      ${highlight}
      ${brows}
      ${eyes}
      <ellipse cx="107" cy="150" rx="11" ry="6.5" fill="${o.blush}" opacity="${line ? 0 : .55}"/>
      <ellipse cx="193" cy="150" rx="11" ry="6.5" fill="${o.blush}" opacity="${line ? 0 : .55}"/>
      <path d="M136 146 Q150 138 164 146 Q162 158 150 160 Q138 158 136 146 Z" ${f('nose')}/>
      ${m === 'clay' ? '<ellipse cx="145" cy="145" rx="5" ry="2.5" fill="#fff" opacity=".6"/>' : ''}
      ${mouth}
    </g>
  </g></svg>`;
}
function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  let r = n >> 16, g = (n >> 8) & 255, b = n & 255;
  const t = pct < 0 ? 0 : 255, p = Math.abs(pct) / 100;
  r = Math.round((t - r) * p + r); g = Math.round((t - g) * p + g); b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}
