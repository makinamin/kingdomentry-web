// The visitor's language choice, remembered across visits. Read by the root redirect.
export const LOCALE_KEY = "ke-lang";

export function rememberLocale(locale: string) {
  try {
    localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // Storage blocked: the choice simply is not remembered.
  }
}
