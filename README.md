# Kingdom Entry website

Next.js (App Router, TypeScript strict, Tailwind) static site for kingdomentry.com. Locales `/en`, `/nl`, `/ar`.

The design handoff lives in `design_handoff/`. Read `design_handoff/README.md` (design truth) and `design_handoff/BUILD_BRIEF.md` (engineering contract) first.

```bash
pnpm install
pnpm dev          # http://localhost:3000/en/
pnpm build        # static export to out/
pnpm lint && pnpm typecheck
```

## Where things live

| Path | What |
|---|---|
| `tokens/` | Design tokens and the Tailwind base, copied from the handoff. `tailwind.config.ts` is identical to `tokens/tailwind.config.ts`. |
| `messages/{en,nl,ar}.json` | All copy, loaded as is. `brand.arabicName` is the only place the Arabic name lives. |
| `i18n/` | next-intl routing and message loading. |
| `components/Logo.tsx` | `<Logo mark diamond size lockup />`, geometry from `assets/logo/`. |
| `components/DiamondPattern.tsx` | The Diamond Path as an inline SVG pattern. |
| `app/[locale]/brand-review/` | Internal review page for logo variants, pattern, type and colours. `noindex`. |

Full editing, language and deploy notes arrive in step 6 of the brief.
