---
id: "PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle"
country: "peru"
grado: 11
asignatura: "matematicas"
tema: "probabilidad"
periodo: "weekly"
week: "W30"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "CNEB + Admisión UNMSM/UNI"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

## Question 1 [D3]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.85
**Contexto:** Un estudiante en Lima repasa la definición clásica de probabilidad (Regla de Laplace).

### Enunciado
¿Cuál es la fórmula para calcular la probabilidad de un evento $A$ en un espacio muestral equiprobable?

### Opciones
- [ ] A) $P(A) = \text{Casos totales} / \text{Casos favorables}$
  <!-- feedback: Incorrecto. Es la relación inversa. -->
- [x] B) $P(A) = \text{Casos favorables} / \text{Casos totales}$
  <!-- feedback: Correcto. La probabilidad clásica es el cociente entre el número de resultados exitosos y el total de resultados posibles. -->
- [ ] C) $P(A) = \text{Casos favorables} \cdot \text{Casos totales}$
  <!-- feedback: Incorrecto. -->
- [ ] D) $P(A) = 1 / \text{Casos favorables}$
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
La Regla de Laplace establece que la probabilidad de un suceso es el cociente entre el número de casos favorables y el número de casos posibles, siempre que todos los resultados sean igualmente probables.

---

## Question 2 [D3]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.80
**Contexto:** Análisis del rango de valores de una probabilidad en Trujillo.

### Enunciado
¿Cuál es el rango de valores numéricos que puede tomar la probabilidad de cualquier evento aleatorio?

### Opciones
- [ ] A) De -1 a 1
  <!-- feedback: Incorrecto. No existen probabilidades negativas. -->
- [x] B) De 0 a 1
  <!-- feedback: Correcto. Una probabilidad es un valor comprendido entre la imposibilidad absoluta (0) y la certeza absoluta (1). -->
- [ ] C) De 0 a 100
  <!-- feedback: Incorrecto. Aunque puede expresarse como porcentaje, el rango numérico es de 0 a 1. -->
- [ ] D) Cualquier número positivo.
  <!-- feedback: Incorrecto. La probabilidad no puede ser mayor que 1. -->

### Explicacion Pedagogica
La probabilidad es una medida acotada. Un evento imposible tiene probabilidad 0, mientras que un evento seguro tiene probabilidad 1. Cualquier otro evento tiene una probabilidad en el intervalo $[0, 1]$.

---

## Question 3 [D4]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v3
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.75
**Contexto:** Lanzamiento de un dado común en Arequipa.

### Enunciado
¿Cuál es la probabilidad de obtener un número par al lanzar un dado común de seis caras?

### Opciones
- [ ] A) 1/6
  <!-- feedback: Incorrecto. Esta es la probabilidad de un solo número. -->
- [x] B) 1/2
  <!-- feedback: Correcto. Los números pares son {2, 4, 6}. Casos favorables: 3. Casos totales: 6. Probabilidad = 3/6 = 1/2. -->
- [ ] C) 1/3
  <!-- feedback: Incorrecto. -->
- [ ] D) 2/3
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El espacio muestral del dado es {1, 2, 3, 4, 5, 6}. Los resultados pares son {2, 4, 6}, sumando 3 casos favorables. Aplicando Laplace: $3 / 6 = 1 / 2$.

---

## Question 4 [D4]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v4
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.70
**Contexto:** Extracción de bolas de una urna en Cusco.

### Enunciado
En una urna hay 5 bolas rojas, 3 azules y 2 verdes. Si se extrae una bola al azar, ¿cuál es la probabilidad de que la bola elegida NO sea azul?

### Opciones
- [ ] A) 3/10
  <!-- feedback: Incorrecto. Esta es la probabilidad de que sí sea azul. -->
- [x] B) 7/10
  <!-- feedback: Correcto. Total de bolas = 10. Bolas no azules = 5 (rojas) + 2 (verdes) = 7. Probabilidad = 7/10. -->
- [ ] C) 1/2
  <!-- feedback: Incorrecto. -->
- [ ] D) 4/5
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Usamos el concepto de evento complementario: $P(A^c) = 1 - P(A)$. La probabilidad de que sea azul es $3/10$. Por tanto, la probabilidad de que no sea azul es $1 - 3/10 = 7/10$.

---

## Question 5 [D5]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v5
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.65
**Contexto:** Un examen de simulación sobre eventos independientes.

### Enunciado
Se lanzan una moneda y un dado simultáneamente. ¿Cuál es la probabilidad de obtener "Cara" en la moneda y un número "5" en el dado?

### Opciones
- [ ] A) 1/2
  <!-- feedback: Incorrecto. -->
- [ ] B) 1/6
  <!-- feedback: Incorrecto. -->
- [x] C) 1/12
  <!-- feedback: Correcto. Eventos independientes: $P(A \cap B) = P(A) \cdot P(B) = (1/2) \cdot (1/6) = 1/12$. -->
- [ ] D) 1/8
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Al ser lanzamientos independientes, la probabilidad conjunta es el producto de las probabilidades individuales. La probabilidad de cara es $1/2$ y la de obtener un cinco es $1/6$. Multiplicando obtenemos $1/12$.

---

## Question 6 [D5]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.60
**Contexto:** Sorteo de boletos numerados del 1 al 100 en Piura.

### Enunciado
¿Cuál es la probabilidad de que el boleto ganador sea un número múltiplo de 20?

### Opciones
- [ ] A) 1/100
  <!-- feedback: Incorrecto. -->
- [x] B) 1/20
  <!-- feedback: Correcto. Los múltiplos son {20, 40, 60, 80, 100}. Hay 5 casos de 100 totales. 5/100 = 1/20. -->
- [ ] C) 1/5
  <!-- feedback: Incorrecto. -->
- [ ] D) 20/100
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Los casos favorables son los números {20, 40, 60, 80, 100}, es decir, 5 casos. El total de casos es 100. La probabilidad es $5 / 100$, que simplificado es $1 / 20$.

---

## Question 7 [D5]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v7
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.55
**Contexto:** Lanzamiento de dos dados y suma de puntos en Lima.

### Enunciado
Al lanzar dos dados comunes, ¿cuál es la probabilidad de que la suma de los puntos obtenidos sea igual a 7?

### Opciones
- [ ] A) 1/12
  <!-- feedback: Incorrecto. -->
- [x] B) 1/6
  <!-- feedback: Correcto. De los 36 resultados posibles, 6 suman 7: (1,6), (2,5), (3,4), (4,3), (5,2), (6,1). 6/36 = 1/6. -->
- [ ] C) 7/36
  <!-- feedback: Incorrecto. -->
- [ ] D) 1/36
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El espacio muestral del lanzamiento de dos dados tiene $6 \times 6 = 36$ elementos. El número 7 se puede obtener de 6 formas distintas. Aplicando la regla de Laplace: $6 / 36 = 1 / 6$.

---

## Question 8 [D6]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.50
**Contexto:** Probabilidad de la unión de eventos mutuamente excluyentes.

### Enunciado
Si se sabe que $P(A) = 0.3$, $P(B) = 0.4$ y que $A$ y $B$ son eventos mutuamente excluyentes, calcule $P(A \cup B)$.

### Opciones
- [ ] A) 0.12
  <!-- feedback: Incorrecto. Este es el producto de probabilidades. -->
- [x] B) 0.70
  <!-- feedback: Correcto. Para eventos excluyentes, la probabilidad de la unión es la suma de las probabilidades: 0.3 + 0.4 = 0.7. -->
- [ ] C) 0.10
  <!-- feedback: Incorrecto. -->
- [ ] D) 0.50
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Dos eventos son mutuamente excluyentes si no pueden ocurrir simultáneamente. En este caso, la probabilidad de que ocurra uno u otro es simplemente la suma de sus probabilidades individuales.

---

## Question 9 [D6]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v9
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.55
**Contexto:** Uso del principio de inclusión-exclusión en Trujillo.

### Enunciado
En un grupo de 50 personas, 30 hablan español, 25 hablan inglés y 10 hablan ambos. Si se elige uno al azar, ¿cuál es la probabilidad de que hable español o inglés?

### Opciones
- [ ] A) 55/50
  <!-- feedback: Incorrecto. Supera la unidad. -->
- [ ] B) 10/50
  <!-- feedback: Incorrecto. -->
- [x] C) 0.90
  <!-- feedback: Correcto. Casos favorables: 30 + 25 - 10 = 45. Probabilidad = 45/50 = 0.9. -->
- [ ] D) 0.70
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Usamos la fórmula $P(A \cup B) = P(A) + P(B) - P(A \cap B)$. Sustituyendo: $30/50 + 25/50 - 10/50 = 45/50 = 0.9$.

---

## Question 10 [D6]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v10
**Bloom:** Understand
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.50
**Contexto:** Permutaciones lineales en una fila de asientos.

### Enunciado
¿De cuántas formas diferentes se pueden sentar 5 personas en una fila de 5 asientos?

### Opciones
- [ ] A) 25
  <!-- feedback: Incorrecto. -->
- [ ] B) 60
  <!-- feedback: Incorrecto. -->
- [x] C) 120
  <!-- feedback: Correcto. Es una permutación de 5 elementos: 5! = 120. -->
- [ ] D) 5
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para ordenar $n$ objetos distintos en una línea se utiliza el factorial de $n$. En este caso, $5! = 5 \times 4 \times 3 \times 2 \times 1 = 120$ formas distintas.

---

## Question 11 [D7]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.45
**Contexto:** Probabilidad condicional en el control de calidad en el Callao.

### Enunciado
En una caja hay 10 tornillos, 3 de ellos defectuosos. Si se extraen dos tornillos al azar sin reposición, ¿cuál es la probabilidad de que ambos sean defectuosos?

### Opciones
- [ ] A) 9/100
  <!-- feedback: Incorrecto. Esto sería con reposición. -->
- [x] B) 1/15
  <!-- feedback: Correcto. P = (3/10) * (2/9) = 6/90 = 1/15. -->
- [ ] C) 3/10
  <!-- feedback: Incorrecto. -->
- [ ] D) 1/10
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
La probabilidad del primer tornillo defectuoso es $3/10$. Al no haber reposición, para la segunda extracción quedan 9 tornillos, de los cuales 2 son defectuosos. Multiplicamos ambas probabilidades: $(3/10) \times (2/9) = 1/15$.

---

## Question 12 [D7]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v12
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.40
**Contexto:** Combinaciones en la selección de un comité escolar en Ica.

### Enunciado
¿Cuántos comités diferentes de 3 personas se pueden formar a partir de un grupo de 10 personas?

### Opciones
- [ ] A) 720
  <!-- feedback: Incorrecto. Este es el número de variaciones (el orden importa). -->
- [x] B) 120
  <!-- feedback: Correcto. C(10,3) = (10*9*8)/(3*2*1) = 120. -->
- [ ] C) 30
  <!-- feedback: Incorrecto. -->
- [ ] D) 1000
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Como el orden de los integrantes en un comité no es relevante, usamos la fórmula de combinaciones: $C(n, k) = \frac{n!}{k!(n-k)!}$. Sustituyendo $n=10, k=3$, obtenemos 120 grupos posibles.

---

## Question 13 [D7]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v13
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.40
**Contexto:** Análisis de probabilidad en eventos deportivos independientes en Huancayo.

### Enunciado
La probabilidad de que un equipo gane un partido es 0.6. Si juega dos partidos independientes, ¿cuál es la probabilidad de que gane ambos?

### Opciones
- [ ] A) 0.60
  <!-- feedback: Incorrecto. -->
- [ ] B) 1.20
  <!-- feedback: Incorrecto. -->
- [x] C) 0.36
  <!-- feedback: Correcto. Probabilidad conjunta de eventos independientes: 0.6 * 0.6 = 0.36. -->
- [ ] D) 0.12
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Para sucesos independientes, la probabilidad de que ocurran ambos es el producto de sus probabilidades individuales. $P(G_1 \cap G_2) = 0.6 \times 0.6 = 0.36$.

---

## Question 14 [D8]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.35
**Contexto:** Lanzamiento de 3 monedas en un experimento aleatorio.

### Enunciado
Se lanzan 3 monedas simultáneamente. ¿Cuál es la probabilidad de obtener al menos una "Cara"?

### Opciones
- [ ] A) 1/8
  <!-- feedback: Incorrecto. -->
- [ ] B) 1/2
  <!-- feedback: Incorrecto. -->
- [x] C) 7/8
  <!-- feedback: Correcto. Complemento: Solo un caso no tiene caras (S,S,S). P = 1 - 1/8 = 7/8. -->
- [ ] D) 3/8
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
El espacio muestral tiene $2^3 = 8$ casos. El único caso en el que no sale ninguna cara es obtener tres sellos {S, S, S}. La probabilidad del complemento es $1/8$. Por tanto, la probabilidad de obtener al menos una cara es $1 - 1/8 = 7/8$.

---

## Question 15 [D8]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v15
**Bloom:** Evaluate
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.30
**Contexto:** Probabilidad total aplicada a una población en Lima.

### Enunciado
En un grupo, el 60% son hombres y el 40% mujeres. El 10% de los hombres y el 5% de las mujeres fuman. Si se elige una persona al azar, ¿cuál es la probabilidad de que fume?

### Opciones
- [ ] A) 15%
  <!-- feedback: Incorrecto. -->
- [x] B) 8%
  <!-- feedback: Correcto. P = 0.6(0.10) + 0.4(0.05) = 0.06 + 0.02 = 0.08. -->
- [ ] C) 7.5%
  <!-- feedback: Incorrecto. -->
- [ ] D) 10%
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Aplicamos el Teorema de Probabilidad Total: sumamos la probabilidad de fumar condicionada a ser hombre más la condicionada a ser mujer, cada una ponderada por su peso poblacional. $P = 0.06 + 0.02 = 0.08$.

---

## Question 16 [D8]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v16
**Bloom:** Apply
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.35
**Contexto:** Permutaciones con repetición en Trujillo.

### Enunciado
¿Cuántas palabras diferentes de 5 letras se pueden formar permutando las letras de la palabra "ANANA"?

### Opciones
- [ ] A) 120
  <!-- feedback: Incorrecto. -->
- [x] B) 10
  <!-- feedback: Correcto. Permutación con repetición: 5! / (3! * 2!) = 120 / 12 = 10. -->
- [ ] C) 30
  <!-- feedback: Incorrecto. -->
- [ ] D) 20
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
La palabra tiene 5 letras con repeticiones: 'A' aparece 3 veces y 'N' aparece 2 veces. Aplicando la fórmula de permutación con repetición: $5! / (3! \times 2!) = 120 / (6 \times 2) = 10$.

---

## Question 17 [D9]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.25
**Contexto:** Teorema de Bayes aplicado a diagnóstico médico.

### Enunciado
Basado en los datos del problema 15, si se sabe que la persona elegida fuma, ¿cuál es la probabilidad de que sea mujer?

### Opciones
- [ ] A) 40%
  <!-- feedback: Incorrecto. -->
- [x] B) 25%
  <!-- feedback: Correcto. P(M|Fuma) = P(M y Fuma) / P(Fuma) = 0.02 / 0.08 = 0.25. -->
- [ ] C) 50%
  <!-- feedback: Incorrecto. -->
- [ ] D) 20%
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Usamos el Teorema de Bayes. La probabilidad de que sea mujer dado que fuma es la probabilidad de que ocurran ambas cosas ($0.4 \times 0.05 = 0.02$) dividida entre la probabilidad total de fumar ($0.08$). El resultado es $0.25$ o 25%.

---

## Question 18 [D9]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v18
**Bloom:** Analyze
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.20
**Contexto:** Distribución binomial en un examen preuniversitario.

### Enunciado
Un arquero tiene probabilidad 0.8 de acertar. Si dispara 4 veces de forma independiente, ¿cuál es la probabilidad de que acierte exactamente en 3 ocasiones?

### Opciones
- [ ] A) 0.8000
  <!-- feedback: Incorrecto. -->
- [x] B) 0.4096
  <!-- feedback: Correcto. P = C(4,3) * 0.8^3 * 0.2^1 = 4 * 0.512 * 0.2 = 0.4096. -->
- [ ] C) 0.5120
  <!-- feedback: Incorrecto. -->
- [ ] D) 0.3276
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
Aplicamos la fórmula binomial $P(k) = \binom{n}{k} p^k (1-p)^{n-k}$. Para $n=4, k=3$ y $p=0.8$: $4 \times (0.8)^3 \times (0.2)^1 = 0.4096$.

---

## Question 19 [D10]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.15
**Contexto:** Probabilidad geométrica en el plano cartesiano.

### Enunciado
Se elige un punto $(x, y)$ al azar dentro de un cuadrado de lado 2. ¿Cuál es la probabilidad de que la suma de sus coordenadas sea menor que 1?

### Opciones
- [ ] A) 1/4
  <!-- feedback: Incorrecto. -->
- [x] B) 1/8
  <!-- feedback: Correcto. Area total = 4. Area favorable (triángulo x+y<1) = 0.5. Probabilidad = 0.5/4 = 1/8. -->
- [ ] C) 1/2
  <!-- feedback: Incorrecto. -->
- [ ] D) 1/16
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
En probabilidad geométrica dividimos el área favorable entre el área total. El cuadrado tiene área 4. La condición $x+y < 1$ define un triángulo rectángulo de base 1 y altura 1, cuya área es 0.5. La probabilidad es $0.5 / 4 = 0.125$ o $1/8$.

---

## Question 20 [D10]
**ID:** PE-MAT-11-2026-W30-probabilidad-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Resuelve problemas de gestión de datos e incertidumbre
**Expected_Success:** 0.10
**Contexto:** Esperanza matemática en un juego de azar.

### Enunciado
En un juego se lanza un dado. Si sale 6, el jugador gana S/ 10. Si sale cualquier otro número, pierde S/ 2. Determine la esperanza matemática del juego.

### Opciones
- [x] A) S/ 0
  <!-- feedback: Correcto. E = (1/6)(10) + (5/6)(-2) = 10/6 - 10/6 = 0. Es un juego justo. -->
- [ ] B) S/ 2
  <!-- feedback: Incorrecto. -->
- [ ] C) S/ 1.33
  <!-- feedback: Incorrecto. -->
- [ ] D) S/ -0.5
  <!-- feedback: Incorrecto. -->

### Explicacion Pedagogica
La esperanza matemática es el promedio ponderado de los resultados posibles: $E = \sum x_i p_i$. Aquí: $(10 \times 1/6) + (-2 \times 5/6) = 10/6 - 10/6 = 0$. Un valor de 0 indica que el juego es equilibrado a largo plazo.
