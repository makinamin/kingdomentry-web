import { Diamond } from "./Diamond";

/** Gradient ticker band with diamond separators. Loops by duplicating the row. */
export function Marquee({ items, tone = "violet" }: { items: string[]; tone?: "violet" | "dark" }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="m-0 flex shrink-0 list-none items-center gap-10 p-0 pe-10">
      {items.map((item, i) => (
        <li key={`${item}-${i}`} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-[clamp(24px,3vw,44px)] font-black uppercase leading-none">{item}</span>
          <Diamond size={14} className={tone === "violet" ? "bg-white" : "bg-gd-violet"} />
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className={`relative z-[1] overflow-hidden py-7 ${
        tone === "violet" ? "bg-gd-violet text-white" : "border-y border-white/10 bg-night-deep text-white"
      }`}
    >
      <div dir="ltr" className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
