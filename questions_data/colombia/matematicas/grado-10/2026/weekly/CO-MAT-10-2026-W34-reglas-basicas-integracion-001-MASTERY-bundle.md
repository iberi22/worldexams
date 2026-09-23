---
id: "CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle"
country: "colombia"
grado: 10
asignatura: "matematicas"
tema: "reglas-basicas-integracion"
periodo: "weekly"
week: "W34"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Reglas Básicas de Integración - Grado 10

Este bundle contiene 12 preguntas sobre **reglas-basicas-integracion** para grado 10, alineadas con los DBA del MEN Colombia y el marco de evaluación Saber 11.

## Question 1 [D3-D4]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.90
**Contexto:** En Bogotá, Valentina repasa en clase la regla de la potencia para integrales.
### Enunciado
¿Cuál es el resultado de aplicar la regla de la potencia $\int x^n \, dx$ cuando $n \neq -1$?
### Opciones
- [ ] A) $nx^{n-1} + C$
  <!-- feedback: Incorrecto. Esa es la fórmula de la derivada, no la de la integral. -->
- [x] B) $\frac{x^{n+1}}{n+1} + C$
  <!-- feedback: Correcto. Se sube el exponente en 1 y se divide entre el nuevo exponente. -->
- [ ] C) $x^{n+1} + C$
  <!-- feedback: Incorrecto. Falta dividir entre $n+1$. -->
- [ ] D) $(n+1)x^n + C$
  <!-- feedback: Incorrecto. La estructura de la respuesta no corresponde a la regla. -->
### Explicacion Pedagogica
Para $n \neq -1$, la regla de la potencia para integrales establece $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$, lo que es la operación inversa de derivar $x^{n+1}$.

## Question 2 [D3-D4]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.88
**Contexto:** En Medellín, Santiago explica la regla del múltiplo constante para integrar.
### Enunciado
¿Qué establece la regla del múltiplo constante $\int k \cdot f(x) \, dx$?
### Opciones
- [ ] A) $k + \int f(x) \, dx$
  <!-- feedback: Incorrecto. La constante no se suma al resultado de la integral. -->
- [x] B) $k \int f(x) \, dx + C$
  <!-- feedback: Correcto. La constante $k$ sale de la integral multiplicando la antiderivada de $f$. -->
- [ ] C) $\int k \cdot f(x) \, dx$ no se puede simplificar.
  <!-- feedback: Incorrecto. Sí se puede factorizar la constante. -->
- [ ] D) $\int k \, dx + \int f(x) \, dx$
  <!-- feedback: Incorrecto. La constante $k$ no se trata como una integral separada. -->
### Explicacion Pedagogica
La regla del múltiplo constante indica que una constante multiplicando una función puede salir del signo integral: $\int k \cdot f(x) \, dx = k \int f(x) \, dx + C$.

## Question 3 [D3-D4]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.86
**Contexto:** En Cali, Mariana combina dos reglas: el múltiplo constante y la suma.
### Enunciado
¿Cuál es la integral $\int (f(x) + g(x)) \, dx$ según la regla de la suma?
### Opciones
- [x] A) $\int f(x) \, dx + \int g(x) \, dx + C$
  <!-- feedback: Correcto. La integral de una suma es la suma de las integrales. -->
- [ ] B) $\int f(x) \, dx \cdot \int g(x) \, dx$
  <!-- feedback: Incorrecto. La suma no se convierte en producto de integrales. -->
- [ ] C) $f(x) \cdot g(x) + C$
  <!-- feedback: Incorrecto. Eso sería el producto de funciones, no su integral. -->
- [ ] D) $\int f(x) \, dx - \int g(x) \, dx$
  <!-- feedback: Incorrecto. La suma no se transforma en resta. -->
### Explicacion Pedagogica
La integral es lineal: la integral de una suma (o diferencia) es la suma (o diferencia) de las integrales de cada sumando, con una sola constante $+C$ al final.

## Question 4 [D5-D6]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.82
**Contexto:** En Cartagena, Valentina debe integrar $f(x) = 6x^2$.
### Enunciado
¿Cuál es el resultado de $\int 6x^2 \, dx$?
### Opciones
- [ ] A) $12x + C$
  <!-- feedback: Incorrecto. Es la derivada, no la integral. -->
- [x] B) $2x^3 + C$
  <!-- feedback: Correcto. Aplicando la regla de la potencia con $n=2$ y el múltiplo constante $6$. -->
- [ ] C) $6x^3 + C$
  <!-- feedback: Incorrecto. Dividiste $6$ entre $3$ como si dieran $2$, pero omitiste dividir. -->
- [ ] D) $2x^2 + C$
  <!-- feedback: Incorrecto. No subiste el exponente a $3$. -->
### Explicacion Pedagogica
Aplicando la regla de la potencia: $\int 6x^2 \, dx = 6 \cdot \frac{x^{3}}{3} + C = 2x^3 + C$.

## Question 5 [D5-D6]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** En Barranquilla, Santiago calcula $\int 5x^4 \, dx$.
### Enunciado
¿Cuál es el resultado de la integral?
### Opciones
- [x] A) $x^5 + C$
  <!-- feedback: Correcto. $\int 5x^4 \, dx = 5 \cdot \frac{x^5}{5} + C = x^5 + C$. -->
- [ ] B) $5x^5 + C$
  <!-- feedback: Incorrecto. No dividiste $5$ entre el nuevo exponente $5$. -->
- [ ] C) $x^4 + C$
  <!-- feedback: Incorrecto. Bajaste el exponente en vez de subirlo. -->
- [ ] D) $\frac{5x^5}{4} + C$
  <!-- feedback: Incorrecto. Dividiste entre el exponente anterior $4$ en vez del nuevo $5$. -->
### Explicacion Pedagogica
Por la regla de la potencia: $\int 5x^4 \, dx = 5 \cdot \frac{x^{5}}{5} + C = x^5 + C$. El factor $5$ y el divisor $5$ se cancelan.

## Question 6 [D5-D6]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** En Bucaramanga, Mariana integra $\int (3x^2 + 4x - 2) \, dx$ combinando las reglas básicas.
### Enunciado
¿Cuál es el resultado correcto?
### Opciones
- [ ] A) $6x + 4 + C$
  <!-- feedback: Incorrecto. Es la derivada, no la integral. -->
- [ ] B) $3x^3 + 4x^2 - 2x + C$
  <!-- feedback: Incorrecto. Multiplicaste el cociente, debiste dividir cada término entre su nuevo exponente. -->
- [x] C) $x^3 + 2x^2 - 2x + C$
  <!-- feedback: Correcto. Cada término se integra por separado: $\int 3x^2 dx = x^3$, $\int 4x dx = 2x^2$, $\int -2 dx = -2x$. -->
- [ ] D) $x^3 + 2x^2 - 2x$
  <!-- feedback: Incorrecto. Falta la constante $+C$. -->
### Explicacion Pedagogica
Se aplica la regla de la potencia a cada monomio: $\int 3x^2 dx = x^3$, $\int 4x dx = 2x^2$, $\int -2 dx = -2x$. La suma final, más $+C$, da $x^3 + 2x^2 - 2x + C$.

## Question 7 [D7-D8]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.74
**Contexto:** En Pereira, Valentina observa que $\int (x^2 + x) \, dx$ se puede separar como suma de integrales.
### Enunciado
¿Por qué es válido escribir $\int (x^2 + x) \, dx = \int x^2 \, dx + \int x \, dx$?
### Opciones
- [ ] A) Porque la integral solo aplica a funciones positivas.
  <!-- feedback: Incorrecto. La integral se aplica a funciones con cualquier signo. -->
- [ ] B) Porque el producto de integrales equivale a la integral del producto.
  <!-- feedback: Incorrecto. La regla aplica a sumas, no a productos. -->
- [x] C) Porque la integral es lineal y la integral de una suma es la suma de las integrales.
  <!-- feedback: Correcto. Es una consecuencia directa de la linealidad de la integral. -->
- [ ] D) Porque $x^2$ y $x$ son funciones iguales.
  <!-- feedback: Incorrecto. Son funciones distintas, aunque relacionadas. -->
### Explicacion Pedagogica
La integral indefinida es una operación lineal: respeta sumas y múltiplos constantes, por lo que $\int (f+g) \, dx = \int f \, dx + \int g \, dx$.

## Question 8 [D7-D8]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.72
**Contexto:** En Medellín, Santiago debe reconocer qué regla falla cuando $n = -1$.
### Enunciado
¿Por qué la fórmula $\int x^n \, dx = \frac{x^{n+1}}{n+1} + C$ no aplica cuando $n = -1$?
### Opciones
- [ ] A) Porque en $n = -1$ la derivada de $\frac{x^{n+1}}{n+1}$ no existe.
  <!-- feedback: Incorrecto. La derivada sí existe para cualquier $n$, el problema es la división por cero. -->
- [x] B) Porque al sustituir $n = -1$ se divide entre $0$, lo que no está definido.
  <!-- feedback: Correcto. El denominador $n+1$ se anula y la expresión deja de tener sentido. -->
- [ ] C) Porque la fórmula solo aplica a exponentes enteros positivos.
  <!-- feedback: Incorrecto. La regla funciona para cualquier $n \neq -1$, incluso negativo o fraccionario. -->
- [ ] D) Porque con $n = -1$ el resultado es una raíz cuadrada.
  <!-- feedback: Incorrecto. La forma del resultado no depende de raíces. -->
### Explicacion Pedagogica
La fórmula requiere $n \neq -1$, ya que el denominador $n+1$ se vuelve cero. Para ese caso se usa la regla especial $\int \frac{1}{x} \, dx = \ln|x| + C$.

## Question 9 [D7-D8]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.70
**Contexto:** En Cali, Mariana combina múltiples reglas para resolver $\int (8x^3 - 12x^2 + 5) \, dx$.
### Enunciado
¿Cuál es el resultado?
### Opciones
- [ ] A) $24x^2 - 24x + 5 + C$
  <!-- feedback: Incorrecto. Es la derivada, no la integral. -->
- [x] B) $2x^4 - 4x^3 + 5x + C$
  <!-- feedback: Correcto. Cada monomio se integra por separado aplicando potencia y múltiplo constante. -->
- [ ] C) $2x^4 - 4x^3 + 5x$
  <!-- feedback: Incorrecto. Falta la constante $+C$. -->
- [ ] D) $2x^4 - 4x^3 + C$
  <!-- feedback: Incorrecto. Te faltó integrar la constante $5$. -->
### Explicacion Pedagogica
Por la regla de la potencia: $\int 8x^3 dx = 2x^4$, $\int -12x^2 dx = -4x^3$, $\int 5 dx = 5x$. Sumando, queda $2x^4 - 4x^3 + 5x + C$.

## Question 10 [D9-D10]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v10
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.65
**Contexto:** En Bogotá, un estudiante propone $\int 4x^3 \, dx = x^4$ sin la constante $+C$.
### Enunciado
¿Cuál es la valoración correcta de esa respuesta?
### Opciones
- [ ] A) Es totalmente correcta, porque $x^4$ es una antiderivada válida de $4x^3$.
  <!-- feedback: Incorrecto. Falta la constante $+C$ exigida por la integral indefinida. -->
- [ ] B) Es correcta solo si no se evalúa en un punto.
  <!-- feedback: Incorrecto. La condición no tiene relación con la presencia de $+C$. -->
- [x] C) Es incompleta: la integral indefinida exige $+C$ para representar todas las antiderivadas.
  <!-- feedback: Correcto. Aunque $x^4$ es una antiderivada particular, la familia completa es $x^4 + C$. -->
- [ ] D) Es incorrecta porque $x^4$ no es antiderivada de $4x^3$.
  <!-- feedback: Incorrecto. Sí lo es: la derivada de $x^4$ es $4x^3$. -->
### Explicacion Pedagogica
La integral indefinida devuelve la familia completa de antiderivadas, no solo una. Por tanto, debe escribirse $\int 4x^3 \, dx = x^4 + C$.

## Question 11 [D9-D10]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.60
**Contexto:** En Medellín, Santiago verifica su propia respuesta derivando el resultado de una integral.
### Enunciado
Si una estudiante obtuvo $\int (3x^2 - 6x) \, dx = x^3 - 6x^2 + C$, ¿cuál es la mejor forma de comprobar el resultado?
### Opciones
- [ ] A) Graficar la función primitiva y medir su altura máxima.
  <!-- feedback: Incorrecto. La altura máxima no verifica la derivada. -->
- [ ] B) Sumar todos los coeficientes y verificar que el total dé $0$.
  <!-- feedback: Incorrecto. Ese procedimiento no tiene relación con la derivada. -->
- [x] C) Derivar el resultado y comprobar que se recupera la función original $3x^2 - 6x$.
  <!-- feedback: Correcto. Por definición, la derivada de la primitiva debe coincidir con el integrando. -->
- [ ] D) Derivar el resultado y dividir entre el número de términos.
  <!-- feedback: Incorrecto. Dividir no aporta información. -->
### Explicacion Pedagogica
Para verificar una integral indefinida, basta derivar el resultado. Si la derivada coincide con el integrando, la primitiva es correcta y la constante $+C$ desaparece automáticamente.

## Question 12 [D9-D10]
**ID:** CO-MAT-10-2026-W34-reglas-basicas-integracion-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.55
**Contexto:** En Cartagena, Valentina debe integrar $\int (ax^2 + bx + c) \, dx$ en términos de los parámetros $a$, $b$, $c$.
### Enunciado
¿Cuál es la expresión general correcta?
### Opciones
- [ ] A) $ax^3 + bx^2 + cx + C$
  <!-- feedback: Incorrecto. No dividiste cada coeficiente entre el nuevo exponente. -->
- [x] B) $\frac{a}{3}x^3 + \frac{b}{2}x^2 + cx + C$
  <!-- feedback: Correcto. Cada monomio se integra aplicando la regla de la potencia y el múltiplo constante. -->
- [ ] C) $2ax + b + C$
  <!-- feedback: Incorrecto. Es la derivada, no la integral. -->
- [ ] D) $\frac{a}{3}x^3 + \frac{b}{2}x^2 + C$
  <!-- feedback: Incorrecto. Te faltó el término lineal $cx$ proveniente de la constante $c$. -->
### Explicacion Pedagogica
Aplicando término a término: $\int ax^2 dx = \frac{a}{3}x^3$, $\int bx dx = \frac{b}{2}x^2$, $\int c dx = cx$, y se suma $+C$. Así, $\int (ax^2 + bx + c) \, dx = \frac{a}{3}x^3 + \frac{b}{2}x^2 + cx + C$.
