# TASK.md — Tareas Activas de WorldExamns

> Gestión de tareas activas del proyecto. Este archivo se sincroniza con `.gitcore/planning/` y GitHub Issues.
> Última actualización: 2026-07-28

---

## 🔴 P0 — Prioridad Crítica (Esta Semana)

### Generación de Contenido — Colombia Grado 6 (#397)
- [ ] **W-001:** COMPLETAR WEEKLY packs Grado 6 Colombia 2026 - Semanas restantes
  - Matematicas: W01-W40
  - Lengua: W01-W40
  - Ciencias Naturales: W14-W40
  - Sociales: W14-W40
  - Inglés: W14-W40
- [ ] **W-002:** Validar todos los packs generados con `npm run validate`
- [ ] **W-003:** Publicar packs JSON estáticos (generate-static-packs.js)
- [ ] **W-004:** Verificar disponibilidad en API pública

### Expansión a México — Fase 1
- [ ] **MX-001:** Completar reglas de país en `skills/bundle-creator/rules/MX.md`
- [ ] **MX-002:** Generar bundles piloto (Grado 6, Matemáticas y Lengua, W01-W10)
- [ ] **MX-003:** Validar contra currículo SEP/NEM
- [ ] **MX-004:** Publicar packs con prefijo `mx-`

---

## 🟡 P1 — Prioridad Alta

### Tests (#408)
- [ ] **T-001:** Tests unitarios para IsarVectorStoreService
- [ ] **T-002:** Tests unitarios para agent_memory store
- [ ] **T-003:** Aumentar cobertura de tests E2E (actual: 48 tests)

### Seguridad (#221)
- [ ] **S-001:** Escanear git history con git-filter-repo para detectar secrets expuestos
- [ ] **S-002:** Force-push a todas las ramas después de limpieza
- [ ] **S-003:** Actualizar .gitignore con patrones adicionales de seguridad
- [ ] **S-004:** Auditoría de variables de entorno en CI/CD

### Country Readiness — Auditoría General
- [ ] **CR-001:** Ejecutar `npm run audit:country-readiness -- --json` y documentar resultados
- [ ] **CR-002:** Migrar bundles legacy a ruta canónica v5.2
- [ ] **CR-003:** Convertir bundles legacy a formato v5.2 (frontmatter completo + preguntas)
- [ ] **CR-004:** Publicar packs JSON para bundles validados no publicados

---

## 🔵 P2 — Prioridad Media

### Argentina — Preparación
- [ ] **AR-001:** Investigar currículo NAP/Aprender por grado y materia
- [ ] **AR-002:** Crear reglas de país `skills/bundle-creator/rules/AR.md`
- [ ] **AR-003:** Definir estructura de grados (1ro a 6to año de secundaria)
- [ ] **AR-004:** Bundle piloto (Grado 1, Matemáticas, W01-W05)

### Brasil — Preparación
- [ ] **BR-001:** Investigar currículo BNCC/ENEM
- [ ] **BR-002:** Crear reglas de país `skills/bundle-creator/rules/BR.md`
- [ ] **BR-003:** Definir equivalencia de grados (3o ano Ensino Medio)
- [ ] **BR-004:** Bundle piloto (3EM, Matemáticas, W01-W05)

### Mejoras de Protocolo
- [ ] **P-001:** Evaluar necesidad de protocolo v6 (feedback de countries)
- [ ] **P-002:** Mejorar mensajes de error del validador (`npm run validate`)
- [ ] **P-003:** Agregar validación de contexto regional por país

---

## ⚪ P3 — Backlog

### Infraestructura
- [ ] **I-001:** Migrar `saberparatodos/` a `apps/` (path churn)
- [ ] **I-002:** Normalizar scripts de workspace después de migración
- [ ] **I-003:** Documentar ownership de Supabase (root vs package)

### Contenido
- [ ] **C-001:** Chile (PAES) — Investigación inicial
- [ ] **C-002:** Perú (ECE) — Investigación inicial
- [ ] **C-003:** Preuniversitario UNAL — Completar bundles restantes
- [ ] **C-004:** Generar bundles de repaso/recuperación para cada país

### Producto
- [ ] **U-001:** Mejorar leaderboard dinámico con Supabase
- [ ] **U-002:** Guardar resultados de exámenes por usuario
- [ ] **U-003:** Modo práctica por tema
- [ ] **U-004:** Dashboard analytics para CEO
- [ ] **U-005:** PWA con Service Worker

---

## ✅ Completado Recientemente

| Tarea | PRs / Issues | Fecha |
|-------|-------------|-------|
| MASTERY bundles Colombia G3-G11 | #395, #406, #405 | Mayo 2026 |
| MASTERY bundles Uruguay G11 | #324 | Mayo 2026 |
| MASTERY bundles Paraguay G11 | #324 | Mayo 2026 |
| Multi-país (generalización ICFES) | #310, #315, #317, #318 | Mayo 2026 |
| CI/CD + Playwright E2E | Múltiples | Abril-Mayo 2026 |
| Validación estricta v5.2 | Scripts de validación | Mayo 2026 |
| [x] Geo routing por país (middleware + pack-fetcher + ContentComingSoon + smoke:geo) | feat-geo-routing | Julio 2026 |
| [x] Salones mesh-first base (edge-mesh SalonRegistry + saberparatodos) | feat-mesh-salones | Julio 2026 |
| [x] AI Core base (edge-mesh/src/ai-core + /ajustes/ia, tutor, exam-generator) | feat-ai-core-ondevice | Julio 2026 |

### Pendiente de completar (F4/F5)
- [ ] **MS-001:** E2E de salones con 2 peers reales
- [ ] **MS-002:** Preguntas reales en modo estándar de salones
- [ ] **MS-003:** PDF report de resultados de salón
- [ ] **AI-001:** sherpa-onnx real para TTS/ASR (actualmente stubs)
- [ ] **AI-002:** LLM worker + VAD + resume de descarga + registry versionado
- [ ] **SW-001:** Pro = nodo SWAL activo gate + Xavier wiring
- [ ] **PWA-001:** Install prompt completo

---

## 📊 Métricas de Progreso (auditado 2026-07-28)

| Área | Progreso | Meta |
|------|----------|------|
| Colombia — Bundles canónicos | 2447 bundles (ready) | 100% (W01-W40, todas las materias, G3-G11) |
| Packs JSON publicados | 4868 packs en API | 100% de bundles validados |
| Country Readiness — Global | 🔴 0/20 países en 2000 publicadas | 20/20 países |
| Country Readiness — CO | 🟢 ready (2447 bundles canónicos) | 2000 preguntas publicadas |
| Country Readiness — HN | 🟡 validated_not_published (200 bundles) | 2000 preguntas publicadas |
| Country Readiness — CR | 🔴 legacy_or_invalid (200, mayoría dummies) | 2000 preguntas |
| Country Readiness — MX | 🔴 40 bundles (~400 preguntas, ~20%) | 2000 preguntas |
| Country Readiness — AR | 🔴 66 bundles (~660 preguntas, ~33%) | 2000 preguntas |
| Country Readiness — CL | 🔴 50 bundles (~500 preguntas, ~25%) | 2000 preguntas |
| Country Readiness — SV/PR/UY/PY | ⚪ 0 bundles canónicos | 2000 preguntas |
| Geo routing | ✅ 100% | Done |
| Salones mesh-first | 🟡 90% (falta E2E 2 peers, preguntas reales, PDF) | 100% |
| AI Core on-device | 🟡 60% (stubs sherpa-onnx/VAD/worker) | 100% |
| Tests | ❌ vitest/playwright rotos en checkout (#408, 20%) | 70% cobertura |
| Seguridad (secrets #221) | ❌ Diferido con coordinación (F7) | Git history limpio |
| CORS API | ❌ Abierto ('*') | Restringido por origen |

---

*Este archivo se actualiza semanalmente. Para cambios urgentes, actualizar también `.gitcore/planning/` y GitHub Issues.*
