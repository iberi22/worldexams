#!/usr/bin/env python3
"""Add multi-country tasks to the generation queue."""

import json
from pathlib import Path

QUEUE_PATH = Path("E:/scripts-python/worldexams/.worldexams/generation/queue.json")

# Load existing queue
with open(QUEUE_PATH, "r", encoding="utf-8") as f:
    queue = json.load(f)

# Clear pending tasks (completedColombia = 275/276, just 1 failed)
# Let's reset the failed one and add multi-country tasks

# New tasks for all countries
new_tasks = []

countries_topics = {
    "mexico": [
        {"subject": "matematicas", "grado": 11, "periodo": 1, "topic": "algebra", "bundleIndex": 2},
        {"subject": "matematicas", "grado": 11, "periodo": 2, "topic": "geometria", "bundleIndex": 2},
        {"subject": "ciencias-naturales", "grado": 11, "periodo": 1, "topic": "biologia", "bundleIndex": 2},
    ],
    "argentina": [
        {"subject": "matematicas", "grado": 9, "periodo": 1, "topic": "algebra", "bundleIndex": 1},
        {"subject": "lengua", "grado": 9, "periodo": 1, "topic": "comprension-lectora", "bundleIndex": 1},
        {"subject": "ciencias-naturales", "grado": 9, "periodo": 1, "topic": "fisica", "bundleIndex": 1},
    ],
    "chile": [
        {"subject": "matematicas", "grado": 11, "periodo": 1, "topic": "algebra", "bundleIndex": 1},
        {"subject": "lengua", "grado": 11, "periodo": 1, "topic": "comprension-lectora", "bundleIndex": 1},
        {"subject": "ciencias-naturales", "grado": 11, "periodo": 1, "topic": "quimica", "bundleIndex": 1},
    ],
    "peru": [
        {"subject": "matematicas", "grado": 11, "periodo": 1, "topic": "algebra", "bundleIndex": 1},
        {"subject": "matematicas", "grado": 11, "periodo": 2, "topic": "trigonometria", "bundleIndex": 1},
        {"subject": "ciencias-naturales", "grado": 11, "periodo": 1, "topic": "biologia", "bundleIndex": 1},
    ],
    "ecuador": [
        {"subject": "matematicas", "grado": 10, "periodo": 1, "topic": "algebra", "bundleIndex": 1},
        {"subject": "lengua", "grado": 10, "periodo": 1, "topic": "comprension-lectora", "bundleIndex": 1},
        {"subject": "ciencias-naturales", "grado": 10, "periodo": 1, "topic": "ciencias-naturales", "bundleIndex": 1},
    ],
    "brazil": [
        {"subject": "matematicas", "grado": 11, "periodo": 1, "topic": "algebra", "bundleIndex": 2},
        {"subject": "ciencias-naturales", "grado": 11, "periodo": 1, "topic": "ciencias-natureza", "bundleIndex": 1},
        {"subject": "lengua", "grado": 11, "periodo": 1, "topic": "redacao", "bundleIndex": 2},
    ],
}

task_id = 1
for country, topics in countries_topics.items():
    for topic_data in topics:
        task_id_str = f"{country}-{topic_data['subject']}-{topic_data['grado']}-P{topic_data['periodo']}-{topic_data['topic']}-{topic_data['bundleIndex']}"
        task = {
            "subject": topic_data["subject"],
            "grado": topic_data["grado"],
            "periodo": topic_data["periodo"],
            "topic": topic_data["topic"],
            "bundleIndex": topic_data["bundleIndex"],
            "agent": "minimax-m2.7",
            "id": task_id_str,
            "status": "pending",
            "country": country,
        }
        new_tasks.append(task)
        task_id += 1

# Get current completed count
completed_count = len([t for t in queue.get("tasks", []) if t.get("status") == "completed"])

# Add new tasks to queue
if "tasks" not in queue:
    queue["tasks"] = []

# Mark the failed Colombia task as pending (reset it)
for task in queue["tasks"]:
    if task.get("id") == "sociales-ciudadanas-9-P1-colombia-siglo-xx-1":
        task["status"] = "pending"
        task.pop("completedAt", None)
        task.pop("error", None)

# Add new tasks
queue["tasks"].extend(new_tasks)
queue["batch"] = f"MULTI-COUNTRY-2026-04-28"
queue["lastUpdated"] = "2026-04-28T17:59:00Z"

# Save
with open(QUEUE_PATH, "w", encoding="utf-8") as f:
    json.dump(queue, f, indent=2, ensure_ascii=False)

print(f"Added {len(new_tasks)} multi-country tasks")
print(f"Total tasks now: {len(queue['tasks'])}")
print(f"Pending: {len([t for t in queue['tasks'] if t.get('status') == 'pending'])}")

for task in new_tasks:
    print(f"  - {task['country'].upper()}: {task['subject']} G{task['grado']} P{task['periodo']} {task['topic']}")
