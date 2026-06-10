---
id: "AR-MAT-11-2026-W36-integral-definida-001-MASTERY"
country: "ar"
grado: 11
asignatura: "matematica"
tema: "integral-definida"
periodo: "weekly"
semana: "W36"
protocol_version: "5.2"
year: 2026
bundle_index: 1
bundle_size: 20
alignment: "NAP Matemática 2026"
modern_context: true
distractor_profile: "plausible_peer_set"
rubric_baseline: "Integral definida - Grado 11 - matemática"
license: "FREE"
---

# Bundle MASTERY: Integral definida - Grado 11

Este bundle contiene 20 preguntas sobre la **integral definida**, la Regla de Barrow y sus propiedades, alineadas con los NAP de Argentina.

---

## Pregunta 1 [D3-D4]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v1`
**Bloom:** Remember
**NAP:** Concepto de integral definida.
**Expected_Success:** 0.88
**Context:** Un profesor porteño introduce la Regla de Barrow.

### Enunciado
¿Qué establece la Regla de Barrow para calcular $\int_a^b f(x) \, dx$ si $F(x)$ es una primitiva de $f(x)$?

### Opciones
- [x] A) $\int_a^b f(x) \, dx = F(b) - F(a)$
  <!-- feedback: Correcto. Se evalúa la primitiva en el límite superior menos el inferior. -->
- [ ] B) $\int_a^b f(x) \, dx = F(a) - F(b)$
  <!-- feedback: El orden de la resta está invertido. -->
- [ ] C) $\int_a^b f(x) \, dx = f(b) - f(a)$
  <!-- feedback: Se debe usar la primitiva, no la función original. -->
- [ ] D) $\int_a^b f(x) \, dx = F(b) + F(a)$
  <!-- feedback: Se debe restar, no sumar. -->

### Explicación Pedagógica
La Regla de Barrow conecta el cálculo integral con el diferencial, permitiendo hallar el valor de la integral definida mediante la primitiva.

---

## Pregunta 2 [D3-D4]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v2`
**Bloom:** Understand
**NAP:** Interpretación geométrica de la integral definida.
**Expected_Success:** 0.85
**Context:** En una clase de geometría en un colegio de Mendoza.

### Enunciado
Si $f(x) \geq 0$ en el intervalo $[a, b]$, ¿qué representa el número obtenido al calcular $\int_a^b f(x) \, dx$?

### Opciones
- [x] A) El área bajo la curva $f(x)$ y sobre el eje $x$ entre $a$ y $b$.
  <!-- feedback: Correcto. Es la interpretación geométrica estándar. -->
- [ ] B) La longitud de la curva entre los puntos $a$ y $b$.
  <!-- feedback: Para la longitud se usa otra fórmula integral más compleja. -->
- [ ] C) La pendiente de la recta que une $a$ con $b$.
  <!-- feedback: Eso es una tasa de cambio media. -->
- [ ] D) El valor máximo que alcanza la función.
  <!-- feedback: La integral mide acumulación, no valores extremos. -->

### Explicación Pedagógica
La integral definida suma infinitos rectángulos de base infinitesimal para hallar el área total de una superficie curva.

---

## Pregunta 3 [D3-D4]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v3`
**Bloom:** Apply
**NAP:** Cálculo de integrales definidas básicas.
**Expected_Success:** 0.82
**Context:** Un estudiante de Mar del Plata calcula la variación de la posición de un surfista.

### Enunciado
Calculá el valor de $\int_1^3 2x \, dx$.

### Opciones
- [x] A) 8
  <!-- feedback: Primitiva es $x^2$. $F(3) - F(1) = 9 - 1 = 8$. -->
- [ ] B) 9
  <!-- feedback: Olvidaste restar el valor en el límite inferior. -->
- [ ] C) 4
  <!-- feedback: Error al evaluar los límites. -->
- [ ] D) 10
  <!-- feedback: Error en el cálculo de la primitiva o la resta. -->

### Explicación Pedagógica
Aplicamos Barrow: hallamos la primitiva $x^2$ y evaluamos en los extremos del intervalo.

---

## Pregunta 4 [D3-D4]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v4`
**Bloom:** Understand
**NAP:** Propiedades de la integral definida.
**Expected_Success:** 0.80
**Context:** Una pregunta conceptual en una guía de estudio en Rosario.

### Enunciado
¿Cuánto vale $\int_a^a f(x) \, dx$?

### Opciones
- [x] A) 0
  <!-- feedback: Correcto. Si el intervalo no tiene ancho, el área es nula. -->
- [ ] B) $f(a)$
  <!-- feedback: No puede ser un valor de la función si el ancho del intervalo es cero. -->
- [ ] C) 1
  <!-- feedback: No hay razón para que sea la unidad. -->
- [ ] D) $F(a)$
  <!-- feedback: Según Barrow: $F(a)-F(a)=0$. -->

### Explicación Pedagógica
Cualquier integral definida cuyo límite inferior y superior sean idénticos resulta en cero.

---

## Pregunta 5 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v5`
**Bloom:** Apply
**NAP:** Propiedad de aditividad del intervalo.
**Expected_Success:** 0.70
**Context:** Se analiza el consumo eléctrico dividido en dos turnos en una fábrica de Córdoba.

### Enunciado
Si $\int_0^2 f(x) \, dx = 5$ y $\int_2^5 f(x) \, dx = 12$, ¿cuánto vale $\int_0^5 f(x) \, dx$?

### Opciones
- [x] A) 17
  <!-- feedback: Propiedad de aditividad: la integral de $0$ a $5$ es la suma de las integrales intermedias. -->
- [ ] B) 7
  <!-- feedback: Restaste los valores en lugar de sumarlos. -->
- [ ] C) 60
  <!-- feedback: Multiplicaste los valores en lugar de sumarlos. -->
- [ ] D) 5
  <!-- feedback: Ignoraste el segundo tramo de la integral. -->

### Explicación Pedagógica
La integral definida es aditiva respecto al intervalo de integración, permitiendo "unir" tramos contiguos.

---

## Pregunta 6 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v6`
**Bloom:** Apply
**NAP:** Integral definida de funciones polinómicas.
**Expected_Success:** 0.75
**Context:** Cálculo del trabajo físico realizado al mover una carga en una obra en Salta.

### Enunciado
Hallá el valor de $\int_0^2 (3x^2 + 1) \, dx$.

### Opciones
- [x] A) 10
  <!-- feedback: Primitiva $x^3+x$. Evaluando: $(8+2) - (0+0) = 10$. -->
- [ ] B) 9
  <!-- feedback: Olvidaste sumar la integral del término "1". -->
- [ ] C) 8
  <!-- feedback: Error al evaluar $2^3$. -->
- [ ] D) 12
  <!-- feedback: Error en el cálculo de la primitiva. -->

### Explicación Pedagógica
Primero encontramos la primitiva de todo el integrando y luego evaluamos en el intervalo completo $[0, 2]$.

---

## Pregunta 7 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v7`
**Bloom:** Understand
**NAP:** Propiedad de inversión de límites.
**Expected_Success:** 0.68
**Context:** Un estudiante porteño discute el signo de una integral en un examen.

### Enunciado
¿Cómo se relaciona $\int_a^b f(x) \, dx$ con $\int_b^a f(x) \, dx$?

### Opciones
- [x] A) Son iguales pero con signo opuesto.
  <!-- feedback: Correcto. Invertir los límites de integración cambia el signo del resultado. -->
- [ ] B) Son exactamente iguales.
  <!-- feedback: No, el orden de la resta en Barrow se invierte. -->
- [ ] C) La segunda siempre vale cero.
  <!-- feedback: No tiene por qué ser así. -->
- [ ] D) No se puede calcular una integral con el límite inferior mayor que el superior.
  <!-- feedback: Sí se puede y es muy común en física. -->

### Explicación Pedagógica
Invertir los límites equivale a cambiar el signo del diferencial $dx$ (recorrer el eje en sentido contrario).

---

## Pregunta 8 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v8`
**Bloom:** Apply
**NAP:** Integral definida de la función exponencial.
**Expected_Success:** 0.65
**Context:** Crecimiento poblacional en una provincia argentina entre el año 1 y el año 2 del estudio.

### Enunciado
Calculá $\int_0^1 e^x \, dx$.

### Opciones
- [x] A) $e - 1$
  <!-- feedback: Primitiva $e^x$. $F(1)-F(0) = e^1 - e^0 = e - 1$. -->
- [ ] B) $e$
  <!-- feedback: Olvidaste que $e^0 = 1$. -->
- [ ] C) $1$
  <!-- feedback: Error al evaluar el límite superior. -->
- [ ] D) $e + 1$
  <!-- feedback: Sumaste en lugar de restar. -->

### Explicación Pedagógica
Es fundamental recordar que la exponencial evaluada en cero es igual a la unidad al aplicar la Regla de Barrow.

---

## Pregunta 9 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v9`
**Bloom:** Apply
**NAP:** Integral definida de funciones trigonométricas.
**Expected_Success:** 0.60
**Context:** Promedio de voltaje en una señal alterna en un laboratorio de la UTN.

### Enunciado
Evaluá $\int_0^\pi \operatorname{sen}(x) \, dx$.

### Opciones
- [x] A) 2
  <!-- feedback: Primitiva $-\cos(x)$. $-\cos(\pi) - (-\cos(0)) = -(-1) - (-1) = 1 + 1 = 2$. -->
- [ ] B) 0
  <!-- feedback: Te confundiste con la integral del coseno en ese intervalo. -->
- [ ] C) 1
  <!-- feedback: Error al evaluar los límites. -->
- [ ] D) -2
  <!-- feedback: Error de signos en la aplicación de Barrow. -->

### Explicación Pedagógica
El área bajo un ciclo de la función seno (de $0$ a $\pi$) es exactamente 2 unidades cuadradas.

---

## Pregunta 10 [D5-D6]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v10`
**Bloom:** Analyze
**NAP:** Valor medio de una función.
**Expected_Success:** 0.55
**Context:** Cálculo de la temperatura promedio mensual en San Carlos de Bariloche.

### Enunciado
¿Cuál es la fórmula para hallar el valor promedio de una función $f(x)$ en el intervalo $[a, b]$?

### Opciones
- [x] A) $\frac{1}{b-a} \int_a^b f(x) \, dx$
  <!-- feedback: Correcto. Se divide el área total por el ancho del intervalo. -->
- [ ] B) $\int_a^b f(x) \, dx$
  <!-- feedback: Esa es la suma acumulada, no el promedio. -->
- [ ] C) $\frac{f(a) + f(b)}{2}$
  <!-- feedback: Eso es el promedio de los extremos, solo sirve para funciones lineales. -->
- [ ] D) $\frac{d}{dx} \int_a^b f(x) \, dx$
  <!-- feedback: La derivada de una integral definida (que es un número) es cero. -->

### Explicación Pedagógica
El valor medio representa la altura que debería tener un rectángulo para tener la misma área que la curva sobre ese intervalo.

---

## Pregunta 11 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v11`
**Bloom:** Apply
**NAP:** Integral definida de $1/x$.
**Expected_Success:** 0.58
**Context:** Se estudia la presión en una jeringa en un hospital de pediatría de Buenos Aires.

### Enunciado
Calculá $\int_1^e \frac{2}{x} \, dx$.

### Opciones
- [x] A) 2
  <!-- feedback: $2 \ln(x)$ evaluado de $1$ a $e$ es $2 \ln(e) - 2 \ln(1) = 2(1) - 2(0) = 2$. -->
- [ ] B) 1
  <!-- feedback: Olvidaste el coeficiente 2. -->
- [ ] C) $\ln(2)$
  <!-- feedback: Error grave al aplicar el logaritmo. -->
- [ ] D) $e^2$
  <!-- feedback: No integraste correctamente. -->

### Explicación Pedagógica
El uso de las propiedades de los logaritmos ($\ln(e)=1, \ln(1)=0$) es clave para resolver integrales racionales definidas.

---

## Pregunta 12 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v12`
**Bloom:** Apply
**NAP:** Integral definida con sustitución.
**Expected_Success:** 0.45
**Context:** Un examen de la Universidad Nacional de Cuyo.

### Enunciado
Hallá $\int_0^1 (2x+1)^3 \, dx$.

### Opciones
- [x] A) 10
  <!-- feedback: $u=2x+1, du=2dx \implies \int_1^3 u^3 du/2 = [u^4/8]_1^3 = (81-1)/8 = 10$. -->
- [ ] B) 20
  <!-- feedback: Olvidaste el factor $1/2$ del diferencial al hacer la sustitución. -->
- [ ] C) 80
  <!-- feedback: No integraste el término $u^3$ como $u^4/4$. -->
- [ ] D) 40
  <!-- feedback: Errores varios en el cálculo. -->

### Explicación Pedagógica
Al usar sustitución en integrales definidas, recordá cambiar también los límites de integración o volver a la variable $x$ antes de evaluar.

---

## Pregunta 13 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v13`
**Bloom:** Apply
**NAP:** Integral de función por partes definida.
**Expected_Success:** 0.42
**Context:** Se calcula la energía cinética acumulada de un vehículo en la General Paz.

### Enunciado
Evaluá $\int_0^1 x e^x \, dx$.

### Opciones
- [x] A) 1
  <!-- feedback: Primitiva $x e^x - e^x$. Evaluando: $(1e - e) - (0 - 1) = 0 + 1 = 1$. -->
- [ ] B) $e$
  <!-- feedback: Error al evaluar el límite inferior. -->
- [ ] C) $e - 1$
  <!-- feedback: Error en el cálculo de la primitiva. -->
- [ ] D) 0
  <!-- feedback: No evaluaste correctamente el término $-e^x$. -->

### Explicación Pedagógica
La integración por partes en integrales definidas requiere aplicar los límites a toda la expresión resultante.

---

## Pregunta 14 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v14`
**Bloom:** Analyze
**NAP:** Integral de funciones impares en intervalos simétricos.
**Expected_Success:** 0.50
**Context:** Un truco matemático compartido en una clase en San Luis.

### Enunciado
Sin hacer cálculos largos, ¿cuánto vale $\int_{-5}^5 x^3 \, dx$?

### Opciones
- [x] A) 0
  <!-- feedback: La función $x^3$ es impar y el intervalo es simétrico respecto al origen. -->
- [ ] B) 125
  <!-- feedback: Calculaste solo un lado del intervalo. -->
- [ ] C) 250
  <!-- feedback: Sumaste las áreas absolutas, pero la integral tiene en cuenta el signo. -->
- [ ] D) 625
  <!-- feedback: No tiene relación con el resultado. -->

### Explicación Pedagógica
Para funciones impares ($f(-x) = -f(x)$), la integral en un intervalo $[-a, a]$ siempre es nula porque las áreas se cancelan.

---

## Pregunta 15 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v15`
**Bloom:** Apply
**NAP:** Integral de funciones a trozos.
**Expected_Success:** 0.48
**Context:** Cálculo del costo total de un servicio que cambia su tarifa a mitad de mes.

### Enunciado
Si $f(x) = 2$ para $x < 1$ y $f(x) = 3x$ para $x \geq 1$, calculá $\int_0^2 f(x) \, dx$.

### Opciones
- [x] A) 6.5
  <!-- feedback: $\int_0^1 2 dx + \int_1^2 3x dx = [2x]_0^1 + [1.5x^2]_1^2 = 2 + (6 - 1.5) = 2 + 4.5 = 6.5$. -->
- [ ] B) 5
  <!-- feedback: Sumaste solo las funciones evaluadas en los puntos. -->
- [ ] C) 7
  <!-- feedback: Error al integrar el segundo tramo. -->
- [ ] D) 8
  <!-- feedback: No dividiste el intervalo correctamente. -->

### Explicación Pedagógica
Las funciones definidas por tramos requieren separar la integral en varios intervalos según los puntos de cambio de la función.

---

## Pregunta 16 [D7-D8]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v16`
**Bloom:** Apply
**NAP:** Integral definida de funciones trigonométricas con cambio de fase.
**Expected_Success:** 0.40
**Context:** Se mide la posición de un pistón en una fábrica en Lanús.

### Enunciado
Calculá $\int_0^{\pi/2} \cos(x) \, dx$.

### Opciones
- [x] A) 1
  <!-- feedback: Primitiva $\operatorname{sen}(x)$. $\operatorname{sen}(\pi/2) - \operatorname{sen}(0) = 1 - 0 = 1$. -->
- [ ] B) 0
  <!-- feedback: Confusión con el valor del coseno en $\pi/2$. -->
- [ ] C) -1
  <!-- feedback: Error de signo en la primitiva. -->
- [ ] D) $\pi/2$
  <!-- feedback: No integraste correctamente. -->

### Explicación Pedagógica
La integral del coseno es el seno positivo. En el primer cuadrante ($0$ a $\pi/2$), el área bajo el coseno es la unidad.

---

## Pregunta 17 [D9-D10]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v17`
**Bloom:** Evaluate
**NAP:** Teorema fundamental del cálculo (parte 1).
**Expected_Success:** 0.35
**Context:** Un problema teórico en las Olimpíadas Matemáticas de la Pampa.

### Enunciado
¿Cuál es la derivada respecto a $x$ de la función $G(x) = \int_2^x \sqrt{t^2+1} \, dt$?

### Opciones
- [x] A) $\sqrt{x^2+1}$
  <!-- feedback: Por el Teorema Fundamental del Cálculo, la derivada de la integral de una función es la función misma evaluada en el límite superior variable. -->
- [ ] B) $\frac{x}{\sqrt{x^2+1}}$
  <!-- feedback: Intentaste derivar el integrando. -->
- [ ] C) $\int_2^x t \, dt$
  <!-- feedback: No se mantiene el signo de integral. -->
- [ ] D) $\sqrt{5}$
  <!-- feedback: No es una constante. -->

### Explicación Pedagógica
La "función área" acumulada tiene como tasa de variación instantánea el valor de la función en el punto actual.

---

## Pregunta 18 [D9-D10]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v18`
**Bloom:** Evaluate
**NAP:** Integral definida compleja.
**Expected_Success:** 0.30
**Context:** Un examen parcial de la Facultad de Ingeniería de la UNLP (La Plata).

### Enunciado
Hallá el valor de $\int_0^1 \frac{1}{1+x^2} \, dx$.

### Opciones
- [x] A) $\pi/4$
  <!-- feedback: Primitiva $\operatorname{arctg}(x)$. $\operatorname{arctg}(1) - \operatorname{arctg}(0) = \pi/4 - 0 = \pi/4$. -->
- [ ] B) 1
  <!-- feedback: Confusión con el valor de la función en $x=0$. -->
- [ ] C) $\pi/2$
  <!-- feedback: Valor del arco tangente en infinito, no en 1. -->
- [ ] D) $\ln(2)$
  <!-- feedback: Confusión con la forma de la integral del logaritmo (faltaría una $x$ en el numerador). -->

### Explicación Pedagógica
Este resultado es fundamental y aparece en muchos problemas de probabilidad y física.

---

## Pregunta 19 [D9-D10]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v19`
**Bloom:** Evaluate
**NAP:** Integral de potencias negativas definida.
**Expected_Success:** 0.28
**Context:** Se analiza la intensidad luminosa que decae con el cuadrado de la distancia.

### Enunciado
Calculá $\int_1^2 \frac{1}{x^2} \, dx$.

### Opciones
- [x] A) 0.5
  <!-- feedback: Primitiva $-1/x$. $-1/2 - (-1/1) = -0.5 + 1 = 0.5$. -->
- [ ] B) -0.5
  <!-- feedback: Error al restar los límites (hiciste $F(1)-F(2)$). -->
- [ ] C) 1.5
  <!-- feedback: Sumaste los valores en lugar de restarlos. -->
- [ ] D) $\ln(4)$
  <!-- feedback: Error grave al tratar $1/x^2$ como un logaritmo. -->

### Explicación Pedagógica
A pesar de que el integrando es siempre positivo, un error en los signos de la primitiva puede llevar a resultados negativos imposibles para un área.

---

## Pregunta 20 [D9-D10]
**ID:** `AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v20`
**Bloom:** Create
**NAP:** Integración definida con valor absoluto.
**Expected_Success:** 0.25
**Context:** Desafío avanzado en una escuela secundaria de alto rendimiento de Buenos Aires.

### Enunciado
Hallá $\int_0^2 |x - 1| \, dx$.

### Opciones
- [x] A) 1
  <!-- feedback: Representa dos triángulos de área $0.5$ cada uno. -->
- [ ] B) 0
  <!-- feedback: Las áreas absolutas no se cancelan. -->
- [ ] C) 2
  <!-- feedback: Valor excesivo para este intervalo. -->
- [ ] D) 0.5
  <!-- feedback: Solo calculaste una de las dos mitades. -->

### Explicación Pedagógica
Las integrales de valor absoluto deben separarse donde la función interna cambia de signo para poder quitar las barras de valor absoluto.

---

## 📊 Metadata de Validación

| Question | ID | Difficulty | Validado |
|----------|-----|------------|----------|
| 1 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v1 | D3-D4 | ⬜ |
| 2 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v2 | D3-D4 | ⬜ |
| 3 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v3 | D3-D4 | ⬜ |
| 4 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v4 | D3-D4 | ⬜ |
| 5 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v5 | D5-D6 | ⬜ |
| 6 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v6 | D5-D6 | ⬜ |
| 7 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v7 | D5-D6 | ⬜ |
| 8 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v8 | D5-D6 | ⬜ |
| 9 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v9 | D5-D6 | ⬜ |
| 10 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v10 | D5-D6 | ⬜ |
| 11 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v11 | D7-D8 | ⬜ |
| 12 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v12 | D7-D8 | ⬜ |
| 13 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v13 | D7-D8 | ⬜ |
| 14 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v14 | D7-D8 | ⬜ |
| 15 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v15 | D7-D8 | ⬜ |
| 16 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v16 | D7-D8 | ⬜ |
| 17 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v17 | D9-D10 | ⬜ |
| 18 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v18 | D9-D10 | ⬜ |
| 19 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v19 | D9-D10 | ⬜ |
| 20 | AR-MAT-11-2026-W36-integral-definida-001-MASTERY-v20 | D9-D10 | ⬜ |
