use anyhow::Result;
use uuid::Uuid;
use crate::domain::entities::Party;
use crate::domain::repositories::PartyRepository;

pub struct CreatePartyUseCase<R: PartyRepository> {
    party_repo: R,
}

impl<R: PartyRepository> CreatePartyUseCase<R> {
    pub fn new(party_repo: R) -> Self {
        Self { party_repo }
    }

    pub async fn execute(
        &self,
        name: String,
        host_name: String,
        max_players: i32,
        time_per_question: i32,
        total_questions: i32,
        grade: i32,
        subject: String,
    ) -> Result<Party> {
        // Validate inputs
        if name.trim().is_empty() {
            anyhow::bail!("Party name cannot be empty");
        }

        if host_name.trim().is_empty() {
            anyhow::bail!("Host name cannot be empty");
        }

        if max_players < 1 || max_players > 1000 {
            anyhow::bail!("Max players must be between 1 and 1000");
        }

        if time_per_question < 10 || time_per_question > 600 {
            anyhow::bail!("Time per question must be between 10 and 600 seconds");
        }

        if total_questions < 1 || total_questions > 100 {
            anyhow::bail!("Total questions must be between 1 and 100");
        }

        // Create party entity
        let party = Party::new(
            name,
            host_name,
            max_players,
            time_per_question,
            total_questions,
            grade,
            subject,
        );

        // Persist to database
        self.party_repo.create(&party).await?;

        tracing::info!("Party created: {} (code: {})", party.name, party.code);

        Ok(party)
    }
}
