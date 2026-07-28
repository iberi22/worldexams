---
id: "AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle"
country: "argentina"
grado: 11
asignatura: "matematica"
tema: "probabilidad-teorema-bayes"
periodo: "weekly"
week: "W23"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 20
bundle_size: 20
alignment: "NAP Argentina 2026 / Aprender"
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Teorema de Bayes - Grado 11

Este bundle profundiza en el Teorema de Bayes y la probabilidad total, herramientas esenciales para la toma de decisiones bajo incertidumbre, aplicadas a contextos argentinos.

---

## Question 1 [D3-D4]
**Contexto:** En una fábrica de sombreros de tango en Buenos Aires, se usan dos máquinas. La Máquina A produce el 70% y la Máquina B el 30%. El Teorema de Bayes ayuda a identificar el origen de un defecto.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v1
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Producción artesanal/industrial.
**Expected_Success:** 0.85

### Enunciado
¿Cuál de las siguientes fórmulas representa correctamente el Teorema de Bayes para dos eventos A y B?

### Opciones
- [ ] A) P(A|B) = P(A ∩ B) / P(A) <!-- feedback: Incorrecto. El denominador debe ser la probabilidad del evento condicionante (B). -->
- [x] B) P(A|B) = [P(B|A) * P(A)] / P(B) <!-- feedback: Correcto. Esta es la expresión clásica del Teorema de Bayes. -->
- [ ] C) P(A|B) = P(A) + P(B) - P(A ∩ B) <!-- feedback: Incorrecto. Esta es la fórmula para la probabilidad de la unión. -->
- [ ] D) P(A|B) = P(B|A) * P(B) <!-- feedback: Incorrecto. No respeta la relación de proporcionalidad correcta. -->

### Explicacion Pedagogica
El Teorema de Bayes permite calcular la probabilidad de un evento A dado que ocurrió B, a partir de la probabilidad de B dado A y las probabilidades marginales de cada evento. Es fundamental para actualizar probabilidades a medida que aparece nueva información.

---

## Question 2 [D3-D4]
**Contexto:** Un laboratorio en Tucumán analiza la probabilidad de que una fruta tenga una plaga específica basándose en resultados de tests previos.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v2
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Sanidad vegetal en citricultura.
**Expected_Success:** 0.82

### Enunciado
En el Teorema de Bayes, ¿qué representa el término P(A)?

### Opciones
- [ ] A) Probabilidad condicional <!-- feedback: Incorrecto. La condicional se escribe con una barra vertical. -->
- [x] B) Probabilidad a priori <!-- feedback: Correcto. Representa la creencia o probabilidad inicial antes de conocer nueva evidencia. -->
- [ ] C) Probabilidad a posteriori <!-- feedback: Incorrecto. Esa es la probabilidad calculada después de aplicar el teorema. -->
- [ ] D) Verosimilitud <!-- feedback: Incorrecto. La verosimilitud suele asociarse al término P(B|A). -->

### Explicacion Pedagogica
P(A) se denomina probabilidad "a priori" porque es la probabilidad asignada al evento antes de recolectar nuevos datos o evidencias (como el resultado de un test).

---

## Question 3 [D3-D4]
**Contexto:** Se está analizando la efectividad de un filtro de spam en una empresa de software de Córdoba.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v3
**Bloom:** Remember
**EJE:** Probabilidad y Estadística
**Contexto:** Filtros de correo electrónico.
**Expected_Success:** 0.88

### Enunciado
¿Cuál es el nombre del teorema que permite calcular la probabilidad total P(B) necesaria para el denominador del Teorema de Bayes?

### Opciones
- [ ] A) Teorema de Pitágoras <!-- feedback: Incorrecto. Ese teorema es para triángulos rectángulos. -->
- [x] B) Teorema de la Probabilidad Total <!-- feedback: Correcto. Este teorema suma las probabilidades de B a través de una partición del espacio muestral. -->
- [ ] C) Ley de Laplace <!-- feedback: Incorrecto. Esta ley es para casos equiprobables. -->
- [ ] D) Teorema Central del Límite <!-- feedback: Incorrecto. Este teorema describe la distribución de promedios de muestras. -->

### Explicacion Pedagogica
El Teorema de la Probabilidad Total permite calcular la probabilidad de un evento B sumando las probabilidades de que ocurra B junto con cada uno de los eventos disjuntos que forman el espacio muestral.

---

## Question 4 [D3-D4]
**Contexto:** En una consultora de Buenos Aires, se analiza el comportamiento de los votantes según su rango etario.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v4
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Sociología electoral.
**Expected_Success:** 0.80

### Enunciado
Si P(Voto | Jóvenes) = 0,6 y P(Voto | Adultos) = 0,8, ¿es posible que la probabilidad total de voto P(Voto) sea 0,9?

### Opciones
- [ ] A) Sí, si hay más adultos que jóvenes. <!-- feedback: Incorrecto. El valor total debe estar en el rango de los valores condicionales. -->
- [x] B) No, porque P(Voto) debe ser un promedio ponderado entre 0,6 y 0,8. <!-- feedback: Correcto. El valor total nunca puede ser mayor al máximo ni menor al mínimo de las probabilidades condicionadas. -->
- [ ] C) Sí, si la mayoría de la población no vota. <!-- feedback: Incorrecto. No tiene sentido con los datos dados. -->
- [ ] D) Depende de cuántas personas fueron encuestadas. <!-- feedback: Incorrecto. La proporción es independiente del tamaño de muestra para este concepto teórico. -->

### Explicacion Pedagogica
La probabilidad total es una suma ponderada: P(B) = Σ P(B|Ai)P(Ai). Matemáticamente, esto implica que el resultado final debe estar comprendido entre el valor mínimo y el máximo de las probabilidades condicionales involucradas.

---

## Question 5 [D5-D6]
**Contexto:** Una bodega en Mendoza tiene dos líneas de embotellado: L1 y L2.
- L1 produce el 60% de las botellas y tiene un 2% de fallas en el corcho.
- L2 produce el 40% y tiene un 5% de fallas en el corcho.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v5
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Industria vitivinícola.
**Expected_Success:** 0.75

### Enunciado
¿Cuál es la probabilidad de que una botella elegida al azar tenga una falla en el corcho?

### Opciones
- [ ] A) 0,07 <!-- feedback: Incorrecto. No se pueden sumar las tasas de falla directamente. -->
- [x] B) 0,032 <!-- feedback: Correcto. P(F) = (0,60 * 0,02) + (0,40 * 0,05) = 0,012 + 0,020 = 0,032. -->
- [ ] C) 0,035 <!-- feedback: Incorrecto. Este sería el promedio simple, no el ponderado. -->
- [ ] D) 0,012 <!-- feedback: Incorrecto. Esta es solo la probabilidad de falla en la línea 1. -->

### Explicacion Pedagogica
Aplicamos la probabilidad total: P(Falla) = P(Falla|L1)P(L1) + P(Falla|L2)P(L2). 0,02 * 0,60 + 0,05 * 0,40 = 0,012 + 0,020 = 0,032 (3,2%).

---

## Question 6 [D5-D6]
**Contexto:** Usando los datos de la bodega en Mendoza (P(Falla) = 0,032), se encuentra una botella con el corcho fallado.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v6
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Análisis de causa raíz en producción.
**Expected_Success:** 0.70

### Enunciado
¿Cuál es la probabilidad de que esa botella fallada provenga de la Línea 2?

### Opciones
- [ ] A) 0,40 <!-- feedback: Incorrecto. Esta es la probabilidad a priori de ser de la línea 2. -->
- [ ] B) 0,05 <!-- feedback: Incorrecto. Esta es la probabilidad de falla dado que es de la línea 2. -->
- [x] C) 0,625 <!-- feedback: Correcto. P(L2|F) = P(F|L2)P(L2) / P(F) = 0,020 / 0,032 = 0,625. -->
- [ ] D) 0,375 <!-- feedback: Incorrecto. Esta es la probabilidad de que provenga de la línea 1. -->

### Explicacion Pedagogica
Aplicamos el Teorema de Bayes: P(L2|Falla) = P(Falla ∩ L2) / P(Falla). El numerador es 0,05 * 0,40 = 0,020. El denominador es 0,032. 0,020 / 0,032 = 20/32 = 5/8 = 0,625.

---

## Question 7 [D5-D6]
**Contexto:** En una clínica de Mar del Plata, se realiza un test para una alergia que afecta al 10% de la población.
- Si una persona tiene alergia, el test da positivo el 90% de las veces.
- Si no tiene alergia, el test da positivo el 10% de las veces (falso positivo).

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v7
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Diagnóstico médico.
**Expected_Success:** 0.72

### Enunciado
¿Cuál es la probabilidad total de que el test dé positivo en un paciente elegido al azar?

### Opciones
- [ ] A) 0,90 <!-- feedback: Incorrecto. Esa es la tasa de verdaderos positivos. -->
- [x] B) 0,18 <!-- feedback: Correcto. P(+) = P(+|A)P(A) + P(+|NA)P(NA) = 0,90*0,10 + 0,10*0,90 = 0,09 + 0,09 = 0,18. -->
- [ ] C) 0,10 <!-- feedback: Incorrecto. Esta es solo la tasa de falsos positivos o la prevalencia. -->
- [ ] D) 0,20 <!-- feedback: Incorrecto. Error en los cálculos ponderados. -->

### Explicacion Pedagogica
P(+) = (Prob. de positivo si tiene alergia * Prob. de tener alergia) + (Prob. de positivo si no tiene alergia * Prob. de no tener alergia). P(+) = (0,9 * 0,1) + (0,1 * 0,9) = 0,09 + 0,09 = 0,18.

---

## Question 8 [D5-D6]
**Contexto:** Siguiendo con el caso de la alergia en Mar del Plata (P(+) = 0,18), un paciente recibe un resultado POSITIVO.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v8
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Interpretación de resultados clínicos.
**Expected_Success:** 0.68

### Enunciado
¿Cuál es la probabilidad de que el paciente realmente TENGA la alergia?

### Opciones
- [ ] A) 0,90 <!-- feedback: Incorrecto. Esta es la sensibilidad del test. -->
- [x] B) 0,50 <!-- feedback: Correcto. P(A|+) = P(+|A)P(A) / P(+) = 0,09 / 0,18 = 0,50. -->
- [ ] C) 0,10 <!-- feedback: Incorrecto. Esta es la probabilidad previa a realizar el test. -->
- [ ] D) 0,18 <!-- feedback: Incorrecto. Esta es la probabilidad total de dar positivo. -->

### Explicacion Pedagogica
Usamos Bayes: P(Alergia | Positivo) = (0,9 * 0,1) / 0,18 = 0,09 / 0,18 = 0,5. A pesar de que el test parece bueno, solo hay un 50% de probabilidad de tener la alergia tras un positivo.

---

## Question 9 [D5-D6]
**Contexto:** En un puerto de Rosario, el 80% de los barcos que llegan son nacionales y el 20% son extranjeros. El 5% de los nacionales transporta carga peligrosa, frente al 15% de los extranjeros.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v9
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Operaciones portuarias y logística.
**Expected_Success:** 0.74

### Enunciado
¿Cuál es la probabilidad de que un barco elegido al azar sea extranjero Y transporte carga peligrosa?

### Opciones
- [ ] A) 0,15 <!-- feedback: Incorrecto. Esta es la probabilidad condicionada. -->
- [ ] B) 0,20 <!-- feedback: Incorrecto. Esta es la probabilidad de ser extranjero. -->
- [x] C) 0,03 <!-- feedback: Correcto. P(E ∩ P) = P(P|E) * P(E) = 0,15 * 0,20 = 0,03. -->
- [ ] D) 0,07 <!-- feedback: Incorrecto. Esta es la probabilidad total de carga peligrosa. -->

### Explicacion Pedagogica
Para la intersección de eventos dependientes: P(A ∩ B) = P(A|B) * P(B). La probabilidad de ser extranjero y peligroso es 0,20 * 0,15 = 0,03 (3%).

---

## Question 10 [D5-D6]
**Contexto:** En una universidad de La Plata, se sabe que el 60% de los graduados en ingeniería consiguen empleo en menos de 6 meses. De los que consiguen empleo rápido, el 80% realizó una pasantía. De los que no consiguen empleo rápido, solo el 20% realizó una pasantía.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v10
**Bloom:** Understand
**EJE:** Probabilidad y Estadística
**Contexto:** Empleabilidad universitaria.
**Expected_Success:** 0.72

### Enunciado
¿Cuál es la probabilidad de que un graduado haya realizado una pasantía?

### Opciones
- [ ] A) 0,80 <!-- feedback: Incorrecto. Esta es una probabilidad condicional. -->
- [x] B) 0,56 <!-- feedback: Correcto. P(Pas) = 0,80*0,60 + 0,20*0,40 = 0,48 + 0,08 = 0,56. -->
- [ ] C) 0,50 <!-- feedback: Incorrecto. Error en la suma ponderada. -->
- [ ] D) 0,60 <!-- feedback: Incorrecto. Esta es la probabilidad de conseguir empleo rápido. -->

### Explicacion Pedagogica
P(Pas) = P(Pas | Rápido)P(Rápido) + P(Pas | Lento)P(Lento) = (0,8 * 0,6) + (0,2 * 0,4) = 0,48 + 0,08 = 0,56.

---

## Question 11 [D7-D8]
**Contexto:** En un call center de Buenos Aires, el 40% de las quejas son atendidas por agentes con experiencia y el 60% por agentes nuevos. El 95% de las quejas atendidas por expertos se resuelven en la primera llamada, comparado con el 70% de los nuevos.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v11
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Atención al cliente.
**Expected_Success:** 0.65

### Enunciado
Si una queja NO se resolvió en la primera llamada, ¿cuál es la probabilidad de que haya sido atendida por un agente nuevo?

### Opciones
- [ ] A) 0,60 <!-- feedback: Incorrecto. Esta es la probabilidad previa. -->
- [ ] B) 0,18 <!-- feedback: Incorrecto. Esta es la probabilidad de que sea nuevo y no resuelva. -->
- [x] C) 0,90 <!-- feedback: Correcto. P(NoR) = 0,05*0,4 + 0,3*0,6 = 0,02 + 0,18 = 0,20. P(Nuevo|NoR) = 0,18 / 0,20 = 0,9. -->
- [ ] D) 0,70 <!-- feedback: Incorrecto. No corresponde al cálculo de Bayes inverso. -->

### Explicacion Pedagogica
Calculamos P(No Resuelto) = 0,20. De ese 20%, la parte que corresponde a los agentes nuevos es 0,18 (60% de 30% de fallas). P = 0,18 / 0,20 = 0,9. Es muy probable que si no se resolvió, el agente fuera nuevo.

---

## Question 12 [D7-D8]
**Contexto:** Una empresa de seguros en Santa Fe determinó que el 20% de los conductores son "de alto riesgo". La probabilidad de que un conductor de alto riesgo tenga un accidente en un año es 0,4. Para uno de bajo riesgo, es 0,1.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v12
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Seguros de automotor.
**Expected_Success:** 0.62

### Enunciado
Si un cliente tuvo un accidente este año, ¿cuál es la probabilidad de que sea un conductor de bajo riesgo?

### Opciones
- [x] A) 0,50 <!-- feedback: Correcto. P(Acc) = 0,4*0,2 + 0,1*0,8 = 0,08 + 0,08 = 0,16. P(BR|Acc) = 0,08 / 0,16 = 0,5. -->
- [ ] B) 0,80 <!-- feedback: Incorrecto. Esta es la probabilidad de ser de bajo riesgo antes de saber del accidente. -->
- [ ] C) 0,10 <!-- feedback: Incorrecto. Esta es la probabilidad de accidente dado que es bajo riesgo. -->
- [ ] D) 0,25 <!-- feedback: Incorrecto. Error en la aplicación de la fórmula de Bayes. -->

### Explicacion Pedagogica
P(Accidente) = 0,16. Los dos grupos contribuyen con la misma cantidad absoluta de accidentes: 0,08 los de alto riesgo y 0,08 los de bajo riesgo. Por ende, dado que hubo un accidente, hay 50% de probabilidad para cada grupo.

---

## Question 13 [D7-D8]
**Contexto:** Tres máquinas (A, B, C) producen piezas.
- A: 50% de la producción, 1% defectuoso.
- B: 30% de la producción, 2% defectuoso.
- C: 20% de la producción, 3% defectuoso.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v13
**Bloom:** Apply
**EJE:** Probabilidad y Estadística
**Contexto:** Control de calidad industrial multicapa.
**Expected_Success:** 0.60

### Enunciado
¿Cuál es la probabilidad de que una pieza elegida al azar NO sea defectuosa?

### Opciones
- [ ] A) 0,017 <!-- feedback: Incorrecto. Esta es la probabilidad de ser defectuosa. -->
- [x] B) 0,983 <!-- feedback: Correcto. P(Def) = 0,5*0,01 + 0,3*0,02 + 0,2*0,03 = 0,005 + 0,006 + 0,006 = 0,017. P(No Def) = 1 - 0,017 = 0,983. -->
- [ ] C) 0,95 <!-- feedback: Incorrecto. No es el promedio de las tasas de buen estado. -->
- [ ] D) 0,99 <!-- feedback: Incorrecto. Solo aplica a la máquina A. -->

### Explicacion Pedagogica
Calculamos la probabilidad total de defecto sumando los aportes de cada máquina (0,017). La probabilidad de que no sea defectuosa es el complemento: 1 - 0,017 = 0,983 (98,3%).

---

## Question 14 [D7-D8]
**Contexto:** Usando los datos de las tres máquinas (P(Def) = 0,017), se encuentra una pieza defectuosa.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v14
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Identificación de origen de fallas.
**Expected_Success:** 0.58

### Enunciado
¿Cuál máquina es la que tiene mayor probabilidad de haber producido esa pieza defectuosa?

### Opciones
- [ ] A) La máquina A <!-- feedback: Incorrecto. A pesar de producir más, su tasa de error es baja. -->
- [x] B) Las máquinas B y C por igual <!-- feedback: Correcto. P(B|Def) = 0,006/0,017 ≈ 0,353 y P(C|Def) = 0,006/0,017 ≈ 0,353. Ambas superan a P(A|Def) = 0,005/0,017 ≈ 0,294. -->
- [ ] C) La máquina C <!-- feedback: Incorrecto. Aunque tiene la tasa más alta, produce menos volumen. -->
- [ ] D) Todas tienen la misma probabilidad <!-- feedback: Incorrecto. La máquina A tiene una probabilidad menor. -->

### Explicacion Pedagogica
La probabilidad a posteriori depende tanto del volumen de producción como de la tasa de error. B y C aportan 0,006 cada una al total de defectos, mientras que A aporta 0,005. Por lo tanto, B y C son las fuentes más probables.

---

## Question 15 [D7-D8]
**Contexto:** Un sensor de humo en un edificio de Salta tiene una probabilidad del 99% de sonar si hay fuego. Si no hay fuego, tiene una probabilidad del 1% de sonar accidentalmente. El riesgo de fuego en un día cualquiera es de 0,001.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v15
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Sistemas de alarma y seguridad.
**Expected_Success:** 0.55

### Enunciado
Si la alarma suena, ¿cuál es la probabilidad de que realmente haya un incendio?

### Opciones
- [ ] A) 0,99 <!-- feedback: Incorrecto. Esta es la fiabilidad del sensor ante el evento real. -->
- [x] B) 0,09 <!-- feedback: Correcto. P(+) = 0,99*0,001 + 0,01*0,999 ≈ 0,011. P(F|+) = 0,00099 / 0,01098 ≈ 0,09. -->
- [ ] C) 0,50 <!-- feedback: Incorrecto. Los eventos tienen probabilidades de base muy dispares. -->
- [ ] D) 0,01 <!-- feedback: Incorrecto. Esta es la probabilidad de falsa alarma. -->

### Explicacion Pedagogica
Debido a que el incendio es un evento muy raro (0,1%), la mayoría de las veces que la alarma suena se debe al pequeño margen de error (1%) aplicado a la gran cantidad de días sin incendio. P(F|+) ≈ 9%.

---

## Question 16 [D7-D8]
**Contexto:** En un estudio sobre transporte en Neuquén, se vio que el 30% usa bicicleta. De los que usan bicicleta, el 60% llega temprano al trabajo. De los que no usan bicicleta, solo el 40% llega temprano.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v16
**Bloom:** Analyze
**EJE:** Probabilidad y Estadística
**Contexto:** Movilidad urbana y puntualidad.
**Expected_Success:** 0.64

### Enunciado
Si un empleado llegó temprano, ¿cuál es la probabilidad de que NO use bicicleta?

### Opciones
- [ ] A) 0,70 <!-- feedback: Incorrecto. Esta es la probabilidad a priori de no usar bicicleta. -->
- [ ] B) 0,28 <!-- feedback: Incorrecto. Esta es la intersección P(No Bici y Temprano). -->
- [x] C) 0,609 <!-- feedback: Correcto. P(T) = 0,6*0,3 + 0,4*0,7 = 0,18 + 0,28 = 0,46. P(NoB|T) = 0,28 / 0,46 ≈ 0,609. -->
- [ ] D) 0,391 <!-- feedback: Incorrecto. Esta es la probabilidad de que sí use bicicleta dado que llegó temprano. -->

### Explicacion Pedagogica
P(Temprano) = 0,46. El grupo de los que no usan bicicleta aporta más a los "llegados temprano" (0,28) que el grupo de los ciclistas (0,18). P = 0,28 / 0,46 = 14/23 ≈ 0,609.

---

## Question 17 [D9-D10]
**Contexto:** Dos urnas en un experimento de la UBA. La Urna 1 tiene 5 bolas blancas y 2 negras. La Urna 2 tiene 3 blancas y 4 negras. Se elige una urna al azar, se saca una bola y resulta ser blanca. Se devuelve la bola a la MISMA urna y se saca una segunda bola de esa urna.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v17
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Experimento de urnas con actualización de información.
**Expected_Success:** 0.45

### Enunciado
¿Cuál es la probabilidad de que la segunda bola sea blanca?

### Opciones
- [ ] A) 4/7 <!-- feedback: Incorrecto. Este es el promedio simple de blancas en ambas urnas. -->
- [x] B) 17/28 <!-- feedback: Correcto. P(U1|B1) = (5/7 * 1/2) / (5/7 * 1/2 + 3/7 * 1/2) = 5/8. P(U2|B1) = 3/8. P(B2) = P(B2|U1)P(U1|B1) + P(B2|U2)P(U2|B1) = (5/7 * 5/8) + (3/7 * 3/8) = (25+9)/56 = 34/56 = 17/28. -->
- [ ] C) 1/2 <!-- feedback: Incorrecto. No refleja la mayor probabilidad de estar en la urna 1. -->
- [ ] D) 5/7 <!-- feedback: Incorrecto. Esto supone que estamos seguro en la urna 1. -->

### Explicacion Pedagogica
Al sacar una blanca primero, la probabilidad de estar en la Urna 1 (que tiene más blancas) sube de 0,5 a 0,625. Usamos esa nueva probabilidad para calcular la segunda extracción: (5/7 * 0,625) + (3/7 * 0,375) = 17/28 ≈ 0,607.

---

## Question 18 [D9-D10]
**Contexto:** Un sistema de reconocimiento facial en una entidad financiera de CABA tiene una tasa de falsa aceptación del 0,01% y una tasa de falso rechazo del 1%. Se asume que el 99,9% de los intentos de acceso son de clientes legítimos.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v18
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Biometría y seguridad bancaria.
**Expected_Success:** 0.42

### Enunciado
Si el sistema ACEPTA un acceso, ¿cuál es la probabilidad de que se trate de un impostor?

### Opciones
- [x] A) 0,0000001 <!-- feedback: Correcto. P(Acept) = 0,99 * 0,999 + 0,0001 * 0,001 ≈ 0,989. P(Imp|Ace) = (0,0001 * 0,001) / 0,989 ≈ 0,0000001. Es extremadamente baja debido a la baja tasa de impostores y baja falsa aceptación. -->
- [ ] B) 0,01 <!-- feedback: Incorrecto. No considera la proporción de base de clientes legítimos. -->
- [ ] C) 0,001 <!-- feedback: Incorrecto. Esta es la tasa de impostores previa. -->
- [ ] D) 0,10 <!-- feedback: Incorrecto. No corresponde a la alta precisión del sistema. -->

### Explicacion Pedagogica
La probabilidad de que un acceso aceptado sea de un impostor es bajísima porque: 1) hay pocos impostores (0,1%) y 2) el sistema casi nunca los deja pasar (0,01%). El cálculo formal confirma un valor cercano a una millonésima.

---

## Question 19 [D9-D10]
**Contexto:** En una competencia de matemáticas, se plantea el "Problema de Monty Hall" en versión argentina: tres cajas de alfajores, una tiene un premio en efectivo y las otras dos están vacías. Elegís la Caja A. El conductor (que sabe qué hay) abre la Caja B y muestra que está vacía.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v19
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Probabilidad contraintuitiva (Monty Hall).
**Expected_Success:** 0.48

### Enunciado
¿Cuál es la probabilidad de ganar si decidís CAMBIAR tu elección a la Caja C?

### Opciones
- [ ] A) 1/3 <!-- feedback: Incorrecto. Esta era la probabilidad inicial. -->
- [ ] B) 1/2 <!-- feedback: Incorrecto. La apertura de la caja vacía por alguien que sabe no reparte las chances 50/50. -->
- [x] C) 2/3 <!-- feedback: Correcto. Al cambiar, ganás siempre que tu elección inicial haya sido incorrecta, lo cual ocurre el 66,6% de las veces. -->
- [ ] D) 1/4 <!-- feedback: Incorrecto. El espacio se redujo, la probabilidad debe aumentar. -->

### Explicacion Pedagogica
Este es un clásico de Bayes. P(Premio en C | Conductor abre B) = [P(Conductor abre B | C) * P(C)] / P(Cond abre B). Al calcularlo, resulta que la probabilidad de la caja no elegida inicialmente se duplica al abrirse una de las otras.

---

## Question 20 [D9-D10]
**Contexto:** Un matemático analiza un mazo de cartas y decide que si sale una figura (J, Q, K), usará un dado cargado donde el 6 sale el 50% de las veces. Si no sale figura, usará un dado normal.

**ID:** AR-MAT-11-2026-W23-probabilidad-teorema-bayes-001-MASTERY-bundle-v20
**Bloom:** Evaluate
**EJE:** Probabilidad y Estadística
**Contexto:** Experimento compuesto con dados cargados.
**Expected_Success:** 0.40

### Enunciado
Si tiró el dado y salió un 6, ¿cuál es la probabilidad de que haya sacado una figura del mazo? (Mazo de 52 cartas francesas).

### Opciones
- [ ] A) 3/13 <!-- feedback: Incorrecto. Esta es la probabilidad de sacar figura del mazo. -->
- [ ] B) 0,50 <!-- feedback: Incorrecto. El dado normal también puede sacar un 6. -->
- [x] C) 0,473 <!-- feedback: Correcto. P(Fig) = 12/52 = 3/13. P(NoFig) = 10/13. P(6) = (0,5 * 3/13) + (1/6 * 10/13) ≈ 0,1154 + 0,1282 = 0,2436. P(Fig|6) = 0,1154 / 0,2436 ≈ 0,473. -->
- [ ] D) 0,11 <!-- feedback: Incorrecto. Esta es la intersección de sacar figura y sacar 6. -->

### Explicacion Pedagogica
P(Figura y 6) = (3/13) * 0,5 ≈ 0,115. P(No Figura y 6) = (10/13) * (1/6) ≈ 0,128. P(Total de 6) ≈ 0,243. Bayes: 0,115 / 0,243 ≈ 0,473. El dado cargado hace que las figuras "pesen" casi la mitad de los casos de obtener un 6.
