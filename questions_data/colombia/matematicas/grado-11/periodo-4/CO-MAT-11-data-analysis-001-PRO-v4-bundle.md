---
id: "CO-MAT-11-data-analysis-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Análisis de Datos: Tendencia Central y Dispersión"
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

## Contexto 1: La Fotografía de una Población
Las estadísticas no son solo números; son herramientas para contar historias sobre grupos de personas, procesos industriales o fenómenos naturales. Sin embargo, un solo número (como el promedio) puede ser engañoso. Por ejemplo, "el salario promedio" de una empresa puede ser alto porque el jefe gana mucho, aunque los empleados ganen poco. Para tener una imagen real, necesitamos conocer tanto el centro de los datos (**Tendencia Central**) como qué tan "regados" están esos datos (**Dispersión**). La estadística descriptiva es el primer filtro de la verdad en la ciencia de datos.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la siguiente lista de notas: $\{3.0, 3.5, 4.0, 4.0, 5.0\}$. ¿Cuál es la **mediana**?

### Opciones
- [ ] A) 4.0
- [x] B) 4.0 (Es el valor central tras ordenar los datos)
- [ ] C) 3.5
- [ ] D) 3.9

### Explicación Pedagógica
La mediana es el valor que divide el conjunto de datos ordenados en dos partes iguales (50% arriba y 50% abajo). Como hay 5 datos, el tercero es el centro exacto. En este caso, es 4.0.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v2`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Si a un conjunto de datos muy dispersos se le suma el mismo valor constante a cada dato, ¿qué sucede con la **desviación estándar**?

### Opciones
- [ ] A) Aumenta en la misma constante.
- [ ] B) Disminuye.
- [x] C) Se mantiene igual (La dispersión relativa no cambia).
- [ ] D) Se vuelve cero.

### Explicación Pedagógica
La desviación estándar mide qué tan lejos están los datos unos de otros respecto al promedio. Si movemos todo el bloque de datos hacia la derecha (sumando una constante), las distancias entre ellos permanecen idénticas. La variabilidad es una propiedad de la "forma", no de la "posición".

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre el **Rango Intercuartílico** ($IQR = Q3 - Q1$). Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Mide la dispersión del 50% central de los datos. <!-- weight: 1.0 -->
- [x] B) Es menos sensible a los valores atípicos (*outliers*) que el rango total. <!-- weight: 1.0 -->
- [ ] C) Siempre es mayor que la desviación estándar.
- [x] D) Se utiliza comúnmente en los diagramas de caja y bigotes (*Boxplots*). <!-- weight: 1.0 -->
- [ ] E) Representa el promedio de los datos.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) El IQR ignora los extremos (donde suelen estar los errores de medición o casos raros) y se enfoca en el "corazón" de la distribución. Es una medida de robustez estadística.

---

## Question 4 (Análisis de Sesgo - Dificultad 6)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v4`
### Enunciado
En una distribución de salarios donde unos pocos ejecutivos ganan mucho dinero y la mayoría de obreros gana el mínimo, ¿cuál de las siguientes relaciones es más probable?

### Opciones
- [ ] A) Media $=$ Mediana
- [x] B) Media $>$ Mediana (La media es arrastrada por los valores altos)
- [ ] C) Media $<$ Mediana
- [ ] D) Moda $>$ Media

### Explicación Pedagógica
Este se conoce como sesgo a la derecha (positivo). Los valores extremadamente altos "inflan" el promedio (media), pero no afectan tanto a la mediana (que solo cuenta posiciones). Por eso, en economía, la mediana suele ser un mejor indicador de la "realidad" que el promedio.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Calcule la **varianza** del conjunto $\{2, 4, 6\}$. (Media = 4).

### Opciones
- [x] A) 2.66... (O exactamente $8/3$) <!-- weight: 1.0 -->
- [x] B) $\frac{(2-4)^2 + (4-4)^2 + (6-4)^2}{3} = \frac{4+0+4}{3} = 8/3$. <!-- weight: 1.0 -->
- [ ] C) 4.0 <!-- weight: 0.0 -->
- [ ] D) 2.0 <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica correctamente la definición de varianza poblacional).

### Explicación Pedagógica
La varianza es el promedio de los cuadrados de las distancias a la media.
Diferencia al cuadrado: $(-2)^2=4, (0)^2=0, (2)^2=4$.
Suma = 8. Promedio = 8/3.
La varianza nos da una idea del "área" de error; su raíz (desviación estándar) nos devuelve a las unidades originales de los datos.

---

## Contexto 2: La Interpretación de Gráficos Estadísticos
Un gráfico bien hecho puede revelar patrones invisibles, pero un gráfico mal interpretado puede causar pánico o decisiones erróneas. El **Histograma** muestra la frecuencia de los datos por intervalos. El **Diagrama de Caja** (*Boxplot*) nos dice si los datos son simétricos o si hay valores atípicos. El **Diagrama de Dispersión** nos ayuda a entender si dos variables (como "horas de estudio" y "nota del examen") están relacionadas. En el examen Saber 11, la capacidad de leer detrás de las barras y puntos es fundamental.

---

## Question 6 (Transferencia - Dificultad 7)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Transfer

### Enunciado
En un *Boxplot*, ¿qué representa la línea vertical (o punto) que sale muy lejos de los "bigotes"?

### Opciones
- [ ] A) El valor máximo esperado.
- [ ] B) La media aritmética.
- [x] C) Un valor atípico (*Outlier*).
- [ ] D) El primer cuartil.

### Explicación Pedagógica
Los diagramas de caja definen límites basados en el rango intercuartílico ($1.5 \cdot IQR$). Cualquier dato que caiga fuera de esos límites se considera una anomalía que merece ser investigada por separado.

---

## Question 7 (Análisis de Correlación - Dificultad 8)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v7`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Un estudio encuentra una **correlación de 0.85** entre el consumo de helado y los ataques de tiburón. ¿Significa esto que comer helado causa que los tiburones ataquen?

### Opciones
- [ ] A) Sí, porque la correlación es muy cercana a 1.
- [ ] B) No, significa que los tiburones atraen a los heladeros.
- [x] C) No necesariamente. Existe una variable oculta (el calor/verano) que aumenta ambos eventos de forma independiente.
- [ ] D) La correlación es falsa porque no puede ser mayor a 0.5.

### Explicación Pedagógica
Es la regla máxima de la estadística: **Correlación no implica causalidad**. Dos cosas pueden subir al mismo tiempo por una tercera causa común. En este caso, el clima cálido hace que más gente coma helado Y que más gente nade en el mar (exponiéndose a los tiburones).

---

## Question 8 (Evaluación de Medidas de Dispersión - Dificultad 6)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Un fabricante de tornillos tiene una máquina A con desviación estándar de 0.01 mm y una máquina B con 0.1 mm. ¿Cuál máquina ofrece un producto de **calidad más consistente**?

### Opciones
- [x] A) La máquina A (Menor desviación = menor error).
- [ ] B) La máquina B (Mayor desviación = más variedad).
- [ ] C) Ambas son iguales si producen el mismo promedio.
- [ ] D) La que tenga la media más alta.

### Explicación Pedagógica
En industria, la calidad se define por la consistencia (precisión). Queremos que todos los tornillos sean casi idénticos. La máquina A tiene una dispersión diez veces menor, lo que significa que sus tornillos fallarán mucho menos al intentar encajar en una tuerca.

---

## Question 9 (Técnica de Frecuencia Acumulada - Dificultad 7)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v9`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
Si en una tabla de frecuencias el 30% de los estudiantes tiene menos de 15 años y el 70% tiene menos de 18 años. ¿Qué porcentaje de estudiantes tiene entre 15 y 18 años?

### Opciones
- [ ] A) 100%
- [x] B) 40% (Diferencia de las frecuencias acumuladas: $70\% - 30\%$)
- [ ] C) 70%
- [ ] D) 30%

### Explicación Pedagógica
Las frecuencias acumuladas nos dicen cuántos datos hay "hasta cierto punto". Para hallar la cantidad en un intervalo específico, restamos el acumulado del final menos el acumulado del principio del intervalo.

---

## Question 10 (Síntesis de Probabilidad y Estadística - Dificultad 8)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre el **Coeficiente de Variación** ($CV = \frac{\sigma}{\bar{x}}$). Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Es una medida de dispersión relativa (no tiene unidades). <!-- weight: 1.0 -->
- [x] B) Permite comparar la variabilidad de dos poblaciones con medias muy diferentes (ej: pesos de ratones vs pesos de elefantes). <!-- weight: 1.0 -->
- [ ] C) Si el CV es 0, todos los datos son diferentes.
- [x] D) Expresa la desviación estándar como un porcentaje de la media. <!-- weight: 1.0 -->
- [ ] E) Es siempre mayor que 1.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) Una desviación de 1 kg es enorme para un bebé pero insignificante para un camión. El Coeficiente de Variación "normaliza" el error dividiéndolo por la magnitud de lo que medimos, permitiendo comparaciones justas entre escalas distintas.

---

## Question 11 (Análisis de Agregación de Datos - Dificultad 9)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
El promedio de 4 números es 10. Si añadimos un quinto número y el nuevo promedio es 11, ¿cuál fue el valor del quinto número?

### Opciones
- [ ] A) 11
- [ ] B) 12
- [x] C) 15 (Suma inicial = 40. Suma final = 55. Cambio = 15)
- [ ] D) 20

### Explicación Pedagógica
Suma total inicial $= 4 \times 10 = 40$.
Suma total final $= 5 \times 11 = 55$.
El número agregado debe ser la diferencia: $55 - 40 = 15$.
Este tipo de razonamiento es vital para entender cómo un solo dato nuevo puede "mover" la tendencia central de un grupo.

---

## Question 12 (Evaluación de Histogramas - Dificultad 5)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v12`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Apply

### Enunciado
En un histograma, ¿qué representa el área de cada barra?

### Opciones
- [ ] A) El valor exacto del promedio.
- [x] B) La frecuencia (cantidad de datos) en ese intervalo.
- [ ] C) El nombre de la variable.
- [ ] D) La desviación estándar.

### Explicación Pedagógica
La altura (o el área en histogramas de densidad) es proporcional a cuántos datos caen en ese rango. Una barra alta indica una "zona congestionada" de la población.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Economía y Desigualdad:** El "Coeficiente de Gini" mide la desigualdad en una población basándose en la dispersión de la riqueza. Si una sociedad tiene una **Gini de 0**, ¿qué significa estadísticamente?

### Opciones
- [x] A) La varianza de los ingresos es 0 (Igualdad perfecta, todos ganan lo mismo). <!-- weight: 1.0 -->
- [x] B) La curva de Lorenz coincide con la línea de equidad. <!-- weight: 1.0 -->
- [ ] C) Nadie tiene dinero. <!-- weight: 0.0 -->
- [ ] D) Que la economía es caótica. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Conecta la dispersión nula con el concepto económico de equidad).

### Explicación Pedagógica
Si el Coeficiente de Gini (que depende de la distancia entre la distribución real y la ideal) es cero, significa que no hay dispersión. Todos los habitantes están en el mismo punto de ingreso (la media). Es el caso teórico de varianza mínima. En el mundo real, los países varían entre 0.25 y 0.60.

---

## Question 14 (Análisis Lógico de Moda - Dificultad 5)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la **moda** del conjunto $\{2, 3, 3, 5, 7, 7, 7, 8\}$?

### Opciones
- [ ] A) 3
- [ ] B) 5
- [x] C) 7 (Es el dato que más se repite, 3 veces)
- [ ] D) 8

### Explicación Pedagógica
La moda es simplemente la popularidad. No requiere cálculos, solo observación. Es la única medida de tendencia central que puede usarse con datos no numéricos (ej. ¿cuál es el color preferido?).

---

## Question 15 (Análisis de Percentiles - Dificultad 8)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v15`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si en el examen Saber 11 obtuviste el **Percentil 95** en Matemáticas, ¿qué significa esto respecto al resto de estudiantes de Colombia?

### Opciones
- [ ] A) Sacaste una nota de 95 sobre 100.
- [ ] B) Fallaste el 5% de las preguntas.
- [x] C) Tu puntaje es igual o superior al del 95% de los evaluados.
- [ ] D) Eres parte del 95% que aprobó el examen.

### Explicación Pedagógica
El percentil es una medida de posición relativa. No mide tu nota bruta, sino tu lugar en la fila. El percentil 95 significa que estás en el "Top 5%" del país.

---

## Question 16 (Análisis de Tabla de Frecuencias - Dificultad 6)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v16`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Si la frecuencia relativa de una categoría es 0.25 en un grupo de 200 personas, ¿cuántas personas pertenecen a esa categoría?

### Opciones
- [ ] A) 25
- [x] B) 50 ($200 \times 0.25$)
- [ ] C) 75
- [ ] D) 100

### Explicación Pedagógica
La frecuencia relativa es la proporción. Para volver a números reales (frecuencia absoluta), multiplicamos el total de la muestra por la proporción: $200 \times 1/4 = 50$.

---

## Question 17 (Evaluación de Rango - Dificultad 5)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Qué tan confiable es el **rango** (Máximo - Mínimo) como medida de dispersión única?

### Opciones
- [ ] A) Muy confiable porque usa todos los datos.
- [x] B) Poco confiable, porque un solo dato extremo (error) puede cambiarlo drásticamente.
- [ ] C) Es la medida más exacta.
- [ ] D) Solo sirve para círculos.

### Explicación Pedagógica
El rango solo usa la información de las dos "puntas". Si medimos la altura de 100 personas y entra un gigante, el rango se duplica, aunque el 99% de la población no haya cambiado. Por eso preferimos la desviación estándar o el IQR.

---

## Question 18 (Cálculo de Desviación Media - Dificultad 8)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Se tienen dos grupos de estudiantes. El Grupo A tiene una media de 70 y desviación 2. El Grupo B tiene una media de 70 y desviación 10. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El Grupo A es más homogéneo (los estudiantes tienen notas parecidas). <!-- weight: 1.0 -->
- [x] B) Es probable que en el Grupo B haya estudiantes con notas muy altas y otros con muy bajas. <!-- weight: 1.0 -->
- [ ] C) El Grupo B es mejor académicamente que el A porque tiene mayor desviación.
- [x] D) El promedio no basta para describir la diferencia de rendimiento entre ambos grupos. <!-- weight: 1.0 -->
- [ ] E) Los dos grupos son idénticos porque la media es la misma.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) La media nos dice "dónde estamos", pero la desviación nos dice "cómo llegamos allí". Un grupo con desviación alta es una mezcla heterogénea; un grupo con desviación baja es un bloque sólido.

---

## Question 19 (Interpretación de Diagrama de Sectores - Dificultad 5)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v19`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
En un diagrama de sectores (torta), si una categoría ocupa un ángulo de 90°, ¿qué porcentaje del total representa?

### Opciones
- [ ] A) 50%
- [x] B) 25% ($90/360$)
- [ ] C) 90%
- [ ] D) 10%

### Explicación Pedagógica
Un círculo completo tiene 360°. La proporción del ángulo respecto al círculo es la misma que la del dato respecto al total. $90/360 = 1/4 = 25\%$.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-data-analysis-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Usted es un analista de datos para una tienda online. Nota que el valor promedio de las compras es \$50.000, pero la **moda** es \$5.000 y la **desviación estándar** es \$100.000.

¿Qué estrategia de marketing es más lógica basándose en estos datos?

### Options
- [x] A) Crear promociones para compras pequeñas, ya que la mayoría de transacciones reales son de bajo valor (Moda). <!-- weight: 1.0 -->
- [x] B) Investigar quiénes son los "clientes ballena" que inflan tanto el promedio y la desviación. <!-- weight: 1.0 -->
- [ ] C) Confiar en el promedio de \$50.000 para proyectar las ventas de mañana de cualquier cliente. <!-- weight: 0.0 -->
- [ ] D) Bajar los precios porque la desviación es muy alta. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aisla el comportamiento de los datos asimétricos y la importancia de la dispersión extrema).

### Explicación Pedagógica
Este es un caso de una distribución con una cola derecha muy larga. El promedio de 50k es "mentiroso": casi nadie compra exactamente 50k; la gente compra o muy poquito (\$5k) o muchísimo (las "ballenas" que generan la gran desviación). En negocios, entender que la mayoría no es el promedio es la clave del éxito.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Argumentación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Interpretación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Argumentación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 7 | single | Transfer | Interpretación | ✅ |
| 7 | ...-v7 | 8 | single | Analyze | Argumentación | ✅ |
| 8 | ...-v8 | 6 | single | Evaluate | Argumentación | ✅ |
| 9 | ...-v9 | 7 | single | Apply | Interpretación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 5 | single | Apply | Interpretación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Analyze | Interpretación | ✅ |
| 16 | ...-v16| 6 | single | Analyze | Formulación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Interpretación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
