#!/usr/bin/env python3
"""Generate weekly bundles W16-W40 for Grado 6 Matematicas Colombia."""
import os

WEEKLY = r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"
os.makedirs(WEEKLY, exist_ok=True)

def w(fname, content):
    with open(os.path.join(WEEKLY, fname), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {fname}")

def fmt_opts(options):
    """options: list of (correct_bool, text, feedback). Returns 4 option lines."""
    labels = ["A", "B", "C", "D"]
    lines = []
    for j, (correct, text, fb) in enumerate(options):
        marker = "x" if correct else " "
        lines.append(f'- [{marker}] {labels[j]}) {text} <!-- feedback: {fb} -->')
    return "\n".join(lines)

def make_bundle(spec):
    s = spec
    lines = []
    lines.append("---")
    lines.append(f'id: "{s["id"]}"')
    lines.append('country: "colombia"')
    lines.append("grado: 6")
    lines.append('asignatura: "matematicas"')
    lines.append(f'tema: "{s["tema"]}"')
    lines.append(f"periodo: {s['periodo']}")
    lines.append(f"week: {s['week']}")
    lines.append("year: 2026")
    lines.append('bundle_type: "weekly"')
    lines.append('protocol_version: "5.2"')
    lines.append("total_questions: 10")
    lines.append("bundle_size: 10")
    lines.append('alignment: "DBA MEN + Estandares Basicos Ciclo 2"')
    lines.append("---")
    lines.append("")
    lines.append(f'# Weekly Pack W{s["week"]} — {s["title"]}')
    lines.append("")
    periodo_n = s["periodo"]
    lines.append(f"**Grado:** 6° | **Periodo:** {periodo_n} | **Semana:** {s['week']} | **Año:** 2026")
    if s.get("topic_desc"):
        lines.append("")
        lines.append(f"**{s['topic_desc']}**")
    lines.append("")

    for i, q in enumerate(s["questions"]):
        d = i + 1
        lines.append("---")
        lines.append("")
        lines.append(f"## Question {d} [D{d}]")
        lines.append("")
        full_id = f"{s['id']}-{q['id_suffix']:03d}-v1"
        lines.append(f'**ID:** `{full_id}`')
        lines.append(f'**Bloom:** {q["bloom"]}')
        lines.append(f'**ICFES:** {q["icfes"]}')
        lines.append(f'**Context:** {q["context"]}')
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q["stem"])
        lines.append("")
        lines.append("### Options")
        lines.append(fmt_opts(q["options"]))
        lines.append("")
        lines.append("### Explicacion Pedagogica")
        lines.append(q["expl"])
        lines.append("")
    return "\n".join(lines)

# ============================================================
# DATA for all bundles
# ============================================================

# Helper to create a question dict
def Q(id_suffix, bloom, icfes, context, stem, opts, expl):
    return {
        "id_suffix": id_suffix,
        "bloom": bloom,
        "icfes": icfes,
        "context": context,
        "stem": stem,
        "options": opts,
        "expl": expl
    }

# Simple letter helpers
A = "Comunicacion y representacion"
R = "Resolucion de problemas"
Z = "Razonamiento y argumentacion"

# -----------------------------------------------------------
# W17 - Geometria: Poligonos y Perimetros
# -----------------------------------------------------------
w17_qs = [
    Q(1, "Remember", A, "Figuras en clase de geometria",
      "¿Qué es un polígono?",
      [(True, "Una figura plana cerrada formada por segmentos de recta", "Correcto. Los polígonos son figuras planas cerradas con lados rectos."),
       (False, "Una figura tridimensional con caras planas", "Incorrecto. Esa es la definición de un poliedro, no de un polígono."),
       (False, "Una línea curva cerrada", "Incorrecto. Un polígono se forma con segmentos de RECTA, no con curvas."),
       (False, "Una figura abierta con lados rectos", "Incorrecto. Un polígono debe ser una figura CERRADA.")],
      "Un polígono es una figura geométrica plana formada por segmentos de recta (lados) que se unen en vértices, formando una región cerrada. Ejemplos: triángulo (3 lados), cuadrado (4 lados)."),
    Q(2, "Remember", A, "Cercado de un terreno",
      "Don Alberto quiere cercar su terreno rectangular que mide 12 m de largo y 8 m de ancho. ¿Cuántos metros de alambre necesita para dar una vuelta?",
      [(True, "40 m", "Correcto. Perímetro = 2×(12+8) = 2×20 = 40 m."),
       (False, "20 m", "Incorrecto. 12+8=20 es solo la suma de un largo y un ancho. El perímetro es 2×(largo+ancho)=40 m."),
       (False, "96 m", "Incorrecto. 12×8=96 es el ÁREA, no el perímetro."),
       (False, "24 m", "Incorrecto. Solo contar dos lados: 12+12=24. Faltan los dos lados de 8 m.")],
      "El perímetro de un rectángulo se calcula sumando todos sus lados: P = 2×(largo+ancho). P = 2×(12 m+8 m) = 2×20 m = 40 m."),
    Q(3, "Understand", A, "Decoración con cinta",
      "La profesora quiere poner cinta decorativa alrededor de un cartel con forma de triángulo equilátero de 45 cm de lado. ¿Cuánta cinta necesita?",
      [(True, "135 cm", "Correcto. Triángulo equilátero: 3 lados iguales. Perímetro = 3×45 = 135 cm."),
       (False, "90 cm", "Incorrecto. 2×45=90. Error: solo contar dos lados. Un triángulo tiene 3."),
       (False, "180 cm", "Incorrecto. 4×45=180. Error: contar 4 lados como si fuera un cuadrado."),
       (False, "45 cm", "Incorrecto. 45 cm es la medida de un solo lado. El perímetro suma los 3.")],
      "Un triángulo equilátero tiene sus 3 lados iguales. Perímetro = 45+45+45 = 135 cm = 3×45 cm."),
    Q(4, "Understand", R, "Vueltas al patio del colegio",
      "El patio del colegio tiene forma de hexágono regular. Cada lado mide 15 m. Si los estudiantes dan 3 vueltas alrededor del patio, ¿cuántos metros recorren?",
      [(True, "270 m", "Correcto. Perímetro: 6×15=90 m. 3 vueltas: 90×3=270 m."),
       (False, "90 m", "Incorrecto. Eso es una vuelta: 6×15=90 m. La pregunta dice 3 vueltas: 90×3=270 m."),
       (False, "180 m", "Incorrecto. Error: solo 2 vueltas en vez de 3."),
       (False, "45 m", "Incorrecto. 3×15=45. Error: multiplicar vueltas por un lado en vez del perímetro.")],
      "Perímetro del hexágono: 6×15 m = 90 m. Tres vueltas: 3×90 m = 270 metros."),
    Q(5, "Apply", R, "Alambre para artesanías",
      "Marta hace artesanías con alambre. Necesita hacer un pentágono regular de 8 cm de lado. ¿Cuánto alambre necesita para 6 pentágonos iguales?",
      [(True, "240 cm", "Correcto. Un pentágono: 5×8=40 cm. 6 pentágonos: 40×6=240 cm."),
       (False, "48 cm", "Incorrecto. 8×6=48. Ese es el alambre para 6 lados sueltos, no 6 pentágonos completos."),
       (False, "288 cm", "Incorrecto. 8×6×6=288. Error: contar 6 lados por pentágono (un pentágono tiene 5)."),
       (False, "80 cm", "Incorrecto. 5×8×2=80. Error: solo 2 pentágonos en vez de 6.")],
      "Perímetro de un pentágono: 5×8 cm=40 cm. Para 6 pentágonos: 6×40 cm=240 cm de alambre."),
    Q(6, "Apply", R, "Postes para cerca",
      "Don Carlos tiene un terreno con forma de cuadrilátero con lados: 23 m, 18 m, 25 m y 20 m. Quiere poner cerca con postes cada 2 metros. ¿Cuántos postes necesita?",
      [(True, "43 postes", "Correcto. Perímetro: 23+18+25+20=86 m. Postes: 86÷2=43."),
       (False, "86 postes", "Incorrecto. 86 es el perímetro. Si los postes van cada 2 m: 86÷2=43."),
       (False, "22 postes", "Incorrecto. 86÷4=21,5≈22. Error: dividir entre 4 en vez de entre 2."),
       (False, "21 postes", "Incorrecto. 86÷4=21,5≈21. La división correcta es 86÷2=43.")],
      "Perímetro = 23+18+25+20 = 86 m. Postes cada 2 m: 86÷2=43 postes."),
    Q(7, "Apply", Z, "Comparación de terrenos",
      "¿Cuál terreno tiene mayor perímetro? Un cuadrado de 9 m de lado o un rectángulo de 12 m de largo y 6 m de ancho?",
      [(True, "Ambos tienen el mismo perímetro: 36 m.", "Correcto. Cuadrado: 4×9=36. Rectángulo: 2×(12+6)=36. Son iguales."),
       (False, "El rectángulo, porque 12+6=18 es mayor que 9", "Incorrecto. 12+6=18 es la mitad del perímetro. Perímetro completo: 2×18=36 m."),
       (False, "El cuadrado, porque tiene lados más parejos", "Incorrecto. Ambos perímetros son 36 m. Son iguales."),
       (False, "No se puede determinar sin más datos", "Incorrecto. Sí se puede. Ambos miden 36 m.")],
      "Cuadrado: P=4×9=36 m. Rectángulo: P=2×(12+6)=2×18=36 m. Ambos terrenos tienen el mismo perímetro."),
    Q(8, "Apply", R, "Pista de atletismo",
      "Una pista de atletismo tiene forma rectangular con un largo de 100 m y un ancho de 60 m. Un atleta da 5 vueltas a la pista. ¿Cuántos metros corre en total?",
      [(True, "1.600 m", "Correcto. Perímetro: 2×(100+60)=320 m. 5 vueltas: 320×5=1.600 m."),
       (False, "800 m", "Incorrecto. 320×2,5=800. Error: solo 2,5 vueltas en vez de 5."),
       (False, "3.200 m", "Incorrecto. 320×10=3.200. Error: 10 vueltas en vez de 5."),
       (False, "500 m", "Incorrecto. 100×5=500. Error: solo multiplicar el largo por las vueltas.")],
      "Perímetro: 2×(100+60)=320 m. 5 vueltas: 5×320=1.600 m (1,6 km)."),
    Q(9, "Analyze", Z, "Cerco alrededor de jardín",
      "Un jardín rectangular tiene 15 m de largo. Su ancho es 1/3 del largo. Se quiere poner una cerca que cuesta $12.000 el metro. ¿Cuánto cuesta cercar todo el jardín?",
      [(True, "$480.000", "Correcto. Ancho=15÷3=5 m. Perímetro=2×(15+5)=40 m. Costo=40×12.000=480.000."),
       (False, "$240.000", "Incorrecto. Perímetro=40 m. 20×12.000=240.000. Error: usar solo la mitad del perímetro."),
       (False, "$720.000", "Incorrecto. 60×12.000=720.000. Error: calcular área (15×5=75) en vez de perímetro."),
       (False, "$180.000", "Incorrecto. 15×12.000=180.000. Error: solo contar un lado.")],
      "Ancho = 1/3 de 15 m = 5 m. Perímetro = 2×(15+5)=40 m. Costo = 40×$12.000=$480.000."),
    Q(10, "Analyze", Z, "Diseño de corral",
      "Un granjero tiene 60 m de malla para hacer un corral rectangular. Si el largo debe ser el doble del ancho, ¿cuáles deben ser las dimensiones del corral?",
      [(True, "Ancho=10 m, Largo=20 m", "Correcto. 2×(10+20)=60 m. Largo=2×ancho=20 m."),
       (False, "Ancho=15 m, Largo=30 m", "Incorrecto. 2×(15+30)=90 m. Excede los 60 m de malla."),
       (False, "Ancho=12 m, Largo=24 m", "Incorrecto. 2×(12+24)=72 m. Excede los 60 m."),
       (False, "Ancho=20 m, Largo=40 m", "Incorrecto. 2×(20+40)=120 m. Excede los 60 m.")],
      "Si ancho=a, largo=2a. Perímetro=2×(a+2a)=2×3a=6a. 6a=60 → a=10 m (ancho). Largo=2×10=20 m."),
]

w17 = make_bundle({
    "id": "CO-MAT-6-2026-W17-geometria-poligonos-perimetros-001-MASTERY",
    "tema": "geometria-poligonos-perimetros", "periodo": 2, "week": 17,
    "title": "Geometría: Polígonos y Perímetros",
    "questions": w17_qs
})
w("CO-MAT-6-2026-W17-geometria-poligonos-perimetros-001-MASTERY-bundle.md", w17)

# -----------------------------------------------------------
# W18 - Geometria: Areas
# -----------------------------------------------------------
w18_qs = [
    Q(1, "Remember", A, "Medición de superficies",
      "¿Qué unidad se usa para medir el área de una superficie?",
      [(True, "El metro cuadrado (m²)", "Correcto. El área se mide en unidades cuadradas."),
       (False, "El metro lineal (m)", "Incorrecto. El metro mide longitud, no superficie."),
       (False, "El metro cúbico (m³)", "Incorrecto. Mide volumen (espacio 3D)."),
       (False, "El gramo (g)", "Incorrecto. El gramo mide masa, no área.")],
      "El área mide la extensión de una superficie. Sus unidades están elevadas al cuadrado porque resultan del producto de dos dimensiones lineales."),
    Q(2, "Remember", A, "Fórmula del área del rectángulo",
      "¿Cuál es la fórmula para calcular el área de un rectángulo?",
      [(True, "Área = base × altura", "Correcto. El área del rectángulo es el producto de su base por su altura."),
       (False, "Área = base + altura", "Incorrecto. El área se multiplica, no se suma. Área = base × altura."),
       (False, "Área = 2 × (base + altura)", "Incorrecto. Esa es la fórmula del PERÍMETRO, no del área."),
       (False, "Área = base ÷ altura", "Incorrecto. El área se multiplica: base × altura, no se divide.")],
      "El área de un rectángulo se calcula multiplicando su base (largo) por su altura (ancho): A = b × h."),
    Q(3, "Understand", R, "Piso de una habitación",
      "La habitación de Sofía mide 4 m de largo por 3,5 m de ancho. ¿Cuál es el área del piso?",
      [(True, "14 m²", "Correcto. Área = 4 × 3,5 = 14 m²."),
       (False, "15 m²", "Incorrecto. 4×3,75=15. Error: redondear 3,5 a 3,75. El cálculo correcto es 4×3,5=14."),
       (False, "7,5 m²", "Incorrecto. 4+3,5=7,5. Se debe MULTIPLICAR, no sumar. Área = base × altura."),
       (False, "12 m²", "Incorrecto. 4×3=12. Error: usar 3 m en vez de 3,5 m.")],
      "Área del rectángulo = base × altura = 4 m × 3,5 m = 14 m². Se necesitan 14 metros cuadrados de piso."),
    Q(4, "Understand", R, "Terreno para cultivo",
      "Don José tiene un terreno cuadrado de 12 m de lado. ¿Cuál es su área?",
      [(True, "144 m²", "Correcto. Área del cuadrado = lado² = 12² = 144 m²."),
       (False, "48 m²", "Incorrecto. 12×4=48 es el perímetro, no el área. Área = lado² = 12×12=144."),
       (False, "24 m²", "Incorrecto. 12×2=24. Error: multiplicar lado por 2 en vez de elevarlo al cuadrado."),
       (False, "36 m²", "Incorrecto. 6²=36. Error: confundir 12² con 6², o 12÷2=6. 12²=12×12=144.")],
      "El área del cuadrado se calcula elevando el lado al cuadrado: A = lado² = (12 m)² = 144 m²."),
    Q(5, "Apply", R, "Pared para pintar",
      "Una pared rectangular mide 6 m de largo y 2,5 m de alto. Un tarro de pintura cubre 10 m². ¿Cuántos tarros necesita para pintar toda la pared?",
      [(True, "2 tarros", "Correcto. Área=6×2,5=15 m². 15÷10=1,5, se necesitan 2 tarros (no se puede comprar medio tarro)."),
       (False, "1 tarro", "Incorrecto. Área=15 m². 1 tarro cubre solo 10 m². Faltan 5 m². Se necesita otro tarro."),
       (False, "3 tarros", "Incorrecto. 2 tarros cubren 20 m². Con 15 m² bastan 2 tarros. 3 es excesivo."),
       (False, "1,5 tarros", "Incorrecto matemáticamente es correcto (15÷10=1,5), pero no se puede comprar medio tarro de pintura.")],
      "Área de la pared = 6 m × 2,5 m = 15 m². Cada tarro cubre 10 m². 15÷10=1,5 tarros → se necesitan 2 tarros."),
    Q(6, "Apply", R, "Área de un triángulo",
      "Un terreno con forma de triángulo tiene 8 m de base y 6 m de altura. ¿Cuál es su área?",
      [(True, "24 m²", "Correcto. Área del triángulo = (base×altura)/2 = (8×6)/2 = 48/2 = 24 m²."),
       (False, "48 m²", "Incorrecto. (8×6)=48 es el área del rectángulo. El triángulo es la mitad: 48÷2=24 m²."),
       (False, "14 m²", "Incorrecto. 8+6=14. Error: sumar en vez de multiplicar y dividir entre 2."),
       (False, "12 m²", "Incorrecto. (8×6)/4=12. Error: dividir entre 4 en vez de entre 2.")],
      "El área del triángulo es la mitad del área del rectángulo que lo contiene: A = (base×altura)/2 = (8×6)/2 = 24 m²."),
    Q(7, "Apply", Z, "Comparación de terrenos",
      "¿Cuál tiene mayor área? Un cuadrado de 7 m de lado o un triángulo de 14 m de base y 7 m de altura?",
      [(True, "El cuadrado: 49 m². El triángulo: 49 m². Son iguales.", "Correcto. Cuadrado: 7²=49. Triángulo: (14×7)/2=98/2=49. Son iguales."),
       (False, "El cuadrado, porque 7×7 es mayor", "Incorrecto. 7×7=49 y (14×7)/2=49. Son iguales."),
       (False, "El triángulo, porque la base es más grande", "Incorrecto. Aunque la base es mayor, el triángulo se divide entre 2: (14×7)/2=49. Cuadrado: 7²=49."),
       (False, "No se puede comparar", "Incorrecto. Sí se puede: ambos tienen área de 49 m².")],
      "Cuadrado: A=7²=49 m². Triángulo: A=(14×7)/2=98/2=49 m². Ambos tienen exactamente la misma área."),
    Q(8, "Analyze", R, "Diseño de jardín",
      "Un jardín rectangular de 10 m por 6 m tiene una fuente circular en el centro de 2 m de radio (área del círculo = πr²). ¿Qué área aproximada de jardín queda libre? (Use π≈3,14)",
      [(True, "47,44 m²", "Correcto. Área jardín=10×6=60 m². Área fuente=3,14×4=12,56 m². Libre=60-12,56=47,44 m²."),
       (False, "60 m²", "Incorrecto. Ese es el área total del jardín sin descontar la fuente. Libre=60-12,56=47,44."),
       (False, "47 m²", "Incorrecto. Redondear 47,44 a 47. El valor exacto es 47,44 m²."),
       (False, "50 m²", "Incorrecto. 60-10=50. Error: estimar el área de la fuente como 10 en vez de 12,56.")],
      "Área del jardín = 10×6=60 m². Área de la fuente = π×(2)² = 3,14×4 = 12,56 m². Área libre = 60-12,56 = 47,44 m²."),
    Q(9, "Analyze", Z, "Estrategia de cálculo",
      "Un rectángulo tiene 8 cm de base y 5 cm de altura. Si se duplica la base y se triplica la altura, ¿cuántas veces aumenta el área?",
      [(True, "6 veces", "Correcto. Área original=8×5=40. Nueva=16×15=240. 240÷40=6 veces mayor."),
       (False, "2 veces", "Incorrecto. Duplicar base (×2) y triplicar altura (×3) multiplica el área por 2×3=6."),
       (False, "5 veces", "Incorrecto. 2+3=5. Error: sumar factores en vez de multiplicarlos."),
       (False, "3 veces", "Incorrecto. Solo considerar la altura triplicada, olvidando la base duplicada.")],
      "Área original = b×h = 8×5=40 cm². Nueva = (2b)×(3h) = 2×3×b×h = 6×b×h = 6×40=240 cm². El área aumenta 6 veces."),
    Q(10, "Analyze", Z, "Razonamiento con áreas",
      "Dos rectángulos tienen el mismo perímetro de 24 m. El primero tiene 7 m de largo y 5 m de ancho. El segundo tiene 8 m de largo y 4 m de ancho. ¿Cuál tiene mayor área?",
      [(True, "El primero: 35 m². El segundo: 32 m². El primero es mayor.", "Correcto. P1=2×(7+5)=24. A1=7×5=35. P2=2×(8+4)=24. A2=8×4=32. 35>32."),
       (False, "El segundo: 32 m² vs 35 m². El segundo es mayor.", "Incorrecto. 32 < 35. El primer rectángulo tiene mayor área aunque tenga el mismo perímetro."),
       (False, "Ambos tienen la misma área", "Incorrecto. A1=35 m², A2=32 m². Son diferentes aunque tengan el mismo perímetro."),
       (False, "No se puede saber porque tienen el mismo perímetro", "Incorrecto. Sí se puede calcular. Con el mismo perímetro, la forma más cuadrada da mayor área.")],
      "Rectángulo 1: P=2×(7+5)=24 m, A=7×5=35 m². Rectángulo 2: P=2×(8+4)=24 m, A=8×4=32 m². El primero tiene mayor área. Esto muestra que con el mismo perímetro, la forma más cercana al cuadrado tiene mayor área."),
]

w18 = make_bundle({
    "id": "CO-MAT-6-2026-W18-geometria-areas-figuras-planas-001-MASTERY",
    "tema": "geometria-areas-figuras-planas", "periodo": 2, "week": 18,
    "title": "Geometría: Áreas de Figuras Planas",
    "questions": w18_qs
})
w("CO-MAT-6-2026-W18-geometria-areas-figuras-planas-001-MASTERY-bundle.md", w18)

print("Done generating W17-W18")
