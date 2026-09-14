import type { Metadata } from "next";
import { about } from "@/content/about";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="px-5 py-20 md:px-10 lg:px-14 lg:py-28 xl:px-20">
      <p className="font-mono uppercase text-label text-neutral-400 mb-2">About</p>
      <h1 className="mb-6 font-display text-4xl font-medium tracking-tight md:text-5xl">Rehan Khan</h1>
      <p className="max-w-[60ch] text-thesis text-neutral-300">{about.line}</p>
    </div>
  );
}
