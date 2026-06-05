import requests, json

url = "http://localhost:8003/memory/add"
headers = {"X-Cortex-Token": "dev-token", "Content-Type": "application/json"}
data = {
    "path": "projects/worldexams/generation/2026-06-02-gateway-batch",
    "content": "Batch generation using OpenCode Gateway API completed 2026-06-02. Total: 294 tasks completed (0 failed). Model rotation: deepseek-v4-flash, glm-5.1, kimi-k2.6, minimax-m2.7. Generated 17 new MASTERY bundles across 6 countries (mexico, argentina, chile, peru, ecuador, brazil). Cron jobs restored: TestRunner (hourly), BundleGenerator (30min), CountryFix (20min). Issues #375, #376 closed as implemented in main. New issues created: #384 (MX/AR/BR expansion), #385 (ES/PA/GT etc expansion). Jules PRs reviewed: #378 (shared context - code in main), #380 (english migration - content in main), #370 (country rules - in main)."
}
r = requests.post(url, headers=headers, json=data, timeout=5)
print(f"Status: {r.status_code}")
print(r.text[:200])
