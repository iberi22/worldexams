#!/usr/bin/env python3
"""
Full audit of all MASTERY bundles in questions_data/
Checks: inline feedbacks count, pedagogic sections, size, country code consistency
"""
import json, os, re
from pathlib import Path
from collections import defaultdict

BASE = Path(__file__).parent.parent / "questions_data"
REPORT = {}

# Walk all MASTERY bundles
for country_dir in sorted(BASE.iterdir()):
    if not country_dir.is_dir():
        continue
    
    bundles = list(country_dir.rglob("*MASTERY-bundle.md"))
    if not bundles:
        continue
    
    country = country_dir.name
    country_report = []
    
    for bp in bundles:
        content = bp.read_text(encoding="utf-8", errors="replace")
        size = bp.stat().st_size
        
        # Count inline feedbacks
        feedbacks = len(re.findall(r"<!--\s*feedback:", content, re.IGNORECASE))
        
        # Count pedagogic sections
        pedagog = len(re.findall(r"###\s*Explicaci.n Pedag.gica", content))
        
        # Count questions (## Question N)
        questions = len(re.findall(r"^## Question \d+", content, re.MULTILINE))
        
        # Count options with format - [x] or - [ ]
        options = len(re.findall(r"-\s+\[[ x]\]", content))
        
        # Check for raw thinking
        raw_thinking = bool(re.search(r"Let me|I need to|I should|Let's plan|The user wants", content[:500], re.IGNORECASE))
        
        # Check country code consistency (first letter of path)
        expected_code = country.upper()[:2]
        code_hits = len(re.findall(rf"`?{expected_code}-", content))
        
        rel_path = str(bp.relative_to(BASE))
        
        report_item = {
            "path": rel_path,
            "size": size,
            "questions": questions,
            "feedbacks": feedbacks,
            "pedagog": pedagog,
            "options": options,
            "raw_thinking": raw_thinking,
            "code_hits": code_hits,
            "status": "OK" if (feedbacks >= 60 and pedagog >= 15 and questions >= 15 and not raw_thinking) else "ISSUE"
        }
        country_report.append(report_item)
    
    # Summary per country
    total = len(country_report)
    ok = sum(1 for r in country_report if r["status"] == "OK")
    issues = sum(1 for r in country_report if r["status"] == "ISSUE")
    
    print(f"\n{'='*60}")
    print(f"  {country.upper()} ({total} bundles)")
    print(f"{'='*60}")
    print(f"  OK: {ok} | ISSUES: {issues}")
    
    for r in sorted(country_report, key=lambda x: x["status"], reverse=True):
        raw_flag = " [RAW]" if r["raw_thinking"] else ""
        print(f"  {r['status']:6s} | {r['feedbacks']:3d} fb | {r['pedagog']:2d} ped | {r['questions']} q | {r['size']:6d}B | {r['path']}{raw_flag}")
        if r["status"] == "ISSUE":
            reasons = []
            if r["feedbacks"] < 60:
                reasons.append(f"feedbacks={r['feedbacks']}")
            if r["pedagog"] < 15:
                reasons.append(f"pedagog={r['pedagog']}")
            if r["raw_thinking"]:
                reasons.append("RAW")
            print(f"            Issues: {', '.join(reasons)}")

print(f"\n{'='*60}")
print("  GRAND TOTAL")
print(f"{'='*60}")
