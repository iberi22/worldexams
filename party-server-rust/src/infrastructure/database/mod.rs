pub mod party_repository;
pub mod player_repository;

use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};
use anyhow::Result;
use std::path::Path;

pub use party_repository::SqlitePartyRepository;
pub use player_repository::SqlitePlayerRepository;

pub async fn init_pool(database_url: &str) -> Result<SqlitePool> {
    // Extract file path from SQLite URL
    let db_path = if database_url.starts_with("sqlite://") {
        database_url.trim_start_matches("sqlite://")
    } else {
        database_url
    };

    // Create parent directory if it doesn't exist
    if let Some(parent) = Path::new(db_path).parent() {
        std::fs::create_dir_all(parent)?;
    }

    // Ensure database file exists
    if !Path::new(db_path).exists() {
        std::fs::File::create(db_path)?;
    }

    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;

    Ok(pool)
}
