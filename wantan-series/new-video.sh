#!/usr/bin/env bash
# 開一支新影片：從 template/ 複製一份到 videos/<代號>/，再跑 setup.sh。
# 用法：./new-video.sh <英文代號，例如 dog-dental> "影片標題" [風格：classic 經典米色（預設）／fresh 清新亮色]
set -euo pipefail
cd "$(dirname "$0")"
[ $# -ge 2 ] || { sed -n '2,3p' "$0"; exit 1; }
D=videos/$1
[ -e "$D" ] && { echo "$D 已經存在"; exit 1; }
STYLE=${3:-classic}
[ -f "template/themes/$STYLE.css" ] || { echo "沒有這個風格：$STYLE（可用：$(ls template/themes | sed 's/\.css//' | tr '\n' ' ')）"; exit 1; }
mkdir -p videos
cp -r template "$D" && rm -rf "$D"/{node_modules,out,timing,board,narration/work}
python3 - "$D/script.json" "$2" "$STYLE" <<'P'
import json, sys
p, title, style = sys.argv[1], sys.argv[2], sys.argv[3]
d = json.load(open(p, encoding='utf-8')); d['title'] = title; d['style'] = style
json.dump(d, open(p, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
P
"$D/setup.sh"
echo "新影片：$D（script.json 和 scenes/ 目前是示範內容，依逐字稿改寫）"
