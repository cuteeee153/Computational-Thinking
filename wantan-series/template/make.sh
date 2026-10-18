#!/usr/bin/env bash
# 汪探系列：一個指令跑一個步驟（在這個資料夾裡執行）。
#   ./make.sh timing            依 script.json（和錄音對時結果）重算時間
#   ./make.sh align             對時 narration/rec/ 的錄音 → 重算時間
#   ./make.sh video             輸出整支影片：out/video.mp4（1080p）、out/video.srt、out/preview-720p*.mp4（給手機看，每段 <30MB）、out/stems/
#   ./make.sh board "說明"       用 out/video.mp4 產生分鏡板資料夾 board/（之後用 Artifact 發布 board/index.html）
#   ./make.sh stills 12.3 40    指定秒數的截圖 → out/still-*.png（檢查用）
set -euo pipefail
cd "$(dirname "$0")"
O=out; mkdir -p $O/work $O/stems
case "${1:-}" in
timing) node build-timing.mjs ;;
align) python3 narration/align.py && node build-timing.mjs ;;
stills) shift; node build-timing.mjs > /dev/null; node render.mjs stills $O "$@" ;;
board) node build-storyboard.mjs $O/video.mp4 board "${2:-}" ;;
video)
  node build-timing.mjs
  # 真實畫面：新環境裡逐格圖片不在 git，從剪好的影片重新拆
  for m in assets/footage/*.mp4; do [ -e "$m" ] || continue; id=$(basename "$m" .mp4); [ -f "assets/footage/$id/meta.json" ] || { python3 build-footage.py --frames; node build-timing.mjs > /dev/null; break; }; done
  read START TOTAL B BF < <(node -e "const t=require('./timing/timing.json');console.log(t.start,t.total,t.bumper?.length||0,t.bumper?.file||'')")
  # 動畫：分 3 段同時輸出，再接起來
  N=3; pids=()
  for k in $(seq 0 $((N-1))); do
    T0=$(python3 -c "s,t=$START,$TOTAL;f=round((t-s)*30);print(s+round(f*$k/$N)/30)"); T1=$(python3 -c "s,t=$START,$TOTAL;f=round((t-s)*30);print(s+round(f*($k+1)/$N)/30)")
    T0=$T0 T1=$T1 node render.mjs video $O/work/anim-$k.mp4 30 & pids+=($!)
  done
  for p in "${pids[@]}"; do wait $p; done
  # 片頭（品牌動畫＋兩聲狗吠，狗吠在片頭音效收尾時）
  python3 build-bark.py $O/work/bark.wav
  ffmpeg -y -loglevel error -i "$BF" -t $B -an -vf fps=30,scale=1920:1080,format=yuv420p -c:v libx264 -crf 16 -preset slow $O/work/bumper.mp4
  ffmpeg -y -loglevel error -i "$BF" -i $O/work/bark.wav -filter_complex "[0:a]atrim=0:$B,aresample=48000,aformat=channel_layouts=stereo[a];[1]volume=0.55,adelay=delays=$(python3 -c "print(round(($B-0.35)*1000))"):all=1[b];[a][b]amix=inputs=2:normalize=0:duration=longest" -t $B -ar 48000 -ac 2 -c:a pcm_s16le $O/work/bumper.wav
  printf "file 'bumper.mp4'\nfile 'anim-0.mp4'\nfile 'anim-1.mp4'\nfile 'anim-2.mp4'\n" > $O/work/list.txt
  ffmpeg -y -loglevel error -f concat -safe 0 -i $O/work/list.txt -c copy $O/work/silent.mp4
  # 聲音：旁白、背景音樂、音效、片頭
  python3 narration/build-narration.py $O/stems/narration.wav
  node build-music.mjs $O/stems/music.wav
  node build-sfx.mjs $O/stems/sfx.wav
  ffmpeg -y -loglevel error -i $O/stems/narration.wav -i $O/stems/music.wav -i $O/stems/sfx.wav -i $O/work/bumper.wav -filter_complex \
    "[0]volume=1.12[n];[2]volume=0.65[s];[n][1][s][3]amix=inputs=4:normalize=0:duration=longest,alimiter=limit=0.89" -t $TOTAL -c:a pcm_s16le $O/work/mix.wav
  ffmpeg -y -loglevel error -i $O/work/silent.mp4 -i $O/work/mix.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -movflags +faststart -shortest $O/video.mp4
  node -e "const t=require('./timing/timing.json');const f=s=>{const h=Math.floor(s/3600),m=Math.floor(s%3600/60),x=(s%60).toFixed(3).padStart(6,'0').replace('.',',');return String(h).padStart(2,'0')+':'+String(m).padStart(2,'0')+':'+x};console.log(t.captions.map((c,i)=>(i+1)+'\n'+f(c[0])+' --> '+f(c[1])+'\n'+c[2]+'\n').join('\n'))" > $O/video.srt
  for k in narration music sfx; do ffmpeg -y -loglevel error -i $O/stems/$k.wav -c:a flac $O/stems/$k.flac; rm $O/stems/$k.wav; done
  # 手機預覽：720p，每段最長 8 分鐘、各控制在 28MB 以內（太長就分段：preview-720p-1.mp4、-2.mp4…）
  rm -f $O/preview-720p*.mp4
  NP=$(python3 -c "import math;print(max(1,math.ceil($TOTAL/480)))")
  for k in $(seq 1 $NP); do
    A=$(python3 -c "print($TOTAL*($k-1)/$NP)"); L=$(python3 -c "print($TOTAL/$NP)")
    KB=$(python3 -c "print(max(250,min(2500,int(28*8*1024/$L-110))))")
    F=$O/preview-720p.mp4; [ $NP -gt 1 ] && F=$O/preview-720p-$k.mp4
    ffmpeg -y -loglevel error -ss $A -t $L -i $O/video.mp4 -vf scale=1280:720 -c:v libx264 -b:v ${KB}k -preset slow -pass 1 -passlogfile $O/work/p2 -an -f mp4 /dev/null
    ffmpeg -y -loglevel error -ss $A -t $L -i $O/video.mp4 -vf scale=1280:720 -c:v libx264 -b:v ${KB}k -preset slow -pass 2 -passlogfile $O/work/p2 -c:a aac -b:a 96k -movflags +faststart $F
  done
  echo "完成：$O/video.mp4（$(ffprobe -v error -show_entries format=duration -of csv=p=0 $O/video.mp4) 秒）、預覽 $(du -ch $O/preview-720p*.mp4 | tail -1 | cut -f1)（$NP 段）" ;;
*) sed -n '2,8p' "$0"; exit 1 ;;
esac
