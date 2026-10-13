# 幕 44 真實畫面：依 assets/footage/footage.json 把拍攝者的片段剪接成直式 540×960、30fps、無聲的 41.5 秒影片（放進畫面右邊的影片框）。
# 用法：python3 build-footage.py <輸出.mp4>
# 直拍（9:16）：直接縮小；橫拍：裁成直式（裁切中心在 footage.json 的 cx，0～1，預設 0.5）。
# （原檔很大，assets/footage/source/ 不進 git；剪好的成品 assets/footage/footage.mp4 會進 git）
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(f'{here}/assets/footage/footage.json'))
out = sys.argv[1]
ins, fl = [], []
for i, (f, a, n, _) in enumerate(d['clips']):
    ins += ['-ss', str(a), '-t', str(n), '-i', f'{here}/assets/footage/source/{f}']
    cx = (d.get('cx') or {}).get(f, .5)
    fit = (f'crop=ih*9/16:ih:(iw-ih*9/16)*{cx}:0,' if f in (d.get('cx') or {}) or f.startswith('clip2') else '') + 'scale=540:960'
    fl.append(f'[{i}:v]fps=30,setpts=PTS-STARTPTS,{fit},trim=duration={n},setpts=PTS-STARTPTS,setsar=1[v{i}]')
k = len(d['clips'])
fc = ';'.join(fl) + ';' + ''.join(f'[v{i}]' for i in range(k)) + f'concat=n={k}:v=1:a=0,trim=duration={d["length"]},format=yuv420p[o]'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', fc, '-map', '[o]', '-r', '30',
                '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-movflags', '+faststart', out], check=True)
print(f'真實畫面：{len(d["clips"])} 段 → {out}（{sum(c[2] for c in d["clips"]):.2f} 秒，取 {d["length"]} 秒）')
