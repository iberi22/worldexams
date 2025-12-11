# 📶 Estrategia Offline & Local Mode

> **Objetivo:** Permitir la realización de exámenes grupales (Party Mode) en entornos sin acceso a internet o con conectividad limitada, utilizando un dispositivo del docente como servidor local.

---

## 1. Análisis de Viabilidad

### Opción A: PWA (Progressive Web App) ❌
*   **Concepto:** El docente abre la web en su navegador y actúa como servidor.
*   **Limitación:** Los navegadores **no permiten** abrir puertos TCP/HTTP (socket listening) por seguridad.
*   **Conclusión:** Una PWA no puede servir archivos ni API a otros dispositivos en la red Wi-Fi. Solo serviría para WebRTC (P2P), lo cual es complejo e inestable para >10 conexiones.

### Opción B: Aplicación Nativa (Tauri v2) ✅
*   **Concepto:** Una aplicación instalable (Windows/Android) que contiene el servidor Rust embebido.
*   **Funcionamiento:**
    1.  La app inicia un servidor HTTP local (ej: puerto 8080).
    2.  La app muestra la IP local y un código QR.
    3.  Los estudiantes se conectan vía Wi-Fi usando el navegador de sus celulares (sin instalar nada).
*   **Stack:** Svelte 5 (Frontend) + Rust (Backend) + Tauri (Container).
*   **Viabilidad:** Alta. Reutiliza el 90% del código existente.

---

## 2. Arquitectura Propuesta: "World Exams Host"

### Componentes

1.  **Host App (Docente):**
    *   **Tecnología:** Tauri v2 (Windows, macOS, Linux, Android).
    *   **Rol:** Servidor HTTP/WebSocket + Panel de Control.
    *   **Core:** `party-server-rust` embebido como librería o sidecar.

2.  **Client Web (Estudiantes):**
    *   **Tecnología:** Navegador Web Estándar (Chrome, Safari).
    *   **Rol:** Jugador.
    *   **Conexión:** HTTP/WS directo a la IP del Host.

### Flujo de Usuario

1.  **Docente** descarga e instala "World Exams Host".
2.  **Docente** conecta su dispositivo al Wi-Fi del aula (o crea un Hotspot móvil).
3.  **Docente** abre la app y selecciona "Crear Examen Local".
4.  La app inicia el servidor en `http://192.168.1.5:8080`.
5.  La app muestra un **QR Gigante** en pantalla.
6.  **Estudiantes** escanean el QR y entran al examen desde sus navegadores.
7.  El examen ocurre en la red local (latencia <10ms, sin internet).

---

## 3. Roadmap de Implementación

### Fase 1: Refactorización del Servidor (Rust)
*   Convertir `party-server-rust` de binario standalone a librería (`lib.rs`).
*   Permitir inyección de configuración (puerto, path de base de datos) desde código.

### Fase 2: Integración con Tauri (Desktop)
*   Crear proyecto Tauri en `worldexams/host-app`.
*   Integrar frontend de `saberparatodos` (modo SPA).
*   Invocar el servidor Rust en un thread separado al iniciar la app.
*   Detectar IP local y generar QR.

### Fase 3: Soporte Android (Tauri Mobile)
*   Configurar builds para Android.
*   Gestionar permisos de red y background services en Android.
*   Compilar APK para distribución directa (sideloading) o Play Store.

---

## 4. Ventajas del Enfoque

1.  **Cero Fricción para Estudiantes:** No necesitan instalar nada, ni tener cuenta, ni internet.
2.  **Privacidad Total:** Los datos quedan en el dispositivo del docente.
3.  **Resiliencia:** Funciona en zonas rurales o con internet intermitente.
4.  **Performance:** La red local es mucho más rápida que la nube para tiempo real.
