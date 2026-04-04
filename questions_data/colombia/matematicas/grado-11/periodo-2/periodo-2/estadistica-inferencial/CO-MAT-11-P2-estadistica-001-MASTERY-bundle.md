---
id: "CO-MAT-11-P2-estadistica-001-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 2
bundle_index: 4
modern_context: true
calibration:
  expected_success_rate: 0.48
  discrimination_index_target: ">= 0.27"
  simulated_responses: 100
rubric_baseline: "distribucion_normal, puntaje_z, margen_de_error, correlacion"
---

# Bundle Mastery: Estadística Inferencial

Este bundle introduce las bases de la inferencia estadística: cómo, a partir de una muestra representativa, podemos afirmar verdades sobre una población completa; modelado mediante la Campana de Gauss, intervalos de confianza básicos y relaciones correlacionales.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Razonamiento y Argumentación

### Enunciado
En estadística inferencial, ¿cuál es la diferencia fundamental entre una **Muestra** y una **Población**?

### Options
- [x] A) La población es el conjunto total a estudiar y la muestra es un subconjunto representativo de este. <!-- feedback: Correcto. Inferimos los parámetros de la primera observando los estadísticos de la segunda. -->
- [ ] B) La muestra es el conjunto total de personas, mientras que la población es el lugar geográfico. <!-- feedback: Error de definición conceptual básico. -->
- [ ] C) La población es siempre la que abarca datos cuantitativos y la muestra abarca características descriptivas cualitativas. <!-- feedback: Falso. Ambas abarcan todo tipo de datos y magnitudes. -->
- [ ] D) Son lo mismo. Sólo varían en el nombre. <!-- feedback: Incorrecto. Representan conceptos totalmente asimétricos frente al análisis investigador empírico. -->

### Explicación Pedagógica
Variables de Investigación. Definir claramente ambos conceptos es vital antes de entender por qué una encuesta puede fallar.

---

## Question 2 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Formulación y Ejecución

### Contexto
Para conocer las tendencias de votación presidencial de Colombia (población = 50 millones), una firma encuestadora entrevista a 1.500 ciudadanos eligiéndolos completamente al **azar** a lo largo del territorio nacional.

### Enunciado
¿Cuál es la función del **Aleatorizado estricto** en el diseño muestral?

### Options
- [ ] A) Acertar siempre. Omitir posibles votos dudosos al estar eligiendo perfiles nulos. <!-- feedback: Esto violaría la ley probabilística misma, que cuenta también a los indecisos y su porcentaje. -->
- [x] B) Evitar sesgos de selección. Permite que todos los grupos, edades o regiones tengan probabilidades matemáticas uniformes de modelar el total de la nación analizada. <!-- feedback: Correcto. La aleatoriedad garantiza -probabilísticamente- que la pequeña muestra en miniatura represente la diversidad macro original a medida que crezca. -->
- [ ] C) Lograr que la encuesta dure mucho menos seleccionando personas con el método más rápido en cada bloque barrial local de la sede de la empresa consultora. <!-- feedback: Incorrecto. Eso sería "Muestreo por Conveniencia", lo cual precisamente inyecta un sesgo local gigantecesco y destroza el valor inferencial. -->
- [ ] D) Generar más cantidad de datos puros que el censo poblacional real oficial. <!-- feedback: Matemáticamente absurdo; 1.500 encuestas no generarán jamás 'más' cantidad de mediciones tabuladas absolutas frente a 50 millones censales. -->

### Explicación Pedagógica
Muestras aleatorias y sesgos. El ICFES examina no sólo que el aspirante sepa computar fórmulas, sino que pueda demoler e impugnar gráficas mediáticas donde el tamaño n está sesgado groseramente.

---

## Question 3 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Contexto
La "Campana de Gauss" (Distribución Normal Estándar). En las pruebas Saber 11, las puntuaciones se acomodan estadísticamente para tener una **media ($\mu$) = 250** puntos, y una **desviación estándar ($\sigma$) = 50**.

### Enunciado
Según la regla empírica del $68 - 95 - 99.7$, ¿aproximadamente qué porcentaje de estudiantes obtuvieron entre **200 y 300** puntos en la prueba?

### Options
- [ ] A) $50\%$ <!-- feedback: Incorrecto. 50% abarca desde 0 puntos hasta la media (250). -->
- [x] B) $68\%$ <!-- feedback: Correcto. El intervalo (200, 300) es exactamente una (1) desviación estándar por encima y por debajo de la media [μ-1σ, μ+1σ], lo cual contiene casi al 68% central del universo poblacional campaniforme. -->
- [ ] C) $95\%$ <!-- feedback: Incorrecto. El 95% requiere dos desviaciones (150 a 350 puntos). -->
- [ ] D) $99.7\%$ <!-- feedback: Falso, representa las colas en la distribución a 3 sigmas. -->

### Explicación Pedagógica
Regla empírica normal. Capacidad de predecir volúmenes porcentuales usando desviaciones estándar como simple unidad de medida de distancias abstractas.

---

## Question 4 (Variant Intermediate - Difficulty 6)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Modelación

### Contexto
Un alumno sacó **350 puntos** en las pruebas Saber 11. Recordando que $\mu=250$ y $\sigma=50$.

### Enunciado
Calcular y definir el Puntaje Z (Z-Score) analítico del estudiante. ¿A cuántas unidades de distancia estandarizada del promedio quedó clasificado este sujeto empírico?

### Options
- [ ] A) Z = 50 porque le sobraron 100 puntos y se dividen en 2. <!-- feedback: Erróneo teóricamente el divisor y el sentido del score z paramétrico general univariado. -->
- [ ] B) Z = -2, lo cual significa que está dos desviaciones estandar por debajo del promedio. <!-- feedback: Incorrecto, fallaste en signos numéricos directos de la ecuación estandarizante $Z = (X-\mu)/\sigma$. -->
- [x] C) Z = +2. Es decir, superó la media nacional por exactamente **dos desviaciones estándar**. Es un rendimiento muy sobresaliente en la cola derecha. <!-- feedback: Correcto. Z = (350 - 250) / 50 = +100 / 50 = +2. Representa dónde te sitúas tú frente al resto del país. -->
- [ ] D) Z = 100 y equivale al porcentaje neto. <!-- feedback: Incorrecto, confunde diferencias algebraicas brutas en puntos naturales vs la conversión adimensional sigma-ratios de la Normal. -->

### Explicación Pedagógica
Escala Z y percentiles de estandarización. Una habilidad altísima es que los bachilleres integren y traduzcan unidades brutas de medida del experimento (puntos, kilos, dólares) a la "geometría pura gaussiana" para ranqueos.

---

## Question 5 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación

### Contexto
Una bebida afirma en su lata tener 330 ml de volumen. Al tomar una Muestra n=100 latas, hallas una media de 325 ml, con Desviación muestral pequeña. Calculas un **Intervalo de Confianza del 95%** que resulta ser: $(324 \text{ ml}, 326 \text{ ml})$.

### Enunciado
¿Cuál de las siguientes es una correcta deducción analítico-inferencial al leer el dato entre paréntesis finales resultantes de tu experimento paramétrico con esa confianza dada?

### Options
- [ ] A) Tienes 95% de seguridad de que la próxima lata individual única del mundo que escojas vendrá rellena con entre 324 o 326 mililitros si no te percatas. <!-- feedback: Erróneo de plano; el intervalo acota DÓNDE está la "media global verdadera", no es garantía del relleno individual azaroso y físico futuro de un objeto al azar probabilísticamente volátil simple. -->
- [ ] B) Que el 95% del total de absolutamente todas las gaseosas vendidas llenaron de bebida 325 mililitros invariablemente purísimos siempre por igual casi. <!-- feedback: Afirmación determinista-fantástica, niega de frente todo axioma lógico de varianza natural industrial dispersa per se implícita estadística inherente obligatoriamente. -->
- [x] C) Que podemos estar 95% seguros de que el "**Promedio Verdadero (Poblacional)**" o $\mu_{real}$ en mililitros de relleno de la fábrica entera mundial, sí recae e interactúa cautivo matemáticamente contenido dentro de la envoltura (324, 326). La aseveración del fabricante "330 ml" luce errada. <!-- feedback: Correcto. Traduces impecable. "Apostamos o arriesgamos nulo casi, en declarar que la Media Absoluta Universal Genuina reside encerrada ahí." Y 330 no pertenece a nuestro intervalo deducido validado fuerte. -->
- [ ] D) Confirmas con absoluta seguridad legal garantista e inquebrantable rotunda a la policía que su etiqueta dice en 100% afirmaciones lícitas legales verdaderamente perfectas totales puras. <!-- feedback: Absurda semántica, el intervalo marca entre 324-326, donde $330$ no cae por ningún lado. Adicionalmente ignora perimetralmente el ratio de "error" remanente 5%. -->

### Explicación Pedagógica
Interpretación de Intervalos de Confianza (95%). Nivel D7-D8 ICFES. Poder desarmar promesas engañosas corporativas modelando su verdadera capacidad media de varianza.

---

## Question 10 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v10`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentación (Pensamiento Crítico Cuantitativo)

### Contexto
Un estudio en una revista científica indica que se encontró un coeficiente de "Correlación de Pearson ($r$)" altísimo ($+0.92$) entre las variables $A$: "Gasto anual de las familias paisas comprando Queso costeño importado" vs $B$: "Número promedio diario de quemados o asfixiados no mortales por mal manejo de sábanas y colchones domésticos".
Un periodista titulará mañana: "El exceso de ingesta láctea produce muertes súbitas en las camas y ahogamiento por textiles hogareños locales".

### Enunciado
Como analista, ¿por qué es imperante y estadísticamente vital refutar este titular del periodista aficionado antes de su publicación en el noticiero matutino oficialista local nacional respectivo general?

### Options
- [x] A) Ignora la máxima inferencial paramétrica: "Una fuerte correlación lineal (incluso +0.92) rara vez certifica y es garantía automática de **Causalidad**". El titular asume falsamente que $A$ causa y engendra físicamente a $B$, omitiendo que existe muy probablemente un factor ambiental macrooculto externo. <!-- feedback: Correcto y letal. Jamás Correlation is Causality. Todo puede crecer al tiempo (ej: si son ingresos per cápita subiendo) pero el queso no inflige la muerte por colchas simultáneamente asociativa y obligatoria por bioquímica celular. -->
- [ ] B) Porque se equivocó del signo asimétrico de correlación simple lineal. Debió restarlos e integrarlo en negativos inversos analítico. <!-- feedback: Falsa salida sintáctica inentendible ajena al meollo estadístico y cognitivo central de la pregunta planteada del razonamiento formal deductivo puro en la prueba de estado global oficial de educación superior masiva universal de egreso al sistema. -->
- [ ] C) El periodista está en lo cierto. 0.92 significa que el $92\%$ de la vez el Lácteo ejecuta e impacta con los mortaja-edredones en el territorio colombiano occidental de montañas cafeteras locales andinas típicas tropicales frías altas lluviosas matinales dominicales de los diciembres locales familiares costosos. <!-- feedback: Ridiculez argumentativa pseudo científica. -->
- [ ] D) Sí debió publicarlo. Y mandar cerrar la comercialización láctea e importar más. <!-- feedback: Incoherencia analítica política, no de métrica escolar de la inferencia abstracta solicitada formal probatoria matemática. -->

### Explicación Pedagógica
Correlación vs Causalidad. Es el pico de la alfabetización estadística de Saber 11: inmunizar a los jóvenes estudiantes contra "Titulares engañosos", variables ocultas y falacias pseudo-científicas que manipulan las masas combinando gráficas falsamente atadas.

---

(Remaining 10 questions cover:
- Significado geométrico de colas de hipótesis p-value.
- Muestras representativas en elecciones y margen de error.
- Diferencia gráfica de sesgos positivos y negativos en campanas no normales.
...)

### Rúbrica de Justificación de Maestría (D9-10)
1. **Razonamiento Crítico Analítico:** Discrimina inteligentemente los hallazgos correlacionales frente a la pseudo-ciencia causal engañosa periodística popular y mediática de las masas incautas actuales siglo XXI en redes sociales públicas amplias y globales masivas conectadas permanentes ubicuas.
2. **Intervalos:** Capacidad inquebrantable abstracta dimensional analítica general unificada abstracta geométrica formal empírica...
