export type DestinationStatus = "live" | "reserved";

export interface Destination {
  label: string;
  href: string;
  index: string;
  status: DestinationStatus;
}

export interface Utility {
  label: string;
  href: string | null;
  track: string;
}

export const site = {
  name: "Rehan Khan",
  positioningLabel: "AI / Systems / Software",
  positioning: "AI / SYSTEMS / SOFTWARE",
  thesis:
    "I build AI systems, software, and research-driven tools at the intersection of intelligent systems and engineering.",
  utilities: [
    { label: "Resume", href: "/resume.pdf", track: "outbound_resume" },
    { label: "GitHub", href: "https://github.com/rehan-khan-007", track: "outbound_github" },
    { label: "Contact", href: "mailto:bro39404k@gmail.com", track: "outbound_contact" },
  ] as Utility[],
  destinations: [
    { label: "Work", href: "/work", index: "01", status: "live" },
    { label: "Experience", href: "/experience", index: "02", status: "live" },
    { label: "About", href: "/about", index: "03", status: "live" },
    { label: "Life", href: "/life", index: "04", status: "reserved" },
  ] as Destination[],
} as const;

export const liveDestinations = site.destinations.filter((d) => d.status === "live");
