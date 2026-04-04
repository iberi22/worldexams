---
id: "CO-MAT-11-P1-limites-003-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "limites"
periodo: 1
protocol_version: "5.1"
bundle_index: 3
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.46
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "limites_finitos, limites_al_infinito, interpretacion_asintotica"
---

# Bundle Matematicas G11 - Periodo 1: Limites y Comportamiento Asintotico

Este bundle trabaja lectura de límites, indeterminaciones básicas, límites al infinito y aplicación de ideas de continuidad.

---

## Question 1 (Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v1`
**Bloom:** Comprender
**ICFES:** Comunicación y representación
**Expected_Success:** 0.70

### Enunciado
Si $\lim_{x \to 4} f(x)=9$, esto significa que

### Options
- [ ] A) $f(x)$ vale 4 para todo x. <!-- feedback: Se confunden entrada y salida. -->
- [x] B) los valores de $f(x)$ se acercan a 9 cuando $x$ se aproxima a 4. <!-- feedback: Correcto. Esa es la interpretación básica del límite. -->
- [ ] C) la función solo está definida en x=4. <!-- feedback: El límite no significa restricción a un único punto. -->
- [ ] D) la gráfica cruza siempre el eje x en 9. <!-- feedback: El eje x no se interpreta así. -->

### Explicación Pedagógica
El límite describe tendencia de la función cerca de un punto.

---

## Question 2 (Basic - Difficulty 3)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v2`
**Bloom:** Aplicar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.68

### Enunciado
Calcule:
$$
\lim_{x \to 2} (3x+1)
$$

### Options
- [ ] A) 5 <!-- feedback: Error al evaluar la expresión lineal. -->
- [x] B) 7 <!-- feedback: Correcto. Se reemplaza x=2 y se obtiene 3(2)+1=7. -->
- [ ] C) 6 <!-- feedback: Falta sumar la constante. -->
- [ ] D) 1 <!-- feedback: Se ignora el término con x. -->

### Explicación Pedagógica
En funciones lineales, el límite se obtiene por sustitución directa.

---

## Question 3 (Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v3`
**Bloom:** Comprender
**ICFES:** Comunicación y representación
**Expected_Success:** 0.64

### Enunciado
Si $\lim_{x \to 1^-} f(x)=3$ y $\lim_{x \to 1^+} f(x)=3$, entonces

### Options
- [ ] A) el límite bilateral no existe. <!-- feedback: Si ambos laterales coinciden, sí existe. -->
- [x] B) el límite bilateral en x=1 es 3. <!-- feedback: Correcto. La igualdad de límites laterales garantiza el límite global. -->
- [ ] C) necesariamente $f(1)=0$. <!-- feedback: El valor del punto no se deduce de esa información. -->
- [ ] D) la función debe ser lineal. <!-- feedback: La linealidad no es requisito. -->

### Explicación Pedagógica
El límite bilateral existe cuando ambos lados se acercan al mismo valor.

---

## Question 4 (Basic - Difficulty 4)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v4`
**Bloom:** Aplicar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.61

### Enunciado
Calcule:
$$
\lim_{x \to 5} \frac{x^2-25}{x-5}
$$

### Options
- [ ] A) 0 <!-- feedback: La indeterminación inicial no implica que el límite sea 0. -->
- [ ] B) 5 <!-- feedback: Se simplificó de forma incompleta. -->
- [x] C) 10 <!-- feedback: Correcto. Se factoriza a (x-5)(x+5) y queda x+5. -->
- [ ] D) no existe <!-- feedback: El límite sí existe tras simplificar. -->

### Explicación Pedagógica
Las formas $0/0$ suelen resolverse factorizando y simplificando.

---

## Question 5 (Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v5`
**Bloom:** Analizar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.56

### Enunciado
¿Cuál afirmación describe mejor una asíntota vertical en $x=a$?

### Options
- [ ] A) La función corta el eje y en a. <!-- feedback: Eso describe otra idea. -->
- [x] B) Los valores de la función crecen o decrecen sin límite cuando x se aproxima a a. <!-- feedback: Correcto. Esa es la idea de una asíntota vertical. -->
- [ ] C) La función toma el valor a en todos los puntos. <!-- feedback: No corresponde al concepto. -->
- [ ] D) El límite al infinito vale a. <!-- feedback: Eso apunta a asíntotas horizontales. -->

### Explicación Pedagógica
Una asíntota vertical aparece cuando la función se descontrola cerca de un valor fijo de x.

---

## Question 6 (Intermediate - Difficulty 5)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v6`
**Bloom:** Aplicar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.54

### Enunciado
Calcule:
$$
\lim_{x \to \infty} \frac{4x+1}{x}
$$

### Options
- [ ] A) 0 <!-- feedback: Numerador y denominador tienen el mismo grado. -->
- [x] B) 4 <!-- feedback: Correcto. Al dividir todo por x queda 4 + 1/x. -->
- [ ] C) infinito <!-- feedback: No crece sin límite después de simplificar. -->
- [ ] D) 1 <!-- feedback: Se ignora el coeficiente principal del numerador. -->

### Explicación Pedagógica
En cocientes del mismo grado, el límite al infinito depende de los coeficientes líderes.

---

## Question 7 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v7`
**Bloom:** Analizar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.50

### Enunciado
Si $\lim_{x \to 2^-} f(x)=7$ pero $\lim_{x \to 2^+} f(x)=10$, entonces

### Options
- [ ] A) el límite bilateral es 8.5. <!-- feedback: Los límites no se promedian. -->
- [ ] B) la función es continua en 2. <!-- feedback: La continuidad falla si los laterales no coinciden. -->
- [x] C) el límite bilateral no existe. <!-- feedback: Correcto. Hay un salto entre ambos lados. -->
- [ ] D) necesariamente $f(2)=7$. <!-- feedback: El valor del punto no se deduce así. -->

### Explicación Pedagógica
Si los límites laterales son distintos, el límite global no existe.

---

## Question 8 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v8`
**Bloom:** Aplicar
**ICFES:** Modelación
**Expected_Success:** 0.48

### Contexto
La velocidad de descarga de un archivo disminuye con el tiempo y se aproxima a 0 sin llegar a detenerse por completo durante el intervalo observado.

### Enunciado
Matemáticamente, esa descripción significa que la velocidad

### Options
- [ ] A) se hace exactamente 0 desde el primer instante. <!-- feedback: Eso contradice el contexto. -->
- [x] B) tiene un límite igual a 0 cuando el tiempo crece, aunque no necesariamente alcanza ese valor. <!-- feedback: Correcto. Describe una tendencia asintótica. -->
- [ ] C) aumenta de forma lineal hacia infinito. <!-- feedback: Es lo contrario a la descripción. -->
- [ ] D) deja de estar definida para tiempos grandes. <!-- feedback: El contexto no dice eso. -->

### Explicación Pedagógica
Los límites permiten modelar tendencias sin exigir que el valor se alcance exactamente.

---

## Question 9 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v9`
**Bloom:** Analizar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.46

### Enunciado
¿Cuál situación produce una indeterminación del tipo $0/0$?

### Options
- [ ] A) Reemplazar y obtener 5/0. <!-- feedback: Eso indica comportamiento infinito, no 0/0. -->
- [x] B) Reemplazar y obtener 0/0 en una expresión racional. <!-- feedback: Correcto. Esa es la forma indeterminada clásica por factorización. -->
- [ ] C) Reemplazar y obtener 3/2. <!-- feedback: Ahí basta evaluar directamente. -->
- [ ] D) Reemplazar y obtener 0/7. <!-- feedback: Ese caso no es indeterminado. -->

### Explicación Pedagógica
Las indeterminaciones señalan que hace falta transformar la expresión antes de concluir.

---

## Question 10 (Intermediate - Difficulty 6)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v10`
**Bloom:** Analizar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.44

### Enunciado
Si
$$
\lim_{x \to \infty} f(x)=2,
$$
entonces la recta que actúa como asíntota horizontal es

### Options
- [ ] A) $x=2$ <!-- feedback: Esa sería una recta vertical. -->
- [x] B) $y=2$ <!-- feedback: Correcto. Las asíntotas horizontales se expresan en términos de y. -->
- [ ] C) $y=x+2$ <!-- feedback: Eso corresponde a una recta oblicua. -->
- [ ] D) $x-y=2$ <!-- feedback: No es la traducción directa del límite dado. -->

### Explicación Pedagógica
Los límites al infinito describen el valor de y al que se aproxima la función.

---

## Question 11 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v11`
**Bloom:** Evaluar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.40

### Enunciado
Calcule:
$$
\lim_{x \to 0} \frac{\sqrt{x+1}-1}{x}
$$

### Options
- [ ] A) 0 <!-- feedback: Hace falta racionalizar antes de concluir. -->
- [x] B) 1/2 <!-- feedback: Correcto. Al racionalizar se obtiene 1/(\sqrt{x+1}+1), que vale 1/2. -->
- [ ] C) 1 <!-- feedback: Se omite el efecto del denominador racionalizado. -->
- [ ] D) no existe <!-- feedback: El límite sí existe. -->

### Explicación Pedagógica
Algunas indeterminaciones se resuelven racionalizando el numerador.

---

## Question 12 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v12`
**Bloom:** Evaluar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.38

### Enunciado
¿Por qué la existencia de $\lim_{x \to a} f(x)$ no obliga a que $f(a)$ exista?

### Options
- [ ] A) Porque todo límite depende solo del valor exacto del punto. <!-- feedback: Ocurre justamente lo contrario. -->
- [x] B) Porque el límite estudia la tendencia alrededor del punto, no necesariamente el valor definido en él. <!-- feedback: Correcto. Esa distinción permite discontinuidades evitables. -->
- [ ] C) Porque los límites solo se usan con polinomios. <!-- feedback: Los límites se aplican a muchas clases de funciones. -->
- [ ] D) Porque si existe el límite la función debe ser negativa. <!-- feedback: El signo es irrelevante aquí. -->

### Explicación Pedagógica
Un límite puede existir aunque el punto no esté definido o tenga otro valor.

---

## Question 13 (Advanced - Difficulty 7)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v13`
**Bloom:** Analizar
**ICFES:** Modelación
**Expected_Success:** 0.36

### Contexto
La concentración de un medicamento en sangre disminuye con el tiempo y se aproxima a 0.

### Enunciado
La mejor interpretación del límite 0 en este contexto es que

### Options
- [ ] A) la concentración fue siempre 0 desde el inicio. <!-- feedback: No coincide con una disminución progresiva. -->
- [ ] B) el medicamento deja de existir matemáticamente en todo instante. <!-- feedback: La idea de tendencia es más sutil que eso. -->
- [x] C) a largo plazo la concentración puede hacerse tan pequeña como se quiera. <!-- feedback: Correcto. Esa es la lectura precisa del límite. -->
- [ ] D) la función pierde dominio después de cierto tiempo. <!-- feedback: El contexto no dice eso. -->

### Explicación Pedagógica
Un límite cercano a 0 expresa agotamiento progresivo, no desaparición instantánea.

---

## Question 14 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v14`
**Bloom:** Evaluar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.33

### Enunciado
Calcule:
$$
\lim_{x \to \infty} \frac{2x^2+3}{x^2-1}
$$

### Options
- [ ] A) 0 <!-- feedback: Los grados son iguales, así que no tiende a 0. -->
- [x] B) 2 <!-- feedback: Correcto. El cociente de coeficientes líderes es 2/1. -->
- [ ] C) 3 <!-- feedback: Se está tomando una constante incorrecta del numerador. -->
- [ ] D) infinito <!-- feedback: No crece sin límite tras comparar grados. -->

### Explicación Pedagógica
Cuando numerador y denominador tienen igual grado, domina el cociente de coeficientes principales.

---

## Question 15 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v15`
**Bloom:** Evaluar
**ICFES:** Comunicación y representación
**Expected_Success:** 0.31

### Enunciado
Si una función tiene una asíntota horizontal $y=4$, ¿cuál afirmación es válida?

### Options
- [ ] A) Nunca puede cortar la recta y=4. <!-- feedback: Una función puede cruzar su asíntota horizontal. -->
- [ ] B) Toma el valor 4 en todos los puntos grandes. <!-- feedback: Se aproxima, no necesariamente coincide siempre. -->
- [x] C) Sus valores se acercan a 4 cuando x crece en la dirección indicada por el límite. <!-- feedback: Correcto. Esa es la interpretación correcta. -->
- [ ] D) Tiene una discontinuidad obligatoria en x=4. <!-- feedback: Se confunden eje horizontal y punto del dominio. -->

### Explicación Pedagógica
Una asíntota horizontal describe tendencia, no coincidencia permanente.

---

## Question 16 (Advanced - Difficulty 8)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v16`
**Bloom:** Evaluar
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.29

### Enunciado
¿Qué error comete quien afirma que si $\lim_{x \to a} f(x)=L$, entonces necesariamente $f(a)=L$?

### Options
- [ ] A) Confunde límite con derivada. <!-- feedback: El error central no es ese. -->
- [x] B) Ignora que el valor en el punto puede estar ausente o diferir del límite. <!-- feedback: Correcto. Eso ocurre en discontinuidades evitables. -->
- [ ] C) Cree que todos los límites son bilaterales. <!-- feedback: No es el núcleo del error. -->
- [ ] D) Supone que toda función es constante. <!-- feedback: Esa no es la confusión relevante. -->

### Explicación Pedagógica
El valor de la función y su límite cerca del punto son conceptos relacionados, pero distintos.

---

## Question 17 (Mastery - Difficulty 9)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v17`
**Bloom:** Evaluar
**ICFES:** Modelación
**Expected_Success:** 0.26

### Contexto
El costo promedio por unidad de producción baja al aumentar el número de unidades y se aproxima a un valor fijo.

### Enunciado
¿Qué representa mejor ese valor fijo en términos de límites?

### Options
- [ ] A) El costo total de la primera unidad producida. <!-- feedback: No corresponde a la tendencia para grandes cantidades. -->
- [ ] B) Un máximo local inevitable. <!-- feedback: El contexto habla de aproximación, no de máximo. -->
- [x] C) El valor al que tiende el costo promedio cuando la producción crece mucho. <!-- feedback: Correcto. Esa es la lectura del límite en el contexto. -->
- [ ] D) El punto donde la función deja de estar definida. <!-- feedback: El escenario no describe una ruptura del dominio. -->

### Explicación Pedagógica
Los límites al infinito son útiles para interpretar estabilización de promedios.

---

## Question 18 (Mastery - Difficulty 9)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v18`
**Bloom:** Evaluar
**ICFES:** Formulación y ejecución
**Expected_Success:** 0.24

### Enunciado
Calcule:
$$
\lim_{x \to \infty} \frac{5x-2}{x+3}
$$

### Options
- [ ] A) 0 <!-- feedback: Los grados son iguales, así que no se anula. -->
- [x] B) 5 <!-- feedback: Correcto. El límite es el cociente de coeficientes líderes 5/1. -->
- [ ] C) -2 <!-- feedback: Se toma la constante equivocadamente. -->
- [ ] D) infinito <!-- feedback: No corresponde tras simplificar la razón principal. -->

### Explicación Pedagógica
El comportamiento al infinito queda dominado por los términos de mayor grado.

---

## Question 19 (Mastery - Difficulty 10)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v19`
**Bloom:** Crear
**ICFES:** Razonamiento y argumentación
**Expected_Success:** 0.22

### Enunciado
¿Cuál procedimiento es más adecuado para decidir si una indeterminación $0/0$ oculta un límite finito?

### Options
- [ ] A) Declarar inmediatamente que el límite no existe. <!-- feedback: Esa conclusión es prematura. -->
- [ ] B) Sustituir el valor una y otra vez esperando un cambio. <!-- feedback: Repetir la misma acción no resuelve la indeterminación. -->
- [x] C) Transformar algebraicamente la expresión, por ejemplo factorizando o racionalizando, antes de volver a evaluar. <!-- feedback: Correcto. Ese es el procedimiento estándar. -->
- [ ] D) Cambiar el punto al que tiende x por otro más sencillo. <!-- feedback: Eso altera el problema original. -->

### Explicación Pedagógica
Las indeterminaciones se resuelven transformando la expresión, no abandonando el análisis.

---

## Question 20 (Mastery - Difficulty 10)
**ID:** `CO-MAT-11-P1-limites-003-MASTERY-v20`
**Bloom:** Evaluar
**ICFES:** Modelación
**Expected_Success:** 0.20

### Contexto
Un sensor mide la distancia entre un dron y un punto fijo. El informe dice que, al aproximarse al punto de aterrizaje, la distancia tiende a 0.

### Enunciado
¿Qué interpretación es más rigurosa?

### Options
- [ ] A) El dron estuvo todo el tiempo exactamente en el punto de aterrizaje. <!-- feedback: La tendencia a 0 no significa eso. -->
- [ ] B) El dron nunca pudo acercarse al punto porque el límite no puede ser 0. <!-- feedback: Sí puede. -->
- [x] C) La distancia puede hacerse tan pequeña como se quiera al acercarse el instante de aterrizaje. <!-- feedback: Correcto. Expresa bien el significado del límite. -->
- [ ] D) El dron necesariamente cruzó el punto muchas veces antes de aterrizar. <!-- feedback: Ese comportamiento no se deduce del límite. -->

### Explicación Pedagógica
Un límite 0 modela aproximación progresiva a un objetivo.
