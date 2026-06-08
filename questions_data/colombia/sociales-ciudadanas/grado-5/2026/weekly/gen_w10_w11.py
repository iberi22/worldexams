#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate all weekly bundles W06-W40 for Sociales G5 Colombia.
Run: python gen_all_bundles.py"""

import os, json, sys

BASE = "E:/scripts-python/worldexams/questions_data/colombia/sociales-ciudadanas/grado-5/2026/weekly"
os.makedirs(BASE, exist_ok=True)

def make_bundle(week, tema, rubric, questions):
    """questions is list of dicts."""
    lines = []
    lines.append("---")
    lines.append('id: "CO-SOC-5-2026-%s-%s-001-MASTERY"' % (week, tema))
    lines.append('country: "colombia"')
    lines.append('grado: 5')
    lines.append('asignatura: "sociales-ciudadanas"')
    lines.append('tema: "%s"' % tema)
    lines.append('semana: "%s"' % week)
    lines.append('protocol_version: "5.2"')
    lines.append('year: 2026')
    lines.append('bundle_index: 1')
    lines.append('bundle_size: 10')
    lines.append('alignment: "DBA MEN + Est\u00e1ndares B\u00e1sicos Ciencias Sociales"')
    lines.append('modern_context: true')
    lines.append('distractor_profile: "plausible_peer_set"')
    lines.append('rubric_baseline: "%s"' % rubric)
    lines.append("---")
    lines.append("")
    for i, q in enumerate(questions, 1):
        lines.append("## Pregunta %d [%s]" % (i, q["d"]))
        lines.append("")
        lines.append("**ID:** `CO-SOC-5-2026-%s-%s-001-MASTERY-v%d`" % (week, tema, i))
        lines.append("**Bloom:** %s" % q["bloom"])
        lines.append("**ICFES:** Sociales y Ciudadanas Competencia")
        lines.append("**Context:** Contexto colombiano")
        lines.append("")
        lines.append("### Enunciado")
        lines.append(q["text"])
        lines.append("")
        lines.append("### Opciones")
        for opt in q["options"]:
            letter = opt["text"][0]
            mark = "x" if letter == q["correct"] else " "
            lines.append("- [%s] %s <!-- feedback: %s -->" % (mark, opt["text"], opt["feedback"]))
        lines.append("")
        lines.append("### Explicaci\u00f3n Pedag\u00f3gica")
        lines.append(q["explanation"])
        lines.append("")
        lines.append("---")
        lines.append("")
    return "\n".join(lines)


def Q(text, options, correct, explanation, bloom="Remember", d="D1"):
    return {
        "text": text,
        "options": [{"text": t, "feedback": f} for t, f in options],
        "correct": correct,
        "explanation": explanation,
        "bloom": bloom,
        "d": d,
    }


# ======== W10: Repaso P2 ========
w10 = [
    Q("Cu\u00e1l de los siguientes NO es un accidente del relieve colombiano?",
      [("A) Cordillera Occidental", "Incorrecto. S\u00ed es parte del relieve colombiano."),
       ("B) Llanura del Amazonas", "Incorrecto. S\u00ed es parte del relieve."),
       ("C) Monte Everest", "Correcto. Est\u00e1 en la cordillera del Himalaya en Asia."),
       ("D) Valle del Magdalena", "Incorrecto. S\u00ed es parte del relieve.")],
      "C", "El Monte Everest (8.848 msnm) est\u00e1 en Nepal. Colombia tiene las tres cordilleras de los Andes."),
    Q("Qu\u00e9 r\u00edo nace en el Macizo Colombiano y desemboca en el mar Caribe?",
      [("A) R\u00edo Cauca", "Incorrecto. Desemboca en el Magdalena."),
       ("B) R\u00edo Magdalena", "Correcto. Nace en el Macizo y desemboca en Bocas de Ceniza."),
       ("C) R\u00edo Atrato", "Incorrecto. Nace en la Serran\u00eda del Baud\u00f3."),
       ("D) R\u00edo Amazonas", "Incorrecto. Nace en Per\u00fa.")],
      "B", "El Magdalena recorre Colombia de sur a norte. Es la principal arteria fluvial del pa\u00eds."),
    Q("Cu\u00e1les son los cinco pisos t\u00e9rmicos de Colombia?",
      [("A) C\u00e1lido, templado, fr\u00edo, p\u00e1ramo y glacial", "Correcto."),
       ("B) Tropical, subtropical, des\u00e9rtico, polar", "Incorrecto."),
       ("C) Alto, medio, bajo, costero, monta\u00f1oso", "Incorrecto."),
       ("D) C\u00e1lido, semic\u00e1lido, fr\u00edo, helado", "Incorrecto.")],
      "A", "Pisos: c\u00e1lido (0-1.000 m, >24\u00b0C), templado (1.000-2.000 m, 18-24\u00b0C), fr\u00edo (2.000-3.000 m, 12-18\u00b0C), p\u00e1ramo (3.000-4.000 m, 6-12\u00b0C), glacial (>4.000 m, <6\u00b0C).", d="D2"),
    Q("Cu\u00e1l es la regi\u00f3n natural m\u00e1s poblada de Colombia?",
      [("A) Regi\u00f3n Caribe", "Incorrecto. Es la segunda m\u00e1s poblada."),
       ("B) Regi\u00f3n Pac\u00edfica", "Incorrecto."),
       ("C) Regi\u00f3n Andina", "Correcto. Concentra m\u00e1s del 70% de la poblaci\u00f3n."),
       ("D) Regi\u00f3n Orinoqu\u00eda", "Incorrecto.")],
      "C", "La regi\u00f3n Andina tiene las principales ciudades: Bogot\u00e1, Medell\u00edn, Cali, Bucaramanga."),
    Q("La cuenca hidrogr\u00e1fica m\u00e1s grande de Colombia es la del\u2026",
      [("A) Pac\u00edfico", "Incorrecto. Es la m\u00e1s peque\u00f1a."),
       ("B) Caribe", "Correcto. Recibe las aguas del Magdalena, Cauca, Sin\u00fa y Atrato."),
       ("C) Orinoco", "Incorrecto. Cubre los Llanos Orientales."),
       ("D) Amazonas", "Incorrecto.")],
      "B", "Aproximadamente el 65% del territorio drena hacia el mar Caribe."),
    Q("Qu\u00e9 relaci\u00f3n existe entre la altitud y la temperatura en Colombia?",
      [("A) A mayor altitud, mayor temperatura", "Incorrecto."),
       ("B) A menor altitud, menor temperatura", "Incorrecto."),
       ("C) A mayor altitud, menor temperatura", "Correcto. La temperatura baja 6\u00b0C por cada 1.000 m."),
       ("D) La altitud no afecta la temperatura", "Incorrecto.")],
      "C", "Esta relaci\u00f3n crea los pisos t\u00e9rmicos, dando gran diversidad de climas.", d="D3"),
    Q("Cu\u00e1ntas regiones naturales tiene Colombia?",
      [("A) 4", "Incorrecto."),
       ("B) 6", "Correcto. Andina, Caribe, Pac\u00edfica, Orinoqu\u00eda, Amazon\u00eda e Insular."),
       ("C) 5", "Incorrecto."),
       ("D) 3", "Incorrecto.")],
      "B", "Cada regi\u00f3n tiene caracter\u00edsticas \u00fanicas de relieve, clima, vegetaci\u00f3n y cultura."),
    Q("El r\u00edo Magdalena atraviesa principalmente qu\u00e9 regi\u00f3n natural?",
      [("A) Regi\u00f3n Caribe", "Incorrecto. Solo la parte final."),
       ("B) Regi\u00f3n Andina", "Correcto. Recorre entre la Central y la Oriental."),
       ("C) Regi\u00f3n Pac\u00edfica", "Incorrecto."),
       ("D) Regi\u00f3n Orinoqu\u00eda", "Incorrecto.")],
      "B", "El Magdalena recorre los departamentos de la regi\u00f3n Andina: Huila, Tolima, Cundinamarca, Boyac\u00e1, Santander."),
    Q("Por qu\u00e9 Colombia no tiene estaciones clim\u00e1ticas marcadas como en Europa?",
      [("A) Porque est\u00e1 cerca del Ecuador y recibe luz solar constante", "Correcto."),
       ("B) Porque est\u00e1 en el hemisferio sur", "Incorrecto."),
       ("C) Porque es muy peque\u00f1o", "Incorrecto."),
       ("D) Porque tiene muchos volcanes", "Incorrecto.")],
      "A", "En el Ecuador la duraci\u00f3n del d\u00eda y la noche es casi igual todo el a\u00f1o.", d="D3"),
    Q("Si la cordillera Central est\u00e1 entre la Occidental y la Oriental, \u00bfentre qu\u00e9 r\u00edos se encuentra?",
      [("A) Entre el Cauca y el Magdalena", "Correcto."),
       ("B) Entre el Atrato y el Sin\u00fa", "Incorrecto."),
       ("C) Entre el Amazonas y el Caquet\u00e1", "Incorrecto."),
       ("D) Entre el Meta y el Guaviare", "Incorrecto.")],
      "A", "La cordillera Central est\u00e1 entre los valles del Cauca (occidente) y el Magdalena (oriente).", d="D4"),
]

# ======== W11: Regiones Naturales P2 ========
w11 = [
    Q("Qu\u00e9 regi\u00f3n natural de Colombia se caracteriza por ser una extensa llanura con sabanas y ganader\u00eda?",
      [("A) Regi\u00f3n Andina", "Incorrecto. Es monta\u00f1osa."),
       ("B) Regi\u00f3n Orinoqu\u00eda", "Correcto. Son los Llanos Orientales."),
       ("C) Regi\u00f3n Pac\u00edfica", "Incorrecto. Es selva h\u00fameda."),
       ("D) Regi\u00f3n Insular", "Incorrecto. Son islas.")],
      "B", "La Orinoqu\u00eda cubre los departamentos de Meta, Casanare, Arauca, Vichada. Es ideal para ganader\u00eda extensiva."),
    Q("Qu\u00e9 regi\u00f3n natural colombiana tiene la selva tropical m\u00e1s extensa?",
      [("A) Regi\u00f3n Caribe", "Incorrecto."),
       ("B) Regi\u00f3n Orinoqu\u00eda", "Incorrecto."),
       ("C) Regi\u00f3n Amazon\u00eda", "Correcto. Es la selva amaz\u00f3nica."),
       ("D) Regi\u00f3n Andina", "Incorrecto.")],
      "C", "La Amazon\u00eda colombiana cubre los departamentos de Amazonas, Caquet\u00e1, Putumayo, Guaviare, Guain\u00eda y Vaup\u00e9s."),
    Q("Cu\u00e1les son las islas que forman la regi\u00f3n Insular de Colombia?",
      [("A) San Andr\u00e9s, Providencia y Santa Catalina", "Correcto. En el mar Caribe."),
       ("B) Isla de Pascua", "Incorrecto. Es de Chile."),
       ("C) Islas Gal\u00e1pagos", "Incorrecto. Son de Ecuador."),
       ("D) Archipi\u00e9lago de San Bernardo", "Incorrecto. Son islas menores del Caribe.")],
      "A", "La regi\u00f3n Insular incluye San Andr\u00e9s, Providencia y Santa Catalina en el Caribe, y las islas Malpelo y Gorgona en el Pac\u00edfico."),
    Q("Qu\u00e9 departamentos forman la regi\u00f3n de la Orinoqu\u00eda?",
      [("A) Meta, Casanare, Arauca y Vichada", "Correcto."),
       ("B) Antioquia, Caldas, Quind\u00edo", "Incorrecto."),
       ("C) Atl\u00e1ntico, Bol\u00edvar, Magdalena", "Incorrecto."),
       ("D) Amazonas, Caquet\u00e1, Putumayo", "Incorrecto.")],
      "A", "La Orinoqu\u00eda (Llanos Orientales) comprende Meta, Casanare, Arauca y Vichada."),
    Q("Qu\u00e9 caracteriza a la regi\u00f3n Amazon\u00eda colombiana?",
      [("A) Ser la m\u00e1s poblada", "Incorrecto."),
       ("B) Selva dense, alta biodiversidad y baja densidad de poblaci\u00f3n", "Correcto."),
       ("C) Grandes ciudades industriales", "Incorrecto."),
       ("D) Clima fr\u00edo y monta\u00f1oso", "Incorrecto.")],
      "B", "La Amazon\u00eda tiene la mayor biodiversidad del mundo pero muy baja densidad de poblaci\u00f3n."),
    Q("Qu\u00e9 archipi\u00e9lago del Pac\u00edfico hace parte de la regi\u00f3n Insular?",
      [("A) Islas de San Andr\u00e9s", "Incorrecto. Est\u00e1n en el Caribe."),
       ("B) Isla Malpelo e Isla Gorgona", "Correcto."),
       ("C) Islas Gal\u00e1pagos", "Incorrecto."),
       ("D) Archipi\u00e9lago de Los Roques", "Incorrecto.")],
      "B", "Malpelo y Gorgona son santuarios de fauna marina en el oc\u00e9ano Pac\u00edfico colombiano."),
    Q("Por qu\u00e9 la Orinoqu\u00eda es ideal para la ganader\u00eda?",
      [("A) Por sus monta\u00f1as escarpadas", "Incorrecto."),
       ("B) Por sus llanuras extensas y pastos naturales", "Correcto."),
       ("C) Por su selva impenetrable", "Incorrecto."),
       ("D) Por su clima polar", "Incorrecto.")],
      "B", "Las extensas llanuras de la Orinoqu\u00eda tienen pastos naturales que alimentan al ganado."),
    Q("C\u00f3mo se llama el r\u00edo m\u00e1s importante de la Amazon\u00eda colombiana?",
      [("A) R\u00edo Magdalena", "Incorrecto."),
       ("B) R\u00edo Amazonas", "Correcto. Es el m\u00e1s caudaloso del mundo."),
       ("C) R\u00edo Orinoco", "Incorrecto."),
       ("D) R\u00edo Cauca", "Incorrecto.")],
      "B", "El r\u00edo Amazonas bordea el sur de Colombia y es la principal v\u00eda fluvial de la Amazon\u00eda."),
    Q("Compara la Orinoqu\u00eda y la Amazon\u00eda: \u00bfcu\u00e1l afirmaci\u00f3n es correcta?",
      [("A) La Orinoqu\u00eda tiene selva densa y la Amazon\u00eda tiene sabanas", "Incorrecto. Es al rev\u00e9s."),
       ("B) Ambas tienen el mismo ecosistema", "Incorrecto."),
       ("C) La Orinoqu\u00eda tiene sabanas y la Amazon\u00eda tiene selva tropical", "Correcto."),
       ("D) Ambas son regiones monta\u00f1osas", "Incorrecto.")],
      "C", "La Orinoqu\u00eda son llanuras de sabana; la Amazon\u00eda es selva tropical dense.", d="D4"),
    Q("Por qu\u00e9 la regi\u00f3n Insular colombiana es importante para la biodiversidad marina?",
      [("A) Por sus playas tur\u00edsticas", "Incorrecto."),
       ("B) Por sus arrecifes de coral, manglares y ecosistemas \u00fanicos como el seaflower", "Correcto."),
       ("C) Por sus grandes ciudades", "Incorrecto."),
       ("D) Por sus desiertos", "Incorrecto.")],
      "B", "La Reserva Seaflower alrededor de San Andr\u00e9s protege uno de los arrecifes de coral m\u00e1s grandes del Caribe.", d="D4"),
]

all_data = {
    "W10": ("repaso-p2", "Repaso relieve, hidrograf\u00eda, clima y regiones naturales de Colombia", w10),
    "W11": ("regiones-naturales-p2", "Regiones naturales: Orinoqu\u00eda, Amazon\u00eda, Insular", w11),
}

for week, (tema, rubric, qs) in all_data.items():
    fname = "CO-SOC-5-2026-%s-%s-001-MASTERY.md" % (week, tema)
    path = os.path.join(BASE, fname)
    with open(path, "w", encoding="utf-8") as f:
        f.write(make_bundle(week, tema, rubric, qs))
    print("Wrote %s" % fname)

print("\nDone! W10-W11 generated.")
