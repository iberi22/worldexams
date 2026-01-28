# 🌍 World Exams

> Open source platform for standardized exam practice across the globe

[![License: PolyForm Shield](https://img.shields.io/badge/License-PolyForm%20Shield%201.0.0-blue.svg)](LICENSE.md)
[![Rust](https://img.shields.io/badge/rust-1.70+-orange.svg)](https://www.rust-lang.org)
[![TypeScript](https://img.shields.io/badge/typescript-5.0+-blue.svg)](https://www.typescriptlang.org)

---

## 📋 Overview

World Exams is a multi-country platform providing free, AI-powered practice for standardized exams. Each country has its own branded platform with localized content.

### 🌐 Active Platforms

| Country | Platform | Status | Exam Type |
|---------|----------|--------|-----------|
| 🇨🇴 Colombia | [saber-co](https://github.com/world-exams/saber-co) | ✅ Live | ICFES Saber 11 |
| 🇲🇽 México | exani-mx | 🔄 Development | EXANI-II |
| 🇧🇷 Brasil | enem-br | 🔄 Development | ENEM |
| 🇺🇸 USA | sat-us | 🔄 Development | SAT |
| 🇨🇳 China | gaokao-zh | 🔄 Development | Gaokao |
| 🇮🇳 India | jee-in | 🔄 Development | JEE Main |

---

## ⚡ Edge Functions

**NEW:** Business logic for WorldExams/SaberParaTodos has been extracted into a reusable Rust crate located in `edge-functions/`.

### 📦 What's Included

- **Questions API** - Fetch questions from static CDN with rate limiting
- **Credits System** - Billing, subscription tiers, transaction tracking
- **AI Analysis** - Prompt templates for Gemini/Claude/GPT integration

### 🔧 Usage Options

#### Option 1: Standalone
```rust
use worldexams_edge_functions::questions::fetch_questions;

let questions = fetch_questions(&config, "co", "icfes", "11", "matematicas", 1).await?;
```

#### Option 2: With Edge Hive
```toml
# Add to your Edge Hive Cargo.toml
[dependencies]
worldexams-edge-functions = { path = "../worldexams/edge-functions" }
```

#### Option 3: Supabase Edge Functions
Convert to Deno/TypeScript - see examples in `edge-functions/examples/supabase/`

**Documentation:**
- [Edge Functions README](edge-functions/README.md)
- [Edge Hive Integration Guide](edge-functions/examples/edge-hive/INTEGRATION.md)

---

## 🤖 Social Media Bots

Automated bots for Telegram, Discord, and Twitter/X built with Rust and Supabase Edge Functions.

### Features

- ✅ **Multi-platform support** - Telegram, Discord, Twitter/X
- ✅ **Real-time interactions** - Practice sessions, AI tutoring
- ✅ **Automated triage** - GitHub issues classification by country
- ✅ **Content scheduling** - Daily tips, weekly reports
- ✅ **Unified codebase** - Single Rust binary for all scheduled tasks

### Quick Start

```bash
# Build the orchestrator
cd social-orchestrator
cargo build --release

# Publish daily content
./target/release/social-orchestrator publish-content --content-type daily-tip

# Run issue triage
./target/release/social-orchestrator triage-issues --repo world-exams/world-exams
```

**Documentation:** [SOCIAL_MEDIA_BOTS_ARCHITECTURE.md](docs/SOCIAL_MEDIA_BOTS_ARCHITECTURE.md)

---

## 🏗️ Architecture

### Hybrid System

```
┌─────────────────────────────────────────────────────────┐
│              GITHUB WORKFLOWS (Rust)                    │
│  Scheduled Tasks: Content, Triage, Reports              │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────┐
│          SUPABASE EDGE FUNCTIONS (Deno)                 │
│  Real-time Webhooks: Telegram, Discord, Twitter         │
└────────────────────┬────────────────────────────────────┘
                     │
                     ▼
            ┌────────────────┐
            │    SUPABASE    │
            │    Database    │
            └────────────────┘
```

---

## 📦 Repository Structure

```
world-exams/
├── .github/
│   └── workflows/           # CI/CD automation
│       ├── social-content.yml
│       ├── issue-triage.yml
│       └── weekly-report.yml
├── docs/                    # Documentation
│   ├── SOCIAL_MEDIA_BOTS_ARCHITECTURE.md
│   ├── QUESTION_GENERATION_PROTOCOL_V2.md
│   └── API_REAL_SETUP.md
├── edge-functions/          # ⚡ NEW: Reusable business logic (Rust)
│   ├── src/
│   │   ├── lib.rs
│   │   ├── questions.rs     # Questions API
│   │   ├── credits.rs       # Credit system & billing
│   │   └── analysis.rs      # AI analysis prompts
│   ├── examples/
│   │   ├── edge-hive/       # Edge Hive integration
│   │   ├── supabase/        # Supabase Edge Functions
│   │   └── standalone/      # Direct usage examples
│   ├── Cargo.toml
│   └── README.md
├── social-orchestrator/     # Rust bot orchestrator
│   ├── src/
│   │   ├── main.rs
│   │   ├── telegram.rs
│   │   ├── discord.rs
│   │   ├── twitter.rs
│   │   └── github.rs
│   └── content/
│       └── daily-tips.json
├── src/                     # Frontend (Astro)
├── supabase/                # Supabase configuration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Rust 1.70+
- Node.js 18+ (for Supabase Functions)
- Supabase CLI
- Git

### Installation

```bash
# Clone the repo
git clone https://github.com/world-exams/world-exams.git
cd world-exams

# Build Rust orchestrator
cd social-orchestrator
cargo build --release

# Copy environment template
cp .env.example .env
# Edit .env with your tokens
```

### Environment Variables

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_CHAT_ID=your_chat_id

# Discord
DISCORD_WEBHOOK_URL=your_webhook

# Twitter
TWITTER_API_KEY=your_api_key

# GitHub
GITHUB_TOKEN=your_github_token

# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 🤝 Contributing

We welcome contributions! Please read our contributing guidelines before submitting PRs.

### Report Issues

All issues are centrally managed in this repository:

👉 **[Create an Issue](https://github.com/world-exams/world-exams/issues/new)**

Issues are automatically triaged and assigned to the appropriate country repository.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📞 Contact

- **Email:** [contacto@saberparatodos.space](mailto:contacto@saberparatodos.space)
- **GitHub Issues:** [github.com/world-exams/world-exams/issues](https://github.com/world-exams/world-exams/issues)
- **Telegram:** [@worldexams_bot](https://t.me/worldexams_bot)
- **Discord:** [Join our community](https://discord.gg/worldexams)
- **Twitter/X:** [@worldexams_org](https://twitter.com/worldexams_org)

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🌟 Sponsors

This project is supported by:

- [Supabase](https://supabase.com) - Backend and Edge Functions
- [Cloudflare](https://cloudflare.com) - Hosting and CDN
- Open source community contributions

---

## 🗺️ Roadmap

### Q1 2025
- [x] Launch Colombia (saber-co)
- [x] Implement multi-platform bot system
- [x] Automated issue triage
- [x] **English Module Enhancements** (Metadata Badges, CEFR Alignment, Memory tracking)
- [ ] Launch México (exani-mx)
- [ ] Launch Brasil (enem-br)

### Q2 2025
- [ ] WhatsApp Business integration
- [ ] LinkedIn automation
- [ ] Mobile apps (React Native)
- [ ] Launch India (jee-in)
- [ ] Launch China (gaokao-zh)

### Q3 2025
- [ ] Advanced analytics dashboard
- [ ] A/B testing framework
- [ ] ML-powered content optimization
- [ ] Launch USA (sat-us)

---

## 📊 Statistics

- **Countries:** 6+ active platforms
- **Questions:** 16,000+ practice questions (Updated: Jan 2026)
- **English Capabilities:** CEFR aligned (A1-B2), Part-based metadata, AI Study Plans (NotebookLM).
- **English Content:** 258 bundles (8 universal, 250 Colombia-specific) + automated metadata extraction.
- **Users:** Growing daily
- **Open Source:** 100% transparent
- **Cost:** Free forever

---

*Made with ❤️ by the World Exams community*

*Last updated: January 2026*
