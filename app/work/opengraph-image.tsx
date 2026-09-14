import { phaseSpaceCard } from "@/lib/og/card";
import { site } from "@/content/site";

export const alt = `${site.name} — Selected Work`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Og() {
  return phaseSpaceCard({ kicker: site.name, title: "Selected Work" });
}
