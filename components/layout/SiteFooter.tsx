import Link from "next/link";
import { liveDestinations } from "@/content/site";
import { Utilities } from "./Utilities";

export function SiteFooter() {
  return (
    <footer className="border-t border-divider px-5 py-10 md:px-10 lg:px-14 xl:px-20">
      <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {liveDestinations.map((d) => (
              <li key={d.href}>
                <Link href={d.href} className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-400 hover:text-accent">
                  {d.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Utilities />
      </div>
      <p className="mono-label mt-8">Rehan Khan — V1 · © {new Date().getFullYear()}</p>
    </footer>
  );
}
