#!/usr/bin/env python3
"""Fix colon-instead-of-comma errors in any file"""
import sys

filename = sys.argv[1] if len(sys.argv) > 1 else "_build_q_g3_rest.py"
with open(filename, "r", encoding="utf-8") as f:
    data = f.read()

data = data.replace('"A":"', '"A","')
data = data.replace('"B":"', '"B","')
data = data.replace('"C":"', '"C","')
data = data.replace('"D":"', '"D","')

with open(filename, "w", encoding="utf-8") as f:
    f.write(data)
print(f"Fixed colon bugs in {filename}")
