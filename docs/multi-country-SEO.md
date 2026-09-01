# Multi-Country SEO & Static Pack Distribution Strategy

## Overview
WorldExams operates across 20 Spanish and Portuguese speaking countries (CO, MX, PE, CL, EC, AR, GT, BR, ES, PA, GQ, NI, DO, CR, HN, UY, PY, PR, SV, BO). To maximize organic reach and maintain fast offline-first loading performance, the platform implements localized tenant SEO metadata and automated static pack CDN distribution.

---

## 1. Multi-Tenant SEO Architecture

### HTML Head Metadata & Localization
Each country domain / route tenant dynamically injects localized meta tags:
- **Title**: Expresses the localized national exam authority (e.g. `ICFES Saber 11 - Colombia`, `PAES - Chile`, `Exani-II - México`).
- **Description**: Target curriculum, grade levels, and exam preparation objectives tailored to local terminology.
- **hreflang Tags**: Alternate country mappings pointing to localized URLs or subdomains.

```html
<link rel="alternate" hreflang="es-CO" href="https://colombia.worldexams.org/" />
<link rel="alternate" hreflang="es-MX" href="https://mexico.worldexams.org/" />
<link rel="alternate" hreflang="es-CL" href="https://chile.worldexams.org/" />
<link rel="alternate" hreflang="x-default" href="https://worldexams.org/" />
```

### Sitemap Per Tenant / Country
- Automatic sitemap index generation splits URLs by country code (`sitemap-co.xml`, `sitemap-mx.xml`, etc.).
- Static routes and weekly exam practice pages are indexed per grade level and subject.

---

## 2. Static Pack CDN Publishing & Distribution

- **Total Static Packs Verified:** **3898** static JSON question packs generated across all weekly curriculum bundles.
- **Colombia Weekly Packs (`co-week-*`):** **1302** static packs deployed under `apps/worldexams-api/public/v1/packs/`.
- **CDN Edge Caching:** Static packs are served directly from Cloudflare Pages / CDN Edge cache with immutable cache headers (`Cache-Control: public, max-age=31536000, immutable`).
- **Build & Sync Command:**
  ```bash
  node saberparatodos/scripts/generate-static-packs.js --all-weekly --changed-only
  ```

---

## 3. Legacy Format Deprecation Warnings

- **Legacy Protocols (< v3.0):** Deprecated. Files in `questions_data/*/legacy/` or duplicated period paths are filtered out during static pack compilation.
- **Deprecation Warning Notice:** API consumers attempting to fetch legacy pack paths without protocol header `X-Bundle-Protocol: 5.2` receive HTTP 410 Gone / Deprecation headers urging migration to `v1/packs/{country}-week-{N}-grade-{G}-subject-{S}.json`.
