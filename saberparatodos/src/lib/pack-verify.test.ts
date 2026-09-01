import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Static Pack Verification', () => {
  const packsDir = path.resolve(__dirname, '../../../apps/worldexams-api/public/v1/packs');

  it('verifies that static pack directory exists and contains JSON pack files', () => {
    expect(fs.existsSync(packsDir)).toBe(true);
    const files = fs.readdirSync(packsDir);
    const jsonPacks = files.filter((f) => f.endsWith('.json'));
    expect(jsonPacks.length).toBeGreaterThan(0);
  });

  it('verifies that Colombia weekly packs count is at least 1300', () => {
    const files = fs.readdirSync(packsDir);
    const coWeekPacks = files.filter((f) => f.startsWith('co-week-') && f.endsWith('.json'));
    expect(coWeekPacks.length).toBeGreaterThanOrEqual(1300);
  });
});
