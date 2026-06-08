#!/usr/bin/env python3
"""Generate weekly bundles W09-W40 (skipping W11, W12) for Ciencias Naturales Grado 6."""
import os

BASE = r"E:\scripts-python\worldexams\questions_data\colombia\ciencias-naturales\grado-6\2026\weekly"
EXISTING = {"W01","W02","W03","W04","W05","W06","W07","W08","W11","W12"}

dirs = [
    ("W09", "ecosistemas-colombianos", 3, "Ecosistemas Colombianos - Selvas y Bosques"),
    ("W10", "ecosistemas-colombianos-parte-2", 3, "Ecosistemas Colombianos - Páramos y Humedales"),
    ("W13", "cadenas-alimenticias-parte-2", 3, "Cadenas y Redes Alimenticias (Parte 2)"),
    ("W14", "repaso-periodo-3", 3, "Repaso Periodo 3: Ecosistemas"),
    ("W15", "sistema-nervioso", 4, "Sistema Nervioso"),
    ("W16", "organos-de-los-sentidos", 4, "Órganos de los Sentidos"),
    ("W17", "sistema-nervioso-y-sentidos", 4, "Sistema Nervioso y Órganos de los Sentidos"),
    ("W18", "repaso-periodo-4", 4, "Repaso Periodo 4: Sistema Nervioso y Sentidos"),
    ("W19", "sistema-circulatorio", 5, "Sistema Circulatorio"),
    ("W20", "sistema-respiratorio", 5, "Sistema Respiratorio"),
    ("W21", "sistema-circulatorio-respiratorio", 5, "Sistemas Circulatorio y Respiratorio"),
    ("W22", "repaso-periodo-5", 5, "Repaso Periodo 5: Circulatorio y Respiratorio"),
    ("W23", "sistema-digestivo", 6, "Sistema Digestivo"),
    ("W24", "sistema-excretor", 6, "Sistema Excretor"),
    ("W25", "sistema-digestivo-excretor", 6, "Sistemas Digestivo y Excretor"),
    ("W26", "repaso-periodo-6", 6, "Repaso Periodo 6: Digestivo y Excretor"),
    ("W27", "sistema-reproductor", 7, "Sistema Reproductor"),
    ("W28", "pubertad-y-cambios", 7, "Pubertad y Cambios Corporales"),
    ("W29", "sistema-reproductor-pubertad", 7, "Sistema Reproductor y Pubertad"),
    ("W30", "repaso-periodo-7", 7, "Repaso Periodo 7: Reproductor y Pubertad"),
    ("W31", "mezclas-tipos", 8, "Mezclas: Tipos y Características"),
    ("W32", "metodos-de-separacion", 8, "Métodos de Separación de Mezclas"),
    ("W33", "mezclas-y-separacion", 8, "Mezclas y Separación"),
    ("W34", "repaso-periodo-8", 8, "Repaso Periodo 8: Mezclas"),
    ("W35", "energia-formas", 9, "Energía: Formas y Fuentes"),
    ("W36", "transformaciones-de-energia", 9, "Transformaciones de la Energía"),
    ("W37", "energia-formas-transformaciones", 9, "Energía: Formas y Transformaciones"),
    ("W38", "repaso-periodo-9", 9, "Repaso Periodo 9: Energía"),
    ("W39", "electricidad-basica", 10, "Electricidad Básica"),
    ("W40", "magnetismo-basico", 10, "Magnetismo Básico"),
]

def make_bundle(week, tema, periodo, titulo, preguntas):
    if week in EXISTING:
        return f"Skipping {week} (exists)"
    wnum = week.replace('W', '')
    fn = f"CO-CIE-6-2026-{week}-{tema}-001-MASTERY-bundle.md"
    header = f"""---
id: "CO-CIE-6-2026-{week}-{tema}-001-MASTERY"
country: "colombia"
grado: 6
asignatura: "ciencias-naturales"
tema: "{tema}"
periodo: {periodo}
week: {wnum}
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 10
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos Grado 6"
---

# Weekly Pack {week} — {titulo}

**Grado:** 6° | **Periodo:** {periodo} | **Semana:** {wnum} | **Año:** 2026

---

"""
    with open(os.path.join(BASE, fn), 'w', encoding='utf-8') as f:
        f.write(header + preguntas)
    return fn

# ============================================================
# CONTENT LOADER
# ============================================================
# Each week's content is in a separate file for manageability.
# We'll load from individual files named wXX_content.py
import sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

for w, tema, p, tit in dirs:
    # Try to load content from individual file
    modname = f"w{w.lower()}_content"
    try:
        mod = __import__(modname)
        preguntas = mod.content
    except ImportError:
        print(f"WARNING: No content file found for {modname}, skipping")
        continue
    
    fn = make_bundle(w, tema, p, tit, preguntas)
    print(f"Created: {fn}")

print(f"\nTotal bundles created: {len([d for d in dirs if d[0] not in EXISTING])}")
