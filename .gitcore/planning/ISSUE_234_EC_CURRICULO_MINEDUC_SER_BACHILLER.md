# Issue Local Mirror: [EC] #234 - Investigación Curricular MINEDUC Ecuador / Ser Bachiller

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/234
**Status:** Open
**Priority:** High
**Labels:** nuevo-pais, curriculo, enhancement
**Owner:** Agente (Generator + Architect)
**Created:** 2026-04-18

## Resumen

Mapear el currículo ecuatoriano (EGB + BGU del MinEduc) y el sistema de acceso a la educación superior pública a través del examen Ser Bachiller (SENESCYT). Documentar las universidades top y sus procesos propios (EPN, ESPOL, USFQ).

## Fases

### Fase 1: Currículo MinEduc
- [ ] Documento `docs/specs/curriculums/ECUADOR_CURRICULUM.md`
- [ ] EGB + BGU, areas y asignaturas

### Fase 2: Ser Bachiller (SENESCYT)
- [ ] Módulos, escala 0-1000, puntajes de corte por carrera

### Fase 3: Top 10 Universidades
- [ ] UCE, EPN, ESPOL, USFQ, U. de Cuenca, PUCE, UDLA, UTA, U. de Guayaquil, UASB

### Fase 4: Generación de Bundles
- [ ] Primer bundle: `EC-MAT-07-ecuaciones-001-bundle.md`
- [ ] Adaptar: dólares, Quito/Guayaquil/Cuenca

## Criterios de Aceptación
- [ ] `docs/specs/curriculums/ECUADOR_CURRICULUM.md` publicado
- [ ] Ser Bachiller documentado y mapeado
- [ ] Ecuador en `config/countries.config.ts` si no existe
