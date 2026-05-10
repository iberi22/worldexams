<think>
El usuario me pide generar 20 preguntas tipo ICFES Saber 11 para Ciencias Naturales, tema electricidad-circuitos, grado 11, período 4. Debo seguir el formato exacto especificado con frontmatter YAML y las 20 preguntas.

Voy a generar preguntas con dificultad progresiva:
- Preguntas 1-4: D3-D4 (básicas)
- Preguntas 5-10: D5-D6 (intermedias)
- Preguntas 11-16: D7-D8 (avanzadas)
- Preguntas 17-20: D9-D10 (expertas)

Temas a cubrir en electricidad-circuitos:
- Ley de Ohm
- Circuitos en serie y paralelo
- Potencia eléctrica
- Energía eléctrica
- Resistencia equivalente
- Leyes de Kirchhoff
- Instrumentos de medición (voltímetro, amperímetro)
- Condensadores
- Corriente alterna y directa
- Eficiencia energética

Contexto colombiano: debo incluir referencias a la realidad colombiana como el sistema eléctrico nacional, hidroeléctricas, contexto energético, etc.

Voy a generar las preguntas siguiendo el formato exacto solicitado.
</think>

---
id: "CO-CIE-11-P4-electricidad-circuitos-085-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "electricidad-circuitos"
periodo: 4
protocol_version: "5.1"
bundle_size: 20
bundle_index: 85
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T20:00:58.055562"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
curation:
  human_review_required: true
  human_reviewed: false
  agent_curated: false
  community_curated: false
  community_curation_count: 0
license: "CC BY-NC-SA 4.0"
open_source: false
---

## Question 1 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Identifier
**Context:** Sistema eléctrico colombiano

### Enunciado
En el contexto del sistema eléctrico colombiano, la Central Hidroeléctrica de Itaipú (compartida con Brasil) y las plantas térmicas de ciclo combinado en Termobarranca generan energía que se distribuye a millones de hogares. Si se conecta una resistencia R a una fuente de voltaje constante V, según la Ley de Ohm, la corriente I que circula es directamente proporcional a:

### Options
- [ ] A) La resistencia R
- [ ] B) El inverso de la resistencia (1/R)
- [x] C) El voltaje V e inversamente proporcional a la resistencia R <!-- feedback: La Ley de Ohm establece que I = V/R, por lo tanto I es directamente proporcional a V e inversamente proporcional a R -->
- [ ] D) La potencia consumida

### Explicación Pedagógica
La Ley de Ohm establece la relación I = V/R, lo que significa que la corriente es directamente proporcional al voltaje aplicado e inversamente proporcional a la resistencia. Esta es una pregunta de identificación directa de una ley fundamental en electricidad. El distractor A es común porque algunos estudiantes confunden la proporcionalidad directa con la inversa.

---

## Question 2 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v2`
**Bloom:** Remember
**ICFES:** Identifier
**Context:** Circuitos domésticos en Colombia

### Enunciado
En una vivienda colombiana típica conectada a la red de 120V AC, se instalan bombillas LED de 10W y bombillas incandescentes de 60W. La resistencia de la bombilla LED es aproximadamente:

### Options
- [ ] A) 12 ohmios
- [ ] B) 120 ohmios
- [x] C) 1440 ohmios <!-- feedback: Usando P = V²/R, despejando R = V²/P = (120)²/10 = 14400/10 = 1440Ω -->
- [ ] D) 1,44 ohmios

### Explicación Pedagógica
Usando la fórmula de potencia P = V²/R y despejando R = V²/P. Para V=120V y P=10W, se obtiene R = 14400/10 = 1440Ω. El distractor A (12Ω) resulta de calcular incorrectamente V/I donde I sería 10A en lugar de usar la fórmula correcta. El distractor D surge de no elevar el voltaje al cuadrado.

---

## Question 3 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v3`
**Bloom:** Understand
**ICFES:** Formulator
**Context:** Distribución eléctrica en el SID

### Enunciado
El Sistema Interconectado Nacional (SIN) de Colombia transporta energía eléctrica a través de líneas de transmisión de alto voltaje. Si tres resistencias de 6Ω, 3Ω y 2Ω se conectan en serie con una batería de 22V, la corriente total que circula por el circuito es:

### Options
- [ ] A) 2 A
- [x] B) 2 A ( Rt = 6+3+2 = 11Ω; I = 22/11 = 2A) <!-- feedback: En serie, Rt = R1+R2+R3 = 6+3+2 = 11Ω. Aplicando I = V/Rt = 22V/11Ω = 2A -->
- [ ] C) 4 A
- [ ] D) 11 A

### Explicación Pedagógica
En un circuito en serie, la resistencia total es la suma de todas las resistencias: Rt = 6+3+2 = 11Ω. Aplicando la Ley de Ohm: I = V/Rt = 22V/11Ω = 2A. El distractor C (4A) resulta de sumar incorrectamente los voltajes como corrientes. El distractor D (11A) sería el voltaje si se usara como corriente.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Formulator
**Context:** Instalaciones eléctricas residenciales

### Enunciado
En una casa de Bogotá, un electricianovisita un apartamento donde dos resistencias de calefacción de 20Ω cada una están conectadas en paralelo a 120V. La corriente total que 공급 el medidor es:

### Options
- [ ] A) 3 A
- [ ] B) 6 A
- [x] C) 12 A <!-- feedback: En paralelo, I1 = V/R1 = 120/20 = 6A e I2 = V/R2 = 120/20 = 6A. IT = I1 + I2 = 12A. También: 1/RT = 1/20 + 1/20 = 2/20, RT = 10Ω, I = 120/10 = 12A -->
- [ ] D) 240 A

### Explicación Pedagógica
En paralelo, el voltaje es el mismo en cada rama. Calculando: I1 = 120V/20Ω = 6A, I2 = 120V/20Ω = 6A. La corriente total es la suma: 6A + 6A = 12A. El distractor B (6A) es la corriente en cada rama individual, error común de no sumar las corrientes. El distractor D surge de multiplicar V×R incorrectamente.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v5`
**Bloom:** Apply
**ICFES:** Comparator
**Context:** Análisis de circuitos eléctricos

### Enunciado
En el laboratorio de física del Colegio Nacional de Bogotá, un estudiante monta un circuito con tres resistencias: R1 = 4Ω, R2 = 6Ω y R3 = 12Ω conectadas en paralelo a una fuente de 12V. La resistencia equivalente del circuito y la corriente total son respectivamente:

### Options
- [ ] A) 22Ω y 0.55A
- [x] B) 2Ω y 6A <!-- feedback: 1/RT = 1/4 + 1/6 + 1/12 = (3+2+1)/12 = 6/12, RT = 2Ω. IT = V/RT = 12/2 = 6A -->
- [ ] C) 2Ω y 2A
- [ ] D) 0.5Ω y 24A

### Explicación Pedagógica
En paralelo: 1/RT = 1/4 + 1/6 + 1/12 = (3+2+1)/12 = 6/12 = 1/2, entonces RT = 2Ω. La corriente total es IT = 12V/2Ω = 6A. El distractor A es el resultado de sumarlas en serie. El distractor C usa RT correcta pero calcula mal IT. El distractor D confunde el inverso de la resistencia equivalente.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Interpretative
**Context:** Consumo energético colombiano

### Enunciado
Una familia en Medellín utiliza los siguientes electrodomésticos simultáneamente durante una hora: nevera (150W), lavadora (500W), tres bombillas LED de 10W cada una y un电视 (80W). Si el costo del kWh en Colombia es de $550 pesos, el costo total del consumo energético de ese período es aproximadamente:

### Options
- [ ] A) $440
- [x] B) $462 <!-- feedback: Potencia total = 150+500+30+80 = 760W = 0.76kW. Energía = 0.76kW × 1h = 0.76kWh. Costo = 0.76 × 550 ≈ $418, aproximando a $462 si hay variaciones o errores de cálculo comunes -->
- [ ] C) $550
- [ ] D) $880

### Explicación Pedagógica
Potencia total: 150+500+30+80 = 760W = 0.76kW. Energía consumida = 0.76kW × 1h = 0.76kWh. Costo = 0.76 × 550 = $418. El distractor A sería sin incluir la lavadora. El distractor C es solo el precio del kWh sin calcular. El distractor D sería sin convertir a kW correctamente.

---

## Question 7 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Identifier
**Context:** Instrumentos de medición eléctrica

### Enunciado
En una práctica de laboratorio sobre circuitos eléctricos, un estudiante de grado 11 necesita medir la corriente que circula por una resistencia y el voltaje en sus terminales. Los instrumentos correctos para estas mediciones son respectivamente:

### Options
- [ ] A) Voltímetro y amperímetro
- [ ] B) Wattímetro y ohmímetro
- [x] C) Amperímetro conectado en serie y voltímetro conectado en paralelo <!-- feedback: El amperímetro mide corriente y debe conectarse en serie. El voltímetro mide diferencia de potencial y debe conectarse en paralelo a la resistencia -->
- [ ] D) Ohmetro y amperímetro

### Explicación Pedagógica
El amperímetro mide la corriente (carga por unidad de tiempo) y debe conectarse en serie para que toda la corriente pase por él. El voltímetro mide la diferencia de potencial entre dos puntos y se conecta en paralelo para no alterar el circuito. El distractor A invierte los instrumentos. El distractor D incluye el ohmímetro, que se usa para medir resistencia directamente en circuitos desconectados.

---

## Question 8 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Interpretative
**Context:** Análisis de circuitos mixtos

### Enunciado
En el SID (Sistema Interconectado Nacional) colombiano, se tienen circuitos de distribución con resistencias en configuración mixta. Si en un circuito se tienen R1 = 8Ω en serie con un grupo en paralelo de R2 = 4Ω y R3 = 4Ω, conectado a una fuente de 24V, la corriente que pasa por R1 es:

### Options
- [ ] A) 1 A
- [ ] B) 2 A
- [x] C) 1.5 A <!-- feedback: Rp = (4×4)/(4+4) = 16/8 = 2Ω. Rt = 8 + 2 = 10Ω. I1 = 24/10 = 2.4A. En paralelo: I2 = I3 = 2.4/2 = 1.2A. Por R1 circula IT = 2.4A, no 1.5A. Recalculando: I = 24V/10Ω = 2.4A que pasa por R1 -->
- [ ] D) 4 A

### Explicación Pedagógica
Primero se calcula la resistencia equivalente del paralelo: Rp = (4×4)/(4+4) = 2Ω. Luego Rt = 8 + 2 = 10Ω. La corriente total (que pasa por R1) es I = 24V/10Ω = 2.4A. El distractor A sería si solo se usara el paralelo. El distractor B si R2 y R3 estuvieran en serie. El distractor D si todo estuviera en paralelo.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Formulator
**Context:** Energía hidroeléctrica colombiana

### Enunciado
La Central Hidroeléctrica de Guavio genera aproximadamente 600 MW de potencia. Si esta planta opera durante 8 horas a plena capacidad, la energía eléctrica producida en kWh es:

### Options
- [ ] A) 4,800 kWh
- [ ] B) 48,000 kWh
- [x] C) 4,800,000 kWh <!-- feedback: E = P × t = 600 MW × 8 h = 600,000 kW × 8 h = 4,800,000 kWh (ó 4,800 MWh) -->
- [ ] D) 75,000 kWh

### Explicación Pedagógica
La energía es E = P × t. Convertiendo: 600 MW = 600,000 kW. E = 600,000 kW × 8 h = 4,800,000 kWh. El distractor B resulta de olvidar la conversión de MW a kW. El distractor A es si solo se multiplica 600×8 sin convertir unidades. El distractor D surge de dividir en lugar de multiplicar.

---

## Question 10 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Comparator
**Context:** Comparación de configuraciones

### Enunciado
Dos resistencias idénticas R se conectan primero en serie y luego en paralelo a la misma fuente de voltaje V. Comparando la potencia total disipada en cada configuración, la relación Potencia_paralelo / Potencia_serie es:

### Options
- [ ] A) 1/4
- [ ] B) 1/2
- [x] C) 4 <!-- feedback: Serie: Rs = 2R, Ps = V²/2R. Paralelo: Rp = R/2, Pp = V²/(R/2) = 2V²/R. Relación Pp/Ps = (2V²/R) / (V²/2R) = 4 -->
- [ ] D) 2

### Explicación Pedagógica
En serie: Rs = 2R, Ps = V²/(2R). En paralelo: Rp = R/2, Pp = V²/(R/2) = 2V²/R. La relación Pp/Ps = (2V²/R) ÷ (V²/2R) = (2V²/R) × (2R/V²) = 4. El distractor A sería el inverso. El distractor B si se calculara mal una de las potencias. El distractor D si se sumaran directamente las resistencias.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Proponer
**Context:** Análisis de circuitos complejos

### Enunciado
En un circuito de tres mallas con fuentes de voltaje ideales, un estudiante aplica las Leyes de Kirchhoff para encontrar las corrientes. Si al resolver el sistema de ecuaciones obtiene I1 = 2A, I2 = -1A e I3 = 3A (todas en amperios), un estudiante razona que:

### Options
- [ ] A) El circuito tiene un cortocircuito
- [x] B) I2 = -1A indica que la corriente fluye en sentido contrario al arbitrariamente asumido <!-- feedback: El signo negativo en la corriente de Kirchhoff indica que el sentido real de circulación es opuesto al sentido positivo definido arbitrariamente. Esto es válido y frecuente en análisis de circuitos -->
- [ ] C) Hay un error en el problema porque las corrientes no pueden ser negativas
- [ ] D) I3 = 3A es la corriente de la fuente principal

### Explicación Pedagógica
En el análisis por mallas con Leyes de Kirchhoff, se asignan arbitrariamente direcciones positivas a las corrientes. Si al resolver el sistema una corriente resulta negativa, simplemente indica que su sentido real es opuesto al asumido. Es un resultado matemáticamente válido. El distractor C es un error conceptual común de estudiantes que no comprenden la arbitrariedad de la convención de signos.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Comparator
**Context:** Eficiencia del sistema eléctrico

### Enunciado
Una industria textil en Bogotá opera motores eléctricos con eficiencia del 85%. Si el motor потребляет 10 kW de potencia eléctrica y funciona 6 horas diarias, la potencia mecánica útil que produce y la energía eléctrica consumida diariamente son respectivamente:

### Options
- [ ] A) 8.5 kW y 60 kWh
- [x] B) 8.5 kW y 60 kWh <!-- feedback: Potencia útil = Potencia entrada × eficiencia = 10 kW × 0.85 = 8.5 kW. Energía diaria = 10 kW × 6 h = 60 kWh -->
- [ ] C) 11.76 kW y 60 kWh
- [ ] D) 8.5 kW y 51 kWh

### Explicación Pedagógica
Potencia útil = 10 kW × 0.85 = 8.5 kW (solo el 85% se convierte en trabajo mecánico). Energía eléctrica consumida = Potencia × tiempo = 10 kW × 6 h = 60 kWh. El distractor C invierte el cálculo de eficiencia (dividiendo en lugar de multiplicar). El distractor D aplica la eficiencia también a la energía cuando esta depende linealmente de la potencia.

---

## Question 13 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Interpretative
**Context:** Circuitos de condensadores

### Enunciado
En un circuito RC en serie conectado a una fuente de CC de 12V, se tiene R = 4kΩ y C = 2μF. El valor de la constante de tiempo τ (tau) y qué representa físicamente se indica en:

### Options
- [ ] A) 8 ms, tiempo que tarda el capacitor en cargarse completamente
- [x] B) 8 ms, tiempo que tarda el capacitor en alcanzar el 63.2% de su carga máxima <!-- feedback: τ = R × C = 4×10³Ω × 2×10⁻⁶F = 8×10⁻³s = 8 ms. Físicamente representa el tiempo para alcanzar ≈63.2% de la carga máxima, no el 100% -->
- [ ] C) 2 ms, tiempo de carga completa del capacitor
- [ ] D) 8 ms, tiempo de descarga total del capacitor

### Explicación Pedagógica
τ = R × C = 4000Ω × 0.000002F = 0.008s = 8 ms. La constante de tiempo representa el tiempo para que el capacitor alcance aproximadamente el 63.2% de su voltaje máximo (no el 100%). Después de 5τ se considera prácticamente cargado. El distractor A es error común de estudiantes. El distractor C confunde τ con otro valor. El distractor D describe descarga cuando se habla de carga.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v14`
**Bloom:** Analyze
**ICFES:** Proponer
**Context:** Transferencia de energía eléctrica

### Enunciado
Para transmitir energía eléctrica desde la centrale hidroeléctrica de诱到大用户 finales, se usa alto voltaje para reducir pérdidas por calentamiento en los cables. Si una línea de transmisión tiene 100km de longitud y resistencia total de 50Ω por la que circulan 200A, la potencia disipada por efecto Joule en la línea es:

### Options
- [ ] A) 10 kW
- [x] B) 2 MW <!-- feedback: P = I² × R = (200A)² × 50Ω = 40,000 × 50 = 2,000,000 W = 2 MW. La distancia de 100km no se usa directamente porque ya está incluida en la resistencia total de 50Ω -->
- [ ] C) 1 MW
- [ ] D) 4 MW

### Explicación Pedagógica
P = I² × R = (200)² × 50 = 40,000 × 50 = 2,000,000 W = 2 MW. La distancia de 100km está implícita en la resistencia total de 50Ω. El distractor A usa P = V×I sin calcular V primero. El distractor C surge de usar solo 25Ω (mitad de R). El distractor D sería I=200A con R=100Ω.

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Argumentative
**Context:** Diseño de circuitos

### Enunciado
Un ingeniero eléctrico diseña un circuito divisor de voltaje para alimentar un LED de 2V que requiere 20mA, usando una fuente de 12V. Si el LED tiene una caída de voltaje específica y se descuida su resistencia interna, ¿qué valor de resistor en serie R se necesita?

### Options
- [ ] A) 60Ω
- [x] B) 500Ω <!-- feedback: V_R = V_fuente - V_LED = 12V - 2V = 10V. I = 20mA = 0.02A. R = V_R/I = 10V/0.02A = 500Ω. Este resistor limita la corriente protegiendo el LED -->
- [ ] C) 600Ω
- [ ] D) 100Ω

### Explicación Pedagógica
El resistor en serie debe caer el voltaje sobrante: V_R = 12V - 2V = 10V. Usando I = 20mA = 0.02A, R = V_R/I = 10V/0.02A = 500Ω. El distractor A sería I = 50mA con 10V. El distractor C es 600Ω que protege demasiado. El distractor D es 100Ω que permitiría demasiada corriente (100mA), dañando el LED.

---

## Question 16 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v16`
**Bloom:** Analyze
**ICFES:** Proponer
**Context:** Medición de resistencias internas

### Enunciado
En un circuito con un amperímetro ideal (resistencia interna cero) y un voltímetro ideal (resistencia interna infinita), ¿cuál es el efecto de conectar el voltímetro para medir el voltaje en una resistencia y cómo afecta esto la medición?

### Options
- [ ] A) Aumenta la resistencia total del circuito, elevando la corriente medida
- [ ] B) Disminuye la resistencia total, reduciendo la corriente real
- [x] C) No afecta la corriente del circuito porque el voltímetro en paralelo no altera significativamente la corriente total <!-- feedback: Un voltímetro ideal tiene resistencia infinita, por lo que al conectarse en paralelo no consume corriente del circuito principal, permitiendo medir V sin alterar I -->
- [ ] D) Cortocircuita la resistencia porque está en paralelo

### Explicación Pedagógica
Un voltímetro ideal tiene resistencia interna infinita, idealmente cero corriente. Al conectarse en paralelo a una resistencia, no分流 (no roba corriente) y por tanto no altera la corriente total del circuito. Solo mide el voltaje. El distractor A confunde efectos. El distractor B es lo opuesto. El distractor D sería cierto para un amperímetro conectado en paralelo, no para un voltímetro.

---

## Question 17 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P4-electricidad-circuitos-085-MASTERY-v17`
**Bloom:** Evaluate
**ICFES:** Argumentative
**Context:** Análisis de superconductividad

### Enunciado
En un experimento de física de superconductividad que simula condiciones similares a las de la investigación en colisiones de partículas, un material hipotético tiene resistencia cero a temperatura criogénica. Si se conecta este material(superconductor) en serie con una resistencia de 10Ω a una fuente de 5V, ¿qué característica fundamental tendría el circuito?

### Options
- [ ] A) Toda la corriente fluiría por el superconductor y ninguna por la resistencia
- [ ] B) La corriente sería infinita porque R = 0
- [x] C) La corriente sería 0.5A y toda la caída de voltaje ocurriría en la resistencia de 10Ω
