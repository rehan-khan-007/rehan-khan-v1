"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

const RECESSION_RANGE = 620; // px of homepage scroll (brief §11)

export function PhotoRecession({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(false);

  useEffect(() => {
    const size = window.matchMedia("(min-width: 768px)");
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const update = () => setActive(size.matches && motionOk.matches);
    update();
    size.addEventListener("change", update);
    motionOk.addEventListener("change", update);
    return () => {
      size.removeEventListener("change", update);
      motionOk.removeEventListener("change", update);
    };
  }, []);

  const { scrollY } = useScroll();
  const progress = useTransform(scrollY, (v) => Math.min(Math.max(v / RECESSION_RANGE, 0), 1));
  const opacity = useTransform(progress, [0, 1], [1, 0.38]);
  const y = useTransform(progress, [0, 1], [0, -26]);
  const scale = useTransform(progress, [0, 1], [1, 0.955]);
  const scrim = useTransform(progress, [0, 1], [0, 0.18]); // replaces animated saturate() — ADR-006

  if (reduced || !active) {
    return <div className="relative w-full">{children}</div>;
  }

  return (
    <motion.div
      className="relative w-full will-change-transform"
      style={{ opacity, y, scale }}
    >
      {children}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-bg"
        style={{ opacity: scrim }}
      />
    </motion.div>
  );
}
