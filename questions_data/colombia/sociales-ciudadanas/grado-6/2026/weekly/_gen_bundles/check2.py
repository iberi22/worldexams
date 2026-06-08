import os, glob, traceback
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"
for fn in sorted(glob.glob(os.path.join(d, "gen_q1*.py"))):
    try:
        ns = {}
        exec(open(fn, encoding="utf-8").read(), ns)
        print(f"{os.path.basename(fn)}: OK")
    except Exception as e:
        print(f"{os.path.basename(fn)}: ERROR - {e}")
