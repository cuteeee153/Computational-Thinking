# 幕 44 真實畫面：依 assets/footage/footage.json 把拍攝者的片段剪接成 1920×1080、30fps、無聲的 41.5 秒影片。
# 用法：python3 build-footage.py <輸出.mp4>
# 直拍（9:16）：中間放原畫面（高 1080），兩側用同一段畫面放大、模糊、壓暗填滿；橫拍：直接鋪滿。
# （原檔很大，assets/footage/source/ 不進 git；剪好的成品 assets/footage/footage.mp4 會進 git）
import json, os, subprocess, sys
here = os.path.dirname(os.path.abspath(__file__))
d = json.load(open(f'{here}/assets/footage/footage.json'))
out = sys.argv[1]
ins, fl = [], []
for i, (f, a, n, _) in enumerate(d['clips']):
    ins += ['-ss', str(a), '-t', str(n), '-i', f'{here}/assets/footage/source/{f}']
    fl.append(f'[{i}:v]fps=30,setpts=PTS-STARTPTS,split[f{i}][g{i}];'
              f'[g{i}]scale=1920:1080:force_original_aspect_ratio=increase,crop=1920:1080,boxblur=40:2,eq=brightness=-0.12:saturation=0.85[b{i}];'
              f'[f{i}]scale=-2:1080[s{i}];[b{i}][s{i}]overlay=(W-w)/2:0,trim=duration={n},setpts=PTS-STARTPTS,setsar=1[v{i}]')
k = len(d['clips'])
fc = ';'.join(fl) + ';' + ''.join(f'[v{i}]' for i in range(k)) + f'concat=n={k}:v=1:a=0,trim=duration={d["length"]},format=yuv420p[o]'
subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', *ins, '-filter_complex', fc, '-map', '[o]', '-r', '30',
                '-c:v', 'libx264', '-crf', '23', '-preset', 'slow', '-movflags', '+faststart', out], check=True)
print(f'真實畫面：{len(d["clips"])} 段 → {out}（{sum(c[2] for c in d["clips"]):.2f} 秒，取 {d["length"]} 秒）')
