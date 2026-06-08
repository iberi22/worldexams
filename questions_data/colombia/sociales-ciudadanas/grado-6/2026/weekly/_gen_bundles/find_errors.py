import os, traceback
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py", "gen_q19_27.py", "gen_q28_37.py", "gen_q38_40.py"]:
    fpath = os.path.join(d, fn)
    content = open(fpath, encoding="utf-8").read()
    content = content.lstrip('\ufeff')
    try:
        compile(content, fn, 'exec')
        print(f"{fn}: compiles OK")
    except SyntaxError as e:
        print(f"{fn}: SYNTAX ERROR at line {e.lineno}: {e.msg}")
        lines = content.split('\n')
        for i in range(max(0, e.lineno-3), min(len(lines), e.lineno+2)):
            marker = ">>>" if i+1 == e.lineno else "   "
            print(f"  {marker} {i+1}: {lines[i][:120]}")
