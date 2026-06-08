# Fix syntax errors in gen_w16_w17.py
fp = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly\gen_w16_w17.py"
with open(fp, "r", encoding="utf-8") as f:
    c = f.read()

# Fix o= to o(
c = c.replace('o=\u201cColegios.\u201d,False,\u201cPublicas.\u201d]', 'o(\u201cColegios.\u201d,False,\u201cPublicas.\u201d)]')
c = c.replace('o=\u201cImpuestos locales.\u201d,False=\u201cNacionales.\u201d]', 'o(\u201cImpuestos locales.\u201d,False,\u201cNacionales.\u201d)]')

# Fix True= to True, in various spots
for rep in [
    ('True=\u201cLOT.\u201d','True,\u201cLOT.\u201d'),
    ('True=\u201cPresidente.\u201d','True,\u201cPresidente.\u201d'),
    ('True=\u201cMinistros.\u201d','True,\u201cMinistros.\u201d'),
    ('True=\u201cMunicipal.\u201d','True,\u201cMunicipal.\u201d'),
    ('True=\u201cConcejo.\u201d','True,\u201cConcejo.\u201d'),
    ('True=\u201cDep.\u201d','True,\u201cDep.\u201d'),
    ('True=\u201cAsamblea.\u201d','True,\u201cAsamblea.\u201d'),
    ('True=\u201cAutonomia.\u201d','True,\u201cAutonomia.\u201d'),
    ('True=\u201cCorregimiento.\u201d','True,\u201cCorregimiento.\u201d'),
    ('True=\u201cCercanas.\u201d','True,\u201cCercanas.\u201d'),
    ('True=\u201cParticipacion.\u201d','True,\u201cParticipacion.\u201d'),
    ('False=\u201cTransferencias.\u201d','False,\u201cTransferencias.\u201d'),
    ('False=\u201cNacionales.\u201d','False,\u201cNacionales.\u201d'),
    ('False=\u201cRecursos.\u201d','False,\u201cRecursos.\u201d'),
    ('True=\u201cProyecto local.\u201d','True,\u201cProyecto local.\u201d'),
    ('o=\u201cColegios.\u201d,False,\u201cPublicas.\u201d', 'o(\u201cColegios.\u201d,False,\u201cPublicas.\u201d'),
    ('o=\u201cImpuestos locales.\u201d,False,\u201cNacionales.\u201d', 'o(\u201cImpuestos locales.\u201d,False,\u201cNacionales.\u201d'),
    ('o=\u201cPrestamos bancarios.\u201d,False,\u201cNo.\u201d', 'o(\u201cPrestamos bancarios.\u201d,False,\u201cNo.\u201d'),
    ('o=\u201cDonaciones.\u201d,False,\u201cRecursos.\u201d', 'o(\u201cDonaciones.\u201d,False,\u201cRecursos.\u201d'),
    ('True=\u201cFiscal.\u201d', 'True,\u201cFiscal.\u201d'),
    ('False=\u201cCentralizar.\u201d', 'False,\u201cCentralizar.\u201d'),
    ('False=\u201cNo.\u201d', 'False,\u201cNo.\u201d'),
    ('True=\u201cDesafio.\u201d', 'True,\u201cDesafio.\u201d'),
    ('False=\u201cCentralizar.\u201d', 'False,\u201cCentralizar.\u201d'),
]:
    c = c.replace(rep[0], rep[1])

with open(fp, "w", encoding="utf-8") as f:
    f.write(c)
print("Fix script applied")
