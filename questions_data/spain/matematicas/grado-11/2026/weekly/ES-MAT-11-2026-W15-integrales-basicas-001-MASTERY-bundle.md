---
id: "ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle"
country: "spain"
grado: 11
asignatura: "matematicas"
tema: "integrales-basicas"
periodo: "weekly"
week: "W15"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "Bachillerato Espana / EBAU 2026"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

## Question 1 [D3-D4]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.85
**Contexto:** Un estudiante de 1º de Bachillerato en Madrid comienza el bloque de análisis integral, aprendiendo el concepto de primitiva.

### Enunciado
¿Cuál es la definición de una primitiva $F(x)$ de una función $f(x)$?

### Opciones
- [ ] A) Es la función que resulta de elevar $f(x)$ al cuadrado. <!-- feedback: Operación incorrecta. -->
- [x] B) Es una función cuya derivada es igual a $f(x)$, es decir, $F'(x) = f(x)$. <!-- feedback: Correcto. La integración es el proceso inverso a la derivación. -->
- [ ] C) Es la inversa de la función $f(x)$ respecto a la composición. <!-- feedback: Esta es la función inversa $f^{-1}(x)$, no la primitiva. -->
- [ ] D) Es el límite de la función $f(x)$ cuando $x$ tiende a infinito. <!-- feedback: Definición incorrecta. -->

### Explicacion Pedagogica
Integrar es hallar una función conociendo su tasa de variación. Por ejemplo, si la derivada es $2x$, la primitiva es $x^2$ (más una constante).

---

## Question 2 [D3-D4]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Comunicación y Razonamiento
**Expected_Success:** 0.82
**Contexto:** En un instituto de Valencia, se explica por qué siempre añadimos una constante $C$ al final de las integrales indefinidas.

### Enunciado
¿Cuál es la razón matemática por la cual se añade la constante de integración $C$ en una integral indefinida?

### Opciones
- [ ] A) Porque la integral siempre debe dar un resultado positivo. <!-- feedback: El resultado puede ser negativo. -->
- [ ] B) Porque la integral es una función exponencial. <!-- feedback: No necesariamente. -->
- [x] C) Porque la derivada de cualquier constante es cero, y existen infinitas primitivas que difieren solo en una constante. <!-- feedback: Correcto. Todas las funciones $F(x) + C$ tienen la misma derivada $f(x)$. -->
- [ ] D) Es una convención sin significado real. <!-- feedback: Tiene un significado fundamental en la solución de ecuaciones diferenciales. -->

### Explicacion Pedagogica
Al derivar, perdemos la información sobre el término constante. Al integrar, debemos representar todas las posibles funciones originales mediante la familia de curvas $F(x) + C$.

---

## Question 3 [D3-D4]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.80
**Contexto:** Un estudiante aplica la regla de la potencia para integrales.

### Enunciado
¿Cuál es la integral indefinida de la función $f(x) = x^n$, suponiendo $n \neq -1$?

### Opciones
- [ ] A) $n \cdot x^{n-1} + C$ <!-- feedback: Esta es la regla para la derivada. -->
- [x] B) $\frac{x^{n+1}}{n+1} + C$ <!-- feedback: Correcto. Al integrar, sumamos 1 al exponente y dividimos por el nuevo exponente. -->
- [ ] C) $x^{n+1} + C$ <!-- feedback: Falta dividir por el nuevo exponente. -->
- [ ] D) $\ln(x^n) + C$ <!-- feedback: Regla incorrecta. -->

### Explicacion Pedagogica
La regla de la potencia para integrales es el proceso inverso a la regla de la potencia para derivadas. Es fundamental para integrar polinomios.

---

## Question 4 [D3-D4]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Modelización y Comunicación
**Expected_Success:** 0.78
**Contexto:** Se analiza el caso especial de la integral de la función recíproca.

### Enunciado
¿Cuál es la integral indefinida de la función $f(x) = \frac{1}{x}$ para $x > 0$?

### Opciones
- [ ] A) $\frac{x^0}{0} + C$ <!-- feedback: La regla de la potencia falla para n = -1 porque el denominador se anula. -->
- [x] B) $\ln(x) + C$ <!-- feedback: Correcto. La primitiva de $1/x$ es el logaritmo neperiano de x. -->
- [ ] C) $e^x + C$ <!-- feedback: La primitiva de e^x es e^x. -->
- [ ] D) $-1/x^2 + C$ <!-- feedback: Esta es la derivada de 1/x. -->

### Explicacion Pedagogica
La función $1/x$ es la única potencia de $x$ cuya integral no sigue la regla general de sumarle uno al exponente, resultando en una función logarítmica.

---

## Question 5 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.75
**Contexto:** En una clase de Matemáticas I en Bilbao, se practica la integración de polinomios sencillos.

### Enunciado
Halla la integral indefinida: $\int (3x^2 + 4x - 5) \, dx$.

### Opciones
- [ ] A) $x^3 + 2x^2 + C$ <!-- feedback: Falta el término correspondiente a la constante -5. -->
- [x] B) $x^3 + 2x^2 - 5x + C$ <!-- feedback: Correcto. Integrando término a término: $3(x^3/3) + 4(x^2/2) - 5x = x^3 + 2x^2 - 5x$. -->
- [ ] C) $6x + 4 + C$ <!-- feedback: Se ha derivado en lugar de integrar. -->
- [ ] D) $x^3 + 4x^2 - 5x + C$ <!-- feedback: Error al integrar el término 4x. -->

### Explicacion Pedagogica
La integral de una suma es la suma de las integrales de cada término. Aplicamos la regla de la potencia a cada sumando de forma independiente.

---

## Question 6 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.72
**Contexto:** Un estudiante en Zaragoza debe integrar una función con exponente fraccionario.

### Enunciado
Calcula la integral: $\int \sqrt{x} \, dx$.

### Opciones
- [ ] A) $\frac{1}{2\sqrt{x}} + C$ <!-- feedback: Esta es la derivada de la raíz de x. -->
- [ ] B) $\frac{1}{2} x^{1/2} + C$ <!-- feedback: Error en la aplicación de la regla. -->
- [x] C) $\frac{2}{3} x^{3/2} + C$ <!-- feedback: Correcto. $x^{1/2} \to \frac{x^{1/2+1}}{1/2+1} = \frac{x^{3/2}}{3/2} = \frac{2}{3}x^{3/2}$. -->
- [ ] D) $x^{3/2} + C$ <!-- feedback: Falta el coeficiente resultante de la división. -->

### Explicacion Pedagogica
Para integrar radicales, primero los escribimos como potencias de exponente fraccionario ($\sqrt{x} = x^{1/2}$) y luego aplicamos la regla general de integración.

---

## Question 7 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.70
**Contexto:** Se introducen las integrales inmediatas de funciones trigonométricas.

### Enunciado
¿Cuál es el valor de $\int \cos(x) \, dx$?

### Opciones
- [ ] A) $\text{sen}(x)$ <!-- feedback: Correcto, pero falta la constante de integración. -->
- [x] B) $\text{sen}(x) + C$ <!-- feedback: Correcto. La derivada del seno es el coseno. -->
- [ ] C) $-\text{sen}(x) + C$ <!-- feedback: Esta es la derivada del coseno. -->
- [ ] D) $\cos(x) + C$ <!-- feedback: Solo la función exponencial de base e es su propia primitiva. -->

### Explicacion Pedagogica
Es fundamental no confundir los signos al integrar funciones trigonométricas. Recordamos que la derivada del seno es el coseno (positivo), por lo que la integral del coseno es el seno (positivo).

---

## Question 8 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v8
**Bloom:** Understand
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.68
**Contexto:** Un estudiante analiza la integral de una función exponencial de base distinta de $e$.

### Enunciado
¿Cuál es la primitiva de la función $f(x) = 2^x$?

### Opciones
- [ ] A) $2^x \cdot \ln(2) + C$ <!-- feedback: Esta es la derivada de 2^x. -->
- [x] B) $\frac{2^x}{\ln(2)} + C$ <!-- feedback: Correcto. Al integrar una exponencial, se divide por el logaritmo neperiano de la base. -->
- [ ] C) $\frac{x^2}{2} + C$ <!-- feedback: Error al confundir función exponencial con función potencia. -->
- [ ] D) $2^x + C$ <!-- feedback: Solo válido si la base fuera el número e. -->

### Explicacion Pedagogica
Para funciones exponenciales $a^x$, la regla de integración requiere compensar el factor $\ln(a)$ que aparecería al derivar, por lo que dividimos por dicho valor.

---

## Question 9 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.65
**Contexto:** Un ingeniero en Sevilla calcula la velocidad a partir de la aceleración constante $a = 9,8 \text{ m/s}^2$.

### Enunciado
Si la velocidad inicial es $v(0) = 10 \text{ m/s}$, halla la función de velocidad $v(t)$ integrando la aceleración.

### Opciones
- [ ] A) $v(t) = 9,8t$ <!-- feedback: Falta la constante de integración (velocidad inicial). -->
- [x] B) $v(t) = 9,8t + 10$ <!-- feedback: Correcto. $\int 9,8 \, dt = 9,8t + C$. Como $v(0)=10$, entonces $C=10$. -->
- [ ] C) $v(t) = 4,9t^2 + 10$ <!-- feedback: Esta sería la función de posición si v era la aceleración. -->
- [ ] D) $v(t) = 10t + 9,8$ <!-- feedback: Error en la asignación de los valores. -->

### Explicacion Pedagogica
Los problemas de condiciones iniciales permiten determinar el valor exacto de la constante $C$ mediante un dato conocido del problema físico o geométrico.

---

## Question 10 [D5-D6]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.62
**Contexto:** Un estudiante en Barcelona halla la familia de curvas cuyas tangentes tienen pendiente $2x + 1$.

### Enunciado
¿Cuál es la ecuación de la curva que pasa por el punto $(1, 5)$?

### Opciones
- [ ] A) $y = x^2 + x + C$ <!-- feedback: Esta es la familia general, falta hallar C. -->
- [x] B) $y = x^2 + x + 3$ <!-- feedback: Correcto. $\int (2x+1)dx = x^2+x+C$. En $(1,5): 1^2+1+C=5 \Rightarrow 2+C=5 \Rightarrow C=3$. -->
- [ ] C) $y = 2x^2 + x + 2$ <!-- feedback: Error al integrar el primer término. -->
- [ ] D) $y = x^2 + x + 5$ <!-- feedback: Error al calcular el valor de C. -->

### Explicacion Pedagogica
Integrar la función de pendiente nos devuelve la función original de la curva. El punto por el que pasa nos sirve para fijar la constante de integración.

---

## Question 11 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.60
**Contexto:** Se introducen las integrales de tipo logarítmico compuestas.

### Enunciado
¿Cuál es el resultado de $\int \frac{2x}{x^2 + 1} \, dx$?

### Opciones
- [ ] A) $\frac{1}{x^2+1} + C$ <!-- feedback: Esta es una forma similar a la derivada del arco tangente, pero el numerador es distinto. -->
- [x] B) $\ln(x^2 + 1) + C$ <!-- feedback: Correcto. Es del tipo $\int \frac{u'}{u} = \ln|u| + C$. El numerador es exactamente la derivada del denominador. -->
- [ ] C) $\arctan(x) + C$ <!-- feedback: Esto sería si el numerador fuera 1, no 2x. -->
- [ ] D) $2 \ln(x) + C$ <!-- feedback: El argumento del logaritmo debe ser el denominador completo. -->

### Explicacion Pedagogica
Una de las integrales inmediatas más comunes en EBAU es la del tipo logarítmico, donde el numerador es (o puede convertirse en) la derivada del denominador.

---

## Question 12 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.58
**Contexto:** Un estudiante analiza la integral de una función trigonométrica compuesta.

### Enunciado
Calcula $\int \text{sen}(3x) \, dx$.

### Opciones
- [ ] A) $3 \cos(3x) + C$ <!-- feedback: Esta es la derivada de la función interna por la externa. -->
- [x] B) $-\frac{1}{3} \cos(3x) + C$ <!-- feedback: Correcto. Al integrar una función compuesta lineal, se divide por el coeficiente de la x. -->
- [ ] C) $\frac{1}{3} \cos(3x) + C$ <!-- feedback: Error de signo (la integral del seno es menos coseno). -->
- [ ] D) $-\cos(3x) + C$ <!-- feedback: Falta compensar la derivada interna (el 3). -->

### Explicacion Pedagogica
Al integrar $f(ax+b)$, el resultado es $\frac{1}{a} F(ax+b)$. Es una aplicación directa de la regla de la cadena en sentido inverso.

---

## Question 13 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Comunicación y Razonamiento
**Expected_Success:** 0.55
**Contexto:** Un matemático en Asturias estudia la integral que conduce a la función arco tangente.

### Enunciado
Halla el valor de $\int \frac{1}{x^2 + 9} \, dx$.

### Opciones
- [ ] A) $\arctan(x/9) + C$ <!-- feedback: Error al aplicar la constante de la fórmula. -->
- [x] B) $\frac{1}{3} \arctan(x/3) + C$ <!-- feedback: Correcto. Aplicando la fórmula $\int \frac{1}{x^2+a^2} = \frac{1}{a} \arctan(x/a)$. Aquí $a=3$. -->
- [ ] C) $\ln(x^2 + 9) + C$ <!-- feedback: Falta la x en el numerador para que sea logarítmica. -->
- [ ] D) $\frac{1}{9} \arctan(x/9) + C$ <!-- feedback: Error al identificar el valor de a (es la raíz de 9). -->

### Explicacion Pedagogica
La integral del tipo arco tangente es muy frecuente. Es crucial identificar el valor de $a^2$ en el denominador para aplicar correctamente los coeficientes $1/a$ tanto fuera como dentro de la función.

---

## Question 14 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v14
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.53
**Contexto:** Un físico en Valencia integra una función exponencial compuesta.

### Enunciado
Resuelve $\int e^{5x} \, dx$.

### Opciones
- [ ] A) $5e^{5x} + C$ <!-- feedback: Esta es la derivada de la función. -->
- [x] B) $\frac{1}{5} e^{5x} + C$ <!-- feedback: Correcto. Al integrar $e^{ux}$, dividimos por la derivada del exponente si esta es constante. -->
- [ ] C) $e^{5x} + C$ <!-- feedback: Falta el factor de corrección. -->
- [ ] D) $\frac{e^{6x}}{6} + C$ <!-- feedback: Confusión con la regla de la potencia. -->

### Explicacion Pedagogica
La integración de la función exponencial con exponente lineal es una de las operaciones más básicas y repetitivas en el cálculo de primitivas.

---

## Question 15 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.50
**Contexto:** Se plantea una integral que requiere un ajuste constante para ser inmediata.

### Enunciado
¿Qué constante falta en el numerador para que $\int \frac{1}{2x + 7} \, dx$ sea una integral logarítmica inmediata?

### Opciones
- [ ] A) 7 <!-- feedback: Esta es la constante del denominador, no su derivada. -->
- [x] B) 2 <!-- feedback: Correcto. La derivada de $2x+7$ es 2. Podemos multiplicar y dividir por 2 para completar la integral. -->
- [ ] C) 1/2 <!-- feedback: Esta es la constante que quedará fuera de la integral tras el ajuste. -->
- [ ] D) $x$ <!-- feedback: No se pueden introducir variables fuera de la integral para ajustar el numerador. -->

### Explicacion Pedagogica
El ajuste de constantes es una técnica vital: "lo que falta multiplicando dentro, sale dividiendo fuera". Esto permite transformar muchas integrales en formas estándar.

---

## Question 16 [D7-D8]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v16
**Bloom:** Evaluate
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.48
**Contexto:** Un estudiante estudia la propiedad de linealidad de la integral indefinida.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre la integración es FALSA?

### Opciones
- [ ] A) La integral de una suma de funciones es la suma de sus integrales. <!-- feedback: Propiedad verdadera de linealidad. -->
- [x] B) La integral de un producto de funciones es el producto de sus integrales. <!-- feedback: Correcto, esta es la afirmación FALSA. El producto requiere técnicas como la integración por partes. -->
- [ ] C) Las constantes multiplicativas pueden salir fuera del símbolo de la integral. <!-- feedback: Propiedad verdadera de linealidad. -->
- [ ] D) Una función puede tener infinitas primitivas distintas. <!-- feedback: Verdadero, debido a la constante C. -->

### Explicacion Pedagogica
Es un error común pensar que las reglas de la integral son iguales a las de los límites. La integración de productos y cocientes es significativamente más compleja que la de sumas.

---

## Question 17 [D9-D10]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v17
**Bloom:** Analyze
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.45
**Contexto:** Un ingeniero en Málaga necesita integrar una función racional donde el grado del numerador es mayor que el del denominador.

### Enunciado
¿Cuál es el primer paso recomendado para resolver la integral $\int \frac{x^2 + 1}{x - 1} \, dx$?

### Opciones
- [ ] A) Aplicar integración por partes. <!-- feedback: No es el método más eficiente para funciones racionales simples. -->
- [x] B) Realizar la división polinómica del numerador entre el denominador. <!-- feedback: Correcto. Al dividir, obtenemos un polinomio más una fracción propia fácil de integrar. -->
- [ ] C) Usar un cambio de variable $t = e^x$. <!-- feedback: No simplifica la estructura racional. -->
- [ ] D) Factorizar el denominador. <!-- feedback: El denominador ya es irreducible (grado 1). -->

### Explicacion Pedagogica
Cuando el grado de $P(x) \geq$ grado de $Q(x)$, la división permite escribir la función como $C(x) + R(x)/Q(x)$, donde $C(x)$ es un polinomio cuya integral es inmediata.

---

## Question 18 [D9-D10]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.42
**Contexto:** Un estudiante de 2º de Bachillerato se enfrenta a la integral $\int \text{tg}(x) \, dx$.

### Enunciado
¿Cómo se resuelve la integral de la tangente escribiéndola como cociente de seno y coseno?

### Opciones
- [ ] A) Es de tipo arco tangente, resultado $\arctan(x) + C$. <!-- feedback: La tangente no integra como arco tangente. -->
- [x] B) Es de tipo logarítmico, resultado $-\ln|\cos(x)| + C$. <!-- feedback: Correcto. $\int \frac{\text{sen}(x)}{\cos(x)} dx$. La derivada del denominador es $-\text{sen}(x)$, por lo que ajustamos el signo. -->
- [ ] C) Es inmediata, resultado $\sec^2(x) + C$. <!-- feedback: Esta es la derivada de la tangente. -->
- [ ] D) No tiene primitiva expresable mediante funciones elementales. <!-- feedback: Sí la tiene y es logarítmica. -->

### Explicacion Pedagogica
Muchas integrales trigonométricas se resuelven transformándolas en sus componentes básicas (seno y coseno) para identificar estructuras de derivación compuesta.

---

## Question 19 [D9-D10]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v19
**Bloom:** Analyze
**ICFES:** Modelización y Comunicación
**Expected_Success:** 0.38
**Contexto:** Se utiliza el método de sustitución o cambio de variable para simplificar una integral.

### Enunciado
En la integral $\int x^2 \sqrt{x^3 + 1} \, dx$, ¿cuál es el cambio de variable más adecuado?

### Opciones
- [ ] A) $t = x^2$ <!-- feedback: No elimina la raíz ni simplifica el diferencial. -->
- [x] B) $t = x^3 + 1$ <!-- feedback: Correcto. Entonces $dt = 3x^2 dx$, lo que permite sustituir el término $x^2 dx$ de la integral original. -->
- [ ] C) $t = \sqrt{x}$ <!-- feedback: Complica la expresión innecesariamente. -->
- [ ] D) $t = x + 1$ <!-- feedback: No simplifica el término de mayor grado. -->

### Explicacion Pedagogica
El éxito del cambio de variable reside en elegir una parte de la función cuya derivada también esté presente en la integral (salvo constantes), facilitando la sustitución completa.

---

## Question 20 [D9-D10]
**ID:** ES-MAT-11-2026-W15-integrales-basicas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento Matemático
**Expected_Success:** 0.35
**Contexto:** Un estudiante reflexiona sobre el significado geométrico de la integral indefinida.

### Enunciado
Si interpretamos la derivada como la pendiente, ¿qué representa geométricamente la integral indefinida de una función?

### Opciones
- [ ] A) El área bajo la curva en un intervalo dado. <!-- feedback: Esto es la integral definida, no la indefinida. -->
- [x] B) Una familia de curvas paralelas (desplazadas verticalmente) que tienen la misma pendiente en cada valor de $x$. <!-- feedback: Correcto. La constante C representa el desplazamiento vertical de la curva original. -->
- [ ] C) La recta tangente a la curva en el origen. <!-- feedback: Esto se halla con la derivada. -->
- [ ] D) La curvatura de la función en un punto. <!-- feedback: Relacionado con la derivada segunda. -->

### Explicacion Pedagogica
La integral indefinida no nos da un número, sino un conjunto de funciones. Gráficamente, son infinitas copias de la misma forma de curva situadas a diferentes alturas en el plano.

[//]: # (QUALITY_REVIEW)
| Dimensión | Puntuación |
|-----------|------------|
| Técnico | 30/30 |
| Curricular | 40/40 |
| Contexto | 20/20 |
| Redacción | 10/10 |
| **Total** | **100/100** |
