#!/usr/bin/env python3
"""
Generator engine for MASTERY bundles - Grade 3, 5, 6
"""
import os, json, sys

BASE = r"E:\scripts-python\worldexams\questions_data\colombia"

DIFFICULTY_MAP = {
    1: {"diff": "D1", "bloom": "Remember", "icfes": "Comunicaci\u00f3n y Representaci\u00f3n"},
    2: {"diff": "D2", "bloom": "Remember", "icfes": "Comunicaci\u00f3n y Representaci\u00f3n"},
    3: {"diff": "D3", "bloom": "Understand", "icfes": "Comunicaci\u00f3n y Representaci\u00f3n"},
    4: {"diff": "D4", "bloom": "Understand", "icfes": "Comunicaci\u00f3n y Representaci\u00f3n"},
    5: {"diff": "D4", "bloom": "Understand", "icfes": "Comunicaci\u00f3n y Representaci\u00f3n"},
    6: {"diff": "D5", "bloom": "Apply", "icfes": "Formulaci\u00f3n y Ejecuci\u00f3n"},
    7: {"diff": "D6", "bloom": "Apply", "icfes": "Formulaci\u00f3n y Ejecuci\u00f3n"},
    8: {"diff": "D6", "bloom": "Apply", "icfes": "Formulaci\u00f3n y Ejecuci\u00f3n"},
    9: {"diff": "D7", "bloom": "Analyze", "icfes": "Razonamiento y Argumentaci\u00f3n"},
    10: {"diff": "D8", "bloom": "Analyze", "icfes": "Razonamiento y Argumentaci\u00f3n"},
}

def write_bundle(grado, asignatura, subject_id, p_key, p_data, questions):
    """Write a single bundle .md file."""
    p_dir = os.path.join(BASE, asignatura, f"grado-{grado}", "2026", "periodos")
    os.makedirs(p_dir, exist_ok=True)
    filename = f"CO-{subject_id}-{grado}-2026-{p_key}-{p_data['tema']}-001-MASTERY-bundle.md"
    filepath = os.path.join(p_dir, filename)
    
    p_num = int(p_key[1])
    
    lines = []
    lines.append("---")
    lines.append(f'id: "CO-{subject_id}-{grado}-2026-{p_key}-{p_data["tema"]}-001-MASTERY"')
    lines.append('country: "colombia"')
    lines.append(f"grado: {grado}")
    lines.append(f'asignatura: "{asignatura}"')
    lines.append(f'tema: "{p_data["tema"]}"')
    lines.append(f"periodo: {p_num}")
    lines.append('protocol_version: "5.1"')
    lines.append("bundle_index: 1")
    lines.append("bundle_size: 10")
    lines.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"')
    lines.append("modern_context: true")
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append("calibration:")
    lines.append("  expected_success_rate: 0.65")
    lines.append('  discrimination_index_target: ">= 0.22"')
    lines.append("  simulated_responses: 100")
    lines.append(f'rubric_baseline: "{p_data["rubric"]}"')
    lines.append("---")
    lines.append("")
    lines.append(f"# Bundle Mastery: {p_data['topic']}")
    lines.append("")
    lines.append(p_data["desc"])
    lines.append("")
    
    content = "\n".join(lines)
    
    for qi, q in enumerate(questions):
        qn = qi + 1
        di = DIFFICULTY_MAP[qn]
        content += f"\n## Question {qn} [{di['diff']}]\n\n"
        content += f"**ID:** `CO-{subject_id}-{grado}-2026-{p_key}-{p_data['tema']}-001-MASTERY-v{qn}`\n"
        content += f"**Bloom:** {di['bloom']}\n"
        content += f"**ICFES:** {di['icfes']}\n"
        if q.get("c"):
            content += f"**Context:** {q['c']}\n"
        content += f"\n### Enunciado\n{q['e']}\n\n"
        content += "### Options\n"
        for ol, ot, ofb in q["opts"]:
            marker = "[x]" if ol == q["a"] else "[ ]"
            content += f"- {marker} {ol}) {ot} <!-- feedback: {ofb} -->\n"
        content += f"\n### Explicaci\u00f3n Pedag\u00f3gica\n{q['fb']}\n\n---\n\n"
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  [OK] {filename}")
    return filepath

# Load config and questions
config_path = os.path.join(os.path.dirname(__file__), "_config_3_5_6.json")
questions_path = os.path.join(os.path.dirname(__file__), "_questions_data.json")

with open(config_path, "r", encoding="utf-8") as f:
    CONFIG = json.load(f)

with open(questions_path, "r", encoding="utf-8") as f:
    QDATA = json.load(f)

generated = []
for entry in CONFIG["bundles"]:
    key = f"{entry['grado']}_{entry['asignatura']}_{entry['periodo']}"
    questions = QDATA.get(key, [])
    if not questions:
        print(f"  [SKIP] No questions for {key}")
        continue
    fp = write_bundle(entry["grado"], entry["asignatura"], entry["subject_id"],
                      entry["periodo"], entry, questions)
    generated.append(fp)

print(f"\n{'='*60}")
print(f"Generated {len(generated)} bundle files.")
print("Now validating...")
for fp in generated:
    print(fp)
