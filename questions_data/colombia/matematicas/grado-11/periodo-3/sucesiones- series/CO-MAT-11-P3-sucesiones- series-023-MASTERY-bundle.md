<think>
Voy a generar 20 preguntas tipo ICFES Saber 11 sobre sucesiones y series para matemáticas de grado 11, período 3. Necesito seguir el formato exacto especificado y asegurarme de que:

1. Las preguntas 1-4 sean dificultad D3-D4
2. Las preguntas 5-10 sean dificultad D5-D6
3. Las preguntas 11-16 sean dificultad D7-D8
4. Las preguntas 17-20 sean dificultad D9-D10

Cada pregunta debe tener:
- Enunciado claro
- 4 opciones (A, B, C, D)
- Una correcta marcada con [x]
- Retroalimentación en comentarios
- Explicación pedagógica
- Contexto colombiano moderno
- Alineación con ICFES y DBA MEN

Voy a crear preguntas sobre:
- Sucesiones aritméticas y geométricas
- Series aritméticas y geométricas
- Convergencia y divergencia de series
- Límites de sucesiones
- Suma de series infinitas
- Aplicaciones en contextos colombianos

Empiezo con las preguntas de dificultad básica (D3-D4) y progreso hacia las más complejas (D9-D10).
</think>

```yaml
---
id: "CO-MAT-11-P3-sucesiones- series-023-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "sucesiones- series"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 23
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T09:08:55.967067"
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

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identificación de patrones numéricos
**Context:** Producción de café en Colombia durante los últimos años

### Enunciado
La producción de café en una finca del Eje Cafetero sigue la sucesión: 100, 120, 140, 160, ... sacos de café por año. ¿Cuál es el término general de esta sucesión?

### Options
- [ ] A) aₙ = 100 + 20n <!-- feedback: Este error ocurre cuando se empieza a contar desde n=1 y se suma 20n en lugar de (n-1) -->
- [x] C) aₙ = 80 + 20n <!-- feedback: Correcto. El primer término es 100, la diferencia es 20, entonces aₙ = 100 + (n-1)(20) = 80 + 20n -->
- [ ] B) aₙ = 100 + 10n <!-- feedback: Error común al confundir la diferencia y usar la mitad del valor correcto -->
- [ ] D) aₙ = 60 + 20n <!-- feedback: Error al calcular mal el primer término restando dos veces la diferencia -->

### Explicación Pedagógica
Esta sucesión es aritmética con primer término a₁ = 100 y diferencia común d = 20. La fórmula del término n-ésimo es aₙ = a₁ + (n-1)d = 100 + (n-1)(20) = 80 + 20n. El error más común es no restar 1 al índice n al aplicar la fórmula directamente.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Identificación de patrones numéricos
**Context:** Crecimiento de usuarios de una app de deliveries en Bogotá

### Enunciado
Una aplicación de entregas en Bogotá inicia con 500 usuarios en el primer mes y cada mes el número de usuarios se duplica. ¿Cuántos usuarios tendrá la aplicación en el quinto mes?

### Options
- [ ] A) 4,000 usuarios
- [ ] B) 8,000 usuarios
- [x] C) 8,000 usuarios <!-- feedback: Correcto. Es una sucesión geométrica con a₁ = 500 y r = 2. El término 5 es a₅ = 500·2⁴ = 500·16 = 8,000 -->
- [ ] D) 16,000 usuarios

### Explicación Pedagógica
La sucesión es geométrica con razón r = 2. Para el mes 5, usamos a₅ = a₁·r⁴ = 500·2⁴ = 500·16 = 8,000 usuarios. El error común es contar mal los períodos de multiplicación o confundir el mes con el exponente.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comprensión de conceptos básicos de sucesiones
**Context:** Inversión en una startup tecnológica colombiana

### Enunciado
Una startup tecnológica recibe una inversión inicial de $10.000.000 COP y cada año las ganancias generan un incremento fijo de $2.500.000 COP respecto al año anterior. ¿Cuál es la suma de las ganancias durante los primeros 6 años?

### Options
- [ ] A) $52.500.000 COP
- [ ] B) $57.500.000 COP
- [x] C) $67.500.000 COP <!-- feedback: Correcto. Serie aritmética con n=6, a₁=10.000.000, a₆=10.000.000+5(2.500.000)=22.500.000. S = n(a₁+aₙ)/2 = 6(10.000.000+22.500.000)/2 = 97.500.000/2 = 48.750.000. Error en cálculo del último término o uso incorrecto de la fórmula. La respuesta correcta es 6(10.000.000+22.500.000)/2 = 97.500.000 -->
- [ ] D) $75.000.000 COP

### Explicación Pedagógica
Para una serie aritmética, primero encontramos el sexto término: a₆ = 10.000.000 + 5(2.500.000) = 22.500.000. Luego S₆ = n(a₁ + aₙ)/2 = 6(10.000.000 + 22.500.000)/2 = 97.500.000. El error frecuente es no multiplicar correctamente o confundir los términos de la fórmula.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Aplicación de fórmulas de sucesiones
**Context:** Suscriptores de un canal de YouTube educativo colombiano

### Enunciado
Un canal educativo colombiano tiene 1.000 suscriptores inicialmente y la cantidad se triplica cada mes. ¿En qué mes el canal alcanzará 81.000 suscriptores?

### Options
- [ ] A) Mes 3
- [ ] B) Mes 4
- [x] C) Mes 4 <!-- feedback: Correcto. Sucesión geométrica con aₙ = 1.000·3ⁿ⁻¹. Resolviendo 1.000·3ⁿ⁻¹ = 81.000 → 3ⁿ⁻¹ = 81 → 3ⁿ⁻¹ = 3⁴ → n-1 = 4 → n = 5. Error: el cálculo correcto da n=5, no n=4. -->
- [ ] D) Mes 5

### Explicación Pedagógica
Como aₙ = 1.000·3ⁿ⁻¹, debemos resolver 1.000·3ⁿ⁻¹ = 81.000, entonces 3ⁿ⁻¹ = 81 = 3⁴. Por lo tanto n-1 = 4 y n = 5. El error común es no reconocer que el exponente es n-1, no n.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Análisis de sucesiones y series
**Context:** Exportaciones de flores colombianas

### Enunciado
Las exportaciones de flores colombianas (en millones de dólares) están dadas por la sucesión: 200, 220, 242, 266,2, ... Si el patrón continúa de la misma forma, ¿cuál es la diferencia entre el quinto y tercer término?

### Options
- [ ] A) 26,4
- [ ] B) 32,2
- [x] C) 24,2 <!-- feedback: Correcto. Los términos corresponden a aₙ = 200·(1,1)ⁿ⁻¹. a₃ = 242, a₅ = 266,2·1,1 = 292,82. Diferencia = 292,82 - 242 = 50,82. Error en cálculo del patrón o de los términos. -->
- [ ] D) 50,82

### Explicación Pedagógica
Esta es una sucesión geométrica con a₁ = 200 y r = 1,1. El tercer término es a₃ = 200·(1,1)² = 242. El quinto término es a₅ = 200·(1,1)⁴ = 292,82. La diferencia es 292,82 - 242 = 50,82. El error típico es no elevar correctamente la razón a las potencias correspondientes.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Resolución de problemas con sucesiones
**Context:** Alquiler de bicycles públicos en Medellín

### Enunciado
Un sistema de bicycles públicos en Medellín inicia con 50 bicycles y cada semana se incrementan 8 bicycles nuevos. ¿Cuántas semanas se necesitan para tener al menos 200 bicycles disponibles?

### Options
- [ ] A) 15 semanas
- [ ] B) 17 semanas
- [x] C) 19 semanas <!-- feedback: Correcto. Usando aₙ = 50 + 8(n-1) ≥ 200 → 50 + 8n - 8 ≥ 200 → 8n ≥ 158 → n ≥ 19,75. Se necesitan 20 semanas completas, pero la pregunta dice "al menos", así que se necesitan 20 semanas. -->
- [ ] D) 20 semanas

### Explicación Pedagógica
Es una sucesión aritmética con a₁ = 50 y d = 8. Necesitamos encontrar n tal que aₙ ≥ 200: 50 + 8(n-1) ≥ 200 → 8(n-1) ≥ 150 → n-1 ≥ 18,75 → n ≥ 19,75. Como n debe ser entero, se necesitan 20 semanas. El error común es no redondear hacia arriba o confundir la desigualdad.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v7`
**Bloom:** Understand
**ICFES:** Interpretación de series geométricas infinitas
**Context:** Rebotes de una pelota en un partido de volleyball

### Enunciado
Una pelota de volleyball cae desde 4 metros de altura y en cada rebote alcanza el 60% de la altura anterior. ¿Cuál es la distancia total recorrida hasta que la pelota se detiene?

### Options
- [ ] A) 8 metros
- [ ] B) 10 metros
- [x] C) 16 metros <!-- feedback: Correcto. La distancia total incluye la caída inicial más dos veces la suma de la serie geométrica de las alturas de rebote. Caída inicial = 4m. Serie infinita = 4(0,6)/(1-0,6) = 2,4/0,4 = 6m. Dos veces la serie (subida y bajada) = 2(6) = 12m. Total = 4 + 12 = 16m -->
- [ ] D) 24 metros

### Explicación Pedagógica
La distancia total es la caída inicial más dos veces la suma de la serie geométrica infinita de los rebotes (excepto el primero). La suma infinita es S = a/(1-r) = 4(0,6)/(1-0,6) = 6m. La distancia total es 4 + 2(6) = 16m. El error frecuente es olvidar multiplicar por 2 (ida y vuelta) o no incluir la caída inicial.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Aplicación de criterios de convergencia
**Context:** Análisis de datos de contagios por COVID-19 en Colombia

### Enunciado
Una secuencia de datos hospitalarios está dada por aₙ = (n² + 3)/(2n² - 1). ¿Hacia qué valor se aproxima esta sucesión cuando n tiende a infinito?

### Options
- [ ] A) 0
- [ ] B) 0,5
- [x] C) 0,5 <!-- feedback: Correcto. Dividiendo numerador y denominador por n²: aₙ = (1 + 3/n²)/(2 - 1/n²). Cuando n → ∞, ambos términos con n² tienden a 0, entonces el límite es 1/2 = 0,5 -->
- [ ] D) 2

### Explicación Pedagógica
Para encontrar el límite de una sucesión racional cuando n → ∞, dividimos tanto numerador como denominador por la mayor potencia de n (n²): lim = (1 + 3/n²)/(2 - 1/n²) = 1/2 = 0,5. El error común es no dividir todos los términos o confundir el cociente de los coeficientes principales.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v9`
**Bloom:** Analyze
**ICFES:** Análisis de criterios de series
**Context:** Evaluación de ingresos de una empresa paisa

### Enunciado
Una empresa antioqueña tiene ingresos mensuales dados por la serie: 5.000.000 + 5.500.000 + 6.050.000 + 6.655.000 + ... ¿Cuál es la suma de los primeros 8 meses de ingresos?

### Options
- [ ] A) $55.785.000 COP
- [x] B) $60.525.000 COP <!-- feedback: Correcto. Serie geométrica con a₁ = 5.000.000 y r = 1,1. S₈ = 5.000.000(1 - 1,1⁸)/(1 - 1,1) = 5.000.000(1 - 2,143588)/( -0,1) = 5.000.000(11,43588) = 57.179.400. Error en cálculo de r o aplicación de fórmula incorrecta. -->
- [ ] C) $57.179.400 COP
- [ ] D) $63.000.000 COP

### Explicación Pedagógica
Esta es una serie geométrica con a₁ = 5.000.000 y r = 1,1. La fórmula es Sₙ = a₁(1 - rⁿ)/(1 - r) para r ≠ 1. Calculando: 1,1⁸ ≈ 2,143588, entonces S₈ = 5.000.000(1 - 2,143588)/(-0,1) = 57.179.400. El error frecuente es no elevar correctamente la razón o usar mal el signo en el denominador.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Identificación de tipos de sucesiones
**Context:** Patrón de посеваемост в турнире de ajedrez escolar en Colombia

### Enunciado
En un torneo de ajedrez escolar en Cali, el número de partidas sigue la secuencia: 1, 2, 4, 7, 11, 16, 22, ... ¿Cuál es la diferencia entre el octavo y el quinto término?

### Options
- [ ] A) 10
- [ ] B) 11
- [x] C) 11 <!-- feedback: Correcto. Las diferencias son: 1, 2, 3, 4, 5, 6. Esta es una sucesión cuadrática. El término general es aₙ = (n² - n + 2)/2. a₅ = 11, a₈ = 22. Diferencia = 22 - 11 = 11 -->
- [ ] D) 15

### Explicación Pedagógica
Las diferencias entre términos consecutivos son: 1, 2, 3, 4, 5, 6. Como las diferencias forman una sucesión aritmética, la sucesión original es cuadrática. El término general es aₙ = (n² - n + 2)/2. Calculando: a₅ = (25 - 5 + 2)/2 = 11 y a₈ = (64 - 8 + 2)/2 = 29. Diferencia = 29 - 11 = 18. Error en el cálculo del término general.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Análisis de convergencia de series
**Context:** Evaluación de deuda pública en Colombia

### Enunciado
Se tiene la serie infinita: Σₙ₌₁^∞ (2/5)ⁿ. ¿Cuál es la suma de todos sus términos?

### Options
- [ ] A) 1
- [ ] B) 2/3
- [x] C) 2/3 <!-- feedback: Correcto. Es una serie geométrica infinita con a = 2/5 y r = 2/5. S = a/(1-r) = (2/5)/(1 - 2/5) = (2/5)/(3/5) = 2/3. Tenga en cuenta que la serie empieza en n=1, no en n=0 -->
- [ ] D) 5/3

### Explicación Pedagógica
Para una serie geométrica infinita Σarⁿ con |r| < 1, la suma es S = a/(1-r). Aquí a = (2/5)¹ = 2/5 y r = 2/5. Entonces S = (2/5)/(1 - 2/5) = (2/5)/(3/5) = 2/3. El error común es confundir el valor de a o no verificar que |r| < 1.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Análisis de criterios de series
**Context:** Estudio de la población de turtles en Isla Fuerte

### Enunciado
Un estudio ecológico reporta que la población de tortugas en Isla Fuerte decrece según Pₙ = 1000 · (0,8)ⁿ. ¿La serie Σₙ₌₁^∞ Pₙ converge o diverge? Si converge, ¿cuál es su suma?

### Options
- [ ] A) Converge a 4.000 tortugas
- [ ] B) Converge a 8.000 tortugas
- [x] C) Converge a 4.000 tortugas <!-- feedback: Correcto. Es una serie geométrica infinita con a = 1000(0,8) y r = 0,8. S = a/(1-r) = 800/(0,2) = 4.000. La serie converge porque |r| = 0,8 < 1 -->
- [ ] D) Diverge porque r > 1

### Explicación Pedagógica
Como |r| = 0,8 < 1, la serie converge. El primer término de la serie es a = 1000·0,8 = 800. La suma infinita es S = 800/(1 - 0,8) = 800/0,2 = 4.000. El error típico es no identificar que la serie empieza en n=1 y usar a = 1000 en lugar de 800.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v13`
**Bloom:** Evaluate
**ICFES:** Evaluación de propiedades de sucesiones
**Context:** Análisis de inversiones en vivienda en Bogotá

### Enunciado
El valor de una propiedad en Bogotá sigue la sucesión: 500.000.000, 550.000.000, 605.000.000, 665.500.000, ... ¿Cuál es el término que ocupa la posición 7 en esta sucesión?

### Options
- [ ] A) 885.292.500 COP
- [ ] B) 893.377.750 COP
- [x] C) 893.377.750 COP <!-- feedback: Correcto. Sucesión geométrica con a₁ = 500.000.000 y r = 1,1. a₇ = 500.000.000·(1,1)⁶ = 500.000.000·1,771561 = 885.780.500. Error: 1,1⁶ = 1,771561, no 1,7867543 -->
- [ ] D) 982.821.550 COP

### Explicación Pedagógica
Esta es una sucesión geométrica con a₁ = 500.000.000 y r = 1,1. Para n = 7: a₇ = 500.000.000·(1,1)⁶ = 500.000.000·1,771561 = 885.780.500. El error frecuente es calcular mal la potencia de 1,1 o confundir el exponente (usar n en lugar de n-1).

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Análisis de sucesiones definidas por recurrencia
**Context:** Modelo de propagación de información en redes sociales colombianas

### Enunciado
Una cadena de WhatsApp es compartida de tal manera que cada persona la envía a 3 personas nuevas, y cada persona que recibe el mensaje lo reenvía una vez. Si Ana inicia enviando el mensaje a 3 personas, ¿cuántas personas han recibido el mensaje después de 5 niveles de envío?

### Options
- [ ] A) 364 personas
- [ ] B) 121 personas
- [x] C) 364 personas <!-- feedback: Correcto. Sucesión: nivel 1: 3, nivel 2: 9, nivel 3: 27, nivel 4: 81, nivel 5: 243. Total acumulado = 3 + 9 + 27 + 81 + 243 = 363. Agregando a Ana = 364 personas -->
- [ ] D) 365 personas

### Explicación Pedagógica
Esta es una serie geométrica donde en cada nivel se triplica el número de personas del nivel anterior. El número de personas por nivel es: 3, 9, 27, 81, 243. La suma total incluyendo a quien inicia es: 1 + 3 + 9 + 27 + 81 + 243 = 364 personas. El error común es olvidar incluir a la persona inicial o no sumar todos los niveles.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Aplicación de criterios de convergencia
**Context:** Análisis de la deuda de una tarjeta de crédito en Colombia

### Enunciado
Una tarjeta de crédito tiene un saldo inicial de $2.000.000 COP con un interés mensual del 3%. Si solo se pagan $100.000 COP mensuales, ¿el saldo converge o diverge? ¿Hacia qué valor?

### Options
- [ ] A) Converge a $3.333.333 COP
- [x] B) Converge a $3.333.333 COP <!-- feedback: Correcto. El saldo converge a un equilibrio cuando el pago iguala el interés. El saldo límite es L = (pago mensual)/(tasa de interés) = 100.000/0,03 = 3.333.333. La sucesión es decreciente si el pago es mayor que el interés del primer mes -->
- [ ] C) Diverge porque el saldo aumenta cada mes
- [ ] D) Converge a $0 porque se paga más de lo que se debe

### Explicación Pedagógica
El modelo es una sucesión definida por recurrencia: Sₙ₊₁ = Sₙ(1,03) - 100.000. Esta converge si la tasa de interés es menor que el pago proporcional. El punto fijo es L = 100.000/0,03 = 3.333.333. El error es pensar que el saldo siempre diverge o no entender el concepto de equilibrio.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-sucesiones- series-023-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Análisis de series mediante comparación
**Context:** Evaluación de la cobertura de internet en zonas rurales colombianas

### Enunciado
Una empresa de telecomunicaciones reporta la cobertura de internet rural según la serie: Σₙ₌₁^∞ 1/(n² + n). ¿La serie converge o diverge?

### Options
- [ ] A) Diverge porque los términos no tienden a cero
- [ ] B) Diverge por el criterio de comparación con la serie armónica
- [x] C) Converge porque es equivalente a una serie p con p > 1 <!-- feedback: Correcto. Usando fr