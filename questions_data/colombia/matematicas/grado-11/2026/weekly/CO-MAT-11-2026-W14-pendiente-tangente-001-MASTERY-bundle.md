---
id: "CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "pendiente-tangente"
periodo: "weekly"
week: "W14"
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

# Bundle MASTERY: Pendiente y Recta Tangente - Grado 11

Este bundle evalúa la pendiente de la recta tangente, las ecuaciones de rectas tangentes y normales, las tangentes horizontales y paralelas y la aproximación lineal en contextos colombianos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** Un diseñador de rampas para un skatepark de Bogotá describe el perfil de la rampa con una función $f$ y quiere conocer su inclinación exacta en un punto.

### Enunciado
Si $f$ es derivable en $x=a$, ¿qué representa la pendiente de la recta tangente a la gráfica de $f$ en el punto $(a, f(a))$?

### Opciones
- [x] A) El valor $f'(a)$
  <!-- feedback: Correcto. Por definición, la pendiente de la tangente en $x=a$ es $f'(a)=\lim_{h \to 0}\frac{f(a+h)-f(a)}{h}$. -->
- [ ] B) El valor $f(a)$
  <!-- feedback: Incorrecto. $f(a)$ es la altura del punto de tangencia, no la inclinación de la recta. -->
- [ ] C) El cociente $\frac{f(a)-f(0)}{a}$
  <!-- feedback: Incorrecto. Ese cociente es la pendiente de una recta secante entre $x=0$ y $x=a$, no la tangente. -->
- [ ] D) El valor $f''(a)$
  <!-- feedback: Incorrecto. La segunda derivada describe cómo cambia la pendiente (concavidad), no la pendiente misma. -->

### Explicacion Pedagogica
La recta tangente es el límite de las rectas secantes que pasan por $(a,f(a))$ y $(a+h,f(a+h))$ cuando $h \to 0$. Ese límite de pendientes secantes es exactamente la derivada $f'(a)$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.83
**Contexto:** En una maqueta del sendero ecológico de la Quebrada La Vieja (Bogotá), el perfil de un tramo se modela con una parábola.

### Enunciado
¿Cuál es la pendiente de la recta tangente a $y = x^2 - 3x$ en $x = 4$?

### Opciones
- [x] A) 5
  <!-- feedback: Correcto. $y'=2x-3$, así que en $x=4$ la pendiente es $8-3=5$. -->
- [ ] B) 4
  <!-- feedback: Incorrecto. 4 es el valor de la función, $16-12=4$, es decir, la altura del punto, no la pendiente. -->
- [ ] C) 8
  <!-- feedback: Incorrecto. Derivó solo $x^2$ y olvidó que la derivada de $-3x$ es $-3$: $8-3=5$. -->
- [ ] D) 1
  <!-- feedback: Incorrecto. Calculó la pendiente secante entre $x=0$ y $x=4$: $\frac{4-0}{4}=1$, no la tangente. -->

### Explicacion Pedagogica
Se deriva $y=x^2-3x$ para obtener $y'=2x-3$. Evaluando en $x=4$: $y'(4)=2(4)-3=5$. La recta tangente en $(4,4)$ sube 5 unidades por cada unidad horizontal.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.80
**Contexto:** Un ingeniero vial de Antioquia conoce la altura y la inclinación de una carretera en un punto y necesita la ecuación de la recta que mejor la aproxima allí.

### Enunciado
Para una función $f$ se sabe que $f(2) = 7$ y $f'(2) = 3$. ¿Cuál es la ecuación de la recta tangente a $f$ en $x = 2$?

### Opciones
- [ ] A) $y = 7x + 3$
  <!-- feedback: Incorrecto. Intercambió los datos: la pendiente es $f'(2)=3$, no $f(2)=7$. -->
- [ ] B) $y = 3x + 7$
  <!-- feedback: Incorrecto. Usó $f(2)=7$ como intercepto con el eje $y$; 7 es la altura en $x=2$, no en $x=0$. -->
- [ ] C) $y = 3x + 13$
  <!-- feedback: Incorrecto. Error de signo en la forma punto-pendiente: escribió $y-7=3(x+2)$ en lugar de $y-7=3(x-2)$. -->
- [x] D) $y = 3x + 1$
  <!-- feedback: Correcto. $y-7=3(x-2)$, que se simplifica a $y=3x+1$. -->

### Explicacion Pedagogica
La forma punto-pendiente es $y-f(a)=f'(a)(x-a)$. Con $a=2$: $y-7=3(x-2)$, es decir $y=3x-6+7=3x+1$. Comprobación: en $x=2$ da $y=7$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Geometrico
**Expected_Success:** 0.78
**Contexto:** En el diseño de un espejo curvo para un telescopio aficionado en Villa de Leyva, la luz reflejada se estudia con la recta normal a la curva.

### Enunciado
Si la recta tangente a una curva en un punto tiene pendiente 4, ¿cuál es la pendiente de la recta normal en ese mismo punto?

### Opciones
- [ ] A) $-4$
  <!-- feedback: Incorrecto. Cambió el signo pero no tomó el recíproco: $4\cdot(-4)=-16\neq -1$. -->
- [ ] B) $\frac{1}{4}$
  <!-- feedback: Incorrecto. Tomó el recíproco pero no cambió el signo: $4\cdot\frac{1}{4}=1\neq -1$. -->
- [x] C) $-\frac{1}{4}$
  <!-- feedback: Correcto. La normal es perpendicular a la tangente: $m_N=-\frac{1}{m_T}=-\frac{1}{4}$, y $4\cdot(-\frac{1}{4})=-1$. -->
- [ ] D) $4$
  <!-- feedback: Incorrecto. 4 es la pendiente de la tangente; una recta con igual pendiente es paralela, no perpendicular. -->

### Explicacion Pedagogica
Dos rectas no verticales son perpendiculares cuando el producto de sus pendientes es $-1$. Como la tangente tiene pendiente 4, la normal cumple $4\cdot m_N=-1$, de donde $m_N=-\frac{1}{4}$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** Un estudiante de Manizales grafica en GeoGebra el perfil de una colina modelado con un polinomio cúbico y quiere trazar la tangente en un punto.

### Enunciado
¿Cuál es la ecuación de la recta tangente a $f(x) = x^3 - 2x + 1$ en el punto de abscisa $x = 1$?

### Opciones
- [ ] A) $y = x$
  <!-- feedback: Incorrecto. Tomó $f(1)=0$ como intercepto; la recta debe pasar por $(1,0)$ y $y=x$ pasa por $(1,1)$. -->
- [ ] B) $y = 3x - 3$
  <!-- feedback: Incorrecto. Usó pendiente 3 porque derivó solo $x^3$; la derivada de $-2x$ aporta $-2$: $f'(1)=1$. -->
- [x] C) $y = x - 1$
  <!-- feedback: Correcto. $f(1)=0$ y $f'(1)=3-2=1$, así que $y-0=1(x-1)$. -->
- [ ] D) $y = -x + 1$
  <!-- feedback: Incorrecto. Esa es la recta normal, de pendiente $-\frac{1}{1}=-1$, no la tangente. -->

### Explicacion Pedagogica
Punto: $f(1)=1-2+1=0$, así que la tangencia es en $(1,0)$. Pendiente: $f'(x)=3x^2-2$, luego $f'(1)=1$. Ecuación: $y-0=1\cdot(x-1)$, es decir $y=x-1$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.73
**Contexto:** En el diseño de una montaña rusa para un parque de diversiones de Cali, se buscan los puntos donde el carro viaja momentáneamente horizontal.

### Enunciado
El riel sigue la curva $f(x) = x^3 - 12x + 2$. ¿En qué puntos de la curva la recta tangente es horizontal?

### Opciones
- [ ] A) Solo en $(2, -14)$
  <!-- feedback: Incorrecto. $3x^2=12$ tiene dos soluciones, $x=2$ y $x=-2$; omitió la raíz negativa. -->
- [x] B) $(-2, 18)$ y $(2, -14)$
  <!-- feedback: Correcto. $f'(x)=3x^2-12=0$ da $x=\pm 2$, con $f(-2)=18$ y $f(2)=-14$. -->
- [ ] C) $(0, 2)$
  <!-- feedback: Incorrecto. En $x=0$ la pendiente es $f'(0)=-12$, no cero; la tangente allí es muy inclinada. -->
- [ ] D) $(2, 18)$ y $(-2, -14)$
  <!-- feedback: Incorrecto. Intercambió las ordenadas: $f(2)=8-24+2=-14$ y $f(-2)=-8+24+2=18$. -->

### Explicacion Pedagogica
Tangente horizontal significa pendiente cero: $f'(x)=3x^2-12=0$, de modo que $x^2=4$ y $x=\pm 2$. Las ordenadas son $f(2)=-14$ y $f(-2)=18$. Los puntos son $(-2,18)$ y $(2,-14)$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.71
**Contexto:** Un arquitecto de Popayán quiere que una baranda recta sea paralela a la recta $y = 4x + 1$ y toque tangencialmente un arco parabólico.

### Enunciado
¿En qué punto de la parábola $f(x) = x^2 - 2x + 3$ la recta tangente es paralela a $y = 4x + 1$?

### Opciones
- [ ] A) $(1, 2)$
  <!-- feedback: Incorrecto. Resolvió $f'(x)=0$; en $x=1$ la tangente es horizontal, con pendiente 0, no 4. -->
- [ ] B) $(3, 13)$
  <!-- feedback: Incorrecto. Halló bien $x=3$, pero calculó la ordenada en la recta $y=4x+1$, no en la parábola. -->
- [x] C) $(3, 6)$
  <!-- feedback: Correcto. Rectas paralelas tienen igual pendiente: $2x-2=4$ da $x=3$ y $f(3)=9-6+3=6$. -->
- [ ] D) $(2, 3)$
  <!-- feedback: Incorrecto. Resolvió $2x=4$ ignorando el $-2$ de la derivada: en $x=2$ la pendiente es $2$, no 4. -->

### Explicacion Pedagogica
La pendiente de $y=4x+1$ es 4. Se busca $f'(x)=2x-2=4$, luego $x=3$. La ordenada se calcula en la parábola: $f(3)=9-6+3=6$. El punto es $(3,6)$ y la tangente allí es $y=4x-6$.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.69
**Contexto:** En un taller de óptica de Bucaramanga se modela la sección de una lente con $y=x^2$ y se necesita la recta normal en un punto para estudiar la refracción.

### Enunciado
¿Cuál es la ecuación de la recta normal a $y = x^2$ en el punto $(1, 1)$?

### Opciones
- [ ] A) $y = 2x - 1$
  <!-- feedback: Incorrecto. Esa es la recta tangente, de pendiente $y'(1)=2$, no la perpendicular a ella. -->
- [ ] B) $y = -2x + 3$
  <!-- feedback: Incorrecto. Solo cambió el signo de la pendiente: $2\cdot(-2)=-4\neq -1$, así que no es perpendicular. -->
- [x] C) $y = -\frac{1}{2}x + \frac{3}{2}$
  <!-- feedback: Correcto. La tangente tiene pendiente $2$, la normal $-\frac{1}{2}$, y $y-1=-\frac{1}{2}(x-1)$. -->
- [ ] D) $y = \frac{1}{2}x + \frac{1}{2}$
  <!-- feedback: Incorrecto. Tomó el recíproco sin cambiar el signo: $2\cdot\frac{1}{2}=1\neq -1$. -->

### Explicacion Pedagogica
La derivada es $y'=2x$, así que la tangente en $(1,1)$ tiene pendiente 2. La normal tiene pendiente $-\frac{1}{2}$ y pasa por $(1,1)$: $y-1=-\frac{1}{2}(x-1)$, es decir $y=-\frac{1}{2}x+\frac{3}{2}$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.67
**Contexto:** Un grupo de estudiantes de Neiva compara la velocidad promedio y la velocidad instantánea de una piedra que rueda por una pendiente, con posición $f(x)=x^2$.

### Enunciado
Para $f(x) = x^2$, ¿cuál es la pendiente de la secante entre $x = 1$ y $x = 3$, y en qué punto la tangente tiene esa misma pendiente?

### Opciones
- [x] A) Pendiente 4; en $x = 2$
  <!-- feedback: Correcto. $\frac{9-1}{3-1}=4$ y $f'(x)=2x=4$ da $x=2$. -->
- [ ] B) Pendiente 4; en $x = 3$
  <!-- feedback: Incorrecto. La secante sí es 4, pero en $x=3$ la tangente tiene pendiente $f'(3)=6$. -->
- [ ] C) Pendiente 2; en $x = 1$
  <!-- feedback: Incorrecto. 2 es la pendiente de la tangente en $x=1$, no la de la secante entre 1 y 3. -->
- [ ] D) Pendiente 8; en $x = 4$
  <!-- feedback: Incorrecto. Olvidó dividir entre $3-1=2$: el cambio en $y$ es 8, pero la pendiente es $\frac{8}{2}=4$. -->

### Explicacion Pedagogica
Secante: $\frac{f(3)-f(1)}{3-1}=\frac{9-1}{2}=4$. Tangente: $f'(x)=2x$; igualando $2x=4$ se obtiene $x=2$, que está entre 1 y 3. La velocidad instantánea en $x=2$ coincide con la velocidad media del intervalo.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Numerico
**Expected_Success:** 0.65
**Contexto:** Un tanque cúbico de agua en una finca de Fusagasugá tiene arista de 2 m; por dilatación, la arista aumenta a 2.01 m y se quiere estimar el nuevo volumen sin calculadora.

### Enunciado
Usando la aproximación lineal de $V(x) = x^3$ en $x = 2$, ¿cuál es el valor estimado de $V(2.01)$?

### Opciones
- [ ] A) $8.01$ m³
  <!-- feedback: Incorrecto. Sumó directamente $\Delta x=0.01$ al volumen; el cambio en $V$ es $V'(2)\Delta x=12\cdot 0.01=0.12$. -->
- [x] B) $8.12$ m³
  <!-- feedback: Correcto. Con la recta tangente, $L(x)=V(2)+V'(2)(x-2)=8+12(0.01)=8.12$. -->
- [ ] C) $0.12$ m³
  <!-- feedback: Incorrecto. 0.12 es solo el incremento estimado $V'(2)\cdot 0.01$; falta sumarle $V(2)=8$. -->
- [ ] D) $8.06$ m³
  <!-- feedback: Incorrecto. Usó $V'(2)=6$ al derivar $x^3$ como $3x$; la derivada es $3x^2=12$ en $x=2$. -->

### Explicacion Pedagogica
La aproximación lineal es $L(x)=V(a)+V'(a)(x-a)$. Con $a=2$: $V(2)=8$ y $V'(x)=3x^2$, así que $V'(2)=12$. Entonces $V(2.01)\approx 8+12(0.01)=8.12$ m³; el valor exacto es $8.120601$, muy cercano.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.62
**Contexto:** En una simulación de tiro parabólico para una feria de ciencias en Montería, se busca que una recta de pendiente fija sea tangente a la trayectoria.

### Enunciado
¿Para qué valor de $k$ la recta $y = 5x + k$ es tangente a la curva $y = x^2 + x$?

### Opciones
- [ ] A) $k = 6$
  <!-- feedback: Incorrecto. 6 es la ordenada del punto de tangencia; $k$ es el intercepto: $k=6-10=-4$. -->
- [ ] B) $k = 4$
  <!-- feedback: Incorrecto. Error de signo al despejar: de $6=10+k$ se obtiene $k=-4$. -->
- [x] C) $k = -4$
  <!-- feedback: Correcto. $2x+1=5$ da $x=2$, punto $(2,6)$; entonces $6=5(2)+k$ y $k=-4$. -->
- [ ] D) $k = 2$
  <!-- feedback: Incorrecto. 2 es la abscisa del punto de tangencia, no el intercepto de la recta. -->

### Explicacion Pedagogica
La recta tiene pendiente 5, así que se busca $y'=2x+1=5$, es decir $x=2$. El punto de la curva es $(2, 4+2)=(2,6)$. Para que la recta pase por él: $6=5\cdot 2+k$, luego $k=-4$. Comprobación: $x^2+x-(5x-4)=(x-2)^2\ge 0$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.60
**Contexto:** Desde un reflector ubicado en el punto $(0,-4)$ de un escenario en Medellín se lanzan haces rectos que deben rozar un arco con forma $y = x^2$.

### Enunciado
¿Cuáles son las rectas que pasan por $(0, -4)$ y son tangentes a la parábola $y = x^2$?

### Opciones
- [ ] A) Solo $y = 4x - 4$
  <!-- feedback: Incorrecto. La ecuación $a^2=4$ también tiene la solución $a=-2$, que da la tangente $y=-4x-4$. -->
- [ ] B) $y = 2x - 4$ y $y = -2x - 4$
  <!-- feedback: Incorrecto. Usó como pendiente $\pm a=\pm 2$; la pendiente de la tangente en $x=a$ es $2a=\pm 4$. -->
- [ ] C) $y = 4x + 4$ y $y = -4x + 4$
  <!-- feedback: Incorrecto. Esas rectas cortan el eje $y$ en 4, no pasan por $(0,-4)$. -->
- [x] D) $y = 4x - 4$ y $y = -4x - 4$
  <!-- feedback: Correcto. La tangente en $x=a$ es $y=2ax-a^2$; si pasa por $(0,-4)$, $-a^2=-4$ y $a=\pm 2$, con pendientes $\pm 4$. -->

### Explicacion Pedagogica
La tangente a $y=x^2$ en $(a,a^2)$ es $y=a^2+2a(x-a)=2ax-a^2$. Exigiendo que pase por $(0,-4)$: $-4=-a^2$, así que $a=2$ o $a=-2$. Las tangentes son $y=4x-4$ y $y=-4x-4$; el punto $(0,-4)$ está fuera de la parábola, por eso hay dos.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.58
**Contexto:** Un analista de datos de Bogotá modela el consumo de energía con una función $f$ y le suma un término cuadrático para un nuevo modelo $h$.

### Enunciado
La recta tangente a la gráfica de $f$ en $x = 3$ es $y = -2x + 11$. Si $h(x) = f(x) + x^2$, ¿cuál es la pendiente de la tangente a $h$ en $x = 3$?

### Opciones
- [ ] A) 6
  <!-- feedback: Incorrecto. 6 es solo la derivada de $x^2$ en 3; falta sumar $f'(3)=-2$. -->
- [x] B) 4
  <!-- feedback: Correcto. $f'(3)=-2$ (pendiente de la tangente dada) y $h'(3)=f'(3)+2(3)=-2+6=4$. -->
- [ ] C) 11
  <!-- feedback: Incorrecto. 11 es el intercepto de la tangente con el eje $y$, que no da información de la pendiente. -->
- [ ] D) -2
  <!-- feedback: Incorrecto. $-2$ es la pendiente de $f$; ignoró que $x^2$ aporta $2x=6$ a la derivada de $h$. -->

### Explicacion Pedagogica
De la tangente $y=-2x+11$ se lee que $f'(3)=-2$ (y que $f(3)=-6+11=5$). Como $h'(x)=f'(x)+2x$, resulta $h'(3)=-2+6=4$. La pendiente de la tangente a $h$ en $x=3$ es 4.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.56
**Contexto:** En una maqueta del sistema de vías de Medellín, una calle sube siguiendo la curva $f(x) = x^2 - 3x + 4$ y se pregunta su ángulo de inclinación.

### Enunciado
¿Cuál es el ángulo de inclinación (respecto a la horizontal) de la recta tangente a $f(x) = x^2 - 3x + 4$ en $x = 2$?

### Opciones
- [ ] A) $1$°
  <!-- feedback: Incorrecto. Confundió la pendiente con el ángulo; la pendiente es $\tan\theta=1$, no $\theta=1$°. -->
- [x] B) $45$°
  <!-- feedback: Correcto. $f'(2)=4-3=1$ y $\tan\theta=1$ implica $\theta=45$°. -->
- [ ] C) $60$°
  <!-- feedback: Incorrecto. $\tan 60^{\circ}=\sqrt{3}\approx 1.73$, pero la pendiente obtenida es 1. -->
- [ ] D) $90$°
  <!-- feedback: Incorrecto. Una recta de $90$° es vertical y su pendiente no está definida; aquí la pendiente es 1. -->

### Explicacion Pedagogica
La pendiente de la tangente es $f'(x)=2x-3$, que en $x=2$ vale $1$. El ángulo de inclinación $\theta$ cumple $\tan\theta=m=1$, por lo que $\theta=45$°: la calle sube una unidad por cada unidad horizontal.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.54
**Contexto:** Dos toboganes de un parque acuático en Girardot tienen perfiles parabólicos y el diseñador quiere unirlos suavemente con una misma recta tangente.

### Enunciado
Las curvas $f(x) = x^2$ y $g(x) = -x^2 + 4x - 2$ se tocan en un punto donde tienen la misma tangente. ¿Cuál es esa recta tangente común?

### Opciones
- [ ] A) $y = 2x + 1$
  <!-- feedback: Incorrecto. Tiene la pendiente correcta, pero en $x=1$ da $y=3$, y el punto de contacto es $(1,1)$. -->
- [ ] B) $y = 4x - 3$
  <!-- feedback: Incorrecto. Sumó las dos pendientes $2+2$; la tangente común tiene la pendiente compartida, 2. -->
- [ ] C) $y = 1$
  <!-- feedback: Incorrecto. Supuso tangente horizontal, pero $f'(1)=2\neq 0$. -->
- [x] D) $y = 2x - 1$
  <!-- feedback: Correcto. $2x=-2x+4$ da $x=1$, ambas valen 1 allí y la pendiente común es 2: $y-1=2(x-1)$. -->

### Explicacion Pedagogica
Igualando pendientes: $f'(x)=2x$ y $g'(x)=-2x+4$ coinciden en $x=1$. Además $f(1)=1$ y $g(1)=-1+4-2=1$, así que las curvas se tocan en $(1,1)$. La tangente común es $y-1=2(x-1)$, es decir $y=2x-1$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.52
**Contexto:** En una tutoría de cálculo en Santa Marta, un estudiante presenta su solución para la tangente a $f(x)=x^2+1$ en $x=3$.

### Enunciado
El estudiante escribe: "$f'(x)=2x$, así que la tangente en $x=3$ es $y=2x+1$". ¿Cuál es la corrección adecuada?

### Opciones
- [ ] A) No hay error: la tangente es $y=2x+1$
  <!-- feedback: Incorrecto. Esa recta en $x=3$ da $y=7$, pero $f(3)=10$: ni siquiera pasa por el punto de tangencia. -->
- [ ] B) La pendiente debe ser $f(3)=10$, así que la tangente es $y=10x-20$
  <!-- feedback: Incorrecto. Usó la altura $f(3)$ como pendiente; la pendiente es $f'(3)=6$. -->
- [ ] C) La pendiente es 6, y la tangente es $y=6x+10$
  <!-- feedback: Incorrecto. Usó $f(3)=10$ como intercepto; en $x=3$ esa recta vale 28, no 10. -->
- [x] D) Debió evaluar la derivada: $f'(3)=6$ y $f(3)=10$, así que la tangente es $y=6x-8$
  <!-- feedback: Correcto. Con punto $(3,10)$ y pendiente 6: $y-10=6(x-3)$, es decir $y=6x-8$. -->

### Explicacion Pedagogica
La derivada $f'(x)=2x$ es una función; la pendiente en el punto se obtiene evaluándola: $f'(3)=6$. El punto es $(3,f(3))=(3,10)$. Así, $y-10=6(x-3)$ y la tangente es $y=6x-8$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Una baldosa cuadrada de un piso en Cartagena mide 3 dm de lado; con un corte nuevo medirá 3.1 dm y un técnico estima su área con la tangente de $A(x)=x^2$.

### Enunciado
Se aproxima $A(3.1)$ con la recta tangente a $A(x)=x^2$ en $x=3$. ¿Cuál evaluación de la estimación es correcta?

### Opciones
- [x] A) La estimación es $9.6$ dm² y subestima el área real $9.61$ dm², porque la parábola queda por encima de su tangente
  <!-- feedback: Correcto. $L(3.1)=9+6(0.1)=9.6<9.61$; en $x^2$ la gráfica está sobre sus tangentes. -->
- [ ] B) La estimación es $9.6$ dm² y sobreestima el área real
  <!-- feedback: Incorrecto. $9.6<9.61$, así que la tangente se queda corta, no se pasa. -->
- [ ] C) La estimación es $9.61$ dm², sin error, porque $A$ es un polinomio
  <!-- feedback: Incorrecto. La tangente es una recta y $x^2$ no lo es: la diferencia es $(0.1)^2=0.01$. -->
- [ ] D) La estimación es $9.1$ dm², sumando $0.1$ al área inicial
  <!-- feedback: Incorrecto. Olvidó multiplicar por $A'(3)=6$: el incremento estimado es $6\cdot 0.1=0.6$. -->

### Explicacion Pedagogica
$L(x)=A(3)+A'(3)(x-3)=9+6(x-3)$, así que $L(3.1)=9.6$. El área exacta es $3.1^2=9.61$. El error es $A(x)-L(x)=(x-3)^2=0.01>0$: la parábola siempre está por encima de su tangente, y por eso la aproximación subestima.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** En un debate de la clase de matemáticas en Armenia se discute la frase "la recta tangente es la que toca la curva en un solo punto".

### Enunciado
Para la curva $y = x^3$, ¿cuál de las siguientes afirmaciones sobre su tangente en $x = 1$ es correcta?

### Opciones
- [x] A) La tangente es $y=3x-2$ y vuelve a cortar la curva en $x=-2$; por eso "tocar en un solo punto" no define la tangente
  <!-- feedback: Correcto. $x^3-(3x-2)=(x-1)^2(x+2)$, que también se anula en $x=-2$. -->
- [ ] B) La tangente es $y=3x-3$ y no vuelve a cortar la curva
  <!-- feedback: Incorrecto. $y=3x-3$ no pasa por $(1,1)$: en $x=1$ da 0. La tangente correcta es $y=3x-2$. -->
- [ ] C) Toda recta que corta la curva en un solo punto es tangente a ella
  <!-- feedback: Incorrecto. La recta vertical $x=1$ corta $y=x^3$ una sola vez y no es tangente. -->
- [ ] D) La tangente es $y=3x-2$ y vuelve a cortar la curva en $x=2$
  <!-- feedback: Incorrecto. En $x=2$, la curva vale 8 y la recta $3(2)-2=4$; el otro corte es en $x=-2$, donde ambas valen $-8$. -->

### Explicacion Pedagogica
$y'=3x^2$ da pendiente 3 en $x=1$, y la tangente es $y-1=3(x-1)$, o sea $y=3x-2$. Al igualar, $x^3-3x+2=(x-1)^2(x+2)=0$: hay contacto doble en $x=1$ y un corte en $x=-2$. La tangente se define por la pendiente $f'(a)$, no por el número de cortes.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Variacional
**Expected_Success:** 0.47
**Contexto:** Un ciclista recorre una ciclovía recta de Bogotá; su posición respecto a un paradero, en km, es $s(t)=t^3-6t^2+9t$ con $t$ en horas, $0 \le t \le 4$.

### Enunciado
¿Cuál afirmación sobre las rectas tangentes a la gráfica de $s$ (velocidad instantánea) es correcta?

### Opciones
- [ ] A) En $t=2$ la velocidad es 2 km/h, porque $s(2)=2$
  <!-- feedback: Incorrecto. $s(2)=2$ es la posición; la velocidad es $s'(2)=12-24+9=-3$ km/h. -->
- [x] B) Las tangentes son horizontales en $t=1$ y $t=3$, y entre esos instantes la pendiente es negativa, por ejemplo $s'(2)=-3$
  <!-- feedback: Correcto. $s'(t)=3(t-1)(t-3)$ se anula en 1 y 3 y es negativa entre ellos. -->
- [ ] C) Las tangentes son horizontales en $t=0$ y $t=3$, porque $s(0)=s(3)=0$
  <!-- feedback: Incorrecto. Confundió $s=0$ con $s'=0$: $s'(0)=9\neq 0$. -->
- [ ] D) La pendiente es positiva en todo $[0,4]$ porque $s(t)\ge 0$ allí
  <!-- feedback: Incorrecto. Que la posición sea no negativa no implica que crezca: $s'(2)=-3<0$. -->

### Explicacion Pedagogica
$s'(t)=3t^2-12t+9=3(t-1)(t-3)$. Las tangentes son horizontales (velocidad cero) en $t=1$ y $t=3$. En $t=2$, $s'(2)=-3$: el ciclista regresa hacia el paradero aunque su posición $s(2)=2$ sea positiva.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W14-pendiente-tangente-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** En un concurso de matemáticas en Sincelejo se pide encontrar las tangentes a $f(x)=x^3-3x$ que pasan por el origen; varios equipos dan respuestas distintas.

### Enunciado
¿Cuál respuesta sobre las rectas tangentes a $f(x) = x^3 - 3x$ que pasan por el origen está bien justificada?

### Opciones
- [ ] A) También sirven $x=\pm 1$, porque $f'(\pm 1)=0$
  <!-- feedback: Incorrecto. En $x=1$ la tangente es $y=-2$ y en $x=-1$ es $y=2$; ninguna pasa por $(0,0)$. -->
- [ ] B) También sirven $x=\pm\sqrt{3}$, porque $f(\pm\sqrt{3})=0$
  <!-- feedback: Incorrecto. En $x=\sqrt{3}$ la tangente es $y=6(x-\sqrt{3})$, que en $x=0$ vale $-6\sqrt{3}\neq 0$. -->
- [ ] C) Ninguna tangente pasa por el origen
  <!-- feedback: Incorrecto. La curva pasa por $(0,0)$, y su tangente allí, $y=f'(0)x=-3x$, contiene el origen. -->
- [x] D) Solo hay una: $y=-3x$, porque la tangente en $x=a$ pasa por el origen solo si $-2a^3=0$, es decir $a=0$
  <!-- feedback: Correcto. La tangente en $a$ corta el eje $y$ en $f(a)-af'(a)=a^3-3a-3a^3+3a=-2a^3$, nulo solo si $a=0$. -->

### Explicacion Pedagogica
La tangente en $x=a$ es $y=f(a)+f'(a)(x-a)$. Con $x=0$: $y=(a^3-3a)-a(3a^2-3)=-2a^3$. Pasa por el origen si y solo si $-2a^3=0$, es decir $a=0$, y la tangente es $y=-3x$.
