# ARCHITECTURE

Fully static Next.js App Router site. Server-first: all content is server-rendered from
content/ modules (single source of truth; no prose in components/).

## Closed client-component boundary (complete list)

- app/template.tsx — enter-only route transition + focus management
- app/error.tsx — framework requirement
- components/layout/MobileNav.tsx — disclosure pattern, Escape-close, focus return
- components/home/Boot.tsx — homepage boot sequence (interface only, never the LCP photo)
- components/home/PhotoRecession.tsx — the single bounded scroll-linked effect
- components/motion/Reveal.tsx — scroll-reveal primitive

repo-lint fails on any "use client" outside this list. Amend via DECISIONS.md first.

## Guarantees

- Hero <Image> is priority + never opacity-animated (LCP).
- Visibility rescue CSS covers no-JS and reduced-motion (html.js pattern).
- Photo recession: homepage-only, gated >=768px, reduced-motion-static, no scroll framework.

## Hygiene gates (CI: npm run verify)

typecheck (strict) · eslint · content-lint (honesty invariants) · repo-lint
(file lengths, client boundary, console.log, README integrity) · production build.

## Extension paths

- Add a project: add content/projects/<name>.ts + register in index.ts. Renderer handles it.
- Add LIFE (future): flip status in content/site.ts destinations; never before its own phase.
- Add a client component: ADR in DECISIONS.md amending the boundary list, then code.
