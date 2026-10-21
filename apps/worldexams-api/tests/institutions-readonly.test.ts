// @vitest-environment node
import { describe, it, expect, vi } from "vitest";
import { routeInstitutions } from "../src/institutions";

function mkEnv(readonly?: string) {
  const prepare = vi.fn(() => {
    throw new Error("DB touched");
  });
  return { env: { RANKED_DB: { prepare }, ...(readonly ? { RANKED_READONLY: readonly } : {}) } as any, prepare };
}
const post = (p: string) =>
  new Request(`https://api.test/v1/inst${p}`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: "{}",
  });

describe("institutions read-only preview guard", () => {
  for (const p of ["/join", "/auth/request"]) {
    it(`blocks POST ${p} when RANKED_READONLY=1 without touching the DB`, async () => {
      const { env, prepare } = mkEnv("1");
      const res = await routeInstitutions(post(p), env);
      expect(res.status).toBe(403);
      expect(((await res.json()) as any).error).toBe("READONLY_PREVIEW");
      expect(prepare).not.toHaveBeenCalled();
    });
    it(`does not return 403 for POST ${p} without the flag`, async () => {
      const { env } = mkEnv();
      let status = 0;
      try {
        status = (await routeInstitutions(post(p), env)).status;
      } catch {
        status = 500;
      }
      expect(status).not.toBe(403);
    });
  }
});
