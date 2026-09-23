import type { NodoId, ParPublico } from "../types/index.js";
export type { ParPublico };
export declare const TIPO_IDENTIDAD: {
    readonly MAESTRA: "maestra";
    readonly EPHEMERA: "ephemera";
    readonly SERVICIO: "servicio";
};
export type TipoIdentidad = (typeof TIPO_IDENTIDAD)[keyof typeof TIPO_IDENTIDAD];
export interface PostQuantumKeypair {
    readonly parPrivado: Uint8Array;
    readonly parPublico: ParPublico;
    readonly algoritmo: string;
    readonly tipo: TipoIdentidad;
    readonly fechaCreacion: number;
}
export interface IdentityProvider {
    sign(data: string): Promise<string>;
    verify(data: string, signature: string, publicKey: Uint8Array): Promise<boolean>;
}
export interface PostQuantumIdentity extends IdentityProvider {
    readonly nodoId: NodoId;
    readonly keypair: PostQuantumKeypair;
    firmar(datos: Uint8Array): Promise<Uint8Array>;
    verificar(datos: Uint8Array, firma: Uint8Array, parPublico: ParPublico): Promise<boolean>;
    exportarPublico(): ParPublico;
    obtenerAlgoritmo(): string;
}
export declare function generateKeypair(tipo?: TipoIdentidad): PostQuantumKeypair;
export declare function createPostQuantumIdentity(nodoId: NodoId, keypair?: PostQuantumKeypair): PostQuantumIdentity;
/**
 * Restore identity from a **serialized keypair** produced by `serializeKeypair`.
 * Passing a raw mismatched private key alone is unsafe and no longer supported.
 *
 * For a fresh random identity, use `createPostQuantumIdentity(nodoId)`.
 */
export declare function identityFromSecret(nodoId: NodoId, semilla: Uint8Array, tipo?: TipoIdentidad): PostQuantumIdentity;
export declare function serializeKeypair(keypair: PostQuantumKeypair): string;
export declare function deserializeKeypair(serializada: string): PostQuantumKeypair;
//# sourceMappingURL=index.d.ts.map