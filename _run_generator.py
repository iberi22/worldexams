#!/usr/bin/env python3
"""Generate all bundles from config and data JSON files."""
import os, json, sys

THIS = os.path.dirname(os.path.abspath(__file__))
os.chdir(THIS)
BASE = r"E:\scripts-python\worldexams\questions_data\colombia"

DIFF = [
    {"d":"D1","b":"Remember","i":"Comunicación y Representación"},
    {"d":"D2","b":"Remember","i":"Comunicación y Representación"},
    {"d":"D3","b":"Understand","i":"Comunicación y Representación"},
    {"d":"D4","b":"Understand","i":"Comunicación y Representación"},
    {"d":"D4","b":"Understand","i":"Comunicación y Representación"},
    {"d":"D5","b":"Apply","i":"Formulación y Ejecución"},
    {"d":"D6","b":"Apply","i":"Formulación y Ejecución"},
    {"d":"D6","b":"Apply","i":"Formulación y Ejecución"},
    {"d":"D7","b":"Analyze","i":"Razonamiento y Argumentación"},
    {"d":"D8","b":"Analyze","i":"Razonamiento y Argumentación"},
]

with open("_config_3_5_6.json","r",encoding="utf-8") as f:
    config = json.load(f)

data_file = "_questions_data_full.json"
if not os.path.exists(data_file):
    print(f"ERROR: {data_file} not found. Create it first.")
    sys.exit(1)

with open(data_file,"r",encoding="utf-8") as f:
    qdata = json.load(f)

made = 0
for b in config["bundles"]:
    g = b["grado"]; a = b["asignatura"]; sid = b["subject_id"]
    p = b["periodo"]; t = b["tema"]; tp = b["topic"]
    r = b["rubric"]; d = b["desc"]
    key = f"{g}_{a}_{p}"
    
    qs = qdata.get(key, [])
    if not qs:
        print(f"[SKIP] No data for {key}")
        continue
    
    pn = p[1]
    d2 = os.path.join(BASE, a, f"grado-{g}", "2026", "periodos")
    os.makedirs(d2, exist_ok=True)
    fn = f"CO-{sid}-{g}-2026-{p}-{t}-001-MASTERY-bundle.md"
    fp = os.path.join(d2, fn)
    
    lines = [
        "---",
        f'id: "CO-{sid}-{g}-2026-{p}-{t}-001-MASTERY"',
        'country: "colombia"',
        f"grado: {g}",
        f'asignatura: "{a}"',
        f'tema: "{t}"',
        f"periodo: {pn}",
        'protocol_version: "5.1"',
        "bundle_index: 1",
        "bundle_size: 10",
        'alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"',
        "modern_context: true",
        'distractor_profile: "plausible_peer_set"',
        "calibration:",
        "  expected_success_rate: 0.65",
        '  discrimination_index_target: ">= 0.22"',
        "  simulated_responses: 100",
        f'rubric_baseline: "{r}"',
        "---",
        "",
        f"# Bundle Mastery: {tp}",
        "",
        d,
        "",
    ]
    
    for qi, q in enumerate(qs):
        di = DIFF[qi]
        ctx = q.get("ctx", q.get("c", ""))
        enun = q.get("enun", q.get("e", ""))
        ans = q["a"]
        fb = q.get("fb", q.get("feedback", ""))
        ops = q["opts"] if "opts" in q else q["options"]
        
        lines += [
            "",
            f"## Question {qi+1} [{di['d']}]",
            "",
            f"**ID:** `CO-{sid}-{g}-2026-{p}-{t}-001-MASTERY-v{qi+1}`",
            f"**Bloom:** {di['b']}",
            f"**ICFES:** {di['i']}",
        ]
        if ctx:
            lines.append(f"**Context:** {ctx}")
        lines += [
            "",
            "### Enunciado",
            enun,
            "",
            "### Options",
        ]
        for ol, ot, ofb in ops:
            m = "[x]" if ol == ans else "[ ]"
            lines.append(f"- {m} {ol}) {ot} <!-- feedback: {ofb} -->")
        lines += [
            "",
            "### Explicaci\u00f3n Pedag\u00f3gica",
            fb,
            "",
            "---",
            "",
        ]
    
    with open(fp, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print(f"[OK] {fn}")
    made += 1

print(f"\nGenerated {made} bundle files.")
