---
id: "AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "distribucion-normal"
periodo: "weekly"
week: "W26"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "NAP Argentina 2026 / Aprender"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Distribución Normal - Grado 11

Este bundle introduce la distribución normal, el concepto de estandarización (puntaje Z) y el cálculo de probabilidades bajo la curva, aplicados a contextos argentinos.

---

## Question 1 [D3-D4]
**Contexto:** Un profesor de estadística de la Universidad de Buenos Aires explica las propiedades de la campana de Gauss.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Clase universitaria teórica.
**Expected_Success:** 0.88

### Enunciado
¿Cuál es el valor del área total bajo la curva de una distribución normal?

### Opciones
- [ ] A) 0,5 <!-- feedback: Incorrecto. Este es el área a un solo lado de la media. -->
- [x] B) 1 <!-- feedback: Correcto. Como representa la probabilidad total de todo el espacio muestral, el área es 1. -->
- [ ] C) 100 <!-- feedback: Incorrecto. La probabilidad máxima es 1 (o 100%). -->
- [ ] D) Depende de la desviación estándar. <!-- feedback: Incorrecto. Sin importar la forma, el área total siempre es la unidad. -->

### Explicacion Pedagogica
La curva normal es una función de densidad de probabilidad. Por definición, la integral de cualquier función de densidad sobre todo su dominio debe ser igual a 1.

---

## Question 2 [D3-D4]
**Contexto:** Se analiza la distribución de las estaturas de los hombres adultos en Argentina, que sigue una distribución normal con media μ y desviación estándar σ.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Datos biométricos poblacionales.
**Expected_Success:** 0.85

### Enunciado
¿Qué porcentaje aproximado de los datos se encuentra en el intervalo [μ - σ, μ + σ]?

### Opciones
- [ ] A) 50% <!-- feedback: Incorrecto. Este es el porcentaje entre el primer y tercer cuartil en otras distribuciones, o a un lado de la media. -->
- [x] B) 68% <!-- feedback: Correcto. Según la regla empírica, aproximadamente el 68,2% de los datos cae a una desviación estándar de la media. -->
- [ ] C) 95% <!-- feedback: Incorrecto. Esto corresponde a dos desviaciones estándar. -->
- [ ] D) 99,7% <!-- feedback: Incorrecto. Esto corresponde a tres desviaciones estándar. -->

### Explicacion Pedagogica
La regla empírica o regla 68-95-99,7 describe los porcentajes de datos que caen dentro de 1, 2 y 3 desviaciones estándar de la media en una distribución normal.

---

## Question 3 [D3-D4]
**Contexto:** Para poder usar las tablas de probabilidad, es necesario transformar una variable X ~ N(μ, σ) en una variable Z ~ N(0, 1).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Estandarización de variables.
**Expected_Success:** 0.82

### Enunciado
¿Cuál es la fórmula correcta para calcular el puntaje Z (o tipificación)?

### Opciones
- [ ] A) Z = (μ - x) / σ <!-- feedback: Incorrecto. El orden de la resta es importante. -->
- [x] B) Z = (x - μ) / σ <!-- feedback: Correcto. Restamos la media para centrar en cero y dividimos por la desviación para ajustar la escala. -->
- [ ] C) Z = x - μ / σ <!-- feedback: Incorrecto. Falta el paréntesis, el orden de operaciones sería erróneo. -->
- [ ] D) Z = (x - σ) / μ <!-- feedback: Incorrecto. Se divide por la desviación, no por la media. -->

### Explicacion Pedagogica
Estandarizar permite comparar datos de distintas distribuciones normales. Z indica cuántas desviaciones estándar se encuentra un valor x por encima (positivo) o por debajo (negativo) de la media.

---

## Question 4 [D3-D4]
**Contexto:** Se observa una distribución normal estándar Z ~ N(0, 1).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Propiedades de la normal estándar.
**Expected_Success:** 0.80

### Enunciado
¿Cuál es el valor de la probabilidad P(Z < 0)?

### Opciones
- [ ] A) 0 <!-- feedback: Incorrecto. Hay datos menores a la media. -->
- [x] B) 0,5 <!-- feedback: Correcto. Por simetría, la mitad de los datos están a la izquierda de la media (que es 0). -->
- [ ] C) 1 <!-- feedback: Incorrecto. Esa es la probabilidad total. -->
- [ ] D) -0,5 <!-- feedback: Incorrecto. La probabilidad nunca puede ser negativa. -->

### Explicacion Pedagogica
La distribución normal es perfectamente simétrica respecto a su media. En la normal estándar, la media es 0, por lo que el 50% del área está por debajo de 0 y el 50% por encima.

---

## Question 5 [D5-D6]
**Contexto:** En una fábrica de piezas automotrices de Córdoba, la longitud de un perno sigue una distribución normal con media 10 cm y desviación estándar 0,2 cm.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Control de calidad industrial.
**Expected_Success:** 0.75

### Enunciado
¿Cuál es el puntaje Z de un perno que mide 10,4 cm?

### Opciones
- [ ] A) 0,4 <!-- feedback: Incorrecto. Olvidó dividir por la desviación estándar. -->
- [x] B) 2 <!-- feedback: Correcto. Z = (10,4 - 10) / 0,2 = 0,4 / 0,2 = 2. -->
- [ ] C) -2 <!-- feedback: Incorrecto. El valor es mayor que la media, el puntaje debe ser positivo. -->
- [ ] D) 1 <!-- feedback: Incorrecto. No surge del cálculo. -->

### Explicacion Pedagogica
Aplicamos Z = (x - μ) / σ. El valor de 10,4 está a 0,4 cm de la media. Como cada desviación es de 0,2 cm, el valor está a exactamente 2 desviaciones estándar por encima de la media.

---

## Question 6 [D5-D6]
**Contexto:** Las notas de un examen de ingreso en una facultad de Rosario se distribuyen normalmente con media 65 y desviación 10.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Evaluación académica masiva.
**Expected_Success:** 0.72

### Enunciado
¿Qué puntaje Z le corresponde a un alumno que sacó 50?

### Opciones
- [ ] A) 1,5 <!-- feedback: Incorrecto. El valor es menor que la media, el puntaje debe ser negativo. -->
- [x] B) -1,5 <!-- feedback: Correcto. Z = (50 - 65) / 10 = -15 / 10 = -1,5. -->
- [ ] C) -15 <!-- feedback: Incorrecto. Olvidó dividir por la desviación estándar. -->
- [ ] D) -0,5 <!-- feedback: Incorrecto. Error en la resta o división. -->

### Explicacion Pedagogica
Z = (50 - 65) / 10 = -1,5. El signo negativo indica que el alumno obtuvo una calificación por debajo del promedio de la clase.

---

## Question 7 [D5-D6]
**Contexto:** Usando una tabla de distribución normal estándar, sabemos que P(Z < 1) ≈ 0,8413.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Uso de tablas de probabilidad.
**Expected_Success:** 0.70

### Enunciado
¿Cuál es la probabilidad P(Z > 1)?

### Opciones
- [x] A) 0,1587 <!-- feedback: Correcto. P(Z > 1) = 1 - P(Z < 1) = 1 - 0,8413 = 0,1587. -->
- [ ] B) 0,8413 <!-- feedback: Incorrecto. Esta es la probabilidad de ser menor. -->
- [ ] C) -0,8413 <!-- feedback: Incorrecto. La probabilidad no es negativa. -->
- [ ] D) 0,5 <!-- feedback: Incorrecto. No corresponde a este valor de Z. -->

### Explicacion Pedagogica
La probabilidad de que Z sea mayor que un valor se calcula restando de 1 (el total) la probabilidad de que sea menor (el complemento).

---

## Question 8 [D5-D6]
**Contexto:** La duración de las lámparas LED producidas en Santa Fe sigue una distribución normal con media 1000 horas y desviación estándar 100 horas.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Vida útil de productos tecnológicos.
**Expected_Success:** 0.74

### Enunciado
Si una lámpara tiene un puntaje Z = 0, ¿cuántas horas duró?

### Opciones
- [ ] A) 0 horas <!-- feedback: Incorrecto. Z=0 no significa valor cero de la variable. -->
- [x] B) 1000 horas <!-- feedback: Correcto. Un puntaje Z de 0 corresponde exactamente al valor de la media aritmética. -->
- [ ] C) 1100 horas <!-- feedback: Incorrecto. Esto sería Z = 1. -->
- [ ] D) 900 horas <!-- feedback: Incorrecto. Esto sería Z = -1. -->

### Explicacion Pedagogica
Por definición de estandarización, el valor de la media (μ) siempre se mapea al valor 0 en la distribución normal estándar.

---

## Question 9 [D5-D6]
**Contexto:** En un estudio sobre el peso de las manzanas de exportación en Río Negro, se sabe que P(Z < 1,64) = 0,95.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v9
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Comercialización frutihortícola.
**Expected_Success:** 0.68

### Enunciado
Debido a la simetría de la campana, ¿a qué es igual la probabilidad P(Z > -1,64)?

### Opciones
- [ ] A) 0,05 <!-- feedback: Incorrecto. Esta es la probabilidad de ser menor a -1,64. -->
- [x] B) 0,95 <!-- feedback: Correcto. Por simetría, el área a la derecha de -1,64 es igual al área a la izquierda de 1,64. -->
- [ ] C) 0,45 <!-- feedback: Incorrecto. No surge de la propiedad de simetría directa. -->
- [ ] D) 0,50 <!-- feedback: Incorrecto. Este valor solo es para Z=0. -->

### Explicacion Pedagogica
La simetría de la curva normal implica que P(Z > -a) = P(Z < a). El área "de la cola izquierda" hacia el centro es igual al área "de la cola derecha" hacia el centro.

---

## Question 10 [D5-D6]
**Contexto:** Se comparan dos máquinas que envasan yerba mate. Ambas tienen media 500 g, pero la máquina A tiene σ = 5 g y la máquina B tiene σ = 10 g.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v10
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Envasado de productos de consumo masivo.
**Expected_Success:** 0.75

### Enunciado
Visualmente, ¿cómo se diferencia la campana de la máquina A respecto a la de la máquina B?

### Opciones
- [ ] A) La campana de A está más a la derecha. <!-- feedback: Incorrecto. Tienen la misma media, están centradas igual. -->
- [x] B) La campana de A es más alta y estrecha. <!-- feedback: Correcto. Menor desviación estándar significa que los datos están más concentrados cerca de la media. -->
- [ ] C) La campana de A es más baja y ancha. <!-- feedback: Incorrecto. Eso sería si tuviera mayor desviación estándar. -->
- [ ] D) No hay diferencia visual, todas las normales son iguales. <!-- feedback: Incorrecto. La forma depende críticamente de σ. -->

### Explicacion Pedagogica
La desviación estándar controla la "dispersión" o ancho de la campana. Una σ pequeña produce una campana leptocúrtica (picuda y estrecha), mientras que una σ grande produce una platicúrtica (achatada y ancha).

---

## Question 11 [D7-D8]
**Contexto:** En un psicotécnico realizado en Mendoza, los puntajes siguen una N(100, 15). Se considera "sobresaliente" a quien esté por encima del puntaje 130.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v11
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Selección de personal.
**Expected_Success:** 0.65

### Enunciado
Sabiendo que P(Z < 2) = 0,9772, ¿qué porcentaje de los aspirantes es "sobresaliente"?

### Opciones
- [ ] A) 97,72% <!-- feedback: Incorrecto. Este es el porcentaje que NO es sobresaliente. -->
- [x] B) 2,28% <!-- feedback: Correcto. 130 corresponde a Z = (130-100)/15 = 2. La prob. de ser mayor a Z=2 es 1 - 0,9772 = 0,0228 (2,28%). -->
- [ ] C) 5% <!-- feedback: Incorrecto. Valor aproximado pero no exacto según la tabla. -->
- [ ] D) 30% <!-- feedback: Incorrecto. No corresponde al cálculo de estandarización. -->

### Explicacion Pedagogica
Primero calculamos Z = 2. Luego, como buscamos a los que superan ese valor, calculamos el área a la derecha: 1 - 0,9772 = 0,0228. Multiplicamos por 100 para obtener el porcentaje.

---

## Question 12 [D7-D8]
**Contexto:** Se quiere calcular la probabilidad de que una variable normal estándar Z esté entre -1 y 1. Datos: P(Z < 1) = 0,8413.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Cálculo de probabilidad en intervalos centrales.
**Expected_Success:** 0.62

### Enunciado
¿Cuál es el valor de P(-1 < Z < 1)?

### Opciones
- [ ] A) 0,8413 <!-- feedback: Incorrecto. Este es el área desde el extremo izquierdo hasta 1. -->
- [x] B) 0,6826 <!-- feedback: Correcto. P(-1 < Z < 1) = P(Z < 1) - P(Z < -1). Como P(Z < -1) = 1 - 0,8413 = 0,1587, entonces 0,8413 - 0,1587 = 0,6826. -->
- [ ] C) 0,50 <!-- feedback: Incorrecto. Valor muy bajo para una desviación estándar completa. -->
- [ ] D) 0,3413 <!-- feedback: Incorrecto. Esta es solo la probabilidad entre 0 y 1. -->

### Explicacion Pedagogica
Para calcular P(a < Z < b) restamos F(b) - F(a). Por simetría, el área fuera del intervalo [-1, 1] es dos veces la cola externa: 2 * 0,1587 = 0,3174. El área interna es 1 - 0,3174 = 0,6826.

---

## Question 13 [D7-D8]
**Contexto:** El tiempo de descarga de una app en Buenos Aires se distribuye normalmente. Se sabe que el 95% de las veces la descarga tarda menos de 10 segundos (Z ≈ 1,64) y la media es de 8 segundos.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Telecomunicaciones y experiencia de usuario.
**Expected_Success:** 0.60

### Enunciado
¿Cuál es la desviación estándar de los tiempos de descarga?

### Opciones
- [ ] A) 2 segundos <!-- feedback: Incorrecto. Esa es la diferencia absoluta (x - μ). -->
- [x] B) 1,22 segundos <!-- feedback: Correcto. De Z = (x - μ) / σ despejamos σ = (x - μ) / Z = (10 - 8) / 1,64 ≈ 1,219. -->
- [ ] C) 0,82 segundos <!-- feedback: Incorrecto. Error en el despeje de la fórmula. -->
- [ ] D) 3,28 segundos <!-- feedback: Incorrecto. Multiplicó en lugar de dividir. -->

### Explicacion Pedagogica
Usamos la fórmula de estandarización para hallar un parámetro desconocido. Despejando: σ = (x - μ) / Z. Reemplazando: (10 - 8) / 1,64 = 1,219... ≈ 1,22.

---

## Question 14 [D7-D8]
**Contexto:** Se analizan los errores de medición de una balanza de precisión en un laboratorio de San Luis. Los errores siguen una N(0; 0,01).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Metrología y precisión de instrumentos.
**Expected_Success:** 0.58

### Enunciado
¿Cuál es la probabilidad de que el error sea mayor a 0,02 en valor absoluto (es decir, error > 0,02 o error < -0,02)? Dato: P(Z < 2) = 0,9772.

### Opciones
- [ ] A) 0,0228 <!-- feedback: Incorrecto. Esta es solo la probabilidad de la cola derecha. -->
- [x] B) 0,0456 <!-- feedback: Correcto. Z = 0,02 / 0,01 = 2. Buscamos las dos colas externas: 2 * (1 - 0,9772) = 2 * 0,0228 = 0,0456. -->
- [ ] C) 0,9544 <!-- feedback: Incorrecto. Esta es la probabilidad de que el error sea menor a 0,02. -->
- [ ] D) 0,05 <!-- feedback: Incorrecto. Valor aproximado pero no exacto según el dato. -->

### Explicacion Pedagogica
Buscamos P(|X| > 0,02), que equivale a las áreas externas a 2 desviaciones estándar. Como cada cola tiene 0,0228, el total es 0,0456.

---

## Question 15 [D7-D8]
**Contexto:** Un inversor en el Mercado de Valores de Buenos Aires sabe que el retorno mensual de una acción sigue una N(2%, 4%).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v15
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Inversiones financieras y riesgo.
**Expected_Success:** 0.55

### Enunciado
¿Cuál es la probabilidad de que en un mes determinado el inversor pierda dinero (retorno menor a 0%)? Dato: P(Z < 0,5) = 0,6915.

### Opciones
- [ ] A) 0,50 <!-- feedback: Incorrecto. La media es 2%, es más probable ganar que perder. -->
- [x] B) 0,3085 <!-- feedback: Correcto. Z = (0 - 2) / 4 = -0,5. P(Z < -0,5) = 1 - P(Z < 0,5) = 1 - 0,6915 = 0,3085. -->
- [ ] C) 0,6915 <!-- feedback: Incorrecto. Esta es la probabilidad de que el retorno sea menor a 4%. -->
- [ ] D) 0,1915 <!-- feedback: Incorrecto. No corresponde al cálculo de la cola. -->

### Explicacion Pedagogica
Perder dinero significa X < 0. Estandarizando: Z = (0 - 2) / 4 = -0,5. Por simetría, P(Z < -0,5) es igual a 1 - P(Z < 0,5). 1 - 0,6915 = 0,3085 (aprox 31%).

---

## Question 16 [D7-D8]
**Contexto:** En una distribución normal, el percentil 90 se encuentra a 1,28 desviaciones estándar de la media (Z = 1,28).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v16
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Relación entre percentiles y puntajes Z.
**Expected_Success:** 0.64

### Enunciado
¿A qué puntaje Z corresponde el percentil 10?

### Opciones
- [ ] A) 1,28 <!-- feedback: Incorrecto. Ese es el P90. -->
- [x] B) -1,28 <!-- feedback: Correcto. Debido a la simetría, si el 10% superior empieza en Z=1,28, el 10% inferior termina en Z=-1,28. -->
- [ ] C) 0 <!-- feedback: Incorrecto. Este es el percentil 50. -->
- [ ] D) -0,90 <!-- feedback: Incorrecto. El puntaje Z no es igual al porcentaje. -->

### Explicacion Pedagogica
La simetría de la distribución normal implica que los percentiles complementarios (10 y 90, 5 y 95, etc.) tienen puntajes Z de igual valor absoluto pero distinto signo.

---

## Question 17 [D9-D10]
**Contexto:** El consumo diario de agua por hogar en una ciudad patagónica sigue una distribución normal. Se sabe que el 10% de los hogares consume más de 600 litros y el 10% consume menos de 400 litros.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Gestión de servicios públicos.
**Expected_Success:** 0.52

### Enunciado
¿Cuál es el valor de la media (μ) y la desviación estándar (σ)? Dato: Z para el 10% superior es 1,28.

### Opciones
- [x] A) μ = 500, σ = 78,1 <!-- feedback: Correcto. Por simetría, la media está en el centro: (600+400)/2 = 500. Luego, 600 = 500 + 1,28*σ => 100 = 1,28*σ => σ = 100/1,28 = 78,125. -->
- [ ] B) μ = 500, σ = 100 <!-- feedback: Incorrecto. Olvidó el factor Z de 1,28. -->
- [ ] C) μ = 450, σ = 50 <!-- feedback: Incorrecto. La media no es 450 debido a la simetría de los porcentajes extremos. -->
- [ ] D) μ = 500, σ = 128 <!-- feedback: Incorrecto. Multiplicó mal los factores. -->

### Explicacion Pedagogica
Como el 10% superior e inferior están a la misma distancia de probabilidad, la media debe ser el promedio de los valores: 500. Luego usamos 600 = 500 + 1,28σ para hallar que σ ≈ 78,1.

---

## Question 18 [D9-D10]
**Contexto:** Un proceso de llenado de botellas de gaseosa en una planta de Buenos Aires está configurado para μ = 2000 ml y σ = 10 ml. El control de calidad rechaza botellas con menos de 1985 ml.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Optimización de procesos productivos.
**Expected_Success:** 0.48

### Enunciado
Si la empresa quiere que solo se rechace el 1% de las botellas (Z para 1% es -2,33), ¿a qué valor debe ajustar la media (μ) manteniendo la desviación en 10 ml?

### Opciones
- [ ] A) 2010 ml <!-- feedback: Incorrecto. Con este valor se rechazaría más del 1%. -->
- [x] B) 2008,3 ml <!-- feedback: Correcto. Queremos que 1985 corresponda a Z = -2,33. -2,33 = (1985 - μ) / 10 => -23,3 = 1985 - μ => μ = 1985 + 23,3 = 2008,3 ml. -->
- [ ] C) 2000 ml <!-- feedback: Incorrecto. Este es el valor actual donde se rechaza más. -->
- [ ] D) 1995,5 ml <!-- feedback: Incorrecto. Bajar la media aumentaría la cantidad de botellas vacías. -->

### Explicacion Pedagogica
Para reducir el desperdicio (rechazos), la empresa debe "alejar" el promedio del límite crítico. Calculamos el nuevo promedio necesario para que el límite de 1985 quede a 2,33 desviaciones estándar de la media.

---

## Question 19 [D9-D10]
**Contexto:** Se lanza una moneda equilibrada 400 veces. Queremos usar la aproximación de la Normal a la Binomial (μ = np, σ = √npq).

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v19
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Teorema de De Moivre-Laplace.
**Expected_Success:** 0.50

### Enunciado
¿Cuál es la probabilidad aproximada de obtener más de 210 caras? Dato: P(Z < 1) = 0,8413.

### Opciones
- [ ] A) 0,50 <!-- feedback: Incorrecto. 210 es mayor que la media (200). -->
- [x] B) 0,1587 <!-- feedback: Correcto. μ = 400*0,5 = 200. σ = √(400*0,5*0,5) = 10. Z = (210 - 200) / 10 = 1. P(Z > 1) = 1 - 0,8413 = 0,1587. -->
- [ ] C) 0,8413 <!-- feedback: Incorrecto. Esta es la probabilidad de obtener menos de 210. -->
- [ ] D) 0,0228 <!-- feedback: Incorrecto. Este sería el valor para Z=2. -->

### Explicacion Pedagogica
Para muestras grandes, la Binomial se aproxima a la Normal. Aquí μ=200 y σ=10. El valor 210 está a una desviación estándar de la media, por lo que buscamos el área de la cola derecha de Z=1.

---

## Question 20 [D9-D10]
**Contexto:** Un examen de admisión muy difícil tiene una distribución normal. Se sabe que la nota media es 40 y que solo el 2,28% de los alumnos supera los 70 puntos.

**ID:** AR-MAT-11-2026-W26-distribucion-normal-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Distribuciones de alto rendimiento.
**Expected_Success:** 0.45

### Enunciado
¿Cuál es la nota mínima para estar en el 15,87% de los mejores alumnos? Dato: Z para 2,28% superior es 2. Z para 15,87% superior es 1.

### Opciones
- [ ] A) 50 <!-- feedback: Incorrecto. Verifique el cálculo de la desviación estándar primero. -->
- [x] B) 55 <!-- feedback: Correcto. 70 = 40 + 2*σ => 30 = 2σ => σ = 15. Para el top 15,87% (Z=1): x = 40 + 1*15 = 55. -->
- [ ] C) 60 <!-- feedback: Incorrecto. Esto correspondería a un valor intermedio. -->
- [ ] D) 45 <!-- feedback: Incorrecto. Demasiado cerca de la media. -->

### Explicacion Pedagogica
Primero calculamos σ usando el dato del top 2,28% (Z=2), lo que nos da σ = 15. Luego aplicamos Z=1 para hallar el valor correspondiente al top 15,87%. x = 40 + 15 = 55.
