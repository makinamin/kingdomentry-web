export const isRtl = (locale: string) => locale === "ar";

/** Forward arrow mirrors in RTL. */
export const arrow = (locale: string) => (isRtl(locale) ? "←" : "→");
export const arrowBack = (locale: string) => (isRtl(locale) ? "→" : "←");
