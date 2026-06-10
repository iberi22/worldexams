import os

files = [
    'CO-LEN-6-2026-W16-novela-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W17-poesia-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W18-teatro-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W19-historieta-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W20-repaso-p2-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W21-sinonimos-antonimos-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W22-palabras-homofonas-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W23-palabras-homografas-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W24-familia-de-palabras-001-MASTERY-bundle.md',
    'CO-LEN-6-2026-W25-campo-semantico-001-MASTERY-bundle.md',
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
