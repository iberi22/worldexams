#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
Generador Masivo de Weekly Packs para Ciencias Naturales
G3, G4, G5 - W01 a W40 (año 2026)
=====================================================
Genera ~106 bundles (~1060 preguntas) con datos estructurados por tema.
Cada semana: 10 preguntas, Blooms variados, contexto colombiano.
"""

import os, random, sys

random.seed(2026)
BASE = os.path.join(os.environ.get("worldexams_dir","E:/scripts-python/worldexams"),
                    "questions_data","colombia","ciencias-naturales")

CIUDADES = [
    ("Bogotá DC","Colegio La Salle en Bogotá"),
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
    ("Leticia (Amazonas)","Escuela Rural La Esperanza"),
    ("Quibdó (Chocó)","IE Técnica de Quibdó"),
    ("Mocoa (Putumayo)","Escuela Ecológica de Mocoa"),
    ("San Andrés Islas","Colegio Sagrado Corazón"),
]

TITULOS = {
    "seres-vivos":"Seres Vivos y su Entorno",
    "plantas":"Las Plantas",
    "animales":"Los Animales",
    "repaso-p1":"Repaso Periodo 1",
    "repaso-p2":"Repaso Periodo 2",
    "agua":"El Agua y sus Estados",
    "aire-clima":"El Aire y el Clima",
    "suelo-recursos":"El Suelo y los Recursos Naturales",
    "luz-sonido":"La Luz y el Sonido",
    "sistema-solar":"El Sistema Solar",
    "repaso-integral":"Repaso Integral",
    "celula":"La Célula",
    "tejidos-sistemas":"Tejidos y Sistemas del Cuerpo Humano",
    "digestivo-nutricion":"Sistema Digestivo y Nutrición",
    "ecosistemas-colombia":"Ecosistemas Colombianos",
    "cadenas-alimenticias":"Cadenas Alimenticias",
    "materia-propiedades":"Materia y sus Propiedades",
    "cambios-estado":"Cambios de Estado",
    "maquinas-simples":"Máquinas Simples",
    "clasificacion-reinos":"Clasificación de los Seres Vivos",
    "respiratorio-circulatorio":"Sistema Respiratorio y Circulatorio",
    "nervioso-locomotor":"Sistema Nervioso y Locomotor",
    "ecosistemas-relaciones":"Relaciones en los Ecosistemas",
    "ciclos-agua-carbono":"Ciclos del Agua y del Carbono",
    "energia":"Energía: Fuentes Renovables y No Renovables",
    "electricidad":"Electricidad Básica",
    "magnetismo":"Magnetismo y Electroimanes",
}

RUBRICAS = {
    "seres-vivos":"Seres vivos: características, funciones vitales, diferencia con objetos inertes, hábitats",
    "plantas":"Plantas: partes de la planta, fotosíntesis básica, germinación, importancia",
    "animales":"Animales: clasificación básica, hábitats, alimentación, reproducción",
    "repaso-p1":"Repaso Periodo 1: conceptos fundamentales de ciencias naturales - primer bimestre",
    "repaso-p2":"Repaso Periodo 2: conceptos fundamentales de ciencias naturales - segundo bimestre",
    "agua":"Agua: propiedades, estados, ciclo del agua, importancia y cuidado",
    "aire-clima":"Aire y clima: composición del aire, clima, fenómenos atmosféricos, contaminación",
    "suelo-recursos":"Suelo y recursos naturales: componentes, tipos, formación, conservación",
    "luz-sonido":"Luz y sonido: fuentes, propagación, propiedades, sentido de la vista y el oído",
    "sistema-solar":"Sistema solar: Sol, planetas, Luna, movimientos de la Tierra",
    "repaso-integral":"Repaso integral: contenidos del año escolar - todos los temas",
    "celula":"Célula: concepto, partes básicas, célula animal y vegetal, unicelulares y pluricelulares",
    "tejidos-sistemas":"Tejidos y sistemas: concepto de tejido, sistemas esquelético, muscular, nervioso",
    "digestivo-nutricion":"Sistema digestivo y nutrición: órganos, proceso digestivo, alimentación saludable",
    "ecosistemas-colombia":"Ecosistemas colombianos: selvas, páramos, manglares, ecosistemas acuáticos",
    "cadenas-alimenticias":"Cadenas alimenticias: productores, consumidores, descomponedores, redes tróficas",
    "materia-propiedades":"Materia y sus propiedades: masa, volumen, estados, mezclas, cambios físicos y químicos",
    "cambios-estado":"Cambios de estado: fusión, solidificación, evaporación, condensación, aplicaciones",
    "maquinas-simples":"Máquinas simples: palanca, rueda, plano inclinado, polea, tornillo, cuña",
    "clasificacion-reinos":"Clasificación de seres vivos: cinco reinos, características, ejemplos colombianos",
    "respiratorio-circulatorio":"Sistema respiratorio y circulatorio: órganos, procesos, relación, enfermedades",
    "nervioso-locomotor":"Sistema nervioso y locomotor: neuronas, huesos, músculos, coordinación",
    "ecosistemas-relaciones":"Relaciones en ecosistemas: interespecíficas, sucesión ecológica, impacto humano",
    "ciclos-agua-carbono":"Ciclos del agua y del carbono: hidrológico, fotosíntesis, efecto invernadero",
    "energia":"Energía: fuentes renovables y no renovables, transformación, eficiencia",
    "electricidad":"Electricidad básica: carga, corriente, circuitos, conductores, seguridad",
    "magnetismo":"Magnetismo y electroimanes: imanes, campo magnético, aplicaciones tecnológicas",
}

# ============================================================================
# DATOS DE PREGUNTAS
# Estructura: { (grado,segment): [10-tuples for each week in this segment] }
# Cada tuple: (enunciado, [(letra,texto,feedback),(...),...], explicacion)
# ============================================================================

# Vamos a cargar desde un archivo externo para mantener esto manejable
from preguntas_data import *

# ============================================================================
# GENERADOR DE BUNDLE
# ============================================================================

def generar_bundle(grado, semana, segmento, rubrica, preguntas, year=2026):
    """Genera un archivo .md de bundle con 10 preguntas."""
    n = semana[1:]  # "01" de "W01"
    id_str = f"CO-CIE-{grado}-{year}-W{n}-{segmento}-001-MASTERY"
    filename = f"{id_str}-bundle.md"
    
    titulo = TITULOS.get(segmento, segmento.replace("-"," ").title())
    bundle_title = f"Bundle Mastery: {titulo} — Grado {grado}, Semana {n}"
    
    dir_path = os.path.join(BASE, f"grado-{grado}", str(year), "weekly")
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
        f"year: {year}",
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
    
    blooms = ["Remember","Remember","Understand","Understand","Understand",
              "Apply","Apply","Analyze","Analyze","Evaluate"]
    icfes_cats = ["Uso comprensivo del conocimiento científico","Indagación y Comprensión",
                  "Explicación de fenómenos","Uso comprensivo del conocimiento científico",
                  "Indagación y Comprensión","Formulación y Ejecución","Formulación y Ejecución",
                  "Razonamiento y Argumentación","Explicación de fenómenos","Razonamiento y Argumentación"]
    success_rates = [0.85,0.80,0.75,0.70,0.65,0.60,0.55,0.50,0.50,0.45]
    
    for idx, (enunciado, opciones, explicacion) in enumerate(preguntas[:10]):
        v = idx + 1
        did = min(v, 5)
        bloom = blooms[idx]
        icfes = icfes_cats[idx]
        success = success_rates[idx]
        
        city, school = random.choice(CIUDADES)
        context = f"En {school} en {city}."
        
        lines.append(f"## Pregunta {v} [D{did}]")
        lines.append("")
        lines.append(f"**ID:** `{id_str}-v{v}`")
        lines.append(f"**Bloom:** {bloom}")
        lines.append(f"**ICFES:** {icfes}")
        lines.append(f"**Expected_Success:** {success:.2f}")
        lines.append(f"**Context:** {context}")
        lines.append("")
        lines.append("### Enunciado")
        lines.append("")
        lines.append(enunciado)
        lines.append("")
        lines.append("### Opciones")
        
        for i, (letra, texto, feedback) in enumerate(opciones):
            checked = "[x]" if i == 0 else "[ ]"
            lines.append(f"- {checked} {letra}) {texto} <!-- feedback: {feedback} -->")
        
        lines.append("")
        lines.append("### Explicación Pedagógica")
        lines.append("")
        lines.append(explicacion)
        lines.append("")
        lines.append("---")
        lines.append("")
    
    content = "\n".join(lines)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    return filepath

# ============================================================================
# CARGA DE PREGUNTAS
# ============================================================================

def cargar_preguntas():
    """Carga preguntas desde preguntas_data.py"""
    global G3_DATA, G4_DATA, G5_DATA
    
    segments_g3 = ["seres-vivos","seres-vivos","seres-vivos","seres-vivos",
                    "plantas","plantas","plantas","plantas",
                    "animales","animales","animales","animales",
                    "repaso-p1","repaso-p1","repaso-p2","repaso-p2",
                    "agua","agua","agua","agua",
                    "aire-clima","aire-clima","aire-clima","aire-clima",
                    "suelo-recursos","suelo-recursos","suelo-recursos","suelo-recursos",
                    "luz-sonido","luz-sonido","luz-sonido","luz-sonido",
                    "sistema-solar","sistema-solar","sistema-solar","sistema-solar",
                    "repaso-integral","repaso-integral","repaso-integral","repaso-integral"]
    
    # Build week -> segment mapping
    G3_WEEKS = {f"W{i+1:02d}": segments_g3[i] for i in range(40)}
    G4_WEEKS = {}
    G5_WEEKS = {}
    return G3_WEEKS, G4_WEEKS, G5_WEEKS

# ============================================================================
# MAIN
# ============================================================================

def main():
    import preguntas_data
    
    g3_weeks, g4_weeks, g5_weeks = preguntas_data.G3_WEEKS, preguntas_data.G4_WEEKS, preguntas_data.G5_WEEKS
    
    total = 0
    for grado, weeks in [(3, g3_weeks), (4, g4_weeks), (5, g5_weeks)]:
        for semana, segmento in sorted(weeks.items()):
            rubrica = RUBRICAS.get(segmento, segmento)
            qlist = preguntas_data.QDATA.get((grado, segmento, semana), 
                    preguntas_data.QDATA_FALLBACK.get((grado, segmento), None))
            if qlist is None:
                print(f"  ⚠ SKIP G{grado} {semana} - no questions available")
                continue
            fp = generar_bundle(grado, semana, segmento, rubrica, qlist)
            total += 1
            if total % 10 == 0:
                print(f"  [{total}] Generados...")
    
    print(f"\n✅ Total generados: {total} bundles")

if __name__ == "__main__":
    main()
