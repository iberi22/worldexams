import os, re

d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py", "gen_q19_27.py", "gen_q28_37.py", "gen_q38_40.py"]:
    fpath = os.path.join(d, fn)
    content = open(fpath, encoding="utf-8").read()
    content = content.lstrip('\ufeff')
    lines = content.split('\n')
    
    # Find q() calls that appear complete on a single line
    for i, line in enumerate(lines):
        stripped = line.strip()
        # Match q("Remember"..."call)...   look for q("X",...,["foo"],"X")  - no trailing explanation
        # A 5-arg q() on one line would look like: q("R",...,"X")
        # A 4-arg q() would be: q("R",...,"X") - no extra arg
        
        # Find lines that start with q("...") and count their arguments
        if stripped.startswith('q(') and stripped.endswith('),'):
            # Count commas at top level
            depth = 0
            commas = []
            for j, ch in enumerate(stripped):
                if ch == '(':
                    depth += 1
                elif ch == ')':
                    depth -= 1
                elif ch == ',' and depth == 1:
                    commas.append(j)
            if len(commas) == 3:  # q(arg1, arg2, arg3, correct) - MISSING expl!
                print(f"{fn}:{i+1}: 4-ARG q() call: {stripped[:100]}...")
            elif len(commas) == 4: # q(arg1, arg2, arg3, correct, expl) - OK
                pass
            elif len(commas) == 5: # q(arg1, arg2, arg3, correct, expl) with internal commas
                pass
        
        # Also find multi-line q() calls
        if stripped.startswith('q(') and not stripped.endswith('),'):
            # Multi-line start
            pass
