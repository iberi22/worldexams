import os, glob, traceback
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"
# Test gen_q13_18.py
fn = os.path.join(d, "gen_q13_18.py")
try:
    ns = {}
    exec(open(fn, encoding="utf-8").read(), ns)
    all_weeks = ns.get("ALL", {})
    print(f"gen_q13_18.py: OK, {len(all_weeks)} weeks")
    for w in sorted(all_weeks):
        print(f"  W{w}: {len(all_weeks[w])} questions")
except Exception as e:
    print(f"ERROR: {e}")

# Test gen_q19_27.py
fn = os.path.join(d, "gen_q19_27.py")
try:
    ns = {}
    exec(open(fn, encoding="utf-8").read(), ns)
    all_weeks = ns.get("ALL", {})
    print(f"gen_q19_27.py: OK, {len(all_weeks)} weeks")
    for w in sorted(all_weeks):
        print(f"  W{w}: {len(all_weeks[w])} questions")
except Exception as e:
    print(f"ERROR: {e}")

# Test gen_q28_37.py
fn = os.path.join(d, "gen_q28_37.py")
try:
    with open(fn, encoding="utf-8") as f:
        content = f.read()
    # Remove BOM if present
    content = content.lstrip('\ufeff')
    ns = {}
    exec(content, ns)
    all_weeks = ns.get("ALL", {})
    print(f"gen_q28_37.py: OK, {len(all_weeks)} weeks")
    for w in sorted(all_weeks):
        print(f"  W{w}: {len(all_weeks[w])} questions")
except Exception as e:
    print(f"ERROR: {e}")

# Test gen_q38_40.py
fn = os.path.join(d, "gen_q38_40.py")
try:
    ns = {}
    exec(open(fn, encoding="utf-8").read(), ns)
    all_weeks = ns.get("ALL", {})
    print(f"gen_q38_40.py: OK, {len(all_weeks)} weeks")
    for w in sorted(all_weeks):
        print(f"  W{w}: {len(all_weeks[w])} questions")
except Exception as e:
    print(f"ERROR: {e}")
