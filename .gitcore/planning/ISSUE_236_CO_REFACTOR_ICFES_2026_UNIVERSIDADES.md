# Issue Local Mirror: [CO] #236 - Refactorización Curricular ICFES 2026 y Top 10 Universidades Colombia

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/236
**Status:** Open
**Priority:** Medium
**Labels:** curriculo, enhancement, refactor
**Owner:** Agente (Architect + Guardian)
**Created:** 2026-04-18

## Resumen

Colombia es el país base del sistema. Este issue audita el currículo existente contra los lineamientos MEN 2026, documenta exhaustivamente el sistema de admisión de las 10 universidades más importantes del país, y establece los parámetros del Saber Pro para una futura funcionalidad de simulador de egreso universitario.

## Fases

### Fase 1: Auditoría del Estándar Actual
- [ ] Revisar `docs/specs/ICFES_CURRICULUM.md` vs. lineamientos 2026
- [ ] Verificar `saberparatodos/src/config/curriculum.ts` (periodos MEN)

### Fase 2: Cobertura de Grados
- [ ] Verificar bundles existentes por grado 3-11
- [ ] Priorizar generación para grados 6-9

### Fase 3: Top 10 Universidades
- [/] UNAL (examen propio por sede): [PREU_UNAL_BLUEPRINT.md](file:///e:/scripts-python/worldexams/docs/specs/PREU_UNAL_BLUEPRINT.md)
- [/] UdeA: [PREU_UDEA_BLUEPRINT.md](file:///e:/scripts-python/worldexams/docs/specs/PREU_UDEA_BLUEPRINT.md)
- [ ] Univalle, UIS, U. de Caldas, U. de Cartagena
- [ ] Javeriana (PEI), Uniandes, EAFIT, Uninorte

### Fase 4: Saber Pro
- [ ] Módulos comunes y específicos documentados
- [ ] Preparación para "Saber Pro Simulator" feature

## Criterios de Aceptación
- [ ] `docs/specs/curriculums/COLOMBIA_CURRICULUM.md` publicado (nuevo, más completo)
- [x] Top 2 universidades (UNAL, UdeA) con blueprint documentado
- [ ] Al menos 10 bundles por asignatura en grado 11
- [ ] Fase PREU: 5 bundles MASTERY para UNAL (v5.2)
