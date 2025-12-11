use actix_web::{web, HttpRequest, HttpResponse, Responder};
use serde_json::json;

use crate::infrastructure::database::{SqlitePartyRepository, SqlitePlayerRepository};
use crate::infrastructure::websocket::RoomManager;

pub struct AppState {
    pub party_repo: SqlitePartyRepository,
    pub player_repo: SqlitePlayerRepository,
    pub room_manager: RoomManager,
}

pub fn configure(cfg: &mut web::ServiceConfig) {
    cfg
        .route("/health", web::get().to(health_check))
        .route("/api/parties", web::post().to(create_party::<SqlitePartyRepository, SqlitePlayerRepository>))
        .route("/api/parties/{code}", web::get().to(get_party::<SqlitePartyRepository>))
        .route("/api/parties/{code}/join", web::post().to(join_party::<SqlitePartyRepository, SqlitePlayerRepository>))
        .route("/api/parties/{code}/players", web::get().to(list_players::<SqlitePlayerRepository>))
        .route("/ws/{party_code}", web::get().to(websocket_handler));
}

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(json!({
        "status": "healthy",
        "version": env!("CARGO_PKG_VERSION"),
        "timestamp": chrono::Utc::now().to_rfc3339()
    }))
}

async fn create_party<PR, PLR>(
    _req: web::Json<serde_json::Value>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement create party
    HttpResponse::Ok().json(json!({"status": "todo"}))
}

async fn get_party<PR>(
    _path: web::Path<String>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement get party
    HttpResponse::Ok().json(json!({"status": "todo"}))
}
async fn join_party<PR, PLR>(
    _path: web::Path<String>,
    _req: web::Json<serde_json::Value>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement join party
    HttpResponse::Ok().json(json!({"status": "todo"}))
}

async fn list_players<PR>(
    _path: web::Path<String>,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement list players
    HttpResponse::Ok().json(json!({"status": "todo"}))
}

async fn websocket_handler(
    _req: HttpRequest,
    _path: web::Path<String>,
    _stream: web::Payload,
    _data: web::Data<AppState>,
) -> impl Responder {
    // TODO: Implement WebSocket handler
    HttpResponse::Ok().json(json!({"status": "todo"}))
}
