# 🌐 Party Mode: Arquitectura 100% Web (PWA)

**Fecha:** 11 de diciembre de 2025
**Decisión:** Eliminar dependencia de APK Android. Todo funciona desde `saberparatodos.pages.dev`

---

## 🎯 Visión

**Party Mode es una PWA** que permite a cualquier profesor/estudiante:

1. Abrir `saberparatodos.pages.dev/party`
2. Crear una "party" (examen sincronizado)
3. Compartir el link por WhatsApp/Telegram/email
4. Los estudiantes se unen desde cualquier dispositivo
5. El host controla las preguntas en tiempo real
6. Todos ven resultados al final

**Sin necesidad de instalar nada.** Solo un navegador.

---

## 🏗️ Arquitectura

```
┌──────────────────────────────────────────────────────────────┐
│  HOST (Web Browser)                                          │
│  https://saberparatodos.pages.dev/party                      │
│  ├─ Crea party en Supabase                                   │
│  ├─ Genera link: /party?join=ABC123                          │
│  ├─ Comparte vía WhatsApp/Telegram/Clipboard                │
│  ├─ Controla: siguiente pregunta, pausar, finalizar          │
│  └─ Ve estudiantes en tiempo real (presence)                │
└──────────────────────────────────────────────────────────────┘
           │
           ▼ Comparte link
           │
┌──────────────────────────────────────────────────────────────┐
│  STUDENTS (Web Browser - mismo o diferente dispositivo)      │
│  https://saberparatodos.pages.dev/party?join=ABC123          │
│  ├─ Ingresan nombre                                          │
│  ├─ Se unen a la party                                       │
│  ├─ Ven preguntas sincronizadas                              │
│  ├─ Envían respuestas                                        │
│  └─ Ven resultados al final                                  │
└──────────────────────────────────────────────────────────────┘
           │
           ▼ Todos conectados vía Realtime
           │
┌──────────────────────────────────────────────────────────────┐
│  SUPABASE REALTIME (WebSocket automático)                    │
│  ├─ Channel: party:ABC123                                    │
│  ├─ Broadcast: question_start, answer_submit, party_end      │
│  ├─ Presence: tracking de estudiantes online/offline         │
│  └─ Database: party_sessions table                           │
└──────────────────────────────────────────────────────────────┘
```

---

## 🎮 Flujos de Uso

### 1. Host crea party

```typescript
// saberparatodos/src/components/PartyHost.svelte

async function createParty() {
  const code = generatePartyCode(); // ABC123

  const { data } = await supabase
    .from('party_sessions')
    .insert({
      party_code: code,
      host_name: 'Profesor X',
      exam_config: {
        subject: 'matematicas',
        grade: 11,
        num_questions: 20
      }
    })
    .select()
    .single();

  // Generar link para compartir
  const shareUrl = `https://saberparatodos.pages.dev/party?join=${code}`;

  // Copiar al clipboard
  navigator.clipboard.writeText(shareUrl);

  // O compartir vía Web Share API (mobile)
  if (navigator.share) {
    navigator.share({
      title: 'Únete al examen',
      text: `Código: ${code}`,
      url: shareUrl
    });
  }
}
```

### 2. Students se unen

```typescript
// saberparatodos/src/components/PartyJoin.svelte

async function joinParty(name: string) {
  const studentId = crypto.randomUUID();

  // Actualizar party_sessions con nuevo estudiante
  await supabase
    .from('party_sessions')
    .update({
      students: supabase.raw(`array_append(students, '${JSON.stringify({
        id: studentId,
        name,
        joined_at: new Date().toISOString()
      })}'::jsonb)`)
    })
    .eq('party_code', code);

  // Subscribe a Realtime
  channel = supabase.channel(`party:${code}`)
    .on('broadcast', { event: 'question_start' }, handleQuestion)
    .subscribe();
}
```

### 3. Host controla preguntas

```typescript
// Host envía pregunta
function startQuestion(questionIndex: number) {
  channel.send({
    type: 'broadcast',
    event: 'question_start',
    payload: {
      question_index: questionIndex,
      question_id: questions[questionIndex].id,
      question_text: questions[questionIndex].enunciado,
      options: questions[questionIndex].options,
      time_limit: 60,
      started_at: Date.now()
    }
  });
}
```

### 4. Students responden

```typescript
// Student envía respuesta
function submitAnswer(answer: string) {
  channel.send({
    type: 'broadcast',
    event: 'answer_submit',
    payload: {
      student_id: studentId,
      student_name: studentName,
      question_id: currentQuestion.question_id,
      answer,
      time_taken: Math.floor((Date.now() - currentQuestion.started_at) / 1000)
    }
  });
}
```

---

## 💰 Modelo Freemium

### Free Tier (Supabase Free)

**Límites:**
- **1 party activa por hora** por usuario/IP
- **Máximo 10 estudiantes** por party
- **Sin análisis IA** (solo resultados básicos)
- **Parties expiran en 2 horas**

**Implementación:**

```sql
-- Rate limiting en party_sessions
CREATE OR REPLACE FUNCTION check_party_limit()
RETURNS TRIGGER AS $$
DECLARE
  recent_parties INT;
BEGIN
  -- Contar parties creadas en última hora desde mismo host
  SELECT COUNT(*) INTO recent_parties
  FROM party_sessions
  WHERE created_at > NOW() - INTERVAL '1 hour'
    AND host_name = NEW.host_name;

  IF recent_parties >= 1 THEN
    RAISE EXCEPTION 'Free tier limit: 1 party/hora. Espera % minutos.',
      CEIL(EXTRACT(EPOCH FROM (MIN(created_at) + INTERVAL '1 hour' - NOW())) / 60)
      FROM party_sessions
      WHERE host_name = NEW.host_name
        AND created_at > NOW() - INTERVAL '1 hour';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_party_limit
  BEFORE INSERT ON party_sessions
  FOR EACH ROW
  EXECUTE FUNCTION check_party_limit();
```

### Pro Tier ($5/mes) - Futuro

**Beneficios:**
- ✅ **Parties ilimitadas**
- ✅ **Hasta 100 estudiantes** por party
- ✅ **Análisis IA** (recomendaciones personalizadas)
- ✅ **Exportar resultados** (PDF, Excel)
- ✅ **Parties privadas** (con contraseña)
- ✅ **Historial ilimitado**

---

## 📲 PWA (Progressive Web App)

### Configuración

**1. Manifest (`public/manifest.json`):**

```json
{
  "name": "Saber Para Todos - Party Mode",
  "short_name": "Party Mode",
  "description": "Exámenes sincronizados en tiempo real",
  "start_url": "/party",
  "display": "standalone",
  "background_color": "#0f172a",
  "theme_color": "#2563eb",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**2. Service Worker (caché offline):**

```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('party-mode-v1').then((cache) => {
      return cache.addAll([
        '/party',
        '/assets/main.css',
        '/assets/main.js'
      ]);
    })
  );
});
```

**3. Registro en layout:**

```html
<link rel="manifest" href="/manifest.json" />
<meta name="theme-color" content="#2563eb" />
<meta name="mobile-web-app-capable" content="yes" />
```

---

## 🔒 Seguridad & Anti-Cheat

### 1. Rate Limiting

- Max 1 party/hora (free tier)
- Max 10 estudiantes/party (free tier)
- Implementado con Supabase triggers

### 2. Anti-Spam

- Validar nombres de estudiantes (min 3 caracteres)
- Bloquear IPs con múltiples joins rápidos
- Supabase RLS policies

### 3. Anti-Cheat (Opcional)

```typescript
// Detectar tab switching
document.addEventListener('visibilitychange', () => {
  if (document.hidden && isExamActive) {
    channel.send({
      type: 'broadcast',
      event: 'suspicious_activity',
      payload: {
        student_id: studentId,
        type: 'tab_switch',
        timestamp: Date.now()
      }
    });
  }
});
```

---

## 🧪 Testing Plan

### Fase 1: Setup ✅
- [x] Tabla `party_sessions` creada
- [x] RLS policies configuradas
- [x] Realtime habilitado

### Fase 2: Componentes Web 🔄
- [ ] `PartyHost.svelte` (crear party, controlar)
- [ ] `PartyJoin.svelte` (unirse, responder)
- [ ] UI de compartir (WhatsApp, copy link)

### Fase 3: PWA 🔄
- [ ] `manifest.json`
- [ ] Service worker
- [ ] Iconos 192x512
- [ ] Instalable desde Chrome/Safari

### Fase 4: Freemium 🔄
- [ ] Rate limiting (1 party/hora)
- [ ] Límite de estudiantes (10 max)
- [ ] Mensaje de upgrade a Pro

### Fase 5: Testing E2E ⏳
- [ ] Host crea party
- [ ] Compartir link por WhatsApp
- [ ] 3+ estudiantes se unen
- [ ] Host envía preguntas
- [ ] Students responden
- [ ] Ver resultados sincronizados

---

## 📊 Ventajas vs Android

| Aspecto | Android APK | Web PWA |
|---------|-------------|---------|
| **Instalación** | Google Play, APK manual | Un click (Add to Home) |
| **Actualización** | Rebuild + redistribuir | Deploy automático (Cloudflare) |
| **Compatibilidad** | Solo Android | iOS, Android, Desktop, Web |
| **Desarrollo** | Rust, Tauri, permisos | Solo Svelte + Supabase |
| **Debugging** | adb logcat | DevTools Chrome |
| **Compartir** | QR code complejo | Link directo (WhatsApp) |
| **Costo** | $25 Google Play | $0 (Cloudflare gratis) |

---

## 🚀 Roadmap

### MVP (Dic 2025)
- [x] Schema `party_sessions`
- [ ] `PartyHost.svelte` y `PartyJoin.svelte`
- [ ] Realtime sync (preguntas/respuestas)
- [ ] PWA básica (manifest + iconos)
- [ ] Rate limiting free tier

### v1.0 (Ene 2026)
- [ ] Análisis IA básico (recomendaciones)
- [ ] Exportar resultados (PDF)
- [ ] Parties privadas (contraseña)
- [ ] Pro tier ($5/mes)

### v2.0 (Feb 2026)
- [ ] Video/audio chat (WebRTC)
- [ ] Whiteboard compartido
- [ ] Gamification (puntos, badges)

---

**Aprobado por:** AI Architect
**Fecha:** 2025-12-11
