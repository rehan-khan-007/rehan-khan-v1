# DECISIONS (append-only)

ADR-001 · Phase 2 brief is the implementation contract. Supersedes: Instrument Panel
  direction, graphite/amber palette, Space Grotesk + IBM Plex Sans, hero-motif requirement.
  Locked: Phase Space / NO motif / Archivo + IBM Plex Mono / approved photo / bounded recession.
ADR-002 · Tailwind v4 pinned (CSS-first @theme tokens; no config drift across agents).
ADR-003 · Fonts colocated at app/fonts/ (not public/fonts — avoids duplicate static payload).
ADR-004 · Route transitions: enter-only AND transform-only (no opacity). WHY: SSR-inline
  opacity:0 would hide the LCP hero until hydration and break JS-disabled rendering.
ADR-005 · Visibility rescue: html.js class (inline script) + !important CSS for
  html:not(.js) and prefers-reduced-motion. Content never hidden without JS.
ADR-006 · Photo recession: opacity/translate/scale per reference; animated saturate()
  REPLACED with scrim 0→0.18 (filter animation = per-frame repaint on mid-tier Android).
  Gated >=768px; static under reduced motion.
ADR-007 · Utilities without verified URLs render as aria-disabled spans. Never href="#".
ADR-008 · content-lint in CI: canonical education order (RIMC→NDA→IIT Bombay), featured==1,
  evidence rules, benchmark provenance, no [CONTENT REQUIRED] in render path, no app/life,
  no "#" hrefs.
ADR-009 · Sitemap/robots generated from content; base URL via NEXT_PUBLIC_SITE_URL.
ADR-010 · Analytics: zero external requests in V1; data-track attributes hook-ready.
ADR-011 · Type scale PROVISIONAL pending V4 exact values — centralized for one-line swap.
ADR-012 · tsx devDep for running TS lint scripts in Node.
ADR-013 · Hero asset: source PNG (1311x1200, ~/Downloads/Website/1.png) converted to
  JPEG quality 82 (460KB) as public/images/hero/hero.jpg. Original preserved in Downloads.
ADR-014 · File-length policy (founder directive): code dirs <=250 lines, content/ <=400,
  enforced by scripts/repo-lint.ts in CI. Split modules instead of growing them.
ADR-015 · Closed client-component boundary enforced by repo-lint. Allowed set:
  app/template.tsx, app/error.tsx, MobileNav, Boot, PhotoRecession, Reveal.
  Any addition requires an ADR amending this list.
ADR-016 · README.md is the master landing document (project context for humans and AI
  agents); repo-lint verifies its required references survive edits.

ADR-017 · postcss vulnerable transitive deps (GHSA-qx2v-qp2m-jg93 et al.) — build-time
  only, no runtime exposure in static output. NOT upgrading next to 16 (breaking, unvetted).
  Resolved via package.json overrides pinning postcss ^8.5.28 tree-wide. Empirical
  gate: npm run verify build. Fallback if build breaks: remove overrides field, re-install,
  accept with this ADR.

ADR-018 · Initial-JS budget status (Phase 2 measurement): shared 103 kB gz on all routes;
  homepage 156 kB gz vs 150 kB hard ceiling (preferred 90-110). Cause: all 5 client
  components (motion system) concentrate on /. NOT optimized now per brief §22 (measure
  first); scheduled Phase 8 with real data. Identified lever: LazyMotion + m.div
  (domAnimation), projected -20-30 kB gz. Other routes 103-106 kB — within preferred band.

ADR-019 · Hero photo scene legibility (founder inspection, Phase 2). Source 1311x1200
  (near-square) rendered into a wider panel: object-cover crops ~12% of height on desktop,
  ~27% on mobile; centered crop was cutting the peaks/flags, and treatment dimmed the
  hazy distant range. Changes per brief §26 (OLD -> NEW -> WHY):
  objectPosition: center -> center 25% (bias crop to foreground, keep the mountains)
  filter brightness: .82 -> .88 (lift distant range out of the haze)
  scrim top stop: .2 -> .1 (top gradient was dimming the peaks; no text overlays the
  photo, so zero contrast cost)
  Unchanged: bottom scrim .66 (anchors photo into the environment), contrast 1.05,
  saturation .88, tint #0C2A26 soft-light .34.

ADR-019 · Hero photo scene legibility (founder inspection, Phase 2). Source 1311x1200
  (near-square) rendered into a wider panel: object-cover crops ~12% of height on desktop,
  ~27% on mobile; centered crop was cutting the peaks/flags, and treatment dimmed the
  hazy distant range. Changes per brief §26 (OLD -> NEW -> WHY):
  objectPosition: center -> center 25% (bias crop to foreground, keep the mountains)
  filter brightness: .82 -> .88 (lift distant range out of the haze)
  scrim top stop: .2 -> .1 (top gradient was dimming the peaks; no text overlays the
  photo, so zero contrast cost)
  Unchanged: bottom scrim .66 (anchors photo into the environment), contrast 1.05,
  saturation .88, tint #0C2A26 soft-light .34.

ADR-020 · Hero photo panel follows the source aspect ratio (founder request: auto-adjust
  to browser/screen size; supersedes ADR-019's crop-bias approach). OLD: fixed panel
  heights (256/320/min(74vh,660px)) + object-cover — cropped up to ~27% of the scene
  depending on window shape. NEW: aspect-ratio 1311/1200, fluid width, maxWidth =
  calc(min(74vh,660px) * 1.0925) — near-zero crop on every viewport; height still
  respects the brief's 74vh/660px cap; short/landscape windows shrink the photo rather
  than crop it. objectPosition bias removed (nothing left to bias). sizes updated to
  (min-width:1024px) 720px / 100vw — desktop now requests smaller source images.
  Trade-off: composition is the full near-square original ("mounted plate", centered),
  not a wide cinematic band. Mobile height ~357px at 390px width (supersedes the ~260px
  reference — founder's current direction wins per decision hierarchy).
