import { site } from "@/content/site";
import { DampedReadout } from "./DampedReadout";

// TEMPORARY (ADR-040) — early-visitor notice band. Exact retirement steps in
// docs/DECISIONS.md. Copy below is VERBATIM from the DC handoff — do not edit
// the strings (including the double non-breaking spaces and typographic marks).

const githubHref = site.utilities.find((u) => u.label === "GitHub")?.href;

export function EarlyVisitorNotice() {
  if (!githubHref) return null;
  return (
    <section className="notice" aria-label="Site in progress">
      <div className="notice__left">
        <div className="notice__copy">
          <div className="notice__label">This website is being made</div>
          <div className="notice__stack">
            <p className="notice__line">
              <span>FOR&nbsp; &nbsp;YOU</span>
              <span className="pulse">
                <svg className="pulse__svg" viewBox="0 0 280 40" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                  <defs>
                    <linearGradient id="rk-pulse" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0" stopColor="#ff3b4e" />
                      <stop offset="0.42" stopColor="#ff6b7a" />
                      <stop offset="1" stopColor="#3fdcbe" />
                    </linearGradient>
                  </defs>
                  <path d="M78 20 L112 20" fill="none" stroke="#ff3b4e" strokeWidth="2" strokeLinecap="round" opacity="0.32" />
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
            <p className="notice__body">
              Till then, have a look around GitHub — I’m sure you won’t regret it.
            </p>
          </div>
        </div>

        <DampedReadout />
      </div>

      <a className="notice__gh" href={githubHref} target="_blank" rel="noopener">
        <div className="notice__label">Explore the build</div>
        <div className="gh__title">
          <span>View on GitHub</span>
          <span className="gh__arrow">&#8594;</span>
        </div>
        <div className="gh__rule" />
        <div className="gh__fine">
          Code. Ideas. Progress.
          <br />
          A lot more coming.
        </div>
      </a>
    </section>
  );
}
