// 汪探系列的動畫引擎：照 script.json 的順序把每一幕排進同一條時間軸。
//
// 時間全部是「成片時間」（秒，從片頭開始算）。每一幕的開始／結束、每一句旁白的時間都由 build-timing.mjs 算好
// （還沒錄音時照語速估，錄音後照對時結果），放在 timing/timing.js 的 window.TIMING。
// 所以幕的檔案裡不寫死秒數，而是寫「念到哪個字的時候」：S.word('關鍵字')。錄音換了，動畫會自己跟著旁白走。
//
// 每一幕是 scenes/ 裡的一個檔案，用 WT.scene('幕號', {...}) 註冊：
//   visuals        給分鏡板看的畫面說明（字串陣列）
//   enter          進場方式：'fade'（預設，淡入）／'slide'（米色畫面由右蓋過來＋大「咻」）／'cut'（直接切）
//                  ／'none'（不換底，接著用前一幕的畫面：版面可以放進前一幕的容器裡）
//   dark           true＝深色底（頻道名稱自動變白字）
//   mount(S)       這一幕的版面（HTML 字串，放進自己的 <section>；或 [{ into: '#容器', html }]）
//   assets(S)      版面掛上之後要動態填入的內容（狗、圖示）
//   init(S)        gsap.set 初始狀態
//   animate(S)     排動畫，用下面的 S.to／S.type／S.sfx
//   key(S)         分鏡板關鍵畫面的時間（預設：最後一個動作之後 0.8 秒）
//
// S（每一幕的工具）：
//   S.start, S.end               這一幕的開始、結束
//   S.narrStart, S.narrEnd       旁白開始、結束
//   S.at(k), S.atEnd(k)          第 k 個短句（0 起算，依標點切）開始／結束的時間
//   S.word('字', n, d)           第 n 次（0 起算）念到「字」的時間＋d 秒；找不到會直接報錯
//   S.wordEnd('字', n, d)        念完「字」的時間＋d 秒
//   S.to(sel, vars, t, '說明')   等同 gsap 的 tl.to；有寫說明的，會自動列進分鏡板的「動畫」欄（含秒數）
//   S.fromTo(sel, from, to, t, '說明')
//   S.type(sel, t, dur, '說明')  打字效果（元素的 data-text）
//   S.sfx(t, '種類', '說明', { gain, pitch, dur, chars })   音效（種類見 build-sfx.mjs），自動列進分鏡板
//   S.footage(opts)              真實畫面的框（HTML）：有影片就逐格顯示，還沒給影片就顯示「待補 N 秒」
(function () {
  const T = window.TIMING;
  const WT = window.WT = { defs: {}, typers: [], footages: [] };
  WT.scene = (id, def) => { WT.defs[id] = def; };

  // 狗：黑柴插畫（assets/dogs/）
  //   pose：puppy-sit 幼犬坐／stand-side 側站（朝右）／young-sit 正面坐／senior-sit 老犬坐／stand-front 正面站
  //         lying 趴／stand-side-2 側站 2（朝右）／sit-tilt 歪頭坐／play-bow 邀玩（朝左）／avatar 大頭貼
  WT.dog = (pose, { tilt = 0 } = {}) =>
    `<img src="assets/dogs/${pose}.png" alt="" style="display:block;width:100%;height:auto;transform:rotate(${tilt}deg);transform-origin:50% 90%">`;

  const nchar = s => (s.match(/[一-鿿A-Za-z0-9]/g) || []).length;
  const fmt = t => t.toFixed(1);

  function makeS(sc, motions, cues, tl) {
    const ph = sc.phrases;
    const S = { ...sc };
    S.at = k => { if (!ph[k]) throw new Error(`幕 ${sc.id}：沒有第 ${k} 個短句`); return ph[k].t0; };
    S.atEnd = k => { if (!ph[k]) throw new Error(`幕 ${sc.id}：沒有第 ${k} 個短句`); return ph[k].t1; };
    // 念到某個字的時間：短句內依字數平均分配
    const charAt = i => {
      let pos = 0;
      for (const p of ph) { const n = nchar(p.text); if (i < pos + n) return [p.t0 + (p.t1 - p.t0) * (i - pos) / n, (p.t1 - p.t0) / n]; pos += n; }
      return [ph[ph.length - 1].t1, 0];
    };
    const find = (w, n = 0) => {
      const spoken = ph.map(p => p.text.replace(/[^一-鿿A-Za-z0-9]/g, '')).join(''), key = w.replace(/[^一-鿿A-Za-z0-9]/g, '');
      let i = -1; for (let k = 0; k <= n; k++) { i = spoken.indexOf(key, i + 1); if (i < 0) throw new Error(`幕 ${sc.id}：旁白裡找不到第 ${n + 1} 個「${w}」`); }
      return [i, key.length];
    };
    S.word = (w, n = 0, d = 0) => { const [i] = find(w, n); return charAt(i)[0] + d; };
    S.wordEnd = (w, n = 0, d = 0) => { const [i, len] = find(w, n), [t, per] = charAt(i + len - 1); return t + per + d; };
    const note = (t, label) => { if (label) motions.push([t, label]); };
    S.to = (sel, vars, t, label) => { note(t, label); return tl.to(sel, vars, t); };
    S.fromTo = (sel, a, b, t, label) => { note(t, label); return tl.fromTo(sel, a, b, t); };
    S.set = (sel, vars, t) => tl.set(sel, vars, t);
    S.type = (sel, t, dur, label) => {
      note(t, label);
      const el = typeof sel === 'string' ? document.querySelector(sel) : sel;
      WT.typers.push({ el, text: el.dataset.text, start: t, dur });
    };
    S.sfx = (t, kind, label, o = {}) => cues.push({ scene: sc.id, t, kind, label, ...o });
    S.footage = (o = {}) => {
      const f = sc.footage || {}, land = (o.orient || f.orient) === 'landscape';
      const id = `ft-${sc.id}`, meta = (window.FOOTAGE || {})[sc.id];
      if (meta) WT.footages.push({ id, t0: sc.start + (o.offset || 0), ...meta });
      return `<div class="vframe${land ? ' land' : ''}" id="vf-${sc.id}">` + (meta
        ? `<img id="${id}" alt="">`
        : `<div class="todo"><b>真實畫面待補</b><span>${land ? '橫拍 16:9' : '直拍 9:16'}｜約 ${f.seconds || '?'} 秒</span><span>${f.shot || ''}</span></div>`) + `</div>`;
    };
    return S;
  }

  // 字幕：畫面最下方，前後 0.12 秒淡入淡出
  let capEl = null;
  function renderCaption(t) {
    const c = (window.CAPTIONS || []).find(c => t >= c[0] && t < c[1]);
    if (!c) { capEl.style.opacity = 0; return; }
    if (capEl.textContent !== c[2]) capEl.textContent = c[2];
    capEl.style.opacity = Math.min(1, (t - c[0]) / .12, (c[1] - t) / .12);
  }
  function renderTypers(t) {
    for (const y of WT.typers) {
      const chars = [...y.text], p = Math.max(0, Math.min(1, (t - y.start) / y.dur));
      y.el.textContent = chars.slice(0, Math.round(p * chars.length)).join('');
    }
  }
  // 真實畫面：逐格換圖（assets/footage/<幕號>/f_00001.jpg…），等圖片解碼完才截圖
  function renderFootage(t) {
    const waits = [];
    for (const f of WT.footages) {
      const el = document.getElementById(f.id); if (!el) continue;
      const k = Math.max(1, Math.min(f.frames, Math.floor((t - f.t0) * f.fps) + 1));
      const src = `assets/footage/${f.dir}/f_${String(k).padStart(5, '0')}.jpg`;
      if (el.getAttribute('src') !== src) { el.setAttribute('src', src); waits.push(el.decode().catch(() => {})); }
    }
    return Promise.all(waits);
  }

  WT.boot = function () {
    const stage = document.querySelector('#stage');
    const tl = gsap.timeline({ paused: true });
    const cues = [], board = [];
    // 頻道名稱（系列固定，左上角）
    const chrome = document.createElement('div'); chrome.id = 'chrome';
    chrome.innerHTML = `<div class="logo" id="logo"><i><img src="brand/wantan-logo.svg" alt=""></i>汪探<span class="sep">｜</span>WanTan</div>`;
    stage.appendChild(chrome);

    // 1. 每一幕一個 <section>，依順序疊上去；還沒有檔案的幕用草稿卡
    const list = T.scenes.map((sc, i) => {
      const def = WT.defs[sc.id] || {
        draft: true, visuals: ['（還沒設計畫面：草稿卡顯示幕號、標題和旁白）'],
        mount: S => `<div class="draft"><div class="k">幕 ${S.id}</div><h2>${S.title}</h2><p>${S.text.replace(/\|/g, '')}</p></div>`,
      };
      const sec = document.createElement('section');
      sec.className = 'scene' + (def.enter === 'none' ? ' clear' : '') + (def.dark ? ' dark' : '');
      if (def.enter === 'none') sec.style.background = 'none';
      sec.id = 'sc-' + sc.id; sec.style.zIndex = 10 + i;
      stage.insertBefore(sec, chrome);
      const motions = [];
      return { sc, def, sec, motions, S: makeS({ ...sc, el: sec }, motions, cues, tl) };
    });
    for (const x of list) {
      const m = x.def.mount ? x.def.mount(x.S) : '';
      for (const it of typeof m === 'string' ? [{ into: x.sec, html: m }] : m)
        (typeof it.into === 'string' ? document.querySelector(it.into) : it.into).insertAdjacentHTML(it.at || 'beforeend', it.html);
    }
    for (const x of list) x.def.assets && x.def.assets(x.S);
    capEl = document.createElement('div'); capEl.id = 'caption'; stage.appendChild(capEl);

    // 2. 進出場：每一幕在下一個「會換底」的幕完全蓋上之後隱藏
    gsap.set('#logo', { opacity: 0, y: -12 });
    tl.to('#logo', { opacity: 1, y: 0, duration: .6, ease: 'power3.out' }, T.start + .1);
    list.forEach((x, i) => {
      const { S, def, sec } = x, enter = def.enter || (i === 0 ? 'cut' : 'fade');
      if (enter === 'slide') { gsap.set(sec, { xPercent: 100 }); x.motions.push([S.start, '米色畫面由右往左蓋過來']); cues.push({ scene: S.id, t: S.start, kind: 'whoosh-big', label: '換頁：大「咻」' }); tl.to(sec, { xPercent: 0, duration: .85, ease: 'power3.inOut' }, S.start); }
      else if (enter === 'fade') { gsap.set(sec, { autoAlpha: 0 }); tl.to(sec, { autoAlpha: 1, duration: .5, ease: 'power1.inOut' }, S.start - .25); }
      else { gsap.set(sec, { visibility: 'hidden' }); tl.set(sec, { visibility: 'visible' }, S.start); }
      const next = list.slice(i + 1).find(y => (y.def.enter || 'fade') !== 'none');
      if (next) tl.set(sec, { visibility: 'hidden' }, next.S.start + 1);
      // 深色底的幕：頻道名稱變白字，下一個淺色幕再變回來
      const prevDark = i > 0 && list[i - 1].def.dark;
      if (def.dark && !prevDark) tl.to('#logo', { color: '#FFF8EF', duration: .4 }, S.start);
      if (!def.dark && prevDark && def.enter !== 'none') tl.to('#logo', { color: '#231B15', duration: .4 }, S.start);
    });
    for (const x of list) x.def.init && x.def.init(x.S);
    for (const x of list) x.def.animate && x.def.animate(x.S);
    tl.to({}, { duration: .01 }, T.total);

    // 3. 給輸出影片、分鏡板、音效用的資料
    window.START = T.start; window.DURATION = T.total;
    window.SFX_CUES = cues.sort((a, b) => a.t - b.t);
    window.SCENES = list.map(({ sc, def, S, motions }) => {
      const last = Math.max(sc.start, ...motions.map(m => m[0]));
      const key = def.key ? def.key(S) : Math.min(sc.end - .1, Math.max(sc.narrEnd - .2, last + .8));
      return {
        id: sc.id, title: sc.title, start: sc.start, end: sc.end, key, group: sc.group, draft: !!def.draft,
        visuals: (sc.footage && !(window.FOOTAGE || {})[sc.id] ? [`【真實畫面待補】${sc.footage.orient === 'landscape' ? '橫拍' : '直拍'}約 ${sc.footage.seconds} 秒：${sc.footage.shot || ''}`] : []).concat(def.visuals || []),
        motions: motions.sort((a, b) => a[0] - b[0]).map(([t, l]) => `${fmt(t)} 秒｜${l}`),
        sfx: cues.filter(c => c.scene === sc.id).map(c => `${fmt(c.t)} 秒｜${c.label}`),
        narration: sc.text.replace(/\|/g, ''),
        narrationTimes: [[+sc.narrStart.toFixed(2), +sc.narrEnd.toFixed(2), sc.text.replace(/\|/g, ''), ...(sc.est ? ['est'] : [])]],
      };
    });
    window.seek = t => { tl.seek(t, false); renderTypers(t); renderCaption(t); hud(t); return renderFootage(t); };
    seek(START);
    preview();
  };

  // ---------- 預覽模式（輸出影片時不帶參數，不會啟動） ----------
  //   video.html?scene=03   循環播放第 03 幕　　video.html?t=12.3   停在 12.3 秒　　video.html?play   從頭播放
  //   加上 &hud 顯示幕號、時間
  let hudEl = null;
  function hud(t) {
    if (!hudEl) return;
    const sc = SCENES.find(s => t >= s.start && t < s.end) || SCENES[SCENES.length - 1];
    hudEl.innerHTML = `<b>幕 ${sc.id}</b>　${sc.title}　<span>${t.toFixed(2)}s</span>`;
  }
  function preview() {
    const q = new URLSearchParams(location.search);
    if (q.has('hud')) {
      hudEl = document.createElement('div');
      hudEl.style.cssText = 'position:fixed;left:16px;top:16px;z-index:999;padding:10px 16px;border-radius:12px;background:rgba(35,27,21,.85);color:#fff;font:500 20px/1.5 "Noto Sans TC";';
      document.body.appendChild(hudEl); hud(START);
    }
    if (q.has('t')) return seek(+q.get('t'));
    let from = START, to = DURATION, loop = false;
    if (q.has('scene')) {
      const sc = SCENES.find(s => s.id === q.get('scene')); if (!sc) return;
      from = Math.max(START, sc.start - .5); to = Math.min(DURATION, sc.end + .5); loop = true;
    } else if (!q.has('play')) return;
    let t0 = null;
    requestAnimationFrame(function step(now) {
      if (t0 === null) t0 = now;
      let t = from + (now - t0) / 1000;
      if (t > to) { if (!loop) return seek(to); t0 = now; t = from; }
      seek(t); requestAnimationFrame(step);
    });
  }
})();
