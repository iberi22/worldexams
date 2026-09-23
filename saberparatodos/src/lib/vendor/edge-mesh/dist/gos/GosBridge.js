export class GosBridge {
    nodeId;
    mesh;
    presence;
    config;
    eventTarget;
    startTime;
    bytesSent = 0;
    bytesReceived = 0;
    lastBytesSent = 0;
    lastBytesReceived = 0;
    lastSampleTime;
    txRate = 0;
    rxRate = 0;
    intervalTimer = null;
    running = false;
    constructor(meshOrNodeId, config = {}) {
        this.eventTarget = new EventTarget();
        this.config = config;
        this.startTime = Date.now();
        this.lastSampleTime = this.startTime;
        if (typeof meshOrNodeId === "string") {
            this.nodeId = meshOrNodeId;
            this.presence = config.presence;
        }
        else {
            this.mesh = meshOrNodeId;
            this.nodeId = meshOrNodeId.config.nodoId;
            this.presence = config.presence ?? meshOrNodeId.presence;
        }
    }
    recordBytesSent(bytes) {
        if (bytes > 0) {
            this.bytesSent += bytes;
        }
    }
    recordBytesReceived(bytes) {
        if (bytes > 0) {
            this.bytesReceived += bytes;
        }
    }
    start() {
        if (this.running)
            return;
        this.running = true;
        this.lastSampleTime = Date.now();
        this.lastBytesSent = this.bytesSent;
        this.lastBytesReceived = this.bytesReceived;
        const interval = this.config.intervalMs ?? 5000;
        this.intervalTimer = setInterval(() => {
            this.emitTelemetry();
        }, interval);
    }
    stop() {
        if (!this.running)
            return;
        this.running = false;
        if (this.intervalTimer !== null) {
            clearInterval(this.intervalTimer);
            this.intervalTimer = null;
        }
    }
    isStreaming() {
        return this.running;
    }
    getTelemetry() {
        const now = Date.now();
        const uptimeMs = now - this.startTime;
        this.calculateRates(now);
        let activePeers = 0;
        if (this.presence) {
            activePeers = this.presence.obtenerNodosActivos().length;
        }
        let status = "online";
        if (this.presence) {
            const selfHealth = this.presence.obtenerSalud(this.nodeId);
            if (!selfHealth ||
                selfHealth.estado === "fallando" ||
                selfHealth.fallosConsecutivos > 0) {
                status = "degraded";
            }
        }
        return {
            nodeId: this.nodeId,
            timestamp: now,
            uptimeMs,
            status,
            activePeers,
            bandwidth: {
                bytesSent: this.bytesSent,
                bytesReceived: this.bytesReceived,
                txRateBytesPerSec: this.txRate,
                rxRateBytesPerSec: this.rxRate,
            },
        };
    }
    calculateRates(now) {
        const elapsedSec = (now - this.lastSampleTime) / 1000;
        if (elapsedSec > 0) {
            const deltaSent = this.bytesSent - this.lastBytesSent;
            const deltaReceived = this.bytesReceived - this.lastBytesReceived;
            this.txRate = Math.round((deltaSent / elapsedSec) * 100) / 100;
            this.rxRate = Math.round((deltaReceived / elapsedSec) * 100) / 100;
            this.lastBytesSent = this.bytesSent;
            this.lastBytesReceived = this.bytesReceived;
            this.lastSampleTime = now;
        }
    }
    emitTelemetry() {
        const telemetry = this.getTelemetry();
        if (this.config.onTelemetry) {
            try {
                this.config.onTelemetry(telemetry);
            }
            catch (e) {
                console.error("Error in GosBridge onTelemetry callback:", e);
            }
        }
        const event = new CustomEvent("telemetry", { detail: telemetry });
        this.eventTarget.dispatchEvent(event);
    }
    onTelemetry(callback) {
        const handler = (ev) => {
            const customEv = ev;
            callback(customEv.detail);
        };
        this.eventTarget.addEventListener("telemetry", handler);
        return () => {
            this.eventTarget.removeEventListener("telemetry", handler);
        };
    }
}
//# sourceMappingURL=GosBridge.js.map