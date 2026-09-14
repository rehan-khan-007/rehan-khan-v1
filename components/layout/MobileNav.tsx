"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import { liveDestinations } from "@/content/site";
import { Utilities } from "./Utilities";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") { setOpen(false); buttonRef.current?.focus(); }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // Focus containment for a full-screen disclosure panel (ADR-027):
  // if focus escapes the panel onto content hidden behind the overlay,
  // close the menu instead of stranding keyboard users behind it.
  const onPanelBlur = (e: { relatedTarget: EventTarget | null }) => {
    if (!open) return;
    const next = e.relatedTarget as Node | null;
    if (!next) return;
    if (panelRef.current?.contains(next)) return;
    if (buttonRef.current?.contains(next)) return;
    setOpen(false);
  };

  return (
    <div>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        onClick={() => setOpen((v) => !v)}
        className="flex h-12 min-w-12 items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-neutral-300"
      >
        {open ? "Close" : "Menu"}
      </button>
      {open && (
        <div
          id="mobile-nav-panel"
          ref={panelRef}
          role="region"
          aria-label="Site navigation"
          onBlur={onPanelBlur}
          className="fixed inset-x-0 top-[60px] bottom-0 z-50 flex flex-col gap-8 overflow-y-auto bg-bg px-5 py-8"
          style={{ animation: "nav-in 200ms ease-out" }}
        >
          <nav aria-label="Primary destinations">
            <ul>
              {liveDestinations.map((d) => (
                <li key={d.href} className="border-t border-divider">
                  <Link
                    href={d.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-14 items-center gap-4 py-3"
                  >
                    <span className="font-mono uppercase text-index text-neutral-500">{d.index}</span>
                    <span className="font-display font-medium uppercase text-destination text-ink">{d.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <Utilities />
        </div>
      )}
      <style>{`@keyframes nav-in { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: none; } }`}</style>
    </div>
  );
}
