import { expect, test } from "@playwright/test";

const it = test;
const describe = test.describe;

describe("Home tenant isolation", () => {
  it("Mexico home does not render Colombia hero labels", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/`, { params: { country: "mx" } });
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain("WorldExams Mexico");
    expect(html).not.toContain("SaberParaTodos");
    expect(html).not.toContain("Colombia");
  });

  it("Generic tenant home stays free from Colombia-first branding", async ({ request }) => {
    const response = await request.get(`${siteBaseUrl}/`, { params: { country: "ar" } });
    expect(response.status()).toBe(200);

    const html = await response.text();
    expect(html).toContain("WorldExams Argentina");
    expect(html).not.toContain("SaberParaTodos");
    expect(html).not.toContain("Colombia");
  });
});

const siteBaseUrl = process.env.PLAYWRIGHT_BASE_URL || "https://saberparatodos.space";
