//! WebSocket relay server implementation
//!
//! Handles WebSocket connections and routes signaling messages between peers.

use std::net::SocketAddr;
use std::sync::Arc;

use axum::{
    extract::{
        ws::{Message, WebSocket, WebSocketUpgrade},
        State,
    },
    response::IntoResponse,
    routing::get,
    Json, Router,
};
use futures_util::{SinkExt, StreamExt};
use tokio::sync::mpsc;
use tower_http::cors::CorsLayer;
use tracing::{error, info, warn};
use uuid::Uuid;

use crate::protocol::{SignalMessage, SignalType};
use crate::room::{RoomManager, RoomStats};

/// Relay server configuration
#[derive(Clone)]
pub struct RelayConfig {
    pub host: String,
    pub port: u16,
}

impl Default for RelayConfig {
    fn default() -> Self {
        Self {
            host: "0.0.0.0".to_string(),
            port: 8765,
        }
    }
}

/// The main relay server
pub struct RelayServer {
    config: RelayConfig,
    room_manager: Arc<RoomManager>,
}

impl RelayServer {
    /// Create a new relay server
    pub fn new(config: RelayConfig) -> Self {
        Self {
            config,
            room_manager: Arc::new(RoomManager::new()),
        }
    }

    /// Run the server
    pub async fn run(&self) -> anyhow::Result<()> {
        let addr = format!("{}:{}", self.config.host, self.config.port);
        let listener = tokio::net::TcpListener::bind(&addr).await?;

        info!("🚀 Hive Relay starting on ws://{}", addr);

        let app = self.create_router();
        axum::serve(listener, app).await?;

        Ok(())
    }

    /// Create the Axum router
    fn create_router(&self) -> Router {
        let room_manager = Arc::clone(&self.room_manager);

        Router::new()
            .route("/ws", get(ws_handler))
            .route("/health", get(health_handler))
            .route("/stats", get(stats_handler))
            .layer(CorsLayer::permissive())
            .with_state(room_manager)
    }
}

/// WebSocket upgrade handler
async fn ws_handler(
    ws: WebSocketUpgrade,
    State(room_manager): State<Arc<RoomManager>>,
) -> impl IntoResponse {
    ws.on_upgrade(move |socket| handle_socket(socket, room_manager))
}

/// Handle a single WebSocket connection
async fn handle_socket(socket: WebSocket, room_manager: Arc<RoomManager>) {
    let peer_id = Uuid::new_v4().to_string();
    info!("🔌 New connection: {}", peer_id);

    let (mut ws_sender, mut ws_receiver) = socket.split();
    let (tx, mut rx) = mpsc::unbounded_channel::<SignalMessage>();

    // Track which room this peer is in
    let mut current_room: Option<String> = None;

    // Spawn task to send messages to WebSocket
    let send_task = tokio::spawn(async move {
        while let Some(msg) = rx.recv().await {
            let json = serde_json::to_string(&msg).unwrap_or_default();
            if ws_sender.send(Message::Text(json.into())).await.is_err() {
                break;
            }
        }
    });

    // Process incoming messages
    while let Some(Ok(msg)) = ws_receiver.next().await {
        if let Message::Text(text) = msg {
            match serde_json::from_str::<SignalMessage>(&text) {
                Ok(signal) => {
                    handle_signal(
                        &signal,
                        &peer_id,
                        &tx,
                        &room_manager,
                        &mut current_room,
                    ).await;
                }
                Err(e) => {
                    warn!("Invalid message from {}: {}", peer_id, e);
                    let _ = tx.send(SignalMessage::error("Invalid message format"));
                }
            }
        }
    }

    // Cleanup on disconnect
    info!("🔌 Connection closed: {}", peer_id);
    if let Some(room_code) = current_room {
        let room = room_manager.get_or_create_room(&room_code);
        room.remove_peer(&peer_id);
        room_manager.cleanup_room(&room_code);
    }

    send_task.abort();
}

/// Handle a signal message
async fn handle_signal(
    signal: &SignalMessage,
    peer_id: &str,
    tx: &mpsc::UnboundedSender<SignalMessage>,
    room_manager: &RoomManager,
    current_room: &mut Option<String>,
) {
    match signal.msg_type {
        SignalType::Join => {
            if let Some(room_code) = &signal.room {
                // Leave current room if any
                if let Some(old_room) = current_room.take() {
                    let room = room_manager.get_or_create_room(&old_room);
                    room.remove_peer(peer_id);
                    room_manager.cleanup_room(&old_room);
                }

                // Join new room
                let room = room_manager.get_or_create_room(room_code);
                room.add_peer(peer_id.to_string(), tx.clone());
                *current_room = Some(room_code.clone());
            } else {
                let _ = tx.send(SignalMessage::error("Room code required"));
            }
        }

        SignalType::Leave => {
            if let Some(room_code) = current_room.take() {
                let room = room_manager.get_or_create_room(&room_code);
                room.remove_peer(peer_id);
                room_manager.cleanup_room(&room_code);
            }
        }

        SignalType::Offer | SignalType::Answer | SignalType::Ice => {
            // Forward to target peer
            if let (Some(room_code), Some(target)) = (current_room.as_ref(), &signal.to) {
                let room = room_manager.get_or_create_room(room_code);

                // Add sender info to forwarded message
                let mut forward_msg = signal.clone();
                forward_msg.peer_id = Some(peer_id.to_string());

                if !room.send_to(target, &forward_msg) {
                    let _ = tx.send(SignalMessage::error("Target peer not found"));
                }
            } else {
                let _ = tx.send(SignalMessage::error("Not in a room or missing target"));
            }
        }

        _ => {
            warn!("Unhandled message type from {}: {:?}", peer_id, signal.msg_type);
        }
    }
}

/// Health check endpoint
async fn health_handler() -> impl IntoResponse {
    Json(serde_json::json!({
        "status": "healthy",
        "service": "hive-relay",
        "version": env!("CARGO_PKG_VERSION")
    }))
}

/// Stats endpoint
async fn stats_handler(State(room_manager): State<Arc<RoomManager>>) -> impl IntoResponse {
    Json(room_manager.stats())
}
