import { expect, test } from "@playwright/test";

const it = test;
const describe = test.describe;

const siteBaseUrl = process.env.PLAYWRIGHT_BASE_URL || "https://saberparatodos.space";

describe("Guide tenant isolation", () => {
  it("Colombia guide keeps ICFES-specific sections", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/guia-examen`, {
      params: { country: "co" },
    });

    expect(response.status()).toBe(200);
    const html = await response.text();

    expect(html).toContain("Guia Pruebas Saber");
    expect(html).toContain("Como reporta resultados el ICFES");
    expect(html).toContain("Analisis de datos Saber 11");
  });

  it("Mexico guide does not reuse ICFES result copy", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/guia-examen`, {
      params: { country: "mx" },
    });

    expect(response.status()).toBe(200);
    const html = await response.text();

    expect(html).toContain("Guia Completa EXANI-II");
    expect(html).toContain("CENEVAL");
    expect(html).not.toContain("Como reporta resultados el ICFES");
    expect(html).not.toContain("Analisis de datos Saber 11");
  });

  const genericCountries = ["ar", "cl", "pe", "ec", "br", "pa", "cr", "gt", "do", "sv", "hn", "ni"];

  for (const country of genericCountries) {
    it(`Generic tenant ${country} stays isolated from ICFES blocks`, async ({ request }) => {
      const response = await request.get(`${siteBaseUrl}/guia-examen`, {
        params: { country },
      });

      expect(response.status()).toBe(200);
      const html = await response.text();

      expect(html).toContain("Localizacion en progreso");
      expect(html).not.toContain("Como reporta resultados el ICFES");
      expect(html).not.toContain("Analisis de datos Saber 11");
      expect(html).not.toContain("Consulta directa en ICFES");
    });
  }
});
