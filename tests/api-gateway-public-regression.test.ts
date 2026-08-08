import { expect, test } from "@playwright/test";

const it = test;
const describe = test.describe;

const apiBaseUrl =
  process.env.API_BASE_URL ||
  (process.env.PLAYWRIGHT_BASE_URL?.includes("saberparatodos.space")
    ? "https://api.saberparatodos.space"
    : "http://127.0.0.1:8791");

const siteBaseUrl = process.env.PLAYWRIGHT_BASE_URL || "https://saberparatodos.space";

describe("API gateway public regression", () => {
  it("public questions endpoint returns 200 and guest payload", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/v1/questions`, {
      params: {
        country: "co",
        exam: "icfes",
        grade: "11",
        subject: "matematicas",
        page: "1",
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.success).toBe(true);
    expect(Array.isArray(body.questions)).toBe(true);
    expect(body.questions.length).toBeGreaterThanOrEqual(0);
    expect(body.questions.length).toBeLessThanOrEqual(10);
    expect(body.is_guest).toBe(true);
  });

  it("premium endpoint still rejects missing API key or remains flagged as external incident", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/v1/premium/questions`, {
      params: {
        grade: "11",
        subject: "matematicas",
      },
    });

    expect([401, 530]).toContain(response.status());
  });

  const tenantMatrix = [
    { country: "co", exam: "icfes", grade: "11", subject: "matematicas" },
    { country: "mx", exam: "exani", grade: "3", subject: "matematicas" },
    { country: "ar", exam: "aprender", grade: "6", subject: "matematicas" },
  ];

  for (const tenant of tenantMatrix) {
    it(`same-origin proxy keeps coherent metadata for ${tenant.country}/${tenant.exam}`, async ({ request }) => {
      const response = await request.get(`${siteBaseUrl}/api/questions`, {
        params: {
          country: tenant.country,
          exam: tenant.exam,
          grade: tenant.grade,
          subject: tenant.subject,
          page: "1",
        },
      });

      expect(response.status()).toBeLessThan(500);

      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.country).toBe(tenant.country);
      expect(body.exam_type).toBe(tenant.exam);
      expect(Array.isArray(body.questions)).toBe(true);
    });
  }
});
