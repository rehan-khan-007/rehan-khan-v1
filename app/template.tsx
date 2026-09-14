"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LazyMotion, m, domAnimation, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion/tokens";

export default function Template({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const pathname = usePathname();
  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    const h1 = document.querySelector<HTMLElement>("h1");
    if (h1) { h1.setAttribute("tabindex", "-1"); h1.focus({ preventScroll: true }); }
  }, [pathname]);

  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        data-route
        initial={reduced ? false : { y: 12 }}
        animate={{ y: 0 }}
        transition={{ duration: reduced ? 0 : 0.28, ease: EASE_OUT_EXPO }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
