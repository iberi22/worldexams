---
id: "CO-MAT-11-probability-advanced-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Probabilidad Avanzada: Condicional y Teorema de Bayes"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "6-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Probabilidad en el Siglo XXI (Inferencia Bayesiana)
En un mundo incierto, la probabilidad no es solo tirar dados. Es la capacidad de actualizar nuestras creencias cuando recibimos nueva información. Por ejemplo, si una prueba médica sale positiva para una enfermedad rara, ¿qué tan probable es que realmente estés enfermo? La respuesta depende de qué tan común sea la enfermedad en la población general (Probabilidad a Priori). El **Teorema de Bayes** es la herramienta matemática que permite a los filtros de spam, los diagnósticos médicos y los algoritmos de recomendación ajustar sus predicciones de forma dinámica. Comprender la probabilidad condicional es la diferencia entre ser engañado por una estadística aislada y entender el riesgo real.

---

## Question 1 (Analisis - Dificultad 6)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la definición matemática correcta de la probabilidad de que ocurra el evento $A$ **dado que** ya ocurrió el evento $B$ ($P(A|B)$)?

### Opciones
- [ ] A) $P(A) \cdot P(B)$
- [x] B) $\frac{P(A \cap B)}{P(B)}$ (Siempre que $P(B) > 0$)
- [ ] C) $P(A) + P(B)$
- [ ] D) $1 - P(A')$

### Explicación Pedagógica
La probabilidad condicional $P(A|B)$ reduce el espacio muestral al evento $B$. Solo nos interesan las veces en que ocurren ambos ($A \cap B$) dentro del conjunto de veces que ocurre $B$. Es como decir: "De todos los días que llovió, ¿en cuántos relampagueó?".

---

## Question 2 (Evaluación - Dificultad 7)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
En una urna hay 3 bolas rojas y 7 azules. Si sacamos dos bolas **sin reposición**, ¿cuál es la probabilidad de que la segunda sea roja dado que la primera fue azul?

### Opciones
- [ ] A) 3/10
- [x] B) 3/9 (O un tercio)
- [ ] C) 2/9
- [ ] D) 7/10

### Explicación Pedagógica
Si la primera fue azul y **no se repuso**, ahora quedan 9 bolas en total en la urna. Las 3 bolas rojas siguen allí intactas. Por tanto, la probabilidad condicional es 3 de 9. El evento previo cambió las condiciones del sistema.

---

## Question 3 (Síntesis - Dificultad 8)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre el Teorema de Bayes: $P(A|B) = \frac{P(B|A) \cdot P(A)}{P(B)}$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Permite calcular la probabilidad de una "causa" dado un "efecto" observado. <!-- weight: 1.0 -->
- [x] B) $P(A)$ se conoce como probabilidad *a priori*. <!-- weight: 1.0 -->
- [x] C) Es fundamental para evitar falsos positivos en diagnósticos médicos. <!-- weight: 1.0 -->
- [ ] D) Solo funciona si los eventos son independientes.
- [ ] E) Si $P(B|A)$ es alto, entonces $P(A|B)$ siempre debe ser alto también.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, C) Bayes conecta la dirección de la información. Por ejemplo, sabemos la probabilidad de tener fiebre dado que tienes gripe (B|A), pero Bayes nos ayuda a saber la probabilidad de tener gripe dado que tienes fiebre (A|B). D es falso: Bayes es precisamente para eventos dependientes. E es falso: depende de qué tan raro sea el evento $A$ (la enfermedad).

---

## Question 4 (Análisis de Independencia - Dificultad 6)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v4`
### Enunciado
Si dos eventos $A$ y $B$ son **independientes**, ¿cuál es el valor de $P(A|B)$?

### Opciones
- [ ] A) 0
- [ ] B) 1
- [x] C) $P(A)$ (Ocurra o no B, la probabilidad de A no cambia)
- [ ] D) $P(A) \cdot P(B)$

### Explicación Pedagógica
Independencia significa que la información de que ocurrió $B$ es irrelevante para $A$. Por ejemplo, que salga cara en una moneda no cambia la probabilidad de que salga un 6 en un dado lanzado después. $P(A|B) = P(A)$.

---

## Question 5 (Genio - Dificultad 9)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
**El Problema del Diagnóstico:** Una enfermedad afecta al 1% de la población ($P(E) = 0.01$). Una prueba tiene una precisión del 90% ($P(+|E) = 0.90$) y una tasa de falsos positivos del 10% ($P(+|S) = 0.10$). Si una persona al azar da positivo, ¿cuál es aproximadamente la probabilidad real de que esté enferma?

### Opciones
- [x] A) 8.3% (Aproximadamente 1 de cada 12 positivos está realmente enfermo). <!-- weight: 1.0 -->
- [x] B) Mucho menos del 50%, debido a que la enfermedad es muy rara comparada con los falsos positivos. <!-- weight: 1.0 -->
- [ ] C) 90%, porque esa es la precisión de la prueba. <!-- weight: 0.0 -->
- [ ] D) 1%, no cambió nada. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica correctamente la lógica de Bayes).

### Explicación Pedagógica
$P(E) = 0.01$, $P(S) = 0.99$.
$P(+) = P(+|E)P(E) + P(+|S)P(S) = (0.9)(0.01) + (0.1)(0.99) = 0.009 + 0.099 = 0.108$.
$P(E|+) = \frac{0.009}{0.108} \approx 0.083$.
A pesar de la prueba "precisa", la rareza de la enfermedad hace que la mayoría de los positivos sean personas sanas que tuvieron mala suerte con la prueba. Este es el contraintuitivo pero vital Teorema de Bayes.

---

## Contexto 2: Variables Aleatorias y Distribuciones
No todos los eventos son blanco o negro. La mayoría de los fenómenos siguen patrones de distribución. La **Distribución Normal** (campana de Gauss) describe pesos, alturas y errores de medición. La **Distribución Binomial** se aplica cuando solo hay dos resultados (éxito/fracaso), como lanzar una moneda o encestar un tiro libre. Entender la desviación estándar y la media permite a un analista saber si un resultado es un valor esperado o una anomalía estadística significativa.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Transfer

### Enunciado
Se lanza una moneda 10 veces. Use la fórmula binomial $\binom{n}{k} p^k q^{n-k}$ para hallar la probabilidad de obtener exactamente 5 caras.

### Opciones
- [ ] A) 50%
- [x] B) 24.6% (Operación: $C(10, 5) \cdot 0.5^{10} = \frac{252}{1024}$)
- [ ] C) 10%
- [ ] D) 100%

### Explicación Pedagógica
$\binom{10}{5} = 252$.
$p^5 \cdot q^5 = (0.5)^5 \cdot (0.5)^5 = (0.5)^{10} = 1/1024$.
$252 / 1024 \approx 0.246$.
Aunque 5 es el valor más probable, hay muchísimas otras formas en que pueden salir las monedas, por lo que la probabilidad específica de 5 no es tan alta como la gente cree.

---

## Question 7 (Análisis de Campana de Gauss - Dificultad 5)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En una distribución normal, ¿qué porcentaje aproximado de los datos se encuentra dentro de una desviación estándar ($\pm 1 \sigma$) respecto a la media?

### Opciones
- [ ] A) 50%
- [x] B) 68%
- [ ] C) 95%
- [ ] D) 99%

### Explicación Pedagógica
Es la regla 68-95-99.7. En una distribución normal pura, el 68% de las personas están cerca del promedio, el 95% está a dos desviaciones (lo "normal") y solo el 0.3% son valores extremos atípicos.

---

## Question 8 (Evaluación de Probabilidad Total - Dificultad 7)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Una fábrica tiene dos máquinas: la A produce el 60% de los tornillos con 5% de defectuosos, y la B produce el 40% con 10% de defectuosos. Si tomo un tornillo al azar, ¿cuál es la probabilidad de que sea defectuoso?

### Opciones
- [ ] A) 7.5%
- [x] B) 7% (Operación: $0.6 \cdot 0.05 + 0.4 \cdot 0.10 = 0.03 + 0.04$)
- [ ] C) 15%
- [ ] D) 10%

### Explicación Pedagógica
Teorema de Probabilidad Total: Sumamos las probabilidades de ser defectuoso viniendo de cada "camino" posible.
Camino A: $0.60 \times 0.05 = 0.03$.
Camino B: $0.40 \times 0.10 = 0.04$.
Total: $0.07$ o 7%.

---

## Question 9 (Técnica de Variable Aleatoria Discreta - Dificultad 8)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Un juego consiste en lanzar un dado: si sale 6 ganas \$5000, si sale cualquier otro número pierdes \$1000. ¿Cuál es el Valor Esperado (Esperanza Matemática) de este juego?

### Opciones
- [ ] A) \$4000
- [ ] B) \$2000
- [x] C) \$0 (Es un juego justo a largo plazo)
- [ ] D) -\$200

### Explicación Pedagógica
$E(X) = \sum x_i P(x_i)$.
$E(X) = (5000 \cdot 1/6) + (-1000 \cdot 5/6) = \frac{5000}{6} - \frac{5000}{6} = 0$.
A largo plazo, si juegas muchas veces, ni ganas ni pierdes. Los casinos diseñan juegos donde el Valor Esperado es siempre negativo para el jugador.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre el concepto de Eventos Mutuamente Excluyentes. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) $P(A \cap B) = 0$. <!-- weight: 1.0 -->
- [x] B) No pueden ocurrir al mismo tiempo. <!-- weight: 1.0 -->
- [x] C) $P(A \cup B) = P(A) + P(B)$. <!-- weight: 1.0 -->
- [ ] D) Son necesariamente eventos independientes.
- [ ] E) Si ocurre A, es más probable que ocurra B.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, C) Si dos eventos son excluyentes (como sacar Cara o Cruz en un mismo lanzamiento), su intersección es nula. Por eso, para hallar la probabilidad de que ocurra uno u otro, simplemente sumamos sus probabilidades individuales sin restar nada. D es un error común: si son excluyentes, son **dependientes** (si ocurre A, la probabilidad de B cae a cero inmediatamente).

---

## Question 11 (Análisis de Probabilidad de Intersección - Dificultad 9)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Si $P(A) = 0.6$ y $P(B) = 0.5$, y sabemos que $P(A \cup B) = 0.8$. ¿Cuál es el valor de $P(A \cap B)$?

### Opciones
- [ ] A) 0.1
- [x] B) 0.3 (Operación: $0.6 + 0.5 - 0.8 = 0.3$)
- [ ] C) 1.1
- [ ] D) 0.5

### Explicación Pedagógica
Usamos el principio de inclusión-exclusión: $P(A \cup B) = P(A) + P(B) - P(A \cap B)$.
$0.8 = 0.6 + 0.5 - X \rightarrow 0.8 = 1.1 - X \rightarrow X = 0.3$.
Hay una "zona común" del 30% entre ambos eventos.

---

## Question 12 (Evaluación de Diagramas de Árbol - Dificultad 6)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v12`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
Un estudiante responde un examen de 2 preguntas de verdadero/falso al azar. ¿Cuál es la probabilidad de acertar **al menos una**?

### Opciones
- [ ] A) 50%
- [ ] B) 25%
- [x] C) 75% (3 de los 4 casos posibles: AC, AI, IC, II -> Solo falla en II)
- [ ] D) 100%

### Explicación Pedagógica
Casos: (Acierto, Acierto), (Acierto, Error), (Error, Acierto), (Error, Error).
Cada uno tiene probabilidad $1/4 = 25\%$.
Los tres primeros cumplen la condición de "al menos uno". $25\% \times 3 = 75\%$.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**El Problema de Monty Hall:** En un concurso hay 3 puertas. Detrás de una hay un carro y tras las otras dos hay cabras. Eliges la puerta 1. El presentador (que sabe qué hay detrás) abre la puerta 3, mostrando una cabra. Luego te ofrece: "¿Quieres quedarte con la puerta 1 o cambiar a la 2?".

¿Cuál es la decisión matemáticamente óptima basándose en probabilidad condicional?

### Options
- [x] A) Cambiar a la puerta 2 duplica tus probabilidades de ganar (pasa de 1/3 a 2/3). <!-- weight: 1.0 -->
- [x] B) La información de la puerta abierta por el presentador no es al azar, por lo que colapsa la incertidumbre de forma asimétrica. <!-- weight: 1.0 -->
- [ ] C) Da lo mismo, ahora hay 2 puertas así que es 50/50. (Error intuitivo clásico). <!-- weight: 0.0 -->
- [ ] D) Quedarse con la 1 porque es tu intuición inicial. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aisla la contraintuitiva realidad de la probabilidad actualizada).

### Explicación Pedagógica
Inicialmente, la probabilidad de que el carro esté en la puerta 1 es 1/3, y de que esté en el conjunto {2,3} es 2/3. Al abrir la puerta 3, toda la probabilidad de los "no elegidos" (los 2/3) se traslada únicamente a la puerta 2. Cambiar siempre es mejor. Este problema engañó incluso a matemáticos profesionales durante años, demostrando que la probabilidad condicional es el área más engañosa de la mente humana.

---

## Question 14 (Análisis Lógico de Axiomas de Probabilidad - Dificultad 5)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál de los siguientes valores NO puede ser una probabilidad?

### Opciones
- [ ] A) 0
- [ ] B) 1
- [x] C) 1.5
- [ ] D) 0.0001

### Explicación Pedagógica
La probabilidad es una medida de certidumbre que va de 0 (imposible) a 1 (seguro), o de 0% a 100%. Un valor superior a 1 no tiene sentido lógico en el marco de la probabilidad clásica.

---

## Question 15 (Análisis de Probabilidad Condicional en Tablas - Dificultad 8)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v15`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
En una encuesta: 40 hombres (20 fuman) y 60 mujeres (10 fuman). Si elegimos a una persona y resulta ser **fumadora**, ¿cuál es la probabilidad de que sea mujer?

### Opciones
- [ ] A) 10/100
- [ ] B) 10/60
- [x] C) 10/30 (Un tercio, porque hay 30 fumadores en total)
- [ ] D) 50%

### Explicación Pedagógica
Espacio muestral reducido: Solo miramos a los fumadores.
Total fumadores: $20 (hombres) + 10 (mujeres) = 30$.
Probabilidad de que sea mujer dado que fuma: $10 / 30 = 1/3$.

---

## Question 16 (Análisis de Distribución de Poisson - Dificultad 7)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v16`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Qué tipo de fenómeno modela mejor la "Distribución de Poisson"?

### Opciones
- [ ] A) El resultado de lanzar una moneda.
- [x] B) El número de eventos que ocurren en un intervalo fijo de tiempo o espacio (ej. clientes que llegan a un banco por hora).
- [ ] C) La altura de los ciudadanos de un país.
- [ ] D) Las notas de un examen difícil.

### Explicación Pedagógica
Poisson se usa para eventos discretos y raros que ocurren de forma independiente con una tasa promedio conocida ($\lambda$). Es esencial para el diseño de colas de espera y tráfico de red.

---

## Question 17 (Evaluación de Varianza - Dificultad 5)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si dos conjuntos de datos tienen la misma media pero el conjunto A tiene mayor desviación estándar que el B, ¿qué podemos afirmar?

### Opciones
- [ ] A) Los datos de A son más altos.
- [x] B) Los datos de A están más dispersos (lejos del centro).
- [ ] C) Los datos de B son menos confiables.
- [ ] D) No se pueden comparar.

### Explicación Pedagógica
La desviación estándar mide la "distancia promedio" al centro. Una desviación alta indica una campana de Gauss ancha y aplastada (mucha variabilidad), mientras que una baja indica una campana delgada y alta (datos muy consistentes).

---

## Question 18 (Cálculo de Bayes en Contexto Judicial - Dificultad 9)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la "Falacia del Fiscal" (mal uso de probabilidad en juicios). Si un rasgo genético raro lo tiene 1 de cada 10,000 personas y el sospechoso lo tiene. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El fiscal dice: "La probabilidad de que sea inocente es 1 en 10,000". Esto es FALSO. <!-- weight: 1.0 -->
- [x] B) En una ciudad de 1,000,000 de personas, habrá unas 100 personas con ese rasgo. <!-- weight: 1.0 -->
- [x] C) Sin más evidencia, la probabilidad de que el sospechoso sea culpable es solo de 1/100 (1%). <!-- weight: 1.0 -->
- [ ] D) La ciencia siempre da la culpabilidad absoluta.
- [ ] E) Si el rasgo es raro, el sospechoso es necesariamente culpable.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
Este es un error judicial histórico. Confundir la probabilidad de la evidencia dado que eres inocente con la probabilidad de ser inocente dada la evidencia. Si hay 100 personas en la ciudad con ese ADN, el hecho de que tú lo tengas solo te hace "uno de los 100 sospechosos", no el culpable único.

---

## Question 19 (Interpretación de Independencia y Exclusión - Dificultad 5)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v19`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si los eventos A y B son independientes y $P(A)=0.2, P(B)=0.3$. ¿Cuál es $P(A \cap B)$?

### Opciones
- [ ] A) 0.5
- [x] B) 0.06 (Multiplicación $0.2 \cdot 0.3$)
- [ ] C) 0
- [ ] D) 0.1

### Explicación Pedagógica
Regla de multiplicación para eventos independientes: $P(A \cap B) = P(A) \cdot P(B)$.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-probability-advanced-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Evaluate

### Enunciado
**MASTER INTEGRATION:**

En finanzas, el "Valor en Riesgo" (VaR) utiliza distribuciones normales para predecir la pérdida máxima de una cartera de inversión con un 95% de confianza. ¿Cuál es el peligro matemático de asumir que el mercado sigue siempre una distribución normal perfecta?

### Options
- [x] A) Ignora los "Cisnes Negros": eventos extremos que ocurren en las "colas" de la distribución con más frecuencia de lo que la campana de Gauss predice. <!-- weight: 1.0 -->
- [x] B) El "exceso de curtosis" (colas pesadas) hace que el riesgo real sea mucho mayor al calculado. <!-- weight: 1.0 -->
- [ ] C) Que los cálculos son demasiado lentos para la bolsa. <!-- weight: 0.0 -->
- [ ] D) Que la campana de Gauss es solo para biología. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica el límite del modelo matemático frente a la volatilidad real).

### Explicación Pedagógica
Muchos colapsos financieros ocurren porque los modelos asumen que un evento de 5 desviaciones estándar ocurrirá "una vez cada mil millones de años". Pero los mercados humanos están conectados (dependientes), lo que crea saltos bruscos. Entender que la probabilidad avanzada es un modelo, no la realidad absoluta, es la lección final de un matemático responsable.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 6 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 7 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 9 | weighted | Evaluate | Argumentación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Formulación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 7 | single | Evaluate | Probabilidad Total| ✅ |
| 9 | ...-v9 | 8 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 6 | single | Apply | Interpretación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Apply | Interpretación | ✅ |
| 16 | ...-v16| 7 | single | Analyze | Interpretación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Formulación | ✅ |
| 20 | ...-v20| 10| weighted | Evaluate | Argumentación | ✅ |
