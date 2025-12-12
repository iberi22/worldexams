use tracing_subscriber;
use party_server::{run, ServerConfig, config};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // Load .env file
    dotenv::dotenv().ok();

    // Initialize logging
    tracing_subscriber::fmt()
        .with_target(false)
        .compact()
        .init();

    tracing::info!("🚀 Party Server CLI starting...");

    // Load configuration (override database URL for development)
    let mut settings = config::Settings::new().expect("Failed to load configuration");

    // For local development/binary usage, we might want to override the DB path
    // to be absolute or relative to the executable, similar to the original main.rs
    settings.database.url = "sqlite://E:\\scripts-python\\worldexams\\party-server-rust\\data\\parties.db".to_string();

    tracing::info!(
        "📡 Server will run on {}:{}",
        settings.server.host,
        settings.server.port
    );

    let config = ServerConfig {
        database_url: settings.database.url,
        host: settings.server.host,
        port: settings.server.port,
    };

    run(config).await
}

