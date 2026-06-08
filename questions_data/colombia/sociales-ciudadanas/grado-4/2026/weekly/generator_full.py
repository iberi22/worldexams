#!/usr/bin/env python3
"""
Generate 33 bundles SOCIALES CIUDADANAS Colombia G4 W08-W40.
Each bundle: YAML frontmatter + 10 questions with Bloom variation.
"""

import os, re, sys

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-4\2026\weekly"

def slug(s):
    s = s.lower().strip().replace(" ","-")
    return re.sub(r'[^a-z0-9\-]', '', s)

def label(n):
    return chr(65+n)

def make_q(ctx, bloom, icfes, d, stem, opts, exp):
    return {"ctx":ctx,"bloom":bloom,"icfes":icfes,"d":d,"stem":stem,"opts":opts,"exp":exp}

def build_bundle(week, tema, desc, qlist, intro):
    tema_slug = slug(tema)
    bid = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY"
    fname = f"COL-SOC-CIU-4-2026-{week}-{tema_slug}-001-MASTERY-bundle.md"
    fp = os.path.join(OUT, fname)
    L = []
    L.append("---")
    L.append(f'id: "{bid}"')
    L.append('country: "colombia"')
    L.append('grado: 4')
    L.append('asignatura: "sociales-ciudadanas"')
    L.append(f'tema: "{tema_slug}"')
    L.append(f'periodo: "{week}"')
    L.append('protocol_version: "5.2"')
    L.append('bundle_index: 1')
    L.append('bundle_size: 10')
    L.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"')
    L.append('modern_context: true')
    L.append('distractor_profile: "plausible_peer_set"')
    L.append('calibration:')
    L.append('  expected_success_rate: 0.75')
    L.append('  discrimination_index_target: ">= 0.22"')
    L.append('  simulated_responses: 100')
    L.append(f'rubric_baseline: "{desc}"')
    L.append("---")
    L.append("")
    L.append(f"# Bundle Mastery: {tema}")
    L.append("")
    L.append(intro)
    L.append("")

    for i, q in enumerate(qlist):
        L.append("---\n")
        L.append(f"## Question {i+1} [D{q['d']}]\n")
        L.append(f"**ID:** `{bid}-v{i+1}`")
        L.append(f"**Bloom:** [{q['bloom']}]")
        L.append(f"**ICFES:** [{q['icfes']}]")
        L.append(f"**Context:** {q['ctx']}\n")
        L.append("### Enunciado")
        L.append(q['stem'])
        L.append("")
        L.append("### Options\n")
        opts = list(q['opts'])
        correct_pos = i % 4
        if opts[correct_pos][1] != True:
            for idx, (_, is_c) in enumerate(opts):
                if is_c:
                    opts[correct_pos], opts[idx] = opts[idx], opts[correct_pos]
                    break
        for idx, (ot, ok, fb) in enumerate(opts):
            px = '[x]' if ok else '[ ]'
            L.append(f"- {px} {label(idx)}) {ot} <!-- feedback: {fb} -->")
        L.append("")
        L.append("### Explicaci\u00f3n Pedag\u00f3gica")
        L.append(q['exp'])
        L.append("")

    L.append("---\n")
    L.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    L.append(f"Este bundle de Ciencias Sociales y Ciudadanas para grado cuarto, {week}, aborda el tema de {tema} desde una perspectiva colombiana. Eval\u00faa la comprensi\u00f3n del concepto, las caracter\u00edsticas principales, la aplicaci\u00f3n en contextos cotidianos, el an\u00e1lisis de situaciones, la evaluaci\u00f3n cr\u00edtica y la capacidad creativa para proponer soluciones. El objetivo es que los estudiantes reconozcan la importancia de estos temas en su vida diaria como ciudadanos colombianos y fortalezcan su pensamiento social y reflexivo.")
    L.append("")

    c = "\n".join(L)
    with open(fp, "w", encoding="utf-8") as fh:
        fh.write(c)
    print(f"// {fname}")

print("Generator ready. Will produce 33 files.")
