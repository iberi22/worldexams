import json

queue_path = r"E:\scripts-python\worldexams\.worldexams\generation\queue.json"
q = json.load(open(queue_path, 'r', encoding='utf-8'))

# Try sociales-ciudadanas grado 9 - first topic Colombia Siglo XX
existing = [t for t in q['tasks'] if t['subject']=='sociales-ciudadanas' and t['grado']==9 and t['periodo']==1 and t['topic']=='colombia-siglo-xx']
max_idx = max([t['bundleIndex'] for t in existing]) if existing else 0
next_idx = max_idx + 1

task_id = f"sociales-ciudadanas-9-P1-colombia-siglo-xx-{next_idx}"
new_task = {
    "subject": "sociales-ciudadanas",
    "grado": 9,
    "periodo": 1,
    "topic": "colombia-siglo-xx",
    "bundleIndex": next_idx,
    "agent": "minimax-m2.7",
    "id": task_id,
    "status": "pending",
    "createdAt": "2026-04-26T23:44:00.000Z"
}
q['tasks'].append(new_task)
json.dump(q, open(queue_path, 'w', encoding='utf-8'), indent=2, ensure_ascii=False)
print(f"Added task: {task_id}")
print(f"Next bundle index: {next_idx}")