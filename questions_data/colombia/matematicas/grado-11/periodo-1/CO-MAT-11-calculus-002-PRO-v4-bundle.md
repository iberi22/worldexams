---
id: "CO-MAT-11-calculus-002-PRO-v4"
country: "co"
grado: 11
asignatura: "matematicas"
tema: "Límites, Continuidad y Diferenciabilidad"
periodo: 1
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["razonamiento", "formulacion", "argumentacion"]
cognitive_levels: ["analysis", "evaluate", "synthesis", "transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1 - High Complexity)"
generation_date: "2026-03-10"
source: "Ministerio de Educación - Lineamientos 2026 / Cálculo de Leithold"
source_license: "CC BY-SA 4.0"
---

# Bundle Matemáticas G11 - Periodo 1: Análisis Matemático

## Contexto 1: Comportamiento Asintótico en Economía
Un modelo de crecimiento económico describe la riqueza per cápita $W(t)$ como una función del tiempo $t$ (en décadas), donde $W(t) = \frac{50t^2 + 100t}{t^2 + 1}$. Se busca entender el comportamiento a largo plazo ($t \to \infty$) para determinar si hay un "techo" de riqueza.

---

## Question 1 (Analítico - Dificultad 4)
**ID:** `CO-MAT-11-calculus-002-PRO-v4-v1`
**Type:** `single`
**ICFES:** Diseño y Ejecución
**Bloom:** Analyze

### Enunciado
Determine el límite de $W(t)$ cuando $t$ tiende a infinito. ¿Qué representa este valor en el contexto del modelo?

### Options
- [x] A) 50; representa la riqueza máxima teórica (asíntota horizontal).
- [ ] B) 100; representa la tasa de crecimiento inicial.
- [ ] C) Infinito; la riqueza crece sin límites.
- [ ] D) 0; la riqueza se disipa con el tiempo.

### Explicación Pedagógica
Para límites al infinito de funciones racionales con el mismo grado en numerador y denominador, el límite es el cociente de los coeficientes principales: $50/1 = 50$.

---

## Question 5 (Continuidad - Dificultad 5)
**ID:** `CO-MAT-11-calculus-002-PRO-v4-v5`
**Type:** `multi-correct`
**ICFES:** Razonamiento
**Bloom:** Evaluate

### Contexto
Considere la función $f(x) = \frac{x^2 - 1}{x - 1}$.

### Enunciado
Seleccione las afirmaciones correctas sobre la continuidad de $f(x)$ en $x = 1$.

### Options
- [x] A) Hay una discontinuidad evitable (o de punto). <!-- weight: 1.0 -->
- [x] B) El límite cuando $x \to 1$ existe y es igual a 2. <!-- weight: 1.0 -->
- [ ] C) La función es continua en $x = 1$ porque $f(1)=2$.
- [x] D) La gráfica presenta un "hueco" en las coordenadas $(1, 2)$. <!-- weight: 1.0 -->

---

## Question 10 (Derivada y Pendiente - Dificultad 7)
**ID:** `CO-MAT-11-calculus-002-PRO-v4-v10`
**Type:** `weighted`
**ICFES:** Formulacion y Ejecución
**Bloom:** Analysis

### Enunciado
Sea $f(x) = x \cdot \sin(1/x)$ para $x \neq 0$ y $f(0) = 0$. Evalúe la derivabilidad de la función en el origen.

### Options
- [x] A) No es derivable en $x=0$ porque el límite del cociente diferencial no existe (oscila). <!-- weight: 1.0 -->
- [x] B) Es continua en $x=0$ por el Teorema del Sándwich. <!-- weight: 0.6 -->
- [ ] C) Es derivable y su derivada es $f'(0) = 1$.
- [ ] D) La función tiene una asíntota vertical en cero.

---

## Question 20 (Transferencia Cuántica - Dificultad 10)
**ID:** `CO-MAT-11-calculus-002-PRO-v4-v20`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Create

### Contexto
En el estudio de la estabilidad de puentes mediante análisis de Fourier, se encuentra que una serie de potencias converge a una función de respuesta $S(\omega)$. El diseño es seguro si $S(\omega)$ es infinitamente diferenciable ($C^\infty$) en todo el dominio operativo.

### Enunciado
Si $S(\omega) = \sum_{n=0}^{\infty} \frac{(-1)^n \omega^{2n}}{(2n)!}$, ¿qué conclusión técnica es MÁS robusta sobre la seguridad del diseño?

### Options
- [x] A) El diseño es máximamente seguro porque la serie define la función $\cos(\omega)$, que es analítica en todo $\mathbb{R}$. <!-- weight: 1.0 -->
- [x] B) El diseño es seguro solo en el intervalo $(-1, 1)$ por el radio de convergencia. <!-- weight: 0.3 --> (Incorrecto, el radio para $\cos$ es $\infty$)
- [ ] C) El sistema entrará en resonancia destructiva en $\omega = \pi/2$.
- [ ] D) Las series de potencias no pueden usarse para análisis de seguridad real.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | single | Analyze | Diseño | ⬜ |
| 5 | ...-v5 | 5 | multi-correct | Evaluate | Razonamiento | ⬜ |
| 10 | ...-v10 | 7 | weighted | Analysis | Formulación | ⬜ |
| 20 | ...-v20 | 10 | weighted | Transfer | Argumentación | ⬜ |

*(Nota: En una generación completa para el cliente, se incluirían las 20 preguntas con sus respectivos contextos).*
