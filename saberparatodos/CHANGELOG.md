# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.13.0] - Unreleased

### Transición de Escala de Calificación y UX (Alineación ICFES)

#### Changed
- **Puntaje Unificado (0-500)**: Se rediseñó el sistema ELO interno (anteriormente denominado "MMR") para que opere nativamente bajo la escala `0-500` del ICFES. El puntaje base de inicio ahora es `250` (anteriormente `1000`).
- **Rangos Revisados**: Los niveles del usuario (Iniciado a Gran Maestro) se ajustaron a los nuevos límites. Ahora se reflejan colores/feedback visual acordes desde `0` hasta `500+`.
- **Eliminación de *Doble Calificación***: La interfaz de usuario (`ScoreDisplay.svelte` y `LocalReportsView.svelte`) ya no destaca masivamente los "Puntos de Práctica". Se renombraron a "Desempeño de Sesión" siendo el **Estimado ICFES** el único gran protagonista en la UI para evitar confusiones.
- **Sistema de Inteligencias (Prompting Adaptativo)**: Se ajustaron todos los *prompts* que alimentan ChatGPT y NotebookLM (`notebooklm-source.json.ts`, `prompt-service.ts`) para que el coach de la IA comprenda que el usuario está siendo calificado del 0 al 500 y no provea feedback basado en un sistema `0-3000`.
- **Sensibilidad del K-Factor y Momentum**: Se modificó la sensibilidad de los algoritmos de detección de arquetipos (estudiantes "en ascenso", "en regresión") para acomodarse a deltas puntuales de la escala 0-500, garantizando que el sistema los ubique correctamente de acuerdo a su historial de intentos y consistencia.

#### Fixed
- Modificaciones en pruebas unitarias de `mmr-system.ts`, `scoring.ts` y `prompt-service.ts` para que afirmen correctamente sobre los nuevos valores limítrofes, evitando falsos positivos de regresión en E2E y flujos CI.
