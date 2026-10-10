# 📱 Roadmap: Aplicaciones Nativas (Fase Final)

**Estado:** 🔮 Futuro (después de PWA estable)
**Fecha planeada:** Q2 2026
**Prioridad:** BAJA

---

## 🎯 Contexto

Actualmente, **Party Mode es 100% web** (PWA). Esta arquitectura cubre el 95% de los casos de uso y funciona perfectamente en:

- ✅ Android (Chrome, Samsung Internet)
- ✅ iOS/iPadOS (Safari)
- ✅ Desktop (Chrome, Edge, Firefox)
- ✅ Instalable desde navegador (PWA)

Sin embargo, para casos de uso **premium** o **corporativos**, podríamos desarrollar apps nativas en el futuro.

---

## 📊 Por qué NO priorizamos apps nativas ahora

| Aspecto | PWA (Actual) | App Nativa |
|---------|--------------|------------|
| **Desarrollo** | 1 codebase | 2-3 codebases (iOS/Android/Desktop) |
| **Costo** | $0 (Cloudflare gratis) | $99/año (Apple) + $25 (Google) |
| **Actualización** | Deploy automático | Review stores (1-7 días) |
| **Alcance** | iOS + Android + Desktop | iOS o Android (separado) |
| **Permisos** | Limitados (Web API) | Full access (cámara, notificaciones, GPS) |
| **Offline** | Service Worker (limitado) | Full offline (SQLite local) |

**Conclusión:** PWA es suficiente para MVP y validación del mercado.

---

## 🚀 Cuándo considerar apps nativas

### Triggers para desarrollo nativo:

1. **Alcance:** >10,000 usuarios activos mensuales usando Party Mode
2. **Demanda:** Solicitudes recurrentes de features específicas nativas
3. **Competencia:** Competidores con apps nativas mejor posicionadas

### Features que requieren apps nativas:

- **Notificaciones push avanzadas** (más allá de Web Push)
- **Modo offline completo** (base de datos local SQLite)
- **Integración con calendarios nativos** (agregar exámenes)
- **Grabación de pantalla/video** (anti-cheat avanzado)
- **Acceso a cámara frontal** (proctoring facial)
- **Widgets de home screen** (próximos exámenes)

---

## 🛠️ Stack Tecnológico (Propuesto)

### Opción 1: React Native + Expo (Recomendado)

**Pros:**
- Un codebase para iOS + Android
- Reutiliza lógica de Svelte/TypeScript
- Hot reload, OTA updates
- Expo SDK (notificaciones, cámara, etc.)

**Cons:**
- Performance inferior a nativo puro
- Limitaciones de Expo (puede expulsar a bare workflow)

```bash
# Estructura propuesta
worldexams/
├── party-native/               # Nueva app nativa
│   ├── app/                   # Expo Router (screens)
│   ├── components/
│   ├── lib/
│   │   └── supabase.ts       # Mismo cliente Supabase
│   ├── package.json
│   └── app.json              # Expo config
```

### Opción 2: Flutter (Alternativa)

**Pros:**
- Performance nativa (compilado a ARM)
- UI consistente (Material/Cupertino)
- Comunidad grande

**Cons:**
- Nuevo lenguaje (Dart)
- No reutiliza código TypeScript existente

### Opción 3: Tauri v2 (para Desktop)

**Pros:**
- Mismo stack (Rust + Svelte)
- Binarios ligeros (3-5MB)
- Acceso a sistema de archivos

**Cons:**
- Solo desktop (no mobile)
- Ecosistema más pequeño

---

## 📋 Plan de Implementación (Cuando sea el momento)

### Fase 1: Validación (1 mes)
- [ ] Encuesta a usuarios: ¿instalarían una app nativa?
- [ ] Análisis de competencia (apps de exámenes)
- [ ] Prototipo básico con Expo
- [ ] Testing con 10 usuarios beta

### Fase 2: MVP Nativo (2 meses)
- [ ] Crear party desde app
- [ ] Unirse a party escaneando QR
- [ ] Notificaciones push (nuevas preguntas)
- [ ] Modo offline básico (caché de respuestas)

### Fase 3: Features Premium (3 meses)
- [ ] Proctoring facial (cámara frontal)
- [ ] Grabación de pantalla (anti-cheat)
- [ ] Calendario (próximos exámenes)
- [ ] Widgets de home screen

### Fase 4: Publicación (1 mes)
- [ ] App Store (iOS)
- [ ] Google Play (Android)
- [ ] Marketing (landing page, video demo)

**Total estimado:** 7 meses de desarrollo full-time.

---

## 💰 Costos Estimados

| Concepto | Costo (USD) | Frecuencia |
|----------|-------------|------------|
| Apple Developer Program | $99 | Anual |
| Google Play Console | $25 | Una vez |
| Expo EAS Build (Pro) | $29 | Mensual |
| OTA Updates (CodePush) | $0 | Gratis |
| Notificaciones Push (Firebase) | $0 | Gratis (free tier) |
| **Total Year 1** | **$453** | - |

---

## 🔒 Código Deprecado (Preservado para Referencia)

El código de `host-app/` (Tauri Android) y `party-server-rust/` está **deprecado** pero se mantiene en el repositorio para:

1. **Aprendizaje:** Ver qué NO funcionó (servidor embebido)
2. **Referencia:** Reutilizar lógica si hacemos app nativa futura
3. **Historial:** Documentar decisiones arquitectónicas

**Ubicación:**
- `host-app/` → App Android Tauri (deprecated)
- `party-server-rust/` → Servidor Rust embebido (deprecated)
- `party-server-cloud/` → Experimentos cloud (deprecated)

**Ignorado en:**
- `.gitignore` (no se deployará)
- `.github/workflows/build-party-server.yml` (workflow deshabilitado)

---

## 📚 Referencias

- [PWA vs Native Apps - 2025](https://web.dev/progressive-web-apps/)
- [Expo Documentation](https://docs.expo.dev/)
- [Supabase React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-react-native)
- [Tauri v2 Mobile](https://beta.tauri.app/guides/prerequisites/mobile/)

---

**Decisión:** Mantener foco en PWA hasta validar product-market fit.
**Revisión:** Q1 2026 (evaluar métricas de uso)

---

*Última actualización: 2025-12-11*
