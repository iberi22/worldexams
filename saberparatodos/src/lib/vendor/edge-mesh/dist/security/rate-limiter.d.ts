export interface RateLimiterConfig {
    tokensPerInterval: number;
    intervalMs: number;
    maxTokens: number;
}
export declare class TokenBucketRateLimiter {
    private config;
    private buckets;
    constructor(config: RateLimiterConfig);
    consume(key: string, tokens?: number): boolean;
    reset(key: string): void;
}
//# sourceMappingURL=rate-limiter.d.ts.map