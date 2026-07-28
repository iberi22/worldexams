# GEO-ROUTING.md — Geo-Detection & Country Routing for saberparatodos.space

## Status: Implemented (updated 2026-07-28)

## 1. IP Country Detection

**Priority order** ([`src/middleware.ts`](../src/middleware.ts)):

1. `?country=XX` query (if in `ALL_CONFIGURED_CODES`)
2. Cookie `spt_country`
3. Cloudflare `CF-IPCountry` / `cf-ipcountry`
4. `ip-api.com` via `cf-connecting-ip` / `x-forwarded-for` (dev / non-CF)
5. **Accept-Language fallback** (when geo unknown):
   - `pt*` → `BR`
   - `es*` → `ES` (generic Spanish UI carrier + CountrySwitcher)
   - else → site configured product country (CO for saberparatodos.space)

**Important:** middleware no longer forces CO before geo resolution.

## 2. Content gate

`Astro.locals.countryHasContent` is set from `countriesWithContent`.
When `false`, [`ContentComingSoon.astro`](../src/components/ContentComingSoon.astro) shows a generic “banco en expansión” UI + country switcher.

## 3. Pack loading

[`pack-fetcher.ts`](../src/lib/pack-fetcher.ts) uses **runtime** `#api-config.countryCode` (not only build-time `PUBLIC_COUNTRY`) so PE/CL visitors fetch `pe-` / `cl-` packs.

## 4. Manual override

- CountrySwitcher / CountryBanner → cookie `spt_country`
- Smoke: `https://saberparatodos.space/?country=PE` or `?country=CL`

## 5. Supported runtime codes

See `saberparatodos/src/config/countries.config.ts` → `RUNTIME_COUNTRY_CODES`.

Chile product exam label is **PAES** (DEMRE); SIMCE remains diagnostic metadata only.
