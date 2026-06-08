#!/usr/bin/env python3
"""
Generator: Weekly MASTERY bundles for Lectura Critica — Grado 10 and Grado 11
Produces 80 bundles (40 per grade), 10 questions each = 800 preguntas.
"""

import os, json, io, textwrap, random

random.seed(42)

# ── helpers ──────────────────────────────────────────────────────────────────
BB = ["Remember", "Understand", "Apply", "Analyze", "Evaluate"]

def slug(s):
    return s.lower().replace(" ", "-").replace("í","i").replace("ó","o").replace("é","e").replace("ú","u").replace("ñ","n").replace("á","a")

def wid(n):
    return f"W{n:02d}"

def bundle_id(grado, week, tema_raw):
    return f"CO-LEC-{grado}-2026-{wid(week)}-{slug(tema_raw)}-001-MASTERY"

def filename(grado, week, tema_raw):
    return f"CO-LEC-{grado}-2026-{wid(week)}-{slug(tema_raw)}-001-MASTERY-bundle.md"

def yaml_front(grado, week, tema_raw, rubric):
    tema_slug = slug(tema_raw)
    return f"""---
id: "{bundle_id(grado, week, tema_raw)}"
country: "colombia"
grado: {grado}
asignatura: "lectura-critica"
tema: "{tema_slug}"
semana: {week}
protocol_version: "5.2"
year: 2026
bundle_index: 1
bundle_size: 10
alignment: "DBA MEN + Estándares Básicos Competencias Comunicativas"
modern_context: true
distractor_profile: "plausible_peer_set"
rubric_baseline: "{rubric}"
---"""

# ── G10 BUNDLE DEFINITIONS ──────────────────────────────────────────────────

G10_PLAN = [
    # W01-W05: Textos expositivos y argumentativos
    ("Textos Expositivos — Estructura", "textos expositivos, estructura informativa, datos verificables, organización textual, jerarquía de ideas",
     [
         {"stem": "La amazonía colombiana abarca cerca del 42 % del territorio nacional. Según el IDEAM, la deforestación alcanzó 98 000 hectáreas en 2024, una reducción del 38 % frente a 2023. Las cifras indican una tendencia positiva, pero los expertos advierten que el 38 % sigue siendo alto.\n\n¿Cuál es la función principal de la primera oración del texto?",
          "bloom": "Understand", "opts": ["A) Presentar una opinión personal del autor", "B) Establecer un dato contextual objetivo sobre el que se desarrollará el tema", "", "C) Describir un problema sin aportar evidencia", "D) Concluir el argumento principal del párrafo"],
          "correct": 2, "expl": "La primera oración cumple una función expositiva: sitúa al lector con un dato geográfico que enmarca el tema. No es opinión ni conclusión, sino contexto objetivo."},
         {"stem": "El biólogo colombiano Brigitte Baptiste ha señalado que «los ecosistemas no entienden de fronteras políticas; la conservación debe ser un esfuerzo regional». Baptiste, directora del Instituto Humboldt, enfatiza que Colombia necesita colaborar con Brasil, Perú y Ecuador para proteger la cuenca amazónica.\n\n¿Qué tipo de recurso retórico emplea Baptiste al afirmar que «los ecosistemas no entienden de fronteras políticas»?",
          "bloom": "Analyze", "opts": ["A) Una metáfora literaria sin base científica", "B) Una personificación que atribuye conciencia a los ecosistemas", "", "C) Una hipérbole para exagerar el problema", "D) Una ironía que contradice el discurso ambiental"],
          "correct": 2, "expl": "Atribuir a los ecosistemas la capacidad de 'no entender' es una personificación, figura retórica que traslada cualidades humanas a entidades no humanas, con propósito persuasivo."},
         {"stem": "Lea el siguiente argumento:\nPremisa 1: Todos los humedales colombianos regulan el ciclo del agua.\nPremisa 2: La Ciénaga Grande de Santa Marta es un humedal colombiano.\nConclusión: La Ciénaga Grande regula el ciclo del agua.\n\nEste razonamiento es un ejemplo de:",
          "bloom": "Apply", "opts": ["A) Razonamiento inductivo", "B) Silogismo deductivo válido", "", "C) Falacia de generalización apresurada", "D) Argumento por analogía"],
          "correct": 2, "expl": "Es un silogismo deductivo clásico: dos premisas (una universal, una particular) llevan a una conclusión necesaria. Es válido porque si las premisas son verdaderas, la conclusión debe serlo."},
         {"stem": "En un debate escolar sobre el uso de plásticos de un solo uso en Colombia, una estudiante afirma: «Mi papá dice que los plásticos no son tan malos, y él es ingeniero químico, así que debe tener razón».\n\n¿Qué falacia identificas en este argumento?",
          "bloom": "Analyze", "opts": ["A) Falso dilema", "B) Apelación a la autoridad inapropiada", "", "C) Pendiente resbaladiza", "D) Ataque personal"],
          "correct": 2, "expl": "Apelar a la autoridad de un ingeniero químico para una afirmación general sobre plásticos es una falacia de autoridad inapropiada: su especialidad no cubre el impacto ambiental integral."},
         {"stem": "El gobierno colombiano anunció en 2025 la ampliación del programa «Matrícula Cero» para cubrir el 100 % de los estratos 1, 2 y 3. La medida busca reducir la deserción universitaria, que afecta al 47 % de los estudiantes de bajos ingresos.\n\n¿Cuál es la tesis principal que sostiene este texto?",
          "bloom": "Understand", "opts": ["A) La deserción universitaria es inevitable", "B) Ampliar Matrícula Cero reducirá la deserción en estratos bajos", "", "C) El gobierno debe eliminar todas las matrículas", "D) Los estratos 4, 5 y 6 también necesitan ayuda"],
          "correct": 2, "expl": "La tesis es que la ampliación del programa atacará directamente la deserción (47 % en estratos bajos). Es una relación causal implícita: más cobertura → menos deserción."},
    ]),
]

# ── Because of the massive size, I'll build a programmatic generator ─────────
# Each entry: (tema, rubric, [10 questions])

G10_WEEKS = {}

# --- W01-W05: Textos expositivos y argumentativos ---
G10_WEEKS["W01"] = {
 "tema": "Textos Expositivos — Estructura y Propósito",
 "rubric": "textos expositivos, estructura informativa, proposito comunicativo, datos verificables, organizacion textual",
 "qs": [
  {"bloom":"Remember","stem":"La Amazonía colombiana abarca el 42 % del territorio nacional y alberga más de 50 000 especies registradas. Según el Sinchi, el 36 % de los humedales amazónicos han perdido cobertura desde 2010.\n\n¿Qué institución reporta la pérdida de cobertura de humedales?",
   "opts":["A) IDEAM","B) Sinchi","","C) MinAmbiente","D) FAO"],"correct":2,
   "expl":"El texto menciona explícitamente al Sinchi como la institución que reporta la pérdida del 36 % de cobertura en humedales amazónicos."},
  {"bloom":"Remember","stem":"«Colombia cuenta con 59 áreas protegidas nacionales que cubren aproximadamente el 15 % del territorio continental.»\n\n¿Qué porcentaje del territorio continental colombiano está cubierto por áreas protegidas nacionales?",
   "opts":["A) 10 %","B) 15 %","","C) 20 %","D) 25 %"],"correct":2,
   "expl":"El dato es explícito: las 59 áreas protegidas cubren aproximadamente el 15 % del territorio continental."},
  {"bloom":"Understand","stem":"Los Páramos colombianos proveen el 70 % del agua dulce del país. El Páramo de Santurbán, en Santander, abastece a más de 2 millones de personas. Sin embargo, la minería de oro amenaza su ecosistema.\n\n¿Cuál es la función principal del conector «sin embargo» en el texto?",
   "opts":["A) Sumar información adicional","B) Introducir una oposición o contraste","","C) Indicar una consecuencia","D) Ordenar cronológicamente"],
   "correct":2,"expl":"'Sin embargo' es un conector adversativo que introduce una idea que contrasta con lo dicho antes: la importancia del páramo versus la amenaza minera."},
  {"bloom":"Understand","stem":"Un texto expositivo sobre las Zonas Económicas Especiales en Colombia presenta: (1) Definición, (2) Antecedentes legales, (3) Beneficios fiscales, (4) Casos de éxito, (5) Desafíos.\n\n¿Qué tipo de estructura organizativa tiene el texto descrito?",
   "opts":["A) Causa-efecto","B) Secuencia temática o enumerativa","","C) Comparación-contraste","D) Problema-solución"],
   "correct":2,"expl":"La organización por temas numerados (definición, antecedentes, beneficios, etc.) corresponde a una estructura secuencial o enumerativa, típica de textos expositivos."},
  {"bloom":"Understand","stem":"El proyecto Hidroituango, en Antioquia, es la central hidroeléctrica más grande del país. Su construcción comenzó en 2011 y, tras múltiples retrasos, entró en operación parcial en 2022. Genera el 17 % de la energía del sistema interconectado nacional.\n\n¿Cuál es el propósito principal del texto?",
   "opts":["A) Criticar los retrasos del proyecto","B) Informar objetivamente sobre Hidroituango","","C) Promover el uso de energía hidroeléctrica","D) Narrar la historia de la construcción"],
   "correct":2,"expl":"El texto presenta datos factuales (fechas, porcentajes) sin juicios de valor. Su propósito es expositivo-informativo, no persuasivo ni narrativo."},
  {"bloom":"Apply","stem":"Un estudiante debe escribir un texto expositivo sobre el sistema de salud colombiano. ¿Cuál de los siguientes esquemas organizativos es el más adecuado?",
   "opts":["A) Inicio: anécdota personal — Desarrollo: opiniones — Cierre: reflexión","B) Inicio: definición y contexto — Desarrollo: datos y categorías — Cierre: resumen","","C) Inicio: pregunta retórica — Desarrollo: poema — Cierre: llamado a la acción","D) Inicio: chiste — Desarrollo: diálogo — Cierre: moraleja"],
   "correct":2,"expl":"La estructura expositiva clásica comienza con definición y contexto, desarrolla con datos y categorías, y cierra con síntesis o resumen. Las otras opciones mezclan géneros."},
  {"bloom":"Analyze","stem":"«Según la Contraloría, 1 de cada 4 pesos del presupuesto de salud en 2024 no pudo ser ejecutado por falta de capacidad administrativa en las EPS.»\n\n¿Qué relación inferencial establece el texto entre la no ejecución presupuestal y las EPS?",
   "opts":["A) Las EPS tienen demasiados pacientes","B) La falta de capacidad administrativa de las EPS impidió ejecutar fondos","","C) El gobierno no giró los recursos a tiempo","D) Los hospitales privados bloquearon los pagos"],
   "correct":2,"expl":"El texto vincula directamente la no ejecución del presupuesto con la capacidad administrativa de las EPS. La inferencia es que las EPS no pudieron gestionar los recursos asignados."},
  {"bloom":"Analyze","stem":"En un informe de la Defensoría del Pueblo sobre el desplazamiento forzado en el Chocó, se presenta primero la cifra de 18 000 personas desplazadas en 2025, luego las causas (conflicto armado), después las consecuencias (hacinamiento, desescolarización) y finalmente las recomendaciones.\n\n¿Qué patrón organizativo predomina en este informe?",
   "opts":["A) Cronológico","B) Problema-solución con datos","","C) Espacial","D) Comparativo"],
   "correct":2,"expl":"El informe sigue un patrón problema-solución: presenta un problema (desplazamiento con cifras), lo analiza (causas), detalla efectos (consecuencias) y cierra con recomendaciones (soluciones)."},
  {"bloom":"Evaluate","stem":"Un columnista escribe: «La reforma pensional es necesaria porque el 67 % de los colombianos no cotiza al sistema. Sin cambios, el fondo colapsará en 2035.»\n\n¿Qué fortaleza argumentativa tiene este texto?",
   "opts":["A) Usa datos cuantitativos verificables para sustentar la urgencia","","B) Apela exclusivamente a las emociones del lector","C) Presenta opiniones de varios expertos","D) Incluye experiencias personales conmovedoras"],
   "correct":1,"expl":"La principal fortaleza es el uso de datos concretos (67 % de no cotizantes, fecha de colapso en 2035) que sustentan la necesidad de la reforma. Esto da peso objetivo al argumento."},
  {"bloom":"Evaluate","stem":"Después de leer tres artículos sobre el metro de Bogotá: uno del periódico El Tiempo (describe el avance de obras), otro de la Revista Semana (critica los sobrecostos) y otro de la Alcaldía (destaca los beneficios).\n\n¿Cuál de los tres ofrece la información más objetiva y por qué?",
   "opts":["A) El de la Alcaldía, porque conoce mejor el proyecto","B) El de El Tiempo, porque describe sin emitir juicios evidentes","","C) El de Semana, porque es crítico y cuestiona","D) Todos son igual de objetivos"],
   "correct":2,"expl":"El artículo de El Tiempo, al describir avances sin emitir juicios de valor evidentes, se acerca más a la objetividad informativa. El de la Alcaldía tiene sesgo institucional; el de Semana, sesgo crítico."},
 ]}

G10_WEEKS["W02"] = {
 "tema": "Textos Argumentativos — Tesis y Argumentos",
 "rubric": "textos argumentativos, tesis, premisas, conclusiones, estructura argumentativa, validez",
 "qs": [
  {"bloom":"Remember","stem":"En un texto argumentativo, la tesis es:\n\nA) La historia personal del autor\nB) La idea principal que se defiende con argumentos\nC) El resumen del texto\nD) La lista de fuentes consultadas",
   "opts":["A) La historia personal del autor","B) La idea principal que se defiende con argumentos","","C) El resumen del texto","D) La lista de fuentes consultadas"],
   "correct":2,"expl":"La tesis es la postura o afirmación central que el autor busca defender mediante razonamientos y evidencia a lo largo del texto argumentativo."},
  {"bloom":"Remember","stem":"«Todo ciudadano colombiano tiene derecho a la salud. María es ciudadana colombiana. Por lo tanto, María tiene derecho a la salud.»\n\nEste razonamiento es:",
   "opts":["A) Inductivo","B) Deductivo válido","","C) Falaz","D) Abductivo"],
   "correct":2,"expl":"Es un silogismo deductivo perfectamente válido: premisa universal + premisa particular → conclusión necesaria. Si ambas premisas son verdaderas, la conclusión es inevitable."},
  {"bloom":"Understand","stem":"Un editorial del periódico El Espectador argumenta: «Ampliar la licencia de paternidad a 8 semanas fortalecería la corresponsabilidad en el cuidado y reduciría la desigualdad laboral de género en Colombia.»\n\nIdentifica la tesis de este editorial:",
   "opts":["A) La licencia de paternidad debe reducirse","B) La licencia de 8 semanas es positiva por sus efectos sociales","","C) Colombia tiene desigualdad laboral","D) El cuidado debe ser solo materno"],
   "correct":2,"expl":"La tesis es la afirmación central: que la ampliación de la licencia de paternidad produciría efectos positivos (corresponsabilidad y reducción de desigualdad)."},
  {"bloom":"Understand","stem":"«Colombia debe ratificar el Acuerdo de Escazú porque fortalece la participación ciudadana en temas ambientales, protege a los defensores ambientales y garantiza el acceso a la información.»\n\n¿Qué tipo de argumentos se presentan para apoyar la tesis?",
   "opts":["A) Argumentos de autoridad","B) Argumentos basados en consecuencias positivas","","C) Argumentos emocionales","D) Argumentos por analogía"],
   "correct":2,"expl":"Se presentan tres consecuencias deseables (participación, protección, acceso a información) para justificar la ratificación. Es un argumento basado en consecuencias o fines."},
  {"bloom":"Apply","stem":"Un estudiante defiende la tesis «Las redes sociales deben regularse en Colombia para proteger a los menores». ¿Cuál de los siguientes sería un argumento de apoyo válido?",
   "opts":["A) Las redes sociales son adictivas y punto","B) En 2024, el 72 % de los menores entre 12 y 17 años reportó haber sufrido ciberacoso en Colombia, según la Defensoría","","C) Todos los países deberían hacer lo mismo","D) Mis amigos piensan que es una buena idea"],
   "correct":2,"expl":"La opción B presenta un dato cuantitativo y verificable de una fuente confiable (Defensoría) que respalda la necesidad de proteger a menores. Las otras son opiniones sin sustento o generalizaciones."},
  {"bloom":"Analyze","stem":"«No debemos aprobar la reforma laboral porque el ministro de Hacienda dijo que afectará el empleo formal.»\n\n¿Qué falacia identificas en este argumento?",
   "opts":["A) Ad hominem","B) Apelación a la autoridad","","C) Falso dilema","D) Generalización apresurada"],
   "correct":2,"expl":"Es una apelación a la autoridad (argumentum ad verecundiam): se usa la posición del ministro como única razón para rechazar la reforma, sin examinar el contenido de la reforma misma."},
  {"bloom":"Analyze","stem":"En un debate sobre el glifosato en Colombia, un participante dice: «Si permitimos la erradicación con glifosato, después permitirán fumigar todas las plantaciones del país, incluso las de café.»\n\n¿Qué falacia ilustra esta afirmación?",
   "opts":["A) Falso dilema","B) Pendiente resbaladiza","","C) Petición de principio","D) Hombre de paja"],
   "correct":2,"expl":"La 'pendiente resbaladiza' (slippery slope) asume que un primer paso llevará inevitablemente a una cadena de eventos extremos sin evidencia de que esa progresión ocurrirá."},
  {"bloom":"Analyze","stem":"«El servicio militar obligatorio en Colombia debe mantenerse porque ha existido por más de 100 años.»\n\nIdentifica la falacia presente en este argumento:",
   "opts":["A) Ad antiquitatem (apelación a la tradición)","","B) Ad populum","C) Circularidad","D) Anécdota"],
   "correct":1,"expl":"La falacia ad antiquitatem (o apelación a la tradición) sostiene que algo es correcto porque siempre se ha hecho así. La antigüedad de una práctica no la hace intrínsecamente válida."},
  {"bloom":"Evaluate","stem":"Evalúa la solidez del siguiente argumento: «Colombia debe implementar la jornada laboral de 4 días porque en Islandia se implementó y aumentó la productividad en un 25 %. Además, Bélgica y Reino Unido están haciendo pruebas piloto exitosas.»",
   "opts":["A) Débil: solo usa ejemplos internacionales sin considerar el contexto colombiano","","B) Sólido: ofrece dos ejemplos internacionales verificables","C) Débil: Islandia y Bélgica no existen","D) Sólido: la productividad es el único indicador relevante"],
   "correct":1,"expl":"Aunque presenta evidencia internacional, el argumento es débil porque no considera las diferencias estructurales entre Colombia y esos países (informalidad laboral, productividad base, cultura organizacional)."},
  {"bloom":"Evaluate","stem":"Un artículo de opinión sobre el posconflicto colombiano presenta: (1) Datos de la JEP sobre desmovilizados, (2) Testimonios de víctimas, (3) Cifras de reincorporación económica, (4) Opinión del autor.\n\n¿Qué elemento debilita la objetividad del texto?",
   "opts":["A) Los datos de la JEP","B) Los testimonios de víctimas","C) Las cifras de reincorporación","D) La opinión explícita del autor",""],
   "correct":0,"expl":"En un texto de opinión, la presencia de la postura personal del autor es esperable y no debilita el argumento si está sustentada. Pero si se presenta como 'análisis objetivo', la inclusión de opinión sin sustento adicional debilita esa pretensión de objetividad. En este caso, mezclar datos con opinión puede sesgar la interpretación. La respuesta D es la correcta porque la opinión del autor interfiere con la objetividad que los datos y testimonios intentan construir."},
 ]}

G10_WEEKS["W03"] = {
 "tema": "Falacias y Validez Argumentativa",
 "rubric": "falacias, validez argumentativa, solidez, razonamiento logico, deteccion de errores argumentativos",
 "qs": [
  {"bloom":"Remember","stem":"Una falacia lógica es:",
   "opts":["A) Un argumento verdadero pero mal presentado","B) Un error en el razonamiento que hace inválido un argumento","","C) Una figura retórica literaria","D) Una evidencia científica confirmada"],
   "correct":2,"expl":"Una falacia lógica es un error en la estructura del razonamiento que hace que el argumento sea inválido, aunque la conclusión pueda ser verdadera."},
  {"bloom":"Remember","stem":"¿Qué es un 'argumento ad hominem'?",
   "opts":["A) Atacar la persona que presenta el argumento en lugar del argumento mismo","","B) Apelar a la popularidad de una idea","C) Usar una amenaza para convencer","D) Presentar solo dos opciones extremas"],
   "correct":1,"expl":"Ad hominem significa 'contra el hombre': se descalifica al interlocutor en lugar de refutar sus argumentos."},
  {"bloom":"Understand","stem":"En un foro sobre el sistema de salud, un participante afirma: «La reforma a la salud es un fracaso porque el gobierno anterior la propuso, y ese gobierno fue corrupto.»\n\n¿Qué error lógico encontramos aquí?",
   "opts":["A) Falso dilema","B) Ad hominem (atacar al proponente)","","C) Generalización apresurada","D) Apelación a la ignorancia"],
   "correct":2,"expl":"Se descalifica la reforma basándose en la presunta corrupción del gobierno que la propuso, no en sus méritos o defectos intrínsecos. Es una falacia ad hominem circunstancial."},
  {"bloom":"Understand","stem":"«El 80 % de los colombianos cree que la educación virtual es de menor calidad. Por lo tanto, la educación virtual es inferior a la presencial.»\n\n¿Qué falacia se presenta?",
   "opts":["A) Ad populum (apelación a la mayoría)","","B) Ad verecundiam","C) Tu quoque","D) Non sequitur"],
   "correct":1,"expl":"Es una falacia ad populum: se asume que una idea es correcta porque la mayoría la cree. La percepción popular no determina la verdad de un hecho."},
  {"bloom":"Apply","stem":"Un candidato político dice: «Si no aprueban mi plan de seguridad, Bogotá se convertirá en un caos total como Ciudad Juárez en 2010.»\n\n¿Qué estrategia retórica falaz está usando?",
   "opts":["A) Falsa analogía y apelación al miedo","","B) Argumento por definición","C) Círculo vicioso","D) Evidencia circunstancial"],
   "correct":1,"expl":"Compara dos contextos diferentes (Bogotá 2026 vs. Ciudad Juárez 2010) sin considerar diferencias estructurales (falsa analogía) y apela al miedo para forzar la aprobación."},
  {"bloom":"Apply","stem":"«Todos los políticos colombianos son corruptos. Pedro es político colombiano. Por lo tanto, Pedro es corrupto.»\n\nAunque la estructura es deductivamente válida, ¿cuál es su problema principal?",
   "opts":["A) La premisa mayor es una generalización falsa","","B) La conclusión no se sigue de las premisas","C) Es un argumento inductivo","D) No tiene problemas"],
   "correct":1,"expl":"El silogismo es formalmente válido, pero la premisa mayor «todos los políticos son corruptos» es una generalización falsa. Por tanto, el argumento no es sólido (válido pero no verdadero)."},
  {"bloom":"Analyze","stem":"Un editorial dice: «La JEP ha sido un fracaso porque la extrema derecha dice que es una 'puerta giratoria para narcos' y la extrema izquierda dice que 'persigue a los militares'.»\n\nIdentifica la falacia:",
   "opts":["A) Falso término medio: ambos extremos la critican, luego debe ser incorrecta","","B) Ad hominem","C) Petición de principio","D) Post hoc ergo propter hoc"],
   "correct":1,"expl":"Se asume que si dos posturas opuestas critican algo, eso lo hace incorrecto. Es una falacia de falso término medio o argumento por asociación."},
  {"bloom":"Analyze","stem":"«Colombia no debería firmar más TLC porque el TLC con Estados Unidos no generó los empleos prometidos.»\n\n¿Qué problema lógico tiene este razonamiento?",
   "opts":["A) Generalización a partir de un solo caso","","B) Petición de principio","C) Negación del antecedente","D) Anécdota irrelevante"],
   "correct":1,"expl":"Generaliza el fracaso de un TLC específico a todos los TLC posibles, ignorando que cada acuerdo tiene condiciones, países y sectores diferentes."},
  {"bloom":"Evaluate","stem":"Evalúa este argumento: «La minería ilegal en Colombia genera $15 billones anuales. Muchas familias dependen de ella. Por lo tanto, debería legalizarse.»\n\n¿Cuál es la debilidad principal del argumento?",
   "opts":["A) Confunde un hecho (genera dinero) con un deber (debe legalizarse) sin considerar costos sociales y ambientales","","B) Es demasiado corto","C) Las cifras no son verificables","D) No menciona al gobierno"],
   "correct":1,"expl":"El argumento comete la falacia naturalista (saltar del 'es' al 'debe ser'): solo porque algo existe y genera ingresos no significa que deba legalizarse. Ignora externalidades negativas."},
  {"bloom":"Evaluate","stem":"Un comentarista afirma: «No podemos confiar en el informe de la ONU sobre derechos humanos en Colombia porque la ONU ha sido parcial en otros países.»\n\n¿Es este un contraargumento válido?",
   "opts":["A) Sí, porque la ONU tiene historial de parcialidad","B) No, porque descalifica la fuente en lugar de rebatir el contenido del informe","","C) Sí, porque la credibilidad de la fuente es relevante","D) No, porque el autor no es experto"],
   "correct":2,"expl":"Es una falacia de envenenar el pozo (poisoning the well): se desacredita la fuente para evitar examinar el contenido del informe. La validez de un informe se evalúa por sus datos, no por el historial de la entidad."},
 ]}

G10_WEEKS["W04"] = {
 "tema": "Textos Expositivos — Secuencias y Procesos",
 "rubric": "textos expositivos, secuencias, procesos, descripcion de fenomenos, explicacion causal, textos cientificos",
 "qs": [
  {"bloom":"Remember","stem":"El fenómeno de La Niña en Colombia se caracteriza por:\n\nA) Aumento de temperaturas en toda la región Caribe\nB) Incremento de lluvias en las regiones Andina, Pacífica y Caribe\nC) Sequía prolongada en la Orinoquía\nD) Vientos huracanados en San Andrés",
   "opts":["A) Aumento de temperaturas en toda la región Caribe","B) Incremento de lluvias en las regiones Andina, Pacífica y Caribe","","C) Sequía prolongada en la Orinoquía","D) Vientos huracanados en San Andrés"],
   "correct":2,"expl":"El texto explicativo sobre fenómenos climáticos señala que La Niña incrementa las precipitaciones en las regiones Andina, Pacífica y Caribe colombiana."},
  {"bloom":"Remember","stem":"¿Cuál es el primer paso en el proceso de reciclaje de residuos electrónicos descrito en el texto?",
   "opts":["A) Trituración de materiales","B) Clasificación manual de componentes","","C) Fundición de metales","D) Exportación a plantas especializadas"],
   "correct":2,"expl":"Según el texto expositivo sobre RAEE en Colombia, el proceso comienza con la clasificación manual para separar componentes reciclables de peligrosos."},
  {"bloom":"Understand","stem":"«La fotosíntesis ocurre en dos fases. En la fase luminosa, la clorofila capta energía solar y produce ATP y NADPH. En la fase oscura (Ciclo de Calvin), el CO₂ se fija y convierte en glucosa usando esos compuestos.»\n\n¿Cómo se relacionan las dos fases?",
   "opts":["A) Son independientes y ocurren en distintos momentos del día","B) La fase luminosa produce la energía que la fase oscura necesita","","C) La fase oscura ocurre solo de noche","D) La fase luminosa usa glucosa para producir energía"],
   "correct":2,"expl":"Existe una relación de dependencia secuencial: la fase luminosa genera los compuestos energéticos (ATP y NADPH) que la fase oscura utiliza para fijar el carbono."},
  {"bloom":"Understand","stem":"Un texto describe el ciclo del agua en la Amazonía colombiana: Evaporación desde el río → Formación de nubes → Precipitación sobre el bosque → Filtración al suelo → Retorno al río.\n\n¿Qué tipo de estructura textual predomina?",
   "opts":["A) Descriptiva","B) Secuencial o de proceso","","C) Argumentativa","D) Comparativa"],
   "correct":2,"expl":"La presentación ordenada de pasos que conforman un ciclo (con flechas de conexión) corresponde a una estructura secuencial o de proceso, típica de textos explicativos."},
  {"bloom":"Apply","stem":"Un estudiante debe redactar un texto expositivo sobre el proceso de paz en Colombia. Ordena cronológicamente:\n1. Acuerdo de Paz (2016)\n2. Diálogos de La Habana (2012-2016)\n3. Refrendación popular (2016)\n4. Implementación (2017-presente)\n\n¿Cuál es el orden correcto?",
   "opts":["A) 1, 2, 3, 4","B) 2, 1, 3, 4","","C) 3, 2, 1, 4","D) 2, 3, 1, 4"],
   "correct":2,"expl":"El orden cronológico correcto es: primero los diálogos (2012-2016), luego el Acuerdo (2016), después la refrendación (2016) y finalmente la implementación (2017-presente)."},
  {"bloom":"Apply","stem":"¿Cuál de los siguientes organizadores gráficos representa mejor un texto de proceso?",
   "opts":["A) Diagrama de Venn","B) Diagrama de flujo con pasos conectados","","C) Mapa conceptual jerárquico","D) Línea de tiempo simple sin conexiones"],
   "correct":2,"expl":"El diagrama de flujo muestra pasos conectados en secuencia, ideal para representar procesos. El diagrama de Venn compara; el mapa jerárquico muestra categorías; la línea simple no muestra relaciones procesales."},
  {"bloom":"Analyze","stem":"«En Colombia, 12.3 millones de personas viven en condición de inseguridad alimentaria moderada o severa, según la FAO 2024. Esto equivale al 24 % de la población. Las causas incluyen el conflicto armado, la desigualdad en la tenencia de tierra y los fenómenos climáticos extremos.»\n\n¿Qué relación causal NO está explícit