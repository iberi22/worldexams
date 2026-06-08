#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Full generator: all 106 weekly bundles for Ciencias Naturales G3, G4, G5
Generates complete question data programmatically per segment.
Run: python gen_complete.py
"""

import os, random, sys

random.seed(2026)
BASE = os.path.join("E:/scripts-python/worldexams/questions_data/colombia","ciencias-naturales")

CIUDADES = [
    ("Bogotá","Colegio La Salle en Bogotá"),
    ("Medellín","IE San José de Medellín"),
    ("Cali","Colegio Santa Cecilia de Cali"),
    ("Barranquilla","Escuela Normal Superior de Barranquilla"),
    ("Bucaramanga","Colegio San Pedro de Bucaramanga"),
    ("Cartagena","IE San Felipe de Cartagena"),
    ("Pereira","Colegio SURAMERICANA de Pereira"),
    ("Manizales","Escuela Normal Superior de Manizales"),
    ("Ibagué","Colegio San Simón de Ibagué"),
    ("Neiva","IE Santa Teresa de Neiva"),
    ("Sincelejo","Colegio Francisco de Paula Santander"),
    ("Valledupar","IE Alfonso López de Valledupar"),
    ("Riohacha","Colegio Nacional José María Córdoba"),
    ("Pasto","Colegio San Francisco Javier de Pasto"),
    ("Tunja","Escuela Normal Santiago de Tunja"),
    ("Cúcuta","Colegio San José de Cúcuta"),
    ("Leticia","Escuela Rural La Esperanza en Leticia"),
    ("Quibdó","IE Técnica de Quibdó, Chocó"),
    ("Mocoa","Escuela Ecológica de Mocoa, Putumayo"),
    ("San Andrés","Colegio Sagrado Corazón de San Andrés"),
]

TITULOS = {
    "seres-vivos":"Seres Vivos y su Entorno","plantas":"Las Plantas","animales":"Los Animales",
    "repaso-p1":"Repaso Periodo 1","repaso-p2":"Repaso Periodo 2",
    "agua":"El Agua y sus Estados","aire-clima":"El Aire y el Clima",
    "suelo-recursos":"El Suelo y los Recursos Naturales","luz-sonido":"La Luz y el Sonido",
    "sistema-solar":"El Sistema Solar","repaso-integral":"Repaso Integral",
    "celula":"La Célula","tejidos-sistemas":"Tejidos y Sistemas del Cuerpo Humano",
    "digestivo-nutricion":"Sistema Digestivo y Nutrición",
    "ecosistemas-colombia":"Ecosistemas Colombianos","cadenas-alimenticias":"Cadenas Alimenticias",
    "materia-propiedades":"Materia y sus Propiedades","cambios-estado":"Cambios de Estado",
    "maquinas-simples":"Máquinas Simples",
    "clasificacion-reinos":"Clasificación de los Seres Vivos",
    "respiratorio-circulatorio":"Sistema Respiratorio y Circulatorio",
    "nervioso-locomotor":"Sistema Nervioso y Locomotor",
    "ecosistemas-relaciones":"Relaciones en los Ecosistemas",
    "ciclos-agua-carbono":"Ciclos del Agua y del Carbono",
    "energia":"Energía: Fuentes Renovables y No Renovables",
    "electricidad":"Electricidad Básica","magnetismo":"Magnetismo y Electroimanes",
}

# ===========================================================================
# SEGMENT WEEK MAPS
# ===========================================================================

def make_weeks_map(segments):
    return {f"W{i+1:02d}": s for i, s in enumerate(segments)}

G3_SEGMENTS = [
    "seres-vivos","seres-vivos","seres-vivos","seres-vivos",
    "plantas","plantas","plantas","plantas",
    "animales","animales","animales","animales",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "agua","agua","agua","agua",
    "aire-clima","aire-clima","aire-clima","aire-clima",
    "suelo-recursos","suelo-recursos","suelo-recursos","suelo-recursos",
    "luz-sonido","luz-sonido","luz-sonido","luz-sonido",
    "sistema-solar","sistema-solar","sistema-solar","sistema-solar",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]

G4_SEGMENTS = [
    "celula","celula","celula","celula",
    "tejidos-sistemas","tejidos-sistemas","tejidos-sistemas","tejidos-sistemas",
    "digestivo-nutricion","digestivo-nutricion","digestivo-nutricion","digestivo-nutricion",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "ecosistemas-colombia","ecosistemas-colombia","ecosistemas-colombia","ecosistemas-colombia",
    "cadenas-alimenticias","cadenas-alimenticias","cadenas-alimenticias","cadenas-alimenticias",
    "materia-propiedades","materia-propiedades","materia-propiedades","materia-propiedades",
    "cambios-estado","cambios-estado","cambios-estado","cambios-estado",
    "maquinas-simples","maquinas-simples","maquinas-simples","maquinas-simples",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]

G5_SEGMENTS = [
    "clasificacion-reinos","clasificacion-reinos","clasificacion-reinos","clasificacion-reinos",
    "respiratorio-circulatorio","respiratorio-circulatorio","respiratorio-circulatorio","respiratorio-circulatorio",
    "nervioso-locomotor","nervioso-locomotor","nervioso-locomotor","nervioso-locomotor",
    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
    "ecosistemas-relaciones","ecosistemas-relaciones","ecosistemas-relaciones","ecosistemas-relaciones",
    "ciclos-agua-carbono","ciclos-agua-carbono","ciclos-agua-carbono","ciclos-agua-carbono",
    "energia","energia","energia","energia",
    "electricidad","electricidad","electricidad","electricidad",
    "magnetismo","magnetismo","magnetismo","magnetismo",
    "repaso-integral","repaso-integral","repaso-integral","repaso-integral",
]

# ===========================================================================
# QUESTION GENERATORS
# ===========================================================================

BLOOMS = ["Remember","Remember","Understand","Understand","Understand",
          "Apply","Apply","Analyze","Analyze","Evaluate"]
ICFES = ["Uso comprensivo del conocimiento científico","Indagación y Comprensión",
         "Explicación de fenómenos","Uso comprensivo del conocimiento científico",
         "Indagación y Comprensión","Formulación y Ejecución","Formulación y Ejecución",
         "Razonamiento y Argumentación","Explicación de fenómenos","Razonamiento y Argumentación"]
SUCCESS = [0.85,0.80,0.75,0.70,0.65,0.60,0.55,0.50,0.50,0.45]

def Q(bloom, icfes, success, stem, opts, expl):
    return (bloom, icfes, success, stem, opts, expl)

# Format: segment -> {week_name -> [10 Q tuples]}
# Each Q: (bloom, icfes, success, stem, [(letter,text,fb),...], expl)

from gen_complete_data import ALL_QUESTIONS

# ===========================================================================
# BUNDLE WRITER
# ===========================================================================

def write_bundle(grado, semana, segmento, questions):
    n = semana[1:]
    id_str = f"CO-CIE-{grado}-2026-W{n}-{segmento}-001-MASTERY"
    filename = f"{id_str}-bundle.md"
    
    titulo = TITULOS.get(segmento, segmento.replace("-"," ").title())
    bundle_title = f"Bundle Mastery: {titulo} — Grado {grado}, Semana {n}"
    
    rubricas = {
        "seres-vivos":"Seres vivos: características, funciones vitales, diferencia con objetos inertes",
        "plantas":"Plantas: partes, fotosíntesis básica, germinación, importancia ecológica",
        "animales":"Animales: clasificación básica, hábitats, alimentación, reproducción",
        "repaso-p1":"Repaso Periodo 1: conceptos fundamentales de ciencias naturales",
        "repaso-p2":"Repaso Periodo 2: conceptos fundamentales de ciencias naturales",
        "agua":"Agua: propiedades, estados, ciclo del agua, importancia y cuidado",
        "aire-clima":"Aire y clima: composición, clima en Colombia, fenómenos atmosféricos",
        "suelo-recursos":"Suelo y recursos naturales: componentes, tipos, formación, conservación",
        "luz-sonido":"Luz y sonido: fuentes, propagación, propiedades básicas",
        "sistema-solar":"Sistema solar: Sol, planetas, Luna, movimientos de la Tierra",
        "repaso-integral":"Repaso integral: contenidos del año escolar en ciencias naturales",
        "celula":"Célula: concepto, partes básicas, célula animal y vegetal, unicelulares y pluricelulares",
        "tejidos-sistemas":"Tejidos y sistemas: concepto de tejido, sistemas esquelético, muscular y nervioso",
        "digestivo-nutricion":"Sistema digestivo y nutrición: órganos, proceso digestivo, alimentación saludable",
        "ecosistemas-colombia":"Ecosistemas colombianos: selvas, páramos, manglares, ecosistemas acuáticos",
        "cadenas-alimenticias":"Cadenas alimenticias: productores, consumidores, descomponedores, redes tróficas",
        "materia-propiedades":"Materia y sus propiedades: masa, volumen, estados, mezclas",
        "cambios-estado":"Cambios de estado: fusión, solidificación, evaporación, condensación",
        "maquinas-simples":"Máquinas simples: palanca, rueda, plano inclinado, polea, tornillo, cuña",
        "clasificacion-reinos":"Clasificación de seres vivos: cinco reinos, características principales",
        "respiratorio-circulatorio":"Sistema respiratorio y circulatorio: órganos, procesos, relación",
        "nervioso-locomotor":"Sistema nervioso y locomotor: neuronas, huesos, músculos, coordinación",
        "ecosistemas-relaciones":"Relaciones en ecosistemas: interespecíficas, sucesión, impacto humano",
        "ciclos-agua-carbono":"Ciclos del agua y del carbono: hidrológico, fotosíntesis, efecto invernadero",
        "energia":"Energía: fuentes renovables y no renovables, transformación, eficiencia",
        "electricidad":"Electricidad básica: carga, corriente, circuitos simples, seguridad",
        "magnetismo":"Magnetismo y electroimanes: imanes, campo magnético, aplicaciones",
    }
    rubrica = rubricas.get(segmento, segmento)
    
    dir_path = os.path.join(BASE, f"grado-{grado}", "2026", "weekly")
    os.makedirs(dir_path, exist_ok=True)
    filepath = os.path.join(dir_path, filename)
    
    lines = [
        "---",
        f'id: "{id_str}"',
        'country: "colombia"',
        f"grado: {grado}",
        'asignatura: "ciencias-naturales"',
        f'tema: "{segmento}"',
        f'semana: "W{n}"',
        'protocol_version: "5.2"',
        "year: 2026",
        "bundle_index: 1",
        "bundle_size: 10",
        'alignment: "DBA MEN + Estándares Básicos de Ciencias Naturales"',
        "modern_context: true",
        "distractor_profile: plausible_peer_set",
        f'rubric_baseline: "{rubrica}"',
        "---",
        "",
        f"# {bundle_title}",
        "",
        f"Este bundle cubre los contenidos de {rubrica.lower()}. Alineado con los DBA del MEN para grado {grado} en Colombia.",
        "",
        "---",
        "",
    ]
    
    for idx, (bloom, icfes, success, stem, opts, expl) in enumerate(questions[:10]):
        v = idx + 1
        did = min(v, 5)
        city, school = random.choice(CIUDADES)
        
        lines.append(f"## Pregunta {v} [D{did}]")
        lines.append("")
        lines.append(f"**ID:** `{id_str}-v{v}`")
        lines.append(f"**Bloom:** {bloom}")
        lines.append(f"**ICFES:** {icfes}")
        lines.append(f"**Expected_Success:** {success:.2f}")
        lines.append(f"**Context:** En {school} en {city}.")
        lines.append("")
        lines.append("### Enunciado")
        lines.append("")
        lines.append(stem)
        lines.append("")
        lines.append("### Opciones")
        
        for i, (letra, texto, fb) in enumerate(opts):
            chk = "[x]" if i == 0 else "[ ]"
            lines.append(f"- {chk} {letra}) {texto} <!-- feedback: {fb} -->")
        
        lines.append("")
        lines.append("### Explicación Pedagógica")
        lines.append("")
        lines.append(expl)
        lines.append("")
        lines.append("---")
        lines.append("")
    
    with open(filepath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    return filename

# ===========================================================================
# MAIN
# ===========================================================================

def main():
    grade_configs = [
        (3, G3_SEGMENTS),
        (4, G4_SEGMENTS),
        (5, G5_SEGMENTS),
    ]
    
    total = 0
    skipped = 0
    
    for grado, segs in grade_configs:
        for i, segmento in enumerate(segs):
            semana = f"W{i+1:02d}"
            key = (grado, segmento, semana)
            
            if key not in ALL_QUESTIONS:
                print(f"  ⚠ SKIP G{grado} {semana} ({segmento}) - no question data")
                skipped += 1
                continue
            
            qs = ALL_QUESTIONS[key]
            fname = write_bundle(grado, semana, segmento, qs)
            total += 1
            
            if total % 20 == 0:
                print(f"  [{total}] Generados hasta {semana} G{grado}...")
    
    print(f"\n✅ Generados: {total} bundles")
    if skipped:
        print(f"⚠ Omitidos (sin datos): {skipped}")

if __name__ == "__main__":
    main()
