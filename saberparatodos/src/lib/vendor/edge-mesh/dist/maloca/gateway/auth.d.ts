import { TokenBucketRateLimiter } from "../../security/rate-limiter.js";
import type { ParPublico } from "../../types/index.js";
export declare const authRateLimiter: TokenBucketRateLimiter;
/**
 * Autenticación vía firma PQC.
 */
export declare function loginWithPQC(firma: Uint8Array, publicKey: ParPublico, challenge?: Uint8Array, clientIp?: string): Promise<string | null>;
/**
 * Genera un JWT para sesión externa usando HMAC-SHA256.
 */
export declare function generateJWT(profileId: string): Promise<string>;
/**
 * Verifica un JWT usando HMAC-SHA256.
 */
export declare function verifyToken(token: string): Promise<boolean>;
/**
 * Obtiene el perfil desde el token.
 */
export declare function getProfileFromToken(token: string): Promise<string | null>;
//# sourceMappingURL=auth.d.ts.map