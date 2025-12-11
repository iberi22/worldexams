// src/domain/repositories/party_repository.rs
// Trait defining persistence operations for Party entity (hexagonal architecture)

use crate::domain::entities::party::Party;
use async_trait::async_trait;
use uuid::Uuid;

/// Repository trait for Party aggregate
/// This abstracts database operations, allowing different implementations
/// (SQLite, PostgreSQL, in-memory for testing)
#[async_trait]
pub trait PartyRepository: Send + Sync {
    /// Create a new party in persistent storage
    async fn create(&self, party: &Party) -> Result<(), RepositoryError>;

    /// Find party by unique code (6-char alphanumeric)
    async fn find_by_code(&self, code: &str) -> Result<Option<Party>, RepositoryError>;

    /// Find party by UUID
    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Party>, RepositoryError>;

    /// Update existing party
    async fn update(&self, party: &Party) -> Result<(), RepositoryError>;

    /// Delete party (soft delete recommended)
    async fn delete(&self, id: &Uuid) -> Result<(), RepositoryError>;

    /// List all active parties (status != finished && != cancelled)
    async fn list_active(&self, limit: i32, offset: i32) -> Result<Vec<Party>, RepositoryError>;

    /// List parties by status
    async fn list_by_status(
        &self,
        status: &str,
        limit: i32,
        offset: i32,
    ) -> Result<Vec<Party>, RepositoryError>;

    /// Count total parties (for pagination)
    async fn count(&self) -> Result<i64, RepositoryError>;

    /// Count parties by status
    async fn count_by_status(&self, status: &str) -> Result<i64, RepositoryError>;
}

/// Repository errors
#[derive(Debug, thiserror::Error)]
pub enum RepositoryError {
    #[error("Database error: {0}")]
    DatabaseError(String),

    #[error("Party not found: {0}")]
    NotFound(String),

    #[error("Duplicate party code: {0}")]
    DuplicateCode(String),

    #[error("Constraint violation: {0}")]
    ConstraintViolation(String),

    #[error("Serialization error: {0}")]
    SerializationError(String),
}

// Implement conversion from sqlx::Error to RepositoryError
impl From<sqlx::Error> for RepositoryError {
    fn from(error: sqlx::Error) -> Self {
        match error {
            sqlx::Error::RowNotFound => RepositoryError::NotFound("Party not found".to_string()),
            sqlx::Error::Database(db_err) => {
                if db_err.is_unique_violation() {
                    RepositoryError::DuplicateCode("Party code already exists".to_string())
                } else if db_err.is_check_violation() || db_err.is_foreign_key_violation() {
                    RepositoryError::ConstraintViolation(db_err.to_string())
                } else {
                    RepositoryError::DatabaseError(db_err.to_string())
                }
            }
            _ => RepositoryError::DatabaseError(error.to_string()),
        }
    }
}
