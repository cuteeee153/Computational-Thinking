# 動畫原始檔

## 用自然語言修改整支影片（分鏡修改板，0:00–4:05）

分鏡修改板：https://claude.ai/artifact/CDtrVSLQYiUuPH9vPLkDDn

1. 在分鏡板上看每一幕的預覽、畫面清單、動畫清單、字幕。
   字幕可以在每一幕按「改字幕」直接修改（一行一句），上方「字幕匯出」可以下載 txt（只有字幕／含幕號），用的是改過的版本。
2. 在該幕下方用一般的話寫修改需求並送出（可點清單項目帶入「畫面 2」「動畫 3」編號）；不屬於某一幕的寫在「整體修改」。
3. 在對話裡告訴 Claude「分鏡板有新需求」。

Claude 處理流程（給之後的 session）：
- 用 ArtifactData `list` 讀分鏡板資料庫的 `requests` 集合，取 `status: "new"` 的需求（欄位：scene、text、status、reply、createdAt）。
- 「畫面 N／動畫 N」對應該幕檔案（幕 01–14 在 `intro/scenes/`，幕 15–26 在 `part2/scenes/`，幕 27–37 在 `part3/scenes/`）裡 `visuals`／`motions` 陣列的第 N 項；改動畫時同步更新這兩個白話說明。旁白改在 `narration/` 與 `timing/warp.json`（見下方「旁白與字幕」）。
- 字幕修改存在 `subtitles` 集合（文件 id＝幕號；欄位 scene、text（一行一句）、status、updatedAt）。取 `status: "edited"` 的：
  幕 01–26 改 `narration/narration-tts.txt` 與 `scene-map.json`（已錄音的段落要提醒使用者重錄，否則聲音和字幕會對不上）；
  幕 27 起改 `narration/draft-part3.json`。套用後把該筆設成 `status: "applied"`（分鏡板就會改回顯示新的原稿）。
- 需求不清楚時，把該則設成 `status: "question"` 並在 `reply` 寫問題，不要猜。
- 改完：重新輸出有改到的那段影片（改了幕 14 的結尾畫面要同時更新 `intro-last.png` 並重出 0:45–2:40）→ `node build-srt.mjs intro|part2|all` 更新三份 SRT → 串接整支 → `node build-storyboard.mjs <整支影片> <分鏡板資料夾> "<這版改了什麼>"` → 以同一個 URL 重新發佈分鏡板（含 frames/、clips/）→ 把處理過的需求設成 `done`（`doneIn` 填新版本號，`reply` 寫改了什麼）。

## 旁白與字幕（成片時間）

旁白錄音 → 語音辨識逐字對時 → 插入轉場停頓 → 動畫跟著旁白移動 → 字幕顯示在畫面最下方。

```
narration/narration-tts.txt          旁白稿（給 AI 配音用的純文字）
narration/scene-map.json             旁白稿每一段屬於哪一幕（依序拼起來＝旁白稿全文）
narration/audio/elevenlabs-*.mp3     錄好的完整旁白（ElevenLabs）
narration/align.py                   加速 1.5 倍＋離線語音辨識（sherpa-onnx Paraformer 中文）逐字對回旁白稿
                                     → audio/narration-1.5x.wav、audio/timeline.json、audio/recognized.txt（辨識結果）
narration/gaps.json                  在哪些停頓插入幾秒空白（給畫面轉場）
narration/place.py                   插入停頓 → 成片旁白音軌 video/narration-0000-0240.wav、audio/timeline-placed.json
src/video/timing/warp.json           時間對照表：[設計時間, 成片時間]，每個點把一幕的關鍵動作對到旁白念到的字
src/video/build-timing.mjs           產生 timing/narration.json（字幕、各幕旁白）與 timing/timing.js（頁面載入）
```

- 各幕檔案裡的秒數是「設計時間」；引擎排動畫時用 `Intro.W()` 換成「成片時間」，動畫長度不變、只移動開始時間。
  分鏡板、SRT、音效、音樂都用成片時間。
- 換新錄音：
  1. `pip install sherpa-onnx opencc-python-reimplemented`，下載模型（網址見 align.py 開頭）
  2. `python3 ../../narration/align.py <mp3> ../../narration/narration-tts.txt ../../narration/audio --model <模型資料夾>`
     （會印出每一句的時間與對上的字數比例；看 audio/recognized.txt 檢查辨識結果）
  3. 視需要調 `narration/gaps.json`（停頓點取兩句之間）與 `timing/warp.json`（把關鍵動作對到旁白的字）
  4. `node build-timing.mjs` → 重新輸出（`place.py` 產生旁白音軌）
- 字幕：同一行連續短句合併、一則最多 18 字，句尾標點不顯示；樣式在兩份 core.css 的 `#caption`。
- 混音：旁白 ×1.12、背景音樂（旁白時自動降 6 dB）、音效 ×0.65，最後 alimiter。

## 音效

- 每一幕檔案裡的 `sfx: [[秒數, '種類', '說明', { gain, pitch, dur }], ...]`；分鏡板的「音效 N」就是這個陣列的第 N 項。
- `node build-sfx.mjs <輸出.wav>` 依各幕清單合成整支音軌（全部用程式合成，無素材、無授權問題）；`--list` 列出所有音效。
- 種類（定義在 `build-sfx.mjs` 的 `SOUNDS`）：pop／pop-low／pop-card（啵）、slide／whoosh／whoosh-big（咻）、typing（鍵盤）、click、ding／ding-soft（叮）、
  tick／tick-soft（打勾、輕點）、marker（螢光筆）、scribble（劃掉）、draw（鉛筆畫線）、shake（互撞）、fall（掉落）、flip（折角）、boing（狗彈出）、
  bounce（彈跳）、chime（叮鈴）、thud（印章）、note（木琴，用 pitch 調音高）、brush（上色）。
- 輸出：先輸出無聲畫面，再把 `video/sfx-0000-0240.wav` 合進三支 mp4（0:45–2:40 從音軌的 45 秒開始取）。
- 整體音量刻意偏小（峰值約 -5 dB），留空間給之後加的旁白。

## 背景音樂

- `node build-music.mjs <輸出.wav>`：lo-fi 木琴小曲，全部程式合成。段落、和弦、旋律寫在檔案開頭的註解與 `MAJOR`／`MINOR`／`MEL_*`。
- 速度 85.33 BPM（一小節 2.8125 秒），段落切換對齊 0:19.7（加入節奏）、0:45（深色段改小調）、1:38.4（回到大調）。
- 每句旁白（`timing/narration.json` 的字幕時間）出現時自動降約 6 dB；平均音量約 -29 dB，當旁白的墊底。

### 合成聲音、放進影片

```
node build-sfx.mjs ../../video/sfx-0000-0240.wav
node build-music.mjs ../../video/music-0000-0240.wav
ffmpeg -i ../../video/sfx-0000-0240.wav -i ../../video/music-0000-0240.wav \
  -filter_complex "[0][1]amix=inputs=2:normalize=0,alimiter=limit=0.89" mix.wav
# 無聲畫面 + mix.wav → 三支 mp4（0:45–2:40 用 -ss 45 從音軌 45 秒開始取）
```

## 狗

- `assets/dogs/`：使用者提供的黑柴插畫，從 `assets/dogs/source/black-shiba-sheet.jpg` 用 `assets/dogs/cut.py` 去背切出（背景白從邊緣灌水判斷，狗身上的白毛保留）。
- 各幕用 `Intro.dog('#容器', { pose: '…', tilt })` 放狗；pose 對照見 `intro/engine.js`。
- `assets/dogs/source/` 另外兩張是其他犬種的素材，目前沒用到。

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
  mount: [{ into: '#容器', html: `...` }],             // 這一幕新增的版面
  assets() { ... },                                    // 動態填入（狗、圖示）
  init() { gsap.set(...) },                            // 初始狀態
  animate({ tl, L, E, type }) { L('#caret', {...}, 13.0) },  // 動畫，秒數為整支影片的絕對時間
});
```

- 後面的幕可以把內容放進前面幕建立的容器（例如第 02 幕把文章 B 放進第 01 幕的 `#answers`）。
- 旁白與動畫的對時：改 `timing/warp.json`，不用改各幕的秒數。
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

## 2:40–4:05：第二步、第三步（還沒錄音）

寫法相同；`part3.html` 設定 `Intro.start = 160`、`Intro.duration = 245`，開頭墊的 `part2-last.png` 是 `part2.html` 停在 W(160) 的畫面。
這段還沒有旁白錄音、音效和音樂。旁白草稿在 `narration/draft-part3.json`（每幕一段＋開口前停頓），
`build-timing.mjs` 用已錄旁白的語速（每秒約 7.3 字）推算字幕時間（標記為預估），動畫的秒數照這個預估寫。
錄好音之後：把這段併進 `narration-tts.txt`／`scene-map.json` 重新對時，再用 `timing/warp.json` 把動畫對到真正的旁白。

```
part3.html              組合頁：圖層（第二步 S5、第三步 S6）
part3/core.css          這段新增的樣式（其餘沿用 part2/core.css）
part3/scenes/NN-*.js    幕 27–37
```

| 幕 | 時間（設計） | 內容 |
|---|---|---|
| 27 | 160.0–166.3 | 第二步：我的狗狗，有沒有蛛絲馬跡？ |
| 28 | 166.3–171.5 | 五種蛛絲馬跡 01–02 |
| 29 | 171.5–176.4 | 五種蛛絲馬跡 03–05 |
| 30 | 176.4–182.4 | 只出現幾秒鐘，也不代表沒事 |
| 31 | 182.4–189.7 | AAHA 提醒：別自我安慰 |
| 32 | 189.7–200.0 | 沒徵兆留在原分組／有徵兆跳到第三步 |
| 33 | 200.0–203.6 | 第三步：該做的事 |
| 34 | 203.6–212.5 | 無風險因子・無徵兆：基礎保養 |
| 35 | 212.5–224.9 | 有風險因子・無徵兆：提早追蹤 |
| 36 | 224.9–232.8 | 出現任何徵兆：先看獸醫 |
| 37 | 232.8–245.0 | 保健品不是先吃再說＋三步驟回顧、停格 |
