import json
c = json.load(open(r'E:\scripts-python\worldexams\_config_3_5_6.json', encoding='utf-8'))
d = json.load(open(r'E:\scripts-python\worldexams\_questions_data_full.json', encoding='utf-8'))
print(f'Config bundles: {len(c["bundles"])}')
print(f'Questions keys: {len(list(d.keys()))}')
for k in sorted(d.keys()):
    print(f'  {k}: {len(d[k])} questions')
print()
for b in c['bundles']:
    key = f'{b["grado"]}_{b["asignatura"]}_{b["periodo"]}'
    q = d.get(key, [])
    n = len(q) if isinstance(q, list) else 'partial'
    status = 'READY' if n == 10 else f'MISSING ({n})'
    print(f'  G{b["grado"]:2d} {b["asignatura"]:20s} {b["periodo"]} [{b["tema"]:40s}] {status}')
