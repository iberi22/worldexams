export interface InventarioItem {
    id: string;
    nombre: string;
    sku: string;
    cantidad: number;
    precio: number;
    metadataCifrada?: Uint8Array;
}
export interface TransaccionInventario {
    id: string;
    itemId: string;
    tipo: 'entrada' | 'salida' | 'ajuste';
    cantidad: number;
    timestamp: Date;
    firmadoPor: string;
}
//# sourceMappingURL=profile.d.ts.map