#!/usr/bin/env python3
"""Generate all 40 weekly packs for Lectura Critica G4."""
import os

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\lectura-critica\grado-4\2026\weekly"
ALGN = "DBA MEN + Est\u00e1ndares B\u00e1sicos de Competencias en Lenguaje"

BLOOM = {"R":"Remember","U":"Understand","Ap":"Apply","An":"Analyze","E":"Evaluate"}
BLD = {"R":"D1","U":"D2","Ap":"D3","An":"D4","E":"D5"}
ICFES = {"L":"Identifi. de contenidos locales","G":"Comprensi\u00f3n del sentido global","I":"Dimensi\u00f3n inferencial","R":"Reflexi\u00f3n sobre el contenido"}

def wrap4(a,b,c,d):
    return (a,b,c,d)

def make(n, tema, title, rubric, rate, data, footer):
    w = f"W{n:02d}"
    fn = f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-bundle.md"
    lines = []
    lines.append("---")
    lines.append(f"id: \"CO-LEC-4-2026-{w}-{tema}-001-MASTERY\"")
    lines.append("country: \"colombia\"")
    lines.append("grado: 4")
    lines.append("asignatura: \"lectura-critica\"")
    lines.append(f"tema: \"{tema}\"")
    lines.append(f"semana: \"{w}\"")
    lines.append("protocol_version: \"5.2\"")
    lines.append("year: 2026")
    lines.append("bundle_index: 1")
    lines.append("bundle_size: 10")
    lines.append(f"alignment: \"{ALGN}\"")
    lines.append("modern_context: true")
    lines.append("distractor_profile: \"plausible_peer_set\"")
    lines.append("calibration:")
    lines.append(f"  expected_success_rate: {rate}")
    lines.append("  discrimination_index_target: \">= 0.25\"")
    lines.append("  simulated_responses: 100")
    lines.append(f"rubric_baseline: \"{rubric}\"")
    lines.append("---")
    lines.append("")
    lines.append(f"# Lectura Cr\u00edtica G4 \u2014 {w}: {title}")
    lines.append("")
    
    for i, (bk, ic, ctx, stem, opts, expl) in enumerate(data, 1):
        bid = f"CO-LEC-4-2026-{w}-{tema}-001-MASTERY-v{i}"
        lines.append(f"## Question {i} [{BLD[bk]}]")
        lines.append(f"")
        lines.append(f"**ID:** `{bid}`")
        lines.append(f"**Bloom:** {BLOOM[bk]}")
        lines.append(f"**ICFES:** {ICFES[ic]}")
        lines.append(f"**Context:** {ctx}")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(stem)
        lines.append("")
        lines.append("### Options")
        for op in opts:
            l,t,c = op[0], op[1], op[2]
            fb = op[3] if len(op) > 3 else ""
            m = "[x]" if c else "[ ]"
            fbstr = f" <!-- feedback: {fb} -->" if fb else ""
            lines.append(f"- {m} {l}) {t}{fbstr}")
        lines.append("")
        lines.append("### Explicaci\u00f3n Pedag\u00f3gica")
        lines.append(expl)
        lines.append("")
        lines.append("---")
        lines.append("")
    
    lines.append("")
    lines.append("### Explicaci\u00f3n Pedag\u00f3gica Final")
    lines.append(footer)
    lines.append("")
    
    content = "\n".join(lines)
    path = os.path.join(OUT, fn)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK {fn}")

# Helper for option tuples
def opt(*items):
    return items

# gen_all_v2 loaded
