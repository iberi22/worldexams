# WorldExams — Limpieza de feedback, rescate de trabajo y protocolo v5.3 (2026-09-30)

> Todo dato numérico viene de un comando ejecutado. Ver sección 8 para reproducirlos.

---

## 1. Veredicto

**El feedback que no explicaba el porqué está fuera de producción y el validador ya no lo permite.** Se retiraron 109 bundles (1.512 preguntas) y 306 packs derivados; main y develop quedaron limpios, sincronizados y con CI verde y despliegue a producción.

El hallazgo central: **la causa no fueron los agentes, fue el validador.** El gate anterior exigía que el feedback *existiera*, no que *explicara*, así que `<!-- feedback: Incorrecto. -->` pasaba el control.

| Dimensión | Antes | Ahora |
|---|---|---|
| Bundles con feedback que no explica | 109 (1.512 preguntas) | 0 |
| Packs sirviendo contenido retirado | 306 | 0 |
| Regla que exige la razón | ninguna | `feedback-no-reason`, siempre ERROR |
| Test del gate | no existía | 16 casos, incluidos 9 del corpus real |
| Ramas `bundle-batch-*` | 67 | 0 |
| Commits sin pushear | 11 | 0 |

---

## 2. Diagrama: por qué llegó a producción

```mermaid
flowchart TD
  A[Agente genera bundle .md] --> B{Validador v5.2}
  B -->|exigía solo PRESENCIA| C["feedback: Incorrecto.<br/>PASA el gate"]
  C --> D[merge sin fricción]
  D --> E[generate-static-packs.js]
  E --> F[pack JSON publicado]
  F --> G[API sirve la pregunta]
  G --> H[Estudiante ve 'Incorrecto.'<br/>y no aprende por qué]
  B -.->|nunca detectó| I[645 bundles más con<br/>feedback que no enseña]
```

Tres fallas encadenadas, y ninguna era del agente:

1. **Gate estructural, no pedagógico.** Validaba presencia, no contenido.
2. **Generación por lotes.** Un patrón incorrecto se repetía en decenas de archivos sin revisión individual.
3. **Artefactos derivados sin control.** El generador de packs solo escribe; nunca borra. Por eso borrar un `.md` dejaba sus preguntas sirviéndose igual.

---

## 3. La regla nueva (no negociable)

**Las 4 opciones deben explicar el porqué.** Aplica a todos los países, grados y materias.

| Prohibido | Por qué está mal | Correcto |
|---|---|---|
| `Incorrecto.` | No explica nada | `Incorrecto. "transportacion" son medios de transporte, no un lugar donde alojarse.` |
| `Correcto.` | No explica nada | `Correcto. "accommodation" corresponde a la definición de lugar de hospedaje.` |
| `Incorrect. Try again.` | Manda a releer, no enseña | `Incorrect. Here "could" is past ability, not future possibility.` |
| `Incorrecto. Revisa el concepto.` | Reenvía sin explicar | `Incorrect. "siempre" significa todos los días, nunca "nunca".` |
| `Active voice` / `Past simple` | Etiqueta sin razón | `Incorrect. "were" es pasado; el enunciado está en presente.` |

Y lo que **sí** cuenta como explicación, incluso si es corto:

- Una fórmula o un cálculo: `Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s.`
- Una respuesta numérica con sentido: `pOH es 11`, `2 + 1 = 3`, `$Q_c\neq K_c$`
- Una razón con palabras propias: `Es el peso normal en reposo.`, `El zorro no se menciona en la historia.`

**Criterio exacto del validador**, en orden: (1) el feedback existe; (2) quitando el veredicto queda algo; (3) lo que queda no es solo "revisa el concepto"; (4) no es una cadena sin espacios; (5) o trae operador/fórmula, o una cantidad con verbo (`es 11`), o llega a 15 caracteres.

---

## 4. Tres errores que cometí durante el trabajo

Se documentan porque son la parte más útil del informe: cada uno habría dañado el resultado.

### 4.1 El gate por longitud destruía contenido bueno

Primera versión: "el feedback debe pesar 60+ caracteres". Marcó como malo un feedback excelente y corto de Chile: `Correcto. vf = v0 + a*t = 6 + 2*5 = 16 m/s` (~38 chars). Si borraba con esa regla, eliminaba matemáticas correctas.

**Lección:** una heurística que rechaza trabajo correcto es peor que no tener heurística. La regla debe ser semántica o no existir.

### 4.2 El vocabulario fijo rechazaba contenido válido

Segunda versión: exigía palabras de una lista (`olvido`, `confunde`, `porque`, `define`). Rechazó 23.832 opciones, casi todas buenas: `Es el peso normal en reposo.`, `El logaritmo de cero no existe en los reales.`, `Esa es la pendiente recíproca.`

**Lección:** el gate debe poder *solo* dejar pasar de más, nunca rechazar de más.

### 4.3 Reemplacé el validador entero y borré 231 líneas

Al meter el gate, sustituí `validate-bundles-v52.mjs` completo y perdí todos los exports que los tests importan (`detectControlChars`, `checkFeedbackTrivial`, `validateFile`, `hasMojibake`…) y el guard `import.meta.url` que evita el `process.exit` en import. **El CI de producción falló** con `process.exit unexpectedly called with "0"`.

Restauré el archivo desde `102d6469` y cambié solo la función de feedback.

**Lección:** en un archivo que otros importan, se **extiende**, no se sustituye.

### 4.4 Bonus: el prune global de packs fue casi una catástrofe

Un "borrar packs no regenerados" eliminó **2.499 packs legítimos** de otros generadores (el repo tiene 5.127 packs y el generador solo reproduce 2.628). Revertido de inmediato. La regla correcta es por procedencia: borrar solo el pack cuyo país/grado/semana corresponde a un bundle eliminado en *este* cambio. Así se retiraron exactamente 306.

### 4.5 Un agente encontró un bug que yo introduje

Al publicar los 10 packs rescatados (`cb6b6d8c5`), el generador los dejó en **8 preguntas en vez de 16**. La causa no era mi rescate: `generate-static-packs.js` reconstruía cada pack desde cero y, con `--changed-only`, escribía ese objeto parcial encima del pack ya publicado. Como una clave de pack es `(país, semana, grado, materia)` y varios bundles legítimos comparten clave, cualquier push que tocara un bundle borraba en silencio a sus hermanos.

**Esto no era hipotético:** el pre-push hook corre `--all-weekly --changed-only --api-only` en cada push que toca un bundle, así que cada semana con varios bundles estaba a un cambio de perder la mitad de sus preguntas. Lo detectó y corrigió un agente en `25424d1a2` (#1590), que regeneró y restauró las 80 preguntas. Los 10 packs volvieron a 16 y el generador ahora siembra desde el JSON en disco.

**Lección:** publicar artefactos derivados usando una bandera incremental es una trampa: la bandera dice *qué revisar*, no *cómo fusionar*. Un artefacto derivado nunca debe reconstruirse desde cero con un filtro parcial.

## 5. Rescate de trabajo que estaba a punto de perderse

- **10 bundles** de Lectura Crítica G3 (W26–W35) existían solo en `bundle-batch-lc3-gaps-1790698395`, sin llegar nunca a main. Limpiando ramas se habrían perdido. Recuperados, validados (0 errores) y publicados.
- **6 archivos** que los agentes de Claude Code dejaron sin commitear: el diagnóstico del 26-sep, los reportes P1/P2/P4, 10 bundles de Lectura Crítica G8 y su pack.
- **`VERIFY_SUITE_REPORT.md`** documenta que la suite E2E nunca corrió (el dev server no levantó, 0 tests). Se conserva con esa advertencia, no como si estuviera en verde.
- **Rutas `file:///home/<usuario>/...`** en los reportes: el gate anti-leak las rechazó en el commit. Se corrigieron en vez de forzarse con `--no-verify`.

---

## 6. Estado del proyecto

### Cobertura por país (tras la limpieza)

**13 de 20 países sobre la meta de 2.000 preguntas. Total: 70.498 publicadas.**

| País | Publicadas | % meta |
|---|---|---|
| CO Colombia | 25.190 | 1260% |
| SV El Salvador | 4.800 | 240% |
| CR Costa Rica | 4.160 | 208% |
| PE Perú | 4.060 | 203% |
| MX México | 3.964 | 198% |
| CL Chile | 3.900 | 195% |
| ES España | 3.800 | 190% |
| PR Puerto Rico | 3.440 | 172% |
| EC Ecuador | 3.400 | 170% |
| HN Honduras | 2.560 | 128% |
| UY / PY / BO | 2.000 c/u | 100% |
| AR Argentina | 1.784 | 89% (brecha 216) |
| BR Brasil | 1.440 | 72% (brecha 560) |
| PA / GT / DO / NI / GQ | 400 c/u | 20% (brecha 1.600 c/u) |

La meta de 2.000 **no se perdió** en ningún país que ya la cumplía. Argentina, Brasil y los cinco centroamericanos ya estaban por debajo.

### Producción (medido por HTTP)

| Consulta | Antes | Ahora |
|---|---|---|
| México G11 mate | ~50 opciones sin razón | **0/80** |
| Puerto Rico G11 mate | ~59 opciones sin razón | **0/80** |
| Perú G11 mate | — | 0/80 |
| Colombia G11 mate | — | 2/80 (reales, pendientes) |

Los 2 residuales de Colombia son `Calculó 7!.` y `Calculó 4!.` — feedback real pero demasiado escueto. **El gate nuevo los marca**, que es exactamente su trabajo.

### Ramas

67 `bundle-batch-*` → **0**. Total 186 → 20 ramas funcionales. 17 worktrees de agentes removidos. `main` y `develop` en `0 0` contra el remoto, working tree limpio.

---

## 7. Lo que queda pendiente

| # | Pendiente | Tamaño | Riesgo |
|---|---|---|---|
| 1 | **645 bundles** que el gate nuevo marca (23.721 opciones) | Grande | Bajo: se reparan por oleadas |
| 2 | 2 residuales en Colombia G11 mate (`Calculó 7!.`) | 2 opciones | Bajo |
| 3 | Sesgo de letra: 62% de bundles con >50% una letra (A gana 52%) | Muy grande | Medio: afecta credibilidad |
| 4 | 48 packs huérfanos de deuda previa (Brasil, Chile) | Medio | Bajo: no tocados a propósito |
| 5 | Brecha de AR/BR y los 5 países al 20% | 8.776 preguntas | Bajo |
| 6 | Issue #1584: `/v1/questions` ignora `?week=` | 1 bug | Bajo |

**Sobre el punto 1:** `npm run validate` ahora falla en 645 bundles. Es intencional — son la deuda que el gate viejo no veía. **CI no se bloquea** porque valida solo los bundles cambiados (`--diff-filter=AM`). Un PR con contenido nuevo fallará si ese contenido tiene feedback vacío, que es lo correcto.

**Sobre el punto 3** es la deuda que más me preocupa y no la toqué: un estudiante que adivine "A" acierta el 52% del tiempo. Arreglarlo significa reescribir la clave de ~35.000 preguntas publicadas. Requiere tu decisión.

---

## 8. Evidencia

### 8.1 Verificación ad-hoc de las decisiones destructivas

Borrar 109 bundles y 306 packs es irreversible en la práctica (se pierde trabajo de agentes), así que cada afirmación se revalidó **contra el validador del repo**, que es la fuente de verdad, y no contra el clasificador Python que motivó el borrado.

```bash
python3 ~/.hermes/cache/scratch/hermes-verify-feedback-cleanup.py
```

| Check | Resultado |
|---|---|
| **A.** Los 109 bundles borrados son rechazados por el validador actual | **109/109** |
| **B.** Bundles sobrevivientes que fallan validación | 645 (deuda legacy, esperada) |
| **C.** Packs borrados que contienen IDs de preguntas que un bundle vivo aún produce | **0/306** |
| **D.** Packs sobrevivientes que todavía sirven un ID retirado | **0** |

Los checks A, C y D son los que importan: **A** confirma que no se borró trabajo bueno, **C** que no se retiró un pack ajeno, y **D** que la API ya no puede servir lo retirado. El harness deja el árbol limpio y materializa las copias temporal dentro de `questions_data/` porque el validador ignora rutas fuera de ahí.

Esta verificación es **ad-hoc, no una suite del proyecto**: es un script de un solo uso, instalado en scratch, que existe para auditar esta decisión concreta. La evidencia de suite es la de la sección 8.2.

### 8.2 Suites del proyecto

```bash
# Gate y sus tests
node scripts/test-feedback-gate.mjs
# -> 16 passed, 0 failed  (9 casos tomados del corpus real)

cd saberparatodos && npx vitest run tests/unit --retry=2
# -> 407 tests passed  (7 spec files sin deps locales: jspdf, katex, @testing-library)

# Corpus completo (deuda expuesta)
node scripts/validate-bundles-v52.mjs
# -> Validated 2694 bundle file(s). Failures: 645

# Cobertura
npm run audit:country-readiness -- --json
# -> total_published_validated_questions: 70498, countries_ready: 13

# Producción
curl "https://api.saberparatodos.space/v1/questions?country=mx&grade=11&subject=matematicas"
# -> HTTP 200, 20 preguntas, 0/80 con feedback deficiente

# Git
git rev-list --left-right --count origin/main...main      # -> 0  0
git branch --list 'bundle-batch*' | wc -l                 # -> 0
git status --short | wc -l                                 # -> 0

# CI
gh run list --branch main --limit 1
# -> completed success
#    Preflight ✓ · Deploy SSR PWA ✓ · Deploy API Worker ✓ · Smoke ✓
```

**Commits** (todos en `main` y `develop`, CI verde):

| Commit | Qué hace |
|---|---|
| `41d69210b` | Gate de feedback + 109 bundles y 306 packs retirados + protocolo |
| `942df734c` | Rescate de 10 bundles G3 varados |
| `cb6b6d8c5` | Publicación de esos 10 en packs |
| `d059dcfac` | `.gitignore` para el cache de CodeGraph |
| `62da075f8` | Restaura los quality gates que había borrado |
| `0671faa90` | Acepta cálculos cortos y respuestas científicas |

---

## 9. Sesión vs handoff

**SEGUIR EN SESIÓN** para el pendiente 2 (2 opciones en Colombia) y el 4 (48 packs huérfanos) — son acotados y de riesgo bajo.

**HANDOFF** para el pendiente 1 (645 bundles) y el 3 (sesgo de letra). El sesgo requiere una decisión de producto antes de tocar 35.000 preguntas publicadas.

**Decisión que necesito de vos** (no bloqueante, pero conviene tomarla pronto): si el sesgo de letra se corrige reescribiendo la clave correcta de las preguntas ya publicadas, o solo se bloquea hacia adelante con el gate de pre-commit para que la deuda existing no se propague más.
