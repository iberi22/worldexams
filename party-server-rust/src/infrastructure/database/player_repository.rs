use async_trait::async_trait;
use sqlx::SqlitePool;
use uuid::Uuid;
use crate::domain::entities::player::Player;
use crate::domain::repositories::player_repository::{PlayerRepository, RepositoryError};

pub struct SqlitePlayerRepository {
    pool: SqlitePool,
}

impl SqlitePlayerRepository {
    pub fn new(pool: SqlitePool) -> Self {
        Self { pool }
    }
}

#[async_trait]
impl PlayerRepository for SqlitePlayerRepository {
    async fn create(&self, player: &Player) -> Result<(), RepositoryError> {
        sqlx::query(
            r#"
            INSERT INTO players (
                id, party_id, name, is_host, score,
                correct_answers, total_answers, joined_at, last_activity_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
        )
        .bind(player.id.to_string())
        .bind(player.party_id.to_string())
        .bind(&player.name)
        .bind(if player.is_host { 1 } else { 0 })
        .bind(player.score)
        .bind(player.correct_answers)
        .bind(player.total_answers)
        .bind(&player.joined_at.to_rfc3339())
        .bind(&player.last_activity_at.to_rfc3339())
        .execute(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Player>, RepositoryError> {
        let id_str = id.to_string();
        let row = sqlx::query_as::<_, (String, String, String, i32, i32, i32, i32, String, String)>(
            r#"
            SELECT id, party_id, name, is_host, score,
                   correct_answers, total_answers, joined_at, last_activity_at
            FROM players
            WHERE id = ?
            "#,
        )
        .bind(&id_str)
        .fetch_optional(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(row.map(|(id_str, party_id_str, name, is_host, score, correct_answers, total_answers, joined_at_str, last_activity_str)| {
            Player {
                id: Uuid::parse_str(&id_str).unwrap_or_default(),
                party_id: Uuid::parse_str(&party_id_str).unwrap_or_default(),
                name,
                is_online: true,
                is_host: is_host != 0,
                score,
                correct_answers,
                total_answers,
                streak: 0,
                best_streak: 0,
                avg_response_time: 0.0,
                joined_at: chrono::DateTime::parse_from_rfc3339(&joined_at_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                last_activity_at: chrono::DateTime::parse_from_rfc3339(&last_activity_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                left_screen_count: 0,
            }
        }))
    }

    async fn update(&self, player: &Player) -> Result<(), RepositoryError> {
        sqlx::query(
            r#"
            UPDATE players
            SET name = ?, is_host = ?, score = ?,
                correct_answers = ?, total_answers = ?, last_activity_at = ?
            WHERE id = ?
            "#,
        )
        .bind(&player.name)
        .bind(if player.is_host { 1 } else { 0 })
        .bind(player.score)
        .bind(player.correct_answers)
        .bind(player.total_answers)
        .bind(&player.last_activity_at.to_rfc3339())
        .bind(player.id.to_string())
        .execute(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn mark_disconnected(&self, id: &Uuid) -> Result<(), RepositoryError> {
        sqlx::query("UPDATE players SET is_online = 0 WHERE id = ?")
            .bind(id.to_string())
            .execute(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }

    async fn list_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>, RepositoryError> {
        let rows = sqlx::query_as::<_, (String, String, String, i32, i32, i32, i32, String, String)>(
            r#"
            SELECT id, party_id, name, is_host, score,
                   correct_answers, total_answers, joined_at, last_activity_at
            FROM players
            WHERE party_id = ?
            ORDER BY score DESC
            "#,
        )
        .bind(party_id.to_string())
        .fetch_all(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(rows
            .into_iter()
            .map(|(id_str, party_id_str, name, is_host, score, correct_answers, total_answers, joined_at_str, last_activity_str)| {
                Player {
                    id: Uuid::parse_str(&id_str).unwrap_or_default(),
                    party_id: Uuid::parse_str(&party_id_str).unwrap_or_default(),
                    name,
                    is_online: true,
                    is_host: is_host != 0,
                    score,
                    correct_answers,
                    total_answers,
                    streak: 0,
                    best_streak: 0,
                    avg_response_time: 0.0,
                    joined_at: chrono::DateTime::parse_from_rfc3339(&joined_at_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    last_activity_at: chrono::DateTime::parse_from_rfc3339(&last_activity_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    left_screen_count: 0,
                }
            })
            .collect())
    }

    async fn list_active_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>, RepositoryError> {
        let rows = sqlx::query_as::<_, (String, String, String, i32, i32, i32, i32, String, String)>(
            r#"
            SELECT id, party_id, name, is_host, score,
                   correct_answers, total_answers, joined_at, last_activity_at
            FROM players
            WHERE party_id = ? AND is_online = 1
            ORDER BY score DESC
            "#,
        )
        .bind(party_id.to_string())
        .fetch_all(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(rows
            .into_iter()
            .map(|(id_str, party_id_str, name, is_host, score, correct_answers, total_answers, joined_at_str, last_activity_str)| {
                Player {
                    id: Uuid::parse_str(&id_str).unwrap_or_default(),
                    party_id: Uuid::parse_str(&party_id_str).unwrap_or_default(),
                    name,
                    is_online: true,
                    is_host: is_host != 0,
                    score,
                    correct_answers,
                    total_answers,
                    streak: 0,
                    best_streak: 0,
                    avg_response_time: 0.0,
                    joined_at: chrono::DateTime::parse_from_rfc3339(&joined_at_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    last_activity_at: chrono::DateTime::parse_from_rfc3339(&last_activity_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    left_screen_count: 0,
                }
            })
            .collect())
    }

    async fn get_top_players(
        &self,
        party_id: &Uuid,
        limit: i32,
    ) -> Result<Vec<Player>, RepositoryError> {
        let rows = sqlx::query_as::<_, (String, String, String, i32, i32, i32, i32, String, String)>(
            r#"
            SELECT id, party_id, name, is_host, score,
                   correct_answers, total_answers, joined_at, last_activity_at
            FROM players
            WHERE party_id = ? AND is_online = 1
            ORDER BY score DESC
            LIMIT ?
            "#,
        )
        .bind(party_id.to_string())
        .bind(limit)
        .fetch_all(&self.pool)
        .await
        .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(rows
            .into_iter()
            .map(|(id_str, party_id_str, name, is_host, score, correct_answers, total_answers, joined_at_str, last_activity_str)| {
                Player {
                    id: Uuid::parse_str(&id_str).unwrap_or_default(),
                    party_id: Uuid::parse_str(&party_id_str).unwrap_or_default(),
                    name,
                    is_online: true,
                    is_host: is_host != 0,
                    score,
                    correct_answers,
                    total_answers,
                    streak: 0,
                    best_streak: 0,
                    avg_response_time: 0.0,
                    joined_at: chrono::DateTime::parse_from_rfc3339(&joined_at_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    last_activity_at: chrono::DateTime::parse_from_rfc3339(&last_activity_str).map(|dt| dt.with_timezone(&chrono::Utc)).unwrap_or_else(|_| chrono::Utc::now()),
                    left_screen_count: 0,
                }
            })
            .collect())
    }

    async fn count_by_party(&self, party_id: &Uuid) -> Result<i64, RepositoryError> {
        let (count,): (i64,) = sqlx::query_as("SELECT COUNT(*) FROM players WHERE party_id = ?")
            .bind(party_id.to_string())
            .fetch_one(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(count)
    }

    async fn record_suspicious_event(
        &self,
        _event: &crate::domain::entities::player::SuspiciousEvent,
    ) -> Result<(), RepositoryError> {
        // TODO: Implement suspicious event tracking
        Ok(())
    }

    async fn get_suspicious_events(
        &self,
        _player_id: &Uuid,
    ) -> Result<Vec<crate::domain::entities::player::SuspiciousEvent>, RepositoryError> {
        // TODO: Implement suspicious event retrieval
        Ok(vec![])
    }

    async fn count_suspicious_events_by_type(
        &self,
        _player_id: &Uuid,
        _event_type: &str,
    ) -> Result<i64, RepositoryError> {
        // TODO: Implement suspicious event counting
        Ok(0)
    }

    async fn delete(&self, id: &Uuid) -> Result<(), RepositoryError> {
        sqlx::query("DELETE FROM players WHERE id = ?")
            .bind(id.to_string())
            .execute(&self.pool)
            .await
            .map_err(|e| RepositoryError::DatabaseError(e.to_string()))?;

        Ok(())
    }
}
