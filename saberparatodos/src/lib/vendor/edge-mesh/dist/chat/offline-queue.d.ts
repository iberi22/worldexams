import type { IStorage } from "../storage/index.js";
import type { Mensaje } from "./index.js";
export type ChatMessage = Mensaje;
export interface OfflineMessageQueue {
    enqueue(channelId: string, message: ChatMessage): Promise<void>;
    dequeue(channelId: string): Promise<ChatMessage | null>;
    peek(channelId: string): Promise<ChatMessage[]>;
    flush(channelId: string): Promise<number>;
    size(channelId: string): Promise<number>;
}
export declare class MeshPresence {
    private static readonly onlineNodes;
    static isOnline(peerId: string): boolean;
    static setOnline(peerId: string, online: boolean): void;
    static clear(): void;
}
export declare class PersistentOfflineQueue implements OfflineMessageQueue {
    private readonly storage;
    private readonly maxCapacity;
    private readonly senders;
    private readonly channelPeers;
    constructor(storage: IStorage, maxCapacity?: number);
    private obtenerKey;
    enqueue(channelId: string, message: ChatMessage): Promise<void>;
    dequeue(channelId: string): Promise<ChatMessage | null>;
    peek(channelId: string): Promise<ChatMessage[]>;
    size(channelId: string): Promise<number>;
    flush(channelId: string): Promise<number>;
    registerChannel(channelId: string, peerId: string, sender: (msg: ChatMessage) => Promise<void>): void;
    handlePeerReconnect(peerId: string): Promise<void>;
}
//# sourceMappingURL=offline-queue.d.ts.map