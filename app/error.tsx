"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="flex min-h-svh flex-col justify-center px-5 md:px-10 lg:px-14 xl:px-20">
      <p className="mono-label mb-2 text-accent!">Error</p>
      <h1 className="font-display text-4xl font-bold tracking-tight">Something failed</h1>
      <button type="button" onClick={reset} className="mt-8 w-fit border border-accent px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-accent hover:bg-accent/10">
        Retry
      </button>
    </div>
  );
}
