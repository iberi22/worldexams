---
id: "AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "intervalos-confianza"
periodo: "weekly"
week: "W28"
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

# Bundle MASTERY: Intervalos de Confianza - Grado 11

Este bundle introduce los conceptos de estimación puntual y por intervalos, nivel de confianza y margen de error, aplicados a situaciones del contexto argentino.

---

## Question 1 [D3-D4]
**Contexto:** Un analista en Buenos Aires realiza una encuesta de opinión y calcula que el 45% de la población aprueba una medida económica, con un margen de error del 3%.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Encuestas de opinión pública.
**Expected_Success:** 0.85

### Enunciado
¿Cuál es el intervalo de confianza que se desprende de estos datos?

### Opciones
- [ ] A) [45%, 48%] <!-- feedback: Incorrecto. El margen de error se aplica hacia ambos lados. -->
- [x] B) [42%, 48%] <!-- feedback: Correcto. El intervalo se construye restando y sumando el margen de error a la estimación puntual: 45 - 3 y 45 + 3. -->
- [ ] C) [44%, 46%] <!-- feedback: Incorrecto. Error en la amplitud del intervalo. -->
- [ ] D) [0%, 100%] <!-- feedback: Incorrecto. Este intervalo no aporta información útil. -->

### Explicacion Pedagogica
Un intervalo de confianza se expresa como (Estimación ± Margen de Error). Es el rango de valores dentro del cual se espera que se encuentre el verdadero parámetro poblacional.

---

## Question 2 [D3-D4]
**Contexto:** En un estudio sobre el ingreso promedio en una ciudad de Córdoba, se utiliza un nivel de confianza del 95%.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Interpretación de niveles de confianza.
**Expected_Success:** 0.82

### Enunciado
¿Qué significa técnicamente que el nivel de confianza sea del 95%?

### Opciones
- [ ] A) Que el 95% de las personas tienen ese ingreso. <!-- feedback: Incorrecto. El nivel de confianza se refiere al método de estimación, no a la distribución de la población. -->
- [x] B) Que si repitiéramos el muestreo muchas veces, el 95% de los intervalos calculados contendrían al verdadero promedio poblacional. <!-- feedback: Correcto. Es una medida de la fiabilidad del procedimiento estadístico. -->
- [ ] C) Que hay una probabilidad del 5% de que los datos sean falsos. <!-- feedback: Incorrecto. El 5% restante es el nivel de significancia (α), o probabilidad de error. -->
- [ ] D) Que el 95% de los datos de la muestra son correctos. <!-- feedback: Incorrecto. No tiene relación con la calidad individual de los datos. -->

### Explicacion Pedagogica
El nivel de confianza (1-α) representa la proporción de intervalos que, construidos bajo las mismas condiciones, capturarían efectivamente el parámetro de la población.

---

## Question 3 [D3-D4]
**Contexto:** Al calcular un intervalo de confianza para la media usando la distribución normal, se utiliza un valor crítico Z_α/2.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Parámetros de construcción de intervalos.
**Expected_Success:** 0.88

### Enunciado
¿Cuál es el valor aproximado de Z_α/2 para un nivel de confianza estándar del 95%?

### Opciones
- [ ] A) 1,28 <!-- feedback: Incorrecto. Este corresponde al 80% o 90% según el contexto. -->
- [ ] B) 1,64 <!-- feedback: Incorrecto. Este corresponde al 90% de confianza. -->
- [x] C) 1,96 <!-- feedback: Correcto. Es el valor crítico más utilizado en estadística para el nivel de confianza del 95%. -->
- [ ] D) 2,58 <!-- feedback: Incorrecto. Este corresponde al 99% de confianza. -->

### Explicacion Pedagogica
Para un nivel de confianza del 95%, el área central bajo la curva normal es 0,95, dejando 0,025 en cada cola. El valor Z que acumula 0,975 a su izquierda es aproximadamente 1,96.

---

## Question 4 [D3-D4]
**Contexto:** Un fabricante de bombillas en Santa Fe desea estimar la vida media de su producción.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Estimación puntual vs por intervalos.
**Expected_Success:** 0.80

### Enunciado
Si el fabricante dice: "El promedio de duración es de exactamente 1.200 horas", ¿qué tipo de estimación está realizando?

### Opciones
- [x] A) Estimación puntual <!-- feedback: Correcto. Proporciona un único valor numérico como mejor estimación del parámetro. -->
- [ ] B) Estimación por intervalos <!-- feedback: Incorrecto. No define un rango ni un nivel de confianza. -->
- [ ] C) Contraste de hipótesis <!-- feedback: Incorrecto. No está comparando dos afirmaciones ni tomando una decisión de aceptación/rechazo. -->
- [ ] D) Parámetro poblacional <!-- feedback: Incorrecto. Es una estimación basada en datos, no el valor real absoluto. -->

### Explicacion Pedagogica
La estimación puntual utiliza un estadístico muestral (como el promedio x̄) para dar un valor único del parámetro poblacional.

---

## Question 5 [D5-D6]
**Contexto:** Se comparan dos encuestas electorales en la provincia de Mendoza. La encuesta A usó una muestra de 400 personas y la encuesta B usó una muestra de 1.600 personas. Ambas usaron un nivel de confianza del 95%.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Relación entre muestra y precisión.
**Expected_Success:** 0.75

### Enunciado
¿Cómo será el margen de error de la encuesta B respecto a la A?

### Opciones
- [ ] A) El doble. <!-- feedback: Incorrecto. Aumentar la muestra reduce el error, no lo aumenta. -->
- [ ] B) La cuarta parte. <!-- feedback: Incorrecto. El error no baja linealmente con n. -->
- [x] C) La mitad. <!-- feedback: Correcto. Como el error es proporcional a 1/√n, al cuadruplicar n (de 400 a 1600), el error se reduce a la raíz de 4, es decir, a la mitad. -->
- [ ] D) Igual, porque el nivel de confianza es el mismo. <!-- feedback: Incorrecto. El error depende tanto de la confianza como del tamaño de muestra. -->

### Explicacion Pedagogica
El margen de error disminuye al aumentar el tamaño de la muestra siguiendo una relación inversamente proporcional a la raíz cuadrada de n. √(1600/400) = √4 = 2. El error baja a la mitad.

---

## Question 6 [D5-D6]
**Contexto:** Un investigador aumenta el nivel de confianza de su estudio del 95% al 99% sin cambiar el tamaño de la muestra.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Compromiso entre confianza y precisión.
**Expected_Success:** 0.70

### Enunciado
¿Qué sucede con la amplitud del intervalo de confianza?

### Opciones
- [x] A) El intervalo se vuelve más ancho (menos preciso). <!-- feedback: Correcto. Para tener más seguridad (confianza), debemos abarcar un rango mayor de valores posibles. -->
- [ ] B) El intervalo se vuelve más estrecho (más preciso). <!-- feedback: Incorrecto. Esto requeriría bajar la confianza o subir la muestra. -->
- [ ] C) El intervalo se mantiene igual. <!-- feedback: Incorrecto. Cambiar el nivel de confianza altera el valor crítico Z. -->
- [ ] D) Se reduce a la mitad. <!-- feedback: Incorrecto. No hay una relación de ese tipo entre los porcentajes de confianza. -->

### Explicacion Pedagogica
Existe una relación inversa entre precisión y confianza. Si queremos estar más seguros de que el intervalo contenga al parámetro, el "precio" a pagar es un intervalo más amplio y menos específico.

---

## Question 7 [D5-D6]
**Contexto:** En un control de peso de paquetes de harina en una fábrica de Rosario:
- n = 100 paquetes
- x̄ = 1002 g (promedio muestral)
- σ = 10 g (desviación estándar poblacional conocida)
- Confianza = 95% (Z = 1,96)

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Estimación de media en control de peso.
**Expected_Success:** 0.72

### Enunciado
¿Cuál es el margen de error de esta estimación? (Fórmula del error: E = Z * σ / √n)

### Opciones
- [ ] A) 10 g <!-- feedback: Incorrecto. No dividió por la raíz del tamaño de muestra. -->
- [x] B) 1,96 g <!-- feedback: Correcto. E = 1,96 * 10 / √100 = 1,96 * 10 / 10 = 1,96. -->
- [ ] C) 0,196 g <!-- feedback: Incorrecto. Error en la ubicación de la coma decimal. -->
- [ ] D) 19,6 g <!-- feedback: Incorrecto. Multiplicó por la desviación sin dividir por √n. -->

### Explicacion Pedagogica
E = 1,96 * (10 / 10) = 1,96. Esto significa que tenemos un 95% de confianza en que el verdadero peso promedio de todos los paquetes está entre 1000,04 g y 1003,96 g.

---

## Question 8 [D5-D6]
**Contexto:** Se realiza una encuesta a 1.000 personas en Salta sobre la aprobación de un nuevo festival. El 60% está a favor. Se usa un 95% de confianza (Z=1,96).

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Proporciones en encuestas sociales.
**Expected_Success:** 0.74

### Enunciado
¿Cuál es el error estándar de la proporción (SE = √[p(1-p)/n])?

### Opciones
- [x] A) 0,0155 <!-- feedback: Correcto. SE = √[0,6 * 0,4 / 1000] = √[0,24 / 1000] = √0,00024 ≈ 0,0155. -->
- [ ] B) 0,60 <!-- feedback: Incorrecto. Esta es la proporción p. -->
- [ ] C) 0,024 <!-- feedback: Incorrecto. Olvidó calcular la raíz cuadrada. -->
- [ ] D) 0,031 <!-- feedback: Incorrecto. Este sería el margen de error total (Z*SE), no el error estándar. -->

### Explicacion Pedagogica
El error estándar de una proporción mide la variabilidad esperada de p entre distintas muestras. En este caso es de aproximadamente 1,55 puntos porcentuales.

---

## Question 9 [D5-D6]
**Contexto:** Se determinó que el intervalo de confianza al 95% para la altura media de los pinos en un bosque de Neuquén es [12,4 m ; 14,2 m].

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Investigación forestal.
**Expected_Success:** 0.78

### Enunciado
¿Cuál fue el promedio muestral (x̄) utilizado para construir este intervalo?

### Opciones
- [ ] A) 14,2 m <!-- feedback: Incorrecto. Este es el límite superior. -->
- [ ] B) 12,4 m <!-- feedback: Incorrecto. Este es el límite inferior. -->
- [x] C) 13,3 m <!-- feedback: Correcto. El promedio muestral es el punto medio del intervalo: (12,4 + 14,2) / 2 = 26,6 / 2 = 13,3. -->
- [ ] D) 1,8 m <!-- feedback: Incorrecto. Esta es la amplitud total del intervalo. -->

### Explicacion Pedagogica
Debido a la simetría del intervalo de confianza para la media, el estimador puntual (promedio) siempre se ubica exactamente en el centro del rango obtenido.

---

## Question 10 [D5-D6]
**Contexto:** Un estudio sobre el gasto promedio en ferias barriales de CABA tiene un margen de error de $500 con un 90% de confianza.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v10
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Consumo en mercados locales.
**Expected_Success:** 0.72

### Enunciado
Si queremos reducir el margen de error a $250 manteniendo la misma confianza, ¿qué debemos hacer con la muestra?

### Opciones
- [ ] A) Reducirla a la mitad. <!-- feedback: Incorrecto. Menos muestra implica más error. -->
- [ ] B) Duplicarla. <!-- feedback: Incorrecto. Duplicar solo reduce el error por un factor de √2. -->
- [x] C) Cuadruplicarla. <!-- feedback: Correcto. Para reducir el error a la mitad, n debe multiplicarse por el cuadrado de 2, es decir, 4. -->
- [ ] D) Mantenerla igual pero cambiar de encuestador. <!-- feedback: Incorrecto. No afecta la precisión estadística teórica. -->

### Explicacion Pedagogica
Como el margen de error es inversamente proporcional a la raíz de n, reducir el error a la mitad requiere cuatro veces más datos.

---

## Question 11 [D7-D8]
**Contexto:** Un laboratorio de control de aguas en San Luis analiza la presencia de una sustancia. Toma una muestra de n = 16 mediciones. Dado que n es pequeño, el investigador duda entre usar Z o t de Student.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Muestras pequeñas y distribución t.
**Expected_Success:** 0.65

### Enunciado
¿En qué situación es OBLIGATORIO usar la distribución t de Student en lugar de la Normal (Z)?

### Opciones
- [x] A) Cuando la muestra es pequeña (n < 30) y no se conoce la desviación estándar poblacional (σ). <!-- feedback: Correcto. Al estimar σ con la desviación muestral (s) en muestras pequeñas, se introduce una incertidumbre extra que requiere la distribución t. -->
- [ ] B) Cuando la población no es normal. <!-- feedback: Incorrecto. Si la población es muy asimétrica, ni Z ni t funcionan bien para n pequeño. -->
- [ ] C) Siempre que el nivel de confianza sea mayor al 90%. <!-- feedback: Incorrecto. Z se usa para 95% o 99% si n es grande. -->
- [ ] D) Cuando se conoce el valor real de la media. <!-- feedback: Incorrecto. Si se conoce la media, no se necesita estimar un intervalo. -->

### Explicacion Pedagogica
La distribución t de Student se diseñó específicamente para realizar inferencias sobre la media cuando el tamaño de muestra es pequeño y se desconoce la variabilidad poblacional.

---

## Question 12 [D7-D8]
**Contexto:** Se quiere estimar el porcentaje de hogares con internet en un pueblo de 2.000 habitantes. El margen de error deseado es del 5% (0,05) con un 95% de confianza (Z=1,96).

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v12
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Cálculo de tamaño de muestra para proporciones.
**Expected_Success:** 0.60

### Enunciado
¿Cuál es el tamaño de muestra mínimo necesario si no tenemos información previa sobre la proporción (caso más desfavorable p=0,5)? Fórmula: n = (Z² * p * q) / E²

### Opciones
- [ ] A) 100 personas <!-- feedback: Incorrecto. No alcanza para un error del 5%. -->
- [x] B) 384 personas <!-- feedback: Correcto. n = (1,96² * 0,5 * 0,5) / 0,05² = (3,8416 * 0,25) / 0,0025 = 0,9604 / 0,0025 ≈ 384,16. -->
- [ ] C) 2.000 personas <!-- feedback: Incorrecto. Este sería el censo total, no una muestra. -->
- [ ] D) 768 personas <!-- feedback: Incorrecto. Calculó el doble de lo necesario. -->

### Explicacion Pedagogica
Aplicamos la fórmula de tamaño muestral para una proporción. El valor de 384 es un "estándar" en investigación social para trabajar con un 5% de error y 95% de confianza en poblaciones grandes.

---

## Question 13 [D7-D8]
**Contexto:** En una encuesta de boca de urna en una ciudad patagónica, la diferencia entre dos candidatos es del 2%, pero el margen de error de la encuesta es del 4%.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Interpretación de resultados electorales ajustados.
**Expected_Success:** 0.62

### Enunciado
¿Cómo se denomina técnicamente a esta situación?

### Opciones
- [ ] A) Victoria asegurada. <!-- feedback: Incorrecto. La diferencia es menor que el error. -->
- [ ] B) Fraude estadístico. <!-- feedback: Incorrecto. Es un resultado técnico válido. -->
- [x] C) Empate técnico. <!-- feedback: Correcto. Ocurre cuando la diferencia entre los candidatos es menor que el margen de error de la medición. -->
- [ ] D) Error de marco muestral. <!-- feedback: Incorrecto. No tiene que ver con la representatividad, sino con la precisión del estimador. -->

### Explicacion Pedagogica
En un empate técnico, estadísticamente no se puede afirmar que un candidato esté por encima del otro, ya que los intervalos de confianza de ambos se superponen significativamente.

---

## Question 14 [D7-D8]
**Contexto:** Se estimó el consumo promedio de carne por persona en un pueblo mediante un intervalo al 95%. Luego se calculó otro al 99% con los mismos datos.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v14
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Comparación de intervalos de diferente confianza.
**Expected_Success:** 0.68

### Enunciado
¿Cuál de las siguientes afirmaciones es SIEMPRE verdadera?

### Opciones
- [ ] A) El intervalo al 99% es más útil porque es más preciso. <!-- feedback: Incorrecto. Es más ancho, por lo tanto menos preciso. -->
- [x] B) El intervalo al 95% está totalmente contenido dentro del intervalo al 99%. <!-- feedback: Correcto. Como el valor crítico Z para 99% (2,58) es mayor que para 95% (1,96), los límites del 99% son siempre más externos. -->
- [ ] C) El promedio muestral cambia según la confianza elegida. <!-- feedback: Incorrecto. El promedio x̄ es independiente del nivel de confianza. -->
- [ ] D) El intervalo al 99% tiene la mitad de amplitud que el del 95%. <!-- feedback: Incorrecto. Es más grande, no más pequeño. -->

### Explicacion Pedagogica
Al aumentar el nivel de confianza, el multiplicador estadístico aumenta, lo que expande el intervalo hacia ambos lados partiendo del mismo centro (el promedio).

---

## Question 15 [D7-D8]
**Contexto:** Un intervalo de confianza para el precio de la soja en la bolsa de Rosario es [$420, $440].

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Economía agraria.
**Expected_Success:** 0.64

### Enunciado
¿Cuál es el margen de error relativo respecto a la media (porcentaje de error)?

### Opciones
- [ ] A) 10% <!-- feedback: Incorrecto. Este es el error respecto al valor inferior, no el relativo a la media. -->
- [x] B) 2,3% <!-- feedback: Correcto. Media = 430. Margen de error = 10. Error relativo = 10 / 430 ≈ 0,0232 = 2,32%. -->
- [ ] C) 4,6% <!-- feedback: Incorrecto. Dividió la amplitud total por la media, en lugar del margen de error. -->
- [ ] D) 5% <!-- feedback: Incorrecto. No surge del cálculo. -->

### Explicacion Pedagogica
El margen de error es la mitad de la amplitud del intervalo (20/2 = 10). El error relativo se calcula como el cociente entre el error y la media: 10/430 ≈ 0,023.

---

## Question 16 [D7-D8]
**Contexto:** Se quiere estimar la altura media de una población con un error máximo de 1 cm y un desvío estándar poblacional conocido de 5 cm. Se usa un 95% de confianza (Z=1,96).

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v16
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Cálculo de tamaño de muestra para medias.
**Expected_Success:** 0.58

### Enunciado
¿Cuál es el tamaño de muestra mínimo n? Fórmula: n = (Z * σ / E)²

### Opciones
- [ ] A) 25 personas <!-- feedback: Incorrecto. Olvidó el factor Z. -->
- [ ] B) 10 personas <!-- feedback: Incorrecto. Demasiado bajo para esa precisión. -->
- [x] C) 97 personas <!-- feedback: Correcto. n = (1,96 * 5 / 1)² = (9,8)² = 96,04. Redondeando al entero superior: 97. -->
- [ ] D) 384 personas <!-- feedback: Incorrecto. Este es para proporciones, no para esta media específica. -->

### Explicacion Pedagogica
Aplicamos la fórmula para el tamaño de muestra de una media. Requiere conocer el nivel de confianza, la variabilidad del fenómeno (σ) y el error tolerable (E).

---

## Question 17 [D9-D10]
**Contexto:** Un estadístico de la UNLP afirma: "En 95 de cada 100 muestras, el promedio muestral caerá dentro de 1,96 errores estándar de la media poblacional".

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Fundamentos teóricos de la inferencia.
**Expected_Success:** 0.52

### Enunciado
¿Es equivalente esta afirmación a la definición de un intervalo de confianza al 95% para la media?

### Opciones
- [x] A) Sí, es la interpretación correcta basada en la distribución muestral. <!-- feedback: Correcto. Es una forma alternativa de expresar que el intervalo [x̄ - E, x̄ + E] captura a μ con esa frecuencia. -->
- [ ] B) No, porque la media poblacional es la que se mueve, no los promedios muestrales. <!-- feedback: Incorrecto. La media poblacional es fija; los que varían son los resultados de las muestras. -->
- [ ] C) No, la probabilidad solo aplica a un intervalo ya calculado. <!-- feedback: Incorrecto. Una vez calculado, el intervalo contiene o no al parámetro (probabilidad 0 o 1); la probabilidad del 95% es previa al cálculo. -->
- [ ] D) Sí, pero solo si la muestra es mayor a 1.000 datos. <!-- feedback: Incorrecto. El concepto aplica a cualquier tamaño n donde la aproximación normal sea válida. -->

### Explicacion Pedagogica
La teoría de los intervalos de confianza se basa en el comportamiento de los estimadores a través de muchas muestras posibles. La distancia entre el estimador y el parámetro es simétrica.

---

## Question 18 [D9-D10]
**Contexto:** Se observa que al aumentar el tamaño de la muestra de n=100 a n=400, el intervalo de confianza se redujo de [45, 55] a [48, 52].

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Consistencia de estimadores.
**Expected_Success:** 0.55

### Enunciado
¿Es este resultado consistente con la teoría estadística?

### Opciones
- [ ] A) No, el centro del intervalo (promedio) debería ser el mismo. <!-- feedback: Incorrecto. El promedio puede variar ligeramente entre muestras. -->
- [x] B) Sí, porque la amplitud se redujo a la mitad (de 10 a 4) al cuadruplicar n. <!-- feedback: Correcto. Amplitud 1: 55-45=10. Amplitud 2: 52-48=4. 4 es menos de la mitad de 10, pero se aproxima a la reducción teórica por √4=2. -->
- [ ] C) No, la amplitud debería haberse reducido a la cuarta parte. <!-- feedback: Incorrecto. Se reduce con la raíz cuadrada, no linealmente. -->
- [ ] D) Sí, porque el nuevo intervalo es más grande. <!-- feedback: Incorrecto. El nuevo intervalo es más chico, no más grande. -->

### Explicacion Pedagogica
Al aumentar n, el error estándar disminuye, haciendo que el intervalo sea más "estrecho" y se concentre más cerca del valor real, mejorando la precisión de la estimación.

---

## Question 19 [D9-D10]
**Contexto:** Un analista dice: "Hay una probabilidad del 95% de que la media poblacional μ esté entre 10 y 20".

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Rigor en el lenguaje estadístico.
**Expected_Success:** 0.45

### Enunciado
¿Por qué muchos estadísticos consideran esta frase técnicamente imprecisa (aunque se use coloquialmente)?

### Opciones
- [ ] A) Porque la probabilidad debería ser del 100%. <!-- feedback: Incorrecto. No hay certezas absolutas en muestreo. -->
- [x] B) Porque μ es un valor fijo (no aleatorio), por lo que ya está o no está en el intervalo; la probabilidad se aplica al proceso de construcción. <!-- feedback: Correcto. La frase correcta es "El intervalo [10, 20] se construyó con un método que captura a μ el 95% de las veces". -->
- [ ] C) Porque el 95% es un valor demasiado bajo para ser ciencia. <!-- feedback: Incorrecto. Es el estándar científico habitual. -->
- [ ] D) Porque no se menciona el tamaño de la muestra. <!-- feedback: Incorrecto. No es el motivo principal de la crítica formal. -->

### Explicacion Pedagogica
En estadística clásica (frecuentista), el parámetro es una constante. Por lo tanto, no tiene sentido asignarle una probabilidad de "estar" en un rango fijo. La aleatoriedad reside en el intervalo mismo, que cambia con cada muestra.

---

## Question 20 [D9-D10]
**Contexto:** Se quiere comparar dos métodos para estimar el precio promedio de alquileres en Buenos Aires. El Método 1 tiene un sesgo conocido de +$5000 y un error estándar de $1000. El Método 2 no tiene sesgo pero su error estándar es de $8000.

**ID:** AR-MAT-11-2026-W28-intervalos-confianza-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Compromiso entre sesgo y varianza.
**Expected_Success:** 0.42

### Enunciado
Desde el punto de vista de la precisión y fiabilidad, ¿cuál método es preferible para construir un intervalo de confianza?

### Opciones
- [x] A) El Método 1, porque aunque está "corrido", sus estimaciones son muy consistentes y predecibles (baja varianza). <!-- feedback: Correcto. En estadística, a veces es preferible un poco de sesgo conocido con alta precisión que un estimador insesgado con una variabilidad enorme. -->
- [ ] B) El Método 2, porque la falta de sesgo es lo más importante en ciencia. <!-- feedback: Incorrecto. Un error de $8000 hace que el intervalo sea demasiado ancho para ser útil. -->
- [ ] C) El Método 2, porque el error estándar alto se cancela con el tiempo. <!-- feedback: Incorrecto. No se cancela, se mantiene la incertidumbre en cada medición. -->
- [ ] D) No se puede decidir sin saber cuántos departamentos se alquilan por mes. <!-- feedback: Incorrecto. Los datos dados son suficientes para evaluar la calidad de los estimadores. -->

### Explicacion Pedagogica
Este es el dilema "Sesgo-Varianza". Un intervalo estrecho aunque ligeramente desplazado suele ser más informativo que uno inmensamente ancho que no permite tomar decisiones prácticas.
