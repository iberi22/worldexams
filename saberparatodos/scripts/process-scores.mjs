/**
 * Script to process score submissions from GitHub Issues
 *
 * Workflow:
 * 1. Fetch open issues with label 'score-submission'
 * 2. Parse issue body to extract score data
 * 3. Check rate limits (max submissions per user per day)
 * 4. Validate score data
 * 5. Update leaderboard JSON files
 * 6. Generate LEADERBOARD.md
 * 7. Close issue with comment
 *
 * Anti-Abuse Features:
 * - Rate limiting: Max 5 submissions per user per day
 * - Duplicate detection: Min 5 minutes between submissions
 * - Score validation: Points within expected ranges
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const LEADERBOARDS_DIR = join(ROOT_DIR, 'public', 'leaderboards');
const RATE_LIMIT_FILE = join(ROOT_DIR, '.github', 'rate-limits.json');

// Configuration
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.GITHUB_REPOSITORY?.split('/')[0] || 'worldexams';
const REPO_NAME = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'saberparatodos';

if (!GITHUB_TOKEN) {
  console.error('❌ GITHUB_TOKEN is required');
  process.exit(1);
}

// Rate Limiting Constants
const RATE_LIMITS = {
  maxSubmissionsPerDay: 5,           // Max submissions per user per day
  minTimeBetweenSubmissionsMs: 300000, // 5 minutes minimum between submissions
  rateLimitWindowMs: 86400000,       // 24 hours window
};

// Validation Constants (matched with Edge Function)
const VALIDATION_LIMITS = {
  minQuestionsAnswered: 1,
  maxQuestionsAnswered: 100,
  minPoints: 0,
  maxPointsPerQuestion: 500,
  minExamDurationMs: 30000,
  maxExamDurationMs: 7200000,
  minAccuracy: 0,
  maxAccuracy: 1,
};

// ============= Rate Limiting Helpers =============

/**
 * Load rate limit tracking data
 */
function loadRateLimits() {
  const githubDir = join(ROOT_DIR, '.github');
  if (!existsSync(githubDir)) {
    mkdirSync(githubDir, { recursive: true });
  }

  if (existsSync(RATE_LIMIT_FILE)) {
    try {
      return JSON.parse(readFileSync(RATE_LIMIT_FILE, 'utf-8'));
    } catch {
      return { users: {}, lastCleanup: Date.now() };
    }
  }
  return { users: {}, lastCleanup: Date.now() };
}

/**
 * Save rate limit tracking data
 */
function saveRateLimits(data) {
  const githubDir = join(ROOT_DIR, '.github');
  if (!existsSync(githubDir)) {
    mkdirSync(githubDir, { recursive: true });
  }
  writeFileSync(RATE_LIMIT_FILE, JSON.stringify(data, null, 2));
}

/**
 * Clean up old rate limit entries (older than 24h)
 */
function cleanupRateLimits(rateLimits) {
  const now = Date.now();
  const cutoff = now - RATE_LIMITS.rateLimitWindowMs;

  // Only cleanup once per hour to avoid excessive I/O
  if (now - rateLimits.lastCleanup < 3600000) {
    return rateLimits;
  }

  for (const [userId, userData] of Object.entries(rateLimits.users)) {
    // Filter out old submissions
    userData.submissions = (userData.submissions || []).filter(
      timestamp => timestamp > cutoff
    );

    // Remove user if no recent submissions
    if (userData.submissions.length === 0) {
      delete rateLimits.users[userId];
    }
  }

  rateLimits.lastCleanup = now;
  return rateLimits;
}

/**
 * Check if user has exceeded rate limits
 * @returns {Object} { allowed: boolean, reason?: string, remaining?: number }
 */
function checkRateLimit(userId, rateLimits) {
  const now = Date.now();
  const cutoff = now - RATE_LIMITS.rateLimitWindowMs;

  // Initialize user if not exists
  if (!rateLimits.users[userId]) {
    rateLimits.users[userId] = { submissions: [], lastSubmission: 0 };
  }

  const userData = rateLimits.users[userId];

  // Filter to only recent submissions (within 24h)
  const recentSubmissions = (userData.submissions || []).filter(ts => ts > cutoff);
  userData.submissions = recentSubmissions;

  // Check 1: Max submissions per day
  if (recentSubmissions.length >= RATE_LIMITS.maxSubmissionsPerDay) {
    const oldestSubmission = Math.min(...recentSubmissions);
    const resetTime = new Date(oldestSubmission + RATE_LIMITS.rateLimitWindowMs);
    return {
      allowed: false,
      reason: `Has excedido el límite de ${RATE_LIMITS.maxSubmissionsPerDay} submissions por día. Podrás enviar nuevamente después de: ${resetTime.toISOString()}`,
      remaining: 0
    };
  }

  // Check 2: Minimum time between submissions
  if (userData.lastSubmission && (now - userData.lastSubmission) < RATE_LIMITS.minTimeBetweenSubmissionsMs) {
    const waitTime = Math.ceil((RATE_LIMITS.minTimeBetweenSubmissionsMs - (now - userData.lastSubmission)) / 60000);
    return {
      allowed: false,
      reason: `Debes esperar ${waitTime} minutos entre submissions para evitar spam.`,
      remaining: RATE_LIMITS.maxSubmissionsPerDay - recentSubmissions.length
    };
  }

  return {
    allowed: true,
    remaining: RATE_LIMITS.maxSubmissionsPerDay - recentSubmissions.length
  };
}

/**
 * Record a successful submission for rate limiting
 */
function recordSubmission(userId, rateLimits) {
  const now = Date.now();

  if (!rateLimits.users[userId]) {
    rateLimits.users[userId] = { submissions: [], lastSubmission: 0 };
  }

  rateLimits.users[userId].submissions.push(now);
  rateLimits.users[userId].lastSubmission = now;

  return rateLimits;
}

// Helper: Fetch from GitHub API
async function githubRequest(endpoint, method = 'GET', body = null) {
  const url = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${GITHUB_TOKEN}`,
    'Accept': 'application/vnd.github.v3+json',
    'User-Agent': 'Leaderboard-Bot'
  };

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`GitHub API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

// Helper: Parse Issue Body
function parseIssueBody(body) {
  const data = {};
  const lines = body.split('\n');
  let currentKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line.startsWith('### ')) {
      currentKey = line.replace('### ', '').trim();
    } else if (currentKey && line !== '') {
      // Simple mapping based on label names in ISSUE_TEMPLATE
      const keyMap = {
        'Anonymous ID': 'anonymousId',
        'Display Name': 'displayName',
        'Grade': 'grade',
        'Region': 'region',
        'Total Points': 'totalPoints',
        'Questions Answered': 'questionsAnswered',
        'Correct Answers': 'correctAnswers',
        'Exam Duration (ms)': 'examDurationMs',
        'Timestamp': 'timestamp',
        'Score Checksum': 'checksum'
      };

      const mappedKey = keyMap[currentKey];
      if (mappedKey) {
        // Convert types
        if (['grade', 'totalPoints', 'questionsAnswered', 'correctAnswers', 'examDurationMs', 'timestamp'].includes(mappedKey)) {
          data[mappedKey] = Number(line);
        } else {
          data[mappedKey] = line;
        }
      }
    }
  }
  return data;
}

/**
 * Generate checksum for validation (must match frontend algorithm)
 * Formula: (totalPoints * 7) + (questionsAnswered * 13) + (correctAnswers * 17) + floor(examDurationMs / 1000)
 */
function generateChecksum(totalPoints, questionsAnswered, correctAnswers, examDurationMs) {
  const value = (totalPoints * 7) + (questionsAnswered * 13) + (correctAnswers * 17) +
                Math.floor(examDurationMs / 1000);
  return (value % 99999).toString().padStart(5, '0');
}

/**
 * Validate checksum matches expected value
 */
function validateChecksum(data) {
  if (!data.checksum || data.checksum === 'N/A') {
    // Legacy submissions without checksum - allow but flag
    return { valid: true, legacy: true };
  }

  const expected = generateChecksum(
    data.totalPoints,
    data.questionsAnswered,
    data.correctAnswers,
    data.examDurationMs
  );

  return {
    valid: expected === data.checksum,
    expected,
    provided: data.checksum
  };
}

// Helper: Validate Data
function validateScore(data) {
  const errors = [];

  if (!data.anonymousId) errors.push('Missing anonymousId');
  if (!data.displayName) errors.push('Missing displayName');

  if (data.totalPoints < VALIDATION_LIMITS.minPoints) errors.push('Negative points');

  const maxPossible = data.questionsAnswered * VALIDATION_LIMITS.maxPointsPerQuestion;
  if (data.totalPoints > maxPossible) errors.push('Points exceed maximum possible');

  if (data.questionsAnswered < VALIDATION_LIMITS.minQuestionsAnswered) errors.push('Too few questions');

  return errors;
}

// Helper: Update Leaderboard Files
function updateLeaderboards(score) {
  // Ensure directory exists
  if (!existsSync(LEADERBOARDS_DIR)) {
    mkdirSync(LEADERBOARDS_DIR, { recursive: true });
  }

  const periods = ['alltime', 'weekly', 'monthly', 'annual'];
  const now = new Date();

  for (const period of periods) {
    const filename = `leaderboard-${period}.json`;
    const filepath = join(LEADERBOARDS_DIR, filename);

    let leaderboard = {
      version: '1.0',
      period,
      periodStart: now.toISOString(),
      periodEnd: '2099-12-31T23:59:59Z',
      lastUpdated: now.toISOString(),
      totalParticipants: 0,
      entries: [],
      metadata: {
        topGrade: '',
        topRegion: '',
        averageScore: 0,
        averageAccuracy: 0,
        totalExamsCompleted: 0
      }
    };

    if (existsSync(filepath)) {
      leaderboard = JSON.parse(readFileSync(filepath, 'utf-8'));
    }

    // Check if user already exists
    const existingIndex = leaderboard.entries.findIndex(e => e.anonymousId === score.anonymousId);

    const entry = {
      rank: 0,
      anonymousId: score.anonymousId,
      displayName: score.displayName,
      score: score.totalPoints,
      stats: {
        questionsAnswered: score.questionsAnswered,
        accuracy: score.correctAnswers / score.questionsAnswered,
        averageDifficulty: 3,
        longestStreak: 0,
        examsCompleted: 1,
        perfectScores: score.correctAnswers === score.questionsAnswered ? 1 : 0
      },
      grade: String(score.grade),
      region: score.region,
      lastActive: now.toISOString()
    };

    if (existingIndex !== -1) {
      // Update existing: keep best score
      const existing = leaderboard.entries[existingIndex];
      if (score.totalPoints > existing.score) {
        leaderboard.entries[existingIndex] = entry;
      }
      leaderboard.entries[existingIndex].stats.examsCompleted = (existing.stats?.examsCompleted || 0) + 1;
    } else {
      leaderboard.entries.push(entry);
      leaderboard.totalParticipants++;
    }

    // Sort by score (desc)
    leaderboard.entries.sort((a, b) => b.score - a.score);

    // Keep top 100
    leaderboard.entries = leaderboard.entries.slice(0, 100);

    // Assign ranks
    leaderboard.entries.forEach((e, index) => {
      e.rank = index + 1;
    });

    // Update metadata
    leaderboard.lastUpdated = now.toISOString();
    if (leaderboard.entries.length > 0) {
      leaderboard.metadata.topGrade = leaderboard.entries[0].grade;
      leaderboard.metadata.topRegion = leaderboard.entries[0].region;
      leaderboard.metadata.averageScore = Math.round(
        leaderboard.entries.reduce((sum, e) => sum + e.score, 0) / leaderboard.entries.length
      );
    }

    writeFileSync(filepath, JSON.stringify(leaderboard, null, 2));
  }
}

// Helper: Generate Markdown
function generateMarkdown() {
  const filepath = join(LEADERBOARDS_DIR, 'leaderboard-alltime.json');
  if (!existsSync(filepath)) return;

  const data = JSON.parse(readFileSync(filepath, 'utf-8'));

  let md = '# 🏆 Hall of Fame - OpenIcfes\n\n';
  md += '> Este archivo se actualiza automáticamente cada 15 minutos mediante GitHub Actions.\n\n';
  md += '## 🌟 Top 100 All-Time\n\n';
  md += '| Rank | User | Points | Region | Grade | Accuracy |\n';
  md += '|------|------|--------|--------|-------|----------|\n';

  if (data.entries.length === 0) {
    md += '| - | *No hay puntuaciones* | - | - | - | - |\n';
  } else {
    data.entries.forEach(entry => {
      const medal = entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : entry.rank === 3 ? '🥉' : '';
      const accuracy = entry.stats?.accuracy ? `${(entry.stats.accuracy * 100).toFixed(0)}%` : '-';
      md += `| ${medal} ${entry.rank} | ${entry.displayName} | ${entry.score.toLocaleString()} | ${entry.region} | ${entry.grade} | ${accuracy} |\n`;
    });
  }

  md += `\n---\n\n`;
  md += `## 📊 Estadísticas\n\n`;
  md += `- **Total Participantes**: ${data.totalParticipants}\n`;
  md += `- **Promedio de Puntaje**: ${data.metadata?.averageScore || 0}\n`;
  md += `- **Última Actualización**: ${data.lastUpdated}\n`;
  md += `\n---\n\n`;
  md += `## 🔄 Cómo participar\n\n`;
  md += `1. **Completa un examen** en [OpenIcfes](https://saberparatodos.com)\n`;
  md += `2. **Haz clic en "Enviar al Ranking"** en la pantalla de resultados\n`;
  md += `3. **Inicia sesión con GitHub** para crear el issue\n`;
  md += `4. **Tu puntaje será procesado** en los próximos 15 minutos\n\n`;
  md += `*Sistema IssueOps - 100% GitHub*\n`;

  writeFileSync(join(ROOT_DIR, 'LEADERBOARD.md'), md);
}

// Main Execution
async function main() {
  console.log('🔍 Checking for score submissions...');

  // Load and cleanup rate limits
  let rateLimits = loadRateLimits();
  rateLimits = cleanupRateLimits(rateLimits);

  try {
    // 1. Get Issues
    const issues = await githubRequest('/issues?labels=score-submission&state=open');
    console.log(`Found ${issues.length} issues.`);

    for (const issue of issues) {
      console.log(`Processing issue #${issue.number}...`);

      try {
        // 2. Parse
        const scoreData = parseIssueBody(issue.body);
        console.log('Parsed data:', scoreData);

        // 3. Check Rate Limits
        const rateLimitCheck = checkRateLimit(scoreData.anonymousId, rateLimits);

        if (!rateLimitCheck.allowed) {
          console.warn(`Rate limit exceeded for user ${scoreData.anonymousId}`);
          await githubRequest(`/issues/${issue.number}/comments`, 'POST', {
            body: `⚠️ **Rate Limit Exceeded**\n\n${rateLimitCheck.reason}\n\n_Este límite existe para prevenir abuso y asegurar fairness en el ranking._`
          });
          await githubRequest(`/issues/${issue.number}`, 'PATCH', {
            state: 'closed',
            state_reason: 'not_planned',
            labels: ['score-submission', 'rate-limited']
          });
          continue;
        }

        // 3.5 Validate Checksum (anti-cheat)
        const checksumResult = validateChecksum(scoreData);
        if (!checksumResult.valid) {
          console.warn(`Checksum validation failed for #${issue.number}: expected ${checksumResult.expected}, got ${checksumResult.provided}`);
          await githubRequest(`/issues/${issue.number}/comments`, 'POST', {
            body: `🛡️ **Checksum Validation Failed**\n\nEl checksum proporcionado no coincide con los datos del examen.\n\n_Esto puede indicar manipulación de datos. Si crees que esto es un error, contacta al equipo._`
          });
          await githubRequest(`/issues/${issue.number}`, 'PATCH', {
            state: 'closed',
            state_reason: 'not_planned',
            labels: ['score-submission', 'invalid-checksum']
          });
          continue;
        }

        if (checksumResult.legacy) {
          console.log(`Legacy submission without checksum for #${issue.number} - allowing with warning`);
        }

        // 4. Validate Score Data
        const errors = validateScore(scoreData);

        if (errors.length > 0) {
          console.error(`Validation failed for #${issue.number}:`, errors);
          await githubRequest(`/issues/${issue.number}/comments`, 'POST', {
            body: `❌ **Submission Rejected**\n\nErrors:\n${errors.map(e => `- ${e}`).join('\n')}`
          });
          await githubRequest(`/issues/${issue.number}`, 'PATCH', { state: 'closed', state_reason: 'not_planned' });
          continue;
        }

        // 5. Update Files
        updateLeaderboards(scoreData);

        // 6. Record submission for rate limiting
        rateLimits = recordSubmission(scoreData.anonymousId, rateLimits);

        // 7. Close Issue with success
        const remainingText = rateLimitCheck.remaining > 1
          ? `Te quedan **${rateLimitCheck.remaining - 1}** submissions hoy.`
          : `Has usado tu último submission del día.`;

        await githubRequest(`/issues/${issue.number}/comments`, 'POST', {
          body: `✅ **Score Accepted!**\n\nYou have been added to the leaderboard. 🎉\n\n${remainingText}`
        });
        await githubRequest(`/issues/${issue.number}`, 'PATCH', { state: 'closed', state_reason: 'completed' });

      } catch (err) {
        console.error(`Error processing #${issue.number}:`, err);
      }
    }

    // 8. Save rate limits
    saveRateLimits(rateLimits);

    // 9. Generate Markdown
    generateMarkdown();
    console.log('✨ Leaderboard updated successfully.');

  } catch (error) {
    console.error('Fatal error:', error);
    process.exit(1);
  }
}

main();
