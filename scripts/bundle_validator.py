#!/usr/bin/env python3
import re
from pathlib import Path
from typing import Any, Dict, List, Optional

import yaml


class ValidationIssue:
    def __init__(self, severity: str, message: str, file_path: str, line: Optional[int] = None):
        self.severity = severity
        self.message = message
        self.file_path = file_path
        self.line = line


class ValidationResult:
    def __init__(self, valid: bool, issues: List[ValidationIssue], warnings: List[str]):
        self.valid = valid
        self.issues = issues
        self.warnings = warnings


class BundleValidator:
    REQUIRED_FRONTMATTER = [
        "id",
        "country",
        "grado",
        "asignatura",
        "tema",
        "periodo",
        "protocol_version",
        "bundle_size",
    ]

    def validate_file(self, file_path: str) -> ValidationResult:
        path = Path(file_path)
        issues = []
        warnings = []
        valid = True

        try:
            content = path.read_text(encoding="utf-8")
        except Exception as e:
            issues.append(ValidationIssue("CRITICAL", f"Cannot read file: {e}", file_path))
            return ValidationResult(False, issues, warnings)

        # Parse frontmatter
        fm_match = re.match(r"^---\n([\s\S]*?)\n---", content)
        if not fm_match:
            issues.append(ValidationIssue("CRITICAL", "Missing YAML frontmatter", file_path))
            return ValidationResult(False, issues, warnings)

        try:
            fm = yaml.safe_load(fm_match[1]) or {}
        except yaml.YAMLError as e:
            issues.append(ValidationIssue("CRITICAL", f"YAML parse error: {e}", file_path))
            return ValidationResult(False, issues, warnings)

        # Check required frontmatter fields
        for field in self.REQUIRED_FRONTMATTER:
            if field not in fm or fm[field] is None:
                issues.append(ValidationIssue("CRITICAL", f"Missing required frontmatter field: {field}", file_path))

        # Check protocol_version
        protocol_version = str(fm.get("protocol_version", ""))
        if not protocol_version.startswith("5"):
            issues.append(
                ValidationIssue("CRITICAL", f"Expected protocol_version 5.x, got {protocol_version}", file_path)
            )

        # Count questions
        question_headers = re.findall(r"^##\s+(Question|Pregunta)\s+\d+", content, re.MULTILINE | re.IGNORECASE)
        actual_count = len(question_headers)

        # Mastery bundles MUST have 20 questions, except for Grade 3 which allows 10
        grado = str(fm.get("grado", ""))
        is_grade_3 = grado == "3" or grado == "03"
        is_mastery = "mastery" in file_path.lower() or fm.get("bundle_size") == 20 or fm.get("total_questions") == 20

        if is_grade_3:
            expected_size = fm.get("bundle_size") or fm.get("total_questions") or 10
        else:
            expected_size = fm.get("bundle_size") or fm.get("total_questions") or (20 if is_mastery else None)

        if expected_size and actual_count != expected_size:
            issues.append(
                ValidationIssue(
                    "CRITICAL", f"Question count mismatch: expected {expected_size}, found {actual_count}", file_path
                )
            )
            valid = False

        # Validate each question block
        parts = re.split(r"^##\s+(?:Question|Pregunta)\s+\d+.*$", content, flags=re.MULTILINE | re.IGNORECASE)
        question_blocks = parts[1:]
        headers = re.findall(r"^##\s+(?:Question|Pregunta)\s+\d+.*$", content, re.MULTILINE | re.IGNORECASE)

        difficulty_counts = {"D3-D4": 0, "D5-D6": 0, "D7-D8": 0, "D9-D10": 0}

        for i, (header, block) in enumerate(zip(headers, question_blocks), 1):
            # 1. Check difficulty marker in header
            dm_match = re.search(r"\[(D\d+[-–]D\d+)\]", header)
            if dm_match:
                dm = dm_match.group(1).replace("–", "-")
                if dm in difficulty_counts:
                    difficulty_counts[dm] += 1
                else:
                    warnings.append(f"Question {i} has unusual difficulty marker: {dm}")
            else:
                issues.append(
                    ValidationIssue("HIGH", f"Question {i} missing difficulty marker [D3-D4] in header", file_path)
                )

            # 2. Check metadata
            # Accept ICFES or other country-specific competency tags
            competency_tags = ["ICFES", "EBAU", "Competencia", "MINED", "CNB", "MEDUCA", "SNEPE", "Aristas", "BNCC", "PAA", "UNGE", "DCNB", "MINERD", "NCEA", "CAPS", "EXANI-II", "Aprender", "NAP"]

            if not any(f"**{tag}:**" in block for tag in competency_tags):
                 issues.append(
                    ValidationIssue("HIGH", f"Question {i} missing competency metadata field (e.g., ICFES, Competencia, etc.)", file_path)
                )

            for metadata_field in ["Bloom", "Expected_Success"]:
                if f"**{metadata_field}:**" not in block:
                    issues.append(
                        ValidationIssue("HIGH", f"Question {i} missing metadata field: {metadata_field}", file_path)
                    )

            # 3. Check options and feedback
            options = re.findall(r"^\s*-\s*\[([ xX])\]\s*[A-D]\)", block, re.MULTILINE)
            correct_options = re.findall(r"^\s*-\s*\[[xX]\]\s*[A-D]\)", block, re.MULTILINE)

            if len(options) < 4:
                issues.append(
                    ValidationIssue("HIGH", f"Question {i} has only {len(options)} options, expected 4", file_path)
                )

            if len(correct_options) != 1:
                issues.append(
                    ValidationIssue(
                        "CRITICAL",
                        f"Question {i} must have exactly 1 correct option, found {len(correct_options)}",
                        file_path,
                    )
                )

            # 4. Check for feedback in ALL options
            feedback_tags = re.findall(r"<!--\s*feedback:.*?-->", block, re.IGNORECASE)
            if len(feedback_tags) < len(options):
                issues.append(
                    ValidationIssue(
                        "HIGH",
                        f"Question {i} missing feedback tags for some options (found {len(feedback_tags)} for {len(options)} options)",
                        file_path,
                    )
                )

            # 5. Check for placeholder content
            if "Question " + str(i) in block and len(block.strip()) < 100:
                issues.append(ValidationIssue("CRITICAL", f"Question {i} appears to be placeholder content", file_path))

        # Check difficulty distribution for Mastery bundles (20 questions)
        if is_mastery and actual_count == 20:
            expected_dist = {"D3-D4": 4, "D5-D6": 6, "D7-D8": 6, "D9-D10": 4}
            for dm, count in expected_dist.items():
                if difficulty_counts.get(dm) != count:
                    issues.append(
                        ValidationIssue(
                            "HIGH",
                            f"Invalid difficulty distribution for {dm}: expected {count}, found {difficulty_counts.get(dm)}",
                            file_path,
                        )
                    )

        if issues:
            valid = False

        return ValidationResult(valid, issues, warnings)

if __name__ == "__main__":
    import sys

    if len(sys.argv) < 2:
        print("Usage: python3 bundle_validator.py <file_path1> <file_path2> ...")
        sys.exit(1)

    validator = BundleValidator()
    all_valid = True

    for file_path in sys.argv[1:]:
        result = validator.validate_file(file_path)
        if not result.valid:
            all_valid = False
            print(f"\n❌ Validation failed for {file_path}:")
            for issue in result.issues:
                line_info = f" (line {issue.line})" if issue.line else ""
                print(f"  - [{issue.severity}] {issue.message}{line_info}")
        else:
            print(f"✅ {file_path} is valid")

        for warning in result.warnings:
            print(f"  - [WARNING] {warning}")

    if not all_valid:
        sys.exit(1)
