import { site } from "@/content/site";
import { DampedReadout } from "./DampedReadout";

// TEMPORARY (ADR-043/044/049) — early-visitor band. Geometry stays decoupled
// from the hero. Retirement: delete this file + DampedReadout.tsx +
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
                viewBox="0 0 280 40"
                preserveAspectRatio="xMidYMid meet"
                aria-hidden="true"
              >
                <defs>
                  <linearGradient id="rk-pulse" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" stopColor="#ff3b4e" />
                    <stop offset="0.42" stopColor="#ff6b7a" />
                    <stop offset="1" stopColor="#3fdcbe" />
                  </linearGradient>
                  {/* ADR-049: lengthwise intensity — dim at the far end,
                      full brightness at the heart. userSpaceOnUse maps the
                      gradient to the actual line coordinates. */}
                  <linearGradient id="rk-lead" x1="48" y1="0" x2="112" y2="0" gradientUnits="userSpaceOnUse">
                    <stop offset="0" stopColor="#ff5566" stopOpacity="0.35" />
                    <stop offset="1" stopColor="#ff6b7a" stopOpacity="1" />
                  </linearGradient>
                  <filter id="rk-lineglow" x="-80%" y="-300%" width="260%" height="700%">
                    <feGaussianBlur stdDeviation="3" />
                  </filter>
                </defs>
                {/* Glow underlayer — beat-synced flare (ADR-049). Resting
                    opacity 0.4 (attribute) is the reduced-motion fallback;
                    the n-leadglow animation drives it in lockstep with the
                    heart's double-beat. */}
                <path
                  className="pulse__leadglow"
                  d="M48 20 L112 20"
                  fill="none"
                  stroke="url(#rk-lead)"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.4"
                  filter="url(#rk-lineglow)"
                />
                {/* Crisp line — constant presence, gradient intensity */}
                <path
                  d="M48 20 L112 20"
                  fill="none"
                  stroke="url(#rk-lead)"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                />
                <path
                  d="M168 20 L182 20 L187 20 L192 5 L198 35 L203 20 L212 20 L216 15 L221 20 L234 20"
                  fill="none"
                  stroke="url(#rk-pulse)"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  opacity="0.85"
                />
                <path
                  className="pulse__packet"
                  d="M168 20 L182 20 L187 20 L192 5 L198 35 L203 20 L212 20 L216 15 L221 20 L234 20"
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
