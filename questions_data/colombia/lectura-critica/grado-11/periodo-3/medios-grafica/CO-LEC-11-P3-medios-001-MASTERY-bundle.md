---
id: "CO-LEC-11-P3-medios-001"
country: "colombia"
grado: 11
asignatura: "lectura-critica"
tema: "medios-grafica"
periodo: 3
protocol_version: "5.1"
bundle_size: 20
bundle_index: 1
alignment: "ICFES Saber 11 2026 + DBA MEN 2026"
competencia_icfes: "Lectura critica - interpretacion de medios, datos y sesgo"
afirmacion_icfes: "Lee tablas, titulares y notas para distinguir dato, inferencia y opinion"
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

Este bundle trabaja lectura de graficos, titulares, fuentes, sesgo y relacion entre datos y afirmaciones publicas.

---

## Texto Base 1: Infografia escolar

**Tiempo diario de desplazamiento y su relacion con el descanso**

| Grupo | Promedio de viaje al colegio | Horas de sueño |
|---|---:|---:|
| Camino corto | 20 min | 7.8 |
| Camino medio | 45 min | 7.1 |
| Camino largo | 90 min | 6.4 |

**Nota:** El objetivo de la infografia es mostrar una posible relacion entre movilidad y descanso.

## Question 1 (D3)
**ID:** `CO-LEC-11-P3-medios-001-v1`
**Bloom:** Understand
**ICFES:** Lee un dato explicito de una tabla.
**Expected_Success:** 0.72

### Enunciado
¿Cual grupo presenta menos horas de sueño?

### Options
- [ ] A) Camino corto. <!-- feedback: Incorrecto. Ese grupo registra 7.8 horas. -->
- [ ] B) Camino medio. <!-- feedback: Incorrecto. Ese grupo registra 7.1 horas. -->
- [x] C) Camino largo. <!-- feedback: Correcto. Es el valor mas bajo de la tabla. -->
- [ ] D) Todos igual. <!-- feedback: Incorrecto. Los valores son distintos. -->

### Explicacion Pedagogica
La lectura literal de la tabla permite ubicar el valor minimo.

## Question 2 (D3)
**ID:** `CO-LEC-11-P3-medios-001-v2`
**Bloom:** Analyze
**ICFES:** Compara dos variables de una representacion.
**Expected_Success:** 0.70

### Enunciado
¿Que relacion general muestra la infografia?

### Options
- [ ] A) A mayor viaje, mayor sueño. <!-- feedback: Incorrecto. La tendencia es la opuesta. -->
- [x] B) A mayor tiempo de viaje, menor promedio de sueño. <!-- feedback: Correcto. La tabla muestra descenso progresivo. -->
- [ ] C) El sueño no cambia nunca. <!-- feedback: Incorrecto. Si cambia. -->
- [ ] D) El viaje no tiene ningun dato. <!-- feedback: Incorrecto. Si lo tiene. -->

### Explicacion Pedagogica
La comparacion permite captar una tendencia general.

## Question 3 (D4)
**ID:** `CO-LEC-11-P3-medios-001-v3`
**Bloom:** Analyze
**ICFES:** Reconoce el proposito de la nota metodologica.
**Expected_Success:** 0.66

### Enunciado
¿Para que sirve la nota "El objetivo de la infografia es mostrar una posible relacion entre movilidad y descanso"?

### Options
- [ ] A) Para afirmar una causalidad absoluta. <!-- feedback: Incorrecto. Dice "posible relacion", no causa definitiva. -->
- [x] B) Para delimitar la interpretacion de los datos. <!-- feedback: Correcto. La nota explica como debe leerse la tabla. -->
- [ ] C) Para ocultar las cifras. <!-- feedback: Incorrecto. Las cifras siguen visibles. -->
- [ ] D) Para cambiar el tema a tecnologia. <!-- feedback: Incorrecto. Mantiene el mismo tema. -->

### Explicacion Pedagogica
El pie de grafico orienta la lectura y evita exageraciones.

## Question 4 (D4)
**ID:** `CO-LEC-11-P3-medios-001-v4`
**Bloom:** Evaluate
**ICFES:** Evalua una conclusion razonable a partir de datos.
**Expected_Success:** 0.64

### Enunciado
¿Que conclusion es la mas prudente a partir de la tabla?

### Options
- [ ] A) Todos los estudiantes con viaje largo duermen mal por completo. <!-- feedback: Incorrecto. Los datos solo muestran promedio, no casos individuales. -->
- [x] B) Puede existir una asociacion entre trayectos mas largos y menos descanso. <!-- feedback: Correcto. Es una conclusion prudente y no absoluta. -->
- [ ] C) Viajar mas tiempo mejora el descanso. <!-- feedback: Incorrecto. La tabla muestra lo contrario. -->
- [ ] D) El descanso depende solo de la edad. <!-- feedback: Incorrecto. Esa variable no aparece aqui. -->

### Explicacion Pedagogica
La inferencia debe respetar el alcance de los datos.

## Question 5 (D5)
**ID:** `CO-LEC-11-P3-medios-001-v5`
**Bloom:** Evaluate
**ICFES:** Valora la mejor lectura de un recurso visual.
**Expected_Success:** 0.58

### Enunciado
¿Que titulo seria mas fiel a la infografia?

### Options
- [x] A) Viaje al colegio y descanso: una posible relacion. <!-- feedback: Correcto. Resume el contenido sin exagerar la causa. -->
- [ ] B) El transporte destruye por completo el sueño. <!-- feedback: Incorrecto. Es demasiado absoluto. -->
- [ ] C) Dormir mas depende solo de usar autobus. <!-- feedback: Incorrecto. La tabla no dice eso. -->
- [ ] D) Nadie duerme suficiente en Colombia. <!-- feedback: Incorrecto. La tabla no permite una generalizacion tan amplia. -->

### Explicacion Pedagogica
Un buen titulo sintetiza sin convertir la correlacion en certeza causal.

---

## Texto Base 2: Grafico de barras

**Uso de pantalla por edad**

| Edad | Horas promedio diarias |
|---|---:|
| 12-14 | 3.2 |
| 15-17 | 4.6 |
| 18-24 | 5.1 |
| 25-34 | 4.4 |

## Question 6 (D5)
**ID:** `CO-LEC-11-P3-medios-001-v6`
**Bloom:** Understand
**ICFES:** Lee el valor mas alto de una serie.
**Expected_Success:** 0.60

### Enunciado
¿Que grupo presenta el mayor uso de pantalla?

### Options
- [ ] A) 12-14. <!-- feedback: Incorrecto. Es el valor mas bajo del bloque inicial. -->
- [ ] B) 15-17. <!-- feedback: Incorrecto. Es alto, pero no el mayor. -->
- [x] C) 18-24. <!-- feedback: Correcto. Es el maximo de la tabla. -->
- [ ] D) 25-34. <!-- feedback: Incorrecto. Queda por debajo de 18-24. -->

### Explicacion Pedagogica
La lectura de maxima y minima es la base de la interpretacion grafica.

## Question 7 (D5)
**ID:** `CO-LEC-11-P3-medios-001-v7`
**Bloom:** Analyze
**ICFES:** Reconoce una tendencia interna.
**Expected_Success:** 0.57

### Enunciado
¿Cual tendencia se observa mejor entre 12-14 y 18-24?

### Options
- [ ] A) El uso disminuye siempre. <!-- feedback: Incorrecto. Aumenta entre esos tramos. -->
- [x] B) El uso aumenta con la edad en ese tramo. <!-- feedback: Correcto. La secuencia 3.2 -> 4.6 -> 5.1 lo muestra. -->
- [ ] C) El uso se mantiene igual. <!-- feedback: Incorrecto. Los valores cambian. -->
- [ ] D) No hay datos comparables. <!-- feedback: Incorrecto. Si los hay. -->

### Explicacion Pedagogica
La tendencia se deduce al comparar los valores sucesivos.

## Question 8 (D6)
**ID:** `CO-LEC-11-P3-medios-001-v8`
**Bloom:** Evaluate
**ICFES:** Reconoce el valor de una comparacion parcial.
**Expected_Success:** 0.54

### Enunciado
¿Que comparacion es correcta?

### Options
- [ ] A) 25-34 usa mas pantalla que 18-24. <!-- feedback: Incorrecto. 25-34 tiene 4.4 y 18-24 tiene 5.1. -->
- [x] B) 15-17 usa mas pantalla que 12-14. <!-- feedback: Correcto. 4.6 es mayor que 3.2. -->
- [ ] C) 12-14 usa mas pantalla que 18-24. <!-- feedback: Incorrecto. Es al reves. -->
- [ ] D) Todos los grupos tienen la misma cifra. <!-- feedback: Incorrecto. Son diferentes. -->

### Explicacion Pedagogica
La comparacion exige respetar el orden exacto de los valores.

## Question 9 (D6)
**ID:** `CO-LEC-11-P3-medios-001-v9`
**Bloom:** Analyze
**ICFES:** Interpreta una variacion no lineal.
**Expected_Success:** 0.52

### Enunciado
¿Que ocurre despues del grupo 18-24?

### Options
- [ ] A) El uso sigue subiendo. <!-- feedback: Incorrecto. Baja a 4.4 en 25-34. -->
- [x] B) El uso desciende. <!-- feedback: Correcto. La tabla muestra una caida. -->
- [ ] C) El uso se duplica. <!-- feedback: Incorrecto. No duplica. -->
- [ ] D) El dato desaparece. <!-- feedback: Incorrecto. El valor esta presente. -->

### Explicacion Pedagogica
La lectura atenta evita asumir una linea siempre ascendente.

## Question 10 (D6)
**ID:** `CO-LEC-11-P3-medios-001-v10`
**Bloom:** Evaluate
**ICFES:** Valora el mejor comentario sobre el grafico.
**Expected_Success:** 0.50

### Enunciado
¿Que comentario seria mas exacto?

### Options
- [ ] A) El uso de pantalla es igual en todas las edades. <!-- feedback: Incorrecto. No lo es. -->
- [x] B) El uso cambia por edad y alcanza su pico en 18-24. <!-- feedback: Correcto. Describe la tendencia central. -->
- [ ] C) Los adolescentes no usan pantallas. <!-- feedback: Incorrecto. Si las usan. -->
- [ ] D) El grupo mayor siempre usa mas que el joven. <!-- feedback: Incorrecto. La tabla no lo muestra. -->

### Explicacion Pedagogica
La mejor lectura describe tendencia y maximo sin sobregeneralizar.

---

## Texto Base 3: Titular y nota periodistica

**Titular:** *Vecinos exigen mas arboles tras la ola de calor*

**Subtitulo:** *Un informe local vincula el aumento de temperatura con la reduccion de sombra en tres barrios.*

**Cuerpo:**
*La alcaldia presento un resumen con datos de temperatura superficial. El documento no dice que los arboles sean la unica causa del calor, pero si advierte que la falta de cobertura vegetal agrava la sensacion termica en zonas densamente construidas.*

## Question 11 (D7)
**ID:** `CO-LEC-11-P3-medios-001-v11`
**Bloom:** Analyze
**ICFES:** Reconoce el efecto del titular.
**Expected_Success:** 0.48

### Enunciado
¿Que hace el titular "Vecinos exigen mas arboles tras la ola de calor"?

### Options
- [ ] A) Presenta una descripcion neutra sin posicion. <!-- feedback: Incorrecto. Tiene carga valorativa. -->
- [x] B) Enmarca el tema desde una demanda ciudadana. <!-- feedback: Correcto. El titular pone el foco en la exigencia vecinal. -->
- [ ] C) Niega que exista calor. <!-- feedback: Incorrecto. Lo asume. -->
- [ ] D) Cambia el tema a transporte publico. <!-- feedback: Incorrecto. Se mantiene en clima y arbolado. -->

### Explicacion Pedagogica
El titular orienta la lectura antes de entrar al cuerpo de la nota.

## Question 12 (D7)
**ID:** `CO-LEC-11-P3-medios-001-v12`
**Bloom:** Analyze
**ICFES:** Identifica el alcance de una afirmacion periodistica.
**Expected_Success:** 0.46

### Enunciado
La frase "el documento no dice que los arboles sean la unica causa del calor" cumple la funcion de:

### Options
- [ ] A) Exagerar la responsabilidad de los arboles. <!-- feedback: Incorrecto. La frase hace lo opuesto. -->
- [x] B) Limitar la conclusion para evitar una causalidad absoluta. <!-- feedback: Correcto. El texto pone un freno a la interpretacion. -->
- [ ] C) Ocultar la existencia del informe. <!-- feedback: Incorrecto. Lo cita abiertamente. -->
- [ ] D) Confirmar que no hay ningun problema ambiental. <!-- feedback: Incorrecto. Si hay problema. -->

### Explicacion Pedagogica
La nota periodistica separa correlacion, causa parcial y causa unica.

## Question 13 (D7)
**ID:** `CO-LEC-11-P3-medios-001-v13`
**Bloom:** Evaluate
**ICFES:** Reconoce una lectura prudente del informe.
**Expected_Success:** 0.44

### Enunciado
¿Cual conclusion es mas prudente segun el texto?

### Options
- [ ] A) Los arboles causan por si solos toda la ola de calor. <!-- feedback: Incorrecto. El texto lo niega. -->
- [x] B) La falta de cobertura vegetal puede agravar el calor en zonas construidas. <!-- feedback: Correcto. Esa es la conclusion permitida por la nota. -->
- [ ] C) El calor no tiene relacion con la ciudad. <!-- feedback: Incorrecto. La relacion si aparece. -->
- [ ] D) El informe elimina la necesidad de mediciones. <!-- feedback: Incorrecto. Las mediciones son la base. -->

### Explicacion Pedagogica
La conclusion correcta respeta los limites del documento citado.

## Question 14 (D8)
**ID:** `CO-LEC-11-P3-medios-001-v14`
**Bloom:** Analyze
**ICFES:** Reconoce una carga valorativa.
**Expected_Success:** 0.42

### Enunciado
¿Que efecto produce la expresion "ola de calor" en el titular?

### Options
- [ ] A) Neutraliza por completo el problema. <!-- feedback: Incorrecto. Lo vuelve mas urgente. -->
- [x] B) Intensifica la sensacion de urgencia y magnitud. <!-- feedback: Correcto. La expresion dramatiza el evento. -->
- [ ] C) Cambia el tema a un deporte. <!-- feedback: Incorrecto. No cambia el tema. -->
- [ ] D) Elimina la necesidad de datos. <!-- feedback: Incorrecto. Los datos siguen siendo necesarios. -->

### Explicacion Pedagogica
La palabra elegida en el titular ya orienta la interpretacion emocional.

## Question 15 (D8)
**ID:** `CO-LEC-11-P3-medios-001-v15`
**Bloom:** Evaluate
**ICFES:** Valora la relacion entre titular y cuerpo.
**Expected_Success:** 0.40

### Enunciado
¿Que relacion hay entre el titular y el cuerpo de la nota?

### Options
- [ ] A) El titular contradice totalmente el cuerpo. <!-- feedback: Incorrecto. Lo resume desde una postura. -->
- [x] B) El titular adelanta una demanda y el cuerpo la matiza con datos. <!-- feedback: Correcto. Esa es la secuencia comunicativa. -->
- [ ] C) El cuerpo ignora el tema del calor. <!-- feedback: Incorrecto. Lo desarrolla. -->
- [ ] D) El titular presenta una tabla numerica completa. <!-- feedback: Incorrecto. No lo hace. -->

### Explicacion Pedagogica
En medios, titular y cuerpo suelen repartirse funcion y profundidad.

---

## Texto Base 4: Publicacion en red social

*Imagen: grafico de barras sobre lectura digital en jovenes.
Texto del post: "La generacion actual ya no lee libros, solo mira pantallas."
Comentario 1: "Eso es verdad porque lo vi en mi curso."
Comentario 2: "La grafica solo mide tiempo de pantalla, no lectura completa."
Comentario 3: "Si todos mis amigos lo creen, entonces es cierto."*

## Question 16 (D9)
**ID:** `CO-LEC-11-P3-medios-001-v16`
**Bloom:** Analyze
**ICFES:** Reconoce la debilidad de una afirmacion.
**Expected_Success:** 0.38

### Enunciado
¿Que problema tiene la afirmacion del post?

### Options
- [ ] A) Usa un grafico demasiado largo. <!-- feedback: Incorrecto. Ese no es el problema central. -->
- [x] B) Generaliza demasiado a partir de un dato limitado. <!-- feedback: Correcto. El post convierte una observacion parcial en una verdad total. -->
- [ ] C) No tiene ninguna opinion. <!-- feedback: Incorrecto. Si tiene opinion. -->
- [ ] D) Cita demasiadas fuentes oficiales. <!-- feedback: Incorrecto. No cita fuentes oficiales. -->

### Explicacion Pedagogica
La crítica se centra en el salto injustificado de un dato a una conclusion total.

## Question 17 (D9)
**ID:** `CO-LEC-11-P3-medios-001-v17`
**Bloom:** Evaluate
**ICFES:** Identifica la respuesta mas valida frente a un comentario.
**Expected_Success:** 0.36

### Enunciado
¿Cual comentario es mas solido como respuesta?

### Options
- [ ] A) "Si todos lo creen, ya basta." <!-- feedback: Incorrecto. Eso es una apelacion a la mayoria. -->
- [x] B) "La grafica debe leerse antes de sacar una conclusion total." <!-- feedback: Correcto. Reclama lectura de evidencia. -->
- [ ] C) "Yo tambien lo siento, asi que es verdad." <!-- feedback: Incorrecto. Es anecdota, no evidencia. -->
- [ ] D) "No importa lo que diga la imagen." <!-- feedback: Incorrecto. Si importa. -->

### Explicacion Pedagogica
La respuesta valida recupera el dato y evita el sesgo del grupo.

## Question 18 (D9)
**ID:** `CO-LEC-11-P3-medios-001-v18`
**Bloom:** Analyze
**ICFES:** Reconoce una falacia frecuente.
**Expected_Success:** 0.35

### Enunciado
En el comentario "Si todos mis amigos lo creen, entonces es cierto" aparece principalmente:

### Options
- [ ] A) Una definicion. <!-- feedback: Incorrecto. No define nada. -->
- [x] B) Una apelacion a la mayoria. <!-- feedback: Correcto. La verdad se justifica por cantidad de apoyo. -->
- [ ] C) Una analogia. <!-- feedback: Incorrecto. No compara dos cosas. -->
- [ ] D) Una cita textual. <!-- feedback: Incorrecto. No cita una fuente. -->

### Explicacion Pedagogica
La validez de una idea no depende de cuantas personas la repitan.

## Question 19 (D10)
**ID:** `CO-LEC-11-P3-medios-001-v19`
**Bloom:** Evaluate
**ICFES:** Valora la conclusion mas responsable.
**Expected_Success:** 0.34

### Enunciado
¿Que conclusion seria mas responsable sobre la lectura digital?

### Options
- [ ] A) Nadie lee nada en pantallas. <!-- feedback: Incorrecto. La afirmacion es absoluta. -->
- [x] B) El uso de pantallas no permite concluir por si solo que una generacion no lea libros. <!-- feedback: Correcto. El dato no alcanza para esa conclusion total. -->
- [ ] C) Leer en pantalla es siempre peor que leer en papel. <!-- feedback: Incorrecto. No se demuestra eso. -->
- [ ] D) Los grafios de barras no sirven nunca. <!-- feedback: Incorrecto. Si sirven. -->

### Explicacion Pedagogica
La mejor conclusion respeta el alcance real de la evidencia disponible.

## Question 20 (D10)
**ID:** `CO-LEC-11-P3-medios-001-v20`
**Bloom:** Evaluate
**ICFES:** Reconoce la relacion entre imagen y texto en redes.
**Expected_Success:** 0.32

### Enunciado
¿Que lectura integra mejor imagen, texto y comentarios?

### Options
- [x] A) La publicacion mezcla un dato parcial con una afirmacion total que necesita verificacion. <!-- feedback: Correcto. Integra grafico, post y respuestas. -->
- [ ] B) La publicacion demuestra una verdad indiscutible. <!-- feedback: Incorrecto. No la demuestra. -->
- [ ] C) La imagen impide cualquier debate. <!-- feedback: Incorrecto. El debate si existe. -->
- [ ] D) Los comentarios eliminan la necesidad de revisar datos. <!-- feedback: Incorrecto. Hacen mas urgente la revision. -->

### Explicacion Pedagogica
La lectura multimodal debe separar dato, opinion y verificacion.
