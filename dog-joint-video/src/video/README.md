# 0:00–0:45 介紹影片原始檔

- `intro.html`：整段動畫（GSAP 時間軸，`seek(t)` 可跳到任一秒）
- `render.mjs`：逐格擷取並輸出 MP4（需 Playwright + ffmpeg）

```
npm install            # 安裝 gsap
node render.mjs stills 5 20 40      # 輸出指定秒數靜態圖
node render.mjs video intro.mp4 30  # 輸出 30fps 影片
```

字型需先安裝：Noto Sans TC、Space Mono、Bricolage Grotesque（Google Fonts）。
狗的外型參數集中在 `intro.html` 的 `P` 物件（毛色、耳朵、項圈色）。
旁白時間軸註記在各段動畫旁，對應 `../../video/intro-0000-0045.srt`。
