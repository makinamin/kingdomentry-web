import { photo } from "./ImagePlaceholder";

/**
 * Full-bleed background photo for the royal heroes. A royal-to-navy tint keeps
 * the white headline readable; the photo is decorative, so it has no alt text.
 */
export function HeroPhoto({ image, position = "center" }: { image: string; position?: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP */}
      <img
        {...photo(image)}
        sizes="100vw"
        alt=""
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
        style={{ objectPosition: position }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(4,61,195,0.78)_0%,rgba(0,61,165,0.62)_50%,rgba(2,29,94,0.9)_100%)]"
      />
    </>
  );
}
