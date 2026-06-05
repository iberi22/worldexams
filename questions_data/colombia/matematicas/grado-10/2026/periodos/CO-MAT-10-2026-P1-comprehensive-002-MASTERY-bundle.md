---
id: "CO-MAT-10-2026-P1-comprehensive-002-MASTERY"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "recta-parametrizacion, producto-punto, secciones-conicas, logaritmos"
periodo: 1
protocol_version: "5.2"
bundle_index: 2
bundle_size: 20
alignment: "DBA MEN + Pre-ICFES"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "recta_parametrizacion_vectorial, producto_punto_vectores, circunferencia_y_elipse, propiedades_logaritmos, ecuaciones_logaritmicas"
---

# Bundle MASTERY Grado 10 — Matematicas, Periodo 1, Bundle 002

Bundle de periodo 1 para grado 10, alineado con DBA MEN y preparacion Pre-Saber 11. Temas: parametrizacion de la recta, producto punto entre vectores, secciones conicas (circunferencia y elipse), y propiedades de logaritmos.

---

## Question 1 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicacion y Representacion

**Context:** En clase de geometria vectorial en el Colegio INEM de Cali, el profesor escribe en el tablero una ecuacion parametrica.

### Enunciado
Una recta en el plano se expresa parametricamente como:
\[
\begin{cases}
x = 2 + 3t \\
y = -1 + 4t
\end{cases}
\]
Que representa el vector (3, 4) en esta parametrizacion?

### Options
- [ ] A) Un punto por donde pasa la recta <!-- feedback: Incorrecto. El punto por donde pasa la recta esta dado por (2, -1) cuando t=0. -->
- [x] B) El vector director de la recta <!-- feedback: Correcto. En la ecuacion parametrica (x, y) = (x0, y0) + t-(a, b), el vector (a, b) es el vector director que indica la direccion de la recta. -->
- [ ] C) La pendiente de la recta <!-- feedback: Incorrecto. La pendiente se deriva de la direccion, pero el vector (3,4) especificamente es el vector director, no la pendiente. -->
- [ ] D) La distancia desde el origen hasta la recta <!-- feedback: Incorrecto. La distancia no se obtiene directamente del vector director. -->

### Explicacion Pedagogica
La ecuacion parametrica de una recta tiene la forma P = P0 + t-v, donde P0 es un punto de la recta y v es el vector director. En este caso, P0 = (2, -1) y v = (3, 4). Al variar t, se recorren todos los puntos de la recta en la direccion de v.

---

## Question 2 (Difficulty D3)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicacion y Representacion

**Context:** En el laboratorio de matematicas del Colegio San Jose de Barranquilla, los estudiantes exploran operaciones con vectores.

### Enunciado
Dados dos vectores \(\vec{u} = (3, -2)\) y \(\vec{v} = (1, 4)\), cual es el resultado del producto punto \(\vec{u} \cdot \vec{v}\)?

### Options
- [ ] A) 14 <!-- feedback: Incorrecto. 3(1) + (-2)(4) = 3 - 8 = -5, no 14. Probablemente sumaste sin considerar los signos. -->
- [x] B) -5 <!-- feedback: Correcto. \(\vec{u} \cdot \vec{v} = 3(1) + (-2)(4) = 3 - 8 = -5\). -->
- [ ] C) 11 <!-- feedback: Incorrecto. 3+4+(-2)+1 no es la forma correcta de calcular el producto punto. -->
- [ ] D) 5 <!-- feedback: Incorrecto. Obtuviste 3 - 8 y cambiaste el signo. El resultado correcto es -5. -->

### Explicacion Pedagogica
El producto punto entre dos vectores en R^2 se calcula como la suma de los productos de sus componentes correspondientes: \(\vec{u} \cdot \vec{v} = u_1 v_1 + u_2 v_2\). El resultado es un escalar, no un vector. Si el producto punto es negativo, los vectores forman un angulo obtuso.

---

## Question 3 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentacion

**Context:** En clase de algebra en un colegio de Bogota, la profesora explica las propiedades de los logaritmos.

### Enunciado
Cual de las siguientes expresiones es equivalente a \(\log_2(8) + \log_2(4)\)?

### Options
- [ ] A) \(\log_2(12)\) <!-- feedback: Incorrecto. Los logaritmos no se suman sumando sus argumentos. -->
- [x] B) 5 <!-- feedback: Correcto. \(\log_2(8) = 3\) porque \(2^3 = 8\), y \(\log_2(4) = 2\) porque \(2^2 = 4\). 3 + 2 = 5. -->
- [ ] C) \(\log_2(32)\) <!-- feedback: Incorrecto. Aunque \(\log_2(8) + \log_2(4) = \log_2(32) = 5\), la expresion simplificada es 5. -->
- [ ] D) \(\log_4(32)\) <!-- feedback: Incorrecto. La base del logaritmo no cambia al sumar logaritmos de igual base. -->

### Explicacion Pedagogica
Por definicion, \(\log_b(a) = c\) significa que \(b^c = a\). Asi, \(\log_2(8) = 3\) y \(\log_2(4) = 2\). La suma es \(3 + 2 = 5\). La propiedad general dice que \(\log_b(x) + \log_b(y) = \log_b(xy)\), que en este caso da \(\log_2(32) = 5\), mismo resultado.

---

## Question 4 (Difficulty D4)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentacion

**Context:** En la clase de geometria analitica en Medellin, se estudian las secciones conicas.

### Enunciado
Cual de las siguientes ecuaciones representa una circunferencia con centro en (2, -3) y radio 5?

### Options
- [ ] A) \((x + 2)^2 + (y - 3)^2 = 5\) <!-- feedback: Incorrecto. Los signos indican centro en (-2, 3) y radio \(\sqrt{5}\). -->
- [x] B) \((x - 2)^2 + (y + 3)^2 = 25\) <!-- feedback: Correcto. La ecuacion canonica de la circunferencia es (x - h)^2 + (y - k)^2 = r^2. -->
- [ ] C) \((x - 2)^2 + (y - 3)^2 = 25\) <!-- feedback: Incorrecto. El centro seria (2, 3), cuando deberia ser (2, -3). -->
- [ ] D) \((x + 2)^2 + (y + 3)^2 = 25\) <!-- feedback: Incorrecto. El centro seria (-2, -3), no (2, -3). -->

### Explicacion Pedagogica
La ecuacion canonica de una circunferencia con centro en (h, k) y radio r es \((x - h)^2 + (y - k)^2 = r^2\). Para centro en (2, -3), tenemos h = 2 y k = -3, lo que da \((x - 2)^2 + (y - (-3))^2 = (x - 2)^2 + (y + 3)^2 = r^2\), y con radio 5, r^2 = 25.

---

## Question 5 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Resolucion de Problemas

**Context:** Un ingeniero en construccion en Pereira necesita determinar si dos paredes son perpendiculares usando vectores de posicion.

### Enunciado
Dos vectores representan las direcciones de dos paredes: \(\vec{a} = (6, 2)\) y \(\vec{b} = (-1, 3)\). Son perpendiculares estos dos vectores?

### Options
- [x] A) Si, porque el producto punto es cero <!-- feedback: Correcto. \(\vec{a} \cdot \vec{b} = 6(-1) + 2(3) = -6 + 6 = 0\). Dos vectores son perpendiculares si su producto punto es 0. -->
- [ ] B) No, porque las magnitudes son diferentes <!-- feedback: Incorrecto. La perpendicularidad no depende de la magnitud de los vectores sino de su producto punto. -->
- [ ] C) Si, porque las pendientes son inversas <!-- feedback: Incorrecto. La condicion de perpendicularidad es que el producto de las pendientes sea -1, no que sean inversas. Pendiente de a es 1/3, de b es -3, y (1/3)(-3) = -1, asi que en este caso si son perpendiculares, pero la razon correcta es que el producto punto es 0. -->
- [ ] D) No, porque el producto punto es negativo <!-- feedback: Incorrecto. El producto punto es exactamente 0. 6(-1) + 2(3) = 0. -->

### Explicacion Pedagogica
Dos vectores son perpendiculares (ortogonales) si y solo si su producto punto es igual a cero. Esto se debe a que \(\vec{a} \cdot \vec{b} = |\vec{a}||\vec{b}|\cos\theta\), y \(\cos 90^\circ = 0\). En este caso, \(\vec{a} \cdot \vec{b} = 0\), confirmando que son perpendiculares.

---

## Question 6 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Resolucion de Problemas

**Context:** En un experimento de fisica en el Colegio de La Salle en Bogota, los estudiantes calculan trayectorias parabolica.

### Enunciado
Una pelota se lanza desde el origen con velocidad inicial dada por el vector \(\vec{v} = (10, 15)\) m/s. Cual es la rapidez (magnitud de la velocidad) inicial de la pelota?

### Options
- [x] A) \(\sqrt{325}\) m/s \(\approx\) 18.03 m/s <!-- feedback: Correcto. La magnitud de un vector (a, b) es \(\sqrt{a^2 + b^2} = \sqrt{10^2 + 15^2} = \sqrt{100 + 225} = \sqrt{325}\). -->
- [ ] B) 25 m/s <!-- feedback: Incorrecto. Esto seria 10 + 15, pero la magnitud no es la suma de componentes, sino la raiz cuadrada de la suma de cuadrados. -->
- [ ] C) 12.5 m/s <!-- feedback: Incorrecto. Calculaste el promedio de las componentes, no la magnitud del vector. -->
- [ ] D) \(\sqrt{125}\) m/s \(\approx\) 11.18 m/s <!-- feedback: Incorrecto. Posiblemente calculaste \(\sqrt{10^2 + 5^2}\) o un error similar. -->

### Explicacion Pedagogica
La magnitud (o norma) de un vector \(\vec{v} = (v_x, v_y)\) en el plano se calcula como \(|\vec{v}| = \sqrt{v_x^2 + v_y^2}\), que es una aplicacion directa del teorema de Pitagoras. La rapidez es la magnitud del vector velocidad.

---

## Question 7 (Difficulty D5)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Comunicacion y Representacion

**Context:** En un taller de matematicas en Cartagena, los estudiantes resuelven ecuaciones logaritmicas.

### Enunciado
Resuelve la ecuacion: \(\log_3(x) = 4\)

### Options
- [ ] A) 12 <!-- feedback: Incorrecto. Estas confundiendo logaritmo con multiplicacion: \(3 \times 4 = 12\), pero eso no es correcto. -->
- [x] B) 81 <!-- feedback: Correcto. \(\log_3(x) = 4\) implica que \(x = 3^4 = 81\). -->
- [ ] C) 64 <!-- feedback: Incorrecto. \(4^3 = 64\), pero la base es 3, no 4. Se debe calcular \(3^4\). -->
- [ ] D) 7 <!-- feedback: Incorrecto. Sumaste 3 + 4 = 7, pero la relacion logaritmica no es una suma. -->

### Explicacion Pedagogica
Para resolver una ecuacion logaritmica simple como \(\log_b(x) = c\), se usa la definicion: \(x = b^c\). Aqui, \(\log_3(x) = 4\) significa que \(x = 3^4 = 3 \times 3 \times 3 \times 3 = 81\).

---

## Question 8 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Resolucion de Problemas

**Context:** En un colegio de Bucaramanga, la profesora de matematicas pide calcular la distancia entre un punto y una recta usando proyecciones vectoriales.

### Enunciado
Dados el punto \(P(1, 2)\) y la recta \(r\) que pasa por \(A(0, 0)\) con vector director \(\vec{v} = (3, 4)\), cual es la distancia perpendicular del punto P a la recta r?

### Options
- [ ] A) \(\sqrt{5}\) <!-- feedback: Incorrecto. La distancia no es la magnitud del vector AP sin proyectar. Debes proyectar sobre un vector normal. -->
- [ ] B) \(\sqrt{5}\) <!-- feedback: Incorrecto. La distancia no es la magnitud del vector AP sin proyectar. Usa un vector normal. -->
- [x] C) \(\frac{2}{5}\) <!-- feedback: Correcto. Con vector normal \(\vec{n}=(-4,3)\), \(\vec{AP}=(1,2)\), \(d = |\vec{AP} \cdot \vec{n}| / |\vec{v}| = |-4+6|/5 = 2/5\). -->
- [ ] D) \(\frac{11}{5}\) <!-- feedback: Incorrecto. Probablemente calculaste mal el producto punto o la magnitud del vector director. -->

### Explicacion Pedagogica
La distancia de un punto a una recta se calcula usando un vector normal. Para \(\vec{v} = (3,4)\), un vector normal es \(\vec{n} = (-4,3)\). El vector \(\vec{AP} = (1,2)\) y la distancia es \(\frac{|(1,2) \cdot (-4,3)|}{\sqrt{3^2+4^2}} = \frac{|-4+6|}{5} = \frac{2}{5}\).

---

## Question 9 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Resolucion de Problemas

**Context:** En un proyecto escolar de diseno grafico en Manizales, los estudiantes usan transformaciones geometricas con vectores.

### Enunciado
Un disenador quiere reflejar un punto \(A(3, 2)\) con respecto al origen de coordenadas. Usando vectores, cuales son las coordenadas del punto reflejado A'?

### Options
- [ ] A) (3, -2) <!-- feedback: Incorrecto. Esto seria una reflexion sobre el eje X, no sobre el origen. -->
- [ ] B) (-3, 2) <!-- feedback: Incorrecto. Esto seria una reflexion sobre el eje Y, no sobre el origen. -->
- [x] C) (-3, -2) <!-- feedback: Correcto. Reflejar sobre el origen equivale a multiplicar el vector de posicion por -1: \(-(3, 2) = (-3, -2)\). -->
- [ ] D) (6, 4) <!-- feedback: Incorrecto. Esto seria una dilatacion (multiplicar por 2), no una reflexion. -->

### Explicacion Pedagogica
Reflejar un punto con respecto al origen de coordenadas equivale a aplicar la transformacion vectorial \(\vec{A'} = -\vec{A}\). Esto cambia el signo de ambas coordenadas y equivale a una rotacion de 180 grados alrededor del origen.

---

## Question 10 (Difficulty D6)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Resolucion de Problemas

**Context:** Un profesor en Neiva explica que la intensidad del sonido se mide en decibelios usando logaritmos.

### Enunciado
La formula para calcular decibelios es \(dB = 10 \cdot \log_{10}\left(\frac{I}{I_0}\right)\), donde \(I_0\) es la intensidad de referencia. Si un sonido tiene una intensidad \(I = 1000 I_0\), cuantos decibelios produce?

### Options
- [ ] A) 10 dB <!-- feedback: Incorrecto. \(\log_{10}(1000) = 3\), no 1. -->
- [x] B) 30 dB <!-- feedback: Correcto. \(\log_{10}(1000) = 3\), y \(10 \times 3 = 30\) dB. -->
- [ ] C) 1000 dB <!-- feedback: Incorrecto. No se reemplaza directamente I por 1000. La formula usa el logaritmo de la razon. -->
- [ ] D) 3 dB <!-- feedback: Incorrecto. Olvidaste multiplicar por 10. La formula completa da \(10 \cdot 3 = 30\). -->

### Explicacion Pedagogica
La escala de decibelios es logaritmica porque el oido humano percibe los sonidos en escalas logaritmicas. \(\log_{10}(1000) = 3\) porque \(10^3 = 1000\). Luego \(10 \times 3 = 30\) dB. Esto significa que un sonido 1000 veces mas intenso que el umbral de audicion produce 30 dB.

---

## Question 11 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentacion

**Context:** En la clase de geometria vectorial en Popayan, se analizan las propiedades del producto punto.

### Enunciado
Sean \(\vec{u}\) y \(\vec{v}\) dos vectores no nulos tales que \(\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\). Que se puede afirmar sobre estos vectores?

### Options
- [ ] A) Son perpendiculares <!-- feedback: Incorrecto. Para vectores perpendiculares el producto punto es 0. -->
- [x] B) Son paralelos y apuntan en la misma direccion <!-- feedback: Correcto. \(\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta = |\vec{u}||\vec{v}|\) implica que \(\cos\theta = 1\), por lo que \(\theta = 0^\circ\). -->
- [ ] C) Son paralelos y apuntan en direcciones opuestas <!-- feedback: Incorrecto. Si apuntaran en direcciones opuestas, \(\cos 180^\circ = -1\) y el producto punto seria \(-|\vec{u}||\vec{v}|\). -->
- [ ] D) No se puede determinar ninguna relacion <!-- feedback: Incorrecto. Si se puede determinar. La relacion \(\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\) permite concluir que \(\theta = 0^\circ\). -->

### Explicacion Pedagogica
El producto punto tiene una definicion equivalente: \(\vec{u} \cdot \vec{v} = |\vec{u}||\vec{v}|\cos\theta\), donde \(\theta\) es el angulo entre los vectores. Si el producto punto es igual al producto de las magnitudes, entonces \(\cos\theta = 1\), lo que implica \(\theta = 0^\circ\): los vectores tienen la misma direccion y sentido.

---

## Question 12 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Comunicacion y Representacion

**Context:** En una clase de calculo en el Colegio Champagnat de Bogota, se analiza la ecuacion general de las conicas.

### Enunciado
La ecuacion \(x^2 + y^2 - 6x + 4y - 12 = 0\) corresponde a:

### Options
- [ ] A) Una parabola <!-- feedback: Incorrecto. La ecuacion tiene terminos cuadraticos en ambas variables (\(x^2\) y \(y^2\)), lo que no corresponde a una parabola. -->
- [x] B) Una circunferencia con centro en (3, -2) y radio 5 <!-- feedback: Correcto. Completando cuadrados: \((x-3)^2 + (y+2)^2 = 25\). -->
- [ ] C) Una elipse <!-- feedback: Incorrecto. Los coeficientes de \(x^2\) y \(y^2\) son iguales (ambos 1), lo que sugiere una circunferencia, no una elipse. -->
- [ ] D) Una circunferencia con centro en (-3, 2) <!-- feedback: Incorrecto. Al completar cuadrados: \(x^2 - 6x = (x-3)^2 - 9\), no \((x+3)^2\). -->

### Explicacion Pedagogica
Para identificar la conica, se completan cuadrados:
\[x^2 - 6x + y^2 + 4y = 12\]
\[(x^2 - 6x + 9) + (y^2 + 4y + 4) = 12 + 9 + 4\]
\[(x - 3)^2 + (y + 2)^2 = 25\]
Es una circunferencia con centro C(3, -2) y radio r = 5. Como los coeficientes de \(x^2\) y \(y^2\) son iguales, se descarta elipse y parabola.

---

## Question 13 (Difficulty D7)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentacion

**Context:** En un laboratorio de ciencias en Ibague, se modela el decaimiento de una muestra con \(\log_{10}(N) = -0.03t + 2\), donde N es la cantidad y t el tiempo en horas.

### Enunciado
Despues de cuantas horas la cantidad N sera 1?

### Options
- [ ] A) Aproximadamente 33.3 horas <!-- feedback: Incorrecto. Resuelve correctamente: \(\log_{10}(1) = 0\), entonces \(0 = -0.03t + 2\), \(t = 2/0.03 = 66.67\). -->
- [ ] B) 2 horas <!-- feedback: Incorrecto. Confundiste el logaritmo con el valor de la variable. -->
- [x] C) Aproximadamente 66.67 horas <!-- feedback: Correcto. \(\log_{10}(1) = 0\), entonces \(0 = -0.03t + 2\), \(2 = 0.03t\), \(t = 2/0.03 = 66.67\) horas. -->
- [ ] D) 100 horas <!-- feedback: Incorrecto. No hay fundamento en la ecuacion para este valor. -->

### Explicacion Pedagogica
Cuando N = 1, \(\log_{10}(1) = 0\) porque \(10^0 = 1\). Sustituyendo: \(0 = -0.03t + 2\), despejamos \(-0.03t = -2\), \(t = 2/0.03 \approx 66.67\) horas. Esto modela el tiempo de decaimiento hasta que quede una unidad de la muestra.

---

## Question 14 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentacion

**Context:** En clase de geometria vectorial en Santa Marta, se analiza una propiedad fundamental del producto punto.

### Enunciado
Dados los vectores \(\vec{a} = (2, -1, 3)\), \(\vec{b} = (1, 4, -2)\) y \(\vec{c} = (1, -1, -1)\), cual de las siguientes afirmaciones es correcta?

### Options
- [ ] A) \(\vec{a}\) y \(\vec{b}\) son ortogonales <!-- feedback: Incorrecto. \(\vec{a} \cdot \vec{b} = 2(1) + (-1)(4) + 3(-2) = 2 - 4 - 6 = -8 \neq 0\). -->
- [ ] B) \(\vec{a}\) y \(\vec{c}\) son ortogonales <!-- feedback: Incorrecto. Aunque en este caso particular \(\vec{a} \cdot \vec{c} = 0\), esta opcion esta aqui como distractor. -->
- [x] C) \(\vec{b}\) y \(\vec{c}\) son ortogonales <!-- feedback: Incorrecto. \(\vec{b} \cdot \vec{c} = 1(1) + 4(-1) + (-2)(-1) = 1 - 4 + 2 = -1 \neq 0\). -->
- [ ] D) Solo \(\vec{a}\) y \(\vec{c}\) son ortogonales <!-- feedback: Correcto. \(\vec{a} \cdot \vec{c} = 2(1) + (-1)(-1) + 3(-1) = 2 + 1 - 3 = 0\). Los otros productos punto no son cero. -->

### Explicacion Pedagogica
Dos vectores son ortogonales si su producto punto es cero. Calculamos:
- \(\vec{a} \cdot \vec{b} = 2(1) + (-1)(4) + 3(-2) = 2 - 4 - 6 = -8 \neq 0\)
- \(\vec{a} \cdot \vec{c} = 2(1) + (-1)(-1) + 3(-1) = 2 + 1 - 3 = 0\) (ortogonales!)
- \(\vec{b} \cdot \vec{c} = 1(1) + 4(-1) + (-2)(-1) = 1 - 4 + 2 = -1 \neq 0\)

---

## Question 15 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentacion

**Context:** Una empresa de logistica en Medellin usa vectores para optimizar rutas de entrega.

### Enunciado
Un camion de reparto hace dos desplazamientos consecutivos. Primero se desplaza 4 km al este y 3 km al norte (\(\vec{d_1} = (4, 3)\)), luego 2 km al oeste y 5 km al sur (\(\vec{d_2} = (-2, -5)\)). Cual es el desplazamiento neto del camion?

### Options
- [ ] A) (6, 8) km <!-- feedback: Incorrecto. Sumaste las componentes sin considerar los signos negativos del segundo desplazamiento. -->
- [x] B) (2, -2) km <!-- feedback: Correcto. \(\vec{d}_{neto} = (4 + (-2), 3 + (-5)) = (2, -2)\). El camion termino 2 km al este y 2 km al sur de su punto de partida. -->
- [ ] C) (6, -2) km <!-- feedback: Incorrecto. Sumaste las componentes x como positivas: 4 + (-2) = 2, no 6. -->
- [ ] D) (2, 8) km <!-- feedback: Incorrecto. Las componentes y se suman como 3 + (-5) = -2, no 8. -->

### Explicacion Pedagogica
El desplazamiento neto es la suma vectorial de los desplazamientos individuales: \(\vec{d}_{neto} = \vec{d_1} + \vec{d_2} = (4 + (-2), 3 + (-5)) = (2, -2)\). Esto significa que el camion termino 2 km al este y 2 km al sur de su origen.

---

## Question 16 (Difficulty D8)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v16`
**Bloom:** Evaluate
**ICFES:** Resolucion de Problemas

**Context:** Un arquitecto en Cartagena esta disenando una plaza circular. En el plano, la plaza esta delimitada por la ecuacion \(x^2 + y^2 - 10x + 6y + 9 = 0\).

### Enunciado
Cual es el area de la plaza circular?

### Options
- [ ] A) \(9\pi\) unidades cuadradas <!-- feedback: Incorrecto. El 9 en la ecuacion original no es el radio al cuadrado. Hay que completar cuadrados. -->
- [ ] B) \(16\pi\) unidades cuadradas <!-- feedback: Incorrecto. Completando: \((x-5)^2 + (y+3)^2 = 25\). El radio es 5, no 4. -->
- [x] C) \(25\pi\) unidades cuadradas <!-- feedback: Correcto. Completando cuadrados: \((x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9 = 25\). Radio r = 5, area = \(\pi \cdot 5^2 = 25\pi\). -->
- [ ] D) \(5\pi\) unidades cuadradas <!-- feedback: Incorrecto. El area es \(\pi r^2\), no \(\pi r\). El radio es 5, asi que \(25\pi\). -->

### Explicacion Pedagogica
Completamos cuadrados en x y y:
\(x^2 - 10x + y^2 + 6y = -9\)
\((x^2 - 10x + 25) + (y^2 + 6y + 9) = -9 + 25 + 9\)
\((x - 5)^2 + (y + 3)^2 = 25\)
Radio r = 5. Area = \(\pi r^2 = \pi \cdot 25 = 25\pi\) unidades cuadradas.

---

## Question 17 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentacion

**Context:** En una competencia de robotica en Bogota, un robot debe moverse siguiendo la trayectoria definida por la ecuacion parametrica de una elipse.

### Enunciado
La trayectoria de un robot esta dada por:
\[
\begin{cases}
x = 3 + 4\cos(t) \\
y = -1 + 3\sin(t)
\end{cases}
\]
Cual es la ecuacion cartesiana de la trayectoria?

### Options
- [ ] A) \(\frac{(x-3)^2}{9} + \frac{(y+1)^2}{16} = 1\) <!-- feedback: Incorrecto. Los semiejes estan intercambiados: a=4 (con x) y b=3 (con y). -->
- [ ] B) \(\frac{(x+3)^2}{4} + \frac{(y-1)^2}{3} = 1\) <!-- feedback: Incorrecto. Los signos del centro estan invertidos y los denominadores no estan al cuadrado. -->
- [x] C) \(\frac{(x-3)^2}{16} + \frac{(y+1)^2}{9} = 1\) <!-- feedback: Correcto. \(\cos t = (x-3)/4\), \(\sin t = (y+1)/3\), y \(\cos^2 t + \sin^2 t = 1\). -->
- [ ] D) \((x-3)^2 + (y+1)^2 = 25\) <!-- feedback: Incorrecto. Esta es una circunferencia, pero los coeficientes 4 y 3 diferentes indican una elipse. -->

### Explicacion Pedagogica
De las ecuaciones parametricas, despejamos \(\cos t = \frac{x-3}{4}\) y \(\sin t = \frac{y+1}{3}\). Usando la identidad \(\cos^2 t + \sin^2 t = 1\):
\[\frac{(x-3)^2}{16} + \frac{(y+1)^2}{9} = 1\]
Es una elipse con centro en C(3, -1), semieje mayor a = 4 en direccion horizontal, semieje menor b = 3 en direccion vertical.

---

## Question 18 (Difficulty D9)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentacion

**Context:** En un proyecto de fisica en Pereira, los estudiantes combinan vectores de fuerza para determinar el equilibrio de un objeto.

### Enunciado
Sobre un cuerpo actuan dos fuerzas: \(\vec{F_1} = (8, -3)\) N y \(\vec{F_2} = (-2, 5)\) N. Si se desea que el cuerpo este en equilibrio, se necesita una tercera fuerza \(\vec{F_3}\) tal que \(\vec{F_1} + \vec{F_2} + \vec{F_3} = 0\). Cual debe ser \(\vec{F_3}\)?

### Options
- [ ] A) (6, 2) N <!-- feedback: Incorrecto. Calculaste la suma parcial como (8-2, -3+5) = (6, 2), pero esa no es la fuerza de equilibrio. -->
- [x] B) (-6, -2) N <!-- feedback: Correcto. \(\vec{F_1} + \vec{F_2} = (6, 2)\), por lo tanto \(\vec{F_3} = -(\vec{F_1} + \vec{F_2}) = (-6, -2)\). -->
- [ ] C) (-8, 3) N <!-- feedback: Incorrecto. Este es el negativo de unicamente \(\vec{F_1}\), no de la suma de ambas fuerzas. -->
- [ ] D) (6, -2) N <!-- feedback: Incorrecto. La componente y de la suma es -3+5 = 2, no -2. -->

### Explicacion Pedagogica
Para el equilibrio, la suma vectorial de todas las fuerzas debe ser cero: \(\sum \vec{F} = 0\). Primero sumamos las dos fuerzas conocidas: \(\vec{F_1} + \vec{F_2} = (8-2, -3+5) = (6, 2)\). Luego, \(\vec{F_3}\) debe ser el negativo de esta suma: \(\vec{F_3} = -(6, 2) = (-6, -2)\). Verificacion: \(\vec{F_1} + \vec{F_2} + \vec{F_3} = (8-2-6, -3+5-2) = (0, 0)\).

---

## Question 19 (Difficulty D10)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Resolucion de Problemas

**Context:** Un estudiante en Tunja esta resolviendo un problema de optica donde la intensidad de la luz al pasar por un filtro se modela con logaritmos.

### Enunciado
La intensidad de la luz despues de pasar por un filtro de espesor x se modela como \(I(x) = I_0 \cdot 10^{-0.5x}\). Cual es la expresion de la intensidad en terminos de logaritmos base 10?

### Options
- [ ] A) \(\log_{10}(I) = \log_{10}(I_0) + 0.5x\) <!-- feedback: Incorrecto. El exponente -0.5x da lugar a un termino \(-0.5x\), no positivo. -->
- [ ] B) \(\log_{10}(I) = 0.5x \cdot \log_{10}(I_0)\) <!-- feedback: Incorrecto. El logaritmo del producto NO es el producto de los logaritmos. -->
- [x] C) \(\log_{10}(I) = \log_{10}(I_0) - 0.5x\) <!-- feedback: Correcto. Aplicando logaritmo: \(\log_{10}(I_0 \cdot 10^{-0.5x}) = \log_{10}(I_0) + \log_{10}(10^{-0.5x}) = \log_{10}(I_0) - 0.5x\). -->
- [ ] D) \(\log_{10}(I) = \log_{10}(I_0) \cdot \log_{10}(10^{-0.5x})\) <!-- feedback: Incorrecto. La propiedad correcta es \(\log(ab) = \log(a) + \log(b)\), no \(\log(a) \cdot \log(b)\). -->

### Explicacion Pedagogica
Aplicamos logaritmo base 10 a ambos lados de la ecuacion:
\[\log_{10}(I) = \log_{10}(I_0 \cdot 10^{-0.5x})\]
Usando la propiedad del logaritmo de un producto: \(\log(ab) = \log(a) + \log(b)\):
\[\log_{10}(I) = \log_{10}(I_0) + \log_{10}(10^{-0.5x})\]
Y como \(\log_{10}(10^y) = y\):
\[\log_{10}(I) = \log_{10}(I_0) - 0.5x\]

---

## Question 20 (Difficulty D10)

**ID:** `CO-MAT-10-2026-P1-comprehensive-002-MASTERY-v20`
**Bloom:** Evaluate
**ICFES:** Razonamiento y Argumentacion

**Context:** En la clase de matematicas de grado 10 en el Colegio La Salle de Medellin, el profesor desafia a los estudiantes con un problema integral de vectores y conicas.

### Enunciado
Un punto P se mueve en el plano de tal manera que la suma de los cuadrados de sus distancias a dos puntos fijos F1(2, 0) y F2(-2, 0) siempre es igual a 20. Cual es la ecuacion del lugar geometrico descrito por P?

### Options
- [ ] A) \(\frac{x^2}{16} + \frac{y^2}{12} = 1\) <!-- feedback: Incorrecto. Esta seria la ecuacion usando la definicion de elipse (suma de distancias constante), pero la condicion es suma de cuadrados de distancias. -->
- [ ] B) \(x^2 + y^2 = 4\) <!-- feedback: Incorrecto. Prueba con (0,0): distancias al cuadrado son 4+4=8, no 20. -->
- [x] C) \(x^2 + y^2 = 6\) <!-- feedback: Correcto. Sea P(x,y): \([(x-2)^2+y^2] + [(x+2)^2+y^2] = 20\). Simplificando: \(2x^2 + 2y^2 + 8 = 20\), \(x^2 + y^2 = 6\). -->
- [ ] D) \(x^2 + y^2 = 20\) <!-- feedback: Incorrecto. Olvidaste que hay dos distancias al cuadrado que sumar, con terminos constantes de las coordenadas de los focos. -->

### Explicacion Pedagogica
Sea P(x, y) un punto cualquiera del lugar geometrico. La distancia de P a F1(2, 0) al cuadrado es \(d_1^2 = (x-2)^2 + y^2\). La distancia de P a F2(-2, 0) al cuadrado es \(d_2^2 = (x+2)^2 + y^2\).

La condicion del problema es: \(d_1^2 + d_2^2 = 20\).

Sustituyendo: \((x-2)^2 + y^2 + (x+2)^2 + y^2 = 20\)
\((x^2 - 4x + 4 + y^2) + (x^2 + 4x + 4 + y^2) = 20\)
\(2x^2 + 2y^2 + 8 = 20\)
\(2x^2 + 2y^2 = 12\)
\(x^2 + y^2 = 6\)

El lugar geometrico es una circunferencia con centro en el origen y radio \(\sqrt{6}\). Note que aunque los focos recuerdan a una elipse, la condicion es diferente: suma de cuadrados de distancias, no suma de distancias.

