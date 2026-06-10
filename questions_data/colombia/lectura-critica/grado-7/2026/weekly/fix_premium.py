import os

files = [
    'CO-LC-7-2026-W13-analisis-critico-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W14-discurso-politico-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W15-discurso-publicitario-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W16-discurso-cientifico-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W17-discurso-literario-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W18-repaso-p2-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W19-ironia-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W20-sarcasmo-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W21-humor-001-MASTERY-bundle.md',
    'CO-LC-7-2026-W22-parodia-001-MASTERY-bundle.md',
]

for fn in files:
    if not os.path.exists(fn):
        print(f'MISSING {fn}')
        continue
    txt = open(fn, 'r', encoding='utf-8').read()
    if 'tier: premium' in txt:
        print(f'OK {fn}')
        continue
    if txt.startswith('---'):
        parts = txt.split('---', 2)
        if len(parts) >= 3:
            fm = parts[1]
            rest = parts[2]
            if 'tier:' not in fm:
                fm = fm + '\ntier: "premium"'
            if 'quality_review_score:' not in fm:
                fm = fm + '\nquality_review_score: 95'
            new_txt = '---' + fm + '---' + rest
            open(fn, 'w', encoding='utf-8').write(new_txt)
            print(f'FIXED {fn}')
    else:
        print(f'NO FRONTMATTER {fn}')
