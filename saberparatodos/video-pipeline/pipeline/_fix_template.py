# Fix template: guard against null audioSrc
with open(r'E:\scripts-python\worldexams\saberparatodos\video-pipeline\remotion\src\vertical-math-template.tsx') as f:
    c = f.read()

old = '{audioSrc && <Audio src={staticFile(audioSrc)} />}'
new = '{audioSrc && audioSrc !== "null" && <Audio src={staticFile(audioSrc)} />}'

if old in c:
    c = c.replace(old, new)
    with open(r'E:\scripts-python\worldexams\saberparatodos\video-pipeline\remotion\src\vertical-math-template.tsx', 'w') as f:
        f.write(c)
    print('Fixed: audioSrc guard added')
else:
    print('Pattern not found — checking...')
    idx = c.find('audioSrc')
    if idx >= 0:
        print(c[idx:idx+100])
