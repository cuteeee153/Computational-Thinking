# 汪探 WanTan — 3-second logo reveal

- `index.html`: the live, scrubbable animation (open in a browser). Space plays or pauses, ←/→ steps one frame, and there's a 0.25× slow-mo toggle.
- `wantan-reveal.mp4`: 1920×1080, 60 fps render (3 s reveal + ~0.9 s hold).

Every frame is a pure function of `t` (`window.__render(t)`), so the page renders frame-exact for video export (`index.html?capture&t=1500`).
