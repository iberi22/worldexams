# edge-mesh vendored (runtime ESM + types)

Vendored copy of the **built output** of `@iberi22/edge-mesh` from
`~/proyectosSWAL/cores/edge-mesh` (NOT the full source).

- Upstream commit: `a11797cd83dd69e90e66b9abaf52ac6449a4f20e`
- Upstream version: `1.0.0`
- Contents: `dist/` (compiled ESM + `.d.ts`, ~2.4 MB) + `LICENSE`
- Excluded on purpose: `src/`, `node_modules/`, `*.db`, tests, docs

## Why vendored here (not `file:` dep)

`npm` workspaces hoist `file:` deps to root `node_modules` WITHOUT rebasing
the relative target, producing a broken symlink and red `npm ci`
(incident 2026-09-23, red main). A relative import needs no resolver magic
and works identically in Vite, vitest, tsc and `npm ci`.

## Imported by

- `../p2p-edge-mesh.ts`: `from '../vendor/edge-mesh/dist/index.js'`

## Updating

1. Upstream: `npm run build` (regenerates `dist/`)
2. Copy `dist/` here (keep version/commit in sync below)
3. `npx tsc --noEmit --project saberparatodos/tsconfig.json` + `npx vitest run saberparatodos/src/lib/mesh/`

## What the core does NOT provide (verified)

- `SalonRegistry` / `SalonAd` → `../mesh/salon-directory.ts`
- `AiCore` / `createAiCore` → `../ai/__mocks__/edge-mesh-stub.ts`
- Do NOT fork the core here: changes belong upstream, then re-vendor.

## Upstream proposals (para el repo cores/edge-mesh, no implementar aquí)

1. **Barrel browser-safe**: `dist/index.js:51` re-exporta `RelayServer`
   (depende de `ws` de Node) y `storage/index.js:174` re-exporta
   `optimizer` (zstd/cbor). Cualquier bundler que importe el barrel en
   browser/jsdom rompe (probado: astro build + vitest). Propuesta: entrada
   `browser` en `exports` (nuevo `dist/browser.js` sin relay-server,
   polygon-bridge ni optimizer) o re-exports perezosos. Workaround local:
   imports profundos (`edge-mesh.js`, `salones/manager.js`, `chat/index.js`).
2. **Primitiva de directorio/anuncio**: el core descubre por PeerJS pero no
   publica salas; cada app reinventa el registry. Propuesta: `SalonDirectory`
   mínimo (announce TTL + listar) sobre el transporte existente.
3. **Señalización sin servidor PeerJS**: `PeerJSTransport` exige un servidor
   (propio o nube pública). Propuesta: transporte `MailboxTransport` sobre
   buzón efímero HTTP (patrón `/v1/mesh/relay` probado) para SDP + deltas.
