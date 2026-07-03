---
id: "EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle"
country: "ecuador"
grado: 11
asignatura: "matematicas"
tema: "problemas-de-optimizacion"
periodo: "weekly"
week: "W15"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bases Curriculares Ecuador + BGU"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# MASTERY Bundle — Problemas de Optimización (W15)

## Bloque A — Nivel D3–D4: Fundamentos de Optimización y Modelado Simple

---

## Question 1 [D3]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.90
**Contexto:** Un administrador de un mercado en Quito desea entender el objetivo de la optimización matemática.

### Enunciado
En el contexto del cálculo diferencial, ¿qué significa optimizar una función?

### Opciones
- [ ] A) Encontrar todos los puntos donde la función cruza el eje x.
  <!-- feedback: Incorrecto. Eso es buscar raíces. -->
- [x] B) Determinar los valores máximos o mínimos de una función bajo ciertas condiciones.
  <!-- feedback: Correcto. La optimización busca el "mejor" valor (máximo beneficio, mínimo costo, etc.). -->
- [ ] C) Simplificar la expresión algebraica de la función.
  <!-- feedback: Incorrecto. Eso es simplificación algebraica, no optimización funcional. -->
- [ ] D) Calcular el área total encerrada por la gráfica de la función.
  <!-- feedback: Incorrecto. Eso corresponde a la integración. -->

### Explicacion Pedagogica
La optimización es la aplicación práctica de los extremos locales y globales para resolver problemas de eficiencia en diversos campos.

---

## Question 2 [D3]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.85
**Contexto:** Pasos para resolver problemas de optimización.

### Enunciado
Al resolver un problema de optimización, ¿cuál es el propósito de la "función objetivo"?

### Opciones
- [x] A) Es la magnitud que se desea maximizar o minimizar.
  <!-- feedback: Correcto. Es la función principal sobre la cual aplicaremos la derivada para hallar sus extremos. -->
- [ ] B) Es la restricción que limita los valores de las variables.
  <!-- feedback: Incorrecto. Eso se llama ecuación de restricción o ligadura. -->
- [ ] C) Es la derivada de la función original.
  <!-- feedback: Incorrecto. La derivada es una herramienta, no la función objetivo en sí. -->
- [ ] D) Es el intervalo de valores permitidos para la variable independiente.
  <!-- feedback: Incorrecto. Eso es el dominio del problema. -->

### Explicacion Pedagogica
Identificar la función objetivo es el paso crítico para traducir un problema verbal a un modelo matemático de optimización.

---

## Question 3 [D4]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v3
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.80
**Contexto:** Un agricultor en Ibarra tiene 40 metros de malla para cercar un huerto rectangular aprovechando una pared existente (solo necesita cercar tres lados).

### Enunciado
Si $x$ es el ancho de los dos lados perpendiculares a la pared, ¿cuál es la expresión para el área $A$ del huerto?

### Opciones
- [ ] A) $A = x(40 - x)$
  <!-- feedback: Incorrecto. No consideró que hay dos anchos $x$. -->
- [x] B) $A = x(40 - 2x)$
  <!-- feedback: Correcto. El largo es $40 - 2x$. El área es ancho por largo: $x(40-2x)$. -->
- [ ] C) $A = 2x + 2y$
  <!-- feedback: Incorrecto. Esta es la fórmula del perímetro, no del área. -->
- [ ] D) $A = x^2$
  <!-- feedback: Incorrecto. Esto asume un huerto cuadrado sin considerar la restricción de la malla. -->

### Explicacion Pedagogica
Modelado de funciones de área sujetas a restricciones de perímetro en contextos de producción agrícola.

---

## Question 4 [D4]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.75
**Contexto:** Optimización de números. Se buscan dos números positivos cuya suma sea 20 y cuyo producto sea máximo.

### Enunciado
¿Cuáles son esos dos números?

### Opciones
- [ ] A) 5 y 15
  <!-- feedback: Incorrecto. Su producto es 75. -->
- [x] B) 10 y 10
  <!-- feedback: Correcto. $P(x) = x(20-x) = 20x - x^2$. $P'(x) = 20 - 2x = 0 \Rightarrow x = 10$. El otro número es $20-10=10$. -->
- [ ] C) 8 y 12
  <!-- feedback: Incorrecto. Su producto es 96. -->
- [ ] D) 1 y 19
  <!-- feedback: Incorrecto. Su producto es el mínimo posible para números enteros en este rango. -->

### Explicacion Pedagogica
Demostración de que para una suma constante, el producto máximo se alcanza cuando los sumandos son iguales (un cuadrado en términos geométricos).

---

## Bloque B — Nivel D5–D6: Optimización Geométrica y de Costos

---

## Question 5 [D5]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.70
**Contexto:** Un fabricante de cajas en Guayaquil desea construir una caja abierta a partir de una lámina cuadrada de 12 cm de lado, cortando cuadrados iguales de lado $x$ en las esquinas.

### Enunciado
Determine el valor de $x$ que maximiza el volumen de la caja.

### Opciones
- [ ] A) $x = 3$ cm
  <!-- feedback: Incorrecto. Este valor anula la derivada pero resulta en un volumen menor o es un extremo del dominio. -->
- [x] B) $x = 2$ cm
  <!-- feedback: Correcto. $V(x) = x(12-2x)^2 = 4x^3 - 48x^2 + 144x$. $V'(x) = 12x^2 - 96x + 144 = 0$. Dividiendo por 12: $x^2 - 8x + 12 = 0 \Rightarrow (x-2)(x-6)=0$. Como $x<6$, la respuesta es 2. -->
- [ ] C) $x = 4$ cm
  <!-- feedback: Incorrecto. En $x=4$, el volumen es menor que en $x=2$. -->
- [ ] D) $x = 1$ cm
  <!-- feedback: Incorrecto. El volumen es positivo pero no es el máximo. -->

### Explicacion Pedagogica
Resolución del clásico problema de la caja de cartón aplicando el análisis de puntos críticos de un polinomio de tercer grado.

---

## Question 6 [D5]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.65
**Contexto:** Minimizando el costo de materiales. Una lata cilíndrica debe contener un volumen de $500$ cm³. El costo del material es el mismo para la base, la tapa y el lateral.

### Enunciado
¿Cuál es la relación entre la altura $h$ y el radio $r$ que minimiza el área superficial total (y por tanto el costo)?

### Opciones
- [ ] A) $h = r$
  <!-- feedback: Incorrecto. Esta relación no es óptima para cilindros con tapa. -->
- [x] B) $h = 2r$
  <!-- feedback: Correcto. Para un volumen dado, el área superficial de un cilindro cerrado se minimiza cuando el diámetro es igual a la altura ($2r = h$). -->
- [ ] C) $h = 4r$
  <!-- feedback: Incorrecto. Resulta en una lata muy delgada y alta con exceso de área lateral. -->
- [ ] D) $h = \pi r$
  <!-- feedback: Incorrecto. Valor sin fundamento matemático en este problema de optimización. -->

### Explicacion Pedagogica
Determinación de proporciones óptimas en envases industriales para reducir el desperdicio de materia prima.

---

## Question 7 [D6]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Una empresa de logística en Manta quiere minimizar el tiempo de viaje. Un repartidor debe ir de un punto A en la playa a un punto B en el mar. Corre a 5 m/s en la arena y nada a 3 m/s en el agua.

### Enunciado
¿Qué principio de la física se aplica para resolver este problema de optimización del tiempo?

### Opciones
- [ ] A) Ley de Gravitación Universal.
  <!-- feedback: Incorrecto. No hay relación con fuerzas gravitatorias. -->
- [x] B) Ley de Snell (o principio de tiempo mínimo).
  <!-- feedback: Correcto. Aunque es un problema de cálculo, el resultado coincide con la refracción de la luz que busca el camino de menor tiempo. -->
- [ ] C) Tercera Ley de Newton.
  <!-- feedback: Incorrecto. Relacionada con acción y reacción, no con optimización de rutas. -->
- [ ] D) Principio de Arquímedes.
  <!-- feedback: Incorrecto. Relacionado con flotabilidad, no con velocidad de desplazamiento. -->

### Explicacion Pedagogica
Conexión entre problemas de optimización de trayectorias y leyes fundamentales de la óptica y la cinemática.

---

## Question 8 [D6]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.60
**Contexto:** Maximización de ingresos. Un teatro en Quito tiene capacidad para 500 personas. Si la entrada cuesta $20, se llena. Por cada $1 de aumento en el precio, se pierden 10 espectadores.

### Enunciado
¿Cuál es el precio de la entrada que maximiza el ingreso total?

### Opciones
- [ ] A) $25
  <!-- feedback: Incorrecto. Ingreso: $25 \cdot 450 = 11250$. -->
- [ ] B) $30
  <!-- feedback: Incorrecto. Ingreso: $30 \cdot 400 = 12000$. -->
- [x] C) $35
  <!-- feedback: Correcto. Ingreso $I(x) = (20+x)(500-10x) = 10000 + 300x - 10x^2$. Derivada: $300 - 20x = 0 \Rightarrow x = 15$. Precio: $20+15 = 35$. -->
- [ ] D) $40
  <!-- feedback: Incorrecto. Ingreso: $40 \cdot 300 = 12000$. Es menor que el máximo. -->

### Explicacion Pedagogica
Aplicación del cálculo para encontrar el punto de equilibrio entre el precio unitario y la demanda para maximizar la recaudación.

---

## Question 9 [D6]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Un cable de electricidad debe conectar una planta en la orilla de un río de 300 m de ancho con una ciudad ubicada 800 m río abajo en la otra orilla. El costo por tierra es menor que por agua.

### Enunciado
¿Cuál es la variable que generalmente se utiliza para modelar este problema de costo mínimo?

### Opciones
- [x] A) La distancia desde el punto directamente opuesto a la planta hasta donde el cable sale del agua.
  <!-- feedback: Correcto. Esta distancia $x$ permite definir el tramo hipotenusa (agua) y el tramo lineal (tierra). -->
- [ ] B) La profundidad del río en el centro.
  <!-- feedback: Incorrecto. No afecta la longitud del cable en un modelo 2D estándar. -->
- [ ] C) La corriente del río en m/s.
  <!-- feedback: Incorrecto. Es un problema de geometría y costos, no de dinámica de fluidos. -->
- [ ] D) El grosor del cable.
  <!-- feedback: Incorrecto. Se asume constante para el cálculo de la trayectoria óptima. -->

### Explicacion Pedagogica
Estructuración de modelos de optimización para infraestructura utilizando el Teorema de Pitágoras y funciones de costo por tramos.

---

## Question 10 [D6]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.55
**Contexto:** Perímetro mínimo para un área dada. Se desea diseñar un jardín rectangular de 36 m² de área en un parque de Cuenca.

### Enunciado
¿Cuáles deben ser las dimensiones para que la cantidad de cerca necesaria sea mínima?

### Opciones
- [ ] A) 4 m y 9 m
  <!-- feedback: Incorrecto. Perímetro: $2(4+9) = 26$ m. -->
- [x] B) 6 m y 6 m
  <!-- feedback: Correcto. Para un área fija, el rectángulo de perímetro mínimo es el cuadrado. $\sqrt{36} = 6$. Perímetro: $24$ m. -->
- [ ] C) 3 m y 12 m
  <!-- feedback: Incorrecto. Perímetro: $2(3+12) = 30$ m. -->
- [ ] D) 2 m y 18 m
  <!-- feedback: Incorrecto. Perímetro: $2(2+18) = 40$ m. -->

### Explicacion Pedagogica
Deducción de que el cuadrado es el polígono de cuatro lados más eficiente en términos de relación área/perímetro.

---

## Bloque C — Nivel D7–D8: Optimización Avanzada y Análisis de Restricciones

---

## Question 11 [D7]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Un rectángulo está inscrito en un triángulo rectángulo con catetos de 3 y 4 unidades. Dos lados del rectángulo están sobre los catetos.

### Enunciado
¿Cuál es el área máxima que puede tener dicho rectángulo?

### Opciones
- [ ] A) 6 unidades²
  <!-- feedback: Incorrecto. Esta es el área del triángulo completo. -->
- [x] B) 3 unidades²
  <!-- feedback: Correcto. El área máxima de un rectángulo inscrito en un triángulo es siempre la mitad del área del triángulo: $(3 \cdot 4 / 2) / 2 = 3$. -->
- [ ] C) 4 unidades²
  <!-- feedback: Incorrecto. Excede el límite de optimización para este caso. -->
- [ ] D) 2 unidades²
  <!-- feedback: Incorrecto. Se puede lograr un área mayor con las dimensiones adecuadas. -->

### Explicacion Pedagogica
Uso de la semejanza de triángulos para establecer la relación entre las variables del rectángulo inscrito.

---

## Question 12 [D7]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v12
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.50
**Contexto:** Un envase de cartón para leche en Ambato debe tener capacidad de 1 litro ($1000$ cm³). Su base es cuadrada de lado $x$. El costo del material de la base y tapa es el doble que el de las paredes laterales.

### Enunciado
¿Cuál es la función de costo $C(x)$ a minimizar? (Use $k$ como el costo unitario del material lateral).

### Opciones
- [ ] A) $C(x) = k(x^2 + 4xh)$
  <!-- feedback: Incorrecto. No consideró que la base y tapa son más caras. -->
- [x] B) $C(x) = k(4x^2 + \frac{4000}{x})$
  <!-- feedback: Correcto. Costo base/tapa: $2x^2 \cdot 2k = 4kx^2$. Costo lateral: $4xh \cdot k$. Como $V = x^2h = 1000 \Rightarrow h = 1000/x^2$. Costo lateral: $4k(1000/x) = 4000k/x$. -->
- [ ] C) $C(x) = k(2x^2 + 4000/x)$
  <!-- feedback: Incorrecto. Error en la ponderación del costo de las tapas. -->
- [ ] D) $C(x) = k(x^2 + 1000/x)$
  <!-- feedback: Incorrecto. Modelo de costo incompleto. -->

### Explicacion Pedagogica
Modelado de problemas de optimización con costos diferenciados por tipo de superficie, común en ingeniería de empaques.

---

## Question 13 [D7]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Distancia mínima a una curva. Queremos encontrar el punto sobre la parábola $y = x^2$ que está más cerca del punto $(0, 5)$.

### Enunciado
¿Qué función es más conveniente minimizar para simplificar los cálculos?

### Opciones
- [ ] A) La función de la parábola $y = x^2$.
  <!-- feedback: Incorrecto. Esta función define la restricción, no el objetivo. -->
- [x] B) El cuadrado de la distancia: $D^2 = (x-0)^2 + (y-5)^2$.
  <!-- feedback: Correcto. Minimizar el cuadrado de la distancia es equivalente a minimizar la distancia y evita trabajar con raíces cuadradas en la derivada. -->
- [ ] C) La pendiente de la recta normal a la curva.
  <!-- feedback: Incorrecto. Aunque se puede usar para hallar el punto, no es la función objetivo primaria. -->
- [ ] D) La suma de las coordenadas $x+y$.
  <!-- feedback: Incorrecto. Esto no representa la distancia geométrica. -->

### Explicacion Pedagogica
Técnica de simplificación de funciones objetivo (uso del cuadrado de la distancia) para agilizar la resolución de problemas geométricos.

---

## Question 14 [D8]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v14
**Bloom:** Apply
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.45
**Contexto:** Un canal de agua en la provincia de Loja tiene una sección transversal en forma de trapecio isósceles. El fondo y los lados miden 2 metros cada uno.

### Enunciado
¿Qué ángulo $\theta$ con la horizontal deben tener los lados para que el área de la sección sea máxima (y transporte más agua)?

### Opciones
- [ ] A) $45^\circ$
  <!-- feedback: Incorrecto. No es el ángulo de eficiencia máxima para un trapecio. -->
- [x] B) $60^\circ$
  <!-- feedback: Correcto. El área máxima para un canal de tres lados iguales se obtiene cuando forma la mitad de un hexágono regular, lo que implica ángulos de $60^\circ$. -->
- [ ] C) $30^\circ$
  <!-- feedback: Incorrecto. El canal resultaría demasiado ancho y poco profundo. -->
- [ ] D) $90^\circ$
  <!-- feedback: Incorrecto. Esto formaría un rectángulo, que es menos eficiente que el trapecio óptimo. -->

### Explicacion Pedagogica
Optimización de secciones hidráulicas para maximizar el caudal, aplicando trigonometría y cálculo diferencial.

---

## Question 15 [D8]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Un fabricante de ropa en Otavalo estima que si produce $x$ unidades, su utilidad es $U(x) = -x^3 + 300x^2 - 22500x - 2000$.

### Enunciado
¿Cuántas unidades debe producir para obtener la utilidad máxima local?

### Opciones
- [ ] A) 50 unidades
  <!-- feedback: Incorrecto. En este punto la utilidad es decreciente. -->
- [x] B) 150 unidades
  <!-- feedback: Correcto. $U'(x) = -3x^2 + 600x - 22500$. Para que 150 sea un punto crítico, la derivada debe ser cero. (Nota: Ajustando valores para raíces exactas). Si $U'(x) = -3(x-50)(x-150) = -3x^2 + 600x - 22500$. El máximo ocurre en $x=150$ ya que la parábola de la derivada abre hacia abajo entre sus raíces. -->
- [ ] C) 200 unidades
  <!-- feedback: Incorrecto. Valor fuera de la zona de utilidad máxima. -->
- [ ] D) 100 unidades
  <!-- feedback: Incorrecto. Punto de inflexión del modelo de utilidad. -->

### Explicacion Pedagogica
Análisis de funciones de utilidad de tercer grado, identificando el máximo relevante dentro del contexto de producción.

---

## Question 16 [D8]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v16
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.40
**Contexto:** Verificación de la concavidad en un problema de optimización.

### Enunciado
¿Por qué es fundamental realizar la prueba de la segunda derivada (o analizar los signos de la primera) al finalizar un problema de optimización?

### Opciones
- [ ] A) Para asegurar que el punto crítico es una raíz de la función.
  <!-- feedback: Incorrecto. No buscamos raíces, buscamos extremos. -->
- [x] B) Para confirmar si el punto hallado es efectivamente un máximo o un mínimo, según lo solicitado.
  <!-- feedback: Correcto. Un punto crítico solo indica un posible extremo; la concavidad confirma su naturaleza. -->
- [ ] C) Para simplificar el resultado final.
  <!-- feedback: Incorrecto. No tiene fines de simplificación. -->
- [ ] D) Para verificar si la función es continua.
  <!-- feedback: Incorrecto. Se asume continuidad para aplicar las reglas de derivación. -->

### Explicacion Pedagogica
Importancia del rigor matemático al clasificar puntos críticos para evitar errores de interpretación en la toma de decisiones.

---

## Bloque D — Nivel D9–D10: Casos Especiales y Optimización Teórica

---

## Question 17 [D9]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.35
**Contexto:** Cilindro inscrito en una esfera. Se desea inscribir un cilindro circular recto de volumen máximo en una esfera de radio $R = 3$.

### Enunciado
¿Cuál es la altura $h$ de dicho cilindro?

### Opciones
- [ ] A) $h = 3$
  <!-- feedback: Incorrecto. Valor igual al radio de la esfera, no optimiza el volumen. -->
- [x] B) $h = 2\sqrt{3}$
  <!-- feedback: Correcto. El volumen $V = \pi r^2 h$. Por Pitágoras, $r^2 + (h/2)^2 = R^2 \Rightarrow r^2 = R^2 - h^2/4$. $V(h) = \pi h (R^2 - h^2/4)$. $V'(h) = \pi (R^2 - 3h^2/4) = 0 \Rightarrow h = 2R/\sqrt{3}$. Para $R=3$, $h = 6/\sqrt{3} = 2\sqrt{3}$. -->
- [ ] C) $h = \sqrt{3}$
  <!-- feedback: Incorrecto. Olvidó el factor 2 en la relación de altura. -->
- [ ] D) $h = 2$
  <!-- feedback: Incorrecto. Estimación sin fundamento en el análisis de derivadas. -->

### Explicacion Pedagogica
Optimización de volúmenes inscritos en cuerpos geométricos curvos utilizando restricciones trigonométricas o pitagóricas.

---

## Question 18 [D9]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v18
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.30
**Contexto:** Reflexión de la luz. Un rayo de luz viaja del punto A al punto B reflejándose en un espejo plano (eje x). El camino óptimo minimiza la distancia total.

### Enunciado
¿Qué propiedad de los ángulos se cumple en el punto de reflexión óptimo?

### Opciones
- [ ] A) El ángulo de incidencia es el doble del ángulo de reflexión.
  <!-- feedback: Incorrecto. Violación de las leyes ópticas y geométricas. -->
- [x] B) El ángulo de incidencia es igual al ángulo de reflexión.
  <!-- feedback: Correcto. Este resultado de la optimización de la distancia es la base de la ley de reflexión de la luz. -->
- [ ] C) La suma de los ángulos es $90^\circ$.
  <!-- feedback: Incorrecto. No es una propiedad general del camino óptimo. -->
- [ ] D) Los ángulos son complementarios.
  <!-- feedback: Incorrecto. Confusión de términos geométricos. -->

### Explicacion Pedagogica
Uso del cálculo diferencial para demostrar leyes físicas clásicas a partir del principio de minimización de trayectorias.

---

## Question 19 [D10]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v19
**Bloom:** Analyze
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.25
**Contexto:** Un problema de inventarios en una fábrica de zapatos de Latacunga. El costo total anual es $C(x) = \frac{500000}{x} + 2x + 10000$, donde $x$ es el tamaño de cada pedido.

### Enunciado
¿Cuál es el tamaño de pedido $x$ que minimiza el costo total y cuál es ese costo mínimo?

### Opciones
- [ ] A) $x = 100$, Costo = $15000$
  <!-- feedback: Incorrecto. El costo unitario por pedido es muy alto. -->
- [x] B) $x = 500$, Costo = $12000$
  <!-- feedback: Correcto. $C'(x) = -500000/x^2 + 2 = 0 \Rightarrow 2x^2 = 500000 \Rightarrow x^2 = 250000 \Rightarrow x = 500$. Costo: $500000/500 + 2(500) + 10000 = 1000 + 1000 + 10000 = 12000$. -->
- [ ] C) $x = 1000$, Costo = $12500$
  <!-- feedback: Incorrecto. Supera el punto de equilibrio de costos de almacenamiento. -->
- [ ] D) $x = 250$, Costo = $12500$
  <!-- feedback: Incorrecto. Costos de pedido demasiado elevados. -->

### Explicacion Pedagogica
Aplicación del modelo de la Cantidad Económica de Pedido (EOQ) mediante el análisis de extremos de funciones racionales.

---

## Question 20 [D10]
**ID:** EC-MAT-11-2026-W15-problemas-de-optimizacion-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Pensamiento Variacional
**Expected_Success:** 0.20
**Contexto:** Un problema de optimización en una superficie curva. Se desea encontrar el rectángulo de mayor área con base en el eje x y vértices superiores en la elipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.

### Enunciado
¿Cuál es el valor de la coordenada $x$ del vértice superior derecho que maximiza el área?

### Opciones
- [ ] A) $x = a/2$
  <!-- feedback: Incorrecto. Relación simplista que no surge del cálculo de derivadas. -->
- [x] B) $x = a/\sqrt{2}$
  <!-- feedback: Correcto. Área $A = 2x y = 2x b \sqrt{1 - x^2/a^2}$. Al derivar e igualar a cero, se obtiene $x = a/\sqrt{2}$. -->
- [ ] C) $x = a/\sqrt{3}$
  <!-- feedback: Incorrecto. Valor típico de cilindros en esferas, no de rectángulos en elipses. -->
- [ ] D) $x = a/4$
  <!-- feedback: Incorrecto. Área demasiado pequeña. -->

### Explicacion Pedagogica
Modelado y optimización avanzada de figuras inscritas en cónicas utilizando derivación de funciones compuestas con parámetros.
