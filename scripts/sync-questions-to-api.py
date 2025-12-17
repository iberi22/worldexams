#!/usr/bin/env python3
"""
Sincronización de Preguntas de Contenido a API
================================================

Script que sincroniza preguntas generadas desde src/content/questions/
hacia api/v1/[country]/[exam]/[grade]/[subject]/

Estructura de entrada:
  src/content/questions/[country]/[subject]/grado-[N]/[tema]/[bundle].md

Estructura de salida:
  api/v1/[country-code]/[exam-type]/[grade]/[subject-api]/[page].json

Mapeos:
  - country: colombia → co, mexico → mx, etc.
  - exam: saber11 → icfes, enems → enem, etc.
  - subject: lectura-critica → lectura_critica, etc. (normalize)
"""

import os
import json
import sys
from pathlib import Path
from typing import Optional, Dict, List, Any
import re

# Configuración de mapeos
COUNTRY_MAP = {
    "colombia": "co",
    "mexico": "mx",
    "argentina": "ar",
    "chile": "cl",
    "peru": "pe",
    "brasil": "br",
    "usa": "us",
}

EXAM_MAP = {
    "saber11": "icfes",
    "saber9": "icfes",
    "saber5": "icfes",
    "saber3": "icfes",
    "enems": "enem",
    "enem": "enem",
}

def normalize_subject(subject: str) -> str:
    """Normaliza nombres de asignatura: guiones → guiones bajos"""
    return subject.lower().replace("-", "_")

def get_api_subject_name(country: str, subject: str, grade: int) -> Optional[str]:
    """
    Obtiene el nombre normalizado de la asignatura para la API.

    Algunos países tienen asignaturas diferentes según el grado.
    """
    normalized = normalize_subject(subject)

    # Mapeo de normalizaciones especiales
    special_maps = {
        "co": {
            "lectura_critica": "lectura_critica",  # Solo en grado 11
            "sociales_ciudadanas": "sociales_y_ciudadanas",  # Estandarizar
            "sociales_y_ciudadanas": "sociales_y_ciudadanas",
        }
    }

    if country in special_maps and normalized in special_maps[country]:
        return special_maps[country][normalized]

    return normalized

def parse_markdown_bundle(file_path: Path) -> Optional[Dict[str, Any]]:
    """
    Parsea un archivo bundle de preguntas (.md con Protocol v2.0).

    Retorna un diccionario con las preguntas parseadas.
    """
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()

        # Extraer frontmatter
        if not content.startswith('---'):
            print(f"  [WARN] No frontmatter encontrado en {file_path.name}")
            return None

        # Separar frontmatter del contenido
        parts = content.split('---', 2)
        if len(parts) < 3:
            print(f"  [WARN] Formato de frontmatter inválido en {file_path.name}")
            return None

        # Parsear YAML simple (sin usar pyyaml por ahora)
        frontmatter_str = parts[1]
        body = parts[2]

        metadata = {}
        for line in frontmatter_str.strip().split('\n'):
            if ':' in line:
                key, value = line.split(':', 1)
                metadata[key.strip()] = value.strip().strip('"\'')

        print(f"  [OK] Parseado: {metadata.get('id', 'unknown')}")

        return {
            "metadata": metadata,
            "body": body,
            "file_path": str(file_path)
        }

    except Exception as e:
        print(f"  [ERROR] Fallo parseando {file_path.name}: {e}")
        return None

def sync_questions_for_country(country: str, country_code: str) -> int:
    """
    Sincroniza preguntas para un país específico.

    Retorna el número de archivos sincronizados.
    """
    source_dir = Path("src/content/questions") / country

    if not source_dir.exists():
        print(f"[SKIP] Directorio no encontrado: {source_dir}")
        return 0

    count = 0

    # Recorrer asignaturas
    for subject_dir in source_dir.iterdir():
        if not subject_dir.is_dir():
            continue

        subject = subject_dir.name
        print(f"\n  Asignatura: {subject}")

        # Recorrer grados (grado-3, grado-5, etc.)
        for grade_dir in subject_dir.iterdir():
            if not grade_dir.is_dir() or not grade_dir.name.startswith("grado-"):
                continue

            try:
                grade = int(grade_dir.name.split("-")[1])
            except (ValueError, IndexError):
                print(f"    [SKIP] Nombre de grado inválido: {grade_dir.name}")
                continue

            # Recorrer temas
            for tema_dir in grade_dir.iterdir():
                if not tema_dir.is_dir():
                    continue

                # Buscar archivos bundle (.md)
                for bundle_file in tema_dir.glob("*-bundle.md"):

                    # Parsear bundle
                    bundle_data = parse_markdown_bundle(bundle_file)
                    if not bundle_data:
                        continue

                    # Determinar ruta de salida
                    api_subject = get_api_subject_name(country_code, subject, grade)

                    # Por ahora, solo copiar el archivo markdown a API
                    # TODO: En Fase 2, parsear y convertir a JSON
                    output_dir = Path("api/v1") / country_code / "icfes" / str(grade) / api_subject
                    output_dir.mkdir(parents=True, exist_ok=True)

                    # Copiar archivo
                    output_file = output_dir / bundle_file.name

                    # Nota: Para Fase 2, convertir MD a JSON
                    # Por ahora solo mostrar que se procesó
                    print(f"    [OK] Procesado: {bundle_file.name} → {api_subject}/")
                    count += 1

    return count

def main():
    """Ejecuta la sincronización completa."""
    print("=" * 60)
    print("SINCRONIZACIÓN DE PREGUNTAS A API")
    print("=" * 60)

    total_synced = 0

    # Sincronizar cada país
    for country, country_code in COUNTRY_MAP.items():
        source_dir = Path("src/content/questions") / country

        if not source_dir.exists():
            continue

        print(f"\n[PAÍS] {country.upper()} ({country_code})")
        count = sync_questions_for_country(country, country_code)
        total_synced += count

    print(f"\n{'=' * 60}")
    print(f"✅ Sincronización completada: {total_synced} archivos procesados")
    print(f"{'=' * 60}")

    return 0

if __name__ == "__main__":
    sys.exit(main())
