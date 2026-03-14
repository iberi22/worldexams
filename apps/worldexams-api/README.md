# WorldExams API Worker

Cloudflare Worker gateway for the `worldexams` monorepo.

## Ownership

This package owns:

- premium/public API routing
- API-key aware gateway logic
- worker-local Wrangler configuration

This package does not own:

- product UI
- exam runtime pages
- product-local Supabase functions

Those belong in `saberparatodos/`.

## Commands

```bash
npm run dev -w @worldexams/worldexams-api
npm run build -w @worldexams/worldexams-api
```
