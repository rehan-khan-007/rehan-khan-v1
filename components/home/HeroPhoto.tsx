import Image from "next/image";

// LOCKED ASSET: approved motorcycle / Himalayan photograph → public/images/hero/hero.jpg
// ADR-020: panel follows source aspect ratio (1311x1200); height capped via maxWidth.
const HERO_BLUR =
  "data:image/jpeg;base64,UklGRh4AABXRUJQVlA4TAEAAAAvAAAAAA==";

export function HeroPhoto() {
  return (
    <figure
      className="relative mx-auto w-full"
      style={{
        aspectRatio: "1311 / 1200",
        maxWidth: "calc(min(74vh, 660px) * 1.0925)",
      }}
    >
      <Image
        src="/images/hero/hero.jpg"
        alt="Motorcycle journey through the Himalayas"
        fill
        priority
        sizes="(min-width: 1024px) 720px, 100vw"
        placeholder="blur"
        blurDataURL={HERO_BLUR}
        className="object-cover"
        style={{ filter: "brightness(0.88) contrast(1.05) saturate(0.88)" }}
      />
      {/* Phase Space scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(5,15,14,0.1) 0%, rgba(5,15,14,0.04) 45%, rgba(5,15,14,0.66) 100%)",
        }}
      />
      {/* Phase tint */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundColor: "#0C2A26", opacity: 0.34 }}
      />
    </figure>
  );
}
