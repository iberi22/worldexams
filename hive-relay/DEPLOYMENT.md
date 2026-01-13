# Hive Relay Deployment Guide

This guide explains how to deploy the hive-relay signaling server for production use.

## Deployment Options

### 1. Fly.io (Recommended)

Fly.io offers low-latency edge deployment ideal for WebSocket signaling.

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Create app
fly auth login
fly launch --name worldexams-relay

# Deploy
fly deploy
```

**fly.toml:**
```toml
app = "worldexams-relay"
primary_region = "mia"

[build]
  dockerfile = "Dockerfile"

[env]
  RELAY_HOST = "0.0.0.0"
  RELAY_PORT = "8080"
  RUST_LOG = "info"

[[services]]
  internal_port = 8080
  protocol = "tcp"

  [[services.ports]]
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [services.concurrency]
    hard_limit = 10000
    soft_limit = 5000
```

---

### 2. Railway

One-click deployment from GitHub repository.

1. Connect repo to Railway
2. Add environment variables:
   - `RELAY_PORT=8080`
   - `RUST_LOG=info`
3. Deploy

---

### 3. Docker (Self-Hosted)

**Build:**
```bash
docker build -t hive-relay .
```

**Run:**
```bash
docker run -d \
  -p 8765:8765 \
  -e RELAY_PORT=8765 \
  -e RUST_LOG=info \
  --name hive-relay \
  hive-relay
```

**Docker Compose:**
```yaml
version: '3.8'
services:
  hive-relay:
    build: ./hive-relay
    ports:
      - "8765:8765"
    environment:
      - RELAY_PORT=8765
      - RUST_LOG=info
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8765/health"]
      interval: 30s
      timeout: 10s
      retries: 3
```

---

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `RELAY_HOST` | `0.0.0.0` | Listen address |
| `RELAY_PORT` | `8765` | WebSocket port |
| `RUST_LOG` | `info` | Log level (`debug`, `info`, `warn`, `error`) |

---

## Scaling Considerations

### Horizontal Scaling

For multiple instances, use Redis pub/sub for cross-instance messaging:

```
[Client A] → [Relay 1] ←→ [Redis] ←→ [Relay 2] ← [Client B]
```

> **Note:** Current implementation is single-instance. Redis pub/sub would be a future enhancement.

### Resource Requirements

| Metric | Recommendation |
|--------|----------------|
| Memory | 128MB - 512MB |
| CPU | 0.25 - 1 vCPU |
| Connections | 5000 per instance |
| Bandwidth | ~1KB per signaling exchange |

---

## Health Monitoring

### Endpoints

- `GET /health` - Returns service health status
- `GET /stats` - Returns room and peer counts

### Prometheus Metrics (Future)

Planned metrics:
- `hive_relay_rooms_total`
- `hive_relay_peers_connected`
- `hive_relay_messages_relayed_total`

---

## SSL/TLS Configuration

### With Reverse Proxy (nginx)

```nginx
server {
    listen 443 ssl;
    server_name relay.worldexams.org;

    ssl_certificate /etc/letsencrypt/live/relay.worldexams.org/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/relay.worldexams.org/privkey.pem;

    location /ws {
        proxy_pass http://127.0.0.1:8765;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_read_timeout 86400;
    }

    location / {
        proxy_pass http://127.0.0.1:8765;
    }
}
```

---

## Integration with Frontend

Update `p2p-service.ts` to use hive-relay as fallback:

```typescript
const HIVE_RELAY_URL = 'wss://relay.worldexams.org/ws';

// Try Supabase first, fallback to hive-relay
async function connectToSignaling(partyCode: string) {
  try {
    await connectViaSupabase(partyCode);
  } catch (error) {
    console.log('Supabase failed, trying hive-relay...');
    await connectViaHiveRelay(partyCode);
  }
}
```

---

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Connection refused | Check firewall, ensure port is exposed |
| WebSocket upgrade failed | Verify proxy supports WebSocket |
| High latency | Deploy closer to users, check network |
| Memory leak | Update to latest version, increase limits |

### Logs

```bash
# Docker logs
docker logs -f hive-relay

# Fly.io logs
fly logs --app worldexams-relay
```
