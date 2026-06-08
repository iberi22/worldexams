#!/usr/bin/env python3
"""
Generator for Ciencias Naturales Weekly Packs G3, G4, G5 W01-W40.
Generates full bundles with 10 questions each, aligned to DBA MEN.
"""

import os
import json
import random

random.seed(42)

BASE = "E:/scripts-python/worldexams/questions_data/colombia/ciencias-naturales"

# ─── G3 Topic Mapping ──────────────────────────────────────────────
G3_TOPICS = {
    "W01": ("seres-vivos", "Los seres vivos y su entorno: características, ciclo de vida, funciones vitales. Diferencias entre seres vivos y objetos inertes."),
    "W02": ("seres-vivos", "Los seres vivos y su entorno: clasificación básica, necesidades de los seres vivos, relaciones con el entorno."),
    "W03": ("seres-vivos", "Los seres vivos y su entorno: adaptaciones básicas, hábitats, interacciones simples."),
    "W04": ("seres-vivos", "Los seres vivos y su entorno: repaso y refuerzo de características, clasificación y hábitats."),
    "W05": ("plantas", "Las plantas: partes de la planta (raíz, tallo, hojas, flores, frutos) y sus funciones."),
    "W06": ("plantas", "Las plantas: fotosíntesis básica — las plantas producen su propio alimento con luz solar, agua y dióxido de carbono."),
    "W07": ("plantas", "Las plantas: germinación de semillas, condiciones necesarias para el crecimiento de las plantas."),
    "W08": ("plantas", "Las plantas: importancia de las plantas para los seres vivos, usos en la vida cotidiana."),
    "W09": ("animales", "Los animales: clasificación básica — vertebrados e invertebrados, mamíferos, aves, reptiles, anfibios, peces."),
    "W10": ("animales", "Los animales: hábitats — animales terrestres, acuáticos y aéreos."),
    "W11": ("animales", "Los animales: alimentación — herbívoros, carnívoros y omnívoros."),
    "W12": ("animales", "Los animales: reproducción — ovíparos y vivíparos, ciclos de vida."),
    "W13": ("repaso-p1", "Repaso Periodo 1: seres vivos, plantas y animales — repaso integral."),
    "W14": ("repaso-p1", "Repaso Periodo 1: refuerzo de conceptos clave sobre las características de los seres vivos."),
    "W15": ("repaso-p2", "Repaso Periodo 2: plantas, animales, clasificación y hábitats — repaso integral."),
    "W16": ("repaso-p2", "Repaso Periodo 2: evaluación formativa de los temas del primer semestre."),
    "W17": ("agua", "El agua y sus estados: propiedades del agua, estados sólido, líquido y gaseoso."),
    "W18": ("agua", "El agua y sus estados: ciclo del agua — evaporación, condensación, precipitación."),
    "W19": ("agua", "El agua y sus estados: importancia del agua para la vida, usos del agua en Colombia."),
    "W20": ("agua", "El agua y sus estados: cuidado del agua, fuentes de agua en Colombia."),
    "W21": ("aire-clima", "El aire y el clima: composición del aire, propiedades, el viento."),
    "W22": ("aire-clima", "El aire y el clima: el clima — temperatura, precipitación, viento. Climas de Colombia."),
    "W23": ("aire-clima", "El aire y el clima: fenómenos atmosféricos — nubes, lluvia, tormentas."),
    "W24": ("aire-clima", "El aire y el clima: importancia del aire para los seres vivos, contaminación del aire."),
    "W25": ("suelo-recursos", "El suelo y los recursos naturales: componentes del suelo, tipos de suelo."),
    "W26": ("suelo-recursos", "El suelo y los recursos naturales: formación del suelo, capas del suelo."),
    "W27": ("suelo-recursos", "El suelo y los recursos naturales: recursos naturales renovables y no renovables."),
    "W28": ("suelo-recursos", "El suelo y los recursos naturales: conservación del suelo, importancia para la agricultura en Colombia."),
    "W29": ("luz-sonido", "La luz y el sonido: la luz — fuentes de luz, propagación, sombras."),
    "W30": ("luz-sonido", "La luz y el sonido: propiedades de la luz — reflexión, refracción básica."),
    "W31": ("luz-sonido", "La luz y el sonido: el sonido — fuentes de sonido, propagación, tono e intensidad."),
    "W32": ("luz-sonido", "La luz y el sonido: el oído y la audición, la vista y la luz."),
    "W33": ("sistema-solar", "El sistema solar: el Sol como estrella, los planetas del sistema solar."),
    "W34": ("sistema-solar", "El sistema solar: características de los planetas interiores (Mercurio, Venus, Tierra, Marte)."),
    "W35": ("sistema-solar", "El sistema solar: características de los planetas exteriores (Júpiter, Saturno, Urano, Neptuno)."),
    "W36": ("sistema-solar", "El sistema solar: la Luna, movimientos de la Tierra (rotación y traslación), día y noche."),
    "W37": ("repaso-integral", "Repaso integral: agua, aire, suelo, clima — repaso del segundo semestre."),
    "W38": ("repaso-integral", "Repaso integral: luz, sonido, sistema solar — repaso del tercer periodo."),
    "W39": ("repaso-integral", "Repaso integral: todos los temas del año — preparación para evaluación final."),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final — todos los temas del año escolar."),
}

# ─── G4 Topic Mapping ──────────────────────────────────────────────
G4_TOPICS = {
    "W01": ("celula", "La célula: concepto básico, la célula como unidad fundamental de los seres vivos. Tipos simples de células."),
    "W02": ("celula", "La célula: partes básicas de la célula (membrana, citoplasma, núcleo). Célula animal y vegetal."),
    "W03": ("celula", "La célula: organismos unicelulares y pluricelulares. Ejemplos en la naturaleza colombiana."),
    "W04": ("celula", "La célula: la célula como unidad de vida — repaso de conceptos básicos."),
    "W05": ("tejidos-sistemas", "Tejidos y sistemas del cuerpo humano: concepto de tejido, tipos básicos de tejidos."),
    "W06": ("tejidos-sistemas", "Tejidos y sistemas del cuerpo humano: sistemas del cuerpo — esquelético, muscular."),
    "W07": ("tejidos-sistemas", "Tejidos y sistemas del cuerpo humano: sistema nervioso — cerebro, médula espinal, nervios."),
    "W08": ("tejidos-sistemas", "Tejidos y sistemas del cuerpo humano: repaso de tejidos y sistemas."),
    "W09": ("digestivo-nutricion", "Sistema digestivo y nutrición: órganos del sistema digestivo, proceso de digestión."),
    "W10": ("digestivo-nutricion", "Sistema digestivo y nutrición: la nutrición — grupos alimenticios, la pirámide alimenticia."),
    "W11": ("digestivo-nutricion", "Sistema digestivo y nutrición: alimentos típicos colombianos y su valor nutricional."),
    "W12": ("digestivo-nutricion", "Sistema digestivo y nutrición: hábitos alimenticios saludables, prevención de enfermedades."),
    "W13": ("repaso-p1", "Repaso Periodo 1: la célula — repaso integral de conceptos celulares."),
    "W14": ("repaso-p1", "Repaso Periodo 1: tejidos y sistemas del cuerpo humano — repaso integral."),
    "W15": ("repaso-p2", "Repaso Periodo 2: sistema digestivo y nutrición — repaso integral."),
    "W16": ("repaso-p2", "Repaso Periodo 2: evaluación formativa del primer semestre."),
    "W17": ("ecosistemas-colombia", "Ecosistemas colombianos: tipos de ecosistemas — selvas, páramos, manglares."),
    "W18": ("ecosistemas-colombia", "Ecosistemas colombianos: el páramo colombiano — importancia, flora y fauna."),
    "W19": ("ecosistemas-colombia", "Ecosistemas colombianos: bosques tropicales y selvas del Chocó biogeográfico."),
    "W20": ("ecosistemas-colombia", "Ecosistemas colombianos: ecosistemas acuáticos — ríos, lagos, océanos."),
    "W21": ("cadenas-alimenticias", "Cadenas alimenticias: productores, consumidores y descomponedores."),
    "W22": ("cadenas-alimenticias", "Cadenas alimenticias: redes tróficas, flujo de energía en los ecosistemas."),
    "W23": ("cadenas-alimenticias", "Cadenas alimenticias: ejemplos de cadenas alimenticias en ecosistemas colombianos."),
    "W24": ("cadenas-alimenticias", "Cadenas alimenticias: equilibrio ecológico, impacto humano en las cadenas alimenticias."),
    "W25": ("materia-propiedades", "Materia y sus propiedades: propiedades generales de la materia (masa, volumen, temperatura)."),
    "W26": ("materia-propiedades", "Materia y sus propiedades: estados de la materia — sólido, líquido, gaseoso."),
    "W27": ("materia-propiedades", "Materia y sus propiedades: mezclas — homogéneas y heterogéneas."),
    "W28": ("materia-propiedades", "Materia y sus propiedades: cambios físicos y cambios químicos."),
    "W29": ("cambios-estado", "Cambios de estado: fusión, solidificación, evaporación y condensación."),
    "W30": ("cambios-estado", "Cambios de estado: factores que afectan los cambios de estado (temperatura, presión)."),
    "W31": ("cambios-estado", "Cambios de estado: ciclo del agua y cambios de estado en la naturaleza."),
    "W32": ("cambios-estado", "Cambios de estado: aplicaciones cotidianas de los cambios de estado."),
    "W33": ("maquinas-simples", "Máquinas simples: concepto de máquina simple, la palanca."),
    "W34": ("maquinas-simples", "Máquinas simples: la rueda, el plano inclinado, la polea."),
    "W35": ("maquinas-simples", "Máquinas simples: el tornillo, la cuña — aplicaciones en la vida diaria."),
    "W36": ("maquinas-simples", "Máquinas simples: combinación de máquinas simples, máquinas compuestas."),
    "W37": ("repaso-integral", "Repaso integral: ecosistemas colombianos, cadenas alimenticias — repaso del segundo semestre."),
    "W38": ("repaso-integral", "Repaso integral: materia, propiedades, cambios de estado — repaso del tercer periodo."),
    "W39": ("repaso-integral", "Repaso integral: máquinas simples — repaso del cuarto periodo."),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final — todos los temas del año escolar."),
}

# ─── G5 Topic Mapping ──────────────────────────────────────────────
G5_TOPICS = {
    "W01": ("clasificacion-reinos", "Clasificación de los seres vivos: los cinco reinos — Monera, Protista, Fungi, Plantae, Animalia."),
    "W02": ("clasificacion-reinos", "Clasificación de los seres vivos: características del reino Animalia y Plantae en Colombia."),
    "W03": ("clasificacion-reinos", "Clasificación de los seres vivos: reino Fungi y reino Protista — ejemplos colombianos."),
    "W04": ("clasificacion-reinos", "Clasificación de los seres vivos: reino Monera, bacterias benéficas y patógenas. Los virus (no vivos)."),
    "W05": ("respiratorio-circulatorio", "Sistema respiratorio y circulatorio: órganos del sistema respiratorio, proceso de respiración."),
    "W06": ("respiratorio-circulatorio", "Sistema respiratorio y circulatorio: el sistema circulatorio — corazón, vasos sanguíneos, sangre."),
    "W07": ("respiratorio-circulatorio", "Sistema respiratorio y circulatorio: relación entre respiración y circulación, intercambio de gases."),
    "W08": ("respiratorio-circulatorio", "Sistema respiratorio y circulatorio: enfermedades respiratorias y cardiovasculares en Colombia."),
    "W09": ("nervioso-locomotor", "Sistema nervioso y locomotor: sistema nervioso central y periférico, neuronas."),
    "W10": ("nervioso-locomotor", "Sistema nervioso y locomotor: sistema locomotor — huesos, músculos, articulaciones."),
    "W11": ("nervioso-locomotor", "Sistema nervioso y locomotor: coordinación nerviosa y muscular, movimientos voluntarios e involuntarios."),
    "W12": ("nervioso-locomotor", "Sistema nervioso y locomotor: salud del sistema nervioso y locomotor — postura, ejercicio."),
    "W13": ("repaso-p1", "Repaso Periodo 1: clasificación de los seres vivos — reinos, características principales."),
    "W14": ("repaso-p1", "Repaso Periodo 1: sistema respiratorio y circulatorio — repaso integral."),
    "W15": ("repaso-p2", "Repaso Periodo 2: sistema nervioso y locomotor — repaso integral."),
    "W16": ("repaso-p2", "Repaso Periodo 2: evaluación formativa del primer semestre."),
    "W17": ("ecosistemas-relaciones", "Ecosistemas: relaciones interespecíficas — mutualismo, comensalismo, parasitismo, depredación."),
    "W18": ("ecosistemas-relaciones", "Ecosistemas: relaciones interespecíficas en ecosistemas colombianos — ejemplos del Chocó y la Amazonía."),
    "W19": ("ecosistemas-relaciones", "Ecosistemas: sucesión ecológica, cambios en los ecosistemas a lo largo del tiempo."),
    "W20": ("ecosistemas-relaciones", "Ecosistemas: impacto humano en los ecosistemas colombianos — deforestación, contaminación."),
    "W21": ("ciclos-agua-carbono", "Ciclo del agua: el ciclo hidrológico — evaporación, condensación, precipitación, infiltración."),
    "W22": ("ciclos-agua-carbono", "Ciclo del agua: cuencas hidrográficas colombianas, importancia del agua dulce."),
    "W23": ("ciclos-agua-carbono", "Ciclo del carbono: fotosíntesis, respiración, combustión. El carbono en los seres vivos."),
    "W24": ("ciclos-agua-carbono", "Ciclo del carbono: efecto invernadero, cambio climático, acciones locales en Colombia."),
    "W25": ("energia", "Energía: fuentes renovables y no renovables — concepto de energía, tipos de energía."),
    "W26": ("energia", "Energía: fuentes renovables — solar, eólica, hidroeléctrica, geotérmica. Potencial en Colombia."),
    "W27": ("energia", "Energía: fuentes no renovables — carbón, petróleo, gas natural. Impacto ambiental."),
    "W28": ("energia", "Energía: transformación de la energía, conservación de la energía, eficiencia energética."),
    "W29": ("electricidad", "Electricidad básica: carga eléctrica, corriente eléctrica, circuitos simples."),
    "W30": ("electricidad", "Electricidad básica: conductores y aislantes, materiales conductores colombianos (cobre)."),
    "W31": ("electricidad", "Electricidad básica: pilas y baterías, energía eléctrica en los hogares colombianos."),
    "W32": ("electricidad", "Electricidad básica: seguridad eléctrica, ahorro de energía en casa."),
    "W33": ("magnetismo", "Magnetismo y electroimanes: imanes naturales y artificiales, polos magnéticos."),
    "W34": ("magnetismo", "Magnetismo y electroimanes: campo magnético terrestre, brújula, orientación."),
    "W35": ("magnetismo", "Magnetismo y electroimanes: electroimanes — construcción y aplicaciones."),
    "W36": ("magnetismo", "Magnetismo y electroimanes: relación entre electricidad y magnetismo, aplicaciones tecnológicas."),
    "W37": ("repaso-integral", "Repaso integral: ecosistemas, relaciones interespecíficas, ciclo del agua — segundo semestre."),
    "W38": ("repaso-integral", "Repaso integral: ciclo del carbono, energía renovable y no renovable — tercer periodo."),
    "W39": ("repaso-integral", "Repaso integral: electricidad y magnetismo — cuarto periodo."),
    "W40": ("repaso-integral", "Repaso integral: evaluación formativa final — todos los temas del año escolar."),
}

# ─── Question templates ────────────────────────────────────────────

def make_pregunta(n, did, bloom, icfes_category, expected_success, context, enunciado, opciones, explicacion):
    lines = [f"## Pregunta {n} [D{did}]", ""]
    lines.append(f"**ID:** `{did}`")
    lines.append(f"**Bloom:** {bloom}")
    lines.append(f"**ICFES:** {icfes_category}")
    lines.append(f"**Expected_Success:** {expected_success}")
    lines.append(f"**Context:** {context}")
    lines.append("")
    lines.append("### Enunciado")
    lines.append("")
    lines.append(enunciado)
    lines.append("")
    lines.append("### Opciones")
    for opt, texto, feedback in opciones:
        prefix = "[x]" if opt == "A" else "[ ]"
        lines.append(f"- {prefix} {opt}) {texto} <!-- feedback: {feedback} -->")
    lines.append("")
    lines.append("### Explicación Pedagógica")
    lines.append("")
    lines.append(explicacion)
    lines.append("")
    lines.append("---")
    lines.append("")
    return "\n".join(lines)

# ═══════════════════════════════════════════════════════════════════
# GRADO 3 — Bundle generator
# ═══════════════════════════════════════════════════════════════════

def gen_preguntas_g3(semana, tema_segment):
    """Generate 10 questions for given G3 week."""
    n = semana[1:]  # "01", "02", etc.
    w_int = int(n)
    ext = tema_segment.lower().replace(" ", "-").replace(":","").replace("—","").replace(",","").replace("  "," ").strip()
    id_prefix = f"CO-CIE-3-2026-W{n}-{ext}"

    ctx_col = {
        "Bogotá": "Colegio La Salle en Bogotá",
        "Medellín": "Institución Educativa San José de Medellín",
        "Cali": "Colegio Santa Cecilia de Cali",
        "Barranquilla": "Escuela Normal Superior de Barranquilla",
        "Bucaramanga": "Colegio San Pedro de Bucaramanga",
        "Cartagena": "Institución Educativa San Felipe de Cartagena",
        "Pereira": "Colegio SURAMERICANA de Pereira",
        "Manizales": "Escuela Normal Superior de Manizales",
        "Ibagué": "Colegio San Simón de Ibagué",
        "Neiva": "Institución Educativa Santa Teresa de Neiva",
        "Sincelejo": "Colegio Francisco de Paula Santander en Sincelejo",
        "Valledupar": "Institución Educativa Alfonso López de Valledupar",
        "Riohacha": "Colegio Nacional José María Córdoba en Riohacha",
        "Pasto": "Colegio San Francisco Javier de Pasto",
        "Tunja": "Escuela Normal Superior Santiago de Tunja",
        "Cúcuta": "Colegio San José de Cúcuta",
        "Leticia": "Escuela Rural La Esperanza en Leticia, Amazonas",
        "Quibdó": "Institución Educativa Técnica de Quibdó, Chocó",
        "Mocoa": "Escuela Ecológica de Mocoa, Putumayo",
        "San Andrés": "Colegio Sagrado Corazón de San Andrés Islas",
    }
    keys = sorted(ctx_col.keys())
    def pick_city():
        c = random.choice(keys)
        return c, ctx_col[c]

    qs = []

    # ── W01-W04: Seres vivos ──
    if tema_segment == "seres-vivos":
        if w_int in [1]:
            qs = [
                make_pregunta(1, f"{id_prefix}-001-MASTERY-v1", "Remember", "Uso comprensivo del conocimiento científico", 0.85,
                    f"{pick_city()[1]} está estudiando las características de los seres vivos.",
                    "¿Cuál de las siguientes es una característica de todos los seres vivos?",
                    [("A", "Nacer, crecer, reproducirse y morir", "¡Correcto! Todo ser vivo nace, crece, se reproduce y muere."),
                     ("B", "Volar", "Incorrecto. Muchos seres vivos no vuelan."),
                     ("C", "Vivir en el agua", "Incorrecto. Muchos seres vivos viven en la tierra."),
                     ("D", "Tener patas", "Incorrecto. Las plantas no tienen patas.")],
                    "Todos los seres vivos cumplen un ciclo vital: nacen, crecen, se reproducen y mueren. Esta es la característica fundamental que los distingue de los objetos inertes."),
                make_pregunta(2, f"{id_prefix}-001-MASTERY-v2", "Remember", "Indagación y Comprensión", 0.80,
                    f"En {pick_city()[0]}, los estudiantes observan diferentes elementos en el salón de clase.",
                    "De la siguiente lista, ¿cuál es un ser vivo?",
                    [("A", "Un cuaderno", "Incorrecto. Un cuaderno es un objeto inerte."),
                     ("B", "Una hoja seca", "Incorrecto. Aunque fue parte de una planta, una hoja seca ya no está viva."),
                     ("C", "Una lombriz de tierra", "¡Correcto! La lombriz de tierra es un ser vivo."),
                     ("D", "Una botella de plástico", "Incorrecto. El plástico no tiene vida.")],
                    "La lombriz de tierra es un ser vivo del reino animal. Nace, crece, se reproduce y muere. Los objetos como cuadernos, botellas y hojas secas son inertes."),
                make_pregunta(3, f"{id_prefix}-001-MASTERY-v3", "Understand", "Explicación de fenómenos", 0.75,
                    f"En {pick_city()[0]}, los niños observan un gato que tiene crías.",
                    "Una gata tuvo tres gatitos. ¿Qué función vital está cumpliendo?",
                    [("A", "Nutrición", "Incorrecto. Nutrición es cuando los seres vivos se alimentan."),
                     ("B", "Crecimiento", "Incorrecto. Crecer es aumentar de tamaño."),
                     ("C", "Reproducción", "¡Correcto! Al tener crías, la gata se está reproduciendo."),
                     ("D", "Respiración", "Incorrecto. Respirar es intercambiar gases con el ambiente.")],
                    "La reproducción es la función vital que permite a los seres vivos crear descendencia. La gata tuvo gatitos para continuar su especie."),
                make_pregunta(4, f"{id_prefix}-001-MASTERY-v4", "Understand", "Uso comprensivo del conocimiento científico", 0.70,
                    f"Los estudiantes de {pick_city()[1]} están clasificando elementos.",
                    "¿Qué diferencia a un ser vivo de un objeto inerte?",
                    [("A", "Los seres vivos se mueven solos y los objetos no", "¡Correcto! Los seres vivos tienen movimiento propio y realizan funciones vitales."),
                     ("B", "Los objetos son más pequeños", "Incorrecto. Hay objetos grandes y seres vivos pequeños."),
                     ("C", "Los seres vivos son de colores", "Incorrecto. Hay objetos de colores y seres vivos sin color."),
                     ("D", "Los objetos tienen patas", "Incorrecto. Muchos objetos no tienen patas.")],
                    "Los seres vivos se caracterizan por realizar funciones vitales: se nutren, crecen, responden a estímulos, se reproducen y mueren. Los objetos inertes no hacen nada de esto."),
                make_pregunta(5, f"{id_prefix}-001-MASTERY-v5", "Understand", "Indagación y Comprensión", 0.65,
                    f"En la clase de ciencias de {pick_city()[1]}, la profesora pregunta qué necesitan los seres vivos.",
                    "¿Cuál de los siguientes NO es necesario para que un ser vivo sobreviva?",
                    [("A", "Agua", "Incorrecto. Todos los seres vivos necesitan agua."),
                     ("B", "Alimento", "Incorrecto. Todos los seres vivos necesitan alimento o nutrientes."),
                     ("C", "Un televisor", "¡Correcto! Un televisor no es necesario para la supervivencia."),
                     ("D", "Aire", "Incorrecto. Todos los seres vivos necesitan aire o gases para respirar.")],
                    "Los seres vivos necesitan agua, alimento (nutrientes), aire y un lugar adecuado para vivir para sobrevivir. Los objetos electrónicos como los televisores no son necesarios."),
                make_pregunta(6, f"{id_prefix}-001-MASTERY-v6", "Apply", "Formulación y Ejecución", 0.60,
                    f"En {pick_city()[0]}, los estudiantes hacen un experimento con una planta.",
                    "Si colocas una planta en un armario oscuro y no le das agua durante una semana, ¿qué crees que pasará?",
                    [("A", "La planta crecerá más grande", "Incorrecto. Sin luz ni agua la planta no puede crecer."),
                     ("B", "La planta se pondrá más verde", "Incorrecto. Sin luz, la planta perderá su color verde."),
                     ("C", "La planta se marchitará y podría morir", "¡Correcto! Las plantas necesitan luz solar y agua para vivir."),
                     ("D", "La planta se convertirá en un árbol", "Incorrecto. Eso no ocurre en una semana.")],
                    "Las plantas, como todos los seres vivos, necesitan condiciones adecuadas para vivir. La luz solar les permite hacer fotosíntesis y el agua transporta nutrientes. Sin estos elementos, la planta se marchita."),
                make_pregunta(7, f"{id_prefix}-001-MASTERY-v7", "Apply", "Formulación y Ejecución", 0.55,
                    f"En el jardín botánico de {pick_city()[0]}, los niños observan diferentes seres vivos.",
                    "Un caracol se esconde dentro de su concha cuando siente peligro. ¿Qué función vital está demostrando?",
                    [("A", "Nutrición", "Incorrecto. El caracol no se está alimentando."),
                     ("B", "Reproducción", "Incorrecto. No está teniendo crías."),
                     ("C", "Irritabilidad", "¡Correcto! El caracol está respondiendo a un estímulo de peligro."),
                     ("D", "Crecimiento", "Incorrecto. No está aumentando de tamaño.")],
                    "La irritabilidad es la capacidad de los seres vivos de responder a estímulos del ambiente. El caracol detecta peligro y se protege metiéndose en su concha."),
                make_pregunta(8, f"{id_prefix}-001-MASTERY-v8", "Analyze", "Razonamiento y Argumentación", 0.50,
                    f"Los estudiantes de {pick_city()[1]} comparan una piedra y un perro.",
                    "Una piedra permanece en el mismo lugar durante meses sin cambios. Un perro, en cambio, crece, se mueve y necesita comer. ¿Por qué ocurre esto?",
                    [("A", "Porque el perro es más grande que la piedra", "Incorrecto. Una piedra puede ser más grande que un perro y aún así no tener vida."),
                     ("B", "Porque la piedra es un ser vivo que está dormido", "Incorrecto. Las piedras no son seres vivos."),
                     ("C", "Porque el perro es un ser vivo que realiza funciones vitales y la piedra es un objeto inerte", "¡Correcto! Los seres vivos realizan funciones vitales; los objetos inertes no."),
                     ("D", "Porque al perro le gusta moverse y a la piedra no", "Incorrecto. Las piedras no tienen gustos ni preferencias.")],
                    "Los seres vivos como el perro realizan funciones vitales: se nutren, crecen, responden a estímulos y se reproducen. Los objetos inertes como las piedras no tienen ninguna de estas capacidades."),
                make_pregunta(9, f"{id_prefix}-001-MASTERY-v9", "Analyze", "Explicación de fenómenos", 0.50,
                    f"{pick_city()[1]} está estudiando los ciclos de vida de diferentes animales.",
                    "Observa el ciclo de vida de una mariposa: huevo → oruga → crisálida → mariposa adulta. ¿Qué indica este proceso?",
                    [("A", "Que la mariposa cambia de forma porque quiere", "Incorrecto. No es una decisión, es parte de su naturaleza."),
                     ("B", "Que todos los seres vivos pasan por etapas de desarrollo", "¡Correcto! El ciclo de vida muestra cómo los seres vivos cambian y se desarrollan."),
                     ("C", "Que las mariposas son plantas", "Incorrecto. Las mariposas son animales."),
                     ("D", "Que las mariposas no se reproducen", "Incorrecto. La mariposa adulta se reproduce poniendo huevos.")],
                    "El ciclo de vida de la mariposa es un ejemplo de cómo los seres vivos pasan por diferentes etapas de desarrollo. Todos los seres vivos tienen un ciclo de vida que incluye nacer, crecer, reproducirse y morir."),
                make_pregunta(10, f"{id_prefix}-001-MASTERY-v10", "Evaluate", "Razonamiento y Argumentación", 0.45,
                    f"En {pick_city()[0]}, los niños discuten si una semilla es un ser vivo o no.",
                    "¿Estás de acuerdo con que una semilla es un ser vivo? ¿Por qué?",
                    [("A", "Sí, porque está viva pero en estado de latencia y puede germinar", "¡Correcto! La semilla contiene un embrión vivo que espera condiciones adecuadas."),
                     ("B", "No, porque la semilla no se mueve", "Incorrecto. Las plantas no se mueven del lugar y son seres vivos."),
                     ("C", "No, porque es muy pequeña", "Incorrecto. El tamaño no determina si algo está vivo."),
                     ("D", "Sí, porque podemos comerla", "Incorrecto. Los alimentos no siempre son seres vivos.")],
                    "Una semilla es un ser vivo en estado de latencia. Contiene un embrión vegetal que, cuando encuentra las condiciones adecuadas (agua, temperatura, oxígeno), germina y da origen a una nueva planta."),
            ]
    # ── W05-W08: Plantas ──
    elif tema_segment == "plantas":
        qs = [
            make_pregunta(1, f"{id_prefix}-001-MASTERY-v1", "Remember", "Uso comprensivo", 0.85,
                f"{pick_city()[1]} está aprendiendo las partes de las plantas.",
                "¿Cuál de las siguientes es una parte de la planta que generalmente está bajo tierra?",
                [("A", "Las hojas", "Incorrecto. Las hojas están sobre el tallo."),
                 ("B", "La raíz", "¡Correcto! La raíz crece bajo tierra."),
                 ("C", "Las flores", "Incorrecto. Las flores están en la parte aérea."),
                 ("D", "Los frutos", "Incorrecto. Los frutos están en la parte aérea.")],
                "La raíz es la parte de la planta que crece bajo tierra. Su función es absorber agua y minerales del suelo, y fijar la planta al terreno."),
            make_pregunta(2, f"{id_prefix}-001-MASTERY-v2", "Remember", "Indagación", 0.80,
                f"{pick_city()[1]} está estudiando la función de las hojas.",
                "¿Qué función cumplen las hojas de las plantas?",
                [("