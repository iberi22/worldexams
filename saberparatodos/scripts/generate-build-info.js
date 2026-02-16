
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { execSync } from 'child_process';

const getGitCommit = () => {
    try {
        return execSync('git rev-parse --short HEAD').toString().trim();
    } catch (e) {
        return 'dev';
    }
};

const getGitBranch = () => {
    try {
        return execSync('git rev-parse --abbrev-ref HEAD').toString().trim();
    } catch (e) {
        return 'main';
    }
};

const buildInfo = {
  buildTime: new Date().toISOString(),
  commit: process.env.CF_PAGES_COMMIT_SHA || getGitCommit(),
  branch: process.env.CF_PAGES_BRANCH || getGitBranch(),
  version: process.env.npm_package_version || '0.0.0',
  env: process.env.NODE_ENV || 'production'
};

const publicDir = path.join(__dirname, '../public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(
  path.join(publicDir, 'build-info.json'),
  JSON.stringify(buildInfo, null, 2)
);

console.log('✅ Generated public/build-info.json');
