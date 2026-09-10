# [Ola C1.05] feat-cuentos-pages — Astro /cuentos index + [slug] SEO without JS

## Current State

Measured on repo root (`/home/belal/proyectosSWAL/apps/worldexams`, commit `594d19aee`):

- `saberparatodos/src/pages/cuentos*` does NOT exist (`ls` → No such file). The proven page pattern is `saberparatodos/src/pages/preguntas/[...slug].astro` (426 lines: frontmatter imports + `Astro.params`/`Astro.site` canonical, `Cache-Control: public, max-age=86400, s-maxage=604800, stale-while-revalidate=86400`, `Layout` wrapper, inline JSON-LD `Question`+`BreadcrumbList` via `<script is:inline set:html>`, `{cond && (...)}` rendering, `getStaticPaths`-free dynamic routing with manifest loaders).
- Data sources ready or in-flight: C1.03 `public/v1/cuentos/index.json + <slug>.json` (planned), C1.04 `EscenaSVG.svelte` + `tokens.css` (planned), seed `cuento.md` (100 lines, 8 pages) as the only real content, `Layout.astro` in `src/layouts/`. Only 1 cuento exists, so the index page initially lists 1 card — pagination/empty states must still be implemented, not skipped.
- SEO baseline in repo: per-page `title/description`, canonical via `canonicalFor`, JSON-LD scripts, Spanish content. No cuento route is indexed; no sitemap entry (sitemap expansion is C5.02 — here only correct meta + JSON-LD + semantic HTML per page).
- Stack facts: Astro `^7.3.1` (SSR on Cloudflare Workers, `dist/server/wrangler.json` deploy), no JS requirement — full page text must render in SSR HTML.

## Desired State

Delta: add ONE new island — `saberparatodos/src/pages/cuentos/` with `index.astro` (catalog: warm bone hero, age/valor filter chips as plain `<a>` links with query params handled server-side, one card per cuento from `index.json` with cover, title, edad, valor; zero client JS) and `[slug].astro` (full cuento: all 8–10 page texts + alts as semantic `<article>/<section>` HTML server-rendered WITHOUT JavaScript, `EscenaSVG` islands for scenes, quiz rendered as static `<details>`/`<ol>` with answers hidden until C2 reader hydrates, per-page `title/description/canonical`, `Book`-flavored JSON-LD + `BreadcrumbList`, `edad/valor` metadata). Both pages import `tokens.css` (bone theme, not edge-hive dark). `getStaticPaths()` from the catalog so every cuento is pre-rendered HTML. Slugs validated against catalog (unknown slug → 404, not a crash).

Hard constraints (apply to this issue and all C1 work): **BR-03/BR-07** — zero `$SWAL` tokens, zero karma, zero telemetry/analytics on kids pages (no analytics scripts, no ad slots, no trackers in these routes). Copyright headers required (footer notice `© 2026 SaberParaTodos / WorldExams` + `license` meta per page). Neutral Spanish only. Free Web Speech API only later (C2.02; no TTS calls here). NO Three.js anywhere in cuentos.

## Web Research Required

Agent MUST run at least 4 of these queries and cite results in the PR description:

1. `Astro getStaticPaths dynamic routes pre-render HTML no JavaScript`
2. `Astro client:visible vs static Svelte island partial hydration SEO`
3. `schema.org Book children read-aloud JSON-LD example`
4. `Astro 404 unknown dynamic slug redirect notFound response`
5. `semantic HTML article section details accessible static quiz`
6. `Astro Layout canonical alternates hreflang Spanish SEO`

## Agent Session Prompt

```text
You are implementing C1.05 (cuento Astro pages, SEO without JS) in the WorldExams monorepo at repo root.
READ FIRST, in this order, before writing any code:
1. saberparatodos/src/pages/preguntas/[...slug].astro lines 1-140 (page skeleton: frontmatter, Astro.params/site, Cache-Control, canonical, JSON-LD, Layout, && conditionals — imitate structure, NOT exam content)
2. saberparatodos/src/layouts/Layout.astro (props: title/description — check exact prop names before use)
3. docs/CUENTOS/01_DIRECCION_ARTE.md §1 + §6 (bone theme #FDF6EC, ink #3A2E2A, min 1.35rem/1.7 body, text in HTML never SVG)
4. docs/CUENTOS/02_COPYRIGHT_Y_FORMATO.md §1 (footer copyright notice per page)
5. C1.03 packs (saberparatodos/public/v1/cuentos/index.json + <slug>.json) IF merged — READ the real JSON shape; if unmerged, read questions_data/cuentos/tana-tucan-comparte/cuento.md directly with gray-matter in frontmatter (server-side only) and document the swap to packs in the PR
6. C1.04 EscenaSVG.svelte + tokens.css IF merged (embed scenes as static islands with JSON-serialisable props only; if unmerged, render <img> fallbacks to piezas paths and note the swap)

TASK: create saberparatodos/src/pages/cuentos/index.astro + saberparatodos/src/pages/cuentos/[slug].astro.
index.astro: SSR catalog from index.json (or seed fallback), hero + server-side filter chips (?edad=, ?valor= as links),
cards with cover/title/edad/valor/habitat linking to /cuentos/<slug>/, empty-state message, full meta + canonical.
[slug].astro: getStaticPaths() from catalog; unknown slug => return new Response(null,{status:404}) or Astro redirect
(check Layout/astro conventions in-repo first); render ALL page texts + alt attributes as static HTML (curl must show
full text with JS disabled), scenes via EscenaSVG (or <img> fallback), quiz as static <ol> with <details> answers
(no client JS: NO client:* directives needed for core content), JSON-LD Book + BreadcrumbList inline,
Cache-Control same as preguntas pattern, footer copyright notice. Import tokens.css for bone theme.
Neutral Spanish. No analytics/ads/trackers. No $SWAL/karma. No Three.js. Astro .astro syntax only ({&&, .map()}).
VERIFY: npm run build && node -e "fetch local preview" OR astro preview + curl checks: page HTML contains full seed text with JS disabled; grep -c 'application/ld+json' >= 1; unknown slug returns 404.
```

## Existing Code Patterns

- `saberparatodos/src/pages/preguntas/[...slug].astro` (426 lines): the canonical page skeleton — frontmatter data prep, `Astro.response.headers.set('Cache-Control', ...)`, `canonicalFor()` helper in `./_helpers`, `Layout title={} description={}`, JSON-LD set:html, breadcrumb `<nav aria-label>`, `{viewType === 'x' && (<section>...)}` branching.
- `saberparatodos/src/layouts/Layout.astro`: shared shell (read its props before use; do not fork a second layout for cuentos unless props truly cannot cover the bone theme — prefer a `theme="cuentos"` prop or scoped import of `tokens.css`).
- `saberparatodos/src/lib/country-manifest-loader.ts` (`getCountryManifest`, `getCountriesWithContent`): manifest-loader precedent — cuentos catalog loading should look like this (tiny `cuentos-catalog.ts` loader in `src/lib/cuentos/` is allowed as glue, re-exporting C1.01 types).
- `saberparatodos/src/components/AdBlock.svelte`: runes `$props()` — any `EscenaSVG` usage passes JSON-serialisable props only.
- `npm run build` (`astro build`, `prebuild` runs weekly packs generator — cuentos pages must not depend on weekly packs).

## Acceptance Criteria

Command-verifiable (run from repo root unless noted):

1. `test -f saberparatodos/src/pages/cuentos/index.astro && test -f saberparatodos/src/pages/cuentos/[slug].astro && echo OK`
2. `cd saberparatodos && npm run build` → exit 0; `find dist -path '*cuentos*' -name '*.html' | wc -l` → `>= 2` (`/cuentos/index` + `/cuentos/tana-tucan-comparte/`)
3. JS-disabled content: `grep -c 'Tana' dist/.../cuentos/tana-tucan-comparte/index.html` (resolve real dist path first) → `>= 5` AND full quiz question text present: `grep -c '¿Cuántos mangos' <file>` → `>= 1` — all in static HTML, no hydration needed
4. `grep -c 'application/ld+json' <slug-html>` → `>= 1` AND `grep -c 'BreadcrumbList' <slug-html>` → `>= 1`
5. `grep -c 'canonical' <slug-html>` → `>= 1` AND `<title>` contains the cuento title: `grep -c 'Tana la tucán' <slug-html>` → `>= 1`
6. Unknown slug 404: preview/build check — `node -e` fetch or `grep -riE '404|notFound|status.*404' src/pages/cuentos/\[slug\].astro` → `>= 1` (explicit 404 path, no unhandled throw)
7. `grep -riE 'client:|adsbygoogle|\$SWAL|karma|telemetry|three' saberparatodos/src/pages/cuentos/` → exit 1 (zero matches: no hydration directives needed, no ads/trackers/Three.js)
8. Bone theme: `grep -c 'FDF6EC\|tokens.css' saberparatodos/src/pages/cuentos/*.astro` → `>= 1`
9. UNLISTED (private sharing): `grep -c 'noindex' <slug-html>` → `>= 1` (meta robots noindex on index + slug pages; shareable by link, invisible to search)
10. `grep -rn "cuentos" saberparatodos/src/components/Header* saberparatodos/src/components/Nav* saberparatodos/src/layouts/* 2>/dev/null` → exit 1 (zero nav buttons/links to /cuentos anywhere in layout)
11. `grep -c "cuentos" dist/sitemap*.xml 2>/dev/null` → `0` or file absent (cuentos excluded from sitemap; verify against actual sitemap path)

## Files to Modify

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/pages/cuentos/index.astro` | NEW: SSR catalog + filters + cards, zero client JS | Low — new route, no collisions |
| `saberparatodos/src/pages/cuentos/[slug].astro` | NEW: `getStaticPaths`, full-text SSR, JSON-LD, 404 | Low — new route; must not break `npm run build` |
| `saberparatodos/src/lib/cuentos/cuentos-catalog.ts` | NEW glue loader (catalog → typed list) reusing C1.01 types if present | Low — additive; keep tiny |
| `saberparatodos/src/layouts/Layout.astro` | ONLY if a theme prop is strictly needed (prefer scoped `tokens.css` import) | Medium — shared shell; regression-test other pages via build |

## DO NOT touch

- `.gitcore/features.json` (reconciled at wave end, never inside issues)
- `questions_data/cuentos/**` content (read-only; C3 owns content)
- `saberparatodos/src/pages/preguntas/**` and other existing routes (read as patterns only)
- `saberparatodos/src/components/cuentos/arte/*` (C1.04 island — consume, do not redesign)
- `prebuild`/PWA/sitemap scope (C5.02/C5.03 own sitemap + offline pipeline)
- `clientes/`, `externos/`, `archivo/`, any `.env`/secrets, deploy workflows
- No `client:*` hydration for core content; no analytics/ads/Three.js/paid-TTS

## Anti-Hallucination Guard

1. READ before write: open `[...slug].astro` (skeleton), `Layout.astro` (exact prop names), and the real C1.03 JSON shape or seed `.md` before templating a single line — never guess field names (`paginas` vs `pages`, `titulo` vs `title`).
2. Svelte 5 runes only (`$props()`/`$state()`/`$effect()`) in any `.svelte` touched; `EscenaSVG` receives JSON-serialisable props only — no callbacks/stores across the Astro boundary.
3. Astro `.astro` has NO `{#if}`/`{#each}` syntax — use `{cond && (...)}` and `.map()`; a single `{#` in `.astro` fails this issue.
4. Absolute paths from repo root in comments, `getStaticPaths` data sourcing (anchor `fs` reads at repo-root `questions_data/` or `public/v1/cuentos/`), and PR text.
5. Svelte props JSON-serialisable — repeat offense check: quiz/page objects passed to islands contain only `string|number|boolean|arrays|plain objects`.
6. Unknown slugs 404 explicitly — never let `catalog.find()` return `undefined` into the template (guard + early 404 return, verified by the 404 acceptance check).

## PR Delivery Requirements

ANTI-EMPTY-PR (all must hold, else the PR is invalid):

- `git status --porcelain` non-empty AND diff-stat shows `>= 1` file; both `index.astro` and `[slug].astro` in the diff (single-page PRs are invalid for this issue).
- Never open a PR with zero changes or build-breaking changes (`npm run build` green is mandatory evidence).
- Test evidence `>= 20` lines / `>= 3` checks: a `cuentos-pages.test` (vitest hitting the catalog loader + frontmatter parsing) OR a verify shell script with `>= 3` curl/grep assertions on built HTML — paste real outputs (build log tail + grep counts) in the PR description.
- PR description cites web-research queries, shows JS-disabled content proof (curl excerpt with full page text), and confirms zero analytics/ads/`$SWAL`/Three.js strings.

## Verification

```bash
cd /home/belal/proyectosSWAL/apps/worldexams/saberparatodos
npm run build
find dist -path '*cuento*' -o -path '*cuento*' -name '*.html' | head
HTML=$(find dist -name '*.html' -path '*tana-tucan-comparte*' | head -1); echo "HTML=$HTML"
grep -c 'Tana' "$HTML"
grep -c '¿Cuántos mangos' "$HTML"
grep -c 'application/ld+json' "$HTML"
grep -c 'canonical' "$HTML"
grep -riE 'client:|adsbygoogle|\$SWAL|three' src/pages/cuentos/ && echo FORBIDDEN-FOUND || echo CLEAN
git status --porcelain && git diff --stat HEAD
```

## Dependencies & Merge Order

Wave C1 merges strictly 1→6:

1. C1.01 schema — page prop types + catalog loader types.
2. C1.02 validator — only validator-clean cuentos reach `getStaticPaths` (build should fail loudly on invalid content, reusing rule IDs).
3. C1.03 packs — `index.json`/`<slug>.json` are the preferred data source (fallback: read seed `.md` server-side; document which is used).
4. C1.04 art system — `EscenaSVG` + `tokens.css` embedded by both pages.
5. **C1.05 (this)** — blocks C2.01 (reader mounts on `[slug]`), C5.02 (SEO/sitemap expansion), C5.03 (offline scope covers these routes).
6. C1.06 license audit — footer/header strings asserted here get audited there.

## Failure Recovery

| Failure | Recovery |
|---------|----------|
| C1.03 packs unmerged (no JSON to read) | Server-side `gray-matter` read of `questions_data/cuentos/*/cuento.md` in frontmatter as documented fallback; swap to packs in C5 polish and note it in the PR |
| C1.04 unmerged (no `EscenaSVG`) | Render `<img src alt>` against planned piezas paths as fallback; do not invent a parallel art component — swap when C1.04 merges |
| `npm run build` breaks on `getStaticPaths` | Log the catalog resolution (paths anchored at repo root), fix data loading — never hardcode the 1-cuento list to force green; 404 path must still work |
| Layout prop mismatch (title/description names) | Re-read `Layout.astro` props; prefer scoped `tokens.css` import over forking Layout |
| Empty-PR risk (one page only) | Both `index.astro` AND `[slug].astro` must appear in `git diff --stat` before opening the PR |
