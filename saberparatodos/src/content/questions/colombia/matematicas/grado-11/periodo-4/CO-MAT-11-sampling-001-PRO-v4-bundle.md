---
id: "CO-MAT-11-sampling-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Muestreo e Inferencia Básica"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "5-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Parte por el Todo
No es necesario beberse todo el mar para saber que el agua es salada; basta con una cucharada. En estadística, esa cucharada se llama **Muestra**, y el mar entero es la **Población**. El muestreo técnico permite a los científicos, encuestadores y analistas de calidad predecir el comportamiento de millones de personas estudiando solo a unos pocos cientos. Sin embargo, para que esta "magia" funcione, la muestra debe ser representativa y el proceso de selección debe ser aleatorio. Un error en el muestreo (como preguntar solo a amigos) puede invalidar cualquier conclusión, por muy sofisticada que sea la matemática posterior.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-sampling-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Un investigador quiere conocer la opinión de los jóvenes de Cali sobre el transporte público. Decide preguntar a 50 personas que están en un centro comercial a las 10:00 AM un lunes. ¿Cuál es el principal problema de este muestreo?

### Opciones
- [ ] A) El tamaño de la muestra es muy pequeño.
- [x] B) La muestra está sesgada (No incluye a los jóvenes que están estudiando o trabajando en ese horario).
- [ ] C) Los centros comerciales no permiten encuestas.
- [ ] D) No hay ningún problema, es aleatorio.

### Explicación Pedagógica
Un muestreo por conveniencia (ir a donde es fácil) suele dejar por fuera a grandes sectores de la población. En este caso, los jóvenes que usan transporte para ir a clase o al trabajo no están en el centro comercial un lunes por la mañana. La muestra no representa al "joven caleño promedio".

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-sampling-001-PRO-v2`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
¿Cuál es la diferencia fundamental entre un **Censo** y un **Muestreo**?

### Opciones
- [ ] A) El censo es más barato.
- [x] B) El censo estudia a TODA la población, el muestreo solo a una parte.
- [ ] C) El muestreo es siempre más exacto que el censo.
- [ ] D) El censo solo se hace cada 100 años.

### Explicación Pedagógica
Un censo busca la totalidad (ej. el Censo Nacional del DANE). Es extremadamente costoso y lento. El muestreo es una herramienta de estimación rápida y económica que, si se hace bien, ofrece resultados muy cercanos a la realidad total.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-sampling-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre el **Muestreo Aleatorio Estratificado**. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Divide a la población en grupos con características comunes (estratos). <!-- weight: 1.0 -->
- [x] B) Asegura que las minorías estén representadas proporcionalmente en la muestra. <!-- weight: 1.0 -->
- [ ] C) Es el método más rápido porque no requiere conocer a la población previa.
- [x] D) Reduce el error de muestreo comparado con el muestreo aleatorio simple. <!-- weight: 1.0 -->
- [ ] E) Consiste en elegir a los primeros 10 que pasen por la calle.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) Si sabemos que la población es 50% hombres y 50% mujeres, un muestreo estratificado garantiza que la muestra mantenga esa proporción exacta. Esto evita que, por puro azar, terminemos con una muestra solo de hombres, lo que aumentaría el error.

---

## Question 4 (Análisis de Error de Muestreo - Dificultad 7)

**ID:** `CO-MAT-11-sampling-001-PRO-v4`
### Enunciado
A medida que el **tamaño de la muestra ($n$) aumenta**, ¿qué sucede generalmente con el margen de error de la estimación?

### Opciones
- [x] A) Disminuye (A más datos, más precisión).
- [ ] B) Aumenta.
- [ ] C) Permanece constante.
- [ ] D) Se vuelve negativo.

### Explicación Pedagógica
Existe una relación inversa. Al principio, añadir unos pocos datos reduce el error drásticamente. Sin embargo, llega un punto (diminishing returns) donde para reducir el error a la mitad, necesitas cuadruplicar el tamaño de la muestra.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Una población tiene 1000 estudiantes (600 grado 10 y 400 grado 11). Si quiero una muestra estratificada de 100 estudiantes, ¿cuántos debo elegir de cada grado?

### Opciones
- [x] A) 60 de grado 10 y 40 de grado 11. <!-- weight: 1.0 -->
- [x] B) Mantener la proporción 60% / 40% en la muestra. <!-- weight: 1.0 -->
- [ ] C) 50 de cada uno para que sea justo. <!-- weight: 0.0 -->
- [ ] D) 100 de grado 11 porque son los más importantes. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica correctamente la proporcionalidad del muestreo estratificado).

### Explicación Pedagógica
La esencia del estrato es la proporcionalidad. Si el 60% de la población es de grado 10, el 60% de mi muestra (es decir, $100 \times 0.6 = 60$) debe ser de grado 10 para no distorsionar los resultados generales.

---

## Contexto 2: Inferencia y Toma de Decisiones
La **Inferencia Estadística** es el proceso de sacar conclusiones generales a partir de datos particulares. Cuando un médico dice que un medicamento es efectivo "con un 95% de confianza", no está adivinando; ha realizado una prueba de hipótesis. Si los resultados de la muestra son tan extremos que es casi imposible que ocurran por puro azar, rechazamos la "Hipótesis Nula" (que decía que nada pasaba) y aceptamos que hay un efecto real. El análisis estadístico es lo que separa la ciencia de la anécdota.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v6`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Transfer

### Enunciado
¿Qué significa que un resultado sea **"Estadísticamente Significativo"**?

### Opciones
- [ ] A) Que el número obtenido es muy grande.
- [ ] B) Que el resultado es muy importante para la sociedad.
- [x] C) Que es muy poco probable que el resultado se deba meramente al azar.
- [ ] D) Que se calculó usando una calculadora científica.

### Explicación Pedagógica
En ciencia, fijamos un límite (usualmente $p < 0.05$). Si la probabilidad de que el azar explique lo que vimos es menor al 5%, decimos que el fenómeno es significativo. Es la prueba de que algo real está ocurriendo.

---

## Question 7 (Análisis de Intervalos de Confianza - Dificultad 7)

**ID:** `CO-MAT-11-sampling-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Una encuesta electoral dice: "Candidato A: 48%, Candidato B: 46%, con un margen de error del 3%". ¿Podemos afirmar con seguridad quién va ganando?

### Opciones
- [ ] A) Sí, el Candidato A va ganando por 2 puntos.
- [x] B) No, hay un "Empate Técnico" (Los intervalos de confianza se solapan).
- [ ] C) Sí, porque el margen de error es muy pequeño.
- [ ] D) No se puede saber nada con encuestas.

### Explicación Pedagógica
Intervalo A: [45%, 51%]. Intervalo B: [43%, 49%].
Como los rangos se cruzan (ej: el A podría estar en 45% y el B en 49%), la estadística nos dice que la diferencia de 2 puntos no es suficiente para asegurar la victoria. Está dentro del "ruido" del muestreo.

---

## Question 8 (Evaluación de Parámetros vs Estadísticos - Dificultad 6)

**ID:** `CO-MAT-11-sampling-001-PRO-v8`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Evaluate

### Enunciado
Si calculo el promedio de altura de **todos** los colombianos, ese valor es un ________. Si lo calculo solo para 1000 colombianos, es un ________.

### Opciones
- [ ] A) Estadístico / Parámetro
- [x] B) Parámetro / Estadístico (El parámetro es poblacional, el estadístico es muestral)
- [ ] C) Número / Letra
- [ ] D) Error / Verdad

### Explicación Pedagógica
Esta es terminología técnica formal. Los parámetros son los "valores reales" pero desconocidos de la población. Los estadísticos son nuestros "mejores intentos" medidos desde la muestra para estimar esos parámetros.

---

## Question 9 (Técnica de Muestreo por Conglomerados - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Deseamos estudiar la calidad de la educación en Colombia. Elegimos al azar 10 departamentos, luego 5 municipios de cada uno, y finalmente 2 colegios por municipio. ¿Cómo se llama este tipo de muestreo?

### Opciones
- [ ] A) Muestreo Aleatorio Simple.
- [x] B) Muestreo por Conglomerados (o Etapas).
- [ ] C) Muestreo por Cuotas.
- [ ] D) Censo Educativo.

### Explicación Pedagógica
Cuando la población es muy grande y dispersa, es ineficiente elegir individuos al azar en todo el país. En su lugar, elegimos "racimos" (conglomerados) geográficos o institucionales. Esto ahorra logística y permite un estudio profundo de las unidades seleccionadas.

---

## Question 10 (Síntesis de Probabilidad e Inferencia - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre la **Hipótesis Nula ($H_0$)**. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Es la suposición inicial de que no hay efecto o diferencia (status quo). <!-- weight: 1.0 -->
- [x] B) El objetivo de una investigación suele ser aportar evidencia para rechazarla. <!-- weight: 1.0 -->
- [ ] C) Siempre es verdadera.
- [x] D) Si el $p$-valor es muy bajo, se rechaza $H_0$. <!-- weight: 1.0 -->
- [ ] E) Representa la opinión del investigador.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) La ciencia es escéptica por naturaleza. Asumimos que "la nueva medicina no hace nada" ($H_0$) a menos que los datos de la muestra sean tan contundentes que nos obliguen a cambiar de opinión. El rechazo de la hipótesis nula es lo que permite el avance del conocimiento.

---

## Question 11 (Análisis de Error Tipo I - Dificultad 9)

**ID:** `CO-MAT-11-sampling-001-PRO-v11`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
¿En qué consiste un **Error Tipo I** (Falso Positivo) en una prueba de hipótesis?

### Opciones
- [ ] A) No detectar un efecto que sí existía.
- [x] B) Afirmar que hay un efecto/diferencia cuando en realidad se debió al azar (Rechazar $H_0$ siendo cierta).
- [ ] C) Equivocarse al sumar los datos.
- [ ] D) Elegir mal la muestra.

### Explicación Pedagógica
Es como declarar culpable a un inocente. El investigador "ve" algo que no está ahí, simplemente porque le tocó una muestra muy inusual por mala suerte. Controlar este error es fundamental para la integridad científica.

---

## Question 12 (Evaluación de Representatividad - Dificultad 5)

**ID:** `CO-MAT-11-sampling-001-PRO-v12`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
Si quiero saber cuál es el libro favorito de los colombianos y solo pregunto a personas que salen de una biblioteca, mi estudio carece de:

### Opciones
- [ ] A) Números.
- [x] B) Validez externa / Representatividad (Muestra sesgada hacia lectores frecuentes).
- [ ] C) Título.
- [ ] D) Presupuesto.

### Explicación Pedagógica
El lugar donde tomas la muestra define a quién estás escuchando. Los usuarios de una biblioteca no representan al ciudadano promedio que quizás no lee o lee otros formatos. Es un sesgo de selección clásico.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-sampling-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**El Caso de 'Literary Digest' (1936):** Una revista predijo que Alf Landon ganaría la presidencia de EE.UU. por goleada basándose en una encuesta a 2 millones de personas (una muestra gigante). En la realidad, ganó Roosevelt.

¿Por qué falló una muestra de 2 millones de personas?

### Options
- [x] A) Sesgo de selección: La revista usó listas de teléfonos y registros de autos, que en 1936 solo tenían los ricos (que votaban por Landon). <!-- weight: 1.0 -->
- [x] B) Calidad sobre Cantidad: Una muestra pequeña pero bien aleatorizada es mejor que una muestra enorme pero sesgada. <!-- weight: 1.0 -->
- [ ] C) Porque el azar es impredecible en política. <!-- weight: 0.0 -->
- [ ] D) Porque 2 millones no es suficiente para EE.UU. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica el error histórico fundamental entre volumen de datos y aleatoriedad real).

### Explicación Pedagógica
Este es el ejemplo más famoso de por qué el Big Data sin teoría es peligroso. La revista encuestó a muchísima gente, pero todos pertenecían al mismo estrato económico. Mientras tanto, un joven llamado George Gallup usó solo 50,000 personas seleccionadas científicamente y predijo el resultado exacto. La estadística moderna nació ese día.

---

## Question 14 (Análisis Lógico de Independencia de Muestras - Dificultad 5)

**ID:** `CO-MAT-11-sampling-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En un muestreo con **reemplazo**, si saco una balota y la devuelvo a la urna antes de sacar la siguiente:

### Opciones
- [ ] A) La probabilidad de la segunda sacada cambia.
- [x] B) Los eventos son independientes (La urna vuelve a su estado original).
- [ ] C) El tamaño de la población disminuye.
- [ ] D) No es posible hacer estadística así.

### Explicación Pedagógica
Al devolver el objeto, reseteas el sistema. La probabilidad de éxito es constante en cada intento. Es la base de las pruebas repetidas (como lanzar un dado muchas veces).

---

## Question 15 (Análisis de Sesgo de No Respuesta - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v15`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Una empresa envía 1000 correos preguntando: "¿Qué tan satisfecho está con nuestro servicio?". Solo contestan 50 clientes, todos diciendo "Excelente". ¿Es seguro concluir que todos los clientes aman el servicio?

### Opciones
- [ ] A) Sí, el 100% de las respuestas son positivas.
- [x] B) No, existe un "Sesgo de No Respuesta" (Es probable que los insatisfechos simplemente hayan ignorado el correo).
- [ ] C) No, 50 es un número muy bajo.
- [ ] D) Sí, 50 personas no pueden estar equivocadas.

### Explicación Pedagógica
En encuestas voluntarias, suele haber una auto-selección. Las personas con opiniones neutrales o negativas a veces no se molestan en contestar, mientras que los fans más apasionados sí lo hacen. Esto crea una ilusión de consenso que no existe en la población real.

---

## Question 16 (Análisis de Muestreo Sistemático - Dificultad 6)

**ID:** `CO-MAT-11-sampling-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Si en una fábrica elijo para inspección al tornillo número 10, luego al 20, luego al 30, y así sucesivamente cada 10 unidades, estoy aplicando:

### Opciones
- [ ] A) Muestreo al azar.
- [ ] B) Muestreo por cuotas.
- [x] C) Muestreo Sistemático (Usar un intervalo fijo 'k').
- [ ] D) Muestreo por conveniencia.

### Explicación Pedagógica
El muestreo sistemático es muy útil en líneas de producción. Solo requiere elegir un punto de partida al azar y luego seguir el ritmo preestablecido. Es eficiente y cubre todo el tiempo de operación.

---

## Question 17 (Evaluación de Nivel de Confianza - Dificultad 5)

**ID:** `CO-MAT-11-sampling-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Qué significa un "Nivel de Confianza del 95%"?

### Opciones
- [ ] A) Que el 95% de los datos son correctos.
- [x] B) Que si repitiéramos el muestreo 100 veces, en 95 de ellas el valor real estaría dentro de nuestro rango.
- [ ] C) Que hay un 5% de probabilidad de que hayamos cometido un error de cálculo.
- [ ] D) Que el 95% de la gente dijo la verdad.

### Explicación Pedagógica
Es una medida de la fiabilidad del **método**. No garantiza que la muestra actual sea perfecta, sino que el proceso que usamos funciona casi siempre. El 5% restante es el riesgo inevitable de que el azar nos haya dado una muestra "mentirosa".

---

## Question 18 (Cálculo de Proporciones Muestrales - Dificultad 8)

**ID:** `CO-MAT-11-sampling-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Formulación y Ejecución
**Bloom:** Synthesis

### Enunciado
En una muestra de 400 personas, 160 planean votar "SÍ". Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) La proporción muestral ($\hat{p}$) es 0.4 o 40%. <!-- weight: 1.0 -->
- [x] B) Si la población es total es de 40,000, estimamos que 16,000 votarán "SÍ". <!-- weight: 1.0 -->
- [ ] C) Podemos asegurar que exactamente el 40% de la población votará "SÍ".
- [x] D) La proporción de los que votan "NO" es 0.6. <!-- weight: 1.0 -->
- [ ] E) La muestra es demasiado pequeña para sacar conclusiones.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) La proporción observada en la muestra es nuestra mejor estimación para la población. Si 160 de 400 es el 40%, proyectamos ese mismo porcentaje a la población total ($40,000 \times 0.4 = 16,000$). C es incorrecto porque siempre hay un margen de error; es una estimación, no una certeza absoluta.

---

## Question 19 (Interpretación de Variable de Confusión - Dificultad 5)

**ID:** `CO-MAT-11-sampling-001-PRO-v19`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Un estudio dice: "Las personas que tienen encendedores en su bolsillo tienen más riesgo de cáncer de pulmón". ¿Es el encendedor la causa del cáncer?

### Opciones
- [ ] A) Sí, los encendedores emiten radiación.
- [x] B) No, el encendedor es solo un indicador (variable de confusión) de que la persona probablemente fuma.
- [ ] C) Sí, porque la estadística lo dice.
- [ ] D) No, el cáncer es hereditario.

### Explicación Pedagógica
Este es un clásico error de inferencia. Confundir el síntoma o el objeto asociado con la causa real. La estadística nos pide mirar más allá de la coincidencia para encontrar la variable oculta (el tabaco).

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-sampling-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Imagine que es el director de control de calidad de una farmacéutica. Probar cada pastilla destruye el producto. Debe decidir qué tan grande debe ser la muestra para autorizar un lote de 1 millón de vacunas.

¿Cuál es el equilibrio ético y matemático que debe manejar?

### Options
- [x] A) Muestreo representativo: Asegurar que el tamaño $n$ sea suficiente para detectar efectos secundarios raros pero no tan grande que se desperdicien medicinas vitales. <!-- weight: 1.0 -->
- [x] B) Uso de p-valores estrictos para minimizar el riesgo de un Error Tipo I (aprobar una vacuna ineficaz). <!-- weight: 1.0 -->
- [ ] C) Probar solo las primeras 10 pastillas para ahorrar dinero. <!-- weight: 0.0 -->
- [ ] D) No hacer muestreo y confiar en la suerte. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica la responsabilidad de la inferencia en decisiones de vida o muerte).

### Explicación Pedagógica
En medicina, la inferencia estadística es una cuestión ética. Si el margen de error es muy alto, puedes matar a alguien; si es innecesariamente bajo, retrasas la cura. El científico debe dominar las herramientas de muestreo e inferencia para tomar la decisión que minimice el daño total basándose en evidencia sólida.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Argumentación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 7 | single | Analyze | Error de Muestreo| ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Argumentación | ✅ |
| 7 | ...-v7 | 7 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 6 | single | Evaluate | Terminología | ✅ |
| 9 | ...-v9 | 8 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Argumentación | ✅ |
| 12 | ...-v12| 5 | single | Apply | Interpretación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Analyze | Argumentación | ✅ |
| 16 | ...-v16| 6 | single | Analyze | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 8 | multi-correct | Synthesis | Formulación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Argumentación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
