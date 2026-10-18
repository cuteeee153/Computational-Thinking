// 版面小工具（第三集起，清新亮色為主，經典米色也能用）：章節導覽、黏土黑柴、圖示磚、標註箭頭、手機畫面、常用動畫。樣式在 kit.css。
// 每一幕用 K.scene('幕號', 章節, {...}) 註冊（章節 -1＝不顯示導覽），其他和 WT.scene 一樣；另外多一個 bg：'mint' 淡綠／'sky' 淡藍（清新亮色的底色）。
// 章節導覽：在第一個幕檔最上面寫 K.CHAPTERS = ['基本觀念', ...]；沒寫就不顯示。
(function () {
  const K = window.K = {};
  K.CHAPTERS = [];
  const RING = '0 0 0 5px #F97316,0 50px 90px -40px rgba(40,60,100,.32)';
  const PLAIN = '0 0 0 0px #F97316,0 50px 90px -40px rgba(40,60,100,.32)';
  K.RING = RING; K.PLAIN = PLAIN;

  // ---------- 註冊一幕：底色、章節導覽 ----------
  K.scene = (id, chap, def) => WT.scene(id, {
    ...def,
    assets(S) { if (def.bg) S.el.classList.add('bg-' + def.bg); def.assets && def.assets(S); },
    animate(S) { K.nav(S, chap); def.animate && def.animate(S); },
  });

  // 章節導覽（右上角）：目前章節深色、講過的章節黑字、還沒到的灰字
  let navMade = false;
  K.nav = (S, chap) => {
    if (!K.CHAPTERS.length) return;
    if (!navMade) {
      navMade = true;
      const el = document.createElement('div'); el.id = 'nav';
      el.innerHTML = K.CHAPTERS.map((c, k) => `<span id="nv${k}"><i>${k + 1}</i>${c}</span>`).join('');
      document.getElementById('stage').appendChild(el);
      gsap.set('#nav', { opacity: 0 });
    }
    S.set('#nav', { opacity: chap < 0 ? 0 : 1 }, S.start);
    K.CHAPTERS.forEach((_, k) => S.set('#nv' + k, k === chap
      ? { backgroundColor: '#16130F', color: '#FFFFFF', opacity: 1 }
      : { backgroundColor: 'rgba(255,255,255,0)', color: k < chap ? '#16130F' : '#A29D97', opacity: 1 }, S.start));
  };

  // ---------- 版面元件（回傳 HTML 字串） ----------
  // 狗：黏土黑柴（assets/dogs/clay/）sit 坐／tilt 歪頭／happy 開心／beg 站起來拜託／belly 翻肚／stand-side 側站（朝左）／yawn 打哈欠／sleep 睡覺／rest 趴著
  K.dog = (pose, o = {}) => `<div class="cdog" id="${o.id || ''}" style="left:${o.x}px;top:${o.y}px;width:${o.w}px${o.flip ? ';transform:scaleX(-1)' : ''}${o.style ? ';' + o.style : ''}">` +
    (o.shadow === false ? '' : `<i class="gsh"></i>`) + `<img src="assets/dogs/clay/${pose}.png" alt=""></div>`;
  let uid = 0;
  K.ic = (name, id) => window['icon' + name](id || 'k' + (uid++));
  K.tile = (name, o = {}) => `<div class="tile" id="${o.id || ''}" style="left:${o.x}px;top:${o.y}px;${o.size ? `width:${o.size}px;height:${o.size}px;border-radius:${o.size * .26}px;` : ''}transform:rotate(${o.rot || 0}deg)">${K.ic(name)}</div>`;
  // 大標：lines 是字串陣列；以 ~ 開頭的行是灰字；字裡可放 <b class="o">橘字</b>
  K.h = (id, lines, o = {}) => `<div class="h abs" style="left:${o.x ?? 140}px;top:${o.y ?? 300}px;font-size:${o.size || 96}px${o.w ? `;width:${o.w}px` : ''}${o.center ? ';text-align:center' : ''}">` +
    lines.map((l, k) => `<span class="ln"><span id="${id}${k}"${l[0] === '~' ? ' class="g"' : ''}>${l.replace(/^~/, '')}</span></span>`).join('') + `</div>`;
  K.kicker = (id, num, text, o = {}) => `<div class="eyebrow abs kick" id="${id}" style="left:${o.x ?? 140}px;top:${o.y ?? 220}px">${num}<i></i><span>${text}</span></div>`;
  K.anno = (id, big, small, o = {}) => `<div class="anno" id="${id}" style="left:${o.x}px;top:${o.y}px;text-align:${o.align || 'center'}">${big ? `<b style="${o.bs ? 'font-size:' + o.bs + 'px' : ''}">${big}</b>` : ''}${small ? `<span style="${o.ss ? 'font-size:' + o.ss + 'px' : ''}">${small}</span>` : ''}</div>`;
  // 手繪箭頭：d 是路徑（在 w×h 的框裡），箭頭自動畫在終點
  K.arrow = (id, o) => {
    const p = o.d.match(/-?[\d.]+/g).map(Number), n = p.length, ex = p[n - 2], ey = p[n - 1], px = p[n - 4], py = p[n - 3];
    const a = Math.atan2(ey - py, ex - px), L = 20, s = .55;
    const h1 = [ex - L * Math.cos(a - s), ey - L * Math.sin(a - s)], h2 = [ex - L * Math.cos(a + s), ey - L * Math.sin(a + s)];
    return `<svg class="arrow" id="${id}" style="left:${o.x}px;top:${o.y}px" width="${o.w}" height="${o.h}"><path pathLength="1" d="${o.d}"/><path pathLength="1" class="hd" d="M${h1[0].toFixed(1)} ${h1[1].toFixed(1)} L${ex} ${ey} L${h2[0].toFixed(1)} ${h2[1].toFixed(1)}"/></svg>`;
  };
  K.chk = (todo) => todo ? `<span class="chk todo"></span>` : `<span class="chk"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 12 L10 17 L19 7" fill="none" stroke="#fff" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>`;
  // 手機：inner 放在螢幕裡（藍天頂部之下）；o.title 標題；o.avatar 狗大頭貼＋名字
  K.phone = (id, inner, o = {}) => `<div class="phone" id="${id}" style="${o.x != null ? `left:${o.x}px;` : ''}${o.y != null ? `top:${o.y}px;` : ''}"><div class="scr">
    <div class="island"></div>
    <div class="status"><span>9:41</span><span style="display:flex;gap:10px;align-items:center"><svg width="34" height="22" viewBox="0 0 34 22"><rect x="0" y="14" width="6" height="8" rx="1.5" fill="#fff"/><rect x="9" y="10" width="6" height="12" rx="1.5" fill="#fff"/><rect x="18" y="5" width="6" height="17" rx="1.5" fill="#fff"/><rect x="27" y="0" width="6" height="22" rx="1.5" fill="#fff"/></svg><svg width="30" height="22" viewBox="0 0 30 22"><path d="M2 8 A19 19 0 0 1 28 8 M7 13 A12 12 0 0 1 23 13" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/><circle cx="15" cy="18.5" r="3" fill="#fff"/></svg><svg width="46" height="22" viewBox="0 0 46 22"><rect x="1.5" y="1.5" width="38" height="19" rx="6" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width="2.5"/><rect x="5" y="5" width="31" height="12" rx="3" fill="#fff"/></svg></span></div>
    <div class="nav" style="left:48px"><svg width="26" height="26" viewBox="0 0 24 24"><path d="M15 4 L7 12 L15 20" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
    <div class="nav" style="right:48px"><svg width="34" height="8" viewBox="0 0 34 8"><circle cx="4" cy="4" r="3.6" fill="#fff"/><circle cx="17" cy="4" r="3.6" fill="#fff"/><circle cx="30" cy="4" r="3.6" fill="#fff"/></svg></div>
    ${o.title ? `<div class="ptitle">${o.title}</div>` : ''}
    ${inner}</div></div>`;
  K.cap = (id, html, o = {}) => `<div class="note" id="${id}" style="left:${o.x}px;top:${o.y}px${o.w ? `;width:${o.w}px` : ''}">${html}</div>`;

  // ---------- 動畫（S.to 的包裝；說明會進分鏡板） ----------
  K.lines = (S, id, n, t, label, gap = .22) => { for (let k = 0; k < n; k++) S.to('#' + id + k, { yPercent: 0, duration: .8, ease: 'power4.out' }, t + k * gap, k ? '' : label); };
  K.hideLines = (id, n) => { for (let k = 0; k < n; k++) gsap.set('#' + id + k, { yPercent: 110 }); };
  K.pop = (S, sel, t, label, o = {}) => {
    gsap.set(sel, { opacity: 0, scale: o.from ?? .5 });
    S.to(sel, { opacity: 1, scale: 1, duration: .5, ease: 'back.out(2)', stagger: o.stagger || 0 }, t, label);
    if (o.sfx !== false) S.sfx(t, o.sfx || 'pop', label ? `${label.replace(/：.*/, '')}：「啵」` : '「啵」', { pitch: o.pitch || 1, gain: o.gain || 1 });
  };
  K.rise = (S, sel, t, label, o = {}) => {
    gsap.set(sel, { opacity: 0, y: o.dy ?? 50, x: o.dx ?? 0 });
    S.to(sel, { opacity: 1, y: 0, x: 0, duration: .6, ease: 'power3.out', stagger: o.stagger || 0 }, t, label);
    if (o.sfx !== false) S.sfx(t, o.sfx || 'slide', label ? `${label.replace(/：.*/, '')}：輕「咻」` : '輕「咻」', { gain: o.gain || .8 });
  };
  K.fadeIn = (S, sel, t, label, d = .5) => { gsap.set(sel, { opacity: 0 }); S.to(sel, { opacity: 1, duration: d }, t, label); };
  K.out = (S, sel, t, d = .4) => S.to(sel, { opacity: 0, duration: d }, t);
  K.draw = (S, sel, t, label, d = .7) => {
    gsap.set(sel + ' path', { strokeDasharray: 1, strokeDashoffset: 1 });
    S.to(sel + ' path:not(.hd)', { strokeDashoffset: 0, duration: d, ease: 'power2.inOut' }, t, label);
    S.to(sel + ' path.hd', { strokeDashoffset: 0, duration: .2, ease: 'none' }, t + d - .05);
    S.sfx(t, 'draw', label ? `${label.replace(/：.*/, '')}：筆刷聲` : '畫箭頭：筆刷聲', { dur: d, gain: .6 });
  };
  K.ring = (S, sel, t, on = true) => S.to(sel, { boxShadow: on ? RING : PLAIN, duration: .35 }, t);
  K.count = (S, sel, from, to, t, d, label, fmt = v => Math.round(v).toLocaleString('en-US')) => {
    const el = document.querySelector(sel), o = { v: from };
    el.textContent = fmt(from);
    S.to(o, { v: to, duration: d, ease: 'power2.out', onUpdate: () => { el.textContent = fmt(o.v); } }, t, label);
  };
  // 打字（給手機輸入框）：data-text
  K.type = (S, sel, t, label) => { const el = document.querySelector(sel); const n = [...el.dataset.text].length; S.type(sel, t, n * .07, label); S.sfx(t, 'typing', '打字聲', { dur: n * .07, chars: n, gain: .7 }); };
  // 盒子印章效果
  K.stamp = (S, sel, t, label) => {
    gsap.set(sel, { opacity: 0, scale: 1.8, rotate: -12 });
    S.to(sel, { opacity: 1, scale: 1, rotate: -6, duration: .35, ease: 'power4.in' }, t, label);
    S.sfx(t + .3, 'thud', label ? `${label.replace(/：.*/, '')}：印章「咚」` : '印章「咚」');
  };
})();
