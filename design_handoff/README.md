# Handoff: Kingdom Entry website

Design source of truth for the Kingdom Entry marketing site. Read this file first, then `BUILD_BRIEF.md`, then open `design/Kingdom Entry Website.dc.html` in a browser and click through every page in EN, NL and AR.

## Overview
Kingdom Entry is a soft-landing partner that helps European companies (Dutch scale-ups first) enter Saudi Arabia. The site sells three packages, presents five sectors, explains a four-step journey and converts through "Book an intro call".

## About the design files
Everything in `design/` and `brand/` is a **design reference built in HTML**. It is a prototype that shows exact look and behaviour. Do not ship it. Recreate it in Next.js (App Router, TypeScript, Tailwind) following `BUILD_BRIEF.md`. Open the `.dc.html` files directly in a browser; `support.js`, `site-content.js` and `image-slot.js` must sit next to them.

## Fidelity
**High-fidelity.** Colours, type, spacing, radii, copy and interactions are final. Match them one to one. Where the prototype uses `[PLACEHOLDER]`, keep the placeholder; never invent facts or numbers.

## Design tokens
Colours
- blue `#033CB2` primary, dark backgrounds, headings on light
- blue-deep `#022A7D` deepest backgrounds, immersive sections
- blue-lift `#1A52C7` radial depth centre, hover lift
- gold `#B18767` accent, logo, rules, milestones (large text only on blue)
- gold-light `#D2B497` metallic sheen, highlighted headings on blue, active links on blue
- gold-deep `#86634A` metallic shadow face
- gold-hover `#C29B7C` gold button hover
- pearl `#F7F7F5` light background, text on blue
- white `#FFFFFF` cards on pearl
- stone `#939598` borders and dividers only (usually at 30% alpha)
- horizon `#BFD0F5` small labels on blue
- ink-soft `#4A4D57` secondary body text on light

Typography: Ubuntu 300/400/500/700 for everything Latin. Reem Kufi 400/500/600 for all Arabic. Google Fonts, self-host via `next/font`.
- H1 hero: 300, clamp(44px, 6vw, 88px), line-height 1.02, letter-spacing -0.01em; first sentence 600 in gold-light
- H1 page: 500, clamp(40px, 5.5vw, 76px), lh 1.04
- H2 section: 500, clamp(34px, 4.2vw, 56px), lh 1.08 (immersive: clamp(36px, 4.6vw, 64px), lh 1.05)
- H3 card: 500, 30 to 32px, lh 1.1
- Body: 300 or 400, 16px, lh 1.6 (18px for intros)
- Label: 500, 12px, uppercase, tracking 0.22em (0.34em on immersive labels); horizon on blue, ink-soft on light
- Nav: 500, 14.5px; buttons: 500, 15 to 15.5px
- Wordmark: KINGDOM 600 + ENTRY 300, uppercase, tracking 0.16em, no space, always LTR

Spacing and shape
- Container 1200px max, 24px gutters
- Section padding clamp(64px, 8vw, 112px); immersive clamp(72px, 9vw, 128px)
- Grid gaps 16 to 24px cards, 32 to 48px columns
- Radius 8px buttons/inputs, 12px cards, 16px immersive glass cards, 999px immersive hero buttons
- Rules 1px gold, or stone at 30% alpha
- Diamond bullet 7px square rotated 45°, gold

Shadows (dark sections only)
- card `0 24px 60px rgba(3,60,178,.35)`
- raised `0 30px 80px rgba(1,24,72,.6), inset 0 1px 0 rgba(210,180,151,.3)`
- cta glow `0 12px 40px rgba(177,135,103,.35)`

Full machine-readable set: `tokens/tokens.json`, `tokens/tailwind.config.ts`.

## Logo
Threshold mark: geometric K whose arms open like a door, gold diamond stepping through. Master SVG in `assets/logo/`. Build as `<Logo mark diamond size />`. Variants: gold on blue; blue mark + gold diamond on pearl/white; pearl on blue; one colour. Clear space = width of the vertical bar. Min 16px mark, 120px lockup. Never rotate, stretch, recolour the diamond alone, add effects. Arabic name مدخل المملكة in Reem Kufi 600 lives in `messages/*.json` under `brand.arabicName` so it can be swapped for بوابة المملكة.

## Pattern "The Diamond Path"
48px SVG pattern: one 6px gold diamond per cell plus 3.5px diamonds at 55% on the corners. Source `assets/pattern/diamond-path.svg`. Used at 16 to 45% opacity on hero, CTA band, footer, with an oversized mark at 14 to 16% as embossed accent. Build as an inline SVG `<pattern>`, never a raster.

## Screens
All pages share: utility bar (immersive/gateway only), sticky header (logo, nav, EN/NL/AR switcher, CTA), CTA band (not on contact/privacy/404), footer, cookie notice.

Header: 76px, pearl at 94% with blur on light pages; on the immersive home it is blue-deep at 72% with pearl text and a gold-light CTA. Nav hides under 1120px into a Menu button that opens a stacked list (28px links). Active nav item has a 1px gold underline. Focus rings 2px gold, offset 2 to 4px.

Home has three layouts, switchable via the `homeLayout` tweak in the prototype. **Build `immersive`** (the default); `gateway` and `editorial` are earlier directions kept for reference.

Home, immersive
1. Hero: 100vh, radial blue-lift → blue → blue-deep, pattern at 16%, animated diamond dust (28 dots, 3 to 5px, gold-light/horizon, opacity pulse 3 to 8s). Left: label (tracking 0.34em), H1 with first sentence in gold-light 600, sub 300 max 46ch, gold gradient pill button + outlined glass pill, proof line with fading gold rule. Right: floating metallic composition (isometric blocks in gold-light/gold/gold-deep, faint K-mark at 16%, floats 5.5 to 9s, ease-in-out). 160px fade to blue-deep at the bottom.
2. Packages: blue-deep, centred label + H2, three glass cards (16px radius, pearl 3% fill, gold-light 20% border). Centre card raised: blue-lift gradient, 60% gold border, `raised` shadow. Each: 132px ring (2px horizon 25% track, 3px gold gradient arc at 110/220/377 of 377), index 01 to 03 in gold-light, duration label, H3, outcome, uppercase gold-light link.
3. Proof: blue, five glass cards (auto-fit minmax 140px), glowing 9px diamond, figure in gold-light (nowrap, ellipsis), caption 300. Note in horizon: figures to be verified.
4. Sectors: radial blue-lift bottom-left, five glass tiles (minmax 210px, min-height 220px), 64px circular icon well, H3 25px, "Explore sector" label. Hover: gold-light border, 8% gold fill, translateY(-4px).
5. Journey: blue-deep, centred H2, 1px gradient gold line across the top, four columns each with a 13px diamond milestone that lights up in sequence (keyframe keMilestone 8s, 1.2s stagger), number, H3 in gold-light, text 300.
6. Credits: blue, label + H2 centred, two-column credits grid (labels right-aligned horizon uppercase, values pearl 15px), link to About. A 300px skyline image band anchored to the bottom, gradient from blue to transparent over it.

Services: label, H1 "Three packages. No surprises.", intro, three white cards (12px radius, stone 30% border, 40/32px padding): duration + diamond, H2 36px, "What's included" list with diamond bullets, outcome block, blue button "Discuss your entry".

Sectors: H1, intro, five white cards (minmax 280px, min-height 260px) with 48px icon, H2 32px, tagline, "The Saudi opportunity →". Sector detail: blue hero with pattern 35%, back link, 64px icon, H1, tagline 300 in display size; then pearl three-column grid (opportunity as 24px 500 text, buyers list, how we help list + button).

How it works: H1 "Four steps. One door.", intro, four columns on a gold top rule with 17px diamonds, number in 20px 300, H2 clamp(32px, 3vw, 44px), text 17px; below, three white package shortcut cards.

About: two-column (H1 left, story right: first paragraph 30px 500 blue, rest 18px ink-soft); team grid of 4:5 photo placeholders (white, stone border, faint mark at 12%) with name 24px, role 14px, LinkedIn link with gold underline.

Contact: left column H1, intro, three city rows (city 26px 500 / address lines 14.5px), dashed calendar embed placeholder 180px; right column white form card: name, company, role, email, phone, sector select (five), company size select (1 to 10, 11 to 50, 51 to 200, 200+), message textarea, honeypot field, privacy note, submit. Success state: blue card, diamond, "Received." 44px, text, outlined "Send another".

Privacy: 760px column, H1, intro, five sections with 28px H2 and body.

404: blue, pattern 40%, oversized mark at 14% bottom-right, "404" in gold clamp(64px, 12vw, 160px) 300, H1 "This door is closed. Try another.", gold button "Back home".

CTA band: blue, pattern 40%, mark at 14% left, centred H2 clamp(34px, 4.6vw, 62px), gold button.

Footer: blue, pattern 22%, 1px gold-light 50% top rule. Four columns: brand (40px mark, wordmark, descriptor in horizon, Arabic name in Reem Kufi 600 22px, tagline), Company links, Contact (email, LinkedIn, outlined PDF download with diamond), Language. Bottom row: rights + Privacy in horizon 13px.

Cookie notice: fixed bottom, 720px max, white, 12px radius, text 14.5px ink-soft, Decline (outlined) + Accept (blue).

## Interactions and behaviour
- Language switch sets `dir`, swaps fonts (Reem Kufi for AR), mirrors arrows (→ becomes ←), uses logical properties (`inset-inline-start`, `padding-inline-end`) so RTL mirrors without extra CSS. The wordmark stays LTR.
- Hover: links turn gold; blue buttons go blue-lift; gold buttons go gold-hover; glass tiles lift 4px.
- Focus: 2px gold outline, offset 2 to 4px; on gold buttons the outline is pearl.
- Motion: float 5.5 to 9s ease-in-out; dust opacity pulse; milestones light up in sequence; fade-and-rise on scroll (8 to 12px, 500ms, ease-out) for section content. All disabled under `prefers-reduced-motion`.
- Form: required name, company, email, sector. Honeypot field `website` must be empty. On success replace the form with the success card; keep the page position.
- Cookie choice persists; language persists (cookie or localStorage).

## State
- locale (route segment), menuOpen, cookieChoice, formStatus (idle | sending | sent | error), current sector (route).

## Copy
All copy in `messages/en.json`, `messages/nl.json`, `messages/ar.json`. EN is final. NL and AR carry `"review": true` and need professional review. Voice: bold, minimal, punchy, short sentences, no em dashes anywhere.

## Assets
- `assets/logo/*.svg` four mark variants
- `assets/pattern/diamond-path.svg` pattern tile
- `assets/icons/sector-*.svg` five line icons, 1.5px gold strokes, diamond accent
- Photos: none supplied. Image slots in the prototype mark where photography goes (hero, five sector tiles in gateway layout, team, skyline). Use neutral blue-toned placeholders until photos arrive.

## Files
- `design/Kingdom Entry Website.dc.html` the full prototype (all pages, three locales, three home layouts)
- `design/site-content.js` copy source the prototype reads
- `brand/*.dc.html` brand board and print set (note: these still show the earlier King Blue #23294A / Ormolu #A68B71 / Cormorant + Jost palette; the website tokens above supersede them for the web)
- `tokens/` `messages/` `assets/` as described
- `BUILD_BRIEF.md` the Next.js build specification for Claude Code
