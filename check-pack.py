import json, sys, urllib.request

url = sys.argv[1]
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'})
with urllib.request.urlopen(req, timeout=15) as resp:
    d = json.loads(resp.read().decode('utf-8'))

# Find global-issues v6
for q in d['questions']:
    if 'global-issues-001' in q.get('id','') and q.get('id','').endswith('v6'):
        print(f"ID: {q['id']}")
        print(f"context_len: {len(q.get('context',''))}")
        print(f"text_len: {len(q.get('text',''))}")
        print(f"statement_len: {len(q.get('statement',''))}")
        if q.get('context'):
            print(f"context starts: {q['context'][:80]}")
        break
else:
    print("v6 NOT FOUND")

# Count total questions with context
with_ctx = sum(1 for q in d['questions'] if q.get('context','').strip())
print(f"\nTotal questions: {len(d['questions'])}")
print(f"With context: {with_ctx}")
