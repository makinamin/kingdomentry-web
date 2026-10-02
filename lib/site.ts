// Site-wide facts that are not copy. Copy lives in messages/*.json.
export const site = {
  // Public address of the site. Previews override it with NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kingdomentry.com",
  // Preview builds (NEXT_PUBLIC_NOINDEX=1) ask search engines to stay away.
  noindex: process.env.NEXT_PUBLIC_NOINDEX === "1",
  email: "hello@kingdomentry.com",
  // [PLACEHOLDER] Company LinkedIn page URL. Empty: the link is hidden.
  linkedin: "",
  // [PLACEHOLDER] Company profile PDF, e.g. "/kingdom-entry-profile.pdf" with the file in public/. Empty: the button is hidden.
  profilePdf: "",
  // [PLACEHOLDER] Calendar link for the 30-minute Kingdom Readiness Call. Empty: buttons go to the contact form.
  bookingUrl: "",
  // Plausible (EU-hosted, cookieless) domain, e.g. "kingdomentry.com". Unset: no analytics and no cookie notice.
  analyticsDomain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "",
  // Form endpoint (serverless function or form service). Unset: the form opens a prefilled email instead.
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT ?? "",
} as const;

// [PLACEHOLDER] Founder LinkedIn profiles, in the order of about.founders.items. Empty: no link shown.
export const founderLinks: string[] = ["", ""];

export const navItems = [
  { key: "home", href: "/" },
  { key: "why", href: "/why-saudi" },
  { key: "sectors", href: "/sectors" },
  { key: "services", href: "/services" },
  { key: "how", href: "/how-we-work" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

// Secondary pages, linked from the footer and the menu.
export const moreItems = [
  { key: "offices", href: "/offices" },
  { key: "faq", href: "/faq" },
] as const;

export const localeNames = { en: "English", nl: "Nederlands", ar: "العربية" } as const;
