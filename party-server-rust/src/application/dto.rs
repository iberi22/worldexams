use serde::{Deserialize, Serialize};
use uuid::Uuid;
use crate::domain::entities::Party;

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePartyRequest {
    pub name: String,
    pub host_name: String,
    pub max_players: i32,
    pub time_per_question: i32,
    pub total_questions: i32,
    pub grade: i32,
    pub subject: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct CreatePartyResponse {
    pub id: Uuid,
    pub code: String,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JoinPartyRequest {
    pub player_name: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct JoinPartyResponse {
    pub player_id: Uuid,
    pub party: Party,
    pub message: String,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct PartyDetailsResponse {
    pub party: Party,
    pub player_count: i64,
}
