import { color, type ColorToken } from "@/lib/tokens";

type LogoColor = Extract<ColorToken, "blue" | "gold" | "pearl"> | "current";

type LogoProps = {
  /** Colour of the K. "current" follows the surrounding text colour (one-colour variant). */
  mark?: LogoColor;
  /** Colour of the diamond. Defaults to the mark colour. */
  diamond?: LogoColor;
  /** Height of the mark in px. Never below 16. */
  size?: number;
  /** Adds the KINGDOMENTRY wordmark next to the mark. Never below 120px wide in total. */
  lockup?: boolean;
  /** Accessible name. Omit when the logo sits inside a labelled link. */
  label?: string;
  className?: string;
};

export const MARK_MIN = 16;

const fill = (c: LogoColor) => (c === "current" ? "currentColor" : color[c]);

/** Geometry from assets/logo/*.svg. The K opens like a door; the diamond steps through. */
export function MarkShapes({ mark, diamond }: { mark: string; diamond: string }) {
  return (
    <>
      <rect x="12" y="12" width="24" height="96" fill={mark} />
      <polygon points="44,12 108,12 44,58" fill={mark} />
      <polygon points="44,62 108,108 44,108" fill={mark} />
      <rect x="80" y="54" width="12" height="12" transform="rotate(45 86 60)" fill={diamond} />
    </>
  );
}

export function Logo({ mark = "gold", diamond, size = 34, lockup = false, label, className }: LogoProps) {
  const px = Math.max(size, MARK_MIN);
  const a11y = label ? { role: "img", "aria-label": label } : { "aria-hidden": true };

  const svg = (
    <svg
      width={px}
      height={px}
      viewBox="0 0 120 120"
      className="shrink-0"
      {...(lockup ? { "aria-hidden": true } : a11y)}
    >
      <MarkShapes mark={fill(mark)} diamond={fill(diamond ?? mark)} />
    </svg>
  );

  if (!lockup) return className ? <span className={className}>{svg}</span> : svg;

  // Prototype ratios: 34px mark / 21px type / 12px gap (header), 40 / 24 / 14 (footer).
  const fontSize = Math.round(px * 0.61);
  const gap = Math.round(px * 0.35);

  return (
    // The lockup reads mark then wordmark in every locale, so it stays LTR as a unit.
    <span dir="ltr" className={`inline-flex items-center ${className ?? ""}`} style={{ gap }} {...a11y}>
      {svg}
      <Wordmark fontSize={fontSize} />
    </span>
  );
}

/** KINGDOM 600 + ENTRY 300, no space, always LTR and always Ubuntu, even in Arabic. */
export function Wordmark({ fontSize = 21 }: { fontSize?: number }) {
  return (
    <span dir="ltr" className="font-sans leading-none" style={{ fontSize, letterSpacing: "0.16em" }}>
      <span className="font-semibold">KINGDOM</span>
      <span className="font-light">ENTRY</span>
    </span>
  );
}
