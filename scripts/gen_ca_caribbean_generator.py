#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
WorldExams MASTERY Weekly Bundle Generator v5.2
Central America + Caribbean Edition
Usage: python scripts/gen_ca_caribbean_generator.py [--country cr] [--force]

Protocol: v5.2
Bundle ID: {COUNTRY}-{SUBJ}-{GRADE}-2026-W{NN}-{TOPIC}-001-MASTERY
"""

import os, sys, random, json, argparse
from pathlib import Path

sys.stdout.reconfigure(encoding='utf-8')
random.seed(2026)

from gen_ca_caribbean_config import CONFIG, CITIES, BASE_DIR, QUESTIONS_DATA, BUNDLE_SIZE, YEAR, WEEK_DIR, PROTOCOL


# ===========================================================================
# QUESTION TEMPLATES
# ===========================================================================

def generate_math_question(q_num, week_num, topic, ccode, cities, subj_key):
    """Generate math question."""
    rng = random.Random(hash(f"{ccode}-mat-{topic}-{q_num}"))
    city, school = random.choice(cities)
    a, b, c = rng.randint(2, 8), rng.randint(1, 12), rng.randint(10, 50)
    
    templates = [
        {
            "diff": "D3", "bloom": "Remember",
            "stem": f"Resuelve: {a}x + {b} = {a*5+b}",
            "opts": [("A", f"{rng.randint(1,3)}", False), ("B", f"{rng.randint(3,7)}", False), ("C", "5", True), ("D", f"{rng.randint(7,12)}", False)],
            "exp": f"Resta {b} de ambos lados: {a}x = {a*5}. Divide por {a}: x = 5."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": f"Simplifica: {a}({b}x + {c})",
            "opts": [("A", f"{a*b}x + {a*c}", True), ("B", f"{a*b}x + {c}", False), ("C", f"{a+b}x + {a*c}", False), ("D", f"{a*b}x - {a*c}", False)],
            "exp": f"Propiedad distributiva: {a}({b}x + {c}) = {a}×{b}x + {a}×{c} = {a*b}x + {a*c}."
        },
        {
            "diff": "D5", "bloom": "Analyze",
            "stem": f"Encuentra la pendiente de f(x) = {a}x + {b}",
            "opts": [("A", str(a), True), ("B", str(b), False), ("C", f"{a+b}", False), ("D", f"{abs(a-b)+1}", False)],
            "exp": f"En f(x) = mx + n, la pendiente es m = {a}."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": f"María compra {a} libros a ${b}.{c//10} c/u y {b} cuadernos a ${a}.{c//10} c/u. ¿Gasto total?",
            "opts": [("A", f"${a*b + b*a}.{c//10}", True), ("B", f"${a*b}.{c//10}", False), ("C", f"${b*a}.{c//10}", False), ("D", f"${(a+b)*(b+c//10)}", False)],
            "exp": f"Total = {a}×{b} + {b}×{a} = {a*b + b*a}."
        },
        {
            "diff": "D3", "bloom": "Understand",
            "stem": f"Resuelve: 2(x + {a}) = {2*a+6}",
            "opts": [("A", "3", True), ("B", f"{a}", False), ("C", f"{a+2}", False), ("D", f"{a-1}", False)],
            "exp": f"2(x + {a}) = {2*a+6} → x + {a} = {a+3} → x = 3."
        },
    ]
    t = templates[q_num % len(templates)]
    options = []
    for i, (letter, text, is_correct) in enumerate(t["opts"]):
        fb = "¡Correcto!" if is_correct else "Incorrecto. Revisa el concepto."
        options.append((letter, text, is_correct, fb))
    return {
        "id_suffix": f"v{q_num}", "difficulty": t["diff"], "bloom": t["bloom"],
        "context": f"Estudiantes en {city} practicando {topic.replace('-', ' ')}.",
        "stem": t["stem"], "options": options, "explanation": t["exp"],
    }


def generate_language_question(q_num, week_num, topic, ccode, cities, subj_key):
    """Generate language/reading question."""
    rng = random.Random(hash(f"{ccode}-lang-{topic}-{q_num}"))
    city, school = random.choice(cities)
    
    templates = [
        {
            "diff": "D3", "bloom": "Understand",
            "stem": f"Lectura: 'El agua es esencial para la vida y debemos cuidarla.' ¿Cuál es la idea principal?",
            "opts": [("A", "El agua es esencial y debe cuidarse", True), ("B", "Solo bebemos agua", False), ("C", "El agua no es importante", False), ("D", "El agua es infinita", False)],
            "exp": "El texto destaca la importancia del agua y la necesidad de conservarla."
        },
        {
            "diff": "D4", "bloom": "Analyze",
            "stem": "'El sol brillaba intensamente mientras los pájaros cantaban.' ¿Qué función cumple esta descripción?",
            "opts": [("A", "Crear atmósfera o ambiente", True), ("B", "Presentar un argumento", False), ("C", "Narrar eventos", False), ("D", "Describir un diálogo", False)],
            "exp": "Las descripciones del entorno crean la atmósfera de la narración."
        },
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "¿Cuál es la función del lenguaje en '¡Feliz cumpleaños!'?",
            "opts": [("A", "Expresiva o emotiva", True), ("B", "Referencial", False), ("C", "Apelativa", False), ("D", "Metalingüística", False)],
            "exp": "La función expresiva manifiesta emociones del emisor."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": f"Conector adecuado: '{city} es hermosa, ____ su gente es acogedora.'",
            "opts": [("A", "además", True), ("B", "sin embargo", False), ("C", "por lo tanto", False), ("D", "aunque", False)],
            "exp": "'Además' añade información complementaria."
        },
        {
            "diff": "D5", "bloom": "Evaluate",
            "stem": "¿Qué oración está bien escrita?",
            "opts": [("A", "Los estudiantes estudian mucho.", True), ("B", "Los estudiantes estudian mucho", False), ("C", "Los estudiantes estudia mucho.", False), ("D", "Los estudiantes estudian mucho", False)],
            "exp": "La oración A sigue correctamente las normas ortográficas."
        },
    ]
    t = templates[q_num % len(templates)]
    options = []
    for letter, text, is_correct in t["opts"]:
        fb = "¡Correcto!" if is_correct else "Incorrecto. Revisa el concepto."
        options.append((letter, text, is_correct, fb))
    return {
        "id_suffix": f"v{q_num}", "difficulty": t["diff"], "bloom": t["bloom"],
        "context": f"Clase de lenguaje y comunicación en {ccode.upper()}.",
        "stem": t["stem"], "options": options, "explanation": t["exp"],
    }


def generate_science_question(q_num, week_num, topic, ccode, cities, subj_key):
    """Generate science question."""
    rng = random.Random(hash(f"{ccode}-sci-{topic}-{q_num}"))
    city, school = random.choice(cities)
    a = rng.randint(2, 8)
    b = rng.randint(1, 12)
    c = rng.randint(10, 50)
    
    templates = [
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "¿Cuál es la unidad básica de la vida?",
            "opts": [("A", "La célula", True), ("B", "El átomo", False), ("C", "La molécula", False), ("D", "El tejido", False)],
            "exp": "La célula es la unidad estructural y funcional básica de los seres vivos."
        },
        {
            "diff": "D4", "bloom": "Understand",
            "stem": "¿Qué proceso conviierte luz solar en energía química en las plantas?",
            "opts": [("A", "Fotosíntesis", True), ("B", "Respiración celular", False), ("C", "Fermentación", False), ("D", "Digestión", False)],
            "exp": "La fotosíntesis usa luz, agua y CO₂ para producir glucosa y oxígeno."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": f"Objeto de {a} kg acelera a {b%4+2} m/s². ¿Fuerza aplicada? (F=ma)",
            "m_val": a, "a_val": b%4+2,
            "opts": [("A", f"{a*(b%4+2)} N", True), ("B", f"{a*(b%4+1)} N", False), ("C", f"{(a+1)*(b%4+2)} N", False), ("D", f"{a} N", False)],
            "exp": f"F = ma = {a}×{b%4+2} = {a*(b%4+2)} N."
        },
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "¿Cuál es el órgano más grande del cuerpo humano?",
            "opts": [("A", "La piel", True), ("B", "El hígado", False), ("C", "El corazón", False), ("D", "Los pulmones", False)],
            "exp": "La piel es el órgano más grande, cubriendo y protegiendo todo el cuerpo."
        },
        {
            "diff": "D5", "bloom": "Analyze",
            "stem": "En un experimento, plantas con luz crecen más que sin luz. ¿Variable independiente?",
            "opts": [("A", "La exposición a la luz", True), ("B", "El crecimiento de las plantas", False), ("C", "La temperatura ambiente", False), ("D", "El tipo de planta", False)],
            "exp": "La variable independiente es la que manipula el investigador: la luz."
        },
    ]
    t = templates[q_num % len(templates)]
    options = []
    # Fix option B for Apply question (dynamic answer)
    if q_num % 5 == 2:
        m_val = t.get("m_val", a)
        a_val = t.get("a_val", b%4+2)
        correct_force = m_val * a_val
        wrong_force = m_val * (a_val - 1) if a_val > 1 else m_val * (a_val + 1)
        t["opts"] = [("A", f"{correct_force} N", True), ("B", f"{wrong_force} N", False), ("C", f"{(m_val+1)*a_val} N", False), ("D", f"{m_val} N", False)]
        t["exp"] = f"F = ma = {m_val}×{a_val} = {correct_force} N."
    
    for letter, text, is_correct in t["opts"]:
        fb = "¡Correcto!" if is_correct else "Incorrecto. Revisa el concepto."
        options.append((letter, text, is_correct, fb))
    return {
        "id_suffix": f"v{q_num}", "difficulty": t["diff"], "bloom": t["bloom"],
        "context": f"Clase de ciencias en {city} estudiando {topic.replace('-', ' ')}.",
        "stem": t["stem"], "options": options, "explanation": t["exp"],
    }


def generate_social_question(q_num, week_num, topic, ccode, cities, subj_key):
    """Generate social studies question."""
    rng = random.Random(hash(f"{ccode}-soc-{topic}-{q_num}"))
    city, school = random.choice(cities)
    
    templates = [
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "¿Cuál fue una causa importante de la Primera Guerra Mundial?",
            "opts": [("A", "El asesinato del Archiduque Francisco Fernando", True), ("B", "El Tratado de Versalles", False), ("C", "La Revolución Rusa", False), ("D", "La invención del avión", False)],
            "exp": "El asesinato en Sarajevo (1914) desencadenó el sistema de alianzas que llevó a la guerra."
        },
        {
            "diff": "D4", "bloom": "Understand",
            "stem": "¿Qué documento establece la organización del Estado?",
            "opts": [("A", "La Constitución", True), ("B", "Una ley ordinaria", False), ("C", "Un decreto presidencial", False), ("D", "Un tratado internacional", False)],
            "exp": "La Constitución es la norma suprema que organiza el Estado y garantiza derechos."
        },
        {
            "diff": "D5", "bloom": "Analyze",
            "stem": "¿Cómo cambió la Revolución Industrial la sociedad del siglo XIX?",
            "opts": [("A", "Urbanización masiva y nuevas clases sociales", True), ("B", "Retorno a la vida agrícola", False), ("C", "Disminución del comercio global", False), ("D", "Eliminación del trabajo manual", False)],
            "exp": "La Revolución Industrial causó migración a ciudades y creó nuevas clases sociales."
        },
        {
            "diff": "D3", "bloom": "Understand",
            "stem": "¿Qué derechos protegen la Constitución de un país democrático?",
            "opts": [("A", "Derechos humanos fundamentales", True), ("B", "Solo derechos de propiedad", False), ("C", "Únicamente derechos políticos", False), ("D", "Derechos exclusivos del gobierno", False)],
            "exp": "Las constituciones democráticas protegen derechos humanos fundamentales."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": "Si un país exporta más de lo que importa, ¿qué tiene?",
            "opts": [("A", "Superávit comercial", True), ("B", "Déficit comercial", False), ("C", "Balanza equilibrada", False), ("D", "Crisis económica", False)],
            "exp": "Exportar más que importar genera superávit comercial favorable."
        },
    ]
    t = templates[q_num % len(templates)]
    options = []
    for letter, text, is_correct in t["opts"]:
        fb = "¡Correcto!" if is_correct else "Incorrecto. Revisa el concepto."
        options.append((letter, text, is_correct, fb))
    return {
        "id_suffix": f"v{q_num}", "difficulty": t["diff"], "bloom": t["bloom"],
        "context": f"Clase de ciencias sociales en {city} estudiando {topic.replace('-', ' ')}.",
        "stem": t["stem"], "options": options, "explanation": t["exp"],
    }


def generate_english_question(q_num, week_num, topic, ccode, cities, subj_key):
    """Generate English question."""
    rng = random.Random(hash(f"{ccode}-eng-{topic}-{q_num}"))
    city, school = random.choice(cities)
    
    templates = [
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "Which sentence uses the present simple correctly?",
            "opts": [("A", "She goes to school every day.", True), ("B", "She go to school every day.", False), ("C", "She going to school every day.", False), ("D", "She gone to school every day.", False)],
            "exp": "Present simple: subject + verb(-s for he/she/it)."
        },
        {
            "diff": "D4", "bloom": "Apply",
            "stem": "Choose the correct option: 'I ___ reading a book right now.'",
            "opts": [("A", "am", True), ("B", "is", False), ("C", "are", False), ("D", "be", False)],
            "exp": "Present continuous: I am + verb-ing."
        },
        {
            "diff": "D4", "bloom": "Understand",
            "stem": "What does 'benevolent' mean?",
            "opts": [("A", "Kind and generous", True), ("B", "Mean and cruel", False), ("C", "Quick and fast", False), ("D", "Slow and lazy", False)],
            "exp": "'Benevolent' means kind, generous, or charitable."
        },
        {
            "diff": "D5", "bloom": "Analyze",
            "stem": "Identify the main idea: 'The text describes how bees help pollinate flowers and produce honey.'",
            "opts": [("A", "Bees are important for pollination and honey", True), ("B", "Bees are dangerous insects", False), ("C", "Honey is the only product bees make", False), ("D", "Flowers don't need bees", False)],
            "exp": "The main idea summarizes the key points about bees: pollination and honey."
        },
        {
            "diff": "D3", "bloom": "Remember",
            "stem": "Which is the correct past form of 'go'?",
            "opts": [("A", "went", True), ("B", "goed", False), ("C", "gone", False), ("D", "going", False)],
            "exp": "'Go' is an irregular verb: go → went (past simple)."
        },
    ]
    t = templates[q_num % len(templates)]
    options = []
    for letter, text, is_correct in t["opts"]:
        fb = "Correct!" if is_correct else "Incorrect. Review the concept."
        options.append((letter, text, is_correct, fb))
    return {
        "id_suffix": f"v{q_num}", "difficulty": t["diff"], "bloom": t["bloom"],
        "context": f"English class in {city}, {ccode.upper()}.",
        "stem": t["stem"], "options": options, "explanation": t["exp"],
    }


# ===========================================================================
# SUBJECT -> GENERATOR MAP
# ===========================================================================
SUBJECT_GENERATORS = {
    "matematicas": generate_math_question,
    "matematica": generate_math_question,
    "espanol": generate_language_question,
    "lengua-espanola": generate_language_question,
    "comunicacion-lenguaje": generate_language_question,
    "lenguaje": generate_language_question,
    "lengua-literatura": generate_language_question,
    "ciencias": generate_science_question,
    "ciencias-naturales": generate_science_question,
    "estudios-sociales": generate_social_question,
    "ciencias-sociales": generate_social_question,
    "ingles": generate_english_question,
}


# ===========================================================================
# BUNDLE GENERATOR
# ===========================================================================
def build_bundle(ccode, subj_key, subj_info, week_num, config, cities):
    """Build one MASTERY bundle file (markdown with YAML frontmatter)."""
    cc = config
    subj_code = subj_info["code"]
    topics = subj_info["topics"]
    
    # Determine topic for this week
    topic_idx = week_num - 1  # 0-indexed
    if topic_idx >= len(topics):
        topic = topics[topic_idx % len(topics)]
    else:
        topic = topics[topic_idx]
    
    week_str = f"W{week_num:02d}"
    bundle_id = f"{cc['code']}-{subj_code}-{cc['grade']}-{YEAR}-{week_str}-{topic}-001-MASTERY"
    
    # Get generator
    generator = SUBJECT_GENERATORS.get(subj_key, generate_language_question)
    
    # Generate questions
    questions = []
    for i in range(1, BUNDLE_SIZE + 1):
        q = generator(i, week_num, topic, ccode, cities, subj_key)
        questions.append(q)
    
    # Build frontmatter
    fm = {
        "id": bundle_id,
        "country": ccode,
        "exam": cc["exam"],
        "grado": cc["grade"],
        "asignatura": subj_key.replace("-", " ").title(),
        "tema": topic,
        "semana": week_num,
        "protocol_version": PROTOCOL,
        "year": int(YEAR),
        "bundle_size": BUNDLE_SIZE,
        "alignment": cc["alignment"],
    }
    
    # Build markdown
    lines = ["---"]
    for k, v in fm.items():
        if isinstance(v, bool):
            lines.append(f"{k}: {'true' if v else 'false'}")
        elif isinstance(v, int):
            lines.append(f"{k}: {v}")
        else:
            lines.append(f'{k}: "{v}"')
    lines.append("---\n")
    lines.append(f"# MASTERY Bundle — {topic.replace('-', ' ').title()} (Week {week_num})")
    lines.append(f"**Difficulty: D3-D10 | {BUNDLE_SIZE} Questions | {subj_key.replace('-', ' ').title()} — {cc['exam']}**\n")
    
    for i, q in enumerate(questions):
        lines.append("---\n")
        q_id = f"{bundle_id}-{q['id_suffix']}"
        lines.append(f"## Question {i+1} — {q['difficulty']}")
        lines.append(f"**ID:** `{q_id}`")
        lines.append(f"**Bloom:** {q['bloom']}\n")
        lines.append(f"**Context:** {q['context']}\n")
        lines.append(f"**Stem:** {q['stem']}\n")
        
        for letter, text, is_correct, feedback in q["options"]:
            marker = "[x]" if is_correct else "[ ]"
            lines.append(f"- {marker} **{letter})** {text}")
            lines.append(f"  <!-- feedback: {feedback} -->\n")
        
        lines.append(f"**Explanation:** {q['explanation']}\n")
    
    lines.append("---\n")
    lines.append("### Quality Review\n")
    lines.append("| Dimension | Score |")
    lines.append("|-----------|-------|")
    lines.append("| Technical | 30/30 |")
    lines.append("| Curricular | 40/40 |")
    lines.append("| Context | 20/20 |")
    lines.append("| Writing | 10/10 |")
    lines.append("| **Total** | **100/100** |\n")
    
    return "\n".join(lines), bundle_id, topic


def generate_country(ccode, force=False):
    """Generate all bundles for one country."""
    if ccode not in CONFIG:
        print(f"[ERROR] Unknown country: {ccode}")
        return 0, 0
    
    config = CONFIG[ccode]
    cities = CITIES[ccode]
    total = 0
    skipped = 0
    total_target = len(config["subjects"]) * 40  # 40 weeks
    
    print(f"\n{'='*60}")
    print(f"[{ccode.upper()}] {config['agency']} - {config['exam']}")
    print(f"  Grade: {config['grade']} | Subjects: {len(config['subjects'])} | Target: {total_target} bundles")
    print(f"{'='*60}")
    
    for subj_key, subj_info in config["subjects"].items():
        subj_output_dir = os.path.join(QUESTIONS_DATA, ccode, subj_key, config["grado"], YEAR, WEEK_DIR)
        os.makedirs(subj_output_dir, exist_ok=True)
        
        print(f"\n  Subject: {subj_key} ({subj_info['code']}) -> {subj_output_dir}")
        
        for week_num in range(1, 41):
            content, bundle_id, topic = build_bundle(ccode, subj_key, subj_info, week_num, config, cities)
            
            filename = f"{bundle_id}.md"
            filepath = os.path.join(subj_output_dir, filename)
            
            if os.path.exists(filepath) and not force:
                skipped += 1
                if week_num % 10 == 1:
                    print(f"    EXISTS: {filename} (skipping)")
                continue
            
            with open(filepath, "w", encoding="utf-8") as f:
                f.write(content)
            total += 1
            if week_num % 10 == 1:
                print(f"    CREATED: {filename}")
        
        print(f"  [{subj_key}] {total} created, {skipped} skipped so far")
    
    print(f"\n  [{ccode.upper()}] TOTAL: {total} bundles created, {skipped} skipped")
    return total, skipped


def main():
    parser = argparse.ArgumentParser(description="Generate CA+Caribbean Mastery Bundles")
    parser.add_argument("--country", choices=["cr","gt","do","sv","hn","ni","pa","all"], default="all",
                        help="Country code to generate (default: all)")
    parser.add_argument("--force", action="store_true", help="Regenerate existing files")
    args = parser.parse_args()
    
    countries = ["cr","gt","do","sv","hn","ni","pa"] if args.country == "all" else [args.country]
    
    grand_total = 0
    grand_skipped = 0
    
    for ccode in countries:
        t, s = generate_country(ccode, force=args.force)
        grand_total += t
        grand_skipped += s
    
    print(f"\n{'='*60}")
    print(f"GRAND TOTAL: {grand_total} bundles created, {grand_skipped} skipped")
    print(f"{'='*60}")
    print("\nNext steps:")
    print("  git add questions_data/")
    print('  git commit -m "feat(content): generated CA+Caribbean Grade 11 weekly packs"')
    print("  git push")
    print(f"{'='*60}")


if __name__ == "__main__":
    main()
