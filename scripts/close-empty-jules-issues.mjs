import { execSync } from 'child_process';

const issues = JSON.parse(
  execSync('gh issue list --label jules --json number,body,title --limit 200', { encoding: 'utf8' })
);

const emptyBody = issues.filter(i => !i.body || i.body.trim() === '');
console.log(`Issues sin body a cerrar: ${emptyBody.length}`);

for (const issue of emptyBody) {
  try {
    execSync(
      `gh issue close ${issue.number} --comment "Cerrando automaticamente: este issue fue creado por Jules sin template ni body. Los issues actuales con template completo (KPI-2000, REPLACE, RETRY) tienen prioridad."`,
      { encoding: 'utf8', timeout: 15000 }
    );
    console.log(`✅ Cerrado #${issue.number}: ${issue.title.substring(0, 60)}`);
  } catch (e) {
    console.log(`❌ Error #${issue.number}: ${e.message.substring(0, 80)}`);
  }
}

console.log(`\n✅ Total cerrados: ${emptyBody.length}`);
