#!/usr/bin/env python3
"""
Part 1: Framework, frontmatter, helpers, and topic schedule for Matematicas G3.
Run gen_mat_g3_main.py to execute all parts.
"""

import os, random

BASE = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
                    "questions_data", "colombia", "matematicas", "grado-3", "2026")
WEEKLY_DIR = os.path.join(BASE, "weekly")
PERIODOS_DIR = os.path.join(BASE, "periodos")
os.makedirs(WEEKLY_DIR, exist_ok=True)
os.makedirs(PERIODOS_DIR, exist_ok=True)

random.seed(42)

COLEGIOS = [
    "Colegio La Salle de Medellin", "Inem Santiago Perez de Armenia",
    "Colegio San Jose de Pasto", "Colegio Rafael Nunez de Cartagena",
    "Colegio San Luis Gonzaga de Manizales", "Colegio Simon Bolivar de Bucaramanga",
    "Colegio San Agustin de Sincelejo", "Colegio El Rosario de Ibague",
    "Colegio INEM de Pereira", "Colegio San Francisco de Asis de Popayan",
    "Colegio Nuestra Senora del Rosario", "Instituto Tecnico Industrial",
    "Liceo Nacional San Mateo", "Colegio San Bartolome",
    "Gimnasio Campestre de Tunja"
]
CIUDADES = [
    "Medellin", "Bogota", "Cali", "Barranquilla", "Cartagena",
    "Bucaramanga", "Pereira", "Manizales", "Ibague", "Pasto",
    "Neiva", "Sincelejo", "Armenia", "Popayan", "Tunja"
]
TIENDAS = [
    "la tienda 'Dulce Colombia' de Ibague", "la papeleria 'El Lapiz Feliz' de Neiva",
    "la fruteria 'La Cosecha' de Pasto", "la tienda de barrio en Barranquilla",
    "la tienda 'La 14' de Cali", "el supermercado local de Bucaramanga",
    "la tienda escolar", "la panaderia 'El Buen Pan' de Manizales"
]

def rcolegio():
    return random.choice(COLEGIOS)
def rciudad():
    return random.choice(CIUDADES)
def rtienda():
    return random.choice(TIENDAS)
def ws(week):
    return f"W{week:02d}"

def opt(text, correct, feedback):
    return (text, correct, feedback)

def q(bloom, icfes, diff, exp_succ, context, enunciado, options, explicacion):
    return (bloom, icfes, diff, exp_succ, context, enunciado, options, explicacion)

def fm_weekly(week, tema, titulo, rubrica):
    return f"""---
id: "CO-MAT-3-2026-{ws(week)}-{tema}-001-MASTERY"
country: "colombia"
grado: 3
asignatura: "matematicas"
tema: "{tema}"
periodo: "weekly"
semana: {week}
protocol_version: "5.2"
bundle_index: 1
bundle_size: 10
alignment: "DBA MEN + Estandares Basicos Grado 3"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "{rubrica}"
---

# Weekly Pack {ws(week)}: {titulo}

Este bundle evalua {rubrica.lower()}, en contextos cotidianos colombianos.

"""

def fm_periodo(periodo, tema, titulo, rubrica, desc):
    return f"""---
id: "CO-MAT-3-2026-P{periodo}-{tema}-001-MASTERY"
country: "colombia"
grado: 3
asignatura: "matematicas"
tema: "{tema}"
periodo: {periodo}
protocol_version: "5.2"
bundle_index: 1
bundle_size: 15
alignment: "DBA MEN + Estandares Basicos Grado 3"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.70
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "{rubrica}"
---

# Bundle Periodo P{periodo}: {titulo}

{desc}

"""

def q_block(num, qid, bloom, icfes, diff, exp_succ, context, enunciado, options, explicacion):
    lines = [f"## Question {num} [{diff}]\n"]
    lines.append(f"**ID:** `{qid}`\n")
    lines.append(f"**Bloom:** {bloom}\n")
    lines.append(f"**ICFES:** {icfes}\n")
    lines.append(f"**Expected_Success:** {exp_succ}\n")
    lines.append(f"**Context:** {context}\n\n")
    lines.append(f"### Enunciado\n{enunciado}\n\n")
    lines.append("### Options\n")
    for i, (ot, corr, fb) in enumerate(options):
        m = "x" if corr else " "
        lines.append(f"- [{m}] {chr(65+i)}) {ot} <!-- feedback: {fb} -->\n")
    lines.append(f"\n### Explicacion Pedagogica\n{explicacion}\n\n---\n")
    return "".join(lines)

# Topic Schedule
TOPICS = [
    (1, "numeros-hasta-1000", "Numeros hasta 1000", "lectura, escritura, valor posicional, comparacion y orden de numeros hasta 1000"),
    (2, "valor-posicional-centenas", "Valor Posicional: Centenas, Decenas y Unidades", "composicion y descomposicion de numeros hasta 999, valor posicional"),
    (3, "suma-reagrupacion-tres-cifras", "Suma con Reagrupacion (3 cifras)", "suma de numeros de 3 cifras con reagrupacion"),
    (4, "resta-prestado-tres-cifras", "Resta con Prestado (3 cifras)", "resta de numeros de 3 cifras con prestado"),
    (5, "repaso-p1", "Repaso Periodo 1", "repaso integrador de suma, resta, valor posicional de numeros hasta 1000"),
    (6, "multiplicacion-sumados-iguales", "Multiplicacion como Suma de Sumandos Iguales", "multiplicacion como suma repetida, arreglos rectangulares"),
    (7, "tablas-multiplicar-2-3-4-5", "Tablas de Multiplicar del 2, 3, 4 y 5", "tablas de multiplicar basicas, productos hasta 5x10"),
    (8, "tablas-multiplicar-6-7-8-9-10", "Tablas de Multiplicar del 6, 7, 8, 9 y 10", "tablas de multiplicar avanzadas, productos hasta 10x10"),
    (9, "division-reparto-equitativo", "Division como Reparto Equitativo", "division como reparto en partes iguales, relacion multiplicacion-division"),
    (10, "repaso-p2", "Repaso Periodo 2", "repaso integrador de multiplicacion y division basica"),
    (11, "fracciones-introduccion", "Introduccion a Fracciones", "fracciones como parte de un todo, medios, tercios y cuartos"),
    (12, "fracciones-comparacion", "Comparacion de Fracciones", "comparacion de fracciones con igual denominador"),
    (13, "fracciones-equivalentes", "Fracciones Equivalentes", "fracciones equivalentes, misma cantidad representada de diferentes formas"),
    (14, "figuras-geometricas-planas", "Figuras Geometricas Planas", "triangulos, cuadrados, rectangulos, circulos: lados, vertices"),
    (15, "repaso-p3", "Repaso Periodo 3", "repaso integrador de fracciones y figuras geometricas"),
    (16, "angulos-y-simetria", "Angulos y Simetria", "angulos rectos, agudos y obtusos; ejes de simetria"),
    (17, "medicion-longitud", "Medicion de Longitud", "medicion de longitud: centimetro y metro, estimacion"),
    (18, "medicion-peso-y-capacidad", "Medicion de Peso y Capacidad", "kilogramo, gramo, litro, mililitro, estimacion"),
    (19, "tiempo-reloj", "Tiempo: Lectura del Reloj", "lectura de reloj analogico y digital, hora en punto, media hora"),
    (20, "repaso-p4", "Repaso Periodo 4", "repaso integrador de angulos, simetria y medicion"),
    (21, "calendario-fechas", "Calendario y Fechas", "lectura de calendario, dias, meses, calculo de fechas"),
    (22, "pictogramas-tablas", "Pictogramas y Tablas de Datos", "lectura e interpretacion de pictogramas y tablas"),
    (23, "graficas-barras", "Graficas de Barras", "lectura e interpretacion de graficas de barras"),
    (24, "probabilidad-basica", "Probabilidad Basica", "eventos seguros, posibles e imposibles"),
    (25, "repaso-p5", "Repaso Periodo 5", "repaso integrador de datos, graficas y probabilidad"),
    (26, "suma-4-cifras", "Suma con 4 Cifras", "suma de numeros de 4 cifras con reagrupacion"),
    (27, "resta-4-cifras", "Resta con 4 Cifras", "resta de numeros de 4 cifras con prestado"),
    (28, "multiplicacion-2-cifras-1", "Multiplicacion: 2 cifras x 1 cifra", "multiplicacion de numeros de dos cifras por una cifra"),
    (29, "multiplicacion-3-cifras-1", "Multiplicacion: 3 cifras x 1 cifra", "multiplicacion de numeros de tres cifras por una cifra"),
    (30, "repaso-p6", "Repaso Periodo 6", "repaso integrador de operaciones avanzadas"),
    (31, "perimetro-figuras", "Perimetro de Figuras", "calculo del perimetro de figuras planas"),
    (32, "area-cuadricula", "Area con Cuadricula", "concepto de area, conteo de cuadrados unitarios"),
    (33, "cuerpos-geometricos", "Cuerpos Geometricos", "cubos, prismas, cilindros, esferas: caras, vertices, aristas"),
    (34, "patrones-secuencias", "Patrones y Secuencias", "patrones numericos y geometricos, secuencias"),
    (35, "repaso-p7", "Repaso Periodo 7", "repaso integrador de perimetro, area y cuerpos geometricos"),
    (36, "dinero-pesos-colombianos", "Dinero: Billetes y Monedas Colombianas", "billetes y monedas, equivalencias, vueltos"),
    (37, "problemas-combinados", "Problemas Combinados", "problemas que combinan dos o mas operaciones"),
    (38, "estimacion-redondeo", "Estimacion y Redondeo", "estimacion de cantidades, redondeo a decenas y centenas"),
    (39, "razonamiento-matematico", "Razonamiento Matematico", "problemas de logica, secuencias, relaciones numericas"),
    (40, "repaso-anual", "Repaso Anual", "repaso integrador de todo el ano en contextos colombianos"),
]
