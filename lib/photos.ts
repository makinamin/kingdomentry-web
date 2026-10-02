/**
 * Photo trial: real photography shows on the Dutch site only, so it can be
 * compared with the line-drawing look on English and Arabic. To roll it out,
 * return true here (or list the locales).
 */
export const showPhotos = (locale: string) => locale === "nl";

/** Sector id -> photo name in public/images. */
export const sectorPhotos: Record<string, string> = { healthcare: "healthcare" };

/** Office order in messages: Amsterdam, Casablanca, Jeddah. */
export const officePhotos = ["", "", "jeddah-office"];
