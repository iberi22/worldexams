#!/usr/bin/env python3
"""
Summarize audit results - clean per-country report
"""
import json, os, re
from pathlib import Path
from collections import defaultdict

BASE = Path(__file__).parent.parent / "questions_data"

per_country = {}
total_ok = 0
total_issue = 0
total_bundles = 0

for country_dir in sorted(BASE.iterdir()):
    if not country_dir.is_dir():
        continue
    bundles = list(country_dir.rglob("*MASTERY-bundle.md"))
    if not bundles:
        continue
    
    country = country_dir.name
    ok_count = 0
    issue_count = 0
    bundle_details = []
    
    for bp in bundles:
        content = bp.read_text(encoding="utf-8", errors="replace")
        size = bp.stat().st_size
        feedbacks = len(re.findall(r"<!--\s*feedback:", content, re.IGNORECASE))
        pedagog = len(re.findall(r"###\s*Explicaci.n Pedag.gica", content))
        questions = len(re.findall(r"^## Question \d+", content, re.MULTILINE))
        raw_thinking = bool(re.search(r"Let me|I need to|I should|Let's plan|The user wants", content[:500], re.IGNORECASE))
        
        rel_path = str(bp.relative_to(BASE))
        is_ok = (feedbacks >= 60 and pedagog >= 15 and questions >= 15 and not raw_thinking)
        
        if is_ok:
            ok_count += 1
        else:
            issue_count += 1
        
        bundle_details.append({
            "path": rel_path,
            "size": size,
            "feedbacks": feedbacks,
            "pedagog": pedagog,
            "questions": questions,
            "raw": raw_thinking,
            "ok": is_ok
        })
    
    per_country[country] = {
        "total": len(bundles),
        "ok": ok_count,
        "issue": issue_count,
        "details": bundle_details
    }
    total_bundles += len(bundles)
    total_ok += ok_count
    total_issue += issue_count

# Print summary by country
print("=" * 80)
print(f"  BUNDLE AUDIT SUMMARY - {total_bundles} total bundles")
print("=" * 80)
print(f"  {'Country':15s} {'Total':8s} {'OK':8s} {'ISSUE':8s} {'OK%':8s}")
print("  " + "-" * 47)
for country, data in sorted(per_country.items()):
    pct = (data["ok"] / data["total"]) * 100 if data["total"] > 0 else 0
    print(f"  {country.upper():15s} {data['total']:3d}     {data['ok']:3d}     {data['issue']:3d}     {pct:5.0f}%")
print("  " + "-" * 47)
pct_total = (total_ok / total_bundles) * 100 if total_bundles > 0 else 0
print(f"  {'TOTAL':15s} {total_bundles:3d}     {total_ok:3d}     {total_issue:3d}     {pct_total:5.0f}%")

print()
print("=" * 80)
print("  DETAILED ISSUES BY COUNTRY")
print("=" * 80)

for country, data in sorted(per_country.items()):
    issues = [d for d in data["details"] if not d["ok"]]
    if not issues:
        continue
    print(f"\n  [{country.upper()}] {len(issues)} bundles with issues:")
    for d in sorted(issues, key=lambda x: x["feedbacks"]):
        reasons = []
        if d["feedbacks"] < 60:
            reasons.append(f"fb={d['feedbacks']}")
        if d["pedagog"] < 15:
            reasons.append(f"ped={d['pedagog']}")
        if d["raw"]:
            reasons.append("RAW")
        print(f"    {d['path']}")
        print(f"      {' | '.join(reasons)} | size={d['size']}B | questions={d['questions']}")
    
    # Check if any issues are from the gateway batch (paths matching the new bundles)
    new_bundle_issues = [d for d in issues if "-MASTERY-bundle.md" in d["path"] and not d["path"].startswith(("colombia/LEGACY", "colombia/ingles/grado-11/periodo-1/CO-ING"))]
    if new_bundle_issues:
        print(f"    [Gateway batch bundles needing regeneration: {len(new_bundle_issues)}]")
