#!/usr/bin/env python3
"""Generate all missing weekly bundles W16-W40 for Grado 6 Matematicas Colombia."""
import os

WEEKLY = r"E:\scripts-python\worldexams\questions_data\colombia\matematicas\grado-6\2026\weekly"
os.makedirs(WEEKLY, exist_ok=True)

def w(fname, content):
    with open(os.path.join(WEEKLY, fname), "w", encoding="utf-8") as f:
        f.write(content)
    print(f"OK: {fname}")

def fmt_opts(options):
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
    lines.append(f"**Grado:** 6° | **Periodo:** {s['periodo']} | **Semana:** {s['week']} | **Año:** 2026")
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
        lines.append(f'**ID:** `{s["id"]}-{q["id_suffix"]:03d}-v1`')
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

def Q(id_suffix, bloom, icfes, context, stem, opts, expl):
    return {"id_suffix": id_suffix, "bloom": bloom, "icfes": icfes, "context": context, "stem": stem, "options": opts, "expl": expl}

A = "Comunicacion y representacion"
R = "Resolucion de problemas"
Z = "Razonamiento y argumentacion"

# ============================================================
# W16 - Repaso Periodo 2
# ============================================================
w16_qs = [
    Q(1, "Remember", A, "Mitad de una receta",
      "La receta de pan de bono usa 2/3 de taza de almidón de yuca. Si Luisa prepara la mitad de la receta, ¿cuánto almidón necesita?",
      [(True, "1/3 de taza", "Correcto. La mitad de 2/3 = 2/3 × 1/2 = 2/6 = 1/3 de taza."),
       (False, "2/5 de taza", "Incorrecto. Sumar numerador y denominador: 2+1=3, 3+2=5 → 3/5. No es el procedimiento correcto."),
       (False, "4/3 de taza", "Incorrecto. Multiplicar al revés: 2/3 × 2/1 = 4/3. Eso es el doble, no la mitad."),
       (False, "1/6 de taza", "Incorrecto. 2/3 × 1/4 = 2/12 = 1/6. Error: dividir entre 4 en vez de entre 2.")],
      "La mitad de una cantidad significa multiplicar por 1/2. Mitad de 2/3 = 2/3 × 1/2 = 2/6 = 1/3 de taza."),
    Q(2, "Understand", A, "Repartición de arepas",
      "Doña María tiene 3/4 de una arepa y quiere repartirla entre sus 2 hijos en partes iguales. ¿Qué fracción le corresponde a cada uno?",
      [(True, "3/8 de arepa", "Correcto. 3/4 ÷ 2 = 3/4 × 1/2 = 3/8 de arepa para cada uno."),
       (False, "3/2 de arepa", "Incorrecto. Multiplicar en vez de dividir: 3/4×2=3/2. Cada hijo recibe menos, no más."),
       (False, "1/4 de arepa", "Incorrecto. Dividir solo el numerador no es correcto. 3/4 entre 2 se multiplica 3/4×1/2=3/8."),
       (False, "6/4 de arepa", "Incorrecto. 3/4×2/1=6/4. Eso sería para 2 arepas, no dividir entre 2 hijos.")],
      "Dividir entre 2 equivale a multiplicar por 1/2. 3/4÷2=3/4×1/2=3/8. Cada hijo recibe 3/8 de arepa."),
    Q(3, "Understand", R, "Precio del aguacate",
      "En la plaza de mercado, el kilo de aguacate cuesta $4.500. Si Carolina compra 2,75 kg, ¿cuánto paga?",
      [(True, "$12.375", "Correcto. 2,75 × $4.500 = $12.375."),
       (False, "$11.250", "Incorrecto. 2,5 × $4.500 = $11.250. Error: usar 2,5 kg en vez de 2,75 kg."),
       (False, "$13.500", "Incorrecto. 3 × $4.500 = $13.500. Error: redondear a 3 kg."),
       (False, "$9.000", "Incorrecto. 2 × $4.500 = $9.000. Error: solo contar 2 kg exactos.")],
      "Costo = peso × precio por kilo. 2,75 × $4.500 = 2×$4.500 + 0,75×$4.500 = $9.000 + $3.375 = $12.375."),
    Q(4, "Apply", R, "Costo de pasajes",
      "Sofía viaja en bus 4 días a la semana (ida y vuelta cada día). Cada pasaje cuesta $2.300. ¿Cuánto gasta en pasajes en 4,5 semanas?",
      [(True, "$82.800", "Correcto. Pasajes por semana: 4×2 viajes×$2.300=$18.400. 4,5 sem: $18.400×4,5=$82.800."),
       (False, "$41.400", "Incorrecto. 18.400×2,25=$41.400. Error: contar solo 2,25 semanas en vez de 4,5."),
       (False, "$36.800", "Incorrecto. 18.400×2=$36.800. Error: solo 2 semanas en vez de 4,5."),
       (False, "$20.700", "Incorrecto. 2.300×9=$20.700. Error: contar 9 pasajes en vez de 36.")],
      "Pasajes diarios: ida+vuelta=2. Por semana: 4×2=8 pasajes. Gasto semanal: 8×$2.300=$18.400. En 4,5 semanas: $18.400×4,5. 18.400×4=73.600. 18.400÷2=9.200. Total: $73.600+$9.200=$82.800."),
    Q(5, "Apply", R, "Cultivo de flores",
      "Un agricultor planta rosas en un terreno cuadrado de 25 m de lado. Cada rosa necesita 0,25 m². ¿Cuántas rosas puede plantar?",
      [(True, "2.500 rosas", "Correcto. Área=25²=625 m². Rosas=625÷0,25=2.500."),
       (False, "100 rosas", "Incorrecto. 25×4=100. Error: calcular perímetro en vez de área."),
       (False, "1.250 rosas", "Incorrecto. Área=625. 625÷0,5=1.250. Error: usar 0,5 en vez de 0,25."),
       (False, "625 rosas", "Incorrecto. Ese es el área en m². Cada rosa necesita 0,25 m², así que 625÷0,25=2.500.")],
      "Área del terreno = 25×25 = 625 m². Número de rosas = 625 ÷ 0,25 = 625 × 4 = 2.500 rosas."),
    Q(6, "Understand", A, "Razón en una mezcla",
      "Don Javier mezcla café tostado y café molido en razón 3:2. Si usa 9 kg de café tostado, ¿cuánto café molido necesita?",
      [(True, "6 kg", "Correcto. 3:2 = 9:6. 9÷3=3; 2×3=6 kg de café molido."),
       (False, "4 kg", "Incorrecto. 9/2=4,5. La razón 3:2: 9÷3=3; 2×3=6."),
       (False, "7 kg", "Incorrecto. 9-2=7. No se resta. 3/2=9/x, x=9×2/3=6."),
       (False, "13,5 kg", "Incorrecto. 9×1,5=13,5. Error: invertir la razón. Por cada 3 de tostado van 2 de molido.")],
      "Razón 3:2 significa 3 partes de tostado por 2 de molido. Si tostado=9: 3/2=9/x → x=9×2/3=6 kg."),
    Q(7, "Apply", R, "Limonada para invitados",
      "Para preparar limonada, la receta indica 3 limones por cada litro de agua. ¿Cuántos limones se necesitan para 7 litros?",
      [(True, "21 limones", "Correcto. Regla de tres: 3 limones/1 L = x/7 L. x=3×7/1=21."),
       (False, "10 limones", "Incorrecto. 3+7=10. Error: sumar en vez de usar regla de tres."),
       (False, "14 limones", "Incorrecto. 2×7=14. Error: usar 2 limones por litro en vez de 3."),
       (False, "4 limones", "Incorrecto. 7-3=4. Error: restar en vez de multiplicar proporcionalmente.")],
      "Es una relación directamente proporcional. 3 limones → 1 L; x → 7 L. x = 3×7/1 = 21 limones."),
    Q(8, "Apply", R, "Descuento en tenis",
      "Un par de tenis cuesta $95.000 y tiene descuento del 20%. ¿Cuál es el precio final?",
      [(True, "$76.000", "Correcto. Descuento: 20% de 95.000=19.000. Final: 95.000-19.000=76.000."),
       (False, "$75.000", "Incorrecto. 95.000-20.000=75.000. 20% de 95.000=19.000, no 20.000."),
       (False, "$57.000", "Incorrecto. 95.000×0,6=57.000. Error: 40% de descuento en vez de 20%."),
       (False, "$80.750", "Incorrecto. 95.000×0,85=80.750. Error: 15% de descuento en vez de 20%.")],
      "Descuento: 20% de $95.000 = $19.000. Precio final: $95.000 - $19.000 = $76.000. O: 80% de $95.000 = $76.000."),
    Q(9, "Analyze", Z, "Comparación de descuentos",
      "Un producto de $50.000 tiene dos ofertas: 1) Lleve 2 y pague 1. 2) 50% de descuento. ¿Cuál es mejor si compra 2 unidades?",
      [(True, "Ambas son equivalentes, descuento del 50%", "Correcto. Oferta 1: paga 1 lleva 2 = 50% desc. Oferta 2: 50% desc. Son iguales."),
       (False, "Oferta 1: lleva 2 y paga 1 es mejor", "Incorrecto. 'Lleve 2 pague 1' equivale a 50% de descuento, igual que la oferta 2."),
       (False, "Oferta 2: 50% descuento es mejor", "Incorrecto. Ambas ofertas dan el mismo descuento del 50%."),
       (False, "No se puede comparar", "Incorrecto. Sí se puede. Ambas ofertas resultan en un 50% de descuento efectivo.")],
      "Oferta 1: paga 1 de cada 2 = 50% descuento. Oferta 2: 50% descuento. Son equivalentes."),
    Q(10, "Analyze", Z, "Presupuesto escolar",
      "Andrés tiene $120.000. Gasta 1/4 en libros, 2/5 en uniformes y el resto en útiles. ¿Cuánto gasta en útiles?",
      [(True, "$42.000", "Correcto. Libros: 1/4×120.000=30.000. Uniformes: 2/5×120.000=48.000. Útiles: 120.000-78.000=42.000."),
       (False, "$36.000", "Incorrecto. 1/4+2/5=13/20. 120.000×13/20=78.000 gastado. Útiles: 120.000-78.000=42.000."),
       (False, "$60.000", "Incorrecto. Error: asumir que gasta la mitad."),
       (False, "$78.000", "Incorrecto. Eso es lo que gasta en libros y uniformes. La pregunta es los útiles: 120.000-78.000=42.000.")],
      "Libros: 1/4×$120.000=$30.000. Uniformes: 2/5×$120.000=$48.000. Gastado: $78.000. Útiles: $120.000-$78.000=$42.000."),
]
w16 = make_bundle({"id": "CO-MAT-6-2026-W16-repaso-p2-001-MASTERY", "tema": "repaso-p2", "periodo": 2, "week": 16, "title": "REPASO Periodo 2", "topic_desc": "Temas: Fracciones, Decimales, Potenciación, Razones, Proporciones, Porcentajes", "questions": w16_qs})
w("CO-MAT-6-2026-W16-repaso-p2-001-MASTERY-bundle.md", w16)

print("W16 done")
