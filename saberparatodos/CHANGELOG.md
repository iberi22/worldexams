# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.13.1] - 2026-04-15

### Lineamientos M.E.N. Colombia y referencias verificadas

#### Changed
- Se agregaron enlaces verificados a DBA, lineamientos curriculares, blogs oficiales, cuentas institucionales y PDFs de consulta.
- Se reordeno la tarjeta para priorizar el modo de examen y se reemplazo el texto de ayuda por un icono `?`.
- Se agrego la bandera amarilla para reportar una anomalía con tooltip contextual.

#### Fixed
- `Simulacro Completo` ahora muestra un resumen global cuando no existe un DBA especifico para esa combinacion.

## [0.13.0] - Unreleased

### Transicion de Escala de Calificacion y UX (Alineacion ICFES)

#### Changed
- **Puntaje Unificado (0-500)**: Se rediseno el sistema ELO interno (anteriormente denominado "MMR") para que opere nativamente bajo la escala `0-500` del ICFES. El puntaje base de inicio ahora es `250` (anteriormente `1000`).
- **Rangos Revisados**: Los niveles del usuario (Iniciado a Gran Maestro) se ajustaron a los nuevos limites. Ahora se reflejan colores/feedback visual acordes desde `0` hasta `500+`.
- **Eliminacion de *Doble Calificacion***: La interfaz de usuario (`ScoreDisplay.svelte` y `LocalReportsView.svelte`) ya no destaca masivamente los "Puntos de Practica". Se renombraron a "Desempeno de Sesion" siendo el **Estimado ICFES** el unico gran protagonista en la UI para evitar confusiones.
- **Sistema de Inteligencias (Prompting Adaptativo)**: Se ajustaron todos los *prompts* que alimentan ChatGPT y NotebookLM (`notebooklm-source.json.ts`, `prompt-service.ts`) para que el coach de la IA comprenda que el usuario esta siendo calificado del 0 al 500 y no provea feedback basado en un sistema `0-3000`.
- **Sensibilidad del K-Factor y Momentum**: Se modifico la sensibilidad de los algoritmos de deteccion de arquetipos (estudiantes "en ascenso", "en regresion") para acomodarse a deltas puntuales de la escala 0-500, garantizando que el sistema los ubique correctamente de acuerdo a su historial de intentos y consistencia.

#### Fixed
- Modificaciones en pruebas unitarias de `mmr-system.ts`, `scoring.ts` y `prompt-service.ts` para que afirmen correctamente sobre los nuevos valores limites, evitando falsos positivos de regresion en E2E y flujos CI.
