export interface PerfilRestaurante {
    id: string;
    nombre: string;
    direccion: string;
    menuHash: string;
    horario: string;
    reputacion: number;
}
export interface Pedido {
    id: string;
    restauranteId: string;
    clienteId: string;
    items: string[];
    total: number;
    estado: 'recibido' | 'preparando' | 'listo' | 'entregado';
}
//# sourceMappingURL=profile.d.ts.map