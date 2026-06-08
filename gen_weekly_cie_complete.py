#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""Part 1 of CIE generator - core engine and G3 data."""

import os, random, json

random.seed(2026)

BASE = r"E:\scripts-python\worldexams\questions_data\colombia\ciencias-naturales"
DATA_DIR = r"E:\scripts-python\worldexams"

BLOOMS = ["Remember","Remember","Understand","Understand","Understand",
          "Apply","Apply","Analyze","Analyze","Evaluate"]
ICFES = ["Indagaci\u00f3n y Comprensi\u00f3n","Uso comprensivo del conocimiento cient\u00edfico",
         "Explicaci\u00f3n de fen\u00f3menos","Indagaci\u00f3n y Comprensi\u00f3n",
         "Uso comprensivo del conocimiento cient\u00edfico","Formulaci\u00f3n y Ejecuci\u00f3n",
         "Razonamiento y Argumentaci\u00f3n","Explicaci\u00f3n de fen\u00f3menos",
         "Razonamiento y Argumentaci\u00f3n","Uso comprensivo del conocimiento cient\u00edfico"]
EXPECTED = [0.85,0.80,0.75,0.70,0.65,0.60,0.55,0.50,0.50,0.45]

CIUDADES = [
    ("Bogot\u00e1","Colegio La Salle"), ("Medell\u00edn","IE San Jos\u00e9"),
    ("Cali","Colegio Santa Cecilia"), ("Barranquilla","Escuela Normal Superior"),
    ("Bucaramanga","Colegio San Pedro"), ("Cartagena","IE San Felipe"),
    ("Pereira","Colegio SURAMERICANA"), ("Manizales","Escuela Normal"),
    ("Ibagu\u00e9","Colegio San Sim\u00f3n"), ("Neiva","IE Santa Teresa"),
    ("Sincelejo","Colegio Francisco de Paula"), ("Valledupar","IE Alfonso L\u00f3pez"),
    ("Riohacha","Colegio Jos\u00e9 Mar\u00eda C\u00f3rdoba"), ("Pasto","Colegio San Francisco Javier"),
    ("Tunja","Escuela Normal Santiago"), ("C\u00facuta","Colegio San Jos\u00e9"),
    ("Leticia","Escuela Rural La Esperanza"), ("Quibd\u00f3","IE T\u00e9cnica"),
    ("Mocoa","Escuela Ecol\u00f3gica"), ("San Andr\u00e9s","Colegio Sagrado Coraz\u00f3n"),
]

def ciudad():
    return random.choice(CIUDADES)

TOPICS = {
    3: [(1,"seres-vivos","Seres Vivos y su Entorno","Caracter\u00edsticas de los seres vivos, funciones vitales, objetos inertes, adaptaciones, h\u00e1bitats"),
        (5,"plantas","Las Plantas","Partes de la planta, fotos\u00edntesis b\u00e1sica, germinaci\u00f3n, adaptaciones vegetales"),
        (9,"animales","Los Animales","Clasificaci\u00f3n de animales, h\u00e1bitats, alimentaci\u00f3n, reproducci\u00f3n"),
        (13,"repaso-p1","Repaso Per\u00edodo 1","Repaso: seres vivos, plantas, animales"),
        (17,"agua","El Agua y sus Estados","Propiedades del agua, estados, ciclo del agua"),
        (21,"aire-clima","El Aire y el Clima","Composici\u00f3n del aire, clima colombiano, contaminaci\u00f3n"),
        (25,"suelo-recursos","El Suelo y los Recursos Naturales","Componentes del suelo, tipos, recursos renovables"),
        (29,"luz-sonido","La Luz y el Sonido","Luz y sonido: fuentes, propagaci\u00f3n, los sentidos"),
        (33,"sistema-solar","El Sistema Solar","Sistema solar: Sol, planetas, Luna, movimientos Tierra"),
        (37,"repaso-integral","Repaso Integral G3","Repaso integral ciencias naturales grado 3"),
    ],
    4: [(1,"celula","La C\u00e9lula","Concepto de c\u00e9lula, partes, c\u00e9lula animal y vegetal"),
        (5,"tejidos-sistemas","Tejidos y Sistemas","Tejidos, \u00f3rganos, sistemas \u00f3seo y muscular"),
        (9,"digestivo-nutricion","Sistema Digestivo y Nutrici\u00f3n","Sistema digestivo, nutrientes"),
        (13,"repaso-p1","Repaso Per\u00edodo 1 G4","Repaso: c\u00e9lula, tejidos, digesti\u00f3n"),
        (17,"ecosistemas-colombia","Ecosistemas Colombianos","P\u00e1ramos, selvas, manglares, biodiversidad"),
        (21,"cadenas-alimenticias","Cadenas Alimenticias","Productores, consumidores, descomponedores"),
        (25,"materia-propiedades","Materia y sus Propiedades","Propiedades de la materia, estados, mezclas"),
        (29,"cambios-estado","Cambios de Estado","Fusi\u00f3n, evaporaci\u00f3n, condensaci\u00f3n"),
        (33,"maquinas-simples","M\u00e1quinas Simples","Palanca, rueda, polea, tornillo, cu\u00f1a"),
        (37,"repaso-integral","Repaso Integral G4","Repaso integral ciencias naturales grado 4"),
    ],
    5: [(1,"clasificacion-reinos","Clasificaci\u00f3n de los Seres Vivos","Cinco reinos: Monera, Protista, Fungi, Plantae, Animalia"),
        (5,"respiratorio-circulatorio","Sistema Respiratorio y Circulatorio","Respiratorio, circulatorio, relaci\u00f3n"),
        (9,"nervioso-locomotor","Sistema Nervioso y Locomotor","Neuronas, sistema nervioso, huesos, m\u00fasculos"),
        (13,"repaso-p1","Repaso Per\u00edodo 1 G5","Repaso: reinos, respiraci\u00f3n, circulaci\u00f3n"),
        (17,"ecosistemas-relaciones","Relaciones en los Ecosistemas","Relaciones interespec\u00edficas"),
        (21,"ciclos-agua-carbono","Ciclos del Agua y del Carbono","Ciclo del agua, ciclo del carbono"),
        (25,"energia","Energ\u00eda: Fuentes y Transformaci\u00f3n","Energ\u00eda renovable y no renovable"),
        (29,"electricidad","Electricidad B\u00e1sica","Carga el\u00e9ctrica, circuitos, conductores"),
        (33,"magnetismo","Magnetismo y Electroimanes","Imanes, campo magn\u00e9tico, electroimanes"),
        (37,"repaso-integral","Repaso Integral G5","Repaso integral ciencias naturales grado 5"),
    ],
}

def make_q(stem, correct_text, a_fb, b_text, b_fb, c_text, c_fb, d_text, d_fb, explanation):
    return {"stem":stem,"correct":"A","options":[("A",correct_text,a_fb),("B",b_text,b_fb),("C",c_text,c_fb),("D",d_text,d_fb)],"explanation":explanation}

def load_seres_vivos():
    raw = eval(open(os.path.join(DATA_DIR,"seres_vivos_data.py"), encoding="utf-8").read())
    return [make_q(*r) for r in raw]

# Segment -> data file mapping
SEG_TO_FILE = {
    "seres-vivos":"seres_vivos_data", "plantas":"plantas", "animales":"animales",
    "agua":"agua", "aire-clima":"aire", "suelo-recursos":"suelo", "luz-sonido":"luz",
    "sistema-solar":"solar", "repaso-p1":"repaso", "repaso-integral":"repaso",
    "celula":"celula", "tejidos-sistemas":"tejidos", "digestivo-nutricion":"digestivo",
    "ecosistemas-colombia":"ecosistemas", "cadenas-alimenticias":"cadenas",
    "materia-propiedades":"materia", "cambios-estado":"cambios", "maquinas-simples":"maquinas",
    "clasificacion-reinos":"reinos", "respiratorio-circulatorio":"respiratorio",
    "nervioso-locomotor":"nervioso", "ecosistemas-relaciones":"relaciones",
    "ciclos-agua-carbono":"ciclos", "energia":"energia",
    "electricidad":"electricidad", "magnetismo":"magnetismo",
}

# Load all topic data
QA_DATA = {"seres-vivos": load_seres_vivos()}
for seg, fname in SEG_TO_FILE.items():
    if seg in QA_DATA:
        continue
    fpath = os.path.join(DATA_DIR, f"cie_{fname}.py")
    if os.path.exists(fpath):
        try:
            raw = eval(open(fpath, encoding="utf-8").read())
            QA_DATA[seg] = [make_q(*r) for r in raw]
            print(f"  Loaded {seg} from {fname}: {len(QA_DATA[seg])} qs")
        except Exception as ex:
            print(f"  ERROR loading {seg} from {fname}: {ex}")

def get_qs(segmento, week, count=10):
    pool = QA_DATA.get(segmento, [])
    if not pool:
        return None
    w_idx = (week - 1) % 4
    start = w_idx * 10
    return pool[start:start+10]

def write_bundle(grade, week, segmento, title, rubric):
    wn = f"W{week:02d}"
    gdir = os.path.join(BASE, f"grado-{grade}", "2026", "weekly")
    os.makedirs(gdir, exist_ok=True)
    fname = f"CO-CIE-{grade}-2026-{wn}-{segmento}-001-MASTERY-bundle.md"
    fpath = os.path.join(gdir, fname)
    
    week_qs = get_qs(segmento, week)
    if week_qs is None:
        print(f"  SKIP {segmento} W{week:02d}: no data")
        return False
    
    city, school = ciudad()
    eid = f"CO-CIE-{grade}-2026-{wn}-{segmento}-001-MASTERY"
    
    lines = [
        "---",
        f'id: "{eid}"',
        'country: "colombia"',
        f"grado: {grade}",
        'asignatura: "ciencias-naturales"',
        f'tema: "{segmento}"',
        f'semana: "{wn}"',
        'protocol_version: "5.2"',
        "year: 2026",
        "bundle_index: 1",
        "bundle_size: 10",
        'alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos de Ciencias Naturales"',
        "modern_context: true",
        'distractor_profile: "plausible_peer_set"',
        f'rubric_baseline: "{rubric}"',
        "---",
        "",
        f"# {title}",
        "",
        f"Bundle de {len(week_qs)} preguntas para Ciencias Naturales - {title}",
        "",
    ]
    
    for qi, qd in enumerate(week_qs):
        n = qi+1
        bloom = BLOOMS[qi]
        icfes = ICFES[qi]
        vid = f"{eid}-v{n}"
        stem = qd["stem"]
        corr = qd["correct"]
        opts = qd["options"]
        expl = qd["explanation"]
        
        lines += [
            f"## Pregunta N [DN]",
            "",
            f"**ID:** `{vid}`",
            f"**Bloom:** {bloom}",
            f"**ICFES:** {icfes}",
            f"**Context:** En {city}, {school}, los estudiantes de grado {grade} exploran {title.lower()}.",
            "",
            "### Enunciado",
            "",
            stem,
            "",
            "### Opciones",
            "",
        ]
        for letter, text, fb in opts:
            mk = "[x]" if letter == corr else "[ ]"
            lines.append(f"- {mk} {letter}) {text} <!-- feedback: {fb} -->")
        lines += [
            "",
            "### Explicaci\u00f3n Pedag\u00f3gica",
            "",
            expl,
            "",
        ]
    
    txt = "\n".join(lines)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(txt)
    print(f"  WROTE {fname}")
    return True

def run():
    for grade in [3,4,5]:
        print(f"\n=== G{grade} ===")
        entries = TOPICS[grade]
        for i, (start, seg, title, rubric) in enumerate(entries):
            end = entries[i+1][0]-1 if i+1 < len(entries) else 40
            print(f"  {seg}: W{start:02d}-W{end:02d}")
            for w in range(start, end+1):
                write_bundle(grade, w, seg, title, rubric)

if __name__ == "__main__":
    run()
