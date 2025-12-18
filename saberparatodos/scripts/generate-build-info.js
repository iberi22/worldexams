import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Get git commit hash
let gitCommit = 'unknown';
try {
  gitCommit = execSync('git rev-parse --short HEAD').toString().trim();
} catch (e) {
  console.warn('⚠️ Could not get git commit hash');
}

// Get build timestamp
const buildTimestamp = new Date().toISOString();

// Read package.json for version
const packageJson = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8')
);

// Create build info
const buildInfo = {
  version: packageJson.version,
  commit: gitCommit,
  timestamp: buildTimestamp,
  env: process.env.NODE_ENV || 'development'
};

// Write to public/ so it's accessible at build time
const outputPath = path.join(__dirname, '../public/build-info.json');
fs.writeFileSync(outputPath, JSON.stringify(buildInfo, null, 2));

console.log('✅ Build info generated:');
console.log(buildInfo);
