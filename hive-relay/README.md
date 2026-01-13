# Hive Relay

WebSocket signaling relay server for P2P connections in World Exams platform.

## Purpose

Provides an alternative signaling mechanism to Supabase Realtime for WebRTC peer discovery.

## Features

- **Room-based signaling**: Peers join rooms by party code
- **WebRTC offer/answer relay**: Forward SDP messages between peers
- **ICE candidate exchange**: Relay ICE candidates for NAT traversal
- **Health monitoring**: `/health` endpoint for load balancers
- **Metrics**: Connection counts, room stats

## Quick Start

```bash
cargo run
```

Server starts on `ws://0.0.0.0:8765`

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `RELAY_HOST` | `0.0.0.0` | Listen address |
| `RELAY_PORT` | `8765` | WebSocket port |
| `RUST_LOG` | `info` | Log level |

## WebSocket Protocol

```json
// Join room
{"type": "join", "room": "ABC123", "peer_id": "uuid"}

// Offer/Answer
{"type": "offer", "to": "peer-uuid", "sdp": "..."}
{"type": "answer", "to": "peer-uuid", "sdp": "..."}

// ICE Candidate
{"type": "ice", "to": "peer-uuid", "candidate": "..."}

// Peer events (server -> client)
{"type": "peer_joined", "peer_id": "uuid"}
{"type": "peer_left", "peer_id": "uuid"}
```

## Deployment

Designed for Fly.io, Railway, or any container platform.

```dockerfile
FROM rust:1.75-slim AS builder
WORKDIR /app
COPY . .
RUN cargo build --release

FROM debian:bookworm-slim
COPY --from=builder /app/target/release/hive-relay /usr/local/bin/
CMD ["hive-relay"]
```
