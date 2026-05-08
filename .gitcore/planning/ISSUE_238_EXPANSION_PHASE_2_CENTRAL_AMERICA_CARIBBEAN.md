# [FEAT] #238 - Expansion Phase 2: Central America & Caribbean

**GitHub Issue:** https://github.com/iberi22/worldexams/issues/238
**Status:** In Progress
**Priority:** High
**Labels:** expansion, latam, curriculo, config
**Owner:** Agente (Generator + Architect)
**Created:** 2026-05-08

## Summary

Expand World Exams coverage to Central America and the Spanish-speaking Caribbean. This involves mapping educational structures, standardized tests, and cultural contexts for Panama, Costa Rica, Guatemala, Dominican Republic, El Salvador, Honduras, and Nicaragua.

## Countries & Exams

| Country | Code | Authority | National Exam |
|---------|------|-----------|---------------|
| 🇵🇦 Panama | PA | MEDUCA | Pruebas CRECER / Graduandos |
| 🇨🇷 Costa Rica | CR | MEP | Pruebas Nacionales Estandarizadas |
| 🇬🇹 Guatemala | GT | MINEDUC | Evaluación de Graduandos |
| 🇩🇴 Dominican Republic | DO | MINERD | Pruebas Nacionales |
| 🇸🇻 El Salvador | SV | MINED | Prueba AVANZO |
| 🇭🇳 Honduras | HN | SEDUC | Pruebas Nacionales |
| 🇳🇮 Nicaragua | NI | MINED | Exámenes de Bachillerato |

## Implementation Phases

### Phase 1: Curricular Research & Specs
- Create `docs/specs/curriculums/[COUNTRY]_CURRICULUM.md` for each target.
- Document grades, subjects, and exam patterns.

### Phase 2: Global Configuration
- Update `config/countries.config.ts` with metadata, themes, and cultural context.

### Phase 3: Runtime Integration
- Update `saberparatodos/src/config/countries.config.ts` for product awareness.
- Initialize content metadata (empty state).

### Phase 4: Discovery & Landing
- Update `apps/landing-worldexams/src/data/countries.ts` for visibility.

## Acceptance Criteria
- [ ] 7 new countries documented in `docs/specs/curriculums/`.
- [ ] Global config supports all 7 new codes.
- [ ] Runtime config allows selecting these countries (showing "Coming Soon" or empty state).
- [ ] Landing page shows flags and exam names for Central America & Caribbean.
