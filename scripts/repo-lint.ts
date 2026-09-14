import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

// 1. File-length policy (senior-SWE hygiene, founder directive)
const MAX_LINES: Record<string, number> = {
  app: 250,
  components: 250,
  lib: 250,
  scripts: 250,
  styles: 250,
  content: 400,
};

function walk(dir: string, exts: string[], out: string[] = []): string[] {
  if (!existsSync(dir)) return out;
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, exts, out);
    else if (exts.some((e) => entry.name.endsWith(e))) out.push(full);
  }
  return out;
}

for (const [dir, limit] of Object.entries(MAX_LINES)) {
  for (const file of walk(dir, [".ts", ".tsx", ".css"])) {
    const lines = readFileSync(file, "utf8").split("\n").length;
    if (lines > limit) fail(`${file}: ${lines} lines exceeds ${limit}-line limit — split the module`);
  }
}

// 2. Closed client-component boundary (architecture drift protection)
const ALLOWED_CLIENT = new Set([
  "app/template.tsx",
  "app/error.tsx",
  "components/layout/MobileNav.tsx",
  "components/home/Boot.tsx",
  "components/home/PhotoRecession.tsx",
  "components/motion/Reveal.tsx",
]);

const tsxFiles = [...walk("app", [".tsx"]), ...walk("components", [".tsx"])];
for (const file of tsxFiles) {
  const rel = relative(".", file);
  if (readFileSync(file, "utf8").startsWith('"use client"') && !ALLOWED_CLIENT.has(rel)) {
    fail(`${rel}: "use client" outside the closed boundary — amend docs/ARCHITECTURE.md + DECISIONS.md first`);
  }
}

// 3. No console.log in production code
for (const file of [...walk("app", [".ts", ".tsx"]), ...walk("components", [".ts", ".tsx"])]) {
  if (/console\.log/.test(readFileSync(file, "utf8"))) fail(`${file}: console.log in production code`);
}

// 4. Master README must exist and keep its required references
const README_REQUIRED = ["npm run verify", "docs/ARCHITECTURE.md", "docs/DECISIONS.md", "docs/CONTENT.md"];
if (!existsSync("README.md")) {
  fail("README.md missing — the repo needs a landing document");
} else {
  const readme = readFileSync("README.md", "utf8");
  for (const needle of README_REQUIRED) {
    if (!readme.includes(needle)) fail(`README.md: missing required reference "${needle}"`);
  }
}

if (errors.length) {
  console.error("repo-lint FAILED:\n" + errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log(`repo-lint: hygiene pass (${[...walk("app", [".ts", ".tsx"]), ...walk("components", [".ts", ".tsx"])].length} source files checked)`);
