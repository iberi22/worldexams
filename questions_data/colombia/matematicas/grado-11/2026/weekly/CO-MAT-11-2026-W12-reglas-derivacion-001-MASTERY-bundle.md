---
id: "CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "reglas-derivacion"
periodo: "weekly"
week: "W12"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Reglas de Derivación - Grado 11

Este bundle contiene 20 preguntas sobre **reglas de derivación** para grado 11,
alineadas con los DBA del MEN Colombia y el marco de evaluación Saber 11 del ICFES.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.85
**Contexto:** En una empresa textil de Medellín, se modela el volumen de producción diaria en función del tiempo.

### Enunciado
Al derivar la función de producción $f(x) = x^2 (1x + 1)$ utilizando la regla del producto, ¿cuál es la derivada $f'(x)$?

### Opciones
- [x] A) $3x^2 + 2x$
  <!-- feedback: Se aplica correctamente la regla del producto derivando ambos factores. -->
- [ ] B) $2x^2 + 2x$
  <!-- feedback: Incorrecto: se derivó mal el segundo término. -->
- [ ] C) $3x^2 + x$
  <!-- feedback: Incorrecto: se omitió multiplicar el coeficiente por 2. -->
- [ ] D) $1x^2 + 3x$
  <!-- feedback: Incorrecto: se derivó como suma simple en vez de producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$, donde $u=x^2$ ($u'=2x$) y $v=1x+1$ ($v'=1$): $f'(x) = 2x(1x+1) + x^2(1) = 2x^2 + 2x + 1x^2 = 3x^2 + 2x$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Razonamiento
**Expected_Success:** 0.85
**Contexto:** Un laboratorio farmacéutico en Bogotá analiza la concentración de un medicamento en el torrente sanguíneo a lo largo de las horas.

### Enunciado
Al aplicar la regla del cociente a la función $f(x) = \frac{2x}{x + 1}$, ¿cuál es la expresión para $f'(x)$?

### Opciones
- [x] A) $\frac{2}{(x + 1)^2}$
  <!-- feedback: Correcto: la resta en el numerador simplifica adecuadamente a la constante. -->
- [ ] B) $\frac{2x}{(x + 1)^2}$
  <!-- feedback: Incorrecto: no se simplificaron las x del numerador. -->
- [ ] C) $\frac{4}{(x + 1)^2}$
  <!-- feedback: Incorrecto: se sumaron los términos del numerador en vez de restarlos. -->
- [ ] D) $\frac{2}{x + 1}$
  <!-- feedback: Incorrecto: se omitió elevar el denominador al cuadrado. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, donde $u=2x$ ($u'=2$) y $v=x+1$ ($v'=1$): $f'(x) = \frac{2(x+1) - 2x(1)}{(x+1)^2} = \frac{2x + 2 - 2x}{(x+1)^2} = \frac{2}{(x+1)^2}$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Resolucion
**Expected_Success:** 0.85
**Contexto:** En el puerto de Buenaventura, se registra el nivel de la marea y la tasa de variación del nivel del agua.

### Enunciado
Dada la función $f(x) = (x^2 + 3)^3$, ¿cuál es el resultado de aplicar la regla de la cadena para obtener $f'(x)$?

### Opciones
- [x] A) $6x(x^2 + 3)^2$
  <!-- feedback: Correcto: se multiplicó por la derivada interna 2x. -->
- [ ] B) $3(x^2 + 3)^2$
  <!-- feedback: Incorrecto: se olvidó multiplicar por la derivada interna del paréntesis. -->
- [ ] C) $6x^2(x^2 + 3)^2$
  <!-- feedback: Incorrecto: se elevó x al cuadrado en la derivada interna. -->
- [ ] D) $2x(x^2 + 3)^3$
  <!-- feedback: Incorrecto: no se redujo el exponente exterior. -->

### Explicacion Pedagogica
Por regla de la cadena, la derivada de $u^3$ es $3u^2 \cdot u'$. Con $u = x^2 + 3$, $u' = 2x$. Por tanto, $f'(x) = 3(x^2 + 3)^2 \cdot (2x) = 6x(x^2 + 3)^2$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Modelacion
**Expected_Success:** 0.85
**Contexto:** Un cultivo de flores en la Sabana de Bogotá estudia la tasa de crecimiento de las plantas bajo ciertas condiciones de riego.

### Enunciado
Dada la función lineal-potencial $f(x) = 4x^4 + 3x^2$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [x] A) $16x^3 + 6x$
  <!-- feedback: Correcto: se multiplicaron exponentes por coeficientes y se restarion 1 a los exponentes. -->
- [ ] B) $16x^4 + 6x$
  <!-- feedback: Incorrecto: no se disminuyó el exponente del primer término. -->
- [ ] C) $4x^3 + 3x$
  <!-- feedback: Incorrecto: se olvidó multiplicar por los exponentes originales. -->
- [ ] D) $16x^3 + 3$
  <!-- feedback: Incorrecto: se derivó 6x simplemente como 3. -->

### Explicacion Pedagogica
Aplicando la regla de la potencia y suma: $(c x^n)' = c n x^{n-1}$. Así, $(4x^4)' = 16x^3$ y $(3x^2)' = 6x$, dando $f'(x) = 16x^3 + 6x$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** En la ciudad de Cali, un sistema de transporte masivo monitorea la velocidad de los buses y la aceleración instantánea.

### Enunciado
Al derivar la función de producción $f(x) = x^2 (5x + 1)$ utilizando la regla del producto, ¿cuál es la derivada $f'(x)$?

### Opciones
- [x] A) $15x^2 + 2x$
  <!-- feedback: Se aplica correctamente la regla del producto derivando ambos factores. -->
- [ ] B) $10x^2 + 2x$
  <!-- feedback: Incorrecto: se derivó mal el segundo término. -->
- [ ] C) $15x^2 + x$
  <!-- feedback: Incorrecto: se omitió multiplicar el coeficiente por 2. -->
- [ ] D) $5x^2 + 3x$
  <!-- feedback: Incorrecto: se derivó como suma simple en vez de producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$, donde $u=x^2$ ($u'=2x$) y $v=5x+1$ ($v'=5$): $f'(x) = 2x(5x+1) + x^2(5) = 10x^2 + 2x + 5x^2 = 15x^2 + 2x$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.75
**Contexto:** Un ingeniero civil en el proyecto del metro de Bogotá evalúa la curva de deformación de una viga de concreto.

### Enunciado
Al aplicar la regla del cociente a la función $f(x) = \frac{6x}{x + 1}$, ¿cuál es la expresión para $f'(x)$?

### Opciones
- [x] A) $\frac{6}{(x + 1)^2}$
  <!-- feedback: Correcto: la resta en el numerador simplifica adecuadamente a la constante. -->
- [ ] B) $\frac{6x}{(x + 1)^2}$
  <!-- feedback: Incorrecto: no se simplificaron las x del numerador. -->
- [ ] C) $\frac{12}{(x + 1)^2}$
  <!-- feedback: Incorrecto: se sumaron los términos del numerador en vez de restarlos. -->
- [ ] D) $\frac{6}{x + 1}$
  <!-- feedback: Incorrecto: se omitió elevar el denominador al cuadrado. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, donde $u=6x$ ($u'=6$) y $v=x+1$ ($v'=1$): $f'(x) = \frac{6(x+1) - 6x(1)}{(x+1)^2} = \frac{6x + 6 - 6x}{(x+1)^2} = \frac{6}{(x+1)^2}$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.75
**Contexto:** En un proyecto agrícola en el departamento del Tolima, se calcula la producción máxima de arroz optimizando la fertilización.

### Enunciado
Dada la función $f(x) = (x^2 + 7)^3$, ¿cuál es el resultado de aplicar la regla de la cadena para obtener $f'(x)$?

### Opciones
- [x] A) $6x(x^2 + 7)^2$
  <!-- feedback: Correcto: se multiplicó por la derivada interna 2x. -->
- [ ] B) $3(x^2 + 7)^2$
  <!-- feedback: Incorrecto: se olvidó multiplicar por la derivada interna del paréntesis. -->
- [ ] C) $6x^2(x^2 + 7)^2$
  <!-- feedback: Incorrecto: se elevó x al cuadrado en la derivada interna. -->
- [ ] D) $2x(x^2 + 7)^3$
  <!-- feedback: Incorrecto: no se redujo el exponente exterior. -->

### Explicacion Pedagogica
Por regla de la cadena, la derivada de $u^3$ es $3u^2 \cdot u'$. Con $u = x^2 + 7$, $u' = 2x$. Por tanto, $f'(x) = 3(x^2 + 7)^2 \cdot (2x) = 6x(x^2 + 7)^2$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.75
**Contexto:** Una empresa de energía solar en Barranquilla modela la acumulación diaria de energía mediante la tasa de radiación captada.

### Enunciado
Dada la función lineal-potencial $f(x) = 8x^4 + 3x^2$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [x] A) $32x^3 + 6x$
  <!-- feedback: Correcto: se multiplicaron exponentes por coeficientes y se restarion 1 a los exponentes. -->
- [ ] B) $32x^4 + 6x$
  <!-- feedback: Incorrecto: no se disminuyó el exponente del primer término. -->
- [ ] C) $8x^3 + 3x$
  <!-- feedback: Incorrecto: se olvidó multiplicar por los exponentes originales. -->
- [ ] D) $32x^3 + 3$
  <!-- feedback: Incorrecto: se derivó 6x simplemente como 3. -->

### Explicacion Pedagogica
Aplicando la regla de la potencia y suma: $(c x^n)' = c n x^{n-1}$. Así, $(8x^4)' = 32x^3$ y $(3x^2)' = 6x$, dando $f'(x) = 32x^3 + 6x$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** En un estudio económico en Bucaramanga, se analiza el costo marginal y la utilidad máxima de una fábrica de calzado.

### Enunciado
Al derivar la función de producción $f(x) = x^2 (9x + 1)$ utilizando la regla del producto, ¿cuál es la derivada $f'(x)$?

### Opciones
- [x] A) $27x^2 + 2x$
  <!-- feedback: Se aplica correctamente la regla del producto derivando ambos factores. -->
- [ ] B) $18x^2 + 2x$
  <!-- feedback: Incorrecto: se derivó mal el segundo término. -->
- [ ] C) $27x^2 + x$
  <!-- feedback: Incorrecto: se omitió multiplicar el coeficiente por 2. -->
- [ ] D) $9x^2 + 3x$
  <!-- feedback: Incorrecto: se derivó como suma simple en vez de producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$, donde $u=x^2$ ($u'=2x$) y $v=9x+1$ ($v'=9$): $f'(x) = 2x(9x+1) + x^2(9) = 18x^2 + 2x + 9x^2 = 27x^2 + 2x$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.75
**Contexto:** Un centro meteorológico en Cartagena registra el incremento de la temperatura promedio durante el medio día.

### Enunciado
Al aplicar la regla del cociente a la función $f(x) = \frac{10x}{x + 1}$, ¿cuál es la expresión para $f'(x)$?

### Opciones
- [x] A) $\frac{10}{(x + 1)^2}$
  <!-- feedback: Correcto: la resta en el numerador simplifica adecuadamente a la constante. -->
- [ ] B) $\frac{10x}{(x + 1)^2}$
  <!-- feedback: Incorrecto: no se simplificaron las x del numerador. -->
- [ ] C) $\frac{20}{(x + 1)^2}$
  <!-- feedback: Incorrecto: se sumaron los términos del numerador en vez de restarlos. -->
- [ ] D) $\frac{10}{x + 1}$
  <!-- feedback: Incorrecto: se omitió elevar el denominador al cuadrado. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, donde $u=10x$ ($u'=10$) y $v=x+1$ ($v'=1$): $f'(x) = \frac{10(x+1) - 10x(1)}{(x+1)^2} = \frac{10x + 10 - 10x}{(x+1)^2} = \frac{10}{(x+1)^2}$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.65
**Contexto:** En una empresa textil de Medellín, se modela el volumen de producción diaria en función del tiempo.

### Enunciado
Dada la función $f(x) = (x^2 + 11)^3$, ¿cuál es el resultado de aplicar la regla de la cadena para obtener $f'(x)$?

### Opciones
- [x] A) $6x(x^2 + 11)^2$
  <!-- feedback: Correcto: se multiplicó por la derivada interna 2x. -->
- [ ] B) $3(x^2 + 11)^2$
  <!-- feedback: Incorrecto: se olvidó multiplicar por la derivada interna del paréntesis. -->
- [ ] C) $6x^2(x^2 + 11)^2$
  <!-- feedback: Incorrecto: se elevó x al cuadrado en la derivada interna. -->
- [ ] D) $2x(x^2 + 11)^3$
  <!-- feedback: Incorrecto: no se redujo el exponente exterior. -->

### Explicacion Pedagogica
Por regla de la cadena, la derivada de $u^3$ es $3u^2 \cdot u'$. Con $u = x^2 + 11$, $u' = 2x$. Por tanto, $f'(x) = 3(x^2 + 11)^2 \cdot (2x) = 6x(x^2 + 11)^2$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.65
**Contexto:** Un laboratorio farmacéutico en Bogotá analiza la concentración de un medicamento en el torrente sanguíneo a lo largo de las horas.

### Enunciado
Dada la función lineal-potencial $f(x) = 12x^4 + 3x^2$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [x] A) $48x^3 + 6x$
  <!-- feedback: Correcto: se multiplicaron exponentes por coeficientes y se restarion 1 a los exponentes. -->
- [ ] B) $48x^4 + 6x$
  <!-- feedback: Incorrecto: no se disminuyó el exponente del primer término. -->
- [ ] C) $12x^3 + 3x$
  <!-- feedback: Incorrecto: se olvidó multiplicar por los exponentes originales. -->
- [ ] D) $48x^3 + 3$
  <!-- feedback: Incorrecto: se derivó 6x simplemente como 3. -->

### Explicacion Pedagogica
Aplicando la regla de la potencia y suma: $(c x^n)' = c n x^{n-1}$. Así, $(12x^4)' = 48x^3$ y $(3x^2)' = 6x$, dando $f'(x) = 48x^3 + 6x$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.65
**Contexto:** En el puerto de Buenaventura, se registra el nivel de la marea y la tasa de variación del nivel del agua.

### Enunciado
Al derivar la función de producción $f(x) = x^2 (13x + 1)$ utilizando la regla del producto, ¿cuál es la derivada $f'(x)$?

### Opciones
- [x] A) $39x^2 + 2x$
  <!-- feedback: Se aplica correctamente la regla del producto derivando ambos factores. -->
- [ ] B) $26x^2 + 2x$
  <!-- feedback: Incorrecto: se derivó mal el segundo término. -->
- [ ] C) $39x^2 + x$
  <!-- feedback: Incorrecto: se omitió multiplicar el coeficiente por 2. -->
- [ ] D) $13x^2 + 3x$
  <!-- feedback: Incorrecto: se derivó como suma simple en vez de producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$, donde $u=x^2$ ($u'=2x$) y $v=13x+1$ ($v'=13$): $f'(x) = 2x(13x+1) + x^2(13) = 26x^2 + 2x + 13x^2 = 39x^2 + 2x$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.65
**Contexto:** Un cultivo de flores en la Sabana de Bogotá estudia la tasa de crecimiento de las plantas bajo ciertas condiciones de riego.

### Enunciado
Al aplicar la regla del cociente a la función $f(x) = \frac{14x}{x + 1}$, ¿cuál es la expresión para $f'(x)$?

### Opciones
- [x] A) $\frac{14}{(x + 1)^2}$
  <!-- feedback: Correcto: la resta en el numerador simplifica adecuadamente a la constante. -->
- [ ] B) $\frac{14x}{(x + 1)^2}$
  <!-- feedback: Incorrecto: no se simplificaron las x del numerador. -->
- [ ] C) $\frac{28}{(x + 1)^2}$
  <!-- feedback: Incorrecto: se sumaron los términos del numerador en vez de restarlos. -->
- [ ] D) $\frac{14}{x + 1}$
  <!-- feedback: Incorrecto: se omitió elevar el denominador al cuadrado. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, donde $u=14x$ ($u'=14$) y $v=x+1$ ($v'=1$): $f'(x) = \frac{14(x+1) - 14x(1)}{(x+1)^2} = \frac{14x + 14 - 14x}{(x+1)^2} = \frac{14}{(x+1)^2}$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.65
**Contexto:** En la ciudad de Cali, un sistema de transporte masivo monitorea la velocidad de los buses y la aceleración instantánea.

### Enunciado
Dada la función $f(x) = (x^2 + 15)^3$, ¿cuál es el resultado de aplicar la regla de la cadena para obtener $f'(x)$?

### Opciones
- [x] A) $6x(x^2 + 15)^2$
  <!-- feedback: Correcto: se multiplicó por la derivada interna 2x. -->
- [ ] B) $3(x^2 + 15)^2$
  <!-- feedback: Incorrecto: se olvidó multiplicar por la derivada interna del paréntesis. -->
- [ ] C) $6x^2(x^2 + 15)^2$
  <!-- feedback: Incorrecto: se elevó x al cuadrado en la derivada interna. -->
- [ ] D) $2x(x^2 + 15)^3$
  <!-- feedback: Incorrecto: no se redujo el exponente exterior. -->

### Explicacion Pedagogica
Por regla de la cadena, la derivada de $u^3$ es $3u^2 \cdot u'$. Con $u = x^2 + 15$, $u' = 2x$. Por tanto, $f'(x) = 3(x^2 + 15)^2 \cdot (2x) = 6x(x^2 + 15)^2$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.65
**Contexto:** Un ingeniero civil en el proyecto del metro de Bogotá evalúa la curva de deformación de una viga de concreto.

### Enunciado
Dada la función lineal-potencial $f(x) = 16x^4 + 3x^2$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [x] A) $64x^3 + 6x$
  <!-- feedback: Correcto: se multiplicaron exponentes por coeficientes y se restarion 1 a los exponentes. -->
- [ ] B) $64x^4 + 6x$
  <!-- feedback: Incorrecto: no se disminuyó el exponente del primer término. -->
- [ ] C) $16x^3 + 3x$
  <!-- feedback: Incorrecto: se olvidó multiplicar por los exponentes originales. -->
- [ ] D) $64x^3 + 3$
  <!-- feedback: Incorrecto: se derivó 6x simplemente como 3. -->

### Explicacion Pedagogica
Aplicando la regla de la potencia y suma: $(c x^n)' = c n x^{n-1}$. Así, $(16x^4)' = 64x^3$ y $(3x^2)' = 6x$, dando $f'(x) = 64x^3 + 6x$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Algebraico
**Expected_Success:** 0.55
**Contexto:** En un proyecto agrícola en el departamento del Tolima, se calcula la producción máxima de arroz optimizando la fertilización.

### Enunciado
Al derivar la función de producción $f(x) = x^2 (17x + 1)$ utilizando la regla del producto, ¿cuál es la derivada $f'(x)$?

### Opciones
- [x] A) $51x^2 + 2x$
  <!-- feedback: Se aplica correctamente la regla del producto derivando ambos factores. -->
- [ ] B) $34x^2 + 2x$
  <!-- feedback: Incorrecto: se derivó mal el segundo término. -->
- [ ] C) $51x^2 + x$
  <!-- feedback: Incorrecto: se omitió multiplicar el coeficiente por 2. -->
- [ ] D) $17x^2 + 3x$
  <!-- feedback: Incorrecto: se derivó como suma simple en vez de producto. -->

### Explicacion Pedagogica
Aplicando la regla del producto $(u \cdot v)' = u'v + uv'$, donde $u=x^2$ ($u'=2x$) y $v=17x+1$ ($v'=17$): $f'(x) = 2x(17x+1) + x^2(17) = 34x^2 + 2x + 17x^2 = 51x^2 + 2x$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.55
**Contexto:** Una empresa de energía solar en Barranquilla modela la acumulación diaria de energía mediante la tasa de radiación captada.

### Enunciado
Al aplicar la regla del cociente a la función $f(x) = \frac{18x}{x + 1}$, ¿cuál es la expresión para $f'(x)$?

### Opciones
- [x] A) $\frac{18}{(x + 1)^2}$
  <!-- feedback: Correcto: la resta en el numerador simplifica adecuadamente a la constante. -->
- [ ] B) $\frac{18x}{(x + 1)^2}$
  <!-- feedback: Incorrecto: no se simplificaron las x del numerador. -->
- [ ] C) $\frac{36}{(x + 1)^2}$
  <!-- feedback: Incorrecto: se sumaron los términos del numerador en vez de restarlos. -->
- [ ] D) $\frac{18}{x + 1}$
  <!-- feedback: Incorrecto: se omitió elevar el denominador al cuadrado. -->

### Explicacion Pedagogica
Aplicando la regla del cociente $(\frac{u}{v})' = \frac{u'v - uv'}{v^2}$, donde $u=18x$ ($u'=18$) y $v=x+1$ ($v'=1$): $f'(x) = \frac{18(x+1) - 18x(1)}{(x+1)^2} = \frac{18x + 18 - 18x}{(x+1)^2} = \frac{18}{(x+1)^2}$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.55
**Contexto:** En un estudio económico en Bucaramanga, se analiza el costo marginal y la utilidad máxima de una fábrica de calzado.

### Enunciado
Dada la función $f(x) = (x^2 + 19)^3$, ¿cuál es el resultado de aplicar la regla de la cadena para obtener $f'(x)$?

### Opciones
- [x] A) $6x(x^2 + 19)^2$
  <!-- feedback: Correcto: se multiplicó por la derivada interna 2x. -->
- [ ] B) $3(x^2 + 19)^2$
  <!-- feedback: Incorrecto: se olvidó multiplicar por la derivada interna del paréntesis. -->
- [ ] C) $6x^2(x^2 + 19)^2$
  <!-- feedback: Incorrecto: se elevó x al cuadrado en la derivada interna. -->
- [ ] D) $2x(x^2 + 19)^3$
  <!-- feedback: Incorrecto: no se redujo el exponente exterior. -->

### Explicacion Pedagogica
Por regla de la cadena, la derivada de $u^3$ es $3u^2 \cdot u'$. Con $u = x^2 + 19$, $u' = 2x$. Por tanto, $f'(x) = 3(x^2 + 19)^2 \cdot (2x) = 6x(x^2 + 19)^2$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W12-reglas-derivacion-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.55
**Contexto:** Un centro meteorológico en Cartagena registra el incremento de la temperatura promedio durante el medio día.

### Enunciado
Dada la función lineal-potencial $f(x) = 20x^4 + 3x^2$, ¿cuál es su derivada $f'(x)$?

### Opciones
- [x] A) $80x^3 + 6x$
  <!-- feedback: Correcto: se multiplicaron exponentes por coeficientes y se restarion 1 a los exponentes. -->
- [ ] B) $80x^4 + 6x$
  <!-- feedback: Incorrecto: no se disminuyó el exponente del primer término. -->
- [ ] C) $20x^3 + 3x$
  <!-- feedback: Incorrecto: se olvidó multiplicar por los exponentes originales. -->
- [ ] D) $80x^3 + 3$
  <!-- feedback: Incorrecto: se derivó 6x simplemente como 3. -->

### Explicacion Pedagogica
Aplicando la regla de la potencia y suma: $(c x^n)' = c n x^{n-1}$. Así, $(20x^4)' = 80x^3$ y $(3x^2)' = 6x$, dando $f'(x) = 80x^3 + 6x$.
