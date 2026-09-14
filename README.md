# Rehan Khan — V1

Personal website, production implementation. An evidence-first digital environment:
substance → evidence → credibility — not animation → decoration → impression.

**Status:** V1 · Phase 2 foundation (content slots pending verified sources — see docs/CONTENT.md).

## Stack

- Next.js 15 (App Router, fully static) + React 19
- TypeScript (strict)
- Tailwind CSS v4 — all design tokens in `styles/globals.css`
- motion/react — sole animation library
- Vercel — deployment target

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run verify     # typecheck · eslint · content-lint · repo-lint · production build
```

`npm run verify` is the same gate CI runs on every push.

## Repository map

```
app/           Routes only — thin rendering, no editorial copy
components/    layout/ (chrome) · home/ (hero system) · motion/ (primitives)
               ui/ (shared rows) · work/ (case-study renderer)
content/       THE source of truth for all copy and structured data
lib/           motion tokens
scripts/       content-lint.ts (honesty invariants) · repo-lint.ts (engineering hygiene)
styles/        globals.css — all design tokens
docs/          ARCHITECTURE.md · DECISIONS.md · CONTENT.md
public/        images/ (hero) · resume.pdf (when supplied)
```

## Non-negotiable rules

1. **All copy lives in `content/`.** Components render content; they never author it.
2. **Never fabricate.** No invented metrics, architecture, dates, users, or claims.
   Missing material is marked `MISSING VERIFIED SOURCE` in docs/CONTENT.md.
3. **Tokens only.** Colors, type, and motion values come from `styles/globals.css`
   and `lib/motion/tokens.ts`. No magic values in components.
4. **Closed client boundary.** `"use client"` exists only in the files listed in
   docs/ARCHITECTURE.md. repo-lint fails on any addition.
5. **File size discipline.** Code files ≤ 250 lines; content modules ≤ 400.
   Split the module instead of growing it.
6. **LIFE is out of V1.** Reserved as `status: "reserved"` in content/site.ts.
   Never create `app/life`, never render it, never placeholder it.
7. **Education chronology is canonical: RIMC → NDA → IIT Bombay.**
   Stored ascending, displayed reverse-chronologically, lint-enforced.

## For AI agents working in this repo

Entry point: `docs/ARCHITECTURE.md` → `docs/DECISIONS.md` → `docs/CONTENT.md`.
Read DECISIONS.md before proposing changes; record every meaningful deviation there
(append-only). Implementation agent: GLM. Visual direction: Claude. Independent audit: ChatGPT.
