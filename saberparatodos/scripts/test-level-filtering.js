/**
 * 🧪 Test Script: Level-Based Question Filtering Feature
 *
 * This script emulates the level-based filtering logic to verify it works correctly.
 * Run with: node scripts/test-level-filtering.js
 */

// ═══════════════════════════════════════════════════════════════════════════
// 1. SIMULATED FUNCTIONS (Copy of production logic)
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Maps CEFR level number to matching school grades
 */
function getGradesForCEFRLevel(levelNum, tolerance = 1) {
  const levelToGrades = {
    1: [3, 5],      // A1
    2: [3, 5],      // A1+
    3: [5, 6],      // A2
    4: [6, 7],      // A2+
    5: [7, 8],      // B1
    6: [8, 9],      // B1+
    7: [9, 10],     // B2
    8: [10, 11],    // B2+
    9: [11]         // C1+
  };

  const matchingGrades = new Set();
  for (let l = Math.max(1, levelNum - tolerance); l <= Math.min(9, levelNum + tolerance); l++) {
    (levelToGrades[l] || []).forEach(g => matchingGrades.add(g));
  }
  return Array.from(matchingGrades).sort((a, b) => a - b);
}

/**
 * Simulates the weighted question selection logic
 */
function simulateWeightedSelection(questions, savedLevel, limit) {
  if (!savedLevel || savedLevel.confidence < 60 || limit <= 0) {
    console.log('❌ Level-based filtering NOT active (no level or low confidence)');
    // Standard shuffle and limit
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, limit);
  }

  console.log(`\n🎯 Level-based filtering active: ${savedLevel.level} (${savedLevel.confidence}% confidence)`);

  const matchingGrades = getGradesForCEFRLevel(savedLevel.levelNum, 1);
  console.log(`📊 Matching grades for ${savedLevel.level}: [${matchingGrades.join(', ')}]`);

  // Split questions
  const matchingQuestions = questions.filter(q => matchingGrades.includes(q.grade));
  const otherQuestions = questions.filter(q => !matchingGrades.includes(q.grade));

  console.log(`   - Questions at matching grades: ${matchingQuestions.length}`);
  console.log(`   - Questions at other grades: ${otherQuestions.length}`);

  // Weighted selection: 60% from matching, 40% from others
  const matchingCount = Math.min(Math.ceil(limit * 0.6), matchingQuestions.length);
  const otherCount = Math.min(limit - matchingCount, otherQuestions.length);

  const shuffledMatching = [...matchingQuestions].sort(() => Math.random() - 0.5);
  const shuffledOthers = [...otherQuestions].sort(() => Math.random() - 0.5);

  const selected = [
    ...shuffledMatching.slice(0, matchingCount),
    ...shuffledOthers.slice(0, otherCount)
  ].sort(() => Math.random() - 0.5);

  console.log(`✅ Weighted selection: ${matchingCount} matching + ${otherCount} challenge = ${selected.length} total`);

  return selected;
}

// ═══════════════════════════════════════════════════════════════════════════
// 2. TEST DATA
// ═══════════════════════════════════════════════════════════════════════════

// Simulate a pool of 100 questions across all grades
function generateMockQuestions(count = 100) {
  const grades = [3, 5, 6, 7, 8, 9, 10, 11];
  const questions = [];

  for (let i = 0; i < count; i++) {
    const grade = grades[i % grades.length]; // Distribute evenly
    questions.push({
      id: `Q-${i + 1}`,
      grade: grade,
      text: `Question ${i + 1} from Grade ${grade}`,
      englishLevel: getLevelForGrade(grade)
    });
  }

  return questions;
}

function getLevelForGrade(grade) {
  const map = { 3: 'A1', 5: 'A1+', 6: 'A2', 7: 'A2+', 8: 'B1', 9: 'B1+', 10: 'B2', 11: 'B2+' };
  return map[grade] || 'Unknown';
}

// ═══════════════════════════════════════════════════════════════════════════
// 3. TEST CASES
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Simulates getSavedEnglishProficiencyLevel with expiration check
 */
function mockGetSavedLevel(savedLevel) {
  if (!savedLevel) return null;

  // Check for expiration (30 days)
  if (savedLevel.diagnosedAt) {
    const daysSinceDiagnosis = (Date.now() - new Date(savedLevel.diagnosedAt).getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceDiagnosis > 30) {
      console.log(`⚠️ Saved level expired (${Math.round(daysSinceDiagnosis)} days old), will re-diagnose`);
      return null;
    }
  }

  return savedLevel;
}

function runTests() {
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('🧪 TEST: Level-Based Question Filtering (v2 - with improvements)');
  console.log('═══════════════════════════════════════════════════════════════\n');

  const questions = generateMockQuestions(100);
  const limit = 30;

  // Test 1: No saved level (new user)
  console.log('\n📋 TEST 1: New user (no diagnosis)');
  console.log('─'.repeat(60));
  const test1 = simulateWeightedSelection(questions, null, limit);
  analyzeDistribution(test1, 'Test 1');

  // Test 2: Low confidence (not enough questions answered)
  console.log('\n\n📋 TEST 2: Low confidence (45%)');
  console.log('─'.repeat(60));
  const lowConfidence = { level: 'B1', levelNum: 5, confidence: 45 };
  const test2 = simulateWeightedSelection(questions, lowConfidence, limit);
  analyzeDistribution(test2, 'Test 2');

  // Test 3: B1 level with good confidence
  console.log('\n\n📋 TEST 3: B1 user with 75% confidence');
  console.log('─'.repeat(60));
  const b1User = { level: 'B1', levelNum: 5, confidence: 75 };
  const test3 = simulateWeightedSelection(questions, b1User, limit);
  analyzeDistribution(test3, 'Test 3');

  // Test 4: A2 level (beginner)
  console.log('\n\n📋 TEST 4: A2 beginner with 80% confidence');
  console.log('─'.repeat(60));
  const a2User = { level: 'A2', levelNum: 3, confidence: 80 };
  const test4 = simulateWeightedSelection(questions, a2User, limit);
  analyzeDistribution(test4, 'Test 4');

  // Test 5: B2+ advanced user
  console.log('\n\n📋 TEST 5: B2+ advanced user with 92% confidence');
  console.log('─'.repeat(60));
  const b2User = { level: 'B2+', levelNum: 8, confidence: 92 };
  const test5 = simulateWeightedSelection(questions, b2User, limit);
  analyzeDistribution(test5, 'Test 5');

  console.log('\n═══════════════════════════════════════════════════════════════');
  console.log('✅ ALL TESTS COMPLETED');
  console.log('═══════════════════════════════════════════════════════════════\n');
}

function analyzeDistribution(questions, testName) {
  const distribution = {};
  questions.forEach(q => {
    const key = `Grade ${q.grade} (${q.englishLevel})`;
    distribution[key] = (distribution[key] || 0) + 1;
  });

  console.log(`\n📊 ${testName} - Distribution (${questions.length} questions):`);
  Object.entries(distribution)
    .sort((a, b) => parseInt(a[0].match(/\d+/)[0]) - parseInt(b[0].match(/\d+/)[0]))
    .forEach(([key, count]) => {
      const bar = '█'.repeat(count);
      const pct = ((count / questions.length) * 100).toFixed(0);
      console.log(`   ${key.padEnd(20)} ${bar} ${count} (${pct}%)`);
    });
}

// Run the tests
runTests();
