<think>
El usuario me pide generar 20 preguntas tipo ICFES para matemáticas, tema derivadas, grado 11, período 4. Debo seguir exactamente el formato especificado con frontmatter YAML y las 20 preguntas estructuradas.

Debo generar preguntas con dificultad progresiva:
- D3-D4: preguntas 1-4
- D5-D6: preguntas 5-10
- D7-D8: preguntas 11-16
- D9-D10: preguntas 17-20

Los temas de derivadas que debo cubrir incluyen:
- Definición de derivada
- Reglas de derivación (potencia, suma, producto, cociente)
- Derivada de funciones trigonométricas
- Regla de la cadena
- Derivadas de orden superior
- Aplicaciones (máximos, mínimos, optimización)
- Derivadas implícitas
- Derivada de funciones exponenciales y logarítmicas

Debo usar contexto colombiano moderno y distractores plausibles (errores típicos de estudiantes colombianos).

Voy a generar las 20 preguntas siguiendo la estructura exacta.
</think>

```yaml
---
id: "CO-MAT-11-P4-derivadas-026-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivadas"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 26
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-16T00:44:08.741673"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretar propiedades de funciones a partir de su derivada
**Context:** Función de producción en empresa textil de Medellín

### Enunciado
Si f(x) = x⁵, ¿cuál es el valor de f'(x)?

### Options
- [ ] A) 5x⁵
- [ ] B) 5x⁴
- [x] C) 5x⁴ <!-- feedback: Por la regla de derivación de potencias, d/dx[xⁿ] = nxⁿ⁻¹, entonces d/dx[x⁵] = 5x⁴ -->
- [ ] D) x⁴

### Explicación Pedagógica
La respuesta correcta es C) porque se aplica la regla de derivación de potencias: "baja el exponente como coeficiente y reduce el exponente en uno". Los estudiantes frecuentemente cometen el error de solo bajar el exponente (opción A) o de olvidar completamente la aplicación de la regla (opción D).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Identificar el significado geométrico de la derivada
**Context:** Gráfica de temperatura en Bogotá durante un día

### Enunciado
Si la derivada de una función es cero en un punto, esto indica que en ese punto la gráfica de la función tiene

### Options
- [ ] A) Un punto de inflexión
- [x] B) Una recta tangente horizontal <!-- feedback: Cuando f'(a) = 0, la pendiente de la recta tangente es cero, lo que significa una recta tangente horizontal en (a, f(a)) -->
- [ ] C) Un máximo local
- [ ] D) Una raíz de la función

### Explicación Pedagógica
La respuesta correcta es B). Cuando f'(a) = 0, la pendiente de la recta tangente es cero, por lo tanto es horizontal. Un error común es confundir este concepto con la presencia de un máximo o mínimo (opción C), pero f'(a) = 0 es condición necesaria pero no suficiente para extremos locales. El punto de inflexión (opción A) requiere cambio de concavidad, no solo derivada cero.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Aplicar reglas básicas de derivación
**Context:** Crecimiento de una inversión en fintech colombiana

### Enunciado
Si g(t) = 3t² + 2t - 7, ¿cuál es el valor de g'(t)?

### Options
- [ ] A) 6t² + 2
- [ ] B) 3t² + 2
- [x] C) 6t + 2 <!-- feedback: Por la regla de derivación: la derivada de 3t² es 6t, de 2t es 2, y de -7 es 0. La derivada de una suma es la suma de las derivadas -->
- [ ] D) 6t - 5

### Explicación Pedagógica
La respuesta correcta es C). Un error frecuente entre estudiantes es derivar incorrectamente cada término: olvidar que 3t² se convierte en 6t (opción B), o agregar términos extra (opción A). La constante -7 tiene derivada cero.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicar reglas de derivación a funciones trigonométricas
**Context:** Modelo de oscilación en puente看一看 de Cali

### Enunciado
Si h(x) = sen(x), ¿cuál es h'(x)?

### Options
- [ ] A) cos(x)
- [x] B) cos(x) <!-- feedback: La derivada de sen(x) es cos(x), que es una de las derivadas fundamentales de las funciones trigonométricas -->
- [ ] C) -cos(x)
- [ ] D) -sen(x)

### Explicación Pedagógica
La respuesta correcta es B). La derivada de sen(x) es cos(x). Muchos estudiantes confunden esta relación con la derivada del coseno (que es -sen(x), opción D) o con la derivada de otra función trigonométrica. La opción C es el negativo del coseno, lo cual no corresponde a ninguna derivada trigonométrica básica estándar.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Aplicar la regla del producto
**Context:** Ingreso marginal en empresa de外卖 de Cartagena

### Enunciado
Si f(x) = x²·sen(x), ¿cuál es f'(x)?

### Options
- [ ] A) 2x·sen(x)
- [ ] B) x²·cos(x)
- [x] C) 2x·sen(x) + x²·cos(x) <!-- feedback: Por la regla del producto: (u·v)' = u'v + uv'. Aquí u = x², v = sen(x), entonces u' = 2x, v' = cos(x). Así: f'(x) = 2x·sen(x) + x²·cos(x) -->
- [ ] D) 2x·cos(x)

### Explicación Pedagógica
La respuesta correcta es C). El error más común es aplicar solo la derivada del primer factor (opción A) o solo del segundo factor (opción B). La regla del producto requiere derivar AMBOS factores y sumarlos. La opción D resulta de derivar el segundo factor como coseno pero mal del primero.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Aplicar la regla del cociente
**Context:** Tasa de variación del precio del dólar en Barranquilla

### Enunciado
Si k(x) = x/(x+1), ¿cuál es k'(x)?

### Options
- [ ] A) 1/(x+1)²
- [ ] B) 1
- [x] C) 1/(x+1)² <!-- feedback: Por la regla del cociente: (u/v)' = (u'v - uv')/v². Con u = x, v = x+1, u' = 1, v' = 1. Entonces: k'(x) = (1·(x+1) - x·1)/(x+1)² = 1/(x+1)² -->
- [ ] D) x/(x+1)²

### Explicación Pedagógica
La respuesta correcta es C). El error típico es restar en lugar de sumar en el numerador (obteniendo cero o un valor incorrecto) o escribir la derivada del numerador como cociente (opción D). El resultado simplificado 1/(x+1)² es correcto tras cancelar términos en el numerador.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Aplicar la regla de la cadena
**Context:** Propagación de un rumor en redes sociales en Colombia

### Enunciado
Si f(x) = (3x + 5)⁴, ¿cuál es f'(x)?

### Options
- [ ] A) 4(3x + 5)³
- [ ] B) 4(3x + 5)³·3
- [x] C) 12(3x + 5)³ <!-- feedback: Por la regla de la cadena: Si y = uⁿ, entonces dy/dx = n·uⁿ⁻¹·u'. Aquí u = 3x+5, n = 4, u' = 3. Entonces f'(x) = 4(3x+5)³·3 = 12(3x+5)³ -->
- [ ] D) 12x(3x + 5)³

### Explicación Pedagógica
La respuesta correcta es C). Un error frecuente es olvidar multiplicar por la derivada de la función interna (opción A). La opción B representa la derivada sin simplificar, pero el resultado final es 12(3x+5)³. La opción D muestra confusión al derivar el coeficiente de x.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Derivar funciones exponenciales
**Context:** Crecimiento poblacional en Medellín según Dane

### Enunciado
Si f(x) = e²ˣ, ¿cuál es f'(x)?

### Options
- [ ] A) e²ˣ
- [ ] B) 2e²ˣ
- [x] C) 2e²ˣ <!-- feedback: Por la regla de la cadena: Si f(x) = eᵘ donde u = 2x, entonces f'(x) = eᵘ·u' = e²ˣ·2 = 2e²ˣ. La derivada de eᵘ es eᵘ·u' -->
- [ ] D) 2xe²ˣ

### Explicación Pedagógica
La respuesta correcta es C). El error común es olvidar el factor 2 de la cadena interior (opción A) o confundir con la derivación de polinomios multiplicando por x (opción D). La derivada de e^(ax) es a·e^(ax).

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Interpretar el concepto de derivada marginal
**Context:** Costo de producción en empresa manufactureras de Bello, Antioquia

### Enunciado
En el contexto de funciones marginales, si C(q) representa el costo total de producir q unidades, entonces C'(q) representa

### Options
- [ ] A) El costo total de producir q unidades
- [x] B) El costo adicional de producir una unidad más <!-- feedback: La derivada marginal representa la tasa de cambio del costo respecto a la cantidad, es decir, el costo incremental de producir una unidad adicional -->
- [ ] C) El costo promedio por unidad
- [ ] D) La cantidad que maximiza el costo

### Explicación Pedagógica
La respuesta correcta es B). Este es un concepto fundamental en economía matemática. C'(q) indica cuánto aumenta el costo total cuando q aumenta en una unidad. La opción A describe C(q), no su derivada. La opción C se refiere al costo promedio C(q)/q. La opción D no tiene relación con la derivada.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Derivar funciones logarítmicas
**Context:** Medición de acidez en rio de Bogotá según resolución ambiental

### Enunciado
Si f(x) = ln(5x³), ¿cuál es f'(x)?

### Options
- [ ] A) 5/x
- [ ] B) 1/(5x³)
- [x] C) 3/x <!-- feedback: Usando propiedades de logaritmos: ln(5x³) = ln(5) + 3ln(x). La derivada de ln(5) es 0, y la derivada de 3ln(x) es 3/x. Alternativamente, por cadena: f'(x) = (1/(5x³))·15x² = 3/x -->
- [ ] D) 3ln(x)/x

### Explicación Pedagógica
La respuesta correcta es C). Un error frecuente es pensar que ln(5x³) = 5·ln(x³) = 15ln(x) (opción D), pero ln(ab) = ln(a) + ln(b), no a·ln(b). La opción A corresponde a ln(5x) sin el exponente 3. La opción B confunde la derivada del logaritmo con la función original.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v11`
**Bloom:** Apply
**ICFES:** Calcular derivadas implícitas
**Context:** Trayectoria de drone delivery en Bogotá

### Enunciado
Si 2x² + 3y² = 8, ¿cuál es dy/dx?

### Options
- [ ] A) -2x/(3y)
- [x] B) -2x/(3y) <!-- feedback: Derivando implícitamente respecto a x: 4x + 6y·(dy/dx) = 0. Despejando: dy/dx = -4x/(6y) = -2x/(3y) -->
- [ ] C) -3x/(2y)
- [ ] D) 4x/(6y)

### Explicación Pedagógica
La respuesta correcta es B). El error típico es invertir el cociente (opción C) o no simplificar correctamente (opción D, que es equivalente a la respuesta correcta pero no simplificada). Al derivar implícitamente, cualquier término con y requiere multiplicar por dy/dx por la regla de la cadena.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Analizar condiciones para extremos relativos
**Context:** Maximización de ganancia en negocio de café especial en Armenia

### Enunciado
Para la función f(x) = x³ - 3x² + 2, los puntos críticos se encuentran en

### Options
- [ ] A) x = 0 y x = 2
- [ ] B) x = 0 y x = 1
- [x] C) x = 0 y x = 2 <!-- feedback: Primero se encuentra f'(x) = 3x² - 6x. Igualando a cero: 3x² - 6x = 0 → 3x(x - 2) = 0 → x = 0 o x = 2. Los puntos críticos son donde f'(x) = 0 o no existe -->
- [ ] D) x = 1 y x = 2

### Explicación Pedagógica
La respuesta correcta es C). El error más común es factorizar incorrectamente: 3x² - 6x = 3x(x - 2), no 3x(x - 1). La opción B resulta de factorizar incorrectamente como 3x(x - 1). La opción D no corresponde a las raíces de f'(x).

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v13`
**Bloom:** Apply
**ICFES:** Usar el criterio de la segunda derivada
**Context:** Optimización de área en cultivo de flores en la Sabana de Bogotá

### Enunciado
Si f'(x) = 0 y f''(x) < 0 en x = a, entonces en x = a la función f tiene

### Options
- [ ] A) Un mínimo local
- [x] B) Un máximo local <!-- feedback: Según el criterio de la segunda derivada: si f'(a) = 0 y f''(a) < 0, entonces f tiene un máximo local en x = a. Esto indica que la gráfica es cóncava hacia abajo en ese punto -->
- [ ] C) Un punto de inflexión
- [ ] D) Ni máximo ni mínimo

### Explicación Pedagógica
La respuesta correcta es B). Un error frecuente es confundir el criterio de la segunda derivada: f''(a) < 0 indica concavidad hacia abajo (como una montaña), lo cual corresponde a un máximo. La opción A corresponde a f''(a) > 0. La opción C requiere cambio de signo de f'', no solo que sea negativo.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Calcular derivadas de orden superior
**Context:** Movimiento uniformemente acelerado de vehículo en ruta Bogotá-Villa de Leyva

### Enunciado
Si s(t) = 4t³ - 2t² + 3t representa la posición de un objeto, ¿cuál es su aceleración?

### Options
- [ ] A) 12t² - 4t
- [ ] B) 24t - 4
- [x] C) 24t - 4 <!-- feedback: La velocidad es v(t) = s'(t) = 12t² - 4t + 3. La aceleración es a(t) = v'(t) = s''(t) = 24t - 4. La segunda derivada de la posición es la aceleración -->
- [ ] D) 12t²

### Explicación Pedagógica
La respuesta correcta es C). Un error común es detenerse en la primera derivada (velocidad, opción A) o olvidar derivar algún término (opción B tiene el término -4 incompleto). La aceleración es la segunda derivada de la posición respecto al tiempo.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v15`
**Bloom:** Analyze
**ICFES:** Analizar razones de cambio relacionadas
**Context:** Llenado de tanque de agua en zona rural de Santander

### Enunciado
Un tanque cilíndrico de radio 2 metros se llena con agua a razón de 3 m³/min. ¿A qué razón cambia la altura del agua cuando la altura es 5 metros? (El volumen del cilindro es V = πr²h)

### Options
- [ ] A) 3/(4π) m/min
- [ ] B) 3/(20π) m/min
- [x] C) 3/(4π) m/min <!-- feedback: dV/dt = 3 m³/min. De V = 4πh (porque r = 2, r² = 4), tenemos dV/dt = 4π·dh/dt. Así: dh/dt = (dV/dt)/(4π) = 3/(4π) m/min -->
- [ ] D) 12π m/min

### Explicación Pedagógica
La respuesta correcta es C). El error más frecuente es no sustituir correctamente el valor del radio (r² = 4). La opción D resulta de multiplicar en lugar de dividir. La opción B resulta de usar h en el denominador incorrectamente. En problemas de razones relacionadas, se deben identificar variables dependientes e independientes.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Analizar comportamiento de funciones mediante derivadas
**Context:** Curva de demanda de pasajes aéreos a San Andrés

### Enunciado
Dada la función f(x) = x³ - 3x, ¿en qué intervalos es creciente?

### Options
- [ ] A) (-∞, -1) ∪ (1, ∞)
- [ ] B) (-1, 1)
- [x] C) (-∞, -1) ∪ (1, ∞) <!-- feedback: f'(x) = 3x² - 3 = 3(x² - 1). f'(x) > 0 cuando x² > 1, es decir, x < -1 o x > 1. En estos intervalos la función es creciente -->
- [ ] D) (-∞, -√3) ∪ (√3, ∞)

### Explicación Pedagógica
La respuesta correcta es C). El error común es resolver x² - 1 > 0 como -1 < x < 1, pero esto es incorrecto para desigualdades cuadráticas. Cuando x² > 1, x debe estar fuera del intervalo [-1, 1]. La gráfica de y = x² - 1 es una parábola que abre hacia arriba, así que es positiva fuera de sus raíces.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Evaluar optimalidad en problemas de aplicación
**Context:** Diseño de envase económico para producto de aguapanela boyacense

### Enunciado
Se desea construir una caja sin tapa con base cuadrada y volumen de 32 cm³. Si el lado de la base es x cm y la altura es h cm, ¿cuál es el valor de x que minimiza el material (área superficial)?

### Options
- [ ] A) 2 cm
- [ ] B) 4 cm
- [x] C) 4 cm <!-- feedback: Volumen: x²h = 32 → h = 32/x². Área: A = x² + 4xh = x² + 128/x. Derivando: A' = 2x - 128/x² = 0 → 2x³ = 128 → x³ = 64 → x = 4 cm -->
- [ ] D) 8 cm

### Explicación Pedagógica
La respuesta correcta es C). Los errores típicos incluyen: confundir las variables (usar h como lado de la base), omitir la relación del volumen al sustituir, o derivar incorrectamente x² + 128/x (olvidar que 128/x = 128x⁻¹). El segundo-error plausible es no verificar que es mínimo con la segunda derivada.

---

## Question 18 (Variant Basic - Difficulty D9)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Evaluar correctitud de procedimientos de derivación
**Context:** Análisis deerror en tarea de cálculo de estudiante de ingeniería en Barranquilla

### Enunciado
Un estudiante afirma que la derivada de f(x) = sen²(x) es f'(x) = 2sen(x). Al verificar, se concluye que esta afirmación es

### Options
- [ ] A) Correcta, porque la derivada de sen²(x) es 2sen(x)
- [x] B) Incorrecta, porque falta el factor cos(x) por la regla de la cadena <!-- feedback: f(x) = sen²(x) = (sen(x))². Por la regla de la cadena: f'(x) = 2·sen(x)·cos(x) = sen(2x). Falta el factor cos(x) correspondiente a la derivada de sen(x) -->
- [ ] C) Incorrecta, porque la derivada de sen²(x) es 2cos(x)
- [ ] D) Incorrecta, porque la derivada de sen²(x) es sen(2x)

### Explicación Pedagógica
La respuesta correcta es B). El error del estudiante es olvidar la derivada de la función interna sen(x). Al aplicar la regla de la cadena en (sen(x))², se debe multiplicar por cos(x). La opción C es incorrecta porque falta el factor sen(x). La opción D es correcta pero no indica el error específico. El distractor C confunde los factores.

---

## Question 19 (Variant Basic - Difficulty D10)

**ID:** `CO-MAT-11-P4-derivadas-026-MASTERY-v19`
**Bloom:** Create
**ICFES:** Resolver problemas complejos de optimización
**Context:** Ubicación óptima de antena de telecomunicaciones en región rural del Chocó

### Enunciado
Una empresa de telecomunicaciones debe conectar un punto A en una carretera recta a 3 km de una intersección B, con el punto C en otra carretera perpendicular a 4 km de la intersección. El costo de cable por tierra es $50,000 por km y por agua es $80,000 por km. Si el cable debe cruzar el río perpendicu larmente, ¿a qué distancia de B debe hacer el cruce para minimizar el costo?

### Options
- [ ] A) 1.5 km
- [ ] B) 2.0 km
- [x] C) 2.0 km <!-- feedback: Sea x la distancia de B al punto de cruce en la primera carretera. Costo = 50000√(9+x²) + 80000(4-x). Derivando e igualando a cero: 50000x/√(9+x²) - 80000 = 0 → 5x = 8√(9+x²) → 25x² = 64(9+x²) → 39x² = 576 → x ≈ 3.84
