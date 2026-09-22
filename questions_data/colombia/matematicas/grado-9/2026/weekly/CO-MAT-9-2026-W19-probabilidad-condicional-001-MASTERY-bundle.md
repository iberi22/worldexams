---
id: "CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle"
country: "colombia"
grado: 9
asignatura: "matematicas"
tema: "probabilidad-condicional"
periodo: "weekly"
week: "W19"
year: 2026
bundle_type: "weekly"
protocol_version: "5.2"
total_questions: 12
bundle_size: 12
alignment: "DBA MEN Colombia / Saber 11"
bundle_index: 1
calibration: {difficulty_band: "D3-D4", expected_success: 0.8}
license: "FREE"
tier: "legacy"
creador: "Jules-Agent"
---

# Bundle MASTERY: Probabilidad Condicional - Grado 9

Este bundle contiene 12 preguntas sobre **probabilidad-condicional** para grado 9, alineadas con los DBA del MEN Colombia y el marco de evaluación ICFES Saber 11. Las matemáticas de la probabilidad también ayudan a interpretar pruebas de salud como las de cáncer con pensamiento crítico.

## Question 1 [D3-D4]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v1
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.90
**Contexto:** En Bogotá, la profesora explica que la probabilidad de A dado que ya ocurrió B se escribe $P(A|B)$.
### Enunciado
¿Cuál es la fórmula correcta de la probabilidad condicional $P(A|B)$?
### Opciones
- [x] A) $P(A|B) = P(A \cap B) / P(B)$
  <!-- feedback: Correcto. Es la definición: casos favorables a ambos sobre la probabilidad del condicionante. -->
- [ ] B) $P(A|B) = P(A) \times P(B)$
  <!-- feedback: Incorrecto. Esa es la regla de independencia para la intersección, no la condicional. -->
- [ ] C) $P(A|B) = P(A) + P(B)$
  <!-- feedback: Incorrecto. Esa operación corresponde a la unión de excluyentes. -->
- [ ] D) $P(A|B) = P(B) / P(A \cap B)$
  <!-- feedback: Incorrecto. Invertiste numerador y denominador. -->
### Explicacion Pedagogica
Condicionar a $B$ significa reducir el espacio muestral a $B$. Por eso se divide la probabilidad conjunta entre $P(B)$, con $P(B) > 0$.

## Question 2 [D3-D4]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v2
**Bloom:** Remember
**ICFES:** Aleatorio
**Expected_Success:** 0.87
**Contexto:** En Medellín, se lanza un dado legal y un amigo te dice que el resultado fue par.
### Enunciado
Sabiendo que salió un número par (2, 4 o 6), ¿cuál es la probabilidad de que haya salido el 6?
### Opciones
- [ ] A) $1/6$
  <!-- feedback: Incorrecto. Ese es el valor sin condicionar. -->
- [x] B) $1/3$
  <!-- feedback: Correcto. Espacio reducido = {2, 4, 6}; solo un caso favorable: 1/3. -->
- [ ] C) $1/2$
  <!-- feedback: Incorrecto. Confundiste con la probabilidad de par. -->
- [ ] D) $2/3$
  <!-- feedback: Incorrecto. Tomaste dos casos favorables en vez de uno. -->
### Explicacion Pedagogica
Al saber que fue par, el espacio muestral pasa de 6 a 3 resultados. Solo el 6 favorece, así que $P = 1/3$.

## Question 3 [D3-D4]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v3
**Bloom:** Understand
**ICFES:** Aleatorio
**Expected_Success:** 0.84
**Contexto:** En Cali, de 50 estudiantes, 20 juegan fútbol y, de esos 20, 8 también juegan baloncesto.
### Enunciado
Si se elige al azar un estudiante que juega fútbol, ¿cuál es la probabilidad de que también juegue baloncesto?
### Opciones
- [ ] A) $8/50$
  <!-- feedback: Incorrecto. Dividiste entre todos los estudiantes, no entre los que juegan fútbol. -->
- [ ] B) $20/50$
  <!-- feedback: Incorrecto. Esa es la probabilidad de jugar fútbol. -->
- [x] C) $8/20$
  <!-- feedback: Correcto. El espacio se reduce a los 20 futbolistas; 8 cumplen la condición. -->
- [ ] D) $20/8$
  <!-- feedback: Incorrecto. Invertiste la fracción y da mayor que 1. -->
### Explicacion Pedagogica
$P(\text{baloncesto}|\text{fútbol}) = 8/20 = 2/5 = 0.4$. El condicionante siempre va en el denominador.

## Question 4 [D5-D6]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v4
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.81
**Contexto:** En Barranquilla, una urna tiene 4 balotas blancas y 6 negras. Se saca una balota blanca y no se devuelve.
### Enunciado
¿Cuál es la probabilidad de que la segunda balota sea blanca, dado que la primera fue blanca?
### Opciones
- [ ] A) $4/10$
  <!-- feedback: Incorrecto. Esa era la probabilidad antes de la primera extracción. -->
- [ ] B) $4/9$
  <!-- feedback: Incorrecto. Olvidaste descontar la blanca ya extraída. -->
- [ ] C) $3/10$
  <!-- feedback: Incorrecto. Descontaste la balota pero no redujiste el total. -->
- [x] D) $3/9$
  <!-- feedback: Correcto. Quedan 3 blancas de 9 balotas: 3/9 = 1/3. -->
### Explicacion Pedagogica
Sin reemplazo, el espacio cambia: quedan 9 balotas y 3 blancas. Por eso $P = 3/9 = 1/3$.

## Question 5 [D5-D6]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v5
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.78
**Contexto:** En Cartagena, un hotel registra 40 huéspedes hombres y 60 mujeres. De los hombres, 15 hablan inglés.
### Enunciado
Si se elige al azar un huésped hombre, ¿cuál es la probabilidad de que hable inglés?
### Opciones
- [x] A) $15/40$
  <!-- feedback: Correcto. Se condiciona a ser hombre: 15 de 40. -->
- [ ] B) $15/100$
  <!-- feedback: Incorrecto. Esa es la probabilidad conjunta sin condicionar. -->
- [ ] C) $40/100$
  <!-- feedback: Incorrecto. Esa es la probabilidad de elegir un hombre. -->
- [ ] D) $15/60$
  <!-- feedback: Incorrecto. Dividiste entre el grupo de mujeres. -->
### Explicacion Pedagogica
$P(\text{inglés}|\text{hombre}) = 15/40 = 3/8 = 0.375$. El denominador es el tamaño del grupo condicionante.

## Question 6 [D5-D6]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v6
**Bloom:** Apply
**ICFES:** Aleatorio
**Expected_Success:** 0.75
**Contexto:** En Bucaramanga, dos amigos juegan con dos dados. Uno de ellos ve que un dado marcó 4, pero no ve el otro.
### Enunciado
Sabiendo que un dado es 4, ¿cuál es la probabilidad de que la suma sea 7?
### Opciones
- [ ] A) $1/36$
  <!-- feedback: Incorrecto. Esa es la probabilidad de un par ordenado sin condicionar. -->
- [x] B) $1/6$
  <!-- feedback: Correcto. El otro dado tiene 6 opciones y solo el 3 da suma 7. -->
- [ ] C) $2/6$
  <!-- feedback: Incorrecto. Contaste dos casos como si ambos dados fueran visibles. -->
- [ ] D) $7/36$
  <!-- feedback: Incorrecto. Confundiste la suma con el número de casos. -->
### Explicacion Pedagogica
Fijado un dado en 4, solo queda la variabilidad del otro: {1, 2, 3, 4, 5, 6}. Solo 3 sirve, así que $P = 1/6$.

## Question 7 [D7-D8]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v7
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.72
**Contexto:** En Pereira, un tamizaje de cáncer examina a 1000 personas: 10 están enfermas y 990 sanas. El test detecta 9 de las 10 enfermas y da positivo en 99 sanas.
### Enunciado
Si una persona da positivo, ¿cuál es la probabilidad de que realmente esté enferma?
### Opciones
- [ ] A) $9/10$
  <!-- feedback: Incorrecto. Esa es la sensibilidad del test, no la probabilidad pedida. -->
- [ ] B) $9/990$
  <!-- feedback: Incorrecto. Ignoraste los verdaderos positivos en el total de positivos. -->
- [x] C) $9/108$
  <!-- feedback: Correcto. Positivos totales = 9 + 99 = 108; verdaderos = 9. -->
- [ ] D) $10/1000$
  <!-- feedback: Incorrecto. Esa es la prevalencia sin considerar el resultado del test. -->
### Explicacion Pedagogica
$P(\text{enfermo}|\text{positivo}) = 9 / 108 = 1/12 \approx 0.083$. Aunque el test detecta bien, la enfermedad es rara y hay muchos falsos positivos.

## Question 8 [D7-D8]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v8
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.69
**Contexto:** En Cali, una caja tiene 5 fichas rojas y 3 azules. Se saca una ficha azul y no se devuelve. El premio de la rifa es de $50.000 COP.
### Enunciado
¿Cuál es la probabilidad de que la segunda ficha sea roja, dado que la primera fue azul?
### Opciones
- [ ] A) $5/8$
  <!-- feedback: Incorrecto. Esa era la probabilidad inicial. -->
- [ ] B) $3/7$
  <!-- feedback: Incorrecto. Esa sería la probabilidad de otra azul. -->
- [ ] C) $4/7$
  <!-- feedback: Incorrecto. Descontaste una roja en vez de una azul. -->
- [x] D) $5/7$
  <!-- feedback: Correcto. Quedan 5 rojas de 7 fichas totales. -->
### Explicacion Pedagogica
Tras sacar una azul quedan 7 fichas: 5 rojas y 2 azules. Por tanto $P(\text{roja}|\text{azul primero}) = 5/7$.

## Question 9 [D7-D8]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v9
**Bloom:** Analyze
**ICFES:** Aleatorio
**Expected_Success:** 0.66
**Contexto:** En Bogotá, se encuesta el medio de transporte: de 200 estudiantes, 120 usan bus y 80 usan bicicleta. De los 120 del bus, 60 llegan temprano; de los 80 de bicicleta, 40 llegan temprano.
### Enunciado
¿Qué se concluye sobre llegar temprano y el medio usado?
### Opciones
- [x] A) Son independientes, pues $P(\text{temprano}|\text{bus}) = P(\text{temprano}) = 1/2$
  <!-- feedback: Correcto. 60/120 = 1/2 y 100/200 = 1/2; condicionar no cambia la probabilidad. -->
- [ ] B) Son dependientes, pues $60 \neq 40$
  <!-- feedback: Incorrecto. Comparaste frecuencias absolutas y no probabilidades. -->
- [ ] C) $P(\text{temprano}|\text{bus}) = 60/200$
  <!-- feedback: Incorrecto. Dividiste entre el total y no entre los usuarios del bus. -->
- [ ] D) $P(\text{temprano}) = 60/120$
  <!-- feedback: Incorrecto. Esa es la condicional, no la marginal. -->
### Explicacion Pedagogica
Independencia se verifica con $P(A|B) = P(A)$. Aquí ambas valen $1/2$, así que el medio no aporta información sobre la puntualidad.

## Question 10 [D9-D10]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v10
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.62
**Contexto:** En Medellín, de una baraja de 52 cartas se retiran los 4 reyes. Un estudiante afirma que $P(\text{rey}|\text{figura})$ sigue valiendo $1/3$.
### Enunciado
¿Cómo se evalúa esa afirmación?
### Opciones
- [ ] A) Es correcta, pues quitar cartas no afecta a las figuras
  <!-- feedback: Incorrecto. Quitar los reyes sí reduce el grupo de figuras de 12 a 8. -->
- [x] B) Es falsa, pues pasa de $4/12 = 1/3$ a $0/8 = 0$
  <!-- feedback: Correcto. Sin reyes no hay casos favorables; las figuras restantes son 8 (solo J y Q). -->
- [ ] C) Es falsa, pues ahora vale $4/52$
  <!-- feedback: Incorrecto. No condicionaste a ser figura. -->
- [ ] D) Es correcta, pues siempre vale $1/13$
  <!-- feedback: Incorrecto. $1/13$ es $P(\text{rey})$ sin condicionar en el mazo completo. -->
### Explicacion Pedagogica
La evaluación exige recalcular el espacio reducido. Antes: 4 reyes de 12 figuras = $1/3$. Después: 0 reyes de 8 figuras = $0$. La afirmación ignora ese ajuste.

## Question 11 [D9-D10]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v11
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.58
**Contexto:** En Barranquilla, 200 aspirantes a una beca presentan dos filtros. Aprueban el primero 80 y, de esos, 40 aprueban el segundo. Ningún reprobado del primero presenta el segundo.
### Enunciado
¿Cuál es $P(\text{aprobar segundo}|\text{aprobar primero})$ y qué significa para la selección?
### Opciones
- [ ] A) $40/200$, la mitad abandona
  <!-- feedback: Incorrecto. Dividiste entre todos los aspirantes. -->
- [ ] B) $80/200$, el primer filtro es fácil
  <!-- feedback: Incorrecto. Esa es la probabilidad de pasar el primero. -->
- [x] C) $40/80 = 1/2$, la mitad de los que superan el primero también supera el segundo
  <!-- feedback: Correcto. El espacio se reduce a los 80 que pasaron el primero. -->
- [ ] D) $40/120$, se compara con los reprobados
  <!-- feedback: Incorrecto. Los 120 reprobados no pertenecen al espacio condicional. -->
### Explicacion Pedagogica
Condicionar al primer éxito es clave en procesos por etapas. La tasa real de éxito en la segunda fase es $1/2$, no $40/200 = 1/5$.

## Question 12 [D9-D10]
**ID:** CO-MAT-9-2026-W19-probabilidad-condicional-001-MASTERY-bundle-v12
**Bloom:** Evaluate
**ICFES:** Aleatorio
**Expected_Success:** 0.55
**Contexto:** En Bogotá, una fábrica de Medellín tiene dos máquinas: A produce el 70% con 5% de defectuosos y B produce el 30% con 10% de defectuosos.
### Enunciado
Si un bombillo sale defectuoso, ¿cuál es la probabilidad de que venga de la máquina A?
### Opciones
- [ ] A) $0.70$
  <!-- feedback: Incorrecto. Esa es la producción total de A, sin usar la información de defecto. -->
- [ ] B) $0.035$
  <!-- feedback: Incorrecto. Esa es la probabilidad conjunta, no la condicional. -->
- [ ] C) $0.065$
  <!-- feedback: Incorrecto. Esa es la probabilidad total de defecto. -->
- [x] D) $7/13 \approx 0.538$
  <!-- feedback: Correcto. $P(A|\text{def}) = 0.035 / 0.065 = 35/65 = 7/13$. -->
### Explicacion Pedagogica
Por Bayes: $P(\text{def}) = 0.7 \times 0.05 + 0.3 \times 0.10 = 0.065$. Luego $P(A|\text{def}) = 0.035 / 0.065 = 7/13$. Aunque A produce más, su menor tasa de fallos reduce su peso entre los defectuosos.
