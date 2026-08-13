import json, sys, urllib.request
key = "REDACTED"
sid = "4076817091769841214"
req = urllib.request.Request(f"https://jules.googleapis.com/v1alpha/sessions/{sid}", headers={"X-Goog-Api-Key": key})
try:
    with urllib.request.urlopen(req) as r:
        print(json.dumps(json.loads(r.read()), indent=2))
except Exception as e:
    print("Error:", e)
