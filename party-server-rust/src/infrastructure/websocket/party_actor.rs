use actix::{Actor, StreamHandler, Handler, Message as ActixMessage, Context, Addr, AsyncContext, ActorContext};
use actix_web_actors::ws::{self};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;
use tracing::{info, warn, error};
use crate::domain::repositories::PartyRepository;

/// WebSocket message types
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type")]
pub enum WSMessage {
    // Client -> Server
    PlayerJoined { player_id: String, player_name: String },
    QuestionAnswered { player_id: String, question_id: String, answer: String, time_ms: u64 },
    PlayerReady { player_id: String },
    SuspiciousActivity { player_id: String, event_type: String, timestamp: i64 },

    // Server -> Client
    GameStarted { question_ids: Vec<String>, time_per_question: u32 },
    QuestionChanged { question_index: u32, question_id: String },
    GamePaused,
    GameResumed,
    GameFinished { results: Vec<PlayerResult> },
    PlayerListUpdate { players: Vec<PlayerInfo> },
    SuspiciousActivityNotification { player_id: String, event_type: String },

    // Bidirectional
    Ping,
    Pong,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayerResult {
    pub player_id: String,
    pub player_name: String,
    pub score: u32,
    pub correct_answers: u32,
    pub total_questions: u32,
    pub average_time_ms: u64,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct PlayerInfo {
    pub id: String,
    pub name: String,
    pub is_ready: bool,
    pub is_host: bool,
}

/// WebSocket actor for a single player connection
pub struct PartyConnection {
    pub party_code: String,
    pub player_id: Option<Uuid>,
    pub room: Addr<PartyRoom>,
}

impl Actor for PartyConnection {
    type Context = ws::WebsocketContext<Self>;

    fn started(&mut self, ctx: &mut Self::Context) {
        info!("🔌 WebSocket connection opened for party {}", self.party_code);
        
        // Send welcome message
        ctx.text(serde_json::to_string(&WSMessage::Pong).unwrap());
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        info!("🔌 WebSocket connection closed for party {}", self.party_code);
        
        // Notify room about disconnection
        if let Some(player_id) = self.player_id {
            self.room.do_send(Disconnect { player_id });
        }
    }
}

/// Handle WebSocket messages from client
impl StreamHandler<Result<ws::Message, ws::ProtocolError>> for PartyConnection {
    fn handle(&mut self, msg: Result<ws::Message, ws::ProtocolError>, ctx: &mut Self::Context) {
        match msg {
            Ok(ws::Message::Text(text)) => {
                // Parse incoming message
                match serde_json::from_str::<WSMessage>(&text) {
                    Ok(ws_msg) => {
                        match ws_msg {
                            WSMessage::Ping => {
                                ctx.text(serde_json::to_string(&WSMessage::Pong).unwrap());
                            }
                            WSMessage::PlayerJoined { player_id, player_name } => {
                                if let Ok(uuid) = Uuid::parse_str(&player_id) {
                                    self.player_id = Some(uuid);
                                    self.room.do_send(PlayerJoinedMessage {
                                        player_id: uuid,
                                        player_name,
                                        addr: ctx.address(),
                                    });
                                }
                            }
                            WSMessage::QuestionAnswered { player_id, question_id, answer, time_ms } => {
                                if let Ok(uuid) = Uuid::parse_str(&player_id) {
                                    self.room.do_send(AnswerSubmitted {
                                        player_id: uuid,
                                        question_id,
                                        answer,
                                        time_ms,
                                    });
                                }
                            }
                            WSMessage::PlayerReady { player_id } => {
                                if let Ok(uuid) = Uuid::parse_str(&player_id) {
                                    self.room.do_send(PlayerReadyMessage {
                                        player_id: uuid,
                                    });
                                }
                            }
                            WSMessage::SuspiciousActivity { player_id, event_type, timestamp } => {
                                if let Ok(uuid) = Uuid::parse_str(&player_id) {
                                    self.room.do_send(SuspiciousActivityMessage {
                                        player_id: uuid,
                                        event_type,
                                        timestamp,
                                    });
                                }
                            }
                            _ => {
                                warn!("Unexpected client message: {:?}", ws_msg);
                            }
                        }
                    }
                    Err(e) => {
                        error!("Failed to parse WebSocket message: {}", e);
                    }
                }
            }
            Ok(ws::Message::Binary(bin)) => {
                warn!("Received binary data, not supported: {} bytes", bin.len());
            }
            Ok(ws::Message::Ping(msg)) => {
                ctx.pong(&msg);
            }
            Ok(ws::Message::Pong(_)) => {}
            Ok(ws::Message::Close(reason)) => {
                info!("Client closed connection: {:?}", reason);
                ctx.stop();
            }
            Ok(ws::Message::Continuation(_)) => {
                warn!("Continuation frames not supported");
                ctx.stop();
            }
            Ok(ws::Message::Nop) => {}
            Err(e) => {
                error!("WebSocket protocol error: {}", e);
                ctx.stop();
            }
        }
    }
}

/// Party room actor - manages all connections for a party
pub struct PartyRoom {
    pub party_code: String,
    pub connections: HashMap<Uuid, Addr<PartyConnection>>,
    pub party_repo: Arc<dyn PartyRepository>,
}

impl PartyRoom {
    pub fn new(party_code: String, party_repo: Arc<dyn PartyRepository>) -> Self {
        Self {
            party_code,
            connections: HashMap::new(),
            party_repo,
        }
    }

    /// Broadcast message to all connections except sender
    fn broadcast(&self, msg: &WSMessage, except: Option<Uuid>) {
        let json = serde_json::to_string(msg).unwrap();
        for (id, addr) in &self.connections {
            if except.map_or(true, |exc| exc != *id) {
                addr.do_send(SendMessage(json.clone()));
            }
        }
    }

    /// Send message to specific player
    fn send_to(&self, player_id: Uuid, msg: &WSMessage) {
        if let Some(addr) = self.connections.get(&player_id) {
            let json = serde_json::to_string(msg).unwrap();
            addr.do_send(SendMessage(json));
        }
    }
}

impl Actor for PartyRoom {
    type Context = Context<Self>;

    fn started(&mut self, _ctx: &mut Self::Context) {
        info!("🎮 Party room created: {}", self.party_code);
    }

    fn stopped(&mut self, _ctx: &mut Self::Context) {
        info!("🎮 Party room closed: {}", self.party_code);
    }
}

// ===== Message Definitions =====

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct PlayerJoinedMessage {
    pub player_id: Uuid,
    pub player_name: String,
    pub addr: Addr<PartyConnection>,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct Disconnect {
    pub player_id: Uuid,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct AnswerSubmitted {
    pub player_id: Uuid,
    pub question_id: String,
    pub answer: String,
    pub time_ms: u64,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct PlayerReadyMessage {
    pub player_id: Uuid,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct SuspiciousActivityMessage {
    pub player_id: Uuid,
    pub event_type: String,
    pub timestamp: i64,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct SendMessage(pub String);

// ===== Message Handlers =====

impl Handler<PlayerJoinedMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: PlayerJoinedMessage, _ctx: &mut Self::Context) {
        info!("Player {} joined party {}", msg.player_name, self.party_code);
        
        // Add connection to room
        self.connections.insert(msg.player_id, msg.addr);

        // Broadcast player list update
        let players: Vec<PlayerInfo> = self.connections
            .keys()
            .map(|id| PlayerInfo {
                id: id.to_string(),
                name: msg.player_name.clone(), // TODO: Get from DB
                is_ready: false,
                is_host: false,
            })
            .collect();

        self.broadcast(&WSMessage::PlayerListUpdate { players }, None);
    }
}

impl Handler<Disconnect> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: Disconnect, _ctx: &mut Self::Context) {
        info!("Player {} disconnected from party {}", msg.player_id, self.party_code);
        
        // Remove connection
        self.connections.remove(&msg.player_id);

        // Broadcast updated player list
        let players: Vec<PlayerInfo> = self.connections
            .keys()
            .map(|id| PlayerInfo {
                id: id.to_string(),
                name: "Player".to_string(), // TODO: Get from DB
                is_ready: false,
                is_host: false,
            })
            .collect();

        self.broadcast(&WSMessage::PlayerListUpdate { players }, None);
    }
}

impl Handler<AnswerSubmitted> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: AnswerSubmitted, _ctx: &mut Self::Context) {
        info!(
            "Player {} answered question {} in party {}",
            msg.player_id, msg.question_id, self.party_code
        );
        
        // TODO: Save answer to database
        // TODO: Calculate score
        // TODO: Broadcast progress to host
    }
}

impl Handler<PlayerReadyMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: PlayerReadyMessage, _ctx: &mut Self::Context) {
        info!("Player {} is ready in party {}", msg.player_id, self.party_code);
        
        // TODO: Check if all players are ready
        // TODO: If yes, broadcast GameStarted
    }
}

impl Handler<SuspiciousActivityMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: SuspiciousActivityMessage, _ctx: &mut Self::Context) {
        warn!(
            "⚠️ Suspicious activity detected: Player {} - {} in party {}",
            msg.player_id, msg.event_type, self.party_code
        );
        
        // Notify host about suspicious activity
        self.broadcast(
            &WSMessage::SuspiciousActivityNotification {
                player_id: msg.player_id.to_string(),
                event_type: msg.event_type,
            },
            Some(msg.player_id), // Don't send to the suspicious player
        );
    }
}

impl Handler<SendMessage> for PartyConnection {
    type Result = ();

    fn handle(&mut self, msg: SendMessage, ctx: &mut Self::Context) {
        ctx.text(msg.0);
    }
}

// ===== Room Manager =====

/// Global room manager - keeps track of all active party rooms
pub struct RoomManager {
    rooms: Arc<RwLock<HashMap<String, Addr<PartyRoom>>>>,
}

impl RoomManager {
    pub fn new() -> Self {
        Self {
            rooms: Arc::new(RwLock::new(HashMap::new())),
        }
    }

    /// Get or create a party room
    pub async fn get_or_create_room(
        &self,
        party_code: String,
        party_repo: Arc<dyn PartyRepository>,
    ) -> Addr<PartyRoom> {
        let mut rooms = self.rooms.write().await;
        
        if let Some(room) = rooms.get(&party_code) {
            room.clone()
        } else {
            let room = PartyRoom::new(party_code.clone(), party_repo).start();
            rooms.insert(party_code, room.clone());
            room
        }
    }

    /// Remove a party room when it's empty
    pub async fn remove_room(&self, party_code: &str) {
        let mut rooms = self.rooms.write().await;
        rooms.remove(party_code);
    }
}
