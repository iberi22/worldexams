//! WorldExams Edge Functions
//!
//! Business logic for the WorldExams education platform.
//! Extracted from Edge Hive to keep the platform's proprietary logic separate.
//!
//! ## Structure
//!
//! - `questions/` - Question fetching and caching logic
//! - `credits/` - Credit system and billing management
//! - `analysis/` - AI-powered exam analysis
//!
//! ## Integration
//!
//! This crate can be used:
//! 1. **Standalone** - Direct integration with any backend
//! 2. **With Edge Hive** - As a plugin for Edge Hive infrastructure
//! 3. **With Supabase** - Using Supabase Edge Functions
//!
//! ## Usage
//!
//! ```rust
//! use worldexams_edge_functions::questions::{fetch_questions, QuestionsConfig};
//!
//! #[tokio::main]
//! async fn main() {
//!     let config = QuestionsConfig::default();
//!     let questions = fetch_questions(&config, "co", "icfes", "11", "matematicas", 1)
//!         .await
//!         .unwrap();
//!     println!("Fetched {} questions", questions.len());
//! }
//! ```

pub mod questions;
pub mod credits;
pub mod analysis;

// Re-export main types
pub use questions::*;
pub use credits::*;
pub use analysis::*;
