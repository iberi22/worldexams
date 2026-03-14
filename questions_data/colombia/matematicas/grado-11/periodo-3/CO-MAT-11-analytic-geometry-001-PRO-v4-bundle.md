---
id: "CO-MAT-11-analytic-geometry-001-PRO"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Geometría Analítica: Distancia, Rectas y Planos"
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

## Contexto 1: La Estructura del Espacio Físico
La geometría analítica es el puente entre los números y el mundo tangible. Nos permite describir la ubicación exacta de un punto en el espacio (un dron en vuelo), la trayectoria más corta entre dos ciudades (geodésicas) o la inclinación necesaria para que un techo desaloje el agua eficientemente. En el espacio tridimensional ($R^3$), las líneas pasan de ser simples dibujos en una hoja a ser vectores de dirección, y los planos se convierten en las superficies que definen desde la pantalla de tu celular hasta la base de un edificio. Este bundle explora las relaciones métricas (distancia y ángulo) que rigen nuestras construcciones.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Cuál es la distancia entre los puntos $A(1, 2)$ y $B(4, 6)$ en el plano cartesiano?

### Opciones
- [ ] A) 7 unidades
- [x] B) 5 unidades (Triángulo pitagórico: $\sqrt{(4-1)^2 + (6-2)^2} = \sqrt{3^2 + 4^2}$)
- [ ] C) 25 unidades
- [ ] D) $\sqrt{7}$ unidades

### Explicación Pedagógica
Usamos la fórmula de distancia: $d = \sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}$.
Diferencia en X: 3. Diferencia en Y: 4.
$d = \sqrt{3^2 + 4^2} = \sqrt{9+16} = 5$. Es la famosa relación 3-4-5 de la construcción clásica.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle el punto medio del segmento que une los puntos $P(-2, 5)$ y $Q(8, -3)$.

### Opciones
- [ ] A) $(6, 2)$
- [x] B) $(3, 1)$ (Promedio de coordenadas: $(-2+8)/2 = 3$ y $(5-3)/2 = 1$)
- [ ] C) $(5, 1)$
- [ ] D) $(10, 8)$

### Explicación Pedagógica
El punto medio es el promedio aritmético de las coordenadas:
$X_m = \frac{-2 + 8}{2} = 3$.
$Y_m = \frac{5 - 3}{2} = 1$.
El punto $(3, 1)$ divide al segmento en dos partes exactamente iguales.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Dada la recta $3x + 4y - 12 = 0$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Cruza el eje X en el punto $(4, 0)$. <!-- weight: 1.0 -->
- [x] B) Cruza el eje Y en el punto $(0, 3)$. <!-- weight: 1.0 -->
- [x] C) Su pendiente es $-3/4$ (negativa). <!-- weight: 1.0 -->
- [ ] D) Es paralela a la recta $y = 3x$.
- [ ] E) Pasa por el origen.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A) Si $y=0$, $3x=12 \rightarrow x=4$. B) Si $x=0$, $4y=12 \rightarrow y=3$. C) Despejando $y$: $4y = -3x + 12 \rightarrow y = -3/4 x + 3$. Como no tiene $F \neq 0$, no pasa por el origen.

---

## Question 4 (Análisis de Rectas Perpendiculares - Dificultad 6)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v4`
### Enunciado
¿Cuál es la pendiente de una recta que es perpendicular a la recta $y = 5x - 2$?

### Opciones
- [ ] A) 5
- [ ] B) -5
- [x] C) -1/5 (Pendiente recíproca y opuesta)
- [ ] D) 1/5

### Explicación Pedagógica
Para que dos rectas sean perpendiculares, el producto de sus pendientes debe ser $-1$.
$5 \cdot m_2 = -1 \rightarrow m_2 = -1/5$. Esto garantiza un ángulo de 90° exacto en el cruce.

---

## Question 5 (Genio - Dificultad 9)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Halle la distancia más corta del punto $P(2, 3)$ a la recta $4x - 3y + 6 = 0$.

### Opciones
- [x] A) 1 unidad. <!-- weight: 1.0 -->
- [x] B) $\frac{|4(2) - 3(3) + 6|}{\sqrt{4^2 + (-3)^2}} = \frac{|8 - 9 + 6|}{5} = 5/5 = 1$. <!-- weight: 1.0 -->
- [ ] C) 5 unidades. <!-- weight: 0.0 -->
- [ ] D) 0 unidades (el punto está en la recta). <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Uso correcto de la fórmula de distancia punto-recta).

### Explicación Pedagógica
La fórmula es $d = \frac{|Ax_0 + By_0 + C|}{\sqrt{A^2 + B^2}}$.
Sustituimos los valores de la recta y el punto:
$d = \frac{|4(2) - 3(3) + 6|}{5} = \frac{|5|}{5} = 1$.
Esta es la longitud del segmento perpendicular que va del punto a la línea.

---

## Contexto 2: Geometría en Tres Dimensiones (R³)
En el mundo real, los objetos tienen volumen. Para describirlos, añadimos una tercera coordenada: $z$ (altura/profundidad). Mientras que en el plano una ecuación lineal como $Ax + By = C$ es una línea, en el espacio tridimensional la ecuación $Ax + By + Cz = D$ representa un **plano**. Las líneas en el espacio se definen mejor mediante vectores de dirección, indicando hacia dónde apunta el objeto y desde dónde parte.

---

## Question 6 (Transferencia - Dificultad 8)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Transfer

### Enunciado
¿Cuál de los siguientes puntos se encuentra sobre el plano $2x + y - z = 5$?

### Opciones
- [ ] A) $(1, 1, 1)$ ($2+1-1=2 \neq 5$)
- [x] B) $(2, 3, 2)$ ($2(2) + 3 - 2 = 5$)
- [ ] C) $(0, 0, 0)$
- [ ] D) $(1, 2, 3)$

### Explicación Pedagógica
Para que un punto pertenezca a un plano (o a cualquier figura), sus coordenadas deben satisfacer la igualdad de la ecuación. En B: $4 + 3 - 2 = 5$, lo cual es verdadero.

---

## Question 7 (Análisis de Distancia en 3D - Dificultad 6)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v7`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Analyze

### Enunciado
Halle la distancia del origen $(0, 0, 0)$ al punto $(1, 2, 2)$ en el espacio 3D.

### Opciones
- [ ] A) 5
- [ ] B) 9
- [x] C) 3 ($\sqrt{1^2 + 2^2 + 2^2} = \sqrt{1+4+4} = \sqrt{9}$)
- [ ] D) $\sqrt{5}$

### Explicación Pedagógica
La distancia en 3D es una extensión directa de Pitágoras: $d = \sqrt{x^2 + y^2 + z^2}$.
$d = \sqrt{1 + 4 + 4} = 3$. Es la diagonal de una caja de $1 \times 2 \times 2$.

---

## Question 8 (Evaluación de Planos Paralelos - Dificultad 7)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v8`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Si dos planos tienen ecuaciones $3x - 2y + 5z = 10$ y $3x - 2y + 5z = 20$. ¿Cuál es su relación geométrica?

### Opciones
- [ ] A) Se cruzan formando una línea.
- [x] B) Son paralelos (Tienen el mismo vector normal pero distinta distancia al origen).
- [ ] C) Son el mismo plano.
- [ ] D) Son perpendiculares.

### Explicación Pedagógica
Los coeficientes $A, B, C$ definen el "vector normal" (la dirección hacia la que "mira" el plano). Al ser idénticos, ambos planos están orientados exactamente igual, pero al tener diferente constante $D$, están a diferentes alturas, nunca tocándose. Son como los pisos de un edificio.

---

## Question 9 (Técnica de Intersección de Rectas - Dificultad 8)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v9`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle el punto de intersección de las rectas $y = 2x + 1$ y $y = -x + 4$.

### Opciones
- [ ] A) $(0, 0)$
- [x] B) $(1, 3)$ (Igualando: $2x+1 = -x+4 \rightarrow 3x=3 \rightarrow x=1$)
- [ ] C) $(2, 5)$
- [ ] D) $(-1, 5)$

### Explicación Pedagógica
Buscamos el punto común:
$2x + 1 = -x + 4$.
$3x = 3 \rightarrow x = 1$.
Sustituyendo en cualquiera: $y = 2(1) + 1 = 3$.
Las rectas se cruzan en el punto $(1, 3)$.

---

## Question 10 (Síntesis Matemática - Dificultad 8)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Interpretación y Representación
**Bloom:** Synthesis

### Enunciado
Sobre la ecuación de una esfera $(x-h)^2 + (y-k)^2 + (z-l)^2 = r^2$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) El centro es el punto $(h, k, l)$. <!-- weight: 1.0 -->
- [x] B) Es el conjunto de todos los puntos en 3D que están a una distancia $r$ del centro. <!-- weight: 1.0 -->
- [ ] C) Si $l = 0$, la figura es un círculo en el plano XY. (Solo si $z=0$, si no, sigue siendo esfera).
- [x] D) La superficie de la esfera tiene área $4\pi r^2$. <!-- weight: 1.0 -->
- [ ] E) Representa un cubo de lado $2r$.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B) Definen la esfera como la extensión natural del círculo. D) Es una fórmula geométrica fundamental. La esfera es el sólido más eficiente, conteniendo el mayor volumen con el menor área superficial posible.

---

## Question 11 (Análisis de Ángulo entre Rectas - Dificultad 9)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v11`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Un diseño arquitectónico requiere que dos vigas de soporte (rectas) tengan pendientes $m_1 = 1/2$ y $m_2 = -2$. ¿Qué podemos decir de la unión de estas dos vigas?

### Opciones
- [ ] A) Están separadas por un ángulo de 45°.
- [x] B) Forman un ángulo recto (90°) perfecto.
- [ ] C) Son paralelas y nunca se unen.
- [ ] D) Forman un ángulo agudo de 30°.

### Explicación Pedagógica
Como $1/2 \cdot -2 = -1$, se cumple la condición de perpendicularidad. En ingeniería, este cruce es el más estable mecánicamente para distribuir cargas.

---

## Question 12 (Evaluación de Distancia entre Rectas Paralelas - Dificultad 7)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v12`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
¿Cuál es la distancia entre las rectas paralelas $y = 3x + 1$ y $y = 3x + 11$? (Hint: Use un punto de una recta y la fórmula de distancia a la otra).

### Opciones
- [ ] A) 10 unidades
- [x] B) $\sqrt{10} \approx 3.16$ (Usando punto $(0, 1)$ en $3x - y + 11 = 0 \rightarrow 10/\sqrt{3^2+1^2}$)
- [ ] C) 3 unidades
- [ ] D) 3.33 unidades

### Explicación Pedagógica
Punto en $L_1$: $x=0 \rightarrow y=1$. Punto $P(0, 1)$.
Recta $L_2$: $3x - y + 11 = 0$.
$d = \frac{|3(0) - 1(1) + 11|}{\sqrt{3^2 + (-1)^2}} = \frac{10}{\sqrt{10}} = \sqrt{10}$.
Aunque la separación vertical es 10, la distancia real (perpendicular) es mucho menor.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**Vuelo de Drones:** Un dron vuela en línea recta desde el punto $(0, 0, 0)$ hacia el punto $(10, 10, 10)$. Un segundo dron viaja sobre el plano $z = 5$.

Si las trayectorias se cruzaran, ¿en qué punto del espacio ocurriría la colisión?

### Opciones
- [x] A) $(5, 5, 5)$. <!-- weight: 1.0 -->
- [x] B) El punto donde la recta $x=y=z$ intercepta al plano $z=5$. <!-- weight: 1.0 -->
- [ ] C) $(10, 10, 5)$. <!-- weight: 0.0 -->
- [ ] E) No se pueden cruzar porque son drones. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (A es la solución numérica, B es la lógica geométrica).

### Explicación Pedagógica
La trayectoria del primer dron cumple $x=y=z$ (viaja en diagonal perfecta). El plano que ocupa el segundo dron obliga a que $z$ sea siempre 5. Para que ambos estén en el mismo lugar, el primer dron debe llegar a la altura $z=5$. En ese momento, sus otras coordenadas también serán 5. La intersección es $(5, 5, 5)$.

---

## Question 14 (Análisis Lógico de Proyecciones - Dificultad 5)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v14`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si proyectamos el punto $P(3, 4, 7)$ sobre el plano XY (el "piso"), ¿cuáles son sus nuevas coordenadas?

### Opciones
- [ ] A) $(0, 0, 0)$
- [x] B) $(3, 4, 0)$ (La altura $z$ se hace cero, $x$ e $y$ permanecen iguales)
- [ ] C) $(0, 0, 7)$
- [ ] D) $(3, 4, 7)$ (No cambió)

### Explicación Pedagógica
La proyección sobre un plano implica "aplastar" el objeto contra él. En el plano XY, el valor de la altura ($z$) desaparece, pero la ubicación en el mapa horizontal ($x, y$) se conserva. Es la "sombra" del punto al mediodía.

---

## Question 15 (Análisis de Área de Triángulo por Coordenadas - Dificultad 9)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v15`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Apply

### Enunciado
Halle el área del triángulo cuyos vértices son $(0, 0)$, $(4, 0)$ y $(0, 6)$.

### Opciones
- [ ] A) 24
- [x] B) 12 (Base de 4, altura de 6 $\rightarrow 4 \cdot 6 / 2$)
- [ ] C) 10
- [ ] D) $4\pi$

### Explicación Pedagógica
Es un triángulo rectángulo. El cateto sobre X mide 4 unidades. El cateto sobre Y mide 6 unidades.
Área $= \frac{base \cdot altura}{2} = \frac{4 \cdot 6}{2} = 12$.
La geometría analítica permite calcular áreas de polígonos complejos simplemente conociendo sus esquinas.

---

## Question 16 (Análisis de Traslación de Líneas - Dificultad 5)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v16`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Si movemos la recta $y = 2x$ tres unidades hacia arriba, ¿cuál es su nueva ecuación?

### Opciones
- [ ] A) $y = 5x$
- [ ] B) $y = 2x - 3$
- [x] C) $y = 2x + 3$
- [ ] D) $y = 2(x + 3)$

### Explicación Pedagógica
Mover una gráfica verticalmente equivale a sumar el valor del desplazamiento a la salida de la función ($y$). La inclinación (pendiente) no cambia, solo el punto de cruce con el eje vertical.

---

## Question 17 (Evaluación de Ecuación de Plano - Dificultad 5)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v17`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
¿Qué figura geométrica representa en el espacio 3D la ecuación $z = 4$?

### Opciones
- [ ] A) Una línea vertical que pasa por el 4.
- [ ] B) Un punto ubicado en $(0, 0, 4)$.
- [x] C) Un plano horizontal paralelo al plano XY que está a una altura de 4 unidades.
- [ ] D) Una esfera de radio 4.

### Explicación Pedagógica
Como $x$ e $y$ no están restringidos, pueden tomar cualquier valor. Todos los puntos que tienen altura 4 forman una superficie infinita y plana. Es como el techo de una habitación.

---

## Question 18 (Cálculo de Bisectriz - Dificultad 8)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v18`
**Type:** `multi-correct`
**ICFES:** Argumentación
**Bloom:** Synthesis

### Enunciado
Sobre la recta $y = x$. Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) Pasa por el origen $(0, 0)$. <!-- weight: 1.0 -->
- [x] B) Sus puntos tienen coordenadas idénticas (ej. $10, 10$). <!-- weight: 1.0 -->
- [x] C) Forma un ángulo de 45° con ambos ejes. <!-- weight: 1.0 -->
- [ ] D) Es perpendicular a la recta $y = 2x$.
- [ ] E) Es una asíntota vertical.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, C) Esta es la "recta identidad". Divide al primer cuadrante en dos ángulos iguales de 45°. En economía, representa el equilibrio donde lo que sale es igual a lo que entra (bisectriz del crecimiento).

---

## Question 19 (Interpretación de Coeficientes de Recta - Dificultad 5)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v19`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
Dada la recta $y = -2x + 10$. Si aumentamos la pendiente de -2 a -1, ¿qué le sucede a la gráfica?

### Opciones
- [ ] A) Se vuelve más inclinada (cae más rápido).
- [x] B) Se vuelve menos inclinada (cae más lento).
- [ ] C) Se mueve hacia la derecha.
- [ ] D) Se vuelve horizontal.

### Explicación Pedagógica
Una pendiente de -2 es más "fuerte" que una de -1. Al pasar a -1, la recta sigue bajando pero con un ángulo menos pronunciado respecto a la horizontal. La pendiente mide la "agresividad" del cambio.

---

## Question 20 (Genio de Transferencia Total - Dificultad 10)

**ID:** `CO-MAT-11-analytic-geometry-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** synthesis

### Enunciado
**MASTER INTEGRATION:**

En procesamiento de imágenes y videojuegos 3D, para saber si un personaje "está pisando el suelo", la computadora calcula la distancia entre el punto del pie $(x, y, z)$ y el plano de la superficie del escenario.

Si el personaje está en $(10, 10, 6)$ y el suelo es el plano $z = 5$:

### Options
- [x] A) El personaje está a 1 unidad por encima del suelo. <!-- weight: 1.0 -->
- [x] B) La distancia es simplemente $(z_{pie} - z_{suelo})$. <!-- weight: 1.0 -->
- [ ] C) El personaje está atravesando el suelo porque $10 > 5$. <!-- weight: 0.0 -->
- [ ] D) No se puede saber sin conocer las coordenadas $x, y$. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica la simplicidad de la distancia vertical a un plano horizontal).

### Explicación Pedagógica
Como el plano es horizontal ($z=5$), las coordenadas $x, y$ no afectan la distancia vertical (siempre caerás al mismo nivel sin importar dónde estés en el mapa). La distancia es simplemente la resta de las alturas: $6 - 5 = 1$. Este es el cálculo más básico y repetido millones de veces por segundo en el motor de un videojuego.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Interpretación | ✅ |
| 2 | ...-v2 | 6 | single | Evaluate | Formulación | ✅ |
| 3 | ...-v3 | 7 | multi-correct | Synthesis | Argumentación | ✅ |
| 4 | ...-v4 | 6 | single | Analyze | Interpretación | ✅ |
| 5 | ...-v5 | 9 | weighted | Evaluate | Formulación | ✅ |
| 6 | ...-v6 | 8 | single | Transfer | Interpretación | ✅ |
| 7 | ...-v7 | 6 | single | Analyze | Formulación | ✅ |
| 8 | ...-v8 | 7 | single | Evaluate | Argumentación | ✅ |
| 9 | ...-v9 | 8 | single | Apply | Formulación | ✅ |
| 10 | ...-v10| 8 | multi-correct | Synthesis | Interpretación | ✅ |
| 11 | ...-v11| 9 | single | Analyze | Argumentación | ✅ |
| 12 | ...-v12| 7 | single | Evaluate | Formulación | ✅ |
| 13 | ...-v13| 10| weighted | Transfer | Formulación | ✅ |
| 14 | ...-v14| 5 | single | Analyze | Interpretación | ✅ |
| 15 | ...-v15| 9 | single | Apply | Formulación | ✅ |
| 16 | ...-v16| 5 | single | Analyze | Interpretación | ✅ |
| 17 | ...-v17| 5 | single | Analyze | Interpretación | ✅ |
| 18 | ...-v18| 8 | multi-correct | Synthesis | Argumentación | ✅ |
| 19 | ...-v19| 5 | single | Analyze | Interpretación | ✅ |
| 20 | ...-v20| 10| weighted | Synthesis | Argumentación | ✅ |
