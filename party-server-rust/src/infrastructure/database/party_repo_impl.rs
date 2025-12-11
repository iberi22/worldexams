// src/infrastructure/database/party_repo_impl.rs
// SQLite implementation of PartyRepository trait

use crate::domain::entities::party::{Party, PartyConfig, PartyStatus};
use crate::domain::repositories::party_repository::{PartyRepository, RepositoryError};
use async_trait::async_trait;
use sqlx::SqlitePool;
use uuid::Uuid;

/// SQLite implementation of PartyRepository
pub struct SqlitePartyRepository {
    pool: SqlitePool,
}

impl SqlitePartyRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl PartyRepository for SqlitePartyRepository {
    async fn create(&self, party: &Party) -> Result<(), RepositoryError> {
        let config_json = serde_json::to_string(&party.config)
            .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

        sqlx::query!(
            r#"
            INSERT INTO parties (
                id, code, name, mode, host_id, host_name, max_players,
                status, current_question, total_questions, time_limit_seconds,
                created_at, started_at, finished_at, config
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
            party.id,
            party.code,
            party.name,
            party.mode,
            party.host_id,
            party.host_name,
            party.max_players,
            party.status,
            party.current_question,
            party.total_questions,
            party.time_limit_seconds,
            party.created_at,
            party.started_at,
            party.finished_at,
            config_json
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn find_by_code(&self, code: &str) -> Result<Option<Party>, RepositoryError> {
        let row = sqlx::query!(
            r#"
            SELECT id, code, name, mode, host_id, host_name, max_players,
                   status, current_question, total_questions, time_limit_seconds,
                   created_at, started_at, finished_at, config
            FROM parties
            WHERE code = ?
            "#,
            code
        )
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => {
                let config: PartyConfig = serde_json::from_str(&r.config)
                    .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

                Ok(Some(Party {
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    mode: r.mode,
                    host_id: r.host_id,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    status: r.status,
                    current_question: r.current_question,
                    total_questions: r.total_questions,
                    time_limit_seconds: r.time_limit_seconds,
                    created_at: r.created_at,
                    started_at: r.started_at,
                    finished_at: r.finished_at,
                    config,
                }))
            }
            None => Ok(None),
        }
    }

    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Party>, RepositoryError> {
        let id_str = id.to_string();
        let row = sqlx::query!(
            r#"
            SELECT id, code, name, mode, host_id, host_name, max_players,
                   status, current_question, total_questions, time_limit_seconds,
                   created_at, started_at, finished_at, config
            FROM parties
            WHERE id = ?
            "#,
            id_str
        )
        .fetch_optional(&self.pool)
        .await?;

        match row {
            Some(r) => {
                let config: PartyConfig = serde_json::from_str(&r.config)
                    .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

                Ok(Some(Party {
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    mode: r.mode,
                    host_id: r.host_id,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    status: r.status,
                    current_question: r.current_question,
                    total_questions: r.total_questions,
                    time_limit_seconds: r.time_limit_seconds,
                    created_at: r.created_at,
                    started_at: r.started_at,
                    finished_at: r.finished_at,
                    config,
                }))
            }
            None => Ok(None),
        }
    }

    async fn update(&self, party: &Party) -> Result<(), RepositoryError> {
        let config_json = serde_json::to_string(&party.config)
            .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

        let result = sqlx::query!(
            r#"
            UPDATE parties
            SET code = ?, name = ?, mode = ?, host_id = ?, host_name = ?,
                max_players = ?, status = ?, current_question = ?,
                total_questions = ?, time_limit_seconds = ?, started_at = ?,
                finished_at = ?, config = ?
            WHERE id = ?
            "#,
            party.code,
            party.name,
            party.mode,
            party.host_id,
            party.host_name,
            party.max_players,
            party.status,
            party.current_question,
            party.total_questions,
            party.time_limit_seconds,
            party.started_at,
            party.finished_at,
            config_json,
            party.id
        )
        .execute(&self.pool)
        .await?;

        if result.rows_affected() == 0 {
            return Err(RepositoryError::NotFound(format!(
                "Party with id {} not found",
                party.id
            )));
        }

        Ok(())
    }

    async fn delete(&self, id: &Uuid) -> Result<(), RepositoryError> {
        let id_str = id.to_string();
        let result = sqlx::query!("DELETE FROM parties WHERE id = ?", id_str)
            .execute(&self.pool)
            .await?;

        if result.rows_affected() == 0 {
            return Err(RepositoryError::NotFound(format!(
                "Party with id {} not found",
                id
            )));
        }

        Ok(())
    }

    async fn list_active(&self, limit: i32, offset: i32) -> Result<Vec<Party>, RepositoryError> {
        let rows = sqlx::query!(
            r#"
            SELECT id, code, name, mode, host_id, host_name, max_players,
                   status, current_question, total_questions, time_limit_seconds,
                   created_at, started_at, finished_at, config
            FROM parties
            WHERE status NOT IN ('finished', 'cancelled')
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            "#,
            limit,
            offset
        )
        .fetch_all(&self.pool)
        .await?;

        let parties: Result<Vec<Party>, RepositoryError> = rows
            .into_iter()
            .map(|r| {
                let config: PartyConfig = serde_json::from_str(&r.config)
                    .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

                Ok(Party {
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    mode: r.mode,
                    host_id: r.host_id,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    status: r.status,
                    current_question: r.current_question,
                    total_questions: r.total_questions,
                    time_limit_seconds: r.time_limit_seconds,
                    created_at: r.created_at,
                    started_at: r.started_at,
                    finished_at: r.finished_at,
                    config,
                })
            })
            .collect();

        parties
    }

    async fn list_by_status(
        &self,
        status: PartyStatus,
        limit: i32,
        offset: i32,
    ) -> Result<Vec<Party>, RepositoryError> {
        let status_str = status.to_string();
        let rows = sqlx::query!(
            r#"
            SELECT id, code, name, mode, host_id, host_name, max_players,
                   status, current_question, total_questions, time_limit_seconds,
                   created_at, started_at, finished_at, config
            FROM parties
            WHERE status = ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            "#,
            status_str,
            limit,
            offset
        )
        .fetch_all(&self.pool)
        .await?;

        let parties: Result<Vec<Party>, RepositoryError> = rows
            .into_iter()
            .map(|r| {
                let config: PartyConfig = serde_json::from_str(&r.config)
                    .map_err(|e| RepositoryError::SerializationError(e.to_string()))?;

                Ok(Party {
                    id: r.id,
                    code: r.code,
                    name: r.name,
                    mode: r.mode,
                    host_id: r.host_id,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    status: r.status,
                    current_question: r.current_question,
                    total_questions: r.total_questions,
                    time_limit_seconds: r.time_limit_seconds,
                    created_at: r.created_at,
                    started_at: r.started_at,
                    finished_at: r.finished_at,
                    config,
                })
            })
            .collect();

        parties
    }

    async fn count(&self) -> Result<i64, RepositoryError> {
        let result = sqlx::query!("SELECT COUNT(*) as count FROM parties")
            .fetch_one(&self.pool)
            .await?;

        Ok(result.count)
    }

    async fn count_by_status(&self, status: PartyStatus) -> Result<i64, RepositoryError> {
        let status_str = status.to_string();
        let result = sqlx::query!(
            "SELECT COUNT(*) as count FROM parties WHERE status = ?",
            status_str
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(result.count)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::domain::entities::party::Party;

    #[tokio::test]
    async fn test_create_and_find_party() {
        // Setup in-memory SQLite for testing
        let pool = SqlitePool::connect("sqlite::memory:")
            .await
            .expect("Failed to create pool");

        // Run migrations
        sqlx::migrate!("./migrations")
            .run(&pool)
            .await
            .expect("Failed to run migrations");

        let repo = SqlitePartyRepository::new(pool);

        // Create test party
        let party = Party::new(
            "Test Party".to_string(),
            "practice".to_string(),
            "host123".to_string(),
            "Teacher Name".to_string(),
            PartyConfig {
                max_players: 50,
                time_limit_seconds: Some(60),
                allow_pause: true,
                show_leaderboard: true,
                questions: vec![],
            },
        );

        // Test create
        repo.create(&party).await.expect("Failed to create party");

        // Test find by code
        let found = repo
            .find_by_code(&party.code)
            .await
            .expect("Failed to find party");

        assert!(found.is_some());
        let found_party = found.unwrap();
        assert_eq!(found_party.id, party.id);
        assert_eq!(found_party.name, "Test Party");
    }
}
