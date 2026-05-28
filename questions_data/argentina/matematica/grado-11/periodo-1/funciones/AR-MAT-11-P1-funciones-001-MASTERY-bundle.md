---
id: "AR-MAT-11-P1-funciones-001-MASTERY"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "funciones"
periodo: 1
protocol_version: "5.1"
bundle_index: 1
bundle_size: 20
alignment: "Aprender + NAP"
modern_context: true
distractor_profile: "plausible_peer_set"
calibration:
  expected_success_rate: 0.60
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "analisis_funciones, dominio_rango, modelos_matematicos"
---

# Bundle Mastery: Análisis y Modelado de Funciones

Este bundle aborda los conceptos fundamentales de funciones para el último año de la escuela secundaria en Argentina, alineado con los Núcleos de Aprendizajes Prioritarios (NAP) y la evaluación Aprender. Se enfoca en el análisis de dominios, rangos, transformaciones y aplicaciones prácticas en contextos locales.

---

## Question 1 [D3-D4]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v1`
**Bloom:** Remember
**APRENDER:** Resolución de problemas y comunicación

### Contexto
Un estudiante en Rosario está analizando el costo de imprimir apuntes. La fotocopiadora cobra una base de $500 y luego $80 por cada página impresa.

### Enunciado
¿Cuál de las siguientes fórmulas representa correctamente la función del costo total $C(x)$ en relación a la cantidad de páginas $x$?

### Options
- [ ] A) $C(x) = 500x + 80$ <!-- feedback: Incorrecto. Aquí estás multiplicando el cargo fijo por la cantidad de páginas, lo cual no tiene sentido en este contexto. -->
- [x] B) $C(x) = 80x + 500$ <!-- feedback: Correcto. El costo variable ($80 por página) se multiplica por x y se le suma el costo fijo base de $500. -->
- [ ] C) $C(x) = 580x$ <!-- feedback: Incorrecto. Esta fórmula asume que los $500 también dependen de la cantidad de páginas, pero es un cargo fijo. -->
- [ ] D) $C(x) = 80 + 500$ <!-- feedback: Incorrecto. Esta es una expresión constante que no depende de la cantidad de páginas x. -->

### Explicación Pedagógica
La función lineal $f(x) = mx + b$ modela situaciones con un valor inicial ($b$) y una razón de cambio constante ($m$). En este caso, $m$ es el precio por página y $b$ es el costo base.

---

## Question 2 [D3-D4]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v2`
**Bloom:** Understand
**APRENDER:** Comunicación y representación

### Contexto
Mirá la gráfica de una función $f(x)$ y recordá la definición de función en el conjunto de los números reales.

### Enunciado
Si tenés la gráfica de una relación en el plano cartesiano, ¿cómo podés asegurar, de forma visual, que esa relación **no** es una función de $x$?

### Options
- [ ] A) Si la gráfica no pasa por el origen (0,0). <!-- feedback: Incorrecto. Muchas funciones no pasan por el origen y siguen siendo funciones perfectamente válidas. -->
- [x] B) Si existe al menos una línea vertical que corta la gráfica en más de un punto. <!-- feedback: Correcto. Esto indicaría que a un valor de x le corresponden dos o más valores de y, rompiendo la definición de función. -->
- [ ] C) Si la gráfica es una línea recta horizontal. <!-- feedback: Incorrecto. Una línea horizontal es una función constante, donde a cada x le corresponde el mismo valor de y. -->
- [ ] D) Si la gráfica tiene valores negativos en el eje Y. <!-- feedback: Incorrecto. El rango de una función puede incluir cualquier número real, incluso negativos. -->

### Explicación Pedagógica
La prueba de la línea vertical es la herramienta geométrica para verificar la unicidad de la imagen para cada elemento del dominio.

---

## Question 3 [D3-D4]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v3`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
Una función cuadrática está dada por $f(x) = x^2 - 4x + 3$.

### Enunciado
¿Cuál es el valor de la función cuando $x = 2$?

### Options
- [ ] A) 3 <!-- feedback: Incorrecto. Probablemente olvidaste restar el término intermedio o cometiste un error de signo. -->
- [ ] B) 0 <!-- feedback: Incorrecto. Este es el valor de la función en las raíces (x=1 o x=3), no en x=2. -->
- [x] C) -1 <!-- feedback: Correcto. Calculando: 2^2 - 4(2) + 3 = 4 - 8 + 3 = -1. -->
- [ ] D) 1 <!-- feedback: Incorrecto. Revisá el cálculo de 4 - 8 + 3. -->

### Explicación Pedagógica
Evaluar una función consiste en reemplazar la variable independiente por el valor dado y realizar las operaciones aritméticas correspondientes respetando el orden de prioridad.

---

## Question 4 [D3-D4]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v4`
**Bloom:** Remember
**APRENDER:** Comunicación y representación

### Contexto
Considerá la función racional $f(x) = \frac{1}{x+5}$.

### Enunciado
¿Para qué valor de $x$ la función no está definida en los números reales?

### Options
- [ ] A) $x = 5$ <!-- feedback: Incorrecto. Si x=5, el denominador es 10, lo cual es válido. -->
- [x] B) $x = -5$ <!-- feedback: Correcto. Si x=-5, el denominador se hace cero (-5+5=0), y la división por cero no está definida. -->
- [ ] C) $x = 0$ <!-- feedback: Incorrecto. Si x=0, la función vale 1/5, que es un número real definido. -->
- [ ] D) $x = 1$ <!-- feedback: Incorrecto. La función está definida para x=1. -->

### Explicación Pedagógica
El dominio de una función racional excluye los valores que anulan el denominador, ya que la división por cero es una operación no permitida en el campo de los reales.

---

## Question 5 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v5`
**Bloom:** Understand
**APRENDER:** Razonamiento y argumentación

### Contexto
Tenés la función $f(x) = x^2$. Se define una nueva función $g(x) = x^2 + 3$.

### Enunciado
¿Cómo se desplazó la gráfica de $g(x)$ con respecto a la de $f(x)$?

### Options
- [ ] A) 3 unidades hacia la derecha. <!-- feedback: Incorrecto. Los desplazamientos horizontales ocurren cuando la constante suma o resta dentro del cuadrado, como (x-3)^2. -->
- [ ] B) 3 unidades hacia la izquierda. <!-- feedback: Incorrecto. Esto ocurriría si tuviéramos (x+3)^2. -->
- [x] C) 3 unidades hacia arriba. <!-- feedback: Correcto. Sumar una constante positiva fuera de la función base produce una traslación vertical hacia arriba. -->
- [ ] D) 3 unidades hacia abajo. <!-- feedback: Incorrecto. Para que baje, la constante debería estar restando: x^2 - 3. -->

### Explicación Pedagógica
Las transformaciones de la forma $f(x) + k$ afectan directamente a los valores de salida (ordenadas), produciendo traslaciones verticales de $k$ unidades.

---

## Question 6 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v6`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
El nivel de agua en un tanque de un campo en Buenos Aires baja de forma constante. Al empezar el día tenía 1200 litros y después de 4 horas de riego quedan 800 litros.

### Enunciado
¿Cuál es la razón de cambio (pendiente) que describe la pérdida de agua por hora?

### Options
- [ ] A) 400 litros/hora <!-- feedback: Incorrecto. 400 es la pérdida total en 4 horas, no la razón por hora. -->
- [x] B) -100 litros/hora <!-- feedback: Correcto. La pérdida es de 400 litros en 4 horas (800-1200 = -400). Dividiendo por el tiempo: -400 / 4 = -100. -->
- [ ] C) 100 litros/hora <!-- feedback: Incorrecto. Como el agua está bajando, la razón de cambio debe ser negativa. -->
- [ ] D) -400 litros/hora <!-- feedback: Incorrecto. Olvidaste dividir el cambio total por la cantidad de horas transcurridas. -->

### Explicación Pedagógica
La pendiente de una función lineal representa la razón de cambio unitaria. En este contexto físico, una pendiente negativa indica una disminución de la magnitud (volumen de agua).

---

## Question 7 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v7`
**Bloom:** Analyze
**APRENDER:** Razonamiento y argumentación

### Contexto
Dadas las funciones $f(x) = x + 3$ y $g(x) = 2x$.

### Enunciado
¿Cuál es el valor de la función compuesta $(g \circ f)(5)$?

### Options
- [x] A) 16 <!-- feedback: Correcto. Primero evaluamos f(5) = 5+3 = 8. Luego evaluamos g(8) = 2(8) = 16. -->
- [ ] B) 13 <!-- feedback: Incorrecto. Este es el resultado de f(g(5)) = f(10) = 13. El orden de composición importa. -->
- [ ] C) 10 <!-- feedback: Incorrecto. Error en la aplicación de las funciones. -->
- [ ] D) 25 <!-- feedback: Incorrecto. Probablemente multiplicaste los resultados de f(5) y g(5). -->

### Explicación Pedagógica
La composición $(g \circ f)(x)$ significa aplicar la función $g$ al resultado de la función $f$. Es fundamental seguir el orden correcto de adentro hacia afuera.

---

## Question 8 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v8`
**Bloom:** Understand
**APRENDER:** Comunicación y representación

### Contexto
Mirá la función $f(x) = 2^x$. Esta es una función exponencial creciente.

### Enunciado
¿Cuál es el valor del intercepto con el eje Y (ordenada al origen) de esta función?

### Options
- [ ] A) 0 <!-- feedback: Incorrecto. 2^0 no es igual a 0. Las funciones exponenciales de la forma a^x nunca tocan el eje X si no hay desplazamientos. -->
- [x] B) 1 <!-- feedback: Correcto. El intercepto con el eje Y ocurre cuando x=0. Cualquier número (distinto de cero) elevado a la potencia 0 es 1. -->
- [ ] C) 2 <!-- feedback: Incorrecto. Este es el valor de f(1), no el intercepto con el eje Y. -->
- [ ] D) No tiene intercepto. <!-- feedback: Incorrecto. La función está definida para x=0, por lo tanto tiene un punto de cruce con el eje Y. -->

### Explicación Pedagógica
El intercepto con el eje Y se halla evaluando la función en $x=0$. Para la función exponencial básica $f(x)=b^x$, este punto siempre es $(0,1)$.

---

## Question 9 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v9`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
La temperatura en una ciudad de la Patagonia se modela durante un día con una función. Se sabe que la función es par, es decir, $T(t) = T(-t)$.

### Enunciado
Si a las 3 de la mañana ($t=3$) la temperatura es de -5°C, ¿qué temperatura se espera a las -3 horas (asumiendo simetría respecto a la medianoche)?

### Options
- [ ] A) 5°C <!-- feedback: Incorrecto. Si fuera 5°C, la función sería impar, f(-x) = -f(x). -->
- [x] B) -5°C <!-- feedback: Correcto. Por definición de función par, el valor de la función es el mismo para una entrada x y su opuesta -x. -->
- [ ] C) 0°C <!-- feedback: Incorrecto. No hay razón para que la temperatura sea cero. -->
- [ ] D) -3°C <!-- feedback: Incorrecto. Estás confundiendo el valor de la entrada con el de la salida. -->

### Explicación Pedagógica
Las funciones pares presentan simetría axial respecto al eje de ordenadas (Eje Y). Esto significa que valores opuestos de $x$ tienen la misma imagen.

---

## Question 10 [D5-D6]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v10`
**Bloom:** Analyze
**APRENDER:** Razonamiento y argumentación

### Contexto
Considerá la función $f(x) = \log_2(x)$.

### Enunciado
¿Cuál es el dominio de esta función en el conjunto de los números reales?

### Options
- [ ] A) Todos los números reales. <!-- feedback: Incorrecto. El logaritmo no está definido para números negativos ni para el cero en el campo de los reales. -->
- [x] B) Todos los números reales mayores que cero ($x > 0$). <!-- feedback: Correcto. El argumento de un logaritmo debe ser estrictamente positivo. -->
- [ ] C) Todos los números reales mayores o iguales a cero ($x \geq 0$). <!-- feedback: Incorrecto. El logaritmo de cero tiende a infinito negativo, no es un número real definido. -->
- [ ] D) Todos los números reales distintos de cero. <!-- feedback: Incorrecto. Los números negativos tampoco están permitidos en el dominio de un logaritmo real. -->

### Explicación Pedagógica
La función logarítmica es la inversa de la exponencial. Dado que $b^y$ siempre es positivo, el dominio de su inversa (el logaritmo) se restringe a los números positivos.

---

## Question 11 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v11`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
Un proyectil se lanza desde el suelo en un parque de Córdoba. Su altura $h$ en metros después de $t$ segundos está dada por $h(t) = -5t^2 + 20t$.

### Enunciado
¿En qué tiempo $t$ el proyectil alcanza su altura máxima?

### Options
- [ ] A) 4 segundos <!-- feedback: Incorrecto. Este es el tiempo total de vuelo hasta que vuelve a tocar el suelo. -->
- [x] B) 2 segundos <!-- feedback: Correcto. El máximo de una parábola abierta hacia abajo está en su vértice. t = -b / (2a) = -20 / (2 * -5) = -20 / -10 = 2. -->
- [ ] C) 20 segundos <!-- feedback: Incorrecto. Usaste el valor de b directamente sin aplicar la fórmula del vértice. -->
- [ ] D) 5 segundos <!-- feedback: Incorrecto. Este valor corresponde al coeficiente del término cuadrático. -->

### Explicación Pedagógica
En una función cuadrática $f(x) = ax^2 + bx + c$, si $a < 0$, la función tiene un máximo en el vértice, cuya coordenada $x$ se calcula como $-b/(2a)$.

---

## Question 12 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v12`
**Bloom:** Analyze
**APRENDER:** Comunicación y representación

### Contexto
Tenés la función homográfica $f(x) = \frac{2x - 4}{x + 1}$.

### Enunciado
¿Cuáles son las ecuaciones de las asíntotas vertical y horizontal de esta función?

### Options
- [ ] A) Vertical: $x = 1$; Horizontal: $y = 2$ <!-- feedback: Incorrecto. La asíntota vertical ocurre cuando x+1=0, es decir, x=-1. -->
- [x] B) Vertical: $x = -1$; Horizontal: $y = 2$ <!-- feedback: Correcto. AV en x=-1 (anula el denominador). AH en y=2 (cociente de coeficientes principales 2/1). -->
- [ ] C) Vertical: $x = -1$; Horizontal: $y = -4$ <!-- feedback: Incorrecto. El valor -4 es parte del numerador, no define la asíntota horizontal. -->
- [ ] D) Vertical: $x = 4$; Horizontal: $y = 1$ <!-- feedback: Incorrecto. Confundiste los términos de la función al buscar las asíntotas. -->

### Explicación Pedagógica
Para funciones homográficas $f(x) = (ax+b)/(cx+d)$, la asíntota vertical es $x = -d/c$ y la horizontal es $y = a/c$.

---

## Question 13 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v13`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
Buscá la función inversa de $f(x) = 3x - 6$.

### Enunciado
¿Cuál es la expresión correcta para $f^{-1}(x)$?

### Options
- [ ] A) $f^{-1}(x) = \frac{x-6}{3}$ <!-- feedback: Incorrecto. Al despejar x, el 6 que resta pasa sumando al otro lado. -->
- [x] B) $f^{-1}(x) = \frac{x+6}{3}$ <!-- feedback: Correcto. Despejando: y = 3x-6 => y+6 = 3x => (y+6)/3 = x. Intercambiando variables queda (x+6)/3. -->
- [ ] C) $f^{-1}(x) = \frac{1}{3x-6}$ <!-- feedback: Incorrecto. Esta es la función recíproca, no la inversa. -->
- [ ] D) $f^{-1}(x) = -3x + 6$ <!-- feedback: Incorrecto. La inversa de una función lineal no es simplemente cambiar los signos. -->

### Explicación Pedagógica
El proceso para hallar la inversa consiste en despejar la variable independiente $x$ en términos de $y$, y luego intercambiar los nombres de las variables para obtener la nueva regla de correspondencia.

---

## Question 14 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v14`
**Bloom:** Analyze
**APRENDER:** Razonamiento y argumentación

### Contexto
Considerá la función definida por partes:
$f(x) = \begin{cases} x + 1 & \text{si } x \leq 0 \\ x^2 & \text{si } x > 0 \end{cases}$

### Enunciado
¿Es esta función continua en $x = 0$? Justificá tu respuesta.

### Options
- [ ] A) Sí, porque ambos tramos pasan por el origen. <!-- feedback: Incorrecto. El primer tramo evaluado en 0 da 1, no pasa por el origen. -->
- [x] B) No, porque los límites laterales en $x = 0$ son distintos. <!-- feedback: Correcto. El límite por izquierda es 1 y por derecha es 0. Como no coinciden, hay un salto. -->
- [ ] C) Sí, porque la función está definida para todos los reales. <!-- feedback: Incorrecto. Que el dominio sea todos los reales no garantiza la continuidad en todos los puntos. -->
- [ ] D) No, porque x^2 no puede unirse con una línea recta. <!-- feedback: Incorrecto. Diferentes tipos de funciones pueden unirse de forma continua si sus valores coinciden en el punto de unión. -->

### Explicación Pedagógica
Para que una función sea continua en un punto, el límite por izquierda, el límite por derecha y el valor de la función en ese punto deben ser todos iguales.

---

## Question 15 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v15`
**Bloom:** Apply
**APRENDER:** Resolución de problemas

### Contexto
Un cultivo de bacterias en un laboratorio de la UBA se duplica cada hora. Inicialmente hay 100 bacterias.

### Enunciado
¿Cuántas bacterias habrá después de 5 horas?

### Options
- [ ] A) 500 <!-- feedback: Incorrecto. Esto sería un crecimiento lineal (100 por hora), pero el enunciado dice que se duplica (exponencial). -->
- [ ] B) 1.600 <!-- feedback: Incorrecto. Error en el cálculo de la potencia de 2. -->
- [x] C) 3.200 <!-- feedback: Correcto. La función es f(t) = 100 * 2^t. Para t=5: 100 * 2^5 = 100 * 32 = 3.200. -->
- [ ] D) 6.400 <!-- feedback: Incorrecto. Este sería el valor después de 6 horas. -->

### Explicación Pedagógica
Los procesos de duplicación se modelan con funciones exponenciales de base 2. El valor inicial es el coeficiente que multiplica a la potencia.

---

## Question 16 [D7-D8]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v16`
**Bloom:** Analyze
**APRENDER:** Razonamiento y argumentación

### Contexto
Tenés una función $f(x)$ con dominio en el intervalo $[2, 8]$. Se define $g(x) = f(x - 2)$.

### Enunciado
¿Cuál es el dominio de la nueva función $g(x)$?

### Options
- [ ] A) $[0, 6]$ <!-- feedback: Incorrecto. Restar 2 dentro del argumento desplaza la función hacia la derecha, por lo que los valores del dominio aumentan. -->
- [x] B) $[4, 10]$ <!-- feedback: Correcto. Para que x-2 esté en el intervalo [2, 8], x debe estar en [2+2, 8+2], es decir, [4, 10]. -->
- [ ] C) $[2, 8]$ <!-- feedback: Incorrecto. El dominio cambia debido a la traslación horizontal. -->
- [ ] D) $[1, 4]$ <!-- feedback: Incorrecto. Esto ocurriría si estuviéramos dividiendo la variable x por 2. -->

### Explicación Pedagógica
Las transformaciones horizontales de la forma $f(x-h)$ desplazan la gráfica $h$ unidades. Si $h > 0$, el desplazamiento es hacia la derecha, sumándose $h$ a los extremos del dominio original.

---

## Question 17 [D9-D10]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v17`
**Bloom:** Evaluate
**APRENDER:** Razonamiento y argumentación

### Contexto
Analizá la función $f(x) = \frac{x^2 - 1}{x - 1}$.

### Enunciado
¿Cuál es la diferencia entre el comportamiento de esta función en $x = 1$ y una función que tiene una asíntota vertical en ese punto?

### Options
- [ ] A) No hay ninguna diferencia; en ambos casos la función tiende a infinito. <!-- feedback: Incorrecto. En esta función el límite existe y es finito. -->
- [x] B) En $x = 1$ esta función tiene un "punto vacío" (discontinuidad evitable), no una asíntota. <!-- feedback: Correcto. Al factorizar x^2-1 como (x-1)(x+1), se puede simplificar con el denominador, resultando en x+1 para x distinto de 1. -->
- [ ] C) La función es continua en $x = 1$ porque se puede simplificar. <!-- feedback: Incorrecto. Aunque se simplifique, el dominio original excluye el 1, por lo que hay un hueco. -->
- [ ] D) Tiene una asíntota horizontal en $y = 1$. <!-- feedback: Incorrecto. El grado del numerador es mayor al del denominador, por lo que no tiene asíntota horizontal. -->

### Explicación Pedagógica
Las discontinuidades evitables ocurren cuando un valor anula tanto al numerador como al denominador, permitiendo una simplificación algebraica que elimina la indeterminación en el límite.

---

## Question 18 [D9-D10]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v18`
**Bloom:** Create
**APRENDER:** Resolución de problemas

### Contexto
Querés modelar la oscilación de una marea en un puerto de Buenos Aires. La altura varía entre 2 y 6 metros, y el ciclo se repite cada 12 horas.

### Enunciado
¿Cuál de estas funciones trigonométricas podría representar la altura $H$ en función del tiempo $t$ en horas?

### Options
- [ ] A) $H(t) = 4 + 2\cos(12t)$ <!-- feedback: Incorrecto. El periodo de esta función sería 2π/12, no 12 horas. -->
- [x] B) $H(t) = 4 + 2\cos(\frac{\pi}{6}t)$ <!-- feedback: Correcto. La amplitud es 2 (oscila 2 arriba y 2 abajo de 4). El periodo es T = 2π / (π/6) = 12 horas. -->
- [ ] C) $H(t) = 6 + 2\cos(12t)$ <!-- feedback: Incorrecto. El valor medio sería 6, oscilando entre 4 y 8. -->
- [ ] D) $H(t) = 2 + 4\cos(\frac{\pi}{12}t)$ <!-- feedback: Incorrecto. Aquí la amplitud sería 4 y el valor medio 2. -->

### Explicación Pedagógica
Para modelar ciclos con funciones trigonométricas, se usa $f(t) = C + A\cos(Bt)$, donde $C$ es el valor medio, $A$ es la amplitud y el periodo es $2\pi/B$.

---

## Question 19 [D9-D10]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v19`
**Bloom:** Evaluate
**APRENDER:** Razonamiento y argumentación

### Contexto
Considerá la función compuesta $h(x) = \sqrt{x^2 - 9}$.

### Enunciado
¿Cuál es el dominio de esta función en el conjunto de los números reales?

### Options
- [ ] A) $[3, \infty)$ <!-- feedback: Incompleto. Olvidaste que los valores negativos muy grandes también hacen que el argumento sea positivo al elevarlos al cuadrado. -->
- [x] B) $(-\infty, -3] \cup [3, \infty)$ <!-- feedback: Correcto. x^2 - 9 debe ser >= 0, lo que implica que x^2 >= 9. Esto se cumple si x >= 3 o x <= -3. -->
- [ ] C) $[-3, 3]$ <!-- feedback: Incorrecto. En este intervalo, x^2 - 9 sería negativo, lo que daría resultados no reales. -->
- [ ] D) Todos los números reales. <!-- feedback: Incorrecto. Hay un intervalo central donde la función no está definida. -->

### Explicación Pedagógica
El dominio de una función con raíz cuadrada está definido por la inecuación que garantiza un radicando no negativo. Resolver $x^2 - a^2 \geq 0$ implica considerar las dos regiones externas a las raíces.

---

## Question 20 [D9-D10]

**ID:** `AR-MAT-11-P1-funciones-001-MASTERY-v20`
**Bloom:** Create
**APRENDER:** Resolución de problemas

### Contexto
Un banco ofrece una tasa de interés compuesto anual del 10%. Depositás un monto inicial $P$.

### Enunciado
¿Qué función representa el tiempo $t$ (en años) necesario para que tus ahorros alcancen un monto final $M$?

### Options
- [x] A) $t = \log_{1,1}(\frac{M}{P})$ <!-- feedback: Correcto. La fórmula es M = P * (1,1)^t. Despejando: M/P = (1,1)^t. Aplicando logaritmo en base 1,1: t = log_1,1(M/P). -->
- [ ] B) $t = \frac{M}{1,1P}$ <!-- feedback: Incorrecto. Esto asume un crecimiento lineal, no compuesto (exponencial). -->
- [ ] C) $t = \ln(M - P) - 1,1$ <!-- feedback: Incorrecto. El despeje de una variable en el exponente requiere logaritmos, pero la estructura de esta opción es errónea. -->
- [ ] D) $t = (1,1)^{\frac{M}{P}}$ <!-- feedback: Incorrecto. Confundiste la base con el exponente en el despeje. -->

### Explicación Pedagógica
El interés compuesto es una aplicación directa de las funciones exponenciales. Para despejar el tiempo (el exponente), es necesario recurrir a su función inversa: el logaritmo.
