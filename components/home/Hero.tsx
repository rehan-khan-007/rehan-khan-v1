import { Boot } from "./Boot";
import { HeroPhoto } from "./HeroPhoto";
import { PhotoRecession } from "./PhotoRecession";
import { Destinations } from "./Destinations";
import { Utilities } from "@/components/layout/Utilities";
import { site } from "@/content/site";

export function Hero() {
  return (
    <section
      aria-label="Introduction"
      className="grid grid-cols-1 lg:min-h-svh lg:grid-cols-[0.88fr_1.12fr]"
    >
      <div className="order-1 flex items-center justify-center py-6 md:py-10 lg:order-2 lg:py-0">
        <PhotoRecession>
          <HeroPhoto />
        </PhotoRecession>
      </div>

      <div className="order-2 flex flex-col justify-center px-5 pb-16 pt-10 md:px-10 lg:order-1 lg:px-14 lg:pb-24 lg:pt-24 xl:px-20">
        <Boot>
          <p className="font-mono uppercase font-medium text-kicker text-accent-300">{site.positioning}</p>
          <h1 className="text-display uppercase text-neutral-100 whitespace-nowrap" style={{ wordSpacing: "var(--text-display--word-spacing)" }}>{site.name}</h1>
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
