# Plan de olas — Cuentos (Jules, serie C1-C5)

26 issues, 5 olas de máximo 6. Bodies canónicos en inglés en
`.hermes/ola-cuentos-cN/body-XX.md`, espejo en
`.gitcore/issues/cuentos-cN/issue-XX-<slug>.md`.

Protocolo de dispatch (platino): crear SIN label jules → verificar islas
+ releer → recién entonces label jules en un solo loop. `features.json`
NO se toca dentro de issues (reconciliación al final de cada ola).

Restricciones duras (en todos los bodies): BR-03 (cero tokens $SWAL,
cero karma, cero telemetría en flujos de niños), español neutro
(02_COPYRIGHT_Y_FORMATO.md §2), headers de copyright (§1), Astro sin
sintaxis JSX/Svelte en .astro, Svelte 5 runes, rutas absolutas desde la
raíz, sección PR Delivery Requirements anti-empty-PR.

## Ola C1 — Fundamentos (6 issues, merge 1-6)

| # | Issue | Isla de archivos |
|---|-------|------------------|
| C1.01 | schema + tipos TS del cuento (frontmatter v1, quiz, hotspots) | saberparatodos/src/lib/cuentos/cuento-schema.ts + test |
| C1.02 | validador `scripts/validate_cuentos.js` (frontmatter, 8-10 págs, quiz 3x3, alt, copyright, veto neutro) | saberparatodos/scripts/validate_cuentos.js + test |
| C1.03 | generador packs JSON estáticos + offline por cuento | saberparatodos/scripts/generate-cuento-packs.js + public/v1/cuentos/ |
| C1.04 | sistema de arte: tokens CSS, piezas reutilizables, EscenaSVG.svelte | saberparatodos/src/components/cuentos/arte/* |
| C1.05 | páginas /cuentos + /cuentos/[slug] (Astro, SEO sin JS) | saberparatodos/src/pages/cuentos* |
| C1.06 | LICENSE-CONTENT + headers + auditoría grep copyright | questions_data/cuentos/LICENSE-CONTENT.md + scripts/audit-cuentos-copyright.sh |

## Ola C2 — Lector (6 issues, merge 1-6, depende C1)

| # | Issue | Isla |
|---|-------|------|
| C2.01 | CuentoReader.svelte (paginación, autoplay, velocidad) | .../components/cuentos/lector/CuentoReader.svelte |
| C2.02 | hook resaltado + Web Speech API (voces es, gratis) | .../lector/read-aloud.ts + test |
| C2.03 | QuizCuento.svelte (3Q, caritas, sin telemetría) | .../lector/QuizCuento.svelte |
| C2.04 | hotspots táctiles + reduced-motion | .../lector/EscenaInteractiva.svelte |
| C2.05 | perfiles niño + progreso (localStorage→Supabase RLS, payload sin identidad) | .../lib/cuentos/progreso* |
| C2.06 | e2e lector (desktop+móvil, 0 console errors, screenshots) | saberparatodos/tests/e2e/cuentos-lector.spec.ts |

## Ola C3 — Cuentos 01-05 (5 issues, depende C1; lector C2 en paralelo)

Cada issue: `cuento.md` completo + quiz + 2-4 SVG personajes + escenas
(propias o compuestas de piezas) en `questions_data/cuentos/<slug>/`.
C3.01 pule la semilla existente (tana-tucan-comparte).

C3.01 tana-tucán · C3.02 bruno-zorro · C3.03 nieve-osa ·
C3.04 zara-jirafa · C3.05 lila-tortuga

## Ola C4 — Cuentos 06-10 (5 issues, mismo molde que C3)

C4.01 puente-roto-pipo-mia · C4.02 vela-semilla-luna ·
C4.03 don-emilio-mina · C4.04 lucia-puentes · C4.05 tomas-casa-arbol

## Ola C5 — Pulido y cierre (4 issues, depende C1-C4)

| # | Issue | Isla |
|---|-------|------|
| C5.01 | pins/logros + celebración (local-first, sin telemetría) | .../lib/cuentos/logros* + componente |
| C5.02 | SEO/OG por cuento + sitemap + metadatos edad/valor | pages/cuentos* + public SEO |
| C5.03 | PWA offline: packs + lectura sin red | public/v1/cuentos/* + service-worker alcance |
| C5.04 | auditoría final: validador 0 errores 10/10, e2e PASS, informe + qué falta | docs/CUENTOS/INFORME_CIERRE.md |

## Orden de dispatch sugerido

C1 → (C2 + C3 en paralelo, islas disjuntas) → C4 → C5.
Features: feat-cuentos-infra (C1), feat-cuentos-lector (C2),
feat-cuentos-a (C3), feat-cuentos-b (C4), feat-cuentos-polish (C5).

## Ola C6 propuesta — Nivel StoryComet (motion + audio, pendiente C4/C5)

Referentes investigados 2026-09-10 (MIT): CloudAI-X/threejs-skills
(10 sub-skills: fundamentals, geometry, materials, lighting, animation,
interaction/raycasting, loaders, textures, postprocessing, shaders) +
iart-ai/web-animation-skills (gsap-web, 60fps-animation,
accessible-animation, micro-interaction, svg-animation,
lottie-animation). Instalación agentes: `npx skills add
CloudAI-X/threejs-skills`, `npx skills add iart-ai/web-animation-skills`.

- C6.01: GSAP + SVG motion en EscenaInteractiva (timelines, 60fps solo
  transform/opacity, accessible-animation tiered reduced-motion).
- C6.02: Lottie celebración/confeti (dotLottie liviano, offline).
- C6.03: Three.js progresivo SOLO cuento 07 Vela (espacio):
  raycasting-touch + animación procedural, con fallback SVG intacto
  (reversible; no toca el veto de peso del resto).
- C6.04: audio HQ pre-generado (edge-tts gratuito, voz a elegir:
  es-MX-DaliaNeural o es-CO-SalomeNeural, rate -5%): narración por
  página en `public/audio/cuentos/<slug>/pN.mp3` + hook de player con
  fallback a Web Speech API. Muestras: `~/muestras-cuentos/`.
- C6.05: e2e extendido (motion + audio + offline).

## Dispatch log

- 2026-09-10 Ola C1 despachada: issues #1277-1282 (iberi22/worldexams),
  labels cuentos+ola-c1+wave-c1+jules+ai-agent. Pre-dispatch PASS 6/6.
- Pendiente: monitorear PRs, merge secuencial 1-6, reconciliar
  feat-cuentos-infra, luego C2+C3 en paralelo.
- 2026-09-10 Ola C1 cerrada 6/6 merged (#1283-1288, #1284).
  feat-cuentos-infra 100%.
- 2026-09-10 Olas C2+C3 despachadas: issues #1289-1299, labels
  cuentos+ola-c2/c3+wave-c2/c3+jules+ai-agent.

## Privado no-listado (decisión BELA 2026-09-10)

Cuentos NO es público: vive en producción bajo `/cuentos`, pero sin
botones ni enlaces en la navegación, con `noindex` y excluido del
sitemap. Enlace compartible por mensaje para revisores. OG tags SÍ
(para que el enlace se vea bien al compartir). ACs en C1.05 (9-11) y
C5.02 (1). Reversibilidad: hacerlo público después = quitar noindex +
añadir al sitemap + 1 enlace en nav (1 issue).

## Atlas / Ghial

Atlas-core verificado 2026-09-10: estado F0 scaffolding (solo DAG/docs,
sin dispatcher). NO listo para orquestar. No existe repo "ghial" en el
workspace. Decisión (default anotado): orquestar con Jules + GitCore,
re-evaluar Atlas cuando salga de F0.
