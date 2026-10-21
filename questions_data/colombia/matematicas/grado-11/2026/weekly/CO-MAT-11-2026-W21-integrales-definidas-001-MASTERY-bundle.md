---
id: "CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "integrales-definidas"
periodo: "weekly"
week: "W21"
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

# Bundle MASTERY: Integrales Definidas - Grado 11

Este bundle evalúa antiderivadas, el teorema fundamental del cálculo, propiedades de la integral definida, sumas de Riemann, área con contribuciones negativas y cantidades acumuladas.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Algebraico
**Expected_Success:** 0.85
**Contexto:** Un ingeniero de EPM en Medellín conoce la tasa de consumo de agua $f(x)=3x^2+4$ de un barrio y necesita una función cuya derivada sea esa tasa.

### Enunciado
¿Cuál es la familia de antiderivadas $\int (3x^2+4)\,dx$?

### Opciones
- [ ] A) $6x+C$
  <!-- feedback: Incorrecto. Se derivó en lugar de integrar: $6x$ es $\frac{d}{dx}(3x^2)$, y además se perdió el término del 4. -->
- [ ] B) $x^3+C$
  <!-- feedback: Incorrecto. La parte $x^3$ es correcta, pero se olvidó integrar la constante 4, cuya antiderivada es $4x$. -->
- [x] C) $x^3+4x+C$
  <!-- feedback: Correcto. $\int 3x^2\,dx=x^3$ y $\int 4\,dx=4x$; al derivar $x^3+4x+C$ se recupera $3x^2+4$. -->
- [ ] D) $3x^3+4x+C$
  <!-- feedback: Incorrecto. Se subió el exponente sin dividir entre él: $\int 3x^2\,dx=\frac{3x^3}{3}=x^3$, no $3x^3$. -->

### Explicacion Pedagogica
La regla de la potencia para integrales es $\int x^n\,dx=\frac{x^{n+1}}{n+1}+C$ con $n\neq -1$. Así $\int 3x^2\,dx=3 \cdot \frac{x^3}{3}=x^3$ y $\int 4\,dx=4x$. La familia es $x^3+4x+C$; se verifica derivando: $(x^3+4x+C)'=3x^2+4$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Razonamiento
**Expected_Success:** 0.84
**Contexto:** En el SENA de Pereira un instructor explica cómo calcular la energía acumulada por un panel solar a partir de su potencia $f(t)$.

### Enunciado
Si $F$ es una antiderivada de $f$ continua en $[a,b]$, ¿qué afirma el teorema fundamental del cálculo sobre $\int_{a}^{b} f(x)\,dx$?

### Opciones
- [ ] A) Se obtiene restando: $F(a)-F(b)$.
  <!-- feedback: Incorrecto. El orden está invertido: se resta el valor en el límite inferior del valor en el superior, $F(b)-F(a)$. -->
- [ ] B) Se obtiene sumando los extremos: $F(b)+F(a)$.
  <!-- feedback: Incorrecto. La integral mide un cambio neto de $F$, que es una diferencia; sumar los valores no corresponde al teorema. -->
- [x] C) Coincide con el cambio neto $F(b)-F(a)$.
  <!-- feedback: Correcto. El teorema fundamental establece que la integral definida es el cambio neto de la antiderivada entre los extremos: $F(b)-F(a)$. -->
- [ ] D) Equivale a evaluar el integrando: $f(b)-f(a)$.
  <!-- feedback: Incorrecto. Se evaluó el integrando $f$ en lugar de la antiderivada $F$; $f(b)-f(a)$ es el cambio de la tasa, no lo acumulado. -->

### Explicacion Pedagogica
El teorema fundamental del cálculo (segunda parte) dice que si $f$ es continua en $[a,b]$ y $F'=f$, entonces $\int_{a}^{b} f(x)\,dx=F(b)-F(a)$. Interpretación: lo acumulado por la tasa $f$ entre $a$ y $b$ es el cambio neto de la cantidad $F$; para el panel, la energía entre dos instantes.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Numerico
**Expected_Success:** 0.82
**Contexto:** Una banda transportadora de un ingenio azucarero del Valle del Cauca mueve caña a una tasa de $2x$ toneladas por hora.

### Enunciado
¿Cuál es el valor de $\int_{1}^{3} 2x\,dx$?

### Opciones
- [ ] A) $9$
  <!-- feedback: Incorrecto. Solo se evaluó la antiderivada en el límite superior, $3^2=9$; falta restar $F(1)=1^2=1$. -->
- [ ] B) $4$
  <!-- feedback: Incorrecto. Se evaluó el integrando $2x$ en los extremos ($6-2$) en lugar de la antiderivada $x^2$. -->
- [ ] C) $10$
  <!-- feedback: Incorrecto. Se sumaron $F(3)+F(1)=9+1$; el teorema fundamental exige la diferencia $F(3)-F(1)$. -->
- [x] D) $8$
  <!-- feedback: Correcto. Con la antiderivada $x^2$: $3^2-1^2=9-1=8$. -->

### Explicacion Pedagogica
Una antiderivada de $2x$ es $F(x)=x^2$. Por el teorema fundamental: $\int_{1}^{3} 2x\,dx=F(3)-F(1)=9-1=8$. En el contexto, la banda transporta 8 toneladas entre la hora 1 y la hora 3.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Razonamiento
**Expected_Success:** 0.80
**Contexto:** Un estudiante de la Universidad del Norte en Barranquilla sabe que $\int_{2}^{5} f(x)\,dx=7$ para una función continua $f$.

### Enunciado
¿Cuánto vale $\int_{5}^{2} f(x)\,dx$?

### Opciones
- [x] A) $-7$
  <!-- feedback: Correcto. Invertir los límites de integración cambia el signo: $\int_{5}^{2} f=-\int_{2}^{5} f=-7$. -->
- [ ] B) $7$
  <!-- feedback: Incorrecto. Se ignoró el orden de los límites; con $F(2)-F(5)=-(F(5)-F(2))$ el resultado cambia de signo. -->
- [ ] C) $\frac{1}{7}$
  <!-- feedback: Incorrecto. Invertir los límites no invierte el valor como fracción; la propiedad cambia el signo, no toma el recíproco. -->
- [ ] D) $0$
  <!-- feedback: Incorrecto. La integral es 0 solo si los límites son iguales, como en $\int_{a}^{a} f=0$; aquí son 2 y 5. -->

### Explicacion Pedagogica
Si $F'=f$, entonces $\int_{5}^{2} f(x)\,dx=F(2)-F(5)=-(F(5)-F(2))=-\int_{2}^{5} f(x)\,dx$. Con el dato, el resultado es $-7$. Esta propiedad muestra que el sentido del recorrido importa en la integral definida.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.76
**Contexto:** Un pluviómetro en Quibdó registra la tasa de lluvia $f(t)$ en mm/h; la lluvia acumulada entre $t=0$ y $t=4$ fue de 10 mm y entre $t=0$ y $t=1$ fue de 3 mm.

### Enunciado
Si $\int_{0}^{4} f(t)\,dt=10$ y $\int_{0}^{1} f(t)\,dt=3$, ¿cuánto vale $\int_{1}^{4} f(t)\,dt$?

### Opciones
- [ ] A) $13$
  <!-- feedback: Incorrecto. Se sumaron los dos datos; por aditividad $\int_{0}^{4}=\int_{0}^{1}+\int_{1}^{4}$, así que hay que restar. -->
- [x] B) $7$
  <!-- feedback: Correcto. Por aditividad $10=3+\int_{1}^{4} f$, luego $\int_{1}^{4} f=10-3=7$ mm. -->
- [ ] C) $-7$
  <!-- feedback: Incorrecto. Se restó en el orden contrario, $3-10$; la lluvia acumulada de una tasa positiva no puede ser negativa. -->
- [ ] D) $\frac{10}{3}$
  <!-- feedback: Incorrecto. La aditividad de intervalos se expresa con sumas y restas, no con cocientes entre integrales. -->

### Explicacion Pedagogica
La propiedad de aditividad dice $\int_{a}^{c} f=\int_{a}^{b} f+\int_{b}^{c} f$. Con $a=0$, $b=1$, $c=4$: $10=3+\int_{1}^{4} f(t)\,dt$, de donde $\int_{1}^{4} f(t)\,dt=7$. Entre la hora 1 y la hora 4 cayeron 7 mm.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.74
**Contexto:** En una cooperativa lechera de Ubaté se combinan dos tasas de producción $g$ y $h$ y se conoce lo acumulado por cada una en dos días.

### Enunciado
Si $\int_{0}^{2} g(x)\,dx=5$ y $\int_{0}^{2} h(x)\,dx=-1$, ¿cuánto vale $\int_{0}^{2} (3g(x)-2h(x))\,dx$?

### Opciones
- [x] A) $17$
  <!-- feedback: Correcto. Por linealidad: $3(5)-2(-1)=15+2=17$. -->
- [ ] B) $13$
  <!-- feedback: Incorrecto. Error de signo: se calculó $15-2$ olvidando que $-2 \cdot (-1)=+2$. -->
- [ ] C) $6$
  <!-- feedback: Incorrecto. Se ignoraron las constantes 3 y 2 y se hizo $5-(-1)$; la propiedad del múltiplo constante exige multiplicar cada integral. -->
- [ ] D) $4$
  <!-- feedback: Incorrecto. Se calculó $(3-2)(5-1)$; la integral de una combinación lineal no se obtiene multiplicando sumas de coeficientes por sumas de integrales. -->

### Explicacion Pedagogica
La integral es lineal: $\int (3g-2h)=3\int g-2\int h$. Entonces $3(5)-2(-1)=15+2=17$. Hay que cuidar el signo: restar una integral negativa equivale a sumar.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.72
**Contexto:** Una ciclista entrena en la vía a Las Palmas (Medellín) y su velocidad es $v(t)=3t^2-2t$ m/s, con $t$ en segundos.

### Enunciado
¿Cuál es su desplazamiento entre $t=0$ y $t=2$ s?

### Opciones
- [ ] A) $8$ m
  <!-- feedback: Incorrecto. Ese es el valor de la velocidad $v(2)=12-4=8$ m/s, no el desplazamiento acumulado. -->
- [ ] B) $10$ m
  <!-- feedback: Incorrecto. Se derivó la velocidad ($v'(t)=6t-2$, que en $t=2$ vale 10): eso es la aceleración, no el desplazamiento. -->
- [ ] C) $20$ m
  <!-- feedback: Incorrecto. Se integró sin dividir entre el nuevo exponente: se usó $3t^3-t^2$ en lugar de $t^3-t^2$. -->
- [x] D) $4$ m
  <!-- feedback: Correcto. $\int_{0}^{2}(3t^2-2t)\,dt=[t^3-t^2]_{0}^{2}=8-4=4$ m. -->

### Explicacion Pedagogica
El desplazamiento es la integral de la velocidad: $\Delta s=\int_{0}^{2} (3t^2-2t)\,dt$. Antiderivada: $t^3-t^2$. Evaluando: $(8-4)-(0-0)=4$ m. Como $v(t)\ge 0$ en $[0,2]$ salvo en $[0,\frac{2}{3}]$ donde es negativa, el desplazamiento neto es 4 m.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.70
**Contexto:** El perfil de un canal de riego en el Huila se representa con $f(x)=x-2$ entre $x=0$ y $x=4$ (metros).

### Enunciado
¿Cuál es el valor de $\int_{0}^{4}(x-2)\,dx$ y cuál es el área total entre la gráfica y el eje $x$ en ese intervalo?

### Opciones
- [ ] A) Integral $4$ y área $4$.
  <!-- feedback: Incorrecto. La integral no coincide con el área cuando la función es negativa en parte del intervalo; aquí la integral vale 0. -->
- [x] B) Integral $0$ y área $4$.
  <!-- feedback: Correcto. La parte bajo el eje ($[0,2]$, $-2$) cancela la parte sobre el eje ($[2,4]$, $+2$) en la integral, pero el área suma $2+2=4$. -->
- [ ] C) Integral $0$ y área $0$.
  <!-- feedback: Incorrecto. El valor de la integral es correcto, pero el área geométrica nunca es negativa: se suman los valores absolutos de cada región. -->
- [ ] D) Integral $-4$ y área $4$.
  <!-- feedback: Incorrecto. Se tomó solo la región negativa dos veces; la integral es $[\frac{x^2}{2}-2x]_{0}^{4}=8-8=0$. -->

### Explicacion Pedagogica
$\int_{0}^{4}(x-2)\,dx=[\frac{x^2}{2}-2x]_{0}^{4}=8-8=0$. La recta corta el eje en $x=2$: en $[0,2]$ hay un triángulo bajo el eje de área 2 (aporta $-2$) y en $[2,4]$ uno sobre el eje de área 2 (aporta $+2$). La integral da el valor neto 0; el área total es $2+2=4$ m².

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.68
**Contexto:** Para estimar el volumen de agua en un humedal de Bogotá se usa la función $f(x)=x^2$ en $[0,2]$ y una suma de Riemann con 4 rectángulos.

### Enunciado
¿Cuál es la suma de Riemann por la izquierda con $n=4$ subintervalos iguales?

### Opciones
- [ ] A) $3{,}75$
  <!-- feedback: Incorrecto. Esa es la suma por la derecha: se usaron los puntos $0{,}5$, $1$, $1{,}5$ y $2$ en lugar de los extremos izquierdos. -->
- [ ] B) $\frac{8}{3}$
  <!-- feedback: Incorrecto. Ese es el valor exacto de $\int_{0}^{2} x^2\,dx$; una suma con 4 rectángulos es solo una aproximación. -->
- [ ] C) $3{,}5$
  <!-- feedback: Incorrecto. Se sumaron las alturas $0+0{,}25+1+2{,}25$ sin multiplicar por la base $\Delta x=0{,}5$. -->
- [x] D) $1{,}75$
  <!-- feedback: Correcto. Con $\Delta x=0{,}5$ y alturas $f(0), f(0{,}5), f(1), f(1{,}5)$: $0{,}5(0+0{,}25+1+2{,}25)=1{,}75$. -->

### Explicacion Pedagogica
$\Delta x=\frac{2-0}{4}=0{,}5$. Extremos izquierdos: $0$, $0{,}5$, $1$, $1{,}5$, con alturas $0$, $0{,}25$, $1$, $2{,}25$. Suma: $L_4=0{,}5 \cdot 3{,}5=1{,}75$. Como $x^2$ es creciente en $[0,2]$, la suma por la izquierda subestima el valor exacto $\frac{8}{3} \approx 2{,}67$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.66
**Contexto:** Un carrotanque abastece un tanque en La Guajira que ya tenía 100 L; el agua entra a razón de $r(t)=20+6t$ L/min.

### Enunciado
¿Cuántos litros hay en el tanque a los 5 minutos?

### Opciones
- [ ] A) $175$ L
  <!-- feedback: Incorrecto. Se calculó bien lo que entró, $\int_{0}^{5}(20+6t)\,dt=175$, pero se olvidaron los 100 L iniciales. -->
- [ ] B) $150$ L
  <!-- feedback: Incorrecto. Se sumó la tasa en $t=5$, $r(5)=50$ L/min, a los 100 L; una tasa no es una cantidad acumulada. -->
- [ ] C) $350$ L
  <!-- feedback: Incorrecto. Se integró $6t$ como $6t^2$ sin dividir entre 2: $100+100+150$ en lugar de $100+100+75$. -->
- [x] D) $275$ L
  <!-- feedback: Correcto. Cantidad final $=100+\int_{0}^{5}(20+6t)\,dt=100+[20t+3t^2]_{0}^{5}=100+175=275$ L. -->

### Explicacion Pedagogica
Cantidad final = cantidad inicial + lo acumulado por la tasa: $Q(5)=100+\int_{0}^{5}(20+6t)\,dt$. Antiderivada: $20t+3t^2$; en $t=5$ vale $100+75=175$. Total: $100+175=275$ L.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.62
**Contexto:** Una empresa de energía en Ibagué define la energía acumulada como $G(x)=\int_{1}^{x}(t^2+1)\,dt$, con $x$ en horas.

### Enunciado
¿Cuánto vale $G'(2)$?

### Opciones
- [ ] A) $\frac{10}{3}$
  <!-- feedback: Incorrecto. Ese es $G(2)=\int_{1}^{2}(t^2+1)\,dt$; se pidió la derivada $G'(2)$, no el valor acumulado. -->
- [ ] B) $4$
  <!-- feedback: Incorrecto. Se derivó el integrando ($2t$ en $t=2$); el teorema fundamental dice que $G'(x)$ es el integrando mismo, no su derivada. -->
- [x] C) $5$
  <!-- feedback: Correcto. Por el teorema fundamental (primera parte) $G'(x)=x^2+1$, y $G'(2)=4+1=5$. -->
- [ ] D) $3$
  <!-- feedback: Incorrecto. Se restó el integrando en el límite inferior, $5-2$; el límite inferior constante no aporta nada a la derivada. -->

### Explicacion Pedagogica
La primera parte del teorema fundamental del cálculo afirma que si $G(x)=\int_{a}^{x} f(t)\,dt$ con $f$ continua, entonces $G'(x)=f(x)$. Aquí $G'(x)=x^2+1$ y $G'(2)=5$. Interpretación: a las 2 horas la energía se acumula a 5 unidades por hora.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.60
**Contexto:** El borde de un lote en Villavicencio se modela con $f(x)=x^2-4$ en $[0,3]$ (cientos de metros), y la curva cruza el eje $x$ en $x=2$.

### Enunciado
¿Cuál es el área total de la región comprendida entre la gráfica de $f$ y el eje $x$ en $[0,3]$?

### Opciones
- [ ] A) $-3$
  <!-- feedback: Incorrecto. Ese es el valor de la integral $\int_{0}^{3}(x^2-4)\,dx$, que resta la parte bajo el eje; un área no puede ser negativa. -->
- [x] B) $\frac{23}{3}$
  <!-- feedback: Correcto. Se separa en $x=2$: $|\int_{0}^{2}(x^2-4)\,dx|=\frac{16}{3}$ y $\int_{2}^{3}(x^2-4)\,dx=\frac{7}{3}$; el área es $\frac{16}{3}+\frac{7}{3}=\frac{23}{3}$. -->
- [ ] C) $3$
  <!-- feedback: Incorrecto. Se tomó el valor absoluto de la integral total, $|-3|$; así la parte positiva sigue cancelando parte de la negativa. -->
- [ ] D) $\frac{7}{3}$
  <!-- feedback: Incorrecto. Solo se consideró la región sobre el eje en $[2,3]$; falta la región bajo el eje en $[0,2]$, de área $\frac{16}{3}$. -->

### Explicacion Pedagogica
$f$ es negativa en $[0,2)$ y positiva en $(2,3]$. $\int_{0}^{2}(x^2-4)\,dx=[\frac{x^3}{3}-4x]_{0}^{2}=\frac{8}{3}-8=-\frac{16}{3}$ y $\int_{2}^{3}(x^2-4)\,dx=(9-12)-(\frac{8}{3}-8)=\frac{7}{3}$. Área total $=\frac{16}{3}+\frac{7}{3}=\frac{23}{3} \approx 7{,}67$, mientras que la integral neta vale $-3$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.58
**Contexto:** En un taller de preparación Saber 11 en Popayán, un estudiante resolvió $\int_{-1}^{1}\frac{1}{x^2}\,dx=[-\frac{1}{x}]_{-1}^{1}=-1-1=-2$.

### Enunciado
¿Cuál es el error en su procedimiento?

### Opciones
- [ ] A) La antiderivada tiene el signo equivocado; el resultado correcto es $2$.
  <!-- feedback: Incorrecto. La antiderivada $-\frac{1}{x}$ sí es correcta, pues $(-\frac{1}{x})'=\frac{1}{x^2}$; el problema no está en el signo. -->
- [x] B) El teorema fundamental no se puede aplicar porque $\frac{1}{x^2}$ no es continua en $x=0$, que está dentro de $[-1,1]$.
  <!-- feedback: Correcto. El teorema exige que el integrando sea continuo en todo $[a,b]$; $\frac{1}{x^2}$ no está definida en 0 y crece sin límite, así que la integral no vale $-2$ (diverge). -->
- [ ] C) Por simetría el resultado correcto es $0$.
  <!-- feedback: Incorrecto. La simetría que anula integrales es la de funciones impares; $\frac{1}{x^2}$ es par y positiva, así que no se cancela. -->
- [ ] D) No hay error; el resultado es $-2$.
  <!-- feedback: Incorrecto. Un integrando positivo no puede dar una integral negativa; eso ya indica que el procedimiento no es válido. -->

### Explicacion Pedagogica
El teorema fundamental del cálculo requiere que $f$ sea continua en $[a,b]$. Como $\frac{1}{x^2}$ tiene una discontinuidad infinita en $x=0 \in [-1,1]$, no se puede evaluar directamente. Además, si $f>0$ la integral debería ser positiva, y el resultado $-2$ es una señal de alerta. Analizando cada mitad como integral impropia, $\int_{0}^{1}\frac{1}{x^2}\,dx$ diverge.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.56
**Contexto:** Un programa de la Universidad Nacional aproxima áreas con sumas de rectángulos cada vez más delgados.

### Enunciado
¿A qué integral definida es igual $\lim_{n \to \infty} \sum_{i=1}^{n} \frac{3}{n}\left(\frac{3i}{n}\right)^2$?

### Opciones
- [ ] A) $\int_{0}^{1} x^2\,dx$
  <!-- feedback: Incorrecto. El ancho $\frac{3}{n}$ indica un intervalo de longitud 3, no 1; los puntos $\frac{3i}{n}$ recorren $[0,3]$. -->
- [ ] B) $\int_{0}^{3} 3x^2\,dx$
  <!-- feedback: Incorrecto. El factor 3 de $\frac{3}{n}$ es el ancho $\Delta x$, no un coeficiente de la función; contarlo dos veces da 27 en lugar de 9. -->
- [ ] C) $\int_{0}^{1} 3x^2\,dx$
  <!-- feedback: Incorrecto. Se interpretó $\frac{3}{n}$ como $3 \cdot \frac{1}{n}$ sobre $[0,1]$, pero los puntos $\frac{3i}{n}$ llegan hasta 3, así que el intervalo es $[0,3]$. -->
- [x] D) $\int_{0}^{3} x^2\,dx$
  <!-- feedback: Correcto. Con $\Delta x=\frac{3}{n}$, $x_i=\frac{3i}{n}$ en $[0,3]$ y $f(x)=x^2$, la suma de Riemann tiende a $\int_{0}^{3} x^2\,dx=9$. -->

### Explicacion Pedagogica
Una suma de Riemann tiene la forma $\sum f(x_i)\Delta x$. Aquí $\Delta x=\frac{3}{n}$, por lo que el intervalo mide 3; $x_i=\frac{3i}{n}$ va de casi 0 a 3, así que es $[0,3]$; y $f(x_i)=x_i^2$. El límite es $\int_{0}^{3} x^2\,dx=\frac{27}{3}=9$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.54
**Contexto:** Un mototaxi en Montería se mueve en línea recta con velocidad $v(t)=t-3$ m/s durante 5 segundos (negativa significa que va en reversa).

### Enunciado
¿Cuál es la distancia total recorrida entre $t=0$ y $t=5$ s?

### Opciones
- [x] A) $6{,}5$ m
  <!-- feedback: Correcto. Distancia $=\int_{0}^{5}|t-3|\,dt=4{,}5+2=6{,}5$ m, separando en $t=3$ donde cambia el sentido. -->
- [ ] B) $-2{,}5$ m
  <!-- feedback: Incorrecto. Ese es el desplazamiento neto $\int_{0}^{5}(t-3)\,dt$; la distancia recorrida no puede ser negativa. -->
- [ ] C) $2{,}5$ m
  <!-- feedback: Incorrecto. Se tomó el valor absoluto del desplazamiento total; así se cancelan los tramos de ida y regreso en lugar de sumarlos. -->
- [ ] D) $4{,}5$ m
  <!-- feedback: Incorrecto. Solo se contó el tramo en reversa de $t=0$ a $t=3$; falta el tramo de $t=3$ a $t=5$, que aporta 2 m. -->

### Explicacion Pedagogica
La velocidad cambia de signo en $t=3$. Tramo $[0,3]$: $\int_{0}^{3}(t-3)\,dt=-4{,}5$, es decir, 4,5 m en reversa. Tramo $[3,5]$: $\int_{3}^{5}(t-3)\,dt=2$ m hacia adelante. Distancia total: $4{,}5+2=6{,}5$ m; desplazamiento neto: $-4{,}5+2=-2{,}5$ m.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.52
**Contexto:** Un estudiante de Sogamoso calcula el área bajo una curva simétrica de un puente modelada con $f(x)=x^3+5$ en $[-2,2]$.

### Enunciado
¿Cuál es el valor de $\int_{-2}^{2}(x^3+5)\,dx$?

### Opciones
- [ ] A) $0$
  <!-- feedback: Incorrecto. Solo $x^3$ es impar y se anula en un intervalo simétrico; la constante 5 aporta $5 \cdot 4=20$. -->
- [x] B) $20$
  <!-- feedback: Correcto. $\int_{-2}^{2}x^3\,dx=0$ porque $x^3$ es impar, y $\int_{-2}^{2}5\,dx=5 \cdot 4=20$. -->
- [ ] C) $14$
  <!-- feedback: Incorrecto. Ese es $\int_{0}^{2}(x^3+5)\,dx=4+10$; se integró solo la mitad derecha del intervalo. -->
- [ ] D) $28$
  <!-- feedback: Incorrecto. Se duplicó la mitad derecha como si toda la función fuera par; $x^3$ es impar y su parte izquierda vale $-4$, no $+4$. -->

### Explicacion Pedagogica
Se separa por linealidad: $\int_{-2}^{2}x^3\,dx+\int_{-2}^{2}5\,dx$. Como $x^3$ es impar, $\int_{-2}^{2}x^3\,dx=[\frac{x^4}{4}]_{-2}^{2}=4-4=0$. La constante da $5(2-(-2))=20$. Total: 20.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Formulacion
**Expected_Success:** 0.50
**Contexto:** Un arquitecto de Pasto diseña una fachada cuya área entre $x=0$ y $x=k$ metros, bajo la recta $y=2x+1$, debe ser de 12 m² con $k>0$.

### Enunciado
¿Qué valor de $k$ cumple la condición $\int_{0}^{k}(2x+1)\,dx=12$ en el contexto del problema?

### Opciones
- [ ] A) $k=-4$ y $k=3$, ambos válidos.
  <!-- feedback: Incorrecto. Algebraicamente $k^2+k=12$ tiene raíces $-4$ y $3$, pero el problema exige $k>0$ porque es una longitud, así que $-4$ se descarta. -->
- [ ] B) $k=4$
  <!-- feedback: Incorrecto. Se resolvió $k^2-k=12$ por un error de signo en la antiderivada; con $k=4$ la integral vale $16+4=20$. -->
- [x] C) $k=3$
  <!-- feedback: Correcto. $\int_{0}^{k}(2x+1)\,dx=k^2+k=12$ da $(k+4)(k-3)=0$, y la única solución positiva es $k=3$. -->
- [ ] D) $k=\sqrt{12}$
  <!-- feedback: Incorrecto. Se olvidó integrar el término constante 1 y se resolvió $k^2=12$; la ecuación correcta es $k^2+k=12$. -->

### Explicacion Pedagogica
$\int_{0}^{k}(2x+1)\,dx=[x^2+x]_{0}^{k}=k^2+k$. Igualando: $k^2+k-12=0$, es decir, $(k+4)(k-3)=0$, con soluciones $k=3$ o $k=-4$. Como $k$ es una longitud positiva, $k=3$ m. Comprobación: $9+3=12$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** En época seca, el caudal del río Magdalena en Honda disminuye: su función $f(t)$ es positiva y decreciente, y se estima el volumen con sumas de Riemann.

### Enunciado
¿Cuál afirmación sobre las sumas por la izquierda ($L_n$) y por la derecha ($R_n$) es correcta para $\int_{a}^{b} f(t)\,dt$?

### Opciones
- [x] A) $L_n$ sobreestima y $R_n$ subestima el valor de la integral.
  <!-- feedback: Correcto. En una función decreciente el extremo izquierdo de cada subintervalo es el punto más alto, así que $L_n$ queda por encima y $R_n$ por debajo. -->
- [ ] B) $L_n$ subestima y $R_n$ sobreestima el valor de la integral.
  <!-- feedback: Incorrecto. Eso ocurre con funciones crecientes; si $f$ decrece, la altura izquierda es la mayor del subintervalo. -->
- [ ] C) Ambas sumas sobreestiman el valor de la integral.
  <!-- feedback: Incorrecto. En $R_n$ cada altura es el valor mínimo de $f$ en su subintervalo, por lo que esa suma queda por debajo. -->
- [ ] D) Ambas sumas son iguales a la integral si $n=4$.
  <!-- feedback: Incorrecto. Con un número finito de rectángulos hay error salvo que $f$ sea constante; la igualdad exacta se logra solo en el límite $n \to \infty$. -->

### Explicacion Pedagogica
Si $f$ es decreciente en $[x_{i-1},x_i]$, entonces $f(x_{i-1}) \ge f(t) \ge f(x_i)$. Al multiplicar por $\Delta x$ y sumar: $R_n \le \int_{a}^{b} f \le L_n$. Ejemplo: para $e^{-t}$ en $[0,2]$ con $n=4$, $L_4 \approx 1{,}10$, la integral $\approx 0{,}86$ y $R_4 \approx 0{,}67$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.46
**Contexto:** La temperatura en un invernadero de flores en Medellín entre las 6:00 a. m. y las 12:00 m. se modela con $T(t)=18+6t-t^2$ °C, con $t$ en horas desde las 6:00.

### Enunciado
¿Cuál es la temperatura promedio del invernadero en el intervalo $[0,6]$?

### Opciones
- [x] A) $24$ °C
  <!-- feedback: Correcto. Valor promedio $=\frac{1}{6}\int_{0}^{6}(18+6t-t^2)\,dt=\frac{144}{6}=24$ °C. -->
- [ ] B) $144$ °C
  <!-- feedback: Incorrecto. Ese es el valor de la integral; para obtener el promedio hay que dividir entre la longitud del intervalo, 6 horas. -->
- [ ] C) $18$ °C
  <!-- feedback: Incorrecto. Se promediaron solo los extremos $T(0)=18$ y $T(6)=18$; eso ignora cómo varía la temperatura entre ellos. -->
- [ ] D) $27$ °C
  <!-- feedback: Incorrecto. Ese es el valor máximo $T(3)=27$; el promedio integral siempre es menor que el máximo si la función no es constante. -->

### Explicacion Pedagogica
El valor promedio de una función en $[a,b]$ es $\frac{1}{b-a}\int_{a}^{b} T(t)\,dt$. $\int_{0}^{6}(18+6t-t^2)\,dt=[18t+3t^2-\frac{t^3}{3}]_{0}^{6}=108+108-72=144$. Promedio: $\frac{144}{6}=24$ °C, que está entre el mínimo 18 y el máximo 27.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W21-integrales-definidas-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.45
**Contexto:** Un sensor de nivel en una represa de Antioquia mide el error absoluto $|x-1|$ respecto a una referencia, y se quiere el error acumulado entre $x=0$ y $x=3$.

### Enunciado
¿Cuál es el valor de $\int_{0}^{3}|x-1|\,dx$?

### Opciones
- [ ] A) $\frac{3}{2}$
  <!-- feedback: Incorrecto. Se ignoró el valor absoluto y se integró $x-1$ en todo el intervalo; en $[0,1]$ el integrando real es $1-x$, no $x-1$. -->
- [ ] B) $2$
  <!-- feedback: Incorrecto. Solo se integró el tramo $[1,3]$; falta el tramo $[0,1]$, que aporta $\frac{1}{2}$. -->
- [x] C) $\frac{5}{2}$
  <!-- feedback: Correcto. Se separa en $x=1$: $\int_{0}^{1}(1-x)\,dx+\int_{1}^{3}(x-1)\,dx=\frac{1}{2}+2=\frac{5}{2}$. -->
- [ ] D) $\frac{1}{2}$
  <!-- feedback: Incorrecto. Solo se integró el tramo $[0,1]$; el tramo $[1,3]$ aporta 2 más. -->

### Explicacion Pedagogica
$|x-1|=1-x$ si $x<1$ y $x-1$ si $x \ge 1$. Entonces $\int_{0}^{1}(1-x)\,dx=[x-\frac{x^2}{2}]_{0}^{1}=\frac{1}{2}$ y $\int_{1}^{3}(x-1)\,dx=[\frac{x^2}{2}-x]_{1}^{3}=\frac{3}{2}-(-\frac{1}{2})=2$. Total: $\frac{5}{2}$. Geométricamente son dos triángulos de áreas $\frac{1}{2}$ y 2.
