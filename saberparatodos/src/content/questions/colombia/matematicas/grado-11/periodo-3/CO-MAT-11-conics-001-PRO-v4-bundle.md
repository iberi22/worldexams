---
id: "CO-MAT-11-conics-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Secciones Cónicas I: Parábola y Elipse"
periodo: 3
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación", "Formulación", "Argumentación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Geometría de la Luz y de los Planetas
Las secciones cónicas no son solo figuras en un papel; son las formas que rigen el movimiento y la energía en el universo. Una parábola tiene la propiedad única de que cualquier rayo que entre paralelo a su eje se refleja exactamente hacia un punto llamado "foco". Esto permite que las antenas satelitales capten señales débiles y las concentren. Por otro lado, la elipse es la forma exacta de la órbita de la Tierra alrededor del Sol. Johan Kepler descubrió que los planetas no se mueven en círculos perfectos, sino en elipses con el Sol en uno de sus focos, lo que cambió nuestra comprensión de la astronomía para siempre.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-MAT-11-conics-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la ecuación general de una parábola $y^2 = 8x$, ¿cuáles son las coordenadas de su foco?

### Opciones
- [ ] A) $(0, 2)$
- [x] B) $(2, 0)$
- [ ] C) $(8, 0)$
- [ ] D) $(4, 0)$

### Explicación Pedagógica
La forma estándar de una parábola abierta hacia la derecha es $y^2 = 4px$.
Aquí $4p = 8 \rightarrow p = 2$.
Como la parábola abre sobre el eje X ($y^2$), el foco está en $(p, 0)$, es decir, $(2, 0)$.

---

## Question 2 (Evaluación - Dificultad 5)

**ID:** `CO-MAT-11-conics-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la ecuación de la directriz de la parábola $x^2 = -12y$.

### Opciones
- [ ] A) $x = 3$
- [ ] B) $y = -3$
- [x] C) $y = 3$ (Parábola abre hacia abajo, $p = -3$, directriz es $y = -p$)
- [ ] D) $x = -3$

### Explicación Pedagógica
Forma $x^2 = 4py$. $4p = -12 \rightarrow p = -3$.
La parábola abre hacia abajo. La directriz es la recta horizontal detrás del vértice, dada por $y = -p = -(-3) = 3$.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-conics-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la elipse dada por la ecuación $\frac{x^2}{25} + \frac{y^2}{9} = 1$, seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El semieje mayor se encuentra sobre el eje X y mide 5. <!-- weight: 1.0 -->
- [x] B) La distancia focal $c$ es 4 ($c^2 = 25 - 9$). <!-- weight: 1.0 -->
- [x] C) Los focos están en $(\pm 4, 0)$. <!-- weight: 1.0 -->
- [ ] D) La elipse es más alta que ancha.
- [ ] E) El centro está en $(5, 3)$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) $a^2 = 25 \rightarrow a = 5$ (es mayor que $b^2=9$). B) En la elipse, $a^2 = b^2 + c^2$, por lo que $c = \sqrt{25-9} = 4$. C) Los focos siempre se ubican en el eje mayor a distancia $c$ del centro. D es falso (es horizontal). E es falso (el centro es el origen).

---

## Question 4 (Análisis de Excentricidad - Dificultad 6)

**ID:** `CO-MAT-11-conics-001-PRO-v4`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si una elipse tiene una excentricidad $e = c/a$ cercana a 0, ¿qué forma tiene la figura?

### Opciones
- [ ] A) Es muy alargada ("flaca").
- [x] B) Es casi un círculo.
- [ ] C) Es una parábola.
- [ ] D) Es una línea recta.

### Explicación Pedagógica
La excentricidad mide qué tan "achatada" está la elipse. Si $e \to 0$, significa que $c$ (distancia a los focos) es casi 0, por lo que los focos están casi en el mismo punto (el centro), resultando en un círculo.

---

## Question 5 (Genio - Dificultad 8)

**ID:** `CO-MAT-11-conics-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la ecuación de la elipse con centro en el origen, foco en $(0, 3)$ y un vértice en $(0, 5)$.

### Opciones
- [x] A) $\frac{x^2}{16} + \frac{y^2}{25} = 1$ <!-- weight: 1.0 -->
- [x] B) $25x^2 + 16y^2 = 400$ <!-- weight: 1.0 -->
- [ ] C) $\frac{x^2}{25} + \frac{y^2}{16} = 1$ <!-- weight: 0.0 -->
- [ ] D) $x^2 + y^2 = 25$ <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es forma canónica, B es general).

### Explicación Pedagógica
$a = 5$ (distancia al vértice en Y).
$c = 3$ (distancia al foco en Y).
Calculamos $b$: $b^2 = a^2 - c^2 = 25 - 9 = 16$.
Como los vértices y focos están en Y, el eje mayor es vertical: $\frac{x^2}{16} + \frac{y^2}{25} = 1$.

---

## Contexto 2: Traslación de Cónicas en el Diseño
No siempre el centro de una cónica está en $(0,0)$. Al diseñar un faro de carro o una pista de atletismo, el "corazón" de la figura puede estar en cualquier parte del plano $(h, k)$. La matemática utiliza el desplazamiento de coordenadas $(x-h)$ y $(y-k)$ para mover estas figuras sin cambiar sus propiedades intrínsecas como su tamaño o enfoque.

---

## Question 6 (Transferencia - Dificultad 7)

**ID:** `CO-MAT-11-conics-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Identifique el vértice de la parábola dada por la ecuación $(y + 2)^2 = 4(x - 3)$.

### Opciones
- [ ] A) $(-2, 3)$
- [x] B) $(3, -2)$
- [ ] C) $(-3, 2)$
- [ ] D) $(0, 0)$

### Explicación Pedagógica
La forma ordinaria es $(y-k)^2 = 4p(x-h)$.
Aquí $h=3$ y $k=-2$. El vértice es $(h, k) = (3, -2)$. Es una parábola que fue movida 3 unidades a la derecha y 2 hacia abajo.

---

## Question 7 (Análisis de Elementos de la Elipse Trasladada - Dificultad 8)

**ID:** `CO-MAT-11-conics-001-PRO-v7`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Dada la elipse $\frac{(x-1)^2}{4} + \frac{(y+2)^2}{25} = 1$, ¿en qué coordenadas se encuentran sus focos?

### Opciones
- [ ] A) $(\pm \sqrt{21}, 0)$
- [x] B) $(1, 2.58)$ y $(1, -6.58)$ (Simplificado: $(1, -2 \pm \sqrt{21})$)
- [ ] C) $(1 \pm \sqrt{21}, -2)$
- [ ] D) $(0, 0)$

### Explicación Pedagógica
Centro $(1, -2)$. $a^2=25$ (sobre Y), $b^2=4$ (sobre X).
$c = \sqrt{25-4} = \sqrt{21}$.
Como el eje mayor es vertical, sumamos $c$ a la coordenada $k$ del centro: $(1, -2 \pm \sqrt{21})$.

---

## Question 8 (Evaluación de Propiedades Focales - Dificultad 6)

**ID:** `CO-MAT-11-conics-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Un susurro emitido desde un foco de una habitación elíptica se escucha perfectamente en el otro foco. ¿Por qué ocurre esto?

### Opciones
- [ ] A) Porque el sonido viaja más rápido en elipsis.
- [ ] B) Porque la elipse absorbe el ruido exterior.
- [x] C) Porque la suma de las distancias desde cualquier punto de la elipse a los dos focos es constante ($d_1 + d_2 = 2a$), lo que hace que todas las ondas lleguen al mismo tiempo y se concentren.
- [ ] D) Porque no hay aire dentro de una elipse perfecta.

### Explicación Pedagógica
Esta es la definición geométrica de la elipse. Cualquier rayo (luz o sonido) que salga de un foco y rebote en la pared elíptica se dirigirá obligatoriamente al otro foco. Es el principio de las "Galerías de Susurros" y de la litotricia (destrucción de cálculos renales con ondas de choque).

---

## Question 9 (Técnica de Completar Cuadrados - Dificultad 9)

**ID:** `CO-MAT-11-conics-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Reduzca la ecuación $y^2 - 4y - 4x + 8 = 0$ a su forma ordinaria de parábola.

### Opciones
- [ ] A) $(y-2)^2 = 4x$
- [x] B) $(y-2)^2 = 4(x-1)$
- [ ] C) $(x-2)^2 = 4(y-1)$
- [ ] D) $y^2 = 4(x-2)$

### Explicación Pedagógica
1. Agrupamos $y$: $y^2 - 4y = 4x - 8$.
2. Completamos cuadrado: $y^2 - 4y + 4 = 4x - 8 + 4$.
3. Simplificamos: $(y-2)^2 = 4x - 4 \rightarrow (y-2)^2 = 4(x-1)$.
Es una parábola con vértice en $(1, 2)$ que abre hacia la derecha.

---

## Question 10 (Síntesis de Cónicas - Dificultad 8)

**ID:** `CO-MAT-11-conics-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre la ecuación general de segundo grado $Ax^2 + Cy^2 + Dx + Ey + F = 0$. Seleccione TODAS las afirmaciones correctas sobre el tipo de cónica (suponiendo que no es degenerada).

### Opciones
- [x] A) Si $A = 0$ o $C = 0$ (pero no ambos), la figura es una parábola. <!-- weight: 1.0 -->
- [x] B) Si $A \cdot C > 0$ (tienen el mismo signo) y $A \neq C$, es una elipse. <!-- weight: 1.0 -->
- [x] C) Si $A = C$, la figura es una circunferencia. <!-- weight: 1.0 -->
- [ ] D) Si $A \cdot C < 0$, es una elipse vertical.
- [ ] E) Todas las ecuaciones de segundo grado representan círculos.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Un solo término al cuadrado indica crecimiento cuadrático en un eje y lineal en el otro (Parábola). B) Signos iguales significan una curva cerrada. Si los coeficientes son distintos, se estira hacia un lado (Elipse). C) Al ser iguales, el estiramiento es uniforme en todas las direcciones (Círculo).

---

## Question 11 (Análisis de Latus Rectum - Dificultad 6)

**ID:** `CO-MAT-11-conics-001-PRO-v11`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
¿Cuál es la longitud del lado recto (*Latus Rectum*) de la parábola $y^2 = 20x$?

### Opciones
- [ ] A) 5
- [ ] B) 10
- [x] C) 20 (El valor absoluto de $4p$ es la longitud del lado recto)
- [ ] D) 4

### Explicación Pedagógica
El lado recto es el ancho de la parábola en el punto del foco. Su valor es siempre $|4p|$. Como $y^2 = 20x$, la longitud es 20.

---

## Question 12 (Evaluación de Órbitas Planetarias - Dificultad 9)

**ID:** `CO-MAT-11-conics-001-PRO-v12`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
El cometa Halley tiene una órbita elíptica muy excéntrica ($e = 0.967$) con el Sol en uno de sus focos. ¿Qué podemos decir de su trayectoria comparada con la de la Tierra ($e = 0.017$)?

### Opciones
- [ ] A) La órbita de Halley es casi circular.
- [x] B) La órbita de Halley es un óvalo muy estirado, pasando muy cerca del Sol en un punto y muy lejos en el otro.
- [ ] C) Halley no viaja en elipses.
- [ ] D) La Tierra tiene una órbita más alargada que Halley.

### Explicación Pedagógica
Una excentricidad cercana a 1 ($0.967$) indica que $c$ es casi igual a $a$. Los focos están muy lejos del centro, produciendo una elipse extremadamente larga. Esto explica por qué el cometa Halley desaparece por décadas antes de volver a ser visible.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-conics-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Ingeniería de Faros:** Un fabricante de linternas coloca el filamento del bombillo exactamente en el foco de un espejo parabólico. Si la profundidad del espejo es de 4 cm y su diámetro es de 16 cm (vértice en el origen), ¿cuál es la ecuación de la parábola y a qué distancia del fondo debe ponerse el bombillo?

### Opciones
- [x] A) $x^2 = 16y$, Bombillo a 4 cm del vértice. <!-- weight: 1.0 -->
- [x] B) $p = 4$. <!-- weight: 1.0 -->
- [ ] C) $y^2 = 16x$, Bombillo a 2 cm. <!-- weight: 0.0 -->
- [ ] D) $x^2 = 4y$, Bombillo a 1 cm. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la modelación completa, B es el parámetro crítico).

### Explicación Pedagógica
1. Datos: Puntos $(\pm 8, 4)$ pertenecen a la parábola (el diámetro de 16 significa 8 a cada lado, altura 4).
2. Ecuación vertical: $x^2 = 4py$.
3. Sustituimos: $8^2 = 4(p)(4) \rightarrow 64 = 16p \rightarrow p = 4$.
4. Ecuación: $x^2 = 16y$. El bombillo (foco) debe estar a $p=4$ cm del fondo.

---

## Question 14 (Análisis Lógico de Vértices de Elipse - Dificultad 5)

**ID:** `CO-MAT-11-conics-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si en una elipse $a = 10$ y $b = 6$, ¿cuál es la longitud total del eje mayor?

### Opciones
- [ ] A) 10
- [x] B) 20 (El eje mayor es $2a$)
- [ ] C) 12
- [ ] D) 16

### Explicación Pedagógica
$a$ es el *semieje*. La distancia total de vértice a vértice es el doble, es decir, 20. El diseño requiere distinguir siempre entre "semieje" (del centro al borde) y "eje total".

---

## Question 15 (Análisis de Área de Elipse - Dificultad 8)

**ID:** `CO-MAT-11-conics-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
El área de una elipse es $\text{Area} = \pi \cdot a \cdot b$. Calcule el área de la elipse $\frac{x^2}{100} + \frac{y^2}{64} = 1$.

### Opciones
- [ ] A) $164\pi$
- [x] B) $80\pi$ ($a=10, b=8 \rightarrow 10 \cdot 8 \cdot \pi$)
- [ ] C) $100\pi$
- [ ] D) $6400\pi$

### Explicación Pedagógica
$a = \sqrt{100} = 10$.
$b = \sqrt{64} = 8$.
Área $= \pi(10)(8) = 80\pi$.
Si $a=b$, recuperamos la fórmula del área del círculo $\pi r^2$.

---

## Question 16 (Análisis de Parábola por Definición - Dificultad 7)

**ID:** `CO-MAT-11-conics-001-PRO-v16`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
La definición de parábola es el conjunto de puntos que equidistan (están a la misma distancia) de un punto fijo (foco) y una recta fija (directriz). Si un punto $P$ de una parábola está a 5 cm del foco, ¿a qué distancia está de la directriz?

### Opciones
- [ ] A) 10 cm
- [x] B) 5 cm (Por definición: dist(P, F) = dist(P, d))
- [ ] C) 2.5 cm
- [ ] D) Depende de la ubicación del vértice.

### Explicación Pedagógica
Esta propiedad es la esencia de la parábola. No importa dónde esté el punto, esas dos distancias siempre serán idénticas. Esto es lo que permite que la forma cóncava sea matemáticamente perfecta para reflejos.

---

## Question 17 (Evaluación de Gráficas de Segundo Grado - Dificultad 5)

**ID:** `CO-MAT-11-conics-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál de las siguientes ecuaciones representa una circunferencia de radio 3 centrada en $(1, -2)$?

### Opciones
- [ ] A) $(x-1)^2 + (y+2)^2 = 3$
- [x] B) $(x-1)^2 + (y+2)^2 = 9$
- [ ] C) $(x+1)^2 + (y-2)^2 = 9$
- [ ] D) $x^2 + y^2 = 9$

### Explicación Pedagógica
La ecuación es $(x-h)^2 + (y-k)^2 = r^2$.
$(x-1)^2 + (y - (-2))^2 = 3^2 \rightarrow (x-1)^2 + (y+2)^2 = 9$.

---

## Question 18 (Cálculo de Completar Cuadrados para Elipse - Dificultad 9)

**ID:** `CO-MAT-11-conics-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la ecuación $x^2 + 4y^2 - 2x - 16y + 13 = 0$. Seleccione TODAS las afirmaciones correctas tras completar cuadrados.

### Opciones
- [x] A) El centro de la elipse es $(1, 2)$. <!-- weight: 1.0 -->
- [x] B) La forma ordinaria resulta en $\frac{(x-1)^2}{4} + \frac{(y-2)^2}{1} = 1$. <!-- weight: 1.0 -->
- [x] C) El semieje mayor es horizontal y mide 2. <!-- weight: 1.0 -->
- [ ] D) Es una circunferencia de radio 4.
- [ ] E) Los focos están sobre el eje Y.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
1. Agrupar: $(x^2-2x) + 4(y^2-4y) = -13$.
2. Completar: $(x^2-2x+1) + 4(y^2-4y+4) = -13 + 1 + 16 = 4$.
3. Dividir entre 4: $\frac{(x-1)^2}{4} + \frac{(y-2)^2}{1} = 1$.
Esto confirma el centro $(1, 2)$, $a=2$ (en X) y $b=1$.

---

## Question 19 (Interpretación de Trayectorias de Proyectiles - Dificultad 5)

**ID:** `CO-MAT-11-conics-001-PRO-v19`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Galileo demostró que un proyectil lanzado sin aire sigue una trayectoria parabólica. En el punto más alto del lanzamiento (el vértice de la parábola), ¿qué sucede con la componente vertical de la velocidad?

### Opciones
- [ ] A) Es máxima.
- [x] B) Es cero (La tangente es horizontal).
- [ ] C) Cambia de positiva a negativa.
- [ ] D) Es constante.

### Explicación Pedagógica
En el vértice de una parábola vertical, la derivada es cero. En física, la derivada de la posición es la velocidad. Por tanto, el cuerpo deja de subir por un instante infinitamente pequeño antes de empezar a caer.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-conics-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

Un reactor nuclear utiliza una torre de enfriamiento con forma de **hiperboloide de revolución** (cuyo perfil es una hipérbola), pero la vasija interna de combustible se diseña para que cualquier partícula emitida tienda a ser contenida por las paredes.

Si tuviéramos que elegir una cónica para diseñar un escudo que concentre toda la radiación dispersa de un punto en un sumidero de plomo, ¿cuál de las siguientes opciones es la óptima desde el punto de vista de la ingeniería geométrica?

### Options
- [x] A) Una elipse, colocando la fuente en un foco y el sumidero en el otro. <!-- weight: 1.0 -->
- [x] B) Usar la propiedad de reflexión convergente de los focos de la elipse. <!-- weight: 1.0 -->
- [ ] C) Una parábola, para que la radiación salga disparada en línea recta hacia arriba. <!-- weight: 0.0 -->
- [ ] D) Una circunferencia, porque es el escudo más resistente. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aisla la propiedad de "foco a foco" de la elipse en contraste con la de "foco al infinito" de la parábola).

### Explicación Pedagógica
Si quieres *contener* o *concentrar* en un punto finito específico, la elipse es la ganadora (tiene dos focos cercanos). La parábola es para enviar señales a lo lejos (el foco es real pero el "otro" foco está en el infinito). La geometría analítica permite así ahorrar toneladas de material de blindaje simplemente usando la curva correcta.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 5 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 8 | weighted | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 7 | single | Analyze | Interpretación | ✅ |
| 7 | ...-v7 | 8 | single | Evaluate | Formulación | ✅ |
| 8 | ...-v8 | 6 | single | Analyze | Argumentación | ✅ |
| 9 | ...-v9 | 9 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 6 | single | Analyze | Formulación | ✅ |
| 12 | ...-v12| 9 | single | Evaluate | Argumentación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Formulación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 8 | single | Apply | Formulación | ✅ |
| 16 | ...-v16| 7 | single | Analyze | Interpretación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 9 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Argumentación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
