---
id: "CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "optimizacion"
periodo: "weekly"
week: "W18"
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

# Bundle MASTERY: Optimización - Grado 11

Veinte problemas de optimización en contextos colombianos: modelar la cantidad a optimizar, derivar, revisar el dominio y comparar con los extremos del intervalo.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Razonamiento
**Expected_Success:** 0.85
**Contexto:** Un estudiante de Neiva prepara el examen Saber 11 y repasa cómo hallar el valor máximo de una función continua $f$ en un intervalo cerrado $[a, b]$.

### Enunciado
Para hallar el máximo absoluto de una función continua $f$ en $[a, b]$, ¿qué valores se deben comparar?

### Opciones
- [ ] A) Solo los valores de $f$ en los puntos donde $f'(x) = 0$
  <!-- feedback: Incorrecto. Olvidas los extremos del intervalo: en $f(x) = x$ sobre $[0, 5]$ no hay puntos con $f' = 0$ y el máximo está en $x = 5$. -->
- [x] B) Los valores de $f$ en los puntos críticos interiores y en los extremos $a$ y $b$
  <!-- feedback: Correcto. Por el teorema del valor extremo el máximo existe y solo puede estar en un punto crítico interior o en un extremo del intervalo. -->
- [ ] C) Solo los valores $f(a)$ y $f(b)$
  <!-- feedback: Incorrecto. El máximo también puede estar dentro: en $f(x) = -x^2$ sobre $[-1, 1]$ el máximo es $f(0) = 0$, que no es un extremo del intervalo. -->
- [ ] D) Los valores de $f$ donde $f''(x) = 0$
  <!-- feedback: Incorrecto. Donde $f''=0$ se buscan puntos de inflexión, que señalan cambios de concavidad y no candidatos a máximo. -->

### Explicacion Pedagogica
Método del intervalo cerrado: (1) hallar los puntos críticos de $f$ dentro de $(a,b)$, donde $f'=0$ o $f'$ no existe; (2) evaluar $f$ en esos puntos y en $a$ y $b$; (3) el mayor valor es el máximo absoluto y el menor es el mínimo absoluto. Omitir los extremos es el error más común en problemas con restricciones.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.83
**Contexto:** En un reto de la Olimpiada Regional de Matemáticas de Sincelejo se pide repartir el número 40 en dos partes positivas.

### Enunciado
Dos números positivos suman 40. ¿Cuáles son si su producto debe ser el mayor posible?

### Opciones
- [ ] A) $10$ y $30$
  <!-- feedback: Incorrecto. Su producto es $10 \cdot 30 = 300$, menor que $20 \cdot 20 = 400$; no anulaste la derivada de $P(x) = 40x - x^2$. -->
- [ ] B) $15$ y $25$
  <!-- feedback: Incorrecto. $15 \cdot 25 = 375 < 400$; el producto crece mientras los números se acercan entre sí. -->
- [x] C) $20$ y $20$
  <!-- feedback: Correcto. $P(x) = x(40 - x)$, $P'(x) = 40 - 2x = 0$ da $x = 20$; el producto máximo es $400$. -->
- [ ] D) $1$ y $39$
  <!-- feedback: Incorrecto. Tomaste un valor cercano al extremo del dominio: $1 \cdot 39 = 39$ es casi el producto mínimo, no el máximo. -->

### Explicacion Pedagogica
Si un número es $x$, el otro es $40 - x$, con $0 < x < 40$. El producto es $P(x) = 40x - x^2$. Entonces $P'(x) = 40 - 2x = 0 \Rightarrow x = 20$ y $P''(x) = -2 < 0$, así que es un máximo. Los números son 20 y 20 y el producto máximo es 400.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Modelacion
**Expected_Success:** 0.80
**Contexto:** Un campesino de Sopetrán tiene 120 m de alambre para cercar un potrero rectangular junto al río Cauca; el lado del río no se cerca.

### Enunciado
Si $x$ es la longitud de cada uno de los dos lados perpendiculares al río, ¿qué función da el área del potrero?

### Opciones
- [ ] A) $A(x) = x(60 - x)$
  <!-- feedback: Incorrecto. Esa expresión supone cercar los cuatro lados ($2x + 2y = 120$); el lado del río no lleva cerca. -->
- [x] B) $A(x) = x(120 - 2x)$
  <!-- feedback: Correcto. Los dos lados perpendiculares usan $2x$ metros y el lado paralelo al río mide $120 - 2x$; el área es base por altura. -->
- [ ] C) $A(x) = x(120 - x)$
  <!-- feedback: Incorrecto. Restaste un solo lado perpendicular; son dos lados de longitud $x$, por eso el lado paralelo mide $120 - 2x$. -->
- [ ] D) $A(x) = 2x + (120 - 2x)$
  <!-- feedback: Incorrecto. Esa suma es la longitud de cerca usada, siempre 120 m; el área es un producto de dimensiones, no una suma. -->

### Explicacion Pedagogica
Sea $x$ cada lado perpendicular al río e $y$ el lado paralelo. La cerca cumple $2x + y = 120$, de modo que $y = 120 - 2x$. El área es $A(x) = x \cdot y = x(120 - 2x) = 120x - 2x^2$, con $0 < x < 60$. Al derivar, $A'(x) = 120 - 4x = 0$ da $x = 30$ m y área máxima $1800\ \text{m}^2$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Resolucion
**Expected_Success:** 0.78
**Contexto:** Una panadería de Pasto estima su utilidad semanal con $U(x) = -2x^2 + 240x - 1000$ (miles de pesos), donde $x$ es el número de docenas de pan de yuca vendidas.

### Enunciado
¿Cuántas docenas debe vender para obtener la utilidad máxima?

### Opciones
- [ ] A) 120 docenas
  <!-- feedback: Incorrecto. Derivaste $-2x^2$ como $-2x$; la derivada correcta es $-4x$, luego $-4x + 240 = 0$ da $x = 60$. -->
- [ ] B) 6200 docenas
  <!-- feedback: Incorrecto. 6200 es el valor de la utilidad máxima $U(60)$ en miles de pesos, no la cantidad de docenas. -->
- [ ] C) Aproximadamente 115,7 docenas
  <!-- feedback: Incorrecto. Ese valor resuelve $U(x) = 0$, el punto de equilibrio; el máximo se halla con $U'(x) = 0$, no con $U(x) = 0$. -->
- [x] D) 60 docenas
  <!-- feedback: Correcto. $U'(x) = -4x + 240 = 0$ da $x = 60$, y $U''(x) = -4 < 0$ confirma el máximo; la utilidad es $6200$ miles de pesos. -->

### Explicacion Pedagogica
Se deriva la utilidad: $U'(x) = -4x + 240$. Igualando a cero, $x = 60$ docenas. Como $U''(x) = -4 < 0$, es un máximo. La utilidad máxima es $U(60) = -2(3600) + 240(60) - 1000 = 6200$ miles de pesos, es decir, 6 200 000 pesos por semana.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.75
**Contexto:** En un taller de empaques de Itagüí se fabrican cajas sin tapa a partir de láminas cuadradas de cartón de 30 cm de lado, recortando un cuadrado de lado $x$ en cada esquina.

### Enunciado
¿Qué valor de $x$ produce la caja de mayor volumen?

### Opciones
- [x] A) $x = 5$ cm
  <!-- feedback: Correcto. $V(x) = x(30 - 2x)^2$ y $V'(x) = (30 - 2x)(30 - 6x) = 0$ da $x = 5$ dentro de $(0, 15)$; el volumen es $2000\ \text{cm}^3$. -->
- [ ] B) $x = 15$ cm
  <!-- feedback: Incorrecto. $x = 15$ anula el factor $30 - 2x$: la base desaparece y el volumen es 0, el mínimo y no el máximo. -->
- [ ] C) $x = 10$ cm
  <!-- feedback: Incorrecto. Usaste $V = x(30 - x)^2$, restando el corte solo de un lado; al cortar ambas esquinas la base mide $30 - 2x$. -->
- [ ] D) $x = 2{,}5$ cm
  <!-- feedback: Incorrecto. Restaste cuatro cortes por lado con $30 - 4x$; cada lado pierde dos cuadrados, por eso la base es $30 - 2x$. -->

### Explicacion Pedagogica
Dimensiones de la caja: base $(30 - 2x) \times (30 - 2x)$ y altura $x$, con $0 < x < 15$. Volumen: $V(x) = x(30 - 2x)^2$. Derivada: $V'(x) = (30 - 2x)^2 - 4x(30 - 2x) = (30 - 2x)(30 - 6x)$. Los ceros son $x = 15$ (fuera del dominio abierto, volumen 0) y $x = 5$. Con $V(5) = 5 \cdot 20^2 = 2000\ \text{cm}^3$, el máximo está en $x = 5$ cm.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.72
**Contexto:** Un teatro de Bucaramanga vende 300 boletas a 20 000 pesos; por cada aumento de 1000 pesos en el precio deja de vender 10 boletas.

### Enunciado
¿Qué precio de la boleta maximiza el ingreso del teatro?

### Opciones
- [ ] A) 15 000 pesos
  <!-- feedback: Incorrecto. Corresponde a $n = -5$, un error de signo al despejar $100000 - 20000n = 0$; la solución es $n = 5$. -->
- [ ] B) 50 000 pesos
  <!-- feedback: Incorrecto. Con $n = 30$ las ventas son $300 - 10(30) = 0$ y el ingreso es cero; maximizaste el precio, no el ingreso. -->
- [x] C) 25 000 pesos
  <!-- feedback: Correcto. Con $n$ aumentos, $R(n) = (20000 + 1000n)(300 - 10n)$ y $R'(n) = 100000 - 20000n = 0$ da $n = 5$; el ingreso es $6\,250\,000$ pesos. -->
- [ ] D) 20 000 pesos
  <!-- feedback: Incorrecto. Sin aumento el ingreso es $6\,000\,000$, menor que $R(5) = 25000 \cdot 250 = 6\,250\,000$; maximizar la venta de boletas no maximiza el ingreso. -->

### Explicacion Pedagogica
Sea $n$ el número de aumentos de 1000 pesos. Precio: $20000 + 1000n$; boletas: $300 - 10n$. Ingreso: $R(n) = (20000 + 1000n)(300 - 10n)$. Derivando con la regla del producto: $R'(n) = 1000(300 - 10n) - 10(20000 + 1000n) = 100000 - 20000n$. Así $n = 5$, precio 25 000 pesos, 250 boletas e ingreso de 6 250 000 pesos; $R''(n) = -20000 < 0$ confirma el máximo.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.70
**Contexto:** Una fábrica de Cartagena diseña un recipiente sin tapa, de base cuadrada, que debe contener $32\,000\ \text{cm}^3$ de dulce de coco, usando la menor cantidad de lámina.

### Enunciado
¿Qué dimensiones minimizan el material del recipiente?

### Opciones
- [ ] A) Base de 20 cm por 20 cm y altura de 80 cm
  <!-- feedback: Incorrecto. El volumen se cumple, pero el área es $400 + 4 \cdot 20 \cdot 80 = 6800\ \text{cm}^2$, mayor que $4800$. -->
- [ ] B) Base de 80 cm por 80 cm y altura de 5 cm
  <!-- feedback: Incorrecto. Cumple el volumen, pero gasta $6400 + 4 \cdot 80 \cdot 5 = 8000\ \text{cm}^2$; una base tan ancha desperdicia lámina. -->
- [ ] C) Un cubo de arista aproximada 31,7 cm
  <!-- feedback: Incorrecto. El cubo es óptimo para una caja cerrada, pero esta no tiene tapa; su área es cercana a $5040\ \text{cm}^2$, mayor que $4800$. -->
- [x] D) Base de 40 cm por 40 cm y altura de 20 cm
  <!-- feedback: Correcto. $S(x) = x^2 + \frac{128000}{x}$ y $S'(x) = 2x - \frac{128000}{x^2} = 0$ da $x^3 = 64000$, $x = 40$ y $h = 20$; se usan $4800\ \text{cm}^2$. -->

### Explicacion Pedagogica
Sea $x$ el lado de la base y $h$ la altura: $x^2 h = 32000$, de modo que $h = \frac{32000}{x^2}$. Área sin tapa: $S = x^2 + 4xh = x^2 + \frac{128000}{x}$. Derivada: $S'(x) = 2x - \frac{128000}{x^2} = 0 \Rightarrow x^3 = 64000 \Rightarrow x = 40$. Entonces $h = 20$ y $S = 1600 + 3200 = 4800\ \text{cm}^2$. Como $S''(x) = 2 + \frac{256000}{x^3} > 0$, es un mínimo.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.68
**Contexto:** En un plano de Montería (en km), una vía recta sigue la recta $y = 2x$ y una finca está en el punto $(5, 0)$; se quiere construir el acceso más corto a la vía.

### Enunciado
¿Qué punto de la vía está más cerca de la finca?

### Opciones
- [x] A) $(1, 2)$
  <!-- feedback: Correcto. $D(x) = (x - 5)^2 + (2x)^2$ y $D'(x) = 2(x - 5) + 8x = 10x - 10 = 0$ da $x = 1$; la distancia mínima es $\sqrt{20} = 2\sqrt{5}$ km. -->
- [ ] B) $(5, 10)$
  <!-- feedback: Incorrecto. Tomaste el punto de la vía con la misma abscisa de la finca; su distancia es 10 km, mucho mayor que $2\sqrt{5} \approx 4{,}47$ km. -->
- [ ] C) $\left(\frac{5}{3}, \frac{10}{3}\right)$
  <!-- feedback: Incorrecto. Derivaste $(2x)^2 = 4x^2$ como $4x$; la derivada correcta es $8x$, que lleva a $10x - 10 = 0$. -->
- [ ] D) $(0, 0)$
  <!-- feedback: Incorrecto. El origen está a 5 km de la finca; no es el punto más cercano porque $D'(0) = -10 < 0$, es decir, la distancia aún disminuye. -->

### Explicacion Pedagogica
Un punto de la vía es $(x, 2x)$. Se minimiza el cuadrado de la distancia, que tiene el mismo mínimo: $D(x) = (x - 5)^2 + 4x^2$. Derivada: $D'(x) = 2(x - 5) + 8x = 10x - 10$, que se anula en $x = 1$. El punto es $(1, 2)$ y la distancia es $\sqrt{16 + 4} = 2\sqrt{5} \approx 4{,}47$ km.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.66
**Contexto:** Un ganadero de Arauca tiene 600 m de cerca para un corral rectangular dividido en dos partes iguales por una cerca interior paralela a dos de los lados.

### Enunciado
¿Cuál es el área máxima que puede encerrar?

### Opciones
- [ ] A) $22\,500\ \text{m}^2$
  <!-- feedback: Incorrecto. Es el área de un cuadrado de 150 m que usa los 600 m solo en el borde; ignoraste los metros de la cerca interior. -->
- [ ] B) $10\,000\ \text{m}^2$
  <!-- feedback: Incorrecto. Tomaste $x = 100$ y supusiste $y = x$; con $3x + 2y = 600$ el otro lado es $y = 150$. -->
- [x] C) $15\,000\ \text{m}^2$
  <!-- feedback: Correcto. Con $3x + 2y = 600$, $A(x) = \frac{x(600 - 3x)}{2}$ y $A'(x) = \frac{600 - 6x}{2} = 0$ da $x = 100$, $y = 150$ y $A = 15\,000\ \text{m}^2$. -->
- [ ] D) $30\,000\ \text{m}^2$
  <!-- feedback: Incorrecto. Olvidaste dividir entre 2 al despejar $y = \frac{600 - 3x}{2}$; con $y = 600 - 3x$ la cerca total superaría los 600 m. -->

### Explicacion Pedagogica
Sean $x$ la longitud de los tres tramos paralelos (dos lados y la división) e $y$ la de los otros dos lados: $3x + 2y = 600$, así $y = \frac{600 - 3x}{2}$. Área: $A(x) = \frac{600x - 3x^2}{2}$. Derivada: $A'(x) = \frac{600 - 6x}{2} = 0 \Rightarrow x = 100$. Entonces $y = 150$ y $A = 100 \cdot 150 = 15\,000\ \text{m}^2$; $A'' = -3 < 0$ confirma el máximo.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.64
**Contexto:** En el embalse de El Peñol, el nivel del agua sobre una marca de referencia se modela con $H(t) = t^3 - 12t + 20$ metros, donde $t$ son días de observación, con $0 \le t \le 3$.

### Enunciado
¿Cuál es el nivel máximo del agua en el intervalo $[0, 3]$?

### Opciones
- [x] A) 20 m, en $t = 0$
  <!-- feedback: Correcto. $H(0) = 20$, $H(2) = 4$ y $H(3) = 11$; el mayor valor está en el extremo izquierdo del intervalo. -->
- [ ] B) 4 m, en $t = 2$
  <!-- feedback: Incorrecto. $t = 2$ es el punto crítico, pero $H''(2) = 12 > 0$ indica que allí el nivel es mínimo; no basta con hallar $H' = 0$. -->
- [ ] C) 36 m, en $t = -2$
  <!-- feedback: Incorrecto. $t = -2$ anula $H'$ pero está fuera del dominio $[0, 3]$; no hay observaciones en tiempos negativos. -->
- [ ] D) 11 m, en $t = 3$
  <!-- feedback: Incorrecto. $H(3) = 27 - 36 + 20 = 11$ es menor que $H(0) = 20$; hay que comparar los dos extremos del intervalo. -->

### Explicacion Pedagogica
$H'(t) = 3t^2 - 12 = 0 \Rightarrow t = \pm 2$; en el dominio solo está $t = 2$. Se evalúan los candidatos: $H(0) = 20$, $H(2) = 8 - 24 + 20 = 4$ y $H(3) = 27 - 36 + 20 = 11$. El máximo absoluto es 20 m en $t = 0$ y el mínimo absoluto es 4 m en $t = 2$. El punto crítico resultó ser el mínimo, por eso es indispensable revisar los extremos.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.62
**Contexto:** Un invernadero de flores en La Ceja tiene una entrada en forma de arco parabólico $y = 12 - x^2$ (en metros), y se quiere colocar una puerta rectangular con base sobre el suelo.

### Enunciado
¿Cuál es el área máxima de la puerta rectangular inscrita en el arco?

### Opciones
- [ ] A) $16\ \text{m}^2$
  <!-- feedback: Incorrecto. Usaste la base $x$ en lugar de $2x$; el rectángulo es simétrico y va de $-x$ a $x$, así que su base mide $2x$. -->
- [ ] B) $20\sqrt{2}\ \text{m}^2$
  <!-- feedback: Incorrecto. Derivaste $24x$ como $12$, lo que da $12 - 6x^2 = 0$ y $x = \sqrt{2}$; la derivada correcta es $24 - 6x^2$. -->
- [x] C) $32\ \text{m}^2$
  <!-- feedback: Correcto. $A(x) = 2x(12 - x^2) = 24x - 2x^3$, $A'(x) = 24 - 6x^2 = 0$ da $x = 2$ y $A(2) = 4 \cdot 8 = 32\ \text{m}^2$. -->
- [ ] D) $48\ \text{m}^2$
  <!-- feedback: Incorrecto. Tomaste la altura fija en 12 m, la cima del arco; la altura de la puerta es $12 - x^2$ y en $x = 2$ vale 8 m. -->

### Explicacion Pedagogica
Si un vértice superior está en $(x, 12 - x^2)$ con $x > 0$, la base mide $2x$ y la altura $12 - x^2$. Área: $A(x) = 2x(12 - x^2) = 24x - 2x^3$, para $0 < x < \sqrt{12}$. Derivada: $A'(x) = 24 - 6x^2 = 0 \Rightarrow x = 2$. Puerta de $4\ \text{m} \times 8\ \text{m}$ y área $32\ \text{m}^2$; $A''(2) = -24 < 0$ confirma el máximo.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.60
**Contexto:** En Itagüí, Sofía arma una caja sin tapa con una lámina de 16 cm por 10 cm recortando cuadrados de lado $x$; obtiene $V'(x) = 12x^2 - 104x + 160$, con raíces $x = 2$ y $x = \frac{20}{3}$, y escoge $x = \frac{20}{3}$.

### Enunciado
¿Cuál evaluación del trabajo de Sofía es correcta?

### Opciones
- [ ] A) Acierta: ambas raíces son válidas y $x = \frac{20}{3}$ da mayor volumen
  <!-- feedback: Incorrecto. $V\left(\frac{20}{3}\right) = \frac{20}{3} \cdot \frac{8}{3} \cdot \left(-\frac{10}{3}\right)$ es negativo; ni siquiera es un volumen posible. -->
- [x] B) Se equivoca: $x = \frac{20}{3}$ está fuera del dominio $(0, 5)$ porque el lado $10 - 2x$ sería negativo; el máximo es $V(2) = 144\ \text{cm}^3$
  <!-- feedback: Correcto. Con $x = \frac{20}{3}$ se tiene $10 - 2x = -\frac{10}{3} < 0$, y en el dominio el único candidato es $x = 2$ con $V(2) = 2 \cdot 12 \cdot 6 = 144$. -->
- [ ] C) Se equivoca: $x = 2$ es un mínimo porque $V''(2) > 0$
  <!-- feedback: Incorrecto. $V''(x) = 24x - 104$ da $V''(2) = -56 < 0$, que indica máximo, no mínimo. -->
- [ ] D) Se equivoca: el máximo está en el extremo $x = 5$
  <!-- feedback: Incorrecto. En $x = 5$ el lado $10 - 2x$ vale 0 y el volumen es 0, el menor valor posible. -->

### Explicacion Pedagogica
Volumen: $V(x) = x(16 - 2x)(10 - 2x) = 4x^3 - 52x^2 + 160x$, con dominio $0 < x < 5$ para que ambos lados sean positivos. $V'(x) = 12x^2 - 104x + 160 = 4(3x - 20)(x - 2)$. La raíz $\frac{20}{3} \approx 6{,}67$ no está en $(0, 5)$. En $x = 2$: $V''(2) = -56 < 0$ y $V(2) = 144\ \text{cm}^3$. Toda solución de optimización debe revisarse contra el dominio físico.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.58
**Contexto:** Una empresa de telecomunicaciones debe llevar fibra óptica desde una orilla de un río de 3 km de ancho hasta un pueblo en la otra orilla, 8 km aguas abajo; el tramo bajo el agua cuesta 5 millones de pesos por km y el tramo por tierra 4 millones por km.

### Enunciado
Si el cable cruza el río hasta un punto a $x$ km aguas abajo y sigue por la orilla, ¿cuál es la opción de menor costo?

### Opciones
- [ ] A) Cruzar perpendicularmente ($x = 0$), con costo de 47 millones
  <!-- feedback: Incorrecto. $C(0) = 5 \cdot 3 + 4 \cdot 8 = 47$; cruzar en línea recta corta el tramo caro pero alarga demasiado el de tierra. -->
- [ ] B) Ir en línea recta hasta el pueblo, con costo aproximado de 42,7 millones
  <!-- feedback: Incorrecto. Todo bajo el agua cuesta $5\sqrt{73} \approx 42{,}7$ millones, más que 41; es el extremo $x = 8$ del dominio. -->
- [ ] C) Cruzar hasta $x = 0{,}8$ km, con costo aproximado de 44,3 millones
  <!-- feedback: Incorrecto. Al elevar al cuadrado escribiste $25x^2 = 16$ y olvidaste multiplicar 16 por $(9 + x^2)$; así se obtiene $x = 0{,}8$ en vez de $x = 4$. -->
- [x] D) Cruzar hasta $x = 4$ km, con costo de 41 millones
  <!-- feedback: Correcto. $C'(x) = \frac{5x}{\sqrt{9 + x^2}} - 4 = 0$ da $x = 4$ y $C(4) = 5 \cdot 5 + 4 \cdot 4 = 41$ millones. -->

### Explicacion Pedagogica
Costo: $C(x) = 5\sqrt{9 + x^2} + 4(8 - x)$, con $0 \le x \le 8$. Derivada: $C'(x) = \frac{5x}{\sqrt{9 + x^2}} - 4 = 0 \Rightarrow 5x = 4\sqrt{9 + x^2} \Rightarrow 25x^2 = 16(9 + x^2) \Rightarrow 9x^2 = 144 \Rightarrow x = 4$. Se comparan los candidatos: $C(0) = 47$, $C(4) = 41$ y $C(8) \approx 42{,}7$. El mínimo es 41 millones.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.56
**Contexto:** Una fábrica de sombreros vueltiaos en Tuchín tiene un costo total $C(x) = x^2 + 400x + 10\,000$ (miles de pesos) por producir $x$ sombreros.

### Enunciado
¿Cuántos sombreros minimizan el costo promedio por unidad $c(x) = \frac{C(x)}{x}$, y cuál es ese costo?

### Opciones
- [x] A) 100 sombreros, con costo promedio de 600 mil pesos
  <!-- feedback: Correcto. $c(x) = x + 400 + \frac{10000}{x}$, $c'(x) = 1 - \frac{10000}{x^2} = 0$ da $x = 100$ y $c(100) = 100 + 400 + 100 = 600$. -->
- [ ] B) 100 sombreros, con costo promedio de 500 mil pesos
  <!-- feedback: Incorrecto. La cantidad es correcta, pero al evaluar omitiste el término $\frac{10000}{100} = 100$; el costo promedio es 600 mil. -->
- [ ] C) 10 000 sombreros
  <!-- feedback: Incorrecto. Derivaste $\frac{10000}{x}$ como $-\frac{10000}{x}$; la derivada es $-\frac{10000}{x^2}$, y con ella $x^2 = 10000$. -->
- [ ] D) 20 sombreros
  <!-- feedback: Incorrecto. Tomaste $\sqrt{400} = 20$ sin plantear $c'(x) = 0$; en $x = 20$ el costo promedio es $20 + 400 + 500 = 920$ mil. -->

### Explicacion Pedagogica
Costo promedio: $c(x) = \frac{x^2 + 400x + 10000}{x} = x + 400 + \frac{10000}{x}$. Derivada: $c'(x) = 1 - \frac{10000}{x^2} = 0 \Rightarrow x = 100$ (se descarta $-100$). Como $c''(x) = \frac{20000}{x^3} > 0$, es mínimo. Costo promedio mínimo: $c(100) = 600$ mil pesos por sombrero. En ese punto el costo marginal $C'(100) = 600$ coincide con el costo promedio.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.55
**Contexto:** Desde un cruce en los Llanos, un bus parte hacia el norte a 60 km/h y, al mismo tiempo, un camión que está 100 km al este del cruce avanza hacia él a 80 km/h.

### Enunciado
¿En qué momento están más cerca los dos vehículos y cuál es esa distancia mínima?

### Opciones
- [x] A) A los 48 minutos, a 60 km de distancia
  <!-- feedback: Correcto. $D^2 = (100 - 80t)^2 + (60t)^2$ y su derivada $-160(100 - 80t) + 7200t = 0$ da $t = 0{,}8$ h; $D = \sqrt{36^2 + 48^2} = 60$ km. -->
- [ ] B) A 1 h 15 min, a 75 km de distancia
  <!-- feedback: Incorrecto. En $t = 1{,}25$ h el camión llega al cruce, pero el bus ya está a 75 km; la distancia mínima ocurre antes, en $t = 0{,}8$ h. -->
- [ ] C) Al partir, a 100 km de distancia
  <!-- feedback: Incorrecto. En $t = 0$ la distancia es 100 km y la derivada de $D^2$ es negativa, $-16000 < 0$, así que la distancia aún disminuye. -->
- [ ] D) A los 48 minutos, a 36 km de distancia
  <!-- feedback: Incorrecto. 36 km es solo la distancia del camión al cruce, $100 - 80(0{,}8)$; faltó combinarla con los 48 km del bus mediante Pitágoras. -->

### Explicacion Pedagogica
Con el cruce en el origen, el bus está en $(0, 60t)$ y el camión en $(100 - 80t, 0)$. Se minimiza $D^2(t) = (100 - 80t)^2 + 3600t^2$. Derivada: $-160(100 - 80t) + 7200t = -16000 + 20000t = 0 \Rightarrow t = 0{,}8$ h, es decir, 48 min. En ese instante el camión está a 36 km y el bus a 48 km del cruce: $D = \sqrt{1296 + 2304} = 60$ km.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.53
**Contexto:** Un taller de calzado en el barrio Restrepo de Bogotá tiene ganancia diaria $U(x) = -x^2 + 80x - 300$ (miles de pesos) por $x$ pares, pero su capacidad máxima es de 30 pares al día.

### Enunciado
¿Cuántos pares debe producir para obtener la mayor ganancia posible?

### Opciones
- [ ] A) 40 pares, con ganancia de 1 300 000 pesos
  <!-- feedback: Incorrecto. $x = 40$ anula $U'$, pero supera la capacidad de 30 pares; un punto crítico fuera del dominio no es una solución factible. -->
- [ ] B) No hay máximo, porque el punto crítico $x = 40$ queda fuera del dominio
  <!-- feedback: Incorrecto. $U$ es continua en el intervalo cerrado $[0, 30]$, así que sí tiene máximo; está en un extremo del intervalo. -->
- [ ] C) 15 pares, el punto medio de la capacidad
  <!-- feedback: Incorrecto. Elegir el punto medio no es un criterio: $U(15) = -225 + 1200 - 300 = 675$ mil, menor que $U(30) = 1200$ mil. -->
- [x] D) 30 pares, con ganancia de 1 200 000 pesos, porque $U$ crece en todo $[0, 30]$
  <!-- feedback: Correcto. $U'(x) = 80 - 2x > 0$ para $x < 40$, así que en $[0, 30]$ el máximo está en el extremo: $U(30) = -900 + 2400 - 300 = 1200$ mil. -->

### Explicacion Pedagogica
$U'(x) = -2x + 80 = 0$ da $x = 40$, que no pertenece a $[0, 30]$. En el intervalo, $U'(x) > 0$, luego $U$ es creciente y el máximo está en $x = 30$. Comparación: $U(0) = -300$ y $U(30) = 1200$ miles de pesos. La restricción de capacidad cambia la respuesta del problema sin restricción.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Una cooperativa lechera de Ubaté modela su ganancia con $P(x) = -x^3 + 6x^2 + 15x$ (millones de pesos), con $x \ge 0$ en miles de litros, y encuentra el punto crítico $x = 5$.

### Enunciado
¿Cuál argumento justifica correctamente que $P(5) = 100$ es la ganancia máxima absoluta en $[0, \infty)$?

### Opciones
- [ ] A) $P''(5) < 0$ basta por sí solo para asegurar el máximo absoluto en cualquier dominio
  <!-- feedback: Incorrecto. $P''(5) = -18 < 0$ garantiza solo un máximo local; para el absoluto hace falta analizar todo el dominio. -->
- [ ] B) El máximo está en $x = -1$, que también anula $P'$
  <!-- feedback: Incorrecto. $x = -1$ está fuera de $[0, \infty)$ y además $P(-1) = -8$, un mínimo local. -->
- [ ] C) Como $P(0) = 0$, el máximo absoluto está en $x = 0$
  <!-- feedback: Incorrecto. $P(5) = 100 > P(0) = 0$; el extremo $x = 0$ es el menor valor cerca del origen, no el mayor. -->
- [x] D) $P' > 0$ en $(0, 5)$, $P' < 0$ en $(5, \infty)$ y $x = 5$ es el único punto crítico del dominio
  <!-- feedback: Correcto. $P'(x) = -3(x - 5)(x + 1)$: $P$ sube hasta 5 y baja después, así que ningún valor del dominio supera $P(5) = 100$. -->

### Explicacion Pedagogica
$P'(x) = -3x^2 + 12x + 15 = -3(x - 5)(x + 1)$. En $[0, \infty)$ el único punto crítico es $x = 5$. Para $0 < x < 5$, $P' > 0$ y para $x > 5$, $P' < 0$: $P$ crece y luego decrece sin volver a subir, así que $P(5) = -125 + 150 + 75 = 100$ es máximo absoluto. Un único punto crítico con cambio de signo de $P'$ basta en un intervalo.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Geometrico
**Expected_Success:** 0.48
**Contexto:** Una finca en el Quindío necesita un tanque cilíndrico abierto por arriba con volumen $27\pi\ \text{m}^3$, usando la menor área de lámina.

### Enunciado
¿Cuáles dimensiones minimizan el material?

### Opciones
- [ ] A) Radio aproximado de 2,38 m y altura aproximada de 4,76 m
  <!-- feedback: Incorrecto. Usaste el área del cilindro cerrado $2\pi r^2 + \frac{54\pi}{r}$, que da $r^3 = 13{,}5$; el tanque no tiene tapa y lleva un solo círculo. -->
- [x] B) Radio de 3 m y altura de 3 m
  <!-- feedback: Correcto. $S(r) = \pi r^2 + \frac{54\pi}{r}$, $S'(r) = 2\pi r - \frac{54\pi}{r^2} = 0$ da $r^3 = 27$, $r = 3$ y $h = \frac{27}{9} = 3$. -->
- [ ] C) Radio de 3 m y altura de 6 m
  <!-- feedback: Incorrecto. Aplicaste la regla $h = 2r$ del cilindro cerrado; además el volumen sería $\pi \cdot 9 \cdot 6 = 54\pi$, el doble del pedido. -->
- [ ] D) Radio aproximado de 5,2 m y altura de 1 m
  <!-- feedback: Incorrecto. Resolviste $r^2 = 27$ en vez de $r^3 = 27$; con $r = 3\sqrt{3}$ el área es mayor que la del óptimo $r = 3$. -->

### Explicacion Pedagogica
Volumen: $\pi r^2 h = 27\pi \Rightarrow h = \frac{27}{r^2}$. Área sin tapa: $S = \pi r^2 + 2\pi r h = \pi r^2 + \frac{54\pi}{r}$. Derivada: $S'(r) = 2\pi r - \frac{54\pi}{r^2} = 0 \Rightarrow r^3 = 27 \Rightarrow r = 3$ m, y $h = 3$ m. Como $S''(r) = 2\pi + \frac{108\pi}{r^3} > 0$, es mínimo, con $S = 27\pi\ \text{m}^2$. En un cilindro abierto óptimo la altura es igual al radio.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.47
**Contexto:** Una imprenta de Medellín diseña un afiche cuya zona impresa mide $600\ \text{cm}^2$, con márgenes de 3 cm arriba y abajo y de 2 cm a cada lado.

### Enunciado
¿Qué dimensiones de la hoja (ancho por alto) minimizan el papel usado?

### Opciones
- [ ] A) 20 cm por 30 cm
  <!-- feedback: Incorrecto. Esas son las dimensiones de la zona impresa; faltó sumar los márgenes, 4 cm al ancho y 6 cm al alto. -->
- [x] B) 24 cm por 36 cm
  <!-- feedback: Correcto. Con zona impresa $x \times \frac{600}{x}$, el papel es $(x + 4)\left(\frac{600}{x} + 6\right) = 624 + 6x + \frac{2400}{x}$; su derivada se anula en $x = 20$ y la hoja mide $24 \times 36$. -->
- [ ] C) 22 cm por 33 cm
  <!-- feedback: Incorrecto. Sumaste un solo margen por dimensión (2 cm y 3 cm); hay márgenes a ambos lados, por eso se suman 4 cm y 6 cm. -->
- [ ] D) Aproximadamente 28,5 cm por 30,5 cm
  <!-- feedback: Incorrecto. Supusiste que la zona impresa óptima es un cuadrado de lado $\sqrt{600}$; con márgenes distintos el área sería cerca de $869\ \text{cm}^2$, más que $864$. -->

### Explicacion Pedagogica
Sea $x$ el ancho impreso y $\frac{600}{x}$ el alto impreso. Hoja: $(x + 4)$ por $\left(\frac{600}{x} + 6\right)$, con área $A(x) = 624 + 6x + \frac{2400}{x}$. Derivada: $A'(x) = 6 - \frac{2400}{x^2} = 0 \Rightarrow x^2 = 400 \Rightarrow x = 20$. La zona impresa es $20 \times 30$ y la hoja $24 \times 36$, con $864\ \text{cm}^2$; $A''(x) = \frac{4800}{x^3} > 0$ confirma el mínimo.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W18-optimizacion-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.45
**Contexto:** Una transportadora planea un viaje de 400 km entre Bogotá y Medellín; paga al conductor 100 000 pesos por hora y el combustible le cuesta $10v^2$ pesos por hora a velocidad $v$ km/h, con límite legal de 80 km/h.

### Enunciado
Si el costo total del viaje es $T(v) = \frac{40\,000\,000}{v} + 4000v$, ¿qué velocidad conviene y por qué?

### Opciones
- [ ] A) 100 km/h, con costo de 800 000 pesos
  <!-- feedback: Incorrecto. $v = 100$ anula $T'$, pero supera el límite de 80 km/h; la solución tiene que respetar el dominio $(0, 80]$. -->
- [ ] B) No hay velocidad óptima, porque el punto crítico queda fuera del dominio
  <!-- feedback: Incorrecto. En $(0, 80]$ el costo sí tiene mínimo: $T$ es decreciente y alcanza su menor valor en $v = 80$. -->
- [x] C) 80 km/h, porque $T$ decrece en $(0, 80]$ y el mínimo sin restricción, $v = 100$, no es legal; el costo es 820 000 pesos
  <!-- feedback: Correcto. $T'(v) = -\frac{40000000}{v^2} + 4000 < 0$ para $v < 100$, así que el menor costo permitido está en el extremo $v = 80$: $500000 + 320000 = 820000$. -->
- [ ] D) 60 km/h, porque a menor velocidad se gasta menos combustible
  <!-- feedback: Incorrecto. Ignoraste el pago al conductor: $T(60) \approx 906\,667$ pesos, mayor que $T(80) = 820\,000$. -->

### Explicacion Pedagogica
Tiempo de viaje: $\frac{400}{v}$ horas. Costo: $T(v) = \frac{400}{v}(100000 + 10v^2) = \frac{40000000}{v} + 4000v$. Derivada: $T'(v) = -\frac{40000000}{v^2} + 4000 = 0 \Rightarrow v^2 = 10000 \Rightarrow v = 100$. Como $100 > 80$, en $(0, 80]$ se tiene $T' < 0$ y $T$ decrece; el mínimo factible es $T(80) = 500000 + 320000 = 820000$ pesos.
