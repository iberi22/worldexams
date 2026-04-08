# WorldExams Bundle Migration Plan

**Date:** 2026-04-03
**Status:** CRITICAL - 203 bundles need migration
**Total Bundles:** 231
**Total Questions:** 2,362 (should be ~4,620)

---

## Executive Summary

**78% of bundles are in the wrong format or have insufficient questions.**

The system has two bundle formats:
1. **MASTERY** - 20 questions, period-segregated (for ICFES grade 11)
2. **BASIC** - ~7 questions, no period segregation (legacy format)

**Goal:** Migrate all bundles to MASTERY format with proper period segregation.

---

## Migration Strategy

### Phase 1: Priority Fixes (Grade 11 ICFES)

**Grade 11 is the most important** because ICFES Saber 11 is the flagship product.

| Issue | Count | Action |
|-------|-------|--------|
| Missing questions (17-19 instead of 20) | ~23 bundles | Regenerate missing questions |
| Period segregation missing | Some bundles | Split by periodo |

**Affected subjects:** Ciencias Naturales, Inglés, Lectura Crítica, Matemáticas, Sociales

### Phase 2: English Subject Complete Rebuild

**149 English bundles** are all in BASIC format with ~10 questions each.

| Grade | Current | Target | Questions Needed |
|-------|---------|--------|-----------------|
| 4 | 11 bundles | MASTERY | 110 |
| 5 | 10 bundles | MASTERY | 100 |
| 6 | 40 bundles | MASTERY | 400 |
| 7 | 41 bundles | MASTERY | 410 |
| 8 | 40 bundles | MASTERY | 400 |
| **Total** | **142** | | **1,420** |

### Phase 3: Core Subjects (Grades 3-8)

| Subject | Grades | Current | Action |
|---------|--------|---------|--------|
| Matemáticas | 3, 6, 7, 9 | BASIC | Migrate to MASTERY + period segregation |
| Lectura Crítica | 3, 11 | Mix | Fix grade 3, verify grade 11 |
| Ciencias Naturales | 3, 11 | Mix | Fix grade 3, verify grade 11 |
| Sociales | 3, 11 | Mix | Fix grade 3, verify grade 11 |
| Tecnología | 3, 7 | BASIC | Migrate to MASTERY |

### Phase 4: Preuniversitario

10 bundles marked as "Grado 0" need proper grade classification.

---

## Migration Rules

### BASIC → MASTERY Conversion

**When converting a BASIC bundle to MASTERY:**

1. **Increase questions from 7 to 20**
   - Original 7 questions stay (v1-v7)
   - Generate 13 new questions (v8-v20)
   - Difficulty progression: v1-v4 (easy), v5-v10 (medium), v11-v16 (hard), v17-v20 (expert)

2. **Add period segregation**
   - If topic is for P1-P4 curriculum, create 4 separate bundles (one per period)
   - If topic is semester-based, create 2 bundles (P1-P2, P3-P4)

3. **Update frontmatter:**
   ```yaml
   id: "CO-MAT-6-P1-algebra-001-MASTERY"
   country: "colombia"
   grado: 6
   asignatura: "matematicas"
   tema: "algebra"
   periodo: 1  # ADD THIS
   protocol_version: "5.1"  # ADD THIS
   bundle_size: 20  # CHANGE FROM total_questions
   alignment: "ICFES Saber 11 + MEN"
   competencia_icfes: "..."
   afirmacion_icfes: "..."
   ```

### Question Format Upgrade

**BASIC format:**
```markdown
## Pregunta 1 (Original - Dificultad 3)

### Enunciado
...
### Opciones
- [x] A) Correcta
- [ ] B) Incorrecta
### Explicación Pedagógica
...
```

**MASTERY format:**
```markdown
## Question 1 (Variant Basic - Difficulty 3)

**ID:** `CO-MAT-6-P1-algebra-001-MASTERY-v1`
**Bloom:** Remember
**ICFES:** Comunicación y Representación

### Context
[Relevant context for problem-solving]

### Enunciado
...
### Options
- [ ] A) Incorrecta
- [x] B) Correcta
<!-- feedback: Explanation of why B is correct -->
### Explicación Pedagógica
...
```

---

## Migration Execution Plan

### Sub-Agent Tasks (using kimi-k2.5)

Each sub-agent task will handle one grade + subject combination:

```
Task 1: Migrate Grade 6 English (40 bundles)
Task 2: Migrate Grade 7 English (41 bundles)
Task 3: Migrate Grade 8 English (40 bundles)
Task 4: Migrate Grade 4-5 English (21 bundles)
Task 5: Fix Grade 11 Matemáticas (3 bundles with issues)
Task 6: Fix Grade 11 Ciencias Naturales (2 bundles with issues)
Task 7: Migrate Grade 6-9 Matemáticas (some BASIC)
Task 8: Migrate Grade 3 Core Subjects (27 bundles)
```

### Review Queue

After each migration batch:
1. Run `scripts/review-bundle.ts` on all migrated bundles
2. If 2+ errors → Regenerate entire bundle
3. Save to `questions_revision_history` in Supabase

---

## Audit Report Location

Latest audit: `E:\scripts-python\worldexams\.worldexams\audit\audit-2026-04-03T03-12-34.json`

---

## Quick Stats

| Metric | Current | Target |
|--------|---------|--------|
| Total Bundles | 231 | 231 |
| Total Questions | 2,362 | ~4,620 |
| MASTERY Format | 51 (22%) | 231 (100%) |
| Avg Questions/Bundle | 10.2 | 20 |
| Period Segregated | ~51 | 231 |

---

## Estimated Work

| Phase | Bundles | Est. Time (kimi-k2.5) |
|-------|---------|----------------------|
| Phase 1: Grade 11 Fix | 23 | 2-3 hours |
| Phase 2: English Rebuild | 142 | 8-10 hours |
| Phase 3: Core Subjects | 60 | 4-5 hours |
| Phase 4: Preuniversitario | 10 | 1 hour |
| **TOTAL** | **203** | **15-19 hours** |

**Recommendation:** Run sub-agents in parallel, 4-5 batches.
