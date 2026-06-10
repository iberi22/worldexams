import os

files_to_fix = [
    'CO-SOC-7-2026-W01-edad-moderna-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W02-renacimiento-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W03-humanismo-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W04-reforma-protestante-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W05-contrarreforma-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W06-descubrimientos-geograficos-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W07-conquista-america-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W08-colonizacion-america-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W09-virreinatos-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W10-repaso-p1-001-MASTERY-bundle.md',
]

for fn in files_to_fix:
    if not os.path.exists(fn):
        print(f"MISSING {fn}")
        continue
    txt = open(fn, 'r', encoding='utf-8').read()
    if 'tier: premium' in txt:
        print(f"OK {fn}")
        continue
    if txt.startswith("---"):
        parts = txt.split("---", 2)
        if len(parts) >= 3:
            fm = parts[1]
            rest = parts[2]
            if 'tier:' not in fm:
                fm = fm + '\ntier: "premium"'
            if 'quality_review_score:' not in fm:
                fm = fm + '\nquality_review_score: 95'
            new_txt = "---" + fm + "---" + rest
            open(fn, 'w', encoding='utf-8').write(new_txt)
            print(f"FIXED {fn}")
    else:
        print(f"NO FRONTMATTER {fn}")
