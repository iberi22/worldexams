# Edge Hive Integration Guide

This guide shows how to integrate WorldExams edge functions with Edge Hive infrastructure.

## 📋 Prerequisites

1. Edge Hive installed: `https://github.com/USER/termux-private-edge-server`
2. WorldExams repository cloned alongside Edge Hive
3. Rust 1.70+ and Cargo installed

## 🔧 Setup

### Step 1: Add as Dependency

In your Edge Hive project, add to `Cargo.toml`:

```toml
[dependencies]
# Option A: Local path (for development)
worldexams-edge-functions = { path = "../worldexams/edge-functions" }

# Option B: Git dependency (for production)
worldexams-edge-functions = {
    git = "https://github.com/world-exams/worldexams",
    subdirectory = "edge-functions",
    branch = "main"
}
```

### Step 2: Create Custom Handlers

Create `crates/edge-hive-api/src/handlers/worldexams.rs`:

```rust
//! WorldExams API Handlers
//!
//! Custom handlers for WorldExams/SaberParaTodos platform

use axum::{
    extract::{Extension, Query},
    http::StatusCode,
    response::Json,
};
use serde::{Deserialize, Serialize};
use worldexams_edge_functions::{
    questions::{fetch_questions, QuestionsConfig, WorldExamsQuestion},
    analysis::{AnalysisPrompts, ExamAnalysisResult},
    credits::ServiceCosts,
};
use crate::state::ApiState;

/// Query parameters for questions endpoint
#[derive(Debug, Deserialize)]
pub struct QuestionsQuery {
    #[serde(default = "default_country")]
    pub country: String,
    #[serde(default = "default_exam")]
    pub exam: String,
    #[serde(default = "default_grade")]
    pub grade: String,
    #[serde(default = "default_subject")]
    pub subject: String,
    #[serde(default = "default_page")]
    pub page: u32,
}

fn default_country() -> String { "co".to_string() }
fn default_exam() -> String { "icfes".to_string() }
fn default_grade() -> String { "11".to_string() }
fn default_subject() -> String { "matematicas".to_string() }
fn default_page() -> u32 { 1 }

#[derive(Debug, Serialize)]
pub struct QuestionsResponse {
    pub success: bool,
    pub questions: Vec<WorldExamsQuestion>,
    pub total: usize,
    pub page: u32,
}

/// GET /api/v1/worldexams/questions
pub async fn get_questions(
    Extension(_state): Extension<ApiState>,
    Query(params): Query<QuestionsQuery>,
) -> Result<Json<QuestionsResponse>, StatusCode> {
    let config = QuestionsConfig::default();

    let questions = fetch_questions(
        &config,
        &params.country,
        &params.exam,
        &params.grade,
        &params.subject,
        params.page,
    )
    .await
    .map_err(|_| StatusCode::INTERNAL_SERVER_ERROR)?;

    Ok(Json(QuestionsResponse {
        success: true,
        total: questions.len(),
        questions,
        page: params.page,
    }))
}

/// Request for AI analysis
#[derive(Debug, Deserialize)]
pub struct AnalysisRequest {
    pub score: i32,
    pub total: i32,
    pub subject: String,
    pub grade: i32,
    pub time_taken: i32,
}

#[derive(Debug, Serialize)]
pub struct AnalysisResponse {
    pub success: bool,
    pub prompt: String,
    pub credits_cost: i32,
}

/// POST /api/v1/worldexams/analysis
pub async fn generate_analysis(
    Extension(_state): Extension<ApiState>,
    Json(req): Json<AnalysisRequest>,
) -> Result<Json<AnalysisResponse>, StatusCode> {
    let prompt = AnalysisPrompts::exam_analysis(
        req.score,
        req.total,
        &req.subject,
        req.grade,
        req.time_taken,
    );

    let costs = ServiceCosts::default();

    Ok(Json(AnalysisResponse {
        success: true,
        prompt,
        credits_cost: costs.analysis,
    }))
}
```

### Step 3: Register Routes

Update `crates/edge-hive-api/src/lib.rs`:

```rust
// Add to mod declarations
pub mod handlers;
mod worldexams;

// In create_router() function:
let worldexams_routes = Router::new()
    .route("/api/v1/worldexams/questions", get(handlers::worldexams::get_questions))
    .route("/api/v1/worldexams/analysis", post(handlers::worldexams::generate_analysis));

// Merge with other routes
Router::new()
    .merge(health_routes)
    .merge(data_routes)
    .merge(worldexams_routes)  // Add this
    .merge(auth_routes)
    // ... rest of routes
```

### Step 4: Build and Test

```bash
# Build Edge Hive with WorldExams
cd termux-private-edge-server
cargo build --release

# Run server
./target/release/edge-hive serve

# Test endpoints
curl http://localhost:3000/api/v1/worldexams/questions?country=co&exam=icfes&grade=11&subject=matematicas&page=1

curl -X POST http://localhost:3000/api/v1/worldexams/analysis \
  -H "Content-Type: application/json" \
  -d '{
    "score": 18,
    "total": 20,
    "subject": "Matemáticas",
    "grade": 11,
    "time_taken": 1200
  }'
```

## 📁 Project Structure

```
workspace/
├── termux-private-edge-server/    # Edge Hive (generic infrastructure)
│   ├── crates/
│   │   ├── edge-hive-api/
│   │   │   └── src/handlers/
│   │   │       └── worldexams.rs  # Custom handlers
│   │   └── ...
│   └── Cargo.toml                 # References worldexams-edge-functions
│
└── worldexams/                     # WorldExams platform
    ├── edge-functions/             # Business logic (this crate)
    │   ├── src/
    │   │   ├── questions.rs
    │   │   ├── credits.rs
    │   │   └── analysis.rs
    │   └── Cargo.toml
    └── src/                        # Frontend (Astro)
```

## 🔐 Environment Variables

Add to Edge Hive's `.env`:

```env
# WorldExams Configuration
WORLDEXAMS_API_BASE=https://saberparatodos.pages.dev/api
WORLDEXAMS_RATE_LIMIT=100
WORLDEXAMS_GUEST_LIMIT=10

# AI Provider (Optional)
GEMINI_API_KEY=your_gemini_key_here
ANTHROPIC_API_KEY=your_claude_key_here
```

## 🚀 Deployment

### Docker Compose

```yaml
# docker-compose.yml
services:
  edge-hive:
    build: ./termux-private-edge-server
    ports:
      - "3000:3000"
    environment:
      - WORLDEXAMS_API_BASE=${WORLDEXAMS_API_BASE}
    volumes:
      - ./worldexams/edge-functions:/app/edge-functions:ro
```

### Kubernetes

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: edge-hive-worldexams
spec:
  replicas: 3
  template:
    spec:
      containers:
      - name: edge-hive
        image: edge-hive:latest
        env:
        - name: WORLDEXAMS_API_BASE
          value: "https://saberparatodos.pages.dev/api"
```

## 🧪 Testing Integration

```bash
# Test questions API
cargo test --package worldexams-edge-functions

# Test Edge Hive handlers
cargo test --package edge-hive-api worldexams

# Integration tests
cargo test --workspace -- --test-threads=1
```

## 📊 Monitoring

Edge Hive automatically monitors:
- Request rate to WorldExams endpoints
- Credit transaction volumes
- AI analysis usage
- Error rates

Access metrics at: `http://localhost:3000/api/v1/observability`

## 🔧 Troubleshooting

### Issue: "worldexams-edge-functions not found"

**Solution:** Ensure the path in `Cargo.toml` is correct:
```bash
ls ../worldexams/edge-functions/Cargo.toml  # Should exist
```

### Issue: "Failed to fetch questions"

**Solution:** Check network connectivity to static API:
```bash
curl https://saberparatodos.pages.dev/api/co/icfes/11/matematicas/1.json
```

### Issue: Build errors with features

**Solution:** Enable the feature flag:
```toml
worldexams-edge-functions = { path = "../worldexams/edge-functions", features = ["edge-hive-integration"] }
```

## 📚 Further Reading

- [Edge Hive Documentation](https://github.com/USER/termux-private-edge-server)
- [WorldExams API Docs](../../../docs/API_REAL_SETUP.md)
- [Credit System Guide](../../../docs/MONETIZATION_STRATEGY.md)
