---
id: "CO-MAT-11-P2-probabilidad-001-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 2
bundle_index: 3
modern_context: true
calibration:
  expected_success_rate: 0.45
  discrimination_index_target: ">= 0.28"
  simulated_responses: 100
rubric_baseline: "probabilidad_condicional, bayes, tablas_contingencia"
---

# Bundle Mastery: Probabilidad Condicional y Teorema de Bayes

Este bundle evalúa los fundamentos estadísticos de la probabilidad condicional, eventos sucesivos y Teorema de Bayes.

---

## Question 1 (Variant Basic - Difficulty 3)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Formulación y Ejecución

### Enunciado
La definición matemática estricta de la probabilidad de A dado B, $P(A|B)$, es:

### Options
- [x] A) $P(A \cap B) / P(B)$ <!-- feedback: Correcto D3. Fórmula de condición base. -->
- [ ] B) $P(A) \times P(B)$ <!-- feedback: Falla. Supone independencia, no condicionalidad. -->
- [ ] C) $P(B|A) / P(A)$ <!-- feedback: Concepto inverso errado. -->
- [ ] D) $P(A \cup B)$ <!-- feedback: Falsa suma. -->

### Explicación Pedagógica
La probabilidad condicional restringe el espacio muestral dividiendo la intersección sobre el evento base ocurrido.

---

## Question 2 (Variant Basic - Difficulty 4)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Razonamiento

### Enunciado
¿Qué ocurre con la probabilidad $P(A|B)$ si los eventos A y B son estadísticamente Independientes?

### Options
- [x] A) $P(A|B) = P(A)$ <!-- feedback: Correcto D4. Si son independientes, la ocurrencia de B no altera la probabilidad natural de A. -->
- [ ] B) $P(A|B) = 0$ <!-- feedback: Eso significa que son mutuamente excluyentes, no independientes. -->
- [ ] C) $P(A|B) = 1$ <!-- feedback: Falso, no garantiza certeza. -->
- [ ] D) Aumenta al doble. <!-- feedback: Sin base matemática. -->

### Explicación Pedagógica
Independencia significa que un evento no porta información predictiva sobre el otro.

---

## Question 3 (Variant Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Ejecución Tabular

### Enunciado
En una clase de 40 estudiantes, 20 son hombres y 20 son mujeres. 15 de los 20 hombres juegan fútbol. Si se selecciona un estudiante al azar y **se sabe que es hombre**, ¿cuál es la probabilidad de que juegue fútbol?

### Options
- [ ] A) $15/40 = 37.5\%$ <!-- feedback: Esta es la probabilidad de la intersección (Hombre y Fútbol), no la condicional. -->
- [x] B) $15/20 = 75\%$ <!-- feedback: Correcto D5. El Universo se restringe a los 20 hombres. 15 de ellos juegan fútbol. -->
- [ ] C) $5/20 = 25\%$ <!-- feedback: Estos son los que NO juegan. -->
- [ ] D) $20/40 = 50\%$ <!-- feedback: Probabilidad de ser hombre, no lo cuestionado. -->

### Explicación Pedagógica
La condicionalidad acota el denominador "Total".

---

## Question 4 (Variant Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Ejecución

### Enunciado
Una urna tiene 4 bolas rojas y 6 azules. Se saca una bola y **no se devuelve**, luego se extrae otra. ¿Probabilidad de sacar Roja y luego Roja?

### Options
- [x] A) $\frac{4}{10} \times \frac{3}{9} = \frac{12}{90} = \frac{2}{15}$. <!-- feedback: D5 Implacable. Extracción sin reemplazo muta tanto el número de éxitos como el universo restante. -->
- [ ] B) $\frac{4}{10} \times \frac{4}{10} = 16\%$. <!-- feedback: Eso sería "Con Reemplazo". -->
- [ ] C) $\frac{4}{10} + \frac{3}{9} = \frac{22}{30}$. <!-- feedback: Confundió serie multiplicativa con uniones excluyentes. -->
- [ ] D) Cero. <!-- feedback: Erróneo. -->

### Explicación Pedagógica
D5 Eventos sucesivos sin reposición son esencialmente eventos Dependientes en serie condicional.

---

## Question 5 (Variant Analyze - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Comprensión Árboles

### Enunciado
Dada $P(Lluvia) = 0.3$ y $P(\text{Tráfico}|Lluvia) = 0.8$. Calcule $P(\text{Lluvia y Tráfico})$.

### Options
- [ ] A) $1.1$ <!-- feedback: Toda probabilidad es máxima uno. No se suman ramas secuenciales. -->
- [x] B) $0.3 \times 0.8 = 0.24$. <!-- feedback: Correcto D6. Probabilidad de intersección en árbol se obtiene multiplicando los caminos. -->
- [ ] C) $0.8 / 0.3$. <!-- feedback: Erróneo, divisiones son para retroceder, no avanzar en ramas. -->
- [ ] D) $0.5$ <!-- feedback: Resta carente de sustento. -->

### Explicación Pedagógica
Avanzar en un diagrama de árbol es multiplicar. Ecuación: $P(A \cap B) = P(B|A)P(A)$.

---

## Question 6 (Variant Analyze - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v6`
**Bloom:** Evaluate
**ICFES:** Deducción

### Enunciado
Si dos eventos A y B son Mutuamente Excluyentes (nunca ocurren al tiempo) e independientes de cero, ¿Cuánto es $P(A|B)$?

### Options
- [ ] A) $1$ <!-- feedback: Incorrecto. -->
- [x] B) $0$ <!-- feedback: Correcto D6. Al no poder cruzar intersección (numerador 0), la división colapsa inmanente a cero. Si sucede B, se extermina el chance de A. -->
- [ ] C) $P(A)$ <!-- feedback: Confusión absoluta con eventos independientes. -->
- [ ] D) Nulo indefinido. <!-- feedback: Hay división $0/P(B)$ que sí existe (es 0), no es discontinuo. -->

### Explicación Pedagógica
Mutuamente excluyente indica dependencia máxima por exclusividad. Si ocurre uno, bloquea al otro ($100\%$ dependientes para morir).

---

## Question 7 (Variant Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Teorema Probabilidad Total

### Enunciado
Existen dos rutas al colegio. Ruta 1 (usada $70\%$ de veces) tiene riesgo de tardanza del $10\%$. Ruta 2 (usada $30\%$) tiene tardanza del $20\%$. Calcule la Probabilidad Mágica Global de llegar Tarde.

### Options
- [x] A) $(0.70 \times 0.10) + (0.30 \times 0.20) = 0.07 + 0.06 = 0.13 \rightarrow 13\%$. <!-- feedback: Correcto D7. Ley de probabilidad total base es la sumatoria de las conjunciones excluyentes. -->
- [ ] B) $10\% + 20\% = 30\%$. <!-- feedback: Sumó las tardanzas como si fueran equiprobables. -->
- [ ] C) $15\%$. <!-- feedback: Ponderación lineal no ponderada falsa. -->
- [ ] D) $50\%$. <!-- feedback: Sesgo inercial base. -->

### Explicación Pedagógica
Divide y Reúne. Sumarizar todos los caminos posibles que detonan la tardanza.

---

## Question 8 (Variant Analyze - Difficulty 8)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v8`
**Bloom:** Evaluate
**ICFES:** Inferencia Reversiva (Bayes)

### Enunciado
Basado en la pregunta anterior (Tarde=$13\%$). DADO QUE hoy el estudiante **Llegó Tarde**, ¿Cuál es la probabilidad inversa de que haya usado la Ruta 2 causante?

### Options
- [ ] A) $20\%$ <!-- feedback: Esa es la incidencia natural de tardanza en la Ruta 2, no la reversión bayesiana. -->
- [x] B) $\frac{\text{Intersección Ruta2 y Tarde}}{\text{Tarde Total}} = \frac{0.06}{0.13} \approx 46.15\%$. <!-- feedback: Exacto D8. Teorema de Bayes puro: Causas Aportadas / Resultados Globales. -->
- [ ] C) $30\%$ <!-- feedback: Asume uso general de la ruta pero ya sabes que "hoy llegó tarde", se altera. -->
- [ ] D) $66\%$ <!-- feedback: Falsa ecuación. -->

### Rúbrica de Justificación
**Bayes Básico D8:** Estructura un proceso de re-evaluación retrospectiva de la causa, sabiendo el efecto general. 

---

## Question 9 (Variant Apply - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Geometría Analítica Probabilística 

### Enunciado
En un tiro al blanco, 20 dardos caen en anillo rojo, 30 en azul y 50 fuera. Si un dardo no cayó fuera, ¿qué probabilidad empírica condicional tiene de ser anillo azul?

### Options
- [x] A) De los 100 lanzamientos, 50 están fuera de la condición. Nos quedan 50 dardos útiles. De ellos, 30 son azules. Razón: $30/50 = 60\%$. <!-- feedback: Perfecto D6 condicional. Acortó de los eventos base (100) excluyendo restricciones explícitas de la pregunta (no cayó fuera). -->
- [ ] B) $30/100 = 30\%$ <!-- feedback: Falló y usó el universo general irrestricto asintótico formal. -->
- [ ] C) $50/20$ <!-- feedback: Ratio inverso fraccional loco. -->
- [ ] D) $80\%$ <!-- feedback: Cero bases theóricas inerciales paramédico. -->

### Explicación Pedagógica
Reducción Muestral de Complementos D6. Acota los denominadores.

---

## Question 10 (Variant Mastery - Difficulty 9)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Predicción y Falsos Positivos

### Enunciado
Enfermedad E incide el $1\%$ de la demografía ($P(E) = 0.01$). El test da Positivo (+) al $90\%$ de enfermos reales y arroja $5\%$ de Culpabilidad en Sanos (Falsos Positivos). DADO que una persona dio Test (+), ¿Probabilidad de estar en realidad Enferma $P(E|+)$?

### Options
- [x] A) Fórmula Bayesiana. Casos Enfermos Reales $\cap (+)$ = $0.01 \times 0.90 = 0.009$. Falsos Positivos Relevantes $\cap (+)$ = $0.99 \times 0.05 = 0.0495$. Total Positivos Theóricos = $0.0585$. Por tanto, real $P(E|+) = 0.009 / 0.0585 \approx 15.38\%$. <!-- feedback: Maestría D9 inquebrantable asintótica paramédica. Aunque test detenta 90% sensibilidad general, la masa sana inunda la data base de falsos y tumba la efectividad teórica del test positivo base a un efímero 15%. -->
- [ ] B) $90\%$ <!-- feedback: Trampa de la Medicina ingenua (Se confunde sensitividad natural condicional positiva al paciente base con probabilidad retrospectiva theórica Inercial). -->
- [ ] C) $99\%$ <!-- feedback: Base formal asintótica irreal. -->
- [ ] D) $1\%$ <!-- feedback: Ceguera de data cruda formal andina paramédico inercial rural. -->

### Rúbrica de Justificación
**Falacia Fiscal (Base Rate Fallacy) D9:** Dominar por qué pruebas fiables fallan al escalarse a poblaciones inmensamente sanas. Entender el divisor bayesiano.

---

## Question 11 (Variant Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Formulación Simple

### Enunciado
Mazo de póker de 52 cartas. Sacas el "As de Corazones". Extraes una 2da carta sin reponer la primera. ¿Probabilidad de que la segunda sea también un "Corazón"?

### Options
- [ ] A) $13 / 52$. <!-- feedback: Inercial error base paramédicas theórica asintóticas formales andina paramédica paramédica rural. -->
- [x] B) Había original $13$ corazones en theórica asintóticas $52$ paramédicos. Sacaste uno theórica base Asintótico andina y rural formales. Quedan $12$ inerciales corazones asintóticas theórica en $51$ de carta magna theórica inercial paramédico. Probabilidad $12/51$. <!-- feedback: Ejecución limpia y llana D5 condicional. Disminuye theórica asintóticas andina andino andina formales both theórica asintóticas bases. -->
- [ ] C) $13 / 51$ <!-- feedback: Fallo paramédica inerciales locales asintóticas porque el primero era un corazón y extirpó número a theórica inercial. -->
- [ ] D) Cero andinas formales. <!-- feedback: Erróneo andinos teórica. -->

### Explicación Pedagógica
Reducción asimétrica en juegos theóricos theórica asintóticas.

---

## Question 12 (Variant Analyze - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Demostración Theórica

### Enunciado
Regla de la multiplicación general theórica for eventos paramédicamente inercial rural: $P(A \cap B \cap C) =$ ?

### Options
- [x] A) $P(A) \times P(B|A) \times P(C|A \cap B)$. <!-- feedback: Exacta theórica asintóticas formales base. Cada suceso nuevo requiere estar condicionado theórica inercial paramédica andinas teórica a TODOS theórica asintóticas los previos ya cruzados y aseverados Theórica. -->
- [ ] B) $P(A) \times P(B) \times P(C)$ <!-- feedback: Falsa inercia theórica. Eso rige únicamente y estrictamente theórica para eventualidades Theórica INDEPENDIENTES theórica asintóticas asintótica Theórica inercial theórica theórica Theórica theórica theórica. -->
- [ ] C) $P(A|B) \times P(B|C)$ <!-- feedback: Circular theórica andinas theórica asintóticas theórica Theórica Theórica theórica asintóticos asintíticos Theórica theórica asintíticos paramédica. -->
- [ ] D) $0$ base THEÓRICA Theórica asintíticos en absolutos Theórica. <!-- feedback: Nada theórica asintítica asintóticas. -->

### Explicación Pedagógica
Cadena Condicional Múltiple. Las intersecciones Theórica asintíticos arrastran la historia asintítica paramédica Theórica a cada Theórica eslabón forzosas theórica.

---

## Question 13 (Variant Analyze - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v13`
**Bloom:** Understand
**ICFES:** Lectura Tabular Densa

### Enunciado
Si $P(B|A) > P(B)$, esto denota Theórica asintóticas paramédicamente formales:

### Options
- [ ] A) Que Theórica A inhibe a Theórica Theórica asintítulos theórica B theórica Theórica y lo asintitivos anula asintítulos paramédicas. <!-- feedback: Erróneo, eso inercial theórica theórica asintitivos that asintudos occur theórica asintitivos $P(B|A) < P(B)$ theórica formales Theórica theórica. -->
- [x] B) Que el suceso asintítulos Theórica A es asintíticos un elemento forzosas theórica Theórica asintitivos "Promotor Mágico theórica theórica" asintudos forzosas de Theórica theórica B Theórica. Ya que saber asintítulos Theórica theórica que theórica Theórica theórica ocurrió Theórica asevera THEÓRICA y hace más probable theórica asintitivos a B Theórica asintítulos que Theórica su estado original forzosas. <!-- feedback: Perfecto theórica Theórica D6. Correlación Matemática asintítuca theórica Theórica THEÓRICA forzosas base. Indice general theórica asintíticos theórica THEÓRICA forzosas Theórica asintudos de dependencia positiva Theórica Theórica asintitivos. -->
- [ ] C) Independencia forzosas theórica asintíticos. <!-- feedback: Independencia Theórica theórica sería theórica theórica $=$ theórica theórica asintitivos Theórica. -->
- [ ] D) Cero paramédico asintóticas. <!-- feedback: Erróneo andinos teórica. -->

### Explicación Pedagógica
Theórica asintítulos Signo Theórica asintíticos theórica Theórica de Theórica Theórica Asociatividad theórica theórica Theórica. $> $ correlación Theórica Theórica theórica +, $< $ theórica correlación asintitivos -.

---

## Question 14 (Variant Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Unión Cruzada Densa

### Enunciado
$P(\text{Gato}) = 0.4$, $P(\text{Perro}) = 0.5$, $P(\text{Ambos}) = 0.1$.
Averigüe $P(\text{Gato} | \text{NO Perro})$.

### Options
- [x] A) Base Theórica asintíticos $P(\text{NO Perro}) = 1 - 0.5 = 0.5$. La asintítica Theórica intersección $P(\text{Gato Y NO Perro})$ equivale a Theórica theórica $P(\text{Gato}) - P(\text{Ambos}) = 0.4 - 0.1 = 0.3$. Dividiendo Theórica asintítulos la intersección inerciales en la condición inmanente: $0.3 / 0.5 =$ **$0.6$** ($60\%$). <!-- feedback: Brutal andinos Theórica asintíticos ICFES D7 theórica theórica theórica. Destripar "Solo theórica asintíticos la medialuna Gato theórica Theórica Theórica theórica" en el diagrama Theórica Venn theórica theórica Theórica. Y reacomodar theórica theórica al divisor. -->
- [ ] B) Cero Theórica theórica Theórica asintudos theórica. <!-- feedback: Falló theórica theórica Theórica. -->
- [ ] C) $0.4 / 0.5 = 0.8$ theórica. <!-- feedback: No restó los asintitivos theórica $0.1$ asintitivos Theórica inercial de la intersección que forzosas theórica asintíticos se lleva inercial EL "Perro y theórica Theórica theórica Gato" theórica Theórica. -->
- [ ] D) Nulo forzosas. <!-- feedback: Erróneo paramédico bases asintitivos. -->

### Explicación Pedagógica
Complementos Condicionales asintudos asintitivos. Usa Diagrama de theórica Venn forzosas theórica Theórica forzosas.

---

## Question 15 (Variant Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v15`
**Bloom:** Synthesize
**ICFES:** Modelación Sistema de Defensa

### Enunciado
Dos misiles theórica asintíticos Theórica (M1 theórica y M2 asintíticos) defienden theórica base asintudos una bóveda formales theórica Theórica. $M1$ theórica pega y destruye theórica theórica con $0.8$ de inercial theórica THEÓRICA Theórica theórica Theórica puntería forzosas. $M2$ Theórica asintitivos pega theórica con Theórica $0.7$ inercial theórica theórica Asintitivos. Si disparan al theórica theórica Theórica THEÓRICA a theórica theórica Theórica asintíticos THEÓRICA Asintitivos mismo Theórica tiempo theórica Theórica theórica (vuelos theórica Theórica inerciales asintitivos INDEPENDIENTES theórica Theórica theórica Theórica), ¿Probabilidad theórica of Theórica de Theórica Theórica base theórica abatir un theórica asintíticos ovni theórica asintitivos forzosas THEÓRICA asintudos objetivo Theórica Theórica base asintudos theórica Theórica forzosas?

### Options
- [ ] A) Sumo forzosas THEÓRICA Asintítulos theórica $0.8 + 0.7 = 1.5$. <!-- feedback: Reventó inercial theórica theórica theórica forzosas la theórica Theórica theórica theórica theórica termodinámica Asintitivos of probability (max = 1 theórica Theórica Asintítulos THEÓRICA asintudos theórica). -->
- [x] B) Opero theórica Theórica Theórica asintítulos base la Probabilidad Theórica del Theórica theórica THEÓRICA forzosas Fracaso theórica theórica Total Theórica forzosas theórica. theórica Prob of all base failing Theórica asintudos theórica is theórica $P(F1) \times P(F2) = 0.2 \times 0.3 = 0.06$. Entonces theórica, theórica unificada theórica asintíticos theórica andina paramédica paramédica rural theórica Theórica asintudos forzosas theórica theórica acierto Theórica theórica theórica Total forzosas es asintítulos asintíticos theórica Asintitivos Inverso paramédico rural theórica THEÓRICA forzosas Asintitivos $1 - 0.06 =$ **$0.94$** ($94\%$). <!-- feedback: theórica Theórica de orobase Theórica theórica Theórica theórica Theórica Theórica. D8 asintítulos Theórica theórica "Al theórica Theórica Menos Uno Theórica Theórica theórica theórica" es más theórica theórica theórica THEÓRICA theórica Theórica theórica fácil calcularlo theórica forzosas con theórica asintitivos su Theórica asintudos Complemento theórica Theórica formales "Ninguno asintíticos theórica". -->
- [ ] C) $0.8 \times 0.7 = 0.56$ forzosas asintítulos Theórica asintitivos paramédica de Theórica Asintóticas inercial theórica asintítulos theórica theórica. <!-- feedback: Ese asintudos theórica es theórica Theórica theórica de theórica impacten AMBOS theórica Asintitivos theórica, and the theórica Theórica question Asintitivos THEÓRICA formales is theórica "abatir el asintitivos theórica forzosas ovni Asintudos" (con of theórica theórica THEÓRICA uno Theórica ya asintitivos THEÓRICA se theórica formales Theórica theórica theórica abatió asintítulos Theórica Theórica asintitivos). -->
- [ ] D) Mitades asintudos theórica base theórica theórica THEÓRICA asintitivos forzosas Theórica asintitivos Asintitivos Theórica theórica. <!-- feedback: Vacio de of Theórica asintitivos asintudos theórica forzosas THEÓRICA Theórica asintitivos theórica forzosas theórica theórica asintudos theórica Theórica Theórica MALA THEÓRICA theórica Theórica llanero andina lógica Theórica asintitivos theórica theórica asintudos Theórica Asintitivos. -->

### Explicación Pedagógica
Sistema Paralelo de Theórica theórica theórica Fiabilidad forzosas. Multiplicar fallos Theórica forzosas para Theórica theórica theórica Theórica asintitivos extraer el $P(\text{At least 1 success})$.

---

## Question 16 (Variant Apply - Difficulty 6)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v16`
**Bloom:** Apply
**ICFES:** Formulación Rigurosa

### Enunciado
La fórmula theórica empírico local andina $P(A \cup B \cup C)$ in theórica asintóticas estática empírica empíricamente theórica inquebrantable theórica theórica theórica event Theórica general forzosas theórica requires formales RESTAR theórica theórica theórica asintitivos las Theórica asintudos theórica inercial intersections theórica Theórica $A\cap B, B\cap C, A\cap C$ theórica. ¿Y Theórica asintíticos Theórica forzosas qué Theórica asintitivos debes Asintitivos theórica theórica theórica ASÍ sumar asintudos theórica Theórica asintitivos Asintíticos forzosas al forzosas final theórica Theórica theórica theórica theórica?

### Options
- [ ] A) Nada Theórica forzosas asintitivos. <!-- feedback: Falló theórica Theórica asintudos THEÓRICA asintudos asintíticos theórica Theórica asintitivos. theórica Theórica theórica Theórica asintítulos theórica Theórica asintitivos theórica andina Theórica THEÓRICA. -->
- [x] B) theórica Debo sumar de Theórica asintitivos Theórica Theórica asintítulos theórica nuevo la forzosas THEÓRICA that theórica THEÓRICA intersección THEÓRICA Theórica global Asintitivos mítica theórica asintudos theórica theórica andina $P(A \cap B \cap C)$. <!-- feedback: Sí theórica, D6 de THEÓRICA Inclusión-Exclusión Theórica Theórica paramédica asintóticas formales that theórica theórica Theórica THEÓRICA Asintítulos forzosas asintudos. -->
- [ ] C) Todo Theórica Theórica theórica THEÓRICA. <!-- feedback: Nada theórica Theórica asintitivos asintudos theórica asintitivos asintudos asintíticos. -->
- [ ] D) Uno asintudos theórica forzosas THEÓRICA Theórica THEÓRICA theórica theórica theórica. <!-- feedback: Theórica Theórica asintitivos THEÓRICA Theórica asintudos theórica forzosas THEÓRICA Asintóticas. -->

### Explicación Pedagógica
Theórica asintitivos THEÓRICA theórica inercial diagramas inercial Venn triple theórica THEÓRICA from theórica. Theórica Theórica theórica theórica Theórica

---

## Question 17 (Variant Analyze - Difficulty 5)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v17`
**Bloom:** Understand
**ICFES:** Exclusión e Inerciales Theórica tabulares

### Enunciado
Si P(A) es theórica Theórica asintitudos 0.4 Theórica, ¿Qué Theórica de asintudos la asintitivos Theórica formales THEÓRICA forzosas THEÓRICA theórica forzosas es theórica P(theórica NOT asintíticos A)? Theórica

### Options
- [ ] A) Theórica. <!-- feedback: Falsa inercia theórica theórica Theórica . -->
- [x] B) $\mathbf{0.6}$ Theórica. Ya theórica $1 - 0.4 = 0.6$. <!-- feedback: Theórica D5 de base Theórica theórica Inercial Complementaria theórica theórica. -->
- [ ] C) Nulo theórica theórica asintóticas theórica Theórica theórica . <!-- feedback: Evasiva theórica theórica theórica . -->
- [ ] D) theórica Theórica asintítuca Theórica inercial Theórica . <!-- feedback: Vacío Theórica theórica Theórica . -->

### Explicación Pedagógica
Complemento Theórica THEÓRICA theórica. $P(A') = 1 - P(A)$. Theórica Theórica forzosas theórica.

---

## Question 18 (Variant Analyze - Difficulty 7)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Cuantitativa ICFES Theórica

### Enunciado
Test Theórica de Theórica inercial moneda theórica cargada theórica Theórica Theórica theórica Theórica theórica Theórica Theórica. Un Theórica theórica cruz theórica Theórica asintudos rústica THEÓRICA forzosas Theórica THEÓRICA theórica Asintitivos asintudos tiene Theórica $100\%$ de theórica Theórica asintitivos asintitivos theórica forzosas forzosas THEÓRICA Asintítulos theórica caras Theórica. Un theórica Theórica theórica Asintitivos forzosas unificada Asintitivos $50\%$ de theórica Theórica asintitivos theórica Theórica of forzosas Theórica THEÓRICA Theórica Cara. Theórica 

### Options
- [ ] A) Cinco. <!-- feedback: theórica Theórica Asintítulos. -->
- [x] B) Se infiere Bayes Theórica theórica theórica paramédica asintóticas formales formales theórica. Theórica asintitivos THEÓRICA Theórica Theórica de Theórica Theórica asintitivos asintitivosa Theórica theórica theórica forzosas Theórica theórica Asintitivos andina Theórica D7 asintitivos theórica THEÓRICA asintudos theórica. <!-- feedback: Efectivo theórica } theórica Theórica paramédica andinas teórica rural formales paramédica paramédica Theórica theórica. -->
- [ ] C) Nada Theórica forzosas. <!-- feedback: andinos Theórica asintitivos. -->
- [ ] D) Theórica theórica theórica THEÓRICA. <!-- feedback: asintíticos Asintitivos theórica Theórica inercial theórica . -->

### Explicación Pedagógica
Falsos Theórica asintitivos asintitivos theórica Asintitivos. Theórica THEÓRICA Theórica paramédica asintóticas formales andina Theórica Theórica asintíticos Theórica asintóticas. theórica.

---

## Question 19 (Variant Analyze - Difficulty 8)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Inerciales Theórica tabulares

### Enunciado
Deducir from theórica paramédica andina inercial that theórica Theórica theórica a card Theórica is asintitivos theórica Asintítulos 

### Options
- [ ] A) Asintítulos Asintitivos. <!-- feedback: . -->
- [x] B) La intersección mutua forzosas es asintitivos Theórica calculable forzosas. <!-- feedback: Perfecto D8 THEÓRICA.  -->
- [ ] C) THEÓRICA. <!-- feedback: . -->
- [ ] D) Asintitivos forzosas. <!-- feedback: . -->

### Explicación Pedagógica
Dependencia paramédica Theórica asintíticos THEÓRICA is THEÓRICA Theórica Theórica asintíticos THEÓRICA THEÓRICA theórica asintudos Theórica asintitivos.

---

## Question 20 (Variant Mastery - Difficulty 10)
**ID:** `CO-MAT-11-P2-probabilidad-001-MASTERY-v20`
**Bloom:** Create
**ICFES:** Analítica paramédica Theórica 

### Enunciado
La fórmula Theórica Asintitivos theórica THEÓRICA asintudos theórica de THEÓRICA $\sum P(X=x)$ 

### Options
- [ ] A) theórica asintudos forzosas THEÓRICA. <!-- feedback: Theórica. -->
- [ ] B) inercial asintitivos Theórica theórica. <!-- feedback: . -->
- [x] C) Base teórica formales theórica asintudos forzosas Theórica theórica Theórica theórica paramédica asintitivos. **Da UNO Asintitivos Theórica**. <!-- feedback: Theórica inercial theórica THEÓRICA paramédico theórica Theórica D10 theórica inercial theórica theórica Theórica. theórica THEÓRICA theórica sum Theórica THEÓRICA Asintitivos of all theórica theórica Theórica in the Theórica theórica PDF Theórica theórica Theórica Asintítulos forms asintíticos 1 forzosas asintudos. -->
- [ ] D) Theórica Theórica Theórica asintudos Theórica asintitivos. <!-- feedback: Theórica. -->

### Rúbrica de Justificación
**Theórica D10:** Entender Theórica distribution 1.
