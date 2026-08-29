---
id: "CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle"
country: "colombia"
grado: 11
asignatura: "matematicas"
tema: "volumen-integrales"
periodo: "weekly"
week: "W26"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Volumen con Integrales - Grado 11

Este bundle contiene 20 preguntas sobre **Volumen con Integrales** para grado 11, alineadas con los DBA y Estándares Básicos de Competencias del MEN Colombia.

## Question 1 [D3-D4]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Formulacion
**Expected_Success:** 0.85
**Contexto:** En Bogotá, Juan diseña un tanque de agua cuya sección transversal es cuadrada de lado $s(x) = x+1$ en $[0, 3]$.

### Enunciado
Usando el método de secciones transversales conocidas ($V = \int A(x) dx$), ¿cuál es el volumen del tanque?

### Opciones
- [x] A) 21
  <!-- feedback: Correcto. $A(x) = (x+1)^2 = x^2 + 2x + 1$. $\int_0^3 (x^2+2x+1) dx = [\frac{x^3}{3} + x^2 + x]_0^3 = 9 + 9 + 3 = 21$. -->
- [ ] B) 27
  <!-- feedback: Incorrecto. Se evaluó $(3+1)^2 = 16$ sin integrar. -->
- [ ] C) 18
  <!-- feedback: Incorrecto. Error al sumar la integral del término lineal. -->
- [ ] D) 12
  <!-- feedback: Incorrecto. No se elevaron al cuadrado los lados de la sección. -->

### Explicacion Pedagogica
Para secciones cuadradas, $A(x) = s(x)^2 = (x+1)^2$. $V = \int_0^3 (x^2+2x+1)dx = \left[ \frac{27}{3} + 9 + 3 \right] = 21$.

## Question 2 [D3-D4]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Razonamiento
**Expected_Success:** 0.85
**Contexto:** En Medellín, Valentina calcula el volumen de una pirámide de altura $H=4$ y base cuadrada de lado $B=4$ mediante integrales.

### Enunciado
Sabiendo que el área transversal a la altura $x$ es $A(x) = x^2$, ¿cuál es el volumen total de la pirámide?

### Opciones
- [x] A) $\frac{64}{3}$
  <!-- feedback: Correcto. $V = \int_0^4 x^2 \, dx = [\frac{x^3}{3}]_0^4 = \frac{64}{3}$. -->
- [ ] B) 64
  <!-- feedback: Incorrecto. Se omitió dividir entre 3. -->
- [ ] C) 16
  <!-- feedback: Incorrecto. Se multiplicó la base por la altura sin la constante de integración de la pirámide. -->
- [ ] D) 32
  <!-- feedback: Incorrecto. Error al integrar el término cuadrático. -->

### Explicacion Pedagogica
$V = \int_0^H A(x) dx = \int_0^4 x^2 dx = \frac{4^3}{3} = \frac{64}{3}$. Coincide con $V = \frac{1}{3} A_{base} H = \frac{1}{3}(16)(4) = \frac{64}{3}$.

## Question 3 [D3-D4]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Resolucion
**Expected_Success:** 0.85
**Contexto:** En Cali, Mateo evalúa el volumen de una rampa con secciones transversales semicirculares de radio $r(x) = \sqrt{x}$ en $[0, 4]$.

### Enunciado
Usando $A(x) = \frac{1}{2}\pi r(x)^2$, ¿cuál es el volumen?

### Opciones
- [x] A) $4\pi$
  <!-- feedback: Correcto. $A(x) = \frac{1}{2}\pi x$. $V = \frac{\pi}{2} \int_0^4 x \, dx = \frac{\pi}{2} [\frac{x^2}{2}]_0^4 = \frac{\pi}{2}(8) = 4\pi$. -->
- [ ] B) $8\pi$
  <!-- feedback: Incorrecto. Se olvidó dividir por 2 para el área del semicírculo. -->
- [ ] C) $2\pi$
  <!-- feedback: Incorrecto. Se dividió por 2 dos veces de más. -->
- [ ] D) $16\pi$
  <!-- feedback: Incorrecto. Se usó el área de un círculo completo de radio $x$. -->

### Explicacion Pedagogica
$A(x) = \frac{1}{2}\pi (\sqrt{x})^2 = \frac{\pi}{2} x$. Integrando de 0 a 4: $\frac{\pi}{2} [\frac{16}{2}] = 4\pi$.

## Question 4 [D3-D4]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v4
**Bloom:** Understand
**ICFES:** Formulacion
**Expected_Success:** 0.85
**Contexto:** En Barranquilla, Camila calcula la longitud de arco $L$ de la curva $y = 2x$ desde $x=0$ hasta $x=3$.

### Enunciado
Usando $L = \int_a^b \sqrt{1 + (f'(x))^2} dx$, ¿cuál es la longitud exacta del segmento?

### Opciones
- [x] A) $3\sqrt{5}$
  <!-- feedback: Correcto. $f'(x) = 2 \implies \sqrt{1 + 2^2} = \sqrt{5}$. $L = \int_0^3 \sqrt{5} \, dx = 3\sqrt{5}$. -->
- [ ] B) 6
  <!-- feedback: Incorrecto. Se tomó la diferencia de ordenadas $\Delta y = 6$. -->
- [ ] C) 3
  <!-- feedback: Incorrecto. Se tomó únicamente la diferencia de abscisas $\Delta x = 3$. -->
- [ ] D) 9
  <!-- feedback: Incorrecto. Se multiplicaron ambas diferencias. -->

### Explicacion Pedagogica
Por fórmula de arco: $L = \int_0^3 \sqrt{1 + 4} dx = \sqrt{5} \int_0^3 dx = 3\sqrt{5}$. Coincide con la distancia euclidiana entre $(0,0)$ y $(3,6)$.

## Question 5 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.70
**Contexto:** En Cartagena, Santiago analiza la masa total $M$ de una varilla recta de 2 metros con densidad lineal variable $\rho(x) = 3x^2$ kg/m.

### Enunciado
Usando $M = \int_0^2 \rho(x) dx$, ¿cuál es la masa total de la varilla?

### Opciones
- [x] A) 8 kg
  <!-- feedback: Correcto. $M = \int_0^2 3x^2 \, dx = [x^3]_0^2 = 8$ kg. -->
- [ ] B) 12 kg
  <!-- feedback: Incorrecto. Se sustituyó $x=2$ directamente en la densidad $3(2^2) = 12$. -->
- [ ] C) 4 kg
  <!-- feedback: Incorrecto. Error al antiderivar $3x^2$. -->
- [ ] D) 16 kg
  <!-- feedback: Incorrecto. Se multiplicó por la longitud de 2 m dos veces. -->

### Explicacion Pedagogica
La masa de una varilla no homogénea es la integral de la densidad lineal: $M = \int_0^2 3x^2 dx = [x^3]_0^2 = 8$ kg.

## Question 6 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.70
**Contexto:** En Bucaramanga, Sofia determina el centroide $\bar{x}$ de una región homogénea limitada por $y = x$ y el eje $x$ en $[0, 2]$.

### Enunciado
Sabiendo que el área es $A = 2$ y $M_y = \int_0^2 x f(x) dx = \int_0^2 x^2 dx = \frac{8}{3}$, ¿cuál es la coordenada $\bar{x} = \frac{M_y}{A}$?

### Opciones
- [x] A) $\frac{4}{3}$
  <!-- feedback: Correcto. $\bar{x} = \frac{8/3}{2} = \frac{4}{3}$. -->
- [ ] B) 1
  <!-- feedback: Incorrecto. 1 es el punto medio del intervalo, no el centroide de un triángulo. -->
- [ ] C) $\frac{2}{3}$
  <!-- feedback: Incorrecto. Se dividió $8/3$ entre 4 en lugar de entre $A=2$. -->
- [ ] D) $\frac{8}{3}$
  <!-- feedback: Incorrecto. Es el momento $M_y$, falta dividir por el área $A$. -->

### Explicacion Pedagogica
El centroide en $x$ de un triángulo de base 2 apoyado en el origen está a $2/3$ de la base respecto al origen: $\bar{x} = \frac{2}{3}(2) = \frac{4}{3}$.

## Question 7 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v7
**Bloom:** Apply
**ICFES:** Formulacion
**Expected_Success:** 0.70
**Contexto:** En Manizales, Alejandro calcula el trabajo $W$ requerido para estirar un resorte $0.5$ m si la fuerza es $F(x) = 100x$ N.

### Enunciado
Usando $W = \int_0^{0.5} 100x \, dx$, ¿cuál es el trabajo realizado en Joules?

### Opciones
- [x] A) 12.5 J
  <!-- feedback: Correcto. $W = \int_0^{0.5} 100x \, dx = [50 x^2]_0^{0.5} = 50(0.25) = 12.5$ J. -->
- [ ] B) 25 J
  <!-- feedback: Incorrecto. Se omitió el factor 1/2 de la integración $100(0.25) = 25$. -->
- [ ] C) 50 J
  <!-- feedback: Incorrecto. Se multiplicó la fuerza máxima $50$ N por la distancia $0.5$ m sin integrar. -->
- [ ] D) 6.25 J
  <!-- feedback: Incorrecto. Error al elevar $0.5$ al cuadrado. -->

### Explicacion Pedagogica
$W = \int_0^{0.5} 100x dx = \left[ 50x^2 \right]_0^{0.5} = 50(0.25) = 12.5$ Joules.

## Question 8 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v8
**Bloom:** Apply
**ICFES:** Razonamiento
**Expected_Success:** 0.70
**Contexto:** En Pereira, Daniela determina la fuerza de presión hidrostática $F$ sobre una placa vertical rectangular de ancho 2 m y altura 3 m sumergida en agua (densidad $\rho g = 10000$ N/m$^3$).

### Enunciado
Sabiendo que $F = \rho g \int_0^3 y \cdot 2 \, dy$, ¿cuál es la fuerza total sobre la placa?

### Opciones
- [x] A) 90,000 N
  <!-- feedback: Correcto. $F = 20000 \int_0^3 y \, dy = 20000 [\frac{y^2}{2}]_0^3 = 20000(4.5) = 90000$ N. -->
- [ ] B) 180,000 N
  <!-- feedback: Incorrecto. Se olvidó dividir entre 2 la integral de $y$. -->
- [ ] C) 60,000 N
  <!-- feedback: Incorrecto. Se multiplicó la presión promedio por el área sin integrar. -->
- [ ] D) 45,000 N
  <!-- feedback: Incorrecto. Error al evaluar el área de la placa. -->

### Explicacion Pedagogica
$F = 20000 \left[ \frac{9}{2} \right] = 90000$ N.

## Question 9 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v9
**Bloom:** Apply
**ICFES:** Resolucion
**Expected_Success:** 0.70
**Contexto:** En Cúcuta, Nicolas calcula la superficie de revolución $S$ generada al rotar $y = x$ en $[0, 1]$ alrededor del eje $x$.

### Enunciado
Usando $S = 2\pi \int_0^1 x \sqrt{1 + 1^2} dx = 2\sqrt{2}\pi \int_0^1 x dx$, ¿cuál es el área de la superficie del cono?

### Opciones
- [x] A) $\sqrt{2}\pi$
  <!-- feedback: Correcto. $S = 2\sqrt{2}\pi [\frac{x^2}{2}]_0^1 = \sqrt{2}\pi$. -->
- [ ] B) $2\sqrt{2}\pi$
  <!-- feedback: Incorrecto. No se dividió entre 2 al integrar $x$. -->
- [ ] C) $\pi$
  <!-- feedback: Incorrecto. Se omitió la inclinación de la generatriz $\sqrt{2}$. -->
- [ ] D) $2\pi$
  <!-- feedback: Incorrecto. Error al calcular la antiderivada. -->

### Explicacion Pedagogica
Área lateral del cono $S = \pi r l = \pi (1) (\sqrt{1^2+1^2}) = \sqrt{2}\pi$. Integrando: $2\sqrt{2}\pi [1/2] = \sqrt{2}\pi$.

## Question 10 [D5-D6]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v10
**Bloom:** Apply
**ICFES:** Formulacion
**Expected_Success:** 0.70
**Contexto:** En Ibagué, Mariana encuentra el valor medio $f_{prom}$ de la función $f(x) = 3x^2$ en el intervalo $[0, 2]$.

### Enunciado
Usando $f_{prom} = \frac{1}{b-a} \int_a^b f(x) dx$, ¿cuál es el valor promedio de la función?

### Opciones
- [x] A) 4
  <!-- feedback: Correcto. $\int_0^2 3x^2 dx = 8$. Luego $f_{prom} = \frac{8}{2 - 0} = 4$. -->
- [ ] B) 8
  <!-- feedback: Incorrecto. Es el valor acumulado de la integral, falta dividir por la longitud del intervalo $b-a=2$. -->
- [ ] C) 6
  <!-- feedback: Incorrecto. Se promediaron los valores en los extremos $f(0)=0$ y $f(2)=12$ ($12/2=6$). -->
- [ ] D) 2
  <!-- feedback: Incorrecto. Error al evaluar la división entre el intervalo. -->

### Explicacion Pedagogica
El valor medio de una función en $[a,b]$ es $f_{prom} = \frac{1}{b-a} \int_a^b f(x) dx = \frac{1}{2} [x^3]_0^2 = \frac{8}{2} = 4$.

## Question 11 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v11
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.55
**Contexto:** En Pasto, Carlos analiza la convergencia de la integral que calcula el volumen generado al girar $y = \frac{{1}}{{\sqrt{{x}}}}$ en $(0, 1]$ sobre el eje $x$.

### Enunciado
¿Es convergente la integral del volumen $V = \pi \int_0^1 \frac{1}{x} dx$?

### Opciones
- [x] A) Diverge a infinito.
  <!-- feedback: Correcto. $\int_0^1 x^{-1} dx = [\ln|x|]_0^1 = 0 - (-\infty) = +\infty$. -->
- [ ] B) Converge a $\pi$.
  <!-- feedback: Incorrecto. La integral de $1/x$ en el origen no converge. -->
- [ ] C) Converge a $2\pi$.
  <!-- feedback: Incorrecto. Se confundió con la integral de $x^{-1/2}$ en área. -->
- [ ] D) Converge a 0.
  <!-- feedback: Incorrecto. El integrando es positivo no acotado. -->

### Explicacion Pedagogica
$\int_0^1 \frac{1}{x} dx$ es una integral impropia divergente de tipo $p=1$ ($p \le 1$ diverge). El volumen es infinito.

## Question 12 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v12
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.55
**Contexto:** En Santa Marta, Gabriela evalúa el volumen de un sólido con base circular $x^2 + y^2 \le 4$ y secciones transversales cuadradas perpendiculares al eje $x$.

### Enunciado
Sabiendo que el lado de cada cuadrado es $s(x) = 2\sqrt{4 - x^2}$ y $A(x) = 4(4 - x^2)$, ¿cuál es el volumen total?

### Opciones
- [x] A) $\frac{128}{3}$
  <!-- feedback: Correcto. $V = \int_{-2}^2 (16 - 4x^2) dx = 2 [16x - \frac{4x^3}{3}]_0^2 = 2 (32 - \frac{32}{3}) = 2 (\frac{64}{3}) = \frac{128}{3}$. -->
- [ ] B) $\frac{64}{3}$
  <!-- feedback: Incorrecto. Se integró solo en el semieje positivo $[0,2]$ sin multiplicar por 2. -->
- [ ] C) 64
  <!-- feedback: Incorrecto. Error al restar la fracción en la integral. -->
- [ ] D) 32
  <!-- feedback: Incorrecto. No se tuvo en cuenta que la altura del cuadrado es el doble del radio vertical. -->

### Explicacion Pedagogica
Ancho del cuadrado $2y = 2\sqrt{4-x^2}$. Área $A(x) = 4(4-x^2)$. $V = 4 \int_{-2}^2 (4-x^2) dx = 8 [4(2) - 8/3] = \frac{128}{3}$.

## Question 13 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v13
**Bloom:** Analyze
**ICFES:** Formulacion
**Expected_Success:** 0.55
**Contexto:** En Villavicencio, Andres examina el Teorema del Valor Medio para Integrales sobre $f(x) = x^2$ en $[0, 3]$.

### Enunciado
¿Existe un punto $c \in (0, 3)$ tal que $f(c) = f_{prom}$ y cuál es su valor?

### Opciones
- [x] A) Sí, $c = \sqrt{3} \approx 1.73$
  <!-- feedback: Correcto. $f_{prom} = \frac{1}{3} \int_0^3 x^2 dx = \frac{9}{3} = 3$. $f(c) = c^2 = 3 \implies c = \sqrt{3}$. -->
- [ ] B) Sí, $c = 1.5$
  <!-- feedback: Incorrecto. 1.5 es el punto medio del intervalo, pero la función es cuadrática, no lineal. -->
- [ ] C) Sí, $c = 2$
  <!-- feedback: Incorrecto. $f(2) = 4 \neq 3$. -->
- [ ] D) No existe dicho punto $c$.
  <!-- feedback: Incorrecto. El Teorema del Valor Medio garantiza su existencia para toda función continua. -->

### Explicacion Pedagogica
Como $f$ es continua en $[0,3]$, existe $c$ tal que $c^2 = f_{prom} = 3 \implies c = \sqrt{3} \in (0,3)$.

## Question 14 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v14
**Bloom:** Analyze
**ICFES:** Razonamiento
**Expected_Success:** 0.55
**Contexto:** En Armenia, Isabella calcula la longitud de arco de la curva $y = \frac{2}{3} x^{3/2}$ en $[0, 3]$.

### Enunciado
¿Cuál es la longitud exacta de la curva?

### Opciones
- [x] A) $\frac{14}{3}$
  <!-- feedback: Correcto. $f'(x) = x^{1/2} \implies 1 + (f')^2 = 1 + x$. $L = \int_0^3 \sqrt{1+x} \, dx = [\frac{2}{3}(1+x)^{3/2}]_0^3 = \frac{2}{3}(8 - 1) = \frac{14}{3}$. -->
- [ ] B) $\frac{16}{3}$
  <!-- feedback: Incorrecto. Se olvidó restar la evaluación en el límite inferior $(1)^{3/2} = 1$. -->
- [ ] C) 7
  <!-- feedback: Incorrecto. No se multiplicó por el factor $\frac{2}{3}$ de la antiderivada. -->
- [ ] D) $\frac{8}{3}$
  <!-- feedback: Incorrecto. Error al calcular $4^{3/2} = 8$. -->

### Explicacion Pedagogica
$L = \int_0^3 (1+x)^{1/2} dx = \left[ \frac{2}{3}(1+x)^{3/2} \right]_0^3 = \frac{2}{3} (4^{3/2} - 1) = \frac{2}{3}(8 - 1) = \frac{14}{3}$.

## Question 15 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v15
**Bloom:** Analyze
**ICFES:** Resolucion
**Expected_Success:** 0.55
**Contexto:** En Neiva, Felipe compara los métodos de discos y cascarones para calcular el volumen de un sólido simétrico.

### Enunciado
¿En qué condición es preferible utilizar el método de cascarones cilíndricos sobre el método de discos?

### Opciones
- [x] A) Cuando la región rota alrededor de un eje vertical y la función está despejada de la forma $y = f(x)$.
  <!-- feedback: Correcto. Cascarones evita tener que despejar $x = g(y)$, lo cual puede ser algebraicamente complejo o imposible. -->
- [ ] B) Únicamente cuando la región no toca el eje de rotación.
  <!-- feedback: Incorrecto. Ambos métodos funcionan independientemente de si toca o no el eje. -->
- [ ] C) Solo cuando el sólido es una esfera perfecta.
  <!-- feedback: Incorrecto. Aplica a cualquier sólido de revolución. -->
- [ ] D) Cuando las secciones transversales son siempre rectangulares.
  <!-- feedback: Incorrecto. Cascarones genera envolventes cilíndricas céntricas. -->

### Explicacion Pedagogica
Cascarones permite integrar respecto a $x$ cuando se gira alrededor de un eje vertical, evitando invertir $y=f(x)$.

## Question 16 [D7-D8]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v16
**Bloom:** Analyze
**ICFES:** Formulacion
**Expected_Success:** 0.55
**Contexto:** En Popayán, Lucia calcula el centroide de un semicírculo $y = \sqrt{{R^2 - x^2}}$ de radio $R$ respecto al eje $y$.

### Enunciado
Por simetría, ¿cuál es la coordenada $\bar{x}$ del centroide?

### Opciones
- [x] A) $\bar{x} = 0$
  <!-- feedback: Correcto. Al ser una figura simétrica respecto al eje $y$, el centro de masa en la dirección $x$ se encuentra en 0. -->
- [ ] B) $\bar{x} = \frac{4R}{3\pi}$
  <!-- feedback: Incorrecto. Esta es la coordenada vertical $\bar{y}$, no $\bar{x}$. -->
- [ ] C) $\bar{x} = R/2$
  <!-- feedback: Incorrecto. La masa está distribuida simétricamente a izquierda y derecha. -->
- [ ] D) $\bar{x} = R$
  <!-- feedback: Incorrecto. Corresponde al extremo del intervalo. -->

### Explicacion Pedagogica
Por simetría axial respecto a $x=0$, el primer momento de área $M_y = 0$, por lo que $\bar{x} = \frac{M_y}{A} = 0$.

## Question 17 [D9-D10]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.40
**Contexto:** En Montería, Diego analiza la energía o trabajo requerido para bombear todo el agua de un tanque cilíndrico de radio $R$ y altura $H$ hasta el borde superior.

### Enunciado
Sabiendo que la masa de cada disco a profundidad $y$ recorre una distancia $y$, ¿cuál es la integral del trabajo total?

### Opciones
- [x] A) $W = \rho g \pi R^2 \int_0^H y \, dy = \frac{1}{2} \rho g \pi R^2 H^2$
  <!-- feedback: Correcto. Cada capa de volumen $\pi R^2 dy$ tiene fuerza $\rho g \pi R^2 dy$ y se eleva una distancia $y$. -->
- [ ] B) $W = \rho g \pi R^2 H^2$
  <!-- feedback: Incorrecto. Se omitió integrar $y$, multiplicando directamente por la altura total. -->
- [ ] C) $W = \frac{1}{3} \rho g \pi R^2 H^2$
  <!-- feedback: Incorrecto. $1/3$ aplicaría a un tanque cónico. -->
- [ ] D) $W = \rho g \pi R^2 H$
  <!-- feedback: Incorrecto. Corresponde a la masa/peso total del agua, no al trabajo de elevación. -->

### Explicacion Pedagogica
$W = \int_0^H (\rho g \pi R^2 dy) y = \rho g \pi R^2 [\frac{y^2}{2}]_0^H = \frac{1}{2} \rho g \pi R^2 H^2$.

## Question 18 [D9-D10]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**ICFES:** Resolucion
**Expected_Success:** 0.40
**Contexto:** En Tunja, Paula evalúa el volumen de una pirámide de altura $H$ y área de base $A_0$ mediante integración por secciones transversales.

### Enunciado
Sabiendo que el área a distancia $x$ del vértice es $A(x) = A_0 \left(\frac{x}{H}\right)^2$, ¿se demuestra que $V = \frac{1}{3} A_0 H$?

### Opciones
- [x] A) Sí, porque $V = \frac{A_0}{H^2} \int_0^H x^2 dx = \frac{A_0}{H^2} \left( \frac{H^3}{3} \right) = \frac{1}{3} A_0 H$.
  <!-- feedback: Correcto. Demostración analítica rigurosa del volumen de cualquier pirámide o cono. -->
- [ ] B) No, el resultado correcto por integración es $\frac{1}{2} A_0 H$.
  <!-- feedback: Incorrecto. El factor es $1/3$ debido al integrando cuadrático de área de sección. -->
- [ ] C) No, solo es válido para pirámides cuadradas.
  <!-- feedback: Incorrecto. Es válido para cualquier forma de base $A_0$ por semejanza geométrica. -->
- [ ] D) Sí, pero requiere usar coordenadas polares obligatoriamente.
  <!-- feedback: Incorrecto. Basta con integración definida simple en una dimensión. -->

### Explicacion Pedagogica
El área de cualquier sección transversal a distancia $x$ de la cúspide varía como $x^2$. Integrando da $\frac{1}{3} A_0 H$.

## Question 19 [D9-D10]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**ICFES:** Formulacion
**Expected_Success:** 0.40
**Contexto:** En Riohacha, Samuel evalúa el Segundo Teorema de Pappus para el área de una superficie de revolución $S = 2\pi \bar{y} L$.

### Enunciado
Para una circunferencia de radio $r$ cuyo centro está a distancia $R > r$ del eje de rotación, ¿cuál es la superficie del toro resultante?

### Opciones
- [x] A) $4\pi^2 R r$
  <!-- feedback: Correcto. Perímetro de la curva generadora $L = 2\pi r$, distancia recorrida por su centroide $\bar{y} = R \implies S = (2\pi R)(2\pi r) = 4\pi^2 R r$. -->
- [ ] B) $2\pi^2 R r$
  <!-- feedback: Incorrecto. Se olvidó duplicar uno de los factores de circunferencia. -->
- [ ] C) $4\pi R r^2$
  <!-- feedback: Incorrecto. Se elevó $r$ al cuadrado, lo cual correspondería a volumen. -->
- [ ] D) $2\pi R r$
  <!-- feedback: Incorrecto. Se omitieron los factores cuadráticos de $\pi$. -->

### Explicacion Pedagogica
Segundo Teorema de Pappus: Superficie = (Distancia recorrida por centroide de curva) $\times$ (Longitud de curva) $= (2\pi R)(2\pi r) = 4\pi^2 R r$.

## Question 20 [D9-D10]
**ID:** CO-MAT-11-2026-W26-volumen-integrales-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**ICFES:** Razonamiento
**Expected_Success:** 0.40
**Contexto:** En Florencia, Andrea analiza la convergencia de la longitud de arco de la curva $y = x^2$ en $[0, 1]$.

### Enunciado
¿La longitud de arco $L = \int_0^1 \sqrt{1 + 4x^2} dx$ es finita y cuál es su solución analítica estándar?

### Opciones
- [x] A) Es finita y se resuelve mediante sustitución trigonométrica $2x = \tan(\theta)$.
  <!-- feedback: Correcto. El integrando es continuo y acotado en $[0,1]$, y la forma $\sqrt{1+u^2}$ se integra mediante sustitución por tangente. -->
- [ ] B) Es infinita por tener un término cuadrático.
  <!-- feedback: Incorrecto. Integrar una función continua en un intervalo cerrado da un valor finito. -->
- [ ] C) Se resuelve simplemente como $\frac{1+4x^2}{2}$.
  <!-- feedback: Incorrecto. La raíz cuadrada no se puede separar algebraicamente. -->
- [ ] D) No se puede calcular por ningún método conocido.
  <!-- feedback: Incorrecto. Es una integral estándar en los manuales de cálculo. -->

### Explicacion Pedagogica
La integral $\int \sqrt{1+u^2} du$ se resuelve con $u = \tan(\theta)$ o integración por partes, entregando una combinación de secante y logaritmo natural.
