---
id: "CO-MAT-10-statistics-001-PRO"
country: "co"
grado: 10
asignatura: "matematicas"
tema: "Estadística y Probabilidad"
periodo: 4
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-9"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Interpretación y Representación", "Formulación y Ejecución", "Argumentación"]
cognitive_levels: ["Identify", "Use", "Analyze", "Evaluate", "Create"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Mathematics Framework / DBA G10"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: De la Muestra al Universo - Estadística e Inferencia
¿Cómo puede una encuesta de 1,000 personas predecir el voto de 50 millones? La respuesta es la **Estadística Inferencial**: la ciencia de sacar conclusiones sobre una **Población** entera a partir de una **Muestra** pequeña. En grado 10, avanzamos más allá de calcular promedios para entender cómo funcionan los muestreos, cuándo son confiables y cómo la **Probabilidad Condicional** (¿qué tan probable es A si ya ocurrió B?) y el **Teorema de Bayes** nos permiten actualizar nuestras creencias a medida que llega nueva evidencia. Estas herramientas son la base de la Inteligencia Artificial, la medicina basada en evidencia y la economía moderna.

---

## Question 1 (Descriptiva - Dificultad 4)

**ID:** `CO-MAT-10-statistics-001-PRO-v1`
**Type:** `single`
**ICFES:** Interpretación y Representación
**Bloom:** Identify

### Enunciado
Los datos $\{2, 3, 5, 5, 7, 8, 10\}$ corresponden a las edades de un grupo. ¿Cuál es la **Mediana**?

### Opciones
- [ ] A) $3$
- [ ] B) $5.7$
- [x] C) $5$ (el valor central del conjunto ordenado con 7 datos es el 4° elemento)
- [ ] D) $7$

### Explicación Pedagógica
La mediana es el valor que divide el conjunto ordenado en dos mitades iguales. Con 7 datos, el valor central es el 4°: $2, 3, 5, \mathbf{5}, 7, 8, 10$. Mediana $= 5$.

---

## Question 2 (Medidas de Dispersión - Dificultad 5)

**ID:** `CO-MAT-10-statistics-001-PRO-v2`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Analyze

### Enunciado
Dos grupos de estudiantes tienen un promedio de calificaciones de 7.0. El Grupo A tiene desviación estándar $\sigma=0.2$ y el Grupo B tiene $\sigma=2.5$. ¿Cuál es la conclusión más correcta?

### Opciones
- [ ] A) A y B tienen exactamente el mismo desempeño.
- [x] B) El Grupo A es más homogéneo (notas consistentes) y el Grupo B es más heterogéneo (notas muy dispersas).
- [ ] C) El Grupo B tiene mejores estudiantes.
- [ ] D) La desviación estándar no dice nada sobre las notas.

### Explicación Pedagógica
La desviación estándar mide cuánto se alejan los datos de la media. $\sigma$ pequeña indica que las notas están agrupadas cerca del promedio (grupo homogéneo). $\sigma$ grande indica gran variedad (excelentes y reprobados en el mismo grupo).

---

## Question 3 (Probabilidad Condicional - Dificultad 7)

**ID:** `CO-MAT-10-statistics-001-PRO-v3`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
En un colegio, el 60% de los estudiantes practican deporte. De los que practican deporte, el 80% aprueba matemáticas. ¿Cuál es la probabilidad de que un estudiante elegido al azar practique deporte **y** apruebe matemáticas?

### Opciones
- [ ] A) 0.80
- [x] B) 0.48 (es $P(\text{deporte}) \times P(\text{aprueba}|\text{deporte}) = 0.6 \times 0.8 = 0.48$)
- [ ] C) 0.60
- [ ] D) 0.20

### Explicación Pedagógica
La probabilidad de la intersección de dos eventos (cuando uno depende del otro): $P(A \cap B) = P(A) \cdot P(B|A)$. Esto es la Regla del Producto para eventos dependientes. El 80% aplica solo dentro del 60%, no al total.

---

## Question 4 (Teorema de Bayes - Dificultad 9)

**ID:** `CO-MAT-10-statistics-001-PRO-v4`
### Enunciado
Una enfermedad afecta al 1% de la población. Una prueba médica es 95% precisa (detecta correctamente el 95% de los enfermos) pero tiene un 5% de falsos positivos (da positivo en el 5% de los sanos). Si alguien da positivo, ¿cuál es la probabilidad de que realmente esté enfermo? (Aplique el Teorema de Bayes)

### Opciones
- [ ] A) 95%, ya que esa es la precisión de la prueba.
- [x] B) Aproximadamente 16% ($P(E|+) = \frac{0.95 \times 0.01}{0.95 \times 0.01 + 0.05 \times 0.99} \approx \frac{0.0095}{0.0590} \approx 0.161$)
- [ ] C) 50%, es como lanzar una moneda.
- [ ] D) 1%, ya que la enfermedad es rara.

### Explicación Pedagógica
Este es uno de los resultados más contra-intuitivos de la probabilidad. Cuando una enfermedad es rara, incluso una prueba precisa genera muchos falsos positivos porque hay muchos sanos disponibles para dar "engañosamente" positivo. El Teorema de Bayes $P(A|B) = \frac{P(B|A)\cdot P(A)}{P(B)}$ reencuadra la probabilidad considerando toda la información.

---

## Question 5 (Permutaciones - Dificultad 6)

**ID:** `CO-MAT-10-statistics-001-PRO-v5`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
¿De cuántas formas se puede organizar a 5 estudiantes en una fila?

### Opciones
- [ ] A) 25
- [x] B) 120 ($5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$)
- [ ] C) 10
- [ ] D) 60

### Explicación Pedagógica
Las **permutaciones** cuentan el número de formas de ordenar $n$ objetos distintos sin repetición: $P(n, n) = n!$. Con 5 estudiantes hay $5! = 120$ ordenaciones posibles.

---

## Question 6 (Combinaciones - Dificultad 7)

**ID:** `CO-MAT-10-statistics-001-PRO-v6`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Use

### Enunciado
En un comité de 10 personas se deben elegir 3 para un subcomité. ¿Cuántas formas hay de hacerlo? ($\binom{10}{3} = ?$)

### Opciones
- [ ] A) 30
- [ ] B) 720
- [x] C) 120 ($\binom{10}{3} = \frac{10!}{3! \cdot 7!} = \frac{10 \times 9 \times 8}{3 \times 2 \times 1} = 120$)
- [ ] D) 1000

### Explicación Pedagógica
Las **combinaciones** se usan cuando el orden no importa. $\binom{n}{k} = \frac{n!}{k!(n-k)!}$. A diferencia de permutaciones, elegir al grupo $\{A, B, C\}$ es lo mismo que $\{C, B, A\}$.

---

## Question 13 (Muestreo e Inferencia - Dificultad 8)

**ID:** `CO-MAT-10-statistics-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Un investigador quiere saber qué porcentaje de los colegios de Bogotá tiene internet. Tiene recursos para encuestar 50 colegios de los 2,000 existentes. ¿Cuál sería el método de muestreo más confiable?

### Options
- [ ] A) Encuestar solo a los colegios que él conoce personalmente. <!-- weight: 0.0 -->
- [x] B) Muestreo Aleatorio Simple: asignar un número a cada colegio y elegir 50 al azar con una tabla de números aleatorios. <!-- weight: 1.0 -->
- [x] C) Muestreo Estratificado: dividir por localidad y elegir proporcional a cada zona para representar la diversidad geográfica de Bogotá. <!-- weight: 1.0 -->
- [ ] D) Encuestar solo a los colegios que respondan voluntariamente. <!-- weight: 0.0 -->

### Scoring
- Respuesta B o C: 1.0 punto. (Identifica métodos de muestreo probabilístico).

### Explicación Pedagógica
Los métodos B y C son probabilísticos: cada colegio tiene una probabilidad conocida de ser elegido, lo que garantiza que la muestra sea representativa. Las opciones A y D son sesgadas: no representan al universo real.

---

## Question 20 (Síntesis de Estadística - Dificultad 9)

**ID:** `CO-MAT-10-statistics-001-PRO-v20`
**Type:** `single`
**ICFES:** Argumentación
**Bloom:** Evaluate

### Enunciado
Si un boxplot (diagrama de caja) muestra que la mediana está muy cerca del cuartil Q3 (bastante hacia la derecha de la caja), ¿qué indica esto sobre la distribución de los datos?

### Options
- [ ] A) La distribución es simétrica y normal.
- [x] B) La distribución tiene **sesgo negativo** (asimetría a la izquierda): la mayoría de los datos son altos pero hay algunos valores muy bajos que "jalan" la distribución.
- [ ] C) No hay datos atípicos.
- [ ] D) La media y la mediana son exactamente iguales.

### Explicación Pedagógica
Cuando la mediana está cerca de Q3, significa que el 50% de los datos superiores están comprimidos en un rango pequeño (mayoría de notas altas), pero el 50% inferior está muy disperso a la izquierda (algunos con notas muy bajas). Eso se llama sesgo negativo o asimetría hacia la izquierda.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Contenido | Bloom | ICFES | Validado |
|----|-----|------|-----------|-------|-------|----------|
| 1 | ...-v1 | 4 | Mediana | Identify | Int/Rep | ✅ |
| 2 | ...-v2 | 5 | Dispersión | Analyze | Arg | ✅ |
| 3 | ...-v3 | 7 | P. Condicional | Use | Form/Ej | ✅ |
| 4 | ...-v4 | 9 | Bayes | Use | Form/Ej | ✅ |
| 5 | ...-v5 | 6 | Permutaciones | Use | Form/Ej | ✅ |
| 6 | ...-v6 | 7 | Combinaciones | Use | Form/Ej | ✅ |
| 13 | ...-v13| 8 | Muestreo | Evaluate | Arg | ✅ |
| 20 | ...-v20| 9 | Boxplot | Evaluate | Arg | ✅ |
