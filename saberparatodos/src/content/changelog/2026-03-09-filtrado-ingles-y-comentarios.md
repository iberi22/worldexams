---
title: "Filtrado Inteligente de Inglés y Sistema de Comentarios Forum-Type"
date: "2026-03-09"
author: "Antigravity AI"
description: "Implementación de filtrado dinámico por nivel CEFR para Inglés y nuevo sistema de hilos de comentarios en el Changelog."
tags: ["Inglés", "UI/UX", "Supabase", "Svelte 5"]
---

# Mejoras en la Experiencia de Inglés y Comunidad

Esta actualización se centra en dos pilares fundamentales: la personalización del aprendizaje de Inglés y la interacción de la comunidad.

## 🎯 Filtrado Adaptativo de Inglés

Hemos refinado el motor de selección de preguntas de Inglés para asegurar que el contenido sea siempre relevante para tu nivel actual:

- **Nivel B1+ o superior:** Ahora el sistema prioriza exclusivamente preguntas del **Protocolo 4 (PRO-v4)** y restringe el pool a Grados 9, 10 y 11. Esto garantiza contenido de alta calidad y dificultad acorde a usuarios avanzados.
- **Niveles iniciales (A1-A2):** Se ha ampliado el pool para incluir grados inferiores (3-8), permitiendo una progresión más suave. Además, para los grados 10 y 11, el sistema filtrará automáticamente para mostrar solo preguntas fáciles, evitando la frustración en niveles tempranos.

## 💬 Nuevo Sistema de Comentarios "Forum-Type"

El Changelog ahora es más interactivo. Hemos implementado un sistema de comentarios con soporte para **hilos de conversación (respuestas)**:

- **Hilos de Conversación:** Ahora puedes responder directamente a un comentario, creando una estructura de foro.
- **Realtime Updates:** Gracias a Supabase Realtime, verás las respuestas nuevas al instante sin necesidad de recargar la página.
- **Diseño Glassmorphism:** Una interfaz limpia, moderna y responsiva que facilita la lectura de largas discusiones.

---

*¿Tienes dudas sobre los nuevos protocolos de Inglés? ¡Cuéntanos en los comentarios abajo!*
