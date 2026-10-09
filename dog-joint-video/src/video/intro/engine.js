// 動畫引擎（0:00–0:45 與 0:45–2:40 共用）：收集各幕 → 掛上版面 → 設定初始狀態 → 排進同一條 GSAP 時間軸。
// 每一幕是 intro/scenes/ 裡的一個檔案，用 Intro.scene({...}) 註冊：
//   id, title       幕號與名稱
//   start, end      這一幕在整支影片中的秒數（只用來預覽與對照，動畫本身寫絕對秒數）
//   narration       [[開始秒, 結束秒, '旁白'], ...]，SRT 由這裡產生
//   mount           [{ into: '#容器', html: '...', at: 'beforeend' | 'afterbegin' }, ...]
//   assets()        掛上版面後要動態填入的內容（狗、圖示）
//   init(ctx)       gsap.set 初始狀態
//   animate(ctx)    排動畫；ctx.L(selector, vars, 秒數) 等同 tl.to
(function () {
  // start／duration：這一頁負責的影片時段（0:45–2:40 那頁在載入各幕前設成 45／160）
  const Intro = window.Intro = { scenes: [], typers: [], start: 0, duration: 45 };

  // 狗：使用者提供的黑柴插畫（assets/dogs/，由 source/black-shiba-sheet.jpg 切出，見 assets/dogs/cut.py）
  //   pose：puppy-sit 幼犬坐／stand-side 側站（朝右）／young-sit 正面坐／senior-sit 老犬坐／stand-front 正面站
  //         lying 趴／stand-side-2 側站 2（朝右）／sit-tilt 歪頭坐／play-bow 邀玩（朝左）／avatar 大頭貼
  //   tilt：整張圖旋轉的角度
  Intro.dog = (el, { pose, tilt = 0 }) => {
    document.querySelector(el).innerHTML =
      `<img src="assets/dogs/${pose}.png" alt="" style="display:block;width:100%;height:auto;transform:rotate(${tilt}deg);transform-origin:50% 90%">`;
  };

  Intro.scene = def => Intro.scenes.push(def);

  // 打字效果直接由時間算出，不靠 GSAP callback，逐格輸出才會精準。
  function type(el, start, dur) {
    el = typeof el === 'string' ? document.querySelector(el) : el;
    Intro.typers.push({ el, text: el.dataset.text, start, dur });
  }
  function renderTypers(t) {
    for (const y of Intro.typers) {
      const chars = [...y.text], p = Math.max(0, Math.min(1, (t - y.start) / y.dur));
      y.el.textContent = chars.slice(0, Math.round(p * chars.length)).join('');
    }
  }

  Intro.boot = function () {
    const scenes = Intro.scenes.slice().sort((a, b) => a.start - b.start);
    // 1. 版面：依幕的順序掛上，所以後面的幕可以把內容放進前面幕建立的容器裡
    for (const sc of scenes)
      for (const m of sc.mount || [])
        document.querySelector(m.into).insertAdjacentHTML(m.at || 'beforeend', m.html);
    for (const sc of scenes) sc.assets && sc.assets();

    // 2. 初始狀態全部設好之後，才開始排動畫
    const tl = gsap.timeline({ paused: true });
    const ctx = { tl, E: 'power3.out', L: (sel, vars, at) => tl.to(sel, vars, at), type };
    for (const sc of scenes) sc.init && sc.init(ctx);
    for (const sc of scenes) sc.animate && sc.animate(ctx);
    tl.to({}, { duration: .01 }, Intro.duration);

    window.START = Intro.start; window.DURATION = Intro.duration;
    window.seek = t => { tl.seek(t, false); renderTypers(t); hud(t); };
    window.SCENES = scenes.map(({ id, title, start, end, narration }) => ({ id, title, start, end, narration }));
    seek(Intro.start);
    preview(scenes);
  };

  // ---------- 預覽模式（輸出影片時不帶參數，不會啟動） ----------
  //   intro.html?scene=05     循環播放第 05 幕（前後各多 0.5 秒）
  //   intro.html?t=12.3       停在 12.3 秒
  //   intro.html?play         從頭播放整段
  //   加上 &hud 顯示幕號、時間與旁白
  let hudEl = null, hudScenes = [];
  function hud(t) {
    if (!hudEl) return;
    const sc = hudScenes.find(s => t >= s.start && t < s.end) || hudScenes[hudScenes.length - 1];
    const line = (sc.narration || []).find(n => t >= n[0] && t <= n[1]);
    hudEl.innerHTML = `<b>幕 ${sc.id}</b>　${sc.title}　<span>${t.toFixed(2)}s</span>${line ? `<br>🎙 ${line[2]}` : ''}`;
  }
  function preview(scenes) {
    const q = new URLSearchParams(location.search);
    if (q.has('hud')) {
      hudScenes = scenes;
      hudEl = document.createElement('div');
      hudEl.style.cssText = 'position:fixed;left:16px;bottom:16px;z-index:999;padding:10px 16px;border-radius:12px;background:rgba(35,27,21,.85);color:#fff;font:500 20px/1.5 "Noto Sans TC";';
      document.body.appendChild(hudEl);
      hud(Intro.start);
    }
    if (q.has('t')) return seek(+q.get('t'));
    let from = Intro.start, to = Intro.duration, loop = false;
    if (q.has('scene')) {
      const sc = scenes.find(s => s.id === q.get('scene').padStart(2, '0'));
      if (!sc) return;
      from = Math.max(Intro.start, sc.start - .5); to = Math.min(Intro.duration, sc.end + .5); loop = true;
    } else if (!q.has('play')) return;
    let t0 = null;
    requestAnimationFrame(function step(now) {
      if (t0 === null) t0 = now;
      let t = from + (now - t0) / 1000;
      if (t > to) { if (!loop) return seek(to); t0 = now; t = from; }
      seek(t);
      requestAnimationFrame(step);
    });
  }
})();
