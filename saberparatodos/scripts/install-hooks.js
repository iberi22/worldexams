/**
 * Instala los hooks de .husky/ en .git/hooks/ del repo root.
 * Husky 9+ no funciona desde subdirectorios en monorepos,
 * así que copiamos manualmente los hooks versionados.
 */
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  existsSync,
  readdirSync,
} from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const hooksSrc = join(__dirname, "..", ".husky");
const gitHooks = join(__dirname, "..", "..", ".git", "hooks");

if (!existsSync(gitHooks)) {
  console.error("❌ .git/hooks not found at", gitHooks);
  process.exit(1);
}

const files = readdirSync(hooksSrc).filter(
  (f) => !f.startsWith("_") && !f.startsWith("."),
);
for (const file of files) {
  const src = join(hooksSrc, file);
  const dst = join(gitHooks, file);
  const content = readFileSync(src, "utf-8");
  // Wrap with cd to saberparatodos so hooks run in the right directory
  const wrapped = `#!/bin/sh\ncd "$(git rev-parse --show-toplevel)/saberparatodos" || exit 1\n${content}`;
  writeFileSync(dst, wrapped, "utf-8");
  console.log(`✅ Installed: .git/hooks/${file}`);
}

console.log("🎯 All hooks installed.");
