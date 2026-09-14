import type { Metadata } from "next";
import { projects } from "@/content/projects";
import { ProjectRow } from "@/components/ui/ProjectRow";

export const metadata: Metadata = { title: "Work" };

export default function WorkPage() {
  return (
    <div className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <p className="mono-label mb-2">Work</p>
      <h1 className="mb-10 font-display text-4xl font-bold tracking-tight md:text-5xl">Selected Work</h1>
      <div className="border-b border-divider">
        {projects.map((p) => (
          <ProjectRow key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
