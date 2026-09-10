# SDD One-Page — 001 Cuentos primera infancia

> Spec efímero. Requisitos durables: SRS-FUN-017..021, BR-07.

## P1 — Problema
WorldExams atiende grados 3-11 con exámenes. No existe oferta para
primera infancia (3-6 años): el tramo donde se forman vocabulario,
valores y hábitos de lectura. StoryComet valida el formato (read-aloud
+ escenas + quizzes) pero es de pago ($39/año). Nuestra ventaja: 100%
gratis, español neutro multi-país, contenido propio protegido.

## P1 — Propuesta
Módulo `/cuentos` en saberparatodos: 10 cuentos originales (4 hábitats
animales + 2 dilemas éticos + 1 espacio + 3 oficios reales 2026),
lector Svelte con read-aloud gratuito (Web Speech API), quiz oral de
3 preguntas, perfiles de niño con progreso, packs offline. Ver
`docs/CUENTOS/00_BIBLIA.md` (contenido), `01_DIRECCION_ARTE.md`
(diseño), `02_COPYRIGHT_Y_FORMATO.md` (legal+formato), `WAVE_PLAN.md`
(26 issues, olas C1-C5 con Jules).

## HOW mínimo
1. Ola C1: schema TS + validador + packs + arte base + páginas Astro +
   copyright (6 issues, islas en WAVE_PLAN.md).
2. Ola C2: lector (Reader + read-aloud + quiz + hotspots + progreso +
   e2e), en paralelo con C3 tras C1 (islas disjuntas).
3. Olas C3/C4: 10 cuentos (md + quiz + SVG), uno por issue, formato v1.
4. Ola C5: pins, SEO, offline, auditoría final + INFORME_CIERRE.md.
5. Reconciliar features.json al final de cada ola; e2e PASS antes de
   merge (regla Gara-G adoptada: waves exigen e2e PASS).

## Tasks [P]
- [P] feat-cuentos-infra — C1 (validador 0 errores en semilla)
- [P] feat-cuentos-lector — C2 (e2e desktop+móvil, 0 console errors)
- [P] feat-cuentos-a — C3 (5/5 cuentos validan)
- [P] feat-cuentos-b — C4 (5/5 cuentos validan)
- [P] feat-cuentos-polish — C5 (auditoría 10/10 + informe)

## Riesgos
- BR-03: cero tokens/telemetría en flujos niños (en todos los bodies).
- Web Speech API varía por navegador: degradar a lectura manual sin
  romper (AC en C2.02).
- Español neutro: veto en validador C1.02, no a ojo.
