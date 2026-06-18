import urllib.request, json

# Check worker pack (without co- prefix)
urls = [
    'https://api.saberparatodos.space/v1/packs/week-1-grade-11-subject-ingles.json',
    'https://api.saberparatodos.space/v1/packs/co-week-1-grade-11-subject-ingles.json',
]

for url in urls:
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            data = json.loads(r.read().decode())
            qs = data.get('questions', data if isinstance(data, list) else [])
            total = len(qs)
            with_ctx = sum(1 for q in qs if len(q.get('context','')) > 0)
            with_ctx_100 = sum(1 for q in qs if len(q.get('context','')) > 100)
            print(f'{url}')
            print(f'  Total: {total}, With context (>0): {with_ctx}, With context (>100): {with_ctx_100}')
            if with_ctx > 0:
                for q in qs:
                    if len(q.get('context','')) > 1000:
                        print(f'  Sample: {q["id"]} ctx={len(q["context"])}')
                        print(f'  Starts: {q["context"][:80]}')
                        break
    except Exception as e:
        print(f'{url}: {e}')
