#!/usr/bin/env python3
"""
Main entry point: Generate ALL Grado 3 Matematicas Colombia 2026 bundles.
Run: python scripts/gen_mat_g3_main.py
"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gen_mat_g3_part4 import main

if __name__ == "__main__":
    main()
