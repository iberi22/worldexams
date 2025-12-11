use actix_web::{web, App, HttpServer, middleware};
use tracing_subscriber;

mod domain;
mod infrastructure;
mod application;
mod config;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load .env file
    dotenv::dotenv().ok();
    
    // Initialize logging
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    tracing::info!("🚀 Party Server starting...");

    // Load configuration (override database URL for development)
    let mut settings = config::Settings::new().expect("Failed to load configuration");
    settings.database.url = "sqlite://E:\\scripts-python\\worldexams\\party-server-rust\\data\\parties.db".to_string();
    
    tracing::info!(
        "📡 Server will run on {}:{}",
        settings.server.host,
        settings.server.port
    );
    
    tracing::info!("📊 Database URL: {}", settings.database.url);

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
