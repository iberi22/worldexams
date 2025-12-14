import os
import json

base_path = r"e:\scripts-python\worldexams\src\content\questions\colombia"

stats = {}

for root, dirs, files in os.walk(base_path):
    # Calculate depth relative to base_path
    rel_path = os.path.relpath(root, base_path)
    if rel_path == ".":
        continue

    parts = rel_path.split(os.sep)

    # We expect structure: subject / grade
    if len(parts) >= 2:
        subject = parts[0]
        grade = parts[1]

        # Initialize if not exists
        if subject not in stats:
            stats[subject] = {}
        if grade not in stats[subject]:
            stats[subject][grade] = {"count": 0, "path": root}

        md_files = [f for f in files if f.endswith('.md')]
        stats[subject][grade]["count"] += len(md_files)

print(json.dumps(stats, indent=2))
