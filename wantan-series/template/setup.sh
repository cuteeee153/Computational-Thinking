#!/usr/bin/env bash
# 新環境第一次使用前跑一次：安裝 gsap、語音辨識（對時用）、字型。
set -euo pipefail
cd "$(dirname "$0")"
npm install --silent
pip install -q sherpa-onnx opencc-python-reimplemented numpy
M=~/asr/sherpa-onnx-paraformer-zh-small-2024-03-09
if [ ! -d "$M" ]; then
  mkdir -p ~/asr
  curl -sSL https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/sherpa-onnx-paraformer-zh-small-2024-03-09.tar.bz2 | tar -xj -C ~/asr
fi
mkdir -p ~/.fonts && cp assets/fonts/*.ttf ~/.fonts/ && fc-cache -f > /dev/null
echo "準備好了"
