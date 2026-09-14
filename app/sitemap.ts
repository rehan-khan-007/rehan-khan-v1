import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { siteUrl } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/work", ...projects.map((p) => `/work/${p.slug}`), "/experience", "/about"];
  return routes.map((r) => ({ url: `${siteUrl}${r}`, lastModified: new Date() }));
}
