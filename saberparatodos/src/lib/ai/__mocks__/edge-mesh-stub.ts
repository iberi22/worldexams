/** Minimal stub so unit tests and local compilation resolve `edge-mesh` without the sibling package. */

export type AiCore = {
  llm: { generate: (prompt: string, options?: any) => Promise<string> };
  asr: { transcribe: (audio: any) => Promise<string> };
  tts: { speak: (text: string) => Promise<any> };
  scan?: () => Promise<any>;
  recommend?: (caps: any) => any;
  listDownloaded?: () => Promise<any[]>;
  ensureModel?: (modelId: string, onProgress?: (p: any) => void) => Promise<void>;
  removeModel?: (modelId: string) => Promise<void>;
};

export function createAiCore(_opts?: unknown): AiCore {
  return {
    llm: {
      async generate(_prompt: string, _options?: any) {
        return '';
      },
    },
    asr: {
      async transcribe(_audio: any) {
        return '';
      },
    },
    tts: {
      async speak(_text: string) {
        return null;
      },
    },
    async scan() {
      return { tier: 'medium', webgpu: false, cores: 4, estimatedMemoryMB: 8192 };
    },
    recommend(caps: any) {
      return {
        primary: { id: 'qwen2.5-0.5b', kind: 'llm', sizeBytes: 350000000 },
        fallbacks: [],
      };
    },
    async listDownloaded() {
      return [];
    },
    async ensureModel(_modelId: string) {},
    async removeModel(_modelId: string) {},
  };
}

export type NodoId = string;
export type TipoPregunta = string;
export type Pregunta = {
  id: string;
  tipo: TipoPregunta;
  enunciado: string;
  opciones?: string[];
  respuestaCorrecta?: unknown;
  puntaje: number;
};

export type SalonAd = {
  id: string;
  nombre: string;
  tipo: string;
  maxPeers?: number;
  region?: string;
  [key: string]: any;
};

export type DeviceCapabilities = any;
export type ModelRecommendation = any;
export type DownloadedModel = any;

export const TIPO_SALON = {
  EXAMEN: "EXAMEN",
};

export const TIPO_PREGUNTA = {
  OPCION_MULTIPLE: "opcion_multiple",
  VERDADERO_FALSO: "verdadero_falso",
  RESPUESTA_CORTA: "respuesta_corta",
  ENSAYO: "ensayo",
};

export class EdgeMesh {
  yjsAdapter = {};
  constructor(_config?: any) {}
  async iniciar() {}
  async detener() {}
  on(_event: string, _callback: Function) {}
  off(_event: string, _callback: Function) {}
}

export class SalonesManager {
  constructor(_mesh: any) {}
  usarRegistry(_registry: any) {}
  async crearSalon(nombre: string, tipo: string, maxPeers?: number, meta?: any) {
    return {
      id: "MOCK-SALON-ID",
      obtenerInfo: () => ({
        creador: "host",
        nombre,
        participantes: ["host"],
      }),
    };
  }
  async unirsePorCodigo(codigo: string) {
    return {
      id: codigo,
      obtenerInfo: () => ({
        creador: "host",
        nombre: "Test Room",
        participantes: ["host", "player"],
      }),
    };
  }
  async abandonarSalon(_id: string) {}
}

export class SalonRegistry {
  constructor(_opts?: any) {}
  anunciar(ad: any) {
    return ad;
  }
  listar(_region?: string) {
    return [];
  }
  dispose() {}
}

export class ExamenCompartido {
  constructor(_examenId: string, _yjsAdapter: any) {}
  addEventListener(_event: string, _callback: Function) {}
  async cargarPreguntas(_preguntas: any[]) {}
  async agregarPregunta(_pregunta: any) {}
  async enviarRespuesta(_estudianteId: string, _preguntaId: string, _respuesta: any) {}
  async iniciarExamen() {}
  async finalizarExamen() {}
  obtenerPreguntas() {
    return [];
  }
  async obtenerRespuestas() {
    return new Map();
  }
  async obtenerRespuestasDeEstudiante(_id: string) {
    return new Map();
  }
  obtenerEstado() {
    return {};
  }
}

export class SalonVirtual {
  id = "";
  obtenerInfo() {
    return {
      creador: "host",
      nombre: "Test Room",
      participantes: ["host", "player"],
    };
  }
}

export class AsrEngine {
  constructor(_opts?: any) {}
}
