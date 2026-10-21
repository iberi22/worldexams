#!/usr/bin/env bash
# Print the commit a CI run should diff against: the merge-base with the nearest
# integration branch (develop or main). Feature branches are cut from develop, so
# diffing them against main re-validates everything develop already changed.
# The develop branch itself is compared with main, which is what a release ships.
set -euo pipefail
candidates=(main develop)
[ "${GITHUB_REF_NAME:-$(git rev-parse --abbrev-ref HEAD)}" = develop ] && candidates=(main)
best="" best_n=""
for b in "${candidates[@]}"; do
  git fetch --no-tags --depth=200 origin "$b" >/dev/null 2>&1 || continue
  mb=$(git merge-base "origin/$b" HEAD 2>/dev/null) || continue
  n=$(git rev-list --count "$mb..HEAD")
  if [ -z "$best_n" ] || [ "$n" -lt "$best_n" ]; then best=$mb best_n=$n; fi
done
echo "${best:-origin/main}"
