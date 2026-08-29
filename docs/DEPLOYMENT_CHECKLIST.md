# 🚀 Protocolo Estándar de Despliegue y Checklist de Calidad (SWAL Deployment Protocol)

Este documento define el **protocolo canónico universal** para preparar, validar, desplegar y verificar aplicaciones web, APIs y microservicios en el ecosistema SWAL y WorldExams.

---

## 📋 1. Fase Pre-Flight (Validaciones Previas Locales)

Antes de fusionar ramas o iniciar un despliegue, deben cumplirse obligatoriamente los siguientes pasos en la máquina local:

- [ ] **1.1 Validación de Secretos y Variables de Entorno**:
  * Ejecutar script de seguridad para evitar fuga de tokens:
    ```bash
    npm run test # o bash scripts/validate-secrets.sh
    ```
  * Confirmar que el archivo `.env` local no contenga claves productivas que deban permanecer exclusivamente en Cloudflare / GitHub Secrets.

- [ ] **1.2 Calidad de Código y Tipado (Lint & Types)**:
  * Cero errores y cero advertencias bloqueantes:
    ```bash
    npm run lint
    pnpm --filter saberparatodos exec tsc --noEmit
    ```

- [ ] **1.3 Pruebas Unitarias de Lógica y Algoritmos**:
  * Ejecutar la suite completa de Vitest:
    ```bash
    pnpm --filter saberparatodos exec vitest run
    ```
  * **Criterio de Aceptación:** 100% de pruebas aprobadas (`541/541 passed`).

- [ ] **1.4 Pruebas End-to-End (E2E) en Navegador Real**:
  * Ejecutar la suite crítica de Playwright:
    ```bash
    pnpm --filter saberparatodos exec playwright test tests/e2e/prod-critical-path-dedup.spec.ts
    ```
  * **Criterios de Aceptación:**
    1. Cero errores 502 / 404 en llamadas de API de paquetes.
    2. Rotación y desduplicación de preguntas funcionando entre sesiones.
    3. Persistencia en IndexedDB y generación de informes de resultados.

- [ ] **1.5 Compilación Limpia de Producción (Production Build)**:
  * Compilar todas las aplicaciones del monorepo:
    ```bash
    pnpm run build:workspaces
    # o: pnpm --filter saberparatodos build
    ```
  * Verificar que no haya advertencias de assets rotos o fallos de SSR.

---

## 🚀 2. Fase de Despliegue (Release & CI/CD Execution)

- [ ] **2.1 Sincronización GitOps (Doble Upstream)**:
  * Ejecutar la sincronización hacia el fork y la organización:
    ```bash
    npm run sync:upstream
    ```
  * Sincronizar tanto `main` (Producción) como `develop` (Desarrollo).

- [ ] **2.2 Monitoreo de Pipelines en GitHub Actions / Cloudflare**:
  * Verificar que el workflow `deploy-production.yml` se ejecute en `ubuntu-latest` sin quedarse en cola.
  * Comprobar que los jobs de Cloudflare Pages / Workers completen la publicación del build.

- [ ] **2.3 Despliegue Manual Alternativo (Si se usa CLI directo)**:
  ```bash
  pnpm --filter saberparatodos run deploy
  ```

---

## 🩺 3. Fase Post-Deployment (Smoke Tests & Verificación en Vivo)

Una vez completado el despliegue, realizar la verificación en producción en caliente:

- [ ] **3.1 Verificación de Salud de Endpoints (HTTP 200 OK)**:
  * Frontend: `curl -I https://saberparatodos.space`
  * API Gateway: `curl -I https://api.saberparatodos.space/v1/health`
  * Paquete Canónico: `curl -I https://saberparatodos.space/api/packs/co-week-1-grade-11-subject-matematicas.json`

- [ ] **3.2 Prueba de Navegación de Usuario (Manual o Sintética)**:
  * [ ] Abrir `https://saberparatodos.space` en modo incógnito (para evitar caché residual).
  * [ ] Cambiar de país en el selector y verificar que el banner y las materias correspondan al país.
  * [ ] Iniciar un examen de 10 preguntas y finalizarlo.
  * [ ] Abrir el informe de resultados (`Ver informe`) y comprobar que el MMR y desglose se calculen correctamente.
  * [ ] Verificar que no haya errores `502` ni `404` en la consola del navegador (`F12`).

- [ ] **3.3 Invalidación de Caché (Si aplica)**:
  * Si los cambios visuales no se reflejan de inmediato debido a CDNs o PWA Service Workers:
    * En el navegador: `Ctrl + Shift + R` (Hard Reload).
    * En Cloudflare Dashboard: *Caching > Configuration > Purge Cache (Purge Everything)*.

---

## 🏷️ 4. Registro y Cierre

- [ ] Actualizar [CHANGELOG.md](file:///home/belal/proyectosSWAL/apps/worldexams/docs/CHANGELOG.md) con la versión desplegada y el resumen de cambios.
- [ ] Verificar que la etiqueta Git (`tag`) coincida con la versión del monorepo (`v0.15.3`).
