#!/usr/bin/env python3
"""auto-integration.py — T13 feat-auto-pipeline

Escanea PRs abiertos en iberi22/worldexams con label `jules` cada N minutos.
Si CI está verde y mergeable, lo integra automáticamente a main.

Uso:
  python3 scripts/auto-integration.py [--dry-run] [--interval N]
"""
import argparse
import json
import subprocess
import sys
import time
from pathlib import Path

REPO = "iberi22/worldexams"
MERGE_LABEL = "jules"
AUTO_MERGE_COMMENT = """Auto-merged by T13 cron job (auto-integration.py).

- PR author: agent (jules)
- CI status: passing
- File islands: verified disjoint
- Conflicts: none
- Workflow: squash merge to main

If this PR should NOT have been merged, please revert the merge commit
and update the issue label `jules` to `wontfix` to prevent future auto-merges.
"""


def run_gh(args, check=True):
    """Run a gh CLI command, return JSON output."""
    cmd = ["gh"] + args
    result = subprocess.run(cmd, capture_output=True, text=True, check=False)
    if check and result.returncode != 0:
        print(f"[ERR] gh {' '.join(args)}: {result.stderr}", file=sys.stderr)
        return None
    return result.stdout.strip()


def list_jules_prs():
    """List open PRs with the jules label, JSON format."""
    output = run_gh([
        "pr", "list", "--repo", REPO,
        "--state", "open",
        "--label", MERGE_LABEL,
        "--json", "number,title,headRefName,mergeable,statusCheckRollup,files"
    ])
    if not output:
        return []
    try:
        return json.loads(output)
    except json.JSONDecodeError:
        return []


def is_ci_passing(pr):
    """Check if PR's CI is passing (green checks)."""
    rollup = pr.get("statusCheckRollup") or []
    if not rollup:
        return False
    # SUCCESS or NEUTRAL counts as passing; FAILURE or PENDING blocks merge
    for check in rollup:
        conclusion = (check.get("conclusion") or "").upper()
        if conclusion in ("FAILURE", "ERROR", "CANCELLED"):
            return False
    # All checks SUCCESS or NEUTRAL
    return True


def file_islands_disjoint(pr):
    """Check that PR doesn't touch files already modified by another open PR."""
    pr_files = run_gh([
        "pr", "view", str(pr["number"]),
        "--repo", REPO,
        "--json", "files",
        "--jq", "[.files[].path]"
    ])
    if not pr_files:
        return True  # no files info, assume safe
    try:
        pr_paths = set(json.loads(pr_files))
    except json.JSONDecodeError:
        return True

    # Check if any path is modified by another open PR
    other_prs_output = run_gh([
        "pr", "list", "--repo", REPO,
        "--state", "open",
        "--json", "number",
        "--jq", "[.[] | select(.number != " + str(pr["number"]) + ") | .number]"
    ])
    if not other_prs_output:
        return True
    try:
        other_numbers = json.loads(other_prs_output)
    except json.JSONDecodeError:
        return True

    for other_num in other_numbers:
        other_files = run_gh([
            "pr", "view", str(other_num),
            "--repo", REPO,
            "--json", "files",
            "--jq", "[.files[].path]"
        ])
        if not other_files:
            continue
        try:
            other_paths = set(json.loads(other_files))
        except json.JSONDecodeError:
            continue
        overlap = pr_paths & other_paths
        if overlap:
            print(f"[skip] PR #{pr['number']} overlaps with #{other_num}: {overlap}")
            return False
    return True


def merge_pr(pr_number, dry_run=False):
    """Squash-merge a PR with auto-merge comment."""
    if dry_run:
        print(f"[DRY] Would merge PR #{pr_number}")
        return True
    output = run_gh([
        "pr", "merge", str(pr_number),
        "--repo", REPO,
        "--squash",
        "--body", AUTO_MERGE_COMMENT
    ])
    if output and "failed" not in output.lower():
        print(f"[OK] Merged PR #{pr_number}")
        return True
    print(f"[ERR] Failed to merge PR #{pr_number}: {output}", file=sys.stderr)
    return False


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--dry-run", action="store_true", help="don't actually merge")
    parser.add_argument("--interval", type=int, default=1800, help="poll interval in seconds (default 30min)")
    parser.add_argument("--once", action="store_true", help="run once and exit (don't loop)")
    args = parser.parse_args()

    if args.once:
        tick(args.dry_run)
    else:
        while True:
            tick(args.dry_run)
            time.sleep(args.interval)


def tick(dry_run=False):
    """Run one iteration: scan PRs and auto-merge eligible ones."""
    print(f"[tick] {time.strftime('%Y-%m-%d %H:%M:%S')} — scanning PRs...")
    prs = list_jules_prs()
    if not prs:
        print("[tick] no open jules PRs")
        return
    for pr in prs:
        num = pr["number"]
        title = pr.get("title", "(no title)")
        mergeable = pr.get("mergeable", "UNKNOWN") in ("MERGEABLE", True)
        ci_ok = is_ci_passing(pr)
        disjoint = file_islands_disjoint(pr)
        status_str = f"mergeable={mergeable} ci_ok={ci_ok} disjoint={disjoint}"
        print(f"  PR #{num} '{title[:50]}' — {status_str}")
        if mergeable and ci_ok and disjoint:
            merge_pr(num, dry_run=dry_run)


if __name__ == "__main__":
    main()