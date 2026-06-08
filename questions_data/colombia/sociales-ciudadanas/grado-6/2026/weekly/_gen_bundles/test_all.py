import os
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in sorted(os.listdir(d)):
    if not fn.startswith("gen_q") or not fn.endswith(".py"):
        continue
    fpath = os.path.join(d, fn)
    try:
        ns = {}
        exec(open(fpath, encoding="utf-8").read(), ns)
        wk = sorted(ns.get("ALL", {}))
        print(f"{fn}: OK, weeks={wk}")
    except Exception as e:
        print(f"{fn}: ERROR - {e}")
