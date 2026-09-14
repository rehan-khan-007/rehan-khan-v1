"use client";

import { Children, useEffect, useState } from "react";
import { m, useReducedMotion, type Variants } from "motion/react";
import { EASE_OUT_EXPO, STAGGER } from "@/lib/motion/tokens";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: STAGGER, delayChildren: 0.12 } },
  skip: { transition: { duration: 0, staggerChildren: 0 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } },
  skip: { opacity: 1, y: 0, transition: { duration: 0 } },
};

export function Boot({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    if (reduced) return;
    const skip = () => setSkipped(true);
    const events = ["pointerdown", "keydown", "wheel", "touchstart"] as const;
    events.forEach((e) => window.addEventListener(e, skip, { once: true, passive: true }));
    return () => events.forEach((e) => window.removeEventListener(e, skip));
  }, [reduced]);

  if (reduced) return <>{children}</>;

  return (
    <m.div initial="hidden" animate={skipped ? "skip" : "show"} variants={container}>
      {Children.map(children, (child, i) => (
        <m.div key={i} variants={item} data-anim className="mb-6 last:mb-0">
          {child}
        </m.div>
      ))}
    </m.div>
  );
}
