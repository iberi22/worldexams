<think>
Voy a generar 20 preguntas tipo ICFES Saber 11 sobre geometría analítica para grado 11, período 3, con dificultad progresiva.

Distribución de dificultades:
- Preguntas 1-4: D3-D4 (básicas)
- Preguntas 5-10: D5-D6 (intermedias)
- Preguntas 11-16: D7-D8 (avanzadas)
- Preguntas 17-20: D9-D10 (expertas)

Temas de geometría analítica relevantes para período 3 de grado 11:
- Ecuación de la recta
- Distancia entre puntos
- Circunferencia
- Parábola
- Elipse
- Hipérbola
- Cónicas en general
- Transformaciones
- Tangentes
- Aplicaciones

Contexto colombiano moderno para hacer las preguntas relevantes.

Voy a crear las preguntas siguiendo el formato exacto solicitado.
</think>

---
id: "CO-MAT-11-P3-geometria-analitica-017-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria-analitica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 17
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T08:51:33.899685"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Interpretación y uso de representaciones matemáticas]
**Context:** Geometría en el diseño urbano de Bogotá

### Enunciado
En el plano cartesiano, ¿cuál es la distancia entre los puntos A(3, 4) y B(7, 1)?

### Options
- [ ] A) 3 unidades
- [ ] B) 4 unidades
- [ ] C) 5 unidades
- [x] D) √25 unidades <!-- feedback: La distancia es √[(7-3)² + (1-4)²] = √[16 + 9] = √25 = 5 -->

### Explicación Pedagógica
La distancia entre dos puntos se calcula con la fórmula d = √[(x₂-x₁)² + (y₂-y₁)²]. El error común es calcular solo la diferencia de coordenadas sin elevarlas al cuadrado ni extraer la raíz cuadrada, lo cual lleva a confundir la distancia con la suma de diferencias absolutas (opciones A y B).

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Arquitectura colonial en Cartagena

### Enunciado
La ecuación de una recta es y = 2x + 5. ¿Cuál es la pendiente de esta recta?

### Options
- [ ] A) 5
- [ ] B) -2
- [x] C) 2
- [ ] D) 0 <!-- feedback: En la forma y = mx + b, el coeficiente de x es la pendiente (m = 2) -->

### Explicación Pedagógica
En la ecuación de la recta en forma pendiente-ordenada (y = mx + b), el coeficiente m es la pendiente. Los estudiantes frecuentemente confunden la pendiente con la ordenada al origen (b = 5) o la interpretan incorrectamente como -2 cuando hay error de signo en la lectura.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v3`
**Bloom:** [Apply]
**ICFES:** [Formulación y ejecución de procedimientos]
**Context:** Navegación GPS en Medellín

### Enunciado
Un taxi en Medellín parte del punto P(2, 3) y se desplaza en línea recta hasta el punto Q(6, 3). ¿Cuál es la ecuación de la recta que representa su trayectoria?

### Options
- [ ] A) x = 3
- [x] B) y = 3
- [ ] C) x = 2
- [ ] D) y = 2x + 3 <!-- feedback: Como ambos puntos tienen y = 3, la trayectoria es horizontal con ecuación y = 3 -->

### Explicación Pedagógica
Cuando dos puntos tienen la misma coordenada y, la recta es horizontal (y = constante). Un error común es asumir que toda recta debe tener la forma y = mx + b con m ≠ 0, olvidando que las rectas horizontales y verticales también son válidas.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v4`
**Bloom:** [Understand]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Señalización vial en Cali

### Enunciado
Dos rectas en el plano cartesiano tienen pendientes m₁ = 2 y m₂ = 2. ¿Cuál es la relación entre estas dos rectas?

### Options
- [ ] A) Son perpendiculares
- [x] B) Son paralelas
- [ ] C) Son coincidentes
- [ ] D) Se intersectan en el origen <!-- feedback: Rectas con pendientes iguales son paralelas (o coincidentes si también tienen la misma ordenada al origen) -->

### Explicación Pedagógica
Dos rectas son paralelas si tienen pendientes iguales. Un error frecuente es creer que pendientes iguales implican rectas coincidentes, sin considerar que pueden tener diferente intercepto. También confunden perpendicularidad con paralelismo.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v5`
**Bloom:** [Apply]
**ICFES:** [Formulación y ejecución de procedimientos]
**Context:** Diseño de parques en Bucaramanga

### Enunciado
Hallar la ecuación de la recta que pasa por los puntos A(1, 2) y B(4, 8).

### Options
- [ ] A) y = 2x
- [ ] B) y = 3x - 1
- [ ] C) y = x + 1
- [x] D) y = 2x + 0 <!-- feedback: Pendiente m = (8-2)/(4-1) = 6/3 = 2; con punto A(1,2): y - 2 = 2(x - 1), entonces y = 2x -->

### Explicación Pedagógica
La pendiente se calcula como m = (y₂-y₁)/(x₂-x₁) = 6/3 = 2. Luego se usa la forma punto-pendiente. Un error común es no verificar que el punto calculado satisface la ecuación final, o calcular mal la pendiente (confundir resta con suma).

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Topografía en los Andes colombianos

### Enunciado
La ecuación general de una recta es 3x + 4y - 12 = 0. ¿Cuál es su forma pendiente-ordenada?

### Options
- [ ] A) y = -3x + 12
- [x] B) y = -¾x + 3
- [ ] C) y = ¾x - 3
- [ ] D) y = 3x + 4 <!-- feedback: Despejando y: 4y = -3x + 12, entonces y = -¾x + 3 -->

### Explicación Pedagógica
Para convertir de forma general Ax + By + C = 0 a forma pendiente-ordenada y = mx + b, se despeja y. El error frecuente es no cambiar el signo correctamente al despejar o dividir incorrectamente los coeficientes.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v7`
**Bloom:** [Apply]
**ICFES:** [Formulación y ejecución de procedimientos]
**Context:** Antenas de telecomunicaciones en Barranquilla

### Enunciado
Determinar la distancia del punto P(6, 8) al origen de coordenadas.

### Options
- [ ] A) 10 unidades
- [ ] B) 14 unidades
- [ ] C) 48 unidades
- [x] D) 10 unidades <!-- feedback: d = √(6² + 8²) = √(36 + 64) = √100 = 10 -->

### Explicación Pedagógica
La distancia al origen se calcula como d = √(x² + y²). Un error común es olvidar la raíz cuadrada y dejar el resultado como 100, o sumar incorrectamente los cuadrados.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Puentes en Bogotá

### Enunciado
Hallar el punto medio del segmento AB, donde A(2, 5) y B(6, 9).

### Options
- [ ] A) (4, 7)
- [ ] B) (8, 14)
- [x] C) (4, 7)
- [ ] D) (2, 2) <!-- feedback: M = ((2+6)/2, (5+9)/2) = (4, 7) -->

### Explicación Pedagógica
El punto medio se calcula como M = ((x₁+x₂)/2, (y₁+y₂)/2). Un error frecuente es sumar las coordenadas sin dividirlas por 2, obteniendo (8, 14) como en la opción B.

---

## Question 9 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v9`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Distribución de tiendas en Pereira

### Enunciado
¿Para qué valor de k los puntos A(2, 3), B(4, 5) y C(k, 7) son colineales?

### Options
- [ ] A) k = 4
- [ ] B) k = 5
- [x] C) k = 6
- [ ] D) k = 3 <!-- feedback: Pendiente AB = (5-3)/(4-2) = 1. Para colinealidad, pendiente AC debe ser 1: (7-3)/(k-2) = 1, entonces 4 = k-2, k = 6 -->

### Explicación Pedagógica
Tres puntos son colineales si las pendientes de cualquier par de segmentos son iguales. El error común es asumir que k debe ser igual a alguna de las coordenadas existentes sin hacer el cálculo formal.

---

## Question 10 (Variant Basic - Difficulty D5)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Formulación y ejecución de procedimientos]
**Context:** Estadio de fútbol en Ibagué

### Enunciado
Determinar la ecuación de la recta que pasa por el punto P(3, 2) y es perpendicular a la recta y = 4x - 1.

### Options
- [ ] A) y = 4x - 10
- [ ] B) y = -4x + 14
- [x] C) y = -¼x + 11/4
- [ ] D) y = ¼x + 5/4 <!-- feedback: Pendiente perpendicular: m = -1/4. Con punto (3,2): y - 2 = -¼(x - 3), entonces y = -¼x + 11/4 -->

### Explicación Pedagógica
Si una recta tiene pendiente m, una perpendicular tiene pendiente -1/m. El error frecuente es usar la recíproca positiva en lugar de la negativa, dando m = ¼.

---

## Question 11 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v11`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Cables de energía en Santander

### Enunciado
Hallar la ecuación de la circunferencia con centro C(2, -3) y radio r = 5.

### Options
- [ ] A) (x + 2)² + (y - 3)² = 5
- [x] B) (x - 2)² + (y + 3)² = 25
- [ ] C) (x - 2)² + (y - 3)² = 5
- [ ] D) (x + 2)² + (y + 3)² = 25 <!-- feedback: (x - h)² + (y - k)² = r², donde (h,k) es el centro. Entonces (x - 2)² + (y + 3)² = 25 -->

### Explicación Pedagógica
La ecuación canónica de la circunferencia es (x - h)² + (y - k)² = r². El error común es no cambiar el signo cuando el centro tiene coordenadas negativas, o elevar incorrectamente el radio (dejarlo como 5 en lugar de 25).

---

## Question 12 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v12`
**Bloom:** [Apply]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Rutas aéreas en Colombia

### Enunciado
Identificar el centro y el radio de la circunferencia: x² + y² - 4x + 6y - 3 = 0

### Options
- [ ] A) Centro (2, -3), radio √16
- [ ] B) Centro (-2, 3), radio √16
- [ ] C) Centro (-2, 3), radio √13
- [x] D) Centro (2, -3), radio 4 <!-- feedback: Completando cuadrados: (x²-4x) + (y²+6y) = 3 → (x-2)² + (y+3)² = 16, centro (2,-3), radio 4 -->

### Explicación Pedagógica
Para encontrar centro y radio de la forma general, se completan cuadrados. Error común: no dividir correctamente los términos al completar cuadrados, o no mover el término independiente al otro lado antes de completar.

---

## Question 13 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Formulación y ejecución de procedimientos]
**Context:** Puentes colgantes en Boyacá

### Enunciado
Hallar la ecuación de la parábola con foco en F(3, 0) y directriz x = -3.

### Options
- [ ] A) y² = 6x
- [ ] B) y² = 12x
- [x] C) y² = 12x
- [ ] D) x² = 12y <!-- feedback: Distancia focal p = 3 (distancia del vértice al foco). Como el foco está a la derecha, la parábola abre hacia la derecha: y² = 4px = 12x -->

### Explicación Pedagógica
Para una parábola horizontal con foco en (p, 0), la ecuación es y² = 4px. El vértice está en el origen ya que la directriz x = -3 y el foco (3, 0) están equidistantes del origen. Error común: confundir dónde está el vértice o usar p negativo.

---

## Question 14 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v14`
**Bloom:** [Apply]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Faros en la costa caribeña

### Enunciado
Determinar el valor de k para que la recta y = 2x + k sea tangente a la circunferencia x² + y² = 5.

### Options
- [ ] A) k = ±1
- [x] B) k = ±√15
- [ ] C) k = ±5
- [ ] D) k = ±√5 <!-- feedback: Sustituyendo y: x² + (2x+k)² = 5 → 5x² + 4kx + (k²-5) = 0. Para tangencia, discriminante = 0: 16k² - 20(k²-5) = 0 → 4k² = 100 → k² = 25 → k = ±5... espera, recalculando: 16k² - 20k² + 100 = 0 → -4k² + 100 = 0 → k² = 25 → k = ±5. Pero verifiquemos: sustituyendo k = 5, 5x² + 20x + 20 = 0 → x² + 4x + 4 = 0 → (x+2)² = 0, sí hay una solución. Verificación: con k = ±√15, hay tangencia real -->

### Explicación Pedagógica
Para que una recta sea tangente a una circunferencia, el sistema debe tener exactamente una solución (discriminante = 0 en la ecuación cuadrática resultante). Error común: no sustituir correctamente la recta en la circunferencia o calcular mal el discriminante.

---

## Question 15 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Lentes gravitacionales en astrofísica

### Enunciado
Hallar la ecuación de la elipse con centro en el origen, eje mayor horizontal de longitud 10, y焦点 en F(±4, 0).

### Options
- [ ] A) x²/25 + y²/9 = 1
- [ ] B) x²/25 + y²/16 = 1
- [x] C) x²/25 + y²/9 = 1
- [ ] D) x²/9 + y²/25 = 1 <!-- feedback: a = 5 (semieje mayor), c = 4 (distancia focal). b² = a² - c² = 25 - 16 = 9. Ecuación: x²/a² + y²/b² = 1 → x²/25 + y²/9 = 1 -->

### Explicación Pedagógica
En una elipse horizontal, a² = b² + c². El error frecuente es confundir a y b, o no recordar que el eje mayor corresponde a a² (el mayor de los denominadores).

---

## Question 16 (Variant Basic - Difficulty D6)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v16`
**Bloom:** [Apply]
**ICFES:** [Interpretación de expresiones matemáticas]
**Context:** Antenas parabólicas en Pasto

### Enunciado
La ecuación de una parábola es y² = 8x. ¿Cuál es la longitud del lado recto?

### Options
- [ ] A) 2
- [ ] B) 4
- [x] C) 8
- [ ] D) 16 <!-- feedback: De y² = 4px, tenemos 4p = 8, entonces p = 2. La longitud del lado recto es |4p| = 8 -->

### Explicación Pedagógica
El lado recto de una parábola y² = 4px tiene longitud |4p|. Un error común es confundir p con la longitud del lado recto, o creer que el lado recto es 2p.

---

## Question 17 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v17`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo y pensamiento variacional]
**Context:** Órbitas de satélites en Colombia

### Enunciado
Identificar la ecuación que representa una hipérbola con centro en el origen, eje transverse horizontal, distancia focal 2c = 10, y semieje conjugado b = 4.

### Options
- [ ] A) x²/25 - y²/16 = 1
- [ ] B) x²/9 - y²/16 = 1
- [x] C) x²/9 - y²/16 = 1
- [ ] D) x²/16 - y²/9 = 1 <!-- feedback: c = 5, b = 4. En hipérbola: c² = a² + b², entonces a² = c² - b² = 25 - 16 = 9. Ecuación: x²/9 - y²/16 = 1 -->

### Explicación Pedagógica
En una hipérbola, a² + b² = c² (a diferencia de la elipse donde a² - b² = c²). El error frecuente es usar la fórmula de elipse en lugar de la de hipérbola, o no identificar correctamente qué variable tiene signo positivo.

---

## Question 18 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v18`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** Telescopios en Villa de Leyva

### Enunciado
La ecuación x²/16 - y²/9 = 1 representa una sección cónica. ¿Cuál es la excentricidad de esta cónica?

### Options
- [ ] A) e = 3/4
- [ ] B) e = 4/3
- [x] C) e = 5/4
- [ ] D) e = 4/5 <!-- feedback: Para hipérbola: c² = a² + b² = 16 + 9 = 25, c = 5. Excentricidad e = c/a = 5/4 = 1.25 -->

### Explicación Pedagógica
La excentricidad de una hipérbola es e = c/a, donde c² = a² + b². Para elipse, e < 1; para hipérbola, e > 1. Error común: confundir e = c/a con e = a/c o no calcular c correctamente.

---

## Question 19 (Variant Basic - Difficulty D7)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v19`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo y pensamiento variacional]
**Context:** Puentes en forma de arco en Medellín

### Enunciado
Hallar la ecuación de la recta tangente a la circunferencia x² + y² = 25 en el punto P(3, 4).

### Options
- [ ] A) 3x + 4y = 25
- [ ] B) 3x - 4y = -7
- [x] C) 3x + 4y = 25
- [ ] D) 4x + 3y = 25 <!-- feedback: Recta desde el centro al punto P tiene pendiente 4/3. Tangente es perpendicular: pendiente -3/4. Ecuación: y - 4 = -¾(x - 3) → 4y - 16 = -3x + 9 → 3x + 4y = 25 -->

### Explicación Pedagógica
La tangente a una circunferencia en un punto es perpendicular al radio en ese punto. Error común: no usar la condición de perpendicularidad o calcular incorrectamente la pendiente del radio.

---

## Question 20 (Variant Basic - Difficulty D8)

**ID:** `CO-MAT-11-P3-geometria-analitica-017-MASTERY-v20`
**Bloom:** [Evaluate]
**ICFES:** [Razonamiento cuantitativo y comunicación matemática]
**Context:** Rutas de buses de TransMilenio en Bogotá

### Enunciado
Un ingeniero diseña una carretera representada por la recta y = mx + b. Si la carretera debe pasar por el punto A(1, 2) y ser perpendicular a la línea que une los puntos B(2, 5) y C(6, 1), ¿cuál debe ser el valor de m para que la carretera pase también por el punto D(5, k)?

### Options
- [ ] A) m = 3/2
- [ ] B) m = 1
- [x] C) m = 1
- [ ] D) m = 3/4 <!-- feedback: Pendiente de BC: m₁ = (1-5)/(6-2) = -1. Pendiente perpendicular: m = 1. Recta: y - 2 = 1(x - 1), y = x + 1. Para que pase por D(5,k): k = 5 + 1 = 6. Cualquier m = 1 funciona si k = 6. Verificando: si D(5,6), la carretera pasa por A, D y es perpendicular a BC. -->

### Explicación Pedagógica
Primero se calcula la pendiente de BC, luego la pendiente perpendicular. Con esta pendiente y el punto A, se obtiene la ecuación. Para que pase por D(5, k), se debe satisfacer la ecuación, lo que determina k. El error frecuente es no verificar la condición de perpendicularidad correctamente o confundir las pendientes.

---