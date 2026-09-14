# CONTENT — Verified Sources & Missing Material

| Item | Status | Expected |
|---|---|---|
| Hero photograph | PLACED — public/images/hero/hero.jpg (1311x1200, 460KB, JPEG q82 from 1.png) | higher-res original if available |
| Archivo font | PLACED — app/fonts/archivo/Archivo-Variable.woff2 (34.9KB) | — |
| IBM Plex Mono | PLACED — app/fonts/plex/{Regular,Medium}.woff2 (29.6KB) | — |
| V4 exact type scale | MISSING VERIFIED SOURCE | swap into styles/globals.css @theme (ADR-011) |
| GitHub profile URL | MISSING VERIFIED SOURCE | content/site.ts utilities[1].href |
| Contact email | MISSING VERIFIED SOURCE | utilities[2].href = "mailto:..." |
| Resume PDF | MISSING BINARY | public/resume.pdf → utilities[0].href = "/resume.pdf" |
| AgentOS repo/docs | MISSING VERIFIED SOURCE | content/projects/agentos.ts |
| EvalOS repo/docs | MISSING VERIFIED SOURCE | content/projects/evalos.ts |
| WOE repo/docs | MISSING VERIFIED SOURCE | content/projects/woe.ts |
| Education periods/credentials | MISSING VERIFIED SOURCE | content/experience.ts |
| About copy | MISSING VERIFIED SOURCE (Rehan) | content/about.ts |
| Domain | RESOLVED — rehank.in (canonical, ADR-024) | www redirect configured at deploy |
