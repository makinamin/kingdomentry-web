import type { ReactNode } from "react";

/** Gradient eyebrow with a pulsing dot (Gilroy subtitle-1). */
export function Eyebrow({ children, tone = "light" }: { children: ReactNode; tone?: "light" | "dark" }) {
  return (
    <p
      className={`m-0 inline-flex items-center gap-2.5 text-[15px] font-medium ${
        tone === "dark" ? "text-violet-soft" : "text-violet"
      }`}
    >
      <span aria-hidden className="h-2 w-2 animate-pulse-dot rounded-full bg-gd-violet" />
      <span className={tone === "dark" ? "text-violet-soft" : "text-gradient"}>{children}</span>
    </p>
  );
}

/**
 * Display heading, Epilogue 900. `stroke` renders the trailing words as an outline.
 * Splits the title at its first full stop: the first sentence carries the accent.
 */
export function Title({
  children,
  as: Tag = "h2",
  tone = "light",
  size = "section",
  accent = "none",
  className = "",
}: {
  children: string;
  as?: "h1" | "h2" | "h3";
  tone?: "light" | "dark";
  size?: "hero" | "page" | "section" | "card";
  accent?: "none" | "gradient-first" | "stroke-rest";
  className?: string;
}) {
  const sizes = {
    hero: "text-[clamp(40px,5.6vw,80px)] leading-[1.08]",
    page: "text-[clamp(40px,6vw,90px)] leading-[1.02]",
    section: "text-[clamp(30px,4.2vw,60px)] leading-[1.12]",
    card: "text-[clamp(22px,2vw,28px)] leading-[1.2]",
  } as const;

  const cut = children.indexOf(".");
  const first = cut > -1 && cut < children.length - 1 ? children.slice(0, cut + 1) : children;
  const rest = first === children ? "" : children.slice(cut + 1).trim();

  return (
    <Tag
      className={`m-0 text-balance font-black tracking-[-0.01em] ${sizes[size]} ${
        tone === "dark" ? "!text-white" : "text-ink"
      } ${className}`}
    >
      {accent === "none" || !rest ? (
        children
      ) : accent === "gradient-first" ? (
        <>
          <span className="text-gradient">{first}</span> {rest}
        </>
      ) : (
        <>
          {first} <span className="text-stroke">{rest}</span>
        </>
      )}
    </Tag>
  );
}
