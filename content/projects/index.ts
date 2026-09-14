import { agentos } from "./agentos";
import { evalos } from "./evalos";
import { woe } from "./woe";
import type { Project, ProjectSection } from "./schema";

export const projects: Project[] = [agentos, evalos, woe];

const featured = projects.filter((p) => p.featured);
if (featured.length !== 1) {
  throw new Error(`content/projects: exactly one featured project required, found ${featured.length}`);
}
for (const p of projects) {
  const evidence = p.sections.filter((s): s is Extract<ProjectSection, { kind: "evidence" }> => s.kind === "evidence");
  for (const e of evidence) {
    if (e.items.length < 2 && e.pending !== true) {
      throw new Error(`content/projects/${p.slug}: evidence section requires >=2 items or pending: true`);
    }
    for (const item of e.items) {
      if (item.kind === "benchmark" && !item.provenance) {
        throw new Error(`content/projects/${p.slug}: benchmark evidence requires provenance`);
      }
    }
  }
}
