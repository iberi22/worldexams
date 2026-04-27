# Issue Local Mirror: [MX] #230 - Investigación Curricular SEP/CENEVAL y Top 10 Universidades México

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/230
**Status:** Open
**Priority:** High
**Labels:** nuevo-pais, curriculo, enhancement
**Owner:** Agente (Generator + Architect)
**Created:** 2026-04-18

## Resumen

Mapear la "Nueva Escuela Mexicana" (SEP), estandarizar el EXANI-II de CENEVAL y documentar los procesos de admisión de las 10 principales universidades mexicanas (UNAM, IPN, UAM, UDG, Tec de Monterrey, etc.) para habilitar la generación de bundles de preguntas con contexto cultural mexicano.

## Fases

### Fase 1: Mapeo Curricular SEP
- [ ] Documento `docs/specs/curriculums/MEXICO_CURRICULUM.md`
- [ ] Validar en `config/countries.config.ts`

### Fase 2: Estándar EXANI-II
- [ ] Módulos, puntaje y percentiles documentados

### Fase 3: Top 10 Universidades
- [ ] UNAM/COMIPEMS, IPN, UAM, UdG, Tec MTY, Ibero, UANL, BUAP, UV, UABC

### Fase 4: Generación de Bundles
- [ ] Primer bundle piloto: `MX-MAT-09-algebra-001-bundle.md`

## Criterios de Aceptación
- [ ] `docs/specs/curriculums/MEXICO_CURRICULUM.md` publicado y validado
- [ ] Al menos 1 bundle por grado (3-9) de Matemáticas
- [ ] México visible y funcional en selector de región
