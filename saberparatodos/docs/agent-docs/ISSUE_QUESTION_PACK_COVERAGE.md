# Issue Draft: Missing Question Pack Coverage and Repeat-Question Validation

## Context

El sistema de repetición de preguntas está implementado en el cliente de `saberparatodos` a través de `src/lib/question-memory.ts`, que guarda preguntas contestadas en localStorage y evita repetirlas siempre que el pool de preguntas contenga nuevas preguntas.

Sin embargo, la disponibilidad de preguntas depende de dos rutas distintas:

- `saberparatodos/src/pages/api/questions.ts` para la API pública/proxy
- `saberparatodos/public/api/packs/` para packs estáticos locales

Actualmente solo hay cobertura de packs estáticos limitada, y la rama especial de grado 11/Icfes usa un banco local diferente.

## Hallazgos

### Cobertura actual de packs estáticos locales

- `grade 11`: cobertura completa para los siguientes subjects
  - `ciencias_naturales`
  - `ingles`
  - `lectura_critica`
  - `matematicas`
  - `sociales_ciudadanas`
- `grade 3`: solo `lectura_critica`
- `grade 4`: solo `ingles`
- `grade 5`: solo `ingles`
- `grade 6`: solo `ingles`
- `grade 7`: solo `ingles`
- `grade 8`: solo `ingles`

### Faltantes críticos frente a `getAvailableSubjects()`

El cliente ofrece estos subjects para cada grado, pero no existen packs locales para muchos de ellos:

- `grade 3`: faltan `matematicas`, `ciencias_naturales`, `sociales_y_ciudadanas`
- `grade 4`: faltan `matematicas`, `lectura_critica`, `ciencias_naturales`, `sociales_y_ciudadanas`, `lenguaje`
- `grade 5`: faltan `matematicas`, `lectura_critica`, `ciencias_naturales`, `sociales_y_ciudadanas`, `lenguaje`
- `grade 6`: faltan `matematicas`, `lectura_critica`, `ciencias_naturales`, `sociales_y_ciudadanas`, `lenguaje`
- `grade 7`: faltan `matematicas`, `lectura_critica`, `ciencias_naturales`, `sociales_y_ciudadanas`
- `grade 8`: faltan `matematicas`, `lectura_critica`, `ciencias_naturales`, `sociales_y_ciudadanas`, `lenguaje`
- `grade 9`: faltan todos los subjects listados (`matematicas`, `lectura_critica`, `ingles`, `ciencias_naturales`, `sociales_y_ciudadanas`)
- `grade 10`: faltan todos los subjects listados (`matematicas`, `lectura_critica`, `ingles`, `ciencias_naturales`, `sociales_y_ciudadanas`)

### Observaciones sobre los tipos de examen

- El proxy de `src/pages/api/questions.ts` solo aplica la ruta local de `getLocalGrade11Questions()` para `country=co` y `exam=icfes`.
- Esto implica que, aunque grado 11 tenga un banco local, otros tipos de examen o países no están cubiertos por esa lógica especial.

## Problema principal

La lógica de anti-repetición está técnicamente levantada, pero su eficacia depende de que el pool de preguntas sea real y suficiente.

Con los packs locales actuales, la experiencia de muchos grados/materias puede no tener preguntas disponibles, lo que genera:

- `No new questions` para usuarios de grados 4-10 en materias no cubiertas
- Posible dependencia de fallback remoto para preguntas donde no hay packs locales
- Riesgo de que el examen ofrezca menos preguntas de las esperadas o repita demasiado pronto

## Recomendaciones de implementación

1. Auditar y generar packs estáticos faltantes para la ruta de preguntas:
   - todos los subjects faltantes para grados 3-10
   - especialmente los grados 9 y 10, que hoy no tienen packs locales
2. Validar que la ruta de repetición de preguntas usa el pool correcto en:
   - `saberparatodos/src/lib/question-memory.ts`
   - `saberparatodos/src/lib/api-service.ts`
   - `saberparatodos/src/pages/api/questions.ts`
3. Añadir pruebas o verificaciones de integración para:
   - comportamiento de `filterUnansweredQuestions()` con IDs contestados
   - fallback adecuado cuando el pool se agota y debe repetir preguntas
   - coincidencia entre `getAvailableSubjects()` y los subjects realmente servidos
4. Revisar si el especial grado 11/Icfes debe ampliarse a otros `exam` values y exam types.

## Archivos clave

- `saberparatodos/src/lib/question-memory.ts`
- `saberparatodos/src/lib/api-service.ts`
- `saberparatodos/src/pages/api/questions.ts`
- `saberparatodos/public/api/packs/`

## Objetivo del issue

Que otro agente revise la implementación actual, complete la cobertura de packs faltantes y asegure que el sistema de preguntas repetidas funciona de forma confiable para todos los grados y tipos de examen soportados.

---
*Este issue fue generado automáticamente por Antigravity a petición del usuario. Copiar y pegar en GitHub.*
