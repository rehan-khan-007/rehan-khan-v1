export interface Figure {
  src: string;
  alt: string;
  caption?: string;
}

export type EvidenceKind = "repo" | "demo" | "writeup" | "benchmark" | "link";

export interface EvidenceItem {
  kind: EvidenceKind;
  label: string;
  url: string;
  provenance?: string;
}

export type ProjectStatus = "active" | "research" | "archived" | "pending";

export type ProjectSection =
  | { kind: "problem"; body: string }
  | { kind: "build"; body: string }
  | { kind: "architecture"; body: string; figure?: Figure }
  | { kind: "decisions"; items: string[] }
  | { kind: "challenges"; items: string[] }
  | { kind: "results"; body: string; provenance: string }
  | { kind: "stack"; items: string[] }
  | { kind: "evidence"; items: EvidenceItem[]; pending?: boolean }
  | { kind: "future"; body: string }
  | { kind: "links"; repo?: string; demo?: string };

export interface Project {
  slug: string;
  name: string;
  index: string;
  status: ProjectStatus;
  featured: boolean;
  tagline?: string;
  sections: ProjectSection[];
}
