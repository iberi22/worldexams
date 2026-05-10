---
id: "CO-LEC-11-P3-medios-002"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "medios-grafica"
periodo: 3
protocol_version: "5.1"
bundle_index: 2
bundle_size: 20
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
competencia_icfes: "Lectura critica - interpretacion de medios graficos"
afirmacion_icfes: "Distingue dato, tendencia, titulo, sesgo y conclusion prudente en medios graficos"
referente_men: "MEN DBA y competencias de lectura critica para grado 11"
distractor_profile: "misconception_based"
generation:
  agent: "codex"
  model: "gpt-5.4-mini"
  reasoning_effort: "medium"
  timestamp: "2026-04-12T00:00:00-05:00"
curation:
  human_review_required: true
  agent_curated: false
quality_status: "NEEDS_HUMAN_REVIEW"
generation_status: "RAW"
license: "CC BY-NC-SA 4.0"
---

# Bundle Mastery: Medios graficos - Grado 11 - Periodo 3

Este bundle trabaja lectura de tablas, graficos, titulares y publicaciones digitales con foco en evidencia y sesgo.

---

## Texto Base 1: Tabla sobre reciclaje

| Barrio | Toneladas recicladas al mes | Hogares vinculados |
|---|---:|---:|
| Norte | 12 | 180 |
| Centro | 9 | 150 |
| Sur | 15 | 210 |
| Occidente | 7 | 120 |

## Question 1 (D3)
**ID:** `CO-LEC-11-P3-medios-002-v1`
**Bloom:** Understand
**ICFES:** Lee un dato explicito de una tabla.
**Expected_Success:** 0.72

### Enunciado
¿Que barrio recicla mas toneladas al mes?

### Options
- [ ] A) Norte. <!-- feedback: Incorrecto. Tiene 12, no el mayor valor. -->
- [ ] B) Centro. <!-- feedback: Incorrecto. Tiene 9. -->
- [x] C) Sur. <!-- feedback: Correcto. Tiene 15, el valor mas alto. -->
- [ ] D) Occidente. <!-- feedback: Incorrecto. Tiene 7. -->

### Explicacion Pedagogica
La lectura literal de la tabla permite ubicar el valor maximo.

## Question 2 (D3)
**ID:** `CO-LEC-11-P3-medios-002-v2`
**Bloom:** Analyze
**ICFES:** Compara dos columnas de una tabla.
**Expected_Success:** 0.70

### Enunciado
¿Que barrio tiene menos hogares vinculados?

### Options
- [ ] A) Norte. <!-- feedback: Incorrecto. Tiene 180 hogares. -->
- [ ] B) Centro. <!-- feedback: Incorrecto. Tiene 150 hogares. -->
- [ ] C) Sur. <!-- feedback: Incorrecto. Tiene 210 hogares. -->
- [x] D) Occidente. <!-- feedback: Correcto. Tiene 120 hogares, el valor menor. -->

### Explicacion Pedagogica
La segunda columna se interpreta igual que la primera: comparando valores.

## Question 3 (D4)
**ID:** `CO-LEC-11-P3-medios-002-v3`
**Bloom:** Analyze
**ICFES:** Reconoce una tendencia general.
**Expected_Success:** 0.66

### Enunciado
¿Que relacion se observa entre hogares vinculados y toneladas recicladas?

### Options
- [ ] A) A mas hogares, menos reciclaje siempre. <!-- feedback: Incorrecto. La relacion no es inversa en los datos. -->
- [x] B) Los barrios con mas hogares vinculados tienden a reciclar mas. <!-- feedback: Correcto. Sur y Norte muestran valores altos; Occidente, bajos. -->
- [ ] C) No existe ninguna relacion visible. <!-- feedback: Incorrecto. Si se observa una tendencia. -->
- [ ] D) Las toneladas no se pueden comparar. <!-- feedback: Incorrecto. Si se pueden comparar. -->

### Explicacion Pedagogica
La tendencia se infiere al comparar ambas columnas.

## Question 4 (D4)
**ID:** `CO-LEC-11-P3-medios-002-v4`
**Bloom:** Evaluate
**ICFES:** Selecciona una conclusion prudente.
**Expected_Success:** 0.64

### Enunciado
¿Que conclusion es mas prudente?

### Options
- [ ] A) El reciclaje depende solo del clima. <!-- feedback: Incorrecto. El clima no aparece. -->
- [x] B) Puede haber una asociacion entre mayor vinculacion y mayor reciclaje. <!-- feedback: Correcto. Es una conclusion prudente. -->
- [ ] C) Todos los hogares del Sur reciclan exactamente igual. <!-- feedback: Incorrecto. La tabla no lo permite. -->
- [ ] D) La tabla demuestra causalidad absoluta. <!-- feedback: Incorrecto. Solo sugiere asociacion. -->

### Explicacion Pedagogica
La conclusion valida no confunde asociacion con causa.

## Question 5 (D5)
**ID:** `CO-LEC-11-P3-medios-002-v5`
**Bloom:** Evaluate
**ICFES:** Valora el mejor titulo.
**Expected_Success:** 0.58

### Enunciado
¿Que titulo seria mas fiel a la tabla?

### Options
- [ ] A) El reciclaje elimina toda basura en la ciudad. <!-- feedback: Incorrecto. Es una exageracion. -->
- [x] B) Participacion barrial y reciclaje: una relacion posible. <!-- feedback: Correcto. Sintetiza sin sobregeneralizar. -->
- [ ] C) Solo el barrio Sur recicla. <!-- feedback: Incorrecto. Hay otros barrios. -->
- [ ] D) Todos reciclan igual. <!-- feedback: Incorrecto. Los valores cambian. -->

### Explicacion Pedagogica
Un buen titulo resume la tendencia sin convertirla en certeza total.

---

## Texto Base 2: Grafico de barras sobre lectura

| Nivel escolar | Libros leidos al año |
|---|---:|
| 9 | 4 |
| 10 | 5 |
| 11 | 3 |
| 12 | 6 |

## Question 6 (D5)
**ID:** `CO-LEC-11-P3-medios-002-v6`
**Bloom:** Understand
**ICFES:** Lee el valor mas alto.
**Expected_Success:** 0.60

### Enunciado
¿Que nivel leyo mas libros al año?

### Options
- [ ] A) 9. <!-- feedback: Incorrecto. Tiene 4. -->
- [ ] B) 10. <!-- feedback: Incorrecto. Tiene 5. -->
- [ ] C) 11. <!-- feedback: Incorrecto. Tiene 3. -->
- [x] D) 12. <!-- feedback: Correcto. Tiene 6, el valor maximo. -->

### Explicacion Pedagogica
Leer un grafico implica identificar la cifra mayor.

## Question 7 (D5)
**ID:** `CO-LEC-11-P3-medios-002-v7`
**Bloom:** Analyze
**ICFES:** Reconoce una caida entre valores.
**Expected_Success:** 0.57

### Enunciado
¿Que ocurre entre 10 y 11?

### Options
- [ ] A) Los libros suben. <!-- feedback: Incorrecto. Pasan de 5 a 3. -->
- [x] B) Hay una disminucion. <!-- feedback: Correcto. El valor baja. -->
- [ ] C) No cambia nada. <!-- feedback: Incorrecto. Si cambia. -->
- [ ] D) El grafico no muestra ese tramo. <!-- feedback: Incorrecto. Si lo muestra. -->

### Explicacion Pedagogica
La lectura de variacion permite entender las transiciones entre barras.

## Question 8 (D6)
**ID:** `CO-LEC-11-P3-medios-002-v8`
**Bloom:** Evaluate
**ICFES:** Reconoce una posible explicacion no provada.
**Expected_Success:** 0.54

### Enunciado
¿Que explicacion seria demasiado fuerte con solo estos datos?

### Options
- [ ] A) Los niveles no leen exactamente lo mismo. <!-- feedback: Incorrecto. Eso si puede decirse. -->
- [ ] B) El grado 12 registra mas libros que 11. <!-- feedback: Incorrecto. Eso si se observa. -->
- [x] C) El grado 11 lee menos porque sus estudiantes no valoran la lectura. <!-- feedback: Correcto. Es una interpretacion causal no demostrada. -->
- [ ] D) Los datos muestran diferencias entre niveles. <!-- feedback: Incorrecto. Eso si es valido. -->

### Explicacion Pedagogica
Una lectura prudente no añade causas psicologicas sin evidencia.

## Question 9 (D6)
**ID:** `CO-LEC-11-P3-medios-002-v9`
**Bloom:** Analyze
**ICFES:** Interpreta una variacion irregular.
**Expected_Success:** 0.52

### Enunciado
¿Que caracteristica tiene la serie?

### Options
- [ ] A) Es perfectamente ascendente. <!-- feedback: Incorrecto. Baja en 11. -->
- [x] B) Tiene un descenso en el grado 11. <!-- feedback: Correcto. Ese es el rasgo irregular. -->
- [ ] C) Todos los valores son iguales. <!-- feedback: Incorrecto. Son distintos. -->
- [ ] D) No se puede comparar. <!-- feedback: Incorrecto. Si se puede. -->

### Explicacion Pedagogica
La serie no es lineal; por eso requiere lectura atenta.

## Question 10 (D6)
**ID:** `CO-LEC-11-P3-medios-002-v10`
**Bloom:** Evaluate
**ICFES:** Valora una conclusion responsable.
**Expected_Success:** 0.50

### Enunciado
¿Que conclusion es mas responsable?

### Options
- [ ] A) El grado 12 siempre lee mejor que todos. <!-- feedback: Incorrecto. Solo tiene mas libros en esta muestra. -->
- [x] B) La tabla sugiere variaciones por nivel, pero no explica sus causas. <!-- feedback: Correcto. Es la conclusion prudente. -->
- [ ] C) Leer 6 libros garantiza el exito. <!-- feedback: Incorrecto. No hay tal garantia. -->
- [ ] D) El grado 11 no lee nada. <!-- feedback: Incorrecto. Lee 3. -->

### Explicacion Pedagogica
La conclusion valida no sobreinterpreta el dato.

---

## Texto Base 3: Titular y cuerpo breve

**Titular:** *Sube la factura de energia, baja el consumo en hogares.*
**Cuerpo:** *La empresa reporto una disminucion de 8% en el uso residencial, aunque aclaro que el cambio coincide con un mes de temperaturas mas bajas.*

## Question 11 (D7)
**ID:** `CO-LEC-11-P3-medios-002-v11`
**Bloom:** Analyze
**ICFES:** Reconoce el enfoque del titular.
**Expected_Success:** 0.48

### Enunciado
¿Que logra el titular?

### Options
- [ ] A) Describir sin tension. <!-- feedback: Incorrecto. Tiene contraste. -->
- [x] B) Contraponer dos hechos para llamar la atencion. <!-- feedback: Correcto. Sube la factura / baja el consumo. -->
- [ ] C) Explicar toda la causa. <!-- feedback: Incorrecto. No explica por si solo. -->
- [ ] D) Negar el problema. <!-- feedback: Incorrecto. Lo muestra. -->

### Explicacion Pedagogica
El titular condensa un contraste que invita a leer el cuerpo.

## Question 12 (D7)
**ID:** `CO-LEC-11-P3-medios-002-v12`
**Bloom:** Analyze
**ICFES:** Identifica una limitacion en el cuerpo.
**Expected_Success:** 0.46

### Enunciado
¿Que limita la conclusion sobre el consumo?

### Options
- [ ] A) Que faltan numeros. <!-- feedback: Incorrecto. Si hay un porcentaje. -->
- [x] B) Que el cambio coincide con temperaturas mas bajas. <!-- feedback: Correcto. Eso introduce una explicacion alternativa. -->
- [ ] C) Que la empresa calla el dato. <!-- feedback: Incorrecto. Si lo reporta. -->
- [ ] D) Que no hay hogares. <!-- feedback: Incorrecto. Si hay. -->

### Explicacion Pedagogica
La presencia de otra variable impide una lectura causal simple.

## Question 13 (D7)
**ID:** `CO-LEC-11-P3-medios-002-v13`
**Bloom:** Evaluate
**ICFES:** Distingue correlacion de causalidad.
**Expected_Success:** 0.44

### Enunciado
¿Que conclusion seria incorrecta?

### Options
- [ ] A) Hubo una baja en el consumo residencial. <!-- feedback: Incorrecto. Eso si se dice. -->
- [ ] B) El mes fue mas frio. <!-- feedback: Incorrecto. El cuerpo lo sugiere. -->
- [x] C) La sola bajada del consumo demuestra que la factura fue la unica causa. <!-- feedback: Correcto. Eso confunde correlacion con causa unica. -->
- [ ] D) El titular usa contraste. <!-- feedback: Incorrecto. Si lo usa. -->

### Explicacion Pedagogica
La lectura critica separa dato observado de causa unica.

## Question 14 (D8)
**ID:** `CO-LEC-11-P3-medios-002-v14`
**Bloom:** Evaluate
**ICFES:** Selecciona una lectura mas fina.
**Expected_Success:** 0.42

### Enunciado
¿Como deberia leerse el cuerpo?

### Options
- [ ] A) Como una prueba definitiva de causalidad. <!-- feedback: Incorrecto. No alcanza ese nivel. -->
- [x] B) Como una explicacion parcial que requiere mas datos. <!-- feedback: Correcto. Esa es la lectura prudente. -->
- [ ] C) Como una opinion sin datos. <!-- feedback: Incorrecto. Si tiene datos. -->
- [ ] D) Como una historia personal. <!-- feedback: Incorrecto. Es una nota informativa. -->

### Explicacion Pedagogica
La buena lectura distingue informacion, interpretacion y limites.

## Question 15 (D8)
**ID:** `CO-LEC-11-P3-medios-002-v15`
**Bloom:** Analyze
**ICFES:** Reconoce la funcion de la aclaracion final.
**Expected_Success:** 0.40

### Enunciado
La aclaracion final de la empresa sirve para:

### Options
- [ ] A) Cerrar el debate por completo. <!-- feedback: Incorrecto. Deja dudas abiertas. -->
- [x] B) Matizar la interpretacion del descenso. <!-- feedback: Correcto. Introduce contexto. -->
- [ ] C) Eliminar el dato de consumo. <!-- feedback: Incorrecto. No lo elimina. -->
- [ ] D) Convertir el texto en publicidad. <!-- feedback: Incorrecto. Sigue siendo informativo. -->

### Explicacion Pedagogica
La aclaracion reduce el riesgo de una causalidad apresurada.

---

## Texto Base 4: Publicacion y comentarios

*Post: "La juventud ya no lee, solo desliza pantallas."
Comentario 1: "Lo vi en mi salon, asi que es verdad."
Comentario 2: "La publicacion mezcla una sensacion con una conclusion total."
Comentario 3: "Si todos lo repiten, deja de ser opinion."*

## Question 16 (D9)
**ID:** `CO-LEC-11-P3-medios-002-v16`
**Bloom:** Analyze
**ICFES:** Reconoce el problema del post.
**Expected_Success:** 0.38

### Enunciado
¿Que problema tiene el post?

### Options
- [ ] A) Usa demasiados numeros. <!-- feedback: Incorrecto. No usa numeros. -->
- [x] B) Convierte una impresion parcial en una conclusion total. <!-- feedback: Correcto. Esa es la debilidad principal. -->
- [ ] C) Explica una metodologia rigurosa. <!-- feedback: Incorrecto. No lo hace. -->
- [ ] D) Cita fuentes oficiales. <!-- feedback: Incorrecto. No cita. -->

### Explicacion Pedagogica
La generalizacion es el error mas evidente del post.

## Question 17 (D9)
**ID:** `CO-LEC-11-P3-medios-002-v17`
**Bloom:** Evaluate
**ICFES:** Identifica una respuesta mejor fundamentada.
**Expected_Success:** 0.36

### Enunciado
¿Cual respuesta es mas solida frente al post?

### Options
- [ ] A) "Yo tambien siento eso, entonces es cierto." <!-- feedback: Incorrecto. Es anecdota, no evidencia. -->
- [x] B) "Necesitamos datos antes de afirmar que toda una generacion no lee." <!-- feedback: Correcto. Pide evidencia suficiente. -->
- [ ] C) "Las pantallas siempre destruyen la lectura." <!-- feedback: Incorrecto. Repite una generalizacion. -->
- [ ] D) "No importa lo que diga ninguna imagen." <!-- feedback: Incorrecto. Si importa. -->

### Explicacion Pedagogica
La mejor respuesta exige prueba y evita el salto a totalidades.

## Question 18 (D9)
**ID:** `CO-LEC-11-P3-medios-002-v18`
**Bloom:** Analyze
**ICFES:** Reconoce una falacia frecuente.
**Expected_Success:** 0.35

### Enunciado
En el comentario "Lo vi en mi salon, asi que es verdad" aparece:

### Options
- [ ] A) Una definicion tecnica. <!-- feedback: Incorrecto. No define. -->
- [x] B) Una apelacion a la experiencia personal como prueba suficiente. <!-- feedback: Correcto. Esa es la falacia implicita. -->
- [ ] C) Una estadistica completa. <!-- feedback: Incorrecto. No hay estadistica. -->
- [ ] D) Una comparacion formal. <!-- feedback: Incorrecto. No compara. -->

### Explicacion Pedagogica
Una muestra personal no sustituye evidencia representativa.

## Question 19 (D10)
**ID:** `CO-LEC-11-P3-medios-002-v19`
**Bloom:** Evaluate
**ICFES:** Valora la conclusion mas prudente.
**Expected_Success:** 0.34

### Enunciado
¿Que conclusion es mas prudente?

### Options
- [ ] A) Toda la juventud ha dejado de leer. <!-- feedback: Incorrecto. Es demasiado absoluto. -->
- [x] B) La publicacion necesita mas evidencia para sostener su afirmacion total. <!-- feedback: Correcto. Esa es la conclusion critica adecuada. -->
- [ ] C) Las pantallas anulan todos los textos. <!-- feedback: Incorrecto. No se demuestra. -->
- [ ] D) Las opiniones no deben comentarse. <!-- feedback: Incorrecto. Si deben comentarse con criterio. -->

### Explicacion Pedagogica
La conclusion critica evalua suficiencia de evidencia, no solo intuicion.

## Question 20 (D10)
**ID:** `CO-LEC-11-P3-medios-002-v20`
**Bloom:** Evaluate
**ICFES:** Reconoce una lectura multimodal completa.
**Expected_Success:** 0.32

### Enunciado
¿Que lectura integra mejor post, comentario y evidencia?

### Options
- [x] A) El mensaje mezcla opinion general, experiencia parcial y falta de datos suficientes. <!-- feedback: Correcto. Esa sintesis integra bien los componentes. -->
- [ ] B) El mensaje prueba una verdad absoluta. <!-- feedback: Incorrecto. No la prueba. -->
- [ ] C) El mensaje es solo una broma. <!-- feedback: Incorrecto. Tiene pretension argumentativa. -->
- [ ] D) El mensaje no puede analizarse. <!-- feedback: Incorrecto. Si puede. -->

### Explicacion Pedagogica
La lectura multimodal separa opinion, experiencia y respaldo empirico.
