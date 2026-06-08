# Fix W40 syntax errors
fp = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly\gen_w37_w40.py"
with open(fp, "r", encoding="utf-8") as f:
    c = f.read()

# Fix the o= tuple error on line ~101
old = 'o(\u201cLa independencia.\u201d,False,\u201c1810.\u201d),o(\u201cLa batalla de Boyaca.\u201d,False,\u201c1819.\u201d),o=\u201cLa fundacion de Bogota.\u201d,False,\u201c1538.\u201d]\"'
new = 'o(\u201cLa independencia.\u201d,False,\u201c1810.\u201d),o(\u201cLa batalla de Boyaca.\u201d,False,\u201c1819.\u201d),o(\u201cLa fundacion de Bogota.\u201d,False,\u201c1538.\u201d)]'
# Actually the file has regular quotes
c = c.replace('o=\u201cLa fundacion de Bogota.\u201d,False,\u201c1538.\u201d]\"', 'o(\u201cLa fundacion de Bogota.\u201d,False,\u201c1538.\u201d)]')

# Also fix remaining True= and False= that might be there
# Actually the previous fix replaced all already

with open(fp, "w", encoding="utf-8") as f:
    f.write(c)
print("Fix applied")
