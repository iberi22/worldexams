import sys
from bundle_validator import BundleValidator

validator = BundleValidator()
result = validator.validate_file(sys.argv[1])
print(f"Valid: {result.valid}")
for issue in result.issues:
    print(f"{issue.severity}: {issue.message}")
for warning in result.warnings:
    print(f"WARNING: {warning}")
