import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { projects } from "../content/projects";
import { education, CANONICAL_EDUCATION_ORDER } from "../content/experience";
import { site } from "../content/site";

const errors: string[] = [];
const fail = (msg: string) => errors.push(msg);

// 1. Canonical education order: RIMC → NDA → IIT Bombay (founder-locked)
const known = education.map((e) => e.institution).filter((i) => (CANONICAL_EDUCATION_ORDER as readonly string[]).includes(i));
if (known.join("|") !== CANONICAL_EDUCATION_ORDER.join("|")) {
  fail(`Education order violated: stored [${known.join(", ")}] — canonical is ${CANONICAL_EDUCATION_ORDER.join(" → ")}`);
}

// 2. Exactly one featured project
const featured = projects.filter((p) => p.featured);
if (featured.length !== 1) fail(`Exactly one featured project required, found ${featured.length}`);

// 3. Evidence rules
for (const p of projects) {
  for (const s of p.sections) {
    if (s.kind === "evidence") {
      if (s.items.length < 2 && s.pending !== true) fail(`${p.slug}: evidence needs >=2 items or pending:true`);
      for (const item of s.items) {
        if (item.kind === "benchmark" && !item.provenance) fail(`${p.slug}: benchmark "${item.label}" lacks provenance`);
      }
    }
    if (s.kind === "architecture" && s.figure && (!s.figure.alt || s.figure.alt.trim() === "")) {
      fail(`${p.slug}: architecture figure requires non-empty alt`);
    }
  }
}

// 4. No [CONTENT REQUIRED] in the render path
const grep = (dir: string) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) grep(full);
    else if (/\.(tsx|ts)$/.test(entry.name) && readFileSync(full, "utf8").includes("[CONTENT REQUIRED]")) {
      fail(`Render path contains [CONTENT REQUIRED]: ${full}`);
    }
  }
};
if (existsSync("app")) grep("app");
if (existsSync("components")) grep("components");

// 5. LIFE must not exist as a route in V1
if (existsSync("app/life")) fail("app/life exists — LIFE is out of V1 scope (reserved in content/site.ts only)");

// 6. No "#" placeholder hrefs
const hashGrep = (dir: string) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) hashGrep(full);
    else if (/\.(tsx|ts)$/.test(entry.name)) {
      const src = readFileSync(full, "utf8");
      if (/href=["']#["']/.test(src)) fail(`Placeholder href="#" in ${full}`);
    }
  }
};
if (existsSync("app")) hashGrep("app");
if (existsSync("components")) hashGrep("components");

// 7. Reserved destinations must never render
if (site.destinations.some((d) => d.status === "reserved" && existsSync(join("app", d.href.replace("/", ""))))) {
  fail("A reserved destination has a route directory");
}

if (errors.length) {
  console.error("content-lint FAILED:\n" + errors.map((e) => `  ✗ ${e}`).join("\n"));
  process.exit(1);
}
console.log("content-lint: all invariants pass");
