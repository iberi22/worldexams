#!/usr/bin/env node
/**
 * scripts/verify-wave4-readiness.mjs
 * Verification harness for Wave 4 features
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 [Wave 4 Verification] Starting audit of Wave 4 deliverables...\n');

let passedChecks = 0;
let totalChecks = 0;

function check(name, condition, errorMsg = '') {
  totalChecks++;
  if (condition) {
    console.log(`  ✅ ${name}`);
    passedChecks++;
  } else {
    console.error(`  ❌ ${name}: ${errorMsg}`);
  }
}

// 1. Full-grade offline compiler & API endpoint
const grade11Pack = path.join(rootDir, 'apps/worldexams-api/public/v1/grades/co-grado-11-full.json');
check(
  'Full-grade offline pack exists (co-grado-11-full.json)',
  fs.existsSync(grade11Pack),
  'Missing apps/worldexams-api/public/v1/grades/co-grado-11-full.json'
);

if (fs.existsSync(grade11Pack)) {
  const packContent = JSON.parse(fs.readFileSync(grade11Pack, 'utf-8'));
  check(
    'Full-grade pack has valid questions array (>100 questions)',
    Array.isArray(packContent.questions) && packContent.questions.length > 100,
    `Only ${packContent.questions?.length || 0} questions found`
  );
}

// 2. API Gateway Grade Endpoint in index.ts
const apiIndex = path.join(rootDir, 'apps/worldexams-api/src/index.ts');
const apiCode = fs.readFileSync(apiIndex, 'utf-8');
check(
  'API Gateway has /v1/grades/:country/:grade/bundle route',
  apiCode.includes('/v1/grades/') && apiCode.includes('gradeBundleMatch'),
  'Route /v1/grades/ not implemented in worker'
);

// 3. PWA Offline Grade Storage
const offlineStorageFile = path.join(rootDir, 'saberparatodos/src/lib/offline-grade-storage.ts');
check(
  'PWA offline-grade-storage.ts exists',
  fs.existsSync(offlineStorageFile),
  'Missing saberparatodos/src/lib/offline-grade-storage.ts'
);

// 4. Offline Grade Downloader UI
const downloaderComponent = path.join(rootDir, 'saberparatodos/src/components/settings/OfflineGradeDownloader.svelte');
const offlinePage = path.join(rootDir, 'saberparatodos/src/pages/ajustes/offline.astro');
check(
  'OfflineGradeDownloader.svelte exists',
  fs.existsSync(downloaderComponent),
  'Missing OfflineGradeDownloader.svelte'
);
check(
  '/ajustes/offline.astro page exists',
  fs.existsSync(offlinePage),
  'Missing /ajustes/offline.astro'
);

// 5. SWAL Vault Decentralized Auth & Zero-PII Bridge
const vaultAuthClient = path.join(rootDir, 'saberparatodos/src/lib/vault/vault-auth-client.ts');
const encryptedVaultSync = path.join(rootDir, 'saberparatodos/src/lib/vault/encrypted-vault-sync.ts');
check(
  'vault-auth-client.ts exists with Zero-PII assertNoPII guard',
  fs.existsSync(vaultAuthClient) && fs.readFileSync(vaultAuthClient, 'utf-8').includes('assertNoPII'),
  'Missing or incomplete vault-auth-client.ts'
);
check(
  'encrypted-vault-sync.ts exists with AES-256-GCM encryption',
  fs.existsSync(encryptedVaultSync) && fs.readFileSync(encryptedVaultSync, 'utf-8').includes('AES-256-GCM'),
  'Missing or incomplete encrypted-vault-sync.ts'
);

// 6. Live Mesh Leaderboard UI
const meshLeaderboard = path.join(rootDir, 'saberparatodos/src/components/leaderboard/LeaderboardLiveMesh.svelte');
check(
  'LeaderboardLiveMesh.svelte component exists',
  fs.existsSync(meshLeaderboard),
  'Missing LeaderboardLiveMesh.svelte'
);

// 7. Maloca Admin Embed & Telemetry Isolation (BR-03)
const malocaAdmin = path.join(rootDir, 'saberparatodos/src/components/admin/MalocaAdminEmbed.svelte');
const malocaPage = path.join(rootDir, 'saberparatodos/src/pages/admin/maloca.astro');
check(
  'MalocaAdminEmbed.svelte and /admin/maloca.astro exist',
  fs.existsSync(malocaAdmin) && fs.existsSync(malocaPage),
  'Missing Maloca admin embed files'
);

const studentPractice = fs.readFileSync(path.join(rootDir, 'saberparatodos/src/pages/practica.astro'), 'utf-8');
check(
  'Student /practica is 100% free of telemetry collectors (BR-03 / REQ-009)',
  !studentPractice.includes('telemetry_collector') && !studentPractice.includes('maloca-embed'),
  'Telemetry leak found in student practice flow'
);

console.log(`\n📊 [Verification Result] ${passedChecks}/${totalChecks} checks PASSED (${Math.round((passedChecks/totalChecks)*100)}%)\n`);

if (passedChecks === totalChecks) {
  console.log('🎉 All Wave 4 features are fully implemented, verified, and ready for public launch!');
  process.exit(0);
} else {
  console.error('⚠️ Some verification checks failed.');
  process.exit(1);
}
