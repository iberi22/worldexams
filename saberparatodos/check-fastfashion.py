import json, sys

with open(sys.argv[1], 'r', encoding='utf-8') as f:
    d = json.load(f)

# Find v6 in global-issues
for q in d['questions']:
    if 'global-issues-001' in q.get('id','') and q.get('id','').endswith('v6'):
        print(f"ID: {q['id']}")
        print(f"context_len: {len(q.get('context',''))}")
        print(f"text field length: '{len(q.get('text',''))}'")
        print(f"statement: '{q.get('statement','')[:80]}'")
        print(f"Keys: {[k for k in q.keys() if k != 'options']}")
        break
else:
    print("v6 not found")
