import type { Metadata } from "next";
import { education } from "@/content/experience";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  const display = [...education].reverse(); // canonical storage ascending: RIMC → NDA → IIT Bombay
  return (
    <div className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <p className="mono-label mb-2">Experience</p>
      <h1 className="mb-10 font-display text-4xl font-bold tracking-tight md:text-5xl">The Record</h1>
      <div className="border-b border-divider">
        {display.map((entry) => (
          <div key={entry.institution} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-divider py-6">
            <span className="mono-label pt-1">{entry.period ?? "—"}</span>
            <span>
              <span className="font-display text-xl font-semibold">{entry.institution}</span>
              {entry.credential && <span className="mt-1 block text-sm text-neutral-400">{entry.credential}</span>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
