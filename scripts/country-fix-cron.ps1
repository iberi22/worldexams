"""
GitHub Country-Multi Issue Fixer
Ejecuta un Codex agent para arreglar un issue country-multi cada vez que corre.
Designed for Task Scheduler (Windows) - cada 20 minutos.
"""
import subprocess
import json
import os
import sys
from pathlib import Path

REPO = "iberi22/worldexams"
AGENT_DIR = r"E:\scripts-python\worldexams\saberparatodos"
LABEL = "country-multi"
TASK_FILE = r"E:\scripts-python\worldexams\.worldexams\country-fix-log.json"


def run(cmd):
    """Run a command and return output."""
    result = subprocess.run(
        cmd, shell=True, capture_output=True, text=True, 
        cwd=r"E:\scripts-python\worldexams"
    )
    return result.stdout.strip(), result.stderr.strip(), result.returncode


def get_open_issues():
    """Get open country-multi issues that are not assigned."""
    cmd = f'gh issue list --repo {REPO} --label {LABEL} --state open --json number,title,assignees --limit 20'
    stdout, stderr, code = run(cmd)
    if code != 0:
        print(f"Error listing issues: {stderr}")
        return []
    try:
        issues = json.loads(stdout)
        # Filter unassigned
        return [i for i in issues if len(i.get('assignees', [])) == 0]
    except json.JSONDecodeError:
        print(f"Failed to parse issues: {stdout}")
        return []


def assign_issue(issue_number):
    """Assign the issue to 'app' bot to prevent others from picking it."""
    # Use the repo's bot or leave it for tracking
    # For now, just return True to indicate picked
    return True


def get_issue_details(issue_number):
    """Get full issue body and labels."""
    cmd = f'gh issue view {issue_number} --repo {REPO} --json body,labels,title'
    stdout, _, code = run(cmd)
    if code != 0:
        return None
    try:
        return json.loads(stdout)
    except json.JSONDecodeError:
        return None


def create_fix_script(issue_number, title, body, labels):
    """Create a PowerShell script that runs Codex to fix this issue."""
    # Extract key info for the prompt
    prompt = f"""You are fixing GitHub issue #{issue_number}: {title}

## Problem Description
{body[:3000]}

## Your Task
1. Analyze the files mentioned in the issue
2. Make the code changes needed to fix the country-awareness bug
3. Build the project to verify: cd E:\\scripts-python\\worldexams\\saberparatodos && npm run build
4. If build fails, fix the errors
5. Commit with a descriptive message: git add . && git commit -m "fix(country): {title[:60]}" --no-verify
6. Push: git push origin fix/issue-254-validate-bundles-before-completion
7. Close the issue: gh issue close {issue_number} --repo {REPO} --comment "Fixed in commit. Thanks!"

## Important Rules
- Do NOT use --no-verify unless pre-commit hooks fail on pre-existing secrets
- If build fails, read the errors and fix them
- Use the country config from: E:\\scripts-python\\worldexams\\config\\countries.config.ts
- Always use Astro.locals.country for runtime country detection
- Work in: E:\\scripts-python\\worldexams\\saberparatodos
"""
    return prompt


def save_progress(issue_number, status):
    """Save progress to track which issue is being worked on."""
    data = {"current_issue": issue_number, "status": status, "timestamp": str(Path(__file__).stat().st_mtime)}
    with open(TASK_FILE, 'w') as f:
        json.dump(data, f)


def main():
    print("=== Country-Multi Issue Fixer ===")
    
    # Check if already working on something
    if Path(TASK_FILE).exists():
        with open(TASK_FILE) as f:
            state = json.load(f)
        if state.get("status") == "working":
            print(f"Already working on issue #{state.get('current_issue')}, skipping.")
            return
    
    issues = get_open_issues()
    if not issues:
        print("No open unassigned country-multi issues found.")
        return
    
    # Pick the first unassigned issue
    issue = issues[0]
    issue_number = issue['number']
    title = issue['title']
    
    print(f"Picking issue #{issue_number}: {title}")
    save_progress(issue_number, "working")
    
    # Get full issue details
    details = get_issue_details(issue_number)
    if not details:
        print(f"Failed to get details for issue #{issue_number}")
        save_progress(issue_number, "error")
        return
    
    # Create the prompt for Codex
    prompt = create_fix_script(issue_number, title, details.get('body', ''), details.get('labels', []))
    
    # Save prompt to file for Codex
    prompt_file = REPO.replace("/", "_") + f"_issue_{issue_number}.txt"
    prompt_path = Path(r"E:\scripts-python\worldexams") / prompt_file
    with open(prompt_path, 'w', encoding='utf-8') as f:
        f.write(prompt)
    
    print(f"Prompt saved to {prompt_path}")
    print(f"Run this command to execute:")
    print(f'  codex exec --full-auto < {prompt_path}')
    
    # Actually run Codex now
    print("\nExecuting Codex agent...")
    cmd = f'codex exec --full-auto'
    
    # Use PowerShell to pipe the prompt to Codex
    ps_cmd = f'Get-Content "{prompt_path}" | codex exec'
    
    result = subprocess.run(
        ps_cmd, shell=True, capture_output=True, text=True,
        cwd=AGENT_DIR
    )
    
    print("STDOUT:", result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
    if result.stderr:
        print("STDERR:", result.stderr[-1000:] if len(result.stderr) > 1000 else result.stderr)
    
    if result.returncode == 0:
        print(f"✅ Codex finished successfully for issue #{issue_number}")
        # Close the issue
        run(f'gh issue close {issue_number} --repo {REPO} --comment "Fixed automatically by country-fix-cronjob."')
    else:
        print(f"❌ Codex failed with code {result.returncode}")
    
    save_progress(issue_number, "done" if result.returncode == 0 else "failed")
    
    # Cleanup prompt file
    prompt_path.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
