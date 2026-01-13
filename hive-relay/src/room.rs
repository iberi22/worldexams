//! Room management for signaling relay
//!
//! Handles peer membership and message routing within a room.

use dashmap::DashMap;
use std::sync::Arc;
use tokio::sync::mpsc;
use tracing::{info, warn};

use crate::protocol::SignalMessage;

/// Sender for outgoing WebSocket messages
pub type PeerSender = mpsc::UnboundedSender<SignalMessage>;

/// A peer connection in a room
#[derive(Debug, Clone)]
pub struct Peer {
    pub id: String,
    pub sender: PeerSender,
}

/// A signaling room containing multiple peers
pub struct Room {
    pub code: String,
    peers: DashMap<String, Peer>,
}

impl Room {
    /// Create a new room
    pub fn new(code: String) -> Self {
        info!("🏠 Room created: {}", code);
        Self {
            code,
            peers: DashMap::new(),
        }
    }

    /// Add a peer to the room
    pub fn add_peer(&self, peer_id: String, sender: PeerSender) {
        info!("👤 Peer {} joining room {}", peer_id, self.code);

        // Notify existing peers about new peer
        let join_msg = SignalMessage::peer_joined(&peer_id);
        self.broadcast_except(&peer_id, &join_msg);

        // Send room info to new peer
        let peer_ids: Vec<String> = self.peers.iter().map(|p| p.key().clone()).collect();
        let room_info = SignalMessage::room_info(peer_ids);
        let _ = sender.send(room_info);

        // Add peer
        self.peers.insert(peer_id.clone(), Peer { id: peer_id, sender });
    }

    /// Remove a peer from the room
    pub fn remove_peer(&self, peer_id: &str) -> bool {
        if self.peers.remove(peer_id).is_some() {
            info!("👋 Peer {} left room {}", peer_id, self.code);

            // Notify remaining peers
            let leave_msg = SignalMessage::peer_left(peer_id);
            self.broadcast_except(peer_id, &leave_msg);
            true
        } else {
            false
        }
    }

    /// Send a message to a specific peer
    pub fn send_to(&self, peer_id: &str, msg: &SignalMessage) -> bool {
        if let Some(peer) = self.peers.get(peer_id) {
            if peer.sender.send(msg.clone()).is_err() {
                warn!("Failed to send to peer {}", peer_id);
                false
            } else {
                true
            }
        } else {
            warn!("Peer {} not found in room {}", peer_id, self.code);
            false
        }
    }

    /// Broadcast message to all peers except sender
    pub fn broadcast_except(&self, except_peer: &str, msg: &SignalMessage) {
        for peer in self.peers.iter() {
            if peer.key() != except_peer {
                let _ = peer.sender.send(msg.clone());
            }
        }
    }

    /// Get number of peers in room
    pub fn peer_count(&self) -> usize {
        self.peers.len()
    }

    /// Check if room is empty
    pub fn is_empty(&self) -> bool {
        self.peers.is_empty()
    }

    /// Get list of peer IDs
    pub fn peer_ids(&self) -> Vec<String> {
        self.peers.iter().map(|p| p.key().clone()).collect()
    }
}

/// Room manager - handles all active rooms
pub struct RoomManager {
    rooms: DashMap<String, Arc<Room>>,
}

impl RoomManager {
    /// Create new room manager
    pub fn new() -> Self {
        Self {
            rooms: DashMap::new(),
        }
    }

    /// Get or create a room
    pub fn get_or_create_room(&self, code: &str) -> Arc<Room> {
        self.rooms
            .entry(code.to_string())
            .or_insert_with(|| Arc::new(Room::new(code.to_string())))
            .clone()
    }

    /// Remove a room if empty
    pub fn cleanup_room(&self, code: &str) {
        if let Some(room) = self.rooms.get(code) {
            if room.is_empty() {
                info!("🗑️ Removing empty room: {}", code);
                self.rooms.remove(code);
            }
        }
    }

    /// Get room statistics
    pub fn stats(&self) -> RoomStats {
        let room_count = self.rooms.len();
        let peer_count: usize = self.rooms.iter().map(|r| r.peer_count()).sum();
        RoomStats { room_count, peer_count }
    }
}

impl Default for RoomManager {
    fn default() -> Self {
        Self::new()
    }
}

/// Statistics about active rooms
#[derive(Debug, Clone, serde::Serialize)]
pub struct RoomStats {
    pub room_count: usize,
    pub peer_count: usize,
}
