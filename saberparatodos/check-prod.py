import json, sys, os
path = sys.argv[1]
with open(path, 'r', encoding='utf-8') as f:
    d = json.load(f)
v6 = [q for q in d['questions'] if 'global' in q.get('id','') and 'v6' in q.get('id','')]
print(f'v6 found: {len(v6) > 0}')
for q in v6[:1]:
    print(f'context_len: {len(q.get("context",""))}')
    print(f'text_len: {len(q.get("text",""))}')
    print(f'statement_len: {len(q.get("statement",""))}')
    print(f'statement: {q.get("statement","")[:100]}')
