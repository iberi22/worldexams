import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { createEnvelope, MessageDeduplicator } from "../protocol/index.js";
import { TIPO_MENSAJE, TIPO_TRANSPORTE } from "../types/index.js";
export const DEFAULT_TOR_CONFIG = {
    enabled: false,
    localPort: 8080,
    socksPort: 9050,
    controlPort: 9051,
    torBinary: "tor",
};
/**
 * Resolve data directory for Tor state and hidden service keys.
 */
export function getTorDataDir(customPath) {
    if (customPath)
        return customPath;
    const home = os.homedir();
    if (process.platform === "win32") {
        return path.join(process.env.APPDATA || path.join(home, "AppData", "Roaming"), "edge-mesh", "tor");
    }
    if (process.platform === "darwin") {
        return path.join(home, "Library", "Application Support", "edge-mesh", "tor");
    }
    return path.join(home, ".local", "share", "edge-mesh", "tor");
}
/**
 * Generate standard torrc configuration for an Onion v3 Hidden Service.
 */
export function generateTorrc(config, dataDir) {
    const hiddenServiceDir = path.join(dataDir, "onion");
    const localPort = config.localPort ?? 8080;
    const socksPort = config.socksPort ?? 9050;
    const controlPort = config.controlPort ?? 9051;
    return [
        `DataDirectory ${dataDir}`,
        `SocksPort ${socksPort}`,
        `ControlPort ${controlPort}`,
        `HiddenServiceDir ${hiddenServiceDir}`,
        `HiddenServicePort ${localPort} 127.0.0.1:${localPort}`,
        `HiddenServiceVersion 3`,
        "",
    ].join("\n");
}
/**
 * TorOnionTransport provides opt-in Tor Onion v3 Hidden Service connectivity.
 */
export class TorOnionTransport {
    tipo = TIPO_TRANSPORTE.TOR;
    eventTarget;
    nodoId;
    config;
    deduplicator;
    torProcess = null;
    onionAddress = null;
    conectado = false;
    dataDir;
    constructor(nodoId, config = {}) {
        this.nodoId = nodoId;
        this.eventTarget = new EventTarget();
        this.deduplicator = new MessageDeduplicator();
        this.config = { ...DEFAULT_TOR_CONFIG, ...config };
        this.dataDir = getTorDataDir(this.config.dataDir);
    }
    async start(localPort) {
        if (!this.config.enabled) {
            return null;
        }
        const port = localPort ?? this.config.localPort ?? 8080;
        const hiddenServiceDir = path.join(this.dataDir, "onion");
        try {
            fs.mkdirSync(hiddenServiceDir, { recursive: true, mode: 0o700 });
        }
        catch (err) {
            console.warn(`[TorTransport] Failed to create data dir: ${err.message}`);
            return null;
        }
        const torrcPath = path.join(this.dataDir, "torrc");
        const torrcContent = generateTorrc({ ...this.config, localPort: port }, this.dataDir);
        fs.writeFileSync(torrcPath, torrcContent, { mode: 0o600 });
        const hostnamePath = path.join(hiddenServiceDir, "hostname");
        if (fs.existsSync(hostnamePath)) {
            this.onionAddress = fs.readFileSync(hostnamePath, "utf8").trim();
        }
        const torBin = this.config.torBinary ?? "tor";
        try {
            this.torProcess = spawn(torBin, ["-f", torrcPath], {
                stdio: ["ignore", "pipe", "pipe"],
            });
            this.torProcess.on("error", (err) => {
                console.warn(`[TorTransport] Tor binary execution error: ${err.message}`);
                this.conectado = false;
            });
            this.torProcess.on("exit", () => {
                this.conectado = false;
            });
            this.conectado = true;
        }
        catch (err) {
            console.warn(`[TorTransport] Failed to spawn Tor process: ${err.message}`);
            this.conectado = false;
        }
        return this.getOnionAddress();
    }
    getOnionAddress() {
        if (this.onionAddress)
            return this.onionAddress;
        const hostnamePath = path.join(this.dataDir, "onion", "hostname");
        if (fs.existsSync(hostnamePath)) {
            this.onionAddress = fs.readFileSync(hostnamePath, "utf8").trim();
        }
        return this.onionAddress;
    }
    async conectar(_peerId) {
        this.conectado = true;
    }
    async desconectar() {
        this.conectado = false;
        if (this.torProcess) {
            this.torProcess.kill("SIGTERM");
            this.torProcess = null;
        }
    }
    async transmitir(datos, tipo) {
        if (!this.conectado)
            return;
        const env = createEnvelope(tipo ?? TIPO_MENSAJE.SYNC, this.nodoId, "todos", datos);
        this.emit("mensaje", { envolvente: env });
    }
    async enviar(destino, datos, tipo) {
        if (!this.conectado)
            return;
        const env = createEnvelope(tipo ?? TIPO_MENSAJE.SYNC, this.nodoId, destino, datos);
        this.emit("mensaje", { envolvente: env });
    }
    obtenerConexiones() {
        return this.conectado && this.onionAddress ? [this.onionAddress] : [];
    }
    estaConectado() {
        return this.conectado;
    }
    async cerrar() {
        await this.desconectar();
    }
    on(tipo, handler) {
        this.eventTarget.addEventListener(tipo, handler);
    }
    off(tipo, handler) {
        this.eventTarget.removeEventListener(tipo, handler);
    }
    emit(tipo, detalle) {
        const evento = new CustomEvent(tipo, { detail: detalle });
        this.eventTarget.dispatchEvent(evento);
    }
}
//# sourceMappingURL=tor.js.map