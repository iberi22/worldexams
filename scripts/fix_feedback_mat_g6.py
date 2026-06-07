#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Fix feedback in MAT G6 W04 - add feedback to Q1-Q5"""
import sys, re
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

f = 'E:/scripts-python/worldexams/questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W04-fracciones-representacion-001-MASTERY-bundle.md'
content = open(f, encoding='utf-8', errors='replace').read()

# Split into question blocks
parts = re.split(r'(## Pregunta \d+ \[D\d+\])', content)
# parts[0] = header, parts[1] = "## Pregunta 1 [D1]", parts[2] = content of Q1...
# Reconstruct properly
result = parts[0]  # header
i = 1
while i < len(parts):
    if parts[i].startswith('## Pregunta'):
        result += parts[i] + '\n'
        i += 1
        if i < len(parts) and not parts[i].startswith('## Pregunta'):
            block = parts[i]
            lines = block.split('\n')
            new_lines = []
            for line in lines:
                if line.strip().startswith('-') and '[' in line and '<!--' not in line:
                    # Add feedback based on content
                    text = line.strip()
                    is_correct = '[x]' in text or '[X]' in text
                    opt_text = re.sub(r'^-\s*\[\s*[ xX]\s*\]\s*', '', text)
                    if is_correct:
                        fb = f' {text} <!-- feedback: Correcto. {opt_text} es la representacion correcta. -->'
                    else:
                        fb = f' {text} <!-- feedback: Incorrecto. {opt_text} no corresponde a la fraccion indicada. -->'
                    new_lines.append(fb)
                else:
                    new_lines.append(line)
            result += '\n'.join(new_lines) + '\n'
        i += 1
    else:
        result += parts[i] + '\n'
        i += 1

open(f, 'w', encoding='utf-8', errors='replace').write(result)
print('Fixed feedback for Q1-Q5')

# Verify
content2 = open(f, encoding='utf-8', errors='replace').read()
q_blocks = re.split(r'## Pregunta \d+', content2)
for idx, qb in enumerate(q_blocks[1:], 1):
    fb_count = qb.count('<!-- feedback:')
    opt_count = len(re.findall(r'^-\s*\[\s*[ xX]\s*\]', qb, re.MULTILINE))
    print(f'Q{idx}: {fb_count} feedbacks for {opt_count} options')
