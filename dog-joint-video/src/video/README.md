# 介紹影片原始檔

| 段落 | 頁面 | 說明 |
|---|---|---|
| 0:00–0:45 | `intro.html` | 鉤子（溫暖風格）＋核心（知識型風格） |
| 0:45–2:40 | `part2.html` | 為什麼問錯（深色知識段）＋第一步（五類風險因子、分組） |

- `timing.py`：0:45 之後的旁白時間軸。依字數（約每秒 4.3 字）排每句起訖，輸出 `timing.js`（動畫讀取）與 SRT。改旁白或換成實際配音長度時，只要改這份表再重新輸出。
- `render.mjs`：逐格擷取並輸出 MP4（需 Playwright + ffmpeg）。
- `intro-last.png`：0:45 的最後一格，讓第二段能無縫接上。

```
npm install                                   # 安裝 gsap
python3 timing.py                             # 重新產生 timing.js / part2.srt
PAGE=part2.html node render.mjs stills 60 90  # 檢查指定秒數
PAGE=part2.html node render.mjs video part2.mp4 30
```

字型需先安裝：Noto Sans TC、Space Mono、Bricolage Grotesque（Google Fonts）。
狗的外型參數集中在各頁面的 `P` 物件（毛色、耳朵、項圈色）。
