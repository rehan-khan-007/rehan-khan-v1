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

ADR-031 · Two audit-gate-A process failures, both mine, both mechanized shut:
  (1) Commit c6e9000 pushed with a FAILED gate — root cause: commit was not chained to
  verify success. Fix: standing pattern npm run verify && git add && git commit && git push
  — a red gate can no longer produce a commit. (2) lib/og/ directory never existed when
  the card heredoc ran (mkdir -p missing) → silent partial application → 3 type errors.
  Recovery commit followed immediately. Also: ADR-028's OG builder hit satori's WOFF2
  limitation ([Error: Unsupported OpenType signature wOF2]) at prerender — resolved by
  committing TTF source files (lib/og/*.ttf, build-time only, Fontsource) for the OG
  cards; WOFF2 remains the runtime web format. Archivo static 400 replaces the variable
  file in OG only (variable-axis rendering unsupported by satori; visual delta at card
  scale: negligible).

ADR-032 · OG fonts final resolution: satori does not support variable fonts (failure
  signature: TypeError reading '256' on prerender). Fix: fontTools varLib.instancer pins
  Archivo variable -> static wght=700 (lib/og/Archivo-Bold.ttf); IBPlexMono-Medium is
  already static. OG title weight 700 + size 100px (was 400/118) — matches the site's
  bold display identity and guarantees one-line fit for the longest card title
  ('SELECTED WORK'). Chain of failures for the record: WOFF2 signature -> TTF conversion
  -> variable-font instancing. The chained verify-gate caught all three before any
  broken commit reached main (after the one it didn't — ADR-031).

ADR-033 · JS budget fix (audit gate item 1, measurement-first per ADR-030c). Attribution
  from route table: shared 103KB gz = react-dom(54.2)+next runtime(46.4); homepage-only
  delta ~53KB = motion package via 4 client consumers. Fix: LazyMotion + m components +
  domAnimation features, strict mode (template.tsx wraps — all motion consumers are in
  its subtree; MobileNav uses no motion). Covers all used features (variants, stagger,
  whileInView, MotionValues); drag/layout not used. Visual behavior unchanged. Budget
  ledger: measured 156KB -> [route table after this commit is the recorded result].

ADR-034 · Mobile LCP fix (measured 2.5s vs 2.0s budget; audit gate §A). Cause: hero JPEG
  q82 (460KB) is the LCP element on throttled mobile. Fix: re-encode from original PNG at
  q72 (no generation loss; treated photo hides compression). Visual behavior unchanged
  under scrim+brightness. Re-measured LCP recorded post-deploy. Revert path: git revert.

ADR-033 AMENDMENT · Measured result: LazyMotion+m+strict saved ~1KB (156 -> 155), not the
  projected 20-30KB. Attribution hypothesis partially wrong; recorded as a lesson. Async
  loadFeatures split evaluated and REJECTED: homepage needs features at hydration for the
  boot sequence, so bytes-on-wire do not decrease — it would improve the route-table
  number without real improvement (metric gaming). 155KB stands as the honest number:
  103KB framework floor (irreducible) + ~52KB homepage graph, all load-bearing.
ADR-034 RESULT · Mobile LCP 2.5s -> 2.1s (hero q72, 408KB). Remaining 0.1s over budget;
  driver is total page weight on simulated slow-4G, not the image. Desktop LCP 0.5s.
  Tiebreaker: real-device cellular check (B6).
ADR-035 (PENDING FOUNDER RATIFICATION) · Budget disposition: homepage JS 155KB vs 150
  ceiling (+3.3%); mobile LCP 2.1s vs 2.0 (+5%, simulated throttling). Measured UX
  impact: perf 97-99, CLS 0, TBT 10ms, desktop 100/0.5s. RECOMMENDATION: accept both
  with this ledger as evidence; B6 real-device check as the human tiebreaker. Founder
  ratification flips this from pending to accepted.

ADR-037 · V4 type system ratified and applied (Claude Phase 3 fidelity review: APPROVED
  WITH CHANGES). Full token block in styles/globals.css: display (clamp 2.5rem-5.75rem,
  lh 0.94, ls -0.045em, w500, two-line name via site.nameLines), thesis (fluid, 42ch
  measure), destination rows (clamp 16-21px, w500, +0.02em, UPPERCASE — fixes ~43%
  oversize), kicker split (0.3em/accent-300) from label (0.16em/neutral-400) from index
  (10px/neutral-500); utilities 11px; row-title/row-desc/arrow tokens; identity rule
  token. Weight discipline: 400/500 only site-wide (variable Archivo already serves
  both). neutral-600 retired from text. h2-as-label on Selected Work + All-work link.
  CLOSES ADR-011. Claude's separate recommendations recorded to design backlog: (a)
  DC test destination 21 vs ~26px with uppercase/+0.02em held; (b) deliberate decision
  on 1024-1280 panel height behavior. Utilities duplication confirmed resolved (ADR-021,
  matches V4). Inner-page h1 scale: outside V4 scope, weight normalized only.
ADR-036 · PHASE 2 CLOSED. Evidence: docs/PERFORMANCE.md (perf 97-100, a11y 96-100, CLS 0,
  TBT <=10ms, desktop LCP 0.4-0.5s, mobile 2.0-2.1s); keyboard PASS (tab order, focus
  escape, Escape+return); JS-disabled PASS; VoiceOver informal PASS; real-device PASS
  (iPhone Safari, cellular); deploy curls green (apex/OG/JSON-LD/www/resume); ADR-037
  fidelity applied. Carried: formal SR audit + 360px explicit (Phase 8), blur LQIP
  (Phase 8), analytics activation (founder decision), per-project OG + CreativeWork
  (Phase 5), design-backlog items (a)/(b) above.

ADR-038 · One-line name (FOUNDER OVERRIDE of Claude fidelity should-fix #11, which
  ratified V4's two-line identity block). Decision hierarchy: founder > creative.
  h1 renders site.name single-line with whitespace-nowrap (never wraps at any width).
  All other ADR-037 tokens unchanged. Fit analysis: ~505px text at 5.75rem cap vs
  ~507px left column at 1440 (fits, grows beyond); knife-edge zone 1024-1150 —
  founder visual check post-deploy; fallback is a one-number display-cap tweak.
  Also: settled re-measure median LCP 2.1s / perf 99-100 (runs 1.0/2.1/2.1) —
  prior 2.7s spot-check confirmed deploy-cache variance, discarded.

ADR-039 · Display word-spacing (founder polish request, supersedes the font-size-reduction
  option). Problem: at -0.045em tracking, uppercase REHAN KHAN fuses into one dense block
  — the word gap collapses visually. Fix: word-spacing 0.28em on the display h1 only
  (tight letter tracking retained — it is what makes Archivo read as display). NOT chosen:
  font-size reduction (would break V4's 5.75rem ratified scale for a spacing problem).
  One-line guarantee unaffected: ~+10px width vs ~200px margin at the tightest zone
  (1024-1150). Tunable live: 0.28em is the starting value.

ADR-040 · TEMPORARY early-visitor notice state (DC handoff implementation; Phase 2
  remains CLOSED — bounded homepage change only). Full-width band between header and
  hero; verbatim copy; heart/pulse CSS-only (2600ms cycle, 1500ms delay, 10% peak);
  ECG packet sweep (pathLength 320, dash 16/320); damped-response readout (2nd-order
  sim: w=7.2, z=0.2, kick 8.4 per 5200ms — REPRESENTATIVE behaviour, never captioned
  as project data; runs only >=1024px + visible + motion-ok; static closed-form curve
  server-rendered for JS-disabled); whole-cell GitHub CTA to the CONFIGURED profile
  URL; red #FF3B4E confined to this state. Isolation: 2 new components + 1 css file +
  <Hero compact> prop (top padding + panel cap only) + one globals import.
  RETIREMENT (exact): (1) page.tsx — remove notice lines, <Hero compact /> → <Hero />;
  (2) delete EarlyVisitorNotice.tsx, DampedReadout.tsx, styles/notice.css; (3)
  globals.css — remove the TEMPORARY import; (4) Hero.tsx — drop compact, restore
  lg:min-h-svh + lg:pt-24 unconditional; (5) HeroPhoto.tsx — drop compact, restore
  min(74vh,660px); (6) repo-lint.ts — remove DampedReadout from ALLOWED_CLIENT;
  (7) verify: no .notice/.pulse/.field/.gh classes remain, no red, no rAF, name still
  one line at 360px. PERMANENT (survives retirement): --text-display →
  clamp(30px,5.6vw,88px) per handoff directive (supersedes ADR-037 display size;
  ADR-038 one-line lineage; ADR-039 word-spacing retained — handoff silent, flagged).
  Deviations from handoff documented in the implementation report (gutter alignment
  to site scale, namespaced keyframes, SSR'd static path, ink-600 literal, min-h-svh
  drop while compact, mobile/tablet hero paddings unchanged).

ADR-041 · CORRECTION of ADR-040 (founder production inspection). Found: (1) the
  handoff-permitted hero changes (compact top padding + 62vh panel cap) altered the
  underlying homepage geometry — founder REJECTED that coupling; the handoff's
  "single permitted change" is revoked (founder > handoff). (2) The damped-response
  readout was too dominant — the point is the pumping heart, not a second technical
  hero. REMOVED: Hero/HeroPhoto compact branches (hero restored to exact pre-040
  form: lg:min-h-svh, lg:pt-24, min(74vh,660px)), DampedReadout.tsx + its
  client-boundary entry, ECG pulse SVG, statement scaled 54px->30px cap, sub-floor
  mono sizes (all mono now 11px). KEPT: additive slim band (label / FOR YOU heart
  BY ME / body / GitHub CTA "GO SEE WHAT I'M BUILDING ->" per founder copy), tiny
  transform-only heart pulse (2600ms, 1200ms delay, aria-hidden), configured GitHub
  URL, red confined to notice.css. RETIREMENT (exact, 3 steps): (1) page.tsx —
  remove import + the two fenced lines; (2) delete EarlyVisitorNotice.tsx;
  (3) delete styles/notice.css + its @import. Hero needs NO restoration — no
  branches exist. PERMANENT display ramp clamp(30px,5.6vw,88px) retained (handoff
  permanent directive, not compact coupling; flagged to founder). Responsive rules:
  original homepage breakpoints were never altered — restored by branch removal.

ADR-042 · V4 grid motif reinstated (founder directive: "add the grid thing from V4").
  Partially supersedes the Phase 2 no-motif lock + handoff "NO hero motif" — founder's
  call, per decision hierarchy. Implementation: DC-extracted verbatim (extraction chat,
  no GLM invention): four hairline divs (top/bottom with 48px end-fades, vertical seam
  at 44% with 40px end-fades, neutral-700 #4a5a57 scoped local — not a global token),
  three ticks at 64/71.5/79% (first accent #3FDCBE, two neutral-600), readout "x · ẋ"
  9px neutral-600 decorative aria-hidden; container fade 900ms/400ms, reduced-motion
  static from first paint; below 1024px seam transparent + ticks/readout at left:0
  (V4's JS branch as equivalent CSS per DC). NO motif switcher ships (prototype cleanup
  rule) — renders unconditionally = founder's switch away from V4's micro default.
  Z-order per DC: grid z-1 (above photo panel, below type); identity column z-10
  (V4's z-4 equivalent); pointer-events none; hero section gained `relative` +
  column gained `relative z-10` — positioning only, ZERO geometry change (ADR-041
  restoration preserved: min-h-svh, pt-24, min(74vh,660px)). Isolation:
  styles/grid-motif.css + GridMotif.tsx + one mount line — independent retirement
  if ever wanted. Permanence: implemented PERMANENT (founder framed it as a homepage
  feature); if it should die with the notice band instead, its retirement is a
  3-deletion move noted in the css header. NOTE: this block is idempotent-final —
  it also completes ADR-041 if that corrective had not been run.

ADR-043 · Founder requested full restoration of the ADR-040 notice ANIMATION treatment
  ("restore everything that was there in the animation, I wanted it"). Supersedes
  ADR-041's slimming on ANIMATION ONLY. Restored: ECG trace + packet sweep (16/320 dash,
  2600ms cubic-bezier(.3,.7,.4,1), 1500ms delay) firing each heartbeat; full CTA cell
  (EXPLORE THE BUILD label, VIEW ON GITHUB + arrow, gradient rule, CODE. IDEAS.
  PROGRESS. / A LOT MORE COMING. fine print); ADR-040 statement scale (28-54px desktop
  ramp; 22-34px below 1024); double-beat heart (unchanged from 041). PRESERVED from
  ADR-041: geometry decoupling (no hero coupling, no compact branches, hero stays
  pre-040 form) and the NO-DampedReadout decision (that was the dominance problem,
  not animation — founder can request separately). Fine print normalized to the 11px
  mono floor (041 discipline kept — sub-floor sizes stay dead). Reduced motion: all
  animation off, stroke-dashoffset pinned, band fully present. Retirement: unchanged —
  delete component + css + fenced lines; red dies with it.

ADR-044 · DampedReadout RESTORED with explanatory copy (founder: "I want the damped
  response also, but it should make the person understand what it means — shouldn't
  be zero context"). Supersedes ADR-041's readout removal on this point. The
  visualization is the ADR-040 sim verbatim (2nd-order, w=7.2, z=0.2, kick 8.4/5200ms,
  >=1024px + visible + motion-ok only; static closed-form curve server-rendered for
  JS-disabled; pauses on visibilitychange). NEW copy layer: caption "SYSTEMS THINKING,
  LIVE · X · Ẋ" (replaces bare "DAMPED RESPONSE") + note "A damped system rings once,
  then settles — like this site, and everything else I build." — the caption teaches
  what the signal IS and ties it to the builder's identity; honest by design
  (representative behavior, never claims measured data; note is metaphor, not claim).
  Field hidden below 1024px as before. Statement scaled 28-54px -> 24-44px to give
  the field room without growing the band's dominance. Client boundary amended:
  +DampedReadout. Retirement: dies with the band (same 4 deletions).

ADR-045 · ECG lead-in line made visible + glow (founder: "almost invisible — make it
  glow and also make it visible"). DC's prototype shipped the left red segment at
  opacity .32, stroke 2, no glow — unreadable on #050F0E. Changed: opacity .32 -> .85,
  stroke 2 -> 2.4, + svg feGaussianBlur glow filter (stdDev 2.2, merge blur+source —
  same glow family as the heart's drop-shadow). Deviation from DC prototype is a
  founder visibility directive; geometry/path unchanged. Dies with the band.

ADR-045 AMENDMENT · First attempt (regex filter-insert) broke the JSX tree — the
  perl capture swallowed the gradient's </defs>. Fifth chained-gate save. MECHANIZED
  LESSON: no regex/perl edits on JSX structure, ever — full-file rewrite for any
  structural component change (three incidents: MP8 patches, ADR-044 mount, ADR-045).
  Fixed via full rewrite; ADR-045's visual changes unchanged.

ADR-046 · ECG geometry extended (founder: lead-in + post-heart trace both longer).
  Lead-in: 78-112 (34px) -> 58-112 (54px, +59%). ECG complex: 168-234 (66px) ->
  168-252 (84px, +27%) with the peak structure stretched proportionally (T-wave
  216/221/234 -> 217/221/226 + flat runs extended). viewBox 280 -> 300. Pulse
  interval clamps scaled: container 130-190 -> 150-230, svg 150-220 -> 170-260,
  mobile 104/110-150 -> 120/125-175. Glow/opacity (ADR-045) and animation timing
  unchanged. pathLength stays 320 — the packet sweep covers the same fraction of
  a now-longer run. Full-file rewrite per the standing rule (no regex on JSX).
  Dies with the band.

ADR-047 · Lead-in disappearance fixed (founder report: "red line on the left of the
  heart is gone"). Root cause: ADR-046 widened the viewBox to 300 and pushed the
  lead-in to x=58-60, but the CSS box (170-260px) was narrower than the viewBox's
  rendered aspect — preserveAspectRatio="meet" scaled the drawing down and the left
  run landed outside/edge-clipped. Fix: (a) .pulse overflow: visible (SVG art may
  exceed the interval box — the box positions the HEART between the words; the trace
  is absolute, pointer-events none, and can breathe past it); (b) svg width raised
  to clamp(200px,17vw,290px) so the box comfortably contains the 300-unit drawing;
  (c) lead-in anchored at x=60 with viewBox margin both ends. Geometry per ADR-046
  otherwise unchanged (52px lead-in, 84px ECG). Standing rule honored: full rewrite.

ADR-048 · Lead-in rebuilt: original DC geometry + text-glow treatment (founder:
  "keep the line as it was; increase brightness first, then glow — but unlike the
  heart glow, like how text color glows on a font"). Reverts ADR-046/047 geometry
  (lead-in back to 78-112, ECG to 168-234, viewBox 280; CSS svg width back to
  150-220 — the extension experiments read as the cause of invisibility and are
  abandoned wholesale). New treatment: (1) BASELINE BRIGHTNESS: crisp stroke
  #ff5b6b (hot red, brighter than the heart's #ff3b4e) at opacity 1; (2) TEXT-GLOW,
  not halo: same path painted twice — underlayer stroke-width 7 blurred stdDev 3
  in #ff5566 at .55 opacity beneath the crisp stroke, so luminosity reads as
  emitted BY the line (the text-shadow technique) — explicitly NOT the heart's
  drop-shadow halo (ADR-045's feMerge filter retired with this rewrite).
  Heart/gradient-trace/packet unchanged. Standing rule honored: full rewrite.

ADR-049 · Lead-in: length + lengthwise gradient + beat-synced glow (founder: "increase
  the length; suitable with the bg, not completely invisible; when the heart pumps it
  should glow — intensity from light to dark"). (1) LENGTH: 78-112 (34u) -> 48-112
  (64u, ~2x visual); viewBox stays 280 with margin both ends; .pulse__svg width
  raised to clamp(160px,14vw,240px) IN THE SAME COMMIT (ADR-047 lesson mechanized);
  .pulse overflow:visible retained. (2) VISIBILITY: crisp stroke carries linearGradient
  rk-lead (userSpaceOnUse, x 48->112): stopOpacity .35 at the far end -> 1.0 at the
  heart end — constant presence, tasteful on #050F0E. (3) BEAT-SYNCED GLOW: fat
  underlayer (stroke 7, blur stdDev 3, gradient stroke) with n-leadglow — same
  2600ms/ease-in-out/1500ms as n-beat, opacity 0.3 rest -> 1.0 at 9% -> 0.45 -> 0.8
  at 27% -> 0.3 — flares in lockstep with the heart's double-beat; resting attribute
  opacity 0.4 is the reduced-motion fallback (steady soft glow, no flare). Full-file
  rewrites of component + css (standing rule; also supersedes the unseen interim fix
  deterministically). ECG complex unchanged this round — one variable at a time.
  Gradient direction: bright-at-heart; flip = swap two stops. Dies with the band.
