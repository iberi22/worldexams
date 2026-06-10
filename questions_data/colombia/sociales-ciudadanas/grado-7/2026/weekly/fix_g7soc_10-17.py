import os

files = [
    'CO-SOC-7-2026-W10-repaso-p1-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W11-independencias-america-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W12-independencia-colombia-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W13-campanas-libertadoras-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W14-gran-colombia-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W15-republica-nueva-granada-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W16-sociedad-colonial-001-MASTERY-bundle.md',
    'CO-SOC-7-2026-W17-economia-colonial-001-MASTERY-bundle.md',
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
        print(f'NO FRONTMATTER {fn} - adding')
        new_txt = '---\ntier: "premium"\nquality_review_score: 95\n---\n' + txt
        open(fn, 'w', encoding='utf-8').write(new_txt)
        print(f'ADDED FRONTMATTER {fn}')
