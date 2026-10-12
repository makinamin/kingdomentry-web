import type React from "react";
import { SkylineLines } from "./SkylineLines";

/** Photos in public/images, each exported at 640 and 1024px wide as WebP. */
export const photo = (name: string) => ({
  src: `/images/${name}-1024.webp`,
  srcSet: `/images/${name}-640.webp 640w, /images/${name}-1024.webp 1024w`,
});

/**
 * A photo, or a stand-in for photography that has not arrived yet. Either way it
 * reserves the aspect ratio so nothing shifts. The note says which photo goes here.
 */
export function ImagePlaceholder({
  note,
  ratio = "4 / 5",
  tone = "soft",
  className = "",
  fill,
  image,
  alt,
  position = "center",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  note: string;
  ratio?: string;
  tone?: "soft" | "royal" | "navy";
  className?: string;
  /**
   * Beside text in a grid: keep `ratio` while stacked, then from this breakpoint
   * drop the ratio and fill the column's height. Using a ratio together with
   * full height would make the box grow wider than its column.
   */
  fill?: "md" | "lg";
  /** Photo name in public/images; when set the photo replaces the drawing. */
  image?: string;
  alt?: string;
  position?: string;
  sizes?: string;
}) {
  const bg = {
    soft: "bg-[linear-gradient(180deg,theme(colors.soft),theme(colors.line))] text-royal",
    royal: "bg-[linear-gradient(180deg,theme(colors.royal.2),theme(colors.royal.DEFAULT))] text-white",
    navy: "bg-[linear-gradient(180deg,theme(colors.navy.2),theme(colors.navy.DEFAULT))] text-white",
  }[tone];
  const fillClass = {
    md: "[aspect-ratio:var(--ratio)] md:h-full md:min-h-[320px] md:[aspect-ratio:auto]",
    lg: "[aspect-ratio:var(--ratio)] lg:h-full lg:min-h-[320px] lg:[aspect-ratio:auto]",
  };
  const box = `relative isolate w-full overflow-hidden ${bg} ${fill ? fillClass[fill] : ""} ${className}`;
  const style = fill ? ({ "--ratio": ratio } as React.CSSProperties) : { aspectRatio: ratio };

  if (image) {
    return (
      <div className={box} style={style}>
        {/* eslint-disable-next-line @next/next/no-img-element -- static export, images are pre-sized WebP */}
        <img
          {...photo(image)}
          sizes={sizes}
          alt={alt ?? note}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </div>
    );
  }

  return (
    <div role="img" aria-label={note} className={box} style={style}>
      <SkylineLines opacity={tone === "soft" ? 0.35 : 0.3} />
      <span
        className={`absolute bottom-4 start-4 px-2.5 py-1.5 text-[12px] font-medium uppercase tracking-label ${
          tone === "soft" ? "bg-white text-navy/70" : "bg-white/10 text-white/80 backdrop-blur"
        }`}
      >
        {note}
      </span>
    </div>
  );
}
