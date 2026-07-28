# Definitions of questions for Bolivia Math Grade 11
# We will define a massive structure for W01 to W10 and execute it.
# Let's ensure high pedagogical and math quality, with Bolivia context (Bs, local cities/names)
# Bloom: Remember (2), Understand (4), Apply (6), Analyze (4), Evaluate (4)
# Difficulty distribution: Q1-Q4 [D3-D4], Q5-Q10 [D5-D6], Q11-Q16 [D7-D8], Q17-Q20 [D9-D10]

ALIGNMENT = "MINEDU - Ley Educativa Avelino Siñani - Elizardo Pérez"

# Week 1: tema-w01 - numeros-reales
# Week 2: tema-w02 - potenciacion-radicacion
# Week 3: tema-w03 - logaritmos-propiedades
# Week 4: tema-w04 - expresiones-algebraicas
# Week 5: tema-w05 - ecuaciones-lineales
# Week 6: tema-w06 - sistemas-ecuaciones-lineales
# Week 7: tema-w07 - ecuaciones-cuadraticas
# Week 8: tema-w08 - inecuaciones-lineales-valor-absoluto
# Week 9: tema-w09 - funcion-lineal-afin
# Week 10: tema-w10 - funcion-cuadratica

W01_QUESTIONS = [
    {
        "num": 1,
        "difficulty": "D3",
        "bloom": "Remember",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.85,
        "contexto": "Roxana, estudiante de Sucre, está repasando las clasificaciones de los conjuntos numéricos y las propiedades fundamentales del sistema de los números reales.",
        "enunciado": "¿Cuál de las siguientes afirmaciones define de manera precisa el conjunto de los números irracionales?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "Es el conjunto de números que se pueden expresar como el cociente de dos enteros con denominador distinto de cero.", "feedback": "Incorrecto. Esta es la definición exacta de los números racionales, no de los irracionales."},
            {"correct": True, "letter": "B", "text": "Es el conjunto de números con infinitos decimales no periódicos que no se pueden escribir como fracción.", "feedback": "¡Correcto! Los irracionales, como pi o la raíz cuadrada de 2, tienen representaciones decimales infinitas no periódicas y no se pueden representar como el cociente de dos enteros."},
            {"correct": False, "letter": "C", "text": "Es el conjunto de números decimales periódicos puros o periódicos mixtos con signo positivo.", "feedback": "Incorrecto. Los decimales periódicos siempre se pueden convertir a fracción y por tanto son números racionales."},
            {"correct": False, "letter": "D", "text": "Es el conjunto de números que resulta únicamente al realizar la raíz cuadrada de cualquier número entero.", "feedback": "Incorrecto. Raíces cuadradas como la raíz de 4 dan como resultado un número entero, el cual es racional."}
        ],
        "explicacion": "El conjunto de los números irracionales (denotado como I) está constituido por todos los números reales que poseen infinitas cifras decimales no periódicas y que, por lo tanto, no pueden expresarse bajo la forma de una fracción a/b, donde a y b son enteros con b distinto de cero."
    },
    {
        "num": 2,
        "difficulty": "D3",
        "bloom": "Understand",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.80,
        "contexto": "Jhonny asiste a una feria en El Alto y quiere modelar matemáticamente los precios de dos productos agrícolas de los valles interandinos.",
        "enunciado": "Si representamos con el número real $x$ al precio de un kilo de oca, y con $y$ al precio de un kilo de chuño, ¿cuál propiedad de los números reales justifica que el costo total de comprar un kilo de cada producto sea el mismo sin importar el orden de la suma ($x + y = y + x$)?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "Propiedad asociativa de la adición.", "feedback": "Incorrecto. La asociatividad involucra tres o más términos agrupados, no el orden de dos términos."},
            {"correct": True, "letter": "B", "text": "Propiedad conmutativa de la adición.", "feedback": "¡Correcto! La propiedad conmutativa establece que el orden de los sumandos no altera la suma: x + y = y + x."},
            {"correct": False, "letter": "C", "text": "Propiedad distributiva respecto a la adición.", "feedback": "Incorrecto. La propiedad distributiva relaciona la multiplicación con la adición, lo cual no aplica en esta suma elemental."},
            {"correct": False, "letter": "D", "text": "Propiedad de existencia del elemento neutro.", "feedback": "Incorrecto. El elemento neutro de la adición es el cero, lo cual no justifica el cambio de orden entre dos variables."}
        ],
        "explicacion": "La propiedad conmutativa de la adición de números reales establece formalmente que para cualesquiera números reales $x$ e $y$, se cumple que $x + y = y + x$. Por tanto, el costo final de la compra es independiente del orden en que se sumen los precios de los productos."
    },
    {
        "num": 3,
        "difficulty": "D4",
        "bloom": "Understand",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.75,
        "contexto": "Un topógrafo de la alcaldía de La Paz necesita delimitar un tramo de terreno plano representándolo como un intervalo abierto en la recta de los números reales.",
        "enunciado": "Si el tramo de terreno abarca todos los números reales estrictamente mayores que $-2$ y estrictamente menores que $5$, ¿cuál es la notación de intervalo correcta y su correspondiente desigualdad matemática para representar este tramo?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[-2, 5] con la desigualdad -2 <= x <= 5", "feedback": "Incorrecto. Los corchetes denotan un intervalo cerrado, que incluye los extremos, pero el enunciado dice 'estrictamente mayores y estrictamente menores'."},
            {"correct": True, "letter": "B", "text": "(-2, 5) con la desigualdad -2 < x < 5", "feedback": "¡Correcto! Los paréntesis representan un intervalo abierto (no incluye extremos), lo cual coincide con las desigualdades estrictas <."},
            {"correct": False, "letter": "C", "text": "[-2, 5) con la desigualdad -2 <= x < 5", "feedback": "Incorrecto. Este es un intervalo semiabierto que incluye al extremo -2, contradiciendo la condición de ser estrictamente mayor que -2."},
            {"correct": False, "letter": "D", "text": "(-2, 5] con la desigualdad -2 < x <= 5", "feedback": "Incorrecto. Este intervalo incluye al extremo 5, lo cual no cumple la condición de ser estrictamente menor que 5."}
        ],
        "explicacion": "Un intervalo abierto se denota mediante paréntesis $(a, b)$ e incluye a todos los números reales estrictamente comprendidos entre los extremos, excluyendo a estos últimos. Matemáticamente se expresa con la doble desigualdad $a < x < b$. Por ende, la representación correcta es $(-2, 5)$ y $-2 < x < 5$."
    },
    {
        "num": 4,
        "difficulty": "D4",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.70,
        "contexto": "Un artesano de la zona andina de Oruro calcula el margen de error tolerado en el ancho de una manta tejida a mano.",
        "enunciado": "El ancho nominal de la manta debe ser de $120$ cm, con un margen de error máximo absoluto de $1.5$ cm. ¿Cuál de las siguientes expresiones con valor absoluto representa adecuadamente este intervalo de tolerancia para el ancho real $x$ de la manta?",
        "opciones": [
            {"correct": True, "letter": "A", "text": "|x - 120| <= 1.5", "feedback": "¡Correcto! El valor absoluto |x - 120| mide la distancia del ancho real x al nominal 120. Esta distancia debe ser menor o igual al error máximo permitido de 1.5."},
            {"correct": False, "letter": "B", "text": "|x + 120| <= 1.5", "feedback": "Incorrecto. Esta expresión sumaría los valores, lo cual no representa geométricamente la distancia de x a 120."},
            {"correct": False, "letter": "C", "text": "|x - 1.5| <= 120", "feedback": "Incorrecto. Esto significaría que la distancia de x a 1.5 debe ser menor o igual que 120, lo cual permitiría anchos absurdos como 50 cm."},
            {"correct": False, "letter": "D", "text": "|x - 120| >= 1.5", "feedback": "Incorrecto. El signo >= indicaría que el error debe ser mayor o igual a 1.5, lo cual representaría un margen de error mínimo, no máximo."}
        ],
        "explicacion": "La distancia entre dos números reales $a$ y $b$ se define matemáticamente mediante el valor absoluto de su diferencia, $|a - b|$. Si el ancho real es $x$ y el ancho deseado es $120$, el error es $|x - 120|$. Como el error aceptado es de máximo $1.5$ cm, la desigualdad correspondiente es $|x - 120| \\le 1.5$."
    },
    {
        "num": 5,
        "difficulty": "D5",
        "bloom": "Understand",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.68,
        "contexto": "Marisol, estudiante de bachillerato en Potosí, analiza la densidad de los números reales mediante comparaciones entre fracciones de uso común en mediciones físicas.",
        "enunciado": "Si ordenamos de menor a mayor los siguientes números reales: $a = -1.25$, $b = -\\frac{5}{4}$, $c = -1.3$ y $d = -\\frac{4}{3}$, ¿cuál es el ordenamiento correcto?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "d < c < a < b", "feedback": "Incorrecto. Se omitió que los números a y b son equivalentes, ya que -5/4 es exactamente -1.25."},
            {"correct": True, "letter": "B", "text": "d < c < a = b", "feedback": "¡Correcto! Al convertir todo a decimales: d = -1.333..., c = -1.300, y a = b = -1.250. Al ser negativos, el de mayor valor absoluto es el menor. Por tanto, -1.333... < -1.300 < -1.250."},
            {"correct": False, "letter": "C", "text": "a = b < c < d", "feedback": "Incorrecto. Esto asume erróneamente que a menor valor absoluto el número negativo es menor, lo cual es al revés."},
            {"correct": False, "letter": "D", "text": "c < d < a = b", "feedback": "Incorrecto. Compara de forma incorrecta d = -1.33 y c = -1.30. Como -1.33 está más a la izquierda en la recta real, d es menor que c."}
        ],
        "explicacion": "Convertimos los números racionales a su expresión decimal periódica o exacta para compararlos directamente:\n$a = -1.25$\n$b = -5/4 = -1.25$\n$c = -1.3$\n$d = -4/3 = -1.333...$\nEn la recta numérica de los reales negativos, un número es menor cuanto mayor sea su valor absoluto (está más a la izquierda). Comparando los valores absolutos: $1.333... > 1.3 > 1.25$. Por lo tanto, en orden de menor a mayor se tiene: $-1.333... < -1.3 < -1.25$, lo que se traduce en $d < c < a = b$."
    },
    {
        "num": 6,
        "difficulty": "D5",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.65,
        "contexto": "Un agrónomo en Santa Cruz de la Sierra mide el contenido de humedad de una parcela experimental de soya y registra dos intervalos viables para riego eficiente.",
        "enunciado": "El intervalo A de porcentaje de humedad óptimo es $[12.5, 18.2]$ y el intervalo B es $(14.0, 20.5]$. ¿Cuál es el intervalo de humedad que cumple con AMBOS criterios simultáneamente (intersección $A \\cap B$)?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[12.5, 20.5]", "feedback": "Incorrecto. Este intervalo representa la unión A U B, no la intersección de ambos."},
            {"correct": True, "letter": "B", "text": "(14.0, 18.2]", "feedback": "¡Correcto! La intersección está formada por los valores que pertenecen a ambos intervalos. Comienza justo después de 14.0 (abierto) y termina en 18.2 (cerrado, ya que 18.2 pertenece a ambos)."},
            {"correct": False, "letter": "C", "text": "[14.0, 18.2)", "feedback": "Incorrecto. El extremo 14.0 no está incluido en el intervalo B (que es abierto en ese extremo), por lo que debe ser abierto. El extremo 18.2 sí está incluido en ambos y por tanto debe ser cerrado."},
            {"correct": False, "letter": "D", "text": "(12.5, 14.0]", "feedback": "Incorrecto. Este intervalo contiene valores que pertenecen a A pero no a B, por lo que no es la intersección."}
        ],
        "explicacion": "La intersección $A \\cap B$ de dos intervalos es el conjunto de números reales que pertenecen simultáneamente a ambos. Para $A = [12.5, 18.2]$ y $B = (14.0, 20.5]$, el extremo inferior de la intersección debe ser el mayor de los extremos inferiores, es decir, $14.0$. Como $14.0$ es abierto en $B$, es abierto en la intersección. El extremo superior debe ser el menor de los extremos superiores, es decir, $18.2$. Como $18.2$ está contenido en ambos, es cerrado en la intersección. Así, $A \\cap B = (14.0, 18.2]$."
    },
    {
        "num": 7,
        "difficulty": "D6",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.60,
        "contexto": "En un laboratorio de química en Cochabamba, un investigador disuelve una sal andina en agua destilada y estima el rango exacto de temperatura de estabilidad de la solución.",
        "enunciado": "Si la temperatura de la solución $T$ (en grados Celsius) satisface la inecuación de valor absoluto $|T - 25| < 4$, ¿cuál es el rango de temperatura real en forma de intervalo abierto?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[-29, -21]", "feedback": "Incorrecto. Resolviste aplicando signos incorrectos al valor de referencia positivo."},
            {"correct": True, "letter": "B", "text": "(21, 29)", "feedback": "¡Correcto! Al resolver |T - 25| < 4 se obtiene -4 < T - 25 < 4. Sumando 25 a cada parte resulta 21 < T < 29, lo cual representa el intervalo abierto (21, 29)."},
            {"correct": False, "letter": "C", "text": "(25, 29)", "feedback": "Incorrecto. Este intervalo solo cubre la mitad superior de los valores permitidos por el valor absoluto."},
            {"correct": False, "letter": "D", "text": "[21, 29]", "feedback": "Incorrecto. Como la desigualdad es estrictamente menor (<), los extremos no están incluidos. El intervalo debe ser abierto, no cerrado."}
        ],
        "explicacion": "Para resolver la inecuación $|T - 25| < 4$, aplicamos la propiedad de los valores absolutos $|x| < a \\iff -a < x < a$. Esto nos da:\n$-4 < T - 25 < 4$\nSumando $25$ en todos los términos para despejar $T$:\n$-4 + 25 < T < 4 + 25 \\implies 21 < T < 29$\nLa solución es el intervalo abierto $(21, 29)$."
    },
    {
        "num": 8,
        "difficulty": "D5",
        "bloom": "Analyze",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.62,
        "contexto": "Walter, un analista financiero de La Paz, estudia las variaciones de la tasa de cambio implícita en transacciones comerciales informales de importación.",
        "enunciado": "Si una transacción comercial está garantizada por un fondo cuyo valor fluctúa según la inecuación cuadrática $x^2 - 4x - 12 < 0$, ¿cuál es el conjunto de números reales $x$ que mantienen estable esta transacción?",
        "opciones": [
            {"correct": True, "letter": "A", "text": "(-2, 6)", "feedback": "¡Correcto! Al factorizar la expresión se obtiene (x - 6)(x + 2) < 0. Los puntos críticos son x = -2 y x = 6. Analizando los signos en los intervalos, la expresión es negativa en el intervalo abierto (-2, 6)."},
            {"correct": False, "letter": "B", "text": "[-2, 6]", "feedback": "Incorrecto. La desigualdad es estrictamente menor (<), por lo que el intervalo debe ser abierto y no cerrado."},
            {"correct": False, "letter": "C", "text": "(-infinito, -2) U (6, +infinito)", "feedback": "Incorrecto. Este conjunto es donde la expresión cuadrática toma valores estrictamente positivos, no negativos."},
            {"correct": False, "letter": "D", "text": "(-6, 2)", "feedback": "Incorrecto. Se cometió un error en los signos al factorizar o calcular los puntos críticos de la ecuación."}
        ],
        "explicacion": "Para resolver $x^2 - 4x - 12 < 0$, factorizamos el trinomio buscando dos números que multiplicados den $-12$ y sumados den $-4$:\n$(x - 6)(x + 2) < 0$\nLos puntos críticos que anulan la expresión son $x = -2$ y $x = 6$. Dividimos la recta real en tres intervalos para evaluar el signo de $(x-6)(x+2)$:\n1) En $(-\\infty, -2)$, ambos factores son negativos, por lo que el producto es positivo.\n2) En $(-2, 6)$, el factor $(x-6)$ es negativo y $(x+2)$ es positivo, por lo que el producto es negativo.\n3) En $(6, \\infty)$, ambos factores son positivos, por lo que el producto es positivo.\nComo buscamos que sea estrictamente menor que cero, el intervalo solución es el abierto $(-2, 6)$."
    },
    {
        "num": 9,
        "difficulty": "D6",
        "bloom": "Analyze",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.58,
        "contexto": "Roxana investiga la veracidad de propiedades algebraicas complejas de los números reales para su proyecto escolar de ciencias.",
        "enunciado": "Si definimos los números reales $a$ y $b$ tales que $a < b$, ¿cuál de las siguientes proposiciones analíticas se cumple de manera universal para cualquier valor de $c \\in \\mathbb{R}$?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "a * c < b * c", "feedback": "Incorrecto. Esto solo es cierto si c es un número real positivo. Si c es negativo, el sentido de la desigualdad cambia."},
            {"correct": False, "letter": "B", "text": "a^2 < b^2", "feedback": "Incorrecto. No se cumple de forma universal. Por ejemplo, si a = -3 y b = -2 (donde -3 < -2), al elevar al cuadrado obtenemos 9 < 4, lo cual es falso."},
            {"correct": True, "letter": "C", "text": "a - c < b - c", "feedback": "¡Correcto! Restar o sumar cualquier número real c a ambos miembros de una desigualdad no cambia su sentido, independientemente de si c es positivo, negativo o cero."},
            {"correct": False, "letter": "D", "text": "1 / a > 1 / b", "feedback": "Incorrecto. Esto solo se cumple bajo ciertas restricciones de signos de a y b. Si a es negativo y b es positivo, no se cumple."}
        ],
        "explicacion": "La propiedad aditiva de las desigualdades de los números reales establece de manera universal que si $a < b$, entonces para cualquier número real $c \\in \\mathbb{R}$, se cumple que $a + c < b + c$. Al ser $c$ cualquier número real, si elegimos un valor negativo para sumar (o simplemente restamos), la relación $a - c < b - c$ se mantiene idéntica, preservando el sentido original de la desigualdad."
    },
    {
        "num": 10,
        "difficulty": "D6",
        "bloom": "Evaluate",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.55,
        "contexto": "Un programador de software de la Universidad Mayor de San Andrés (UMSA) evalúa la precisión del redondeo y las propiedades de distancia de números reales en el procesador.",
        "enunciado": "Si $x$ e $y$ son dos números reales cualesquiera, ¿cuál de las siguientes desigualdades fundamentales (conocida como desigualdad triangular) es analíticamente correcta y describe adecuadamente las relaciones de distancia en la recta real?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "|x + y| >= |x| + |y|", "feedback": "Incorrecto. La desigualdad triangular establece lo opuesto: el valor absoluto de una suma es menor o igual a la suma de los valores absolutos."},
            {"correct": True, "letter": "B", "text": "|x + y| <= |x| + |y|", "feedback": "¡Correcto! Esta es la formulación matemática de la desigualdad triangular. Representa que la magnitud de la suma de dos números es a lo sumo igual a la suma de sus magnitudes individuales."},
            {"correct": False, "letter": "C", "text": "|x - y| <= |x| - |y|", "feedback": "Incorrecto. Esta relación no es correcta algebraicamente para todo número real; el lado derecho puede incluso ser negativo mientras que el izquierdo es siempre no negativo."},
            {"correct": False, "letter": "D", "text": "|x + y| = |x| + |y|", "feedback": "Incorrecto. Solo se cumple la igualdad estricta si ambos números x e y tienen el mismo signo o si al menos uno de ellos es cero."}
        ],
        "explicacion": "La desigualdad triangular es un teorema fundamental en el sistema de los números reales y espacios métricos, que enuncia que para cualesquiera $x, y \\in \\mathbb{R}$, se cumple que $|x + y| \\le |x| + |y|$. Físicamente representa que la distancia directa entre dos puntos es menor o igual a la suma de las distancias intermedias."
    },
    {
        "num": 11,
        "difficulty": "D7",
        "bloom": "Remember",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.52,
        "contexto": "Un profesor de matemáticas del Colegio Nacional Ayacucho en La Paz introduce el concepto del Axioma del Supremo como la propiedad que distingue a los números reales de los números racionales.",
        "enunciado": "De acuerdo con la estructura formal de los números reales, ¿cuál es el enunciado correcto que define el Axioma del Supremo?",
        "opciones": [
            {"correct": True, "letter": "A", "text": "Todo conjunto no vacío de números reales que esté acotado superiormente posee un supremo que pertenece al conjunto de los números reales.", "feedback": "¡Correcto! El Axioma del Supremo (o propiedad de completitud) establece que si un subconjunto no vacío de R está acotado superiormente, tiene una menor cota superior (supremo) en R."},
            {"correct": False, "letter": "B", "text": "Todo conjunto no vacío de números racionales tiene siempre un elemento máximo que es entero.", "feedback": "Incorrecto. Los conjuntos de números racionales acotados no siempre tienen máximo y menos aún tiene que ser entero."},
            {"correct": False, "letter": "C", "text": "La suma de cualquier número irracional con un número racional siempre es un número entero positivo.", "feedback": "Incorrecto. La suma de un racional y un irracional es siempre un número irracional, no un entero."},
            {"correct": False, "letter": "D", "text": "El producto de dos números reales negativos es siempre un número racional negativo.", "feedback": "Incorrecto. El producto de dos reales negativos es siempre positivo y puede ser racional o irracional."}
        ],
        "explicacion": "El Axioma del Supremo, también llamado principio de completitud de los números reales, es la propiedad fundamental que garantiza que en la recta real no existen 'huecos'. Establece formalmente que: Todo conjunto $S \\subset \\mathbb{R}$ no vacío y acotado superiormente tiene un supremo en $\\mathbb{R}$ (es decir, existe $u \\in \\mathbb{R}$ tal que $u = \\sup S$)."
    },
    {
        "num": 12,
        "difficulty": "D7",
        "bloom": "Understand",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.50,
        "contexto": "Un estudiante de la Universidad Mayor de San Simón (UMSS) en Cochabamba analiza el concepto de vecindades simétricas de un punto en el contexto de límites de funciones reales.",
        "enunciado": "Si una vecindad simétrica de centro $a = 3$ y radio $\\delta = 0.1$ se define como el conjunto de puntos $x$ tales que la distancia entre $x$ y $3$ es menor que $0.1$, ¿cuál de los siguientes intervalos representa de manera equivalente a esta vecindad?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[2.9, 3.1]", "feedback": "Incorrecto. Los corchetes indican un intervalo cerrado, pero el concepto de vecindad simétrica se define mediante una desigualdad estricta (<), por lo que el intervalo debe ser abierto."},
            {"correct": True, "letter": "B", "text": "(2.9, 3.1)", "feedback": "¡Correcto! La condición de distancia menor a 0.1 se escribe |x - 3| < 0.1, lo que equivale a -0.1 < x - 3 < 0.1. Sumando 3, obtenemos 2.9 < x < 3.1, que corresponde al intervalo abierto (2.9, 3.1)."},
            {"correct": False, "letter": "C", "text": "(2.8, 3.2)", "feedback": "Incorrecto. Aquí se usó un radio de 0.2 en lugar de 0.1, expandiendo incorrectamente la vecindad."},
            {"correct": False, "letter": "D", "text": "(2.9, 3.0)", "feedback": "Incorrecto. Este intervalo no es simétrico respecto al centro a = 3, ya que excluye el subintervalo de 3.0 a 3.1."}
        ],
        "explicacion": "Una vecindad simétrica (o entorno) de centro $a$ y radio $\\delta > 0$ se define analíticamente mediante el conjunto de números reales que cumplen con la inecuación $|x - a| < \\delta$. Para $a = 3$ y $\\delta = 0.1$, se tiene $|x - 3| < 0.1$. Al resolver esta desigualdad obtenemos $-0.1 < x - 3 < 0.1 \\implies 2.9 < x < 3.1$. En notación de intervalos, se representa como el intervalo abierto $(2.9, 3.1)$."
    },
    {
        "num": 13,
        "difficulty": "D8",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.45,
        "contexto": "En la facultad de Ingeniería de la UMSA, un estudiante diseña una viga de acero sometida a cargas mecánicas y obtiene una ecuación para los puntos de esfuerzo límite.",
        "enunciado": "Si los esfuerzos seguros de la viga se encuentran en el conjunto de valores de $x$ que NO satisfacen la inecuación de valor absoluto $|2x - 5| >= 9$, ¿cuál es el intervalo de números reales para los valores seguros de $x$?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "(-infinito, -2] U [7, +infinito)", "feedback": "Incorrecto. Este es el conjunto de soluciones de la inecuación original, es decir, representa los esfuerzos NO seguros de la viga."},
            {"correct": True, "letter": "B", "text": "(-2, 7)", "feedback": "¡Correcto! Los valores seguros de x son aquellos que NO cumplen con |2x - 5| >= 9, lo cual equivale a buscar los valores que sí cumplen con |2x - 5| < 9. Resolviendo obtenemos -9 < 2x - 5 < 9 -> -4 < 2x < 14 -> -2 < x < 7, o el intervalo (-2, 7)."},
            {"correct": False, "letter": "C", "text": "[-2, 7]", "feedback": "Incorrecto. Como la condición de peligro incluye la igualdad (>=), la condición de seguridad debe ser estrictamente menor (<), resultando en un intervalo abierto."},
            {"correct": False, "letter": "D", "text": "(-7, 2)", "feedback": "Incorrecto. Se cometió un error en los signos algebraicos al despejar la x de las inecuaciones lineales resultantes."}
        ],
        "explicacion": "El enunciado nos pide encontrar el conjunto de valores que NO satisfacen $|2x - 5| \\ge 9$. El complemento lógico de esta inecuación es:\n$|2x - 5| < 9$\nResolvemos esta desigualdad de valor absoluto:\n$-9 < 2x - 5 < 9$\nSumamos $5$ en todos los términos:\n$-4 < 2x < 14$\nDividimos entre $2$:\n$-2 < x < 7$\nEn notación de intervalos, la región segura corresponde al intervalo abierto $(-2, 7)$."
    },
    {
        "num": 14,
        "difficulty": "D7",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.48,
        "contexto": "Un agricultor en los Yungas de La Paz planifica la distribución de agua para sus parcelas de café, basándose en flujos mínimos y máximos de la vertiente de la montaña.",
        "enunciado": "Si el flujo diario óptimo $F$ en litros por segundo debe cumplir simultáneamente las condiciones $3F - 4 >= 11$ y $2F + 1 < 17$, ¿cuál es el intervalo semiabierto de flujo real que cumple ambos requisitos?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[5, 9]", "feedback": "Incorrecto. El extremo superior 8 es el límite que resulta de la segunda inecuación, no 9. Además, el extremo superior debe ser abierto ya que la desigualdad es estrictamente menor (<)."},
            {"correct": True, "letter": "B", "text": "[5, 8)", "feedback": "¡Correcto! De la primera inecuación: 3F >= 15 -> F >= 5. De la segunda: 2F < 16 -> F < 8. El conjunto solución simultáneo es 5 <= F < 8, es decir, el intervalo semiabierto [5, 8)."},
            {"correct": False, "letter": "C", "text": "(5, 8]", "feedback": "Incorrecto. El extremo inferior 5 debe estar cerrado debido a que la primera inecuación incluye la igualdad (>=)."},
            {"correct": False, "letter": "D", "text": "[15, 16)", "feedback": "Incorrecto. No se dividieron las constantes por los coeficientes de la variable F al realizar los despejes."}
        ],
        "explicacion": "Resolvemos el sistema de inecuaciones lineales de manera individual:\n1) $3F - 4 \\ge 11 \\implies 3F \\ge 15 \\implies F \\ge 5$. En forma de intervalo: $[5, \\infty)$.\n2) $2F + 1 < 17 \\implies 2F < 16 \\implies F < 8$. En forma de intervalo: $(-\\infty, 8)$.\nBuscamos la intersección de ambas soluciones:\n$[5, \\infty) \\cap (-\\infty, 8) = [5, 8)$."
    },
    {
        "num": 15,
        "difficulty": "D8",
        "bloom": "Analyze",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.42,
        "contexto": "Un analista de sistemas hidráulicos en la represa de Misicuni (Cochabamba) modela el coeficiente de presión máxima permitida en las tuberías de distribución.",
        "enunciado": "Si el coeficiente de presión $p$ está restringido por la inecuación racional $\\frac{p - 3}{p + 5} <= 0$, ¿cuál es el intervalo exacto de números reales que describe los valores de presión seguros?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "[-5, 3]", "feedback": "Incorrecto. En p = -5, el denominador se hace cero, lo que causa una división por cero. Por lo tanto, -5 debe excluirse del intervalo (debe ser abierto en ese extremo)."},
            {"correct": True, "letter": "B", "text": "(-5, 3]", "feedback": "¡Correcto! Los puntos críticos son p = 3 y p = -5. Evaluando los signos del cociente, el resultado es menor o igual a cero en el intervalo semiabierto (-5, 3]. Se excluye el -5 para evitar división por cero, y se incluye el 3 porque anula el numerador."},
            {"correct": False, "letter": "C", "text": "[-5, 3)", "feedback": "Incorrecto. Se incluyó erróneamente el extremo indeterminado -5 y se excluyó de manera incorrecta el punto 3, que sí satisface la igualdad a cero."},
            {"correct": False, "letter": "D", "text": "(-infinito, -5) U [3, +infinito)", "feedback": "Incorrecto. Este conjunto representa los valores donde la fracción es mayor o igual a cero, no menor o igual a cero."}
        ],
        "explicacion": "Para resolver $\\frac{p - 3}{p + 5} \\le 0$, identificamos los puntos críticos donde el numerador y el denominador cambian de signo: $p = 3$ y $p = -5$. Analizamos los signos del cociente en los tres intervalos creados por estos puntos:\n1) En $(-\\infty, -5)$: el numerador $(p-3)$ es negativo y el denominador $(p+5)$ es negativo, por lo que el cociente es positivo.\n2) En $(-5, 3]$: el numerador es negativo o cero y el denominador es positivo, por lo que el cociente es negativo o cero. Satisface la condición.\n3) En $(3, \\infty)$: ambos términos son positivos, por lo que el cociente es positivo.\nEl valor $p = -5$ se debe excluir estrictamente porque anula el denominador. El valor $p = 3$ sí se incluye porque cumple la igualdad a cero. La solución es el intervalo $(-5, 3]$."
    },
    {
        "num": 16,
        "difficulty": "D8",
        "bloom": "Evaluate",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.40,
        "contexto": "Un estudiante de ingeniería financiera analiza la convergencia de una serie de retornos reales acotados en la Bolsa de Valores de Bolivia.",
        "enunciado": "Sea el conjunto $S = \\left\\{ x \\in \\mathbb{R} \\ \\big| \\ x = 1 - \\frac{1}{n}, \\ n \\in \\mathbb{N} \\right\\}$. ¿Cuáles son los valores exactos del supremo y el ínfimo de este conjunto de números reales en el espacio continuo?",
        "opciones": [
            {"correct": True, "letter": "A", "text": "Supremo = 1, Ínfimo = 0", "feedback": "¡Correcto! Para n = 1, x = 0 (que es el valor mínimo, ínfimo). Conforme n crece infinitamente, 1/n tiende a cero, de manera que los elementos se aproximan a 1 pero nunca lo alcanzan. Así, 1 es la menor de las cotas superiores (supremo)."},
            {"correct": False, "letter": "B", "text": "Supremo = 1, Ínfimo = No tiene ínfimo", "feedback": "Incorrecto. El conjunto sí está acotado inferiormente por 0, el cual se alcanza cuando n = 1, por lo que el ínfimo es 0."},
            {"correct": False, "letter": "C", "text": "Supremo = No tiene supremo, Ínfimo = 0", "feedback": "Incorrecto. Por el Axioma del Supremo, al estar acotado superiormente por cualquier número mayor o igual a 1, debe tener un supremo real, el cual es exactamente 1."},
            {"correct": False, "letter": "D", "text": "Supremo = 0, Ínfimo = -1", "feedback": "Incorrecto. Evaluaste de manera equivocada la expresión al sustituir valores positivos de n naturales (1, 2, 3...)."}
        ],
        "explicacion": "Evaluamos el conjunto $S$ para los primeros valores de $n \\in \\mathbb{N}$:\nPara $n=1: x = 1 - 1 = 0$\nPara $n=2: x = 1 - 1/2 = 0.5$\nPara $n=3: x = 1 - 1/3 \\approx 0.67$\n... Conforme $n \\to \\infty$, el término $\\frac{1}{n} \\to 0$, por lo que $x \\to 1$.\nEl conjunto de valores es $S = \\{0, 0.5, 0.67, ..., 1^{-}\\big\\}$.\nEl elemento mínimo es $0$, por lo que el ínfimo es $0$. El conjunto está acotado superiormente por $1$. Como ningún elemento es mayor que $1$ y se aproxima infinitamente a él, la menor de las cotas superiores (supremo) es $1$."
    },
    {
        "num": 17,
        "difficulty": "D9",
        "bloom": "Apply",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.35,
        "contexto": "Un ingeniero ambiental en Potosí calcula el rango crítico de acidez del suelo afectado por efluentes mineros utilizando una inecuación de valor absoluto con dos variables lineales.",
        "enunciado": "Si el índice de acidez $x$ cumple con la inecuación racional con valor absoluto $\\left| \\frac{2x - 1}{x + 3} \\right| < 1$, ¿cuál es el intervalo exacto de números reales que satisface esta restricción crítica?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "(-3, 4/3)", "feedback": "Incorrecto. Aunque -3 es un punto de discontinuidad, el conjunto de soluciones correcto se encuentra comprendido en un intervalo diferente tras analizar la inecuación cuadrática equivalente o las inecuaciones partidas."},
            {"correct": True, "letter": "B", "text": "(-2/3, 4)", "feedback": "¡Correcto! Al resolver |(2x - 1)/(x + 3)| < 1, escribimos -1 < (2x - 1)/(x + 3) < 1. Resolviendo cada lado del sistema, se llega a que la solución común es el intervalo abierto (-2/3, 4)."},
            {"correct": False, "letter": "C", "text": "(-infinito, -2/3) U (4, +infinito)", "feedback": "Incorrecto. Este conjunto representa la solución de la inecuación opuesta, es decir, donde el valor absoluto de la fracción es estrictamente mayor que 1."},
            {"correct": False, "letter": "D", "text": "(-4, 2/3)", "feedback": "Incorrecto. Se cometieron errores algebraicos en el cambio de signos de las constantes y coeficientes durante el despeje sistemático."}
        ],
        "explicacion": "Para resolver $\\left| \\frac{2x - 1}{x + 3} \\right| < 1$, planteamos la doble desigualdad:\n$-1 < \\frac{2x - 1}{x + 3} < 1$\nEsto equivale al sistema de dos inecuaciones:\n1) $\\frac{2x - 1}{x + 3} > -1 \\implies \\frac{2x - 1}{x + 3} + 1 > 0 \\implies \\frac{3x + 2}{x + 3} > 0$\nLos puntos críticos son $x = -3$ y $x = -2/3$. Analizando signos, la solución de (1) es $x \\in (-\\infty, -3) \\cup (-2/3, \\infty)$.\n2) $\\frac{2x - 1}{x + 3} < 1 \\implies \\frac{2x - 1}{x + 3} - 1 < 0 \\implies \\frac{x - 4}{x + 3} < 0$\nLos puntos críticos son $x = -3$ y $x = 4$. Analizando signos, la solución de (2) es $x \\in (-3, 4)$.\nBuscamos la intersección de ambas soluciones:\n$((-\\infty, -3) \\cup (-2/3, \\infty)) \\cap (-3, 4) = (-2/3, 4)$."
    },
    {
        "num": 18,
        "difficulty": "D9",
        "bloom": "Analyze",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.32,
        "contexto": "Un diseñador de algoritmos numéricos en Cochabamba analiza el comportamiento del error de aproximación polinomial en intervalos simétricos del dominio de los números reales.",
        "enunciado": "Si el error de aproximación $E$ para un conjunto de datos espaciales cumple con la inecuación de valor absoluto anidado $||x - 3| - 2| < 1$, ¿cuál es la unión de intervalos abiertos que representa todos los valores permitidos para el parámetro de ajuste $x$?",
        "opciones": [
            {"correct": True, "letter": "A", "text": "(0, 2) U (4, 6)", "feedback": "¡Correcto! Al abrir el valor absoluto externo obtenemos -1 < |x - 3| - 2 < 1. Sumando 2 en cada parte, resulta 1 < |x - 3| < 3. Esto se divide en dos casos: caso A (1 < x - 3 < 3 -> 4 < x < 6) y caso B (-3 < x - 3 < -1 -> 0 < x < 2). La unión de ambos es (0, 2) U (4, 6)."},
            {"correct": False, "letter": "B", "text": "(2, 4) U (6, 8)", "feedback": "Incorrecto. El desplazamiento del centro y la aplicación de los límites de valor absoluto anidado no corresponden con la solución geométrica simétrica respecto al punto 3."},
            {"correct": False, "letter": "C", "text": "[0, 2] U [4, 6]", "feedback": "Incorrecto. Se utilizaron intervalos cerrados, pero las desigualdades de la expresión son estrictas (<), de modo que los extremos no están incluidos."},
            {"correct": False, "letter": "D", "text": "(-2, 0) U (2, 4)", "feedback": "Incorrecto. Se cometió un error fundamental en la traslación de los puntos críticos correspondientes a la simetría de la recta real."}
        ],
        "explicacion": "Resolvemos la inecuación de valor absoluto anidado:\n$||x - 3| - 2| < 1 \\implies -1 < |x - 3| - 2 < 1$\nSumamos $2$ en todos los miembros:\n$1 < |x - 3| < 3$\nEsto equivale a que la distancia de $x$ a $3$ debe ser estrictamente mayor que $1$ y menor que $3$. Lo desglosamos en dos partes:\nParte 1: $|x - 3| < 3 \\implies -3 < x - 3 < 3 \\implies 0 < x < 6$\nParte 2: $|x - 3| > 1 \\implies x - 3 > 1$ ó $x - 3 < -1 \\implies x > 4$ ó $x < 2$\nIntersecando ambas condiciones (debe estar entre $0$ y $6$, pero fuera del intervalo $[2, 4]$):\nLa intersección nos da los intervalos abiertos $(0, 2) \\cup (4, 6)$."
    },
    {
        "num": 19,
        "difficulty": "D10",
        "bloom": "Evaluate",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.28,
        "contexto": "Un astrofísico en el observatorio de Tarija investiga la métrica de convergencia de una órbita y necesita demostrar formalmente una propiedad analítica del ínfimo y supremo de la recta real.",
        "enunciado": "Si $A$ y $B$ son dos conjuntos de números reales no vacíos acotados tales que para cada $a \\in A$ y cada $b \\in B$ se cumple que $a <= b$, ¿cuál de las siguientes proposiciones lógicas es analíticamente correcta y rigurosa en el análisis real?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "sup(A) > inf(B) necesariamente, debido a que los elementos individuales pueden superponerse.", "feedback": "Incorrecto. La condición de que todo elemento de A sea menor o igual a todo elemento de B impide que la cota superior menor de A supere a la cota inferior mayor de B."},
            {"correct": True, "letter": "B", "text": "sup(A) <= inf(B), porque cada b en B actúa como una cota superior para el conjunto A, y por ende el supremo de A no puede ser mayor que ninguna de estas cotas.", "feedback": "¡Correcto! Para cada b en B, b es cota superior de A, por lo tanto sup(A) <= b. Como esta relación se cumple para todo b en B, entonces sup(A) es una cota inferior para B, de modo que sup(A) <= inf(B)."},
            {"correct": False, "letter": "C", "text": "sup(A) = inf(B) para cualquier par de conjuntos que cumplan con la propiedad descrita.", "feedback": "Incorrecto. No necesariamente son iguales. Por ejemplo, si A = (0, 1) y B = (2, 3), se cumple a <= b para todo elemento, pero sup(A) = 1 y inf(B) = 2, que son estrictamente desiguales."},
            {"correct": False, "letter": "D", "text": "No se puede establecer ninguna relación analítica entre sup(A) e inf(B) sin conocer los elementos discretos del conjunto.", "feedback": "Incorrecto. Por las propiedades fundamentales de completitud e ínfimos/supremos en R, se puede establecer con total rigor la relación de orden generalizada."}
        ],
        "explicacion": "Dado que para todo $a \\in A$ y para todo $b \\in B$ se cumple que $a \\le b$, fijamos un elemento arbitrario $b \\in B$. Para este $b$, se tiene que $a \\le b$ para todo $a \\in A$. Esto significa que $b$ es una cota superior del conjunto $A$. Por definición de supremo (menor de las cotas superiores), se cumple que $\\sup(A) \\le b$.\nDado que la desigualdad anterior, $\\sup(A) \\le b$, es válida para cualquier elección de $b \\in B$, se deduce que el número real $\\sup(A)$ es una cota inferior del conjunto $B$. Por la definición de ínfimo (mayor de las cotas inferiores), se concluye rigurosamente que $\\sup(A) \\le \\inf(B)$."
    },
    {
        "num": 20,
        "difficulty": "D10",
        "bloom": "Evaluate",
        "icfes": "Pensamiento Numérico y Sistemas de Datos",
        "expected_success": 0.25,
        "contexto": "Un matemático puro de la Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (Sucre) realiza una investigación sobre la topología del conjunto de Cantor y su relación con la recta real.",
        "enunciado": "Si consideramos el conjunto de números reales en el intervalo cerrado $[0, 1]$, ¿cuál es la propiedad topológica que describe el hecho de que todo número real puede aproximarse con precisión infinita mediante una sucesión de números racionales?",
        "opciones": [
            {"correct": False, "letter": "A", "text": "El conjunto de los números racionales es cerrado en el intervalo cerrado [0, 1].", "feedback": "Incorrecto. Los racionales no forman un conjunto cerrado; su clausura son todos los números reales, ya que hay puntos de acumulación irracionales."},
            {"correct": True, "letter": "B", "text": "El conjunto de los números racionales es denso en el conjunto de los números reales (y en cualquier intervalo no vacío).", "feedback": "¡Correcto! La propiedad de densidad de los racionales (Q) en R establece que entre cualesquiera dos números reales existe siempre un número racional, lo que implica que todo real es punto de acumulación de Q."},
            {"correct": False, "letter": "C", "text": "El conjunto de los números racionales es un conjunto numerable y por tanto está acotado por arriba.", "feedback": "Incorrecto. Aunque Q es numerable, la numerabilidad no tiene relación directa con la aproximación métrica continua o la densidad topológica en el intervalo."},
            {"correct": False, "letter": "D", "text": "Los números irracionales son un conjunto discreto dentro de la recta real.", "feedback": "Incorrecto. Los irracionales no son un conjunto discreto; también son densos en los números reales."}
        ],
        "explicacion": "La propiedad de que cualquier número real en el intervalo $[0, 1]$ (y en todo $\\mathbb{R}$) puede aproximarse tanto como se desee por números racionales se conoce en topología y análisis matemático como la densidad de $\\mathbb{Q}$ en $\\mathbb{R}$. Formalmente, un conjunto $D$ es denso en un espacio métrico $X$ si la clausura de $D$ es igual a $X$, lo cual significa que cualquier vecindad de un elemento de $X$ contiene al menos un elemento de $D$."
    }
]
