cd E:\scripts-python\worldexams\saberparatodos
npm run test:unit
$exit = $LASTEXITCODE
if ($exit -ne 0) { exit $exit }
git add .
git commit -m "deps: audit fix --force (uuid CVE fix, trystero 0.23.1)"