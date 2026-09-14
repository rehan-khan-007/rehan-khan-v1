import { Boot } from "./Boot";
import { HeroPhoto } from "./HeroPhoto";
import { PhotoRecession } from "./PhotoRecession";
import { Destinations } from "./Destinations";
import { Utilities } from "@/components/layout/Utilities";
import { site } from "@/content/site";

// `compact` is TEMPORARY (ADR-040): active only while the early-visitor notice
// band is mounted. On retirement: remove the prop and its branches, restoring
// `lg:min-h-svh` and `lg:pt-24` to unconditional form.
export function Hero({ compact = false }: { compact?: boolean }) {
  return (
    <section
      aria-label="Introduction"
      className={`grid grid-cols-1 lg:grid-cols-[0.88fr_1.12fr]${compact ? "" : " lg:min-h-svh"}`}
    >
      {/* Photo above interface on mobile; right column on desktop */}
      <div className="order-1 flex items-center justify-center py-6 md:py-10 lg:order-2 lg:py-0">
        <PhotoRecession>
          <HeroPhoto compact={compact} />
        </PhotoRecession>
      </div>

      <div
        className={`order-2 flex flex-col justify-center px-5 pb-16 pt-10 md:px-10 lg:order-1 lg:px-14 lg:pb-24 xl:px-20${
          compact ? " lg:pt-[clamp(8px,2vh,24px)]" : " lg:pt-24"
        }`}
      >
        <Boot>
          <p className="font-mono uppercase font-medium text-kicker text-accent-300">{site.positioning}</p>
          <h1
            className="text-display uppercase text-neutral-100 whitespace-nowrap"
            style={{ wordSpacing: "var(--text-display--word-spacing)" }}
          >
            {site.name}
          </h1>
          <hr className="identity-rule" aria-hidden />
          <p className="measure-thesis text-thesis text-neutral-300">{site.thesis}</p>
          <Destinations />
          <div className="mt-10 md:hidden">
            <Utilities />
          </div>
        </Boot>
      </div>
    </section>
  );
}
