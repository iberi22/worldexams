import json, sys

path = sys.argv[1]
with open(path, 'r') as f:
    d = json.load(f)

# Find fast fashion question
for q in d['questions']:
    if 'fast fashion' in q.get('text', '').lower() or 'first paragraph' in q.get('text', '').lower():
        print(f"ID: {q['id']}")
        print(f"Text: {q['text'][:200]}")
        ctx = q.get('context', '')
        print(f"context_len: {len(ctx)}")
        if ctx:
            print(f"context starts: {ctx[:100]}...")
        else:
            print("NO CONTEXT")
        print()

# Stats
withctx = sum(1 for q in d['questions'] if q.get('context', '').strip())
print(f"Total questions: {len(d['questions'])}")
print(f"With context: {withctx}")
print(f"IDs with CO-ING-11-P1: {sum(1 for q in d['questions'] if 'CO-ING-11-P1' in q.get('id',''))}")
