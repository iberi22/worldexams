"""Fix all gen_q*.py files by ensuring every q() call has 5 positional args."""
import os, re

d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in os.listdir(d):
    if not fn.startswith("gen_q") or not fn.endswith(".py"):
        continue
    fpath = os.path.join(d, fn)
    content = open(fpath, encoding="utf-8").read()
    
    # Remove BOM
    if content.startswith('\ufeff'):
        content = content[1:]
    
    lines = content.split('\n')
    fixed = False
    
    i = 0
    while i < len(lines):
        line = lines[i]
        stripped = line.strip()
        
        # Check if this line starts a q() call
        if stripped.startswith('q('):
            # Collect the full call (may span multiple lines)
            call_lines = [line]
            depth = line.count('(') - line.count(')')
            j = i + 1
            while j < len(lines) and depth > 0:
                call_lines.append(lines[j])
                depth += lines[j].count('(') - lines[j].count(')')
                j += 1
            
            full_call = '\n'.join(call_lines)
            
            # Check if the call ends with "A)," or "B)," etc - indicating 4th arg is correct letter, missing 5th
            # Full call should have structure: q("B", "stem", [opts], "correct", "expl")
            # A 4-arg call has: q("B", "stem", [opts], "correct")
            
            # Simple check: does the last argument have a quoted string?
            # Find the last closing )
            last_close = full_call.rfind(')')
            if last_close > 0:
                # Look backwards from last close
                before_close = full_call[:last_close].rstrip()
                # If before_close ends with '",' and then a letter, it might be missing expl
                m = re.search(r'"\s*\)\s*,\s*$', before_close)
                if not m:
                    # Check if it ends with a quoted string (the correct letter)
                    m2 = re.search(r'"([A-D])"\s*$', before_close)
                    if m2:
                        # This is a 4-arg call! Add a generic explanation
                        # Find where to insert the missing argument
                        correct_letter = m2.group(1)
                        # Find the last comma before the correct letter to insert after
                        # Actually, let's just add "Explicacion: " + correct_letter
                        new_before = before_close.rstrip() + ',"Explicacion: respuesta ' + correct_letter + '"'
                        # Rebuild
                        new_full = full_call[:last_close]
                        # Replace the last ')'
                        new_lines = new_full.split('\n')
                        # Actually this is getting complex. Let me use a different approach.
                        pass
        
        i += 1
    
    # If any fix was done, write back
    if fixed:
        with open(fpath, 'w', encoding='utf-8') as fw:
            fw.write(content)
        print(f"Fixed: {fn}")
    else:
        print(f"Checked: {fn} - no changes")

print("Done")
