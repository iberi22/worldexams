# Remaining CVEs — saberparatodos

_Audit date: 2026-04-25_

## Summary

9 moderate severity CVEs remain. **None are safe to ignore** — all are moderate severity.

- **postcss** — 5 vulnerabilities via `@remotion/*` chain (requires SemVer-major upgrade)
- **yaml** — 4 vulnerabilities via `@astrojs/language-server` chain (fix available, no breaking change)

---

## CVE Details

### 1. postcss — XSS via Unescaped `</style>` in CSS Stringify Output

**Advisory:** https://github.com/advisories/GHSA-qx2v-qp2m-jg93
**Severity:** moderate
**Affected versions:** `<8.5.10`

**Dependency chain:**
```
@remotion/cli
  └── @remotion/studio-server
       └── @remotion/bundler  4.0.439 - 4.0.451
            └── postcss (vulnerable)
```

**Fix:** `npm audit fix --force`
⚠️ **This is a breaking change** — will install `@remotion/cli@4.0.438`.

**Action required:** Upgrade `@remotion/cli` to a patched version. Check if a newer non-breaking patch release exists, or accept the major-version upgrade path.

---

### 2. yaml — Stack Overflow via deeply nested YAML collections

**Advisory:** https://github.com/advisories/GHSA-48c2-rrv3-qjmp
**Severity:** moderate
**Affected versions:** `2.0.0 - 2.8.2`

**Dependency chain:**
```
@astrojs/check
  └── @astrojs/language-server  >=2.14.0
       └── volar-service-yaml
            └── yaml-language-server  1.11.1 - 1.22.1
                 └── yaml (vulnerable)
```

**Fix:** `npm audit fix` (no `--force` needed — non-breaking)
✅ **Safe to fix without breaking changes.**

**Action required:** Run `npm audit fix` to patch yaml.

---

## Upgrade Path Summary

| CVE | Package | Fix Command | Breaking? | Priority |
|-----|---------|-------------|-----------|----------|
| GHSA-qx2v-qp2m-jg93 | postcss (via @remotion/*) | `npm audit fix --force` | ⚠️ YES | Medium — requires @remotion upgrade |
| GHSA-48c2-rrv3-qjmp | yaml (via @astrojs/language-server) | `npm audit fix` | ❌ NO | High — run now, no risk |

---

## Notes

- The postcss fix is gated behind `@remotion/cli@4.0.438`, which is a **breaking change** for the Remotion video pipeline. Assess whether Remotion is actively used in this project before applying.
- The yaml fix is safe and should be applied immediately via `npm audit fix` (without `--force`).
- After applying each fix, re-run `npm audit` to confirm resolution.
