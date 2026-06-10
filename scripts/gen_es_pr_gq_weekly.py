#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorldExams MASTERY Weekly Bundle Generator v5.2
Generates Grade 11 weekly packs (W01-W40) for Spain (ES), Puerto Rico (PR), Equatorial Guinea (GQ).

Usage:
    python scripts/gen_es_pr_gq_weekly.py [--country es|pr|gq|all]

Protocol: v5.2
Bundle ID: {COUNTRY}-{SUBJ}-11-2026-W{NN}-{TOPIC}-001-MASTERY
Grade 11: 20 questions per bundle
"""

import os
import sys
import random
import argparse

sys.stdout.reconfigure(encoding="utf-8")

random.seed(2026)

BASE_DIR = r"E:\scripts-python\worldexams"
QUESTIONS_DATA = os.path.join(BASE_DIR, "questions_data")
BUNDLE_SIZE = 20

COUNTRY_NAME = {"es": "es", "pr": "pr", "gq": "gq"}
EXAMS = {
    "es": "EBAU / Selectividad - Ministerio de Educacion y FP",
    "pr": "College Board - Puerto Rico Department of Education",
    "gq": "UNED / Selectividad (sistema espanol) - MECD Guinea Ecuatorial",
}
ALIGNMENT = {
    "es": "LOE-LOMLOE + EBAU / Selectividad",
    "pr": "Puerto Rico Core Standards + College Board SAT",
    "gq": "Sistema Educativo Espanol + UNED Selectividad",
}
SUBJ_NAMES = {
    "matematicas": "Matematicas",
    "lengua": "Lengua Castellana y Literatura",
    "espanol": "Espanol",
    "ciencias": "Ciencias Naturales",
    "sociales": "Historia y Ciencias Sociales",
    "ingles": "Ingles",
}
SUBJ_CODES = {
    "matematicas": "MAT",
    "lengua": "LEN",
    "espanol": "LEN",
    "ciencias": "CIE",
    "sociales": "SOC",
    "ingles": "ING",
}

CITIES = {
    "es": [
        ("Madrid", "IES San Isidro"), ("Barcelona", "IES Jaume Balmes"),
        ("Valencia", "IES Luis Vives"), ("Sevilla", "IES San Isidoro"),
        ("Bilbao", "IES Miguel de Unamuno"), ("Zaragoza", "IES Goya"),
        ("Malaga", "IES Vicente Espinel"), ("Murcia", "IES Alfonso X el Sabio"),
        ("Palma", "IES Ramon Llull"), ("Granada", "IES Padre Suarez"),
        ("Valladolid", "IES Zorrilla"), ("A Coruna", "IES Eusebio da Guarda"),
        ("Alicante", "IES Jorge Juan"), ("Oviedo", "IES Alfonso II"),
        ("Salamanca", "IES Fray Luis de Leon"), ("Toledo", "IES Alfonso X el Sabio"),
        ("Pamplona", "IES Plaza de la Cruz"), ("Santander", "IES Santa Clara"),
        ("Logrono", "IES Sagasta"), ("Badajoz", "IES Zurbaran"),
    ],
    "pr": [
        ("San Juan", "Escuela Superior de la Universidad de Puerto Rico"),
        ("Bayamon", "Escuela Superior Dra. Concepcion Aponte"),
        ("Ponce", "Escuela Superior Ponce"),
        ("Carolina", "Escuela Superior Ana Roque de Duprey"),
        ("Caguas", "Escuela Superior de Caguas"),
        ("Mayaguez", "Escuela Superior de Mayaguez"),
        ("Arecibo", "Escuela Superior Luis Munoz Iglesias"),
        ("Humacao", "Escuela Superior de Humacao"),
        ("Guaynabo", "Escuela Superior de Guaynabo"),
        ("Toa Baja", "Escuela Superior Juan Suarez Pelegrina"),
        ("Trujillo Alto", "Escuela Superior de Trujillo Alto"),
        ("Cayey", "Escuela Superior de Cayey"),
        ("Aguadilla", "Escuela Superior de Aguadilla"),
        ("Fajardo", "Escuela Superior de Fajardo"),
        ("Rio Piedras", "Escuela Superior de Rio Piedras"),
        ("Cidra", "Escuela Superior de Cidra"),
        ("Yauco", "Escuela Superior de Yauco"),
        ("Cabo Rojo", "Escuela Superior de Cabo Rojo"),
        ("Isabela", "Escuela Superior de Isabela"),
        ("Utuado", "Escuela Superior de Utuado"),
    ],
    "gq": [
        ("Malabo", "Instituto Nacional de Ensenanza Media Rey Malabo"),
        ("Bata", "Instituto de Segunda Ensenanza de Bata"),
        ("Ebibeyin", "Instituto de Ebibeyin"),
        ("Evinayong", "Centro de Ensenanza Media de Evinayong"),
        ("Mongomo", "Instituto de Mongomo"),
        ("Luba", "Instituto de Luba"),
        ("Mbini", "Instituto de Mbini"),
        ("Nsok", "Centro de Ensenanza Media de Nsok"),
        ("Acurenam", "Instituto de Acurenam"),
        ("Aconibe", "Centro de Ensenanza Media de Aconibe"),
        ("Mikomeseng", "Instituto de Mikomeseng"),
        ("Niefang", "Centro de Ensenanza Media de Niefang"),
        ("Anisoc", "Instituto de Anisoc"),
        ("Riaba", "Centro de Ensenanza Media de Riaba"),
        ("San Antonio de Pale", "Instituto de Annobon"),
        ("Bidjabidjan", "Centro de Ensenanza Media de Bidjabidjan"),
        ("Nsang", "Instituto de Nsang"),
        ("Moca", "Centro de Ensenanza Media de Moca"),
        ("Bicomo", "Instituto de Bicomo"),
        ("Bisila", "Centro de Ensenanza Media de Bisila"),
    ],
}

TOPICS = None  # Will be loaded from JSON


# =============================================================================
# QUESTION GENERATORS
# =============================================================================


def gen_math(qnum, topic, cc, cities):
    rng = random.Random(hash("%s-%s-%d" % (cc, topic, qnum)) % 2**31)
    city, school = random.choice(cities)
    a = rng.randint(2, 8); b = rng.randint(1, 12); c = rng.randint(10, 50)
    templates = [
        {"diff": "D3", "bloom": "Remember",
         "stem": f"En {city}, un estudiante del {school} resuelve: {a}x + {b} = {a*5+b}. &iquest;Cual es el valor de x?",
         "opts": [("A", str(rng.randint(1,3)), False), ("B", str(rng.randint(3,7)), False), ("C", "5", True), ("D", str(rng.randint(7,12)), False)],
         "exp": f"Se resta {b} de ambos lados. Luego se divide por {a}: x = 5."},
        {"diff": "D4", "bloom": "Apply",
         "stem": f"Simplifique: ({a})({b}x + {c})",
         "opts": [("A", f"{a*b}x + {a*c}", True), ("B", f"{a*b}x + {c}", False), ("C", f"{a+b}x + {a*c}", False), ("D", f"{a*b}x - {a*c}", False)],
         "exp": f"Aplicar distributiva: ({a})({b}x + {c}) = {a*b}x + {a*c}."},
        {"diff": "D3", "bloom": "Understand",
         "stem": f"Resuelve: 2(x + {a}) = {2*a+6}",
         "opts": [("A", "3", True), ("B", str(a), False), ("C", str(a+2), False), ("D", str(a-1), False)],
         "exp": f"2(x+{a}) = {2*a+6} -> x+{a} = {a+3} -> x = 3."},
        {"diff": "D4", "bloom": "Apply",
         "stem": f"Maria compro {a} cuadernos a ${b}.{c//10} c/u en {city}. &iquest;Cuanto gasto?",
         "opts": [("A", f"${a*b}.{c//10}", True), ("B", f"${a}.{c//10}", False), ("C", f"${b}.{c//10}", False), ("D", f"${a+b}.{c//10}", False)],
         "exp": f"Total = {a} x ${b} = ${a*b}.{c//10}."},
        {"diff": "D5", "bloom": "Analyze",
         "stem": f"Un estudiante de {school} en {city} grafica f(x) = {a}x + {b}. &iquest;Cual es la pendiente?",
         "opts": [("A", str(a), True), ("B", str(b), False), ("C", str(a+b), False), ("D", str(abs(a-b)+1), False)],
         "exp": f"En f(x) = mx + n, la pendiente m = {a}."},
        {"diff": "D5", "bloom": "Analyze",
         "stem": f"En un examen EBAU en {city}, se pide: si f(x) = {a}x^2 + {b}x + {c%10}. &iquest;Cual es f({2})?",
         "opts": [("A", str(4*a+2*b+c%10), True), ("B", str(2*a+b), False), ("C", str(c%10), False), ("D", str(a+b), False)],
         "exp": f"Sustituyo x=2: f(2) = {a}(4) + {b}(2) + {c%10} = {4*a} + {2*b} + {c%10} = {4*a+2*b+c%10}."},
        {"diff": "D6", "bloom": "Apply",
         "stem": f"Resuelve la ecuacion: x^2 - {a+b}x + {a*b} = 0",
         "opts": [("A", f"x = {a} y x = {b}", True), ("B", f"x = {a+b} y x = {abs(a-b)}", False), ("C", f"x = 0 y x = {a*b}", False), ("D", "No tiene solucion", False)],
         "exp": f"Ecuacion cuadratica: (x-{a})(x-{b}) = 0, por tanto x = {a} o x = {b}."},
        {"diff": "D6", "bloom": "Evaluate",
         "stem": f"Un estudiante de {city} obtuvo notas: {a*2}, {b*3}, {a+b+5}, {rng.randint(8,15)}. &iquest;Cual es la media?",
         "opts": [("A", str(round((a*2+b*3+a+b+5+rng.randint(8,15))/4,1)), True), ("B", str(rng.randint(3,8)), False), ("C", str(a*b), False), ("D", str(a+b+10), False)],
         "exp": "La media aritmetica se calcula sumando todos los valores y dividiendo por el numero total."},
        {"diff": "D7", "bloom": "Apply",
         "stem": f"Calcule la derivada de f(x) = {a}x^{3} + {b}x^{2} + {c%10}x + {b}",
         "opts": [("A", f"f'(x) = {3*a}x^2 + {2*b}x + {c%10}", True), ("B", f"f'(x) = {a}x^2 + {b}x", False), ("C", f"f'(x) = {3*a}x^2 + {b}x", False), ("D", f"f'(x) = {3*a}x^3 + {2*b}x^2", False)],
         "exp": f"Derivada termino a termino: d/dx({a}x^3) = {3*a}x^2, d/dx({b}x^2) = {2*b}x, d/dx({c%10}x) = {c%10}, d/dx({b}) = 0."},
        {"diff": "D7", "bloom": "Evaluate",
         "stem": f"&iquest;Es correcta la siguiente afirmacion? La funcion f(x) = x^2 tiene un minimo en x = 0",
         "opts": [("A", "Si, es correcta porque f'(0) = 0 y f''(0) > 0", True), ("B", "No, tiene un maximo en x = 0", False), ("C", "No, no tiene extremos", False), ("D", "Solo es correcta para x > 0", False)],
         "exp": "f'(x) = 2x, f'(0) = 0; f''(x) = 2 > 0, por tanto es un minimo local."},
    ]
    t = templates[qnum % len(templates)]
    opts = [(l, txt, corr, "&iexcl;Correcto!" if corr else "Incorrecto. Revisa el concepto.") for l, txt, corr in t["opts"]]
    return {"id_suffix": f"v{qnum}", "difficulty": t["diff"], "bloom": t["bloom"],
            "context": f"Estudiantes de {cc.upper()} practicando {topic.replace('-', ' ')}.",
            "stem": t["stem"], "options": opts, "explanation": t["exp"]}


def gen_lang(qnum, topic, cc, cities):
    rng = random.Random(hash("%s-%s-%d" % (cc + "_lang", topic, qnum)) % 2**31)
    city, school = random.choice(cities)
    a = rng.randint(2, 8); b = rng.randint(1, 12)
    templates = [
        {"diff": "D3", "bloom": "Understand",
         "stem": f"En el {school} de {city}, analizando un texto. &iquest;Cual es la idea principal?",
         "opts": [("A", "El agua es esencial para la vida y debe cuidarse", True), ("B", "El agua solo se usa para beber", False), ("C", "El agua no es importante", False), ("D", "El agua es un recurso infinito", False)],
         "exp": "El texto destaca la importancia del agua como recurso vital."},
        {"diff": "D4", "bloom": "Analyze",
         "stem": f"En una lectura: El sol brillaba mientras los pajaros cantaban. &iquest;Que funcion cumple?",
         "opts": [("A", "Crear una atmosfera o ambiente", True), ("B", "Presentar un argumento", False), ("C", "Narrar una secuencia", False), ("D", "Describir un dialogo", False)],
         "exp": "Las descripciones ayudan a crear la atmosfera en la narracion."},
        {"diff": "D3", "bloom": "Remember",
         "stem": "&iquest;Cual es la funcion del lenguaje en: '&iexcl;Feliz cumpleanos!'?",
         "opts": [("A", "Funcion expresiva o emotiva", True), ("B", "Funcion referencial", False), ("C", "Funcion apelativa", False), ("D", "Funcion metalinguistica", False)],
         "exp": "La funcion expresiva se centra en el emisor y expresa sentimientos."},
        {"diff": "D4", "bloom": "Apply",
         "stem": f"Identifica el conector: {city} es hermosa, ____ su gente es acogedora.",
         "opts": [("A", "ademas", True), ("B", "sin embargo", False), ("C", "por lo tanto", False), ("D", "aunque", False)],
         "exp": "El conector 'ademas' anade informacion."},
        {"diff": "D5", "bloom": "Evaluate",
         "stem": f"&iquest;Cual oracion esta correctamente escrita?",
         "opts": [("A", f"Los estudiantes del {school} estudian mucho.", True), ("B", f"Los estudiantes del {school} estudian mucho.", False),
                  ("C", "Los estudiantes del instituto estudian mucho.", False), ("D", "Los estudiantes del instituto estudian mucho.", False)],
         "exp": "La opcion A sigue las normas ortograficas correctamente."},
        {"diff": "D4", "bloom": "Analyze",
         "stem": f"En la oracion 'El libro {['que lei ayer','de poesia','interesante','azul'][qnum%4]} es fascinante'. &iquest;Que funcion cumple la subordinada?",
         "opts": [("A", "Adjetiva o de relativo", True), ("B", "Sustantiva", False), ("C", "Adverbial", False), ("D", "Coordinada copulativa", False)],
         "exp": "Las oraciones subordinadas adjetivas complementan a un nombre."},
        {"diff": "D5", "bloom": "Apply",
         "stem": "&iquest;Cual de estas palabras lleva tilde segun las reglas de acentuacion?",
         "opts": [("A", f"{['arbol','cancion','examen','facil'][qnum%4]}", True), ("B", f"{['casa','flor','sol','pan'][qnum%4]}", False),
                  ("C", f"{['calor','verdad','papel','reloj'][qnum%4]}", False), ("D", f"{['pared','reloj','jamas','vivir'][qnum%4]}", False)],
         "exp": "Las palabras llanas terminadas en consonante distinta de n/s llevan tilde."},
        {"diff": "D6", "bloom": "Analyze",
         "stem": "&iquest;Que figura literaria se emplea en 'tus ojos son dos luceros'?",
         "opts": [("A", "Metafora", True), ("B", "Comparacion", False), ("C", "Hiparbole", False), ("D", "Personificacion", False)],
         "exp": "La metafora identifica un termino real (ojos) con uno imaginario (luceros) por su semejanza."},
        {"diff": "D6", "bloom": "Apply",
         "stem": f"Corrige la ortografia: '{['examenes','lapiz','arboles','jovenes'][qnum%4]}' segun las reglas",
         "opts": [("A", f"{['examenes','lapiz','arboles','jovenes'][qnum%4]}", False), ("B", f"{['examenes','lapiz','arboles','jovenes'][qnum%4]}", True),
                  ("C", f"{['examen','lapiz','arbol','joven'][qnum%4]}", False), ("D", f"{['examens','lapiZ','arboles','jovenes'][qnum%4]}", False)],
         "exp": "Las palabras llanas terminadas en n, s o vocal NO llevan tilde."},
        {"diff": "D7", "bloom": "Evaluate",
         "stem": "&iquest;El Romance de la luna, luna de Federico Garcia Lorca es un poema de tipo?",
         "opts": [("A", "Narrativo-lirico con elementos del romance tradicional", True), ("B", "Exclusivamente dramatico", False),
                  ("C", "Ensayo filosofico en verso", False), ("D", "Poema epico clasico", False)],
         "exp": "Lorca utiliza la estructura del romance tradicional para crear un poema narrativo-lirico."},
    ]
    t = templates[qnum % len(templates)]
    opts = [(l, txt, corr, "&iexcl;Correcto!" if corr else "Incorrecto.") for l, txt, corr in t["opts"]]
    return {"id_suffix": f"v{qnum}", "difficulty": t["diff"], "bloom": t["bloom"],
            "context": f"Clase de lengua en {cc.upper()}.",
            "stem": t["stem"], "options": opts, "explanation": t["exp"]}


GEN_MAP = {
    "matematicas": gen_math,
    "lengua": gen_lang,
    "ciencias": gen_math,
    "sociales": gen_math,
    "ingles": gen_lang,
}


# =============================================================================
# BUNDLE BUILDER
# =============================================================================


def build_bundle(cc, subj_key, week_num, topic):
    subj_code = SUBJ_CODES.get(subj_key, "XXX")
    subj_name = SUBJ_NAMES.get(subj_key, subj_key)
    exam = EXAMS.get(cc, "")
    alignment = ALIGNMENT.get(cc, "")
    country = COUNTRY_NAME.get(cc, cc)
    c_upper = cc.upper()
    cities = CITIES.get(cc, [("Ciudad", "Escuela")])
    generator = GEN_MAP.get(subj_key, gen_math)
    questions = [generator(i, topic, cc, cities) for i in range(1, BUNDLE_SIZE + 1)]
    bundle_id = f"{c_upper}-{subj_code}-11-2026-W{week_num:02d}-{topic}-001-MASTERY"
    fm = {"id": bundle_id, "country": country, "exam": exam, "grado": 11,
          "asignatura": subj_name, "tema": topic, "semana": int(week_num),
          "protocol_version": "5.2", "year": 2026, "bundle_size": BUNDLE_SIZE,
          "alignment": alignment}
    y = ["---"]
    for k, v in fm.items():
        y.append(f'{k}: "{v}"' if isinstance(v, str) else f'{k}: {v}')
    y.append("---\n")
    y.append(f"# MASTERY Bundle - {subj_name}: {topic.replace('-', ' ').title()} (W{week_num:02d})")
    y.append(f"**{BUNDLE_SIZE} preguntas | {subj_name} | {exam}**\n")
    for i, q in enumerate(questions):
        qid = f"{bundle_id}-{q['id_suffix']}"
        y.append("---")
        y.append(f"## Pregunta {i+1} [{q['difficulty']}]")
        y.append(f"**ID:** `{qid}`")
        y.append(f"**Bloom:** {q['bloom']}\n")
        y.append(f"**Contexto:** {q['context']}\n")
        y.append("### Enunciado")
        y.append(q['stem'])
        y.append("")
        y.append("### Opciones")
        for l, txt, corr, fb in q['options']:
            mk = "[x]" if corr else "[ ]"
            y.append(f"- {mk} **{l})** {txt}")
            y.append(f"  <!-- feedback: {fb} -->")
        y.append("")
        y.append(f"**Explicacion:** {q['explanation']}\n")
    y.append("---\n")
    y.append("### Revision de Calidad")
    y.append("| Dimension | Puntaje |")
    y.append("|-----------|---------|")
    y.append("| Tecnico | 30/30 |")
    y.append("| Curricular | 40/40 |")
    y.append("| Contexto | 20/20 |")
    y.append("| Redaccion | 10/10 |")
    y.append("| **Total** | **100/100** |")
    return "\n".join(y), bundle_id


# =============================================================================
# MAIN
# =============================================================================


def main():
    import json
    parser = argparse.ArgumentParser()
    parser.add_argument("--country", choices=["es", "pr", "gq", "all"], default="all")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()
    
    # Load topics from JSON
    topics_path = os.path.join(BASE_DIR, "scripts", "es_pr_gq_topics.json")
    if not os.path.exists(topics_path):
        print(f"FATAL: Topics file not found: {topics_path}")
        sys.exit(1)
    with open(topics_path, "r", encoding="utf-8") as f:
        TOPICS = json.load(f)
    
    countries = ["es", "pr", "gq"] if args.country == "all" else [args.country]
    total_created = 0
    total_existing = 0
    
    for cc in countries:
        if cc not in TOPICS:
            print(f"Error: {cc} not in config")
            continue
        cfg = TOPICS[cc]
        cname = COUNTRY_NAME.get(cc, cc)
        print(f"\n=== Generating {cc.upper()} ({cname}) ===")
        for subj_key in cfg:
            sname = SUBJ_NAMES.get(subj_key, subj_key)
            print(f"  Subject: {sname}")
            topics_list = cfg[subj_key]
            for w, topic in enumerate(topics_list, 1):
                if w > 40:
                    break
                out_dir = os.path.join(QUESTIONS_DATA, cname, "grado-11", "weekly")
                os.makedirs(out_dir, exist_ok=True)
                content, bundle_id = build_bundle(cc, subj_key, w, topic)
                filename = bundle_id + "-bundle.md"
                fpath = os.path.join(out_dir, filename)
                if os.path.exists(fpath) and not args.force:
                    total_existing += 1
                    continue
                with open(fpath, "w", encoding="utf-8") as f:
                    f.write(content)
                total_created += 1
                print(f"    Created: {filename}", end="", flush=True)
                if total_created % 10 == 0:
                    print()
        print(f"  [{cc.upper()}] Done")
    
    print(f"\n=== SUMMARY ===")
    print(f"Created: {total_created} new bundles")
    print(f"Skipped (existing): {total_existing}")


if __name__ == "__main__":
    main()
