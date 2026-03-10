---
id: "CO-MAT-11-1-limites-funciones-3-MASTERY"
protocol_version: "5.0"
periodo: 1
bundle_index: 3
total_questions: 20
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.2"
---

# Bundle: Límites de Funciones (Mastery Edition - Bundle 3)

## Question 1 (Concepto de Límite y Dominio - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál de las siguientes afirmaciones describe correctamente la relación entre el límite de una función en un punto $a$ y el valor de la función en ese mismo punto $f(a)$?

### Opciones
- [ ] A) El límite siempre es igual a $f(a)$. <!-- feedback: Incorrecto. Solo es cierto si la función es continua. -->
- [ ] B) Si el límite existe, entonces $f(a)$ debe existir. <!-- feedback: Incorrecto. Una función puede tener límite y un hueco en el dominio. -->
- [x] C) El límite depende del comportamiento cerca de $a$, no de lo que pase exactamente en $a$. <!-- feedback: Correcto. El límite describe la tendencia de aproximación. -->
- [ ] D) Si $f(a)$ no existe, el límite tampoco puede existir. <!-- feedback: Incorrecto. Las discontinuidades removibles son el ejemplo clásico de lo contrario. -->

**Rubrica:** Distingue entre el valor local y la tendencia global de una función.
**Justificación:** El límite es un concepto de vecindad que ignora deliberadamente el punto exacto de aproximación.

---

## Question 2 (Sustitución Directa y Radicales - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v2`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Evalúe el límite:
$$\lim_{x \to 5} \sqrt{x^2 - 9}$$

### Opciones
- [ ] A) 16
- [x] B) 4 <!-- feedback: Correcto. Sustituyendo: sqrt(5^2 - 9) = sqrt(25 - 9) = sqrt(16) = 4. -->
- [ ] C) No existe.
- [ ] D) $\sqrt{34}$

**Rubrica:** Realiza sustituciones directas en funciones con radicales.
**Justificación:** La función es continua en $x=5$ porque el radicando es positivo.

---

## Question 3 (Indeterminación 0/0: Diferencia de Cuadrados - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Halle el valor de:
$$\lim_{x \to 7} \frac{x^2 - 49}{x - 7}$$

### Opciones
- [ ] A) 0
- [ ] B) 7
- [x] C) 14 <!-- feedback: Correcto. Factorizando: (x-7)(x+7)/(x-7) = x+7. Evaluando en 7: 7+7 = 14. -->
- [ ] D) Infinito

**Rubrica:** Emplea la diferencia de cuadrados para simplificar límites.
**Justificación:** La simplificación algebraica permite resolver la indeterminación 0/0 de forma directa.

---

## Question 4 (Límites al Infinito con Coeficientes Negativos - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v4`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
Calcule $\lim_{x \to \infty} \frac{5 - 2x^2}{3x^2 + 10}$.

### Opciones
- [ ] A) 5/3
- [ ] B) 0
- [x] C) -2/3 <!-- feedback: Correcto. Los grados son iguales, el límite es el cociente de los coeficientes líderes: -2 / 3. -->
- [ ] D) -1/2

**Rubrica:** Identifica coeficientes líderes incluyendo su signo en límites al infinito.
**Justificación:** El signo del coeficiente de mayor grado determina la dirección del comportamiento asintótico.

---

## Question 5 (Indeterminación 0/0: Racionalización de Denominador - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule $\lim_{x \to 0} \frac{x}{\sqrt{x+4} - 2}$.

### Opciones
- [ ] A) 2
- [x] B) 4 <!-- feedback: Correcto. Multiplicando por (sqrt(x+4)+2): x(sqrt(x+4)+2) / (x+4-4) = x(sqrt(x+4)+2)/x = sqrt(x+4)+2. En x=0 es 2+2=4. -->
- [ ] C) 1/4
- [ ] D) 0

**Rubrica:** Realiza racionalizaciones cuando la raíz se encuentra en el denominador.
**Justificación:** La técnica del conjugado es bidireccional y sirve para limpiar indeterminaciones en cualquier parte de la fracción.

---

## Question 6 (Asíntotas Horizontales en Funciones Exponenciales - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v6`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es la asíntota horizontal de la función $f(x) = \frac{3 \cdot 2^x + 5}{2^x - 1}$ cuando $x \to \infty$?

### Opciones
- [ ] A) $y = 0$
- [ ] B) $y = -5$
- [x] C) $y = 3$ <!-- feedback: Correcto. Dividiendo numerador y denominador por 2^x: (3 + 5/2^x) / (1 - 1/2^x). Al infinito, los términos con 2^x abajo tienden a 0, quedando 3/1 = 3. -->
- [ ] D) No tiene asíntota horizontal.

**Rubrica:** Analiza el comportamiento asintótico en funciones no algebraicas.
**Justificación:** Las técnicas de límites al infinito son aplicables a funciones trascendentes comparando sus tasas de crecimiento.

---

## Question 7 (Límites Laterales y Signo - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor de $\lim_{x \to 3^-} \frac{x-5}{x-3}$?

### Opciones
- [x] A) $+\infty$ <!-- feedback: Correcto. Numerador tiende a -2. Denominador tiende a un 0 negativo (e.g., 2.9 - 3 = -0.1). Negativo sobre negativo da positivo. -->
- [ ] B) $-\infty$ <!-- feedback: Incorrecto. Error en el análisis de signos. -->
- [ ] C) 0
- [ ] D) 5/3

**Rubrica:** Determina la dirección del infinito analizando los signos de numerador y denominador cerca del punto crítico.
**Justificación:** El estudio de signos es fundamental para distinguir entre las dos ramas de una asíntota vertical.

---

## Question 8 (Indeterminación 0/0: Factorización de Cubos - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule $\lim_{x \to -2} \frac{x^3 + 8}{x + 2}$.

### Opciones
- [ ] A) 0
- [ ] B) 4
- [x] C) 12 <!-- feedback: Correcto. Factorizando suma de cubos: (x+2)(x^2 - 2x + 4) / (x+2) = x^2 - 2x + 4. Evaluando en -2: 4 - 2(-2) + 4 = 12. -->
- [ ] D) 8

**Rubrica:** Aplica la fórmula de suma de cubos en límites.
**Justificación:** La identificación de estructuras polinómicas complejas es clave para el dominio del cálculo algebraico.

---

## Question 9 (Límite Trigonométrico Fundamental: Seno - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule $\lim_{x \to 0} \frac{\sin^2(3x)}{x^2}$.

### Opciones
- [ ] A) 3
- [x] B) 9 <!-- feedback: Correcto. [sin(3x)/x]^2 = [3 * sin(3x)/(3x)]^2 = 3^2 * [sin(3x)/(3x)]^2. El límite es 9 * 1^2 = 9. -->
- [ ] C) 1
- [ ] D) 0

**Rubrica:** Resuelve límites con potencias de funciones trigonométricas.
**Justificación:** La propiedad del límite del producto permite elevar al cuadrado el resultado del límite fundamental.

---

## Question 10 (Puntos de Incontinuidad: Clasificación - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Interpretación y Representación

### Enunciado
Dada la función $f(x) = \frac{x^2-1}{x-1}$, ¿qué tipo de discontinuidad tiene en $x = 1$?

### Opciones
- [x] A) Removible (o evitable). <!-- feedback: Correcto. El límite existe (es 2), pero f(1) no está definida. -->
- [ ] B) De Salto. <!-- feedback: Incorrecto. Los límites laterales coinciden. -->
- [ ] C) Infinita. <!-- feedback: Incorrecto. El valor del límite es finito. -->
- [ ] D) No tiene discontinuidad, es continua.

**Rubrica:** Clasifica fallas en la continuidad basadas en el comportamiento del límite general.
**Justificación:** Si la función "parece" ir hacia un punto pero este falta, la discontinuidad se puede evitar rellenando el hueco.

---

## Question 11 (Límites al Infinito de Logaritmos - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} \frac{\ln x}{x}$?

### Opciones
- [x] A) 0 <!-- feedback: Correcto. Aunque el logaritmo crece al infinito, lo hace mucho más lento que cualquier función lineal. -->
- [ ] B) 1
- [ ] C) Infinito
- [ ] D) No existe.

**Rubrica:** Compara crecimientos entre funciones logarítmicas y polinómicas.
**Justificación:** El crecimiento logarítmico es el más lento de todas las funciones que tienden a infinito, siendo superado por cualquier potencia positiva de $x$.

---

## Question 12 (Aplicación de L'Hôpital: Introducción - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Use la Regla de L'Hôpital (derivando arriba y abajo) para hallar $\lim_{x \to 0} \frac{e^x - 1}{x}$.

### Opciones
- [ ] A) 0
- [x] B) 1 <!-- feedback: Correcto. Derivada de e^x - 1 es e^x. Derivada de x es 1. Evaluando en 0: e^0 / 1 = 1. -->
- [ ] C) $e$
- [ ] D) Infinito

**Rubrica:** Aplica herramientas avanzadas de derivación para resolver límites 0/0.
**Justificación:** La regla de L'Hôpital simplifica el cálculo de límites en funciones trascendentes donde la factorización es imposible.

---

## Question 13 (Límites y Geometría: Área Círculo - Dificultad 9)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v13`
**Bloom:** synthesis
**ICFES:** Argumentación

### Enunciado
Si inscribimos un polígono regular de $n$ lados en un círculo de radio $R$, el área del polígono es $A_n = \frac{n R^2}{2} \sin\left(\frac{2\pi}{n}\right)$. ¿A qué valor tiende el área cuando el número de lados tiende a infinito ($n \to \infty$)?

### Opciones
- [ ] A) $2\pi R^2$
- [x] B) $\pi R^2$ <!-- feedback: Correcto. Sea theta = 2pi/n. Cuando n->inf, theta->0. El límite es (pi R^2) * [sin(theta)/theta] = pi R^2 * 1. -->
- [ ] C) $R^2$
- [ ] D) 0

**Rubrica:** Conecta límites con conceptos geométricos de aproximación.
**Justificación:** Un círculo puede entenderse como el límite de un polígono regular cuando sus lados se vuelven infinitos y diminutos.

---

## Question 14 (Continuidad en Funciones con Raíces - Dificultad 5)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v14`
**Bloom:** Understand
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el intervalo de continuidad de la función $f(x) = \sqrt{x - 4}$?

### Opciones
- [ ] A) $(-\infty, \infty)$
- [ ] B) $(4, \infty)$
- [x] C) $[4, \infty)$ <!-- feedback: Correcto. La función está definida y es continua para todos los valores donde el radicando no es negativo. -->
- [ ] D) $(-\infty, 4]$

**Rubrica:** Identifica el dominio de continuidad basado en restricciones algebraicas.
**Justificación:** La continuidad está intrínsecamente ligada al dominio de definición de las funciones elementales.

---

## Question 15 (Límite de una Constante - Dificultad 4)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v15`
**Bloom:** Remember
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor de $\lim_{x \to 100} \pi$?

### Opciones
- [ ] A) 100
- [x] B) $\pi$ <!-- feedback: Correcto. El límite de una constante es la misma constante, sin importar a qué tienda x. -->
- [ ] C) 0
- [ ] D) $100\pi$

**Rubrica:** Aplica la propiedad más básica de los límites.
**Justificación:** Una constante no cambia su valor ante variaciones en la variable independiente.

---

## Question 16 (Límites al Infinito de Funciones Trigonométricas - Dificultad 7)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Interpretación y Representación

### Enunciado
¿Cuál es el valor de $\lim_{x \to \infty} \sin x$?

### Opciones
- [ ] A) 1
- [ ] B) 0
- [ ] C) Infinito
- [x] D) No existe. <!-- feedback: Correcto. La función oscila indefinidamente entre -1 y 1, por lo que no se aproxima a un valor único. -->

**Rubrica:** Reconoce la falta de convergencia en funciones oscilatorias puras.
**Justificación:** La existencia de un límite requiere una tendencia estable hacia un valor único; la oscilación perpetua lo impide.

---

## Question 17 (Límite con Racionalización Doble - Dificultad 9)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v17`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución

### Enunciado
Calcule $\lim_{x \to 0} \frac{\sqrt{1+x} - \sqrt{1-x}}{x}$.

### Opciones
- [x] A) 1 <!-- feedback: Correcto. Racionalizando: (1+x - (1-x)) / (x(sqrt(1+x)+sqrt(1-x))) = 2x / (x(sqrt(1+x)+sqrt(1-x))) = 2 / (sqrt(1+x)+sqrt(1-x)). En x=0: 2/2 = 1. -->
- [ ] B) 0
- [ ] C) 2
- [ ] D) 1/2

**Rubrica:** Resuelve límites con diferencias de raíces mediante racionalización y simplificación.
**Justificación:** La cancelación de términos constantes en el numerador es clave para exponer el factor que causa la indeterminación.

---

## Question 18 (Teorema de la Estricción con Seno - Dificultad 8)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v18`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Halle el valor de $\lim_{x \to 0} x^2 \sin\left(\frac{1}{x}\right)$.

### Opciones
- [x] A) 0 <!-- feedback: Correcto. Como -1 <= sin(1/x) <= 1, entonces -x^2 <= x^2 sin(1/x) <= x^2. Como lim x^2 = 0, el límite central es 0 por el Teorema del Emparedado. -->
- [ ] B) 1
- [ ] C) No existe.
- [ ] D) Infinito.

**Rubrica:** Aplica el teorema de estricción a funciones con oscilación infinita pero amplitud decreciente.
**Justificación:** El factor $x^2$ actúa como un "silenciador" que obliga a la oscilación a colapsar en el origen.

---

## Question 19 (Continuidad y Parámetros: Función Lineal - Dificultad 6)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentación

### Enunciado
Si $f(x) = \begin{cases} 3x - 1 & \text{si } x < 1 \\ kx + 2 & \text{si } x \ge 1 \end{cases}$. ¿Para qué valor de $k$ es la función continua en $x=1$?

### Opciones
- [ ] A) $k = 2$
- [x] B) $k = 0$ <!-- feedback: Correcto. Laterales: 3(1)-1 = k(1)+2 => 2 = k + 2 => k = 0. -->
- [ ] C) $k = -1$
- [ ] D) $k = 4$

**Rubrica:** Iguala límites laterales para garantizar la continuidad.
**Justificación:** El parámetro $k$ ajusta la pendiente de la segunda rama para que coincida con el punto final de la primera.

---

## Question 20 (Mastery Integration: El Radar de la Policía de Tránsito - Dificultad 10)
**ID:** `CO-MAT-11-1-limites-funciones-3-MASTERY-v20`
**Bloom:** Transfer
**ICFES:** Argumentación + Transferencia

### Enunciado
**MASTER CHALLENGE:** Un radar de la Policía Nacional de Colombia mide la velocidad de un carro en la Autopista Norte. La posición es $p(t)$. El radar no mide el límite $\lim_{h \to 0} \frac{p(t+h) - p(t)}{h}$, sino que estima la velocidad usando un intervalo $h$ muy pequeño de $0.001$ segundos.

Si el carro se mueve con $p(t) = 20t^2$, el radar reporta la velocidad promedio en ese pequeño intervalo. ¿Qué relación hay entre el reporte del radar y la velocidad instantánea real del carro en $t=2$?

### Opciones
- [ ] A) El radar reporta exactamente 80 km/h. <!-- feedback: Incorrecto. Ese es el límite exacto, el radar da un promedio muy cercano. -->
- [x] B) El reporte del radar es una aproximación al límite matemático; en este caso reportará $80.02$ unidades de velocidad. <!-- feedback: Correcto. Promedio = [20(2.001)^2 - 20(2^2)] / 0.001 = 20(8.004001 - 4)/0.001 = 80.02. -->
- [ ] C) El radar falla porque no puede calcular límites en tiempo real. <!-- feedback: Incorrecto. La tecnología digital usa precisamente la aproximación por h pequeño para simular el cálculo diferencial. -->
- [ ] D) El reporte será de 0 porque el tiempo es casi nada. <!-- feedback: Incorrecto. Al dividir por un tiempo pequeño, se obtiene una magnitud significativa. -->

**Rubrica:** Integra la aplicación tecnológica de los límites en la medición de magnitudes físicas.
**Justificación:** La tecnología moderna es una aplicación práctica del concepto de límite, donde "suficientemente pequeño" reemplaza al "tiende a cero" teórico.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Bloom | ICFES | Tema | Validado |
|----|-----|------|-------|-------|------|----------|
| 1 | ...-v1 | 4 | Remember | Interpretación | Límite vs Imagen | ✅ |
| 2 | ...-v2 | 4 | Apply | Formulación | Sustitución Radicales | ✅ |
| 3 | ...-v3 | 6 | Apply | Formulación | 0/0 Cuadrados | ✅ |
| 4 | ...-v4 | 5 | Analyze | Interpretación | Infinito Signos | ✅ |
| 5 | ...-v5 | 7 | Apply | Formulación | 0/0 Racionalización Denom. | ✅ |
| 6 | ...-v6 | 6 | Analyze | Interpretación | Asíntota Exponencial | ✅ |
| 7 | ...-v7 | 5 | Analyze | Interpretación | Límite Lateral Signo | ✅ |
| 8 | ...-v8 | 8 | Apply | Formulación | 0/0 Suma Cubos | ✅ |
| 9 | ...-v9 | 7 | Apply | Formulación | Límite Trig. Cuadrado | ✅ |
| 10 | ...-v10 | 6 | Understand | Interpretación | Tipo Discontinuidad | ✅ |
| 11 | ...-v11 | 7 | Analyze | Interpretación | Logaritmos al Infinito | ✅ |
| 12 | ...-v12 | 8 | Apply | Formulación | L'Hôpital Intro | ✅ |
| 13 | ...-v13 | 9 | Synthesis | Argumentación | Límite Geométrico | ✅ |
| 14 | ...-v14 | 5 | Understand | Interpretación | Intervalo Continuidad | ✅ |
| 15 | ...-v15 | 4 | Remember | Interpretación | Límite Constante | ✅ |
| 16 | ...-v16 | 7 | Analyze | Interpretación | Oscilación al Infinito | ✅ |
| 17 | ...-v17 | 9 | Apply | Formulación | Racionalización Doble | ✅ |
| 18 | ...-v18 | 8 | Evaluate | Argumentación | Estricción Oscilante | ✅ |
| 19 | ...-v19 | 6 | Evaluate | Argumentación | Parámetro Lineal | ✅ |
| 20 | ...-v20 | 10 | Transfer | Argumentación | Aplicación Radar | ✅ |
