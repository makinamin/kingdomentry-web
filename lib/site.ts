// Site-wide facts that are not copy. Copy lives in messages/*.json.
export const site = {
  url: "https://kingdomentry.com",
  email: "hello@kingdomentry.com",
  // [PLACEHOLDER] Company LinkedIn page. The prototype links to linkedin.com.
  linkedin: "https://www.linkedin.com",
  // [PLACEHOLDER] Company profile PDF. Drop the file in public/ at this path.
  profilePdf: "/kingdom-entry-profile.pdf",
  // [PLACEHOLDER] Calendar link for the 30-minute Kingdom Readiness Call. Empty: buttons go to the contact form.
  bookingUrl: "",
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
