import { site } from "@/content/site";
import { DampedReadout } from "./DampedReadout";

// TEMPORARY (ADR-043/044/045/046/047) — early-visitor band. Geometry stays
// decoupled from the hero. Retirement: delete this file + DampedReadout.tsx +
// styles/notice.css + the fenced lines in app/page.tsx. Nothing else.

const githubHref = site.utilities.find((u) => u.label === "GitHub")?.href;

export function EarlyVisitorNotice() {
  if (!githubHref) return null;
  return (
    <section className="notice" aria-label="Site in progress">
      <div className="notice__msg">
        <div className="notice__copy">
          <p className="notice__label">This website is being made</p>
          <p className="notice__line">
            <span>FOR&nbsp; &nbsp;YOU</span>
            <span className="pulse">
              <svg
                className="pulse__svg"
                viewBox="0 0 300 40"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <filter id="rk-glow" x="-60%" y="-120%" width="220%" height="340%">
                    <feGaussianBlur stdDeviation="2.2" result="b" />
                    <feMerge>
                      <feMergeNode in="b" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <linearGradient id="rk-pulse" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ff3b4e" />
                    <stop offset="0.42" stopColor="#ff6b7a" />
                    <stop offset="1" stopColor="#3fdcbe" />
                  </linearGradient>
                </defs>
                {/* Lead-in: 60 -> 112 (52px). ECG: 168 -> 252 (84px). Both
                    inside the 0-300 viewBox with margin at both ends —
                    nothing near an edge, nothing for 'meet' to crop. */}
                <path
                  d="M60 20 L112 20"
                  fill="none"
                  stroke="#ff3b4e"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  opacity="0.85"
                  filter="url(#rk-glow)"
                />
                <path
                  d="M168 20 L184 20 L189 20 L194 5 L201 35 L207 20 L217 20 L221 15 L226 20 L252 20"
                  fill="none"
                  stroke="url(#rk-pulse)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
                <path
                  className="pulse__packet"
                  d="M168 20 L184 20 L189 20 L194 5 L201 35 L207 20 L217 20 L221 15 L226 20 L252 20"
                  fill="none"
                  stroke="#ffe3e7"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={320}
                  strokeDasharray="16 320"
                />
              </svg>
              <span className="pulse__heart">&#10084;</span>
            </span>
            <span>BY&nbsp; &nbsp;ME</span>
          </p>
          <p className="notice__body">Till then, have a look around GitHub — I’m sure you won’t regret it.</p>
        </div>

        <DampedReadout />
      </div>

      <a className="notice__cta" href={githubHref} target="_blank" rel="noopener">
        <span className="cta__label">Explore the build</span>
        <span className="cta__title">
          View on GitHub <span className="cta__arrow" aria-hidden="true">&#8594;</span>
        </span>
        <span className="cta__rule" aria-hidden="true" />
        <span className="cta__fine">Code. Ideas. Progress.<br />A lot more coming.</span>
      </a>
    </section>
  );
}
