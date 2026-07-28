#!/usr/bin/env python3
"""
validate-features.py — Reconciliación test-driven de features.json

Lee features.json, ejecuta test_validation para cada feature,
compara result con progress_pct reportado, y opcionalmente actualiza.

Uso:
  python3 scripts/validate-features.py --dry-run   # Solo reportar diferencias
  python3 scripts/validate-features.py --apply     # Actualizar features.json
  python3 scripts/validate-features.py --ci        # Exit 1 si hay drift (para CI)
"""

import json
import subprocess
import sys
import os
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parent.parent
FEATURES_PATH = REPO_ROOT / ".gitcore" / "features.json"


def load_features():
    with open(FEATURES_PATH) as f:
        return json.load(f)


def save_features(data):
    with open(FEATURES_PATH, "w") as f:
        json.dump(data, f, indent=2)
        f.write("\n")
    print(f"✅ features.json actualizado")


def run_command(cmd):
    """Ejecuta un comando shell y retorna el output."""
    try:
        result = subprocess.run(
            cmd, shell=True, capture_output=True, text=True, timeout=30, cwd=REPO_ROOT
        )
        return result.stdout.strip(), result.returncode
    except subprocess.TimeoutExpired:
        return "TIMEOUT", -1
    except Exception as e:
        return str(e), -1


def calculate_pct(test_validation):
    """Ejecuta el test_validation y extrae el %."""
    output, code = run_command(test_validation)
    try:
        # El test_validation debe retornar un número (0-100)
        pct = float(output.strip().split("\n")[-1])
        return min(max(pct, 0), 100), output, code  # clamp 0-100
    except (ValueError, IndexError):
        return None, output, code


def main():
    args = set(sys.argv[1:])
    dry_run = "--dry-run" in args
    apply = "--apply" in args
    ci = "--ci" in args

    if not (dry_run or apply or ci):
        print("Uso: --dry-run | --apply | --ci")
        sys.exit(1)

    data = load_features()
    features = data["features"]

    print(f"{'='*60}")
    print(f"🧪 VALIDATE-FEATURES — {FEATURES_PATH.name}")
    print(f"Modo: {'DRY-RUN' if dry_run else 'APPLY' if apply else 'CI'}")
    print(f"{'='*60}")
    print()

    drift_detected = False
    total = len(features)
    passed = 0

    for feat in features:
        fid = feat["id"]
        reported = feat.get("progress_pct", 0)
        test_val = feat.get("test_validation")

        if not test_val:
            print(f"⚠️  {fid}: sin test_validation, skip")
            continue

        actual_pct, raw_output, exit_code = calculate_pct(test_val)

        if actual_pct is None:
            print(f"❌ {fid}: no se pudo calcular % desde test")
            print(f"   Output: {raw_output[:80]}")
            continue

        diff = abs(actual_pct - reported)
        status = "✅" if diff < 5 else "⚠️" if diff < 20 else "❌"

        print(f"{status} {fid}: reportado={reported}% real={actual_pct:.0f}% (diff={diff:.0f}pp)")

        if diff >= 5:
            drift_detected = True
            if apply:
                feat["progress_pct"] = round(actual_pct, 1)
                feat["last_validated"] = "2026-07-10"
                print(f"   → Actualizado a {actual_pct:.0f}%")
        
        if diff < 5:
            passed += 1

    print()
    print(f"{'='*60}")
    print(f"Features: {passed}/{total} sincronizadas")
    if drift_detected:
        print(f"⚠️  Drift detectado en {total - passed} features")
    else:
        print(f"✅ Todo sincronizado")

    if apply and drift_detected:
        data["metadata"]["last_updated"] = "2026-07-10"
        passing = sum(1 for f in features if f.get("passes", False))
        data["metadata"]["passing"] = passing
        save_features(data)
    elif apply and not drift_detected:
        print("✅ Sin cambios necesarios")

    if ci and drift_detected:
        print("\n❌ CI FAIL: Drift detectado — features.json no refleja la realidad")
        sys.exit(1)

    sys.exit(0 if not (ci and drift_detected) else 1)


if __name__ == "__main__":
    main()
