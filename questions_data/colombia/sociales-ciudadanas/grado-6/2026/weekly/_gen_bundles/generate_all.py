#!/usr/bin/env python3
"""
Generate all 33 weekly bundles W08-W40 for Sociales Ciudadanas Grado 6.
Write directly to the output directory.
"""
import os, sys

sys.path.insert(0, os.path.dirname(__file__))
from config import WEEKS

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly"

PROTOCOL = "5.2"
YEAR = 2026

def qid(w, slug, n): return f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY-v{n+1}"
def fn(w, slug): return f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY-bundle.md"

def opt_line(label, text, fb, is_correct):
    m = "x" if is_correct else " "
    return f"- [{m}] {label}) {text} <!-- feedback: {fb} -->"

def render_q(idx, q):
    opts = q["options"]
    correct = q["correct"]
    lines = []
    lines.append(f"## Question {idx+1}")
    lines.append("")
    lines.append(f"**ID:** `{q['id']}`")
    lines.append(f"**Bloom:** {q['bloom']}")
    if q.get('icfes'):
        lines.append(f"**ICFES:** {q['icfes']}")
    if q.get("context"):
        lines.append(f"**Context:** {q['context']}")
    lines.append("")
    lines.append("### Enunciado")
    lines.append(q["stem"])
    lines.append("")
    lines.append("### Options")
    for label, text, fb in opts:
        lines.append(opt_line(label, text, fb, label == correct))
    lines.append("")
    lines.append("### Explicaci\u00f3n Pedag\u00f3gica")
    lines.append(q["explanation"])
    return "\n".join(lines)

def make_bundle(w, slug, title, questions):
    parts = []
    # frontmatter
    parts.append("---")
    parts.append(f'id: "CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY"')
    parts.append('country: "colombia"')
    parts.append("grado: 6")
    parts.append('asignatura: "sociales-ciudadanas"')
    parts.append(f'tema: "{slug}"')
    parts.append(f"semana: {w}")
    parts.append(f'protocol_version: "{PROTOCOL}"')
    parts.append(f"bundle_index: 1")
    parts.append(f"bundle_size: {len(questions)}")
    parts.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos de Competencias Ciudadanas"')
    parts.append("modern_context: true")
    parts.append('distractor_profile: "plausible_peer_set"')
    parts.append("calibration:")
    parts.append("  expected_success_rate: 0.65")
    parts.append('  discrimination_index_target: ">= 0.22"')
    parts.append("  simulated_responses: 100")
    parts.append(f"rubric_baseline: \"{CFG.get(w, {}).get('rubric', slug)}\"")
    parts.append("---")
    parts.append("")
    parts.append(f"# Bundle Mastery: {title} \u2014 Semana {w}")
    parts.append("")
    parts.append(f"Este bundle cubre los temas correspondientes a la semana {w}. Alineado con los DBA de Competencias Ciudadanas para grado 6.")
    parts.append("")
    for i, q in enumerate(questions):
        parts.append("---")
        parts.append("")
        parts.append(render_q(i, q))
    return "\n".join(parts)

# Build CFG from WEEKS
CFG = {}
for w, (slug, title, rubric) in WEEKS.items():
    CFG[w] = {"slug": slug, "title": title, "rubric": rubric}

# ============================================================
# PART 1: Questions for W08-W27 (History)
# ============================================================

from questions_p1 import get_questions_p1
from questions_p2 import get_questions_p2
from questions_p3 import get_questions_p3

ALL_QS = {}
ALL_QS.update(get_questions_p1())  # W08-W17
ALL_QS.update(get_questions_p2())  # W18-W27
ALL_QS.update(get_questions_p3())  # W28-W40

total_questions = 0
for w in range(8, 41):
    slug, title, rubric = WEEKS[w]
    qs = ALL_QS.get(w)
    if qs is None:
        print(f"WARNING: No questions for W{w}, skipping")
        continue
    if len(qs) != 10:
        print(f"WARNING: W{w} has {len(qs)} questions (expected 10)")
    # set IDs
    for i, q in enumerate(qs):
        q["id"] = qid(w, slug, i)
    content = make_bundle(w, slug, title, qs)
    fpath = os.path.join(OUT, fn(w, slug))
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    total_questions += len(qs)
    print(f"Created W{w:02d}: {slug} ({len(qs)} questions)")

print(f"\n=== DONE: 33 bundles, {total_questions} questions ===")
