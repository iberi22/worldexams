## Contexto y Objetivo
Ampliación de las guías de autoridades y estándares evaluativos en `saberparatodos/src/config/authority-guidelines.ts` para el **Lote C** (Cono Sur y Región Andina) y enriquecimiento de trampas conceptuales/distractores por materia en `SubjectHubView.svelte`:
- **UY (Uruguay)**: ANEP / DGES — Evaluación Nacional de Aprendizajes y Admisión UDELAR.
- **PY (Paraguay)**: MEC — Sistema Nacional de Evaluación del Proceso Educativo (SNEPE).
- **BO (Bolivia)**: Ministerio de Educación — Sistema de Evaluación del Estado Plurinacional y Admisiones Universitarias (UMSA, UAGRM).
- **Enriquecimiento Pedagógico en `SubjectHubView.svelte`**:
  - Ampliar el analizador `commonMisconceptions` para soportar de manera precisa y diferenciada:
    - Ciencias Naturales / Biología / Física / Química (ej: confusión calor vs temperatura, masa vs peso, selección natural lamarckiana vs darwiniana).
    - Ciencias Sociales / Historia / Ciudadanas (ej: anacronismo histórico, sesgo de causa única, confusión de poderes del Estado).
    - Inglés / Lengua Extranjera (ej: false friends comunes como actually, embarrassed, library).

---

## Archivos a Modificar / Crear
- `saberparatodos/src/config/authority-guidelines.ts`
  - Añadir entradas para `UY`, `PY`, `BO`.
- `saberparatodos/src/components/preguntas/SubjectHubView.svelte`
  - Extender `commonMisconceptions` con casos de estudio y distractores para ciencias naturales, ciencias sociales e idiomas.
- `saberparatodos/tests/unit/curriculum-subject-hub.test.ts`
  - Verificar UY, PY, BO y las nuevas trampas conceptuales.

---

## Acceptance Criteria (AC)
- [ ] `getAuthorityGuidelines('UY')`, `PY`, `BO` retornan sus respectivas entidades y matrices oficiales.
- [ ] Al acceder a materias de Ciencias Naturales o Sociales en `SubjectHubView.svelte`, `commonMisconceptions` muestra trampas pedagógicas pertinentes al área evaluada.
- [ ] `npm run test:unit -w saberparatodos` pasa al 100%.
- [ ] Los 20 países del ecosistema quedan con cobertura curricular oficial.
