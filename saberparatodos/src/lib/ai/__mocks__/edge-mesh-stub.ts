/** Minimal stub so unit tests resolve `edge-mesh` without the sibling package. */
export type AiCore = {
  llm: { generate: (p: unknown) => Promise<string> };
};

export function createAiCore(_opts?: unknown): AiCore {
  return {
    llm: {
      async generate() {
        return '';
      },
    },
  };
}
