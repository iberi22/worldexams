import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { issues } from './prepare-wave5-issues.mjs';

console.log(`Starting creation of ${issues.length} parallel issues for Jules...`);

const created = [];

for (const iss of issues) {
  const filePath = path.join('.hermes', 'wave5', `${iss.id}.md`);
  console.log(`Creating: ${iss.title}...`);
  try {
    const cmd = `gh issue create --title "${iss.title.replace(/"/g, '\\"')}" --body-file "${filePath}" --label "jules" --repo iberi22/worldexams`;
    const output = execSync(cmd, { encoding: 'utf8' }).trim();
    console.log(`Created: ${output}`);
    created.push({ id: iss.id, title: iss.title, url: output });
  } catch (err) {
    console.error(`Failed to create ${iss.id}:`, err.message);
  }
}

console.log('\n--- Summary of Created Issues ---');
console.log(JSON.stringify(created, null, 2));
fs.writeFileSync('.hermes/wave5/created-issues.json', JSON.stringify(created, null, 2), 'utf8');
