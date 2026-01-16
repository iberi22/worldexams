# Plan de Mejoras: Speed Challenge (antes Stop Game)

## 1. Renaming y Rebranding
- [ ] Cambiar "Stop Mode" a "Speed Challenge" en la UI (`App.svelte`, `PartyApp.svelte`, `StopModeSetup.svelte`).
- [ ] Actualizar descripciones para reflejar el enfoque en velocidad.

## 2. Gamificación de Puntuación
- [ ] Implementar cálculo de puntaje basado en velocidad.
- [ ] Fórmula: `Puntaje = (EsCorrecta ? 1000 : 0) * (1 + (TiempoRestante / TiempoTotal))`.
- [ ] Actualizar `PartyState` para acumular puntajes.

## 3. Mecánica de "Muerte Súbita" / Auto-avance
- [ ] En `PartyState`, detectar cuando todos los jugadores activos han respondido.
- [ ] Si todos respondieron:
    - [ ] Cancelar timer actual.
    - [ ] Esperar 2 segundos (feedback).
    - [ ] Avanzar a siguiente pregunta automáticamente.

## 4. Feedback Visual
- [ ] Mejorar la barra de tiempo en `PlayerView.svelte`.
- [ ] Color progresivo: Verde (>50%) -> Amarillo (>25%) -> Rojo (<25%).
- [ ] Animación de palpitación en los últimos 5 segundos.
