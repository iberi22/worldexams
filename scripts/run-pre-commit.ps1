# Run pre-commit checks manually
pre-commit run --all-files --config .pre-commit-config.yaml
if ($LASTEXITCODE -ne 0) {
    Write-Host "Pre-commit checks failed. Fix above errors before committing."
    exit 1
}
