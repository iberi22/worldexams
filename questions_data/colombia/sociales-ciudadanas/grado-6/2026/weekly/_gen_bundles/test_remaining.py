import os
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py", "gen_q28_37.py", "gen_q38_40.py"]:
    fpath = os.path.join(d, fn)
    try:
        ns = {}
        exec(open(fpath, encoding="utf-8").read(), ns)
        wk = sorted(ns["ALL"])
        print(f"{fn}: OK, {len(wk)} weeks")
        for w in wk:
            print(f"  W{w}: {len(ns['ALL'][w])} questions")
    except Exception as e:
        print(f"{fn}: ERROR - {e}")
