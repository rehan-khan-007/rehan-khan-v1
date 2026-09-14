import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col justify-center px-5 md:px-10 lg:px-14 xl:px-20">
      <p className="font-mono uppercase text-label text-accent mb-2">404</p>
      <h1 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Not Found</h1>
      <p className="mt-4 max-w-[44ch] text-neutral-400">This route does not exist in V1.</p>
      <div className="mt-8 flex gap-6">
        <Link href="/" className="font-mono text-xs uppercase tracking-[0.14em] text-accent hover:underline">→ Home</Link>
        <Link href="/work" className="font-mono text-xs uppercase tracking-[0.14em] text-neutral-300 hover:underline">→ Work</Link>
      </div>
    </div>
  );
}
