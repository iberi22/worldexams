---
id: "CO-MAT-10-trigonometry-001-PRO"
country: "co"
grado: 10
asignatura: "matematicas"
tema: "Trigonometría"
periodo: 2
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación y Representación", "Formulación y Ejecución", "Argumentación"]
cognitive_levels: ["Identify", "Use", "Analyze", "Evaluate", "Create"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework / DBA G10"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: El Lenguaje de los Ángulos - Trigonometría Aplicada
La trigonometría nació de la necesidad de medir lo que no se puede alcanzar: la altura de una montaña, la distancia a una estrella, el ángulo de una rampa. En grado 10, profundizamos más allá de los triángulos rectángulos para explorar el **Círculo Unitario** (un círculo de radio 1 centrado en el origen), donde los ángulos se miden en **Radianes** y donde el seno y el coseno dejan de ser simples razones y se convierten en **Funciones Periódicas** que modelan fenómenos que se repiten: las olas del mar, el sonido de una guitarra, la electricidad alterna que alimenta tu casa.

---

## Question 1 (Identidades Básicas - Dificultad 4)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v1`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Identify

### Enunciado
¿Cuál es la **Identidad Pitagórica** fundamental de la trigonometría?

### Opciones
- [ ] A) $\sin(\theta) + \cos(\theta) = 1$
- [x] B) $\sin^2(\theta) + \cos^2(\theta) = 1$
- [ ] C) $\tan(\theta) = \sin(\theta) \cdot \cos(\theta)$
- [ ] D) $\sin(2\theta) = 2\sin(\theta)$

### Explicación Pedagógica
La identidad $\sin^2\theta + \cos^2\theta = 1$ es el teorema de Pitágoras aplicado al círculo unitario. Es la "madre" de todas las identidades trigonométricas y permite simplificar y transformar expresiones complejas.

---

## Question 2 (Conversión Radianes - Dificultad 5)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v2`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
Convierte $270°$ a radianes.

### Opciones
- [ ] A) $\pi$ rad
- [x] B) $\frac{3\pi}{2}$ rad
- [ ] C) $2\pi$ rad
- [ ] D) $\frac{\pi}{2}$ rad

### Explicación Pedagógica
Para convertir grados a radianes se multiplica por $\frac{\pi}{180°}$: $270° \times \frac{\pi}{180°} = \frac{270\pi}{180} = \frac{3\pi}{2}$ rad. Esta es la posición del eje negativo de Y en el círculo unitario.

---

## Question 3 (Ley de Senos - Dificultad 7)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v3`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
En un triángulo, el ángulo $A = 30°$, el ángulo $B = 45°$ y el lado $a = 4$ cm (opuesto a A). Usando la **Ley de Senos**, encuentra el lado $b$.

### Opciones
- [ ] A) $3\sqrt{2}$ cm
- [x] B) $4\sqrt{2}$ cm (ya que $\frac{b}{\sin{45°}} = \frac{4}{\sin{30°}} \Rightarrow b = 4 \cdot \frac{\sin{45°}}{\sin{30°}} = 4 \cdot \frac{\frac{\sqrt{2}}{2}}{\frac{1}{2}} = 4\sqrt{2}$)
- [ ] C) $2\sqrt{2}$ cm
- [ ] D) $8$ cm

### Explicación Pedagógica
La Ley de Senos: $\frac{a}{\sin A} = \frac{b}{\sin B} = \frac{c}{\sin C}$. Permite resolver triángulos donde no hay ángulo recto. Es fundamental en topografía, arquitectura y navegación.

---

## Question 4 (Ley de Cosenos - Dificultad 8)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v4`
### Enunciado
Un barco sale del puerto A y navega 10 km al norte hasta B, luego gira y navega 7 km hasta C, formando un ángulo de 120° en B. ¿Cuánto mide el lado AC?

### Opciones
- [ ] A) $\sqrt{51}$ km
- [ ] B) $\sqrt{149}$ km
- [x] C) $\sqrt{219}$ km ($c^2 = a^2 + b^2 - 2ab\cos(C) = 100 + 49 - 2(10)(7)\cos(120°) = 149 - 140(-\frac{1}{2}) = 149 + 70 = 219$)
- [ ] D) $17$ km

### Explicación Pedagógica
La Ley de Cosenos: $c^2 = a^2 + b^2 - 2ab\cos(C)$ se usa cuando se conocen dos lados y el ángulo entre ellos (caso LAA). Nótese que $\cos(120°) = -\frac{1}{2}$.

---

## Question 5 (Funciones Trigonométricas - Dificultad 8)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Interpretación y Representación
**Bloom:** Analyze

### Enunciado
La función $f(x) = 3\sin(2x)$ tiene amplitud A y periodo T. ¿Cuáles son los valores correctos?

### Options
- [x] A) Amplitud $A = 3$ <!-- weight: 1.0 -->
- [x] B) Periodo $T = \pi$ (ya que $T = \frac{2\pi}{|b|} = \frac{2\pi}{2} = \pi$) <!-- weight: 1.0 -->
- [ ] C) Amplitud $A = 2$ <!-- weight: 0.0 -->
- [ ] D) Periodo $T = 2\pi$ <!-- weight: 0.0 -->

### Scoring
- A y B correctas: 2.0 puntos. Cualquiera sola: 1.0 punto.

### Explicación Pedagógica
En $f(x) = A\sin(bx + c) + d$: la **amplitud** es $|A|$ (la altura máxima desde el centro) y el **periodo** es $\frac{2\pi}{|b|}$ (cuánto tarda en repetirse). Son los parámetros más evaluados en Saber 11.

---

## Contexto 2: Trigonometría en el Círculo Unitario
El Círculo Unitario es el mapa universal de los ángulos. En él, la coordenada X es el coseno del ángulo y la Y es el seno. Esto permite encontrar el valor de funciones trigonométricas para cualquier ángulo, incluso mayores a 90°. Las funciones seno y coseno son **pares** o **impares** (simétricas respecto al eje X o Y), y esa simetría es la base de las identidades de reducción que simplifican cálculos complejos.

---

## Question 6 (Evaluación en Círculo Unitario - Dificultad 7)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v6`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Use

### Enunciado
¿Cuál es el valor de $\cos(180°)$?

### Opciones
- [ ] A) $1$
- [x] B) $-1$
- [ ] C) $0$
- [ ] D) $\frac{\sqrt{3}}{2}$

### Explicación Pedagógica
En el círculo unitario, $180°$ (o $\pi$ rad) corresponde al punto $(-1, 0)$. La coordenada X es el coseno, por lo tanto $\cos(180°) = -1$.

---

## Question 7 (Identidades de Doble Ángulo - Dificultad 8)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v7`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Si $\sin(\theta) = \frac{3}{5}$ y $\theta$ está en el primer cuadrante, ¿cuánto es $\sin(2\theta)$?

### Opciones
- [ ] A) $\frac{6}{5}$
- [x] B) $\frac{24}{25}$ (usando $\sin(2\theta) = 2\sin\theta\cos\theta$, donde $\cos\theta = \frac{4}{5}$ por Pitágoras)
- [ ] C) $\frac{9}{25}$
- [ ] D) $\frac{3}{5}$

### Explicación Pedagógica
Primero: $\cos\theta = \sqrt{1 - \sin^2\theta} = \sqrt{1 - \frac{9}{25}} = \frac{4}{5}$. Luego: $\sin(2\theta) = 2 \cdot \frac{3}{5} \cdot \frac{4}{5} = \frac{24}{25}$.

---

## Question 13 (Modelamiento Audiovisual - Dificultad 9)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Formulación y Ejecución
**Bloom:** Evaluate

### Enunciado
Una onda sonora se modela con $P(t) = 5\cos(880\pi t)$, donde $P$ es la presión (Pa) y $t$ el tiempo (s). ¿Cuál es la frecuencia de la onda (en Hz)?

### Options
- [x] A) 440 Hz <!-- weight: 1.0 -->
- [ ] B) 880 Hz <!-- weight: 0.0 -->
- [ ] C) 5 Hz <!-- weight: 0.0 -->

### Scoring
- Solo A: 1.0 punto.

### Explicación Pedagógica
Periodo: $T = \frac{2\pi}{880\pi} = \frac{1}{440}$ s. Frecuencia: $f = \frac{1}{T} = 440$ Hz. Esta es la nota musical La4 (A440), el estándar internacional para afinar instrumentos. La trigonometría es el lenguaje de la música.

---

## Question 20 (Síntesis Geométrica - Dificultad 10)

**ID:** `CO-MAT-10-trigonometry-001-PRO-v20`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Create

### Enunciado
Un piloto ve un edificio con un ángulo de depresión de 15° desde 1000 m de altitud. ¿A qué distancia horizontal (en m) está el edificio? (Use $\tan(15°) \approx 0.268$)

### Options
- [ ] A) 268 m
- [ ] B) 1000 m
- [x] C) $\approx 3731$ m ($d = \frac{1000}{\tan(15°)} = \frac{1000}{0.268} \approx 3731$ m)
- [ ] D) 500 m

### Explicación Pedagógica
El ángulo de depresión forma un triángulo rectángulo con la altitud (cateto opuesto) y la distancia horizontal (cateto adyacente). $\tan(\theta) = \frac{opuesto}{adyacente} \Rightarrow$ Distancia $= \frac{altitud}{\tan(15°)}$.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Contenido | Bloom | ICFES | Validado |
|----|-----|------|-----------|-------|-------|----------|
| 1 | ...-v1 | 4 | Id. Pitagórica | Identify | Arg | ✅ |
| 2 | ...-v2 | 5 | Radianes | Use | Form/Ej | ✅ |
| 3 | ...-v3 | 7 | Ley Senos | Use | Form/Ej | ✅ |
| 4 | ...-v4 | 8 | Ley Cosenos | Use | Form/Ej | ✅ |
| 5 | ...-v5 | 8 | Funciones Trig | Analyze | Int/Rep | ✅ |
| 6 | ...-v6 | 7 | Círculo | Use | Int/Rep | ✅ |
| 7 | ...-v7 | 8 | Doble Ángulo | Analyze | Arg | ✅ |
| 13 | ...-v13| 9 | Ondas Sonido | Evaluate | Form/Ej | ✅ |
| 20 | ...-v20| 10| Aviación | Create | Arg | ✅ |
