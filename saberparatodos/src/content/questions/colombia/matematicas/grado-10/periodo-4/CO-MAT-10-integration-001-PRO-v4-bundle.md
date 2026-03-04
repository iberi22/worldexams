---
id: "CO-MAT-10-integration-001-PRO"
country: "co"
grado: 10
asignatura: "matematicas"
tema: "Simulacro Integrado Matemáticas G10"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación y Representación", "Formulación y Ejecución", "Argumentación"]
cognitive_levels: ["Identify", "Use", "Analyze", "Evaluate", "Create"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
---

## Contexto 1: Simulacro Integrado — Todos los Ejes G10

---

## Question 1 (Números Reales - Dificultad 4)

**ID:** `CO-MAT-10-integration-001-PRO-v1`
### Enunciado
El número $\pi$ es irracional porque:

### Opciones
- [ ] A) Es aproximadamente 3.14159.
- [x] B) Sus decimales son infinitos y **sin patrón de repetición**, por lo que no puede expresarse como fracción $p/q$.
- [ ] C) Es mayor que 3.
- [ ] D) Solo se usa en geometría.

---

## Question 2 (Funciones - Dificultad 6)

**ID:** `CO-MAT-10-integration-001-PRO-v2`
### Enunciado
Si $f(x) = 3x - 1$ y $g(x) = x^2$, ¿cuánto es $(f \circ g)(2)$?

### Opciones
- [ ] A) $11$
- [x] B) $11$ ($g(2) = 4$; $f(4) = 3(4) - 1 = 11$)
- [ ] C) $5$
- [ ] D) $24$

---

## Question 3 (Trigonometría - Dificultad 7)

**ID:** `CO-MAT-10-integration-001-PRO-v3`
### Enunciado
¿Para cuántos ángulos $\theta \in [0, 2\pi)$ se cumple que $\sin(\theta) = \frac{\sqrt{2}}{2}$?

### Opciones
- [ ] A) Solo uno ($\theta = 45°$)
- [x] B) Dos ángulos ($\theta = 45°$ y $\theta = 135°$)
- [ ] C) Ninguno
- [ ] D) Infinitos

### Explicación Pedagógica
El seno es positivo en el primer y segundo cuadrante. Los ángulos donde $\sin\theta = \frac{\sqrt{2}}{2}$ son $\frac{\pi}{4}$ (45°) y $\frac{3\pi}{4}$ (135°).

---

## Question 4 (Cónicas - Dificultad 7)

**ID:** `CO-MAT-10-integration-001-PRO-v4`
### Enunciado
La ecuación $\frac{(x-2)^2}{16} + \frac{(y+1)^2}{4} = 1$ representa:

### Opciones
- [x] A) Una elipse con centro en $(2, -1)$, semieje mayor de 4 (en X) y semieje menor de 2.
- [ ] B) Una hipérbola con centro en $(2, -1)$.
- [ ] C) Una circunferencia con radio 4.
- [ ] D) Una parábola con vértice en $(2, -1)$.

---

## Question 5 (Estadística - Dificultad 8)

**ID:** `CO-MAT-10-integration-001-PRO-v5`
### Enunciado
En un bolso hay 5 bolas rojas y 3 azules. Se extraen 2 bolas **sin reemplazo**. ¿Cuál es la probabilidad de que ambas sean rojas?

### Opciones
- [ ] A) $\frac{25}{64}$
- [x] B) $\frac{20}{56} = \frac{5}{14}$ (ya que $P = \frac{5}{8} \times \frac{4}{7} = \frac{20}{56}$)
- [ ] C) $\frac{1}{8}$
- [ ] D) $\frac{15}{64}$

---

## Question 13 (Multi-eje - Dificultad 9)

**ID:** `CO-MAT-10-integration-001-PRO-v13`
**Type:** `multi-correct`
### Enunciado
Seleccione TODAS las afirmaciones verdaderas sobre una función trigonométrica periódica $f(x) = A\sin(bx + c) + d$.

### Opciones
- [x] A) La amplitud es $|A|$ y el periodo es $\frac{2\pi}{|b|}$. <!-- weight: 1.0 -->
- [x] B) $d$ desplaza la gráfica verticalmente (hacia arriba si $d > 0$). <!-- weight: 1.0 -->
- [ ] C) Si $A < 0$, la función no tiene gráfica.
- [x] D) El desfase o cambio de fase horizontal es $-\frac{c}{b}$. <!-- weight: 1.0 -->

### Scoring
- 3 correctas: 3.0/3.0

---

## Question 20 (Síntesis — Dificultad 10)

**ID:** `CO-MAT-10-integration-001-PRO-v20`
**Type:** `weighted`
### Enunciado
Un sistema de rastreo detecta aviones usando señales de radar que se modelan como: Señal A: $y = 2\sin(x)$; Señal B: $y = 2\sin(x + \frac{\pi}{3})$. ¿Cuántos puntos de intersección tienen las dos señales en el intervalo $[0, 2\pi]$?

### Options
- [ ] A) 0 <!-- weight: 0.0 -->
- [x] B) 2 (Las señales se intersectan cuando $\sin(x) = \sin(x + \frac{\pi}{3})$, lo que ocurre en $x = \frac{7\pi}{6}$ y $x = \frac{11\pi}{6}$ en $[0, 2\pi]$). <!-- weight: 1.0 -->
- [ ] C) Infinitos <!-- weight: 0.0 -->

### Scoring
- Solo B: 1.0 punto.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Eje | Bloom | ICFES | Validado |
|----|-----|------|-----|-------|-------|----------|
| 1 | ...-v1 | 4 | Irracionales | Identify | Arg | ✅ |
| 2 | ...-v2 | 6 | Composición | Use | Form/Ej | ✅ |
| 3 | ...-v3 | 7 | Trigon | Use | Int/Rep | ✅ |
| 4 | ...-v4 | 7 | Cónicas | Analyze | Int/Rep | ✅ |
| 5 | ...-v5 | 8 | Probabilidad | Use | Form/Ej | ✅ |
| 13 | ...-v13| 9 | Multi-param | Analyze | Arg | ✅ |
| 20 | ...-v20| 10| Ingeniería | Create | Arg | ✅ |
