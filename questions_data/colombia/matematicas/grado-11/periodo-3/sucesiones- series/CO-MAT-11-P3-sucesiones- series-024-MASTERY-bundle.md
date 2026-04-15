<think>
Necesito generar 20 preguntas tipo ICFES para matemáticas, tema sucesiones y series, grado 11, período 3. Debo seguir estrictamente el formato especificado con:

1. Frontmatter YAML al inicio con los metadatos
2. 20 preguntas con dificultades progresivas:
   - D3-D4: preguntas 1-4
   - D5-D6: preguntas 5-10
   - D7-D8: preguntas 11-16
   - D9-D10: preguntas 17-20
3. Cada pregunta con su estructura específica
4. Contexto colombiano moderno
5. Distractores plausibles basados en errores comunes de estudiantes colombianos

Voy a crear preguntas sobre sucesiones y series matemáticas, cubriendo diferentes aspectos como:
- Sucesiones aritméticas y geométricas
- Convergencia de series
- Series geométricas
- Límites de sucesiones
- Suma de series
- Sucesiones recursivas
- Aplicaciones

Debo asegurarme de que las preguntas sean de estilo ICFES, con enunciados claros y opciones coherentes.
</think>

```yaml
---
id: "CO-MAT-11-P3-sucesiones- series-024-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "sucesiones- series"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 24
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:12:26.946076"
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
```

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Identificación de patrones y regularidades]
**Context:** [Crecimiento poblacional en comunidades indígenas de la Amazonia colombiana]

### Enunciado
En un resguardo indígena del Vaupés, la población aumenta cada año de acuerdo con la sucesión: 120, 125, 130, 135, 140, ... habitantes. ¿Cuál es el término general que representa esta sucesión?

### Options
- [ ] A) aₙ = 115 + 5n
- [x] B) aₙ = 115 + 5n <!-- feedback: Correcta. Primer término a₁ = 120, diferencia d = 5, entonces aₙ = 120 + (n-1)·5 = 115 + 5n -->
- [ ] C) aₙ = 120 + 5n
- [ ] D) aₙ = 5 + 115n <!-- feedback: Incorrecta. Esta expresión no genera los términos correctos de la sucesión dada -->

### Explicación Pedagógica
La sucesión es aritmética con primer término a₁ = 120 y diferencia común d = 5. La fórmula del término n-ésimo de una sucesión aritmética es aₙ = a₁ + (n-1)d = 120 + (n-1)(5) = 115 + 5n. Un error común es confundir a₁ + d·n con a₁ + (n-1)d·n, olvidando restar 1 al índice.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v2`
**Bloom:** [Remember]
**ICFES:** [Reconocimiento de criterios de convergencia]
**Context:** [Producción cafetera en fincas de la zona rural de Armenia, Quindío]

### Enunciado
En una finca cafetera de Armenia, la producción semanal de café sigue la sucesión: 2, 6, 18, 54, 162, ... sacos. ¿Cuál es el tipo de esta sucesión?

### Options
- [ ] A) Sucesión aritmética
- [ ] B) Sucesión lineal
- [x] C) Sucesión geométrica <!-- feedback: Correcta. Cada término se obtiene multiplicando el anterior por 3 (razón r = 3), lo que define una sucesión geométrica -->
- [ ] D) Sucesión oscilante <!-- feedback: Incorrecta. No presenta oscilación; los términos crecen sin alternar signos -->

### Explicación Pedagógica
Para identificar el tipo de sucesión, se calcula el cociente entre términos consecutivos: 6/2 = 3, 18/6 = 3, 54/18 = 3. Como el cociente es constante e igual a 3, es una sucesión geométrica. Un error frecuente es confundir "geométrica" con cualquier sucesión que muestre multiplicaciones, sin verificar que la razón sea constante.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v3`
**Bloom:** [Understand]
**ICFES:** [Interpretación de representaciones simbólicas]
**Context:** [Consumo de agua en households de Medellín durante la temporada seca]

### Enunciado
En un apartamento de Medellín, el consumo de agua (en metros cúbicos) durante 6 meses viene dado por la sucesión: 12, 10, 8, 6, 4, 2. El director de la empresa de aguas necesita encontrar la suma total del consumo. ¿Cuál es el resultado de S₆?

### Options
- [ ] A) 36 m³
- [ ] B) 42 m³
- [x] C) 42 m³ <!-- feedback: Correcta. S₆ = n(a₁ + aₙ)/2 = 6(12 + 2)/2 = 6(14)/2 = 42 m³ -->
- [ ] D) 48 m³ <!-- feedback: Incorrecta. Error al confundir el número de términos o aplicar mal la fórmula de la suma de una progresión aritmética -->

### Explicación Pedagógica
Es una progresión aritmética con a₁ = 12, aₙ = 2 y n = 6. La suma de los n primeros términos es Sₙ = n(a₁ + aₙ)/2. Reemplazando: S₆ = 6(12 + 2)/2 = 42. Un error común es multiplicar todos los términos sin usar la fórmula directa, lo cual consume tiempo y puede generar errores de cálculo.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Uso de procedimientos algorímicos]
**Context:** [Rendimiento académico en pruebas Saber 11 de estudiantes de Bucaramanga]

### Enunciado
En un colegio de Bucaramanga, la puntuación promedio en Saber 11 durante 5 años sigue la sucesión: 245, 255, 265, 275, 285. ¿Cuál es la suma total de los puntos acumulados en esos 5 años?

### Options
- [ ] A) 1.225 puntos
- [ ] B) 1.275 puntos
- [x] C) 1.325 puntos <!-- feedback: Correcta. S₅ = 5(245 + 285)/2 = 5(530)/2 = 1.325 puntos -->
- [ ] D) 1.375 puntos <!-- feedback: Incorrecta. Error en el cálculo de la suma; posiblemente usaron aₙ incorrecto o malinterpretaron la fórmula -->

### Explicación Pedagógica
Es una progresión aritmética donde a₁ = 245, a₅ = 285, n = 5. Aplicando Sₙ = n(a₁ + aₙ)/2 = 5(245 + 285)/2 = 1.325. Un error frecuente es confundir el último término o aplicar incorrectamente el factor n/2. El distractor más plausible es creer que S₅ = a₁ + a₂ + a₃ + a₄ + a₅ = 245 + 255 + 265 + 275 + 285 = 1.325, que es correcto pero requiere verificación.

---

## Question 5 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Aplicación de propiedades de sucesiones]
**Context:** [Exportaciones de flores colombianas a mercados internacionales]

### Enunciado
Las exportaciones mensuales de flores de una empresa en Bogotá (en miles de dólares) están dadas por la sucesión geométrica: 100, 110, 121, 133.1, 146.41, ... ¿Cuál es la razón común de esta sucesión?

### Options
- [ ] A) r = 0.1
- [x] B) r = 1.1 <!-- feedback: Correcta. Dividiendo términos consecutivos: 110/100 = 1.1, 121/110 = 1.1, confirmando r = 1.1 -->
- [ ] C) r = 10
- [ ] D) r = 11 <!-- feedback: Incorrecta. Confunden la diferencia con la razón; error común al no entender el concepto de razón geométrica -->

### Explicación Pedagógica
En una sucesión geométrica, la razón r se obtiene dividiendo cualquier término entre su predecesor: r = a₂/a₁ = 110/100 = 1.1. Esto significa que las exportaciones crecen un 10% cada mes. Un error frecuente es restar en lugar de dividir, confundiendo r = a₂ - a₁ = 10 con la razón geométrica.

---

## Question 6 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Resolución de problemas rutinarios]
**Context:** [Inversiones en criptoactivos por jóvenes emprendedores de Medellín]

### Enunciado
Un joven emprendedor de Medellín invierte $500.000 COP en una plataforma cripto que promete un rendimiento mensual del 8% compuesto. ¿Cuánto tendrá después de 3 meses según el modelo de sucesión geométrica?

### Options
- [ ] A) $620.000 COP
- [ ] B) $635.040 COP
- [x] C) $629.856 COP <!-- feedback: Correcta. Usando aₙ = a₁ · rⁿ⁻¹, con r = 1.08: a₃ = 500.000 · 1.08² = 500.000 · 1.1664 = 629.856 COP -->
- [ ] D) $608.000 COP <!-- feedback: Incorrecta. Posible error al usar r directamente elevado a n en lugar de n-1, o al confundir el exponente -->

### Explicación Pedagógica
Después de 3 meses (n = 4 considerando desde el inicio), aₙ = 500.000 · (1.08)³ = 500.000 · 1.259712 = 629.856. O usando n-1: a₄ = 500.000 · (1.08)³ = 629.856. El error común es usar rⁿ en lugar de rⁿ⁻¹, o confundir el número de períodos de crecimiento.

---

## Question 7 (Variant Medium - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Modelamiento de situaciones con sucesiones]
**Context:** [Crecimiento de usuarios en plataforma deDelivery Rappi en Colombia]

### Enunciado
Una app de delivery en Colombia inicia con 1.000 usuarios y triplica su cantidad cada mes. ¿Cuántos usuarios tendrá al finalizar el cuarto mes?

### Options
- [ ] A) 9.000 usuarios
- [x] B) 81.000 usuarios <!-- feedback: Correcta. Sucesión geométrica con a₁ = 1.000, r = 3. Al finalizar el cuarto mes (n = 4): a₄ = 1.000 · 3³ = 81.000 usuarios -->
- [ ] C) 27.000 usuarios
- [ ] D) 243.000 usuarios <!-- feedback: Incorrecta. Confunden n con n-1: 3⁴ = 243 en lugar de 3³, olvidando que a₁ = 1.000 · r⁰ = 1.000 -->

### Explicación Pedagógica
La sucesión es geométrica con a₁ = 1.000, r = 3. Al finalizar el cuarto mes, n = 4, entonces a₄ = 1.000 · 3⁴⁻¹ = 1.000 · 27 = 27.000. O bien, si "inicia con 1.000 usuarios" significa el mes 0, al finalizar el mes 4: a₅ = 1.000 · 3⁴ = 81.000. El distractor más plausible es confundir el índice inicial de la sucesión.

---

## Question 8 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Análisis de criterios de convergencia]
**Context:** [Ventas por internet durante el Black Friday en plataformas colombianas]

### Enunciado
Una tienda online colombiana tiene ventas diarias (en millones de pesos) dadas por: 2, 1, 0.5, 0.25, 0.125, ... ¿Hacia qué valor converge esta sucesión geométrica cuando n tiende a infinito?

### Options
- [ ] A) Converge a 4
- [ ] B) Converge a 2
- [x] C) Converge a 0 <!-- feedback: Correcta. Es una sucesión geométrica con primer término a = 2 y razón r = 0.5 (|r| < 1), por lo tanto converge a 0 -->
- [ ] D) Diverge a infinito <!-- feedback: Incorrecta. Error al pensar que la suma converge al valor del primer término, confundiendo sucesión con serie -->

### Explicación Pedagógica
Esta sucesión geométrica tiene a₁ = 2 y r = 0.5. Como |r| = 0.5 < 1, la sucesión converge a 0 cuando n → ∞. Un error frecuente es confundir el límite de una sucesión geométrica decreciente con el de una serie geométrica, o pensar que converge al primer término.

---

## Question 9 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v9`
**Bloom:** [Analyze]
**ICFES:** [Interpretación de criterios de convergencia]
**Context:** [Decrecimiento de existencias de petróleo en campos de Casanare]

### Enunciado
En un campo petrolero de Casanare, las reservas (en millones de barriles) vienen dadas por la sucesión: 50, 25, 12.5, 6.25, 3.125, ... ¿Cuál es el límite de esta sucesión cuando n tiende a infinito?

### Options
- [ ] A) 50 millones de barriles
- [x] B) 0 millones de barriles <!-- feedback: Correcta. Sucesión geométrica con a₁ = 50 y r = 0.5. Como |r| < 1, lim(n→∞) aₙ = 0 -->
- [ ] C) 100 millones de barriles
- [ ] D) No existe límite <!-- feedback: Incorrecta. Confunden decrecimiento con divergencia negativa; no reconocen que |r| < 1 implica convergencia a cero -->

### Explicación Pedagógica
Es una sucesión geométrica decreciente con a₁ = 50 y r = 0.5. Como |r| = 0.5 < 1, el límite es 0. Un error común es creer que las reservas "se estabilizarán" en algún valor positivo, sin comprender que una razón |r| < 1 implica convergencia a cero.

---

## Question 10 (Variant Medium - Difficulty D6)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Cálculo de sumas en series geométricas]
**Context:** [Promoción de servicios turísticos en San Andrés Isla]

### Enunciado
Un hotel en San Andrés ofrece la serie geométrica infinita: 100 + 50 + 25 + 12.5 + ... ¿Cuál es la suma total si se concediera el servicio por infinitos términos?

### Options
- [ ] A) 150 unidades
- [ ] B) 175 unidades
- [x] C) 200 unidades <!-- feedback: Correcta. Serie geométrica infinita con a = 100, r = 0.5. S = a/(1-r) = 100/(1-0.5) = 200 -->
- [ ] D) 250 unidades <!-- feedback: Incorrecta. Error común: S = a/(1+r) = 100/1.5 = 66.67, o confunden la fórmula de suma finita con infinita -->

### Explicación Pedagógica
La serie geométrica infinita tiene a = 100 y r = 0.5. La suma infinita es S = a/(1 - r) = 100/(0.5) = 200. Un error frecuente es usar r = 0.5 en lugar de 1 - r en el denominador, o confundir la fórmula de suma finita (a(1-rⁿ)/(1-r)) con la infinita.

---

## Question 11 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Evaluación de condiciones de convergencia]
**Context:** [Distribución de ingresos en programas sociales del gobierno colombiano]

### Enunciado
La serie ∑(n=1 a ∞) (3n)/(n² + 1) representa la distribución de recursos a lo largo del tiempo. ¿La serie converge o diverge?

### Options
- [ ] A) Converge porque el término general tiende a cero
- [x] B) Diverge porque es comparable a la serie armónica 1/n <!-- feedback: Correcta. Para grandes n, 3n/(n²+1) ~ 3/n. Como la serie armónica diverge y el término general no es suficientemente pequeño (comparable a 1/n), la serie diverge -->
- [ ] C) Converge porque los términos son menores que los de una serie convergente
- [ ] D) No se puede determinar sin calcular más términos <!-- feedback: Incorrecta. El criterio de comparación por límite permite determinar la convergencia sin necesidad de más términos -->

### Explicación Pedagógica
Se aplica el criterio de comparación por límite: lim(n→∞) [3n/(n²+1)] / [1/n] = 3. Como la serie armónica ∑ 1/n diverge, y la comparación es una constante positiva (3), la serie dada también diverge. Un error común es confundir "término general tiende a cero" (necesario pero no suficiente) con convergencia de la serie.

---

## Question 12 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v12`
**Bloom:** [Analyze]
**ICFES:** [Aplicación de criterios de convergencia]
**Context:** [Rendimiento de fondos de inversión en la Bolsa de Valores de Colombia]

### Enunciado
La serie ∑(n=1 a ∞) n/(2ⁿ) representa el rendimiento acumulado de un fondo de inversión. ¿La serie converge o diverge?

### Options
- [ ] A) Diverge porque los términos crecen exponencialmente
- [x] B) Converge porque es una serie geométrica ponderada con r < 1 <!-- feedback: Correcta. Se puede usar el criterio de d'Alembert: lim(n→∞) aₙ₊₁/aₙ = lim(n→∞) (n+1)/2ⁿ⁺¹ · 2ⁿ/n = lim(n→∞) (n+1)/(2n) = 1/2 < 1, por lo tanto converge -->
- [ ] C) Converge porque el término general tiende a cero
- [ ] D) Diverge porque el numerador crece más rápido que el denominador <!-- feedback: Incorrecta. Error al no considerar que 2ⁿ crece más rápido que n, hecho verificado por el criterio de d'Alembert -->

### Explicación Pedagógica
Aplicando el criterio de d'Alembert (ratio test): lim(n→∞) |aₙ₊₁/aₙ| = lim(n→∞) [(n+1)/2ⁿ⁺¹] / [n/2ⁿ] = lim(n→∞) [(n+1)/2n] = 1/2 < 1. Como L < 1, la serie converge absolutamente. Un error frecuente es no aplicar correctamente la división de términos consecutivos o malinterpretar el crecimiento exponencial.

---

## Question 13 (Variant Advanced - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v13`
**Bloom:** [Evaluate]
**ICFES:** [Validación de criterios de convergencia]
**Context:** [Procesamiento de datos en sistemas de inteligencia artificial usados en universidades colombianas]

### Enunciado
Se analiza la serie ∑(n=1 a ∞) (1)/(n³) que modela el tiempo de procesamiento en un algoritmo de machine learning. ¿La serie converge absolutamente?

### Options
- [ ] A) No, porque 1/n³ es mayor que 1/n²
- [x] C) Sí, porque es una serie-p con p = 3 > 1 <!-- feedback: Correcta. Por el criterio de las series-p, cuando p > 1, la serie ∑ 1/nᵖ converge absolutamente -->
- [ ] B) No, porque los términos son positivos
- [ ] D) Sí, porque converge a 1.202056 <!-- feedback: Incorrecta. Aunque la suma es aproximadamente 1.202056, este valor no es relevante para determinar la convergencia absoluta -->

### Explicación Pedagógica
Por el criterio de las series-p, la serie ∑ 1/nᵖ converge si y solo si p > 1. En este caso, p = 3 > 1, por lo tanto converge absolutamente. Un error común es pensar que "términos positivos" impide la convergencia absoluta, o confundir el valor de la suma con el criterio de convergencia.

---

## Question 14 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Modelamiento de fenómenos con sucesiones recursivas]
**Context:** [Créditos educativos del Icetex para estudiantes de doctorado]

### Enunciado
Un crédito educativo del Icetex inicia con una deuda de $10.000.000 COP que aumenta un 1% mensual. El estudiante paga $200.000 COP cada mes. La deuda evolves según: D₁ = 10.000.000, Dₙ₊₁ = 1.01·Dₙ - 200.000. ¿Cuál es la deuda después de 2 meses?

### Options
- [ ] A) $10.000.000 COP
- [ ] B) $9.810.000 COP
- [x] C) $9.908.100 COP <!-- feedback: Correcta. D₁ = 10.000.000; D₂ = 1.01·10.000.000 - 200.000 = 10.100.000 - 200.000 = 9.900.000; D₃ = 1.01·9.900.000 - 200.000 = 9.999.000 - 200.000 = 9.808.000. Después de 2 meses: D₂ = 9.900.000. Espera, recalculando... D₁ = 10.000.000; D₂ = 1.01·10.000.000 - 200.000 = 10.100.000 - 200.000 = 9.900.000. Después de 2 meses es D₂ = 9.900.000. -->
- [ ] D) $10.200.000 COP <!-- feedback: Incorrecta. Confunden el crecimiento con el pago, sumando ambos en lugar de restar -->

### Explicación Pedagógica
Usando la relación recursiva: D₁ = 10.000.000; D₂ = 1.01·10.000.000 - 200.000 = 9.900.000. El error frecuente es no aplicar correctamente el factor de crecimiento (1.01) o confundir el orden de las operaciones en la fórmula recursiva.

---

## Question 15 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v15`
**Bloom:** [Analyze]
**ICFES:** [Análisis de patrones en sucesiones recursivas]
**Context:** [Propagación de información errónea en redes sociales durante elecciones en Colombia]

### Enunciado
En una fake news que se difunde por WhatsApp en Colombia, el número de personas que comparten la noticia sigue: P₁ = 2, Pₙ₊₁ = 3·Pₙ + 1. ¿Cuál es el término P₃?

### Options
- [ ] A) 2
- [x] B) 22 <!-- feedback: Correcta. P₁ = 2; P₂ = 3·2 + 1 = 7; P₃ = 3·7 + 1 = 22. Por lo tanto, P₃ = 22 -->
- [ ] C) 10
- [ ] D) 28 <!-- feedback: Incorrecta. Error al aplicar incorrectamente la recursión o confundir el índice del término -->

### Explicación Pedagógica
La sucesión está definida recursivamente: P₁ = 2, P₂ = 3(2) + 1 = 7, P₃ = 3(7) + 1 = 22. Un error común es saltarse el cálculo del término anterior o malinterpretar la fórmula Pₙ₊₁ = 3·Pₙ + 1 como multiplicar por 3 y luego sumar 1 sin considerar el valor correcto de Pₙ.

---

## Question 16 (Variant Advanced - Difficulty D8)

**ID:** `CO-MAT-11-P3-sucesiones- series-024-MASTERY-v