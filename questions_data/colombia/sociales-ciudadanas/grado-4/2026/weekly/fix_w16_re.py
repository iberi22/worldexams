import re
fp = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly\gen_w16_w17.py"
with open(fp, "r", encoding="utf-8") as f:
    c = f.read()

# Fix o="..." patterns
# o="Text",False,"Text" -> o("Text",False,"Text")
# o="Text",True,"Text" -> o("Text",True,"Text")
c = re.sub(r'o=("(?:[^"]|\\")*"),(True|False),("(?:[^"]|\\")*")', r'o(\1,\2,\3)', c)

# Also fix True="X" in other positions  
c = re.sub(r'(True)=(u?["\u201c\u201d][^"\u201d]*["\u201d])', r'\1,\2', c)
c = re.sub(r'(False)=(u?["\u201c\u201d][^"\u201d]*["\u201d])', r'\1,\2', c)

with open(fp, "w", encoding="utf-8") as f:
    f.write(c)
print("Fixed regex")
