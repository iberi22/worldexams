use async_trait::async_trait;
use anyhow::Result;
use sqlx::SqlitePool;
use uuid::Uuid;
use crate::domain::entities::Player;
use crate::domain::repositories::PlayerRepository;

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
    async fn create(&self, player: &Player) -> Result<()> {
        sqlx::query!(
            r#"
            INSERT INTO players (
                id, party_id, name, is_online, is_host,
                joined_at, left_screen_count, last_activity_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
            "#,
            player.id.to_string(),
            player.party_id.to_string(),
            player.name,
            player.is_online,
            player.is_host,
            player.joined_at.to_rfc3339(),
            player.left_screen_count,
            player.last_activity_at.to_rfc3339()
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Player>> {
        let record = sqlx::query!(
            r#"
            SELECT id, party_id, name, is_online, is_host,
                   joined_at, left_screen_count, last_activity_at
            FROM players WHERE id = ?
            "#,
            id.to_string()
        )
        .fetch_optional(&self.pool)
        .await?;

        match record {
            Some(r) => {
                use chrono::DateTime;

                Ok(Some(Player {
                    id: Uuid::parse_str(&r.id)?,
                    party_id: Uuid::parse_str(&r.party_id)?,
                    name: r.name,
                    is_online: r.is_online != 0,
                    is_host: r.is_host != 0,
                    joined_at: DateTime::parse_from_rfc3339(&r.joined_at)?.with_timezone(&chrono::Utc),
                    left_screen_count: r.left_screen_count,
                    last_activity_at: DateTime::parse_from_rfc3339(&r.last_activity_at)?.with_timezone(&chrono::Utc),
                }))
            }
            None => Ok(None),
        }
    }

    async fn find_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>> {
        let records = sqlx::query!(
            r#"
            SELECT id, party_id, name, is_online, is_host,
                   joined_at, left_screen_count, last_activity_at
            FROM players WHERE party_id = ?
            ORDER BY joined_at ASC
            "#,
            party_id.to_string()
        )
        .fetch_all(&self.pool)
        .await?;

        use chrono::DateTime;

        let players = records
            .into_iter()
            .filter_map(|r| {
                Some(Player {
                    id: Uuid::parse_str(&r.id).ok()?,
                    party_id: Uuid::parse_str(&r.party_id).ok()?,
                    name: r.name,
                    is_online: r.is_online != 0,
                    is_host: r.is_host != 0,
                    joined_at: DateTime::parse_from_rfc3339(&r.joined_at).ok()?.with_timezone(&chrono::Utc),
                    left_screen_count: r.left_screen_count,
                    last_activity_at: DateTime::parse_from_rfc3339(&r.last_activity_at).ok()?.with_timezone(&chrono::Utc),
                })
            })
            .collect();

        Ok(players)
    }

    async fn update(&self, player: &Player) -> Result<()> {
        sqlx::query!(
            r#"
            UPDATE players SET
                is_online = ?, left_screen_count = ?, last_activity_at = ?
            WHERE id = ?
            "#,
            player.is_online,
            player.left_screen_count,
            player.last_activity_at.to_rfc3339(),
            player.id.to_string()
        )
        .execute(&self.pool)
        .await?;

        Ok(())
    }

    async fn delete(&self, id: &Uuid) -> Result<()> {
        sqlx::query!("DELETE FROM players WHERE id = ?", id.to_string())
            .execute(&self.pool)
            .await?;

        Ok(())
    }

    async fn count_by_party(&self, party_id: &Uuid) -> Result<i64> {
        let record = sqlx::query!(
            "SELECT COUNT(*) as count FROM players WHERE party_id = ?",
            party_id.to_string()
        )
        .fetch_one(&self.pool)
        .await?;

        Ok(record.count as i64)
    }
}
