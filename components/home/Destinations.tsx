import Link from "next/link";
import { liveDestinations } from "@/content/site";

export function Destinations() {
  return (
    <nav aria-label="Primary destinations">
      <ul>
        {liveDestinations.map((d) => (
          <li key={d.href}>
            <Link
              href={d.href}
              data-track={`destination_${d.label.toLowerCase()}`}
              className="group flex min-h-14 items-baseline justify-between border-t border-divider py-4 transition-colors hover:border-accent/40"
            >
              <span className="flex items-baseline gap-4">
                <span className="font-mono uppercase text-index text-neutral-500 group-hover:text-accent">{d.index}</span>
                <span className="font-display font-medium uppercase text-destination text-ink group-hover:text-neutral-100">{d.label}</span>
              </span>
              <span aria-hidden className="font-mono text-arrow text-neutral-500 transition-transform duration-150 group-hover:translate-x-1 group-hover:text-accent">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
