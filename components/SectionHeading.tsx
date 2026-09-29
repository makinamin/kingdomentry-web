import type { ReactNode } from "react";

type Props = {
  label?: string;
  title: ReactNode;
  intro?: ReactNode;
  /** light: blue on pearl/white. dark: pearl on blue. */
  tone?: "light" | "dark";
  /** Immersive: wider label tracking, bigger H2, no rule before the label. */
  immersive?: boolean;
  align?: "start" | "center";
  as?: "h1" | "h2";
  className?: string;
};

/** Label + title (+ intro). H1 page scale when as="h1", H2 section scale otherwise. */
export function SectionHeading({
  label,
  title,
  intro,
  tone = "light",
  immersive = false,
  align = "start",
  as: Tag = "h2",
  className = "",
}: Props) {
  const dark = tone === "dark";
  const size =
    Tag === "h1"
      ? "text-[clamp(40px,5.5vw,76px)] leading-[1.04]"
      : immersive
        ? "text-[clamp(36px,4.6vw,64px)] leading-[1.05]"
        : "text-[clamp(34px,4.2vw,56px)] leading-[1.08]";

  return (
    <div
      className={`flex flex-col ${Tag === "h1" ? "gap-5" : "gap-3.5"} ${
        align === "center" ? "items-center text-center" : ""
      } ${className}`}
    >
      {label ? (
        <p
          className={`m-0 flex items-center gap-3.5 text-[12px] font-medium uppercase ${
            immersive ? "tracking-wide" : "tracking-label"
          } ${dark ? "text-horizon" : "text-ink-soft"}`}
        >
          {!dark && !immersive ? <span aria-hidden className="h-px w-6 bg-gold" /> : null}
          {label}
        </p>
      ) : null}
      <Tag className={`m-0 text-balance font-medium ${size}`}>{title}</Tag>
      {intro ? (
        <p
          className={`m-0 max-w-[60ch] text-pretty ${
            dark ? "font-light text-pearl" : "text-[18px] text-ink-soft"
          }`}
        >
          {intro}
        </p>
      ) : null}
    </div>
  );
}
