---
id: "AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY"
country: "ar"
grado: 11
asignatura: "matematica"
tema: "integral-tecnicas-basicas"
periodo: "weekly"
semana: "W35"
protocol_version: "5.2"
year: 2026
bundle_index: 1
bundle_size: 20
alignment: "NAP Matemática 2026"
modern_context: true
distractor_profile: "plausible_peer_set"
rubric_baseline: "Técnicas básicas de integración - Grado 11 - matemática"
license: "FREE"
---

# Bundle MASTERY: Técnicas básicas de integración - Grado 11

Este bundle contiene 20 preguntas sobre **técnicas básicas de integración** (sustitución e integración por partes), alineadas con los NAP de Argentina.

---

## Pregunta 1 [D3-D4]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v1`
**Bloom:** Remember
**NAP:** Método de integración por sustitución.
**Expected_Success:** 0.85
**Context:** En un aula de una escuela técnica de Berazategui.

### Enunciado
¿Cuál es el objetivo principal del método de integración por sustitución?

### Opciones
- [x] A) Transformar una integral compleja en una más sencilla mediante un cambio de variable.
  <!-- feedback: Correcto. Es el análogo a la regla de la cadena en derivación. -->
- [ ] B) Resolver integrales de productos de funciones polinómicas únicamente.
  <!-- feedback: Se usa para muchos tipos de funciones, no solo polinómicas. -->
- [ ] C) Calcular el área bajo la curva sin necesidad de primitivas.
  <!-- feedback: Sigue necesitando encontrar la primitiva. -->
- [ ] D) Dividir la integral en dos partes para usar la fórmula de "una vaca".
  <!-- feedback: Ese es el método de integración por partes. -->

### Explicación Pedagógica
La sustitución busca identificar una parte de la función cuya derivada también esté presente en el integrando.

---

## Pregunta 2 [D3-D4]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v2`
**Bloom:** Understand
**NAP:** Elección de la variable en sustitución.
**Expected_Success:** 0.80
**Context:** Un estudiante analiza una integral en la Facultad de Ingeniería de la UBA.

### Enunciado
Dada la integral $\int (3x+2)^5 \, dx$, ¿cuál sería la sustitución $u$ más adecuada para resolverla?

### Opciones
- [x] A) $u = 3x + 2$
  <!-- feedback: Correcto. Simplifica la base de la potencia. -->
- [ ] B) $u = x^5$
  <!-- feedback: No ayuda a resolver el binomio interno. -->
- [ ] C) $u = 3$
  <!-- feedback: Una constante no sirve como cambio de variable útil. -->
- [ ] D) $u = (3x+2)^5$
  <!-- feedback: Haría que el diferencial $du$ sea muy complejo. -->

### Explicación Pedagógica
Elegir la función interna como $u$ permite aplicar la regla de la potencia básica a $u^5$.

---

## Pregunta 3 [D3-D4]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v3`
**Bloom:** Remember
**NAP:** Método de integración por partes.
**Expected_Success:** 0.78
**Context:** Un profesor cordobés enseña una regla mnemotécnica famosa.

### Enunciado
¿Cuál es la fórmula correcta de integración por partes?

### Opciones
- [x] A) $\int u \, dv = uv - \int v \, du$
  <!-- feedback: Correcto. La famosa regla de "Un Día Vi Una Vaca Sin Cola Vestida De Uniforme". -->
- [ ] B) $\int u \, dv = uv + \int v \, du$
  <!-- feedback: El signo debe ser negativo. -->
- [ ] C) $\int u \, dv = u'v + uv'$
  <!-- feedback: Esa es la regla del producto para derivadas. -->
- [ ] D) $\int u \, dv = \frac{u}{v} - \int du \, dv$
  <!-- feedback: Estructura incorrecta. -->

### Explicación Pedagógica
La integración por partes deriva de la regla del producto para derivadas y se usa cuando tenemos un producto de funciones de distinta naturaleza.

---

## Pregunta 4 [D3-D4]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v4`
**Bloom:** Understand
**NAP:** Prioridad en integración por partes (ILATE/ALPES).
**Expected_Success:** 0.75
**Context:** Preparación para un examen en un instituto de Rosario.

### Enunciado
En el método por partes, ¿qué tipo de función se recomienda elegir como $u$ con mayor prioridad según la regla ILATE?

### Opciones
- [x] A) Funciones logarítmicas o inversas trigonométricas.
  <!-- feedback: Correcto. Son las más difíciles de integrar directamente, por eso se prefieren para derivar. -->
- [ ] B) Funciones polinómicas siempre.
  <!-- feedback: Tienen prioridad media, debajo de logaritmos. -->
- [ ] C) Funciones exponenciales.
  <!-- feedback: Tienen la menor prioridad para ser elegidas como $u$. -->
- [ ] D) Funciones constantes.
  <!-- feedback: No se suelen usar en este método de esta forma. -->

### Explicación Pedagógica
La regla ILATE ayuda a decidir qué función derivar ($u$) y cuál integrar ($dv$) para simplificar la nueva integral.

---

## Pregunta 5 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v5`
**Bloom:** Apply
**NAP:** Sustitución con ajuste de constantes.
**Expected_Success:** 0.70
**Context:** Cálculo de la energía consumida por un aire acondicionado en una oficina de microcentro.

### Enunciado
Resolvé $\int e^{5x} \, dx$ usando sustitución.

### Opciones
- [x] A) $\frac{1}{5} e^{5x} + C$
  <!-- feedback: Si $u=5x$, entonces $du=5dx$, lo que implica $dx = du/5$. -->
- [ ] B) $5 e^{5x} + C$
  <!-- feedback: Esa sería la derivada, no la integral. -->
- [ ] C) $e^{5x} + C$
  <!-- feedback: Olvidaste compensar la derivada del exponente. -->
- [ ] D) $\frac{e^{6x}}{6} + C$
  <!-- feedback: Error grave al aplicar reglas de potencias a exponenciales. -->

### Explicación Pedagógica
Al integrar funciones compuestas con una función lineal interna, se debe dividir por la pendiente de dicha línea.

---

## Pregunta 6 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v6`
**Bloom:** Apply
**NAP:** Sustitución con potencias.
**Expected_Success:** 0.68
**Context:** Se analiza el desgaste de los neumáticos de un micro de larga distancia.

### Enunciado
Hallá $\int x(x^2 + 1)^3 \, dx$.

### Opciones
- [x] A) $\frac{1}{8}(x^2 + 1)^4 + C$
  <!-- feedback: $u = x^2+1, du = 2x dx \implies x dx = du/2$. Integral de $u^3/2 = u^4/8$. -->
- [ ] B) $\frac{1}{4}(x^2 + 1)^4 + C$
  <!-- feedback: Te faltó el factor $1/2$ que viene del diferencial. -->
- [ ] C) $\frac{x^2}{2} \frac{(x^2+1)^4}{4} + C$
  <!-- feedback: No se integran los factores por separado. -->
- [ ] D) $(x^2 + 1)^4 + C$
  <!-- feedback: Faltan todos los coeficientes de ajuste. -->

### Explicación Pedagógica
Este es un caso clásico donde el factor externo $x$ es (salvo una constante) la derivada del interior del paréntesis.

---

## Pregunta 7 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v7`
**Bloom:** Apply
**NAP:** Sustitución con logaritmos.
**Expected_Success:** 0.65
**Context:** Un problema de química sobre la velocidad de una reacción en una planta en Zárate.

### Enunciado
Calculá $\int \frac{1}{2x+3} \, dx$.

### Opciones
- [x] A) $\frac{1}{2}\ln|2x+3| + C$
  <!-- feedback: Sustitución $u=2x+3, du=2dx$. -->
- [ ] B) $\ln|2x+3| + C$
  <!-- feedback: Olvidaste el factor $1/2$ del diferencial. -->
- [ ] C) $\frac{1}{(2x+3)^2} + C$
  <!-- feedback: Eso sería si estuviéramos derivando o aplicando mal la potencia. -->
- [ ] D) $2\ln|2x+3| + C$
  <!-- feedback: Multiplicaste en lugar de dividir por la constante. -->

### Explicación Pedagógica
Las funciones racionales con denominador lineal resultan siempre en logaritmos naturales escalados.

---

## Pregunta 8 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v8`
**Bloom:** Apply
**NAP:** Integración por partes básica.
**Expected_Success:** 0.60
**Context:** Un ejercicio de un libro de texto de la editorial santafesina.

### Enunciado
Al integrar $\int x \cdot \operatorname{sen}(x) \, dx$ por partes, si elegimos $u=x$ y $dv=\operatorname{sen}(x) \, dx$, ¿cuál es el primer término ($uv$) del resultado?

### Opciones
- [x] A) $-x \cdot \cos(x)$
  <!-- feedback: Si $dv=\operatorname{sen}(x)$, entonces $v=-\cos(x)$. -->
- [ ] B) $x \cdot \cos(x)$
  <!-- feedback: Olvidaste que la integral del seno es el coseno negativo. -->
- [ ] C) $\operatorname{sen}(x)$
  <!-- feedback: Ese no es el producto $uv$. -->
- [ ] D) $-x \cdot \operatorname{sen}(x)$
  <!-- feedback: No integraste $dv$. -->

### Explicación Pedagógica
Es vital tener claros los signos de las integrales trigonométricas al aplicar el método por partes.

---

## Pregunta 9 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v9`
**Bloom:** Apply
**NAP:** Sustitución trigonométrica simple.
**Expected_Success:** 0.58
**Context:** Se estudia el movimiento armónico de un resorte en un laboratorio escolar.

### Enunciado
Hallá $\int \operatorname{sen}(4x) \, dx$.

### Opciones
- [x] A) $-\frac{1}{4}\cos(4x) + C$
  <!-- feedback: Sustitución $u=4x$. El signo negativo viene de la integral del seno. -->
- [ ] B) $\frac{1}{4}\cos(4x) + C$
  <!-- feedback: Error de signo. -->
- [ ] C) $-4\cos(4x) + C$
  <!-- feedback: Multiplicaste por 4 en lugar de dividir. -->
- [ ] D) $-\cos(4x) + C$
  <!-- feedback: Falta el coeficiente $1/4$. -->

### Explicación Pedagógica
La constante que multiplica al argumento sale dividiendo en el resultado final de la integral.

---

## Pregunta 10 [D5-D6]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v10`
**Bloom:** Analyze
**NAP:** Verificación de primitivas.
**Expected_Success:** 0.72
**Context:** Un examen de opción múltiple en una escuela secundaria de Tucumán.

### Enunciado
¿Cómo podés verificar si el resultado de una integral técnica es correcto?

### Opciones
- [x] A) Derivando el resultado obtenido para ver si regresás al integrando original.
  <!-- feedback: Es la forma más segura de comprobar una integral. -->
- [ ] B) Integrando el resultado una segunda vez.
  <!-- feedback: Eso te daría otra función distinta. -->
- [ ] C) Evaluando en $x=0$ en ambos casos.
  <!-- feedback: No garantiza que las funciones sean iguales en todo su dominio. -->
- [ ] D) Aplicando el método de sustitución al revés.
  <!-- feedback: No es un procedimiento estándar de verificación. -->

### Explicación Pedagógica
Dado que la integral es la operación inversa de la derivada, la diferenciación es la prueba definitiva de exactitud.

---

## Pregunta 11 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v11`
**Bloom:** Apply
**NAP:** Integración por partes de logaritmo.
**Expected_Success:** 0.52
**Context:** Un problema desafiante en un taller de matemática en La Plata.

### Enunciado
Hallá $\int \ln(x) \, dx$ usando el método por partes (tomando $dv = dx$).

### Opciones
- [x] A) $x \ln(x) - x + C$
  <!-- feedback: $u=\ln(x) \implies du=1/x; dv=dx \implies v=x$. Entonces $x\ln(x) - \int x(1/x) dx = x\ln(x) - x$. -->
- [ ] B) $\frac{1}{x} + C$
  <!-- feedback: Esa es la derivada, no la integral. -->
- [ ] C) $\frac{(\ln x)^2}{2} + C$
  <!-- feedback: Error al tratar el logaritmo como una potencia simple. -->
- [ ] D) $x \ln(x) + C$
  <!-- feedback: Te olvidaste del segundo término de la fórmula de partes. -->

### Explicación Pedagógica
Integrar el logaritmo requiere el truco de considerar a la unidad ($1$) como la función a integrar ($dv$).

---

## Pregunta 12 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v12`
**Bloom:** Apply
**NAP:** Sustitución con cambio de límites (o regreso a variable original).
**Expected_Success:** 0.50
**Context:** Se calcula la carga eléctrica en un condensador en una fábrica en Quilmes.

### Enunciado
Hallá $\int \frac{x}{x^2+5} \, dx$.

### Opciones
- [x] A) $\frac{1}{2}\ln(x^2+5) + C$
  <!-- feedback: $u=x^2+5 \implies du=2xdx$. -->
- [ ] B) $\ln(x^2+5) + C$
  <!-- feedback: Falta el factor $1/2$. -->
- [ ] C) $\operatorname{arctg}(x) + C$
  <!-- feedback: Confusión con la forma $1/(x^2+1)$. Aquí hay una $x$ en el numerador. -->
- [ ] D) $\frac{1}{2x}\ln(x^2+5) + C$
  <!-- feedback: No se puede dejar la variable $x$ fuera del logaritmo de esa forma. -->

### Explicación Pedagógica
Cuando el numerador es la derivada del denominador (salvo constante), el resultado es un logaritmo.

---

## Pregunta 13 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v13`
**Bloom:** Apply
**NAP:** Integración por partes: exponencial y polinomio.
**Expected_Success:** 0.48
**Context:** Un problema de física sobre trabajo realizado por una fuerza variable.

### Enunciado
Calculá $\int x e^x \, dx$.

### Opciones
- [x] A) $x e^x - e^x + C$
  <!-- feedback: $u=x, dv=e^x dx$. $uv - \int v du = xe^x - \int e^x dx$. -->
- [ ] B) $x e^x + e^x + C$
  <!-- feedback: Error de signo en la fórmula de partes. -->
- [ ] C) $\frac{x^2}{2} e^x + C$
  <!-- feedback: Integraste ambos factores por separado. -->
- [ ] D) $e^x(x-1)$ (sin constante)
  <!-- feedback: Es correcta la forma, pero le falta la constante de integración $+C$. -->

### Explicación Pedagógica
El método por partes reduce el grado del polinomio $x$ hasta que solo queda la integral de la exponencial.

---

## Pregunta 14 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v14`
**Bloom:** Apply
**NAP:** Sustitución con funciones trigonométricas.
**Expected_Success:** 0.45
**Context:** Estudio de la difracción de luz en un laboratorio de la UNLP.

### Enunciado
Hallá $\int \cos^4(x) \cdot \operatorname{sen}(x) \, dx$.

### Opciones
- [x] A) $-\frac{1}{5}\cos^5(x) + C$
  <!-- feedback: $u=\cos(x) \implies du=-\operatorname{sen}(x) dx$. -->
- [ ] B) $\frac{1}{5}\cos^5(x) + C$
  <!-- feedback: Falta el signo negativo del diferencial. -->
- [ ] C) $\frac{1}{5}\operatorname{sen}^5(x) + C$
  <!-- feedback: Sustitución incorrecta. -->
- [ ] D) $-\cos^5(x) + C$
  <!-- feedback: Falta dividir por el nuevo exponente 5. -->

### Explicación Pedagógica
Este método es ideal cuando tenemos una función trigonométrica elevada a una potencia y su derivada al lado.

---

## Pregunta 15 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v15`
**Bloom:** Apply
**NAP:** Sustitución en funciones compuestas.
**Expected_Success:** 0.42
**Context:** Se calcula la concentración de ozono en la atmósfera sobre la Antártida.

### Enunciado
Resolvé $\int \frac{e^{1/x}}{x^2} \, dx$.

### Opciones
- [x] A) $-e^{1/x} + C$
  <!-- feedback: $u=1/x \implies du = -1/x^2 dx$. -->
- [ ] B) $e^{1/x} + C$
  <!-- feedback: Falta el signo negativo. -->
- [ ] C) $\ln|x^2| \cdot e^{1/x} + C$
  <!-- feedback: Aplicación incorrecta de reglas. -->
- [ ] D) $\frac{e^{1/x}}{x} + C$
  <!-- feedback: Error de integración. -->

### Explicación Pedagógica
Identificar que $1/x^2$ es casi la derivada de $1/x$ es la clave para usar sustitución aquí.

---

## Pregunta 16 [D7-D8]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v16`
**Bloom:** Analyze
**NAP:** Elección del método adecuado.
**Expected_Success:** 0.55
**Context:** Debate en una clase de la Universidad Nacional de Cuyo.

### Enunciado
Para resolver $\int \frac{\ln(x)}{x} \, dx$, ¿qué método es más eficiente?

### Opciones
- [x] A) Sustitución, tomando $u = \ln(x)$.
  <!-- feedback: Correcto. Como $du = 1/x dx$, la integral se convierte en $\int u du$. -->
- [ ] B) Integración por partes, tomando $u = x$.
  <!-- feedback: No es eficiente en este caso. -->
- [ ] C) Fracciones simples.
  <!-- feedback: No es una función racional de polinomios. -->
- [ ] D) No se puede resolver por métodos elementales.
  <!-- feedback: Sí se puede y es bastante directo. -->

### Explicación Pedagógica
A veces una integral parece de "partes" por tener dos funciones, pero una sustitución inteligente la simplifica mucho más.

---

## Pregunta 17 [D9-D10]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v17`
**Bloom:** Evaluate
**NAP:** Integración por partes iterada.
**Expected_Success:** 0.35
**Context:** Un examen de ingreso a la carrera de Física.

### Enunciado
Hallá $\int x^2 \cos(x) \, dx$.

### Opciones
- [x] A) $x^2 \operatorname{sen}(x) + 2x \cos(x) - 2\operatorname{sen}(x) + C$
  <!-- feedback: Requiere aplicar el método por partes dos veces. -->
- [ ] B) $x^2 \operatorname{sen}(x) + C$
  <!-- feedback: Solo hiciste el primer paso de forma incompleta. -->
- [ ] C) $\frac{x^3}{3} \operatorname{sen}(x) + C$
  <!-- feedback: Integraste factores por separado. -->
- [ ] D) $-x^2 \operatorname{sen}(x) - 2x \cos(x) + C$
  <!-- feedback: Errores múltiples de signos. -->

### Explicación Pedagógica
Cuando el polinomio es de grado $n$, se debe aplicar el método por partes $n$ veces para eliminarlo.

---

## Pregunta 18 [D9-D10]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v18`
**Bloom:** Evaluate
**NAP:** Sustitución con funciones trigonométricas inversas.
**Expected_Success:** 0.30
**Context:** Un problema complejo de una olimpíada matemática provincial.

### Enunciado
Calculá $\int \frac{1}{\sqrt{1-x^2}} \, dx$.

### Opciones
- [x] A) $\operatorname{arcsen}(x) + C$
  <!-- feedback: Esta es una integral inmediata basada en la derivada del arcoseno. -->
- [ ] B) $\ln|\sqrt{1-x^2}| + C$
  <!-- feedback: No es la forma del logaritmo. -->
- [ ] C) $\operatorname{arctg}(x) + C$
  <!-- feedback: Esa no tiene raíz en el denominador. -->
- [ ] D) $\sqrt{1-x^2} + C$
  <!-- feedback: Error de integración. -->

### Explicación Pedagógica
Reconocer las formas de las derivadas de funciones inversas es fundamental para integrar funciones irracionales específicas.

---

## Pregunta 19 [D9-D10]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v19`
**Bloom:** Evaluate
**NAP:** Integrales cíclicas (por partes).
**Expected_Success:** 0.28
**Context:** Un desafío propuesto en la revista de la Sociedad Argentina de Educación Matemática.

### Enunciado
¿Qué sucede al intentar resolver $\int e^x \operatorname{sen}(x) \, dx$ por partes?

### Opciones
- [x] A) Aparece la integral original de nuevo tras dos aplicaciones, permitiendo despejarla como una ecuación.
  <!-- feedback: Es una integral cíclica. -->
- [ ] B) El polinomio se reduce hasta hacerse cero.
  <!-- feedback: No hay ningún polinomio en el integrando. -->
- [ ] C) No tiene solución mediante funciones elementales.
  <!-- feedback: Sí tiene, y el resultado involucra tanto a $e^x$ como a $\operatorname{sen}$ y $\cos$. -->
- [ ] D) Se resuelve con una sola sustitución simple de $u=e^x$.
  <!-- feedback: No, eso no eliminaría la función seno. -->

### Explicación Pedagógica
Las integrales cíclicas se resuelven planteando una ecuación algebraica donde la incógnita es la propia integral.

---

## Pregunta 20 [D9-D10]
**ID:** `AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v20`
**Bloom:** Create
**NAP:** Integración por sustitución con manipulación algebraica previa.
**Expected_Success:** 0.25
**Context:** Examen final de Análisis Matemático I en la UTN Facultad Regional Córdoba.

### Enunciado
Hallá $\int \frac{1}{x \ln(x) \ln(\ln x)} \, dx$.

### Opciones
- [x] A) $\ln|\ln(\ln x)| + C$
  <!-- feedback: Sustitución sucesiva o notar que el numerador es la derivada de todo el denominador. -->
- [ ] B) $\ln(x) \cdot \ln(\ln x) + C$
  <!-- feedback: Estructura incorrecta. -->
- [ ] C) $\frac{1}{\ln(x)} + C$
  <!-- feedback: Error en la aplicación del método. -->
- [ ] D) $[\ln(\ln x)]^2 + C$
  <!-- feedback: No coincide con la derivación. -->

### Explicación Pedagógica
Este problema requiere ver "capas" de funciones donde cada una es la derivada de la que está más adentro en la composición de logaritmos.

---

## 📊 Metadata de Validación

| Question | ID | Difficulty | Validado |
|----------|-----|------------|----------|
| 1 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v1 | D3-D4 | ⬜ |
| 2 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v2 | D3-D4 | ⬜ |
| 3 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v3 | D3-D4 | ⬜ |
| 4 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v4 | D3-D4 | ⬜ |
| 5 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v5 | D5-D6 | ⬜ |
| 6 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v6 | D5-D6 | ⬜ |
| 7 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v7 | D5-D6 | ⬜ |
| 8 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v8 | D5-D6 | ⬜ |
| 9 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v9 | D5-D6 | ⬜ |
| 10 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v10 | D5-D6 | ⬜ |
| 11 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v11 | D7-D8 | ⬜ |
| 12 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v12 | D7-D8 | ⬜ |
| 13 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v13 | D7-D8 | ⬜ |
| 14 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v14 | D7-D8 | ⬜ |
| 15 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v15 | D7-D8 | ⬜ |
| 16 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v16 | D7-D8 | ⬜ |
| 17 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v17 | D9-D10 | ⬜ |
| 18 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v18 | D9-D10 | ⬜ |
| 19 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v19 | D9-D10 | ⬜ |
| 20 | AR-MAT-11-2026-W35-integral-tecnicas-basicas-001-MASTERY-v20 | D9-D10 | ⬜ |
