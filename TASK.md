# Gestión de Tareas: World Exams Organization

Última actualización: 2026-03-05

## 🎯 Resumen Ejecutivo y Estado Actual

- [x] **Monetización & Tutorías:** Plan aprobado y documentado.
- [ ] **Despliegue Producción:** En progreso (bloqueado por validación de bundles).
- [ ] **Corrección Error 500:** Verificando estabilidad post-build.
- [x] **Ocultar Blog:** Implementado (verificando en prod).

## 🚀 Sprint Actual: Despliegue y Estabilidad

### ✅ Tareas Completadas
- [x] Build de producción (`npm run build`).
- [x] Pruebas E2E exitosas (`tests/e2e-smoke-tag.spec.ts`, `tests/auth-leaderboard-smoke.spec.ts`).
- [x] Identificación de errores de validación en bundles v4.0.

### ⚙️ En Progreso
- [ ] Corregir errores de formato en `CO-ENG-09-heritage-002-PRO-v4-bundle.md`.
- [ ] Corregir bloques de ID faltantes en `CO-ENG-11-capstone-002-CEFR-v4-bundle.md` y `CO-ENG-11-future-work-002-CEFR-v4-bundle.md`.
- [ ] Ejecutar `pwsh .\scripts\deploy-manual.ps1` tras validación exitosa.

### 📋 Próximos Pasos
1. Finalizar corrección manual de bundles.
2. Validar con `npm run validate`.
3. Desplegar a `saberparatodos.space`.
4. Verificar "Blog Hidden" en producción.
