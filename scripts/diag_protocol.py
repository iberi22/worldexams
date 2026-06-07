#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Quick diagnose protocol versions across all bundles"""
import os, sys, re, glob
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

os.chdir('E:/scripts-python/worldexams')
files = sorted(glob.glob('questions_data/colombia/*/grado-*/2026/weekly/*MASTERY-bundle.md', recursive=True))

v5_1 = []
v5_2 = []
unknown = []

for f in files:
    content = open(f, encoding='utf-8', errors='replace').read()
    content = content.lstrip('\ufeff')
    m = re.search(r'protocol_version:\s*["\']?([\d.]+)', content)
    v = m.group(1) if m else 'N/A'
    base = os.path.basename(f)
    if v == '5.1':
        v5_1.append(base)
    elif v == '5.2':
        v5_2.append(base)
    else:
        unknown.append((base, v))

print(f'Total: {len(files)}')
print(f'v5.2: {len(v5_2)}')
print(f'v5.1 (need upgrade): {len(v5_1)}')
print(f'Unknown: {len(unknown)}')
if v5_1:
    print('\nv5.1 files:')
    for f in v5_1:
        print(f'  {f}')
if unknown:
    print('\nUnknown:')
    for f, v in unknown:
        print(f'  {f}: {v}')
