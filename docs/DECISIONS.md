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

ADR-021 · Hero utilities redundancy (founder design review). Utilities rendered in BOTH
  header and hero on desktop — read as accidental duplication, weakens the hero's close
  on destinations. OLD: Utilities in hero at all viewports. NEW: md:hidden — hidden on
  desktop/tablet (persistent header covers them), in-flow on mobile (header collapses
  to Menu; in-flow beats a menu tap). Footer instance unchanged (deliberate recovery
  path per ARCHITECTURE.md).

ADR-023 · Commit d68b9c7 is an omnibus. Broad git add -A under the ADR-021 label
  captured five logical changes: (1) suppressHydrationWarning fix (layout.tsx),
  (2) resume.pdf placed + Resume utility wired, (3) GitHub utility wired,
  (4) Contact utility wired, (5) hero utilities md:hidden dedupe (ADR-021).
  All verified present and pushed. History NOT rewritten (force-push rejected:
  solo repo, ledger is canonical). Process rule adopted: every change ships with
  its own commit block.
  ADR-022 (footer removal): allocated, then CANCELLED by founder before merge —
  number reserved, decision void. Footer remains in the layout.

ADR-024 · Canonical domain wired: https://rehank.in (apex). siteUrl constant in
  content/site.ts (env-overridable for Vercel preview deploys); consumed by sitemap,
  robots, and layout metadataBase (silences Next warning; absolute OG/canonical URLs).
  localhost fallback removed — CI builds now emit production URLs. www subdomain:
  redirect to apex, configured at Vercel deploy time. Deploy target: rehank.in.

ADR-025 · Secrets guard in repo-lint (CI). Trigger: founder pasted a real env manifest
  (rotated) into chat while repo is public. Mechanism over goodwill: repo-lint now scans
  every git-tracked text file for credential patterns (OpenRouter/Neon/Tavily/Langfuse
  prefixes, credential-bearing connection strings, generic secret literals) and fails CI
  before a secret can be pushed. .env stays untracked via .gitignore (verified).
  Sanitized AgentOS integration inventory recorded in CONTENT.md — names only, never values.

ADR-026 · PRODUCTION LIVE — rehank.in deployed via Vercel (2026-09-14). Apex serves
  production (environment: Production); www.rehank.in 308-permanent-redirects to apex;
  rehan-khan-v1.vercel.app retained as debug fallback. DNS: GoDaddy A @ -> 216.198.79.1
  (new Vercel IP range), CNAME www -> project-specific vercel-dns record. SSL auto-
  provisioned. Push to main auto-deploys (CI verifies first). Known post-deploy state:
  utilities live, case studies pending Phase 5 content, JS budget exceedance tracked
  (ADR-018, Phase 8).

ADR-027 · MobileNav focus containment (audit gate). Disclosure pattern retained as correct
  for a nav menu; defect found: full-screen overlay strands keyboard users when Tab passes
  the last panel link (focus lands behind overlay, scroll locked). FIX: focusout handler
  closes the menu when focus escapes panel/toggle. Full focus trap evaluated and REJECTED
  (complexity without benefit for a 4-link panel). Escape + focus-return unchanged.
ADR-028 · Build-time OG cards via next/og (audit gate): Phase Space card (dark field, mono
  kicker, Archivo title, single accent rule, REHANK.IN footer) for / and /work. Local fonts
  loaded from app/fonts at build time; zero runtime cost; no new runtime dependencies
  (next/og ships with Next). Per-project OG cards deferred to Phase 5 (cards should carry
  real taglines). Fallback if satori rejects the variable font: swap title font to
  IBM Plex Mono Medium — same card, guaranteed static-font rendering.
ADR-029 · JSON-LD: minimal truthful Person schema on homepage (name, url, description,
  sameAs=GitHub) derived from content modules. Project CreativeWork DEFERRED to Phase 5 —
  schema without verified content is SEO theater (anti-fabrication principle).
ADR-030 · Audit-gate decisions: (a) data-track attributes remain INERT and documented —
  zero-external-requests is the V1 posture; activation is an explicit founder product
  decision (no third-party analytics without approval); (b) hero blurDataURL stays neutral
  (P3) — priority image + AVIF delivery make the benefit window narrow; revisit in Phase 8
  with real LCP data; (c) JS budget fix is MEASUREMENT-FIRST — @next/bundle-analyzer wired,
  LazyMotion/m-component migration prepared but NOT applied until analyzer attributes the
  ~50KB homepage-only delta; (d) V4 exact type scale remains a source-of-truth gap (ADR-011)
  — current values are provisional by design; Claude's Phase 3 checkpoint owns fidelity.
