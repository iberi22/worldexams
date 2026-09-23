/**
 * Edge-Mesh server entry point.
 *
 * Boots a MalocaKernel node, connects to local Xavier, registers an agent
 * profile via AgentProfileAdapter, starts PeerJS transport on port 9000,
 * and exposes a lightweight HTTP health endpoint on port 9001.
 *
 * Usage:
 *   NODE_ENV=production node dist/server.js
 *   # or via systemd user service: edge-mesh.service
 */
import { createServer } from "node:http";
import { MalocaKernel } from "./maloca/kernel.js";
import { AgentProfileAdapter } from "./adapters/maloca-xavier/agent-profile.js";
import { XavierStore } from "./node-memory/xavier-store.js";
// ─── Configuration (env-overridable) ────────────────────────────────────────
const NODO_ID = (process.env.EDGE_MESH_NODE_ID ?? "edge-node-1");
const XAVIER_URL = process.env.XAVIER_URL ?? "http://127.0.0.1:8006";
const XAVIER_TOKEN = process.env.XAVIER_TOKEN ?? undefined;
const PEER_PORT = Number(process.env.EDGE_MESH_PEER_PORT ?? 9000);
const HEALTH_PORT = Number(process.env.EDGE_MESH_HEALTH_PORT ?? 9001);
const AGENT_NAME = process.env.EDGE_MESH_AGENT_NAME ?? "edge-mesh-node";
const AGENT_CAPABILITIES = (process.env.EDGE_MESH_CAPABILITIES ?? "mesh-sync,xavier-bridge").split(",");
// ─── Boot ───────────────────────────────────────────────────────────────────
async function main() {
    console.log(`[edge-mesh] Starting node ${NODO_ID}`);
    console.log(`[edge-mesh] Xavier URL: ${XAVIER_URL}`);
    console.log(`[edge-mesh] PeerJS port: ${PEER_PORT}`);
    // 1. Instantiate MalocaKernel (no peerId = skip PeerJS transport, Node.js compatible)
    const kernel = new MalocaKernel({
        nodoId: NODO_ID,
        logLevel: "info",
        storageBackend: "mem",
    });
    // 2. Start the kernel (restores snapshots, starts presence, attaches transport)
    await kernel.iniciar();
    console.log("[edge-mesh] MalocaKernel started");
    // 3. Connect to local Xavier via XavierStore
    const xavierStore = new XavierStore({
        appId: "edge-mesh",
        instanceId: NODO_ID,
        xavierUrl: XAVIER_URL,
        xavierToken: XAVIER_TOKEN,
    });
    // Fire-and-forget readiness probe to Xavier
    const xavierReady = await xavierStore
        .loadRecords("health", "", 1)
        .then(() => true)
        .catch(() => false);
    if (xavierReady) {
        console.log("[edge-mesh] Xavier connection verified");
    }
    else {
        console.warn("[edge-mesh] Xavier unreachable — will retry on demand");
    }
    // 4. Register agent profile via AgentProfileAdapter
    const agentProfile = new AgentProfileAdapter(kernel);
    await agentProfile.registerAgent({
        id: NODO_ID,
        nombre: AGENT_NAME,
        capacidades: AGENT_CAPABILITIES,
        metadatos: {
            version: "1.0.0",
            xavierUrl: XAVIER_URL,
            startedAt: Date.now(),
        },
    });
    console.log("[edge-mesh] Agent profile registered");
    // 5. Health endpoint on port 9001
    const healthServer = createServer((req, res) => {
        if (req.method === "GET" && req.url === "/health") {
            const status = kernel.getNetworkStatus();
            const body = JSON.stringify({
                status: "ok",
                node: status.nodoId,
                peers: status.peers.length,
                profiles: status.perfilesRegistrados,
                xavier: xavierReady ? "connected" : "unreachable",
                uptime: process.uptime(),
            });
            res.writeHead(200, {
                "Content-Type": "application/json",
                "Cache-Control": "no-cache",
            });
            res.end(body);
            return;
        }
        if (req.method === "GET" && req.url === "/health/live") {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end("ok");
            return;
        }
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    });
    healthServer.listen(HEALTH_PORT, "127.0.0.1", () => {
        console.log(`[edge-mesh] Health endpoint listening on http://127.0.0.1:${HEALTH_PORT}/health`);
    });
    // ─── Graceful shutdown ──────────────────────────────────────────────────
    const shutdown = async (signal) => {
        console.log(`\n[edge-mesh] Received ${signal}, shutting down…`);
        healthServer.close();
        await kernel.detener();
        process.exit(0);
    };
    process.on("SIGINT", () => void shutdown("SIGINT"));
    process.on("SIGTERM", () => void shutdown("SIGTERM"));
    console.log("[edge-mesh] Ready ✓");
}
main().catch((err) => {
    console.error("[edge-mesh] Fatal startup error:", err);
    process.exit(1);
});
//# sourceMappingURL=server.js.map