//! Hive Relay - WebSocket Signaling Server for P2P Connections
//!
//! This crate provides a lightweight signaling relay server that enables
//! WebRTC peer discovery and connection establishment without requiring
//! Supabase Realtime.
//!
//! # Architecture
//!
//! ```text
//! ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
//! │   Peer A    │────▶│ Hive Relay  │◀────│   Peer B    │
//! └─────────────┘     └─────────────┘     └─────────────┘
//!       │                    │                    │
//!       └───── WebRTC Offer ─┴── WebRTC Answer ───┘
//! ```

pub mod relay;
pub mod room;
pub mod protocol;

pub use relay::RelayServer;
pub use room::Room;
pub use protocol::{SignalMessage, SignalType};
