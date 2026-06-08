#!/usr/bin/env python3
"""
Generador MASTERY Weekly v5.2 — Sociales/Ciudadanas Colombia grados 7-11
Versión mejorada con preguntas contextualizadas en Colombia 2024-2026.
"""
import os, random

BASE = "questions_data/colombia/sociales-ciudadanas"
BUNDLE_SIZES = {7: 10, 8: 10, 9: 12, 10: 12, 11: 20}

# Contenido semanal por grado: (subtema_id, titulo, [conceptos_clave])
W = {}
