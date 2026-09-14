"use client";

import { useEffect, useRef } from "react";

// TEMPORARY (ADR-040) — damped-response readout for the early-visitor notice.
// REPRESENTATIVE second-order system behaviour — NOT measured/simulated data
// from any real project. Runs only at >=1024px + tab visible + motion allowed;
// the closed-form static curve renders otherwise (and is server-rendered so
// the band is complete with JavaScript disabled). Delete with the notice.

const SIM = { n: 168, w: 7.2, z: 0.2, kick: 8.4, norm: 1.5, beat: 5200, sampleMs: 33 } as const;

function toPath(b: readonly number[]): string {
  const dx = 720 / (SIM.n - 1);
  let d = "";
  for (let i = 0; i < SIM.n; i++) {
    const val = Math.max(-1, Math.min(1, b[i]! / SIM.norm));
    d += (i ? " L" : "M") + (i * dx).toFixed(1) + " " + (65 - val * 46).toFixed(1);
  }
  return d;
}

function staticPath(): string {
  const b: number[] = [];
  for (let i = 0; i < SIM.n; i++) {
    const t = (i * SIM.sampleMs) / 1000;
    b.push((SIM.kick / SIM.w) * Math.exp(-SIM.z * SIM.w * t) * Math.sin(SIM.w * t));
  }
  return toPath(b);
}

export function DampedReadout() {
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktopMq = window.matchMedia("(min-width: 1024px)");

    let buf = new Array<number>(SIM.n).fill(0);
    let x = 0;
    let v = 0;
    let raf: number | null = null;
    let last = 0;
    let lastSample = 0;
    let lastKick = 0;

    const wanted = () => !reduceMq.matches && !document.hidden && desktopMq.matches;

    const step = (now: number) => {
      raf = requestAnimationFrame(step);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      if (now - lastKick >= SIM.beat) {
        v += SIM.kick;
        lastKick = now;
      }
      for (let k = 0, h = dt / 4; k < 4; k++) {
        v += (-2 * SIM.z * SIM.w * v - SIM.w * SIM.w * x) * h;
        x += v * h;
      }
      if (now - lastSample >= SIM.sampleMs) {
        lastSample = now;
        buf.unshift(x);
        buf.pop();
        path.setAttribute("d", toPath(buf));
      }
    };

    const sync = () => {
      if (wanted() && raf === null) {
        buf = new Array<number>(SIM.n).fill(0);
        x = 0;
        v = 0;
        last = lastSample = performance.now();
        lastKick = last - SIM.beat + 1600;
        raf = requestAnimationFrame(step);
      } else if (!wanted() && raf !== null) {
        cancelAnimationFrame(raf);
        raf = null;
        path.setAttribute("d", staticPath());
      }
    };

    desktopMq.addEventListener("change", sync);
    reduceMq.addEventListener("change", sync);
    document.addEventListener("visibilitychange", sync);
    sync();

    return () => {
      if (raf !== null) cancelAnimationFrame(raf);
      desktopMq.removeEventListener("change", sync);
      reduceMq.removeEventListener("change", sync);
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);

  return (
    <div className="field">
      <svg className="field__svg" viewBox="0 0 720 130" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="rk-signal" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff5566" />
            <stop offset="0.18" stopColor="#7ce8d2" />
            <stop offset="0.74" stopColor="#3fdcbe" stopOpacity={0.5} />
            <stop offset="1" stopColor="#3fdcbe" stopOpacity={0} />
          </linearGradient>
        </defs>
        <line x1="0" y1="65" x2="720" y2="65" stroke="#3fdcbe" strokeWidth="1" strokeDasharray="3 7" opacity="0.2" />
        <path
          ref={pathRef}
          d={staticPath()}
          fill="none"
          stroke="url(#rk-signal)"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="field__cap">Damped response</div>
    </div>
  );
}
