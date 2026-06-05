#!/usr/bin/env python3
"""Fix encoding issues in Python scripts (remove emojis from print statements)."""
import re, sys
from pathlib import Path

src = Path(__file__).parent / "direct-generate-gateway.py"
content = src.read_text(encoding="utf-8")

# Replace emoji-heavy print statements
replacements = [
    ("📊", ""),
    ("🚀", ""),
    ("📝", ""),
    ("✅", ""),
    ("❌", ""),
    ("⏰", ""),
    ("⏳", ""),
    ("💡", ""),
    ("📂", ""),
]

for emoji, repl in replacements:
    content = content.replace(emoji, repl)

src.write_text(content, encoding="utf-8")
print("Fix applied to direct-generate-gateway.py")
