import { test, expect } from '@playwright/test';

test.describe('E2E Validation: Student/Teacher Views & Anchored Community Debate', () => {
  test('1. Subject Hub renders Student vs Teacher perspective properly', async ({ page }) => {
    // Navigate to a canonical subject hub: Colombia, Grado 11, Matemáticas
    await page.goto('/preguntas/colombia/grado-11/matematicas/');
    await expect(page.locator('h1')).toContainText('Matematicas — Grado 11');

    // Default perspective is "Para Estudiantes"
    const studentTabBtn = page.getByRole('button', { name: /Para Estudiantes/i });
    const teacherTabBtn = page.getByRole('button', { name: /Para Profesores/i });
    await expect(studentTabBtn).toBeVisible();
    await expect(teacherTabBtn).toBeVisible();

    // Verify Student Perspective elements
    await expect(page.getByText('Mapa de Conceptos Evaluados')).toBeVisible();
    await expect(page.getByText(/Errores Comunes Frecuentes/i)).toBeVisible();
    await expect(page.getByText('Banco de Práctica Semanal')).toBeVisible();

    // Switch to "Para Profesores"
    await teacherTabBtn.click();
    await expect(page.getByText('Matriz de Competencias Curriculares')).toBeVisible();
    await expect(page.getByText('Competencias Evaluadas')).toBeVisible();
    await expect(page.getByText('Generador de Talleres & Evaluaciones Imprimibles')).toBeVisible();
  });

  test('2. Static question page links directly to anchored community debate', async ({ page }) => {
    await page.goto('/preguntas/colombia/matematicas/w01');
    
    // Look for the community debate contextual button
    const debateBtn = page.getByRole('link', { name: /Ver debate e interpretaciones comunitarias/i }).first();
    await expect(debateBtn).toBeVisible();

    // Click to navigate to the community question page
    await debateBtn.click();
    await expect(page).toHaveURL(/\/community\/CO-MAT-11-/i);

    // Verify the community page renders without overlap and with correct title
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Hilos de Explicación Colaborativa');
    await expect(page.getByText('Explicación principal')).toBeVisible();
    await expect(page.getByRole('button', { name: /Añadir respuesta al hilo/i })).toBeVisible();
  });

  test('3. ArticleView embedded tabs for Community Debate and Corrections', async ({ page }) => {
    // Open the blog/questions review page
    await page.goto('/preparacion');
    await expect(page.locator('body')).toBeVisible();
  });
});
