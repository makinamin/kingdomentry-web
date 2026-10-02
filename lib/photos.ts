import { existsSync } from "node:fs";
import { join } from "node:path";

/**
 * Photo trial: real photography shows on the Dutch site only, so it can be
 * compared with the line-drawing look on English and Arabic. To roll it out,
 * return true here (or list the locales).
 */
export const showPhotos = (locale: string) => locale === "nl";

/** True when public/images holds this photo; a missing one keeps the drawing. */
const has = (name: string) =>
  existsSync(join(process.cwd(), "public/images", `${name}-1024.webp`));

/** Sector id -> photo name in public/images, for the sectors whose photo exists. */
export const sectorPhoto = (id: string) =>
  has(`sector-${id}`)
    ? `sector-${id}`
    : id === "healthcare"
      ? "healthcare"
      : undefined;

const cities = ["amsterdam", "casablanca", "jeddah"] as const;

/** Office order in messages: Amsterdam, Casablanca, Jeddah. */
export const officePhoto = (
  i: number,
): { image: string; alt: string } | undefined => {
  const city = cities[i];
  if (!city) return undefined;
  if (has(`office-${city}`)) return { image: `office-${city}`, alt: city };
  if (city === "jeddah") return { image: "jeddah-office", alt: "jeddahOffice" };
  return undefined;
};
