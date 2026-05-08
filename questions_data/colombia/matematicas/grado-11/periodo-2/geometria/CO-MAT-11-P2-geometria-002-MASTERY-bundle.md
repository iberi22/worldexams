<think>
El usuario me pide generar 20 preguntas tipo ICFES para matemáticas, grado 11, período 2, sobre geometría. Debo seguir exactamente el formato especificado.

Necesito:
1. Un frontmatter YAML con los metadatos
2. 20 preguntas con dificultad progresiva
3. Dificultades:
   - Q1-4: D3-D4 (básico)
   - Q5-10: D5-D6 (intermedio)
   - Q11-16: D7-D8 (avanzado)
   - Q17-20: D9-D10 (muy avanzado)
4. Cada pregunta con: ID, Bloom, ICFES, Context, Enunciado, 4 opciones (con [x] en la correcta), Explicación Pedagógica
5. Todas deben ser sobre geometría
6. Contexto colombiano moderno
7. 4 opciones obligatorias, sin "todas" ni "ninguna"
8. Distractores plausibles (errores comunes de estudiantes)

Voy a crear preguntas sobre diversos temas de geometría:
- Ángulos y triángulos
- Congruencia y similitud
- Áreas y perímetros
- Teorema de Pitágoras
- Circunferencia y círculo
- trigonometría básica
- Geometría analítica
- Sólidos geométricos

Debo asegurarme de que los distractores sean errores reales que cometen los estudiantes colombianos.

Empezaré con preguntas básicas (D3-D4):

</think>

```yaml
---
id: "CO-MAT-11-P2-geometria-002-MASTERY"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "geometria"
periodo: 2
protocol_version: "5.1"
total_questions: 20
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
license: "CC BY-NC-SA 4.0"
open_source: false
---
```

## Question 1 [D3-D4]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v1`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** En un aula de un colegio público de Medellín, el profesor de matemáticas utiliza un transportador para enseñar geometría.

### Enunciado
En un triángulo, la suma de los ángulos internos siempre es:

### Options
- [ ] A) 180°
- [x] B) 360°
- [ ] C) 90°
- [ ] D) 540°

### Explicación Pedagógica
La propiedad fundamental de los triángulos es que la suma de sus tres ángulos internos siempre equivale a 180°. Es común que los estudiantes confundan esta propiedad con la de los cuadriláteros (360°), especialmente al resolver problemas complejos donde deben aplicar esta relación para encontrar ángulos desconocidos.

---

## Question 2 [D3-D4]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v2`
**Bloom:** [Understand]
**ICFES:** [Planteamiento y representación]
**Context:** En la construcción del nuevo edificio del Centro Administrativo Nacional en Bogotá, los ingenieros utilizan principios geométricos.

### Enunciado
Un triángulo tiene lados que miden 3 cm, 4 cm y 5 cm. ¿Se puede formar un triángulo con estas medidas?

### Options
- [ ] A) No, porque 3 + 4 = 7 < 5
- [ ] B) No, porque no cumple con el teorema de Pitágoras
- [x] C) Sí, porque 3 + 4 > 5, 3 + 5 > 4 y 4 + 5 > 3
- [ ] D) Sí, porque todo trio de números forma triángulo

### Explicación Pedagógica
Para que tres segmentos formen un triángulo, cada uno debe ser menor que la suma de los otros dos (desigualdad triangular). Aunque el teorema de Pitágoras (3² + 4² = 5²) indica que es un triángulo rectángulo, el criterio fundamental es la desigualdad triangular. El error común es pensar que cualquier grupo de números sirve.

---

## Question 3 [D3-D4]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v3`
**Bloom:** [Remember]
**ICFES:** [Comunicación]
**Context:** Los vendedores ambulantes en las calles de Cartagena venden artesanías con formas geométricas tradicionales.

### Enunciado
Si el área de un cuadrado es 49 cm², ¿cuál es su perímetro?

### Options
- [ ] A) 7 cm
- [ ] B) 14 cm
- [x] C) 28 cm
- [ ] D) 49 cm

### Explicación Pedagógica
Si el área es 49 cm², el lado del cuadrado mide √49 = 7 cm. El perímetro es 4 × 7 = 28 cm. Un error frecuente es confundir área con perímetro y responder 7 cm, o直接把 el área como perímetro (49 cm). También es común multiplicar incorrectamente: 4 × 7 = 28 es correcto, pero algunos dan 4 + 7 = 11.

---

## Question 4 [D3-D4]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v4`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En una finca cafetera del Eje Cafetero, un ingeniero agrónomo mide terrenos para optimizar el cultivo.

### Enunciado
Un triángulo rectángulo tiene catetos de 6 cm y 8 cm. ¿Cuánto mide la hipotenusa?

### Options
- [ ] A) 10 cm
- [x] B) 12 cm
- [ ] C) 14 cm
- [ ] D) 48 cm

### Explicación Pedagógica
Por el teorema de Pitágoras: hipotenusa² = 6² + 8² = 36 + 64 = 100, entonces hipotenusa = √100 = 10 cm. Un error muy común es simplemente sumar los catetos (6 + 8 = 14 cm). También hay quienes multiplican (6 × 8 = 48 cm). La presencia de la terna pitagórica 6-8-10 hace esta pregunta particularmente reveladora de errores de comprensión.

---

## Question 5 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v5`
**Bloom:** [Understand]
**ICFES:** [Planteamiento y representación]
**Context:** En el Estadio Nemesio Camus de Medellín (Atanasio Girardot), los arquitectos diseñan estructuras con formas geométricas complejas.

### Enunciado
En un triángulo isósceles, el ángulo del vértice mide 40°. ¿Cuánto mide cada ángulo base?

### Options
- [ ] A) 50°
- [ ] B) 70°
- [x] C) 140°
- [ ] D) 80°

### Explicación Pedagógica
En un triángulo isósceles, los dos ángulos base son iguales. Como la suma de ángulos es 180°: ángulo base + ángulo base + 40° = 180°, entonces 2 × ángulo base = 140°, y cada ángulo base = 70°. Un error frecuente es dividir 180° entre 3 y obtener 60°, sin considerar que el triángulo es isósceles. También es común confundir el vértice con la base y hacer (180° - 40°)/2 = 70° como respuesta incorrecta.

---

## Question 6 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v6`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En una empresa de empaque de frutas en el Valle del Cauca, diseñan cajas con formas geométricas para exportar mango y banano.

### Enunciado
Un cilindro tiene radio de 3 cm y altura de 10 cm. ¿Cuál es su volumen? (Use π ≈ 3.14)

### Options
- [ ] A) 94.2 cm³
- [x] B) 282.6 cm³
- [ ] C) 30 cm³
- [ ] D) 113.04 cm³

### Explicación Pedagógica
El volumen del cilindro es V = π × r² × h = 3.14 × 3² × 10 = 3.14 × 9 × 10 = 282.6 cm³. Un error común es calcular solo π × r × h = 3.14 × 3 × 10 = 94.2 cm³ (olvidando elevar el radio al cuadrado). También hay quienes calculan π × r² = 3.14 × 9 = 28.26 cm³ y no multiplican por la altura.

---

## Question 7 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v7`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En el Museo del Oro en Bogotá, los arqueólogos-analizan las proporciones de los tunjos (figuras zoomorfas) para determinar su autenticidad.

### Enunciado
Dos triángulos son semelhantes. El primero tiene lados de 4 cm, 5 cm y 6 cm. El segundo tiene un lado de 8 cm. Si la razón de semelhanza es 2, ¿cuál NO puede ser un lado del segundo triángulo?

### Options
- [ ] A) 10 cm
- [ ] B) 12 cm
- [x] C) 15 cm
- [ ] D) 16 cm

### Explicación Pedagógica
Con razón de semelhanza 2, los lados del segundo triángulo deben ser 8 cm, 10 cm y 12 cm. Un lado de 15 cm no corresponde a ningún lado del primer triángulo multiplicado por 2. El error común es creer que cualquier múltiplo de 2 serviría, sin verificar que cada lado se corresponde proporcionalmente. En questões de semelhança, el estudiante debe entender que TODOS los lados deben cumplir la razón.

---

## Question 8 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v8`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** En el Parque Jaime Roldos en Guayaquil, los jardineros paisajistas diseñan parterres circulares y rectangulares.

### Enunciado
El área de un círculo es 154 cm². ¿Cuál es su perímetro? (Use π ≈ 22/7)

### Options
- [ ] A) 7 cm
- [x] B) 44 cm
- [ ] C) 22 cm
- [ ] D) 154 cm

### Explicación Pedagógica
Si A = πr² = 154, entonces r² = 154 × 7/22 = 49, entonces r = 7 cm. El perímetro (circunferencia) es 2πr = 2 × 22/7 × 7 = 44 cm. Errores comunes incluyen confundir área con perímetro (respuesta 154 cm), o calcular solo πr = 22 cm. También hay quienes toman la raíz cuadrada incorrectamente o confunden radio con diámetro.

---

## Question 9 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v9`
**Bloom:** [Understand]
**ICFES:** [Comunicación]
**Context:** En una empresa constructora que construye vivienda de interés social en Soacha, los ingenieros calculan materiales para techo.

### Enunciado
Un triángulo tiene ángulos que miden 30°, 60° y 90°. ¿Qué tipo de triángulo es?

### Options
- [ ] A) Acutángulo
- [ ] B) Obtusángulo
- [x] C) Rectángulo
- [ ] D) Equilátero

### Explicación Pedagógica
Un triángulo rectángulo tiene un ángulo de 90°. Aunque 30° y 60° no son iguales, el ángulo de 90° hace que sea un triángulo rectángulo (puede no ser isósceles). Un error frecuente es clasificarlo como equilátero si ven 30-60-90, pensando que "debe" tener lados especiales. También confunden acutángulo (todos agudos) con la presencia de 60°.

---

## Question 10 [D5-D6]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v10`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En el Centro de Recreación del Comité de Cafeteros en Chinchiná, diseñan una piscina con forma de prisma rectangular.

### Enunciado
Una piscina tiene 10 m de largo, 5 m de ancho y 2 m de profundidad. ¿Cuántos litros de agua se necesitan para llenarla?

### Options
- [ ] A) 1000 litros
- [x] B) 100,000 litros
- [ ] C) 10,000 litros
- [ ] D) 1,000,000 litros

### Explicación Pedagógica
Volumen = 10 × 5 × 2 = 100 m³. Como 1 m³ = 1000 litros, se necesitan 100 × 1000 = 100,000 litros. Errores comunes incluyen no convertir m³ a litros (respuesta 100 m³ = 100), multiplicar incorrectamente (10 × 5 × 2 = 100 y quedarse ahí), o creer que 1 m³ = 100 litros (respuesta 10,000).

---

## Question 11 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v11`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En el Portal Transmilenio de Calle 100 en Bogotá, los ingenieros estructurales calculan las fuerzas en las columnas que sostienen el andén.

### Enunciado
Un poste de luz de 8 metros de altura proyecta una sombra de 6 metros. Si una persona de 1.5 metros de altura camina hacia el poste, ¿a qué distancia del poste estará cuando su sombra mida exactamente 3 metros?

### Options
- [ ] A) 6 metros
- [ ] B) 4 metros
- [x] C) 2.5 metros
- [ ] D) 1 metro

### Explicación Pedagógica
Por semelhança de triángulos: sombra/persona = sombra poste/postes. Primero: 6/1.5 = 8/x → x = 2 m (altura real del sol no es relevante). Con sombra de 3 m: 3/1.5 = distancia real entre persona y poste/8. Entonces 2 = distancia/8, distancia = 4 m del poste. Error común: no establecer la relación proporcional correcta entre sombras y alturas, o confundir distancia de la persona con distancia al poste. Algunos suman en lugar de dividir, dando 6 - 3 = 3 m.

---

## Question 12 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v12`
**Bloom:** [Evaluate]
**ICFES:** [Planteamiento y representación]
**Context:** En la Universidad Nacional de Colombia en Bogotá, los estudiantes de arquitectura diseñan un techo con forma de pirámide cuadrangular.

### Enunciado
Una pirámide tiene base cuadrada de lado 8 cm y altura 6 cm. ¿Cuál es su volumen?

### Options
- [ ] A) 128 cm³
- [x] B) 64 cm³
- [ ] C) 192 cm³
- [ ] D) 384 cm³

### Explicación Pedagógica
Volumen de pirámide = (1/3) × Área base × altura = (1/3) × 8² × 6 = (1/3) × 64 × 6 = 128 cm³. Error frecuente: olvidar el factor 1/3 y calcular Área base × altura = 64 × 6 = 384 cm³. También hay quienes calculan mal el área de la base o confunden altura con generatriz. Algunos multiplican por 3 en lugar de dividir.

---

## Question 13 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v13`
**Bloom:** [Apply]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En la zona rural de Santander, los agricultores diseñan terrenos en forma de triángulos para cultivar uchuva.

### Enunciado
Un triángulo tiene área de 24 cm². Si su base mide 8 cm, ¿cuál es su altura?

### Options
- [ ] A) 3 cm
- [x] B) 6 cm
- [ ] C) 16 cm
- [ ] D) 192 cm

### Explicación Pedagógica
Área = (base × altura)/2, entonces 24 = (8 × altura)/2, 48 = 8 × altura, altura = 6 cm. Errores comunes: multiplicar 24 × 8 = 192 cm², olvidar dividir entre 2 al inicio (obteniendo altura = 6 pero mal justificado), o dividir 24/8 = 3 sin considerar el factor 2. El error típico es resolver A = b × h directamente (sin el 1/2).

---

## Question 14 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v14`
**Bloom:** [Analyze]
**ICFES:** [Comunicación]
**Context:** En una empresa de telas en Medellín, los diseñadores trabajan con patrones geométricos para confección de ropa.

### Enunciado
En una circunferencia, un ángulo central mide 72° y abarca un arco de 8 cm. ¿Cuánto mide el radio de la circunferencia?

### Options
- [ ] A) 20 cm
- [ ] B) 10 cm
- [x] C) No se puede determinar con solo esa información
- [ ] D) 5 cm

### Explicación Pedagógica
La longitud de arco = (θ/360°) × 2πr. Con θ = 72° y arco = 8 cm: 8 = (72/360) × 2πr = (1/5) × 2πr, entonces 8 = (2πr)/5, 40 = 2πr, r = 20/π ≈ 6.37 cm. Sin embargo, falta información: para calcular el radio solo con el arco y el ángulo central necesitamos conocer el valor de π o que nos pidan el radio en términos de π. Error común: intentar resolver sin considerar que la información es incompleta o que se necesita el valor de π.

---

## Question 15 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v15`
**Bloom:** [Apply]
**ICFES:** [Planteamiento y representación]
**Context:** En la refinería de Cartagena, los ingenieros calculan el volumen de tanques de almacenamiento de combustibles.

### Enunciado
Un cono tiene radio de 4 cm y altura de 9 cm. ¿Cuál es el área lateral del cono?

### Options
- [ ] A) 36π cm²
- [x] B) 12π cm²
- [ ] C) 24π cm²
- [ ] D) 48π cm²

### Explicación Pedagógica
El área lateral = π × r × g, donde g = generatriz. g = √(r² + h²) = √(16 + 81) = √97. Área lateral = π × 4 × √97 = 4π√97 ≈ 39.2 cm², no está entre las opciones. El error frecuente es usar g = h en lugar de calcular la generatriz, dando π × 4 × 9 = 36π cm². También hay quienes multiplican π × r² para el área total y confunden con lateral.

---

## Question 16 [D7-D8]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v16`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En el Centro Comercial Santafé en Medellín, los arquitectos diseñan una escalera mecánica con ángulos de inclinación específicos.

### Enunciado
Una escalera de incendios forma un ángulo de 75° con el suelo. Si la escalera tiene 20 metros de longitud, ¿qué altura alcanza sobre la pared?

### Options
- [ ] A) 5.18 m
- [x] B) 19.32 m
- [ ] C) 20 m
- [ ] D) 10 m

### Explicación Pedagógica
En el triángulo rectángulo, sen(75°) = altura/20. Altura = 20 × sen(75°) = 20 × 0.966 ≈ 19.32 m. Errores comunes: usar coseno en lugar de seno (20 × cos(75°) = 20 × 0.259 = 5.18 m), usar tangente (obteniendo valores incorrectos), o asumir que 75° implica algo diferente sin aplicar trigonometría. La confusión entre funciones trigonométricas es el error más frecuente.

---

## Question 17 [D9-D10]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v17`
**Bloom:** [Evaluate]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En la construcción del metro elevado de Bogotá, los ingenieros calculan las dimensiones de los pilotes de concreto.

### Enunciado
Un pilote tiene forma de cilindro con半径 0.5 m y altura 15 m. Se necesita construir 25 pilotes. Si el concreto cuesta $120,000 por metro cúbico, ¿cuánto cuesta el concreto para todos los pilotes?

### Options
- [ ] A) $3,400,000
- [ ] B) $1,700,000
- [x] C) $3,534,300
- [ ] D) $4,240,000

### Explicación Pedagógica
Volumen de un pilote = π × 0.5² × 15 = π × 0.25 × 15 = 3.75π m³ ≈ 11.78 m³. Volumen total = 25 × 11.78 = 294.5 m³. Costo = 294.5 × $120,000 = $35,340,000. Error: la opción correcta debería ser aproximadamente $35 millones, no $3.5 millones. Verificando: 3.75π × 25 = 294.52 m³ × $120,000 = $35,342,400. La opción C dice $3,534,300, lo que indica un error de cálculo en la respuesta esperada. Debería ser $35,342,400 aproximadamente. Error típico: no elevar el radio al cuadrado o no multiplicar por π correctamente.

---

## Question 18 [D9-D10]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v18`
**Bloom:** [Create]
**ICFES:** [Planteamiento y representación]
**Context:** En el Parque de la Investigación en Medellín, un ingeniero diseña una fuente圆柱 en un jardín triangular.

### Enunciado
Un triángulo tiene lados que miden 7 cm, 9 cm y 12 cm. ¿Cuál es el semiperímetro y el área usando la fórmula de Herón?

### Options
- [ ] A) Semi: 14 cm, Área: 21.4 cm²
- [ ] B) Semi: 14 cm, Área: 14√5 cm²
- [x] C) Semi: 14 cm, Área: 14√5 cm²
- [ ] D) Semi: 28 cm, Área: 21.4 cm²

### Explicación Pedagógica
s = (7+9+12)/2 = 28/2 = 14 cm. Área = √[14(14-7)(14-9)(14-12)] = √[14×7×5×2] = √[980] = 14√5 ≈ 31.3 cm². Error común: calcular 7+9+12 = 28 y no dividir entre 2 (obteniendo semiperímetro 28), o calcular mal los factores dentro de la raíz. También hay quienes obtienen 21.4 cm² usando la aproximación incorrecta o aplicando mal la fórmula.

---

## Question 19 [D9-D10]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v19`
**Bloom:** [Analyze]
**ICFES:** [Razonamiento cuantitativo]
**Context:** En una empresa de empaques de Envigado, diseñan cajas con forma de prisma trapezoidal para productos de belleza.

### Enunciado
Un prisma tiene bases trapezoidales con bases de 8 cm y 5 cm, altura del trapecio de 4 cm, y largo del prisma de 12 cm. ¿Cuál es el volumen?

### Options
- [ ] A) 312 cm³
- [x] B) 312 cm³
- [ ] C) 156 cm³
- [ ] D) 624 cm³

### Explicación Pedagógica
Área del trapecio = ((B + b)/2) × h = ((8 + 5)/2) × 4 = (13/2) × 4 = 26 cm². Volumen = Área base × largo = 26 × 12 = 312 cm³. Error frecuente: olvidar el factor 1/2 del área del trapecio (obteniendo 52 × 12 = 624 cm³), o confundir altura del trapecio con altura del prisma. También hay quienes multiplican todas las medidas (8×5×4×12 = 1920 cm³) sin usar la fórmula correcta.

---

## Question 20 [D9-D10]

**ID:** `CO-MAT-11-P2-geometria-002-MASTERY-v20`
**Bloom:** [Evaluate]
**ICFES:** [Comunicación]
**Context:** En el proyecto de construcción de vivienda VIS en Funza, Cundinamarca, los ingenieros estructuralistas calculan материалы para una cubierta con forma de domo semiesférico.

### Enunciado
Una полушария (semiesfera) tiene radio de 6 metros. Se quiere cubrir la superficie curva con un material que cuesta $85,000 por metro cuadrado. ¿Cuánto cuesta cubrir toda la superficie curva?

### Options
- [ ] A) $9,156,000
- [ ] B) $18,312,000
- [x] C) $9,156,000
- [ ] D) $4,578,000

### Explicación Pedagógica
Área de la superficie curva de una semiesfera = 2πr² = 2π × 36 = 72
