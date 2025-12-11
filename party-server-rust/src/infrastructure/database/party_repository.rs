use async_trait::async_trait;
use sqlx::SqlitePool;
use uuid::Uuid;
use chrono::{DateTime, Utc};
use crate::domain::entities::party::{Party, PartyStatus};
use crate::domain::repositories::party_repository::{PartyRepository, RepositoryError};

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
        sqlx::query(
            r#"
            INSERT INTO parties (
                id, code, name, host_id, host_name, max_players,
                time_per_question, total_questions, grade, subject,
                status, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(party.id.to_string())
        .bind(&party.code)
        .bind(&party.name)
        .bind(party.host_id.to_string())
        .bind(&party.host_name)
        .bind(party.max_players)
        .bind(party.time_per_question)
        .bind(party.total_questions)
        .bind(party.grade)
        .bind(&party.subject)
        .bind(format!("{:?}", party.status).to_lowercase())
        .bind(&party.created_at.to_rfc3339())
        .execute(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Party>, RepositoryError> {
        let id_str = id.to_string();
        let row = sqlx::query_as::<_, (String, String, String, String, String, i32, i32, i32, i32, String, String, String, Option<String>, Option<String>)>(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties
            WHERE id = ?
            "#,
        )
        .bind(&id_str)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(row.map(|(id_str, code, name, host_id_str, host_name, max_players, time_per_question, total_questions, grade, subject, status, created_at_str, started_at_str, finished_at_str)| {
            Party {
                id: Uuid::parse_str(&id_str).unwrap_or_default(),
                code,
                name,
                host_id: Uuid::parse_str(&host_id_str).unwrap_or_default(),
                host_name,
                max_players,
                time_per_question,
                total_questions,
                grade,
                subject,
                status: match status.to_lowercase().as_str() {
                    "active" => PartyStatus::Active,
                    "paused" => PartyStatus::Paused,
                    "finished" => PartyStatus::Finished,
                    _ => PartyStatus::Waiting,
                },
                created_at: DateTime::parse_from_rfc3339(&created_at_str).map(|dt| dt.with_timezone(&Utc)).unwrap_or_else(|_| Utc::now()),
                started_at: started_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                finished_at: finished_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
            }
        }))
    }

    async fn find_by_code(&self, code: &str) -> Result<Option<Party>, RepositoryError> {
        let row = sqlx::query_as::<_, (String, String, String, String, String, i32, i32, i32, i32, String, String, String, Option<String>, Option<String>)>(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties
            WHERE code = ?
            "#,
        )
        .bind(code)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(row.map(|(id_str, code, name, host_id_str, host_name, max_players, time_per_question, total_questions, grade, subject, status, created_at_str, started_at_str, finished_at_str)| {
            Party {
                id: Uuid::parse_str(&id_str).unwrap_or_default(),
                code,
                name,
                host_id: Uuid::parse_str(&host_id_str).unwrap_or_default(),
                host_name,
                max_players,
                time_per_question,
                total_questions,
                grade,
                subject,
                status: match status.to_lowercase().as_str() {
                    "active" => PartyStatus::Active,
                    "paused" => PartyStatus::Paused,
                    "finished" => PartyStatus::Finished,
                    _ => PartyStatus::Waiting,
                },
                created_at: DateTime::parse_from_rfc3339(&created_at_str).map(|dt| dt.with_timezone(&Utc)).unwrap_or_else(|_| Utc::now()),
                started_at: started_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                finished_at: finished_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
            }
        }))
    }

    async fn update(&self, party: &Party) -> Result<(), RepositoryError> {
        sqlx::query(
            r#"
            UPDATE parties
            SET code = ?, name = ?, max_players = ?,
                time_per_question = ?, total_questions = ?,
                grade = ?, subject = ?, status = ?,
                started_at = ?, finished_at = ?
            WHERE id = ?
            "#,
        )
        .bind(&party.code)
        .bind(&party.name)
        .bind(party.max_players)
        .bind(party.time_per_question)
        .bind(party.total_questions)
        .bind(party.grade)
        .bind(&party.subject)
        .bind(format!("{:?}", party.status).to_lowercase())
        .bind(party.started_at.as_ref().map(|dt| dt.to_rfc3339()))
        .bind(party.finished_at.as_ref().map(|dt| dt.to_rfc3339()))
        .bind(party.id.to_string())
        .execute(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn delete(&self, id: &Uuid) -> Result<(), RepositoryError> {
        sqlx::query("DELETE FROM parties WHERE id = ?")
            .bind(id.to_string())
            .execute(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn list_active(&self, limit: i32, offset: i32) -> Result<Vec<Party>, RepositoryError> {
        let rows = sqlx::query_as::<_, (String, String, String, String, String, i32, i32, i32, i32, String, String, String, Option<String>, Option<String>)>(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties
            WHERE status IN ('waiting', 'active', 'paused')
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            "#,
        )
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(rows
            .into_iter()
            .map(|(id_str, code, name, host_id_str, host_name, max_players, time_per_question, total_questions, grade, subject, status, created_at_str, started_at_str, finished_at_str)| {
                Party {
                    id: Uuid::parse_str(&id_str).unwrap_or_default(),
                    code,
                    name,
                    host_id: Uuid::parse_str(&host_id_str).unwrap_or_default(),
                    host_name,
                    max_players,
                    time_per_question,
                    total_questions,
                    grade,
                    subject,
                    status: match status.to_lowercase().as_str() {
                        "active" => PartyStatus::Active,
                        "paused" => PartyStatus::Paused,
                        "finished" => PartyStatus::Finished,
                        _ => PartyStatus::Waiting,
                    },
                    created_at: DateTime::parse_from_rfc3339(&created_at_str).map(|dt| dt.with_timezone(&Utc)).unwrap_or_else(|_| Utc::now()),
                    started_at: started_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                    finished_at: finished_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                }
            })
            .collect())
    }

    async fn list_by_status(&self, status: &str, limit: i32, offset: i32) -> Result<Vec<Party>, RepositoryError> {
        let rows = sqlx::query_as::<_, (String, String, String, String, String, i32, i32, i32, i32, String, String, String, Option<String>, Option<String>)>(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties
            WHERE status = ?
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            "#,
        )
        .bind(status)
        .bind(limit)
        .bind(offset)
        .fetch_all(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(rows
            .into_iter()
            .map(|(id_str, code, name, host_id_str, host_name, max_players, time_per_question, total_questions, grade, subject, status, created_at_str, started_at_str, finished_at_str)| {
                Party {
                    id: Uuid::parse_str(&id_str).unwrap_or_default(),
                    code,
                    name,
                    host_id: Uuid::parse_str(&host_id_str).unwrap_or_default(),
                    host_name,
                    max_players,
                    time_per_question,
                    total_questions,
                    grade,
                    subject,
                    status: match status.to_lowercase().as_str() {
                        "active" => PartyStatus::Active,
                        "paused" => PartyStatus::Paused,
                        "finished" => PartyStatus::Finished,
                        _ => PartyStatus::Waiting,
                    },
                    created_at: DateTime::parse_from_rfc3339(&created_at_str).map(|dt| dt.with_timezone(&Utc)).unwrap_or_else(|_| Utc::now()),
                    started_at: started_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                    finished_at: finished_at_str.as_ref().and_then(|s| DateTime::parse_from_rfc3339(s).ok().map(|dt| dt.with_timezone(&Utc))),
                }
            })
            .collect())
    }

    async fn count(&self) -> Result<i64, RepositoryError> {
        let (count,): (i64,) = sqlx::query_as("SELECT COUNT(*) FROM parties")
            .fetch_one(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(count)
    }

    async fn count_by_status(&self, status: &str) -> Result<i64, RepositoryError> {
        let (count,): (i64,) = sqlx::query_as("SELECT COUNT(*) FROM parties WHERE status = ?")
            .bind(status)
            .fetch_one(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(count)
    }
}
