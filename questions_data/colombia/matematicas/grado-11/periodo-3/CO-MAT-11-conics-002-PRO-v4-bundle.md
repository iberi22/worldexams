---
id: "CO-MAT-11-conics-002-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Secciones Cónicas II: Hipérbola y Circunferencia"
periodo: 3
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
quarantine: true
bundle_status: "quarantined"
---

## Contexto 1: La Perfección del Círculo y la Dualidad de la Hipérbola
Desde la rueda hasta el diseño de domos, la circunferencia es la forma más eficiente para distribuir fuerzas de manera uniforme, ya que cada punto de su borde está exactamente a la misma distancia de un centro común. Por otro lado, la hipérbola es la cónica de los extremos. Mientras la elipse describe órbitas cerradas, la hipérbola describe la trayectoria de objetos que pasan tan rápido cerca de un planeta que nunca regresan, escapando hacia el espacio infinito. En navegación, el sistema LORAN utiliza la diferencia de tiempo entre dos señales de radio (que define una hipérbola) para que un barco sepa exactamente dónde está.

---

## Question 1 (Analisis - Dificultad 5)

**ID:** `CO-MAT-11-conics-002-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la circunferencia $x^2 + y^2 - 6x + 4y - 3 = 0$. ¿Cuál es su radio?

### Opciones
- [ ] A) 3
- [x] B) 4 (Completando cuadrados: $(x-3)^2 + (y+2)^2 = 16$)
- [ ] C) 16
- [ ] D) $\sqrt{3}$

### Explicación Pedagógica
1. Agrupamos: $(x^2 - 6x) + (y^2 + 4y) = 3$.
2. Completamos: $(x^2 - 6x + 9) + (y^2 + 4y + 4) = 3 + 9 + 4 = 16$.
3. Forma: $(x-3)^2 + (y+2)^2 = 16$.
El radio es la raíz de 16, es decir, 4.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-conics-002-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Determine la ecuación de las asíntotas de la hipérbola $\frac{x^2}{16} - \frac{y^2}{9} = 1$.

### Opciones
- [ ] A) $y = \pm \frac{4}{3}x$
- [x] B) $y = \pm \frac{3}{4}x$ (Fórmula $y = \pm \frac{b}{a}x$ para eje real horizontal)
- [ ] C) $y = \pm \frac{16}{9}x$
- [ ] D) $y = x$

### Explicación Pedagógica
Para una hipérbola horizontal ($x^2$ positiva), $a^2=16 \rightarrow a=4$ y $b^2=9 \rightarrow b=3$.
Las asíntotas son las líneas hacia las cuales se aproxima la curva en el infinito, dadas por $y = \pm \frac{b}{a}x$, es decir, $y = \pm 0.75x$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-conics-002-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la hipérbola vertical $\frac{y^2}{144} - \frac{x^2}{25} = 1$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Sus focos están en $(0, \pm 13)$. <!-- weight: 1.0 -->
- [x] B) El eje transverso tiene longitud 24. <!-- weight: 1.0 -->
- [ ] C) Se abre hacia la izquierda y derecha.
- [x] D) La distancia focal $c$ es 13 ($c^2 = 144 + 25$). <!-- weight: 1.0 -->
- [ ] E) Pasa por el punto $(0, 0)$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, D) $a^2=144, b^2=25 \rightarrow a=12, b=5$. $c = \sqrt{144+25} = 13$. Como $y^2$ es positivo, abre hacia arriba y abajo, y los focos están en el eje Y. B) El eje transverso es $2a = 2(12) = 24$.

---

## Question 4 (Análisis de Circunferencias Tangentes - Dificultad 7)

**ID:** `CO-MAT-11-conics-002-PRO-v4`
### Enunciado
Halle la ecuación de la circunferencia con centro en $(2, 3)$ que es tangente al eje $X$.

### Opciones
- [ ] A) $(x-2)^2 + (y-3)^2 = 4$
- [x] B) $(x-2)^2 + (y-3)^2 = 9$ (El radio debe ser igual a la distancia vertical al eje, $|k|=3$)
- [ ] C) $(x-2)^2 + (y-3)^2 = 13$
- [ ] D) $x^2 + y^2 = 9$

### Explicación Pedagógica
Si el centro está 3 unidades arriba del eje X ($k=3$), y la figura toca el eje rozándolo, el radio debe ser exactamente 3. Por lo tanto, $r^2 = 9$.

---

## Question 5 (Genio - Dificultad 9)

**ID:** `CO-MAT-11-conics-002-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la ecuación de la hipérbola con centro en el origen, focos en $(\pm 5, 0)$ y vértices en $(\pm 3, 0)$.

### Opciones
- [x] A) $\frac{x^2}{9} - \frac{y^2}{16} = 1$ <!-- weight: 1.0 -->
- [x] B) $16x^2 - 9y^2 = 144$ <!-- weight: 1.0 -->
- [ ] C) $\frac{x^2}{16} - \frac{y^2}{9} = 1$ <!-- weight: 0.0 -->
- [ ] D) $\frac{x^2}{9} + \frac{y^2}{16} = 1$ (Eso es una elipse) <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la forma canónica, B es la general).

### Explicación Pedagógica
$a = 3$ (vértice).
$c = 5$ (foco).
Calculamos $b$: $c^2 = a^2 + b^2 \rightarrow 25 = 9 + b^2 \rightarrow b^2 = 16$.
Eje real horizontal: $\frac{x^2}{9} - \frac{y^2}{16} = 1$.

---

## Contexto 2: Aplicaciones de la Hipérbola en la Ciencia
La hipérbola es la "hermana rebelde" de la elipse. Mientras la elipse tiene una excentricidad menor a 1 (curva cerrada), la hipérbola tiene una excentricidad mayor a 1 (curva abierta). Esta propiedad es crucial en la balística de largo alcance y en la arquitectura de estructuras que deben soportar grandes vientos, como las torres de refrigeración de industrias pesadas. Su forma permite maximizar el flujo de aire (tiro térmico) usando el mínimo de concreto.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-conics-002-PRO-v6`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Transfer

### Enunciado
Dada la hipérbola equilátera $x^2 - y^2 = 1$. ¿Cuál es el ángulo que forman sus asíntotas entre sí?

### Opciones
- [ ] A) 45°
- [x] B) 90° (Pendientes $\pm 1$, rectas perpendiculares)
- [ ] C) 60°
- [ ] D) 0° (Son paralelas)

### Explicación Pedagógica
Aquí $a=b=1$. Las asíntotas son $y = \pm (1/1)x = \pm x$.
Las rectas $y=x$ y $y=-x$ tienen pendientes recíprocas negativas ($1 \cdot -1 = -1$), por lo que son perpendiculares (forman una cruz perfecta).

---

## Question 7 (Análisis de Distancia en el Círculo - Dificultad 5)

**ID:** `CO-MAT-11-conics-002-PRO-v7`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la distancia del punto $(3, 4)$ al centro de la circunferencia $x^2 + y^2 = 1$?

### Opciones
- [ ] A) 1
- [ ] B) 25
- [x] C) 5 (Por distancia entre puntos: $\sqrt{3^2 + 4^2}$)
- [ ] D) $\sqrt{7}$

### Explicación Pedagógica
El centro es $(0, 0)$. La distancia es $\sqrt{(3-0)^2 + (4-0)^2} = \sqrt{9+16} = 5$. Como el radio del círculo es 1 y la distancia es 5, el punto $(3, 4)$ está muy fuera de la circunferencia.

---

## Question 8 (Evaluación de Parámetros de la Hipérbola - Dificultad 6)

**ID:** `CO-MAT-11-conics-002-PRO-v8`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la excentricidad de la hipérbola $\frac{x^2}{144} - \frac{y^2}{25} = 1$.

### Opciones
- [ ] A) 12/13
- [x] B) 13/12 ($c = 13, a = 12 \rightarrow e = 13/12 > 1$)
- [ ] C) 5/12
- [ ] D) 1

### Explicación Pedagógica
$a = 12, b = 5 \rightarrow c = \sqrt{144+25} = 13$.
Excentricidad $e = c/a = 13/12$. En la hipérbola, $e$ siempre es mayor a 1, indicando que los focos están "más afuera" que los vértices.

---

## Question 9 (Técnica de Completar Cuadrados para Hipérbola Trasladada - Dificultad 10)

**ID:** `CO-MAT-11-conics-002-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** synthesis

### Enunciado
Dada la ecuación $9x^2 - 4y^2 - 18x + 16y - 43 = 0$. ¿Hacia dónde abre esta hipérbola?

### Opciones
- [x] A) Izquierda y Derecha (Eje real horizontal, el término $x^2$ queda positivo tras completar cuadrados)
- [ ] B) Arriba y Abajo
- [ ] C) No es una hipérbola, es un círculo.
- [ ] D) Solo hacia la derecha.

### Explicación Pedagógica
1. Agrupar: $9(x^2 - 2x) - 4(y^2 - 4y) = 43$.
2. Completar: $9(x^2 - 2x + 1) - 4(y^2 - 4y + 4) = 43 + 9 - 16 = 36$.
3. Forma: $9(x-1)^2 - 4(y-2)^2 = 36 \rightarrow \frac{(x-1)^2}{4} - \frac{(y-2)^2}{9} = 1$.
El término positivo es el de $x$, por lo tanto abre horizontalmente.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-conics-002-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Identifique TODAS las condiciones necesarias para que una ecuación $Ax^2 + Cy^2 + Dx + Ey + F = 0$ represente una hipérbola.

### Opciones
- [x] A) Los coeficientes $A$ y $C$ deben tener signos opuestos ($A \cdot C < 0$). <!-- weight: 1.0 -->
- [ ] B) $A$ y $C$ deben ser iguales.
- [x] C) Se deben tener términos cuadráticos en ambas variables $x$ e $y$. <!-- weight: 1.0 -->
- [ ] D) Al menos un coeficiente debe ser cero.
- [x] E) La excentricidad de la figura resultante debe ser mayor a 1. <!-- weight: 1.0 -->

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, C) La diferencia de cuadrados ($Ax^2 - Cy^2$) es lo que genera las dos ramas opuestas características de la hipérbola. E) Es la definición geométrica/analítica por excelencia de esta cónica.

---

## Question 11 (Análisis de Círculo y Recta - Dificultad 7)

**ID:** `CO-MAT-11-conics-002-PRO-v11`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
¿Cuántos puntos de intersección tiene la recta $y = 5$ con la circunferencia $x^2 + y^2 = 16$?

### Opciones
- [ ] A) 2
- [ ] B) 1
- [x] C) 0 (La recta está por encima del radio máximo, $5 > 4$)
- [ ] D) Infinitos.

### Explicación Pedagógica
El radio de la circunferencia es $\sqrt{16} = 4$. La circunferencia sube hasta $y=4$. La recta $y=5$ pasa por encima de ella sin tocarla. Algebraicamente: $x^2 + 5^2 = 16 \rightarrow x^2 = 16 - 25 = -9$. Como no hay raíces reales de un número negativo, no hay contacto.

---

## Question 12 (Evaluación de Vértices de Hipérbola Trasladada - Dificultad 7)

**ID:** `CO-MAT-11-conics-002-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle el centro de la hipérbola $\frac{(y+5)^2}{64} - \frac{(x-2)^2}{36} = 1$.

### Opciones
- [ ] A) $(5, -2)$
- [x] B) $(2, -5)$
- [ ] C) $(-2, 5)$
- [ ] D) $(0, 0)$

### Explicación Pedagógica
La forma es $\frac{(y-k)^2}{a^2} - \frac{(x-h)^2}{b^2} = 1$.
$h = 2, k = -5$. El centro es $(2, -5)$. Es una hipérbola vertical desplazada.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-conics-002-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Física de Satélites:** Un objeto entra al sistema solar con una velocidad $v$ mucho mayor que la necesaria para quedar atrapado por la gravedad del Sol. Su trayectoria será una hipérbola.

¿Qué representa físicamente el **foco** de esa trayectoria hiperbólica?

### Opciones
- [x] A) El objeto que genera la gravedad (el Sol). <!-- weight: 1.0 -->
- [x] B) El punto central de la atracción que desvía la trayectoria sin llegar a cerrarla. <!-- weight: 1.0 -->
- [ ] C) El punto donde el objeto se detendrá. <!-- weight: 0.0 -->
- [ ] D) La salida del agujero de gusano. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica correctamente el foco como el centro de masa atractivo).

### Explicación Pedagógica
Al igual que en la elipse, el foco de la hipérbola es donde se ubica la fuente de gravedad. La hipérbola describe un objeto que viene del infinito, se curva ligeramente ante la presencia del foco, y se va de nuevo al infinito. Esto es lo que permite usar planetas como "hondas gravitacionales" para acelerar naves espaciales sin aterrizar en ellos.

---

## Question 14 (Análisis Lógico de la Circunferencia - Dificultad 5)

**ID:** `CO-MAT-11-conics-002-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la ecuación de la circunferencia centrada en el origen que pasa por el punto $(3, 0)$?

### Opciones
- [ ] A) $x^2 + y^2 = 3$
- [x] B) $x^2 + y^2 = 9$ ($r=3 \rightarrow r^2=9$)
- [ ] C) $x + y = 3$
- [ ] D) $x^2 + y^2 = 0$

### Explicación Pedagógica
La distancia del origen al punto $(3, 0)$ es lógicamente 3. Ese es el radio. La ecuación es $x^2 + y^2 = 3^2 = 9$.

---

## Question 15 (Análisis de la Hipérbola Equilátera - Dificultad 8)

**ID:** `CO-MAT-11-conics-002-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle la excentricidad de una hipérbola equilátera ($a = b$).

### Opciones
- [ ] A) 1
- [x] B) $\sqrt{2}$ (Aproximadamente 1.41)
- [ ] C) 2
- [ ] D) 0.5

### Explicación Pedagógica
$c = \sqrt{a^2 + a^2} = \sqrt{2a^2} = a\sqrt{2}$.
Excentricidad $e = c/a = \frac{a\sqrt{2}}{a} = \sqrt{2}$.
Todas las hipérbolas equiláteras tienen la misma excentricidad $\sqrt{2}$, sin importar su tamaño.

---

## Question 16 (Análisis de Puntos Interiores del Círculo - Dificultad 6)

**ID:** `CO-MAT-11-conics-002-PRO-v16`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si para un punto $(x, y)$ se cumple que $x^2 + y^2 < 25$, ¿dónde se ubica el punto respecto a la circunferencia de radio 5 centrada en el origen?

### Opciones
- [ ] A) Sobre el borde.
- [x] B) En el interior del círculo.
- [ ] C) En el exterior.
- [ ] D) Es el centro exacto.

### Explicación Pedagógica
La inecuación describe todos los puntos cuya distancia al centro es *menor* que el radio. Es la forma matemática de definir un área circular (disco) en lugar de solo el perímetro.

---

## Question 17 (Evaluación de Asíntotas Horizontales - Dificultad 6)

**ID:** `CO-MAT-11-conics-002-PRO-v17`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuáles son las asíntotas de la hipérbola vertical $\frac{y^2}{4} - \frac{x^2}{1} = 1$?

### Opciones
- [ ] A) $y = \pm 1/2 x$
- [x] B) $y = \pm 2x$ (Fórmula $y = \pm \frac{a}{b}x$ para vertical)
- [ ] C) $y = \pm x$
- [ ] D) No tiene.

### Explicación Pedagógica
Como $y^2$ es positivo, el eje real es vertical. $a = \sqrt{4} = 2, b = \sqrt{1} = 1$. Las asíntotas son $y = \pm (a/b)x = \pm 2x$.

---

## Question 18 (Cálculo de Distancia Focal - Dificultad 8)

**ID:** `CO-MAT-11-conics-002-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la circunferencia $x^2 + y^2 + 8x - 10y + 16 = 0$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Su centro es $(-4, 5)$. <!-- weight: 1.0 -->
- [x] B) Su radio es 5. <!-- weight: 1.0 -->
- [ ] C) Pasa por el origen $(0, 0)$. ($16 \neq 0$)
- [x] D) Se encuentra principalmente en el segundo cuadrante. <!-- weight: 1.0 -->
- [ ] E) Es una elipse con semieje $a=8$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
1. Completar: $(x+4)^2 + (y-5)^2 = -16 + 16 + 25 = 25$. Centro $(-4, 5)$, Radio 5.
2. Como el centro está en $(-4, 5)$ y el radio es 5, el círculo toca el eje Y en 0 y el eje X en 0. Está centrado en el cuadrante II.

---

## Question 19 (Interpretación de Trayectorias de Salida - Dificultad 5)

**ID:** `CO-MAT-11-conics-002-PRO-v19`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si una persona está corriendo en línea recta alejándose de un punto $A$ pero acercándose a otro punto $B$ de tal forma que la **diferencia** de las distancias se mantiene constante, ¿qué figura está dibujando su trayectoria?

### Opciones
- [ ] A) Una elipse.
- [x] B) Una rama de una hipérbola.
- [ ] C) Una circunferencia.
- [ ] D) Una línea recta.

### Explicación Pedagógica
Esta es la definición geométrica de la hipérbola. La elipse es la **suma** constante; la hipérbola es la **diferencia** constante.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-conics-002-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Imagine que está diseñando un sistema de radares. Dos estaciones $A$ y $B$ reciben una señal de un avión. El radar calcula que la señal llegó a $A$ exactamente 2 milisegundos después que a $B$. Esto sitúa al avión en una curva específica en el mapa.

¿A qué tipo de sección cónica corresponde esa curva de "diferencia de tiempos"?

### Options
- [x] A) A una hipérbola con focos en las estaciones $A$ y $B$. <!-- weight: 1.0 -->
- [x] B) A una línea donde $|dist(P, A) - dist(P, B)|$ es constante. <!-- weight: 1.0 -->
- [ ] C) A una elipse, porque el avión está volando en círculos. <!-- weight: 0.0 -->
- [ ] D) A una parábola, para orientar la antena. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica la propiedad fundamental de diferencia de distancias).

### Explicación Pedagógica
La velocidad de la señal es constante. Si hay una diferencia de tiempo fija, hay una diferencia de distancia fija entre el avión y las dos bases. Por definición, los puntos con diferencia de distancia constante respecto a dos focos forman una hipérbola. Cruzando esta información con una tercera estación, se obtendría otra hipérbola, y la intersección de ambas daría la ubicación exacta (GPS primigenio).

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 5 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 7 | single | Analyze | Formulación | ✅ |
| 5 | ...-v5 | 9 | weighted | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Argumentación | ✅ |
| 7 | ...-v7 | 5 | single | Analyze | Interpretación | ✅ |
| 8 | ...-v8 | 6 | single | Evaluate | Formulación | ✅ |
| 9 | ...-v9 | 10| single | Synthesis | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 7 | single | Analyze | Argumentación | ✅ |
| 12 | ...-v12| 7 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Argumentación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Apply | Formulación | ✅ |
| 16 | ...-v16| 6 | single | Analyze | Interpretación | ✅ |
| 17 | ...-v17| 6 | single | Analyze | Formulación | ✅ |
| 18 | ...-v18| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Argumentación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
