"""
Country-Multi Issue Fixer for WorldExams
Picks an open country-multi issue and executes Codex to fix it.
"""

import json
import os
import queue
import subprocess
import sys
import threading
import time
from pathlib import Path

CREATE_NO_WINDOW = 0x08000000

REPO = "iberi22/worldexams"
WORKDIR = r"E:\scripts-python\worldexams\saberparatodos"
PARENT_DIR = r"E:\scripts-python\worldexams"
STATE_FILE = Path(PARENT_DIR) / ".worldexams" / "country-fix-state.json"
LOG_FILE = Path(PARENT_DIR) / ".worldexams" / "country-fix.log"
PROMPT_DIR = Path(PARENT_DIR) / ".worldexams"
CODEX_TIMEOUT = 1200  # 20 minutes per issue


def log(msg):
    # Strip non-ASCII for Windows console compatibility
    msg_clean = msg.encode("ascii", "replace").decode("ascii")
    print(msg_clean)
    LOG_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(LOG_FILE, "a", encoding="utf-8") as f:
        f.write(f"[{time.strftime('%Y-%m-%d %H:%M:%S')}] {msg_clean}\n")


GEMINI_MODEL_PRO = "gemini-3.1-pro-preview"
GEMINI_MODEL_FLASH = "gemini-3-flash-preview"


def kill_stale_codex():
    """Kill any existing Codex processes before starting."""
    for name in ["codex.exe", "Codex.exe"]:
        subprocess.run(f"taskkill /F /IM {name}", shell=True, capture_output=True, timeout=10)


def kill_stale_gemini():
    """Kill any existing Gemini processes before starting."""
    for name in ["gemini.exe", "node.exe"]:
        subprocess.run(f"taskkill /F /IM {name}", shell=True, capture_output=True, timeout=10)


def run(cmd, cwd=PARENT_DIR, timeout=30):
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True, cwd=cwd, timeout=timeout)
    return result.stdout.strip(), result.stderr.strip(), result.returncode


def get_state():
    if STATE_FILE.exists():
        with open(STATE_FILE) as f:
            return json.load(f)
    return {"last_issue": 0, "status": "idle"}


def save_state(state):
    STATE_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(STATE_FILE, "w") as f:
        json.dump(state, f, indent=2)


def get_next_issue():
    cmd = f"gh issue list --repo {REPO} --label country-multi --state open --json number,title,assignees --limit 20"
    stdout, stderr, code = run(cmd)
    if code != 0:
        log(f"Error listing issues: {stderr}")
        return None
    try:
        issues = json.loads(stdout)
    except json.JSONDecodeError:
        log(f"Failed to parse: {stdout}")
        return None

    state = get_state()
    last = state.get("last_issue", 0)

    for issue in issues:
        if issue["number"] <= last:
            continue
        if len(issue.get("assignees", [])) > 0:
            continue
        title = issue.get("title", "")
        # Skip meta-issues
        if "meta-issue" in title.lower() or "(meta" in title.lower():
            continue
        return issue

    # Restart from beginning
    for issue in issues:
        if len(issue.get("assignees", [])) > 0:
            continue
        title = issue.get("title", "")
        if "meta-issue" in title.lower() or "(meta" in title.lower():
            continue
        return issue
    return None


def get_issue_body(number):
    cmd = f"gh issue view {number} --repo {REPO} --json body,title,labels"
    stdout, _, code = run(cmd)
    if code == 0:
        try:
            return json.loads(stdout)
        except:
            pass
    return None


def build_prompt(issue):
    number = issue["number"]
    title = issue["title"]
    body = issue.get("body", "") or ""
    labels = issue.get("labels", [])
    label_names = [l["name"] for l in labels] if labels else []

    # Strip existing fix(country): prefix to avoid duplication
    commit_title = title[14:].strip() if title.lower().startswith("fix(country):") else title[:70]

    prompt = f"""You are fixing GitHub issue #{number}: {title}

## Problem Description
{body[:3000]}

## Labels: {', '.join(label_names)}

## Your Task
1. Read E:\\scripts-python\\worldexams\\config\\countries.config.ts to understand the multi-country setup
2. Analyze the SaberParaTodos codebase at E:\\scripts-python\\worldexams\\saberparatodos
3. Fix the country-awareness bug described in the issue
4. Run: cd E:\\scripts-python\\worldexams\\saberparatodos && npm run build
5. If build fails, fix the errors
6. Commit: cd E:\\scripts-python\\worldexams && git add . && git commit -m "{commit_title}" --no-verify
7. Push: git push origin fix/issue-254-validate-bundles-before-completion
8. Close the issue: gh issue close {number} --repo {REPO} --comment "Fixed by country-fix-cronjob."

## Critical Rules
- Use Astro.locals.country for runtime country detection
- Countries: CO (ICFES), MX (PLANEA), AR (APRENDER), CL (SIMCE), PE (ECE), EC (SENESCYT), BR (ENEM)
- examAuthority, examName, examFullName MUST come from country config
- NEVER hardcode exam names or Colombia-specific content
"""
    return prompt


def run_gemini_async(prompt_text, model, result_queue):
    try:
        # Kill stale processes first
        kill_stale_codex()
        kill_stale_gemini()
        time.sleep(2)  # Give OS time to release resources

        # Pass prompt directly as argument (avoids Windows @file redirection issues)
        cmd = f'gemini --prompt "{prompt_text[:5000]}" --model {model} --yolo --skip-trust'

        result = subprocess.run(
            cmd,
            shell=True,
            capture_output=True,
            text=True,
            cwd=WORKDIR,
            timeout=CODEX_TIMEOUT,
            creationflags=CREATE_NO_WINDOW,
        )

        prompt_file.unlink(missing_ok=True)
        result_queue.put(
            {
                "returncode": result.returncode,
                "stdout": result.stdout[-2000:] if result.stdout else "",
                "stderr": result.stderr[-1000:] if result.stderr else "",
            }
        )
    except subprocess.TimeoutExpired:
        result_queue.put({"returncode": -2, "error": "timeout"})
    except Exception as e:
        result_queue.put({"returncode": -1, "error": str(e)})


def main():
    log("=== Country Fix Cronjob Started ===")

    state = get_state()
    if state.get("status") == "running":
        log("Already running, exiting.")
        return

    # Kill any stale Codex processes at start
    kill_stale_codex()
    kill_stale_gemini()

    issue = get_next_issue()
    if not issue:
        log("No more open issues to fix.")
        return

    number = issue["number"]
    title = issue["title"]
    log(f"Picking issue #{number}: {title}")

    save_state({"last_issue": number, "status": "running", "title": title})

    details = get_issue_body(number)
    if not details:
        log(f"Could not get details for issue #{number}")
        save_state({"last_issue": number, "status": "error"})
        return

    prompt = build_prompt(issue)

    # Try with Gemini 3.1 Pro first (for heavy coding tasks)
    for model in [GEMINI_MODEL_PRO, GEMINI_MODEL_FLASH]:
        log(f"Trying model: {model}")
        result_queue = queue.Queue()
        thread = threading.Thread(target=run_gemini_async, args=(prompt, model, result_queue))
        thread.start()
        thread.join(timeout=CODEX_TIMEOUT + 30)

        if thread.is_alive():
            log(f"Timeout with {model} for issue #{number}")
            kill_stale_codex()
            kill_stale_gemini()
            if model == GEMINI_MODEL_PRO:
                continue  # Retry with Flash
            save_state({"last_issue": number, "status": "timeout"})
            return

        try:
            result = result_queue.get_nowait()
        except queue.Empty:
            log(f"No result from {model}")
            if model == GEMINI_MODEL_PRO:
                continue  # Retry with Flash
            save_state({"last_issue": number, "status": "error"})
            return

        if result.get("returncode") == 0:
            break  # Success
        if model == GEMINI_MODEL_PRO:
            log(f"Failed with {model}, retrying with Flash...")
            continue  # Retry with Flash
        else:
            break  # Flash also failed

    if result.get("returncode") == 0:
        log(f"Issue #{number} completed!")
        run(f'gh issue close {number} --repo {REPO} --comment "Fixed by country-fix-cronjob."')
        save_state({"last_issue": number, "status": "done"})
        # Notify via OpenClaw
        run(f'openclaw system event --text "Country-fix: issue #{number} closed - {title[:60]}" --mode now')
    else:
        rc = result.get("returncode")
        log(f"Codex exited with code {rc}")
        if result.get("stderr"):
            log(f"STDERR: {result.get('stderr')}")
        save_state({"last_issue": number, "status": "failed"})

    # Clean up processes
    kill_stale_codex()
    kill_stale_gemini()
    log("=== Country Fix Cronjob Finished ===")


if __name__ == "__main__":
    main()
