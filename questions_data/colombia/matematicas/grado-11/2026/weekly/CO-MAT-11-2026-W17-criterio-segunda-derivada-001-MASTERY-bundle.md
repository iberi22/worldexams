---
id: "CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "criterio-segunda-derivada"
periodo: "weekly"
week: "W17"
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

# Bundle MASTERY: Criterio de la Segunda Derivada - Grado 11

Veinte situaciones colombianas para estudiar concavidad, puntos de inflexión, el criterio de la segunda derivada, su caso no concluyente y la aceleración como segunda derivada.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** En un laboratorio de la Universidad de Antioquia se grafica la temperatura de un cultivo $f(t)$ y se sabe que $f''(t) > 0$ en todo el intervalo $(2, 6)$ horas.

### Enunciado
Si $f''(t) > 0$ en el intervalo $(2, 6)$, ¿qué se puede afirmar con certeza sobre la gráfica de $f$ en ese intervalo?

### Opciones
- [ ] A) La temperatura $f$ es creciente en todo el intervalo
  <!-- feedback: Incorrecto. El crecimiento de $f$ depende del signo de $f'$, no de $f''$; una curva puede bajar y ser cóncava hacia arriba, como $x^2$ en $x<0$. -->
- [ ] B) Es cóncava hacia abajo, porque la segunda derivada es mayor que cero
  <!-- feedback: Incorrecto. Invertiste la regla: $f''>0$ corresponde a concavidad hacia arriba; la concavidad hacia abajo exige $f''<0$. -->
- [x] C) Es cóncava hacia arriba, porque su pendiente $f'$ va en aumento
  <!-- feedback: Correcto. Una segunda derivada positiva significa que $f'$ crece; las tangentes giran en sentido antihorario y la curva se abre hacia arriba. -->
- [ ] D) La temperatura $f$ es decreciente en todo el intervalo
  <!-- feedback: Incorrecto. Que $f$ decrezca exige $f'<0$; el dato $f''>0$ solo dice que la pendiente aumenta, sea positiva o negativa. -->

### Explicacion Pedagogica
La segunda derivada es la derivada de la pendiente. Si $f''(t)>0$ en $(2,6)$, entonces $f'$ es creciente en ese intervalo y la gráfica es cóncava hacia arriba (forma de copa). El signo de $f''$ no informa si $f$ sube o baja: eso lo dice $f'$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.83
**Contexto:** Una cooperativa cafetera de Manizales modela su producción acumulada con $f(x) = x^3 - 6x^2 + 5$, donde $x$ son semanas de cosecha.

### Enunciado
¿En qué intervalo la gráfica de $f(x) = x^3 - 6x^2 + 5$ es cóncava hacia abajo?

### Opciones
- [x] A) $(-\infty, 2)$
  <!-- feedback: Correcto. $f''(x) = 6x - 12 < 0$ equivale a $x < 2$, así que la curva es cóncava hacia abajo en $(-\infty, 2)$. -->
- [ ] B) $(2, \infty)$
  <!-- feedback: Incorrecto. En $(2,\infty)$ se cumple $6x-12>0$; ese es el intervalo de concavidad hacia arriba, invertiste el signo de la desigualdad. -->
- [ ] C) $(0, 4)$
  <!-- feedback: Incorrecto. $(0,4)$ es donde $f'(x) = 3x^2 - 12x = 3x(x-4)$ es negativa, es decir, donde $f$ decrece; confundiste decrecimiento con concavidad. -->
- [ ] D) $(-\infty, 0)$
  <!-- feedback: Incorrecto. En $(-\infty, 0)$ la función crece porque $f'>0$ allí; ese intervalo sale de estudiar $f'$, no del signo de $f''(x) = 6x - 12$. -->

### Explicacion Pedagogica
Se deriva dos veces: $f'(x) = 3x^2 - 12x$ y $f''(x) = 6x - 12$. La curva es cóncava hacia abajo donde $f''(x) < 0$: $6x - 12 < 0 \Rightarrow x < 2$. Por tanto el intervalo es $(-\infty, 2)$ y en $x = 2$ hay un punto de inflexión.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Razonamiento
**Expected_Success:** 0.80
**Contexto:** En una clase de cálculo en Barranquilla se estudia la ganancia $G(x)$ de una tienda de artesanías, con $G'(c) = 0$ en un precio $x = c$.

### Enunciado
Si $G'(c) = 0$ y $G''(c) < 0$, ¿qué concluye el criterio de la segunda derivada sobre el punto $x = c$?

### Opciones
- [ ] A) $G$ tiene un mínimo local en $x = c$
  <!-- feedback: Incorrecto. El mínimo local corresponde a $G''(c) > 0$ (concavidad hacia arriba); con $G''(c)<0$ la curva se abre hacia abajo. -->
- [ ] B) $G$ tiene un punto de inflexión en $x = c$
  <!-- feedback: Incorrecto. Un punto de inflexión exige que $G''$ cambie de signo; aquí $G''(c)$ es negativa, no nula, y la concavidad no cambia en $c$. -->
- [x] C) $G$ tiene un máximo local en $x = c$
  <!-- feedback: Correcto. Con tangente horizontal ($G'(c)=0$) y concavidad hacia abajo ($G''(c)<0$) la curva forma una cima, es decir, un máximo local. -->
- [ ] D) El criterio no permite concluir nada en $x = c$
  <!-- feedback: Incorrecto. El criterio solo es no concluyente cuando $G''(c) = 0$; con $G''(c) < 0$ sí garantiza un máximo local. -->

### Explicacion Pedagogica
El criterio de la segunda derivada dice: si $G'(c)=0$ y $G''(c)<0$, entonces $G(c)$ es un máximo local; si $G'(c)=0$ y $G''(c)>0$, es un mínimo local; si $G''(c)=0$, el criterio no decide. Aquí se cumple el primer caso, luego hay un máximo local en $x=c$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.78
**Contexto:** Un ingeniero de Ecopetrol en Barrancabermeja describe la presión en un ducto con el polinomio $f(x) = 2x^4 - 3x^2 + x$.

### Enunciado
¿Cuál es la segunda derivada de $f(x) = 2x^4 - 3x^2 + x$?

### Opciones
- [x] A) $f''(x) = 24x^2 - 6$
  <!-- feedback: Correcto. $f'(x) = 8x^3 - 6x + 1$ y al derivar de nuevo $f''(x) = 24x^2 - 6$; la constante 1 desaparece. -->
- [ ] B) $f''(x) = 8x^3 - 6x + 1$
  <!-- feedback: Incorrecto. Esa es la primera derivada $f'(x)$; falta derivar una segunda vez. -->
- [ ] C) $f''(x) = 24x^2 - 6x$
  <!-- feedback: Incorrecto. La derivada de $-6x$ es $-6$, no $-6x$; dejaste la variable en el término lineal. -->
- [ ] D) $f''(x) = 24x^2$
  <!-- feedback: Incorrecto. Olvidaste derivar el término $-6x$ de $f'$, cuya derivada es $-6$ y debe aparecer en $f''$. -->

### Explicacion Pedagogica
Primera derivada término a término: $f'(x) = 8x^3 - 6x + 1$. Segunda derivada: $(8x^3)' = 24x^2$, $(-6x)' = -6$ y $(1)' = 0$. Por tanto $f''(x) = 24x^2 - 6$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.75
**Contexto:** Una empresa de transporte en Cali modela la variación de pasajeros con $g(x) = x^3 - 3x^2 - 9x + 2$, donde $x$ mide horas desde el mediodía.

### Enunciado
Usando el criterio de la segunda derivada, ¿cómo se clasifican los puntos críticos de $g(x) = x^3 - 3x^2 - 9x + 2$?

### Opciones
- [ ] A) Mínimo local en $x = -1$ y máximo local en $x = 3$
  <!-- feedback: Incorrecto. Invertiste la regla: $g''(-1) = -12$ es negativa, lo que indica máximo, y $g''(3) = 12$ positiva indica mínimo. -->
- [ ] B) Máximo local en $x = 1$
  <!-- feedback: Incorrecto. En $x = 1$ se anula $g''$, no $g'$; $g'(1) = 3 - 6 - 9 = -12 \neq 0$, así que no es punto crítico sino punto de inflexión. -->
- [ ] C) Máximos locales en $x = -1$ y en $x = 3$
  <!-- feedback: Incorrecto. Solo hallaste donde $g'=0$ y no evaluaste $g''$; en $x=3$ se tiene $g''(3)=12>0$, que corresponde a un mínimo. -->
- [x] D) Máximo local en $x = -1$ y mínimo local en $x = 3$
  <!-- feedback: Correcto. $g''(x) = 6x - 6$: $g''(-1) = -12 < 0$ da máximo y $g''(3) = 12 > 0$ da mínimo. -->

### Explicacion Pedagogica
$g'(x) = 3x^2 - 6x - 9 = 3(x-3)(x+1)$, de modo que los puntos críticos son $x=-1$ y $x=3$. Con $g''(x) = 6x - 6$: $g''(-1) = -12 < 0$ (máximo local, $g(-1)=7$) y $g''(3) = 12 > 0$ (mínimo local, $g(3)=-25$).

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.72
**Contexto:** En una ruta de ciclismo cerca de Tunja, el perfil de altura relativa de un tramo se modela con $f(x) = x^3 + 3x^2 - 4$ (en cientos de metros).

### Enunciado
¿Cuál es el punto de inflexión de la gráfica de $f(x) = x^3 + 3x^2 - 4$?

### Opciones
- [x] A) $(-1, -2)$
  <!-- feedback: Correcto. $f''(x) = 6x + 6 = 0$ en $x = -1$, cambia de signo allí y $f(-1) = -1 + 3 - 4 = -2$. -->
- [ ] B) $(-1, 0)$
  <!-- feedback: Incorrecto. La abscisa es correcta, pero la ordenada es $f(-1) = -2$; pusiste el valor de $f''(-1) = 0$ en lugar del valor de la función. -->
- [ ] C) $(0, -4)$
  <!-- feedback: Incorrecto. En $x=0$ se anula $f'(x) = 3x^2 + 6x$; ese es un punto crítico (mínimo local), no el lugar donde cambia la concavidad. -->
- [ ] D) $(1, 0)$
  <!-- feedback: Incorrecto. Error de signo al resolver $6x + 6 = 0$: la solución es $x = -1$, no $x = 1$. -->

### Explicacion Pedagogica
$f'(x) = 3x^2 + 6x$ y $f''(x) = 6x + 6$. Se resuelve $6x+6=0 \Rightarrow x=-1$. Para $x<-1$, $f''<0$ y para $x>-1$, $f''>0$: hay cambio de concavidad. La ordenada es $f(-1) = (-1)^3 + 3(1) - 4 = -2$, así que el punto es $(-1,-2)$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.70
**Contexto:** Un tren de carga que sale de Santa Marta tiene posición $s(t) = t^3 - 9t^2 + 15t$ metros a lo largo de la vía, con $t$ en segundos durante una maniobra.

### Enunciado
¿Cuál es la aceleración del tren en el instante $t = 2$ s?

### Opciones
- [ ] A) $-9\ \text{m/s}^2$
  <!-- feedback: Incorrecto. $-9$ es la velocidad $s'(2) = 12 - 36 + 15$ en m/s; la aceleración es la segunda derivada, no la primera. -->
- [ ] B) $6\ \text{m/s}^2$
  <!-- feedback: Incorrecto. Error de signo: $s''(2) = 6(2) - 18 = -6$; el término $-18$ domina sobre $12$. -->
- [x] C) $-6\ \text{m/s}^2$
  <!-- feedback: Correcto. $a(t) = s''(t) = 6t - 18$, y en $t=2$ da $12 - 18 = -6\ \text{m/s}^2$. -->
- [ ] D) $2\ \text{m/s}^2$
  <!-- feedback: Incorrecto. $2$ es la posición $s(2) = 8 - 36 + 30 = 2$ metros; la aceleración requiere derivar dos veces. -->

### Explicacion Pedagogica
La velocidad es $v(t) = s'(t) = 3t^2 - 18t + 15$ y la aceleración es $a(t) = s''(t) = 6t - 18$. En $t = 2$: $a(2) = 12 - 18 = -6\ \text{m/s}^2$. El signo negativo indica que la velocidad está disminuyendo en ese instante.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.68
**Contexto:** En el preicfes de un colegio de Pereira se analiza la función $f(x) = x^4$, que modela la deformación de una viga cerca de su apoyo.

### Enunciado
Para $f(x) = x^4$ se tiene $f'(0) = 0$ y $f''(0) = 0$. ¿Qué concluye el criterio de la segunda derivada en $x = 0$?

### Opciones
- [ ] A) Que hay un máximo local, porque $f''(0)$ no es positiva
  <!-- feedback: Incorrecto. Para un máximo el criterio exige $f''(c) < 0$ estrictamente; además $x^4 \ge 0$ muestra que en 0 hay un mínimo, no un máximo. -->
- [x] B) Nada: con $f''(0) = 0$ el criterio no decide y se debe usar otro método
  <!-- feedback: Correcto. El criterio solo clasifica cuando $f''(c) \neq 0$; con $f''(0) = 0$ hay que estudiar el signo de $f'$ alrededor de 0. -->
- [ ] C) Que hay un punto de inflexión, porque $f''(0) = 0$
  <!-- feedback: Incorrecto. $f''(c)=0$ no basta: $f''(x) = 12x^2$ es positiva a ambos lados de 0, la concavidad no cambia y no hay inflexión. -->
- [ ] D) Que no hay extremo, porque $f''(0)$ no es distinta de cero
  <!-- feedback: Incorrecto. Que $f''(0)=0$ no descarta un extremo; de hecho $f'(x) = 4x^3$ pasa de negativa a positiva y $x=0$ es un mínimo. -->

### Explicacion Pedagogica
El criterio de la segunda derivada requiere $f''(c) \neq 0$. Para $f(x)=x^4$: $f'(x)=4x^3$, $f''(x)=12x^2$ y $f''(0)=0$, así que el criterio no concluye. Con la primera derivada: $f'<0$ para $x<0$ y $f'>0$ para $x>0$, luego $x=0$ es un mínimo; el criterio de la segunda derivada simplemente no lo detecta.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.66
**Contexto:** Una empresa de energía solar en La Guajira modela la eficiencia de un panel con $f(x) = x^4 - 4x^3$, donde $x$ es una variable de ajuste.

### Enunciado
¿En qué conjunto la gráfica de $f(x) = x^4 - 4x^3$ es cóncava hacia arriba?

### Opciones
- [x] A) $(-\infty, 0) \cup (2, \infty)$
  <!-- feedback: Correcto. $f''(x) = 12x^2 - 24x = 12x(x-2)$ es positiva cuando $x<0$ o $x>2$. -->
- [ ] B) $(0, 2)$
  <!-- feedback: Incorrecto. En $(0,2)$ el producto $12x(x-2)$ es negativo; allí la curva es cóncava hacia abajo. -->
- [ ] C) $(3, \infty)$
  <!-- feedback: Incorrecto. $(3,\infty)$ es donde $f'(x) = 4x^2(x-3)$ es positiva, es decir, donde $f$ crece; confundiste crecimiento con concavidad. -->
- [ ] D) $(2, \infty)$
  <!-- feedback: Incorrecto. Omitiste la región $x<0$: allí $12x$ y $x-2$ son ambos negativos y su producto es positivo, así que también hay concavidad hacia arriba. -->

### Explicacion Pedagogica
$f'(x) = 4x^3 - 12x^2$ y $f''(x) = 12x^2 - 24x = 12x(x-2)$. Los ceros de $f''$ son $0$ y $2$. Tabla de signos: para $x<0$, $(-)(-)=+$; en $(0,2)$, $(+)(-)=-$; para $x>2$, $(+)(+)=+$. La gráfica es cóncava hacia arriba en $(-\infty,0)\cup(2,\infty)$ y tiene inflexiones en $x=0$ y $x=2$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.64
**Contexto:** Un bus del MIO en Cali avanza por la Calle 5 con posición $s(t) = -t^3 + 6t^2$ (en cientos de metros), con $t$ en minutos.

### Enunciado
¿Qué describe correctamente el movimiento del bus en $t = 3$ min?

### Opciones
- [ ] A) Avanza en sentido positivo y su velocidad está aumentando
  <!-- feedback: Incorrecto. El avance es correcto porque $s'(3) = 9 > 0$, pero $s''(3) = -6$ es negativa, así que la velocidad baja. -->
- [ ] B) Retrocede, porque la aceleración es negativa
  <!-- feedback: Incorrecto. El sentido del movimiento lo da el signo de la velocidad $s'(3) = 9$, que es positiva; una aceleración negativa no implica retroceso. -->
- [ ] C) Está detenido, porque $s''(3) \neq 0$
  <!-- feedback: Incorrecto. El bus está detenido solo si $s'(t) = 0$; en $t=3$ la velocidad es $9$, distinta de cero. -->
- [x] D) Avanza en sentido positivo y su velocidad está disminuyendo
  <!-- feedback: Correcto. $s'(3) = -27 + 36 = 9 > 0$ (avanza) y $s''(3) = -18 + 12 = -6 < 0$ (la velocidad disminuye). -->

### Explicacion Pedagogica
Velocidad: $s'(t) = -3t^2 + 12t$, entonces $s'(3) = -27 + 36 = 9$ (cientos de metros por minuto), positiva. Aceleración: $s''(t) = -6t + 12$, entonces $s''(3) = -6$. Velocidad positiva y aceleración negativa: el bus sigue avanzando pero frena.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.62
**Contexto:** Un diseñador de Bogotá ajusta la curva de una rampa de patinaje con $f(x) = x^3 + kx^2 + 2$ y necesita que la concavidad cambie exactamente en $x = 2$.

### Enunciado
¿Qué valor de $k$ hace que $f(x) = x^3 + kx^2 + 2$ tenga un punto de inflexión en $x = 2$?

### Opciones
- [ ] A) $k = -3$
  <!-- feedback: Incorrecto. Igualaste a cero la primera derivada: $f'(2) = 12 + 4k = 0$ da $k=-3$, pero la inflexión se busca con $f''$. -->
- [x] B) $k = -6$
  <!-- feedback: Correcto. $f''(x) = 6x + 2k$; $f''(2) = 12 + 2k = 0$ da $k = -6$, y como $f''$ es lineal cambia de signo en 2. -->
- [ ] C) $k = 6$
  <!-- feedback: Incorrecto. Error de signo al despejar $12 + 2k = 0$: se obtiene $k = -6$, no $6$. -->
- [ ] D) $k = -12$
  <!-- feedback: Incorrecto. Derivaste $kx^2$ dos veces como $k$ en vez de $2k$; con $f''(x) = 6x + 2k$ la condición es $12 + 2k = 0$. -->

### Explicacion Pedagogica
$f'(x) = 3x^2 + 2kx$ y $f''(x) = 6x + 2k$. Para inflexión en $x=2$ se pide $f''(2)=0$: $12 + 2k = 0 \Rightarrow k = -6$. Comprobación: $f''(x) = 6x - 12$ es negativa para $x<2$ y positiva para $x>2$, así que la concavidad sí cambia.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.60
**Contexto:** Un estudiante de Bucaramanga afirma: si $f''(c) = 0$, entonces la gráfica de $f$ tiene un punto de inflexión en $x = c$.

### Enunciado
¿Cuál de las siguientes funciones es un contraejemplo de esa afirmación?

### Opciones
- [x] A) $f(x) = x^4$ en $x = 0$
  <!-- feedback: Correcto. $f''(x) = 12x^2$ cumple $f''(0) = 0$, pero es positiva a ambos lados de 0, así que no hay cambio de concavidad. -->
- [ ] B) $f(x) = x^3$ en $x = 0$
  <!-- feedback: Incorrecto. $f''(x) = 6x$ cambia de negativa a positiva en 0, luego sí hay inflexión; la afirmación se cumple y no es contraejemplo. -->
- [ ] C) $f(x) = x^5$ en $x = 0$
  <!-- feedback: Incorrecto. $f''(x) = 20x^3$ cambia de signo en 0, así que $x=0$ sí es punto de inflexión; no contradice la afirmación. -->
- [ ] D) $f(x) = x^3 - 3x$ en $x = 0$
  <!-- feedback: Incorrecto. $f''(x) = 6x$ se anula en 0 y cambia de signo, por lo que allí hay inflexión; la afirmación se cumple. -->

### Explicacion Pedagogica
Un contraejemplo necesita $f''(c)=0$ sin cambio de concavidad. En $x^4$: $f''(x)=12x^2 \ge 0$, se anula en 0 pero no cambia de signo, luego no hay inflexión. En las otras tres funciones $f''$ es $6x$ o $20x^3$, que sí cambian de signo en 0. La condición $f''(c)=0$ es necesaria (si $f''$ existe) pero no suficiente.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.58
**Contexto:** Un analista de una fábrica de bocadillos en Vélez tiene una tabla de su función de costo $f$: $f'(1)=0$, $f''(1)=-4$; $f'(4)=0$, $f''(4)=0$; $f'(6)=0$, $f''(6)=5$.

### Enunciado
Con solo esa información, ¿cuál afirmación está garantizada por el criterio de la segunda derivada?

### Opciones
- [ ] A) Hay un punto de inflexión en $x = 4$
  <!-- feedback: Incorrecto. $f''(4)=0$ no garantiza inflexión; se necesitaría saber que $f''$ cambia de signo en 4, y la tabla no lo dice. -->
- [ ] B) Hay un mínimo local en $x=1$ y un máximo local en $x=6$
  <!-- feedback: Incorrecto. Invertiste el criterio: $f''(1) = -4 < 0$ indica máximo y $f''(6) = 5 > 0$ indica mínimo. -->
- [ ] C) El costo máximo absoluto se alcanza en $x = 1$
  <!-- feedback: Incorrecto. El criterio solo da extremos locales; sin conocer los valores de $f$ ni el dominio no se puede afirmar que $f(1)$ sea el mayor valor. -->
- [x] D) Hay un máximo local en $x=1$ y un mínimo local en $x=6$; sobre $x=4$ el criterio no decide
  <!-- feedback: Correcto. $f''(1)<0$ da máximo, $f''(6)>0$ da mínimo y $f''(4)=0$ es el caso no concluyente. -->

### Explicacion Pedagogica
En cada punto se tiene $f'=0$. En $x=1$: $f''(1)=-4<0$, máximo local. En $x=6$: $f''(6)=5>0$, mínimo local. En $x=4$: $f''(4)=0$ y el criterio no concluye; podría ser máximo, mínimo o ningún extremo, como muestran $-x^4$, $x^4$ y $x^3$. Tampoco se pueden afirmar extremos absolutos con datos locales.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.56
**Contexto:** Una aplicación de domicilios creada en Cali registra descargas acumuladas $N(t) = -t^3 + 12t^2 + 5$ (miles), con $t$ en meses y $0 \le t \le 8$.

### Enunciado
¿En qué mes es máxima la rapidez de crecimiento de las descargas, y por qué?

### Opciones
- [ ] A) En $t = 8$, porque allí $N'(t) = 0$
  <!-- feedback: Incorrecto. $N'(8) = -192 + 192 = 0$ indica que las descargas acumuladas dejan de crecer; ahí la rapidez es mínima, no máxima. -->
- [x] B) En $t = 4$, porque $N''$ pasa de positiva a negativa allí y $N'$ alcanza su máximo
  <!-- feedback: Correcto. $N''(t) = -6t + 24$ se anula en 4 y cambia de $+$ a $-$; por eso $N'(t)$ tiene su máximo, $N'(4) = 48$ mil descargas por mes. -->
- [ ] C) En $t = 4$, porque allí las descargas acumuladas $N$ son máximas
  <!-- feedback: Incorrecto. El mes es el correcto, pero la razón no: $N$ sigue creciendo hasta $t=8$ porque $N'(t)>0$ en $(4,8)$; en $t=4$ lo máximo es $N'$, no $N$. -->
- [ ] D) En $t = 0$, porque al lanzar la aplicación es cuando más crece
  <!-- feedback: Incorrecto. $N'(0) = 0$; la rapidez inicial es nula y aumenta hasta $N'(4) = 48$. -->

### Explicacion Pedagogica
La rapidez de crecimiento es $N'(t) = -3t^2 + 24t$. Para maximizarla se deriva otra vez: $N''(t) = -6t + 24 = 0 \Rightarrow t = 4$, y $N'''(t) = -6 < 0$ confirma un máximo de $N'$. Así, $t=4$ es el punto de inflexión de $N$: antes la curva es cóncava hacia arriba (crecimiento acelerado) y después cóncava hacia abajo. El total $N$ sigue subiendo hasta $t = 8$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.55
**Contexto:** En un semillero de matemáticas en Popayán se analiza la función $f(x) = x e^{-x}$, que modela la concentración de un fertilizante en el suelo.

### Enunciado
Para $f(x) = x e^{-x}$ se obtiene $f'(x) = (1-x)e^{-x}$ y $f''(x) = (x-2)e^{-x}$. ¿Cuál razonamiento sobre $x = 1$ es válido?

### Opciones
- [ ] A) Hay un mínimo local en $x=1$, porque $f''(1) = -e^{-1} < 0$
  <!-- feedback: Incorrecto. El valor de $f''(1)$ está bien calculado, pero una segunda derivada negativa indica máximo, no mínimo. -->
- [ ] B) Hay un máximo local en $x=1$, porque $f(1) = e^{-1} > 0$
  <!-- feedback: Incorrecto. El signo de $f(1)$ no clasifica el punto crítico; lo que decide es el signo de $f''(1)$. -->
- [x] C) Hay un máximo local en $x=1$, porque $f'(1) = 0$ y $f''(1) = -e^{-1} < 0$
  <!-- feedback: Correcto. $f''(1) = (1-2)e^{-1} = -\frac{1}{e}$ es negativa y $f'(1)=0$; el criterio garantiza máximo local. -->
- [ ] D) Hay un punto de inflexión en $x=1$, porque $f'(1) = 0$
  <!-- feedback: Incorrecto. $f'(1)=0$ señala un punto crítico; la inflexión ocurre donde $f''$ cambia de signo, que es en $x = 2$. -->

### Explicacion Pedagogica
Se resuelve $f'(x)=(1-x)e^{-x}=0$; como $e^{-x}>0$, el único punto crítico es $x=1$. Luego $f''(1)=(1-2)e^{-1}=-1/e<0$, de modo que $f(1)=1/e$ es un máximo local. La inflexión de esta curva está en $x=2$, donde $(x-2)e^{-x}$ cambia de signo.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Variacional
**Expected_Success:** 0.53
**Contexto:** En un estudio del caudal del río Magdalena en Honda, se conoce la segunda derivada del modelo de caudal: $f''(x) = (x-1)(x-4)$.

### Enunciado
Sabiendo solo que $f''(x) = (x-1)(x-4)$, ¿cuál afirmación es correcta?

### Opciones
- [ ] A) $f'$ decrece en $(-\infty,1) \cup (4,\infty)$
  <!-- feedback: Incorrecto. En esos intervalos $(x-1)(x-4)>0$, así que $f'$ crece allí; invertiste el signo del producto. -->
- [ ] B) $f$ decrece en $(1, 4)$
  <!-- feedback: Incorrecto. $f''<0$ en $(1,4)$ dice que la pendiente $f'$ disminuye, no que $f$ baje; para eso se necesitaría $f'<0$, que no se conoce. -->
- [x] C) $f'$ decrece en $(1, 4)$ y $f$ tiene puntos de inflexión en $x=1$ y $x=4$
  <!-- feedback: Correcto. $f''<0$ en $(1,4)$, así que $f'$ decrece allí, y $f''$ cambia de signo en 1 y en 4, que son las inflexiones. -->
- [ ] D) $f$ tiene un máximo local en $x=1$ y un mínimo local en $x=4$
  <!-- feedback: Incorrecto. Tomaste $f''$ como si fuera $f'$; los ceros de $f''$ son candidatos a inflexión, no a extremos de $f$. -->

### Explicacion Pedagogica
Signo de $f''(x)=(x-1)(x-4)$: positivo si $x<1$, negativo en $(1,4)$, positivo si $x>4$. Donde $f''<0$ la derivada $f'$ decrece y la curva es cóncava hacia abajo; donde $f''>0$, $f'$ crece. Como $f''$ cambia de signo en $x=1$ y $x=4$, ambos son puntos de inflexión de $f$. Nada se puede decir del crecimiento de $f$ sin conocer $f'$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Cuatro estudiantes de un colegio de Villavicencio analizan los puntos críticos de $f(x) = x^4 - 4x^3$, que aparecen en $x = 0$ y $x = 3$.

### Enunciado
¿Cuál de los análisis es completamente correcto?

### Opciones
- [ ] A) En $x=0$ hay máximo local porque $f''(0)=0$, y en $x=3$ hay mínimo local
  <!-- feedback: Incorrecto. $f''(0)=0$ no indica máximo; es el caso no concluyente, y el signo de $f'$ muestra que en 0 no hay extremo. -->
- [x] B) En $x=3$ hay mínimo local porque $f''(3)=36>0$; en $x=0$ el criterio no decide y, como $f'<0$ a ambos lados de 0, allí no hay extremo
  <!-- feedback: Correcto. $f''(3) = 108 - 72 = 36 > 0$, y $f'(x) = 4x^2(x-3)$ es negativa justo antes y justo después de 0, así que $x=0$ no es extremo. -->
- [ ] C) En $x=0$ hay mínimo local porque $f''(0) \ge 0$, y en $x=3$ hay mínimo local
  <!-- feedback: Incorrecto. El criterio exige $f''(c)>0$ estricto para un mínimo; con $f''(0)=0$ no concluye y, de hecho, $f$ decrece a través de 0. -->
- [ ] D) No hay extremos locales, porque $f''$ se anula en $x=0$ y en $x=2$
  <!-- feedback: Incorrecto. Los ceros de $f''$ marcan posibles inflexiones; en $x=3$ se tiene $f'(3)=0$ y $f''(3)=36>0$, un mínimo local con $f(3)=-27$. -->

### Explicacion Pedagogica
$f'(x) = 4x^3 - 12x^2 = 4x^2(x-3)$ y $f''(x) = 12x^2 - 24x$. En $x=3$: $f''(3)=36>0$, mínimo local con $f(3) = 81 - 108 = -27$. En $x=0$: $f''(0)=0$, caso no concluyente. Se usa la primera derivada: $4x^2 \ge 0$ y $x-3<0$ cerca de 0, así que $f'<0$ a ambos lados y no hay extremo; como $f''=12x(x-2)$ cambia de signo en 0, allí hay un punto de inflexión con tangente horizontal.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Formulacion
**Expected_Success:** 0.48
**Contexto:** Un ingeniero agrónomo del Tolima busca un modelo cúbico para el rendimiento de un cultivo de arroz que tenga máximo local en $x = 2$ y punto de inflexión en $x = 0$.

### Enunciado
¿Cuál de las funciones cumple ambas condiciones?

### Opciones
- [ ] A) $f(x) = -x^3 + 3x^2$
  <!-- feedback: Incorrecto. Tiene máximo en $x=2$ porque $f'(2) = -12 + 12 = 0$ y $f''(2) = -6$, pero $f''(x) = -6x + 6$ se anula en $x = 1$: la inflexión no está en 0. -->
- [x] B) $f(x) = -x^3 + 12x$
  <!-- feedback: Correcto. $f'(x) = -3x^2 + 12$ se anula en $x=2$, $f''(x) = -6x$ da $f''(2) = -12 < 0$ (máximo) y $f''$ cambia de signo en 0. -->
- [ ] C) $f(x) = -x^3 + 6x^2$
  <!-- feedback: Incorrecto. $f'(2) = -12 + 24 = 12 \neq 0$, así que $x=2$ ni siquiera es punto crítico; su inflexión además está en $x=2$. -->
- [ ] D) $f(x) = x^3 - 12x$
  <!-- feedback: Incorrecto. $f''(2) = 12 > 0$, por lo que en $x=2$ hay un mínimo local, no un máximo; el signo del término cúbico está invertido. -->

### Explicacion Pedagogica
Se verifica cada condición. Para $-x^3+12x$: $f'(2) = -12+12 = 0$, $f''(x) = -6x$, $f''(2)=-12<0$ (máximo local) y $f''$ cambia de signo en 0 (inflexión). Para $-x^3+3x^2$ la inflexión cae en $x=1$; para $-x^3+6x^2$, $f'(2)=12$; para $x^3-12x$, $x=2$ es mínimo. Solo la primera cumple todo.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.47
**Contexto:** Un mensajero en moto recorre una avenida de Bogotá con posición $s(t) = t^3 - 6t^2 + 9t$ (kilómetros), con $t$ en horas, entre $t = 0$ y $t = 4$.

### Enunciado
¿Qué conclusión sobre el movimiento en el intervalo $2 < t < 3$ es correcta?

### Opciones
- [ ] A) Se mueve en sentido positivo y acelera, porque $s''>0$
  <!-- feedback: Incorrecto. El sentido lo da $s'$, que es negativa en $(2,3)$; $s''>0$ no implica avanzar. -->
- [ ] B) Se mueve en sentido negativo y su rapidez aumenta, porque $s''>0$
  <!-- feedback: Incorrecto. Con $s'<0$ y $s''>0$ la velocidad se acerca a cero, por ejemplo $s'(2{,}5) = -2{,}25$ y $s'(3) = 0$; la rapidez disminuye. -->
- [ ] C) Está detenido durante todo el intervalo, porque $s'(3) = 0$
  <!-- feedback: Incorrecto. $s'(3)=0$ solo indica un instante de reposo en $t=3$; dentro del intervalo, por ejemplo, $s'(2{,}5) = -2{,}25 \neq 0$. -->
- [x] D) Se mueve en sentido negativo y frena: su rapidez disminuye
  <!-- feedback: Correcto. En $(2,3)$, $s'(t) = 3(t-1)(t-3) < 0$ y $s''(t) = 6t - 12 > 0$; velocidad negativa que aumenta hacia 0 significa que la rapidez baja. -->

### Explicacion Pedagogica
$s'(t) = 3t^2 - 12t + 9 = 3(t-1)(t-3)$ y $s''(t) = 6t - 12$. En $(2,3)$: $t-1>0$, $t-3<0$, luego $s'<0$ (va en sentido negativo), y $s''>0$. Velocidad negativa con aceleración positiva: la velocidad sube hacia 0, por ejemplo de $s'(2)=-3$ a $s'(3)=0$, así que la moto frena. Cuando velocidad y aceleración tienen signos opuestos, la rapidez disminuye.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W17-criterio-segunda-derivada-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** En un debate de la Olimpiada Matemática en Medellín se discute la afirmación: si $f''(x) > 0$ para todo $x$ real, entonces $f$ tiene un mínimo local.

### Enunciado
¿Cuál evaluación de la afirmación es correcta?

### Opciones
- [ ] A) Es verdadera: $f''>0$ basta para aplicar el criterio y obtener un mínimo
  <!-- feedback: Incorrecto. El criterio exige además un punto $c$ con $f'(c)=0$; sin punto crítico no hay mínimo que clasificar. -->
- [ ] B) Es falsa: $f(x) = x^2$ la contradice
  <!-- feedback: Incorrecto. $x^2$ tiene $f''=2>0$ y sí tiene mínimo en $x=0$; cumple la afirmación, no la refuta. -->
- [ ] C) Es verdadera: toda función cóncava hacia arriba tiene un punto donde $f' = 0$
  <!-- feedback: Incorrecto. $e^x$ es cóncava hacia arriba y su derivada $e^x$ es siempre positiva, nunca cero. -->
- [x] D) Es falsa: $f(x) = e^x$ cumple $f''>0$ en todo $\mathbb{R}$ y no tiene mínimo local, porque $f'$ nunca se anula
  <!-- feedback: Correcto. $f'(x) = e^x > 0$ siempre, así que no hay punto crítico; la concavidad hacia arriba sola no produce un mínimo. -->

### Explicacion Pedagogica
Para refutar una afirmación universal basta un contraejemplo. Con $f(x)=e^x$: $f'(x)=e^x>0$ y $f''(x)=e^x>0$ en todo $\mathbb{R}$. Como $f'$ no se anula, no hay puntos críticos y $f$ es estrictamente creciente, sin mínimo local. El criterio de la segunda derivada necesita las dos condiciones: $f'(c)=0$ y $f''(c)>0$.
