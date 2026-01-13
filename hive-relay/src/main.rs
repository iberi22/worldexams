//! Hive Relay Server - Entry Point
//!
//! WebSocket signaling relay for P2P connections.

use hive_relay::{RelayServer, relay::RelayConfig};
use tracing_subscriber::{layer::SubscriberExt, util::SubscriberInitExt};

#[tokio::main]
async fn main() -> anyhow::Result<()> {
    // Load environment variables
    dotenvy::dotenv().ok();

    // Initialize logging
    tracing_subscriber::registry()
        .with(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "info,hive_relay=debug".into()),
        )
        .with(tracing_subscriber::fmt::layer())
        .init();

    // Load configuration from environment
    let config = RelayConfig {
        host: std::env::var("RELAY_HOST").unwrap_or_else(|_| "0.0.0.0".to_string()),
        port: std::env::var("RELAY_PORT")
            .ok()
            .and_then(|p| p.parse().ok())
            .unwrap_or(8765),
    };

    tracing::info!(
        "🐝 Hive Relay v{} starting...",
        env!("CARGO_PKG_VERSION")
    );

    // Run server
    let server = RelayServer::new(config);
    server.run().await
}
