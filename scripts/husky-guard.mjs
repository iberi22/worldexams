import { execFileSync, execSync } from "node:child_process";
import fs from "node:fs";

const mode = process.argv.includes("--staged") ? "staged" : "changed";
const root = process.cwd();

function run(command, args, options = {}) {
  return execFileSync(command, args, {
    cwd: root,
    encoding: "utf8",
    stdio: options.stdio || "pipe",
  });
}

function gitLines(args) {
  const output = run("git", args).trim();
  return output ? output.split(/\r?\n/).filter(Boolean) : [];
}

function unique(values) {
  return Array.from(new Set(values));
}

function existingMarkdown(files) {
  return unique(files).filter(
    (file) =>
      file.startsWith("questions_data/") &&
      file.endsWith(".md") &&
      !file.endsWith("/README.md") &&
      fs.existsSync(file),
  );
}

function changedFiles() {
  if (mode === "staged") {
    return gitLines(["diff", "--cached", "--name-only", "--diff-filter=ACMR"]);
  }

  try {
    return gitLines(["diff", "--name-only", "--diff-filter=ACMR", "origin/main...HEAD"]);
  } catch {
    return gitLines(["diff", "--name-only", "--diff-filter=ACMR", "HEAD~1...HEAD"]);
  }
}

function assertNoForbiddenContentArtifacts(files) {
  const forbidden = files.filter(
    (file) =>
      /\.(log|prompt|tmp)$/i.test(file) ||
      file.startsWith(".worldexams/") ||
      file.startsWith("scratch/") ||
      file.startsWith("temp/") ||
      file.startsWith("reports/"),
  );

  if (!forbidden.length) return;

  console.error("Forbidden generated artifacts detected:");
  forbidden.forEach((file) => console.error(`  - ${file}`));
  process.exit(1);
}

function assertGeneratedPacksCommitted() {
  const packDiff = gitLines([
    "status",
    "--short",
    "--",
    "apps/worldexams-api/public/v1/packs",
  ]);

  if (!packDiff.length) return;

  console.error("Weekly bundle changes generated API packs that are not committed:");
  packDiff.forEach((line) => console.error(`  ${line}`));
  console.error("Stage the generated pack JSON files before pushing.");
  process.exit(1);
}

const files = changedFiles();
assertNoForbiddenContentArtifacts(files);

const bundleFiles = existingMarkdown(files);
if (bundleFiles.length) {
  console.log(`Validating ${bundleFiles.length} weekly bundle file(s)...`);
  run("node", ["scripts/validate-bundles-v52.mjs", ...bundleFiles], { stdio: "inherit" });
} else {
  console.log("No changed weekly bundle markdown files to validate.");
}

if (mode === "changed" && bundleFiles.length) {
  console.log("Regenerating changed weekly static packs...");
  run("node", [
    "saberparatodos/scripts/generate-static-packs.js",
    "--all-weekly",
    "--changed-only",
    "--api-only",
  ], { stdio: "inherit" });
  assertGeneratedPacksCommitted();
}

console.log(`Husky guard passed (${mode}).`);
