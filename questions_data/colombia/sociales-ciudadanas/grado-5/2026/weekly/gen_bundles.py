#!/usr/bin/env python3
"""Generate all 37 remaining weekly bundles (W04-W40) for Sociales G5."""

import os

BASE = "E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-5/2026/weekly"
os.makedirs(BASE, exist_ok=True)

# ============================================================
# TOPIC DATA — 10 questions per bundle
# ============================================================

bundles = {}

# ---- W04: Representaciones de la Tierra ----
bundles["W04"] = {
    "tema": "representaciones-tierra",
    "rubric": "Representaciones de la Tierra: globo terráqueo, mapamundi, proyecciones cartográficas",
    "theme": "Representaciones de la Tierra",
    "questions": [
        {
            "qid": 1, "bloom": "Remember", "d": "D1",
            "text": "¿Cómo se llama la representación de la Tierra en forma de esfera?",
            "correct": "B",
            "options": [
                ("A) Mapamundi", "Incorrecto. El mapamundi es una representación plana."),
                ("B) Globo terráqueo", "Correcto. El globo terráqueo representa la Tierra en tres dimensiones, como una esfera."),
                ("C) Plano", "Incorrecto. Un plano representa espacios pequeños."),
                ("D) Croquis", "Incorrecto. Un croquis es un dibujo simple sin escala exacta."),
            ],
            "explanation": "El globo terráqueo es la representación más fiel de la Tierra porque conserva su forma esférica y las proporciones reales entre continentes y océanos.",
        },
        {
            "qid": 2, "bloom": "Remember", "d": "D1",
            "text": "¿Qué es un mapamundi?",
            "correct": "A",
            "options": [
                ("A) Un mapa que representa toda la superficie de la Tierra", "Correcto. El mapamundi es la representación plana de toda la Tierra."),
                ("B) Un mapa de un solo país", "Incorrecto. Eso sería un mapa nacional."),
                ("C) Un mapa del cielo", "Incorrecto. Eso sería un mapa astronómico."),
                ("D) Un globo terráqueo de tamaño pequeño", "Incorrecto. El mapamundi es plano, no esférico."),
            ],
            "explanation": "El mapamundi (del latín 'mappa' = mapa y 'mundi' = mundo) es una representación plana de toda la superficie terrestre. Existen diferentes tipos de proyecciones cartográficas para crearlos.",
        },
        {
            "qid": 3, "bloom": "Understand", "d": "D2",
            "text": "¿Por qué el globo terráqueo es más preciso que un mapamundi para mostrar la forma de los continentes?",
            "correct": "C",
            "options": [
                ("A) Porque el globo terráqueo es más grande", "Incorrecto. El tamaño no determina la precisión de la forma."),
                ("B) Porque el mapamundi usa colores diferentes", "Incorrecto. Los colores no afectan la forma."),
                ("C) Porque el globo terráqueo conserva la forma esférica de la Tierra", "Correcto. Al ser esférico, evita las deformaciones propias de los mapas planos."),
                ("D) Porque el globo terráqueo es más fácil de guardar", "Incorrecto. La facilidad de almacenamiento no se relaciona con la precisión."),
            ],
            "explanation": "El globo terráqueo representa la Tierra en 3D conservando su forma curva, por lo que no deforma las proporciones. Los mapamundis, al ser planos, estiran o encogen algunas zonas (como Groenlandia que parece más grande de lo que es).",
        },
        {
            "qid": 4, "bloom": "Understand", "d": "D2",
            "text": "¿Qué ventaja tiene un mapamundi sobre un globo terráqueo?",
            "correct": "D",
            "options": [
                ("A) Muestra la Tierra sin deformaciones", "Incorrecto. El mapamundi sí tiene deformaciones por ser plano."),
                ("B) Es tridimensional", "Incorrecto. El mapamundi es bidimensional (plano)."),
                ("C) Se puede inflar", "Incorrecto. El mapamundi no se infla."),
                ("D) Se puede ver toda la Tierra de un solo vistazo", "Correcto. En un mapamundi se observa toda la superficie terrestre al mismo tiempo."),
            ],
            "explanation": "La principal ventaja del mapamundi es que permite ver toda la Tierra de una sola vez, mientras que el globo terráqueo solo muestra la mitad en cada mirada. Por eso los mapamundis son prácticos para estudiar continentes y océanos.",
        },
        {
            "qid": 5, "bloom": "Remember", "d": "D2",
            "text": "¿Cómo se llama la línea imaginaria principal que divide la Tierra en hemisferio norte y hemisferio sur?",
            "correct": "B",
            "options": [
                ("A) Meridiano de Greenwich", "Incorrecto. Greenwich divide este y oeste."),
                ("B) Línea del Ecuador", "Correcto. La línea del Ecuador o paralelo 0° divide la Tierra en norte y sur."),
                ("C) Trópico de Cáncer", "Incorrecto. Es un paralelo, pero no el principal."),
                ("D) Círculo Polar Ártico", "Incorrecto. Es un paralelo en el extremo norte."),
            ],
            "explanation": "La línea del Ecuador es el paralelo 0° que divide la Tierra en dos hemisferios: norte (boreal) y sur (austral). Colombia está atravesada por el Ecuador en su extremo sur.",
        },
        {
            "qid": 6, "bloom": "Apply", "d": "D3",
            "text": "Un estudiante observa un globo terráqueo y ve que Colombia está cerca de la línea del Ecuador. ¿Cómo es el clima de Colombia según esta ubicación?",
            "correct": "B",
            "options": [
                ("A) Muy frío todo el año", "Incorrecto. Las zonas cercanas al Ecuador no son frías."),
                ("B) Cálido en las tierras bajas y variado por la altitud", "Correcto. El Ecuador da clima cálido, pero la altura en las montañas crea pisos térmicos."),
                ("C) Polar", "Incorrecto. El clima polar está en los polos."),
                ("D) Desértico", "Incorrecto. No todo Colombia es desierto."),
            ],
            "explanation": "Por estar cerca del Ecuador, Colombia recibe luz solar casi constante durante todo el año, lo que da temperaturas cálidas en zonas bajas. Sin embargo, las montañas crean diferentes pisos térmicos: cálido, templado, frío y páramo.",
        },
        {
            "qid": 7, "bloom": "Understand", "d": "D3",
            "text": "¿Qué son las líneas de latitud?",
            "correct": "A",
            "options": [
                ("A) Líneas horizontales que miden la distancia al norte o sur del Ecuador", "Correcto. La latitud son líneas paralelas al Ecuador (paralelos)."),
                ("B) Líneas verticales que miden distancia al este u oeste de Greenwich", "Incorrecto. Esas son las líneas de longitud (meridianos)."),
                ("C) Líneas que marcan los límites entre países", "Incorrecto. Esas son fronteras."),
                ("D) Líneas que muestran las montañas", "Incorrecto. Esas serían curvas de nivel."),
            ],
            "explanation": "Las líneas de latitud (paralelos) miden la distancia angular al norte o sur del Ecuador. La latitud de Bogotá es aproximadamente 4° N (norte del Ecuador).",
        },
        {
            "qid": 8, "bloom": "Apply", "d": "D3",
            "text": "Si en un mapamundi ves que un país está ubicado a 30° de latitud sur, ¿en qué hemisferio se encuentra?",
            "correct": "C",
            "options": [
                ("A) Hemisferio norte", "Incorrecto. Latitud sur significa que está en el hemisferio sur."),
                ("B) Hemisferio occidental", "Incorrecto. La latitud no mide este y oeste."),
                ("C) Hemisferio sur", "Correcto. La latitud sur indica que está en el hemisferio sur."),
                ("D) Hemisferio oriental", "Incorrecto. El hemisferio oriental se relaciona con la longitud, no la latitud."),
            ],
            "explanation": "La latitud mide la distancia angular desde el Ecuador hacia el norte (N) o hacia el sur (S). 30° de latitud sur significa que el país está 30 grados al sur del Ecuador, en el hemisferio sur.",
        },
        {
            "qid": 9, "bloom": "Analyze", "d": "D4",
            "text": "Un estudiante compara un globo terráqueo y un mapamundi. Observa que Groenlandia parece del mismo tamaño que África en el mapamundi, pero sabe que África es 14 veces más grande. ¿Por qué ocurre esta deformación?",
            "correct": "D",
            "options": [
                ("A) Porque el mapamundi está mal dibujado", "Incorrecto. No es un error, es una característica de las proyecciones."),
                ("B) Porque Groenlandia realmente es más grande que África", "Incorrecto. África es mucho más grande."),
                ("C) Porque el globo terráqueo está equivocado", "Incorrecto. El globo es más preciso."),
                ("D) Porque al representar una superficie esférica en un plano, las zonas cercanas a los polos se deforman y se ven más grandes", "Correcto. Las proyecciones cartográficas distorsionan las áreas cerca de los polos."),
            ],
            "explanation": "Toda proyección cartográfica (representación plana de la Tierra) tiene deformaciones. En la proyección Mercator, las zonas cercanas a los polos aparecen más grandes de lo que son. Por eso Groenlandia parece enorme, aunque África es 14 veces mayor.",
        },
        {
            "qid": 10, "bloom": "Evaluate", "d": "D4",
            "text": "¿Cuál es la MEJOR razón para usar un mapamundi en lugar de un globo terráqueo en un salón de clases?",
            "correct": "C",
            "options": [
                ("A) El mapamundi muestra la Tierra sin deformaciones", "Incorrecto. El mapamundi sí deforma."),
                ("B) El mapamundi es más divertido", "Incorrecto. Eso no es una razón académica válida."),
                ("C) El mapamundi permite ver todos los continentes al tiempo y es más práctico para colgar en la pared", "Correcto. La vista completa y la practicidad son sus principales ventajas."),
                ("D) El globo terráqueo no muestra océanos", "Incorrecto. El globo sí muestra océanos."),
            ],
            "explanation": "El mapamundi muestra toda la superficie terrestre de un vistazo, es fácil de colgar, transportar y consultar rápidamente. El globo terráqueo es más preciso pero solo muestra la mitad de la Tierra en cada posición.",
        },
    ],
}

# ---- W05: Repaso P1 ----
bundles["W05"] = {
    "tema": "repaso-p1",
    "rubric": "Repaso general conceptos geográficos básicos: continentes, océanos, mapas, orientación, representaciones de la Tierra",
    "theme": "Repaso P1",
    "questions": [
        {
            "qid": 1, "bloom": "Remember", "d": "D1",
            "text": "¿Cuántos océanos principales reconocemos en el planeta?",
            "correct": "B",
            "options": [
                ("A) 3", "Incorrecto. Hay más de 3 océanos."),
                ("B) 5", "Correcto. Los 5 océanos son: Pacífico, Atlántico, Índico, Antártico y Ártico."),
                ("C) 7", "Incorrecto. No hay 7 océanos."),
                ("D) 2", "Incorrecto. Hay más de 2 océanos."),
            ],
            "explanation": "Los 5 océanos del mundo son: Pacífico (el más grande), Atlántico (segundo), Índico, Antártico (alrededor de la Antártida) y Ártico (en el Polo Norte).",
        },
        {
            "qid": 2, "bloom": "Remember", "d": "D1",
            "text": "¿Qué instrumento utilizaban los navegantes para orientarse en el mar antes de la invención del GPS?",
            "correct": "A",
            "options": [
                ("A) La brújula", "Correcto. La brújula fue el instrumento principal de navegación durante siglos."),
                ("B) El telescopio", "Incorrecto. El telescopio sirve para ver objetos lejanos, no para orientarse."),
                ("C) El termómetro", "Incorrecto. Mide temperatura, no orientación."),
                ("D) El reloj de arena", "Incorrecto. Mide el tiempo, no la dirección."),
            ],
            "explanation": "La brújula fue inventada por los chinos y llegó a Europa en la Edad Media. Su aguja imantada siempre apunta al norte magnético, permitiendo a los navegantes orientarse en altamar.",
        },
        {
            "qid": 3, "bloom": "Understand", "d": "D2",
            "text": "¿Cuál de los siguientes NO es un punto cardinal?",
            "correct": "D",
            "options": [
                ("A) Este", "Incorrecto. El Este sí es un punto cardinal."),
                ("B) Oeste", "Incorrecto. El Oeste sí es un punto cardinal."),
                ("C) Sur", "Incorrecto. El Sur sí es un punto cardinal."),
                ("D) Arriba", "Correcto. 'Arriba' es una dirección relativa, no un punto cardinal."),
            ],
            "explanation": "Los puntos cardinales son Norte, Sur, Este y Oeste. 'Arriba' y 'abajo' son direcciones relativas que dependen de la posición de quien observa, mientras que los puntos cardinales son direcciones fijas y absolutas.",
        },
        {
            "qid": 4, "bloom": "Understand", "d": "D2",
            "text": "¿Qué representa la leyenda de un mapa?",
            "correct": "B",
            "options": [
                ("A) La escala del mapa", "Incorrecto. La escala se muestra aparte."),
                ("B) El significado de los símbolos y colores usados en el mapa", "Correcto. La leyenda explica cada símbolo del mapa."),
                ("C) El título del mapa", "Incorrecto. El título es otro elemento."),
                ("D) La fecha de creación", "Incorrecto. Eso no es la leyenda."),
            ],
            "explanation": "La leyenda o convenciones de un mapa explica qué representa cada símbolo, color o línea. Por ejemplo: azul para ríos, verde para bosques, círculos para ciudades. Sin leyenda, el mapa sería difícil de interpretar.",
        },
        {
            "qid": 5, "bloom": "Remember", "d": "D2",
            "text": "¿Qué continente rodea completamente el Polo Sur?",
            "correct": "C",
            "options": [
                ("A) América", "Incorrecto. América no rodea el Polo Sur."),
                ("B) Europa", "Incorrecto. Europa está en el norte."),
                ("C) La Antártida", "Correcto. La Antártida es el continente que rodea el Polo Sur."),
                ("D) Asia", "Incorrecto. Asia está en el hemisferio norte."),
            ],
            "explanation": "La Antártida es el continente más austral, ubicado alrededor del Polo Sur. Es el continente más frío y el que tiene la mayor altitud promedio. No tiene población permanente, solo bases científicas.",
        },
        {
            "qid": 6, "bloom": "Apply", "d": "D3",
            "text": "Un grupo de estudiantes hace una excursión a la Sierra Nevada de Santa Marta. A las 6 de la mañana ven salir el Sol. ¿Hacia qué punto cardinal deben mirar?",
            "correct": "D",
            "options": [
                ("A) Norte", "Incorrecto. El Sol no sale por el norte."),
                ("B) Oeste", "Incorrecto. El Sol se pone por el oeste."),
                ("C) Sur", "Incorrecto. El Sol no sale por el sur."),
                ("D) Este", "Correcto. El Sol siempre sale por el este (oriente)."),
            ],
            "explanation": "El Sol sale por el Este todos los días debido al movimiento de rotación de la Tierra (que gira de oeste a este). Conocer esto permite orientarse: si miramos hacia donde sale el Sol, estamos mirando al Este.",
        },
        {
            "qid": 7, "bloom": "Understand", "d": "D3",
            "text": "¿Cuál es la diferencia principal entre un globo terráqueo y un mapamundi?",
            "correct": "A",
            "options": [
                ("A) El globo terráqueo es tridimensional y el mapamundi es plano", "Correcto. El globo es una esfera (3D) y el mapamundi es una representación plana (2D)."),
                ("B) El globo terráqueo muestra solo océanos", "Incorrecto. Muestra continentes y océanos."),
                ("C) El mapamundi es más preciso que el globo", "Incorrecto. El globo es más preciso al no deformar."),
                ("D) El globo terráqueo no tiene colores", "Incorrecto. Sí tiene colores."),
            ],
            "explanation": "El globo terráqueo representa la Tierra en tres dimensiones (esfera), conservando las proporciones reales. El mapamundi es una representación plana que, aunque práctica, deforma algunas áreas especialmente cerca de los polos.",
        },
        {
            "qid": 8, "bloom": "Apply", "d": "D3",
            "text": "Si en un mapa de Colombia la escala es 1:4.000.000 y la distancia entre Bogotá y Medellín en el mapa es de 10 cm, ¿cuál es la distancia real aproximada?",
            "correct": "C",
            "options": [
                ("A) 40 km", "Incorrecto. 10 × 4.000.000 = 40.000.000 cm = 400 km."),
                ("B) 4 km", "Incorrecto. El cálculo da 400 km."),
                ("C) 400 km", "Correcto. 10 cm × 4.000.000 = 40.000.000 cm = 400 km."),
                ("D) 4.000 km", "Incorrecto. Eso sería demasiado."),
            ],
            "explanation": "Para calcular la distancia real: distancia en el mapa × denominador de la escala. 10 cm × 4.000.000 = 40.000.000 cm. Como 1 km = 100.000 cm, 40.000.000 ÷ 100.000 = 400 km.",
        },
        {
            "qid": 9, "bloom": "Analyze", "d": "D4",
            "text": "Un explorador está perdido en la selva amazónica colombiana. Tiene una brújula pero su reloj se dañó y no sabe si es de día o de noche. ¿Qué problema podría tener para orientarse?",
            "correct": "A",
            "options": [
                ("A) Ninguno, la brújula funciona de día o de noche sin necesidad del Sol", "Correcto. La brújula usa el campo magnético terrestre, no la luz solar."),
                ("B) No podría usar la brújula porque necesita luz solar", "Incorrecto. La brújula no necesita luz."),
                ("C) Tendría que esperar al amanecer", "Incorrecto. Puede usar la brújula en cualquier momento."),
                ("D) La brújula solo funciona en el mar", "Incorrecto. La brújula funciona en tierra y mar."),
            ],
            "explanation": "La brújula funciona con el campo magnético terrestre, independientemente de la luz solar o la hora del día. Por eso es tan útil: permite orientarse en cualquier condición, incluso de noche o en la densa selva.",
        },
        {
            "qid": 10, "bloom": "Analyze", "d": "D4",
            "text": "Colombia está ubicada en el hemisferio norte, cerca del Ecuador. También está al occidente del meridiano de Greenwich. ¿En qué hemisferios se ubica Colombia?",
            "correct": "B",
            "options": [
                ("A) Solo en el hemisferio sur", "Incorrecto. Colombia está en el hemisferio norte."),
                ("B) Hemisferio norte y hemisferio occidental", "Correcto. Por su latitud está en el norte y por su longitud en el occidental."),
                ("C) Hemisferio sur y hemisferio oriental", "Incorrecto. Ambas afirmaciones son falsas."),
                ("D) Solo en el hemisferio oriental", "Incorrecto. Colombia está al occidente de Greenwich."),
            ],
            "explanation": "La ubicación de Colombia se describe con dos coordenadas: latitud (distancia desde el Ecuador) y longitud (distancia desde Greenwich). Está en el hemisferio norte (latitud 4° N) y en el hemisferio occidental (longitud 74° O).",
        },
    ],
}

def make_bundle(week, data):
    tema = data["tema"]
    theme = data["theme"]
    rubric = data["rubric"]
    qs = data["questions"]
    
    lines = []
    lines.append("---")
    lines.append(f'id: "CO-SOC-5-2026-{week}-{tema}-001-MASTERY"')
    lines.append('country: "colombia"')
    lines.append("grado: 5")
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append(f'tema: "{tema}"')
    lines.append(f'semana: "{week}"')
    lines.append('protocol_version: "5.2"')
    lines.append("year: 2026")
    lines.append("bundle_index: 1")
    lines.append("bundle_size: 10")
    lines.append('alignment: "DBA MEN + Estándares Básicos Ciencias Sociales"')
    lines.append("modern_context: true")
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append(f'rubric_baseline: "{rubric}"')
    lines.append("---")
    lines.append("")
    
    for q in qs:
        qi = q["qid"]
        lines.append(f"## Pregunta {qi} [{q['d']}]")
        lines.append("")
        lines.append(f"**ID:** `{q['id']}`" if "id" in q else f"**ID:** `CO-SOC-5-2026-{week}-{tema}-001-MASTERY-v{qi}`")
        if "id" not in q:
            lines[-1] = f"**ID:** `CO-SOC-5-2026-{week}-{tema}-001-MASTERY-v{qi}`"
        lines.append(f"**Bloom:** {q['bloom']}")
        lines.append("**ICFES:** Sociales y Ciudadanas Competencia")
        lines.append(f"**Context:** {q.get('context', 'Contexto colombiano')}")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q["text"])
        lines.append("")
        lines.append("### Opciones")
        for opt_tuple in q["options"]:
            opt_text, feedback = opt_tuple
            letter = opt_text[0]
            mark = "x" if letter == q["correct"] else " "
            lines.append(f"- [{mark}] {opt_text} <!-- feedback: {feedback} -->")
        lines.append("")
        lines.append("### Explicación Pedagógica")
        lines.append(q["explanation"])
        lines.append("")
        lines.append("---")
        lines.append("")
    
    return "\n".join(lines)


# ============================================================
# Generate all missing bundles
# ============================================================
generated = 0
for week in ["W04", "W05"]:
    if week not in bundles:
        continue
    data = bundles[week]
    tema = data["tema"]
    fname = f"CO-SOC-5-2026-{week}-{tema}-001-MASTERY.md"
    fpath = os.path.join(BASE, fname)
    content = make_bundle(week, data)
    with open(fpath, "w", encoding="utf-8") as f:
        f.write(content)
    generated += 1
    print(f"  Written: {fname}")

print(f"\nTotal generated: {generated}")
