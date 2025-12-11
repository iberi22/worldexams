use serde::{Deserialize, Serialize};
use chrono::{DateTime, Utc};
use uuid::Uuid;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Party {
    pub id: Uuid,
    pub code: String, // 6-char alphanumeric code for easy joining
    pub name: String,
    pub host_id: Uuid,
    pub host_name: String,
    pub max_players: i32,
    pub time_per_question: i32, // seconds
    pub total_questions: i32,
    pub grade: i32,
    pub subject: String,
    pub status: PartyStatus,
    pub created_at: DateTime<Utc>,
    pub started_at: Option<DateTime<Utc>>,
    pub finished_at: Option<DateTime<Utc>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "lowercase")]
pub enum PartyStatus {
    Waiting,
    Active,
    Paused,
    Finished,
}

impl Party {
    pub fn new(
        name: String,
        host_name: String,
        max_players: i32,
        time_per_question: i32,
        total_questions: i32,
        grade: i32,
        subject: String,
    ) -> Self {
        Self {
            id: Uuid::new_v4(),
            code: Self::generate_code(),
            name,
            host_id: Uuid::new_v4(),
            host_name,
            max_players,
            time_per_question,
            total_questions,
            grade,
            subject,
            status: PartyStatus::Waiting,
            created_at: Utc::now(),
            started_at: None,
            finished_at: None,
        }
    }

    fn generate_code() -> String {
        use rand::Rng;
        const CHARSET: &[u8] = b"ABCDEFGHJKLMNPQRSTUVWXYZ23456789"; // Exclude ambiguous chars
        let mut rng = rand::thread_rng();
        
        (0..6)
            .map(|_| {
                let idx = rng.gen_range(0..CHARSET.len());
                CHARSET[idx] as char
            })
            .collect()
    }

    pub fn start(&mut self) {
        self.status = PartyStatus::Active;
        self.started_at = Some(Utc::now());
    }

    pub fn pause(&mut self) {
        self.status = PartyStatus::Paused;
    }

    pub fn finish(&mut self) {
        self.status = PartyStatus::Finished;
        self.finished_at = Some(Utc::now());
    }

    pub fn is_full(&self, current_players: i32) -> bool {
        current_players >= self.max_players
    }

    pub fn can_start(&self, current_players: i32) -> bool {
        self.status == PartyStatus::Waiting && current_players > 0
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_generate_code() {
        let party = Party::new(
            "Test Party".to_string(),
            "Host".to_string(),
            100,
            60,
            20,
            11,
            "Matemáticas".to_string(),
        );
        
        assert_eq!(party.code.len(), 6);
        assert!(party.code.chars().all(|c| c.is_ascii_alphanumeric()));
    }

    #[test]
    fn test_party_lifecycle() {
        let mut party = Party::new(
            "Test".to_string(),
            "Host".to_string(),
            10,
            60,
            20,
            11,
            "Math".to_string(),
        );

        assert_eq!(party.status, PartyStatus::Waiting);
        assert!(party.can_start(5));

        party.start();
        assert_eq!(party.status, PartyStatus::Active);
        assert!(party.started_at.is_some());

        party.finish();
        assert_eq!(party.status, PartyStatus::Finished);
        assert!(party.finished_at.is_some());
    }
}
