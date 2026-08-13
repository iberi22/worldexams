import json, sys, urllib.request
key = "AQ.Ab8RN6KK7czgFGyrlMG-ZdKokQH7V7ZbYApH0GoBsv2tj7hc6g"
req = urllib.request.Request("https://jules.googleapis.com/v1alpha/sessions", headers={"X-Goog-Api-Key": key})
try:
    with urllib.request.urlopen(req) as r:
        sessions = json.loads(r.read()).get("sessions", [])
        for s in sessions:
            if s.get("state") == "AWAITING_USER_FEEDBACK":
                print(f"ID: {s['name']}, Title: {s['title']}")
except Exception as e:
    print("Error:", e)
