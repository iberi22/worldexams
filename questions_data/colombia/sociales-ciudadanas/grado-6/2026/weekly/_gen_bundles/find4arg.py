import os, re
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py", "gen_q19_27.py", "gen_q28_37.py", "gen_q38_40.py"]:
    fpath = os.path.join(d, fn)
    content = open(fpath, encoding="utf-8").read()
    content = content.lstrip("\ufeff")
    lines = content.split("\n")
    
    count_4arg = 0
    for i, line in enumerate(lines):
        stripped = line.strip()
        if not stripped.startswith("q("):
            continue
        
        # Check if this is a 4-arg call (missing explanation)
        # A full q call ends: some_text"),"B"),
        # A 4-arg call ends: "B"),
        
        # Find the last ) that closes the call
        # Look for pattern: "..."),"LETTER)"
        m = re.search(r'"\)\s*,\s*"([A-D])"\s*\)\s*,?\s*$', stripped)
        if m and stripped.startswith("q("):
            # This ends with )"LETTER") - might be 4-arg
            # Check if there's no explanation before the correct letter
            count_4arg += 1
            print(f"{fn}:{i+1}: {stripped[:120]}")
    
    if count_4arg == 0:
        print(f"{fn}: no 4-arg q() calls found, checking differently...")
