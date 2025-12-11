use async_trait::async_trait;
use anyhow::Result;
use sqlx::SqlitePool;
use uuid::Uuid;
use crate::domain::entities::Party;
use crate::domain::repositories::PartyRepository;

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
    async fn create(&self, party: &Party) -> Result<()> {
        sqlx::query!(
            r#"
            INSERT INTO parties (
                id, code, name, host_id, host_name, max_players,
                time_per_question, total_questions, grade, subject,
                status, created_at, started_at, finished_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            "#,
            party.id.to_string(),
            party.code,
            party.name,
            party.host_id.to_string(),
            party.host_name,
            party.max_players,
            party.time_per_question,
            party.total_questions,
            party.grade,
            party.subject,
            format!("{:?}", party.status).to_lowercase(),
            party.created_at.to_rfc3339(),
            party.started_at.map(|t| t.to_rfc3339()),
            party.finished_at.map(|t| t.to_rfc3339()),
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Party>> {
        let record = sqlx::query!(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties WHERE id = ?
            "#,
            id.to_string()
        )
        .fetch_optional(&self.pool)
        .await?;

        match record {
            Some(r) => {
                use crate::domain::entities::PartyStatus;
                use chrono::DateTime;

                let status = match r.status.as_str() {
                    "waiting" => PartyStatus::Waiting,
                    "active" => PartyStatus::Active,
                    "paused" => PartyStatus::Paused,
                    "finished" => PartyStatus::Finished,
                    _ => PartyStatus::Waiting,
                };

                Ok(Some(Party {
                    id: Uuid::parse_str(&r.id)?,
                    code: r.code,
                    name: r.name,
                    host_id: Uuid::parse_str(&r.host_id)?,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    time_per_question: r.time_per_question,
                    total_questions: r.total_questions,
                    grade: r.grade,
                    subject: r.subject,
                    status,
                    created_at: DateTime::parse_from_rfc3339(&r.created_at)?.with_timezone(&chrono::Utc),
                    started_at: r.started_at.map(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))).flatten(),
                    finished_at: r.finished_at.map(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))).flatten(),
                }))
            }
            None => Ok(None),
        }
    }

    async fn find_by_code(&self, code: &str) -> Result<Option<Party>> {
        let record = sqlx::query!(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties WHERE code = ?
            "#,
            code
        )
        .fetch_optional(&self.pool)
        .await?;

        match record {
            Some(r) => {
                use crate::domain::entities::PartyStatus;
                use chrono::DateTime;

                let status = match r.status.as_str() {
                    "waiting" => PartyStatus::Waiting,
                    "active" => PartyStatus::Active,
                    "paused" => PartyStatus::Paused,
                    "finished" => PartyStatus::Finished,
                    _ => PartyStatus::Waiting,
                };

                Ok(Some(Party {
                    id: Uuid::parse_str(&r.id)?,
                    code: r.code,
                    name: r.name,
                    host_id: Uuid::parse_str(&r.host_id)?,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    time_per_question: r.time_per_question,
                    total_questions: r.total_questions,
                    grade: r.grade,
                    subject: r.subject,
                    status,
                    created_at: DateTime::parse_from_rfc3339(&r.created_at)?.with_timezone(&chrono::Utc),
                    started_at: r.started_at.map(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))).flatten(),
                    finished_at: r.finished_at.map(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))).flatten(),
                }))
            }
            None => Ok(None),
        }
    }

    async fn update(&self, party: &Party) -> Result<()> {
        sqlx::query!(
            r#"
            UPDATE parties SET
                name = ?, max_players = ?, time_per_question = ?,
                total_questions = ?, grade = ?, subject = ?,
                status = ?, started_at = ?, finished_at = ?
            WHERE id = ?
            "#,
            party.name,
            party.max_players,
            party.time_per_question,
            party.total_questions,
            party.grade,
            party.subject,
            format!("{:?}", party.status).to_lowercase(),
            party.started_at.map(|t| t.to_rfc3339()),
            party.finished_at.map(|t| t.to_rfc3339()),
            party.id.to_string()
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete(&self, id: &Uuid) -> Result<()> {
        sqlx::query!("DELETE FROM parties WHERE id = ?", id.to_string())
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn list_active(&self) -> Result<Vec<Party>> {
        let records = sqlx::query!(
            r#"
            SELECT id, code, name, host_id, host_name, max_players,
                   time_per_question, total_questions, grade, subject,
                   status, created_at, started_at, finished_at
            FROM parties 
            WHERE status IN ('waiting', 'active', 'paused')
            ORDER BY created_at DESC
            "#
        )
        .fetch_all(&self.pool)
        .await?;

        use crate::domain::entities::PartyStatus;
        use chrono::DateTime;

        let parties = records
            .into_iter()
            .filter_map(|r| {
                let status = match r.status.as_str() {
                    "waiting" => PartyStatus::Waiting,
                    "active" => PartyStatus::Active,
                    "paused" => PartyStatus::Paused,
                    "finished" => PartyStatus::Finished,
                    _ => return None,
                };

                Some(Party {
                    id: Uuid::parse_str(&r.id).ok()?,
                    code: r.code,
                    name: r.name,
                    host_id: Uuid::parse_str(&r.host_id).ok()?,
                    host_name: r.host_name,
                    max_players: r.max_players,
                    time_per_question: r.time_per_question,
                    total_questions: r.total_questions,
                    grade: r.grade,
                    subject: r.subject,
                    status,
                    created_at: DateTime::parse_from_rfc3339(&r.created_at).ok()?.with_timezone(&chrono::Utc),
                    started_at: r.started_at.and_then(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))),
                    finished_at: r.finished_at.and_then(|s| DateTime::parse_from_rfc3339(&s).ok().map(|dt| dt.with_timezone(&chrono::Utc))),
                })
            })
            .collect();

        Ok(parties)
    }
}
