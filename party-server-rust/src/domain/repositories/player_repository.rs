// src/domain/repositories/player_repository.rs
// Trait defining persistence operations for Player entity

use crate::domain::entities::player::{Player, SuspiciousEvent};
use async_trait::async_trait;
use uuid::Uuid;

/// Repository trait for Player aggregate
#[async_trait]
pub trait PlayerRepository: Send + Sync {
    /// Create a new player
    async fn create(&self, player: &Player) -> Result<(), RepositoryError>;

    /// Find player by UUID
    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Player>, RepositoryError>;

    /// Update player stats (score, answers, etc.)
    async fn update(&self, player: &Player) -> Result<(), RepositoryError>;

    /// Mark player as disconnected
    async fn mark_disconnected(&self, id: &Uuid) -> Result<(), RepositoryError>;

    /// List all players in a party
    async fn list_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>, RepositoryError>;

    /// List only active players (not disconnected)
    async fn list_active_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>, RepositoryError>;

    /// Get top N players by score in a party
    async fn get_top_players(
        &self,
        party_id: &Uuid,
        limit: i32,
    ) -> Result<Vec<Player>, RepositoryError>;

    /// Count players in a party
    async fn count_by_party(&self, party_id: &Uuid) -> Result<i64, RepositoryError>;

    /// Record suspicious event for anti-cheat
    async fn record_suspicious_event(
        &self,
        event: &SuspiciousEvent,
    ) -> Result<(), RepositoryError>;

    /// Get suspicious events for a player
    async fn get_suspicious_events(
        &self,
        player_id: &Uuid,
    ) -> Result<Vec<SuspiciousEvent>, RepositoryError>;

    /// Count suspicious events by type for a player
    async fn count_suspicious_events_by_type(
        &self,
        player_id: &Uuid,
        event_type: &str,
    ) -> Result<i64, RepositoryError>;

    /// Delete player (cascade deletes suspicious events)
    async fn delete(&self, id: &Uuid) -> Result<(), RepositoryError>;
}

/// Repository errors
#[derive(Debug, thiserror::Error)]
pub enum RepositoryError {
    #[error("Database error: {0}")]
    DatabaseError(String),

    #[error("Player not found: {0}")]
    NotFound(String),

    #[error("Constraint violation: {0}")]
    ConstraintViolation(String),

    #[error("Serialization error: {0}")]
    SerializationError(String),
}

impl From<sqlx::Error> for RepositoryError {
    fn from(error: sqlx::Error) -> Self {
        match error {
            sqlx::Error::RowNotFound => RepositoryError::NotFound("Player not found".to_string()),
            sqlx::Error::Database(db_err) => {
                if db_err.is_check_violation() || db_err.is_foreign_key_violation() {
                    RepositoryError::ConstraintViolation(db_err.to_string())
                } else {
                    RepositoryError::DatabaseError(db_err.to_string())
                }
            }
            _ => RepositoryError::DatabaseError(error.to_string()),
        }
    }
}
