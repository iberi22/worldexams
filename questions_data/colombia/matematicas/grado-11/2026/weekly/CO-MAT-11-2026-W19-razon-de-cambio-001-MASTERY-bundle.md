---
id: "CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "razon-de-cambio"
periodo: "weekly"
week: "W19"
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

# Bundle MASTERY: Razón de Cambio - Grado 11

Veinte situaciones colombianas sobre razones de cambio relacionadas (escaleras, círculos que se expanden, tanques y conos, sombras, vehículos) y sobre la interpretación de la razón de cambio promedio y sus unidades.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** La empresa de acueducto de Bucaramanga llena un tanque de reserva; el volumen de agua es $V(t)$ litros, con $t$ en minutos.

### Enunciado
Si en cierto instante $\frac{dV}{dt} = 3$ L/min, ¿qué significa ese dato?

### Opciones
- [x] A) En ese instante el volumen aumenta a razón de 3 litros por minuto
  <!-- feedback: Correcto. La derivada $\frac{dV}{dt}$ mide la rapidez de cambio del volumen; su unidad es litros por minuto y el signo positivo indica que aumenta. -->
- [ ] B) El tanque contiene 3 litros de agua en ese instante
  <!-- feedback: Incorrecto. 3 L/min es una rapidez, no una cantidad; el volumen en ese instante es $V(t)$, que no se conoce. -->
- [ ] C) El nivel del agua sube 3 centímetros por minuto
  <!-- feedback: Incorrecto. La rapidez del nivel es $\frac{dh}{dt}$, en unidades de longitud por tiempo; $\frac{dV}{dt}$ está en litros por minuto. -->
- [ ] D) El volumen disminuye 3 litros cada minuto
  <!-- feedback: Incorrecto. Una derivada positiva significa aumento; una disminución correspondería a $\frac{dV}{dt} = -3$ L/min. -->

### Explicacion Pedagogica
La notación $\frac{dV}{dt}$ es la razón de cambio instantánea del volumen respecto al tiempo. Sus unidades son las de $V$ divididas por las de $t$: litros por minuto. El valor $+3$ indica que, en ese instante, el volumen crece a un ritmo de 3 litros por cada minuto; no informa cuánta agua hay ni cómo cambia la altura.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Numerico
**Expected_Success:** 0.83
**Contexto:** Una estación del IDEAM en Bogotá registró 8 °C a las 6:00 a. m. y 20 °C a las 2:00 p. m. del mismo día.

### Enunciado
¿Cuál es la razón de cambio promedio de la temperatura entre esas dos horas?

### Opciones
- [ ] A) 12 °C por hora
  <!-- feedback: Incorrecto. 12 °C es el cambio total de temperatura; faltó dividir entre las 8 horas transcurridas. -->
- [ ] B) 2,5 °C por hora
  <!-- feedback: Incorrecto. Dividiste la temperatura final entre el tiempo, $\frac{20}{8}$; la razón promedio usa la diferencia $20 - 8$. -->
- [ ] C) 0,67 horas por °C
  <!-- feedback: Incorrecto. Invertiste el cociente, $\frac{8}{12}$; la razón de cambio de la temperatura es cambio de temperatura sobre cambio de tiempo. -->
- [x] D) 1,5 °C por hora
  <!-- feedback: Correcto. $\frac{20 - 8}{14 - 6} = \frac{12}{8} = 1{,}5$ °C por hora. -->

### Explicacion Pedagogica
La razón de cambio promedio es $\frac{\Delta T}{\Delta t} = \frac{T(14) - T(6)}{14 - 6}$, con las horas en formato de 24 horas. Así, $\frac{20 - 8}{8} = \frac{12}{8} = 1{,}5$ °C/h. Significa que, en promedio, la temperatura subió 1,5 grados por cada hora, aunque en algunos momentos haya subido más rápido y en otros más lento.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.80
**Contexto:** En un estanque de tilapias en el Huila, una onda circular se expande y tanto su radio $r$ como su área $A = \pi r^2$ dependen del tiempo $t$.

### Enunciado
Al derivar $A = \pi r^2$ respecto al tiempo $t$, ¿qué expresión se obtiene?

### Opciones
- [x] A) $\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$
  <!-- feedback: Correcto. Por la regla de la cadena, $\frac{d}{dt}(r^2) = 2r\frac{dr}{dt}$, porque $r$ es función de $t$. -->
- [ ] B) $\frac{dA}{dt} = 2\pi r$
  <!-- feedback: Incorrecto. Esa es la derivada respecto a $r$; al derivar respecto a $t$ falta el factor $\frac{dr}{dt}$ que exige la regla de la cadena. -->
- [ ] C) $\frac{dA}{dt} = \pi r^2 \frac{dr}{dt}$
  <!-- feedback: Incorrecto. No derivaste $r^2$: copiaste la fórmula del área y le agregaste $\frac{dr}{dt}$; la derivada de $r^2$ es $2r$. -->
- [ ] D) $\frac{dA}{dt} = 2\pi \frac{dr}{dt}$
  <!-- feedback: Incorrecto. Perdiste el factor $r$: la derivada de $r^2$ respecto a $t$ es $2r\frac{dr}{dt}$, no $2\frac{dr}{dt}$. -->

### Explicacion Pedagogica
En los problemas de razones relacionadas todas las variables dependen de $t$. Al derivar $A = \pi r^2$ con la regla de la cadena: $\frac{dA}{dt} = \pi \cdot 2r \cdot \frac{dr}{dt} = 2\pi r\frac{dr}{dt}$. Esta ecuación relaciona la rapidez del área con la rapidez del radio en cada instante.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** Una mancha de aceite en la bahía de Cartagena se extiende en forma circular y su radio crece a 2 m/s.

### Enunciado
¿Con qué rapidez aumenta el área de la mancha cuando el radio mide 10 m?

### Opciones
- [ ] A) $20\pi\ \text{m}^2/\text{s}$
  <!-- feedback: Incorrecto. Calculaste $2\pi r = 20\pi$ y olvidaste multiplicar por $\frac{dr}{dt} = 2$. -->
- [ ] B) $100\pi\ \text{m}^2/\text{s}$
  <!-- feedback: Incorrecto. $100\pi\ \text{m}^2$ es el área de la mancha cuando $r = 10$; la pregunta pide su rapidez de cambio. -->
- [x] C) $40\pi\ \text{m}^2/\text{s}$
  <!-- feedback: Correcto. $\frac{dA}{dt} = 2\pi r \frac{dr}{dt} = 2\pi(10)(2) = 40\pi \approx 125{,}7\ \text{m}^2/\text{s}$. -->
- [ ] D) $4\pi\ \text{m}^2/\text{s}$
  <!-- feedback: Incorrecto. Omitiste el radio: $2\pi \cdot 2 = 4\pi$; la fórmula es $2\pi r\frac{dr}{dt}$ con $r = 10$. -->

### Explicacion Pedagogica
Relación: $A = \pi r^2$. Derivando respecto a $t$: $\frac{dA}{dt} = 2\pi r\frac{dr}{dt}$. Con $r = 10$ m y $\frac{dr}{dt} = 2$ m/s: $\frac{dA}{dt} = 2\pi \cdot 10 \cdot 2 = 40\pi\ \text{m}^2/\text{s}$. El área crece cada vez más rápido aunque el radio crezca a ritmo constante, porque el factor $r$ aumenta.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.75
**Contexto:** Un pintor en Tunja apoya una escalera de 10 m contra una pared vertical y la base resbala alejándose de la pared a 1 m/s.

### Enunciado
¿Con qué rapidez baja el extremo superior cuando la base está a 6 m de la pared?

### Opciones
- [ ] A) 1 m/s
  <!-- feedback: Incorrecto. Supusiste que ambos extremos se mueven igual; la relación $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$ depende de la posición. -->
- [ ] B) $\frac{4}{3}$ m/s
  <!-- feedback: Incorrecto. Invertiste el cociente: usaste $\frac{y}{x} = \frac{8}{6}$ en lugar de $\frac{x}{y} = \frac{6}{8}$. -->
- [x] C) 0,75 m/s
  <!-- feedback: Correcto. $x^2 + y^2 = 100$ da $x\frac{dx}{dt} + y\frac{dy}{dt} = 0$; con $x = 6$, $y = 8$: $\frac{dy}{dt} = -\frac{6}{8}(1) = -0{,}75$ m/s. -->
- [ ] D) 0,6 m/s
  <!-- feedback: Incorrecto. Dividiste entre la longitud de la escalera, $\frac{6}{10}$; en la derivada implícita el divisor es la altura $y = 8$. -->

### Explicacion Pedagogica
Sea $x$ la distancia de la base a la pared e $y$ la altura del extremo superior: $x^2 + y^2 = 100$. Derivando: $2x\frac{dx}{dt} + 2y\frac{dy}{dt} = 0$. Cuando $x = 6$, $y = \sqrt{100 - 36} = 8$. Entonces $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt} = -\frac{6}{8} \cdot 1 = -0{,}75$ m/s; el signo negativo indica que baja.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.72
**Contexto:** En una planta de tratamiento de agua de Villavicencio se llena un tanque cilíndrico de 2 m de radio a razón de $0{,}5\ \text{m}^3$ por minuto.

### Enunciado
¿Con qué rapidez sube el nivel del agua?

### Opciones
- [ ] A) $\frac{1}{4\pi}$ m/min
  <!-- feedback: Incorrecto. Usaste $\pi r$ en lugar de $\pi r^2$: $\frac{0{,}5}{2\pi} = \frac{1}{4\pi}$; el área de la base es $\pi \cdot 2^2 = 4\pi$. -->
- [x] B) $\frac{1}{8\pi}$ m/min, unos 4 cm/min
  <!-- feedback: Correcto. $V = \pi r^2 h = 4\pi h$, de modo que $\frac{dh}{dt} = \frac{0{,}5}{4\pi} = \frac{1}{8\pi} \approx 0{,}040$ m/min. -->
- [ ] C) $\frac{1}{8}$ m/min
  <!-- feedback: Incorrecto. Olvidaste el factor $\pi$ del área circular: la base mide $4\pi\ \text{m}^2$, no $4\ \text{m}^2$. -->
- [ ] D) $2\pi$ m/min
  <!-- feedback: Incorrecto. Multiplicaste $0{,}5 \cdot 4\pi$ en lugar de dividir; $\frac{dV}{dt} = 4\pi\frac{dh}{dt}$ obliga a dividir entre $4\pi$. -->

### Explicacion Pedagogica
En un cilindro de radio fijo $r = 2$: $V = \pi r^2 h = 4\pi h$. Derivando: $\frac{dV}{dt} = 4\pi\frac{dh}{dt}$. Con $\frac{dV}{dt} = 0{,}5$: $\frac{dh}{dt} = \frac{0{,}5}{4\pi} = \frac{1}{8\pi} \approx 0{,}0398$ m/min, casi 4 cm por minuto. Como el radio no cambia, el nivel sube a ritmo constante.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.70
**Contexto:** En el parque Santander de Bucaramanga, una persona de 1,8 m de estatura se aleja de un poste de luz de 6 m de altura caminando a 1,4 m/s.

### Enunciado
¿Con qué rapidez aumenta la longitud de su sombra?

### Opciones
- [x] A) 0,6 m/s
  <!-- feedback: Correcto. Por triángulos semejantes $\frac{6}{x + s} = \frac{1{,}8}{s}$, así que $s = \frac{3x}{7}$ y $\frac{ds}{dt} = \frac{3}{7}(1{,}4) = 0{,}6$ m/s. -->
- [ ] B) 2 m/s
  <!-- feedback: Incorrecto. 2 m/s es la rapidez de la punta de la sombra, $1{,}4 + 0{,}6$; la longitud de la sombra crece solo 0,6 m/s. -->
- [ ] C) 1,4 m/s
  <!-- feedback: Incorrecto. Supusiste que la sombra crece igual que la persona camina; la semejanza da $s = \frac{3}{7}x$, no $s = x$. -->
- [ ] D) 0,42 m/s
  <!-- feedback: Incorrecto. Multiplicaste $1{,}4$ por $\frac{1{,}8}{6} = 0{,}3$; la proporción correcta es $\frac{1{,}8}{6 - 1{,}8} = \frac{3}{7}$. -->

### Explicacion Pedagogica
Sea $x$ la distancia de la persona al poste y $s$ la longitud de la sombra. Triángulos semejantes: $\frac{6}{x + s} = \frac{1{,}8}{s} \Rightarrow 6s = 1{,}8x + 1{,}8s \Rightarrow 4{,}2s = 1{,}8x \Rightarrow s = \frac{3}{7}x$. Derivando: $\frac{ds}{dt} = \frac{3}{7}\cdot 1{,}4 = 0{,}6$ m/s. La rapidez es constante y no depende de la distancia al poste.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.68
**Contexto:** Dos carros salen de un mismo cruce en Yopal: uno hacia el norte a 60 km/h y otro hacia el este a 80 km/h; en cierto momento están a 30 km y 40 km del cruce, respectivamente.

### Enunciado
¿Con qué rapidez aumenta la distancia entre los carros en ese momento?

### Opciones
- [x] A) 100 km/h
  <!-- feedback: Correcto. $D^2 = x^2 + y^2$ da $\frac{dD}{dt} = \frac{x\frac{dx}{dt} + y\frac{dy}{dt}}{D} = \frac{40 \cdot 80 + 30 \cdot 60}{50} = 100$ km/h. -->
- [ ] B) 140 km/h
  <!-- feedback: Incorrecto. Sumaste las velocidades $60 + 80$; eso solo valdría si se movieran en sentidos opuestos sobre una misma recta. -->
- [ ] C) 20 km/h
  <!-- feedback: Incorrecto. Restaste las velocidades $80 - 60$; las trayectorias son perpendiculares y se combinan con Pitágoras, no con una resta. -->
- [ ] D) 50 km/h
  <!-- feedback: Incorrecto. 50 km es la distancia entre los carros, $\sqrt{30^2 + 40^2}$, no su rapidez de cambio. -->

### Explicacion Pedagogica
Con el cruce en el origen, $D^2 = x^2 + y^2$. Derivando: $2D\frac{dD}{dt} = 2x\frac{dx}{dt} + 2y\frac{dy}{dt}$. Con $x = 40$, $y = 30$, $D = 50$: $\frac{dD}{dt} = \frac{40 \cdot 80 + 30 \cdot 60}{50} = \frac{3200 + 1800}{50} = 100$ km/h.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.66
**Contexto:** Un tanque de café en una trilladora de Armenia tiene forma de cono invertido de 4 m de altura y 2 m de radio en la boca; se llena a razón de $2\ \text{m}^3$ por minuto.

### Enunciado
¿Con qué rapidez sube el nivel cuando la profundidad es de 2 m?

### Opciones
- [ ] A) $\frac{1}{8\pi}$ m/min
  <!-- feedback: Incorrecto. Invertiste la proporción y tomaste $r = 2h$; por semejanza $\frac{r}{h} = \frac{2}{4}$, es decir, $r = \frac{h}{2}$. -->
- [x] B) $\frac{2}{\pi}$ m/min
  <!-- feedback: Correcto. Con $r = \frac{h}{2}$, $V = \frac{\pi h^3}{12}$ y $\frac{dV}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt}$; con $h = 2$: $\frac{dh}{dt} = \frac{2}{\pi} \approx 0{,}64$ m/min. -->
- [ ] C) $2\pi$ m/min
  <!-- feedback: Incorrecto. Multiplicaste $2 \cdot \pi$ en lugar de despejar: con $\frac{dV}{dt} = \pi\frac{dh}{dt}$ en $h = 2$ hay que dividir entre $\pi$. -->
- [ ] D) 0 m/min
  <!-- feedback: Incorrecto. Sustituiste $h = 2$ antes de derivar y el volumen quedó constante; primero se deriva respecto a $t$ y después se reemplaza. -->

### Explicacion Pedagogica
Por semejanza, $\frac{r}{h} = \frac{2}{4}$, así que $r = \frac{h}{2}$ y $V = \frac{1}{3}\pi r^2 h = \frac{\pi h^3}{12}$. Derivando: $\frac{dV}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt}$. Con $h = 2$ y $\frac{dV}{dt} = 2$: $2 = \pi\frac{dh}{dt}$, luego $\frac{dh}{dt} = \frac{2}{\pi} \approx 0{,}64$ m/min.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.64
**Contexto:** Una aplicación de pagos creada en Medellín tiene $f(t) = t^2 + 3t$ miles de usuarios, donde $t$ son meses desde su lanzamiento.

### Enunciado
¿Cuál es la razón de cambio promedio de usuarios entre el mes 1 y el mes 3?

### Opciones
- [ ] A) 9 mil usuarios por mes
  <!-- feedback: Incorrecto. 9 es la razón instantánea $f'(3) = 2(3) + 3$; la pregunta pide la razón promedio en $[1, 3]$. -->
- [ ] B) 14 mil usuarios por mes
  <!-- feedback: Incorrecto. 14 mil es el aumento total $f(3) - f(1)$; faltó dividir entre los 2 meses. -->
- [x] C) 7 mil usuarios por mes
  <!-- feedback: Correcto. $\frac{f(3) - f(1)}{3 - 1} = \frac{18 - 4}{2} = 7$ mil usuarios por mes. -->
- [ ] D) 5 mil usuarios por mes
  <!-- feedback: Incorrecto. 5 es la razón instantánea $f'(1) = 2(1) + 3$ al inicio del intervalo, no el promedio. -->

### Explicacion Pedagogica
Razón de cambio promedio en $[1, 3]$: $\frac{f(3) - f(1)}{3 - 1}$. Se calcula $f(3) = 9 + 9 = 18$ y $f(1) = 1 + 3 = 4$, de modo que $\frac{18 - 4}{2} = 7$ mil usuarios por mes. Es la pendiente de la recta secante entre $(1, 4)$ y $(3, 18)$; las razones instantáneas en los extremos son 5 y 9.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.62
**Contexto:** Para la Feria de las Flores en Medellín se infla un globo esférico al que se le inyectan $100\ \text{cm}^3$ de aire por segundo.

### Enunciado
¿Con qué rapidez aumenta el área de la superficie del globo cuando el radio es 5 cm?

### Opciones
- [x] A) $40\ \text{cm}^2/\text{s}$
  <!-- feedback: Correcto. $\frac{dr}{dt} = \frac{100}{4\pi \cdot 25} = \frac{1}{\pi}$ y $\frac{dS}{dt} = 8\pi r\frac{dr}{dt} = 8\pi \cdot 5 \cdot \frac{1}{\pi} = 40$. -->
- [ ] B) $\frac{1}{\pi}\ \text{cm}^2/\text{s}$
  <!-- feedback: Incorrecto. $\frac{1}{\pi}$ cm/s es la rapidez del radio, un paso intermedio; falta multiplicar por $8\pi r$ para obtener la del área. -->
- [ ] C) $40\pi\ \text{cm}^2/\text{s}$
  <!-- feedback: Incorrecto. Usaste $\frac{dr}{dt} = 1$ sin calcularla; con $\frac{dr}{dt} = \frac{1}{\pi}$ el factor $\pi$ se cancela. -->
- [ ] D) $100\ \text{cm}^2/\text{s}$
  <!-- feedback: Incorrecto. Supusiste que el área cambia igual que el volumen; son magnitudes distintas, relacionadas por $\frac{dS}{dt} = \frac{2}{r}\frac{dV}{dt}$. -->

### Explicacion Pedagogica
Volumen: $V = \frac{4}{3}\pi r^3$, así que $\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}$. Con $r = 5$: $100 = 100\pi\frac{dr}{dt}$, luego $\frac{dr}{dt} = \frac{1}{\pi}$ cm/s. Superficie: $S = 4\pi r^2$, así que $\frac{dS}{dt} = 8\pi r\frac{dr}{dt} = 8\pi \cdot 5 \cdot \frac{1}{\pi} = 40\ \text{cm}^2/\text{s}$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.60
**Contexto:** En una bodega de Barranquilla, una escalera de 13 m apoyada en la pared resbala y su base se aleja a 0,5 m/s constantes.

### Enunciado
¿Cómo cambia la rapidez con que baja el extremo superior entre el momento en que la base está a 5 m y el momento en que está a 12 m de la pared?

### Opciones
- [ ] A) Se mantiene en 0,5 m/s, porque la escalera es rígida
  <!-- feedback: Incorrecto. La longitud fija relaciona las posiciones, $x^2 + y^2 = 169$, pero la rapidez $\frac{x}{y}(0{,}5)$ cambia con la posición. -->
- [ ] B) Disminuye: pasa de 1,2 m/s a unos 0,21 m/s
  <!-- feedback: Incorrecto. Usaste el cociente invertido $\frac{y}{x}$; con $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$ la rapidez crece al aumentar $x$. -->
- [ ] C) Aumenta de 0,21 m/s a 1,2 m/s, pero el extremo sube
  <!-- feedback: Incorrecto. Los valores son correctos, pero el signo de $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$ es negativo: el extremo baja. -->
- [x] D) Aumenta: pasa de unos 0,21 m/s a 1,2 m/s
  <!-- feedback: Correcto. $|\frac{dy}{dt}| = \frac{x}{y}(0{,}5)$: con $x = 5$, $y = 12$ da $\frac{5}{24} \approx 0{,}21$ y con $x = 12$, $y = 5$ da $1{,}2$ m/s. -->

### Explicacion Pedagogica
De $x^2 + y^2 = 169$ se obtiene $\frac{dy}{dt} = -\frac{x}{y}\frac{dx}{dt}$. Con $x = 5$: $y = 12$ y $\frac{dy}{dt} = -\frac{5}{12}(0{,}5) \approx -0{,}21$ m/s. Con $x = 12$: $y = 5$ y $\frac{dy}{dt} = -\frac{12}{5}(0{,}5) = -1{,}2$ m/s. Aunque la base se mueve a ritmo constante, la parte superior cae cada vez más rápido a medida que $y$ disminuye.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.58
**Contexto:** Desde un punto del suelo en el desierto de la Tatacoa, a 300 m de donde despega un dron, un observador mide el ángulo de elevación $\theta$; el dron sube verticalmente a 5 m/s.

### Enunciado
¿Con qué rapidez cambia $\theta$ cuando el dron está a 300 m de altura?

### Opciones
- [ ] A) $\frac{1}{60}$ rad/s
  <!-- feedback: Incorrecto. Omitiste el factor $\sec^2\theta$ que aparece al derivar $\tan\theta$; en $45^\circ$ vale 2 y reduce el resultado a la mitad. -->
- [x] B) $\frac{1}{120}$ rad/s
  <!-- feedback: Correcto. $\tan\theta = \frac{h}{300}$ da $\sec^2\theta\,\frac{d\theta}{dt} = \frac{5}{300}$; con $\theta = 45^\circ$, $\sec^2\theta = 2$ y $\frac{d\theta}{dt} = \frac{1}{120}$. -->
- [ ] C) $\frac{1}{30}$ rad/s
  <!-- feedback: Incorrecto. Multiplicaste por $\sec^2\theta = 2$ en lugar de dividir; al despejar $\frac{d\theta}{dt}$ el factor pasa dividiendo. -->
- [ ] D) 5 rad/s
  <!-- feedback: Incorrecto. 5 m/s es la rapidez vertical del dron; un ángulo cambia en radianes por segundo y requiere la relación $\tan\theta = \frac{h}{300}$. -->

### Explicacion Pedagogica
Relación: $\tan\theta = \frac{h}{300}$. Derivando respecto a $t$: $\sec^2\theta\,\frac{d\theta}{dt} = \frac{1}{300}\frac{dh}{dt}$. Cuando $h = 300$, $\tan\theta = 1$, $\theta = 45^\circ$ y $\sec^2\theta = 1 + \tan^2\theta = 2$. Entonces $\frac{d\theta}{dt} = \frac{5}{300 \cdot 2} = \frac{1}{120} \approx 0{,}0083$ rad/s.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.56
**Contexto:** Una patrulla de tránsito está detenida 0,6 km al norte de un cruce en la vía Bogotá–Girardot; un carro que va hacia el cruce desde el este está a 0,8 km de él, y el radar indica que la distancia patrulla–carro disminuye a 90 km/h.

### Enunciado
¿A qué velocidad va el carro y supera el límite de 100 km/h?

### Opciones
- [ ] A) A 90 km/h; no supera el límite
  <!-- feedback: Incorrecto. El radar mide cómo cambia la distancia en diagonal, no la velocidad del carro sobre la vía; hay que usar $D\frac{dD}{dt} = x\frac{dx}{dt}$. -->
- [ ] B) A 72 km/h; no supera el límite
  <!-- feedback: Incorrecto. Multiplicaste $90 \cdot 0{,}8$; al despejar $\frac{dx}{dt} = \frac{D}{x}\frac{dD}{dt}$ se divide entre $x = 0{,}8$ y se multiplica por $D = 1$. -->
- [ ] C) A 150 km/h; sí supera el límite
  <!-- feedback: Incorrecto. Dividiste entre la distancia de la patrulla, $\frac{90}{0{,}6}$; en la relación aparece $x = 0{,}8$, la posición del carro. -->
- [x] D) A 112,5 km/h; sí supera el límite
  <!-- feedback: Correcto. Con $D^2 = x^2 + 0{,}6^2$, $D\frac{dD}{dt} = x\frac{dx}{dt}$: $1 \cdot (-90) = 0{,}8\frac{dx}{dt}$, luego $\frac{dx}{dt} = -112{,}5$ km/h. -->

### Explicacion Pedagogica
Sea $x$ la distancia del carro al cruce; la patrulla está fija a 0,6 km. $D^2 = x^2 + 0{,}36$, y con $x = 0{,}8$ se tiene $D = 1$ km. Derivando: $D\frac{dD}{dt} = x\frac{dx}{dt}$, pues la patrulla no se mueve. Con $\frac{dD}{dt} = -90$: $\frac{dx}{dt} = \frac{1 \cdot (-90)}{0{,}8} = -112{,}5$ km/h. El carro va a 112,5 km/h, por encima del límite.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.55
**Contexto:** En el lago de Tota se lanza una piedra y se forma una onda circular cuyo radio crece a 0,5 m/s desde $r = 0$.

### Enunciado
¿Después de cuántos segundos el área encerrada por la onda crece a razón de $10\pi\ \text{m}^2/\text{s}$?

### Opciones
- [ ] A) 10 s
  <!-- feedback: Incorrecto. Olvidaste el factor $\frac{dr}{dt} = 0{,}5$: con $2\pi r = 10\pi$ sale $r = 5$ y $t = 10$ s, pero la ecuación correcta es $\pi r = 10\pi$. -->
- [x] B) 20 s
  <!-- feedback: Correcto. $\frac{dA}{dt} = 2\pi r(0{,}5) = \pi r = 10\pi$ da $r = 10$ m, y como $r = 0{,}5t$, el tiempo es $t = 20$ s. -->
- [ ] C) 5 s
  <!-- feedback: Incorrecto. Encontraste $r = 10$ m pero multiplicaste por la rapidez, $10 \cdot 0{,}5$; el tiempo es $t = \frac{r}{0{,}5} = 20$ s. -->
- [ ] D) Aproximadamente 3,16 s
  <!-- feedback: Incorrecto. Igualaste el área $\pi r^2$ a $10\pi$; la condición es sobre la rapidez $\frac{dA}{dt}$, no sobre el área. -->

### Explicacion Pedagogica
Como $A = \pi r^2$, se tiene $\frac{dA}{dt} = 2\pi r\frac{dr}{dt} = 2\pi r(0{,}5) = \pi r$. Se pide $\pi r = 10\pi$, es decir, $r = 10$ m. Si el radio crece desde 0 a 0,5 m/s, entonces $r = 0{,}5t$ y $t = \frac{10}{0{,}5} = 20$ s.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.53
**Contexto:** Un bus intermunicipal recorre los 150 km entre Bogotá y Tunja en exactamente 2,5 horas, con una posición que varía de forma continua y suave.

### Enunciado
¿Cuál afirmación sobre la velocidad del bus está garantizada?

### Opciones
- [ ] A) Su velocidad fue 60 km/h durante todo el viaje
  <!-- feedback: Incorrecto. 60 km/h es el promedio $\frac{150}{2{,}5}$; el bus pudo detenerse en peajes y acelerar en rectas. -->
- [ ] B) Su velocidad nunca superó los 60 km/h
  <!-- feedback: Incorrecto. Un promedio de 60 permite tramos más rápidos que compensen los lentos; nada impide ir a 80 km/h en algún momento. -->
- [x] C) En algún instante del viaje su velocidad fue exactamente 60 km/h
  <!-- feedback: Correcto. Por el teorema del valor medio, existe un instante $c$ con $s'(c) = \frac{150}{2{,}5} = 60$ km/h. -->
- [ ] D) Su velocidad máxima fue de 60 km/h
  <!-- feedback: Incorrecto. Si en algún tramo fue más lento que 60, en otro debió ir más rápido para mantener el promedio; la máxima puede ser mayor. -->

### Explicacion Pedagogica
La razón de cambio promedio es $\frac{\Delta s}{\Delta t} = \frac{150}{2{,}5} = 60$ km/h. El teorema del valor medio dice que, si $s(t)$ es continua y derivable, existe un instante $c$ en el que la velocidad instantánea $s'(c)$ coincide con ese promedio. No dice nada sobre la velocidad en el resto del viaje.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Para un globo esférico en el Festival del Viento de Villa de Leyva, Andrés escribe: «cuando $r = 5$, $V = \frac{4}{3}\pi(5)^3 = \frac{500\pi}{3}$; al derivar, $\frac{dV}{dt} = 0$».

### Enunciado
¿Cuál evaluación del procedimiento de Andrés es correcta?

### Opciones
- [ ] A) Es incorrecto: debió usar $4\pi r^2$ como fórmula del volumen
  <!-- feedback: Incorrecto. $4\pi r^2$ es el área de la esfera; la fórmula del volumen $\frac{4}{3}\pi r^3$ que usó Andrés es correcta. -->
- [ ] B) Es incorrecto: debió derivar respecto a $r$ y no respecto a $t$
  <!-- feedback: Incorrecto. Lo que se busca es una rapidez en el tiempo; derivar respecto a $r$ omitiría el factor $\frac{dr}{dt}$. -->
- [ ] C) Es correcto: en un instante fijo el volumen no cambia
  <!-- feedback: Incorrecto. Que $r$ valga 5 en un instante no impide que esté cambiando; si el globo se infla, $\frac{dV}{dt} > 0$ en ese instante. -->
- [x] D) Es incorrecto: reemplazó $r = 5$ antes de derivar; debe derivar $V = \frac{4}{3}\pi r^3$ respecto a $t$ y luego sustituir
  <!-- feedback: Correcto. Al sustituir primero, $V$ queda como una constante y su derivada es 0; la relación correcta es $\frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}$. -->

### Explicacion Pedagogica
El error típico en razones relacionadas es sustituir los valores del instante antes de derivar. Las cantidades que varían deben quedar como funciones de $t$: $V = \frac{4}{3}\pi r^3 \Rightarrow \frac{dV}{dt} = 4\pi r^2\frac{dr}{dt}$. Solo después se reemplaza $r = 5$: $\frac{dV}{dt} = 100\pi\frac{dr}{dt}$, que no es cero si el radio está cambiando.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.48
**Contexto:** Un tanque de agua en forma de cono invertido de 6 m de altura y 3 m de radio en la boca, en una vereda de Santander, se vacía a razón constante de $1\ \text{m}^3$ por minuto.

### Enunciado
Un estudiante afirma: «el nivel baja cada vez más rápido a medida que el tanque se vacía». ¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Falsa: como el agua sale a ritmo constante, el nivel baja a ritmo constante
  <!-- feedback: Incorrecto. Eso solo ocurre si el área de la sección no cambia, como en un cilindro; en el cono la sección se achica al bajar el nivel. -->
- [ ] B) Falsa: el nivel baja cada vez más despacio porque queda menos agua
  <!-- feedback: Incorrecto. La cantidad de agua no frena la salida, que es constante; lo que importa es el área de la superficie, $\pi\frac{h^2}{4}$, que disminuye. -->
- [ ] C) Verdadera, porque $|\frac{dh}{dt}|$ es directamente proporcional a $h$
  <!-- feedback: Incorrecto. La conclusión es cierta, pero la razón no: $|\frac{dh}{dt}| = \frac{4}{\pi h^2}$ es inversamente proporcional a $h^2$. -->
- [x] D) Verdadera: $|\frac{dh}{dt}| = \frac{4}{\pi h^2}$, y en $h = 2$ es cuatro veces mayor que en $h = 4$
  <!-- feedback: Correcto. Con $V = \frac{\pi h^3}{12}$ se tiene $\frac{dh}{dt} = -\frac{4}{\pi h^2}$: en $h = 4$ vale $\frac{1}{4\pi}$ y en $h = 2$ vale $\frac{1}{\pi}$ m/min. -->

### Explicacion Pedagogica
Por semejanza, $r = \frac{h}{2}$, así que $V = \frac{1}{3}\pi\left(\frac{h}{2}\right)^2 h = \frac{\pi h^3}{12}$. Derivando: $\frac{dV}{dt} = \frac{\pi h^2}{4}\frac{dh}{dt} = -1$, luego $\frac{dh}{dt} = -\frac{4}{\pi h^2}$. En $h = 4$: $\frac{1}{4\pi} \approx 0{,}08$ m/min; en $h = 2$: $\frac{1}{\pi} \approx 0{,}32$ m/min. Al disminuir $h$ la superficie se reduce y el nivel cae más rápido.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.47
**Contexto:** Una empresa de servicios públicos de Pereira modela el consumo acumulado de agua de un barrio con $V(t) = 3t^2 + 2t$ (miles de m³), con $t$ en días.

### Enunciado
Se afirma que la razón de cambio promedio en $[0, 4]$ coincide con la razón instantánea en $t = 2$. ¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Falsa: la razón promedio es 14 pero $V'(2) = 12$
  <!-- feedback: Incorrecto. Al derivar omitiste el término constante de $V'$: $V'(t) = 6t + 2$, así que $V'(2) = 14$. -->
- [ ] B) Falsa: la razón promedio es 56
  <!-- feedback: Incorrecto. 56 es el cambio total $V(4) - V(0)$; la razón promedio exige dividir entre los 4 días y da 14. -->
- [x] C) Verdadera para esta función: la razón promedio es 14 y $V'(2) = 14$, porque en una cuadrática coinciden en el punto medio
  <!-- feedback: Correcto. $\frac{V(4) - V(0)}{4} = \frac{56}{4} = 14$ y $V'(t) = 6t + 2$ da $V'(2) = 14$. -->
- [ ] D) Verdadera, porque en toda función la razón promedio coincide con la instantánea en el punto medio
  <!-- feedback: Incorrecto. Eso solo se cumple siempre en las cuadráticas; con $f(t) = t^3$ en $[0, 4]$ la razón promedio es 16 y $f'(2) = 12$. -->

### Explicacion Pedagogica
Razón promedio: $\frac{V(4) - V(0)}{4 - 0} = \frac{48 + 8 - 0}{4} = 14$. Razón instantánea: $V'(t) = 6t + 2$, entonces $V'(2) = 14$. Coinciden. Para una cuadrática $at^2 + bt + c$ la pendiente secante en $[p, q]$ es $a(p + q) + b$, que es la derivada en $\frac{p + q}{2}$; en funciones de otro grado esto falla en general.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W19-razon-de-cambio-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** Un avión que despegó de Rionegro vuela horizontalmente a 3 km de altura y a 600 km/h, alejándose de una estación de radar en tierra; en un momento está a 4 km de distancia horizontal de la estación.

### Enunciado
Una estudiante afirma que en ese momento la distancia avión–radar aumenta a 600 km/h. ¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Sí: la distancia cambia a la misma velocidad que el avión
  <!-- feedback: Incorrecto. El avión se mueve en horizontal y la distancia es oblicua; la rapidez de $D$ es $\frac{x}{D}\frac{dx}{dt}$, menor que 600. -->
- [x] B) No: $\frac{dD}{dt} = \frac{x}{D}\frac{dx}{dt} = \frac{4}{5}(600) = 480$ km/h
  <!-- feedback: Correcto. Con $D^2 = x^2 + 9$ y $x = 4$, $D = 5$; solo la componente del movimiento en la dirección del radar alarga la distancia. -->
- [ ] C) No: aumenta a 360 km/h
  <!-- feedback: Incorrecto. Usaste el cociente $\frac{3}{5}$ con la altura; en la derivada aparece $x = 4$, la distancia horizontal, y da $\frac{4}{5}(600)$. -->
- [ ] D) No: aumenta a 750 km/h
  <!-- feedback: Incorrecto. Dividiste $600$ entre $\frac{4}{5}$ en lugar de multiplicar; la distancia oblicua no puede crecer más rápido que el avión. -->

### Explicacion Pedagogica
Sea $x$ la distancia horizontal y $D$ la distancia avión–radar: $D^2 = x^2 + 3^2$. Derivando: $D\frac{dD}{dt} = x\frac{dx}{dt}$. Con $x = 4$, $D = 5$ y $\frac{dx}{dt} = 600$: $\frac{dD}{dt} = \frac{4 \cdot 600}{5} = 480$ km/h. A medida que el avión se aleja, $\frac{x}{D}$ se acerca a 1 y la rapidez se aproxima a 600 km/h sin alcanzarla.
