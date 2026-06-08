#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate W10-W40 weekly bundles for Sociales G5 Colombia."""

import os

BASE = "E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-5/2026/weekly"

# =============== HELPER ===============
def make_bundle(week, tema, rubric, questions):
    lines = []
    lines.append("---")
    lines.append('id: "CO-SOC-5-2026-%s-%s-001-MASTERY"' % (week, tema))
    lines.append('country: "colombia"')
    lines.append('grado: 5')
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append('tema: "%s"' % tema)
    lines.append('semana: "%s"' % week)
    lines.append('protocol_version: "5.2"')
    lines.append('year: 2026')
    lines.append('bundle_index: 1')
    lines.append('bundle_size: 10')
    lines.append('alignment: "DBA MEN + Estandares Basicos Ciencias Sociales"')
    lines.append('modern_context: true')
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append('rubric_baseline: "%s"' % rubric)
    lines.append("---")
    lines.append("")
    for i, q in enumerate(questions, 1):
        lines.append("## Pregunta %d [%s]" % (i, q[6]))
        lines.append("")
        lines.append("**ID:** `CO-SOC-5-2026-%s-%s-001-MASTERY-v%d`" % (week, tema, i))
        lines.append("**Bloom:** %s" % q[5])
        lines.append("**ICFES:** Sociales y Ciudadanas Competencia")
        lines.append("**Context:** Contexto colombiano")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q[0])
        lines.append("")
        lines.append("### Opciones")
        for opt_text, feedback in q[1]:
            letter = opt_text[0]
            mark = "x" if letter == q[2] else " "
            lines.append("- [%s] %s <!-- feedback: %s -->" % (mark, opt_text, feedback))
        lines.append("")
        lines.append("### Explicaci\u00f3n Pedag\u00f3gica")
        lines.append(q[3])
        lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines)

def Q(tex, opts, correct, expl, bloom="Remember", d="D1"):
    return (tex, opts, correct, expl, None, bloom, d)

# Avoid encoding issues with literal strings in file
import codecs

def write_bundle(week, tema, rubric, questions):
    fname = "CO-SOC-5-2026-%s-%s-001-MASTERY.md" % (week, tema)
    fpath = os.path.join(BASE, fname)
    content = make_bundle(week, tema, rubric, questions)
    with codecs.open(fpath, "w", "utf-8") as f:
        f.write(content)
    print("Wrote %s" % fname)
