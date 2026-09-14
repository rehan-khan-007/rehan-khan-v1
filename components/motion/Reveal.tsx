"use client";

import { m, useReducedMotion } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion/tokens";

export function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return (
    <m.div
      data-anim
      initial={reduced ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE_OUT_EXPO }}
    >
      {children}
    </m.div>
  );
}
