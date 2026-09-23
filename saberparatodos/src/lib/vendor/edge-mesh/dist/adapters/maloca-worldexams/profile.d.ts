import { PerfilHumano } from '../../maloca/types.js';
export interface PerfilExaminador extends PerfilHumano {
    especialidad: string;
    reputacion: number;
    examenesCreados: number;
    examenesCalificados: number;
}
export interface ExamenSesion {
    id: string;
    examinadorId: string;
    examinadoId: string;
    namespaceId: string;
    fechaInicio: Date;
    estado: 'pendiente' | 'en_curso' | 'completado' | 'calificado';
    metadataCifrada: Uint8Array;
}
export interface ResultadoExamen {
    sesionId: string;
    puntaje: number;
    maxPuntaje: number;
    evidencias: string[];
    hashResultado: string;
    firmaExaminador: string;
    firmaExaminado: string;
}
export declare function crearPerfilExaminador(base: PerfilHumano, especialidad: string): PerfilExaminador;
//# sourceMappingURL=profile.d.ts.map