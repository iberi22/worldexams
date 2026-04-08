/**
 * Bundle Audit Script - Complete audit of all question bundles
 * 
 * Usage: node scripts/audit-bundles.ts
 * 
 * This script:
 * 1. Scans all bundles in questions_data/colombia
 * 2. Classifies them by format (MASTERY vs BASIC)
 * 3. Checks question count
 * 4. Checks period segregation
 * 5. Generates comprehensive report
 */

import * as fs from 'fs';
import * as path from 'path';

interface BundleInfo {
  path: string;
  relativePath: string;
  format: 'MASTERY' | 'BASIC' | 'UNKNOWN';
  id: string;
  grado: number;
  asignatura: string;
  tema: string;
  periodo?: number;
  expectedQuestions: number;
  actualQuestions: number;
  hasPeriodSegregation: boolean;
  frontmatterValid: boolean;
  issues: string[];
  status: 'OK' | 'NEEDS_MIGRATION' | 'ERROR';
}

// Simple frontmatter parser without external deps
function parseFrontmatter(content: string): Record<string, string | number> {
  const result: Record<string, string | number> = {};
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return result;
  
  const lines = match[1].split('\n');
  for (const line of lines) {
    // Match: key: value (with or without quotes)
    const keyMatch = line.match(/^(\w+):\s*(.+)$/);
    if (keyMatch) {
      let value = keyMatch[2].trim();
      // Remove quotes
      value = value.replace(/^["']|["']$/g, '');
      // Try to parse as number
      const num = parseInt(value);
      result[keyMatch[1]] = isNaN(num) ? value : num;
    }
  }
  
  return result;
}

// Count actual questions in bundle content
function countQuestions(content: string): number {
  // MASTERY format: "## Question N"
  // BASIC format: "## Pregunta N"
  const questionMatches = content.match(/##\s+(Question|Pregunta)\s+\d+/gi);
  return questionMatches ? questionMatches.length : 0;
}

// Detect format from path and frontmatter
function detectFormat(filePath: string, fm: Record<string, string | number>): 'MASTERY' | 'BASIC' | 'UNKNOWN' {
  const fileName = path.basename(filePath);
  
  // Check for MASTERY in filename
  if (fileName.includes('MASTERY')) return 'MASTERY';
  
  // Check protocol_version (MASTERY uses 5.1)
  if (fm.protocol_version === '5.1') return 'MASTERY';
  
  // Check bundle_size (MASTERY uses 20)
  if (fm.bundle_size === 20) return 'MASTERY';
  
  // Check total_questions < 20 indicates BASIC
  if (fm.total_questions && (fm.total_questions as number) < 20) return 'BASIC';
  
  // Check path structure for periods (MASTERY has periodo-N folders)
  if (filePath.includes('periodo-')) return 'MASTERY';
  
  // BASIC bundles are in grado folders without periodo
  if (filePath.includes('grado-3') || filePath.includes('grado-4') || 
      filePath.includes('grado-5') || filePath.includes('grado-6') ||
      filePath.includes('grado-7') || filePath.includes('grado-8')) {
    return 'BASIC';
  }
  
  // Grado 9 might be transitional
  if (filePath.includes('grado-9')) {
    return 'BASIC';
  }
  
  // Grado 11 should be MASTERY
  if (filePath.includes('grado-11')) {
    return 'MASTERY';
  }
  
  // Preuniversitario is special
  if (filePath.includes('preuniversitario')) {
    return fileName.includes('MASTERY') ? 'MASTERY' : 'BASIC';
  }
  
  return 'UNKNOWN';
}

// Extract grade from path
function extractGrade(filePath: string): number {
  const match = filePath.match(/[\\/]grado-(\d+)[\\/]/);
  return match ? parseInt(match[1]) : 0;
}

// Extract subject from path
function extractSubject(filePath: string): string {
  const parts = filePath.split(path.sep);
  // Find the subject folder (after country)
  const idx = parts.findIndex(p => p === 'colombia');
  if (idx >= 0 && idx + 1 < parts.length) {
    return parts[idx + 1];
  }
  return '';
}

// Check if bundle has proper period segregation
function hasPeriodSegregation(filePath: string, fm: Record<string, string | number>): boolean {
  // MASTERY bundles in periodo-N folders ARE period segregated
  if (filePath.includes('periodo-')) {
    return true;
  }
  
  // BASIC bundles in grado-N folders without periodo are NOT period segregated
  if (!filePath.includes('periodo-') && fm.periodo === undefined) {
    return false;
  }
  
  // Check frontmatter periodo
  if (fm.periodo !== undefined) {
    return true;
  }
  
  return false;
}

// Main audit function
async function audit(): Promise<void> {
  console.log('🔍 Starting WorldExams Bundle Audit...\n');
  
  const basePath = 'E:\\scripts-python\\worldexams\\questions_data\\colombia';
  const bundles: BundleInfo[] = [];
  
  // Find all markdown files recursively
  function scanDir(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.name.endsWith('.md') && entry.name !== 'README.md') {
        const info = analyzeBundle(fullPath);
        bundles.push(info);
      }
    }
  }
  
  function analyzeBundle(filePath: string): BundleInfo {
    const relativePath = filePath.replace('E:\\scripts-python\\worldexams\\questions_data\\colombia\\', '');
    
    let content = '';
    try {
      content = fs.readFileSync(filePath, 'utf-8');
    } catch {
      return {
        path: filePath,
        relativePath,
        format: 'UNKNOWN',
        id: 'ERROR',
        grado: 0,
        asignatura: '',
        tema: '',
        actualQuestions: 0,
        expectedQuestions: 0,
        hasPeriodSegregation: false,
        frontmatterValid: false,
        issues: ['Could not read file'],
        status: 'ERROR'
      };
    }
    
    const fm = parseFrontmatter(content);
    const format = detectFormat(filePath, fm);
    const actualQuestions = countQuestions(content);
    const grado = extractGrade(filePath);
    const asignatura = extractSubject(filePath);
    const hasPeriod = hasPeriodSegregation(filePath, fm);
    
    const issues: string[] = [];
    
    // Check frontmatter validity
    if (!fm.id) {
      issues.push('Missing id in frontmatter');
    }
    
    // Check question count based on format
    let expectedQuestions = 20;
    if (format === 'MASTERY') {
      expectedQuestions = (fm.bundle_size as number) || 20;
      if (actualQuestions !== expectedQuestions) {
        issues.push(`Expected ${expectedQuestions} questions, found ${actualQuestions}`);
      }
      if (!hasPeriod && grado !== 3 && grado !== 4 && grado !== 5) {
        // Grado 3-5 don't need periods typically
        issues.push('MASTERY bundle missing period segregation');
      }
    } else if (format === 'BASIC') {
      expectedQuestions = (fm.total_questions as number) || actualQuestions;
      if (expectedQuestions < 20) {
        issues.push(`BASIC bundle has only ${expectedQuestions} questions, should have 20`);
      }
      if (hasPeriod) {
        issues.push('BASIC bundle should NOT have period segregation');
      } else {
        issues.push('BASIC bundle needs migration to MASTERY format with period segregation');
      }
    }
    
    // Determine status
    let status: BundleInfo['status'] = 'OK';
    if (issues.length > 0) {
      if (format === 'BASIC' || issues.some(i => i.includes('periodo') || i.includes('20'))) {
        status = 'NEEDS_MIGRATION';
      } else {
        status = 'ERROR';
      }
    }
    
    return {
      path: filePath,
      relativePath,
      format,
      id: (fm.id as string) || 'UNKNOWN',
      grado,
      asignatura,
      tema: (fm.tema as string) || '',
      periodo: fm.periodo as number,
      actualQuestions,
      expectedQuestions,
      hasPeriodSegregation: hasPeriod,
      frontmatterValid: !!fm.id,
      issues,
      status
    };
  }
  
  scanDir(basePath);
  
  // Generate summary statistics
  const byFormat = { MASTERY: 0, BASIC: 0, UNKNOWN: 0 };
  const byStatus = { OK: 0, NEEDS_MIGRATION: 0, ERROR: 0 };
  const byGrade: Record<number, number> = {};
  const byAsignatura: Record<string, number> = {};
  
  for (const bundle of bundles) {
    byFormat[bundle.format]++;
    byStatus[bundle.status]++;
    byGrade[bundle.grado] = (byGrade[bundle.grado] || 0) + 1;
    byAsignatura[bundle.asignatura] = (byAsignatura[bundle.asignatura] || 0) + 1;
  }
  
  const needsMigration = bundles.filter(b => b.status === 'NEEDS_MIGRATION');
  const totalQuestions = bundles.reduce((sum, b) => sum + b.actualQuestions, 0);
  
  // Print summary
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('📊 AUDIT SUMMARY - WorldExams Bundle Inventory');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  console.log(`📁 Total Bundles: ${bundles.length}`);
  console.log(`❓ Total Questions: ${totalQuestions}`);
  console.log('');
  
  console.log('📋 By Format:');
  console.log(`   ✅ MASTERY (20 preg, period): ${byFormat.MASTERY}`);
  console.log(`   ⚠️  BASIC (7 preg, no period): ${byFormat.BASIC}`);
  console.log(`   ❓ UNKNOWN: ${byFormat.UNKNOWN}`);
  console.log('');
  
  console.log('📋 By Status:');
  console.log(`   ✅ OK: ${byStatus.OK}`);
  console.log(`   🔄 NEEDS_MIGRATION: ${byStatus.NEEDS_MIGRATION}`);
  console.log(`   ❌ ERROR: ${byStatus.ERROR}`);
  console.log('');
  
  console.log('📋 By Grade:');
  for (const [grade, count] of Object.entries(byGrade).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
    const gradeNum = parseInt(grade);
    const format = bundles.find(b => b.grado === gradeNum)?.format || '?';
    console.log(`   Grado ${grade}: ${count} bundles [${format}]`);
  }
  console.log('');
  
  console.log('📋 By Subject:');
  for (const [asignatura, count] of Object.entries(byAsignatura).sort()) {
    console.log(`   ${asignatura}: ${count} bundles`);
  }
  console.log('');
  
  console.log('═══════════════════════════════════════════════════════════════');
  console.log('⚠️  MIGRATION REQUIRED');
  console.log('═══════════════════════════════════════════════════════════════\n');
  
  if (needsMigration.length > 0) {
    console.log(`📋 ${needsMigration.length} bundles need migration to MASTERY format:\n`);
    
    // Group by grade
    const byGradeMigration: Record<number, BundleInfo[]> = {};
    for (const bundle of needsMigration) {
      if (!byGradeMigration[bundle.grado]) byGradeMigration[bundle.grado] = [];
      byGradeMigration[bundle.grado].push(bundle);
    }
    
    for (const [grade, gradeBundles] of Object.entries(byGradeMigration).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
      console.log(`   Grado ${grade} (${gradeBundles.length} bundles):`);
      
      // Group by subject within grade
      const bySubject: Record<string, BundleInfo[]> = {};
      for (const bundle of gradeBundles) {
        if (!bySubject[bundle.asignatura]) bySubject[bundle.asignatura] = [];
        bySubject[bundle.asignatura].push(bundle);
      }
      
      for (const [subject, subjectBundles] of Object.entries(bySubject)) {
        const questionsTotal = subjectBundles.reduce((sum, b) => sum + b.actualQuestions, 0);
        const expectedTotal = subjectBundles.length * 20;
        console.log(`      ${subject}: ${subjectBundles.length} bundles, ${questionsTotal}/${expectedTotal} questions`);
      }
      console.log('');
    }
  }
  
  // Save detailed report
  const outputDir = 'E:\\scripts-python\\worldexams\\.worldexams\\audit';
  try {
    fs.mkdirSync(outputDir, { recursive: true });
  } catch {}
  
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
  
  // Save JSON report
  const reportJson = JSON.stringify({
    generated: new Date().toISOString(),
    totalBundles: bundles.length,
    totalQuestions,
    byFormat,
    byStatus,
    byGrade,
    byAsignatura,
    bundlesNeedingMigration: needsMigration.map(b => ({
      path: b.relativePath,
      format: b.format,
      grado: b.grado,
      subject: b.asignatura,
      questions: b.actualQuestions,
      expected: b.expectedQuestions,
      hasPeriod: b.hasPeriodSegregation,
      issues: b.issues
    }))
  }, null, 2);
  
  fs.writeFileSync(
    path.join(outputDir, `audit-${timestamp}.json`),
    reportJson
  );
  
  // Save markdown summary
  let md = `# WorldExams Bundle Audit\n\n`;
  md += `**Generated:** ${new Date().toISOString()}\n\n`;
  md += `## Summary\n\n`;
  md += `| Metric | Value |\n|--------|-------|\n`;
  md += `| Total Bundles | ${bundles.length} |\n`;
  md += `| Total Questions | ${totalQuestions} |\n`;
  md += `| MASTERY Format | ${byFormat.MASTERY} |\n`;
  md += `| BASIC Format | ${byFormat.BASIC} |\n`;
  md += `| Needs Migration | ${needsMigration.length} |\n\n`;
  
  md += `## By Grade\n\n`;
  md += `| Grade | Count | Format |\n|-------|-------|--------|\n`;
  for (const [grade, count] of Object.entries(byGrade).sort((a, b) => parseInt(a[0]) - parseInt(b[0]))) {
    const format = bundles.find(b => b.grado === parseInt(grade))?.format || '?';
    md += `| ${grade} | ${count} | ${format} |\n`;
  }
  md += `\n`;
  
  md += `## Migration Plan\n\n`;
  md += `**${needsMigration.length} bundles need migration to MASTERY format**\n\n`;
  
  md += `### Priority: Grade 11 (ICFES)\n\n`;
  md += `Grade 11 is the most important as it aligns with ICFES Saber 11 exam.\n\n`;
  
  // Add migration details
  md += `### Action Items:\n\n`;
  md += `1. **Grade 3, 4, 5** (${bundles.filter(b => [3,4,5].includes(b.grado) && b.format === 'BASIC').length} bundles): Keep BASIC format, increase to 20 questions each\n`;
  md += `2. **Grade 6, 7, 8, 9** (${bundles.filter(b => [6,7,8,9].includes(b.grado) && b.format === 'BASIC').length} bundles): Migrate to MASTERY with period segregation\n`;
  md += `3. **Grade 11** (${bundles.filter(b => b.grado === 11 && b.format === 'BASIC').length} bundles): All should be MASTERY - verify and fix\n`;
  md += `\n`;
  
  fs.writeFileSync(
    path.join(outputDir, `audit-${timestamp}.md`),
    md
  );
  
  console.log(`\n📄 Reports saved to: ${outputDir}`);
  console.log(`   - audit-${timestamp}.json`);
  console.log(`   - audit-${timestamp}.md`);
  
  // Return exit code based on migration needs
  process.exit(needsMigration.length > 0 ? 1 : 0);
}

// Run audit
audit().catch(err => {
  console.error('Audit failed:', err);
  process.exit(1);
});
