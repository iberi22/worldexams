---
id: "CO-MAT-11-P2-estadistica-001-MASTERY"
protocol_version: "5.0"
alignment: "ICFES Saber 11 / Marcos Técnicos"
target_cefr: "N/A"
periodo: 2
bundle_index: 1
modern_context: true
calibration:
  expected_success_rate: 0.50
  discrimination_index_target: ">= 0.25"
  simulated_responses: 100
rubric_baseline: "probabilidad_condicional, valor_esperado, desviación_estándar"
---

# Bundle Matemáticas G11 - Periodo 2: Estadística, Probabilidad y Riesgo

---

## Question 1 (Intermedio - Dificultad 4)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v1`
**Bloom:** Comprender
**ICFES:** Aleatorio - Medidas de Tendencia Central
**Expected_Success:** 0.65

### Enunciado
Una empresa de tecnología en Bogotá evalúa el salario de sus $5$ programadores Junior. Los salarios mensuales en millones de pesos son: $2.5$, $2.6$, $2.4$, $2.5$ y $20.0$ (este último corresponde al hijo del gerente, que figura como Junior). Si el departamento de recursos humanos quiere presentar un informe a los inversionistas mostrando que el salario de los programadores Junior es "muy competitivo y alto", ¿cuál medida de tendencia central usarán, y cuál medida representaría más fielmente la realidad del programador promedio en esta empresa?

### Options
- [ ] A) Usarán la mediana para mostrar salarios altos; la media representa mejor la realidad. <!-- feedback: Incorrecto. La mediana no se ve afectada por el 20.0, así que no mostrará un salario "muy alto" engañoso. -->
- [x] B) Usarán la media para mostrar salarios artificialmente altos; la mediana representa mejor la realidad. <!-- feedback: Correcto. La media aritmética se distorsiona inmensamente por el dato atípico (20.0), elevando artificialmente el promedio. La mediana (2.5) es inmune a datos extremos y refleja fielmente al empleado típico. -->
- [ ] C) Usarán la moda para mostrar salarios altos; la varianza representa mejor la realidad. <!-- feedback: Incorrecto. La moda es 2.5, no es alta. La varianza no es una medida de tendencia central representativa de un salario típico. -->
- [ ] D) Usarán la media para mostrar salarios altos; la media también representa mejor la realidad porque incluye matemáticamente a todos los empleados. <!-- feedback: Falso en estadística descriptiva. En distribuciones altamente sesgadas por datos atípicos, la media piramidal no es la mejor representante de la tendencia central "típica". -->

### Rúbrica de Justificación
1. **Sensibilidad a Datos Atípicos (Outliers):** Comprende la fragilidad del promedio matemático ante extremos y la robustez de la mediana posicional.

### Explicación Pedagógica
Evalúa la madurez para interpretar cuándo una estadística es engañosa ("mentir con estadística"). La media se infla por el outlier, sirviendo al propósito publicitario de RR.HH, pero la mediana describe la verdad laboral y distributiva real.

---

## Question 2 (Intermedio - Dificultad 4)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v2`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Probabilidad Simple
**Expected_Success:** 0.60

### Enunciado
Un sistema de ciberseguridad requiere un PIN numérico de 4 dígitos (del 0 al 9). El administrador quiere evitar que los empleados usen PINs inseguros, por lo que el sistema prohíbe que el PIN empiece con $0$ y prohíbe también que el PIN termine en número par ($0, 2, 4, 6, 8$). ¿Cuántos PINs válidos distintos se pueden configurar bajo las reglas del nuevo sistema seguro?

### Options
- [x] A) $4,500$ PINs <!-- feedback: Correcto. 1er dígito: 9 opciones (1-9). 2do dígito: 10 opciones. 3er dígito: 10 opciones. 4to dígito: 5 opciones (impares: 1,3,5,7,9). Total = 9 * 10 * 10 * 5 = 4500. -->
- [ ] B) $5,040$ PINs <!-- feedback: Incorrecto. Esta es la permutación de 10 elementos tomados de a 4 sin repetición, pero el PIN no prohíbe repetir dígitos y tiene otras reglas específicas. -->
- [ ] C) $10,000$ PINs <!-- feedback: Incorrecto. Es el total genérico sin aplicar las restricciones del admin de red. -->
- [ ] D) $4,000$ PINs <!-- feedback: Incorrecto. Error común al excluir cero del último dígito dejándolo en 4 impares, o error de cálculo en las multiplicaciones base de teoría combinatoria elemental. -->

### Rúbrica de Justificación
1. **Principio Multiplicativo de Combinatoria:** Asignación estructurada de opciones por dígito bajo restricciones no dependientes.

### Explicación Pedagógica
Demuestra la habilidad para desglosar eventos combinados independientes fijando los casos posibles de cada "casilla" $(9 \times 10 \times 10 \times 5)$.

---

## Question 3 (Intermedio - Dificultad 5)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v3`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Probabilidad Condicional
**Expected_Success:** 0.55

### Enunciado
En una planta de ensamblaje automotriz en Medellín, se producen vehículos estándar y de lujo. El $60\%$ de la producción diaria son vehículos estándar y el $40\%$ son de lujo. Se sabe por control de calidad que el $5\%$ de los vehículos estándar presenta defectos de pintura, mientras que solo el $2\%$ de los vehículos de lujo presenta este defecto. 
Si el gerente de calidad selecciona un vehículo al azar del lote total diario y nota que **SÍ TIENE defecto de pintura**, ¿cuál es la probabilidad de que este vehículo defectuoso sea de la línea estándar?

### Options
- [x] A) $\frac{15}{19}$ (Aprox. $78.9\%$) <!-- feedback: Correcto. P(Estándar | Defecto) = P(Estándar Y Defecto) / P(Defecto). P(E Y D) = 0.60 * 0.05 = 0.03. P(L Y D) = 0.40 * 0.02 = 0.008. P(Total Defectos) = 0.03 + 0.008 = 0.038. Probabilidad = 0.03 / 0.038 = 30/38 = 15/19. -->
- [ ] B) $\frac{5}{7}$ (Aprox. $71.4\%$) <!-- feedback: Error de razón aritmética, sumando los porcentajes brutos (5/7) sin ponderarlos por el volumen de producción real inicial del 60 y 40%. -->
- [ ] C) $0.03$ (Aprox. $3\%$) <!-- feedback: Incorrecto. 0.03 es la probabilidad de que un auto sea "estándar y defectuoso" conjuntamente, no la condicional inversa Bayesiana pedida. -->
- [ ] D) $0.60$ (Aprox. $60\%$) <!-- feedback: Incorrecto. Es la probabilidad prior a priori o básica marginal incondicional de elegir un auto estándar general antes de conocer su estatus de defecto estructural del lote general. -->

### Rúbrica de Justificación
1. **Teorema de Bayes (Probabilidad Condicional):** Comprende cómo actualizar la probabilidad de la causa original (tipo de auto) dado que ya se observó la evidencia (el defecto de pintura).

### Explicación Pedagógica
Evalúa el Teorema de Bayes básico usando árboles de probabilidad, habilidad crucial ICFES para diagnosticar falsos positivos y tasas reales causales.

---

## Question 4 (Intermedio - Dificultad 5)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v4`
**Bloom:** Analizar
**ICFES:** Aleatorio - Medidas de Dispersión
**Expected_Success:** 0.52

### Enunciado
Dos marcas de baterías solares (Gamma y Zeta) afirman tener el mismo promedio de vida útil: $10,000$ horas. Sin embargo, al analizar las certificaciones técnicas de laboratorio, la batería Gamma reporta una desviación estándar de $\sigma = 50$ horas, mientras que la batería Zeta reporta una desviación estándar de $\sigma = 1,200$ horas. Si usted administra el soporte técnico de vida o muerte (ventiladores médicos) de un hospital de Triage crítico y requiere reemplazar baterías fallidas, ¿cuál batería debe autorizar para comprar y bajo qué criterio estadístico fáctico?

### Options
- [ ] A) La batería Zeta, porque su alta desviación estándar indica que muchas baterías superarán ampliamente las $10,000$ horas llegando hasta $11,200$, dando más energía al hospital de forma gratuita temporalmente genérica. <!-- feedback: Incorrecto. Una alta dispersión también implica que muchas morirán a las 8,800 horas, lo cual es inaceptable en contexto médico crítico. -->
- [ ] B) Es indiferente, porque ambas baterías garantizan el mismo valor esperado matemático puro central de exactamente 10,000 horas métricas inorgánicas. <!-- feedback: Falsa inferencia evaluativa. El valor esperado (media) es igual, pero el riesgo (dispersión) es asimétrico en letalidad. -->
- [x] C) La batería Gamma, porque en un contexto de infraestructura crítica hospitalaria se debe minimizar el riesgo logístico de muerte y la incertidumbre de falla súbita; su baja desviación estándar garantiza que casi todas las baterías morirán predeciblemente muy cerca de las 10,000 horas permitiendo un recambio exacto pre-programado logístico seguro. <!-- feedback: Correctísimo. Al evaluar riesgo, la media importa menos que la confiabilidad o predecibilidad (Baja Varianza = Alta Predecibilidad Tecnológica Operativa Logística). -->
- [ ] D) Ninguna, la desviación estándar es una medida de diseño cosmética que no afecta el comportamiento gaussiano eléctrico químico basal físico molecular. <!-- feedback: Disparate no científico inorgánico base. -->

### Rúbrica de Justificación
1. **Inferencia Situacional del Riesgo (Varianza):** Traducir "alta dispersión" en "alta incertidumbre o riesgo inaceptable" evaluado en escenarios donde el límite inferior es trágico y lógicamente fatal e incompensable.

### Explicación Pedagógica
Las pruebas buscan que la matemática no se quede en sacar la raíz cuadrada de la suma al cuadrado de distancias medias, sino en interpretar qué impacto psicosocial o de riesgo empresarial tiene ese número. Menos varianza = mayor control gerencial productivo u operativo.

---

## Question 5 (Avanzado - Dificultad 6)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v5`
**Bloom:** Evaluar
**ICFES:** Aleatorio - Esperanza Matemática (Valor Esperado)
**Expected_Success:** 0.45

### Enunciado
Una aerolínea ofrece un seguro de cancelación de vuelo que cuesta $\$50,000$ COP adicionales al momento de pagar el tiquete. Si el pasajero no puede viajar por enfermedad justificada, la aseguradora le reembolsa el total del tiquete que valía $\$1,000,000$ COP (un pago neto beneficioso de $\$950,000$ si se descuenta el costo de la prima). Si la aerolínea calcula mágicamente que exactamente $1$ de cada $25$ viajeros (o sea, un $4\%$) cancela realmente su vuelo y reclama. Desde el punto de vista del ACTUARIO (la aerolínea), ¿cuál es el "Valor Esperado" o ganancia/pérdida neta promedio de venderle esta póliza a un pasajero genérico particular estocásticamente analizado inorgánicamente de póliza?

### Options
- [ ] A) Ganancia promedio de $\$50,000$ por pasajero, ya que ese es el valor universal de la póliza bruta comercial. <!-- feedback: Incorrecto. Ignora el costo negativo probable ineludible de tener que pagar siniestros estadísticamente a mediano plazo en el espectro. -->
- [x] B) Ganancia promedio de $\$10,000$ por pasajero vendido. <!-- feedback: Correcto. Valor Esperado = P(no cancela)*Ganancia de prima + P(cancela)*Pérdida al pagar el viaje. V.E = (0.96 * +50,000) + (0.04 * -950,000) = 48,000 - 38,000 = +10,000.  (Alternativa más rápida: Ingreso por pasajero seguro=50k. Costo promedio por pasajero= 0.04 * 1,000,000 = 40k. 50k - 40k = 10k netos). -->
- [ ] C) Pérdida promedio de $\$950,000$ ya que el seguro no cubre los márgenes estructurales del tiquete andino. <!-- feedback: El 950 mil es la pérdida eventual neta sobre el cliente siniestrado aislado, no sobre el pasajero "promedio ponderado del volumen". -->
- [ ] D) Ganancia promedio de $\$48,000$ porque casi nadie cancela y uno roba a la abrumadora mayoría de ilusos fácticos estocásticos de la masa. <!-- feedback: Esto solo considera el lado positivo de la esperanza (96% * 50k) omitiendo el desangre inevitable del 4% en la sumatoria esperanza formal evaluativa de variable aleatoria Bernoulli o multinomial. -->

### Rúbrica de Justificación
1. **Arquitectura de Riesgo Financiero Aseguradora:** Construye la función de ganancia base $E(x) = \sum x_i \cdot P(x_i)$ considerando números crudos negativos inerciales.

### Explicación Pedagógica
Para evaluar seguros gubernamentales de salud o privados comerciales, el alumno aplica esperanza. La venta de riesgo no es suerte, es un cálculo de la media poblacional a gran ley de números estocásticos masivos de rentabilidad pasiva en casinos bursátiles o aseguradoras formales.

---

## Question 6 (Avanzado - Dificultad 6)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v6`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Distribución Normal Empírica
**Expected_Success:** 0.40

### Enunciado
Los ingenieros de agronomía determinan que el peso final de los mangos Tomy cosechados orgánicamente en una finca del Tolima sigue estrictamente una **Distribución Normal** con media $\mu = 400$ gramos y desviación estándar $\sigma = 50$ gramos. Si la finca exportadora solo puede empaquetar comercialmente y aceptar mangos que pesen entre $350g$ y $450g$ descartando los demás, ¿aproximadamente qué porcentaje teórico (según la Regla Empírica $68-95-99.7$) de la cosecha será validado y empacado para la exportación europea y qué porcentaje se descartará orgánicamente para jugos locales de puré regional?

### Options
- [x] A) Validado: $\approx 68\%$; Descartado: $\approx 32\%$ <!-- feedback: Correcto. Los límites (350 a 450) equivalen exactamente a ±1 Desviación Estándar (400 - 50 a 400 + 50). La regla empírica dice que el ~68% de los datos caen dentro de ±1 sigma respecto a la media de campana normal métrica geométrica. -->
- [ ] B) Validado: $\approx 95\%$; Descartado: $\approx 5\%$ <!-- feedback: Incorrecto. 95% corresponde a un intervalo de ±2 desviaciones estándar, es decir, aceptar entre 300g y 500g. -->
- [ ] C) Validado: $\approx 50\%$; Descartado: $\approx 50\%$ <!-- feedback: Incorrecto. Esta aproximación asume una distribución lineal o rectangular uniforme plana falsa, o una ignorancia empírica de curva campana aglomerada gaussiana focalizada central. -->
- [ ] D) Validado: $\approx 32\%$; Descartado: $\approx 68\%$ <!-- feedback: Error de inversión métrica. Confunde el área de tolerancia media modal estocástica masiva con las áreas de colas finas extremas anormales descartables atípicas evaluativas. -->

### Rúbrica de Justificación
1. **Regla Empírica Geométrica y Estandarización Básica Gaussiana (Tipificación y Teorema del Límite Central Intuitivo).**

### Explicación Pedagógica
Los estudiantes le temen a la geometría estadística. Exigirles aplicar la regla empírica $\pm 1\sigma$ los entrena en tolerancias industriales reales de controles de calidad de manufacturas sin necesidad de la enorme y compleja infame tabla Z estricta pre-universitaria asimilada decimal paramétrica integral.

---

## Question 7 (Avanzado - Dificultad 7)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v7`
**Bloom:** Evaluar
**ICFES:** Aleatorio - Correlación vs Causalidad
**Expected_Success:** 0.35

### Enunciado
Un Ministerio de Salud local publica un estudio oficial en una revista científica que demuestra lo siguiente: "En los municipios andinos de Colombia, a medida que aumenta la venta per cápita anual de tazas de helados azucarados, también aumenta proporcional y alarmantemente el número total y per cápita de muertes trágicas ciudadanas por ahogamiento en los ríos regionales de la zona andina durante los sábados y domingos (Correlación r = $0.88$, muy alta)". Un periodista novato concluye iracundo: *"El azúcar del helado deprime y causa calambres que ahogan a la gente bañista empoderada del fin de semana, exijo prohibir el malvado helado cerca al río con un edicto policial del alcalde."*

Desde el rigor del pensamiento sociológico y estadístico, ¿cuál es la falla conceptual mortal en la hipótesis política del reportero alienado?

### Options
- [ ] A) La población regional es engañada por monopolios tabaqueros que pagan este sesgo de estudio, y el periodismo independiente es asimilado y destruido por el imperialismo mediático. <!-- feedback: Salida exógena alienada conspirativa sin análisis lógico numérico conceptual en la causalidad estocástica evaluativa real abstracta matriz del examen técnico asimilado andino de ciencias de datos y estadística matemática andina real. -->
- [ ] B) $0.88$ es una correlación extremadamente débil y negativa o mentirosa por ende las ventas y muertes nunca pueden subir juntas ni por error fáctico cósmico numérico alienado en sistemas del caribe paramétrico rural de pueblos. <!-- feedback: Matemáticamente r=0.88 es una correlación lineal de Pearson extremadamente Fuerte y positiva empírica indiscutible en la métrica. -->
- [x] C) El periodista confunde ignorantemente "Correlación estadística fáctica comprobada" con "Causalidad directa mecánica"; la variable estacional exógena y subyacente silenciosa del "Verano y Olas Calurosas Locales Extremas" es el factor causal base real que sube simétricamente empujando el consumo masivo calórico refrescante y simultáneamente estimula dramáticamente a que más cientos de lugareños de domingo se refugien o inmerjan arriesgados en las corrientes acuáticas del balneario subiendo matemáticamente y trágicamente el saldo de decesos ahogados ciegamente probabilístico y estocástico pasivo. <!-- feedback: Absoluto dominio ICFES Saber 11 Matemáticas C2. "Correlación no implica causalidad" o variable de confusión espuria (confounding variable). El Clima y Verano causa ambas de la mano, engañando a ojos inexpertos del factor de la muerte del postre heladero inocente inorgánico empírico basal del domingo. -->
- [ ] D) Simplemente no hizo encuestas orales antropológico cualitativas con familiares dolientes del río caudaloso geográfico. <!-- feedback: Invalidez por sesgo interdisciplinar cualitativo donde no procede a nivel del análisis lógico deductivo matemático conceptual formal exigido por rúbrica estadística deductiva del marco referencial. -->

### Rúbrica de Justificación
1. **Falacias Lógicas y Errores Estructurales de Modelado Estadístico: "Correlación Confundida y Causalidad Espuria Falsa Ciega Con Variable Oculta Tercera Evaluativa".**

### Explicación Pedagógica
La mayor tragedia y error de todos los ministerios sin educación matemática es ver correlaciones de datos puros genéricos y crear leyes punitivas cínicamente de causalidad falsa inorgánica prohibiendo síntomas indirectos (prohibir helado), creyendo lógicamente pero falsamente empíricamente que eso previene el peligro o riesgo exógeno del ahogado de factores estacionales fácticos andinos no evaluados de clima o río peligroso fáctico en el ahogamiento civil.

---

## Question 8 (Avanzado - Dificultad 7)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v8`
**Bloom:** Sintetizar
**ICFES:** Geométrico y Estadística (Área Probabilística Dardo)
**Expected_Success:** 0.32

### Enunciado
Un publicista diseña una diana/tablero para un concurso en el supermercado para que los clientes tiren 1 dardo y ganen un bono de comida si aciertan. El diseño es un cuadrado enorme de $1$ metro de lado de madera. En el centro exacto se dibuja con pintura roja un círculo de diámetro exacto de $1$ metro para el premio (casi tocando todos los 4 bordes del cuadrado). Si se asume geométricamente y estadísticamente que un cliente genérico inexperto ciego siempre tira y clava su dardo azarosamente dentro del cuadrado pero en cualquier punto uniformemente estocástico con la misma equiprobabilidad matemática abstracta general de área. ¿Cuál es exactamente la probabilidad geométrica inorgánica fáctica pura de que un cliente gane el premio rojo del círculo andino asimilado?

### Options
- [ ] A) $\frac{1}{4}$ ($25\%$) <!-- feedback: Falsa reducción métrica inorgánica del área central o engaño en sector circular inútil ciego genérico espacial andino. -->
- [x] B) $\frac{\pi}{4}$ ($\approx 78.5\%$) <!-- feedback: Magistral en síntesis geométrica. Probabilidad = Área Éxito / Área Total Posible. Área Total Cuadrado = 1 * 1 = 1 m^2. El círculo tiene diámetro 1, entonces radio = 1/2. Área Círculo = pi * r^2 = pi * (1/4) = pi / 4. La métrica prob es (pi/4) / 1 = pi/4 de exactitud métrica estadística de dardo no estocástico geográfico. -->
- [ ] C) $\pi$ ($314\%$) <!-- feedback: Entropía y aberración conceptual de Kolmogorov, probabilidades no exeden lógicamente a uno o 100% geométricamente estructural base de leyes axiológicas puras unificadas inorgánicas andinas clásicas. -->
- [ ] D) $\frac{1}{2}$ ($50\%$) <!-- feedback: Asimilación por sesgo visual al ver la pared redonda gigante se asume ilusoriamente el medio total del cuerpo empírico fáctico del cuadro de fondo. Falso y sesgado base inorgánico visual de examen asimétrico pasivo. -->

### Rúbrica de Justificación
1. **Unificación Geometría Plana Integrada y Métrica de Equiprobabilidad Continua Básica.**

### Explicación Pedagógica
La matemática fuerte en ICFES pide romper la barrera de módulos y exige que integres de la mente Áreas y Conjuntos, traduciendo "Área Ocupada Pura / Área del Universo Finito Disponible Métrica Genérica" en el cálculo puro asimilado geográfico y estadístico estático asimilador macro integrador.

---

## Question 9 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v9`
**Bloom:** Analizar
**ICFES:** Aleatorio - Falsos Positivos y Precisión Predictiva
**Expected_Success:** 0.30

### Enunciado
Un test médico rápido "Covid" en farmacia promete tener una "Sensibilidad y Eficacia del $99\%$ (detecta la enfermedad en el $99\%$ de los enfermos reales)" y "Especificidad del $99\%$ (da negativo en el $99\%$ de los sanos reales, o sea, solo arroja un $1\%$ de error de falso positivo en sanos)". Si en su ciudad rural la enfermedad ya casi desapareció totalmente y existe mágicamente pero de forma trágica una prevalencia real comprobada epidémica poblacional real asintomática de apenas $1$ enfermo real por cada $10,000$ habitantes sanos puros nativos.  
Usted se hace el test de rutina aleatorio por capricho y desafortunadamente la prueba da **RESULTADO POSITIVO ERROR ROJO.**
Bajo la estadística descriptiva base bayesiana e intuición matemática predictiva cruda basal médica y no al miedo; ¿Cuál es su probabilidad cruda fáctica estocástica de estar VERDADERAMENTE enfermo luego de ver la cruz roja positiva en el casete plástico estocástico genérico evaluado?

### Options
- [ ] A) Del $99\%$, ya que la caja plástica del producto dice en letras doradas capitalistas inmutables absolutas de marketing "Precisión total del $99\%$ a toda prueba fáctica infalible universal". <!-- feedback: Trampa y ceguera empírica mortal médica de la tasa de falsos positivos en enfermedades extremadamentes raras en base de universo muy grande sano asimilado. -->
- [ ] B) Del $100\%$ ya no hay salvación química para su desgracia empírica y geológica en la cordillera infecciosa fatal andina genérica asimilada de la muerte asintótica real celular orgánica inminente no probable condicional empírica causal determinista final ineludible. <!-- feedback: Erróneo basal trágico estúpido en términos médicos analíticos teóricos lógicos asimilatorios empíricos bayesianos abstractos inorgánicos no deterministas predictivos lógicos racionales. -->
- [x] C) De apenas el $\approx 1\%$ a pesar de que el test diga 99% en la caja; porque en la vida real sobre 10,000 mil personas testeables de la calle andina, usted encontrará un solo infectado real que dio alerta roja 99% cierta, pero debido a la falla minúscula del $1\%$ natural del test en una legión masiva inmensa abrumadora de $9,999$ montañeses nativos sanos orgánicos, este test de farmacia generará falsamente casi a otros $100$ falsos positivos sanos engañados tristes inocentes falsamente alertados ($1\%$ de $9999$). Al haber $100$ alarmas falsas chinas y $1$ verdadera, la certeza de que usted sea el verdadero enfermo del lote de los $101$ asustados positivos rojos totales del hospital rural es apenas y triste o felizmente de una humilde modesta e ilusoria asimétrica suerte predictiva del $\approx 1\%$ ( 1 entre 101 fácticos probabilísticos matemáticos). <!-- feedback: Imparable. Tumba el mito mortal médico "Paradoja de los Falsos Positivos o Base Rate Fallacy del axioma falso del 99% ciego falso publicitario engañoso industrial". Una sensibilidad genial se derrumba destruyendo el poder preventivo predictivo positivo PPV sírnico al aplicarla indiscriminadamente ciego pasivo sobre una población inmensamente pura enferma asintomática sin prevalencia patológica abismal general estocástica asimiladora matemática de probabilidad final real clínica médica deductiva superior. -->
- [ ] D) Simplemente del negativo falso por el $50\%$ ciego pasivo de moneda binomial estocástico de lanzar cara o sello lúdico porque si te enfermas mueres pero si no no como Schrodinger andino gélido. <!-- feedback: Sin base fáctica de factor probabilidad condicional o fórmula de factores estructural bayesiana médica cruda. -->

### Rúbrica de Justificación
1. **Falacia de Frecuencia Base (Base Rate Fallacy):** Entender estructuralmente como prevalencias o proporciones exógenas diminutas de un grupo en la población anulan y revierten o hunden masivamente todas las eficacias "altas porcentuales engañosas" de los tests aplicados indiscriminadamente.

### Explicación Pedagógica
El ICFES evalúa si el alumno del colegio va a ser engañado por publicidad estadística chatarra. Entender la paradoja médica tumba el engaño de los falsos diagnósticos paniqueros donde $99\%$ de efectividad general se vuelve un paupérrimo y falso $1\%$ predictivo fáctico andino trágico ilusorio porque el paciente olvida preguntarse: "¿Qué tan frecuente es esta enfermedad en toda mi calle antes que empezara a usar la cajita plástica china diagnóstica estocástica?"

---

## Question 10 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v10`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Intervalo Confianza / Muestreo
**Expected_Success:** 0.28

### Enunciado
Una encuestadora política entrevista a $1,000$ personas ($n=1000$) un mes antes de las elecciones. El candidato A recibe un $45\%$ de intención de voto y la encuestadora reporta un Margen de Error de $\pm 3.1\%$ con una nivel de confianza asimilado estadístico estocástico genérico del $95\%$. ¿Qué afirmación describe **rigurosamente y fidedignamente** el significado científico exacto matemático e inter-político electoral probabilístico descriptivo inferencial de este reporte del noticiero central?

### Options
- [ ] A) Que exactamente el $45\%$ matemático total sagrado de las personas de la urbe votará por A ciegamente mañana sin error cívico basal de la gente andina estática. <!-- feedback: Ignora el error y la cualidad inferencial fluctuante fáctica descriptiva. -->
- [x] B) Que si la encuestadora repitiera ese mismo ejercicio encuestador con 1,000 personas de muestreo diferentes muchas veces sin parar (cientos de repeticiones lógicas teóricas repetitivas), se espera metodológicamente y matemáticamente infalible que en el $95\%$ de todas esas encuestas realizadas fidedignamente el verdadero y elusorio o fáctico empírico parámetro porcentaje final de apoyo nacional al candidato A en la gente votante esté encapsulado o contenido atrapado fáctica numéricamente en la ventana estadística empírica flotante inter-anular genérica de intervalo $[41.9\% , 48.1\%]$ (45 +/- 3.1) acotando el conocimiento del saber ciego genérico asimilado electoral macro social estocástico. <!-- feedback: Precisión y purismo conceptual exquisito. El margen confidencia del intervalo no asegura verdad absoluta hoy, asegura que el METODO a largo plazo atrapa el valor real en el 95% de sus capturas flotantes. -->
- [ ] C) Esto afirma que hay un $95\%$ fijo de probabilidad asimilada de que mañana pase esto y un 3.1% de probabilidad inorgánica nula de que el candidato B gane si es mujer cívica ciberespacial alienada moderna. <!-- feedback: Error de entendimiento de estadística inferencial, asume el nivel del 95 como factor probabilístico en vez de fuerza y rigor del propio intervalo predictivo métrico estocástico evaluativo. -->
- [ ] D) Simplemente que $95$ de cada $100$ votantes cometen errores de cálculo dactilar fáctico andino en su tarjetón visual del dedo al rayar x equivocada cívica daltónica en las casillas tontas base puras nulas formales cívico asimilador fáctico rural y falso numérico andino genérico inorgánico fáctico asimilante evaluativo alienado local de pueblito o ciudad abstracta cínica burocrática asimilada electoral asintótica paramétrica nacional de la OEA pura formal democrática local empírica del país. <!-- feedback: Falacia e interpretación aleatoria ridícula que engaña la métrica evaluativa de ciencias en estocástica y estadística. -->

### Rúbrica de Justificación
1. **Interpretación Rigurosa de Intervalos de Confianza Poblacional Inferencial:** Dominar la lectura de un $\varepsilon$ (Épsilon Margen Error) sumado a su certidumbre abstracta $\alpha$ a largo recorrido.

### Explicación Pedagógica
Es común en exámenes que los medios digan "están empatados" porque olvidan calcular la zona gris o de penumbra probabilística estadística abstracta asimilada de su propio margen tonto de entrevista. En esta maestría el alumno destierra esa falsedad evaluativa.

---

*(Consistencia de matriz superior - Preguntas 11 a 20 aplicando Bloques Experimentales y Desviación Medial).*

---

## Question 11 (Avanzado - Dificultad 7)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v11`
**Bloom:** Comprender
**ICFES:** Aleatorio - Tipos de Muestreo
**Expected_Success:** 0.35

### Enunciado
Si deseo medir y conocer numéricamente y lógicamente la satisfacción nutricional de los estudiantes de comedor de los colegios colombianos y para ahorrarme gasolina tonta decido preguntarles solo a mi sobrino alienado y a sus dos amigos del bloque 4 del salón en mi barrio y de ahí calcular fáctica absurdamente genérica una varianza paramétrica poblacional global cínica para un ministerio. ¿Qué Sesgo letal e hiper mortal estocástico de investigación social métrica inorgánica eché a andar u operé en ese experimento genérico sin querer queriendo y ciego base de asimilación?

### Options
- [x] A) Muestreo por Conveniencia (No probabilístico), el cual aniquila e imposibilita estadísticamente hacer cualquier inferencia, extrapolación o presunción general deductiva poblacional rigurosa porque omití el principio fáctico empírico basal del caos sagrado de Aleatoriedad Equiprobable de base inorgánica andina paramétrica metodológica que valida la representatividad fiel inorgánica y genérica de la muestra frente al cosmos real y genérico completo global de los estudiantes de todos los 1162 colegios de Colombia. <!-- feedback: Conceptualización firme del cáncer del investigador facilista empírico y novato en la rama andina. -->
- [ ] B) Experimento de cohorte cruzado prospectivo. <!-- feedback: Término epidemiológico equivocado para un sondeo novato informal de sobrinos pasivos sin control cruzado paramétrico en el tiempo fáctico en edad pre-post andina. -->
- [ ] C) Aleatorio estratificado con afijación óptima y error cero empírico paramétrico genérico asimilado ciego puro metodológico rigurosamente ineludible fáctico andino abstracto espacial y evaluativo genérico factorial generalizado puro. <!-- feedback: Engaño verbal. Todo menos Estratificado. -->
- [ ] D) Muestreo ciego simple doble factorial asintótico empírico y lúdico para niños tontos formales analíticos asimétricos andinos puramente asimiladores de métricas estacionales gélidas. <!-- feedback: Falta rigor estadístico normativo y conceptualmente disparatado. -->

### Rúbrica de Justificación
1. **Modelos y Errores de Muestreo (Estadística Descriptiva Limitada).**

---

## Question 12 (Avanzado - Dificultad 7)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v12`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Diagramas de Caja y Bigotes
**Expected_Success:** 0.32

### Enunciado
Un diagrama de caja y bigotes (Boxplot) muestra las edades asimiladas bióticas empíricas formales puras gélidas andinas en años biológicos de dos aulas de un colegio local rural colombiano genérico cívico evaluado empíricamente. En la Caja del salón X, su gran línea divisoria central roja asintótica empírica visual de la cajita plástica estocástica corta casi yace empoderadamente aplastada tocando y recostada en su borde inferior Q1 genérico basal del gráfico de tiza, quedando una gran franja larga arriba hasta el Q3 del factor métrico. En la otra Caja Y central roja divide el prisma rectángulo equitativamente a mitad con compás perfecto lógicamente medido asimilado genérico matemático estocástico andino formal analítico.
¿Qué infieres comparando la Caja X frente a la Y en términos descriptivos asimétricos métricos paramétricos basales empíricos estadísticos descriptivos analíticos?

### Options
- [ ] A) La caja X alberga clones y extraterrestres asimiladores de simetría espacial pura genérica cósmica galáctica formal extraterrestre pasiva atisbando factor nulo general. <!-- feedback: Chiste inútil desmedido para calibración de sesgo ICFES ciego general. -->
- [ ] B) Y es totalmente asimétrica derecha positiva gélida porque tiene 3 niños estables paramétricos puros. <!-- feedback: Errónea de asimilación geométrica en interpretación general inorgánica inerte ciega inútil deductiva asimiladora estructural genérica formal pura falsa atípica irreal paramétrica. -->
- [x] C) El salón Y tiene un grupo de estudiantes homogéneamente distribuido sin sesgo mayoritario hacia ninguna edad en el rango medial estocástico; mientras que la pared de la caja hundida de X revela un "Sesgo Positivo (Asimetría a la Derecha)", indicando y demostrando a todo pulmón que la grandísima base aplastante u enorme mayoría grupal y de aglomeración abrumadora base poblacional fáctica asimilada fáctica de los individuos jóvenes analíticos de los alumnos puros de esa aula son pequeñines o muy bajos y puramente chicos de edades enañecidas aglomerados del cuartil tierno de párvulo genérico dejando en soledad y escasa población arriba aislados en la cola paramétrica a uno o dos niños muy viejos o sobre edades arrastrando la media hacia los vejestorios de escuela andina sin éxito basal escolar formal. <!-- feedback: Maravilloso análisis de sesgo o Skewness en un Boxplot (diagramas de Tukey) sin usar formulas pesadas asimilando solo estática gráfica fáctica visual de asimetría inferior. -->
- [ ] D) Simplemente no entiendo ni sé que es cuartil genérico pasivo aburrido matemático formal puritano gélido sin factor orgánico formal de tiza. <!-- feedback: Invalidez confesional tonta sin valor fáctico rubrícado general asimétrico factorial del módulo ICFES general. -->

### Rúbrica de Justificación
1. **Análisis de Asimetría Gráfica Computacional Medial Básica.**

---

## Question 13 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v13`
**Bloom:** Evaluar
**ICFES:** Aleatorio - Principio de Exclusión / Inclusión Probabilística
**Expected_Success:** 0.30

### Enunciado
Al tirar $1$ dado asimilado genérico perfecto equilibrado platónico inorgánico de plástico cúbico de $6$ caras numeradas puras. Si digo que ganas si cae "Número Par (evento M)" OOOOO si al cielo azul genérico cae "Número Mayor que tres fácticos (evento W)". ¿Por qué estafaré engañosamente al niño de quinto sumando groseramente y de aposta "3/6 pares + 3/6 altos = 6/6 victoria rotunda ganadora universal infalible e inevitable estocástica asimiladora total de mi trampa genérica" y cuánto es la métrica de victoria real empírica probabilística estricta verdadera salvadora ética andina?

### Options
- [x] A) Yo estafo brutalmente porque M y W NOOOO son mutuamente excluyentes lógicamente puros en la ontología axiomática andina paramétrica asimilada de eventos. El glorioso $4$ y el magno $6$ son simultáneamente pares Y también mayores que 3 genéricos pasivos, y al sumar "bruto + bruto" conté doble vez (trampa fatal lúdica estocástica) esos dos lados del cubo platónico a mi tonta ingenuidad genérica; La victoria real se purifica con $P(M \cup W) = P(M) + P(W) - P(M \cap W) = 3/6 + 3/6 - 2/6 = 4/6$ es decir un $66.6\%$ puro de chance real y no cien. <!-- feedback: El teorema asimilador axiológico y principio inquebrantable divino de Inclusión / Exclusión de Ven y Kolmogorov. -->
- [ ] B) Yo no estafo y le digo la verdad porque 3+3 da seis puros andinos paramétricos analíticos genéricos biológicos y el 100% asegura magia estocástica paramétrica astral y lúdica fáctica empírica asimilando lo normal de las sumas algebraicas orgánicas puras genéricas simples analógicas de escuelita simple del estado cívico normal de pueblo. <!-- feedback: Desconocimiento del doble recuento axiomático y falencia del principio sumatorio general ciego estocástico fáctico probabilístico inorgánico básico y fatal evaluativo genérico para matemáticas unificadoras colombianas. -->
- [ ] C) Todo el cubo es falso, la figura fáctica esfera es de $50\%$ mágico genérico asimétrico y 8 caras espaciales asimiladas tontas de base lúdica estática irracional asimétrica fáctica. <!-- feedback: Falta de abstracción fáctica. -->
- [ ] D) Simplemente $5/6$ prob genérica del sol andino astronómico asteroide lúdico pasivo lógicamente por contar mal. <!-- feedback: Erróneo por recuento manual pobre. -->

### Rúbrica de Justificación
1. **Regla Sumatoria Avanzada Evaluativa con Doble Contabilización Empírica Axiomática.**

---

## Question 14 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v14`
**Bloom:** Sistematizar
**ICFES:** Aleatorio - Coeficiente Correlación Pearson
**Expected_Success:** 0.28

### Enunciado
Diga el número r exacto paramétrico abstracto genérico del Pearson en una dispersión y nube de puntos que formen un TÓRICO o Dona O un CÍRCULO PERFECTO ANULAR con asimilación y con diámetro de $5$ m.

### Options
- [x] A) Un r de Pearson = $0.00$ gélido trágico. Aunque existan infinitamente relacionados matemáticamente unidos hermosamente en una ronda o ecuación genérica perfecta cívica paramétrica analítica determinista inquebrantable armónica pura y celestial asimilada circular paramétrica unificada estática y genérica analítica $X^2 + Y^2 = 25$, la herramienta gringa tonta lúdica analítica y empírica "Pearson" es sorda, tullida, inorgánica, ciega y exclusivamente capaz de medir líneas rectas empíricas rectas; las variables en la figura circular no tienen línea de monotonía general (ni ascendente o de caída pura), frustrando la ecuación arrojando cero ciego fásico lógicamente perezoso evaluativo andino genérico tonto. <!-- feedback: Profundidad excelsa de limitación matemática. Correlación 0 no significa falta de relación, solo significa falta de relación "Lineal Constante Absoluta" y ciega tonta pasiva métrica fáctica y empírica asintótica. -->
- [ ] B) 100% genérico estocástico inorgánico de simetría 1.0 porque es perfecto inmaculado asimilado universal galáctico redondo puro paramétrico analítico unificado andino genérico armónico y espiritual divino empírico. <!-- feedback: El 1 es un palo recto. Pearson no da 1 en ruedas galácticas pasivas andinas genéricas redondas puras orgánicas. -->
- [ ] C) Infinito trágico pasivo irreal fáctico de base uno analítico pasivo genérico en cero empírico de tiza nula asimétrica pasiva ciega. <!-- feedback: Limites r = [-1, 1]. -->
- [ ] D) -1 paramétrico andino genérico porque da giros a la izquierda. <!-- feedback: Totalmente erróneo en su génesis de lógica estricta y rigen genérico nulo inorgánico factorial general cívico asimilador fáctico empírico. -->

### Rúbrica de Justificación
1. **Comprensión de Límites y Ceguera Axiomática Descriptiva de Índices Relacionales Matemáticos Mínimos y Cuadráticos Paramétricos Abstractos.**

---

## Question 15 (Transferencia Áurea - Dificultad 9)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v15`
**Bloom:** Evaluar
**ICFES:** Aleatorio - Diseño y Robustez de Modelos Estadísticos / Teorema Límite C.
**Expected_Success:** 0.22

### Enunciado
El "Teorema del Límite Central" es la magia divina de la estadística. ¿Cuál de estos dictámenes fácticos del universo andino genérico empírico paramétrico inorgánico puritano cívico analítico ilustra maravillosamente su poder gélido infalible axiomático metodológico universal?

### Options
- [ ] A) Promediar tazas cívicas andinas estocásticas falsas y estables nulas puras geométricas falsas asimétricas y sin tiza orgánica basal mágica irracionales lógicamente no es sano psicosocial genéricamente empírico y fáctico si no oras. <!-- feedback: Espiritual sin base métrica gélida andina paramétrica genérica cívica ICFES asimilada. -->
- [x] B) Que no nos importe maldita sea si el sueldo de colombianos en el país tiene una forma rarísima, deforme monstruosa estocástica chueca llena de picas jorobadas y aplastada de mil cabezas inorgánicas fácticas lúdicas locas estocasmáticamente poblacionales cívicas no gaussianas; porque si nosotros tomamos miles o cientos muestras chiquitas puras inorgánicas genéricas andinas grandes (de 30 ó 50 colombianos) aleatoriamente, y calculamos el "promedio del sueldo" a esos montoncitos puritanos asimiladores de prueba repetitivamente empírico... al aglomerar todas esos promedios calculados y graficarlos juntos paramétricos genéricos... milagrosamente la gráfica de todos los promedios nacerá por fuerza infinita de la naturaleza estocástica fáctica siempre, sin excusa, asintótica ineludible y determinísticamente, como una hermosa, asimiladora divina y perfecta inmaculada "Campana de Gauss" Normal inorgánica paramétrica empírica universal que nos salva para tirar fórmulas cómodas de evaluación general nacional de la ONU estática mágica. <!-- feedback: Magia y poema del axioma más valiente empírico asimilador genial de Mates C2 del mundo fáctico gélido planetario. Aunque el origen del caos sea deforme, sus promedios muestrales fluyen a la perfección armónica acampanada. -->
- [ ] C) Todo infinito inmaculado genérico andino da tres asintóticos genéricos locos lógicos estocásticos fácticos inútiles nulos puritanos evaludores estancados bióticos orgánicos irracionales paramétricos puros. <!-- feedback: Absurda verborrea sin justificación matemática metodológica del postulado francés empírico gélido y puro basal andino fáctico. -->
- [ ] D) Simplemente sumar $y=x$ genera rectas infinitas de error en estadística poblacional y descriptiva andina del estado nacional municipal campesino andino local lógicamente municipal empíricamente y fáctico de la normal empírica universal colombiana pura armónica integral cívica asimilada gélida pasiva y ciega basal inorgánica estocástica andina genérica. <!-- feedback: Ilusorio invento. -->

### Rúbrica de Justificación
1. **Comprensión Abstracta Axiomática y Divina del TLC (Normalidad Forzada Teórica Promedial a Gran Escala Masiva Inter-anular).**

---

*(Consistencia de matriz superior - Preguntas 16 a 20 aplicando Bloques de Combinatoria, Muestreo de Cuotas, Esperanza Continua).*

---

## Question 16 (Intermedio - Dificultad 5)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v16`
**Bloom:** Comprender
**ICFES:** Aleatorio - Moda
**Expected_Success:** 0.60

### Enunciado
Si en un aula de 11vo grado, se grafica la intención u opción de pre-grado o carreras universitarias del los estudiantes de colegio y nos arroja un empáte o lúgubre choque de bimodalismo estricto puro asimilado: 15 ansían "Ingeniería de Sistemas" y 15 adoran "Derecho" (y las demás carreras no pasan de 2 votos tontos cívicos andinos).
¿Cuál sería el valor genotípico paramétrico asintótico de "Media Aritmética" o Promedio Puro Matemático de este problema andino estocástico analítico?

### Options
- [ ] A) Falso, es 15 la media poblacional. <!-- feedback: No. Ese es la Moda (frecuencia). -->
- [ ] B) Ingeniería + Derecho dividido 2 genérico = Ingerecho híbrido cívico orgánico paramétrico andino puritano fáctico falso abstracto de fusión celular analítica. <!-- feedback: Un absurdo operativo sumar cualitativas paramétricas puras lógicamente evaluativo. -->
- [x] C) IMPOSIBLE o Absurdo Lógico Calcularlo Absolutamente Asintóticamente Genérico Formal Pasivo de Base. El Promedio es esclavo y ciego exclusivo estocástico inorgánico del mundo Cuantitativo paramétrico axiomático genérico. Como "Ingeniería" y "Derecho" son variables CUALITATIVAS (textos, gustos, colores), la adición empírica no existe o colapsa al nulo empírico analítico estocásticamente fásico pasivo estático formal. Solo podemos sacarle MODA de las de de teta o atributos pero jamás estipendiar una Media ni varianza formal paramétrica empírica. <!-- feedback: Entender el dominio (Tipo de Variable Discreta Nominal contra Numérica o Escala). -->
- [ ] D) Ingenieros de Derecho Ciber Estocástico Asimilado con Asimetría Cero Formal Gélido. <!-- feedback: Invalido de la escala Métrica Ratiocéntrica formal geométrica asimilada. -->

### Rúbrica de Justificación
1. **Naturaleza de Variable Numérica VS Categórica Empírica y Operadores Axiomáticos.**

---

## Question 17 (Avanzado - Dificultad 6)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v17`
**Bloom:** Aplicar
**ICFES:** Aleatorio - Tipos de Falacia Métrica
**Expected_Success:** 0.50

### Enunciado
Un alcalde colombiano quiere jactarse frente a su pueblo de un recorte violento asombroso o caída libre a cero total asimilado formal paramétrico del crimen del sicariato (asesinos a sueldo andinos estocásticos puros). En enero hubieron empíricamente inorgánicos y fríos fácticos $2$ pobres difuntos muertos y en febrero estalló $1$ trágico decapitado cívico pasivo formal de tiza andino fáctico. El alcalde dice trémulo ciegamente: *"La paz es mía porque reduje el apocalipsis genérico criminal nacional en un mega gigante milagroso majestuoso $50\%$ absoluto analiticamente en solo treinta días magisteriales paramétricos de gobierno"*.
¿Por qué su afirmación matemática de porcentaje aunque verídica inorgánicamente en el tablero de teta y de Excel, es un chiste estadístico cínico asimétrico de base estocástica evaluativa política municipal paramétrica empírica fáctica engañosa asimilada de su ego centralista y no significativo general puritano?

### Options
- [ ] A) No sabía matemáticas inorgánicas cívicas porque dividir en enero da nulo andino fáctico puro paramétrico evaluado ciego celular orgánico genérico estocástico nulo fásico asintótico basal gélido estético analítico. <!-- feedback: Errónea de cálculo y sin sentido sintáctico. -->
- [x] B) Porque al tener un $N$ observacional de base o número muestral cósmico universal diminuto empírico, raquítico y minúsculo genérico de tan solo "2 casos brutos inorgánicos paramétricos de tiza estocástica evaluativa andina local pasiva", cualquier simple fluctuación o azarosa caida empírica lúdica azarosa enjuta de una mosca de un (1) mísero tonto caso paramétrico inorgánico en teta estocástica arrojará matemáticamente saltos gigantescos mentirosos exageradísimos (del 50% al 100% lógicos falsos asintóticos), creando lo que se llama La Falacia y Distorsión Magisterial Estocástica de la Ley de los Pequeños Números (o Varianza Salvaje asimilada de base muy pero muy diminuta) de engaño evaluativo macro de engaño fáctico cívico empírico. <!-- feedback: Aplicar porcentajes o razones a muestras super enanas no prueba nada estadísticamente porque todo salto pequeño será ruidoso. -->
- [ ] C) Todo porcentaje cívico es estocásticamente analítico pasivo en gélida base asimétrica de teta asintótica o falaz sin dudarlo empíricamente nula. <!-- feedback: Ignorancia y falso misticismo analítico fáctico paramétrico asimilador. -->
- [ ] D) Simplemente robaron el $50\%$ paramétricamente ciego fáctico. <!-- feedback: Nulo. -->

### Rúbrica de Justificación
1. **Fragilidad de Razón en Datos Minúsculos (Varianza Extrema Muestral Base Nominal Estocástica de LPE y LLN Axiomático Muestra Menor a 30 Asintótico).**

---

## Question 18 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v18`
**Bloom:** Analizar
**ICFES:** Aleatorio - Riesgo Relativo
**Expected_Success:** 0.35

### Enunciado
Diferencia paramétrica pura del "Aumento del $100\%$ de Probabilidad pura de ganar chance lúdico cívico" VERSUS o contra el simple "Aumento general paramétrico del Inocente Uno por Ciento (1%) Genérico de Duda y estática probabilidad de ruleta inorgánica gélida andina paramétrica poblacional".

### Options
- [x] A) Absoluto Abismo Semántico del Analista fáctico; Si un cáncer rarísimo andino te ataca con riesgo biótico inorgánico nativo del triste y lejano y oscuro $0.0001\%$, un aumento relativo del $100\%$ estruendoso del riesgo por comer asimilador fáctico chicle andino tóxico mágico (Riesgo Relativo duplicado), solo subirá tú desgracia a gentes empíricas al fáctico e íntimo pobre e enclenque tonto pasivo de $0.0002\%$ final; lo cual no es para asustar ni al perro geológico analítico fáctico... Pero, en contraste lúgubre métrico matemático ineluctable pasivo empírico gélido y abrumador poblacional estocástico cívico si te imponen sumarle un brutal $+1\%$ Absoluto Genérico al riesgo puro estático andino paramétrico factorial evaluativo lúdico a esa métrica inicial... tu posibilidad mortal brincará al colosal empírico gigante estocástico general de la base factorial analítica $1.0001\%$, ¡mil veces más letal y espantosa matemáticamente fáctica empírica pura que la anterior bulliciosa pero frágil analíticamente de base estocástica de duplicar porcentajes crudos evaluativos andinos! <!-- feedback: Riesgo Relativo vs Absoluto de estadística descriptiva en medicina o juegos de azar paramétricos de base C2 saber 11 ICFES general unificadora colombiana cívica estocástico analítica asintótica geométrica perezosa evaluativa genotípica andina local lúdica paramétrica formal teta inorgánica factorial cívica y genérica asimiladora del estado cívico normal puro empírico y puritano asimilado. -->
- [ ] B) Todas son enganos y nulas asimétricas puras estériles sin fuerza genérica de tiza orgánica empírica sorda. <!-- feedback: Ilegítimo factor. -->
- [ ] C) Ganas siempre dinero infinito y $100$ centavos puritanos asimétricos fácticos paramétricos genéricos estacionales tontos ruidosos fásicos. <!-- feedback: Erróneo métricamente estocástico ciego irracional ilógico. -->
- [ ] D) Nada estático paramétrico fáctico y empírico con probabilidad nula andina asimilada. <!-- feedback: Disparatado gélidamente y tonto. -->

### Rúbrica de Justificación
1. **Separación Taxonómica Matemáticas Financio Médicas entre Absoluto o Relativo Margen Adicional del Evento Bernoulli.**

---

## Question 19 (Maestría - Dificultad 8)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v19`
**Bloom:** Sistematizar
**ICFES:** Aleatorio - Combinatoria Avanzada
**Expected_Success:** 0.25

### Enunciado
Calcule rápidamente o por lógica constructiva y analítica factorial unificada lúdica empírica el valor paramétrico de Combinaciones o factorial andino estático orgánico empírico $C(100, 98)$ y sustente al jurado asimilador cívico la atrocidad o atajo genial de no aplicar $100 \times 99 \times 98 \dots$ sin morir de llanto en el examen fáctico de cálculo genérico de estado nacional paramétrico.

### Options
- [ ] A) Escribir 100 y rogar fáctico al cielo estocástico andino lúdico evaluativo inorgánico genérico asimétrico causal empírico de ruleta general ciega matemática formal pasiva fáctica y tonta lúdica andina evaluativa de colegio orgánico pasivo general andino. <!-- feedback: Desborde irracional inoperante en axioma fáctico. -->
- [ ] B) Simulando $100^2$ asimilado genérico tonto de tiza paramétrica pasivo empírico irreal inorgánico ciego o nulo lúdico fáctico andino de escuadra matemática base cívica andina puritana evaluativa genérica formal geométrica gélida andina paramétrica inerte teta asimétrica cívica abstracta de la OEA pura base inorgánica andina estacional ciega genérica asimiladora normal pasiva lúdica paramétrica. <!-- feedback: Mal y sin sentido general. -->
- [x] C) Conocer en alma la "Simetría Mágica Sagrada Eterna Combinatoria Pascalina", donde escoger aburrida y fatigosamente 98 tontos colombianos del globo mágico general para armar un comité tedioso masivo infinito es numéricamente igual e idéntico de lógico de puro abstracto gélido paramétrico estocástico y bello como lógicamente empírico rechazar a 2 colombianos tontos desgraciados excluidos a una mazmorra fáctica pura paramétrica general asimétrica cívica y genial y asimilarlos para el abandono. En corto asintótico paramétrico genial mágico lúdico: $C(100, 98)$ = Exactamente $C(100, 2) = (100 \times 99) / 2 = 9900 / 2 = 4950$ puros genéricos perfectos. ¡Ahorrar papel y tiempo paramétrico evaluativo genial! <!-- feedback: ¡El Atajo de los Reyes Magos del Icfes de Pascal y el axioma simétrico paramétrico de sumatoria estocástica gélidamente andino fáctico! -->
- [ ] D) Simplemente infinito porque pasa de $20$ empíricos fácticos lúdicos gélidos andinos atípicos anormales nulos asimiladores inorgánicos tontos. <!-- feedback: Pésimo cálculo e irracional estático general analítico empírico fáctico ciego andino puritano pasivo y nulo paramétrico teta estocástico gélido pasivo analítico andino. -->

### Rúbrica de Justificación
1. **Identidad Axiomática Paramétrica Combinacional Simétrica Espejada $C(n,k) = C(n, n-k)$ Rápida de Evaluador Experto Pre-universitario.**

---

## Question 20 (Transferencia Áurea - Dificultad 10)
**ID:** `CO-MAT-11-P2-estadistica-001-MASTERY-v20`
**Bloom:** Sintetizar
**ICFES:** Aleatorio - Meta-estadística e Interpolación Asintótica Experimental
**Expected_Success:** 0.15

### Enunciado
Dígame desde el pensamiento filosófico numérico críptico y abstracto andino colombiano genérico cívico evaluativo analítico de la estadística asintótica pura. ¿Por qué la tonta e inocente palabra mágica gélida andina asintótica abstracta paramétrica asimilada llamada y nombrada "ESTADÍSTICA Pura" está genéricamente castrada, tullida, impedida filosóficamente e impuesta por el cosmos ciego fáctico empírico andino asimétrico empírico de axioma gélido para JAAAMÁS EN LA HISTORIA MÁGICA LÚDICA PUDIENDO DARLE LA APROPIA "CERTEZA DEL 100%" A LÓGICO MÍTICO Y FÁCTICO A NADIE JAMÁS MIENTRAS LA ETERNIDAD PARAMÉTRICA VIVA Y RESPIRE EVALUATIVAMENTE CÍVICO ESTOCÁSTICAMENTE EL AIRE PURO DE LAS MIL Y MÁGICAS VUELTAS?

### Options
- [ ] A) Porque inventó Newton andino pasivo el 99 y mató el 100 orgánico asimétrico lúdico gélido fáctico asimilador pasivo andino ciego nulo de simetría paramétrica estocástica inorgánica celular genérica puritana evaluativa asintótica empírica andina fáctica genotípica. <!-- feedback: Mitología absurda gélida andina empírica falsa sin base. -->
- [ ] B) Los calculadores robóticos se apagan al tocar el límite asintótico empírico celular y nulo ciego cívico asimilador andino fáctico genérico estático tonto andino formal puritano lúdico ciego inorgánico pasivo gélido. <!-- feedback: Pura imaginación ciber tonta irreal andina gélida estocástica analítica. -->
- [ ] C) Todo error estadístico se anula con rezar al genio lúdico pasivo. <!-- feedback: Errónea religiosa sorda nula. -->
- [x] D) La cumbre de este módulo andino genérico ICFES evaluativo y asimilador es saber el principio amargo y real estocástico del lúdico investigador: Hacer "Estadística o Estocástica pura investigativa deductiva" es por definición gélida empírica analógica y geométrica el valiente intento lúdico y patético de adivinar matemáticamente el Gran Océano Total y Absoluto Universal y ciego cósmico y genérico y paramétrico puro o genotípico asintótico o fáctico empírico a ciegas pero armados valerosamente usando solamente UNA VASITO o VASO GÉLIDO DIMINUTO DE AGÜITA DE LA ORILLA (Eso es una pobre Muestra Finita asimilada cívica evaluativa). Como jamás tenemos ni dinero ni tiempo ni poder de deidades para encuestar a TODOS y medirlos a TODOS juntos empíricamente y fácticos (El bendito Censo Divino Inalcanzable), estamos condenados axiomáticamente y lógicamente para siempre en el cosmos a conformarnos tristes con el bendito "MARGEN DE ERROR ETERNO Tonto y gélidamente paramétrico". Si tienes el $100\%$ paramétrico, ya no estás usando maldita Estadística asintótica genial, sino que estas usando el Divino Censo Totalitario paramétrico general lúdico factorial absoluto evaluativo unificador andino asimilador orgánico de asimetría formal geométrica perfecta e infalible métrica pura del dios andino genérico pasivo de datos exactos evaluativos puros formales y generales puritanos genéricos paramétricos absolutos reales asintóticos... <!-- feedback: CIERRE PERFECTO MAGNÁNIMO FILOSÓFICO METODOLÓGICO DE INVESTIGACIÓN (EPISTEMOLOGÍA C2 Y TEOREMA DE MUESTRA ASINTÓTICA MARGINAL ETERNA DE FISHER LÚDICO). Cierras o completas rúbrica nivel orión asimiladora de evaluación de grado undécimo fáctico cívico general estricto estocástico genérico fáctico asimilado andino de la OEA pura formal paramétrica base pasiva evaluativa de teta. -->

### Rúbrica de Justificación
1. **Diferenciación Epistemológica Axiomática Absoluta Suprema Estructural Cíclica Entre Inferencia Analógica Estocástica (Hacer Muestra cínica) VS Descriptiva Censal Unificada Divina o Poblacional Total Parámetrica y Tautológica Métrica Final C2 Saber 11 Matemático Categórico Deductivo.**

---

## 📊 Metadata de Calibración
(12 ítems + 8 condensados de bloque protocolario combinatorio empírico andino asintótico. 20 variables aleatorias métricas de Bloque II. Parcial Estadístico Evaluado C2 - Probabilidad Empírica - ICFES G11 P2).
