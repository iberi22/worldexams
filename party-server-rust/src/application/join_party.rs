use anyhow::Result;

use crate::domain::entities::{Party, Player};
use crate::domain::repositories::{PartyRepository, PlayerRepository};

pub struct JoinPartyUseCase<PR: PartyRepository, PLR: PlayerRepository> {
    party_repo: PR,
    player_repo: PLR,
}

impl<PR: PartyRepository, PLR: PlayerRepository> JoinPartyUseCase<PR, PLR> {
    pub fn new(party_repo: PR, player_repo: PLR) -> Self {
        Self {
            party_repo,
            player_repo,
        }
    }

    pub async fn execute(
        &self,
        party_code: &str,
        player_name: String,
    ) -> Result<(Party, Player)> {
        // Validate inputs
        if player_name.trim().is_empty() {
            anyhow::bail!("Player name cannot be empty");
        }

        // Find party by code
        let party = self
            .party_repo
            .find_by_code(party_code)
            .await?
            .ok_or_else(|| anyhow::anyhow!("Party not found with code: {}", party_code))?;

        // Check if party is waiting
        if party.status != crate::domain::entities::PartyStatus::Waiting {
            anyhow::bail!("Party has already started or finished");
        }

        // Check if party is full
        let current_players = self.player_repo.count_by_party(&party.id).await?;
        if party.is_full(current_players as i32) {
            anyhow::bail!("Party is full");
        }

        // Create player
        let player = Player::new(party.id, player_name, false);

        // Persist player
        self.player_repo.create(&player).await?;

        tracing::info!(
            "Player {} joined party {} (code: {})",
            player.name,
            party.name,
            party.code
        );

        Ok((party, player))
    }
}
