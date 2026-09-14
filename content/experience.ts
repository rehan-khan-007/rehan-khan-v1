// Canonical chronology — founder-locked. Storage order is ascending;
// display components reverse it. content-lint asserts this order.
export const CANONICAL_EDUCATION_ORDER = ["RIMC", "NDA", "IIT Bombay"] as const;

export interface EducationEntry {
  institution: string;
  credential?: string;
  period?: string;
}

export const education: EducationEntry[] = [
  { institution: "RIMC" },
  { institution: "NDA" },
  { institution: "IIT Bombay", credential: "M.Tech, Systems and Control Engineering" },
];
