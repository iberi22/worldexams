//! WebSocket signaling protocol definitions
//!
//! Defines the message types exchanged between clients and the relay server
//! for WebRTC signaling.

use serde::{Deserialize, Serialize};

/// Type of signal message
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum SignalType {
    // Client -> Server
    Join,
    Leave,
    Offer,
    Answer,
    Ice,

    // Server -> Client
    PeerJoined,
    PeerLeft,
    RoomInfo,
    Error,
}

/// Main signaling message structure
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct SignalMessage {
    #[serde(rename = "type")]
    pub msg_type: SignalType,

    /// Room/party code
    #[serde(skip_serializing_if = "Option::is_none")]
    pub room: Option<String>,

    /// Sender's peer ID
    #[serde(skip_serializing_if = "Option::is_none")]
    pub peer_id: Option<String>,

    /// Target peer ID (for offers, answers, ICE)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to: Option<String>,

    /// SDP offer/answer
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sdp: Option<String>,

    /// ICE candidate
    #[serde(skip_serializing_if = "Option::is_none")]
    pub candidate: Option<String>,

    /// Error message
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<String>,

    /// List of peers in room (for RoomInfo)
    #[serde(skip_serializing_if = "Option::is_none")]
    pub peers: Option<Vec<String>>,
}

impl SignalMessage {
    /// Create a join message
    pub fn join(room: &str, peer_id: &str) -> Self {
        Self {
            msg_type: SignalType::Join,
            room: Some(room.to_string()),
            peer_id: Some(peer_id.to_string()),
            to: None,
            sdp: None,
            candidate: None,
            error: None,
            peers: None,
        }
    }

    /// Create a peer_joined notification
    pub fn peer_joined(peer_id: &str) -> Self {
        Self {
            msg_type: SignalType::PeerJoined,
            room: None,
            peer_id: Some(peer_id.to_string()),
            to: None,
            sdp: None,
            candidate: None,
            error: None,
            peers: None,
        }
    }

    /// Create a peer_left notification
    pub fn peer_left(peer_id: &str) -> Self {
        Self {
            msg_type: SignalType::PeerLeft,
            room: None,
            peer_id: Some(peer_id.to_string()),
            to: None,
            sdp: None,
            candidate: None,
            error: None,
            peers: None,
        }
    }

    /// Create a room_info message
    pub fn room_info(peers: Vec<String>) -> Self {
        Self {
            msg_type: SignalType::RoomInfo,
            room: None,
            peer_id: None,
            to: None,
            sdp: None,
            candidate: None,
            error: None,
            peers: Some(peers),
        }
    }

    /// Create an error message
    pub fn error(msg: &str) -> Self {
        Self {
            msg_type: SignalType::Error,
            room: None,
            peer_id: None,
            to: None,
            sdp: None,
            candidate: None,
            error: Some(msg.to_string()),
            peers: None,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_serialize_join() {
        let msg = SignalMessage::join("ABC123", "peer-1");
        let json = serde_json::to_string(&msg).unwrap();
        assert!(json.contains("join"));
        assert!(json.contains("ABC123"));
    }

    #[test]
    fn test_deserialize_offer() {
        let json = r#"{"type":"offer","to":"peer-2","sdp":"v=0..."}"#;
        let msg: SignalMessage = serde_json::from_str(json).unwrap();
        assert_eq!(msg.msg_type, SignalType::Offer);
        assert_eq!(msg.to.unwrap(), "peer-2");
    }
}
