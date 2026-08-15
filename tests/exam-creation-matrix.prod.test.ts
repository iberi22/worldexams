import { expect, test } from "@playwright/test";

const it = test;
const describe = test.describe;

const siteBaseUrl = process.env.PLAYWRIGHT_BASE_URL || "https://saberparatodos.space";
const apiBaseUrl = process.env.API_BASE_URL || "https://api.saberparatodos.space";

const examMatrix = [
  { grade: 11, subject: "matematicas" },
  { grade: 11, subject: "lectura_critica" },
  { grade: 11, subject: "ciencias_naturales" },
  { grade: 11, subject: "sociales_y_ciudadanas" },
  { grade: 11, subject: "ingles" },
];

const periodUiMatrix = [
  { grade: 11, subjectLabel: "Matemáticas", periodLabel: /Periodo 1/i },
  { grade: 11, subjectLabel: "Ciencias Naturales", periodLabel: /Periodo 1/i },
];

describe("Production exam creation matrix", () => {
  test.describe.configure({ mode: "serial" });

  it("site root is healthy", async ({ page, browserName }) => {
    test.skip(browserName !== "chromium", "UI smoke runs only in chromium.");

    await page.addInitScript(() => {
      localStorage.setItem("spt_hide_hero", "true");
    });

    const response = await page.goto(siteBaseUrl, { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(200);
    await expect(page.locator("body")).toContainText(/Domina el ICFES|Configurar Examen|SaberParaTodos/i);
  });

  for (const combo of examMatrix) {
    it(`API combo G${combo.grade} ${combo.subject} returns guest questions`, async ({ request, browserName }) => {
      test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");

      const response = await request.get(`${apiBaseUrl}/v1/questions`, {
        params: {
          country: "co",
          exam: "icfes",
          grade: String(combo.grade),
          subject: combo.subject,
          page: "1",
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body.is_guest).toBe(true);
      expect(Array.isArray(body.questions)).toBe(true);
      expect(body.questions.length).toBeGreaterThan(0);
      expect(body.questions.length).toBeLessThanOrEqual(10);
    });

    it(`same-origin proxy combo G${combo.grade} ${combo.subject} returns guest questions`, async ({ request, browserName }) => {
      test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");

      const response = await request.get(`${siteBaseUrl}/api/questions`, {
        params: {
          country: "co",
          exam: "icfes",
          grade: String(combo.grade),
          subject: combo.subject,
          page: "1",
        },
      });

      expect(response.status()).toBe(200);
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(Array.isArray(body.questions)).toBe(true);
      expect(body.questions.length).toBeGreaterThan(0);
    });
  }

  it("same-origin pack proxy supports HEAD for ciencias 11", async ({ request, browserName }) => {
    test.skip(browserName !== "chromium", "Matrix runs once in chromium to keep production smoke bounded.");

    const response = await request.fetch(`${siteBaseUrl}/api/packs/co-week-1-grade-11-subject-ciencias_naturales.json`, {
      method: "HEAD",
    });

    expect(response.status()).toBe(200);
  });

  for (const combo of periodUiMatrix) {
    it(`UI can start period exam for grade ${combo.grade} ${combo.subjectLabel}`, async ({ page, browserName }) => {
      test.skip(browserName !== "chromium", "UI smoke runs only in chromium.");

      await page.addInitScript(() => {
        localStorage.setItem("spt_hide_hero", "true");
        Date.now = () => new Date("2025-01-02T00:00:00Z").getTime();
      });

      const query = new URLSearchParams({
        grade: String(combo.grade),
        subject: combo.subjectLabel,
      });

      await page.goto(`${siteBaseUrl}/?${query.toString()}`, { waitUntil: "domcontentloaded" });

      const modal = page.getByTestId("modal-content");
      await expect(modal).toBeVisible({ timeout: 15000 });

      page.on('console', msg => console.log('BROWSER CONSOLE:', msg.text()));
      page.on('dialog', dialog => {
        console.log('BROWSER DIALOG:', dialog.type(), dialog.message());
        dialog.accept();
      });

      await page.getByRole("button", { name: /Por Periodo/i }).click();
      await page.getByRole("button", { name: combo.periodLabel }).first().click();
      await page.getByRole("button", { name: /^Comenzar$/i }).click();

      await expect(page.getByTestId("exam-shell")).toBeVisible({ timeout: 20000 });
      await expect(page.getByTestId("options-grid")).toBeVisible({ timeout: 20000 });
    });
  }
});
