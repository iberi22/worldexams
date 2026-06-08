#!/usr/bin/env python3
"""Master generator: produce all 33 bundles W08-W40."""
import os, sys, glob, json, copy

OUT_DIR = r"E:\scripts-python\worldexams\questions_data\colombia\sociales-ciudadanas\grado-6\2026\weekly"
GEN_DIR = os.path.join(OUT_DIR, "_gen_bundles")
os.makedirs(OUT_DIR, exist_ok=True)

# Load question data from all gen_q* files
ALL = {}
for f in sorted(glob.glob(os.path.join(GEN_DIR, "gen_q*.py"))):
    ns = {}
    exec(open(f, encoding='utf-8').read(), ns)
    ALL.update(ns.get('ALL', {}))

# Also load from the main generate.py
gen_main = os.path.join(GEN_DIR, "generate.py")
if os.path.exists(gen_main):
    ns = {}
    exec(open(gen_main, encoding='utf-8').read(), ns)
    ALL.update(ns.get('ALL', {}))

TOPICS = {
    8: {"slug":"primeras-civilizaciones-mesopotamia","title":"Primeras Civilizaciones: Mesopotamia"},
    9: {"slug":"primeras-civilizaciones-egipto","title":"Primeras Civilizaciones: Egipto"},
    10: {"slug":"primeras-civilizaciones-india-china","title":"Primeras Civilizaciones: India y China"},
    11: {"slug":"primeras-civilizaciones-fenicios-hebreos-persas","title":"Primeras Civilizaciones: Fenicios, Hebreos y Persas"},
    12: {"slug":"repaso-p2","title":"Repaso P2: Civilizaciones Antiguas"},
    13: {"slug":"grecia-antigua-organizacion-politica","title":"Grecia Antigua: Organizacion Politica"},
    14: {"slug":"grecia-antigua-cultura-arte","title":"Grecia Antigua: Cultura y Arte"},
    15: {"slug":"roma-antigua-republica","title":"Roma Antigua: La Republica"},
    16: {"slug":"roma-antigua-imperio","title":"Roma Antigua: El Imperio"},
    17: {"slug":"repaso-p3","title":"Repaso P3: Grecia y Roma"},
    18: {"slug":"edad-media-caida-imperio-romano","title":"Edad Media: Caida del Imperio Romano"},
    19: {"slug":"edad-media-feudalismo","title":"Edad Media: El Feudalismo"},
    20: {"slug":"edad-media-iglesia-cultura","title":"Edad Media: Iglesia y Cultura"},
    21: {"slug":"edad-media-comercio-ciudades","title":"Edad Media: Comercio y Ciudades"},
    22: {"slug":"repaso-p4","title":"Repaso P4: Edad Media"},
    23: {"slug":"edad-moderna-renacimiento","title":"Edad Moderna: Renacimiento"},
    24: {"slug":"edad-moderna-descubrimiento-america","title":"Edad Moderna: Descubrimiento de America"},
    25: {"slug":"edad-moderna-conquista-america","title":"Edad Moderna: Conquista de America"},
    26: {"slug":"edad-moderna-reforma-contrarreforma","title":"Edad Moderna: Reforma y Contrarreforma"},
    27: {"slug":"repaso-p5","title":"Repaso P5: Edad Moderna"},
    28: {"slug":"la-tierra-sistema-solar","title":"La Tierra en el Sistema Solar"},
    29: {"slug":"mapas-tipos-elementos","title":"Mapas: Tipos y Elementos"},
    30: {"slug":"coordenadas-geograficas","title":"Coordenadas Geograficas"},
    31: {"slug":"husos-horarios","title":"Husos Horarios"},
    32: {"slug":"repaso-p6","title":"Repaso P6: Geografia Fisica"},
    33: {"slug":"economia-produccion","title":"Economia: Procesos de Produccion"},
    34: {"slug":"economia-distribucion-consumo","title":"Economia: Distribucion y Consumo"},
    35: {"slug":"publicidad-medios-comunicacion","title":"Publicidad y Medios de Comunicacion"},
    36: {"slug":"repaso-p7","title":"Repaso P7: Economia y Medios"},
    37: {"slug":"poblacion-mundial-distribucion","title":"Poblacion Mundial: Distribucion"},
    38: {"slug":"migraciones-cultura-global","title":"Migraciones y Cultura Global"},
    39: {"slug":"la-democracia-como-sistema","title":"La Democracia como Sistema"},
    40: {"slug":"repaso-integral-anual","title":"Repaso Integral Anual"},
}

def make_bundle(w, topic, questions):
    slug = topic["slug"]
    title = topic["title"]
    filename = f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY-bundle.md"
    filepath = os.path.join(OUT_DIR, filename)
    
    # Build frontmatter
    lines = ["---"]
    lines.append(f'id: "CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY"')
    lines.append('country: "colombia"')
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append(f'tema: "{title}"')
    lines.append(f'grado: {6}')
    lines.append(f'semana: {w}')
    lines.append(f'protocol_version: "{PROTO}"' if 'PROTO' in dir() else f'protocol_version: "5.2"')
    lines.append('bundle_index: 1')
    lines.append(f'bundle_size: {len(questions)}')
    lines.append('')
    # Calibration
    lines.append('calibration:')
    lines.append('  expected_success_rate: 0.65')
    lines.append('  discrimination_index_target: ">= 0.22"')
    lines.append('  simulated_responses: 100')
    lines.append('')
    # Rubric baseline (simple string)
    lines.append(f'rubric_baseline: "{slug.replace("-", "_")}"')
    lines.append('---')
    lines.append('')
    
    # Title
    lines.append(f'# {title}')
    lines.append('')
    lines.append(f'Preguntas de Sociales Ciudadanas para grado 6 - Semana {w}.')
    lines.append('')
    
    # Questions
    for idx, qq in enumerate(questions):
        vn = idx + 1
        qid = f"CO-SOC-6-2026-W{w:02d}-{slug}-001-MASTERY-v{vn}"
        lines.append(f'## Pregunta {vn}')
        lines.append('')
        lines.append(f'**ID:** {qid}')
        lines.append('')
        lines.append(f'**Taxonomia:** Bloom: _{qq["bloom"]}_ | ICFES: _{qq["icfes"]}_')
        lines.append('')
        lines.append(f'{qq["stem"]}')
        lines.append('')
        for opt in qq["options"]:
            letter = opt[0]
            text = opt[1]
            feedback = opt[2] if len(opt) > 2 else ""
            lines.append(f'- **{letter}.** {text}')
        lines.append('')
        lines.append(f'> **Respuesta correcta:** {qq["correct"]}')
        lines.append('')
        lines.append(f'**Retroalimentacion:** {qq["explanation"]}')
        lines.append('')
    
    content = '\n'.join(lines)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    return filename

# Generate bundles
generated = 0
for w in sorted(ALL.keys()):
    if w not in TOPICS:
        print(f"W{w}: no topic config, skipping")
        continue
    questions = ALL[w]
    if len(questions) != 10:
        print(f"W{w}: {len(questions)} questions (expected 10)!")
    topic = TOPICS[w]
    filename = make_bundle(w, topic, questions)
    print(f"W{w:02d}: {filename} ({len(questions)} preguntas)")
    generated += 1

print(f"\nTotal: {generated} bundles generated")
