import { site } from "@/content/site";

// TEMPORARY (ADR-041) — slim early-visitor band, purely additive above the
// unchanged homepage. Retirement: delete this file + styles/notice.css +
// the fenced lines in app/page.tsx. Nothing else. Red dies with this state.

const githubHref = site.utilities.find((u) => u.label === "GitHub")?.href;

export function EarlyVisitorNotice() {
  if (!githubHref) return null;
  return (
    <section className="notice" aria-label="Site in progress">
      <div className="notice__msg">
        <p className="notice__label">This website is being made</p>
        <p className="notice__line">
          <span>FOR&nbsp; &nbsp;YOU</span>
          <span className="notice__heart" aria-hidden="true">&#10084;</span>
          <span>BY&nbsp; &nbsp;ME</span>
        </p>
        <p className="notice__body">Till then, have a look around GitHub — I’m sure you won’t regret it.</p>
      </div>
      <a className="notice__cta" href={githubHref} target="_blank" rel="noopener">
        <span className="cta__title">
          Go see what I’m building <span className="cta__arrow" aria-hidden="true">&#8594;</span>
        </span>
        <span className="cta__fine">GitHub</span>
      </a>
    </section>
  );
}
