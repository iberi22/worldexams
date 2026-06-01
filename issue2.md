## Problema
Cuando una pregunta tiene un texto largo de lectura (propiedad `context`), actualmente se renderiza apilado sobre las opciones, forzando un scroll vertical excesivo.

## Tareas para Jules
1. Modificar `PlayerView.svelte` o los componentes de renderizado de preguntas en `saberparatodos/src/modules/exam-room/`.
2. Implementar lógica condicional: Si `question.context` existe, adaptar el layout general.
3. **Desktop:** Implementar un diseño *Split-Pane* (Pantalla dividida). Izquierda (50%) con el texto de lectura y su propio scroll independiente. Derecha (50%) con la pregunta y las opciones de respuesta.
4. **Mobile:** Implementar un diseño responsive donde el texto de lectura se aloje dentro de un *Bottom Sheet* (panel deslizable desde abajo), un modal o un panel colapsable accesible mediante un botón sticky (ej. '📖 Ver Texto'). El usuario debe poder cerrarlo para responder cómodamente en la pantalla pequeña.
