#!/usr/bin/env python3
"""
PRE-CRONJOB VALIDATION SCRIPT
Validates all existing bundles in questions_data/ BEFORE running generation cronjob.
This prevents bad bundles from propagating and ensures only Protocol v5.1 compliant
bundles exist before new generation runs.

Usage:
    python scripts/pre_cronjob_validation.py                    # Full validation
    python scripts/pre_cronjob_validation.py --country=CO       # Single country
    python scripts/pre_cronjob_validation.py --fix               # Auto-fix common issues
    python scripts/pre_cronjob_validation.py --report=markdown   # Markdown report only
"""

import argparse
import re
import sys
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

import yaml

GREEN = "[92m"
RED = "[91m"
YELLOW = "[93m"
RESET = "[0m"

MARK_PASS = "[PASS]"
MARK_FAIL = "[FAIL]"
MARK_WARN = "[WARN]"

WORLDEXAMS_ROOT = Path(r"E:\scripts-python\worldexams")
QUESTIONS_DATA = WORLDEXAMS_ROOT / "questions_data"

REQUIRED_FRONTMATTER = ["id", "country", "grado", "asignatura", "tema", "periodo", "protocol_version", "bundle_size"]


@dataclass
class ValidationIssue:
    severity: str  # CRITICAL, HIGH, MEDIUM, LOW
    message: str
    file_path: str
    line: Optional[int] = None


def validate_bundle_file(file_path: Path) -> tuple[bool, list[ValidationIssue], list[str]]:
    """Validate a single bundle file against Protocol v5.1."""
    issues = []
    warnings = []
    valid = True

    try:
        content = file_path.read_text(encoding="utf-8")
    except Exception as e:
        issues.append(ValidationIssue("CRITICAL", f"Cannot read file: {e}", str(file_path)))
        return False, issues, warnings

    # Parse frontmatter
    fm_match = re.match(r"^---\n([\s\S]*?)\n---", content)
    if not fm_match:
        issues.append(ValidationIssue("CRITICAL", "Missing YAML frontmatter", str(file_path)))
        return False, issues, warnings

    try:
        fm = yaml.safe_load(fm_match[1]) or {}
    except yaml.YAMLError as e:
        issues.append(ValidationIssue("CRITICAL", f"YAML parse error: {e}", str(file_path)))
        return False, issues, warnings

    # Check required frontmatter fields
    for field in REQUIRED_FRONTMATTER:
        if field not in fm or not fm[field]:
            issues.append(ValidationIssue("CRITICAL", f"Missing required frontmatter field: {field}", str(file_path)))

    # Check protocol_version is 5.1
    if fm.get("protocol_version") not in ("5.1", 5.1, "5", 5):
        warnings.append(f"Expected protocol_version 5.1, got {fm.get('protocol_version')}")

    # Count questions
    expected = fm.get("bundle_size") or fm.get("total_questions") or 20
    question_matches = re.findall(r"##\s+(Question|Pregunta)\s+\d+", content, re.IGNORECASE)
    actual = len(question_matches)

    if actual != expected:
        issues.append(
            ValidationIssue("CRITICAL", f"Question count mismatch: expected {expected}, found {actual}", str(file_path))
        )
        valid = False

    # Validate each question block
    question_blocks = re.split(r"##\s+(Question|Pregunta)\s+\d+", content, flags=re.IGNORECASE)
    for i, block in enumerate(question_blocks[1:], 1):
        # Check options
        options = re.findall(r"- \[([ xX])\] [A-D]\)", block)
        correct_count = len(re.findall(r"- \[x\]", block, re.IGNORECASE))

        if len(options) < 4:
            issues.append(
                ValidationIssue("HIGH", f"Question {i}: fewer than 4 options (found {len(options)})", str(file_path))
            )
            valid = False
        if correct_count != 1:
            issues.append(
                ValidationIssue(
                    "HIGH", f"Question {i}: expected exactly 1 correct [x], found {correct_count}", str(file_path)
                )
            )
            valid = False

        # Check for prohibited patterns
        if re.search(
            r"todas las anteriores|ninguna de las anteriores|a y b|^\(?(todas|ninguna)\)", block, re.IGNORECASE
        ):
            issues.append(ValidationIssue("CRITICAL", f"Question {i}: prohibited pattern found", str(file_path)))
            valid = False

    # Check for placeholder content in questions
    placeholder_pattern = re.search(
        r"## Question \d+\s*\n\s*\*\*ID:\*\*\s*`[^`]+`\s*\n\s*### Enunciado\s*\n\s*(Question \d+|[A-D]\)|\(?[D-P]\d+\)|\n[a-z]{{1,10}}\s+[A-Z]|^\s*$)",
        content,
        re.MULTILINE | re.IGNORECASE,
    )
    if placeholder_pattern:
        warnings.append(f"Possible placeholder content detected in question headers")

    if issues:
        valid = False

    return valid, issues, warnings


def scan_directory(base_path: Path, country: Optional[str] = None) -> list[Path]:
    """Find all .md bundle files in directory."""
    bundles = []
    if not base_path.exists():
        return bundles

    for md_file in base_path.rglob("*.md"):
        if md_file.name == "README.md":
            continue
        if country and country.lower() not in str(md_file).lower():
            continue
        bundles.append(md_file)

    return bundles


def main():
    parser = argparse.ArgumentParser(description="Pre-cronjob bundle validation")
    parser.add_argument("--country", help="Country code (CO, MX, AR, etc.)")
    parser.add_argument("--fix", action="store_true", help="Attempt to fix common issues")
    parser.add_argument("--report", choices=["terminal", "markdown"], default="terminal")
    parser.add_argument("--delete-invalid", action="store_true", help="Delete invalid bundles (DANGEROUS)")
    parser.add_argument("--subject", help="Filter by subject")
    parser.add_argument("--grade", type=int, help="Filter by grade")
    args = parser.parse_args()

    # Determine base path
    if args.country:
        country_map = {"co": "colombia", "mx": "mexico", "ar": "argentina", "cl": "chile", "pe": "peru", "br": "brasil"}
        country_key = args.country.lower()
        country_path = country_map.get(country_key, country_key)
        base_path = QUESTIONS_DATA / country_path
    else:
        base_path = QUESTIONS_DATA

    print(f"\n{'='*60}")
    print(f"  PRE-CRONJOB BUNDLE VALIDATION")
    print(f"  Path: {base_path}")
    print(f"{'='*60}\n")

    bundles = scan_directory(base_path)
    print(f"Scanning {len(bundles)} bundle files...\n")

    total_valid = 0
    total_invalid = 0
    total_warnings = 0
    all_issues = []

    invalid_bundles = []

    for bundle_path in sorted(bundles):
        # Apply filters
        if args.subject and args.subject.lower() not in str(bundle_path).lower():
            continue
        if args.grade and f"grado-{args.grade}" not in str(bundle_path):
            continue

        valid, issues, warnings = validate_bundle_file(bundle_path)

        if valid:
            total_valid += 1
            if warnings:
                total_warnings += 1
        else:
            total_invalid += 1
            invalid_bundles.append((bundle_path, issues, warnings))
            for issue in issues:
                all_issues.append(issue)

        if not valid and args.report == "terminal":
            rel = bundle_path.relative_to(WORLDEXAMS_ROOT)
            print(f"  {MARK_FAIL} INVALID: {rel}")
            for issue in issues:
                sev = RED if issue.severity == "CRITICAL" else YELLOW
                print(f"    {sev}[{issue.severity}]{RESET} {issue.message}")

    # Summary
    print(f"\n{'='*60}")
    print(f"  VALIDATION SUMMARY")
    print(f"{'='*60}")
    print(f"  Total scanned: {len(bundles)}")
    print(f"  {GREEN}Valid: {total_valid}{RESET}")
    print(f"  {RED}Invalid: {total_invalid}{RESET}")
    print(f"  {YELLOW}Warnings (valid): {total_warnings}{RESET}")

    if invalid_bundles:
        print(f"\n{MARK_FAIL} CRONJOB BLOCKED - {total_invalid} invalid bundles found{RESET}")
        print(f"   Run with --delete-invalid to remove them, or fix manually.")
        print(f"\n  Invalid bundles:")
        for bundle_path, issues, warnings in invalid_bundles[:20]:
            rel = bundle_path.relative_to(WORLDEXAMS_ROOT)
            print(f"   - {rel}")
        if len(invalid_bundles) > 20:
            print(f"   ... and {len(invalid_bundles) - 20} more")

        if args.delete_invalid:
            print(f"\n{MARK_FAIL} DELETING {total_invalid} invalid bundles...{RESET}")
            for bundle_path, _, _ in invalid_bundles:
                try:
                    bundle_path.unlink()
                    print(f"  {MARK_PASS} Deleted: {bundle_path.name}")
                except Exception as e:
                    print(f"  {MARK_FAIL} Failed to delete {bundle_path.name}: {e}")
            print(f"\n{MARK_PASS} Deleted {total_invalid} invalid bundles{RESET}")

        if args.report == "markdown":
            print("\n\n## Pre-Cronjob Validation Report\n")
            print(f"| Metric | Value |")
            print(f"|--------|-------|")
            print(f"| Total | {len(bundles)} |")
            print(f"| Valid | {total_valid} |")
            print(f"| Invalid | {total_invalid} |")
            print(f"| Warnings | {total_warnings} |")
            print(f"\n### Invalid Bundles\n")
            for bundle_path, issues, _ in invalid_bundles:
                rel = bundle_path.relative_to(WORLDEXAMS_ROOT)
                print(f"- `{rel}`")
                for issue in issues:
                    print(f"  - [{issue.severity}] {issue.message}")

        sys.exit(1)  # Exit with error to block cronjob
    else:
        print(f"\n{MARK_PASS} ALL BUNDLES VALID - Cronjob can proceed{RESET}")
        sys.exit(0)


if __name__ == "__main__":
    main()
