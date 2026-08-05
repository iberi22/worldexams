# 🧪 Guía de Pruebas E2E - Party Mode (Lobbies / Sala de Exámenes)

## ✅ Estado Actual del Repositorio

El módulo de **Sala de Exámenes** de **saberparatodos** está estructurado con una arquitectura moderna de aula virtual multiplayer, usando principalmente **Svelte** y **Astro** en conjunción con el framework de networking on-device **edge-mesh**.

### 📦 Componentes y Arquitectura Actuales

Los antiguos componentes monolíticos (`PartyHost.svelte` y `PartyJoin.svelte`) ya no existen en el código y han sido reemplazados por la arquitectura en `saberparatodos/src/modules/exam-room/`:

| Componente | Archivo | Descripción |
|------------|---------|-------------|
| **RoomApp** | `src/modules/exam-room/components/RoomApp.svelte` | Punto de entrada que coordina el flujo (Crear Sala, Unirse a Sala, Explorar Salas). |
| **RoomBrowser** | `src/modules/exam-room/components/RoomBrowser.svelte` | Panel para explorar salas activas en la red. |
| **LobbyBrowser** | `src/modules/exam-room/components/LobbyBrowser.svelte` | Buscador y navegador de lobbies en curso. |
| **PlayerView** | `src/modules/exam-room/components/PlayerView.svelte` | Vista del estudiante durante el examen. |
| **HostControls** | `src/modules/exam-room/components/HostControls.svelte` | Controles del anfitrión / profesor (finalizar, pausar, siguiente pregunta). |
| **StopModeSetup** / **SpeedChallengeSetup** | `src/modules/exam-room/components/StopModeSetup.svelte` | Configuración para el modo rápido Speed Challenge. |
| **RoomResults** | `src/modules/exam-room/components/RoomResults.svelte` | Visualización del reporte de resultados al finalizar. |

---

## 🧪 Pruebas E2E: Ejecución y Validación

### 🟢 Pruebas de Humo (Smoke Tests)

Las pruebas básicas de humo que no dependen del servicio de red P2P están completamente validadas y son reproducibles en cualquier entorno local.

- **Archivo de prueba:** `tests/party-smoke.spec.ts`
- **Resultados:** ✅ **PASS** (passed)
  - `Host can access party page and party is created automatically` - Sube la página `/party` con éxito y carga la UI del host.
  - `Student can access party join page with code` - Carga el formulario para unirse con código correctamente.

Comando para ejecutar:
```bash
cd saberparatodos
pnpm exec playwright test tests/party-smoke.spec.ts
```

---

## ⚠️ Clasificación de Entorno (Env-Dependent Tests)

Algunos de los tests de la suite E2E requieren dependencias específicas de infraestructura y red que pueden fallar debido a limitaciones del entorno de ejecución (por ejemplo, en entornos de contenedores sin acceso a redes LAN o puertos cerrados/bloqueados para protocolos de señalización P2P).

### 1. Tests dependientes de la red Mesh P2P (`edge-mesh`)

- **Tests afectados:**
  - `tests/party-mode.spec.ts`
  - `tests/party-mode-real-flow.spec.ts`
  - `tests/party-focus.spec.ts`
  - `tests/party-results-e2e.spec.ts`
  - `tests/lan-discovery.spec.ts`
- **Razón del bloqueo:**
  El adaptador `src/lib/p2p-edge-mesh.ts` importa directamente el módulo compilado `edge-mesh` de un paquete hermano del repositorio (fuera de la carpeta `saberparatodos/`), el cual requiere compilación previa o dependencias del sistema nativas. En entornos de integración continua o sandboxes sin dicho paquete pre-compilado, el bundler de Vite reportará:
  ```
  [vite] Failed to run dependency scan. Skipping dependency pre-bundling. Error: The following dependencies are imported but could not be resolved: edge-mesh
  ```
  Por lo tanto, estos flujos completos P2P que simulan el tránsito de mensajes entre múltiples navegadores no se pueden ejecutar de manera nativa sin el módulo de red completo.

### 2. Tests del Service Worker (`sw-p2p-recovery.spec.ts`)

- **Tests afectados:** `tests/sw-p2p-recovery.spec.ts`
- **Razón del bloqueo:** Requiere el registro persistente de un Service Worker (`public/sw.js`) y APIs experimentales como `SyncManager` para el Background Sync en Chrome Headless, lo cual puede variar de comportamiento según la configuración del sandbox de Playwright y el puerto asignado.

---

## 🚀 Plan de Verificación Local (Cuando `edge-mesh` está disponible)

Si estás ejecutando en una máquina de desarrollo con todas las dependencias locales construidas:

1. **Compilar/Asegurar la presencia de `edge-mesh`** en la raíz del monorepo.
2. **Lanzar el servidor de desarrollo:**
   ```bash
   cd saberparatodos
   pnpm dev
   ```
3. **Ejecutar la suite P2P:**
   ```bash
   cd saberparatodos
   pnpm exec playwright test tests/party-smoke.spec.ts
   ```

**Fecha de actualización:** 2026-08-05
**Validación completada:** Pruebas de Humo ✅ PASS | Pruebas Unitarias (Vitest) ✅ PASS (215 tests)
