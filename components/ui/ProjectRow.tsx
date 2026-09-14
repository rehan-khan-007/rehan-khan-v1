import Link from "next/link";
import type { Project } from "@/content/projects/schema";

export function ProjectRow({ project }: { project: Project }) {
  return (
    <Link
      href={`/work/${project.slug}`}
      data-track={`project_open_${project.slug}`}
      className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 border-t border-divider py-6 transition-colors hover:border-accent/40 md:py-8"
    >
      <span className="font-mono uppercase text-index text-neutral-500 group-hover:text-accent">{project.index}</span>
      <span>
        <span className="block font-display font-medium text-row-title">{project.name}</span>
        {project.tagline && <span className="mt-1 block text-row-desc text-neutral-400">{project.tagline}</span>}
      </span>
      <span aria-hidden className="font-mono text-arrow text-neutral-500 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent">→</span>
    </Link>
  );
}
