
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('⚠️ generate-weekly-packs.js is missing logic. Skipping pack generation.');

const packsDir = path.join(__dirname, '../public/api/packs');
if (!fs.existsSync(packsDir)) {
  fs.mkdirSync(packsDir, { recursive: true });
}

// Create a dummy current.json to prevent 404s if checked during build
const currentPack = {
  pack_id: 'default',
  generated_at: new Date().toISOString(),
  next_rotation: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
  rotation_days: 7,
  packs: {}
};

fs.writeFileSync(
  path.join(packsDir, 'current.json'),
  JSON.stringify(currentPack, null, 2)
);

console.log('✅ Generated dummy public/api/packs/current.json');
