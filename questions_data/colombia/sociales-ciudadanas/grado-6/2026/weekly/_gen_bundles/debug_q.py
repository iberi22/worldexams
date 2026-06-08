import os, traceback, sys

# Rename gen_q13_18.py's q function to something else to avoid conflict
# Actually let me just build the full dict step by step

d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

# Load gen_q08_12.py first
ns08 = {}
exec(open(os.path.join(d, "gen_q08_12.py"), encoding="utf-8").read(), ns08)

# Then gen_q13_18.py using its own q function
ns13 = {}
# Extract the q function from ns08 (it's the same signature)
# Actually gen_q13_18.py defines its own q(), so let them conflict
try:
    exec(open(os.path.join(d, "gen_q13_18.py"), encoding="utf-8").read(), ns13)
except TypeError as e:
    print(f"gen_q13_18.py error: {e}")
    traceback.print_exc()
    # Find the failing line
    import ast, inspect
    source = open(os.path.join(d, "gen_q13_18.py"), encoding="utf-8").read()
    lines = source.split('\n')
    for i, line in enumerate(lines):
        print(f"  {i+1}: {line[:120]}")
