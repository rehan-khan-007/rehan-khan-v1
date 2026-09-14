import { Reveal } from "@/components/motion/Reveal";
import { ProjectRow } from "@/components/ui/ProjectRow";
import { projects } from "@/content/projects";

export function SelectedWork() {
  return (
    <section aria-labelledby="selected-work" className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <Reveal>
        <p className="mono-label mb-2">Selected Work</p>
        <h2 id="selected-work" className="mb-8 font-display text-3xl font-bold tracking-tight md:text-4xl">Work</h2>
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
