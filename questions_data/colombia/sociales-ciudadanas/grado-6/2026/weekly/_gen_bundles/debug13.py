import os, traceback
d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py"]:
    fpath = os.path.join(d, fn)
    content = open(fpath, encoding="utf-8").read()
    lines = content.split('\n')
    
    # Try to compile
    try:
        compile(content, fn, 'exec')
        print(f"{fn}: compiles OK")
    except SyntaxError as e:
        print(f"{fn}: SyntaxError line {e.lineno}: {e.msg}")
    
    # Now try to exec with tracing
    try:
        ns = {}
        exec(compile(content, fn, 'exec'), ns)
        wk = sorted(ns["ALL"])
        print(f"Exec OK, weeks={len(wk)}")
    except TypeError as e:
        # Find which q() call has wrong args by looking at line numbers
        tb = traceback.format_exc()
        print(f"TypeError: {e}")
        print(tb)
        
        # Try loading with compile to get line numbers
        code = compile(content, fn, 'exec')
        for line in lines:
            print(line[:100])
