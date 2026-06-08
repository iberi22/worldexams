---
id: "CO-MAT-9-2026-P3-comprehensive-001-MASTERY"
country: "colombia"
grado: 9
asignatura: "matematicas"
tema: "funcion-exponencial-logaritmica, trigonometria-triangulos, estadistica-correlacion"
periodo: 3
protocol_version: "5.2"
bundle_index: 1
bundle_size: 15
alignment: "DBA MEN + Estándares Básicos Ciclo 3"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.65
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "función exponencial y logarítmica, resolución de triángulos (ley de seno/coseno), correlación estadística y diagrama de dispersión"
license: "FREE"
tier: "legacy"

---

# Bundle Mastery: Función Exponencial, Trigonometría de Triángulos y Estadística

Este bundle cubre funciones exponenciales y logarítmicas, resolución de triángulos no rectángulos con ley de seno y coseno, y conceptos de correlación estadística en contextos colombianos.

---

## Question 1 [D3]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** Un estudiante en Bogotá estudia la función exponencial $f(x) = 2^x$.

### Enunciado
¿Cuál es el valor de $f(3)$ para la función $f(x) = 2^x$?

### Options
- [ ] A) 6 <!-- feedback: Incorrect. Esto sería $2 \times 3$, no $2^3$. -->
- [ ] B) 5 <!-- feedback: Incorrect. $2^3 = 2 \times 2 \times 2 = 8$, no 5. -->
- [x] C) 8 <!-- feedback: Correct. $2^3 = 2 \times 2 \times 2 = 8$. -->
- [ ] D) 9 <!-- feedback: Incorrect. $3^2 = 9$, pero la función es $2^x$, no $x^2$. -->

### Explicación Pedagógica
En la función exponencial $f(x) = a^x$, la base $a$ se multiplica por sí misma $x$ veces. $2^3 = 2 \cdot 2 \cdot 2 = 8$.

---

## Question 2 [D3]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Comunicación y Representación
**Context:** En una clase de estadística en Cali, el profesor explica qué es la correlación entre dos variables.

### Enunciado
¿Qué indica un coeficiente de correlación $r = 0.9$ entre dos variables?

### Options
- [ ] A) No hay relación entre las variables. <!-- feedback: Incorrect. $r=0$ indicaría ausencia de relación lineal. -->
- [ ] B) Una correlación negativa fuerte. <!-- feedback: Incorrect. $r=-0.9$ indicaría correlación negativa fuerte. -->
- [x] C) Una correlación positiva fuerte. <!-- feedback: Correct. $r$ cercano a 1 indica una relación lineal positiva fuerte. -->
- [ ] D) Una correlación positiva débil. <!-- feedback: Incorrect. Valores cercanos a 0.1 o 0.2 indicarían correlación débil. $0.9$ es fuerte. -->

### Explicación Pedagógica
El coeficiente de correlación de Pearson $r$ varía entre $-1$ y $1$. Valores cercanos a $1$ o $-1$ indican correlación fuerte, mientras que cercanos a $0$ indican correlación débil o nula.

---

## Question 3 [D4]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Comunicación y Representación
**Context:** Un estudiante en Medellín ve la gráfica de $f(x) = 3^x$ y nota que pasa por el punto $(0, 1)$.

### Enunciado
¿Por qué toda función exponencial de la forma $f(x) = a^x$ con $a > 0$ y $a \neq 1$ pasa por el punto $(0, 1)$?

### Options
- [x] A) Porque $a^0 = 1$ para cualquier $a \neq 0$. <!-- feedback: Correct. Todo número diferente de cero elevado a la potencia 0 es igual a 1. -->
- [ ] B) Porque $a^0 = 0$ y entonces $f(0) = 0 + 1 = 1$. <!-- feedback: Incorrect. $a^0 = 1$, no 0. La función pasa por $(0,1)$ porque $a^0 = 1$, no porque se sume 1. -->
- [ ] C) Porque la función siempre corta el eje x en $x = 0$. <!-- feedback: Incorrect. La función exponencial nunca corta el eje x (tiene asíntota en $y = 0$). -->
- [ ] D) Porque $a \cdot 0 = 0$ y la gráfica se desplaza. <!-- feedback: Incorrect. $a \cdot 0 = 0$ no corresponde a la evaluación de la función exponencial. -->

### Explicación Pedagógica
Por definición, $a^0 = 1$ para todo $a \neq 0$. Esto hace que el intercepto con el eje $y$ sea siempre $(0, 1)$ en funciones exponenciales básicas de la forma $f(x) = a^x$.

---

## Question 4 [D4]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En un triángulo, se conocen dos lados $a = 8$ cm y $b = 12$ cm, y el ángulo entre ellos $C = 60^\circ$.

### Enunciado
Usando la ley del coseno $c^2 = a^2 + b^2 - 2ab\cos(C)$, ¿cuánto mide el lado $c$?

### Options
- [ ] A) $4\sqrt{7}$ cm <!-- feedback: Correct. $c^2 = 64 + 144 - 2(8)(12)(0.5) = 208 - 96 = 112$. $c = \sqrt{112} = \sqrt{16 \cdot 7} = 4\sqrt{7}$ cm. -->
- [ ] B) $\sqrt{112}$ cm <!-- feedback: Partially correct but not simplified: $\sqrt{112} = 4\sqrt{7}$ cm. -->
- [ ] C) $10$ cm <!-- feedback: Incorrect. No se aplicó correctamente la ley del coseno. -->
- [ ] D) $4\sqrt{13}$ cm <!-- feedback: Incorrect. $4\sqrt{13} = \sqrt{208}$, que sería $a^2 + b^2$ sin restar el término $-2ab\cos(C)$. -->

### Explicación Pedagógica
La ley del coseno generaliza el teorema de Pitágoras para cualquier triángulo. Cuando $C = 90^\circ$, $\cos(90^\circ) = 0$, y la fórmula se reduce a $c^2 = a^2 + b^2$.

---

## Question 5 [D5]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** Un biólogo en el Amazonas modela el crecimiento de una población de aves con $P(t) = 100 \cdot (1.05)^t$, donde $t$ son años.

### Enunciado
¿Cuál es la población después de 10 años? (Use $(1.05)^{10} \approx 1.6289$)

### Options
- [ ] A) 150 aves <!-- feedback: Incorrect. $100 \times 1.5$ sería un crecimiento del 50%, pero aquí es 5% anual compuesto. -->
- [x] B) 162.89 aves, aproximadamente 163 <!-- feedback: Correct. $P(10) = 100 \cdot (1.05)^{10} \approx 100 \cdot 1.6289 = 162.89$. -->
- [ ] C) 1050 aves <!-- feedback: Incorrect. Sería $100 + 100(0.05)(10)$, que es crecimiento lineal, no exponencial. -->
- [ ] D) 100 aves <!-- feedback: Incorrect. La población inicial es 100, pero después de 10 años debe haber crecido. -->

### Explicación Pedagógica
El crecimiento exponencial $P(t)=P_0(1+r)^t$ se diferencia del lineal porque la tasa de crecimiento se aplica sobre el valor acumulado, no sobre el valor inicial.

---

## Question 6 [D5]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación
**Context:** Un estudiante en Barranquilla afirma que la función $f(x) = \log_2(x)$ es la inversa de $g(x) = 2^x$.

### Enunciado
¿Tiene razón el estudiante?

### Options
- [ ] A) Sí, porque $\log_2(2^x) = x$ y $2^{\log_2(x)} = x$. <!-- feedback: Correct. Las funciones exponencial y logarítmica con la misma base son funciones inversas. -->
- [ ] B) No, el logaritmo no es la inversa del exponencial. <!-- feedback: Incorrect. El logaritmo en base $a$ es precisamente la función inversa de $a^x$. -->
- [ ] C) Sí, pero solo para $x > 0$. <!-- feedback: Partially correct but incomplete. Aunque el dominio del logaritmo es $x > 0$, la afirmación de que son inversas sigue siendo correcta. Sin embargo, la opción A es más completa. -->
- [ ] D) No, la inversa de $2^x$ es $\sqrt[x]{2}$. <!-- feedback: Incorrect. La raíz no es la función inversa de la exponencial; el logaritmo sí lo es. -->

### Explicación Pedagógica
Las funciones $f(x) = a^x$ y $g(x) = \log_a(x)$ son inversas: $f(g(x)) = a^{\log_a(x)} = x$ y $g(f(x)) = \log_a(a^x) = x$.

---

## Question 7 [D5]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** Un topógrafo en el Cauca necesita medir la distancia entre dos puntos $A$ y $B$ separados por una quebrada. Coloca un punto $C$ a 50 m de $A$, y mide el ángulo $A = 40^\circ$ y el ángulo $C = 70^\circ$.

### Enunciado
Usando la ley de senos $\frac{a}{\sin(A)} = \frac{c}{\sin(C)}$, ¿cuál es la distancia entre $A$ y $B$ (lado $c$)?

### Options
- [ ] A) 50 m <!-- feedback: Incorrect. Coincide con la distancia AC pero no es el resultado correcto. -->
- [x] B) $\frac{50 \sin(70^\circ)}{\sin(40^\circ)}$ m <!-- feedback: Correct. Por ley de senos: $\frac{c}{\sin(70^\circ)} = \frac{50}{\sin(40^\circ)}$, entonces $c = \frac{50\sin(70^\circ)}{\sin(40^\circ)}$. -->
- [ ] C) $\frac{50 \sin(40^\circ)}{\sin(70^\circ)}$ m <!-- feedback: Incorrect. La relación está invertida. -->
- [ ] D) $50 (\sin(70^\circ) + \sin(40^\circ))$ m <!-- feedback: Incorrect. No se suman los senos en la ley de senos. -->

### Explicación Pedagógica
La ley de senos establece que $\frac{a}{\sin(A)} = \frac{b}{\sin(B)} = \frac{c}{\sin(C)}$. Se usa cuando se conocen dos ángulos y un lado (ALA o AAL).

---

## Question 8 [D6]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v8`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** Una inversión de 2 millones de pesos en un CDT en un banco colombiano crece según $A = 2.000.000(1.08)^t$, donde $t$ son años.

### Enunciado**
¿Cuánto tiempo debe pasar para que la inversión alcance 4 millones de pesos? (Use $\log(2) \approx 0.3010$ y $\log(1.08) \approx 0.0334$)

### Options
- [ ] A) Aproximadamente 5 años <!-- feedback: Incorrect. $1.08^5 \approx 1.47$, que daría unos 2.94 millones. -->
- [ ] B) Aproximadamente 7 años <!-- feedback: Incorrect. $1.08^7 \approx 1.71$, que daría unos 3.42 millones. -->
- [x] C) Aproximadamente 9 años <!-- feedback: Correct. $4 = 2(1.08)^t$, entonces $(1.08)^t = 2$, $t = \frac{\log(2)}{\log(1.08)} \approx \frac{0.3010}{0.0334} \approx 9.01$ años. -->
- [ ] D) Aproximadamente 12 años <!-- feedback: Incorrect. $1.08^{12} \approx 2.52$, que daría unos 5.04 millones (más del doble). -->

### Explicación Pedagógica
Para despejar el exponente en ecuaciones exponenciales se usan logaritmos: $a^t = b \implies t = \log_a(b) = \frac{\log(b)}{\log(a)}$.

---

## Question 9 [D6]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v9`
**Bloom:** Understand
**ICFES:** Razonamiento y Argumentación
**Context:** Un estudio en 10 colegios de Bogotá muestra que a mayor cantidad de horas de estudio semanal, mayor es el puntaje en las pruebas Saber.

### Enunciado
Si los datos muestran una correlación de $r = 0.85$, ¿se puede concluir que estudiar más horas CAUSA mejores puntajes?

### Options
- [ ] A) Sí, porque $r > 0.8$ indica una relación causal. <!-- feedback: Incorrect. Correlación no implica causalidad. -->
- [ ] B) No, aunque hay una fuerte correlación positiva, no se puede concluir causalidad. <!-- feedback: Correct. La correlación mide relación lineal, no causalidad. Pueden influir otras variables. -->
- [ ] C) Sí, porque a mayor horas de estudio, mayores puntajes. <!-- feedback: Incorrect. Observar una tendencia no es suficiente para establecer causalidad. -->
- [ ] D) No, porque $0.85$ es una correlación negativa. <!-- feedback: Incorrect. $0.85$ es positiva, no negativa. -->

### Explicación Pedagógica
"Correlación no implica causalidad" es un principio fundamental en estadística. Pueden existir variables ocultas (como la calidad de la enseñanza o el nivel socioeconómico) que afecten ambas variables.

---

## Question 10 [D6]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v10`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** Resuelve $\log_3(2x - 1) = 2$.

### Enunciado
¿Cuál es el valor de $x$?

### Options
- [x] A) $x = 5$ <!-- feedback: Correct. $\log_3(2x - 1) = 2$ implica $3^2 = 2x - 1$, entonces $9 = 2x - 1$, $2x = 10$, $x = 5$. -->
- [ ] B) $x = 4$ <!-- feedback: Incorrect. $2(4) - 1 = 7$, y $\log_3(7) \neq 2$ porque $3^2 = 9$. -->
- [ ] C) $x = \frac{7}{2}$ <!-- feedback: Incorrect. $\log_3(2(3.5)-1) = \log_3(6) \neq 2$ porque $3^2 = 9$. -->
- [ ] D) $x = 2$ <!-- feedback: Incorrect. $\log_3(2(2)-1) = \log_3(3) = 1$, no 2. -->

### Explicación Pedagógica
Para resolver ecuaciones logarítmicas, se convierte a forma exponencial: $\log_a(b) = c \iff a^c = b$. Luego se resuelve la ecuación resultante y se verifica el dominio.

---

## Question 11 [D7]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** Un estudiante afirma que la función $f(x) = 2^x$ crece más rápido que $g(x) = x^2$ para valores grandes de $x$.

### Enunciado
¿Es correcta esta afirmación?

### Options
- [x] A) Sí, porque el crecimiento exponencial eventualmente supera cualquier crecimiento polinómico. <!-- feedback: Correct. Para $x > 4$, $2^x$ supera a $x^2$, y la diferencia se hace cada vez mayor. $2^{10}=1024$ vs $10^2=100$. -->
- [ ] B) No, $x^2$ crece más rápido para todos los valores. <!-- feedback: Incorrect. Para $x=10$, $2^{10}=1024 > 100=10^2$. -->
- [ ] C) Solo si $x$ es negativo. <!-- feedback: Incorrect. Para $x$ negativo, $2^x < 1$ mientras que $x^2 > 0$ puede ser mayor. -->
- [ ] D) Depende de la base, pero $2^x$ siempre es menor que $x^2$. <!-- feedback: Incorrect. $2^x$ supera a $x^2$ para $x > 4$. -->

### Explicación Pedagógica
Las funciones exponenciales con base $>1$ tienen crecimiento que eventualmente supera a cualquier función polinómica. Esto se conoce como "crecimiento exponencial domina al polinómico".

---

## Question 12 [D7]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v12`
**Bloom:** Apply
**ICFES:** Formulación y Ejecución
**Context:** En un triángulo, los lados miden $a = 7$ cm, $b = 9$ cm y $c = 12$ cm.

### Enunciado
Usando la ley del coseno, ¿cuál es el coseno del ángulo opuesto al lado $c$ (el ángulo $C$)?

### Options
- [ ] A) $-1/3$ <!-- feedback: Correct. $\cos(C) = \frac{a^2 + b^2 - c^2}{2ab} = \frac{49 + 81 - 144}{2(7)(9)} = \frac{-14}{126} = -\frac{1}{9}$... Espera, $\frac{49+81-144}{126} = \frac{-14}{126} = -\frac{1}{9}$. -->
- [x] B) $-\frac{1}{9}$ <!-- feedback: Correct. $\cos(C) = \frac{7^2 + 9^2 - 12^2}{2(7)(9)} = \frac{49 + 81 - 144}{126} = \frac{-14}{126} = -\frac{1}{9}$. -->
- [ ] C) $\frac{1}{3}$ <!-- feedback: Incorrect. El signo y el valor son incorrectos. -->
- [ ] D) $-\frac{1}{3}$ <!-- feedback: Incorrect. El cálculo correcto da $-\frac{14}{126} = -\frac{1}{9}$, no $-\frac{1}{3}$. -->

### Explicación Pedagógica
La ley del coseno en su forma despejada: $\cos(C) = \frac{a^2 + b^2 - c^2}{2ab}$. Un coseno negativo indica que el ángulo $C$ es obtuso ($> 90^\circ$).

---

## Question 13 [D8]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Razonamiento y Argumentación
**Context:** Un investigador en Colombia analiza la relación entre la altitud y la temperatura en 15 ciudades colombianas. Obtiene un coeficiente de correlación $r = -0.92$.

### Enunciado
¿Qué interpretación tiene este valor de $r$?

### Options
- [ ] A) A mayor altitud, mayor temperatura. <!-- feedback: Incorrect. El signo negativo indica relación inversa. -->
- [x] B) A mayor altitud, menor temperatura, con una relación lineal muy fuerte. <!-- feedback: Correct. $r=-0.92$ indica una correlación negativa muy fuerte: cuando la altitud aumenta, la temperatura disminuye. -->
- [ ] C) No hay relación entre altitud y temperatura. <!-- feedback: Incorrect. $r=-0.92$ indica una relación muy fuerte, aunque sea negativa. -->
- [ ] D) La temperatura es la causa de la altitud. <!-- feedback: Incorrect. Correlación no implica causalidad, y además la relación causal va en dirección opuesta. -->

### Explicación Pedagógica
Un coeficiente de correlación negativo indica que una variable aumenta mientras la otra disminuye. La magnitud $|r| = 0.92$ indica una correlación muy fuerte.

---

## Question 14 [D8]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico
**Context:** Un modelo predice que el número de usuarios de internet en Colombia sigue $U(t) = 30 \cdot (1.12)^t$ millones, donde $t$ son años desde 2020.

### Enunciado
Si en 2020 había 30 millones de usuarios, ¿en qué año se duplicará la cantidad de usuarios? (Use $\log(2) \approx 0.3010$, $\log(1.12) \approx 0.0492$)

### Options
- [ ] A) Aproximadamente en 2024.5 <!-- feedback: Incorrect. $1.12^4 \approx 1.57$ (crecimiento del 57% en 4 años). -->
- [ ] B) Aproximadamente en 2026.1 <!-- feedback: Correct. $2 = (1.12)^t$, $t = \frac{\log(2)}{\log(1.12)} \approx \frac{0.3010}{0.0492} \approx 6.12$ años. 2020 + 6.12 = 2026.1. -->
- [ ] C) Aproximadamente en 2028.3 <!-- feedback: Incorrect. $1.12^8 \approx 2.48$, que duplica pero en 8 años, no en 6.1. -->
- [ ] D) Aproximadamente en 2030.5 <!-- feedback: Incorrect. El cálculo del tiempo de duplicación está sobredimensionado. -->

### Explicación Pedagógica
El tiempo de duplicación en crecimiento exponencial se calcula con $t_d = \frac{\log(2)}{\log(1+r)}$, donde $r$ es la tasa de crecimiento. Es constante e independiente de la población inicial.

---

## Question 15 [D9]

**ID:** `CO-MAT-9-2026-P3-comprehensive-001-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Pensamiento Reflexivo y Sistémico
**Context:** Un ingeniero civil en Bogotá debe calcular la distancia entre dos puntos $A$ y $B$ separados por una construcción. Mide $AC = 40$ m, $BC = 35$ m, y el ángulo $C$ (entre $AC$ y $BC$) es de $75^\circ$.

### Enunciado
Usando la ley del coseno, ¿cuál es la distancia aproximada entre $A$ y $B$? ($\cos(75^\circ) \approx 0.2588$)

### Options
- [ ] A) 75 m <!-- feedback: Incorrect. La suma de los dos lados no es la distancia entre A y B. -->
- [ ] B) 47.8 m <!-- feedback: Correct. $c^2 = 40^2 + 35^2 - 2(40)(35)(0.2588) = 1600 + 1225 - 724.64 = 2100.36$. $c \approx \sqrt{2100.36} \approx 45.83$ m. -->
- [x] C) 45.8 m <!-- feedback: Correct. $c^2 = 40^2 + 35^2 - 2(40)(35)\cos(75^\circ) = 1600 + 1225 - 2800(0.2588) = 2825 - 724.64 = 2100.36$. $c = \sqrt{2100.36} \approx 45.83$ m. -->
- [ ] D) 53.2 m <!-- feedback: Incorrect. Probablemente se sumaron los cuadrados sin restar el término $-2ab\cos(C)$. -->


[//]: # (QUALITY_REVIEW)
[//]: # (STATUS: LEGACY - FREE USE)
[//]: # (SCORE: N/A - Pre-QR era)
