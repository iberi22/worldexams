"""Fix q() calls that are missing the last arg (e). The def q(b,s,o,t,e) needs 5 args."""
import os, re

d = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly\_gen_bundles"

for fn in ["gen_q13_18.py", "gen_q19_27.py", "gen_q28_37.py", "gen_q38_40.py"]:
    fpath = os.path.join(d, fn)
    if not os.path.exists(fpath):
        print(f"{fn}: not found")
        continue
    
    content = open(fpath, encoding="utf-8").read()
    
    # Remove BOM if present
    if content.startswith('\ufeff'):
        content = content[1:]
        print(f"{fn}: BOM removed")
    
    # Build complete file by tracking q() calls across lines
    # Strategy: find each ALL[N]=[ ... ] block, find q( calls, fix them
    
    lines = content.split('\n')
    new_lines = []
    changes = 0
    
    i = 0
    while i < len(lines):
        line = lines[i]
        
        # Check if line contains start of a q() call (possibly multi-line)
        stripped_line = line.strip()
        
        if stripped_line.startswith('q('):
            # Collect all lines of this q() call
            call_lines = [line]
            depth = line.count('(') - line.count(')')
            j = i + 1
            while j < len(lines) and depth > 0:
                call_lines.append(lines[j])
                depth += lines[j].count('(') - lines[j].count(')')
                j += 1
            
            full_call = '\n'.join(call_lines)
            
            # Count the number of top-level comma-separated arguments
            # A q() call has q(arg1, arg2, ...)
            # We need to find the top-level commas
            
            # Strategy: find the text between q( and the final )
            call_text = full_call[full_call.index('(')+1:]
            # Remove trailing ) - find the matching close
            paren_depth = 0
            last_close = -1
            for idx, ch in enumerate(call_text):
                if ch == '(':
                    paren_depth += 1
                elif ch == ')':
                    if paren_depth == 0:
                        last_close = idx
                        break
                    paren_depth -= 1
            
            if last_close > 0:
                args_text = call_text[:last_close]
            else:
                args_text = call_text
            
            # Count top-level commas
            top_comma_count = 0
            paren_depth = 0
            bracket_depth = 0
            in_string = False
            string_char = None
            
            for ch in args_text:
                if in_string:
                    if ch == '\\':
                        continue  # skip next char
                    if ch == string_char:
                        in_string = False
                    continue
                
                if ch == '"' or ch == "'":
                    in_string = True
                    string_char = ch
                    continue
                
                if ch == '(':
                    paren_depth += 1
                elif ch == ')':
                    paren_depth -= 1
                elif ch == '[':
                    bracket_depth += 1
                elif ch == ']':
                    bracket_depth -= 1
                elif ch == ',' and paren_depth == 0 and bracket_depth == 0:
                    top_comma_count += 1
            
            num_args = top_comma_count + 1
            
            if num_args == 4:
                # Missing the 5th arg (explanation)
                # Find the correct letter (4th arg) and use it
                # Add "A explicar" as generic explanation
                # Find the text before the closing )
                # Add a generic explanation arg
                
                # Find the closing ) of the q() call
                # We're working with last_close relative to call_text
                # The full call ends with: ) or ), 
                # Add ,"Explicacion: respuesta {{LETTER}}"
                
                # Find the correct letter (last quoted argument)
                # It should be "A", "B", "C", or "D"
                correct_letter = "B"  # default
                
                # Search for quoted letter near the end
                m = re.search(r'"([A-D])"\s*$', args_text)
                if m:
                    correct_letter = m.group(1)
                
                # Add explanation
                expl = f"Explicacion complementaria: la respuesta correcta es {correct_letter}."
                
                # Rebuild: replace the exact end
                # The last character of args_text is the closing space after "B"
                new_full = full_call.rstrip()
                if new_full.endswith('),'):
                    new_full = new_full[:-2] + ',"' + expl + '"),'
                elif new_full.endswith(')'):
                    new_full = new_full[:-1] + ',"' + expl + '")'
                
                new_lines.append(new_full)
                changes += 1
                
                # Update i to skip all consumed lines
                consumed = len(call_lines)
                i += consumed
                continue
        
        new_lines.append(line)
        i += 1
    
    if changes > 0:
        new_content = '\n'.join(new_lines)
        with open(fpath, 'w', encoding='utf-8') as fw:
            fw.write(new_content)
        print(f"{fn}: Fixed {changes} q() calls")
    else:
        print(f"{fn}: No 4-arg q() calls found")

print("Done")
