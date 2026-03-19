---
name: colombia-assessment-protocol-v6
description: Usar cuando se deban crear, corregir, regenerar o auditar bundles manuales de preguntas de Colombia para grados 3 a 11, alineados al MEN y al ICFES, con reglas duras contra word salad, distractores absurdos, contexto decorativo y desalineación curricular.
---

# Skill: Colombia Assessment Protocol v6

Este skill sirve para dos trabajos:

- creación manual de bundles nuevos;
- revisión, saneamiento o regeneración de bundles existentes.

## Autoridad y alcance

Respetar siempre esta jerarquía:

- `AGENTS.md`
- `docs/specs/ACTIVE_PROTOCOLS.md`
- `docs/QUESTION_GENERATION_PROTOCOL_V5.md`
- `.gitcore/ARCHITECTURE.md` si aplica

Interpretación operativa:

- `v6` es la guía local de trabajo manual.
- `v5.1` sigue siendo el baseline estructural y de validación activa del repo para bundles `MASTERY` donde aplique.
- Si una instrucción local contradice la capa raíz, gana la capa raíz.

Este skill aplica a contenido Colombia para grados `3` a `11`.

## Objetivo

Producir preguntas que:

- estén alineadas a la malla curricular del MEN y al estilo de evaluación ICFES;
- sean claras, medibles y psicométricamente defensables;
- usen distractores plausibles basados en errores reales;
- puedan auditarse y regenerarse sin ambigüedad;
- mantengan formato estable para los scripts del repo.

## Principio rector

Cada pregunta debe poder responder estas seis preguntas antes de aceptarse:

1. ¿Qué competencia específica evalúa?
2. ¿Qué evidencia observable espera ver?
3. ¿Qué error plausible captura cada distractor?
4. ¿El contexto ayuda a resolver o solo adorna?
5. ¿El lenguaje corresponde al grado?
6. ¿La respuesta correcta sigue siendo única bajo una lectura razonable?

Si alguna respuesta no está clara, la pregunta no está lista.

## Marco metodológico obligatorio

Todo bundle debe construirse o revisarse con esta cadena:

1. **Grado y periodo**
2. **Referente MEN**
3. **Competencia ICFES**
4. **Afirmación**
5. **Evidencia**
6. **Tema**
7. **Pregunta**

No se escribe primero la pregunta y luego se “acomoda” el currículo.

## Fase 0: Descubrimiento obligatorio

Antes de generar o corregir:

1. Identificar país, grado, asignatura, periodo y tema.
2. Confirmar la ruta real del bundle.
3. Revisar si el archivo ya existe y si está sano, parcialmente dañado o contaminado.
4. Validar el protocolo activo del repo para esa familia de bundles.
5. Revisar el estándar MEN o DBA pertinente.
6. Revisar el marco de referencia ICFES del área.

## Mapeo curricular obligatorio

Antes de redactar, fijar explícitamente:

- `grado`
- `periodo`
- `asignatura`
- `tema`
- `referente_men`
- `competencia_icfes`
- `afirmacion_icfes`
- `evidencia`

Si el agente no puede nombrar esos campos de forma concreta, no debe generar todavía.

## Estructura de archivo

Usar la ruta activa del repo. Para bundles `MASTERY` de Colombia grado 11, la forma esperada es:

`questions_data/colombia/[asignatura]/grado-11/periodo-[N]/[tema]/[ID]-MASTERY-bundle.md`

Para otros grados, seguir la estructura activa existente del repo y no inventar rutas nuevas sin evidencia local.

## Frontmatter base

Cuando el bundle sea `MASTERY`, usar como baseline:

```yaml
---
id: "CO-[AREA]-[GRADO]-P[PERIODO]-[TOPIC]-[001]-MASTERY"
country: "colombia"
grado: [3-11]
asignatura: "[subject-kebab-case]"
tema: "[topic-kebab-case]"
periodo: [1-4]
protocol_version: "5.1"
bundle_index: [1-3]
bundle_size: 20
alignment: "ICFES Saber 11 + MEN"
competencia_icfes: "[Nombre de la competencia]"
afirmacion_icfes: "[Afirmación a evaluar]"
referente_men: "[DBA o estándar]"
target_cefr: "A1-B1"
modern_context: true
distractor_profile: "misconception_based"
calibration:
  expected_success_rate: 0.45
  discrimination_index_target: ">= 0.22"
  simulated_responses: 100
rubric_baseline: "campo_1, campo_2, campo_3"
---
```

Notas:

- `target_cefr` solo aplica a inglés.
- Si la familia del bundle usa otra metadata activa del repo, respetarla.
- El skill sigue siendo `v6`, aunque el `protocol_version` del bundle use el baseline activo del repo.

## Formato mínimo por pregunta

Cada pregunta debe incluir, como mínimo:

- `ID`
- `Bloom`
- `ICFES`
- `Expected_Success`
- `Contexto` cuando realmente aporte
- `Enunciado`
- 4 opciones
- una sola respuesta correcta
- comentario `<!-- feedback: ... -->` por opción
- `Explicación Pedagógica`

## Distribución de dificultad

Para bundles de 20 preguntas:

- `v1-v4`: dificultad 3-4
- `v5-v10`: dificultad 5-6
- `v11-v16`: dificultad 7-8
- `v17-v20`: dificultad 9-10

Objetivo por tramo:

- inicio: reconocimiento, lectura literal, aplicación directa;
- medio: traducción entre representaciones, inferencia, procedimiento;
- alto: razonamiento de varios pasos, integración de evidencia;
- cierre: evaluación, transferencia, dominio del tema.

## Reglas duras de redacción

- El enunciado debe formular una sola tarea cognitiva principal.
- La pregunta debe entenderse sin releer tres veces.
- El contexto debe ser útil y suficiente.
- Las opciones deben ser homogéneas en categoría y registro.
- La correcta no debe “brillar” por precisión o estilo.
- La explicación debe enseñar el error, no adornar la respuesta.

## Prohibiciones absolutas

Marcar como `[FALLA CRÍTICA]` y reescribir de inmediato si aparece cualquiera de estas:

- word salad
- pseudo-tecnicismo
- jerga grandilocuente o burocrática sin función evaluativa
- palabras repetidas artificialmente
- distractores absurdos, chistosos o decorativos
- “todas las anteriores”, “ninguna de las anteriores”, “A y B”
- contexto morboso, sensacionalista o violento sin necesidad pedagógica clara
- explicación barroca, insultante o teatral
- opción correcta única por claridad gramatical
- contexto que puede borrarse sin afectar la resolución

## Heurísticas de rechazo inmediato

Rechazar el ítem si ocurre al menos una de estas:

- dos opciones dicen casi lo mismo;
- la correcta es la única técnicamente seria;
- el distractor no representa un error plausible;
- el vocabulario no corresponde al grado;
- el constructo evaluado no coincide con la competencia declarada;
- la clave correcta depende de interpretar una ambigüedad del texto;
- el agente no puede explicar por qué cada distractor es incorrecto.

## Ingeniería del distractor

Cada distractor debe mapearse a un error concreto. Usar solo estas familias:

- error procedimental;
- error conceptual;
- lectura parcial;
- sobregeneralización;
- confusión de categorías;
- confusión de registro o gramática en inglés.

No usar distractores “de relleno”.

### Plantilla mental de distractores

- `A`: error procedimental frecuente
- `B`: error conceptual
- `C`: clave correcta
- `D`: lectura incompleta, inferencia inválida o error visual

La distribución puede variar, pero cada opción debe tener justificación.

## Reglas por área

### Matemáticas

- Priorizar interpretación, modelación, formulación y argumentación.
- Evitar aritmética desnuda salvo grados bajos.
- Usar contexto solo si agrega estructura al problema.
- Distractores típicos: signo, operación equivocada, lectura incorrecta de gráfica, mal despeje, confusión entre representaciones.

### Lectura crítica / lenguaje

- Alternar texto continuo y discontinuo cuando aplique.
- Evaluar lectura literal, inferencial y crítica.
- Distractores típicos: sobregeneralización, información cierta pero no apoyada por el texto, tesis confundida con evidencia.

### Ciencias naturales

- Priorizar fenómenos, variables, hipótesis, experimentos e interpretación de resultados.
- Evitar definiciones memorizadas sin situación.
- Distractores típicos: correlación por causalidad, variable mal identificada, explicación pseudocientífica.

### Sociales y ciudadanas

- Priorizar pensamiento social, análisis de perspectivas y pensamiento sistémico.
- Evitar moralizar la respuesta.
- Distractores típicos: anacronismo, institución equivocada, simplificación utópica, confusión entre derechos, mecanismos y actores.

### Inglés

- Ajustar CEFR al grado.
- Mantener opciones en la misma parte del habla y mismo registro.
- En grado 11, parecerse a tareas Saber 11: avisos, diálogos, cloze, reading comprehension.
- Distractores típicos: falso amigo, tiempo verbal incorrecto, opción de registro equivocado, palabra de misma categoría pero sentido incompatible.

## Workflow de creación

1. Fijar grado, periodo, asignatura, tema y ruta.
2. Identificar referente MEN.
3. Identificar competencia, afirmación y evidencia ICFES.
4. Definir mapa de 20 preguntas con dificultad progresiva.
5. Definir misconception map por pregunta antes de redactar opciones.
6. Redactar enunciados claros.
7. Redactar distractores homogéneos y plausibles.
8. Redactar feedback corto por opción.
9. Redactar explicación pedagógica breve.
10. Hacer revisión psicométrica interna.
11. Correr validadores del repo.

## Workflow de revisión y auditoría

Aplicar esta secuencia en cada bundle existente:

1. **Alineación curricular**
   - ¿El tema sí corresponde al grado y periodo?
   - ¿La pregunta sí evalúa el referente MEN y la competencia ICFES declarada?

2. **Validez del constructo**
   - ¿La tarea evaluada coincide con lo que el ítem dice medir?
   - ¿El contexto ayuda a resolver?

3. **Revisión técnica**
   - una sola correcta;
   - cuatro opciones;
   - homogeneidad;
   - sin solapamientos;
   - sin pistas gramaticales;
   - sin distractores absurdos.

4. **Revisión de claridad**
   - lenguaje adecuado al grado;
   - sin word salad;
   - sin inflación léxica;
   - sin teatralidad.

5. **Decisión**
   - `aceptar`;
   - `corregir pregunta puntual`;
   - `regenerar bundle completo`.

## Política de regeneración

Regenerar el bundle completo si ocurre cualquiera de estas:

- 2 o más preguntas con contaminación estilística;
- 2 o más preguntas con clave ambigua o no única;
- patrón sistemático de distractores absurdos;
- desalineación curricular amplia;
- estructura del bundle inconsistente o incompleta.

Preservar `bundle id` y `question ids` cuando el tema y el propósito del bundle no cambien.

## Checklist de aceptación de pregunta

- competencia definida
- evidencia definida
- alineación MEN definida
- enunciado claro
- contexto útil
- 4 opciones homogéneas
- 1 sola correcta
- distractores plausibles
- feedback útil
- explicación pedagógica breve
- sin word salad
- sin contexto impropio

## Checklist de aceptación de bundle

- ruta correcta
- frontmatter válido
- IDs únicos
- progresión de dificultad coherente
- todas las preguntas auditadas
- sin flags críticas
- listo para validación automática

## Validación final

Ejecutar siempre:

```bash
node saberparatodos/scripts/validate_content.js --scope=colombia --grade=[N]
node saberparatodos/scripts/audit_question_quality.js --scope=colombia --grade-min=[N] --grade-max=[N]
```

Si el bundle falla el auditor por causas críticas, no se entrega como terminado.

## Instrucciones de comportamiento para el agente

- Actuar como psicómetra y revisor curricular MEN/ICFES.
- No improvisar temas fuera de la malla activa.
- No inventar contextos colombianos falsos.
- No priorizar “sonar sofisticado” sobre medir bien.
- Si falta grado, periodo, asignatura o tema, primero resolver ese hueco con evidencia del repo o con una pregunta breve al usuario.
- En revisión, explicar qué regla violaba cada pregunta defectuosa.
- Si el contenido existente está contaminado, no maquillarlo: corregirlo o regenerarlo.
