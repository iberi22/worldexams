import os, glob, traceback
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"
for fn in sorted(glob.glob(os.path.join(d, "gen_q*.py"))):
    try:
        ns = {}
        exec(open(fn, encoding="utf-8").read(), ns)
        print(f"{os.path.basename(fn)}: OK")
    except TypeError as e:
        print(f"{os.path.basename(fn)}: ERROR - {e}")
        # Find the line number by parsing again
        with open(fn, encoding="utf-8") as f:
            lines = f.readlines()
            for i, line in enumerate(lines):
                if "line " in str(e):
                    parts = str(e).split("line ")
                    if len(parts) > 1:
                        err_lineno = int(parts[1].split(",")[0])
                        print(f"  Around line {err_lineno}: {lines[err_lineno-1].strip()}")
                        print(f"  Prev: {lines[err_lineno-2].strip()}")
                        print(f"  Next: {lines[err_lineno].strip()}")
