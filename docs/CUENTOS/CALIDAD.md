# Bar de calidad — Cuentos (objetivo: nivel StoryComet)

Decisión BELA 2026-09-10: iterar con Jules hasta igualar la calidad del
referente. Este documento define qué significa "igualar" de forma
verificable. Ningún cuento se da por terminado sin pasar este checklist.

## 1. Checklist por cuento (10/10 obligatorio)

- [ ] Texto: 8-10 páginas, 30-80 palabras, 1 idea/página, español neutro
  (validador 0 errores + veto 0).
- [ ] Quiz: 3 preguntas que un niño de la edad puede responder solo con
  el cuento (un adulto revisa las 30).
- [ ] Arte: 2-4 personajes + escenas, puro SVG, <25 KB personaje,
  reconocible a 48 px, QA con visión PASS.
- [ ] Lector: read-aloud sincronizado palabra por palabra, autoplay,
  velocidad, fallback manual sin romper.
- [ ] Hotspots: 2-3 zonas táctiles por escena con reacción visible.
- [ ] E2E: PASS desktop + móvil, 0 errores de consola, capturas
  adjuntas al PR (regla visual BELA).
- [ ] Accesibilidad: alt en cada escena, reduced-motion con pose final,
  contraste de texto, tipografía mínima 1.35 rem.
- [ ] Privado: noindex, fuera del sitemap, sin enlaces en nav.

## 2. Bucle de mejora con Jules (protocolo)

1. Tras cada ola de contenido, Hermes revisa con visión las capturas de
   los PRs y abre issues de pulido (`[Polish C3.0X] ...`) con el defecto
   exacto + captura de referencia.
2. Pulido en micro-issues de 1 archivo (rápido, sin conflictos).
3. Máximo 3 rondas de pulido por cuento; si un cuento no pasa en 3,
   se reasigna a redacción/ilustración manual local y se registra en
   INFORME_CIERRE.md.
4. Cierre: C5.04 audita 10/10 + informe + qué falta (sin evidencia no
   hay entrega).

## 3. Comparativa honesta vs StoryComet (qué igualamos, qué no)

- Igualamos: read-aloud con resaltado, escenas tocables, quizzes,
  perfiles + progreso + pins, cambio de idioma (fase futura), SEO
  técnico de páginas (aunque no-listadas).
- No igualamos a propósito: 3D Three.js (costo/peso), TTS pago
  (usamos voces del navegador, gratis), paywall (somos 100% gratis).
- Diferencia propia: español neutro multi-país, dilemas éticos y
  oficios reales 2026, contenido protegido con lectura gratuita.
