# [Ola C5.02] feat-cuentos-seo-sitemap: per-story SEO/OG + sitemap + age/value metadata

## 1. Current State (measurable)

- `saberparatodos/src/pages/cuentos*` (planned C1.05: `/cuentos` index + `/cuentos/[slug]` story pages, Astro, SEO without JS) has no per-story meta layer: 0 Open Graph tags, 0 Twitter cards, 0 JSON-LD blocks, 0 age/value metadata in the cuentos section.
- No cuentos URLs are present in any sitemap: `grep -r "cuentos" saberparatodos/public/sitemap*.xml saberparatodos/src/pages/sitemap* 2>/dev/null` → 0 matches (verify exact sitemap mechanism on-branch; Astro sites in this repo serve static SEO from `public/`).
- Waves C1–C4 are planned dependencies: C1.05 pages + C1.03 static packs (`public/v1/cuentos/<slug>.json` with `slug/titulo/edad/valor`), C3–C4 10 `cuento.md` files with frontmatter (`titulo, edad "3-4", eje, habitat, valor`). Story metadata for SEO must be derived from that frontmatter/pack data — never hardcoded duplicates.
- Hard constraints: BR-03 (SEO layer adds zero trackers, zero pixels, zero telemetry scripts), BR-07 (stories stay free, no login-gated meta redirects). Copyright headers per `02_COPYRIGHT_Y_FORMATO.md` §1; all visible strings neutral Spanish (§2).

## 2. Desired State

- `/cuentos` index: title + meta description in neutral Spanish, canonical URL, OG type `website` with a single static OG image (pure SVG-derived asset already in `public/`, no new binary blobs >50KB).
- `/cuentos/[slug]` (all 10 slugs): per-story `<title>` (`<titulo> | Cuentos SaberParaTodos`), meta description (1–2 neutral-Spanish sentences, ≤160 chars, derived from story data), canonical `/cuentos/<slug>`, OG `article` tags (`og:title/og:description/og:image/og:locale es_ES`), Twitter `summary_large_image`, JSON-LD `Book`/`CreativeWork` block with `inLanguage: es`, `typicalAgeRange` (from `edad`, e.g. `"3-4"`), `teaches`/`about` (from `valor` + `eje`), `isAccessibleForFree: true`, `license` noting free-read/all-rights-reserved.
- Sitemap: all 10 story URLs + `/cuentos` index included with `lastmod` + `changefreq="monthly"`; `robots.txt` references the sitemap (edit only if robots lives in `public/`).
- No-JS guarantee (C1.05 rule): all tags server-rendered in `.astro` (`Astro.props` only), zero client scripts added. `curl` on built HTML shows full meta without executing JS.
- Build-time generation preferred: derive tags from the same data source C1.03/C1.05 use (frontmatter or static pack JSON), so new stories inherit SEO automatically.

## 3. Web Research (4–6 sources)

1. Google Search Central — Meta descriptions & title best practices: unique per page, ≤160 chars description, no keyword stuffing; applies to story pages. https://developers.google.com/search/docs/appearance/title-link
2. Open Graph protocol (ogp.me) — required `og:title/og:type/og:image/og:url` + `article:` extensions for story content. https://ogp.me/
3. Schema.org — `Book` / `CreativeWork`: `inLanguage`, `typicalAgeRange`, `teaches`, `isAccessibleForFree`, `license` properties for children's content. https://schema.org/Book
4. Google Search Central — Sitemaps protocol: `<urlset>` with `<loc>`, `<lastmod>`, `<changefreq>`; declare in `robots.txt`; 50k URL limit (10 stories trivially fit). https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap
5. Astro docs — `<head>` in `.astro` pages + `Astro.props`/`getStaticPaths` for static per-slug rendering; zero-JS output by default. https://docs.astro.build/en/basics/astro-pages/
6. W3C / Google — `canonical` link element to prevent duplicate-content penalties between index excerpts and story pages. https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls

## 4. Agent Session Prompt

> You are implementing C5.02 (feat-cuentos-seo-sitemap) in `/home/belal/proyectosSWAL/apps/worldexams/saberparatodos`.
> Context: read `docs/CUENTOS/00_BIBLIA.md` (10 slugs/titles/ages/values), `02_COPYRIGHT_Y_FORMATO.md` (§1–§2), `WAVE_PLAN.md` (C5 table). Prior waves provide: `src/pages/cuentos*` (C1.05, Astro, SEO-without-JS), static packs `public/v1/cuentos/<slug>.json` (C1.03), 10 `questions_data/cuentos/<slug>/cuento.md` (C3–C4).
> Task: (1) inspect how C1.05 pages load story data and how the repo serves sitemap/robots (check `public/` and `astro.config.mjs`); reuse that mechanism. (2) add per-story head tags in the `[slug]` page: title, description ≤160 chars neutral Spanish, canonical, OG article set, Twitter card, JSON-LD CreativeWork with typicalAgeRange (from edad), teaches/about (from valor/eje), isAccessibleForFree true. (3) add index-level tags on `/cuentos`. (4) register all 11 URLs in the sitemap with lastmod/changefreq; reference from robots.txt if it lives in public/. (5) build (`npm run build`) and verify with curl on dist output that meta exists without JS, descriptions ≤160 chars, JSON-LD parses. Constraints: BR-03 (no tracker/pixel scripts), BR-07 (no gated URLs), neutral Spanish (veto grep on all new strings), Astro files contain zero JSX/Svelte syntax, absolute imports from root. Do NOT touch `features.json`. Deliver a PR with curl evidence + validator green + desktop/mobile screenshots of one story page head rendering (view-source excerpt).

## 5. Existing Code Patterns

- C1.05 pages (planned): `saberparatodos/src/pages/cuentos*.astro` — Astro static pages, `getStaticPaths` over the 10 slugs, SEO without JS. Add head tags inside the existing layout/head slot; do not create a parallel layout.
- C1.03 packs (planned): `public/v1/cuentos/<slug>.json` — canonical machine-readable story fields (`titulo, edad, valor, eje`); read these (or the same loader C1.05 uses) at build time for meta values. Single source of truth, no duplicated strings.
- Repo `public/` conventions: `favicon.svg`, `_headers`, `robots`-style static files live in `saberparatodos/public/`; follow the existing sitemap mechanism found there (extend, don't replace).
- Frontmatter ages: `edad: "3-4" | "4-5" | "4-6" | "5-6"` → map verbatim to `typicalAgeRange`. Values (`compartir`, `paciencia`, …) → `teaches` in neutral Spanish.
- Copyright: meta/short strings don't need the full header, but any new partial/layout file keeps the repo's license header convention if one exists for `.astro`.

## 6. Acceptance Criteria (command-verifiable)

1. `npm run build` (in `saberparatodos/`) → success; `grep -rl "cuentos/" dist/sitemap*.xml` or the repo's sitemap output → contains 11 cuentos URLs (index + 10 stories). Paste the count: `grep -c "cuentos" <sitemap> ` → ≥11.
2. For EACH of the 10 slugs: `grep -o "<title>[^<]*</title>" dist/cuentos/<slug>/index.html` → non-empty, contains story title; `grep -c 'property="og:' dist/cuentos/<slug>/index.html` → ≥4; `grep -c 'application/ld+json' dist/cuentos/<slug>/index.html` → ≥1. (Script it in a loop; paste full loop output.)
3. `python3 -c "import json,glob; [json.load(open(f)) for f in glob.glob('dist/cuentos/*/index.html')]"` is N/A for HTML — instead: extract each LD+JSON block and `python3 -m json.tool` must parse; `typicalAgeRange` matches frontmatter `edad`, `isAccessibleForFree` is true. Paste one parsed block + a grep proving all 10 contain `typicalAgeRange`.
4. Meta descriptions ≤160 chars: `grep -o 'name="description" content="[^"]*"' dist/cuentos/*/index.html | awk -F'"' '{print length($4)}' | sort -n | tail -1` → ≤160.
5. `grep -rEn "gtag|analytics|facebook.net|pixel|plausible|posthog|hotjar" src/pages/cuentos* ` → exit 1 (BR-03: no trackers added).
6. `grep -rEn "<script" dist/cuentos/tana-tucan-comparte/index.html` → exit 1 or only pre-existing scripts (no-JS SEO guarantee; compare against pre-change build if scripts exist).
7. `node scripts/validate_cuentos.js` → 0 errors, 10/10 (no regression).
8. Neutral-Spanish veto grep over all new/edited strings → exit 1.

## 7. Files + Risk

| File | Change | Risk |
|------|--------|------|
| `saberparatodos/src/pages/cuentos/[slug].astro` (or C1.05 equivalent path) | EDIT — head tags + JSON-LD | Medium — touches the story template; keep logic build-time only |
| `saberparatodos/src/pages/cuentos/index.astro` (or equivalent) | EDIT — index-level tags | Low |
| Sitemap source (`public/sitemap*.xml` or generator — use what exists) | EDIT — add 11 URLs | Low — additive only |
| `saberparatodos/public/robots.txt` | EDIT — only if it exists and lacks sitemap ref | Low |
| Shared SEO partial/layout (only if C1.05 has one; else inline) | EDIT/NEW | Low |

Rollback: revert head/sitemap hunks; no content or schema changes involved. Risk: diverging meta strings from story data — mitigate by deriving from packs/frontmatter, never hand-typing titles.

## 8. DO NOT Touch

- `.gitcore/features.json` and any `features.json`.
- `questions_data/cuentos/**`, `src/lib/cuentos/logros*` (C5.01 island), `public/v1/cuentos/**` pack artifacts, `scripts/validate_cuentos.js`, service worker / PWA scope (C5.03 island).
- Reader components, quiz logic, Supabase/auth, `.env`/secrets, CI workflows, `package.json` deps.
- No new JS frameworks, no SEO plugins adding runtime scripts; no binary image blobs >50KB in `public/` (reuse existing SVG-derived assets).
- Any files outside the island listed in §7.

## 9. Anti-Hallucination (minimum 4)

1. Do NOT invent the sitemap mechanism — inspect `public/` + `astro.config.mjs` and extend what exists; state in the PR which mechanism you used with file paths.
2. Do NOT hand-type story titles/descriptions from memory — derive from frontmatter/packs; paste the extraction command and diff-check one title against `cuento.md`.
3. Do NOT claim "renders without JS" without evidence — paste the `curl`/dist grep output per §6 criteria 2–6.
4. Do NOT claim JSON-LD validity without parsing — paste `python3 -m json.tool` output for at least one block and the `typicalAgeRange` ×10 grep.
5. Do NOT report validator green without pasting full stdout (10/10).

## 10. PR Delivery Requirements (anti-empty-PR + test-nonempty)

- The PR must contain: real head-tag code in the story template + index (no placeholder meta), sitemap entries for all 11 URLs, and verification evidence (build log tail, sitemap count, per-slug loop output, JSON-LD parse, no-tracker grep, validator stdout, view-source excerpt screenshot).
- This issue is markup-heavy; the "test-nonempty" bar is met by the scripted per-slug verification loop (§6.2–6.4) pasted in full — a PR with only "added meta tags" prose and no loop output will be rejected.
- PR title: `[C5.02] feat-cuentos-seo-sitemap: per-story SEO/OG + sitemap + age/value metadata`. Body: mechanism used, source-of-truth for meta values, full verification pastes, validator output, screenshots.
- No merge if any story page lacks OG/JSON-LD, any description exceeds 160 chars, or a tracker string appears in the diff.

## 11. Verification (bash)

```bash
cd /home/belal/proyectosSWAL/apps/worldexams/saberparatodos
npm run build
SITEMAP=$(grep -rl "cuentos" dist/sitemap*.xml public/sitemap*.xml 2>/dev/null | head -1); echo "SITEMAP=$SITEMAP"
grep -c "cuentos" "$SITEMAP"
for s in tana-tucan-comparte bruno-zorro-paciencia nieve-osa-hielo zara-jirafa-mira lila-tortuga-red puente-roto-pipo-mia vela-semilla-luna don-emilio-mina lucia-puentes tomas-casa-arbol; do
  f="dist/cuentos/$s/index.html"
  echo "== $s =="; grep -o "<title>[^<]*</title>" "$f"; grep -c 'property="og:' "$f"; grep -c 'application/ld+json' "$f"
done
grep -o 'name="description" content="[^"]*"' dist/cuentos/*/index.html | awk -F'"' '{print length($4)}' | sort -n | tail -1
python3 - <<'EOF'
import re, json, glob
files = sorted(glob.glob('dist/cuentos/*/index.html'))
assert len(files) == 10, files
for f in files:
    html = open(f, encoding='utf-8').read()
    blocks = re.findall(r'application/ld\+json">(.*?)</script>', html, re.S)
    assert blocks, f
    for b in blocks:
        d = json.loads(b)
        assert d.get('typicalAgeRange'), f
        assert d.get('isAccessibleForFree') is True, f
print('JSON-LD OK x10')
EOF
grep -rEn "gtag|analytics|facebook.net|pixel|plausible|posthog|hotjar" src/pages/cuentos*; test $? -eq 1 && echo "BR-03 OK"
node scripts/validate_cuentos.js
git status --porcelain
```

## 12. Dependencies & Merge Order (C5 after C1–C4 + internal 1–4)

- Wave C5 merges only after C1–C4 (needs C1.05 page templates, C1.03 pack fields, C3–C4 frontmatter for all 10 stories).
- Internal C5 order: **C5.02 is position 02 (1→4)** — independent of C5.01, may run in parallel with it; must merge before C5.04 (final audit re-crawls meta + sitemap). No dependency on C5.03.
- If C1.05 templates differ from the assumed `src/pages/cuentos/` paths, adapt to actual paths and record them in the PR; do not restructure routes.

## 13. Failure Recovery

- Build breaks on JSON-LD escaping (quotes in Spanish strings) → use `JSON.stringify` at build time / Astro expression interpolation, never hand-escaped literals; validate with the §11 python block.
- Sitemap mechanism differs from assumption → stop, inspect, extend the real one; never add a second competing sitemap.
- Description >160 chars → trim at build time with a helper + test the longest story (`tomas-casa-arbol` / `don-emilio-mina` titles are longest); re-run the awk check.
- Same-file collision with C5.01/C5.03 → C5.02 owns only `<head>`/sitemap hunks; rebase and keep hunks disjoint; never touch reader or SW files to "fix" SEO.
