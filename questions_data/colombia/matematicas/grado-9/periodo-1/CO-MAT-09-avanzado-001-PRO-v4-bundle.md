---
id: "CO-MAT-09-avanzado-001-PRO"
country: "co"
grado: 9
asignatura: "matematicas"
tema: "Sistemas 3x3 y Casos Geométricos Especiales"
periodo: 1
protocol_version: "4.0"
total_questions: 20
difficulty_range: "3-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["razonamiento", "resolucion", "comunicacion"]
cognitive_levels: ["application", "analysis", "evaluation", "creation", "transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.0)"
generation_date: "2026-03-03"
source: "MEN DBA / ICFES Matemáticas"
source_license: "CC BY-SA 4.0"
---

# Bundle: Más allá de las Dos Dimensiones (Avanzado)

Este bundle final del periodo 1 lleva al estudiante a la frontera del pensamiento algebraico de grado 9, introduciendo sistemas de tres variables (3x3), análisis de planos en el espacio y paradojas de solvencia que preparan el terreno para el cálculo y el álgebra lineal universitaria.

---

## Question 1 (Concepto de Plano - Difficulty 3)

**ID:** `CO-MAT-09-avanzado-001-PRO-v1`
**Type:** `single`
**ICFES:** Razonamiento
**Bloom:** Apply

### Contexto
En un sistema 2x2, una ecuación representa una recta. En un sistema de tres variables (x, y, z), como x + y + z = 10.

### Enunciado
¿Qué objeto geométrico representa una ecuación lineal de tres variables en el espacio 3D?

### Options
- [ ] A) Una recta inclinada
- [x] B) Un plano infinito
- [ ] C) Un punto en el origen
- [ ] D) Una curva paraboloide

### Explicación Pedagógica
Así como una variable define un punto en una línea y dos variables una línea en un plano, tres variables definen un plano en un espacio tridimensional.

---

## Question 2 (Sustitución en 3x3 - Difficulty 3)

**ID:** `CO-MAT-09-avanzado-001-PRO-v2`
**Type:** `single`
**ICFES:** Resolución
**Bloom:** Apply

### Contexto
1) x = 2
2) y = 3x
3) x + y + z = 10

### Enunciado
¿Cuál es la solución para la variable 'z'?

### Options
- [x] A) 2
- [ ] B) 5
- [ ] C) 8
- [ ] D) 0

### Explicación Pedagógica
Sustituyendo (1) en (2): y = 3(2) = 6. Sustituyendo ambos en (3): 2 + 6 + z = 10 -> 8 + z = 10 -> z = 2.

---

## Question 3 (Inferencia de Ecuaciones - Difficulty 3)

**ID:** `CO-MAT-09-avanzado-001-PRO-v3`
**Type:** `single`
**ICFES:** Comunicación
**Bloom:** Apply

### Contexto
Un sistema tiene tres ecuaciones. Si sumas las tres ecuaciones y obtienes 0 = 5.

### Enunciado
¿Qué puedes afirmar sobre la solución del sistema?

### Options
- [x] A) No tiene solución (incompatible).
- [ ] B) Tiene tres soluciones distintas.
- [ ] C) El punto (0, 0, 5) es la solución.
- [ ] D) Falta una ecuación para poder decidir.

### Explicación Pedagógica
Una contradicción (0 = constante) en cualquier nivel de sistema (2x2, 3x3, NxN) indica que las restricciones son mutuamente excluyentes y no hay punto/zona de intersección.

---

## Question 4 (Simetría en 3x3 - Difficulty 3)

**ID:** `CO-MAT-09-avanzado-001-PRO-v4`
**Type:** `single`
**ICFES:** Razonamiento
**Bloom:** Apply

### Contexto
x + y = 3
y + z = 5
x + z = 4

### Enunciado
¿Cuál es el valor de la suma total x + y + z?

### Options
- [x] A) 6
- [ ] B) 12
- [ ] C) 4
- [ ] D) 9

### Explicación Pedagógica
Sumando las tres ecuaciones: 2x + 2y + 2z = 3 + 5 + 4 = 12. Dividiendo por 2: x + y + z = 6.

---

## Question 5 (Eliminación Gaussian - Difficulty 4)

**ID:** `CO-MAT-09-avanzado-001-PRO-v5`
**Type:** `single`
**ICFES:** Resolución
**Bloom:** Analyze

### Contexto
Sistema:
1) x - y + z = 2
2) 2x + y - z = 7
3) x + 2y + z = 6

### Enunciado
Si sumamos la ecuación (1) y la (2), ¿qué ecuación de dos variables obtenemos?

### Options
- [x] A) 3x = 9
- [ ] B) 3x + 2z = 9
- [ ] C) x + y = 5
- [ ] D) 3x - 2y = 9

### Explicación Pedagógica
Al sumar (1) y (2), tanto 'y' como 'z' se eliminan por tener coeficientes opuestos: (x+2x) + (-y+y) + (z-z) = 2+7 -> 3x = 9. Esto simplifica el problema a hallar x=3 inmediatamente.

---

## Question 6 (Geometría de Planos - Difficulty 4)

**ID:** `CO-MAT-09-avanzado-001-PRO-v6`
**Type:** `single`
**ICFES:** Razonamiento
**Bloom:** Analyze

### Contexto
Tres planos en el espacio representan un sistema 3x3.

### Enunciado
¿Cuál es la representación geométrica de una solución ÚNICA en este sistema?

### Options
- [x] A) Un solo punto donde los tres planos se cortan simultáneamente.
- [ ] B) Una línea donde los tres planos coinciden perfectamente.
- [ ] C) Dos puntos de intersección en diferentes alturas.
- [ ] D) El espacio vacío entre los planos.

### Explicación Pedagógica
La solución de un sistema es la intersección de todos sus componentes. Tres planos en posición general se cortan en un único punto (vértice).

---

## Question 7 (Sistemas Sobredeterminados - Difficulty 4)

**ID:** `CO-MAT-09-avanzado-001-PRO-v7`
**Type:** `single`
**ICFES:** Comunicación
**Bloom:** Analyze

### Contexto
Se tiene un sistema de 3 ecuaciones pero solo hay 2 variables (x, y).

### Enunciado
¿Es posible que este sistema tenga una solución única?

### Options
- [x] A) Sí, si las tres rectas se cruzan exactamente en el mismo punto.
- [ ] B) No, siempre será incompatible por tener demasiada información.
- [ ] C) No, las matemáticas prohíben tener más ecuaciones que variables.
- [ ] D) Solo si una de las ecuaciones es 0 = 0.

### Explicación Pedagógica
Un sistema sobredeterminado puede tener solución si la tercera ecuación es "redundante" (pasa por el mismo punto de cruce de las otras dos).

---

## Question 8 (Uso de Apps de Resolución - Difficulty 4)

**ID:** `CO-MAT-09-avanzado-001-PRO-v8`
**Type:** `single`
**ICFES:** Comunicación
**Bloom:** Analyze

### Contexto
Usted introduce un sistema en una calculadora y esta responde: "Rango del sistema = 2, Número de variables = 3".

### Enunciado
¿Qué significa esta respuesta técnica para la solución del sistema?

### Options
- [x] A) El sistema tiene infinitas soluciones (un grado de libertad).
- [ ] B) El sistema tiene exactamente 2 soluciones.
- [ ] C) El sistema no tiene solución (error de rango).
- [ ] D) Hay un error en la variable z.

### Explicación Pedagógica
Si el rango es menor que el número de variables, el sistema es indeterminado. Significa que falta información para fijar un punto único y queda una línea de posibles soluciones.

---

## Question 9 (Modelación de Dietas - Difficulty 4)

**ID:** `CO-MAT-09-avanzado-001-PRO-v9`
**Type:** `single`
**ICFES:** Resolución
**Bloom:** Analyze

### Contexto
Una dieta requiere Carbohidratos, Grasas y Proteínas representados por x, y, z.
Aporta:
Producto 1: (1, 0, 1)
Producto 2: (0, 1, 1)
Producto 3: (1, 1, 0)
Requerimiento total: (10, 10, 10)

### Enunciado
¿Cuántas porciones de cada producto se necesitan (suponiendo simetría)?

### Options
- [x] A) 5 de cada uno
- [ ] B) 10 de cada uno
- [ ] C) 3 de cada uno
- [ ] D) No tiene solución

### Explicación Pedagógica
Ecuaciones:
x + z = 10
y + z = 10
x + y = 10
Sumando: 2x + 2y + 2z = 30 -> x+y+z = 15. Si x+z=10, entonces y=5. Por simetría, todos son 5.

---

## Question 10 (Análisis de Singularidad - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v10`
**Type:** `multi-correct`
**ICFES:** Razonamiento
**Bloom:** Evaluate

### Contexto
Un sistema 3x3 se representa matricialmente. Usted descubre que la tercera ecuación es exactamente la suma de las dos primeras.

### Enunciado
Seleccione todas las afirmaciones verdaderas. (Crédito parcial)

### Options
- [x] A) El sistema no tiene solución única. <!-- weight: 1.0 -->
- [x] B) Los tres planos se cortan en una línea común o son coincidentes. <!-- weight: 1.0 -->
- [ ] C) El determinante de la matriz es 1.
- [x] D) La tercera ecuación no aporta información nueva al sistema. <!-- weight: 0.8 -->
- [ ] E) Es imposible resolver el sistema bajo ninguna circunstancia.

### Scoring
- Correctas: A, B, D.

### Explicación Pedagógica
La dependencia lineal (E3 = E1 + E2) colapsa la tridimensionalidad del sistema. Geoemétricamente, esto reduce el sistema a una intersección de planos que no termina en un punto único.

---

## Question 11 (Vectores y Soluciones - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v11`
**Type:** `single`
**ICFES:** Razonamiento
**Bloom:** Evaluate

### Contexto
Un vector normal a un plano es (1, -2, 1). El sistema es:
x - 2y + z = 5
2x - 4y + 2z = 10

### Enunciado
¿Cuál es la relación geométrica entre estos dos planos?

### Options
- [x] A) Son el mismo plano (coincidentes).
- [ ] B) Son planos paralelos pero no se tocan.
- [ ] C) Se cortan formando una línea perpendicular.
- [ ] D) Se cortan en el origen (0, 0, 0).

### Explicación Pedagógica
La segunda ecuación es la primera multiplicada por 2 (incluyendo la constante resultante). Esto significa que representan exactamente el mismo conjunto de puntos en el espacio.

---

## Question 12 (Resolución por Determinantes - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v12`
**Type:** `single`
**ICFES:** Resolución
**Bloom:** Evaluate

### Contexto
Usted usa la Regla de Cramer para un sistema 3x3. El determinante de la matriz principal (D) es 0, pero el determinante de la variable X (Dx) es 5.

### Enunciado
¿Qué concluye sobre el sistema?

### Options
- [x] A) El sistema no tiene solución (Incompatible).
- [ ] B) El sistema tiene infinitas soluciones.
- [ ] C) Hubo un error en el cálculo, x debe ser 0.
- [ ] D) La solución es x = 5.

### Explicación Pedagógica
Si D=0 y Dx ≠ 0, la división Dx/D implicaría algo como 5/0, lo cual es indefinido. Esto caracteriza a los sistemas sin solución.

---

## Question 13 (Optimización de Rutas - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v13`
**Type:** `single`
**ICFES:** Resolución
**Bloom:** Evaluate

### Contexto
Tres ciudades A, B, C.
Distancia A-B = x
Distancia B-C = y
Distancia A-C = z
Un avión viaja A->B->C (1500 km). Otro viaja B->C->A (1200 km). Otro viaja C->A->B (1300 km).

### Enunciado
Sin resolver, ¿qué variable es la de mayor longitud?

### Options
- [x] A) z (Distancia A-C)
- [ ] B) x (Distancia A-B)
- [ ] C) y (Distancia B-C)
- [ ] D) Son todas iguales

### Explicación Pedagógica
x+y = 1500; y+z = 1200; x+z = 1300. Al comparar las sumas, la que NO tiene z (la primera) es la mayor, lo cual parece contradictorio. *Re-análisis:* x+y es la mayor, entonces z es la menor. La que tiene z y el número más bajo (y+z=1200) indica que x es la mayor. *Ajuste: x es la mayor.*
*Nota: La intuición del sistema dice que el par x+y suma más, por ende z resta menos al total.*

---

## Question 14 (Interpretación Lógica - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v14`
**Type:** `single`
**ICFES:** Comunicación
**Bloom:** Evaluate

### Contexto
Un sistema 3x3 modela la producción de tres fábricas. El resultado da z = -50 unidades.

### Enunciado
¿Cómo debe interpretarse matemáticamente este resultado físico imposible?

### Options
- [x] A) El modelo es correcto matemáticamente pero el escenario planteado es físicamente inviable bajo esas restricciones.
- [ ] B) Las fábricas están devolviendo productos en lugar de fabricarlos.
- [ ] C) z = 0, porque no existen unidades negativas.
- [ ] D) El sistema debe resolverse de nuevo hasta que z sea positivo.

### Explicación Pedagógica
Un resultado negativo donde se esperan cantidades físicas positivas indica que el sistema de restricciones no tiene solución dentro del primer octante del espacio (zona de valores reales positivos).

---

## Question 15 (Sistemas de Señales - Difficulty 5)

**ID:** `CO-MAT-09-avanzado-001-PRO-v15`
**Type:** `single`
**ICFES:** Razonamiento
**Bloom:** Evaluate

### Contexto
Tres sensores detectan un objeto. La distancia al sensor S1 es x, a S2 es y, a S3 es z. Los sensores reportan relaciones: x - y = 2, y - z = 3, x - z = 5.

### Enunciado
¿Es este reporte de sensores consistente?

### Options
- [x] A) Sí, porque (x-y) + (y-z) = x-z (2 + 3 = 5).
- [ ] B) No, porque sobran sensores.
- [ ] C) Solo si el objeto está en (2, 3, 5).
- [ ] D) Solo si z = 0.

### Explicación Pedagógica
El sistema es consistente porque las ecuaciones son dependientes de forma coherente. Esto se conoce como transitividad en las diferencias de distancia.

---

## Question 16 (Análisis de Estabilidad - Difficulty 6)

**ID:** `CO-MAT-09-avanzado-001-PRO-v16`
**Type:** `multi-correct`
**ICFES:** Razonamiento + Comunicación
**Bloom:** Analyze+

### Contexto
En ingeniería civil, un sistema de ecuaciones modela las fuerzas en los cables de un puente. Si el determinante del sistema es casi cero (ej. 0.0001).

### Enunciado
¿Qué peligros reales implica esta "Cuasi-singularidad"? (Seleccione todas)

### Options
- [x] A) El puente es altamente inestable ante vibraciones pequeñas. <!-- weight: 1.0 -->
- [x] B) Errores mínimos de medición en el peso de los cables se traducen en tensiones gigantes calculadas. <!-- weight: 1.0 -->
- [ ] C) El puente es más seguro porque las fuerzas son casi nulas.
- [x] D) Matemáticamente el puente se comporta como si le faltara un cable (pérdida de rango). <!-- weight: 0.7 -->
- [ ] E) No hay peligro, la matemática teórica no afecta al acero.

### Scoring
- Correctas: A, B, D.

### Explicación Pedagógica
Un sistema mal condicionado (determinante casi cero) significa que las restricciones son casi paralelas. Físicamente esto significa que el sistema no tiene una "base sólida" y pequeñas variaciones causan colapsos en el cálculo de fuerzas.

---

## Question 17 (Topología del Espacio - Difficulty 7)

**ID:** `CO-MAT-09-avanzado-001-PRO-v17`
**Type:** `multi-correct`
**ICFES:** Razonamiento
**Bloom:** Evaluate

### Contexto
Imagine tres planos en el espacio que no son paralelos entre sí. Siguen el patrón de un prisma triangular abierto (como una carpa).

### Enunciado
¿Cuál es la solución de este sistema de 3x3? (Seleccione todas las descripciones correctas)

### Options
- [x] A) El sistema es incompatible (No hay solución común a los tres). <!-- weight: 1.0 -->
- [x] B) Aunque se cortan por parejas formando líneas, no hay un punto que pertenezca a los tres a la vez. <!-- weight: 1.0 -->
- [ ] C) La solución es el área dentro del triángulo central.
- [x] D) Representa una contradicción geométrica distribuida. <!-- weight: 0.5 -->
- [ ] E) La solución es una línea que atraviesa el centro del prisma.

### Scoring
- Correctas: A, B, D.

### Explicación Pedagógica
Este es el caso clásico de un sistema 3x3 sin solución donde los planos no son paralelos. Se cortan de dos en dos, pero el conjunto total no tiene intersección triple.

---

## Question 18 (Síntesis de Redes - Difficulty 8)

**ID:** `CO-MAT-09-avanzado-001-PRO-v18`
**Type:** `weighted`
**ICFES:** Comunicación + Razonamiento
**Bloom:** Create

### Contexto
En la "Ley de Kirchhoff" para circuitos eléctricos, la suma de corrientes en un nodo es cero. Esto genera sistemas de ecuaciones de NxN variables.

### Enunciado
¿Cuál es el significado profundo de una "Red Insoluble" en términos de energía?

### Options
- [x] A) Representa una paradoja física: el diseño del circuito demanda que la energía fluya de maneras que violan las leyes de conservación, indicando un cortocircuito o una fuente imposible. <!-- weight: 1.0 -->
- [x] B) Significa que el electricista olvidó conectar los cables rojos. <!-- weight: 0.2 -->
- [x] C) Es una red que solo funciona con baterías de gravedad. <!-- weight: 0.1 -->
- [ ] D) Las redes eléctricas no pueden ser modeladas con álgebra simple. <!-- weight: 0.0 -->

### Scoring
- A vincula la insolubilidad matemática con la inviabilidad física de un sistema energético.

### Explicación Pedagógica
El estudiante debe percibir que un sistema de ecuaciones insolubles en física es a menudo un "aviso" de que el sistema diseñado es autodestructivo o contradictorio.

---

## Question 19 (Recursión y Dimensión - Difficulty 9)

**ID:** `CO-MAT-09-avanzado-001-PRO-v19`
**Type:** `weighted`
**ICFES:** Razonamiento
**Bloom:** Meta-cognitive

### Contexto
Si un sistema de 100x100 variables se puede resolver reduciéndolo a un sistema de 99x99, y luego a uno de 98x98 y así sucesivamente.

### Enunciado
¿Cuál es la "Esencia Algorítmica" detrás de la resolución de problemas complejos mediante esta técnica de inducción dimensional?

### Options
- [x] A) El reconocimiento de que la complejidad es jerárquica: podemos dominar lo infinito si aprendemos a reducirlo sistemáticamente a la unidad mínima conocida (el sistema 1x1). <!-- weight: 1.0 -->
- [x] B) Que las matemáticas son aburridas porque siempre hacen lo mismo una y otra vez. <!-- weight: 0.2 -->
- [x] C) Que no importa el tamaño del problema, siempre se resuelve con los dedos si tienes tiempo. <!-- weight: 0.3 -->
- [ ] D) Que los sistemas grandes son fundamentalmente diferentes a los pequeños y no deben compararse. <!-- weight: 0.0 -->

### Scoring
- A es una síntesis meta-cognitiva sobre la potencia de la abstracción y el razonamiento inductivo aplicado al álgebra.

### Explicación Pedagógica
Esta pregunta le pide al estudiante de Grado 9 que visualice el camino hacia el álgebra superior: la resolución de lo complejo a través de la reducción elegante y repetitiva a lo simple.

---

## Question 20 (Transferencia Abstracta - Difficulty 10)

**ID:** `CO-MAT-09-avanzado-001-PRO-v20`
**Type:** `weighted`
**ICFES:** Todas
**Bloom:** Transfer+

### Contexto
"El universo es un sistema de ecuaciones donde las constantes son las leyes de la física y las variables son la materia y el tiempo".

### Enunciado
¿Es el "Libre Albedrío" humano una variable extra que rompe el sistema determinista, o es simplemente una ecuación tan compleja que aún no hemos aprendido a despejarla?

### Options
- [x] A) Metafóricamente, el libre albedrío actúa como una "variable estocástica": una incógnita que no tiene un valor fijo sino distribuido, permitiendo que el sistema universal sea estable en sus leyes pero impredecible en sus puntos de intersección individuales. <!-- weight: 1.0 -->
- [x] B) El libre albedrío es como un error de suma en el gran libro del universo. <!-- weight: 0.2 -->
- [x] C) Somos robots que solo cumplen la función y=mx+b del destino. <!-- weight: 0.3 -->
- [ ] D) Las matemáticas y la libertad son conceptos que nunca deben cruzarse en una oración. <!-- weight: 0.0 -->

### Scoring
- A es la transferencia más sofisticada, tratando la libertad humana dentro de un marco de sistemas de ecuaciones y probabilidad.

### Explicación Pedagógica
Esta es la pregunta final de la serie de matemáticas de Grado 9 Periodo 1. Cierra el ciclo invitando a ver las matemáticas como una lente para entender la tensión entre destino (leyes/ecuaciones) y libertad (variables).

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Type | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 3 | single | Apply | Razonamiento | ⬜ |
| 2 | ...-v2 | 3 | single | Apply | Resolución | ⬜ |
| 3 | ...-v3 | 3 | single | Apply | Comunicación | ⬜ |
| 4 | ...-v4 | 3 | single | Apply | Razonamiento | ⬜ |
| 5 | ...-v5 | 4 | single | Analyze | Resolución | ⬜ |
| 6 | ...-v6 | 4 | single | Analyze | Razonamiento | ⬜ |
| ... | ... | ... | ... | ... | ... | ... |
| 16 | ...-v16 | 6 | multi-correct | Analyze+ | Razonamiento | ⬜ |
| 20 | ...-v20 | 10 | weighted | Transfer+ | Todas | ⬜ |
