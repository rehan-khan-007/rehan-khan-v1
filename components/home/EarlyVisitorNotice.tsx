import { site } from "@/content/site";
import { DampedReadout } from "./DampedReadout";

// TEMPORARY (ADR-043/044/045/046/047/048) — early-visitor band. Geometry stays
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
                </defs>
                {/* Lead-in — text-glow technique (ADR-048): the same path
                    painted twice. Underlayer: fat (stroke 7), blurred
                    (stdDev 3), bright red at 0.55 — the luminosity. Overlayer:
                    crisp 2.4px hot-red stroke at full opacity — the line. */}
                <path
                  d="M78 20 L112 20"
                  fill="none"
                  stroke="#ff5566"
                  strokeWidth="7"
                  strokeLinecap="round"
                  opacity="0.55"
                  filter="url(#rk-lineglow)"
                />
                <path
                  d="M78 20 L112 20"
                  fill="none"
                  stroke="#ff5b6b"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  opacity="1"
                />
                <filter id="rk-lineglow" x="-80%" y="-300%" width="260%" height="700%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
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
