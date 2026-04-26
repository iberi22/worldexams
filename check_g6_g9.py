import json, sys
q = json.load(open(r'E:\scripts-python\worldexams\.worldexams\generation\queue.json', 'r', encoding='utf-8'))
tasks = [t for t in q['tasks'] if t['grado'] in (6, 9)]
print(f'Grado 6/9 tasks in queue: {len(tasks)}')
for t in tasks:
    print(f"  {t['subject']} g{t['grado']} P{t['periodo']} {t['topic']} [{t['status']}]")