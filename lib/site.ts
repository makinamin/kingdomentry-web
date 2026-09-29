// Site-wide facts that are not copy. Copy lives in messages/*.json.
export const site = {
  email: "hello@kingdomentry.com",
  // [PLACEHOLDER] Company LinkedIn page. The prototype links to linkedin.com.
  linkedin: "https://www.linkedin.com",
  // [PLACEHOLDER] Company profile PDF. Drop the file in public/ at this path.
  profilePdf: "/kingdom-entry-profile.pdf",
} as const;

export const navItems = [
  { key: "home", href: "/" },
  { key: "services", href: "/services" },
  { key: "sectors", href: "/sectors" },
  { key: "how", href: "/how-it-works" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export const localeNames = { en: "English", nl: "Nederlands", ar: "العربية" } as const;
