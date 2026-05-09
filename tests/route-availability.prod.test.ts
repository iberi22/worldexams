import { expect, test } from "@playwright/test";

const siteBaseUrl = process.env.PLAYWRIGHT_BASE_URL || "https://saberparatodos.space";

test.describe("Route availability by tenant", () => {
  test("Mexico ranking is degraded instead of leaking Colombia data", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/ranking`, { params: { country: "mx" } });
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain("Solo Colombia");
    expect(html).not.toContain("Ranking Colombia");
  });

  test("Generic tenant MEN route is degraded instead of rendering MEN content", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/normas-men`, { params: { country: "pe" } });
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain("Solo Colombia");
    expect(html).not.toContain("Competencias evaluadas");
    expect(html).not.toContain("ICFES");
  });
});
