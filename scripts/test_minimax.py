#!/usr/bin/env python3
import requests, json, os, sys
from pathlib import Path

# Try to load API key
key = os.environ.get('MINIMAX_API_KEY', '')
if not key:
    env_path = Path(__file__).parent.parent / '.env'
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line.startswith('MINIMAX_API_KEY'):
                    key = line.split('=', 1)[1].strip().strip("'\"")

if not key:
    print("NO_API_KEY")
    sys.exit(1)

headers = {'Authorization': f'Bearer {key}', 'Content-Type': 'application/json'}
payload = {'model': 'MiniMax-M2.7', 'messages': [{'role': 'user', 'content': 'Say hello in 5 words'}], 'max_tokens': 20}

try:
    r = requests.post('https://api.minimaxi.chat/v1/chat/completions', headers=headers, json=payload, timeout=30)
    print(f'Status: {r.status_code}')
    if r.status_code == 200:
        print('OK')
    else:
        print(r.text[:500])
except Exception as e:
    print(f'ERROR: {e}')
