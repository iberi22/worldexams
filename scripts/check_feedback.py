#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Check and fix feedback in MAT G6 W04"""
import sys
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

f = 'E:/scripts-python/worldexams/questions_data/colombia/matematicas/grado-6/2026/weekly/CO-MAT-6-2026-W04-fracciones-representacion-001-MASTERY-bundle.md'
content = open(f, encoding='utf-8', errors='replace').read()

# Find byte at position 5260
print(f'File size: {len(content)} chars')
print(f'Char at 5260: {repr(content[5260:5270])}')

parts = content.split('## Pregunta ')
header = parts[0]
qs = parts[1:]

for i, q in enumerate(qs[:6], 1):
    lines = q.split('\n')
    opts = [l for l in lines if l.strip().startswith('-') and '[' in l]
    fbs = [l for l in lines if 'feedback:' in l]
    print(f'\nQ{i}: {len(fbs)} feedbacks for {len(opts)} options')
    for l in opts:
        fb = '<!-- feedback:' in l
        print(f'  {"[FB]" if fb else "[NO]"} {l.strip()[:90]}')
