import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", ...projects.map((p) => `/work/${p.slug}`), "/experience", "/about"];
  return routes.map((r) => ({ url: `${BASE}${r}`, lastModified: new Date() }));
}
