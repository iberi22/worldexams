#!/usr/bin/env python3
"""Part 1/6: Generate Grade 3 bundles (3 subjects x 4 periods = 12 bundles)"""
import os
B=os.path.join(os.environ.get('BASE',r'E:\scripts-python\worldexams\questions_data\colombia'))
D=[{"d":"D1","b":"Remember","i":"Comunicaci\u00f3n y Representaci\u00f3n"},{"d":"D2","b":"Remember","i":"Comunicaci\u00f3n y Representaci\u00f3n"},{"d":"D3","b":"Understand","i":"Comunicaci\u00f3n y Representaci\u00f3n"},{"d":"D4","b":"Understand","i":"Comunicaci\u00f3n y Representaci\u00f3n"},{"d":"D4","b":"Understand","i":"Comunicaci\u00f3n y Representaci\u00f3n"},{"d":"D5","b":"Apply","i":"Formulaci\u00f3n y Ejecuci\u00f3n"},{"d":"D6","b":"Apply","i":"Formulaci\u00f3n y Ejecuci\u00f3n"},{"d":"D6","b":"Apply","i":"Formulaci\u00f3n y Ejecuci\u00f3n"},{"d":"D7","b":"Analyze","i":"Razonamiento y Argumentaci\u00f3n"},{"d":"D8","b":"Analyze","i":"Razonamiento y Argumentaci\u00f3n"}]
def mb(g,a,s,p,t,tp,r,d,qs):
    pn=p[1];d2=os.path.join(B,a,f"grado-{g}","2026","periodos");os.makedirs(d2,exist_ok=True)
    fn=f"CO-{s}-{g}-2026-{p}-{t}-001-MASTERY-bundle.md";fp=os.path.join(d2,fn)
    lines=[f"---",f'id: "CO-{s}-{g}-2026-{p}-{t}-001-MASTERY"','country: "colombia"',f"grado: {g}",f'asignatura: "{a}"',f'tema: "{t}"',f"periodo: {pn}",'protocol_version: "5.1"',"bundle_index: 1","bundle_size: 10",'alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos"',"modern_context: true",'distractor_profile: "plausible_peer_set"',"calibration:","  expected_success_rate: 0.65",'  discrimination_index_target: ">= 0.22"',"  simulated_responses: 100",f'rubric_baseline: "{r}"',"---","",f"# Bundle Mastery: {tp}","",d,""]
    for qi,q in enumerate(qs):
        di=D[qi];ctx,enun,ops,ans,fb=q
        lines+=["",f"## Question {qi+1} [{di['d']}]","",f"**ID:** `CO-{s}-{g}-2026-{p}-{t}-001-MASTERY-v{qi+1}`",f"**Bloom:** {di['b']}",f"**ICFES:** {di['i']}"]
        if ctx:lines.append(f"**Context:** {ctx}")
        lines+=["",f"### Enunciado",enun,"","### Options"]
        for ol,ot,ofb in ops:lines.append(f"- {'[x]' if ol==ans else '[ ]'} {ol}) {ot} <!-- feedback: {ofb} -->")
        lines+=["",f"### Explicaci\u00f3n Pedag\u00f3gica",fb,"","---",""]
    with open(fp,"w",encoding="utf-8") as f:f.write("\n".join(lines))
    print(f"[OK] {fn}")

# 🏁 REMOVE FUNCTIONS ABOVE - THIS IS THE GENERATOR
