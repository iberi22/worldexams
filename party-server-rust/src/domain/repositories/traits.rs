use async_trait::async_trait;
use anyhow::Result;
use uuid::Uuid;
use crate::domain::entities::{Party, Player, SuspiciousEvent};

/// Repository trait for Party operations (Port)
#[async_trait]
pub trait PartyRepository: Send + Sync {
    async fn create(&self, party: &Party) -> Result<()>;
    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Party>>;
    async fn find_by_code(&self, code: &str) -> Result<Option<Party>>;
    async fn update(&self, party: &Party) -> Result<()>;
    async fn delete(&self, id: &Uuid) -> Result<()>;
    async fn list_active(&self) -> Result<Vec<Party>>;
}

/// Repository trait for Player operations (Port)
#[async_trait]
pub trait PlayerRepository: Send + Sync {
    async fn create(&self, player: &Player) -> Result<()>;
    async fn find_by_id(&self, id: &Uuid) -> Result<Option<Player>>;
    async fn find_by_party(&self, party_id: &Uuid) -> Result<Vec<Player>>;
    async fn update(&self, player: &Player) -> Result<()>;
    async fn delete(&self, id: &Uuid) -> Result<()>;
    async fn count_by_party(&self, party_id: &Uuid) -> Result<i64>;
}

/// Repository trait for SuspiciousEvent operations (Port)
#[async_trait]
pub trait SuspiciousEventRepository: Send + Sync {
    async fn create(&self, event: &SuspiciousEvent) -> Result<()>;
    async fn find_by_player(&self, player_id: &Uuid) -> Result<Vec<SuspiciousEvent>>;
    async fn count_by_player(&self, player_id: &Uuid) -> Result<i64>;
}
