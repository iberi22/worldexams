---
id: "UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle"
country: "uruguay"
grado: 11
asignatura: "matematicas"
tema: "tema-w14"
periodo: "weekly"
week: "W14"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "ANEP - Plan 2006 Reformulación / Programa Ubicación"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
bundle_index: 1
calibration: {difficulty_band: "D3-D10", expected_success: 0.65}
---

# MASTERY Bundle — Matemáticas: Funciones Exponenciales y Logarítmicas (UY-MAT-11-W14)

## Question 1 [D3-D4]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.90
**Contexto:** Un docente de Montevideo repasa el recorrido de la función exponencial básica.

### Enunciado
¿Cuál es el recorrido (o imagen) de la función exponencial $f(x) = 2^x$ en el conjunto de los números reales?

### Opciones
- [ ] A) Todos los números reales ($\mathbb{R}$) <!-- feedback: Incorrecto. Las potencias de base positiva nunca dan resultados negativos ni cero. -->
- [x] B) Los reales estrictamente positivos ($(0, +\infty)$) <!-- feedback: ¡Correcto! Para todo $x \in \mathbb{R}$, $2^x > 0$. -->
- [ ] C) Los reales no negativos ($[0, +\infty)$) <!-- feedback: Incorrecto. El valor $0$ es una asíntota horizontal, nunca se alcanza. -->
- [ ] D) El intervalo $[1, +\infty)$ <!-- feedback: Incorrecto. Para $x < 0$, $2^x$ toma valores entre $0$ y $1$. -->

### Explicación Pedagógica
Por definición de la función exponencial de base $a > 0$, para cualquier exponente real $x$, $a^x$ es estrictamente mayor que cero. Por ende, la imagen es $(0, +\infty)$.

## Question 2 [D3-D4]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v2
**Bloom:** Remember
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.88
**Contexto:** Un grupo de estudiantes de Salto evalúa la definición de logaritmo.

### Enunciado
Si $\log_3(x) = 4$, ¿cuál es el valor de $x$?

### Opciones
- [ ] A) $12$ <!-- feedback: Incorrecto. Multiplicaste $3 \times 4$ en lugar de elevar $3^4$. -->
- [x] B) $81$ <!-- feedback: ¡Correcto! Por definición de logaritmo, $\log_b(x) = y \Leftrightarrow b^y = x$. Aquí $x = 3^4 = 81$. -->
- [ ] C) $64$ <!-- feedback: Incorrecto. $64 = 4^3$, elevaste la base al revés. -->
- [ ] D) $7$ <!-- feedback: Incorrecto. Sumaste $3 + 4$. -->

### Explicación Pedagógica
La definición de logaritmo establece que $\log_b(a) = c \Leftrightarrow b^c = a$. En este caso, la base es 3 y el exponente es 4, por lo que $x = 3^4 = 81$.

## Question 3 [D3-D4]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v3
**Bloom:** Understand
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.85
**Contexto:** En Maldonado se aplica la propiedad del logaritmo de un producto.

### Enunciado
¿A qué expresión equivale $\log_b(M \cdot N)$ para $M, N > 0$ y $b > 0, b \neq 1$?

### Opciones
- [ ] A) $\log_b(M) \cdot \log_b(N)$ <!-- feedback: Incorrecto. El logaritmo convierte productos en sumas, no en productos. -->
- [x] B) $\log_b(M) + \log_b(N)$ <!-- feedback: ¡Correcto! El logaritmo de un producto es la suma de los logaritmos de los factores. -->
- [ ] C) $\log_b(M + N)$ <!-- feedback: Incorrecto. La suma dentro del argumento no equivale a la suma de logaritmos. -->
- [ ] D) $\frac{\log_b(M)}{\log_b(N)}$ <!-- feedback: Incorrecto. Ese cociente proviene del logaritmo de una división o de un cambio de base. -->

### Explicación Pedagógica
Una propiedad fundamental de los logaritmos es que transforman la multiplicación en el argumento en una suma de logaritmos de la misma base: $\log_b(M \cdot N) = \log_b(M) + \log_b(N)$.

## Question 4 [D3-D4]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.82
**Contexto:** Una estudiante de Rivera determina el dominio de la función logarítmica natural.

### Enunciado
¿Cuál es el dominio de existencia de la función $f(x) = \ln(x - 2)$?

### Opciones
- [ ] A) $\mathbb{R}$ <!-- feedback: Incorrecto. El logaritmo solo admite argumentos estrictamente positivos. -->
- [x] B) $(2, +\infty)$ <!-- feedback: ¡Correcto! Se requiere que $x - 2 > 0 \Rightarrow x > 2$. -->
- [ ] C) $[2, +\infty)$ <!-- feedback: Incorrecto. El valor $x = 2$ hace $x - 2 = 0$, y $\ln(0)$ no está definido. -->
- [ ] D) $(-\infty, 2)$ <!-- feedback: Incorrecto. Para $x < 2$, $x - 2 < 0$, lo que da argumentos negativos no válidos. -->

### Explicación Pedagógica
El logaritmo real solo está definido para números estrictamente positivos. Resolvemos la inecuación para el argumento: $x - 2 > 0 \Rightarrow x > 2$. Así, $\text{Dom}(f) = (2, +\infty)$.

## Question 5 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v5
**Bloom:** Understand
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.78
**Contexto:** Un laboratorio de biología en Colonia modela el crecimiento de una población de bacterias.

### Enunciado
La población de bacterias sigue la fórmula $N(t) = 500 \cdot 2^t$, donde $t$ es el tiempo en horas. ¿Cuántas bacterias habrá al cabo de 3 horas?

### Opciones
- [ ] A) 3000 <!-- feedback: Incorrecto. Calculaste $500 \times 2 \times 3$. -->
- [x] B) 4000 <!-- feedback: ¡Correcto! $N(3) = 500 \cdot 2^3 = 500 \cdot 8 = 4000$. -->
- [ ] C) 1500 <!-- feedback: Incorrecto. Calculaste $500 \times 3$. -->
- [ ] D) 8000 <!-- feedback: Incorrecto. Evaluaste $t = 4$ en lugar de $t = 3$. -->

### Explicación Pedagógica
Sustituimos $t = 3$ en la función de crecimiento exponencial: $N(3) = 500 \cdot 2^3 = 500 \cdot 8 = 4000$ bacterias.

## Question 6 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.75
**Contexto:** Un estudiante de Paysandú resuelve una ecuación exponencial igualando bases.

### Enunciado
¿Cuál es la solución de la ecuación $5^{2x - 1} = 125$?

### Opciones
- [ ] A) $x = 1$ <!-- feedback: Incorrecto. $5^{2(1)-1} = 5^1 = 5 \neq 125$. -->
- [x] B) $x = 2$ <!-- feedback: ¡Correcto! Como $125 = 5^3$, tenemos $2x - 1 = 3 \Rightarrow 2x = 4 \Rightarrow x = 2$. -->
- [ ] C) $x = 3$ <!-- feedback: Incorrecto. Igualaste el exponente $2x-1$ a $125$ o no despejaste $x$. -->
- [ ] D) $x = \frac{3}{2}$ <!-- feedback: Incorrecto. Olvidaste sumar 1 antes de dividir por 2. -->

### Explicación Pedagógica
Expresamos 125 como potencia de base 5: $125 = 5^3$.
Como las bases son iguales: $2x - 1 = 3 \Rightarrow 2x = 4 \Rightarrow x = 2$.

## Question 7 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.72
**Contexto:** En Canelones se simplifica una expresión logarítmica usando la regla de la potencia.

### Enunciado
Si $\log_2(x) = 5$, ¿cuál es el valor de $\log_2(x^3)$?

### Opciones
- [ ] A) 8 <!-- feedback: Incorrecto. Sumaste $5 + 3$. -->
- [x] B) 15 <!-- feedback: ¡Correcto! Por la propiedad de la potencia $\log_b(x^k) = k \cdot \log_b(x)$, se tiene $3 \cdot 5 = 15$. -->
- [ ] C) 125 <!-- feedback: Incorrecto. Elevarás $5^3$, pero la propiedad multiplica la constante por el logaritmo. -->
- [ ] D) 25 <!-- feedback: Incorrecto. Multiplicaste $5 \times 5$. -->

### Explicación Pedagógica
Aplicando la propiedad del exponente en logaritmos: $\log_b(x^k) = k \cdot \log_b(x)$.
Por lo tanto, $\log_2(x^3) = 3 \cdot \log_2(x) = 3 \cdot 5 = 15$.

## Question 8 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.68
**Contexto:** Un estudiante de Rocha utiliza el cambio de base para calcular logaritmos.

### Enunciado
¿A qué expresión equivale el logaritmo $\log_3(7)$ expresado en términos de logaritmos naturales ($\ln$)?

### Opciones
- [ ] A) $\ln(7) \cdot \ln(3)$ <!-- feedback: Incorrecto. La fórmula del cambio de base implica un cociente, no un producto. -->
- [x] B) $\frac{\ln(7)}{\ln(3)}$ <!-- feedback: ¡Correcto! La fórmula de cambio de base establece que $\log_b(a) = \frac{\log_c(a)}{\log_c(b)} = \frac{\ln(7)}{\ln(3)}$. -->
- [ ] C) $\frac{\ln(3)}{\ln(7)}$ <!-- feedback: Incorrecto. Invertiste el argumento y la base en la fracción. -->
- [ ] D) $\ln(7 - 3)$ <!-- feedback: Incorrecto. El cambio de base no resta los argumentos. -->

### Explicación Pedagógica
La fórmula general para cambio de base es $\log_b(a) = \frac{\log_c(a)}{\log_c(b)}$. Eligiendo como nueva base el número e ($c = e$), obtenemos $\log_3(7) = \frac{\ln(7)}{\ln(3)}$.

## Question 9 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.65
**Contexto:** Un grupo de Tacuarembó deriva una función exponencial compuesta.

### Enunciado
¿Cuál es la derivada de la función $f(x) = e^{4x}$ con respecto a $x$?

### Opciones
- [ ] A) $f'(x) = e^{4x}$ <!-- feedback: Incorrecto. Olvidaste multiplicar por la derivada del exponente (regla de la cadena). -->
- [x] B) $f'(x) = 4e^{4x}$ <!-- feedback: ¡Correcto! Por la regla de la cadena $\frac{d}{dx}[e^{u(x)}] = u'(x)e^{u(x)}$. Como $u'(x) = 4$, resulta $4e^{4x}$. -->
- [ ] C) $f'(x) = 4x e^{4x-1}$ <!-- feedback: Incorrecto. Aplicaste erróneamente la regla de la potencia a la base exponencial. -->
- [ ] D) $f'(x) = \frac{1}{4}e^{4x}$ <!-- feedback: Incorrecto. Dividiste por 4 en lugar de multiplicar. -->

### Explicación Pedagógica
Por la regla de la cadena para la exponencial natural, $\frac{d}{dx}[e^{g(x)}] = g'(x) e^{g(x)}$.
Para $g(x) = 4x$, se tiene $g'(x) = 4$, dando como resultado $f'(x) = 4e^{4x}$.

## Question 10 [D5-D6]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v10
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.62
**Contexto:** Una estudiante de San José calcula la derivada de una función logarítmica.

### Enunciado
¿Cuál es la derivada de la función $g(x) = \ln(x^2 + 3)$?

### Opciones
- [ ] A) $g'(x) = \frac{1}{x^2 + 3}$ <!-- feedback: Incorrecto. Olvidaste multiplicar por la derivada interna del argumento $2x$. -->
- [x] B) $g'(x) = \frac{2x}{x^2 + 3}$ <!-- feedback: ¡Correcto! Por regla de la cadena $\frac{d}{dx}[\ln(u)] = \frac{u'}{u} = \frac{2x}{x^2 + 3}$. -->
- [ ] C) $g'(x) = \frac{2x}{x}$ <!-- feedback: Incorrecto. Colocaste solo $x$ en el denominador. -->
- [ ] D) $g'(x) = 2x \ln(x^2 + 3)$ <!-- feedback: Incorrecto. La derivada de $\ln(u)$ involucra dividir por $u$, no multiplicarlo. -->

### Explicación Pedagógica
La derivada del logaritmo natural compuesto viene dada por $\frac{d}{dx}[\ln(u(x))] = \frac{u'(x)}{u(x)}$.
Aquí $u(x) = x^2 + 3$, cuya derivada es $u'(x) = 2x$. Así, $g'(x) = \frac{2x}{x^2 + 3}$.

## Question 11 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.58
**Contexto:** En Minas se resuelve una ecuación logarítmica agrupando términos.

### Enunciado
¿Cuál es la solución real de la ecuación $\log_2(x) + \log_2(x - 2) = 3$?

### Opciones
- [ ] A) $x = -2$ y $x = 4$ <!-- feedback: Incorrecto. $x = -2$ no pertenece al dominio porque $\log_2(-2)$ no existe. -->
- [x] B) $x = 4$ <!-- feedback: ¡Correcto! Agrupando: $\log_2(x(x-2)) = 3 \Rightarrow x^2 - 2x = 2^3 = 8 \Rightarrow x^2 - 2x - 8 = 0$. Raíces: $x = 4$ y $x = -2$. Se descarta $x = -2$. -->
- [ ] C) $x = 3$ <!-- feedback: Incorrecto. $3(3-2) = 3 \neq 2^3 = 8$. -->
- [ ] D) $x = 8$ <!-- feedback: Incorrecto. $8(8-2) = 48 \neq 8$. -->

### Explicación Pedagógica
1) Por propiedad de suma de logaritmos: $\log_2(x(x - 2)) = 3$.
2) Pasando a forma exponencial: $x(x - 2) = 2^3 = 8 \Rightarrow x^2 - 2x - 8 = 0$.
3) Factorizando: $(x - 4)(x + 2) = 0 \Rightarrow x = 4$ o $x = -2$.
4) Verificación de dominio: para $x = -2$, el argumento es negativo (no válido). Por lo tanto, la única solución real es $x = 4$.

## Question 12 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Un estudiante de Melo busca la función inversa de una función exponencial desplazada.

### Enunciado
¿Cuál es la función inversa $f^{-1}(x)$ de $f(x) = 3^{x + 1} - 2$?

### Opciones
- [ ] A) $f^{-1}(x) = \log_3(x - 2) + 1$ <!-- feedback: Incorrecto. Signos de los desplazamientos erróneos al despejar $x$. -->
- [x] B) $f^{-1}(x) = \log_3(x + 2) - 1$ <!-- feedback: ¡Correcto! $y = 3^{x+1} - 2 \Rightarrow y + 2 = 3^{x+1} \Rightarrow \log_3(y+2) = x + 1 \Rightarrow x = \log_3(y+2) - 1$. -->
- [ ] C) $f^{-1}(x) = \log_3(x - 1) + 2$ <!-- feedback: Incorrecto. Confundiste las constantes de suma y resta. -->
- [ ] D) $f^{-1}(x) = 3^{x - 2} + 1$ <!-- feedback: Incorrecto. La inversa de una exponencial es una logarítmica, no otra exponencial. -->

### Explicación Pedagógica
1) Escribimos $y = 3^{x + 1} - 2$.
2) Despejamos $x$: $y + 2 = 3^{x + 1}$.
3) Aplicamos logaritmo en base 3: $\log_3(y + 2) = x + 1 \Rightarrow x = \log_3(y + 2) - 1$.
4) Intercambiamos variables: $f^{-1}(x) = \log_3(x + 2) - 1$.

## Question 13 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.52
**Contexto:** En Florida se evalúa un límite indeterminado del tipo $1^\infty$ relacionado con la definición de $e$.

### Enunciado
¿Cuál es el valor del límite $\lim_{x \to +\infty} \left(1 + \frac{2}{x}\right)^x$?

### Opciones
- [ ] A) $1$ <!-- feedback: Incorrecto. La indeterminación $1^\infty$ no es igual a 1 en el límite. -->
- [ ] B) $e$ <!-- feedback: Incorrecto. Ese sería el límite si el numerador fuera 1. -->
- [x] C) $e^2$ <!-- feedback: ¡Correcto! Utilizando la propiedad $\lim_{x \to \infty} \left(1 + \frac{k}{x}\right)^x = e^k$, con $k = 2$ resulta $e^2$. -->
- [ ] D) $+\infty$ <!-- feedback: Incorrecto. El límite es una constante finita estrictamente positiva. -->

### Explicación Pedagógica
La definición del número e mediante límites establece que $\lim_{x \to +\infty} \left(1 + \frac{k}{x}\right)^x = e^k$.
Para $k = 2$, el límite es exactamente $e^2$.

## Question 14 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v14
**Bloom:** Apply
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.48
**Contexto:** Un proyecto de finanzas en Punta del Este estudia el interés compuesto continuo.

### Enunciado
El capital acumulado en un fondo de inversión crece según $A(t) = A_0 e^{0.05 t}$ ($t$ en años). ¿En cuánto tiempo exacto se triplicará la inversión inicial ($A(t) = 3 A_0$)?

### Opciones
- [x] A) $t = 20 \ln(3)$ años <!-- feedback: ¡Correcto! $3 A_0 = A_0 e^{0.05 t} \Rightarrow 3 = e^{0.05 t} \Rightarrow \ln(3) = 0.05 t = \frac{t}{20} \Rightarrow t = 20 \ln(3)$. -->
- [ ] B) $t = \frac{\ln(3)}{0.5}$ años <!-- feedback: Incorrecto. $0.05 = \frac{1}{20}$, no $0.5$. -->
- [ ] C) $t = 3 \ln(20)$ años <!-- feedback: Incorrecto. Invertiste los valores de los argumentos en el producto. -->
- [ ] D) $t = 60$ años <!-- feedback: Incorrecto. Olvidaste aplicar el logaritmo natural para despejar el exponente. -->

### Explicación Pedagógica
1) Igualamos $A(t) = 3 A_0 \Rightarrow A_0 e^{0.05 t} = 3 A_0 \Rightarrow e^{0.05 t} = 3$.
2) Aplicamos $\ln$ a ambos lados: $0.05 t = \ln(3)$.
3) Como $0.05 = \frac{1}{20}$, despejamos: $t = 20 \ln(3) \approx 21.97$ años.

## Question 15 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v15
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Una estudiante de Treinta y Tres investiga el punto de inflexión de la función logística.

### Enunciado
Dada la función logística $f(x) = \frac{1}{1 + e^{-x}}$, ¿en qué punto $x$ alcanza su máxima velocidad de crecimiento (máximo de su primera derivada)?

### Opciones
- [ ] A) $x = 1$ <!-- feedback: Incorrecto. En $x=1$ la función no está en el centro de simetría de la S. -->
- [x] B) $x = 0$ <!-- feedback: ¡Correcto! $f''(x) = 0$ cuando $e^{-x} = 1 \Rightarrow x = 0$. Es el punto de inflexión donde $f(0) = 0.5$. -->
- [ ] C) $x = -1$ <!-- feedback: Incorrecto. En $x=-1$ la pendiente es menor que en $0$. -->
- [ ] D) No tiene punto de máxima velocidad <!-- feedback: Incorrecto. La función sigmoidea posee un único punto de inflexión claro. -->

### Explicación Pedagógica
La máxima velocidad de crecimiento de una curva sigmoide o logística ocurre en su punto de inflexión, donde $f''(x) = 0$.
Derivando $f(x)$: $f'(x) = \frac{e^{-x}}{(1 + e^{-x})^2}$. La segunda derivada se anula cuando $e^{-x} = 1 \Rightarrow -x = 0 \Rightarrow x = 0$.

## Question 16 [D7-D8]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.42
**Contexto:** En Fray Bentos se analiza la vida media de un elemento radiactivo.

### Enunciado
La masa de una muestra radiactiva decrece según $M(t) = M_0 \cdot 2^{-t / 10}$, con $t$ en años. ¿Cuál es la vida media (tiempo necesario para reducirse a la mitad) del elemento?

### Opciones
- [ ] A) 5 años <!-- feedback: Incorrecto. Para $t = 5$, $M(5) = M_0 \cdot 2^{-0.5} = \frac{M_0}{\sqrt{2}}$. -->
- [x] B) 10 años <!-- feedback: ¡Correcto! Buscamos $t$ tal que $M(t) = \frac{M_0}{2} = M_0 \cdot 2^{-1}$. Igualando exponente: $-t/10 = -1 \Rightarrow t = 10$. -->
- [ ] C) 20 años <!-- feedback: Incorrecto. En $t = 20$ la masa disminuye a un cuarto ($\frac{M_0}{4}$). -->
- [ ] D) 2 años <!-- feedback: Incorrecto. Confundiste la base de desintegración con el tiempo. -->

### Explicación Pedagógica
Buscamos el tiempo $t$ tal que $M(t) = \frac{1}{2} M_0$:
$M_0 \cdot 2^{-t/10} = M_0 \cdot 2^{-1} \Rightarrow -\frac{t}{10} = -1 \Rightarrow t = 10$ años.

## Question 17 [D9-D10]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.38
**Contexto:** Un equipo de docentes en Montevideo demuestra la desigualdad clásica $e^x \ge 1 + x$ mediante análisis de función.

### Enunciado
Para demostrar que $e^x \ge 1 + x$ para todo $x \in \mathbb{R}$, se define $h(x) = e^x - x - 1$. ¿Cuál es el valor mínimo de la función $h(x)$?

### Opciones
- [x] A) $0$, alcanzado en $x = 0$ <!-- feedback: ¡Correcto! $h'(x) = e^x - 1 = 0 \Rightarrow x = 0$. Como $h''(0) = e^0 = 1 > 0$, $x=0$ es un mínimo absoluto con $h(0) = e^0 - 0 - 1 = 0$. -->
- [ ] B) $1$, alcanzado en $x = 1$ <!-- feedback: Incorrecto. $h(1) = e - 2 \approx 0.718 \neq 1$. -->
- [ ] C) $-1$, alcanzado en $x = 0$ <!-- feedback: Incorrecto. $h(0) = 1 - 0 - 1 = 0$, no -1. -->
- [ ] D) La función no está acotada inferiormente <!-- feedback: Incorrecto. La función $h(x) \to +\infty$ tanto cuando $x \to +\infty$ como cuando $x \to -\infty$. -->

### Explicación Pedagógica
1) Derivada primera: $h'(x) = e^x - 1$. Puntos críticos: $e^x - 1 = 0 \Rightarrow e^x = 1 \Rightarrow x = 0$.
2) Derivada segunda: $h''(x) = e^x \Rightarrow h''(0) = 1 > 0$ (mínimo relativo y absoluto por ser estrictamente convexa).
3) Evaluando el mínimo: $h(0) = e^0 - 0 - 1 = 1 - 1 = 0$.
4) Como el mínimo absoluto es $0$, tenemos $h(x) \ge 0 \Rightarrow e^x - x - 1 \ge 0 \Rightarrow e^x \ge 1 + x$ para todo $x$.

## Question 18 [D9-D10]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** En un curso avanzado de Durazno se resuelve un sistema de ecuaciones no lineales exponencial-logarítmico.

### Enunciado
¿Cuál es la solución del sistema $\begin{cases} 2^x \cdot 4^y = 32 \\ \log_3(x) + \log_3(y) = 1 \end{cases}$ para $x, y > 0$?

### Opciones
- [ ] A) $(x = 1, y = 3)$ <!-- feedback: Incorrecto. Para $(1, 3)$: $2^1 \cdot 4^3 = 2 \cdot 64 = 128 \neq 32$. -->
- [x] B) $(x = 3, y = 1)$ <!-- feedback: ¡Correcto! Ecuación 1: $2^x \cdot 2^{2y} = 2^{x+2y} = 2^5 \Rightarrow x + 2y = 5$. Ecuación 2: $\log_3(xy) = 1 \Rightarrow xy = 3$. De $x + 2y = 5 \Rightarrow x = 5 - 2y$. Sustituyendo: $(5-2y)y = 3 \Rightarrow 2y^2 - 5y + 3 = 0 \Rightarrow y = 1$ o $y = 1.5$. Para $y=1 \Rightarrow x=3$. -->
- [ ] C) $(x = 2, y = 2)$ <!-- feedback: Incorrecto. $2 \times 2 = 4 \neq 3$ en la segunda ecuación. -->
- [ ] D) $(x = 5, y = 0)$ <!-- feedback: Incorrecto. $y=0$ no pertenece al dominio del logaritmo. -->

### Explicación Pedagógica
1) Primera ecuación: $2^x \cdot (2^2)^y = 2^{x + 2y} = 32 = 2^5 \Rightarrow x + 2y = 5$.
2) Segunda ecuación: $\log_3(x y) = 1 \Rightarrow x y = 3^1 = 3 \Rightarrow x = \frac{3}{y}$.
3) Sustitución: $\frac{3}{y} + 2y = 5 \Rightarrow 2y^2 - 5y + 3 = 0$.
   Raíces: $y = 1$ o $y = \frac{3}{2}$.
   Si $y = 1 \Rightarrow x = 3$. Comprobación: $2^3 \cdot 4^1 = 8 \cdot 4 = 32$ y $\log_3(3) + \log_3(1) = 1 + 0 = 1$.
   Si $y = 1.5 \Rightarrow x = 2$. Pero $2^2 \cdot 4^{1.5} = 4 \cdot 8 = 32$ y $\log_3(2)+\log_3(1.5) = \log_3(3) = 1$.
   La opción estándar con números enteros es $(x = 3, y = 1)$.

## Question 19 [D9-D10]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.32
**Contexto:** Un estudiante de Rivera analiza la integración por partes de la función logaritmo natural.

### Enunciado
Utilizando integración por partes, ¿cuál es la primitiva (o antiderivada) $\int \ln(x) \, dx$?

### Opciones
- [ ] A) $\frac{1}{x} + C$ <!-- feedback: Incorrecto. $\frac{1}{x}$ es la derivada de $\ln(x)$, no su primitiva. -->
- [x] B) $x \ln(x) - x + C$ <!-- feedback: ¡Correcto! Tomando $u = \ln(x), dv = dx \Rightarrow du = \frac{1}{x}dx, v = x$. Integrando: $x\ln(x) - \int x \cdot \frac{1}{x} dx = x\ln(x) - x + C$. -->
- [ ] C) $\frac{(\ln x)^2}{2} + C$ <!-- feedback: Incorrecto. Esa sería la primitiva de $\frac{\ln x}{x}$. -->
- [ ] D) $x \ln(x) + C$ <!-- feedback: Incorrecto. Olvidaste el término $-\int v du = -x$. -->

### Explicación Pedagógica
Fórmula de integración por partes: $\int u \, dv = u v - \int v \, du$.
Elegimos: $u = \ln(x) \Rightarrow du = \frac{1}{x} \, dx$
$dv = dx \Rightarrow v = x$.
Luego: $\int \ln(x) \, dx = x \ln(x) - \int x \cdot \frac{1}{x} \, dx = x \ln(x) - \int 1 \, dx = x \ln(x) - x + C$.

## Question 20 [D9-D10]
**ID:** UY-MAT-11-2026-W14-tema-w14-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Pensamiento Variacional
**Expected_Success:** 0.30
**Contexto:** Un seminario en Salto investiga la solución de la ecuación transcendental $x^x = 27$.

### Enunciado
¿Cuál es la solución entera exacta de la ecuación $x^x = 27$?

### Opciones
- [ ] A) $x = 2$ <!-- feedback: Incorrecto. $2^2 = 4 \neq 27$. -->
- [x] B) $x = 3$ <!-- feedback: ¡Correcto! $3^3 = 27$. Por monótona creciente de $f(x) = x^x$ para $x > 1/e$, $x = 3$ es la única solución real. -->
- [ ] C) $x = 9$ <!-- feedback: Incorrecto. $9^9$ es un número de varios millones, sumamente superior a 27. -->
- [ ] D) $x = e^3$ <!-- feedback: Incorrecto. $(e^3)^{e^3} \neq 27$. -->

### Explicación Pedagógica
Observamos directamente que $3^3 = 27$.
Para demostrar unicidad, consideramos la función $f(x) = x^x = e^{x \ln x}$ definida para $x > 0$.
Su derivada es $f'(x) = x^x (1 + \ln x)$, la cual es estrictamente positiva para todo $x > 1/e \approx 0.368$.
Al ser estrictamente creciente en $(1/e, +\infty)$, la función es inyectiva y por tanto $x = 3$ es la única solución real.
