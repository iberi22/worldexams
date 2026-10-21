---
id: "CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "repaso-p2"
periodo: "weekly"
week: "W20"
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

# Bundle MASTERY: Repaso Periodo 2 (Derivadas y Aplicaciones) - Grado 11

Este bundle repasa el concepto de derivada, las reglas de derivación, rectas tangentes, extremos, criterios de primera y segunda derivada, optimización y razones de cambio relacionadas.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** Un bus de TransMilenio en Bogotá registra su posición $f(t)$ y el equipo técnico quiere su velocidad exacta en el instante $t=a$.

### Enunciado
¿Cuál de las siguientes expresiones define la derivada $f'(a)$, es decir, la velocidad instantánea del bus en $t=a$?

### Opciones
- [x] A) $\lim_{h \to 0} \frac{f(a+h)-f(a)}{h}$
  <!-- feedback: Correcto. La derivada es el límite del cociente de diferencias cuando el intervalo $h$ tiende a cero; ese límite corresponde a la velocidad instantánea. -->
- [ ] B) $\frac{f(a+h)-f(a)}{h}$
  <!-- feedback: Incorrecto. Sin el límite este cociente es solo la velocidad media en el intervalo $[a, a+h]$, no la velocidad en el instante $a$. -->
- [ ] C) $\lim_{h \to 0} \frac{f(a+h)+f(a)}{h}$
  <!-- feedback: Incorrecto. El numerador debe ser una diferencia de posiciones; al sumar $f(a+h)+f(a)$ no se mide ningún cambio y el límite en general no existe. -->
- [ ] D) $\lim_{h \to 0} \frac{f(h)-f(a)}{h}$
  <!-- feedback: Incorrecto. Se confundió $f(a+h)$ con $f(h)$: así se compara la posición en $t=h$ con la de $t=a$, que no es un cambio pequeño alrededor de $a$. -->

### Explicacion Pedagogica
La velocidad media entre $a$ y $a+h$ es $\frac{f(a+h)-f(a)}{h}$. Al hacer $h \to 0$ el intervalo se reduce al instante $a$, y el límite $f'(a)=\lim_{h \to 0} \frac{f(a+h)-f(a)}{h}$ es la velocidad instantánea. Sin el límite solo se obtiene una velocidad media.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.84
**Contexto:** En Tunja una estación meteorológica modela la temperatura $T(t)$ en °C, con $t$ en horas después de las 6:00 p. m.

### Enunciado
Se sabe que $T'(3) = -2$. ¿Cuál es la interpretación correcta de este dato?

### Opciones
- [ ] A) A las 9:00 p. m. la temperatura es de $-2$ °C.
  <!-- feedback: Incorrecto. Se confundió el valor de la derivada con el valor de la función: $T'(3)$ es una razón de cambio en °C por hora, no la temperatura $T(3)$. -->
- [ ] B) Durante las primeras 3 horas la temperatura bajó en total 2 °C.
  <!-- feedback: Incorrecto. Eso describe un cambio acumulado $T(3)-T(0)$; la derivada en $t=3$ es una tasa instantánea en ese momento, no un cambio total. -->
- [ ] C) Después de las 9:00 p. m. la temperatura siempre va a disminuir.
  <!-- feedback: Incorrecto. Una derivada en un solo punto no dice nada sobre el comportamiento en todo el intervalo $t>3$; la tasa podría cambiar de signo después. -->
- [x] D) A las 9:00 p. m. la temperatura está bajando a razón de aproximadamente 2 °C por hora.
  <!-- feedback: Correcto. $T'(3)=-2$ significa que en $t=3$ (9:00 p. m.) la tasa instantánea es $-2$ °C/h: la temperatura disminuye cerca de 2 grados por hora en ese instante. -->

### Explicacion Pedagogica
La derivada $T'(3)$ tiene unidades de °C por hora y mide la rapidez del cambio en el instante $t=3$, es decir, a las 9:00 p. m. El signo negativo indica que la temperatura está disminuyendo y el valor 2 indica que lo hace a unos 2 °C por hora en ese momento. No informa la temperatura misma ni el cambio total.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.82
**Contexto:** Una fábrica de bocadillos en Vélez (Santander) modela su costo en miles de COP como $C(x)=4x^3-5x+7$, con $x$ en cientos de cajas.

### Enunciado
¿Cuál es la función de costo marginal $C'(x)$?

### Opciones
- [ ] A) $12x^2-5x$
  <!-- feedback: Incorrecto. Al derivar $-5x$ se obtiene $-5$, no $-5x$: se olvidó reducir el exponente de $x^1$ a $x^0$. -->
- [ ] B) $4x^2-5$
  <!-- feedback: Incorrecto. Se bajó el exponente pero no se multiplicó por él: la regla de la potencia da $\frac{d}{dx}4x^3 = 4 \cdot 3x^2 = 12x^2$. -->
- [ ] C) $12x^3-5$
  <!-- feedback: Incorrecto. Se multiplicó por el exponente pero no se redujo: $\frac{d}{dx}x^3 = 3x^2$, así que el término es $12x^2$, no $12x^3$. -->
- [x] D) $12x^2-5$
  <!-- feedback: Correcto. Por la regla de la potencia $4x^3 \to 12x^2$, $-5x \to -5$ y la constante $7 \to 0$, luego $C'(x)=12x^2-5$. -->

### Explicacion Pedagogica
Se deriva término a término con la regla de la potencia $\frac{d}{dx}x^n = nx^{n-1}$: $\frac{d}{dx}(4x^3)=12x^2$, $\frac{d}{dx}(-5x)=-5$ y la derivada de la constante 7 es 0. Por tanto $C'(x)=12x^2-5$, que mide el costo adicional aproximado por cada cien cajas más.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.80
**Contexto:** En una planta de concreto de Barranquilla el volumen de una mezcla se modela con $g(x)=(2x+1)^3$, donde $x$ es la cantidad de agua en litros.

### Enunciado
¿Cuál es la derivada $g'(x)$?

### Opciones
- [ ] A) $3(2x+1)^2$
  <!-- feedback: Incorrecto. Se aplicó la regla de la potencia sin la regla de la cadena: falta multiplicar por la derivada interna $\frac{d}{dx}(2x+1)=2$. -->
- [ ] B) $6(2x+1)^3$
  <!-- feedback: Incorrecto. Se multiplicó por 3 y por 2 pero no se redujo el exponente: el resultado debe tener $(2x+1)^2$, no $(2x+1)^3$. -->
- [x] C) $6(2x+1)^2$
  <!-- feedback: Correcto. Por la regla de la cadena $g'(x)=3(2x+1)^2 \cdot 2 = 6(2x+1)^2$. -->
- [ ] D) $3(2x+1)^2 \cdot 2x$
  <!-- feedback: Incorrecto. La derivada interna de $2x+1$ es $2$, no $2x$; se confundió la función interna con su derivada. -->

### Explicacion Pedagogica
La función es una composición: exterior $u^3$ e interior $u=2x+1$. Por la regla de la cadena $g'(x)=3u^2 \cdot u' = 3(2x+1)^2 \cdot 2 = 6(2x+1)^2$. Olvidar el factor 2 de la derivada interna es el error más común.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Geometrico
**Expected_Success:** 0.76
**Contexto:** Un ingeniero de Manizales diseña el perfil de una rampa con la curva $y=x^2-3x+1$ (metros) y necesita la recta que la toca en $x=2$.

### Enunciado
¿Cuál es la ecuación de la recta tangente a $y=x^2-3x+1$ en el punto de abscisa $x=2$?

### Opciones
- [x] A) $y=x-3$
  <!-- feedback: Correcto. Con $y(2)=-1$ y pendiente $y'(2)=2(2)-3=1$, la recta es $y+1=1(x-2)$, es decir, $y=x-3$. -->
- [ ] B) $y=x-1$
  <!-- feedback: Incorrecto. La pendiente 1 es correcta, pero se usó $y(2)=1$ en lugar de $y(2)=4-6+1=-1$: el punto de tangencia está mal calculado. -->
- [ ] C) $y=-x+1$
  <!-- feedback: Incorrecto. La pendiente $-1$ sale de derivar con el signo cambiado ($3-2x$); la derivada correcta es $2x-3$, que en $x=2$ vale $1$. -->
- [ ] D) $y=4x-9$
  <!-- feedback: Incorrecto. Se tomó la pendiente $2x=4$ olvidando el término $-3$ de la derivada; la pendiente real es $2(2)-3=1$. -->

### Explicacion Pedagogica
Punto: $y(2)=2^2-3(2)+1=-1$. Pendiente: $y'=2x-3$, luego $y'(2)=1$. Forma punto-pendiente: $y-(-1)=1(x-2)$, de donde $y=x-3$. Se comprueba que pasa por $(2,-1)$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.74
**Contexto:** En un laboratorio de la Universidad de Antioquia la biomasa de un cultivo se modela con $h(t)=t^2e^t$ (gramos, $t$ en días).

### Enunciado
¿Cuál es la tasa de crecimiento instantánea $h'(1)$?

### Opciones
- [ ] A) $2e$
  <!-- feedback: Incorrecto. Se multiplicaron las derivadas de cada factor, $2t \cdot e^t$; la regla del producto es $(uv)'=u'v+uv'$, no $u'v'$. -->
- [x] B) $3e$
  <!-- feedback: Correcto. $h'(t)=2te^t+t^2e^t=e^t(t^2+2t)$, y en $t=1$ da $e(1+2)=3e$. -->
- [ ] C) $e$
  <!-- feedback: Incorrecto. Ese es el valor de la biomasa $h(1)=1^2e^1$, no de su derivada: se evaluó la función en lugar de la tasa. -->
- [ ] D) $e+2$
  <!-- feedback: Incorrecto. Se derivó cada factor y se sumaron ($2t+e^t$), lo cual no corresponde a la regla del producto $u'v+uv'$. -->

### Explicacion Pedagogica
Con $u=t^2$ y $v=e^t$: $h'(t)=u'v+uv'=2te^t+t^2e^t=e^t(t^2+2t)$. Evaluando en $t=1$: $h'(1)=e(1+2)=3e \approx 8{,}15$ gramos por día.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** La altura (en metros) de un dron que inspecciona un puente en Honda se modela con $f(x)=x^3-12x+5$.

### Enunciado
¿En qué valores de $x$ la función $f$ tiene puntos críticos?

### Opciones
- [ ] A) Solo en $x=0$
  <!-- feedback: Incorrecto. En $x=0$ la derivada vale $f'(0)=-12 \neq 0$; se confundió el punto crítico con el lugar donde se anula $x$. -->
- [ ] B) Solo en $x=4$
  <!-- feedback: Incorrecto. Se resolvió $3x^2=12$ como $x=4$ sin sacar raíz: $x^2=4$ implica $x=\pm 2$. -->
- [x] C) En $x=-2$ y $x=2$
  <!-- feedback: Correcto. $f'(x)=3x^2-12=0$ equivale a $x^2=4$, luego $x=-2$ o $x=2$. -->
- [ ] D) Solo en $x=2$
  <!-- feedback: Incorrecto. Se ignoró la raíz negativa: $x^2=4$ tiene dos soluciones, $2$ y $-2$. -->

### Explicacion Pedagogica
Los puntos críticos son donde $f'(x)=0$ (o no existe). $f'(x)=3x^2-12=3(x^2-4)=3(x-2)(x+2)$, que se anula en $x=-2$ y $x=2$. Como $f'$ es un polinomio, no hay puntos donde no exista.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.70
**Contexto:** Una cooperativa cafetera de Pitalito estudia la fracción de café exportado $q(x)=\frac{x}{x+1}$, con $x$ en miles de sacos.

### Enunciado
¿Cuál es la derivada $q'(x)$?

### Opciones
- [x] A) $\frac{1}{(x+1)^2}$
  <!-- feedback: Correcto. Por la regla del cociente $q'=\frac{1\cdot(x+1)-x\cdot 1}{(x+1)^2}=\frac{1}{(x+1)^2}$. -->
- [ ] B) $\frac{-1}{(x+1)^2}$
  <!-- feedback: Incorrecto. Se invirtió el orden del numerador ($x\cdot1-1\cdot(x+1)$); la regla es $\frac{u'v-uv'}{v^2}$, y el signo resultante es positivo. -->
- [ ] C) $1$
  <!-- feedback: Incorrecto. Se dividieron las derivadas $\frac{1}{1}$; la derivada de un cociente no es el cociente de las derivadas. -->
- [ ] D) $\frac{2x+1}{(x+1)^2}$
  <!-- feedback: Incorrecto. Se sumaron los términos del numerador ($u'v+uv'$) en lugar de restarlos, como exige la regla del cociente. -->

### Explicacion Pedagogica
Con $u=x$, $v=x+1$, $u'=1$, $v'=1$: $q'(x)=\frac{u'v-uv'}{v^2}=\frac{(x+1)-x}{(x+1)^2}=\frac{1}{(x+1)^2}$. Es siempre positiva, así que la fracción exportada crece con $x$.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.68
**Contexto:** Un analista de la Bolsa de Valores de Colombia estudia el precio de una acción $f$ y solo conoce su derivada $f'(x)=(x-1)(x-4)^2$.

### Enunciado
Según el criterio de la primera derivada, ¿qué se concluye sobre $x=1$ y $x=4$?

### Opciones
- [ ] A) Hay un máximo local en $x=1$ y un mínimo local en $x=4$.
  <!-- feedback: Incorrecto. En $x=1$ la derivada pasa de negativa a positiva, lo que indica mínimo y no máximo; además en $x=4$ no hay cambio de signo. -->
- [ ] B) Hay mínimos locales en $x=1$ y en $x=4$.
  <!-- feedback: Incorrecto. En $x=4$ el factor $(x-4)^2$ es no negativo, así que $f'$ es positiva a ambos lados y no hay extremo allí. -->
- [ ] C) Hay un mínimo local en $x=1$ y un máximo local en $x=4$.
  <!-- feedback: Incorrecto. Un máximo exige que $f'$ pase de positiva a negativa; cerca de $x=4$ la derivada es positiva antes y después. -->
- [x] D) Hay un mínimo local en $x=1$; en $x=4$ no hay extremo.
  <!-- feedback: Correcto. $f'$ pasa de negativa a positiva en $x=1$ (mínimo) y conserva el signo positivo alrededor de $x=4$ porque $(x-4)^2 \ge 0$. -->

### Explicacion Pedagogica
Signos de $f'$: para $x<1$, $(x-1)<0$ y $(x-4)^2>0$, luego $f'<0$; entre 1 y 4, $f'>0$; para $x>4$, $f'>0$. En $x=1$ cambia de $-$ a $+$: mínimo local. En $x=4$ no cambia de signo (raíz doble): no hay extremo, la función sigue creciendo.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.66
**Contexto:** La producción de una finca de aguacate Hass en el Tolima se modela con $f(x)=x^3-6x^2+9x+2$ (toneladas, $x$ en años).

### Enunciado
Usando el criterio de la segunda derivada, ¿cómo se clasifican los puntos críticos de $f$?

### Opciones
- [ ] A) Mínimo local en $x=1$ y máximo local en $x=3$.
  <!-- feedback: Incorrecto. Se invirtió la regla: $f''(1)=-6<0$ indica concavidad hacia abajo, es decir, máximo, no mínimo. -->
- [x] B) Máximo local en $x=1$ y mínimo local en $x=3$.
  <!-- feedback: Correcto. $f''(x)=6x-12$; $f''(1)=-6<0$ da máximo y $f''(3)=6>0$ da mínimo. -->
- [ ] C) Máximos locales en $x=1$ y en $x=3$.
  <!-- feedback: Incorrecto. En $x=3$ la segunda derivada es $f''(3)=6>0$, que corresponde a concavidad hacia arriba y por tanto a un mínimo. -->
- [ ] D) El criterio no decide en ninguno de los dos puntos.
  <!-- feedback: Incorrecto. El criterio solo es inconcluso si $f''=0$; aquí $f''(1)=-6$ y $f''(3)=6$ son distintos de cero. -->

### Explicacion Pedagogica
$f'(x)=3x^2-12x+9=3(x-1)(x-3)$, con puntos críticos $x=1$ y $x=3$. $f''(x)=6x-12$: $f''(1)=-6<0$ (cóncava hacia abajo, máximo local, $f(1)=6$) y $f''(3)=6>0$ (cóncava hacia arriba, mínimo local, $f(3)=2$).

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.62
**Contexto:** Al lanzar una piedra al Lago de Tota se forma una onda circular cuyo radio crece a 3 cm/s.

### Enunciado
¿Con qué rapidez aumenta el área del círculo en el instante en que el radio mide 10 cm?

### Opciones
- [ ] A) $30\pi$ cm²/s
  <!-- feedback: Incorrecto. Se usó $\frac{dA}{dt}=\pi r \frac{dr}{dt}$ olvidando el factor 2 que aparece al derivar $r^2$. -->
- [ ] B) $100\pi$ cm²/s
  <!-- feedback: Incorrecto. Ese es el área $A=\pi(10)^2$ en ese instante, no su rapidez de cambio. -->
- [ ] C) $6\pi$ cm²/s
  <!-- feedback: Incorrecto. Se calculó $2\pi \cdot 3$ omitiendo el radio: la fórmula $\frac{dA}{dt}=2\pi r\frac{dr}{dt}$ exige multiplicar también por $r=10$. -->
- [x] D) $60\pi$ cm²/s
  <!-- feedback: Correcto. $\frac{dA}{dt}=2\pi r \frac{dr}{dt}=2\pi(10)(3)=60\pi$ cm²/s. -->

### Explicacion Pedagogica
$A=\pi r^2$. Derivando respecto al tiempo con la regla de la cadena: $\frac{dA}{dt}=2\pi r\frac{dr}{dt}$. Con $r=10$ y $\frac{dr}{dt}=3$: $\frac{dA}{dt}=60\pi \approx 188{,}5$ cm²/s. El área crece cada vez más rápido aunque el radio crezca a ritmo constante.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.60
**Contexto:** Un campesino de Boyacá tiene 120 m de malla para cercar un potrero rectangular junto al río Chicamocha; el lado del río no se cerca.

### Enunciado
Si $x$ es cada lado perpendicular al río, ¿cuál es el área máxima que puede cercar?

### Opciones
- [ ] A) $900$ m²
  <!-- feedback: Incorrecto. Se cercaron los cuatro lados como un cuadrado de 30 m; el río ahorra un lado, así que el área puede ser mayor. -->
- [ ] B) $3600$ m²
  <!-- feedback: Incorrecto. Un cuadrado de $60 \times 60$ necesitaría 180 m de malla en tres lados, más de los 120 m disponibles. -->
- [x] C) $1800$ m²
  <!-- feedback: Correcto. $A(x)=x(120-2x)$; $A'(x)=120-4x=0$ da $x=30$, el lado paralelo mide 60 y $A=1800$ m². -->
- [ ] D) $1600$ m²
  <!-- feedback: Incorrecto. Se repartió la malla en tres lados iguales de 40 m; ese reparto no maximiza $A(x)=x(120-2x)$, cuyo máximo está en $x=30$. -->

### Explicacion Pedagogica
Restricción: $2x+y=120$, luego $y=120-2x$. Área: $A(x)=120x-2x^2$. $A'(x)=120-4x=0 \Rightarrow x=30$, y $A''=-4<0$ confirma máximo. Entonces $y=60$ y $A=30 \cdot 60=1800$ m².

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.58
**Contexto:** En una clase de cálculo en Bucaramanga se analiza el perfil de un tanque descrito por $f(x)=x^4$.

### Enunciado
Un estudiante afirma: "Como $f'(0)=0$ y $f''(0)=0$, la función no tiene extremo en $x=0$". ¿Cuál es la evaluación correcta?

### Opciones
- [x] A) Es falso: con $f''(0)=0$ el criterio no decide, y como $f'(x)=4x^3$ pasa de negativa a positiva, hay un mínimo en $x=0$.
  <!-- feedback: Correcto. Cuando $f''=0$ el criterio de la segunda derivada es inconcluso; el de la primera derivada muestra el cambio de signo de $-$ a $+$, que define un mínimo. -->
- [ ] B) Es verdadero: si $f''(0)=0$ el punto es de inflexión.
  <!-- feedback: Incorrecto. $f''(0)=0$ no garantiza inflexión; $f''(x)=12x^2 \ge 0$ no cambia de signo, así que la concavidad no cambia en 0. -->
- [ ] C) Es falso: hay un máximo, porque $f''(0)=0 \le 0$.
  <!-- feedback: Incorrecto. Un máximo por el criterio de la segunda derivada exige $f''<0$ estricto; además $f(x)=x^4 \ge 0=f(0)$ muestra que es un mínimo. -->
- [ ] D) Es falso: el punto crítico no está en $x=0$ sino en $x=4$.
  <!-- feedback: Incorrecto. $f'(x)=4x^3$ se anula solo en $x=0$; el 4 es el coeficiente de la derivada, no una raíz. -->

### Explicacion Pedagogica
$f'(x)=4x^3=0$ solo en $x=0$, y $f''(x)=12x^2$ vale 0 allí, así que el criterio de la segunda derivada no permite concluir. Con la primera derivada: $f'<0$ para $x<0$ y $f'>0$ para $x>0$, luego hay un mínimo local (y absoluto) en $x=0$. El razonamiento del estudiante confunde "criterio inconcluso" con "no hay extremo".

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.56
**Contexto:** El trazado de una vía en Santander se modela con $f(x)=x^3-3x^2+4$ y los ingenieros buscan dónde cambia la curvatura.

### Enunciado
¿Cuál es el punto de inflexión de la gráfica de $f$?

### Opciones
- [ ] A) $(0,4)$
  <!-- feedback: Incorrecto. En $x=0$ se anula $f'$ (punto crítico, máximo local), pero $f''(0)=-6 \neq 0$: no cambia la concavidad allí. -->
- [ ] B) $(2,0)$
  <!-- feedback: Incorrecto. $x=2$ es el otro punto crítico (mínimo local); $f''(2)=6>0$, así que tampoco es inflexión. -->
- [x] C) $(1,2)$
  <!-- feedback: Correcto. $f''(x)=6x-6$ se anula y cambia de signo en $x=1$, y $f(1)=1-3+4=2$. -->
- [ ] D) $(1,-3)$
  <!-- feedback: Incorrecto. La abscisa es correcta, pero $-3$ es $f'(1)$; la ordenada del punto debe ser $f(1)=2$. -->

### Explicacion Pedagogica
$f'(x)=3x^2-6x$ y $f''(x)=6x-6$. $f''=0$ en $x=1$; para $x<1$, $f''<0$ (cóncava abajo) y para $x>1$, $f''>0$ (cóncava arriba). Como cambia de signo, hay inflexión en $(1, f(1))=(1,2)$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Geometrico
**Expected_Success:** 0.54
**Contexto:** Un diseñador de Cartagena traza un arco con $y=x^2+1$ y quiere que una viga lo toque siendo paralela a la recta $y=4x-7$.

### Enunciado
¿Cuál es la ecuación de la recta tangente a $y=x^2+1$ que es paralela a $y=4x-7$?

### Opciones
- [ ] A) $y=4x-7$
  <!-- feedback: Incorrecto. Esa es la recta dada; no toca la parábola en un solo punto, porque $x^2+1=4x-7$ no tiene soluciones reales. -->
- [x] B) $y=4x-3$
  <!-- feedback: Correcto. Paralela implica pendiente 4: $2x=4$ da $x=2$, punto $(2,5)$, y $y-5=4(x-2)$ equivale a $y=4x-3$. -->
- [ ] C) $y=4x+1$
  <!-- feedback: Incorrecto. Se confundió la pendiente con la abscisa y se usó el punto $x=4$; ahí la pendiente es $2(4)=8$, no 4. -->
- [ ] D) $y=4x+13$
  <!-- feedback: Incorrecto. Error de signo en la forma punto-pendiente: se escribió $y-5=4(x+2)$ en lugar de $y-5=4(x-2)$. -->

### Explicacion Pedagogica
Rectas paralelas tienen igual pendiente, así que se busca $y'=2x=4$, es decir, $x=2$ y $y=2^2+1=5$. La tangente es $y-5=4(x-2)$, o sea, $y=4x-3$. Comprobación: $x^2+1=4x-3$ da $(x-2)^2=0$, un único punto de contacto.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.52
**Contexto:** En una obra de Cali una escalera de 5 m está apoyada contra un muro y su base se aleja del muro a 0,6 m/s.

### Enunciado
¿Con qué rapidez baja el extremo superior de la escalera cuando la base está a 3 m del muro?

### Opciones
- [ ] A) $0{,}6$ m/s
  <!-- feedback: Incorrecto. Se supuso que ambos extremos se mueven igual de rápido; la relación $x^2+y^2=25$ hace que las rapideces dependan de la posición. -->
- [x] B) $0{,}45$ m/s
  <!-- feedback: Correcto. De $x x'+y y'=0$ con $x=3$, $y=4$: $y'=-\frac{3(0{,}6)}{4}=-0{,}45$, así que baja a 0,45 m/s. -->
- [ ] C) $0{,}8$ m/s
  <!-- feedback: Incorrecto. Se invirtieron $x$ e $y$: se calculó $\frac{4(0{,}6)}{3}$ en lugar de $\frac{3(0{,}6)}{4}$. -->
- [ ] D) $0{,}36$ m/s
  <!-- feedback: Incorrecto. Se dividió entre la longitud de la escalera ($\frac{3 \cdot 0{,}6}{5}$) en lugar de dividir entre la altura $y=4$. -->

### Explicacion Pedagogica
Con $x$ la distancia de la base y $y$ la altura: $x^2+y^2=25$. Derivando: $2x x'+2y y'=0$. Cuando $x=3$, $y=\sqrt{25-9}=4$, y $y'=-\frac{x x'}{y}=-\frac{3 \cdot 0{,}6}{4}=-0{,}45$ m/s. El signo negativo indica que la altura disminuye.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Una microempresa de Itagüí fabrica cajas sin tapa recortando cuadrados de lado $x$ cm en las esquinas de láminas de cartón de 30 cm x 30 cm.

### Enunciado
El volumen es $V(x)=x(30-2x)^2$. Un empleado dice: "Como $V'(15)=0$, con $x=15$ se obtiene la caja de mayor volumen". ¿Cuál evaluación es correcta?

### Opciones
- [x] A) Es incorrecto: $V(15)=0$ es el mínimo; el máximo ocurre en $x=5$ con $V=2000$ cm³.
  <!-- feedback: Correcto. $V'(x)=(30-2x)(30-6x)$ se anula en $x=5$ y $x=15$; $V(5)=2000$ y $V(15)=0$, así que el máximo está en $x=5$. -->
- [ ] B) Es correcto: todo punto donde $V'=0$ es un máximo.
  <!-- feedback: Incorrecto. $V'=0$ solo indica punto crítico; puede ser mínimo, y en $x=15$ la caja no tiene base, $V(15)=0$. -->
- [ ] C) Es incorrecto: el máximo ocurre en $x=7{,}5$, la mitad de 15.
  <!-- feedback: Incorrecto. $x=7{,}5$ no anula $V'$: $V'(7{,}5)=15 \cdot (-15)<0$, así que en ese punto el volumen ya está disminuyendo. -->
- [ ] D) Es incorrecto: el máximo ocurre en $x=10$ con $V=1000$ cm³.
  <!-- feedback: Incorrecto. $V(10)=10 \cdot 10^2=1000$ es menor que $V(5)=2000$; además $V'(10)\neq 0$, así que $x=10$ no es crítico. -->

### Explicacion Pedagogica
$V(x)=x(30-2x)^2$ en $0<x<15$. $V'(x)=(30-2x)^2-4x(30-2x)=(30-2x)(30-6x)$, que se anula en $x=5$ y $x=15$. En $x=15$ la base desaparece y $V=0$ (mínimo en el borde). En $x=5$: $V=5 \cdot 20^2=2000$ cm³, que es el máximo. El empleado olvidó verificar el tipo de punto crítico.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** El costo de transporte de flores desde Rionegro se modela con una función $f$ derivable dos veces, de la que se sabe $f'(2)=0$ y $f''(2)=-3$.

### Enunciado
¿Cuál de las siguientes conclusiones es válida con esa información?

### Opciones
- [ ] A) $f$ alcanza su valor máximo absoluto en $x=2$.
  <!-- feedback: Incorrecto. El criterio de la segunda derivada es local: no descarta que $f$ tome valores mayores lejos de $x=2$. -->
- [ ] B) $f$ es decreciente a ambos lados de $x=2$.
  <!-- feedback: Incorrecto. Si $f$ decreciera a ambos lados no habría extremo; con $f''(2)<0$, $f$ crece a la izquierda y decrece a la derecha de 2. -->
- [x] C) $f$ tiene un máximo local en $x=2$.
  <!-- feedback: Correcto. $f'(2)=0$ y $f''(2)<0$ es exactamente la condición del criterio de la segunda derivada para un máximo local. -->
- [ ] D) $f$ tiene un punto de inflexión en $x=2$.
  <!-- feedback: Incorrecto. Un punto de inflexión requiere que $f''$ cambie de signo, lo que exige $f''=0$; aquí $f''(2)=-3 \neq 0$. -->

### Explicacion Pedagogica
El criterio de la segunda derivada dice: si $f'(c)=0$ y $f''(c)<0$, la gráfica es cóncava hacia abajo en $c$ y hay un máximo local. Con $c=2$ se concluye máximo local, pero no absoluto, porque la información es solo alrededor de $x=2$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.46
**Contexto:** Un tanque cónico de un acueducto veredal en Nariño tiene el vértice hacia abajo, radio superior 2 m y altura 4 m; se llena a 2 m³/min.

### Enunciado
¿Con qué rapidez sube el nivel del agua cuando la profundidad es $h=2$ m?

### Opciones
- [ ] A) $\frac{1}{2\pi}$ m/min
  <!-- feedback: Incorrecto. Se tomó el radio fijo $r=2$ como si fuera un cilindro; en el cono el radio del agua cambia con la altura, $r=\frac{h}{2}$. -->
- [ ] B) $\frac{1}{8\pi}$ m/min
  <!-- feedback: Incorrecto. Se usó la semejanza al revés, $r=2h$; por triángulos semejantes $\frac{r}{h}=\frac{2}{4}$, es decir, $r=\frac{h}{2}$. -->
- [ ] C) $\frac{6}{\pi}$ m/min
  <!-- feedback: Incorrecto. Se derivó mal $V=\frac{\pi h^3}{12}$: se escribió $\frac{\pi h^2}{12}$ y faltó el factor 3 de la regla de la potencia. -->
- [x] D) $\frac{2}{\pi}$ m/min
  <!-- feedback: Correcto. Con $V=\frac{\pi h^3}{12}$, $\frac{dV}{dt}=\frac{\pi h^2}{4}\frac{dh}{dt}$; en $h=2$: $2=\pi \frac{dh}{dt}$, luego $\frac{dh}{dt}=\frac{2}{\pi}$. -->

### Explicacion Pedagogica
Por semejanza $r=\frac{h}{2}$, así $V=\frac{1}{3}\pi r^2h=\frac{\pi h^3}{12}$. Derivando: $\frac{dV}{dt}=\frac{\pi h^2}{4}\cdot\frac{dh}{dt}$. Con $\frac{dV}{dt}=2$ y $h=2$: $2=\pi\frac{dh}{dt}$, entonces $\frac{dh}{dt}=\frac{2}{\pi} \approx 0{,}64$ m/min.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W20-repaso-p2-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.45
**Contexto:** Una fábrica de bolsos en Bogotá estima su utilidad mensual en miles de COP como $P(q)=-2q^2+240q-5000$, con $q$ unidades vendidas.

### Enunciado
La gerente propone vender 70 unidades porque "más ventas siempre dan más utilidad". ¿Cuál evaluación es correcta?

### Opciones
- [ ] A) Tiene razón, porque $P'(70)>0$ y la utilidad sigue creciendo en 70.
  <!-- feedback: Incorrecto. $P'(70)=-4(70)+240=-40<0$: en 70 la utilidad ya está disminuyendo. -->
- [x] B) No tiene razón: la utilidad máxima es $P(60)=2200$ (2.200.000 COP) y $P(70)=2000$ es menor.
  <!-- feedback: Correcto. $P'(q)=-4q+240=0$ da $q=60$, $P(60)=2200$, y $P(70)=2000<2200$, así que vender 70 reduce la utilidad. -->
- [ ] C) No tiene razón: lo óptimo es vender 120 unidades.
  <!-- feedback: Incorrecto. Se calculó $-\frac{b}{a}=120$ en lugar del vértice $-\frac{b}{2a}=60$; además $P(120)=-5000$ es una pérdida. -->
- [ ] D) No tiene razón: se deben vender 60 unidades y la utilidad máxima es 7200.
  <!-- feedback: Incorrecto. El valor $q=60$ es correcto, pero 7200 es solo el término $2q^2$ evaluado; $P(60)=-7200+14400-5000=2200$. -->

### Explicacion Pedagogica
$P'(q)=-4q+240=0 \Rightarrow q=60$ y $P''=-4<0$, máximo. $P(60)=-2(3600)+240(60)-5000=2200$ miles de COP. En $q=70$: $P(70)=-9800+16800-5000=2000$. Pasar de 60 a 70 unidades disminuye la utilidad en 200.000 COP, por eso la propuesta no es adecuada.
