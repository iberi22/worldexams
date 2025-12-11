pub mod party_repository;
pub mod player_repository;

use sqlx::{SqlitePool, sqlite::SqlitePoolOptions};
use anyhow::Result;

pub use party_repository::SqlitePartyRepository;
pub use player_repository::SqlitePlayerRepository;

pub async fn init_pool(database_url: &str) -> Result<SqlitePool> {
    let pool = SqlitePoolOptions::new()
        .max_connections(5)
        .connect(database_url)
        .await?;

    Ok(pool)
}
