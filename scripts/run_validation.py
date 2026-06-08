import sys
from bundle_validator import BundleValidator

validator = BundleValidator()
all_valid = True
files = sys.argv[1:]

for file_path in files:
    result = validator.validate_file(file_path)
    if not result.valid:
        all_valid = False
        print(f"FAIL: {file_path}")
        for issue in result.issues:
            print(f"  [{issue.severity}] {issue.message}")
    else:
        print(f"PASS: {file_path}")

if not all_valid:
    sys.exit(1)
