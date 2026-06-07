import re
from pathlib import Path

lec_dir = Path(r'E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-6\2026\weekly')
dup_dir = lec_dir / '_duplicates'

actions = [
    ('tesis-argumentos', 22, 36, 'Argumentos y Tesis en Textos'),
    ('opinion-persuasion', 23, 37, 'Opinion y Persuasion'),
    ('repaso-p6', 24, None, None),
    ('repaso-p5', 25, None, None),
    ('textos-publicitarios', 26, 38, 'Textos Publicitarios'),
    ('resenas-criticas', 27, 39, 'Resenas Criticas'),
    ('repaso-p7', 28, None, None),
]

for topic, old_week, new_week, new_tema in actions:
    old_file = lec_dir / f'CO-LEC-6-2026-W{old_week:02d}-{topic}-001-MASTERY-bundle.md'
    if not old_file.exists():
        print(f'MISSING: {old_file.name}')
        continue
    if new_week is None:
        new_path = dup_dir / old_file.name
        old_file.rename(new_path)
        print(f'MOVED to _duplicates: {old_file.name}')
    else:
        new_name = f'CO-LEC-6-2026-W{new_week:02d}-{topic}-001-MASTERY-bundle.md'
        new_path = lec_dir / new_name
        content = old_file.read_text(encoding='utf-8')
        content = re.sub(r'periodo: "W\d+"', f'periodo: "W{new_week:02d}"', content)
        content = re.sub(r'periodo: W\d+', f'periodo: W{new_week:02d}', content)
        if new_tema:
            content = re.sub(r'tema: ".+?"', f'tema: "{new_tema}"', content)
        content = re.sub(r'(# .+?)W\d+', r'\1W' + f'{new_week:02d}', content)
        new_path.write_text(content, encoding='utf-8')
        old_file.unlink()
        print(f'RENAMED: W{old_week:02d}-{topic} -> W{new_week:02d}-{topic}')

print('Done!')
