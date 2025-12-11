use actix_web::{web, HttpResponse, Responder, HttpRequest, Error};
use actix_web_actors::ws;
use serde_json::json;
use std::sync::Arc;

use crate::application::{
    CreatePartyRequest, CreatePartyResponse, CreatePartyUseCase,
    JoinPartyRequest, JoinPartyResponse, JoinPartyUseCase,
    PartyDetailsResponse,
};
use crate::domain::repositories::{PartyRepository, PlayerRepository};
use crate::infrastructure::database::{SqlitePartyRepository, SqlitePlayerRepository};
use crate::infrastructure::websocket::{PartyConnection, RoomManager};

pub struct AppState {
    pub party_repo: Arc<dyn PartyRepository>,
    pub player_repo: Arc<dyn PlayerRepository>,
    pub room_manager: Arc<RoomManager>,
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
    let use_case = CreatePartyUseCase::new(Arc::clone(&data.party_repo));

    match use_case
        .execute(
            req.name.clone(),
            req.host_name.clone(),
            req.max_players,
            req.time_per_question,
            req.total_questions,
            req.grade,
            req.subject.clone(),
        )
        .await
    {
        Ok(party) => {
            let response = CreatePartyResponse {
                id: party.id,
                code: party.code.clone(),
                message: format!("Party '{}' created successfully", party.name),
            };
            HttpResponse::Created().json(response)
        }
        Err(e) => {
            tracing::error!("Failed to create party: {}", e);
            HttpResponse::BadRequest().json(json!({
                "error": e.to_string()
            }))
        }
    }
}

async fn get_party(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> impl Responder {
    let code = path.into_inner();

    match data.party_repo.find_by_code(&code).await {
        Ok(Some(party)) => {
            match data.player_repo.count_by_party(&party.id).await {
                Ok(count) => {
                    let response = PartyDetailsResponse {
                        party,
                        player_count: count,
                    };
                    HttpResponse::Ok().json(response)
                }
                Err(e) => {
                    tracing::error!("Failed to count players: {}", e);
                    HttpResponse::InternalServerError().json(json!({
                        "error": "Failed to retrieve player count"
                    }))
                }
            }
        }
        Ok(None) => HttpResponse::NotFound().json(json!({
            "error": format!("Party not found with code: {}", code)
        })),
        Err(e) => {
            tracing::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(json!({
                "error": "Failed to retrieve party"
            }))
        }
    }
}

async fn join_party(
    path: web::Path<String>,
    req: web::Json<JoinPartyRequest>,
    data: web::Data<AppState>,
) -> impl Responder {
    let code = path.into_inner();

    let use_case = JoinPartyUseCase::new(
        Arc::clone(&data.party_repo),
        Arc::clone(&data.player_repo),
    );

    match use_case.execute(&code, req.player_name.clone()).await {
        Ok((party, player)) => {
            let response = JoinPartyResponse {
                player_id: player.id,
                party,
                message: format!("{} joined successfully", player.name),
            };
            HttpResponse::Ok().json(response)
        }
        Err(e) => {
            tracing::error!("Failed to join party: {}", e);
            HttpResponse::BadRequest().json(json!({
                "error": e.to_string()
            }))
        }
    }
}

async fn list_players(
    path: web::Path<String>,
    data: web::Data<AppState>,
) -> impl Responder {
    let code = path.into_inner();

    match data.party_repo.find_by_code(&code).await {
        Ok(Some(party)) => {
            match data.player_repo.find_by_party(&party.id).await {
                Ok(players) => HttpResponse::Ok().json(players),
                Err(e) => {
                    tracing::error!("Failed to list players: {}", e);
                    HttpResponse::InternalServerError().json(json!({
                        "error": "Failed to retrieve players"
                    }))
                }
            }
        }
        Ok(None) => HttpResponse::NotFound().json(json!({
            "error": format!("Party not found with code: {}", code)
        })),
        Err(e) => {
            tracing::error!("Database error: {}", e);
            HttpResponse::InternalServerError().json(json!({
                "error": "Failed to retrieve party"
            }))
        }
    }
}

async fn websocket_handler(
    req: HttpRequest,
    path: web::Path<String>,
    stream: web::Payload,
    data: web::Data<AppState>,
) -> Result<HttpResponse, Error> {
    let party_code = path.into_inner();
    
    // Get or create party room
    let room = data.room_manager
        .get_or_create_room(party_code.clone(), data.party_repo.clone())
        .await;
    
    // Create WebSocket connection actor
    let ws_actor = PartyConnection {
        party_code,
        player_id: None,
        room,
    };
    
    // Upgrade HTTP connection to WebSocket
    ws::start(ws_actor, &req, stream)
}
