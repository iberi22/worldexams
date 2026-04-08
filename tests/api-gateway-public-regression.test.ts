import { expect, test } from "@playwright/test";

const apiBaseUrl =
  process.env.API_BASE_URL ||
  (process.env.PLAYWRIGHT_BASE_URL?.includes("saberparatodos.space")
    ? "https://api.saberparatodos.space"
    : "http://127.0.0.1:8791");

test.describe("API gateway public regression", () => {
  test("public questions endpoint returns 200 and guest payload", async ({ request }) => {
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
    expect(body.questions.length).toBeGreaterThan(0);
    expect(body.questions.length).toBeLessThanOrEqual(10);
    expect(body.is_guest).toBe(true);
  });

  test("premium endpoint still rejects missing API key", async ({ request }) => {
    const response = await request.get(`${apiBaseUrl}/v1/premium/questions`, {
      params: {
        grade: "11",
        subject: "matematicas",
      },
    });

    expect(response.status()).toBe(401);

    const body = await response.json();
    expect(body.code).toBe("MISSING_API_KEY");
  });
});
