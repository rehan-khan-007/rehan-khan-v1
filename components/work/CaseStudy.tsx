import type { Project, ProjectSection } from "@/content/projects/schema";

const SECTION_LABELS: Record<ProjectSection["kind"], string> = {
  problem: "Problem",
  build: "Build",
  architecture: "Architecture",
  decisions: "Engineering Decisions",
  challenges: "Challenges / Trade-offs",
  results: "Results",
  stack: "Stack",
  evidence: "Evidence",
  future: "Future Work",
  links: "Links",
};

export function CaseStudy({ project }: { project: Project }) {
  return (
    <article className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <p className="mono-label mb-2">Work / {project.index}</p>
      <h1 className="font-display text-4xl font-bold tracking-tight md:text-5xl">{project.name}</h1>
      {project.tagline && <p className="mt-3 max-w-[60ch] text-thesis text-neutral-300">{project.tagline}</p>}
      <p className="mono-label mt-4 text-accent!">{project.status}</p>

      {project.status === "pending" ? (
        <p className="mono-label mt-12">Case study pending verified source material.</p>
      ) : (
        <div className="mt-12 max-w-[68ch] space-y-12">
          {project.sections.map((section, i) => (
            <section key={section.kind}>
              <h2 className="mono-label mb-4 text-neutral-400!">
                {String(i + 1).padStart(2, "0")} — {SECTION_LABELS[section.kind]}
              </h2>
              {"body" in section && <p className="text-thesis text-neutral-300">{section.body}</p>}
              {"items" in section && section.kind !== "evidence" && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item} className="font-mono text-sm text-neutral-300">— {item}</li>
                  ))}
                </ul>
              )}
              {section.kind === "evidence" && (
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item.url}>
                      <a href={item.url} className="font-mono text-sm text-accent underline-offset-4 hover:underline">
                        ↗ {item.label} <span className="text-neutral-500">({item.kind})</span>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
              {section.kind === "links" && (
                <ul className="space-y-2">
                  {section.repo && (
                    <li><a href={section.repo} className="font-mono text-sm text-accent hover:underline">↗ Repository</a></li>
                  )}
                  {section.demo && (
                    <li><a href={section.demo} className="font-mono text-sm text-accent hover:underline">↗ Demo</a></li>
                  )}
                </ul>
              )}
            </section>
          ))}
        </div>
      )}
    </article>
  );
}
