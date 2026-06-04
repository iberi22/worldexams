#!/usr/bin/env python3
import requests, json

# Save to Xavier2 (memory system)
url = "http://localhost:8006/memory/add"
headers = {"Authorization": "Bearer dev-token", "Content-Type": "application/json"}
data = {
    "path": "projects/worldexams/generation/2026-06-02-batch",
    "content": "Batch generation completed 2026-06-02. Queue: 294/294 completed. Generated 17 new MASTERY bundles across 6 countries (Mexico, Argentina, Chile, Peru, Ecuador, Brazil). Models: deepseek-v4-flash, glm-5.1, kimi-k2.6, minimax-m2.7 via OpenCode Gateway. Jules issues #384 and #385 assigned - Jules is working on them (task links: 9319859733686606709 and 5137275796248421426). Cron jobs active and running: TestRunner (hourly, last run 16:00), BundleGenerator (30min, last run 16:30), CountryFix (20min). Security issue #221 still open. Cortex (8003) down."
}
r = requests.post(url, headers=headers, json=data, timeout=5)
print(f"Xavier2 save: {r.status_code}")
if r.status_code != 200:
    print(r.text[:200])
else:
    print("Saved successfully")
