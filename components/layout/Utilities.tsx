import { site } from "@/content/site";

export function Utilities() {
  return (
    <nav aria-label="Utilities">
      <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {site.utilities.map((u) => (
          <li key={u.label}>
            {u.href ? (
              <a
                href={u.href}
                data-track={u.track}
                className="font-mono uppercase text-label text-neutral-300 underline-offset-4 transition-colors hover:text-accent-200 hover:underline"
              >
                {u.label}
              </a>
            ) : (
              <span
                aria-disabled="true"
                title="Pending verified asset"
                className="cursor-not-allowed font-mono uppercase text-label text-neutral-500"
              >
                {u.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
}
