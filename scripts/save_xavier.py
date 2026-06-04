#!/usr/bin/env python3
import requests, json

url = "http://localhost:8006/memory/add"
headers = {"Authorization": "Bearer dev-token", "Content-Type": "application/json"}
data = {"path": "projects/worldexams/generation/2026-06-02-batch",
        "content": "Batch generation completed 2026-06-02. Queue: 294/294 completed. Generated 17 new MASTERY bundles across 6 countries (Mexico, Argentina, Chile, Peru, Ecuador, Brazil). Models: deepseek-v4-flash, glm-5.1, kimi-k2.6, minimax-m2.7 via OpenCode Gateway. Jules issues #384 and #385 assigned and working. Cron jobs restored and running. Security issue #221 still open."}

r = requests.post(url, headers=headers, json=data, timeout=5)
print(f"Status: {r.status_code}")
print(r.text[:300])
