#!/usr/bin/env python3
"""
Part 4: Generators for Dinero, Estimacion, Razonamiento, Avanzado, Repaso + Main
"""

from gen_mat_g3_part1 import *
from gen_mat_g3_part2 import *
from gen_mat_g3_part3 import *

def gen_q_dinero(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Cuantos billetes de $2.000 se necesitan para tener $10.000?", [
            opt("5", True, "Correcto! 10.000 ÷ 2.000 = 5 billetes."),
            opt("2", False, "2 x 2.000 = 4.000. Necesitas mas."),
            opt("10", False, "10 x 2.000 = 20.000. El doble."),
            opt("4", False, "4 x 2.000 = 8.000. Faltan 2.000."),
        ], "Divide el total entre el valor del billete: 10.000 ÷ 2.000 = 5."),
        ("Cuantas monedas de $500 equivalen a un billete de $5.000?", [
            opt("10", True, "Correcto! 5.000 ÷ 500 = 10 monedas."),
            opt("5", False, "5 x 500 = 2.500. Es la mitad."),
            opt("20", False, "20 x 500 = 10.000. El doble."),
            opt("15", False, "15 x 500 = 7.500."),
        ], "5.000 ÷ 500 = 10. Necesitas 10 monedas de $500."),
        ("Un juguete cuesta $12.500. Pagas con un billete de $20.000. Cuanto te devuelven?", [
            opt("$7.500", True, "Correcto! 20.000 - 12.500 = 7.500."),
            opt("$8.500", False, "20.000 - 12.500 = 7.500, no 8.500."),
            opt("$7.000", False, "Revisa: 20.000 - 12.500 = 7.500."),
            opt("$12.500", False, "Eso es lo que cuesta. El vuelto es 20.000 - 12.500."),
        ], "Resta: 20.000 - 12.500. Desagrupa: 20.000 = 19.000 + 1.000. 19.000-12.000=7.000, 1.000-500=500. Total: 7.500."),
        ("Cual combinacion suma exactamente $15.000?", [
            opt("Un billete de $10.000 + uno de $5.000", True, "Correcto! 10.000 + 5.000 = 15.000."),
            opt("Dos billetes de $10.000", False, "2 x 10.000 = 20.000."),
            opt("Tres billetes de $5.000", False, "3 x 5.000 = 15.000 tambien."),
            opt("Un billete de $20.000", False, "20.000 > 15.000."),
        ], "10.000 + 5.000 = 15.000. Tambien 3 x 5.000 = 15.000."),
        ("Si tienes 2 billetes de $20.000 y 3 monedas de $1.000, cuanto dinero tienes?", [
            opt("$43.000", True, "Correcto! 40.000 + 3.000 = 43.000."),
            opt("$23.000", False, "Faltan los billetes de 20.000."),
            opt("$50.000", False, "2x20=40, 3x1=3, total 43."),
            opt("$46.000", False, "Revisa: 2x20.000=40.000, 3x1.000=3.000. Total: 43.000."),
        ], "2 x 20.000 = 40.000. 3 x 1.000 = 3.000. Total: 40.000 + 3.000 = 43.000."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {t}", enun, opts, expl)

def gen_q_estimacion(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Estima: 198 + 301 es aproximadamente cuanto?", [
            opt("500", True, "Correcto! 198 ~ 200, 301 ~ 300. 200+300=500."),
            opt("400", False, "198~200, 301~300. 200+300=500."),
            opt("600", False, "Redondea mas cerca."),
            opt("450", False, "200+300=500."),
        ], "Redondea cada numero: 198~200, 301~300. Suma: 200+300=500."),
        ("Redondea 67 a la decena mas cercana.", [
            opt("70", True, "Correcto! 67 tiene 7 unidades >= 5, sube a 70."),
            opt("60", False, "67 > 65, deberia subir a 70."),
            opt("100", False, "Eso es redondear a centena."),
            opt("65", False, "Redondeo: mira las unidades. 7 >= 5, sube."),
        ], "Unidades: 7 >= 5, entonces redondea hacia arriba. 67 -> 70."),
        ("Aproximadamente, cuanto es 9 x 11?", [
            opt("100", False, "9x11=99, se aproxima a 100."),
            opt("99", True, "Correcto! 9 x 11 = 99 exactamente."),
            opt("90", False, "9x10=90. 9x11=99."),
            opt("110", False, "10x11=110. 9x11=99."),
        ], "9 x 11 = 99. Aproximadamente 100."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_razonamiento(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Que numero sigue: 2, 4, 6, 8, __?", [
            opt("10", True, "Correcto! Aumenta de 2 en 2: 8+2=10."),
            opt("9", False, "8+1=9. El patron es +2."),
            opt("12", False, "8+4=12. El patron es +2."),
            opt("7", False, "El patron es ascendente, +2 cada vez."),
        ], "Patron: suma 2 cada vez. 2, 4, 6, 8, 10."),
        ("Si cada figura tiene 3 lados, 5 figuras cuantos lados tienen?", [
            opt("15", True, "Correcto! 5 x 3 = 15 lados."),
            opt("8", False, "5+3=8. Hay que multiplicar."),
            opt("10", False, "5x2=10. Aqui cada figura tiene 3 lados."),
            opt("3", False, "Cada figura tiene 3, pero hay 5 figuras."),
        ], "Multiplica: 5 figuras x 3 lados = 15 lados en total."),
        ("Ana es mayor que Luis. Luis es mayor que Pedro. Quien es el menor?", [
            opt("Pedro", True, "Correcto! Ana > Luis > Pedro. Pedro es el menor."),
            opt("Ana", False, "Ana es la mayor."),
            opt("Luis", False, "Luis esta en medio."),
            opt("No se sabe", False, "Si se sabe: Ana > Luis > Pedro."),
        ], "Orden descendente: Ana > Luis > Pedro. Pedro es el menor."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_avanzado(s, c, ci, t, b, ic, d, es):
    pairs = [
        ("Cuanto es 2.345 + 1.678?", [
            opt("4.023", True, "Correcto! 2.345+1.678=4.023."),
            opt("3.023", False, "Revisa unidades de mil: 2+1+1=4."),
            opt("4.123", False, "Decenas: 4+7+1=12, no 11."),
            opt("3.913", False, "Unidades: 5+8=13. Revisa."),
        ], "Unidades:5+8=13. Decenas:4+7+1=12. Centenas:3+6+1=10. Unidades de mil:2+1+1=4. Total:4.023."),
        ("Cuanto es 5.000 - 2.345?", [
            opt("2.655", True, "Correcto! 5.000-2.345=2.655."),
            opt("2.755", False, "Decenas: -1-4=presto=9-4=5."),
            opt("3.655", False, "Revisa las unidades de mil: 4-2=2."),
            opt("2.345", False, "No, la respuesta no puede ser igual al sustraendo."),
        ], "Desagrupa: 5.000=4.000+1.000. Unidades:10-5=5. Decenas:9-4=5. Centenas:9-3=6. Miles:4-2=2. Total:2.655."),
        ("Cuanto es 23 x 4?", [
            opt("92", True, "Correcto! 23x4=92. 20x4=80, 3x4=12, 80+12=92."),
            opt("82", False, "20x4=80, 3x4=12. 80+12=92."),
            opt("72", False, "20x4=80, no 60."),
            opt("102", False, "23x4=92, no 102."),
        ], "Separa: 23=20+3. (20x4)+(3x4)=80+12=92."),
    ]
    idx = s % len(pairs)
    enun, opts, expl = pairs[idx]
    return q(b, ic, d, es, f"En {c} de {ci}", enun, opts, expl)

def gen_q_repaso(s, c, ci, t, b, ic, d, es, week):
    # Mix of topics
    all_gen = [gen_q_numeros, gen_q_sumaresta, gen_q_multdiv, gen_q_fracciones,
               gen_q_geometria, gen_q_tiempo, gen_q_datos]
    g = all_gen[s % len(all_gen)]
    return g(s % 10, c, ci, t, b, ic, d, es)

# ═══════════════════════════════════════════════════════════════════
# MAIN GENERATION LOGIC
# ═══════════════════════════════════════════════════════════════════

def fill_templates(week, tema, titulo):
    """Generate 10 questions for this week."""
    questions = []
    is_numeros = week in [1, 2]
    is_sumaresta = week in [3, 4, 5]
    is_multdiv = week in [6, 7, 8, 9, 10]
    is_fracciones = week in [11, 12, 13]
    is_geometria = week in [14, 15, 16, 17, 18]
    is_tiempo = week in [19, 20, 21]
    is_datos = week in [22, 23, 24, 25]
    is_avanzado = week in [26, 27, 28, 29, 30]
    is_perimarea = week in [31, 32, 33, 34, 35]
    is_dinero = week == 36
    is_combinados = week == 37
    is_estimacion = week == 38
    is_razonamiento = week == 39
    is_repaso_anual = week == 40

    local_blooms = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"]
    local_icfes = ["Comunicacion y Representacion", "Solucion de Problemas", "Razonamiento Logico"]
    local_diffs = ["D3-D4", "D4-D5", "D5-D6"]

    for s in range(10):
        b = local_blooms[s % len(local_blooms)]
        d = local_diffs[(s // 3) % len(local_diffs)]
        ic = local_icfes[(s // 2) % len(local_icfes)]
        es = max(0.55, round(0.95 - (s * 0.04), 2))
        c = rcolegio()
        ci = rciudad()
        t = rtienda()

        if is_numeros:
            qs = gen_q_numeros(s, c, ci, t, b, ic, d, es)
        elif is_sumaresta:
            qs = gen_q_sumaresta(s, c, ci, t, b, ic, d, es)
        elif is_multdiv:
            qs = gen_q_multdiv(s, c, ci, t, b, ic, d, es)
        elif is_fracciones:
            qs = gen_q_fracciones(s, c, ci, t, b, ic, d, es)
        elif is_geometria:
            qs = gen_q_geometria(s, c, ci, t, b, ic, d, es, False)
        elif is_tiempo:
            qs = gen_q_tiempo(s, c, ci, t, b, ic, d, es)
        elif is_datos:
            qs = gen_q_datos(s, c, ci, t, b, ic, d, es)
        elif is_perimarea:
            qs = gen_q_geometria(s, c, ci, t, b, ic, d, es, True)
        elif is_dinero:
            qs = gen_q_dinero(s, c, ci, t, b, ic, d, es)
        elif is_combinados:
            qs = gen_q_multdiv(s, c, ci, t, b, ic, d, es)
        elif is_estimacion:
            qs = gen_q_estimacion(s, c, ci, t, b, ic, d, es)
        elif is_razonamiento:
            qs = gen_q_razonamiento(s, c, ci, t, b, ic, d, es)
        else:  # repaso anual
            qs = gen_q_repaso(s, c, ci, t, b, ic, d, es, week)
        questions.append(qs)
    return questions


def generate_weekly(week, tema, titulo, rubrica):
    bundle_id = f"CO-MAT-3-2026-{ws(week)}-{tema}-001-MASTERY"
    content = fm_weekly(week, tema, titulo, rubrica)
    qs = fill_templates(week, tema, titulo)
    for idx, qdata in enumerate(qs, 1):
        bloom, icfes, diff, exp_succ, context, enun, options, expl = qdata
        qid = f"{bundle_id}-v{idx}"
        content += q_block(idx, qid, bloom, icfes, diff, exp_succ, context, enun, options, expl)
    return content


PERIOD_PREGUNTAS = {
    1: [
        q("Remember", "Comunicacion y Representacion", "D3-D4", 0.90, "Contexto colombiano", "Cual es el valor del digito 7 en el numero 473?", [
            opt("7", False, "Incorrecto."), opt("70", True, "Correcto!"), opt("700", False, "Incorrecto."), opt("7 decimas", False, "Incorrecto.")
        ], "Explicacion"),
        q("Understand", "Comunicacion y Representacion", "D3-D4", 0.85, "Contexto", "Cuantas frutas hay?", [
            opt("702", False, "Incorrecto."), opt("812", True, "Correcto!"), opt("712", False, "Incorrecto."), opt("802", False, "Incorrecto.")
        ], "Suma"),
        q("Apply", "Solucion de Problemas", "D4-D5", 0.80, "Contexto", "Cuanto es el vuelto?", [
            opt("1000", True, "Correcto!"), opt("500", False, "Incorrecto."), opt("2000", False, "Incorrecto."), opt("1500", False, "Incorrecto.")
        ], "Vuelto"),
    ],
}

def generate_periodo(periodo, tema, titulo, rubrica, desc):
    bundle_id = f"CO-MAT-3-2026-P{periodo}-{tema}-001-MASTERY"
    content = fm_periodo(periodo, tema, titulo, rubrica, desc)

    # Generate 15 questions
    local_blooms = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"]
    local_icfes = ["Comunicacion y Representacion", "Solucion de Problemas", "Razonamiento Logico"]
    local_diffs = ["D3-D4", "D4-D5", "D5-D6"]

    # Use mixed generators for periodos
    gen_funcs = [gen_q_numeros, gen_q_sumaresta, gen_q_multdiv, gen_q_fracciones, gen_q_geometria, gen_q_tiempo, gen_q_datos,
                 gen_q_numeros, gen_q_sumaresta, gen_q_multdiv, gen_q_fracciones, gen_q_geometria, gen_q_tiempo, gen_q_datos,
                 gen_q_numeros]

    for idx in range(1, 16):
        b = local_blooms[idx % len(local_blooms)]
        d = local_diffs[(idx // 3) % len(local_diffs)]
        ic = local_icfes[(idx // 2) % len(local_icfes)]
        es = max(0.55, round(0.95 - (idx * 0.025), 2))
        c = rcolegio()
        ci = rciudad()
        t = rtienda()

        g = gen_funcs[idx % len(gen_funcs)]
        qdata = g(idx % 10, c, ci, t, b, ic, d, es)
        bloom, icf, diff, exps, ctx, enun, opts, expl = qdata
        qid = f"{bundle_id}-v{idx}"
        content += q_block(idx, qid, bloom, icf, diff, exps, ctx, enun, opts, expl)

    return content


def main():
    print("=" * 50)
    print("Generando Matematicas G3 Colombia 2026 Bundles")
    print("=" * 50)

    # Generate weekly packs W01-W40
    for week, tema, titulo, rubrica in TOPICS:
        print(f"Generando {ws(week)}: {titulo}...")
        content = generate_weekly(week, tema, titulo, rubrica)
        fname = f"CO-MAT-3-2026-{ws(week)}-{tema}-001-MASTERY-bundle.md"
        fpath = os.path.join(WEEKLY_DIR, fname)
        # Clean old files for this week
        for oldf in os.listdir(WEEKLY_DIR):
            if oldf.startswith(f"CO-MAT-3-2026-{ws(week)}-"):
                os.remove(os.path.join(WEEKLY_DIR, oldf))
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  -> {fname}")

    # Generate period bundles P1-P4
    periodos = [
        (1, "numeros-hasta-1000", "Numeros hasta 1000 y Valor Posicional", "lectura, escritura, valor posicional, suma, resta de numeros hasta 1000",
         "Este bundle cubre los conceptos fundamentales de numeracion y valor posicional hasta 1000, incluyendo suma y resta con reagrupacion. Las preguntas presentan situaciones cotidianas colombianas como compras en tiendas, conteo en colegios y actividades familiares."),
        (2, "multiplicacion-y-division", "Multiplicacion y Division", "multiplicacion como suma repetida, tablas hasta 10, division como reparto",
         "Este bundle cubre la multiplicacion como suma de sumandos iguales, las tablas de multiplicar del 1 al 10, y la division como reparto equitativo. Contextos colombianos como mercados, juegos y actividades escolares."),
        (3, "fracciones-y-geometria", "Fracciones y Geometria", "fracciones como parte de un todo, comparacion de fracciones, figuras geometricas, angulos",
         "Este bundle cubre fracciones basicas (medios, tercios, cuartos), comparacion de fracciones y figuras geometricas planas (triangulos, cuadrados, rectangulos, circulos) con sus propiedades."),
        (4, "medicion-datos-probabilidad", "Medicion, Datos y Probabilidad", "medicion de longitud, peso, capacidad, tiempo, pictogramas, graficas de barras, probabilidad basica",
         "Este bundle cubre medicion en contexto colombiano (centimetros, metros, kilogramos, litros), lectura del reloj y calendario, interpretacion de pictogramas y graficas de barras, y nociones basicas de probabilidad."),
    ]

    for periodo, tema, titulo, rubrica, desc in periodos:
        print(f"Generando Periodo P{periodo}: {titulo}...")
        content = generate_periodo(periodo, tema, titulo, rubrica, desc)
        fname = f"CO-MAT-3-2026-P{periodo}-{tema}-001-MASTERY-bundle.md"
        fpath = os.path.join(PERIODOS_DIR, fname)
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  -> {fname}")

    print("=" * 50)
    print("Generacion completada!")
    print(f"Weekly packs: {len([t for t in TOPICS])}")
    print(f"Period bundles: 4")
    print(f"Directorio: {BASE}")

if __name__ == "__main__":
    main()
