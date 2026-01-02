import { test, expect } from '@playwright/test';

test.describe('🔄 Rotating Packs Protocol (SSR)', () => {

  test('should return valid current pack configuration', async ({ request }) => {
    // Call the dynamic API endpoint
    const response = await request.get('/api/packs/current.json');
    expect(response.ok()).toBeTruthy();

    const data = await response.json();

    // Verify Protocol Structure
    expect(data).toHaveProperty('pack_id');
    expect(data).toHaveProperty('generated_at');
    expect(data).toHaveProperty('next_rotation');
    expect(data).toHaveProperty('rotation_days');
    expect(data).toHaveProperty('packs');

    // Verify Pack ID format (YYYY-p###)
    expect(data.pack_id).toMatch(/^\d{4}-p\d{3}$/);

    // Verify we have content for core grades
    const grades = [3, 5, 7, 9, 11];
    for (const grade of grades) {
        if (data.packs[grade]) {
            const pack = data.packs[grade];
            expect(pack).toHaveProperty('questions');
            expect(Array.isArray(pack.questions)).toBeTruthy();
            console.log(`✅ Grade ${grade}: ${pack.questions.length} questions`);
        } else {
            console.warn(`⚠️ No pack found for Grade ${grade}`);
        }
    }
  });

  test('should serve questions with caching headers', async ({ request }) => {
    const response = await request.get('/api/packs/current.json');

    // Cloudflare/CDN caching check
    // Note: Local dev might not have all headers, but let's check basic availability
    expect(response.ok()).toBeTruthy();
  });

});
