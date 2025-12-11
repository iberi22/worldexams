use actix_web::{web, HttpRequest, HttpResponse, Responder};
use serde_json::json;
use serde::Deserialize;
use std::sync::Arc;

use crate::infrastructure::database::{SqlitePartyRepository, SqlitePlayerRepository};
use crate::infrastructure::websocket::RoomManager;
use crate::domain::entities::party::Party;
use crate::domain::repositories::PartyRepository;

pub struct AppState {
    pub party_repo: SqlitePartyRepository,
    pub player_repo: SqlitePlayerRepository,
    pub room_manager: RoomManager,
}

#[derive(Deserialize)]
pub struct CreatePartyRequest {
    pub name: String,
    pub host_name: String,
    pub max_players: i32,
    pub time_per_question: i32,
    pub total_questions: i32,
    pub grade: i32,
    pub subject: String,
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/health", web::get().to(health_check))
        .route("/api/parties", web::post().to(create_party))
        .route("/api/parties/{code}", web::get().to(get_party))
        .route("/api/parties/{code}/join", web::post().to(join_party))
        .route("/api/parties/{code}/players", web::get().to(list_players))
        .route("/ws/{party_code}", web::get().to(websocket_handler));
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "healthy",
        "version": env!("CARGO_PKG_VERSION"),
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}

async fn create_party(
    req: web::Json<CreatePartyRequest>,
    data: web::Data<AppState>,
) -> impl Responder {
    let party = Party::new(
        req.name.clone(),
        req.host_name.clone(),
        req.max_players,
        req.time_per_question,
        req.total_questions,
        req.grade,
        req.subject.clone(),
    );
    
    match data.party_repo.create(&party).await {
        Ok(_) => HttpResponse::Ok().json(party),
        Err(e) => HttpResponse::InternalServerError().json(json!({"error": e.to_string()})),
    }
}

async fn get_party(
    _path: web::Path<String>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement get party
    HttpResponse::Ok().json(json!({"status": "todo"}))
}
async fn join_party(
    _path: web::Path<String>,
    _req: web::Json<serde_json::Value>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement join party
    HttpResponse::Ok().json(json!({"status": "todo"}))
}

async fn list_players(
    _path: web::Path<String>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement list players
    HttpResponse::Ok().json(json!({"status": "todo"}))
}

async fn websocket_handler(
    req: HttpRequest,
    path: web::Path<String>,
    stream: web::Payload,
    data: web::Data<AppState>,
) -> Result<HttpResponse, actix_web::Error> {
    let party_code = path.into_inner();
    
    // Get or create room
    let room = data.room_manager.get_or_create_room(
        party_code.clone(),
        Arc::new(data.party_repo.clone())
    ).await;
    
    // Create connection actor
    let conn = crate::infrastructure::websocket::party_actor::PartyConnection {
        party_code,
        player_id: None,
        room,
    };
    
    // Start WebSocket
    actix_web_actors::ws::start(conn, &req, stream)
}
