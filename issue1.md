## Problema
Actualmente, las preguntas que comparten un pasaje de lectura (ej. Partes de Inglés) no se vinculan lógicamente con su texto en el Parser. Si el texto no está duplicado manualmente dentro de un bloque `### Contexto` para cada pregunta, el JSON se genera sin el texto.

## Tareas para Jules
1. Modificar el parser (`saberparatodos/src/utils/questionParser.ts`) para que capture textos compartidos bajo cabeceras como `## PART X` (o una nueva directiva estándar como `### Shared Context`) y lo inyecte automáticamente en la propiedad `context` de las preguntas hijas.
2. **Auditoría:** Revisar los bundles existentes para garantizar que la nueva lógica del parser no rompa preguntas.
3. **Protocolos:** Actualizar `docs/ENGLISH_LEARNING_PROTOCOL.md`, `docs/QUESTION_GENERATION_PROTOCOL_V4.md` y cualquier otro protocolo relevante para definir la estructura obligatoria de los textos compartidos.
