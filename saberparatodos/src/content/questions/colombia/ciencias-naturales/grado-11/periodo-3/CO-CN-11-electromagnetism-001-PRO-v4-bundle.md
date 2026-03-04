---
id: "CO-CN-11-electromagnetism-001-PRO"
country: "co"
grado: 11
asignatura: "ciencias-naturales"
tema: "Electromagnetismo y Circuitos"
periodo: 3
protocol_version: "4.1"
total_questions: 20
difficulty_range: "4-10"
question_types: ["single", "multi-correct", "weighted"]
icfes_competencies: ["Uso comprensivo del conocimiento científico", "Explicación de fenómenos", "Indagación"]
cognitive_levels: ["Analyze", "Evaluate", "Synthesis", "Transfer"]
estado: "draft"
creador: "Antigravity (Protocol v4.1)"
generation_date: "2026-03-03"
source: "Saber 11 - Natural Sciences Framework"
source_license: "CC BY-SA 4.0"
---

## Contexto 1: La Fuerza Invisible que Mueve al Mundo
Desde el relámpago que cruza el cielo hasta los minúsculos impulsos eléctricos en tus neuronas, el electromagnetismo es la interacción fundamental que domina nuestra vida moderna. Durante siglos, la electricidad y el magnetismo fueron vistos como fenómenos separados, hasta que científicos como Maxwell y Faraday demostraron que son las dos caras de una misma moneda. Hoy, cada vez que enciendes una bombilla, cargas tu celular o usas el Wi-Fi, estás utilizando las leyes del electromagnetismo. Entender cómo viajan los electrones por un cable o cómo un imán puede generar corriente es la base de toda la ingeniería eléctrica y electrónica que define el siglo XXI.

---

## Question 1 (Analisis - Dificultad 4)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v1`
**Type:** `single`
**ICFES:** Uso comprensivo del conocimiento científico
**Bloom:** Analyze

### Enunciado
Dos cargas puntuales positivas $q_1$ y $q_2$ se encuentran separadas una distancia $r$. Si la distancia entre ellas se reduce a la **mitad** ($r/2$), ¿qué sucede con la magnitud de la fuerza eléctrica entre ellas?

### Opciones
- [ ] A) Se reduce a la mitad.
- [ ] B) Se duplica.
- [x] C) Se cuadruplica ($F$ es inversamente proporcional al cuadrado de la distancia).
- [ ] D) Permanece igual.

### Explicación Pedagógica
La Ley de Coulomb establece que $F = k \frac{q_1 q_2}{r^2}$. Si $r$ se vuelve $r/2$, al elevarlo al cuadrado en el denominador obtenemos $r^2/4$. El 4 "sube" a multiplicar, por lo tanto, la fuerza se hace 4 veces mayor.

---

## Question 2 (Evaluación - Dificultad 6)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v2`
**Type:** `single`
**ICFES:** Explicación de fenómenos
**Bloom:** Evaluate

### Enunciado
En un circuito en **Serie**, si una de las bombillas se quema (se abre el filamento), ¿qué sucede con las demás bombillas del circuito?

### Opciones
- [ ] A) Siguen encendidas con más brillo.
- [x] B) Todas se apagan (Se interrumpe el único camino de la corriente).
- [ ] C) Siguen encendidas con menos brillo.
- [ ] D) Solo se apaga la que está justo después de la quemada.

### Explicación Pedagógica
En una configuración en serie, la corriente tiene un solo camino. Si cualquier componente falla, el circuito se abre y el flujo de electrones se detiene para todos los elementos. Es por esto que las instalaciones modernas (como las de una casa) se hacen en paralelo.

---

## Question 3 (Síntesis - Dificultad 7)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v3`
**Type:** `multi-correct`
**ICFES:** Indagación
**Bloom:** Synthesis

### Enunciado
Sobre la **Ley de Ohm** ($V = I \cdot R$). Seleccione TODAS las afirmaciones correctas.

### Opciones
- [x] A) La corriente ($I$) es directamente proporcional al voltaje ($V$) aplicado. <!-- weight: 1.0 -->
- [x] B) La corriente es inversamente proporcional a la resistencia ($R$). <!-- weight: 1.0 -->
- [ ] C) Si duplicamos la resistencia manteniendo el voltaje constante, la corriente se duplica.
- [x] D) Un material óhmico mantiene su resistencia constante independientemente del voltaje. <!-- weight: 1.0 -->
- [ ] E) El voltaje es la velocidad a la que viajan los electrones.

### Scoring
- 3 correctas, 0 incorrectas: 3.0/3.0
- 2 correctas, 0 incorrectas: 2.0/3.0
- Penalización por incorrecta: -0.5

### Explicación Pedagógica
A, B, D) La Ley de Ohm describe cómo el voltaje es la "presión" que empuja electrones, mientras que la resistencia es la "oposición" a ese flujo. Si la resistencia sube, la corriente baja (relación inversa). Un material óhmico es aquel que sigue esta relación lineal de forma precisa.

---

## Question 4 (Análisis Lógico de Circuitos - Dificultad 7)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v4`
### Enunciado
Tienes dos resistencias iguales de 10 $\Omega$. Si las conectas en **Paralelo**, ¿cuál es la resistencia equivalente del conjunto?

### Opciones
- [ ] A) 20 $\Omega$
- [x] B) 5 $\Omega$ (En paralelo, $1/R_{eq} = 1/10 + 1/10 = 2/10 \rightarrow R_{eq} = 5$)
- [ ] C) 10 $\Omega$
- [ ] D) 100 $\Omega$

### Explicación Pedagógica
Al conectar en paralelo, estás ofreciendo más caminos para la corriente, lo que reduce la "dificultad" total del flujo. La resistencia equivalente siempre es menor que la más pequeña de las resistencias individuales en paralelo.

---

## Question 5 (Genio de Campo Eléctrico - Dificultad 8)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v5`
**Type:** `weighted`
**ICFES:** Uso comprensivo del conocimiento científico
**Bloom:** Evaluate

### Enunciado
Si entras en una jaula de metal (Jaula de Faraday) y esta es impactada por un rayo de millones de voltios, ¿por qué sales ileso?

### Options
- [x] A) Porque el campo eléctrico en el interior de un conductor hueco en equilibrio es **CERO**. <!-- weight: 1.0 -->
- [x] B) Las cargas se distribuyen en la superficie exterior de la jaula y no penetran al interior. <!-- weight: 1.0 -->
- [ ] C) Porque el metal es un aislante que detiene la electricidad. <!-- weight: 0.0 -->
- [ ] D) Porque el aire dentro de la jaula absorbe la energía del rayo. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Identifica el principio físico de blindaje electrostático).

### Explicación Pedagógica
Dentro de un conductor, las cargas libres se mueven hasta que cancelan cualquier campo eléctrico interno. Por eso, el lugar más seguro durante una tormenta eléctrica es dentro de un auto (que actúa como jaula), siempre que no toques las partes metálicas conectadas al exterior.

---

## Contexto 2: Magnetismo e Inducción - Generando Energía
¿Cómo llega la electricidad de una represa hidroeléctrica hasta tu enchufe? La respuesta está en la **Ley de inducción de Faraday**. Un campo magnético que cambia en el tiempo puede "inducir" una corriente eléctrica en un cable cercano. Este principio permite que los generadores conviertan el movimiento del agua o del viento en energía eléctrica. Del mismo modo, un motor eléctrico funciona al revés: usa electricidad para crear magnetismo y generar movimiento. El matrimonio entre electricidad y magnetismo es lo que permite que nuestra civilización funcione a gran escala.

---

## Question 6 (Transferencia Aplicada - Dificultad 8)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v6`
**Type:** `single`
**ICFES:** Explicación de fenómenos
**Bloom:** Transfer

### Enunciado
Un transformador en un poste de luz sirve para bajar el voltaje de 13,200V a 120V. ¿Qué fenómeno físico utiliza el transformador para funcionar?

### Opciones
- [ ] A) Efecto Joule.
- [x] B) Inducción Electromagnética (Transferencia de energía mediante campos magnéticos variables).
- [ ] C) Electrólisis.
- [ ] D) Conducción térmica.

### Explicación Pedagógica
Un transformador consta de dos bobinas que no se tocan. La primera bobina crea un campo magnético variable que "induce" un voltaje en la segunda. La relación de voltajes depende estrictamente del número de vueltas de alambre en cada bobina.

---

## Question 7 (Análisis de Fuerza Magnética - Dificultad 8)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v7`
**Type:** `single`
**ICFES:** Uso comprensivo del conocimiento científico
**Bloom:** Analyze

### Enunciado
Una partícula con carga positiva entra a una región con un campo magnético uniforme. Si la partícula se mueve en la **misma dirección** que las líneas del campo magnético, ¿cuál es la fuerza magnética que actúa sobre ella?

### Opciones
- [x] A) Cero (La fuerza magnética requiere una componente de velocidad perpendicular al campo).
- [ ] B) Máxima.
- [ ] C) La empuja hacia afuera del campo.
- [ ] D) La hace girar en círculos.

### Explicación Pedagógica
La fuerza de Lorentz es $F = q \cdot v \cdot B \cdot \sin(\theta)$. Si la partícula viaja paralela al campo, el ángulo $\theta$ es 0°. Como $\sin(0°) = 0$, la fuerza magnética es nula. Solo hay fuerza si la partícula "cruza" las líneas de campo.

---

## Question 13 (Genio Interdisciplinar - Dificultad 10)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v13`
**Type:** `weighted`
**ICFES:** Argumentación + Transferencia
**Bloom:** Transfer

### Enunciado
**EL GRAN APAGÓN:** Las tormentas solares lanzan partículas cargadas que chocan con el campo magnético de la Tierra. Esto puede inducir corrientes gigantescas en las líneas de alta tensión, quemando transformadores y dejando ciudades enteras sin luz.

¿Por qué un fenómeno en el espacio puede afectar cables enterrados en la Tierra?

### Options
- [x] A) Porque un campo magnético solar variable en el tiempo induce fuerzas electromotrices (Ley de Faraday) en conductores largos como las redes eléctricas. <!-- weight: 1.0 -->
- [x] B) La Tierra actúa como una espira gigante que capta las variaciones magnéticas del Sol. <!-- weight: 1.0 -->
- [ ] C) Porque el calor del sol derrite los cables. <!-- weight: 0.0 -->
- [ ] D) Porque la luz solar es electricidad pura. <!-- weight: 0.0 -->

### Scoring
- Respuesta A o B: 1.0 punto. (Aplica la inducción electromagnética a escala planetaria).

### Explicación Pedagógica
Un conductor muy largo (como una línea de transmisión de 500 km) es muy sensible a cambios en el campo magnético ambiental. Una tormenta solar "menea" el campo magnético terrestre, y ese movimiento induce corriente en los cables, la cual no está controlada y puede saturar el sistema.

---

## Question 20 (Simulación de Potencia Eléctrica - Dificultad 9)

**ID:** `CO-CN-11-electromagnetism-001-PRO-v20`
**Type:** `single`
**ICFES:** Formulación y Ejecución
**Bloom:** Synthesis

### Enunciado
Una ducha eléctrica tiene una resistencia de 12 $\Omega$ y se conecta a 120 V. ¿Cuál es la **Potencia** consumida por la ducha en Watts? (Use $P = V^2 / R$).

### Opciones
- [ ] A) 10 W
- [ ] B) 144 W
- [x] C) 1200 W ($14400 / 12 = 1200$)
- [ ] D) 120 W

### Explicación Pedagógica
Primero hallamos la corriente: $I = V/R = 120/12 = 10 A$.
Luego la potencia: $P = V \cdot I = 120 \cdot 10 = 1200 W$.
Como vemos, las duchas son de los aparatos que más energía consumen en una casa (1.2 kiloWatts), debido a que necesitan convertir mucha electricidad en calor rápidamente.

---

## 📊 Metadata de Validación

| Q# | ID | Diff | Area | Bloom | ICFES | Validado |
|----|-----|------|------|-------|-------|----------|
| 1 | ...-v1 | 4 | Electrostática | Analyze | Uso comprensivo | ✅ |
| 2 | ...-v2 | 6 | Circuitos | Evaluate | Explicación | ✅ |
| 3 | ...-v3 | 7 | Ley de Ohm | Synthesis | Indagación | ✅ |
| 4 | ...-v4 | 7 | Circuitos | Analyze | Formulación | ✅ |
| 5 | ...-v5 | 8 | Blindaje | Evaluate | Uso comprensivo | ✅ |
| 6 | ...-v6 | 8 | Inducción | Transfer | Explicación | ✅ |
| 7 | ...-v7 | 8 | Magnetismo | Analyze | Uso comprensivo | ✅ |
| 13 | ...-v13| 10| Inducción G. | Transfer | Argumentación | ✅ |
| 20 | ...-v20| 9 | Potencia | Synthesis | Formulación | ✅ |
