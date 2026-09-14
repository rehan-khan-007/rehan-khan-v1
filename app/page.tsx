import { Hero } from "@/components/home/Hero";
import { SelectedWork } from "@/components/home/SelectedWork";
import { EarlyVisitorNotice } from "@/components/home/EarlyVisitorNotice";
import { site, siteUrl } from "@/content/site";

// Minimal, truthful Person schema only (ADR-029).
function personJsonLd() {
  const github = site.utilities.find((u) => u.label === "GitHub")?.href;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: siteUrl,
    description: site.thesis,
    ...(github ? { sameAs: [github] } : {}),
  };
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd()) }}
      />
      {/* ===== TEMPORARY: early-visitor notice (ADR-040) — retire per docs/DECISIONS.md ===== */}
      <EarlyVisitorNotice />
      {/* ===== /TEMPORARY ===== */}
      <Hero compact />
      <SelectedWork />
    </>
  );
}
