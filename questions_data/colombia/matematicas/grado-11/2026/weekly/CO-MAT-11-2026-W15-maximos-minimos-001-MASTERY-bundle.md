---
id: "CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "maximos-minimos"
periodo: "weekly"
week: "W15"
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

# Bundle MASTERY: Máximos y Mínimos - Grado 11

Este bundle evalúa puntos críticos, extremos locales y absolutos en intervalos cerrados y su interpretación en contextos colombianos de temperatura, ingresos y utilidades.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Variacional
**Expected_Success:** 0.85
**Contexto:** Antes de analizar la producción de leche de una finca en San Pedro de los Milagros, una profesora repasa con su curso qué es un punto crítico.

### Enunciado
Sea $f$ una función definida en un intervalo abierto que contiene a $c$. ¿Cuándo se dice que $c$ es un punto crítico de $f$?

### Opciones
- [ ] A) Cuando $f(c)=0$
  <!-- feedback: Incorrecto. $f(c)=0$ indica un corte con el eje $x$ (una raíz), no un punto de pendiente nula. -->
- [ ] B) Cuando $f''(c)=0$
  <!-- feedback: Incorrecto. La condición $f''(c)=0$ se relaciona con la concavidad y posibles puntos de inflexión, no con la definición de punto crítico. -->
- [x] C) Cuando $f'(c)=0$ o cuando $f'(c)$ no existe
  <!-- feedback: Correcto. Esa es la definición: los únicos candidatos a extremo local en el interior son los puntos donde la derivada es cero o no existe. -->
- [ ] D) Solo cuando $c$ es un extremo del intervalo de estudio
  <!-- feedback: Incorrecto. Los extremos del intervalo se revisan aparte; un punto crítico es interior y se define con la derivada. -->

### Explicacion Pedagogica
Un punto crítico de $f$ es un valor $c$ del dominio, en el interior, tal que $f'(c)=0$ o $f'(c)$ no existe. Por el teorema de Fermat, todo extremo local interior de una función derivable ocurre en un punto con $f'(c)=0$, por eso se buscan allí.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v2
**Bloom:** Understand
**ICFES:** Variacional
**Expected_Success:** 0.83
**Contexto:** En el estadio Metropolitano de Barranquilla, la altura (en metros) de un balón pateado se modela con una parábola en función del tiempo.

### Enunciado
La altura del balón es $h(t) = -t^2 + 6t + 1$. ¿Cuál es el vértice de la parábola y qué tipo de extremo representa?

### Opciones
- [ ] A) $(3, 10)$, un mínimo
  <!-- feedback: Incorrecto. El punto es correcto, pero una parábola con coeficiente principal $-1<0$ abre hacia abajo y su vértice es máximo. -->
- [x] B) $(3, 10)$, un máximo
  <!-- feedback: Correcto. $h'(t)=-2t+6=0$ da $t=3$ y $h(3)=-9+18+1=10$; como el coeficiente de $t^2$ es negativo, es máximo. -->
- [ ] C) $(-3, -26)$, un máximo
  <!-- feedback: Incorrecto. Error de signo en $t=-\frac{b}{2a}=-\frac{6}{-2}=3$; además $h(-3)=-26$ no es la altura máxima. -->
- [ ] D) $(6, 1)$, un máximo
  <!-- feedback: Incorrecto. En $t=6$ el balón vuelve a la altura inicial: $h(6)=-36+36+1=1$; ese no es el vértice. -->

### Explicacion Pedagogica
El vértice está donde $h'(t)=-2t+6=0$, es decir $t=3$ s, con $h(3)=10$ m. Como $a=-1<0$, la parábola abre hacia abajo y el vértice es el punto más alto: el balón alcanza 10 m a los 3 s.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Razonamiento
**Expected_Success:** 0.80
**Contexto:** Un estudiante de Tunja se pregunta si siempre existe la temperatura más alta del día cuando la temperatura varía de forma continua entre las 6:00 y las 18:00.

### Enunciado
¿Cuál de las siguientes afirmaciones expresa correctamente el teorema del valor extremo?

### Opciones
- [ ] A) Toda función continua tiene máximo absoluto en un intervalo abierto $(a,b)$
  <!-- feedback: Incorrecto. $f(x)=x$ en $(0,1)$ es continua y no alcanza máximo: se acerca a 1 sin llegar. -->
- [ ] B) El máximo absoluto siempre ocurre donde $f'(x)=0$
  <!-- feedback: Incorrecto. El máximo puede estar en un extremo del intervalo, donde la derivada no tiene por qué anularse. -->
- [ ] C) Una función continua en $[a,b]$ puede no tener mínimo absoluto
  <!-- feedback: Incorrecto. Eso contradice el teorema: la continuidad en un intervalo cerrado asegura el mínimo. -->
- [x] D) Si $f$ es continua en $[a,b]$, entonces alcanza un valor máximo y un valor mínimo absolutos en $[a,b]$
  <!-- feedback: Correcto. La continuidad en un intervalo cerrado y acotado garantiza la existencia de ambos extremos absolutos. -->

### Explicacion Pedagogica
El teorema del valor extremo exige dos condiciones: $f$ continua y un intervalo cerrado $[a,b]$. Con ellas existen $c,d$ en $[a,b]$ con $f(c)$ máximo y $f(d)$ mínimo. Si el intervalo es abierto, puede fallar, como ocurre con $f(x)=x$ en $(0,1)$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Algebraico
**Expected_Success:** 0.78
**Contexto:** Un ingeniero de una planta de cementos en Sogamoso estudia la eficiencia de un horno con la función $f(x)=x^3-3x$.

### Enunciado
¿Cuáles son los puntos críticos de $f(x) = x^3 - 3x$?

### Opciones
- [x] A) $x=-1$ y $x=1$
  <!-- feedback: Correcto. $f'(x)=3x^2-3=3(x-1)(x+1)$, que se anula en $\pm 1$. -->
- [ ] B) $x=0$ y $x=\pm\sqrt{3}$
  <!-- feedback: Incorrecto. Esas son las raíces de $f(x)=x(x^2-3)$, no los ceros de la derivada. -->
- [ ] C) Solo $x=1$
  <!-- feedback: Incorrecto. $x^2=1$ tiene dos soluciones; olvidó la raíz $x=-1$. -->
- [ ] D) $x=0$
  <!-- feedback: Incorrecto. Resolvió $f''(x)=6x=0$, la segunda derivada, en lugar de $f'(x)=0$. -->

### Explicacion Pedagogica
Como $f$ es un polinomio, es derivable en todo $\mathbb{R}$ y los puntos críticos son las soluciones de $f'(x)=0$. Se tiene $f'(x)=3x^2-3=3(x^2-1)=0$, de donde $x=1$ o $x=-1$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.75
**Contexto:** Un técnico de un cultivo de flores en la Sabana de Bogotá modela una variable de riego con $f(x)=x^2-4x+1$ para $x$ entre 0 y 5 horas.

### Enunciado
¿Cuáles son el máximo y el mínimo absolutos de $f(x) = x^2 - 4x + 1$ en el intervalo $[0, 5]$?

### Opciones
- [ ] A) Máximo $1$ en $x=0$; mínimo $-3$ en $x=2$
  <!-- feedback: Incorrecto. No evaluó el extremo derecho: $f(5)=25-20+1=6>1$. -->
- [ ] B) Máximo $6$ en $x=5$; mínimo $1$ en $x=0$
  <!-- feedback: Incorrecto. Revisó solo los extremos del intervalo y omitió el punto crítico $x=2$, donde $f(2)=-3$. -->
- [x] C) Máximo $6$ en $x=5$; mínimo $-3$ en $x=2$
  <!-- feedback: Correcto. Se comparan $f(0)=1$, $f(2)=-3$ y $f(5)=6$: el mayor es 6 y el menor $-3$. -->
- [ ] D) Mínimo $-3$ en $x=2$; no hay máximo absoluto
  <!-- feedback: Incorrecto. En un intervalo cerrado una función continua siempre tiene máximo; aquí está en $x=5$. -->

### Explicacion Pedagogica
Punto crítico: $f'(x)=2x-4=0$, $x=2$, que está en $[0,5]$. Se evalúa en el crítico y en los extremos: $f(0)=1$, $f(2)=4-8+1=-3$, $f(5)=6$. El máximo absoluto es 6 (en $x=5$) y el mínimo absoluto es $-3$ (en $x=2$).

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.73
**Contexto:** Con datos de una estación meteorológica se modela la temperatura en Bogotá durante un día despejado; $h$ son las horas transcurridas desde las 6:00 a. m., con $0 \le h \le 12$.

### Enunciado
La temperatura es $T(h) = -0.1h^2 + 1.6h + 8$ (°C). ¿Cuál es la temperatura máxima del día y a qué hora se alcanza?

### Opciones
- [ ] A) $8$ °C a las 6:00 a. m.
  <!-- feedback: Incorrecto. $T(0)=8$ es la temperatura inicial; el crítico $h=8$ da un valor mayor, $14.4$. -->
- [ ] B) $14.4$ °C a las 8:00 a. m.
  <!-- feedback: Incorrecto. Leyó $h=8$ como la hora del reloj; $h$ cuenta horas desde las 6:00, así que es a las 14:00. -->
- [ ] C) $12.8$ °C a las 6:00 p. m.
  <!-- feedback: Incorrecto. $T(12)=-14.4+19.2+8=12.8$ es el valor en el extremo final, menor que $T(8)=14.4$. -->
- [x] D) $14.4$ °C a las 2:00 p. m.
  <!-- feedback: Correcto. $T'(h)=-0.2h+1.6=0$ da $h=8$, es decir 6:00 + 8 h = 14:00, con $T(8)=14.4$. -->

### Explicacion Pedagogica
$T'(h)=-0.2h+1.6=0$ implica $h=8$. Se comparan $T(0)=8$, $T(8)=-6.4+12.8+8=14.4$ y $T(12)=12.8$. El máximo es 14.4 °C, ocho horas después de las 6:00 a. m., es decir a las 2:00 p. m.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Modelacion
**Expected_Success:** 0.71
**Contexto:** Una asociación de artesanas wayuu de La Guajira estima su utilidad mensual, en miles de COP, según el número $x$ de mochilas vendidas.

### Enunciado
La utilidad es $U(x) = -2x^2 + 240x - 4000$. ¿Cuántas mochilas maximizan la utilidad y cuál es esa utilidad máxima?

### Opciones
- [ ] A) 120 mochilas y utilidad de $-4.000$ miles de COP
  <!-- feedback: Incorrecto. Usó $x=\frac{240}{2}$ sin el coeficiente $-2$; la derivada correcta es $-4x+240$. -->
- [ ] B) 60 mochilas y utilidad de 7.200 miles de COP
  <!-- feedback: Incorrecto. Olvidó restar el costo fijo 4000: $-7200+14400-4000=3200$. -->
- [x] C) 60 mochilas y utilidad de 3.200 miles de COP
  <!-- feedback: Correcto. $U'(x)=-4x+240=0$ da $x=60$ y $U(60)=-7200+14400-4000=3200$. -->
- [ ] D) 60 mochilas y utilidad de 17.600 miles de COP
  <!-- feedback: Incorrecto. Sumó el término cuadrático: $-2(60)^2=-7200$, no $+7200$. -->

### Explicacion Pedagogica
$U'(x)=-4x+240=0$ da $x=60$; como $U''(x)=-4<0$ (parábola hacia abajo), es un máximo. $U(60)=-2(3600)+240(60)-4000=-7200+14400-4000=3200$, es decir 3.200.000 COP.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.69
**Contexto:** Un ingeniero de una hidroeléctrica en Antioquia analiza la variación del nivel de un embalse con el modelo $f(x)=x^3-3x^2+1$ en el periodo $[-1,3]$.

### Enunciado
¿Cuáles son el valor máximo absoluto y el valor mínimo absoluto de $f(x) = x^3 - 3x^2 + 1$ en $[-1, 3]$?

### Opciones
- [x] A) Máximo $1$ y mínimo $-3$
  <!-- feedback: Correcto. $f(-1)=-3$, $f(0)=1$, $f(2)=-3$, $f(3)=1$: el mayor valor es 1 y el menor es $-3$. -->
- [ ] B) Máximo $0$ y mínimo $2$
  <!-- feedback: Incorrecto. 0 y 2 son las abscisas de los puntos críticos, no los valores de la función. -->
- [ ] C) Máximo $3$ y mínimo $-3$
  <!-- feedback: Incorrecto. Calculó $f(-1)$ con $-3(-1)^2=+3$; en realidad $-3(-1)^2=-3$ y $f(-1)=-1-3+1=-3$. -->
- [ ] D) No hay extremos absolutos, solo un máximo local en $x=0$ y un mínimo local en $x=2$
  <!-- feedback: Incorrecto. $f$ es continua en un intervalo cerrado, así que tiene extremos absolutos. -->

### Explicacion Pedagogica
$f'(x)=3x^2-6x=3x(x-2)$ da críticos $x=0$ y $x=2$, ambos en $[-1,3]$. Valores: $f(-1)=-3$, $f(0)=1$, $f(2)=8-12+1=-3$, $f(3)=27-27+1=1$. El máximo absoluto es 1 (en $x=0$ y $x=3$) y el mínimo absoluto es $-3$ (en $x=-1$ y $x=2$).

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Variacional
**Expected_Success:** 0.67
**Contexto:** En un laboratorio de materiales de la Universidad de Antioquia se estudia la energía potencial de una pieza con el modelo $f(x)=x^4-2x^2$ en todos los reales.

### Enunciado
Para $f(x) = x^4 - 2x^2$ definida en $\mathbb{R}$, ¿cuál afirmación sobre sus extremos es correcta?

### Opciones
- [ ] A) En $x=0$ hay un máximo absoluto
  <!-- feedback: Incorrecto. $f(x)\to\infty$ cuando $|x|\to\infty$; por ejemplo $f(2)=16-8=8>f(0)$. -->
- [x] B) En $x=0$ hay un máximo local que no es absoluto, y el mínimo absoluto es $-1$, alcanzado en $x=\pm 1$
  <!-- feedback: Correcto. $f(0)=0$ es máximo local, pero $f(2)=8>0$; y $f(\pm 1)=-1$ es el menor valor. -->
- [ ] C) No hay mínimo absoluto porque el polinomio es de grado 4
  <!-- feedback: Incorrecto. Un polinomio de grado par con coeficiente principal positivo sí alcanza mínimo absoluto; aquí es $-1$. -->
- [ ] D) El mínimo absoluto es $0$, en $x=0$
  <!-- feedback: Incorrecto. $f(1)=1-2=-1<0$, así que 0 no es el menor valor; en $x=0$ hay un máximo local. -->

### Explicacion Pedagogica
$f'(x)=4x^3-4x=4x(x-1)(x+1)$ da críticos $-1, 0, 1$. $f(\pm 1)=-1$ y $f(0)=0$. Como $f$ crece sin cota para $|x|$ grande, no hay máximo absoluto: $x=0$ es solo un máximo local. El mínimo absoluto es $-1$ en $x=\pm 1$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Algebraico
**Expected_Success:** 0.65
**Contexto:** Una empresa de transporte de Pereira ajusta el parámetro $k$ de su modelo de costos $f(x)=x^2+kx+5$ para que el costo mínimo ocurra con 3 viajes.

### Enunciado
¿Qué valor de $k$ hace que $f(x) = x^2 + kx + 5$ tenga su mínimo en $x = 3$?

### Opciones
- [ ] A) $k = 6$
  <!-- feedback: Incorrecto. Error de signo: de $6+k=0$ se obtiene $k=-6$; con $k=6$ el mínimo estaría en $x=-3$. -->
- [x] B) $k = -6$
  <!-- feedback: Correcto. $f'(x)=2x+k$ y $f'(3)=6+k=0$ da $k=-6$. -->
- [ ] C) $k = -3$
  <!-- feedback: Incorrecto. Derivó $x^2$ como $x$: la derivada es $2x$, así que en $x=3$ queda $6+k=0$. -->
- [ ] D) $k = -\frac{14}{3}$
  <!-- feedback: Incorrecto. Resolvió $f(3)=9+3k+5=0$, que hace cero la función, no su derivada. -->

### Explicacion Pedagogica
El mínimo de una parábola con $a=1>0$ está donde $f'(x)=0$: $2x+k=0$, es decir $x=-\frac{k}{2}$. Para que sea $x=3$: $-\frac{k}{2}=3$, así que $k=-6$. Así $f(x)=x^2-6x+5$ y su mínimo es $f(3)=-4$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.62
**Contexto:** Un analista de una empresa de logística en Buenaventura estudia la función $f(x)=x^3-12x$ en el intervalo $[-3,5]$.

### Enunciado
Para $f(x) = x^3 - 12x$ en $[-3, 5]$, ¿cuál afirmación es correcta?

### Opciones
- [x] A) En $x=-2$ hay un máximo local, $f(-2)=16$, que no es el máximo absoluto; este es $f(5)=65$
  <!-- feedback: Correcto. Se comparan $f(-3)=9$, $f(-2)=16$, $f(2)=-16$, $f(5)=65$: el máximo absoluto está en el extremo $x=5$. -->
- [ ] B) El máximo absoluto es 16, en $x=-2$, porque allí $f'=0$
  <!-- feedback: Incorrecto. $f'=0$ solo produce candidatos; el extremo $x=5$ da $f(5)=125-60=65>16$. -->
- [ ] C) El mínimo absoluto es 9, en $x=-3$
  <!-- feedback: Incorrecto. $f(2)=8-24=-16<9$, así que el mínimo absoluto es $-16$, en $x=2$. -->
- [ ] D) No hay máximo absoluto porque $f$ crece sin límite
  <!-- feedback: Incorrecto. Eso ocurre en $\mathbb{R}$, pero en el intervalo cerrado $[-3,5]$ la función continua sí alcanza máximo. -->

### Explicacion Pedagogica
$f'(x)=3x^2-12=0$ da $x=\pm 2$. Valores: $f(-3)=-27+36=9$, $f(-2)=16$, $f(2)=-16$, $f(5)=65$. El máximo local en $x=-2$ no es absoluto: el máximo absoluto es 65 en $x=5$ y el mínimo absoluto es $-16$ en $x=2$.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.60
**Contexto:** Un sensor registra el caudal de agua de un acueducto veredal en Santander durante 4 horas; el caudal es continuo y su tasa de cambio fue positiva todo el tiempo.

### Enunciado
Sea $f$ continua en $[0, 4]$ y derivable en $(0, 4)$, con $f'(x) > 0$ para todo $x$ en $(0, 4)$. ¿Qué se puede concluir sobre sus extremos absolutos?

### Opciones
- [ ] A) No tiene extremos absolutos porque $f'$ nunca se anula
  <!-- feedback: Incorrecto. Que $f'$ no se anule solo descarta extremos interiores; en $[0,4]$ los extremos absolutos están en los bordes. -->
- [ ] B) El máximo absoluto está en $x=2$, el punto medio
  <!-- feedback: Incorrecto. Nada indica un cambio en $x=2$; una función creciente sigue aumentando hasta $x=4$. -->
- [ ] C) El máximo absoluto está en $x=0$ y el mínimo absoluto en $x=4$
  <!-- feedback: Incorrecto. Esa es la situación de una función decreciente ($f'<0$), no de una creciente. -->
- [x] D) El máximo absoluto está en $x=4$ y el mínimo absoluto en $x=0$
  <!-- feedback: Correcto. Con $f'>0$, $f$ es creciente: el menor valor está al inicio y el mayor al final. -->

### Explicacion Pedagogica
Si $f'(x)>0$ en $(0,4)$, $f$ es estrictamente creciente en $[0,4]$, así que $f(0)<f(x)<f(4)$ para $0<x<4$. Por el teorema del valor extremo hay máximo y mínimo; al no haber puntos críticos, se ubican en los extremos: mínimo en 0 y máximo en 4.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.58
**Contexto:** En una monitoría de cálculo en Neiva, una estudiante busca los extremos absolutos de $f(x)=-x^2+4x$ en el intervalo $[3,6]$.

### Enunciado
La estudiante escribe: "El vértice está en $x=2$, así que el máximo absoluto en $[3,6]$ es $f(2)=4$". ¿Cuál es la corrección adecuada?

### Opciones
- [ ] A) No hay error: el máximo absoluto es $f(2)=4$
  <!-- feedback: Incorrecto. El valor 4 se alcanza fuera del intervalo; en $[3,6]$ ningún punto da 4. -->
- [ ] B) El máximo absoluto es $f(6)=-12$, por ser el extremo derecho
  <!-- feedback: Incorrecto. $-12$ es el menor valor en $[3,6]$, ya que $f$ decrece allí; es el mínimo. -->
- [x] C) $x=2$ no pertenece a $[3,6]$; allí $f$ decrece, así que el máximo es $f(3)=3$ y el mínimo $f(6)=-12$
  <!-- feedback: Correcto. Solo cuentan los críticos dentro del intervalo; con $f'(x)=-2x+4<0$ en $[3,6]$, el máximo está en $x=3$. -->
- [ ] D) El vértice está en $x=4$, con $f(4)=0$
  <!-- feedback: Incorrecto. $x=4$ es una raíz de $f(x)=x(4-x)$, no el vértice; $f'(4)=-4\neq 0$. -->

### Explicacion Pedagogica
$f'(x)=-2x+4=0$ da $x=2$, que está fuera de $[3,6]$. En el intervalo $f'(x)<0$, así que $f$ decrece y se comparan solo los extremos: $f(3)=-9+12=3$ (máximo) y $f(6)=-36+24=-12$ (mínimo).

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Modelacion
**Expected_Success:** 0.56
**Contexto:** Un vendedor de arepas de Medellín observa que si cobra $p$ miles de COP por arepa, vende $q = 300 - 50p$ arepas al día.

### Enunciado
El ingreso diario es $R(p) = p\,(300 - 50p)$, en miles de COP. ¿Qué precio maximiza el ingreso y cuál es el ingreso máximo?

### Opciones
- [ ] A) $p=6$ mil COP
  <!-- feedback: Incorrecto. Derivó $-50p^2$ como $-50p$ y resolvió $300-50p=0$; además con $p=6$ no se vende ninguna arepa. -->
- [x] B) $p=3$ mil COP, con ingreso de 450 mil COP
  <!-- feedback: Correcto. $R'(p)=300-100p=0$ da $p=3$ y $R(3)=3\cdot 150=450$. -->
- [ ] C) $p=3$ mil COP, con ingreso de 150 mil COP
  <!-- feedback: Incorrecto. 150 es la cantidad de arepas vendidas, $q=300-150$; el ingreso es $p\cdot q=3\cdot 150=450$. -->
- [ ] D) $p=3$ mil COP, con ingreso de 900 mil COP
  <!-- feedback: Incorrecto. Olvidó restar el término $50p^2=450$: $R(3)=900-450=450$. -->

### Explicacion Pedagogica
$R(p)=300p-50p^2$, así que $R'(p)=300-100p=0$ da $p=3$. Como $R''(p)=-100<0$, es máximo. Se venden $300-150=150$ arepas y el ingreso es $3\cdot 150=450$ mil COP.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.54
**Contexto:** En un club de matemáticas de Pasto se discute si todo punto donde la derivada vale cero es necesariamente un máximo o un mínimo.

### Enunciado
¿Cuál de las siguientes funciones tiene un punto crítico en $x=0$ que NO es máximo ni mínimo local?

### Opciones
- [ ] A) $f(x) = x^2 + 1$
  <!-- feedback: Incorrecto. $f'(0)=0$ y $x^2+1\ge 1=f(0)$: en $x=0$ hay un mínimo. -->
- [ ] B) $f(x) = -x^2$
  <!-- feedback: Incorrecto. $f'(0)=0$ y $-x^2\le 0=f(0)$: en $x=0$ hay un máximo. -->
- [ ] C) $f(x) = x^4$
  <!-- feedback: Incorrecto. $f'(0)=0$ y $x^4\ge 0=f(0)$: en $x=0$ hay un mínimo, aunque la parábola sea más plana. -->
- [x] D) $f(x) = x^3 + 2$
  <!-- feedback: Correcto. $f'(x)=3x^2$ vale 0 en $x=0$, pero $f$ crece a ambos lados: $f(-0.1)<2<f(0.1)$. -->

### Explicacion Pedagogica
Que $f'(c)=0$ es condición necesaria pero no suficiente para un extremo. En $f(x)=x^3+2$, $f'(x)=3x^2\ge 0$, así que $f$ es creciente: a la izquierda de 0 vale menos de 2 y a la derecha más de 2. Por eso $x=0$ es crítico y no es extremo.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Algebraico
**Expected_Success:** 0.52
**Contexto:** Un ingeniero de una empresa de energía solar en La Guajira estudia la familia de modelos $f(x)=x^3+ax$ y quiere saber cuándo no tiene puntos críticos.

### Enunciado
¿Para qué valores de $a$ la función $f(x) = x^3 + ax$ no tiene puntos críticos?

### Opciones
- [ ] A) Para $a < 0$
  <!-- feedback: Incorrecto. Si $a<0$, $3x^2+a=0$ tiene dos soluciones $x=\pm\sqrt{-\frac{a}{3}}$. -->
- [ ] B) Solo para $a = 0$
  <!-- feedback: Incorrecto. Con $a=0$, $f'(x)=3x^2$ se anula en $x=0$, que es un punto crítico. -->
- [x] C) Para $a > 0$
  <!-- feedback: Correcto. $f'(x)=3x^2+a>0$ para todo $x$ si $a>0$, así que nunca se anula. -->
- [ ] D) Para todo valor real de $a$
  <!-- feedback: Incorrecto. Para $a\le 0$ la ecuación $3x^2=-a$ tiene solución real, de modo que sí hay críticos. -->

### Explicacion Pedagogica
Como $f$ es un polinomio, sus puntos críticos son las soluciones de $f'(x)=3x^2+a=0$, es decir $x^2=-\frac{a}{3}$. Esta ecuación no tiene solución real exactamente cuando $-\frac{a}{3}<0$, o sea $a>0$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.50
**Contexto:** Una empresa de café de Huila quiere determinar la producción que maximiza su utilidad semanal $U$, que es continua en el rango posible $[a,b]$ de producción.

### Enunciado
¿Cuál procedimiento garantiza encontrar el máximo absoluto de una función continua y derivable $f$ en un intervalo cerrado $[a, b]$?

### Opciones
- [ ] A) Resolver $f'(x)=0$ y tomar la solución con el mayor valor de $x$
  <!-- feedback: Incorrecto. El mayor $x$ no implica el mayor $f(x)$; además se ignoran los extremos del intervalo. -->
- [ ] B) Evaluar $f$ solo en $a$ y en $b$
  <!-- feedback: Incorrecto. El máximo puede estar en un punto interior, como el vértice de una parábola que abre hacia abajo. -->
- [ ] C) Buscar dónde $f''(x)<0$, porque allí está siempre el máximo absoluto
  <!-- feedback: Incorrecto. $f''<0$ indica concavidad hacia abajo en un intervalo, no ubica el máximo absoluto. -->
- [x] D) Hallar los puntos críticos en $(a,b)$, evaluar $f$ en ellos y en $a$ y $b$, y escoger el mayor valor
  <!-- feedback: Correcto. Es el método del intervalo cerrado: el máximo está en un crítico interior o en un extremo. -->

### Explicacion Pedagogica
Por el teorema del valor extremo el máximo absoluto existe, y por el teorema de Fermat solo puede estar en un punto crítico interior o en $a$ o $b$. Por eso se evalúa $f$ en todos esos candidatos y se compara: el mayor valor es el máximo absoluto.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.48
**Contexto:** Dos estudiantes de un colegio de Cúcuta analizan $f(x)=x^4-4x^3$ en todos los reales y llegan a conclusiones distintas.

### Enunciado
¿Cuál conclusión sobre los extremos de $f(x) = x^4 - 4x^3$ es correcta?

### Opciones
- [x] A) El mínimo absoluto es $-27$, en $x=3$; $x=0$ es crítico pero no es extremo
  <!-- feedback: Correcto. $f'(x)=4x^2(x-3)$ es negativa a ambos lados de 0 y cambia a positiva en 3. -->
- [ ] B) Hay un máximo local en $x=0$ y un mínimo en $x=3$
  <!-- feedback: Incorrecto. $f'(-1)=-16<0$ y $f'(1)=-8<0$: $f$ decrece a ambos lados de 0, así que no hay máximo allí. -->
- [ ] C) El mínimo absoluto es $0$, en $x=0$
  <!-- feedback: Incorrecto. $f(3)=81-108=-27<0$, de modo que 0 no es el menor valor. -->
- [ ] D) El mínimo absoluto es $189$, en $x=-3$
  <!-- feedback: Incorrecto. Tomó el crítico con signo cambiado: $f'(-3)\neq 0$, y $f(-3)=189$ es mucho mayor que $f(3)$. -->

### Explicacion Pedagogica
$f'(x)=4x^3-12x^2=4x^2(x-3)$, con críticos $x=0$ y $x=3$. El factor $4x^2\ge 0$ no cambia de signo, así que $f'<0$ para $x<3$ (salvo en 0) y $f'>0$ para $x>3$. Entonces $x=0$ no es extremo y $f(3)=81-108=-27$ es el mínimo absoluto.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Modelacion
**Expected_Success:** 0.47
**Contexto:** Una cooperativa cafetera del Huila tiene una utilidad semanal $U(x)=-x^2+100x-1600$ (miles de COP), pero su beneficiadero solo puede procesar como máximo 40 sacos.

### Enunciado
Con $0 \le x \le 40$, ¿cuántos sacos debe procesar la cooperativa para obtener la mayor utilidad y cuál es esa utilidad?

### Opciones
- [ ] A) 50 sacos, con utilidad de 900 miles de COP
  <!-- feedback: Incorrecto. Ignoró la capacidad: $x=50$ no es posible porque el límite es 40 sacos. -->
- [x] B) 40 sacos, con utilidad de 800 miles de COP
  <!-- feedback: Correcto. El vértice $x=50$ está fuera de $[0,40]$; como $U$ crece en ese intervalo, el máximo es $U(40)=800$. -->
- [ ] C) 20 sacos, con utilidad de 0
  <!-- feedback: Incorrecto. $x=20$ es el punto de equilibrio, donde $U(20)=0$; no maximiza nada. -->
- [ ] D) No se puede maximizar porque el vértice está fuera del intervalo
  <!-- feedback: Incorrecto. $U$ es continua en $[0,40]$ y alcanza máximo; simplemente ocurre en el extremo $x=40$. -->

### Explicacion Pedagogica
$U'(x)=-2x+100=0$ da $x=50$, fuera de $[0,40]$. En $[0,40]$, $U'(x)>0$, así que $U$ es creciente y el máximo está en $x=40$: $U(40)=-1600+4000-1600=800$ mil COP. La restricción de capacidad cambia la respuesta.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W15-maximos-minimos-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.45
**Contexto:** En un semillero de investigación de la Universidad del Valle se formulan afirmaciones generales sobre extremos de polinomios en todos los reales.

### Enunciado
¿Cuál de las siguientes afirmaciones sobre polinomios definidos en $\mathbb{R}$ es verdadera?

### Opciones
- [x] A) Un polinomio de grado impar no tiene máximo ni mínimo absolutos, aunque puede tener extremos locales
  <!-- feedback: Correcto. Un polinomio de grado impar tiende a $+\infty$ en un sentido y a $-\infty$ en el otro; $x^3-3x$ tiene extremos locales en $\pm 1$. -->
- [ ] B) Todo polinomio de grado 3 tiene exactamente un máximo local y un mínimo local
  <!-- feedback: Incorrecto. $x^3$ es de grado 3 y no tiene extremos locales, pues $3x^2\ge 0$ no cambia de signo. -->
- [ ] C) Si un polinomio tiene un máximo local, ese máximo es absoluto
  <!-- feedback: Incorrecto. $x^3-3x$ tiene máximo local $f(-1)=2$, pero $f(3)=18>2$. -->
- [ ] D) Un polinomio de grado par siempre tiene máximo absoluto
  <!-- feedback: Incorrecto. $x^2$ es de grado par y crece sin cota: tiene mínimo absoluto, no máximo. -->

### Explicacion Pedagogica
Si el grado es impar, $p(x)\to\pm\infty$ en extremos opuestos, así que toma valores arbitrariamente grandes y pequeños: no hay extremos absolutos. Aun así, $x^3-3x$ tiene máximo local en $-1$ y mínimo local en $1$. Los contraejemplos $x^3$ y $x^2$ refutan las demás afirmaciones.
