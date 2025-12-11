use actix::{Actor, StreamHandler, Handler, Message as ActixMessage, Context, Addr, AsyncContext, ActorContext};
use actix_web_actors::ws::{self};
use serde::{Deserialize, Serialize};
use std::collections::HashMap;
use std::sync::Arc;
use tokio::sync::RwLock;
use uuid::Uuid;
use tracing::{info, warn, error};
use crate::domain::repositories::PartyRepository;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QuestionInfo {
    pub id: String,
    pub enunciado: String,
    pub opciones: Vec<OptionInfo>,
    pub explicacion: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OptionInfo {
    pub id: String,
    pub texto: String,
    pub es_correcta: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct QuestionContent {
    pub id: String,
    pub enunciado: String,
    pub opciones: Vec<OptionContent>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OptionContent {
    pub id: String,
    pub texto: String,
}

/// WebSocket message types
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(tag = "type", rename_all = "snake_case")]
pub enum WSMessage {
    // Client -> Server
    PlayerJoined { player_id: String, player_name: String },
    QuestionAnswered { player_id: String, question_id: String, answer: String, time_ms: u64 },
    PlayerReady { player_id: String },
    SuspiciousActivity { player_id: String, event_type: String, timestamp: i64 },
    StartGame { questions: Vec<QuestionInfo> },
    FinishGame,
    #[serde(rename = "request_ai_analysis")]
    RequestAIAnalysis,

    // Server -> Client
    GameStarted { questions: Vec<QuestionContent>, time_per_question: u32 },
    QuestionChanged { question_index: u32, question_id: String },
    GamePaused,
    GameResumed,
    GameFinished { results: Vec<PlayerResult> },
    PlayerListUpdate { players: Vec<PlayerInfo> },
    SuspiciousActivityNotification { player_id: String, event_type: String },
    #[serde(rename = "ai_analysis_result")]
    AIAnalysisResult { analysis: String },
    PlayerAnswered { player_id: String, question_id: String },

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

#[derive(Debug, Clone)]
pub struct AnswerRecord {
    pub question_id: String,
    pub answer: String,
    pub time_ms: u64,
    pub is_correct: bool,
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
                info!("Received message: {}", text);
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
                            WSMessage::StartGame { questions } => {
                                self.room.do_send(StartGameMessage {
                                    questions,
                                });
                            }
                            WSMessage::FinishGame => {
                                self.room.do_send(FinishGameMessage);
                            }
                            WSMessage::RequestAIAnalysis => {
                                if let Some(player_id) = self.player_id {
                                    self.room.do_send(RequestAIAnalysisMessage {
                                        player_id,
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
    pub players: HashMap<Uuid, String>,
    pub party_repo: Arc<dyn PartyRepository>,
    pub questions: Vec<QuestionInfo>,
    pub answers: HashMap<Uuid, Vec<AnswerRecord>>,
}

impl PartyRoom {
    pub fn new(party_code: String, party_repo: Arc<dyn PartyRepository>) -> Self {
        Self {
            party_code,
            connections: HashMap::new(),
            players: HashMap::new(),
            party_repo,
            questions: Vec::new(),
            answers: HashMap::new(),
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
pub struct StartGameMessage {
    pub questions: Vec<QuestionInfo>,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct RequestAIAnalysisMessage {
    pub player_id: Uuid,
}

#[derive(ActixMessage)]
#[rtype(result = "()")]
pub struct FinishGameMessage;

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
        self.players.insert(msg.player_id, msg.player_name.clone());

        // Broadcast player list update
        let players: Vec<PlayerInfo> = self.connections
            .keys()
            .map(|id| PlayerInfo {
                id: id.to_string(),
                name: self.players.get(id).cloned().unwrap_or_else(|| "Unknown".to_string()),
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
        self.players.remove(&msg.player_id);

        // Broadcast updated player list
        let players: Vec<PlayerInfo> = self.connections
            .keys()
            .map(|id| PlayerInfo {
                id: id.to_string(),
                name: self.players.get(id).cloned().unwrap_or_else(|| "Unknown".to_string()),
                is_ready: false,
                is_host: false,
            })
            .collect();

        self.broadcast(&WSMessage::PlayerListUpdate { players }, None);
    }
}

impl Handler<StartGameMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: StartGameMessage, _ctx: &mut Self::Context) {
        info!("Starting game for party {} with {} questions", self.party_code, msg.questions.len());

        self.questions = msg.questions.clone();
        
        let questions_content: Vec<QuestionContent> = self.questions.iter().map(|q| QuestionContent {
            id: q.id.clone(),
            enunciado: q.enunciado.clone(),
            opciones: q.opciones.iter().map(|o| OptionContent {
                id: o.id.clone(),
                texto: o.texto.clone(),
            }).collect(),
        }).collect();

        self.broadcast(&WSMessage::GameStarted { 
            questions: questions_content, 
            time_per_question: 60 // Default or from party config?
        }, None);
    }
}

impl Handler<AnswerSubmitted> for PartyRoom {
    type Result = ();

    fn handle(&mut self, msg: AnswerSubmitted, _ctx: &mut Self::Context) {
        info!(
            "Player {} answered question {} in party {}",
            msg.player_id, msg.question_id, self.party_code
        );

        // Find correct answer
        let is_correct = self.questions.iter()
            .find(|q| q.id == msg.question_id)
            .map(|q| {
                q.opciones.iter()
                    .find(|o| o.id == msg.answer)
                    .map(|o| o.es_correcta)
                    .unwrap_or(false)
            })
            .unwrap_or(false);

        let record = AnswerRecord {
            question_id: msg.question_id.clone(),
            answer: msg.answer,
            time_ms: msg.time_ms,
            is_correct,
        };

        self.answers.entry(msg.player_id)
            .or_insert_with(Vec::new)
            .push(record);

        // Notify everyone (or just host?) that player answered
        self.broadcast(&WSMessage::PlayerAnswered {
            player_id: msg.player_id.to_string(),
            question_id: msg.question_id,
        }, None);
    }
}

impl Handler<FinishGameMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, _msg: FinishGameMessage, _ctx: &mut Self::Context) {
        info!("Finishing game for party {}", self.party_code);

        let mut results = Vec::new();

        for (player_id, player_name) in &self.players {
            let player_answers = self.answers.get(player_id).cloned().unwrap_or_default();
            let total_questions = self.questions.len() as u32;
            let correct_answers = player_answers.iter().filter(|a| a.is_correct).count() as u32;
            let score = correct_answers * 100; // Simple scoring
            let total_time: u64 = player_answers.iter().map(|a| a.time_ms).sum();
            let average_time_ms = if !player_answers.is_empty() {
                total_time / player_answers.len() as u64
            } else {
                0
            };

            results.push(PlayerResult {
                player_id: player_id.to_string(),
                player_name: player_name.clone(),
                score,
                correct_answers,
                total_questions,
                average_time_ms,
            });
        }

        self.broadcast(&WSMessage::GameFinished { results }, None);
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

impl Handler<RequestAIAnalysisMessage> for PartyRoom {
    type Result = ();

    fn handle(&mut self, _msg: RequestAIAnalysisMessage, _ctx: &mut Self::Context) {
        info!("Generating AI analysis for party {}", self.party_code);

        // Mock AI Analysis for now
        let analysis = "Análisis de IA Generado:\n\n1. Rendimiento General: El grupo mostró un buen desempeño en álgebra básica.\n2. Áreas de Mejora: Se observaron dificultades en preguntas de geometría.\n3. Recomendación: Reforzar conceptos de cálculo de áreas y volúmenes.".to_string();

        self.broadcast(&WSMessage::AIAnalysisResult { analysis }, None);
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
