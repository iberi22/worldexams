mod gemini;
mod content_discovery;
mod processing;

use anyhow::Result;
use dotenv::dotenv;
use std::env;

#[tokio::main]
async fn main() -> Result<()> {
    dotenv().ok();
    println!("Starting Daily Question Generator (V2.0)...");

    // 1. Search for new content (Human Curated)
    println!("Step 1: Searching for human-curated content...");
    let potential_questions = content_discovery::search_repositories().await?;

    // 2. Process and Generate
    println!("Step 2: Processing {} items...", potential_questions.len());
    processing::process_batch(potential_questions).await?;

    println!("Daily generation complete!");
    Ok(())
}
