use actix_web::{web, App, HttpServer, middleware};
use actix_cors::Cors;
use std::net::TcpListener;

pub mod domain;
pub mod infrastructure;
pub mod application;
pub mod config;

pub struct ServerConfig {
    pub database_url: String,
    pub host: String,
    pub port: u16,
}

pub async fn run(config: ServerConfig) -> std::io::Result<()> {
    tracing::info!("🚀 Party Server starting...");
    tracing::info!("📊 Database URL: {}", config.database_url);

    // Initialize database
    let db_pool = infrastructure::database::init_pool(&config.database_url)
        .await
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;

    tracing::info!("✅ Database initialized");

    // Run migrations
    // Note: In a library context, we might want to make migrations optional or embedded
    // For now we assume the migrations folder exists relative to the binary execution
    sqlx::migrate!("./migrations")
        .run(&db_pool)
        .await
        .map_err(|e| std::io::Error::new(std::io::ErrorKind::Other, e.to_string()))?;

    tracing::info!("✅ Migrations complete");

    // Create repositories
    let party_repo = infrastructure::database::SqlitePartyRepository::new(db_pool.clone());
    let player_repo = infrastructure::database::SqlitePlayerRepository::new(db_pool.clone());

    // Create room manager for WebSocket
    let room_manager = infrastructure::websocket::RoomManager::new();

    // Create app state
    let app_state = web::Data::new(infrastructure::http::routes::AppState {
        party_repo,
        player_repo,
        room_manager,
    });

    tracing::info!("✅ Application state initialized");

    // Create HTTP server
    let server_addr = format!("{}:{}", config.host, config.port);

    tracing::info!("🎮 Party Server ready at http://{}", server_addr);
    
    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header()
            .max_age(3600);

        App::new()
            .app_data(app_state.clone())
            .wrap(cors)
            .wrap(middleware::Logger::default())
            .wrap(middleware::Compress::default())
            .configure(infrastructure::http::routes::configure)
    })
    .bind(&server_addr)?
    .run()
    .await
}
