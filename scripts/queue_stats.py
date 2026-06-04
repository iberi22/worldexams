#!/usr/bin/env python3
import json
from collections import Counter
with open('.worldexams/generation/queue.json', 'r', encoding='utf-8') as f:
    q = json.load(f)
tasks = q['tasks']
print(f'Total tasks: {len(tasks)}')
completed = [t for t in tasks if t['status'] == 'completed']
failed = [t for t in tasks if t['status'] == 'failed']
print(f'Completed: {len(completed)}')
print(f'Failed: {len(failed)}')
paises = Counter(t.get('country','unknown') for t in tasks)
print(f'\nBy country:')
for p, c in sorted(paises.items()):
    print(f'  {p}: {c}')
