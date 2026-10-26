# 真實畫面：依 assets/footage/footage.json 把拍攝的片段剪成每一幕要用的影片，再拆成逐格圖片給動畫頁用。
# 用法：python3 build-footage.py            剪接（需要原檔 assets/footage/source/）＋拆格
#       python3 build-footage.py --frames   只從剪好的 assets/footage/<幕號>.mp4 拆格（新環境第一次輸出前跑）
# footage.json：{ "<幕號>": { "orient": "portrait"|"landscape", "clips": [[檔名, 開始秒, 長度, 說明, 裁切中心 cx(可省略)], ...] } }
#   直拍（portrait）：輸出 540×960，放在畫面右邊的影片框；橫拍素材會裁成直式（cx：0 左～1 右，預設 0.5）
#   橫拍（landscape）：輸出 1920×1080（鋪滿畫面，或在幕裡用 CSS 縮成一個框）；直拍素材不要放進橫拍的幕
#   "speed": 0.9 → 整段放慢成 0.9 倍速（素材比旁白短一點時用，不要低於 0.8）
# 原檔很大，source/ 不進 git；剪好的 <幕號>.mp4 進 git，逐格圖片（<幕號>/）不進 git。
import json, os, shutil, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
F = f'{here}/assets/footage'
cfg = json.load(open(f'{F}/footage.json', encoding='utf-8'))
for sid, d in cfg.items():
    if sid.startswith('_'): continue
    land = d.get('orient') == 'landscape'
    W, H = (1920, 1080) if land else (540, 960)
    mp4 = f'{F}/{sid}.mp4'
    if '--frames' not in sys.argv:
        ins, fl = [], []
        for i, c in enumerate(d['clips']):
            f, a, n = c[0], c[1], c[2]; cx = c[4] if len(c) > 4 else .5
            ins += ['-ss', str(a), '-t', str(n), '-i', f'{F}/source/{f}']
            fit = f'scale={W}:{H}:force_original_aspect_ratio=increase,crop={W}:{H}:(iw-{W})*{cx}:(ih-{H})/2'
            fl.append(f'[{i}:v]fps=30,setpts=PTS-STARTPTS,{fit},trim=duration={n},setpts=PTS-STARTPTS,setsar=1[v{i}]')
        k = len(d['clips'])
        sp = d.get('speed', 1)
        fc = ';'.join(fl) + ';' + ''.join(f'[v{i}]' for i in range(k)) + f'concat=n={k}:v=1:a=0,setpts=PTS/{sp},fps=30,format=yuv420p[o]'
        subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', fc, '-map', '[o]', '-r', '30',
                        '-c:v', 'libx264', '-crf', '20', '-preset', 'slow', '-movflags', '+faststart', mp4], check=True)
    out = f'{F}/{sid}'
    shutil.rmtree(out, ignore_errors=True); os.makedirs(out)
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', mp4, '-q:v', '3', f'{out}/f_%05d.jpg'], check=True)
    n = len(os.listdir(out))
    json.dump({'frames': n, 'fps': 30, 'orient': 'landscape' if land else 'portrait'}, open(f'{F}/{sid}/meta.json', 'w'))
    print(f'幕 {sid}：{len(d["clips"])} 段 → {n / 30:.2f} 秒（{n} 格）')
