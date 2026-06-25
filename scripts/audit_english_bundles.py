import os
import re

def parse_yaml_simple(content):
    fm = {}
    for line in content.split('\n'):
        if ':' in line:
            key, val = line.split(':', 1)
            fm[key.strip()] = val.strip().strip('"').strip("'")
    return fm

def audit_bundles(root_dir):
    english_bundles = []
    errors = []
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='latin-1') as f:
                        raw_content = f.read()
                        if 'asignatura: "ingles"' in raw_content.lower():
                            match = re.match(r'^---\s*\n(.*?)\n---\s*\n', raw_content, re.DOTALL)
                            if match:
                                fm = parse_yaml_simple(match.group(1))
                                english_bundles.append((path, fm, raw_content))
                            else:
                                errors.append(f"No frontmatter in {path}")
                except Exception as e:
                    errors.append(f"Error reading {path}: {e}")

    print(f"Total English Bundles found: {len(english_bundles)}")

    stats = {}

    for path, fm, content in english_bundles:
        grade = fm.get('grado')
        if grade is None:
            continue

        try:
            grade = int(grade)
        except:
            continue

        if grade not in stats:
            stats[grade] = { 'total_questions': 0, 'bundles': 0, 'cefr': {} }

        q_count = content.count('### Enunciado')
        stats[grade]['total_questions'] += q_count
        stats[grade]['bundles'] += 1

        cefr = fm.get('cefr_level', 'Unknown')
        stats[grade]['cefr'][cefr] = stats[grade]['cefr'].get(cefr, 0) + q_count

    print("\nEnglish Content Audit by Grade & CEFR:")
    print(f"{'Grade':<6} | {'Bundles':<8} | {'Questions':<10} | {'CEFR Distribution'}")
    print("-" * 70)
    for grade in sorted(stats.keys()):
        s = stats[grade]
        cefr_str = ", ".join([f"{k}: {v}" for k, v in sorted(s['cefr'].items())])
        print(f"{grade:<6} | {s['bundles']:<8} | {s['total_questions']:<10} | {cefr_str}")

    print("\nMetadata Gaps:")
    missing_cefr = [p for p, fm, c in english_bundles if not fm.get('cefr_level')]
    print(f"Bundles missing 'cefr_level': {len(missing_cefr)}")
    if missing_cefr:
        print("Samples missing 'cefr_level':")
        for p in missing_cefr[:5]:
            print(f"  - {p}")

if __name__ == "__main__":
    audit_bundles('questions_data')
