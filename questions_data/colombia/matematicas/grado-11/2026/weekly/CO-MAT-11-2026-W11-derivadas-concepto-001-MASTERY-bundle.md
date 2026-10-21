---
id: "CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "derivadas-concepto"
periodo: "weekly"
week: "W11"
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

# Bundle MASTERY: Concepto de Derivada - Grado 11

Veinte preguntas sobre la derivada como límite del cociente de diferencias, pendiente de la tangente y razón de cambio instantánea, con interpretación en contextos colombianos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** En el cuaderno de cálculo de una estudiante de Bogotá aparece la definición formal de la derivada de una función $f$ en un punto $a$.

### Enunciado
¿Cuál expresión define $f'(a)$?

### Opciones
- [ ] A) $\lim_{h \to 0} [f(a + h) - f(a)]$
  <!-- feedback: Incorrecto. Falta dividir entre $h$; ese límite vale 0 para toda función continua y no mide pendiente. -->
- [x] B) $\lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$
  <!-- feedback: Correcto. Es el límite del cociente de diferencias: la pendiente de la secante cuando el segundo punto se acerca a $a$. -->
- [ ] C) $\lim_{h \to \infty} \frac{f(a + h) - f(a)}{h}$
  <!-- feedback: Incorrecto. Con $h \to \infty$ el segundo punto se aleja; la derivada exige que $h$ tienda a 0. -->
- [ ] D) $\frac{f(b) - f(a)}{b - a}$
  <!-- feedback: Incorrecto. Es la tasa de cambio promedio entre $a$ y $b$ (pendiente de una secante); sin el límite no es la derivada. -->

### Explicacion Pedagogica
La derivada en $a$ se define como $f'(a) = \lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$. El cociente es la pendiente de la recta secante entre $(a, f(a))$ y $(a + h, f(a + h))$; al hacer $h \to 0$ la secante se convierte en la recta tangente.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.83
**Contexto:** La posición $s(t)$, en kilómetros, de un bus del MIO en Cali a lo largo de su ruta se registra en función del tiempo $t$, en minutos.

### Enunciado
¿Qué representa $s'(t)$?

### Opciones
- [x] A) La velocidad instantánea del bus en el minuto $t$
  <!-- feedback: Correcto. La derivada de la posición respecto al tiempo es la razón de cambio instantánea de la posición, es decir, la velocidad en km/min. -->
- [ ] B) La distancia total recorrida hasta el minuto $t$
  <!-- feedback: Incorrecto. Eso lo da $s(t)$ (o el cambio $s(t) - s(0)$), no su derivada. -->
- [ ] C) La aceleración del bus en el minuto $t$
  <!-- feedback: Incorrecto. La aceleración es la derivada de la velocidad, o sea $s''(t)$, no $s'(t)$. -->
- [ ] D) La velocidad media entre el minuto 0 y el minuto $t$
  <!-- feedback: Incorrecto. La velocidad media es $\frac{s(t) - s(0)}{t}$, un cociente sin límite; $s'(t)$ es instantánea. -->

### Explicacion Pedagogica
Si $s(t)$ es la posición, $s'(t) = \lim_{h \to 0} \frac{s(t + h) - s(t)}{h}$ mide cuántos kilómetros cambia la posición por minuto en el instante $t$. Sus unidades son km/min y su signo indica el sentido de movimiento.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.81
**Contexto:** Un artesano de Ráquira fabrica baldosas cuadradas; el área de una baldosa de lado $x$ (dm) es $A(x) = x^2$.

### Enunciado
¿Cuál es la tasa de cambio promedio del área cuando el lado pasa de $1$ dm a $4$ dm?

### Opciones
- [ ] A) $15\text{ dm}^2$ por dm
  <!-- feedback: Incorrecto. 15 es el cambio total del área; faltó dividir entre el cambio del lado, que es 3 dm. -->
- [ ] B) $8\text{ dm}^2$ por dm
  <!-- feedback: Incorrecto. 8 es $A'(4) = 2 \cdot 4$, la tasa instantánea en $x = 4$, no la promedio en $[1, 4]$. -->
- [x] C) $5\text{ dm}^2$ por dm
  <!-- feedback: Correcto. $\frac{A(4) - A(1)}{4 - 1} = \frac{16 - 1}{3} = 5$. -->
- [ ] D) $3\text{ dm}^2$ por dm
  <!-- feedback: Incorrecto. 3 es el cambio del lado $\Delta x$; la tasa promedio es $\frac{\Delta A}{\Delta x}$. -->

### Explicacion Pedagogica
La tasa de cambio promedio de $A$ en $[1, 4]$ es $\frac{\Delta A}{\Delta x} = \frac{A(4) - A(1)}{4 - 1} = \frac{16 - 1}{3} = 5$ dm² por cada dm. Geométricamente es la pendiente de la recta secante que une $(1, 1)$ y $(4, 16)$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.79
**Contexto:** En Manizales se sirve un tinto caliente y su temperatura $T(t)$, en $^\circ$C, se mide $t$ minutos después de servirlo. Se sabe que $T'(5) = -2$.

### Enunciado
¿Cuál es la interpretación correcta de $T'(5) = -2$?

### Opciones
- [ ] A) A los 5 minutos la temperatura del tinto es $-2\,^\circ$C
  <!-- feedback: Incorrecto. $T'(5)$ no es la temperatura, que sería $T(5)$; es la razón de cambio de la temperatura. -->
- [x] B) A los 5 minutos la temperatura baja a razón de aproximadamente $2\,^\circ$C por minuto
  <!-- feedback: Correcto. El signo negativo indica que $T$ decrece y el valor 2 es la rapidez instantánea del cambio en ese momento. -->
- [ ] C) Durante los primeros 5 minutos la temperatura bajó en total $2\,^\circ$C
  <!-- feedback: Incorrecto. Eso describe un cambio acumulado en un intervalo; la derivada describe la rapidez en el instante $t = 5$. -->
- [ ] D) A los 5 minutos la temperatura sube $2\,^\circ$C por minuto
  <!-- feedback: Incorrecto. Una derivada negativa indica disminución, no aumento. -->

### Explicacion Pedagogica
Las unidades de $T'(t)$ son $^\circ$C por minuto. $T'(5) = -2$ significa que cerca de $t = 5$ la temperatura disminuye unos 2 °C por minuto, de modo que $T(6) \approx T(5) - 2$. Es una información local, no un valor de la temperatura.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.77
**Contexto:** En un taller de cálculo en Medellín se estudia la función $f(x) = 3x^2$, que modela el área de una placa, y se forma su cociente de diferencias en $x = 2$.

### Enunciado
Para $h \neq 0$, ¿a qué es igual $\frac{f(2 + h) - f(2)}{h}$?

### Opciones
- [ ] A) $12$
  <!-- feedback: Incorrecto. 12 es el límite cuando $h \to 0$, es decir $f'(2)$; para $h \neq 0$ el cociente conserva el término $3h$. -->
- [ ] B) $3h$
  <!-- feedback: Incorrecto. Se omitió el término $12h$ del desarrollo de $3(2 + h)^2$; el doble producto es $3 \cdot 2 \cdot 2h = 12h$. -->
- [x] C) $12 + 3h$
  <!-- feedback: Correcto. $f(2 + h) = 3(4 + 4h + h^2) = 12 + 12h + 3h^2$; al restar 12 y dividir entre $h$ queda $12 + 3h$. -->
- [ ] D) $12h + 3h^2$
  <!-- feedback: Incorrecto. Es el numerador $f(2 + h) - f(2)$; faltó dividir entre $h$. -->

### Explicacion Pedagogica
Se desarrolla $f(2 + h) = 3(2 + h)^2 = 12 + 12h + 3h^2$. Entonces $f(2 + h) - f(2) = 12h + 3h^2$ y, dividiendo entre $h \neq 0$, el cociente es $12 + 3h$. Al tomar $h \to 0$ se obtiene $f'(2) = 12$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.75
**Contexto:** Desde un puente sobre el río Cauca se suelta una piedra; la distancia que ha caído es $s(t) = 4{,}9t^2$ metros, con $t$ en segundos.

### Enunciado
¿Cuál es la velocidad instantánea de la piedra en $t = 3$ s?

### Opciones
- [x] A) $29{,}4\text{ m/s}$
  <!-- feedback: Correcto. $s'(t) = \lim_{h \to 0} \frac{4{,}9(3 + h)^2 - 4{,}9 \cdot 9}{h} = \lim_{h \to 0}(29{,}4 + 4{,}9h) = 29{,}4$. -->
- [ ] B) $44{,}1\text{ m/s}$
  <!-- feedback: Incorrecto. 44,1 es $s(3)$, la distancia caída en metros; se confundió posición con velocidad. -->
- [ ] C) $14{,}7\text{ m/s}$
  <!-- feedback: Incorrecto. Es la velocidad media en $[0, 3]$, $\frac{44{,}1}{3}$; la instantánea requiere el límite en $t = 3$. -->
- [ ] D) $9{,}8\text{ m/s}$
  <!-- feedback: Incorrecto. 9,8 m/s² es la aceleración (derivada de la velocidad), no la velocidad en $t = 3$. -->

### Explicacion Pedagogica
Con el cociente de diferencias: $\frac{s(3 + h) - s(3)}{h} = \frac{4{,}9(6h + h^2)}{h} = 29{,}4 + 4{,}9h$. Cuando $h \to 0$ la velocidad instantánea es $29{,}4$ m/s. Coincide con $s'(t) = 9{,}8t$ evaluada en $t = 3$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.73
**Contexto:** En una clase en Cartagena se analiza la hipérbola $f(x) = \frac{1}{x}$ y se quiere la pendiente de su recta tangente en $x = 2$ usando la definición.

### Enunciado
¿Cuál es el valor de $f'(2)$?

### Opciones
- [ ] A) $\frac{1}{4}$
  <!-- feedback: Incorrecto. Se perdió el signo: $\frac{1}{2 + h} - \frac{1}{2} = \frac{-h}{2(2 + h)}$ es negativo; la función decrece. -->
- [ ] B) $-\frac{1}{2}$
  <!-- feedback: Incorrecto. Se calculó $-\frac{1}{x}$ en $x = 2$; el denominador del límite es $2 \cdot 2 = 4$, no 2. -->
- [ ] C) $\frac{1}{2}$
  <!-- feedback: Incorrecto. $\frac{1}{2}$ es $f(2)$, el valor de la función, no la pendiente de la tangente. -->
- [x] D) $-\frac{1}{4}$
  <!-- feedback: Correcto. $\frac{\frac{1}{2 + h} - \frac{1}{2}}{h} = \frac{-1}{2(2 + h)}$, que tiende a $-\frac{1}{4}$ cuando $h \to 0$. -->

### Explicacion Pedagogica
Se forma el cociente: $\frac{1}{h}\left(\frac{1}{2 + h} - \frac{1}{2}\right) = \frac{1}{h} \cdot \frac{2 - (2 + h)}{2(2 + h)} = \frac{-1}{2(2 + h)}$. Al hacer $h \to 0$ resulta $f'(2) = -\frac{1}{4}$: la tangente baja porque $\frac{1}{x}$ decrece para $x > 0$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.71
**Contexto:** Un ciclista entrena en una vía de Boyacá y su posición es $d(t) = 2t^2 + 3t$ metros, con $t$ en segundos.

### Enunciado
¿Cuál afirmación sobre su velocidad es correcta?

### Opciones
- [x] A) La velocidad media en $[1, 3]$ y la velocidad instantánea en $t = 2$ valen ambas $11\text{ m/s}$
  <!-- feedback: Correcto. $\frac{d(3) - d(1)}{2} = \frac{27 - 5}{2} = 11$ y $d'(2) = 4 \cdot 2 + 3 = 11$. -->
- [ ] B) La velocidad media en $[1, 3]$ es $22\text{ m/s}$
  <!-- feedback: Incorrecto. 22 m es el desplazamiento $d(3) - d(1)$; faltó dividir entre los 2 s del intervalo. -->
- [ ] C) La velocidad instantánea en $t = 2$ es $14\text{ m/s}$
  <!-- feedback: Incorrecto. 14 es $d(2)$, la posición en metros; la velocidad es $d'(2) = 11$ m/s. -->
- [ ] D) La velocidad media en $[1, 3]$ es $16\text{ m/s}$
  <!-- feedback: Incorrecto. 16 es el promedio de las posiciones $\frac{d(1) + d(3)}{2}$, no la razón desplazamiento sobre tiempo. -->

### Explicacion Pedagogica
Velocidad media: $\frac{d(3) - d(1)}{3 - 1} = \frac{27 - 5}{2} = 11$ m/s. Velocidad instantánea: $d'(t) = 4t + 3$, así que $d'(2) = 11$ m/s. Para funciones cuadráticas la pendiente de la secante en $[a, b]$ coincide con la tangente en el punto medio.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.69
**Contexto:** La empresa que opera el embalse de El Peñol (Antioquia) registra el nivel del agua: $12{,}0\text{ m}$ el día 4, $12{,}6\text{ m}$ el día 5 y $13{,}4\text{ m}$ el día 6.

### Enunciado
Estimando $h'(5)$ como el promedio de las tasas medias en $[4, 5]$ y $[5, 6]$, ¿qué valor se obtiene?

### Opciones
- [ ] A) $1{,}4\text{ m/día}$
  <!-- feedback: Incorrecto. 1,4 m es el cambio entre los días 4 y 6; faltó dividir entre los 2 días. -->
- [ ] B) $12{,}6\text{ m/día}$
  <!-- feedback: Incorrecto. 12,6 m es el nivel del día 5, $h(5)$; la derivada mide cambio por día, no el nivel. -->
- [x] C) $0{,}7\text{ m/día}$
  <!-- feedback: Correcto. Las tasas son $0{,}6$ y $0{,}8$ m/día; su promedio es $\frac{13{,}4 - 12{,}0}{2} = 0{,}7$. -->
- [ ] D) $0{,}8\text{ m/día}$
  <!-- feedback: Incorrecto. Es solo la tasa media en $[5, 6]$; el método pedido promedia también la de $[4, 5]$, que es 0,6. -->

### Explicacion Pedagogica
Tasa media en $[4, 5]$: $\frac{12{,}6 - 12{,}0}{1} = 0{,}6$ m/día. En $[5, 6]$: $\frac{13{,}4 - 12{,}6}{1} = 0{,}8$ m/día. El promedio, $0{,}7$ m/día, equivale a la diferencia centrada $\frac{h(6) - h(4)}{2}$ y suele aproximar mejor la derivada que cada lado por separado.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.67
**Contexto:** En una fábrica de arepas de Rionegro, el costo diario $C(x)$ (millones de pesos) de producir $x$ miles de arepas cumple $C(3) = 10$ y $C'(3) = 4$.

### Enunciado
Usando la recta tangente, ¿cuál es la mejor estimación de $C(3{,}2)$?

### Opciones
- [x] A) $10{,}8$ millones
  <!-- feedback: Correcto. $C(3{,}2) \approx C(3) + C'(3) \cdot 0{,}2 = 10 + 4 \cdot 0{,}2 = 10{,}8$. -->
- [ ] B) $14$ millones
  <!-- feedback: Incorrecto. Se sumó $C'(3) = 4$ completo, como si $x$ aumentara 1; el aumento es solo 0,2. -->
- [ ] C) $10{,}2$ millones
  <!-- feedback: Incorrecto. Se sumó el cambio $\Delta x = 0{,}2$ sin multiplicarlo por la pendiente $C'(3) = 4$. -->
- [ ] D) $0{,}8$ millones
  <!-- feedback: Incorrecto. 0,8 es solo el incremento estimado $C'(3)\Delta x$; faltó sumarlo al valor inicial $C(3) = 10$. -->

### Explicacion Pedagogica
Cerca de $x = 3$, la función se aproxima por su recta tangente: $C(x) \approx C(3) + C'(3)(x - 3)$. Con $x = 3{,}2$: $C(3{,}2) \approx 10 + 4(0{,}2) = 10{,}8$ millones. La derivada convierte el cambio de producción en cambio de costo.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.65
**Contexto:** Un ingeniero en Pasto modela el perfil de una cerca con $f(x) = |x - 2|$, que forma un pico en $x = 2$.

### Enunciado
¿Cuál afirmación sobre $f$ en $x = 2$ es correcta?

### Opciones
- [ ] A) $f$ es derivable en 2 porque es continua en 2
  <!-- feedback: Incorrecto. La continuidad no implica derivabilidad; en una esquina las pendientes laterales no coinciden. -->
- [ ] B) $f$ no es continua en 2
  <!-- feedback: Incorrecto. Sí lo es: la gráfica no tiene saltos y $\lim_{x \to 2} f(x) = f(2) = 0$. -->
- [ ] C) $f$ es derivable en 2 y $f'(2) = 0$
  <!-- feedback: Incorrecto. No existe una única tangente: las pendientes laterales son $-1$ y $1$; que $f(2) = 0$ no da $f'(2) = 0$. -->
- [x] D) $f$ es continua en 2 pero no es derivable allí
  <!-- feedback: Correcto. $\lim_{x \to 2} |x - 2| = 0 = f(2)$, pero el cociente de diferencias vale $-1$ por la izquierda y $1$ por la derecha. -->

### Explicacion Pedagogica
Para $h > 0$, $\frac{|h|}{h} = 1$; para $h < 0$, $\frac{|h|}{h} = -1$. Como los límites laterales del cociente difieren, $f'(2)$ no existe. Sin embargo $f$ es continua en 2. Esto muestra que la derivabilidad implica continuidad, pero no al revés.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.63
**Contexto:** En un estudio de ventas de una tienda de Bucaramanga, la función $f$ crece en $(-\infty, 1)$, decrece en $(1, 4)$, vuelve a crecer en $(4, \infty)$ y tiene tangente horizontal en $x = 1$ y $x = 4$.

### Enunciado
¿Cuál afirmación sobre $f'$ es correcta?

### Opciones
- [ ] A) $f'(x) > 0$ en $(1, 4)$
  <!-- feedback: Incorrecto. En $(1, 4)$ la función decrece, así que las pendientes de sus tangentes son negativas. -->
- [ ] B) $f'(1)$ es el valor máximo de $f$
  <!-- feedback: Incorrecto. $f(1)$ puede ser un máximo local de $f$; $f'(1) = 0$ es la pendiente allí, no un valor de $f$. -->
- [ ] C) $f'(x) < 0$ en todos los puntos donde $f(x) < 0$
  <!-- feedback: Incorrecto. El signo de $f'$ depende de si $f$ crece o decrece, no de si $f$ es negativa. -->
- [x] D) $f'(x) < 0$ en $(1, 4)$ y $f'(1) = f'(4) = 0$
  <!-- feedback: Correcto. Donde $f$ decrece las tangentes tienen pendiente negativa, y una tangente horizontal tiene pendiente 0. -->

### Explicacion Pedagogica
La derivada es la pendiente de la tangente. Si $f$ crece, $f' > 0$; si decrece, $f' < 0$; con tangente horizontal, $f' = 0$. Aquí $f' > 0$ en $(-\infty, 1)$ y $(4, \infty)$, $f' < 0$ en $(1, 4)$ y $f'(1) = f'(4) = 0$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.61
**Contexto:** La gráfica posición-tiempo de un bus de TransMilenio es: recta de pendiente $0{,}5$ km/min entre $t = 0$ y $t = 2$; horizontal entre $t = 2$ y $t = 3$; recta de pendiente $0{,}8$ km/min entre $t = 3$ y $t = 6$.

### Enunciado
¿Cuál afirmación es correcta?

### Opciones
- [ ] A) En $t = 2{,}5$ la velocidad es $0{,}5$ km/min porque el bus conserva su posición
  <!-- feedback: Incorrecto. Conservar la posición significa pendiente 0, es decir velocidad 0, no la velocidad del tramo anterior. -->
- [ ] B) Entre $t = 2$ y $t = 3$ el bus retrocede
  <!-- feedback: Incorrecto. Retroceder exige pendiente negativa; una recta horizontal indica que la posición no cambia. -->
- [x] C) La velocidad en $t = 4$ es mayor que en $t = 1$, y en $t = 2{,}5$ el bus está detenido
  <!-- feedback: Correcto. La velocidad es la pendiente: 0,8 km/min en $t = 4$, 0,5 km/min en $t = 1$ y 0 en el tramo horizontal. -->
- [ ] D) La velocidad en $t = 4$ es $1{,}8$ km
  <!-- feedback: Incorrecto. 1,8 km sería la posición en $t = 4$ ($1 + 0{,}8$), y además km no son unidades de velocidad. -->

### Explicacion Pedagogica
En una gráfica posición-tiempo, la derivada en cada instante es la pendiente de la gráfica. Tramo 1: $s' = 0{,}5$; tramo 2 (horizontal): $s' = 0$, el bus está detenido en una estación; tramo 3: $s' = 0{,}8$. Por eso en $t = 4$ va más rápido que en $t = 1$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.59
**Contexto:** En un examen de práctica en Neiva aparece el límite $\lim_{h \to 0} \frac{(2 + h)^3 - 8}{h}$.

### Enunciado
¿Qué representa ese límite y cuánto vale?

### Opciones
- [ ] A) Es $f'(8)$ para $f(x) = x^3$, y vale $192$
  <!-- feedback: Incorrecto. 8 es $f(2) = 2^3$, no el punto; el punto es el número que acompaña a $h$, es decir $a = 2$. -->
- [ ] B) Es $f'(2)$ para $f(x) = x^3$, y vale $8$
  <!-- feedback: Incorrecto. La interpretación es correcta, pero 8 es $f(2)$; el límite da $3 \cdot 2^2 = 12$. -->
- [x] C) Es $f'(2)$ para $f(x) = x^3$, y vale $12$
  <!-- feedback: Correcto. $\frac{(2 + h)^3 - 2^3}{h}$ es el cociente de diferencias de $x^3$ en $a = 2$; el límite es $12 + 6h + h^2 \to 12$. -->
- [ ] D) Es $f(2)$ para $f(x) = x^3$, y vale $8$
  <!-- feedback: Incorrecto. Un cociente de diferencias con $h \to 0$ define la derivada, no el valor de la función. -->

### Explicacion Pedagogica
Comparando con $\lim_{h \to 0} \frac{f(a + h) - f(a)}{h}$, se reconoce $f(x) = x^3$ y $a = 2$, pues $f(2) = 8$. Al desarrollar, $(2 + h)^3 - 8 = 12h + 6h^2 + h^3$; dividiendo entre $h$ y tomando el límite se obtiene $12$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.57
**Contexto:** En una finca cafetera del Huila, el rendimiento de un lote según la cantidad de fertilizante $x$ (en bultos) se modela con $R(x) = \sqrt{x}$ (en toneladas).

### Enunciado
¿Cómo se comparan la tasa de cambio promedio de $R$ en $[1, 9]$ y la tasa instantánea $R'(1)$?

### Opciones
- [ ] A) Son iguales, porque ambas miden el cambio de $R$
  <!-- feedback: Incorrecto. Una mide el cambio en todo $[1, 9]$ y la otra en $x = 1$; como $\sqrt{x}$ se aplana, la secante es menos inclinada. -->
- [x] B) $R'(1) = \frac{1}{2}$ es mayor que la tasa promedio, que vale $\frac{1}{4}$
  <!-- feedback: Correcto. Promedio: $\frac{3 - 1}{9 - 1} = \frac{1}{4}$. Instantánea: $R'(1) = \frac{1}{2\sqrt{1}} = \frac{1}{2}$. -->
- [ ] C) La tasa promedio, $\frac{1}{4}$, es mayor que $R'(1) = \frac{1}{8}$
  <!-- feedback: Incorrecto. $R'(1) = \frac{1}{2\sqrt{1}} = \frac{1}{2}$, no $\frac{1}{8}$; se usó $\frac{1}{8}$ confundiendo con la longitud del intervalo. -->
- [ ] D) La tasa promedio vale $\frac{1}{2}$ y $R'(1) = \frac{1}{4}$
  <!-- feedback: Incorrecto. Se intercambiaron los valores: el promedio es $\frac{R(9) - R(1)}{8} = \frac{2}{8} = \frac{1}{4}$. -->

### Explicacion Pedagogica
La tasa promedio en $[1, 9]$ es la pendiente de la secante: $\frac{\sqrt{9} - \sqrt{1}}{8} = \frac{1}{4}$. La instantánea en $x = 1$ es la pendiente de la tangente: $R'(1) = \frac{1}{2}$. Como la curva es cóncava hacia abajo, la tangente al inicio es más empinada que la secante: rendimientos decrecientes.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.55
**Contexto:** En un trapiche de Villeta, el costo total $C(q)$ en pesos de producir $q$ kilogramos de panela cumple $C'(100) = 3500$.

### Enunciado
¿Cuál es la interpretación correcta?

### Opciones
- [ ] A) Producir 100 kg cuesta en total $3500$ pesos
  <!-- feedback: Incorrecto. El costo total de 100 kg es $C(100)$; $C'(100)$ es una razón de cambio, no un total. -->
- [x] B) Producir un kilogramo adicional después de 100 kg cuesta aproximadamente $3500$ pesos
  <!-- feedback: Correcto. $C'(100)$ tiene unidades de pesos por kg y estima $C(101) - C(100)$. -->
- [ ] C) El costo promedio de cada kilogramo entre 0 y 100 kg es $3500$ pesos
  <!-- feedback: Incorrecto. El costo promedio sería $\frac{C(100)}{100}$; la derivada describe el cambio local en $q = 100$. -->
- [ ] D) Si la producción se duplica a 200 kg, el costo aumenta $3500$ pesos
  <!-- feedback: Incorrecto. La aproximación lineal vale para cambios pequeños: un aumento de 100 kg cambiaría el costo cerca de $100 \cdot 3500$, no $3500$. -->

### Explicacion Pedagogica
Las unidades de $C'(q)$ son pesos por kilogramo. Por la aproximación lineal, $C(101) \approx C(100) + C'(100) \cdot 1 = C(100) + 3500$. En economía esto se llama costo marginal: lo que cuesta, aproximadamente, producir una unidad más.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.53
**Contexto:** En Cúcuta, dos estudiantes calculan $f'(1)$ para $f(x) = x^2 + x$ con la definición. Ana escribe $\frac{f(1 + h) - f(1)}{h} = \frac{h^2 + 3h}{h} = h + 3$ y concluye $f'(1) = 3$. Luis reemplaza $h = 0$ antes de simplificar, obtiene $\frac{0}{0}$ y concluye que $f'(1)$ no existe.

### Enunciado
¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Luis tiene razón: $\frac{0}{0}$ indica que la derivada no existe
  <!-- feedback: Incorrecto. $\frac{0}{0}$ es una indeterminación que aparece en todo cociente de diferencias; no prueba que el límite no exista. -->
- [ ] B) Ambos tienen razón, porque usan métodos distintos
  <!-- feedback: Incorrecto. Llegan a conclusiones incompatibles sobre el mismo número, así que no pueden ser correctas ambas. -->
- [ ] C) Ninguno tiene razón: $f'(1) = 2$
  <!-- feedback: Incorrecto. 2 es $f(1) = 1 + 1$; la derivada es $2x + 1$ evaluada en 1, que da 3. -->
- [x] D) Ana tiene razón: se simplifica para $h \neq 0$ y luego se toma el límite, que vale 3
  <!-- feedback: Correcto. $f(1 + h) = 2 + 3h + h^2$, el cociente es $h + 3$ y su límite cuando $h \to 0$ es 3. -->

### Explicacion Pedagogica
$f(1 + h) - f(1) = (1 + 2h + h^2 + 1 + h) - 2 = h^2 + 3h$. Como en el límite $h \to 0$ pero $h \neq 0$, se puede dividir: el cociente es $h + 3$, que tiende a 3. Sustituir $h = 0$ antes de simplificar siempre produce $\frac{0}{0}$ y no informa nada.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.51
**Contexto:** En Pereira se lanza un balón hacia arriba desde una terraza; su altura relativa a la terraza es $s(t) = 20t - 5t^2$ metros. Un estudiante afirma: como la velocidad media en $[0, 4]$ es cero, el balón estuvo quieto todo el tiempo.

### Enunciado
¿Cuál es la mejor evaluación de la afirmación?

### Opciones
- [ ] A) Es verdadera, porque una velocidad media nula implica velocidad cero en cada instante
  <!-- feedback: Incorrecto. La media solo compara posición inicial y final; el balón subió 20 m y regresó. -->
- [ ] B) Es falsa, porque la velocidad media en $[0, 4]$ es $20$ m/s
  <!-- feedback: Incorrecto. $\frac{s(4) - s(0)}{4} = \frac{0 - 0}{4} = 0$; 20 es la velocidad inicial $s'(0)$. -->
- [ ] C) Es falsa, porque la velocidad nunca es cero en $[0, 4]$
  <!-- feedback: Incorrecto. $s'(2) = 20 - 20 = 0$: en el punto más alto la velocidad instantánea es cero. -->
- [x] D) Es falsa: $s(0) = s(4) = 0$ da velocidad media 0, pero $s'(1) = 10$ m/s; solo en $t = 2$ la velocidad es 0
  <!-- feedback: Correcto. Con $s'(t) = 20 - 10t$, el balón sube hasta $t = 2$ y luego baja; la media nula no implica reposo. -->

### Explicacion Pedagogica
La velocidad media en $[0, 4]$ es $\frac{s(4) - s(0)}{4} = 0$ porque el balón vuelve a la altura inicial. La velocidad instantánea es $s'(t) = 20 - 10t$: positiva al subir ($s'(1) = 10$), nula en $t = 2$ (altura máxima, 20 m) y negativa al bajar. Un valor promedio no describe cada instante.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.49
**Contexto:** En un club de cálculo en Armenia se discute si $f(x) = \sqrt[3]{x}$ es derivable en $x = 0$; su gráfica es suave y pasa por el origen.

### Enunciado
¿Cuál conclusión es correcta?

### Opciones
- [x] A) No es derivable en 0: el cociente $\frac{\sqrt[3]{h}}{h} = h^{-2/3}$ crece sin cota y la tangente es vertical
  <!-- feedback: Correcto. Cuando $h \to 0$, $h^{-2/3} \to +\infty$; una pendiente infinita significa tangente vertical, no derivada real. -->
- [ ] B) Es derivable con $f'(0) = 0$, porque $f(0) = 0$
  <!-- feedback: Incorrecto. Que la función valga 0 no dice nada de la pendiente; el cociente de diferencias no se acerca a 0. -->
- [ ] C) No es derivable porque no es continua en 0
  <!-- feedback: Incorrecto. $\sqrt[3]{x}$ es continua en 0, pues $\lim_{x \to 0} \sqrt[3]{x} = 0 = f(0)$; el problema es la pendiente infinita. -->
- [ ] D) Es derivable con $f'(0) = \frac{1}{3}$
  <!-- feedback: Incorrecto. La regla da $\frac{1}{3}x^{-2/3}$, que no está definida en $x = 0$; no se puede reemplazar ingenuamente. -->

### Explicacion Pedagogica
Por definición, $f'(0) = \lim_{h \to 0} \frac{\sqrt[3]{h} - 0}{h} = \lim_{h \to 0} h^{-2/3}$. Como $h^{-2/3} > 0$ y crece sin límite, la derivada no existe como número real. La curva es continua y tiene tangente vertical en el origen, a diferencia de una esquina como la de $|x|$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W11-derivadas-concepto-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.47
**Contexto:** Una aplicación desarrollada en Barranquilla tiene $f(t) = 2^{t}$ miles de usuarios a los $t$ meses. Para estimar $f'(2)$, se calcularon pendientes de secantes $\frac{f(2 + h) - f(2)}{h}$: con $h = 0{,}1$ da $2{,}871$; con $h = 0{,}01$ da $2{,}782$; con $h = 0{,}001$ da $2{,}774$.

### Enunciado
¿Cuál es la mejor conclusión?

### Opciones
- [ ] A) $f'(2) \approx 2{,}87$, porque un $h$ mayor usa más información
  <!-- feedback: Incorrecto. Con $h$ grande la secante se aleja más de la tangente; la mejor aproximación es la de $h$ más pequeño. -->
- [x] B) $f'(2) \approx 2{,}77$ miles de usuarios por mes, porque las secantes se estabilizan cerca de ese valor al reducir $h$
  <!-- feedback: Correcto. Los valores convergen al reducir $h$; el valor exacto es $4\ln 2 \approx 2{,}773$. -->
- [ ] C) $f'(2) = 4$, porque $f(2) = 4$
  <!-- feedback: Incorrecto. 4 es el número de usuarios (miles) a los 2 meses; la derivada mide la rapidez del cambio, unos 2,77 por mes. -->
- [ ] D) No se puede estimar, porque $h$ nunca llega a 0
  <!-- feedback: Incorrecto. La derivada es un límite: no hace falta que $h$ valga 0, sino observar a qué valor se acercan las secantes. -->

### Explicacion Pedagogica
La derivada es el límite de las pendientes de secantes. La tabla muestra 2,871; 2,782; 2,774, valores que se estabilizan cerca de 2,77 al acercar $h$ a 0. El valor exacto es $f'(2) = 2^2\ln 2 = 4\ln 2 \approx 2{,}773$, de modo que la app gana unos 2770 usuarios por mes en ese momento.
