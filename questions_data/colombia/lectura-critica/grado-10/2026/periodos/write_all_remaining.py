#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Generate all remaining MASTERY bundles: LC P3-P4, Sociales P1-P4, Ingles P1-P4"""
import os

BASE = r"E:\scripts-python\worldexams\questions_data\colombia"

def write_file(subdir, period, filename_prefix, content):
    """Write a bundle file. subdir like 'lectura-critica', period like '1', filename_prefix like 'CO-LC'."""
    filename = f"{filename_prefix}-10-2026-P{period}-comprehensive-001-MASTERY-bundle.md"
    path = os.path.join(BASE, subdir, "grado-10", "2026", "periodos", filename)
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Written: {filename}")

# ==================== LC P4 ====================
LC_P4 = """---
id: "CO-LC-10-2026-P4-comprehensive-001-MASTERY"
country: "colombia"
grado: 10
asignatura: "lectura-critica"
tema: "textos-academicos-avanzados, argumentacion-filosofica"
periodo: 4
protocol_version: "5.2"
bundle_index: 1
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
---
# Bundle MASTERY: Textos Academicos Avanzados, Argumentacion Filosofica (P4)

## Question 1 (D3)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v1
**Bloom:** Remember | **ICFES:** Identificar y entender contenidos locales
**Context:** En clase de filosofia en el colegio San Jose de la Salle en Medellin.
**Enunciado:** Un texto academico se caracteriza principalmente por:
**Options:**
- [x] A) Uso de lenguaje formal, citas bibliograficas y estructura argumentativa rigurosa.
- [ ] B) Ser entretenido y facil de leer.
- [ ] C) No tener estructura definida.
- [ ] D) Usar lenguaje coloquial.

## Question 2 (D3)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v2
**Bloom:** Remember | **ICFES:** Identificar y entender contenidos locales
**Context:** En argumentacion filosofica, se estudia el silogismo.
**Enunciado:** Un silogismo es:
**Options:**
- [ ] A) Una pregunta retorica.
- [ ] B) Una metafora poetica.
- [x] C) Un razonamiento deductivo compuesto por premisa mayor, premisa menor y conclusion.
- [ ] D) Una opinion personal.

## Question 3 (D4)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v3
**Bloom:** Understand | **ICFES:** Comprender el sentido global del texto
**Context:** Texto academico: "El presente estudio analiza el impacto de las TIC en el rendimiento academico de estudiantes de grado 10 en Bogota. La hipotesis sostiene que el uso guiado de herramientas digitales mejora los resultados en matematicas. Se aplico una metodologia mixta con 200 estudiantes."
**Enunciado:** Segun el texto, la hipotesis de la investigacion es:
**Options:**
- [ ] A) Las TIC no tienen impacto.
- [x] B) El uso guiado de TIC mejora el rendimiento en matematicas.
- [ ] C) Los estudiantes de Bogota usan muchas TIC.
- [ ] D) La metodologia es cualitativa.

## Question 4 (D4)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v4
**Bloom:** Understand | **ICFES:** Identificar y entender contenidos locales
**Context:** Texto: "Descartes argumenta: 1. Puedo dudar de todo. 2. Pero no puedo dudar de que estoy dudando. 3. Luego, si dudo, existo. Concluye: 'Pienso, luego existo'."
**Enunciado:** La estructura de este argumento es:
**Options:**
- [ ] A) Inductiva.
- [x] B) Deductiva (de premisas logicas a conclusion necesaria).
- [ ] C) Abductiva.
- [ ] D) Analogica.

## Question 5 (D5)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v5
**Bloom:** Apply | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto: "Segun el DANE 2023, la tasa de desempleo juvenil en Colombia es del 18.5%, contrastando con la tasa general del 9.2%. La brecha evidencia problemas estructurales."
**Enunciado:** La funcion de la cita al DANE es:
**Options:**
- [ ] A) Decorativa.
- [ ] B) Autoridad de opinion.
- [x] C) Sustento empirico que respalda la afirmacion.
- [ ] D) Conclusiva.

## Question 6 (D5)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v6
**Bloom:** Analyze | **ICFES:** Reflexionar sobre el contenido
**Context:** Silogismo: "Todos los colombianos son latinoamericanos. Maria es colombiana. Luego, Maria es latinoamericana."
**Enunciado:** Si la premisa mayor fuera falsa, la conclusion:
**Options:**
- [ ] A) Sigue siendo verdadera.
- [x] B) Podria ser falsa, porque la validez logica no garantiza verdad factual.
- [ ] C) Es automaticamente falsa.
- [ ] D) No tiene relacion con las premisas.

## Question 7 (D5)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v7
**Bloom:** Apply | **ICFES:** Identificar y entender contenidos locales
**Context:** Texto: "El abstract de un articulo cientifico debe incluir objetivo, metodologia, resultados y conclusiones."
**Enunciado:** La funcion del abstract es:
**Options:**
- [ ] A) Ser la introduccion completa.
- [x] B) Permitir al lector decidir la relevancia del articulo sin leerlo completo.
- [ ] C) Reemplazar la bibliografia.
- [ ] D) Ser solo un resumen sin datos.

## Question 8 (D6)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v8
**Bloom:** Analyze | **ICFES:** Reflexionar sobre el contenido
**Context:** Platon: mundo sensible = copia imperfecta del mundo de las Ideas. Aristoteles: las esencias estan en las cosas mismas.
**Enunciado:** La diferencia ontologica fundamental es:
**Options:**
- [ ] A) Platon era griego, Aristoteles no.
- [x] B) Platon: dualismo ontologico (dos mundos). Aristoteles: inmanentismo (esencias en las cosas).
- [ ] C) Ambos pensaban igual.
- [ ] D) Aristoteles nego la existencia divina.

## Question 9 (D6)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v9
**Bloom:** Apply | **ICFES:** Comprender el sentido global del texto
**Context:** Tesis: "Este trabajo busca llenar un vacio en la literatura sobre el conflicto armado colombiano al incorporar la perspectiva de genero, ausente en estudios previos."
**Enunciado:** El autor justifica su investigacion por:
**Options:**
- [ ] A) Que su tema es facil.
- [x] B) Una laguna en el conocimiento que su trabajo llena.
- [ ] C) Que todos los estudios previos son incorrectos.
- [ ] D) Que el conflicto no ha sido estudiado.

## Question 10 (D6)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v10
**Bloom:** Understand | **ICFES:** Identificar y entender contenidos locales
**Context:** "No podemos permitir las drogas porque son malas."
**Enunciado:** Este argumento es debil porque:
**Options:**
- [ ] A) Es demasiado largo.
- [x] B) Es circular: la conclusion repite la premisa ("son malas" no se argumenta).
- [ ] C) Usa palabras complicadas.
- [ ] D) No tiene estructura.

## Question 11 (D7)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v11
**Bloom:** Analyze | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto: "Nietzsche critica la moral occidental por ser una moral de esclavos que valora la debilidad. Propone la voluntad de poder como fuerza creadora que trasciende el bien y el mal."
**Enunciado:** La critica de Nietzsche se dirige a:
**Options:**
- [ ] A) La politica de su epoca.
- [x] B) Los fundamentos de la moral judeocristiana y su influencia en la cultura.
- [ ] C) La ciencia moderna.
- [ ] D) La literatura clasica.

## Question 12 (D7)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v12
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto academico: "Los resultados muestran una correlacion de 0.85 entre horas de estudio y puntaje ICFES. Sin embargo, correlacion no implica causalidad."
**Enunciado:** Por que el autor anade la aclaracion sobre causalidad?
**Options:**
- [ ] A) Porque no entiende los datos.
- [x] B) Para evitar la falacia de confundir correlacion con causalidad, senalando que podrian existir otras variables.
- [ ] C) Para restar importancia a los datos.
- [ ] D) Por error metodologico.

## Question 13 (D7)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v13
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** "Kant afirma que debemos actuar de tal modo que la maxima de nuestra accion pueda convertirse en ley universal (imperativo categorico)."
**Enunciado:** La frase significa que:
**Options:**
- [ ] A) Debemos obedecer al gobierno.
- [x] B) Una accion es moralmente correcta solo si su principio rector puede aplicarse universalmente sin contradiccion.
- [ ] C) Solo importan las consecuencias.
- [ ] D) Cada persona tiene su propia moral.

## Question 14 (D8)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v14
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** Un estudiante argumenta: "Si todos los estudiantes copiaran, el sistema educativo colapsaria. Por tanto, copiar esta mal."
**Enunciado:** Este razonamiento se aproxima al:
**Options:**
- [ ] A) Relativismo moral.
- [x] B) Imperativo categorico kantiano (prueba de universalizacion).
- [ ] C) Utilitarismo consecuencialista.
- [ ] D) Nihilismo.

## Question 15 (D8)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v15
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto: "El articulo de revision bibliografica concluye que la mayoria de estudios sobre desercion escolar en Colombia se han focalizado en zonas urbanas, dejando un vacio en el conocimiento sobre las rurales."
**Enunciado:** La identificacion de este "vacio" es importante porque:
**Options:**
- [ ] A) Critica a los investigadores.
- [x] B) Orienta futuras investigaciones hacia areas desatendidas.
- [ ] C) Demuestra que las zonas rurales no importan.
- [ ] D) Cierra el tema de investigacion.

## Question 16 (D8)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v16
**Bloom:** Analyze | **ICFES:** Identificar y entender contenidos locales
**Context:** Texto: "John Rawls propone el 'velo de ignorancia': para disenar una sociedad justa, debemos ignorar nuestra posicion social, talentos y genero. Solo asi lograremos principios imparciales."
**Enunciado:** El velo de ignorancia busca garantizar:
**Options:**
- [ ] A) Que todos sean iguales en talento.
- [x] B) Imparcialidad en la eleccion de principios de justicia, al eliminar sesgos egoistas.
- [ ] C) Que los mas desfavorecidos tengan ventajas.
- [ ] D) Ignorar la realidad.

## Question 17 (D9)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v17
**Bloom:** Create | **ICFES:** Reflexionar sobre el contenido
**Context:** Un estudiante debe escribir un ensayo filosofico sobre la justicia.
**Enunciado:** Cual seria la tesis mas solida?
**Options:**
- [ ] A) La justicia es subjetiva.
- [ ] B) Platon tenia razon sobre todo.
- [x] C) La justicia distributiva requiere equilibrar libertad individual (Nozick) y bienestar colectivo (Rawls), reconociendo que ningun principio es absoluto.
- [ ] D) La justicia no existe.

## Question 18 (D9)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v18
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto: "La falacia ad hominem ocurre cuando se ataca a la persona que argumenta en lugar de refutar su argumento. Ejemplo: 'Usted no puede hablar de pobreza porque es rico'."
**Enunciado:** Identificar falacias es importante en argumentacion porque:
**Options:**
- [ ] A) Permite ganar debates facilmente.
- [x] B) Ayuda a evaluar la validez de los argumentos y evitar manipulaciones retoricas.
- [ ] C) Es un requisito academico.
- [ ] D) Demuestra superioridad intelectual.

## Question 19 (D9)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v19
**Bloom:** Create | **ICFES:** Reflexionar sobre el contenido
**Context:** Se debe disenar la introduccion de un articulo academico sobre movilidad social en Colombia.
**Enunciado:** La introduccion deberia comenzar con:
**Options:**
- [ ] A) Una definicion del diccionario de "movilidad social".
- [x] B) Datos contextuales relevantes (ej: "Colombia es el segundo pais con menor movilidad social de la OCDE") seguido de la pregunta de investigacion y la hipotesis.
- [ ] C) Una opinion personal del autor.
- [ ] D) Una cita de un poeta.

## Question 20 (D10)
**ID:** CO-LC-10-2026-P4-comprehensive-001-MASTERY-v20
**Bloom:** Evaluate | **ICFES:** Reflexionar sobre el contenido
**Context:** Texto: "Sartre afirma que 'el hombre esta condenado a ser libre'. Esto significa que no hay esencia predeterminada: existimos primero y luego nos definimos mediante nuestras elecciones. La angustia surge de la responsabilidad total."
**Enunciado:** La frase "condenado a ser libre" implica que:
**Options:**
- [ ] A) La libertad es un privilegio que se puede rechazar.
- [ ] B) La libertad nos permite ser felices siempre.
- [x] C) No podemos evitar elegir, y cada eleccion nos define ante nosotros y ante los demas, generando responsabilidad absoluta.
- [ ] D) Dios determina nuestras elecciones.
"""

write_file("lectura-critica", "4", "CO-LC", LC_P4)

# ==================== Sociales P1 ====================
SOC_P1 = """---
id: "CO-SOC-10-2026-P1-comprehensive-001-MASTERY"
country: "colombia"
grado: 10
asignatura: "sociales-ciudadanas"
tema: "filosofia-politica, Colombia-contemporanea"
periodo: 1
protocol_version: "5.2"
bundle_index: 1
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
---
# Bundle MASTERY: Filosofia Politica, Colombia Contemporanea (P1)

## Question 1 (D3)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v1
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de sociales en un colegio de Ibague.
**Enunciado:** Segun la Constitucion Politica de Colombia de 1991, Colombia es:
**Options:**
- [x] A) Un Estado social de derecho.
- [ ] B) Una dictadura militar.
- [ ] C) Un estado comunista.
- [ ] D) Una monarquia constitucional.

## Question 2 (D3)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v2
**Bloom:** Remember | **ICFES:** Pensamiento social
**Context:** En clase de filosofia politica.
**Enunciado:** El "contrato social" segun Rousseau propone que:
**Options:**
- [ ] A) El rey tiene poder absoluto.
- [ ] B) La sociedad debe abolir las leyes.
- [x] C) Los ciudadanos ceden parte de su libertad al Estado a cambio de proteccion y bien comun.
- [ ] D) No debe haber gobierno.

## Question 3 (D4)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v3
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** Texto: "La Constitucion de 1991 creo la tutela como mecanismo para proteger los derechos fundamentales. Cualquier persona puede interponerla cuando sienta vulnerados sus derechos."
**Enunciado:** Un ejemplo de aplicacion de la tutela seria:
**Options:**
- [ ] A) Quejarse de un vecino ruidoso.
- [x] B) Un ciudadano que solicita proteccion judicial porque una EPS le niega un tratamiento medico urgente.
- [ ] C) Pagar impuestos.
- [ ] D) Votar en elecciones.

## Question 4 (D4)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v4
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "Platon en 'La Republica' propone que los filosofos deben gobernar porque conocen la verdad."
**Enunciado:** Esta idea se conoce como:
**Options:**
- [ ] A) Democracia participativa.
- [ ] B) Tiranla.
- [x] C) Filosofo-rey (aristocracia del conocimiento).
- [ ] D) Anarquismo.

## Question 5 (D5)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v5
**Bloom:** Apply | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "El Acuerdo de Paz de 2016 entre el gobierno colombiano y las FARC creo la Jurisdiccion Especial para la Paz (JEP)."
**Enunciado:** La JEP tiene como funcion:
**Options:**
- [ ] A) Juzgar a todos los delincuentes comunes.
- [x] B) Investigar, juzgar y sancionar los delitos cometidos durante el conflicto armado.
- [ ] C) Crear nuevas leyes.
- [ ] D) Administrar las carceles.

## Question 6 (D5)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v6
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "John Locke defendia la propiedad privada como derecho natural. Marx la criticaba como origen de la explotacion."
**Enunciado:** La diferencia central entre Locke y Marx es:
**Options:**
- [ ] A) Ambos estaban de acuerdo.
- [x] B) Locke: propiedad privada = derecho natural. Marx: propiedad privada = fuente de desigualdad y alienacion.
- [ ] C) Locke era aleman, Marx ingles.
- [ ] D) Locke escribio en el siglo XX.

## Question 7 (D5)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v7
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** "Colombia tiene tres ramas del poder publico."
**Enunciado:** Cuales son?
**Options:**
- [ ] A) Ejecutiva, judicial y militar.
- [x] B) Ejecutiva, legislativa y judicial.
- [ ] C) Legislativa, ejecutiva y eclesiastica.
- [ ] D) Federal, estatal y municipal.

## Question 8 (D6)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v8
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** Texto: "Colombia es una democracia representativa pero con mecanismos de participacion directa como el referendo, el plebiscito y la consulta popular."
**Enunciado:** Un plebiscito es:
**Options:**
- [ ] A) La eleccion de presidente.
- [ ] B) Un mecanismo donde el presidente convoca a los ciudadanos para aprobar o rechazar una decision.
- [x] C) Una votacion popular convocada por el presidente para que el pueblo decida sobre una politica especifica.
- [ ] D) La revocatoria del mandato.

## Question 9 (D6)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v9
**Bloom:** Apply | **ICFES:** Pensamiento social
**Context:** Texto: "La globalizacion ha transformado la soberania de los estados-nacion."
**Enunciado:** La "soberania" se refiere a:
**Options:**
- [ ] A) La capacidad de un pais de comprar productos extranjeros.
- [x] B) La autoridad suprema de un Estado dentro de su territorio.
- [ ] C) La riqueza de un pais.
- [ ] D) El ejercito de un pais.

## Question 10 (D6)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v10
**Bloom:** Understand | **ICFES:** Pensamiento social
**Context:** "Maquiavelo en 'El Principe' sostiene que el fin justifica los medios."
**Enunciado:** Esta frase se interpreta como:
**Options:**
- [ ] A) Cualquier accion esta permitida siempre.
- [x] B) En politica, un gobernante puede usar medios cuestionables si buscan la estabilidad y el bien del Estado.
- [ ] C) Todos los politicos son corruptos.
- [ ] D) La etica no existe en politica.

## Question 11 (D7)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v11
**Bloom:** Analyze | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** Texto: "La movilizacion social del Paro Nacional de 2021 en Colombia evidencio el descontento con la reforma tributaria y las politicas del gobierno Duque."
**Enunciado:** Las movilizaciones sociales en democracia son:
**Options:**
- [ ] A) Actos ilegales que deben reprimirse.
- [x] B) Mecanismos de participacion y presion politica legitimos en una democracia.
- [ ] C) Exclusivamente violentas.
- [ ] D) Manipuladas por extranjeros.

## Question 12 (D7)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v12
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Hobbes describe el estado de naturaleza como 'la guerra de todos contra todos', donde la vida es solitaria, pobre, desagradable, brutal y corta."
**Enunciado:** Para Hobbes, el Estado surge para:
**Options:**
- [ ] A) Maximizar la libertad individual.
- [x] B) Imponer orden y seguridad, evitando el caos del estado de naturaleza.
- [ ] C) Redistribuir la riqueza.
- [ ] D) Promover la igualdad.

## Question 13 (D7)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v13
**Bloom:** Evaluate | **ICFES:** Pensamiento social
**Context:** "Las regalias del petroleo y la mineria en Colombia deben distribuirse entre las regiones productoras y el gobierno central."
**Enunciado:** El Sistema General de Regalias busca:
**Options:**
- [ ] A) Beneficiar solo a las empresas extractivas.
- [x] B) Distribuir equitativamente los ingresos de recursos no renovables entre las regiones.
- [ ] C) Eliminar la extraccion de recursos.
- [ ] D) Beneficiar solo al gobierno central.

## Question 14 (D8)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v14
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** Texto: "La Ley 1448 de 2011 (Ley de Victimas) reconoce y repara a las victimas del conflicto armado en Colombia."
**Enunciado:** Esta ley es importante porque:
**Options:**
- [x] A) Reconocimiento oficial del sufrimiento de las victimas y establece medidas de reparacion.
- [ ] B) Olvida a las victimas.
- [ ] C) Solo beneficia a los victimarios.
- [ ] D) No tiene presupuesto.

## Question 15 (D8)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v15
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Montesquieu propuso la separacion de poderes como garantia contra el abuso. Su modelo inspiro las constituciones modernas."
**Enunciado:** La separacion de poderes evita:
**Options:**
- [ ] A) La eficiencia del gobierno.
- [x] B) La concentracion del poder y el autoritarismo.
- [ ] C) La participacion ciudadana.
- [ ] D) La existencia de leyes.

## Question 16 (D8)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v16
**Bloom:** Analyze | **ICFES:** Pensamiento social
**Context:** "Colombia experimento el fenomeno del 'clientelismo' donde los votantes intercambian votos por favores."
**Enunciado:** El clientelismo es problematico porque:
**Options:**
- [ ] A) Fortalece la democracia.
- [x] B) Degrada la democracia al reemplazar la deliberacion politica por transacciones individuales.
- [ ] C) Es una forma de participacion.
- [ ] D) Beneficia a todos.

## Question 17 (D9)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v17
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Se debe proponer una solucion para aumentar la participacion politica juvenil en Colombia.
**Enunciado:** Cual propuesta seria mas efectiva?
**Options:**
- [ ] A) Obligar a votar a los jovenes.
- [x] B) Crear espacios de participacion vinculantes (presupuestos participativos juveniles) y educacion politica desde grado 10.
- [ ] C) Reducir la edad de voto a 14.
- [ ] D) Eliminar el voto juvenil.

## Question 18 (D9)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v18
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** Texto: "La teoria de la justicia de Rawls sostiene que las desigualdades solo se justifican si benefician a los mas desfavorecidos (principio de diferencia)."
**Enunciado:** Aplicado a Colombia, este principio justificaria:
**Options:**
- [ ] A) Que los ricos paguen menos impuestos.
- [x] B) Politicas de discriminacion positiva (ej. becas para estudiantes de bajos recursos).
- [ ] C) Eliminar todos los impuestos.
- [ ] D) Privatizar la educacion.

## Question 19 (D9)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v19
**Bloom:** Create | **ICFES:** Pensamiento social
**Context:** Un estudiante analiza la polarizacion politica en Colombia durante las elecciones.
**Enunciado:** La polarizacion puede tener efectos negativos porque:
**Options:**
- [ ] A) Genera debate sano.
- [x] B) Dificulta el dialogo, los consensos y la gobernabilidad al radicalizar posiciones.
- [ ] C) Aumenta la participacion.
- [ ] D) Fortalece los partidos.

## Question 20 (D10)
**ID:** CO-SOC-10-2026-P1-comprehensive-001-MASTERY-v20
**Bloom:** Evaluate | **ICFES:** Interpretacion y analisis de perspectivas
**Context:** "Hannah Arendt distinguia entre poder (capacidad colectiva de actuar en concierto) y violencia (instrumento para imponer voluntad). Para ella, cuando un gobierno recurre a la violencia, revela que ha perdido el poder."
**Enunciado:** Segun Arendt, la diferencia entre poder y violencia es:
**Options:**
- [ ] A) Son sinonimos.
- [ ] B) El poder es militar; la violencia es politica.
- [x] C) El poder emerge de la accion colectiva consensuada; la violencia es instrumental y unilateral.
- [ ] D) La violencia es superior al poder.
"""

write_file("sociales-ciudadanas", "1", "CO-SOC", SOC_P1)
print("Done with P1")
