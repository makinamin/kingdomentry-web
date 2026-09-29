# Build brief for Claude Code: Kingdom Entry website

Start by reading `README.md` in this folder. It holds the design truth. This file holds the engineering contract. Open `design/Kingdom Entry Website.dc.html` in a browser and keep it side by side while building.

## Stack
- Next.js 14+ App Router, TypeScript strict, Tailwind CSS.
- `next-intl` (or equivalent) with locale segments `/en`, `/nl`, `/ar`. English default. Static export friendly (`output: "export"`) so it deploys to Hostinger or Vercel.
- Fonts via `next/font/google`: Ubuntu 300/400/500/700, Reem Kufi 400/500/600. Expose as CSS variables `--font-ubuntu`, `--font-reem-kufi`.
- Copy `tokens/tailwind.config.ts` as the Tailwind config base. Never hard-code a hex that is not in it.

## Routes
```
/[locale]
/[locale]/services
/[locale]/sectors
/[locale]/sectors/[slug]        medical | cleantech | ai | agri | industry
/[locale]/how-it-works
/[locale]/about
/[locale]/contact
/[locale]/privacy
/[locale]/not-found (404)
```

## Components
`Logo` (mark, diamond, size, lockup boolean), `DiamondPattern` (inline SVG pattern, opacity prop), `Header`, `Footer`, `CookieNotice`, `LanguageSwitcher`, `Button` (variants: blue, gold, gold-gradient-pill, outline-gold, outline-blue), `SectionHeading` (label + title, tone light|dark), `PackageCard` (variants: light, glass, raised), `SectorTile` (variants: light, glass), `JourneySteps`, `StatCard`, `CreditsList`, `CtaBand`, `ContactForm`, `ImagePlaceholder`.

## i18n
- Load `messages/{en,nl,ar}.json` as is. Do not flatten or rename keys; the prototype's template uses the same paths (`hero.title`, `packages.items[0].includes[1]`, `sectors.items[].id`).
- `html dir` from `messages[locale].dir`. Use CSS logical properties everywhere. Arrows: render `→` in LTR, `←` in RTL.
- `lang="ar"` switches `font-family` to `--font-reem-kufi` for all text; wordmark stays Ubuntu and `dir="ltr"`.
- `brand.arabicName` is the only place the Arabic name lives.
- hreflang alternates for all three locales on every page; `x-default` → en.

## Contact form
Fields: name*, company*, role, email*, phone, sector* (select of five ids), companySize (select), message, honeypot `website` (hidden, must be empty). Validate client and server side. On submit POST to a serverless function or form endpoint (Resend/Postmark for email to hello@kingdomentry.com; store the submission in a table or a Google Sheet). Add a time-based check (reject under 3 seconds) besides the honeypot. Success replaces the form with the success card from the prototype.

## SEO
- `generateMetadata` per page and locale from a `seo` block you add to each messages file (title, description). Keep titles under 60 characters, voice rules apply.
- Open Graph image generated from the mark: blue background, gold mark, wordmark, `SOFT LANDING · SAUDI ARABIA`.
- `sitemap.xml` with all locales, `robots.txt`, Organization JSON-LD (name Kingdom Entry, url, logo, sameAs LinkedIn, contactPoint email).
- Favicon and app icons from `assets/logo/mark-gold.svg` on blue.

## Quality gates
- Lighthouse 90+ on all four categories, mobile and desktop.
- WCAG AA: heading order, alt text, keyboard nav, visible gold focus rings, form labels bound to inputs, `aria-pressed` on the language switcher, `aria-expanded` on the menu button. Contrast: never small gold text on blue or pearl; small text on blue is pearl or horizon.
- No layout shift: reserve image aspect ratios, load fonts with `display: swap` and size-adjust.
- `prefers-reduced-motion` disables float, dust, milestone and scroll animations.
- Privacy-friendly analytics (Plausible or Umami), no cookies before consent; the notice only gates analytics.

## Process
1. Scaffold: tokens, fonts, i18n, `Logo`, `DiamondPattern`. Render the logo variants on a scratch page and stop for review.
2. Shared components: header, footer, buttons, cards, section layouts, CTA band.
3. Pages in English, one by one, checked against the prototype. Then `/ar`: fix every RTL issue. Then `/nl`.
4. Form, SEO, analytics, cookie notice.
5. Audit: accessibility, performance, broken links, RTL. Fix everything.
6. README in the repo: how to edit copy, swap the Arabic name, add a language, deploy to Hostinger and Vercel.

## Voice rule for any copy you write
Bold, minimal, punchy. Short declarative sentences. No em dashes anywhere. If a fact or number is unknown, write `[PLACEHOLDER]`.
