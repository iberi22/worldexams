use actix_web::{web, App, HttpServer, middleware};
use tracing_subscriber;
use std::sync::Arc;

mod domain;
mod infrastructure;
mod application;
mod config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Initialize logging
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    tracing::info!("🚀 Party Server starting...");

    // Load configuration
    let settings = config::Settings::new().expect("Failed to load configuration");
    
    tracing::info!(
        "📡 Server will run on {}:{}",
        settings.server.host,
        settings.server.port
    );

    // Initialize database
    let db_pool = infrastructure::database::init_pool(&settings.database.url)
        .await
        .expect("Failed to initialize database");

    tracing::info!("✅ Database initialized");

    // Run migrations
    sqlx::migrate!("./migrations")
        .run(&db_pool)
        .await
        .expect("Failed to run migrations");

    tracing::info!("✅ Migrations complete");

    // Create repositories
    let party_repo = Arc::new(infrastructure::database::SqlitePartyRepository::new(db_pool.clone())) 
        as Arc<dyn domain::repositories::PartyRepository>;
    let player_repo = Arc::new(infrastructure::database::SqlitePlayerRepository::new(db_pool.clone()))
        as Arc<dyn domain::repositories::PlayerRepository>;

    // Create room manager for WebSocket
    let room_manager = Arc::new(infrastructure::websocket::RoomManager::new());

    // Create app state
    let app_state = web::Data::new(infrastructure::http::routes::AppState {
        party_repo,
        player_repo,
        room_manager,
    });

    tracing::info!("✅ Application state initialized");

    // Create HTTP server
    let server_addr = format!("{}:{}", settings.server.host, settings.server.port);
    
    tracing::info!("🎮 Party Server ready at http://{}", server_addr);
    tracing::info!("📖 API Documentation:");
    tracing::info!("   GET  /health");
    tracing::info!("   POST /api/parties");
    tracing::info!("   GET  /api/parties/:code");
    tracing::info!("   POST /api/parties/:code/join");
    tracing::info!("   GET  /api/parties/:code/players");
    tracing::info!("   WS   /ws/:party_code");
    
    HttpServer::new(move || {
        App::new()
            .app_data(app_state.clone())
            .wrap(middleware::Logger::default())
            .wrap(middleware::Compress::default())
            .configure(infrastructure::http::routes::configure)
    })
    .bind(&server_addr)?
    .run()
    .await
}
