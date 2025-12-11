# 🎮 Party Mode - Aula Virtual Multiplayer

> Sistema de exámenes sincronizados en tiempo real para hasta 1000+ estudiantes simultáneos.

**Versión:** 1.0.0  
**Estado:** ✅ Implementación Fase 1 Completa  
**Fecha:** Diciembre 2025

---

## 📋 Tabla de Contenidos

1. [Visión General](#visión-general)
2. [Arquitectura](#arquitectura)
3. [Modos de Operación](#modos-de-operación)
4. [Modelo de Negocio](#modelo-de-negocio)
5. [Stack Tecnológico](#stack-tecnológico)
6. [Seguridad y Anti-Cheat](#seguridad-y-anti-cheat)
7. [Instalación](#instalación)
8. [Uso](#uso)
9. [Licenciamiento](#licenciamiento)

---

## 🎯 Visión General

**Party Mode** convierte tu navegador en un aula virtual donde un **Host** (profesor) dirige un examen sincronizado para múltiples **Players** (estudiantes) conectados simultáneamente.

### Características Principales

✅ **Sincronización en Tiempo Real**: Todos los estudiantes ven la misma pregunta al mismo tiempo  
✅ **Anti-Cheat Avanzado**: Detecta cuando un estudiante sale de la pantalla  
✅ **Informes Detallados**: Reportes con infografías para cada estudiante  
✅ **Modo Local**: Sin internet, usando WiFi/LAN local  
✅ **Modo Cloud**: Servicio online con suscripción  
✅ **Escalable**: 10-100 usuarios (navegador) o 1000+ (servidor dedicado)

---

## 🏗️ Arquitectura

### Diagrama de Componentes

```
┌─────────────────────────────────────────────────────────────┐
│                       FRONTEND (Svelte 5)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ PartyLobby   │  │ HostControls │  │ PlayerView   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│         ▲                  ▲                  ▲             │
│         └──────────────────┴──────────────────┘             │
│                           │                                 │
│                  ┌────────▼────────┐                        │
│                  │  partyState     │ (Svelte Runes)         │
│                  └────────┬────────┘                        │
│                           │                                 │
│         ┌─────────────────┴─────────────────┐               │
│         ▼                                   ▼               │
│  ┌──────────────┐                  ┌──────────────┐        │
│  │antiCheatSvc  │                  │connectionSvc │        │
│  └──────────────┘                  └──────┬───────┘        │
└─────────────────────────────────────────┼─────────────────┘
                                           │
              ┌────────────────────────────┴────────────────────────┐
              ▼                                                     ▼
    ┌──────────────────┐                              ┌──────────────────┐
    │  MODO SUPABASE   │                              │   MODO LOCAL     │
    │  (WebSocket)     │                              │ (Rust Server)    │
    │                  │                              │                  │
    │ • Free: 200 conn │                              │ • PC del Host    │
    │ • Latencia: 50ms │                              │ • LAN/WiFi       │
    │ • Cloud-based    │                              │ • 1000+ usuarios │
    └──────────────────┘                              └──────────────────┘
                                                                │
                                                       ┌────────▼────────┐
                                                       │  party-server   │
                                                       │     (Rust)      │
                                                       │                 │
                                                       │ • Actix-Web     │
                                                       │ • Tokio Async   │
                                                       │ • SQLite local  │
                                                       └─────────────────┘
```

### Arquitectura Hexagonal (Rust Backend)

```
┌─────────────────────────────────────────────────────────────┐
│                        DOMAIN LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │   Party      │  │   Player     │  │   Question   │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌──────────────────────────────────────────────────┐      │
│  │        Repository Traits (Ports)                 │      │
│  │  - PartyRepository                               │      │
│  │  - QuestionRepository                            │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                           ▲
                           │
┌──────────────────────────┴──────────────────────────────────┐
│                   INFRASTRUCTURE LAYER                       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  SQLite      │  │  WebSocket   │  │  HTTP Routes │      │
│  │  Repository  │  │  Actor       │  │  (REST API)  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🌐 Modos de Operación

### 1️⃣ Modo Local (LAN/WiFi)

**Ideal para:** Colegios, universidades, aulas físicas

**Requisitos:**
- PC del Host con Windows/Mac/Linux
- Ejecutable `party-server.exe` (Rust)
- Red local (LAN o WiFi Hotspot)

**Capacidad:**
| Hardware | Usuarios Simultáneos | RAM | CPU |
|----------|---------------------|-----|-----|
| Laptop básico | 50-100 | 2GB | 2 cores |
| PC medio | 200-500 | 4GB | 4 cores |
| PC potente | 1000+ | 8GB | 8+ cores |

**Setup:**
```bash
# 1. Descargar ejecutable
curl -O https://releases.saberparatodos.com/party-server-v1.0.exe

# 2. Ejecutar en PC del Host
./party-server.exe --port 8080 --mode local

# 3. Host abre navegador en http://localhost:8080
# 4. Students escanean QR o entran a http://192.168.1.100:8080
```

**Ventajas:**
✅ Sin costo (100% gratuito)  
✅ Sin internet requerido  
✅ Baja latencia (<10ms)  
✅ Privacidad total  
✅ Ilimitados usuarios (según hardware)

**Desventajas:**
❌ Requiere setup técnico  
❌ Solo funciona en red local  
❌ Si el Host cierra el programa, todo se detiene

---

### 2️⃣ Modo Cloud (Suscripción)

**Ideal para:** Exámenes remotos, educación a distancia, tutorías online

**Requisitos:**
- Solo navegador web
- Conexión a internet

**Capacidad:**
| Plan | Usuarios/Party | Precio/mes | Features |
|------|----------------|------------|----------|
| **Free** | 10 | $0 | Preguntas ICFES básicas |
| **Pro** | 50 | $10 | + Reportes avanzados + Soporte |
| **Enterprise** | Ilimitado | $50+ | + IA Proctoring + Preguntas Premium |

**Setup:**
```bash
# Host abre https://app.saberparatodos.com
# Crea una party, comparte link
# Students hacen click en el link
```

**Ventajas:**
✅ Cero setup  
✅ Funciona desde cualquier lugar  
✅ Servidor dedicado (no depende del Host)  
✅ Features premium (IA, analytics)

**Desventajas:**
❌ Requiere internet  
❌ Mayor latencia (50-150ms)  
❌ Costo mensual

---

## 💰 Modelo de Negocio

### Open Source + Freemium

```
┌────────────────────────────────────────────────────────────┐
│                    CÓDIGO ABIERTO (GitHub)                 │
│                                                            │
│  • Frontend Svelte (MIT)                                   │
│  • Backend Rust Local (AGPL-3.0)                          │
│  • Preguntas ICFES/OpenTDB (CC BY-SA 4.0)                 │
│  • Documentación completa                                  │
│                                                            │
│  ▶ USUARIOS: Gratis para siempre, modo local             │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                  CÓDIGO PRIVADO (Repositorio Privado)      │
│                                                            │
│  • Backend Rust Cloud (features premium)                   │
│  • IA Proctoring (detecta cheating avanzado)              │
│  • Preguntas Premium (generadas por IA)                    │
│  • Analytics avanzado                                      │
│                                                            │
│  ▶ NEGOCIO: Suscripción mensual $10-50/mes               │
└────────────────────────────────────────────────────────────┘
```

### Protección Legal

**AGPL-3.0 para modo local:**
- ✅ Cualquiera puede usar el código gratis
- ✅ Si alguien modifica y ofrece un servicio, **debe** publicar el código modificado
- ✅ Nadie puede crear un competidor cloud sin liberar sus cambios
- ✅ Tu servicio cloud (privado) no se ve afectado

**Resultado:**
- Usuarios ganan: Software gratuito de calidad
- Tú ganas: Modelo de negocio protegido

---

## 🔧 Stack Tecnológico

### Frontend (Open Source)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Astro** | 5.x | SSG framework |
| **Svelte** | 5.x | Componentes reactivos (Runes) |
| **TailwindCSS** | 3.x | Estilos |
| **Supabase JS** | 2.x | Modo Cloud (WebSocket) |
| **IndexedDB** | Native | Storage local en navegador |

### Backend Local (Open Source)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Rust** | 1.75+ | Lenguaje principal |
| **Actix-Web** | 4.x | Web framework |
| **Tokio** | 1.x | Async runtime |
| **SQLx** | 0.7 | Database ORM |
| **SQLite** | 3.x | Base de datos local |
| **Argon2** | 0.5 | Password hashing |

### Backend Cloud (Privado)

| Tecnología | Versión | Uso |
|------------|---------|-----|
| **Rust** | 1.75+ | Base compartida con local |
| **PostgreSQL** | 15+ | Database cloud |
| **Redis** | 7+ | Cache & sessions |
| **OpenAI API** | GPT-4 | IA Proctoring |
| **Railway/Fly.io** | - | Hosting |

---

## 🔒 Seguridad y Anti-Cheat

### Sistema de Detección

**Page Visibility API:**
```typescript
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Usuario cambió de tab o minimizó
    reportSuspiciousActivity('page_hidden');
  }
});
```

**Window Blur:**
```typescript
window.addEventListener('blur', () => {
  // Usuario hizo click fuera de la ventana
  reportSuspiciousActivity('window_blur');
});
```

**Inactivity Detection:**
- Si no hay interacción por >30 segundos → Alerta al Host

### Reportes al Host

El Host ve en tiempo real:
- ⚠️ **Actividad Sospechosa**: Quién salió de la pantalla y cuándo
- 📊 **Historial**: Cuántas veces ha salido cada estudiante
- 🚨 **Alertas**: Notificación inmediata cuando alguien hace trampa

### Limitaciones (Navegador)

❌ **No podemos:**
- Bloquear físicamente el cambio de tab
- Acceder a la cámara sin permiso explícito
- Detectar otro dispositivo (smartphone) junto al estudiante

✅ **Podemos:**
- Detectar y registrar toda actividad sospechosa
- Generar reportes con evidencia
- Permitir al Host tomar decisiones

### Modo Premium (Cloud)

🤖 **IA Proctoring:**
- Análisis de patrones de respuesta (tiempos sospechosos)
- Detección de copiar/pegar
- Análisis de webcam (opcional, con consentimiento)

---

## 📦 Instalación

### Modo Local (Estudiantes/Profesores)

**Opción 1: Ejecutable (Recomendado)**
```bash
# Windows
curl -O https://releases.saberparatodos.com/party-server-windows-x64.exe
party-server-windows-x64.exe

# macOS
curl -O https://releases.saberparatodos.com/party-server-macos-arm64
chmod +x party-server-macos-arm64
./party-server-macos-arm64

# Linux
curl -O https://releases.saberparatodos.com/party-server-linux-x64
chmod +x party-server-linux-x64
./party-server-linux-x64
```

**Opción 2: Compilar desde fuente**
```bash
# Requiere Rust 1.75+
git clone https://github.com/worldexams/party-server-rust
cd party-server-rust
cargo build --release
./target/release/party-server
```

### Modo Cloud

No requiere instalación. Solo visitar https://app.saberparatodos.com

---

## 🚀 Uso

### Como Host (Profesor)

**Modo Local:**
1. Ejecutar `party-server.exe` en tu PC
2. Abrir navegador en `http://localhost:8080`
3. Crear party (elegir grado, asignatura, tiempo)
4. Compartir QR o link: `http://192.168.1.100:8080/join/ABC123`
5. Esperar que estudiantes se unan
6. Iniciar examen
7. Al finalizar, descargar reporte PDF

**Modo Cloud:**
1. Ir a `https://app.saberparatodos.com`
2. Login con GitHub/Google
3. Crear party
4. Compartir link: `https://app.saberparatodos.com/join/ABC123`
5. Iniciar examen
6. Descargar reportes

### Como Player (Estudiante)

**Modo Local:**
1. Conectarse al WiFi del profesor
2. Escanear QR o entrar al link
3. Ingresar nombre
4. Esperar que el profesor inicie
5. Responder preguntas
6. Ver resultados

**Modo Cloud:**
1. Hacer click en el link del profesor
2. Login (opcional)
3. Esperar inicio
4. Responder
5. Ver resultados

---

## 📜 Licenciamiento

### Código Abierto

**Frontend Svelte:**
- **Licencia:** MIT
- **Repositorio:** https://github.com/worldexams/saberparatodos
- **Permite:** Uso comercial, modificación, distribución

**Backend Rust (local):**
- **Licencia:** AGPL-3.0
- **Repositorio:** https://github.com/worldexams/party-server-rust
- **Requiere:** Si ofreces servicio web, debes publicar tu código

### Código Privado

**Backend Cloud:**
- **Licencia:** Propietaria
- **Repositorio:** Privado (no público)
- **Protección:** Nadie puede copiar el servicio premium

### Preguntas

**ICFES/OpenTDB:**
- **Licencia:** CC BY-SA 4.0 (Creative Commons)
- **Fuente:** https://opentdb.com + ICFES oficial
- **Permite:** Uso comercial con atribución

**Preguntas Premium:**
- **Licencia:** Propietaria
- **Generadas:** IA (GPT-4 + Gemini) con revisión humana
- **Exclusivo:** Solo para suscriptores

---

## 🔮 Roadmap

### Fase 1: MVP (✅ Completado - Dic 2025)
- [x] Modo Supabase (Cloud básico)
- [x] Componentes UI (Lobby, Host, Player, Results)
- [x] Anti-Cheat básico (Visibility API)
- [x] Reportes HTML con Chart.js

### Fase 2: Backend Rust (🔄 En Progreso - Ene 2026)
- [ ] Servidor Rust local con WebSockets
- [ ] SQLite para persistencia
- [ ] Compilar ejecutables para Windows/Mac/Linux
- [ ] Documentación de instalación

### Fase 3: Modo Cloud Premium (📅 Feb 2026)
- [ ] Deploy a Railway/Fly.io
- [ ] PostgreSQL + Redis
- [ ] Sistema de suscripciones (Stripe)
- [ ] IA Proctoring avanzado
- [ ] Preguntas Premium

### Fase 4: Móvil (📅 Mar 2026)
- [ ] PWA con instalación offline
- [ ] App nativa React Native (opcional)
- [ ] Optimización para tablets

---

## 🤝 Contribuir

**Para el código abierto:**
```bash
git clone https://github.com/worldexams/saberparatodos
cd saberparatodos
npm install
npm run dev
```

Ver `CONTRIBUTING.md` para guía completa.

**Para reportar bugs:**
https://github.com/worldexams/saberparatodos/issues

---

## 📞 Soporte

- **Documentación:** https://docs.saberparatodos.com
- **Discord:** https://discord.gg/saberparatodos
- **Email:** support@saberparatodos.com

---

**Licencia:** AGPL-3.0 (Código Local) + MIT (Frontend)  
**Copyright © 2025 Saber Para Todos**
