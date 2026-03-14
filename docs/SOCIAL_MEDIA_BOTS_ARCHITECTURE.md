# 🤖 Arquitectura de Bots Multi-Red Social - World Exams

> Diseño híbrido para administrar Telegram, Discord, X.com desde Edge Functions y automatización controlada.
> Historical context only donde mencione GitHub Workflows como ruta principal; la operación vigente del repo favorece Edge Functions y ejecución manual/CLI.

**Fecha:** 16 de diciembre de 2025
**Autor:** The Architect & The Synchronizer
**Versión:** 1.0

---

## 📋 Resumen Ejecutivo

### Objetivo

Crear un sistema automatizado para administrar todas las redes sociales de World Exams desde dos puntos de control:

1. **Edge Functions (Supabase)** → Interacciones en tiempo real con usuarios
2. **Automatización controlada (Rust/CLI/scheduler privado)** → Tareas programadas y triage automatizado

---

## 🏗️ Arquitectura Propuesta: Híbrida

### Opción Recomendada: **AMBAS** (Complementarias)

| Sistema | Responsabilidad | Ventajas | Limitaciones |
|---------|-----------------|----------|--------------|
| **Edge Functions** | Webhooks en tiempo real | • Respuesta instantánea<br>• Logs en Supabase<br>• Acceso directo a DB | • Costos por invocación<br>• Timeout 60s |
| **Scheduler/CLI privado** | Tareas programadas | • Control del entorno<br>• Binario Rust eficiente<br>• No depende de publicación externa | • No es tiempo real<br>• Requiere operación explícita |

---

## 🔄 División de Responsabilidades

### 🟢 Edge Functions (Tiempo Real)

**Casos de uso:**
- ✅ Responder comandos de usuarios en Telegram (`/practicar`, `/ayuda`, `/vincular`)
- ✅ Contestar menciones en Discord
- ✅ Webhook de Telegram Bot API
- ✅ Notificaciones instantáneas (nuevas preguntas aprobadas, resultados de examen)

**Stack:**
- Deno + TypeScript
- Grammy (Telegram)
- Discord.js
- Twitter API v2

**Edge Functions a crear:**

```bash
supabase/functions/
├── telegram-bot/           # ✅ YA EXISTE - Ampliar
├── discord-bot/            # 🆕 CREAR
├── twitter-bot/            # 🆕 CREAR
└── social-webhook/         # 🆕 Webhook único para todas las redes
```

---

### 🔵 Automatización Controlada (Tareas Programadas)

**Casos de uso:**
- ✅ Publicar contenido cada 3 horas (preguntas del día, tips de estudio)
- ✅ Leer issues del repo privado actual
- ✅ Hacer triage automático (detectar país, asignar labels, redirigir)
- ✅ Generar reportes semanales de actividad
- ✅ Sincronizar estadísticas entre países

**Stack:**
- Rust binario único (`social-orchestrator`)
- Ejecutado desde entorno controlado del proyecto
- Cacheable y reutilizable

**Workflows a crear:**

```yaml
.github/workflows/
├── social-content.yml          # Publicar contenido cada 3h
├── issue-triage.yml            # Triage automático de issues
├── weekly-report.yml           # Reporte semanal
└── sync-stats.yml              # Sincronizar estadísticas
```

---

## 🤖 Bot de Telegram Existente - Reutilización

### Estado Actual

Ya tienes un bot de Telegram funcional en `supabase/functions/telegram-bot/` con:

✅ **Funcionalidades actuales:**
- Sistema de práctica interactivo (10 preguntas)
- Vinculación de cuenta con la web
- Tutor de IA con DeepSeek
- Guardado de sesiones en Supabase
- Reportes compartibles

### Propuesta de Extensión

**1. Hacer el bot multi-red (reusable)**

Mover la lógica común a `_shared/social-bot-core.ts`:

```typescript
// supabase/functions/_shared/social-bot-core.ts
export interface SocialBotMessage {
  platform: 'telegram' | 'discord' | 'twitter';
  userId: string;
  chatId: string;
  text: string;
  timestamp: Date;
}

export class SocialBotCore {
  constructor(private supabase: SupabaseClient) {}

  async handleCommand(msg: SocialBotMessage) {
    const cmd = msg.text.toLowerCase().trim();

    if (cmd.startsWith('/practicar') || cmd.includes('practice')) {
      return this.startPractice(msg);
    }

    if (cmd.startsWith('/ayuda') || cmd.includes('help')) {
      return this.showHelp(msg);
    }

    // ... más comandos
  }

  async startPractice(msg: SocialBotMessage) {
    // Lógica común para todas las redes
    // Adaptar respuesta según platform
  }
}
```

**2. Adaptar respuestas por plataforma**

```typescript
export class PlatformAdapter {
  static formatMessage(platform: string, data: any): string {
    switch (platform) {
      case 'telegram':
        return `📚 <b>${data.title}</b>\n${data.body}`;
      case 'discord':
        return `**${data.title}**\n${data.body}`;
      case 'twitter':
        return `${data.title}\n\n${data.body}`.slice(0, 280);
      default:
        return data.body;
    }
  }
}
```

---

## 🆕 Discord Bot (Edge Function)

### Implementación

```typescript
// supabase/functions/discord-bot/index.ts
import { serve } from "https://deno.land/std@0.177.0/http/server.ts";
import { verifyDiscordRequest } from "../_shared/discord-verify.ts";
import { SocialBotCore } from "../_shared/social-bot-core.ts";

serve(async (req) => {
  // Verificar firma de Discord
  const verified = await verifyDiscordRequest(req);
  if (!verified) return new Response("Unauthorized", { status: 401 });

  const interaction = await req.json();

  // Delegar a core
  const botCore = new SocialBotCore(supabaseClient);
  const response = await botCore.handleCommand({
    platform: 'discord',
    userId: interaction.member.user.id,
    chatId: interaction.channel_id,
    text: interaction.data.options?.[0]?.value || '',
    timestamp: new Date()
  });

  return new Response(JSON.stringify(response), {
    headers: { "Content-Type": "application/json" }
  });
});
```

**Registro de comandos slash:**

```typescript
// scripts/register-discord-commands.ts
const commands = [
  {
    name: 'practicar',
    description: 'Iniciar sesión de práctica ICFES',
    options: [
      {
        name: 'materia',
        description: 'Selecciona una materia',
        type: 3, // STRING
        required: true,
        choices: [
          { name: 'Matemáticas', value: 'matematicas' },
          { name: 'Lectura Crítica', value: 'lectura_critica' },
          // ...
        ]
      }
    ]
  }
];
```

---

## 🐦 Twitter/X Bot (Edge Function)

### Implementación

```typescript
// supabase/functions/twitter-bot/index.ts
import { TwitterApi } from "npm:twitter-api-v2";

const twitterClient = new TwitterApi({
  appKey: Deno.env.get("TWITTER_API_KEY")!,
  appSecret: Deno.env.get("TWITTER_API_SECRET")!,
  accessToken: Deno.env.get("TWITTER_ACCESS_TOKEN")!,
  accessSecret: Deno.env.get("TWITTER_ACCESS_SECRET")!,
});

serve(async (req) => {
  const { action, data } = await req.json();

  switch (action) {
    case 'tweet':
      await twitterClient.v2.tweet(data.text);
      break;

    case 'reply_mention':
      const mentions = await twitterClient.v2.search('to:worldexams_org', {
        'tweet.fields': 'author_id,created_at'
      });

      for (const mention of mentions.data) {
        // Responder con IA
        const reply = await getTutorResponse(mention.text);
        await twitterClient.v2.reply(reply, mention.id);
      }
      break;
  }

  return new Response("OK");
});
```

---

## ⚙️ GitHub Workflows - Rust Orchestrator

### Binario Único en Rust

**Ventajas:**
- ✅ Compilación ultra-rápida (< 30s)
- ✅ Cacheable entre workflows
- ✅ Sin dependencias runtime
- ✅ Consumo mínimo de recursos

### Estructura del Proyecto

```text
world-exams/
├── .github/
│   └── workflows/
│       ├── social-content.yml
│       ├── issue-triage.yml
│       └── weekly-report.yml
├── social-orchestrator/         # 🆕 BINARIO RUST
│   ├── Cargo.toml
│   ├── src/
│   │   ├── main.rs
│   │   ├── telegram.rs
│   │   ├── discord.rs
│   │   ├── twitter.rs
│   │   ├── github.rs
│   │   └── content.rs
│   └── content/
│       ├── daily-tips.json
│       └── questions-featured.json
```

### Código Base del Orchestrator

```rust
// social-orchestrator/src/main.rs
use clap::{Parser, Subcommand};
use serde::{Deserialize, Serialize};

#[derive(Parser)]
struct Cli {
    #[command(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    /// Publicar contenido en todas las redes
    PublishContent {
        #[arg(short, long)]
        content_type: String,
    },

    /// Hacer triage de issues
    TriageIssues,

    /// Generar reporte semanal
    WeeklyReport,

    /// Sincronizar estadísticas
    SyncStats,
}

#[tokio::main]
async fn main() {
    let cli = Cli::parse();

    match cli.command {
        Commands::PublishContent { content_type } => {
            publish_content(&content_type).await;
        }
        Commands::TriageIssues => {
            triage_issues().await;
        }
        Commands::WeeklyReport => {
            generate_weekly_report().await;
        }
        Commands::SyncStats => {
            sync_statistics().await;
        }
    }
}

async fn publish_content(content_type: &str) {
    let content = load_content(content_type);

    // Publicar en todas las redes en paralelo
    tokio::join!(
        telegram::post(&content),
        discord::post(&content),
        twitter::post(&content),
    );
}

async fn triage_issues() {
    let issues = github::fetch_open_issues("world-exams", "world-exams").await;

    for issue in issues {
        let country = detect_country(&issue);
        let labels = suggest_labels(&issue);

        github::update_issue(&issue.number, country, labels).await;
    }
}
```

### Módulo de Detección de País

```rust
// social-orchestrator/src/github.rs
use regex::Regex;

pub fn detect_country(issue: &Issue) -> String {
    let text = format!("{} {}", issue.title, issue.body);

    // Palabras clave por país
    if text.contains("ICFES") || text.contains("Saber 11") || text.contains("Colombia") {
        return "CO".to_string();
    }

    if text.contains("ENEM") || text.contains("Brasil") || text.contains("vestibular") {
        return "BR".to_string();
    }

    if text.contains("EXANI") || text.contains("México") || text.contains("CENEVAL") {
        return "MX".to_string();
    }

    // Default
    "UNKNOWN".to_string()
}

pub fn suggest_labels(issue: &Issue) -> Vec<String> {
    let mut labels = vec![];

    if issue.body.contains("bug") || issue.body.contains("error") {
        labels.push("bug".to_string());
    }

    if issue.body.contains("feature") || issue.body.contains("sugerencia") {
        labels.push("enhancement".to_string());
    }

    labels
}
```

---

## 📅 Workflows de GitHub Actions

### 1. Publicar Contenido (cada 3 horas)

```yaml
# .github/workflows/social-content.yml
name: 📱 Publicar Contenido en Redes

on:
  schedule:
    - cron: '0 */3 * * *'  # Cada 3 horas
  workflow_dispatch:  # Manual trigger

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Cache Rust Build
        uses: actions/cache@v3
        with:
          path: |
            ~/.cargo/registry
            ~/.cargo/git
            social-orchestrator/target
          key: ${{ runner.os }}-cargo-${{ hashFiles('**/Cargo.lock') }}

      - name: Build Orchestrator
        run: |
          cd social-orchestrator
          cargo build --release

      - name: Publish Content
        env:
          TELEGRAM_BOT_TOKEN: ${{ secrets.TELEGRAM_BOT_TOKEN }}
          DISCORD_WEBHOOK_URL: ${{ secrets.DISCORD_WEBHOOK_URL }}
          TWITTER_API_KEY: ${{ secrets.TWITTER_API_KEY }}
        run: |
          ./social-orchestrator/target/release/orchestrator publish-content --content-type daily-tip
```

### 2. Triage de Issues (cada hora)

```yaml
# .github/workflows/issue-triage.yml
name: 🏷️ Triage Automático de Issues

on:
  issues:
    types: [opened, edited]
  schedule:
    - cron: '0 * * * *'  # Cada hora

jobs:
  triage:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Orchestrator
        run: |
          cd social-orchestrator
          cargo build --release

      - name: Run Triage
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          ./social-orchestrator/target/release/orchestrator triage-issues
```

### 3. Reporte Semanal

```yaml
# .github/workflows/weekly-report.yml
name: 📊 Reporte Semanal

on:
  schedule:
    - cron: '0 9 * * 1'  # Lunes 9 AM UTC
  workflow_dispatch:

jobs:
  report:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Build Orchestrator
        run: |
          cd social-orchestrator
          cargo build --release

      - name: Generate Report
        env:
          SUPABASE_URL: ${{ secrets.SUPABASE_URL }}
          SUPABASE_SERVICE_ROLE_KEY: ${{ secrets.SUPABASE_SERVICE_ROLE_KEY }}
        run: |
          ./social-orchestrator/target/release/orchestrator weekly-report
```

---

## 🔒 Secrets Requeridos

### GitHub Organization Secrets

```bash
# Telegram
TELEGRAM_BOT_TOKEN=tu_token_aqui
TELEGRAM_CHAT_ID=tu_chat_id_aqui

# Discord
DISCORD_BOT_TOKEN=xxx
DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/xxx

# Twitter/X
TWITTER_API_KEY=xxx
TWITTER_API_SECRET=xxx
TWITTER_ACCESS_TOKEN=xxx
TWITTER_ACCESS_SECRET=xxx
TWITTER_BEARER_TOKEN=xxx

# Supabase
SUPABASE_URL=https://tzmrgvtptdtsjcugwqyq.supabase.co
SUPABASE_SERVICE_ROLE_KEY=xxx

# GitHub
GITHUB_TOKEN=${{ secrets.GITHUB_TOKEN }}  # Auto-provided
```

---

## 📊 Comparación de Costos

| Opción | Costo Mensual | Límites |
|--------|---------------|---------|
| **Edge Functions** | ~$0.50 - $5 | 500K invocaciones gratis/mes |
| **GitHub Workflows** | **$0** (Gratis) | 2000 min/mes repos públicos |
| **Rust Binary Cache** | $0 | Reutilizable entre runs |

**Estimado total:** < $5/mes con ambas opciones combinadas

---

## 🎯 Plan de Implementación

### Fase 1: Extender Telegram Bot (1-2 días)

- [x] Bot actual funcional
- [ ] Extraer lógica común a `_shared/social-bot-core.ts`
- [ ] Agregar comandos de administración (`/stats`, `/report`)
- [ ] Integrar con GitHub Issues API (notificar nuevos issues)

### Fase 2: Discord Bot (2-3 días)

- [ ] Crear `supabase/functions/discord-bot/`
- [ ] Registrar comandos slash
- [ ] Webhook para mensajes
- [ ] Integración con `social-bot-core`

### Fase 3: Twitter Bot (2-3 días)

- [ ] Crear `supabase/functions/twitter-bot/`
- [ ] Auto-responder menciones con IA
- [ ] Publicar contenido programado
- [ ] Monitoreo de hashtags (#ICFES, #Saber11)

### Fase 4: Rust Orchestrator (3-4 días)

- [ ] Setup proyecto Rust en `world-exams/social-orchestrator/`
- [ ] Módulos: Telegram, Discord, Twitter, GitHub
- [ ] CLI con clap
- [ ] Compilación y cache en GitHub Actions

### Fase 5: Workflows (1-2 días)

- [ ] `social-content.yml` (cada 3h)
- [ ] `issue-triage.yml` (cada 1h)
- [ ] `weekly-report.yml` (lunes)
- [ ] `sync-stats.yml` (diario)

### Fase 6: Testing & Deployment (2-3 días)

- [ ] Tests locales con Deno
- [ ] Deploy Edge Functions
- [ ] Trigger workflows manuales
- [ ] Monitoreo de logs

**Tiempo estimado total:** 11-17 días (2-3 semanas)

---

## 🚀 Roadmap Futuro

### Mes 1
- ✅ Telegram, Discord, Twitter bots funcionales
- ✅ Triage automático de issues
- ✅ Publicación de contenido cada 3h

### Mes 2
- [ ] WhatsApp Business API (Edge Function)
- [ ] LinkedIn posts automáticos (Workflow)
- [ ] Instagram stories via API (Workflow)

### Mes 3
- [ ] Dashboard de análisis de redes sociales
- [ ] A/B testing de contenido
- [ ] ML para optimizar horarios de publicación

---

## 📝 Recomendación Final

### Arquitectura Híbrida Óptima

```
┌─────────────────────────────────────────────────────────┐
│                  GITHUB WORKFLOWS (Rust)                │
│  ┌───────────┐  ┌───────────┐  ┌──────────────┐       │
│  │ Publish   │  │  Triage   │  │   Reports    │       │
│  │ Content   │  │  Issues   │  │   & Stats    │       │
│  │ (3h)      │  │  (1h)     │  │   (weekly)   │       │
│  └─────┬─────┘  └─────┬─────┘  └──────┬───────┘       │
│        │              │                 │               │
└────────┼──────────────┼─────────────────┼───────────────┘
         │              │                 │
         ▼              ▼                 ▼
┌─────────────────────────────────────────────────────────┐
│              SUPABASE EDGE FUNCTIONS                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  Telegram    │  │   Discord    │  │   Twitter    │  │
│  │  Webhook     │  │   Webhook    │  │   Webhook    │  │
│  │  (realtime)  │  │  (realtime)  │  │  (realtime)  │  │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  │
│         │                  │                  │          │
│         └──────────────────┴──────────────────┘          │
│                           │                               │
│                  ┌────────▼────────┐                     │
│                  │  SocialBotCore  │                     │
│                  │  (shared logic) │                     │
│                  └────────┬────────┘                     │
└───────────────────────────┼──────────────────────────────┘
                            │
                            ▼
                   ┌────────────────┐
                   │    SUPABASE    │
                   │    Database    │
                   └────────────────┘
```

**Conclusión:**
✅ Usa **Edge Functions** para webhooks en tiempo real
✅ Usa **GitHub Workflows** para tareas programadas
✅ Un solo binario Rust para todas las tareas programadas
✅ Código compartido entre todas las redes

---

*Documento creado por The Architect & The Synchronizer*
*Versión: 1.0 | Diciembre 2025*
