@echo off
REM Build script for World Exams API
REM Creates dist/ folder and copies v1/ and functions/ into it

echo Building WorldExams API...

REM Create dist directory
if not exist dist mkdir dist
echo [OK] Created dist directory

REM Copy v1 folder
if exist v1 (
    xcopy v1 dist\v1 /E /I /Y > nul
    echo [OK] Copied v1 folder
) else (
    echo [WARN] v1 folder not found
)

REM Copy functions folder
if exist functions (
    xcopy functions dist\functions /E /I /Y > nul
    echo [OK] Copied functions folder
) else (
    echo [WARN] functions folder not found
)

REM Copy wrangler.toml
if exist wrangler.toml (
    copy wrangler.toml dist\wrangler.toml > nul
    echo [OK] Copied wrangler.toml
)

REM Show dist structure
echo.
echo Verifying build output:
dir /S dist | find /C ":" > nul
if errorlevel 0 (
    echo [OK] dist folder created with files
) else (
    echo [ERROR] dist folder is empty
    exit /b 1
)

echo.
echo Build complete!
