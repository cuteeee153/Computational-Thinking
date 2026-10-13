// 黑柴插畫：同一組造型，三種手繪筆觸
//   A 蠟筆塗色：沒有外框，整片蠟筆塗滿，毛邊明顯（參考圖中間那隻柴犬）
//   B 蠟筆線稿：深色蠟筆外框＋淡淡塗色、紙紋露白（參考圖上排有外框的狗）
//   C 粉彩圓潤：頭大一點、柔和外框、腮紅，顆粒很細，最接近影片現在乾淨的版面
// 黑柴特徵：背、頭頂、耳朵外側黑色；眼睛上方兩顆麻糬眉（茶色）；臉頰、口鼻、胸口、肚子、腳內側米白（裏白）；
// 黑白交界有一圈茶色；尾巴捲在背上，內側米白。
const SHIBA = {
  fur: '#2B2522', tan: '#B9662F', cream: '#F7ECDC', nose: '#15100E', ink: '#2A211D', blush: '#EE9C86', tongue: '#E97A86',
};

// 濾鏡：邊緣用高頻位移做蠟筆毛邊，顆粒用雜訊控制透明度（紙紋露白）
//   [x 方向頻率, y 方向頻率, 顆粒對比, 顆粒偏移, 毛邊強度]
const GRAIN = {
  A: { fill: [1.5, 0.45, 3.0, 2.55, 3.2], line: [1.6, 0.6, 2.6, 2.5, 2.2] },
  B: { fill: [1.3, 0.38, 3.2, 2.3, 3.6], line: [1.7, 0.7, 2.6, 2.55, 2.2] },
  C: { fill: [2.8, 2.8, 1.0, 1.42, 1.4], line: [2.4, 2.4, 1.2, 1.7, 1.1] },
};
function shibaDefs(id, style) {
  const f = (name, [fx, fy, k, b, wob]) => `
    <filter id="${id}-${name}" x="-8%" y="-8%" width="116%" height="116%" color-interpolation-filters="sRGB">
      <feTurbulence type="fractalNoise" baseFrequency=".22" numOctaves="2" seed="5" result="w"/>
      <feDisplacementMap in="SourceGraphic" in2="w" scale="${wob}" xChannelSelector="R" yChannelSelector="G" result="d"/>
      <feTurbulence type="fractalNoise" baseFrequency="${fx} ${fy}" numOctaves="3" seed="${name === 'fill' ? 3 : 11}" result="n"/>
      <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  -${k} 0 0 0 ${b}" result="a"/>
      <feComposite in="d" in2="a" operator="in"/>
    </filter>`;
  return `<defs>${f('fill', GRAIN[style].fill)}${f('line', GRAIN[style].line)}
    <style>.${id}-fl .ln{display:none}.${id}-lo :is(path,ellipse,circle):not(.k):not(.ln){display:none}</style></defs>`;
}
// A：只有塗色層。B、C：塗色層＋線條層（同一份造型；線條層只畫輪廓線 .ln 與眼鼻嘴 .k）
function layers(id, style, markup) {
  const fl = `<g class="${id}-fl" filter="url(#${id}-fill)">${markup}</g>`;
  return style === 'A' ? fl : fl + `<g class="${id}-lo" filter="url(#${id}-line)">${markup}</g>`;
}
// 輪廓線：只畫外輪廓（不畫被擋住的邊），A 不顯示
function pen(c, style) {
  const w = style === 'C' ? 3.0 : 2.8;
  const ln = (d, sw = w) => `<path class="ln" d="${d}" fill="none" stroke="${c.ink}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return { ln };
}

// 頭（正面；坐姿與大頭貼共用，座標同坐姿 viewBox）
function shibaHead(c, style) {
  const { ln } = pen(c, style);
  const mouth = `stroke="${c.ink}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"`;
  return `
    <path d="M61,60 C57,42 57,26 61,13 C65,10 70,12 75,16 C83,24 89,32 93,39 Z" fill="${c.fur}"/>
    <path d="M139,60 C143,42 143,26 139,13 C135,10 130,12 125,16 C117,24 111,32 107,39 Z" fill="${c.fur}"/>
    ${ln('M60,52 C57,38 57,25 61,13 C65,10 70,12 75,16 C83,24 89,32 92,37')}
    ${ln('M140,52 C143,38 143,25 139,13 C135,10 130,12 125,16 C117,24 111,32 108,37')}
    <path d="M66,49 C64,37 64,27 66,21 C72,25 78,31 82,37 Z" fill="${c.cream}"/>
    <path d="M134,49 C136,37 136,27 134,21 C128,25 122,31 118,37 Z" fill="${c.cream}"/>
    <path d="M58,58 C54,76 58,96 72,106 C82,114 92,117 100,117 C108,117 118,114 128,106 C142,96 146,76 142,58 C134,40 118,33 100,33 C82,33 66,40 58,58 Z" fill="${c.fur}"/>
    ${ln('M58,58 C54,76 58,96 72,106 C82,114 92,117 100,117 C108,117 118,114 128,106 C142,96 146,76 142,58 C134,40 118,33 100,33 C82,33 66,40 58,58 Z')}
    <path d="M63,82 C64,72 77,67 88,72 L112,72 C123,67 136,72 137,82 C140,96 128,110 100,114 C72,110 60,96 63,82 Z" fill="${c.tan}"/>
    <path d="M67,86 C68,78 79,74 90,78 C94,80 98,82 100,82 C102,82 106,80 110,78 C121,74 132,78 133,86 C135,98 123,110 100,113 C77,110 65,98 67,86 Z" fill="${c.cream}"/>
    <ellipse cx="84" cy="58" rx="5.8" ry="4.2" fill="${c.tan}" transform="rotate(-14 84 58)"/>
    <ellipse cx="116" cy="58" rx="5.8" ry="4.2" fill="${c.tan}" transform="rotate(14 116 58)"/>
    <ellipse cx="85" cy="72.5" rx="5.6" ry="5.4" fill="${c.cream}" opacity=".9"/>
    <ellipse cx="115" cy="72.5" rx="5.6" ry="5.4" fill="${c.cream}" opacity=".9"/>
    <ellipse class="k" cx="85.4" cy="72.8" rx="3.8" ry="4.3" fill="${c.nose}"/>
    <ellipse class="k" cx="114.6" cy="72.8" rx="3.8" ry="4.3" fill="${c.nose}"/>
    <circle class="k" cx="86.8" cy="71.2" r="1.3" fill="#fff"/><circle class="k" cx="116" cy="71.2" r="1.3" fill="#fff"/>
    ${style === 'C' ? `<ellipse cx="73" cy="93" rx="7.5" ry="4.6" fill="${c.blush}" opacity=".8"/><ellipse cx="127" cy="93" rx="7.5" ry="4.6" fill="${c.blush}" opacity=".8"/>` : ''}
    <path class="k" d="M93.5,88 C93.5,84 106.5,84 106.5,88 C106.5,92 102.5,95.5 100,95.5 C97.5,95.5 93.5,92 93.5,88 Z" fill="${c.nose}"/>
    <path class="k" d="M100,95 L100,99 M100,99 C97,103 92,103 90,100 M100,99 C103,103 108,103 110,100" fill="none" ${mouth}/>
    ${style === 'C' ? `<path d="M96,102 C96,108 104,108 104,102 Z" fill="${c.tongue}"/>` : ''}`;
}

// 坐姿正面（viewBox 0 0 200 220）
function shibaSit(id, style, opts = {}) {
  const c = Object.assign({}, SHIBA, opts);
  const { ln } = pen(c, style);
  const head = style === 'C' ? `<g transform="translate(100 112) scale(1.12) translate(-100 -112)">${shibaHead(c, style)}</g>` : shibaHead(c, style);
  const paw = cx => `<path d="M${cx - 10},206 C${cx - 10},199 ${cx + 10},199 ${cx + 10},206 Z" fill="${c.cream}"/>${ln(`M${cx - 10},206 C${cx - 10},199 ${cx + 10},199 ${cx + 10},206`)}`;
  const markup = `
    <path d="M134,154 C152,142 170,150 170,166 C170,182 152,190 143,179 C137,171 145,162 152,168" fill="none" stroke="${c.fur}" stroke-width="15" stroke-linecap="round"/>
    <path d="M152,168 C149,163 155,159 159,164" fill="none" stroke="${c.cream}" stroke-width="5" stroke-linecap="round"/>
    <path d="M74,100 C62,122 57,150 59,176 C60,194 68,206 82,207 L118,207 C132,206 140,194 141,176 C143,150 138,122 126,100 Z" fill="${c.fur}"/>
    ${ln('M74,104 C63,124 58,148 59,168')}${ln('M126,104 C137,124 142,148 141,168')}
    <path d="M61,166 C55,182 58,200 70,206 L88,207 C87,190 82,174 72,166 Z" fill="${c.fur}"/>
    <path d="M139,166 C145,182 142,200 130,206 L112,207 C113,190 118,174 128,166 Z" fill="${c.fur}"/>
    ${ln('M60,164 C55,182 58,198 66,204')}${ln('M140,164 C145,182 142,198 134,204')}
    ${paw(72)}${paw(128)}
    <path d="M82,108 C76,128 78,154 86,176 L114,176 C122,154 124,128 118,108 C110,116 90,116 82,108 Z" fill="${c.cream}"/>
    <path d="M82,146 C80,166 80,188 82,205 L99,205 C99,188 99,166 98,146 Z" fill="${c.cream}"/>
    <path d="M118,146 C120,166 120,188 118,205 L101,205 C101,188 101,166 102,146 Z" fill="${c.cream}"/>
    <path d="M83.5,150 C82,168 82,186 83.5,200" fill="none" stroke="${c.tan}" stroke-width="4" stroke-linecap="round"/>
    <path d="M116.5,150 C118,168 118,186 116.5,200" fill="none" stroke="${c.tan}" stroke-width="4" stroke-linecap="round"/>
    ${ln('M81,150 C79.5,168 79.5,188 81,206 L99,206 L99.5,160')}${ln('M119,150 C120.5,168 120.5,188 119,206 L101,206 L100.5,160')}
    ${ln('M88,206 L88,202 M93,206 L93,202 M107,206 L107,202 M112,206 L112,202', 1.6)}
    ${head}`;
  return `<svg viewBox="0 0 200 220" xmlns="http://www.w3.org/2000/svg">${shibaDefs(id, style)}${layers(id, style, markup)}</svg>`;
}

// 站姿側面（viewBox 0 0 260 200），頭朝左，尾巴捲在背上
function shibaStand(id, style, opts = {}) {
  const c = Object.assign({}, SHIBA, opts);
  const { ln } = pen(c, style);
  // 腿：整條茶色，前緣下半段一道米白，腳掌米白
  const leg = (x, y0, h) => `
    <path d="M${x},${y0} C${x - 1},${y0 + h * .45} ${x + 1},${y0 + h * .8} ${x + 1},${y0 + h} L${x + 14},${y0 + h} C${x + 14},${y0 + h * .78} ${x + 16},${y0 + h * .45} ${x + 16},${y0} Z" fill="${c.tan}"/>
    <path d="M${x + 1},${y0 + h * .5} C${x + 1},${y0 + h * .7} ${x + 2},${y0 + h * .85} ${x + 2},${y0 + h} L${x + 7},${y0 + h} C${x + 6},${y0 + h * .82} ${x + 5},${y0 + h * .66} ${x + 5},${y0 + h * .5} Z" fill="${c.cream}"/>
    <path d="M${x - 3},${y0 + h + 1} C${x - 3},${y0 + h - 6} ${x + 17},${y0 + h - 6} ${x + 17},${y0 + h + 1} Z" fill="${c.cream}"/>
    ${ln(`M${x},${y0 + 6} C${x - 1},${y0 + h * .45} ${x + 1},${y0 + h * .8} ${x - 1},${y0 + h - 2} C${x - 3},${y0 + h + 1} ${x + 17},${y0 + h + 1} ${x + 15},${y0 + h - 2} C${x + 14},${y0 + h * .78} ${x + 16},${y0 + h * .45} ${x + 16},${y0 + 6}`)}`;
  const markup = `
    <g opacity="${style === 'A' ? .8 : 1}">${leg(96, 136, 46)}${leg(192, 128, 54)}</g>
    <path d="M202,94 C186,76 192,52 213,50 C234,48 240,71 227,81 C217,89 206,81 212,70" fill="none" stroke="${c.fur}" stroke-width="16" stroke-linecap="round"/>
    <path d="M212,70 C214,64 222,64 224,70" fill="none" stroke="${c.cream}" stroke-width="5" stroke-linecap="round"/>
    <path d="M78,92 C96,80 170,78 204,88 C222,94 228,116 218,132 C212,142 202,142 190,140 C164,134 134,138 106,148 C88,150 72,140 68,126 C64,110 66,98 78,92 Z" fill="${c.fur}"/>
    ${ln('M84,88 C104,80 170,79 204,88 C222,94 228,116 218,132 C214,138 208,140 202,140')}
    ${ln('M178,137 C160,134 134,138 112,146')}
    <path d="M114,142 C136,136 160,134 180,137 C176,141 170,143 162,142 C146,141 130,143 114,147 Z" fill="${c.cream}"/>
    <path d="M70,104 C65,120 72,142 92,149 L104,148 C96,134 94,116 98,102 Z" fill="${c.cream}"/>
    ${ln('M68,112 C67,128 76,144 92,149')}
    ${leg(80, 134, 48)}${leg(178, 126, 56)}
    <path d="M166,94 C192,90 214,108 211,130 C209,140 202,144 196,146 L180,146 C178,130 172,110 166,94 Z" fill="${c.fur}"/>
    ${ln('M196,146 C204,143 210,138 211,130')}
    <path d="M58,84 C60,98 68,108 80,112 L98,96 C92,82 86,68 80,60 Z" fill="${c.fur}"/>
    <path d="M56,86 C58,100 66,110 78,114 C74,104 72,94 72,86 Z" fill="${c.cream}"/>
    ${ln('M57,88 C59,100 66,110 76,114')}
    <path d="M44,41 L46,15 C48,12 51,12 53,14 L67,37 Z" fill="${c.fur}"/>
    <path d="M60,37 L70,14 C72,12 75,13 76,15 L83,43 Z" fill="${c.fur}"/>
    ${ln('M45,34 L46,15 C48,12 51,12 53,14 L64,33')}${ln('M64,33 L70,14 C72,12 75,13 76,15 L81,38')}
    <path d="M38,50 C44,36 66,30 82,40 C92,48 94,64 88,76 C82,86 70,90 58,89 C46,89 34,86 26,80 C19,76 19,69 26,66 C32,63 34,60 38,50 Z" fill="${c.fur}"/>
    ${ln('M38,50 C44,36 66,30 82,40 C92,48 94,64 88,76 C82,86 70,90 58,89 C46,89 34,86 26,80 C19,76 19,69 26,66 C32,63 34,60 38,50 Z')}
    <path d="M49,36 L49,22 L59,35 Z" fill="${c.cream}"/>
    <path d="M23,70 C34,69 50,67 62,69 C73,71 79,80 71,87 C62,93 44,91 32,86 C24,83 19,77 23,70 Z" fill="${c.tan}"/>
    <path d="M23,72 C34,74 48,74 58,73 C66,74 71,80 65,85 C56,90 42,88 32,84 C25,81 20,77 23,72 Z" fill="${c.cream}"/>
    <ellipse cx="50" cy="52" rx="4.8" ry="3.5" fill="${c.tan}" transform="rotate(-10 50 52)"/>
    <ellipse cx="48" cy="62" rx="5.2" ry="4.8" fill="${c.cream}" opacity=".9"/>
    <ellipse class="k" cx="47.6" cy="62.4" rx="3.3" ry="3.8" fill="${c.nose}"/>
    <circle class="k" cx="48.8" cy="61" r="1.1" fill="#fff"/>
    <path class="k" d="M17.5,68 C17.5,64 26,64 27,68 C27,72 24,74.5 21,74.5 C19,74.5 17.5,71 17.5,68 Z" fill="${c.nose}"/>
    <path class="k" d="M26,78 C32,82 40,82 46,79" fill="none" stroke="${c.ink}" stroke-width="2.2" stroke-linecap="round"/>
    ${style === 'C' ? `<ellipse cx="58" cy="77" rx="6" ry="3.8" fill="${c.blush}" opacity=".8"/>` : ''}`;
  return `<svg viewBox="0 0 260 200" xmlns="http://www.w3.org/2000/svg">${shibaDefs(id, style)}${layers(id, style, markup)}</svg>`;
}

// 大頭貼（給聊天卡片的圓形頭像）
function shibaAvatar(id, style, opts = {}) {
  const c = Object.assign({}, SHIBA, opts);
  return `<svg viewBox="48 6 104 104" xmlns="http://www.w3.org/2000/svg">${shibaDefs(id, style)}${layers(id, style, `<g transform="translate(0 4)">${shibaHead(c, style)}</g>`)}</svg>`;
}
