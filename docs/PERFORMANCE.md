# PERFORMANCE — Phase 2 closing measurements (Lighthouse, 2026-09-14)

| Run | Perf | A11y | LCP | FCP | SI | CLS | TBT | Transfer |
|---|---|---|---|---|---|---|---|---|
| desktop-agentos | 100 | 100 | 0.4 s | 0.2 s | 0.3 s | 0 | 0 ms | 225KB |
| desktop-work | 100 | 96 | 0.4 s | 0.2 s | 0.2 s | 0 | 0 ms | 255KB |
| desktoproot | 100 | 96 | 0.5 s | 0.2 s | 0.3 s | 0 | 0 ms | 288KB |
| mobile-agentos | 99 | 100 | 2.0 s | 0.8 s | 0.8 s | 0 | 10 ms | 249KB |
| mobile-root-v2 | 99 | 96 | 2.1 s | 1.0 s | 1.8 s | 0 | 10 ms | 286KB |
| mobile-work | 99 | 96 | 2.0 s | 0.8 s | 1.2 s | 0 | 10 ms | 255KB |
| mobileroot | 97 | 96 | 2.5 s | 1.2 s | 2.8 s | 0 | 10 ms | 288KB |

Budgets: perf >=90 mobile, a11y >=95, LCP <=2.0s, CLS <=0.05, TBT <=150ms. Dispositions: ADR-033 amendment (JS 155KB accepted), ADR-034 (mobile LCP 2.5->2.1s), ADR-035 (accepted, real-device tiebreaker).
