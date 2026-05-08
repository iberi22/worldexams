<think>
The user wants me to generate exactly 20 questions in the ICFES Saber 11 format for Colombian Sciences Naturales, topic "estructura-atomica" (atomic structure), grade 11, period 1.

Let me follow the exact format with:
- Frontmatter YAML header
- 20 questions with progressive difficulty:
  - Questions 1-4: Difficulty D3-D4 (Basic)
  - Questions 5-10: Difficulty D5-D6 (Medium)
  - Questions 11-16: Difficulty D7-D8 (Advanced)
  - Questions 17-20: Difficulty D9-D10 (Expert)

Each question must include:
- Variant and Difficulty level
- ID with specific format
- Bloom taxonomy level
- ICFES competence
- Colombian context
- Clear statement (enunciado)
- 4 options (A, B, C, D) with correct one marked with [x]
- Explanatory feedback
- Pedagogical explanation

Let me create these questions focusing on atomic structure:

Topics to cover:
1. Subatomic particles (protons, neutrons, electrons)
2. Atomic number and mass number
3. Isotopes
4. Ions
5. Electron configuration
6. Quantum numbers
7. Bohr model
8. Modern atomic model
9. Periodic table organization
10. Periodic properties
11. Electromagnetic radiation
12. Photoelectric effect
13. Wave-particle duality
14. Valencia electrons
15. Ionization energy
16. Electronegativity

I'll make sure to include Colombian context where relevant - Colombian mining, Colombian scientists, Colombian industry applications, etc.

Let me create the questions:
</think>

---
id: "CO-CIE-11-P1-estructura-atomica-061-MASTERY"
country: "colombia"
grado: 11
asignatura: "ciencias-naturales"
tema: "estructura-atomica"
periodo: 1
protocol_version: "5.1"
bundle_size: 20
bundle_index: 61
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
generation:
  agent: "minimax-m2.7"
  model: "minimax/MiniMax-M2.7"
  timestamp: "2026-04-15T18:37:00.107271"
  prompt_version: "v2-direct"
quality_status: "UNREVISED"
generation_status: "RAW"
needs_human_review: true
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

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Indagación
**Context:** Laboratorios escolares colombianos

### Enunciado
En un laboratorio de química del Colegio Nacional de Bogotá, un estudiante observa mediante un modelo didático que el átomo de carbono tiene 6 protones en su núcleo. ¿Cuántos electrones posee este átomo en estado neutro?

### Options
- [ ] A) 12 electrones, porque el número másico es el doble del atómico
- [ ] B) 6 electrones, porque en un átomo neutro el número de electrones es igual al número de protones <!-- feedback: Error común: confundir número atómico con número másico -->
- [x] C) 6 electrones, porque en un átomo neutro el número de electrones es igual al número de protones <!-- feedback: En un átomo neutro, la carga eléctrica total es cero, por lo tanto, el número de electrones (carga negativa) debe ser igual al número de protones (carga positiva) -->
- [ ] D) 0 electrones, porque los electrones se encuentran fuera del núcleo <!-- feedback: Aunque los electrones están fuera del núcleo, siguen siendo parte del átomo -->

### Explicación Pedagógica
La respuesta correcta es C. En un átomo neutro, las cargas positivas (protones) deben equilibrar las cargas negativas (electrones). El número atómico (Z) indica tanto los protones como, en estado neutro, los electrones. El error común es confundir Z con el número másico (A) o pensar que los electrones "no cuentan" porque están fuera del núcleo.

---

## Question 2 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v2`
**Bloom:** Understand
**ICFES:** Uso de conceptos científicos
**Context:** Minería colombiana de carbón en la Guajira

### Enunciado
El carbón mineral explotado en la Guajira colombiana contiene carbono con número atómico 6 y número másico 14. ¿Cuál es la configuración correcta de las partículas subatómicas de este átomo?

### Options
- [ ] A) 6 protones, 14 neutrones y 6 electrones
- [ ] B) 6 protones, 8 neutrones y 6 electrones <!-- feedback: Error: calcular neutrones como A-Z=14-6=8 es correcto, pero otros valores son incorrectos -->
- [x] B) 6 protones, 8 neutrones y 6 electrones <!-- feedback: Correcto: protones = Z = 6, neutrones = A-Z = 14-6 = 8, electrones = 6 en átomo neutro -->
- [ ] C) 14 protones, 6 neutrones y 14 electrones
- [ ] D) 8 protones, 6 neutrones y 6 electrones

### Explicación Pedagógica
La respuesta correcta es B. El número atómico (6) indica los protones, el número másico (14) menos el número atómico da los neutrones (8), y en estado neutro los electrones igualan a los protones. El error frecuente es usar el número másico como número de protones o invertir protones y neutrones.

---

## Question 3 (Variant Basic - Difficulty D3)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v3`
**Bloom:** Remember
**ICFES:** Explicación de fenómenos
**Context:** Industria de fertilizantes en Córdoba

### Enunciado
Una fábrica de fertilizantes en Córdoba utiliza nitrógeno (N) que tiene número atómico 7. ¿A qué grupo de la tabla periódica pertenece este elemento?

### Options
- [ ] A) Grupo 1, porque tiene 7 electrones de valencia
- [ ] B) Grupo 15, porque tiene 7 electrones de valencia <!-- feedback: Error: confundir número atómico con electrones de valencia -->
- [x] B) Grupo 15, porque tiene 5 electrones de valencia <!-- feedback: Correcto: los elementos del Grupo 15 tienen 5 electrones en su capa de valencia; el nitrógeno tiene configuración 2,5 -->
- [ ] C) Grupo 7, porque su número atómico es 7
- [ ] D) Grupo 2, porque tiene 2 niveles de energía

### Explicación Pedagógica
La respuesta correcta es B. El nitrógeno tiene configuración electrónica 1s² 2s² 2p³, lo que significa 5 electrones en el último nivel (valencia), ubicándolo en el Grupo 15. Un error común es confundir el número atómico con los electrones de valencia o no saber que los grupos van del 1 al 18.

---

## Question 4 (Variant Basic - Difficulty D4)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v4`
**Bloom:** Understand
**ICFES:** Indagación
**Context:** Estudios ambientales en el Páramo de Sumapaz

### Enunciado
Un investigador del IDEAM estudia el oxígeno-16 (O-16) y el oxígeno-18 (O-18) presentes en muestras de agua del páramo de Sumapaz. ¿Qué diferencia fundamental existe entre estos dos isótopos de oxígeno?

### Options
- [ ] A) Different number of protons in the nucleus
- [ ] B) Different electronic configuration in the outer shell
- [x] C) Different number of neutrons in the nucleus <!-- feedback: Isotopes are atoms of the same element with different mass numbers due to different number of neutrons -->
- [ ] D) Different chemical properties due to electron difference

### Explicación Pedagógica
La respuesta correcta es C. Los isótopos son átomos del mismo elemento (mismo número de protones y electrones) que difieren en el número de neutrones, lo que provoca diferente número másico. Tienen propiedades químicas similares porque la química depende de los electrones de valencia, no de los neutrones.

---

## Question 5 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v5`
**Bloom:** Understand
**ICFES:** Uso de conceptos científicos
**Context:** Producción de aluminio en Medellín

### Enunciado
El aluminio metálico producido en plantas de Medellín tiene número atómico 13. ¿Cuál es la distribución de electrones por niveles de energía para el Al en estado fundamental?

### Options
- [ ] A) 2-8-3
- [ ] B) 2-8-2-1
- [x] A) 2-8-3 <!-- feedback: Correcto: la configuración electrónica es 2, 8, 3 siguiendo el orden de llenado según el principio de Aufbau -->
- [ ] C) 2-3-8
- [ ] D) 13-8

### Explicación Pedagógica
La respuesta correcta es A. El aluminio tiene 13 electrones distribuidos según el principio de Aufbau: 2 en el primer nivel, 8 en el segundo y 3 en el tercer nivel. El error frecuente es confundir el orden de llenado o pensar que los electrones se distribuyen uniformemente.

---

## Question 6 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v6`
**Bloom:** Apply
**ICFES:** Explicación de fenómenos
**Context:** Datación de fósiles en la Sierra Nevada de Santa Marta

### Enunciado
Un arqueólogo utiliza la técnica de datación por carbono-14 para determinar la edad de un hueso encontrado cerca de la Sierra Nevada de Santa Marta. Si el carbono-14 tiene 6 protones y 8 neutrones, ¿cuál es su número másico?

### Options
- [ ] A) 6, igual al número de protones
- [ ] B) 8, igual al número de neutrones
- [x] C) 14, la suma de protones y neutrones <!-- feedback: El número másico (A) es la suma de protones (Z) y neutrones (N): 6 + 8 = 14 -->
- [ ] D) 2, la diferencia entre neutrones y protones

### Explicación Pedagógica
La respuesta correcta es C. El número másico se calcula como A = Z + N (protones + neutrones). Para el carbono-14: 6 + 8 = 14. Un error común es confundir el número másico con solo protones o solo neutrones.

---

## Question 7 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v7`
**Bloom:** Apply
**ICFES:** Indagación
**Context:** Agricultura en el Valle del Cauca

### Enunciado
El ion calcio (Ca²⁺) es esencial para el desarrollo de cultivos de caña de azúcar en el Valle del Cauca. Si el calcio tiene número atómico 20, ¿cuántos electrones posee el ion Ca²⁺?

### Options
- [ ] A) 20 electrones, igual que el átomo neutro
- [ ] B) 22 electrones, porque ganó 2 electrones
- [x] C) 18 electrones, porque perdió 2 electrones <!-- feedback: Correcto: Ca²⁺ significa que perdió 2 electrones, por lo tanto tiene 20-2 = 18 electrones -->
- [ ] D) 40 electrones, igual al número másico del calcio

### Explicación Pedagógica
La respuesta correcta es C. Un ion positivo (catión) se forma cuando el átomo pierde electrones. Ca²⁺ indica pérdida de 2 electrones, pasando de 20 electrones (átomo neutro) a 18 electrones. El error común es confundir cationes con aniones o pensar que el superíndice indica protones.

---

## Question 8 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v8`
**Bloom:** Understand
**ICFES:** Uso de conceptos científicos
**Context:** Yerba mate colombiana en Antoquia

### Enunciado
La yerba mate que se cultiva en Antioquia contiene potasio (K), elemento del Grupo 1 de la tabla periódica. ¿Cuántos electrones de valencia tiene el potasio?

### Options
- [ ] A) 1 electrón de valencia, porque está en el Grupo 1
- [ ] B) 19 electrones de valencia, porque tiene número atómico 19
- [x] A) 1 electrón de valencia, porque está en el Grupo 1 <!-- feedback: Los elementos del Grupo 1 tienen 1 electrón en su capa de valencia externa -->
- [ ] C) 8 electrones de valencia, para cumplir la regla del octeto
- [ ] D) 4 electrones de valencia, porque tiene 4 niveles de energía

### Explicación Pedagógica
La respuesta correcta es A. Los elementos del Grupo 1 (metales alcalinos) tienen configuración ns¹, es decir, 1 electrón en su capa de valencia. El número de electrones de valencia corresponde al número de grupo para elementos de los grupos principales (A). El potasio tiene configuración 2-8-8-1.

---

## Question 9 (Variant Basic - Difficulty D6)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v9`
**Bloom:** Apply
**ICFES:** Explicación de fenómenos
**Context:** Purificación de agua en Bogotá

### Enunciado
En una planta de tratamiento de agua de Bogotá se utiliza cloro (Cl) para desinfectar. El cloro tiene número atómico 17 y número másico 35. ¿Cuántos neutrones posee un átomo de cloro-35?

### Options
- [ ] A) 17 neutrones, igual al número de protones
- [ ] B) 35 neutrones, igual al número másico
- [x] C) 18 neutrones, resultado de restar Z de A <!-- feedback: Correcto: neutrones = A - Z = 35 - 17 = 18 neutrones -->
- [ ] D) 52 neutrones, la suma de Z y A

### Explicación Pedagógica
La respuesta correcta es C. Para calcular neutrones: N = A - Z = 35 - 17 = 18. Este es un cálculo fundamental en química. Los errores comunes incluyen no saber la fórmula o confundir las variables.

---

## Question 10 (Variant Basic - Difficulty D5)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v10`
**Bloom:** Understand
**ICFES:** Indagación
**Context:** Exploración petrolera en los Llanos Orientales

### Enunciado
Un geólogo estudia el elemento uranio que se encuentra en formaciones geológicas de los Llanos Orientales. El uranio-235 tiene 92 protones y 143 neutrones. ¿Cuál es su número másico?

### Options
- [ ] A) 92, el número de protones
- [ ] B) 143, el número de neutrones
- [x] C) 235, la suma de protones y neutrones <!-- feedback: El número másico es A = Z + N = 92 + 143 = 235 -->
- [ ] D) 51, la diferencia entre neutrones y protones

### Explicación Pedagógica
La respuesta correcta es C. El número másico (A) es la suma del número de protones (Z) y el número de neutrones (N). Esta es una relación fundamental que los estudiantes deben dominar para entender isótopos y energía nuclear.

---

## Question 11 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v11`
**Bloom:** Analyze
**ICFES:** Uso de conceptos científicos
**Context:** Industria petroquímica de Barrancabermeja

### Enunciado
En la refinería de Barrancabermeja se trabaja con átomos de carbono que tienen 6 electrones. Según el modelo atómico de Bohr, ¿cuál es la configuración electrónica correcta del carbono en su estado fundamental?

### Options
- [ ] A) 1s² 2s² 2p²
- [ ] B) 1s² 2s⁴ 2p⁰
- [x] A) 1s² 2s² 2p² <!-- feedback: Correcto: siguiendo el principio de Aufbau y la regla de Hund, el carbono (Z=6) tiene configuración 1s² 2s² 2p² -->
- [ ] C) 1s² 2s² 2p⁶
- [ ] D) 1s² 2s⁴

### Explicación Pedagógica
La respuesta correcta es A. La configuración electrónica sigue el orden de llenado: 1s → 2s → 2p. Con 6 electrones: 2 en 1s, 2 en 2s, y 2 en 2p. El orbital 2p se reparte como un electrón en dos orbitales diferentes (regla de Hund). El error común es sobrellenar orbitales o saltarse niveles.

---

## Question 12 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v12`
**Bloom:** Analyze
**ICFES:** Explicación de fenómenos
**Context:** Producción de electrodomésticos en Rionegro

### Enunciado
Una empresa de electrodomésticos en Rionegro utiliza hierro (Fe, Z=26) en sus productos. ¿Cuántos electrones tiene el Fe³⁺?

### Options
- [ ] A) 26 electrones, igual al átomo neutro
- [ ] B) 29 electrones, porque ganó 3 electrones
- [x] C) 23 electrones, porque perdió 3 electrones <!-- feedback: Correcto: Fe³⁺ indica pérdida de 3 electrones, por lo tanto 26-3 = 23 electrones -->
- [ ] D) 3 electrones, porque solo quedaron los de valencia

### Explicación Pedagógica
La respuesta correcta es C. El superíndice + indica pérdida de electrones. Fe³⁺ significa que el hierro perdió 3 electrones. Los cationes de metales de transición pueden perder electrones del orbital 4s antes que de los 3d, y el Fe comúnmente forma Fe³⁺ en compuestos como el óxido férrico.

---

## Question 13 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v13`
**Bloom:** Analyze
**ICFES:** Uso de conceptos científicos
**Context:** Biodiversidad marina del Caribe colombiano

### Enunciado
El yodo (I) es un oligoelemento esencial que se encuentra en el océano Pacífico colombiano y es necesario para la función tiroidea. Si el yodo tiene Z=53, ¿cuál es su configuración electrónica correcta?

### Options
- [ ] A) [Kr] 4d¹⁰ 5s² 5p⁵
- [ ] B) [Kr] 5s² 5p⁵ 4d¹⁰
- [x] A) [Kr] 4d¹⁰ 5s² 5p⁵ <!-- feedback: Correcto: la configuración del Kr es 36 electrones, más 4d¹⁰ (10e⁻), 5s² (2e⁻) y 5p⁵ (5e⁻), total 53 electrones -->
- [ ] C) [Xe] 5s² 5p⁵
- [ ] D) [Ar] 4d¹⁰ 5s² 5p⁵

### Explicación Pedagógica
La respuesta correcta es A. El yodo (Z=53) tiene como gas noble anterior al Kr (Z=36). Su configuración es [Kr] 4d¹⁰ 5s² 5p⁵, con 7 electrones de valencia (Grupo 17). Un error frecuente es usar Xe en lugar de Kr o invertir el orden de los orbitales 4d y 5s/5p.

---

## Question 14 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v14`
**Bloom:** Apply
**ICFES:** Indagación
**Context:** Minería de esmeraldas en Boyacá

### Enunciado
El berilio (Be) es un metal ligero utilizado en aleaciones para la industria joyera que trabaja esmeraldas en Boyacá. Si el Be tiene Z=4, ¿cuántos electrones de valencia posee según el modelo de Bohr?

### Options
- [ ] A) 4 electrones de valencia, todos los electrones del átomo
- [ ] B) 2 electrones de valencia, ubicados en el segundo nivel
- [x] B) 2 electrones de valencia, ubicados en el segundo nivel <!-- feedback: Correcto: Be tiene configuración 2-2, con 2 electrones en el segundo nivel (capa de valencia) -->
- [ ] C) 6 electrones de valencia, para completar el octeto
- [ ] D) 1 electrón de valencia, porque está en el Grupo 2

### Explicación Pedagógica
La respuesta correcta es B. El berilio tiene configuración 1s² 2s², lo que significa que tiene 2 electrones en el segundo nivel (n=2), que es su capa de valencia. Los metales alcalinotérreos (Grupo 2) tienen 2 electrones de valencia. El error común es confundir "todos los electrones" con "electrones de valencia".

---

## Question 15 (Variant Basic - Difficulty D8)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v15`
**Bloom:** Evaluate
**ICFES:** Explicación de fenómenos
**Context:** Laboratorios farmacéuticos en Cali

### Enunciado
En un laboratorio farmacéutico de Cali se sintetiza aspirina (ácido acetilsalicílico) que contiene oxígeno (O). Un estudiante afirma que el O²⁻ tiene 10 electrones y número másico 16. Respecto al átomo neutro de oxígeno, ¿qué se puede concluir sobre el O²⁻?

### Options
- [ ] A) Tiene 8 protones, 8 neutrones y 10 electrones, por lo tanto su carga es -2
- [ ] B) Tiene 8 protones, 8 neutrones y 6 electrones, por lo tanto su carga es +2
- [x] A) Tiene 8 protones, 8 neutrones y 10 electrones, por lo tanto su carga es -2 <!-- feedback: Correcto: O (Z=8) neutro tiene 8e⁻; O²⁻ tiene 8+2=10e⁻; neutrones = 16-8=8; la carga es -2 por los 2 electrones adicionales -->
- [ ] C) Tiene 16 protones, 8 neutrones y 8 electrones
- [ ] D) Tiene 8 protones, 16 neutrones y 8 electrones

### Explicación Pedagógica
La respuesta correcta es A. El número atómico (protones) no cambia al formar iones. El O²⁻ ganó 2 electrones (de 8 a 10), resultando en carga neta -2. El número másico sigue siendo 16, con 8 neutrones. Un error común es confundir electrones con protones o pensar que los iones cambian su número atómico.

---

## Question 16 (Variant Basic - Difficulty D7)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v16`
**Bloom:** Understand
**ICFES:** Uso de conceptos científicos
**Context:** Construcción de vivienda en Medellín

### Enunciado
El aluminio (Al, Z=13) se usa ampliamente en la construcción de ventanas en Medellín. ¿Cuál es el número máximo de electrones que puede contener el tercer nivel de energía (n=3)?

### Options
- [ ] A) 2 electrones, igual que el primer nivel
- [ ] B) 8 electrones, igual que el segundo nivel
- [x] C) 18 electrones, porque 2n² = 2(3)² = 18 <!-- feedback: Correcto: la fórmula 2n² indica la capacidad de electrones por nivel; para n=3: 2(3)² = 18 electrones -->
- [ ] D) 32 electrones, la capacidad del cuarto nivel

### Explicación Pedagógica
La respuesta correcta es C. La fórmula 2n² calcula la capacidad máxima de electrones por nivel: n=1 (2e⁻), n=2 (8e⁻), n=3 (18e⁻), n=4 (32e⁻). El tercer nivel tiene subniveles s, p, d, f, que juntos acomodan hasta 18 electrones.

---

## Question 17 (Variant Basic - Difficulty D9)

**ID:** `CO-CIE-11-P1-estructura-atomica-061-MASTERY-v17`
**Bloom:** Create
**ICFES:** Indagación
**Context:** Energía nuclear en Colombia

### Enunciado
Colombia ha mostrado interés en desarrollar tecnología nuclear con fines pacíficos. El isótopo uranio-235 se utiliza como combustible nuclear. ¿Cuál de las siguientes combinaciones de partículas representa correctamente al U-235?

### Options
- [ ] A) 92 protones, 92 neutrones, 92 electrones
- [ ] B) 92 protones, 143 neutrones, 92 electrones
- [x] B) 92 protones, 143 neutrones, 92 electrones <!-- feedback: Correcto: U tiene Z=92; para U-235, neutrones = 235-92 = 143; en estado neutro tiene 92 electrones -->
- [ ] C) 92 protones, 235 neutrones, 92 electrones
- [ ] D) 143 protones, 92 neutrones, 143 electrones
