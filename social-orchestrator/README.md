# 🤖 Social Media Orchestrator

**Unified bot system for World Exams organization**

Multi-platform social media automation using Rust for scheduled tasks.

---

## 🎯 Features

- ✅ **Telegram Bot** - Real-time interactions and practice sessions
- ✅ **Discord Bot** - Community management and slash commands
- ✅ **Twitter/X Bot** - Auto-reply mentions and scheduled posts
- ✅ **GitHub Triage** - Automatic issue classification by country
- ✅ **Content Publishing** - Daily tips, questions, and summaries
- ✅ **Weekly Reports** - Statistics and engagement metrics

---

## 🏗️ Architecture

### Hybrid System

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Edge Functions** | Deno + TypeScript | Real-time webhooks |
| **Orchestrator** | Rust CLI | Scheduled tasks |
| **GitHub Actions** | YAML Workflows | Automation pipeline |

---

## 📦 Installation

### Prerequisites

- Rust 1.70+
- Cargo

### Build

```bash
cd social-orchestrator
cargo build --release
```

The binary will be at `target/release/social-orchestrator`

---

## 🚀 Usage

### Publish Content

```bash
./social-orchestrator publish-content --content-type daily-tip
```

Options:
- `daily-tip` - Random study tip from database
- `question-of-day` - Featured question with explanation
- `weekly-summary` - Statistics summary

### Triage Issues

```bash
./social-orchestrator triage-issues --repo world-exams/world-exams
```

Automatically:
- Detects country from issue text
- Suggests relevant labels
- Adds triage comment
- Updates issue labels

### Generate Weekly Report

```bash
./social-orchestrator weekly-report --week current
```

### Reply Mentions

```bash
./social-orchestrator reply-mentions --platform all
```

Platforms: `telegram`, `discord`, `twitter`, `all`

---

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```env
# Telegram
TELEGRAM_BOT_TOKEN=your_token_here
TELEGRAM_CHAT_ID=your_chat_id

# Discord
DISCORD_WEBHOOK_URL=your_webhook_url

# Twitter/X
TWITTER_API_KEY=your_api_key
TWITTER_API_SECRET=your_api_secret
TWITTER_ACCESS_TOKEN=your_access_token
TWITTER_ACCESS_SECRET=your_access_secret

# GitHub
GITHUB_TOKEN=your_github_token

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

---

## 📅 GitHub Actions

Workflows run automatically:

| Workflow | Schedule | Purpose |
|----------|----------|---------|
| `social-content.yml` | Every 3 hours | Publish daily content |
| `issue-triage.yml` | Hourly | Classify new issues |
| `weekly-report.yml` | Monday 9 AM | Generate analytics |

### Manual Trigger

```bash
# Via GitHub CLI
gh workflow run social-content.yml -f content_type=daily-tip

# Via GitHub UI
Actions → Select workflow → Run workflow
```

---

## 🧪 Testing

### Local Testing

```bash
# Build
cargo build

# Run with .env
cargo run -- publish-content --content-type daily-tip

# Run triage
cargo run -- triage-issues --repo world-exams/world-exams
```

### CI/CD

Workflows automatically cache Rust dependencies for fast builds.

---

## 📁 Content Files

### Daily Tips

Edit `content/daily-tips.json`:

```json
[
  {
    "tip": "Your study tip here",
    "subject": "Mathematics",
    "emoji": "➗"
  }
]
```

Tips rotate based on day of the year.

---

## 🤝 Contributing

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a PR

---

## 📄 License

MIT License - See [LICENSE](../LICENSE) for details

---

## 🔗 Links

- **Organization:** [github.com/world-exams](https://github.com/world-exams)
- **Documentation:** [SOCIAL_MEDIA_BOTS_ARCHITECTURE.md](../docs/SOCIAL_MEDIA_BOTS_ARCHITECTURE.md)
- **Issues:** [github.com/world-exams/world-exams/issues](https://github.com/world-exams/world-exams/issues)

---

*Made with 🦀 Rust by The Synchronizer*
