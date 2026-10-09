# 動畫原始檔

## 用自然語言修改整支影片（分鏡修改板，0:00–2:40）

分鏡修改板：https://claude.ai/artifact/CDtrVSLQYiUuPH9vPLkDDn

1. 在分鏡板上看每一幕的預覽、畫面清單、動畫清單、字幕。
2. 在該幕下方用一般的話寫修改需求並送出（可點清單項目帶入「畫面 2」「動畫 3」編號）；不屬於某一幕的寫在「整體修改」。
3. 在對話裡告訴 Claude「分鏡板有新需求」。

Claude 處理流程（給之後的 session）：
- 用 ArtifactData `list` 讀分鏡板資料庫的 `requests` 集合，取 `status: "new"` 的需求（欄位：scene、text、status、reply、createdAt）。
- 「畫面 N／動畫 N」對應該幕檔案（幕 01–14 在 `intro/scenes/`，幕 15–26 在 `part2/scenes/`）裡 `visuals`／`motions` 陣列的第 N 項；改動畫時同步更新這兩個白話說明與 `narration`。
- 需求不清楚時，把該則設成 `status: "question"` 並在 `reply` 寫問題，不要猜。
- 改完：重新輸出有改到的那段影片（改了幕 14 的結尾畫面要同時更新 `intro-last.png` 並重出 0:45–2:40）→ `node build-srt.mjs intro|part2|all` 更新三份 SRT → 串接整支 → `node build-storyboard.mjs <整支影片> <分鏡板資料夾> "<這版改了什麼>"` → 以同一個 URL 重新發佈分鏡板（含 frames/、clips/）→ 把處理過的需求設成 `done`（`doneIn` 填新版本號，`reply` 寫改了什麼）。

## 0:00–0:45：一幕一個檔案

```
intro.html              組合頁：只放圖層，依序載入下面每一幕
intro/core.css          共用樣式（色票、卡片、泡泡、文件卡等元件）
intro/engine.js         引擎：掛版面、設初始狀態、排時間軸、打字效果、預覽模式；狗的外型 Intro.DOG
intro/scenes/NN-*.js    每一幕：版面＋初始狀態＋動畫＋旁白
build-srt.mjs           由各幕的旁白產生 SRT
```

| 幕 | 時間 | 內容 | 旁白 |
|---|---|---|---|
| 01 | 0.0–2.8 | 開場：聊天卡片、問題、文章 A（七歲） | 七歲才要顧關節？ |
| 02 | 2.8–5.8 | 文章 B（五歲） | 大型犬五歲就要吃保健品？ |
| 03 | 5.8–9.2 | 文章 C（三到五歲）＋三個數字打架 | 還有人說，三到五歲就開始退化。 |
| 04 | 9.2–13.0 | 卡片右移，大標「滑了三篇文章，三個答案」 | 你滑完三篇文章，數字完全對不上， |
| 05 | 13.0–15.4 | 輸入框打出「到底要聽誰的？」 | 只想知道一件事： |
| 06 | 15.4–18.9 | 手繪箭頭、狗歪頭、游標按下送出 | 我家這隻，現在到底要不要開始？ |
| 07 | 18.9–20.2 | 轉場：從送出鍵展開的圓形擦除 | — |
| 08 | 20.2–21.7 | 小標「先講結論」 | 先講結論。 |
| 09 | 21.7–24.7 | 三顆年齡標籤浮起 | 會這麼亂，不是誰在騙你， |
| 10 | 24.7–26.9 | 標籤翻落，大標「問題問錯了」 | 是問題問錯了。 |
| 11 | 26.9–30.5 | 文件卡滑入，「年齡」被劃掉 | 要不要開始，從來不是看年齡， |
| 12 | 30.5–33.2 | 「✓ 風險等級」打勾 | 而是看風險因子。 |
| 13 | 33.2–35.6 | STEP 01–03 依序出現 | 這支影片用三步驟， |
| 14 | 35.6–45.0 | 狗出現、STEP 01 亮起、來源註記、停格 | 幫你找到家裡那隻現在的位置。 |

### 每一幕的寫法

```js
Intro.scene({
  id: '05', title: '輸入框「到底要聽誰的？」', start: 13.0, end: 15.4,
  narration: [[13.2, 15.2, '只想知道一件事：']],        // 字幕也從這裡產生
  mount: [{ into: '#容器', html: `...` }],             // 這一幕新增的版面
  assets() { ... },                                    // 動態填入（狗、圖示）
  init() { gsap.set(...) },                            // 初始狀態
  animate({ tl, L, E, type }) { L('#caret', {...}, 13.0) },  // 動畫，秒數為整支影片的絕對時間
});
```

- 後面的幕可以把內容放進前面幕建立的容器（例如第 02 幕把文章 B 放進第 01 幕的 `#answers`）。
- 改某一句旁白的時間：同時改該幕 `narration` 和 `animate` 裡對應的秒數，再重新產生 SRT。
- 換成自家狗：只改 `intro/engine.js` 的 `Intro.DOG`。
- 頻道 logo：`brand/wantan-logo.svg`（使用者提供的原稿），左上角放在米色圓底上，深色段也看得清楚；樣式在兩份 core.css 的 `.logo`。

### 預覽與輸出

```
npm install                                   # 安裝 gsap（第一次）
# 用瀏覽器直接開 intro.html，加上參數：
#   ?scene=05&hud   循環播放第 05 幕，左下角顯示幕號、時間、旁白
#   ?t=12.3         停在 12.3 秒
#   ?play           從頭播放
PAGE=intro.html node render.mjs stills 5 20 40      # 指定秒數的靜態圖
PAGE=intro.html node render.mjs video intro.mp4 30  # 輸出影片（需 Playwright + ffmpeg）
node build-srt.mjs > ../../video/intro-0000-0045.srt
node build-srt.mjs --table                          # 列出每一幕
```

字型需先安裝：Noto Sans TC、Space Mono、Bricolage Grotesque（Google Fonts）。

## 0:45–2:40：一幕一個檔案

寫法與 0:00–0:45 相同，共用 `intro/engine.js`；`part2.html` 在載入各幕前設定 `Intro.start = 45`、`Intro.duration = 160`。
開頭墊的 `intro-last.png` 是 `intro.html` 停在 45 秒的畫面（`PAGE=intro.html node render.mjs stills 45`）。

```
part2.html              組合頁：圖層（深色段 S3、米色段 S4）
part2/core.css          共用樣式
part2/scenes/NN-*.js    幕 15–26
```

| 幕 | 時間 | 內容 |
|---|---|---|
| 15 | 45.0–49.4 | 轉入深色段：AAHA 關節照護指引、狗的一生時間軸 |
| 16 | 49.4–54.0 | 幼犬期埋下基礎 |
| 17 | 54.0–61.6 | 只留幼犬，徵兆太輕微：玩過頭？扭到？ |
| 18 | 61.6–67.8 | COAST 犬骨關節炎分期工具、四個階梯 |
| 19 | 67.8–76.7 | 四個階段上色 |
| 20 | 76.7–87.6 | 從年輕成犬追蹤，不是看年齡 |
| 21 | 87.6–98.7 | 不是看年齡，而是看有沒有風險因子 |
| 22 | 98.7–108.1 | 第一步：我的狗有風險因子嗎？ |
| 23 | 108.1–118.9 | 五類風險因子 01–03 |
| 24 | 118.9–128.7 | 五類風險因子 04–05 |
| 25 | 128.7–142.4 | 基礎預防組（0 項） |
| 26 | 142.4–160.0 | 加強留意組（≥ 1 項）＋停格 |

```
PAGE=part2.html node render.mjs video part2.mp4 30   # 輸出 0:45–2:40
part2.html?scene=20&hud                               # 預覽單一幕
```
