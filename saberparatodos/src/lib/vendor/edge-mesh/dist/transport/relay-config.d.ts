export interface ParsedRelayConfig {
    host: string;
    port: number;
    path: string;
    secure: boolean;
    rawUrl: string;
}
export declare function resolveRelayUrl(optionsUrl?: string): string;
export declare function parseRelayUrl(relayUrl: string): ParsedRelayConfig;
export declare function getRelayConfig(optionsUrl?: string): ParsedRelayConfig;
//# sourceMappingURL=relay-config.d.ts.map