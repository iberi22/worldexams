#!/usr/bin/env node

/**
 * Script para actualizar leaderboards via GitHub Actions
 *
 * Este script se ejecuta de dos formas:
 * 1. Con SUBMISSION_DATA: Procesa una nueva puntuación
 * 2. Sin datos: Mantenimiento periódico (reset de períodos, archivado)
 *
 * Variables de entorno:
 * - SUBMISSION_DATA: JSON con los datos de la puntuación
 * - ACTION_TYPE: 'submission' | 'maintenance'
 * - FORCE_RESET: '' | 'weekly' | 'monthly' | 'all'
 * - DRY_RUN: 'true' | 'false'
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Obtener directorio actual
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const LEADERBOARDS_DIR = join(ROOT_DIR, 'public', 'leaderboards');
const ARCHIVE_DIR = join(LEADERBOARDS_DIR, 'archive');

// ============================================================================
// TIPOS Y CONSTANTES
// ============================================================================

const PERIODS = ['weekly', 'monthly', 'semester-a', 'semester-b', 'annual', 'alltime'];

const PERIOD_FILES = {
  'weekly': 'leaderboard-weekly.json',
  'monthly': 'leaderboard-monthly.json',
  'semester-a': 'leaderboard-semester-a.json',
  'semester-b': 'leaderboard-semester-b.json',
  'annual': 'leaderboard-annual.json',
  'alltime': 'leaderboard-alltime.json'
};

// ============================================================================
// FUNCIONES DE UTILIDAD
// ============================================================================

function log(message, level = 'info') {
  const timestamp = new Date().toISOString();
  const prefix = {
    'info': '📘',
    'success': '✅',
    'warning': '⚠️',
    'error': '❌'
  }[level] || '📘';

  console.log(`${prefix} [${timestamp}] ${message}`);
}

function loadJSON(filepath) {
  try {
    const content = readFileSync(filepath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    log(`Error loading ${filepath}: ${error.message}`, 'error');
    return null;
  }
}

function saveJSON(filepath, data) {
  try {
    const dir = dirname(filepath);
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    writeFileSync(filepath, JSON.stringify(data, null, 2));
    log(`Saved ${filepath}`, 'success');
    return true;
  } catch (error) {
    log(`Error saving ${filepath}: ${error.message}`, 'error');
    return false;
  }
}

// ============================================================================
// FUNCIONES DE PERÍODO
// ============================================================================

function getWeekNumber(date) {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

function getWeekStart(date) {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

function getWeekEnd(date) {
  const d = getWeekStart(date);
  d.setDate(d.getDate() + 6);
  d.setHours(23, 59, 59, 999);
  return d;
}

function getMonthStart(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1, 0, 0, 0, 0);
}

function getMonthEnd(date) {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0, 23, 59, 59, 999);
}

function getSemesterInfo(date, calendar) {
  const month = date.getMonth();
  const year = date.getFullYear();

  if (calendar === 'A') {
    if (month >= 1 && month <= 5) {
      return {
        semester: 1,
        start: new Date(year, 1, 1),
        end: new Date(year, 5, 30, 23, 59, 59, 999)
      };
    } else if (month >= 6 && month <= 10) {
      return {
        semester: 2,
        start: new Date(year, 6, 1),
        end: new Date(year, 10, 30, 23, 59, 59, 999)
      };
    } else {
      return month === 11
        ? { semester: 2, start: new Date(year, 6, 1), end: new Date(year, 10, 30, 23, 59, 59, 999) }
        : { semester: 1, start: new Date(year, 1, 1), end: new Date(year, 5, 30, 23, 59, 59, 999) };
    }
  } else {
    if (month >= 8) {
      return {
        semester: 1,
        start: new Date(year, 8, 1),
        end: new Date(year, 11, 31, 23, 59, 59, 999)
      };
    } else if (month >= 0 && month <= 5) {
      return {
        semester: 2,
        start: new Date(year, 0, 1),
        end: new Date(year, 5, 30, 23, 59, 59, 999)
      };
    } else {
      return {
        semester: 1,
        start: new Date(year, 8, 1),
        end: new Date(year, 11, 31, 23, 59, 59, 999)
      };
    }
  }
}

function shouldResetPeriod(period, lastReset, now = new Date()) {
  const lastDate = new Date(lastReset);

  switch (period) {
    case 'weekly':
      return getWeekNumber(now) !== getWeekNumber(lastDate) ||
             now.getFullYear() !== lastDate.getFullYear();

    case 'monthly':
      return now.getMonth() !== lastDate.getMonth() ||
             now.getFullYear() !== lastDate.getFullYear();

    case 'semester-a': {
      const currentSem = getSemesterInfo(now, 'A');
      const lastSem = getSemesterInfo(lastDate, 'A');
      return currentSem.semester !== lastSem.semester ||
             now.getFullYear() !== lastDate.getFullYear();
    }

    case 'semester-b': {
      const currentSem = getSemesterInfo(now, 'B');
      const lastSem = getSemesterInfo(lastDate, 'B');
      return currentSem.semester !== lastSem.semester ||
             now.getFullYear() !== lastDate.getFullYear();
    }

    case 'annual':
      return now.getFullYear() !== lastDate.getFullYear();

    case 'alltime':
      return false;

    default:
      return false;
  }
}

function getPeriodDates(period, referenceDate = new Date()) {
  switch (period) {
    case 'weekly':
      return { start: getWeekStart(referenceDate), end: getWeekEnd(referenceDate) };
    case 'monthly':
      return { start: getMonthStart(referenceDate), end: getMonthEnd(referenceDate) };
    case 'semester-a':
      return getSemesterInfo(referenceDate, 'A');
    case 'semester-b':
      return getSemesterInfo(referenceDate, 'B');
    case 'annual':
      return {
        start: new Date(referenceDate.getFullYear(), 0, 1),
        end: new Date(referenceDate.getFullYear(), 11, 31, 23, 59, 59, 999)
      };
    case 'alltime':
      return {
        start: new Date(2025, 0, 1),
        end: new Date(2099, 11, 31, 23, 59, 59, 999)
      };
    default:
      return { start: new Date(), end: new Date() };
  }
}

// ============================================================================
// FUNCIONES DE LEADERBOARD
// ============================================================================

function createEmptyLeaderboard(period) {
  const { start, end } = getPeriodDates(period);

  return {
    version: '1.0',
    period,
    periodStart: start.toISOString(),
    periodEnd: end.toISOString(),
    lastUpdated: new Date().toISOString(),
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
}

function updateLeaderboardEntry(leaderboard, submission, maxEntries = 100) {
  const existingIndex = leaderboard.entries.findIndex(
    e => e.anonymousId === submission.anonymousId
  );

  if (existingIndex >= 0) {
    // Actualizar existente
    const existing = leaderboard.entries[existingIndex];
    existing.score += submission.score;
    existing.stats.questionsAnswered += submission.stats.questionsAnswered;
    existing.stats.examsCompleted = (existing.stats.examsCompleted || 0) + 1;
    existing.stats.longestStreak = Math.max(
      existing.stats.longestStreak || 0,
      submission.stats.longestStreak || 0
    );
    existing.stats.perfectScores = (existing.stats.perfectScores || 0) +
      (submission.stats.perfectScores || 0);

    // Recalcular promedios
    const totalAnswered = existing.stats.questionsAnswered;
    const newAnswered = submission.stats.questionsAnswered;
    const prevAnswered = totalAnswered - newAnswered;

    existing.stats.accuracy = (
      (existing.stats.accuracy * prevAnswered) +
      (submission.stats.accuracy * newAnswered)
    ) / totalAnswered;

    existing.stats.averageDifficulty = (
      (existing.stats.averageDifficulty * prevAnswered) +
      (submission.stats.averageDifficulty * newAnswered)
    ) / totalAnswered;

    existing.lastActive = submission.timestamp;

    log(`Updated existing entry for ${submission.anonymousId}`);
  } else {
    // Nueva entrada
    const newEntry = {
      rank: 0,
      anonymousId: submission.anonymousId,
      displayName: submission.displayName,
      score: submission.score,
      stats: {
        questionsAnswered: submission.stats.questionsAnswered,
        accuracy: submission.stats.accuracy,
        averageDifficulty: submission.stats.averageDifficulty,
        longestStreak: submission.stats.longestStreak || 0,
        examsCompleted: 1,
        perfectScores: submission.stats.perfectScores || 0
      },
      grade: submission.grade,
      region: submission.region,
      lastActive: submission.timestamp
    };

    leaderboard.entries.push(newEntry);
    leaderboard.totalParticipants++;

    log(`Added new entry for ${submission.anonymousId}`);
  }

  // Reordenar
  leaderboard.entries.sort((a, b) => b.score - a.score);
  leaderboard.entries = leaderboard.entries.slice(0, maxEntries);
  leaderboard.entries.forEach((entry, index) => {
    entry.rank = index + 1;
  });

  // Actualizar metadata
  updateLeaderboardMetadata(leaderboard);

  leaderboard.lastUpdated = new Date().toISOString();

  return leaderboard;
}

function updateLeaderboardMetadata(leaderboard) {
  if (leaderboard.entries.length === 0) return;

  const grades = {};
  const regions = {};
  let totalScore = 0;
  let totalAccuracy = 0;
  let totalExams = 0;

  for (const entry of leaderboard.entries) {
    grades[entry.grade] = (grades[entry.grade] || 0) + entry.score;
    regions[entry.region] = (regions[entry.region] || 0) + entry.score;
    totalScore += entry.score;
    totalAccuracy += entry.stats.accuracy;
    totalExams += entry.stats.examsCompleted || 1;
  }

  const sortedGrades = Object.entries(grades).sort((a, b) => b[1] - a[1]);
  const sortedRegions = Object.entries(regions).sort((a, b) => b[1] - a[1]);

  leaderboard.metadata = {
    topGrade: sortedGrades[0]?.[0] || '',
    topRegion: sortedRegions[0]?.[0] || '',
    averageScore: Math.round(totalScore / leaderboard.entries.length),
    averageAccuracy: totalAccuracy / leaderboard.entries.length,
    totalExamsCompleted: totalExams
  };
}

// ============================================================================
// VALIDACIÓN
// ============================================================================

function validateSubmission(submission) {
  const errors = [];

  // Campos requeridos
  if (!submission.anonymousId) errors.push('Missing anonymousId');
  if (!submission.displayName) errors.push('Missing displayName');
  if (typeof submission.score !== 'number') errors.push('Invalid score');
  if (!submission.stats) errors.push('Missing stats');
  if (!submission.grade) errors.push('Missing grade');
  if (!submission.region) errors.push('Missing region');
  if (!submission.timestamp) errors.push('Missing timestamp');

  // Validaciones de rango
  if (submission.score < 0) errors.push('Score cannot be negative');
  if (submission.score > 50000) errors.push('Score exceeds maximum possible');

  if (submission.stats) {
    if (submission.stats.accuracy < 0 || submission.stats.accuracy > 1) {
      errors.push('Invalid accuracy (must be 0-1)');
    }
    if (submission.stats.questionsAnswered < 1) {
      errors.push('Must answer at least 1 question');
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

// ============================================================================
// ARCHIVADO
// ============================================================================

function archiveLeaderboard(leaderboard, period) {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const week = String(getWeekNumber(now)).padStart(2, '0');

  let archivePath;
  let filename;

  switch (period) {
    case 'weekly':
      archivePath = join(ARCHIVE_DIR, String(year), 'weekly');
      filename = `week-${week}.json`;
      break;
    case 'monthly':
      archivePath = join(ARCHIVE_DIR, String(year), 'monthly');
      filename = `${month}.json`;
      break;
    default:
      return; // No archivar otros períodos
  }

  if (!existsSync(archivePath)) {
    mkdirSync(archivePath, { recursive: true });
  }

  const archiveFile = join(archivePath, filename);

  // Solo archivar si hay datos
  if (leaderboard.entries.length > 0) {
    saveJSON(archiveFile, {
      ...leaderboard,
      archivedAt: new Date().toISOString()
    });
    log(`Archived ${period} leaderboard to ${archiveFile}`, 'success');
  }
}

// ============================================================================
// FUNCIONES PRINCIPALES
// ============================================================================

async function processSubmission(submissionData) {
  log('Processing score submission...');

  // Validar
  const validation = validateSubmission(submissionData);
  if (!validation.isValid) {
    log(`Invalid submission: ${validation.errors.join(', ')}`, 'error');
    return false;
  }

  log(`Valid submission from ${submissionData.anonymousId}`);

  // Cargar config
  const config = loadJSON(join(LEADERBOARDS_DIR, 'config.json'));
  if (!config) {
    log('Could not load config', 'error');
    return false;
  }

  // Actualizar cada período activo
  for (const period of PERIODS) {
    if (!config.periods[period]?.enabled) continue;

    const filepath = join(LEADERBOARDS_DIR, PERIOD_FILES[period]);
    let leaderboard = loadJSON(filepath);

    if (!leaderboard) {
      leaderboard = createEmptyLeaderboard(period);
    }

    // Verificar si necesita reset
    if (shouldResetPeriod(period, leaderboard.periodStart)) {
      log(`Resetting ${period} leaderboard (period ended)`, 'warning');
      archiveLeaderboard(leaderboard, period);
      leaderboard = createEmptyLeaderboard(period);
    }

    // Actualizar
    const maxEntries = config.periods[period]?.topN || 100;
    updateLeaderboardEntry(leaderboard, submissionData, maxEntries);

    // Guardar
    saveJSON(filepath, leaderboard);
  }

  log('Score submission processed successfully', 'success');
  return true;
}

async function performMaintenance(forceReset = '') {
  log('Performing maintenance...');

  const config = loadJSON(join(LEADERBOARDS_DIR, 'config.json'));
  if (!config) {
    log('Could not load config', 'error');
    return false;
  }

  for (const period of PERIODS) {
    if (!config.periods[period]?.enabled) continue;

    const filepath = join(LEADERBOARDS_DIR, PERIOD_FILES[period]);
    let leaderboard = loadJSON(filepath);

    if (!leaderboard) {
      leaderboard = createEmptyLeaderboard(period);
      saveJSON(filepath, leaderboard);
      continue;
    }

    // Verificar reset forzado
    const shouldForce = forceReset === 'all' || forceReset === period;

    // Verificar si necesita reset natural
    if (shouldForce || shouldResetPeriod(period, leaderboard.periodStart)) {
      log(`Resetting ${period} leaderboard`, 'warning');
      archiveLeaderboard(leaderboard, period);
      leaderboard = createEmptyLeaderboard(period);
      saveJSON(filepath, leaderboard);
    } else {
      log(`${period} leaderboard is up to date`);
    }
  }

  log('Maintenance completed', 'success');
  return true;
}

// ============================================================================
// MAIN
// ============================================================================

async function main() {
  const actionType = process.env.ACTION_TYPE || 'maintenance';
  const dryRun = process.env.DRY_RUN === 'true';

  log(`Starting leaderboard update (action: ${actionType}, dryRun: ${dryRun})`);

  if (dryRun) {
    log('DRY RUN MODE - No changes will be saved', 'warning');
  }

  try {
    if (actionType === 'submission') {
      const submissionData = process.env.SUBMISSION_DATA;

      if (!submissionData) {
        log('No submission data provided', 'error');
        process.exit(1);
      }

      const data = JSON.parse(submissionData);

      if (!dryRun) {
        await processSubmission(data);
      } else {
        log('Would process submission for: ' + data.anonymousId);
      }
    } else {
      const forceReset = process.env.FORCE_RESET || '';

      if (!dryRun) {
        await performMaintenance(forceReset);
      } else {
        log('Would perform maintenance' + (forceReset ? ` with force reset: ${forceReset}` : ''));
      }
    }

    log('Leaderboard update completed', 'success');
    process.exit(0);
  } catch (error) {
    log(`Fatal error: ${error.message}`, 'error');
    console.error(error.stack);
    process.exit(1);
  }
}

main();
