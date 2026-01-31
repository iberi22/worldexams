
const fs = require('fs');
const path = require('path');

const questionsDir = path.join(__dirname, '../src/content/questions');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(file));
    } else {
      if (file.endsWith('.md')) {
        results.push(file);
      }
    }
  });
  return results;
}

function checkTags() {
  console.log('Scanning for period tags in: ' + questionsDir);
  if (!fs.existsSync(questionsDir)) {
      console.log('Questions directory not found!');
      return;
  }

  const files = getFiles(questionsDir);
  let totalFiles = 0;
  let taggedFiles = 0;
  let foundTags = {};

  files.forEach(file => {
    totalFiles++;
    const content = fs.readFileSync(file, 'utf8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

    if (frontmatterMatch) {
      const frontmatter = frontmatterMatch[1];
      const lines = frontmatter.split('\n');
      let hasPeriodTag = false;

      lines.forEach(line => {
        const key = line.split(':')[0].trim().toLowerCase();
        if (['periodo', 'period', 'bimestre', 'trimestre'].includes(key)) {
            hasPeriodTag = true;
            if (!foundTags[key]) foundTags[key] = 0;
            foundTags[key]++;
        }
      });

      if (hasPeriodTag) {
        taggedFiles++;
        console.log(`Found period tag in: ${path.relative(questionsDir, file)}`);
      }
    }
  });

  console.log('--------------------------------------------------');
  console.log(`Total Question Bundles Scanned: ${totalFiles}`);
  console.log(`Files with Period Tags: ${taggedFiles}`);
  if (Object.keys(foundTags).length > 0) {
      console.log('Tags breakdown:');
      console.log(JSON.stringify(foundTags, null, 2));
  } else {
      console.log('No period tags found (periodo, period, bimestre, trimestre).');
  }
  console.log('--------------------------------------------------');
}

checkTags();
