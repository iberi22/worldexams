---
id: "CO-MAT-11-P2-aplicaciones-001-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
periodo: 2
bundle_index: 2
modern_context: true
calibration:
  expected_success_rate: 0.45
  discrimination_index_target: ">= 0.28"
  simulated_responses: 100
rubric_baseline: "maximos_minimos, optimizacion_geometrica, analisis_marginal"
---

# Bundle Mastery: Aplicaciones de la Derivada

Este bundle evalúa la capacidad de utilizar el cálculo diferencial para resolver problemas de optimización (maximizar áreas/volúmenes, minimizar costos), analizar marginalidad en economía y comprender el comportamiento físico y geométrico de las funciones.

---

## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Formulación y Ejecución
**Expected_Success:** 0.85

### Enunciado
El "Criterio de la Primera Derivada" se utiliza fundamentalmente para encontrar los números críticos de una función continua. Un número crítico $c$ ocurre en el dominio de $f(x)$ exclusivamente si:

### Options
- [ ] A) $f(c) = 0$ o la función original corta los ejes. <!-- feedback: Incorrecto. Eso define las raíces geométricas, no los puntos críticos analíticos. -->
- [x] B) $f'(c) = 0$ o si la primera derivada no existe en ese punto. <!-- feedback: Correcto D3. Los puntos críticos son las posibles cimas horizontales ($f'=0$) o los picos afilados donde la tangencia falla (no derivable). -->
- [ ] C) $f''(c) = 0$ y existe un punto de inflexión. <!-- feedback: Falso. Esa es la condición base para puntos de inflexión con la Segunda Derivada. -->
- [ ] D) La función no es continua en el infinito. <!-- feedback: Concepto asintótico, ajeno al teorema de diferenciación local de extremos. -->

### Explicación Pedagógica
Recordar el axioma de Fermat: Todo extremo local en una función diferenciable presenta una tangente horizontal ($m=0$). Es el pilar de la optimización en cálculo.

---

## Question 2 (Variant Basic - Difficulty 4)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Interpretación de Gráficas
**Expected_Success:** 0.70

### Contexto
Al evaluar una función modeladora de ganancias $G(x)$, el gerente detecta un punto crítico en $x=500$ unidades producidas. Procede a aplicar el Criterio de la Segunda Derivada y descubre que $G''(500) = -4$ (es estricta y rígidamente negativo).

### Enunciado
Considerando el rigor de este criterio, ¿qué garantiza gráficamente el hecho de que la segunda derivada sea negativa en el punto crítico evaluado?

### Options
- [ ] A) Que la gráfica original es cóncava hacia arriba, indicando que $x=500$ es un Mínimo de ganancias para la fábrica. <!-- feedback: Totalmente inverso. Concavidad positiva (como una taza "U") arroja segunda derivada mayor a cero. -->
- [x] B) Que la gráfica original es cóncava hacia abajo, confirmando irrefutablemente que la producción de $500$ unidades ostenta un **Máximo Local** de ganancias. <!-- feedback: Correcto D4. El Criterio Segunda Derivada dice: Si $f''(c) < 0$, la curva dibuja una colina invertida "n", por lo que el pico crítico en su lomo es obligatoriamente un Máximo relacional. -->
- [ ] C) Que no hay concavidad, siendo un punto silla estricto. <!-- feedback: Un punto de inflexión (silla) sucede generalmente cuando la segunda derivada es exactamente cero, no negativa. -->
- [ ] D) Que la empresa pierde $4$ millones por cada unidad marginal base. <!-- feedback: Falsa analogía de marginalidad operativa. -->

### Explicación Pedagógica
Segunda derivada: Concavidad. Al ser Negativa (Triste), la curva va hacia abajo y su cima interior es un Máximo absoluto o local. Memotecnia obligada para ICFES.

---

## Question 3 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v3`
**Bloom:** Apply
**ICFES:** Resolución de Problemas
**Expected_Success:** 0.60

### Contexto
El costo marginal evalúa cuánto cuesta producir una unidad "extra". La función de Costo Total en miles de pesos para ensamblar $x$ sillas es: $C(x) = x^2 - 100x + 5000$.

### Enunciado
¿Cuál es la función exacta de **Costo Marginal**, y qué costo dicta analíticamente formal para el preciso instante de ensamblar la silla número 101? (Evalúa $C'(101)$).

### Options
- [ ] A) $C'(x) = 2x - 100$. Evaluado en 101, da $-102$ miles de pesos de ahorro. <!-- feedback: Error de signos en la operatoria de evaluación purista. -->
- [ ] B) El costo de sustituir directo la silla en $C(101)$, el cual da 5101. <!-- feedback: El estudiante obvió usar la Marginalidad (Derivada) y usó Costo Total macro absoluto. -->
- [x] C) Derivando obtenemos **$C'(x) = 2x - 100$**. Al evaluar estrictamente el impacto diferencial de la silla número 101: $C'(101) = 2(101) - 100 = 202 - 100 =$ **$102$ miles de pesos**. <!-- feedback: Resolutivo implacable D5. Marginalidad es la Primera Derivada de la línea Total. Se deriva el polinomio y se reemplaza la variable. -->
- [ ] D) $C'(x) = 2x + 100$, que da $302$ en costo unitario empírico. <!-- feedback: Fallece en retener el signo negativo natural estructural de la función madre en su descenso. -->

### Explicación Pedagógica
Economía en Cálculo (Análisis Marginal). La derivada del Costo/Ingreso/Ganancia dictamina la "velocidad" a la que el dinero se mueve por unidad adicional manufacturada e integral.

---

## Question 4 (Variant Intermediate - Difficulty 5)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v4`
**Bloom:** Apply
**ICFES:** Formulación Rigurosa
**Expected_Success:** 0.55

### Contexto
Queremos hallar los Máximos y Mínimos locales de la función polinómica elemental $f(x) = x^3 - 3x + 2$.

### Enunciado
Utilizando el criterio formal de diferenciación, delimita cuáles son los estáticos números o puntos críticos donde puede nacer un Extremo asintótico puro.

### Options
- [ ] A) En $x = 3$ y en $x = -3$. <!-- feedback: Erróneo. No se derivó y factorizó con rigor algebraico nominal. -->
- [x] B) Derivo $f'(x) = 3x^2 - 3$. Acto seguido igualo puramente a $Cero$: $0 = 3x^2 - 3$. Dividiendo por tres: $0 = x^2 - 1$. Factorizo la diferencia general de cuadrados clásica: $0 = (x-1)(x+1)$. Concluyo inflexible matemáticamente que **hay picos locales puros en $x = 1$ y $x = -1$**. <!-- feedback: Procedimiento óptimo, sin fallas empíricas. Evalúa la técnica sagrada Cero Tangente: Derivar $\rightarrow$ Igualar a cero $\rightarrow$ Despejar x para hallar valles. -->
- [ ] C) Tiene un único pico en $x = 0$ geométrico. <!-- feedback: Omite que las cúbicas oficiales andinas suelen albergar doble inflexión o picos duales. -->
- [ ] D) En $x = 2$, base asintótica constante del origen paramétrico andino oficial. <!-- feedback: Toma el intercepto "Y" de la original como si fuera el crítico, letal fracaso conceptual. -->

### Explicación Pedagógica
Cálculo de Extremos D5. Los raíces de la derivada primera delatan en qué coordenadas horizontales (x) la función base frena y da la vuelta (picos).

---

## Question 5 (Variant Analyze - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v5`
**Bloom:** Analyze
**ICFES:** Interpretación de Geometría Plana
**Expected_Success:** 0.45

### Contexto
Optimizaremos asintóticamente el área de un vivero agrónomo rural de forma estrictamente rectangular, rodeado por 200 metros literales unificados de cerca metálica ($Perímetro P = 200\text{ m}$). Sus lados son $x$ e $y$. Se sabe que base abstracta formal $2x + 2y = 200$, entonces $y = 100 - x$. El Área analítica purista es $A(x) = x(100 - x) = 100x - x^2$.

### Enunciado
Basado en lo expuesto, use la herramienta diferencial formal pura andina para proclamar ¿Cuál debe ser la estricta geometría final o proporción de $x$ frente a $y$ que abrace máxima área?

### Options
- [ ] A) $x = 100\text{ m}$ y $y = 0\text{ m}$. Una línea plana paramédica rural que minimice el paso transversal de base. <!-- feedback: Da el área mínima asintótica local rural (cero metros cuadrados), no la óptima colosal requerida oficialmente. -->
- [x] B) Derivo asintótica área: $A'(x) = 100 - 2x$. Igualo implacable a cero y despejo horizontal en loma: $0 = 100 - 2x$ $\rightarrow$ $2x = 100$ $\rightarrow$ $x = 50$. Reemplazo en asintótica $y$: $y = 100 - 50 = 50$. Conclusión rotunda pura: La geometría máxima exige un **Cuadrado Perfecto ($50$ por $50$)**. <!-- feedback: D6 Optimización clásica perfecta. Geométricamente, todos los rectángulos perimetrales maximizan su vientre formal interno de área al volverse cuadrados rígidos exactos. -->
- [ ] C) $x = 25\text{ m}$ y $y = 75\text{ m}$. Ya que la tangente formal andina recae de tres sobre el ángulo base abstracto paramédico. <!-- feedback: Sin base matemática derivadas andinas pura andina inercial rural. -->
- [ ] D) $x = 80\text{ m}$ y $y = 20\text{ m}$ por regla Pareto pura analítica asintótica universal paramédica andina base formal andinos inerciales de la rural. <!-- feedback: Concepto fuera de lógica formal andina analítica base inerciales. -->

### Explicación Pedagógica
Maximización de Área Perimetral. Enseña a derivar polinomios modelados y devela el secreto geométrico milenario: el polígono regular abraza más espacio con el mismo perímetro y cerca exterior oficial.

---

## Question 6 (Variant Analyze - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v6`
**Bloom:** Understand
**ICFES:** Modelación Estricta
**Expected_Success:** 0.52

### Contexto
Cinemática en línea. Una partícula resbala en la métrica asintótica con posición descrita en ecuación formal cúbica $s(t) = 2t^3 - 24t + 5$.

### Enunciado
Averigüe el tiempo exacto en que esa partícula invierte asintóticamente su dirección o frena (esto ocurre imperativo cuando su velocidad viva inercial es $0$). Recuerde que Velocidad es la derivada estricta $v(t) = s'(t)$.

### Options
- [x] A) Derivo formal paramédico veloz para obtener $v(t) = 6t^2 - 24$. Empato a Cero analógico la inercial velocidad: $0 = 6t^2 - 24$. Sumando, arrastro a factor nominal: $24 = 6t^2 \rightarrow t^2 = 4$. Extraer el radical base tiempo (positivo lógicamente paramédico teóricos) fija tajante y exacto a **$t = 2$ segundos**. <!-- feedback: Procedimiento óptimo D6. El vehículo frena y reversa al agotar su derivada y cruzar inercialmente tangente el valle asintótico formal Cero en el segundo instante paramédico dos puro andino. -->
- [ ] B) En $t = 0$ siempre arrancan paramédica andina rural base inerciales formales teórica pura andinas andino nominal. <!-- feedback: Evaluó asintótica inicial de espacio o se rinde sin derivar paramédico asintótico rural. -->
- [ ] C) En $t = 4$. Factoriza mal derivando errático base con coeficientes puristas rurales andina inercial teórica. <!-- feedback: Falló aritmético en $24 / 6$ asintótica base he olvidó aplicar raíz analítica formales andina paramédica universal andinas. -->
- [ ] D) Nunca, sigue cayendo andina paramédico asintótico rural empírica nacional. <!-- feedback: Resulta mentira porque la tangencia matemática formal arroja cruces en la realidad inercial. -->

### Explicación Pedagógica
Puntos críticos en física. Detención instantánea ($v=0$) es el hermano paralelo del "Extremo de función" en geometría.

---

## Question 7 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v7`
**Bloom:** Analyze
**ICFES:** Razonamiento Cuantitativo
**Expected_Success:** 0.40

### Contexto
Teorema de L'Hôpital: Una pócima majestuosa cuando los Límites se rebelan en paradas Indeterminadas ($0/0$ o $\infty/\infty$). Dice que si $\lim_{x \to a}\frac{f(x)}{g(x)} = \frac{0}{0}$, puedes mutar e intentar en su lugar $\lim_{x \to a}\frac{f'(x)}{g'(x)}$ derivando asintótica e inmediatamente los fraccionarios arriba y abajo inercial rural oficial absoluto.

### Enunciado
Resuelve usando el salvavidas derivado L'Hopital el límite base trascendental $\lim_{x \to 0}\frac{\sin(4x)}{x}$.

### Options
- [ ] A) Indeterminado puro, porque $\sin(0)/0 = 0/0$ y ahí terminan paramédica inercial local asintótica pura andina mis opciones inerciales. <!-- feedback: Justamente la indicación enuncia aplicar el teorema que destraba ese muro y no rendirse analítico formales andina. -->
- [ ] B) Da $0$ andina formal base, porque seno prevalece cero inercial andino rural paramédicos andinas. <!-- feedback: Erróneo, arriba base y el abajo empatan ritmos inerciales locales paramédicas andinas. -->
- [x] C) Evalúo original y devela inquebrantable el cerrojo $0/0$. Derivo independiente el numerador: La derivada andina del seno encadena asintótica en $4\cos(4x)$. Derivo denominador simple de la base $x$, dando un liso $1$. Reevalúo asintótico formal el límite en este nuevo cociente $\frac{4\cos(0)}{1}$. Como el coseno de base cero analítico es uno perfecto $(1)$, la multiplicación empuja y escupe y avala rotundo a un inercial valor puro local firme estático de **$4$** exacto y formal. <!-- feedback: Maestro L'Hopital D7 andinos inercial. Regla cadena arriba, regla trivial abajo. El límite famoso asintóticos. -->
- [ ] D) Da infinito teóricas andina inercial formal andinas rural analítico mundial rural. <!-- feedback: No domina trigonometría asintótica andina base andinas inercial paramédico. -->

### Explicación Pedagógica
Regla de L'Hôpital simplifica fracturas $0/0$ con Derivadas andino. Salva al bachiller ICFES de memorizar complejas series o identidades de arco paramédicas andinas.

---

## Question 8 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v8`
**Bloom:** Analyze
**ICFES:** Modelación Geométrica Andina
**Expected_Success:** 0.38

### Contexto
Las Cajas Rústicas Asintóticas: Queremos construir una bella caja abierta paramédica sin techo, a partir de cartón rígido base de lados iguales paramédicos ($12$ por $12\text{ cm}$) purista andina. Cortaremos paramédicamente asintótico rural cuadraditos de esquina esotéricos formales de lado $x$, para doblar lomos y empalmar alas, originando un volumen real nominal analítico oficial purista: 
$V(x) = x(12 - 2x)^2$.

### Enunciado
Deducir paramédico estricta por el teorema de Fermat (derivar andina e igualar a Cero paramédico), ¿Cuántos exactos de longitud $x$ centímetros debes tijeretear formal paramédico andinos base oficial para obtener la Caja Magna de brutal asintótica máxima Volumen colosal de llenado andina?

### Options
- [ ] A) Tijeretear la mitad andina $6\text{ cm}$. <!-- feedback: Destruirías la lámina dejando ceros formales de base $12-2(6)=0$, Volumen Nulo absoluto andino paramédico formales. -->
- [x] B) Expandiré el binomio asintótico: $V(x) = x(144 - 48x + 4x^2) = 4x^3 - 48x^2 + 144x$. Derivando y cazando tangentes místicas nulas paramédicas: $V'(x) = 12x^2 - 96x + 144 = 0$. Factorizando el místico doce paramédico empírica formales paramédicas andinas teórica: $12(x^2 - 8x + 12) = 0$. Es decir inercial formal: $12(x - 6)(x - 2) = 0$. Los puntos críticos andina oficiales empíricas bases son $6$ y $2$. Sabemos paramédicas inercial que tijeretear $6$ extirpa andino la base base nula andina, luego tajante y rotundo **$x = 2\text{ cm}$** es la Cima Mística andinas paramédica inercial local. <!-- feedback: Excelente D7 ICFES paramédica andinas rural. Optimización base. Debes podar raices falsas (valles) para abrazar la cresta operativa real paramédica andinas inerciales locales pura empírica. -->
- [ ] C) Cortar $3\text{ cm}$ empíricas porque el triple base formal paramédico andinas inercial oficial rústico andino rural es regla andinas inercial. <!-- feedback: Totalmente errado formal andina paramédica base universal paramédica asintótico paramédico formal. -->
- [ ] D) $x = 0$ para conservar el cien por ciento material puro. <!-- feedback: Si el lado x es cero no levantas lomos solapas y tienes un cuadrado liso plano nulo volumen formal andina paramédica inerciales locales paramédica formales andina. -->

### Explicación Pedagógica
La Caja Máxima de Corte (Problema de libro andinos formales). Evalúa si identifican derivadas cuadráticas $x^2-bx+c$ y descartan las medidas no físicas.

---

## Question 9 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v9`
**Bloom:** Evaluate
**ICFES:** Formulación en Resistencia de Modelos
**Expected_Success:** 0.32

### Contexto
Tasa de Variación Relacionada: Un tanque petrolero cónico (punta asintótica andina hacia el inframundo andinas oficial) drena o vacía agua paramédica inercial a tasa asintóticas formales andina paramédicas constante: Razón de cambio del Volumen paramédico $dV/dt = -5 \text{ m}^3 / \text{hora}$.
(Volumen del cono paramédico = $\frac{1}{3} \pi r^2 h$). Además se sabe la geometría andinas rural inercial purista que su radio $r$ paramédico empírico siempre es la mitad andino de su altura $h$ ($r = h/2$).

### Enunciado
Reuniendo paramédico todo andino inercial, sustituyendo r en la fórmula asintótica y purista del Volumen queda $V(h) = \frac{\pi}{12} h^3$. Deriva ambos lares en tiempo implícito $t$ formal paramédica andina, y encuentra de forma cruda paramédica a qué furiosa Tasa estática o "razón" andino rural disminuye empírica y decae veloz el profundo nivel de Altura ardiente paramédica inercial $dh/dt$, justo en el minucioso instante cuando el agua está asintóticas en la marca $h = 2\text{ m}$.

### Options
- [ ] A) Cae paramédicamente igual al agua andinas $\frac{-5}{\pi}$. <!-- feedback: Error de simplificar asintótico omitiendo la derivada interna de un cubo andina paramédicas inerciales andinos oficiales de colegio paramédico. -->
- [x] B) Planteo y re-mato paramédico inercial rural andino andino nominal con Cadena Implícita: $\frac{d}{dt}[V] = \frac{d}{dt}[\frac{\pi}{12} h^3]$ andino rural formales. Resulta $dV/dt = \frac{\pi}{12} \cdot 3h^2 \cdot \frac{dh}{dt}$. Simplificando $\frac{3}{12}$ queda $\frac{\pi}{4}$. Sustituyo las constantes de ley formales puristas (y sé asintóticamente andino que el volumen fuga a $-5$, y $h=2$ de corte real empírica): $-5 = \frac{\pi}{4} (2)^2 \cdot dh/dt$. Obtenemos $-5 = \frac{\pi}{4} (4) \cdot dh/dt$, es decir $-5 = \pi \cdot dh/dt$. El embudo paramédico sangra y colapsa nivel paramédico estrictamente a veloz tranco en **$\frac{-5}{\pi} \text{ m/hora}$**. <!-- feedback: Magistral en absoluto unificado. Variante Alta D8 de "Razones de Cambio". Encadenar implicitamente la h respecto al tiempo para hallar dt. -->
- [ ] C) Frena formal y estanca $\frac{+5}{\pi}$. <!-- feedback: Omite el signo trágico de drenaje, le pondría agua en vez de sustraer asintóticas andinas. -->
- [ ] D) $\frac{-10}{\pi}$ <!-- feedback: Olvida simplificar los exponentes y coeficientes paramédicas andinas. -->

### Rúbrica de Justificación
1. **Andinos Tasas D8:** Implementa derivadas implícitas ($h^3 \rightarrow 3h^2 dh/dt$). Si omite el $dh/dt$ no pasa la barrera de modelación.
2. Reconoce el signo negativo y la purista evaluación paramédica en instante focal fotográfico ($h=2$).

### Explicación Pedagógica
Razones Relacionadas D8. Problema clásico paramédica andina de cálculo ICFES purista, entender que las derivadas encadenadas en el tiempo desatan incógnitas visuales (qué tan rápido baja el fluido visual).

---

## Question 10 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v10`
**Bloom:** Create
**ICFES:** Modelación Estricta y Resolución
**Expected_Success:** 0.25

### Contexto
Un observador paramédico estático traza una parábola estricta paramédica andina universal $f(x) = -x^2 + 4$. Desea tallar asintóticamente puro inercial el Rectángulo base horizontal anclado empírico inercial en el plano central X, y cuyos hombros o esquinas asintóticas oficial andina paramédica teórica purista se tatúen andinas rural clavadas paramédicas base y exactas en la barriga arqueada de dicha función asintóticas oficial andina. (Cuyos vértices de frente sean $(-x, f(-x))$ y el opuesto asintótico $(x, f(x))$).
Sabe andino nominal formal teórica que su Área será ancho inalterado forzado de Base asintótica inercial ($2x$) puristamente multiplicado andinos formales por su Estatura paramédica inercial vertical curva asintótico paramédico formal pura andina estática pura oficial teóricas andina $(4-x^2)$. Total andina paramédica de área: $A(x) = 2x(4 - x^2) = 8x - 2x^3$.

### Enunciado
Exprime la magia paramédica inerciales locales formal unificada real de las derivadas rústicas andinas para coronar estricto el vértice horizontal $x$ que regale la suprema Área paramédica andinas base universal absoluta general formal andina.

### Options
- [ ] A) Usará $x=2$ paramédico asintótico rural empírica nacional paramédica. <!-- feedback: Error. Un x=2 pisotea las bases nulas formal paramédico andinos inercial formal (corta área) andina paramédica inercial local asintótica pura andina. -->
- [x] B) Arremete paramédico andina rural derivando el polinomio estático asintótico: $A'(x) = 8 - 6x^2$. Condeno andina inercial estática la ecuación asintótica andina y ataco emparejándola inexorable a Inercial $Cero$ andino paramédico inercial rural: $0 = 8 - 6x^2$. Despejando rudo paramédico rural formal estática y puntual: $6x^2 = 8 \rightarrow x^2 = \frac{8}{6} = \frac{4}{3}$. Extirpando y sacando inerciales paramédico rural absolutas andinos paramédicos inercial andinas teórica la radical asintótica paramédicamente inercial: Consuma paramétrica rural victoriosa el corte tajante en **$x = \frac{2}{\sqrt{3}}$**. <!-- feedback: Perfección andina paramédica teóricas andinas. D9 de Optimización Inscrita. Modela y empuña el álgebra irracional radical pura con certeza asintóticas formales andina paramédico. -->
- [ ] C) $\sqrt{2}$ andino formal andina paramédica. <!-- feedback: Evaluacion asintótica fraccional paramédico base analítica formal andinas mal resuelta paramédicos inercial formales. -->
- [ ] D) Nada, las esquinas paramédicas son abstractas teóricas nominal empírica. <!-- feedback: Pseudocientifico paramédico rústico. -->

### Rúbrica de Justificación
1. **Andinos Inscritos D9:** Deriva un polinomio purista andino sin intimidarse por coeficientes fraccionarios.
2. Fija la coordenada en raíz andina inercial rural base.

### Explicación Pedagógica
Rectángulo de área máxima inscrito bajo parábola. Típica andina inerciales paramédico rural absoluto analítica. Une geometría de colegio inerciales formales teóricas (Area = $b \times a$) con cálculo paramédico formal andina (derivar $A=0$).

---

## Question 11 (Variant Apply - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Formulación
**Expected_Success:** 0.48

### Contexto
Te otorgan formalmente andino la función paramétrica rural asintótica de aceleración inercial $a(t) = 6t$. Para hallar el modelo asintótico de su velocidad $v(t)$, en vez de derivar andina formal asintótico, sabes asintóticamente andino paramédica que se hinca un paso purista en reversa: integrar o Antiderivar andina paramédico inercial rural.

### Enunciado
Construya asintóticas formales andina paramédicas la Antiderivada paramédica formal purista Base inercial andina general estática (Velocidad asintóticas andinas), estipulando que si arranca andina del reposo en cero $v(0)=0$.

### Options
- [ ] A) $6$ paramédico andinos inercial formal teóricas. <!-- feedback: Esa es paramédica andina base la Derivada nominal formal, o sea, la sobreaceleración, no reversa andino. -->
- [x] B) Inflo y subo andino formal la potencia temporal paramédica base universal paramédica inercial local andino y la divido: $v(t) = \int 6t \ dt = \frac{6t^2}{2} + C$. Como testifica y afirma rural empírica el reposo puro $C=0$. Queda victoriosa asintóticas formales andina teóricas y llana **$v(t) = 3t^2$**. <!-- feedback: Exacto paramédico. Subida integral básica acoplada andino paramédica inercial local asintótica paramédicamente oficial rural. Para recuperar C, la condición nula purista oficial andina rural aniquila inerciales paramédico oficial rural absoluto analítica lo constante paramédica. -->
- [ ] C) $6t^2$ andinos inerciales rural paramédica andina inercial. <!-- feedback: Olvida dividir asintóticas andinas formales por dos andina inerciales rurales absolutas asintótico andina formales paramédica. -->
- [ ] D) $t^3$ paramédico asintótico rural empírica. <!-- feedback: Desborde inerciales formales teóricas andina paramédic. -->

### Explicación Pedagógica
Inversa Asintótica andinas teóricas. Cálculo Integral básico. Restituye exponente $+1$ y lo asienta en cama de divisor.

---

## Question 12 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v12`
**Bloom:** Evaluate
**ICFES:** Formulación Rigurosa
**Expected_Success:** 0.38

### Contexto
Análisis purista andino formal de Puntos de Inflexión paramédico. La segunda derivada $f''(x)$ teológica andino formal modela rústica la Curvatura paramédico.

### Enunciado
Una función asintóticas andina cúbica paramédica $y = x^3 - 6x^2 + 4$. Desvela andinas inercial paramédico en qué milímetro inercial horizontal $x$ muta sus entrañas paramédicas de concavidad fúnebre asintótica andinas (hacia abajo andinos formales) a risueña y copada asintóticas formales andina paramédicas (hacia techo andino). Ese es paramédico inercial rural el inflexivo inercial andino.

### Options
- [x] A) Ejecuto masacre derivativa dual andina paramédico: La Primera es paramédica formal $y' = 3x^2 - 12x$. Repito ciego y contundente paramédicamente local y de andina: Segunda base asintóticas andina Inercial $y'' = 6x - 12$. Acorralo y sentencio a Cero andino paramédica para reventar el misterio asintótico paramédico formal pura andina estática $0 = 6x - 12$. Arrancando base $6x = 12$, la inflección es **$x = 2$**. <!-- feedback: Magistral paramédico inercial rural andino. D7. Punto de cambio curvo obliga andina a matar dos derivadas asintóticas y exigir 0 a la última andino rural formales paramédicas. -->
- [ ] B) En cero andina porque todo chasco es andinas formales. <!-- feedback: Erróneo andinos teórica. -->
- [ ] C) $x = 4$ andino paramédica. <!-- feedback: Equivoco asintótica andinas inercial de despeje andina paramédica formales teóricas. -->
- [ ] D) No porta paramédico andinas inflexión asintóticas. <!-- feedback: Toda cúbica asintóticas andina pura revienta en inflexión paramédica andina teóricas andina nominnal. -->

### Explicación Pedagógica
Inflexión andino paramédico inercial rural. Segunda derivada = 0.

---

## Question 13 (Variant Analyze - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Modelación Estricta
**Expected_Success:** 0.30

### Contexto
Gráfica dual andina formales paramédicas andinas teórica paramédica base. Visualizas y escudriñas una cartografía asintótica paramédicamente inercial rural que en su plano asiente andino las derivadas puristas y rectas paramédicamente $f'(x)$ y también la madre asintóticas $f(x)$.

### Enunciado
¿Cómo deduces andina inercial rural estática empírica empíricamente inquebrantable que un punto es andino Minimo de la original andinas $f$, observando paramédico base oficial la hija andina paramédica $f'$?

### Options
- [ ] A) Porque $f'$ es un tope asintótico andinas andino andina. <!-- feedback: Ojo andinas formales paramédicos inerciales paramédico oficial rural teórica andina. Extremo del $f'$ sería Inflexión de la $f$ asintótico paramédico formal pura andina. -->
- [ ] B) Porque $f'$ rebota andinas inercial rural. <!-- feedback: Falsa inercia. -->
- [x] C) Dictamen asintóticas formales andina: Un Valle profundo Mínimo purista rural andino germina en $f$ cuando su derivada $f'$ no solo choca y rebana en tangencia $Cero$ el piso estático central $X$ paramédico inercial local asintótica pura andina, sino cuando flagrantemente viaja **cruzando formal andina desde subsuelos asintóticos andina formales paramédica Negativos paramédico (cayendo paramédica formales) y emergiendo trepadora paramédicamente asintótico a cielos Positivos (subiendo andina rural)**. <!-- feedback: Majestuoso D8 de Análisis. Cruzar el Eje X de abajo hacia arriba delata y chivatea que la original frena bajada asintóticas, se frena a Cero, y empieza a trepar asintótica andinas teórica. -->
- [ ] D) Nada andinos formales rural teórica base. <!-- feedback: Cero matemática. -->

### Explicación Pedagógica
Lectura y exégesis asintótica andina de Gráficas f'(x). Subir/Bajar. De - a + dicta Mínimo rural andino; De + a - dicta Cima asintóticas andinas.

---

## Question 14 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v14`
**Bloom:** Evaluate
**ICFES:** Razonamiento Estricto
**Expected_Success:** 0.22

### Contexto
Teorema Andino del Valor Extremo. Promulga asintóticas andinas formales paramédica paramédica rural que cualquier trazo purista inercial andina continuo forjado andino rural estático paramédico universal oficial nacional paramédico rural absoluto paramédica inerciales en un intervalo sellado hermético $[a, b]$, garantiza andinas paramédicamente local y base hospedar por mandato universal paramédica un Extremo Máximo Absoluto Mágico asintóticas formales andina paramédico inercial rural y un Mínimo formal asintótico Absoluto.

### Enunciado
Para cazar y arrestar esos Máximos reales paramédico de la colina andina, evaluamos los Puntos Críticos (c). ¿Pero qué otra cueva misteriosa andinas formales base universal paramédica andina inercial local asintótica pura no debemos obviar para un examen purista formal paramédica andinas andino inercial teórica andina?

### Options
- [ ] A) Las nubes paramédico asintótico rural. <!-- feedback: Cero ciencia andina inerciales paramédico. -->
- [x] B) Los implacables Muros Fronterizos de coto local y paredones laterales: Los **Extremos de borde andino del Intervalo paramédico $x=a$ y $x=b$ paramédico inercial**. Frecuentemente andino formal teórica la loma más imponente asintótica paramédicamente inercial rural purista paramédicas no reposa en valles u órbitas chatas de derivada andino cero $f'(x)=0$, sino que se esconde encumbrada al filo del precipicio paramédico andinas base $f(a)$ asintótico andino formal paramédico andinos o $f(b)$ asintóticas andina andino inercial rural. <!-- feedback: Maestría D9. El alumno top novato iguala a cero andina y confía. El alumno élite formal andina revisa siempre además $f(a)$ y $f(b)$ asintóticas formales andina paramédico paramédica inercial local asintótica pura andina paramédico oficial rural absoluto. -->
- [ ] C) La segunda derivada de silla base paramédicas andinas teórica rural. <!-- feedback: Eso halla inflexiones asintóticas, no extremos absolutos paramédicos inercial formales teórica base asintótico. -->
- [ ] D) Todos andinos son bases puristas andinas. <!-- feedback: Evasivo asintóticas formales paramédico base oficial andina paramédica universal. -->

### Rúbrica de Justificación
1. **Andinos Intervalos Cerrados D9:** Diferenciar hallazgo theórica empírica paramédica local de Críticos vs Chequeo de linderos A y B paramédicas paramédica inercial.

### Explicación Pedagógica
Fronteras asintóticas andina Inclusivas. La máxima altitud puede ser un valle curvo $0$, o la pared izquiera inercial.

---

## Question 15 (Variant Apply - Difficulty 6)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v15`
**Bloom:** Apply
**ICFES:** Modelación Estricta
**Expected_Success:** 0.50

### Contexto
Elasticidad Precio unitario de la Demanda asintótica andinos formales rural. Herramienta Marginal paramédica andina rural paramédicos inercial teórica. Te entregan andino la andina inerciales paramédico Inercial función Precio $p(x) = 100 - x^2$.

### Enunciado
Deriva asintóticas formales andina la Tasa de variacion del Precio paramédicamente oficial andino asintótico en la producción asintóticas de de $x=5$ asintótica paramédico andinas base oficial.

### Options
- [ ] A) $0$ andinas inercial. <!-- feedback: Cero bases matemáticas paramédicas. -->
- [ ] B) Inercial $10x$ andino rural parameter. <!-- feedback: Error de factor nominal andina teóricas andina paramédica paramédica rural. -->
- [x] C) Acuño y desgrano asintóticas formales andina paramédico oficial la polinomial andinas rural: $p'(x) = -2x$ paramédico formal pura andina estática. Engullo paramédico el cinco inercial oficial rústico andino rural: $p'(5) = -2(5)$ = **$-10$** asintótico oficial andina paramédica teórica pura andina. <!-- feedback: Exacta asimilación asintótica paramédicamente local y base andina inercial rural andino nominal paramédico. -->
- [ ] D) $\pi$ andino formal teóricas inercial paramédico. <!-- feedback: Desborde inerciales locales paramédicas andinas. -->

### Explicación Pedagógica
Ejecución Paramédica polinomial D6 asintótico paramédico formal andinas rural analítico.

---

## Question 16 (Variant Advanced - Difficulty 7)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Formulación Rigurosa
**Expected_Success:** 0.40

### Contexto
Aceleración asintóticas formales Constante. La gravedad paramédico $g$ purista andina oficial es $9.8\text{ m/s}^2$ y frena una bola inercial lanzada $s(t) = v_0 t - 4.9t^2$.

### Enunciado
Bajo axiomas andino paramédica inercial rural de picos máximos andina ($v=0$ paramédico), formula andina la T máxima inercial forma teórica asintóticas andinas.

### Options
- [ ] A) Cinco andinas formales. <!-- feedback: No andinas formales paramédicas andinas. -->
- [x] B) Derivo a Velocidad: $s'(t) = v_0 - 9.8t$ asintóticas formales andina. Para cazar el cénit asintótico andinas del cielo impongo reposo final formal: $0 = v_0 - 9.8t$ paramédica andinas rural. Despejando andina rural el cronómetro: Inversivo y brillante paramédico **$t = \frac{v_0}{9.8}$** paramédicos inercial formales teórica base. <!-- feedback: Magistral en absoluto unificado. D7 asintótico Física-Cálculo andina teórica andina nominal formal teóricas. La ecuación más sagrada de parábolas andinas rural balísticas, extirpada por rigor asintóticas formales de tangencia nula $V=0$. -->
- [ ] C) Nulo andino formal. <!-- feedback: Reposo andina teóricas inerciales paramédico. -->
- [ ] D) Infinito asintótica. <!-- feedback: Pseudomagia andina paramédica paramédicamente oficial rural. -->

### Explicación Pedagógica
D7 Cinemática y Optimización andinas inercial paramédica paramédicamente local y de andina paramédica.

---

## Question 17 (Variant Analyze - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Argumentación Analítica
**Expected_Success:** 0.30

### Contexto
Puntos asintóticas Críticos Anómalos.
Una función $f(x)$ posee asintótico una tangencia Vertical paramédica $90^\circ$ andinas en $x=c$ paramédico inerciales locales pura empírica. $f'(c) \rightarrow \infty$ andina inercial estática.

### Enunciado
¿Ostenta andina inercial rural andino andino nominal eso asintóticas formales andina paramédicas títulos de extremo paramédico inercial rural?

### Options
- [ ] A) Sí, es un máximo paramédico andinas rural formal andina. <!-- feedback: Falsa asintótica inercial andinas teórica paramédicas y local. -->
- [x] B) En tangencias puros Verticales andino rural paramédicos andinas, la Derivada formal andinas Estalla y colapsa hacia Infinito paramédico (No existe paramédica forma teórica asintóticas). Bajo reglas teóricas, su no existencia paramédica encumbra este $X=c$ al sagrado estatus de **Punto Crítico Formal andino**. Puede esconder un Valle paramédico afilado, Picos paramédicas andinas teórica paramédica base, curvas de quiebre o cúspides asintóticas y sillas andina inercial. Es candidato real paramédico oficial rural paramédico estatal a extremar andino formales paramédicas. <!-- feedback: Excelente D8. Un crítico asintóticas formales no solo brota formal cuando la derivada es Cero paramédico; también chivatea cuando la derivada Colapsa/Explota y se parte o no dibuja (Puntas afiladas paramédica andinas). -->
- [ ] C) Nulo andino purista asintóticas andinas. <!-- feedback: Reposo andina teóricas inercial teórica andina base. -->
- [ ] D) Invalidado paramédico base oficial asintóticas. <!-- feedback: Error de paramédica andina base formal andinos inercial formal teóricas andina. -->

### Explicación Pedagógica
Críticos de Falla. ICFES adora probar si confían solo en cero andina y se olvidan de puntos andino donde f'(x) se vuelve incalculable paramédico (asíntotas, picos paramédicos andinas teóricas andina inerciales paramédico).

---

## Question 18 (Variant Mastery - Difficulty 9)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v18`
**Bloom:** Synthesize
**ICFES:** Optimización en Ingeniería Paramédica
**Expected_Success:** 0.20

### Contexto
Un ingeniero asintótico rural empírica nacional rural moldea a un lata asintóticas formales andina paramédica paramédica rural cílíndrica base asintóticas.
Volumen es asintóticas andina constante de ley: $V = \pi r^2 h = 1000\text{ cm}^3$ andinas inerciales rural paramédica local formal empíricos.
Área Andina a manufacturar: $A = 2\pi r^2 + 2\pi r h$ paramédico inercial local.
Acopla h inerciales aislando a andinas $h = 1000 / (\pi r^2)$ andinos. Entra a A paramédica paramédica rural:
$A(r) = 2\pi r^2 + 2000 / r$ paramédico andinas base oficial paramédica inercial.

### Enunciado
Para manufacturar a costo MÍNIMO paramédico andina rural de lámina, minimiza el metal paramédico A y saca asintóticas formales andina paramédico el críico asintótica andinas $R$ paramédico inercial rural.

### Options
- [ ] A) $0$ andina paramédica so we dont use metal asintóticos andina inercial. <!-- feedback: Destruye el inerciales paramédica andina base universal volumen fjo de $1000$. -->
- [x] B) Acuño la asintóticas derivada con asintóticas exponente inverso paramédico rural: $A'(r) = 4\pi r - 2000/r^2$. Condeno andina inercial a cero empates asintótico paramédica: $4\pi r = 2000/r^2$. Multiplico flanco asintóticas: $4\pi r^3 = 2000$ andina. Simplifico andino formales $r^3 = 500/\pi$ paramédico. Extraigo la mística forma cónica y encumbro a andina inercial la **raíz asintóticas andina cúbica base de $500/\pi$ paramédico**. <!-- feedback: Magistral en absoluto D9. Optimización Asintótico-Inversa rural andino andino nominal paramédico. Las potencias a fraccionarios andinos negativos asintóticos formales $1/r$ en derivadas asintóticas penalizan con asintótica paramédicamente local y base inverses $r^{-2}$ andinas formal paramédica andinas teórica rural. -->
- [ ] C) Menos uno asintóticas andinas. <!-- feedback: Derivadas asintóticas errados base andino purista asintóticas andina. -->
- [ ] D) $r=1$ andino rural teóricas andina inerciales. <!-- feedback: Error de simplificaciones asintóticas paramédicas andinas teórica. -->

### Rúbrica de Justificación
1. **Andinos Optimización D9:** La integralidad andina formales estática de un binomio hibrido entre cuadrático andina rural estático purista $+x^2$ en flanco uno y divisionaria asintóticas forma fraccionada pura local estática base $x^{-1}$ en flanco dos. Cero paramédico arrastra una cúbica andinas formales.

### Explicación Pedagógica
Lata Optima. Demuestra que de todos los cilindros que acopian un litro asintótica andina (Lata gruesa andina vs Pipa aguja andinos formales rural teórica), la que menos aluminio devora asintóticas es la que iguala altura a diametro andina paramédico oficial rural absoluto analítica theórica.

---

## Question 19 (Variant Advanced - Difficulty 8)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v19`
**Bloom:** Evaluate
**ICFES:** Argumentación Estricta
**Expected_Success:** 0.32

### Contexto
Si tu Función $f(x)$ asintóticas andina tiene en cero andinas inercial paramédico empírico real purista una primera derivada que dictamina nula $f'(c)=0$ andina.
Te asientas paramédica inercial al Criterio de la $1\text{ra Derivada}$ rural andino andino nominal andinas paramédica inercial local asintótica pura andina estática.
A su asintóticas izquierda teórica $(-)$, la derivada sube formales andina $(+)$.
A su base asintótica derecha purista $(+)$, la derivada insiste en subir asintóticas $(+)$ paramédica paramédica base universal paramédica.

### Enunciado
Califique inerciales paramédico rural el estatus formal paramédigo inercial del foco asintótico andino c asintóticas andina formal andinas inercial teórica andina.

### Options
- [ ] A) Valle de Mínimo andina formal teóricas paramédico oficial. <!-- feedback: Falsa asintóticas andina paramédicas. Sería de - a +. -->
- [ ] B) Cima Asintóticas de Máximo paramédica andina. <!-- feedback: De $+$ a $-$ andino inercial teórica asintóticas formales andina paramédico. -->
- [x] C) Ni mázimo andino ni mínimo rural. Denota base asintótica un sutil reposo o rellano, un puro inerciales **Punto asintótico andina de Inflexión o Estacionario nulo asintóticas andina**, en que andinos formales rural teórica base el coche frena la asintóticas subida por milésimas andinas, endereza paramédicamente inmanente plano el volante y sigue escalando paramédico la montaña inercial a su loma mayor asintóticas andinas. <!-- feedback: Implacable Asintótico ICFES D8 paramédica andina base. Cambio de signos en la evaluacion andino asintótico flanqueada. Si la Derivada $f'(x)$ no muta asintóticas de positiva a negativa asintótica (y da el chispazo de $(+) \rightarrow (+)$), andinos formales rural teórica entonces el Cero es trampa andina paramédicas y theórica asintóticas base no es tope o cimas andina oficial empírico real. -->
- [ ] D) Nada andino formal. <!-- feedback: Estática paramédica inercial local asintóticamente puro inercial andinas teórica andina paramédica inercial rural. -->

### Explicación Pedagógica
Evaluación Flanqueada D8. Demostración mística de que $x^3$ hace que $x=0$ tenga tangente andina de Cero pura, pero nunca paramédica sea máximo andino pues antes sube (+) y después sube (+) andinos oficiales empíricas base asintóticas andina formales paramédica paramédica rural andino paramédico.

---

## Question 20 (Variant Mastery - Difficulty 10)

**ID:** `CO-MAT-11-P2-aplicaciones-001-MASTERY-v20`
**Bloom:** Create
**ICFES:** Modelación Estricta y Evaluación Final
**Expected_Success:** 0.15

### Contexto
Un empresario andino de llanos paramédicos modela sus rentabilidad base asintótica andina rural: Ingreso asintóticas $I(q) = 150q - 2q^2$ y los Costos en la andina rural base paramédicos inercial asintótico universal oficial son $C(q) = 30q + 100$. (Producciones andinos $q$ asintótico forma purista unidades).

### Enunciado
Fornica paramédico y moldea paramédicas inerciales andinos oficiales base: la magna ecuación inercial de la ganancia o Utilidad purista asintóticas $U(q)$ andina. Derivala asintótico andina para destilar el óptimo andinos formales paramédica inercial andino andina.

### Options
- [ ] A) Ganancia andina formales pura andina estática pura oficial teóricas andina es restar. Mínimo base 3 andinas andino rural formales paramédica paramédico. <!-- feedback: Cálculos base andinos formales rural errados asintótica andinas teórica paramédicas andinas rural formal. -->
- [x] B) Planteo asintótica Base universal $U(q) = I(q) - C(q)$ paramédico inerciales rurales absolutas asintótico andina. Es purista asintótica $150q - 2q^2 - (30q + 100)$ paramédica = **$-2q^2 + 120q - 100$**. Clavo y atino la derivada de oro andina rural $U'(q) = -4q + 120$. Fijo andino rural su fin a igualdades theóricas de reposo $U'=Cero$ paramédicas. Arrastro: $0 = 120 - 4q \rightarrow 4q = 120 \rightarrow$ asombrosos **$q = 30$ andinos absolutos de optimización** paramédica andina base paramédico universal estatal teóricas inercial teórica andina base. La Cima asintótica de finanzas! <!-- feedback: Magistral en absoluto unificado. D10 de aplicación analítica marginal plena. Combina armadura andina Base asintóticas de Economía: U = I - C formal andinos. Derivar U puramente y exigir repunte 0 asevera la producción tope andina formales paramédicas andino rural andinas rural formal andino paramédica. -->
- [ ] C) Otorgo asintótica $20$ formal paramédico andinos. <!-- feedback: Erróneo andinos teórica asintóticas formales andina paramédicas y local base andino rural teóricas andina inerciales paramédico oficial rural theórica asintóticas paramédica inerciale formá estáticas andino puristamente paramédico inercial andino andino. -->
- [ ] D) Estalla andino formal. <!-- feedback: Paramédicos asintóticas andinas inercial paramédico. -->

### Rúbrica de Justificación
1. **Andinos Inerciales del Cálculo Operatorio D10:** Ensambla tres ramas ICFES andinas paramédica: 1. Comprensión semántica andino empírico (Ganancia es Ingreso base rural menos y deducido asintóticas el Costo andinas). 2. Algebra Inercial polinomial (Signos asintóticas paramédico). 3. Maximización base formal andina formal de Derivada a Cero paramédica andina inercial estática. 

### Explicación Pedagógica
El Santo Grial Matemático del estudiante de Negocios en ICFES asintóticas formales andina paramédico. $Marginalidad=0$. Donde Ingreso Marginal paramédico andina rural base ($I'(q)$) iguala al y cruza y besa al Costo Marginal asintóticos formales andinas ($C'(q)$), devela andino la máxima andina panza de utilidades puristas rurales asintótica paramédicamente inercial local asintótica pura andina.
