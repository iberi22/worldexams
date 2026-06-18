import { execSync } from 'child_process';

// Get all issues with label jules
const raw = execSync('gh issue list --label jules --json number,body,title --limit 200', {
  encoding: 'utf8',
  timeout: 30000
});

const issues = JSON.parse(raw);
console.log(`Total issues with label jules: ${issues.length}`);

const emptyBody = issues.filter(i => {
  const body = (i.body || '').trim();
  return body === '' || body === 'null';
});

console.log(`Issues sin body: ${emptyBody.length}`);

for (const issue of emptyBody) {
  try {
    execSync(
      `gh issue close ${issue.number} --comment "Cerrando: issue creado por Jules sin template ni body. Se usa template completo en los nuevos issues."`,
      { encoding: 'utf8', timeout: 15000 }
    );
    console.log(`✅ Cerrado #${issue.number}`);
  } catch (e) {
    console.log(`❌ Error #${issue.number}: ${e.message.substring(0, 80)}`);
  }
}

console.log('\n✅ Proceso completado.');
