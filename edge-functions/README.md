# WorldExams Edge Functions

> Business logic for WorldExams/SaberParaTodos platform

This directory contains the proprietary edge functions extracted from the Edge Hive project to keep the base infrastructure generic and this platform's business logic separate.

## 📁 Structure

```
edge-functions/
├── Cargo.toml              # Rust dependencies
├── src/
│   ├── lib.rs              # Main library exports
│   ├── questions.rs        # Question fetching API
│   ├── credits.rs          # Credit system & billing
│   └── analysis.rs         # AI analysis prompts
├── examples/
│   ├── edge-hive/          # Edge Hive integration
│   ├── supabase/           # Supabase Edge Functions
│   └── standalone/         # Standalone usage
└── README.md               # This file
```

## 🚀 Usage Options

### Option 1: Standalone (Direct Integration)

```rust
use worldexams_edge_functions::questions::{fetch_questions, QuestionsConfig};

#[tokio::main]
async fn main() {
    let config = QuestionsConfig::default();
    let questions = fetch_questions(
        &config,
        "co",          // Colombia
        "icfes",       // Exam type
        "11",          // Grade
        "matematicas", // Subject
        1              // Page
    ).await.unwrap();

    println!("Fetched {} questions", questions.len());
}
```

### Option 2: With Edge Hive

```rust
// In your Edge Hive project's Cargo.toml:
[dependencies]
worldexams-edge-functions = { path = "../worldexams/edge-functions" }

// Or via git:
worldexams-edge-functions = { git = "https://github.com/world-exams/worldexams", subdirectory = "edge-functions" }
```

Then create custom API handlers:

```rust
use axum::{routing::get, Router, Json};
use worldexams_edge_functions::questions::{fetch_questions, QuestionsConfig};

async fn get_questions_handler() -> Json<Vec<Question>> {
    let config = QuestionsConfig::default();
    let questions = fetch_questions(&config, "co", "icfes", "11", "matematicas", 1)
        .await
        .unwrap();
    Json(questions)
}

let app = Router::new()
    .route("/api/v1/worldexams/questions", get(get_questions_handler));
```

### Option 3: Supabase Edge Functions

Convert to Deno/TypeScript:

```typescript
// supabase/functions/get-questions/index.ts
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async (req) => {
  const { country, exam, grade, subject, page } = await req.json();

  const url = `https://saberparatodos.pages.dev/api/${country}/${exam}/${grade}/${subject}/${page}.json`;
  const response = await fetch(url);
  const data = await response.json();

  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
});
```

## 🔧 Configuration

### Static API Base URL

The default configuration points to SaberParaTodos' static API:

```rust
pub static_api_base: String = "https://saberparatodos.pages.dev/api".to_string();
```

You can override this:

```rust
let config = QuestionsConfig {
    static_api_base: "https://your-cdn.com/api".to_string(),
    guest_limit: 20,
    rate_limit_per_hour: 200,
};
```

### Credit Costs

Configure service costs:

```rust
use worldexams_edge_functions::credits::ServiceCosts;

let costs = ServiceCosts {
    analysis: 5,         // Reduced cost
    infographic: 10,
    tutor_session: 15,
    custom_route: 3,
};
```

## 📊 Features

### ✅ Questions API
- Fetch questions from static CDN
- Pagination support
- Country/exam/grade/subject filtering
- Rate limiting ready

### ✅ Credits System
- Multiple subscription tiers (Free, Pro, Premium, School)
- Transaction tracking
- Service cost configuration
- Billing integration ready

### ✅ AI Analysis
- Gemini/Claude/GPT prompt templates
- Exam result analysis
- Infographic content generation
- Personalized study routes

## 🧪 Testing

```bash
cd edge-functions
cargo test
```

## 📄 License

MIT License - See [LICENSE.md](../LICENSE.md)

## 🔗 Integration with Edge Hive

This crate was extracted from [Edge Hive](https://github.com/USER/termux-private-edge-server) to separate:
- **Edge Hive:** Generic edge computing infrastructure (public)
- **WorldExams:** Platform-specific business logic (this crate)

For full Edge Hive integration guide, see: `examples/edge-hive/INTEGRATION.md`
