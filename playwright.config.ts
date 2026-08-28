import path from 'path';
import { fileURLToPath } from 'url';
import config from './saberparatodos/playwright.config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  ...config,
  testDir: path.resolve(__dirname, 'saberparatodos/tests'),
};
