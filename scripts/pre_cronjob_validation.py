#!/usr/bin/env python3
"""
PRE-CRONJOB VALIDATION SCRIPT
Validates all existing bundles in questions_data/ BEFORE running generation cronjob.
This prevents bad bundles from propagating and ensures only Protocol v5.1 compliant
bundles exist before new generation runs.
"""

import argparse
import sys
from pathlib import Path

# Add scripts directory to path to import local validator
sys.path.append(str(Path(__file__).resolve().parent))
from bundle_validator import BundleValidator

GREEN = "\033[92m"
RED = "\033[91m"
YELLOW = "\033[93m"
RESET = "\033[0m"

MARK_PASS = "[PASS]"
MARK_FAIL = "[FAIL]"
MARK_WARN = "[WARN]"

WORLDEXAMS_ROOT = Path(__file__).resolve().parent.parent
QUESTIONS_DATA = WORLDEXAMS_ROOT / "questions_data"

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

    bundles = []
    if base_path.exists():
        for md_file in base_path.rglob("*.md"):
            if md_file.name == "README.md": continue
            if args.country and args.country.lower() not in str(md_file).lower(): continue
            if args.subject and args.subject.lower() not in str(md_file).lower(): continue
            if args.grade and f"grado-{args.grade}" not in str(md_file): continue
            bundles.append(md_file)

    print(f"Scanning {len(bundles)} bundle files...\n")

    validator = BundleValidator()
    total_valid = 0
    total_invalid = 0
    invalid_bundles = []

    for bundle_path in sorted(bundles):
        vr = validator.validate_file(str(bundle_path))

        if vr.valid:
            total_valid += 1
        else:
            total_invalid += 1
            invalid_bundles.append((bundle_path, vr.issues))

            rel = bundle_path.relative_to(WORLDEXAMS_ROOT)
            print(f"  {MARK_FAIL} INVALID: {rel}")
            for issue in vr.issues:
                sev = RED if issue.severity == "CRITICAL" else YELLOW
                print(f"    {sev}[{issue.severity}]{RESET} {issue.message}")

    # Summary
    print(f"\n{'='*60}")
    print(f"  VALIDATION SUMMARY")
    print(f"{'='*60}")
    print(f"  Total scanned: {len(bundles)}")
    print(f"  {GREEN}Valid: {total_valid}{RESET}")
    print(f"  {RED}Invalid: {total_invalid}{RESET}")

    if invalid_bundles:
        if args.delete_invalid:
            print(f"\n{MARK_FAIL} DELETING {total_invalid} invalid bundles...{RESET}")
            for bundle_path, _ in invalid_bundles:
                try:
                    bundle_path.unlink()
                    print(f"  {MARK_PASS} Deleted: {bundle_path.name}")
                except Exception as e:
                    print(f"  {MARK_FAIL} Failed to delete {bundle_path.name}: {e}")
            print(f"\n{MARK_PASS} Deleted {total_invalid} invalid bundles{RESET}")
            sys.exit(0)
        else:
            print(f"\n{MARK_FAIL} CRONJOB BLOCKED - {total_invalid} invalid bundles found{RESET}")
            sys.exit(1)
    else:
        print(f"\n{MARK_PASS} ALL BUNDLES VALID - Cronjob can proceed{RESET}")
        sys.exit(0)

if __name__ == "__main__":
    from typing import Optional
    main()
