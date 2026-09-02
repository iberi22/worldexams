# [Ola 5.01] feat-neurogym-webgpu-engine — WebGPU 3D Interactive Spatial & Physics Game Engine

> Ola 5 — NeuroGym WebGPU & 3D Spatial Learning.
> Labels: `ola5`, `wave-5`, `neurogym`, `webgpu`

---

## Current State (MEDIBLE)
- Directory: `saberparatodos/src/lib/neurogym/` exists with 2D/SVG stimuli.
- Tests: 73 test suites passing (575 tests).

## Desired State (DELTA)
- **Specific Addition**: Implement `saberparatodos/src/lib/neurogym/webgpu-spatial-engine.ts` utilizing hardware-accelerated WebGPU compute shaders and render pipelines (with WebGL2/Canvas2D fallback) for 3D mental rotation puzzles, particle-based physics simulations and spatial reasoning games at 60-120 FPS with sub-millisecond input latency.
- **File Target**: `saberparatodos/src/lib/neurogym/webgpu-spatial-engine.ts`

## Acceptance Criteria (VERIFICABLES POR COMANDO)
- [ ] `npm run test:unit -w saberparatodos` — 0 errors, all tests pass
- [ ] `grep -rn "WebGPUSpatialEngine" saberparatodos/src/lib/neurogym/` >= 1 match
- [ ] Detects `navigator.gpu` availability and provides fallback graceful pipeline.
