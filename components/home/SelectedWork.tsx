import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work" className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <Reveal>
        <div className="mb-8 flex items-baseline justify-between">
          <h2 id="selected-work" className="font-mono uppercase text-label text-neutral-400">Selected Work</h2>
          <Link
            href="/work"
            data-track="all_work"
            className="font-mono uppercase text-label text-neutral-400 transition-colors hover:text-accent"
          >
            All work →
          </Link>
        </div>
      </Reveal>
      <Reveal delay={0.08}>
        <div className="border-b border-divider">
          {projects.map((p) => (
            <ProjectRow key={p.slug} project={p} />
          ))}
        </div>
      </Reveal>
    </section>
  );
}
