import type { ReactNode } from "react";

const tones = {
  pearl: "bg-pearl text-blue",
  white: "bg-white text-blue",
  blue: "bg-blue text-pearl",
  "blue-deep": "bg-blue-deep text-pearl",
} as const;

export type SectionTone = keyof typeof tones;

/**
 * Full-bleed band. Standard padding clamp(64px, 8vw, 112px);
 * immersive clamp(72px, 9vw, 128px). Children sit in the 1200px container.
 */
export function Section({
  tone = "pearl",
  immersive = false,
  className = "",
  innerClassName = "",
  background,
  label,
  children,
}: {
  tone?: SectionTone;
  immersive?: boolean;
  className?: string;
  innerClassName?: string;
  /** Decorative layers (pattern, oversized mark) rendered behind the content. */
  background?: ReactNode;
  /** Accessible name for the region. */
  label?: string;
  children: ReactNode;
}) {
  const pad = immersive ? "py-[clamp(72px,9vw,128px)]" : "py-[clamp(64px,8vw,112px)]";
  return (
    <section aria-label={label} className={`relative overflow-hidden ${tones[tone]} ${className}`}>
      {background}
      <div className={`relative mx-auto w-full max-w-site px-6 ${pad} ${innerClassName}`}>{children}</div>
    </section>
  );
}
