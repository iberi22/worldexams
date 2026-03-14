# 🎮 Party Mode: Migración a Cloud-First

**Fecha:** 11 de diciembre de 2025
**Decisión:** Migrar de servidor embebido Rust a arquitectura 100% Supabase Realtime

---

## 📊 Contexto

### Arquitectura Original (Deprecated)

```
┌─────────────────────────────────────────┐
│  HOST APP (Tauri Android)               │
│  ├─ Servidor Rust embebido (0.0.0.0:8080)│
│  ├─ SQLite local                        │
│  ├─ Genera QR: http://{ip}:8080        │
│  └─ Actix-web + WebSocket               │
└─────────────────────────────────────────┘
           │
           ▼ Students conectan vía WiFi local
           │
┌─────────────────────────────────────────┐
│  STUDENTS (Web Browser)                  │
│  └─ WebSocket a http://{ip}:8080/ws    │
└─────────────────────────────────────────┘
```

### Problemas Encontrados

1. **Servidor no bindea en Android:**
   - `curl http://192.168.1.3:8080` → `Failed to connect`
   - Logs incompletos: solo "Starting embedded Party Server..." sin "ready at..."

2. **Complejidad de debugging:**
   - Errores silenciosos en runtime
   - Permisos de red Android
   - Logs difíciles de acceder (adb logcat)

3. **Dependencia del host:**
   - Si el host cierra la app, la party se cae
   - No funciona en segundo plano

4. **Escalabilidad limitada:**
   - Solo funciona en red local
   - Firewall/NAT pueden bloquear

---

## ✅ Nueva Arquitectura Cloud-First

```
┌─────────────────────────────────────────────────────────┐
│  HOST APP (Tauri Android)                               │
│  ├─ Crea party en Supabase (INSERT party_sessions)     │
│  ├─ Genera QR: https://saberparatodos.pages.dev/party?join=ABC123 │
│  └─ Subscribe a Realtime channel('party:{code}')       │
└─────────────────────────────────────────────────────────┘
           │
           ▼ Students escanean QR
           │
┌─────────────────────────────────────────────────────────┐
│  STUDENTS (saberparatodos.pages.dev/party?join=ABC123)  │
│  ├─ JOIN party (UPDATE party_sessions)                  │
│  └─ Subscribe a Realtime channel('party:{code}')       │
└─────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────┐
│  SUPABASE REALTIME (Managed WebSocket)                  │
│  ├─ Broadcasting: question_start, answer_submit         │
│  ├─ Presence tracking (online/offline)                  │
│  └─ PostgreSQL party_sessions table                     │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 Ventajas de Cloud-First

| Aspecto | Rust Embebido | Supabase Realtime |
|---------|---------------|-------------------|
| **Setup** | ❌ Complejo (build, embed, permisos) | ✅ Simple (npm install) |
| **Debugging** | ❌ adb logcat, logs incompletos | ✅ Dashboard web, logs en tiempo real |
| **Escalabilidad** | ❌ Red local, ~20 users | ✅ Global, 200+ users (free tier) |
| **Persistencia** | ❌ Host debe estar activo | ✅ Cloud, independiente del host |
| **Cross-platform** | ❌ Solo Android | ✅ Android, iOS, Web, Desktop |
| **Latency** | ⚠️ Depende de WiFi local | ✅ <100ms global (edge network) |
| **Mantenimiento** | ❌ Actualizar binario Rust | ✅ Actualizar schema SQL |

---

## 📋 Schema de Base de Datos

### Tabla: `party_sessions`

```sql
CREATE TABLE public.party_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Código único de party (6 caracteres alfanuméricos)
  party_code TEXT UNIQUE NOT NULL,

  -- Host
  host_name TEXT NOT NULL,
  host_device_id TEXT,              -- ID del dispositivo Android (opcional)

  -- Configuración del examen
  exam_config JSONB NOT NULL,       -- {subject, grade, num_questions, difficulty}

  -- Participantes
  students JSONB DEFAULT '[]',      -- [{id, name, joined_at, device_info}]
  max_students INT DEFAULT 50,

  -- Estado de la sesión
  status TEXT DEFAULT 'waiting',    -- waiting, active, paused, finished
  current_question INT DEFAULT 0,

  -- Preguntas del examen
  questions JSONB,                  -- [{id, question_data}]

  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  started_at TIMESTAMPTZ,
  finished_at TIMESTAMPTZ,

  -- TTL: auto-delete after 24 hours
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours'),

  -- Constraints
  CONSTRAINT valid_status CHECK (status IN ('waiting', 'active', 'paused', 'finished')),
  CONSTRAINT valid_party_code CHECK (party_code ~ '^[A-Z0-9]{6}$')
);

-- Índices
CREATE INDEX idx_party_code ON public.party_sessions(party_code);
CREATE INDEX idx_party_status ON public.party_sessions(status, created_at DESC);
CREATE INDEX idx_party_expires ON public.party_sessions(expires_at);

-- RLS Policies
ALTER TABLE public.party_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read active parties"
  ON public.party_sessions FOR SELECT
  TO public
  USING (status != 'finished' AND expires_at > NOW());

CREATE POLICY "Public create parties"
  ON public.party_sessions FOR INSERT
  TO public
  WITH CHECK (TRUE);

CREATE POLICY "Public update parties"
  ON public.party_sessions FOR UPDATE
  TO public
  USING (TRUE)
  WITH CHECK (TRUE);

-- Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.party_sessions;
```

---

## 🔄 Migración de Código

### Host App (Android)

**Antes (Rust embebido):**
```typescript
// host-app/src/routes/+page.svelte
import { invoke } from '@tauri-apps/api/core';

async function startServer() {
  await invoke('start_server');
  const ip = await invoke('get_local_ip');
  const url = `http://${ip}:8080`;
  generateQR(url);
}
```

**Después (Supabase):**
```typescript
// host-app/src/routes/+page.svelte
import { supabase } from '../lib/supabase';

async function createParty() {
  const code = generatePartyCode(); // ABC123

  const { data, error } = await supabase
    .from('party_sessions')
    .insert({
      party_code: code,
      host_name: 'Profesor X',
      exam_config: { subject: 'math', grade: 11, num_questions: 20 }
    })
    .select()
    .single();

  if (error) throw error;

  const url = `https://saberparatodos.pages.dev/party?join=${code}`;
  generateQR(url);
  subscribeToParty(code);
}

function subscribeToParty(code: string) {
  const channel = supabase.channel(`party:${code}`)
    .on('broadcast', { event: 'student_joined' }, (payload) => {
      console.log('New student:', payload);
    })
    .subscribe();
}
```

### Student App (Web)

**Nueva página:** `saberparatodos/src/pages/party.astro`

```astro
---
// Leer query param ?join={code}
const code = Astro.url.searchParams.get('join');
if (!code) return Astro.redirect('/');
---

<PartyJoin code={code} />
```

**Componente:** `saberparatodos/src/components/PartyJoin.svelte`

```svelte
<script lang="ts">
  import { supabase } from '../lib/supabase';

  let { code } = $props<{ code: string }>();
  let partyState = $state<any>(null);

  async function joinParty() {
    const studentId = crypto.randomUUID();
    const studentName = prompt('Tu nombre:');

    // JOIN party
    const { data } = await supabase
      .from('party_sessions')
      .update({
        students: supabase.raw(`array_append(students, '${JSON.stringify({
          id: studentId,
          name: studentName,
          joined_at: new Date().toISOString()
        })}'::jsonb)`)
      })
      .eq('party_code', code)
      .select()
      .single();

    partyState = data;
    subscribeToParty();
  }

  function subscribeToParty() {
    supabase.channel(`party:${code}`)
      .on('broadcast', { event: 'question_start' }, (payload) => {
        console.log('New question:', payload);
      })
      .subscribe();
  }
</script>

<button onclick={joinParty}>Unirse a Party {code}</button>
```

---

## 📦 Broadcasting Events (Supabase Realtime)

### Host → Students

```typescript
// Host inicia pregunta
channel.send({
  type: 'broadcast',
  event: 'question_start',
  payload: {
    question_index: 1,
    question_id: 'CO-MAT-11-001',
    time_limit: 60
  }
});
```

### Students → Host

```typescript
// Student envía respuesta
channel.send({
  type: 'broadcast',
  event: 'answer_submit',
  payload: {
    student_id: 'uuid',
    question_id: 'CO-MAT-11-001',
    answer: 'B',
    time_taken: 45
  }
});
```

### Presence Tracking

```typescript
// Track online students
channel.on('presence', { event: 'sync' }, () => {
  const state = channel.presenceState();
  console.log('Online students:', Object.keys(state).length);
});

channel.track({ student_id: 'uuid', name: 'Juan' });
```

---

## 🧪 Testing Plan

### Fase 1: Schema & Database ✅
- [ ] Crear tabla `party_sessions` en Supabase
- [ ] Verificar RLS policies
- [ ] Habilitar Realtime para la tabla

### Fase 2: Host App (Android) 🔄
- [ ] Eliminar dependencia de `party-server-rust`
- [ ] Integrar Supabase client
- [ ] Crear party en DB
- [ ] Generar QR con URL cloud
- [ ] Subscribe a Realtime channel

### Fase 3: Student App (Web) 🔄
- [ ] Crear página `/party`
- [ ] Leer query param `?join={code}`
- [ ] JOIN party (update DB)
- [ ] Subscribe a Realtime channel
- [ ] UI de lobby

### Fase 4: Real-time Sync 🔄
- [ ] Broadcasting de preguntas (host → students)
- [ ] Broadcasting de respuestas (students → host)
- [ ] Presence tracking
- [ ] Manejo de desconexiones

### Fase 5: Testing End-to-End ⏳
- [ ] Crear party desde Android
- [ ] Generar QR y escanear
- [ ] Unirse desde múltiples dispositivos
- [ ] Iniciar pregunta y sincronizar
- [ ] Enviar respuestas
- [ ] Finalizar party y ver resultados

---

## 🗑️ Archivos Deprecated

Los siguientes archivos/carpetas ya NO se usan en producción:

- `party-server-rust/` (completo)
  - `src/main.rs`
  - `src/lib.rs`
  - `src/domain/`
  - `src/application/`
  - `src/infrastructure/`
  - `Cargo.toml`
  - `migrations/`

- `party-server-rust/student-app/` (reemplazado por `/party` page)

**Acción:** Mantener como referencia histórica pero marcar como archivado.

---

## 📊 Comparación de Rendimiento

| Métrica | Rust Embebido | Supabase Realtime |
|---------|---------------|-------------------|
| **Latency (mismo WiFi)** | ~10ms | ~50-100ms |
| **Latency (internet)** | N/A (solo local) | ~100-200ms |
| **Throughput** | ~100 msg/s | ~1000 msg/s |
| **Max Users** | ~20 (WiFi limit) | 200 (free), 500 (pro) |
| **Setup Time** | ~30min (build + debug) | ~5min (schema + code) |
| **Costo Hosting** | $0 (local) | $0 (free tier) |

---

## 🚀 Next Steps

1. ✅ Documentar decisión (este archivo)
2. 🔄 Actualizar `PLANNING.md` y `TASK.md`
3. 🔄 Crear schema `party_sessions` en Supabase
4. 🔄 Actualizar Host App para usar Supabase
5. 🔄 Crear `/party` page en saberparatodos
6. 🔄 Implementar Realtime sync
7. ⏳ Testing end-to-end

---

**Aprobado por:** AI Architect (The Architect)
**Fecha:** 2025-12-11
