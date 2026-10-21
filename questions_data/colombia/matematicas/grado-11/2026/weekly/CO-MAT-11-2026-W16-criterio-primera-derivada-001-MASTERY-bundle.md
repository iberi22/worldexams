---
id: "CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "criterio-primera-derivada"
periodo: "weekly"
week: "W16"
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

# Bundle MASTERY: Criterio de la Primera Derivada - Grado 11

Este bundle evalúa la construcción de tablas de signos de la derivada, los intervalos de crecimiento y decrecimiento y la clasificación de puntos críticos en contextos colombianos.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** Un economista de Bogotá observa que la derivada del índice de ventas de una cadena de droguerías fue positiva durante todo el primer semestre.

### Enunciado
Si $f'(x) > 0$ para todo $x$ en un intervalo $I$, ¿qué se puede afirmar de $f$ en $I$?

### Opciones
- [ ] A) $f$ es decreciente en $I$
  <!-- feedback: Incorrecto. Esa conclusión corresponde a $f'(x)<0$; con derivada positiva la función sube. -->
- [ ] B) $f$ es constante en $I$
  <!-- feedback: Incorrecto. Una función constante tiene $f'(x)=0$ en todo el intervalo, no derivada positiva. -->
- [ ] C) $f$ es cóncava hacia arriba en $I$
  <!-- feedback: Incorrecto. La concavidad depende del signo de $f''$, no del signo de $f'$. -->
- [x] D) $f$ es creciente en $I$
  <!-- feedback: Correcto. Derivada positiva significa pendientes positivas: al aumentar $x$, aumenta $f(x)$. -->

### Explicacion Pedagogica
Por el teorema del valor medio, si $a<b$ en $I$ entonces $f(b)-f(a)=f'(c)(b-a)$ para algún $c$ entre ellos; como $f'(c)>0$ y $b-a>0$, se obtiene $f(b)>f(a)$. Por eso $f'>0$ implica que $f$ es creciente.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.83
**Contexto:** Un piloto de parapente en Roldanillo (Valle) registra su altitud; justo en un instante $c$ su velocidad vertical pasa de positiva a negativa.

### Enunciado
Si $f$ es continua en $c$ y $f'$ cambia de positiva a negativa al pasar por $c$, ¿qué tiene $f$ en $c$?

### Opciones
- [ ] A) Un mínimo local
  <!-- feedback: Incorrecto. El mínimo local ocurre cuando $f'$ pasa de negativa a positiva: primero baja y luego sube. -->
- [x] B) Un máximo local
  <!-- feedback: Correcto. $f$ sube antes de $c$ y baja después, así que $f(c)$ es mayor que los valores cercanos. -->
- [ ] C) Un punto crítico que no es extremo
  <!-- feedback: Incorrecto. Eso pasa cuando $f'$ no cambia de signo; aquí sí cambia, de $+$ a $-$. -->
- [ ] D) Necesariamente un máximo absoluto
  <!-- feedback: Incorrecto. El criterio da información local; la función podría alcanzar valores mayores lejos de $c$. -->

### Explicacion Pedagogica
El criterio de la primera derivada dice: si $f'>0$ a la izquierda de $c$ y $f'<0$ a la derecha, $f$ crece hasta $c$ y luego decrece, de modo que $f(c)\ge f(x)$ para $x$ cercano a $c$. Es un máximo local; para saber si es absoluto hay que comparar con el resto del dominio.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.80
**Contexto:** El tiempo de espera en una estación de TransMilenio se modela con $f(x)=x^2-6x+2$, donde $x$ representa una variable de operación.

### Enunciado
¿En qué intervalo es decreciente $f(x) = x^2 - 6x + 2$?

### Opciones
- [ ] A) $(3, \infty)$
  <!-- feedback: Incorrecto. Para $x>3$, $f'(x)=2x-6>0$: allí la función crece. -->
- [ ] B) $(-\infty, -3)$
  <!-- feedback: Incorrecto. Error de signo al despejar: de $2x-6<0$ se obtiene $x<3$, no $x<-3$. -->
- [x] C) $(-\infty, 3)$
  <!-- feedback: Correcto. $f'(x)=2x-6<0$ exactamente cuando $x<3$. -->
- [ ] D) $(0, 6)$
  <!-- feedback: Incorrecto. En $(0,6)$ se cumple $x^2-6x<0$, que es el signo de una parte de la función, no de su derivada. -->

### Explicacion Pedagogica
Se deriva: $f'(x)=2x-6$. La función decrece donde la derivada es negativa: $2x-6<0$, es decir $x<3$. Por eso $f$ es decreciente en $(-\infty,3)$ y creciente en $(3,\infty)$, con mínimo en $x=3$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.78
**Contexto:** Un analista de una empresa de buses intermunicipales de Tolima resume en una tabla de signos el comportamiento de la derivada de su función de demanda.

### Enunciado
Se sabe que $f'(x) = (x + 1)(x - 4)$. ¿Cómo se clasifican los puntos críticos $x=-1$ y $x=4$?

### Opciones
- [ ] A) Mínimo local en $x=-1$ y máximo local en $x=4$
  <!-- feedback: Incorrecto. Invirtió la lectura: en $x=-1$ la derivada pasa de $+$ a $-$, lo que indica máximo. -->
- [x] B) Máximo local en $x=-1$ y mínimo local en $x=4$
  <!-- feedback: Correcto. $f'$ es $+$ en $(-\infty,-1)$, $-$ en $(-1,4)$ y $+$ en $(4,\infty)$. -->
- [ ] C) Ambos son mínimos locales
  <!-- feedback: Incorrecto. En $x=-1$ el signo pasa de positivo a negativo; eso es un máximo, no un mínimo. -->
- [ ] D) Máximo local en $x=1$ y mínimo local en $x=-4$
  <!-- feedback: Incorrecto. Tomó las raíces con el signo cambiado: $(x+1)(x-4)=0$ da $x=-1$ y $x=4$. -->

### Explicacion Pedagogica
Se prueban puntos: $f'(-2)=(-1)(-6)=6>0$, $f'(0)=(1)(-4)=-4<0$, $f'(5)=(6)(1)=6>0$. En $x=-1$ el signo cambia de $+$ a $-$ (máximo local) y en $x=4$ de $-$ a $+$ (mínimo local).

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.75
**Contexto:** En una fábrica de bicicletas de Duitama, la eficiencia de una línea de ensamblaje se modela con $f(x)=x^3-3x^2-9x+4$.

### Enunciado
¿En qué intervalos es creciente $f(x) = x^3 - 3x^2 - 9x + 4$?

### Opciones
- [ ] A) $(-1, 3)$
  <!-- feedback: Incorrecto. En $(-1,3)$ la derivada es negativa, por ejemplo $f'(0)=-9$: allí $f$ decrece. -->
- [ ] B) $(-\infty, -3) \cup (1, \infty)$
  <!-- feedback: Incorrecto. Factorizó con signos cambiados; las raíces de $3x^2-6x-9$ son $3$ y $-1$. -->
- [ ] C) $(1, \infty)$
  <!-- feedback: Incorrecto. Usó $f''(x)=6x-6>0$, que describe la concavidad, no el crecimiento. -->
- [x] D) $(-\infty, -1) \cup (3, \infty)$
  <!-- feedback: Correcto. $f'(x)=3(x-3)(x+1)$ es positiva fuera del intervalo $[-1,3]$. -->

### Explicacion Pedagogica
$f'(x)=3x^2-6x-9=3(x^2-2x-3)=3(x-3)(x+1)$. Signos: $f'(-2)=15>0$, $f'(0)=-9<0$, $f'(4)=15>0$. Por tanto $f$ crece en $(-\infty,-1)$ y en $(3,\infty)$, y decrece en $(-1,3)$.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.73
**Contexto:** Un grupo de física de la Universidad Industrial de Santander estudia el potencial de una partícula con el modelo $f(x)=x^4-8x^2$.

### Enunciado
Usando el criterio de la primera derivada, ¿cómo se clasifican los puntos críticos de $f(x) = x^4 - 8x^2$?

### Opciones
- [ ] A) Máximos locales en $x=\pm 2$ y mínimo local en $x=0$
  <!-- feedback: Incorrecto. Invirtió la tabla: en $x=-2$ la derivada pasa de $-$ a $+$, lo que indica mínimo. -->
- [x] B) Mínimos locales en $x=\pm 2$ y máximo local en $x=0$
  <!-- feedback: Correcto. $f'(x)=4x(x-2)(x+2)$ tiene signos $-,+,-,+$ en los cuatro intervalos. -->
- [ ] C) Solo hay un mínimo local, en $x=2$
  <!-- feedback: Incorrecto. Olvidó los críticos $x=0$ y $x=-2$, que también anulan $4x(x^2-4)$. -->
- [ ] D) Ninguno es extremo, porque $f$ es par
  <!-- feedback: Incorrecto. La simetría no impide extremos; la derivada sí cambia de signo en los tres críticos. -->

### Explicacion Pedagogica
$f'(x)=4x^3-16x=4x(x-2)(x+2)$, con críticos $-2, 0, 2$. Pruebas: $f'(-3)=-60<0$, $f'(-1)=12>0$, $f'(1)=-12<0$, $f'(3)=60>0$. Así, $-$ a $+$ en $\pm 2$ (mínimos, $f=-16$) y $+$ a $-$ en 0 (máximo, $f=0$).

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.71
**Contexto:** El volumen de agua en un tanque de una planta de tratamiento en Soacha se modela con $V(x)=(x-1)^3+2$ respecto a una variable de control.

### Enunciado
Para $f(x) = (x - 1)^3 + 2$, ¿qué ocurre en el punto crítico $x = 1$?

### Opciones
- [ ] A) Es un mínimo local, porque $f'(1)=0$
  <!-- feedback: Incorrecto. $f'(1)=0$ no basta: a la izquierda de 1 la derivada es positiva, no negativa. -->
- [ ] B) Es un máximo local, porque la gráfica se aplana
  <!-- feedback: Incorrecto. El aplanamiento no implica máximo; $f(1.1)=2.001>f(1)=2$. -->
- [x] C) Es un punto crítico que no es extremo: $f$ es creciente en todo $\mathbb{R}$
  <!-- feedback: Correcto. $f'(x)=3(x-1)^2\ge 0$ y no cambia de signo al pasar por $x=1$. -->
- [ ] D) No es punto crítico, porque $f$ es creciente
  <!-- feedback: Incorrecto. Una función creciente puede tener $f'=0$ en un punto; aquí $f'(1)=3\cdot 0^2=0$. -->

### Explicacion Pedagogica
$f'(x)=3(x-1)^2$ se anula solo en $x=1$, que es crítico. Pero $f'(0)=3>0$ y $f'(2)=3>0$: el signo no cambia, así que no hay máximo ni mínimo. La gráfica tiene allí una tangente horizontal y un punto de inflexión, como $x^3$ en el origen.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.69
**Contexto:** Un modelo de crecimiento de la población de chigüiros en los Llanos Orientales solo entrega la fórmula de la derivada de la función de población.

### Enunciado
Se sabe que $f'(x) = x^2(x - 5)$. ¿Qué se concluye sobre los puntos críticos de $f$?

### Opciones
- [x] A) Hay un mínimo local en $x=5$; $x=0$ no es extremo
  <!-- feedback: Correcto. $f'<0$ en $(-\infty,0)$ y en $(0,5)$, y $f'>0$ en $(5,\infty)$. -->
- [ ] B) Hay un máximo local en $x=0$ y un mínimo local en $x=5$
  <!-- feedback: Incorrecto. El factor $x^2\ge 0$ no cambia de signo: $f'(-1)=-6$ y $f'(1)=-4$ son ambos negativos. -->
- [ ] C) Hay mínimos locales en $x=0$ y en $x=5$
  <!-- feedback: Incorrecto. Para un mínimo en 0, $f'$ debería pasar de $-$ a $+$, pero sigue negativa después de 0. -->
- [ ] D) Hay un máximo local en $x=5$
  <!-- feedback: Incorrecto. En $x=5$ la derivada pasa de negativa a positiva, lo que corresponde a un mínimo. -->

### Explicacion Pedagogica
Signos de $f'(x)=x^2(x-5)$: $f'(-1)=1\cdot(-6)<0$, $f'(1)=1\cdot(-4)<0$, $f'(6)=36\cdot 1>0$. En $x=0$ no hay cambio de signo (no hay extremo) y en $x=5$ el cambio es de $-$ a $+$: mínimo local.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.67
**Contexto:** Una tienda en línea de Medellín modela sus ventas acumuladas, en cientos de unidades, con $V(t)=-2t^3+3t^2+12t$, donde $t$ son meses y $0 \le t \le 4$.

### Enunciado
¿En qué intervalo de tiempo son crecientes las ventas acumuladas $V(t)$?

### Opciones
- [x] A) $(0, 2)$
  <!-- feedback: Correcto. $V'(t)=-6(t-2)(t+1)$ es positiva para $-1<t<2$; dentro de $[0,4]$ eso es $(0,2)$. -->
- [ ] B) $(2, 4)$
  <!-- feedback: Incorrecto. Para $t>2$ la derivada es negativa, por ejemplo $V'(3)=-24$: allí $V$ decrece. -->
- [ ] C) $(0, \frac{1}{2})$
  <!-- feedback: Incorrecto. $t=\frac{1}{2}$ resuelve $V''(t)=-12t+6=0$, que no marca el cambio de crecimiento. -->
- [ ] D) $(0, 1)$
  <!-- feedback: Incorrecto. Tomó las raíces de $V'$ con signo cambiado ($-2$ y $1$); al factorizar, $-6t^2+6t+12=-6(t-2)(t+1)$. -->

### Explicacion Pedagogica
$V'(t)=-6t^2+6t+12=-6(t^2-t-2)=-6(t-2)(t+1)$. En $[0,4]$ solo importa la raíz $t=2$: $V'(1)=12>0$ y $V'(3)=-24<0$. Las ventas crecen en $(0,2)$ y decrecen en $(2,4)$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.65
**Contexto:** Un ingeniero de una central térmica en Córdoba analiza la temperatura de una turbina con el modelo $f(x)=2x^3+3x^2-12x$.

### Enunciado
¿Cuál es el máximo local de $f(x) = 2x^3 + 3x^2 - 12x$ y dónde ocurre?

### Opciones
- [ ] A) Máximo local $-7$ en $x=1$
  <!-- feedback: Incorrecto. En $x=1$ la derivada pasa de $-$ a $+$; $f(1)=-7$ es un mínimo local. -->
- [x] B) Máximo local $20$ en $x=-2$
  <!-- feedback: Correcto. $f'(x)=6(x+2)(x-1)$ pasa de $+$ a $-$ en $x=-2$ y $f(-2)=-16+12+24=20$. -->
- [ ] C) Máximo local $4$ en $x=2$
  <!-- feedback: Incorrecto. Tomó la raíz con signo cambiado: $f'(2)=24+12-12=24\neq 0$. -->
- [ ] D) Máximo local $0$ en $x=0$
  <!-- feedback: Incorrecto. $f(0)=0$, pero $x=0$ no es crítico: $f'(0)=-12$. -->

### Explicacion Pedagogica
$f'(x)=6x^2+6x-12=6(x+2)(x-1)$. Signos: $f'(-3)=24>0$, $f'(0)=-12<0$, $f'(2)=24>0$. El cambio $+$ a $-$ ocurre en $x=-2$, máximo local con $f(-2)=20$; en $x=1$ hay un mínimo local con $f(1)=-7$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.62
**Contexto:** Un modelo de la contaminación del aire en el Valle de Aburrá entrega la derivada factorizada de la concentración de partículas respecto al tiempo.

### Enunciado
Si $f'(x) = (x - 1)^2(x + 3)(x - 4)$, ¿cuál es la clasificación correcta de los puntos críticos de $f$?

### Opciones
- [ ] A) Máximo local en $x=-3$, mínimo local en $x=1$ y máximo local en $x=4$
  <!-- feedback: Incorrecto. Supuso que los signos alternan en cada raíz; con exponente par en $(x-1)^2$ no hay cambio en $x=1$. -->
- [ ] B) Mínimo local en $x=-3$ y máximo local en $x=4$
  <!-- feedback: Incorrecto. Invirtió la lectura: $f'(-4)=200>0$ y $f'(0)=-12<0$, así que en $-3$ hay máximo. -->
- [x] C) Máximo local en $x=-3$, mínimo local en $x=4$, y $x=1$ no es extremo
  <!-- feedback: Correcto. El factor $(x-1)^2\ge 0$ no cambia de signo; $(x+3)(x-4)$ cambia en $-3$ (de $+$ a $-$) y en 4 (de $-$ a $+$). -->
- [ ] D) Máximo local en $x=-3$ y mínimos locales en $x=1$ y $x=4$
  <!-- feedback: Incorrecto. En $x=1$ la derivada es negativa a ambos lados ($f'(0)=-12$, $f'(2)=-10$), así que no hay mínimo. -->

### Explicacion Pedagogica
Pruebas: $f'(-4)=25\cdot(-1)(-8)=200>0$, $f'(0)=1\cdot 3\cdot(-4)=-12<0$, $f'(2)=1\cdot 5\cdot(-2)=-10<0$, $f'(5)=16\cdot 8\cdot 1=128>0$. Hay máximo local en $-3$, mínimo local en 4 y ningún extremo en 1.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.60
**Contexto:** Una floristería de Rionegro (Antioquia) que exporta rosas sabe que su utilidad marginal, en millones de COP por caja, es $U'(x)=60-3x$ para $x$ cajas diarias.

### Enunciado
Actualmente se producen 15 cajas diarias. Según el criterio de la primera derivada, ¿qué decisión es razonable?

### Opciones
- [x] A) Aumentar la producción, porque $U'(15)=15>0$ indica que la utilidad aún crece
  <!-- feedback: Correcto. Mientras $U'>0$, producir más eleva la utilidad; eso ocurre hasta $x=20$. -->
- [ ] B) Reducir la producción, porque $U'(15)>0$ significa que la utilidad decrece
  <!-- feedback: Incorrecto. Derivada positiva significa que la utilidad aumenta con $x$, no que disminuye. -->
- [ ] C) Mantener 15 cajas, porque allí la utilidad es máxima
  <!-- feedback: Incorrecto. En un máximo $U'$ pasa de $+$ a $-$; en 15 todavía $U'(15)=60-45=15>0$. -->
- [ ] D) Aumentar hasta 60 cajas, donde la utilidad marginal se anula
  <!-- feedback: Incorrecto. $60-3x=0$ da $x=20$, no 60; con 60 cajas $U'(60)=-120<0$ y la utilidad ya estaría bajando. -->

### Explicacion Pedagogica
$U'(15)=60-3(15)=15>0$, así que la utilidad crece al pasar de 15 a 16 cajas. $U'$ se anula en $x=20$ y pasa de positiva a negativa: la utilidad tiene su máximo en 20 cajas. Conviene aumentar la producción hasta ese valor.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.58
**Contexto:** En un preicfes de Valledupar, un estudiante construye la tabla de signos de $f(x)=x^3-12x$ para clasificar sus puntos críticos $x=\pm 2$.

### Enunciado
El estudiante usa los puntos de prueba $-3$, $0$ y $3$, calcula $f(-3)=9$, $f(0)=0$ y $f(3)=-9$, y concluye que $f$ crece en $(-\infty,-2)$ y decrece en $(2,\infty)$. ¿Cuál es su error?

### Opciones
- [ ] A) No hay error: la tabla y la conclusión son correctas
  <!-- feedback: Incorrecto. $f'(3)=27-12=15>0$, así que $f$ crece en $(2,\infty)$, al contrario de lo que concluyó. -->
- [ ] B) Los puntos críticos son $\pm\sqrt{12}$, no $\pm 2$
  <!-- feedback: Incorrecto. $\pm\sqrt{12}$ son raíces de $f$; los críticos resuelven $3x^2-12=0$, es decir $x=\pm 2$. -->
- [x] C) Evaluó $f$ en lugar de $f'$; con $f'(-3)=15$, $f'(0)=-12$ y $f'(3)=15$ hay máximo en $-2$ y mínimo en $2$
  <!-- feedback: Correcto. El crecimiento depende del signo de $f'(x)=3x^2-12$, no del signo de $f$. -->
- [ ] D) Debió usar el signo de $f''$ en los puntos de prueba
  <!-- feedback: Incorrecto. $f''$ describe la concavidad; el criterio de la primera derivada usa el signo de $f'$. -->

### Explicacion Pedagogica
$f'(x)=3x^2-12$. En la tabla se evalúa la derivada: $f'(-3)=15>0$, $f'(0)=-12<0$, $f'(3)=15>0$. Así $f$ crece en $(-\infty,-2)$, decrece en $(-2,2)$ y crece en $(2,\infty)$: máximo local en $-2$ ($f=16$) y mínimo local en $2$ ($f=-16$).

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.56
**Contexto:** Un diseñador de una pista de BMX en Bogotá quiere un perfil cúbico $f(x)=x^3+ax^2+bx$ con una cima en $x=-1$ y un valle en $x=3$.

### Enunciado
¿Qué valores de $a$ y $b$ hacen que $f(x) = x^3 + ax^2 + bx$ tenga máximo local en $x=-1$ y mínimo local en $x=3$?

### Opciones
- [ ] A) $a = 3$, $b = -9$
  <!-- feedback: Incorrecto. Error de signo: con $a=3$, $f'(x)=3x^2+6x-9=3(x+3)(x-1)$, con críticos $-3$ y $1$. -->
- [ ] B) $a = -6$, $b = -9$
  <!-- feedback: Incorrecto. Igualó $a$ al coeficiente $-6$ sin dividir entre 2: la derivada de $ax^2$ es $2ax$. -->
- [ ] C) $a = -1$, $b = -3$
  <!-- feedback: Incorrecto. Olvidó el factor 3: igualó $f'$ a $(x+1)(x-3)=x^2-2x-3$, pero el coeficiente de $x^2$ en $f'$ es 3. -->
- [x] D) $a = -3$, $b = -9$
  <!-- feedback: Correcto. $f'(x)=3x^2+2ax+b$ debe ser $3(x+1)(x-3)=3x^2-6x-9$: $2a=-6$ y $b=-9$. -->

### Explicacion Pedagogica
$f'(x)=3x^2+2ax+b$ debe anularse en $-1$ y $3$, y su coeficiente principal es 3: $f'(x)=3(x+1)(x-3)=3x^2-6x-9$. Igualando, $2a=-6$ ($a=-3$) y $b=-9$. Como $f'$ pasa de $+$ a $-$ en $-1$ y de $-$ a $+$ en $3$, la clasificación se cumple.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.54
**Contexto:** En un informe de una empresa de energía de Cundinamarca solo aparece la gráfica de $f'$, la derivada del consumo, sin la gráfica de $f$.

### Enunciado
La gráfica de $f'$ es una parábola que abre hacia abajo y corta el eje $x$ únicamente en $x=1$ y $x=5$. ¿Qué se concluye sobre $f$?

### Opciones
- [ ] A) $f$ tiene un máximo local en $x=1$ y un mínimo local en $x=5$
  <!-- feedback: Incorrecto. En $x=1$ la derivada pasa de $-$ a $+$, lo que indica mínimo, no máximo. -->
- [ ] B) $f$ tiene un máximo local en $x=3$, el vértice de la parábola
  <!-- feedback: Incorrecto. El vértice de $f'$ en $x=3$ marca donde $f$ crece más rápido, no un extremo de $f$, pues $f'(3)>0$. -->
- [ ] C) $f$ es creciente en $(-\infty,1)\cup(5,\infty)$
  <!-- feedback: Incorrecto. Allí la parábola $f'$ está bajo el eje (es negativa), así que $f$ decrece en esos intervalos. -->
- [x] D) $f$ tiene un mínimo local en $x=1$ y un máximo local en $x=5$
  <!-- feedback: Correcto. $f'$ es negativa antes de 1, positiva entre 1 y 5, y negativa después de 5. -->

### Explicacion Pedagogica
Una parábola hacia abajo con raíces 1 y 5 es positiva solo entre ellas: $f'<0$ en $(-\infty,1)$, $f'>0$ en $(1,5)$ y $f'<0$ en $(5,\infty)$. Así $f$ decrece, crece y vuelve a decrecer: mínimo local en $x=1$ y máximo local en $x=5$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.52
**Contexto:** Un estudiante de Montería quiere saber cuántas soluciones reales tiene la ecuación $x^5+x^3+x-3=0$ sin resolverla.

### Enunciado
Para $f(x) = x^5 + x^3 + x - 3$, ¿cuál razonamiento basado en la primera derivada es válido?

### Opciones
- [x] A) $f$ es creciente en $\mathbb{R}$ porque $f'(x)=5x^4+3x^2+1>0$; por eso corta el eje $x$ exactamente una vez
  <!-- feedback: Correcto. Una función estrictamente creciente no puede tomar dos veces el valor 0, y como va de $-\infty$ a $+\infty$, lo toma una vez. -->
- [ ] B) Como $f'(0)=1>0$, solo se sabe que crece cerca de 0, y podría tener tres raíces
  <!-- feedback: Incorrecto. $f'(x)\ge 1$ para todo $x$, no solo en 0: la función crece en todo $\mathbb{R}$. -->
- [ ] C) $f$ tiene un máximo local en $x=0$, porque allí la derivada es mínima
  <!-- feedback: Incorrecto. En $x=0$, $f'(0)=1\neq 0$; no es crítico, así que no puede ser extremo. -->
- [ ] D) $f$ decrece para $x<0$ porque $x^5$ es negativo allí
  <!-- feedback: Incorrecto. El signo de $f$ no determina el crecimiento; $f'(x)=5x^4+3x^2+1$ es positiva también para $x<0$. -->

### Explicacion Pedagogica
$f'(x)=5x^4+3x^2+1$ es suma de términos no negativos más 1, así que $f'(x)\ge 1>0$. Entonces $f$ es estrictamente creciente. Como $f(0)=-3<0$ y $f(1)=0$, la única raíz real es $x=1$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** En una clase en Ibagué, una estudiante afirma: "si $f'(c)=0$, entonces $f$ tiene un máximo o un mínimo local en $c$".

### Enunciado
¿Cuál argumento refuta correctamente la afirmación de la estudiante?

### Opciones
- [ ] A) Con $f(x)=x^2$: $f'(0)=0$ y en 0 hay un mínimo
  <!-- feedback: Incorrecto. Ese ejemplo cumple la afirmación; un solo caso favorable no la refuta. -->
- [x] B) Con $f(x)=x^3$: $f'(0)=0$, pero $f'$ es positiva a ambos lados de 0, así que no hay extremo
  <!-- feedback: Correcto. Es un contraejemplo: cumple la hipótesis $f'(0)=0$ y no cumple la conclusión. -->
- [ ] C) Con $f(x)=|x|$: en 0 hay un mínimo y $f'(0)$ no existe
  <!-- feedback: Incorrecto. Ahí no se cumple la hipótesis $f'(0)=0$, así que no sirve como contraejemplo. -->
- [ ] D) Con $f(x)=x^3-3x$: $f'(1)=0$ y en 1 hay un mínimo
  <!-- feedback: Incorrecto. También confirma la afirmación en un caso; para refutarla se necesita $f'(c)=0$ sin extremo. -->

### Explicacion Pedagogica
Para refutar "si $P$ entonces $Q$" se necesita un caso con $P$ verdadero y $Q$ falso. En $f(x)=x^3$, $f'(0)=0$ ($P$), pero $f'(x)=3x^2>0$ para $x\neq 0$, así que $f$ crece a ambos lados y no hay extremo ($Q$ falso).

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.48
**Contexto:** En un invernadero de rosas de la Sabana de Bogotá, la tasa de cambio de la temperatura es $T'(t)=-0.5(t-6)(t-14)$ °C por hora, con $t$ en horas desde la medianoche.

### Enunciado
¿Cuál conclusión sobre la temperatura $T$ entre las 0:00 y las 24:00 es válida?

### Opciones
- [x] A) La temperatura sube de las 6:00 a las 14:00 y tiene un máximo local a las 14:00
  <!-- feedback: Correcto. $T'>0$ entre 6 y 14 y $T'<0$ después de 14: la temperatura sube y luego baja. -->
- [ ] B) La temperatura es máxima a las 10:00, porque allí $T'$ es máxima
  <!-- feedback: Incorrecto. A las 10:00 la temperatura sube más rápido, $T'(10)=8$, pero aún sigue subiendo. -->
- [ ] C) La temperatura es negativa antes de las 6:00, porque $T'<0$
  <!-- feedback: Incorrecto. $T'<0$ indica que la temperatura baja, no que sea menor que 0 °C. -->
- [ ] D) La temperatura tiene un mínimo local a las 14:00
  <!-- feedback: Incorrecto. En $t=14$, $T'$ pasa de positiva a negativa, lo que corresponde a un máximo local. -->

### Explicacion Pedagogica
Signos: $T'(0)=-0.5(-6)(-14)=-42<0$, $T'(10)=-0.5(4)(-4)=8>0$, $T'(20)=-0.5(14)(6)=-42<0$. La temperatura baja hasta las 6:00 (mínimo local), sube hasta las 14:00 (máximo local) y luego vuelve a bajar.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.47
**Contexto:** Pedro, estudiante de un colegio de Popayán, clasifica los puntos críticos $x=1$ y $x=3$ de $f(x)=x^3-6x^2+9x+1$ comparando solamente $f(1)=5$ y $f(3)=1$.

### Enunciado
Pedro concluye: "como $f(1)>f(3)$, en $x=1$ hay un máximo local y en $x=3$ un mínimo local". ¿Qué evaluación es correcta?

### Opciones
- [ ] A) Conclusión y razonamiento correctos: comparar los valores de $f$ siempre clasifica los críticos
  <!-- feedback: Incorrecto. Comparar valores no detecta, por ejemplo, un crítico sin cambio de signo como en $x^3$; se necesita el signo de $f'$. -->
- [ ] B) La conclusión es incorrecta: en $x=1$ hay un mínimo local
  <!-- feedback: Incorrecto. $f'(0)=9>0$ y $f'(2)=-3<0$: en $x=1$ el signo pasa de $+$ a $-$, lo que da un máximo. -->
- [x] C) La conclusión es correcta, pero se justifica con el signo de $f'$: positivo antes de 1, negativo entre 1 y 3 y positivo después de 3
  <!-- feedback: Correcto. $f'(x)=3(x-1)(x-3)$ confirma la clasificación; comparar dos valores no basta en general. -->
- [ ] D) La conclusión es incorrecta: el único punto crítico es $x=2$
  <!-- feedback: Incorrecto. $x=2$ resuelve $f''(x)=6x-12=0$; los críticos resuelven $3x^2-12x+9=0$, es decir $x=1$ y $x=3$. -->

### Explicacion Pedagogica
$f'(x)=3x^2-12x+9=3(x-1)(x-3)$. Tabla: $f'(0)=9>0$, $f'(2)=-3<0$, $f'(4)=9>0$. Hay máximo local en 1 ($f=5$) y mínimo local en 3 ($f=1$). La conclusión es correcta, pero la justificación válida es el cambio de signo de $f'$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W16-criterio-primera-derivada-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** Andrea analiza el informe de producción de una planta de lácteos en Ubaté, donde solo se describe el signo de la derivada de la función de producción $f$.

### Enunciado
Se sabe que $f'(x)>0$ para $x<2$, $f'(2)=0$, $f'(x)>0$ para $2<x<5$, $f'(5)=0$ y $f'(x)<0$ para $x>5$. Andrea afirma: "$f$ tiene máximos locales en $x=2$ y en $x=5$". ¿Qué evaluación es correcta?

### Opciones
- [ ] A) Andrea tiene razón: en ambos puntos $f'=0$
  <!-- feedback: Incorrecto. $f'=0$ no basta; en $x=2$ la derivada es positiva a ambos lados, así que $f$ sigue creciendo. -->
- [ ] B) En $x=2$ hay un mínimo local y en $x=5$ un máximo local
  <!-- feedback: Incorrecto. Para un mínimo en 2, $f'$ debería pasar de $-$ a $+$, pero es positiva antes y después. -->
- [ ] C) En $x=5$ hay un mínimo local, porque $f'$ pasa de positiva a negativa
  <!-- feedback: Incorrecto. El paso de $+$ a $-$ indica máximo: la función sube y luego baja. -->
- [x] D) Solo $x=5$ es máximo (y es absoluto); en $x=2$ la derivada no cambia de signo y no hay extremo
  <!-- feedback: Correcto. $f$ crece en todo $(-\infty,5)$ y decrece después, así que $f(5)$ supera a todos los demás valores. -->

### Explicacion Pedagogica
En $x=2$: $f'>0$ antes y después, sin cambio de signo, así que no hay extremo. En $x=5$: $f'$ pasa de $+$ a $-$, máximo local. Además $f$ crece en todo $(-\infty,5)$ y decrece en $(5,\infty)$, de modo que $f(5)$ es el máximo absoluto.
