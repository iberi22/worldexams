#!/usr/bin/env python3
"""
SOCIALES CIUDADANAS Colombia Grado 6 - Weekly Bundles Generator (W01-W40)

Generates 40 markdown files with 10 questions each = 400 questions total.
Alineado con DBA MEN + Estándares Básicos de Competencias Ciudadanas G6.

Usage: python _gen_all.py
"""

import os, json

OUT = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly"
PROTO = "5.2"
YEAR = 2026

# ── Week config: w -> (slug, title, rubric) ─────────────────────────────
W = {}

def add(w, slug, title, rubric):
    W[w] = {"slug": slug, "title": title, "rubric": rubric, "qs": []}

add(1,  "la-prehistoria-etapas",          "La Prehistoria: Etapas",          "prehistoria, paleolitico, neolitico, edad_metales, hominidos, evolucion")
add(2,  "la-prehistoria-paleolitico",     "La Prehistoria: Paleolítico",     "paleolitico, caza, nomadas, herramientas_piedra, fuego, arte_rupestre")
add(3,  "la-prehistoria-neolitico",       "La Prehistoria: Neolítico",       "neolitico, revolucion_agricola, sedentarismo, domesticacion, ceramica")
add(4,  "primeras-civilizaciones-mesopotamia","Primeras Civilizaciones: Mesopotamia","mesopotamia, sumerios, escritura_cuneiforme, hammurabi, zigurats")
add(5,  "primeras-civilizaciones-egipto", "Primeras Civilizaciones: Egipto", "egipto, nilo, faraones, piramides, jeroglificos, momificacion, teocracia")
add(6,  "primeras-civilizaciones-india-china","Primeras Civilizaciones: India y China","india, china, hinduismo, budismo, confucianismo, castas")
add(7,  "fenicios-hebreos-persas",        "Fenicios, Hebreos y Persas",      "fenicios, hebreos, persas, alfabeto, monoteismo, ciro, satrapias")
add(8,  "repaso-p1",                     "Repaso P1: Prehistoria y Primeras Civilizaciones","repaso, prehistoria, mesopotamia, egipto, india, china, fenicios, hebreos, persas")
add(9,  "grecia-antigua-organizacion-politica","Grecia Antigua: Organización Política","grecia, polis, atenas, esparta, democracia, pericles, alejandro")
add(10, "grecia-antigua-cultura-arte",   "Grecia Antigua: Cultura y Arte",  "filosofia, arte, arquitectura, escultura, teatro, olimpiadas, mitologia")
add(11, "grecia-antigua-guerras-conquistas","Grecia Antigua: Guerras y Conquistas","guerras_medicas, peloponeso, alejandro_magno, helenismo, termopilas")
add(12, "repaso-p2",                     "Repaso P2: Grecia Antigua",        "repaso, grecia, polis, democracia, filosofia, arte, guerras, alejandro")
add(13, "roma-antigua-monarquia-republica","Roma Antigua: Monarquía y República","roma, republica, senado, patricios, plebeyos, derecho_romano, punicas")
add(14, "roma-antigua-imperio",          "Roma Antigua: El Imperio",         "imperio_romano, augusto, pax_romana, cristianismo, caida_imperio")
add(15, "roma-antigua-cultura-derecho",  "Roma Antigua: Cultura y Derecho",  "cultura_romana, derecho, doce_tablas, corpus_iuris, acueductos, latin")
add(16, "repaso-p3",                     "Repaso P3: Roma Antigua",          "repaso, roma, republica, imperio, derecho, guerras_punicas, legado")
add(17, "edad-media-caida-imperio-romano","Edad Media: Caída del Imperio Romano","caida_imperio, invasiones_barbaras, bizantino, islam, carlomagno")
add(18, "edad-media-feudalismo",         "Edad Media: El Feudalismo",        "feudalismo, vasallaje, feudo, siervos, castillo, sociedad_estamental")
add(19, "edad-media-iglesia-cultura",    "Edad Media: Iglesia y Cultura",    "iglesia, monacato, romanico, gotico, universidad, escolastica, cruzadas")
add(20, "edad-media-comercio-ciudades",  "Edad Media: Comercio y Ciudades",  "comercio_medieval, burguesia, gremios, urbes, hans, renacimiento_urbano")
add(21, "repaso-p4",                     "Repaso P4: Edad Media",            "repaso, edad_media, feudalismo, iglesia, comercio, ciudades, legado")
add(22, "edad-moderna-renacimiento",     "Edad Moderna: Renacimiento",       "renacimiento, humanismo, arte_renacentista, ciencia, imprenta")
add(23, "edad-moderna-descubrimiento-america","Edad Moderna: Descubrimiento de América","1492, colon, navegacion, carabelas, intercambio_colombino")
add(24, "edad-moderna-conquista-america","Edad Moderna: Conquista y Colonización de América","conquista, cortes, pizarro, aztecas, incas, virreinato, mestizaje")
add(25, "edad-moderna-reforma-contrarreforma","Edad Moderna: Reforma y Contrarreforma","reforma, luterana, contrarreforma, trento, jesuitas, guerras_religion")
add(26, "repaso-p5",                     "Repaso P5: Edad Moderna",          "repaso, renacimiento, descubrimiento, conquista, reforma, legado")
add(27, "la-tierra-sistema-solar",       "La Tierra en el Sistema Solar",    "sistema_solar, tierra, sol, rotacion, traslacion, estaciones")
add(28, "mapas-tipos-elementos",         "Mapas: Tipos y Elementos",         "mapas, cartografia, escala, leyenda, rosa_vientos, orientacion, proyeccion")
add(29, "coordenadas-geograficas",       "Coordenadas Geográficas",          "latitud, longitud, paralelos, meridianos, ecuador, greenwich, hemisferios")
add(30, "husos-horarios",                "Husos Horarios",                   "husos_horarios, GMT, UTC, linea_fecha, colombia_hora, diferencia_horaria")
add(31, "repaso-p6",                     "Repaso P6: Geografía Física",     "repaso, sistema_solar, mapas, coordenadas, husos_horarios")
add(32, "economia-produccion",           "Economía: Procesos de Producción", "produccion, sectores, primario, secundario, terciario, factores_productivos")
add(33, "economia-distribucion-consumo", "Economía: Distribución y Consumo", "distribucion, consumo, mercado, oferta_demanda, consumo_responsable")
add(34, "publicidad-consumo-responsable","Publicidad y Consumo Responsable", "publicidad, consumo_responsable, derechos_consumidor, medios")
add(35, "repaso-p7",                     "Repaso P7: Economía y Consumo",    "repaso, economia, produccion, consumo, publicidad, mercado")
add(36, "poblacion-mundial-distribucion","La Población Mundial: Distribución","poblacion, demografia, distribucion, densidad, censo, urbanizacion")
add(37, "migraciones-multiculturalidad", "Migraciones y Multiculturalidad",  "migraciones, multiculturalidad, globalizacion, identidad, colombia")
add(38, "la-democracia-como-sistema",    "La Democracia como Sistema Político","democracia, participacion, constitucion_1991, elecciones, partidos")
add(39, "derechos-humanos-fundamentales","Derechos Humanos Fundamentales",   "derechos_humanos, constitucion_1991, DUDH, igualdad, dignidad, justicia")
add(40, "repaso-integral-anual",         "Repaso Integral Anual",            "repaso_anual, historia, geografia, economia, democracia, contenidos")

def make_q(bloom, icfes, stem, opts, correct_idx, explanation):
    """Create question dict. opts = [A,B,C,D], correct_idx=0..3"""
    labels = ["A","B","C","D"]
    options = []
    for i, txt in enumerate(opts):
        fb = "Correcto!" if i == correct_idx else "Incorrecto."
        options.append([labels[i], txt, fb])
    return {
        "bloom": bloom,
        "icfes": icfes,
        "stem": stem,
        "options": options,
        "correct": labels[correct_idx],
        "explanation": explanation
    }

# ═══════════════════════════════════════════════════════════════════════════
# QUESTIONS DATA — loaded from _gen_data directory
# ═══════════════════════════════════════════════════════════════════════════

# Load question parts from data files
_data_dir = os.path.join(os.path.dirname(__file__), "_gen_data")
os.makedirs(_data_dir, exist_ok=True)

def save_questions():
    """Save all question data to JSON files for later loading."""
    for w, cfg in W.items():
        if not cfg["qs"]:
            continue
        fpath = os.path.join(_data_dir, f"qs_w{w:02d}.json")
        with open(fpath, "w", encoding="utf-8") as f:
            json.dump(cfg["qs"], f, ensure_ascii=False)

def load_questions():
    """Load question data from JSON files."""
    for w in W:
        fpath = os.path.join(_data_dir, f"qs_w{w:02d}.json")
        if os.path.exists(fpath):
            with open(fpath, "r", encoding="utf-8") as f:
                W[w]["qs"] = json.load(f)

# ═══════════════════════════════════════════════════════════════════════════
# Output writer
# ═══════════════════════════════════════════════════════════════════════════

def qid(w, slug, n):
    return f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY-v{n+1}"

def render_and_write(w, cfg):
    slug, title, rubric, qs = cfg["slug"], cfg["title"], cfg["rubric"], cfg["qs"]
    if not qs:
        print(f"  SKIP W{w:02d}: no questions")
        return False
    id_str = f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY"
    fname = f"{id_str}-bundle.md"
    fpath = os.path.join(OUT, fname)

    lines = []
    lines.append("---")
    lines.append(f'id: "{id_str}"')
    lines.append('country: "colombia"')
    lines.append("grado: 6")
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append(f'tema: "{slug}"')
    lines.append(f"semana: {w}")
    lines.append(f'protocol_version: "{PROTO}"')
    lines.append(f"year: {YEAR}")
    lines.append("bundle_index: 1")
    lines.append(f"bundle_size: {len(qs)}")
    lines.append('alignment: "DBA MEN + Estándares Básicos de Competencias Ciudadanas"')
    lines.append("modern_context: true")
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append("calibration:")
    lines.append("  expected_success_rate: 0.65")
    lines.append('  discrimination_index_target: ">= 0.22"')
    lines.append("  simulated_responses: 100")
    lines.append(f'rubric_baseline: "{rubric}"')
    lines.append("---")
    lines.append("")
    lines.append(f"# Bundle Mastery: {title} – Semana {w}")
    lines.append("")
    lines.append(f"Este bundle cubre los temas correspondientes a la semana {w}. Alineado con los DBA de Competencias Ciudadanas para grado 6.")
    lines.append("")

    for i, q in enumerate(qs):
        lines.append("---")
        lines.append("")
        lines.append(f"## Question {i+1}")
        lines.append("")
        lines.append(f"**ID:** `{qid(w, slug, i)}`")
        lines.append(f"**Bloom:** {q['bloom']}")
        if q.get('icfes'):
            lines.append(f"**ICFES:** {q['icfes']}")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q['stem'])
        lines.append("")
        lines.append("### Options")
        for label, text, fb in q['options']:
            marker = "x" if label == q['correct'] else " "
            lines.append(f"- [{marker}] {label}) {text} <!-- feedback: {fb} -->")
        lines.append("")
        lines.append("### Explicación Pedagógica")
        lines.append(q['explanation'])
        lines.append("")

    with open(fpath, "w", encoding="utf-8") as f:
        f.write("\n".join(lines) + "\n")
    print(f"  ✓ W{w:02d}: {fname} ({len(qs)} preg)")
    return True

# ═══════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    import sys

    # Check if data files exist, if not, populate questions
    load_questions()
    missing_weeks = [w for w in W if not W[w]["qs"]]

    if missing_weeks:
        print(f"Need to generate question data for weeks: {missing_weeks}")
        print("Run _gen_data_p1.py through _gen_data_p4.py first to populate question data.")
        print("Or run: python _gen_all.py --generate")
        if "--generate" in sys.argv:
            print("Generating all question data...")
            # Import the data generators
            for part in ["_gen_data_p1", "_gen_data_p2", "_gen_data_p3", "_gen_data_p4"]:
                try:
                    __import__(part)
                except ImportError:
                    print(f"  Could not import {part}")
            save_questions()
            load_questions()
        else:
            sys.exit(1)

    # Write all bundles
    ok = 0
    for w in sorted(W):
        if render_and_write(w, W[w]):
            ok += 1

    print(f"\n=> {ok}/{len(W)} bundles generated.")
