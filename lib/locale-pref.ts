// The visitor's language choice, remembered across visits. Read by the root redirect:
// the server reads the cookie (public/.htaccess), the fallback script reads localStorage.
export const LOCALE_KEY = "ke-lang";

export function rememberLocale(locale: string) {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // Storage blocked: the choice simply is not remembered.
  }
  try {
    document.cookie = `${LOCALE_KEY}=${locale}; path=/; max-age=31536000; SameSite=Lax; Secure`;
  } catch {
    // Cookies blocked: the server falls back to the browser language.
  }
}
