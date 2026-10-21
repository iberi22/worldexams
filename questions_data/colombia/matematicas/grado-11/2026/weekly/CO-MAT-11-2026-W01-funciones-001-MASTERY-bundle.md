---
id: "CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "funciones"
periodo: "weekly"
week: "W01"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Funciones - Grado 11

Veinte situaciones colombianas para razonar sobre el concepto de función, su evaluación, dominio, rango, composición, inversa y modelos lineales y cuadráticos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** En un colegio de Medellín se registran parejas (código del estudiante, número de su salón) para organizar la jornada.

### Enunciado
Cada relación está escrita como pares (entrada, salida). ¿Cuál de ellas representa una función de la entrada?

### Opciones
- [ ] A) $(1,4),\ (1,5),\ (2,6)$
  <!-- feedback: Incorrecto. La entrada 1 tiene dos salidas distintas (4 y 5); una función asigna exactamente una salida a cada entrada. -->
- [x] B) $(1,4),\ (2,4),\ (3,5)$
  <!-- feedback: Correcto. Cada entrada (1, 2 y 3) aparece una sola vez; que dos entradas compartan la salida 4 está permitido en una función. -->
- [ ] C) $(0,1),\ (3,2),\ (0,7)$
  <!-- feedback: Incorrecto. La entrada 0 se repite con salidas 1 y 7, así que esa entrada no tiene una imagen única. -->
- [ ] D) $(5,1),\ (6,2),\ (5,3)$
  <!-- feedback: Incorrecto. La entrada 5 se asocia con 1 y con 3; repetir una entrada con salidas distintas rompe la definición de función. -->

### Explicacion Pedagogica
Una relación es función cuando cada elemento de la entrada tiene una y solo una salida. Se revisa si alguna primera coordenada se repite con segundas coordenadas diferentes: en A se repite 1, en C se repite 0 y en D se repite 5. En B las entradas 1, 2 y 3 son distintas; que 1 y 2 vayan ambas a 4 no viola la definición (eso solo impide que sea inyectiva).

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Numerico
**Expected_Success:** 0.83
**Contexto:** Un operador de telefonía en Bogotá cobra $C(g) = 15\,000 + 4\,000g$ pesos al mes, donde $g$ son las gigas adicionales consumidas.

### Enunciado
Un usuario consumió 3,5 gigas adicionales en el mes. ¿Cuánto paga, es decir, cuánto vale $C(3{,}5)$?

### Opciones
- [ ] A) 19 000 COP
  <!-- feedback: Incorrecto. Se tomó una sola giga: $15\,000 + 4\,000 = 19\,000$; hay que multiplicar 4 000 por 3,5. -->
- [ ] B) 66 500 COP
  <!-- feedback: Incorrecto. Se multiplicó todo el cargo por 3,5: $(15\,000 + 4\,000)(3{,}5)$; el cargo fijo de 15 000 no depende de las gigas. -->
- [x] C) 29 000 COP
  <!-- feedback: Correcto. $C(3{,}5) = 15\,000 + 4\,000(3{,}5) = 15\,000 + 14\,000 = 29\,000$ pesos. -->
- [ ] D) 14 000 COP
  <!-- feedback: Incorrecto. Ese es solo el cobro variable $4\,000(3{,}5)$; se olvidó sumar el cargo fijo de 15 000 COP. -->

### Explicacion Pedagogica
Evaluar una función es reemplazar la variable por el valor dado y respetar el orden de operaciones. Aquí $C(3{,}5) = 15\,000 + 4\,000 \cdot 3{,}5$. Primero el producto: $4\,000 \cdot 3{,}5 = 14\,000$; luego la suma con el cargo fijo: $15\,000 + 14\,000 = 29\,000$ COP.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.80
**Contexto:** Un ingeniero en Barranquilla usa $f(x) = \dfrac{\sqrt{x-4}}{x-9}$ para modelar la presión en una tubería, y necesita saber qué valores de $x$ puede usar.

### Enunciado
¿Cuál es el dominio de $f(x) = \frac{\sqrt{x-4}}{x-9}$ en los números reales?

### Opciones
- [ ] A) $[4, \infty)$
  <!-- feedback: Incorrecto. Se tuvo en cuenta la raíz, pero se olvidó que el denominador se anula en $x = 9$, donde $f$ no está definida. -->
- [ ] B) $\mathbb{R} - \{9\}$
  <!-- feedback: Incorrecto. Se excluyó solo el cero del denominador; los valores $x < 4$ dan raíz de un número negativo, que no es real. -->
- [ ] C) $(4, 9) \cup (9, \infty)$
  <!-- feedback: Incorrecto. Se excluyó $x = 4$ sin razón: $\sqrt{4-4} = 0$ es válido y $f(4) = 0/(-5) = 0$ existe. -->
- [x] D) $[4, 9) \cup (9, \infty)$
  <!-- feedback: Correcto. La raíz exige $x - 4 \ge 0$, es decir $x \ge 4$, y el denominador exige $x \neq 9$. -->

### Explicacion Pedagogica
El dominio reúne dos condiciones. Raíz cuadrada: $x - 4 \ge 0 \Rightarrow x \ge 4$. Denominador distinto de cero: $x - 9 \neq 0 \Rightarrow x \neq 9$. La intersección es $[4, 9) \cup (9, \infty)$. El extremo 4 se incluye porque $f(4) = 0$ está definido.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** En un laboratorio de la Universidad del Valle en Cali, la energía de un sistema se modela con $E(x) = x^2 + 3$ julios, con $x$ real.

### Enunciado
¿Cuál es el rango de $E(x) = x^2 + 3$ cuando $x$ recorre todos los números reales?

### Opciones
- [x] A) $[3, \infty)$
  <!-- feedback: Correcto. Como $x^2 \ge 0$, se tiene $x^2 + 3 \ge 3$, y el valor 3 se alcanza en $x = 0$. -->
- [ ] B) $\mathbb{R}$
  <!-- feedback: Incorrecto. Ese es el dominio; la salida nunca es menor que 3 porque $x^2$ no puede ser negativo. -->
- [ ] C) $[0, \infty)$
  <!-- feedback: Incorrecto. Ese es el rango de $x^2$; al sumar 3 toda la gráfica sube 3 unidades, así que el mínimo es 3. -->
- [ ] D) $(3, \infty)$
  <!-- feedback: Incorrecto. El 3 sí pertenece al rango porque $E(0) = 0 + 3 = 3$; el intervalo debe ser cerrado en 3. -->

### Explicacion Pedagogica
El rango es el conjunto de salidas. Para todo real, $x^2 \ge 0$; sumando 3 queda $E(x) \ge 3$. El mínimo 3 se alcanza en $x = 0$, y para cualquier $y \ge 3$ existe $x = \sqrt{y - 3}$ con $E(x) = y$. Por eso el rango es $[3, \infty)$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** En un almacén de Cali aplican primero un descuento $D(p) = p - 20\,000$ y luego el IVA $I(p) = 1{,}19p$ sobre un artículo de $p = 120\,000$ pesos.

### Enunciado
El precio final es $(I \circ D)(120\,000) = I(D(120\,000))$. ¿Cuál es ese precio?

### Opciones
- [x] A) 119 000 COP
  <!-- feedback: Correcto. $D(120\,000) = 100\,000$ y luego $I(100\,000) = 1{,}19 \cdot 100\,000 = 119\,000$. -->
- [ ] B) 122 800 COP
  <!-- feedback: Incorrecto. Se aplicó el IVA primero y el descuento después: $1{,}19 \cdot 120\,000 - 20\,000$, que es $D(I(p))$ y no $I(D(p))$. -->
- [ ] C) 142 800 COP
  <!-- feedback: Incorrecto. Solo se aplicó el IVA, $1{,}19 \cdot 120\,000$; se omitió la función interna $D$. -->
- [ ] D) 100 000 COP
  <!-- feedback: Incorrecto. Solo se calculó $D(120\,000)$; faltó aplicar la función externa $I$ a ese resultado. -->

### Explicacion Pedagogica
En $(I \circ D)(p)$ se aplica primero la función de adentro, $D$, y luego $I$. Paso 1: $D(120\,000) = 120\,000 - 20\,000 = 100\,000$. Paso 2: $I(100\,000) = 1{,}19 \cdot 100\,000 = 119\,000$ COP. El orden importa: $D(I(120\,000)) = 122\,800$, otro valor.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** Una agencia de turismo en Bogotá convierte temperaturas con $F = 1{,}8C + 32$ y quiere la fórmula inversa para pasar de grados Fahrenheit a Celsius.

### Enunciado
¿Cuál expresión da $C$ en función de $F$?

### Opciones
- [ ] A) $C = 1{,}8F - 32$
  <!-- feedback: Incorrecto. Se cambiaron las letras sin despejar; la inversa deshace las operaciones en orden contrario: restar 32 y luego dividir entre 1,8. -->
- [ ] B) $C = \dfrac{F}{1{,}8} - 32$
  <!-- feedback: Incorrecto. Se dividió antes de restar 32; como el 32 se sumó al final, debe quitarse primero: $(F - 32)/1{,}8$. -->
- [x] C) $C = \dfrac{F - 32}{1{,}8}$
  <!-- feedback: Correcto. De $F = 1{,}8C + 32$ se resta 32 y se divide entre 1,8: $C = (F-32)/1{,}8$. -->
- [ ] D) $C = \dfrac{F + 32}{1{,}8}$
  <!-- feedback: Incorrecto. Al pasar el 32 al otro lado se conservó el signo; debe restarse porque en la fórmula original se suma. -->

### Explicacion Pedagogica
Para hallar la inversa se despeja la variable original. $F = 1{,}8C + 32 \Rightarrow F - 32 = 1{,}8C \Rightarrow C = \frac{F-32}{1{,}8}$. Comprobación: si $C = 20$, $F = 68$, y $\frac{68 - 32}{1{,}8} = 20$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** El acueducto de un municipio antioqueño cobra 3 000 pesos por m³ en los primeros 13 m³ (consumo básico) y 4 500 pesos por cada m³ que exceda los 13.

### Enunciado
Una familia consumió 20 m³ en el mes. ¿Cuánto paga por el consumo?

### Opciones
- [x] A) 70 500 COP
  <!-- feedback: Correcto. $13 \cdot 3\,000 + (20 - 13) \cdot 4\,500 = 39\,000 + 31\,500 = 70\,500$. -->
- [ ] B) 90 000 COP
  <!-- feedback: Incorrecto. Se cobraron los 20 m³ a la tarifa alta, $20 \cdot 4\,500$; los primeros 13 m³ van a 3 000. -->
- [ ] C) 60 000 COP
  <!-- feedback: Incorrecto. Se cobraron los 20 m³ a la tarifa básica, $20 \cdot 3\,000$; el exceso de 7 m³ se cobra a 4 500. -->
- [ ] D) 129 000 COP
  <!-- feedback: Incorrecto. Se sumó $13 \cdot 3\,000 + 20 \cdot 4\,500$, cobrando dos veces los primeros 13 m³; la tarifa alta solo aplica al exceso. -->

### Explicacion Pedagogica
La tarifa es una función a trozos: $T(x) = 3\,000x$ si $x \le 13$ y $T(x) = 39\,000 + 4\,500(x - 13)$ si $x > 13$. Como $20 > 13$, se usa el segundo trozo: $T(20) = 39\,000 + 4\,500 \cdot 7 = 39\,000 + 31\,500 = 70\,500$ COP.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.68
**Contexto:** En una finca de Boyacá se registra el agua de un tanque mientras se riega: a las 0 h hay 1 200 L, a las 2 h hay 1 050 L y a las 5 h hay 825 L.

### Enunciado
Si el volumen $V$ cambia de forma lineal con las horas $h$, ¿qué función lo describe?

### Opciones
- [ ] A) $V(h) = 1\,200 - 150h$
  <!-- feedback: Incorrecto. 150 L es lo que baja en 2 horas; la pendiente por hora es $-150/2 = -75$ L/h. -->
- [ ] B) $V(h) = 1\,200 + 75h$
  <!-- feedback: Incorrecto. El signo de la pendiente está mal: el volumen disminuye, así que la razón de cambio es negativa. -->
- [ ] C) $V(h) = 1\,050 - 75h$
  <!-- feedback: Incorrecto. 1 050 es el volumen a las 2 h; el valor inicial (en $h = 0$) es 1 200 L. -->
- [x] D) $V(h) = 1\,200 - 75h$
  <!-- feedback: Correcto. Pendiente $(1\,050 - 1\,200)/(2 - 0) = -75$, intercepto 1 200; además $V(5) = 1\,200 - 375 = 825$. -->

### Explicacion Pedagogica
Una función lineal es $V(h) = mh + b$. La pendiente es $m = \frac{1\,050 - 1\,200}{2 - 0} = -75$ L/h y $b = V(0) = 1\,200$. Se comprueba con el tercer dato: $V(5) = 1\,200 - 75 \cdot 5 = 825$ L, que coincide con la tabla.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.66
**Contexto:** Un vendedor de jugos en Cartagena estima su ganancia diaria con $G(x) = -2x^2 + 120x - 1\,000$, en miles de pesos, donde $x$ es el precio del vaso en miles de pesos.

### Enunciado
¿Cuál es la ganancia diaria máxima que puede obtener?

### Opciones
- [ ] A) 30 mil pesos
  <!-- feedback: Incorrecto. 30 es el precio que maximiza, $x = -120/(2 \cdot (-2))$; la pregunta pide la ganancia $G(30)$. -->
- [ ] B) $-1\,000$ mil pesos
  <!-- feedback: Incorrecto. Se usó $x = 60$ al calcular el vértice sin el factor 2 ($-120/(-2)$); $G(60) = -1\,000$ no es el máximo. -->
- [x] C) 800 mil pesos
  <!-- feedback: Correcto. Vértice en $x = 30$ y $G(30) = -2(900) + 3\,600 - 1\,000 = 800$. -->
- [ ] D) 4 400 mil pesos
  <!-- feedback: Incorrecto. Se tomó $-2 \cdot 30^2$ como $+1\,800$; el término cuadrático resta: $-1\,800 + 3\,600 - 1\,000 = 800$. -->

### Explicacion Pedagogica
Como $a = -2 < 0$, la parábola abre hacia abajo y el máximo está en el vértice: $x = -\frac{b}{2a} = -\frac{120}{2(-2)} = 30$. Entonces $G(30) = -2(30)^2 + 120(30) - 1\,000 = -1\,800 + 3\,600 - 1\,000 = 800$ mil pesos.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.64
**Contexto:** Una cooperativa del Huila tiene 500 m de malla para cercar un corral rectangular junto a un río; el lado del río no se cerca y $x$ es el ancho perpendicular al río.

### Enunciado
El área es $A(x) = x(500 - 2x)$. ¿Cuál es el dominio que tiene sentido en esta situación?

### Opciones
- [ ] A) $(0, 500)$
  <!-- feedback: Incorrecto. Si $x > 250$, el largo $500 - 2x$ es negativo; con dos anchos de $x$ la malla se agota en $x = 250$. -->
- [ ] B) $[0, \infty)$
  <!-- feedback: Incorrecto. Solo hay 500 m de malla, así que $x$ no puede crecer sin límite, y con $x = 0$ no hay corral. -->
- [x] C) $(0, 250)$
  <!-- feedback: Correcto. Se necesita $x > 0$ y largo $500 - 2x > 0$, es decir $x < 250$. -->
- [ ] D) $(0, 125]$
  <!-- feedback: Incorrecto. 125 es el ancho que maximiza el área, no el límite del dominio; anchos entre 125 y 250 también forman corrales válidos. -->

### Explicacion Pedagogica
Las medidas del corral deben ser positivas: ancho $x > 0$ y largo $500 - 2x > 0 \Rightarrow x < 250$. Por eso el dominio contextual es $(0, 250)$, aunque la expresión algebraica $x(500-2x)$ esté definida para todo real. El valor $x = 125$ da el área máxima, pero no limita el dominio.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.62
**Contexto:** Un estudiante de Pereira resume en una tabla la función $f$: para $x = -2, -1, 0, 1, 2$ obtiene $f(x) = 3, 0, -1, 0, 3$.

### Enunciado
Con base en la tabla, ¿cuál afirmación es correcta?

### Opciones
- [x] A) $f$ no es inyectiva porque $f(-1) = f(1) = 0$; por eso no tiene inversa en ese dominio.
  <!-- feedback: Correcto. Dos entradas distintas comparten la salida 0, así que la inversa no podría asignar a 0 una única entrada. -->
- [ ] B) $f$ tiene inversa porque cada $x$ tiene una sola imagen.
  <!-- feedback: Incorrecto. Eso solo prueba que $f$ es función; para tener inversa además debe ser inyectiva, y $f(-2) = f(2) = 3$ lo impide. -->
- [ ] C) $f$ no es función porque la salida 0 aparece dos veces.
  <!-- feedback: Incorrecto. Repetir salidas está permitido; lo prohibido es que una entrada tenga dos salidas, y aquí cada $x$ tiene una. -->
- [ ] D) $f$ es creciente en todo su dominio.
  <!-- feedback: Incorrecto. De $x = -2$ a $x = 0$ los valores bajan de 3 a $-1$, así que $f$ decrece en esa parte. -->

### Explicacion Pedagogica
Ser función significa que cada entrada tiene una salida; ser inyectiva significa que salidas iguales vienen de entradas iguales. La tabla cumple lo primero, pero $f(-1) = f(1) = 0$ y $f(-2) = f(2) = 3$ muestran que no es inyectiva. Sin inyectividad no existe la inversa en ese dominio, porque $f^{-1}(0)$ tendría dos valores.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.60
**Contexto:** En una fábrica de Itagüí, la máquina $g$ resta 3 cm a una pieza, $g(x) = x - 3$, y la máquina $f$ calcula el área de un cuadrado de lado $x$, $f(x) = x^2$.

### Enunciado
Si la pieza pasa primero por $g$ y luego por $f$, el resultado es $(f \circ g)(x)$. ¿Cuál es su expresión?

### Opciones
- [ ] A) $x^2 - 3$
  <!-- feedback: Incorrecto. Esa es $(g \circ f)(x) = g(x^2)$: se aplicó primero $f$; en $f \circ g$ primero actúa $g$. -->
- [ ] B) $x^2 - 9$
  <!-- feedback: Incorrecto. Se elevó cada término por separado, $(x-3)^2 \neq x^2 - 9$; falta el término doble $-6x$ y el signo de 9 es positivo. -->
- [ ] C) $x^3 - 3x^2$
  <!-- feedback: Incorrecto. Ese es el producto $f(x) \cdot g(x) = x^2(x-3)$, no la composición. -->
- [x] D) $x^2 - 6x + 9$
  <!-- feedback: Correcto. $f(g(x)) = (x - 3)^2 = x^2 - 6x + 9$ por el cuadrado de un binomio. -->

### Explicacion Pedagogica
En la composición $f \circ g$ se reemplaza la $x$ de $f$ por $g(x)$: $f(g(x)) = (x - 3)^2$. Al desarrollar el binomio, $(x-3)^2 = x^2 - 2 \cdot 3x + 9 = x^2 - 6x + 9$. Como $(g \circ f)(x) = x^2 - 3$ es diferente, la composición no es conmutativa.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.58
**Contexto:** Un emprendimiento de artesanías en Pasto registra sus seguidores (en cientos) al final de cada mes $t$: $t = 0, 1, 2, 3$ da $y = 5, 8, 13, 20$.

### Enunciado
¿Qué modelo describe exactamente los cuatro datos?

### Opciones
- [ ] A) $y = 3t + 5$
  <!-- feedback: Incorrecto. Sirve para $t = 0$ y $t = 1$, pero $y(2) = 11 \neq 13$; las diferencias 3, 5, 7 no son constantes, así que no es lineal. -->
- [x] B) $y = t^2 + 2t + 5$
  <!-- feedback: Correcto. Da 5, 8, 13 y 20; las segundas diferencias son constantes (2), señal de un modelo cuadrático. -->
- [ ] C) $y = 5(1{,}6)^t$
  <!-- feedback: Incorrecto. Coincide en $t = 1$, pero $5(1{,}6)^2 = 12{,}8 \neq 13$; los cocientes $8/5$ y $13/8$ no son iguales. -->
- [ ] D) $y = t^2 + 5$
  <!-- feedback: Incorrecto. Para $t = 1$ da $6 \neq 8$; le falta el término lineal $2t$. -->

### Explicacion Pedagogica
Las primeras diferencias son $8-5 = 3$, $13-8 = 5$, $20-13 = 7$ y las segundas son $2, 2$: un modelo cuadrático $y = at^2 + bt + c$ con $2a = 2$, así $a = 1$. Con $c = y(0) = 5$ y $y(1) = 1 + b + 5 = 8$ se obtiene $b = 2$. Verificación: $y(3) = 9 + 6 + 5 = 20$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.56
**Contexto:** Un parqueadero de Bucaramanga cobra $P(t) = 3\,000$ si $0 < t \le 1$ y $P(t) = 3\,000 + 2\,000(t - 1)$ si $1 < t \le 8$, con $t$ en horas y $P$ en pesos.

### Enunciado
Un conductor pagó 9 000 pesos. ¿Cuánto tiempo estuvo parqueado?

### Opciones
- [x] A) 4 h
  <!-- feedback: Correcto. $3\,000 + 2\,000(t - 1) = 9\,000 \Rightarrow t - 1 = 3 \Rightarrow t = 4$. -->
- [ ] B) 3 h
  <!-- feedback: Incorrecto. Se planteó $3\,000 + 2\,000t = 9\,000$ olvidando el $-1$; con $t = 3$ el parqueadero cobra $3\,000 + 4\,000 = 7\,000$. -->
- [ ] C) 4,5 h
  <!-- feedback: Incorrecto. Se dividió $9\,000/2\,000$ ignorando la primera hora de 3 000; $P(4{,}5) = 10\,000$. -->
- [ ] D) 5,5 h
  <!-- feedback: Incorrecto. Se resolvió $2\,000(t - 1) = 9\,000$ sin restar el cargo inicial de 3 000; $P(5{,}5) = 12\,000$. -->

### Explicacion Pedagogica
Como 9 000 es mayor que 3 000, el tiempo está en el segundo trozo. Se resuelve $3\,000 + 2\,000(t-1) = 9\,000$: $2\,000(t-1) = 6\,000$, $t - 1 = 3$, $t = 4$ h. Comprobación: $P(4) = 3\,000 + 2\,000 \cdot 3 = 9\,000$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.54
**Contexto:** En Manizales se diseña una rampa con perfil $f(x) = (x - 2)^2 + 1$ para $x \ge 2$, y se necesita la función inversa para calcular la posición a partir de la altura.

### Enunciado
¿Cuál es $f^{-1}(x)$, con $x \ge 1$?

### Opciones
- [ ] A) $f^{-1}(x) = 2 - \sqrt{x - 1}$
  <!-- feedback: Incorrecto. Esa rama da valores menores o iguales a 2; como el dominio de $f$ es $x \ge 2$, la inversa debe tomar la raíz positiva. -->
- [x] B) $f^{-1}(x) = 2 + \sqrt{x - 1}$
  <!-- feedback: Correcto. De $y = (x-2)^2 + 1$: $x - 2 = \sqrt{y - 1}$ (positivo porque $x \ge 2$), luego $x = 2 + \sqrt{y-1}$. -->
- [ ] C) $f^{-1}(x) = \sqrt{x - 1} - 2$
  <!-- feedback: Incorrecto. Al despejar se restó 2 en lugar de sumarlo: de $x - 2 = \sqrt{y-1}$ sale $x = \sqrt{y-1} + 2$. -->
- [ ] D) $f^{-1}(x) = 2 + \sqrt{x + 1}$
  <!-- feedback: Incorrecto. El 1 se pasó con el signo equivocado: de $y = (x-2)^2 + 1$ queda $(x-2)^2 = y - 1$. -->

### Explicacion Pedagogica
Se escribe $y = (x-2)^2 + 1$ y se despeja: $(x-2)^2 = y - 1$, $x - 2 = \pm\sqrt{y-1}$. Como $x \ge 2$, se toma el signo positivo: $x = 2 + \sqrt{y-1}$. Intercambiando variables, $f^{-1}(x) = 2 + \sqrt{x-1}$ con $x \ge 1$. Prueba: $f^{-1}(f(5)) = f^{-1}(10) = 2 + 3 = 5$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.52
**Contexto:** En una tarea de un colegio de Tunja, Julián halló el dominio de $f(x) = \sqrt{9 - x^2}$ así: Paso 1: $9 - x^2 \ge 0$; Paso 2: $x^2 \le 9$; Paso 3: $x \le 3$; conclusión: dominio $(-\infty, 3]$.

### Enunciado
¿Qué evaluación del procedimiento de Julián es correcta?

### Opciones
- [ ] A) Es correcto: el dominio es $(-\infty, 3]$.
  <!-- feedback: Incorrecto. Con $x = -4$, $9 - 16 = -7 < 0$ y la raíz no es real; el dominio no puede incluir valores menores que $-3$. -->
- [ ] B) El error está en el paso 1: debe ser $9 - x^2 > 0$, con dominio $(-3, 3)$.
  <!-- feedback: Incorrecto. La raíz cuadrada de 0 existe, así que la desigualdad es $\ge 0$ y los extremos $\pm 3$ se incluyen. -->
- [ ] C) El error está en el paso 1: debe ser $9 - x^2 \le 0$.
  <!-- feedback: Incorrecto. La raíz cuadrada exige radicando no negativo, $9 - x^2 \ge 0$; el paso 1 está bien. -->
- [x] D) El error está en el paso 3: de $x^2 \le 9$ se sigue $-3 \le x \le 3$, y el dominio es $[-3, 3]$.
  <!-- feedback: Correcto. $x^2 \le 9$ equivale a $|x| \le 3$; Julián olvidó la cota inferior $-3$. -->

### Explicacion Pedagogica
La condición $9 - x^2 \ge 0$ y su forma $x^2 \le 9$ son correctas. El error es al sacar raíz: $\sqrt{x^2} = |x|$, así que $x^2 \le 9 \Leftrightarrow |x| \le 3 \Leftrightarrow -3 \le x \le 3$. El dominio correcto es $[-3, 3]$; por ejemplo $x = -5$ daría $\sqrt{-16}$, que no es real.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.50
**Contexto:** En Bogotá dos plataformas de transporte cobran por viaje de $k$ kilómetros: la empresa A, $4\,000 + 1\,500k$ pesos, y la empresa B, $7\,000 + 1\,200k$ pesos.

### Enunciado
¿Para qué distancias es más barata la empresa B?

### Opciones
- [ ] A) Para menos de 10 km.
  <!-- feedback: Incorrecto. Con $k = 5$, A cobra 11 500 y B cobra 13 000; para distancias cortas pesa más el cargo fijo mayor de B. -->
- [ ] B) Nunca, porque B tiene el cargo fijo más alto.
  <!-- feedback: Incorrecto. El cargo fijo no decide solo: B cobra 300 pesos menos por km y, con $k = 20$, cuesta 31 000 contra 34 000 de A. -->
- [x] C) Para más de 10 km.
  <!-- feedback: Correcto. $7\,000 + 1\,200k < 4\,000 + 1\,500k \Leftrightarrow 3\,000 < 300k \Leftrightarrow k > 10$. -->
- [ ] D) Para más de 2,5 km.
  <!-- feedback: Incorrecto. Se dividió $3\,000/1\,200$; la diferencia por km entre las tarifas es $1\,500 - 1\,200 = 300$, así que el corte es $3\,000/300 = 10$. -->

### Explicacion Pedagogica
Se comparan las dos funciones lineales: B es menor cuando $7\,000 + 1\,200k < 4\,000 + 1\,500k$. Restando, $3\,000 < 300k$, es decir $k > 10$. En $k = 10$ ambas cuestan 19 000 pesos; antes de ese punto conviene A y después conviene B.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.48
**Contexto:** En un curso preuniversitario de Neiva se discute la función $f(x) = \dfrac{1}{x - 2}$.

### Enunciado
¿Cuál afirmación sobre $f$ es verdadera?

### Opciones
- [ ] A) Su dominio es $\mathbb{R}$.
  <!-- feedback: Incorrecto. En $x = 2$ el denominador es 0 y $f$ no está definida; el dominio es $\mathbb{R} - \{2\}$. -->
- [ ] B) Su rango es $\mathbb{R}$.
  <!-- feedback: Incorrecto. Una fracción con numerador 1 nunca vale 0, así que el rango es $\mathbb{R} - \{0\}$. -->
- [ ] C) $f(0) = \frac{1}{2}$.
  <!-- feedback: Incorrecto. $f(0) = \frac{1}{0 - 2} = -\frac{1}{2}$; se perdió el signo del denominador. -->
- [x] D) $f$ es inyectiva y su inversa es $f^{-1}(x) = \frac{1}{x} + 2$.
  <!-- feedback: Correcto. De $y = \frac{1}{x-2}$: $x - 2 = \frac{1}{y}$, así $x = \frac{1}{y} + 2$, una única preimagen para cada $y \neq 0$. -->

### Explicacion Pedagogica
Se revisa cada afirmación. Dominio: $x \neq 2$. Rango: $\frac{1}{x-2} = 0$ no tiene solución, luego el 0 queda excluido. $f(0) = -\frac{1}{2}$. Para la inversa: $y = \frac{1}{x-2} \Rightarrow x - 2 = \frac{1}{y} \Rightarrow x = \frac{1}{y} + 2$; como el despeje da un solo valor, $f$ es inyectiva y $f^{-1}(x) = \frac{1}{x} + 2$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.47
**Contexto:** En el estadio Atanasio Girardot de Medellín se analiza un tiro libre cuya altura es $h(x) = -0{,}02x^2 + 0{,}8x$ metros, con $x$ la distancia horizontal; la barrera mide 2 m y está a 9 m, y el arco (travesaño a 2,44 m) está a 30 m.

### Enunciado
¿Qué conclusión es correcta?

### Opciones
- [ ] A) El balón no supera la barrera porque $h(9) < 2$.
  <!-- feedback: Incorrecto. $h(9) = -0{,}02(81) + 0{,}8(9) = -1{,}62 + 7{,}2 = 5{,}58$ m, mucho más que 2 m. -->
- [x] B) Supera la barrera, pero pasa por encima del travesaño, porque $h(30) = 6$ m.
  <!-- feedback: Correcto. $h(9) = 5{,}58 > 2$ y $h(30) = -18 + 24 = 6 > 2{,}44$, así que el balón va por encima del arco. -->
- [ ] C) Entra al arco porque alcanza su altura máxima de 8 m a los 20 m y después baja.
  <!-- feedback: Incorrecto. El máximo sí es $h(20) = 8$ m, pero bajar no basta: a los 30 m la altura todavía es 6 m, mayor que 2,44 m. -->
- [ ] D) Entra al arco porque $h(30) = 2$ m.
  <!-- feedback: Incorrecto. Se calculó mal $h(30)$: $-0{,}02 \cdot 900 = -18$ y $0{,}8 \cdot 30 = 24$, así que $h(30) = 6$ m. -->

### Explicacion Pedagogica
Se evalúa el modelo en los puntos clave. Barrera: $h(9) = 5{,}58$ m $> 2$ m, la supera. Vértice: $x = -\frac{0{,}8}{2(-0{,}02)} = 20$, $h(20) = 8$ m. Arco: $h(30) = -0{,}02(900) + 0{,}8(30) = 6$ m $> 2{,}44$ m. El balón pasa la barrera pero sale por encima del travesaño.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W01-funciones-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Formulacion
**Expected_Success:** 0.45
**Contexto:** Una distribuidora de Bucaramanga ofrece a sus vendedores dos planes según las ventas mensuales $s$: Plan 1, $1\,200\,000 + 0{,}04s$ pesos; Plan 2, $0{,}10s$ pesos.

### Enunciado
¿Cuál conclusión sobre los planes es válida?

### Opciones
- [ ] A) El plan 2 siempre paga más porque su porcentaje es mayor.
  <!-- feedback: Incorrecto. Con ventas de 10 000 000, el plan 2 paga 1 000 000 y el plan 1 paga 1 600 000; el porcentaje mayor no compensa el salario fijo. -->
- [x] B) El plan 2 paga más solo si las ventas superan 20 000 000 COP.
  <!-- feedback: Correcto. $0{,}10s > 1\,200\,000 + 0{,}04s \Leftrightarrow 0{,}06s > 1\,200\,000 \Leftrightarrow s > 20\,000\,000$. -->
- [ ] C) Los planes pagan igual con ventas de 12 000 000 COP.
  <!-- feedback: Incorrecto. Se dividió $1\,200\,000/0{,}10$ sin restar el 4 % del plan 1; en 12 000 000 el plan 1 paga 1 680 000 y el plan 2 paga 1 200 000. -->
- [ ] D) El plan 1 paga más cuando las ventas superan 20 000 000 COP.
  <!-- feedback: Incorrecto. El sentido está invertido: por encima de 20 000 000, la pendiente mayor (0,10) hace que el plan 2 supere al plan 1. -->

### Explicacion Pedagogica
Los planes son funciones lineales con pendientes 0,04 y 0,10. Se igualan: $1\,200\,000 + 0{,}04s = 0{,}10s \Rightarrow 0{,}06s = 1\,200\,000 \Rightarrow s = 20\,000\,000$. Para $s > 20\,000\,000$ gana el plan 2 porque crece más rápido; para ventas menores conviene el plan 1 por su parte fija.
