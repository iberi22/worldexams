"""Test calculateMetadata with variable duration"""
import json, subprocess, time, os
from pathlib import Path

REMOTION_DIR = Path(r'E:\scripts-python\worldexams\saberparatodos\video-pipeline\remotion')
OUT = REMOTION_DIR / 'out'

# Create test props with 1110 frames (37s)
props = {
    'id': 'qa-test3',
    'title': 'Test duracion 37s',
    'topic': 'QA',
    'steps': [{'label': 'Paso 1', 'math': 'x=5', 'explanation': 'Breve'}],
    'timecodes': [90],
    'duration': 1110,
    'audioSrc': None,
}

props_file = OUT / 'qa-test3-props.json'
with open(props_file, 'w', encoding='utf-8') as f:
    json.dump(props, f, ensure_ascii=False)

out_file = str(OUT / 'qa-test3-duration.mp4')

cmd = [
    'npx.cmd', 'remotion', 'render',
    str(REMOTION_DIR / 'index.tsx'),
    'VerticalMathTemplate',
    out_file,
    '--props', str(props_file),
    '--log', 'error',
]

print('Testing calculateMetadata with 1110 frames (37s)...')
start = time.time()
r = subprocess.run(cmd, capture_output=True, text=True, timeout=300, cwd=str(REMOTION_DIR))
elapsed = time.time() - start
print(f'rc: {r.returncode}, elapsed: {elapsed:.1f}s')

if r.returncode != 0:
    err = r.stderr
    # Find error message
    for line in err.split('\n'):
        clean = line.replace('[31m', '').replace('[39m', '').replace('[41m', '').replace('[49m', '').replace('[37m', '').strip()
        if 'Error' in clean or 'error' in clean.lower():
            print('ERROR:', clean[:200])
            break
    else:
        print('stderr tail:', err[-300:])
else:
    if os.path.exists(out_file):
        size = os.path.getsize(out_file) / 1024
        ffprobe = r'C:\ffmpeg-2026-04-01-git-eedf8f0165-full_build\bin\ffprobe.exe'
        r2 = subprocess.run([ffprobe, '-v', 'quiet', '-show_entries', 'format=duration', '-of', 'csv=p=0', out_file],
            capture_output=True, text=True, timeout=15)
        dur = float(r2.stdout.strip()) if r2.stdout.strip() else 0
        print(f'File: {size:.0f} KB, Duration: {dur:.1f}s')
        if dur > 30:
            print('✅ SUCCESS — calculateMetadata working!')
        else:
            print('❌ Duration too short')
    else:
        print('❌ Output file not found')
